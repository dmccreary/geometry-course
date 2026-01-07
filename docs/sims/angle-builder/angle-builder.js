// Angle Builder MicroSim
// Interactive angle creation and measurement tool

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;
let defaultTextSize = 16;

// Angle state
let currentAngle = 45; // degrees
let angleSlider;
let resetButton;
let randomButton;
let snapSelect;
let snapValues = [1, 15, 30, 45, 90];
let currentSnapIndex = 0;

// Vertex position
let vertexX, vertexY;
let rayLength = 180;

// Colors
let acuteColor, rightColor, obtuseColor, straightColor, reflexColor;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Define colors
  acuteColor = color('#43A047');    // Green
  rightColor = color('#7B1FA2');    // Purple
  obtuseColor = color('#FF9800');   // Orange
  straightColor = color('#E53935'); // Red
  reflexColor = color('#1565C0');   // Blue

  // Calculate vertex position
  vertexX = canvasWidth * 0.4;
  vertexY = drawHeight * 0.5;

  // Create angle slider
  angleSlider = createSlider(0, 360, currentAngle, 1);
  angleSlider.position(sliderLeftMargin, drawHeight + 35);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin - 200);
  angleSlider.input(() => {
    currentAngle = snapAngle(angleSlider.value());
    angleSlider.value(currentAngle);
  });

  // Create Reset button
  resetButton = createButton('Reset to 0°');
  resetButton.position(canvasWidth - 190, drawHeight + 15);
  resetButton.mousePressed(() => {
    currentAngle = 0;
    angleSlider.value(0);
  });

  // Create Random button
  randomButton = createButton('Random');
  randomButton.position(canvasWidth - 190, drawHeight + 50);
  randomButton.mousePressed(() => {
    currentAngle = snapAngle(floor(random(0, 361)));
    angleSlider.value(currentAngle);
  });

  // Create Snap selector
  snapSelect = createSelect();
  snapSelect.position(canvasWidth - 100, drawHeight + 15);
  snapSelect.option('1°');
  snapSelect.option('15°');
  snapSelect.option('30°');
  snapSelect.option('45°');
  snapSelect.option('90°');
  snapSelect.selected('1°');
  snapSelect.changed(() => {
    let val = snapSelect.value();
    currentSnapIndex = snapValues.indexOf(parseInt(val));
    currentAngle = snapAngle(currentAngle);
    angleSlider.value(currentAngle);
  });

  describe('Interactive angle builder where students can rotate a ray to create angles of different measures', LABEL);
}

function draw() {
  updateCanvasSize();

  // Update vertex position based on canvas size
  vertexX = canvasWidth * 0.4;
  vertexY = drawHeight * 0.5;

  // Drawing area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill(0);
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Angle Builder', canvasWidth / 2, 15);

  // Get current angle from slider
  currentAngle = angleSlider.value();

  // Draw the angle visualization
  drawAngle();

  // Draw angle information panel
  drawInfoPanel();

  // Draw control labels
  drawControlLabels();
}

function drawAngle() {
  let angleRad = radians(currentAngle);

  // Determine angle color based on type
  let arcColor = getAngleColor(currentAngle);

  // Draw the arc showing the angle
  if (currentAngle > 0 && currentAngle < 360) {
    noFill();
    stroke(arcColor);
    strokeWeight(3);
    let arcRadius = 60;

    if (currentAngle <= 180) {
      arc(vertexX, vertexY, arcRadius * 2, arcRadius * 2, 0, angleRad);
    } else {
      // For reflex angles, draw the arc the other way
      arc(vertexX, vertexY, arcRadius * 2, arcRadius * 2, 0, angleRad);
    }

    // Draw angle label inside arc
    let labelAngle = angleRad / 2;
    let labelRadius = arcRadius + 25;
    let labelX = vertexX + cos(labelAngle) * labelRadius;
    let labelY = vertexY - sin(labelAngle) * labelRadius;

    noStroke();
    fill(arcColor);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(currentAngle + '°', labelX, labelY);
  }

  // Draw Ray 1 (fixed, horizontal)
  stroke('#1976D2');
  strokeWeight(3);
  let ray1EndX = vertexX + rayLength;
  let ray1EndY = vertexY;
  line(vertexX, vertexY, ray1EndX, ray1EndY);
  drawArrowhead(ray1EndX, ray1EndY, 0, '#1976D2');

  // Ray 1 label
  noStroke();
  fill('#1976D2');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Ray 1', ray1EndX + 10, ray1EndY);

  // Draw Ray 2 (rotatable)
  stroke('#E53935');
  strokeWeight(3);
  let ray2EndX = vertexX + cos(-angleRad) * rayLength;
  let ray2EndY = vertexY + sin(-angleRad) * rayLength;
  line(vertexX, vertexY, ray2EndX, ray2EndY);
  drawArrowhead(ray2EndX, ray2EndY, -angleRad, '#E53935');

  // Ray 2 label
  noStroke();
  fill('#E53935');
  textSize(14);
  let labelOffsetX = cos(-angleRad) * 15;
  let labelOffsetY = sin(-angleRad) * 15;
  text('Ray 2', ray2EndX + labelOffsetX, ray2EndY + labelOffsetY);

  // Draw vertex
  fill('#1976D2');
  noStroke();
  circle(vertexX, vertexY, 12);

  // Vertex label
  fill(0);
  textSize(16);
  textAlign(RIGHT, CENTER);
  text('Vertex V', vertexX - 15, vertexY);

  // Draw right angle symbol if angle is 90°
  if (currentAngle === 90) {
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    let squareSize = 20;
    line(vertexX + squareSize, vertexY, vertexX + squareSize, vertexY - squareSize);
    line(vertexX + squareSize, vertexY - squareSize, vertexX, vertexY - squareSize);
  }
}

