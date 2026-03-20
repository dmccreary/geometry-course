// Surface Area Formulas Reference MicroSim
// Static diagram showing surface area formulas for 5 solids:
// Rectangular Prism, Cylinder, Cube, Square Pyramid, Cone

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

  describe('Five-panel diagram showing surface area formulas for rectangular prism, cylinder, cube, square pyramid, and cone with 3D visual representations and mathematical formulas', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region background
  background(240, 248, 255);
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);

  let panelWidth = (canvasWidth - 4 * margin) / 3;
  let panelHeight = 270;

  // Title
  noStroke();
  fill(0);
  textStyle(BOLD);
  textSize(22);
  textAlign(CENTER, TOP);
  text('Surface Area Formulas', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Row 1: 3 panels
  let row1Y = 45;
  drawRectPrismPanel(margin, row1Y, panelWidth, panelHeight);
  drawCylinderPanel(margin + panelWidth + margin, row1Y, panelWidth, panelHeight);
  drawCubePanel(margin + 2 * (panelWidth + margin), row1Y, panelWidth, panelHeight);

  // Row 2: 2 panels centered
  let row2Y = 340;
  let row2Offset = (canvasWidth - 2 * panelWidth - margin) / 2;
  drawPyramidPanel(row2Offset, row2Y, panelWidth, panelHeight - 30);
  drawConePanel(row2Offset + panelWidth + margin, row2Y, panelWidth, panelHeight - 30);

  // Bottom note
  let noteY = canvasHeight - 30;
  noStroke();
  fill(230, 230, 230);
  rect(margin, noteY - 4, canvasWidth - 2 * margin, 26, 6);
  fill(80);
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Surface area is measured in square units (cm\u00B2, m\u00B2, etc.)', canvasWidth / 2, noteY + 9);
}

// --- RECTANGULAR PRISM ---
function drawRectPrismPanel(x, y, w, h) {
  push();
  // Panel background
  fill('#E3F2FD');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(0);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Rectangular Prism', x + w / 2, y + 8);
  textStyle(NORMAL);

  // Isometric rectangular prism
  let cx = x + w / 2;
  let cy = y + h / 2 - 10;
  let lLen = w * 0.30;  // length (going right-down)
  let wLen = w * 0.20;  // width (going left-down)
  let hLen = h * 0.28;  // height (going up)

  // Isometric directions
  let lx = lLen * cos(PI / 6);
  let ly = lLen * sin(PI / 6);
  let wx = -wLen * cos(PI / 6);
  let wy = wLen * sin(PI / 6);

  // Bottom-front-left corner as origin
  let ox = cx - (lx + wx) / 2;
  let oy = cy + hLen / 2;

  // 8 corners
  let bfl = { x: ox, y: oy };                          // bottom front left
  let bfr = { x: ox + lx, y: oy + ly };                // bottom front right
  let bbl = { x: ox + wx, y: oy + wy };                // bottom back left
  let bbr = { x: ox + lx + wx, y: oy + ly + wy };     // bottom back right
  let tfl = { x: ox, y: oy - hLen };                   // top front left
  let tfr = { x: ox + lx, y: oy + ly - hLen };         // top front right
  let tbl = { x: ox + wx, y: oy + wy - hLen };         // top back left
  let tbr = { x: ox + lx + wx, y: oy + ly + wy - hLen }; // top back right

  // Hidden edges (dashed)
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(bfl.x, bfl.y, bbl.x, bbl.y);
  line(bbl.x, bbl.y, bbr.x, bbr.y);
  line(bbl.x, bbl.y, tbl.x, tbl.y);
  drawingContext.setLineDash([]);

  // Front face (light blue)
  strokeWeight(2);
  stroke('#1565C0');
  fill(100, 181, 246, 120);
  beginShape();
  vertex(bfl.x, bfl.y);
  vertex(bfr.x, bfr.y);
  vertex(tfr.x, tfr.y);
  vertex(tfl.x, tfl.y);
  endShape(CLOSE);

  // Right face (medium blue)
  fill(66, 165, 245, 120);
  beginShape();
  vertex(bfr.x, bfr.y);
  vertex(bbr.x, bbr.y);
  vertex(tbr.x, tbr.y);
  vertex(tfr.x, tfr.y);
  endShape(CLOSE);

  // Top face (pale blue)
  fill(144, 202, 249, 120);
  beginShape();
  vertex(tfl.x, tfl.y);
  vertex(tfr.x, tfr.y);
  vertex(tbr.x, tbr.y);
  vertex(tbl.x, tbl.y);
  endShape(CLOSE);

  // Dimension labels (red)
  noStroke();
  fill('red');
  textSize(16);
  textStyle(ITALIC);

  // l label - along front bottom
  textAlign(CENTER, TOP);
  text('l', (bfl.x + bfr.x) / 2, (bfl.y + bfr.y) / 2 + 6);

  // w label - along right bottom
  textAlign(CENTER, TOP);
  text('w', (bfr.x + bbr.x) / 2 + 6, (bfr.y + bbr.y) / 2 + 4);

  // h label - along front left edge
  textAlign(RIGHT, CENTER);
  text('h', bfl.x - 6, (bfl.y + tfl.y) / 2);
  textStyle(NORMAL);

  // Formula box
  noStroke();
  fill(255, 255, 224);
  rect(x + 8, y + h - 70, w - 16, 58, 6);
  stroke(200, 200, 150);
  strokeWeight(1);
  noFill();
  rect(x + 8, y + h - 70, w - 16, 58, 6);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('SA = 2lw + 2lh + 2wh', x + w / 2, y + h - 50);
  fill(80);
  textSize(14);
  text('SA = 2(lw + lh + wh)', x + w / 2, y + h - 28);

  pop();
}

