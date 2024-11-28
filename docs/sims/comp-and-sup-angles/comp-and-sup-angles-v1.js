// Sample MicroSim Template for 2D Geometry

// MicroSim Template for 2D geometry with region drawing parameters
// Use for an instructor standing in front of a "smart white board" with controls on the bottom
// Author: Dan McCreary
// Version geometry-1
// This template puts a control region below the active drawing region of the canvas
// the width of the entire canvas
// No HTML should be placed above the drawing region so the MicroSim can be placed on a page with an iFrame
let canvasWidth = 663;
// The top drawing region above the interactive controls
let drawWidth = canvasWidth;
let drawHeight = 300;
// the control region is where we place sliders and buttons
// height of the region that contains all the controls
let controlHeight = 40;
// The total height of both the drawing region height + the control region height
let canvasHeight = drawHeight + controlHeight;
// margin around the active plotting region
let margin = 25;
// the left margin area needs to hold the width of the text label and value
let sliderLeftMargin = 100;
// larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

let mySlider;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    // canvas.parent('canvas-container');
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // create a new slider at the bottom of the canvas in the control region
    mySlider = createSlider(0, 180, 45, 1);
    // position the slider below the drawing region
    mySlider.position(sliderLeftMargin, drawHeight + 10);
    // make the slider width fill the area to the right of the label and value of the slider
    mySlider.size(canvasWidth - sliderLeftMargin - 15);
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
    noStroke();

    // get the updated slider value
    mySliderValue = mySlider.value();

    // Define center and ray length
    let cx = canvasWidth / 2;
    let cy = drawHeight - 50;
    let rayLength = 180;

    // Compute angle in radians
    let theta = radians(mySliderValue);

    // Compute end point of moving ray
    let x_end = cx + rayLength * cos(theta);
    let y_end = cy - rayLength * sin(theta);

    // Draw fixed ray along x-axis
    stroke('black');
    strokeWeight(2);
    line(cx, cy, cx + rayLength, cy);

    // Draw moving ray
    line(cx, cy, x_end, y_end);

    // Draw angle arc
    noFill();
    stroke('red');
    strokeWeight(2);
    arc(cx, cy, 40, 40, 0, -theta, OPEN);

    // Reset stroke weight
    strokeWeight(1);

    // Display angle value
    fill('black');
    noStroke();
    textSize(16);
    text(mySliderValue + "°", cx + 50, cy - 10);

    // Determine angle name
    let angleName = "";
    if (mySliderValue == 0) {
        angleName = "Zero Angle";
    } else if (mySliderValue < 90) {
        angleName = "Acute Angle";
    } else if (mySliderValue == 90) {
        angleName = "Right Angle";
    } else if (mySliderValue < 180) {
        angleName = "Obtuse Angle";
    } else if (mySliderValue == 180) {
        angleName = "Straight Angle";
    }

    // Display angle name
    textSize(24);
    text(angleName, cx - 70, 50);
    textSize(16);
  
    // Compute and display complement
    let complementText = "";
    if (mySliderValue < 90) {
        let complement = 90 - mySliderValue;
        complementText = "Complement: " + complement + "°";
    } else if (mySliderValue == 90) {
        complementText = "Complement: None";
    } else {
        complementText = "Complement: N/A";
    }
    text(complementText, 10, 20);

    // Compute and display supplement
    let supplementText = "";
    if (mySliderValue < 180) {
        let supplement = 180 - mySliderValue;
        supplementText = "Supplement: " + supplement + "°";
    } else if (mySliderValue == 180) {
        supplementText = "Supplement: None";
    } else {
        supplementText = "Supplement: N/A";
    }
    text(supplementText, 10, 40);

    // Draw label and value
    fill('black');
    text("Angle: " + mySliderValue + "°", 10, drawHeight + 25);
}
