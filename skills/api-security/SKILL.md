---
name: api-security
description: Test an API against the OWASP API Security Top 10 - authz (BOLA/BFLA), authn, injection, rate-limit, data exposure - with concrete test recipes and no external binary/tenant dependency. Authorized, in-scope testing only.
---

# api-security - OWASP API Top 10, tested and remediated

The promise: a running API assessed against the OWASP API Security Top 10 with reproducible test recipes and remediation - self-contained, no third-party scanner or tenant account required.

## When to use / when NOT
- **Use**: assessing a running API's security (authz, authn, input, exposure, rate limiting), before ship or as part of a red/blue engagement.
- **Not**: static code review only (that's `palatos:security-review`). Any testing requires the target to be owned or in written scope (authorized, in-scope targets only).

## Inputs
- Base URL + the API surface (OpenAPI spec if available), and **authorization/scope** to test it.
- At least two identities/roles (to test object- and function-level access).

## Method (OWASP API Top 10)
1. **Recon (OAS-driven where possible)** - enumerate endpoints, methods, params, and auth scheme. If an OpenAPI/Swagger spec exists, drive from it: list every operation, and flag **BOLA candidates** = paths with a resource-id placeholder (`{id}`, `{...Id}`, `{...Key}`, `{...Ref}`) on GET/PUT/PATCH/DELETE. Otherwise crawl. Then **establish a happy-path baseline** - confirm each target operation works with valid auth/data before abusing it, so failures are attributable to the attack, not a broken request.
2. **API1 BOLA (object-level authz)** - as user A, request user B's object IDs. Any success = broken object-level authorization.
3. **API2 Broken authn** - test missing/expired/tampered tokens, weak JWT (alg=none, weak secret), credential-stuffing exposure.
4. **API3 Property-level authz / excess data** - check responses for fields a role shouldn't see; check mass-assignment on writes.
5. **API4 Resource consumption** - no rate limit / pagination caps → send burst; confirm throttling.
6. **API5 BFLA (function-level authz)** - as a low-priv role, call admin/privileged functions.
7. **API6-10** - sensitive business-flow abuse, SSRF via URL params, misconfiguration (verbose errors, CORS `*`, missing security headers), unsafe API consumption, inventory (shadow/old versions).
8. **Rate & remediate** - Critical→Low; give the concrete fix (enforce per-object ownership check, validate token + alg, allow-list output fields, add rate limit, restrict CORS).

## Output contract
```
API SECURITY - <target>  (authorized: yes/scope-ref)  (gate: PASS | BLOCK)
API1 BOLA: <pass | FAIL: request X as user A returned user B data> - fix: <...>
API2 Authn: <...>
... (each of the Top 10)
findings ranked: [CRITICAL] ... [HIGH] ...
verdict: <ship-safe | blocked>
```

## Quality bar
- Authorization/scope confirmed before any request.
- Each FAIL includes the exact request that proves it and a concrete fix.
- BOLA and BFLA are always tested - they are the most common real API breaches.

## Self-check rubric
- [ ] Did I confirm the target is owned/in-scope first?
- [ ] Did I test both object- and function-level authz with two identities?
- [ ] Is each finding reproducible (exact request) with a fix?
- [ ] No production-impacting DoS (throttle tests are bounded)?

## Anti-patterns
- Testing a target without authorization/scope.
- Reporting a scanner dump instead of confirmed, reproducible findings.
- Skipping BOLA/BFLA because auth "looks fine."
- Unbounded load tests that harm a production system.
