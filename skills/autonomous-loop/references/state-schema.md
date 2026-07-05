# `.palatos/` state schema

The company's persistent memory and machine state, stored in the **target repo** (not the plugin). Created at first `/palatos:onboard` or `/palatos:company-run`. Human-readable Markdown for everything the user edits; JSON only for machine state.

## Files

### `company.md` (founder brief - user-owned source of truth)
```
# Company
mission: <one sentence>
north-star: <the single metric that defines success>
industry: <domain>
constraints: <budget, timeline, compliance, tech constraints>
brand: <name, voice, non-negotiables>
gate-policy: <default | strict>   # strict = more actions gated
budget: <ceiling + what counts as spend>
```

### `roadmap.md`
Phased plan: `## Now`, `## Next`, `## Later`, each a short list of objectives. Owned by strategist + PM.

### `backlog.md`
Prioritized objective queue, highest first:
```
- [ ] <objective> - priority:<P0..P3> - depends-on:<none|id> - owner:<agent/pod>
```

### `metrics.md`
Append-only readings:
```
## <date>
- north-star: <value> (Δ vs last)
- <kpi>: <value>
```

### `learnings.md`
Append-only durable memory (see `memory-protocol.md`).

### `gates.md`
Queue of `GATE-<n>` entries (format in `palatos:company-os` → gates reference).

### `decisions/ADR-<n>-<slug>.md`
One file per architectural / irreversible decision: context, decision, alternatives, consequences.

### `state.json` (machine state - do not hand-edit during a run)
```json
{
  "version": 1,
  "cycle": 7,
  "run_started": "2026-07-05T09:00:00Z",
  "current_objective": "add-health-check-endpoint",
  "phase": "VERIFY",
  "assignments": { "backend-engineer": "endpoint", "qa-engineer": "test" },
  "resume_point": "VERIFY: awaiting qa result",
  "open_gates": ["GATE-3"],
  "cycles_without_progress": 0,
  "max_cycles": 25
}
```

## Consistency rule
`state.json` is written at the end of every cycle (and at each phase transition within a cycle when practical). On resume, read `state.json` first, then reconcile against the Markdown files. If they disagree, the Markdown deliverables are ground truth for *what exists*; `state.json` is ground truth for *where the loop was*.
