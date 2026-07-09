#!/usr/bin/env node
// PALATOS terse-persist (Node, cross-platform) - UserPromptSubmit hook.
//
// Two jobs, every user message:
//   1. AUTOSAVE toggles - if the message turns terse mode on/off/level, write the choice to the global
//      state file so it persists across sessions AND projects, and activate/deactivate it in this turn.
//   2. Per-turn reinforcement - if terse is active (env > state > default full), re-emit a short anchor
//      so terse style doesn't drift after other plugins inject context mid-session.
//
// State + resolution live in lean-comms-config.js (shared with the SessionStart hook). Silent-fails.

const fs = require("fs");
const cfg = require("./lean-comms-config");

function readPrompt() {
  try {
    const raw = fs.readFileSync(0, "utf8");
    if (!raw) return "";
    try {
      const o = JSON.parse(raw);
      return String(o.prompt || o.user_prompt || o.message || raw);
    } catch (_) {
      return raw; // not JSON - treat as the raw prompt
    }
  } catch (_) {
    return "";
  }
}

// Detect an explicit terse-mode command in the user's message. Returns a level string, "off", or null.
function detect(prompt) {
  const p = " " + prompt.toLowerCase().replace(/\s+/g, " ") + " ";

  // Deactivation first (so "stop terse" never reads as "terse").
  if (/\b(normal mode|stop terse|stop lean|terse off|lean off|disable terse|disable lean|full output|verbose mode)\b/.test(p)) {
    return "off";
  }

  // Explicit level: "terse ultra", "lean full", "terse mode lite", etc.
  const lvl = p.match(/\b(?:terse|lean)(?: mode)?\s+(lite|full|ultra)\b/);
  if (lvl) return lvl[1];
  const lvl2 = p.match(/\b(lite|full|ultra)\s+(?:terse|lean)\b/);
  if (lvl2) return lvl2[1];

  // Plain activation -> default level full.
  if (/\b(terse mode|lean mode|terse on|lean on|be terse|be brief|less tokens|lean comms on|token frugal)\b/.test(p)) {
    return "full";
  }

  return null;
}

function emit(msg) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: msg },
    }) + "\n"
  );
  process.exit(0);
}

const prompt = readPrompt();
const cmd = prompt ? detect(prompt) : null;

// --- 1) Toggle in this message -> autosave + activate/deactivate now ---
if (cmd) {
  const saved = cfg.writeState(cmd);
  if (cmd === "off") emit(cfg.deactivationMessage(saved));
  emit(cfg.activationRuleset(cmd, saved));
}

// --- 2) No toggle, but terse active (env > state > default full) -> short per-turn reinforcement ---
const active = cfg.resolveLevel();
if (active !== "off") emit(cfg.reinforcement(active));

process.exit(0);
