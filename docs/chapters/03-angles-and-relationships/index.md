# Angles and Angle Relationships

## Summary

This chapter explores angle classifications, special angle pairs, and the relationships formed when lines intersect or are cut by transversals. You'll learn to identify and work with complementary angles, supplementary angles, vertical angles, and the various angle pairs created by parallel lines and transversals. These angle relationships form the foundation for proving important theorems about parallel lines, triangles, and polygons in later chapters.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

1. Acute Angle
2. Right Angle
3. Obtuse Angle
4. Straight Angle
5. Complementary Angles
6. Supplementary Angles
7. Adjacent Angles
8. Vertical Angles
9. Linear Pair
10. Angle Bisector
11. Corresponding Angles
12. Alternate Interior Angles
13. Alternate Exterior Angles
14. Same-Side Interior Angles

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)

---

## Introduction to Angles

!!! mascot-welcome "Let's Figure This Out Together!"

    Welcome to the world of angles! In this chapter, we'll explore how
    angles are classified, how they pair up, and the powerful relationships
    that form when parallel lines are crossed by a transversal. Let's dive in!

An **angle** is formed whenever two rays share a common endpoint. That shared point is called the **vertex**, and the two rays are called the **sides** of the angle. Understanding angles is fundamental to geometry because they appear everywhere—in triangles, polygons, parallel lines, and even in the real world around us, from the corners of buildings to the hands of a clock.

In this chapter, you'll learn to classify angles by their measure, recognize special angle relationships, and use these relationships to solve problems. You'll also discover how angles interact when lines cross or when parallel lines are cut by a transversal. These relationships form the foundation for proving theorems about triangles, polygons, and more complex geometric figures.

## Measuring and Classifying Angles

Angles are measured in **degrees**, denoted by the symbol °. A full rotation around a point is 360°, and angles are classified based on their measure.

#### Diagram: Angle Parts and Notation

