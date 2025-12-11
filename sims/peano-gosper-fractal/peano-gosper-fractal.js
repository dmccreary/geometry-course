// Peano-Gosper Fractal MicroSim (Gosper Curve / Flowsnake)
// Demonstrates the Gosper curve, a space-filling fractal based on hexagonal geometry
// Uses an L-system approach with turtle graphics

// Canvas dimensions - responsive width
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Sliders
let recursionSlider;
let sizeSlider;

// Gosper curve parameters
let recursionLevel = 1;
let curveSize = 0.6;

// L-system rules for Gosper curve
// A -> A-B--B+A++AA+B-
// B -> +A-BB--B-A++A+B
// Angle: 60 degrees

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Recursion level slider (1-5, default 1)
    recursionSlider = createSlider(1, 5, 1, 1);
    recursionSlider.position(sliderLeftMargin, drawHeight + 12);
    recursionSlider.size(canvasWidth - sliderLeftMargin - margin);

    // Size slider (30-100%, default 60%)
    sizeSlider = createSlider(30, 100, 60, 1);
    sizeSlider.position(sliderLeftMargin, drawHeight + 32);
    sizeSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Interactive Peano-Gosper fractal curve with adjustable recursion depth and size', LABEL);
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
    text('Peano-Gosper Curve', canvasWidth / 2, 10);

    // Generate the L-system string
    let lSystemString = generateGosperString(recursionLevel);

    // Calculate step size based on recursion level and canvas size
    let availableSize = min(canvasWidth - 2 * margin, drawHeight - 80);
    // The curve grows by factor of sqrt(7) each iteration
    let stepSize = (availableSize * curveSize) / pow(sqrt(7), recursionLevel - 1) * 0.15;

    // Draw the Gosper curve using turtle graphics
    stroke('blue');
    strokeWeight(1);
    noFill();

    drawGosperCurve(lSystemString, stepSize);

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Recursion: ' + recursionLevel, 10, drawHeight + 20);
    text('Size: ' + sizeSlider.value() + '%', 10, drawHeight + 40);
}

// Generate the L-system string for the Gosper curve
function generateGosperString(iterations) {
    let current = 'A';

    for (let i = 1; i < iterations; i++) {
        let next = '';
        for (let j = 0; j < current.length; j++) {
            let c = current.charAt(j);
            if (c === 'A') {
                next += 'A-B--B+A++AA+B-';
            } else if (c === 'B') {
                next += '+A-BB--B-A++A+B';
            } else {
                next += c;
            }
        }
        current = next;
    }

    return current;
}

// Draw the Gosper curve using turtle graphics
function drawGosperCurve(lSystemString, stepSize) {
    // Calculate bounds first to center the curve
    let bounds = calculateBounds(lSystemString, stepSize);

    // Calculate center offset
    let curveWidth = bounds.maxX - bounds.minX;
    let curveHeight = bounds.maxY - bounds.minY;

    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;

    let offsetX = centerX - (bounds.minX + curveWidth / 2);
    let offsetY = centerY - (bounds.minY + curveHeight / 2);

    // Now draw the actual curve
    let x = offsetX;
    let y = offsetY;
    let angle = 0;
    let angleStep = PI / 3; // 60 degrees

    beginShape();
    vertex(x, y);

    for (let i = 0; i < lSystemString.length; i++) {
        let c = lSystemString.charAt(i);

        if (c === 'A' || c === 'B') {
            // Move forward
            x += stepSize * cos(angle);
            y += stepSize * sin(angle);
            vertex(x, y);
        } else if (c === '+') {
            // Turn left (counter-clockwise)
            angle -= angleStep;
        } else if (c === '-') {
            // Turn right (clockwise)
            angle += angleStep;
        }
    }

    endShape();
}

// Calculate the bounding box of the curve (without drawing)
function calculateBounds(lSystemString, stepSize) {
    let x = 0;
    let y = 0;
    let angle = 0;
    let angleStep = PI / 3;

    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    for (let i = 0; i < lSystemString.length; i++) {
        let c = lSystemString.charAt(i);

        if (c === 'A' || c === 'B') {
            x += stepSize * cos(angle);
            y += stepSize * sin(angle);
            minX = min(minX, x);
            maxX = max(maxX, x);
            minY = min(minY, y);
            maxY = max(maxY, y);
        } else if (c === '+') {
            angle -= angleStep;
        } else if (c === '-') {
            angle += angleStep;
        }
    }

    return { minX, maxX, minY, maxY };
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
