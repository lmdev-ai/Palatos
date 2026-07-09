---
name: lean-comms
description: Token-frugal communication for PALATOS - the hub for dense internal agent-to-agent handoffs AND an opt-in user-facing terse mode (lite/full/ultra), plus terse-commit and memory-file compress modes. Preserves 100% of technical substance; keeps safety-critical and user-facing prose readable unless terse is chosen. Use to compress internal traffic, to run a brief user-facing style, to write terse commits, or to compress memory files. Aliases: "be brief", "terse mode", "lean mode", "less tokens", "terse commit", "compress this file".
---

# lean-comms - dense, exact, zero filler

The promise: every internal message carries 100% of its technical substance at a fraction of the tokens - and, when the user asks for it, a user-facing terse mode that stays safe and exact. Compression never drops a fact, and it never garbles a security warning or a user who needs clear prose.

## Modes (route first, then compress)
1. **internal-dense** (default for agent traffic) - agent↔agent handoffs, orchestrator↔specialist, status/state notes. Compress hard.
2. **user-facing-terse** - brief replies to the user with intensity levels; keeps safety carve-outs. **Always-on by default** (level `full`) via the terse hooks; opt out with "normal mode" and that choice persists across sessions and projects. → `references/user-facing-terse.md`.
3. **terse-commit** - dense Conventional-Commits messages that still honor the repo's trailer convention. → `references/terse-commit.md`.
4. **compress** - shrink natural-language memory files (CLAUDE.md, todos, `.palatos/*.md`) losslessly, with backup + fidelity gate. → `references/compress.md`.

## When to use / when NOT
- **Use**: any internal traffic; an explicit user request for brevity ("be terse/brief", "lean mode", "less tokens"); writing a commit; compressing a memory file.
- **Not** (keep normal, readable prose regardless of mode): security warnings, irreversible-action confirmations, multi-step instructions where terseness risks misreading, code/PR descriptions/docs, and any user-facing output when the user has NOT opted into terse. When unsure of the audience, stay readable.

## Inputs
- The message/artifact, its audience (agent vs user), and the active mode/intensity.

## Method
1. **Route by audience** - internal agent → compress (internal-dense). User-facing → readable UNLESS terse is active. Commit/compress requests → the matching mode file. When unsure, keep readable.
2. **Keep all substance** - technical terms, identifiers, file paths, numbers, error strings stay verbatim and exact. Compression never drops facts. Terse ≠ vague.
3. **Cut noise at the right intensity ladder** - pick the LOWEST level that hits your token budget (higher level = more decode effort for the reader, so don't over-compress):
   - **lite** - drop filler/hedging/pleasantries; keep articles + grammar. Reads like tight professional prose.
   - **full** (default for handoffs) - also drop articles; fragments OK; short synonyms (big not extensive, fix not remediate).
   - **ultra** - also abbreviate common terms (DB/auth/config/req/res/fn/impl), arrows for causality (`X → Y`), one word where one suffices, tables over prose.
   - **ultra+** (internal, repetitive traffic) - also a session **codebook** (define a short code for each recurring entity once, then reuse the code) + a **symbol layer** (`→ ⇒ ∵ ∴ ∥ Δ @ ≥ ≤ ≠ w/ w/o ↑ ↓`) + structural encoding. Highest ratio; **requires the fidelity gate**. Full spec: `references/ultra-plus.md`.
   - **Atom invariant (every level):** identifiers, numbers, file paths, commands, error strings, and named entities are ATOMS - kept verbatim, or (ultra+ only) reconstructable from the codebook that travels with the message. No level may drop or blur an atom; if a cut would, back off a level.
4. **Fidelity gate** (mandatory for ultra+, recommended whenever substance is critical) - enumerate the atoms in the source; after compressing, verify **every** atom survives (expanding the codebook for ultra+). Any missing/ambiguous atom → reject and back off a level. This is what makes "0 context loss" a *checked invariant*, not a promise - the thing lexical-only compressors don't do.
5. **Structure over prose** - prefer `── HANDOFF ──` fields, lists, and `key: value` lines to paragraphs; one fact per line; no throat-clearing.
6. **Apply the safety carve-out (auto-clarity)** - security/destructive/multi-step content renders in normal prose even inside a terse session; resume terse after the safety-critical part. `ultra+` is internal-default: don't hand a user a codebook unless they opt in.
7. **Preserve exactness** - never abbreviate a path, command, or error into ambiguity.
8. **Report savings when asked** - measured token reduction + a fidelity result (atoms preserved), not a vibe (see the terse mode / ultra-plus files).

## Output contract
- **Internal**: `── HANDOFF ──` fields or `key: value` / bulleted lines; fragments allowed; substance intact.
- **User-facing (terse on)**: brief Markdown, fragments OK, safety parts in full prose. (Terse off → normal readable Markdown; this skill doesn't apply.)
- **Commit / compress**: per the respective reference file's contract.

## References (progressive disclosure)
- `references/ultra-plus.md` - the `ultra+` mode: codebook rules, symbol table, structural encoding, the fidelity-gate procedure, when-to-use/when-not, and the measured benchmark vs the other modes.
- `references/user-facing-terse.md` - intensity detail, safety carve-outs, persistence/hook behavior, deactivation, token-savings report.
- `references/terse-commit.md` - Conventional Commits + convention-aware trailer handling (preserves required `Co-Authored-By`).
- `references/compress.md` - memory-file compression, preserve-exactly rules, backup, fidelity gate.

## Quality bar
- Same information, fewer tokens - a receiving agent (or user) loses nothing.
- Zero ambiguity introduced by compression; paths/commands/errors stay runnable.
- Never applied to the wrong audience or to safety-critical text.
- Substance-preserving across every intensity level and mode.
- `ultra+` and any substance-critical compression **pass the fidelity gate** (every atom verified present) - "0 loss" is checked, not asserted.
- Intensity is the lowest that meets the budget (don't over-compress and tax the reader).

## Self-check rubric
- [ ] Did I route by audience (compress internal; readable to user unless terse opted-in)?
- [ ] Did I keep every technical fact/identifier/path exact (or codebook-reconstructable in ultra+)?
- [ ] Did I cut only filler, not substance?
- [ ] Did safety-critical / multi-step / destructive content stay in full prose?
- [ ] For ultra+/critical: did I run the fidelity gate and confirm all atoms survive?
- [ ] Did I pick the lowest intensity that meets the budget (not over-compress)?

## Anti-patterns
- Compressing user-facing output the user didn't opt into, or a security warning, into cryptic fragments.
- Dropping a fact/identifier to save tokens (ambiguity is a defect).
- Terseness that changes meaning or omits a gate/risk.
- Abbreviating paths/commands/errors into something unrunnable.
- Stripping a required commit trailer in the name of brevity (see terse-commit).
- `ultra+` on one-off non-repetitive prose (codebook overhead, ~no payoff) or referencing a code not defined in the codebook.
- Claiming "0 context loss" without running the fidelity gate.
