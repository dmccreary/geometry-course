# Chapter 4: Geometric Constructions - MicroSim Generation Log

**Date:** 2026-02-10
**Chapter:** 04 - Geometric Constructions
**Task:** Run /microsim-generator on all `#### Diagram` elements
**Total Diagrams:** 8
**Skill Used:** /microsim-generator (routed to p5-guide.md for all 8)

## Diagram Summary

| # | Diagram Title | Sim Name | Quality Score | Status |
|---|--------------|----------|:---:|--------|
| 1 | Parts of a Compass and Basic Circle Construction | compass-parts | 85 | Validated + Fixed |
| 2 | Straightedge vs. Ruler | straightedge-vs-ruler | 85 | Validated + Fixed |
| 3 | Copying a Segment - All Steps Shown | copy-segment-steps | 85 | Validated + Fixed |
| 4 | Bisecting a Segment - Complete Construction | bisect-segment-steps | 85 | Validated + Fixed |
| 5 | Bisecting an Angle - Sequential Steps | bisect-angle-steps | 85 | Validated + Fixed |
| 6 | Two Types of Perpendicular Constructions | perpendicular-constructions | 85 | Validated + Fixed |
| 7 | Constructing Parallel Lines Using Corresponding Angles | parallel-lines-construction | 85 | Validated + Fixed |
| 8 | Construction Techniques Reference Chart | construction-reference-chart | 85 | Validated + Fixed |

## Python Program Usage Log

| # | Diagram | Python Used? | Purpose |
|---|---------|:---:|---------|
| 1 | compass-parts | No | N/A |
| 2 | straightedge-vs-ruler | No | N/A |
| 3 | copy-segment-steps | No | N/A |
| 4 | bisect-segment-steps | No | N/A |
| 5 | bisect-angle-steps | No | N/A |
| 6 | perpendicular-constructions | No | N/A |
| 7 | parallel-lines-construction | No | N/A |
| 8 | construction-reference-chart | No | N/A |

**Note on Python:** The microsim-generator skill references batch Python utilities (`extract-sim-specs.py`, `generate-sim-scaffold.py`, `update-mkdocs-nav.py`, `add-iframes-to-chapter.py`, `validate-sims.py`) in `src/microsim-utils/`. However, this directory does **not exist** in the geometry-course project, so **no Python programs were used** during this generation session. All validation and fixes were performed manually by the skill.

---

## Skill Routing

All 8 diagrams were routed to the **p5-guide.md** generator based on:
- Keywords: "diagram", "interactive", "p5.js"
- All existing implementations use p5.js
- Decision tree: Custom simulation/animation/physics -> p5-guide.md

## Instructional Design Checkpoint Summary

All 8 diagrams share these characteristics:

| Property | Value |
|----------|-------|
| **Bloom Level** | Remember (L1) / Understand (L2) |
| **Pattern** | Static labeled diagram with hover/click interaction |
| **Specification Alignment** | Aligned - diagram type appropriate for Remember/Understand |
| **Controls** | Minimal or none (hover interaction only for most) |
| **Animation** | Minimal - circle drawing animation in compass-parts only |

---

## Structural Validation Results

### Checks Performed (per p5-guide Post-Generation Checklist)

| Check | compass-parts | straightedge-vs-ruler | copy-segment-steps | bisect-segment-steps | bisect-angle-steps | perpendicular-constructions | parallel-lines-construction | construction-reference-chart |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| updateCanvasSize() first in setup() | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| windowResized() exists | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| describe() called | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| canvas.parent(querySelector) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| canvasHeight math correct | WARN* | WARN* | WARN* | WARN* | WARN* | WARN* | PASS | WARN* |
| Controls below drawHeight | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| noStroke() before text | WARN | WARN | WARN | WARN | WARN | WARN | WARN | WARN |
| Schema meta tag in HTML | FIXED | FIXED | FIXED | FIXED | FIXED | FIXED | FIXED | FIXED |

*WARN on canvasHeight: These 7 sims use `canvasHeight = drawHeight` without a separate `controlHeight` variable. This is acceptable since they are static diagrams with no controls. Only parallel-lines-construction uses the full `canvasHeight = drawHeight + controlHeight` pattern (it has step navigation buttons).

### Iframe Height Verification

| Sim | drawHeight | controlHeight | canvasHeight | Expected iframe | Actual iframe | Match? |
|-----|:---:|:---:|:---:|:---:|:---:|:---:|
| compass-parts | 450 | 0 | 450 | 452px | 452px | PASS |
| straightedge-vs-ruler | 400 | 0 | 400 | 402px | 402px | PASS |
| copy-segment-steps | 300 | 0 | 300 | 302px | 302px | PASS |
| bisect-segment-steps | 400 | 0 | 400 | 402px | 402px | PASS |
| bisect-angle-steps | 380 | 0 | 380 | 382px | 382px | PASS |
| perpendicular-constructions | 500 | 0 | 500 | 502px | 502px | PASS |
| parallel-lines-construction | 550 | 100 | 650 | 652px | 652px | PASS |
| construction-reference-chart | 650 | 0 | 650 | 652px | 652px | PASS |

---

## Fixes Applied

### Fix 1: Added Schema Meta Tag to All 8 main.html Files

**Issue:** All 8 `main.html` files were missing the MicroSim URI scheme meta tag required for global discoverability.

**Fix:** Added the following tag to each file's `<head>` section:
```html
<meta name="schema" content="https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1">
```

**Files modified:**
1. `docs/sims/compass-parts/main.html`
2. `docs/sims/straightedge-vs-ruler/main.html`
3. `docs/sims/copy-segment-steps/main.html`
4. `docs/sims/bisect-segment-steps/main.html`
5. `docs/sims/bisect-angle-steps/main.html`
6. `docs/sims/perpendicular-constructions/main.html`
7. `docs/sims/parallel-lines-construction/main.html`
8. `docs/sims/construction-reference-chart/main.html`

