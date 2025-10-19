// Circle Area Calculator MicroSim
// Real-time area and circumference calculations as radius changes
// Demonstrates: A = πr² and C = 2πr

// Canvas dimensions - following MicroSim standards
let canvasWidth = 600;               // Initial width (responsive)
let drawHeight = 400;                // Drawing/simulation area height
let controlHeight = 100;             // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                     // Margin for visual elements
let sliderLeftMargin = 105;          // Left margin for slider positioning
let defaultTextSize = 16;            // Base text size

// MicroSim variables
let radiusSlider;
let radius;
let centerX, centerY;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);

  // Calculate center position for the circle
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;

  // Create radius slider (min, max, default, step)
  radiusSlider = createSlider(10, 150, 80, 1);
  radiusSlider.position(20, drawHeight + 30);
  radiusSlider.size(200);

  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
}

function draw() {
  // Drawing area background (aliceblue per MicroSim standards)
  background('aliceblue');

  // Get current radius from slider
  radius = radiusSlider.value();

  // Calculate area and circumference using geometric formulas
  let area = PI * radius * radius;           // A = πr²
  let circumference = 2 * PI * radius;       // C = 2πr

  // === DRAWING REGION ===

  // Title at top center
  push();
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Circle Area Calculator', canvasWidth / 2, 10);
  pop();

  // Draw the circle (semi-transparent blue fill)
  push();
  stroke(0);
  strokeWeight(2);
  fill(100, 150, 255, 150);
  circle(centerX, centerY, radius * 2);
  pop();

  // Draw radius line (red for visibility)
  push();
  stroke(255, 100, 100);
  strokeWeight(2);
  line(centerX, centerY, centerX + radius, centerY);
  pop();

  // Draw center point (red dot)
  push();
  fill(255, 0, 0);
  noStroke();
  circle(centerX, centerY, 6);
  pop();

  // Label the radius on the line
  push();
  fill(0);
  noStroke();
  textSize(defaultTextSize);
  textAlign(CENTER, BOTTOM);
  text('r = ' + radius.toFixed(1), centerX + radius / 2, centerY - 10);
  pop();

  // === CONTROL REGION ===

  // Control area background (white per MicroSim standards)
  push();
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  pop();

  // Slider label and current value
  push();
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Radius:', 20, drawHeight + 30);
  text(radius.toFixed(1) + ' units', 230, drawHeight + 30);
  pop();

  // Display formulas and step-by-step calculations
  push();
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);

  // Area formula and calculation (left side)
  let formulaY = drawHeight + 55;
  text('Area = πr²', 20, formulaY);
  text('= π × ' + radius.toFixed(1) + '²', 20, formulaY + 15);
  text('= ' + area.toFixed(2) + ' sq units', 20, formulaY + 30);

  // Circumference formula and calculation (right side)
  text('Circumference = 2πr', 300, formulaY);
  text('= 2 × π × ' + radius.toFixed(1), 300, formulaY + 15);
  text('= ' + circumference.toFixed(2) + ' units', 300, formulaY + 30);
  pop();

  // Canvas border (silver per MicroSim standards)
  push();
  noFill();
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);
  pop();

  // Separator line between drawing and control regions
  push();
  stroke('silver');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);
  pop();
}
