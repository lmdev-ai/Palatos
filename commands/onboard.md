---
description: One-time setup - capture the founder brief and write .palatos/ company state.
argument-hint: [optional one-line description of the company/goal]
---

# /onboard

Set up PALATOS for this repo by capturing the founder brief that every agent reads.

**Seed (optional):** $ARGUMENTS

## Do this
1. **Interview briefly** - ask the user for (batch the questions, keep it short):
   - **Mission** - what are we building, in one sentence?
   - **North-star metric** - the single number that means success.
   - **Industry / audience** - domain and who it's for.
   - **Constraints** - budget, timeline, compliance, tech preferences.
   - **Brand** - name, voice, any non-negotiables.
   - **Gate posture** - `default` or `strict` (strict gates more actions).
   If the seed above already answers some, confirm rather than re-ask.
2. **Write state** - create the `.palatos/` directory in the repo and write, per the `palatos:autonomous-loop` state schema:
   - `company.md` (the founder brief, from the answers)
   - `roadmap.md`, `backlog.md`, `metrics.md`, `learnings.md`, `gates.md` (skeletons)
   - `state.json` (initial machine state)
   - `decisions/` (empty)
3. **Confirm** - show the user the written `company.md` and tell them they can edit it anytime; it is the source of truth.

## Report back
Summarize the captured brief and point the user to `/palatos:company-run` (autopilot) or `/palatos:plan-project` (directed).
