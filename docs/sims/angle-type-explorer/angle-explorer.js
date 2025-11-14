/// <reference types="p5/global" />
// Angle Type Explorer

// MicroSim Template for 2D geometry with region drawing parameters
// Use for an instructor standing in front of a "smart white board" with controls on the bottom
// Author: Dan McCreary
// Version geometry-1
// This template puts a control region below the active drawing region of the canvas
// the width of the entire canvas
// No HTML should be placed above the drawing region so the MicroSim can be placed on a page with an iFrame
let canvasWidth;
// The top drawing region above the interactive controls
let drawWidth;
let drawHeight = 250;
// the control region is where we place sliders and buttons
// height of the region that contains all the controls
let controlHeight = 45;
// The total height of both the drawing region height + the control region height
let canvasHeight = drawHeight + controlHeight;
// margin around the active plotting region
let margin = 25;
// the left margin area needs to hold the width of the text label and value
let sliderLeftMargin = 110;
// larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

function setup() {
    // Set canvas width to fill the window width
    canvasWidth = windowWidth;
    drawWidth = canvasWidth;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // create a new slider at the bottom of the canvas in the control region
    mySlider = createSlider(0, 180, 45, 1);
    mySlider.position(sliderLeftMargin, drawHeight + 15);
    mySlider.size(canvasWidth - sliderLeftMargin - margin*2);
}

function draw() {
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Center The Title
    textAlign(CENTER,TOP);
    noStroke();
    fill('black');
    textSize(24);
    text('Angle Type Explorer', canvasWidth/2, margin/2)

    // get the updated slider value
    angle = mySlider.value();
    drawAngleDiagram(angle);
    
    // draw label and value in control area
    fill('black');
    textAlign(LEFT, TOP);
    textSize(defaultTextSize);
    text("Angle:" + angle, margin, drawHeight + 15);
}

// Function to determine the angle type
function getAngleType(angle) {
    if (angle == 0) {
        return "Zero Angle";
    } else if (angle > 0 && angle < 90) {
        return "Acute Angle";
    } else if (angle == 90) {
        return "Right Angle";
    } else if (angle > 90 && angle < 180) {
        return "Obtuse Angle";
    } else if (angle == 180) {
        return "Straight Angle";
    } else {
        return "";
    }
}

function drawAngleDiagram(angle) {
    push();
    translate(10,0);
    // draw rays forming an angle
    stroke('black');
    strokeWeight(2);

    let centerX = canvasWidth / 2;
    let centerY = drawHeight - 40;
    let length = 170;

    // First ray (fixed)
    line(centerX, centerY, centerX + length, centerY);

    // Second ray (rotating)
    let angleRadians = radians(angle);
    let x2 = centerX + length * cos(angleRadians);
    let y2 = centerY - length * sin(angleRadians); // subtract because y increases downwards
    line(centerX, centerY, x2, y2);

    // Draw the angle arc
    noFill();
    stroke('red');
    strokeWeight(2);
    let arcRadius = 50;
    arc(centerX, centerY, arcRadius, arcRadius, -angleRadians, 0, OPEN);

    // Display the angle value near the arc
    fill('black');
    noStroke();
    textSize(16);
    let midAngle = -angleRadians / 2; // Negative because of coordinate system
    let labelRadius = arcRadius + 20;
    let labelX = centerX + labelRadius * cos(midAngle);
    let labelY = centerY + labelRadius * sin(midAngle); // Use + here because y increases downwards
    text(angle + "°", labelX - 10, labelY + 5);

    // Get the angle type
    let angleType = getAngleType(angle);

    // draw the angle type at the center bottom of the drawing area
    fill('black');
    textAlign(CENTER, TOP);
    textSize(defaultTextSize);
    text(angleType, canvasWidth/2, drawHeight - 30);
    pop();
}

// Handle window resizing to make canvas responsive
function windowResized() {
    canvasWidth = windowWidth;
    drawWidth = canvasWidth;
    resizeCanvas(canvasWidth, canvasHeight);

    // Make the slider width change with the window
    mySlider.size(canvasWidth - sliderLeftMargin - margin*2);
}