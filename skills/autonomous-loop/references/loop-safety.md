# Loop-safety - guards against runaway autonomy

An always-on loop with money/deploy powers must be impossible to run away. These guards are mandatory and cannot be disabled by an agent (only the human, via `company.md`).

## Hard limits

1. **Max cycles per run** - default 25 (override in `company.md`). On reaching it, the loop pauses, writes a summary, and asks the human whether to continue.
2. **Stop-on-no-progress** - track `cycles_without_progress` in `state.json`. If two consecutive cycles ship zero verified objectives, pause and escalate (likely blocked, looping, or mis-scoped).
3. **Gate supremacy** - no cycle may perform a gated action (money/deploy/publish/push/legal/redteam/destructive). The loop routes around gates; it never through them.
4. **Budget ceiling** - the budget in `company.md` is a policy the loop respects; approaching it raises a `money` gate rather than proceeding.

## Soft guards

- **Objective sanity** - if the picked objective is not traceable to the north-star or roadmap, skip it and note why.
- **Repetition guard** - if the same objective fails twice across cycles, quarantine it to `learnings.md` as blocked and move on; do not retry a third time without human input.
- **Diff-size sanity** - an unexpectedly huge change in one cycle triggers a self-review pause before ship.

## On pause
Write a clear human-facing summary: cycles run, objectives shipped, open gates, why it paused, and the single recommended next action. Then stop cleanly (state persisted).
