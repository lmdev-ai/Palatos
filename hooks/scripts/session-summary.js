#!/usr/bin/env node
// PALATOS session-summary (Node, cross-platform) - Stop hook.
// Non-blocking. Surfaces pending gates and a dirty working tree at the end of a turn.

const fs = require("fs");
const { execSync } = require("child_process");

try {
  fs.readFileSync(0, "utf8"); // consume stdin
} catch (_) {
  /* ignore */
}

const msgs = [];

try {
  const gates = fs.readFileSync(".palatos/gates.md", "utf8");
  const pending = (gates.match(/status:\s*PENDING/g) || []).length;
  if (pending > 0) msgs.push(`${pending} gate(s) awaiting approval - run /palatos:gate.`);
} catch (_) {
  /* no gates file */
}

try {
  const dirty = execSync("git status --porcelain", {
    stdio: ["ignore", "pipe", "ignore"],
  })
    .toString()
    .trim();
  if (dirty) msgs.push("working tree has uncommitted changes.");
} catch (_) {
  /* not a git repo / git unavailable */
}

if (msgs.length > 0) {
  process.stdout.write(
    JSON.stringify({ systemMessage: "PALATOS: " + msgs.join(" ") }) + "\n"
  );
}

process.exit(0);
