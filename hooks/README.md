# PALATOS hooks

Four hooks: two enforce gated autonomy and keep the human informed; two run the persistent lean-comms terse switch. All are non-destructive.

| Hook | Event | Script | What it does |
|---|---|---|---|
| `gate-guard` | `PreToolUse` (Bash) | `gate-guard.js` | Scans the intended shell command. **Blocks** (exit 2) genuinely irreversible/outward actions (push, publish, prod deploy, infra change, destructive ops) so a human must approve them; **warns** on maybe-spend commands (aws/gcloud/stripe/docker push/eas build). Everything else passes untouched. |
| `session-summary` | `Stop` | `session-summary.js` | At the end of a turn, surfaces the count of PENDING gates and whether the working tree is dirty. Purely informational. |
| `terse-persist` | `UserPromptSubmit` | `terse-persist.js` | Watches each user message for a terse-mode command ("terse lite\|full\|ultra", "lean mode", "normal mode", "stop terse"). On a match it **autosaves** the choice to the global state file and applies it immediately - persisting across sessions **and projects**. When terse is active and the message is not a command, re-emits a short anchor (per-turn reinforcement). |
| `terse-mode` | `SessionStart` | `terse-mode.js` | Activates `palatos:lean-comms` user-facing terse mode (with safety carve-outs). **Always-on by default** (level `full`); nudges statusline setup if none is configured. Disable with `PALATOS_TERSE_MODE=off`; force a level with `=lite\|full\|ultra`. |

Both terse hooks share `hooks/scripts/lean-comms-config.js` (state path, level resolution + ruleset text, symlink-safe read/write). `hooks/scripts/package.json` (`{"type":"commonjs"}`) keeps the `require()`-based hooks working under an ESM-ancestor `package.json`. A statusline badge showing the live level ships at `statusline/palatos-statusline.js`; full flow in `skills/lean-comms/references/user-facing-terse.md`.

## Platform

`hooks.json` runs the hooks with **Node** (`node ...`), which is cross-platform and always present alongside Claude Code - so the same config works on Windows, macOS, and Linux with **no editing**.

The equivalent `.ps1` (PowerShell) and `.sh` (POSIX) variants also ship in this folder as behavior-equivalent references; to use them instead, point the two `command` lines in `hooks.json` at the variant for your OS (`powershell -File ...` or `sh ...`).

## Design notes

- `gate-guard` is a **backstop**, not the primary control. The primary gate is the prompt-level contract in `palatos:company-os` that every agent obeys. Defense in depth.
- The guard is intentionally advisory/coarse: it errs toward letting reversible work through and only hard-blocks the clearly irreversible/outward set, so it never fights your normal workflow or other plugins' hooks.
- Blocked actions should be queued to `.palatos/gates.md` and cleared with `/palatos:gate approve`.
