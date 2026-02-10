# Session Log: Adding GeoWise Mascot Admonitions to Chapter 2

**Date:** 2026-02-10
**Goal:** Apply GeoWise mascot admonitions to Chapter 2 (Logic and Proof) following the style guide placement rules and voice guidelines.

## Context

Chapter 1 already had 5 mascot admonitions applied in a previous session. Chapter 2 had none. The style guide specifies:

- No more than 5-6 GeoWise admonitions per chapter
- Never place two GeoWise admonitions back-to-back
- Use GeoWise's voice: warm, patient, encouraging, 1-3 sentences, uses "we" for partnership

## Admonitions Added

### 1. `mascot-welcome` — Chapter Introduction

**Location:** After the "Introduction: The Language of Mathematical Reasoning" heading, before the detective analogy paragraph.

**Text:**
> Welcome to the world of logic and proof! In this chapter, we'll learn to think like detectives — building arguments so airtight that no one can dispute them. Let's get started!

**Rationale:** Standard chapter opening following the pattern established in Chapter 1.

### 2. `mascot-warning` — Truth Values of Conditional Statements

**Location:** After the truth table, before the counterexample about "If a shape has four sides, then it is a square."

**Text:**
> Many students expect a false hypothesis to make the whole conditional false — but it doesn't! A conditional is only false when the hypothesis is true and the conclusion is false. That single row in the truth table trips up almost everyone at first.

**Rationale:** The truth value of conditionals with false hypotheses is a well-known student misconception. Placing the warning right after the truth table reinforces the surprising result.

### 3. `mascot-thinking` — Contrapositive Equivalence

**Location:** Before the paragraph stating "The contrapositive is always logically equivalent to the original statement," in the Related Conditional Statements section.

**Text:**
> Here's the big insight: the contrapositive is ALWAYS logically equivalent to the original statement. If you ever struggle to prove something directly, try proving its contrapositive instead!

**Rationale:** The logical equivalence of the contrapositive is the single most important takeaway from the conditional statements section and is used repeatedly in proofs throughout the course.

### 4. `mascot-encourage` — Start of Proofs Section

**Location:** After the opening paragraph of "Proofs: Building Mathematical Arguments," before "There are several formats for organizing proofs."

**Text:**
> Proofs can feel challenging at first, and that's completely normal. Every mathematician started exactly where you are now. With practice, building proofs becomes as natural as solving equations.

**Rationale:** The transition from understanding logic to writing formal proofs is one of the most difficult conceptual jumps in geometry. Encouragement here acknowledges the difficulty honestly.

### 5. `mascot-tip` — Coordinate Proof Tips

**Location:** After the "Tips for Coordinate Proofs" heading, before the numbered list of tips.

**Text:**
> Always place one vertex at the origin and align a side along an axis. This simple trick eliminates zeros in your calculations and makes the algebra much cleaner!

**Rationale:** Strategic coordinate placement is the most practical and impactful tip for coordinate proofs. Highlighting it with the mascot ensures students remember this technique.

### 6. `mascot-celebration` — End of Chapter

**Location:** At the end of the chapter summary, after the "Key Skills Developed" list and before the closing paragraph about proofs being stories.

**Text:**
> You've mastered five different proof techniques — that's an incredible toolkit! From two-column to coordinate proofs, you now have the reasoning skills that power all of geometry. Onward!

**Rationale:** Standard chapter closing celebration, summarizing the accomplishment and building momentum for the next chapter.

## Spacing Verification

| # | Type | Approximate Line | Lines Between |
|---|------|-----------------|---------------|
| 1 | `mascot-welcome` | ~37 | — |
| 2 | `mascot-warning` | ~125 | ~88 lines |
| 3 | `mascot-thinking` | ~215 | ~90 lines |
| 4 | `mascot-encourage` | ~555 | ~340 lines |
| 5 | `mascot-tip` | ~1250 | ~695 lines |
| 6 | `mascot-celebration` | ~1490 | ~240 lines |

No two admonitions are back-to-back. All have substantial content separating them.

## File Modified

- `docs/chapters/02-logic-and-proof/index.md`
