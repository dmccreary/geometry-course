// Circle Area Calculator MicroSim
// Real-time area and circumference calculations as radius changes
// Demonstrates: A = πr² and C = 2πr

// Canvas dimensions - following MicroSim standards
let canvasWidth = 600;               // Initial width (responsive)
let drawHeight = 400;                // Drawing/simulation area height
let controlHeight = 50;             // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                     // Margin for visual elements
let sliderLeftMargin = 170;          // Left margin for slider positioning
let defaultTextSize = 16;            // Base text size

// MicroSim variables
let radiusSlider;
let radius;
let centerX, centerY;

function setup() {
  // Set canvas width to container width at startup
  canvasWidth = windowWidth;
  const canvas = createCanvas(canvasWidth, canvasHeight);

  // Calculate center position for the circle
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;

  // Create radius slider (min, max, default, step)
  radiusSlider = createSlider(10, 150, 80, 1);
  radiusSlider.position(sliderLeftMargin, drawHeight + 15);
  radiusSlider.size(canvasWidth - sliderLeftMargin - margin);

  // text defaults
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
}



function draw() {
  // background of drawing region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  // background of control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get current radius from slider
  radius = radiusSlider.value();

  // Calculate area and circumference using geometric formulas
  let area = PI * radius * radius;           // A = πr²
  let circumference = 2 * PI * radius;       // C = 2πr

  // Top Drawing Region
  // Draw title at top center
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Circle Area Calculator', canvasWidth / 2, 10);

  // Draw the circle (semi-transparent blue fill)
  push();
    stroke(0);
    strokeWeight(2);
    fill(100, 150, 255, 150);
    circle(centerX, centerY, radius * 2);
    // Draw radius line (red for visibility)
    stroke(255, 100, 100);
    strokeWeight(2);
    line(centerX, centerY, centerX + radius, centerY);
    
    // Draw center point (red dot)
    fill(255, 0, 0);
    noStroke();
    circle(centerX, centerY, 6);

    // Label the radius on the line

    fill(0);
    noStroke();
    textSize(defaultTextSize);
    textAlign(CENTER, BOTTOM);
    text('r = ' + radius.toFixed(1), centerX + radius / 2, centerY - 10);
  pop();

  // Update the values in the control region
  // Slider label and current value

  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, TOP);
  text('Radius:' + radius.toFixed(1) + ' units', 20, drawHeight + 15);


  // Display formulas and step-by-step calculations
  push();
  translate(0, -150);
    fill('black');
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
    let lineSpacing = 20;

    // Area formula and calculation (left side)
    let formulaY = drawHeight + 55;
    text('Area = π r²', 20, formulaY);
    text('= π × ' + radius.toFixed(1) + '²', 20, formulaY + lineSpacing);
    text('= ' + area.toFixed(2) + ' sq units', 20, formulaY + lineSpacing*2);

  // Circumference formula and calculation (right side)
    let xOffset = 400;
  text('Circumference = 2 π r', xOffset, formulaY);
  text('= 2 × π × ' + radius.toFixed(1), xOffset, formulaY + lineSpacing);
  text('= ' + circumference.toFixed(2) + ' units', xOffset, formulaY + lineSpacing*2);
pop();

  
}

// Handle window resize events
function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);

  // Recalculate center position
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;

  // Reposition slider if it exists (fixed position) since the first windowResize might not have
  // created the slider yet
  if (radiusSlider) {
    radiusSlider.position(sliderLeftMargin, drawHeight + 15);
  }
}
