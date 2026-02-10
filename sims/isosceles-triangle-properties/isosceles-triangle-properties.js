// Isosceles Triangle Properties
// Shows Base Angles Theorem and its converse

let canvasWidth = 800;
let drawHeight = 480;
let canvasHeight = drawHeight;

let currentExample = 0; // 0, 1, 2 for three examples

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Isosceles triangle properties showing Base Angles Theorem', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#424242');
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Base Angles Theorem for Isosceles Triangles", canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(10);
  text('Click to cycle through examples', canvasWidth / 2, 28);

  drawExamples();
  drawTheoremBox();
}

function drawExamples() {
  let panelWidth = (canvasWidth - 50) / 3;
  let panelY = 50;
  let panelHeight = 320;

  for (let i = 0; i < 3; i++) {
    let x = 15 + i * (panelWidth + 5);
    let isSelected = currentExample === i;
    let alpha = isSelected ? 255 : 100;

    // Panel background
    fill(255, 255, 255, alpha);
    stroke(isSelected ? '#4CAF50' : '#E0E0E0');
    strokeWeight(isSelected ? 3 : 1);
    rect(x, panelY, panelWidth, panelHeight, 8);

    let cx = x + panelWidth / 2;

    if (i === 0) {
      drawPartsExample(cx, panelY, panelWidth, panelHeight, alpha);
    } else if (i === 1) {
      drawTheoremExample(cx, panelY, panelWidth, panelHeight, alpha);
    } else {
      drawConverseExample(cx, panelY, panelWidth, panelHeight, alpha);
    }
  }
}

