# Area, Volume, and Applications

## Summary

This chapter applies geometric principles to measurement of two-dimensional and three-dimensional figures, culminating in real-world modeling and design challenges. You'll learn area formulas for polygons and circles, explore three-dimensional solids including prisms, pyramids, cylinders, cones, and spheres, and calculate surface areas and volumes. The chapter concludes with practical applications including scale models, optimization problems, and design projects that integrate concepts from throughout the course.

## Concepts Covered

This chapter covers the following 39 concepts from the learning graph:

1. Area of Rectangle
2. Area of Square
3. Area of Parallelogram
4. Area of Triangle
5. Area of Trapezoid
6. Area of Rhombus
7. Area of Kite
8. Area of Regular Polygon
9. Area of Circle
10. Circumference
11. Pi
12. Perimeter
13. Prism
14. Pyramid
15. Cylinder
16. Cone
17. Sphere
18. Polyhedron
19. Face
20. Edge
21. Lateral Face
22. Lateral Edge
23. Base of Solid
24. Height of Solid
25. Surface Area
26. Lateral Surface Area
27. Volume of Prism
28. Volume of Pyramid
29. Volume of Cylinder
30. Volume of Cone
31. Volume of Sphere
32. Cross-Section
33. Cavalieri's Principle
34. Net of Solid
35. Scale Drawing
36. Scale Model
37. Optimization Problem
38. Modeling with Geometry
39. Design Challenge
40. Geometric Proof Portfolio

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)
- [Chapter 7: Triangle Congruence and Properties](../07-triangle-congruence/index.md)
- [Chapter 9: Polygons and Quadrilaterals](../09-polygons-quadrilaterals/index.md)
- [Chapter 10: Similarity and Right Triangle Trigonometry](../10-similarity-trigonometry/index.md)
- [Chapter 11: Circles](../11-circles/index.md)

---

## Introduction

Welcome to the culminating chapter of your geometry journey! In this chapter, you'll bring together everything you've learned about shapes, measurements, and reasoning to solve real-world problems involving area and volume. From designing packaging to planning construction projects, the formulas and techniques you'll master here have countless practical applications.

We'll start by reviewing and expanding your knowledge of two-dimensional area calculations, then venture into the fascinating world of three-dimensional geometry. You'll learn to calculate surface areas and volumes of prisms, pyramids, cylinders, cones, and spheres. Finally, you'll apply these skills to authentic challenges involving scale models, optimization, and geometric design.

By the end of this chapter, you'll be able to:

- Calculate areas of rectangles, triangles, parallelograms, trapezoids, rhombuses, kites, regular polygons, and circles
- Identify and describe properties of three-dimensional solids
- Calculate surface areas and volumes of prisms, pyramids, cylinders, cones, and spheres
- Apply Cavalieri's Principle to understand volume relationships
- Create and interpret scale drawings and scale models
- Solve optimization problems using geometric principles
- Design solutions to real-world challenges using geometric modeling

---

## Part 1: Area of Polygons

### Understanding Area

**Area** measures the amount of two-dimensional space inside a closed figure. We measure area in square units such as square centimeters ($\text{cm}^2$), square meters ($\text{m}^2$), or square feet ($\text{ft}^2$).

The concept of area builds on a simple foundation: the **area of a rectangle** is found by multiplying its length and width:

$$A = lw$$

From this basic formula, we can derive formulas for all other polygons.

#### Diagram: Area Formulas for Quadrilaterals

<iframe src="../../sims/area-formulas-quadrilaterals/main.html" height="480px" width="100%" scrolling="no"></iframe>

[View the Area Area Formulas for Quadrilaterals Fullscreen](../../sims/area-formulas-quadrilaterals/main.html)

<details markdown="1">
   <summary>Visual guide to quadrilateral area formulas</summary>

**Type:** P5.js MicroSim
**Status:** Done

