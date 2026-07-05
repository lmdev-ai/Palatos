---
name: lean-comms
description: Token-frugal internal communication for the PALATOS loop - compress agent-to-agent handoffs and status to dense, exact text with zero filler, preserving all technical substance. Use for internal traffic; keep user-facing output readable unless terse mode is requested.
---

# lean-comms - dense, exact, zero filler

The promise: internal agent traffic that carries 100% of the technical substance at a fraction of the tokens - because a company running long multi-agent loops pays for every wasted word.

## When to use / when NOT
- **Use**: agent-to-agent handoffs, orchestrator↔specialist messages, internal status/state notes.
- **Not** (keep normal, readable prose): user-facing output, commit messages, PR descriptions, code, docs, security warnings, and any multi-step instruction where terseness risks misreading - unless the user explicitly opts into terse output.

## Inputs
- The message/handoff to send and its intended recipient (another agent, or the user).

## Method
1. **Decide the audience** - internal agent → compress; user-facing → readable (skip compression). When unsure, keep readable.
2. **Keep all substance** - technical terms, identifiers, file paths, numbers, error strings stay verbatim and exact. Compression never drops facts.
3. **Cut the noise, at the right intensity** - drop articles, pleasantries, hedging, and filler ("just/really/basically"); use fragments; short synonyms (big not extensive, fix not remediate). Graduated levels: **lite** (drop filler/hedging, keep grammar), **full** (drop articles, fragments OK - default for handoffs), **ultra** (abbreviate common terms, arrows for causality `X → Y`, one word where one word suffices). Never let a higher intensity drop a technical fact.
4. **Structure over prose** - prefer the `── HANDOFF ──` fields, lists, and `key: value` lines to paragraphs.
5. **One fact per line** - no restating, no throat-clearing, no "as mentioned above."
6. **Preserve exactness** - never abbreviate a path, command, or error into ambiguity. Terse ≠ vague.

## Output contract
- Internal: `── HANDOFF ──`-style fields or `key: value` / bulleted lines; fragments allowed; substance intact.
- User-facing: normal readable Markdown (this skill does not apply unless asked).

## Quality bar
- Same information, fewer tokens - a receiving agent loses nothing.
- Zero ambiguity introduced by compression.
- Never applied to the wrong audience (user output stays clear).

## Self-check rubric
- [ ] Is this internal traffic? (If user-facing, don't compress.)
- [ ] Did I keep every technical fact/identifier exact?
- [ ] Did I cut only filler, not substance?
- [ ] Is it structured (fields/lists) rather than prose?

## Anti-patterns
- Compressing user-facing output or security warnings into cryptic fragments.
- Dropping a fact/identifier to save tokens (ambiguity is a defect).
- Terseness that changes meaning or omits a gate/risk.
- Abbreviating paths/commands/errors into something unrunnable.
