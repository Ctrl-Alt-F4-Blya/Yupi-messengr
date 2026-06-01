@echo off
setlocal ENABLEEXTENSIONS
cd /d "%~dp0"

chcp 65001 >nul
title Yupi Messenger Local Installer
color 0D

echo ==============================================
echo   YUPI MESSENGER - PERVAK EDITION
echo ==============================================
echo.

echo [1/4] Checking Python...
set "PY_LAUNCH="

for %%V in (3.12 3.11 3.10 3.9 3.13 3.14 3) do (
  if not defined PY_LAUNCH (
    py -%%V -c "import sys; raise SystemExit(0 if sys.version_info >= (3,8) else 1)" >nul 2>nul
    if not errorlevel 1 set "PY_LAUNCH=py -%%V"
  )
)

if not defined PY_LAUNCH (
  python -c "import sys; raise SystemExit(0 if sys.version_info >= (3,8) else 1)" >nul 2>nul
  if not errorlevel 1 set "PY_LAUNCH=python"
)

if not defined PY_LAUNCH (
  echo Python 3.8+ was not found.
  echo Install Python from python.org and run this file again.
  pause
  exit /b 1
)

echo Using: %PY_LAUNCH%
echo.

echo [2/4] Preparing pip and modules...
%PY_LAUNCH% scripts_dedline\bootstrap_and_run.py
if errorlevel 1 (
  echo.
  echo Install failed.
  echo Open logs folder and check server logs if needed.
  pause
  exit /b 1
)

echo.
echo [3/4] Allowing local network access on ports 8000-8019...
netsh advfirewall firewall add rule name="Yupi Messenger 8000-8019" dir=in action=allow protocol=TCP localport=8000-8019 profile=private >nul 2>nul

echo [4/4] Done.
echo Yupi is starting as a normal local website in your browser.
timeout /t 2 >nul
exit /b 0
