# Session Log: Adding GeoWise Mascot Icons to Admonitions

**Date:** 2026-02-10
**Goal:** Create a style guide for the GeoWise mascot, implement custom CSS admonitions with mascot icons, and apply them to Chapter 1.

## Steps Completed

### 1. Created Style Guide (`docs/learning-graph/style-guide.md`)

Analyzed the GeoWise mascot image (`docs/img/geowise.png`) and the learning-mascot reference skill to produce a comprehensive style guide covering:
- Character overview (name, species, personality, catchphrase, accessories)
- Color palette with 10 hex colors extracted from the image
- Personality and voice guidelines with tone-by-context examples
- Six admonition types with placement rules and frequency limits
- AI image prompt templates for generating consistent pose variants
- CSS implementation variables and color mapping
- CLAUDE.md integration block for chapter content generation

The user then generated all six GeoWise pose variants using an AI image generator and placed them in `docs/img/`.

### 2. Added Mascot CSS to `docs/css/extra.css`

Created six custom admonition styles: `mascot-welcome`, `mascot-thinking`, `mascot-tip`, `mascot-warning`, `mascot-celebration`, `mascot-encourage`.

### 3. Applied GeoWise to Chapter 1

Added 5 admonitions to `docs/chapters/01-foundations-of-geometry/index.md`:
- `mascot-welcome` at the Introduction
- `mascot-tip` before the midpoint formula
- `mascot-warning` before skew lines
- `mascot-thinking` at the Mathematical Reasoning section
- `mascot-celebration` at the chapter summary

### 4. Iterative CSS Refinement

This was the most involved part of the session. The icon positioning required many iterations:

#### Problem: Icon too small
- **Initial:** `--geowise-icon-size: 1.4em` — barely visible in the title bar
- **Fix:** Increased to `2em`, added padding to title bar to make it 30% taller

#### Problem: Title bar too tall when icon grew
- Doubled icon to `4em` but this inflated the title bar height
- **Fix:** Changed icon from `display: inline-block` to `display: block; position: absolute` so the icon is taken out of document flow and doesn't affect the title bar height
- Added `overflow: visible` on the title bar so the icon can extend beyond it

#### Problem: `position: relative` offsets had no effect
- Tried a shared CSS selector `[class^="mascot-"]` to nudge all icons at once
- **Root cause:** The attribute selector didn't match because MkDocs Material adds multiple classes to admonition elements
- **Fix:** Applied `position: relative; top/left` directly to each individual `::before` rule using `replace_all`

#### Problem: Diagonal purple band across the icon
- After switching to `position: absolute`, a diagonal purple stripe appeared across the GeoWise image
- **Root cause:** MkDocs Material sets `mask-image` (an SVG mask) on `.admonition-title::before` for its built-in admonition icons. Our CSS overrode the `content` and `background` properties but did NOT clear the mask, so the Material SVG mask was clipping our PNG image in a diagonal pattern
- **Fix:** Added `mask-image: none; -webkit-mask-image: none;` to every `::before` rule
- **Key lesson:** When overriding MkDocs Material's `::before` pseudo-elements on admonition titles, you MUST clear the `mask-image` property or it will clip your custom content

#### Problem: Overflow clipping
- Even with `overflow: visible` on the title bar, the admonition container was clipping the icon
- **Fix:** Added `overflow: visible` to the admonition container elements as well

#### Final positioning values after iterative tuning
```css
:root {
  --geowise-icon-size: 3.74em;
}
/* On each ::before */
position: absolute;
top: -5px;
left: 4px;
z-index: 2;
mask-image: none;
-webkit-mask-image: none;
background-color: transparent;

/* On each .admonition-title */
overflow: visible;
position: relative;
padding-left: 5em;

/* On each .admonition container */
overflow: visible;
```

### 5. Updated CLAUDE.md

Added a "Learning Mascot: GeoWise the Owl" section with character voice rules, admonition types table, placement rules, image file locations, CSS implementation notes (including the critical `mask-image: none` requirement), and example markdown usage.

## Key Lessons Learned

1. **MkDocs Material `mask-image` override is critical.** Material uses CSS masks on `::before` pseudo-elements for admonition icons. Custom admonitions MUST set `mask-image: none` or the mask will clip/distort custom images. This was the hardest bug to diagnose — it manifested as a mysterious diagonal purple band.

2. **Use `position: absolute` for oversized icons.** If the icon should be larger than the title bar, `inline-block` will inflate the bar height. Absolute positioning takes the icon out of flow, but requires `overflow: visible` on both the title and the admonition container.

3. **Attribute selectors like `[class^="mascot-"]` may not match** when elements have multiple classes (e.g., `class="admonition mascot-welcome"`). The `^=` selector checks the start of the entire attribute string. Use explicit class selectors or `[class*="mascot-"]` instead.

4. **Iterative visual tuning is normal.** Icon size and position required ~8 rounds of adjustment to get right. Using CSS variables (`--geowise-icon-size`) made size changes a single-line edit.

5. **5-6 mascot admonitions per chapter is the right density.** Enough to give the chapter personality without overwhelming the content. Never place two back-to-back.
