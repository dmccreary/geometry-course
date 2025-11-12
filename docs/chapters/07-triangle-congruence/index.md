# Triangle Congruence and Properties

## Summary

This chapter studies triangle classifications, congruence criteria (SSS, SAS, ASA, AAS, HL), important theorems about triangle angles and sides, and special segments within triangles. You'll learn when and how to prove triangles congruent and apply triangle properties to solve problems. Understanding these fundamental triangle relationships is essential for working with more complex polygons and for proving geometric theorems throughout the course.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

1. Triangle
2. Scalene Triangle
3. Isosceles Triangle
4. Equilateral Triangle
5. Acute Triangle
6. Right Triangle
7. Obtuse Triangle
8. SSS Congruence
9. SAS Congruence
10. ASA Congruence
11. AAS Congruence
12. HL Congruence
13. Triangle Sum Theorem
14. Exterior Angle Theorem
15. Third Angle Theorem
16. Base Angles Theorem
17. Triangle Inequality Theorem
18. Hinge Theorem
19. Median of a Triangle
20. Altitude of a Triangle
21. Perpendicular Bisector Triangle
22. Angle Bisector of Triangle

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)
- [Chapter 2: Logic and Proof](../02-logic-and-proof/index.md)
- [Chapter 3: Angles and Angle Relationships](../03-angles-and-relationships/index.md)
- [Chapter 6: Transformations and Congruence](../06-transformations-congruence/index.md)

---

## Introduction to Triangles

The triangle is one of the most fundamental and important shapes in all of geometry. With only three sides and three angles, triangles appear everywhere—from the structural supports in bridges and buildings to the pixels in computer graphics. Despite their simplicity, triangles possess remarkable properties that make them uniquely useful in mathematics, engineering, and the natural world.

In this chapter, you'll explore the rich world of triangles: how to classify them by sides and angles, when two triangles are congruent (identical in size and shape), and what theorems govern their angles and side lengths. You'll also discover special segments within triangles—medians, altitudes, perpendicular bisectors, and angle bisectors—that reveal hidden relationships and symmetries.

Understanding triangles is essential because they are the building blocks of more complex geometric figures. Any polygon can be divided into triangles, making triangle properties the foundation for understanding all of plane geometry.

## Triangle Basics and Classifications

A **triangle** is a polygon with three sides, three vertices, and three angles. The sum of the three interior angles always equals 180°, a fundamental property we'll prove later in this chapter.

### Classifying Triangles by Sides

Triangles can be classified by the relationships among their side lengths:

