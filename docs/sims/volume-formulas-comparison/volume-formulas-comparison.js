// Volume Formulas Comparison MicroSim
// Static 2x2 grid comparing prism/cylinder with pyramid/cone volumes

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 620;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('A 2x2 grid comparing volume formulas: rectangular prism and cylinder on top, rectangular pyramid and cone on bottom, showing the one-third relationship', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region background
  fill(240, 248, 255);
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, canvasHeight);

  let panelWidth = (canvasWidth - 30) / 2;

  // Title
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Volume Formulas: Prisms/Cylinders vs Pyramids/Cones', canvasWidth / 2, 8);

  // Top row label
  textStyle(BOLD);
  textSize(16);
  fill(50, 50, 150);
  text('Full Solids', canvasWidth / 2, 30);

  // Top row panels
  let topY = 46;
  let panelHeight = 225;
  drawPrismPanel(margin, topY, panelWidth, panelHeight);
  drawCylinderPanel(margin + panelWidth + 10, topY, panelWidth, panelHeight);

  // Middle divider
  let dividerY = topY + panelHeight + 2;
  stroke(100);
  strokeWeight(2);
  line(margin, dividerY + 8, canvasWidth - margin, dividerY + 8);

  noStroke();
  fill(180, 0, 0);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, TOP);
  text('Pyramids and Cones have \u2153 the volume  \u2193', canvasWidth / 2, dividerY + 13);

  // Bottom row label
  let bottomLabelY = dividerY + 33;
  fill(50, 50, 150);
  textSize(16);
  text('Tapered Solids (\u00D7\u2153)', canvasWidth / 2, bottomLabelY);

  // Bottom row panels
  let bottomY = bottomLabelY + 20;
  drawPyramidPanel(margin, bottomY, panelWidth, panelHeight);
  drawConePanel(margin + panelWidth + 10, bottomY, panelWidth, panelHeight);

  // Bottom insight box
  let insightY = bottomY + panelHeight + 4;
  let insightH = 42;
  fill('#F3E5F5');
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(margin, insightY, canvasWidth - 2 * margin, insightH, 6);

  noStroke();
  fill('#4A148C');
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Key Insight: A pyramid or cone with the same base and height as a prism or cylinder has exactly one-third the volume.', margin + 10, insightY, canvasWidth - 2 * margin - 20, insightH);
}

// ========== TOP LEFT: Rectangular Prism ==========
function drawPrismPanel(x, y, w, h) {
  push();

  // Background
  fill('#E3F2FD');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('Rectangular Prism', x + w / 2, y + 6);

  // Draw isometric prism
  let cx = x + w / 2 - 10;
  let cy = y + 82;
  drawIsometricPrism(cx, cy, 75, 45, 65, false);

  // Dimension labels
  noStroke();
  fill(0, 0, 160);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  // l label (bottom front edge)
  text('l = 6', cx + 38, cy + 70);
  // w label (bottom right edge)
  text('w = 4', cx + 65, cy + 38);
  // h label (left vertical edge)
  text('h = 5', cx - 52, cy + 12);

  // Formula
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('V = lwh', x + w / 2, y + h - 55);

  // Example
  textStyle(NORMAL);
  textSize(16);
  fill(60);
  text('V = (6)(4)(5) = 120 cubic units', x + w / 2, y + h - 33);

  pop();
}

// ========== TOP RIGHT: Cylinder ==========
function drawCylinderPanel(x, y, w, h) {
  push();

  // Background
  fill('#E8F5E9');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('Cylinder', x + w / 2, y + 6);

  // Draw cylinder
  let cx = x + w / 2;
  let cy = y + 50;
  let rx = 50;
  let ry = 16;
  let ch = 100;

  drawCylinderShape(cx, cy, rx, ry, ch, false);

  // Dimension labels
  noStroke();
  fill(0, 0, 160);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  // r label
  text('r = 3', cx + 5, cy + 12);
  // h label
  text('h = 8', cx - rx - 20, cy + ch / 2);

  // Formula
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('V = \u03C0r\u00B2h', x + w / 2, y + h - 55);

  // Example
  textStyle(NORMAL);
  textSize(16);
  fill(60);
  text('V = \u03C0(3)\u00B2(8) = 72\u03C0 \u2248 226.2 cubic units', x + w / 2, y + h - 33);

  pop();
}

// ========== BOTTOM LEFT: Rectangular Pyramid ==========
function drawPyramidPanel(x, y, w, h) {
  push();

  // Background
  fill('#FFF3E0');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('Rectangular Pyramid', x + w / 2, y + 6);

  // Draw ghost prism then pyramid
  let cx = x + w / 2 - 10;
  let cy = y + 82;
  drawIsometricPrism(cx, cy, 75, 45, 65, true); // ghost outline
  drawIsometricPyramid(cx, cy, 75, 45, 65);

  // Dimension labels
  noStroke();
  fill(0, 0, 160);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('l = 6', cx + 38, cy + 70);
  text('w = 4', cx + 65, cy + 38);
  text('h = 5', cx - 52, cy + 12);

  // Formula
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('V = \u2153lwh', x + w / 2, y + h - 66);

  // Example
  textStyle(NORMAL);
  textSize(16);
  fill(60);
  text('V = \u2153(6)(4)(5) = 40 cubic units', x + w / 2, y + h - 44);

  // Red note
  fill(200, 0, 0);
  textStyle(BOLD);
  textSize(16);
  text('= \u2153 of prism above', x + w / 2, y + h - 22);

  pop();
}

