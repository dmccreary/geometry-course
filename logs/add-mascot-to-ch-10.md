# Session Log: Adding GeoWise Mascot Admonitions to Chapter 10

**Date:** 2026-02-10
**Goal:** Apply GeoWise mascot admonitions to Chapter 10 (Similarity and Right Triangle Trigonometry) following the style guide.

## Admonitions Added

### 1. `mascot-welcome` -- Chapter Opening
**Location:** After the `## Introduction` heading, before the first paragraph of content.
**Text:**
> Welcome to one of geometry's most powerful chapters! We're going to discover how similarity and trigonometry let us measure things we can't even reach. Ready to unlock some mathematical superpowers?

**Rationale:** Sets an enthusiastic, welcoming tone for a chapter that covers two major geometry topics. Uses "we" for partnership and builds excitement about real-world applications.

### 2. `mascot-thinking` -- AA Similarity Insight
**Location:** After the AA Similarity explanation about why two angles are sufficient (line 174).
**Text:**
> Notice how AA Similarity only needs two angles, not three! Since a triangle's angles always add up to 180 degrees, the third angle is locked in automatically. That's one less thing we need to check.

**Rationale:** Highlights the key "aha" moment that AA works because the triangle angle sum constrains the third angle. This is a genuinely surprising insight for students encountering similarity criteria for the first time.

### 3. `mascot-tip` -- SOH-CAH-TOA Study Advice
**Location:** After the SOH-CAH-TOA mnemonic list, before the trigonometric ratios diagram (line 642).
**Text:**
> Write SOH-CAH-TOA on a sticky note and keep it in your notebook. Before solving any trig problem, first label the sides as opposite, adjacent, and hypotenuse relative to the angle you're working with. Getting the sides right is half the battle!

**Rationale:** Provides actionable study advice at the exact moment students learn the most important mnemonic in trigonometry. Emphasizes the practical step of labeling sides first, which is the most common source of errors.

### 4. `mascot-warning` -- Inverse Trig Notation Misconception
**Location:** In the Inverse Trigonometric Functions section, just before the note about the -1 notation (line 774).
**Text:**
> The notation sin^{-1} does NOT mean 1/sin! That superscript -1 means "inverse," not "reciprocal." It's one of the most common mistakes in trigonometry, so watch for it on tests!

**Rationale:** Addresses the single most common misconception with inverse trig notation. Placed right where the notation is introduced so students see the warning before they form a wrong mental model.

### 5. `mascot-encourage` -- Indirect Measurement (Bringing It All Together)
**Location:** In the Indirect Measurement section, after the introductory explanation, before the methods list (line 922).
**Text:**
> This is where everything we've learned comes together -- similarity, proportions, and trigonometry all working as a team. If it feels like a lot, take it one step at a time. Let's see how these tools solve real problems!

**Rationale:** Indirect measurement synthesizes all chapter concepts. Students may feel overwhelmed at this point, so encouragement and acknowledgment of difficulty is appropriate. Frames the content positively as "everything coming together."

### 6. `mascot-celebration` -- Chapter Completion
**Location:** After the Key Takeaways section, just before Practice Problems (line 1221).
**Text:**
> You've just mastered one of the most practical chapters in geometry! From similar figures to trigonometric ratios, you now have the tools to measure buildings, mountains, and rivers -- all without leaving the ground. That's something to celebrate!

**Rationale:** Celebrates completing a dense, concept-heavy chapter. Reinforces the practical real-world power of what students just learned, which ties back to the chapter's opening hook about surveyors and architects.

## Spacing Verification

| # | Type | Approximate Line | Lines Between |
|---|------|-----------------|---------------|
| 1 | `mascot-welcome` | 44 | -- (first) |
| 2 | `mascot-thinking` | 174 | ~130 lines |
| 3 | `mascot-tip` | 642 | ~468 lines |
| 4 | `mascot-warning` | 774 | ~132 lines |
| 5 | `mascot-encourage` | 922 | ~148 lines |
| 6 | `mascot-celebration` | 1221 | ~299 lines |

No two admonitions are placed back-to-back. Each has substantial content (paragraphs, diagrams, formulas, MicroSim specs, or tables) between it and the next admonition.

## Admonition Type Distribution

- `mascot-welcome`: 1 (chapter opening) -- meets guideline of 1x
- `mascot-thinking`: 1 (AA similarity) -- within guideline of 2-3x
- `mascot-tip`: 1 (SOH-CAH-TOA) -- as needed
- `mascot-warning`: 1 (inverse trig notation) -- as needed
- `mascot-encourage`: 1 (indirect measurement) -- as needed
- `mascot-celebration`: 1 (chapter end) -- meets guideline of 1x
- **Total: 6 admonitions** -- within the 5-6 guideline

## File Modified
- `docs/chapters/10-similarity-trigonometry/index.md`
