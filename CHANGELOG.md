# Changelog

All notable changes to PALATOS are documented here. Format: [Keep a Changelog](https://keepachangelog.com/); versioning: [SemVer](https://semver.org/).

## [0.1.0] - 2026-07-05

Initial release - PALATOS Free, the Autonomous Company OS.

### Added
- **Orchestration**: `palatos-orchestrator` + `palatos-strategist` (exec tier).
- **15 agents** across 8 tiers: Exec (2), Product (1), Design (2), Engineering (4), Quality (2), Security (2), Data (1), GTM (1).
- **11 first-party skills** (all `palatos:*`, self-contained, zero external dependency): `company-os`, `autonomous-loop`, `code-review`, `verify`, `security-review`, `api-security`, `product-design`, `visual-design`, `data-viz`, `copywriting`, `lean-comms`.
- **8 commands**: `/company-run`, `/onboard`, `/build-project`, `/plan-project`, `/standup`, `/ship`, `/roster`, `/gate`.
- **Autonomous OS loop**: SENSE → PLAN → BUILD → VERIFY → SHIP → MEASURE → LEARN, with persistent `.palatos/` company state (memory, backlog, metrics, gates, decisions) and crash-resumability.
- **Gated autonomy**: STOP-list enforced in every agent prompt and mechanically by the `gate-guard` PreToolUse hook (cross-platform Node; `.sh` + `.ps1` variants also shipped).
- **PALATOS Pro** (separate): +18 specialists (full design pod, mobile/data/ai engineers, offensive red+blue security wing, growth & monetization pod, ops/compliance/docs) + 6 advanced skills (`llm-engineering`, `cro`, `onboarding`, `pricing`, `product-marketing`, `seo`) + `/redteam` + industry packs + cloud state sync.
