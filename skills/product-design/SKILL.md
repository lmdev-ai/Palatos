---
name: product-design
description: Design usable product UX - from job-to-be-done to flows, information architecture, wireframes, and clickable prototypes, with an accessibility gate and usability-heuristic review. Use when designing how a feature or product works for users.
---

# product-design - design that users get on the first try

The promise: a flow a first-time user completes without help, grounded in the real job they're trying to do, and passing accessibility + usability heuristics before a pixel is polished.

## When to use / when NOT
- **Use**: designing a feature's UX, flows, IA, screens, or prototype.
- **Not**: high-fidelity visual/brand styling (that's `palatos:visual-design`), or charts (that's `palatos:data-viz`).

## Inputs
- The user and their job-to-be-done; the objective + acceptance criteria; constraints (platform, existing patterns).

## Method
1. **Frame the JTBD** - "When <situation>, I want to <motivation>, so I can <outcome>." Design for that, not for features.
2. **Map the flow** - entry → steps → success state, plus the empty, error, and edge states. Minimize steps to value.
3. **Structure information (IA)** - group and label so the next action is always obvious; respect platform conventions and existing product patterns (reuse before invent).
4. **Wireframe** - low-fi layout of each screen: hierarchy, primary action per screen, content before chrome.
5. **Accessibility gate** - sufficient contrast, hit targets, keyboard/screen-reader path, no color-only meaning, clear focus order.
6. **Usability-heuristic review** - check against Nielsen heuristics (visibility of status, match to real world, user control, consistency, error prevention, recognition over recall, flexibility, minimalist, error recovery, help).
7. **Prototype the critical path** - enough fidelity to test the riskiest interaction.

## Output contract
```
PRODUCT DESIGN - <feature>
jtbd: <statement>
flow: <entry → … → success> (+ empty/error/edge states)
screens: <each screen: purpose + primary action + key elements>
a11y: <contrast/targets/keyboard/SR checks - pass/fixes>
heuristics: <notable passes/violations + fixes>
prototype: <critical path described or linked>
handoff-to: visual-design / frontend-engineer
```

## Quality bar
- Every screen has one obvious primary action.
- Empty/error/edge states are designed, not afterthoughts.
- Passes the accessibility gate - non-negotiable.
- Minimum steps to value; no dead ends.

## Self-check rubric
- [ ] Is the design tied to a real JTBD?
- [ ] Are empty/error/edge states covered?
- [ ] Does it pass contrast/keyboard/screen-reader checks?
- [ ] Did I reuse existing patterns before inventing?

## Anti-patterns
- Designing screens without the flow that connects them.
- Ignoring empty/error states until engineering hits them.
- Color-only signaling; tiny hit targets; no keyboard path.
- Inventing a novel pattern where a familiar one works.
