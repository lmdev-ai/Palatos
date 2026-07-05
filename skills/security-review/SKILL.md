---
name: security-review
description: Threat-model and secure-code review with STRIDE + OWASP mapping, exploitability rating, and remediation-first output. Use when assessing a change or system for security risk before it ships. Defensive/authorized use only.
---

# security-review - model the threat, rate the risk, ship the fix

The promise: a security assessment that names real, exploitable weaknesses mapped to a recognized taxonomy, rated by exploitability, each paired with the fix - not a checklist of theoretical worries.

## When to use / when NOT
- **Use**: reviewing code/architecture/config for vulnerabilities; part of the `/palatos:ship` gate.
- **Not**: live offensive testing of a running target (that's `palatos:api-security` recipes, and requires authorization; a full offensive engagement ships in PALATOS Pro).

## Inputs
- The change/system, its trust boundaries, and what data/assets it handles.

## Method
1. **Map assets & trust boundaries** - what is worth protecting, where does untrusted input cross into trusted code?
2. **Threat-model with STRIDE** - for each boundary consider Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.
3. **Check the OWASP hot spots** - injection, broken auth, broken access control (incl. IDOR/BOLA), cryptographic failures, SSRF, insecure deserialization, secrets in code, vulnerable dependencies, misconfiguration.
4. **Confirm exploitability** - for each candidate, describe a concrete attack path. Rate: Critical / High / Medium / Low by (impact × ease). Drop the merely theoretical.
5. **Prioritize remediation** - fix highest exploitability first; give the concrete fix (parameterize, enforce authz check, rotate/lift secret, pin dependency, validate input).
6. **Verify the fix closes the path** - re-trace the attack after the fix.

## Output contract
```
SECURITY REVIEW - <scope>  (gate: PASS | BLOCK)
1. [CRITICAL] <STRIDE/OWASP class> - <weakness> @ <file:line>
   attack: <concrete exploit path>
   fix: <concrete remediation>
2. [HIGH] ...
secrets/deps: <findings or clean>
verdict: <ship-safe | blocked on items 1..n>
```

## Quality bar
- Every finding maps to STRIDE/OWASP and has a concrete attack path.
- Exploitability rating is honest; no crying-wolf on unreachable issues.
- Remediation-first: a finding without a fix is incomplete.

## Self-check rubric
- [ ] Did I map trust boundaries before hunting?
- [ ] Does each finding have a real attack path + rating?
- [ ] Did I check secrets + dependencies?
- [ ] Did I give a concrete fix and re-trace it?

## Anti-patterns
- Generic "add more validation" advice with no specific vector.
- Rating everything critical (or nothing).
- Flagging theoretical issues with no reachable attack path.
- Reviewing offense against systems without authorization.
