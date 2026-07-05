# Palette check - a runnable validation, not eyeballing

Two objective tests every categorical/series palette must pass before use. Run them (in code or by hand); adjust colors until green.

## 1. Contrast vs background (WCAG)

Relative luminance of an sRGB color `#RRGGBB`:

```
for each channel c in {R,G,B} (as 0..1):
    c_lin = c/12.92                     if c <= 0.03928
    c_lin = ((c+0.055)/1.055) ** 2.4    otherwise
L = 0.2126*R_lin + 0.7152*G_lin + 0.0722*B_lin
```

Contrast ratio between two colors: `(Llighter + 0.05) / (Ldarker + 0.05)`.

**Pass:** each series color vs the chart background ≥ **3:1** (non-text graphical objects). Text labels/legends vs their background ≥ **4.5:1**.

## 2. Distinctness under color-vision deficiency

The most common CVD is red-green (deuteranopia/protanopia, ~8% of men). Simulate each palette color, then confirm every PAIR is still tellable apart.

- Simplest robust check: compute the CIE ΔE (or just Euclidean distance in a perceptual space like CIELAB) between every pair of palette colors **after** applying a deuteranopia transform; require a minimum separation (ΔE ≳ 15 as a practical floor).
- Quick approximation without a color library: convert each color to grayscale luminance (above) and ensure adjacent series differ in luminance too - so they separate even with zero hue discrimination.

## 3. Belt-and-suspenders
Color is never the only signal: also use direct labels, distinct markers/dash patterns, or position. A palette that passes 1 + 2 and is backed by non-color encoding is safe in light and dark.

## Runnable snippet (Python, no deps beyond stdlib for contrast)

```python
def luminance(hexc):
    r,g,b = (int(hexc[i:i+2],16)/255 for i in (1,3,5))
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    R,G,B=f(r),f(g),f(b)
    return 0.2126*R+0.7152*G+0.0722*B

def contrast(a,b):
    la,lb=sorted((luminance(a),luminance(b)))
    return (lb+0.05)/(la+0.05)

# assert every series color clears 3:1 vs background
bg="#0b0e14"
for c in palette:
    assert contrast(c,bg)>=3.0, f"{c} fails contrast on {bg}"
```

Extend with a CVD-simulation library (e.g. `colorspacious`/`daltonize`) for test 2 when available.
