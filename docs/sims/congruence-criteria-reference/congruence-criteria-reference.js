// All Five Congruence Criteria Reference
// Complete visual reference for triangle congruence criteria

let canvasWidth = 800;
let drawHeight = 700;
let canvasHeight = drawHeight;

let selectedCriterion = -1; // -1 = show all

let criteria = [
  { name: "SSS", fullName: "Side-Side-Side", valid: true, description: "Three pairs of congruent sides" },
  { name: "SAS", fullName: "Side-Angle-Side", valid: true, description: "Two sides + included angle" },
  { name: "ASA", fullName: "Angle-Side-Angle", valid: true, description: "Two angles + included side" },
  { name: "AAS", fullName: "Angle-Angle-Side", valid: true, description: "Two angles + non-included side" },
  { name: "HL", fullName: "Hypotenuse-Leg", valid: true, description: "Right triangles only" },
  { name: "AAA", fullName: "Angle-Angle-Angle", valid: false, description: "Similar, NOT congruent!" },
  { name: "SSA", fullName: "Side-Side-Angle", valid: false, description: "Ambiguous case - NOT valid!" }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Complete reference for all triangle congruence criteria', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Triangle Congruence Criteria: Complete Reference", canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(10);
  text('Click any criterion to highlight', canvasWidth / 2, 30);

  drawCriteriaGrid();
  drawSummary();
}

function drawCriteriaGrid() {
  // Top row: SSS, SAS, ASA (3 valid)
  let topRowY = 50;
  let panelWidth = (canvasWidth - 50) / 3;
  let panelHeight = 180;

  for (let i = 0; i < 3; i++) {
    let x = 15 + i * (panelWidth + 5);
    drawCriterionPanel(x, topRowY, panelWidth, panelHeight, i);
  }

  // Middle row: AAS, HL (2 valid)
  let midRowY = topRowY + panelHeight + 10;
  let midPanelWidth = (canvasWidth - 45) / 2;

  for (let i = 0; i < 2; i++) {
    let x = 15 + i * (midPanelWidth + 10);
    drawCriterionPanel(x, midRowY, midPanelWidth, panelHeight, i + 3);
  }

  // Bottom row: AAA, SSA (2 invalid)
  let bottomRowY = midRowY + panelHeight + 10;

  for (let i = 0; i < 2; i++) {
    let x = 15 + i * (midPanelWidth + 10);
    drawCriterionPanel(x, bottomRowY, midPanelWidth, panelHeight, i + 5);
  }
}

function drawCriterionPanel(x, y, w, h, index) {
  let crit = criteria[index];
  let isSelected = selectedCriterion === -1 || selectedCriterion === index;
  let alpha = isSelected ? 255 : 60;

  // Panel background
  let borderColor = crit.valid ? '#4CAF50' : '#F44336';
  fill(255, 255, 255, alpha);
  stroke(isSelected ? borderColor : '#E0E0E0');
  strokeWeight(isSelected ? 3 : 1);
  rect(x, y, w, h, 8);

  let cx = x + w / 2;

  // Valid/Invalid badge
  if (crit.valid) {
    fill(76, 175, 80, alpha);
  } else {
    fill(244, 67, 54, alpha);
  }
  noStroke();
  rect(x, y, w, 25, 8, 8, 0, 0);

  // Badge text
  fill(255, 255, 255, alpha);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(crit.valid ? "✓ Valid" : "✗ Not Valid", cx, y + 12);

  // Criterion name
  fill(crit.valid ? color(33, 150, 243, alpha) : color(244, 67, 54, alpha));
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(crit.name, cx, y + 32);

  // Full name
  fill(66, 66, 66, alpha);
  textSize(10);
  textStyle(NORMAL);
  text(crit.fullName, cx, y + 52);

  // Draw triangle representation
  let triY = y + 90;
  drawCriterionTriangles(cx, triY, index, alpha, w);

  // Description
  fill(117, 117, 117, alpha);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text(crit.description, cx, y + h - 8);
}

