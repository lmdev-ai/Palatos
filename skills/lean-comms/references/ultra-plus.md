# ultra+ mode - codebook + symbols + verified 0-loss

Loaded by `lean-comms` for the highest-ratio mode. `ultra+` extends `ultra` with a session **codebook**, a **symbol layer**, and a **mandatory fidelity gate**. It is not a universal upgrade - it wins only on long, repetitive, internal traffic, and it is *measured*, not asserted.

## When to use / when NOT (this matters - measured below)
- **Use**: long internal logs, multi-cycle loop traces, batched status where the same entities (agent names, file paths, endpoints) repeat many times. Internal audience only.
- **Do NOT use**: short messages, one-off prose, or low-repetition text - the codebook's setup cost is not repaid and `ultra` is smaller. Never hand a user a codebook unless they opt in.
- **Break-even rule of thumb**: worth it once ~3+ distinct long entities each recur ~3+ times (roughly 4+ dense lines). Below that, drop to `ultra`.

## The codebook
- Define a short code for each recurring long entity **once**, at the top, prefixed `§`: `§ O=palatos-orchestrator S=.palatos/state.json B=backend-engineer`.
- The codebook **travels with the message** - a receiver expands codes deterministically, so nothing is lost.
- One code per entity; keep codes single-char/short and unambiguous; never reference a code not defined in the `§` line.
- Codes cover entities (names, paths, endpoints), not facts - numbers/errors stay literal.

## Symbol layer (replace recurring connectors)
`→` leads to/returns · `⇒` dispatches/produces · `∵` because · `∴` therefore · `∥` in parallel · `Δ` change/delta · `@` at/under · `≥ ≤ ≠` comparisons · `w/ w/o` with/without · `↑ ↓` up/down · `+` and. Use only where each is unambiguous in context.

## Structural encoding
Prefer `── HANDOFF ──` fields and `key:value` runs over sentences; drop connective words; one fact per unit. (This alone accounts for much of `full`/`ultra`'s savings.)

## Fidelity gate (mandatory) - this is why "0 loss" is real
1. **Enumerate atoms** in the source: identifiers, numbers, file paths, commands, error strings, named entities, and load-bearing claims.
2. **Compress** to `ultra+`.
3. **Verify**: expand the codebook, then confirm **every** atom is present (accounting for equivalent forms: `automated test`==`auto-test`, `5s`==`5 second`, `∥`==`parallel`).
4. **Reject on any miss** → back off to `ultra`. A compression that loses an atom is a defect, not a smaller message.
Lexical-only compressors *assert* no loss; this *checks* it. That is the differentiator, independent of ratio.

## Measured benchmark (real Anthropic tokenizer, not chars/4)
Tokenizer: `@anthropic-ai/tokenizer` (real Anthropic BPE; a close proxy for Claude token counts). All modes preserved **100% of atoms (fidelity-verified)**.

| Sample | ultra reduction | ultra+ reduction | winner |
|---|---|---|---|
| S1 short repetitive (104 tok) | **32%** | 24% | ultra (codebook not amortized) |
| S2 one-off prose (47 tok) | **34%** | 30% | ultra |
| S3 handoff, structural (92 tok) | **29%** | 27% | ultra |
| S4 **long repetitive log** (212 tok) | 23% | **46%** | **ultra+ (≈2× ultra)** |

**Honest reading:** `ultra+` *loses* to `ultra` on short/one-off text (its codebook line costs tokens up front), and *wins decisively* on long repetitive traffic where codes are reused enough to repay that cost. Pick the mode by the text, not by "highest number."

## Ceiling (no overclaiming)
Lossless compression cannot go below the text's information content. `ultra+` does not make everything ~50% smaller - S4's 46% is a best case for its shape. The durable wins are: (1) the **verified 0-loss guarantee**, and (2) the **architectural** savings `lean-comms` leans on elsewhere (progressive disclosure, subagent context isolation, state-file memory, memory compaction) - not sending tokens beats compressing them.

## Mode ladder (pick the lowest that meets the budget)
`lite` (~13% avg, always safe/readable) → `full` (~23%, default handoffs) → `ultra` (~30%, dense short) → `ultra+` (long repetitive internal only; up to ~46% when it amortizes, else use `ultra`).
