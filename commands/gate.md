---
description: List or resolve gated actions awaiting human approval.
argument-hint: [approve|deny] [GATE-id]
---

# /gate

The human control surface for gated autonomy. Review and clear the actions PALATOS has queued for approval.

**Args:** $ARGUMENTS

## Do this
1. Read `.palatos/gates.md`. If it does not exist, tell the user to run `/palatos:onboard` first.
2. **No args** → list every `PENDING` gate: id, class (money/deploy/push/legal/redteam/destructive), requested-by, the exact action, why, and reversibility.
3. **`approve GATE-n`** → mark the gate approved, then have the responsible agent (or orchestrator) **perform the exact queued action** and mark it `DONE`. Report the result and its verification.
4. **`deny GATE-n`** → mark it denied; record the reason; remove it from the critical path and note the alternative the loop should take.
5. Never perform a gated action that is not explicitly approved here.

## Report back
The updated gate list (with statuses) and, for an approval, the outcome of the performed action.
