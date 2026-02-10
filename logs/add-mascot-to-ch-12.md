# Session Log: Adding GeoWise Mascot Admonitions to Chapter 12

**Date:** 2026-02-10
**Goal:** Apply GeoWise mascot admonitions to Chapter 12 (Area, Volume, and Applications) following the style guide.

## Admonitions Added

### 1. `mascot-welcome` -- Chapter Opening
**Location:** After the introductory paragraph in the Introduction section (line 68)
**Text:**
> Welcome to the grand finale! We've built up a whole toolkit of geometric ideas, and now it's time to put them to work measuring real shapes in two and three dimensions. Let's dive in!

**Rationale:** Opens the chapter with GeoWise's warm, encouraging voice. Frames Chapter 12 as the culmination of the entire course, building excitement for the final set of topics.

### 2. `mascot-thinking` -- Polygon-to-Circle Connection
**Location:** In Part 2 (Circles), after the circle area formula (line 404)
**Text:**
> Here's an amazing connection: as a regular polygon gets more and more sides, it looks more and more like a circle. That means our polygon area formula gradually turns into the circle area formula. We can see one idea flowing into the next!

**Rationale:** Highlights the key "aha" moment at the transition from polygon area to circle area. This limiting relationship is one of the most elegant ideas in the chapter and connects Part 1 to Part 2.

### 3. `mascot-tip` -- Surface Area Memory Aid
**Location:** In Part 4 (Surface Area), after the sphere surface area formula (line 826)
**Text:**
> Notice that the sphere's surface area is exactly four times the area of a circle with the same radius. Try wrapping an orange with paper circles -- you'll need exactly four of them! Connecting formulas to physical objects makes them easier to recall.

**Rationale:** Provides a concrete, tactile memory aid for the sphere surface area formula. Students often struggle to remember $SA = 4\pi r^2$; the orange-wrapping analogy makes it tangible.

### 4. `mascot-warning` -- The One-Third Factor
**Location:** In Part 5 (Volume), just before Cavalieri's Principle (line 1049)
**Text:**
> A very common mistake is using $V = Bh$ for pyramids and cones instead of $V = \frac{1}{3}Bh$. Remember, a pyramid fills only one-third of the prism that surrounds it. Always ask yourself: does this solid taper to a point? If so, include the $\frac{1}{3}$ factor.

**Rationale:** Addresses the single most common computational error in this chapter. Placed right after the pyramid and cone volume formulas where students are most likely to confuse $Bh$ with $\frac{1}{3}Bh$.

### 5. `mascot-thinking` -- Scale and Biology
**Location:** In Part 6 (Applications), after the scale factor area/volume relationships (line 1532)
**Text:**
> This is why scale matters so much in nature. If you doubled every dimension of an animal, its weight (volume) would increase by $2^3 = 8$ times, but its bone cross-section (area) would only grow by $2^2 = 4$ times. The bones couldn't support the weight! Geometry explains real biology.

**Rationale:** Connects the abstract $k^2$ / $k^3$ scaling laws to a vivid real-world example. This "why giants can't exist" insight is a classic application of the square-cube law and demonstrates geometry's reach beyond pure math.

### 6. `mascot-celebration` -- Course Completion
**Location:** In the Looking Ahead section, after the Geometric Proof Portfolio paragraph (line 2264)
**Text:**
> From points and lines all the way to volumes and design challenges -- we've covered an incredible amount of geometry together. You should be proud of how far you've come. Take these skills with you; the world is full of shapes waiting to be understood!

**Rationale:** Celebrates the completion of the entire geometry course, not just Chapter 12. Placed at the emotional high point of the chapter's closing remarks to leave students with a sense of accomplishment.

## Spacing Verification

| # | Type | Approximate Line | Lines Between |
|---|------|-----------------|---------------|
| 1 | `mascot-welcome` | 68 | -- |
| 2 | `mascot-thinking` | 404 | 336 |
| 3 | `mascot-tip` | 826 | 422 |
| 4 | `mascot-warning` | 1049 | 223 |
| 5 | `mascot-thinking` | 1532 | 483 |
| 6 | `mascot-celebration` | 2264 | 732 |

All admonitions are separated by at least 223 lines of content. No two GeoWise admonitions appear back-to-back. Total count: 6 (within the 5-6 guideline).

## Type Distribution
- `mascot-welcome`: 1 (chapter opening) -- meets guideline of 1x
- `mascot-thinking`: 2 (key insights) -- meets guideline of 2-3x
- `mascot-tip`: 1 (practical advice) -- meets guideline of as-needed
- `mascot-warning`: 1 (common mistake) -- meets guideline of as-needed
- `mascot-celebration`: 1 (course completion) -- meets guideline of 1x

## File Modified
- `docs/chapters/12-area-volume-applications/index.md`
