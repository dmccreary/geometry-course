---
title: Triangle Inequality Explorer
description: Interactive tool to test which combinations of side lengths can form a valid triangle.
image: /sims/triangle-inequality-explorer/triangle-inequality-explorer.png
og:image: /sims/triangle-inequality-explorer/triangle-inequality-explorer.png
twitter:image: /sims/triangle-inequality-explorer/triangle-inequality-explorer.png
social:
   cards: false
quality_score: 90
---

# Triangle Inequality Explorer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool demonstrates the Triangle Inequality Theorem by allowing you to test different combinations of side lengths and see whether they can form a valid triangle.

## How to Use

1. **Adjust the sliders** to set the lengths of sides a, b, and c
2. **Watch the construction** attempt to form a triangle
3. **Check the inequalities** displayed in the top left
4. **See the result** at the bottom showing whether a triangle can form

## Triangle Inequality Theorem

**The sum of the lengths of any two sides of a triangle must be greater than the length of the third side.**

All three conditions must be satisfied:
- a + b > c
- b + c > a
- a + c > b

## Visual Feedback

### Valid Triangle (Green)
- Arcs intersect at point C
- Complete triangle is drawn
- All three inequalities show ✓

### Invalid Triangle (Red)
- Arcs do not intersect
- Gap shown between arcs
- Failed inequality shows ✗

## Key Insights

- The **longest side** determines the "critical" inequality
- If the two shorter sides don't sum to more than the longest, no triangle forms
- When a + b = c exactly, you get a straight line (degenerate case)

## Learning Objectives

- **Understand** the Triangle Inequality Theorem
- **Apply** the theorem to determine valid triangles
- **Evaluate** which side length combinations work

## Bloom's Taxonomy Level

**Understanding**, **Applying**, and **Evaluating**

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/triangle-inequality-explorer/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```