function drawArrowhead(x, y, angle, col) {
  push();
  translate(x, y);
  rotate(angle);
  fill(col);
  stroke(col);
  strokeWeight(1);
  let arrowSize = 12;
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();
}

function drawInfoPanel() {
  // Info panel on the right side
  let panelX = canvasWidth - 220;
  let panelY = 60;
  let panelWidth = 200;
  let panelHeight = 180;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Angle classification
  let classification = getAngleClassification(currentAngle);
  let arcColor = getAngleColor(currentAngle);

  noStroke();
  fill(arcColor);
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(classification, panelX + panelWidth / 2, panelY + 15);
  textStyle(NORMAL);

  // Current angle
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Angle: ' + currentAngle + '°', panelX + 15, panelY + 50);

  // Complementary angle (if acute)
  if (currentAngle < 90 && currentAngle > 0) {
    let comp = 90 - currentAngle;
    fill('#43A047');
    text('Complement: ' + comp + '°', panelX + 15, panelY + 80);
  } else {
    fill(150);
    text('Complement: N/A', panelX + 15, panelY + 80);
  }

  // Supplementary angle
  if (currentAngle < 180 && currentAngle > 0) {
    let supp = 180 - currentAngle;
    fill('#FF9800');
    text('Supplement: ' + supp + '°', panelX + 15, panelY + 110);
  } else {
    fill(150);
    text('Supplement: N/A', panelX + 15, panelY + 110);
  }

  // Reflex angle
  if (currentAngle > 0 && currentAngle < 360) {
    let reflex = 360 - currentAngle;
    fill('#1565C0');
    text('Reflex: ' + reflex + '°', panelX + 15, panelY + 140);
  }
}

function drawControlLabels() {
  fill(0);
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Angle: ' + currentAngle + '°', 10, drawHeight + 43);

  // Snap label
  textSize(12);
  text('Snap:', canvasWidth - 100, drawHeight + 55);
}

function getAngleColor(angle) {
  if (angle === 0 || angle === 360) {
    return color(150);
  } else if (angle < 90) {
    return acuteColor;
  } else if (angle === 90) {
    return rightColor;
  } else if (angle < 180) {
    return obtuseColor;
  } else if (angle === 180) {
    return straightColor;
  } else {
    return reflexColor;
  }
}

function getAngleClassification(angle) {
  if (angle === 0 || angle === 360) {
    return 'Zero Angle';
  } else if (angle < 90) {
    return 'Acute Angle';
  } else if (angle === 90) {
    return 'Right Angle';
  } else if (angle < 180) {
    return 'Obtuse Angle';
  } else if (angle === 180) {
    return 'Straight Angle';
  } else {
    return 'Reflex Angle';
  }
}

function snapAngle(angle) {
  let snapValue = snapValues[currentSnapIndex];
  if (snapValue === 1) return angle;
  return round(angle / snapValue) * snapValue;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition controls
  angleSlider.position(sliderLeftMargin, drawHeight + 35);
  angleSlider.size(canvasWidth - sliderLeftMargin - margin - 200);
  resetButton.position(canvasWidth - 190, drawHeight + 15);
  randomButton.position(canvasWidth - 190, drawHeight + 50);
  snapSelect.position(canvasWidth - 100, drawHeight + 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 500);
  }
}
