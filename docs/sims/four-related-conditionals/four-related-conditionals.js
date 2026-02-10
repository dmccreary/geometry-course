// Four Related Conditional Statements Diagram
// Shows Original, Converse, Inverse, and Contrapositive with logical relationships
// Canvas-based controls only (no DOM elements)
// MicroSim template version 2026.02

// global variables for width and height
let containerWidth;
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 0; // no controls for this diagram
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Colors for each quadrant
const originalColor = '#BBDEFB';
const converseColor = '#E1BEE7';
const inverseColor = '#FFF9C4';
const contrapositiveColor = '#C8E6C9';

// Box dimensions (calculated in draw based on canvas size)
let boxW, boxH, gapX, gapY, startX, startY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  describe('Diagram showing four related conditional statements: Original, Converse, Inverse, and Contrapositive, with arrows showing their logical relationships.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Calculate responsive box dimensions
  gapX = canvasWidth * 0.06;
  gapY = drawHeight * 0.06;
  startX = canvasWidth * 0.04;
  startY = drawHeight * 0.06;
  boxW = (canvasWidth - 2 * startX - gapX) / 2;
  boxH = (drawHeight - 2 * startY - gapY) / 2;

  // Title
  fill('#333333');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(Math.max(18, canvasWidth * 0.028));
  text('Four Related Conditional Statements', canvasWidth / 2, 10);

  // Draw the four boxes
  drawBox(startX, startY + 20, boxW, boxH, originalColor,
    'ORIGINAL CONDITIONAL', 'If p, then q', '(p \u2192 q)',
    'If it\'s a square, then it\nhas 4 right angles', true);

  drawBox(startX + boxW + gapX, startY + 20, boxW, boxH, converseColor,
    'CONVERSE', 'If q, then p', '(q \u2192 p)',
    'If it has 4 right angles,\nthen it\'s a square', false);

  drawBox(startX, startY + 20 + boxH + gapY, boxW, boxH, inverseColor,
    'INVERSE', 'If not p, then not q', '(\u00ACp \u2192 \u00ACq)',
    'If it\'s not a square, then it\ndoesn\'t have 4 right angles', false);

  drawBox(startX + boxW + gapX, startY + 20 + boxH + gapY, boxW, boxH, contrapositiveColor,
    'CONTRAPOSITIVE', 'If not q, then not p', '(\u00ACq \u2192 \u00ACp)',
    'If it doesn\'t have 4 right\nangles, then it\'s not a square', true);

  // Draw connecting arrows
  drawConnections();
}

function drawBox(x, y, w, h, bgColor, label, statement, notation, example, isTrue) {
  // Box background with rounded corners
  fill(bgColor);
  stroke('#999999');
  strokeWeight(1.5);
  rect(x, y, w, h, 10);

  noStroke();
  let centerX = x + w / 2;
  let lineH = h * 0.15;
  let currentY = y + h * 0.1;

  // Label (bold, larger)
  fill('#333333');
  textAlign(CENTER, CENTER);
  textSize(Math.max(13, canvasWidth * 0.019));
  textStyle(BOLD);
  text(label, centerX, currentY);
  currentY += lineH;

  // Formal statement
  textSize(Math.max(14, canvasWidth * 0.02));
  textStyle(NORMAL);
  fill('#222222');
  text(statement, centerX, currentY);
  currentY += lineH * 0.7;

  // Symbolic notation
  textSize(Math.max(12, canvasWidth * 0.016));
  fill('#555555');
  text(notation, centerX, currentY);
  currentY += lineH * 0.9;

  // Example (smaller, italic-style)
  textSize(Math.max(11, canvasWidth * 0.014));
  fill('#444444');
  // Draw each line of the example separately for multi-line support
  let lines = example.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], centerX, currentY + i * (Math.max(11, canvasWidth * 0.014) + 4));
  }
  currentY += lines.length * (Math.max(11, canvasWidth * 0.014) + 4) + lineH * 0.3;

  // Truth value
  if (isTrue) {
    fill('#2E7D32');
    textSize(Math.max(14, canvasWidth * 0.02));
    textStyle(BOLD);
    text('\u2713 TRUE', centerX, y + h - h * 0.1);
  } else {
    fill('#C62828');
    textSize(Math.max(14, canvasWidth * 0.02));
    textStyle(BOLD);
    text('\u2717 FALSE', centerX, y + h - h * 0.1);
  }
  textStyle(NORMAL);
}

