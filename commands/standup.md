---
description: Company status - done / in-progress / blocked / next, plus gates and metrics.
---

# /standup

Give a concise status report on the autonomous company.

## Do this
1. Read `.palatos/` state: `state.json`, `backlog.md`, `roadmap.md`, `metrics.md`, `gates.md`, and recent `learnings.md`.
2. If `.palatos/` does not exist, tell the user to run `/palatos:onboard` first.

## Report back (concise)
- **Shipped / done** - recent completed objectives.
- **In progress** - current cycle + objective + assignments.
- **Blocked** - anything waiting, especially **PENDING gates** (list them with their `/palatos:gate approve GATE-n` action).
- **Metrics** - latest north-star + key KPI readings vs target.
- **Next** - the next objective the loop will pick.
- **Recommended action for you** - the one thing the human should do now (usually: clear a gate).