// --- CYLINDER ---
function drawCylinderPanel(x, y, w, h) {
  push();
  // Panel background
  fill('#E8F5E9');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(0);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Cylinder', x + w / 2, y + 8);
  textStyle(NORMAL);

  let cx = x + w / 2;
  let cy = y + h / 2 - 15;
  let rx = w * 0.22;
  let ry = rx * 0.35;
  let cylH = h * 0.30;

  let topY = cy - cylH / 2;
  let botY = cy + cylH / 2;

  // Side surface (green)
  stroke('#2E7D32');
  strokeWeight(2);
  fill(129, 199, 132, 100);
  // Left side
  line(cx - rx, topY, cx - rx, botY);
  // Right side
  line(cx + rx, topY, cx + rx, botY);

  // Bottom ellipse (dashed back half)
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  arc(cx, botY, rx * 2, ry * 2, PI, TWO_PI);
  drawingContext.setLineDash([]);

  // Bottom ellipse front half
  stroke('#2E7D32');
  strokeWeight(2);
  noFill();
  arc(cx, botY, rx * 2, ry * 2, 0, PI);

  // Side fill
  noStroke();
  fill(129, 199, 132, 60);
  beginShape();
  vertex(cx - rx, topY);
  vertex(cx + rx, topY);
  vertex(cx + rx, botY);
  vertex(cx - rx, botY);
  endShape(CLOSE);

  // Top ellipse (filled)
  stroke('#2E7D32');
  strokeWeight(2);
  fill(165, 214, 167, 140);
  ellipse(cx, topY, rx * 2, ry * 2);

  // Radius line on top
  stroke('red');
  strokeWeight(1.5);
  line(cx, topY, cx + rx, topY);

  // Height line
  stroke('red');
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  line(cx + rx + 12, topY, cx + rx + 12, botY);
  drawingContext.setLineDash([]);

  // Arrowheads for height
  stroke('red');
  strokeWeight(1);
  fill('red');
  triangle(cx + rx + 12, topY, cx + rx + 9, topY + 6, cx + rx + 15, topY + 6);
  triangle(cx + rx + 12, botY, cx + rx + 9, botY - 6, cx + rx + 15, botY - 6);

  // Labels
  noStroke();
  fill('red');
  textSize(16);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text('r', cx + rx / 2, topY - ry - 2);
  textAlign(LEFT, CENTER);
  text('h', cx + rx + 18, (topY + botY) / 2);
  textStyle(NORMAL);

  // Formula box
  noStroke();
  fill(255, 255, 224);
  rect(x + 8, y + h - 70, w - 16, 58, 6);
  stroke(200, 200, 150);
  strokeWeight(1);
  noFill();
  rect(x + 8, y + h - 70, w - 16, 58, 6);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('SA = 2\u03C0r\u00B2 + 2\u03C0rh', x + w / 2, y + h - 50);
  fill(80);
  textSize(14);
  text('SA = 2\u03C0r(r + h)', x + w / 2, y + h - 28);

  pop();
}

