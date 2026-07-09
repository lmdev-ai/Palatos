#!/usr/bin/env node
// PALATOS terse-mode (Node, cross-platform) - SessionStart hook.
// Activates lean-comms user-facing terse mode at session start, with safety carve-outs.
// ALWAYS-ON by default (like caveman): a fresh machine starts terse (full) with zero setup.
// Opt out with "normal mode" - that choice persists across sessions AND projects (see lean-comms-config.js).
// Disable entirely / force a level for CI: PALATOS_TERSE_MODE=off|lite|full|ultra.

const fs = require("fs");
const path = require("path");
const os = require("os");
const cfg = require("./lean-comms-config");

try {
  fs.readFileSync(0, "utf8"); // consume stdin
} catch (_) {
  /* ignore */
}

const level = cfg.resolveLevel();

// Off -> emit nothing; output stays normal readable prose.
if (level === "off") {
  process.exit(0);
}

let output = cfg.sessionRuleset(level);

// Statusline nudge: if no statusLine is configured, tell Claude to offer setting up the PALATOS
// statusline (which shows the live terse badge). Mirrors caveman's ready-to-use setup nudge.
try {
  const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
  const settingsPath = path.join(claudeDir, "settings.json");
  let hasStatusline = false;
  if (fs.existsSync(settingsPath)) {
    const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    hasStatusline = !!settings.statusLine;
  }
  if (!hasStatusline) {
    const shipped = path.join(__dirname, "..", "..", "statusline", "palatos-statusline.js");
    const command = `node "${shipped}"`;
    output +=
      "\n\nSTATUSLINE SETUP AVAILABLE: PALATOS ships a statusline that shows plugin state plus a live terse-mode " +
      `badge (e.g. terse:full). It is not configured yet. To enable, add to ${settingsPath}: ` +
      `"statusLine": { "type": "command", "command": ${JSON.stringify(command)} }. ` +
      "Offer to set this up for the user on first interaction.";
  }
} catch (_) {
  /* never block session start over statusline detection */
}

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: output },
  }) + "\n"
);

process.exit(0);
