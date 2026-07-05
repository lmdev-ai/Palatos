---
description: Boot the PALATOS autonomous company loop (SENSE→PLAN→BUILD→VERIFY→SHIP→MEASURE→LEARN).
argument-hint: [optional goal to seed the backlog]
---

# /company-run

Boot PALATOS as an autonomous company and run the continuous loop.

**Goal (optional):** $ARGUMENTS

## Do this
1. **Load the OS engine** - use the `palatos:autonomous-loop` skill and obey `palatos:company-os`.
2. **Ensure state exists** - check for `.palatos/company.md`. If missing, tell the user to run `/palatos:onboard` first (or, if a goal was given above, do a fast inline onboard to create it). Ensure `.palatos/backlog.md` and `.palatos/state.json` exist (initialize per the state schema if not). If a goal was provided, add it to the top of the backlog.
3. **Run the loop as the orchestrator - in THIS primary thread.** Adopt the `palatos-orchestrator` role (its method lives in the orchestrator agent) and drive the loop from here. Do **not** spawn `palatos-orchestrator` as a subagent: Claude Code does not let a subagent spawn subagents, and orchestration's whole job is fanning out specialists. Run it at the top level, where the Agent tool can dispatch specialist subagents:
   - **SENSE** the `.palatos/` state, **PLAN** the highest-leverage next objective, **BUILD** by fanning out specialists in parallel (spawn each via the Agent tool from here), **VERIFY** through QA + review + security gates, **SHIP** if ungated (else queue the gate and pivot), **MEASURE** via the data-analyst, **LEARN** into `learnings.md`, then **CHECKPOINT** `state.json` and loop.
4. **Respect the gates and loop-safety limits** - never perform a gated action (money/deploy/publish/push/legal/red-team/destructive); queue it to `.palatos/gates.md`. Stop at the max-cycle / no-progress limits and summarize.

## Report back
For each cycle: objective, what shipped/was built, verification evidence, metric delta, gates queued, and the next objective. When paused, give a clear summary and the single recommended next action for the user.
