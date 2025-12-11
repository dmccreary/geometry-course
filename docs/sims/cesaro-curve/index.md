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

## About This MicroSim

The Cesaro curve (also known as the torn square or Cesaro fractal) is a self-similar fractal that creates intricate, lace-like patterns from a simple square. Named after Italian mathematician Ernesto Cesaro, this fractal demonstrates how repeated geometric transformations can create complex, space-filling curves.

## How It Works

1. **Start with a Square**: At recursion level 1, you see a simple square with four straight sides.

2. **Apply the Cesaro Rule**: For each higher recursion level, every straight line segment is replaced by a bent segment:
   - The line is replaced by two segments meeting at an 85-degree angle
   - This creates a "torn" or "bent" appearance
   - The bend direction alternates to create balanced patterns

3. **Repeat**: This process is applied to every segment, creating increasingly intricate patterns that resemble torn paper or lace.

## Controls

- **Recursion Slider (1-10)**: Controls the depth of the fractal. Higher values create more detailed, lace-like patterns.
- **Size Slider (50-100%)**: Adjusts the overall size of the curve within the canvas.

## Mathematical Properties

The Cesaro curve has fascinating mathematical properties:

- **Self-Similarity**: Each side of the square becomes a smaller copy of the overall pattern
- **Bend Angle**: The characteristic 85-degree angle creates the distinctive torn appearance
- **Space-Filling Tendency**: As recursion increases, the curve fills more of the available space
- **Fractal Dimension**: Approximately 1.78, between a line (1) and a plane (2)

## The 85-Degree Angle

The choice of 85 degrees is not arbitrary. This angle:

- Creates aesthetically pleasing, balanced patterns
- Ensures the curve segments don't overlap too much at low recursion levels
- Produces the characteristic "torn paper" appearance
- Is close enough to 90 degrees to maintain a square-like overall shape

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/cesaro-curve/main.html" height="662px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand how angle choices affect fractal appearance
2. Observe the relationship between recursion depth and pattern complexity
3. Compare different fractal construction methods
4. Explore how simple rules create complex, beautiful patterns

### Activity Suggestions

1. **Predict and Observe**: Before increasing recursion, have students predict how the pattern will change. What shape will emerge?

2. **Count the Bends**: At level 1, there are 4 straight sides. At level 2, each side has 1 bend. How does the number of bends grow with each level?

3. **Compare Fractals**: Use the Cesaro curve alongside the Koch snowflake and Levy C curve. What similarities and differences do students notice in construction methods?

4. **Angle Exploration**: Discuss what would happen with different bend angles. How would 60 degrees differ from 85 degrees?

### Discussion Questions

- Why is this called a "torn square"?
- How does the 85-degree angle affect the final appearance?
- What happens to the perimeter as recursion increases?
- Where might you see similar patterns in nature or art?
- How does the Cesaro curve compare to the Koch snowflake?

## Historical Context

Ernesto Cesaro (1859-1906) was an Italian mathematician who contributed to many areas including differential geometry and number theory. The Cesaro curve demonstrates principles he explored regarding infinite series and geometric constructions.

## References

- [Wikipedia: Cesaro Fractal](https://en.wikipedia.org/wiki/Cesaro_fractal)
- [Wolfram MathWorld: Cesaro Curve](https://mathworld.wolfram.com/CesaroFractal.html)
