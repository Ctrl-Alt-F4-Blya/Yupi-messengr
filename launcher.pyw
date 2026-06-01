from __future__ import annotations

import ipaddress
import json
import os
import re
import socket
import ssl
import subprocess
import sys
import threading
import time
import urllib.request
import webbrowser
from datetime import datetime, timedelta, timezone
from pathlib import Path
import tkinter as tk
from tkinter import ttk, messagebox

BASE_DIR = Path(__file__).resolve().parent
APP_BUILD = 'v29.11-pervak-clean-music'
DEFAULT_PORT = 8000
LOCAL_HOST = '127.0.0.1'
CACHE_QUERY = '?v=2911'
LOG_DIR = BASE_DIR / 'logs'
LOG_DIR.mkdir(exist_ok=True)
SERVER_LOG = LOG_DIR / 'server_latest.log'
ACCESS_FILE = LOG_DIR / 'access_urls.txt'
CERT_DIR = BASE_DIR / 'certs'
CERT_FILE = CERT_DIR / 'yupi_local.crt'
KEY_FILE = CERT_DIR / 'yupi_local.key'

WINDOW_W = 880
WINDOW_H = 760


def is_radmin_ip(value: str) -> bool:
    return bool(re.match(r'^26\.(?:\d{1,3}\.){2}\d{1,3}$', str(value or '').strip()))


def is_good_access_ip(value: str) -> bool:
    value = str(value or '').strip()
    try:
        ip = ipaddress.ip_address(value)
    except Exception:
        return False
    if ip.version != 4:
        return False
    if ip.is_loopback or ip.is_link_local or ip.is_multicast or ip.is_unspecified:
        return False
    return bool(ip.is_private or is_radmin_ip(value))


def add_ip(candidates: list[str], value: str) -> None:
    value = str(value or '').strip()
    if is_good_access_ip(value) and value not in candidates:
        candidates.append(value)


def ip_score(value: str) -> tuple[int, int, str]:
    last = value.rsplit('.', 1)[-1]
    gateway_like = 1 if last in {'1', '254'} else 0
    rank = 0 if is_radmin_ip(value) else 1 if value.startswith('192.168.') else 2 if value.startswith('10.') else 3
    return rank, gateway_like, value


def get_lan_ips() -> list[str]:
    candidates: list[str] = []

    for target in [('8.8.8.8', 80), ('1.1.1.1', 80), ('26.0.0.1', 80)]:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.settimeout(0.25)
                s.connect(target)
                add_ip(candidates, s.getsockname()[0])
        except OSError:
            pass

    try:
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None, socket.AF_INET):
            add_ip(candidates, info[4][0])
    except OSError:
        pass

    if os.name == 'nt':
        try:
            proc = subprocess.run(
                ['ipconfig'],
                capture_output=True,
                text=True,
                encoding='mbcs',
                errors='replace',
                timeout=4,
            )
            text = proc.stdout + '\n' + proc.stderr
            for match in re.findall(r'(?:IPv4[^:]*|IPv4-адрес[^:]*|IPv4 Address[^:]*)[:.\s]+([0-9]{1,3}(?:\.[0-9]{1,3}){3})', text, flags=re.I):
                add_ip(candidates, match)
            for match in re.findall(r'\b(26\.\d{1,3}\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})\b', text):
                add_ip(candidates, match)
        except Exception:
            pass

    candidates.sort(key=ip_score)
    return candidates


def get_radmin_ips() -> list[str]:
    return [ip for ip in get_lan_ips() if is_radmin_ip(ip)]


def get_server_python() -> str:
    venv_python = BASE_DIR / '.venv' / 'Scripts' / 'python.exe'
    if venv_python.exists():
        return str(venv_python)
    return sys.executable


def make_unverified_context():
    return ssl._create_unverified_context()


def is_port_open(host: str, port: int, timeout: float = 0.3) -> bool:
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except OSError:
        return False


def get_server_build(port: int, scheme: str, timeout: float = 0.8) -> str:
    try:
        url = f'{scheme}://{LOCAL_HOST}:{port}/api/server-info?check={int(time.time() * 1000)}'
        kwargs = {'timeout': timeout}
        if scheme == 'https':
            kwargs['context'] = make_unverified_context()
        with urllib.request.urlopen(url, **kwargs) as response:
            info = json.loads(response.read().decode('utf-8', errors='replace'))
        return str(info.get('build') or '')
    except Exception:
        return ''


