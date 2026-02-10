// SSS Congruence Visualization
// Shows how three congruent sides determine triangle congruence

let canvasWidth = 800;
let drawHeight = 400;
let canvasHeight = drawHeight;

let currentPanel = 0; // 0 = all, 1-3 = individual panels
let animationProgress = 0;
let animating = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('SSS Congruence: Three sides determine triangle congruence', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("SSS Congruence: Three Sides Determine a Triangle", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click each panel to focus, or click outside panels to see all', canvasWidth / 2, 32);

  drawPanels();
}

function drawPanels() {
  let panelWidth = (canvasWidth - 50) / 3;
  let startX = 15;
  let panelY = 55;
  let panelHeight = 330;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (panelWidth + 5);
    let isSelected = currentPanel === 0 || currentPanel === i + 1;
    let alpha = isSelected ? 255 : 60;

    // Panel background
    fill(255, 255, 255, alpha);
    stroke(isSelected ? '#1565C0' : '#E0E0E0');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, panelY, panelWidth, panelHeight, 8);

    // Panel content
    if (i === 0) drawPanel1(x, panelY, panelWidth, panelHeight, alpha);
    else if (i === 1) drawPanel2(x, panelY, panelWidth, panelHeight, alpha);
    else drawPanel3(x, panelY, panelWidth, panelHeight, alpha);
  }
}

