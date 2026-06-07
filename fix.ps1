$files = @(
    "C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\index.html",
    "C:\Users\rdpadmin\.gemini\antigravity\scratch\orcasagent-site\app.js"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Replace OrcasAgent without trademark
    $content = [regex]::Replace($content, 'OrcasAgent(?!(™|&trade;))', 'OrcasAgent&trade;')
    
    # Replace standalone Orcas with OrcasAgent&trade;
    $content = [regex]::Replace($content, '\bOrcas\b(?!\s*Agent&trade;|\s*Agent™)', 'OrcasAgent&trade;')
    
    if ($file -match "app.js") {
        $content = $content.Replace("const particleCount = 65;", "const particleCount = 20;")
        $content = $content.Replace("const podCount = 2;", "const podCount = 1;")
        $content = $content.Replace("pod.update(width, height, targetRgb, wakeParticles);", "pod.update(width, height, targetRgb, []);")
    }

    Set-Content -Path $file -Value $content -Encoding UTF8
}
Write-Output "Branding and performance fixes applied successfully."
