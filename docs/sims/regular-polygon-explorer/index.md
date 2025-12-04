---
title: Regular Polygon Explorer
description: An interactive MicroSim for exploring regular polygons by adjusting the number of sides, demonstrating how polygons approach circles as sides increase.
quality_score: 70
image: /sims/regular-polygon-explorer/regular-polygon-explorer.png
og:image: /sims/regular-polygon-explorer/regular-polygon-explorer.png
---

# Regular Polygon Explorer

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Regular Polygon Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

**Copy this iframe to embed in your website:**

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/regular-polygon-explorer/main.html" width="100%" height="452px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim allows students to explore the properties of regular polygons by varying the number of sides and colors. Students can see how polygons transform as they add or remove sides, helping them understand the relationship between the number of sides and the shape's appearance.

## Controls

- **Points Slider**: Adjust the number of sides (vertices) of the polygon from 3 to 20
- **Color Slider**: Change the color of the polygon using the HSB (Hue, Saturation, Brightness) color model

## Learning Objectives

Students will:

1. **Understand** what defines a regular polygon (equal sides and equal angles)
2. **Observe** how polygons change as the number of sides increases
3. **Recognize** that as the number of sides increases, regular polygons approximate a circle
4. **Explore** the visual properties of different regular polygons (triangle, square, pentagon, hexagon, etc.)

## Key Concepts

- **Regular Polygon**: A polygon with all sides of equal length and all angles of equal measure
- **Vertices**: The corner points of a polygon (same as the number of sides)
- **Common Regular Polygons**:
  - 3 sides: Equilateral Triangle
  - 4 sides: Square
  - 5 sides: Regular Pentagon
  - 6 sides: Regular Hexagon
  - 8 sides: Regular Octagon

## Lesson Plan

### Introduction (5 minutes)

1. Ask students: "What makes a polygon 'regular'?"
2. Explain that regular polygons have all equal sides and all equal angles
3. Show examples of regular polygons in the real world (stop signs, honeycombs, etc.)

### Exploration (15 minutes)

1. Have students start with 3 sides and observe the equilateral triangle
2. Ask: "What happens as we increase the number of sides?"
3. Guide students to notice:
   - Each polygon is still regular (equal sides and angles)
   - As sides increase, the polygon looks more like a circle
   - With 20 sides, it's hard to distinguish from a circle

### Discussion Questions

1. What is the minimum number of sides a polygon can have? (3 - triangle)
2. What regular polygon has 4 sides? (Square)
3. What regular polygon has 6 sides? (Hexagon)
4. What shape does a regular polygon approximate as the number of sides approaches infinity? (Circle)
5. Why do you think stop signs are octagons (8 sides)?

### Extension Activities

1. **Add a Radius Slider**: Modify the code to add a slider that controls the radius of the polygon
2. **Interior Angles**: Calculate and display the interior angle of the regular polygon using the formula: `(n-2) × 180° / n`
3. **Perimeter and Area**: Calculate and display the perimeter and area of the polygon
4. **Animation**: Make the polygon slowly rotate to better visualize its symmetry

## Grade Level

Middle School to High School (Grades 6-12)

## Prerequisites

- Basic understanding of shapes
- Familiarity with polygons (optional but helpful)

## Duration

15-20 minutes for exploration and discussion
