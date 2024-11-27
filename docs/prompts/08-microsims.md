# MicroSim Ideas


## Sample Prompt for Generating Ideas for MicroSims

```linenums="0"
I am a high-school geometry teacher that has just taken a course in creating simulations and animations using p5.js.  What are some fun interactive animations (MicroSim)I can create to teach my students various topics in geometry.  I want to create a small animation or simulation that has controls such as buttons and sliders.  As the student change the controls they should see some geometry on the screen change.  For each MicroSim please provide:

1. The name of the simulation in a level 4 markdown header.
2. The topic or subjects that the students would learn.
3. The list of. controls on the screen and their type (button, slider etc.).
4. What they might learn from using the simulation.
5. The level of difficulty (beginner, intermediate, advanced)
```

#### Transformation Explorer

**Topic or Subjects**

-   Geometric transformations: translation, rotation, scaling, and reflection.
-   Understanding how transformations affect shapes on the coordinate plane.

**Controls**

-   **Translation Sliders**
    -   Horizontal Translation (`x`): *Slider*
    -   Vertical Translation (`y`): *Slider*
-   **Rotation Slider**
    -   Rotation Angle (0° to 360°): *Slider*
-   **Scaling Sliders**
    -   Horizontal Scaling Factor: *Slider*
    -   Vertical Scaling Factor: *Slider*
-   **Reflection Buttons**
    -   Reflect over X-axis: *Button*
    -   Reflect over Y-axis: *Button*
-   **Reset Button**
    -   Resets the shape to its original state: *Button*

**What They Might Learn**

-   How each type of transformation alters a shape's position, size, and orientation.
-   The effects of combining multiple transformations.
-   The difference between rigid motions (translations, rotations, reflections) and non-rigid transformations (scaling).

**Level of Difficulty**

-  **Intermediate**

* * * *

#### Unit Circle Explorer

**Topic or Subjects**

-   Trigonometric functions and their relationship to the unit circle.
-   Understanding sine, cosine, and tangent in terms of circle coordinates.

**Controls**

-   **Angle Slider**
    -   Adjusts the angle from 0° to 360°: *Slider*
-   **Function Toggle Buttons**
    -   Show/Hide Sine Value (opposite side length): *Button*
    -   Show/Hide Cosine Value (adjacent side length): *Button*
    -   Show/Hide Tangent Line (slope): *Button*
-   **Animation Button**
    -   Starts/Stops automatic rotation around the circle: *Button*
-   **Reset Button**
    -   Resets the angle to 0°: *Button*

**What They Might Learn**

-   How the sine and cosine values correspond to the y and x coordinates on the unit circle.
-   The periodic nature of trigonometric functions.
-   Visualizing how tangent relates to the slope of the angle line.

**Level of Difficulty**

-   **Intermediate**

* * * *

#### Pythagorean Theorem Visualizer

**Topic or Subjects**

-   The Pythagorean theorem and right-angled triangles.
-   Relationship between the lengths of sides in right triangles.

**Controls**

-   **Side Length Sliders**
    -   Adjust Length of Side `a` (base): *Slider*
    -   Adjust Length of Side `b` (height): *Slider*
-   **Show Squares Button**
    -   Toggle display of squares on each side: *Button*
-   **Calculate Hypotenuse Button**
    -   Computes and displays the length of the hypotenuse `c`: *Button*
-   **Reset Button**
    -   Resets side lengths to default values: *Button*

**What They Might Learn**

-   How changing side lengths affects the hypotenuse.
-   Visual proof of a2+b2\=c2a^2 + b^2 = c^2a2+b2\=c2 through area comparison.
-   Reinforcement of the relationship between side lengths in right triangles.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Triangle Similarity Simulator

**Topic or Subjects**

-   Criteria for triangle similarity (AA, SAS, SSS).
-   Proportional relationships in similar triangles.

**Controls**

-   **Triangle Size Slider**
    -   Scales one triangle while keeping its shape: *Slider*
-   **Angle Adjustment Slider**
    -   Changes a specific angle to explore AA similarity: *Slider*
-   **Side Length Sliders**
    -   Adjust lengths to explore SAS and SSS criteria: *Sliders*
-   **Overlay Toggle Button**
    -   Overlays triangles to compare corresponding parts: *Button*
-   **Show Ratios Button**
    -   Displays ratios of corresponding sides: *Button*
-   **Reset Button**
    -   Restores default triangle configurations: *Button*

