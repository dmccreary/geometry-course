# Geometric Constructions

## Summary

This chapter teaches compass and straightedge construction techniques for creating precise geometric figures and exploring mathematical relationships. You'll learn classical construction methods passed down from ancient Greek mathematicians, including how to copy segments and angles, bisect figures, and construct parallel and perpendicular lines. These hands-on techniques develop spatial reasoning and provide concrete demonstrations of geometric theorems.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Segment Bisector
2. Perpendicular Bisector
3. Compass Construction
4. Straightedge Construction
5. Copying a Segment
6. Copying an Angle
7. Bisecting a Segment
8. Bisecting an Angle
9. Constructing Perpendiculars
10. Constructing Parallels
11. Parallel Postulate

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)
- [Chapter 3: Angles and Angle Relationships](../03-angles-and-relationships/index.md)

---

## Introduction to Geometric Constructions

!!! mascot-welcome "Let's Figure This Out Together!"

    Welcome to geometric constructions! In this chapter, you'll create
    precise figures using only a compass and straightedge — the same two
    tools mathematicians have used for over 2,000 years. Let's build
    something beautiful!

Imagine creating perfect geometric figures using only two simple tools: a compass and a straightedge. For over 2,000 years, mathematicians have used these tools to explore the fundamental properties of shapes and prove important theorems. In this chapter, you'll learn the classical construction techniques that allow you to create precise geometric figures without measurements—only using the relationships between points, lines, and circles.

Geometric constructions are more than just drawing exercises. They reveal deep mathematical truths and help you understand *why* geometric relationships work, not just *that* they work. Every construction you perform is a hands-on proof of a geometric principle. These techniques were so important to ancient Greek mathematicians that they posed famous construction challenges, some of which took millennia to solve!

In the modern world, while we have digital tools and CAD software, understanding compass and straightedge constructions develops your spatial reasoning, problem-solving skills, and appreciation for mathematical elegance.

## The Tools of Construction

### The Compass

A **compass** is a tool with two legs: one holds a pencil or marking point, and the other has a fixed point. The compass allows you to draw circles and arcs of any radius. In classical constructions, the compass has one special property: it "collapses" when you lift it from the page, meaning you cannot directly transfer a distance from one location to another.

The compass is powerful because circles have perfect symmetry—every point on a circle is exactly the same distance from the center.

#### Diagram: Parts of a Compass and Basic Circle Construction

<iframe src="../../sims/compass-parts/main.html" height="452px" width="100%" scrolling="no"></iframe>