function drawPartsExample(cx, panelY, w, h, alpha) {
  // Panel title
  noStroke();
  fill(76, 175, 80, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Parts of Isosceles Triangle", cx, panelY + 10);
  textStyle(NORMAL);

  // Draw isosceles triangle
  let scale = 1.3;
  let ax = cx;
  let ay = panelY + 70;
  let bx = cx - 60 * scale;
  let by = panelY + 200;
  let Cx = cx + 60 * scale;
  let Cy = panelY + 200;

  // Draw triangle
  fill(76, 175, 80, alpha * 0.2);
  stroke(76, 175, 80, alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Mark equal sides (legs) with tick marks
  drawTicks(ax, ay, bx, by, 1, '#1565C0', alpha);
  drawTicks(ax, ay, Cx, Cy, 1, '#1565C0', alpha);

  // Mark base angles with arcs
  drawAngleArc(bx, by, Cx, Cy, ax, ay, '#F44336', alpha, "");
  drawAngleArc(Cx, Cy, ax, ay, bx, by, '#F44336', alpha, "");

  // Mark vertex angle
  drawAngleArc(ax, ay, bx, by, Cx, Cy, '#9C27B0', alpha, "");

  // Labels
  noStroke();
  fill(33, 33, 33, alpha);
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('A', ax, ay - 12);
  text('B', bx - 12, by + 8);
  text('C', Cx + 12, Cy + 8);
  textStyle(NORMAL);

  // Part labels with arrows
  fill(21, 101, 192, alpha);
  textSize(9);
  textAlign(CENTER, CENTER);
  text("Leg", (ax + bx) / 2 - 20, (ay + by) / 2 - 5);
  text("Leg", (ax + Cx) / 2 + 20, (ay + Cy) / 2 - 5);

  fill(255, 152, 0, alpha);
  text("Base", cx, by + 18);

  fill(156, 39, 176, alpha);
  textSize(9);
  text("Vertex", ax, ay + 30);
  text("angle", ax, ay + 42);

  fill(244, 67, 54, alpha);
  text("Base", bx + 25, by - 20);
  text("angles", bx + 25, by - 8);

  // Key fact
  fill(66, 66, 66, alpha);
  textSize(9);
  textAlign(CENTER, TOP);
  text("If legs are equal,", cx, panelY + h - 50);
  text("base angles are equal", cx, panelY + h - 38);
}

function drawTheoremExample(cx, panelY, w, h, alpha) {
  // Panel title
  noStroke();
  fill(33, 150, 243, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Base Angles Theorem", cx, panelY + 10);
  textStyle(NORMAL);

  // Draw isosceles triangle with measurements
  let scale = 1.2;
  let ax = cx;
  let ay = panelY + 70;
  let bx = cx - 55 * scale;
  let by = panelY + 190;
  let Cx = cx + 55 * scale;
  let Cy = panelY + 190;

  // Draw triangle
  fill(33, 150, 243, alpha * 0.2);
  stroke(33, 150, 243, alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Mark equal sides
  drawTicks(ax, ay, bx, by, 1, '#1565C0', alpha);
  drawTicks(ax, ay, Cx, Cy, 1, '#1565C0', alpha);

  // Mark angles
  drawAngleArc(ax, ay, bx, by, Cx, Cy, '#9C27B0', alpha, "40°");
  drawAngleArc(bx, by, Cx, Cy, ax, ay, '#F44336', alpha, "70°");
  drawAngleArc(Cx, Cy, ax, ay, bx, by, '#F44336', alpha, "70°");

  // Labels
  noStroke();
  fill(33, 33, 33, alpha);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('A', ax, ay - 12);
  text('B', bx - 10, by + 10);
  text('C', Cx + 10, Cy + 10);
  textStyle(NORMAL);

  // Side measurements
  fill(21, 101, 192, alpha);
  textSize(9);
  text("6 cm", (ax + bx) / 2 - 18, (ay + by) / 2);
  text("6 cm", (ax + Cx) / 2 + 18, (ay + Cy) / 2);

  // Calculation
  fill(66, 66, 66, alpha);
  textSize(8);
  textAlign(CENTER, TOP);
  text("Given: AB = AC = 6 cm", cx, panelY + h - 95);
  text("∠A = 40°", cx, panelY + h - 82);

  fill(33, 150, 243, alpha);
  text("By Base Angles Theorem:", cx, panelY + h - 65);
  text("∠B = ∠C", cx, panelY + h - 52);

  fill(66, 66, 66, alpha);
  text("40° + 2∠B = 180°", cx, panelY + h - 35);
  textStyle(BOLD);
  text("∠B = ∠C = 70°", cx, panelY + h - 20);
  textStyle(NORMAL);
}

function drawConverseExample(cx, panelY, w, h, alpha) {
  // Panel title
  noStroke();
  fill(255, 152, 0, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Converse: Equal Angles", cx, panelY + 10);
  textStyle(NORMAL);

  // Draw triangle
  let scale = 1.2;
  let ax = cx;
  let ay = panelY + 70;
  let bx = cx - 50 * scale;
  let by = panelY + 190;
  let Cx = cx + 50 * scale;
  let Cy = panelY + 190;

  // Draw triangle
  fill(255, 152, 0, alpha * 0.2);
  stroke(255, 152, 0, alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Mark equal angles first (given)
  drawAngleArc(bx, by, Cx, Cy, ax, ay, '#F44336', alpha, "55°");
  drawAngleArc(Cx, Cy, ax, ay, bx, by, '#F44336', alpha, "55°");

  // Then mark equal sides (conclusion)
  drawTicks(ax, ay, bx, by, 1, '#4CAF50', alpha);
  drawTicks(ax, ay, Cx, Cy, 1, '#4CAF50', alpha);

  // Vertex angle
  drawAngleArc(ax, ay, bx, by, Cx, Cy, '#9C27B0', alpha, "70°");

  // Labels
  noStroke();
  fill(33, 33, 33, alpha);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('A', ax, ay - 12);
  text('B', bx - 10, by + 10);
  text('C', Cx + 10, Cy + 10);
  textStyle(NORMAL);

  // Side labels
  fill(76, 175, 80, alpha);
  textSize(9);
  text("8 cm", (ax + bx) / 2 - 18, (ay + by) / 2);
  text("8 cm", (ax + Cx) / 2 + 18, (ay + Cy) / 2);

  // Explanation
  fill(66, 66, 66, alpha);
  textSize(8);
  textAlign(CENTER, TOP);
  text("Given: ∠B = ∠C = 55°", cx, panelY + h - 80);

  fill(255, 152, 0, alpha);
  text("By converse of", cx, panelY + h - 63);
  text("Base Angles Theorem:", cx, panelY + h - 50);

  fill(76, 175, 80, alpha);
  textStyle(BOLD);
  text("AB = AC", cx, panelY + h - 33);
  textStyle(NORMAL);

  fill(66, 66, 66, alpha);
  text("(Triangle is isosceles)", cx, panelY + h - 18);
}

function drawTicks(x1, y1, x2, y2, count, col, alpha) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI/2);

  let c = color(col);
  stroke(red(c), green(c), blue(c), alpha);
  strokeWeight(2);

  let len = 8;
  line(0, -len/2, 0, len/2);
  pop();
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
  fill(red(c), green(c), blue(c), alpha * 0.3);
  stroke(red(c), green(c), blue(c), alpha);
  strokeWeight(1.5);
  arc(vx, vy, 25, 25, a1, a2, PIE);

  if (label) {
    noStroke();
    fill(red(c), green(c), blue(c), alpha);
    textSize(8);
    textAlign(CENTER, CENTER);
    let midAngle = (a1 + a2) / 2;
    text(label, vx + 22 * cos(midAngle), vy + 22 * sin(midAngle));
  }
}

function drawTheoremBox() {
  let y = drawHeight - 90;

  // Theorem box
  fill(76, 175, 80, 30);
  noStroke();
  rect(10, y, (canvasWidth - 30) / 2, 80, 5);

  fill('#2E7D32');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Base Angles Theorem", (canvasWidth - 10) / 4, y + 8);
  textStyle(NORMAL);
  textSize(9);
  fill('#424242');
  text("If two sides of a triangle are congruent,", (canvasWidth - 10) / 4, y + 28);
  text("then the angles opposite those sides", (canvasWidth - 10) / 4, y + 42);
  text("are congruent.", (canvasWidth - 10) / 4, y + 56);

  // Converse box
  fill(255, 152, 0, 30);
  rect((canvasWidth + 10) / 2, y, (canvasWidth - 30) / 2, 80, 5);

  fill('#E65100');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Converse", 3 * (canvasWidth - 10) / 4 + 10, y + 8);
  textStyle(NORMAL);
  textSize(9);
  fill('#424242');
  text("If two angles of a triangle are congruent,", 3 * (canvasWidth - 10) / 4 + 10, y + 28);
  text("then the sides opposite those angles", 3 * (canvasWidth - 10) / 4 + 10, y + 42);
  text("are congruent.", 3 * (canvasWidth - 10) / 4 + 10, y + 56);
}

function mousePressed() {
  currentExample = (currentExample + 1) % 3;
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
