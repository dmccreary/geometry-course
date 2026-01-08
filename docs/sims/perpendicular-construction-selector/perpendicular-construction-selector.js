// Perpendicular Construction Selector
// Interactive tool showing both perpendicular construction methods

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let mode = 0; // 0 = point ON line, 1 = point NOT on line
let step = 0;
let maxSteps = [5, 5]; // steps for each mode

let pointP;
let lineY;
let autoPlay = false;
let lastStepTime = 0;
let stepDelay = 1500;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  lineY = drawHeight / 2;
  resetConstruction();

  describe('Interactive perpendicular construction tool with mode selection for point on or off line', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#F5F5F5');

  // Title
  fill('#00838F');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Perpendicular Construction Selector', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Mode indicator
  fill(mode === 0 ? '#1565C0' : '#C62828');
  textSize(12);
  text(mode === 0 ? 'Mode: Point ON Line' : 'Mode: Point NOT on Line', canvasWidth / 2, 32);

  drawConstruction();
  drawControls();

  // Auto play
  if (autoPlay && millis() - lastStepTime > stepDelay) {
    if (step < maxSteps[mode]) {
      step++;
      lastStepTime = millis();
    } else {
      autoPlay = false;
    }
  }
}

function resetConstruction() {
  if (mode === 0) {
    // Point ON line
    pointP = { x: canvasWidth / 2, y: lineY };
  } else {
    // Point NOT on line
    pointP = { x: canvasWidth / 2, y: lineY - 120 };
  }
  step = 0;
  autoPlay = false;
}

function drawConstruction() {
  push();

  // Draw line ℓ
  stroke('#1565C0');
  strokeWeight(3);
  line(50, lineY, canvasWidth - 50, lineY);

  // Line label
  fill('#1565C0');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('ℓ', canvasWidth - 40, lineY);

  if (mode === 0) {
    drawOnLineConstruction();
  } else {
    drawOffLineConstruction();
  }

  // Step instruction
  fill('#424242');
  textSize(13);
  textAlign(CENTER, TOP);
  let instruction = getInstruction();
  text(instruction, canvasWidth / 2, drawHeight - 25);

  pop();
}

function drawOnLineConstruction() {
  let arcRadius = 80;

  // Point P on line
  fill('#C62828');
  noStroke();
  ellipse(pointP.x, pointP.y, 12, 12);

  fill('#C62828');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('P', pointP.x, pointP.y - 8);

  if (step >= 1) {
    // Arcs from P on both sides
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    arc(pointP.x, pointP.y, arcRadius * 2, arcRadius * 2, PI - 0.3, PI + 0.3);
    arc(pointP.x, pointP.y, arcRadius * 2, arcRadius * 2, -0.3, 0.3);

    // Points A and B
    fill('#7B1FA2');
    noStroke();
    ellipse(pointP.x - arcRadius, lineY, 8, 8);
    ellipse(pointP.x + arcRadius, lineY, 8, 8);

    textSize(11);
    textAlign(CENTER, TOP);
    text('A', pointP.x - arcRadius, lineY + 5);
    text('B', pointP.x + arcRadius, lineY + 5);
  }

  if (step >= 2) {
    // Larger arcs from A and B
    let largerRadius = 100;
    stroke('#2E7D32');
    strokeWeight(2);
    noFill();
    arc(pointP.x - arcRadius, lineY, largerRadius * 2, largerRadius * 2, -PI / 2 - 0.4, -PI / 2 + 0.4);
  }

  if (step >= 3) {
    let largerRadius = 100;
    stroke('#E65100');
    strokeWeight(2);
    noFill();
    arc(pointP.x + arcRadius, lineY, largerRadius * 2, largerRadius * 2, -PI / 2 - 0.4, -PI / 2 + 0.4);
  }

  if (step >= 4) {
    // Point Q (intersection above)
    let qY = lineY - 75;

    fill('#9C27B0');
    noStroke();
    ellipse(pointP.x, qY, 10, 10);

    fill('#9C27B0');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Q', pointP.x, qY - 5);
  }

  if (step >= 5) {
    // Perpendicular line PQ
    let qY = lineY - 75;

    stroke('#2E7D32');
    strokeWeight(3);
    line(pointP.x, lineY + 60, pointP.x, qY - 20);

    // Right angle symbol
    stroke('#333');
    strokeWeight(2);
    noFill();
    rect(pointP.x - 10, lineY - 10, 10, 10);

    // Result label
    fill('#2E7D32');
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('PQ ⊥ ℓ ✓', pointP.x, 70);
    textStyle(NORMAL);
  }
}

