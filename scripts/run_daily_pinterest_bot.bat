@echo off
title Nestora Pinterest Auto-Pin Bot
cd /d "%~dp0\.."
echo =========================================================
echo   NESTORA PINTEREST AUTO-PIN BOT
echo   Daily 5 Photos Pinning Engine
echo =========================================================
echo.
python scripts/pinterest_bot.py --run-once
echo.
echo =========================================================
echo   Done! Check dashboard at: http://localhost:3000/pinterest-bot
echo =========================================================
pause