**What They Might Learn**

-   How altering angles and sides can create similar or non-similar triangles.
-   The importance of proportionality in determining similarity.
-   Application of similarity criteria in problem-solving.

**Level of Difficulty**

-   **Intermediate**

* * * *

#### Circle Properties Simulator

**Topic or Subjects**

-   Properties of circles, including central and inscribed angles.
-   Relationships between arcs, chords, and angles.

**Controls**

-   **Point Movement Slider**
    -   Moves a point along the circumference to change angles: *Slider*
-   **Radius Slider**
    -   Adjusts the size of the circle: *Slider*
-   **Toggle Display Buttons**
    -   Show/Hide Central Angle: *Button*
    -   Show/Hide Inscribed Angle: *Button*
    -   Show/Hide Chord: *Button*
-   **Arc Length Display Button**
    -   Calculates and shows arc lengths: *Button*
-   **Reset Button**
    -   Resets the circle to its original state: *Button*

**What They Might Learn**

-   How central angles relate to their intercepted arcs.
-   The relationship between inscribed angles and their intercepted arcs.
-   Properties of chords and how they change with circle size and angle positions.

**Level of Difficulty**

-   **Advanced**

## Prompt

```linenums="0"
How about some very basic MicroSims for beginners?
For example, how to find the area of a circle?
A slider might change the radius and the student
would see the area change and see a plot of the
area as the radius changes.
```

## Response

#### Circle Area Explorer

**Topic or Subjects**

-   Calculating the area of a circle.
-   Understanding the relationship between radius and area.

**Controls**

-   **Radius Slider**
    -   Adjusts the radius of the circle: *Slider*
-   **Area Display**
    -   Shows the calculated area as the radius changes: *Readout*
-   **Plot Toggle Button**
    -   Shows/Hides a graph plotting radius versus area: *Button*
-   **Reset Button**
    -   Resets the radius to its default value: *Button*

**What They Might Learn**

-   How the area of a circle changes with varying radius.
-   The mathematical relationship A\=πr2A = \\pi r^2A\=πr2.
-   That the area increases quadratically as the radius increases linearly.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Rectangle Area Visualizer

**Topic or Subjects**

-   Calculating the area of a rectangle.
-   Understanding the relationship between length, width, and area.

**Controls**

-   **Length Slider**
    -   Adjusts the length of the rectangle: *Slider*
-   **Width Slider**
    -   Adjusts the width of the rectangle: *Slider*
-   **Area Display**
    -   Shows the calculated area: *Readout*
-   **Reset Button**
    -   Resets length and width to default values: *Button*

**What They Might Learn**

-   How changing length and width affects the area.
-   The formula A\=length×widthA = \\text{length} \\times \\text{width}A\=length×width.
-   The concept of area as a measure of two-dimensional space.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Triangle Area Explorer

**Topic or Subjects**

-   Calculating the area of a triangle.
-   Understanding base and height in relation to area.

**Controls**

-   **Base Slider**
    -   Adjusts the base length of the triangle: *Slider*
-   **Height Slider**
    -   Adjusts the height of the triangle: *Slider*
-   **Area Display**
    -   Shows the calculated area: *Readout*
-   **Reset Button**
    -   Resets base and height to default values: *Button*

**What They Might Learn**

-   How the area depends on both base and height.
-   The formula A\=12×base×heightA = \\frac{1}{2} \\times \\text{base} \\times \\text{height}A\=21​×base×height.
-   Visual understanding of how area changes with base and height.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Perimeter vs. Area Simulator

**Topic or Subjects**

-   Difference between perimeter and area.
-   How changing dimensions affects perimeter and area differently.

**Controls**

-   **Shape Selector**
    -   Choose between square and rectangle: *Dropdown Menu*
-   **Dimension Sliders**
    -   Adjust side lengths (for square) or length and width (for rectangle): *Sliders*
-   **Perimeter and Area Display**
    -   Shows calculated perimeter and area: *Readouts*
-   **Reset Button**
    -   Resets dimensions to default values: *Button*

**What They Might Learn**

-   The formulas for calculating perimeter and area.
-   That increasing dimensions affects area more significantly than perimeter.
-   The concept that perimeter is linear while area is two-dimensional.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Angle Identifier

**Topic or Subjects**

-   Types of angles: acute, right, obtuse, straight, and reflex angles.
-   Measuring angles in degrees.

**Controls**

