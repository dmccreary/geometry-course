---
title: Cross-Section Explorer
description: Slide a horizontal plane through six solids to see the shape and area of each cross-section and how the area changes with height.
image: /sims/cross-section-explorer/cross-section-explorer.png
og:image: /sims/cross-section-explorer/cross-section-explorer.png
twitter:image: /sims/cross-section-explorer/cross-section-explorer.png
social:
   cards: false
quality_score: 0
---

# Cross-Section Explorer

<iframe src="main.html" height="582" width="100%" scrolling="no"></iframe>

[Run the Cross-Section Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A **cross-section** is the flat shape made where a plane cuts through a solid. This MicroSim cuts six solids with a horizontal plane that you move up and down.

- The **left panel** shows the solid, the orange cutting plane, and the cross-section outlined in red.
- The **right panel** shows the cross-section from directly above on a one-unit grid.
- The **properties panel** gives its shape, dimensions, perimeter, and area.
- The **graph** plots cross-sectional area against height. The shaded region under the curve up to the plane represents the volume below the plane.

For the prism, cylinder, and triangular prism the area never changes, so the graph is a horizontal line and the volume is base area times height. For the cone and the pyramid the dimensions shrink linearly, so the area shrinks quadratically. That curved graph encloses exactly one third of the rectangle, which is where the $\tfrac{1}{3}$ in $V = \tfrac{1}{3}Bh$ comes from.

## How to Use

1. Choose a solid from the **Solid** menu.
2. Drag **Cutting plane height** from the bottom of the solid (0%) to the top (100%).
3. Compare the red outline on the solid with the shape in the right panel.
4. Watch the red point move along the area graph, and compare the graphs of different solids.

## Iframe Embed Code

```html
<iframe src="main.html"
        height="582"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Geometry)

### Duration
15-20 minutes

### Prerequisites
Names of common solids, area formulas for rectangles, triangles, and circles, and the Pythagorean theorem.

### Bloom's Taxonomy Level
Analyze (L4)

### Learning Objective
Students will be able to identify the cross-sections that a horizontal plane makes with common solids and analyze how the cross-sectional area changes with height.

### Activities

1. **Predict** (4 min): For each solid, students sketch the cross-section they expect at the middle height before selecting it.
2. **Sort** (5 min): Students sort the six solids into those with a constant cross-section and those with a changing one, using the graph as evidence.
3. **Explain** (6 min): Students compare the graphs for the cylinder and the cone and explain why the cone's volume is one third of the cylinder's.

### Assessment
Students sketch the area-versus-height graph for a solid not in the MicroSim, such as a hemisphere resting on its flat face, and justify the shape of the graph.

## References

1. Wikipedia. [Cross section (geometry)](https://en.wikipedia.org/wiki/Cross_section_(geometry)).
2. Wikipedia. [Cavalieri's principle](https://en.wikipedia.org/wiki/Cavalieri%27s_principle).
3. Common Core State Standards Initiative. High School Geometry: Geometric Measurement and Dimension (HSG-GMD.B.4).