function drawPanel1(x, y, w, h, alpha) {
  // Panel 1: Given Information
  let cx = x + w / 2;
  let cy = y + 140;

  // Panel title
  noStroke();
  fill(21, 101, 192, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Given Information", cx, y + 10);
  textStyle(NORMAL);

  // Draw two triangles
  let scale = 18;
  let offsetY = 0;

  // Triangle ABC (blue)
  drawLabeledTriangle(cx - 15, cy - 30, [5, 6, 7], '#1565C0', alpha, ['A', 'B', 'C'], true);

  // Triangle DEF (green outline)
  drawLabeledTriangle(cx + 15, cy + 80, [5, 6, 7], '#43A047', alpha * 0.7, ['D', 'E', 'F'], false);

  // Labels
  fill(66, 66, 66, alpha);
  textSize(10);
  textAlign(CENTER, TOP);
  text("△ABC", cx - 30, cy + 30);
  text("△DEF", cx + 40, cy + 140);

  // Congruence statements
  fill(117, 117, 117, alpha);
  textSize(9);
  textAlign(CENTER, TOP);
  text("Given: Three pairs of", cx, y + h - 70);
  text("congruent sides", cx, y + h - 57);
  text("AB ≅ DE = 5 cm", cx, y + h - 40);
  text("BC ≅ EF = 7 cm", cx, y + h - 27);
  text("AC ≅ DF = 6 cm", cx, y + h - 14);
}

function drawPanel2(x, y, w, h, alpha) {
  // Panel 2: Construction Process
  let cx = x + w / 2;
  let cy = y + 150;

  // Panel title
  noStroke();
  fill(21, 101, 192, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Attempting to Build", cx, y + 10);
  textStyle(NORMAL);

  // Draw base segment DE
  let baseLen = 80;
  let dx = cx - baseLen / 2;
  let dy = cy + 30;
  let ex = cx + baseLen / 2;
  let ey = cy + 30;

  stroke(67, 160, 71, alpha);
  strokeWeight(3);
  line(dx, dy, ex, ey);

  // Points D and E
  fill(67, 160, 71, alpha);
  noStroke();
  ellipse(dx, dy, 8, 8);
  ellipse(ex, ey, 8, 8);

  // Labels
  fill(66, 66, 66, alpha);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('D', dx - 10, dy + 12);
  text('E', ex + 10, ey + 12);
  text('5 cm', cx, dy + 20);

  // Draw construction arcs
  stroke(158, 158, 158, alpha);
  strokeWeight(1.5);
  noFill();

  // Arc from D with radius 6 cm
  let arcRadius1 = 96; // 6 cm scaled
  arc(dx, dy, arcRadius1 * 2, arcRadius1 * 2, -PI, -PI/6);

  // Arc from E with radius 7 cm
  let arcRadius2 = 112; // 7 cm scaled
  arc(ex, ey, arcRadius2 * 2, arcRadius2 * 2, -PI + PI/6, 0);

  // Intersection point F
  let fx = cx;
  let fy = cy - 70;

  fill(255, 152, 0, alpha);
  noStroke();
  ellipse(fx, fy, 10, 10);

  fill(66, 66, 66, alpha);
  textSize(10);
  text('F', fx, fy - 15);

  // Labels for arcs
  fill(117, 117, 117, alpha);
  textSize(9);
  text('6 cm', dx - 30, cy - 30);
  text('7 cm', ex + 30, cy - 30);

  // Annotation
  fill(255, 152, 0, alpha);
  textSize(10);
  textAlign(CENTER, TOP);
  text("Arcs intersect at", cx, y + h - 60);
  text("only ONE point!", cx, y + h - 47);

  fill(117, 117, 117, alpha);
  textSize(9);
  text("The third vertex must be here", cx, y + h - 25);
}

function drawPanel3(x, y, w, h, alpha) {
  // Panel 3: Result - Overlapping triangles
  let cx = x + w / 2;
  let cy = y + 140;

  // Panel title
  noStroke();
  fill(21, 101, 192, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Result", cx, y + 10);
  textStyle(NORMAL);

  // Draw overlapping triangles
  let scale = 18;

  // Calculate triangle vertices
  let a = 5, b = 6, c = 7;
  let ax = cx - c * scale / 2;
  let ay = cy + 50;
  let bx = cx + c * scale / 2;
  let by = cy + 50;

  let angleA = acos((b*b + c*c - a*a) / (2*b*c));
  let Cx = ax + b * scale * cos(-angleA);
  let Cy = ay + b * scale * sin(-angleA);

  // Triangle DEF (green, slightly offset for overlap effect)
  let offset = 3;
  fill(67, 160, 71, alpha * 0.3);
  stroke(67, 160, 71, alpha);
  strokeWeight(2);
  triangle(ax + offset, ay + offset, bx + offset, by + offset, Cx + offset, Cy + offset);

  // Triangle ABC (blue)
  fill(21, 101, 192, alpha * 0.3);
  stroke(21, 101, 192, alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Labels
  noStroke();
  fill(21, 101, 192, alpha);
  textSize(10);
  textStyle(BOLD);
  text('A', ax - 15, ay + 5);
  text('B', bx + 15, by + 5);
  text('C', Cx, Cy - 15);

  fill(67, 160, 71, alpha);
  text('D', ax - 5, ay + 18);
  text('E', bx + 5, by + 18);
  text('F', Cx + 12, Cy - 5);
  textStyle(NORMAL);

  // Congruence statement
  fill(21, 101, 192, alpha);
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("△ABC ≅ △DEF", cx, y + h - 75);
  textStyle(NORMAL);

  // Explanation
  fill(117, 117, 117, alpha);
  textSize(10);
  text("SSS guarantees congruence", cx, y + h - 50);

  // Arrow indicating transformation
  stroke(158, 158, 158, alpha);
  strokeWeight(1);
  noFill();
  arc(cx, y + h - 30, 60, 20, PI, TWO_PI);
  fill(158, 158, 158, alpha);
  triangle(cx + 30, y + h - 30, cx + 25, y + h - 25, cx + 25, y + h - 35);

  noStroke();
  fill(117, 117, 117, alpha);
  textSize(9);
  text("Rigid motion maps one to other", cx, y + h - 15);
}

function drawLabeledTriangle(cx, cy, sides, col, alpha, labels, filled) {
  let a = sides[0], b = sides[1], c = sides[2];
  let scale = 16;

  // Calculate vertices
  let ax = cx - c * scale / 2;
  let ay = cy + 30;
  let bx = cx + c * scale / 2;
  let by = cy + 30;

  let angleA = acos((b*b + c*c - a*a) / (2*b*c));
  let Cx = ax + b * scale * cos(-angleA);
  let Cy = ay + b * scale * sin(-angleA);

  // Draw triangle
  let c1 = color(col);
  if (filled) {
    fill(red(c1), green(c1), blue(c1), alpha * 0.3);
  } else {
    noFill();
  }
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Draw tick marks
  drawTicks(ax, ay, bx, by, 1, col, alpha); // c = 5
  drawTicks(bx, by, Cx, Cy, 2, col, alpha); // a = 7
  drawTicks(Cx, Cy, ax, ay, 3, col, alpha); // b = 6

  // Labels
  noStroke();
  fill(red(c1), green(c1), blue(c1), alpha);
  textSize(9);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(labels[0], ax - 8, ay + 10);
  text(labels[1], bx + 8, by + 10);
  text(labels[2], Cx, Cy - 10);
  textStyle(NORMAL);

  // Side labels
  fill(66, 66, 66, alpha);
  textSize(8);
  text(c + " cm", (ax + bx) / 2, (ay + by) / 2 + 12);
  text(b + " cm", (ax + Cx) / 2 - 15, (ay + Cy) / 2);
  text(a + " cm", (bx + Cx) / 2 + 15, (by + Cy) / 2);
}

function drawTicks(x1, y1, x2, y2, count, col, alpha) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI/2);

  let c1 = color(col);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);

  let spacing = 4;
  let len = 6;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count-1)/2) * spacing;
    line(offset, -len/2, offset, len/2);
  }
  pop();
}

function mousePressed() {
  let panelWidth = (canvasWidth - 50) / 3;
  let startX = 15;
  let panelY = 55;
  let panelHeight = 330;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (panelWidth + 5);
    if (mouseX >= x && mouseX <= x + panelWidth &&
        mouseY >= panelY && mouseY <= panelY + panelHeight) {
      currentPanel = currentPanel === i + 1 ? 0 : i + 1;
      return;
    }
  }

  // Click outside panels shows all
  if (mouseY >= panelY && mouseY <= panelY + panelHeight) {
    currentPanel = 0;
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
    canvasWidth = max(canvasWidth, 500);
  }
}
