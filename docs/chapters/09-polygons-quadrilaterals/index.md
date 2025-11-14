# Polygons and Quadrilaterals

## Summary

This chapter extends triangle concepts to polygons with special focus on quadrilaterals and their unique properties. You'll learn to classify quadrilaterals by their sides and angles, prove relationships between different types of quadrilaterals, and explore angle sums in polygons. The chapter also introduces regular polygons and tessellations, connecting geometry to patterns found in nature and art.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Polygon
2. Regular Polygon
3. Interior Angles of Polygon
4. Exterior Angles of Polygon
5. Quadrilateral
6. Parallelogram
7. Rectangle
8. Rhombus
9. Square
10. Trapezoid
11. Isosceles Trapezoid
12. Kite
13. Pentagon
14. Hexagon
15. Octagon
16. Tessellation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)
- [Chapter 3: Angles and Angle Relationships](../03-angles-and-relationships/index.md)
- [Chapter 7: Triangle Congruence and Properties](../07-triangle-congruence/index.md)

---

## Introduction to Polygons

You've already explored triangles in depth, but the world of geometry extends far beyond three-sided figures. From the hexagonal cells in a honeycomb to the octagonal stop signs at street corners, polygons with four, five, six, or more sides surround us every day. In this chapter, you'll discover the elegant patterns and properties that make each polygon family unique.

A **polygon** is a closed figure formed by three or more line segments called sides. Each side connects to exactly two other sides at points called vertices. The word "polygon" comes from the Greek words *poly* (many) and *gonia* (angle), literally meaning "many angles."

### Polygon Classification

Polygons are classified by the number of sides they have:

- **Triangle:** 3 sides
- **Square (or Quadrilateral):** 4 sides
- **Pentagon:** 5 sides
- **Hexagon:** 6 sides
- **Heptagon (or Septagon):** 7 sides
- **Octagon:** 8 sides
- **Nonagon:** 9 sides
- **Decagon:** 10 sides
- **Dodecagon:** 12 sides

We can also classify polygons by their regularity. A **regular polygon** has all sides of equal length and all interior angles of equal measure. A regular triangle is an equilateral triangle, while a regular quadrilateral is a square.

#### Diagram: Regular Polygon Explorer

