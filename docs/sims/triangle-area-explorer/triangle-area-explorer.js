// Triangle Area Explorer MicroSim
// Interactive exploration of triangle area formula A = (1/2)bh
// Students adjust base and height to see real-time area calculations

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 340;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 185;
let defaultTextSize = 16;

// Triangle parameters
let baseLength = 20; // units
let triangleHeight = 15; // units
const defaultBase = 20;
const defaultHeight = 12;

// Sliders and controls
let baseSlider;
let heightSlider;
let resetButton;

// Scale factor for drawing (pixels per unit)
let scale = 15;

// Triangle position
let baseY = 320; // Y position of base line

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create sliders
  baseSlider = createSlider(0, 40, defaultBase, 0.5);
  baseSlider.position(sliderLeftMargin, drawHeight + 20);
  baseSlider.size(canvasWidth - sliderLeftMargin - margin);

  heightSlider = createSlider(0, 16, defaultHeight, 0.5);
  heightSlider.position(sliderLeftMargin, drawHeight + 50);
  heightSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Create reset button
  resetButton = createButton('Reset to Default');
  resetButton.position(margin, drawHeight + 80);
  resetButton.mousePressed(resetValues);

  describe('Interactive triangle area explorer showing how base and height affect area calculation using the formula A = 1/2 × base × height', LABEL);
}

function draw() {
  updateCanvasSize();

  // Get current values from sliders
  baseLength = baseSlider.value();
  triangleHeight = heightSlider.value();

  // Calculate area
  let area = (baseLength * triangleHeight) / 2;

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  textSize(32);
  textAlign(CENTER, TOP);
  text('Triangle Area Explorer', canvasWidth/2, 15);

  // Measurements display box
  drawMeasurementsBox(area);

  // Draw the triangle
  drawTriangle();

  // Control labels and values
  fill('black');
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Base Length: ' + baseLength.toFixed(1) + ' units', 10, drawHeight + 30);
  text('Height: ' + triangleHeight.toFixed(1) + ' units', 10, drawHeight + 60);

  // Formula display
  textSize(18);
  textAlign(CENTER, CENTER);
  text('Formula: A = ½bh', canvasWidth*.8, drawHeight*.2);

  // Reset default settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawMeasurementsBox(area) {
  push();

  // Box background
  fill('#F5F5F5');
  stroke('silver');
  strokeWeight(1);
  rect(20, 60, 220, 90);

  // Box content
  fill('black');
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text('Base: ' + baseLength.toFixed(1) + ' units', 30, 70);
  text('Height: ' + triangleHeight.toFixed(1) + ' units', 30, 95);

  // Area in blue and bold
  fill('#2196F3');
  textSize(18);
  textStyle(BOLD);
  text('Area: ' + area.toFixed(1) + ' sq units', 30, 120);
  textStyle(NORMAL);

  pop();
}

function drawTriangle() {
  push();
    translate(0, -30);
  // Calculate triangle coordinates
  // Center the triangle horizontally
  let baseStartX = canvasWidth/2 - (baseLength * scale)/2;
  let baseEndX = canvasWidth/2 + (baseLength * scale)/2;
  let apexX = canvasWidth/2;
  let apexY = baseY - (triangleHeight * scale);

  // Draw triangle
  fill(33, 150, 243, 102); // #2196F3 with 40% opacity
  stroke('#0D47A1');
  strokeWeight(3);
  triangle(baseStartX, baseY, baseEndX, baseY, apexX, apexY);

  // Draw base line (slightly extended)
  stroke('black');
  strokeWeight(2);
  line(baseStartX - 10, baseY, baseEndX + 10, baseY);

  // Draw height line (dashed red)
  stroke('red');
  strokeWeight(2);
  drawingContext.setLineDash([8, 8]);
  line(apexX, apexY, apexX, baseY);
  drawingContext.setLineDash([]);

  // Height label
  fill('red');
  noStroke();
  textSize(14);
  textAlign(RIGHT, CENTER);
  text('h = ' + triangleHeight.toFixed(1), apexX - 10, (apexY + baseY)/2);

  // Base label
  fill('black');
  textAlign(CENTER, TOP);
  text('b = ' + baseLength.toFixed(1), canvasWidth/2, baseY + 10);

  // Draw measurement markers at ends of base
  stroke('black');
  strokeWeight(2);
  line(baseStartX, baseY - 5, baseStartX, baseY + 5);
  line(baseEndX, baseY - 5, baseEndX, baseY + 5);

  // Draw right angle indicator at height line
  noFill();
  stroke('red');
  strokeWeight(1);
  let cornerSize = 10;
  rect(apexX - cornerSize/2, baseY - cornerSize, cornerSize, cornerSize);

  pop();
}

function resetValues() {
  baseSlider.value(defaultBase);
  heightSlider.value(defaultHeight);
  baseLength = defaultBase;
  triangleHeight = defaultHeight;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;

    // Update slider widths
    // Note, they may not be created the first time this is called
    if (typeof baseSlider !== 'undefined') {
      baseSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
    if (typeof heightSlider !== 'undefined') {
      heightSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
