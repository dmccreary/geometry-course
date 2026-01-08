# Circles

## Summary

This chapter explores circles including their parts (chords, tangents, secants), angle relationships (central and inscribed angles), arc measures, and equations in the coordinate plane. You'll learn important theorems about angles formed by chords, tangents, and secants, and discover how to calculate arc lengths and sector areas. The chapter culminates in writing equations of circles and working with inscribed and circumscribed polygons.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Circle
2. Center of Circle
3. Radius
4. Diameter
5. Chord
6. Secant
7. Tangent to Circle
8. Point of Tangency
9. Central Angle
10. Inscribed Angle
11. Intercepted Arc
12. Major Arc
13. Minor Arc
14. Semicircle
15. Arc Length
16. Sector
17. Segment of Circle
18. Inscribed Polygon
19. Circumscribed Polygon
20. Equation of Circle

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)
- [Chapter 3: Angles and Angle Relationships](../03-angles-and-relationships/index.md)
- [Chapter 5: Coordinate Geometry and Lines](../05-coordinate-geometry/index.md)
- [Chapter 9: Polygons and Quadrilaterals](../09-polygons-quadrilaterals/index.md)

---

## Introduction to Circles

Circles are among the most perfect and symmetrical shapes in geometry. From wheels and gears to pizzas and planets, circular forms appear throughout nature and human design. Unlike polygons with straight edges and corners, circles possess a continuous curve that is equidistant from a central point at every location.

In this chapter, you'll explore the special properties of circles, learn how different lines and angles interact with them, and discover how to calculate measurements involving arcs and sectors. You'll also see how circles fit into the coordinate plane through their equations.

### What Is a Circle?

A **circle** is the set of all points in a plane that are the same distance from a fixed point. This fixed point is called the **center of the circle**, and the constant distance from the center to any point on the circle is the **radius**.

#### Equation: Radius Definition

$r = d$

where:

- $r$ is the radius
- $d$ is the distance from the center to any point on the circle

The **diameter** of a circle is a line segment that passes through the center and connects two points on the circle. The diameter is always twice the radius.

#### Equation: Diameter and Radius Relationship

$d = 2r$

where:

- $d$ is the diameter
- $r$ is the radius

#### Diagram: Parts of a Circle
<details markdown="1">
    <summary>Basic Circle Components</summary>
    Type: microsim

    **Learning Objective:** Students will identify and label the basic components of a circle (center, radius, diameter) by interacting with a visual representation.
    **Bloom's Taxonomy Level:** Remembering - Recalling facts and basic concepts about circle terminology.

    Purpose: Help students identify and understand the fundamental parts of a circle through interactive visualization.

    Canvas layout (620x420px):
    - Main drawing area showing a circle with labeled parts
    - Bottom control panel (height: 60px)

    Visual elements:
    - Large circle (radius 120px) centered in the canvas
    - Center point marked with a small red dot and labeled "Center"
    - Two radius lines drawn from center to circle edge (different colors: blue and green)
    - Labels "Radius r" on radius lines
    - One diameter line passing through center (orange color)
    - Label "Diameter d = 2r" on diameter
    - Measurements displayed numerically

    Interactive controls:
    - Slider: "Circle Size" (radius from 50 to 180, default 120, step 10)
    - Label showing current radius value
    - Label showing current diameter value (automatically calculated)

    Default parameters:
    - Initial radius: 120px
    - Circle color: light blue stroke, no fill
    - Background: alice blue

    Behavior:
    - When slider moves, circle size changes dynamically
    - Radius and diameter lines scale proportionally
    - Numeric labels update in real-time
    - All parts remain clearly visible and labeled

    Implementation: p5.js with createSlider for interactive control
</details>

<iframe src="../../sims/circle-parts-explorer/main.html" height="502px" width="100%" scrolling="no"></iframe>

### Lines That Intersect Circles

Circles interact with lines in several special ways. Understanding these relationships helps us solve problems involving tangent lines, intersecting chords, and secant lines.

A **chord** is a line segment whose endpoints both lie on the circle. The diameter is the longest possible chord of any circle, as it passes through the center.

