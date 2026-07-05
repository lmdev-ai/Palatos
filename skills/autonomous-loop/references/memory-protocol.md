# Memory protocol - how the company learns

`learnings.md` is what makes PALATOS an OS and not a stateless agent swarm. It is read at the start of work and appended at the end, so every cycle compounds.

## Read (at SENSE / UNDERSTAND)
Before planning or building, scan `learnings.md` for entries relevant to the current objective. Never repeat a recorded failure or re-litigate a settled decision.

## Write (at LEARN / HANDOFF)
Append one entry per meaningful task. Keep it terse and factual:

```
## <date> - <objective or area>
- decision: <what was decided> - why: <one line>
- worked: <what succeeded and is worth repeating>
- failed: <what broke> - dont-repeat: <the rule to avoid it>
- metric: <impact observed, if any>
```

## What belongs where
- **Reversible, tactical lessons** → `learnings.md`.
- **Architectural / irreversible decisions** → `decisions/ADR-<n>.md` (with alternatives + consequences), and a one-line pointer in `learnings.md`.
- **Metric readings** → `metrics.md`, not here.

## Discipline
- Append-only. Do not rewrite history; if a past lesson is superseded, add a new entry that says so.
- One fact per bullet. No essays.
- If a learning contradicts `company.md`, surface it to the human - the brief may need updating.