#### Diagram: Triangle Classification by Sides
<details markdown="1">
    <summary>Three Types of Triangles by Side Length</summary>
    Type: diagram

    Purpose: Show the three classifications of triangles based on side relationships

    **Learning Objective:** Students will identify and classify triangles as scalene, isosceles, or equilateral based on side lengths (Bloom's: **Remembering** and **Understanding**)

    Layout: Three triangles side-by-side (1200x400px)

    Triangle 1 - Scalene:
    - All three sides different lengths
    - Sides: 3 cm, 4 cm, 5 cm (labeled)
    - No congruence marks
    - Color: Blue
    - Label below: "Scalene Triangle"
    - Definition: "All three sides different lengths"

    Triangle 2 - Isosceles:
    - Two sides equal length
    - Sides: 5 cm, 5 cm, 3 cm (labeled)
    - Two sides marked with single tick marks (congruent)
    - Base angles marked with arcs (equal angles)
    - Color: Green
    - Label below: "Isosceles Triangle"
    - Definition: "Two sides equal (congruent)"
    - Note: "Base angles are equal"

    Triangle 3 - Equilateral:
    - All three sides equal length
    - Sides: 4 cm, 4 cm, 4 cm (labeled)
    - All sides marked with double tick marks (congruent)
    - All angles marked with arcs showing 60°
    - Color: Orange
    - Label below: "Equilateral Triangle"
    - Definition: "All three sides equal"
    - Note: "All angles are 60°"

    Visual elements:
    - Clear side length labels
    - Congruence marks (tick marks on equal sides)
    - Angle marks showing equal angles
    - Vertex labels (A, B, C for each)

    Color scheme:
    - Background: Light cream
    - Scalene: Blue triangle
    - Isosceles: Green triangle
    - Equilateral: Orange triangle
    - Labels: Black text

    Overall title: "Triangle Classification by Sides"

    Implementation: SVG with precise measurements
</details>

**Scalene Triangle:** A triangle with **all three sides of different lengths**. Since no sides are equal, no angles are equal either.

**Isosceles Triangle:** A triangle with **exactly two sides of equal length** (congruent). The two equal sides are called **legs**, and the third side is the **base**. The angles opposite the equal sides (called **base angles**) are also equal.

**Equilateral Triangle:** A triangle with **all three sides equal** (congruent). All three angles are also equal, each measuring exactly 60°. An equilateral triangle is a special type of isosceles triangle.

### Classifying Triangles by Angles

Triangles can also be classified by their angle measures:

#### Diagram: Triangle Classification by Angles
<details markdown="1">
    <summary>Three Types of Triangles by Angle Measures</summary>
    Type: diagram

    Purpose: Show the three classifications of triangles based on angle measures

    **Learning Objective:** Students will identify and classify triangles as acute, right, or obtuse based on angle measures (Bloom's: **Remembering** and **Understanding**)

    Layout: Three triangles side-by-side (1200x450px)

    Triangle 1 - Acute:
    - All three angles less than 90°
    - Angles: 70°, 60°, 50° (labeled with arcs)
    - All angles marked with single arcs
    - Color: Purple
    - Label below: "Acute Triangle"
    - Definition: "All angles less than 90°"
    - Visual: "Pointed" appearance

    Triangle 2 - Right:
    - One angle exactly 90°
    - Angles: 90°, 60°, 30° (labeled)
    - Right angle marked with small square symbol
    - Other angles marked with arcs
    - Color: Red
    - Label below: "Right Triangle"
    - Definition: "One angle equals 90°"
    - Note: "Right angle marked with square"
    - Hypotenuse labeled

    Triangle 3 - Obtuse:
    - One angle greater than 90°
    - Angles: 120°, 40°, 20° (labeled)
    - Obtuse angle marked with larger arc
    - Color: Teal
    - Label below: "Obtuse Triangle"
    - Definition: "One angle greater than 90°"
    - Visual: "Wide" appearance

    Visual elements:
    - Angle measurements clearly labeled
    - Arc marks for each angle
    - Right angle square symbol
    - Vertex labels (A, B, C)
    - Grid or reference to show angle sizes

    Color scheme:
    - Background: White
    - Acute: Purple triangle
    - Right: Red triangle with right angle square
    - Obtuse: Teal triangle
    - Angle arcs: Matching triangle colors
    - Labels: Black text

    Overall title: "Triangle Classification by Angles"

    Note box: "Every triangle has exactly ONE of these classifications by angle"

    Implementation: SVG with accurate angle measures
</details>

**Acute Triangle:** A triangle where **all three angles are less than 90°** (all acute angles).

**Right Triangle:** A triangle with **exactly one 90° angle** (right angle). The side opposite the right angle is called the **hypotenuse**, and the other two sides are called **legs**. The hypotenuse is always the longest side of a right triangle.

**Obtuse Triangle:** A triangle with **exactly one angle greater than 90°** (obtuse angle). The other two angles must be acute.

**Important note:** Every triangle falls into exactly one category by sides (scalene, isosceles, or equilateral) AND exactly one category by angles (acute, right, or obtuse). For example, a triangle can be "isosceles and acute" or "scalene and right."

#### MicroSim: Interactive Triangle Classifier
<details markdown="1">
    <summary>Triangle Classification Explorer</summary>
    Type: microsim

    **Learning Objective:** Students will classify triangles by both sides and angles and understand the dual classification system (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Purpose: Interactive tool for creating and classifying triangles

    Canvas layout (900x700px):
    - Drawing area (900x550): Coordinate grid with draggable triangle
    - Control panel (900x150): Classification display and challenges

    Visual elements:
    - Coordinate grid with triangle ABC
    - Three draggable vertices (A, B, C)
    - Triangle drawn with colored edges
    - Side lengths displayed on each edge
    - Angle measures displayed at each vertex
    - Measurement lines/arcs visible

    Interactive features:

    Triangle manipulation:
    - Drag any vertex to change triangle shape
    - Triangle updates in real-time
    - All measurements update automatically
    - Cannot create degenerate triangles (vertices dragged too close)

    Display panel shows:
    - Side lengths: AB = ___, BC = ___, AC = ___
    - Angle measures: ∠A = ___°, ∠B = ___°, ∠C = ___°
    - Sum of angles: ___° (always 180°)

    Classification results:
    - By sides: [Scalene | Isosceles | Equilateral]
    - By angles: [Acute | Right | Obtuse]
    - Full classification: "This is a [type] [type] triangle"
    - Example: "This is an obtuse isosceles triangle"

    Visual feedback:
    - Triangle color changes by angle classification:
      - Acute: Purple
      - Right: Red (with right angle square symbol)
      - Obtuse: Teal
    - Equal sides marked with matching tick marks
    - Equal angles marked with matching arcs
    - Special highlighting for equilateral (all sides get marks)

    Challenge modes:
    1. "Create a Triangle": Given classification, drag vertices to create it
       - "Create a right scalene triangle"
       - "Create an equilateral triangle"
       - Verification when complete

    2. "Quick Classify": Triangle appears, student selects classification
       - Multiple choice buttons
       - Timer for speed challenges
       - Score tracking

    3. "Impossible Challenges": Identify impossible combinations
       - "Create a right equilateral triangle" → Impossible!
       - "Create an obtuse equilateral triangle" → Impossible!
       - Explanation of why certain combinations impossible

    Special features:
    - "Show Grid" toggle
    - "Show Measurements" toggle
    - "Snap to Grid" option for precise placement
    - "Random Triangle" button
    - "Reset" to default triangle
    - Measurement precision selector (nearest degree, 0.1°, etc.)

    Default parameters:
    - Triangle with vertices at (2,2), (8,2), (5,7)
    - Right isosceles triangle
    - Grid: -1 to 10 on both axes
    - Background: Light blue gradient

    Educational callouts:
    - "Angle sum always equals 180°!"
    - "Equilateral triangles are always acute"
    - "Right triangles cannot be obtuse"
    - "Drag vertices to explore all types"

    Hint system:
    - For challenges, progressive hints available
    - "Try making one angle 90° for a right triangle"
    - "Make all sides equal for equilateral"

    Implementation: p5.js with distance and angle calculations
</details>

## Triangle Congruence Criteria

In Chapter 6, you learned that two figures are congruent if one can be mapped onto the other through rigid motions (translations, rotations, reflections). For triangles specifically, we have powerful shortcuts that allow us to prove congruence without checking all six pairs of corresponding parts.

These shortcuts are called **triangle congruence criteria** or **triangle congruence postulates/theorems**. There are five valid criteria:

### SSS (Side-Side-Side) Congruence

**SSS Congruence Postulate:** If three sides of one triangle are congruent to three sides of another triangle, then the triangles are congruent.

In symbols: If $AB \cong DE$, $BC \cong EF$, and $AC \cong DF$, then $\triangle ABC \cong \triangle DEF$.

#### Diagram: SSS Congruence Visualization
<details markdown="1">
    <summary>SSS Congruence with Rigid Motion</summary>
    Type: diagram

    Purpose: Show how SSS determines triangle congruence through rigid motion

    **Learning Objective:** Students will understand that three congruent sides uniquely determine a triangle and prove congruence (Bloom's: **Understanding** and **Applying**)

    Layout: Three-panel progression (1200x400px)

    Panel 1 - Given Information:
    - Two triangles: △ABC (blue) and △DEF (outline only)
    - All three sides labeled with measurements
    - AB = DE = 5 cm (one tick mark)
    - BC = EF = 7 cm (two tick marks)
    - AC = DF = 6 cm (three tick marks)
    - Label: "Given: Three pairs of congruent sides"

    Panel 2 - Attempting to Build:
    - Show construction process
    - Start with side DE (5 cm)
    - Arc from D with radius 6 cm (for DF)
    - Arc from E with radius 7 cm (for EF)
    - Two arcs intersect at point F
    - Label: "The third vertex must be here"
    - Annotation: "Only one possible location!"

    Panel 3 - Result:
    - △ABC (blue) overlaid on △DEF (green)
    - Perfect overlap shown
    - Label: "△ABC ≅ △DEF"
    - Annotation: "SSS guarantees congruence"
    - Small arrows showing rotation/translation used

    Visual elements:
    - Congruence marks (tick marks) on corresponding sides
    - Construction arcs shown in panel 2
    - Overlapping triangles in panel 3
    - Clear labels and measurements

    Color scheme:
    - Background: Light yellow
    - Original triangle: Blue
    - Second triangle: Green outline, then solid green
    - Construction arcs: Dashed gray
    - Congruence marks: Black

    Overall title: "SSS Congruence: Three Sides Determine a Triangle"

    Implementation: SVG with construction visualization
</details>

### SAS (Side-Angle-Side) Congruence

**SAS Congruence Postulate:** If two sides and the **included angle** of one triangle are congruent to two sides and the included angle of another triangle, then the triangles are congruent.

**Important:** The angle must be **included** (between) the two sides. The included angle is the angle formed by the two sides.

In symbols: If $AB \cong DE$, $\angle B \cong \angle E$, and $BC \cong EF$, then $\triangle ABC \cong \triangle DEF$.

#### Diagram: SAS Congruence with Included Angle
<details markdown="1">
    <summary>SAS Congruence Emphasis on Included Angle</summary>
    Type: diagram

    Purpose: Show SAS congruence and emphasize the included angle requirement

    **Learning Objective:** Students will identify the included angle and apply SAS congruence correctly (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Two examples side-by-side (1200x500px)

    Left side - Valid SAS:
    - Two triangles: △ABC and △DEF
    - Two sides marked: AB ≅ DE (one tick), BC ≅ EF (two ticks)
    - Included angle marked: ∠B ≅ ∠E (arc symbol, 50°)
    - The angle is BETWEEN the two marked sides (highlighted)
    - Label: "Valid SAS ✓"
    - Annotation: "Angle B is INCLUDED between sides AB and BC"
    - Conclusion: "△ABC ≅ △DEF"
    - Checkmark in green

    Right side - Invalid SSA (non-example):
    - Two triangles with same sides but NON-included angle
    - Two sides marked: AB ≅ DE, AC ≅ DF
    - Non-included angle: ∠C ≅ ∠F (NOT between AB and AC)
    - Label: "NOT SAS (This is SSA) ✗"
    - Annotation: "Angle C is NOT between the two marked sides"
    - Warning: "SSA is not sufficient!"
    - X mark in red
    - Show two different triangles possible with same SSA

    Visual elements:
    - Clear highlighting of included vs. non-included angles
    - Arrows pointing to included angle
    - Congruence marks on sides and angles
    - Color coding for valid/invalid

    Color scheme:
    - Valid example: Green border
    - Invalid example: Red border
    - Triangles: Blue and green
    - Included angle: Highlighted in yellow
    - Non-included angle: Highlighted in red

    Overall title: "SAS Requires INCLUDED Angle"

    Note box: "Common Error: Make sure the angle is between the two sides!"

    Implementation: SVG with clear annotations
</details>

### ASA (Angle-Side-Angle) Congruence

**ASA Congruence Postulate:** If two angles and the **included side** of one triangle are congruent to two angles and the included side of another triangle, then the triangles are congruent.

In symbols: If $\angle A \cong \angle D$, $AB \cong DE$, and $\angle B \cong \angle E$, then $\triangle ABC \cong \triangle DEF$.

### AAS (Angle-Angle-Side) Congruence

**AAS Congruence Theorem:** If two angles and a **non-included side** of one triangle are congruent to two angles and the corresponding non-included side of another triangle, then the triangles are congruent.

In symbols: If $\angle A \cong \angle D$, $\angle B \cong \angle E$, and $BC \cong EF$, then $\triangle ABC \cong \triangle DEF$.

**Why AAS works:** If two angles are congruent, the third angle must also be congruent (by Triangle Sum Theorem), so AAS essentially becomes ASA after we determine the third angle.

### HL (Hypotenuse-Leg) Congruence

**HL Congruence Theorem:** For **right triangles only**, if the hypotenuse and one leg of one right triangle are congruent to the hypotenuse and one leg of another right triangle, then the triangles are congruent.

This is a special case that only applies to right triangles.

#### Diagram: All Five Congruence Criteria Reference
<details markdown="1">
    <summary>Complete Triangle Congruence Criteria Guide</summary>
    Type: diagram

    Purpose: Comprehensive reference for all five triangle congruence criteria

    **Learning Objective:** Students will identify which congruence criterion applies in various situations and distinguish between valid and invalid criteria (Bloom's: **Remembering**, **Understanding**, and **Evaluating**)

    Layout: Grid format with 5 valid criteria plus 2 invalid cases (1400x900px)

    Top row - Three main criteria:

    Panel 1 - SSS:
    - Pair of triangles with all sides marked
    - Three pairs of tick marks (1, 2, 3)
    - Title: "SSS (Side-Side-Side)"
    - Formula: "AB≅DE, BC≅EF, AC≅DF → △ABC≅△DEF"
    - Icon: Three sides highlighted
    - Border: Green

    Panel 2 - SAS:
    - Pair of triangles with two sides and included angle
    - Tick marks on sides, arc on angle
    - Included angle highlighted in yellow
    - Title: "SAS (Side-Angle-Side)"
    - Formula: "AB≅DE, ∠B≅∠E, BC≅EF → △ABC≅△DEF"
    - Note: "Angle must be INCLUDED"
    - Icon: Two sides + angle between
    - Border: Green

    Panel 3 - ASA:
    - Pair of triangles with two angles and included side
    - Arcs on angles, tick on side
    - Included side highlighted
    - Title: "ASA (Angle-Side-Angle)"
    - Formula: "∠A≅∠D, AB≅DE, ∠B≅∠E → △ABC≅△DEF"
    - Note: "Side must be INCLUDED"
    - Icon: Two angles + side between
    - Border: Green

    Middle row - Two more valid criteria:

    Panel 4 - AAS:
    - Pair of triangles with two angles and non-included side
    - Arcs on angles, tick on non-included side
    - Title: "AAS (Angle-Angle-Side)"
    - Formula: "∠A≅∠D, ∠B≅∠E, BC≅EF → △ABC≅△DEF"
    - Note: "Works because 3rd angle forced equal"
    - Icon: Two angles + non-included side
    - Border: Green

    Panel 5 - HL:
    - Pair of RIGHT triangles (right angles marked with squares)
    - Hypotenuse and one leg marked
    - Title: "HL (Hypotenuse-Leg)"
    - Formula: "∠C≅∠F=90°, AB≅DE, AC≅DF → △ABC≅△DEF"
    - Note: "RIGHT TRIANGLES ONLY"
    - Icon: Right triangle symbol
    - Border: Green with "Right △ Only" banner

    Bottom row - Invalid criteria (WARNING):

    Panel 6 - AAA (Not Sufficient):
    - Two triangles with all angles equal but different sizes
    - All three angles marked equal (60°, 60°, 60°)
    - But triangles are DIFFERENT sizes
    - Title: "AAA (NOT Sufficient!) ✗"
    - Visual: One small triangle, one large triangle
    - Same angles, different side lengths
    - Label: "SIMILAR but not congruent"
    - Note: "Same shape, different size"
    - Border: Red warning

    Panel 7 - SSA (Not Sufficient):
    - Two sides and non-included angle shown
    - Two DIFFERENT triangles possible with same SSA
    - Title: "SSA (NOT Sufficient!) ✗"
    - Visual: "Ambiguous case" - two possible triangles
    - Label: "The 'Ambiguous Case'"
    - Note: "Can create two different triangles"
    - Border: Red warning

    Summary box at bottom:
    - "Valid Criteria: SSS, SAS, ASA, AAS, HL (right △ only)"
    - "Invalid: AAA (gives similarity), SSA (ambiguous)"
    - "Remember: Included means BETWEEN the two parts"

    Color scheme:
    - Valid criteria: Green borders, clean layout
    - Invalid criteria: Red borders, warning icons
    - Triangles: Blue and green
    - Highlighted parts: Yellow
    - Background: White with subtle pattern

    Overall title: "Triangle Congruence Criteria: Complete Reference"

    Implementation: Infographic-style SVG with clear visual hierarchy
</details>

#### MicroSim: Triangle Congruence Criterion Selector
<details markdown="1">
    <summary>Interactive Congruence Criterion Practice</summary>
    Type: microsim

    **Learning Objective:** Students will determine which congruence criterion (if any) proves triangles congruent and justify their reasoning with proper notation (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Practice identifying and applying triangle congruence criteria

    Canvas layout (950x800px):
    - Triangle display (950x550): Two triangles with various markings
    - Analysis panel (950x250): Information, response options, feedback

    Visual elements:
    - Two triangles displayed (△ABC and △DEF)
    - Various congruence markings appear based on problem
    - Clean, clear visualization

    Problem generation system:
    - "New Problem" button generates random scenario
    - Problems include: SSS, SAS, ASA, AAS, HL, AAA (not sufficient), SSA (not sufficient), or not enough information
    - Markings automatically added to triangles
    - For HL problems, right angles clearly marked

    Given information displayed:
    - Table format showing what's marked:
      | Given | △ABC | △DEF |
      |-------|------|------|
      | Sides | AB=5, BC=7 | DE=5, EF=7 |
      | Angles | ∠B=50° | ∠E=50° |

    Student response area:
    - Multiple choice buttons (large, clear):
      - "SSS"
      - "SAS"
      - "ASA"
      - "AAS"
      - "HL"
      - "Not Congruent (AAA or SSA)"
      - "Need More Information"
    - "Check Answer" button
    - "Show Hint" button (progressive hints)

    Feedback system:

    Correct response:
    - Green flash around triangles
    - "Correct! △ABC ≅ △DEF by [criterion]"
    - Highlights the specific parts used in the proof
    - Animated overlay showing rigid motion
    - Congruence statement shown: △ABC ≅ △DEF

    Incorrect response:
    - Orange flash (not red - gentle)
    - "Not quite. Let's think about what's marked..."
    - First hint: "Look at what types of parts are marked"
    - Second hint: "Are the angles included or non-included?"
    - Third hint: "This is [criterion] because..."
    - Option to reveal answer

    Display panel features:
    - What's given (automatically detected)
    - What criterion applies (after checking)
    - Why it works or doesn't work
    - Proper congruence statement notation

    Problem difficulty levels:
    - Level 1 (Easy): Clear, obvious cases with distinct criteria
      - Pure SSS, pure SAS, etc.
      - All markings very visible

    - Level 2 (Medium): Must carefully identify included vs. non-included
      - Distinguish SAS from SSA
      - Distinguish ASA from AAS

    - Level 3 (Hard): Includes insufficient information
      - AAA cases (similar but not congruent)
      - SSA cases (ambiguous)
      - Missing one piece of information

    - Level 4 (Challenge): Must write full congruence statement
      - Identify criterion AND proper vertex correspondence
      - "If △ABC ≅ △DEF by SAS, which parts are congruent?"

    Special features:
    - "Hint" button: Progressive scaffolding
      - Hint 1: "Count how many sides vs. angles are marked"
      - Hint 2: "Is the angle between the two sides?"
      - Hint 3: "Remember, HL is only for right triangles"

    - "Show Correspondence" toggle:
      - Highlights matching parts with colored lines
      - A↔D (red), B↔E (blue), C↔F (green)

    - "Explain" mode:
      - After answering, shows detailed explanation
      - "This is SAS because: two sides (AB≅DE, BC≅EF) and the angle BETWEEN them (∠B≅∠E) are congruent"

    - Progress tracker:
      - Problems solved correctly by criterion
      - "SSS: 8/10, SAS: 6/10, ASA: 7/10, AAS: 5/10, HL: 4/5"
      - "Insufficient: 3/5"

    - Statistics dashboard:
      - Most common error: Confusing SAS with SSA
      - Accuracy by criterion type
      - Improvement over time

    Challenge modes:

    1. "Speed Round":
       - Timer: 30 seconds per problem
       - Rapid-fire identification
       - Score tracking
       - Leaderboard (if applicable)

    2. "Find What's Missing":
       - Given desired criterion, identify what info is needed
       - "To prove congruence by ASA, what else do we need to know?"
       - Multiple choice or free response

    3. "Prove It":
       - Write complete congruence statement
       - Fill in the blanks: "△ABC ≅ △___ by ___"
       - Check vertex correspondence order

    4. "Spot the Error":
       - Incorrect congruence statement given
       - Student identifies the error
       - "Someone wrote: △ABC ≅ △DEF by SSA. What's wrong?"

    Default parameters:
    - Starts with clear SAS example
    - Level 1 difficulty
    - Background: White to light gray gradient
    - Hints enabled

    Educational callouts (rotate randomly):
    - "Included means BETWEEN the two parts!"
    - "HL only works for right triangles"
    - "AAA gives similarity, not congruence"
    - "SSA is the ambiguous case—not sufficient"
    - "If two angles match, the third must too!"

    Visual design:
    - Clean, uncluttered interface
    - Large, touch-friendly buttons
    - Color-coded feedback (green=correct, orange=try again, blue=info)
    - Professional geometry diagram style

    Implementation: p5.js with geometric comparison algorithms and random problem generation
</details>

## Triangle Angle Theorems

Triangles have several important properties related to their angles. These theorems are fundamental to understanding triangle geometry and are used frequently in proofs.

### Triangle Sum Theorem

**Triangle Sum Theorem:** The sum of the measures of the three interior angles of a triangle is always 180°.

In symbols: If triangle ABC has angles $\angle A$, $\angle B$, and $\angle C$, then:

$m\angle A + m\angle B + m\angle C = 180°$

This is one of the most important theorems in geometry. It means that if you know two angles of a triangle, you can always find the third angle by subtracting from 180°.

#### Diagram: Triangle Sum Theorem Proof Visualization
<details markdown="1">
    <summary>Visual Proof of Triangle Sum Theorem</summary>
    Type: diagram

    Purpose: Demonstrate why the angles of a triangle sum to 180°

    **Learning Objective:** Students will understand why triangle angles sum to 180° through a visual proof involving parallel lines (Bloom's: **Understanding** and **Analyzing**)

    Layout: Multi-step visual proof (1200x600px)

    Step 1 - Original Triangle:
    - Triangle ABC drawn
    - Angles labeled: ∠1, ∠2, ∠3 (at vertices A, B, C)
    - Label: "We want to prove: ∠1 + ∠2 + ∠3 = 180°"

    Step 2 - Parallel Line Construction:
    - Same triangle ABC
    - Draw line through vertex B parallel to side AC
    - Label this line as line ℓ
    - Mark: "Line ℓ || AC"
    - Show parallel markings

    Step 3 - Identify Alternate Interior Angles:
    - Line ℓ parallel to AC
    - Transversal AB creates alternate interior angles
    - Angle at B on line ℓ equals ∠1 (alternate interior angles)
    - Label this angle as ∠4
    - Mark: "∠4 ≅ ∠1 (alternate interior angles)"
    - Color code: ∠1 and ∠4 same color (red)

    Step 4 - More Alternate Interior Angles:
    - Transversal BC creates alternate interior angles
    - Angle at B on line ℓ equals ∠3 (alternate interior angles)
    - Label this angle as ∠5
    - Mark: "∠5 ≅ ∠3 (alternate interior angles)"
    - Color code: ∠3 and ∠5 same color (blue)

    Step 5 - Angles on a Straight Line:
    - At point B, three angles sit on line ℓ: ∠4, ∠2, ∠5
    - These form a straight angle (180°)
    - Mark: "∠4 + ∠2 + ∠5 = 180° (straight line)"
    - Color code all three angles

    Step 6 - Substitution:
    - Since ∠4 ≅ ∠1 and ∠5 ≅ ∠3:
    - Substitute: ∠1 + ∠2 + ∠3 = 180°
    - Label: "Therefore, the angles of a triangle sum to 180°!"
    - Conclusion box highlighted

    Visual elements:
    - Clear angle markings with arcs
    - Parallel line symbol on lines
    - Alternate interior angle pairs color-coded
    - Arrows and annotations
    - Step-by-step revelation

    Color scheme:
    - Triangle: Blue outline
    - Parallel line: Dashed green
    - ∠1 and ∠4: Red
    - ∠2: Orange
    - ∠3 and ∠5: Blue
    - Annotations: Black text on yellow background

    Overall title: "Visual Proof: Triangle Angle Sum Theorem"

    Note box: "This proof uses parallel lines and alternate interior angles from Chapter 3!"

    Implementation: SVG with step-by-step diagram or animated sequence
</details>

### Exterior Angle Theorem

**Exterior Angle Theorem:** The measure of an **exterior angle** of a triangle equals the sum of the measures of the two **remote interior angles** (the two interior angles not adjacent to the exterior angle).

An **exterior angle** is formed when you extend one side of a triangle. Each vertex has two possible exterior angles (one on each side), but they're congruent vertical angles.

In symbols: If ∠4 is an exterior angle at vertex C, and ∠A and ∠B are the remote interior angles, then:

$m\angle 4 = m\angle A + m\angle B$

#### Diagram: Exterior Angle Theorem Visualization
<details markdown="1">
    <summary>Exterior Angle and Remote Interior Angles</summary>
    Type: diagram

    Purpose: Illustrate the relationship between exterior angles and remote interior angles

    **Learning Objective:** Students will identify exterior angles, remote interior angles, and apply the Exterior Angle Theorem (Bloom's: **Understanding** and **Applying**)

    Layout: Two examples with detailed annotations (1200x500px)

    Example 1 - Basic Exterior Angle:
    - Triangle ABC with angles 50°, 60°, 70°
    - Side BC extended beyond C to point D
    - Exterior angle ∠ACD formed (labeled ∠4)
    - Remote interior angles: ∠A = 50°, ∠B = 60°
    - Adjacent interior angle: ∠ACB = 70°

    Labels and callouts:
    - "Exterior angle ∠4" (pointing to ∠ACD)
    - "Remote interior angles" (arrows to ∠A and ∠B)
    - "Adjacent interior angle" (arrow to ∠ACB)
    - Calculation shown: "∠4 = ∠A + ∠B = 50° + 60° = 110°"
    - Verification: "Check: ∠4 + ∠ACB = 110° + 70° = 180° ✓ (linear pair)"

    Example 2 - Multiple Exterior Angles:
    - Same triangle with all three vertices showing exterior angles
    - Exterior angle at A: equals sum of ∠B and ∠C
    - Exterior angle at B: equals sum of ∠A and ∠C
    - Exterior angle at C: equals sum of ∠A and ∠B
    - All three examples calculated

    Visual elements:
    - Extended sides shown as dashed lines
    - Exterior angles highlighted in yellow
    - Remote interior angles highlighted in matching colors
    - Arc symbols for all angles with degree measures
    - Arrows connecting related angles
    - Color-coded groupings

    Color scheme:
    - Triangle: Blue solid
    - Extended sides: Dashed gray
    - Exterior angles: Yellow highlighting
    - Remote interior angles: Green and purple highlights
    - Adjacent interior angle: Orange highlight
    - Annotations: Clear black text on white boxes

    Formula box:
    - "Exterior Angle Theorem"
    - "Exterior angle = Sum of remote interior angles"
    - "∠exterior = ∠remote₁ + ∠remote₂"

    Overall title: "Exterior Angle Theorem"

    Note: "An exterior angle is ALWAYS larger than either remote interior angle"

    Implementation: SVG with clear color coding and annotations
</details>

#### MicroSim: Exterior Angle Explorer
<details markdown="1">
    <summary>Interactive Exterior Angle Tool</summary>
    Type: microsim

    **Learning Objective:** Students will discover the Exterior Angle Theorem relationship by manipulating triangle angles and observing the exterior angle (Bloom's: **Understanding**, **Analyzing**, and **Evaluating**)

    Purpose: Explore exterior angles and verify the theorem dynamically

    Canvas layout (900x700px):
    - Drawing area (900x550): Triangle with draggable vertices and exterior angle
    - Control panel (900x150): Angle displays and verification

    Visual elements:
    - Triangle ABC on coordinate plane
    - Draggable vertices A, B, C
    - Side BC extended beyond C to create exterior angle
    - All interior angles labeled and measured
    - Exterior angle ∠4 at vertex C labeled and measured
    - Color-coded angle regions

    Interactive features:

    Triangle manipulation:
    - Drag any vertex to change triangle shape
    - All angles update in real-time
    - Exterior angle updates automatically
    - Cannot create degenerate triangles

    Display panel:
    - Interior angles:
      - ∠A = ___°
      - ∠B = ___°
      - ∠C = ___°
      - Sum = ___° (always 180°)

    - Exterior angle:
      - ∠4 (exterior at C) = ___°

    - Relationship verification:
      - ∠A + ∠B = ___°
      - ∠4 = ___°
      - "Are they equal? [YES ✓ / NO]"
      - Difference: |∠4 - (∠A + ∠B)| = 0° (always)

    Visual feedback:
    - Remote interior angles (∠A and ∠B) highlighted in green
    - Exterior angle ∠4 highlighted in yellow
    - Adjacent interior angle ∠C highlighted in orange
    - Connecting lines showing the relationship
    - Real-time calculation displayed

    Special features:
    - "Show Theorem" toggle: Displays the relationship equation
    - "Highlight Remote Angles" toggle: Emphasizes ∠A and ∠B
    - "Show Linear Pair" toggle: Shows ∠4 + ∠C = 180°
    - "Animate" button: Smoothly changes triangle shape
    - "Random Triangle" button: Generates new configuration

    Challenge modes:

    1. "Find the Exterior Angle":
       - Given remote interior angles, calculate exterior angle
       - Input answer, check if correct
       - "∠A = 45°, ∠B = 65°, what is the exterior angle at C?"

    2. "Find the Remote Angle":
       - Given exterior angle and one remote angle, find the other
       - "Exterior angle = 120°, ∠A = 50°, what is ∠B?"

    3. "Verification Challenge":
       - Triangle appears, student verifies theorem holds
       - Multiple triangles in sequence
       - Builds confidence in theorem

    Measurement display:
    - Table format showing all relationships:
      | Angle | Measure |
      |-------|---------|
      | ∠A (remote) | 45° |
      | ∠B (remote) | 65° |
      | ∠C (adjacent) | 70° |
      | ∠4 (exterior) | 110° |
      | ∠A + ∠B | 110° ✓ |
      | ∠4 + ∠C | 180° ✓ |

    Default parameters:
    - Triangle with angles 50°, 60°, 70°
    - Exterior angle at vertex C
    - Grid background
    - All features visible

    Educational callouts:
    - "Exterior angle always equals sum of remote interior angles!"
    - "Exterior angle is always larger than either remote angle"
    - "Exterior and adjacent interior angles form linear pair (180°)"

    Implementation: p5.js with angle calculation and real-time verification
</details>

### Third Angle Theorem

**Third Angle Theorem:** If two angles of one triangle are congruent to two angles of another triangle, then the third angles are also congruent.

In symbols: If $\angle A \cong \angle D$ and $\angle B \cong \angle E$, then $\angle C \cong \angle F$.

**Why it works:** Since the sum of angles in both triangles must equal 180°, if two angles match, the third angle must also match.

This theorem explains why AAS congruence works—once two angles match, the third angle is forced to match, so AAS effectively becomes ASA.

### Base Angles Theorem (Isosceles Triangle Theorem)

**Base Angles Theorem:** If a triangle is isosceles, then the angles opposite the congruent sides (base angles) are congruent.

In other words: If $AB \cong AC$ in triangle ABC, then $\angle B \cong \angle C$.

**Converse:** If two angles of a triangle are congruent, then the sides opposite those angles are congruent (making it isosceles).

#### Diagram: Isosceles Triangle Properties
<details markdown="1">
    <summary>Base Angles Theorem Visualization</summary>
    Type: diagram

    Purpose: Show the relationship between equal sides and equal angles in isosceles triangles

    **Learning Objective:** Students will identify base angles in isosceles triangles and apply the Base Angles Theorem (Bloom's: **Understanding** and **Applying**)

    Layout: Three examples showing theorem and converse (1200x500px)

    Example 1 - Isosceles Triangle Parts:
    - Isosceles triangle with vertex A at top
    - Two congruent sides: AB ≅ AC (marked with tick marks)
    - Base: BC (no mark)
    - Vertex angle: ∠A (at the apex)
    - Base angles: ∠B and ∠C (marked with matching arcs)

    Labels:
    - "Legs" (pointing to AB and AC)
    - "Base" (pointing to BC)
    - "Vertex angle" (at ∠A)
    - "Base angles" (at ∠B and ∠C)
    - "If legs are equal, base angles are equal"

    Example 2 - Base Angles Theorem:
    - Specific isosceles triangle
    - AB = AC = 6 cm (marked)
    - Vertex angle ∠A = 40°
    - Base angles: ∠B = ∠C = 70° (calculated)

    Calculation shown:
    - "Given: AB = AC = 6 cm, ∠A = 40°"
    - "By Base Angles Theorem: ∠B = ∠C"
    - "Sum of angles: 40° + ∠B + ∠C = 180°"
    - "So: 40° + 2∠B = 180°"
    - "Therefore: ∠B = ∠C = 70°"

    Example 3 - Converse (Equal Angles → Equal Sides):
    - Triangle with ∠B = ∠C = 55° (marked)
    - Vertex angle ∠A = 70°
    - Conclusion: Sides AB and AC must be equal
    - Sides marked: AB = AC = 8 cm

    Annotation:
    - "Given: ∠B = ∠C = 55°"
    - "By converse of Base Angles Theorem:"
    - "AB = AC (triangle is isosceles)"

    Visual elements:
    - Clear congruence marks on equal sides (tick marks)
    - Matching arcs on equal angles
    - Color highlighting for legs vs. base
    - Annotations with arrows
    - Step-by-step calculations

    Color scheme:
    - Isosceles triangles: Green
    - Equal sides (legs): Highlighted in blue
    - Base: Highlighted in orange
    - Equal base angles: Matching red arcs
    - Vertex angle: Purple arc

    Overall title: "Base Angles Theorem for Isosceles Triangles"

    Theorem box:
    - "If two sides of a triangle are congruent"
    - "Then the angles opposite those sides are congruent"

    Converse box:
    - "If two angles of a triangle are congruent"
    - "Then the sides opposite those angles are congruent"

    Implementation: SVG with clear geometric markings
</details>

## Triangle Inequality and Side-Angle Relationships

Triangles must satisfy certain inequality conditions to exist. Not every combination of side lengths can form a triangle, and there are important relationships between the sizes of sides and angles.

### Triangle Inequality Theorem

**Triangle Inequality Theorem:** The sum of the lengths of any two sides of a triangle must be greater than the length of the third side.

In symbols: For triangle ABC with sides $a$, $b$, and $c$:

- $a + b > c$
- $b + c > a$
- $a + c > b$

This theorem tells us which combinations of three lengths can actually form a triangle. If the longest side is too long compared to the other two, the sides can't "reach" to form a triangle.

#### MicroSim: Triangle Inequality Explorer
<details markdown="1">
    <summary>Can These Sides Form a Triangle?</summary>
    Type: microsim

    **Learning Objective:** Students will determine whether three side lengths can form a triangle and understand the Triangle Inequality Theorem (Bloom's: **Understanding**, **Applying**, and **Evaluating**)

    Purpose: Explore which combinations of side lengths can form valid triangles

    Canvas layout (900x750px):
    - Visualization area (900x500): Attempt to build triangle with given sides
    - Control panel (900x250): Side length sliders and verification

    Visual elements:
    - Three line segments representing potential sides
    - Interactive construction showing whether triangle forms
    - Visual feedback on triangle validity
    - Measurement displays

    Interactive features:

    Side length controls:
    - Three sliders for sides a, b, c
    - Range: 1 to 20 units each
    - Real-time value display
    - Labels: "Side a = ___ units", "Side b = ___ units", "Side c = ___ units"

    Triangle construction attempt:
    - Start with side c as base (horizontal)
    - Arc from left endpoint with radius = side a
    - Arc from right endpoint with radius = side b
    - If arcs intersect: Triangle forms! (green)
    - If arcs don't intersect: No triangle (red)
    - Visual animation showing why it works/doesn't work

    Verification panel:

    Inequality checks displayed:
    - a + b > c? [value] > [value] → [YES ✓ / NO ✗]
    - b + c > a? [value] > [value] → [YES ✓ / NO ✗]
    - a + c > b? [value] > [value] → [YES ✓ / NO ✗]

    Overall result:
    - If all three true: "These sides CAN form a triangle! ✓" (green box)
    - If any false: "These sides CANNOT form a triangle! ✗" (red box)
    - Show which inequality fails

    Visual feedback:

    Valid triangle (all inequalities satisfied):
    - Triangle drawn successfully
    - Green glow around triangle
    - All three inequalities checked in green
    - Message: "Valid triangle!"
    - Shows actual triangle with measurements

    Invalid triangle (at least one inequality fails):
    - Sides attempt to connect but fail
    - Red X where triangle can't close
    - Gap shown between the arcs
    - Failed inequality highlighted in red
    - Message: "Sides too long/short to connect"

    Special visualizations:

    1. "Degenerate" case (sum equals third side):
       - a + b = c exactly
       - Shows straight line (not a triangle)
       - Message: "This is a degenerate case—forms a line, not a triangle"

    2. "Close but not quite":
       - When very close to limit
       - Shows narrow, almost-flat triangle
       - Message: "Very flat triangle—one angle is almost 180°"

    Challenge modes:

    1. "Triangle or Not?":
       - Random side lengths presented
       - Student predicts: Can these form a triangle?
       - Yes/No buttons
       - Immediate feedback with visualization
       - Score tracking

    2. "Find the Range":
       - Two sides given (e.g., a=5, b=7)
       - Find the range of possible values for side c
       - "Side c must be between ___ and ___"
       - Check: c < a+b and c > |a-b|

    3. "Longest Side":
       - Three sides given
       - Identify which inequality to check
       - "The longest side is ___, so check if ___ + ___ > ___"

    4. "Design a Triangle":
       - Constraints given: "Create a triangle with perimeter 30"
       - Student adjusts sliders to meet constraints
       - Multiple solutions possible

    Hint system:
    - "The longest side must be shorter than the sum of the other two"
    - "Try making one side much longer than the others"
    - "What happens when two short sides try to reach a very long side?"

    Display features:
    - Perimeter: a + b + c = ___ units
    - Longest side: ___ (automatically identified)
    - Critical inequality: ___ + ___ > ___ (showing the one most likely to fail)
    - Visual representation of arcs trying to meet

    Default parameters:
    - a = 5, b = 7, c = 9 (valid triangle)
    - Background: Light blue gradient
    - Grid for measurement reference

    Educational callouts:
    - "Sum of any two sides must exceed the third side"
    - "The longest side is the critical one to check"
    - "If sum equals (not exceeds), you get a straight line"

    Advanced feature:
    - "Show all valid triangles": For given a and b, highlight valid range for c on a number line

    Implementation: p5.js with arc drawing and intersection detection
</details>

### Hinge Theorem (SAS Inequality Theorem)

**Hinge Theorem:** If two sides of one triangle are congruent to two sides of another triangle, but the included angle of the first triangle is larger than the included angle of the second, then the third side of the first triangle is longer than the third side of the second.

Think of it like a door hinge: the wider you open the hinge (larger angle), the farther apart the endpoints become.

**Converse (SSS Inequality):** If two sides of one triangle are congruent to two sides of another triangle, but the third side of the first is longer than the third side of the second, then the included angle of the first triangle is larger than the included angle of the second.

#### Diagram: Hinge Theorem Visualization
<details markdown="1">
    <summary>Hinge Theorem: Angle and Opposite Side Relationship</summary>
    Type: diagram

    Purpose: Illustrate the Hinge Theorem with door hinge analogy

    **Learning Objective:** Students will understand the relationship between included angle size and opposite side length using the Hinge Theorem (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Side-by-side comparison with door hinge analogy (1200x600px)

    Top section - Door Hinge Analogy:
    - Two door diagrams
    - Door 1: Hinge opened 30° (small angle)
      - Distance between endpoints: 50 cm
    - Door 2: Hinge opened 60° (larger angle)
      - Distance between endpoints: 95 cm (longer)
    - Label: "Wider hinge opening = greater distance between endpoints"
    - Visual: Door frame and door with hinge marked

    Bottom section - Triangle Application:

    Left triangle (△ABC):
    - AB = 8 cm
    - AC = 8 cm
    - Included angle ∠A = 40°
    - Third side BC = 6 cm (calculated/measured)
    - Color: Blue

    Right triangle (△DEF):
    - DE = 8 cm (same as AB)
    - DF = 8 cm (same as AC)
    - Included angle ∠D = 80° (larger than ∠A)
    - Third side EF = 11 cm (longer than BC)
    - Color: Green

    Comparison box:
    - "Given: AB = DE = 8 cm, AC = DF = 8 cm"
    - "Included angles: ∠A = 40° < ∠D = 80°"
    - "By Hinge Theorem: BC < EF"
    - "Result: 6 cm < 11 cm ✓"

    Visual elements:
    - Both triangles drawn to scale
    - Equal sides marked with tick marks
    - Included angles highlighted in yellow
    - Third sides highlighted in contrasting colors
    - Arrows showing relationship: "larger angle → longer opposite side"
    - Angle arcs clearly showing size difference

    Converse shown:
    - "If third side is longer, included angle must be larger"
    - Visual: Given BC < EF, conclude ∠A < ∠D

    Color scheme:
    - Door hinge: Brown and gray
    - Triangle 1: Blue
    - Triangle 2: Green
    - Equal sides: Same tick marks
    - Included angles: Yellow highlight
    - Third sides: Red (shorter) and dark red (longer)

    Overall title: "Hinge Theorem (SAS Inequality)"

    Theorem box:
    - "If two sides are equal but included angle differs"
    - "Larger angle → Longer opposite side"

    Analogy callout: "Think of a door hinge—open it wider, endpoints spread farther!"

    Implementation: SVG with door hinge illustration and geometric comparison
</details>

## Special Segments in Triangles

Triangles contain several important segments that have special properties. These segments—medians, altitudes, perpendicular bisectors, and angle bisectors—all play important roles in triangle geometry and have unique concurrency points.

### Median of a Triangle

A **median** of a triangle is a segment from a vertex to the midpoint of the opposite side. Every triangle has three medians, one from each vertex.

**Centroid:** The three medians of a triangle are **concurrent** (meet at a single point) called the **centroid**. The centroid is the "balance point" or center of mass of the triangle. It divides each median in a 2:1 ratio, with the longer segment toward the vertex.

### Altitude of a Triangle

An **altitude** of a triangle is a perpendicular segment from a vertex to the line containing the opposite side. Every triangle has three altitudes, one from each vertex.

**Orthocenter:** The three altitudes (or their extensions) are concurrent at a point called the **orthocenter**. The location of the orthocenter depends on the triangle type:
- Acute triangle: orthocenter is inside
- Right triangle: orthocenter is at the right angle vertex
- Obtuse triangle: orthocenter is outside

### Perpendicular Bisector of a Triangle

A **perpendicular bisector** of a triangle is a line perpendicular to a side that passes through the midpoint of that side. Every triangle has three perpendicular bisectors, one for each side.

**Circumcenter:** The three perpendicular bisectors are concurrent at a point called the **circumcenter**. The circumcenter is equidistant from all three vertices, making it the center of the **circumscribed circle** (circumcircle) that passes through all three vertices.

### Angle Bisector of a Triangle

An **angle bisector** of a triangle is a segment that divides an angle into two congruent angles, from a vertex to the opposite side. Every triangle has three angle bisectors, one from each vertex.

**Incenter:** The three angle bisectors are concurrent at a point called the **incenter**. The incenter is equidistant from all three sides, making it the center of the **inscribed circle** (incircle) that touches all three sides.

#### Diagram: Four Special Segments and Their Concurrent Points
<details markdown="1">
    <summary>Medians, Altitudes, Perpendicular Bisectors, and Angle Bisectors</summary>
    Type: diagram

    Purpose: Show all four types of special segments and their properties

    **Learning Objective:** Students will identify medians, altitudes, perpendicular bisectors, and angle bisectors, and locate their points of concurrency (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Four triangles in 2x2 grid (1200x1200px)

    Panel 1 - Medians and Centroid (top-left):
    - Acute triangle ABC
    - Three medians drawn (vertex to midpoint of opposite side):
      - From A to midpoint of BC (marked M₁)
      - From B to midpoint of AC (marked M₂)
      - From C to midpoint of AB (marked M₃)
    - All three medians meet at centroid G (large red dot)
    - Midpoints marked with small circles
    - One median shows 2:1 ratio division (AG:GM₁ = 2:1)

    Labels:
    - "Medians" (title)
    - "Vertex to midpoint of opposite side"
    - "Centroid (G)" with arrow
    - "Balance point of triangle"
    - "Divides each median 2:1"

    Color: Medians in purple, centroid in red

    Panel 2 - Altitudes and Orthocenter (top-right):
    - Acute triangle DEF
    - Three altitudes drawn (perpendicular from vertex to opposite side):
      - From D perpendicular to EF
      - From E perpendicular to DF
      - From F perpendicular to DE
    - All three altitudes meet at orthocenter H (large blue dot)
    - Right angle symbols (squares) at each foot

    Labels:
    - "Altitudes" (title)
    - "Perpendicular from vertex to opposite side"
    - "Orthocenter (H)" with arrow
    - "Location varies by triangle type"

    Small inset showing three cases:
    - Acute: H inside
    - Right: H at right angle vertex
    - Obtuse: H outside

    Color: Altitudes in orange, orthocenter in blue

    Panel 3 - Perpendicular Bisectors and Circumcenter (bottom-left):
    - Triangle GHI
    - Three perpendicular bisectors (perpendicular to side at midpoint):
      - Perpendicular bisector of GH
      - Perpendicular bisector of HI
      - Perpendicular bisector of GI
    - All three meet at circumcenter O (large green dot)
    - Midpoints of sides marked
    - Circumcircle drawn (dashed) passing through all three vertices
    - Radii from O to vertices shown (all equal length)

    Labels:
    - "Perpendicular Bisectors" (title)
    - "Perpendicular to side at its midpoint"
    - "Circumcenter (O)" with arrow
    - "Center of circumscribed circle"
    - "Equidistant from vertices"
    - "OG = OH = OI" (radii)

    Color: Perpendicular bisectors in teal, circumcenter and circle in green

    Panel 4 - Angle Bisectors and Incenter (bottom-right):
    - Triangle JKL
    - Three angle bisectors (bisect each angle):
      - From J bisecting ∠J
      - From K bisecting ∠K
      - From L bisecting ∠L
    - All three meet at incenter I (large magenta dot)
    - Incircle drawn (dashed) touching all three sides
    - Perpendicular segments from I to each side (radii of incircle, all equal)

    Labels:
    - "Angle Bisectors" (title)
    - "Bisects each angle of triangle"
    - "Incenter (I)" with arrow
    - "Center of inscribed circle"
    - "Equidistant from sides"
    - Arc marks showing angle bisection

    Color: Angle bisectors in brown, incenter and incircle in magenta

    Visual elements for all panels:
    - Clear, color-coded segments
    - Points of concurrency prominently marked
    - Consistent triangle size for comparison
    - Labels and annotations
    - Right angle/midpoint symbols where appropriate

    Color scheme:
    - Background: Light cream
    - Triangles: Black outlines
    - Medians: Purple
    - Altitudes: Orange
    - Perpendicular bisectors: Teal
    - Angle bisectors: Brown
    - Concurrent points: Bright, distinct colors
    - Circles: Dashed, matching point color

    Overall title: "Four Special Segments and Their Points of Concurrency"

    Summary table at bottom:
    | Segment | Definition | Point of Concurrency | Special Property |
    |---------|------------|---------------------|------------------|
    | Median | Vertex to midpoint | Centroid (G) | Balance point, 2:1 division |
    | Altitude | Perpendicular to side | Orthocenter (H) | Location varies by triangle type |
    | Perpendicular Bisector | ⊥ to side at midpoint | Circumcenter (O) | Equidistant from vertices |
    | Angle Bisector | Bisects angle | Incenter (I) | Equidistant from sides |

    Implementation: SVG with precise geometric constructions
</details>

#### MicroSim: Special Segments Explorer
<details markdown="1">
    <summary>Interactive Triangle Centers Tool</summary>
    Type: microsim

    **Learning Objective:** Students will construct special segments, locate points of concurrency, and understand their properties through interactive exploration (Bloom's: **Applying**, **Analyzing**, and **Creating**)

    Purpose: Explore medians, altitudes, perpendicular bisectors, angle bisectors, and their concurrent points

    Canvas layout (1000x800px):
    - Drawing area (1000x650): Triangle with draggable vertices and special segments
    - Control panel (1000x150): Segment type selector and property displays

    Visual elements:
    - Triangle ABC with three draggable vertices
    - Selected type of special segments drawn
    - Point of concurrency marked prominently
    - Measurements and properties displayed

    Interactive features:

    Segment type selector (buttons or dropdown):
    - "Medians" → Shows three medians and centroid
    - "Altitudes" → Shows three altitudes and orthocenter
    - "Perpendicular Bisectors" → Shows perpendicular bisectors and circumcenter
    - "Angle Bisectors" → Shows angle bisectors and incenter
    - "All Centers" → Shows all four points simultaneously
    - "None" → Just the triangle

    Triangle manipulation:
    - Drag any vertex (A, B, or C)
    - Triangle updates in real-time
    - All segments and points update automatically
    - Can create acute, right, or obtuse triangles

    Visual feedback by segment type:

    1. Medians mode:
       - Three purple segments from vertices to midpoints
       - Midpoints marked with small circles
       - Centroid G shown as red dot
       - One median shows length divisions
       - Display: "AG = ___, GM = ___"
       - Ratio: "AG:GM = 2:1" (verified)
       - Centroid coordinates: (x, y)

    2. Altitudes mode:
       - Three orange segments perpendicular to sides
       - Right angle symbols at feet
       - Orthocenter H shown as blue dot
       - Dashed extensions if orthocenter outside
       - Display: "Triangle type: [Acute/Right/Obtuse]"
       - Orthocenter location: [Inside/On/Outside]

    3. Perpendicular Bisectors mode:
       - Three teal lines perpendicular to sides at midpoints
       - Midpoints marked
       - Circumcenter O shown as green dot
       - Circumcircle drawn (dashed, toggleable)
       - Radii to vertices shown (all equal length)
       - Display: "Radius = ___ units"
       - "OA = OB = OC = ___ ✓"

    4. Angle Bisectors mode:
       - Three brown segments bisecting angles
       - Angle arcs showing bisection
       - Incenter I shown as magenta dot
       - Incircle drawn (dashed, toggleable)
       - Perpendicular distances from I to sides shown
       - Display: "Inradius = ___ units"
       - "Distance to AB = Distance to BC = Distance to AC = ___ ✓"

    5. All Centers mode:
       - Triangle with all four points marked:
         - Centroid G (red)
         - Orthocenter H (blue)
         - Circumcenter O (green)
         - Incenter I (magenta)
       - No segments drawn (too cluttered)
       - Just the four points and their labels
       - Shows relationships between centers
       - For equilateral triangle, all four points coincide!

    Special features:

    - "Show Segments" toggle: Turn segments on/off (keep points)
    - "Show Circles" toggle: For circumcircle and incircle
    - "Show Measurements" toggle: Display all measurements
    - "Animate Triangle" button: Smoothly morphs triangle shape
    - "Equilateral" button: Makes triangle equilateral (all centers coincide!)
    - "Right Triangle" button: Makes triangle right-angled
    - "Isosceles" button: Makes triangle isosceles

    Properties panel displays:

    Centroid (when Medians selected):
    - Coordinates: (x, y)
    - "Divides each median 2:1"
    - "Balance point of triangle"
    - One median measurement showing ratio

    Orthocenter (when Altitudes selected):
    - Coordinates: (x, y)
    - Triangle type: [Acute/Right/Obtuse]
    - Location: [Inside/On/Outside]
    - All three altitudes concurrent

    Circumcenter (when Perpendicular Bisectors selected):
    - Coordinates: (x, y)
    - Circumradius: ___ units
    - "Distance to A = Distance to B = Distance to C"
    - Measurements: OA = ___, OB = ___, OC = ___

    Incenter (when Angle Bisectors selected):
    - Coordinates: (x, y)
    - Inradius: ___ units
    - "Distance to AB = Distance to BC = Distance to CA"
    - Measurements: d₁ = ___, d₂ = ___, d₃ = ___

    Challenge modes:

    1. "Identify the Center":
       - Point marked on triangle
       - Student identifies: Centroid, Orthocenter, Circumcenter, or Incenter?
       - Multiple choice

    2. "Special Triangle Quest":
       - "Create an equilateral triangle and observe the centers"
       - "Make a right triangle and find where the orthocenter is"
       - Guided exploration

    3. "Center Coincidence":
       - "For what type of triangle do all four centers coincide?"
       - Answer: Equilateral triangle
       - Visual verification

    Default parameters:
    - Acute scalene triangle
    - Medians mode selected
    - Grid: -10 to 10 on both axes
    - Background: White to light gray gradient

    Educational callouts (rotate based on mode):
    - "The centroid is always inside the triangle"
    - "The orthocenter can be outside (obtuse) or inside (acute)"
    - "The circumcircle passes through all three vertices"
    - "The incircle touches all three sides"
    - "In an equilateral triangle, all four centers are the same point!"

    Hint system:
    - "Try making the triangle equilateral—watch what happens to the centers!"
    - "Drag a vertex to make an obtuse triangle—where does the orthocenter go?"
    - "The circumcenter is equidistant from the vertices"
    - "The incenter is equidistant from the sides"

    Implementation: p5.js with geometric construction algorithms (midpoints, perpendiculars, angle bisectors)
</details>

## Practice Problems

Now that you've learned about triangle classification, congruence criteria, angle theorems, inequalities, and special segments, try these practice problems to test your understanding.

### Classification and Basic Properties

**1.** A triangle has side lengths 7 cm, 7 cm, and 10 cm. Classify this triangle by its sides.

<details markdown="1">
<summary>Solution</summary>

This is an **isosceles triangle** because two sides are equal (7 cm and 7 cm).
</details>

**2.** A triangle has angles measuring 45°, 65°, and 70°. Classify this triangle by its angles.

<details markdown="1">
<summary>Solution</summary>

This is an **acute triangle** because all three angles are less than 90°.
</details>

**3.** Can a triangle be both right and obtuse? Explain why or why not.

<details markdown="1">
<summary>Solution</summary>

No. A triangle can have at most one angle of 90° or greater. If it has a 90° angle, it's a right triangle. If it has an angle greater than 90°, it's an obtuse triangle. It cannot be both.
</details>

### Triangle Congruence

**4.** Two triangles have the following: AB ≅ DE, BC ≅ EF, and ∠B ≅ ∠E. Are the triangles congruent? If so, by which criterion?

<details markdown="1">
<summary>Solution</summary>

Yes, the triangles are congruent by **SAS (Side-Angle-Side)** because two sides and the **included** angle (the angle between the two sides) are congruent.
</details>

**5.** Two right triangles have congruent hypotenuses and one pair of congruent legs. Are they congruent? By which criterion?

<details markdown="1">
<summary>Solution</summary>

Yes, they are congruent by **HL (Hypotenuse-Leg)**, which is a special congruence criterion for right triangles.
</details>

### Triangle Angle Theorems

**6.** In triangle ABC, ∠A = 52° and ∠B = 71°. Find ∠C.

<details markdown="1">
<summary>Solution</summary>

By the Triangle Sum Theorem: ∠A + ∠B + ∠C = 180°

52° + 71° + ∠C = 180°

123° + ∠C = 180°

∠C = 57°
</details>

**7.** In triangle DEF, an exterior angle at vertex F measures 125°. If ∠D = 68°, find ∠E.

<details markdown="1">
<summary>Solution</summary>

By the Exterior Angle Theorem: Exterior angle = sum of remote interior angles

125° = ∠D + ∠E

125° = 68° + ∠E

∠E = 57°
</details>

**8.** In isosceles triangle ABC, AB ≅ AC and the vertex angle ∠A = 38°. Find the base angles ∠B and ∠C.

<details markdown="1">
<summary>Solution</summary>

By the Base Angles Theorem, ∠B = ∠C (base angles of an isosceles triangle are equal).

Using Triangle Sum Theorem: 38° + ∠B + ∠C = 180°

Since ∠B = ∠C: 38° + 2∠B = 180°

2∠B = 142°

∠B = 71°, and ∠C = 71°
</details>

### Triangle Inequality

**9.** Can three segments with lengths 5 cm, 8 cm, and 14 cm form a triangle? Explain.

<details markdown="1">
<summary>Solution</summary>

No. Check the Triangle Inequality: The sum of any two sides must be greater than the third side.

5 + 8 = 13, which is NOT greater than 14.

Since 13 < 14, these sides cannot form a triangle.
</details>

**10.** The sides of a triangle are 6 cm and 10 cm. What is the range of possible values for the third side?

<details markdown="1">
<summary>Solution</summary>

Let the third side be $c$.

By Triangle Inequality:
- 6 + 10 > c → c < 16
- 6 + c > 10 → c > 4
- 10 + c > 6 → c > -4 (always true for positive lengths)

Therefore: 4 < c < 16

The third side must be greater than 4 cm and less than 16 cm.
</details>

### Special Segments

**11.** What is the name of the point where all three medians of a triangle meet?

<details markdown="1">
<summary>Solution</summary>

The **centroid**. It is the balance point of the triangle and divides each median in a 2:1 ratio.
</details>

**12.** Which point of concurrency in a triangle is equidistant from all three vertices?

<details markdown="1">
<summary>Solution</summary>

The **circumcenter** (the point where the three perpendicular bisectors meet). It is the center of the circumscribed circle.
</details>

## Summary and Key Concepts

In this chapter, you've explored the fundamental properties and relationships of triangles:

**Triangle Classifications:**
- By sides: Scalene, Isosceles, Equilateral
- By angles: Acute, Right, Obtuse
- Each triangle has two classifications (one from each category)

**Triangle Congruence Criteria (Shortcuts):**
- **SSS**: Three sides congruent
- **SAS**: Two sides and included angle congruent
- **ASA**: Two angles and included side congruent
- **AAS**: Two angles and non-included side congruent
- **HL**: Hypotenuse and leg congruent (right triangles only)
- **Invalid**: AAA (gives similarity), SSA (ambiguous case)

**Triangle Angle Theorems:**
- **Triangle Sum Theorem**: Three angles always sum to 180°
- **Exterior Angle Theorem**: Exterior angle equals sum of remote interior angles
- **Third Angle Theorem**: If two angles match, the third must match
- **Base Angles Theorem**: In isosceles triangles, base angles are congruent

**Triangle Inequalities:**
- **Triangle Inequality Theorem**: Sum of any two sides must exceed the third
- **Hinge Theorem**: Larger included angle → longer opposite side

**Special Segments and Points:**
- **Median** → **Centroid** (balance point, 2:1 division)
- **Altitude** → **Orthocenter** (location varies by triangle type)
- **Perpendicular Bisector** → **Circumcenter** (equidistant from vertices)
- **Angle Bisector** → **Incenter** (equidistant from sides)

**Real-World Applications:**
Triangles are everywhere:
- **Engineering**: Trusses, bridges, and structural supports use triangles for rigidity
- **Navigation**: Triangulation helps determine location
- **Art and Design**: Triangular patterns and tessellations
- **Computer Graphics**: Every 3D model is built from triangular polygons
- **Surveying**: Measuring distances and land areas

Triangles are the fundamental building blocks of geometry. The properties you've learned in this chapter will be used throughout the rest of your study of geometry—from understanding polygons to working with circles, solids, and beyond.

---

**Next Steps:** With a solid understanding of triangle properties, you're ready to explore quadrilaterals, polygons, and more complex geometric relationships!
