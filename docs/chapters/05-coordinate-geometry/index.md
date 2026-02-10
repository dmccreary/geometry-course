# Coordinate Geometry and Lines

## Summary

This chapter bridges algebra and geometry by exploring lines in the coordinate plane, including slopes, equations, and distance formulas. You'll learn how to use algebraic tools to solve geometric problems and verify geometric properties analytically. By connecting coordinate methods with synthetic geometry, you'll develop powerful techniques for analyzing relationships between points, lines, and other figures.

## Concepts Covered

This chapter covers the following 8 concepts from the learning graph:

1. Distance Formula
2. Midpoint Formula
3. Transversal
4. Slope
5. Slope-Intercept Form
6. Point-Slope Form
7. Equations of Parallel Lines
8. Equations of Perpendicular Lines

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)
- [Chapter 3: Angles and Angle Relationships](../03-angles-and-relationships/index.md)

---

## Introduction to Coordinate Geometry

!!! mascot-welcome "Let's Figure This Out Together!"

    Welcome to coordinate geometry! This is where algebra and geometry join forces, and I think you're going to love how powerful that combination is. Let's explore how two simple numbers can describe any point in the plane.

Imagine being able to describe every point on a map with just two numbers, or finding the exact distance between two cities without measuring physically. This is the power of coordinate geometry—also called **analytic geometry**—which combines the visual world of geometry with the computational world of algebra.

In this chapter, you'll learn how to place geometric figures on a coordinate plane and use algebraic formulas to answer geometric questions. You'll discover that a simple slope can tell you whether lines are parallel or perpendicular, and that equations can precisely describe infinite lines. This powerful synthesis of algebra and geometry, developed by René Descartes in the 17th century, revolutionized mathematics and gave us tools to model everything from planetary orbits to computer graphics.

By mastering coordinate geometry, you'll be able to prove geometric relationships algebraically, solve problems that would be difficult with compass and straightedge alone, and bridge two fundamental branches of mathematics.

## The Coordinate Plane

The **coordinate plane** (or Cartesian plane, named after René Descartes) is formed by two perpendicular number lines that intersect at their zero points. The horizontal number line is called the **x-axis**, and the vertical number line is called the **y-axis**. Their intersection point is the **origin**, denoted (0, 0).

Every point in the plane can be identified by an **ordered pair** of numbers (x, y), where:
- The **x-coordinate** tells how far left or right the point is from the origin
- The **y-coordinate** tells how far up or down the point is from the origin

#### Diagram: The Coordinate Plane and Quadrants

<iframe src="/sims/coordinate-plane-quadrants/main.html" height="652px" width="100%" scrolling="no"></iframe>

