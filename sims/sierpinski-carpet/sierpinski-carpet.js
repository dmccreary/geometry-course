// Sierpinski Carpet MicroSim
// Demonstrates the Sierpinski carpet fractal - a 2D generalization of the Cantor set
// Each recursion divides squares into a 3x3 grid with the center removed

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

// Sierpinski carpet parameters
let recursionLevel = 1;
let carpetSize = 0.8;

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

    describe('Interactive Sierpinski carpet fractal with adjustable recursion depth and size', LABEL);
}

function draw() {
    updateCanvasSize();

    // Get current slider values
    recursionLevel = recursionSlider.value();
    carpetSize = sizeSlider.value() / 100;

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
    text('Sierpinski Carpet', canvasWidth / 2, 10);

    // Calculate carpet size based on canvas dimensions
    let availableSize = min(canvasWidth - 2 * margin, drawHeight - 80);
    let sideLength = availableSize * carpetSize;

    // Center the carpet in the drawing area
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2 + 20;

    let startX = centerX - sideLength / 2;
    let startY = centerY - sideLength / 2;

    // Draw the Sierpinski carpet
    noStroke();
    drawSierpinskiCarpet(startX, startY, sideLength, recursionLevel);

    // Draw control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Recursion: ' + recursionLevel, 10, drawHeight + 20);
    text('Size: ' + sizeSlider.value() + '%', 10, drawHeight + 40);
}

// Recursive function to draw the Sierpinski carpet
function drawSierpinskiCarpet(x, y, size, level) {
    if (level === 1) {
        // Base case: draw a 3x3 grid with center removed
        let cellSize = size / 3;

        // Draw the 8 outer squares (skip the center one)
        fill('blue');
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                // Skip the center square (row 1, col 1)
                if (row === 1 && col === 1) {
                    continue;
                }
                rect(x + col * cellSize, y + row * cellSize, cellSize, cellSize);
            }
        }
    } else {
        // Recursive case: divide into 3x3 grid and recurse on outer 8 cells
        let cellSize = size / 3;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                // Skip the center square
                if (row === 1 && col === 1) {
                    continue;
                }
                // Recurse on this cell
                drawSierpinskiCarpet(
                    x + col * cellSize,
                    y + row * cellSize,
                    cellSize,
                    level - 1
                );
            }
        }
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
