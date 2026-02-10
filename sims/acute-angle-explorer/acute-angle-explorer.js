// Acute Angle Explorer MicroSim
// Students identify acute angles and understand their range of measures
// Uses canvas-based controls (no createSlider/createButton)
// Author: Dan McCreary
// Version: geometry-1

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Slider state
let sliderX;
let sliderW;
let sliderY;
let sliderMin = 1;
let sliderMax = 180;
let sliderValue = 45;
let sliderHeight = 8;
let handleRadius = 10;
let isDragging = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Calculate slider positions
  sliderY = drawHeight + 25;
  updateSliderDimensions();

  describe('Interactive angle explorer showing two rays forming an angle with a slider to adjust the angle measure from 1 to 180 degrees. Classifies the angle as acute, right, obtuse, or straight.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Acute Angle Explorer', canvasWidth / 2, margin / 2);

  // Draw the angle visualization
  drawAngleVisualization();

  // Draw the slider control
  drawSlider();

  // Draw classification text
  drawClassification();
}

function drawAngleVisualization() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight * 0.55;
  let rayLength = min(canvasWidth * 0.35, 200);
  let arcRadius = 60;

  // Draw the fixed horizontal ray (dark blue)
  stroke(0, 0, 139); // dark blue
  strokeWeight(3);
  line(centerX, centerY, centerX + rayLength, centerY);

  // Draw small arrowhead on fixed ray
  let arrowSize = 10;
  let fixedEndX = centerX + rayLength;
  fill(0, 0, 139);
  noStroke();
  triangle(
    fixedEndX, centerY,
    fixedEndX - arrowSize, centerY - arrowSize / 2,
    fixedEndX - arrowSize, centerY + arrowSize / 2
  );

  // Calculate second ray endpoint
  let angleRad = radians(sliderValue);
  let endX = centerX + rayLength * cos(-angleRad);
  let endY = centerY + rayLength * sin(-angleRad);

  // Draw the rotating ray (bright red)
  stroke(220, 30, 30); // bright red
  strokeWeight(3);
  line(centerX, centerY, endX, endY);

  // Draw small arrowhead on rotating ray
  fill(220, 30, 30);
  noStroke();
  let arrowAngle = atan2(endY - centerY, endX - centerX);
  push();
  translate(endX, endY);
  rotate(arrowAngle);
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();

  // Draw the angle arc (green)
  noFill();
  stroke(0, 160, 0); // green
  strokeWeight(2.5);
  arc(centerX, centerY, arcRadius * 2, arcRadius * 2, -angleRad, 0);

  // Draw vertex point (large orange circle)
  fill(255, 165, 0); // orange
  noStroke();
  circle(centerX, centerY, 14);

  // Display angle measure near the arc
  let midAngle = -angleRad / 2;
  let labelDist = arcRadius + 30;
  let labelX = centerX + labelDist * cos(midAngle);
  let labelY = centerY + labelDist * sin(midAngle);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text(sliderValue + '\u00B0', labelX, labelY);

  // Display large angle measure text at top
  textSize(28);
  textAlign(CENTER, TOP);
  let typeColor = getAngleColor();
  fill(typeColor);
  text('Angle: ' + sliderValue + '\u00B0', canvasWidth / 2, 45);
}

function drawSlider() {
  updateSliderDimensions();

  // Draw label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Adjust Angle: ' + sliderValue + '\u00B0', 12, sliderY);

  // Draw slider track
  stroke(180);
  strokeWeight(1);
  fill(220);
  rect(sliderX, sliderY - sliderHeight / 2, sliderW, sliderHeight, sliderHeight / 2);

  // Draw filled portion of track
  let handleX = map(sliderValue, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  let filledColor = getAngleColor();
  noStroke();
  fill(filledColor);
  rect(sliderX, sliderY - sliderHeight / 2, handleX - sliderX, sliderHeight, sliderHeight / 2, 0, 0, sliderHeight / 2);

  // Draw handle
  fill(filledColor);
  stroke(100);
  strokeWeight(1);
  circle(handleX, sliderY, handleRadius * 2);

  // Draw handle inner circle
  fill(255);
  noStroke();
  circle(handleX, sliderY, handleRadius);
}

function drawClassification() {
  let classification = getAngleClassification();
  let typeColor = getAngleColor();

  noStroke();
  fill(typeColor);
  textAlign(CENTER, CENTER);
  textSize(18);
  text(classification, canvasWidth / 2, drawHeight + 60);
}

function getAngleClassification() {
  if (sliderValue < 90) {
    return 'This is an ACUTE angle';
  } else if (sliderValue === 90) {
    return 'This is a RIGHT angle';
  } else if (sliderValue < 180) {
    return 'This is an OBTUSE angle';
  } else {
    return 'This is a STRAIGHT angle';
  }
}

function getAngleColor() {
  if (sliderValue < 90) {
    return color(0, 150, 0); // green
  } else if (sliderValue === 90) {
    return color(30, 100, 200); // blue
  } else if (sliderValue < 180) {
    return color(230, 140, 0); // orange
  } else {
    return color(130, 0, 180); // purple
  }
}

function mousePressed() {
  let handleX = map(sliderValue, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  let d = dist(mouseX, mouseY, handleX, sliderY);
  if (d < handleRadius * 2) {
    isDragging = true;
  }
  // Also allow clicking on the track to jump the slider
  if (mouseY > sliderY - 15 && mouseY < sliderY + 15 &&
      mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    isDragging = true;
    updateSliderValue();
  }
}

function mouseDragged() {
  if (isDragging) {
    updateSliderValue();
  }
}

function mouseReleased() {
  isDragging = false;
}

function updateSliderValue() {
  let newVal = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
  sliderValue = constrain(round(newVal), sliderMin, sliderMax);
}

function updateSliderDimensions() {
  sliderX = sliderLeftMargin;
  sliderW = canvasWidth - sliderLeftMargin - margin;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderDimensions();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
