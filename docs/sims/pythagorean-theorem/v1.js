// MicroSim Template with region drawing parameters
// the width of the entire canvas
let canvasWidth = 400;
// The top drawing region above the interactive controls
let drawHeight = 400;
// control region height
let controlHeight = 50;
// The total height of both the drawing region height + the control region height
let canvasHeight = drawHeight + controlHeight;
// margin around the active plotting region
let margin = 25;
// larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

// variables for sliders
let aSlider, bSlider;
// variables for toggle button
let toggleButton;
let showSquares = false;
// variable for reset button
let resetButton;
// default values for a and b
let defaultA = 100;
let defaultB = 100;
// variables for the lengths of sides
let aLength, bLength, cLength;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    // canvas.parent('canvas-container');
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // create sliders
    // aSlider adjusts length of side a (base)
    // bSlider adjusts length of side b (height)
    let sliderLeftMargin = margin;

    aSlider = createSlider(50, 140, defaultA, 1); // min, max, default, step
    aSlider.position(sliderLeftMargin, drawHeight + 15);
    aSlider.size((canvasWidth - 2*margin)/2 - 10);

    bSlider = createSlider(50, 200, defaultB, 1);
    bSlider.position(sliderLeftMargin + (canvasWidth - 2*margin)/2 + 20, drawHeight + 15);
    bSlider.size((canvasWidth - 2*margin)/2 - 10);

    // create toggle button
    toggleButton = createButton('Show Squares');
    toggleButton.position(margin, drawHeight + 40);
    toggleButton.mousePressed(toggleSquares);

    // create reset button
    resetButton = createButton('Reset');
    resetButton.position(canvasWidth - margin - 50, drawHeight + 40);
    resetButton.mousePressed(resetValues);
}

function draw() {
    // make the background drawing region a very light blue
    background('white'); // reset background
    fill('aliceblue');
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);
    // make the background of the controls area white
    fill('white')
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Show the equation c² = a² + b² at the top center
    // note that ² is unicode with a value of : U+00B2
    fill('black');
    noStroke();
    textSize(24); // Increase text size for the title
    textAlign(CENTER); // Center the text
    text("c² = a² + b²", canvasWidth / 2, 30);

    // get the updated slider values
    aLength = aSlider.value();
    bLength = bSlider.value();
    cLength = sqrt(aLength*aLength + bLength*bLength);

    // draw the right triangle in the center of the sketch canvas
    // Right angle at (x0, y0)
    let x0 = canvasWidth/2 - aLength/2;
    let y0 = drawHeight/2 + bLength/2;

    let x1 = x0 + aLength;
    let y1 = y0;

    let x2 = x0;
    let y2 = y0 - bLength;

    stroke(0);
    fill('lightgray');
    triangle(x0, y0, x1, y1, x2, y2);

    // If showSquares is true, draw squares on sides a and b
    if (showSquares) {
        // Draw square on side a
        fill('lightgreen');
        quad(
            x0, y0,
            x1, y1,
            x1, y1 + aLength,
            x0, y0 + aLength
        );

        // Draw square on side b
        fill('lightblue');
        quad(
            x0, y0,
            x2, y2,
            x2 - bLength, y2,
            x0 - bLength, y0
        );
    }

    // Show the lengths of a, b, and c
    fill(0);
    noStroke();
    textSize(defaultTextSize);
    text("a: " + nf(aLength, 0, 2), margin, 20);
    text("b: " + nf(bLength, 0, 2), margin, 40);
    text("c: " + nf(cLength, 0, 2), margin, 60);

    // Label sides on the triangle
    // Label side a
    let midA_x = (x0 + x1)/2;
    let midA_y = y0 + 15;
    text("a", midA_x, midA_y);

    // Label side b
    let midB_x = x0 - 15;
    let midB_y = (y0 + y2)/2;
    text("b", midB_x, midB_y);

    // Label side c
    let midC_x = (x1 + x2)/2 + 10;
    let midC_y = (y1 + y2)/2;
    text("c", midC_x, midC_y);

    // Draw labels for sliders
    fill(0);
    noStroke();
    text("Side a:", aSlider.x * 1 + aSlider.width / 2 - 30, aSlider.y - 5);
    text("Side b:", bSlider.x * 1 + bSlider.width / 2 - 30, bSlider.y - 5);
}

function toggleSquares() {
    showSquares = !showSquares;
    if (showSquares) {
        toggleButton.html('Hide Squares');
    } else {
        toggleButton.html('Show Squares');
    }
}

function resetValues() {
    aSlider.value(defaultA);
    bSlider.value(defaultB);
}
