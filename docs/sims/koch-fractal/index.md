---
title: Koch Fractal
description: An interactive visualization demonstrating the iterative construction of the Koch curve, a classic fractal with self-similar patterns at every scale.
image: /sims/koch-fractal/koch-fractal.png
og:image: /sims/koch-fractal/koch-fractal.png
twitter:image: /sims/koch-fractal/koch-fractal.png
social:
   cards: false
---

# Koch Fractal

<iframe src="main.html" height="352px" width="100%" scrolling="no"></iframe>

[Run the Koch Fractal MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/koch-fractal/main.html" height="352px" width="100%" scrolling="no"></iframe>
```

## Description

The Koch Fractal (also known as the Koch Curve or Koch Snowflake when arranged in a triangle) is one of the earliest and most famous examples of a fractal curve. This MicroSim demonstrates the iterative construction process that creates this remarkable mathematical object.

At recursion level 0, the curve is simply a straight line. With each iteration:
1. Each line segment is divided into three equal parts
2. The middle third is replaced with two sides of an equilateral triangle
3. This process repeats for every line segment

### Key Properties

- **Self-Similarity**: The curve looks similar at any magnification level
- **Infinite Length**: With each iteration, the length increases by 4/3, approaching infinity
- **Finite Area**: Despite infinite length, the curve encloses a finite area
- **Dimension**: The Koch curve has a fractal dimension of approximately 1.26, between a line (1D) and a plane (2D)

## Learning Objectives

Students using this MicroSim will:

- Understand how simple iterative rules can create complex patterns
- Explore the concept of self-similarity in fractals
- Observe how mathematical infinity can be approached through finite iterations
- Connect geometric transformations with fractal generation
- Appreciate the beauty and complexity of mathematical structures

## Lesson Plan

### Introduction (5 minutes)
- Start with recursion level 0 to show the baseline
- Ask students: "What do you think will happen at level 1?"
- Discuss the concept of iteration and replacement rules

### Exploration (10-15 minutes)
1. **Pattern Recognition**: Have students increment the recursion level slowly (0→1→2→3)
   - Observe and sketch what happens at each level
   - Count the number of line segments at each level
   - Notice the self-similar pattern

2. **Mathematical Investigation**:
   - If the original line length is 1 unit, what is the length at each level?
   - Level 0: 1 unit
   - Level 1: 4/3 units
   - Level 2: (4/3)² units
   - Level n: (4/3)ⁿ units

3. **Complexity Observation**:
   - At what recursion level does the curve become too complex to draw individual segments?
   - How many line segments are there at level 6? (4⁶ = 4,096 segments)

### Extension Activities

- **Koch Snowflake**: Explain that three Koch curves arranged in a triangle create the famous Koch Snowflake
- **Fractal Dimension**: Introduce the concept using the formula: D = log(4)/log(3) ≈ 1.26
- **Nature Connection**: Discuss where fractal-like patterns appear in nature (coastlines, trees, clouds, blood vessels)
- **Art and Design**: Have students create artwork inspired by fractal patterns

### Assessment Questions

1. How does the length of the curve change with each iteration?
2. Will the curve ever reach a point where it stops changing? Why or why not?
3. What makes this curve "fractal"?
4. Can you think of examples in nature that show similar self-repeating patterns?

## Prerequisites

- Basic understanding of line segments and geometric transformations
- Familiarity with the concept of iteration
- Knowledge of equilateral triangles (helpful but not required)

## Grade Level

Grades 9-12 (High School Geometry, Pre-Calculus, or Computer Science)

## Duration

15-20 minutes for exploration and discussion

## Mathematical Background

The Koch curve was first described by Swedish mathematician Helge von Koch in 1904. It serves as one of the simplest examples demonstrating that:

- A curve can have infinite length while enclosing a finite area
- Continuous curves need not be differentiable at any point
- Simple recursive rules can generate infinitely complex patterns

The construction algorithm is deterministic and can be easily programmed, making it an excellent introduction to both fractals and recursive algorithms in computer science.

## Related Concepts

- **Fractals**: Mandelbrot Set, Sierpiński Triangle, Cantor Set
- **Recursion**: Self-referential processes in mathematics and computer science
- **Dimension Theory**: Understanding dimensions beyond integers
- **Infinite Series**: Geometric series and convergence
- **Chaos Theory**: Sensitivity to initial conditions and pattern formation

---

*This MicroSim was created to help students visualize the iterative construction of fractals and understand how simple rules can generate complex mathematical structures.*
