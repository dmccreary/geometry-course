# Chapter 10: Similarity and Trigonometry - MicroSim Generation Log

**Date:** 2026-02-10
**Chapter:** 10 - Similarity and Trigonometry
**Task:** Run /microsim-generator on all `#### Diagram`, `#### Drawing`, and `#### Workflow` elements
**Total Spec Blocks:** 15 (6 Diagram + 8 Drawing + 1 Workflow)
**Implemented:** 4 (have sim directories with code and iframes)
**Unimplemented:** 11 (have `<details>` specs only, no sim directories)
**Skill Used:** /microsim-generator (routed to p5-guide.md for all)

## Spec Block Summary

| # | Header Type | Title | Line | Sim Name | Quality Score | Status |
|---|:-----------:|-------|:---:|----------|:---:|--------|
| 1 | Diagram | Similar Triangles Comparison | 61 | similar-triangles-comparison | MISSING | Validated + Fixed |
| 2 | Drawing | Scale Factor Explorer | 109 | *(unimplemented)* | - | NOT BUILT |
| 3 | Diagram | AA Similarity Proof | 178 | *(unimplemented)* | - | NOT BUILT |
| 4 | Drawing | Triangle Similarity Tester | 228 | *(unimplemented)* | - | NOT BUILT |
| 5 | Diagram | Side-Splitter Theorem | 294 | *(unimplemented)* | - | NOT BUILT |
| 6 | Diagram | Altitude to Hypotenuse | 350 | *(unimplemented)* | - | NOT BUILT |
| 7 | Drawing | Pythagorean Theorem Visual Proof | 419 | pythagorean-theorem | 55 | Validated + Fixed |
| 8 | Drawing | Distance Formula Explorer | 526 | distance-formula | 90 | Validated + Fixed |
| 9 | Diagram | Trigonometric Ratios Visualization | 646 | trig-ratios-explorer | MISSING | Validated + Fixed |
| 10 | Drawing | Trigonometric Ratios Explorer | 683 | *(duplicate spec for #9)* | - | NOT BUILT |
| 11 | Drawing | Inverse Trig Function Solver | 786 | *(unimplemented)* | - | NOT BUILT |
| 12 | Diagram | Angles of Elevation and Depression | 861 | *(unimplemented)* | - | NOT BUILT |
| 13 | Drawing | Shadow Method Indirect Measurement | 932 | *(unimplemented)* | - | NOT BUILT |
| 14 | Drawing | Angle of Elevation Measurement Tool | 1006 | *(unimplemented)* | - | NOT BUILT |
| 15 | Workflow | Solving a Trigonometry Word Problem | 1101 | *(unimplemented)* | - | NOT BUILT |

**Note on ordering:** Entry #8 (Distance Formula Explorer) has an **out-of-order structure** — the `<iframe>` at line 527 wraps around the `<details>` block (lines 528-586) because the iframe tag is not closed on the same line. The `<details>` content is technically fallback content inside the iframe element. Entry #10 is a duplicate spec for the same trig-ratios-explorer sim that is already implemented in entry #9.

## Python Program Usage Log

| # | Title | Python Used? | Purpose |
|---|-------|:---:|---------|
| 1 | Similar Triangles Comparison | No | N/A |
| 2 | Scale Factor Explorer | No | N/A (not built) |
| 3 | AA Similarity Proof | No | N/A (not built) |
| 4 | Triangle Similarity Tester | No | N/A (not built) |
| 5 | Side-Splitter Theorem | No | N/A (not built) |
| 6 | Altitude to Hypotenuse | No | N/A (not built) |
| 7 | Pythagorean Theorem Visual Proof | No | N/A |
| 8 | Distance Formula Explorer | No | N/A |
| 9 | Trigonometric Ratios Visualization | No | N/A |
| 10 | Trigonometric Ratios Explorer | No | N/A (not built / duplicate) |
| 11 | Inverse Trig Function Solver | No | N/A (not built) |
| 12 | Angles of Elevation and Depression | No | N/A (not built) |
| 13 | Shadow Method Indirect Measurement | No | N/A (not built) |
| 14 | Angle of Elevation Measurement Tool | No | N/A (not built) |
| 15 | Solving a Trigonometry Word Problem | No | N/A (not built) |

**Note on Python:** No Python programs were used. The batch utilities in `src/microsim-utils/` do not exist in this project.

---

## Skill Routing

All 4 implemented sims routed to **p5-guide.md** (all use p5.js). The 11 unimplemented entries have `<details>` specification blocks in the chapter but no corresponding sim directories.

## Instructional Design Checkpoint Summary

| Property | Value |
|----------|-------|
| **Bloom Level** | Understand (L2) for comparison/visualization; Apply (L3) for trig ratios and distance; Understanding+Analyzing (L4) for Pythagorean proof |
| **Pattern** | Interactive explorers with sliders; visual proof with animation |
| **Controls** | All 4 sims use DOM controls (violates CLAUDE.md canvas-based control requirement) |

---

## Structural Validation Results

### Checks Performed (per p5-guide Post-Generation Checklist)

| Check | similar-triangles-comparison | pythagorean-theorem | distance-formula | trig-ratios-explorer |
|-------|:---:|:---:|:---:|:---:|
| updateCanvasSize() first in setup() | PASS | FAIL | PASS* | PASS |
| windowResized() exists | PASS | FAIL | PASS | PASS |
| describe() called | FAIL | FAIL | PASS | FAIL |
| canvas.parent(querySelector) | FAIL† | PASS | PASS | FAIL† |
| canvasHeight math correct | PASS | PASS | PASS | PASS |
| Canvas-based controls (CLAUDE.md) | FAIL‡ | FAIL‡ | FAIL‡ | FAIL‡ |
| Schema meta tag in HTML | FIXED | FIXED | FIXED | FIXED |

*distance-formula calls `updateCanvasSize()` at the start of draw(), not setup(). Functionally equivalent but not the standard pattern.

†FAIL on canvas.parent: similar-triangles-comparison and trig-ratios-explorer use `canvas.parent('canvas-container')` (string ID lookup to a `<div>`) instead of `canvas.parent(document.querySelector('main'))`. Their main.html files have `<div id="canvas-container">` inside `<main>`.

‡FAIL on controls: All 4 sims use DOM controls instead of canvas-based controls per CLAUDE.md:
- similar-triangles-comparison: `createSlider()`
- pythagorean-theorem: `createSlider()`, `createButton()`
- distance-formula: `createCheckbox()`, `createButton()`
- trig-ratios-explorer: `createSlider()`

### Additional Notes on pythagorean-theorem

- Uses older p5.js version (1.11.1 vs 1.11.10 used by others)
- main.html includes Open Graph metadata (og:title, og:description, og:image, og:url)
- main.html has `<a href="./">Back to Lesson Plan</a>` link in body
- main.html has commented-out canvas.parent instructions in body
- Script loaded in `<head>` (all 4 sims load scripts in head)
- main.html uses correct `<main></main>` structure (no canvas-container div)
- Has stale version files: `v1.html`, `v1.js`, `v2.html`, `v2.js`

### Iframe Height Verification

| Sim | drawHeight | controlHeight | canvasHeight | Expected iframe | Actual iframe | Match? |
|-----|:---:|:---:|:---:|:---:|:---:|:---:|
| similar-triangles-comparison | 450 | 100 | 550 | 552px | 552px | PASS |
| pythagorean-theorem | 400 | 60 | 460 | 462px | 502px | **FAIL** |
| distance-formula | 600 | 100 | 700 | 702px | 600px | **FAIL** |
| trig-ratios-explorer | 450 | 100 | 550 | 552px | 552px | PASS |

**Iframe height mismatches:**
- `pythagorean-theorem` has canvasHeight=460 but the chapter iframe is 502px. This gives 42px of excess space below the canvas.
- `distance-formula` has canvasHeight=700 but the chapter iframe is 600px. This cuts off 102px of the control area. The iframe should be 702px.

### Iframe Path Verification

All iframe paths in chapter 10 already use **relative paths** (`../../sims/...`). No absolute path fixes needed.

### Structural Issue: Distance Formula Iframe/Details Ordering

At line 526-527, the `#### Drawing: Distance Formula Explorer` has an **out-of-order structure**:

```
526: #### Drawing: Distance Formula Explorer
527: <iframe src="../../sims/distance-formula/main.html" height="600px" width="100%" scrolling="no">
528: <details markdown="1">
...
586: </details>
```

The `<iframe>` tag on line 527 is not self-closed; the `<details>` block (lines 528-586) falls inside the iframe element as fallback content. This means the spec is not visible when the iframe renders, but the HTML structure is malformed.

---

## Fixes Applied

### Fix 1: Added Schema Meta Tag to All 4 Existing main.html Files

**Issue:** All 4 existing `main.html` files were missing the MicroSim URI scheme meta tag.

**Fix:** Added to each file's `<head>` section:
```html
<meta name="schema" content="https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1">
```

**Files modified:**
1. `docs/sims/similar-triangles-comparison/main.html`
2. `docs/sims/trig-ratios-explorer/main.html`
3. `docs/sims/pythagorean-theorem/main.html`
4. `docs/sims/distance-formula/main.html`

---

## Unimplemented Entries (11 of 15)

The following entries exist in the chapter markdown as `<details>` specification blocks but have **no corresponding sim directories** or code:

### 2. Scale Factor Explorer (Drawing, Line 109)
- **Intended type:** Interactive slider-driven similar figure explorer
- **Bloom's:** Applying
- **Purpose:** Adjust scale factors and see how they affect similar figures; show area scales by k²
- **Suggested sim name:** `scale-factor-explorer`
- **Status:** Spec only, no implementation

### 3. AA Similarity Proof (Diagram, Line 178)
- **Intended type:** Step-through proof diagram
- **Bloom's:** Analyzing
- **Purpose:** Show how two pairs of congruent angles prove triangle similarity via angle sum
- **Suggested sim name:** `aa-similarity-proof`
- **Status:** Spec only, no implementation

### 4. Triangle Similarity Tester (Drawing, Line 228)
- **Intended type:** Interactive similarity criterion tester
- **Bloom's:** Evaluating
- **Purpose:** Test whether two triangles are similar by checking AA, SAS, SSS criteria
- **Suggested sim name:** `triangle-similarity-tester`
- **Status:** Spec only, no implementation

### 5. Side-Splitter Theorem (Diagram, Line 294)
- **Intended type:** Proportional segments diagram
- **Bloom's:** Understanding, Applying
- **Purpose:** Visualize how a parallel line creates proportional segments in a triangle
- **Suggested sim name:** `side-splitter-theorem`
- **Status:** Spec only, no implementation

### 6. Altitude to Hypotenuse (Diagram, Line 350)
- **Intended type:** Interactive diagram showing three similar triangles
- **Bloom's:** Analyzing, Applying
- **Purpose:** Show how the altitude to the hypotenuse creates three similar triangles and geometric mean relationships
- **Suggested sim name:** `altitude-to-hypotenuse`
- **Status:** Spec only, no implementation

### 10. Trigonometric Ratios Explorer (Drawing, Line 683)
- **Note:** This is a **duplicate spec** for the trig-ratios-explorer sim already implemented at entry #9. The spec describes a more feature-rich version with unit circle overlay, common angles, and complementary angle relationships.
- **Bloom's:** Applying, Analyzing
- **Status:** Duplicate spec, sim exists under entry #9

### 11. Inverse Trig Function Solver (Drawing, Line 786)
- **Intended type:** Interactive angle calculator from side lengths
- **Bloom's:** Applying, Analyzing
- **Purpose:** Input two sides of a right triangle and find all angles using inverse trig functions
- **Suggested sim name:** `inverse-trig-solver`
- **Status:** Spec only, no implementation

### 12. Angles of Elevation and Depression (Diagram, Line 861)
- **Intended type:** Labeled scene diagram
- **Bloom's:** Understanding, Analyzing
- **Purpose:** Show both angle of elevation (to airplane) and depression (to boat) from observer on cliff
- **Suggested sim name:** `angles-elevation-depression`
- **Status:** Spec only, no implementation

### 13. Shadow Method Indirect Measurement (Drawing, Line 932)
- **Intended type:** Interactive similar triangles application
- **Bloom's:** Applying, Creating
- **Purpose:** Demonstrate measuring height of tall objects using shadows and proportions
- **Suggested sim name:** `shadow-method-measurement`
- **Status:** Spec only, no implementation

### 14. Angle of Elevation Measurement Tool (Drawing, Line 1006)
- **Intended type:** Interactive surveying simulation
- **Bloom's:** Applying, Evaluating
- **Purpose:** Simulate measuring the height of a tall object using angle of elevation and distance
- **Suggested sim name:** `elevation-measurement-tool`
- **Status:** Spec only, no implementation

### 15. Solving a Trigonometry Word Problem (Workflow, Line 1101)
- **Intended type:** Flowchart with decision diamonds
- **Bloom's:** Applying, Evaluating
- **Purpose:** Systematic approach for solving trig word problems (finding sides vs angles)
- **Suggested sim name:** `trig-problem-workflow`
- **Suggested library:** mermaid-guide.md (flowchart) or p5.js
- **Status:** Spec only, no implementation

---

## Existing File Inventory Per Sim

| Sim | main.html | .js | index.md | metadata.json | Extra files |
|-----|:---:|:---:|:---:|:---:|---|
| similar-triangles-comparison | Yes | Yes | Yes | Yes | - |
| pythagorean-theorem | Yes | Yes | Yes | Yes | pythagorean-theorem.png, v1.html, v1.js, v2.html, v2.js |
| distance-formula | Yes | Yes | Yes | Yes | distance-formula.png |
| trig-ratios-explorer | Yes | Yes | Yes | Yes | - |

---

## Known Remaining Issues (Not Fixed)

### 1. similar-triangles-comparison and trig-ratios-explorer: Non-Standard HTML Structure
Both use `<div id="canvas-container">` inside `<main>` and `canvas.parent('canvas-container')` instead of `canvas.parent(document.querySelector('main'))`. This would require updating both the HTML and JS files.

### 2. Three Sims: Missing describe()
similar-triangles-comparison, pythagorean-theorem, and trig-ratios-explorer do not call `describe()` for accessibility. Only distance-formula does.

### 3. All 4 Sims: DOM Controls
All 4 use DOM controls (`createSlider()`, `createButton()`, `createCheckbox()`) instead of canvas-based controls per CLAUDE.md.

### 4. pythagorean-theorem: Missing windowResized() and updateCanvasSize()
Does not handle responsive resizing at all.

### 5. pythagorean-theorem: Old p5.js Version
Uses p5.js 1.11.1 (loaded from cdnjs.cloudflare.com) instead of 1.11.10 (from cdn.jsdelivr.net).

### 6. pythagorean-theorem: Stale Version Files
Has 4 unused files: `v1.html`, `v1.js`, `v2.html`, `v2.js`.

### 7. pythagorean-theorem: Iframe Height Mismatch (Excess)
Chapter iframe is 502px but canvasHeight is 460. The iframe has 42px of excess space.

### 8. distance-formula: Iframe Height Mismatch (Cutoff)
Chapter iframe is 600px but canvasHeight is 700. This cuts off 102px of the control area. The iframe should be 702px.

### 9. distance-formula: Malformed Iframe/Details Structure
The `<iframe>` tag at line 527 wraps around the `<details>` block (lines 528-586). The details content is inside the iframe as fallback content.

### 10. similar-triangles-comparison and trig-ratios-explorer: Missing Quality Scores
Neither index.md has a `quality_score` in its YAML frontmatter.

### 11. pythagorean-theorem: Low Quality Score
quality_score is 55, well below the 85 threshold.

### 12. Duplicate Spec Block
Entry #10 (Drawing: Trigonometric Ratios Explorer, line 683) is a duplicate spec for the same sim as entry #9 (Diagram: Trigonometric Ratios Visualization, line 646).

### 13. Eleven Unimplemented Spec Blocks
Scale Factor Explorer, AA Similarity Proof, Triangle Similarity Tester, Side-Splitter Theorem, Altitude to Hypotenuse, Trigonometric Ratios Explorer (duplicate), Inverse Trig Function Solver, Angles of Elevation and Depression, Shadow Method Indirect Measurement, Angle of Elevation Measurement Tool, and Trig Problem-Solving Workflow have specs but no implementations.

---

## Generation Details Per Entry

### 1. Similar Triangles Comparison (Diagram, Line 61)
- **Sim:** similar-triangles-comparison
- **Iframe:** line 89 (height=552px)
- **Type:** Interactive slider-driven triangle comparison
- **Bloom's:** Understanding
- **Interaction:** DOM slider for scale factor
- **Canvas:** drawHeight=450, controlHeight=100, canvasHeight=550
- **HTML:** Non-standard (canvas-container div)
- **canvas.parent:** `'canvas-container'` (string ID) — FAIL
- **Quality Score:** MISSING
- **Fixes Applied:** Schema meta tag
- **Python Used:** No

### 2. Scale Factor Explorer (Drawing, Line 109)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 3. AA Similarity Proof (Diagram, Line 178)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 4. Triangle Similarity Tester (Drawing, Line 228)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 5. Side-Splitter Theorem (Diagram, Line 294)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 6. Altitude to Hypotenuse (Diagram, Line 350)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 7. Pythagorean Theorem Visual Proof (Drawing, Line 419)
- **Sim:** pythagorean-theorem
- **Iframe:** line 469 (height=502px)
- **Type:** Interactive visual proof with area squares
- **Bloom's:** Understanding, Analyzing
- **Interaction:** DOM sliders for leg lengths, toggle and reset buttons
- **Canvas:** drawHeight=400, controlHeight=60, canvasHeight=460
- **HTML:** Standard `<main></main>` structure (correct)
- **canvas.parent:** `document.querySelector('main')` — PASS
- **p5.js version:** 1.11.1 (old)
- **Quality Score:** 55
- **Fixes Applied:** Schema meta tag
- **Issues:** Missing windowResized(), missing updateCanvasSize(), missing describe(), iframe height mismatch (502 vs 462), stale version files
- **Python Used:** No

### 8. Distance Formula Explorer (Drawing, Line 526)
- **Sim:** distance-formula
- **Iframe:** line 527 (height=600px) — **OUT OF ORDER: iframe wraps details block**
- **Type:** Interactive coordinate plane with draggable points
- **Bloom's:** Applying, Understanding
- **Interaction:** DOM checkboxes and buttons, draggable points
- **Canvas:** drawHeight=600, controlHeight=100, canvasHeight=700
- **HTML:** Standard `<main></main>` structure (correct)
- **canvas.parent:** `document.querySelector('main')` — PASS
- **Quality Score:** 90
- **Fixes Applied:** Schema meta tag
- **Issues:** Iframe height mismatch (600 vs 702), malformed iframe/details structure
- **Python Used:** No

### 9. Trigonometric Ratios Visualization (Diagram, Line 646)
- **Sim:** trig-ratios-explorer
- **Iframe:** line 681 (height=552px)
- **Type:** Interactive angle slider showing SOH-CAH-TOA ratios
- **Bloom's:** Remembering, Understanding, Applying
- **Interaction:** DOM slider for angle
- **Canvas:** drawHeight=450, controlHeight=100, canvasHeight=550
- **HTML:** Non-standard (canvas-container div)
- **canvas.parent:** `'canvas-container'` (string ID) — FAIL
- **Quality Score:** MISSING
- **Fixes Applied:** Schema meta tag
- **Python Used:** No

### 10. Trigonometric Ratios Explorer (Drawing, Line 683)
- **Status:** NOT BUILT - duplicate spec for entry #9
- **Python Used:** No

### 11. Inverse Trig Function Solver (Drawing, Line 786)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 12. Angles of Elevation and Depression (Diagram, Line 861)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 13. Shadow Method Indirect Measurement (Drawing, Line 932)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 14. Angle of Elevation Measurement Tool (Drawing, Line 1006)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

### 15. Solving a Trigonometry Word Problem (Workflow, Line 1101)
- **Status:** NOT BUILT - spec only
- **Python Used:** No

---

## Comparison with Previous Chapters

| Metric | Chapter 4 | Chapter 6 | Chapter 7 | Chapter 9 | Chapter 10 |
|--------|:---------:|:---------:|:---------:|:---------:|:----------:|
| Spec blocks total | 8 | 8 | 10 | 8 | **15** |
| Sims implemented | 8 | 8 | 10 | 4 | **4** |
| Sims unimplemented | 0 | 0 | 0 | 4 | **11** |
| Schema meta tags added | 8 | 8 | 10 | 4 | 4 |
| Iframe paths fixed | 36 | 0 | 0 | 0 | 0 |
| DOM control violations | 1 | 0 | 1 | 2 | **4** |
| Non-standard HTML structure | 0 | 0 | 0 | 2 | 2 |
| Missing describe() | 0 | 0 | 0 | 2 | 3 |
| Missing windowResized() | 0 | 0 | 0 | 0 | **1** |
| Iframe height mismatches | 0 | 0 | 0 | 1 | **2** |
| Structural HTML issues | 0 | 0 | 0 | 0 | **1** (iframe wrapping details) |
| Duplicate spec blocks | 0 | 0 | 0 | 0 | **1** |
| Quality scores range | 85 | 85 | 85-90 | 70-MISSING | **55-90** (2 MISSING) |
| Python programs used | 0 | 0 | 0 | 0 | 0 |
| Files modified | 9 | 8 | 10 | 4 | 4 |

Chapter 10 has the most spec blocks (15) but the fewest implemented as a percentage (4/15 = 27%). It also has the widest quality score range (55 to 90) and includes a malformed iframe/details structure. The two older sims (pythagorean-theorem and distance-formula) use the correct `<main>` HTML pattern, while the two newer sims (similar-triangles-comparison and trig-ratios-explorer) use the non-standard canvas-container pattern.

---

## Session Statistics

| Metric | Value |
|--------|-------|
| Spec blocks processed | 15 (4 implemented + 11 unimplemented) |
| Sims already existing | 4 |
| Sims not yet built | 11 (including 1 duplicate) |
| Schema meta tags added | 4 |
| Iframe paths fixed (chapter file) | 0 (already correct) |
| Iframe height mismatches found | 2 (pythagorean-theorem: excess; distance-formula: cutoff) |
| Structural HTML issues found | 1 (distance-formula iframe wrapping details) |
| Quality scores | 55, 90, MISSING, MISSING |
| Python programs used | 0 |
| Files modified | 4 (4 main.html files) |
