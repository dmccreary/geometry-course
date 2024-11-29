// MicroSim for Congruent Triangles: SSS and SAS Postulates
// Updated to improve control layout
// Author: OpenAI ChatGPT
// Version: congruence-triangles-2

// Canvas dimensions
let canvasWidth = 600;
let drawWidth = canvasWidth;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let labelLeftMargin = 120;
let defaultTextSize = 16;

// Sliders and controls
let sliderA, sliderB, sliderC, sliderAngle;
let sliderAValue, sliderBValue, sliderCValue, sliderAngleValue;
let modeRadio;
let mode = 'SSS';

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // Create sliders
    sliderA = createSlider(50, 200, 100, 1);
    sliderB = createSlider(50, 200, 100, 1);
    sliderC = createSlider(50, 200, 100, 1);
    sliderAngle = createSlider(30, 150, 60, 1); // angle in degrees

    // Position sliders and labels
    let sliderX = 130;
    let sliderYStart = drawHeight + 20;
    let sliderSpacing = 30;

    // Side a
    createP('Side a:').position(sliderX - labelLeftMargin, sliderYStart - 15);
    sliderA.position(sliderX, sliderYStart);
  
    // Side b
    createP('Side b:').position(sliderX - labelLeftMargin, sliderYStart + sliderSpacing - 15);
    sliderB.position(sliderX, sliderYStart + sliderSpacing);
  
    // Side c or Angle gamma
    createP('Side c / Angle γ:').position(sliderX - labelLeftMargin, sliderYStart + 2 * sliderSpacing -15);
    sliderC.position(sliderX, sliderYStart + 2 * sliderSpacing);
  
    sliderAngle.position(sliderX, sliderYStart + 2 * sliderSpacing);

    // Create mode radio button
    modeRadio = createRadio();
    modeRadio.option('SSS');
    modeRadio.option('SAS');
    modeRadio.selected('SSS');
    modeRadio.position(canvasWidth - 200, drawHeight + 20);
    modeRadio.style('font-size', '16px');
    modeRadio.changed(switchMode);

    // Initially hide the angle slider
    sliderAngle.hide();
}

function switchMode() {
    mode = modeRadio.value();
    if (mode === 'SSS') {
        sliderC.show();
        sliderAngle.hide();
    } else if (mode === 'SAS') {
        sliderC.hide();
        sliderAngle.show();
    }
}

function draw() {
    // Background regions
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get slider values
    sliderAValue = sliderA.value();
    sliderBValue = sliderB.value();

    if (mode === 'SSS') {
        sliderCValue = sliderC.value();
    } else if (mode === 'SAS') {
        sliderAngleValue = sliderAngle.value();
    }

    // Draw labels and values on canvas if needed
    // Optionally display current mode
    fill('black');
    textSize(defaultTextSize);
    text("Mode: " + mode, canvasWidth - 100, 30);

    // Draw the triangle
    if (mode === 'SSS') {
        drawSSSTriangle();
    } else if (mode === 'SAS') {
        drawSASTriangle();
    }
}

function drawSSSTriangle() {
    let a = sliderAValue;
    let b = sliderBValue;
    let c = sliderCValue;

    let x0 = canvasWidth / 2 - c / 2;
    let y0 = drawHeight * 0.75;
    let x1 = x0 + c;
    let y1 = y0;

    let intersections = circleIntersections(x0, y0, b, x1, y1, a);

    if (intersections != null) {
        let x2, y2;
        // Choose the point above the base line
        if (intersections[0].y <= intersections[1].y) {
            x2 = intersections[0].x;
            y2 = intersections[0].y;
        } else {
            x2 = intersections[1].x;
            y2 = intersections[1].y;
        }

        // Draw triangle
        stroke('black');
        fill('lightblue');
        triangle(x0, y0, x1, y1, x2, y2);

        // Draw points
        fill('red');
        circle(x0, y0, 5); // Point A
        circle(x1, y1, 5); // Point B
        circle(x2, y2, 5); // Point C

        // Label points
        fill('black');
        text("A", x0 - 15, y0 + 15);
        text("B", x1 + 5, y1 + 15);
        text("C", x2 - 5, y2 - 10);

        // Label sides
        labelSidesSSS(x0, y0, x1, y1, x2, y2);
    } else {
        fill('black');
        text("Cannot form a triangle with these side lengths.", 50, 50);
    }
}

function drawSASTriangle() {
    let a = sliderAValue;
    let b = sliderBValue;
    let gammaDeg = sliderAngleValue;
    let gammaRad = radians(gammaDeg);

    let x0 = canvasWidth / 2 - b / 2;
    let y0 = drawHeight * 0.75;
    let x1 = x0 + b;
    let y1 = y0;

    let x2 = x0 + a * cos(gammaRad);
    let y2 = y0 - a * sin(gammaRad);

    // Draw triangle
    stroke('black');
    fill('lightgreen');
    triangle(x0, y0, x1, y1, x2, y2);

    // Draw points
    fill('red');
    circle(x0, y0, 5); // Point A
    circle(x1, y1, 5); // Point B
    circle(x2, y2, 5); // Point C

    // Label points
    fill('black');
    text("A", x0 - 15, y0 + 15);
    text("B", x1 + 5, y1 + 15);
    text("C", x2 - 5, y2 - 10);

    // Label sides
    labelSidesSAS(x0, y0, x1, y1, x2, y2);
}

function labelSidesSSS(x0, y0, x1, y1, x2, y2) {
    // Side a (BC)
    let midBCx = (x1 + x2) / 2;
    let midBCy = (y1 + y2) / 2;
    text("a", midBCx + 5, midBCy);

    // Side b (AC)
    let midACx = (x0 + x2) / 2;
    let midACy = (y0 + y2) / 2;
    text("b", midACx - 15, midACy);

    // Side c (AB)
    let midABx = (x0 + x1) / 2;
    let midABy = (y0 + y1) / 2;
    text("c", midABx, midABy + 15);
}

function labelSidesSAS(x0, y0, x1, y1, x2, y2) {
    // Side a (BC)
    let midBCx = (x1 + x2) / 2;
    let midBCy = (y1 + y2) / 2;
    text("a", midBCx + 5, midBCy);

    // Side b (AC)
    let midACx = (x0 + x2) / 2;
    let midACy = (y0 + y2) / 2;
    text("b", midACx - 15, midACy);

    // Side c (AB)
    let midABx = (x0 + x1) / 2;
    let midABy = (y0 + y1) / 2;
    text("c", midABx, midABy + 15);
}

function circleIntersections(x0, y0, r0, x1, y1, r1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let d = sqrt(dx * dx + dy * dy);

    if (d > (r0 + r1)) {
        return null;
    }
    if (d < abs(r0 - r1)) {
        return null;
    }

    let a = (r0 * r0 - r1 * r1 + d * d) / (2 * d);
    let h = sqrt(r0 * r0 - a * a);

    let x2 = x0 + (dx * a) / d;
    let y2 = y0 + (dy * a) / d;

    let rx = -dy * (h / d);
    let ry = dx * (h / d);

    let xi1 = x2 + rx;
    let xi2 = x2 - rx;
    let yi1 = y2 + ry;
    let yi2 = y2 - ry;

    return [{ x: xi1, y: yi1 }, { x: xi2, y: yi2 }];
}
