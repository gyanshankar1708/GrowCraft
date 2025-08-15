@echo off
echo Starting GrowCraft Local Server (PowerShell Method)...
echo.
echo Server will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
powershell -Command "Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd \"%~dp0\"; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add(\"http://localhost:8080/\"); $listener.Start(); Write-Host \"Server running at http://localhost:8080/\"; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $localPath = $request.Url.LocalPath; if ($localPath -eq \"/\") { $localPath = \"/index.html\"; } $filePath = Join-Path (Get-Location) $localPath.TrimStart(\"/\"); if (Test-Path $filePath -PathType Leaf) { $content = Get-Content $filePath -Raw -Encoding UTF8; $buffer = [System.Text.Encoding]::UTF8.GetBytes($content); $response.ContentLength64 = $buffer.Length; $response.OutputStream.Write($buffer, 0, $buffer.Length); } else { $response.StatusCode = 404; $notFound = \"404 - File not found\"; $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound); $response.ContentLength64 = $buffer.Length; $response.OutputStream.Write($buffer, 0, $buffer.Length); } $response.Close(); }'"
pause

