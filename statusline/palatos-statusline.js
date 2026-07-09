#!/usr/bin/env node
// PALATOS status line - truthful, live. Verifies the plugin is actually enabled and shows real state
// (version, model, dir, pending gates, cycle) PLUS a live lean-comms terse-mode badge. Stable user-path
// so it survives plugin version bumps (reads live state rather than being version-pinned).
// Receives Claude Code status JSON on stdin. Must never crash - always prints one line.
//
// Install: copy to ~/.claude/palatos-statusline.js and set in settings.json:
//   "statusLine": { "type": "command", "command": "node \"<path>/palatos-statusline.js\"" }

const fs = require("fs");
const os = require("os");
const path = require("path");

let input = {};
try { input = JSON.parse(fs.readFileSync(0, "utf8") || "{}"); } catch (_) {}

const home = os.homedir();
const C = {
  reset: "\x1b[0m", dim: "\x1b[2m", mag: "\x1b[35m", cyan: "\x1b[36m",
  yellow: "\x1b[33m", green: "\x1b[32m", orange: "\x1b[38;5;172m",
};
const rj = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (_) { return null; } };
const rd = (p) => { try { return fs.readFileSync(p, "utf8"); } catch (_) { return null; } };

const CONFIG_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(home, ".claude");

// --- lean-comms terse level: env override > state file (symlink-safe, capped, whitelisted) > default full ---
const TVALID = ["off", "lite", "full", "ultra"];
function terseNorm(v) {
  const s = (v == null ? "" : String(v)).trim().toLowerCase();
  if (s === "0" || s === "false") return "off";
  return TVALID.includes(s) ? s : null;
}
function terseLevel() {
  if (process.env.PALATOS_TERSE_MODE != null) {
    const n = terseNorm(process.env.PALATOS_TERSE_MODE);
    if (n) return n;
  }
  try {
    const f = path.join(CONFIG_DIR, "palatos-terse-mode.json");
    const st = fs.lstatSync(f);
    if (st.isSymbolicLink() || !st.isFile() || st.size > 1024) return "full";
    const o = JSON.parse(fs.readFileSync(f, "utf8"));
    const n = terseNorm(o && o.level);
    if (n) return n;
  } catch (_) { /* no/invalid file */ }
  return "full"; // always-on default
}

// Is a palatos plugin actually enabled? (truthful; works for Free `palatos@palatos` or Pro `palatos@palatos-pro`)
const settings = rj(path.join(home, ".claude", "settings.json")) || {};
const ep = settings.enabledPlugins || {};
const KEY = ep["palatos@palatos-pro"] === true ? "palatos@palatos-pro"
  : ep["palatos@palatos"] === true ? "palatos@palatos"
  : null;
const enabled = KEY !== null;

// Installed version (from the plugin registry, for whichever edition is enabled)
let ver = "";
if (KEY) { try { ver = rj(path.join(home, ".claude", "plugins", "installed_plugins.json")).plugins[KEY][0].version; } catch (_) {} }

// Session model + working dir (from the status JSON)
const model = (input.model && (input.model.display_name || input.model.id)) || "";
const cwd = (input.workspace && input.workspace.current_dir) || input.cwd || process.cwd();
const dir = path.basename(cwd) || cwd;

// Live company state in THIS repo's .palatos/
let hasState = false, gates = 0, cycle = null;
try {
  const pdir = path.join(cwd, ".palatos");
  if (fs.statSync(pdir).isDirectory()) {
    hasState = true;
    const g = rd(path.join(pdir, "gates.md"));
    if (g) { const m = g.match(/status:\s*PENDING/gi); gates = m ? m.length : 0; }
    const stt = rj(path.join(pdir, "state.json"));
    if (stt && stt.cycle != null) cycle = stt.cycle;
  }
} catch (_) {}

let out;
if (!enabled) {
  out = `${C.dim}◇ PALATOS off${C.reset}`; // ◇ - honest: plugin not enabled
} else {
  const sep = `${C.dim} · ${C.reset}`; // ·
  const parts = [`${C.mag}◆ PALATOS${ver ? " v" + ver : ""}${C.reset}`]; // ◆
  if (model) parts.push(`${C.dim}${model}${C.reset}`);
  if (dir) parts.push(`${C.cyan}${dir}${C.reset}`);
  if (hasState) {
    if (cycle != null) parts.push(`${C.dim}cy${cycle}${C.reset}`);
    parts.push(gates > 0
      ? `${C.yellow}⚑ ${gates} gate${gates > 1 ? "s" : ""}${C.reset}` // ⚑
      : `${C.green}✓ clear${C.reset}`); // ✓
  } else {
    parts.push(`${C.dim}no .palatos — /palatos:onboard${C.reset}`);
  }
  // lean-comms badge (always shown when plugin enabled)
  const lvl = terseLevel();
  parts.push(lvl === "off"
    ? `${C.dim}terse off${C.reset}`
    : `${C.orange}⚡ terse:${lvl}${C.reset}`);
  out = parts.join(sep);
}
process.stdout.write(out);
