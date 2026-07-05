---
name: data-viz
description: Build charts, dashboards, and stat displays that read as one coherent, accessible system in light and dark - right chart for the data, validated color, clear encoding. Use before writing any chart/graph/dashboard code.
---

# data-viz - charts that read as one system

The promise: visualizations that communicate the insight instantly, use a validated and accessible color system, and look consistent across every chart in the product - in both light and dark.

## When to use / when NOT
- **Use**: any chart, graph, plot, dashboard, KPI tile, sparkline, or heatmap, in any medium.
- **Not**: general UI styling (that's `palatos:visual-design`).

## Inputs
- The data (shape, cardinality, ranges) and the single question each chart must answer.

## Method
1. **State the message** - one sentence per chart: what should the viewer conclude? Design to that.
2. **Choose the form by data type** (decision heuristic):
   - trend over time → line/area; comparison across categories → bar; part-to-whole → stacked bar / treemap (avoid pie >4 slices); distribution → histogram/box; correlation → scatter; relationship over 2 dims → heatmap. Match the mark to the question, not to novelty.
3. **Encode honestly** - start bars at zero; one encoding per variable; label directly over legends where possible; sort meaningfully.
4. **Color with a system** - categorical: a fixed, distinguishable, colorblind-safe set (validate distinctness); sequential/diverging: perceptually-uniform ramps. Reuse the same series→color mapping across all charts.
5. **Validate the palette (runnable check, not eyeballing)** - verify every series color meets WCAG contrast against the background AND every pair stays distinguishable under color-vision deficiency. Run the concrete check in `references/palette-check.md` (WCAG contrast-ratio formula + deuter/protanopia simulation) and adjust until it passes. Never rely on color alone (add labels/patterns).
6. **Design light AND dark** - swap surface + gridline + text tokens deliberately; verify legibility in both.
7. **Reduce chart junk** - thin/soft gridlines, no 3-D, no heavy borders, restrained ink; the data is the hero.
8. **Add interaction only if it earns it** - tooltips for precise reads, not decoration.

## Output contract
```
DATA-VIZ - <chart/dashboard>
message: <one line per chart>
form: <chart type> - why
encoding: <axes, marks, zero-baseline, sort>
color: <categorical set / ramp> - validated: <contrast + CVD-safe: pass>
theming: <light + dark verified>
a11y: <not color-only; labels/direct-labeling>
```

## Quality bar
- Right chart for the data; message readable in <5 seconds.
- One consistent color system across all charts.
- Colorblind-safe + adequate contrast, validated - not assumed.
- Legible in light and dark.

## Self-check rubric
- [ ] Does each chart answer one clear question?
- [ ] Is the palette validated distinct + CVD-safe + contrast-OK?
- [ ] Bars start at zero; encodings honest?
- [ ] Light + dark both legible; not color-only?

## Anti-patterns
- Pie charts with many slices; dual y-axes; truncated bar baselines.
- A new color scheme per chart; color as the only signal.
- 3-D, heavy gridlines, decorative chart junk.
- Dark mode that leaves gridlines/text unreadable.