function drawOffLineConstruction() {
  let arcRadius = 150;

  // Point P above line
  fill('#C62828');
  noStroke();
  ellipse(pointP.x, pointP.y, 12, 12);

  fill('#C62828');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('P', pointP.x, pointP.y - 8);

  if (step >= 1) {
    // Arc from P crossing line at two points
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    arc(pointP.x, pointP.y, arcRadius * 2, arcRadius * 2, 0.3, PI - 0.3);

    // Points A and B on line
    let intersectDist = sqrt(arcRadius * arcRadius - pow(lineY - pointP.y, 2));

    fill('#7B1FA2');
    noStroke();
    ellipse(pointP.x - intersectDist, lineY, 8, 8);
    ellipse(pointP.x + intersectDist, lineY, 8, 8);

    textSize(11);
    textAlign(CENTER, TOP);
    text('A', pointP.x - intersectDist, lineY + 5);
    text('B', pointP.x + intersectDist, lineY + 5);
  }

  if (step >= 2) {
    // Arc from A below line
    let intersectDist = sqrt(arcRadius * arcRadius - pow(lineY - pointP.y, 2));
    let smallerRadius = 100;

    stroke('#2E7D32');
    strokeWeight(2);
    noFill();
    arc(pointP.x - intersectDist, lineY, smallerRadius * 2, smallerRadius * 2, PI / 4, 3 * PI / 4);
  }

  if (step >= 3) {
    // Arc from B below line
    let intersectDist = sqrt(arcRadius * arcRadius - pow(lineY - pointP.y, 2));
    let smallerRadius = 100;

    stroke('#E65100');
    strokeWeight(2);
    noFill();
    arc(pointP.x + intersectDist, lineY, smallerRadius * 2, smallerRadius * 2, PI / 4, 3 * PI / 4);
  }

  if (step >= 4) {
    // Point Q (intersection below line)
    let qY = lineY + 70;

    fill('#9C27B0');
    noStroke();
    ellipse(pointP.x, qY, 10, 10);

    fill('#9C27B0');
    textSize(11);
    textAlign(CENTER, TOP);
    text('Q', pointP.x, qY + 5);
  }

  if (step >= 5) {
    // Perpendicular line PQ
    let qY = lineY + 70;

    stroke('#2E7D32');
    strokeWeight(3);
    line(pointP.x, pointP.y + 20, pointP.x, qY + 20);

    // Foot of perpendicular
    fill('#C62828');
    noStroke();
    ellipse(pointP.x, lineY, 8, 8);

    textSize(10);
    textAlign(LEFT, CENTER);
    text('M (foot)', pointP.x + 8, lineY);

    // Right angle symbol
    stroke('#333');
    strokeWeight(2);
    noFill();
    rect(pointP.x - 10, lineY, 10, 10);

    // Result label
    fill('#2E7D32');
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('PQ ⊥ ℓ ✓', pointP.x, 70);
    textStyle(NORMAL);
  }
}

function getInstruction() {
  let instructions = [
    [ // Mode 0: ON line
      'Given: Point P on line ℓ',
      'Step 1: Draw arcs from P on both sides, mark A and B',
      'Step 2: Draw arc from A above the line',
      'Step 3: Draw arc from B (same radius) to intersect',
      'Step 4: Mark intersection point Q',
      'Step 5: Draw line PQ - perpendicular through P!'
    ],
    [ // Mode 1: NOT on line
      'Given: Point P NOT on line ℓ',
      'Step 1: Draw arc from P crossing line at A and B',
      'Step 2: Draw arc from A on opposite side of P',
      'Step 3: Draw arc from B (same radius) to intersect',
      'Step 4: Mark intersection point Q',
      'Step 5: Draw line PQ - perpendicular to ℓ!'
    ]
  ];

  return instructions[mode][min(step, 5)];
}

