---
title: Peano-Gosper Fractal
description: An interactive MicroSim demonstrating the Peano-Gosper curve (Gosper curve or flowsnake) with adjustable recursion depth and size controls.
image: /sims/peano-gosper-fractal/peano-gosper-fractal.png
og:image: /sims/peano-gosper-fractal/peano-gosper-fractal.png
twitter:image: /sims/peano-gosper-fractal/peano-gosper-fractal.png
social:
   cards: false
---

# Peano-Gosper Fractal

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Peano-Gosper Fractal MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Peano-Gosper Fractal MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/gKdgsFyQw)

## About This MicroSim

The Peano-Gosper curve (also known as the Gosper curve or flowsnake) is a space-filling fractal curve discovered by Bill Gosper. It is based on hexagonal geometry and creates beautiful, organic-looking patterns that tile the plane. The name "flowsnake" is a play on "snowflake" due to its visual similarity to a flowing, snake-like snowflake pattern.

## How It Works

The Gosper curve is generated using an L-system (Lindenmayer system), a formal grammar that produces complex patterns through simple string rewriting rules:

1. **Start with a Symbol**: Begin with the symbol 'A'

2. **Apply Rewriting Rules**: For each iteration:
   - Replace 'A' with: `A-B--B+A++AA+B-`
   - Replace 'B' with: `+A-BB--B-A++A+B`

3. **Interpret as Turtle Graphics**:
   - 'A' or 'B': Move forward
   - '+': Turn left 60 degrees
   - '-': Turn right 60 degrees

4. **Repeat**: Each recursion level applies these rules again, creating more intricate patterns.

## Controls

- **Recursion Slider (1-5)**: Controls the depth of the fractal. Higher values create more detailed, space-filling patterns.
- **Size Slider (30-100%)**: Adjusts the overall size of the curve within the canvas.

## Mathematical Properties

The Peano-Gosper curve has fascinating mathematical properties:

- **Space-Filling**: As recursion increases, the curve fills a hexagonal region
- **Growth Factor**: The curve grows by a factor of √7 with each iteration
- **60-Degree Angles**: All turns are multiples of 60 degrees, creating hexagonal symmetry
- **Fractal Dimension**: Exactly 2 (it is a space-filling curve)
- **Self-Similarity**: The curve is made of 7 smaller copies of itself

## L-System Specification

| Component | Value |
|-----------|-------|
| Axiom | A |
| Rule A | A-B--B+A++AA+B- |
| Rule B | +A-BB--B-A++A+B |
| Angle | 60° |

## Comparison with Other Space-Filling Curves

| Curve | Base Shape | Angle | Growth Factor |
|-------|-----------|-------|---------------|
| Peano-Gosper | Hexagonal | 60° | √7 ≈ 2.646 |
| Hilbert | Square | 90° | 2 |
| Peano | Square | 90° | 3 |

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/peano-gosper-fractal/main.html" height="562px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand how L-systems generate complex fractals from simple rules
2. Explore the relationship between recursion and visual complexity
3. Recognize hexagonal symmetry in mathematical patterns
4. Understand the concept of space-filling curves

### Activity Suggestions

1. **Trace the Pattern**: At low recursion levels, have students trace the path of the curve with their finger. How does the pattern repeat?

2. **Count the Segments**: At level 1, count the line segments. At level 2, count again. Can students find the pattern? (Segments multiply by 7 each level)

3. **Hexagonal Tiling**: Discuss how the Gosper curve can tile a plane using hexagonal shapes. What other shapes tile the plane?

4. **L-System Exploration**: Write out the first few iterations of the L-system string by hand to understand how the rules work.

### Discussion Questions

- Why is this called a "flowsnake"?
- How does hexagonal geometry differ from square geometry in fractals?
- What would happen if we used 90-degree angles instead of 60-degree angles?
- Where might you see similar patterns in nature (honeycomb, crystals)?

## Historical Context

Bill Gosper discovered this curve in the 1970s while working on computer graphics and recreational mathematics. The curve is part of a family of space-filling curves that includes the Hilbert curve and Peano curve. Gosper was also known for his work on continued fractions and the game of Life.

## References

- [Wikipedia: Gosper Curve](https://en.wikipedia.org/wiki/Gosper_curve)
- [Wolfram MathWorld: Gosper Island](https://mathworld.wolfram.com/GosperIsland.html)
- Prusinkiewicz, P., & Lindenmayer, A. (1990). "The Algorithmic Beauty of Plants"
