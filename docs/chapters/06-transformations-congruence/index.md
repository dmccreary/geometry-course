# Transformations and Congruence

## Summary

This chapter introduces geometric transformations as functions that move shapes in the plane while exploring how rigid motions (translations, rotations, and reflections) define congruence. You'll learn that two figures are congruent if and only if one can be mapped onto the other through a sequence of rigid transformations. This modern approach to congruence provides a dynamic, visual understanding of why figures have the same size and shape.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Translation
2. Rotation
3. Reflection
4. Dilation
5. Rigid Motion
6. Image
7. Pre-Image
8. Composition of Transformations
9. Congruent Figures
10. Corresponding Parts
11. Triangle Congruence
12. CPCTC

## Prerequisites

This chapter assumes only the prerequisites from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)

---

## Introduction to Transformations

Imagine picking up a shape and moving it across a table, rotating it, or flipping it over. These motions—slides, turns, and flips—are examples of **geometric transformations**. In this chapter, you'll learn how transformations provide a dynamic way to understand geometry, moving beyond static figures to shapes in motion.

Transformations are functions that map every point in a plane to a new location. Some transformations preserve size and shape (called **rigid motions**), while others change size but preserve shape. By understanding transformations, you'll discover a powerful modern approach to congruence: two figures are congruent if and only if one can be transformed into the other through rigid motions.

This chapter represents a shift in how geometry is taught—from static measurement to dynamic motion—reflecting how mathematicians think about shapes today.

## Pre-Image and Image

Before exploring specific transformations, we need key vocabulary:

- **Pre-image**: The original figure before a transformation
- **Image**: The resulting figure after a transformation
- **Notation**: If point $A$ is transformed, its image is labeled $A'$ (read "A prime")

For entire figures, if triangle $ABC$ is transformed, its image is triangle $A'B'C'$.

