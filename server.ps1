# Standard PowerShell HTTP Server for serving local files
# Serves index.html, styles.css, app.js on http://localhost:8080

$port = 8081
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server started. Listening on http://localhost:$port/"
Write-Host "Press Ctrl+C to stop."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }

        # Resolve local file path
        # Normalize slashes and remove leading slash from urlPath
        $subPath = $urlPath.TrimStart('/')
        $filePath = [System.IO.Path]::Combine((Get-Location).Path, $subPath)

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Detect MIME type
            if ($filePath.EndsWith(".html")) {
                $response.ContentType = "text/html; charset=utf-8"
            } elseif ($filePath.EndsWith(".css")) {
                $response.ContentType = "text/css; charset=utf-8"
            } elseif ($filePath.EndsWith(".js")) {
                $response.ContentType = "application/javascript; charset=utf-8"
            } elseif ($filePath.EndsWith(".svg")) {
                $response.ContentType = "image/svg+xml; charset=utf-8"
            } else {
                $response.ContentType = "application/octet-stream"
            }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
    Write-Host "Server stopped."
}