function drawCriterionTriangles(cx, cy, index, alpha, panelWidth) {
  let scale = panelWidth < 250 ? 8 : 10;

  switch(index) {
    case 0: drawSSSTriangles(cx, cy, scale, alpha); break;
    case 1: drawSASTriangles(cx, cy, scale, alpha); break;
    case 2: drawASATriangles(cx, cy, scale, alpha); break;
    case 3: drawAASTriangles(cx, cy, scale, alpha); break;
    case 4: drawHLTriangles(cx, cy, scale, alpha); break;
    case 5: drawAAATriangles(cx, cy, scale, alpha); break;
    case 6: drawSSATriangles(cx, cy, scale, alpha); break;
  }
}

function drawSSSTriangles(cx, cy, scale, alpha) {
  // Two triangles with all sides marked
  let offset = 35;

  // Triangle 1
  drawTriangleWithMarks(cx - offset, cy, scale, '#1565C0', alpha, [1, 2, 3], [], false);

  // Triangle 2
  drawTriangleWithMarks(cx + offset, cy, scale, '#43A047', alpha, [1, 2, 3], [], false);
}

function drawSASTriangles(cx, cy, scale, alpha) {
  let offset = 35;

  // Two sides + included angle
  drawTriangleWithMarks(cx - offset, cy, scale, '#1565C0', alpha, [1, 0, 2], [1], false);
  drawTriangleWithMarks(cx + offset, cy, scale, '#43A047', alpha, [1, 0, 2], [1], false);
}

function drawASATriangles(cx, cy, scale, alpha) {
  let offset = 35;

  // Two angles + included side
  drawTriangleWithMarks(cx - offset, cy, scale, '#1565C0', alpha, [0, 1, 0], [0, 1], false);
  drawTriangleWithMarks(cx + offset, cy, scale, '#43A047', alpha, [0, 1, 0], [0, 1], false);
}

function drawAASTriangles(cx, cy, scale, alpha) {
  let offset = 45;

  // Two angles + non-included side
  drawTriangleWithMarks(cx - offset, cy, scale, '#1565C0', alpha, [1, 0, 0], [0, 2], false);
  drawTriangleWithMarks(cx + offset, cy, scale, '#43A047', alpha, [1, 0, 0], [0, 2], false);
}

function drawHLTriangles(cx, cy, scale, alpha) {
  let offset = 45;

  // Right triangles with hypotenuse and leg
  drawRightTriangleWithMarks(cx - offset, cy, scale, '#1565C0', alpha);
  drawRightTriangleWithMarks(cx + offset, cy, scale, '#43A047', alpha);
}

function drawAAATriangles(cx, cy, scale, alpha) {
  // Two similar triangles of different sizes
  let offset = 55;

  drawTriangleWithMarks(cx - offset, cy - 5, scale * 0.7, '#F44336', alpha, [0, 0, 0], [0, 1, 2], false);
  drawTriangleWithMarks(cx + offset, cy + 5, scale * 1.1, '#FF9800', alpha, [0, 0, 0], [0, 1, 2], false);

  // "≠" between them
  fill(244, 67, 54, alpha);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("≠", cx, cy);
}

function drawSSATriangles(cx, cy, scale, alpha) {
  // Show two different triangles possible
  let offset = 55;

  drawTriangleWithMarks(cx - offset, cy - 5, scale * 0.9, '#F44336', alpha, [1, 2, 0], [2], false);
  drawTriangleWithMarks(cx + offset, cy + 5, scale * 0.9, '#FF9800', alpha, [1, 2, 0], [2], false);

  // "?" between them
  fill(244, 67, 54, alpha);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("?", cx, cy);
}

function drawTriangleWithMarks(cx, cy, scale, col, alpha, sideMarks, angleMarks, isRight) {
  // Simple triangle
  let a = 5 * scale, b = 4 * scale, c = 6 * scale;

  let ax = cx - c / 2;
  let ay = cy + 15;
  let bx = cx + c / 2;
  let by = cy + 15;

  let angleA = acos((b*b + c*c - a*a) / (2*b*c));
  let Cx = ax + b * cos(-angleA);
  let Cy = ay + b * sin(-angleA);

  // Draw triangle
  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.25);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Side marks
  if (sideMarks[0] > 0) drawTicks(bx, by, Cx, Cy, sideMarks[0], col, alpha);
  if (sideMarks[1] > 0) drawTicks(Cx, Cy, ax, ay, sideMarks[1], col, alpha);
  if (sideMarks[2] > 0) drawTicks(ax, ay, bx, by, sideMarks[2], col, alpha);

  // Angle marks
  let vertices = [{x: ax, y: ay}, {x: bx, y: by}, {x: Cx, y: Cy}];
  for (let i of angleMarks) {
    drawAngleArc(vertices, i, col, alpha);
  }
}

