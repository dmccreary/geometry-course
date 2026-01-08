---
title: Slope Explorer and Calculator
description: Interactive slope visualization with draggable points and real-time slope calculation.
image: /sims/slope-explorer/slope-explorer.png
og:image: /sims/slope-explorer/slope-explorer.png
twitter:image: /sims/slope-explorer/slope-explorer.png
social:
   cards: false
quality_score: 85
---

# Slope Explorer and Calculator

<iframe src="main.html" height="752px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool lets you explore slope by dragging two points and watching the slope calculation update in real-time. The line color changes based on the slope type, and rise/run indicators show the components of the slope.

## How to Use

1. **Drag Points**: Click and drag the blue point (A) or red point (B) anywhere on the grid
2. **Watch Slope**: The slope calculation updates automatically as you move points
3. **Observe Line Color**: Red (positive), purple (negative), green (zero), orange (undefined)

## Controls

| Button | Function |
|--------|----------|
| **Random Line** | Generate random positions for both points |
| **Hide/Show Rise/Run** | Toggle the rise and run arrows |
| **Hide/Show Extension** | Toggle line extension beyond the points |
| **Snap: ON/OFF** | Toggle grid snapping for dragged points |

## Line Colors by Slope Type

| Color | Slope Type | Meaning |
|-------|------------|---------|
| **Red** | Positive (m > 0) | Line rises from left to right |
| **Purple** | Negative (m < 0) | Line falls from left to right |
| **Green** | Zero (m = 0) | Horizontal line |
| **Orange** | Undefined | Vertical line |

## Learning Objectives

- **Apply** the slope formula to calculate slope from two points
- **Analyze** how changing points affects slope value and direction
- **Evaluate** slope type based on visual representation

## Bloom's Taxonomy Level

**Applying**, **Analyzing**, and **Evaluating** - Interactive exploration and interpretation.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/slope-explorer/main.html"
        height="752px"
        width="100%"
        scrolling="no"></iframe>
```
