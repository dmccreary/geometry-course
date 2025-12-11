---
title: Sierpinski Carpet
description: An interactive MicroSim demonstrating the Sierpinski carpet fractal with adjustable recursion depth and size controls.
image: /sims/sierpinski-carpet/sierpinski-carpet.png
og:image: /sims/sierpinski-carpet/sierpinski-carpet.png
twitter:image: /sims/sierpinski-carpet/sierpinski-carpet.png
social:
   cards: false
---

# Sierpinski Carpet

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Sierpinski Carpet MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Sierpinski carpet is a plane fractal first described by Waclaw Sierpinski in 1916. It is a two-dimensional generalization of the Cantor set and is closely related to the Sierpinski triangle. The carpet demonstrates how removing portions of a shape at each iteration creates a fractal with fascinating mathematical properties.

## How It Works

1. **Start with a Square**: At recursion level 1, divide the square into a 3×3 grid of 9 equal smaller squares.

2. **Remove the Center**: Remove the center square, leaving 8 squares around the border filled with blue.

3. **Repeat**: For each higher recursion level, apply the same process to each of the 8 remaining squares - divide each into a 3×3 grid and remove its center.

4. **Iterate**: Continue this process, creating increasingly intricate patterns with more and more holes.

## Controls

- **Recursion Slider (1-6)**: Controls the depth of the fractal. Higher values create more detailed patterns with more holes.
- **Size Slider (50-100%)**: Adjusts the overall size of the carpet within the canvas.

## Mathematical Properties

The Sierpinski carpet has fascinating mathematical properties:

- **Fractal Dimension**: log(8)/log(3) ≈ 1.8928 (between a line and a plane)
- **Area**: Approaches zero as recursion approaches infinity (since 8/9 of the area remains at each step)
- **Self-Similarity**: Each of the 8 remaining squares is a smaller copy of the whole
- **Topological Properties**: The carpet is a universal curve - any curve in the plane can be mapped continuously into it

## Area Calculation

At each recursion level, 8/9 of the previous area remains:

| Level | Remaining Area |
|-------|----------------|
| 0 | 1 (full square) |
| 1 | 8/9 ≈ 0.889 |
| 2 | (8/9)² ≈ 0.790 |
| 3 | (8/9)³ ≈ 0.702 |
| n | (8/9)ⁿ → 0 |

## Comparison with Sierpinski Triangle

| Property | Sierpinski Carpet | Sierpinski Triangle |
|----------|------------------|---------------------|
| Base Shape | Square | Triangle |
| Subdivisions | 9 (3×3) | 4 |
| Parts Removed | 1 center | 1 center |
| Parts Remaining | 8 | 3 |
| Fractal Dimension | ≈1.893 | ≈1.585 |

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/sierpinski-carpet/main.html" height="562px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand how recursive subdivision creates fractal patterns
2. Calculate the remaining area at each recursion level
3. Compare 2D fractals (carpet) with 1D (Cantor set) and triangular (Sierpinski triangle) versions
4. Explore the concept of fractal dimension

### Activity Suggestions

1. **Count the Squares**: At level 1, there are 8 blue squares. At level 2, there are 64 (8×8). Can students find the pattern? (8ⁿ squares at level n)

2. **Area Investigation**: Calculate the total blue area at each level. What fraction of the original square remains?

3. **Compare Fractals**: Use the Sierpinski carpet alongside the Sierpinski triangle. How do they differ in construction and appearance?

4. **Pattern Recognition**: At level 2, look for the larger "holes" from level 1. How does the pattern nest within itself?

### Discussion Questions

- Why does the area approach zero but never reach it?
- How is removing the center square different from removing a corner square?
- What would happen if we removed more than one square at each level?
- Where might you see similar patterns in nature or architecture?

## Historical Context

Waclaw Sierpinski (1882-1969) was a Polish mathematician who made significant contributions to set theory, number theory, and topology. He described the Sierpinski carpet in 1916, along with the more famous Sierpinski triangle. These fractals were among the first to be mathematically described and studied.

## References

- [Wikipedia: Sierpinski Carpet](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_carpet)
- [Wolfram MathWorld: Sierpinski Carpet](https://mathworld.wolfram.com/SierpinskiCarpet.html)
- Sierpinski, W. (1916). "Sur une courbe cantorienne qui contient une image biunivoque et continue de toute courbe donnée"
