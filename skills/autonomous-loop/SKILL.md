---
name: autonomous-loop
description: The PALATOS OS engine. Use when running the company autonomously (the /company-run loop) or resuming a run - defines the SENSE→PLAN→BUILD→VERIFY→SHIP→MEASURE→LEARN cycle, the .palatos/ state files, crash-resumability, and loop-safety limits.
---

# autonomous-loop - the PALATOS OS engine

Runs the company as a continuous, resumable loop that plans the highest-leverage work, executes it, ships what is ungated, measures outcomes, and records learnings - pausing only for human gates. Driven by `palatos-orchestrator` under `/palatos:company-run`.

## When to use / when NOT

- **Use**: `/palatos:company-run`, or any time you resume/advance an autonomous run.
- **Not** for a single one-shot task - that is `/palatos:build-project` or a direct specialist call. This skill is the *loop*, not the *task*.

## Inputs (must exist before looping)

- `.palatos/company.md` - the founder brief. If absent, run `/palatos:onboard` first.
- `.palatos/backlog.md` - objective queue. If absent, create it from `company.md` + `roadmap.md`.
- `.palatos/state.json` - machine state. If absent, initialize (see `references/state-schema.md`).

## Method - one cycle

1. **SENSE** - read all `.palatos/` state: `company.md`, `roadmap.md`, `backlog.md`, `metrics.md`, `learnings.md`, `gates.md`, and `state.json`. Note open gates and the resume point.
2. **PLAN** - pick the single highest-leverage next objective aligned to the north-star (strategist/PM judgment). Respect dependencies; skip objectives blocked only on a PENDING gate.
3. **BUILD** - orchestrator decomposes and fans out specialists in parallel to execute the objective (see `palatos:company-os` handoff rules).
4. **VERIFY** - QA + code-reviewer + (for anything shippable) the security wing gate. Nothing advances unverified.
5. **SHIP** - if the release action is **ungated**, devops performs it. If **gated**, raise the gate (`references` in `palatos:company-os` → gates) and continue with other work - do not stop the loop.
6. **MEASURE** - data-analyst reads outcomes/metrics, appends to `metrics.md`, compares against the north-star.
7. **LEARN** - write wins/failures/decisions to `learnings.md` (see `references/memory-protocol.md`). Record ADRs for irreversible calls.
8. **CHECKPOINT & LOOP** - update `state.json` (cycle number, completed objective, next resume point), then start the next cycle. Stop only on: empty backlog, a loop-safety limit, or an explicit human stop.

## Loop-safety limits (mandatory - see `references/loop-safety.md`)

- **Max cycles per run** (default 25) - then pause and summarize for the human.
- **Stop-on-no-progress** - if two consecutive cycles complete zero objectives, pause and escalate.
- **All spend/deploy/publish/destructive actions remain gated** - the loop can never bypass a gate.
- **Budget policy** from `company.md` is respected; approaching it raises a gate.

## Output contract (each cycle)

```
CYCLE <n> - <objective>
plan: <one line>
built: <what shipped/changed>
verified: <evidence>
shipped: <yes | gated: GATE-x | n/a>
measured: <metric delta vs north-star>
learned: <one line>
state: <resume point written to state.json>
next: <next objective | paused: reason>
```

## Quality bar

- Every cycle moves a real metric or a real deliverable - never busywork.
- State is always consistent on disk: a `kill -9` mid-cycle loses at most the current cycle, never the run.
- No gate is ever silently bypassed.

## Self-check rubric (pass before ending a cycle)

- [ ] Did I persist `state.json` so a resume would continue correctly?
- [ ] Did I append to `learnings.md` and `metrics.md`?
- [ ] Did I keep every gated action queued, not performed?
- [ ] Did I check loop-safety limits before continuing?

## Anti-patterns

- Halting the whole loop because one action is gated (pivot instead).
- Looping without checkpointing state (breaks resumability).
- Chasing objectives unaligned to the north-star.
- Ignoring `learnings.md` and repeating a known failure.
- Running past the max-cycle / no-progress limits without pausing for the human.
