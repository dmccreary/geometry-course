// Sample MicroSim Template for 2D Geometry

// MicroSim Template for 2D geometry with region drawing parameters
// Use for an instructor standing in front of a "smart white board" with controls on the bottom
// Author: Dan McCreary
// Version geometry-1
// This template puts a control region below the active drawing region of the canvas
// the width of the entire canvas
// No HTML should be placed above the drawing region so the MicroSim can be placed on a page with an iFrame
let canvasWidth = 600;
// The top drawing region above the interactive controls
let drawWidth = canvasWidth;
let drawHeight = 400;
// the control region is where we place sliders and buttons
// height of the region that contains all the controls
let controlHeight = 40;
// The total height of both the drawing region height + the control region height
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

    // create a new slider at the bottom of the canvas in the control region
    mySlider = createSlider(0, 180, 45, 1);
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
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // get the updated slider value
    angle = mySlider.value();

    // draw rays forming an angle
    stroke('black');
    strokeWeight(2);

    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2;
    let length = 150;

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
    arc(centerX, centerY, arcRadius, arcRadius, 0, -angleRadians, OPEN);

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

    // Display the angle type
    fill('black');
    textSize(24);
    text(angleType, centerX - 70, 50);

    // draw label and value in control area
    fill('black');
    textSize(defaultTextSize);
    text("Angle: " + angle + "°", 10, drawHeight + 25);
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
