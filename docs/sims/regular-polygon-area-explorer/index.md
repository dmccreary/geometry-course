---
title: Regular Polygon Area Explorer
description: Change the number of sides and the size of a regular polygon to see how its apothem, perimeter, and area are related by A = ½aP, and how the polygon approaches a circle.
image: /sims/regular-polygon-area-explorer/regular-polygon-area-explorer.png
og:image: /sims/regular-polygon-area-explorer/regular-polygon-area-explorer.png
twitter:image: /sims/regular-polygon-area-explorer/regular-polygon-area-explorer.png
social:
   cards: false
quality_score: 0
---

# Regular Polygon Area Explorer

<iframe src="main.html" height="557" width="100%" scrolling="no"></iframe>

[Run the Regular Polygon Area Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A regular polygon can be cut into congruent triangles that meet at its center. Each triangle has a base equal to one side $s$ and a height equal to the **apothem** $a$, the distance from the center to the midpoint of a side. Adding the $n$ triangles gives

$$A = n \cdot \tfrac{1}{2} s a = \tfrac{1}{2} a P$$

where $P = ns$ is the perimeter. The MicroSim draws the apothem (dashed red), the radius (blue), and one shaded triangle, and substitutes the current values into the formula.

The last panel compares the polygon with the circle drawn through its vertices. As the number of sides grows, the polygon fills more and more of that circle.

## How to Use

1. Drag **Number of sides** from 3 to 12 and watch the polygon's name, side length, apothem, perimeter, and area change.
2. Drag **Radius** to make the polygon larger or smaller without changing its shape.
3. Turn **Show triangle subdivision** off and on to see the n congruent triangles the formula is built from.
4. Watch the **Approaching a Circle** panel as the number of sides increases.

## Iframe Embed Code

```html
<iframe src="main.html"
        height="557"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Geometry)

### Duration
10-15 minutes

### Prerequisites
Area of a triangle, perimeter, and the definition of a regular polygon.

### Bloom's Taxonomy Level
Apply (L3)

### Learning Objective
Students will be able to calculate the area of a regular polygon with A = ½aP and analyze how the apothem, the perimeter, and the number of sides affect the area.

### Activities

1. **Derive** (4 min): With the subdivision showing, students explain in their own words why n triangles of base s and height a give A = ½aP.
2. **Calculate** (5 min): Students set n = 6 and a radius of their choice, compute the area by hand from the displayed a and P, and compare.
3. **Analyze** (5 min): Keeping the radius fixed, students record the percentage of the circle filled for n = 3, 4, 6, 8, and 12 and describe the trend.

### Assessment
Given a regular octagon with apothem 6.93 units and side length 5.74 units, students compute the perimeter and the area, then predict whether a regular 12-gon with the same radius has a larger or smaller area and justify the prediction.

## References

1. Wikipedia. [Regular polygon](https://en.wikipedia.org/wiki/Regular_polygon).
2. Wikipedia. [Apothem](https://en.wikipedia.org/wiki/Apothem).
3. Common Core State Standards Initiative. High School Geometry: Geometric Measurement and Dimension (HSG-GMD.A.1).
