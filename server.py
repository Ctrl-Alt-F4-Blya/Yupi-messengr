from __future__ import annotations

import base64
import hashlib
import hmac
import ipaddress
import os
import re
import secrets
import sqlite3
import subprocess
import socket
import threading
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

from fastapi import Depends, FastAPI, Header, HTTPException, Query, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "yupi.db"
STATIC_DIR = BASE_DIR / "static_ya_ne_spal"
CUSTOM_MEDIA_DIR = BASE_DIR / "media_baraholka"
CUSTOM_ICON_DIR = CUSTOM_MEDIA_DIR / "icons"
CUSTOM_BACKGROUND_DIR = CUSTOM_MEDIA_DIR / "backgrounds"
CUSTOM_AVATAR_DIR = CUSTOM_MEDIA_DIR / "avatars"
APP_HOST = os.getenv("YUPI_HOST", "0.0.0.0")
APP_PORT = int(os.getenv("YUPI_PORT", "8000"))

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_RE = re.compile(r"^\+?[0-9][0-9\-\s\(\)]{8,}$")
DB_LOCK = threading.RLock()

APP_BUILD = "v29.11-pervak-clean-music"
APP_VERSION = "2.10.6"
ADMIN_EMAIL = os.getenv("YUPI_ADMIN_EMAIL", "support@yupi.local").strip().lower()
APP_SCHEME = os.getenv("YUPI_SCHEME", "http").strip().lower()
SSL_CERTFILE = os.getenv("YUPI_SSL_CERTFILE", "").strip()
SSL_KEYFILE = os.getenv("YUPI_SSL_KEYFILE", "").strip()
if APP_SCHEME not in {"http", "https"}:
    APP_SCHEME = "https" if SSL_CERTFILE and SSL_KEYFILE else "http"
SESSION_TTL_HOURS = max(1, int(os.getenv("YUPI_SESSION_TTL_HOURS", "168")))
ENABLE_DEMO_MODE = os.getenv("YUPI_ENABLE_DEMO_MODE", "1").strip().lower() in {"1", "true", "yes", "on"}
ALLOW_DESKTOP_ACTIONS = os.getenv("YUPI_ALLOW_DESKTOP_ACTIONS", "1").strip().lower() in {"1", "true", "yes", "on"}
LOGIN_RATE_LIMIT_ATTEMPTS = max(3, int(os.getenv("YUPI_LOGIN_RATE_LIMIT_ATTEMPTS", "6")))
LOGIN_RATE_LIMIT_WINDOW_SECONDS = max(60, int(os.getenv("YUPI_LOGIN_RATE_LIMIT_WINDOW_SECONDS", "300")))
LOGIN_RATE_LIMIT_BLOCK_SECONDS = max(60, int(os.getenv("YUPI_LOGIN_RATE_LIMIT_BLOCK_SECONDS", "600")))
MAX_MESSAGES_PAGE_SIZE = max(20, int(os.getenv("YUPI_MAX_MESSAGES_PAGE_SIZE", "100")))

app = FastAPI(title="Yupi Messenger", version=APP_VERSION)


class RegisterRequest(BaseModel):
    display_name: str = ""
    email: str = ""
    phone: str = ""
    password: str = ""


class LoginRequest(BaseModel):
    login: str = ""
    password: str = ""


class UpdateProfileRequest(BaseModel):
    first_name: str = ""
    last_name: str = ""
    display_name: str = ""
    bio: str = ""
    youtube_url: str = ""


class DataUrlUploadRequest(BaseModel):
    filename: str = ""
    data_url: str = ""


class UpkLinkRequest(BaseModel):
    conversation_id: int = 0


class SendMessageRequest(BaseModel):
    body: str = ""


class LocalMediaUploadRequest(BaseModel):
    kind: str = ""
    filename: str = ""
    data_url: str = ""
    slot: int = 0


class BackgroundSelectRequest(BaseModel):
    name: str = ""


class ExternalOpenRequest(BaseModel):
    url: str = ""


LOGIN_ATTEMPTS: Dict[str, Dict[str, float]] = {}


class ConnectionManager:
    def __init__(self) -> None:
        self.active: Dict[int, Set[WebSocket]] = {}
        self.meta: Dict[int, Dict[WebSocket, Dict[str, Any]]] = {}
        self.lock = threading.RLock()

    async def connect(self, user_id: int, websocket: WebSocket, meta: Optional[Dict[str, Any]] = None) -> None:
        await websocket.accept()
        with self.lock:
            self.active.setdefault(user_id, set()).add(websocket)
            self.meta.setdefault(user_id, {})[websocket] = dict(meta or {})

    def disconnect(self, user_id: int, websocket: WebSocket) -> Optional[Dict[str, Any]]:
        with self.lock:
            saved_meta = self.meta.get(user_id, {}).pop(websocket, None)
            if self.meta.get(user_id) == {}:
                self.meta.pop(user_id, None)
            sockets = self.active.get(user_id)
            if not sockets:
                return saved_meta
            sockets.discard(websocket)
            if not sockets:
                self.active.pop(user_id, None)
            return saved_meta

    async def send_to_user(self, user_id: int, payload: Dict[str, Any]) -> None:
        with self.lock:
            sockets = list(self.active.get(user_id, set()))
        stale: List[WebSocket] = []
        for socket in sockets:
            try:
                await socket.send_json(payload)
            except Exception:
                stale.append(socket)
        for socket in stale:
            self.disconnect(user_id, socket)

    async def send_to_users(self, user_ids: List[int], payload: Dict[str, Any]) -> None:
        for user_id in sorted(set(user_ids)):
            await self.send_to_user(user_id, payload)

    def is_online(self, user_id: int) -> bool:
        with self.lock:
            return bool(self.active.get(user_id))

    def online_user_ids(self) -> List[int]:
        with self.lock:
            return list(self.active.keys())

    def online_connections(self) -> List[Dict[str, Any]]:
        with self.lock:
            result: List[Dict[str, Any]] = []
            for user_id, sockets in self.active.items():
                for socket in sockets:
                    meta = dict(self.meta.get(user_id, {}).get(socket, {}))
                    meta["user_id"] = user_id
                    result.append(meta)
            return result


manager = ConnectionManager()


@app.middleware("http")
async def no_cache_for_ui(request: Request, call_next):
    response = await call_next(request)
    path = request.url.path
    if path == "/" or path.startswith("/static/"):
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    return response


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_phone(phone: str) -> str:
    return re.sub(r"[^0-9+]", "", phone.strip())


@contextmanager
def db_cursor(commit: bool = False):
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        cur = conn.cursor()
        yield cur
        if commit:
            conn.commit()
    finally:
        conn.close()


def query_one(sql: str, params: Tuple[Any, ...] = ()) -> Optional[sqlite3.Row]:
    with DB_LOCK, db_cursor() as cur:
        cur.execute(sql, params)
        return cur.fetchone()


def query_all(sql: str, params: Tuple[Any, ...] = ()) -> List[sqlite3.Row]:
    with DB_LOCK, db_cursor() as cur:
        cur.execute(sql, params)
        return cur.fetchall()


def table_has_column(table: str, column: str) -> bool:
    with DB_LOCK, db_cursor() as cur:
        cur.execute(f"PRAGMA table_info({table})")
        return any(row["name"] == column for row in cur.fetchall())


def execute(sql: str, params: Tuple[Any, ...] = ()) -> int:
    with DB_LOCK, db_cursor(commit=True) as cur:
        cur.execute(sql, params)
        return cur.lastrowid


def execute_many(statements: List[Tuple[str, Tuple[Any, ...]]]) -> None:
    with DB_LOCK, db_cursor(commit=True) as cur:
        for sql, params in statements:
            cur.execute(sql, params)


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 200_000)
    return base64.b64encode(salt).decode("utf-8") + "$" + base64.b64encode(digest).decode("utf-8")


def verify_password(password: str, encoded: str) -> bool:
    try:
        salt_b64, digest_b64 = encoded.split("$", 1)
        salt = base64.b64decode(salt_b64.encode("utf-8"))
        digest = base64.b64decode(digest_b64.encode("utf-8"))
    except Exception:
        return False
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 200_000)
    return hmac.compare_digest(candidate, digest)


def make_token() -> str:
    return secrets.token_urlsafe(48)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def session_expires_at() -> str:
    return (datetime.now(timezone.utc) + timedelta(hours=SESSION_TTL_HOURS)).isoformat()


def request_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "").strip()
    if forwarded:
        return forwarded.split(",", 1)[0].strip()
    return (request.client.host if request.client else "unknown").strip() or "unknown"


def websocket_client_ip(websocket: WebSocket) -> str:
    forwarded = websocket.headers.get("x-forwarded-for", "").strip()
    if forwarded:
        return forwarded.split(",", 1)[0].strip()
    return (websocket.client.host if websocket.client else "unknown").strip() or "unknown"


def client_kind_from_ip(value: str) -> str:
    value = str(value or "").strip()
    if value in {"127.0.0.1", "::1", "localhost"}:
        return "local"
    if is_radmin_ip(value):
        return "radmin"
    try:
        ip = ipaddress.ip_address(value)
    except Exception:
        return "unknown"
    if ip.is_private:
        return "lan"
    return "internet"


