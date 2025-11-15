# Similarity and Right Triangle Trigonometry

## Summary

This chapter develops proportional reasoning through similarity transformations and similarity criteria for triangles, then introduces the Pythagorean theorem and trigonometric ratios for solving right triangles. You'll learn how similar figures relate through scale factors, apply the Pythagorean theorem to find distances, and use sine, cosine, and tangent to solve real-world problems involving angles of elevation, angles of depression, and indirect measurement.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Similar Figures
2. Scale Factor
3. Similarity Ratio
4. AA Similarity
5. SAS Similarity
6. SSS Similarity
7. Proportional Segments
8. Geometric Mean
9. Altitude to Hypotenuse
10. Pythagorean Theorem
11. Pythagorean Triple
12. Converse Pythagorean Theorem
13. Distance in Coordinate Plane
14. Sine Ratio
15. Cosine Ratio
16. Tangent Ratio
17. Inverse Trigonometric Functions
18. Angle of Elevation
19. Angle of Depression
20. Indirect Measurement

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Coordinate Geometry and Lines](../05-coordinate-geometry/index.md)
- [Chapter 6: Transformations and Congruence](../06-transformations-congruence/index.md)
- [Chapter 7: Triangle Congruence and Properties](../07-triangle-congruence/index.md)

---

## Introduction

Have you ever wondered how surveyors measure the height of a mountain without climbing it? Or how architects create scale models of buildings? The answer lies in **similarity** and **trigonometry**—two powerful mathematical tools that allow us to work with shapes that have the same form but different sizes, and to find unknown measurements using angles and ratios.

In this chapter, you'll discover how to determine if two figures are similar, use scale factors to solve real-world problems, and unlock the secrets of right triangles through the Pythagorean theorem and trigonometric ratios. By the end, you'll be able to measure the height of your school building using just a measuring tape and a sunny day!

## Understanding Similar Figures

Two figures are **similar** if they have the same shape but not necessarily the same size. Think of a photograph that you enlarge or reduce—the image remains the same, just at a different scale.

**Similar figures** have two important properties:

- Corresponding angles are congruent (equal in measure)
- Corresponding sides are proportional (their ratios are equal)

#### Diagram: Similar Triangles Comparison
<details markdown="1">
<summary>Similar Triangles Comparison</summary>
Type: diagram

