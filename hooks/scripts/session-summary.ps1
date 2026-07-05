# PALATOS session-summary (PowerShell) - Stop hook.
# Non-blocking. Surfaces pending gates and a dirty working tree at the end of a turn.
$ErrorActionPreference = 'SilentlyContinue'
[void][Console]::In.ReadToEnd()

$msgs = @()

$gates = Join-Path (Get-Location) '.palatos/gates.md'
if (Test-Path $gates) {
  $pending = @(Select-String -Path $gates -Pattern 'status:\s*PENDING').Count
  if ($pending -gt 0) { $msgs += "$pending gate(s) awaiting approval - run /palatos:gate." }
}

$dirty = git status --porcelain 2>$null
if ($LASTEXITCODE -eq 0 -and $dirty) { $msgs += 'working tree has uncommitted changes.' }

if ($msgs.Count -gt 0) {
  (@{ systemMessage = 'PALATOS: ' + ($msgs -join ' ') } | ConvertTo-Json -Compress)
}
exit 0
