// Congruent Triangles with Corresponding Parts
// Shows correspondence between congruent triangles

let canvasWidth = 800;
let drawHeight = 480;
let canvasHeight = drawHeight;

let highlightPart = -1; // -1=none, 0-2=sides, 3-5=angles
let showCorrespondence = true;

// Triangle ABC (left)
let triABC = {
  A: [1.5, 1],
  B: [4, 1],
  C: [2.5, 3.5],
  sides: [5, 6, 7],
  angles: [60, 80, 40]
};

// Triangle DEF (right)
let triDEF = {
  D: [6, 1],
  E: [8.5, 1],
  F: [7, 3.5],
  sides: [5, 6, 7],
  angles: [60, 80, 40]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Congruent triangles showing corresponding parts', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF3E0');

  // Title
  fill('#E65100');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Congruent Triangles and Corresponding Parts", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click on sides or angles to highlight corresponding parts', canvasWidth / 2, 35);

  drawTriangles();
  if (showCorrespondence) drawCorrespondenceArrows();
  drawCongruenceStatement();
  drawCorrespondenceTable();
  drawControls();
}

function drawTriangles() {
  let cs = min((canvasWidth - 100) / 10, 40);
  let baseY = 280;

  window.cellSize = cs;
  window.baseY = baseY;

  // Draw Triangle ABC
  let ax = 80 + triABC.A[0] * cs;
  let ay = baseY - triABC.A[1] * cs;
  let bx = 80 + triABC.B[0] * cs;
  let by = baseY - triABC.B[1] * cs;
  let cx = 80 + triABC.C[0] * cs;
  let cy = baseY - triABC.C[1] * cs;

  // Fill
  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);
  triangle(ax, ay, bx, by, cx, cy);

  // Tick marks for sides
  drawTickMarks(ax, ay, bx, by, 1, highlightPart === 0);
  drawTickMarks(bx, by, cx, cy, 2, highlightPart === 1);
  drawTickMarks(cx, cy, ax, ay, 3, highlightPart === 2);

  // Angle arcs
  drawAngleArc(ax, ay, bx, by, cx, cy, 1, highlightPart === 3);
  drawAngleArc(bx, by, cx, cy, ax, ay, 2, highlightPart === 4);
  drawAngleArc(cx, cy, ax, ay, bx, by, 3, highlightPart === 5);

  // Vertex labels
  noStroke();
  fill('#0D47A1');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('A', ax - 15, ay);
  text('B', bx + 10, by);
  textAlign(CENTER, BOTTOM);
  text('C', cx, cy - 8);
  textStyle(NORMAL);

  // Draw Triangle DEF
  let dx = 80 + triDEF.D[0] * cs;
  let dy = baseY - triDEF.D[1] * cs;
  let ex = 80 + triDEF.E[0] * cs;
  let ey = baseY - triDEF.E[1] * cs;
  let fx = 80 + triDEF.F[0] * cs;
  let fy = baseY - triDEF.F[1] * cs;

  // Fill
  fill('#4CAF50');
  stroke('#2E7D32');
  strokeWeight(2);
  triangle(dx, dy, ex, ey, fx, fy);

  // Tick marks for sides
  drawTickMarks(dx, dy, ex, ey, 1, highlightPart === 0);
  drawTickMarks(ex, ey, fx, fy, 2, highlightPart === 1);
  drawTickMarks(fx, fy, dx, dy, 3, highlightPart === 2);

  // Angle arcs
  drawAngleArc(dx, dy, ex, ey, fx, fy, 1, highlightPart === 3);
  drawAngleArc(ex, ey, fx, fy, dx, dy, 2, highlightPart === 4);
  drawAngleArc(fx, fy, dx, dy, ex, ey, 3, highlightPart === 5);

  // Vertex labels
  noStroke();
  fill('#2E7D32');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('D', dx - 15, dy);
  text('E', ex + 10, ey);
  textAlign(CENTER, BOTTOM);
  text('F', fx, fy - 8);
  textStyle(NORMAL);

  // Store positions for click detection
  window.triABCPos = {ax, ay, bx, by, cx, cy};
  window.triDEFPos = {dx, dy, ex, ey, fx, fy};
}