// ========== BOTTOM RIGHT: Cone ==========
function drawConePanel(x, y, w, h) {
  push();

  // Background
  fill('#FFF9C4');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('Cone', x + w / 2, y + 6);

  // Draw ghost cylinder then cone
  let cx = x + w / 2;
  let cy = y + 50;
  let rxi = 50;
  let ryi = 16;
  let ch = 100;

  drawCylinderShape(cx, cy, rxi, ryi, ch, true); // ghost outline
  drawConeShape(cx, cy, rxi, ryi, ch);

  // Dimension labels
  noStroke();
  fill(0, 0, 160);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('r = 3', cx + 5, cy + ch - 6);
  text('h = 8', cx - rxi - 20, cy + ch / 2);

  // Formula
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(17);
  textAlign(CENTER, TOP);
  text('V = \u2153\u03C0r\u00B2h', x + w / 2, y + h - 66);

  // Example
  textStyle(NORMAL);
  textSize(16);
  fill(60);
  text('V = \u2153\u03C0(3)\u00B2(8) = 24\u03C0 \u2248 75.4 cubic units', x + w / 2, y + h - 44);

  // Red note
  fill(200, 0, 0);
  textStyle(BOLD);
  textSize(16);
  text('= \u2153 of cylinder above', x + w / 2, y + h - 22);

  pop();
}

// ========== 3D SHAPE DRAWING HELPERS ==========

function drawIsometricPrism(cx, cy, bw, bd, bh, ghost) {
  // cx, cy = center of front face top-left area
  // bw = base width, bd = base depth (isometric), bh = height
  // Isometric offsets
  let dx = bd * 0.5;
  let dy = bd * 0.3;

  // 8 vertices of the prism
  // Front face: bottom-left, bottom-right, top-right, top-left
  let fbl = { x: cx - bw / 2, y: cy + bh / 2 };
  let fbr = { x: cx + bw / 2, y: cy + bh / 2 };
  let ftr = { x: cx + bw / 2, y: cy - bh / 2 };
  let ftl = { x: cx - bw / 2, y: cy - bh / 2 };

  // Back face (offset by isometric depth)
  let bbl = { x: fbl.x + dx, y: fbl.y - dy };
  let bbr = { x: fbr.x + dx, y: fbr.y - dy };
  let btr = { x: ftr.x + dx, y: ftr.y - dy };
  let btl = { x: ftl.x + dx, y: ftl.y - dy };

  if (ghost) {
    // Dashed outline of prism
    push();
    noFill();
    stroke(150, 150, 200, 120);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);

    // Front face
    beginShape();
    vertex(ftl.x, ftl.y);
    vertex(ftr.x, ftr.y);
    vertex(fbr.x, fbr.y);
    vertex(fbl.x, fbl.y);
    endShape(CLOSE);

    // Top face
    beginShape();
    vertex(ftl.x, ftl.y);
    vertex(ftr.x, ftr.y);
    vertex(btr.x, btr.y);
    vertex(btl.x, btl.y);
    endShape(CLOSE);

    // Right face
    beginShape();
    vertex(ftr.x, ftr.y);
    vertex(fbr.x, fbr.y);
    vertex(bbr.x, bbr.y);
    vertex(btr.x, btr.y);
    endShape(CLOSE);

    drawingContext.setLineDash([]);
    pop();
  } else {
    // Solid prism with 3 visible faces in different blue shades
    strokeWeight(1.5);

    // Front face - medium blue
    stroke('#1565C0');
    fill(100, 181, 246, 180);
    beginShape();
    vertex(ftl.x, ftl.y);
    vertex(ftr.x, ftr.y);
    vertex(fbr.x, fbr.y);
    vertex(fbl.x, fbl.y);
    endShape(CLOSE);

    // Top face - light blue
    fill(144, 202, 249, 200);
    beginShape();
    vertex(ftl.x, ftl.y);
    vertex(ftr.x, ftr.y);
    vertex(btr.x, btr.y);
    vertex(btl.x, btl.y);
    endShape(CLOSE);

    // Right face - darker blue
    fill(66, 165, 245, 160);
    beginShape();
    vertex(ftr.x, ftr.y);
    vertex(fbr.x, fbr.y);
    vertex(bbr.x, bbr.y);
    vertex(btr.x, btr.y);
    endShape(CLOSE);
  }
}

