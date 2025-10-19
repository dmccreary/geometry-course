// Circle Area Calculator MicroSim
// Real-time area and circumference calculations as radius changes

let radiusSlider;
let radius;
let centerX, centerY;
let canvasWidth = 600;
let canvasHeight = 500;
let controlHeight = 100;
let drawHeight = canvasHeight - controlHeight;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);

  // Calculate center position for the circle
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2;

  // Create radius slider
  radiusSlider = createSlider(10, 150, 80, 1);
  radiusSlider.position(20, canvasHeight - 70);
  radiusSlider.size(200);

  textSize(16);
  textAlign(LEFT, CENTER);
}

function draw() {
  background('aliceblue');

  // Get current radius from slider
  radius = radiusSlider.value();

  // Calculate area and circumference
  let area = PI * radius * radius;
  let circumference = 2 * PI * radius;

  // Draw the circle
  push();
  stroke(0);
  strokeWeight(2);
  fill(100, 150, 255, 150);
  circle(centerX, centerY, radius * 2);
  pop();

  // Draw radius line
  push();
  stroke(255, 100, 100);
  strokeWeight(2);
  line(centerX, centerY, centerX + radius, centerY);
  pop();

  // Draw center point
  push();
  fill(255, 0, 0);
  noStroke();
  circle(centerX, centerY, 6);
  pop();

  // Label the radius
  push();
  fill(0);
  noStroke();
  textAlign(CENTER, BOTTOM);
  text('r = ' + radius.toFixed(1), centerX + radius / 2, centerY - 10);
  pop();

  // Draw control area background
  push();
  fill(255);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
  pop();

  // Display slider label and value
  push();
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text('Radius:', 20, canvasHeight - 85);
  text(radius.toFixed(1) + ' units', 230, canvasHeight - 70);
  pop();

  // Display formulas and calculations
  let formulaY = drawHeight + 25;
  let resultY = drawHeight + 50;

  push();
  fill(0);
  noStroke();
  textSize(14);

  // Area formula and calculation
  textAlign(LEFT, TOP);
  text('Area = πr²', 20, formulaY);
  text('= π × ' + radius.toFixed(1) + '²', 20, formulaY + 20);
  text('= ' + area.toFixed(2) + ' square units', 20, formulaY + 40);

  // Circumference formula and calculation
  text('Circumference = 2πr', 300, formulaY);
  text('= 2 × π × ' + radius.toFixed(1), 300, formulaY + 20);
  text('= ' + circumference.toFixed(2) + ' units', 300, formulaY + 40);
  pop();

  // Draw border around canvas
  push();
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);
  pop();
}