def record_access_event(user_id: int, event_type: str, ip_address: str, user_agent: str = "", details: str = "") -> None:
    try:
        execute(
            """
            INSERT INTO user_access_log (user_id, event_type, ip_address, user_agent, details, created_at, last_seen_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (int(user_id), str(event_type)[:40], str(ip_address)[:80], str(user_agent or "")[:260], str(details or "")[:500], utc_now(), utc_now()),
        )
    except Exception:
        pass


def ensure_local_desktop_action(request: Request) -> None:
    if not ALLOW_DESKTOP_ACTIONS:
        raise HTTPException(status_code=403, detail="Desktop-действия отключены на сервере")
    client_ip = request_client_ip(request)
    if client_ip not in {"127.0.0.1", "::1", "localhost"} and APP_HOST != "127.0.0.1":
        raise HTTPException(status_code=403, detail="Desktop-действия разрешены только локально")


def cleanup_expired_sessions() -> None:
    now_iso = utc_now()
    execute("DELETE FROM sessions WHERE expires_at IS NOT NULL AND expires_at <= ?", (now_iso,))


def prune_login_attempts() -> None:
    now_ts = datetime.now(timezone.utc).timestamp()
    stale_before = now_ts - max(LOGIN_RATE_LIMIT_WINDOW_SECONDS, LOGIN_RATE_LIMIT_BLOCK_SECONDS) * 2
    for key, value in list(LOGIN_ATTEMPTS.items()):
        blocked_until = float(value.get("blocked_until", 0.0))
        last_failed_at = float(value.get("last_failed_at", 0.0))
        if blocked_until < now_ts and last_failed_at < stale_before:
            LOGIN_ATTEMPTS.pop(key, None)


def login_rate_limit_key(login_value: str, request: Request) -> str:
    return f"{request_client_ip(request)}|{login_value.strip().lower()}"


def ensure_login_allowed(login_value: str, request: Request) -> None:
    prune_login_attempts()
    key = login_rate_limit_key(login_value, request)
    now_ts = datetime.now(timezone.utc).timestamp()
    entry = LOGIN_ATTEMPTS.get(key)
    if not entry:
        return
    blocked_until = float(entry.get("blocked_until", 0.0))
    if blocked_until > now_ts:
        retry_after = int(blocked_until - now_ts)
        raise HTTPException(status_code=429, detail=f"Слишком много попыток входа. Повторите через {retry_after} сек.")
    if now_ts - float(entry.get("window_started_at", 0.0)) > LOGIN_RATE_LIMIT_WINDOW_SECONDS:
        LOGIN_ATTEMPTS.pop(key, None)


def mark_login_failed(login_value: str, request: Request) -> None:
    key = login_rate_limit_key(login_value, request)
    now_ts = datetime.now(timezone.utc).timestamp()
    entry = LOGIN_ATTEMPTS.get(key)
    if not entry or now_ts - float(entry.get("window_started_at", 0.0)) > LOGIN_RATE_LIMIT_WINDOW_SECONDS:
        entry = {"count": 0.0, "window_started_at": now_ts, "blocked_until": 0.0, "last_failed_at": 0.0}
    entry["count"] = float(entry.get("count", 0.0)) + 1.0
    entry["last_failed_at"] = now_ts
    if entry["count"] >= LOGIN_RATE_LIMIT_ATTEMPTS:
        entry["blocked_until"] = now_ts + LOGIN_RATE_LIMIT_BLOCK_SECONDS
        entry["count"] = 0.0
        entry["window_started_at"] = now_ts
    LOGIN_ATTEMPTS[key] = entry


def clear_login_failures(login_value: str, request: Request) -> None:
    LOGIN_ATTEMPTS.pop(login_rate_limit_key(login_value, request), None)


def validate_email(email: str) -> str:
    email = email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Некорректный email")
    return email


def validate_phone(phone: str) -> str:
    phone = normalize_phone(phone)
    if not PHONE_RE.match(phone):
        raise HTTPException(status_code=400, detail="Некорректный номер телефона")
    return phone


def validate_password(password: str) -> str:
    password = password.strip()
    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Пароль должен быть не короче 6 символов")
    return password


def safe_int(value: Any, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def parse_int(value: Any, field_name: str = "id") -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail=f"Некорректное поле {field_name}")


def is_admin_user(user: sqlite3.Row) -> bool:
    return str(user["email"]).strip().lower() == ADMIN_EMAIL


def custom_media_url(kind: str, filename: str) -> str:
    safe_name = Path(str(filename or "")).name
    if not safe_name:
        return ""
    encoded_name = urllib.parse.quote(safe_name)
    return f"/custom_media/{kind}/{encoded_name}?v={int(datetime.now(timezone.utc).timestamp())}"


def serialize_user(row: sqlite3.Row, include_private: bool = False) -> Dict[str, Any]:
    keys = set(row.keys())
    avatar_filename = row["avatar_filename"] if "avatar_filename" in keys and row["avatar_filename"] else ""
    data = {
        "id": int(row["id"]),
        "display_name": row["display_name"],
        "first_name": row["first_name"] if "first_name" in keys and row["first_name"] else "",
        "last_name": row["last_name"] if "last_name" in keys and row["last_name"] else "",
        "avatar_color": row["avatar_color"],
        "avatar_url": custom_media_url("avatars", avatar_filename) if avatar_filename else "",
        "bio": row["bio"] or "",
        "youtube_url": row["youtube_url"] if "youtube_url" in keys and row["youtube_url"] else "",
        "profile_upk_conversation_id": int(row["profile_upk_conversation_id"]) if "profile_upk_conversation_id" in keys and row["profile_upk_conversation_id"] else 0,
        "created_at": row["created_at"],
    }
    if include_private:
        data["email"] = row["email"]
        data["phone"] = row["phone"]
    return data


def serialize_message(row: sqlite3.Row) -> Dict[str, Any]:
    keys = set(row.keys())
    avatar_filename = row["avatar_filename"] if "avatar_filename" in keys and row["avatar_filename"] else ""
    return {
        "id": int(row["id"]),
        "conversation_id": int(row["conversation_id"]),
        "sender": {
            "id": int(row["sender_id"]),
            "display_name": row["display_name"],
            "avatar_color": row["avatar_color"],
            "avatar_url": custom_media_url("avatars", avatar_filename) if avatar_filename else "",
        },
        "body": row["body"],
        "message_type": row["message_type"],
        "created_at": row["created_at"],
    }


def conversation_member_ids(conversation_id: int) -> List[int]:
    rows = query_all("SELECT user_id FROM conversation_members WHERE conversation_id = ?", (conversation_id,))
    return [int(row["user_id"]) for row in rows]


def user_is_member(user_id: int, conversation_id: int) -> bool:
    row = query_one(
        "SELECT 1 FROM conversation_members WHERE user_id = ? AND conversation_id = ?",
        (user_id, conversation_id),
    )
    return bool(row)


def get_other_user(conversation_id: int, user_id: int) -> Optional[sqlite3.Row]:
    return query_one(
        """
        SELECT u.*
        FROM conversation_members cm
        JOIN users u ON u.id = cm.user_id
        WHERE cm.conversation_id = ? AND cm.user_id != ?
        ORDER BY u.id ASC
        LIMIT 1
        """,
        (conversation_id, user_id),
    )


def last_message_for_conversation(conversation_id: int) -> Optional[sqlite3.Row]:
    return query_one(
        """
        SELECT m.*, u.display_name, u.avatar_color, u.avatar_filename
        FROM messages m
        JOIN users u ON u.id = m.sender_id
        WHERE m.conversation_id = ?
        ORDER BY m.id DESC
        LIMIT 1
        """,
        (conversation_id,),
    )


def default_prefs() -> Dict[str, Any]:
    return {
        "is_archived": False,
        "is_muted": False,
        "is_favorite": False,
        "is_deleted": False,
    }


def get_conversation_prefs(user_id: int, conversation_id: int) -> Dict[str, Any]:
    row = query_one(
        """
        SELECT is_archived, is_muted, is_favorite, is_deleted
        FROM conversation_prefs
        WHERE user_id = ? AND conversation_id = ?
        LIMIT 1
        """,
        (user_id, conversation_id),
    )
    prefs = default_prefs()
    if row:
        prefs.update(
            {
                "is_archived": bool(row["is_archived"]),
                "is_muted": bool(row["is_muted"]),
                "is_favorite": bool(row["is_favorite"]),
                "is_deleted": bool(row["is_deleted"]),
            }
        )
    return prefs


def upsert_conversation_prefs(user_id: int, conversation_id: int, **updates: Any) -> Dict[str, Any]:
    current = get_conversation_prefs(user_id, conversation_id)
    for key in list(current.keys()):
        if key in updates and updates[key] is not None:
            current[key] = bool(updates[key])
    execute(
        """
        INSERT INTO conversation_prefs (
            user_id, conversation_id, is_archived, is_muted, is_favorite, is_deleted, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id, conversation_id) DO UPDATE SET
            is_archived = excluded.is_archived,
            is_muted = excluded.is_muted,
            is_favorite = excluded.is_favorite,
            is_deleted = excluded.is_deleted,
            updated_at = excluded.updated_at
        """,
        (
            user_id,
            conversation_id,
            int(current["is_archived"]),
            int(current["is_muted"]),
            int(current["is_favorite"]),
            int(current["is_deleted"]),
            utc_now(),
        ),
    )
    return current


def clear_deleted_for_conversation(conversation_id: int) -> None:
    members = conversation_member_ids(conversation_id)
    for user_id in members:
        upsert_conversation_prefs(user_id, conversation_id, is_deleted=False)


def derive_kind(row: sqlite3.Row) -> str:
    keys = set(row.keys())
    if "kind" in keys and row["kind"]:
        return str(row["kind"])
    if bool(row["is_group"]):
        title = (row["title"] or "").lower()
        if title.startswith("yupi key") or title.startswith("yupikey"):
            return "yupikey"
        return "group"
    return "direct"


def conversation_owner_id(row: sqlite3.Row, conversation_id: int) -> Optional[int]:
    if "owner_id" in row.keys() and row["owner_id"] is not None:
        return int(row["owner_id"])
    first = query_one(
        "SELECT user_id FROM conversation_members WHERE conversation_id = ? ORDER BY joined_at ASC, user_id ASC LIMIT 1",
        (conversation_id,),
    )
    return int(first["user_id"]) if first else None


def serialize_conversation(row: sqlite3.Row, current_user_id: int) -> Dict[str, Any]:
    conversation_id = int(row["id"])
    kind = derive_kind(row)
    owner_id = conversation_owner_id(row, conversation_id)
    other_user = get_other_user(conversation_id, current_user_id)
    last_message = last_message_for_conversation(conversation_id)
    prefs = get_conversation_prefs(current_user_id, conversation_id)
    title = row["title"]
    if kind == "direct" and other_user:
        title = other_user["display_name"]
    if kind == "yupikey" and title:
        title = title.replace("Yupi Key - ", "").replace("Yupi Key — ", "")
    conversation_avatar = row["avatar_filename"] if "avatar_filename" in row.keys() and row["avatar_filename"] else ""
    return {
        "id": conversation_id,
        "title": title or "Yupi Chat",
        "kind": kind,
        "is_group": bool(row["is_group"]),
        "owner_id": owner_id,
        "is_owner": owner_id == current_user_id,
        "profile_linked": kind == "yupikey" and owner_id == current_user_id,
        "avatar_url": custom_media_url("avatars", conversation_avatar) if conversation_avatar else "",
        "created_at": row["created_at"],
        "other_user": serialize_user(other_user) if other_user else None,
        "last_message": serialize_message(last_message) if last_message else None,
        "is_online": manager.is_online(int(other_user["id"])) if other_user else False,
        "member_count": len(conversation_member_ids(conversation_id)),
        "prefs": prefs,
    }


def create_session(user_id: int) -> str:
    token = make_token()
    execute(
        "INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)",
        (token, user_id, utc_now()),
    )
    return token


def current_user_from_token(token: Optional[str]) -> sqlite3.Row:
    if not token:
        raise HTTPException(status_code=401, detail="Нужна авторизация")
    row = query_one(
        """
        SELECT u.*
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token = ?
        LIMIT 1
        """,
        (token,),
    )
    if not row:
        raise HTTPException(status_code=401, detail="Сессия не найдена")
    return row


def get_current_user(authorization: Optional[str] = Header(default=None)) -> sqlite3.Row:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Нужен Bearer token")
    token = authorization.split(" ", 1)[1].strip()
    return current_user_from_token(token)


def find_or_create_direct_conversation(user_a: int, user_b: int) -> int:
    row = query_one(
        """
        SELECT c.id
        FROM conversations c
        JOIN conversation_members cm1 ON cm1.conversation_id = c.id AND cm1.user_id = ?
        JOIN conversation_members cm2 ON cm2.conversation_id = c.id AND cm2.user_id = ?
        WHERE c.is_group = 0
          AND (SELECT COUNT(*) FROM conversation_members WHERE conversation_id = c.id) = 2
        LIMIT 1
        """,
        (user_a, user_b),
    )
    if row:
        conversation_id = int(row["id"])
        clear_deleted_for_conversation(conversation_id)
        return conversation_id
    conversation_id = execute(
        "INSERT INTO conversations (title, is_group, kind, owner_id, created_at) VALUES (?, 0, 'direct', ?, ?)",
        (None, user_a, utc_now()),
    )
    execute_many(
        [
            ("INSERT INTO conversation_members (conversation_id, user_id, joined_at) VALUES (?, ?, ?)", (conversation_id, user_a, utc_now())),
            ("INSERT INTO conversation_members (conversation_id, user_id, joined_at) VALUES (?, ?, ?)", (conversation_id, user_b, utc_now())),
        ]
    )
    clear_deleted_for_conversation(conversation_id)
    return conversation_id


def create_group_conversation(owner_id: int, title: str, member_ids: List[int], kind: str = "group") -> int:
    clean_title = title.strip()[:60]
    if len(clean_title) < 2:
        raise HTTPException(status_code=400, detail="Введите название")
    kind = kind if kind in {"group", "yupikey", "comments"} else "group"
    all_member_ids = sorted(set([owner_id] + [int(member_id) for member_id in member_ids if int(member_id) != owner_id]))
    if kind == "group" and len(all_member_ids) < 2:
        raise HTTPException(status_code=400, detail="Для группы нужен хотя бы один участник")
    existing = query_all(
        f"SELECT id FROM users WHERE id IN ({','.join(['?']*len(all_member_ids))})",
        tuple(all_member_ids),
    )
    if len(existing) != len(all_member_ids):
        raise HTTPException(status_code=404, detail="Один или несколько пользователей не найдены")
    conversation_id = execute(
        "INSERT INTO conversations (title, is_group, kind, owner_id, created_at) VALUES (?, 1, ?, ?, ?)",
        (clean_title, kind, owner_id, utc_now()),
    )
    execute_many(
        [
            ("INSERT INTO conversation_members (conversation_id, user_id, joined_at) VALUES (?, ?, ?)", (conversation_id, user_id, utc_now()))
            for user_id in all_member_ids
        ]
    )
    clear_deleted_for_conversation(conversation_id)
    return conversation_id


def seed_data() -> None:
    if query_one("SELECT id FROM users LIMIT 1"):
        return

    palette = ["#8f6bff", "#ff8ba7", "#7f86ff", "#f4a261", "#aa77ff"]
    demo_users = [
        ("Yupi Support", "support@yupi.local", "+10000000001", "demo123", "Добро пожаловать в Yupi", palette[0]),
        ("Nika", "nika@yupi.local", "+10000000002", "demo123", "Онлайн", palette[1]),
        ("Mark", "mark@yupi.local", "+10000000003", "demo123", "На связи", palette[2]),
        ("Liza", "liza@yupi.local", "+10000000004", "demo123", "Готова к звонку", palette[3]),
        ("Kai", "kai@yupi.local", "+10000000005", "demo123", "В работе", palette[4]),
    ]

    user_ids: List[int] = []
    for display_name, email, phone, password, bio, color in demo_users:
        user_id = execute(
            """
            INSERT INTO users (display_name, email, phone, password_hash, bio, avatar_color, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (display_name, email, phone, hash_password(password), bio, color, utc_now()),
        )
        user_ids.append(user_id)

    support_id, nika_id, mark_id, liza_id, kai_id = user_ids

    dm_1 = find_or_create_direct_conversation(support_id, nika_id)
    dm_2 = find_or_create_direct_conversation(support_id, mark_id)
    dm_3 = find_or_create_direct_conversation(support_id, liza_id)
    dm_4 = find_or_create_direct_conversation(support_id, kai_id)
    group_id = create_group_conversation(support_id, "Yupi Team", [nika_id, mark_id])

    demo_messages = [
        (dm_1, support_id, "Привет. Это стартовый чат Yupi."),
        (dm_1, nika_id, "Интерфейс готов к проверке."),
        (dm_1, support_id, "Можно писать, звонить и тестировать WebRTC."),
        (dm_2, mark_id, "Я проверил список диалогов и поиск."),
        (dm_2, support_id, "Отлично. Добавил вход по email или номеру."),
        (dm_3, liza_id, "Сплэш-экран выглядит как в макете."),
        (dm_4, kai_id, "Боковая панель и карточки чатов собраны."),
        (group_id, support_id, "Команда, это демо-группа для первых тестов."),
        (group_id, nika_id, "Ок. Проверяю звонки."),
        (group_id, mark_id, "Сообщения в реальном времени доходят."),
    ]
    for conversation_id, sender_id, body in demo_messages:
        execute(
            "INSERT INTO messages (conversation_id, sender_id, body, message_type, created_at) VALUES (?, ?, ?, 'text', ?)",
            (conversation_id, sender_id, body, utc_now()),
        )


def get_conversation_row(conversation_id: int) -> Optional[sqlite3.Row]:
    return query_one("SELECT * FROM conversations WHERE id = ?", (conversation_id,))


def require_yupikey(conversation_id: int, user_id: int) -> sqlite3.Row:
    row = get_conversation_row(conversation_id)
    if not row or derive_kind(row) != "yupikey":
        raise HTTPException(status_code=404, detail="Yupi Key не найден")
    if not user_is_member(user_id, conversation_id):
        raise HTTPException(status_code=403, detail="Нет доступа к Yupi Key")
    return row


def ensure_yupikey_owner(conversation_id: int, user_id: int) -> sqlite3.Row:
    row = require_yupikey(conversation_id, user_id)
    owner_id = conversation_owner_id(row, conversation_id)
    if owner_id != user_id:
        raise HTTPException(status_code=403, detail="Публиковать может только создатель Yupi Key")
    return row


def serialize_yupikey_post(row: sqlite3.Row, current_user_id: int) -> Dict[str, Any]:
    post_id = int(row["id"])
    reactions = query_all("SELECT reaction, COUNT(*) AS count FROM post_reactions WHERE post_id = ? GROUP BY reaction", (post_id,))
    my_reaction = query_one("SELECT reaction FROM post_reactions WHERE post_id = ? AND user_id = ?", (post_id, current_user_id))
    comments_count = 0
    if row["comment_conversation_id"]:
        count_row = query_one("SELECT COUNT(*) AS count FROM messages WHERE conversation_id = ?", (int(row["comment_conversation_id"]),))
        comments_count = int(count_row["count"]) if count_row else 0
    return {
        "id": post_id,
        "conversation_id": int(row["conversation_id"]),
        "author": {
            "id": int(row["author_id"]),
            "display_name": row["display_name"],
            "avatar_color": row["avatar_color"],
        },
        "body": row["body"],
        "created_at": row["created_at"],
        "comment_conversation_id": int(row["comment_conversation_id"]) if row["comment_conversation_id"] else None,
        "comments_count": comments_count,
        "reactions": {item["reaction"]: int(item["count"]) for item in reactions},
        "my_reaction": my_reaction["reaction"] if my_reaction else None,
    }


def ensure_demo_yupikey() -> None:
    support = query_one("SELECT * FROM users WHERE email = ?", ("support@yupi.local",))
    if not support:
        return
    existing = query_one("SELECT id FROM conversations WHERE kind = 'yupikey' LIMIT 1")
    if existing:
        return
    members = query_all("SELECT id FROM users WHERE id != ? ORDER BY id ASC LIMIT 3", (int(support["id"]),))
    conversation_id = create_group_conversation(
        int(support["id"]),
        "Yupi Key - Yupi News",
        [int(row["id"]) for row in members],
        kind="yupikey",
    )
    execute(
        "INSERT INTO yupikey_posts (conversation_id, author_id, body, created_at) VALUES (?, ?, ?, ?)",
        (conversation_id, int(support["id"]), "Мы запустились. Это UPK-канал: посты публикует только создатель, а обсуждение открывается через кнопку комментариев.", utc_now()),
    )


def init_db() -> None:
    statements = [
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            display_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            bio TEXT DEFAULT '',
            first_name TEXT DEFAULT '',
            last_name TEXT DEFAULT '',
            youtube_url TEXT DEFAULT '',
            avatar_filename TEXT DEFAULT '',
            avatar_color TEXT DEFAULT '#8f6bff',
            created_at TEXT NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            token_hash TEXT,
            user_id INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            expires_at TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            is_group INTEGER NOT NULL DEFAULT 0,
            kind TEXT NOT NULL DEFAULT 'direct',
            owner_id INTEGER,
            avatar_filename TEXT DEFAULT '',
            created_at TEXT NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS conversation_members (
            conversation_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            joined_at TEXT NOT NULL,
            PRIMARY KEY (conversation_id, user_id),
            FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conversation_id INTEGER NOT NULL,
            sender_id INTEGER NOT NULL,
            body TEXT NOT NULL,
            message_type TEXT NOT NULL DEFAULT 'text',
            created_at TEXT NOT NULL,
            FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
            FOREIGN KEY(sender_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS yupikey_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conversation_id INTEGER NOT NULL,
            author_id INTEGER NOT NULL,
            body TEXT NOT NULL,
            created_at TEXT NOT NULL,
            comment_conversation_id INTEGER,
            FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
            FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY(comment_conversation_id) REFERENCES conversations(id) ON DELETE SET NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS post_reactions (
            post_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            reaction TEXT NOT NULL,
            created_at TEXT NOT NULL,
            PRIMARY KEY (post_id, user_id),
            FOREIGN KEY(post_id) REFERENCES yupikey_posts(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS conversation_prefs (
            user_id INTEGER NOT NULL,
            conversation_id INTEGER NOT NULL,
            is_archived INTEGER NOT NULL DEFAULT 0,
            is_muted INTEGER NOT NULL DEFAULT 0,
            is_favorite INTEGER NOT NULL DEFAULT 0,
            is_deleted INTEGER NOT NULL DEFAULT 0,
            updated_at TEXT NOT NULL,
            PRIMARY KEY (user_id, conversation_id),
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS user_access_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            event_type TEXT NOT NULL,
            ip_address TEXT DEFAULT '',
            user_agent TEXT DEFAULT '',
            details TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            last_seen_at TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
        )
        """,
        "CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)",
        "CREATE INDEX IF NOT EXISTS idx_conversation_members_user_id ON conversation_members(user_id)",
        "CREATE INDEX IF NOT EXISTS idx_messages_conversation_id_id ON messages(conversation_id, id)",
        "CREATE INDEX IF NOT EXISTS idx_yupikey_posts_conversation_id_id ON yupikey_posts(conversation_id, id)",
        "CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON post_reactions(post_id)",
        "CREATE INDEX IF NOT EXISTS idx_user_access_log_user_id_id ON user_access_log(user_id, id)",
        "CREATE INDEX IF NOT EXISTS idx_user_access_log_created_at ON user_access_log(created_at)",
    ]
    with DB_LOCK, db_cursor(commit=True) as cur:
        for statement in statements:
            cur.execute(statement)
        user_columns = {row["name"] for row in cur.execute("PRAGMA table_info(users)").fetchall()}
        user_migrations = {
            "first_name": "ALTER TABLE users ADD COLUMN first_name TEXT DEFAULT ''",
            "last_name": "ALTER TABLE users ADD COLUMN last_name TEXT DEFAULT ''",
            "youtube_url": "ALTER TABLE users ADD COLUMN youtube_url TEXT DEFAULT ''",
            "avatar_filename": "ALTER TABLE users ADD COLUMN avatar_filename TEXT DEFAULT ''",
            "profile_upk_conversation_id": "ALTER TABLE users ADD COLUMN profile_upk_conversation_id INTEGER DEFAULT 0",
        }
        for column, statement in user_migrations.items():
            if column not in user_columns:
                cur.execute(statement)
        cur.execute("UPDATE users SET first_name = display_name WHERE COALESCE(first_name, '') = ''")
        cur.execute("UPDATE users SET last_name = '' WHERE last_name IS NULL")
        cur.execute("UPDATE users SET youtube_url = '' WHERE youtube_url IS NULL")
        cur.execute("UPDATE users SET avatar_filename = '' WHERE avatar_filename IS NULL")
        cur.execute("UPDATE users SET profile_upk_conversation_id = 0 WHERE profile_upk_conversation_id IS NULL")

        columns = {row["name"] for row in cur.execute("PRAGMA table_info(conversations)").fetchall()}
        if "kind" not in columns:
            cur.execute("ALTER TABLE conversations ADD COLUMN kind TEXT NOT NULL DEFAULT 'direct'")
        if "owner_id" not in columns:
            cur.execute("ALTER TABLE conversations ADD COLUMN owner_id INTEGER")
        if "avatar_filename" not in columns:
            cur.execute("ALTER TABLE conversations ADD COLUMN avatar_filename TEXT DEFAULT ''")
        cur.execute("UPDATE conversations SET kind = 'group' WHERE is_group = 1 AND (kind IS NULL OR kind = 'direct')")
        cur.execute("UPDATE conversations SET kind = 'yupikey' WHERE is_group = 1 AND lower(COALESCE(title, '')) LIKE 'yupi key%'")
        cur.execute("UPDATE conversations SET owner_id = (SELECT cm.user_id FROM conversation_members cm WHERE cm.conversation_id = conversations.id ORDER BY cm.joined_at ASC, cm.user_id ASC LIMIT 1) WHERE owner_id IS NULL")
        session_columns = {row["name"] for row in cur.execute("PRAGMA table_info(sessions)").fetchall()}
        if "token_hash" not in session_columns:
            cur.execute("ALTER TABLE sessions ADD COLUMN token_hash TEXT")
        if "expires_at" not in session_columns:
            cur.execute("ALTER TABLE sessions ADD COLUMN expires_at TEXT")
        cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash)")
    with DB_LOCK, db_cursor(commit=True) as cur:
        cur.execute("SELECT token, created_at, expires_at, token_hash FROM sessions")
        session_rows = cur.fetchall()
        for row in session_rows:
            token_hash = row["token_hash"] if "token_hash" in row.keys() else None
            expires_at = row["expires_at"] if "expires_at" in row.keys() else None
            updates = []
            params = []
            if not token_hash and row["token"]:
                updates.append("token_hash = ?")
                params.append(hash_token(str(row["token"])))
            if not expires_at:
                created_at = datetime.fromisoformat(str(row["created_at"])) if row["created_at"] else datetime.now(timezone.utc)
                if created_at.tzinfo is None:
                    created_at = created_at.replace(tzinfo=timezone.utc)
                updates.append("expires_at = ?")
                params.append((created_at + timedelta(hours=SESSION_TTL_HOURS)).isoformat())
            if updates:
                params.append(row["token"])
                cur.execute(f"UPDATE sessions SET {', '.join(updates)} WHERE token = ?", tuple(params))
    if ENABLE_DEMO_MODE:
        seed_data()
        ensure_demo_yupikey()
    cleanup_expired_sessions()



def is_radmin_ip(value: str) -> bool:
    value = str(value or "").strip()
    return bool(re.match(r"^26\.(?:\d{1,3}\.){2}\d{1,3}$", value))


def is_access_ip(value: str) -> bool:
    value = str(value or "").strip()
    try:
        ip = ipaddress.ip_address(value)
    except Exception:
        return False
    if ip.version != 4:
        return False
    if ip.is_loopback or ip.is_link_local or ip.is_multicast or ip.is_unspecified:
        return False
    return bool(ip.is_private or is_radmin_ip(value))


def add_access_ip(candidates: List[str], value: str) -> None:
    value = str(value or "").strip()
    if is_access_ip(value) and value not in candidates:
        candidates.append(value)


def detect_access_ips() -> List[str]:
    candidates: List[str] = []
    for target in [("8.8.8.8", 80), ("1.1.1.1", 80), ("192.168.1.1", 80), ("26.0.0.1", 80)]:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
                sock.settimeout(0.25)
                sock.connect(target)
                add_access_ip(candidates, sock.getsockname()[0])
        except OSError:
            pass

    try:
        hostname = socket.gethostname()
        for info in socket.getaddrinfo(hostname, None, socket.AF_INET):
            add_access_ip(candidates, info[4][0])
    except OSError:
        pass

    if os.name == "nt":
        try:
            proc = subprocess.run(
                ["ipconfig"],
                capture_output=True,
                text=True,
                encoding="mbcs",
                errors="replace",
                timeout=3,
            )
            ipconfig_text = proc.stdout + "\n" + proc.stderr
            for match in re.findall(r"\b(?:26|10|192\.168|172\.(?:1[6-9]|2\d|3[0-1]))\.\d{1,3}\.\d{1,3}\.\d{1,3}\b", ipconfig_text):
                add_access_ip(candidates, match)
            for match in re.findall(r"(?:IPv4[^:]*|IPv4-адрес[^:]*|IPv4 Address[^:]*)[:.\s]+([0-9]{1,3}(?:\.[0-9]{1,3}){3})", ipconfig_text, flags=re.I):
                add_access_ip(candidates, match)
        except Exception:
            pass

    def score_ip(item: str) -> Tuple[int, int, str]:
        last = item.rsplit(".", 1)[-1]
        gateway_like = 1 if last in {"1", "254"} else 0
        network_rank = 0 if is_radmin_ip(item) else 1 if item.startswith("192.168.") else 2 if item.startswith("10.") else 3
        return (network_rank, gateway_like, item)
    candidates.sort(key=score_ip)
    return candidates


def network_access_info() -> Dict[str, Any]:
    ips = detect_access_ips()
    urls = []
    for ip in ips:
        kind = "radmin" if is_radmin_ip(ip) else "lan"
        label = "Radmin VPN" if kind == "radmin" else "LAN / Wi-Fi"
        urls.append({
            "ip": ip,
            "kind": kind,
            "label": label,
            "url": f"{APP_SCHEME}://{ip}:{APP_PORT}/",
        })
    return {
        "local_url": f"{APP_SCHEME}://127.0.0.1:{APP_PORT}/",
        "port": APP_PORT,
        "bind_all": APP_HOST == "0.0.0.0",
        "radmin_urls": [item for item in urls if item["kind"] == "radmin"],
        "lan_urls": [item for item in urls if item["kind"] != "radmin"],
        "urls": urls,
        "scheme": APP_SCHEME,
        "https_enabled": APP_SCHEME == "https",
        "hint": "Для звонков через Radmin VPN используйте HTTPS-адрес вида https://26.x.x.x:порт/ и примите предупреждение браузера о локальном сертификате.",
    }


async def broadcast_presence(user_id: int) -> None:
    payload = {"type": "presence:update", "user_id": user_id, "online": manager.is_online(user_id)}
    await manager.send_to_users(manager.online_user_ids(), payload)


def can_signal_call(sender_id: int, target_user_id: int, conversation_id: int) -> bool:
    if target_user_id <= 0 or conversation_id <= 0 or target_user_id == sender_id:
        return False
    row = get_conversation_row(conversation_id)
    if not row or derive_kind(row) != "direct":
        return False
    return user_is_member(sender_id, conversation_id) and user_is_member(target_user_id, conversation_id)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/api/server-info")
def server_info() -> Dict[str, Any]:
    return {
        "host": APP_HOST,
        "port": APP_PORT,
        "bind_all": APP_HOST == "0.0.0.0",
        "version": APP_VERSION,
        "build": APP_BUILD,
        "demo_mode": ENABLE_DEMO_MODE,
        "session_ttl_hours": SESSION_TTL_HOURS,
        "network": network_access_info(),
    }


@app.get("/api/network-info")
def api_network_info() -> Dict[str, Any]:
    return network_access_info()




@app.get("/api/admin/console")
def admin_console(user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    if not is_admin_user(user):
        raise HTTPException(status_code=403, detail="Консоль доступна только support@yupi.local")
    cleanup_expired_sessions()

    connections = manager.online_connections()
    by_user: Dict[int, List[Dict[str, Any]]] = {}
    for item in connections:
        uid = int(item.get("user_id") or 0)
        by_user.setdefault(uid, []).append({
            "ip_address": item.get("ip_address", "unknown"),
            "user_agent": item.get("user_agent", ""),
            "connected_at": item.get("connected_at", ""),
            "client_kind": client_kind_from_ip(str(item.get("ip_address", ""))),
        })

    online_ids = sorted(by_user.keys())
    online_users: List[Dict[str, Any]] = []
    if online_ids:
        placeholders = ",".join("?" for _ in online_ids)
        rows = query_all(
            f"SELECT id, display_name, email, avatar_color, avatar_filename, created_at FROM users WHERE id IN ({placeholders})",
            tuple(online_ids),
        )
        for row in rows:
            item = serialize_user(row, include_private=True)
            item["connections"] = by_user.get(int(row["id"]), [])
            item["ip_addresses"] = sorted({str(conn.get("ip_address", "")) for conn in item["connections"] if conn.get("ip_address")})
            online_users.append(item)
        online_users.sort(key=lambda item: item["display_name"].lower())

    last_access_rows = query_all(
        """
        SELECT l.*, u.display_name, u.email
        FROM user_access_log l
        LEFT JOIN users u ON u.id = l.user_id
        ORDER BY l.id DESC
        LIMIT 40
        """
    )
    access_log = [{
        "id": int(row["id"]),
        "user_id": int(row["user_id"]) if row["user_id"] else None,
        "display_name": row["display_name"] or "",
        "email": row["email"] or "",
        "event_type": row["event_type"],
        "ip_address": row["ip_address"] or "",
        "client_kind": client_kind_from_ip(row["ip_address"] or ""),
        "user_agent": row["user_agent"] or "",
        "created_at": row["created_at"],
    } for row in last_access_rows]

    total_users = query_one("SELECT COUNT(*) AS count FROM users")
    active_sessions = query_one("SELECT COUNT(*) AS count FROM sessions WHERE expires_at IS NULL OR expires_at > ?", (utc_now(),))
    conversations = query_one("SELECT COUNT(*) AS count FROM conversations")
    messages = query_one("SELECT COUNT(*) AS count FROM messages")

    return {
        "ok": True,
        "online_count": len(set(online_ids)),
        "online_users": online_users,
        "connections": connections,
        "access_log": access_log,
        "total_users": int(total_users["count"]) if total_users else 0,
        "active_sessions": int(active_sessions["count"]) if active_sessions else 0,
        "conversations": int(conversations["count"]) if conversations else 0,
        "messages": int(messages["count"]) if messages else 0,
        "network": network_access_info(),
        "generated_at": utc_now(),
    }


@app.get("/")
def root() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html", headers={"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "Pragma": "no-cache", "Expires": "0"})


@app.post("/api/auth/register")
def register(payload: RegisterRequest, request: Request) -> Dict[str, Any]:
    display_name = str(payload.display_name).strip()
    if len(display_name) < 2:
        raise HTTPException(status_code=400, detail="Введите имя")
    email = validate_email(str(payload.email))
    phone = validate_phone(str(payload.phone))
    password = validate_password(str(payload.password))

    if query_one("SELECT id FROM users WHERE email = ?", (email,)):
        raise HTTPException(status_code=400, detail="Email уже зарегистрирован")
    if query_one("SELECT id FROM users WHERE phone = ?", (phone,)):
        raise HTTPException(status_code=400, detail="Телефон уже зарегистрирован")

    color_pool = ["#8f6bff", "#ff8ba7", "#7f86ff", "#f4a261", "#aa77ff", "#74c0fc"]
    user_id = execute(
        """
        INSERT INTO users (display_name, email, phone, password_hash, bio, first_name, last_name, youtube_url, avatar_filename, avatar_color, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            display_name,
            email,
            phone,
            hash_password(password),
            "Новый участник Yupi",
            display_name,
            "",
            "",
            "",
            color_pool[secrets.randbelow(len(color_pool))],
            utc_now(),
        ),
    )

    support = query_one("SELECT id FROM users WHERE email = 'support@yupi.local'")
    if support:
        conversation_id = find_or_create_direct_conversation(user_id, int(support["id"]))
        execute(
            "INSERT INTO messages (conversation_id, sender_id, body, message_type, created_at) VALUES (?, ?, ?, 'text', ?)",
            (conversation_id, int(support["id"]), "Добро пожаловать в Yupi. Можете сразу писать и звонить.", utc_now()),
        )

    token = create_session(user_id)
    record_access_event(user_id, "register", request_client_ip(request), request.headers.get("user-agent", ""))
    user = query_one("SELECT * FROM users WHERE id = ?", (user_id,))
    return {"token": token, "user": serialize_user(user, include_private=True)}


@app.post("/api/auth/login")
def login(payload: LoginRequest, request: Request) -> Dict[str, Any]:
    login_value = str(payload.login).strip().lower()
    password = str(payload.password)
    if not login_value or not password:
        raise HTTPException(status_code=400, detail="Введите логин и пароль")
    ensure_login_allowed(login_value, request)
    normalized_phone = normalize_phone(login_value)
    user = query_one(
        "SELECT * FROM users WHERE lower(email) = ? OR phone = ? LIMIT 1",
        (login_value, normalized_phone),
    )
    if not user or not verify_password(password, user["password_hash"]):
        mark_login_failed(login_value, request)
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")
    clear_login_failures(login_value, request)
    token = create_session(int(user["id"]))
    record_access_event(int(user["id"]), "login", request_client_ip(request), request.headers.get("user-agent", ""))
    return {"token": token, "user": serialize_user(user, include_private=True)}


@app.post("/api/auth/logout")
def logout(user: sqlite3.Row = Depends(get_current_user), authorization: Optional[str] = Header(default=None)) -> Dict[str, bool]:
    token = authorization.split(" ", 1)[1].strip()
    execute("DELETE FROM sessions WHERE token = ? OR token_hash = ?", (token, hash_token(token)))
    return {"ok": True}


@app.get("/api/me")
def me(user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    return serialize_user(user, include_private=True)


@app.put("/api/me")
def update_me(payload: UpdateProfileRequest, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    first_name = str(payload.first_name or (user["first_name"] if "first_name" in user.keys() else ""))[:32].strip()
    last_name = str(payload.last_name or (user["last_name"] if "last_name" in user.keys() else ""))[:32].strip()
    display_name = str(payload.display_name or user["display_name"])[:70].strip()
    if not display_name:
        display_name = " ".join(part for part in [first_name, last_name] if part).strip() or user["display_name"]
    bio = str(payload.bio or (user["bio"] or ""))[:240].strip()
    youtube_url = str(payload.youtube_url or (user["youtube_url"] if "youtube_url" in user.keys() else ""))[:180].strip()

    execute(
        "UPDATE users SET display_name = ?, first_name = ?, last_name = ?, bio = ?, youtube_url = ? WHERE id = ?",
        (display_name, first_name, last_name, bio, youtube_url, int(user["id"])),
    )
    fresh = query_one("SELECT * FROM users WHERE id = ?", (int(user["id"]),))
    return serialize_user(fresh, include_private=True)


@app.post("/api/me/avatar")
def update_me_avatar(payload: DataUrlUploadRequest, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    ensure_custom_media_dirs()
    filename = str(payload.filename).strip()
    data_url = str(payload.data_url).strip()
    raw, detected_suffix = decode_data_url(data_url)
    suffix = detected_suffix or Path(filename).suffix.lower()
    if suffix not in AVATAR_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Аватар должен быть PNG или JPEG")
    validate_media_bytes(raw, suffix)
    if len(raw) > 8 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Аватар слишком большой, максимум 8 МБ")
    for old in CUSTOM_AVATAR_DIR.glob(f"user_{int(user['id'])}.*"):
        if old.suffix.lower() in AVATAR_EXTENSIONS:
            old.unlink(missing_ok=True)
    target = CUSTOM_AVATAR_DIR / f"user_{int(user['id'])}{suffix}"
    target.write_bytes(raw)
    execute("UPDATE users SET avatar_filename = ? WHERE id = ?", (target.name, int(user["id"])))
    fresh = query_one("SELECT * FROM users WHERE id = ?", (int(user["id"]),))
    return serialize_user(fresh, include_private=True)


@app.post("/api/me/upk-link")
def update_me_upk_link(payload: UpkLinkRequest, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    conversation_id = int(payload.conversation_id or 0)
    if conversation_id:
        row = get_conversation_row(conversation_id)
        if not row or derive_kind(row) != "yupikey":
            raise HTTPException(status_code=404, detail="UPK-канал не найден")
        owner_id = conversation_owner_id(row, conversation_id)
        if owner_id != int(user["id"]):
            raise HTTPException(status_code=403, detail="Привязать можно только свой UPK-канал")
    execute("UPDATE users SET profile_upk_conversation_id = ? WHERE id = ?", (conversation_id, int(user["id"])))
    fresh = query_one("SELECT * FROM users WHERE id = ?", (int(user["id"]),))
    return serialize_user(fresh, include_private=True)


@app.get("/api/users/search")
def search_users(q: str = "", user: sqlite3.Row = Depends(get_current_user)) -> List[Dict[str, Any]]:
    q = q.strip().lower()
    if not q:
        rows = query_all(
            "SELECT * FROM users WHERE id != ? ORDER BY display_name ASC LIMIT 20",
            (int(user["id"]),),
        )
    else:
        like = f"%{q}%"
        rows = query_all(
            """
            SELECT * FROM users
            WHERE id != ?
              AND (
                  lower(display_name) LIKE ? OR
                  lower(email) LIKE ? OR
                  phone LIKE ?
              )
            ORDER BY display_name ASC
            LIMIT 20
            """,
            (int(user["id"]), like, like, like),
        )
    return [serialize_user(row, include_private=False) for row in rows]


@app.get("/api/conversations")
def list_conversations(user: sqlite3.Row = Depends(get_current_user)) -> List[Dict[str, Any]]:
    rows = query_all(
        """
        SELECT c.*
        FROM conversations c
        JOIN conversation_members cm ON cm.conversation_id = c.id
        WHERE cm.user_id = ?
        ORDER BY c.id DESC
        """,
        (int(user["id"]),),
    )
    conversations = [serialize_conversation(row, int(user["id"])) for row in rows]
    conversations = [item for item in conversations if not item["prefs"]["is_deleted"]]
    conversations.sort(
        key=lambda item: item["last_message"]["created_at"] if item["last_message"] else item["created_at"],
        reverse=True,
    )
    return conversations


@app.post("/api/conversations/direct")
async def create_direct_conversation(payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    target_user_id = parse_int(payload.get("user_id", 0), "user_id")
    if target_user_id == int(user["id"]):
        raise HTTPException(status_code=400, detail="Нельзя создать чат с самим собой")
    target = query_one("SELECT * FROM users WHERE id = ?", (target_user_id,))
    if not target:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    conversation_id = find_or_create_direct_conversation(int(user["id"]), target_user_id)
    row = query_one("SELECT * FROM conversations WHERE id = ?", (conversation_id,))
    data = serialize_conversation(row, int(user["id"]))
    members = conversation_member_ids(conversation_id)
    await manager.send_to_users(members, {"type": "conversation:refresh", "conversation_id": conversation_id})
    return data


@app.post("/api/conversations/group")
async def create_group(payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    member_ids = payload.get("member_ids", [])
    if not isinstance(member_ids, list):
        raise HTTPException(status_code=400, detail="Некорректный список участников")
    title = str(payload.get("title", "")).strip()
    mode = str(payload.get("mode", "group")).strip().lower()
    kind = "yupikey" if mode == "yupikey" else "group"
    if kind == "yupikey" and not title.lower().startswith(("yupi key", "yupikey")):
        title = f"Yupi Key - {title}"
    try:
        clean_member_ids = [int(x) for x in member_ids]
    except (TypeError, ValueError):
        raise HTTPException(status_code=400, detail="Некорректный список участников")
    conversation_id = create_group_conversation(int(user["id"]), title, clean_member_ids, kind=kind)
    row = query_one("SELECT * FROM conversations WHERE id = ?", (conversation_id,))
    data = serialize_conversation(row, int(user["id"]))
    members = conversation_member_ids(conversation_id)
    await manager.send_to_users(members, {"type": "conversation:refresh", "conversation_id": conversation_id})
    return data


@app.get("/api/conversations/{conversation_id}/members")
def list_conversation_members(conversation_id: int, user: sqlite3.Row = Depends(get_current_user)) -> List[Dict[str, Any]]:
    if not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=403, detail="Нет доступа к каналу")
    rows = query_all(
        """
        SELECT u.*
        FROM conversation_members cm
        JOIN users u ON u.id = cm.user_id
        WHERE cm.conversation_id = ?
        ORDER BY cm.joined_at ASC, u.display_name ASC
        """,
        (conversation_id,),
    )
    return [serialize_user(row) for row in rows]


@app.patch("/api/conversations/{conversation_id}")
async def update_conversation(conversation_id: int, payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    row = get_conversation_row(conversation_id)
    if not row or not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=404, detail="Канал не найден")
    kind = derive_kind(row)
    if kind == "direct":
        raise HTTPException(status_code=400, detail="Личный чат нельзя редактировать как канал")
    if conversation_owner_id(row, conversation_id) != int(user["id"]):
        raise HTTPException(status_code=403, detail="Изменять канал может только администратор")
    title = str(payload.get("title", row["title"] or "")).strip()[:64]
    if not title:
        raise HTTPException(status_code=400, detail="Введите название канала")
    stored_title = title
    if kind == "yupikey" and not title.lower().startswith(("yupi key", "yupikey")):
        stored_title = f"Yupi Key - {title}"
    execute("UPDATE conversations SET title = ? WHERE id = ?", (stored_title, conversation_id))
    fresh = query_one("SELECT * FROM conversations WHERE id = ?", (conversation_id,))
    data = serialize_conversation(fresh, int(user["id"]))
    await manager.send_to_users(conversation_member_ids(conversation_id), {"type": "conversation:refresh", "conversation_id": conversation_id})
    return {"ok": True, "conversation": data}


@app.post("/api/conversations/{conversation_id}/avatar")
async def update_conversation_avatar(conversation_id: int, payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    ensure_custom_media_dirs()
    row = get_conversation_row(conversation_id)
    if not row or not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=404, detail="Канал не найден")
    if derive_kind(row) == "direct":
        raise HTTPException(status_code=400, detail="Личный чат использует аватар собеседника")
    if conversation_owner_id(row, conversation_id) != int(user["id"]):
        raise HTTPException(status_code=403, detail="Изменять канал может только администратор")
    filename = str(payload.get("filename", "")).strip()
    data_url = str(payload.get("data_url", "")).strip()
    raw, detected_suffix = decode_data_url(data_url)
    suffix = detected_suffix or Path(filename).suffix.lower()
    if suffix not in AVATAR_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Аватар канала должен быть PNG или JPEG")
    validate_media_bytes(raw, suffix)
    if len(raw) > 8 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Аватар слишком большой, максимум 8 МБ")
    for old in CUSTOM_AVATAR_DIR.glob(f"conversation_{conversation_id}.*"):
        if old.suffix.lower() in AVATAR_EXTENSIONS:
            old.unlink(missing_ok=True)
    target = CUSTOM_AVATAR_DIR / f"conversation_{conversation_id}{suffix}"
    target.write_bytes(raw)
    execute("UPDATE conversations SET avatar_filename = ? WHERE id = ?", (target.name, conversation_id))
    fresh = query_one("SELECT * FROM conversations WHERE id = ?", (conversation_id,))
    data = serialize_conversation(fresh, int(user["id"]))
    await manager.send_to_users(conversation_member_ids(conversation_id), {"type": "conversation:refresh", "conversation_id": conversation_id})
    return {"ok": True, "conversation": data}


@app.patch("/api/conversations/{conversation_id}/prefs")
async def patch_conversation_prefs(conversation_id: int, payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    if not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=403, detail="Нет доступа к чату")
    prefs = upsert_conversation_prefs(
        int(user["id"]),
        conversation_id,
        is_archived=payload.get("is_archived"),
        is_muted=payload.get("is_muted"),
        is_favorite=payload.get("is_favorite"),
        is_deleted=payload.get("is_deleted"),
    )
    row = query_one("SELECT * FROM conversations WHERE id = ?", (conversation_id,))
    return {"ok": True, "prefs": prefs, "conversation": serialize_conversation(row, int(user["id"]))}


@app.delete("/api/conversations/{conversation_id}")
async def delete_conversation_for_me(conversation_id: int, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, bool]:
    if not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=403, detail="Нет доступа к чату")
    upsert_conversation_prefs(int(user["id"]), conversation_id, is_deleted=True)
    return {"ok": True}


@app.get("/api/conversations/{conversation_id}/messages")
def list_messages(
    conversation_id: int,
    limit: int = Query(default=100, ge=1, le=500),
    before_id: Optional[int] = Query(default=None, ge=1),
    user: sqlite3.Row = Depends(get_current_user),
) -> List[Dict[str, Any]]:
    if not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=403, detail="Нет доступа к чату")
    actual_limit = max(1, min(int(limit or 100), MAX_MESSAGES_PAGE_SIZE))
    if before_id:
        rows = query_all(
            """
            SELECT * FROM (
                SELECT m.*, u.display_name, u.avatar_color, u.avatar_filename
                FROM messages m
                JOIN users u ON u.id = m.sender_id
                WHERE m.conversation_id = ? AND m.id < ?
                ORDER BY m.id DESC
                LIMIT ?
            ) AS page
            ORDER BY id ASC
            """,
            (conversation_id, before_id, actual_limit),
        )
    else:
        rows = query_all(
            """
            SELECT * FROM (
                SELECT m.*, u.display_name, u.avatar_color, u.avatar_filename
                FROM messages m
                JOIN users u ON u.id = m.sender_id
                WHERE m.conversation_id = ?
                ORDER BY m.id DESC
                LIMIT ?
            ) AS page
            ORDER BY id ASC
            """,
            (conversation_id, actual_limit),
        )
    return [serialize_message(row) for row in rows]


@app.post("/api/conversations/{conversation_id}/messages")
async def create_message(conversation_id: int, payload: SendMessageRequest, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    if not user_is_member(int(user["id"]), conversation_id):
        raise HTTPException(status_code=403, detail="Нет доступа к чату")
    conversation_row = get_conversation_row(conversation_id)
    if conversation_row and derive_kind(conversation_row) == "yupikey" and conversation_owner_id(conversation_row, conversation_id) != int(user["id"]):
        raise HTTPException(status_code=403, detail="Писать в Yupi Key может только создатель. Используйте комментарии к посту.")
    body = str(payload.body).strip()
    if not body:
        raise HTTPException(status_code=400, detail="Пустое сообщение")
    message_id = execute(
        "INSERT INTO messages (conversation_id, sender_id, body, message_type, created_at) VALUES (?, ?, ?, 'text', ?)",
        (conversation_id, int(user["id"]), body[:2000], utc_now()),
    )
    clear_deleted_for_conversation(conversation_id)
    row = query_one(
        """
        SELECT m.*, u.display_name, u.avatar_color, u.avatar_filename
        FROM messages m
        JOIN users u ON u.id = m.sender_id
        WHERE m.id = ?
        LIMIT 1
        """,
        (message_id,),
    )
    message = serialize_message(row)
    members = conversation_member_ids(conversation_id)
    await manager.send_to_users(members, {"type": "message:new", "conversation_id": conversation_id, "message": message})
    return message


@app.get("/api/yupikeys/{conversation_id}/posts")
def list_yupikey_posts(conversation_id: int, user: sqlite3.Row = Depends(get_current_user)) -> List[Dict[str, Any]]:
    require_yupikey(conversation_id, int(user["id"]))
    rows = query_all(
        """
        SELECT p.*, u.display_name, u.avatar_color
        FROM yupikey_posts p
        JOIN users u ON u.id = p.author_id
        WHERE p.conversation_id = ?
        ORDER BY p.id DESC
        LIMIT 100
        """,
        (conversation_id,),
    )
    return [serialize_yupikey_post(row, int(user["id"])) for row in rows]


@app.post("/api/yupikeys/{conversation_id}/posts")
async def create_yupikey_post(conversation_id: int, payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    ensure_yupikey_owner(conversation_id, int(user["id"]))
    body = str(payload.get("body", "")).strip()
    if not body:
        raise HTTPException(status_code=400, detail="Пустой пост")
    post_id = execute(
        "INSERT INTO yupikey_posts (conversation_id, author_id, body, created_at) VALUES (?, ?, ?, ?)",
        (conversation_id, int(user["id"]), body[:4000], utc_now()),
    )
    row = query_one(
        """
        SELECT p.*, u.display_name, u.avatar_color
        FROM yupikey_posts p
        JOIN users u ON u.id = p.author_id
        WHERE p.id = ?
        """,
        (post_id,),
    )
    post = serialize_yupikey_post(row, int(user["id"]))
    await manager.send_to_users(conversation_member_ids(conversation_id), {"type": "yupikey:post", "conversation_id": conversation_id, "post": post})
    return post


@app.post("/api/yupikeys/{conversation_id}/posts/{post_id}/reaction")
async def toggle_yupikey_reaction(conversation_id: int, post_id: int, payload: Dict[str, Any], user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    require_yupikey(conversation_id, int(user["id"]))
    post = query_one("SELECT * FROM yupikey_posts WHERE id = ? AND conversation_id = ?", (post_id, conversation_id))
    if not post:
        raise HTTPException(status_code=404, detail="Пост не найден")
    reaction = str(payload.get("reaction", "👍")).strip()[:8] or "👍"
    old = query_one("SELECT reaction FROM post_reactions WHERE post_id = ? AND user_id = ?", (post_id, int(user["id"])))
    if old and old["reaction"] == reaction:
        execute("DELETE FROM post_reactions WHERE post_id = ? AND user_id = ?", (post_id, int(user["id"])))
    else:
        execute(
            """
            INSERT INTO post_reactions (post_id, user_id, reaction, created_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(post_id, user_id) DO UPDATE SET reaction = excluded.reaction, created_at = excluded.created_at
            """,
            (post_id, int(user["id"]), reaction, utc_now()),
        )
    row = query_one(
        """
        SELECT p.*, u.display_name, u.avatar_color
        FROM yupikey_posts p
        JOIN users u ON u.id = p.author_id
        WHERE p.id = ?
        """,
        (post_id,),
    )
    result = serialize_yupikey_post(row, int(user["id"]))
    await manager.send_to_users(conversation_member_ids(conversation_id), {"type": "yupikey:reaction", "conversation_id": conversation_id, "post": result})
    return result


@app.post("/api/yupikeys/{conversation_id}/posts/{post_id}/comments")
async def open_yupikey_comments(conversation_id: int, post_id: int, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    channel = require_yupikey(conversation_id, int(user["id"]))
    post = query_one("SELECT * FROM yupikey_posts WHERE id = ? AND conversation_id = ?", (post_id, conversation_id))
    if not post:
        raise HTTPException(status_code=404, detail="Пост не найден")
    comment_conversation_id = int(post["comment_conversation_id"]) if post["comment_conversation_id"] else 0
    if not comment_conversation_id:
        owner_id = conversation_owner_id(channel, conversation_id) or int(user["id"])
        title = f"Комментарии — {str(channel['title'] or 'Yupi Key').replace('Yupi Key - ', '')[:40]}"
        comment_conversation_id = create_group_conversation(owner_id, title, conversation_member_ids(conversation_id), kind="comments")
        execute("UPDATE yupikey_posts SET comment_conversation_id = ? WHERE id = ?", (comment_conversation_id, post_id))
        execute(
            "INSERT INTO messages (conversation_id, sender_id, body, message_type, created_at) VALUES (?, ?, ?, 'system', ?)",
            (comment_conversation_id, owner_id, "Чат комментариев к посту Yupi Key.", utc_now()),
        )
    # подписываем текущего пользователя на комментарии, если его добавили в канал позже
    if not user_is_member(int(user["id"]), comment_conversation_id):
        execute("INSERT OR IGNORE INTO conversation_members (conversation_id, user_id, joined_at) VALUES (?, ?, ?)", (comment_conversation_id, int(user["id"]), utc_now()))
    row = query_one("SELECT * FROM conversations WHERE id = ?", (comment_conversation_id,))
    data = serialize_conversation(row, int(user["id"]))
    await manager.send_to_users(conversation_member_ids(comment_conversation_id), {"type": "conversation:refresh", "conversation_id": comment_conversation_id})
    return data


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    token = websocket.query_params.get("token")
    try:
        user = current_user_from_token(token)
    except HTTPException:
        await websocket.close(code=4401)
        return

    user_id = int(user["id"])
    client_ip = websocket_client_ip(websocket)
    user_agent = websocket.headers.get("user-agent", "")
    connected_at = utc_now()
    await manager.connect(user_id, websocket, {"ip_address": client_ip, "user_agent": user_agent, "connected_at": connected_at})
    record_access_event(user_id, "ws_connect", client_ip, user_agent)
    await manager.send_to_user(user_id, {"type": "socket:ready", "user_id": user_id})
    await broadcast_presence(user_id)

    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")
            if msg_type == "typing":
                conversation_id = safe_int(data.get("conversation_id", 0))
                if conversation_id and user_is_member(user_id, conversation_id):
                    members = [uid for uid in conversation_member_ids(conversation_id) if uid != user_id]
                    await manager.send_to_users(
                        members,
                        {"type": "typing", "conversation_id": conversation_id, "user": serialize_user(user)},
                    )
                continue

            if isinstance(msg_type, str) and msg_type.startswith("call:"):
                target_user_id = safe_int(data.get("target_user_id", 0))
                conversation_id = safe_int(data.get("conversation_id", 0))
                if not can_signal_call(user_id, target_user_id, conversation_id):
                    continue
                payload = {
                    "type": msg_type,
                    "from_user": serialize_user(user),
                    "conversation_id": conversation_id,
                    "call_id": str(data.get("call_id", ""))[:80],
                    "video": bool(data.get("video", False)),
                    "encrypted": True,
                    "payload": data.get("payload"),
                }
                await manager.send_to_user(target_user_id, payload)
                continue

            if msg_type == "presence:ping":
                await manager.send_to_user(user_id, {"type": "presence:pong"})
    except WebSocketDisconnect:
        meta = manager.disconnect(user_id, websocket)
        if meta:
            record_access_event(user_id, "ws_disconnect", str(meta.get("ip_address", "unknown")), str(meta.get("user_agent", "")))
    except Exception:
        meta = manager.disconnect(user_id, websocket)
        if meta:
            record_access_event(user_id, "ws_disconnect", str(meta.get("ip_address", "unknown")), str(meta.get("user_agent", "")))
        try:
            await websocket.close()
        except Exception:
            pass
    finally:
        await broadcast_presence(user_id)



MEDIA_SLOT_LABELS = {
    1: "Логотип входа и регистрации",
    2: "Кнопка New Chat",
    3: "Кнопка Archive",
    4: "Кнопка UPK",
    5: "Кнопка Settings / шестерёнка",
    6: "Профиль / аватар-заглушка",
    7: "Поиск",
    8: "Yupi / story-кружок",
    9: "Чат / сообщения",
    10: "Избранное / закладка",
    11: "Музыкальная панель",
    12: "VK Музыка",
    13: "Яндекс Музыка",
    14: "Spotify",
    15: "Без звука / mute",
    16: "Play",
    17: "Pause",
    18: "Next",
    19: "Previous",
    20: "Назад / закрыть",
    21: "Отправить сообщение",
    22: "Вложение / скрепка",
}

ICON_EXTENSIONS = {".png", ".jpg", ".jpeg"}
BACKGROUND_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm"}
AVATAR_EXTENSIONS = {".png", ".jpg", ".jpeg"}


def ensure_custom_media_dirs() -> None:
    CUSTOM_ICON_DIR.mkdir(parents=True, exist_ok=True)
    CUSTOM_BACKGROUND_DIR.mkdir(parents=True, exist_ok=True)
    CUSTOM_AVATAR_DIR.mkdir(parents=True, exist_ok=True)


def media_kind_from_suffix(suffix: str) -> str:
    suffix = suffix.lower()
    if suffix in {".mp4", ".webm"}:
        return "video"
    return "image"


def media_mime_from_suffix(suffix: str) -> str:
    suffix = suffix.lower()
    return {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
    }.get(suffix, "application/octet-stream")


def safe_filename(value: str) -> str:
    name = Path(value or "media").name.strip()
    stem = re.sub(r"[^A-Za-zА-Яа-я0-9_.-]+", "_", Path(name).stem).strip("._-") or "media"
    return stem[:54]


def build_media_url(kind: str, filename: str) -> str:
    return custom_media_url(kind, filename)


def file_info(path: Path, kind: str) -> Dict[str, Any]:
    stat = path.stat()
    suffix = path.suffix.lower()
    return {
        "name": path.name,
        "url": build_media_url(kind, path.name),
        "type": media_kind_from_suffix(suffix),
        "mime": media_mime_from_suffix(suffix),
        "size": stat.st_size,
        "mtime": stat.st_mtime,
    }


def find_icon_slot(slot: int) -> Optional[Dict[str, Any]]:
    for path in sorted(CUSTOM_ICON_DIR.iterdir()):
        if not path.is_file():
            continue
        if path.suffix.lower() not in ICON_EXTENSIONS:
            continue
        if path.stem == str(slot):
            return file_info(path, "icons")
    return None


def list_background_files() -> List[Dict[str, Any]]:
    result: List[Dict[str, Any]] = []
    for path in sorted(CUSTOM_BACKGROUND_DIR.iterdir(), key=lambda item: item.stat().st_mtime if item.exists() else 0, reverse=True):
        if path.is_file() and path.suffix.lower() in BACKGROUND_EXTENSIONS:
            result.append(file_info(path, "backgrounds"))
    return result


def decode_data_url(data_url: str) -> Tuple[bytes, str]:
    if "," not in data_url:
        raise HTTPException(status_code=400, detail="Некорректный файл")
    header, encoded = data_url.split(",", 1)
    suffix = ""
    mime_match = re.search(r"data:([^;]+);base64", header)
    if mime_match:
        mime = mime_match.group(1).lower()
        suffix = {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg",
            "image/gif": ".gif",
            "image/webp": ".webp",
            "video/mp4": ".mp4",
            "video/webm": ".webm",
        }.get(mime, "")
    try:
        raw = base64.b64decode(encoded.encode("ascii"), validate=True)
    except Exception:
        raise HTTPException(status_code=400, detail="Не удалось прочитать файл")
    return raw, suffix


def validate_media_bytes(raw: bytes, suffix: str) -> None:
    suffix = suffix.lower()
    checks = {
        ".png": lambda data: data.startswith(b"\x89PNG\r\n\x1a\n"),
        ".jpg": lambda data: data.startswith(b"\xff\xd8\xff"),
        ".jpeg": lambda data: data.startswith(b"\xff\xd8\xff"),
        ".gif": lambda data: data.startswith((b"GIF87a", b"GIF89a")),
        ".webp": lambda data: len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP",
        ".mp4": lambda data: len(data) >= 12 and data[4:8] == b"ftyp",
        ".webm": lambda data: data.startswith(b"\x1a\x45\xdf\xa3"),
    }
    checker = checks.get(suffix)
    if checker and not checker(raw):
        raise HTTPException(status_code=400, detail="Формат файла не совпадает с расширением")


@app.get("/api/local-media/manifest")
def local_media_manifest() -> Dict[str, Any]:
    ensure_custom_media_dirs()
    slots = []
    for slot_id, label in MEDIA_SLOT_LABELS.items():
        slots.append({
            "id": slot_id,
            "label": label,
            "file": find_icon_slot(slot_id),
        })
    return {
        "ok": True,
        "icon_extensions": sorted(ICON_EXTENSIONS),
        "background_extensions": sorted(BACKGROUND_EXTENSIONS),
        "slots": slots,
        "backgrounds": list_background_files(),
    }


@app.post("/api/local-media/upload")
def local_media_upload(payload: LocalMediaUploadRequest, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    ensure_custom_media_dirs()
    kind = str(payload.kind).strip().lower()
    filename = str(payload.filename).strip()
    data_url = str(payload.data_url).strip()
    raw, detected_suffix = decode_data_url(data_url)
    original_suffix = Path(filename).suffix.lower()
    suffix = detected_suffix or original_suffix

    if kind == "icon":
        if not is_admin_user(user):
            raise HTTPException(status_code=403, detail="Иконки может загружать только администратор")
        slot = parse_int(payload.slot, "slot")
        if slot not in MEDIA_SLOT_LABELS:
            raise HTTPException(status_code=400, detail="Неизвестный номер иконки")
        if suffix not in ICON_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Для иконок используйте PNG или JPEG")
        validate_media_bytes(raw, suffix)
        if len(raw) > 8 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Иконка слишком большая, максимум 8 МБ")
        for old in CUSTOM_ICON_DIR.glob(f"{slot}.*"):
            if old.suffix.lower() in ICON_EXTENSIONS:
                old.unlink(missing_ok=True)
        target = CUSTOM_ICON_DIR / f"{slot}{suffix}"
        target.write_bytes(raw)
        return {"ok": True, "slot": slot, "file": file_info(target, "icons")}

    if kind == "background":
        if suffix not in BACKGROUND_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Фон должен быть PNG, JPEG, GIF, WEBP, MP4 или WEBM")
        validate_media_bytes(raw, suffix)
        if len(raw) > 80 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Фон слишком большой, максимум 80 МБ")
        stem = safe_filename(filename)
        target = CUSTOM_BACKGROUND_DIR / f"{stem}{suffix}"
        counter = 2
        while target.exists():
            target = CUSTOM_BACKGROUND_DIR / f"{stem}_{counter}{suffix}"
            counter += 1
        target.write_bytes(raw)
        return {"ok": True, "file": file_info(target, "backgrounds")}

    raise HTTPException(status_code=400, detail="Неизвестный тип медиа")


@app.post("/api/local-media/background/select")
def local_media_select_background(payload: BackgroundSelectRequest) -> Dict[str, Any]:
    ensure_custom_media_dirs()
    name = Path(str(payload.name)).name
    target = CUSTOM_BACKGROUND_DIR / name
    if not name or not target.exists() or target.suffix.lower() not in BACKGROUND_EXTENSIONS:
        raise HTTPException(status_code=404, detail="Фон не найден")
    return {"ok": True, "background": file_info(target, "backgrounds")}



MUSIC_SOURCES = {
    "vk": {
        "title": "VK Музыка",
        "url": "https://vk.com/audio",
        "region": "Официальная доступность зависит от аккаунта и региона.",
    },
    "yandex": {
        "title": "Яндекс Музыка",
        "url": "https://music.yandex.ru/home",
        "region": "Официальная доступность зависит от аккаунта и региона.",
    },
    "spotify": {
        "title": "Spotify",
        "url": "https://open.spotify.com/",
        "region": "Официальная доступность зависит от аккаунта и региона.",
    },
}


@app.get("/api/music/sources")
def api_music_sources() -> Dict[str, Dict[str, str]]:
    return MUSIC_SOURCES


@app.get("/api/music/probe/{source_key}")
def api_music_probe(source_key: str) -> Dict[str, Any]:
    source = MUSIC_SOURCES.get(source_key)
    if not source:
        raise HTTPException(status_code=404, detail="Музыкальный сервис не найден")

    url = source["url"]
    request = urllib.request.Request(
        url,
        method="GET",
        headers={
            "User-Agent": "Mozilla/5.0 YupiMessenger/2.2",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            status = int(getattr(response, "status", 200))
            response.read(256)
        return {
            "ok": 200 <= status < 500,
            "status": status,
            "title": source["title"],
            "url": url,
            "message": "Сервис отвечает с этой сети. Если нужен вход, он откроется в новой вкладке браузера.",
        }
    except urllib.error.HTTPError as exc:
        return {
            "ok": int(exc.code) < 500,
            "status": int(exc.code),
            "title": source["title"],
            "url": url,
            "message": "Сервис ответил HTTP {0}. Доступ может зависеть от аккаунта, региона или антибот-проверки.".format(exc.code),
        }
    except Exception as exc:
        return {
            "ok": False,
            "status": 0,
            "title": source["title"],
            "url": url,
            "message": "С этой сети сервис не открылся: {0}".format(exc.__class__.__name__),
        }

@app.post("/api/desktop/open-music/{source_key}")
def api_desktop_open_music(source_key: str, request: Request, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    source = MUSIC_SOURCES.get(source_key)
    if not source:
        raise HTTPException(status_code=404, detail="Музыкальный сервис не найден")
    ensure_local_desktop_action(request)
    try:
        webbrowser.open(source["url"])
        return {"ok": True, "mode": "desktop-browser", "title": source["title"], "url": source["url"]}
    except Exception as exc:
        return {"ok": False, "error": "Не удалось открыть сервис: {0}".format(exc.__class__.__name__)}


@app.post("/api/desktop/open-external")
def api_desktop_open_external(payload: ExternalOpenRequest, request: Request, user: sqlite3.Row = Depends(get_current_user)) -> Dict[str, Any]:
    ensure_local_desktop_action(request)
    url = str(payload.url).strip()
    if not url.startswith(("https://", "http://")):
        raise HTTPException(status_code=400, detail="Некорректная ссылка")
    try:
        webbrowser.open(url)
        return {"ok": True, "mode": "desktop-browser", "url": url}
    except Exception as exc:
        return {"ok": False, "error": "Не удалось открыть ссылку: {0}".format(exc.__class__.__name__)}


ensure_custom_media_dirs()
app.mount("/custom_media", StaticFiles(directory=CUSTOM_MEDIA_DIR), name="custom_media")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


if __name__ == "__main__":
    import uvicorn

    ssl_kwargs = {}
    if APP_SCHEME == "https" and SSL_CERTFILE and SSL_KEYFILE:
        ssl_kwargs = {"ssl_certfile": SSL_CERTFILE, "ssl_keyfile": SSL_KEYFILE}
    uvicorn.run("server:app", host=APP_HOST, port=APP_PORT, reload=False, **ssl_kwargs)