def ensure_https_cert(ips: list[str]) -> tuple[bool, str]:
    if os.getenv('YUPI_DISABLE_HTTPS', '').strip() in {'1', 'true', 'yes'}:
        return False, 'HTTPS отключён переменной YUPI_DISABLE_HTTPS.'
    try:
        from cryptography import x509
        from cryptography.hazmat.primitives import hashes, serialization
        from cryptography.hazmat.primitives.asymmetric import rsa
        from cryptography.x509.oid import NameOID
    except Exception as exc:
        return False, 'Не установлен cryptography: {0}'.format(exc.__class__.__name__)

    CERT_DIR.mkdir(exist_ok=True)
    if CERT_FILE.exists() and KEY_FILE.exists():
        return True, 'Локальный HTTPS-сертификат уже есть.'

    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    names = [x509.DNSName('localhost')]
    for raw_ip in ['127.0.0.1', *ips]:
        try:
            names.append(x509.IPAddress(ipaddress.ip_address(raw_ip)))
        except Exception:
            pass

    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, 'RU'),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, 'Yupi Local'),
        x509.NameAttribute(NameOID.COMMON_NAME, 'Yupi Local Messenger'),
    ])
    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.now(timezone.utc) - timedelta(days=1))
        .not_valid_after(datetime.now(timezone.utc) + timedelta(days=3650))
        .add_extension(x509.SubjectAlternativeName(names), critical=False)
        .sign(key, hashes.SHA256())
    )
    KEY_FILE.write_bytes(key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption(),
    ))
    CERT_FILE.write_bytes(cert.public_bytes(serialization.Encoding.PEM))
    return True, 'Создан локальный HTTPS-сертификат.'


