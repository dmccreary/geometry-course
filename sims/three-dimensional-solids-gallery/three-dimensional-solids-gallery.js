// Three-Dimensional Solids Gallery
// Static diagram showing 7 common 3D solids in a gallery format

let canvasWidth = 800;
let drawHeight = 580;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// Isometric helper constants
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const COS30 = Math.cos(ISO_ANGLE);
const SIN30 = Math.sin(ISO_ANGLE);

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Gallery showing seven common three-dimensional solids: rectangular prism, triangular prism, square pyramid, cube, cylinder, cone, and sphere', LABEL);
  noLoop();
}

function draw() {
  // Drawing region background
  fill(240, 248, 255);
  stroke(192, 192, 192);
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill(30, 60, 120);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Common Three-Dimensional Solids', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Row 1: Polyhedra (4 items)
  let margin = 10;
  let gapRow1 = 10;
  let panelW1 = (canvasWidth - 2 * margin - 3 * gapRow1) / 4;
  let panelH = 240;
  let row1Y = 45;

  drawRectPrismPanel(margin, row1Y, panelW1, panelH);
  drawTriPrismPanel(margin + panelW1 + gapRow1, row1Y, panelW1, panelH);
  drawPyramidPanel(margin + 2 * (panelW1 + gapRow1), row1Y, panelW1, panelH);
  drawCubePanel(margin + 3 * (panelW1 + gapRow1), row1Y, panelW1, panelH);

  // Row 2: Curved solids (3 items)
  let gapRow2 = 10;
  let panelW2 = (canvasWidth - 2 * margin - 2 * gapRow2) / 3;
  let row2Y = 310;

  drawCylinderPanel(margin, row2Y, panelW2, panelH);
  drawConePanel(margin + panelW2 + gapRow2, row2Y, panelW2, panelH);
  drawSpherePanel(margin + 2 * (panelW2 + gapRow2), row2Y, panelW2, panelH);
}

// ==================== Panel Drawing Helpers ====================

function drawPanelBg(x, y, w, h, bgColor) {
  fill(bgColor);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 10);
}

function drawPanelLabel(x, y, w, h, label, sublabel) {
  noStroke();
  fill(50);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text(label, x + w / 2, y + h - 22);
  textStyle(NORMAL);

  fill(100);
  textSize(13);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text(sublabel, x + w / 2, y + h - 6);
  textStyle(NORMAL);
}

// ==================== Row 1: Polyhedra ====================

function drawRectPrismPanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#E3F2FD');

  let cx = x + w / 2 - 5;
  let cy = y + h / 2 - 10;
  let bw = 65; // base width
  let bh = 75; // height
  let bd = 35; // depth offset

  // Isometric rectangular prism
  // Front face
  fill(100, 160, 220, 200);
  stroke(80);
  strokeWeight(1.5);
  beginShape();
  vertex(cx - bw / 2, cy);
  vertex(cx + bw / 2, cy);
  vertex(cx + bw / 2, cy + bh);
  vertex(cx - bw / 2, cy + bh);
  endShape(CLOSE);

  // Top face
  fill(140, 190, 240, 200);
  beginShape();
  vertex(cx - bw / 2, cy);
  vertex(cx - bw / 2 + bd * COS30, cy - bd * SIN30);
  vertex(cx + bw / 2 + bd * COS30, cy - bd * SIN30);
  vertex(cx + bw / 2, cy);
  endShape(CLOSE);

  // Right side face
  fill(70, 130, 190, 200);
  beginShape();
  vertex(cx + bw / 2, cy);
  vertex(cx + bw / 2 + bd * COS30, cy - bd * SIN30);
  vertex(cx + bw / 2 + bd * COS30, cy + bh - bd * SIN30);
  vertex(cx + bw / 2, cy + bh);
  endShape(CLOSE);

  // Dimension labels
  noStroke();
  fill(30, 80, 150);
  textSize(14);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('w', cx, cy + bh + 4);
  textAlign(RIGHT, CENTER);
  text('h', cx - bw / 2 - 6, cy + bh / 2);
  textAlign(CENTER, BOTTOM);
  text('l', cx + bw / 2 + bd * COS30 / 2 + 8, cy - bd * SIN30 / 2 - 2);
  textStyle(NORMAL);

  drawPanelLabel(x, y, w, h, 'Rectangular Prism', 'Polyhedron');
}

function drawTriPrismPanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#E8F5E9');

  let cx = x + w / 2 - 10;
  let cy = y + h / 2 + 5;
  let triH = 60;  // triangle height
  let triW = 40;  // triangle base half-width
  let depth = 50; // prism depth

  let dx = depth * COS30;
  let dy = depth * SIN30;

  // Back triangle face
  fill(120, 190, 120, 150);
  stroke(80);
  strokeWeight(1.5);
  beginShape();
  vertex(cx - triW + dx, cy - triH - dy);
  vertex(cx + triW + dx, cy - dy);
  vertex(cx - triW + dx, cy - dy);
  endShape(CLOSE);

  // Bottom face
  fill(80, 160, 80, 180);
  beginShape();
  vertex(cx - triW, cy);
  vertex(cx - triW + dx, cy - dy);
  vertex(cx + triW + dx, cy - dy);
  vertex(cx + triW, cy);
  endShape(CLOSE);

  // Left side face
  fill(100, 180, 100, 180);
  beginShape();
  vertex(cx - triW, cy - triH);
  vertex(cx - triW + dx, cy - triH - dy);
  vertex(cx - triW + dx, cy - dy);
  vertex(cx - triW, cy);
  endShape(CLOSE);

  // Front triangle face
  fill(140, 210, 140, 220);
  beginShape();
  vertex(cx - triW, cy - triH);
  vertex(cx + triW, cy);
  vertex(cx - triW, cy);
  endShape(CLOSE);

  // Top edge (ridge)
  stroke(60);
  strokeWeight(1.5);
  line(cx - triW, cy - triH, cx - triW + dx, cy - triH - dy);

  // Right slant face
  fill(90, 170, 90, 180);
  stroke(80);
  beginShape();
  vertex(cx - triW, cy - triH);
  vertex(cx - triW + dx, cy - triH - dy);
  vertex(cx + triW + dx, cy - dy);
  vertex(cx + triW, cy);
  endShape(CLOSE);

  drawPanelLabel(x, y, w, h, 'Triangular Prism', 'Polyhedron');
}

function drawPyramidPanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#FFF9C4');

  let cx = x + w / 2 - 5;
  let baseY = y + h / 2 + 30;
  let apexY = y + h / 2 - 60;
  let baseHalf = 50;
  let dx = 30 * COS30;
  let dy = 30 * SIN30;

  // Base vertices (isometric square)
  let bl = { x: cx - baseHalf, y: baseY };
  let br = { x: cx + baseHalf, y: baseY };
  let fr = { x: cx + baseHalf + dx, y: baseY - dy };
  let fl = { x: cx - baseHalf + dx, y: baseY - dy };
  let apex = { x: cx + dx / 2, y: apexY };

  // Back-left face
  fill(220, 200, 80, 160);
  stroke(80);
  strokeWeight(1.5);
  beginShape();
  vertex(bl.x, bl.y);
  vertex(fl.x, fl.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Back-right face
  fill(200, 180, 60, 160);
  beginShape();
  vertex(fl.x, fl.y);
  vertex(fr.x, fr.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Front-right face
  fill(240, 220, 100, 200);
  beginShape();
  vertex(br.x, br.y);
  vertex(fr.x, fr.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Front-left face
  fill(230, 210, 90, 220);
  beginShape();
  vertex(bl.x, bl.y);
  vertex(br.x, br.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Base (visible edges)
  stroke(80);
  strokeWeight(1.5);
  noFill();
  beginShape();
  vertex(bl.x, bl.y);
  vertex(br.x, br.y);
  vertex(fr.x, fr.y);
  vertex(fl.x, fl.y);
  endShape(CLOSE);

  drawPanelLabel(x, y, w, h, 'Square Pyramid', 'Polyhedron');
}

function drawCubePanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#F3E5F5');

  let cx = x + w / 2 - 10;
  let cy = y + h / 2 - 5;
  let s = 70; // side length
  let dx = 35 * COS30;
  let dy = 35 * SIN30;

  // Front face
  fill(180, 140, 210, 200);
  stroke(80);
  strokeWeight(1.5);
  beginShape();
  vertex(cx - s / 2, cy);
  vertex(cx + s / 2, cy);
  vertex(cx + s / 2, cy + s);
  vertex(cx - s / 2, cy + s);
  endShape(CLOSE);

  // Top face
  fill(200, 170, 230, 200);
  beginShape();
  vertex(cx - s / 2, cy);
  vertex(cx - s / 2 + dx, cy - dy);
  vertex(cx + s / 2 + dx, cy - dy);
  vertex(cx + s / 2, cy);
  endShape(CLOSE);

  // Right face
  fill(150, 110, 180, 200);
  beginShape();
  vertex(cx + s / 2, cy);
  vertex(cx + s / 2 + dx, cy - dy);
  vertex(cx + s / 2 + dx, cy + s - dy);
  vertex(cx + s / 2, cy + s);
  endShape(CLOSE);

  // Tick marks to show equal edges
  stroke(80);
  strokeWeight(1.5);
  let tickLen = 5;

  // Front bottom edge tick
  let fbMx = cx, fbMy = cy + s;
  line(fbMx - tickLen, fbMy - tickLen, fbMx + tickLen, fbMy + tickLen);

  // Front left edge tick
  let flMx = cx - s / 2, flMy = cy + s / 2;
  line(flMx - tickLen, flMy, flMx + tickLen, flMy);

  // Top right edge tick
  let trMx = cx + dx, trMy = cy - dy;
  line(trMx - tickLen, trMy - tickLen, trMx + tickLen, trMy + tickLen);

  drawPanelLabel(x, y, w, h, 'Cube', 'Polyhedron');
}

// ==================== Row 2: Curved Solids ====================

function drawCylinderPanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#E0F7FA');

  let cx = x + w / 2 - 5;
  let cylH = 90;
  let cylR = 55;
  let topY = y + h / 2 - 50;
  let botY = topY + cylH;

  // Cylinder body
  fill(100, 200, 220, 180);
  stroke(80);
  strokeWeight(1.5);
  rect(cx - cylR, topY, cylR * 2, cylH);

  // Bottom ellipse (full)
  fill(70, 170, 190, 200);
  stroke(80);
  strokeWeight(1.5);
  ellipse(cx, botY, cylR * 2, 30);

  // Body sides (cover rect edges over ellipse)
  noStroke();
  fill(100, 200, 220, 180);
  rect(cx - cylR + 1, topY + 1, cylR * 2 - 2, cylH - 1);

  // Left and right edges
  stroke(80);
  strokeWeight(1.5);
  line(cx - cylR, topY, cx - cylR, botY);
  line(cx + cylR, topY, cx + cylR, botY);

  // Top ellipse
  fill(140, 220, 240, 220);
  stroke(80);
  strokeWeight(1.5);
  ellipse(cx, topY, cylR * 2, 30);

  // Radius line on top
  stroke(200, 50, 50);
  strokeWeight(2);
  line(cx, topY, cx + cylR, topY);

  // Radius label
  noStroke();
  fill(200, 50, 50);
  textSize(14);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text('r', cx + cylR / 2, topY - 4);

  // Height label
  stroke(200, 50, 50);
  strokeWeight(2);
  line(cx + cylR + 15, topY, cx + cylR + 15, botY);
  // Arrow heads
  line(cx + cylR + 15, topY, cx + cylR + 11, topY + 6);
  line(cx + cylR + 15, topY, cx + cylR + 19, topY + 6);
  line(cx + cylR + 15, botY, cx + cylR + 11, botY - 6);
  line(cx + cylR + 15, botY, cx + cylR + 19, botY - 6);

  noStroke();
  fill(200, 50, 50);
  textSize(14);
  textAlign(LEFT, CENTER);
  text('h', cx + cylR + 22, topY + cylH / 2);
  textStyle(NORMAL);

  drawPanelLabel(x, y, w, h, 'Cylinder', 'Not a polyhedron');
}

function drawConePanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#FFF3E0');

  let cx = x + w / 2;
  let coneH = 100;
  let coneR = 55;
  let baseY = y + h / 2 + 30;
  let apexY = baseY - coneH;

  // Cone body (triangle)
  fill(240, 180, 100, 200);
  stroke(80);
  strokeWeight(1.5);
  beginShape();
  vertex(cx, apexY);
  vertex(cx - coneR, baseY);
  vertex(cx + coneR, baseY);
  endShape(CLOSE);

  // Base ellipse
  fill(220, 160, 80, 220);
  stroke(80);
  strokeWeight(1.5);
  ellipse(cx, baseY, coneR * 2, 25);

  // Radius line
  stroke(200, 50, 50);
  strokeWeight(2);
  line(cx, baseY, cx + coneR, baseY);

  // Radius label
  noStroke();
  fill(200, 50, 50);
  textSize(14);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('r', cx + coneR / 2, baseY + 4);

  // Height line (dashed)
  stroke(200, 50, 50);
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  line(cx, apexY, cx, baseY);
  drawingContext.setLineDash([]);

  // Height label
  noStroke();
  fill(200, 50, 50);
  textSize(14);
  textAlign(RIGHT, CENTER);
  text('h', cx - 6, apexY + coneH / 2);
  textStyle(NORMAL);

  drawPanelLabel(x, y, w, h, 'Cone', 'Not a polyhedron');
}

