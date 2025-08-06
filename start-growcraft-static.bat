@echo off
title GrowCraft - Static Server
echo.
echo ========================================
echo        GrowCraft Static Server
echo ========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found! Starting HTTP server...
    echo.
    echo 🌐 Server will be available at: http://localhost:8000
    echo 📁 Serving files from: %CD%
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    
    :: Start Python HTTP server
    python -m http.server 8000
    goto :end
)

:: Fallback: Check for Python3
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python3 found! Starting HTTP server...
    echo.
    echo 🌐 Server will be available at: http://localhost:8000
    echo 📁 Serving files from: %CD%
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    
    :: Start Python3 HTTP server
    python3 -m http.server 8000
    goto :end
)

:: No Python found - open file directly
echo ⚠️  Python not found. Opening index.html directly...
echo.
echo Note: Some features may not work properly without a local server.
echo For better experience, install Python from: https://www.python.org/
echo.
start index.html

:end
echo.
echo Server stopped.
pause
