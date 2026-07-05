# PALATOS gate-guard (PowerShell) - advisory backstop for gated autonomy.
# PreToolUse:Bash hook. Reads the tool payload on stdin, scans the intended
# command, and BLOCKS (exit 2) genuinely irreversible/outward actions so a
# human must approve them. Warns on maybe-spend commands. Everything else passes.
$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
$cmd = ''
try { $cmd = ($raw | ConvertFrom-Json).tool_input.command } catch {}
if ([string]::IsNullOrWhiteSpace($cmd)) { $cmd = $raw }

function Block($class, $desc) {
  [Console]::Error.WriteLine("PALATOS GATE ($class): `"$desc`" is a gated action per palatos:company-os.")
  [Console]::Error.WriteLine("Do NOT perform it. Queue it to .palatos/gates.md and get human approval via /palatos:gate approve.")
  exit 2
}

switch -Regex ($cmd) {
  'git\s+push|git\s+remote\s+add' { Block 'push' 'git push / remote write' }
  'npm\s+publish|yarn\s+publish|pnpm\s+publish' { Block 'publish' 'package publish' }
  'vercel\s+.*--prod|netlify\s+deploy|eas\s+submit|supabase\s+(db\s+push|functions\s+deploy)|fly\s+deploy|gcloud\s+run\s+deploy|kubectl\s+apply|terraform\s+apply|serverless\s+deploy' { Block 'deploy' 'external deploy / infra change' }
  'rm\s+-rf|rm\s+-fr|git\s+reset\s+--hard|git\s+push\s+(--force|-f)|DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE\s|mkfs' { Block 'destructive' 'destructive / irreversible operation' }
  'stripe\s|(^|\s)aws\s|gcloud\s|docker\s+push|eas\s+build' {
    [Console]::Error.WriteLine("PALATOS notice: `"$cmd`" may spend money or change infrastructure - confirm it is not a gated action before proceeding.")
    exit 0
  }
}
exit 0