function drawSpherePanel(x, y, w, h) {
  drawPanelBg(x, y, w, h, '#FCE4EC');

  let cx = x + w / 2;
  let cy = y + h / 2 - 10;
  let r = 65;

  // Sphere with gradient shading
  noStroke();
  for (let i = r; i > 0; i--) {
    let t = map(i, 0, r, 0, 1);
    let c = lerpColor(color(255, 180, 200), color(200, 80, 120), t * t);
    fill(c);
    ellipse(cx - r * 0.15 + i * 0.15, cy - r * 0.15 + i * 0.15, i * 2, i * 2);
  }

  // Highlight
  fill(255, 220, 230, 150);
  noStroke();
  ellipse(cx - r * 0.3, cy - r * 0.3, r * 0.4, r * 0.35);

  // Sphere outline
  noFill();
  stroke(150, 60, 80);
  strokeWeight(2);
  ellipse(cx, cy, r * 2, r * 2);

  // Great circle (equator) - dashed
  stroke(150, 60, 80, 180);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  ellipse(cx, cy, r * 2, r * 0.6);
  drawingContext.setLineDash([]);

  // Back half of equator (lighter)
  // Already shown via the dashed ellipse

  // Radius line
  stroke(200, 50, 50);
  strokeWeight(2);
  line(cx, cy, cx + r, cy);

  // Radius label
  noStroke();
  fill(200, 50, 50);
  textSize(14);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text('r', cx + r / 2, cy - 4);
  textStyle(NORMAL);

  // Center dot
  fill(150, 60, 80);
  noStroke();
  circle(cx, cy, 6);

  drawPanelLabel(x, y, w, h, 'Sphere', 'Not a polyhedron');
}

// ==================== Responsive ====================

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
