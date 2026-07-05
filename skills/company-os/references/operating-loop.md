# Operating loop - UNDERSTAND → PLAN → BUILD → VERIFY → SELF-REVIEW → HANDOFF

The detailed protocol behind the one-line loop in `SKILL.md`.

## UNDERSTAND
- Read the objective and its acceptance criteria. If ambiguous, resolve from `.palatos/company.md` and the repo `CLAUDE.md`; escalate only if still ambiguous.
- Read `.palatos/learnings.md` for prior decisions and known traps. Do not repeat a recorded mistake.
- Identify the single specialist/skill that owns this work. If more than one, it belongs to the orchestrator.

## PLAN
- Write the smallest plan that fully satisfies the acceptance criteria.
- List the files/artifacts you will touch and the verification you will run.
- Flag any step that will hit a gate; plan to queue it, not perform it.

## BUILD
- Load the relevant `palatos:<skill>` and follow its Method.
- Match the surrounding code/content conventions. Reuse before creating.

## VERIFY
- Drive the real behavior end-to-end (see `palatos:verify`). Capture evidence.
- For non-code work, check the output against the skill's Quality bar + Self-check rubric.

## SELF-REVIEW
- Attack your own output: what breaks it? What did you assume? What edge case did you skip?
- Fix what you find before handing off. A reviewer finding an obvious defect is a self-review failure.

## HANDOFF
- Emit the `── HANDOFF ──` block (`references/handoff-template.md`).
- Append a learning to `.palatos/learnings.md`.
