---
title: Soccer Ball - Truncated Icosahedron
description: An interactive 3D MicroSim demonstrating the geometry of a soccer ball (truncated icosahedron) with 12 black pentagonal faces and 20 white hexagonal faces.
quality_score: 85
image: /sims/soccer-ball/soccer-ball.png
og:image: /sims/soccer-ball/soccer-ball.png
---

# Soccer Ball - Truncated Icosahedron

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[Run the Soccer Ball MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/soccer-ball/main.html" height="520px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim presents an interactive 3D model of a **soccer ball**, which is mathematically known as a **truncated icosahedron** or **Buckyball**. The classic soccer ball design consists of:

- **12 black pentagonal panels** (5-sided)
- **20 white hexagonal panels** (6-sided)
- **60 vertices** where three panels meet
- **90 edges** connecting the vertices

The truncated icosahedron is one of the 13 Archimedean solids and is created by "cutting off" (truncating) the vertices of a regular icosahedron. This shape is also famous in chemistry as the structure of the C60 carbon molecule (Buckminsterfullerene).

### Key Geometric Properties

| Property | Value |
|----------|-------|
| Faces | 32 (12 pentagons + 20 hexagons) |
| Vertices | 60 |
| Edges | 90 |
| Vertex Configuration | 5.6.6 (one pentagon and two hexagons meet at each vertex) |

## How to Use

- **Rotation Speed Slider**: Adjust how fast the soccer ball rotates
- **Click on the ball**: Save a screenshot as `soccer-ball.png`
- Observe how the black pentagons and white hexagons tile the surface of a sphere

## Learning Objectives

Students will:

1. **Understand** the geometric structure of a truncated icosahedron - *Bloom's Taxonomy: Understanding*
2. **Identify** the relationship between pentagons and hexagons in spherical tessellation - *Bloom's Taxonomy: Understanding*
3. **Apply** Euler's formula (V - E + F = 2) to verify the soccer ball structure - *Bloom's Taxonomy: Applying*
4. **Analyze** why exactly 12 pentagons are needed to close a sphere - *Bloom's Taxonomy: Analyzing*

## Lesson Plan

### Introduction (5 minutes)

1. Show students a real soccer ball and ask: "How many different shapes make up this ball?"
2. Introduce the terms pentagon and hexagon
3. Ask students to predict: "Are there more pentagons or hexagons?"

### Exploration (10 minutes)

1. Display the MicroSim and let students observe the rotating ball
2. Have students count the pentagons (12) and hexagons (20)
3. Use the rotation speed slider to slow down and examine the structure
4. Discuss the pattern: every pentagon is surrounded by hexagons, and no two pentagons touch

### Key Discussion Points

- **Why pentagons?** A flat surface of hexagons would be infinite (like a honeycomb). Adding pentagons creates curvature, allowing the surface to close into a sphere.
- **Why exactly 12 pentagons?** This comes from Euler's formula and the geometry of sphere tessellation.
- **Golden Ratio Connection**: The vertices of a truncated icosahedron can be described using the golden ratio (φ ≈ 1.618).

### Mathematical Verification

Use Euler's formula: V - E + F = 2

- Vertices (V) = 60
- Edges (E) = 90
- Faces (F) = 32

Check: 60 - 90 + 32 = 2 ✓

### Practice Activities (10 minutes)

1. Calculate the total number of edges:
   - Each pentagon has 5 edges, each hexagon has 6 edges
   - Total edge-face incidences: (12 × 5) + (20 × 6) = 180
   - Since each edge borders 2 faces: 180 ÷ 2 = 90 edges ✓

2. Calculate the total number of vertices:
   - Each vertex has 3 edges meeting
   - Total edge-vertex incidences: 90 × 2 = 180
   - Vertices: 180 ÷ 3 = 60 vertices ✓

### Assessment Questions

1. What are the two shapes that make up a soccer ball?
2. How many pentagons and hexagons are on a soccer ball?
3. Why can't a soccer ball be made of only hexagons?
4. What is the mathematical name for the soccer ball shape?
5. Verify Euler's formula using the soccer ball's properties.

### Extension Activities

- Research other Archimedean solids and their properties
- Explore why C60 (Buckminsterfullerene) has the same shape
- Investigate the dual of the truncated icosahedron (the pentakis dodecahedron)
- Calculate the surface area and volume of a truncated icosahedron

## Grade Level

High School Geometry (Grades 9-12)

## Prerequisites

- Understanding of polygons (pentagons and hexagons)
- Basic knowledge of 3D solids
- Familiarity with Euler's formula (helpful but not required)

## Duration

Typical engagement time: 15-20 minutes for exploration and discussion

## Technical Implementation

This MicroSim is built using p5.js in WEBGL mode and features:

- 3D rendering of a truncated icosahedron with 60 mathematically accurate vertices
- Black pentagonal faces and white hexagonal faces (classic soccer ball colors)
- Interactive rotation speed control
- Ambient and directional lighting for depth perception
- Click-to-save screenshot functionality

## Standards Alignment

This MicroSim aligns with Common Core State Standards for Mathematics:

- **CCSS.MATH.CONTENT.HSG.GMD.B.4**: Identify the shapes of two-dimensional cross-sections of three-dimensional objects
- **CCSS.MATH.CONTENT.HSG.MG.A.1**: Use geometric shapes, their measures, and their properties to describe objects

## Credits

- Vertex coordinates based on the mathematical definition of the truncated icosahedron using the golden ratio
- Adapted from the Coding Train dodecahedron example
- Created using p5.js library for educational purposes in geometry instruction

---

*Click on the soccer ball to save a screenshot (soccer-ball.png) for social media previews and navigation thumbnails.*