function drawTickMarks(x1, y1, x2, y2, count, highlight) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI / 2);

  if (highlight) {
    stroke('#FF5722');
    strokeWeight(3);
  } else {
    stroke('#424242');
    strokeWeight(2);
  }

  let spacing = 6;
  let len = 8;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count - 1) / 2) * spacing;
    line(offset, -len / 2, offset, len / 2);
  }
  pop();
}

function drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, marks, highlight) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  // Ensure we draw the interior angle
  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  noFill();
  if (highlight) {
    stroke('#FF5722');
    strokeWeight(3);
  } else {
    stroke('#424242');
    strokeWeight(1.5);
  }

  let radius = 20;
  arc(vx, vy, radius * 2, radius * 2, a1, a2);

  // Arc marks
  let midAngle = (a1 + a2) / 2;
  let markRadius = radius + 5;

  for (let i = 0; i < marks; i++) {
    let offset = (i - (marks - 1) / 2) * 0.15;
    let angle = midAngle + offset;
    let mx = vx + (markRadius - 3) * cos(angle);
    let my = vy + (markRadius - 3) * sin(angle);
    let nx = vx + (markRadius + 3) * cos(angle);
    let ny = vy + (markRadius + 3) * sin(angle);
    line(mx, my, nx, ny);
  }
}

function drawCorrespondenceArrows() {
  let cs = window.cellSize;
  let baseY = window.baseY;

  stroke('#9E9E9E');
  strokeWeight(1);
  setLineDash([5, 3]);

  // A to D
  let ax = 80 + triABC.A[0] * cs;
  let ay = baseY - triABC.A[1] * cs;
  let dx = 80 + triDEF.D[0] * cs;
  let dy = baseY - triDEF.D[1] * cs;

  // Draw curves
  noFill();
  stroke('#E53935');
  bezier(ax, ay - 20, ax + 50, ay - 80, dx - 50, dy - 80, dx, dy - 20);

  stroke('#4CAF50');
  let bx = 80 + triABC.B[0] * cs;
  let by = baseY - triABC.B[1] * cs;
  let ex = 80 + triDEF.E[0] * cs;
  let ey = baseY - triDEF.E[1] * cs;
  bezier(bx, by + 15, bx + 30, by + 50, ex - 30, ey + 50, ex, ey + 15);

  stroke('#2196F3');
  let cx = 80 + triABC.C[0] * cs;
  let cy = baseY - triABC.C[1] * cs;
  let fx = 80 + triDEF.F[0] * cs;
  let fy = baseY - triDEF.F[1] * cs;
  bezier(cx + 5, cy, cx + 40, cy - 30, fx - 40, fy - 30, fx - 5, fy);

  setLineDash([]);
}

function drawCongruenceStatement() {
  let y = 55;

  fill('#424242');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("△ABC ≅ △DEF", canvasWidth / 2, y);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text("Order matters: A↔D, B↔E, C↔F", canvasWidth / 2, y + 20);
}

