$logPath = "C:\Users\rdpadmin\.gemini\antigravity\brain\55a68191-d27e-43c6-b94d-726ff7a7431c\.system_generated\logs\transcript.jsonl"
if (-not (Test-Path $logPath)) {
    Write-Error "Log file does not exist at $logPath"
    exit
}

$lines = Get-Content -Path $logPath
$found = @()

foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    try {
        if ($line -like "*orcas-cute.svg*" -and $line -like "*CodeContent*") {
            # Parse JSON safely
            $json = ConvertFrom-Json $line
            if ($json.tool_calls) {
                foreach ($tc in $json.tool_calls) {
                    $args = $tc.arguments
                    if ($args -is [string]) {
                        try { $args = ConvertFrom-Json $args } catch {}
                    }
                    if ($args -and $args.TargetFile -like "*orcas-cute.svg*") {
                        $found += [PSCustomObject]@{
                            Step = $json.step_index
                            TargetFile = $args.TargetFile
                            CodeContent = $args.CodeContent
                        }
                    }
                }
            }
        }
    } catch {}
}

Write-Host "Found $($found.Count) matching operations."
foreach ($item in $found) {
    Write-Host "=================== STEP $($item.Step) ($($item.TargetFile)) ==================="
    Write-Host $item.CodeContent
}
