---
title: Triangle Congruence
description: An interactive MicroSim demonstrating triangle congruence postulates including SSS (Side-Side-Side) and SAS (Side-Angle-Side).
quality_score: 40
image: /sims/triangle-congruence/triangle-congruence.png
og:image: /sims/triangle-congruence/triangle-congruence.png
---

# Triangle Congruence

<iframe src="triangle-congruence.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Triangle Congruence MicroSim Fullscreen](./triangle-congruence.html){ .md-button .md-button--primary }

**Copy this iframe to embed in your website:**

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/triangle-congruence/triangle-congruence.html" width="100%" height="500px" scrolling="no"></iframe>
```

## Description

This MicroSim demonstrates triangle congruence postulates, helping students understand when two triangles are guaranteed to be congruent. Students can explore SSS (Side-Side-Side) and SAS (Side-Angle-Side) congruence by manipulating triangle parameters.

## Congruence Triangles MicroSim

## Prompt

```linenums="0"

Prompt Name: Triangles Congruence MicroSim in p5.js

You are a expert at generating interactive p5.js sketches to help
students learn basic high-school level geometry.
You create p5.js sketches that are part of a geometry course is offered to
students in the 9th through 12th grade.
Students have taken basic algebra courses and they
understand equations. 
You are helping geometry teachers explain concepts in geometry.

The topic for this MicroSim is Triangles Congruence.

Create a p5.js sketch that will illustrates how different triangle congruence postulates work.
Use SSS and SAS as an example.

Place a triangle in the center of the canvas.
Add sliders to change the parameters (SSS or SAS)

Use the following p5.js guidelines.

```

```js
// Sample MicroSim Template for 2D Geometry

// MicroSim Template for 2D geometry with region drawing parameters
// Use for an instructor standing in front of a "smart white board" with conrols on the bottom
// Author: Dan McCreary
// Version geometry-1
// This template puts a control region below the active drawing region of the canvas
// the width of the entire canvas
// No HTML should be placed above the drawing region so the MicroSim can be placed on a page with an iFrame
let canvasWidth = 600;
// The top drawing region above the interactive controls
let drawWidth = canvasWidth;
let drawHeight = 400;
// the control region os where we place sliders and buttons
// height of the region that contains all the controls
let controlHeight = 40;
// The total hight of both the drawing region height + the control region height
let canvasHeight = drawHeight + controlHeight;
// margin around the active plotting region
let margin = 25;
// the left margin area needs to hold the width of the text label and value
let sliderLeftMargin = 130;
// larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    // canvas.parent('canvas-container');
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // create a new slider at th bottom of the canvas in the control region
    mySlider = createSlider(0, 300, 100, 1);
    // position the slider below the drawing region
    mySlider.position(sliderLeftMargin, drawHeight + 20);
    // make the slider width fill the area to the right of the label and value of the slider
    mySlider.size(canvasWidth - sliderLeftMargin - 30);
}

function draw() {
    // make the background drawing region a very light blue
    fill('aliceblue');
    // draw a thin light gray outline for the region borders
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    // make the background of the controls area white
    fill('white')
    rect(0, drawHeight, canvasWidth, controlHeight);

    // get the updated slider value
    mySliderValue = mySlider.value();

    // put any drawing code here
    // draw a blue circle
    fill('blue');
    circle(canvasWidth/2, drawHeight/2, mySliderValue);

    // put your custom code here
    
    // draw label and value
    fill('black');
    text("MySlider: " +  mySliderValue, 10, drawHeight + 25)
}
```
