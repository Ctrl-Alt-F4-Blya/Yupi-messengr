from __future__ import annotations

import os
import subprocess
import sys
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
LOG_DIR = BASE_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)
GET_PIP_PATH = LOG_DIR / "get-pip.py"


def run(cmd: list[str], *, check: bool = False) -> int:
    print(" ".join(f'"{x}"' if " " in x else x for x in cmd), flush=True)
    result = subprocess.run(cmd, cwd=str(BASE_DIR))
    if check and result.returncode != 0:
        raise SystemExit(result.returncode)
    return int(result.returncode)


def has_pip() -> bool:
    return run([sys.executable, "-m", "pip", "--version"]) == 0


def ensure_pip() -> None:
    if has_pip():
        return

    print("Pip not found. Trying ensurepip...", flush=True)
    run([sys.executable, "-m", "ensurepip", "--upgrade", "--default-pip"])
    if has_pip():
        return

    print("ensurepip did not prepare pip. Downloading official get-pip.py...", flush=True)
    url = "https://bootstrap.pypa.io/get-pip.py"
    try:
        urllib.request.urlretrieve(url, GET_PIP_PATH)
    except Exception as exc:
        raise SystemExit(
            "Не удалось скачать get-pip.py. Проверьте интернет или установите Python с галочкой pip.\n"
            f"Ошибка: {exc.__class__.__name__}: {exc}"
        )

    code = run([sys.executable, str(GET_PIP_PATH), "--user"])
    if code != 0:
        code = run([sys.executable, str(GET_PIP_PATH)])
    if code != 0 or not has_pip():
        raise SystemExit("Pip всё ещё недоступен. Переустановите Python с включённым пунктом pip.")


def install_requirements() -> None:
    requirements = BASE_DIR / "requirements.txt"
    run([sys.executable, "-m", "pip", "install", "--disable-pip-version-check", "--user", "-r", str(requirements)], check=True)


def launch_app() -> None:
    launcher = BASE_DIR / "launcher.pyw"
    print("Launching Yupi local website...", flush=True)
    if os.name == "nt":
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        subprocess.Popen([sys.executable, str(launcher)], cwd=str(BASE_DIR), creationflags=creationflags)
    else:
        subprocess.Popen([sys.executable, str(launcher)], cwd=str(BASE_DIR))


def main() -> None:
    print(f"Python: {sys.version.split()[0]}", flush=True)
    print(f"Executable: {sys.executable}", flush=True)
    ensure_pip()
    install_requirements()
    launch_app()


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception as exc:
        print(f"Install error: {exc.__class__.__name__}: {exc}", flush=True)
        raise SystemExit(1)