class YupiLauncher:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title('Yupi Launcher: первак edition')
        self.root.geometry(f'{WINDOW_W}x{WINDOW_H}')
        self.root.minsize(820, 700)
        self.root.resizable(True, True)
        self.root.configure(bg='#0d1020')
        self.root.protocol('WM_DELETE_WINDOW', self.on_close)

        self.port = DEFAULT_PORT
        self.server_process: subprocess.Popen | None = None
        self.started_by_launcher = False
        self.running = False
        self.browser_opened = False
        self.scheme = 'http'
        self.https_note = ''
        self.lan_ips: list[str] = []
        self.radmin_ips: list[str] = []
        self.local_url = ''
        self.wifi_url = ''
        self.radmin_url = ''

        self.status_var = tk.StringVar(value='Нажмите Start, чтобы запустить сервер')
        self.build_ui()
        self.refresh_addresses()
        self.root.after(250, self.start_server)

    def build_ui(self):
        self.canvas = tk.Canvas(self.root, highlightthickness=0, bd=0)
        self.canvas.pack(fill='both', expand=True)
        self.canvas.bind('<Configure>', self.draw_bg)

        self.panel = tk.Frame(self.root, bg='#111424', highlightbackground='#424766', highlightthickness=1)
        self.panel.place(relx=0.5, rely=0.5, anchor='center', relwidth=0.82, relheight=0.88)

        tk.Label(self.panel, text='Y', font=('Segoe UI', 40, 'bold'), fg='#c88451', bg='#111424').pack(pady=(14, 0))
        tk.Label(self.panel, text='Yupi: первак edition', font=('Segoe UI', 24, 'bold'), fg='#eee8ff', bg='#111424').pack()
        tk.Label(self.panel, text='Лаунчер сервера и сети', font=('Segoe UI', 11), fg='#afa8d8', bg='#111424').pack(pady=(0, 8))

        self.status = tk.Label(self.panel, textvariable=self.status_var, font=('Segoe UI', 11, 'bold'), fg='#ffffff', bg='#111424')
        self.status.pack(pady=(0, 8))

        self.control_frame = tk.Frame(self.panel, bg='#111424')
        self.control_frame.pack(fill='x', padx=34, pady=(0, 12))
        self.start_btn = ttk.Button(self.control_frame, text='Start', command=self.start_server)
        self.start_btn.pack(side='left')
        self.stop_btn = ttk.Button(self.control_frame, text='Stop и выйти', command=self.stop_and_exit)
        self.stop_btn.pack(side='left', padx=(8, 0))
        ttk.Button(self.control_frame, text='Открыть Yupi', command=lambda: self.open_url(self.local_url)).pack(side='right')

        self.info_wrap = tk.Frame(self.panel, bg='#111424')
        self.info_wrap.pack(fill='both', expand=True, padx=34, pady=(0, 16))
        self.address_text = tk.Text(
            self.info_wrap,
            height=18,
            wrap='word',
            bg='#1a1d31',
            fg='#ffffff',
            insertbackground='#ffffff',
            relief='flat',
            font=('Consolas', 11),
            padx=14,
            pady=12,
        )
        self.address_text.pack(fill='both', expand=True)

        self.copy_frame = tk.Frame(self.panel, bg='#111424')
        self.copy_frame.pack(fill='x', padx=34, pady=(0, 16))
        ttk.Button(self.copy_frame, text='Копировать Wi-Fi', command=lambda: self.copy_value(self.wifi_url or self.local_url)).pack(side='left')
        ttk.Button(self.copy_frame, text='Копировать Radmin', command=lambda: self.copy_value(self.radmin_url or 'Radmin IP не найден')).pack(side='left', padx=(8, 0))
        ttk.Button(self.copy_frame, text='Открыть лог', command=self.open_log).pack(side='right')

    def draw_bg(self, event=None):
        self.canvas.delete('bg')
        w = self.canvas.winfo_width() or WINDOW_W
        h = self.canvas.winfo_height() or WINDOW_H
        self.canvas.create_rectangle(0, 0, w, h, fill='#151b37', outline='', tags='bg')
        self.canvas.create_oval(-70, 80, 260, 320, fill='#5120b1', outline='', tags='bg')
        self.canvas.create_oval(w - 320, 30, w + 80, 260, fill='#a04469', outline='', tags='bg')
        self.canvas.create_oval(w * 0.42, h * 0.55, w * 0.72, h * 1.08, fill='#263eaf', outline='', tags='bg')
        self.canvas.tag_lower('bg')

    def refresh_addresses(self):
        self.lan_ips = get_lan_ips()
        self.radmin_ips = [ip for ip in self.lan_ips if is_radmin_ip(ip)]
        ok, note = ensure_https_cert(self.lan_ips)
        self.scheme = 'https' if ok else 'http'
        self.https_note = note
        self.local_url = f'{self.scheme}://127.0.0.1:{self.port}/{CACHE_QUERY}'
        wifi_ip = next((ip for ip in self.lan_ips if not is_radmin_ip(ip)), '')
        self.wifi_url = f'{self.scheme}://{wifi_ip}:{self.port}/{CACHE_QUERY}' if wifi_ip else ''
        self.radmin_url = f'{self.scheme}://{self.radmin_ips[0]}:{self.port}/{CACHE_QUERY}' if self.radmin_ips else ''
        self.render_addresses()

    def render_addresses(self):
        lines = [
            'Yupi Messenger',
            f'Статус: {self.status_var.get()}',
            '',
            f'На этом компьютере: {self.local_url}',
        ]
        if self.wifi_url:
            lines.append(f'Wi-Fi / LAN: {self.wifi_url}')
        else:
            lines.append(f'Wi-Fi / LAN: IP не найден. В cmd введи ipconfig и открой {self.scheme}://ВАШ_IPV4:{self.port}/')
        if self.radmin_url:
            lines.append(f'Radmin VPN: {self.radmin_url}')
        else:
            lines.append(f'Radmin VPN: IP 26.x.x.x не найден. Включи Radmin VPN и перезапусти лаунчер.')
        lines += [
            '',
            f'HTTPS: {self.https_note}',
            'Для звонков через Radmin нужен HTTPS. Если браузер покажет предупреждение о сертификате - нажми Дополнительно / перейти.',
            'Windows Firewall: разреши Python/Yupi для частной сети.',
            '',
            f'Найденные IPv4: {", ".join(self.lan_ips) if self.lan_ips else "не найдены"}',
            f'Лог сервера: {SERVER_LOG}',
        ]
        self.address_text.delete('1.0', 'end')
        self.address_text.insert('1.0', '\n'.join(lines))
        self.address_text.configure(state='disabled')
        self.address_text.configure(state='normal')

    def pick_port(self) -> tuple[int, bool]:
        for port in range(DEFAULT_PORT, DEFAULT_PORT + 20):
            if not is_port_open(LOCAL_HOST, port):
                return port, False
            if get_server_build(port, self.scheme) == APP_BUILD or get_server_build(port, 'http') == APP_BUILD:
                return port, True
        raise RuntimeError('Не найден свободный порт 8000-8019. Закройте старые процессы Yupi.')

    def start_server(self):
        if self.running:
            self.open_url(self.local_url)
            return
        self.start_btn.configure(state='disabled')
        self.status_var.set('Запуск сервера...')
        self.render_addresses()
        threading.Thread(target=self._start_server_thread, daemon=True).start()

    def _start_server_thread(self):
        try:
            self.port, already_running = self.pick_port()
            self.refresh_addresses()
            if already_running:
                self.running = True
                self.started_by_launcher = False
                self.root.after(0, self.on_started)
                return

            env = os.environ.copy()
            env['PYTHONUNBUFFERED'] = '1'
            env['YUPI_HOST'] = '0.0.0.0'
            env['YUPI_PORT'] = str(self.port)
            env['YUPI_SCHEME'] = self.scheme
            if self.scheme == 'https':
                env['YUPI_SSL_CERTFILE'] = str(CERT_FILE)
                env['YUPI_SSL_KEYFILE'] = str(KEY_FILE)

            flags = 0
            if os.name == 'nt':
                flags = getattr(subprocess, 'CREATE_NO_WINDOW', 0)
            cmd = [get_server_python(), 'server.py']
            with open(SERVER_LOG, 'w', encoding='utf-8') as log:
                log.write('Launching: {0}\n'.format(' '.join(cmd)))
                log.write(f'Scheme: {self.scheme}\n')
                log.write(f'Local: {self.local_url}\n')
                log.write(f'Wi-Fi: {self.wifi_url}\n')
                log.write(f'Radmin: {self.radmin_url}\n')
                log.flush()
                self.server_process = subprocess.Popen(cmd, cwd=str(BASE_DIR), env=env, stdout=log, stderr=subprocess.STDOUT, creationflags=flags)
            self.started_by_launcher = True

            for _ in range(160):
                if self.server_process and self.server_process.poll() is not None:
                    raise RuntimeError('Сервер завершился.\n\n' + self.read_log_tail())
                if self.server_ready():
                    self.running = True
                    self.write_access_file()
                    self.root.after(0, self.on_started)
                    return
                time.sleep(0.25)
            raise TimeoutError('Сервер не поднялся вовремя.\n\n' + self.read_log_tail())
        except Exception as exc:
            self.root.after(0, lambda: self.show_error(str(exc)))

    def server_ready(self) -> bool:
        if not is_port_open(LOCAL_HOST, self.port):
            return False
        build = get_server_build(self.port, self.scheme)
        return bool(build)

    def on_started(self):
        self.status_var.set('Yupi запущен')
        self.start_btn.configure(state='normal')
        self.render_addresses()
        if not self.browser_opened:
            self.browser_opened = True
            self.open_url(self.local_url)

    def write_access_file(self):
        lines = [
            'Yupi access URLs',
            f'Version: {APP_BUILD}',
            f'Local: {self.local_url}',
            f'Wi-Fi/LAN: {self.wifi_url or "not detected"}',
            f'Radmin VPN: {self.radmin_url or "not detected"}',
            f'HTTPS note: {self.https_note}',
            'For Radmin calls use HTTPS URL and accept browser certificate warning.',
        ]
        ACCESS_FILE.write_text('\n'.join(lines) + '\n', encoding='utf-8')

    def read_log_tail(self) -> str:
        if not SERVER_LOG.exists():
            return 'Лог сервера не найден.'
        try:
            return '\n'.join(SERVER_LOG.read_text(encoding='utf-8', errors='replace').splitlines()[-30:])
        except Exception as exc:
            return 'Не удалось прочитать лог: {0}'.format(exc)

    def copy_value(self, value: str):
        self.root.clipboard_clear()
        self.root.clipboard_append(value)
        self.root.update()
        self.status_var.set('Скопировано')
        self.render_addresses()

    def open_url(self, url: str):
        if url:
            webbrowser.open(url)

    def open_log(self):
        if SERVER_LOG.exists():
            os.startfile(str(SERVER_LOG)) if os.name == 'nt' else webbrowser.open(str(SERVER_LOG))
        else:
            messagebox.showinfo('Yupi', 'Лог пока не создан.')

    def stop_server(self):
        if self.server_process and self.server_process.poll() is None:
            self.status_var.set('Остановка сервера...')
            self.render_addresses()
            try:
                self.server_process.terminate()
                self.server_process.wait(timeout=5)
            except Exception:
                try:
                    self.server_process.kill()
                except Exception:
                    pass
        self.running = False
        self.server_process = None

    def stop_and_exit(self):
        self.stop_server()
        self.root.destroy()

    def on_close(self):
        self.stop_server()
        self.root.destroy()

    def show_error(self, text: str):
        self.running = False
        self.start_btn.configure(state='normal')
        self.status_var.set('Ошибка запуска')
        self.render_addresses()
        messagebox.showerror('Yupi launcher', 'Не удалось запустить Yupi.\n\n{0}\n\nЛог: {1}'.format(text, SERVER_LOG))

    def run(self):
        self.root.mainloop()


if __name__ == '__main__':
    YupiLauncher().run()
