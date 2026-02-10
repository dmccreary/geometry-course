# Session Log: Adding GeoWise Mascot Admonitions to Chapter 5

**Date:** 2026-02-10
**Goal:** Apply GeoWise mascot admonitions to Chapter 5 (Coordinate Geometry and Lines) following the style guide.

## Admonitions Added

### 1. `mascot-welcome` — Chapter Opening

**Location:** After the "Introduction to Coordinate Geometry" heading, before the opening paragraph about describing points with two numbers (line 31).

**Text:**
> Welcome to coordinate geometry! This is where algebra and geometry join forces, and I think you're going to love how powerful that combination is. Let's explore how two simple numbers can describe any point in the plane.

**Rationale:** Standard chapter-opening welcome. Sets a warm, enthusiastic tone for the chapter and frames the big idea (algebra meets geometry) in an accessible way.

### 2. `mascot-thinking` — Distance Formula Insight

**Location:** After the Distance Formula worked example (A(1,2) to B(4,6) = 5 units), just before the Midpoint Formula section (line 286).

**Text:**
> Did you notice? The distance formula is really just the Pythagorean theorem in disguise. Every time we find the distance between two points, we're secretly building a right triangle and calculating its hypotenuse.

**Rationale:** This is the key "aha" moment of the Distance Formula section. The connection to the Pythagorean theorem is mentioned in the body text, but calling it out with GeoWise reinforces this deep conceptual link after students have seen a concrete example.

### 3. `mascot-tip` — Midpoint Formula Memory Aid

**Location:** After the Midpoint Formula worked example (endpoints C(-2,5) and D(4,-1)), just before the Slope section (line 455).

**Text:**
> Think of the midpoint formula as "average, average." You're just averaging the x-coordinates and averaging the y-coordinates. If you can find the average of two numbers, you can find a midpoint!

**Rationale:** Practical study tip that simplifies memorization. Connecting the midpoint formula to the familiar concept of averaging reduces cognitive load and gives students a mnemonic they can rely on during tests.

### 4. `mascot-warning` — Zero vs. Undefined Slope

**Location:** After the slope interpretation list (positive, negative, zero, undefined), before the Four Types of Slope diagram (line 482).

**Text:**
> A common mistake is confusing zero slope with undefined slope. Remember: a **horizontal** line has zero slope (the rise is zero), but a **vertical** line has **undefined** slope (the run is zero, and we can't divide by zero).

**Rationale:** This is one of the most common student misconceptions in coordinate geometry. Placing the warning right after the four slope types are listed, before the visual diagram, helps students encode the distinction correctly from the start.

### 5. `mascot-thinking` — Perpendicular Slopes Insight

**Location:** After the perpendicular slopes examples and the special case note about horizontal/vertical lines, before the Perpendicular Lines diagram (line 1115).

**Text:**
> Here's a quick trick for finding perpendicular slopes: flip the fraction and change the sign. If a line's slope is 2/3, the perpendicular slope is -3/2. We call these "negative reciprocals," and their product is always -1.

**Rationale:** The negative reciprocal relationship is the key insight of the perpendicular lines section. Distilling it into a simple procedural trick ("flip and negate") makes it actionable, while reinforcing the product-equals-negative-one test.

### 6. `mascot-celebration` — Chapter Completion

**Location:** After the final paragraph of the Summary and Key Concepts section, before the "Next Steps" line (line 1556).

**Text:**
> You've connected algebra and geometry into one powerful toolkit! The distance formula, midpoint formula, slope, and line equations will be your trusted companions throughout the rest of this course. Be proud of how far you've come!

**Rationale:** Standard chapter-closing celebration. Reinforces the major achievement (bridging algebra and geometry) and names the specific tools students now command, building confidence for upcoming chapters.

## Spacing Verification

| # | Type | Approximate Line | Lines Between |
|---|------|-----------------|---------------|
| 1 | mascot-welcome | 31 | -- |
| 2 | mascot-thinking | 286 | ~255 |
| 3 | mascot-tip | 455 | ~169 |
| 4 | mascot-warning | 482 | ~27 |
| 5 | mascot-thinking | 1115 | ~633 |
| 6 | mascot-celebration | 1556 | ~441 |

No two admonitions are back-to-back. Between admonitions 3 and 4 (the closest pair), there is a full section heading ("Slope: Measuring Steepness"), the slope formula, its variable definitions, and the slope interpretation list -- substantial instructional content separating them.

## Admonition Type Summary

| Type | Count | Guideline Max |
|------|-------|---------------|
| mascot-welcome | 1 | 1 |
| mascot-thinking | 2 | 2-3 |
| mascot-tip | 1 | as needed |
| mascot-warning | 1 | as needed |
| mascot-celebration | 1 | 1 |
| mascot-encourage | 0 | as needed |
| **Total** | **6** | **5-6** |

## File Modified

- `docs/chapters/05-coordinate-geometry/index.md`
