---
name: code-review
description: Adversarial code review that surfaces only real, high-confidence defects. Use when reviewing a diff, PR, or change before merge - produces severity-ranked findings with a concrete failure scenario each, filtered of false positives.
---

# code-review - find the real bugs, skip the noise

The promise: a review a senior engineer would sign - every finding is a real defect with a concrete way it fails, ranked by severity, with no style nitpicking dressed up as bugs.

## When to use / when NOT
- **Use**: reviewing a diff/PR/working change for correctness, security, and quality before it merges or ships.
- **Not**: writing tests (that's `palatos:verify`), or deep security assessment (that's `palatos:security-review` / `palatos:api-security`).

## Inputs
- The diff (preferred) or the changed files + what they should do.
- The acceptance criteria / intent of the change.

## Method
1. **Understand intent** - what is this change supposed to do? Review against that, not against your preferences.
2. **Trace the changed paths** - for each changed function, follow inputs → outputs, including error paths and edge cases (empty, null, boundary, concurrency, large input).
3. **Hunt the high-value bug classes** - off-by-one, wrong comparison operator, unhandled error/rejection, resource leak, injection, auth/authorization gaps, race conditions, incorrect state transitions, breaking API/schema changes.
4. **For each candidate, construct a failure scenario** - concrete inputs/state → wrong output/crash. If you cannot construct one, it is not a bug - drop it.
5. **Filter false positives** - remove anything that depends on a misreading, an unreachable path, or a "might be intentional." Verify the surrounding code before asserting.
6. **Rank** - order by severity (data loss/security > crash > wrong result > degraded > minor).
7. **Suggest the fix** - one concrete fix per finding.

## Output contract
```
REVIEW - <scope>  (verdict: block | approve-with-fixes | approve)
1. [CRITICAL] <file:line> - <defect>
   fails-when: <concrete inputs/state → wrong outcome>
   fix: <one concrete change>
2. [HIGH] ...
(no findings → "No blocking defects found; <n> paths traced.")
```

## Quality bar
- Every finding has a real failure scenario. Zero style-only comments unless asked.
- Severity is honest - not everything is critical.
- False-positive rate near zero: a reviewer's credibility dies on the first wrong "bug."

## Self-check rubric
- [ ] Does each finding name a concrete input/state that breaks it?
- [ ] Did I drop everything I couldn't construct a failure for?
- [ ] Did I verify the surrounding code (not just the diff line)?
- [ ] Is the ranking by real severity?

## Anti-patterns
- Nitpicking formatting/naming as if it were a bug.
- "This could be a problem" with no demonstrated failure.
- Reviewing against personal taste instead of the change's intent.
- Flagging without proposing a fix.
