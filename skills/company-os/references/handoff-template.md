# Handoff template

Every agent ends its turn with this block. It is the sole contract for passing context to the next agent - dense, exact, zero filler (see `palatos:lean-comms`).

```
── HANDOFF ──
from: <agent>
objective: <what this turn was asked to do>
result: <one line - what changed / was produced>
verified: <yes: how observed | no: why not, what is unverified>
artifacts: <files/paths created or changed, or output location>
decisions: <key choices made + one-line rationale each>
open: <anything unfinished, risks, or assumptions the next agent must know>
gates: <GATE-n raised, or none>
next: <recommended next agent + task, or "done">
learning: <one line appended to .palatos/learnings.md>
```

## Rules
- Fill every field. "none" / "n/a" is allowed but the field must be present.
- `result` and `next` are mandatory and must be specific.
- If `verified: no`, the receiving agent must verify before building on it.
- Keep it scannable - a reader should grasp state in ten seconds.
