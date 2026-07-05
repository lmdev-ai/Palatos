---
description: Pre-release gate - review + QA + security wing sign-off before shipping.
argument-hint: [optional scope, e.g. a feature or the current diff]
---

# /ship

Run the full pre-release gate. Security holds a hard veto - nothing ships with an unremediated Critical/High.

**Scope (optional):** $ARGUMENTS

## Do this
Obey `palatos:company-os`. Act as the `palatos-orchestrator` in THIS primary thread (a Claude Code subagent can't spawn subagents) and run the gate by fanning out these specialists directly via the Agent tool, in this order:
1. **Correctness/quality** - `palatos-code-reviewer` (uses `palatos:code-review`) and `palatos-qa-engineer` (uses `palatos:verify`) in parallel.
2. **Security** - `palatos-security-architect` chairs; `palatos-appsec-engineer` runs code + API security. *(The offensive red-team + blue-team remediation wing ships in PALATOS Pro.)*
3. **Verdict** - collect results. The security-architect issues PASS only if all Critical/High are remediated (re-verified). Otherwise BLOCK with the specific items.
4. The **actual deploy/publish is a GATE** - if the verdict is PASS, queue the release action to `.palatos/gates.md` for human approval; do not perform it.

## Report back
Review result · QA result · Security verdict (with any blocking items) · Overall go/no-go · The queued release gate (if go).
