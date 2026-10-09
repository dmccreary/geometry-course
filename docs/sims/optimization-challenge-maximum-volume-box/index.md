---
title: Optimization Challenge - Maximum Volume Box
description: Choose the size of the square cut from each corner of a cardboard sheet and find the cut that folds into the open box with the greatest volume.
image: /sims/optimization-challenge-maximum-volume-box/optimization-challenge-maximum-volume-box.png
og:image: /sims/optimization-challenge-maximum-volume-box/optimization-challenge-maximum-volume-box.png
twitter:image: /sims/optimization-challenge-maximum-volume-box/optimization-challenge-maximum-volume-box.png
social:
   cards: false
quality_score: 0
---

# Optimization Challenge - Maximum Volume Box

<iframe src="main.html" height="582" width="100%" scrolling="no"></iframe>

[Run the Optimization Challenge - Maximum Volume Box MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A square sheet of cardboard has a square of side $x$ cut from each corner. Folding up the four flaps makes an open box with a square base of side $L - 2x$ and a height of $x$, so its volume is

$$V(x) = (L - 2x)^2 \, x$$

A small cut gives a wide, shallow box. A large cut gives a tall box with almost no base. Somewhere between is the cut with the greatest volume.

The MicroSim shows the flat pattern, the folded box, the volume calculation, and a graph of volume against cut size. The **percent of the largest possible volume** tells you how close you are without giving the answer away. Press **Show Maximum** only after you have made your best attempt.

## How to Use

1. Drag **Cut size x** and watch the pattern, the box, the calculation, and the red point on the graph move together.
2. Use the percent readout to home in on the largest volume.
3. Press **Show Maximum** to mark the true maximum on the graph, and **Hide Maximum** to remove it.
4. Press **New Sheet Size** to try the same problem with a different sheet.

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
Volume of a rectangular prism, evaluating an expression for a given value, and reading a graph.

### Bloom's Taxonomy Level
Analyze (L4)

### Learning Objective
Students will be able to analyze how the cut size changes the volume of an open box made from a square sheet, and determine the cut size that maximizes the volume.

### Activities

1. **Explore** (5 min): Students try x = 1, 3, 5, 7, and 9 on the 30 cm sheet, record the volumes, and describe the shape of the box in each case.
2. **Optimize** (5 min): Without pressing Show Maximum, students find the cut size that gives 100% of the largest volume, to the nearest tenth of a centimeter.
3. **Generalize** (5 min): Students repeat for three other sheet sizes, tabulate the sheet size and the best cut, and conjecture a rule (the best cut is one sixth of the side).

### Assessment
A sheet measures 42 cm on each side. Students predict the best cut size from their conjecture, write the volume expression, compute the maximum volume, and explain why both very small and very large cuts give small volumes.

## References

1. Wikipedia. [Mathematical optimization](https://en.wikipedia.org/wiki/Mathematical_optimization).
2. Common Core State Standards Initiative. High School Geometry: Modeling with Geometry (HSG-MG.A.3).
3. Stewart, J. (2015). *Calculus: Early Transcendentals* (8th ed.), Section 4.7, Optimization Problems. Cengage Learning.
