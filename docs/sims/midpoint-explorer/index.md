---
title: Midpoint Explorer with Verification
description: Interactive exploration of the midpoint formula with draggable points and distance verification.
image: /sims/midpoint-explorer/midpoint-explorer.png
og:image: /sims/midpoint-explorer/midpoint-explorer.png
twitter:image: /sims/midpoint-explorer/midpoint-explorer.png
social:
   cards: false
quality_score: 85
---

# Midpoint Explorer with Verification

<iframe src="main.html" height="702px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool lets you explore the midpoint formula by dragging points and watching the midpoint update in real-time. The verification panel confirms that the midpoint is equidistant from both endpoints.

## How to Use

1. **Drag Points**: Click and drag the blue point (A) or red point (B) anywhere on the grid
2. **Watch Midpoint**: The green point (M) automatically moves to the midpoint position
3. **Verify Distances**: Check that d₁ (A to M) equals d₂ (M to B)

## Controls

| Button | Function |
|--------|----------|
| **Random Points** | Generate new random positions for A and B |
| **Hide/Show Distances** | Toggle distance indicators on the segment |
| **Hide/Show Steps** | Toggle calculation step display |
| **Snap: ON/OFF** | Toggle grid snapping for dragged points |

## Key Concepts

- **Midpoint Formula**: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
- **Verification**: The midpoint is always equidistant from both endpoints
- **Averaging**: The midpoint coordinates are the averages of the endpoint coordinates

## Learning Objectives

- **Apply** the midpoint formula to find midpoints interactively
- **Evaluate** results by verifying equal distances from endpoints
- **Analyze** how changing endpoints affects the midpoint position

## Bloom's Taxonomy Level

**Applying** and **Evaluating** - Interactive formula application with verification.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/midpoint-explorer/main.html"
        height="702px"
        width="100%"
        scrolling="no"></iframe>
```
