// Koch Fractal MicroSim
// This simulation demonstrates the iterative construction of a Koch curve,
// a classic example of a fractal with infinite length but finite area.

// Canvas dimensions - REQUIRED structure
let canvasWidth = 600;              // Initial width (responsive)
let drawHeight = 300;                // Drawing/simulation area height
let controlHeight = 50;              // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                     // Margin for visual elements
let sliderLeftMargin = 155;          // Left margin for slider positioning
let defaultTextSize = 16;            // Base text size

// Simulation variables
let recursionSlider;
let baselineLength = 580;            // Length of the baseline (will be adjusted for responsiveness)
let baselineY;                       // Y position of baseline (bottom of drawing region)

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  angleMode(DEGREES);

  // Position baseline near bottom of drawing region
  // baselineY = drawHeight - 30;
  baselineY = drawHeight - 30;

  // Create recursion level slider
  recursionSlider = createSlider(0, 6, 3, 1);
  recursionSlider.position(sliderLeftMargin, drawHeight + 15);
  recursionSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Koch Fractal: An interactive visualization showing the iterative construction of a Koch curve. Users can adjust the recursion level from 0 to 6 to see how the fractal develops through successive iterations.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area (light blue background)
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, width, drawHeight);

  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);

  // Place the title in the top center of the canvas
  fill('black');
  textSize(36);
  textAlign(CENTER, TOP);
  noStroke();
  text('Koch Fractal', canvasWidth/2, margin);

  // Return default settings
  stroke('black');
  strokeWeight(2);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Get recursion level from slider
  let levels = recursionSlider.value();

  // Calculate baseline endpoints with margin
  let startX = margin;
  let endX = canvasWidth - margin;

  // Draw the Koch curve
  stroke('navy');
  strokeWeight(2);
  KochCurve(startX, baselineY, endX, baselineY, levels);

  // Draw control labels and values in the control area
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Recursion Level: ' + levels, 10, drawHeight + 24);
}

// Recursive function to draw Koch curve
function KochCurve(x1, y1, x2, y2, levels) {
  // Calculate the distance and angle between the two points
  // bug: the height should be fixed
  let dx = x2 - x1;
  let dy = y2 - y1;
  let dist = sqrt(dx * dx + dy * dy);
  let unit = dist / 3;
  let angle = atan2(dy, dx);

  if (levels > 0) {
    // Calculate the five points of the Koch curve iteration
    // Point 1: starting point (x1, y1)

    // Point 2: one-third along the line
    let x3 = x1 + dx / 3;
    let y3 = y1 + dy / 3;

    // Point 3: the peak of the equilateral triangle (subtract 60 to draw upward)
    let x4 = x3 + cos(angle - 60) * unit;
    let y4 = y3 + sin(angle - 60) * unit;

    // Point 4: two-thirds along the line
    let x5 = x1 + dx * 2 / 3;
    let y5 = y1 + dy * 2 / 3;

    // Point 5: ending point (x2, y2)

    // Recursively draw the four segments
    KochCurve(x1, y1, x3, y3, levels - 1);  // First third
    KochCurve(x3, y3, x4, y4, levels - 1);  // Up to peak
    KochCurve(x4, y4, x5, y5, levels - 1);  // Down from peak
    KochCurve(x5, y5, x2, y2, levels - 1);  // Final third
  } else {
    // Base case: draw a straight line
    line(x1, y1, x2, y2);
  }
}

// Update canvas size for responsive design
function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;

    // Update slider width if it exists
    if (typeof recursionSlider !== 'undefined') {
      recursionSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}

// Handle window resize
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
