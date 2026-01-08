// Exterior Angle Theorem Visualization
// Shows exterior angle equals sum of remote interior angles

let canvasWidth = 800;
let drawHeight = 450;
let canvasHeight = drawHeight;

let selectedExample = 0; // 0 = basic, 1 = all three

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Exterior Angle Theorem showing exterior angle equals sum of remote interior angles', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Exterior Angle Theorem", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click to toggle between examples', canvasWidth / 2, 32);

  if (selectedExample === 0) {
    drawBasicExample();
  } else {
    drawAllThreeExample();
  }

  drawFormulaBox();
}

function drawBasicExample() {
  let cx = canvasWidth / 2;
  let cy = 200;

  // Triangle vertices
  let ax = cx - 130;
  let ay = cy + 80;
  let bx = cx + 80;
  let by = cy + 80;
  let Cx = cx - 30;
  let Cy = cy - 70;

  // Extended side BC beyond C to point D
  let dx = bx + 100;
  let dy = by;

  // Draw extended side (dashed)
  stroke('#9E9E9E');
  strokeWeight(2);
  setLineDash([6, 4]);
  line(bx, by, dx, dy);
  setLineDash([]);

  // Draw triangle
  stroke('#1565C0');
  strokeWeight(3);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Interior angles
  // Angle A (50°)
  drawAngleArc(ax, ay, bx, by, Cx, Cy, '#4CAF50', 150, "50°");

  // Angle B (60°)
  drawAngleArc(bx, by, Cx, Cy, ax, ay, '#9C27B0', 150, "60°");

  // Angle C (70°) - adjacent to exterior
  drawAngleArc(Cx, Cy, ax, ay, bx, by, '#FF9800', 150, "70°");

  // Exterior angle at C (∠ACD)
  let extAngle = drawExteriorAngle(Cx, Cy, ax, ay, bx, by, dx, dy, '#F44336');

  // Vertex labels
  noStroke();
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('A', ax - 15, ay + 10);
  text('B', bx + 15, by + 10);
  text('C', Cx - 15, Cy);
  text('D', dx + 10, dy + 10);
  textStyle(NORMAL);

  // Annotations
  fill('#4CAF50');
  textSize(11);
  textAlign(LEFT, TOP);
  text("Remote interior angles:", 30, cy + 120);
  text("∠A = 50°", 50, cy + 140);
  text("∠B = 60°", 50, cy + 158);

  fill('#F44336');
  text("Exterior angle:", cx + 60, cy + 120);
  text("∠4 = 50° + 60° = 110°", cx + 60, cy + 140);

  fill('#FF9800');
  text("Adjacent interior: ∠C = 70°", cx + 60, cy + 165);

  fill('#757575');
  textSize(10);
  text("Check: ∠4 + ∠C = 110° + 70° = 180° ✓ (linear pair)", 50, cy + 190);
}

function drawAllThreeExample() {
  let cx = canvasWidth / 2;
  let startY = 100;
  let spacing = 130;

  // Draw three small triangles showing exterior angle at each vertex
  drawSmallTriangleWithExterior(cx - 200, startY, 'A', 50, 60, 70);
  drawSmallTriangleWithExterior(cx, startY, 'B', 50, 60, 70);
  drawSmallTriangleWithExterior(cx + 200, startY, 'C', 50, 60, 70);

  // Labels
  noStroke();
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);

  text("Exterior at A", cx - 200, startY + 90);
  text("= ∠B + ∠C", cx - 200, startY + 105);
  text("= 60° + 70° = 130°", cx - 200, startY + 120);

  text("Exterior at B", cx, startY + 90);
  text("= ∠A + ∠C", cx, startY + 105);
  text("= 50° + 70° = 120°", cx, startY + 120);

  text("Exterior at C", cx + 200, startY + 90);
  text("= ∠A + ∠B", cx + 200, startY + 105);
  text("= 50° + 60° = 110°", cx + 200, startY + 120);

  // Key insight
  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Each vertex has an exterior angle equal to the sum of the other two interior angles!", cx, drawHeight - 130);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text("An exterior angle is ALWAYS larger than either remote interior angle", cx, drawHeight - 105);
}