// --- CUBE ---
function drawCubePanel(x, y, w, h) {
  push();
  // Panel background
  fill('#F3E5F5');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(0);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Cube', x + w / 2, y + 8);
  textStyle(NORMAL);

  let cx = x + w / 2;
  let cy = y + h / 2 - 15;
  let sLen = min(w * 0.25, h * 0.22);

  // Isometric cube
  let sx = sLen * cos(PI / 6);
  let sy = sLen * sin(PI / 6);

  let ox = cx;
  let oy = cy + sLen / 2;

  // 8 corners
  let bfl = { x: ox, y: oy };
  let bfr = { x: ox + sx, y: oy + sy };
  let bbl = { x: ox - sx, y: oy + sy };
  let bbr = { x: ox, y: oy + 2 * sy };
  let tfl = { x: ox, y: oy - sLen };
  let tfr = { x: ox + sx, y: oy + sy - sLen };
  let tbl = { x: ox - sx, y: oy + sy - sLen };
  let tbr = { x: ox, y: oy + 2 * sy - sLen };

  // Hidden edges (dashed)
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(bfl.x, bfl.y, bbl.x, bbl.y);
  line(bbl.x, bbl.y, bbr.x, bbr.y);
  line(bbl.x, bbl.y, tbl.x, tbl.y);
  drawingContext.setLineDash([]);

  strokeWeight(2);

  // Front face (light purple)
  stroke('#7B1FA2');
  fill(186, 104, 200, 100);
  beginShape();
  vertex(bfl.x, bfl.y);
  vertex(bfr.x, bfr.y);
  vertex(tfr.x, tfr.y);
  vertex(tfl.x, tfl.y);
  endShape(CLOSE);

  // Right face (medium purple)
  fill(171, 71, 188, 100);
  beginShape();
  vertex(bfr.x, bfr.y);
  vertex(bbr.x, bbr.y);
  vertex(tbr.x, tbr.y);
  vertex(tfr.x, tfr.y);
  endShape(CLOSE);

  // Top face (pale purple)
  fill(206, 147, 216, 100);
  beginShape();
  vertex(tfl.x, tfl.y);
  vertex(tfr.x, tfr.y);
  vertex(tbr.x, tbr.y);
  vertex(tbl.x, tbl.y);
  endShape(CLOSE);

  // s label on front edge
  noStroke();
  fill('red');
  textSize(16);
  textStyle(ITALIC);
  textAlign(RIGHT, CENTER);
  text('s', bfl.x - 6, (bfl.y + tfl.y) / 2);
  textStyle(NORMAL);

  // Note
  fill(80);
  textSize(14);
  textAlign(CENTER, CENTER);
  text('6 congruent faces', x + w / 2, y + h / 2 + sLen + 18);

  // Formula box
  noStroke();
  fill(255, 255, 224);
  rect(x + 8, y + h - 70, w - 16, 58, 6);
  stroke(200, 200, 150);
  strokeWeight(1);
  noFill();
  rect(x + 8, y + h - 70, w - 16, 58, 6);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('SA = 6s\u00B2', x + w / 2, y + h - 42);

  pop();
}

