# GrowCraft Local Server
# Simple and reliable local server using Python

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    GrowCraft Local Server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting local server..." -ForegroundColor Green
Write-Host ""
Write-Host "Your website will be available at:" -ForegroundColor White
Write-Host "    http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Start Python HTTP server
    py -m http.server 8000
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Python is installed and accessible via 'py' command" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Server stopped." -ForegroundColor Green
Read-Host "Press Enter to continue"

