---
title: Levy C Curve
description: An interactive MicroSim demonstrating the Levy C curve fractal with adjustable recursion depth and size controls.
image: /sims/levy-c-curve/levy-c-curve.png
og:image: /sims/levy-c-curve/levy-c-curve.png
twitter:image: /sims/levy-c-curve/levy-c-curve.png
social:
   cards: false
---

# Levy C Curve

<iframe src="main.html" height="462px" width="100%" scrolling="no"></iframe>

[Run the Levy C Curve MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Levy C curve (also known as the Levy dragon or Levy tapestry) is a self-similar fractal curve discovered by French mathematician Paul Levy in 1938. This MicroSim allows you to explore how this elegant curve is constructed through recursive subdivision of line segments.

## How It Works

1. **Start with a Line**: At recursion level 1, you see a simple horizontal line segment.

2. **Apply the Levy Rule**: For each higher recursion level, every straight line segment is replaced by two segments:
   - The original segment becomes the hypotenuse of a right isosceles triangle
   - Two new segments are drawn as the legs of this triangle, meeting at a 90-degree angle at the apex

3. **Repeat**: This process is applied to every segment, creating increasingly detailed and complex patterns that resemble a "C" shape, hence the name.

## Controls

- **Recursion Slider (1-16)**: Controls the depth of the fractal. Higher values create more detailed curves with more intricate patterns.
- **Size Slider (50-100%)**: Adjusts the overall size of the curve within the canvas.

## Mathematical Properties

The Levy C curve has fascinating mathematical properties:

- **Self-Similarity**: The curve is made up of smaller copies of itself
- **Fractal Dimension**: The Levy C curve has a fractal dimension of 2, meaning it eventually fills a 2D region
- **Space-Filling**: As recursion approaches infinity, the curve becomes space-filling
- **45-Degree Angles**: Each recursion introduces segments at 45-degree angles to the original

## Comparison with Koch Curve

| Property | Koch Curve | Levy C Curve |
|----------|-----------|--------------|
| Angle | 60 degrees | 45 degrees |
| Segments per iteration | 4 | 2 |
| Fractal dimension | ~1.26 | 2 |
| Shape | Snowflake-like | C-shaped/Dragon-like |

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/levy-c-curve/main.html" height="462px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand how simple geometric rules create complex fractal patterns
2. Compare and contrast different fractal construction methods
3. Observe the relationship between recursion depth and visual complexity
4. Explore the concept of fractal dimension through visual observation

### Activity Suggestions

1. **Predict and Observe**: Before moving the recursion slider, have students predict what shape will emerge. Compare predictions with actual results.

2. **Count the Segments**: At level 1, there is 1 segment. At level 2, there are 2. Can students find the pattern? (Each level doubles the segment count: 2^(n-1))

3. **Compare Fractals**: Use both the Koch Snowflake and Levy C Curve MicroSims side by side. What similarities and differences do students notice?

4. **Angle Investigation**: At low recursion levels, measure the angles between segments. How do these angles contribute to the final shape?

### Discussion Questions

- Why do you think this is called a "C" curve?
- How does the Levy C curve differ from the Koch curve in its construction?
- What would happen if we used a different angle instead of 45 degrees?
- Where might you see similar branching patterns in nature?

## References

- Levy, Paul (1938). "Plane or Space Curves and Surfaces Consisting of Parts Similar to the Whole"
- [Wikipedia: Levy C Curve](https://en.wikipedia.org/wiki/L%C3%A9vy_C_curve)