function drawControls() {
  let y = drawHeight + 15;

  // Mode toggle buttons
  let modeWidth = 130;
  let modeX = 30;

  // ON line button
  fill(mode === 0 ? '#1565C0' : '#E3F2FD');
  stroke(mode === 0 ? '#1565C0' : '#90CAF9');
  strokeWeight(2);
  rect(modeX, y, modeWidth, 35, 5);

  fill(mode === 0 ? '#FFFFFF' : '#1565C0');
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Point ON Line', modeX + modeWidth / 2, y + 17);

  // NOT on line button
  fill(mode === 1 ? '#C62828' : '#FFEBEE');
  stroke(mode === 1 ? '#C62828' : '#EF9A9A');
  strokeWeight(2);
  rect(modeX + modeWidth + 10, y, modeWidth, 35, 5);

  fill(mode === 1 ? '#FFFFFF' : '#C62828');
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Point NOT on Line', modeX + modeWidth * 1.5 + 10, y + 17);

  // Step controls
  let btnX = canvasWidth - 320;
  let btnW = 65;

  // Previous
  fill(step > 0 ? '#7B1FA2' : '#E0E0E0');
  noStroke();
  rect(btnX, y, btnW, 35, 5);
  fill(step > 0 ? '#FFFFFF' : '#9E9E9E');
  textSize(11);
  text('← Prev', btnX + btnW / 2, y + 17);

  // Next
  fill(step < maxSteps[mode] ? '#7B1FA2' : '#E0E0E0');
  rect(btnX + btnW + 5, y, btnW, 35, 5);
  fill(step < maxSteps[mode] ? '#FFFFFF' : '#9E9E9E');
  text('Next →', btnX + btnW * 1.5 + 5, y + 17);

  // Auto Play
  fill(autoPlay ? '#E65100' : '#FF9800');
  rect(btnX + (btnW + 5) * 2, y, btnW, 35, 5);
  fill('#FFFFFF');
  text(autoPlay ? 'Stop' : 'Auto', btnX + btnW * 2.5 + 10, y + 17);

  // Reset
  fill('#607D8B');
  rect(btnX + (btnW + 5) * 3, y, btnW, 35, 5);
  fill('#FFFFFF');
  text('Reset', btnX + btnW * 3.5 + 15, y + 17);

  // Step indicator
  fill('#424242');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Step ' + step + ' of ' + maxSteps[mode], canvasWidth / 2, y + 60);
}

function mousePressed() {
  let y = drawHeight + 15;
  let modeWidth = 130;
  let modeX = 30;
  let btnX = canvasWidth - 320;
  let btnW = 65;

  // Mode buttons
  if (mouseY > y && mouseY < y + 35) {
    if (mouseX > modeX && mouseX < modeX + modeWidth) {
      if (mode !== 0) {
        mode = 0;
        resetConstruction();
      }
    } else if (mouseX > modeX + modeWidth + 10 && mouseX < modeX + modeWidth * 2 + 10) {
      if (mode !== 1) {
        mode = 1;
        resetConstruction();
      }
    }

    // Step controls
    if (mouseX > btnX && mouseX < btnX + btnW && step > 0) {
      step--;
    } else if (mouseX > btnX + btnW + 5 && mouseX < btnX + btnW * 2 + 5 && step < maxSteps[mode]) {
      step++;
    } else if (mouseX > btnX + (btnW + 5) * 2 && mouseX < btnX + btnW * 3 + 10) {
      autoPlay = !autoPlay;
      lastStepTime = millis();
    } else if (mouseX > btnX + (btnW + 5) * 3 && mouseX < btnX + btnW * 4 + 15) {
      resetConstruction();
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
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
  }
}
