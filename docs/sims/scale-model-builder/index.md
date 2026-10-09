---
title: Scale Model Builder
description: Pick a real object and a scale, then see how the lengths, floor area, and volume of the scale model compare with the original.
image: /sims/scale-model-builder/scale-model-builder.png
og:image: /sims/scale-model-builder/scale-model-builder.png
twitter:image: /sims/scale-model-builder/scale-model-builder.png
social:
   cards: false
quality_score: 0
---

# Scale Model Builder

<iframe src="main.html" height="582" width="100%" scrolling="no"></iframe>

[Run the Scale Model Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A scale of **1:k** means that every length on the model is the real length divided by $k$. Areas and volumes do not shrink by the same factor:

| Measurement | Divide the original by |
|---|---|
| Length | $k$ |
| Area | $k^2$ |
| Volume | $k^3$ |

The left panel shows the real object as a box with its dimensions in meters, beside a person 1.7 m tall. The right panel shows the model with its dimensions in centimeters, beside a 30 cm ruler. The three panels below work out one length, the floor area, and the volume.

At 1:20 a classroom that is 10 m long becomes a model 50 cm long, but its volume is divided by 8,000. This is why a model needs far less material than its size suggests.

Each object is drawn as the box that encloses it. The scale slider steps through scales in common use, including 1:12 for dollhouses, 1:50 for architectural models, and 1:87 for HO model trains.

## How to Use

1. Choose a real object from the **Object** menu.
2. Drag **Scale** from 1:5 to 1:100 and watch the model shrink beside the ruler.
3. Compare the three panels: which measurement shrinks fastest?
4. Find a scale at which the model of the house would fit on a desk.

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
Ratios and proportions, unit conversion between meters and centimeters, and area and volume of a rectangular prism.

### Bloom's Taxonomy Level
Apply (L3)

### Learning Objective
Students will be able to apply a scale factor to find the dimensions of a scale model and analyze how the scale affects length, area, and volume.

### Activities

1. **Convert** (5 min): Students choose an object and a scale, compute the three model dimensions by hand, and check them against the model panel.
2. **Compare** (5 min): Students record the divisors for length, area, and volume at 1:10 and 1:20 and explain why doubling k multiplies them by 2, 4, and 8.
3. **Design** (5 min): Students choose a scale so that a model of the classroom fits on a 60 cm by 60 cm board, and estimate the cardboard needed for the floor.

### Assessment
A model car is 18 cm long and the real car is 4.5 m long. Students find the scale, then determine how many times greater the real car's volume is than the model's.

## References

1. Wikipedia. [Scale model](https://en.wikipedia.org/wiki/Scale_model).
2. Wikipedia. [Square-cube law](https://en.wikipedia.org/wiki/Square%E2%80%93cube_law).
3. Common Core State Standards Initiative. High School Geometry: Modeling with Geometry (HSG-MG.A.3).
