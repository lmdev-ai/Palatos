# Terse-commit mode

Loaded by `lean-comms` for commit messages. Dense, exact, Conventional Commits - why over what. Beats a generic terse-commit by being **convention-aware**: it reads the actual diff to derive type/scope AND detects and preserves the repository's required trailers instead of blindly stripping attribution.

## Subject line
- `<type>(<scope>): <imperative summary>` - `<scope>` optional.
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`.
- Imperative mood ("add", "fix", "remove" - not "added/adds/adding").
- ≤50 chars when possible, hard cap 72. No trailing period. Match the project's capitalization-after-colon convention.
- Derive `type`/`scope` from the diff (paths + change kind), not guesswork.

## Body (only when it adds signal)
- Skip entirely when the subject is self-explanatory.
- Add a body for: non-obvious **why**, breaking changes, migration/data notes, security fixes, reverts, linked issues.
- Wrap at 72 chars; bullets with `-`; reference issues at the end (`Closes #42`, `Refs #17`).
- Never restate what the diff shows ("This commit does X", "now", "currently", file names already implied by scope).

## Trailer convention (critical - do NOT strip attribution)
Detect and honor the repo/environment's commit-trailer convention rather than hardcoding "no AI attribution":
- Inspect recent history (`git log`) and any contributor/hook config for a required trailer pattern.
- **This environment requires every commit message to end with:**
  ```
  Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
  ```
  and PR bodies to end with the "Generated with Claude Code" line. Preserve these - terseness trims prose, never a required trailer.
- Use standard trailers for the rest: `Co-authored-by:` for pairs, `BREAKING CHANGE:` for breaks, `Closes/Refs #`.

## Auto-clarity (always include a body)
Breaking changes, security fixes, data migrations, and reverts always get a body - future debuggers need the why. Never compress these to subject-only.

## Examples
New endpoint, non-obvious why:
```
feat(api): add GET /users/:id/profile

Mobile client needs profile data without the full user payload
to cut LTE bandwidth on cold-launch screens.

Closes #128
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```
Breaking change:
```
feat(api)!: rename /v1/orders to /v1/checkout

BREAKING CHANGE: clients on /v1/orders must migrate to /v1/checkout
before 2026-06-01. Old route returns 410 after that date.
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

## Boundaries
- Generates the message only - does not stage, commit, amend, or push (the caller decides).
- Output as a ready-to-use message. "normal mode" → verbose commit style.
- Never bypass hooks or signing; never strip a required trailer to save characters.
