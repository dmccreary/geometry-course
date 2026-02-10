// Barnsley's Fern MicroSim
// Demonstrates the Barnsley fern fractal using an Iterated Function System (IFS)
// Named after Michael Barnsley, designed to resemble the black spleenwort fern

// Canvas dimensions - responsive width
let canvasWidth = 400;
let drawHeight = 550;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 130;
let defaultTextSize = 14;

// Sliders
let iterationsSlider;
let scaleSlider;
let leafAngleSlider;
let curlSlider;

// Checkbox
let spleenwortCheckbox;

// Fern parameters - these control the IFS transformation matrices
let iterations = 50000;
let fernScale = 45;
let leafAngle = 3;    // Angle of leaflets (degrees offset)
let curl = 4;         // Curl factor affecting the stem bend

// Points array for drawing
let points = [];

// Black spleenwort preset values
const SPLEENWORT_ITERATIONS = 100000;
const SPLEENWORT_SCALE = 45;
const SPLEENWORT_LEAF_ANGLE = 3;
const SPLEENWORT_CURL = 4;

// Flag to regenerate points
let needsRegenerate = true;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Iterations slider (10000-200000, default 50000)
    iterationsSlider = createSlider(10000, 200000, 50000, 10000);
    iterationsSlider.position(sliderLeftMargin, drawHeight + 12);
    iterationsSlider.size(canvasWidth - sliderLeftMargin - margin);
    iterationsSlider.input(() => { needsRegenerate = true; });

    // Scale slider (20-80, default 45)
    scaleSlider = createSlider(20, 80, 45, 1);
    scaleSlider.position(sliderLeftMargin, drawHeight + 37);
    scaleSlider.size(canvasWidth - sliderLeftMargin - margin);
    scaleSlider.input(() => { needsRegenerate = true; });

    // Leaf angle slider (0-15, default 3)
    leafAngleSlider = createSlider(0, 15, 3, 0.5);
    leafAngleSlider.position(sliderLeftMargin, drawHeight + 62);
    leafAngleSlider.size(canvasWidth - sliderLeftMargin - margin);
    leafAngleSlider.input(() => { needsRegenerate = true; });

    // Curl slider (0-10, default 4)
    curlSlider = createSlider(-10, 10, 4, 0.25);
    curlSlider.position(sliderLeftMargin, drawHeight + 87);
    curlSlider.size(canvasWidth - sliderLeftMargin - margin);
    curlSlider.input(() => { needsRegenerate = true; });

    // Black Spleenwort checkbox
    spleenwortCheckbox = createCheckbox(' Black Spleenwort Preset', false);
    spleenwortCheckbox.position(10, drawHeight + 112);
    spleenwortCheckbox.changed(onSpleenwortChange);
    spleenwortCheckbox.style('font-size', '14px');

    describe('Interactive Barnsley fern fractal with adjustable parameters for iterations, scale, leaf angle, and curl', LABEL);
}

function onSpleenwortChange() {
    if (spleenwortCheckbox.checked()) {
        // Set sliders to black spleenwort preset values
        iterationsSlider.value(SPLEENWORT_ITERATIONS);
        scaleSlider.value(SPLEENWORT_SCALE);
        leafAngleSlider.value(SPLEENWORT_LEAF_ANGLE);
        curlSlider.value(SPLEENWORT_CURL);
        needsRegenerate = true;
    }
}

function draw() {
    updateCanvasSize();

    // Get current slider values
    iterations = iterationsSlider.value();
    fernScale = scaleSlider.value();
    leafAngle = leafAngleSlider.value();
    curl = curlSlider.value();

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
    text("Barnsley's Fern", canvasWidth / 2, 10);

    // Regenerate points if needed
    if (needsRegenerate) {
        generateFernPoints();
        needsRegenerate = false;
    }

    // Draw the fern
    drawFern();

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Iterations: ' + iterations.toLocaleString(), 10, drawHeight + 20);
    text('Scale: ' + fernScale, 10, drawHeight + 45);
    text('Leaf Angle: ' + leafAngle.toFixed(1) + '°', 10, drawHeight + 70);
    text('Curl: ' + curl.toFixed(1), 10, drawHeight + 95);


}

// Generate fern points using the Iterated Function System
function generateFernPoints() {
    points = [];

    let x = 0;
    let y = 0;

    // Convert leaf angle to radians for calculations
    let angleRad = radians(leafAngle);

    // IFS transformation coefficients
    // These are based on Barnsley's original with modifications for the sliders
    // f1: Stem (probability 1%)
    // f2: Successively smaller leaflets (probability 85%)
    // f3: Largest left-hand leaflet (probability 7%)
    // f4: Largest right-hand leaflet (probability 7%)

    for (let i = 0; i < iterations; i++) {
        let r = random();
        let nextX, nextY;

        if (r < 0.01) {
            // f1: Stem - draws the stem
            nextX = 0;
            nextY = 0.16 * y;
        } else if (r < 0.86) {
            // f2: Main transformation - creates the overall fern shape
            // Modified by curl parameter
            let curlFactor = curl / 100;
            nextX = 0.85 * x + (0.04 + curlFactor) * y;
            nextY = (-0.04 - curlFactor) * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
            // f3: Left leaflet - modified by leaf angle
            let a = 0.2 - sin(angleRad) * 0.1;
            let b = -0.26 + cos(angleRad) * 0.1;
            let c = 0.23 + sin(angleRad) * 0.1;
            let d = 0.22 + cos(angleRad) * 0.05;
            nextX = a * x + b * y;
            nextY = c * x + d * y + 1.6;
        } else {
            // f4: Right leaflet - modified by leaf angle
            let a = -0.15 + sin(angleRad) * 0.1;
            let b = 0.28 - cos(angleRad) * 0.1;
            let c = 0.26 - sin(angleRad) * 0.1;
            let d = 0.24 + cos(angleRad) * 0.05;
            nextX = a * x + b * y;
            nextY = c * x + d * y + 0.44;
        }

        x = nextX;
        y = nextY;

        // Store the point
        points.push({ x: x, y: y });
    }
}

// Draw the fern from stored points
function drawFern() {
    // Calculate scaling and positioning
    let scale = fernScale / 10;
    let offsetX = canvasWidth / 2;
    let offsetY = drawHeight - 30;

    // Draw points
    stroke(34, 139, 34); // Forest green
    strokeWeight(1);

    for (let i = 0; i < points.length; i++) {
        let px = offsetX + points[i].x * scale * 10;
        let py = offsetY - points[i].y * scale * 5;

        // Only draw if within drawing area
        if (py > 40 && py < drawHeight - 10) {
            point(px, py);
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    needsRegenerate = true;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
        // Resize sliders when canvas width changes
        if (typeof iterationsSlider !== 'undefined') {
            iterationsSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
        if (typeof scaleSlider !== 'undefined') {
            scaleSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
        if (typeof leafAngleSlider !== 'undefined') {
            leafAngleSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
        if (typeof curlSlider !== 'undefined') {
            curlSlider.size(canvasWidth - sliderLeftMargin - margin);
        }
    }
}