<iframe src="../../sims/angle-parts-notation/main.html" height="452px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Angle Parts and Notation</summary>
    Type: diagram

    Purpose: Introduce the anatomy of an angle with proper notation

    **Learning Objective:** Students will identify and label the vertex and sides of an angle (Bloom's: **Remembering**)

    Components to show:
    - Two rays extending from a common point (vertex)
    - Label the vertex as point B
    - Label one ray endpoint as point A
    - Label the other ray endpoint as point C
    - Show the angle arc between the rays near the vertex
    - Display the angle symbol ∠ABC or ∠CBA
    - Include notation: ∠B (vertex notation)
    - Show measurement notation: m∠ABC = 45°

    Visual style: Clean geometric diagram with bright colors
    - Ray BA in blue
    - Ray BC in red
    - Vertex B as a solid orange dot
    - Angle arc in green
    - Labels in black, bold font

    Annotations:
    - Arrow pointing to B: "Vertex"
    - Arrow pointing to rays: "Sides of the angle"
    - Note: "The angle can be named ∠ABC, ∠CBA, or ∠B"

    Background: Light yellow or cream

    Implementation: SVG or p5.js static drawing
</details>

## Angle Types

Now that you are familiar with the basics of what angles are and draw them, let's see
how we give different angles different names.

#### Drawing: Angle Type Explorer

<iframe src="../../sims/angle-type-explorer/main.html" height="300px" width="100%" scrolling="no"></iframe>

### Acute Angles

An **acute angle** measures greater than 0° but less than 90°. Think of acute angles as "sharp" angles—the word "acute" comes from the Latin word meaning "sharp."

#### Drawing: Acute Angle Explorer

<iframe src="../../sims/acute-angle-explorer/main.html" height="502px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Acute Angle Explorer</summary>
    Type: microsim

    **Learning Objective:** Students will identify acute angles and understand their range of measures (Bloom's: **Understanding**)

    Purpose: Allow students to interactively create and measure acute angles

    Canvas layout (600x500px):
    - Main drawing area (600x420): Display an angle with adjustable measure
    - Control area at bottom (600x80): Slider and display

    Visual elements:
    - Two rays forming an angle, meeting at center of canvas
    - One ray fixed horizontally (pointing right) in dark blue
    - Second ray rotating from the fixed ray, in bright red
    - Vertex shown as a large orange circle
    - Angle arc drawn in green with radius 60px
    - Large text showing current angle measure: "Angle: 45°"
    - Color-coded feedback text based on angle type

    Interactive controls:
    - Slider (horizontal, bottom of canvas):
      - Range: 1° to 180°
      - Default: 45°
      - Width: 500px
      - Label to left: "Adjust Angle:"
    - Display text showing classification:
      - If 0° < angle < 90°: "This is an ACUTE angle" (green text)
      - If angle = 90°: "This is a RIGHT angle" (blue text)
      - If 90° < angle < 180°: "This is an OBTUSE angle" (orange text)
      - If angle = 180°: "This is a STRAIGHT angle" (purple text)

    Default parameters:
    - Starting angle: 45°
    - Background: Alice blue (light blue)
    - Angle arc fill: semi-transparent green

    Behavior:
    - As slider moves, second ray rotates around vertex
    - Angle measure updates in real-time
    - Classification text updates and changes color
    - Angle arc adjusts to show the measured angle

    Implementation: p5.js with createSlider() for control
</details>

Acute angles are common in many designs and structures. For example, the roof pitch of a house often creates acute angles, and the minute and hour hands of a clock form acute angles for most hours of the day.

### Right Angles

A **right angle** measures exactly 90°. Right angles are perhaps the most important angles in geometry and construction because they create perfectly square corners.

Right angles are often marked with a small square symbol at the vertex rather than a curved arc. This visual notation immediately tells you the angle measures 90° without needing to write the measurement.

#### Diagram: Right Angle in Real-World Contexts

<iframe src="../../sims/right-angle-contexts/main.html" height="602px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Right Angle Applications</summary>
    Type: diagram

    Purpose: Show multiple real-world examples of right angles

    **Learning Objective:** Students will recognize right angles in everyday contexts (Bloom's: **Applying**)

    Layout: Four panels in a 2x2 grid (800x600px total)

    Panel 1 (top-left): Corner of a book
    - Draw a book corner with two edges meeting at 90°
    - Show the right angle symbol (small square)
    - Label: "Book Corner"

    Panel 2 (top-right): Street intersection
    - Aerial view of two streets crossing at right angles
    - Show the four right angles formed
    - Label: "Street Intersection"

    Panel 3 (bottom-left): Picture frame corner
    - Corner of a picture frame
    - Right angle marked with square symbol
    - Label: "Picture Frame"

    Panel 4 (bottom-right): Geometric notation
    - Clean diagram showing ∠ABC = 90°
    - Right angle symbol at vertex
    - Label: "Geometric Notation: ∠ABC = 90°"

    Color scheme:
    - Each panel with different background color (light pastels)
    - Right angle symbols in red for emphasis
    - Clean, modern illustration style

    Overall title: "Right Angles in the Real World"

    Implementation: SVG illustration or hand-drawn style diagram
</details>

### Obtuse Angles

An **obtuse angle** measures greater than 90° but less than 180°. The word "obtuse" means "blunt" or "dull," which describes the wider opening of these angles compared to acute angles.

### Straight Angles

A **straight angle** measures exactly 180°. It forms a straight line, with the two rays pointing in exactly opposite directions from the vertex. While it might not look like a typical angle, a straight angle is still classified as an angle because it's formed by two rays sharing a common endpoint.

#### Drawing: Angle Classification Interactive

<iframe src="../../sims/angle-classification/main.html" height="552px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Angle Classification Challenge</summary>
    Type: microsim

    **Learning Objective:** Students will classify angles as acute, right, obtuse, or straight based on their measures (Bloom's: **Understanding** and **Applying**)

    Purpose: Interactive quiz-style game for practicing angle classification

    Canvas layout (700x550px):
    - Question area at top (700x80): Display the angle measure
    - Drawing area in middle (700x370): Show a visual representation of the angle
    - Answer buttons at bottom (700x100): Four classification buttons

    Visual elements:
    - Random angle displayed visually with two colored rays
    - Angle measure shown as text: "Classify this angle: 67°"
    - Visual representation matches the stated measure
    - Score counter in top-right corner

    Interactive controls:
    - Four buttons in a row:
      1. "Acute (0° < x < 90°)"
      2. "Right (x = 90°)"
      3. "Obtuse (90° < x < 180°)"
      4. "Straight (x = 180°)"
    - "Next Angle" button appears after answering
    - Score display: "Score: X/Y"

    Behavior:
    - Generate a random angle measure between 1° and 180°
    - Display the angle visually
    - Student clicks classification button
    - Immediate feedback:
      - Correct: Green flash, "Correct! ✓", score increases
      - Incorrect: Red flash, "Try again" with explanation
    - "Next Angle" button loads a new random angle
    - Track score out of total attempts

    Default parameters:
    - Starting score: 0/0
    - Background: Light gradient (white to light blue)
    - Button colors: Blue (unselected), green (correct), red (incorrect)

    Special features:
    - Generate variety: ensure mix of all four angle types
    - For beginners: include obvious examples (like exactly 45°, 90°, 135°, 180°)
    - Educational feedback: "An obtuse angle is greater than 90° but less than 180°"

    Implementation: p5.js with button elements and random angle generation
</details>

## Special Angle Pairs

Beyond individual angle classifications, certain pairs of angles have special relationships based on their measures. Understanding these relationships is crucial for solving geometric problems.

### Complementary Angles

Two angles are **complementary** if their measures add up to exactly 90°. The angles don't need to be adjacent (next to each other)—they just need to sum to 90°.

#### Equation: Sum of Complementary Angles

$m∠A + m∠B = 90°$

where:

- $m∠A$ is the measure of angle A
- $m∠B$ is the measure of angle B

For example, a 30° angle and a 60° angle are complementary because 30° + 60° = 90°.

#### Diagram: Complementary Angles Visual

<iframe src="../../sims/complementary-angles-visual/main.html" height="402px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Complementary Angles Examples</summary>
    Type: diagram

    Purpose: Show both adjacent and non-adjacent complementary angles

    **Learning Objective:** Students will identify complementary angles and calculate missing angle measures (Bloom's: **Applying**)

    Layout: Two side-by-side examples (800x400px total)

    Left example (Adjacent Complementary Angles):
    - Show a right angle (90°) divided into two parts
    - One part labeled 35° (in blue)
    - Other part labeled 55° (in red)
    - Right angle symbol at the vertex
    - Equation below: "35° + 55° = 90°"
    - Label: "Adjacent Complementary Angles"

    Right example (Non-adjacent Complementary Angles):
    - Show two separate angles in different locations
    - First angle: 25° (in green)
    - Second angle: 65° (in orange)
    - Dotted line connecting them with a "+" symbol
    - Equation below: "25° + 65° = 90°"
    - Label: "Non-adjacent Complementary Angles"

    Color scheme:
    - Background: Cream or light yellow
    - Angle arcs filled with semi-transparent colors matching their rays
    - Equations in bold black text

    Annotations:
    - Title at top: "Complementary Angles: Two angles that sum to 90°"
    - Note at bottom: "Complementary angles can be adjacent or non-adjacent"

    Implementation: SVG or static p5.js drawing
</details>

### Supplementary Angles

Two angles are **supplementary** if their measures add up to exactly 180°. Like complementary angles, supplementary angles don't need to be adjacent.

#### Equation: Sum of Supplementary Angles

$m∠A + m∠B = 180°$

where:

- $m∠A$ is the measure of angle A
- $m∠B$ is the measure of angle B

A common example of supplementary angles is a 120° angle paired with a 60° angle, since 120° + 60° = 180°.

!!! mascot-tip "Here's a Tip!"

    How to remember the difference: **C**omplementary adds to a
    **C**orner (90°), and **S**upplementary adds to a **S**traight
    line (180°). That little trick will save you every time!

#### Drawing: Complementary and Supplementary Angle Finder

<iframe src="../../sims/angle-pair-calculator/main.html" height="502px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Angle Pair Calculator</summary>
    Type: microsim

    **Learning Objective:** Students will calculate complementary and supplementary angles and understand their relationships (Bloom's: **Applying** and **Analyzing**)

    Purpose: Interactive tool to find complementary and supplementary angle pairs

    Canvas layout (650x500px):
    - Input area at top (650x100): Slider to set initial angle
    - Visual display area (650x300): Show both angle pairs graphically
    - Result area at bottom (650x100): Display calculations

    Visual elements:
    - Left side: Original angle shown in blue
    - Middle: Complementary angle shown in green (if exists)
    - Right side: Supplementary angle shown in orange
    - For complementary: show both angles forming a right angle together
    - For supplementary: show both angles forming a straight angle together

    Interactive controls:
    - Slider at top:
      - Label: "Choose an angle: X°"
      - Range: 1° to 179°
      - Default: 40°
      - Width: 500px

    Display elements:
    - Original angle measure: "Your angle: 40°"
    - Complementary calculation:
      - If angle < 90°: "Complementary angle: 50°" (show 40° + 50° = 90°)
      - If angle ≥ 90°: "No complementary angle (your angle is ≥ 90°)"
    - Supplementary calculation: "Supplementary angle: 140°" (show 40° + 140° = 180°)

    Visual behavior:
    - As slider moves, all angles update dynamically
    - Complementary display grays out if original angle ≥ 90°
    - Color coding remains consistent
    - Show visual addition: two angles forming 90° or 180°

    Default parameters:
    - Starting angle: 40°
    - Background: Light blue gradient

    Special features:
    - When angle = 90°: Show special message "Your angle is a right angle! It has no complement but supplements to another 90°"
    - Visual feedback: angles animate smoothly when slider moves

    Implementation: p5.js with dynamic angle rendering
</details>

## Adjacent Angles and Linear Pairs

### Adjacent Angles

Two angles are **adjacent** if they share a common vertex, share a common side, and do not overlap. Think of adjacent angles as "neighbors"—they're right next to each other.

The key requirements for adjacent angles are:

1. Common vertex (same corner point)
2. Common side (one ray is shared between both angles)
3. Non-overlapping (the angles don't cover the same space)

#### Diagram: Adjacent vs. Non-Adjacent Angles

<iframe src="../../sims/adjacent-angles-comparison/main.html" height="352px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Adjacent Angles Comparison</summary>
    Type: diagram

    Purpose: Visually distinguish adjacent angles from non-adjacent angles

    **Learning Objective:** Students will identify adjacent angles by checking for common vertex and common side (Bloom's: **Understanding** and **Analyzing**)

    Layout: Three examples in a row (900x350px total)

    Example 1 (Adjacent Angles - YES):
    - Show angles ∠ABC and ∠CBD
    - Point B is the shared vertex
    - Ray BC is the shared side
    - Angle ABC in blue (30°)
    - Angle CBD in red (45°)
    - Green checkmark above
    - Label: "✓ Adjacent Angles"
    - List below: "• Common vertex B • Common side BC • No overlap"

    Example 2 (Not Adjacent - Different Vertices):
    - Show two angles at different locations
    - No shared vertex
    - Red X above
    - Label: "✗ Not Adjacent (different vertices)"

    Example 3 (Not Adjacent - Overlapping):
    - Show two angles that share vertex and side but overlap
    - Overlapping region shaded in purple
    - Red X above
    - Label: "✗ Not Adjacent (overlapping)"

    Color scheme:
    - Background: White
    - Angle arcs: Semi-transparent fills
    - Vertices: Large colored dots
    - Labels: Bold, clear fonts

    Overall title: "What Makes Angles Adjacent?"

    Implementation: SVG diagram with clear visual distinctions
</details>

### Linear Pairs

A **linear pair** is a special type of adjacent angle pair. Two adjacent angles form a linear pair if their non-common sides form a straight line (180°). This means that the two angles in a linear pair are always supplementary—they always add up to 180°.

#### Key Property of Linear Pairs

If two angles form a linear pair, then they are supplementary.

This is an important property because it allows us to find unknown angle measures. If you know one angle in a linear pair, you can always find the other by subtracting from 180°.

#### Diagram: Linear Pair Structure

<iframe src="../../sims/linear-pair-structure/main.html" height="402px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Linear Pair Anatomy</summary>
    Type: diagram

    Purpose: Show the defining characteristics of a linear pair

    **Learning Objective:** Students will recognize linear pairs and use the linear pair property to find unknown angles (Bloom's: **Understanding** and **Applying**)

    Visual elements:
    - Straight line drawn horizontally across the canvas
    - Ray extending upward from a point on the line, creating two angles
    - Left angle (∠1) labeled 110° in blue
    - Right angle (∠2) labeled 70° in red
    - Vertex marked clearly where ray meets the line
    - Straight angle notation showing 180° for the whole line

    Annotations:
    - Arrow pointing to the straight line: "Non-common sides form a straight line"
    - Arrow pointing to shared vertex: "Common vertex"
    - Arrow pointing to the upward ray: "Common side"
    - Equation shown: "m∠1 + m∠2 = 110° + 70° = 180°"
    - Callout box: "Linear pairs are ALWAYS supplementary!"

    Color scheme:
    - Background: Light cream
    - Straight line: Black, thick
    - Ray: Dark gray, thick
    - Angle arcs: Blue and red, semi-transparent fills
    - Text: Bold black for labels, blue for equation

    Dimensions: 700x400px

    Implementation: SVG or p5.js static diagram
</details>

## Vertical Angles

!!! mascot-thinking "Think About It..."

    Here's something beautiful: vertical angles are ALWAYS equal, no
    matter how the lines are tilted. We proved this in Chapter 2 — and
    now you get to use that theorem everywhere!

When two lines intersect, they form four angles at the point of intersection. The angles that are opposite each other are called **vertical angles** (sometimes called "opposite angles"). Vertical angles have a special property: they are always congruent, meaning they have equal measures.

#### Diagram: Vertical Angles at Intersection

<iframe src="../../sims/vertical-angles-intersection/main.html" height="602px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Vertical Angles Formation</summary>
    Type: diagram

    Purpose: Show how vertical angles are formed when two lines intersect

    **Learning Objective:** Students will identify vertical angles and apply the vertical angles theorem (Bloom's: **Understanding** and **Applying**)

    Visual elements:
    - Two straight lines intersecting at a central point
    - One line in blue (diagonal from top-left to bottom-right)
    - Other line in red (diagonal from top-right to bottom-left)
    - Four angles formed, labeled ∠1, ∠2, ∠3, ∠4 (clockwise from top)
    - ∠1 and ∠3 highlighted in green (one pair of vertical angles)
    - ∠2 and ∠4 highlighted in yellow (other pair of vertical angles)
    - Angle measures shown:
      - ∠1 = 130°
      - ∠2 = 50°
      - ∠3 = 130°
      - ∠4 = 50°

    Annotations:
    - Bracket connecting ∠1 and ∠3: "Vertical angles (equal)"
    - Bracket connecting ∠2 and ∠4: "Vertical angles (equal)"
    - Theorem box: "Vertical Angles Theorem: Vertical angles are congruent"
    - Note: "∠1 ≅ ∠3 and ∠2 ≅ ∠4"

    Color scheme:
    - Background: White
    - Lines: Bold, bright colors (blue and red)
    - Angle highlights: Semi-transparent green and yellow
    - Text: Black, bold for emphasis

    Dimensions: 600x600px

    Implementation: SVG or p5.js static drawing
</details>

#### Drawing: Vertical Angles Explorer

<iframe src="../../sims/vertical-angles-explorer/main.html" height="602px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Interactive Vertical Angles Demonstration</summary>
    Type: microsim

    **Learning Objective:** Students will discover that vertical angles are always congruent by manipulating intersecting lines (Bloom's: **Analyzing**)

    Purpose: Allow students to drag lines and observe that vertical angles remain equal

    Canvas layout (700x600px):
    - Main drawing area (700x520): Two intersecting lines
    - Control area at bottom (700x80): Display angle measures

    Visual elements:
    - Two lines intersecting at the center of canvas
    - One line rotatable by dragging its endpoints (in blue)
    - Second line fixed or also rotatable (in red)
    - Four angles labeled ∠1, ∠2, ∠3, ∠4
    - Vertical angle pairs highlighted with matching colors:
      - ∠1 and ∠3 with green arcs
      - ∠2 and ∠4 with yellow arcs
    - Draggable handles at line endpoints (circles)

    Interactive controls:
    - Drag either endpoint of the blue line to rotate it
    - Angles update in real-time as line rotates
    - Display at bottom shows all four angle measures:
      - "∠1 = X° | ∠2 = Y° | ∠3 = X° | ∠4 = Y°"
    - Highlight matching values: "∠1 = ∠3" and "∠2 = ∠4" shown in green

    Behavior:
    - As user drags line endpoints, angles recalculate
    - Vertical angle pairs always show equal measures
    - Color coding helps identify which angles are vertical pairs
    - Smooth animation as angles change

    Default parameters:
    - Initial configuration: Lines intersecting at 60° and 120° angles
    - Background: Alice blue
    - Line thickness: 4px

    Special features:
    - When angles are equal, show a brief animation (glow or pulse)
    - Display equation: "m∠1 = m∠3" and "m∠2 = m∠4"
    - Show that adjacent angles are supplementary too

    Implementation: p5.js with mouse interaction and dynamic angle calculation
</details>

## Angle Bisectors

An **angle bisector** is a ray that divides an angle into two congruent (equal) angles. The word "bisect" means "to cut in two equal parts."

If ray BD bisects ∠ABC, then:
- m∠ABD = m∠DBC
- m∠ABD = (1/2) × m∠ABC

Angle bisectors are useful in constructions and proofs, and they play an important role in triangle geometry.

#### Diagram: Angle Bisector Construction

<iframe src="../../sims/angle-bisector-construction/main.html" height="652px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Angle Bisector Visual</summary>
    Type: diagram

    Purpose: Show an angle bisector dividing an angle into two equal parts

    **Learning Objective:** Students will identify angle bisectors and calculate angle measures using the bisector property (Bloom's: **Applying**)

    Visual elements:
    - Original angle ∠ABC with vertex at B
    - Ray BA extending to the left (in blue)
    - Ray BC extending to the right (in red)
    - Bisector ray BD extending upward (in green, dashed)
    - Left half-angle ∠ABD = 35° (blue arc)
    - Right half-angle ∠DBC = 35° (red arc)
    - Original full angle noted: ∠ABC = 70°

    Annotations:
    - Arrow pointing to BD: "Angle Bisector"
    - Congruence marks (small arcs) on both half-angles to show equality
    - Equation: "m∠ABD = m∠DBC = 35°"
    - Note: "BD bisects ∠ABC"
    - Second equation: "m∠ABC = 2 × 35° = 70°"

    Color scheme:
    - Background: Light yellow
    - Rays: Solid blue and red, dashed green for bisector
    - Angle arcs: Semi-transparent, matching ray colors
    - Congruence marks: Small identical arcs in black

    Dimensions: 650x500px

    Implementation: SVG with geometric precision
</details>

## Angles Formed by Parallel Lines and Transversals

When a line (called a **transversal**) crosses two parallel lines, eight angles are formed. These angles have special relationships that are crucial for solving problems and proving theorems.

Let's first understand the setup: imagine two parallel lines lying flat, like railroad tracks. Now imagine a third line crossing both of them—that's the transversal. The eight angles formed have special names based on their positions.

#### Diagram: Parallel Lines Cut by a Transversal Setup

<iframe src="../../sims/transversal-eight-angles/main.html" height="552px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Transversal and Eight Angles</summary>
    Type: diagram

    Purpose: Introduce the parallel lines and transversal configuration with all eight angles labeled

    **Learning Objective:** Students will identify the eight angles formed when a transversal intersects parallel lines (Bloom's: **Remembering** and **Understanding**)

    Visual elements:
    - Two horizontal parallel lines (in blue)
    - Transversal line crossing both at an angle (in red)
    - All eight angles numbered 1-8 (clockwise from top-left)
    - Parallel line symbols (small arrows) on both blue lines
    - Clean, spacious layout

    Angle numbering:
    - At top intersection: ∠1, ∠2, ∠3, ∠4 (clockwise from top-left)
    - At bottom intersection: ∠5, ∠6, ∠7, ∠8 (clockwise from top-left)

    Annotations:
    - Label: "Line l" and "Line m" for the parallel lines
    - Label: "Transversal t" for the crossing line
    - Symbol: "l ∥ m" (parallel notation)
    - Title: "Eight Angles Formed by Parallel Lines and a Transversal"

    Color scheme:
    - Background: White
    - Parallel lines: Blue, thick
    - Transversal: Red, thick
    - Angle labels: Black, clear font
    - Angle arcs: Light gray

    Dimensions: 700x550px

    Implementation: SVG diagram with precise geometric construction
</details>

### Corresponding Angles

**Corresponding angles** are in the same position at each intersection. When parallel lines are cut by a transversal, corresponding angles are congruent (equal).

For example, ∠1 and ∠5 are corresponding angles—they're both in the upper-left position at their respective intersections. Other corresponding pairs include: ∠2 and ∠6, ∠3 and ∠7, ∠4 and ∠8.

#### Corresponding Angles Postulate

When two parallel lines are cut by a transversal, corresponding angles are congruent.

### Alternate Interior Angles

**Alternate interior angles** are on opposite sides of the transversal and between (interior to) the parallel lines. When parallel lines are cut by a transversal, alternate interior angles are congruent.

The alternate interior angle pairs are:
- ∠3 and ∠6
- ∠4 and ∠5

These angles are "alternate" because they're on opposite sides of the transversal, and "interior" because they're between the two parallel lines.

### Alternate Exterior Angles

**Alternate exterior angles** are on opposite sides of the transversal and outside (exterior to) the parallel lines. When parallel lines are cut by a transversal, alternate exterior angles are congruent.

The alternate exterior angle pairs are:
- ∠1 and ∠8
- ∠2 and ∠7

### Same-Side Interior Angles

!!! mascot-warning "Watch Out!"

    Don't fall into the trap! Three of the four transversal angle pairs
    are congruent, but same-side interior angles are supplementary —
    they add to 180°, not equal each other. This is the one students
    mix up most often.

**Same-side interior angles** (also called consecutive interior angles or co-interior angles) are on the same side of the transversal and between the parallel lines. When parallel lines are cut by a transversal, same-side interior angles are supplementary—they add up to 180°.

The same-side interior angle pairs are:
- ∠3 and ∠5
- ∠4 and ∠6

#### Drawing: Parallel Lines and Transversal Angle Explorer

<iframe src="../../sims/transversal-angle-explorer/main.html" height="652px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Interactive Transversal Angle Relationships</summary>
    Type: microsim

    **Learning Objective:** Students will identify corresponding, alternate interior, alternate exterior, and same-side interior angles, and verify their relationships (Bloom's: **Analyzing** and **Evaluating**)

    Purpose: Interactive tool to explore all four types of angle relationships with parallel lines and transversals

    Canvas layout (800x650px):
    - Main drawing area (800x530): Parallel lines with adjustable transversal
    - Control area at bottom (800x120): Buttons and display

    Visual elements:
    - Two horizontal parallel lines (blue)
    - Transversal line crossing both (red)
    - Eight angles numbered 1-8
    - Angle measures displayed next to each angle
    - Draggable handle on transversal to adjust its slope

    Interactive controls:
    - Four buttons to highlight different angle relationships:
      1. "Corresponding Angles" - highlights ∠1&∠5, ∠2&∠6, ∠3&∠7, ∠4&∠8 in green
      2. "Alternate Interior" - highlights ∠3&∠6, ∠4&∠5 in yellow
      3. "Alternate Exterior" - highlights ∠1&∠8, ∠2&∠7 in orange
      4. "Same-Side Interior" - highlights ∠3&∠5, ∠4&∠6 in purple
    - "Show All" button to display all relationships
    - "Reset" button to clear highlights
    - Draggable slider or handle to rotate transversal

    Behavior:
    - User drags transversal handle to change angle of intersection
    - All eight angles update in real-time with measures
    - Clicking a relationship button:
      - Highlights the relevant angle pairs with color-coded arcs
      - Displays equations showing relationships:
        - Corresponding: "∠1 = ∠5 = X°"
        - Alternate Interior: "∠3 = ∠6 = Y°"
        - Alternate Exterior: "∠1 = ∠8 = X°"
        - Same-Side Interior: "∠3 + ∠5 = 180°"
    - All relationships remain true as transversal rotates

    Default parameters:
    - Initial transversal angle: 120° to horizontal
    - Background: Light gray
    - Starting view: No highlights

    Special features:
    - When hovering over an angle, show its relationship to all other angles
    - Display a small legend explaining the angle pair types
    - Verification text: "These angles are equal!" or "These angles sum to 180°"
    - Color-code matching angle values

    Implementation: p5.js with interactive dragging and dynamic angle calculations
</details>

#### Diagram: Summary of Angle Relationships with Parallel Lines

<iframe src="../../sims/angle-relationships-summary/main.html" height="552px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Angle Relationships Reference Chart</summary>
    Type: diagram

    Purpose: Provide a quick visual reference for all four angle relationship types

    **Learning Objective:** Students will categorize angle pairs by their relationships and properties (Bloom's: **Understanding** and **Remembering**)

    Layout: Four panels in a 2x2 grid (900x700px total)

    Panel 1 - Corresponding Angles:
    - Small diagram showing parallel lines and transversal
    - Highlight one pair: ∠1 and ∠5 in green
    - Property: "Corresponding Angles are CONGRUENT"
    - Example: "∠1 = ∠5"
    - Icon: "≅" symbol

    Panel 2 - Alternate Interior Angles:
    - Small diagram showing parallel lines and transversal
    - Highlight one pair: ∠3 and ∠6 in yellow
    - Property: "Alternate Interior Angles are CONGRUENT"
    - Example: "∠3 = ∠6"
    - Icon: "≅" symbol

    Panel 3 - Alternate Exterior Angles:
    - Small diagram showing parallel lines and transversal
    - Highlight one pair: ∠1 and ∠8 in orange
    - Property: "Alternate Exterior Angles are CONGRUENT"
    - Example: "∠1 = ∠8"
    - Icon: "≅" symbol

    Panel 4 - Same-Side Interior Angles:
    - Small diagram showing parallel lines and transversal
    - Highlight one pair: ∠3 and ∠5 in purple
    - Property: "Same-Side Interior Angles are SUPPLEMENTARY"
    - Example: "∠3 + ∠5 = 180°"
    - Icon: "+" symbol

    Color scheme:
    - Each panel with matching color theme
    - Background: Light versions of the highlight colors
    - Text: Bold, clear, consistent fonts
    - Diagrams: Simplified versions with clear angle highlighting

    Overall title: "Angle Relationships When Parallel Lines Are Cut by a Transversal"

    Implementation: SVG or infographic-style illustration
</details>

## Solving Problems with Angle Relationships

!!! mascot-encourage "You've Got This!"

    With so many angle relationships in your toolkit, you can crack
    almost any angle problem. The key is identifying which relationship
    applies — then the algebra is the easy part!

Now that you understand all these angle relationships, you can use them to solve for unknown angle measures. The key is to identify which relationship applies, then set up an equation.

Let's look at some common problem-solving strategies:

**Strategy 1: Using Complementary or Supplementary Angles**

If you know two angles are complementary, set up the equation: $m∠A + m∠B = 90°$

If you know two angles are supplementary, set up the equation: $m∠A + m∠B = 180°$

**Strategy 2: Using Vertical Angles**

If two angles are vertical angles, they're congruent: $m∠1 = m∠3$

**Strategy 3: Using Linear Pairs**

If two angles form a linear pair, they're supplementary: $m∠1 + m∠2 = 180°$

**Strategy 4: Using Parallel Lines and Transversals**

Identify the angle relationship (corresponding, alternate interior, etc.), then:
- If they're congruent, set the measures equal
- If they're supplementary, add them to get 180°

#### Drawing: Angle Relationship Problem Solver

<iframe src="../../sims/angle-problem-solver/main.html" height="702px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Interactive Angle Problem Practice</summary>
    Type: microsim

    **Learning Objective:** Students will apply angle relationships to solve for unknown angle measures in multi-step problems (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Guided practice tool for solving angle relationship problems with step-by-step hints

    Canvas layout (750x700px):
    - Problem display area at top (750x80): Shows the current problem
    - Diagram area in middle (750x420): Visual representation of the problem
    - Interaction area at bottom (750x200): Input field, hints, and feedback

    Visual elements:
    - Geometric diagram matching the problem type
    - Known angles labeled with measures or variables
    - Unknown angle marked with "?" or variable
    - Color coding: known angles in blue, unknown in red

    Problem types (randomly generated):
    1. Complementary angles: "If ∠A = 35°, find its complement"
    2. Supplementary angles: "If ∠B = 117°, find its supplement"
    3. Vertical angles: "If ∠1 = 75°, find ∠3 (vertical to ∠1)"
    4. Linear pair: "∠1 and ∠2 form a linear pair. If m∠1 = 68°, find m∠2"
    5. Angle bisector: "BD bisects ∠ABC. If m∠ABC = 84°, find m∠ABD"
    6. Corresponding angles: "Lines l ∥ m, transversal t. If ∠1 = 110°, find ∠5"
    7. Alternate interior: "Lines l ∥ m. If ∠3 = 65°, find ∠6"
    8. Same-side interior: "Lines l ∥ m. If ∠4 = 75°, find ∠6"

    Interactive controls:
    - Input box: "Enter your answer: ___°"
    - "Check Answer" button
    - "Hint" button (gives progressive hints)
    - "Show Solution" button (reveals step-by-step solution)
    - "Next Problem" button

    Behavior:
    - Random problem generated from the eight types
    - Diagram updates to match problem type
    - Student enters answer in degrees
    - "Check Answer":
      - Correct: Green flash, "Correct! ✓", shows explanation
      - Incorrect: "Not quite. Try again or click Hint"
    - "Hint" provides progressive clues:
      - Hint 1: Identify the relationship
      - Hint 2: Show the equation
      - Hint 3: Show the solution steps
    - "Show Solution" reveals complete work with explanation
    - Track success rate

    Default parameters:
    - Starting problem: Random
    - Background: White to light blue gradient
    - Score counter visible

    Special features:
    - Adaptive difficulty: start with simple problems, increase complexity
    - Problems use whole number angles
    - Some problems require multiple steps (e.g., "∠1 and ∠2 are supplementary. ∠2 and ∠3 are vertical. If ∠1 = 130°, find ∠3")
    - Educational feedback explains why the answer is correct
    - Visual highlighting: when answer is checked, highlight the relevant angles

    Implementation: p5.js with text input, button handling, and problem generation logic
</details>

## Real-World Applications

Angle relationships appear throughout the world around us, not just in math class. Understanding these relationships helps in:

- **Architecture and Construction**: Ensuring walls meet at right angles, roof pitches are correct, and structures are stable
- **Navigation**: Plotting courses using compass bearings and turning angles
- **Art and Design**: Creating perspective drawings, symmetric patterns, and balanced compositions
- **Engineering**: Designing gears, linkages, and mechanical systems that move precisely
- **Sports**: Analyzing trajectories, banking angles on racetracks, and optimal launch angles

#### Infographic: Angles in the Real World
<details markdown="1">
    <summary>Interactive Real-World Angle Applications</summary>
    Type: infographic

    Purpose: Show diverse applications of angle relationships across different fields

    **Learning Objective:** Students will connect angle relationships to real-world contexts and careers (Bloom's: **Understanding** and **Evaluating**)

    Layout: Interactive grid with six clickable categories (900x650px)

    Categories (arranged in 2 rows of 3):

    1. **Architecture** (top-left):
       - Icon: Building/blueprint
       - Thumbnail: Building corner with right angles
       - Click to expand: Details about perpendicular walls, roof angles, and structural support

    2. **Navigation** (top-middle):
       - Icon: Compass
       - Thumbnail: Map with bearing lines
       - Click to expand: How ships and planes use angle bearings, compass headings

    3. **Art & Design** (top-right):
       - Icon: Palette/paintbrush
       - Thumbnail: Perspective drawing with vanishing points
       - Click to expand: Perspective angles, symmetry, golden angles

    4. **Engineering** (bottom-left):
       - Icon: Gear
       - Thumbnail: Gears meshing at angles
       - Click to expand: Mechanical linkages, gear ratios, and cam angles

    5. **Sports** (bottom-middle):
       - Icon: Soccer ball
       - Thumbnail: Basketball arc trajectory
       - Click to expand: Launch angles, banking on tracks, optimal angles for performance

    6. **Everyday Life** (bottom-right):
       - Icon: House
       - Thumbnail: Clock showing angle between hands
       - Click to expand: Clock angles, ramp slopes, TV viewing angles

    Interactive features:
    - Hover over category: Icon enlarges, category name appears
    - Click category: Expands to full panel showing:
      - 2-3 specific examples with mini diagrams
      - Angle types used (complementary, supplementary, etc.)
      - Fun fact related to that field
      - "Learn More" link to external resource
    - Back button to return to main grid

    Color scheme:
    - Each category has unique color theme
    - Modern, flat design with icons
    - Bright, engaging colors appropriate for high school

    Responsive design:
    - Grid layout adapts to canvas size
    - Smooth transitions between grid and expanded views

    Implementation: HTML/CSS/JavaScript with click handlers and panel expansion, or p5.js with interactive elements
</details>

## Summary and Key Concepts

In this chapter, you've explored the world of angles and their relationships. Here's a summary of the key concepts:

**Angle Classifications:**

- **Acute angle**: Measures between 0° and 90°
- **Right angle**: Measures exactly 90°
- **Obtuse angle**: Measures between 90° and 180°
- **Straight angle**: Measures exactly 180°

**Special Angle Pairs:**

- **Complementary angles**: Two angles that add to 90°
- **Supplementary angles**: Two angles that add to 180°
- **Adjacent angles**: Angles that share a vertex and a side, with no overlap
- **Vertical angles**: Opposite angles formed by two intersecting lines (always congruent)
- **Linear pair**: Adjacent angles whose non-common sides form a straight line (always supplementary)

**Angle Bisectors:**

- An angle bisector divides an angle into two congruent angles

**Parallel Lines and Transversals:**

When a transversal crosses two parallel lines, special angle relationships are formed:

- **Corresponding angles**: Same position at each intersection (congruent)
- **Alternate interior angles**: Opposite sides of transversal, between parallel lines (congruent)
- **Alternate exterior angles**: Opposite sides of transversal, outside parallel lines (congruent)
- **Same-side interior angles**: Same side of transversal, between parallel lines (supplementary)

!!! mascot-celebration "Great Work!"

    You've mastered angle classifications, special pairs, and all four
    transversal angle relationships. That's a powerful toolkit that will
    unlock proofs about triangles and polygons in the chapters ahead!

These angle relationships are foundational tools for proving theorems about triangles, polygons, and more complex geometric figures in the chapters ahead. Mastering these concepts now will make future topics much easier to understand.

#### Diagram: Chapter Concept Map

<iframe src="../../sims/chapter-03-concept-map/main.html" height="502px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Concept Relationships Map</summary>
    Type: graph-model

    Purpose: Show how all 14 concepts in this chapter relate to each other

    **Learning Objective:** Students will understand the hierarchical and interconnected nature of angle concepts (Bloom's: **Analyzing** and **Evaluating**)

    Node types:

    1. **Base Concept** (large purple circles):
       - "Angle" (center, largest node)

    2. **Classification Concepts** (blue squares):
       - "Acute Angle"
       - "Right Angle"
       - "Obtuse Angle"
       - "Straight Angle"

    3. **Relationship Concepts** (green circles):
       - "Complementary Angles"
       - "Supplementary Angles"
       - "Adjacent Angles"
       - "Vertical Angles"
       - "Linear Pair"

    4. **Advanced Concepts** (orange diamonds):
       - "Angle Bisector"
       - "Corresponding Angles"
       - "Alternate Interior Angles"
       - "Alternate Exterior Angles"
       - "Same-Side Interior Angles"

    Edge types:

    1. "is-a" relationship (solid black arrows):
       - Angle → Acute Angle, Right Angle, Obtuse Angle, Straight Angle

    2. "uses" relationship (dashed blue arrows):
       - Complementary Angles → Acute Angle, Right Angle
       - Supplementary Angles → Straight Angle
       - Linear Pair → Supplementary Angles

    3. "requires" relationship (dotted green arrows):
       - Adjacent Angles → Angle
       - Vertical Angles → Angle
       - Linear Pair → Adjacent Angles
       - Angle Bisector → Angle

    4. "formed-by" relationship (solid orange arrows):
       - Corresponding Angles → Angle
       - Alternate Interior Angles → Angle
       - Alternate Exterior Angles → Angle
       - Same-Side Interior Angles → Supplementary Angles

    Layout: Hierarchical with "Angle" at center/top
    - Classification concepts in a row below
    - Relationship concepts in next row
    - Advanced concepts at bottom

    Interactive features:
    - Hover over node: Show definition tooltip
    - Click node: Highlight all connected concepts
    - Click edge: Show relationship description
    - Filter buttons: "Show only classifications", "Show only relationships", "Show all"

    Visual styling:
    - Node size based on conceptual importance
    - Color coding by category
    - Edge thickness based on strength of relationship
    - Smooth, force-directed layout

    Legend:
    - Node shapes and colors
    - Edge types and meanings
    - Interactive instructions

    Implementation: vis-network JavaScript library
    Canvas size: 900x700px
    Background: White with light grid
</details>

## Practice Problems

To solidify your understanding, try these practice problems:

1. If ∠A and ∠B are complementary, and m∠A = 38°, find m∠B.

2. Two angles form a linear pair. If one angle measures 135°, what is the measure of the other angle?

3. Lines l and m are parallel, cut by transversal t. If ∠1 = 72°, find the measures of all seven other angles.

4. Ray BX bisects ∠ABC. If m∠ABC = 118°, find m∠ABX.

5. ∠P and ∠Q are vertical angles. If m∠P = 3x + 15 and m∠Q = 5x - 25, find the value of x and the measure of both angles.

**Solutions:**

1. m∠B = 52° (since 38° + 52° = 90°)

2. The other angle measures 45° (since 135° + 45° = 180°)

3. ∠1 = 72°, ∠2 = 108°, ∠3 = 108°, ∠4 = 72°, ∠5 = 72°, ∠6 = 108°, ∠7 = 108°, ∠8 = 72°

4. m∠ABX = 59° (half of 118°)

5. Set 3x + 15 = 5x - 25, solve to get x = 20, then m∠P = m∠Q = 75°

---

**Next Steps:** Now that you understand angle relationships, you're ready to explore how these concepts apply to triangles, parallel lines, and polygon properties in upcoming chapters!