[Compass Parts MicroSim](../../sims/compass-parts/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Compass Anatomy and Circle Drawing</summary>
    Type: diagram

    Purpose: Introduce the parts of a compass and show how to draw a circle

    **Learning Objective:** Students will identify the parts of a compass and understand how circles are constructed (Bloom's: **Remembering** and **Understanding**)

    Layout: Two-panel diagram (800x400px total)

    Left panel - Compass Parts:
    - Detailed illustration of a compass
    - Label: "Fixed point (center)" with arrow pointing to sharp end
    - Label: "Pencil or marking point" with arrow pointing to drawing end
    - Label: "Adjustment screw" pointing to radius adjustment mechanism
    - Label: "Compass legs" pointing to the two arms
    - Show radius distance marked between the two points
    - Annotation: "Radius = distance between points"

    Right panel - Drawing a Circle:
    - Step 1: Show compass point placed at center (labeled "Center point C")
    - Step 2: Show compass arc beginning to trace
    - Step 3: Show complete circle with radius labeled
    - Annotation: "All points on the circle are the same distance from center C"
    - Show multiple radii drawn from center to circle (all equal length, in different colors)
    - Label: "Radius r"

    Color scheme:
    - Background: Light cream
    - Compass: Metallic gray with blue accent
    - Circle: Bold blue outline
    - Radii: Different colors (red, green, orange, purple) to show equality
    - Center point: Large red dot

    Overall title: "The Compass: Drawing Perfect Circles"

    Implementation: SVG or detailed illustration
</details>

### The Straightedge

A **straightedge** is a ruler without markings. You cannot measure distances with it—you can only draw straight lines through two points. This restriction is crucial: it forces you to use geometric relationships rather than numerical measurements.

Think of the straightedge as a tool that extends the line determined by two points infinitely in both directions (or as far as you need).

#### Diagram: Straightedge vs. Ruler

<iframe src="../../sims/straightedge-vs-ruler/main.html" height="402px" width="100%" scrolling="no"></iframe>

[Straightedge vs Ruler MicroSim](../../sims/straightedge-vs-ruler/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Straightedge Comparison</summary>
    Type: diagram

    Purpose: Distinguish between a straightedge (no measurements) and a ruler (with measurements)

    **Learning Objective:** Students will understand the difference between a straightedge and a ruler, and why constructions use straightedges (Bloom's: **Understanding** and **Analyzing**)

    Layout: Two-panel comparison (800x350px total)

    Left panel - Ruler (NOT used in constructions):
    - Drawing of a standard ruler with inch/cm markings
    - Numbers visible: 0, 1, 2, 3, 4, 5...
    - Red X over the ruler
    - Label: "Ruler (with measurements)"
    - Annotation: "✗ NOT allowed in classical constructions"
    - Note: "Measurements depend on units (inches, cm, etc.)"

    Right panel - Straightedge (USED in constructions):
    - Drawing of a plain edge with no markings
    - Green checkmark
    - Label: "Straightedge (no measurements)"
    - Annotation: "✓ Used in classical constructions"
    - Show two points A and B with line drawn through them
    - Note: "Can only draw lines through given points"
    - Additional note: "Based on relationships, not numbers"

    Color scheme:
    - Background: White
    - Ruler: Yellow with black markings
    - Straightedge: Blue
    - Checkmark: Green, X mark: Red
    - Points and lines: Black

    Overall title: "Straightedge vs. Ruler: Why the Difference Matters"

    Implementation: SVG diagram with clear visual distinction
</details>

### Compass Construction Technique

**Compass construction** refers to any geometric construction performed using a compass. The key principle is that a compass allows you to create circles and arcs, which in turn define special points and relationships.

Basic compass techniques include:

- Placing the compass point at a given location
- Adjusting the compass to a specific radius (by placing the pencil point at another location)
- Drawing complete circles or partial arcs
- Finding intersection points where arcs cross

### Straightedge Construction Technique

**Straightedge construction** refers to drawing straight lines through two points. The straightedge never works alone—you always need at least two points to determine a line. These points often come from compass constructions or are given in the problem.

## Fundamental Construction: Copying a Segment

One of the most basic constructions is **copying a segment**—creating a new line segment with the exact same length as a given segment, in a different location.

**Given:** Segment AB
**Goal:** Create segment CD with the same length as AB (CD ≅ AB)

**Construction steps:**

1. Draw a ray from point C (this will contain the new segment)
2. Set the compass radius equal to the length of AB (place compass point on A, pencil on B)
3. Without changing the compass radius, place the compass point on C
4. Draw an arc that intersects the ray; label the intersection point D
5. CD ≅ AB (the segments are congruent)

#### Drawing: Copy a Segment Interactive Construction

<iframe src="../../sims/copy-segment/main.html" height="602px" width="100%" scrolling="no"></iframe>

[Copy Segment MicroSim](../../sims/copy-segment/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Segment Copying</summary>
    Type: microsim

    **Learning Objective:** Students will perform the steps to copy a segment and understand why the construction creates congruent segments (Bloom's: **Applying** and **Understanding**)

    Purpose: Step-by-step interactive tutorial for copying a segment

    Canvas layout (750x600px):
    - Main construction area (750x480): Shows the construction in progress
    - Control area at bottom (750x120): Step buttons and instructions

    Visual elements:
    - Original segment AB shown at top (horizontal, in blue)
    - Point A on left, point B on right
    - Starting point C shown below (in green)
    - Ray extending from C (dashed gray line)
    - Compass visualization showing radius and arc
    - Final point D marked when arc intersects ray

    Step-by-step progression:

    Step 0 (Initial state):
    - Show segment AB (blue)
    - Show point C (green)
    - Instruction: "We will copy segment AB to create a new segment starting at C"

    Step 1:
    - Ray appears from C (dashed gray, extending right)
    - Instruction: "Step 1: Draw a ray from point C"
    - Highlight: Ray glows briefly

    Step 2:
    - Compass appears with point on A, pencil on B
    - Show radius measurement line (red dashed line from A to B)
    - Instruction: "Step 2: Set compass radius equal to length AB"
    - Compass legs visible in red

    Step 3:
    - Compass moves to point C
    - Radius remains the same (red dashed line)
    - Instruction: "Step 3: Place compass point on C (keeping same radius)"

    Step 4:
    - Arc drawn from C (radius = AB length) in orange
    - Arc intersects the ray
    - Instruction: "Step 4: Draw an arc intersecting the ray"

    Step 5:
    - Intersection point labeled D (purple)
    - Segment CD drawn in bold green
    - Show measurement comparison: AB and CD with equal marks
    - Instruction: "Step 5: Complete! CD ≅ AB (congruent segments)"
    - Checkmark appears

    Interactive controls:
    - "Next Step" button (advances through steps)
    - "Previous Step" button (go back)
    - "Reset" button (start over)
    - "Auto Play" button (animates through all steps)
    - Step indicator: "Step X of 5"

    Default parameters:
    - Segment AB length: 150px
    - Background: Alice blue
    - Animation speed: 1 second per step in auto mode

    Special features:
    - Hover over any element to see its name
    - Click on compass to see radius measurement
    - Final step shows congruence marks (identical tick marks on both segments)
    - Option to drag points A and B to change original segment length, then replay

    Implementation: p5.js with step-by-step state management
</details>

#### Diagram: Copying a Segment - All Steps Shown

<iframe src="../../sims/copy-segment-steps/main.html" height="302px" width="100%" scrolling="no"></iframe>

[Copy Segment Steps MicroSim](../../sims/copy-segment-steps/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Segment Copying Reference Diagram</summary>
    Type: diagram

    Purpose: Show all five steps of copying a segment in one reference image

    **Learning Objective:** Students will follow the sequential steps of segment copying and identify the role of each step (Bloom's: **Understanding** and **Applying**)

    Layout: Five panels in a horizontal row (1000x250px total)

    Panel 1 - Given:
    - Segment AB (blue, horizontal)
    - Point C below (green)
    - Label: "Given: Segment AB and point C"

    Panel 2 - Step 1:
    - Same as panel 1 plus ray from C (dashed)
    - Label: "Draw ray from C"

    Panel 3 - Step 2:
    - Compass shown with center at A, radius to B
    - Red arc indicating measurement
    - Label: "Set compass radius = AB"

    Panel 4 - Step 3:
    - Compass moved to C with same radius
    - Orange arc drawn from C
    - Label: "Draw arc from C"

    Panel 5 - Result:
    - Point D marked at intersection
    - Segment CD drawn (bold green)
    - Congruence marks on AB and CD
    - Label: "CD ≅ AB ✓"

    Color scheme:
    - Background: White
    - Original segment AB: Blue
    - New segment CD: Green
    - Construction elements (rays, arcs): Gray/orange
    - Compass: Red outline
    - Congruence marks: Black tick marks

    Overall title: "Copying a Segment: Step-by-Step Guide"

    Implementation: SVG with clear step progression
</details>

## Copying an Angle

!!! mascot-tip "Here's a Tip!"

    Copying an angle has more steps than copying a segment, but the key
    idea is the same: you're transferring a distance with the compass.
    The distance PQ captures the "opening" of the angle.

**Copying an angle** means creating a new angle with exactly the same measure as a given angle, in a different location.

**Given:** Angle ∠ABC
**Goal:** Create angle ∠DEF with the same measure as ∠ABC (∠DEF ≅ ∠ABC)

**Construction steps:**

1. Draw a ray from point D (this will be one side of the new angle)
2. Place compass point on vertex B and draw an arc that intersects both sides of ∠ABC; label intersection points P and Q
3. Without changing the compass radius, place compass point on D and draw a similar arc; label the intersection with the ray as E
4. Set compass radius equal to distance PQ
5. Place compass point on E and draw an arc intersecting the first arc; label this intersection F
6. Draw ray DF; now ∠EDF ≅ ∠ABC

#### Drawing: Copy an Angle Interactive Construction

<iframe src="../../sims/copy-angle/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Copy Angle MicroSim](../../sims/copy-angle/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Angle Copying</summary>
    Type: microsim

    **Learning Objective:** Students will perform the steps to copy an angle and understand how arcs determine angle congruence (Bloom's: **Applying** and **Analyzing**)

    Purpose: Step-by-step interactive tutorial for copying an angle

    Canvas layout (800x650px):
    - Main construction area (800x520): Shows both original and copied angles
    - Control area at bottom (800x130): Step buttons and instructions

    Visual elements:
    - Original angle ∠ABC shown at top-left (vertex B, rays to A and C)
    - Starting ray DE shown at bottom (vertex D, ray to E)
    - Compass arcs appearing in steps
    - Final ray DF completing the copied angle

    Step-by-step progression:

    Step 0 (Initial):
    - Show angle ∠ABC (blue rays, angle measure displayed: e.g., 65°)
    - Show starting ray DE (green)
    - Instruction: "We will copy ∠ABC to create ∠EDF"

    Step 1:
    - Ray DE visible
    - Instruction: "Step 1: Draw ray DE (one side of new angle)"

    Step 2:
    - Compass appears at B (vertex of original angle)
    - Arc drawn intersecting both rays BA and BC
    - Intersection points labeled P and Q (on BA and BC respectively)
    - Arc shown in red
    - Instruction: "Step 2: Draw arc from B intersecting both rays"

    Step 3:
    - Compass moves to D (with same radius as step 2)
    - Similar arc drawn from D
    - Arc intersects ray DE at point E
    - Arc shown in orange
    - Instruction: "Step 3: Draw same arc from D"

    Step 4:
    - Compass adjusted to measure distance PQ
    - Red dashed line shows PQ distance
    - Instruction: "Step 4: Measure distance PQ with compass"

    Step 5:
    - Compass placed at E with radius = PQ
    - Arc drawn from E intersecting the orange arc
    - Intersection point labeled F (purple)
    - Instruction: "Step 5: Draw arc from E to find point F"

    Step 6:
    - Ray DF drawn (green, completing angle ∠EDF)
    - Both angles shown with congruence arcs (identical arc marks)
    - Angle measure displayed for ∠EDF (same as ∠ABC)
    - Instruction: "Complete! ∠EDF ≅ ∠ABC ✓"

    Interactive controls:
    - Navigation buttons: "Next Step", "Previous Step", "Reset"
    - "Auto Play" with adjustable speed slider
    - Step indicator: "Step X of 6"
    - Slider to change original angle measure (20° to 160°)
    - "Show Measurements" toggle (displays angle degrees)

    Default parameters:
    - Original angle ∠ABC: 65°
    - Background: Light cream
    - Animation: Smooth transitions between steps

    Special features:
    - Highlight compass position in each step
    - Show radius lines (dashed) when compass is active
    - Final comparison: overlay both angles to show congruence
    - Option to try different starting angles

    Implementation: p5.js with geometric calculations and step management
</details>

## Bisecting a Segment

A **segment bisector** is a line, ray, or segment that divides a segment into two equal parts. The point where the bisector crosses the segment is called the **midpoint**.

**Bisecting a segment** means finding its midpoint and constructing the bisector.

**Given:** Segment AB
**Goal:** Find midpoint M and construct the perpendicular bisector of AB

**Construction steps:**

1. Place compass point on A and draw an arc with radius greater than half of AB
2. Keep the same radius, place compass point on B and draw another arc
3. The two arcs intersect at two points above and below AB; label them P and Q
4. Draw line PQ
5. Line PQ is the perpendicular bisector of AB; it intersects AB at midpoint M

#### Diagram: Bisecting a Segment - Complete Construction

<iframe src="../../sims/bisect-segment-steps/main.html" height="402px" width="100%" scrolling="no"></iframe>

[Bisect Segment Steps MicroSim](../../sims/bisect-segment-steps/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Segment Bisector Construction Steps</summary>
    Type: diagram

    Purpose: Show the complete construction of a segment bisector and perpendicular bisector

    **Learning Objective:** Students will construct a segment bisector and understand why the construction creates a perpendicular bisector at the midpoint (Bloom's: **Applying** and **Analyzing**)

    Layout: Four-panel sequence (1000x600px total, 2x2 grid)

    Panel 1 - Given:
    - Segment AB (horizontal, blue, bold)
    - Points A and B labeled
    - Label: "Given: Segment AB"
    - Measurement line showing length

    Panel 2 - Step 1-2:
    - Arc drawn from A (radius > half of AB) in red
    - Arc drawn from B (same radius) in orange
    - Both arcs shown as complete circles (dashed) with only the relevant parts bold
    - Note: "Compass radius > ½AB"
    - Label: "Draw arcs from A and B"

    Panel 3 - Step 3:
    - Intersection points P (above AB) and Q (below AB) marked in purple
    - Both arcs still visible but lighter
    - Segment AB still prominent
    - Label: "Arcs intersect at P and Q"

    Panel 4 - Result:
    - Line PQ drawn (green, bold) passing through both intersection points
    - Intersection with AB labeled M (midpoint)
    - Right angle symbol at M showing perpendicular
    - Congruence marks on AM and MB (showing equal segments)
    - Labels: "PQ ⊥ AB" and "AM ≅ MB"
    - Checkmark indicating completion

    Color scheme:
    - Background: Light yellow
    - Segment AB: Blue
    - Arcs from A: Red
    - Arcs from B: Orange
    - Perpendicular bisector PQ: Green
    - Intersection points P, Q: Purple
    - Midpoint M: Large red dot
    - Right angle symbol: Black square

    Annotations:
    - Arrow pointing to M: "Midpoint M"
    - Note: "PQ is the perpendicular bisector of AB"
    - Mathematical notation: "AM = MB = ½AB"

    Overall title: "Bisecting a Segment: Finding the Midpoint"

    Implementation: SVG with geometric precision
</details>

### Perpendicular Bisector

The construction above creates a **perpendicular bisector**—a special line that is both a bisector (cuts the segment in half) and perpendicular (meets the segment at a 90° angle).

!!! mascot-thinking "Think About It..."

    Here's a beautiful fact: every single point on the perpendicular
    bisector is exactly the same distance from both endpoints. This one
    property is the key to many constructions and proofs ahead!

An important property: *Every point on the perpendicular bisector is equidistant from the endpoints of the segment.* This means if you pick any point on line PQ, its distance to A equals its distance to B.

#### Drawing: Perpendicular Bisector Explorer

<iframe src="../../sims/perpendicular-bisector-explorer/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Perpendicular Bisector Explorer MicroSim](../../sims/perpendicular-bisector-explorer/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Perpendicular Bisector</summary>
    Type: microsim

    **Learning Objective:** Students will construct a perpendicular bisector and verify the equidistant property by measuring distances (Bloom's: **Applying** and **Evaluating**)

    Purpose: Interactive construction with verification of the equidistant property

    Canvas layout (700x650px):
    - Main construction area (700x530): Shows segment and perpendicular bisector
    - Control area at bottom (700x120): Construction steps and measurement display

    Visual elements:
    - Horizontal segment AB (blue, at center)
    - Construction arcs from A and B (when visible)
    - Perpendicular bisector line PQ (green, vertical)
    - Midpoint M (red dot)
    - Draggable test point T on the perpendicular bisector
    - Distance lines from T to A and T to B

    Construction mode (step-through):

    Step 1:
    - Show segment AB
    - Instruction: "Given segment AB"

    Step 2:
    - Arc from A appears (red, radius > half AB)
    - Instruction: "Draw arc from A"

    Step 3:
    - Arc from B appears (orange, same radius)
    - Instruction: "Draw arc from B with same radius"

    Step 4:
    - Intersection points P and Q highlighted (purple)
    - Instruction: "Mark intersection points P and Q"

    Step 5:
    - Line PQ drawn (green, perpendicular bisector)
    - Midpoint M marked
    - Right angle symbol shown
    - Instruction: "Draw line PQ—the perpendicular bisector"

    Exploration mode (after construction):
    - Draggable point T appears on line PQ
    - As user drags T along the bisector:
      - Dashed lines drawn from T to A (blue dashed)
      - Dashed lines drawn from T to B (blue dashed)
      - Distance TA displayed
      - Distance TB displayed
      - Comparison shown: "TA = TB = X units"
    - Instruction: "Drag point T and watch: TA always equals TB!"

    Interactive controls:
    - "Next Step" / "Previous Step" buttons for construction
    - "Explore Mode" button (activates draggable point T)
    - "Reset" button
    - "Show Distances" toggle
    - Speed slider for auto-play

    Default parameters:
    - Segment AB length: 200px
    - Background: Alice blue
    - Starting position of T: at midpoint M

    Special features:
    - When T is at midpoint, highlight that TA = TB = half of AB
    - Visual feedback: distances TA and TB shown in matching colors
    - Numeric display updates in real-time as T moves
    - Theorem box: "Every point on perpendicular bisector is equidistant from endpoints"

    Implementation: p5.js with draggable elements and distance calculations
</details>

## Bisecting an Angle

**Bisecting an angle** means dividing it into two congruent angles. An **angle bisector** is a ray that divides an angle into two equal angles.

**Given:** Angle ∠ABC
**Goal:** Construct ray BD that bisects ∠ABC (so ∠ABD ≅ ∠DBC)

**Construction steps:**

1. Place compass point on vertex B and draw an arc that intersects both rays BA and BC; label intersections P and Q
2. Place compass point on P and draw an arc in the interior of the angle
3. Keep the same radius, place compass point on Q and draw another arc
4. These two arcs intersect at point D
5. Draw ray BD; this is the angle bisector

#### Diagram: Bisecting an Angle - Sequential Steps

<iframe src="../../sims/bisect-angle-steps/main.html" height="382px" width="100%" scrolling="no"></iframe>

[Bisect Angle Steps MicroSim](../../sims/bisect-angle-steps/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Angle Bisector Construction</summary>
    Type: diagram

    Purpose: Show the step-by-step construction of an angle bisector

    **Learning Objective:** Students will construct an angle bisector and understand how the construction creates two congruent angles (Bloom's: **Applying** and **Understanding**)

    Layout: Four panels showing progression (900x500px total, in a row)

    Panel 1 - Given:
    - Angle ∠ABC with vertex B
    - Ray BA extending upper-left (blue)
    - Ray BC extending right (blue)
    - Angle opening approximately 70°
    - Label: "Given: ∠ABC"

    Panel 2 - Step 1:
    - Arc drawn from B (center at vertex)
    - Arc intersects BA at point P (red dot)
    - Arc intersects BC at point Q (red dot)
    - Arc shown in purple
    - Label: "Draw arc from B, mark P and Q"

    Panel 3 - Steps 2-3:
    - Arc from P (green, in interior of angle)
    - Arc from Q (orange, same radius, in interior)
    - Both arcs intersect at point D (purple dot, highlighted)
    - Previous arc from step 1 still faintly visible
    - Label: "Draw arcs from P and Q"

    Panel 4 - Result:
    - Ray BD drawn from vertex B through point D (red, bold)
    - Angle divided into two parts: ∠ABD and ∠DBC
    - Congruence marks (identical arcs) on both angles
    - Label: "BD bisects ∠ABC"
    - Note: "∠ABD ≅ ∠DBC"
    - Checkmark

    Color scheme:
    - Background: Light cream
    - Original rays BA, BC: Blue
    - Bisector ray BD: Red
    - Construction arcs: Purple, green, orange
    - Intersection points P, Q, D: Red dots
    - Congruence marks: Small identical arcs in black

    Annotations:
    - Final panel shows angle measures (if original was 70°, each half is 35°)
    - Arrow pointing to D: "Intersection point determines bisector"

    Overall title: "Bisecting an Angle: Creating Two Equal Angles"

    Implementation: SVG with precise angle measurements
</details>

#### Drawing: Angle Bisector Construction Practice

<iframe src="../../sims/angle-bisector-construction/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Angle Bisector Construction MicroSim](../../sims/angle-bisector-construction/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Angle Bisector Tutorial</summary>
    Type: microsim

    **Learning Objective:** Students will perform angle bisection construction and verify that the two resulting angles are congruent (Bloom's: **Applying** and **Evaluating**)

    Purpose: Guided practice for angle bisector construction with verification

    Canvas layout (750x650px):
    - Construction area (750x500): Shows angle and construction
    - Control and feedback area (750x150): Steps, measurements, buttons

    Visual elements:
    - Original angle ∠ABC with adjustable measure
    - Vertex B at center-left
    - Construction arcs appearing in steps
    - Angle bisector ray BD
    - Angle measure displays

    Step-by-step mode:

    Step 0:
    - Angle ∠ABC shown (blue rays)
    - Measure displayed (e.g., "∠ABC = 80°")
    - Instruction: "We will bisect this angle"

    Step 1:
    - Compass appears at B
    - Arc drawn intersecting both rays
    - Points P and Q marked (red dots)
    - Instruction: "Draw arc from vertex B, mark intersections P and Q"

    Step 2:
    - Compass moves to P
    - Arc drawn in interior (green)
    - Instruction: "Draw arc from P toward interior of angle"

    Step 3:
    - Compass moves to Q (same radius as step 2)
    - Arc drawn in interior (orange)
    - Arcs intersect at D (purple dot, glowing)
    - Instruction: "Draw arc from Q with same radius"

    Step 4:
    - Ray BD drawn (red, from B through D)
    - Instruction: "Draw ray BD—the angle bisector"

    Step 5:
    - Show ∠ABD with measure (e.g., "40°")
    - Show ∠DBC with measure (e.g., "40°")
    - Congruence marks on both angles
    - Comparison: "∠ABD = ∠DBC = 40° ✓"
    - Success message: "Perfect bisection!"

    Interactive controls:
    - Step navigation: "Next", "Previous", "Reset"
    - "Auto Play" button with speed control
    - Slider: "Change original angle" (20° to 160°)
    - "Verify" button: shows both angle measurements side-by-side
    - "Try Again" mode: construction steps shown, student clicks where to place compass

    Practice mode:
    - Random angle generated
    - Student must click correct locations for compass
    - Feedback: "Correct!" or "Try again, remember to..."
    - Hint system available

    Default parameters:
    - Starting angle: 80°
    - Background: White to light blue gradient
    - Compass visualization: red outline

    Special features:
    - Visual verification: overlay showing both halves are equal
    - Protractor option (can toggle) to measure angles
    - Challenge mode: bisect without seeing angle measure

    Implementation: p5.js with click detection and angle calculations
</details>

## Constructing Perpendiculars

!!! mascot-warning "Watch Out!"

    There are two different perpendicular constructions, and mixing them
    up is a common mistake. Always check first: is the point ON the line
    or OFF the line? That tells you which method to use.

Perpendicular lines meet at right angles (90°). There are two common perpendicular constructions:

1. **Constructing a perpendicular through a point on a line**
2. **Constructing a perpendicular from a point to a line**

### Perpendicular Through a Point on a Line

**Given:** Line ℓ and point P on line ℓ
**Goal:** Construct a line through P perpendicular to ℓ

**Construction steps:**

1. Place compass point on P and draw arcs on both sides of P, intersecting line ℓ at points A and B
2. Open compass to a larger radius
3. Place compass on A and draw an arc on one side of the line
4. Keep same radius, place compass on B and draw another arc intersecting the first arc; label intersection Q
5. Draw line PQ; this is perpendicular to ℓ

### Perpendicular from a Point to a Line

**Given:** Line ℓ and point P not on line ℓ
**Goal:** Construct a line from P perpendicular to ℓ

**Construction steps:**

1. Place compass point on P and draw an arc that intersects line ℓ at two points; label them A and B
2. Place compass on A and draw an arc on the opposite side of ℓ from P
3. Keep same radius, place compass on B and draw another arc intersecting the first; label intersection Q
4. Draw line PQ; this is perpendicular to ℓ

#### Diagram: Two Types of Perpendicular Constructions

<iframe src="../../sims/perpendicular-constructions/main.html" height="502px" width="100%" scrolling="no"></iframe>

[Perpendicular Constructions MicroSim](../../sims/perpendicular-constructions/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Perpendicular Construction Comparison</summary>
    Type: diagram

    Purpose: Show both types of perpendicular constructions side-by-side

    **Learning Objective:** Students will distinguish between the two perpendicular construction methods and apply the appropriate one based on point location (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Two-panel comparison (900x550px total)

    Left Panel - Perpendicular Through Point ON Line:

    Top section (Given):
    - Horizontal line ℓ (blue)
    - Point P on the line (red dot)
    - Label: "Point P is ON line ℓ"

    Middle section (Construction):
    - Arcs from P intersecting line at A and B (equal distances from P)
    - Larger arcs from A and B intersecting above line at Q
    - Construction arcs in light colors (purple, green)
    - Points A, B, Q labeled

    Bottom section (Result):
    - Line PQ drawn (bold green)
    - Right angle symbol at P
    - Label: "PQ ⊥ ℓ"

    Right Panel - Perpendicular From Point TO Line:

    Top section (Given):
    - Horizontal line ℓ (blue)
    - Point P above the line (red dot)
    - Label: "Point P is NOT on line ℓ"

    Middle section (Construction):
    - Arc from P intersecting line at A and B
    - Arcs from A and B intersecting below line at Q
    - Construction arcs in light colors (orange, pink)
    - Points A, B, Q labeled

    Bottom section (Result):
    - Line PQ drawn (bold green) connecting P to Q through line ℓ
    - Right angle symbol at intersection with ℓ
    - Intersection point labeled M
    - Label: "PQ ⊥ ℓ" and "M is foot of perpendicular"

    Color scheme:
    - Background: Light yellow
    - Original line ℓ: Blue
    - Point P: Red
    - Construction arcs: Light purple, green, orange
    - Perpendicular line: Bold green
    - Right angle symbols: Black squares

    Overall title: "Two Methods for Constructing Perpendiculars"

    Annotations:
    - Left panel note: "Use when point is ON the line"
    - Right panel note: "Use when point is NOT on the line"

    Implementation: SVG with clear side-by-side comparison
</details>

#### Drawing: Perpendicular Construction Selector

<iframe src="../../sims/perpendicular-construction-selector/main.html" height="602px" width="100%" scrolling="no"></iframe>

[Perpendicular Construction Selector MicroSim](../../sims/perpendicular-construction-selector/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Perpendicular Construction</summary>
    Type: microsim

    **Learning Objective:** Students will choose and execute the correct perpendicular construction based on point position (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Interactive tool that adapts construction steps based on whether point is on or off the line

    Canvas layout (800x700px):
    - Setup area at top (800x100): Shows the given line and point
    - Construction area in middle (800x450): Interactive construction space
    - Control area at bottom (800x150): Mode selection and step controls

    Two modes:

    **Mode 1: Point ON line**
    - Line ℓ shown horizontally (blue)
    - Point P on the line (red, draggable)
    - User can drag P along the line

    **Mode 2: Point NOT on line**
    - Line ℓ shown horizontally (blue)
    - Point P above line (red, draggable)
    - User can drag P anywhere not on the line

    Construction steps (adapt based on mode):

    For Point ON Line:
    1. Draw arcs from P in both directions on line
    2. Mark intersections A and B
    3. Draw larger arcs from A and B above line
    4. Mark intersection Q
    5. Draw line PQ (perpendicular)

    For Point NOT on Line:
    1. Draw arc from P intersecting line at two points
    2. Mark intersections A and B
    3. Draw arcs from A and B on opposite side
    4. Mark intersection Q
    5. Draw line PQ (perpendicular)

    Interactive features:
    - Toggle between modes: "Point ON line" / "Point NOT on line"
    - Step-by-step construction with "Next Step" button
    - Visual compass showing current action
    - Highlight current step instruction
    - "Check Construction" button verifies 90° angle
    - Draggable point P to see construction update

    Visual elements:
    - Line ℓ: Blue, horizontal
    - Point P: Red, draggable
    - Construction arcs: Color-coded by step (purple, green, orange)
    - Perpendicular line: Bold green
    - Right angle symbol: Animated appearance when verified

    Verification:
    - Angle measure tool shows exactly 90°
    - Green checkmark when perpendicular is correct
    - "Try Another" button generates new random configuration

    Interactive controls:
    - Mode selector: Radio buttons for "ON line" vs "NOT on line"
    - Step controls: "Next", "Previous", "Reset", "Auto"
    - "Show Hints" toggle
    - "Verify Perpendicular" button (checks angle = 90°)

    Default parameters:
    - Starting mode: Point ON line
    - Background: White to cream gradient
    - Initial point P: center of line

    Special features:
    - Smart mode detection: if user drags P onto line, switches to "ON" mode
    - Construction memory: remembers steps as user progresses
    - Challenge mode: random point placement, user selects correct method

    Implementation: p5.js with mode switching and geometric verification
</details>

## Constructing Parallel Lines

Parallel lines never intersect—they maintain a constant distance apart. The **Parallel Postulate** (also called Euclid's Fifth Postulate) states: *Through a point not on a given line, there is exactly one line parallel to the given line.*

**Constructing parallels** means creating a line through a given point that is parallel to a given line.

**Given:** Line ℓ and point P not on ℓ
**Goal:** Construct line m through P such that m ∥ ℓ

**Construction method (using corresponding angles):**

1. Draw a transversal line through P that intersects line ℓ; call the intersection point Q
2. Copy the angle formed by the transversal and line ℓ at point P
3. The new ray through P creates line m parallel to ℓ

This works because corresponding angles are congruent when lines are parallel!

#### Diagram: Constructing Parallel Lines Using Corresponding Angles

<iframe src="../../sims/parallel-lines-construction/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Parallel Lines Construction MicroSim](../../sims/parallel-lines-construction/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Parallel Line Construction</summary>
    Type: diagram

    Purpose: Show how to construct a parallel line using the corresponding angles method

    **Learning Objective:** Students will construct parallel lines using angle copying and understand why corresponding angles create parallel lines (Bloom's: **Applying** and **Analyzing**)

    Layout: Four-panel sequence (1000x550px total, 2x2 grid)

    Panel 1 - Given:
    - Line ℓ (blue, horizontal, lower part of panel)
    - Point P above line ℓ (red dot)
    - Label: "Given: Line ℓ and point P not on ℓ"

    Panel 2 - Step 1:
    - Transversal line drawn through P intersecting ℓ at Q
    - Transversal in gray (dashed)
    - Angle formed at Q highlighted (angle between transversal and ℓ)
    - Label: "Draw transversal through P intersecting ℓ at Q"
    - Angle at Q marked with arc

    Panel 3 - Step 2:
    - Same setup as panel 2
    - Angle copying construction shown at P
    - Arcs showing angle copy procedure (in red and orange)
    - New ray being constructed from P
    - Label: "Copy angle at Q to point P (using angle copying construction)"

    Panel 4 - Result:
    - Original line ℓ (blue, horizontal)
    - New line m through P (green, horizontal, parallel to ℓ)
    - Transversal still shown (lighter)
    - Corresponding angles marked with congruent arcs
    - Parallel symbols on both lines (arrows)
    - Label: "m ∥ ℓ" and "Corresponding angles are congruent"
    - Checkmark

    Color scheme:
    - Background: Light cream
    - Line ℓ: Blue
    - Line m: Green
    - Transversal: Gray dashed
    - Point P: Red
    - Angle arcs: Purple and orange
    - Corresponding angle marks: Matching arc symbols

    Annotations:
    - Arrow pointing to angles: "These corresponding angles are ≅"
    - Note: "When corresponding angles are equal, lines are parallel"
    - Mathematical notation: "m ∥ ℓ"

    Overall title: "Constructing Parallel Lines: Corresponding Angles Method"

    Implementation: SVG with clear angle visualization
</details>

### The Parallel Postulate

The **Parallel Postulate** is one of the most famous statements in geometry. Euclid's version states:

*If a line intersects two other lines so that the sum of the interior angles on one side is less than 180°, then the two lines will eventually intersect on that side.*

A more intuitive modern version:

*Through a point not on a given line, there exists exactly one line parallel to the given line.*

This postulate distinguishes Euclidean geometry from other geometries. For over 2,000 years, mathematicians tried to prove it from other axioms, but eventually discovered it's an independent assumption. Changing this postulate leads to non-Euclidean geometries used in Einstein's relativity!

#### Infographic: The Parallel Postulate Through History

<iframe src="../../sims/parallel-postulate-history/main.html" height="602px" width="100%" scrolling="no"></iframe>

[Parallel Postulate History MicroSim](../../sims/parallel-postulate-history/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>History and Importance of the Parallel Postulate</summary>
    Type: infographic

    Purpose: Show the historical significance and different interpretations of the Parallel Postulate

    **Learning Objective:** Students will understand the historical context and mathematical significance of the Parallel Postulate (Bloom's: **Understanding** and **Evaluating**)

    Layout: Interactive timeline with three geometric panels (900x700px)

    Top Section - Timeline (900x150px):
    Interactive historical timeline showing:
    - 300 BCE: Euclid states the Fifth Postulate (original version)
    - 1733: Saccheri attempts proof, discovers non-Euclidean geometry
    - 1829: Lobachevsky publishes hyperbolic geometry
    - 1854: Riemann develops elliptic geometry
    - 1915: Einstein uses non-Euclidean geometry in General Relativity

    Click each date to see explanation panel

    Middle Section - Three Geometric Worlds (900x400px):
    Three panels showing different geometries:

    Panel 1 - Euclidean (Flat) Geometry:
    - Flat plane with line ℓ and point P
    - Exactly ONE parallel line through P
    - Label: "Euclidean: Exactly 1 parallel"
    - Icon: Flat grid background
    - Example: "Our everyday geometry"

    Panel 2 - Hyperbolic Geometry:
    - Curved saddle surface
    - Line ℓ and point P
    - MANY parallel lines through P shown
    - Label: "Hyperbolic: Infinitely many parallels"
    - Icon: Saddle-shaped surface
    - Example: "Used in special relativity"

    Panel 3 - Elliptic (Spherical) Geometry:
    - Sphere surface
    - Great circle as "line"
    - Point P on sphere
    - NO parallel lines (all great circles intersect)
    - Label: "Elliptic: Zero parallels"
    - Icon: Globe
    - Example: "Navigation on Earth"

    Bottom Section - Interactive Exploration (900x150px):
    - Slider: "Curvature" (negative = hyperbolic, zero = Euclidean, positive = elliptic)
    - As slider moves, middle section transitions between the three geometries
    - Display: "Number of parallels through P: [varies with geometry]"
    - "Learn More" buttons linking to each geometry type

    Color scheme:
    - Timeline: Blue gradient background
    - Euclidean panel: Green (flat, normal)
    - Hyperbolic panel: Purple (curved saddle)
    - Elliptic panel: Orange (spherical)
    - Interactive elements: Gold highlights

    Interactive features:
    - Click timeline dates: Popup with historical context
    - Click geometry panels: Expand to show more examples
    - Slider animation: Smooth transition between geometries
    - Hover over "parallel" lines: Highlight to show how they behave

    Educational callouts:
    - "Why does this matter?" popup explaining real-world applications
    - "Fun fact": Mathematicians spent 2000+ years trying to prove the Parallel Postulate
    - Link: "How GPS uses elliptic geometry"

    Implementation: HTML/CSS/JavaScript with SVG graphics for geometric panels
</details>

#### Drawing: Parallel Lines Construction Challenge

<iframe src="../../sims/parallel-lines-challenge/main.html" height="602px" width="100%" scrolling="no"></iframe>

[Parallel Lines Challenge MicroSim](../../sims/parallel-lines-challenge/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Parallel Construction Practice</summary>
    Type: microsim

    **Learning Objective:** Students will construct parallel lines using the corresponding angles method and verify parallelism (Bloom's: **Applying** and **Evaluating**)

    Purpose: Guided practice with verification that constructed lines are truly parallel

    Canvas layout (800x700px):
    - Construction area (800x550): Shows line, point, and construction
    - Control and verification area (800x150): Steps and parallel check

    Visual elements:
    - Given line ℓ (blue, horizontal)
    - Given point P (red, above line)
    - Transversal line (gray dashed, drawn in step 1)
    - Construction arcs for angle copying
    - Resulting parallel line m (green)

    Step-by-step construction:

    Step 0:
    - Line ℓ and point P shown
    - Instruction: "Construct line m through P parallel to ℓ"

    Step 1:
    - User clicks to draw transversal through P
    - Transversal appears, intersecting ℓ at Q
    - Angle at Q highlighted
    - Instruction: "Draw a transversal through P"

    Step 2:
    - Copy angle construction begins
    - Arc from Q shown
    - Instruction: "We'll copy this angle to point P"

    Step 3:
    - Arc from Q copied to P (same radius)
    - Instruction: "Draw matching arc from P"

    Step 4:
    - Second arc determines direction
    - Point R marked where arcs intersect
    - Instruction: "Mark intersection to determine parallel direction"

    Step 5:
    - Line m drawn through P and R (green)
    - Parallel to line ℓ
    - Instruction: "Draw line m through P"

    Verification mode:
    - "Check if Parallel" button activates verification
    - Visual checks performed:
      1. Measure corresponding angles (should be equal)
      2. Show constant distance between lines
      3. Extend lines to show they don't intersect
    - Display: "Lines are parallel ✓" with evidence
    - Show: "∠1 = ∠2 (corresponding angles)"
    - Show: "Distance constant: X units"

    Interactive controls:
    - Step navigation: "Next", "Previous", "Skip to End"
    - "Verify Parallel" button
    - "New Problem" (generates new random point P position)
    - "Show Measurements" toggle (displays angles and distances)
    - Hint system: Progressive hints if user gets stuck

    Challenge mode:
    - Random point P placement
    - Timed construction
    - No step-by-step guidance (student must remember steps)
    - Score based on accuracy and speed

    Default parameters:
    - Point P: 150px above line ℓ
    - Background: White to light blue gradient
    - Line ℓ length: 500px

    Special features:
    - Visual confirmation: when lines are truly parallel, they glow green
    - Error feedback: if lines aren't parallel, show where they would intersect
    - Comparison tool: overlay with perfect parallel for self-check
    - "Why it works" explanation: shows corresponding angles theorem

    Implementation: p5.js with angle measurement and parallel verification
</details>

## Summary of Construction Techniques

Let's review the key constructions you've learned:

**Basic Constructions:**

- **Copying a segment**: Use compass to transfer length
- **Copying an angle**: Use compass arcs to transfer angle measure
- **Bisecting a segment**: Create perpendicular bisector using arcs from endpoints
- **Bisecting an angle**: Use arcs from angle sides to find bisector

**Perpendicular Constructions:**

- **Perpendicular through point on line**: Arcs on both sides, then arcs from those points
- **Perpendicular from point to line**: Arc from point to line, then arcs from intersections

**Parallel Construction:**

- **Parallel through a point**: Draw transversal, copy corresponding angle

#### Diagram: Construction Techniques Reference Chart

<iframe src="../../sims/construction-reference-chart/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Construction Techniques Reference Chart MicroSim](../../sims/construction-reference-chart/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Quick Reference for All Constructions</summary>
    Type: diagram

    Purpose: Provide a visual summary of all seven construction techniques

    **Learning Objective:** Students will identify and select the appropriate construction technique for a given geometric task (Bloom's: **Remembering**, **Understanding**, and **Applying**)

    Layout: Seven panels in a grid (1000x850px total, organized logically)

    Each panel contains:
    - Name of construction
    - Simple diagram showing result
    - Key steps (abbreviated)
    - When to use it

    Row 1 (3 panels) - Basic Constructions:

    Panel 1 - Copy Segment:
    - Diagram: Original segment AB and copy CD
    - Steps: "1. Draw ray 2. Arc from endpoint 3. Mark"
    - Use: "Create equal length elsewhere"
    - Icon: Two equal segments with ≅ symbol

    Panel 2 - Copy Angle:
    - Diagram: Original angle and copied angle
    - Steps: "1. Arc from vertex 2. Copy arc 3. Transfer distance"
    - Use: "Create equal angle elsewhere"
    - Icon: Two congruent angles

    Panel 3 - Bisect Segment:
    - Diagram: Segment with perpendicular bisector
    - Steps: "1. Arcs from endpoints 2. Connect intersections"
    - Use: "Find midpoint, create perpendicular"
    - Icon: Segment with midpoint M and right angle

    Row 2 (2 panels) - Angle Operations:

    Panel 4 - Bisect Angle:
    - Diagram: Angle with bisector ray
    - Steps: "1. Arc from vertex 2. Arcs from sides 3. Draw bisector"
    - Use: "Divide angle in half"
    - Icon: Angle split into two equal parts

    Panel 5 - (Continued perpendicular/parallel constructions)

    Row 3 (2 panels) - Perpendicular Constructions:

    Panel 6 - Perpendicular (Point ON line):
    - Diagram: Line with perpendicular through point P
    - Steps: "1. Arcs from P on line 2. Arcs above 3. Connect"
    - Use: "Create right angle at point on line"
    - Icon: Line with perpendicular and right angle symbol

    Panel 7 - Perpendicular (Point NOT on line):
    - Diagram: Line with perpendicular from point P to line
    - Steps: "1. Arc from P to line 2. Arcs below 3. Connect"
    - Use: "Shortest distance to line"
    - Icon: Point above line with perpendicular dropped down

    Row 4 (1 panel) - Parallel Construction:

    Panel 8 - Parallel Lines:
    - Diagram: Two parallel lines with transversal
    - Steps: "1. Draw transversal 2. Copy angle 3. Draw parallel"
    - Use: "Create line that never intersects"
    - Icon: Two parallel lines with ∥ symbol

    Color scheme:
    - Each panel: Light colored background (rotating pastels)
    - Construction elements: Bold, bright colors
    - Text: Black, clear font
    - Icons: Simplified, colorful

    Overall title: "Geometric Construction Techniques: Quick Reference"

    Footer note: "All constructions use only compass and straightedge!"

    Implementation: SVG grid layout with consistent panel design
</details>

## Real-World Applications of Constructions

While we now have digital tools, understanding classical constructions has practical value:

**Architecture and Engineering:**
- Finding midpoints and center lines for symmetry
- Creating perpendicular supports for structures
- Ensuring parallel rails, beams, and walls

**Navigation and Surveying:**
- Bisecting angles to find directions
- Creating perpendicular baselines
- Establishing parallel property boundaries

**Art and Design:**
- Creating symmetric designs through bisection
- Establishing vanishing points and parallel perspective lines
- Geometric patterns in Islamic art and mandalas

**Computer Graphics:**
- Algorithms based on geometric constructions
- CAD software uses construction logic
- 3D modeling tools implement bisection and perpendicular operations

#### Drawing: Construction in Action - Design a Structure

<iframe src="../../sims/construction-design-challenge/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Construction Design Challenge MicroSim](../../sims/construction-design-challenge/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Apply Constructions to Design Challenge</summary>
    Type: microsim

    **Learning Objective:** Students will apply multiple construction techniques to solve a real-world design problem (Bloom's: **Applying**, **Analyzing**, and **Creating**)

    Purpose: Project-based application where students use constructions to design a symmetric structure

    Canvas layout (850x750px):
    - Design area (850x600): Building workspace
    - Toolbox at bottom (850x150): Construction tools and objectives

    Challenge scenario:
    "Design a symmetric bridge support structure using geometric constructions"

    Given elements:
    - Ground line (horizontal base)
    - Two anchor points A and B on ground (bridge endpoints)
    - Design must be symmetric about center line
    - Must include perpendicular support and angled braces

    Required constructions (objectives):
    1. ✓ Bisect segment AB to find center point C
    2. ✓ Construct perpendicular from C (vertical support tower)
    3. ✓ Bisect the angle formed by brace and ground (for symmetric braces)
    4. ✓ Ensure parallel horizontal beams

    Interactive tools available:
    - Compass tool (click and drag to set radius, click again to draw arc)
    - Straightedge tool (click two points to draw line)
    - Point marker (click to mark important intersections)
    - "Check Construction" button (verifies if objectives met)

    Visual elements:
    - Ground line: Brown, thick
    - Anchor points A and B: Red dots
    - Construction lines: Light gray (can be toggled on/off)
    - Final structure lines: Bold black
    - Symmetric axis: Green dashed line (appears after bisection)

    Phases:

    Phase 1 - Find Center:
    - Objective: "Bisect AB to find center C"
    - Student uses compass and straightedge to bisect segment
    - When correct perpendicular bisector drawn, checkmark appears
    - Center point C highlighted in green

    Phase 2 - Vertical Support:
    - Objective: "Construct vertical support from C"
    - Perpendicular already exists from Phase 1
    - Student extends it upward to desired height
    - Can place point T (top of tower) on perpendicular

    Phase 3 - Angled Braces:
    - Objective: "Add symmetric angled braces from A and B to top T"
    - Lines AT and BT drawn
    - Must be symmetric (angles equal)
    - Verification shows angle measures

    Phase 4 - Additional Elements:
    - Optional: Add parallel horizontal beams
    - Optional: Bisect angles for decorative elements
    - "Symmetry Check" verifies design is mirror-image

    Completion:
    - All objectives met: Success screen
    - Show finished bridge with decorative coloring
    - Display: "Constructions used: Bisect segment, Perpendicular, Angle measure"
    - Option to save/export design

    Interactive controls:
    - Tool selector: Compass / Straightedge / Point
    - "Undo" last action
    - "Clear All" restart
    - "Toggle Construction Lines" (show/hide arcs and guides)
    - "Symmetry Check" (verifies mirror symmetry)
    - "Hint" button (suggests next step)

    Default parameters:
    - Segment AB length: 400px
    - Background: Sky blue at top, ground brown at bottom
    - Grid overlay option (can be toggled)

    Special features:
    - Real-time symmetry checker (visual overlay shows mirror image)
    - "Gallery" button shows example bridge designs using constructions
    - Physics simulation option: "Test your bridge" (shows if structure is stable)
    - Share design: Generate code to recreate student's bridge

    Extensions:
    - Advanced mode: Add parabolic arch using construction techniques
    - Challenge: Design with material constraints (limited lines)
    - Creativity scoring: Aesthetic appeal + structural soundness

    Implementation: p5.js with interactive drawing tools and symmetry verification
</details>

## The Impossible Constructions

!!! mascot-encourage "You've Got This!"

    Don't be discouraged by "impossible" problems! Proving that something
    can't be done is actually one of the greatest achievements in
    mathematics. It took over 2,000 years — and led to entirely new
    branches of math.

For centuries, mathematicians tried to solve three famous construction problems using only compass and straightedge:

1. **Squaring the circle**: Construct a square with the same area as a given circle
2. **Trisecting an angle**: Divide any angle into three equal parts
3. **Doubling the cube**: Construct a cube with exactly twice the volume of a given cube

In the 19th century, mathematicians proved these constructions are **impossible** with only compass and straightedge. The proofs use advanced algebra showing these problems require operations that compass and straightedge cannot perform (like taking certain cube roots or working with transcendental numbers like π).

However, these "impossible" problems led to important mathematical discoveries in algebra and number theory!

#### Infographic: The Three Impossible Constructions

<iframe src="../../sims/impossible-constructions/main.html" height="602px" width="100%" scrolling="no"></iframe>

[Impossible Constructions MicroSim](../../sims/impossible-constructions/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Famous Impossible Construction Problems</summary>
    Type: infographic

    Purpose: Explain the three classical impossible constructions and why they cannot be done

    **Learning Objective:** Students will understand the historical significance of impossible constructions and appreciate the limits of compass-straightedge methods (Bloom's: **Understanding** and **Evaluating**)

    Layout: Three-panel display with historical context (950x700px)

    Top banner (950x100):
    - Title: "The Three Impossible Constructions"
    - Subtitle: "2000+ Years of Mathematical Challenge"
    - Timeline: "Posed by ancient Greeks → Proved impossible in 1800s"

    Three main panels (950x450, arranged horizontally):

    Panel 1 - Squaring the Circle:
    - Visual: Circle and square side-by-side
    - Circle labeled: "Area = πr²"
    - Square labeled: "Area = s²"
    - Challenge: "Construct s so that s² = πr²"
    - Problem: "Requires constructing √π, which is transcendental"
    - Icon: Red X with "IMPOSSIBLE"
    - Proven by: Ferdinand von Lindemann (1882)
    - Why impossible: "π is transcendental (not solution to polynomial)"
    - Hover feature: Shows attempted historical solutions

    Panel 2 - Trisecting the Angle:
    - Visual: Angle divided into three equal parts
    - Challenge: "Divide any angle into three equal parts"
    - Note: "Bisecting is easy, trisecting is impossible"
    - Problem: "Requires solving cubic equation"
    - Icon: Red X with "IMPOSSIBLE" (for general angles)
    - Note: "Some special angles CAN be trisected (90°, 180°)"
    - Proven by: Pierre Wantzel (1837)
    - Why impossible: "Requires cube roots not constructible with compass/straightedge"
    - Hover feature: Shows which angles CAN be trisected

    Panel 3 - Doubling the Cube:
    - Visual: Small cube and larger cube
    - Small cube: "Volume = s³"
    - Large cube: "Volume = 2s³"
    - Challenge: "Construct side of cube with double the volume"
    - Requires: "Side length s∛2"
    - Problem: "∛2 is not constructible"
    - Icon: Red X with "IMPOSSIBLE"
    - Proven by: Pierre Wantzel (1837)
    - Historical note: "Delian problem - Apollo's oracle demanded doubled altar"
    - Hover feature: Shows the Delian legend

    Bottom section (950x150):
    - "Why These Matter" explanation panel
    - Key insight: "Proving impossibility was a breakthrough!"
    - Impact: "Led to field of abstract algebra"
    - Connection: "Not all mathematical problems have solutions within given constraints"
    - Modern view: "Can be done with other tools (marked ruler, origami, etc.)"
    - Interactive quiz: "Can you construct...?" with various examples

    Color scheme:
    - Background: Parchment/aged paper color
    - Each panel: Different pastel background (light blue, light green, light orange)
    - Impossible icons: Red X marks
    - Historical text: Brown, serif font
    - Mathematical notation: Black, clear

    Interactive features:
    - Click each panel: Expands with detailed mathematical explanation
    - "Try It Yourself" button: Opens tool to attempt construction (always fails!)
    - Timeline slider: Shows when each was posed vs. when proved impossible
    - "Alternative Methods" button: Shows how they CAN be done with other tools
    - Video links: Animations explaining the algebraic proofs

    Educational callouts:
    - "Fun Fact": People still try to square the circle (modern 'circle-squarers')
    - "Deeper Dive": Link to constructible numbers and Galois theory
    - "Try This": Trisect a 90° angle (this one IS possible!)

    Implementation: HTML/CSS/JavaScript with interactive panels and hover effects
</details>

## Practice and Challenge Problems

To master geometric constructions, you need to practice. Here are some challenges:

**Basic Practice:**

1. Copy a 5 cm segment to a new location
2. Copy a 45° angle to create a matching angle elsewhere
3. Bisect a 10 cm segment and verify the midpoint
4. Bisect a 120° angle and measure each resulting angle

**Intermediate Challenges:**

5. Construct a perpendicular from a point 3 cm above a line
6. Construct a line parallel to a given line, 4 cm away
7. Construct an equilateral triangle using only compass and straightedge (Hint: all sides equal means you can copy the base segment twice!)
8. Construct a square with side length 6 cm

**Advanced Projects:**

9. Construct a regular hexagon inscribed in a circle
10. Given three points not on a line, construct the circle passing through all three (Hint: use perpendicular bisectors!)
11. Divide a segment into four equal parts using only constructions
12. Construct a 30° angle without using a protractor

#### Drawing: Construction Practice Workbench

<iframe src="../../sims/construction-practice-workbench/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Construction Practice Workbench MicroSim](../../sims/construction-practice-workbench/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Construction Practice Tool</summary>
    Type: microsim

    **Learning Objective:** Students will practice all construction techniques with immediate feedback and progressive difficulty (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Comprehensive practice environment for all construction types

    Canvas layout (900x750px):
    - Construction workspace (900x550): Main drawing area
    - Problem panel at top (900x100): Shows current challenge
    - Tool panel at bottom (900x100): Tools and verification

    Practice modes:

    **Mode 1: Guided Practice**
    - Select construction type from menu
    - Step-by-step hints available
    - Visual guides (faded) show where to place compass
    - "Check Step" verifies each action
    - Progress bar shows completion

    **Mode 2: Free Practice**
    - Choose any challenge from list (12 problems)
    - No step guidance
    - Use any construction techniques
    - "Verify Solution" checks if construction is correct
    - Accuracy score given

    **Mode 3: Timed Challenge**
    - Random construction task
    - 2-minute timer
    - No hints
    - Score based on speed and accuracy
    - Leaderboard (local storage)

    **Mode 4: Creative Mode**
    - Open workspace
    - All tools available
    - Create geometric art or patterns
    - Save/load designs
    - Gallery of examples

    Available tools:
    - Compass (adjustable radius, click-drag interface)
    - Straightedge (click two points for line/segment/ray)
    - Point marker (label intersections)
    - Eraser (remove construction elements)
    - Measure tool (verify distances and angles - hidden in challenge mode)
    - Color picker (for final drawing)

    Visual elements:
    - Grid overlay (toggleable)
    - Snap-to-grid option (helpful for beginners)
    - Construction marks (light color for guides, bold for final)
    - Undo/Redo stack (up to 20 actions)

    Problem examples:

    Level 1 (Basic):
    - "Copy this segment"
    - "Bisect this segment"
    - "Copy this 60° angle"

    Level 2 (Intermediate):
    - "Construct perpendicular through point P"
    - "Bisect this 100° angle"
    - "Construct line parallel to ℓ through P"

    Level 3 (Advanced):
    - "Construct equilateral triangle with base AB"
    - "Construct square with side AB"
    - "Find center of this circle using only 3 points on the circle"

    Level 4 (Challenge):
    - "Construct regular hexagon"
    - "Divide segment into 4 equal parts"
    - "Construct 30° angle"

    Verification system:
    - Checks geometric properties (angles, lengths, perpendicularity, parallelism)
    - Tolerance: ±1° for angles, ±2px for lengths
    - Feedback: "Correct! ✓" or "Close, but angle is 91° instead of 90°"
    - Hint system: "Remember to use equal compass radii"

    Progress tracking:
    - Checklist of 12 problems
    - Stars for accuracy (3 stars = perfect, 2 stars = minor errors, 1 star = major errors)
    - Time tracking for each problem
    - Total constructions completed

    Interactive controls:
    - Mode selector dropdown
    - Tool palette (icons for each tool)
    - "New Problem" button
    - "Verify" button
    - "Show Solution" button (reveals correct construction)
    - "Settings": adjust difficulty, enable/disable hints, change colors

    Default parameters:
    - Starting mode: Guided Practice
    - Background: White
    - Grid: Light gray, 20px spacing
    - Construction lines: Blue (guides), Black (final)

    Special features:
    - Tutorial mode: Animated demonstrations of each construction
    - Achievement system: Unlock badges for milestones
    - Export: Save construction as image or step-by-step guide
    - "Explain Why" button: Shows geometric principles behind each construction
    - Accessibility: Keyboard shortcuts for all tools

    Implementation: p5.js with comprehensive tool system and problem generator
</details>

## Summary and Key Concepts

In this chapter, you've learned the classical art of geometric construction using only compass and straightedge. These techniques are over 2,000 years old yet remain fundamental to understanding geometry.

**The Two Tools:**

- **Compass**: Draws circles and arcs; maintains constant distance
- **Straightedge**: Draws lines through points; no measurements allowed

**Key Constructions:**

- **Copying a segment**: Transfer length using compass
- **Copying an angle**: Use arcs to transfer angle measure
- **Bisecting a segment**: Creates perpendicular bisector and midpoint
- **Bisecting an angle**: Divides angle into two congruent angles
- **Constructing perpendiculars**: Two methods depending on point location
- **Constructing parallels**: Use corresponding angles with transversal

**Important Principles:**

- **Segment bisector**: Divides segment in half
- **Perpendicular bisector**: Bisects segment at right angle
- **Angle bisector**: Divides angle into equal parts
- **Parallel Postulate**: Through a point not on a line, exactly one parallel line exists

**Historical Significance:**

- Ancient Greeks developed these techniques
- Three impossible constructions challenged mathematicians for 2,000 years
- Proving impossibility led to major advances in algebra
- Constructions reveal *why* geometric relationships are true

These construction skills develop your spatial reasoning, problem-solving abilities, and appreciation for mathematical elegance. While modern tools automate many tasks, understanding the underlying geometric principles remains essential for advanced mathematics, engineering, and design.

!!! mascot-celebration "Great Work!"

    You've mastered the ancient art of compass and straightedge
    construction! These same techniques were used by Euclid himself.
    That's 2,000 years of mathematical tradition in your hands.

---

**Next Steps:** With construction techniques mastered, you're ready to explore triangle congruence and how these constructions help prove why triangles are congruent!
