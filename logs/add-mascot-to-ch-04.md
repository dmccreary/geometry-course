# Session Log: Adding GeoWise Mascot Admonitions to Chapter 4

**Date:** 2026-02-10
**Goal:** Apply GeoWise mascot admonitions to Chapter 4 (Geometric Constructions) following the style guide placement rules and voice guidelines.

## Context

Chapters 1-3 already have mascot admonitions applied. Chapter 4 had none. The style guide specifies:

- No more than 5-6 GeoWise admonitions per chapter
- Never place two GeoWise admonitions back-to-back
- Use GeoWise's voice: warm, patient, encouraging, 1-3 sentences, uses "we" for partnership

## Admonitions Added

### 1. `mascot-welcome` — Chapter Introduction

**Location:** After the "Introduction to Geometric Constructions" heading, before the opening paragraph about creating perfect geometric figures.

**Text:**
> Welcome to geometric constructions! In this chapter, you'll create precise figures using only a compass and straightedge — the same two tools mathematicians have used for over 2,000 years. Let's build something beautiful!

**Rationale:** Standard chapter opening. Emphasizes the historical connection and the hands-on nature of constructions.

### 2. `mascot-tip` — Copying an Angle

**Location:** After the "Copying an Angle" heading, before the description of what copying an angle means.

**Text:**
> Copying an angle has more steps than copying a segment, but the key idea is the same: you're transferring a distance with the compass. The distance PQ captures the "opening" of the angle.

**Rationale:** Copying an angle is the first multi-step construction students encounter. The tip connects it to the simpler copying-a-segment technique they just learned, reducing cognitive load.

### 3. `mascot-thinking` — Perpendicular Bisector Equidistant Property

**Location:** In the Perpendicular Bisector section, before the statement of the equidistant property.

**Text:**
> Here's a beautiful fact: every single point on the perpendicular bisector is exactly the same distance from both endpoints. This one property is the key to many constructions and proofs ahead!

**Rationale:** The equidistant property of perpendicular bisectors is one of the most important geometric facts in the chapter and recurs throughout the course (triangle centers, circumscribed circles). Highlighting it ensures students recognize its significance.

### 4. `mascot-warning` — Two Types of Perpendicular Constructions

**Location:** After the "Constructing Perpendiculars" heading, before the description of the two construction types.

**Text:**
> There are two different perpendicular constructions, and mixing them up is a common mistake. Always check first: is the point ON the line or OFF the line? That tells you which method to use.

**Rationale:** Students frequently confuse the two perpendicular construction methods. The warning front-loads the critical distinction before students read the details.

### 5. `mascot-encourage` — The Impossible Constructions

**Location:** After "The Impossible Constructions" heading, before the list of the three famous problems.

**Text:**
> Don't be discouraged by "impossible" problems! Proving that something can't be done is actually one of the greatest achievements in mathematics. It took over 2,000 years — and led to entirely new branches of math.

**Rationale:** The concept of mathematical impossibility can feel discouraging or confusing. Reframing it as a triumph encourages students to appreciate the intellectual achievement.

### 6. `mascot-celebration` — End of Chapter

**Location:** After the final summary paragraph about construction skills, before the horizontal rule and "Next Steps" section.

**Text:**
> You've mastered the ancient art of compass and straightedge construction! These same techniques were used by Euclid himself. That's 2,000 years of mathematical tradition in your hands.

**Rationale:** Standard chapter closing. Connects the student's accomplishment to the historical tradition of Greek geometry, reinforcing the chapter's themes.

## Spacing Verification

| # | Type | Approximate Line | Lines Between |
|---|------|-----------------|---------------|
| 1 | `mascot-welcome` | ~34 | — |
| 2 | `mascot-tip` | ~316 | ~282 lines |
| 3 | `mascot-thinking` | ~503 | ~187 lines |
| 4 | `mascot-warning` | ~753 | ~250 lines |
| 5 | `mascot-encourage` | ~1447 | ~694 lines |
| 6 | `mascot-celebration` | ~1726 | ~279 lines |

No two admonitions are back-to-back. All have substantial content separating them.

## File Modified

- `docs/chapters/04-geometric-constructions/index.md`
