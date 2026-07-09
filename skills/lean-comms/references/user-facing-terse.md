# User-facing terse mode

Loaded by `lean-comms` when the user opts into brevity ("be terse/brief", "less tokens", "lean/terse mode", or the PALATOS SessionStart terse hook is active). This is the opt-in, user-facing counterpart to internal-dense compression - it beats a generic terse mode by pairing compression with hard safety carve-outs, persistence, and a measured savings report, while staying integrated with every PALATOS skill's output contract.

## Principle
Respond terse but smart. All technical substance stays. Only fluff dies. Terse ≠ vague, ≠ unsafe.

## Intensity levels
| Level | What changes |
|---|---|
| **lite** | Drop filler/pleasantries/hedging. Keep articles + full sentences. Professional but tight. |
| **full** (default) | Drop articles, fragments OK, short synonyms ("big" not "extensive"). Classic terse. |
| **ultra** | Abbreviate common terms (DB/auth/config/req/res/fn/impl), strip conjunctions, arrows for causality (`X → Y`), one word when one word suffices, tables over prose. |
| **ultra+** | `ultra` + session codebook + symbol layer + fidelity gate. **Internal / repetitive traffic by default** - not a chat style (don't hand a user a codebook). On short/one-off text it is *larger* than `ultra`; use only when entities repeat enough to amortize. Spec + measured benchmark: `references/ultra-plus.md`. |

Switch with "terse lite/full/ultra" (or "lean lite/full/ultra"), or a plain request. Level persists until changed or the session ends.

Example - "Why does the React component re-render?"
- lite: "It re-renders because a new object reference is created each render. Wrap it in `useMemo`."
- full: "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."
- ultra: "Inline obj prop → new ref → re-render. `useMemo`."

## Rules
Drop: articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries (sure/certainly/of course/happy to), hedging. Fragments OK. Short synonyms. Keep exact: technical terms, identifiers, file paths, commands, numbers, and error strings (quote verbatim). Code blocks are never compressed.

Pattern: `[thing] [action] [reason]. [next step].`
Not: "Sure! I'd be happy to help. The issue is likely caused by…"
Yes: "Bug in auth middleware. Token expiry check uses `<` not `<=`. Fix:"

## Safety carve-out (auto-clarity) - always overrides terseness
Render in **normal, full prose** (then resume terse) for:
- Security warnings and anything with a security consequence.
- Irreversible / destructive action confirmations (deletes, drops, force-push, prod changes).
- Multi-step sequences where fragment order could be misread.
- When the user asks to clarify, or repeats a question (they didn't understand the terse version).

Example - destructive op stays readable:
> **Warning:** this permanently deletes all rows in `users` and cannot be undone.
> ```sql
> DROP TABLE users;
> ```
> (terse resumes) Verify backup exists first.

## Boundaries
- Code, commits, and PR descriptions are written normally (commits → `terse-commit` mode, which is dense but complete).
- PALATOS skill **output contracts** are preserved as-is - terseness trims prose around them, never the contract fields.
- Deactivate with "normal mode" / "stop terse" / "full output" → revert to full readable prose.

## Persistence - always-on by default, opt-out persists globally
Terse mode is **always-on** (level `full`) the moment the plugin is installed - no setup, like caveman. Turning it off, changing level, or turning it back on all **persist across sessions and projects**. Three pieces implement this, WITH the safety carve-outs above built in.
- **State resolution (first wins)**: `PALATOS_TERSE_MODE` env override → the global state file `<CLAUDE_CONFIG_DIR|~/.claude>/palatos-terse-mode.json` → default **full** (always-on). All three read it through the shared `hooks/scripts/lean-comms-config.js`.
- **Every new session** → the `SessionStart` hook (`hooks/scripts/terse-mode.js`) resolves the level and, unless off, injects the full ruleset. A fresh machine is terse-on immediately.
- **Change / off / on in chat** → the `UserPromptSubmit` hook (`hooks/scripts/terse-persist.js`) detects the command ("terse lite|full|ultra", "lean mode", "normal mode", "stop terse") and **autosaves** it to the state file, then applies it in the current turn. When terse is active and the message is not a command, it re-emits a short anchor (per-turn reinforcement) so terse never drifts mid-session.
- **Opt-out persists** (this beats caveman, whose opt-out resets next session): "normal mode" writes `off` to the state file, so terse stays off in every later session and project until you re-enable it.
- **Disable entirely / CI override**: set `PALATOS_TERSE_MODE=off` (env, e.g. in `~/.claude/settings.json`'s `env`) - hard-overrides the saved state. Force a level with `PALATOS_TERSE_MODE=lite|full|ultra`.
- **Statusline badge**: the shipped `statusline/palatos-statusline.js` shows the live level (`⚡ terse:full` / `terse off`). The SessionStart hook nudges setup if no statusline is configured.
- The state file is written and read symlink-safe (refuses a symlinked target, size-capped, whitelist-validated) so the predictable path can't be used to clobber or exfiltrate. Carve-outs + hard off switch keep always-on terse safe and fully reversible.

## Token-savings report (on request)
When the user asks "how much did that save?", give a rough estimate: terse full/ultra typically cuts conversational prose ~40-75% vs a verbose baseline (code/contracts/identifiers are unchanged, so real savings depend on the prose-to-code ratio). Report it as an estimate, not a precise count.

## Explicitly out of scope (honest note)
Classical-Chinese / "wenyan" novelty registers are intentionally not implemented - they're a stylistic gimmick, not a helpfulness or real token-efficiency axis. lean-comms optimizes for substance-preserving, safe brevity, not novelty.
