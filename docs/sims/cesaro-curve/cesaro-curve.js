// Cesaro Curve MicroSim
// Demonstrates the Cesaro fractal curve (torn square fractal)
// Each recursion level replaces a line segment with a bent segment creating angular patterns

// Canvas dimensions - responsive width
let canvasWidth = 400;
let drawHeight = 600;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Sliders
let recursionSlider;
let sizeSlider;

// Cesaro curve parameters
let recursionLevel = 1;
let curveSize = 0.8; // percentage of available space

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Recursion level slider (1-10, default 1)
    recursionSlider = createSlider(1, 10, 1, 1);
    recursionSlider.position(sliderLeftMargin, drawHeight + 12);
    recursionSlider.size(canvasWidth - sliderLeftMargin - margin);

    // Size slider (30-70%, default 50%)
    sizeSlider = createSlider(30, 70, 50, 1);
    sizeSlider.position(sliderLeftMargin, drawHeight + 32);
    sizeSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Interactive Cesaro curve fractal with adjustable recursion depth and size', LABEL);
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
    text('Cesaro Curve', canvasWidth / 2, 10);

    // Calculate curve size based on canvas dimensions
    let availableSize = min(canvasWidth - 2 * margin, drawHeight - 80);
    let sideLength = availableSize * curveSize * 0.9;

    // Center the square in the drawing area
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;

    // Four corners of the initial square
    let halfSide = sideLength / 2;
    let topLeft = createVector(centerX - halfSide, centerY - halfSide);
    let topRight = createVector(centerX + halfSide, centerY - halfSide);
    let bottomRight = createVector(centerX + halfSide, centerY + halfSide);
    let bottomLeft = createVector(centerX - halfSide, centerY + halfSide);

    // Draw the Cesaro curve (torn square)
    stroke('blue');
    strokeWeight(1);
    noFill();

    // Draw four sides of the Cesaro square
    // Each side bends outward
    drawCesaroCurve(topLeft.x, topLeft.y, topRight.x, topRight.y, recursionLevel, true);      // top side, bend up
    drawCesaroCurve(topRight.x, topRight.y, bottomRight.x, bottomRight.y, recursionLevel, true); // right side, bend right
    drawCesaroCurve(bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y, recursionLevel, true); // bottom side, bend down
    drawCesaroCurve(bottomLeft.x, bottomLeft.y, topLeft.x, topLeft.y, recursionLevel, true);  // left side, bend left

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Recursion: ' + recursionLevel, 10, drawHeight + 20);
    text('Size: ' + sizeSlider.value() + '%', 10, drawHeight + 40);
}

// Recursive function to draw a Cesaro curve between two points
// The Cesaro curve replaces each line segment with a "bent" segment
// using an 85-degree angle (creating the characteristic torn appearance)
function drawCesaroCurve(x1, y1, x2, y2, level, bendOutward) {
    if (level === 1) {
        // Base case: draw a straight line
        line(x1, y1, x2, y2);
    } else {
        // Cesaro curve parameters
        // The angle of the bend (85 degrees is typical for Cesaro curve)
        let bendAngle = radians(85);

        // Calculate the direction vector
        let dx = x2 - x1;
        let dy = y2 - y1;
        let segmentLength = sqrt(dx * dx + dy * dy);

        // The original angle of the line
        let baseAngle = atan2(dy, dx);

        // For Cesaro curve, we divide the line into two parts
        // and create a bent shape with the specified angle

        // Calculate the length of each new segment
        // For an 85-degree bend, we need to calculate the proper scaling
        let newLength = segmentLength / (2 * cos((PI - bendAngle) / 2));

        // Calculate the midpoint with the bend
        let midAngle1 = baseAngle - (PI - bendAngle) / 2;
        let midAngle2 = baseAngle + (PI - bendAngle) / 2;

        // Choose which direction to bend based on parameter
        let usedAngle = bendOutward ? midAngle1 : midAngle2;

        // Calculate the peak point of the bend
        let peakX = x1 + newLength * cos(usedAngle);
        let peakY = y1 + newLength * sin(usedAngle);

        // Recursively draw the two segments with alternating bend direction
        drawCesaroCurve(x1, y1, peakX, peakY, level - 1, !bendOutward);
        drawCesaroCurve(peakX, peakY, x2, y2, level - 1, !bendOutward);
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
