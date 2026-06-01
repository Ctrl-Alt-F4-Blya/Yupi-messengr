@echo off
setlocal ENABLEEXTENSIONS
cd /d "%~dp0"
chcp 65001 >nul
title Yupi Launcher
set "PY_LAUNCH="
for %%V in (3.13 3.12 3.11 3.10 3.9 3) do (
  if not defined PY_LAUNCH (
    py -%%V -c "import sys; raise SystemExit(0 if sys.version_info >= (3,9) else 1)" >nul 2>nul
    if not errorlevel 1 set "PY_LAUNCH=py -%%V"
  )
)
if not defined PY_LAUNCH set "PY_LAUNCH=python"
%PY_LAUNCH% launcher.pyw
