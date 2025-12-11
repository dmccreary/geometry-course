// Koch Snowflake MicroSim
// Demonstrates recursive fractal geometry with the Koch snowflake pattern
// Each recursion level adds triangular bumps to each line segment

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

// Koch snowflake parameters
let recursionLevel = 1;
let snowflakeSize = 0.8; // percentage of available space

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Recursion level slider (1-6, default 1)
    recursionSlider = createSlider(1, 6, 1, 1);
    recursionSlider.position(sliderLeftMargin, drawHeight + 12);
    recursionSlider.size(canvasWidth - sliderLeftMargin - margin);

    // Size slider (50-100%, default 80%)
    sizeSlider = createSlider(50, 100, 80, 1);
    sizeSlider.position(sliderLeftMargin, drawHeight + 32);
    sizeSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Interactive Koch snowflake fractal with adjustable recursion depth and size', LABEL);
}

function draw() {
    updateCanvasSize();

    // Get current slider values
    recursionLevel = recursionSlider.value();
    snowflakeSize = sizeSlider.value() / 100;

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
    text('Koch Snowflake', canvasWidth / 2, 10);

    // Calculate snowflake size based on canvas dimensions
    let availableSize = min(canvasWidth - 2 * margin, drawHeight - 80);
    let sideLength = availableSize * snowflakeSize;

    // Calculate vertices of equilateral triangle (point at top)
    // Center the triangle in the drawing area
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20; // slightly lower to account for title

    // Height of equilateral triangle
    let triangleHeight = sideLength * sqrt(3) / 2;

    // Three vertices of the initial triangle (point at top)
    let topVertex = createVector(centerX, centerY - triangleHeight * 2/3);
    let bottomLeftVertex = createVector(centerX - sideLength / 2, centerY + triangleHeight / 3);
    let bottomRightVertex = createVector(centerX + sideLength / 2, centerY + triangleHeight / 3);

    // Draw the Koch snowflake
    stroke('#0066cc');
    strokeWeight(2);
    noFill();

    // Draw three Koch curves forming the snowflake
    // Start from top, go clockwise
    drawKochCurve(topVertex, bottomRightVertex, recursionLevel);
    drawKochCurve(bottomRightVertex, bottomLeftVertex, recursionLevel);
    drawKochCurve(bottomLeftVertex, topVertex, recursionLevel);

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Recursion: ' + recursionLevel, 10, drawHeight + 20);
    text('Size: ' + sizeSlider.value() + '%', 10, drawHeight + 40);
}

// Recursive function to draw a Koch curve between two points
function drawKochCurve(p1, p2, level) {
    if (level === 1) {
        // Base case: draw a straight line
        line(p1.x, p1.y, p2.x, p2.y);
    } else {
        // Calculate the four intermediate points for the Koch curve
        // p1 -> a -> peak -> b -> p2

        // Point a: 1/3 of the way from p1 to p2
        let a = createVector(
            p1.x + (p2.x - p1.x) / 3,
            p1.y + (p2.y - p1.y) / 3
        );

        // Point b: 2/3 of the way from p1 to p2
        let b = createVector(
            p1.x + 2 * (p2.x - p1.x) / 3,
            p1.y + 2 * (p2.y - p1.y) / 3
        );

        // Peak point: form an equilateral triangle pointing outward
        // Rotate the vector from a to b by -60 degrees (outward)
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let angle = -PI / 3; // -60 degrees for outward-pointing peak

        let peak = createVector(
            a.x + dx * cos(angle) - dy * sin(angle),
            a.y + dx * sin(angle) + dy * cos(angle)
        );

        // Recursively draw the four segments
        drawKochCurve(p1, a, level - 1);
        drawKochCurve(a, peak, level - 1);
        drawKochCurve(peak, b, level - 1);
        drawKochCurve(b, p2, level - 1);
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