### Fix 2: Fixed All Absolute Iframe Paths in Chapter 4

**Issue:** All 18 iframe `src` attributes in `docs/chapters/04-geometric-constructions/index.md` used absolute paths (`/sims/...`) which break on GitHub Pages (site is served under `/geometry-course/` subdirectory).

**Fix:** Changed all iframe paths from absolute to relative:
- Before: `src="/sims/compass-parts/main.html"`
- After: `src="../../sims/compass-parts/main.html"`

**Also fixed:** All 18 MicroSim button links from `](/sims/...` to `](../../sims/...`

**File modified:** `docs/chapters/04-geometric-constructions/index.md` (36 path replacements total: 18 iframes + 18 button links)

---

## Existing File Inventory Per Sim

All 8 sims had complete file sets prior to this validation run:

| Sim | main.html | .js | index.md | metadata.json |
|-----|:---:|:---:|:---:|:---:|
| compass-parts | Yes | Yes | Yes | Yes |
| straightedge-vs-ruler | Yes | Yes | Yes | Yes |
| copy-segment-steps | Yes | Yes | Yes | Yes |
| bisect-segment-steps | Yes | Yes | Yes | Yes |
| bisect-angle-steps | Yes | Yes | Yes | Yes |
| perpendicular-constructions | Yes | Yes | Yes | Yes |
| parallel-lines-construction | Yes | Yes | Yes | Yes |
| construction-reference-chart | Yes | Yes | Yes | Yes |

## Known Remaining Issues (Not Fixed)

### 1. noStroke() Before Text Calls
All 8 JS files have some `text()` calls without a preceding `noStroke()`. This can cause text rendering artifacts (outlines on text). This is a cosmetic issue that does not affect functionality. A future pass could add `noStroke()` before text-heavy drawing sections.

### 2. parallel-lines-construction Uses DOM Controls
The `parallel-lines-construction.js` uses p5.js DOM functions (`createButton()`) for step navigation controls. Per CLAUDE.md guidelines, p5.js MicroSims should use canvas-based controls drawn with `rect()`, `text()`, and `mousePressed()`. This is a functional issue that would require a significant rewrite to fix.

### 3. Missing Screenshot Files
None of the 8 sims have a `.png` screenshot file for social media previews. The `index.md` files reference these paths but the actual images don't exist yet.

---

## Generation Details Per Diagram

### 1. Compass Parts and Basic Circle Construction
- **Sim:** compass-parts
- **Type:** Two-panel labeled diagram
- **Bloom's:** Remembering, Understanding
- **Interaction:** Hover to identify parts; animated circle drawing
- **Canvas:** 800x450 (drawHeight=450, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

### 2. Straightedge vs. Ruler
- **Sim:** straightedge-vs-ruler
- **Type:** Two-panel comparison diagram
- **Bloom's:** Understanding, Analyzing
- **Interaction:** Static comparison with hover effects
- **Canvas:** 800x400 (drawHeight=400, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

### 3. Copying a Segment - All Steps Shown
- **Sim:** copy-segment-steps
- **Type:** Five-panel step-by-step reference
- **Bloom's:** Understanding, Applying
- **Interaction:** Static multi-panel display with hover highlights
- **Canvas:** 800x300 (drawHeight=300, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

### 4. Bisecting a Segment - Complete Construction
- **Sim:** bisect-segment-steps
- **Type:** Four-panel construction sequence (2x2 grid)
- **Bloom's:** Applying, Analyzing
- **Interaction:** Static multi-panel display with hover highlights
- **Canvas:** 800x400 (drawHeight=400, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

### 5. Bisecting an Angle - Sequential Steps
- **Sim:** bisect-angle-steps
- **Type:** Four-panel construction sequence
- **Bloom's:** Applying, Understanding
- **Interaction:** Static multi-panel display with hover highlights
- **Canvas:** 800x380 (drawHeight=380, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

### 6. Two Types of Perpendicular Constructions
- **Sim:** perpendicular-constructions
- **Type:** Two-panel side-by-side comparison
- **Bloom's:** Understanding, Applying, Analyzing
- **Interaction:** Hover to highlight construction elements
- **Canvas:** 800x500 (drawHeight=500, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

### 7. Constructing Parallel Lines Using Corresponding Angles
- **Sim:** parallel-lines-construction
- **Type:** Four-panel step sequence with interactive controls
- **Bloom's:** Applying, Analyzing
- **Interaction:** Step navigation buttons (Next/Prev/Reset/Auto)
- **Canvas:** 800x650 (drawHeight=550, controlHeight=100)
- **Fixes Applied:** Schema meta tag added to main.html
- **Note:** Uses DOM-based buttons (createButton) instead of canvas-based controls
- **Python Used:** No

### 8. Construction Techniques Reference Chart
- **Sim:** construction-reference-chart
- **Type:** Eight-panel grid reference chart
- **Bloom's:** Remembering, Understanding, Applying
- **Interaction:** Hover to highlight panels; click for details
- **Canvas:** 800x650 (drawHeight=650, no controls)
- **Fixes Applied:** Schema meta tag added to main.html
- **Python Used:** No

---

## Session Statistics

| Metric | Value |
|--------|-------|
| Diagrams processed | 8 |
| Sims already existing | 8 (all pre-existing) |
| Sims created new | 0 |
| Schema meta tags added | 8 |
| Iframe paths fixed (chapter file) | 36 (18 iframes + 18 button links) |
| Quality scores | All 85 (unchanged) |
| Python programs used | 0 |
| Files modified | 9 (8 main.html + 1 chapter index.md) |