-   **Angle Slider**
    -   Adjusts the measure of the angle from 0° to 360°: *Slider*
-   **Angle Display**
    -   Shows the current angle measurement: *Readout*
-   **Type Display**
    -   Identifies the type of angle based on its measurement: *Readout*
-   **Reset Button**
    -   Resets the angle to default value (e.g., 90°): *Button*

**What They Might Learn**

-   How to classify angles based on their measurements.
-   Visual representation of different types of angles.
-   Familiarity with degree measurements in a circle.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Fraction Circle Explorer

**Topic or Subjects**

-   Understanding fractions as parts of a whole.
-   Visualizing fractions using a circle (pie chart).

**Controls**

-   **Fraction Slider**
    -   Adjusts the numerator and denominator to change the fraction: *Two Sliders*
-   **Circle Display**
    -   Shows the circle divided according to the selected fraction: *Visual*
-   **Equivalent Fraction Button**
    -   Displays equivalent fractions for the selected value: *Button*
-   **Reset Button**
    -   Resets numerator and denominator to default values: *Button*

**What They Might Learn**

-   How fractions represent parts of a whole.
-   The concept of equivalent fractions.
-   Visual understanding of fraction sizes.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Polygon Shape Builder

**Topic or Subjects**

-   Identifying basic polygons: triangles, quadrilaterals, pentagons, etc.
-   Understanding properties like the number of sides and angles.

**Controls**

-   **Sides Slider**
    -   Adjusts the number of sides from 3 to 10: *Slider*
-   **Regular/Irregular Toggle**
    -   Switches between regular and irregular polygons: *Button*
-   **Angle Display**
    -   Shows internal angle measurements: *Readout*
-   **Reset Button**
    -   Resets to the default polygon (e.g., triangle): *Button*

**What They Might Learn**

-   Different types of polygons based on the number of sides.
-   Properties of regular polygons (equal sides and angles).
-   How internal angles change with the number of sides.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Symmetry Explorer

**Topic or Subjects**

-   Understanding lines of symmetry.
-   Identifying symmetrical shapes.

**Controls**

-   **Shape Selector**
    -   Choose from various shapes (circle, square, rectangle, etc.): *Dropdown Menu*
-   **Symmetry Line Toggle**
    -   Show/Hide lines of symmetry: *Button*
-   **Rotate Shape Slider**
    -   Rotates the shape to see symmetry from different angles: *Slider*
-   **Reset Button**
    -   Resets the shape and orientation: *Button*

**What They Might Learn**

-   What symmetry means in geometry.
-   How to identify lines of symmetry in different shapes.
-   The difference between symmetrical and asymmetrical shapes.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Coordinate Plane Navigator

**Topic or Subjects**

-   Plotting points on the Cartesian coordinate system.
-   Understanding the x and y axes.

**Controls**

-   **X-Coordinate Slider**
    -   Adjusts the x-value of a point: *Slider*
-   **Y-Coordinate Slider**
    -   Adjusts the y-value of a point: *Slider*
-   **Quadrant Display**
    -   Indicates which quadrant the point is in: *Readout*
-   **Reset Button**
    -   Resets coordinates to (0,0): *Button*

**What They Might Learn**

-   How to plot and locate points on the coordinate plane.
-   The significance of positive and negative values on axes.
-   The concept of quadrants in the coordinate system.

**Level of Difficulty**

-   **Beginner**

* * * *

#### Volume of a Rectangular Prism

**Topic or Subjects**

-   Calculating the volume of a rectangular prism.
-   Understanding length, width, and height in three dimensions.

**Controls**

-   **Length Slider**
    -   Adjusts the length of the prism: *Slider*
-   **Width Slider**
    -   Adjusts the width of the prism: *Slider*
-   **Height Slider**
    -   Adjusts the height of the prism: *Slider*
-   **Volume Display**
    -   Shows the calculated volume: *Readout*
-   **Reset Button**
    -   Resets dimensions to default values: *Button*

**What They Might Learn**

-   The formula V\=length×width×heightV = \\text{length} \\times \\text{width} \\times \\text{height}V\=length×width×height.
-   How changing each dimension affects the overall volume.
-   Visualization of three-dimensional space.

**Level of Difficulty**

-   **Beginner**

* * * *

These MicroSims are designed to introduce fundamental geometry concepts through interactive visualizations. They allow students to manipulate variables and observe real-time changes, reinforcing their understanding of basic geometric principles.

o1