#### Diagram: Chords in a Circle
<details markdown="1">
    <summary>Chord Visualization</summary>
    Type: microsim

    **Learning Objective:** Students will distinguish between different types of chords and recognize that the diameter is the longest chord.
    **Bloom's Taxonomy Level:** Understanding - Explaining the relationship between chords and the diameter.

    Purpose: Demonstrate various chords of different lengths within a circle, emphasizing that the diameter is the longest chord.

    Canvas layout (620x420px):
    - Main drawing area (620x360px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle (radius 140px) centered in upper area
    - Multiple chords of varying lengths shown in different colors:
      - Short chord (blue) not passing through center
      - Medium chord (green) not passing through center
      - Long chord (purple) not passing through center
      - Diameter (red) passing through center
    - Each chord labeled with its length
    - Center point marked
    - Perpendicular distances from center to each chord shown as dotted lines

    Interactive controls:
    - Button: "Show New Chords" - generates random chord positions
    - Checkbox: "Show Perpendicular Distances" (default: on)
    - Display: "Longest chord = Diameter"

    Default parameters:
    - Circle radius: 140px
    - Number of chords: 4 (including diameter)
    - Background: alice blue

    Behavior:
    - Clicking button generates new random chords
    - Diameter always displayed in red
    - When checkbox enabled, perpendicular lines from center to each chord are shown
    - Chord lengths displayed dynamically

    Implementation: p5.js with random chord generation and distance calculations
</details>

A **secant** is a line (not just a segment) that intersects the circle at exactly two points. You can think of a secant as an extended chord that continues beyond the circle in both directions.

A **tangent to a circle** is a line that touches the circle at exactly one point. This special point where the tangent meets the circle is called the **point of tangency**. An important property: a tangent line is always perpendicular to the radius drawn to the point of tangency.

#### Diagram: Secants and Tangents
<details markdown="1">
    <summary>Secant and Tangent Line Interactive</summary>
    Type: microsim

    **Learning Objective:** Students will differentiate between secants and tangents and verify that a tangent is perpendicular to the radius at the point of tangency.
    **Bloom's Taxonomy Level:** Applying - Using knowledge of perpendicularity to verify tangent properties.

    Purpose: Illustrate the difference between secant and tangent lines and demonstrate the perpendicular relationship between tangent and radius.

    Canvas layout (620x480px):
    - Main drawing area (620x420px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle (radius 120px) centered in canvas
    - One secant line (blue) intersecting circle at two points
    - One tangent line (red) touching circle at one point
    - Radius line (green) drawn to point of tangency
    - Small right-angle indicator at point of tangency
    - Labels: "Secant", "Tangent", "Radius", "Point of Tangency"
    - Intersection points marked with dots

    Interactive controls:
    - Slider: "Rotate Tangent" (0-360 degrees, default 45)
    - Slider: "Rotate Secant" (0-360 degrees, default 135)
    - Checkbox: "Show Right Angle" (default: on)

    Default parameters:
    - Circle radius: 120px
    - Tangent angle: 45 degrees
    - Secant angle: 135 degrees
    - Background: alice blue

    Behavior:
    - Tangent slider rotates the tangent line around the circle
    - Radius always points to tangent's point of contact
    - Right angle indicator always shows 90° between tangent and radius
    - Secant slider changes secant line position and angle
    - Secant always intersects at two points
    - All labels follow their respective elements

    Implementation: p5.js with trigonometric calculations for perpendicularity
</details>

### Angles in Circles

Circles create several types of angles with special relationships. Understanding these angles and their measurements is essential for solving circle problems.

A **central angle** is an angle whose vertex is at the center of the circle. The two sides of a central angle are radii of the circle. Central angles are measured in degrees, and a full rotation around the center is 360°.

An **inscribed angle** is an angle formed by two chords that share an endpoint on the circle. The vertex of an inscribed angle lies on the circle itself, not at the center.

Here's a fundamental relationship: An inscribed angle is always half the measure of the central angle that subtends the same arc.

#### Equation: Inscribed Angle Theorem

$m\angle_{inscribed} = \frac{1}{2} m\angle_{central}$

where:

- $m\angle_{inscribed}$ is the measure of the inscribed angle
- $m\angle_{central}$ is the measure of the central angle subtending the same arc

#### Diagram: Central and Inscribed Angles
<details markdown="1">
    <summary>Central vs Inscribed Angles Interactive</summary>
    Type: microsim

    **Learning Objective:** Students will analyze the relationship between central and inscribed angles that intercept the same arc, discovering that the inscribed angle measures half the central angle.
    **Bloom's Taxonomy Level:** Analyzing - Breaking down the relationship between different angle types and drawing comparisons.

    Purpose: Demonstrate the inscribed angle theorem by showing a central angle and inscribed angle intercepting the same arc.

    Canvas layout (720x520px):
    - Main drawing area (720x460px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle (radius 140px) centered in canvas
    - Central angle drawn from center with two radii (blue)
    - Inscribed angle with vertex on circle, intercepting same arc (red)
    - Arc between the two intersection points highlighted (yellow/gold)
    - Angle measurements displayed inside each angle
    - Labels: "Central Angle", "Inscribed Angle", "Intercepted Arc"
    - Relationship equation displayed: "Inscribed = ½ × Central"

    Interactive controls:
    - Slider: "Central Angle" (30-180 degrees, default 90, step 10)
    - Display: "Central Angle = [value]°"
    - Display: "Inscribed Angle = [calculated]°"
    - Button: "Move Inscribed Vertex" - changes position on circle

    Default parameters:
    - Circle radius: 140px
    - Central angle: 90 degrees
    - Background: alice blue

    Behavior:
    - Slider changes central angle measure
    - Inscribed angle automatically updates to half the central angle
    - Both angles intercept the same arc (highlighted in gold)
    - Button moves inscribed angle vertex to different positions on circle
    - Inscribed angle measure remains half of central regardless of vertex position
    - Real-time calculation display shows the 1:2 relationship

    Implementation: p5.js with angle calculations and dynamic arc highlighting
</details>

<iframe src="../../sims/inscribed-angle-theorem/main.html" height="552px" width="100%" scrolling="no"></iframe>

The arc between the two points where the angle's sides intersect the circle is called the **intercepted arc**. When working with arcs, we distinguish between two types:

- A **minor arc** is less than 180° (semicircle)
- A **major arc** is greater than 180°
- A **semicircle** is exactly 180° (half the circle)

Minor arcs are typically named with two letters (the endpoints), while major arcs use three letters to avoid confusion.

#### Diagram: Arc Types
<details markdown="1">
    <summary>Major Arcs, Minor Arcs, and Semicircles</summary>
    Type: microsim

    **Learning Objective:** Students will classify arcs as minor, major, or semicircles based on their degree measure.
    **Bloom's Taxonomy Level:** Understanding - Classifying arcs into categories based on their properties.

    Purpose: Help students distinguish between minor arcs, major arcs, and semicircles through visual representation.

    Canvas layout (620x420px):
    - Main drawing area (620x360px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle (radius 130px) centered in canvas
    - Two points marked on circle (A and B)
    - Minor arc highlighted in one color (green)
    - Major arc highlighted in another color (orange)
    - Arc measures displayed on each arc
    - Labels showing arc notation: "Arc AB" and "Arc ACB" (using intermediate point C)
    - Center marked with small dot
    - Radii to points A and B shown as dashed lines

    Interactive controls:
    - Slider: "Central Angle" (30-180 degrees, default 120, step 10)
    - Display: "Minor Arc = [angle]°"
    - Display: "Major Arc = [360-angle]°"
    - Checkbox: "Show as Semicircle" - locks angle at 180°

    Default parameters:
    - Circle radius: 130px
    - Initial central angle: 120 degrees
    - Background: alice blue

    Behavior:
    - Slider adjusts central angle
    - Minor arc and major arc measures update automatically (sum = 360°)
    - When central angle = 180°, both arcs are labeled "Semicircle"
    - Color coding helps distinguish arc types
    - Arc notation updates based on type

    Implementation: p5.js with arc drawing and trigonometric positioning
</details>

### Arc Length and Sectors

Once you understand angles and arcs, you can calculate actual distances along the circle's edge and areas of circle slices.

**Arc length** is the distance along the curved edge of the circle between two points. Arc length is proportional to the central angle: if the angle is larger, the arc is longer.

#### Equation: Arc Length Formula

$L = \frac{\theta}{360°} \times 2\pi r$

where:

- $L$ is the arc length
- $\theta$ is the central angle in degrees
- $r$ is the radius of the circle
- $\pi \approx 3.14159$

Alternatively, if the angle is in radians:

$L = \theta \times r$

where:

- $\theta$ is the central angle in radians

A **sector** is a region of a circle bounded by two radii and the arc between them. Think of a sector as a "slice" of the circle, like a slice of pizza. The area of a sector depends on the central angle.

#### Equation: Sector Area Formula

$A_{sector} = \frac{\theta}{360°} \times \pi r^2$

where:

- $A_{sector}$ is the area of the sector
- $\theta$ is the central angle in degrees
- $r$ is the radius of the circle

#### Diagram: Arc Length and Sector Area Calculator
<details markdown="1">
    <summary>Interactive Arc Length and Sector MicroSim</summary>
    Type: microsim

    **Learning Objective:** Students will apply formulas for arc length and sector area to calculate measurements for various central angles and radii.
    **Bloom's Taxonomy Level:** Applying - Using formulas to solve problems in new situations.

    Purpose: Allow students to experiment with different radii and central angles to see how arc length and sector area change.

    Canvas layout (720x520px):
    - Left side (520x520px): Drawing area showing circle with sector
    - Right side (200x520px): Control panel and calculation display

    Visual elements:
    - Circle drawn with given radius (outline only)
    - Sector highlighted with semi-transparent fill (gold/yellow)
    - Two radii forming the sector (blue lines)
    - Arc highlighted in thicker stroke (red)
    - Arc length marked with dimension line
    - Center point labeled
    - Angle measure displayed at center

    Interactive controls:
    - Slider: "Radius (r)" (50-200px, default 120, step 10)
    - Slider: "Central Angle (θ)" (10-360 degrees, default 90, step 5)
    - Display panel showing:
      - "Radius: [r] units"
      - "Angle: [θ]°"
      - "Arc Length: [calculated] units"
      - "Sector Area: [calculated] square units"
    - Button: "Show Formulas" - reveals equations used

    Default parameters:
    - Radius: 120px
    - Central angle: 90 degrees
    - Background: alice blue

    Behavior:
    - Sliders adjust radius and angle in real-time
    - Circle and sector resize/reshape accordingly
    - Arc length and sector area calculate automatically
    - Values displayed with 2 decimal places
    - When "Show Formulas" clicked, equations appear below calculations
    - Sector fill becomes more/less visible based on angle size

    Implementation: p5.js with arc length = (θ/360) × 2πr and area = (θ/360) × πr²
</details>

<iframe src="../../sims/circle-area-explorer/main.html" height="502px" width="100%" scrolling="no"></iframe>

A **segment of a circle** is the region between a chord and the arc it cuts off. Unlike a sector (which includes two radii), a segment has a chord as one of its boundaries. To find the area of a segment, you subtract the area of the triangle formed by the chord and the two radii from the area of the sector.

#### Diagram: Circle Segment Visualization
<details markdown="1">
    <summary>Circle Segment vs Sector</summary>
    Type: diagram

    **Learning Objective:** Students will differentiate between sectors and segments of a circle by analyzing their boundaries and components.
    **Bloom's Taxonomy Level:** Analyzing - Comparing and contrasting two related geometric regions.

    Purpose: Clarify the difference between a sector (bounded by two radii and an arc) and a segment (bounded by a chord and an arc).

    Layout: Side-by-side comparison, 800x400px

    Left side (400x400px):
    - Title: "Sector"
    - Circle with radius 120px
    - Sector highlighted in light blue
    - Two radii shown as solid lines (blue)
    - Arc shown in bold (red)
    - Labels: "Radius", "Radius", "Arc"
    - Annotation: "Bounded by 2 radii + arc"

    Right side (400x400px):
    - Title: "Segment"
    - Same circle with radius 120px
    - Segment highlighted in light green
    - Chord shown as solid line (green)
    - Arc shown in bold (red)
    - Two radii shown as dashed lines (gray, for reference)
    - Labels: "Chord", "Arc"
    - Annotation: "Bounded by chord + arc"

    Visual style: Clean, educational diagram with clear color coding

    Color scheme:
    - Sectors: light blue fill
    - Segments: light green fill
    - Radii: blue solid or gray dashed
    - Chords: green solid
    - Arcs: red bold

    Implementation: SVG or p5.js static diagram with labels
</details>

### Relationships Between Chords, Tangents, and Angles

Circles have many elegant theorems that describe how chords, tangents, secants, and angles relate to each other.

Here are some important properties:

**Chord-Chord Angle:** When two chords intersect inside a circle, the measure of the angle formed is half the sum of the measures of the intercepted arcs.

**Tangent-Chord Angle:** The measure of an angle formed by a tangent and a chord is half the measure of the intercepted arc.

**Secant-Secant Angle:** When two secants intersect outside the circle, the measure of the angle formed is half the difference of the measures of the intercepted arcs.

#### Diagram: Angle Relationships in Circles
<details markdown="1">
    <summary>Special Angle Theorems Interactive</summary>
    Type: microsim

    **Learning Objective:** Students will evaluate angle measures using theorems for angles formed by chords, tangents, and secants.
    **Bloom's Taxonomy Level:** Evaluating - Making judgments about which theorem applies and checking calculations.

    Purpose: Demonstrate three important angle relationships: chord-chord, tangent-chord, and secant-secant angles.

    Canvas layout (900x520px):
    - Three panels side by side (300px each width, 460px height)
    - Control panel at bottom (height: 60px)

    Panel 1: Chord-Chord Angle
    - Circle with two intersecting chords inside
    - Angle at intersection highlighted
    - Two intercepted arcs marked and labeled with measures
    - Formula displayed: "Angle = ½(arc₁ + arc₂)"
    - Calculation shown

    Panel 2: Tangent-Chord Angle
    - Circle with tangent line and chord meeting at point on circle
    - Angle between them highlighted
    - Intercepted arc marked and labeled
    - Formula displayed: "Angle = ½(arc)"
    - Calculation shown

    Panel 3: Secant-Secant Angle
    - Circle with two secants intersecting outside
    - Angle at intersection highlighted
    - Two intercepted arcs marked (near and far)
    - Formula displayed: "Angle = ½(far arc - near arc)"
    - Calculation shown

    Interactive controls:
    - Dropdown: "Select Theorem" (Chord-Chord, Tangent-Chord, Secant-Secant)
    - Slider: "Arc Measure 1" (20-160 degrees, step 10)
    - Slider: "Arc Measure 2" (20-160 degrees, step 10) [disabled for tangent-chord]
    - Display: "Calculated Angle = [value]°"

    Default parameters:
    - Arc 1: 80 degrees
    - Arc 2: 60 degrees
    - Background: alice blue

    Behavior:
    - Dropdown switches between the three theorem types
    - Sliders adjust arc measures
    - Angle calculations update in real-time
    - Only relevant sliders are active for each theorem
    - Color coding highlights which arcs are used in calculation

    Implementation: p5.js with conditional rendering based on selected theorem
</details>

### Tangent and Secant Segment Relationships

When two secants, two tangents, or a secant and a tangent are drawn from the same external point, the lengths of their segments have special relationships.

**Power of a Point Theorem:** If two secants are drawn from an external point, the product of the lengths of one secant segment and its external part equals the product for the other secant.

If $PA$ and $PB$ are two secants from external point $P$, then:

#### Equation: Power of a Point (Two Secants)

$PA \times PC = PB \times PD$

where:

- $P$ is the external point
- $A$ and $C$ are intersection points on the circle for one secant
- $B$ and $D$ are intersection points for the other secant

**Tangent-Secant Relationship:** If a tangent and a secant are drawn from the same external point, the square of the tangent length equals the product of the secant length and its external part.

#### Equation: Tangent-Secant Theorem

$PT^2 = PA \times PB$

where:

- $PT$ is the length of the tangent segment
- $PA$ is the full length of the secant from external point
- $PB$ is the external part of the secant

#### Diagram: Power of a Point Visualization
<details markdown="1">
    <summary>Tangent and Secant Segment Products</summary>
    Type: microsim

    **Learning Objective:** Students will verify the power of a point theorem by observing that segment products remain equal as geometric configurations change.
    **Bloom's Taxonomy Level:** Evaluating - Assessing the validity of the theorem through multiple test cases.

    Purpose: Demonstrate the power of a point theorem with interactive manipulation.

    Canvas layout (720x540px):
    - Main drawing area (720x480px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle (radius 120px) centered in canvas
    - External point P positioned outside circle (moveable)
    - Two secants drawn from P through circle (blue and green)
    - Segments labeled with lengths
    - Product calculations displayed near each secant
    - Verification message: "PA × PC = PB × PD" with values

    Interactive controls:
    - Slider: "Move Point P" (horizontal position, 50-300px from center, step 10)
    - Slider: "Rotate Secant 1" (0-360 degrees, step 5)
    - Slider: "Rotate Secant 2" (0-360 degrees, step 5)
    - Display: "Product 1 = [PA × PC]"
    - Display: "Product 2 = [PB × PD]"
    - Display: "Difference = [abs difference]" (should be ≈ 0)

    Default parameters:
    - Point P: 200px from center
    - Secant 1 angle: 30 degrees
    - Secant 2 angle: 150 degrees
    - Background: alice blue

    Behavior:
    - Sliders move point P and rotate secants
    - Segment lengths calculate and update dynamically
    - Products compute in real-time
    - Difference display shows products are equal (within rounding)
    - Color highlighting when products match exactly

    Implementation: p5.js with line-circle intersection calculations and distance formulas
</details>

### Inscribed and Circumscribed Polygons

Polygons and circles have special relationships when one is drawn inside or around the other.

An **inscribed polygon** is a polygon whose vertices all lie on a circle. The circle is said to be **circumscribed** about the polygon. Every triangle has a circumscribed circle (called the circumcircle), and its center is equidistant from all three vertices.

A **circumscribed polygon** is a polygon whose sides are all tangent to a circle. The circle is said to be **inscribed** in the polygon. Not all polygons have inscribed circles, but regular polygons (with all sides and angles equal) always do.

#### Diagram: Inscribed and Circumscribed Polygons
<details markdown="1">
    <summary>Polygons and Circles Relationships</summary>
    Type: microsim

    **Learning Objective:** Students will distinguish between inscribed polygons (vertices on circle) and circumscribed polygons (sides tangent to circle) through interactive visualization.
    **Bloom's Taxonomy Level:** Understanding - Explaining the difference between two related concepts.

    Purpose: Clarify the difference between inscribed and circumscribed polygons with side-by-side comparison.

    Canvas layout (800x440px):
    - Left panel (400x400px): Inscribed polygon
    - Right panel (400x400px): Circumscribed polygon
    - Control bar at bottom (height: 40px)

    Left Panel - Inscribed Polygon:
    - Circle (radius 140px)
    - Regular polygon with vertices ON the circle
    - Vertices marked with dots
    - Label: "Inscribed Polygon (vertices on circle)"
    - Label: "Circle is circumscribed"

    Right Panel - Circumscribed Polygon:
    - Circle (radius 100px)
    - Regular polygon with sides TANGENT to circle
    - Tangent points marked with small dots
    - Perpendicular radii to tangent points shown (dashed)
    - Label: "Circumscribed Polygon (sides tangent)"
    - Label: "Circle is inscribed"

    Interactive controls:
    - Slider: "Number of Sides" (3-8, default 5, step 1)
    - Display: "Regular [n]-gon"

    Default parameters:
    - Number of sides: 5 (pentagon)
    - Background: alice blue

    Behavior:
    - Slider changes number of polygon sides
    - Both polygons update simultaneously
    - All polygons remain regular (equal sides and angles)
    - Left polygon vertices always touch circle
    - Right polygon sides always tangent to circle
    - Radii and tangent points update accordingly

    Implementation: p5.js with trigonometric calculations for regular polygon vertices
</details>

Here's an important relationship for inscribed quadrilaterals:

**Inscribed Quadrilateral Theorem:** If a quadrilateral is inscribed in a circle, then its opposite angles are supplementary (they add up to 180°).

#### Equation: Opposite Angles in Inscribed Quadrilateral

$\angle A + \angle C = 180°$

$\angle B + \angle D = 180°$

where:

- $\angle A, \angle B, \angle C, \angle D$ are the four angles of the inscribed quadrilateral

#### Diagram: Inscribed Quadrilateral Angle Sums
<details markdown="1">
    <summary>Inscribed Quadrilateral Interactive</summary>
    Type: microsim

    **Learning Objective:** Students will verify that opposite angles in an inscribed quadrilateral are supplementary by manipulating the quadrilateral and observing angle sums.
    **Bloom's Taxonomy Level:** Analyzing - Examining the relationship between opposite angles and testing the theorem.

    Purpose: Demonstrate that opposite angles in an inscribed quadrilateral always sum to 180°.

    Canvas layout (720x520px):
    - Main drawing area (720x460px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle (radius 150px) centered in canvas
    - Quadrilateral inscribed in circle with 4 vertices on circle
    - Vertices labeled A, B, C, D (clockwise)
    - All four angles marked and measured
    - Angle arcs drawn at each vertex (color-coded)
    - Display boxes showing:
      - "∠A = [value]°"
      - "∠B = [value]°"
      - "∠C = [value]°"
      - "∠D = [value]°"
      - "∠A + ∠C = [sum]°"
      - "∠B + ∠D = [sum]°"
    - Opposite angle pairs color-matched (A & C in red, B & D in blue)

    Interactive controls:
    - Slider: "Move Vertex A" (angle position 0-360°, default 20)
    - Slider: "Move Vertex B" (angle position 0-360°, default 110)
    - Slider: "Move Vertex C" (angle position 0-360°, default 200)
    - Slider: "Move Vertex D" (angle position 0-360°, default 290)
    - Constraint: Sliders maintain clockwise order

    Default parameters:
    - Four vertices evenly distributed initially
    - Background: alice blue

    Behavior:
    - Sliders move vertices around circle
    - Quadrilateral shape changes dynamically
    - Angle measures update in real-time
    - Opposite angle sums always equal 180° (highlighted in green)
    - Color coding reinforces which angles are opposite

    Implementation: p5.js with angle calculations using vertex positions and arc measures
</details>

### Equations of Circles in the Coordinate Plane

Just as we can write equations for lines, we can write equations for circles in the coordinate plane.

The standard **equation of a circle** with center $(h, k)$ and radius $r$ is:

#### Equation: Standard Form of Circle

$(x - h)^2 + (y - k)^2 = r^2$

where:

- $(x, y)$ is any point on the circle
- $(h, k)$ is the center of the circle
- $r$ is the radius

This equation says that every point $(x, y)$ on the circle is exactly distance $r$ from the center $(h, k)$. The equation comes directly from the distance formula.

#### Example: Circle with Center (2, -3) and Radius 5

If the center is at $(2, -3)$ and the radius is 5, then:

$(x - 2)^2 + (y - (-3))^2 = 5^2$

$(x - 2)^2 + (y + 3)^2 = 25$

When the center is at the origin $(0, 0)$, the equation simplifies to:

$x^2 + y^2 = r^2$

#### Diagram: Circle Equation Interactive Grapher
<details markdown="1">
    <summary>Graphing Circles on Coordinate Plane</summary>
    Type: microsim

    **Learning Objective:** Students will create the equation of a circle given its center and radius, and verify points lie on the circle by testing the equation.
    **Bloom's Taxonomy Level:** Creating - Producing equations for circles with different parameters and testing their validity.

    Purpose: Allow students to manipulate circle parameters and see how the equation and graph change together.

    Canvas layout (760x560px):
    - Coordinate plane (560x560px) with grid
    - Control panel on right (200px width)

    Visual elements:
    - Coordinate axes with tick marks and labels
    - Grid lines (spacing: 40px = 1 unit)
    - Circle drawn with given center and radius
    - Center point marked with red dot and labeled (h, k)
    - Radius line shown from center to a point on circle
    - Equation displayed above graph: $(x - h)^2 + (y - k)^2 = r^2$
    - Several test points plotted (some on circle, some not)

    Interactive controls:
    - Slider: "Center x (h)" (-5 to 5, default 0, step 0.5)
    - Slider: "Center y (k)" (-5 to 5, default 0, step 0.5)
    - Slider: "Radius (r)" (1 to 5, default 2, step 0.5)
    - Display: Current equation with actual values substituted
    - Button: "Add Test Point" - click to place point on graph
    - Display: "Point [x, y]: " with "ON circle" or "NOT on circle" indicator

    Default parameters:
    - Center: (0, 0)
    - Radius: 2 units
    - Coordinate plane: -7 to 7 on both axes
    - Background: white with light gray grid

    Behavior:
    - Sliders change center position and radius
    - Circle redraws dynamically
    - Equation updates with new values
    - Test points can be added by clicking
    - Each test point is checked against equation
    - Points ON circle shown in green, points OFF shown in red
    - Distance from center to test point displayed

    Implementation: p5.js with coordinate transformation and distance checking
</details>

Sometimes circle equations appear in **expanded form** rather than standard form:

$x^2 + y^2 + Dx + Ey + F = 0$

To convert this to standard form, you need to **complete the square** for both $x$ and $y$ terms. This process reveals the center and radius.

#### Example: Converting to Standard Form

Given: $x^2 + y^2 - 4x + 6y - 12 = 0$

Group $x$ and $y$ terms:

$(x^2 - 4x) + (y^2 + 6y) = 12$

Complete the square:

$(x^2 - 4x + 4) + (y^2 + 6y + 9) = 12 + 4 + 9$

$(x - 2)^2 + (y + 3)^2 = 25$

This reveals center $(2, -3)$ and radius $r = 5$.

#### Diagram: Completing the Square for Circles
<details markdown="1">
    <summary>Converting Circle Equations Interactive</summary>
    Type: microsim

    **Learning Objective:** Students will apply the completing-the-square method to convert circle equations from general form to standard form.
    **Bloom's Taxonomy Level:** Applying - Using a learned procedure to transform equations into a more useful form.

    Purpose: Guide students through the process of completing the square to find center and radius from expanded form.

    Canvas layout (800x600px):
    - Left side (500x600px): Step-by-step process display
    - Right side (300x600px): Visual circle representation

    Left Side - Step Display:
    - Original equation shown at top
    - Step 1: Group x and y terms
    - Step 2: Complete the square for x
    - Step 3: Complete the square for y
    - Step 4: Simplify to standard form
    - Final result: Center (h, k) and radius r
    - Each step color-coded and clearly labeled

    Right Side - Visual:
    - Coordinate grid showing the circle
    - Center marked and labeled
    - Radius drawn and labeled
    - Equation in standard form displayed

    Interactive controls:
    - Slider: "Coefficient D" (-10 to 10, default -4, step 2)
    - Slider: "Coefficient E" (-10 to 10, default 6, step 2)
    - Slider: "Constant F" (-20 to 20, default -12, step 2)
    - Button: "Generate New Equation"
    - Checkbox: "Show Step-by-Step" (default: on)

    Default parameters:
    - D = -4, E = 6, F = -12
    - Resulting center: (2, -3), radius: 5
    - Background: alice blue

    Behavior:
    - Sliders change equation coefficients
    - All steps recalculate automatically
    - Visual circle updates to match solution
    - If "Show Step-by-Step" unchecked, only show original and final
    - Button generates random valid circle equation
    - Invalid equations (imaginary radius) flagged with warning

    Implementation: p5.js with algebraic manipulation and step display
</details>

### Finding Points of Intersection

Circles can intersect with lines and with other circles. Finding these intersection points requires solving systems of equations.

**Line-Circle Intersection:** A line can intersect a circle at zero, one, or two points:

- **0 points:** Line misses the circle entirely
- **1 point:** Line is tangent to the circle
- **2 points:** Line is a secant (cuts through)

To find intersection points, substitute the line equation into the circle equation and solve the resulting quadratic.

#### Diagram: Line-Circle Intersection Cases
<details markdown="1">
    <summary>Line and Circle Intersection Explorer</summary>
    Type: microsim

    **Learning Objective:** Students will analyze line-circle intersection scenarios to determine the number of intersection points based on geometric configuration.
    **Bloom's Taxonomy Level:** Analyzing - Examining different cases and determining intersection count.

    Purpose: Explore the three cases of line-circle intersection: no intersection, tangent (1 point), and secant (2 points).

    Canvas layout (720x520px):
    - Coordinate plane (720x460px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - Circle centered at origin (radius adjustable)
    - Line drawn across plane (slope and intercept adjustable)
    - Intersection points marked with large red dots
    - Distance from center to line shown as perpendicular segment (dashed)
    - Labels showing:
      - Number of intersection points
      - Distance from center to line
      - Relationship: "Distance < r", "Distance = r", or "Distance > r"

    Interactive controls:
    - Slider: "Circle Radius (r)" (1-4 units, default 2.5, step 0.1)
    - Slider: "Line Slope (m)" (-3 to 3, default 0.5, step 0.1)
    - Slider: "Line Intercept (b)" (-4 to 4, default 1, step 0.1)
    - Display: "Intersection Points: [0, 1, or 2]"
    - Display: "Distance to Line: [value] units"

    Default parameters:
    - Circle radius: 2.5 units
    - Line: y = 0.5x + 1
    - Coordinate plane: -6 to 6 on both axes
    - Background: alice blue with grid

    Behavior:
    - Sliders adjust circle size and line position/slope
    - Intersection points calculate and display in real-time
    - Perpendicular distance from center to line shown visually
    - Color coding:
      - Green: 2 intersections (secant)
      - Yellow: 1 intersection (tangent)
      - Red: 0 intersections (miss)
    - Equation solutions shown when applicable

    Implementation: p5.js with quadratic formula for intersection calculation
</details>

**Circle-Circle Intersection:** Two circles can intersect at zero, one, or two points depending on their relative positions:

- **0 points:** Circles are too far apart or one is inside the other
- **1 point:** Circles are externally or internally tangent
- **2 points:** Circles intersect at two distinct points

The number of intersections depends on the distance between centers and the sum/difference of radii.

#### Diagram: Circle-Circle Intersection Cases
<details markdown="1">
    <summary>Two Circles Intersection Explorer</summary>
    Type: microsim

    **Learning Objective:** Students will evaluate different configurations of two circles to determine intersection count based on center distance and radii.
    **Bloom's Taxonomy Level:** Evaluating - Making judgments about intersection cases based on distance criteria.

    Purpose: Demonstrate all possible intersection cases for two circles.

    Canvas layout (720x560px):
    - Main drawing area (720x500px)
    - Control panel at bottom (height: 60px)

    Visual elements:
    - First circle (blue) centered at fixed position
    - Second circle (green) with adjustable center position
    - Line segment connecting the two centers (dashed)
    - Distance between centers labeled
    - Intersection points marked with red dots (if they exist)
    - Labels showing:
      - "Distance between centers: d"
      - "r₁ + r₂ = [sum]"
      - "|r₁ - r₂| = [difference]"
      - "Number of intersections: [0, 1, or 2]"

    Interactive controls:
    - Slider: "Circle 1 Radius" (50-150px, default 100, step 10)
    - Slider: "Circle 2 Radius" (50-150px, default 80, step 10)
    - Slider: "Circle 2 X Position" (-200 to 200, default 120, step 10)
    - Slider: "Circle 2 Y Position" (-100 to 100, default 0, step 10)
    - Display: "Case: [Separate/External Tangent/Intersecting/Internal Tangent/One Inside Other]"

    Default parameters:
    - Circle 1: center (300, 280), radius 100
    - Circle 2: center (420, 280), radius 80
    - Background: alice blue

    Behavior:
    - Sliders move second circle and adjust radii
    - Intersection points calculate using circle equations
    - Distance d between centers shown
    - Comparison indicators:
      - d > r₁ + r₂: Separate (0 intersections)
      - d = r₁ + r₂: External tangent (1 intersection)
      - |r₁ - r₂| < d < r₁ + r₂: Intersecting (2 intersections)
      - d = |r₁ - r₂|: Internal tangent (1 intersection)
      - d < |r₁ - r₂|: One inside other (0 intersections)
    - Current case highlighted in display

    Implementation: p5.js with circle-circle intersection algorithm using system of equations
</details>

### Real-World Applications of Circles

Circles appear everywhere in the real world, from wheels and gears to orbits and radio wave propagation.

Here are some practical applications:

- **Engineering:** Gears, pulleys, and wheels rely on circular geometry for smooth rotation and mechanical advantage
- **Architecture:** Arches, domes, and rotundas use circular and arc forms for strength and beauty
- **Navigation:** GPS systems use circles (spheres in 3D) to determine position through trilateration
- **Astronomy:** Planetary orbits are approximately circular (actually elliptical, but close)
- **Communications:** Radio and cell towers have circular coverage areas with the tower at the center

#### Diagram: Rolling Wheel Arc Length Application
<details markdown="1">
    <summary>Wheel Rolling Distance Calculator</summary>
    Type: microsim

    **Learning Objective:** Students will apply the relationship between arc length and distance traveled by a rolling wheel to solve real-world motion problems.
    **Bloom's Taxonomy Level:** Applying - Using arc length concepts in practical contexts.

    Purpose: Demonstrate how arc length relates to distance traveled when a wheel rolls without slipping.

    Canvas layout (800x480px):
    - Upper area (800x360px): Animation of rolling wheel
    - Lower area (800x120px): Control panel and calculations

    Visual elements:
    - Wheel (circle) rolling along a horizontal ground line
    - Radius line drawn inside wheel
    - Arc on wheel highlighted showing rotation angle
    - Starting position marker
    - Current position marker
    - Distance traveled shown as horizontal measurement
    - Angle of rotation displayed at wheel center

    Interactive controls:
    - Slider: "Wheel Radius" (20-80px, default 50, step 5)
    - Slider: "Rotation Angle" (0-720 degrees, default 180, step 30)
    - Button: "Animate Rolling" - wheel rolls to show distance
    - Button: "Reset"
    - Display panel:
      - "Radius: [r] units"
      - "Rotation: [θ]°"
      - "Arc Length: [L] units"
      - "Distance Traveled: [L] units"
      - "Number of Full Rotations: [θ/360]"

    Default parameters:
    - Radius: 50px (representing 50 cm)
    - Rotation: 180 degrees (half turn)
    - Background: alice blue with ground line

    Behavior:
    - Sliders adjust wheel size and rotation amount
    - Arc length calculates: L = (θ/360) × 2πr
    - Animation shows wheel rolling along ground
    - Distance traveled equals arc length (no slipping)
    - Visual marks show starting and ending positions
    - Can demonstrate multiple rotations (>360°)

    Implementation: p5.js with rotation animation and arc length calculation
</details>

### Summary and Key Concepts

In this chapter, you've explored the rich geometry of circles and their special properties. Here are the key takeaways:

**Circle Basics:**

- A circle is the set of all points equidistant from a center
- Radius and diameter are fundamental measurements (d = 2r)
- Chords, secants, and tangents describe lines intersecting circles

**Angles and Arcs:**

- Central angles have vertices at the center
- Inscribed angles have vertices on the circle and measure half the central angle
- Arcs are classified as minor (<180°), major (>180°), or semicircles (=180°)

**Measurements:**

- Arc length: $L = \frac{\theta}{360°} \times 2\pi r$
- Sector area: $A = \frac{\theta}{360°} \times \pi r^2$
- Segments are regions between chords and arcs

**Special Theorems:**

- Tangent lines are perpendicular to radii at the point of tangency
- Inscribed angle measures half the central angle subtending the same arc
- Opposite angles in inscribed quadrilaterals are supplementary
- Power of a point relates segment lengths from external points

**Coordinate Geometry:**

- Standard circle equation: $(x - h)^2 + (y - k)^2 = r^2$
- Center is $(h, k)$ and radius is $r$
- Complete the square to convert from general form

**Polygons and Circles:**

- Inscribed polygons have vertices on a circle
- Circumscribed polygons have sides tangent to a circle

These concepts form the foundation for understanding circular motion, rotational systems, and curved designs in mathematics, science, and engineering!

### Practice Problems

Try these problems to test your understanding:

1. A circle has radius 8 cm. Find the length of an arc with central angle 45°.

2. Two chords intersect inside a circle forming a 65° angle. One intercepted arc measures 80°. Find the measure of the other intercepted arc.

3. A circle has center (3, -2) and passes through point (7, 1). Write the equation of the circle.

4. A tangent and a secant are drawn from external point P. The tangent has length 12 and the external part of the secant has length 8. Find the total length of the secant.

5. A regular hexagon is inscribed in a circle with radius 10. Find the length of one side of the hexagon.

**Solutions:**

1. $L = \frac{45}{360} \times 2\pi(8) = 2\pi \approx 6.28$ cm

2. Chord-chord angle formula: $65° = \frac{1}{2}(80° + arc_2)$, so $arc_2 = 50°$

3. First find radius: $r = \sqrt{(7-3)^2 + (1-(-2))^2} = \sqrt{16+9} = 5$
   Equation: $(x-3)^2 + (y+2)^2 = 25$

4. Tangent-secant theorem: $12^2 = 8 \times (whole\ secant)$, so $whole\ secant = 18$

5. In regular hexagon inscribed in circle, side length equals radius: $s = 10$

### Next Steps

Now that you understand circles, you're ready to explore more advanced topics:

- **Chapter 12: Area and Volume** - Apply circle concepts to find areas and volumes of 3D shapes
- **Chapter 13: Geometric Probability** - Use sectors and segments for probability problems
- **Advanced Geometry** - Study conic sections (ellipses, parabolas, hyperbolas) which generalize circles
