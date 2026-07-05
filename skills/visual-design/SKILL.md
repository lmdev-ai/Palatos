---
name: visual-design
description: Craft distinctive, production-grade visual UI - design tokens, type/color/space systems, motion, light+dark theming, pixel polish - that avoids generic AI aesthetics. Use when styling an interface to a high, branded bar.
---

# visual-design - distinctive, bold, polished, not generic

The promise: an interface that is **memorable** - a bold, intentional aesthetic point of view executed with token-level precision and full accessibility. Both refined-minimal and maximalist win; the enemy is the timid, generic default (centered card, purple gradient, Inter everywhere). The goal is intentionality, not intensity.

## When to use / when NOT
- **Use**: turning a wireframe/flow into high-fidelity UI; defining or applying a visual system; polishing an interface.
- **Not**: the flow/IA itself (that's `palatos:product-design`), or data charts (that's `palatos:data-viz`).

## Inputs
- The wireframe/flow, the brand direction (`palatos:` brand-designer or `company.md`), platform + tech.

## Method
1. **Commit to a BOLD direction first** - before styling, pick ONE clear aesthetic POV and go all-in: brutally-minimal, maximalist, retro-futuristic, editorial/magazine, luxury/refined, organic, industrial/utilitarian, art-deco/geometric, playful, brutalist/raw, etc. Name the **one thing someone will remember**. Vary across projects - never converge on the same look (or the same "safe" display font) every time.
2. **Set the tokens** - encode that direction as a system: a type scale (few sizes, clear hierarchy), a color system (a dominant color + sharp accents beats a timid even palette; neutrals + semantic states), an 8-pt spacing scale, radii, elevation. Everything derives from tokens.
3. **Distinctive typography** - this carries the aesthetic. **Avoid generic fonts** (Inter, Roboto, Arial, system defaults); pair a characterful **display** font with a refined **body** font. Tune scale, line-height, and measure; align to a baseline rhythm.
4. **Compose with intentional layout** - one clear focal point per view; rank with size/weight/space/color, not boxes-in-boxes. Use the direction's spatial language: asymmetry, overlap, diagonal flow, grid-breaking elements, and generous negative space OR controlled density - not the default centered stack.
5. **Atmosphere & depth** - create background interest instead of defaulting to flat fills where the aesthetic wants it: gradient meshes, noise/grain textures, geometric patterns, layered transparency, dramatic shadows, decorative borders/cursors - matched to the direction.
6. **Color + contrast** - commit to the palette cohesively; accessible contrast (WCAG AA+); meaning never on color alone; consistent across all states.
7. **High-impact motion** - invest in one well-orchestrated moment (e.g. a staggered page-load reveal with `animation-delay`) over scattered micro-fidgets; fast (150–250ms), eased; motion clarifies, plus a few surprise hover/scroll beats. Respect reduced-motion.
8. **Theming** - design light AND dark deliberately (not an inverted afterthought); verify both.
9. **Match code to vision** - maximalist directions need elaborate implementation (effects, animation); minimal directions need restraint and precise spacing/typography. Execute the vision fully - don't hold back.
10. **Pixel polish pass** - align edges, consistent spacing, optical adjustments, crisp assets, states (hover/focus/active/disabled) all styled.

## Output contract
```
VISUAL DESIGN - <surface>
direction: <the chosen aesthetic POV, one line>
tokens: <type scale / color roles / spacing / radius / elevation>
components: <key components styled + states>
motion: <where + durations/easing>
theming: <light + dark both verified>
a11y: <contrast + reduced-motion respected>
```

## Quality bar
- **Memorable** - a clear, bold aesthetic POV with one thing you remember; not template-default.
- Distinctive typography (no generic system fonts); dominant color with intentional accents.
- Consistent token use - no magic one-off values.
- Light and dark both first-class and verified.
- All interactive states styled; contrast passes AA; code complexity matches the vision.

## Self-check rubric
- [ ] Did I commit to ONE bold direction with a memorable signature - and not the safe default?
- [ ] Distinctive fonts (not Inter/Roboto/Arial/system) and a considered layout (not a centered stack)?
- [ ] Does everything derive from a token system, with real hierarchy per view?
- [ ] Are light + dark both deliberately designed, and does motion have one high-impact moment?
- [ ] Did I avoid the generic-AI tells below while keeping AA contrast + reduced-motion?

## Anti-patterns (the generic-AI tells to avoid)
- Centered card on a purple/blue gradient; everything equally weighted.
- Generic fonts (Inter, Roboto, Arial, system) or converging on the same "safe" display font every time.
- Timid, evenly-distributed palettes with no dominant color; flat fills where the aesthetic wants atmosphere.
- Predictable centered layouts with no asymmetry, overlap, or grid-breaking where the direction calls for it.
- Emoji as iconography; inconsistent spacing; 5 font sizes with no scale.
- Dark mode as a naive color inversion.
- Scattered micro-animations instead of one orchestrated moment; motion that decorates instead of clarifying; ignoring reduced-motion.
