# Circle Area Calculator MicroSim

![Circle Area Calculator](./circle-area-calculator.png){ width="400" }

[Run the MicroSim](./circle-area-calculator.html){ .md-button .md-button--primary }

## About this MicroSim

This interactive MicroSim helps students understand the relationship between a circle's radius, area, and circumference. By adjusting the radius slider, students can see real-time calculations of both the area (πr²) and circumference (2πr) of the circle.

### Key Concepts

- **Circle**: A set of points equidistant from a center point
- **Radius (r)**: The distance from the center to any point on the circle
- **Area**: The space enclosed by the circle, calculated using A = πr²
- **Circumference**: The distance around the circle, calculated using C = 2πr
- **Pi (π)**: The mathematical constant approximately equal to 3.14159

### Learning Objectives

Students will:
1. Understand how changing the radius affects both area and circumference
2. Observe that area increases quadratically (r²) while circumference increases linearly (r)
3. See the visual relationship between the radius line and the circle's size
4. Practice using the formulas for area and circumference

### How to Use

1. Move the **Radius slider** to change the circle's size
2. Observe how the circle grows or shrinks in the display area
3. Watch the **Area** calculation update (notice it changes faster than circumference)
4. Watch the **Circumference** calculation update
5. Compare how area grows much faster than circumference as radius increases

### Discussion Questions

1. What happens to the area when you double the radius? (Hint: It quadruples!)
2. What happens to the circumference when you double the radius?
3. At what radius does the area equal the circumference numerically?
4. Why does the area formula use r² while circumference uses r?

### Mathematical Formulas

**Area of a Circle:**
$$A = \pi r^2$$

Where:
- A = Area
- π ≈ 3.14159
- r = radius

**Circumference of a Circle:**
$$C = 2\pi r$$

Where:
- C = Circumference
- π ≈ 3.14159
- r = radius

### Sample Prompt Used to Generate This MicroSim

```linenums="0"
Create a p5.js MicroSim for teaching circle area and circumference.

Requirements:
- Canvas size: 600x500 pixels with 100px control area at bottom
- Include a slider to adjust the circle's radius (10-150 units)
- Display a circle with visible radius line
- Show real-time calculations for both area and circumference
- Display the formulas: A = πr² and C = 2πr
- Show step-by-step calculations with current values
- Use aliceblue background for drawing area
- Place controls at the bottom with white background
- Mark the center point in red
- Draw the radius line in red
```

## Interactive Example

<iframe src="./circle-area-calculator.html" width="620" height="520" scrolling="no" style="border: 1px solid #ccc;"></iframe>

## Related Concepts

- [Circle Area Explorer](../circle-area-explorer/index.md) - Explore circle area in different ways
- [Circles Chapter](../../chapters/circles/index.md) - Learn more about circle properties
- [Area and Perimeters](../../chapters/areas-and-perimeters/index.md) - Other shapes and calculations
