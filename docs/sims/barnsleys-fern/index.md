---
title: Barnsley's Fern
description: An interactive MicroSim demonstrating Barnsley's fern fractal with adjustable parameters for iterations, scale, leaf angle, and curl.
image: /sims/barnsleys-fern/barnsleys-fern.png
og:image: /sims/barnsleys-fern/barnsleys-fern.png
twitter:image: /sims/barnsleys-fern/barnsleys-fern.png
social:
   cards: false
---

# Barnsley's Fern

<iframe src="main.html" height="702px" width="100%" scrolling="no"></iframe>

[Run Barnsley's Fern MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

The Barnsley fern is a fractal named after the British mathematician Michael Barnsley who first described it in his 1988 book *Fractals Everywhere*. He designed it to resemble the black spleenwort (*Asplenium adiantum-nigrum*), a real fern species. This fractal is a beautiful example of how simple mathematical rules can create remarkably lifelike organic forms.

## How It Works

The Barnsley fern is created using an **Iterated Function System (IFS)**, which applies one of four affine transformations repeatedly to generate points:

1. **f1 (Stem)**: Creates the stem of the fern (1% probability)
2. **f2 (Main shape)**: Creates the overall fern shape and successively smaller leaflets (85% probability)
3. **f3 (Left leaflet)**: Creates the largest left-hand leaflet (7% probability)
4. **f4 (Right leaflet)**: Creates the largest right-hand leaflet (7% probability)

Each transformation is chosen randomly based on these probabilities, and the system iterates thousands of times to build up the fern image point by point.

## Controls

- **Iterations (10,000-200,000)**: Number of points to plot. More iterations create a denser, more detailed fern.
- **Scale (20-80)**: Controls the overall size of the fern display.
- **Leaf Angle (0-15°)**: Adjusts the angle at which leaflets branch from the stem.
- **Curl (0-10)**: Controls how much the fern tip curls over.
- **Black Spleenwort Preset**: Checkbox that sets all parameters to values that best resemble the black spleenwort fern.

## The Black Spleenwort

The black spleenwort (*Asplenium adiantum-nigrum*) is a species of fern native to Europe, Asia, and Africa. Key characteristics:

- Dark, glossy stems (stipes)
- Triangular fronds with pinnate leaflets
- Found on rocks, walls, and shaded banks
- Evergreen in mild climates

Barnsley specifically designed his fractal parameters to mimic this fern's distinctive appearance.

## Mathematical Foundation

### The Four Transformations

Each transformation has the form:

$$
\begin{pmatrix} x_{n+1} \\ y_{n+1} \end{pmatrix} = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x_n \\ y_n \end{pmatrix} + \begin{pmatrix} e \\ f \end{pmatrix}
$$

| Function | a | b | c | d | e | f | Probability |
|----------|---|---|---|---|---|---|-------------|
| f1 (Stem) | 0 | 0 | 0 | 0.16 | 0 | 0 | 1% |
| f2 (Main) | 0.85 | 0.04 | -0.04 | 0.85 | 0 | 1.6 | 85% |
| f3 (Left) | 0.2 | -0.26 | 0.23 | 0.22 | 0 | 1.6 | 7% |
| f4 (Right) | -0.15 | 0.28 | 0.26 | 0.24 | 0 | 0.44 | 7% |

## Embedding This MicroSim

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/barnsleys-fern/main.html" height="702px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

Students will be able to:

1. Understand how Iterated Function Systems create fractal patterns
2. Explore the relationship between mathematical parameters and visual appearance
3. Recognize self-similarity in fractal structures
4. Connect mathematical abstractions to natural forms

### Activity Suggestions

1. **Parameter Exploration**: Adjust each slider one at a time and observe how it affects the fern's appearance. Which parameter has the most dramatic effect?

2. **Iteration Investigation**: Start with low iterations (10,000) and gradually increase. How many iterations are needed before the fern looks "complete"?

3. **Create Your Own Fern**: Try to create different fern species by adjusting the parameters. Can you make a fern that looks different from the black spleenwort?

4. **Nature Connection**: Compare the fractal fern to photos of real ferns. Discuss what features are captured well and what is simplified.

### Discussion Questions

- Why do you think Barnsley chose a fern to model with fractals?
- How does self-similarity appear in the Barnsley fern?
- What other natural objects might be modeled with similar techniques?
- How does randomness (the probability of each transformation) contribute to the natural appearance?

## Historical Context

Michael Barnsley (born 1946) is a British mathematician who made significant contributions to fractal geometry and its applications. His work on Iterated Function Systems provided a mathematical framework for understanding and generating fractals. The Barnsley fern has become one of the most iconic examples of how mathematics can capture the essence of natural forms.

## References

- Barnsley, M. (1988). *Fractals Everywhere*. Academic Press.
- [Wikipedia: Barnsley Fern](https://en.wikipedia.org/wiki/Barnsley_fern)
- [Wikipedia: Black Spleenwort](https://en.wikipedia.org/wiki/Asplenium_adiantum-nigrum)
