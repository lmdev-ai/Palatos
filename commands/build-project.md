---
description: Build a single objective end-to-end with the PALATOS team (no continuous loop).
argument-hint: <what to build>
---

# /build-project

Take one objective from idea to shipped-and-verified using the PALATOS company - a single pass, not the autonomous loop.

**Objective:** $ARGUMENTS

## Do this
1. Obey `palatos:company-os`. If `.palatos/company.md` exists, read it for context.
2. Act as the `palatos-orchestrator` (per the orchestrator agent's method) in THIS primary thread - orchestration must run at the top level, because a Claude Code subagent cannot spawn subagents. Then:
   - decompose the objective into specialist tasks,
   - fan out independent work in parallel by spawning specialist subagents via the Agent tool from here,
   - route everything shippable through the quality + security gates (code-reviewer, qa-engineer, security wing),
   - queue any gated action (deploy/publish/push/spend/destructive) to `.palatos/gates.md` instead of performing it.
3. Verify the result by observation (`palatos:verify`) before reporting done.

## Report back
Plan → agents run (with parallelism) → result → verification evidence → gate status → recommended next step.