<iframe src="../../sims/regular-polygon-explorer/main.html" height="452px" width="100%" scrolling="no"></iframe>

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/regular-polygon-explorer/main.html" height="452px" width="100%" scrolling="no"></iframe>
```
Now that you have seen some of the different types of regular polygons you can test your knowledge.
Here is another version of the regular polygon explorer but with a twist!  In this version
you will see a "Quiz Mode" button.  You can press this button and the MicroSim will
give you the name of a shape and you mush move the slider to the right number of sides
and then click the "Check Your Answer".  You might find that triangle and square are easy, but it is not easy to remember how many sides there are in a `Dodecagon`.  Try it out!

#### Diagram: Regular Polygon Explorer Quiz

<iframe src="../../sims/regular-polygon-explorer-quiz/main.html" height="452px" width="100%" scrolling="no"></iframe>

#### Diagram: Polygon Family Tree
<details markdown="1">
<summary>Polygon Family Tree</summary>
Type: diagram

Purpose: Show the classification of polygons by number of sides, distinguishing between regular and irregular examples

**Learning Objective:** Students will identify and classify polygons by their number of sides (Bloom's: **Remembering**)

Components to show:
- Central node: "Polygons"
- Branches for each polygon type (3-10 sides)
- For each type, show both regular and irregular examples
- Visual representation of each polygon with labeled vertices
- Color coding: Green for regular polygons, blue for irregular polygons

Specific polygons to include:
- Triangle (3): Equilateral (regular) and Scalene (irregular)
- Quadrilateral (4): Square (regular) and Rectangle (irregular)
- Pentagon (5): Regular pentagon and irregular pentagon
- Hexagon (6): Regular hexagon and irregular hexagon
- Octagon (8): Regular octagon (stop sign) and irregular octagon

Connections:
- Radial layout from center
- Each branch labeled with number of sides
- Examples positioned below each branch

Style: Tree diagram with geometric shapes as visual examples

Labels:
- "n sides" for each polygon type
- "Regular" and "Irregular" beneath examples
- Vertex labels (A, B, C, etc.) on sample polygons

Color scheme:
- Green fill for regular polygons
- Blue fill for irregular polygons
- Black outlines and text

Implementation: SVG diagram or hand-drawn style illustration
</details>

## Interior Angles of Polygons

One of the most fundamental properties of polygons is the relationship between the number of sides and the sum of interior angles. This relationship follows a beautiful pattern that you can discover and prove.

Consider dividing any polygon into triangles by drawing diagonals from a single vertex. A quadrilateral can be divided into 2 triangles, a pentagon into 3 triangles, and a hexagon into 4 triangles. Since each triangle contains 180° of angles, we can calculate the total interior angle sum.

#### Interior Angle Sum Formula

For a polygon with $n$ sides, the sum of interior angles is:

$S = (n - 2) \times 180°$

where:

- $S$ is the sum of all interior angles
- $n$ is the number of sides

This formula reveals an elegant pattern. Every time we add one more side to a polygon, we add exactly 180° to the interior angle sum—the same as adding one more triangle to our diagonal partition.

Let's verify this formula with some examples:

| Polygon | Sides (n) | Formula | Interior Angle Sum |
|---------|-----------|---------|-------------------|
| Triangle | 3 | $(3-2) \times 180°$ | $180°$ |
| Quadrilateral | 4 | $(4-2) \times 180°$ | $360°$ |
| Pentagon | 5 | $(5-2) \times 180°$ | $540°$ |
| Hexagon | 6 | $(6-2) \times 180°$ | $720°$ |
| Octagon | 8 | $(8-2) \times 180°$ | $1080°$ |

For regular polygons, where all angles are equal, we can find the measure of each interior angle by dividing the total by the number of angles.

#### Each Interior Angle in Regular Polygon

For a regular polygon with $n$ sides, each interior angle measures:

$I = \frac{(n - 2) \times 180°}{n}$

where:

- $I$ is the measure of each interior angle
- $n$ is the number of sides

#### Drawing: Polygon Interior Angle Explorer
<details markdown="1">
<summary>Polygon Interior Angle Explorer</summary>
Type: microsim

Purpose: Allow students to explore how interior angles change as the number of polygon sides increases

**Learning Objective:** Students will apply the interior angle formula to calculate angle measures for various polygons (Bloom's: **Applying**)

Canvas layout (800x500px):
- Left side (550x500): Drawing area showing the polygon
- Right side (250x500): Control panel and information display

Visual elements:
- A regular polygon drawn in the center of the left area
- All interior angles marked with arc notation
- Angle measures displayed at each vertex
- Diagonals from one vertex showing triangulation (toggle on/off)
- Color-coded triangles within the polygon
- Center point marked

Interactive controls:
- Slider: "Number of Sides" (range: 3-12, default: 5)
- Checkbox: "Show Triangulation" (default: checked)
- Checkbox: "Show Angle Measures" (default: checked)
- Checkbox: "Show Formula Calculation" (default: checked)
- Button: "Animate" - smoothly transitions through polygon types

Display panel (right side):
- Current polygon name (e.g., "Pentagon")
- Number of sides: n = [value]
- Number of triangles: [n-2]
- Total interior angle sum: [(n-2) × 180°] = [result]°
- Each interior angle: [result/n]°

Default parameters:
- Start with pentagon (5 sides)
- Triangulation visible
- Angles labeled
- Formula calculation shown

Behavior:
- As slider moves, polygon morphs smoothly to new shape
- Interior angles update in real-time
- Triangulation lines redraw from bottom-left vertex
- Each triangle highlighted in different pastel color
- Formula calculations update dynamically
- Animation button cycles through 3-12 sides over 10 seconds

Visual styling:
- Polygon outline: Dark blue, 3px stroke
- Interior angle arcs: Red, 2px stroke
- Triangulation lines: Green dashed lines
- Triangle fills: Pastel colors (yellow, pink, blue, orange, purple) with 50% opacity
- Background: Light gray

Implementation notes:
- Use p5.js for rendering
- Calculate vertex positions using polar coordinates
- Use trigonometry to place vertices evenly around circle
- Draw angle arcs using arc() function
- Format angle measures to 1 decimal place
- Use lerp() for smooth animation transitions
</details>

## Exterior Angles of Polygons

While interior angles measure the space inside each corner of a polygon, **exterior angles** measure the amount of turn at each vertex as you walk around the polygon's perimeter. To find an exterior angle, extend one side of the polygon and measure the angle between the extension and the adjacent side.

There's a remarkable property of exterior angles: no matter how many sides a polygon has, the sum of all exterior angles is always the same.

#### Exterior Angle Sum

For any convex polygon, the sum of exterior angles is:

$E = 360°$

where:

- $E$ is the sum of all exterior angles (one at each vertex)

This constant sum makes sense if you imagine walking around the perimeter of any polygon. As you traverse each side and turn at each vertex, you make one complete rotation by the time you return to your starting point—exactly 360°.

For a regular polygon, all exterior angles are equal, so we can find each one easily.

#### Each Exterior Angle in Regular Polygon

For a regular polygon with $n$ sides, each exterior angle measures:

$e = \frac{360°}{n}$

where:

- $e$ is the measure of each exterior angle
- $n$ is the number of sides

Notice that the interior and exterior angles at any vertex are supplementary (they sum to 180°), since they form a linear pair:

$I + e = 180°$

#### Diagram: Interior and Exterior Angle Relationship
<details markdown="1">
<summary>Interior and Exterior Angle Relationship</summary>
Type: diagram

Purpose: Show the geometric relationship between interior and exterior angles at a polygon vertex

**Learning Objective:** Students will analyze the supplementary relationship between interior and exterior angles (Bloom's: **Analyzing**)

Components to show:
- A portion of a polygon showing one vertex with two sides
- The interior angle clearly marked and labeled "Interior Angle"
- One side extended beyond the vertex as a ray
- The exterior angle formed between the extension and the adjacent side
- Arc notation for both angles
- Angle measures labeled (e.g., 120° interior, 60° exterior)
- A straight line through the vertex emphasizing the 180° linear pair
- Color coding for interior (blue) and exterior (red) angles

Annotations:
- "Interior Angle (I)" with arrow pointing to blue arc
- "Exterior Angle (e)" with arrow pointing to red arc
- "Linear Pair: I + e = 180°" as a callout box
- "Extended side" label on the ray extension

Visual style: Clear geometric diagram with bold lines

Specific measurements to show:
- Use a hexagon vertex as example
- Interior angle: 120°
- Exterior angle: 60°
- Show that 120° + 60° = 180°

Style: Clean technical diagram with geometric precision

Color scheme:
- Polygon sides: Black, 3px stroke
- Extended ray: Dashed black line
- Interior angle arc: Blue
- Exterior angle arc: Red
- Labels: Black text
- Callout box: Light yellow background

Implementation: SVG or digital geometry tool
</details>

Here's a comparison of regular polygons and their angle measures:

| Polygon | Sides (n) | Each Interior Angle | Each Exterior Angle |
|---------|-----------|---------------------|---------------------|
| Equilateral Triangle | 3 | $60°$ | $120°$ |
| Square | 4 | $90°$ | $90°$ |
| Regular Pentagon | 5 | $108°$ | $72°$ |
| Regular Hexagon | 6 | $120°$ | $60°$ |
| Regular Octagon | 8 | $135°$ | $45°$ |
| Regular Decagon | 10 | $144°$ | $36°$ |

## Quadrilaterals: The Four-Sided Family

Among all polygons, **quadrilaterals**—four-sided figures—form an especially important and diverse family. From the perfect symmetry of squares to the asymmetric beauty of kites, quadrilaterals exhibit a rich variety of properties based on their sides and angles.

All quadrilaterals share some common properties:

- Four sides and four vertices
- Interior angles sum to 360°
- Can be divided into two triangles

However, special quadrilaterals have additional properties that make them particularly useful in mathematics, art, and engineering.

#### Diagram: Quadrilateral Family Hierarchy
<details markdown="1">
<summary>Quadrilateral Family Hierarchy</summary>
Type: diagram

Purpose: Show the hierarchical relationships among special quadrilaterals based on their properties

**Learning Objective:** Students will understand the classification hierarchy and inheritance of properties among quadrilaterals (Bloom's: **Understanding**)

Components to show:
- Top level: "Quadrilateral" (most general)
- Second level: "Trapezoid" and "Kite" branches
- Third level: "Parallelogram" (under general quadrilaterals, showing parallel sides)
- Fourth level under Parallelogram: "Rectangle" and "Rhombus"
- Fifth level: "Square" (intersection of Rectangle and Rhombus)
- "Isosceles Trapezoid" branching from Trapezoid

Visual elements for each type:
- Small representative shape next to each name
- Property labels (e.g., "2 pairs parallel sides", "all sides equal")
- Connecting lines showing inheritance relationships
- Different colors for different branches

Connections:
- Downward arrows showing "is a special type of" relationships
- Converging paths to Square showing it's both a rectangle AND a rhombus
- Clear visual hierarchy from general to specific

Properties listed:
- Quadrilateral: 4 sides, angles sum to 360°
- Parallelogram: 2 pairs parallel sides, opposite sides equal
- Rectangle: Parallelogram + 4 right angles
- Rhombus: Parallelogram + 4 equal sides
- Square: Rectangle + Rhombus (or all 4 sides equal + 4 right angles)
- Trapezoid: Exactly 1 pair parallel sides
- Isosceles Trapezoid: Trapezoid + 2 equal legs
- Kite: 2 pairs consecutive equal sides

Style: Hierarchical tree diagram with shapes and text

Color scheme:
- Quadrilateral (general): Light gray
- Trapezoid family: Light blue
- Parallelogram family: Light green
- Rectangle branch: Light purple
- Rhombus branch: Light orange
- Square: Yellow (special!)
- Kite: Light pink

Labels:
- Clear shape names in bold
- Property descriptions in smaller italic text
- Arrows labeled with "is a special"

Implementation: SVG hierarchical diagram with embedded shape previews
</details>

### Parallelograms

A **parallelogram** is a quadrilateral with two pairs of parallel sides. This simple defining property leads to a cascade of additional properties that make parallelograms special.

**Properties of Parallelograms:**

- Opposite sides are parallel (definition)
- Opposite sides are congruent (equal length)
- Opposite angles are congruent (equal measure)
- Consecutive angles are supplementary (sum to 180°)
- Diagonals bisect each other (cut each other in half)

These properties make parallelograms rigid and stable. If you know the length of two adjacent sides and the measure of one angle, you can construct a unique parallelogram.

#### Drawing: Parallelogram Property Explorer
<details markdown="1">
<summary>Parallelogram Property Explorer</summary>
Type: microsim

Purpose: Interactive exploration of parallelogram properties, allowing students to manipulate a parallelogram and observe which properties remain invariant

**Learning Objective:** Students will evaluate which properties remain true as a parallelogram is transformed (Bloom's: **Evaluating**)

Canvas layout (850x550px):
- Left side (600x550): Drawing area with parallelogram
- Right side (250x550): Control panel and property display

Visual elements:
- A parallelogram ABCD with labeled vertices
- All four sides with length measurements displayed
- All four angles with degree measures displayed
- Both diagonals AC and BD drawn (toggle on/off)
- Midpoint M where diagonals intersect
- Distance measurements from M to each vertex (showing bisection)
- Opposite sides highlighted in matching colors to show parallelism
- Small parallel tick marks on parallel sides

Interactive controls:
- Slider: "Base Length" (range: 100-300px, default: 200)
- Slider: "Side Length" (range: 80-250px, default: 150)
- Slider: "Angle" (range: 30°-150°, default: 70°)
- Checkbox: "Show Diagonals" (default: checked)
- Checkbox: "Show Measurements" (default: checked)
- Checkbox: "Highlight Opposite Sides" (default: checked)
- Checkbox: "Highlight Opposite Angles" (default: checked)
- Button: "Randomize" - creates random parallelogram

Property Display Panel (right side, dynamically updated):
- **Opposite Sides:**
  - AB = [value] px, CD = [value] px ✓ Equal
  - BC = [value] px, AD = [value] px ✓ Equal
- **Opposite Angles:**
  - ∠A = [value]°, ∠C = [value]° ✓ Equal
  - ∠B = [value]°, ∠D = [value]° ✓ Equal
- **Consecutive Angles:**
  - ∠A + ∠B = [sum]° ✓ Supplementary
  - ∠B + ∠C = [sum]° ✓ Supplementary
- **Diagonals:**
  - AM = [value] px, MC = [value] px ✓ Bisect
  - BM = [value] px, MD = [value] px ✓ Bisect

Default parameters:
- Base: 200px
- Side: 150px
- Angle: 70°
- All checkboxes checked

Behavior:
- As sliders change, parallelogram updates in real-time
- All measurements recalculate automatically
- Property panel updates with live values
- Check marks (✓) confirm each property holds
- Opposite sides pulse with matching colors when "Highlight" is on
- Diagonals animate drawing from vertices to midpoint when toggled on

Visual styling:
- Parallelogram outline: Black, 3px stroke
- Opposite side pairs: One pair in blue, other in red (when highlighted)
- Diagonals: Dashed green lines, 2px
- Midpoint: Large orange circle
- Angle arcs: Purple, 2px
- Measurements: Black text on white background labels
- Background: Alice blue

Implementation notes:
- Use p5.js for rendering
- Calculate opposite vertex using vector addition
- Use atan2() for angle calculations
- Format all measurements to 1 decimal place
- Use lerp() for smooth transitions when randomizing
- Highlight animation uses sin(frameCount) for pulsing effect
</details>

### Rectangles

A **rectangle** is a parallelogram with four right angles. Because it's a special type of parallelogram, a rectangle inherits all parallelogram properties and adds its own.

**Properties of Rectangles (in addition to parallelogram properties):**

- All four angles are right angles (90°)
- Diagonals are congruent (equal length)
- Diagonals bisect each other
- Opposite sides are parallel and congruent

Rectangles are ubiquitous in the human-made world—from book pages to smartphone screens to building foundations. Their right angles make them easy to measure, construct, and combine.

### Rhombuses

A **rhombus** (plural: rhombi or rhombuses) is a parallelogram with four congruent sides. Like rectangles, rhombi inherit all parallelogram properties but add their own special characteristics.

**Properties of Rhombuses (in addition to parallelogram properties):**

- All four sides are congruent (equal length)
- Diagonals are perpendicular (meet at 90°)
- Diagonals bisect the vertex angles
- Diagonals bisect each other

Rhombi appear in decorative tile patterns, baseball diamonds, and the diamond suit in playing cards.

### Squares

A **square** is the most special quadrilateral of all—it's both a rectangle AND a rhombus. This means a square has all the properties of both parent types.

**Properties of Squares:**

- All four sides are congruent (rhombus property)
- All four angles are right angles (rectangle property)
- Diagonals are congruent (rectangle property)
- Diagonals are perpendicular (rhombus property)
- Diagonals bisect each other (parallelogram property)
- Diagonals bisect the vertex angles (rhombus property)

With maximum symmetry, squares are the most regular of all quadrilaterals. They appear everywhere from checkerboards to floor tiles to the pixels on your screen.

#### Diagram: Venn Diagram of Rectangle, Rhombus, and Square
<details markdown="1">
<summary>Venn Diagram of Rectangle, Rhombus, and Square</summary>
Type: diagram

Purpose: Show how squares possess the properties of both rectangles and rhombi using a Venn diagram

**Learning Objective:** Students will analyze the relationship between rectangles, rhombi, and squares as overlapping sets (Bloom's: **Analyzing**)

Components to show:
- Two overlapping circles representing Rectangle and Rhombus sets
- Overlap region representing Squares
- Properties listed in each region
- Example shapes drawn in each region
- Clear labels for each section

Regions and properties:

**Rectangle Only (left circle only):**
- Has 4 right angles
- Has congruent diagonals
- Example shape: 3x5 rectangle (not square)
- Properties: "Not all sides equal"

**Rhombus Only (right circle only):**
- Has 4 equal sides
- Has perpendicular diagonals
- Example shape: Rhombus with 60° and 120° angles
- Properties: "Not all angles 90°"

**Square (overlap region):**
- Has 4 right angles (from Rectangle)
- Has 4 equal sides (from Rhombus)
- Has congruent diagonals (from Rectangle)
- Has perpendicular diagonals (from Rhombus)
- Example shape: Perfect square
- Properties: "All properties of both!"

**Outside both circles:**
- Label: "Other Parallelograms"
- Example: Generic parallelogram
- Properties: "Neither all equal sides nor all right angles"

Visual style: Classic Venn diagram with overlapping circles

Color scheme:
- Rectangle circle: Light blue fill with blue border
- Rhombus circle: Light red fill with red border
- Overlap (Square): Purple fill (blue + red)
- Outside region: Light gray
- Shape examples: Black outlines with white fill

Labels:
- "RECTANGLE" at top of left circle
- "RHOMBUS" at top of right circle
- "SQUARE" in overlap with arrow pointing to purple region
- Property lists in bullet format in each region

Implementation: SVG Venn diagram with embedded shape illustrations
</details>

Let's compare these parallelogram family members:

| Property | Parallelogram | Rectangle | Rhombus | Square |
|----------|--------------|-----------|---------|--------|
| Opposite sides parallel | ✓ | ✓ | ✓ | ✓ |
| Opposite sides congruent | ✓ | ✓ | ✓ | ✓ |
| Opposite angles congruent | ✓ | ✓ | ✓ | ✓ |
| Consecutive angles supplementary | ✓ | ✓ | ✓ | ✓ |
| Diagonals bisect each other | ✓ | ✓ | ✓ | ✓ |
| All angles are right angles | | ✓ | | ✓ |
| Diagonals are congruent | | ✓ | | ✓ |
| All sides congruent | | | ✓ | ✓ |
| Diagonals are perpendicular | | | ✓ | ✓ |
| Diagonals bisect vertex angles | | | ✓ | ✓ |

### Trapezoids

A **trapezoid** is a quadrilateral with exactly one pair of parallel sides. The parallel sides are called **bases**, and the non-parallel sides are called **legs**.

**Properties of Trapezoids:**

- Exactly one pair of parallel sides (the bases)
- The two legs are not parallel
- Angles on the same leg are supplementary (sum to 180°)

Unlike parallelograms, trapezoids don't have as many guaranteed properties. However, a special type of trapezoid adds symmetry.

### Isosceles Trapezoids

An **isosceles trapezoid** is a trapezoid whose legs are congruent. This additional constraint creates symmetry and additional properties.

**Properties of Isosceles Trapezoids (in addition to trapezoid properties):**

- Legs are congruent
- Base angles are congruent (angles along the same base)
- Diagonals are congruent
- Opposite angles are supplementary

Isosceles trapezoids appear in architecture, furniture design, and ancient amphitheaters where every seat needs equal viewing angles.

#### Drawing: Trapezoid vs Isosceles Trapezoid Comparison
<details markdown="1">
<summary>Trapezoid vs Isosceles Trapezoid Comparison</summary>
Type: microsim

Purpose: Allow students to manipulate a trapezoid and observe how enforcing the isosceles constraint affects its properties

**Learning Objective:** Students will create examples distinguishing trapezoids from isosceles trapezoids by manipulating side lengths (Bloom's: **Creating**)

Canvas layout (850x600px):
- Top half (850x300): Trapezoid display area
- Bottom half (850x300): Isosceles trapezoid display area

Visual elements (each half):
- Trapezoid ABCD with vertices labeled
- Both bases (parallel sides) highlighted in green
- Both legs highlighted in red
- All four sides with length measurements
- All four angles with degree measures
- Both diagonals with length measurements (toggle on/off)
- Base angles marked with arc notation

Interactive controls (centered between the two areas):
- **General Trapezoid Controls:**
  - Slider: "Top Base Length" (range: 100-250px)
  - Slider: "Bottom Base Length" (range: 200-350px)
  - Slider: "Left Leg Length" (range: 80-200px)
  - Slider: "Right Leg Length" (range: 80-200px)
  - Slider: "Height" (range: 80-180px)

- **Isosceles Trapezoid Controls:**
  - Slider: "Top Base Length" (range: 100-250px)
  - Slider: "Bottom Base Length" (range: 200-350px)
  - Slider: "Leg Length" (range: 80-200px, controls BOTH legs)
  - Slider: "Height" (range: 80-180px)

- **Display Options:**
  - Checkbox: "Show Diagonals" (default: checked)
  - Checkbox: "Show Measurements" (default: checked)
  - Button: "Animate Transition" - morphs general trapezoid into isosceles

Comparison Panel (right side):
- **General Trapezoid Properties:**
  - Left leg: [value] px
  - Right leg: [value] px
  - Legs equal? [Yes/No] ← indicator
  - Left diagonal: [value] px
  - Right diagonal: [value] px
  - Diagonals equal? [Yes/No] ← indicator
  - Base angles equal? [Yes/No] ← indicator

- **Isosceles Trapezoid Properties:**
  - Left leg: [value] px
  - Right leg: [value] px
  - Legs equal? ✓ Always (forced by construction)
  - Left diagonal: [value] px
  - Right diagonal: [value] px
  - Diagonals equal? ✓ Always
  - Base angles equal? ✓ Always

Default parameters:
- General: Top base 150px, bottom base 300px, left leg 120px, right leg 160px, height 130px
- Isosceles: Top base 150px, bottom base 300px, legs 140px, height 130px

Behavior:
- Top trapezoid can be adjusted freely (general case)
- Bottom trapezoid automatically maintains leg equality (isosceles constraint)
- As sliders change, measurements update in real-time
- Property indicators highlight in green when properties hold, red when they don't
- "Animate Transition" button smoothly adjusts general trapezoid to match isosceles constraints
- Diagonal lengths calculate using distance formula

Visual styling:
- Trapezoid outlines: Black, 3px stroke
- Parallel sides (bases): Green, 4px stroke
- Legs: Red, 3px stroke
- Diagonals: Dashed blue lines, 2px
- Angle arcs: Purple, 2px
- Measurements: Black text on white rounded rectangles
- Background top: Light yellow
- Background bottom: Light blue (to distinguish isosceles section)

Implementation notes:
- Use p5.js for rendering
- Calculate trapezoid vertices using base lengths, height, and leg constraints
- Use law of cosines to position vertices correctly
- Validate that leg lengths allow construction with given height and bases
- Show warning message if impossible configuration requested
- Format measurements to 1 decimal place
- Use lerp() for animation transitions
</details>

### Kites

A **kite** is a quadrilateral with two pairs of consecutive congruent sides, but opposite sides are not congruent. Imagine the classic diamond-shaped kite you might fly on a windy day—that's the inspiration for this quadrilateral's name.

**Properties of Kites:**

- Two pairs of consecutive congruent sides
- One pair of opposite angles (where unequal sides meet) are congruent
- Diagonals are perpendicular
- One diagonal (the "main diagonal" between the vertex angles) bisects the other diagonal
- One diagonal bisects a pair of opposite angles

Kites are unique among quadrilaterals because they're not parallelograms (their sides aren't parallel), yet they still have beautiful symmetry.

#### Diagram: Kite Properties Illustration
<details markdown="1">
<summary>Kite Properties Illustration</summary>
Type: diagram

Purpose: Show the defining properties of a kite with labeled measurements and perpendicular diagonals

**Learning Objective:** Students will understand the distinctive properties of kites, particularly the perpendicular diagonals and consecutive equal sides (Bloom's: **Understanding**)

Components to show:
- Kite ABCD with vertex A at top, C at bottom (vertical axis of symmetry)
- Four sides labeled with lengths showing consecutive pairs equal
- Side AB = side AD (top two sides equal)
- Side CB = side CD (bottom two sides equal)
- Both diagonals AC (vertical) and BD (horizontal) drawn
- Perpendicular symbol (small square) at diagonal intersection point M
- Angles at A and C marked with arc notation
- Symmetry axis (diagonal AC) highlighted

Measurements to show:
- AB = 8 cm
- AD = 8 cm
- CB = 6 cm
- CD = 6 cm
- Angle DAB = 110°
- Angle BCD = 70°
- Right angle (90°) at M where diagonals intersect

Annotations:
- "Consecutive sides equal" with bracket connecting AB and AD
- "Consecutive sides equal" with bracket connecting CB and CD
- "Diagonals perpendicular" with arrow to right angle mark
- "Axis of symmetry" along AC
- "Vertex angles: ∠DAB and ∠BCD" as callout

Visual style: Technical geometric diagram with clear labels

Color scheme:
- Kite outline: Black, 3px stroke
- Equal side pairs: First pair in blue, second pair in red
- Main diagonal AC: Green, 3px (axis of symmetry)
- Other diagonal BD: Orange, 2px dashed
- Angle arcs: Purple
- Right angle mark: Black square
- Background: White

Style: Clean technical illustration

Implementation: SVG or geometry software with precise measurements
</details>

## Other Important Polygons

Beyond quadrilaterals, let's explore three other common polygons you'll encounter in mathematics, nature, and design.

### Pentagons

A **pentagon** is a five-sided polygon. Regular pentagons appear in nature (flowers, starfish) and human design (the Pentagon building in Washington D.C.).

For a regular pentagon:

- Each interior angle measures $108°$
- Each exterior angle measures $72°$
- Interior angles sum to $540°$

Pentagons can't tessellate the plane by themselves, but they appear in beautiful patterns when combined with other shapes.

### Hexagons

A **hexagon** is a six-sided polygon. Regular hexagons are nature's favorite shape for tiling—honeybees build hexagonal cells because they maximize storage space while minimizing wax usage.

For a regular hexagon:

- Each interior angle measures $120°$
- Each exterior angle measures $60°$
- Interior angles sum to $720°$
- Can tessellate the plane perfectly

Regular hexagons can be divided into six equilateral triangles, which makes them easy to construct with compass and straightedge.

### Octagons

An **octagon** is an eight-sided polygon. The most familiar octagon is the red stop sign at intersections.

For a regular octagon:

- Each interior angle measures $135°$
- Each exterior angle measures $45°$
- Interior angles sum to $1080°$

Regular octagons can combine with squares to create beautiful tessellating patterns.

#### Drawing: Polygon Constructor
<details markdown="1">
<summary>Polygon Constructor</summary>
Type: microsim

Purpose: Allow students to construct regular polygons and explore their angle properties dynamically

**Learning Objective:** Students will create regular polygons and observe patterns in angle measures (Bloom's: **Creating**)

Canvas layout (850x550px):
- Left side (600x550): Drawing area showing the polygon
- Right side (250x550): Control panel and calculations

Visual elements:
- Regular polygon centered in drawing area
- All vertices labeled alphabetically (A, B, C, ...)
- All sides drawn with equal length
- Interior angles marked with arcs and measurements
- Exterior angles marked with arcs and measurements (toggle)
- Center point marked
- Radii from center to each vertex (toggle)
- Circumscribed circle (toggle)
- One vertex highlighted as "current" with different color

Interactive controls:
- Slider: "Number of Sides" (range: 3-12, default: 6)
- Slider: "Size" (radius range: 80-180px, default: 120)
- Checkbox: "Show Interior Angles" (default: checked)
- Checkbox: "Show Exterior Angles" (default: unchecked)
- Checkbox: "Show Radii" (default: unchecked)
- Checkbox: "Show Circumcircle" (default: checked)
- Checkbox: "Rotate Polygon" (default: unchecked)
- Button: "Next Vertex" - highlights each vertex sequentially
- Button: "Animate" - cycles through 3-12 sides

Calculation Display (right panel):
- **Polygon:** [Name, e.g., "Hexagon"]
- **Number of sides (n):** [value]
- **Interior Angle Sum:**
  - Formula: (n - 2) × 180°
  - Calculation: ([n-2]) × 180° = [result]°
- **Each Interior Angle:**
  - Formula: [(n-2) × 180°] / n
  - Calculation: [sum] / [n] = [result]°
- **Exterior Angle Sum:** Always 360°
- **Each Exterior Angle:**
  - Formula: 360° / n
  - Calculation: 360° / [n] = [result]°
- **Verification:** Interior + Exterior = [sum]° ✓

Default parameters:
- Hexagon (6 sides)
- Radius: 120px
- Interior angles shown
- Circumcircle shown
- No rotation

Behavior:
- As "Number of Sides" slider moves, polygon morphs smoothly
- All calculations update in real-time
- Formulas remain visible with current values substituted
- "Next Vertex" button highlights each vertex with animation
- "Animate" button transitions through all polygon types over 15 seconds
- "Rotate" checkbox makes polygon spin slowly around center
- Angle arcs appear at all vertices when corresponding checkbox is on
- Check mark (✓) confirms interior + exterior = 180°

Visual styling:
- Polygon outline: Navy blue, 4px stroke
- Current vertex: Yellow circle, 12px diameter
- Other vertices: White circles with black outline, 8px
- Interior angle arcs: Red, 2px, inside polygon
- Exterior angle arcs: Green, 2px, outside polygon
- Radii: Dashed gray lines, 1px
- Circumcircle: Light blue, 2px dashed
- Center point: Orange circle, 8px
- Vertex labels: Black text
- Background: Alice blue

Implementation notes:
- Use p5.js for rendering
- Calculate vertex positions using polar coordinates
- Angle position: 2π * i / n for vertex i
- Use TWO_PI, sin(), cos() for circular placement
- Format angle measures to 2 decimal places
- Use lerp() for smooth morphing between polygon types
- Rotation uses frameCount for continuous animation
- Highlight current vertex with larger circle and different color
</details>

## Tessellations

A **tessellation** (or tiling) is a pattern of shapes that covers a plane with no gaps or overlaps. From ancient Roman mosaics to modern bathroom floors, tessellations combine mathematics and art in beautiful ways.

### Regular Tessellations

A **regular tessellation** uses only one type of regular polygon repeated to fill the plane. Surprisingly, only three regular polygons can tessellate by themselves:

1. **Equilateral triangles:** Six triangles meet at each vertex ($60° \times 6 = 360°$)
2. **Squares:** Four squares meet at each vertex ($90° \times 4 = 360°$)
3. **Regular hexagons:** Three hexagons meet at each vertex ($120° \times 3 = 360°$)

The key requirement is that the angles meeting at each vertex must sum to exactly 360° to fill the space around the point.

Let's check why regular pentagons don't tessellate:

Each interior angle of a regular pentagon measures $108°$. If we try to fit pentagons around a vertex:

- Two pentagons: $108° + 108° = 216°$ (not enough)
- Three pentagons: $108° + 108° + 108° = 324°$ (not enough)
- Four pentagons: $108° + 108° + 108° + 108° = 432°$ (too much—they overlap!)

Since we can't get exactly 360°, regular pentagons won't tile the plane by themselves.

### Semi-Regular Tessellations

**Semi-regular tessellations** (also called Archimedean tilings) use two or more types of regular polygons in a repeating pattern, with the same arrangement at every vertex. There are exactly eight semi-regular tessellations.

Examples include:

- **Octagons and squares:** Three octagons ($135°$ each) can't fill a vertex alone, but two octagons and a square fit perfectly: $135° + 135° + 90° = 360°$
- **Hexagons and triangles:** Two hexagons and two triangles: $120° + 120° + 60° + 60° = 360°$
- **Hexagons, squares, and triangles:** Various combinations create beautiful patterns

#### Drawing: Tessellation Builder
<details markdown="1">
<summary>Tessellation Builder</summary>
Type: microsim

Purpose: Interactive tool for creating and exploring tessellations using regular polygons

**Learning Objective:** Students will create tessellation patterns and determine which regular polygons can tile the plane (Bloom's: **Creating**)

Canvas layout (900x650px):
- Left side (650x650): Large grid area for building tessellation
- Right side (250x650): Control panel and polygon palette

Visual elements:
- Grid system with light gray lines for alignment
- Tiling area where shapes can be placed
- Polygon palette showing available shapes
- Currently placed polygons in the tiling area
- Highlight around hovered polygon
- Vertex angle sum display when hovering near a vertex
- "Success" indicator when vertex perfectly fills (360°)
- "Gap" or "Overlap" warnings for invalid configurations

Interactive controls:
- **Polygon Palette:** Click to select
  - Equilateral Triangle (60° angles)
  - Square (90° angles)
  - Regular Pentagon (108° angles)
  - Regular Hexagon (120° angles)
  - Regular Octagon (135° angles)

- **Placement Mode:**
  - Radio button: "Place" (default)
  - Radio button: "Delete"
  - Radio button: "Rotate"

- **Options:**
  - Checkbox: "Snap to Grid" (default: checked)
  - Checkbox: "Show Angle Measures" (default: checked)
  - Checkbox: "Highlight Vertices" (default: checked)
  - Checkbox: "Show Vertex Angle Sum" (default: checked)

- **Quick Patterns:**
  - Button: "Triangular Tiling"
  - Button: "Square Tiling"
  - Button: "Hexagonal Tiling"
  - Button: "Octagon+Square Tiling"
  - Button: "Clear All"

- **Challenge Mode:**
  - Button: "Start Challenge" - poses questions like "Can pentagons tessellate?"

Vertex Angle Sum Display:
- When cursor hovers near a vertex point
- Shows: "Vertex angle sum: [calculated]°"
- Color coding:
  - Green background: Sum = 360° ✓ (perfect fit)
  - Yellow background: Sum < 360° (gap exists)
  - Red background: Sum > 360° (overlap)

Information Panel:
- **Currently Selected:** [shape name]
- **Interior Angle:** [degrees]°
- **Can tessellate alone:** [Yes/No]
- **Reason:** [explanation, e.g., "3 hexagons × 120° = 360°"]

Default parameters:
- Start with empty grid
- Square selected
- Place mode active
- Snap to grid enabled
- All display options checked

Behavior:
- Click palette to select a polygon type
- Click canvas to place selected polygon
- Polygons snap to grid and align with adjacent shapes
- Hover near vertices to see angle sum calculation
- Vertices turn green when exactly 360° achieved
- "Quick Pattern" buttons auto-fill canvas with regular tessellations
- "Challenge Mode" asks questions and checks student's tessellation attempts
- Delete mode removes polygons on click
- Rotate mode rotates polygon 30° increments on click

Visual styling:
- Grid lines: Light gray, 1px
- Equilateral triangles: Light blue fill, dark blue outline
- Squares: Light red fill, dark red outline
- Pentagons: Light green fill, dark green outline
- Hexagons: Light yellow fill, dark yellow outline
- Octagons: Light purple fill, dark purple outline
- Hovered polygon: Yellow glow outline, 4px
- Vertices with 360°: Green circles, 8px
- Vertices with gaps/overlaps: Red or yellow circles
- Background: White
- Grid area border: Black, 2px

Challenge Mode Examples:
1. "Can regular pentagons tessellate the plane? Try it!"
   - Student places pentagons
   - System detects gaps/overlaps
   - Provides feedback: "No, 3×108° = 324° (gap) and 4×108° = 432° (overlap)"

2. "Create a semi-regular tessellation using octagons and squares"
   - Student places shapes
   - System checks if pattern is valid
   - Success when vertex angle sums all equal 360°

Implementation notes:
- Use p5.js for rendering
- Store placed polygons in array with position, type, and rotation
- Calculate vertex positions for each polygon type
- Use dist() to detect hover near vertices
- Implement snap-to-grid using round(x / gridSize) * gridSize
- Calculate angle sum by detecting which polygons touch each vertex
- Use hash map to store vertices and their touching polygons
- Validate tessellation by checking all vertices have 360° sum
- Pre-program quick patterns with calculated positions
- Use class structure for different polygon types
</details>

### Tessellations in Nature and Design

Tessellations appear throughout the natural world and human creativity:

- **Honeycombs:** Bees build hexagonal cells for maximum efficiency
- **Reptile skin:** Overlapping scales create protective tessellating patterns
- **Giraffe spots:** Irregular polygon patterns provide camouflage
- **Islamic art:** Complex geometric tessellations adorn mosques and palaces
- **M.C. Escher:** The famous artist created metamorphic tessellations where shapes transform from one creature to another

The mathematics of tessellations connects geometry to crystallography, computer graphics, and architectural design.

#### Diagram: The Three Regular Tessellations
<details markdown="1">
<summary>The Three Regular Tessellations</summary>
Type: diagram

Purpose: Show the three regular tessellations (triangular, square, hexagonal) side by side with vertex angle calculations

**Learning Objective:** Students will apply angle sum formulas to explain why only three regular polygons tessellate the plane (Bloom's: **Applying**)

Components to show:
Three panels arranged horizontally:

**Panel 1: Triangular Tessellation**
- 4×4 grid of equilateral triangles
- Alternating upward and downward orientations
- One vertex highlighted showing six triangles meeting
- Angle calculation callout: "6 × 60° = 360°"
- Label: "Regular Triangular Tiling"

**Panel 2: Square Tessellation**
- 4×4 grid of squares (classic checkerboard)
- One vertex highlighted showing four squares meeting
- Angle calculation callout: "4 × 90° = 360°"
- Label: "Regular Square Tiling"

**Panel 3: Hexagonal Tessellation**
- Honeycomb pattern with ~12 hexagons
- One vertex highlighted showing three hexagons meeting
- Angle calculation callout: "3 × 120° = 360°"
- Label: "Regular Hexagonal Tiling"

Visual elements for each panel:
- Complete tessellation filling the panel
- Highlighted vertex with colored circle
- Angles at highlighted vertex marked with arcs
- Calculation shown in box with arrow pointing to vertex
- Consistent scale across all three panels

Additional elements:
- Title bar: "The Three Regular Tessellations"
- Subtitle: "Only these three regular polygons can tile the plane alone"
- Bottom note: "The key: angles at each vertex must sum to exactly 360°"

Color scheme:
- Triangles: Light blue fill, navy outline
- Squares: Light pink fill, dark red outline
- Hexagons: Light yellow fill, orange outline
- Highlighted vertex: Bright green circle
- Angle arcs: Red
- Calculation boxes: White background, black border, red text
- Panel backgrounds: White
- Panel borders: Black, 2px

Style: Technical illustration with clean lines and clear labels

Layout:
- Three equal-width panels
- Consistent spacing between panels
- Each panel 280px wide × 350px tall
- Total width: ~900px

Implementation: SVG or vector graphics with precise geometric construction
</details>

## Summary and Key Takeaways

In this chapter, you've explored the diverse world of polygons and discovered the special properties that make quadrilaterals unique. You've seen how adding constraints (like equal sides or right angles) creates hierarchies of special shapes, each with its own elegant properties.

**Key concepts to remember:**

- **Polygon angle formulas:**
  - Interior angle sum: $(n-2) \times 180°$
  - Exterior angle sum: Always $360°$
  - Each angle in regular polygon: $\frac{(n-2) \times 180°}{n}$

- **Quadrilateral hierarchy:**
  - Parallelograms have two pairs of parallel sides
  - Rectangles are parallelograms with right angles
  - Rhombi are parallelograms with equal sides
  - Squares are both rectangles AND rhombi
  - Trapezoids have exactly one pair of parallel sides
  - Kites have two pairs of consecutive equal sides

- **Tessellations:**
  - Only three regular polygons tessellate alone: triangles, squares, hexagons
  - The requirement is that vertex angles sum to exactly 360°
  - Semi-regular tessellations combine multiple polygon types

As you continue your geometry journey, you'll see these polygon properties appear in coordinate geometry, transformations, area calculations, and real-world applications. The patterns you've discovered here form the foundation for understanding more complex mathematical structures.

## Practice Problems

Try these problems to test your understanding:

1. **Interior Angles:** What is the sum of interior angles in a 20-sided polygon? What is each interior angle if the polygon is regular?

2. **Quadrilateral Classification:** A quadrilateral has vertices at A(0,0), B(4,0), C(5,3), and D(1,3). Is this a parallelogram? A rectangle? Explain your reasoning.

3. **Tessellation Challenge:** Can regular heptagons (7-sided polygons) tessellate the plane by themselves? Calculate the interior angle and explain why or why not.

4. **Kite Properties:** In kite ABCD, sides AB and AD are each 10 cm, sides CB and CD are each 6 cm, and diagonal AC is 14 cm. If diagonal BD is perpendicular to AC, find the length of BD.

5. **Trapezoid Area:** An isosceles trapezoid has bases of length 12 cm and 20 cm and legs of length 5 cm. Find the height and area of the trapezoid.

Solutions to these problems will help you solidify your understanding of polygon properties and prepare you for the upcoming chapters on similarity, circles, and three-dimensional geometry.