[Coordinate Plane and Quadrants MicroSim](/sims/coordinate-plane-quadrants/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Coordinate Plane Structure</summary>
    Type: diagram

    Purpose: Introduce the coordinate plane with axes, origin, quadrants, and sample points

    **Learning Objective:** Students will identify the parts of the coordinate plane and locate points using ordered pairs (Bloom's: **Remembering** and **Understanding**)

    Layout: Full coordinate plane (700x700px)

    Visual elements:
    - X-axis: Horizontal line extending left and right (blue, bold)
    - Y-axis: Vertical line extending up and down (red, bold)
    - Origin marked at (0, 0) with large dot and label
    - Grid lines at integer values (light gray)
    - Numbers labeled on both axes from -8 to 8
    - Arrows at ends of axes showing they extend infinitely

    Four quadrants clearly marked:
    - Quadrant I (upper right): Light yellow background, labeled "QI"
    - Quadrant II (upper left): Light green background, labeled "QII"
    - Quadrant III (lower left): Light blue background, labeled "QIII"
    - Quadrant IV (lower right): Light pink background, labeled "QIV"

    Sample points plotted:
    - Point A at (3, 4) in QI - purple dot
    - Point B at (-2, 5) in QII - orange dot
    - Point C at (-4, -3) in QIII - green dot
    - Point D at (5, -2) in QIV - red dot
    - Each point labeled with coordinates

    Annotations:
    - Arrow pointing to origin: "Origin (0, 0)"
    - Label on x-axis: "x-axis (horizontal)"
    - Label on y-axis: "y-axis (vertical)"
    - Callout for point A: "A(3, 4): 3 right, 4 up"
    - Note: "Ordered pair: (x, y)"

    Sign conventions shown:
    - "+x to the right, -x to the left"
    - "+y upward, -y downward"

    Color scheme:
    - Background: White
    - Axes: X-axis blue, Y-axis red
    - Quadrant backgrounds: Pastel colors
    - Points: Bright, distinct colors
    - Grid: Light gray

    Overall title: "The Coordinate Plane: Locating Points with Ordered Pairs"

    Implementation: SVG with precise grid and clear labeling
</details>

Points in different quadrants have different sign patterns:
- **Quadrant I**: Both coordinates positive (+, +)
- **Quadrant II**: x negative, y positive (-, +)
- **Quadrant III**: Both coordinates negative (-, -)
- **Quadrant IV**: x positive, y negative (+, -)

## Distance Formula

One of the most fundamental questions in geometry is: "How far apart are two points?" In the coordinate plane, we can answer this precisely using the **Distance Formula**.

Given two points $P_1(x_1, y_1)$ and $P_2(x_2, y_2)$, the distance $d$ between them is:

#### Distance Formula Equation

$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

where:

- $d$ is the distance between the two points
- $(x_1, y_1)$ are the coordinates of the first point
- $(x_2, y_2)$ are the coordinates of the second point
- $x_2 - x_1$ is the horizontal change (run)
- $y_2 - y_1$ is the vertical change (rise)

This formula comes directly from the Pythagorean theorem! The distance between two points is the hypotenuse of a right triangle whose legs are the horizontal and vertical distances between the points.

#### Diagram: Distance Formula Visualization

<iframe src="../../sims/distance-formula-visualization/main.html" height="402px" width="100%" scrolling="no"></iframe>

[Distance Formula Visualization MicroSim](/sims/distance-formula-visualization/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Deriving the Distance Formula from Pythagorean Theorem</summary>
    Type: diagram

    Purpose: Show how the Distance Formula connects to the Pythagorean theorem

    **Learning Objective:** Students will understand how the Distance Formula derives from the Pythagorean theorem and apply it to find distances (Bloom's: **Understanding** and **Applying**)

    Layout: Three-panel sequence (1000x400px)

    Panel 1 - Two Points on Coordinate Plane:
    - Coordinate grid shown (0 to 10 on both axes)
    - Point A at (2, 3) - blue dot
    - Point B at (7, 9) - red dot
    - Both points labeled clearly
    - Label: "Find distance from A(2,3) to B(7,9)"

    Panel 2 - Right Triangle Formation:
    - Same grid and points
    - Horizontal line from A to right (length = 7-2 = 5 units, green)
    - Vertical line upward to B (length = 9-3 = 6 units, orange)
    - Hypotenuse from A to B (purple, dashed)
    - Right angle symbol at corner
    - Labels:
      - "Horizontal leg: |x₂ - x₁| = |7-2| = 5"
      - "Vertical leg: |y₂ - y₁| = |9-3| = 6"
      - "Distance d = ?"

    Panel 3 - Applying Pythagorean Theorem:
    - Same triangle highlighted
    - Equation shown:
      - "d² = 5² + 6²"
      - "d² = 25 + 36"
      - "d² = 61"
      - "d = √61 ≈ 7.81 units"
    - General formula displayed:
      - "d = √[(x₂-x₁)² + (y₂-y₁)²]"
    - Checkmark indicating complete solution

    Color scheme:
    - Background: Light yellow
    - Grid: Light gray
    - Point A: Blue
    - Point B: Red
    - Horizontal leg: Green
    - Vertical leg: Orange
    - Hypotenuse: Purple
    - Text: Black, clear font

    Annotations:
    - Arrow connecting triangle to Pythagorean theorem: "a² + b² = c²"
    - Note: "Distance is always positive"

    Overall title: "Distance Formula: Pythagorean Theorem in Disguise"

    Implementation: SVG with mathematical precision
</details>

#### Drawing: Interactive Distance Calculator

<iframe src="../../sims/distance-formula/main.html" height="702px" width="100%" scrolling="no"></iframe>

<details markdown="1">
    <summary>Distance Formula Explorer</summary>
    Type: microsim
    **Status:** Done

    **Learning Objective:** Students will calculate distances between points and visualize the relationship to right triangles (Bloom's: **Applying** and **Analyzing**)

    Purpose: Interactive tool for exploring distance formula with visual feedback

    Canvas layout (750x650px):
    - Coordinate grid (750x500): Main visualization area
    - Control panel (750x150): Point inputs and calculation display

    Visual elements:
    - Coordinate plane with grid (-10 to 10 on both axes)
    - Two draggable points (A and B)
    - Dashed line connecting A and B (the distance)
    - Right triangle showing horizontal and vertical components
    - Real-time distance calculation display

    Interactive features:

    Point A (blue):
    - Draggable on grid
    - Coordinates displayed: "A: (x₁, y₁)"
    - Input boxes to set exact coordinates

    Point B (red):
    - Draggable on grid
    - Coordinates displayed: "B: (x₂, y₂)"
    - Input boxes to set exact coordinates

    Triangle visualization:
    - Horizontal leg (green): from A horizontally to B's x-coordinate
    - Vertical leg (orange): from there vertically to B
    - Hypotenuse (purple, dashed): direct line from A to B
    - All three sides labeled with lengths

    Calculation display (bottom panel):
    - Shows step-by-step calculation:
      1. "Horizontal distance: |x₂ - x₁| = |value|"
      2. "Vertical distance: |y₂ - y₁| = |value|"
      3. "d² = (horizontal)² + (vertical)²"
      4. "d² = value"
      5. "d = √value ≈ decimal"
    - Color-coded to match triangle sides

    Interactive controls:
    - "Random Points" button: Generates new random positions
    - "Snap to Grid" toggle: Constrains points to integer coordinates
    - "Show Triangle" toggle: Show/hide the right triangle
    - "Show Calculation" toggle: Show/hide step-by-step math
    - Slider: "Zoom" (adjust grid scale)

    Special features:
    - As points drag, all values update in real-time
    - Distance line animates when points move
    - Hover over any side: Shows its measurement
    - "Challenge Mode": Given a distance, drag B to be that far from A

    Default parameters:
    - Point A: (-3, 2)
    - Point B: (4, 6)
    - Background: White to light blue gradient
    - Grid: Light gray, 1-unit spacing

    Educational callouts:
    - "Notice: Distance is always positive!"
    - "Try: Points on same horizontal line (y₁ = y₂)"
    - "Try: Points on same vertical line (x₁ = x₂)"

    Implementation: p5.js with draggable elements and dynamic calculations
</details>

**Example:** Find the distance between points A(1, 2) and B(4, 6).

Solution:
- $d = \sqrt{(4-1)^2 + (6-2)^2}$
- $d = \sqrt{3^2 + 4^2}$
- $d = \sqrt{9 + 16}$
- $d = \sqrt{25}$
- $d = 5$ units

!!! mascot-thinking "The Pythagorean Theorem Strikes Again!"

    Did you notice? The distance formula is really just the Pythagorean theorem in disguise. Every time we find the distance between two points, we're secretly building a right triangle and calculating its hypotenuse.

## Midpoint Formula

The **midpoint** of a segment is the point exactly halfway between the endpoints. On the coordinate plane, we can find the midpoint using the **Midpoint Formula**.

Given two points $P_1(x_1, y_1)$ and $P_2(x_2, y_2)$, the midpoint $M$ has coordinates:

#### Midpoint Formula Equation

$M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$

where:

- $M$ is the midpoint
- $(x_1, y_1)$ are the coordinates of the first point
- $(x_2, y_2)$ are the coordinates of the second point
- $\frac{x_1 + x_2}{2}$ is the average of the x-coordinates
- $\frac{y_1 + y_2}{2}$ is the average of the y-coordinates

The midpoint formula finds the **average** of the x-coordinates and the average of the y-coordinates. It's like finding the balance point of the segment.

#### Diagram: Midpoint Formula Visualization

<iframe src="../../sims/midpoint-formula-visualization/main.html" height="452px" width="100%" scrolling="no"></iframe>

[Midpoint Formula Visualization MicroSim](/sims/midpoint-formula-visualization/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Finding the Midpoint</summary>
    Type: diagram

    Purpose: Show how the midpoint formula finds the average position between two points

    **Learning Objective:** Students will calculate midpoints and understand the averaging concept (Bloom's: **Understanding** and **Applying**)

    Layout: Two-panel comparison (900x450px)

    Panel 1 - Visual Representation:
    - Coordinate grid (0 to 10 on both axes)
    - Point A at (2, 1) - blue dot
    - Point B at (8, 7) - red dot
    - Segment AB drawn (gray line)
    - Midpoint M at (5, 4) - green dot, larger, highlighted
    - Equal distance marks showing AM = MB
    - Dashed vertical lines from A and B to x-axis showing x-coordinates
    - Dashed horizontal lines showing y-coordinates
    - Midpoint labeled: "M(5, 4)"

    Annotations:
    - Arrow showing "x-coordinate of M is average: (2+8)/2 = 5"
    - Arrow showing "y-coordinate of M is average: (1+7)/2 = 4"
    - Equal signs showing "AM = MB" (equal distances)

    Panel 2 - Calculation Steps:
    - Display the formula: M = ((x₁+x₂)/2, (y₁+y₂)/2)
    - Substitution: M = ((2+8)/2, (1+7)/2)
    - Simplification: M = (10/2, 8/2)
    - Result: M = (5, 4)
    - Verification:
      - "Check x: 5 is halfway between 2 and 8 ✓"
      - "Check y: 4 is halfway between 1 and 7 ✓"

    Color scheme:
    - Background: Light cream
    - Grid: Light gray
    - Point A: Blue
    - Point B: Red
    - Midpoint M: Green (highlighted with glow)
    - Segment: Gray
    - Dashed guides: Light purple

    Overall title: "Midpoint Formula: Finding the Average Position"

    Implementation: SVG with clear visual connection to averaging
</details>

#### Drawing: Midpoint Explorer with Verification

<iframe src="../../sims/midpoint-explorer/main.html" height="702px" width="100%" scrolling="no"></iframe>

[Midpoint Explorer MicroSim](/sims/midpoint-explorer/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Midpoint Calculator</summary>
    Type: microsim

    **Learning Objective:** Students will find midpoints and verify that the midpoint is equidistant from both endpoints (Bloom's: **Applying** and **Evaluating**)

    Purpose: Interactive exploration of midpoint formula with distance verification

    Canvas layout (800x700px):
    - Coordinate grid (800x550): Visualization with draggable points
    - Control and calculation panel (800x150): Inputs and results

    Visual elements:
    - Coordinate plane with grid (-10 to 10 on both axes)
    - Point A (draggable, blue)
    - Point B (draggable, red)
    - Segment AB (gray line)
    - Midpoint M (calculated automatically, green, larger)
    - Distance indicators from A to M and M to B

    Interactive features:

    Draggable points:
    - A and B can be dragged anywhere on grid
    - Coordinates update in real-time
    - M automatically recalculates

    Calculation display:
    - Shows: "A: (x₁, y₁)" and "B: (x₂, y₂)"
    - Formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)"
    - Substitution: "M = ((value+value)/2, (value+value)/2)"
    - Result: "M = (mx, my)"

    Verification panel:
    - "Distance from A to M: d₁ = X.XX units"
    - "Distance from M to B: d₂ = X.XX units"
    - Comparison: "d₁ = d₂? YES ✓" (in green if equal)
    - Shows d₁ and d₂ visually with colored arcs

    Interactive controls:
    - "Random Points" button
    - "Snap to Grid" toggle
    - "Show Distances" toggle
    - "Show Calculation Steps" toggle
    - Input fields for exact A and B coordinates

    Challenge modes:

    Mode 1 - Find the Midpoint:
    - Given A and B, student calculates midpoint
    - Click to place their guess for M
    - Feedback shows correct answer and student's distance from it

    Mode 2 - Find the Endpoint:
    - Given A and M, find B
    - Requires working backwards: B = (2mx - x₁, 2my - y₁)
    - Student drags B to correct position

    Visual feedback:
    - When M is equidistant from A and B, it pulses green
    - Distance lines shown in matching colors
    - Grid highlights showing x and y averaging

    Default parameters:
    - Point A: (1, 2)
    - Point B: (7, 8)
    - Calculated M: (4, 5)
    - Background: White to light green gradient

    Special features:
    - "Animation" button: Shows point moving from A to M to B
    - Number line views: Separate displays showing x and y averaging
    - "Symmetry Check": Visual overlay showing mirror symmetry about M

    Implementation: p5.js with real-time calculation and draggable interface
</details>

**Example:** Find the midpoint of the segment with endpoints C(-2, 5) and D(4, -1).

Solution:
- $M = \left(\frac{-2 + 4}{2}, \frac{5 + (-1)}{2}\right)$
- $M = \left(\frac{2}{2}, \frac{4}{2}\right)$
- $M = (1, 2)$

!!! mascot-tip "A Handy Way to Remember"

    Think of the midpoint formula as "average, average." You're just averaging the x-coordinates and averaging the y-coordinates. If you can find the average of two numbers, you can find a midpoint!

## Slope: Measuring Steepness

**Slope** measures the steepness and direction of a line. It tells us how much the line rises (or falls) for each unit of horizontal movement.

Given two points $P_1(x_1, y_1)$ and $P_2(x_2, y_2)$ on a line, the slope $m$ is:

#### Slope Formula

$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{rise}}{\text{run}} = \frac{\text{change in y}}{\text{change in x}}$

where:

- $m$ is the slope
- $y_2 - y_1$ is the rise (vertical change)
- $x_2 - x_1$ is the run (horizontal change)
- The fraction represents "rise over run"

**Slope interpretation:**
- **Positive slope** ($m > 0$): Line rises from left to right (uphill)
- **Negative slope** ($m < 0$): Line falls from left to right (downhill)
- **Zero slope** ($m = 0$): Horizontal line (no rise)
- **Undefined slope**: Vertical line (no run, division by zero)

!!! mascot-warning "Don't Mix Up Zero and Undefined!"

    A common mistake is confusing zero slope with undefined slope. Remember: a **horizontal** line has zero slope (the rise is zero), but a **vertical** line has **undefined** slope (the run is zero, and we can't divide by zero).

#### Diagram: Four Types of Slope

<iframe src="../../sims/slope-types/main.html" height="702px" width="100%" scrolling="no"></iframe>

[Four Types of Slope MicroSim](/sims/slope-types/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Slope Types and Interpretation</summary>
    Type: diagram

    Purpose: Show the four types of slope with visual examples

    **Learning Objective:** Students will classify lines by slope type and interpret slope values (Bloom's: **Understanding** and **Analyzing**)

    Layout: Four-panel grid (900x700px, 2x2)

    Panel 1 - Positive Slope:
    - Coordinate grid showing line rising from left to right
    - Two points marked: (1, 2) and (4, 5)
    - Rise and run shown with colored arrows
    - Rise = 3 (green arrow, vertical)
    - Run = 3 (blue arrow, horizontal)
    - Calculation: m = 3/3 = 1
    - Line in red, going uphill
    - Label: "Positive Slope (m > 0)"
    - Icon: Upward arrow ↗
    - Note: "Line rises from left to right"

    Panel 2 - Negative Slope:
    - Coordinate grid showing line falling from left to right
    - Two points marked: (1, 5) and (5, 1)
    - Rise = -4 (orange arrow, downward)
    - Run = 4 (blue arrow, horizontal)
    - Calculation: m = -4/4 = -1
    - Line in purple, going downhill
    - Label: "Negative Slope (m < 0)"
    - Icon: Downward arrow ↘
    - Note: "Line falls from left to right"

    Panel 3 - Zero Slope:
    - Horizontal line through y = 3
    - Two points marked: (1, 3) and (6, 3)
    - Rise = 0 (no vertical change)
    - Run = 5 (blue arrow, horizontal)
    - Calculation: m = 0/5 = 0
    - Line in green, perfectly horizontal
    - Label: "Zero Slope (m = 0)"
    - Icon: Horizontal arrow →
    - Note: "Horizontal line: y = constant"

    Panel 4 - Undefined Slope:
    - Vertical line through x = 4
    - Two points marked: (4, 1) and (4, 5)
    - Rise = 4 (green arrow, vertical)
    - Run = 0 (no horizontal change)
    - Calculation: m = 4/0 = undefined
    - Line in orange, perfectly vertical
    - Label: "Undefined Slope"
    - Icon: Vertical arrow ↑
    - Note: "Vertical line: x = constant"

    Color scheme:
    - Each panel: Different light background color
    - Rise arrows: Green or orange
    - Run arrows: Blue
    - Lines: Bright, distinct colors
    - Grid: Light gray

    Overall title: "Four Types of Slope"

    Annotations on each:
    - Rise and run clearly labeled
    - Slope calculation shown
    - Interpretation provided

    Implementation: SVG with clear visual distinction between slope types
</details>

#### Drawing: Slope Explorer and Calculator

<iframe src="../../sims/slope-explorer/main.html" height="752px" width="100%" scrolling="no"></iframe>

[Slope Explorer MicroSim](/sims/slope-explorer/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Slope Visualization</summary>
    Type: microsim

    **Learning Objective:** Students will calculate slope from two points and understand how slope relates to line steepness and direction (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Interactive tool for exploring slope with real-time visualization

    Canvas layout (850x750px):
    - Main grid area (850x600): Coordinate plane with interactive line
    - Control panel (850x150): Point inputs, slope display, and controls

    Visual elements:
    - Coordinate plane (-10 to 10 on both axes)
    - Two draggable points defining a line (A and B)
    - Line extending through both points (color changes based on slope type)
    - Rise and run indicators (colored arrows)
    - Right triangle showing rise/run relationship
    - Slope value displayed prominently

    Interactive features:

    Draggable points:
    - Point A (blue): Drag to any grid position
    - Point B (red): Drag to any grid position
    - Line updates automatically

    Visual indicators:
    - Vertical arrow (rise): Green if positive, orange if negative
    - Horizontal arrow (run): Blue, always
    - Rise and run values labeled
    - Right triangle formed by rise and run

    Line coloring (automatic):
    - Positive slope: Red (uphill)
    - Negative slope: Purple (downhill)
    - Zero slope: Green (horizontal)
    - Undefined slope: Orange (vertical)

    Slope calculation display:
    - Shows: "A: (x₁, y₁)" and "B: (x₂, y₂)"
    - Formula: "m = (y₂ - y₁)/(x₂ - x₁)"
    - Substitution: "m = (value - value)/(value - value)"
    - Simplification: "m = rise/run"
    - Result: "m = decimal value" or "m = undefined"

    Interpretation panel:
    - Displays slope type: "Positive/Negative/Zero/Undefined"
    - Shows icon: ↗ / ↘ / → / ↑
    - Explanation: "Line rises/falls from left to right" etc.

    Interactive controls:
    - "Random Line" button: Generates random points
    - "Snap to Grid" toggle
    - "Show Rise/Run" toggle
    - "Extend Line" toggle (shows line extending beyond points)
    - Preset buttons:
      - "Steep Uphill" (m = 3)
      - "Gentle Uphill" (m = 0.5)
      - "Steep Downhill" (m = -2)
      - "Horizontal" (m = 0)
      - "Vertical" (undefined)

    Challenge modes:

    Mode 1 - Match the Slope:
    - Given a target slope value
    - Drag B to create a line with that slope
    - Feedback shows how close student is

    Mode 2 - Slope Estimation:
    - Line shown without slope value
    - Student estimates slope
    - Reveals actual value with comparison

    Mode 3 - Build the Line:
    - Given slope and one point
    - Student places second point to create that slope
    - Multiple correct answers exist

    Special features:
    - "Angle Display": Shows angle of incline in degrees
    - "Slope as Ratio": Displays slope as simplified fraction
    - "Parallel Line": Button to add parallel line through origin
    - "Perpendicular Line": Button to add perpendicular line
    - Animation: "Walk the slope" - animated figure walking up/down line

    Default parameters:
    - Point A: (1, 2)
    - Point B: (5, 6)
    - Calculated slope: m = 1
    - Background: White to light blue gradient

    Educational callouts:
    - "Larger |m| = steeper line"
    - "Sign of m determines direction"
    - "Slope is constant for a straight line"

    Implementation: p5.js with dynamic line rendering and slope calculation
</details>

**Example:** Find the slope of the line through points E(2, 1) and F(6, 5).

Solution:
- $m = \frac{5 - 1}{6 - 2}$
- $m = \frac{4}{4}$
- $m = 1$

## Equations of Lines

Once we understand slope, we can write equations that describe entire lines. There are several useful forms for line equations.

### Slope-Intercept Form

The **slope-intercept form** is the most common way to write a line equation:

#### Slope-Intercept Form Equation

$y = mx + b$

where:

- $m$ is the slope of the line
- $b$ is the y-intercept (where the line crosses the y-axis)
- $x$ and $y$ are variables representing any point on the line

This form is called "slope-intercept" because you can immediately see both the slope ($m$) and the y-intercept ($b$) from the equation.

**Example:** The equation $y = 2x + 3$ represents a line with:
- Slope: $m = 2$ (rises 2 units for every 1 unit right)
- Y-intercept: $b = 3$ (crosses y-axis at point (0, 3))

#### Diagram: Slope-Intercept Form Visualization

<iframe src="../../sims/slope-intercept-form/main.html" height="502px" width="100%" scrolling="no"></iframe>

[Slope-Intercept Form MicroSim](/sims/slope-intercept-form/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Understanding y = mx + b</summary>
    Type: diagram

    Purpose: Show how slope and y-intercept determine a line in slope-intercept form

    **Learning Objective:** Students will identify slope and y-intercept from equations and graph lines in slope-intercept form (Bloom's: **Understanding** and **Applying**)

    Layout: Two examples side-by-side (1000x500px)

    Left Example - Positive Slope:
    - Coordinate grid (-5 to 5 on both axes)
    - Line: y = 2x + 1
    - Y-intercept at (0, 1) marked with green dot and labeled "b = 1"
    - Slope shown with rise/run triangle:
      - From (0, 1) to (1, 3)
      - Rise = 2 (green arrow, up)
      - Run = 1 (blue arrow, right)
      - Label: "m = 2/1 = 2"
    - Line in red, extending through grid
    - Several points plotted and labeled:
      - (-1, -1)
      - (0, 1)
      - (1, 3)
      - (2, 5)
    - Equation displayed: "y = 2x + 1"

    Right Example - Negative Slope:
    - Coordinate grid (-5 to 5 on both axes)
    - Line: y = -x + 4
    - Y-intercept at (0, 4) marked with green dot and labeled "b = 4"
    - Slope shown with rise/run triangle:
      - From (0, 4) to (1, 3)
      - Rise = -1 (orange arrow, down)
      - Run = 1 (blue arrow, right)
      - Label: "m = -1/1 = -1"
    - Line in purple, extending through grid
    - Several points plotted and labeled:
      - (-1, 5)
      - (0, 4)
      - (1, 3)
      - (2, 2)
    - Equation displayed: "y = -x + 4"

    Color scheme:
    - Background: Light yellow
    - Grid: Light gray
    - Y-intercepts: Green dots (highlighted)
    - Rise arrows: Green (up) or Orange (down)
    - Run arrows: Blue
    - Lines: Red (positive slope), Purple (negative slope)

    Annotations:
    - Arrows pointing to y-intercept: "Start here: (0, b)"
    - Arrows showing slope movement: "Then use slope to find more points"
    - Note: "From any point, move 'run' right and 'rise' up/down"

    Overall title: "Slope-Intercept Form: y = mx + b"

    Implementation: SVG with clear slope triangles and labeled points
</details>

#### Drawing: Slope-Intercept Form Explorer

<iframe src="../../sims/slope-intercept-explorer/main.html" height="702px" width="100%" scrolling="no"></iframe>

[Slope-Intercept Explorer MicroSim](/sims/slope-intercept-explorer/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive y = mx + b Grapher</summary>
    Type: microsim

    **Learning Objective:** Students will graph lines using slope-intercept form and understand how changing m and b affects the line (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Interactive tool for exploring slope-intercept form with real-time graphing

    Canvas layout (900x700px):
    - Graph area (600x600): Coordinate plane showing the line
    - Control panel (300x600): Sliders for m and b, equation display

    Visual elements:
    - Coordinate plane (-10 to 10 on both axes)
    - Line graphed based on current m and b values
    - Y-intercept point highlighted (green dot at (0, b))
    - Slope triangle shown from y-intercept
    - Grid with axis labels

    Interactive controls (right panel):

    Slope slider (m):
    - Range: -5 to 5
    - Step: 0.1
    - Default: 1
    - Label: "Slope (m): [value]"
    - Color bar showing positive (red) to negative (blue)

    Y-intercept slider (b):
    - Range: -10 to 10
    - Step: 0.5
    - Default: 0
    - Label: "Y-intercept (b): [value]"
    - Highlights the point (0, b) on graph

    Display elements:
    - Large equation display: "y = [m]x + [b]"
    - Updates in real-time as sliders move
    - Slope type indicator: "Positive/Negative/Zero"
    - Current y-intercept marked on graph

    Visual features:
    - Line color changes based on slope:
      - Positive: Red gradient (steeper = darker)
      - Negative: Blue gradient (steeper = darker)
      - Zero: Green (horizontal)
    - Y-intercept glows as it moves
    - Slope triangle animates when m changes
    - Rise and run values displayed

    Interactive modes:

    Mode 1 - Free Exploration:
    - Adjust both sliders freely
    - See immediate graph updates
    - Equation updates automatically

    Mode 2 - Match the Line:
    - Target line shown in gray (dashed)
    - Student adjusts m and b to match
    - Feedback: "Distance from target line: X units"
    - Success when match is close enough

    Mode 3 - Through Two Points:
    - Two points given on grid
    - Student adjusts m and b so line passes through both
    - Visual feedback shows how close line is to each point

    Mode 4 - Parallel/Perpendicular:
    - Given line shown in gray
    - Task: "Create parallel line" or "Create perpendicular line"
    - Hints available about slope relationships

    Additional features:
    - "Show Table" button: Displays x-y table for current line
    - "Trace Point" tool: Click to add a point, see if it's on the line
    - "Freeze Line" button: Locks current line, add another to compare
    - "Random Line" button: Generates random m and b
    - "Reset" button: Returns to y = x

    Special visualizations:
    - "Slope Animation": Shows a ball rolling down the line
    - "Build the Line": Step-by-step construction from b using slope
    - "Y-intercept Tracker": Highlights where line crosses y-axis
    - "Multiple Lines": Toggle to show family of parallel lines (same m, different b)

    Default parameters:
    - Slope m: 1
    - Y-intercept b: 0
    - Line color: Red
    - Background: White to light gray gradient

    Educational callouts:
    - "Same m = parallel lines"
    - "Change m to rotate line around y-intercept"
    - "Change b to shift line up/down"
    - "m = 0 gives horizontal line"

    Implementation: p5.js with slider controls and dynamic line rendering
</details>

### Point-Slope Form

Sometimes you know a point on the line and the slope, but not the y-intercept. The **point-slope form** is perfect for this situation:

#### Point-Slope Form Equation

$y - y_1 = m(x - x_1)$

where:

- $m$ is the slope of the line
- $(x_1, y_1)$ is a known point on the line
- $x$ and $y$ are variables representing any point on the line

This form is useful when you know:
- The slope and one point
- Two points (calculate slope first, then use either point)

**Example:** Write the equation of a line with slope 3 passing through point (2, 5).

Solution:
- Use point-slope form: $y - y_1 = m(x - x_1)$
- Substitute: $y - 5 = 3(x - 2)$
- This is the answer in point-slope form!
- To convert to slope-intercept form:
  - $y - 5 = 3x - 6$
  - $y = 3x - 1$

#### Drawing: Point-Slope Form Builder

<iframe src="../../sims/point-slope-builder/main.html" height="702px" width="100%" scrolling="no"></iframe>

[Point-Slope Builder MicroSim](/sims/point-slope-builder/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Point-Slope Form Tool</summary>
    Type: microsim

    **Learning Objective:** Students will write equations in point-slope form given a point and slope, and convert between point-slope and slope-intercept forms (Bloom's: **Applying** and **Analyzing**)

    Purpose: Interactive tool for building line equations using point-slope form

    Canvas layout (850x700px):
    - Graph area (550x550): Coordinate plane with draggable point
    - Equation panel (300x550): Shows both forms and conversion steps

    Visual elements:
    - Coordinate plane (-10 to 10 on both axes)
    - Draggable point P (blue dot, labeled with coordinates)
    - Line through P with adjustable slope
    - Slope triangle showing rise/run
    - Multiple representation of the same line

    Interactive features:

    Point P (draggable):
    - Drag anywhere on grid
    - Coordinates update: "P: (x₁, y₁)"
    - Can also input exact coordinates

    Slope control:
    - Slider for slope m (-5 to 5, step 0.1)
    - Label: "Slope m: [value]"
    - Line rotates around point P as m changes

    Equation displays (right panel):

    1. Point-Slope Form:
       - "y - y₁ = m(x - x₁)"
       - Substituted: "y - [y₁] = [m](x - [x₁])"
       - Highlighted in green

    2. Conversion Steps:
       - "Distribute: y - [y₁] = [m]x - [m×x₁]"
       - "Add [y₁]: y = [m]x + [y₁ + (-m×x₁)]"
       - Shows each step clearly

    3. Slope-Intercept Form:
       - "y = [m]x + [b]"
       - Where b is calculated automatically
       - Highlighted in blue

    Interactive modes:

    Mode 1 - Build from Point and Slope:
    - Drag P to any location
    - Adjust slope with slider
    - See both forms update automatically
    - Graph shows the line

    Mode 2 - Find Equation Through Two Points:
    - Two draggable points: A and B
    - Calculate slope: m = (y₂-y₁)/(x₂-x₁)
    - Use point A for point-slope form
    - Show conversion to slope-intercept
    - Verify B is on the resulting line

    Mode 3 - Conversion Practice:
    - Given equation in point-slope form
    - Student converts to slope-intercept form
    - Step-by-step hints available
    - Verification shows if correct

    Mode 4 - Reverse Engineering:
    - Line shown on graph
    - Student identifies a point and slope
    - Writes equation in point-slope form
    - Multiple correct answers possible (any point on line works!)

    Visual features:
    - As P moves, line follows it
    - Slope triangle updates with P and m
    - Y-intercept point shown and labeled
    - Table of values can be displayed

    Special features:
    - "Show Work" button: Expands conversion steps with explanations
    - "Verify Point" tool: Click any point to see if it satisfies equation
    - "Compare Forms" side-by-side view of both equation forms
    - "Why It Works" explanation panel

    Interactive controls:
    - "Random Setup" button: New random point and slope
    - "Snap to Grid" toggle
    - "Show Slope Triangle" toggle
    - "Show Y-intercept" toggle
    - Input fields for exact values

    Default parameters:
    - Point P: (3, 4)
    - Slope m: 2
    - Background: White to light yellow gradient

    Educational callouts:
    - "Point-slope form works with ANY point on the line"
    - "Both forms describe the same line"
    - "Point-slope → Slope-intercept by distributing and simplifying"

    Implementation: p5.js with draggable point and dynamic equation generation
</details>

## Parallel and Perpendicular Lines

The slope of a line determines important relationships between lines.

### Parallel Lines

**Parallel lines** never intersect—they maintain a constant distance apart. In coordinate geometry, parallel lines have an important property:

**Parallel Lines Theorem:** Two non-vertical lines are parallel if and only if they have equal slopes.

If line 1 has slope $m_1$ and line 2 has slope $m_2$, then:

**Lines are parallel** $\Leftrightarrow$ $m_1 = m_2$

**Equations of Parallel Lines:**
- If one line is $y = 2x + 3$, then $y = 2x - 5$ is parallel (same slope, different intercept)
- All parallel lines have equations $y = mx + b$ where $m$ is constant and $b$ varies

#### Diagram: Parallel Lines in the Coordinate Plane

<iframe src="../../sims/parallel-lines-coordinate/main.html" height="602px" width="100%" scrolling="no"></iframe>

[Parallel Lines Diagram MicroSim](/sims/parallel-lines-coordinate/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Parallel Lines with Equal Slopes</summary>
    Type: diagram

    Purpose: Show multiple parallel lines and demonstrate their equal slopes

    **Learning Objective:** Students will identify parallel lines by equal slopes and write equations of parallel lines (Bloom's: **Understanding** and **Applying**)

    Layout: Single coordinate plane with analysis panel (900x600px)

    Main visualization:
    - Coordinate plane (-8 to 8 on both axes)
    - Three parallel lines displayed:
      - Line 1: y = 2x + 4 (red)
      - Line 2: y = 2x + 0 (blue)
      - Line 3: y = 2x - 3 (green)
    - All three lines have slope triangles shown (same rise/run)
    - Distance between lines shown with perpendicular segments
    - All marked "equal distance apart"

    Slope triangles:
    - Each line has a slope triangle shown
    - Rise = 2, Run = 1 for all three
    - All triangles congruent (same shape and size)
    - Overlaid to show they're identical

    Analysis panel (side or bottom):
    - Table showing:
      | Line | Equation | Slope | Y-intercept |
      |------|----------|-------|-------------|
      | 1 | y = 2x + 4 | m = 2 | b = 4 |
      | 2 | y = 2x + 0 | m = 2 | b = 0 |
      | 3 | y = 2x - 3 | m = 2 | b = -3 |

    - Key observation box:
      - "All slopes equal: m = 2"
      - "Different y-intercepts: b varies"
      - "Lines never intersect = PARALLEL"

    Color scheme:
    - Background: Light cream
    - Grid: Light gray
    - Lines: Red, blue, green (bright, distinct)
    - Slope triangles: Matching line colors, semi-transparent
    - Distance markers: Purple dashed lines

    Annotations:
    - "Same slope" arrow pointing to all slope values
    - "Different starting points" arrow pointing to y-intercepts
    - "Always the same distance apart" label

    Overall title: "Parallel Lines Have Equal Slopes"

    Implementation: SVG with precise parallel lines and clear table
</details>

### Perpendicular Lines

**Perpendicular lines** intersect at right angles (90°). They have a special slope relationship:

**Perpendicular Lines Theorem:** Two non-vertical lines are perpendicular if and only if their slopes are negative reciprocals.

If line 1 has slope $m_1$ and line 2 has slope $m_2$, then:

**Lines are perpendicular** $\Leftrightarrow$ $m_1 \cdot m_2 = -1$ or $m_2 = -\frac{1}{m_1}$

**Examples of perpendicular slopes:**
- If $m_1 = 2$, then $m_2 = -\frac{1}{2}$ (perpendicular)
- If $m_1 = \frac{3}{4}$, then $m_2 = -\frac{4}{3}$ (perpendicular)
- If $m_1 = -5$, then $m_2 = \frac{1}{5}$ (perpendicular)

**Special case:** Horizontal lines ($m = 0$) are perpendicular to vertical lines ($m$ undefined).

!!! mascot-thinking "Flip and Negate!"

    Here's a quick trick for finding perpendicular slopes: flip the fraction and change the sign. If a line's slope is $\frac{2}{3}$, the perpendicular slope is $-\frac{3}{2}$. We call these "negative reciprocals," and their product is always $-1$.

#### Diagram: Perpendicular Lines with Negative Reciprocal Slopes

<iframe src="../../sims/perpendicular-lines-slopes/main.html" height="452px" width="100%" scrolling="no"></iframe>

[Perpendicular Lines Diagram MicroSim](/sims/perpendicular-lines-slopes/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Perpendicular Slope Relationships</summary>
    Type: diagram

    Purpose: Show perpendicular lines and demonstrate negative reciprocal slopes

    **Learning Objective:** Students will identify perpendicular lines by negative reciprocal slopes and calculate perpendicular slopes (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Three examples in a row (1200x450px)

    Example 1:
    - Coordinate grid
    - Line 1: y = 2x + 1 (red), slope = 2
    - Line 2: y = -½x + 3 (blue), slope = -½
    - Lines intersect with right angle symbol (90°)
    - Slope triangles for both:
      - Line 1: rise = 2, run = 1
      - Line 2: rise = -1, run = 2
    - Calculation shown: 2 × (-½) = -1 ✓
    - Label: "m₁ = 2, m₂ = -½"

    Example 2:
    - Coordinate grid
    - Line 1: y = ¾x - 1 (green), slope = ¾
    - Line 2: y = -4/3x + 2 (purple), slope = -4/3
    - Lines intersect with right angle symbol
    - Slope triangles:
      - Line 1: rise = 3, run = 4
      - Line 2: rise = -4, run = 3
    - Calculation: ¾ × (-4/3) = -1 ✓
    - Label: "m₁ = ¾, m₂ = -4/3"

    Example 3:
    - Coordinate grid
    - Horizontal line: y = 3 (orange), slope = 0
    - Vertical line: x = 2 (teal), slope = undefined
    - Right angle symbol at intersection
    - Special note: "Horizontal ⊥ Vertical (special case)"
    - Label: "m₁ = 0, m₂ = undefined"

    Color scheme:
    - Background: White
    - Grid: Light gray
    - Lines: Bright, contrasting colors
    - Right angle symbols: Black squares (prominent)
    - Slope triangles: Semi-transparent, matching line colors

    Annotations for each example:
    - Arrow showing "Slopes are negative reciprocals"
    - "Product = -1" checkmark
    - Right angle symbol clearly visible

    Overall title: "Perpendicular Lines: Negative Reciprocal Slopes"

    Footer note: "To find perpendicular slope: flip fraction and change sign"

    Implementation: SVG with precise right angles and clear slope calculations
</details>

#### Drawing: Parallel and Perpendicular Line Explorer

<iframe src="../../sims/parallel-perpendicular-explorer/main.html" height="752px" width="100%" scrolling="no"></iframe>

[Parallel/Perpendicular Explorer MicroSim](/sims/parallel-perpendicular-explorer/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Interactive Parallel/Perpendicular Relationships</summary>
    Type: microsim

    **Learning Objective:** Students will create parallel and perpendicular lines, verify slope relationships, and write equations for parallel/perpendicular lines (Bloom's: **Applying**, **Analyzing**, and **Creating**)

    Purpose: Comprehensive tool for exploring parallel and perpendicular line relationships

    Canvas layout (950x750px):
    - Graph area (650x650): Coordinate plane with interactive lines
    - Control panel (300x650): Mode selection, slope controls, equation display

    Visual elements:
    - Coordinate plane (-10 to 10 on both axes)
    - Base line (Line 1) - draggable or adjustable
    - Second line (Line 2) - can be set to parallel or perpendicular
    - Intersection point marked (if lines intersect)
    - Angle indicator when lines intersect
    - Slope triangles for both lines

    Interactive modes:

    **Mode 1: Create Parallel Lines**
    - Base line shown (adjustable slope and y-intercept)
    - Task: Create parallel line through a given point
    - Controls:
      - Slider for Line 1 slope
      - Slider for Line 1 y-intercept
      - Draggable point P for Line 2 to pass through
      - Line 2 automatically has same slope as Line 1
      - Adjust Line 2's position to pass through P

    Display:
    - Line 1: y = m₁x + b₁
    - Line 2: y = m₂x + b₂
    - Verification: "m₁ = m₂? [value] = [value] ✓"
    - Visual: Both lines highlighted in matching colors when parallel

    **Mode 2: Create Perpendicular Lines**
    - Base line shown (adjustable)
    - Task: Create perpendicular line through a given point
    - Controls:
      - Slider for Line 1 slope (m₁)
      - Line 2 slope automatically calculated: m₂ = -1/m₁
      - Draggable point P for intersection
      - Line 2 rotates around P

    Display:
    - Line 1: y = m₁x + b₁
    - Line 2: y = m₂x + b₂
    - Verification: "m₁ × m₂ = -1? [value] × [value] = -1 ✓"
    - Right angle symbol shown at intersection
    - Angle measure displayed: "90°"

    **Mode 3: Identify Relationship**
    - Two random lines shown
    - Student determines: Parallel, Perpendicular, or Neither
    - Multiple choice selection
    - Feedback with explanation

    **Mode 4: Write Equations**
    - Given: Original line and a point
    - Task: Write equation of parallel line through point
    - Task: Write equation of perpendicular line through point
    - Input fields for student answers
    - Verification shows correct equations

    Visual features:

    Parallel lines:
    - Color-coded similarly (e.g., both shades of blue)
    - Distance between lines shown
    - "Never intersect" label

    Perpendicular lines:
    - Contrasting colors (e.g., red and blue)
    - Right angle symbol at intersection (black square)
    - Angle measure: "90°"
    - Slope triangles show reciprocal relationship

    Interactive controls:
    - Mode selector dropdown
    - "Random Lines" button
    - "Show Slope Triangles" toggle
    - "Show Equations" toggle
    - "Show Calculations" toggle
    - Sliders for precise slope adjustment
    - Snap to grid option

    Special features:

    Parallel challenges:
    - "Match the Distance": Create parallel line at specific distance
    - "Through Two Points": Parallel to line AB through point C
    - "Family of Parallels": Show multiple parallel lines

    Perpendicular challenges:
    - "Right Angle": Drag Line 2 until exactly 90°
    - "Altitude": Create perpendicular from point to line
    - "Square Corner": Create perpendicular at specific point

    Verification tools:
    - Slope comparison display
    - Product calculation for perpendicularity
    - Angle measure tool
    - Distance measurement (for parallels)

    Default parameters:
    - Line 1: y = 2x + 1 (slope = 2)
    - Mode: Create Parallel Lines
    - Point P: (3, 5)
    - Background: White to light blue gradient

    Educational callouts:
    - "Parallel: Same slope (m₁ = m₂)"
    - "Perpendicular: Negative reciprocal slopes (m₁ × m₂ = -1)"
    - "To find perpendicular slope: flip and negate"
    - "Example: If m = 2/3, then m⊥ = -3/2"

    Implementation: p5.js with dynamic line generation and relationship verification
</details>

**Example - Parallel Lines:** Write the equation of a line parallel to $y = 3x - 2$ passing through point (1, 4).

Solution:
- Parallel lines have equal slopes, so $m = 3$
- Use point-slope form: $y - 4 = 3(x - 1)$
- Simplify: $y - 4 = 3x - 3$
- Slope-intercept form: $y = 3x + 1$

**Example - Perpendicular Lines:** Write the equation of a line perpendicular to $y = 2x + 5$ passing through point (4, 3).

Solution:
- Original slope: $m_1 = 2$
- Perpendicular slope: $m_2 = -\frac{1}{2}$ (negative reciprocal)
- Use point-slope form: $y - 3 = -\frac{1}{2}(x - 4)$
- Simplify: $y - 3 = -\frac{1}{2}x + 2$
- Slope-intercept form: $y = -\frac{1}{2}x + 5$

## Transversals Revisited

In Chapter 3, you learned about transversals cutting parallel lines and the angle relationships formed. Now with coordinate geometry, we can verify those relationships algebraically.

A **transversal** is a line that intersects two or more other lines. When a transversal crosses two parallel lines on the coordinate plane, we can:

1. Verify the lines are parallel by checking their slopes
2. Find the equations of all three lines
3. Calculate intersection points
4. Measure angles using slopes

#### Drawing: Coordinate Plane Transversal Analysis

<iframe src="../../sims/transversal-coordinate-analysis/main.html" height="752px" width="100%" scrolling="no"></iframe>

[Transversal Analysis MicroSim](/sims/transversal-coordinate-analysis/){ .md-button .md-button--primary }

<details markdown="1">
    <summary>Transversal with Parallel Lines - Coordinate Approach</summary>
    Type: microsim

    **Learning Objective:** Students will analyze transversal-parallel line configurations using coordinate geometry, verifying angle relationships algebraically (Bloom's: **Analyzing**, **Evaluating**, and **Creating**)

    Purpose: Bridge geometric angle relationships with algebraic coordinate methods

    Canvas layout (1000x750px):
    - Graph area (700x650): Coordinate plane with three lines
    - Analysis panel (300x650): Equations, slopes, angle calculations

    Visual elements:
    - Coordinate plane (-10 to 10 on both axes)
    - Two parallel lines (Line 1 and Line 2, both in blue shades)
    - One transversal (Line 3, in red)
    - Eight angles formed at intersections labeled 1-8
    - Intersection points marked clearly
    - Slope triangles for all three lines

    Interactive features:

    Line controls:
    - Parallel Lines 1 & 2:
      - Slider controls slope (both change together)
      - Slider controls y-intercept of Line 1
      - Slider controls y-intercept of Line 2
      - Locked to have equal slopes

    - Transversal Line 3:
      - Slider controls slope (independent)
      - Slider controls y-intercept
      - Can rotate and translate

    Angle labeling:
    - At top intersection: Angles 1, 2, 3, 4
    - At bottom intersection: Angles 5, 6, 7, 8
    - Corresponding angles highlighted in same colors
    - Angle measures calculated and displayed

    Analysis panel displays:

    **Equations:**
    - Line 1: y = m₁x + b₁
    - Line 2: y = m₂x + b₂
    - Transversal: y = m₃x + b₃

    **Slope Verification:**
    - "m₁ = m₂? [value] = [value] ✓ (PARALLEL)"
    - "Lines 1 and 2 are parallel"

    **Intersection Points:**
    - Point A (Line 1 ∩ Transversal): (x₁, y₁)
    - Point B (Line 2 ∩ Transversal): (x₂, y₂)
    - Calculated algebraically by solving system

    **Angle Measures:**
    - Calculated using slope formula: tan(θ) = |(m₂-m₁)/(1+m₁m₂)|
    - All eight angles displayed
    - Relationships verified:
      - "∠1 = ∠5 (corresponding angles)" ✓
      - "∠3 = ∠6 (alternate interior)" ✓
      - "∠3 + ∠5 = 180° (same-side interior)" ✓

    Interactive modes:

    **Mode 1: Explore Relationships**
    - Adjust any slider
    - Watch angles update in real-time
    - Verify relationships hold for any configuration

    **Mode 2: Verify Parallel**
    - Adjust Line 2's y-intercept
    - Keep slopes equal
    - Observe angle relationships remain valid

    **Mode 3: Challenge - Find the Transversal**
    - Given two parallel lines and desired angle
    - Student adjusts transversal slope to create that angle
    - Feedback shows current angles

    **Mode 4: Algebraic Proof**
    - Given line equations
    - Calculate intersection points algebraically
    - Verify angle congruences using slope-based angle formulas
    - Step-by-step solution shown

    Visual features:
    - Corresponding angles highlighted with matching colors
    - Alternate interior angles connected with curved arrows
    - Same-side interior angles shown with brackets
    - Right angle symbol if transversal is perpendicular

    Special tools:
    - "Angle Measure Tool": Click any angle to see exact measure
    - "Intersection Finder": Displays calculation steps
    - "Protractor Overlay": Visual angle measurement
    - "Export Equations": Copy all three line equations

    Challenge problems:
    - "Given ∠1 = 60°, find all other angles"
    - "Create transversal so ∠3 = 45°"
    - "Find transversal through point P that creates specific angle"

    Default parameters:
    - Line 1: y = 2x + 2 (parallel 1)
    - Line 2: y = 2x - 4 (parallel 2)
    - Transversal: y = -x + 5
    - Background: White to light yellow gradient

    Educational connections:
    - Links to Chapter 3 angle relationships
    - Shows algebraic verification of geometric properties
    - Demonstrates power of coordinate methods

    Implementation: p5.js with algebraic solvers for intersections and angles
</details>

## Real-World Applications of Coordinate Geometry

Coordinate geometry isn't just abstract mathematics—it's the foundation for countless real-world applications:

**GPS and Navigation:**
- Every location on Earth has coordinates (latitude, longitude)
- Distance formula calculates "as the crow flies" distances
- Slope determines direction of travel

**Computer Graphics and Gaming:**
- Every pixel on screen has coordinates
- Lines, curves, and shapes defined by equations
- Collision detection uses distance formulas

**Architecture and Engineering:**
- Building plans use coordinate systems
- Parallel and perpendicular relationships ensure structural integrity
- Slopes determine roof pitches and ramps

**Data Visualization:**
- Graphs plot data points on coordinate planes
- Trend lines show relationships (slope = rate of change)
- Distance measures correlation

**Physics and Science:**
- Position graphs show motion (slope = velocity)
- Vector components use coordinates
- Trajectories described by equations

## Practice Problems

To master coordinate geometry, practice these problems:

**Distance and Midpoint:**

1. Find the distance between A(-3, 4) and B(5, -2).
2. Find the midpoint of the segment with endpoints C(7, -1) and D(-3, 5).
3. Point M(2, 4) is the midpoint of segment PQ. If P is at (-1, 3), find Q.

**Slope:**

4. Find the slope of the line through E(3, 7) and F(-2, -3).
5. Determine if the line through G(1, 4) and H(5, 2) is parallel to the line through J(-2, 1) and K(2, -1).

**Equations:**

6. Write the equation of a line with slope -2 and y-intercept 5.
7. Write the equation of a line through point (4, -3) with slope 1/2.
8. Write the equation of a line parallel to $y = 3x + 1$ through point (-2, 4).
9. Write the equation of a line perpendicular to $y = -4x + 2$ through point (8, 1).

**Solutions:**

1. $d = \sqrt{(5-(-3))^2 + (-2-4)^2} = \sqrt{64 + 36} = \sqrt{100} = 10$ units
2. $M = \left(\frac{7+(-3)}{2}, \frac{-1+5}{2}\right) = (2, 2)$
3. Using midpoint formula: $2 = \frac{-1+x_Q}{2}$ and $4 = \frac{3+y_Q}{2}$, so $Q(5, 5)$
4. $m = \frac{-3-7}{-2-3} = \frac{-10}{-5} = 2$
5. Slope GH: $\frac{2-4}{5-1} = -\frac{1}{2}$; Slope JK: $\frac{-1-1}{2-(-2)} = -\frac{1}{2}$; Equal slopes → parallel!
6. $y = -2x + 5$
7. $y - (-3) = \frac{1}{2}(x - 4)$ or $y = \frac{1}{2}x - 5$
8. Same slope (3): $y - 4 = 3(x - (-2))$ or $y = 3x + 10$
9. Perpendicular slope ($\frac{1}{4}$): $y - 1 = \frac{1}{4}(x - 8)$ or $y = \frac{1}{4}x - 1$

## Summary and Key Concepts

In this chapter, you've bridged the gap between algebra and geometry by mastering coordinate methods for analyzing geometric figures.

**Key Formulas:**

- **Distance Formula**: $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
- **Midpoint Formula**: $M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$
- **Slope Formula**: $m = \frac{y_2 - y_1}{x_2 - x_1}$
- **Slope-Intercept Form**: $y = mx + b$
- **Point-Slope Form**: $y - y_1 = m(x - x_1)$

**Important Relationships:**

- **Parallel lines**: Equal slopes ($m_1 = m_2$)
- **Perpendicular lines**: Negative reciprocal slopes ($m_1 \cdot m_2 = -1$)
- **Slope types**: Positive (uphill), Negative (downhill), Zero (horizontal), Undefined (vertical)

**The Power of Coordinate Geometry:**

Coordinate geometry allows you to:
- Prove geometric theorems algebraically
- Calculate exact distances without measuring
- Verify parallel and perpendicular relationships
- Find equations that describe infinite lines
- Connect visual geometry with numerical algebra

These tools form the foundation for advanced topics in mathematics, physics, computer science, and engineering. By mastering coordinate geometry, you've gained powerful methods for analyzing and solving problems in both pure and applied mathematics.

!!! mascot-celebration "Great Work!"

    You've connected algebra and geometry into one powerful toolkit! The distance formula, midpoint formula, slope, and line equations will be your trusted companions throughout the rest of this course. Be proud of how far you've come!

---

**Next Steps:** With coordinate geometry skills in hand, you're ready to explore transformations and congruence, using coordinates to precisely describe geometric motions and prove figures are congruent!
