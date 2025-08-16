@echo off
cd /d "%~dp0"
echo ========================================
echo    GrowCraft Local Server
echo ========================================
echo.
echo Starting local server from: %cd%
echo.
echo Your website will be available at:
echo    http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.
echo Launching browser...
start "" http://localhost:8000/

py -m http.server 8000

echo.
echo Server stopped.
pause