function drawConnections() {
  // Box positions for reference
  let tlX = startX; // top-left box x
  let tlY = startY + 20; // top-left box y
  let trX = startX + boxW + gapX; // top-right box x
  let trY = startY + 20; // top-right box y
  let blX = startX; // bottom-left box x
  let blY = startY + 20 + boxH + gapY; // bottom-left box y
  let brX = startX + boxW + gapX; // bottom-right box x
  let brY = startY + 20 + boxH + gapY; // bottom-right box y

  let arrowSize = 8;
  let labelSize = Math.max(10, canvasWidth * 0.013);

  // 1. Horizontal dashed arrow: Original -> Converse (top)
  drawDashedArrow(
    tlX + boxW, tlY + boxH * 0.35,
    trX, trY + boxH * 0.35,
    '#777777', 1.5
  );
  // Label
  noStroke();
  fill('#666666');
  textSize(labelSize);
  textAlign(CENTER, BOTTOM);
  text('Switch p and q', (tlX + boxW + trX) / 2, tlY + boxH * 0.35 - 5);

  // 2. Vertical dashed arrow: Original -> Inverse (left side)
  drawDashedArrow(
    tlX + boxW * 0.35, tlY + boxH,
    blX + boxW * 0.35, blY,
    '#777777', 1.5
  );
  // Label
  push();
  noStroke();
  fill('#666666');
  textSize(labelSize);
  textAlign(CENTER, CENTER);
  translate(tlX + boxW * 0.35 - 14, (tlY + boxH + blY) / 2);
  rotate(-HALF_PI);
  text('Negate both', 0, 0);
  pop();

  // 3. Diagonal dashed arrow: Original -> Contrapositive
  drawDashedArrow(
    tlX + boxW * 0.7, tlY + boxH,
    brX + boxW * 0.3, brY,
    '#777777', 1.5
  );
  // Label for diagonal
  noStroke();
  fill('#666666');
  textSize(labelSize);
  textAlign(CENTER, CENTER);
  let diagMidX = (tlX + boxW * 0.7 + brX + boxW * 0.3) / 2;
  let diagMidY = (tlY + boxH + brY) / 2;
  // Offset the label slightly to avoid crossing the line
  push();
  translate(diagMidX + 10, diagMidY - 10);
  rotate(atan2(brY - (tlY + boxH), (brX + boxW * 0.3) - (tlX + boxW * 0.7)));
  text('Switch AND negate', 0, -10);
  pop();

  // 4. Thick green curved double arrow: Original <-> Contrapositive (LOGICALLY EQUIVALENT)
  // Draw along the left and bottom edges
  drawEquivalenceArc(
    tlX + boxW * 0.15, tlY + boxH,
    blX + boxW * 0.15, blY + boxH,
    brX, brY + boxH * 0.65,
    '#2E7D32', 3,
    'LOGICALLY EQUIVALENT'
  );

  // 5. Thin gray curved double arrow: Converse <-> Inverse
  drawEquivalenceArcTopRight(
    trX + boxW * 0.85, trY + boxH,
    brX + boxW * 0.85, brY,
    blX + boxW, blY + boxH * 0.35,
    '#888888', 1.5,
    'Logically equivalent\nto each other'
  );
}

function drawDashedArrow(x1, y1, x2, y2, col, weight) {
  stroke(col);
  strokeWeight(weight);
  let d = dist(x1, y1, x2, y2);
  let dashLen = 8;
  let gapLen = 6;
  let dx = (x2 - x1) / d;
  let dy = (y2 - y1) / d;
  let pos = 0;
  let drawing = true;

  while (pos < d) {
    let segLen = drawing ? dashLen : gapLen;
    if (pos + segLen > d) segLen = d - pos;
    if (drawing) {
      line(x1 + dx * pos, y1 + dy * pos,
           x1 + dx * (pos + segLen), y1 + dy * (pos + segLen));
    }
    pos += segLen;
    drawing = !drawing;
  }

  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 8;
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
  pop();
}

function drawEquivalenceArc(x1, y1, x1b, y1b, x2, y2, col, weight, label) {
  // Draw a curved path from Original (bottom-left of box) down to Contrapositive (bottom-right)
  // going around the outside left-bottom edge
  stroke(col);
  strokeWeight(weight);
  noFill();

  let midX = startX - canvasWidth * 0.03;
  let midY = (y1 + y1b) / 2;
  let bottomY = y1b + drawHeight * 0.04;

  // Draw the curve using bezier
  beginShape();
  noFill();
  // Start from bottom of original box
  curveVertex(x1, y1);
  curveVertex(x1, y1);
  // Go left
  curveVertex(midX, midY);
  // Go to bottom
  curveVertex(midX, bottomY);
  // Go right to bottom of contrapositive
  curveVertex((midX + x2) / 2, bottomY);
  curveVertex(x2, y2);
  curveVertex(x2, y2);
  endShape();

  // Double arrowheads at both ends
  fill(col);
  noStroke();
  let arrowSize = 9;
  // Arrow at Original end (pointing up)
  push();
  translate(x1, y1);
  rotate(-HALF_PI);
  triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
  pop();
  // Arrow at Contrapositive end (pointing right)
  push();
  translate(x2, y2);
  rotate(0);
  triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
  pop();

  // Label along the bottom curve
  noStroke();
  fill(col);
  textSize(Math.max(11, canvasWidth * 0.015));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(label, (midX + x2) / 2, bottomY + 3);
  textStyle(NORMAL);
}

function drawEquivalenceArcTopRight(x1, y1, x1b, y1b, x2, y2, col, weight, label) {
  // Draw a curved path from Converse (right side) to Inverse (right side going through bottom-right)
  stroke(col);
  strokeWeight(weight);
  noFill();

  let rightX = canvasWidth - canvasWidth * 0.01;
  let midY = (y1 + y1b) / 2;

  // Draw the curve
  beginShape();
  noFill();
  curveVertex(x1, y1);
  curveVertex(x1, y1);
  curveVertex(rightX, midY - (y1b - y1) * 0.2);
  curveVertex(rightX, midY + (y1b - y1) * 0.2);
  curveVertex(x1b, y1b);
  curveVertex(x1b, y1b);
  endShape();

  // Double arrowheads
  fill(col);
  noStroke();
  let arrowSize = 7;
  // Arrow at Converse end (pointing up)
  push();
  translate(x1, y1);
  rotate(-HALF_PI);
  triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
  pop();
  // Arrow at Inverse end (pointing down)
  push();
  translate(x1b, y1b);
  rotate(HALF_PI);
  triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
  pop();

  // Label to the right of the curve
  noStroke();
  fill(col);
  textSize(Math.max(10, canvasWidth * 0.012));
  textAlign(CENTER, CENTER);
  let lines = label.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], rightX - 10, midY + (i - 0.5) * 14);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