function drawCorrespondenceTable() {
  let tableX = canvasWidth / 2 - 180;
  let tableY = drawHeight - 130;
  let colW = 120;
  let rowH = 22;

  // Table header
  fill('#ECEFF1');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(tableX, tableY, colW * 3, rowH);

  noStroke();
  fill('#424242');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Corresponding Sides", tableX + colW * 0.75, tableY + rowH / 2);
  text("Length", tableX + colW * 2.25, tableY + rowH / 2);
  textStyle(NORMAL);

  // Side rows
  let sides = [
    ["AB ≅ DE", "5 units", 0],
    ["BC ≅ EF", "7 units", 1],
    ["AC ≅ DF", "6 units", 2]
  ];

  for (let i = 0; i < sides.length; i++) {
    let y = tableY + rowH * (i + 1);
    let isHighlight = highlightPart === sides[i][2];

    fill(isHighlight ? '#FFECB3' : (i % 2 === 0 ? 'white' : '#FAFAFA'));
    stroke('#BDBDBD');
    rect(tableX, y, colW * 3, rowH);

    noStroke();
    fill(isHighlight ? '#E65100' : '#424242');
    textAlign(CENTER, CENTER);
    text(sides[i][0], tableX + colW * 0.75, y + rowH / 2);
    text(sides[i][1], tableX + colW * 2.25, y + rowH / 2);
  }

  // Angle table
  tableX = canvasWidth / 2 - 180;
  tableY = drawHeight - 130 + rowH * 4 + 10;

  fill('#ECEFF1');
  stroke('#BDBDBD');
  rect(tableX, tableY, colW * 3, rowH);

  noStroke();
  fill('#424242');
  textStyle(BOLD);
  text("Corresponding Angles", tableX + colW * 0.75, tableY + rowH / 2);
  text("Measure", tableX + colW * 2.25, tableY + rowH / 2);
  textStyle(NORMAL);

  let angles = [
    ["∠A ≅ ∠D", "60°", 3],
    ["∠B ≅ ∠E", "80°", 4],
    ["∠C ≅ ∠F", "40°", 5]
  ];

  for (let i = 0; i < angles.length; i++) {
    let y = tableY + rowH * (i + 1);
    let isHighlight = highlightPart === angles[i][2];

    fill(isHighlight ? '#FFECB3' : (i % 2 === 0 ? 'white' : '#FAFAFA'));
    stroke('#BDBDBD');
    rect(tableX, y, colW * 3, rowH);

    noStroke();
    fill(isHighlight ? '#E65100' : '#424242');
    textAlign(CENTER, CENTER);
    text(angles[i][0], tableX + colW * 0.75, y + rowH / 2);
    text(angles[i][1], tableX + colW * 2.25, y + rowH / 2);
  }
}

function drawControls() {
  // Toggle correspondence arrows
  let btnX = canvasWidth - 180;
  let btnY = 55;
  let btnW = 150;
  let btnH = 28;

  fill(showCorrespondence ? '#4CAF50' : '#9E9E9E');
  noStroke();
  rect(btnX, btnY, btnW, btnH, 5);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showCorrespondence ? 'Correspondence ✓' : 'Correspondence', btnX + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  // Toggle correspondence button
  let btnX = canvasWidth - 180;
  let btnY = 55;
  if (mouseX >= btnX && mouseX <= btnX + 150 &&
      mouseY >= btnY && mouseY <= btnY + 28) {
    showCorrespondence = !showCorrespondence;
    return;
  }

  // Check clicks on triangles (simplified - click on table rows instead)
  let tableX = canvasWidth / 2 - 180;
  let tableY = drawHeight - 130;
  let colW = 120;
  let rowH = 22;

  // Check side rows
  for (let i = 0; i < 3; i++) {
    let y = tableY + rowH * (i + 1);
    if (mouseX >= tableX && mouseX <= tableX + colW * 3 &&
        mouseY >= y && mouseY <= y + rowH) {
      highlightPart = highlightPart === i ? -1 : i;
      return;
    }
  }

  // Check angle rows
  tableY = drawHeight - 130 + rowH * 4 + 10;
  for (let i = 0; i < 3; i++) {
    let y = tableY + rowH * (i + 1);
    if (mouseX >= tableX && mouseX <= tableX + colW * 3 &&
        mouseY >= y && mouseY <= y + rowH) {
      highlightPart = highlightPart === (i + 3) ? -1 : (i + 3);
      return;
    }
  }

  highlightPart = -1;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
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
