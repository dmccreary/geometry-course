---
title: Interactive Triangle Classifier
description: Drag triangle vertices to create and classify triangles by sides and angles in real-time.
image: /sims/triangle-classifier/triangle-classifier.png
og:image: /sims/triangle-classifier/triangle-classifier.png
twitter:image: /sims/triangle-classifier/triangle-classifier.png
social:
   cards: false
quality_score: 90
---

# Interactive Triangle Classifier

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool allows you to create and classify triangles by dragging vertices. The classification updates in real-time as you move the vertices.

## How to Use

1. **Drag vertices A, B, or C** to change the triangle shape
2. Watch the classification update automatically
3. Use **Reset** to return to the default triangle
4. Use **Random** to generate a random triangle
5. Toggle **Grid** and **Measurements** display

## Classification System

### By Sides
| Type | Definition |
|------|------------|
| **Scalene** | All three sides different |
| **Isosceles** | Two sides equal |
| **Equilateral** | All three sides equal |

### By Angles
| Type | Definition | Color |
|------|------------|-------|
| **Acute** | All angles < 90° | Purple |
| **Right** | One angle = 90° | Red |
| **Obtuse** | One angle > 90° | Teal |

## Visual Markers

- **Tick marks** indicate equal sides (congruent)
- **Right angle square** marks 90° angles
- **Color** indicates angle classification

## Key Facts

- Every triangle has exactly ONE classification by sides AND ONE by angles
- Equilateral triangles are always acute
- A triangle can be "isosceles and right" or "scalene and obtuse"

## Learning Objectives

- **Understand** the dual classification system for triangles
- **Apply** classification rules to various triangles
- **Analyze** how changing vertices affects classification

## Bloom's Taxonomy Level

**Understanding**, **Applying**, and **Analyzing**

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/triangle-classifier/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```
