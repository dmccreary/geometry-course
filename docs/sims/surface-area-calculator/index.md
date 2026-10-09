---
title: Surface Area Calculator
description: Choose a prism, cube, cylinder, pyramid, cone, or sphere, set its dimensions, and follow the surface area calculation step by step.
image: /sims/surface-area-calculator/surface-area-calculator.png
og:image: /sims/surface-area-calculator/surface-area-calculator.png
twitter:image: /sims/surface-area-calculator/surface-area-calculator.png
social:
   cards: false
quality_score: 0
---

# Surface Area Calculator

<iframe src="main.html" height="582" width="100%" scrolling="no"></iframe>

[Run the Surface Area Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **surface area** of a solid is the total area of all its faces and curved surfaces. This MicroSim draws the selected solid with its dimensions labeled and shows three things beside it: the formula, the calculation with the current values substituted, and the result.

| Solid | Surface area |
|---|---|
| Rectangular prism | $2(lw + lh + wh)$ |
| Cube | $6s^2$ |
| Cylinder | $2\pi r^2 + 2\pi rh$ |
| Square pyramid | $s^2 + 2sl$ |
| Cone | $\pi r^2 + \pi rl$ |
| Sphere | $4\pi r^2$ |

For the pyramid and the cone, $l$ is the **slant height**, measured along the surface, not the vertical height. If you choose a slant height too short to reach the apex, the MicroSim explains why no such solid exists.

## How to Use

1. Choose a solid from the **Solid** menu. The sliders change to match its dimensions.
2. Drag the dimension sliders and watch the drawing, the substitution steps, and the result update.
3. Turn **Show work** off to hide the steps, calculate the answer yourself, and turn it back on to check.
4. Read the gray line under the steps to see how the total splits into bases and lateral surface.

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
Area of rectangles, triangles, and circles, and the names and parts of common solids.

### Bloom's Taxonomy Level
Apply (L3)

### Learning Objective
Students will be able to calculate the surface area of prisms, cylinders, pyramids, cones, and spheres and analyze how changing a dimension affects the surface area.

### Activities

1. **Practice** (6 min): With Show work off, students compute the surface area of three solids at dimensions of their choice and then check each answer.
2. **Analyze** (5 min): For the cylinder, students double the radius and then double the height instead, and compare the two effects on the surface area.
3. **Connect** (4 min): Students explain what each term of a formula represents on the drawing, for example the two circles and the wrapped rectangle of a cylinder.

### Assessment
Students compute the surface area of a cone with radius 6 and slant height 10 by hand, then decide whether a cone with radius 6 and slant height 5 can exist and justify the answer.

## References

1. Wikipedia. [Surface area](https://en.wikipedia.org/wiki/Surface_area).
2. Common Core State Standards Initiative. High School Geometry: Geometric Measurement and Dimension (HSG-GMD) and Modeling with Geometry (HSG-MG.A.1).
3. Wikipedia. [Cone](https://en.wikipedia.org/wiki/Cone).
