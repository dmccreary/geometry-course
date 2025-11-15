# Geometry Equations

## Sample Prompt

!!! prompt
    Create a list of the 25 most commonly used
    equations in a high school geometry course.

    For each equation, return the following:

    1. The name of the equation in markdown level 4.
    2. Within the body, return the equation in LaTeX format
    3. Surround the equation with dollar signs
    4. For each variable in the equation, add a "where:" that defines each variable
    5. Put blank lines around the list of variables
    6. Wrap the variables names in dollar signs


## Examples:

#### Slope and Intercept
$y = m * x + b$

where:

- $y$ is the vertical axis
- $x$ is the horizontal axis
- $m$ is the slope
- $b$ is the intercept

#### Area of a Circle
$A = 2\pi r^2$
where:

- $A$ is the area of the circle
- $r$ is the radius

```

## Sample Response from ChatGPT

!!! Note
    We had to do extensive filtering on this because the Markdown Paste does not work correctly on LaTeX equations in VSCode.  See the src/latex-cleanup code for
    details on the Python filter we had ChatGPT create to clean up the formatting.

### 1. Area of a Triangle
$A = \frac{1}{2} b h$

where:

- A is the area of the triangle
- b is the base of the triangle
- h is the height of the triangle
### 2. Pythagorean Theorem
$c^2 = a^2 + b^2$

where:

- $c$ is the hypotenuse of the right triangle
- $a$ and $b$ are the other two sides

### 3. Area of a Circle
$A = 2\pi r^2$

where:

- $A$ is the area of the circle
- $r$ is the radius

### 4. Circumference of a Circle
$C = 2 \pi r$

where:

- $C$ is the circumference
- $r$ is the radius

### 5. Distance Formula
$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

where:

- $d$ is the distance between two points
- $(x_1,y_1)$ and $(x_2,y_2)$ are the coordinates of the two points

### 6. Midpoint Formula
$M = \left( \frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2} \right)$

where:

- M is the midpoint of the segment
- $(x_1,y_1)$ and $(x_2,y_2)$ are the endpoints

### 7. Slope Formula
$m = \frac{y_2 - y_1}{x_2 - x_1}$

where:

- $m$ is the slope
- $(x_1,y_1)$ and $(x_2,y_2)$ are the points

### 8. Area of a Rectangle
$A = l \cdot w$
where:

- $A$ is the area
- $l$ is the length
- $w$ is the width

### 9. Perimeter of a Rectangle
$P = 2l + 2w$

where:

- $P$ is the perimeter
- $l$ is the length
- $w$ is the width

### 10. Area of a Parallelogram
$A = b h$

where:

- $A$ is the area
- $b$ is the base
- $h$ is the height

### 11. Area of a Trapezoid
$A = \frac{1}{2} (b_1 + b_2) h$

where:

- $A$ is the area
- $b_1$​ and $b_2$ are the bases
- $h$ is the height

### 12. Volume of a Rectangular Prism
$V = l \cdot w \cdot h$

where:

- $V$ is the volume
- $l$ is the length
- $w$ is the width
- $h$ is the height

### 13. Surface Area of a Rectangular Prism
$SA = 2lw + 2lh + 2wh$
where:

- $SA$ is the surface area
- $l$ is the length
- $w$ is the width
- $h$ is the height

### 14. Volume of a Sphere
$V = \frac{4}{3} \pi r^3$

where:

- $V$ is the volume
- $r$ is the radius

### 15. Surface Area of a Sphere
$SA = 4 \pi r^2$
where:

- $SA$ is the surface area
- $r$ is the radius

### 16. Volume of a Cylinder
$V = \pi r^2 h$

where:

- $V$ is the volume
- $r$ is the radius
- $h$ is the height

### 17. Surface Area of a Cylinder
$SA = 2\pi r^2 + 2\pi r h$

where:

- $SA$ is the surface area
- $r$ is the radius
- $h$ is the height

### 18. Volume of a Cone
$V = \frac{1}{3} \pi r^2 h$

where:

- $V$ is the volume
- $r$ is the radius
- $h$ is the height

### 19. Surface Area of a Cone
$SA = \pi r (r + l)$

where:

- $SA$ is the surface area
- $r$ is the radius
- $l$ is the slant height

### 20. Area of a Regular Polygon
$A = \frac{1}{2} a P$

where:

- $A$ is the area
- $a$ is the apothem
- $P$ is the perimeter

### 21. Sum of Interior Angles of a Polygon
$S = 180(n - 2)$

where:

- $S$ is the sum of the interior angles
- $n$ is the number of sides

### 22. Measure of Each Interior Angle of a Regular Polygon
$Angle = \frac{180(n - 2)}{n}$

where:

- $Angle$ is the measure of each interior angle
- $n$ is the number of sides

### 23. Law of Sines
$\frac{a}{\sin ⁡A} = \frac{b}{\sin B} = \frac{c}{\sin C}$

where:

- $a,b,c$ are the sides of the triangle
- $A,B,C$ are the angles opposite those sides

### 24. Law of Cosines
$c^2 = a^2 + b^2 - 2ab\cos C$

where:

- $c$ is the side opposite angle C
- $a$ and b are the other sides
- $C$ is the included angle

### 25. Equation of a Circle

$(x-h)2+(y-k)2 = r^2$

where:

- $(h,k)$ is the center of the circle
- $r$ is the radius