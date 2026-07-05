# PALATOS - Autonomous Company OS

**PALATOS installs an AI company into any repo.** One orchestrator, 15 specialist agents, and 11 self-contained skills that take a software project - in any industry - from raw idea to a shipped, measured, continuously-improving product, with **gated autonomy**: it runs unattended and only pauses for the handful of decisions a human must own (spending money, deploying, publishing, legal sign-off, destructive actions).

> This is **PALATOS Free**. [**PALATOS Pro**](#palatos-pro) adds 18 more specialists (full design pod, mobile/data/AI engineers, the offensive red+blue security wing, the growth & monetization pod, ops/compliance/docs) + 6 advanced skills + industry packs + cloud state sync + support.

It is an **operating system**, not a one-shot builder. It runs a continuous loop, remembers what it learns in a persistent `.palatos/` state directory, and gets sharper every cycle.

```
 SENSE ▸ PLAN ▸ BUILD ▸ VERIFY ▸ SHIP ▸ MEASURE ▸ LEARN ▸ (loop)
```

---

## Install

```
/plugin marketplace add lmdev-ai/Palatos      # or a local path to this folder
/plugin install palatos@palatos
```

Then, in the repo you want the company to work on:

```
/palatos:onboard          # one-time: capture mission, north-star, constraints
/palatos:company-run      # boot the autonomous loop
```

> Every PALATOS command, agent, and skill is namespaced (`/palatos:*`, `palatos-*`, `palatos:*`), so it never collides with plugins you already have.

---

## Three ways to use it

| Mode | You do | PALATOS does |
|---|---|---|
| **Full autopilot** | `/palatos:company-run "<goal>"` | Interviews you once, then loops build → ship → measure → learn on its own, queuing gates. Wrap in `/loop` or `schedule` for nightly/continuous runs. |
| **Directed** | `/palatos:plan-project`, approve, then `/palatos:build-project` per objective | Runs the team automatically for each objective; you control the cadence. |
| **À la carte** | Ask for a single task ("design the pricing page", "pentest the auth flow") | Auto-routes to the right specialist - no orchestration overhead. |

**Daily rhythm:** `/palatos:standup` → `/palatos:gate` (approve/deny) → let it run. That is the whole human job.

---

## Commands

| Command | Purpose |
|---|---|
| `/palatos:company-run [goal]` | Boot the autonomous SENSE→…→LEARN loop from `.palatos/` state. |
| `/palatos:onboard` | One-time setup → writes `.palatos/company.md` (the founder brief). |
| `/palatos:build-project <brief>` | Single objective, end to end. |
| `/palatos:plan-project <brief>` | Strategy + roadmap only (no build). |
| `/palatos:standup` | Status: done / in-progress / blocked / next + gates + metrics. |
| `/palatos:ship` | Pre-release gate: review + QA + security sign-off (hard veto). |
| `/palatos:roster` | Print the team. |
| `/palatos:gate [approve\|deny] [id]` | The human control surface for queued gated actions. |

---

## The team (15 agents)

- **Exec** - orchestrator, strategist
- **Product** - product-manager
- **Design** - ux-designer, ui-designer
- **Engineering** - architect, backend, frontend, devops
- **Quality** - qa-engineer, code-reviewer
- **Security** - security-architect, appsec-engineer
- **Data** - data-analyst
- **GTM** - copywriter

Model tiering keeps it cost-efficient: `opus` for strategy/architecture/security, `sonnet` for build/execution.

---

## The 11 skills (all first-party, all `palatos:*`)

`company-os` · `autonomous-loop` · `code-review` · `verify` · `security-review` · `api-security` · `product-design` · `visual-design` · `data-viz` · `copywriting` · `lean-comms`

Each skill is a **deterministic procedure** - numbered method, fixed output contract, and a self-check rubric the agent must pass before claiming done. Every skill is self-contained, so a clean machine with only PALATOS installed can build a top-tier product with zero other plugins.

---

## PALATOS Pro

Free ships the whole autonomous loop and enough team to build, secure, and ship a software product. **Pro** is the full company:

| | Free | Pro |
|---|---|---|
| Agents | 15 | **33** |
| Skills | 11 | **17** |
| Design | ux + ui | full pod: design-director, ux-researcher, brand-designer |
| Engineering | architect, backend, frontend, devops | + mobile, data, ai |
| Security | design + appsec (defense) | + offensive **red-team & blue-team** wing |
| Growth / monetization | copywriter | + product-marketer, content-marketer, growth-engineer, sales, pricing-strategist |
| Ops / Compliance | - | finance, legal-compliance, customer-support, tech-writer |
| Advanced skills | - | `llm-engineering`, `cro`, `onboarding`, `pricing`, `product-marketing`, `seo` |
| Industry packs | - | fintech / healthcare / ecommerce / SaaS presets |
| Cloud `.palatos/` sync + dashboards | - | ✓ |
| Priority updates + support | - | ✓ |

Pro is a **drop-in upgrade** - same `/palatos:*` commands and `palatos-*` agents, so nothing you learn changes. → **[Get PALATOS Pro](https://github.com/lmdev-ai/Palatos#palatos-pro)**

---

## Gated autonomy - how it stays safe

PALATOS acts on its own for everything *reversible*. It **stops and asks** before anything you would want to sign off on:

- spending money · deploying or publishing externally · `git push`
- legal sign-off · red-team engagements · destructive / irreversible operations

This is enforced twice: written into every agent's operating contract **and** mechanically by the `gate-guard` hook, which intercepts risky shell commands. Blocked actions are queued to `.palatos/gates.md`; you clear them with `/palatos:gate approve`.

---

## Persistent state - `.palatos/` (in your repo)

| File | Holds |
|---|---|
| `company.md` | Mission, north-star, constraints, budget/gate policy (the founder brief). |
| `roadmap.md` / `backlog.md` | Phased plan + prioritized objective queue. |
| `state.json` | Machine state + resume point (crash-safe). |
| `metrics.md` | North-star + KPI readings over time. |
| `learnings.md` | Durable memory - decisions, wins, failures. This is how it gets smarter. |
| `gates.md` | Actions awaiting your approval. |
| `decisions/` | ADR records for architectural / irreversible calls. |

---

## Publishing your own copy

PALATOS is publish-ready. Push this folder to the public GitHub repo `lmdev-ai/Palatos` (already wired into `homepage`/`repository` in `.claude-plugin/plugin.json`) and others install it with `/plugin marketplace add lmdev-ai/Palatos`. Forking under a different owner? Update those two URLs and the `owner` in `marketplace.json` first.

## License

MIT - see [LICENSE](LICENSE).