function drawIsometricPyramid(cx, cy, bw, bd, bh) {
  let dx = bd * 0.5;
  let dy = bd * 0.3;

  // Base corners (same as prism bottom)
  let fbl = { x: cx - bw / 2, y: cy + bh / 2 };
  let fbr = { x: cx + bw / 2, y: cy + bh / 2 };
  let bbr = { x: fbr.x + dx, y: fbr.y - dy };
  let bbl = { x: fbl.x + dx, y: fbl.y - dy };

  // Apex - center of base, raised by height
  let baseCenterX = (fbl.x + bbr.x) / 2;
  let baseCenterY = (fbl.y + bbr.y) / 2 - bh;
  let apex = { x: baseCenterX, y: baseCenterY };

  strokeWeight(1.5);

  // Front-left face
  stroke('#E65100');
  fill(255, 183, 77, 160);
  beginShape();
  vertex(fbl.x, fbl.y);
  vertex(fbr.x, fbr.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Front-right face
  fill(255, 167, 38, 140);
  beginShape();
  vertex(fbr.x, fbr.y);
  vertex(bbr.x, bbr.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Base (partially visible)
  fill(255, 204, 128, 80);
  stroke('#E65100');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  beginShape();
  vertex(fbl.x, fbl.y);
  vertex(fbr.x, fbr.y);
  vertex(bbr.x, bbr.y);
  vertex(bbl.x, bbl.y);
  endShape(CLOSE);
  drawingContext.setLineDash([]);
}

function drawCylinderShape(cx, cy, rx, ry, h, ghost) {
  if (ghost) {
    push();
    noFill();
    stroke(150, 200, 150, 120);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);

    // Top ellipse
    ellipse(cx, cy, rx * 2, ry * 2);

    // Bottom ellipse
    ellipse(cx, cy + h, rx * 2, ry * 2);

    // Side lines
    line(cx - rx, cy, cx - rx, cy + h);
    line(cx + rx, cy, cx + rx, cy + h);

    drawingContext.setLineDash([]);
    pop();
  } else {
    // Side body
    stroke('#2E7D32');
    strokeWeight(1.5);
    fill(129, 199, 132, 140);

    // Left side line
    line(cx - rx, cy, cx - rx, cy + h);
    // Right side line
    line(cx + rx, cy, cx + rx, cy + h);

    // Bottom ellipse (back half first)
    fill(129, 199, 132, 100);
    arc(cx, cy + h, rx * 2, ry * 2, 0, PI);

    // Side fill
    noStroke();
    fill(129, 199, 132, 140);
    rect(cx - rx, cy, rx * 2, h);

    // Bottom ellipse front half
    stroke('#2E7D32');
    strokeWeight(1.5);
    noFill();
    arc(cx, cy + h, rx * 2, ry * 2, 0, PI);

    // Bottom back half (dashed)
    stroke('#2E7D32');
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    arc(cx, cy + h, rx * 2, ry * 2, PI, TWO_PI);
    drawingContext.setLineDash([]);

    // Side lines again on top
    stroke('#2E7D32');
    strokeWeight(1.5);
    line(cx - rx, cy, cx - rx, cy + h);
    line(cx + rx, cy, cx + rx, cy + h);

    // Top ellipse (fully visible)
    fill(165, 214, 167, 200);
    stroke('#2E7D32');
    strokeWeight(1.5);
    ellipse(cx, cy, rx * 2, ry * 2);

    // Radius line on top
    stroke('#1B5E20');
    strokeWeight(1.5);
    line(cx, cy, cx + rx, cy);
  }
}

function drawConeShape(cx, cy, rx, ry, h) {
  // Apex at top center
  let apexY = cy;

  // Base ellipse at bottom
  let baseY = cy + h;

  strokeWeight(1.5);

  // Left slant line
  stroke('#F57F17');
  line(cx, apexY, cx - rx, baseY);
  // Right slant line
  line(cx, apexY, cx + rx, baseY);

  // Fill the cone body
  noStroke();
  fill(255, 241, 118, 160);
  beginShape();
  vertex(cx, apexY);
  // Approximate the bottom ellipse arc
  for (let a = PI; a <= TWO_PI; a += 0.05) {
    let ex = cx + rx * cos(a);
    let ey = baseY + ry * sin(a);
    vertex(ex, ey);
  }
  vertex(cx + rx, baseY);
  endShape(CLOSE);

  // Front half of body
  noStroke();
  fill(255, 238, 88, 140);
  beginShape();
  vertex(cx, apexY);
  for (let a = 0; a <= PI; a += 0.05) {
    let ex = cx + rx * cos(a);
    let ey = baseY + ry * sin(a);
    vertex(ex, ey);
  }
  endShape(CLOSE);

  // Bottom ellipse front half
  stroke('#F57F17');
  strokeWeight(1.5);
  noFill();
  arc(cx, baseY, rx * 2, ry * 2, 0, PI);

  // Bottom back half (dashed)
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  arc(cx, baseY, rx * 2, ry * 2, PI, TWO_PI);
  drawingContext.setLineDash([]);

  // Slant lines on top
  stroke('#F57F17');
  strokeWeight(1.5);
  line(cx, apexY, cx - rx, baseY);
  line(cx, apexY, cx + rx, baseY);

  // Apex dot
  fill('#F57F17');
  noStroke();
  ellipse(cx, apexY, 5, 5);
}

// ========== RESPONSIVE ==========

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
