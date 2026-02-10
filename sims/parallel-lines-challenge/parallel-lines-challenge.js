// Parallel Lines Construction Challenge
// Interactive practice for constructing parallel lines

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let step = 0;
let maxSteps = 5;
let autoPlay = false;
let lastStepTime = 0;
let stepDelay = 1500;

// Construction points
let lineStart, lineEnd;
let pointP;
let transversalEnd;
let angleArcRadius = 40;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetConstruction();

  describe('Interactive parallel lines construction challenge using corresponding angles method', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#E8F5E9');

  // Title
  fill('#2E7D32');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Parallel Lines Construction Challenge', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Construct a line through P parallel to ℓ using corresponding angles', canvasWidth / 2, 32);

  drawConstruction();
  drawControls();

  // Auto play
  if (autoPlay && millis() - lastStepTime > stepDelay) {
    if (step < maxSteps) {
      step++;
      lastStepTime = millis();
    } else {
      autoPlay = false;
    }
  }
}

function resetConstruction() {
  lineStart = { x: 80, y: 350 };
  lineEnd = { x: canvasWidth - 80, y: 350 };
  pointP = { x: canvasWidth / 2, y: 180 };
  transversalEnd = { x: lineStart.x + 150, y: lineEnd.y };
  step = 0;
  autoPlay = false;
}

function drawConstruction() {
  push();

  // Line ℓ
  stroke('#1565C0');
  strokeWeight(3);
  line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);

  fill('#1565C0');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('ℓ', lineEnd.x + 10, lineEnd.y);

  // Point P
  fill('#C62828');
  noStroke();
  ellipse(pointP.x, pointP.y, 12, 12);

  fill('#C62828');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('P', pointP.x, pointP.y - 8);

  if (step >= 1) {
    // Draw transversal through P
    stroke('#757575');
    strokeWeight(2);
    setLineDash([5, 5]);
    line(pointP.x, pointP.y, transversalEnd.x, transversalEnd.y);

    // Extend transversal above P
    let dx = pointP.x - transversalEnd.x;
    let dy = pointP.y - transversalEnd.y;
    let extendX = pointP.x + dx * 0.5;
    let extendY = pointP.y + dy * 0.5;
    line(pointP.x, pointP.y, extendX, extendY);
    setLineDash([]);

    // Intersection point Q
    fill('#7B1FA2');
    noStroke();
    ellipse(transversalEnd.x, transversalEnd.y, 10, 10);

    fill('#7B1FA2');
    textSize(11);
    textAlign(CENTER, TOP);
    text('Q', transversalEnd.x, transversalEnd.y + 8);
  }

  if (step >= 2) {
    // Show angle at Q
    let angle1 = atan2(pointP.y - transversalEnd.y, pointP.x - transversalEnd.x);

    stroke('#E65100');
    strokeWeight(2);
    noFill();
    arc(transversalEnd.x, transversalEnd.y, angleArcRadius * 2, angleArcRadius * 2, PI, angle1);

    // Angle marker
    fill('#E65100');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('∠1', transversalEnd.x - 30, transversalEnd.y - 25);
  }

  if (step >= 3) {
    // Copy angle construction at P - show arc
    let angle1 = atan2(transversalEnd.y - pointP.y, transversalEnd.x - pointP.x);

    stroke('#E65100');
    strokeWeight(2);
    noFill();
    arc(pointP.x, pointP.y, angleArcRadius * 2, angleArcRadius * 2, angle1, angle1 + PI);

    // Construction marks
    stroke('#7B1FA2');
    strokeWeight(1);
    arc(pointP.x, pointP.y, angleArcRadius * 1.5, angleArcRadius * 1.5, angle1, 0);
  }

  if (step >= 4) {
    // Show corresponding angle at P
    let angle1 = atan2(transversalEnd.y - pointP.y, transversalEnd.x - pointP.x);

    stroke('#2E7D32');
    strokeWeight(2);
    noFill();
    arc(pointP.x, pointP.y, angleArcRadius * 2, angleArcRadius * 2, 0, angle1 + PI);

    fill('#2E7D32');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('∠2', pointP.x + 35, pointP.y + 20);
  }

  if (step >= 5) {
    // Draw parallel line m through P
    stroke('#2E7D32');
    strokeWeight(3);
    line(80, pointP.y, canvasWidth - 80, pointP.y);

    // Label
    fill('#2E7D32');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('m', canvasWidth - 70, pointP.y);

    // Parallel marks
    stroke('#2E7D32');
    strokeWeight(2);
    let markX = canvasWidth / 2 + 100;
    triangle(markX, lineStart.y - 8, markX - 5, lineStart.y, markX + 5, lineStart.y);
    triangle(markX, pointP.y - 8, markX - 5, pointP.y, markX + 5, pointP.y);

    // Success message
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('✓ m ∥ ℓ (Corresponding angles are congruent!)', canvasWidth / 2, 55);
    textStyle(NORMAL);

    // Show angle equality
    fill('#E65100');
    textSize(11);
    text('∠1 ≅ ∠2', canvasWidth / 2, 75);
  }

  // Step instruction
  fill('#424242');
  textSize(12);
  textAlign(CENTER, TOP);
  let instruction = getInstruction();
  text(instruction, canvasWidth / 2, drawHeight - 25);

  pop();
}

function getInstruction() {
  let instructions = [
    'Given: Line ℓ and point P not on ℓ',
    'Step 1: Draw a transversal through P intersecting ℓ at Q',
    'Step 2: Mark the angle formed at Q (angle between transversal and ℓ)',
    'Step 3: Begin copying the angle at point P',
    'Step 4: Complete the copied angle at P (corresponding angle)',
    'Step 5: Draw line m through P - parallel to ℓ!'
  ];

  return instructions[min(step, 5)];
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawControls() {
  let y = drawHeight + 15;
  let btnW = 70;
  let btnX = canvasWidth / 2 - (btnW * 2 + 15);

  // Previous
  fill(step > 0 ? '#7B1FA2' : '#E0E0E0');
  noStroke();
  rect(btnX, y, btnW, 35, 5);
  fill(step > 0 ? '#FFFFFF' : '#9E9E9E');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('← Prev', btnX + btnW / 2, y + 17);

  // Next
  fill(step < maxSteps ? '#7B1FA2' : '#E0E0E0');
  rect(btnX + btnW + 5, y, btnW, 35, 5);
  fill(step < maxSteps ? '#FFFFFF' : '#9E9E9E');
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
  text('Step ' + step + ' of ' + maxSteps, canvasWidth / 2, y + 55);
}

function mousePressed() {
  let y = drawHeight + 15;
  let btnW = 70;
  let btnX = canvasWidth / 2 - (btnW * 2 + 15);

  if (mouseY > y && mouseY < y + 35) {
    if (mouseX > btnX && mouseX < btnX + btnW && step > 0) {
      step--;
    } else if (mouseX > btnX + btnW + 5 && mouseX < btnX + btnW * 2 + 5 && step < maxSteps) {
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
