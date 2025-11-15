---
title: Distance Formula Explorer
description: An interactive MicroSim that helps students visualize and apply the distance formula to find distances between two points on the coordinate plane, showing the connection to the Pythagorean theorem.
image: /sims/distance-formula/distance-formula.png
og:image: /sims/distance-formula/distance-formula.png
twitter:image: /sims/distance-formula/distance-formula.png
social:
   cards: false
---

# Distance Formula Explorer

<iframe src="main.html" height="702px" width="100%" scrolling="no"></iframe>

[Run the Distance Formula Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Distance Formula Explorer MicroSim in the P5.js Editor](https://editor.p5js.org/dmccreary/sketches/4VKTPrx9y)

## Description

The Distance Formula Explorer is an interactive educational tool that helps students understand how to calculate the distance between two points on a coordinate plane. This MicroSim visually demonstrates the connection between the distance formula and the Pythagorean theorem by showing how the distance between two points forms the hypotenuse of a right triangle.

Students can explore the concept through multiple interaction modes:

- **Drag Points**: Click and drag Point A (blue) or Point B (red) anywhere on the coordinate grid to see distances update in real-time
- **Manual Entry**: Type specific coordinates into the input fields for precise point placement
- **Visual Triangle**: Toggle the right triangle display to see the horizontal and vertical components
- **Calculation Steps**: Show the step-by-step distance formula calculation
- **Snap to Grid**: Enable grid snapping for whole-number coordinates
- **Random Points**: Generate random point pairs to explore different configurations

The visual representation clearly shows:
- The two points connected by a purple line (the distance)
- An optional right triangle with labeled horizontal and vertical legs
- Real-time coordinate display for both points
- Distance calculation with the formula: d = √[(x₂-x₁)² + (y₂-y₁)²]

## Embedding in Your Website

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/distance-formula/main.html" height="702px" width="100%" scrolling="no"></iframe>
```

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Apply** the distance formula to find the distance between any two points on a coordinate plane (Bloom's: Applying)
2. **Understand** how the distance formula relates to the Pythagorean theorem (Bloom's: Understanding)
3. **Visualize** the geometric relationship between horizontal distance, vertical distance, and the diagonal distance (Bloom's: Understanding)
4. **Calculate** distances using both the formula and visual inspection (Bloom's: Applying)
5. **Analyze** how changing point positions affects the distance and triangle dimensions (Bloom's: Analyzing)

## Lesson Plan

### Introduction (5 minutes)
1. Review the Pythagorean theorem: a² + b² = c²
2. Ask students: "How can we find the distance between two points that aren't on the same horizontal or vertical line?"
3. Introduce the distance formula as an application of the Pythagorean theorem

### Guided Exploration (10 minutes)
1. **Basic Understanding**:
   - Start with points A(1, 2) and B(4, 6) (default)
   - Enable "Show Right Triangle" checkbox
   - Identify the horizontal leg (Δx = 3), vertical leg (Δy = 4), and hypotenuse (distance ≈ 5)
   - Notice this is a 3-4-5 Pythagorean triple

2. **Formula Connection**:
   - Enable "Show Calculation Steps"
   - Walk through each step: Δx = x₂ - x₁, Δy = y₂ - y₁, d = √[(Δx)² + (Δy)²]
   - Verify: √[3² + 4²] = √[9 + 16] = √25 = 5

3. **Interactive Practice**:
   - Drag Point A to (0, 0) and Point B to (3, 4) - observe the 3-4-5 triangle
   - Try Point A at (-2, -1) and Point B at (1, 3) - practice with negative coordinates
   - Use "Random Points" to generate new examples

### Independent Exploration (10 minutes)
Students work individually or in pairs to:

1. Find points that create a distance of exactly 5 units (multiple solutions exist)
2. Create a right triangle with legs of equal length (what's special about the distance?)
3. Find two points where the distance equals one of the coordinates
4. Experiment with points in different quadrants

### Challenge Problems (Optional, 5-10 minutes)
1. **Pythagorean Triples**: Find point pairs that create 3-4-5, 5-12-13, or 8-15-17 triangles
2. **Unit Circle**: Place Point A at origin (0, 0) and Point B at various locations that are exactly 5 units away - what pattern do these points form?
3. **Optimization**: Given Point A at (2, 3), where should Point B be placed on the line y = -2 to minimize the distance?

### Assessment Questions
1. What is the distance between points (2, 3) and (5, 7)?
2. If two points are 10 units apart and have the same y-coordinate, what is |x₂ - x₁|?
3. Explain why the distance formula is just the Pythagorean theorem in coordinate form.
4. Can the distance between two different points ever be 0? Why or why not?

### Extension Activities
- **Real-World Application**: Use map coordinates to find distances between cities
- **3D Extension**: Discuss how the formula extends to three dimensions
- **Coding**: Challenge students to write their own distance calculator
- **Art**: Create designs by connecting points at specific distances

## Educational Standards Alignment

**Common Core Mathematics Standards:**
- CCSS.MATH.CONTENT.HSG.GPE.B.7: Use coordinates to compute perimeters of polygons and areas of triangles and rectangles
- CCSS.MATH.CONTENT.8.G.B.8: Apply the Pythagorean Theorem to find the distance between two points in a coordinate system

**Bloom's Taxonomy Levels:**
- **Understanding**: Visualizing the connection between the Pythagorean theorem and distance
- **Applying**: Using the distance formula to calculate distances between points
- **Analyzing**: Exploring how coordinate changes affect distance

## Technical Details

- **Framework**: p5.js
- **Canvas Size**: 800×700 pixels (width-responsive)
- **Drawing Area**: 600 pixels high
- **Control Area**: 100 pixels high
- **Grid Range**: -10 to +10 on both axes
- **Coordinate System**: Standard Cartesian (origin at center)

## Tips for Educators

1. **Start Simple**: Begin with points in the first quadrant and integer coordinates
2. **Build Intuition**: Have students predict distances before calculating
3. **Visual First**: Use the triangle view to build geometric understanding before introducing the formula
4. **Connect to Prior Knowledge**: Emphasize this is just the Pythagorean theorem with coordinates
5. **Check Understanding**: Ask students to explain why we square the differences and then take the square root
6. **Common Mistakes**: Watch for sign errors when calculating Δx and Δy with negative coordinates

## Accessibility Features

- High contrast colors for point visibility (blue and red)
- Clear labels and large text (16pt minimum)
- Keyboard-accessible controls (checkboxes, buttons, input fields)
- Screen reader support through p5.js describe() function
- Manual coordinate entry for precise positioning

## Related MicroSims

- Pythagorean Theorem Explorer
- Coordinate Plane Basics
- Midpoint Formula Explorer
- Slope Calculator

## Version History

- v1.0 (2025-11-14): Initial release with draggable points, triangle visualization, and calculation display

---

*This MicroSim was created to help students develop deep understanding of the distance formula through interactive, visual exploration.*
