---
title: Koch Snowflake
description: An interactive MicroSim demonstrating the Koch snowflake fractal with adjustable recursion depth and size controls.
image: /sims/koch-snowflake/koch-snowflake.png
og:image: /sims/koch-snowflake/koch-snowflake.png
twitter:image: /sims/koch-snowflake/koch-snowflake.png
social:
   cards: false
---

# Koch Snowflake

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the Koch Snowflake MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Koch Snowflake MicroSim with the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/a7gFbhYHB)
## About This MicroSim

The Koch snowflake is one of the earliest described fractal curves, first appearing in a 1904 paper by Swedish mathematician Helge von Koch. This MicroSim allows you to explore how the snowflake is constructed through recursive subdivision of line segments.

## How It Works

1. **Start with a Triangle**: At recursion level 1, you see an equilateral triangle with the point at the top.

2. **Apply the Koch Rule**: For each higher recursion level, every straight line segment is replaced by four segments:
   - The middle third of each segment is removed
   - Two new segments are added, forming an outward-pointing equilateral "bump"

3. **Repeat**: This process is applied to every segment, creating increasingly detailed and complex patterns.

## Controls

- **Recursion Slider (1-6)**: Controls the depth of the fractal. Higher values create more detailed snowflakes with more "bumps."
- **Size Slider (50-100%)**: Adjusts the overall size of the snowflake within the canvas.

## Mathematical Properties

The Koch snowflake has fascinating mathematical properties:

- **Infinite Perimeter**: As recursion approaches infinity, the perimeter grows without bound
- **Finite Area**: Despite the infinite perimeter, the area converges to exactly 8/5 times the area of the original triangle
- **Fractal Dimension**: The Koch curve has a fractal dimension of log(4)/log(3) ≈ 1.26

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/koch-snowflake/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand the concept of recursive geometric patterns
2. Observe how simple rules can generate complex shapes
3. Explore the relationship between recursion depth and visual complexity
4. Appreciate the mathematical beauty of fractals

### Activity Suggestions

1. **Predict and Observe**: Before moving the recursion slider, have students predict what will happen. Then test their predictions.

2. **Count the Segments**: At level 1, there are 3 segments. At level 2, there are 12. Can students find the pattern? (Each level multiplies the segment count by 4)

3. **Perimeter Investigation**: Calculate the perimeter at each level (assuming side length = 1). Notice how it grows by a factor of 4/3 each iteration.

4. **Compare with Nature**: Discuss how similar patterns appear in nature (coastlines, snowflakes, fern leaves).

### Discussion Questions

- Why do you think this is called a "snowflake"?
- What would happen if we could do infinite recursions?
- Where else in nature do you see similar repeating patterns at different scales?

## References

- Koch, Helge von (1904). "Sur une courbe continue sans tangente, obtenue par une construction géométrique élémentaire"
- [Wikipedia: Koch Snowflake](https://en.wikipedia.org/wiki/Koch_snowflake)
