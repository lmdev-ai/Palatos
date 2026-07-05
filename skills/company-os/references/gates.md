# Gates - the gated-autonomy protocol

PALATOS is autonomous for everything reversible and gated for everything a human must own. This file defines how a gate is raised, queued, and cleared.

## The six gate classes

1. **Money** - purchases, paid signups, ad spend, billable infra.
2. **External deploy / publish** - prod deploy, store submission, package publish, public content.
3. **`git push` / remote writes** - anything that leaves the local working tree for a shared remote.
4. **Legal sign-off** - contracts, ToS/privacy going live, regulatory commitments.
5. **Red-team engagements** - offensive security testing; requires written authorization + defined scope.
6. **Destructive / irreversible** - data deletion, `DROP`, `rm -rf`, force-push, history rewrite.

## Raising a gate (what an agent does)

Do **not** perform the action. Instead append an entry to `.palatos/gates.md`:

```
### GATE-<n> - <short title>
- class: <money | deploy | push | legal | redteam | destructive>
- requested-by: <agent>
- action: <exact command or step that is blocked>
- why: <why it is needed now>
- reversible: <no | partially>
- how-to-approve: run `/palatos:gate approve GATE-<n>`
- status: PENDING
```

Then **pivot**: pick the next ungated item from `.palatos/backlog.md` and keep working. Never idle-wait on a human.

## Clearing a gate (what the human does)

`/palatos:gate` lists PENDING gates. `/palatos:gate approve GATE-n` (or `deny`) resolves one. On approval the responsible agent performs the exact queued action and marks it `DONE`; on denial it records the reason and removes the item from the critical path.

## Mechanical backstop

The `gate-guard` hook independently intercepts risky shell commands (push/deploy/publish/destructive/spend patterns) even if an agent forgets the prompt rule. Prompt rule + hook = defense in depth.