function drawSmallTriangleWithExterior(cx, cy, highlightVertex, angleA, angleB, angleC) {
  let scale = 0.5;
  let ax = cx - 50 * scale;
  let ay = cy + 50 * scale;
  let bx = cx + 60 * scale;
  let by = cy + 50 * scale;
  let Cx = cx;
  let Cy = cy - 40 * scale;

  // Draw triangle
  stroke('#1565C0');
  strokeWeight(2);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Draw exterior angle at highlighted vertex
  let extLen = 40;
  if (highlightVertex === 'A') {
    stroke('#F44336');
    strokeWeight(2);
    setLineDash([4, 3]);
    line(ax, ay, ax - extLen, ay);
    setLineDash([]);
    drawSmallExteriorArc(ax, ay, bx, by, Cx, Cy, ax - extLen, ay, '#F44336');
  } else if (highlightVertex === 'B') {
    stroke('#F44336');
    strokeWeight(2);
    setLineDash([4, 3]);
    line(bx, by, bx + extLen, by);
    setLineDash([]);
    drawSmallExteriorArc(bx, by, Cx, Cy, ax, ay, bx + extLen, by, '#F44336');
  } else {
    stroke('#F44336');
    strokeWeight(2);
    setLineDash([4, 3]);
    line(Cx, Cy, Cx + extLen * 0.7, Cy - extLen * 0.7);
    setLineDash([]);
  }

  // Interior angles (small arcs)
  drawSmallAngleArc(ax, ay, bx, by, Cx, Cy, highlightVertex === 'A' ? '#9E9E9E' : '#4CAF50');
  drawSmallAngleArc(bx, by, Cx, Cy, ax, ay, highlightVertex === 'B' ? '#9E9E9E' : '#9C27B0');
  drawSmallAngleArc(Cx, Cy, ax, ay, bx, by, highlightVertex === 'C' ? '#9E9E9E' : '#FF9800');
}

function drawSmallAngleArc(vx, vy, p1x, p1y, p2x, p2y, col) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  stroke(col);
  strokeWeight(1.5);
  noFill();
  arc(vx, vy, 15, 15, a1, a2);
}

function drawSmallExteriorArc(vx, vy, p1x, p1y, p2x, p2y, extX, extY, col) {
  // Draw arc from p2 direction to extension
  let a1 = atan2(p2y - vy, p2x - vx);
  let a2 = atan2(extY - vy, extX - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  stroke(col);
  strokeWeight(2);
  noFill();
  arc(vx, vy, 20, 20, a1, a2);
}

function drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, col, alpha, label) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  let c = color(col);
  fill(red(c), green(c), blue(c), alpha * 0.4);
  stroke(col);
  strokeWeight(2);
  arc(vx, vy, 35, 35, a1, a2, PIE);

  // Label
  noStroke();
  fill(col);
  textSize(11);
  textAlign(CENTER, CENTER);
  let midAngle = (a1 + a2) / 2;
  text(label, vx + 28 * cos(midAngle), vy + 28 * sin(midAngle));
}

function drawExteriorAngle(Cx, Cy, ax, ay, bx, by, dx, dy, col) {
  // Exterior angle from AC direction to CD direction
  let a1 = atan2(ay - Cy, ax - Cx);
  let a2 = atan2(dy - Cy, dx - Cx);

  // Swap to get exterior angle
  [a1, a2] = [a2, a1];
  if (a2 - a1 < 0) a2 += TWO_PI;

  let c = color(col);
  fill(red(c), green(c), blue(c), 100);
  stroke(col);
  strokeWeight(2);
  arc(Cx, Cy, 45, 45, a1, a2, PIE);

  // Label
  noStroke();
  fill(col);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let midAngle = (a1 + a2) / 2;
  text("∠4", Cx + 35 * cos(midAngle), Cy + 35 * sin(midAngle));
  textStyle(NORMAL);
  textSize(10);
  text("110°", Cx + 55 * cos(midAngle), Cy + 55 * sin(midAngle));

  return 110;
}

function drawFormulaBox() {
  let y = drawHeight - 70;

  fill(33, 150, 243, 30);
  noStroke();
  rect(10, y, canvasWidth - 20, 60, 5);

  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Exterior Angle Theorem", canvasWidth / 2, y + 8);
  textStyle(NORMAL);
  textSize(11);
  text("Exterior angle = Sum of remote interior angles", canvasWidth / 2, y + 25);
  text("∠exterior = ∠remote₁ + ∠remote₂", canvasWidth / 2, y + 42);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function mousePressed() {
  selectedExample = 1 - selectedExample;
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
