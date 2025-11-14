---
title: Circle Area Explorer
description: An interactive MicroSim that demonstrates the quadratic relationship between a circle's radius and its area using the formula A = πr². Students can manipulate the radius using a slider or by dragging directly within the circle, with an optional graph showing the quadratic curve.
quality_score: 100
image: /sims/circle-area-explorer/circle-area-explorer.png
og:image: /sims/circle-area-explorer/circle-area-explorer.png
---

# Circle Area Explorer

<iframe src="main.html" height="375pt" width="100%"></iframe>

[Run the Circle Area Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

[Edit the Circle Area Explorer MicroSim with the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/yoCpStC96)

## Copy this iframe to embed in your website:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/circle-area-explorer/main.html" width="100%" height="600px"></iframe>
```

## Description

The Circle Area Explorer is an interactive visualization that helps students understand the quadratic relationship between a circle's radius and its area. Using the formula A = πr², students can see in real-time how changes to the radius affect the circle's area.

## How to Use

1. **Adjust the Radius**: Use the slider at the bottom of the canvas to change the circle's radius, or directly drag the small orange circle at the end of the radius line
2. **Observe the Area**: Watch how the area value updates as you change the radius
3. **Toggle the Graph**: Click the "Toggle Plot" button to display a graph showing the quadratic relationship between radius and area
4. **Analyze the Curve**: Notice how the area grows much faster than the radius due to the squared term in the formula

### Prerequisites

- Basic understanding of circles and radius
- Familiarity with the constant π (pi)
- Basic algebra skills (understanding squared terms)

### Features:

1.  **Interactive Radius Slider and Direct Manipulation**:

- Adjusts the circle radius dynamically by allowing you to drag the radius or change the slider
- As you change the radius, the labels for radius and the area calculations are displayed
- You can turn on a graph to the right of the circle to display the relationship between the radius and the area
- You can show the quadratic shape of the curve

Illustrates how the area of the circle grows quadratically with increasing radius.

### Learning Outcomes:

-   Students visualize the quadratic relationship $A = \pi r^2$
-   Observe that area increases faster than the radius due to the quadratic term.

## Lesson Plan

### Target Audience

High school geometry students (grades 9-10) who have completed basic algebra and are beginning their study of circles and area.

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Remember**: Recall the formula for the area of a circle (A = πr²)
2. **Understand**: Explain why the area grows quadratically as the radius increases
3. **Apply**: Calculate the area of a circle given its radius
4. **Analyze**: Compare the rate of change between radius and area using the graphical representation
5. **Evaluate**: Predict how doubling or tripling the radius affects the area

### Time Required

30-45 minutes

### Materials Needed

- Computer or tablet with internet access
- Circle Area Explorer MicroSim
- Student worksheet (optional)
- Calculator

### Lesson Activities

#### Introduction (5 minutes)

1. Ask students: "If you double the radius of a circle, what happens to its area?"
2. Have students make predictions and discuss with a partner
3. Introduce the formula A = πr² and explain each component

#### Guided Exploration (15 minutes)

1. **Initial Exploration**: Have students open the MicroSim and experiment with the radius slider
   - Start with radius = 50, observe the area
   - Change to radius = 100 (double), observe the new area
   - Ask: "Did the area double? Why or why not?"

2. **Direct Manipulation**: Show students they can drag the orange circle to change the radius
   - Have them set specific radius values (e.g., 25, 50, 75, 100, 125)
   - Record the corresponding areas in a table

3. **Graph Analysis**: Click "Toggle Plot" to show the quadratic curve
   - Discuss why the curve is not a straight line
   - Identify the parabolic shape
   - Compare small radius changes (10 to 20) vs. large radius changes (100 to 110)

#### Practice Problems (10 minutes)

Have students use the MicroSim to verify their calculations:

1. If a circle has radius 30 units, what is its area?
2. If you want a circle with area approximately 10,000 square units, what radius do you need?
3. A pizza has radius 8 inches. If you upgrade to a pizza with radius 12 inches, how much more area (pizza) do you get?

#### Discussion and Reflection (5-10 minutes)

1. Why is the relationship between radius and area quadratic rather than linear?
2. What real-world applications involve calculating circle areas?
3. How does the formula A = πr² relate to squares (where A = s²)?

### Assessment

**Formative Assessment:**

- Observe student interactions with the MicroSim
- Check student data tables for accuracy
- Listen to pair discussions about predictions vs. observations

**Summative Assessment Questions:**

1. A circular garden has a radius of 5 meters. What is its area? (Use π ≈ 3.14)
2. If the radius of a circle triples, by what factor does the area increase?
3. Explain in your own words why doubling the radius more than doubles the area
4. Sketch a graph showing how circle area changes as radius increases from 0 to 100

### Extensions

**For Advanced Students:**

- Explore the relationship between diameter and area
- Compare circle area to the area of a square with side length equal to the radius
- Investigate how circumference changes with radius (linear relationship)
- Calculate the area of circular rings (annulus) by subtracting two circle areas

**Cross-Curricular Connections:**

- **Physics**: Discuss how area affects quantities like force per unit area (pressure)
- **Real-world applications**: Pizza sizes, satellite coverage areas, speaker sound dispersion
- **Art**: Create designs using multiple circles with different radii

## References

* [Sample ChatGPT Dialog to generate the first version of the MicroSim](https://chatgpt.com/share/674dd14f-2834-8001-9b6b-a380dc79ae10)
* [Sample ChatGPT Dialog to add direct manipulation of the radius within the circle](https://chatgpt.com/share/674dd03a-7454-8001-af93-87f29e31f42c)

## Enhancements

Place a radius horizontal line in the circle and add the text of the radius at the midpoint of that line.
Allow the user to drag any point on the circle to change the radius.
