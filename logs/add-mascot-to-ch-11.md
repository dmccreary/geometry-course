# Session Log: Adding GeoWise Mascot Admonitions to Chapter 11

**Date:** 2026-02-10
**Goal:** Apply GeoWise mascot admonitions to Chapter 11 (Circles) following the style guide.

## Admonitions Added

### 1. `mascot-welcome` — Chapter Opening
**Location:** After the horizontal rule and before "## Introduction to Circles" (line 43)
**Text:**
> Welcome to the world of circles! From spinning wheels to planetary orbits, circles are everywhere. We're going to explore their hidden geometry together, and I think you'll be amazed at how elegant these shapes really are.

**Rationale:** Sets a warm, inviting tone at the chapter opening. Connects circles to real-world examples to build curiosity before diving into definitions.

### 2. `mascot-thinking` — Inscribed Angle Theorem
**Location:** Just before the formal statement of the Inscribed Angle Theorem, after the definition of inscribed angles (line 230)
**Text:**
> An inscribed angle is always exactly half the central angle that opens to the same arc. Move the vertex anywhere on the circle and the inscribed angle stays the same -- try it in the sim below!

**Rationale:** The Inscribed Angle Theorem is the biggest "aha" moment in the chapter. Placing the admonition here highlights the insight before the formal equation and encourages students to verify it with the interactive simulation.

### 3. `mascot-warning` — Chord/Tangent/Secant Angle Formulas
**Location:** Inside "Relationships Between Chords, Tangents, and Angles" section, before listing the three formulas (line 484)
**Text:**
> These three angle formulas look similar but work differently. The chord-chord formula uses a *sum* of arcs, while the secant-secant formula uses a *difference*. Mixing them up is one of the most common mistakes on tests!

**Rationale:** Students commonly confuse the three angle-arc formulas because they all involve halving. Calling out the sum-vs-difference distinction addresses the most frequent error.

### 4. `mascot-tip` — Reading Circle Equations
**Location:** After the standard-form equation interactive and before the expanded-form discussion (line 831)
**Text:**
> To quickly read a circle's center from the standard equation, just flip the signs inside the parentheses. If you see $(x - 2)^2 + (y + 3)^2$, the center is $(2, -3)$. The plus-three becomes minus-three!

**Rationale:** The sign-flip trick is a practical study shortcut that prevents the most common algebra mistake when reading circle equations. Placed at the transition to completing the square, where sign handling becomes even more critical.

### 5. `mascot-encourage` — Before Practice Problems
**Location:** After the Summary section and before "### Practice Problems" (line 1139)
**Text:**
> This chapter covered a lot of ground -- from basic definitions all the way to coordinate equations. If some of the theorems feel tricky, that's completely normal. Work through the practice problems below, and each one will help lock the ideas in place.

**Rationale:** Chapter 11 is content-heavy with many theorems. Acknowledging the difficulty honestly while encouraging practice helps students persist rather than feel overwhelmed.

### 6. `mascot-celebration` — Chapter Closing
**Location:** After the "Next Steps" list, at the very end of the chapter (line 1181)
**Text:**
> You've mastered the geometry of circles! From radii and chords to coordinate equations, you now have a powerful toolkit. These ideas will come back again and again in advanced math and science.

**Rationale:** Celebrates completion of a dense chapter and reinforces that the material has lasting value beyond this course.

## Spacing Verification
| # | Type | Approximate Line | Lines Between |
|---|------|-----------------|---------------|
| 1 | mascot-welcome | 43 | -- |
| 2 | mascot-thinking | 230 | ~187 |
| 3 | mascot-warning | 484 | ~254 |
| 4 | mascot-tip | 831 | ~347 |
| 5 | mascot-encourage | 1139 | ~308 |
| 6 | mascot-celebration | 1181 | ~42 |

All admonitions have substantial content between them. No two are back-to-back. Total: 6 admonitions (within the 5-6 guideline).

## File Modified
- `docs/chapters/11-circles/index.md`
