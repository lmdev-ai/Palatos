---
description: Produce a strategy + roadmap for an idea (no build).
argument-hint: <the idea or goal>
---

# /plan-project

Turn an idea into a strategy and roadmap the team can execute from. Planning only - nothing is built.

**Idea:** $ARGUMENTS

## Do this
1. Obey `palatos:company-os`. Read `.palatos/company.md` if present.
2. Act as the `palatos-orchestrator` in THIS primary thread (a subagent can't spawn subagents) and fan out a planning pass via the Agent tool:
   - `palatos-strategist` → mission, thesis, north-star, business model, phased roadmap,
   - `palatos-product-manager` → prioritized objectives + acceptance criteria,
   - `palatos-architect` → high-level technical approach + key risks.
   *(Sourced market/competitive research is a PALATOS Pro specialist.)*
3. Write/update `.palatos/roadmap.md` and `.palatos/backlog.md`. Do **not** build.

## Report back
Strategy summary (mission, north-star, thesis) · Roadmap (Now/Next/Later) · Prioritized backlog · Key risks/assumptions to validate first. Point to `/palatos:build-project` or `/palatos:company-run` to execute.