#### Diagram: Pre-Image and Image Notation
<details markdown="1">
    <summary>Transformation Terminology</summary>
    Type: diagram

    Purpose: Introduce pre-image, image, and prime notation

    **Learning Objective:** Students will identify pre-images and images using proper notation (Bloom's: **Remembering** and **Understanding**)

    Layout: Before and after visualization (800x400px)

    Left side - Pre-Image:
    - Triangle ABC (blue, solid)
    - Vertices labeled A, B, C
    - Label: "Pre-Image (original)"
    - Arrow pointing to triangle: "This is what we start with"

    Right side - Image:
    - Triangle A'B'C' (green, solid)
    - Vertices labeled A', B', C'
    - Label: "Image (after transformation)"
    - Arrow pointing to triangle: "This is the result"

    Center:
    - Large curved arrow from left to right
    - Label on arrow: "Transformation"

    Correspondence shown:
    - Dashed lines connecting A to A'
    - Dashed lines connecting B to B'
    - Dashed lines connecting C to C'
    - Labels: "A → A'", "B → B'", "C → C'"

    Color scheme:
    - Background: Light cream
    - Pre-image: Blue
    - Image: Green
    - Connecting lines: Gray dashed
    - Arrow: Orange

    Overall title: "Pre-Image and Image: Transformation Notation"

    Implementation: SVG with clear labeling
</details>

## Translation: The Slide

A **translation** (or slide) moves every point of a figure the same distance in the same direction. Think of it as sliding a book across a table—the book doesn't rotate or flip, it just moves.

**Properties of translations:**
- Every point moves the same distance
- Every point moves in the same direction
- The figure doesn't rotate or flip
- Size and shape are preserved (rigid motion)

**Coordinate notation:** A translation can be described by how far to move horizontally and vertically. We write $T_{(h,k)}$ to mean "translate $h$ units horizontally and $k$ units vertically."

If point $(x, y)$ is translated by $(h, k)$, the image is $(x + h, y + k)$.

#### Diagram: Translation Examples
<details markdown="1">
    <summary>Translation Visualization</summary>
    Type: diagram

    Purpose: Show multiple translation examples with vectors

    **Learning Objective:** Students will perform translations and identify translation vectors (Bloom's: **Understanding** and **Applying**)

    Layout: Three examples (1200x400px)

    Example 1 - Horizontal Translation:
    - Pre-image: Triangle at origin (blue)
    - Translation vector: 5 units right (red arrow)
    - Image: Triangle shifted right (green)
    - Grid showing movement
    - Label: "T₍₅,₀₎: Translate 5 units right"

    Example 2 - Vertical Translation:
    - Pre-image: Pentagon (blue)
    - Translation vector: 4 units up (red arrow)
    - Image: Pentagon shifted up (green)
    - Label: "T₍₀,₄₎: Translate 4 units up"

    Example 3 - Diagonal Translation:
    - Pre-image: Quadrilateral (blue)
    - Translation vector: 3 right, 2 down (red arrow)
    - Image: Quadrilateral shifted diagonally (green)
    - Label: "T₍₃,₋₂₎: Translate 3 right, 2 down"

    Visual elements for each:
    - Coordinate grid with axes
    - Pre-image in blue
    - Image in green
    - Translation vector as bold red arrow
    - Dashed lines showing corresponding vertices
    - Movement distance labeled

    Color scheme:
    - Background: White
    - Grid: Light gray
    - Pre-images: Blue
    - Images: Green
    - Translation vectors: Red arrows
    - Vertex labels: Black

    Overall title: "Translations: Sliding Figures in the Plane"

    Implementation: SVG with precise coordinate alignment
</details>

#### Drawing: Interactive Translation Explorer
<details markdown="1">
    <summary>Translation Tool</summary>
    Type: microsim

    **Learning Objective:** Students will translate figures using coordinate rules and visualize the preservation of size and shape (Bloom's: **Applying** and **Analyzing**)

    Purpose: Interactive tool for exploring translations

    Canvas layout (800x700px):
    - Grid area (800x550): Coordinate plane with figure
    - Control panel (800x150): Sliders and information

    Visual elements:
    - Coordinate grid (-10 to 10 on both axes)
    - Pre-image shape (blue, multiple shape options)
    - Image shape (green, updates in real-time)
    - Translation vector (red arrow from origin showing direction)
    - Corresponding vertices connected with dashed lines

    Interactive features:

    Shape selector:
    - Dropdown: Triangle, Square, Pentagon, Custom polygon
    - Pre-image always in blue

    Translation controls:
    - Horizontal slider: -10 to +10
      - Label: "Horizontal (h): [value] units"
    - Vertical slider: -10 to +10
      - Label: "Vertical (k): [value] units"
    - Image updates in real-time as sliders move

    Display elements:
    - Translation notation: "T₍h,k₎"
    - Coordinate rule: "(x, y) → (x + h, y + k)"
    - Example vertex transformation shown:
      - "A(2, 3) → A'(2+h, 3+k) = A'(x', y')"

    Visual feedback:
    - Translation vector arrow shows direction and magnitude
    - Distance label on arrow: "√(h² + k²) units"
    - Grid highlights showing movement
    - Vertex labels update positions

    Special features:
    - "Animate" button: Shows smooth motion from pre-image to image
    - "Show Vector" toggle: Display/hide translation arrow
    - "Show Grid" toggle: Turn grid on/off
    - "Trace Path" option: Shows path of one vertex
    - "Measure" tool: Click two corresponding points to verify distance preserved

    Challenge modes:
    - "Match the Translation": Given image, find h and k
    - "Reach the Target": Translate figure to specific location
    - "Multi-Step": Perform sequence of translations

    Default parameters:
    - Shape: Triangle with vertices at (1,1), (4,1), (2,4)
    - h = 3, k = 2
    - Background: Light blue gradient

    Educational callouts:
    - "Size doesn't change! ✓"
    - "Shape doesn't change! ✓"
    - "All points move same distance"

    Implementation: p5.js with smooth animation
</details>

## Rotation: The Turn

A **rotation** turns a figure around a fixed point called the **center of rotation**. The figure rotates by a specific **angle of rotation**.

**Properties of rotations:**
- Every point rotates the same angle
- All points rotate around the same center
- Distance from center is preserved
- Size and shape are preserved (rigid motion)

**Common rotations:**
- 90° (quarter turn)
- 180° (half turn)
- 270° (three-quarter turn)
- 360° (full turn - back to start)

**Direction:** Rotations are positive counterclockwise, negative clockwise.

#### Diagram: Rotation Around Origin
<details markdown="1">
    <summary>Rotation Visualization</summary>
    Type: diagram

    Purpose: Show rotations at different angles around the origin

    **Learning Objective:** Students will perform rotations around the origin and understand angle of rotation (Bloom's: **Understanding** and **Applying**)

    Layout: Four examples in 2x2 grid (900x900px)

    Each example shows:
    - Coordinate grid
    - Center of rotation at origin (large red dot)
    - Pre-image triangle (blue)
    - Image triangle (green)
    - Arc showing rotation angle (purple)
    - Rotation angle labeled

    Example 1 (top-left): 90° Rotation
    - Pre-image: Triangle in Q1
    - Rotation: 90° counterclockwise
    - Image: Triangle in Q2
    - Arc from one vertex to its image
    - Label: "R₉₀°: 90° counterclockwise"

    Example 2 (top-right): 180° Rotation
    - Pre-image: Triangle in Q1
    - Rotation: 180°
    - Image: Triangle in Q3 (point symmetry)
    - Label: "R₁₈₀°: 180° rotation"

    Example 3 (bottom-left): 270° Rotation
    - Pre-image: Triangle in Q1
    - Rotation: 270° counterclockwise (= 90° clockwise)
    - Image: Triangle in Q4
    - Label: "R₂₇₀°: 270° counterclockwise"

    Example 4 (bottom-right): 45° Rotation
    - Pre-image: Square aligned with axes
    - Rotation: 45°
    - Image: Square tilted
    - Label: "R₄₅°: 45° rotation"

    Visual elements for each:
    - Dashed lines from origin to corresponding vertices
    - All radial distances equal (shown with measurements)
    - Rotation arc with angle measure
    - Circular arrows showing direction

    Color scheme:
    - Background: White
    - Grid: Light gray
    - Center of rotation: Red dot
    - Pre-images: Blue
    - Images: Green
    - Rotation arcs: Purple
    - Radial lines: Gray dashed

    Overall title: "Rotations: Turning Figures Around a Point"

    Implementation: SVG with precise angle measurements
</details>

#### Drawing: Interactive Rotation Explorer
<details markdown="1">
    <summary>Rotation Tool</summary>
    Type: microsim

    **Learning Objective:** Students will rotate figures around a point and understand that rotations preserve distance from the center (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Interactive tool for exploring rotations with draggable center

    Canvas layout (850x750px):
    - Grid area (850x600): Coordinate plane with rotation
    - Control panel (850x150): Angle slider and center controls

    Visual elements:
    - Coordinate grid (-10 to 10)
    - Pre-image shape (blue)
    - Image shape (green, rotated)
    - Center of rotation (red dot, draggable)
    - Rotation arcs showing angle (purple)
    - Radial lines from center to vertices (dashed)

    Interactive features:

    Center of rotation:
    - Draggable red dot
    - Can be placed anywhere on grid
    - Coordinates displayed: "Center: (cx, cy)"
    - Default: origin (0, 0)

    Rotation angle control:
    - Circular slider (like a dial) OR linear slider
    - Range: -360° to +360°
    - Label: "Angle: [value]°"
    - Positive = counterclockwise, Negative = clockwise
    - Preset buttons: 90°, 180°, 270°, -90°

    Visual feedback:
    - Rotation arcs from each vertex to its image
    - All arcs same angle (color-coded to match)
    - Radial distances shown (all equal for each vertex)
    - Circular arrow showing rotation direction

    Display elements:
    - Rotation notation: "Rθ,c where θ = [angle]°, c = ([cx], [cy])"
    - For rotation around origin, shows coordinate rules:
      - 90°: (x, y) → (-y, x)
      - 180°: (x, y) → (-x, -y)
      - 270°: (x, y) → (y, -x)

    Special features:
    - "Animate" button: Smooth rotation from 0° to target angle
    - "Show Arcs" toggle: Display/hide rotation arcs
    - "Show Radii" toggle: Show/hide lines from center
    - "Freeze Pre-Image" option: Keep original visible or hide
    - "Trace Path" option: Shows circular path of one vertex

    Challenge modes:
    - "Find the Angle": Given image, determine rotation angle
    - "Find the Center": Given pre-image and image, find center
    - "Match the Rotation": Recreate a given transformation

    Shape options:
    - Triangle, Square, Pentagon, Letter "F" (for chirality)
    - Custom vertices

    Default parameters:
    - Shape: Right triangle
    - Angle: 90°
    - Center: (0, 0)
    - Background: Light yellow gradient

    Educational callouts:
    - "Distance from center never changes!"
    - "All points rotate same angle"
    - "Positive = counterclockwise"

    Implementation: p5.js with circular motion animation
</details>

## Reflection: The Flip

A **reflection** flips a figure over a line called the **line of reflection** (or mirror line). The image appears as a mirror image of the pre-image.

**Properties of reflections:**
- Every point and its image are equidistant from the line of reflection
- The line of reflection is the perpendicular bisector of each segment connecting a point to its image
- Size and shape are preserved (rigid motion)
- Orientation is reversed (clockwise becomes counterclockwise)

**Common lines of reflection:**
- x-axis: $(x, y) \rightarrow (x, -y)$
- y-axis: $(x, y) \rightarrow (-x, y)$
- Line $y = x$: $(x, y) \rightarrow (y, x)$

#### Diagram: Reflections Over Different Lines
<details markdown="1">
    <summary>Reflection Visualization</summary>
    Type: diagram

    Purpose: Show reflections over x-axis, y-axis, and y=x

    **Learning Objective:** Students will perform reflections over coordinate axes and understand perpendicular distance preservation (Bloom's: **Understanding** and **Applying**)

    Layout: Three examples side-by-side (1200x450px)

    Example 1 - Reflection over x-axis:
    - Pre-image: Triangle above x-axis (blue)
    - Line of reflection: x-axis (bold red)
    - Image: Triangle below x-axis (green, flipped)
    - Perpendicular segments from vertices to x-axis
    - Equal distances marked above and below
    - Label: "Reflection over x-axis: (x,y) → (x,-y)"

    Example 2 - Reflection over y-axis:
    - Pre-image: Quadrilateral right of y-axis (blue)
    - Line of reflection: y-axis (bold red)
    - Image: Quadrilateral left of y-axis (green, flipped)
    - Perpendicular segments to y-axis
    - Equal distances marked left and right
    - Label: "Reflection over y-axis: (x,y) → (-x,y)"

    Example 3 - Reflection over y=x:
    - Pre-image: Pentagon (blue)
    - Line of reflection: y=x diagonal (bold red)
    - Image: Pentagon reflected (green)
    - Perpendicular segments to y=x line
    - Label: "Reflection over y=x: (x,y) → (y,x)"

    Visual elements for each:
    - Coordinate grid with axes
    - Line of reflection bold and red
    - Pre-image and image in blue/green
    - Perpendicular dashed lines
    - Distance measurements showing equality
    - Mirror effect emphasized

    Color scheme:
    - Background: Light blue
    - Grid: Light gray
    - Lines of reflection: Red, bold
    - Pre-images: Blue
    - Images: Green
    - Perpendicular segments: Purple dashed

    Overall title: "Reflections: Flipping Figures Over a Line"

    Implementation: SVG with precise symmetry
</details>

#### Drawing: Interactive Reflection Explorer
<details markdown="1">
    <summary>Reflection Tool</summary>
    Type: microsim

    **Learning Objective:** Students will reflect figures over various lines and verify that reflections preserve perpendicular distances (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Interactive tool for exploring reflections with custom mirror lines

    Canvas layout (900x750px):
    - Grid area (900x600): Coordinate plane with reflection
    - Control panel (900x150): Line selection and verification tools

    Visual elements:
    - Coordinate grid (-10 to 10)
    - Pre-image shape (blue)
    - Image shape (green, reflected)
    - Line of reflection (bold red)
    - Perpendicular segments from points to line (dashed purple)
    - Distance indicators

    Interactive features:

    Line of reflection options:
    - Dropdown selector:
      - "x-axis"
      - "y-axis"
      - "y = x"
      - "y = -x"
      - "Vertical line x = k" (slider for k)
      - "Horizontal line y = k" (slider for k)
      - "Custom line" (drag two points to define)
    - Selected line highlighted in bold red

    Shape selector:
    - Triangle, Quadrilateral, Pentagon, Letter "R" (shows chirality)

    Visual feedback:
    - Perpendicular segments automatically drawn
    - Distance from pre-image vertex to line: d₁
    - Distance from line to image vertex: d₂
    - Verification: "d₁ = d₂ ✓" (in green)
    - Perpendicular symbol (small square) at line intersection

    Display elements:
    - Reflection notation: "Reflection over [line]"
    - For axis reflections, shows coordinate rule
    - Example transformation: "A(3, 4) → A'(?, ?)"

    Special features:
    - "Animate" button: Flips figure over line smoothly
    - "Show Perpendiculars" toggle
    - "Show Distances" toggle: Labels all distances
    - "Verify Reflection" button: Checks all distances equal
    - "Orientation Check": Shows pre-image labeled clockwise, image counterclockwise

    Challenge modes:
    - "Find the Line": Given pre-image and image, identify mirror line
    - "Perfect Reflection": Place image points correctly
    - "Symmetry Test": Determine if figure has reflectional symmetry

    Verification panel:
    - Table showing each vertex and its image:
      | Vertex | Distance to Line | Image | Distance to Line |
      |--------|------------------|-------|------------------|
      | A(2,3) | 3.0 units | A'(-2,3) | 3.0 units ✓ |
      | ... | ... | ... | ... |

    Default parameters:
    - Shape: Triangle
    - Line: y-axis
    - Background: White to light gray gradient

    Educational callouts:
    - "Mirror image!"
    - "Perpendicular distances are equal"
    - "Orientation reverses"

    Implementation: p5.js with perpendicular line calculations
</details>

## Dilation: Changing Size

A **dilation** is a transformation that changes the size of a figure while preserving its shape. Unlike the previous transformations, dilations are NOT rigid motions because size changes.

**Properties of dilations:**
- Every point moves along a line through the center of dilation
- Distances are multiplied by the **scale factor** $k$
- If $k > 1$: enlargement (bigger)
- If $0 < k < 1$: reduction (smaller)
- If $k = 1$: no change
- Shape is preserved, but size changes (NOT rigid motion)

**Coordinate notation:** A dilation centered at origin with scale factor $k$ transforms $(x, y) \rightarrow (kx, ky)$.

#### Diagram: Dilations with Different Scale Factors
<details markdown="1">
    <summary>Dilation Visualization</summary>
    Type: diagram

    Purpose: Show enlargements and reductions through dilations

    **Learning Objective:** Students will perform dilations and understand how scale factor affects size (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Three examples (1200x450px)

    Example 1 - Enlargement (k > 1):
    - Center: Origin (red dot)
    - Pre-image: Small triangle (blue)
    - Scale factor: k = 2
    - Image: Larger triangle (green, twice as big)
    - Radial lines from origin through corresponding vertices
    - Distance measurements showing 2:1 ratio
    - Label: "D₂: Dilation with k = 2 (enlargement)"

    Example 2 - Reduction (0 < k < 1):
    - Center: Origin (red dot)
    - Pre-image: Medium square (blue)
    - Scale factor: k = 0.5
    - Image: Smaller square (green, half size)
    - Radial lines from origin
    - Distance measurements showing 1:2 ratio
    - Label: "D₀.₅: Dilation with k = 0.5 (reduction)"

    Example 3 - Center Not at Origin:
    - Center: Point C (red dot, not at origin)
    - Pre-image: Pentagon (blue)
    - Scale factor: k = 1.5
    - Image: Larger pentagon (green)
    - Radial lines from C through all vertices
    - Label: "D₁.₅,c: Dilation from center C"

    Visual elements for each:
    - Coordinate grid
    - Center of dilation (large red dot)
    - Pre-image (blue)
    - Image (green, scaled)
    - Radial lines (dashed gray, from center through corresponding points)
    - Distance ratio labels (e.g., "2:1", "1:2")
    - Similar shapes emphasized (same angles, proportional sides)

    Color scheme:
    - Background: Light yellow
    - Grid: Light gray
    - Center: Red dot
    - Pre-images: Blue
    - Images: Green (lighter for reductions, darker for enlargements)
    - Radial lines: Gray dashed

    Overall title: "Dilations: Changing Size While Preserving Shape"

    Note box: "Dilations are NOT rigid motions! Size changes."

    Implementation: SVG with proportional scaling
</details>

## Rigid Motions and Congruence

**Rigid motions** (also called **isometries**) are transformations that preserve distance and angle measure. The three rigid motions are:

1. **Translation** - slide
2. **Rotation** - turn
3. **Reflection** - flip

Notice that **dilation is NOT a rigid motion** because it changes distances.

**Key theorem:** Two figures are congruent if and only if one can be mapped onto the other by a sequence of rigid motions.

This provides our modern definition of **congruence**: figures that can be made to coincide through rigid motions have the same size and shape.

#### Diagram: Rigid Motion Summary
<details markdown="1">
    <summary>Three Types of Rigid Motions</summary>
    Type: diagram

    Purpose: Compare the three rigid motions side-by-side

    **Learning Objective:** Students will classify transformations as rigid motions and explain why dilations are not rigid (Bloom's: **Understanding**, **Analyzing**, and **Evaluating**)

    Layout: Comparison table format (1000x600px)

    Three columns, one for each rigid motion:

    Column 1 - Translation:
    - Icon: Two triangles with horizontal arrow between them
    - Name: "Translation (Slide)"
    - What it does: "Moves all points same distance, same direction"
    - What's preserved: "✓ Distance ✓ Angle ✓ Orientation"
    - Example transformation: "(x,y) → (x+h, y+k)"
    - Visual: Triangle sliding right

    Column 2 - Rotation:
    - Icon: Two triangles with circular arrow
    - Name: "Rotation (Turn)"
    - What it does: "Turns all points around a center"
    - What's preserved: "✓ Distance ✓ Angle ✓ Orientation"
    - Example transformation: "90° around origin: (x,y) → (-y,x)"
    - Visual: Triangle rotating

    Column 3 - Reflection:
    - Icon: Two triangles with mirror line
    - Name: "Reflection (Flip)"
    - What it does: "Flips all points over a line"
    - What's preserved: "✓ Distance ✓ Angle ✗ Orientation (reverses)"
    - Example transformation: "Over y-axis: (x,y) → (-x,y)"
    - Visual: Triangle flipping

    Bottom section - Dilation (for contrast):
    - Shown in separate box with warning color
    - Name: "Dilation (NOT a rigid motion)"
    - What it does: "Changes size by scale factor"
    - What's preserved: "✗ Distance ✓ Angle ✓ Shape"
    - Example: "(x,y) → (kx,ky)"
    - Note: "Changes size → NOT rigid!"

    Color scheme:
    - Rigid motions columns: Green backgrounds
    - Dilation box: Red/orange background (warning)
    - Checkmarks: Green ✓
    - X marks: Red ✗
    - Visuals: Blue pre-images, green images

    Overall title: "Rigid Motions Preserve Distance and Angle"

    Implementation: Infographic-style SVG
</details>

## Composition of Transformations

A **composition of transformations** means performing one transformation after another. The notation $T_2 \circ T_1$ means "do $T_1$ first, then $T_2$."

**Important:** Order matters! $T_2 \circ T_1$ may not equal $T_1 \circ T_2$.

**Key results:**
- Composition of rigid motions is a rigid motion
- Composition of two reflections over parallel lines = translation
- Composition of two reflections over intersecting lines = rotation

#### Drawing: Composition of Transformations Explorer
<details markdown="1">
    <summary>Transformation Composition Tool</summary>
    Type: microsim

    **Learning Objective:** Students will perform sequences of transformations and understand that composition order matters (Bloom's: **Applying**, **Analyzing**, and **Creating**)

    Purpose: Interactive tool for exploring transformation compositions

    Canvas layout (950x800px):
    - Grid area (950x600): Shows all stages of transformation
    - Control panel (950x200): Transformation sequence builder

    Visual elements:
    - Coordinate grid (-10 to 10)
    - Stage 1: Original pre-image (blue)
    - Stage 2: After first transformation (purple)
    - Stage 3: After second transformation (orange)
    - Final image (green)
    - All stages can be toggled on/off

    Transformation sequence builder:
    - Two (or more) transformation slots
    - Each slot has dropdown:
      - "Translation (h, k)" with sliders
      - "Rotation (angle)" with slider
      - "Reflection (line)" with line selector
      - "None"
    - Transformations applied in order: T₁, then T₂, then T₃...

    Display shows:
    - T₁: [Type] with parameters
    - T₂: [Type] with parameters
    - Composition: T₂ ∘ T₁
    - "Applied in order: T₁ first, then T₂"

    Interactive features:
    - "Add Transformation" button (up to 4 transformations)
    - "Remove Last" button
    - "Reverse Order" button (swaps to T₁ ∘ T₂ instead)
    - "Animate" button: Shows step-by-step transformation

    Stage visualization:
    - Each intermediate stage shown in different color
    - Option to "Show All Stages" or "Show Only Final"
    - Labels: "Original → T₁ → T₂ → Final"

    Special features:
    - "Commutative Test": Tries both orders, compares results
      - "T₂ ∘ T₁ vs T₁ ∘ T₂"
      - Displays: "Same result ✓" or "Different results ✗"
    - "Equivalent Transformation": Finds single transformation equal to composition
    - "Challenge Mode": Given final image, find composition that produces it

    Preset compositions:
    - "Two Parallel Reflections" → shows = translation
    - "Two Intersecting Reflections" → shows = rotation
    - "Glide Reflection" (translation + reflection)

    Default setup:
    - T₁: Translation (3, 0)
    - T₂: Rotation 90°
    - Shape: Triangle

    Educational callouts:
    - "Order matters! Try reversing"
    - "Two reflections can equal one translation or rotation"
    - "Composition of rigid motions is rigid"

    Implementation: p5.js with multi-stage visualization
</details>

## Congruent Figures

Two figures are **congruent** if they have the same size and shape. The modern definition: **Two figures are congruent if and only if one can be mapped onto the other by a sequence of rigid motions.**

**Notation:** $\triangle ABC \cong \triangle DEF$ means triangle ABC is congruent to triangle DEF.

**Corresponding Parts:** When figures are congruent, matching parts are called **corresponding parts**. These include:
- **Corresponding sides**: have equal lengths
- **Corresponding angles**: have equal measures

**CPCTC:** "Corresponding Parts of Congruent Triangles are Congruent" - once we prove triangles congruent, we can conclude all corresponding parts are equal.

#### Diagram: Congruent Triangles with Corresponding Parts
<details markdown="1">
    <summary>Congruence and Correspondence</summary>
    Type: diagram

    Purpose: Show congruent triangles and identify corresponding parts

    **Learning Objective:** Students will identify corresponding parts of congruent figures and apply CPCTC (Bloom's: **Understanding**, **Applying**, and **Analyzing**)

    Layout: Two triangles with correspondence mapping (900x500px)

    Left side:
    - Triangle ABC (blue)
    - Vertices labeled A, B, C
    - Sides labeled with lengths: AB=5, BC=7, AC=6
    - Angles labeled with measures: ∠A=60°, ∠B=80°, ∠C=40°
    - Congruence marks on sides (tick marks)
    - Angle arcs showing measures

    Right side:
    - Triangle DEF (green)
    - Vertices labeled D, E, F
    - Sides labeled: DE=5, EF=7, DF=6
    - Angles labeled: ∠D=60°, ∠E=80°, ∠F=40°
    - Matching congruence marks (same tick pattern as ABC)
    - Matching angle arcs

    Center:
    - Congruence statement: "△ABC ≅ △DEF"
    - Curved arrows showing correspondence:
      - A ↔ D (red curve)
      - B ↔ E (green curve)
      - C ↔ F (blue curve)

    Bottom panel - Corresponding Parts:
    - Table format:
      | Corresponding Sides | Lengths |
      |---------------------|---------|
      | AB ≅ DE | 5 units |
      | BC ≅ EF | 7 units |
      | AC ≅ DF | 6 units |

      | Corresponding Angles | Measures |
      |----------------------|----------|
      | ∠A ≅ ∠D | 60° |
      | ∠B ≅ ∠E | 80° |
      | ∠C ≅ ∠F | 40° |

    Annotations:
    - "Same tick marks = equal sides"
    - "Same arc marks = equal angles"
    - "Order matters: ABC ≅ DEF means A↔D, B↔E, C↔F"

    Color scheme:
    - Background: Light cream
    - Triangle ABC: Blue
    - Triangle DEF: Green
    - Correspondence arrows: Colored (red, green, blue)
    - Congruence marks: Black
    - Table: Clean, organized

    Overall title: "Congruent Triangles and Corresponding Parts"

    CPCTC box: "Once triangles are congruent, ALL corresponding parts are congruent"

    Implementation: SVG with clear correspondence visualization
</details>

## Triangle Congruence

For triangles specifically, we don't need to check all six pairs of corresponding parts. Several shortcuts exist:

**Triangle Congruence Postulates/Theorems:**

1. **SSS** (Side-Side-Side): If three sides of one triangle are congruent to three sides of another triangle, the triangles are congruent.

2. **SAS** (Side-Angle-Side): If two sides and the included angle of one triangle are congruent to two sides and the included angle of another triangle, the triangles are congruent.

3. **ASA** (Angle-Side-Angle): If two angles and the included side of one triangle are congruent to two angles and the included side of another triangle, the triangles are congruent.

4. **AAS** (Angle-Angle-Side): If two angles and a non-included side of one triangle are congruent to two angles and the corresponding non-included side of another triangle, the triangles are congruent.

5. **HL** (Hypotenuse-Leg): For right triangles only - if the hypotenuse and one leg are congruent, the triangles are congruent.

**Note:** **AAA** (three angles) and **SSA** (two sides and non-included angle) are NOT sufficient for congruence!

#### Diagram: Triangle Congruence Criteria
<details markdown="1">
    <summary>Five Ways to Prove Triangle Congruence</summary>
    Type: diagram

    Purpose: Illustrate all five triangle congruence criteria

    **Learning Objective:** Students will identify which congruence criterion applies to a pair of triangles and determine if triangles are congruent (Bloom's: **Understanding**, **Applying**, and **Evaluating**)

    Layout: Five panels in organized grid (1200x800px, top 3 in row, bottom 2 centered)

    Each panel shows two congruent triangles with marked information:

    Panel 1 - SSS:
    - Two triangles with all three sides marked equal
    - Tick marks: 1, 2, 3 on each triangle
    - Label: "SSS: Three sides congruent"
    - Formula: "AB≅DE, BC≅EF, AC≅DF → △ABC≅△DEF"

    Panel 2 - SAS:
    - Two triangles with two sides and included angle marked
    - Tick marks on sides, arc on angle
    - Included angle highlighted
    - Label: "SAS: Two sides and included angle"
    - Formula: "AB≅DE, ∠B≅∠E, BC≅EF → △ABC≅△DEF"

    Panel 3 - ASA:
    - Two triangles with two angles and included side
    - Angle arcs, tick on included side
    - Label: "ASA: Two angles and included side"
    - Formula: "∠A≅∠D, AB≅DE, ∠B≅∠E → △ABC≅△DEF"

    Panel 4 - AAS:
    - Two triangles with two angles and non-included side
    - Angle arcs, tick on non-included side
    - Label: "AAS: Two angles and non-included side"
    - Formula: "∠A≅∠D, ∠B≅∠E, BC≅EF → △ABC≅△DEF"

    Panel 5 - HL (Hypotenuse-Leg):
    - Two right triangles (right angle marked)
    - Hypotenuse and one leg marked equal
    - Label: "HL: Right triangles - hypotenuse and leg"
    - Formula: "∠C≅∠F=90°, AB≅DE, AC≅DF → △ABC≅△DEF"

    Bottom section - Non-Examples:
    - Two small panels with warning colors:

    Non-Example 1 - AAA (Not Sufficient):
    - Two triangles, same angles, different sizes
    - Label: "AAA: NOT sufficient! ✗"
    - Note: "Same shape, different size (similar, not congruent)"

    Non-Example 2 - SSA (Not Sufficient):
    - Two different triangles with same SSA
    - Label: "SSA: NOT sufficient! ✗"
    - Note: "Ambiguous case - could be two different triangles"

    Color scheme:
    - Valid criteria panels: Green backgrounds
    - Non-examples: Red/orange backgrounds
    - Congruent triangles: Blue and green
    - Congruence marks: Bold and clear
    - Equal parts highlighted

    Overall title: "Triangle Congruence Criteria: How to Prove Triangles Congruent"

    Implementation: Infographic-style SVG with clear visual organization
</details>

#### Drawing: Triangle Congruence Identifier
<details markdown="1">
    <summary>Triangle Congruence Practice Tool</summary>
    Type: microsim

    **Learning Objective:** Students will determine which congruence criterion (if any) proves triangles congruent and justify their reasoning (Bloom's: **Applying**, **Analyzing**, and **Evaluating**)

    Purpose: Practice identifying triangle congruence criteria

    Canvas layout (900x750px):
    - Triangle display area (900x500): Two triangles with markings
    - Analysis panel (900x250): Information and response options

    Visual elements:
    - Two triangles displayed side-by-side
    - Various congruence markings (tick marks for sides, arcs for angles)
    - Information given varies by problem

    Interactive features:

    Problem generation:
    - "New Problem" button generates random triangle pair
    - Given information marked on triangles
    - Could be: SSS, SAS, ASA, AAS, HL, insufficient, or contradictory

    Student response area:
    - Multiple choice buttons:
      - "SSS"
      - "SAS"
      - "ASA"
      - "AAS"
      - "HL"
      - "Not Congruent"
      - "Need More Information"
    - "Check Answer" button

    Feedback system:
    - Correct: Green flash, explanation appears
      - "Correct! These triangles are congruent by [criterion]"
      - Highlights the congruent parts used
    - Incorrect: Gentle correction
      - "Not quite. [Hint about what's actually marked]"
      - Progressive hints available

    Display panel shows:
    - What's given: "AB≅DE (marked), BC≅EF (marked), ∠B≅∠E (marked)"
    - What criterion this matches
    - Why it works or doesn't work

    Problem difficulty levels:
    - Level 1: Clear cases (all info marked obviously)
    - Level 2: Must identify which parts are marked
    - Level 3: Includes ambiguous cases (AAA, SSA)
    - Level 4: Missing information - need to determine what's needed

    Special features:
    - "Hint" button: Suggests what to look for
    - "Show Correspondence" : Highlights matching parts with colors
    - "Explain" mode: Detailed explanation of criterion
    - Progress tracker: Problems solved correctly by each criterion

    Challenge modes:
    - "Speed Round": Timed identification
    - "Find What's Missing": Given criterion, identify needed information
    - "Prove It": Write congruence statement (△ABC ≅ △___)

    Default parameters:
    - Starts with clear SSS example
    - Background: White

    Educational callouts:
    - "Check for included vs. non-included!"
    - "HL only works for right triangles"
    - "AAA and SSA are not sufficient"

    Implementation: p5.js with random problem generation
</details>

## Summary: Transformations and Congruence

In this chapter, you've learned how transformations provide a dynamic, modern approach to congruence:

**The Four Main Transformations:**

1. **Translation** - slide (rigid motion)
2. **Rotation** - turn (rigid motion)
3. **Reflection** - flip (rigid motion)
4. **Dilation** - resize (NOT rigid motion)

**Key Concepts:**

- **Rigid motions** preserve distance and angle (size and shape unchanged)
- **Congruence** is defined through rigid motions
- **Corresponding parts** of congruent figures are equal
- **CPCTC** allows us to conclude parts are equal once figures are congruent

**Triangle Congruence Shortcuts:**
- **SSS, SAS, ASA, AAS, HL** are sufficient
- **AAA and SSA** are NOT sufficient

**Transformations in the Real World:**
- Computer graphics and animation
- Robotic motion planning
- Symmetry in art and nature
- Manufacturing and quality control

This transformation-based approach to congruence is the foundation for modern geometry and connects directly to advanced topics in mathematics, computer science, and physics.

---

**Next Steps:** With transformations mastered, you're ready to explore similarity (which includes dilations) and prove theorems about triangles, quadrilaterals, and other polygons!