// --- SQUARE PYRAMID ---
function drawPyramidPanel(x, y, w, h) {
  push();
  // Panel background
  fill('#FFF3E0');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(0);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Square Pyramid', x + w / 2, y + 8);
  textStyle(NORMAL);

  let cx = x + w / 2;
  let cy = y + h / 2 - 8;
  let baseLen = w * 0.30;

  // Isometric base
  let bx = baseLen * cos(PI / 6);
  let by = baseLen * sin(PI / 6);

  let baseY = cy + 30;
  // Base corners
  let front = { x: cx, y: baseY + by * 2 };
  let right = { x: cx + bx, y: baseY + by };
  let back = { x: cx, y: baseY };
  let left = { x: cx - bx, y: baseY + by };

  // Apex
  let apex = { x: cx, y: cy - h * 0.25 };

  // Hidden edge (back-left to back)
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(back.x, back.y, left.x, left.y);
  line(apex.x, apex.y, back.x, back.y);
  drawingContext.setLineDash([]);

  strokeWeight(2);

  // Base (visible portion)
  stroke('#E65100');
  fill(255, 183, 77, 80);
  beginShape();
  vertex(front.x, front.y);
  vertex(right.x, right.y);
  vertex(back.x, back.y);
  vertex(left.x, left.y);
  endShape(CLOSE);

  // Front-left face
  fill(255, 152, 0, 100);
  beginShape();
  vertex(front.x, front.y);
  vertex(left.x, left.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Front-right face
  fill(255, 167, 38, 100);
  beginShape();
  vertex(front.x, front.y);
  vertex(right.x, right.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Right-back face
  fill(251, 140, 0, 80);
  beginShape();
  vertex(right.x, right.y);
  vertex(back.x, back.y);
  vertex(apex.x, apex.y);
  endShape(CLOSE);

  // Slant height line (red dashed) on front-right face
  let slantMidBase = { x: (front.x + right.x) / 2, y: (front.y + right.y) / 2 };
  stroke('red');
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  line(apex.x, apex.y, slantMidBase.x, slantMidBase.y);
  drawingContext.setLineDash([]);

  // Base label s
  noStroke();
  fill('red');
  textSize(16);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('s', (front.x + right.x) / 2 + 8, (front.y + right.y) / 2 + 4);

  // Slant height label l
  textAlign(LEFT, CENTER);
  text('l', (apex.x + slantMidBase.x) / 2 + 6, (apex.y + slantMidBase.y) / 2);
  textStyle(NORMAL);

  // Formula box
  noStroke();
  fill(255, 255, 224);
  rect(x + 8, y + h - 68, w - 16, 56, 6);
  stroke(200, 200, 150);
  strokeWeight(1);
  noFill();
  rect(x + 8, y + h - 68, w - 16, 56, 6);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('SA = s\u00B2 + 2sl', x + w / 2, y + h - 49);
  fill(80);
  textSize(14);
  text('General: SA = B + \u00BDPl', x + w / 2, y + h - 28);

  pop();
}

// --- CONE ---
function drawConePanel(x, y, w, h) {
  push();
  // Panel background
  fill('#E0F7FA');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(0);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Cone', x + w / 2, y + 8);
  textStyle(NORMAL);

  let cx = x + w / 2;
  let baseY = y + h / 2 + 30;
  let rx = w * 0.22;
  let ry = rx * 0.35;
  let coneH = h * 0.38;
  let apexY = baseY - coneH;

  // Lateral surface (from apex to base ellipse edges)
  stroke('#00838F');
  strokeWeight(2);
  fill(77, 208, 225, 80);
  beginShape();
  vertex(cx, apexY);
  // Approximate curve along base
  for (let a = 0; a <= PI; a += 0.05) {
    let px = cx + rx * cos(a);
    let py = baseY + ry * sin(a);
    vertex(px, py);
  }
  endShape(CLOSE);

  // Back half of base ellipse (dashed)
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  noFill();
  arc(cx, baseY, rx * 2, ry * 2, PI, TWO_PI);
  drawingContext.setLineDash([]);

  // Front half of base ellipse
  stroke('#00838F');
  strokeWeight(2);
  noFill();
  arc(cx, baseY, rx * 2, ry * 2, 0, PI);

  // Slant height line
  stroke('red');
  strokeWeight(1.5);
  line(cx, apexY, cx + rx, baseY);

  // Radius line
  stroke('red');
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  line(cx, baseY, cx + rx, baseY);
  drawingContext.setLineDash([]);

  // Labels
  noStroke();
  fill('red');
  textSize(16);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('r', cx + rx / 2, baseY + 4);

  // Slant height label
  textAlign(LEFT, CENTER);
  text('l', cx + rx / 2 + 10, (apexY + baseY) / 2);
  textStyle(NORMAL);

  // Formula box
  noStroke();
  fill(255, 255, 224);
  rect(x + 8, y + h - 68, w - 16, 56, 6);
  stroke(200, 200, 150);
  strokeWeight(1);
  noFill();
  rect(x + 8, y + h - 68, w - 16, 56, 6);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('SA = \u03C0r\u00B2 + \u03C0rl', x + w / 2, y + h - 49);
  fill(80);
  textSize(14);
  text('SA = \u03C0r(r + l)', x + w / 2, y + h - 28);

  pop();
}

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
