#!/usr/bin/env node
// PALATOS lean-comms - shared terse-mode config resolver (CommonJS).
// One source of truth for: where state lives, how the active level resolves, and safe read/write.
// Required by terse-mode.js (SessionStart) and terse-persist.js (UserPromptSubmit). Silent-fails always.
//
// Active-level resolution (first wins):
//   1. PALATOS_TERSE_MODE env  - hard override for CI / power users (off | lite | full | ultra)
//   2. global state file       - <config>/palatos-terse-mode.json {"level":"..."} (autosaved on toggle)
//   3. default                 - full (ALWAYS-ON, like caveman)
//
// So a fresh machine is terse-on (full) with zero setup; "normal mode" writes off and PERSISTS
// across sessions AND projects (caveman's opt-out does not persist); re-enabling persists too.
// <config> = CLAUDE_CONFIG_DIR if set, else ~/.claude.

const fs = require("fs");
const os = require("os");
const path = require("path");

const VALID = ["off", "lite", "full", "ultra"];
const DEFAULT_LEVEL = "full"; // always-on
const MAX_STATE_BYTES = 1024; // state file is tiny JSON; cap guards against a symlink-to-secret read

const CONFIG_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
const STATE_FILE = path.join(CONFIG_DIR, "palatos-terse-mode.json");

const LEVEL_RULE = {
  lite: "Drop filler/pleasantries/hedging. Keep articles + full sentences.",
  full: "Drop articles + filler; fragments OK; short synonyms. Classic terse.",
  ultra:
    "Abbreviate common terms; strip conjunctions; arrows for causality (X -> Y); one word where one suffices; tables over prose.",
};

function normalize(v) {
  const s = (v == null ? "" : String(v)).trim().toLowerCase();
  if (s === "0" || s === "false") return "off";
  return VALID.includes(s) ? s : null;
}

// Symlink-safe, size-capped, whitelist-validated read. Returns "off"|"lite"|"full"|"ultra" or null.
// Symmetric with writeState: refuses a symlink at the target, caps the read, rejects unknown content -
// so a planted symlink (e.g. -> ~/.ssh/id_rsa) can never be slurped into model context.
function readState() {
  try {
    let st;
    try {
      st = fs.lstatSync(STATE_FILE);
    } catch (_) {
      return null;
    }
    if (st.isSymbolicLink() || !st.isFile() || st.size > MAX_STATE_BYTES) return null;
    const raw = fs.readFileSync(STATE_FILE, "utf8");
    const o = JSON.parse(raw);
    return normalize(o && o.level);
  } catch (_) {
    return null;
  }
}

// env override -> state file -> default full
function resolveLevel() {
  const env = process.env.PALATOS_TERSE_MODE != null ? normalize(process.env.PALATOS_TERSE_MODE) : null;
  if (env != null) return env;
  const st = readState();
  if (st != null) return st;
  return DEFAULT_LEVEL;
}

// Symlink-safe atomic write: refuse if parent dir or target is a symlink, then temp + rename, 0600.
function writeState(level) {
  const lvl = normalize(level);
  if (lvl == null) return false;
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    try {
      if (fs.lstatSync(CONFIG_DIR).isSymbolicLink()) return false;
    } catch (_) {
      return false;
    }
    try {
      if (fs.lstatSync(STATE_FILE).isSymbolicLink()) return false;
    } catch (e) {
      if (e.code !== "ENOENT") return false;
    }
    const tmp = path.join(CONFIG_DIR, `.palatos-terse-mode.${process.pid}.${Date.now()}.tmp`);
    const O_NOFOLLOW = typeof fs.constants.O_NOFOLLOW === "number" ? fs.constants.O_NOFOLLOW : 0;
    const flags = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | O_NOFOLLOW;
    let fd;
    try {
      fd = fs.openSync(tmp, flags, 0o600);
      fs.writeSync(fd, JSON.stringify({ level: lvl, updated: new Date().toISOString() }, null, 2) + "\n");
      try { fs.fchmodSync(fd, 0o600); } catch (_) { /* best-effort on Windows */ }
    } finally {
      if (fd !== undefined) fs.closeSync(fd);
    }
    fs.renameSync(tmp, STATE_FILE);
    return true;
  } catch (_) {
    return false;
  }
}

// ---- Single-source ruleset text (consumed by both hooks; no duplication, no runtime MD parsing) ----

// Full ruleset injected at SessionStart (and on explicit toggle-on).
function sessionRuleset(level) {
  return [
    `PALATOS terse mode ACTIVE (level: ${level}). Follow palatos:lean-comms user-facing-terse.`,
    "",
    "Respond terse but smart. All technical substance stays; only fluff dies. Terse != vague.",
    `Level rule: ${LEVEL_RULE[level]}`,
    "Keep EXACT: identifiers, file paths, commands, numbers, error strings, code blocks (never compressed).",
    "",
    "SAFETY CARVE-OUT (always render in normal full prose, then resume terse):",
    "security warnings; irreversible/destructive-action confirmations; multi-step sequences where order",
    "could be misread; when the user asks to clarify or repeats a question.",
    "Code, commits (use terse-commit), and PR descriptions are written normally.",
    "PALATOS skill output contracts are preserved verbatim - terseness trims prose around them, not the fields.",
    "",
    'Deactivate any time: "normal mode" / "stop terse" / "full output" (saved globally too).',
    'Change level: "terse lite|full|ultra". Disable persistence entirely: set PALATOS_TERSE_MODE=off.',
  ].join("\n");
}

// Confirmation + rules emitted when the user turns terse on/changes level in chat.
function activationRuleset(level, saved) {
  return [
    `PALATOS terse mode ACTIVE (level: ${level}) and saved globally` +
      (saved ? "" : " (WARNING: could not write state file - applies to this session only)") +
      '. Persists across sessions and projects until you say "normal mode".',
    "Follow palatos:lean-comms user-facing-terse. Respond terse but smart; all technical substance stays, only fluff dies.",
    `Level rule: ${LEVEL_RULE[level]}`,
    "Keep EXACT: identifiers, file paths, commands, numbers, error strings, code blocks (never compressed).",
    "SAFETY CARVE-OUT: security warnings, irreversible/destructive confirmations, and multi-step sequences render in normal full prose, then resume terse.",
  ].join("\n");
}

// Message emitted when the user turns terse off in chat.
function deactivationMessage(saved) {
  return (
    "PALATOS terse mode DEACTIVATED and saved globally" +
    (saved ? "" : " (WARNING: could not write state file - change applies to this session only)") +
    ". Respond in normal, full, readable prose from now on. This persists across sessions and projects."
  );
}

// Short per-turn anchor emitted while terse is active and the message is not a command.
function reinforcement(level) {
  return (
    `PALATOS terse mode still ACTIVE (level: ${level}). ${LEVEL_RULE[level]} ` +
    "Keep identifiers/paths/commands/numbers/errors/code exact; render safety-critical + multi-step content in normal prose."
  );
}

module.exports = {
  VALID,
  DEFAULT_LEVEL,
  CONFIG_DIR,
  STATE_FILE,
  LEVEL_RULE,
  normalize,
  readState,
  resolveLevel,
  writeState,
  sessionRuleset,
  activationRuleset,
  deactivationMessage,
  reinforcement,
};
