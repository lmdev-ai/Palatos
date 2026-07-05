---
name: verify
description: Prove a change works by driving it end-to-end and observing behavior - not by assuming or by trusting that tests pass. Use before claiming any nontrivial change is done. Bans "should work."
---

# verify - observe it work, then claim it

The promise: nothing is called done until its real behavior has been exercised and observed. Kills the most common agent failure - claiming success that was never witnessed.

## When to use / when NOT
- **Use**: before marking any product/code change done; before a `── HANDOFF ── verified: yes`.
- **Not**: for pure docs/comment changes with no runtime surface (say so and skip).

## Inputs
- The change and the behavior it is supposed to produce.
- A way to run the affected flow (command, endpoint, screen, script).

## Method
1. **Identify the observable behavior** - what should now be true that wasn't? State it as a checkable claim.
2. **Pick the realest cheap signal** - drive the actual flow (call the endpoint, run the CLI, open the screen, execute the function with real inputs). Prefer the real path over a unit test that mocks it away.
3. **Exercise happy path + at least one edge/failure path** - confirm both the success and that failures behave correctly.
4. **Capture evidence** - the actual output/log/status you observed (quote it).
5. **Compare to expectation** - does observed == intended? If not, it is not done - fix and re-verify.
6. **Bootstrap if needed** - if the project has no way to run the flow, note the gap and set up the minimal harness; record it for reuse.

## Output contract
```
VERIFY - <change>
claim: <what should be true>
drove: <exact command/flow run>
observed: <actual output/evidence, quoted>
edge: <edge/failure path checked + result>
verdict: <VERIFIED | NOT VERIFIED: reason>
```

## Quality bar
- The evidence is real and quoted, not paraphrased or assumed.
- Both a success and a failure/edge path were exercised.
- "Tests pass" alone is never accepted as verification of behavior.

## Self-check rubric
- [ ] Did I drive the real flow, not a mock of it?
- [ ] Did I quote actual observed output?
- [ ] Did I check at least one edge/failure path?
- [ ] If I couldn't verify, did I say so plainly?

## Anti-patterns
- "Should work" / "looks correct" without running it.
- Treating a green typecheck or unit test as proof of end-to-end behavior.
- Claiming deployed/working for something only written.
