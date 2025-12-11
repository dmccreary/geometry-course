---
title: Cesaro Curve
description: An interactive MicroSim demonstrating the Cesaro curve fractal (torn square) with adjustable recursion depth and size controls.
image: /sims/cesaro-curve/cesaro-curve.png
og:image: /sims/cesaro-curve/cesaro-curve.png
twitter:image: /sims/cesaro-curve/cesaro-curve.png
social:
   cards: false
---

# Cesaro Curve

<iframe src="main.html" height="662px" width="100%" scrolling="no"></iframe>

[Run the Cesaro Curve MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Cesaro Curve MicroSim on the p5.js editor](https://editor.p5js.org/dmccreary/sketches/NA7SxRZ_A)

## About This MicroSim

The Cesaro curve (also known as the torn square fractal) is a self-similar fractal that creates intricate, lace-like patterns. Named after Italian mathematician Ernesto Cesaro, this fractal demonstrates how repeated geometric transformations can create complex, visually striking curves from simple starting shapes.

## How It Works

1. **Start with a Divided Square**: At recursion level 1, you see a square divided into four quadrants by a cross (plus sign) in the center. This creates 12 line segments total.

2. **Apply the Cesaro Rule**: For each higher recursion level, every straight line segment is replaced by two segments:
   - The midpoint of each segment is displaced perpendicular to the original line
   - This creates a "bent" or "torn" appearance
   - The displacement is approximately 1/4 of the segment length

3. **Repeat**: This process is applied to every segment, creating increasingly intricate patterns that resemble torn paper or delicate lacework.

## Controls

- **Recursion Slider (1-7)**: Controls the depth of the fractal. Higher values create more detailed, lace-like patterns.
- **Size Slider (30-100%)**: Adjusts the overall size of the curve within the canvas.

## Mathematical Properties

The Cesaro curve has fascinating mathematical properties:

- **Self-Similarity**: Each segment becomes a smaller copy of the overall bent pattern
- **Quadrant Structure**: The initial cross creates four symmetric quadrants that evolve together
- **Perpendicular Displacement**: The bend is always perpendicular to the original segment direction
- **Fractal Dimension**: Approximately 1.78, between a line (1) and a plane (2)

## The Starting Pattern

Unlike some fractals that begin with a single line or triangle, the Cesaro curve starts with a square divided into quadrants:

- A square outline (4 segments, each split at the midpoint = 8 segments)
- A horizontal line through the center (2 segments)
- A vertical line through the center (2 segments)
- Total: 12 initial segments

This creates a more complex and visually interesting pattern as the recursion increases.

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/cesaro-curve/main.html" height="662px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand how perpendicular displacement creates fractal patterns
2. Observe the relationship between recursion depth and pattern complexity
3. Compare different fractal construction methods (Koch, Levy, Cesaro)
4. Explore how initial shape affects final fractal appearance

### Activity Suggestions

1. **Predict and Observe**: Before increasing recursion, have students predict how the pattern will change. Which areas will become most complex?

2. **Symmetry Analysis**: At each recursion level, identify the lines of symmetry. How does the four-quadrant structure maintain symmetry?

3. **Compare Fractals**: Use the Cesaro curve alongside the Koch snowflake and Levy C curve. How does starting with a divided square vs. a triangle affect the final pattern?

4. **Segment Counting**: At level 1, there are 12 segments. At level 2, there are 24. Can students find the pattern? (Each level doubles the segment count)

### Discussion Questions

- Why does the pattern look like "torn paper"?
- How does starting with a cross inside a square differ from starting with just a square outline?
- What happens to the corners of the original square as recursion increases?
- Where might you see similar grid-like patterns with organic distortions in nature or art?

## Historical Context

Ernesto Cesaro (1859-1906) was an Italian mathematician who contributed to many areas including differential geometry, number theory, and the study of infinite series. The Cesaro curve demonstrates principles he explored regarding geometric constructions and self-similarity.

## References

- [Wikipedia: Cesaro Fractal](https://en.wikipedia.org/wiki/Cesaro_fractal)
- [Wolfram MathWorld: Cesaro Curve](https://mathworld.wolfram.com/CesaroFractal.html)