function drawRightTriangleWithMarks(cx, cy, scale, col, alpha) {
  let leg1 = 4 * scale;
  let leg2 = 3 * scale;

  let ax = cx - leg1 / 2;
  let ay = cy + 15;
  let bx = cx + leg1 / 2;
  let by = cy + 15;
  let Cx = ax;
  let Cy = ay - leg2;

  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.25);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Right angle mark at A
  let size = 8;
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1);
  noFill();
  rect(ax, ay - size, size, size);

  // Hypotenuse mark (2 ticks)
  drawTicks(bx, by, Cx, Cy, 2, col, alpha);

  // Leg mark (1 tick)
  drawTicks(ax, ay, Cx, Cy, 1, col, alpha);
}

function drawTicks(x1, y1, x2, y2, count, col, alpha) {
  if (count === 0) return;

  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI/2);

  let c1 = color(col);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);

  let spacing = 3;
  let len = 6;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count-1)/2) * spacing;
    line(offset, -len/2, offset, len/2);
  }
  pop();
}

function drawAngleArc(vertices, idx, col, alpha) {
  let v = vertices[idx];
  let prev = vertices[(idx + 2) % 3];
  let next = vertices[(idx + 1) % 3];

  let a1 = atan2(prev.y - v.y, prev.x - v.x);
  let a2 = atan2(next.y - v.y, next.x - v.x);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  let c1 = color(col);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);
  noFill();
  arc(v.x, v.y, 12, 12, a1, a2);
}

function drawSummary() {
  let y = drawHeight - 50;

  fill(33, 150, 243, 200);
  noStroke();
  rect(10, y, canvasWidth - 20, 45, 5);

  fill('#FFFFFF');
  textSize(11);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Summary", canvasWidth / 2, y + 5);
  textStyle(NORMAL);
  textSize(10);
  text("Valid: SSS, SAS, ASA, AAS, HL (right triangles only)", canvasWidth / 2, y + 20);
  text("Invalid: AAA (gives similarity only), SSA (ambiguous case)", canvasWidth / 2, y + 33);
}

function mousePressed() {
  // Check top row (SSS, SAS, ASA)
  let topRowY = 50;
  let panelWidth = (canvasWidth - 50) / 3;
  let panelHeight = 180;

  for (let i = 0; i < 3; i++) {
    let x = 15 + i * (panelWidth + 5);
    if (mouseX >= x && mouseX <= x + panelWidth &&
        mouseY >= topRowY && mouseY <= topRowY + panelHeight) {
      selectedCriterion = selectedCriterion === i ? -1 : i;
      return;
    }
  }

  // Check middle row (AAS, HL)
  let midRowY = topRowY + panelHeight + 10;
  let midPanelWidth = (canvasWidth - 45) / 2;

  for (let i = 0; i < 2; i++) {
    let x = 15 + i * (midPanelWidth + 10);
    if (mouseX >= x && mouseX <= x + midPanelWidth &&
        mouseY >= midRowY && mouseY <= midRowY + panelHeight) {
      selectedCriterion = selectedCriterion === (i + 3) ? -1 : (i + 3);
      return;
    }
  }

  // Check bottom row (AAA, SSA)
  let bottomRowY = midRowY + panelHeight + 10;

  for (let i = 0; i < 2; i++) {
    let x = 15 + i * (midPanelWidth + 10);
    if (mouseX >= x && mouseX <= x + midPanelWidth &&
        mouseY >= bottomRowY && mouseY <= bottomRowY + panelHeight) {
      selectedCriterion = selectedCriterion === (i + 5) ? -1 : (i + 5);
      return;
    }
  }

  // Click outside shows all
  selectedCriterion = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
