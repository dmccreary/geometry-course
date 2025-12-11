// Levy C Curve MicroSim
// Demonstrates the Levy C curve (Levy dragon) fractal
// Each recursion level replaces a line segment with two segments at 45-degree angles

// Canvas dimensions - responsive width
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Sliders
let recursionSlider;
let sizeSlider;

// Levy C curve parameters
let recursionLevel = 1;
let curveSize = 0.8; // percentage of available space

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Recursion level slider (1-6, default 1)
    recursionSlider = createSlider(1, 16, 1, 1);
    recursionSlider.position(sliderLeftMargin, drawHeight + 12);
    recursionSlider.size(canvasWidth - sliderLeftMargin - margin);

    // Size slider (50-100%, default 80%)
    sizeSlider = createSlider(50, 130, 100, 1);
    sizeSlider.position(sliderLeftMargin, drawHeight + 32);
    sizeSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Interactive Levy C curve fractal with adjustable recursion depth and size', LABEL);
}

function draw() {
    updateCanvasSize();

    // Get current slider values
    recursionLevel = recursionSlider.value();
    curveSize = sizeSlider.value() / 100;

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text('Levy C Curve', canvasWidth / 2, 10);

    // Calculate curve size based on canvas dimensions
    let availableSize = min(canvasWidth - 2 * margin, drawHeight - 80);
    let lineLength = availableSize * curveSize * 0.7; // Scale down for the C curve which expands

    // Center the curve in the drawing area
    let centerX = canvasWidth / 2;
    let centerY = drawHeight*.22; // about 1/3 down from top

    // Start and end points for the initial line (horizontal)
    let startX = centerX - lineLength / 2;
    let startY = centerY;
    let endX = centerX + lineLength / 2;
    let endY = centerY;

    // Draw the Levy C curve
    stroke('blue'); // Dark red color
    strokeWeight(1.5);
    noFill();

    drawLevyCurve(startX, startY, endX, endY, recursionLevel);

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Recursion: ' + recursionLevel, 10, drawHeight + 20);
    text('Size: ' + sizeSlider.value() + '%', 10, drawHeight + 40);
}

// Recursive function to draw a Levy C curve between two points
function drawLevyCurve(x1, y1, x2, y2, level) {
    if (level === 1) {
        // Base case: draw a straight line
        line(x1, y1, x2, y2);
    } else {
        // Calculate the midpoint that forms a right isoceles triangle
        // The new point is at the apex of a right triangle with the original line as hypotenuse

        // Vector from start to end
        let dx = x2 - x1;
        let dy = y2 - y1;

        // The midpoint of the original segment
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;

        // Perpendicular vector (rotated 90 degrees), scaled to half the original length
        // For Levy C curve, we go up (or left, depending on orientation)
        // The perpendicular offset is half the distance to the midpoint
        let perpX = -dy / 2;
        let perpY = dx / 2;

        // The apex point
        let apexX = midX + perpX;
        let apexY = midY + perpY;

        // Recursively draw the two segments
        drawLevyCurve(x1, y1, apexX, apexY, level - 1);
        drawLevyCurve(apexX, apexY, x2, y2, level - 1);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        // Resize sliders when canvas width changes
        if (typeof recursionSlider !== 'undefined') {
            recursionSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
        if (typeof sizeSlider !== 'undefined') {
            sizeSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
    }
}
