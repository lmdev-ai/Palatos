# lean-comms vs caveman - benchmark & parity audit

Goal: PALATOS `lean-comms` (terse mode) should be a ready-to-use, always-on terse plugin like [caveman](https://github.com/JuliusBrussee/caveman), and beat it where it counts. This audits **every** caveman setting and workflow against the current PALATOS implementation.

Reference audited: caveman `84cc3c14fa1e` (installed at `~/.claude/plugins/marketplaces/caveman`).

Legend: ✅ parity · 🟢 PALATOS wins · 🟡 partial / different · 🔴 gap (not yet).

## Activation & persistence

| Capability | caveman | PALATOS lean-comms | |
|---|---|---|---|
| Always-on at install, no setup | SessionStart writes `full` unless default is `off` | SessionStart resolves default `full` | ✅ |
| Turn off in chat | "stop caveman" / "normal mode" deletes the flag | "normal mode" / "stop terse" writes `off` | ✅ |
| **Opt-out persists across sessions** | ❌ flag deleted, but next SessionStart re-activates `full` (must edit env/config to make off stick) | ✅ `off` is written to the state file and honored every future session/project until re-enabled | 🟢 |
| Persists across projects | flag in `$CLAUDE_CONFIG_DIR` (shared) | state file in `$CLAUDE_CONFIG_DIR` (shared) | ✅ |
| Change level in chat | `/caveman lite|ultra|…` | "terse lite|full|ultra", "lean full", … | ✅ |
| Natural-language activation | regex ("activate/turn on caveman") | regex ("terse mode", "lean mode", "be terse", "less tokens") | ✅ |
| Slash command | `/caveman`, `/caveman-commit`, … | none (natural phrases only) | 🟡 phrases cover it; a `/terse` command could be added |
| Env override | `CAVEMAN_DEFAULT_MODE` | `PALATOS_TERSE_MODE` (`off` hard-disables; `lite|full|ultra` forces) | ✅ |
| Config-file default | `config.json` (`XDG`/`~/.config`/`%APPDATA%`) | none (env + state file only) | 🟡 env covers the CI case |
| Per-turn reinforcement (anti-drift) | UserPromptSubmit re-emits short reminder | UserPromptSubmit re-emits short anchor | ✅ |
| `CLAUDE_CONFIG_DIR` honored | yes | yes (shared `lean-comms-config.js`) | ✅ |

## Levels & modes

| Capability | caveman | PALATOS lean-comms | |
|---|---|---|---|
| lite / full / ultra | yes | yes | ✅ |
| Max-compression mode | ultra | **ultra+** (session codebook + symbol layer + structural encoding) | 🟢 |
| **Checked 0-loss invariant** | "full technical accuracy" (asserted) | **fidelity gate** enumerates atoms and verifies every one survives (checked, not asserted) | 🟢 |
| wenyan / classical-Chinese | 3 wenyan levels | intentionally omitted (novelty, not real token savings - documented out of scope) | 🟡 by design |
| Terse commit mode | `/caveman-commit` skill | `terse-commit` reference (Conventional Commits + preserves required trailers) | ✅ |
| Compress memory files | `caveman-compress` skill | `compress` reference (backup + fidelity gate) | ✅ |
| Terse code-review mode | `/caveman-review` skill | none dedicated; full `code-review` skill instead | 🟡 different tool for the job |
| Internal agent-to-agent dense handoffs | ❌ (chat style only) | ✅ `internal-dense` mode + `── HANDOFF ──` contract | 🟢 |

## Safety & security

| Capability | caveman | PALATOS lean-comms | |
|---|---|---|---|
| Safety carve-out (security/destructive/multi-step stays readable) | yes | yes (explicit, in injected rules + reinforcement) | ✅ |
| Symlink-safe flag **write** (refuse symlink, atomic temp+rename, `0600`, `O_NOFOLLOW`) | `safeWriteFlag` | `writeState` (same technique) | ✅ |
| Symlink-safe, size-capped, whitelist-validated **read** | `readFlag` | `readState` + statusline reader | ✅ |
| Statusline injection hardening (strip non `[a-z0-9-]`, whitelist) | `.sh`/`.ps1` | JSON+whitelist read; badge value is a fixed enum, never raw file bytes | ✅ |
| Silent-fail, never blocks session | yes | yes | ✅ |

## Packaging & portability

| Capability | caveman | PALATOS lean-comms | |
|---|---|---|---|
| CommonJS marker so `require()` hooks survive ESM ancestor | `hooks/package.json` | `hooks/scripts/package.json` | ✅ |
| Statusline badge shipped (.sh + .ps1) | yes | `statusline/palatos-statusline.js` (Node, cross-platform, one file) + live badge | ✅ |
| Statusline setup nudge when unconfigured | yes | yes (SessionStart) | ✅ |
| SessionStart reads SKILL.md at runtime (single source, filtered to level) | yes | no - hook carries a concise ruleset (chosen for robustness; small drift risk) | 🟡 candidate improvement |
| Standalone (non-plugin) install/uninstall scripts | `install.sh`/`.ps1` | none - plugin install auto-wires hooks | 🔴 add if we ship a non-plugin path |
| Cross-agent distribution (Codex, Gemini, Cursor, Windsurf, Cline, Copilot) | yes (CI-synced rule files) | Claude Code plugin only | 🔴 out of scope for now |
| Real-API token benchmark numbers | `benchmarks/` (live API counts) | ultra+ tokenizer benchmark (lite ~13% / full ~23% / ultra ~30% / ultra+ up to ~46% on long repetitive logs) | 🟡 have tokenizer numbers, not a live-API harness |
| Structural self-test | manual | `/palatos:selftest` (383 checks, includes hooks.json) | 🟢 |

## Where PALATOS beats caveman
1. **Opt-out persists** across sessions and projects (caveman's does not).
2. **ultra+ with a checked fidelity gate** - "0 context loss" is verified per message, not asserted.
3. **Internal agent-to-agent dense mode** - lean-comms is a comms *hub*, not just a chat style; the whole PALATOS company runs on dense handoffs.
4. **Self-test** covers the hooks and manifests.

## Honest gaps (decide whether to close)
- 🔴 No standalone install/uninstall scripts (only matters if we distribute lean-comms outside the plugin).
- 🔴 No cross-agent (Codex/Gemini/Cursor/…) distribution.
- 🟡 No `config.json` default-mode file (env var covers CI; add if per-project defaults are wanted).
- 🟡 SessionStart hook carries its own ruleset instead of reading SKILL.md at runtime (single-source vs robustness trade-off).
- 🟡 No dedicated terse "review" mode and no live-API benchmark harness for user-facing terse.