Learning Objective: Students will understand the visual relationship between similar triangles, recognizing that corresponding angles are equal and corresponding sides are proportional (Bloom's: Understanding).

Purpose: Illustrate two similar triangles side-by-side to show angle congruence and side proportionality.

Components to show:
- Two triangles: △ABC (smaller) and △DEF (larger)
- △ABC with sides: AB = 3 cm, BC = 4 cm, AC = 5 cm
- △DEF with sides: DE = 6 cm, EF = 8 cm, DF = 10 cm
- Angle markings showing: ∠A ≅ ∠D, ∠B ≅ ∠E, ∠C ≅ ∠F
- Color-coded corresponding angles (red, blue, green)
- Arrows connecting corresponding vertices

Annotations:
- Label showing scale factor: "Scale factor = 2"
- Ratio expressions: "DE/AB = 6/3 = 2", "EF/BC = 8/4 = 2", "DF/AC = 10/5 = 2"
- Note: "All ratios equal → Triangles are similar"

Style: Clean geometric diagram with clear labels and color coding
Color scheme: Triangles outlined in black, angles marked in red/blue/green, ratios in purple

Implementation: Can be created using p5.js, GeoGebra, or static diagram tool
</details>

### Scale Factor

The **scale factor** is the ratio of corresponding side lengths between two similar figures. If the scale factor is greater than 1, the image is an enlargement. If it's between 0 and 1, the image is a reduction.

#### Scale Factor Formula

$k = \frac{\text{length in new figure}}{\text{length in original figure}}$

where:

- $k$ is the scale factor
- The numerator is a side length from the larger or scaled figure
- The denominator is the corresponding side length from the original figure

For example, if a 4-inch photograph is enlarged to 10 inches, the scale factor is:

$k = \frac{10}{4} = 2.5$

#### Drawing: Scale Factor Explorer
<details markdown="1">
<summary>Scale Factor Explorer MicroSim</summary>
Type: microsim

Learning Objective: Students will apply scale factor concepts to create similar figures and explore how changing the scale factor affects dimensions while preserving shape (Bloom's: Applying).

Purpose: Allow students to interactively adjust scale factors and see how they affect similar figures.

Canvas layout (800x500px):
- Top area (800x400): Drawing area showing original and scaled triangles
- Bottom area (800x100): Control panel with sliders and information display

Visual elements:
- Original triangle (blue) on left side with labeled dimensions
- Scaled triangle (orange) on right side with labeled dimensions
- Grid background for reference
- Midpoint line separating original and scaled versions
- Labels showing measurements on each side

Interactive controls:
- Slider: Scale factor (range: 0.5 to 3.0, default: 1.5, step: 0.1)
- Display: "Scale Factor: k = [value]"
- Display: "Original area: [value] sq units"
- Display: "Scaled area: [value] sq units"
- Display: "Area ratio: [value]"
- Reset button

Default parameters:
- Original triangle: base = 4, height = 3
- Initial scale factor: 1.5
- Background color: light gray grid

Behavior:
- When slider moves, scaled triangle updates in real-time
- All dimensions of scaled triangle update proportionally
- Area calculations update automatically
- Show relationship: scaled area = k² × original area
- Corresponding angles remain equal (show angle measures)

Educational features:
- Highlight corresponding sides in matching colors when mouse hovers
- Display ratio of corresponding sides
- Show that area scales by k², not k

Implementation: p5.js with createSlider() for controls
Canvas positioning: Controls at bottom for easy access
</details>

## Triangle Similarity Criteria

Just as we had shortcuts for proving triangle congruence (SSS, SAS, ASA), we have similar shortcuts for proving triangles are similar. You don't need to check all angles and all sides—just certain combinations!

The three triangle similarity criteria are:

1. **AA (Angle-Angle) Similarity**
2. **SAS (Side-Angle-Side) Similarity**
3. **SSS (Side-Side-Side) Similarity**

### AA Similarity

If two angles of one triangle are congruent to two angles of another triangle, then the triangles are similar.

Why does this work? Remember that the sum of angles in any triangle is 180°. If two angles match, the third angle must also match!

#### Diagram: AA Similarity Proof
<details markdown="1">
<summary>AA Similarity Proof</summary>
Type: diagram

Learning Objective: Students will analyze why two congruent angles are sufficient to prove triangle similarity, connecting angle sum properties to similarity criteria (Bloom's: Analyzing).

Purpose: Show two triangles with two pairs of congruent angles and demonstrate why the third angle must also be congruent.

Components:
- Triangle PQR with angles: ∠P = 50°, ∠Q = 70°, ∠R = 60°
- Triangle XYZ with angles: ∠X = 50°, ∠Y = 70°, ∠Z = ?
- Color-coded angle marks showing congruent angles
- Calculation bubble showing: "∠Z = 180° - 50° - 70° = 60°"
- Checkmark indicating ∠R ≅ ∠Z

Annotations:
- "Given: ∠P ≅ ∠X and ∠Q ≅ ∠Y"
- "By angle sum: ∠R = 60° and ∠Z = 60°"
- "Therefore: ∠R ≅ ∠Z"
- "Conclusion: △PQR ~ △XYZ by AA"

Visual style: Side-by-side triangles with clear angle markings
Color scheme: Matching angles in same colors (50° in red, 70° in blue, 60° in green)

Implementation: Static diagram or interactive p5.js visualization
</details>

### SAS Similarity

If an angle of one triangle is congruent to an angle of another triangle, and the sides including those angles are proportional, then the triangles are similar.

This is similar to SAS congruence, but instead of sides being equal, they must be proportional with the same ratio.

### SSS Similarity

If the corresponding sides of two triangles are proportional (all three ratios are equal), then the triangles are similar.

#### Comparison Table: Congruence vs. Similarity

Here's how the criteria compare:

| Criterion | Congruence | Similarity |
|-----------|------------|------------|
| **SSS** | Three sides equal | Three sides proportional (same ratio) |
| **SAS** | Two sides equal, included angle equal | Two sides proportional, included angle equal |
| **ASA** | Two angles equal, included side equal | Not used (AA is sufficient) |
| **AAS** | Two angles equal, non-included side equal | Not used (AA is sufficient) |
| **AA** | Not sufficient for congruence | Two angles equal → Similar |

#### Drawing: Triangle Similarity Tester
<details markdown="1">
<summary>Triangle Similarity Tester MicroSim</summary>
Type: microsim

Learning Objective: Students will evaluate different triangle configurations to determine which similarity criterion applies, strengthening their ability to identify and justify similarity relationships (Bloom's: Evaluating).

Purpose: Allow students to test whether two triangles are similar by checking different criteria.

Canvas layout (850x600px):
- Left section (400x500): First triangle with adjustable parameters
- Right section (400x500): Second triangle with adjustable parameters
- Bottom section (850x100): Control panel and results display

Visual elements:
- Two triangles displayed with all side lengths and angle measures labeled
- Color highlighting for corresponding parts
- Visual indicators showing which elements are being compared
- Similarity verdict display with criterion used

Interactive controls:
- Triangle 1 sliders:
  - Side 1 length (range: 2-10, default: 4)
  - Side 2 length (range: 2-10, default: 6)
  - Included angle (range: 20°-140°, default: 60°)
- Triangle 2 sliders:
  - Side 1 length (range: 2-10, default: 6)
  - Side 2 length (range: 2-10, default: 9)
  - Included angle (range: 20°-140°, default: 60°)
- Button: "Check Similarity"
- Dropdown: "Test method" (AA, SAS, SSS, or Auto-detect)

Behavior:
- Triangles update in real-time as sliders move
- Calculate third side using law of cosines
- Calculate all angles
- When "Check Similarity" clicked:
  - Compare angles (for AA)
  - Calculate side ratios (for SSS and SAS)
  - Display which criterion applies (if any)
  - Highlight corresponding parts
  - Show scale factor if similar

Results display:
- "Triangles ARE similar by [criterion]" or "Triangles are NOT similar"
- If similar: "Scale factor k = [value]"
- Show all angle measures and side ratios
- Explain which criterion was satisfied

Educational features:
- Include "Challenge" button that generates random triangle pairs
- Track success rate
- Provide hints if students are stuck

Implementation: p5.js with geometric calculations
Include law of cosines: c² = a² + b² - 2ab cos(C)
</details>

## Proportional Segments and Geometric Mean

When we work with similar figures, we often encounter **proportional segments**—line segments whose lengths have equal ratios.

### Side-Splitter Theorem

If a line is parallel to one side of a triangle and intersects the other two sides, it divides those sides proportionally.

#### Diagram: Side-Splitter Theorem
<details markdown="1">
<summary>Side-Splitter Theorem Illustration</summary>
Type: diagram

Learning Objective: Students will understand how parallel lines create proportional segments in triangles, applying the Side-Splitter Theorem to solve for unknown lengths (Bloom's: Understanding, Applying).

Purpose: Visualize the Side-Splitter Theorem with a triangle and a parallel line creating proportional segments.

Components:
- Triangle ABC with base BC
- Point D on side AB, point E on side AC
- Line segment DE parallel to BC (marked with arrows)
- Measurements: AD = 3, DB = 5, AE = x, EC = 8
- Proportion equation displayed: AD/DB = AE/EC

Visual elements:
- Parallel markings (arrows) on DE and BC
- Color-coded segments: AD and DB in different shades of blue, AE and EC in different shades of orange
- Dashed line showing the parallel relationship
- Solution bubble: "3/5 = x/8, so x = 4.8"

Annotations:
- "If DE ∥ BC, then AD/DB = AE/EC"
- Label each segment length
- Show work for solving the proportion

Style: Clear geometric diagram with emphasis on proportional relationships
Color scheme: Blue for left side segments, orange for right side segments

Implementation: Static diagram or GeoGebra interactive
</details>

### Geometric Mean

The **geometric mean** of two numbers is the positive square root of their product. For two positive numbers $a$ and $b$:

#### Geometric Mean Formula

$\text{geometric mean} = \sqrt{a \cdot b}$

where:

- $a$ and $b$ are positive numbers
- The result is always between $a$ and $b$ (if $a < b$)

For example, the geometric mean of 4 and 9 is:

$\sqrt{4 \cdot 9} = \sqrt{36} = 6$

The geometric mean appears frequently in right triangles, especially when dealing with altitude to the hypotenuse.

### Altitude to Hypotenuse Theorem

In a right triangle, when you draw an altitude from the right angle to the hypotenuse, it creates three similar triangles. This altitude is the geometric mean of the two segments of the hypotenuse.

#### Diagram: Altitude to Hypotenuse
<details markdown="1">
<summary>Altitude to Hypotenuse and Three Similar Triangles</summary>
Type: diagram

Learning Objective: Students will analyze the relationship between a right triangle's altitude to the hypotenuse and the resulting similar triangles, applying geometric mean concepts (Bloom's: Analyzing, Applying).

Purpose: Show how an altitude to the hypotenuse of a right triangle creates three similar triangles and establishes geometric mean relationships.

Components:
- Right triangle ABC with right angle at C
- Hypotenuse AB
- Altitude CD from C perpendicular to AB, meeting at point D
- Three triangles highlighted in different colors:
  1. Original triangle ABC (outline)
  2. Small triangle ACD (light blue fill)
  3. Small triangle CBD (light orange fill)
- Segments labeled: AD = a, DB = b, CD = h

Mathematical relationships displayed:
- h² = a · b (altitude is geometric mean)
- △ABC ~ △ACD ~ △CBD (similarity statement)
- Right angle markings at C and D

Visual elements:
- Color coding for the three similar triangles
- Angle marks showing corresponding angles
- Formula box: "CD = √(AD · DB)"
- Example with numbers: If AD = 4 and DB = 9, then CD = √(4·9) = 6

Annotations:
- "Altitude creates two smaller triangles similar to the original"
- "The altitude is the geometric mean of the hypotenuse segments"
- Label each similar triangle separately

Style: Multi-layer diagram showing overlapping triangles
Color scheme: Original in black outline, smaller triangles in translucent blue and orange

Implementation: Interactive p5.js showing three triangles separately and combined
</details>

## The Pythagorean Theorem

One of the most famous theorems in all of mathematics! The **Pythagorean theorem** relates the three sides of a right triangle.

In any right triangle, the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides.

#### Pythagorean Theorem Formula

$a^2 + b^2 = c^2$

where:

- $a$ and $b$ are the lengths of the two legs (sides forming the right angle)
- $c$ is the length of the hypotenuse (side opposite the right angle)
- The order of $a$ and $b$ doesn't matter

This theorem lets you find any side of a right triangle if you know the other two sides.

**Example:** If a right triangle has legs of length 3 and 4, what is the hypotenuse?

$3^2 + 4^2 = c^2$

$9 + 16 = c^2$

$25 = c^2$

$c = 5$

#### Drawing: Pythagorean Theorem Visual Proof
<details markdown="1">
<summary>Pythagorean Theorem Visual Proof MicroSim</summary>
Type: microsim

Learning Objective: Students will understand why the Pythagorean theorem is true through visual area relationships, deepening conceptual understanding beyond memorization (Bloom's: Understanding, Analyzing).

Purpose: Provide an interactive visual proof of the Pythagorean theorem using area squares.

Canvas layout (700x700px):
- Central area: Right triangle with squares drawn on each side
- Bottom area: Controls and area calculations

Visual elements:
- Right triangle with legs a and b, hypotenuse c
- Square drawn on leg a (colored blue) with area a²
- Square drawn on leg b (colored green) with area b²
- Square drawn on hypotenuse c (colored red) with area c²
- Grid overlay showing unit squares for counting
- Area labels on each square

Interactive controls:
- Slider: Length of leg a (range: 3-10, default: 3, step: 1)
- Slider: Length of leg b (range: 3-10, default: 4, step: 1)
- Button: "Animate Proof" - shows squares rearranging visually
- Display: "a² = [value]", "b² = [value]", "c² = [value]"
- Display: "a² + b² = [sum]"
- Checkbox: "Show unit squares" (shows grid for counting)

Behavior:
- Right triangle updates when sliders change
- All three squares update with triangle
- Calculate and display all areas
- "Animate Proof" button shows visual rearrangement demonstrating a² + b² = c²
- Verify equation: highlight in green if equal, red if not equal

Educational features:
- Drag and drop mode: Allow students to rearrange unit squares from a² and b² squares into the c² square
- Show different visual proof styles (traditional, dissection, algebraic)
- Include famous Pythagorean triples as preset buttons (3-4-5, 5-12-13, 8-15-17)

Default parameters:
- Start with 3-4-5 triangle (most recognizable)
- Grid visible by default
- Animation speed: medium

Implementation: p5.js with animation using frameCount
Include smooth transitions for the rearrangement animation
</details>

### Pythagorean Triples

A **Pythagorean triple** is a set of three positive integers $a$, $b$, and $c$ that satisfy the Pythagorean theorem: $a^2 + b^2 = c^2$.

Common Pythagorean triples include:

- 3, 4, 5 (the most famous!)
- 5, 12, 13
- 8, 15, 17
- 7, 24, 25

You can multiply any Pythagorean triple by the same number to get another triple. For example, multiplying 3-4-5 by 2 gives 6-8-10, which is also a Pythagorean triple.

### Converse of the Pythagorean Theorem

The converse tells us how to determine if a triangle is a right triangle when we know all three side lengths.

If $a^2 + b^2 = c^2$ (where $c$ is the longest side), then the triangle is a **right triangle**.

If $a^2 + b^2 > c^2$, then the triangle is an **acute triangle** (all angles less than 90°).

If $a^2 + b^2 < c^2$, then the triangle is an **obtuse triangle** (one angle greater than 90°).

#### Triangle Type Classifier Table

| Side lengths | Calculation | Result | Triangle type |
|--------------|-------------|--------|---------------|
| 3, 4, 5 | 3² + 4² = 9 + 16 = 25; 5² = 25 | 25 = 25 | Right |
| 6, 7, 8 | 6² + 7² = 36 + 49 = 85; 8² = 64 | 85 > 64 | Acute |
| 5, 6, 10 | 5² + 6² = 25 + 36 = 61; 10² = 100 | 61 < 100 | Obtuse |

## Distance in the Coordinate Plane

The Pythagorean theorem gives us a powerful tool for finding distances on the coordinate plane!

To find the distance between two points $(x_1, y_1)$ and $(x_2, y_2)$, we can imagine a right triangle where:

- One leg has length $|x_2 - x_1|$ (horizontal distance)
- The other leg has length $|y_2 - y_1|$ (vertical distance)
- The hypotenuse is the distance we want to find

#### Distance Formula

$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

where:

- $d$ is the distance between the two points
- $(x_1, y_1)$ is the first point
- $(x_2, y_2)$ is the second point

**Example:** Find the distance between $(2, 3)$ and $(5, 7)$.

$d = \sqrt{(5-2)^2 + (7-3)^2} = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$

#### Drawing: Distance Formula Explorer
<iframe src="../../sims/distance-formula/main.html" height="600px" width="100%" scrolling="no">
<details markdown="1">
<summary>Distance Formula Explorer MicroSim</summary>
**Type:** microsim
**Status: In Progress
**Name:** distance-formula

Learning Objective: Students will apply the distance formula to find distances between two points on the coordinate plane, visualizing the connection to the Pythagorean theorem (Bloom's: Applying, Understanding).

Purpose: Interactive coordinate plane where students can place points and see the distance calculation with visual right triangle.

Canvas layout (800x650px):
- Main area 600px high: width response
- Coordinate plane with grid (-10 to 10 on both axes)
- Bottom area (800x100): Controls and calculation display

Visual elements:
- Coordinate grid with x and y axes labeled
- Two draggable points (Point A in blue, Point B in red)
- Dashed line connecting the points (the distance)
- Right triangle formed by horizontal and vertical legs (light gray)
- Horizontal leg labeled with length
- Vertical leg labeled with length
- Hypotenuse (distance) labeled with length

Interactive controls:
- Draggable points: Click and drag Point A or Point B anywhere on grid
- Input fields: Manual entry for coordinates
  - Point A: (x₁, y₁)
  - Point B: (x₂, y₂)
- Checkbox: "Show right triangle"
- Checkbox: "Show calculation steps"
- Button: "Random points"

Display panels:
- Coordinates: "A = ([x₁], [y₁])" and "B = ([x₂], [y₂])"
- Horizontal distance: "|x₂ - x₁| = [value]"
- Vertical distance: "|y₂ - y₁| = [value]"
- Distance calculation: "d = √[(x₂-x₁)² + (y₂-y₁)²] = [value]"

Behavior:
- When point dragged, all calculations update in real-time
- Right triangle highlights when points move
- Snap to grid option (can be toggled)
- Show step-by-step calculation when checkbox enabled

Educational features:
- Challenge mode: Given distance, find possible point locations
- Show common distances (Pythagorean triples)
- Include unit circle overlay option

Default parameters:
- Point A at (1, 2)
- Point B at (4, 6)
- Grid visible, triangle visible
- Snap to grid enabled

Implementation: p5.js with mouse interaction for dragging
Use dist() function for validation
</details>

## Introduction to Trigonometry

Trigonometry comes from Greek words meaning "triangle measurement." It's all about the relationships between angles and sides in triangles—specifically, right triangles.

The three basic **trigonometric ratios** are:

1. **Sine (sin)**
2. **Cosine (cos)**
3. **Tangent (tan)**

Each ratio compares two sides of a right triangle relative to one of the acute angles.

### The Three Trigonometric Ratios

For any acute angle θ (theta) in a right triangle:

#### Sine Ratio Formula

$\sin(\theta) = \frac{\text{opposite}}{\text{hypotenuse}}$

where:

- $\theta$ is an acute angle in the right triangle
- opposite is the side opposite to angle $\theta$
- hypotenuse is the longest side (opposite the right angle)

#### Cosine Ratio Formula

$\cos(\theta) = \frac{\text{adjacent}}{\text{hypotenuse}}$

where:

- $\theta$ is an acute angle in the right triangle
- adjacent is the side next to angle $\theta$ (not the hypotenuse)
- hypotenuse is the longest side

#### Tangent Ratio Formula

$\tan(\theta) = \frac{\text{opposite}}{\text{adjacent}}$

where:

- $\theta$ is an acute angle in the right triangle
- opposite is the side opposite to angle $\theta$
- adjacent is the side next to angle $\theta$

### SOH-CAH-TOA: The Trigonometry Memory Aid

A popular way to remember these ratios is **SOH-CAH-TOA**:

- **SOH**: Sine = Opposite / Hypotenuse
- **CAH**: Cosine = Adjacent / Hypotenuse
- **TOA**: Tangent = Opposite / Adjacent

#### Diagram: Trigonometric Ratios Visualization
<details markdown="1">
<summary>Trigonometric Ratios in a Right Triangle</summary>
Type: diagram

Learning Objective: Students will identify and label the opposite, adjacent, and hypotenuse sides relative to a given angle, and calculate the three basic trigonometric ratios (Bloom's: Remembering, Understanding, Applying).

Purpose: Clear labeled diagram showing a right triangle with all three trigonometric ratios defined for one angle.

Components:
- Right triangle with vertices labeled A (right angle), B, C
- Angle θ (theta) at vertex B
- Three sides clearly labeled:
  - Hypotenuse (side BC) = 5
  - Opposite (side AC, opposite to θ) = 3
  - Adjacent (side AB, adjacent to θ) = 4
- Right angle mark at vertex A

Annotations with calculations:
- sin(θ) = opposite/hypotenuse = 3/5 = 0.6
- cos(θ) = adjacent/hypotenuse = 4/5 = 0.8
- tan(θ) = opposite/adjacent = 3/4 = 0.75

Visual elements:
- Color-code each side: opposite (red), adjacent (blue), hypotenuse (green)
- Arc showing angle θ
- "SOH-CAH-TOA" reminder in a box
- Arrows pointing from each ratio to its corresponding sides

Style: Clean, educational diagram with clear labels
Color scheme: Bright, distinct colors for each side type

Implementation: Static diagram or interactive p5.js where students can change the angle
</details>

#### Drawing: Trigonometric Ratios Explorer
<details markdown="1">
<summary>Trigonometric Ratios Explorer MicroSim</summary>
Type: microsim

Learning Objective: Students will create right triangles with different angles and observe how sine, cosine, and tangent values change, developing intuition about trigonometric functions (Bloom's: Applying, Analyzing).

Purpose: Allow students to adjust a right triangle's angle and see how the three trig ratios change in real-time.

Canvas layout (800x600px):
- Left side (500x600): Drawing area with right triangle
- Right side (300x600): Display panel showing all calculations and a unit circle reference

Visual elements:
- Right triangle with one vertex at origin
- Angle θ adjustable from 0° to 90°
- Three sides labeled: opposite (red), adjacent (blue), hypotenuse (green)
- Side lengths displayed
- Unit circle overlay option (radius = 1) showing how triangle relates to circle

Interactive controls:
- Slider: Angle θ (range: 5° to 85°, default: 30°, step: 1°)
- Display: Current angle in degrees
- Button: "Show common angles" (30°, 45°, 60°)
- Checkbox: "Lock hypotenuse at 1" (creates unit circle triangle)
- Checkbox: "Show unit circle"
- Button: Reset

Display panel:
- Current angle: θ = [value]°
- Opposite side = [value]
- Adjacent side = [value]
- Hypotenuse = [value]
- sin(θ) = opp/hyp = [calculation] = [decimal]
- cos(θ) = adj/hyp = [calculation] = [decimal]
- tan(θ) = opp/adj = [calculation] = [decimal]

Behavior:
- As slider moves, triangle rotates while keeping right angle fixed
- All side lengths and ratios update in real-time
- Highlight which sides are being used for each ratio on hover
- Option to show values on unit circle
- Graph showing how sin, cos, tan values change with angle

Educational features:
- Show special angles (30°, 45°, 60°) with exact values
- Display relationship: tan(θ) = sin(θ)/cos(θ)
- Show complementary angle relationship: sin(θ) = cos(90° - θ)
- Include identity: sin²(θ) + cos²(θ) = 1

Default parameters:
- Start with 30° angle
- Hypotenuse = 2 units
- Color-coded sides visible

Implementation: p5.js with real-time calculations
Use p5.js sin(), cos(), tan() functions (remember to convert degrees to radians)
Include visual representation linking triangle to unit circle
</details>

### Using Trigonometry to Find Unknown Sides

When you know one acute angle and one side of a right triangle, you can use trigonometry to find the other sides!

**Steps:**

1. Identify which side you know and which side you want to find
2. Choose the trig ratio that relates those two sides
3. Set up an equation
4. Solve for the unknown side

**Example:** A ladder leans against a wall at a 70° angle with the ground. If the ladder is 10 feet long, how high up the wall does it reach?

- Known: angle = 70°, hypotenuse = 10 ft
- Unknown: opposite side (height)
- Ratio: sin(70°) = opposite/hypotenuse

$\sin(70°) = \frac{h}{10}$

$h = 10 \cdot \sin(70°) ≈ 10 \cdot 0.94 = 9.4 \text{ feet}$

## Inverse Trigonometric Functions

Sometimes we know the sides of a right triangle but need to find an angle. That's where **inverse trigonometric functions** come in!

The three inverse trig functions are:

- $\sin^{-1}$ (or arcsin): finds the angle when you know opposite and hypotenuse
- $\cos^{-1}$ (or arccos): finds the angle when you know adjacent and hypotenuse
- $\tan^{-1}$ (or arctan): finds the angle when you know opposite and adjacent

**Note:** The $-1$ is not an exponent! $\sin^{-1}$ does not mean $\frac{1}{\sin}$. It means "inverse sine."

**Example:** A ramp has a horizontal length of 12 feet and a height of 3 feet. What angle does it make with the ground?

$\tan(\theta) = \frac{3}{12} = 0.25$

$\theta = \tan^{-1}(0.25) ≈ 14°$

#### Drawing: Inverse Trig Function Solver
<details markdown="1">
<summary>Inverse Trig Function Solver MicroSim</summary>
Type: microsim

Learning Objective: Students will apply inverse trigonometric functions to find unknown angles in right triangles given two sides, reversing the typical trigonometry problem (Bloom's: Applying, Analyzing).

Purpose: Interactive tool where students input two sides of a right triangle and the simulation finds all angles.

Canvas layout (800x600px):
- Left side (450x600): Drawing area with right triangle
- Right side (350x600): Input controls and results display

Visual elements:
- Right triangle with adjustable sides
- All three sides labeled with lengths
- All three angles labeled with measures
- Right angle clearly marked
- Color highlighting for the sides being used in current calculation

Interactive controls:
- Input: Opposite side length (range: 1-20, default: 3)
- Input: Adjacent side length (range: 1-20, default: 4)
- Button: "Calculate angles"
- Radio buttons: Select which angle to focus on (angle A or angle B)
- Display: "Hypotenuse = [calculated value]"
- Checkbox: "Show calculation steps"

Display panel:
- Triangle sides: a = [opp], b = [adj], c = [hyp]
- Angle calculations:
  - "Using opposite and adjacent:"
  - "θ = tan⁻¹(opp/adj) = tan⁻¹([ratio]) = [angle]°"
  - "Using opposite and hypotenuse:"
  - "θ = sin⁻¹(opp/hyp) = sin⁻¹([ratio]) = [angle]°"
  - "Using adjacent and hypotenuse:"
  - "θ = cos⁻¹(adj/hyp) = cos⁻¹([ratio]) = [angle]°"
- Verification: "All methods give same angle: [value]°"
- Other acute angle: "90° - θ = [value]°"

Behavior:
- Triangle updates when inputs change
- Calculate hypotenuse using Pythagorean theorem
- Find angle using all three inverse trig methods
- Highlight that all methods give the same result
- Show the complementary angle automatically

Educational features:
- "Real-world problems" button: Generates word problems (ladder, ramp, etc.)
- Show calculator syntax: "sin⁻¹" or "arcsin" or "asin"
- Explain domain and range of inverse functions
- Include degree/radian toggle

Challenge mode:
- Given a scenario, student must choose correct inverse function
- Provide immediate feedback

Default parameters:
- Start with 3-4-5 triangle
- Show all calculation steps
- Angles displayed in degrees

Implementation: p5.js with atan2() for angle calculations
Include input validation (positive numbers only)
Use p5.js text() for clear display of equations
</details>

## Angles of Elevation and Depression

**Angle of elevation** is the angle formed by a horizontal line and a line of sight looking **up** to an object above.

**Angle of depression** is the angle formed by a horizontal line and a line of sight looking **down** to an object below.

These angles are commonly used in surveying, navigation, and architecture.

#### Diagram: Angles of Elevation and Depression
<details markdown="1">
<summary>Angles of Elevation and Depression</summary>
Type: diagram

Learning Objective: Students will differentiate between angles of elevation and depression, understanding their geometric relationship as alternate interior angles (Bloom's: Understanding, Analyzing).

Purpose: Show both angle of elevation and angle of depression in a single scenario to illustrate their relationship.

Components:
- Observer standing on a cliff (elevated platform)
- Boat on the water below
- Airplane in the sky above
- Horizontal line at observer's eye level (dashed)
- Line of sight from observer to boat (downward)
- Line of sight from observer to airplane (upward)
- Angle of depression marked (between horizontal and line to boat)
- Angle of elevation marked (between horizontal and line to airplane)

Annotations:
- "Angle of elevation" labeled with arc and arrow pointing up
- "Angle of depression" labeled with arc and arrow pointing down
- "Horizontal line of sight" (dashed reference line)
- "Observer's eye level"
- Note: "Angle of depression = angle of elevation from boat to observer (alternate interior angles)"

Visual elements:
- Observer figure on cliff
- Boat below in water
- Airplane above in clouds
- Clear angular measurements (e.g., 30° depression, 45° elevation)
- Color-coded angles (depression in orange, elevation in blue)

Style: Side-view scenic diagram with clear geometric relationships
Color scheme: Natural colors with highlighted angles

Implementation: Static diagram or interactive p5.js where objects can be repositioned
</details>

### Solving Angle of Elevation Problems

**Example:** From a point on the ground 50 feet from the base of a building, the angle of elevation to the top is 60°. How tall is the building?

Set up a right triangle:

- Adjacent side = 50 feet (distance from building)
- Opposite side = h (height of building)
- Angle = 60°

Use tangent:

$\tan(60°) = \frac{h}{50}$

$h = 50 \cdot \tan(60°) ≈ 50 \cdot 1.732 = 86.6 \text{ feet}$

## Indirect Measurement

**Indirect measurement** means finding a distance or height without measuring it directly. This is incredibly useful when you can't physically measure something—like the height of a mountain or the width of a river!

Trigonometry and similar triangles make indirect measurement possible.

### Methods of Indirect Measurement

1. **Similar triangles method**: Create a smaller similar triangle that you can measure
2. **Trigonometry method**: Measure an angle and one distance, then use trig ratios
3. **Shadow method**: Use shadows and proportions on a sunny day

#### Drawing: Shadow Method Indirect Measurement
<details markdown="1">
<summary>Shadow Method Indirect Measurement MicroSim</summary>
Type: microsim

Learning Objective: Students will apply similar triangle concepts and proportional reasoning to solve real-world indirect measurement problems, creating their own measurement scenarios (Bloom's: Applying, Creating).

Purpose: Demonstrate how to measure the height of a tall object (like a tree) using shadows and similar triangles.

Canvas layout (900x650px):
- Main drawing area (900x500): Scene showing tall object and reference object with shadows
- Control panel (900x150): Sliders and measurement displays

Visual elements:
- Tall tree (or building) with unknown height H
- Shadow of tree with length s₁
- Person (or stick) of known height h
- Shadow of person with length s₂
- Sun rays showing parallel light beams
- Two similar right triangles highlighted:
  - Large triangle: tree height to shadow length
  - Small triangle: person height to shadow length
- Grid background for scale reference

Interactive controls:
- Slider: Person height (range: 4-6.5 ft, default: 5.5 ft)
- Slider: Person shadow length (range: 3-15 ft, default: 4 ft)
- Slider: Tree shadow length (range: 10-50 ft, default: 24 ft)
- Dropdown: Object type (tree, building, flagpole, tower)
- Button: "Measure height"
- Slider: Sun angle (affects all shadow lengths proportionally)

Display panel:
- Known measurements:
  - "Person height (h): [value] ft"
  - "Person shadow (s₂): [value] ft"
  - "Tree shadow (s₁): [value] ft"
- Proportion setup:
  - "h/s₂ = H/s₁"
  - "[h]/[s₂] = H/[s₁]"
- Calculation:
  - "H = h × (s₁/s₂)"
  - "H = [h] × ([s₁]/[s₂])"
  - "H = [result] ft"

Behavior:
- When sun angle slider changes, both shadows change proportionally
- Triangles are highlighted when calculation is shown
- Corresponding sides are color-matched
- Show the proportion equation with actual values
- Calculate and display tree height

Educational features:
- "Try it yourself" mode: Gives target height, student adjusts person's position
- Show that the two triangles are similar (AA similarity)
- Explain why shadows create similar triangles (parallel sun rays)
- Include "What if" scenarios: cloudy day, no shadows, etc.
- Real-world tips: measure shadows at same time of day

Visual details:
- Animate sun moving across sky (changing angle)
- Show shadows lengthening/shortening
- Display angles in both triangles to show they're equal

Default parameters:
- Person: 5.5 ft tall, 4 ft shadow
- Tree: 24 ft shadow, height to be calculated (33 ft)
- Sun angle: 45° (creates similar-length shadows)

Implementation: p5.js with proportional calculations
Include realistic visual elements (sun, clouds, ground)
Use color coding to match corresponding parts of similar triangles
</details>

#### Drawing: Angle of Elevation Measurement Tool
<details markdown="1">
<summary>Angle of Elevation Measurement Tool MicroSim</summary>
Type: microsim

Learning Objective: Students will apply trigonometric ratios to solve indirect measurement problems involving angles of elevation, connecting classroom mathematics to real-world surveying (Bloom's: Applying, Evaluating).

Purpose: Simulate measuring the height of a tall object using angle of elevation and distance from base.

Canvas layout (900x600px):
- Main scene (900x450): Side view of object being measured
- Control panel (900x150): Inputs and results

Visual elements:
- Tall object (tree, building, mountain - selectable)
- Observer at ground level with sight line to top
- Horizontal reference line (eye level)
- Angle of elevation marked with arc and measurement
- Distance from observer to base of object (horizontal line)
- Right triangle formed by the scenario (highlighted)
- Height to be calculated (dashed line up object)

Interactive controls:
- Slider: Distance from object (range: 20-200 ft, default: 100 ft)
- Slider: Angle of elevation (range: 10°-80°, default: 35°, step: 1°)
- Input: Observer eye height (range: 4-6 ft, default: 5.5 ft)
- Dropdown: Object type (tree, building, lighthouse, mountain)
- Button: "Calculate height"
- Button: "New scenario"

Calculation display:
- "Given information:"
  - "Distance to base (adjacent): [value] ft"
  - "Angle of elevation: [value]°"
  - "Eye height: [value] ft"
- "Using tangent ratio:"
  - "tan([angle]°) = opposite/adjacent"
  - "tan([angle]°) = height/[distance]"
  - "height = [distance] × tan([angle]°)"
  - "height = [distance] × [tan value]"
  - "height = [calculated height] ft"
- "Total height = [calculated height] + [eye height] = [total] ft"

Behavior:
- Visual updates when sliders change
- Triangle adjusts to show new angle and distance
- When "Calculate" pressed, show step-by-step solution
- Highlight which sides and angle are being used
- Show the calculated height as a dashed line up the object
- Display measurement units clearly

Educational features:
- "Real measurement" mode: Use device's camera and accelerometer (if available)
- Show common errors: forgetting to add eye height, using wrong ratio
- Include validation: reasonable angles (not too steep or shallow)
- Challenge: Given height and distance, find angle
- Show multiple measurement points option (average multiple measurements)

Visual enhancements:
- Draw triangle components in different colors
- Animate line of sight moving to show angle
- Show measuring tool (clinometer or transit)
- Include realistic object textures

Real-world connection:
- Tips box: "Stand far enough that angle isn't too steep"
- "Measure on level ground for accuracy"
- "Use measuring tape or walking steps for distance"

Default parameters:
- Distance: 100 ft
- Angle: 35°
- Eye height: 5.5 ft
- Object: tree
- Calculated height: ~75 ft

Implementation: p5.js with trig calculations
Include tan() function with degree-to-radian conversion
Visual feedback for each step of calculation
Option to print results for field use
</details>

## Applications and Real-World Connections

Similarity and trigonometry have countless real-world applications:

- **Architecture**: Scale models and blueprint drawings
- **Navigation**: GPS, surveying, and map making
- **Engineering**: Bridge design, ramp angles, roof pitches
- **Astronomy**: Measuring distances to stars using parallax
- **Art**: Creating perspective drawings
- **Construction**: Ensuring proper angles and proportions
- **Sports**: Analyzing trajectories in basketball, soccer, golf
- **Medicine**: CT scans and MRI imaging use geometric transformations

#### Workflow: Solving a Trigonometry Word Problem
<details markdown="1">
<summary>Step-by-Step Trigonometry Problem-Solving Workflow</summary>
Type: workflow

Learning Objective: Students will evaluate word problems systematically to identify known and unknown values, select appropriate trigonometric methods, and solve real-world applications (Bloom's: Applying, Evaluating).

Purpose: Provide a systematic approach for solving trigonometry word problems involving right triangles.

Visual style: Flowchart with decision diamonds and process rectangles

Steps:

1. Start: "Read the word problem carefully"
   Hover text: "Identify what the problem is asking you to find"

2. Process: "Draw a diagram"
   Hover text: "Sketch a right triangle representing the situation. Label the right angle, known sides/angles, and unknown values"

3. Process: "Identify known information"
   Hover text: "List all given measurements: sides, angles, distances. Mark them on your diagram"

4. Process: "Identify what you need to find"
   Hover text: "Determine the unknown: is it a side length or an angle measure?"

5. Decision: "Finding a side or an angle?"
   Hover text: "Different methods are used depending on whether you're finding a missing side or a missing angle"

6a. Branch (Finding a side):
    Process: "Identify which trig ratio to use"
    Hover text: "Choose sin, cos, or tan based on which sides you know and which you need. Use SOH-CAH-TOA"

7a. Process: "Set up equation"
    Hover text: "Write the trig ratio equation: sin(θ) = opp/hyp, cos(θ) = adj/hyp, or tan(θ) = opp/adj"

8a. Process: "Solve for the unknown side"
    Hover text: "Multiply both sides by the appropriate value to isolate the unknown"

6b. Branch (Finding an angle):
    Process: "Identify which sides you know"
    Hover text: "Determine which two sides of the triangle are given"

7b. Process: "Choose inverse trig function"
    Hover text: "Use sin⁻¹, cos⁻¹, or tan⁻¹ based on which two sides you know"

8b. Process: "Calculate the angle"
    Hover text: "Use your calculator's inverse trig functions. Make sure it's in degree mode!"

9. Process (both branches merge): "Check your answer"
   Hover text: "Does your answer make sense? Is the angle between 0° and 90°? Is the side length reasonable?"

10. Process: "State your answer with units"
    Hover text: "Write a complete sentence answering the original question with appropriate units (feet, meters, degrees, etc.)"

11. End: "Problem solved!"
    Hover text: "Great work! Practice with more problems to build confidence"

Color coding:
- Blue: Reading and setup steps
- Green: Calculation steps
- Yellow: Decision points
- Orange: Verification and answer steps

Swimlanes:
- Problem understanding
- Diagram and setup
- Mathematical solution
- Verification and communication

Additional notes in corners:
- "Common mistakes: Wrong mode (radians vs degrees), mixing up opposite/adjacent, forgetting units"
- "Tips: Always draw a diagram! Label everything you know!"

Implementation: Interactive flowchart using Mermaid or custom p5.js visualization
Include clickable nodes that expand with examples
</details>

## Key Takeaways

Let's review the essential concepts from this chapter:

**Similarity:**

- Similar figures have the same shape but different sizes
- Corresponding angles are congruent; corresponding sides are proportional
- Scale factor is the ratio of corresponding side lengths
- Triangle similarity can be proven using AA, SAS, or SSS

**Geometric Mean and Proportional Segments:**

- Geometric mean of $a$ and $b$ is $\sqrt{a \cdot b}$
- Altitude to hypotenuse creates similar triangles
- Side-Splitter Theorem: parallel line creates proportional segments

**Pythagorean Theorem:**

- In a right triangle: $a^2 + b^2 = c^2$
- Pythagorean triples: integer solutions like 3-4-5
- Converse: Use to classify triangles as right, acute, or obtuse
- Distance formula: Apply Pythagorean theorem to coordinate plane

**Trigonometric Ratios:**

- sin(θ) = opposite/hypotenuse
- cos(θ) = adjacent/hypotenuse
- tan(θ) = opposite/adjacent
- Remember: **SOH-CAH-TOA**

**Inverse Trigonometric Functions:**

- Use sin⁻¹, cos⁻¹, tan⁻¹ to find angles when sides are known
- Found on calculator (make sure it's in degree mode!)

**Applications:**

- Angle of elevation: looking up from horizontal
- Angle of depression: looking down from horizontal
- Indirect measurement: using similarity or trigonometry to find distances you can't measure directly
- Shadow method: use similar triangles and proportions

## Practice Problems

Test your understanding with these problems:

1. **Similar Triangles**: If triangle ABC ~ triangle DEF with sides AB = 6, BC = 8, AC = 10 and DE = 9, find EF and DF.

2. **Scale Factor**: A photograph is 4 inches by 6 inches. If it's enlarged with a scale factor of 2.5, what are the new dimensions?

3. **Geometric Mean**: Find the geometric mean of 12 and 27.

4. **Pythagorean Theorem**: A right triangle has legs of 7 cm and 24 cm. Find the hypotenuse.

5. **Triangle Classification**: Determine if a triangle with sides 10, 11, and 15 is right, acute, or obtuse.

6. **Distance Formula**: Find the distance between points (-3, 2) and (5, 8).

7. **Trigonometry**: In a right triangle, if the hypotenuse is 20 and one angle is 40°, find the length of the side opposite the 40° angle.

8. **Inverse Trig**: A ramp rises 2 feet over a horizontal distance of 10 feet. What angle does it make with the ground?

9. **Angle of Elevation**: From 150 feet away, the angle of elevation to the top of a building is 32°. How tall is the building (ignore eye height)?

10. **Indirect Measurement**: A 6-foot person casts a 4-foot shadow. At the same time, a tree casts a 26-foot shadow. How tall is the tree?

## Looking Ahead

In the next chapter, we'll explore **polygons and quadrilaterals** in depth, examining special properties of parallelograms, rectangles, rhombuses, and trapezoids. You'll use your knowledge of similarity and trigonometry to analyze these shapes and solve problems involving their angles, sides, and diagonals.

The concepts you've learned in this chapter—especially proportional reasoning and the Pythagorean theorem—will continue to be essential tools throughout the rest of your geometry studies and beyond!
