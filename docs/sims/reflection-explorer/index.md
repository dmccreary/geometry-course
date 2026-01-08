---
title: Reflection Explorer
description: Interactive tool for exploring reflections with selectable mirror lines including custom positions.
image: /sims/reflection-explorer/reflection-explorer.png
og:image: /sims/reflection-explorer/reflection-explorer.png
twitter:image: /sims/reflection-explorer/reflection-explorer.png
social:
   cards: false
quality_score: 85
---

# Reflection Explorer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool lets you explore reflections over various lines including the axes, diagonal lines, and custom vertical/horizontal lines at position k.

## How to Use

1. **Select a line of reflection** using the buttons (x-axis, y-axis, y=x, y=-x, x=k, y=k)
2. **Adjust k slider** when using x=k or y=k lines
3. **Click "Animate"** to see the reflection happen
4. **Toggle "Dist"** to show/hide perpendicular distance lines

## Available Lines

| Line | Coordinate Rule |
|------|-----------------|
| **x-axis** | (x, y) → (x, -y) |
| **y-axis** | (x, y) → (-x, y) |
| **y = x** | (x, y) → (y, x) |
| **y = -x** | (x, y) → (-y, -x) |
| **x = k** | (x, y) → (2k - x, y) |
| **y = k** | (x, y) → (x, 2k - y) |

## Key Concepts

- Points and images are equidistant from the line of reflection
- The line acts as a perpendicular bisector
- Orientation reverses in reflections

## Learning Objectives

- **Apply** reflections over various lines
- **Analyze** perpendicular distance preservation

## Bloom's Taxonomy Level

**Applying** and **Analyzing** - Interactive exploration of reflections.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/reflection-explorer/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```
