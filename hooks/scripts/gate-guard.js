#!/usr/bin/env node
// PALATOS gate-guard (Node, cross-platform) - advisory backstop for gated autonomy.
// PreToolUse:Bash hook. Reads the tool payload on stdin, scans the intended
// command, and BLOCKS (exit 2) genuinely irreversible/outward actions so a
// human must approve them. Warns on maybe-spend commands. Everything else passes.

let raw = "";
try {
  raw = require("fs").readFileSync(0, "utf8");
} catch (_) {
  raw = "";
}

let cmd = "";
try {
  cmd = JSON.parse(raw)?.tool_input?.command || "";
} catch (_) {
  /* not JSON */
}
if (!cmd || !cmd.trim()) cmd = raw;

function block(cls, desc) {
  process.stderr.write(
    `PALATOS GATE (${cls}): "${desc}" is a gated action per palatos:company-os.\n`
  );
  process.stderr.write(
    "Do NOT perform it. Queue it to .palatos/gates.md and get human approval via /palatos:gate approve.\n"
  );
  process.exit(2);
}

const rules = [
  [/git\s+push|git\s+remote\s+add/, "push", "git push / remote write"],
  [/npm\s+publish|yarn\s+publish|pnpm\s+publish/, "publish", "package publish"],
  [
    /vercel\s+.*--prod|netlify\s+deploy|eas\s+submit|supabase\s+(db\s+push|functions\s+deploy)|fly\s+deploy|gcloud\s+run\s+deploy|kubectl\s+apply|terraform\s+apply|serverless\s+deploy/,
    "deploy",
    "external deploy / infra change",
  ],
  [
    /rm\s+-rf|rm\s+-fr|git\s+reset\s+--hard|git\s+push\s+(--force|-f)|DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE\s|mkfs/,
    "destructive",
    "destructive / irreversible operation",
  ],
];

for (const [re, cls, desc] of rules) {
  if (re.test(cmd)) block(cls, desc);
}

// Maybe-spend / infra: warn but allow.
if (/stripe\s|(^|\s)aws\s|gcloud\s|docker\s+push|eas\s+build/.test(cmd)) {
  process.stderr.write(
    `PALATOS notice: "${cmd}" may spend money or change infrastructure - confirm it is not a gated action before proceeding.\n`
  );
}

process.exit(0);