**Learning Objective:** Students will **remember** area formulas for rectangles, squares, parallelograms, trapezoids, rhombuses, and kites, and **understand** how these formulas relate to the base rectangle formula. (Bloom's Taxonomy: Remembering, Understanding)

## Specification

**Title:** "Area Formulas for Quadrilaterals" (bold, 24pt, centered, top)
**Status:** Done

Create a colorful six-panel diagram showing six quadrilaterals with their area formulas in a grid layout 3 columns wide and 2 rows deep.  
The MicroSim will be 500px tall and be width responsive.
The margin around the panels will be 10px.
The width of each panel will be 1/3 of the canvas width less 4 margin 
A centered title will be drawn at the top of each panel.  
A drawing of the shape will be in the center of the panel.
Use panelWidth as a global variable.
Make all the panels width update in the updateCanvasSize()
At the bottom will be the formula to calculate the area of each item.
Each panel will have a push() and pop() wrapping the center drawing of the object.

Put panelTitleFontSize as 24 in the globals.
Put the panelTitleFormulaFontSize as 16 in the globals.

**Layout:** 2 rows × 3 columns, each cell 1/3 of the canvas wide × and 300px tall

## Row 1 Specification

### Cell 1: Rectangle
- Background: Light yellow (#FFF9C4)
- Draw rectangle in navy blue (#1A237E), filled with semi-transparent blue (#64B5F6, 30% opacity)
- Make the drawing of the rectangle always be centered in the panel.
- Update the width of the drawing relative to the panelWidth-2*margin.
- Formula below: $A = lw$

### Cell 2: Square
- Background: Light pink (#FCE4EC)
- Draw square in deep purple (#4A148C), filled with semi-transparent purple (#BA68C8, 30% opacity)
- Make the drawing of the square always be centered in the panel.
- Update the width of the drawing relative to the panelWidth-2*margin.
- Formula below: $A = s^2$ (bold, 18pt)

### Cell 3: Parallelogram
- Background: Light green (#E8F5E9)
- Draw parallelogram slanted in dark green (#1B5E20), filled with semi-transparent green (#81C784, 30% opacity)
- Draw dashed height line perpendicular to base (red)
- Label base "b" and height "h" (red text)
- Update the width of the drawing relative to the panelWidth-2*margin.
- Formula below: $A = bh$ (bold, 18pt)

**Row 2:**

**Cell 4: Trapezoid**
- Background: Light orange (#FFF3E0)
- Draw trapezoid in dark orange (#E65100), filled with semi-transparent orange (#FFB74D, 30% opacity)
- Draw dashed height line (red)
- Label top base "$b_1$", bottom base "$b_2$", height "h" (red text)
- Update the width of the drawing relative to the panelWidth-2*margin.
- Formula below: $A = \frac{1}{2}(b_1 + b_2)h$ (bold, 18pt)

**Cell 5: Rhombus**
- Background: Light cyan (#E0F7FA)
- Draw rhombus (diagonals 180px and 120px) in dark cyan (#006064), filled with semi-transparent cyan (#4DD0E1, 30% opacity)
- Draw both diagonals as dashed lines (red)
- Label diagonals "$d_1$" and "$d_2$" (red text)
- Update the width of the drawing relative to the panelWidth-2*margin.
- Formula below: $A = \frac{1}{2}d_1d_2$ (bold, 18pt)

**Cell 6: Kite**
- Background: Light lavender (#F3E5F5)
- Draw kite in dark purple (#6A1B9A), filled with semi-transparent purple (#BA68C8, 30% opacity)
- Draw both diagonals as dashed lines (red)
- Label diagonals "$d_1$" and "$d_2$" (red text)
- Update the width of the drawing relative to the panelWidth-2*margin.
- Formula below: $A = \frac{1}{2}d_1d_2$ (bold, 18pt)

**Implementation Note:** This MicroSim was created by the microsim-p5 skill with only a small change to the placement of the kite.  This was fixed by adding a `translate(0, -20)` after the `push()` function.

</details>

### Area of Triangles

Since any triangle can be viewed as half of a parallelogram, the **area of a triangle** is:

$$A = \frac{1}{2}bh$$

where $b$ is the base and $h$ is the height (perpendicular distance from the base to the opposite vertex).

#### MicroSim: Triangle Area Explorer

<details markdown="1">
<summary>Interactive exploration of triangle area formula</summary>

**Type:** MicroSim (p5.js)
**Status:** In progress

**Learning Objective:** Students will **apply** the triangle area formula to various triangles and **analyze** how changing the base or height affects the area. (Bloom's Taxonomy: Applying, Analyzing)

**Specification:**

Create an interactive p5.js simulation for exploring triangle area.
Students will use horizontal sliders to control the base length and the height of the triangle.

**Canvas:** 500px height with responsive width

**Main Display:**
- Draw a scalable triangle with adjustable base and height
- Base lies on horizontal line near middle of canvas (y = 300)
- Vertex adjustable vertically to change height
- Fill triangle with semi-transparent blue (#2196F3, 40% opacity)
- Outline in dark blue (#0D47A1, 3px stroke)

**Height Visualization:**
- Draw dashed red line from vertex perpendicular to base
- Label height value next to the line

**Measurements Display (upper left):**
- Box with light gray background (#F5F5F5)
- Display: "Base: [value] units" (16pt, black)
- Display: "Height: [value] units" (16pt, black)
- Display: "Area: [calculated] square units" (18pt bold, blue)

**Controls (bottom panel, y = 550):**
- Slider: "Base Length" (5 - 30 units), position (50, 560), width 280px
- Slider: "Height" (3 - 25 units), position (400, 560), width 280px
- Button: "Reset to Default" at (350, 600)
- Display current formula: $A = \frac{1}{2}bh$ (centered, below controls)

**Interactive Features:**
- Real-time area calculation as sliders move
- Smooth animation when adjusting dimensions
- Highlight formula components as corresponding sliders move

**Color Scheme:**
- Background of drawing area: aliceblue
- Triangle fill: Blue (#2196F3, 40% opacity)
- Triangle outline: Dark blue (#0D47A1)
- Height line: Red dashed
- Sliders: Blue thumbs
- Text: Black for labels, blue for calculated area

</details>

### Area of Regular Polygons

A **regular polygon** has all sides congruent and all angles congruent. To find the area of a regular polygon, we can divide it into congruent triangles from the center.

The **area of a regular polygon** is:

$$A = \frac{1}{2}aP$$

where $a$ is the **apothem** (perpendicular distance from center to any side) and $P$ is the **perimeter**.

Alternatively:

$$A = \frac{1}{2}a(ns)$$

where $n$ is the number of sides and $s$ is the side length.

#### MicroSim: Regular Polygon Area Explorer

<details markdown="1">
<summary>Interactive exploration of regular polygon areas</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **apply** the regular polygon area formula to polygons with different numbers of sides, and **analyze** how the apothem, perimeter, and number of sides affect the total area. (Bloom's Taxonomy: Applying, Analyzing)

**Specification:**

Create an interactive p5.js simulation for exploring regular polygon areas.

**Canvas:** 900px × 700px, background: white

**Main Display (left panel, x = 0-550):**
- Draw regular polygon centered at (275, 300)
- Polygon size adjustable (radius from center to vertex: 100-200px)
- Fill polygon with semi-transparent color that changes by number of sides
- Outline in dark color (3px stroke)

**Polygon Visualization:**
- Draw all sides in bold outline
- Draw apothem from center perpendicular to one side (red dashed line, 2px)
- Draw radius from center to vertex (blue solid line, 2px)
- Label apothem: "a = [value] units" in red
- Label radius: "r = [value] units" in blue
- Shade one triangle from center (to show subdivision)
- Show all triangular subdivisions faintly

**Measurements Display (upper right, x = 580-880):**
- Box with light blue background (#E3F2FD)
- Title: "Polygon Properties" (bold, 18pt)
- Display (16pt):
  - Number of sides (n): [value]
  - Polygon name: [Triangle, Square, Pentagon, Hexagon, Heptagon, Octagon]
  - Side length (s): [calculated] units
  - Apothem (a): [value] units
  - Perimeter (P): [n × s] units
  - Area: [calculated] square units (bold, blue, 20pt)

**Formula Box (middle right, x = 580-880):**
- Light yellow background (#FFF9C4)
- Title: "Area Formula" (bold, 18pt)
- Show (16pt):
  - $A = \frac{1}{2}aP$
  - $A = \frac{1}{2}a(ns)$
  - Substitution with current values
  - Final calculation

**Controls (bottom panel, y = 600-680):**
- Slider: "Number of Sides (n)" (3-12, default 6, step 1)
  - Position: (50, 620), width: 400px
  - Display current n and polygon name below slider
- Slider: "Polygon Size" (100-200, default 150, step 10)
  - Position: (50, 660), width: 400px
  - Label: "Radius from center"
- Button: "Show Triangle Subdivision" (toggle) at (500, 620)
- Button: "Rotate Polygon" (animate rotation) at (500, 660)

**Interactive Features:**
- Real-time area calculation as sliders move
- Smooth polygon transformation when changing number of sides
- Color changes with number of sides:
  - Triangle: Red theme
  - Square: Orange theme
  - Pentagon: Yellow theme
  - Hexagon: Green theme
  - Heptagon: Cyan theme
  - Octagon: Blue theme
  - 9+: Purple theme
- Highlight one triangular section to show subdivision method
- Optional rotation animation

**Educational Notes Panel (bottom right):**
- Collapsible info box
- Note: "As n increases, the polygon approaches a circle!"
- Show comparison: "A regular 12-gon with radius r has area ≈ $0.866\pi r^2$, very close to a circle's $\pi r^2$"

**Color Scheme:**
- Background: White
- Polygon fills: Theme colors (semi-transparent, 40% opacity)
- Polygon outlines: Dark versions of theme colors
- Apothem: Red dashed
- Radius: Blue solid
- UI backgrounds: Light blue, yellow, white
- Text: Black for labels, blue for calculated area

</details>

---

## Part 2: Circles

### Circle Measurements

A **circle** is the set of all points in a plane equidistant from a center point. Two fundamental measurements for circles are:

- **Circumference** ($C$): The distance around the circle
- **Area** ($A$): The space enclosed by the circle

Both formulas involve the special constant **pi** ($\pi \approx 3.14159...$), which represents the ratio of any circle's circumference to its diameter.

**Circumference formulas:**

$$C = \pi d = 2\pi r$$

where $d$ is diameter and $r$ is radius.

**Area formula:**

$$A = \pi r^2$$

#### Diagram: Comparing Perimeter and Circumference

<details markdown="1">
<summary>Visual comparison of polygon perimeters approaching circle circumference</summary>

**Type:** Diagram

**Learning Objective:** Students will **understand** how regular polygon perimeters approach the circumference of a circle as the number of sides increases, and **analyze** this limiting relationship visually. (Bloom's Taxonomy: Understanding, Analyzing)

**Specification:**

Create a colorful diagram showing how polygons approximate circles.

**Layout:** 1000px wide × 600px tall

**Main Visualization (center):**
- Draw four overlapping shapes, all with same "radius" (150px from center)
- All centered at (500, 300)

**Shape 1: Regular Hexagon (n=6)**
- Outline: Red (#F44336), 3px stroke
- Fill: Semi-transparent red (20% opacity)
- Vertices marked with dots
- Label: "Hexagon (6 sides)"

**Shape 2: Regular Octagon (n=8)**
- Outline: Orange (#FF9800), 3px stroke
- Fill: Semi-transparent orange (15% opacity)
- Vertices marked with dots
- Label: "Octagon (8 sides)"

**Shape 3: Regular Dodecagon (n=12)**
- Outline: Green (#4CAF50), 3px stroke
- Fill: Semi-transparent green (10% opacity)
- Vertices marked with dots
- Label: "Dodecagon (12 sides)"

**Shape 4: Circle**
- Outline: Blue (#2196F3), 4px stroke
- Fill: Semi-transparent blue (5% opacity)
- Label: "Circle (∞ sides)"

**Radius Lines:**
- Draw one radius line from center through all shapes (gray dashed)
- Label: "r = 150 units"

**Measurement Table (right side, x = 750-980):**
- Box with light blue background (#E3F2FD)
- Title: "Perimeter Comparison" (bold, 20pt)
- Table (16pt):
  | Shape | n | Perimeter |
  |-------|---|-----------|
  | Hexagon | 6 | ~519 units |
  | Octagon | 8 | ~565 units |
  | Dodecagon | 12 | ~589 units |
  | Circle | ∞ | $2\pi r = 942$ units |

**Formula Box (left side, x = 20-230):**
- Light yellow background (#FFF9C4)
- Title: "Formulas" (bold, 18pt)
- Content (16pt):
  - Polygon: $P = ns$
  - Circle: $C = 2\pi r$
  - As $n \to \infty$, $P \to C$

**Insight Box (bottom, spanning width):**
- Light green background (#E8F5E9)
- Border: 2px solid green
- Text (16pt): "Key Insight: As the number of sides increases, the regular polygon's perimeter gets closer and closer to the circle's circumference. This relationship was used by ancient mathematicians to approximate the value of π!"

**Title (top):** "How Polygons Approximate Circles" (bold, 28pt, centered)

**Annotations:**
- Arrow pointing to gap between hexagon and circle: "Large gap"
- Arrow pointing to gap between dodecagon and circle: "Small gap"
- Note: "More sides → Better approximation"

**Color Legend (bottom left):**
- Small boxes showing each color
- Labels for each shape type

</details>

#### Diagram: Circle Anatomy and Formulas

<details markdown="1">
<summary>Visual guide to circle measurements</summary>

**Type:** Diagram

**Learning Objective:** Students will **understand** the relationship between radius, diameter, circumference, and area of a circle, and **remember** the formulas for circumference and area. (Bloom's Taxonomy: Understanding, Remembering)

**Specification:**

Create a colorful diagram showing circle components and formulas.

**Layout:** Single panel 700px wide × 500px tall

**Main Circle:**
- Background: Light blue gradient (#E3F2FD to #BBDEFB)
- Draw large circle (radius 150px) centered at (300, 250)
- Circle outline: Navy blue (#0D47A1, 4px stroke)
- Circle fill: Semi-transparent cyan (#4DD0E1, 25% opacity)

**Circle Components:**
- Draw radius from center to right edge (thick red line, 3px)
- Label: "radius (r)" in red, positioned along the line
- Draw diameter from left to right through center (thick green line, 3px, dashed)
- Label: "diameter (d)" in green, positioned above the line
- Mark center with solid navy dot (8px diameter)
- Label: "Center" in navy

**Circumference Visualization:**
- Draw arc arrows around circle perimeter (orange, 3px)
- Label: "Circumference (C)" in orange, positioned outside circle at top

**Formula Box (right side, x = 520):**
- Light yellow background (#FFF9C4) with border
- Title: "Circle Formulas" (bold, 20pt)
- List formulas (18pt):
  - $C = \pi d$ (orange text)
  - $C = 2\pi r$ (orange text)
  - $A = \pi r^2$ (blue text)
  - $d = 2r$ (green text)

**Pi Symbol Box (bottom left):**
- Light purple background (#F3E5F5)
- Large pi symbol: $\pi$ (36pt, purple)
- Text: "$\pi \approx 3.14159...$" (14pt)

</details>

#### MicroSim: Circle Area and Circumference Calculator

<details markdown="1">
<summary>Interactive circle measurement tool</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **apply** circle formulas to calculate circumference and area for circles of varying sizes, and **analyze** how radius changes affect these measurements. (Bloom's Taxonomy: Applying, Analyzing)

**Specification:**

Create an interactive p5.js simulation for calculating circle measurements.

**Canvas:** 800px × 700px, background: white

**Main Display:**
- Draw circle with adjustable radius centered at (400, 300)
- Circle outline: Blue (#1976D2, 3px stroke)
- Circle fill: Semi-transparent blue (#64B5F6, 20% opacity)

**Visual Measurements:**
- Draw radius line from center to edge (red, 2px, with arrowhead)
- Label: "r = [value] cm" in red
- Draw diameter line across circle (green dashed, 2px)
- Label: "d = [value] cm" in green

**Results Display (upper right, x = 580):**
- Box with light blue background (#E3F2FD), rounded corners
- Title: "Measurements" (bold, 18pt)
- Display (16pt):
  - Radius: [value] cm
  - Diameter: [value] cm (calculated as 2r)
  - Circumference: [value] cm (calculated, 2 decimals)
  - Area: [value] cm² (calculated, 2 decimals)

**Formulas Display (upper left, x = 20):**
- Box with light yellow background (#FFF9C4)
- Title: "Formulas" (bold, 18pt)
- Show (16pt):
  - $C = 2\pi r$
  - $A = \pi r^2$

**Controls (bottom panel, y = 580):**
- Slider: "Radius" (2 - 20 cm), position (100, 600), width 400px
- Number display next to slider: "[value] cm"
- Button: "Reset to r = 10" at (550, 600)
- Buttons for common values: "r = 5", "r = 10", "r = 15" (at y = 650)

**Interactive Features:**
- Real-time calculation as slider moves
- Highlight radius line when slider is being adjusted
- Show pi symbol ($\pi$) prominently in formulas
- Smooth circle scaling animation

**Color Scheme:**
- Circle: Blue (#1976D2) outline, light blue fill
- Radius: Red
- Diameter: Green dashed
- Background: White
- UI elements: Material Design blue palette

</details>

---

## Part 3: Three-Dimensional Solids

### Introduction to 3D Geometry

Moving from two dimensions to three dimensions opens up a whole new world of geometric exploration. **Three-dimensional solids** have length, width, and height. Understanding these solids is essential for fields ranging from architecture to engineering to product design.

### Types of Solids

A **polyhedron** is a solid bounded by polygons called **faces**. The intersection of two faces is called an **edge**, and the intersection of three or more faces is called a **vertex**.

Common polyhedra include:

- **Prism**: A polyhedron with two parallel, congruent bases connected by rectangular lateral faces
- **Pyramid**: A polyhedron with one base and triangular lateral faces that meet at a point called the apex

Other important three-dimensional solids include:

- **Cylinder**: A solid with two parallel, congruent circular bases
- **Cone**: A solid with one circular base and a curved surface that tapers to a point (apex)
- **Sphere**: The set of all points in space equidistant from a center point

#### Diagram: Three-Dimensional Solids Gallery

<details markdown="1">
<summary>Visual catalog of common 3D solids</summary>

**Type:** Diagram

**Learning Objective:** Students will **remember** the names and visual characteristics of common three-dimensional solids and **understand** the distinction between polyhedra and non-polyhedra. (Bloom's Taxonomy: Remembering, Understanding)

**Specification:**

Create a colorful diagram showing seven common 3D solids in a gallery format.

**Layout:** Two rows, total dimensions 900px wide × 700px tall

**Row 1: Polyhedra (y = 0-320)**

**Solid 1: Rectangular Prism (x = 50)**
- Background: Light blue (#E3F2FD)
- Draw 3D rectangular prism in isometric view
- Visible faces: Top (light yellow), front (light green), right side (light orange)
- Edges: Dark gray (2px)
- Dimensions shown: length, width, height
- Label below: "Rectangular Prism" (bold, 16pt)
- Sublabel: "Polyhedron" (12pt, gray)

**Solid 2: Triangular Prism (x = 250)**
- Background: Light green (#E8F5E9)
- Draw 3D triangular prism in isometric view
- Triangle base visible at front
- Visible faces colored differently (light blue, light yellow, light pink)
- Edges: Dark gray (2px)
- Label below: "Triangular Prism" (bold, 16pt)
- Sublabel: "Polyhedron" (12pt, gray)

**Solid 3: Square Pyramid (x = 450)**
- Background: Light yellow (#FFF9C4)
- Draw 3D square pyramid in isometric view
- Square base at bottom, apex at top
- Visible faces: Front (light orange), right (light pink), base (light blue)
- Edges: Dark gray (2px)
- Label below: "Square Pyramid" (bold, 16pt)
- Sublabel: "Polyhedron" (12pt, gray)

**Solid 4: Cube (x = 650)**
- Background: Light purple (#F3E5F5)
- Draw 3D cube in isometric view
- Three visible faces colored differently (light blue, light green, light yellow)
- Edges: Dark gray (2px)
- All edges equal (mark with tick marks)
- Label below: "Cube" (bold, 16pt)
- Sublabel: "Polyhedron" (12pt, gray)

**Row 2: Curved Solids (y = 380-700)**

**Solid 5: Cylinder (x = 150)**
- Background: Light cyan (#E0F7FA)
- Draw 3D cylinder in oblique view
- Top circular base (light blue with border)
- Curved surface (light green gradient)
- Bottom base partially visible
- Height line marked with "h"
- Radius marked with "r"
- Label below: "Cylinder" (bold, 16pt)
- Sublabel: "Not a polyhedron" (12pt, gray)

**Solid 6: Cone (x = 400)**
- Background: Light orange (#FFF3E0)
- Draw 3D cone in oblique view
- Circular base at bottom (light yellow with border)
- Curved surface (light orange gradient) tapering to apex
- Height line from apex to base center (dashed, red)
- Radius marked with "r"
- Label below: "Cone" (bold, 16pt)
- Sublabel: "Not a polyhedron" (12pt, gray)

**Solid 7: Sphere (x = 650)**
- Background: Light pink (#FCE4EC)
- Draw 3D sphere with shading
- Gradient from light pink (left) to darker pink (right) for 3D effect
- Great circle shown as dashed line (equator)
- Radius line from center to surface (red)
- Label radius with "r"
- Label below: "Sphere" (bold, 16pt)
- Sublabel: "Not a polyhedron" (12pt, gray)

**Title above all:** "Common Three-Dimensional Solids" (bold, 28pt, centered)

</details>

### Nets of Solids

A **net** is a two-dimensional pattern that can be folded to form a three-dimensional solid. Nets are useful for understanding surface area and for constructing physical models.

#### MicroSim: Net to Solid Explorer

<details markdown="1">
<summary>Interactive exploration of 3D solid nets</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **understand** the relationship between 2D nets and 3D solids by **analyzing** how nets fold into various polyhedra. (Bloom's Taxonomy: Understanding, Analyzing)

**Specification:**

Create an interactive p5.js simulation showing nets and their corresponding 3D solids.

**Canvas:** 900px × 650px, background: light gray (#FAFAFA)

**Layout:** Two panels side by side

**Left Panel (Net Display, x = 0-420):**
- Background: White
- Draw unfolded net of selected solid
- Use different colors for different faces
- Show fold lines as dashed lines (gray)
- Label faces (Base, Lateral Face 1, etc.)

**Right Panel (3D Solid Display, x = 480-900):**
- Background: White with subtle grid
- Draw corresponding 3D solid in isometric view
- Color faces to match net
- Smooth rotation animation (optional: user can enable/disable)

**Solid Selection (top, y = 20):**
- Dropdown menu or buttons to select solid type:
  - Cube
  - Rectangular Prism
  - Triangular Prism
  - Square Pyramid
  - Triangular Pyramid
- Currently selected solid highlighted

**Animation Controls (bottom panel, y = 570):**
- Button: "Fold Net" (animates folding from net to solid)
- Button: "Unfold Solid" (animates unfolding from solid to net)
- Checkbox: "Auto-rotate 3D view"
- Slider: "Animation Speed" (slow to fast)

**Info Display (bottom left):**
- Box with light blue background
- Show number of faces, edges, vertices
- Show Euler's formula: $V - E + F = 2$

**Interactive Features:**
- Click faces on net to highlight corresponding faces on 3D solid
- Smooth animation when folding/unfolding
- Color-coded matching between net and solid
- Optional: Allow user to drag net pieces to attempt assembly

**Color Scheme:**
- Each face gets distinct pastel color (blues, greens, yellows, pinks)
- Matching colors between net and 3D solid
- Fold lines: Gray dashed
- Edges on 3D solid: Dark gray
- Background: Light gray (#FAFAFA) with white panels

</details>

---

## Part 4: Surface Area

### Understanding Surface Area

**Surface area** is the total area of all faces of a three-dimensional solid. Think of it as the amount of material needed to cover the outside of the solid.

For polyhedra, we find surface area by calculating the area of each face and adding them together. Often, we separate the calculation into:

- **Base area**: The area of the base(s)
- **Lateral surface area**: The area of the sides (excluding bases)

Then: $\text{Total Surface Area} = \text{Base Area(s)} + \text{Lateral Surface Area}$

### Surface Area Formulas

**Rectangular Prism:**
$$SA = 2lw + 2lh + 2wh$$

Or equivalently:
$$SA = 2(lw + lh + wh)$$

**Cylinder:**
$$SA = 2\pi r^2 + 2\pi rh = 2\pi r(r + h)$$

**Square Pyramid:**
$$SA = B + \frac{1}{2}Pl$$

where $B$ is base area, $P$ is base perimeter, and $l$ is slant height.

**Cone:**
$$SA = \pi r^2 + \pi rl$$

where $r$ is radius and $l$ is slant height.

**Sphere:**
$$SA = 4\pi r^2$$

#### Diagram: Surface Area Formulas Reference

<details markdown="1">
<summary>Visual reference for surface area calculations</summary>

**Type:** Diagram

**Learning Objective:** Students will **remember** surface area formulas for common solids and **understand** how these formulas account for all exterior surfaces. (Bloom's Taxonomy: Remembering, Understanding)

**Specification:**

Create a colorful reference sheet for surface area formulas.

**Layout:** 5 solids arranged in grid, 900px wide × 800px tall

**Grid Structure:** 2 rows (3 items in row 1, 2 items in row 2)

**For each solid:**
- Labeled 3D diagram (isometric view)
- Important dimensions marked and labeled
- Formula displayed prominently below
- Color-coded components matching diagram

**Row 1:**

**Item 1: Rectangular Prism**
- Position: (0, 0), size: 280px × 350px
- Background: Light blue (#E3F2FD)
- Draw prism with dimensions l, w, h clearly marked
- Show three visible faces in different colors
- Formula box (yellow background):
  - $SA = 2lw + 2lh + 2wh$
  - Alternative: $SA = 2(lw + lh + wh)$
- Label: "Rectangular Prism" (bold, 18pt)

**Item 2: Cylinder**
- Position: (300, 0), size: 280px × 350px
- Background: Light green (#E8F5E9)
- Draw cylinder with radius r and height h marked
- Show two circular bases (light blue) and curved surface (light green)
- Annotations: "2 bases" pointing to circles, "lateral surface" pointing to curved part
- Formula box (yellow background):
  - $SA = 2\pi r^2 + 2\pi rh$
  - Alternative: $SA = 2\pi r(r + h)$
- Label: "Cylinder" (bold, 18pt)

**Item 3: Cube**
- Position: (600, 0), size: 280px × 350px
- Background: Light purple (#F3E5F5)
- Draw cube with side s marked
- Show three visible faces in different shades of purple
- Note: "6 congruent faces"
- Formula box (yellow background):
  - $SA = 6s^2$
- Label: "Cube" (bold, 18pt)

**Row 2:**

**Item 4: Square Pyramid**
- Position: (150, 430), size: 280px × 350px
- Background: Light orange (#FFF3E0)
- Draw pyramid with square base (side s) and slant height l marked
- Show base (light blue) and triangular faces (light orange)
- Annotations: "base", "4 triangular faces"
- Formula box (yellow background):
  - $SA = s^2 + 4(\frac{1}{2}sl)$
  - Simplified: $SA = s^2 + 2sl$
  - General: $SA = B + \frac{1}{2}Pl$
- Label: "Square Pyramid" (bold, 18pt)

**Item 5: Cone**
- Position: (450, 430), size: 280px × 350px
- Background: Light cyan (#E0F7FA)
- Draw cone with radius r and slant height l marked
- Show circular base (light blue) and curved surface (light cyan)
- Annotations: "base", "lateral surface"
- Formula box (yellow background):
  - $SA = \pi r^2 + \pi rl$
  - Alternative: $SA = \pi r(r + l)$
- Label: "Cone" (bold, 18pt)

**Title (top center):** "Surface Area Formulas" (bold, 32pt)

**Note at bottom:** "Remember: Surface area is measured in square units (cm², m², etc.)" (14pt, gray)

</details>

#### MicroSim: Surface Area Calculator

<details markdown="1">
<summary>Interactive surface area calculation tool</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **apply** surface area formulas to calculate the total surface area of various 3D solids and **analyze** how dimension changes affect surface area. (Bloom's Taxonomy: Applying, Analyzing)

**Specification:**

Create an interactive p5.js simulation for calculating surface areas.

**Canvas:** 900px × 750px, background: white

**Layout:** Three sections

**Section 1: Solid Selection (top, y = 0-100):**
- Background: Light gray (#F5F5F5)
- Buttons to select solid type (arranged horizontally):
  - Rectangular Prism
  - Cube
  - Cylinder
  - Square Pyramid
  - Cone
  - Sphere
- Currently selected button highlighted (blue background)

**Section 2: Visualization (left panel, x = 0-500, y = 120-550):**
- White background
- Draw selected 3D solid in isometric view (centered)
- Label all relevant dimensions on the diagram
- Color faces differently for clarity
- Show dimension values next to labels

**Section 3: Controls and Results (right panel, x = 520-900, y = 120-550):**

**Dimension Controls:**
- Sliders for each dimension based on selected solid:
  - Rectangular Prism: length (5-20), width (5-20), height (5-20)
  - Cube: side (5-20)
  - Cylinder: radius (3-15), height (5-25)
  - Pyramid: base side (5-20), slant height (5-25)
  - Cone: radius (3-15), slant height (5-25)
  - Sphere: radius (3-20)
- Each slider shows current value in real-time

**Formula Display:**
- Box with light blue background (#E3F2FD)
- Title: "Formula" (bold, 16pt)
- Show applicable formula with symbols (18pt)
- Highlight which variables correspond to current sliders

**Calculation Breakdown:**
- Box with light yellow background (#FFF9C4)
- Title: "Calculation Steps" (bold, 16pt)
- Show step-by-step substitution (14pt):
  - Original formula
  - Substituted values
  - Intermediate calculations
  - Final result

**Result Display:**
- Large box with light green background (#E8F5E9)
- Title: "Surface Area" (bold, 18pt)
- Show final answer (bold, 24pt, blue):
  - "[value] square units"
  - Or "[value] cm²" if specific units chosen

**Bottom Controls (y = 580-730):**
- Button: "Reset to Default" (reset all dimensions)
- Dropdown: "Unit System" (choose units or dimensionless)
- Checkbox: "Show work" (toggle calculation breakdown)
- Checkbox: "Use π ≈ 3.14" vs "Show exact π form"

**Interactive Features:**
- Real-time recalculation as sliders move
- Smooth visual updates to 3D diagram
- Highlight formula variables as corresponding sliders are adjusted
- Option to compare two solids side-by-side (advanced feature)

**Color Scheme:**
- UI backgrounds: Grays and pastels
- Selected solid: Blue theme (#2196F3)
- Formula box: Light blue
- Calculation box: Light yellow
- Result box: Light green
- 3D solid faces: Various pastels for distinction

</details>

---

## Part 5: Volume

### Understanding Volume

**Volume** measures the amount of three-dimensional space inside a solid. We measure volume in cubic units such as cubic centimeters ($\text{cm}^3$), cubic meters ($\text{m}^3$), or cubic feet ($\text{ft}^3$).

The concept of volume begins with the simple formula for a **rectangular prism**:

$$V = lwh$$

This formula tells us that volume equals length × width × height, or equivalently, base area × height.

### Volume Formulas

**Prism (any base):**
$$V = Bh$$

where $B$ is the area of the base and $h$ is the height.

**Cylinder:**
$$V = \pi r^2h$$

(This is the same as $V = Bh$ where the base is a circle with area $\pi r^2$)

**Pyramid (any base):**
$$V = \frac{1}{3}Bh$$

where $B$ is the area of the base and $h$ is the height.

**Cone:**
$$V = \frac{1}{3}\pi r^2h$$

(This is the same as $V = \frac{1}{3}Bh$ where the base is a circle)

**Sphere:**
$$V = \frac{4}{3}\pi r^3$$

### Cavalieri's Principle

**Cavalieri's Principle** states that if two solids have the same height and the same cross-sectional area at every level, then they have the same volume.

This principle helps us understand why an oblique prism (tilted) has the same volume as a right prism with the same base and height—think of a stack of coins that can be pushed into a slanted position without changing the total volume.

A **cross-section** is the 2D shape formed when a plane intersects a 3D solid. Understanding cross-sections helps visualize how solids are constructed and why volume formulas work.

#### MicroSim: Cross-Section Explorer

<details markdown="1">
<summary>Interactive exploration of 3D solid cross-sections</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **analyze** how different planes intersect 3D solids to create various cross-sections, and **evaluate** how cross-sectional area changes at different heights to understand Cavalieri's Principle. (Bloom's Taxonomy: Analyzing, Evaluating)

**Specification:**

Create an interactive p5.js simulation showing cross-sections of 3D solids.

**Canvas:** 1000px × 750px, background: light gray (#FAFAFA)

**Layout:** Side-by-side comparison with cutting plane

**Top Control Bar (y = 0-80):**
- Background: Dark blue (#1565C0), text: white
- Title: "Cross-Section Explorer" (24pt, bold)
- Subtitle: "See inside 3D solids!" (16pt)

**Solid Selection (y = 100-150):**
- Buttons to select solid (arranged horizontally, centered):
  - Rectangular Prism
  - Cylinder
  - Cone
  - Sphere
  - Square Pyramid
  - Triangular Prism
- Selected button highlighted (blue background, white text)
- Unselected buttons (white background, blue text)

**Main Display Area (y = 170-550):**

**Left Panel: 3D View with Cutting Plane (x = 20-480)**
- White background
- Draw selected 3D solid in isometric view
- Solid semi-transparent to see through
- Horizontal cutting plane shown as semi-transparent orange rectangle
- Cutting plane position adjustable with slider
- Cross-section boundary highlighted in red (4px)
- Below/above plane: Different opacity to show what's cut

**Right Panel: Cross-Section Shape (x = 520-980)**
- White background with grid
- Draw the 2D cross-section shape (top view)
- Fill with light blue (#64B5F6)
- Outline in dark blue (#0D47A1, 3px)
- Show dimensions on the shape
- Label the shape type (e.g., "Rectangle", "Circle", "Triangle")

**Height Control (y = 570-630):**
- Large slider: "Cutting Plane Height" (0% to 100% of solid height)
  - Position: (50, 590), width: 600px
  - Real-time updates as slider moves
- Display: "Height: [value] units ([percentage]% from bottom)" (18pt)
- Visual indicator showing position on 3D solid

**Cross-Section Information Panel (y = 650-730):**
- Box with light yellow background (#FFF9C4)
- Two columns:

**Left Column (x = 50-480):**
- Title: "Cross-Section Properties" (bold, 18pt)
- Display (16pt):
  - Shape type: [name]
  - Dimensions: [measurements]
  - Cross-sectional area: [calculated] sq units (bold, blue, 20pt)
  - Perimeter: [calculated] units

**Right Column (x = 520-950):**
- Title: "Cavalieri's Principle Demo" (bold, 18pt)
- Checkbox: "Compare with Oblique Solid"
- When checked, show second solid (tilted) with same cross-sections
- Display: "Both solids have equal volumes!" (green text)
- Show volume calculation for both

**Special Features by Solid Type:**

**Rectangular Prism:**
- Cross-section is always a rectangle
- Show how area stays constant (demonstrates Cavalieri)
- Dimensions labeled

**Cylinder:**
- Cross-section is always a circle
- Show radius stays constant
- Area formula: $A = \pi r^2$ displayed

**Cone:**
- Cross-section is a circle
- Show radius decreases linearly with height
- Graph showing how area changes: $A = \pi r^2(1 - h/H)^2$

**Sphere:**
- Cross-section is a circle
- Show radius changes (largest at equator)
- Graph showing area: $A = \pi(R^2 - h^2)$

**Pyramid:**
- Cross-section is a square (for square pyramid)
- Show side length decreases linearly
- Area decreases quadratically

**Triangular Prism:**
- Cross-section is a triangle
- Show shape stays constant

**Interactive Features:**
- Smooth animation as slider moves
- Real-time cross-section shape updates
- 3D solid rotates slightly to show depth (optional toggle)
- Highlight cross-section boundary in 3D view
- Show "slicing" animation when slider first moves

**Educational Insights:**
- Pop-up when comparing prism/oblique: "Notice: Same cross-sections at every height = same volume!"
- For sphere: "The cross-section area follows the Pythagorean theorem!"
- For cone: "Area decreases quadratically, that's why volume has $\frac{1}{3}$ factor!"

**Preset Positions:**
- Buttons for quick navigation:
  - "Bottom (0%)"
  - "Quarter (25%)"
  - "Middle (50%)"
  - "Three-quarters (75%)"
  - "Top (100%)"

**Graph Display (optional toggle):**
- Small graph showing cross-sectional area vs. height
- X-axis: Height (0 to H)
- Y-axis: Cross-sectional area
- Plot the area function
- Mark current position with red dot

**Color Scheme:**
- Background: Light gray (#FAFAFA)
- 3D solid: Semi-transparent blue (#2196F3, 40% opacity)
- Cutting plane: Semi-transparent orange (#FF9800, 30% opacity)
- Cross-section outline in 3D: Red (#F44336, 4px)
- Cross-section 2D view: Light blue fill (#64B5F6)
- Panel backgrounds: White
- Info boxes: Light yellow (#FFF9C4)
- Text: Black for labels, blue for measurements

</details>

#### MicroSim: Cavalieri's Principle Demonstration

<details markdown="1">
<summary>Interactive demonstration of Cavalieri's Principle</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **understand** Cavalieri's Principle by comparing right and oblique solids with identical cross-sections, and **evaluate** why they have equal volumes despite different appearances. (Bloom's Taxonomy: Understanding, Evaluating)

**Specification:**

Create an interactive p5.js simulation demonstrating Cavalieri's Principle.

**Canvas:** 1000px × 700px, background: white

**Title Bar (y = 0-60):**
- Background: Purple gradient (#9C27B0 to #7B1FA2)
- Title: "Cavalieri's Principle: Why Shape Doesn't Matter!" (bold, 24pt, white)

**Main Display (y = 80-500):**

**Left Side: Right Prism (x = 50-450)**
- Background: Light blue (#E3F2FD)
- Label: "Right Prism" (20pt, bold)
- Draw rectangular prism standing straight (not tilted)
- Base: 120px × 80px
- Height: 300px
- Color: Blue theme with 3 visible faces in different shades
- Show horizontal cutting lines at multiple heights (5-6 levels)
- Each cross-section highlighted in yellow

**Right Side: Oblique Prism (x = 550-950)**
- Background: Light orange (#FFF3E0)
- Label: "Oblique (Tilted) Prism" (20pt, bold)
- Draw identical prism but tilted/slanted
- Same base dimensions: 120px × 80px
- Same height: 300px
- Color: Orange theme with 3 visible faces in different shades
- Show horizontal cutting lines at same heights
- Each cross-section highlighted in yellow

**Cross-Section Comparison (center, x = 460-540):**
- Vertical stripe between the two prisms
- Show cross-sections at same heights side-by-side
- Arrows connecting matching cross-sections
- Label: "Same area at every height!" (16pt, bold, green)

**Height Slider (y = 520-560):**
- Large slider: "Select Height Level" (0 to 100%, step 20%)
  - Position: (100, 540), width: 800px
- Current height marked on both prisms
- Cross-section at this height highlighted brightly

**Measurement Display (y = 580-680):**

**Left Column (x = 50-450):**
- Box with light blue background
- Title: "Right Prism Measurements" (bold, 18pt)
- Display (16pt):
  - Base dimensions: 12 × 8 units
  - Height: 30 units
  - Cross-section area at h=[value]: [calculated] sq units
  - Volume: $V = Bh = 2880$ cu units (bold, 20pt)

**Right Column (x = 550-950):**
- Box with light orange background
- Title: "Oblique Prism Measurements" (bold, 18pt)
- Display (16pt):
  - Base dimensions: 12 × 8 units
  - Height: 30 units (vertical)
  - Cross-section area at h=[value]: [calculated] sq units
  - Volume: $V = Bh = 2880$ cu units (bold, 20pt)

**Central Comparison Box (spanning bottom):**
- Light green background (#E8F5E9)
- Large checkmark icon (green)
- Text (18pt, bold): "Volumes are EQUAL!"
- Explanation (16pt): "Cavalieri's Principle: If two solids have the same height and equal cross-sectional areas at every level, they have equal volumes—regardless of their shape or slant."

**Interactive Features:**
- Slider moves cutting plane up and down both solids simultaneously
- Cross-sections always match at same height
- Highlight matching cross-sections with connecting animation
- Real-time area calculation at selected height
- Optional: "Tilt Angle" slider to adjust oblique prism's slant (0° to 45°)

**Animation Options:**
- Button: "Animate Scan" - automatically moves slider from bottom to top
- Button: "Show Stack of Coins Analogy"
  - Changes prisms to stacks of circular coins
  - Right stack: Straight
  - Left stack: Pushed slanted
  - Same coins = same volume!

**Educational Notes Panel (collapsible):**
- Button: "Why does this work?"
- When expanded, shows:
  - "Think of a stack of paper: whether straight or slanted, same number of sheets!"
  - "Volume = Base × Height works for ANY prism, right or oblique"
  - "This principle was discovered by Bonaventura Cavalieri in 1635"
  - "It works for curved solids too! (cylinders, cones, etc.)"

**Challenge Mode (advanced feature):**
- Button: "Show Different Solids"
- Options:
  - Right Cylinder vs Oblique Cylinder
  - Right Cone vs Oblique Cone
  - Sphere vs Cone with same cross-sections (special case)

**Color Scheme:**
- Right prism: Blue theme (#2196F3)
- Oblique prism: Orange theme (#FF9800)
- Cross-sections: Yellow highlight (#FFEB3B, 60% opacity)
- Backgrounds: Light blue, light orange, white
- Comparison area: Green (#4CAF50)
- Text: Black for labels, colored for measurements

</details>

#### Diagram: Volume Formulas Comparison

<details markdown="1">
<summary>Visual comparison of volume formulas and relationships</summary>

**Type:** Diagram

**Learning Objective:** Students will **understand** the relationships between volume formulas for different solids and **analyze** why pyramids and cones have volumes that are one-third of corresponding prisms and cylinders. (Bloom's Taxonomy: Understanding, Analyzing)

**Specification:**

Create a colorful diagram comparing prism/cylinder volumes with pyramid/cone volumes.

**Layout:** 2×2 grid, total 800px wide × 700px tall

**Grid Structure:**

**Top Row: Prisms and Cylinders (y = 0-320)**

**Cell 1: Rectangular Prism (x = 0-380)**
- Background: Light blue (#E3F2FD)
- Draw rectangular prism (isometric view)
- Dimensions labeled: l = 6, w = 4, h = 5
- Base outlined in red
- Formula displayed:
  - $V = lwh$
  - $V = (6)(4)(5) = 120$ cubic units
- Title: "Rectangular Prism" (bold, 18pt)

**Cell 2: Cylinder (x = 420-800)**
- Background: Light green (#E8F5E9)
- Draw cylinder
- Dimensions labeled: r = 3, h = 8
- Circular base outlined in red
- Formula displayed:
  - $V = \pi r^2h$
  - $V = \pi(3)^2(8) = 72\pi \approx 226.2$ cubic units
- Title: "Cylinder" (bold, 18pt)

**Middle Divider (y = 340):**
- Horizontal line with text: "Pyramids and Cones have $\frac{1}{3}$ the volume" (bold, 16pt, centered)
- Arrow pointing down

**Bottom Row: Pyramids and Cones (y = 380-700)**

**Cell 3: Rectangular Pyramid (x = 0-380)**
- Background: Light orange (#FFF3E0)
- Draw rectangular pyramid (same base dimensions as prism above)
- Base dimensions labeled: l = 6, w = 4, h = 5
- Base outlined in red
- Dashed outline of corresponding prism shown faintly in background
- Formula displayed:
  - $V = \frac{1}{3}lwh$
  - $V = \frac{1}{3}(6)(4)(5) = 40$ cubic units
- Note: "= $\frac{1}{3}$ of prism above" (red text)
- Title: "Rectangular Pyramid" (bold, 18pt)

**Cell 4: Cone (x = 420-800)**
- Background: Light yellow (#FFF9C4)
- Draw cone (same base and height as cylinder above)
- Dimensions labeled: r = 3, h = 8
- Circular base outlined in red
- Dashed outline of corresponding cylinder shown faintly in background
- Formula displayed:
  - $V = \frac{1}{3}\pi r^2h$
  - $V = \frac{1}{3}\pi(3)^2(8) = 24\pi \approx 75.4$ cubic units
- Note: "= $\frac{1}{3}$ of cylinder above" (red text)
- Title: "Cone" (bold, 18pt)

**Title (top):** "Volume Formulas: Prisms/Cylinders vs Pyramids/Cones" (bold, 24pt, centered)

**Insight Box (bottom):**
- Light purple background (#F3E5F5)
- Text (14pt): "Key Insight: A pyramid or cone with the same base and height as a prism or cylinder has exactly one-third the volume. This relationship can be proven using calculus or demonstrated experimentally by filling a pyramid three times to fill a prism."

</details>

#### MicroSim: Volume Explorer

<details markdown="1">
<summary>Interactive volume calculation and comparison tool</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **apply** volume formulas to various 3D solids, **analyze** how dimension changes affect volume, and **evaluate** volume relationships between related solids. (Bloom's Taxonomy: Applying, Analyzing, Evaluating)

**Specification:**

Create an interactive p5.js simulation for exploring volume.

**Canvas:** 1000px × 750px, background: light gray (#FAFAFA)

**Layout:** Two-panel design with comparison feature

**Top Control Bar (y = 0-80):**
- Background: Dark gray (#424242), text: white
- Title: "Volume Explorer" (24pt, bold)
- Mode toggle buttons:
  - "Single Solid" mode
  - "Compare Two Solids" mode
- Currently selected mode highlighted

**Main Display Area (y = 100-550):**

**Single Solid Mode:**
- One large visualization panel (centered)
- 3D solid displayed in isometric view
- Dimensions labeled on solid
- Rotation controls (optional user interaction)

**Compare Mode:**
- Two visualization panels side by side
- Left panel: Solid 1 (x = 50-450)
- Right panel: Solid 2 (x = 550-950)
- Comparison result displayed between panels

**Solid Selection (for each panel in compare mode, or single in single mode):**
- Dropdown menu to select solid type:
  - Rectangular Prism
  - Cube
  - Cylinder
  - Square Pyramid
  - Cone
  - Sphere

**Dimension Controls Panel (y = 570-750):**

Layout depends on mode:

**Single Solid Mode:**
- Sliders for dimensions (center-aligned)
- Real-time value displays
- Formula box showing applicable formula
- Calculation breakdown (optional toggle)
- Large volume result display

**Compare Mode:**
- Left column (x = 0-450): Controls for Solid 1
- Right column (x = 550-1000): Controls for Solid 2
- Center column (x = 450-550): Comparison results
  - "Solid 1 Volume: [value]"
  - "Solid 2 Volume: [value]"
  - "Ratio: [value]" (bold, blue if Solid 1 larger, red if Solid 2 larger)
  - "Difference: [value]"

**Interactive Features:**
- Real-time volume calculation
- Smooth visual updates
- Highlight dimensions being adjusted
- Show volume as filling animation (optional advanced feature)
- Preset comparison scenarios:
  - Button: "Prism vs Pyramid (same base & height)"
  - Button: "Cylinder vs Cone (same base & height)"
  - Button: "Cube vs Sphere (same 'size')"

**Special Features for Understanding:**
- Cavalieri's Principle demonstration option
- Visual representation of "1/3 relationship" for pyramid/cone vs prism/cylinder
- Cross-section viewer (show 2D slice at any height)

**Formulas Reference (collapsible panel):**
- Button to show/hide formula reference
- When visible, displays all volume formulas with diagrams

**Result Display Styling:**
- Volume results in large, bold text (24pt)
- Color-coded by solid type
- Option to display in exact form (e.g., "$24\pi$ cu. units") or decimal approximation

**Color Scheme:**
- Background: Light gray (#FAFAFA)
- Panel backgrounds: White
- Top bar: Dark gray (#424242)
- Solid 1: Blue theme (#2196F3)
- Solid 2: Orange theme (#FF9800)
- Formulas: Light yellow background (#FFF9C4)
- Results: Light green background (#E8F5E9)
- 3D solids: Pastel fills with darker outlines

**Educational Prompts:**
- When comparing prism/pyramid or cylinder/cone with same base and height, show pop-up:
  - "Notice: The pyramid/cone has exactly 1/3 the volume!"
- When adjusting sphere radius, show:
  - "Notice: Doubling the radius multiplies volume by 8 (since $2^3 = 8$)"

</details>

---

## Part 6: Applications and Problem-Solving

### Scale Drawings and Models

A **scale drawing** or **scale model** represents a real object with all dimensions proportionally reduced or enlarged by the same factor.

The **scale** is the ratio of a length in the drawing/model to the corresponding length in the actual object.

For example, a scale of $1:50$ means that 1 cm in the model represents 50 cm in the actual object.

**Important:**
- Lengths scale by the **scale factor** $k$
- Areas scale by $k^2$
- Volumes scale by $k^3$

If a model is made at $1:10$ scale, then areas are reduced by $(1/10)^2 = 1/100$, and volumes are reduced by $(1/10)^3 = 1/1000$.

#### MicroSim: Scale Model Builder

<details markdown="1">
<summary>Interactive scale model creation and analysis</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **apply** scale factor relationships to create accurate scale models, **analyze** how scale affects different measurements, and **create** solutions to real-world scaling problems. (Bloom's Taxonomy: Applying, Analyzing, Creating)

**Specification:**

Create an interactive p5.js simulation for understanding scale models.

**Canvas:** 1100px × 800px, background: light gray (#F5F5F5)

**Title Bar (y = 0-70):**
- Background: Teal gradient (#00897B to #00695C)
- Title: "Scale Model Builder" (28pt, bold, white)
- Subtitle: "Design miniature versions of real objects" (16pt, white)

**Main Display Area (y = 90-520):**

**Left Panel: Original Object (x = 50-520)**
- Background: Light blue (#E1F5FE)
- Title: "Original Object" (20pt, bold)
- Draw selected object in realistic proportions
- Dimensions clearly labeled
- Grid background for reference

**Right Panel: Scale Model (x = 580-1050)**
- Background: Light green (#E8F5E9)
- Title: "Scale Model" (20pt, bold)
- Draw same object scaled down
- Dimensions clearly labeled
- Same grid background (but scaled)
- Model shown at actual scaled size

**Object Selection (y = 100-140):**
- Dropdown menu: "Choose Object to Model"
- Options:
  - Classroom (10m × 8m × 3m)
  - Car (4.5m × 1.8m × 1.5m)
  - House (12m × 10m × 6m)
  - Bicycle (1.8m × 0.5m × 1.1m)
  - Basketball Court (28m × 15m)
  - Custom dimensions (user input)

**Scale Controls (y = 540-620):**

**Scale Factor Selection:**
- Slider: "Scale Factor" (1:5 to 1:100, logarithmic scale)
  - Position: (100, 560), width: 500px
  - Display: "1:[value]" (large, 24pt)
  - Common presets as click buttons:
    - 1:10
    - 1:20
    - 1:50
    - 1:100

**Measurements Comparison (y = 640-780):**

Three columns showing how measurements scale:

**Column 1: Linear (1D) - x = 50-350**
- Light blue background (#E3F2FD)
- Title: "Length Measurements" (bold, 18pt)
- Icon: Ruler
- Display (16pt):
  - Original length: [value] m
  - Scale factor: 1:[k]
  - Model length: [value/k] cm
  - Example: Width, height, circumference
- Formula shown: $\text{Model} = \frac{\text{Original}}{k}$

**Column 2: Area (2D) - x = 380-730**
- Light green background (#E8F5E9)
- Title: "Area Measurements" (bold, 18pt)
- Icon: Square
- Display (16pt):
  - Original area: [value] m²
  - Scale factor squared: $(1/k)^2$
  - Model area: [value/k²] cm²
  - Example: Floor area, wall surface
- Formula shown: $\text{Model} = \frac{\text{Original}}{k^2}$
- Visual comparison: Show how much smaller with color-filled squares

**Column 3: Volume (3D) - x = 760-1050**
- Light orange background (#FFF3E0)
- Title: "Volume Measurements" (bold, 18pt)
- Icon: Cube
- Display (16pt):
  - Original volume: [value] m³
  - Scale factor cubed: $(1/k)^3$
  - Model volume: [value/k³] cm³
  - Example: Interior space, material volume
- Formula shown: $\text{Model} = \frac{\text{Original}}{k^3}$
- Visual comparison: Show how much smaller with color-filled cubes

**Real-World Application Panel (collapsible, right side):**
- Button: "See Real Applications"
- When expanded:
  - Architecture: "1:50 scale common for building models"
  - Model trains: "HO scale = 1:87, N scale = 1:160"
  - Model cars: "1:18 (large), 1:24, 1:43, 1:64 (Hot Wheels)"
  - Maps: "1:25,000 (hiking), 1:100,000 (road maps)"
  - Model airplanes: "1:48, 1:72, 1:144 scales"

**Material Calculation (practical application):**
- Box at bottom showing:
  - "To build this model at 1:[k] scale:"
  - Material needed (cardboard/wood): [calculated area] cm²
  - Paint needed: [calculated area] cm² of coverage
  - Build time estimate: [scaled time]

**Interactive Features:**
- Real-time updates as scale slider moves
- Visual size comparison (overlay option)
- Grid scales appropriately on both sides
- Highlight corresponding dimensions when hovering
- "Zoom to fit" button for very small models
- Optional: Print template button (generates printable plans)

**Challenge Problems:**
- Button: "Try a Challenge!"
- Random problems like:
  - "A model car is 18 cm long. If the real car is 4.5 m, what's the scale?"
  - "At 1:20 scale, how much cardboard to make walls of classroom model?"
  - "A 1:50 model uses 200 cm² of material. How much for original?"
- Check answer button with feedback

**Conversion Helper:**
- Toggle between units: meters ↔ centimeters ↔ feet ↔ inches
- Automatic conversion as user selects

**Preset Scenarios:**
- Button: "Load Example"
- Examples:
  - "Dollhouse (1:12 scale)"
  - "Model Railroad (1:87 scale)"
  - "Architectural Model (1:50 scale)"
  - "Model Ship (1:200 scale)"

**Educational Insights:**
- Pop-up tips:
  - "Notice: Doubling all dimensions multiplies volume by 8!"
  - "A 1:10 model uses only 1/1000 the material!"
  - "Scale affects weight dramatically—that's why large animals need different proportions"

**Color Scheme:**
- Original object: Blue theme
- Scale model: Green theme
- Grid: Light gray (#E0E0E0)
- Measurements: Color-coded by dimension (blue=1D, green=2D, orange=3D)
- Buttons: Teal theme (#00897B)
- Background: Light gray (#F5F5F5)

</details>

#### Diagram: Scale Relationships

<details markdown="1">
<summary>Visual guide to how scale affects length, area, and volume</summary>

**Type:** Diagram

**Learning Objective:** Students will **understand** how scale factors affect length, area, and volume differently, and **analyze** these relationships through visual and numerical examples. (Bloom's Taxonomy: Understanding, Analyzing)

**Specification:**

Create a colorful diagram showing scale effects on 1D, 2D, and 3D measurements.

**Layout:** Three columns, 850px wide × 600px tall

**Column 1: Length (1D) - x = 0-270**
- Background: Light blue (#E3F2FD)
- Title: "Length (1D)" (bold, 20pt)

**Original:**
- Draw line segment (200px long, 4px thick, blue)
- Label: "10 units" below line

**Scaled (Scale factor = 1/2):**
- Draw line segment (100px long, 4px thick, red)
- Label: "5 units" below line
- Arrow with text: "× $\frac{1}{2}$"

**Formula box:**
- $\text{Scale factor} = k$
- $\text{New length} = k \times \text{original}$
- Example: $k = \frac{1}{2}$
- $5 = \frac{1}{2} \times 10$ ✓

**Column 2: Area (2D) - x = 290-560**
- Background: Light green (#E8F5E9)
- Title: "Area (2D)" (bold, 20pt)

**Original:**
- Draw square (160px × 160px, blue outline, light blue fill)
- Label: "10 × 10 = 100 sq units"

**Scaled (Scale factor = 1/2):**
- Draw square (80px × 80px, red outline, light red fill)
- Label: "5 × 5 = 25 sq units"
- Arrow with text: "× $(\frac{1}{2})^2 = \frac{1}{4}$"

**Formula box:**
- $\text{Scale factor} = k$
- $\text{New area} = k^2 \times \text{original}$
- Example: $k = \frac{1}{2}$
- $25 = (\frac{1}{2})^2 \times 100$ ✓

**Column 3: Volume (3D) - x = 580-850**
- Background: Light orange (#FFF3E0)
- Title: "Volume (3D)" (bold, 20pt)

**Original:**
- Draw cube in isometric view (appears as 10×10×10)
- Three visible faces in different blue shades
- Label: "10 × 10 × 10 = 1000 cu units"

**Scaled (Scale factor = 1/2):**
- Draw smaller cube (appears as 5×5×5)
- Three visible faces in different red shades
- Label: "5 × 5 × 5 = 125 cu units"
- Arrow with text: "× $(\frac{1}{2})^3 = \frac{1}{8}$"

**Formula box:**
- $\text{Scale factor} = k$
- $\text{New volume} = k^3 \times \text{original}$
- Example: $k = \frac{1}{2}$
- $125 = (\frac{1}{2})^3 \times 1000$ ✓

**Title (top center):** "How Scale Affects Measurements" (bold, 28pt)

**Summary Box (bottom, spanning all columns):**
- Light yellow background (#FFF9C4)
- Border: 2px solid orange
- Text (16pt): "Key Principle: When you scale by factor $k$:"
  - "Lengths multiply by $k$"
  - "Areas multiply by $k^2$"
  - "Volumes multiply by $k^3$"

</details>

### Optimization Problems

An **optimization problem** asks you to find the maximum or minimum value of some quantity while satisfying certain constraints.

Common geometric optimization problems include:
- Finding the dimensions that maximize volume for a given surface area
- Finding the dimensions that minimize surface area for a given volume
- Finding the most efficient packaging design

These problems often require:
1. Setting up equations based on constraints
2. Expressing the quantity to optimize as a function of one variable
3. Using algebraic or calculus techniques to find the optimal value

#### MicroSim: Optimization Challenge - Maximum Volume Box

<details markdown="1">
<summary>Interactive optimization problem solver</summary>

**Type:** MicroSim (p5.js)

**Learning Objective:** Students will **analyze** how dimension changes affect volume under constraints, **evaluate** different approaches to optimization, and **create** solutions to maximize volume. (Bloom's Taxonomy: Analyzing, Evaluating, Creating)

**Specification:**

Create an interactive p5.js simulation for exploring a classic optimization problem.

**Canvas:** 1000px × 800px, background: white

**Problem Setup (top panel, y = 0-150):**
- Background: Light blue (#E3F2FD)
- Title: "Optimization Challenge: Maximum Volume Box" (bold, 24pt)
- Problem statement (16pt):
  - "You have a square sheet of cardboard (30 cm × 30 cm)."
  - "Cut equal squares from each corner and fold up the sides to make an open box."
  - "What size cuts will produce the box with maximum volume?"

**Visual Display (left panel, x = 0-550, y = 170-600):**

**Flat Pattern View (top half):**
- Draw square cardboard sheet (400px × 400px)
- Show four corner squares cut out (shaded in red)
- Label sheet dimensions: "30 cm"
- Label cut size: "x cm" (adjustable via slider)
- Show fold lines (dashed blue)
- Remaining dimensions labeled: "(30 - 2x) cm"

**3D Box View (bottom half):**
- Draw resulting box in isometric view after folding
- Dimensions labeled:
  - Base: "(30 - 2x) × (30 - 2x) cm"
  - Height: "x cm"
- Box filled with semi-transparent blue
- Volume calculation visible on box face

**Controls and Analysis (right panel, x = 570-1000, y = 170-800):**

**Cut Size Control:**
- Slider: "Cut size (x)" (0 - 15 cm), position (600, 200)
- Large current value display: "x = [value] cm" (20pt, bold)
- Constraint warning if x > 15: "Invalid! (x must be less than 15 cm)"

**Calculated Dimensions:**
- Box with light gray background (#F5F5F5)
- Display (16pt):
  - "Base length: [30-2x] cm"
  - "Base width: [30-2x] cm"
  - "Height: [x] cm"

**Volume Calculation:**
- Box with light yellow background (#FFF9C4)
- Title: "Volume Calculation" (bold, 18pt)
- Show work (16pt):
  - $V = l \times w \times h$
  - $V = (30-2x)(30-2x)(x)$
  - $V = [calculated]$ cm³
- Current volume in large bold text (24pt, blue)

**Graph Display:**
- Plot of volume vs. cut size
- X-axis: Cut size (0 to 15 cm)
- Y-axis: Volume (0 to max + margin)
- Curve: Volume function (blue line, 3px)
- Current point marked (red dot, 8px)
- Maximum point marked (green dot, 10px) with label
- Grid background (light gray)

**Optimization Analysis:**
- Box with light green background (#E8F5E9)
- Display:
  - "Current volume: [value] cm³"
  - "Maximum volume: [max value] cm³"
  - "Optimal cut size: [x at max] cm"
  - "Percent of maximum: [current/max × 100]%"

**Challenge Buttons (bottom):**
- Button: "Find Maximum" (reveals answer)
- Button: "Reset" (clears answer, allows exploration)
- Button: "New Challenge" (changes cardboard size)

**Interactive Features:**
- Real-time updates as slider moves
- Point on graph tracks with slider
- Highlight maximum point when found
- Visual feedback when approaching maximum
- Optional hint system:
  - "Try x between 4 and 6 cm"
  - "You're getting warmer!"
  - "Maximum found!"

**Educational Insights (collapsible panel):**
- Button: "Why does this work?"
- When opened, shows:
  - "When x is too small, the box is very shallow (small height)"
  - "When x is too large, the base becomes very small"
  - "The maximum occurs at the optimal balance"
  - "This can be solved exactly using calculus (taking the derivative)"

**Extension Challenges (bottom):**
- Checkbox options for advanced students:
  - "Change to rectangular cardboard"
  - "Add constraint: surface area ≤ [value]"
  - "Maximize surface area instead of volume"

**Color Scheme:**
- Cardboard: Tan (#D7CCC8)
- Cut corners: Red (#F44336, 40% opacity)
- Fold lines: Blue dashed
- 3D box: Blue (#2196F3, semi-transparent)
- Graph curve: Dark blue (#1565C0)
- Current point: Red (#F44336)
- Maximum point: Green (#4CAF50)
- Backgrounds: Light blue, yellow, green, gray as specified

</details>

### Geometric Modeling and Design

**Geometric modeling** uses shapes, measurements, and spatial reasoning to represent and solve real-world problems. Applications include:

- Architecture and construction
- Product design and packaging
- Urban planning and landscape design
- Computer graphics and animation
- Engineering and manufacturing

A **design challenge** typically involves:
1. Understanding the problem and constraints
2. Brainstorming possible solutions
3. Using geometric principles to model and analyze options
4. Selecting and refining the best solution
5. Communicating the design clearly

#### Design Challenge Example: Efficient Packaging

**Scenario:** A company wants to package cylindrical candles. Each candle has a radius of 3 cm and a height of 15 cm. Design a rectangular box that holds 6 candles while minimizing the amount of cardboard used.

**Approach:**
1. Consider different arrangements (2×3, 1×6, 3×2, circular packing, etc.)
2. Calculate box dimensions for each arrangement
3. Calculate surface area of each box design
4. Compare and select the design with minimum surface area
5. Consider practical constraints (ease of opening, display, etc.)

#### Diagram: Packaging Efficiency Comparison

<details markdown="1">
<summary>Visual comparison of different packaging arrangements</summary>

**Type:** Diagram

**Learning Objective:** Students will **analyze** different packaging arrangements for efficiency, **evaluate** which designs minimize material use, and **create** optimal packaging solutions for real products. (Bloom's Taxonomy: Analyzing, Evaluating, Creating)

**Specification:**

Create a colorful diagram comparing different packaging arrangements for cylindrical candles.

**Layout:** 1200px wide × 900px tall

**Title (top):** "Packaging Design Challenge: Which Uses Least Material?" (bold, 28pt, centered)

**Problem Statement Box (y = 60-140):**
- Light yellow background (#FFF9C4)
- Border: 3px solid orange (#FF9800)
- Text (18pt):
  - "Challenge: Package 6 cylindrical candles (radius 3 cm, height 15 cm)"
  - "Goal: Minimize cardboard used (surface area of box)"
  - "Constraint: Rectangular box only"

**Main Comparison Grid (y = 160-750):**

Four arrangements shown in 2×2 grid:

**Arrangement 1: 1×6 (Linear) - Top Left (x = 20-580)**
- Background: Light blue (#E3F2FD)
- Label: "Arrangement 1: 1×6 (Single Row)" (bold, 18pt)

**Top View:**
- Draw 6 circles in a row
- Each circle: 3 cm radius (scaled for display)
- Circles touching, in a line
- Rectangle outline around them
- Dimensions labeled: 36 cm × 6 cm

**3D View (isometric):**
- Show rectangular box with 6 candles visible inside
- Box dimensions: 36 cm × 6 cm × 15 cm
- Color: Light blue with transparent walls

**Calculations Box:**
- Surface Area calculation shown:
  - $SA = 2(36 \times 6) + 2(36 \times 15) + 2(6 \times 15)$
  - $SA = 432 + 1080 + 180 = 1692$ cm²
- Result in large text: **1692 cm²** (blue)

**Arrangement 2: 2×3 (Two Rows) - Top Right (x = 620-1180)**
- Background: Light green (#E8F5E9)
- Label: "Arrangement 2: 2×3 (Two Rows)" (bold, 18pt)

**Top View:**
- Draw 6 circles in 2 rows of 3
- Rectangle outline around them
- Dimensions labeled: 18 cm × 12 cm

**3D View (isometric):**
- Show rectangular box
- Box dimensions: 18 cm × 12 cm × 15 cm
- Color: Light green with transparent walls

**Calculations Box:**
- Surface Area calculation:
  - $SA = 2(18 \times 12) + 2(18 \times 15) + 2(12 \times 15)$
  - $SA = 432 + 540 + 360 = 1332$ cm²
- Result in large text: **1332 cm²** (green)
- Star icon: "Most efficient!" ⭐

**Arrangement 3: 3×2 (Three Rows) - Bottom Left (x = 20-580)**
- Background: Light orange (#FFF3E0)
- Label: "Arrangement 3: 3×2 (Three Columns)" (bold, 18pt)

**Top View:**
- Draw 6 circles in 3 columns of 2
- Rectangle outline
- Dimensions labeled: 12 cm × 18 cm

**3D View (isometric):**
- Show rectangular box
- Box dimensions: 12 cm × 18 cm × 15 cm
- Color: Light orange with transparent walls

**Calculations Box:**
- Surface Area calculation:
  - $SA = 2(12 \times 18) + 2(12 \times 15) + 2(18 \times 15)$
  - $SA = 432 + 360 + 540 = 1332$ cm²
- Result in large text: **1332 cm²** (orange)
- Note: "Same as 2×3!" (rotated)

**Arrangement 4: 6×1 (Vertical Stack) - Bottom Right (x = 620-1180)**
- Background: Light purple (#F3E5F5)
- Label: "Arrangement 4: 6×1 (Vertical Stack)" (bold, 18pt)

**Top View:**
- Draw single circle
- Rectangle outline
- Dimensions labeled: 6 cm × 6 cm

**3D View (isometric):**
- Show tall, narrow rectangular box
- Box dimensions: 6 cm × 6 cm × 90 cm (candles stacked end-to-end)
- Color: Light purple with transparent walls
- Very tall and narrow appearance

**Calculations Box:**
- Surface Area calculation:
  - $SA = 2(6 \times 6) + 2(6 \times 90) + 2(6 \times 90)$
  - $SA = 72 + 1080 + 1080 = 2232$ cm²
- Result in large text: **2232 cm²** (purple)
- Warning icon: "Least efficient!" ⚠️

**Comparison Summary Table (y = 770-880):**
- Background: Light cyan (#E0F7FA)
- Border: 2px solid teal (#00897B)
- Table (16pt):

| Arrangement | Box Dimensions (L×W×H) | Surface Area | Material Efficiency | Ranking |
|-------------|------------------------|--------------|---------------------|---------|
| 1×6 Linear | 36×6×15 cm | 1692 cm² | Moderate | 3rd |
| 2×3 Grid | 18×12×15 cm | **1332 cm²** | **Best** | **1st** 🏆 |
| 3×2 Grid | 12×18×15 cm | **1332 cm²** | **Best** | **1st** 🏆 |
| 6×1 Stack | 6×6×90 cm | 2232 cm² | Worst | 4th |

**Key Insights Box (bottom, spanning width):**
- Light green background (#E8F5E9)
- Border: 3px solid green (#4CAF50)
- Title: "Design Principles" (bold, 20pt)
- Bullet points (16pt):
  - ✓ **Cube-like shapes minimize surface area** for given volume
  - ✓ The 2×3 and 3×2 arrangements are closest to cube proportions
  - ✓ Long, thin boxes waste material (high surface area for volume)
  - ✓ The 2×3 design saves **21% material** compared to 1×6 design!
  - ✓ The 2×3 design saves **40% material** compared to 6×1 stack!

**Additional Considerations Panel (right side):**
- Light yellow background (#FFF9C4)
- Title: "Other Factors" (bold, 16pt)
- List (14pt):
  - Shipping: Shorter boxes stack better
  - Display: Wider boxes show product better
  - Strength: Cube shapes are stronger
  - Cost: Material cost dominates
  - Environment: Less material = greener

**Visual Enhancements:**
- Color-code each arrangement consistently
- Use checkmarks (✓) for efficient designs
- Use warning symbols (⚠️) for inefficient designs
- Trophy icon (🏆) for winners
- Arrows showing dimensions
- Semi-transparent box walls to see candles inside
- Grid lines on top views for measurement reference

</details>

---

## Chapter Summary

In this chapter, you've learned to:

- Calculate areas of rectangles, parallelograms, triangles, trapezoids, rhombuses, kites, regular polygons, and circles
- Apply formulas for circumference and area of circles, understanding the role of pi
- Identify and classify three-dimensional solids including prisms, pyramids, cylinders, cones, and spheres
- Understand relationships between nets and three-dimensional solids
- Calculate surface areas of rectangular prisms, cylinders, pyramids, cones, and spheres
- Calculate volumes of prisms, cylinders, pyramids, cones, and spheres
- Apply Cavalieri's Principle to understand volume relationships
- Solve problems involving scale drawings and scale models, understanding how scale affects length, area, and volume
- Tackle optimization problems to find maximum or minimum values under constraints
- Apply geometric modeling to design challenges and real-world applications

These measurement and application skills bring together all the geometric concepts you've studied throughout the course and prepare you to use geometry effectively in mathematics, science, engineering, and everyday problem-solving.

---

## Practice Problems

### Area of Polygons

1. A rectangular garden measures 12 m by 8 m. What is its area?

2. A parallelogram has a base of 15 cm and a height of 9 cm. Find its area.

3. An equilateral triangle has sides of length 10 cm. If the height is approximately 8.66 cm, what is the area?

4. A trapezoid has bases of 7 in and 11 in, with a height of 5 in. Calculate its area.

5. A rhombus has diagonals measuring 16 cm and 12 cm. What is its area?

### Circles

6. A circle has a radius of 7 cm. Find its circumference and area.

7. The circumference of a circle is $20\pi$ inches. What is its radius and area?

8. A circular pizza has a diameter of 14 inches. If one slice is cut with a central angle of 45°, what is the area of the slice?

### Surface Area

9. A rectangular prism has dimensions 6 cm × 4 cm × 10 cm. Find its surface area.

10. A cylinder has a radius of 5 cm and a height of 12 cm. Calculate its surface area.

11. A sphere has a radius of 9 inches. What is its surface area?

12. A square pyramid has a base side of 8 m and a slant height of 10 m. Find its surface area.

### Volume

13. What is the volume of a rectangular prism with length 10 cm, width 6 cm, and height 8 cm?

14. A cylinder has a radius of 4 inches and a height of 15 inches. Calculate its volume.

15. A cone has a base radius of 6 cm and a height of 9 cm. Find its volume.

16. A square pyramid has a base side of 12 m and a height of 20 m. What is its volume?

17. Find the volume of a sphere with radius 6 cm.

18. Which has greater volume: a cylinder with radius 4 cm and height 9 cm, or a cone with radius 6 cm and height 12 cm?

### Scale and Applications

19. A model car is built at a scale of 1:24. If the model is 18 cm long, how long is the actual car?

20. If a scale model is built at 1:50 scale, by what factor is the volume reduced?

21. A rectangular box has dimensions 10 cm × 8 cm × 6 cm. If you want to double the volume by increasing only the height, what should the new height be?

22. A cylindrical water tank has a radius of 3 m and a height of 8 m. How many liters of water can it hold? (1 m³ = 1000 liters)

### Optimization and Design

23. You have 100 cm of wire to form a rectangle. What dimensions will maximize the area?

24. A cylindrical can must hold 500 cm³ of liquid. What dimensions (radius and height) will minimize the surface area (and thus the amount of metal needed)?

25. Design a rectangular box with a volume of 1000 cm³ that uses the least amount of material. What dimensions should it have?

---

## Extension Activities

### Activity 1: Build Physical Models

Use cardboard, paper, or other materials to create nets for various polyhedra. Fold them to form 3D solids and verify your surface area calculations by measuring the actual nets.

### Activity 2: Real-World Measurement Project

Measure dimensions of real objects (boxes, cans, balls, etc.) in your environment. Calculate their surface areas and volumes, then verify by measuring how much water they can hold or how much wrapping paper is needed to cover them.

### Activity 3: Packaging Design Challenge

Choose a product and design optimal packaging. Consider:
- Protecting the product
- Minimizing material (cost and environmental impact)
- Ease of shipping (stacking, space efficiency)
- Aesthetic appeal and marketing

Create a presentation with drawings, calculations, and a physical prototype.

### Activity 4: Architecture and Construction

Research a building or structure in your community. Estimate dimensions and calculate:
- Floor area
- Wall surface area (for painting estimation)
- Volume (for heating/cooling calculations)
- Roof surface area (for roofing materials)

### Activity 5: Scale Model Project

Create a scale model of a room, building, or outdoor space. Choose an appropriate scale, accurately measure the original, calculate scaled dimensions, and build your model. Include furniture or landscaping to scale.

---

## Connections to Other Mathematics

The measurement concepts in this chapter connect to many other areas of mathematics:

- **Algebra**: Many area and volume formulas involve quadratic or cubic expressions. Optimization problems often require solving equations or using calculus.

- **Trigonometry**: Finding areas of regular polygons, working with pyramids and cones, and many real-world applications involve trigonometric ratios.

- **Calculus**: The formulas for circles, cones, and spheres can be derived using integration. Optimization problems are often solved using derivatives.

- **Statistics**: Surface area and volume calculations are important in analyzing 3D data representations and probability distributions.

- **Number Theory**: The number π connects geometry to the fascinating world of irrational and transcendental numbers.

---

## Looking Ahead

Congratulations on completing this geometry course! You've built a strong foundation in:

- Logical reasoning and proof
- Properties of angles, lines, and shapes
- Transformations and congruence
- Similarity and trigonometry
- Circle geometry
- Measurement and real-world applications

These skills will serve you well in:

- **Advanced mathematics**: Pre-calculus, calculus, linear algebra, and beyond
- **Sciences**: Physics, chemistry, biology, and earth science all rely on geometric concepts
- **Engineering**: Civil, mechanical, electrical, and software engineering use geometry extensively
- **Technology**: Computer graphics, game design, robotics, and data visualization
- **Arts and design**: Architecture, industrial design, visual arts, and digital media
- **Everyday problem-solving**: Home improvement, crafts, navigation, and spatial reasoning

Continue to look for geometric patterns and relationships in the world around you. The problem-solving skills and spatial reasoning you've developed will continue to grow as you apply them to new challenges.

Your **Geometric Proof Portfolio** (developed throughout this course) showcases your growth as a mathematical thinker. Keep it as a reference and a reminder of what you've accomplished!

---

## Additional Resources

### Interactive Tools
- GeoGebra: Free dynamic geometry software for exploring 2D and 3D shapes
- Desmos Geometry: Browser-based construction and measurement tools
- Tinkercad: 3D modeling tool for creating and measuring virtual objects

### Further Reading
- "How to Solve It" by George Pólya (problem-solving strategies applicable to geometry)
- "The Elements" by Euclid (the foundation of geometry, still relevant today)
- "Flatland" by Edwin Abbott (a mathematical fiction exploring dimensions)

### Career Connections
Explore careers that use geometry extensively:
- Architect
- Civil engineer
- Graphic designer
- Game developer
- Urban planner
- Surveyor
- Cartographer
- Industrial designer
- Computer graphics specialist
- 3D animator

Many of these professionals would be happy to speak with students about how they use geometric concepts in their daily work!
