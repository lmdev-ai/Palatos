# Efficiency doctrine - run lean

A top team wins on leverage per token and per cycle, not on effort. These rules are binding.

## 1. Parallel-by-default
Independent work is spawned in one message (multiple `Agent` calls), never serially. Serial execution of parallelizable work is waste.

## 2. Right-size the model
Match model to task difficulty: `opus` for strategy/architecture/security/finance/legal/pricing; `sonnet` for build/research/execution; `haiku` for support/light copy/formatting. Do not use a heavy model for a trivial task.

## 3. Stop at Definition of Done
No gold-plating. When acceptance criteria are met and verified, stop. Extra polish nobody asked for is cost without value.

## 4. Reuse before create
Check for existing code, utilities, patterns, and skills before writing anything new. Duplicated logic is a defect.

## 5. Rich handoffs, no re-derivation
The `── HANDOFF ──` block must carry everything the next agent needs. Re-reading and re-deriving resolved context is pure overhead.

## 6. Batch reviews
Review a whole change once, not file-by-file. One security pass, one code-review pass - not many.

## 7. Fail-fast
Two retries max on a broken approach, then change tack or escalate. Do not burn cycles thrashing.

## 8. Token frugality
Internal agent-to-agent traffic follows `palatos:lean-comms`: dense, exact, no filler. User-facing output stays readable.
