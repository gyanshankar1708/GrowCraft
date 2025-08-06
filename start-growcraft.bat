@echo off
title GrowCraft - PHP Server
echo.
echo ========================================
echo           GrowCraft Server
echo ========================================
echo.

:: Check if PHP is installed
php --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PHP is not installed or not in PATH
    echo.
    echo Please install PHP or XAMPP:
    echo 1. Download PHP from: https://www.php.net/downloads
    echo 2. Or install XAMPP from: https://www.apachefriends.org/
    echo.
    echo After installation, add PHP to your system PATH
    echo.
    pause
    exit /b 1
)

echo ✅ PHP found! Starting server...
echo.
echo 🌐 Server will be available at: http://localhost:8080
echo 📁 Serving files from: %CD%
echo.
echo Press Ctrl+C to stop the server
echo.

:: Start PHP server
php -S localhost:8080

echo.
echo Server stopped.
pause
