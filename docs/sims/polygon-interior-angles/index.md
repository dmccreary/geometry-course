---
title: Polygon Interior Angles Explorer
description: Interactive visualization of polygon interior angles showing the triangulation method and angle formulas.
image: /sims/polygon-interior-angles/polygon-interior-angles.png
og:image: /sims/polygon-interior-angles/polygon-interior-angles.png
twitter:image: /sims/polygon-interior-angles/polygon-interior-angles.png
social:
   cards: false
---

# Polygon Interior Angles Explorer

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive visualization demonstrates how the sum of interior angles in a polygon relates to the number of sides through triangulation.

## Key Formulas

### Interior Angle Sum
For a polygon with $n$ sides:

$$S = (n - 2) \times 180°$$

### Each Interior Angle (Regular Polygon)
For a regular polygon with $n$ sides:

$$I = \frac{(n - 2) \times 180°}{n}$$

### Exterior Angle (Regular Polygon)
$$e = \frac{360°}{n}$$

## How Triangulation Works

Any polygon can be divided into triangles by drawing diagonals from one vertex. A polygon with $n$ sides can be divided into $(n-2)$ triangles. Since each triangle has angles summing to 180°, the polygon's interior angles sum to $(n-2) \times 180°$.

## Interactions

- **Slider**: Change the number of sides (3-12)
- **Show Triangulation**: Toggle diagonal lines showing triangle divisions
- **Show Angles**: Toggle angle arc indicators

## Learning Objectives

- Apply the interior angle sum formula
- Understand why the formula works through triangulation
- Calculate individual angles in regular polygons

## Bloom's Taxonomy Level

**Applying** and **Understanding**
