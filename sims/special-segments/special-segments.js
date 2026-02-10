// Special Segments in Triangles
// Shows medians, altitudes, perpendicular bisectors, and angle bisectors

let canvasWidth = 800;
let drawHeight = 650;
let canvasHeight = drawHeight;

let selectedPanel = -1; // -1 = show all

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Four types of special segments in triangles with their points of concurrency', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#424242');
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Four Special Segments and Their Points of Concurrency", canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(10);
  text('Click any panel to focus', canvasWidth / 2, 28);

  drawPanels();
  drawSummaryTable();
}

function drawPanels() {
  let panelWidth = (canvasWidth - 40) / 2;
  let panelHeight = 240;
  let startY = 45;

  // Top row
  drawMediansPanel(15, startY, panelWidth, panelHeight, 0);
  drawAltitudesPanel(25 + panelWidth, startY, panelWidth, panelHeight, 1);

  // Bottom row
  drawPerpBisectorsPanel(15, startY + panelHeight + 10, panelWidth, panelHeight, 2);
  drawAngleBisectorsPanel(25 + panelWidth, startY + panelHeight + 10, panelWidth, panelHeight, 3);
}

function drawMediansPanel(x, y, w, h, idx) {
  let isSelected = selectedPanel === -1 || selectedPanel === idx;
  let alpha = isSelected ? 255 : 60;

  // Panel background
  fill(255, 255, 255, alpha);
  stroke(isSelected ? '#9C27B0' : '#E0E0E0');
  strokeWeight(isSelected ? 3 : 1);
  rect(x, y, w, h, 8);

  let cx = x + w / 2;
  let cy = y + h / 2 + 10;

  // Title
  noStroke();
  fill(156, 39, 176, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Medians", cx, y + 10);
  textStyle(NORMAL);
  textSize(9);
  text("Vertex to midpoint of opposite side", cx, y + 25);

  // Draw triangle with medians
  let triScale = 0.4;
  let ax = cx;
  let ay = cy - 70 * triScale;
  let bx = cx - 80 * triScale;
  let by = cy + 60 * triScale;
  let Cx = cx + 80 * triScale;
  let Cy = cy + 60 * triScale;

  // Triangle
  stroke(100, 100, 100, alpha);
  strokeWeight(2);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Midpoints
  let m1 = {x: (bx + Cx) / 2, y: (by + Cy) / 2};
  let m2 = {x: (ax + Cx) / 2, y: (ay + Cy) / 2};
  let m3 = {x: (ax + bx) / 2, y: (ay + by) / 2};

  // Medians
  stroke(156, 39, 176, alpha);
  strokeWeight(2);
  line(ax, ay, m1.x, m1.y);
  line(bx, by, m2.x, m2.y);
  line(Cx, Cy, m3.x, m3.y);

  // Midpoint markers
  fill(156, 39, 176, alpha);
  noStroke();
  ellipse(m1.x, m1.y, 6, 6);
  ellipse(m2.x, m2.y, 6, 6);
  ellipse(m3.x, m3.y, 6, 6);

  // Centroid (intersection)
  let gx = (ax + bx + Cx) / 3;
  let gy = (ay + by + Cy) / 3;

  fill(244, 67, 54, alpha);
  ellipse(gx, gy, 12, 12);

  // Labels
  fill(100, 100, 100, alpha);
  textSize(10);
  textStyle(BOLD);
  text('A', ax, ay - 10);
  text('B', bx - 10, by + 5);
  text('C', Cx + 10, Cy + 5);
  textStyle(NORMAL);

  fill(244, 67, 54, alpha);
  textSize(9);
  text('G', gx + 10, gy - 5);

  // Properties
  fill(66, 66, 66, alpha);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("Centroid (G) - Balance point", cx, y + h - 25);
  text("Divides each median 2:1", cx, y + h - 12);
}

function drawAltitudesPanel(x, y, w, h, idx) {
  let isSelected = selectedPanel === -1 || selectedPanel === idx;
  let alpha = isSelected ? 255 : 60;

  fill(255, 255, 255, alpha);
  stroke(isSelected ? '#FF9800' : '#E0E0E0');
  strokeWeight(isSelected ? 3 : 1);
  rect(x, y, w, h, 8);

  let cx = x + w / 2;
  let cy = y + h / 2 + 10;

  noStroke();
  fill(255, 152, 0, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Altitudes", cx, y + 10);
  textStyle(NORMAL);
  textSize(9);
  text("Perpendicular from vertex to opposite side", cx, y + 25);

  // Acute triangle
  let triScale = 0.4;
  let ax = cx;
  let ay = cy - 65 * triScale;
  let bx = cx - 75 * triScale;
  let by = cy + 55 * triScale;
  let Cx = cx + 75 * triScale;
  let Cy = cy + 55 * triScale;

  // Triangle
  stroke(100, 100, 100, alpha);
  strokeWeight(2);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Altitudes (simplified - just draw to approximate feet)
  stroke(255, 152, 0, alpha);
  strokeWeight(2);

  // Altitude from A to BC
  let foot1 = projectPointToLine(ax, ay, bx, by, Cx, Cy);
  line(ax, ay, foot1.x, foot1.y);
  drawRightAngleMark(foot1.x, foot1.y, ax, ay, bx, by, '#FF9800', alpha);

  // Altitude from B to AC
  let foot2 = projectPointToLine(bx, by, ax, ay, Cx, Cy);
  line(bx, by, foot2.x, foot2.y);

  // Altitude from C to AB
  let foot3 = projectPointToLine(Cx, Cy, ax, ay, bx, by);
  line(Cx, Cy, foot3.x, foot3.y);

  // Orthocenter (approximate for acute)
  let hx = (foot1.x + foot2.x + foot3.x) / 3 + 5;
  let hy = (foot1.y + foot2.y + foot3.y) / 3;

  fill(33, 150, 243, alpha);
  noStroke();
  ellipse(hx, hy, 12, 12);

  // Labels
  fill(100, 100, 100, alpha);
  textSize(10);
  textStyle(BOLD);
  text('D', ax, ay - 10);
  text('E', bx - 10, by + 5);
  text('F', Cx + 10, Cy + 5);
  textStyle(NORMAL);

  fill(33, 150, 243, alpha);
  textSize(9);
  text('H', hx + 10, hy - 5);

  // Properties
  fill(66, 66, 66, alpha);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("Orthocenter (H)", cx, y + h - 25);
  text("Location depends on triangle type", cx, y + h - 12);
}

function drawPerpBisectorsPanel(x, y, w, h, idx) {
  let isSelected = selectedPanel === -1 || selectedPanel === idx;
  let alpha = isSelected ? 255 : 60;

  fill(255, 255, 255, alpha);
  stroke(isSelected ? '#009688' : '#E0E0E0');
  strokeWeight(isSelected ? 3 : 1);
  rect(x, y, w, h, 8);

  let cx = x + w / 2;
  let cy = y + h / 2 + 10;

  noStroke();
  fill(0, 150, 136, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Perpendicular Bisectors", cx, y + 10);
  textStyle(NORMAL);
  textSize(9);
  text("⊥ to side at its midpoint", cx, y + 25);

  let triScale = 0.4;
  let ax = cx;
  let ay = cy - 60 * triScale;
  let bx = cx - 70 * triScale;
  let by = cy + 50 * triScale;
  let Cx = cx + 70 * triScale;
  let Cy = cy + 50 * triScale;

  // Triangle
  stroke(100, 100, 100, alpha);
  strokeWeight(2);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Midpoints
  let m1 = {x: (bx + Cx) / 2, y: (by + Cy) / 2};
  let m2 = {x: (ax + Cx) / 2, y: (ay + Cy) / 2};
  let m3 = {x: (ax + bx) / 2, y: (ay + by) / 2};

  // Circumcenter
  let ox = (ax + bx + Cx) / 3;
  let oy = (ay + by + Cy) / 3 + 5;

  // Perpendicular bisectors (lines through midpoints toward circumcenter)
  stroke(0, 150, 136, alpha);
  strokeWeight(2);
  drawPerpLine(m1.x, m1.y, bx, by, Cx, Cy, 40, alpha);
  drawPerpLine(m2.x, m2.y, ax, ay, Cx, Cy, 40, alpha);
  drawPerpLine(m3.x, m3.y, ax, ay, bx, by, 40, alpha);

  // Midpoint markers
  fill(0, 150, 136, alpha);
  noStroke();
  ellipse(m1.x, m1.y, 5, 5);
  ellipse(m2.x, m2.y, 5, 5);
  ellipse(m3.x, m3.y, 5, 5);

  // Circumcenter
  fill(76, 175, 80, alpha);
  ellipse(ox, oy, 12, 12);

  // Circumcircle (dashed)
  let radius = dist(ox, oy, ax, ay);
  stroke(76, 175, 80, alpha * 0.5);
  strokeWeight(1);
  setLineDash([4, 4]);
  noFill();
  ellipse(ox, oy, radius * 2, radius * 2);
  setLineDash([]);

  // Labels
  noStroke();
  fill(100, 100, 100, alpha);
  textSize(10);
  textStyle(BOLD);
  text('G', ax, ay - 10);
  text('H', bx - 10, by + 5);
  text('I', Cx + 10, Cy + 5);
  textStyle(NORMAL);

  fill(76, 175, 80, alpha);
  textSize(9);
  text('O', ox + 10, oy - 5);

  // Properties
  fill(66, 66, 66, alpha);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("Circumcenter (O) - Center of circumcircle", cx, y + h - 25);
  text("Equidistant from all vertices", cx, y + h - 12);
}

function drawAngleBisectorsPanel(x, y, w, h, idx) {
  let isSelected = selectedPanel === -1 || selectedPanel === idx;
  let alpha = isSelected ? 255 : 60;

  fill(255, 255, 255, alpha);
  stroke(isSelected ? '#795548' : '#E0E0E0');
  strokeWeight(isSelected ? 3 : 1);
  rect(x, y, w, h, 8);

  let cx = x + w / 2;
  let cy = y + h / 2 + 10;

  noStroke();
  fill(121, 85, 72, alpha);
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Angle Bisectors", cx, y + 10);
  textStyle(NORMAL);
  textSize(9);
  text("Bisects each angle of triangle", cx, y + 25);

  let triScale = 0.4;
  let ax = cx;
  let ay = cy - 60 * triScale;
  let bx = cx - 70 * triScale;
  let by = cy + 50 * triScale;
  let Cx = cx + 70 * triScale;
  let Cy = cy + 50 * triScale;

  // Triangle
  stroke(100, 100, 100, alpha);
  strokeWeight(2);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Incenter (approximate)
  let ix = (ax + bx + Cx) / 3;
  let iy = (ay + by + Cy) / 3 + 10;

  // Angle bisectors
  stroke(121, 85, 72, alpha);
  strokeWeight(2);
  line(ax, ay, ix + (ix - ax) * 0.5, iy + (iy - ay) * 0.5);
  line(bx, by, ix + (ix - bx) * 0.3, iy + (iy - by) * 0.3);
  line(Cx, Cy, ix + (ix - Cx) * 0.3, iy + (iy - Cy) * 0.3);

  // Incenter
  fill(233, 30, 99, alpha);
  noStroke();
  ellipse(ix, iy, 12, 12);

  // Incircle
  let inradius = 18;
  stroke(233, 30, 99, alpha * 0.5);
  strokeWeight(1);
  setLineDash([4, 4]);
  noFill();
  ellipse(ix, iy, inradius * 2, inradius * 2);
  setLineDash([]);

  // Labels
  noStroke();
  fill(100, 100, 100, alpha);
  textSize(10);
  textStyle(BOLD);
  text('J', ax, ay - 10);
  text('K', bx - 10, by + 5);
  text('L', Cx + 10, Cy + 5);
  textStyle(NORMAL);

  fill(233, 30, 99, alpha);
  textSize(9);
  text('I', ix + 10, iy - 5);

  // Properties
  fill(66, 66, 66, alpha);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("Incenter (I) - Center of incircle", cx, y + h - 25);
  text("Equidistant from all sides", cx, y + h - 12);
}

function projectPointToLine(px, py, x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  return {x: x1 + t * dx, y: y1 + t * dy};
}

function drawRightAngleMark(fx, fy, px, py, lx, ly, col, alpha) {
  let size = 6;
  let angle1 = atan2(py - fy, px - fx);
  let angle2 = atan2(ly - fy, lx - fx);

  push();
  translate(fx, fy);
  rotate(angle2);
  stroke(col);
  strokeWeight(1);
  noFill();
  rect(0, 0, size, size);
  pop();
}

function drawPerpLine(mx, my, x1, y1, x2, y2, len, alpha) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let perpDx = -dy;
  let perpDy = dx;
  let perpLen = sqrt(perpDx * perpDx + perpDy * perpDy);
  perpDx /= perpLen;
  perpDy /= perpLen;

  line(mx - perpDx * len, my - perpDy * len, mx + perpDx * len, my + perpDy * len);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function drawSummaryTable() {
  let y = 555;
  let rowHeight = 18;

  fill(33, 150, 243, 30);
  noStroke();
  rect(10, y, canvasWidth - 20, 85, 5);

  fill('#1565C0');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Summary", canvasWidth / 2, y + 5);
  textStyle(NORMAL);

  // Table headers
  textSize(9);
  textAlign(LEFT, TOP);
  let col1 = 30, col2 = 150, col3 = 350, col4 = 550;

  fill('#424242');
  textStyle(BOLD);
  text("Segment", col1, y + 22);
  text("Definition", col2, y + 22);
  text("Concurrent Point", col3, y + 22);
  text("Property", col4, y + 22);
  textStyle(NORMAL);

  // Rows
  fill('#9C27B0');
  text("Median", col1, y + 40);
  fill('#424242');
  text("Vertex → midpoint", col2, y + 40);
  text("Centroid (G)", col3, y + 40);
  text("Balance point, 2:1", col4, y + 40);

  fill('#FF9800');
  text("Altitude", col1, y + 55);
  fill('#424242');
  text("⊥ from vertex", col2, y + 55);
  text("Orthocenter (H)", col3, y + 55);
  text("Location varies", col4, y + 55);

  fill('#009688');
  text("Perp. Bisector", col1, y + 70);
  fill('#424242');
  text("⊥ at midpoint", col2, y + 70);
  text("Circumcenter (O)", col3, y + 70);
  text("Equidist. from vertices", col4, y + 70);
}

function mousePressed() {
  let panelWidth = (canvasWidth - 40) / 2;
  let panelHeight = 240;
  let startY = 45;

  // Check which panel was clicked
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      let px = 15 + col * (panelWidth + 10);
      let py = startY + row * (panelHeight + 10);
      let idx = row * 2 + col;

      if (mouseX >= px && mouseX <= px + panelWidth &&
          mouseY >= py && mouseY <= py + panelHeight) {
        selectedPanel = selectedPanel === idx ? -1 : idx;
        return;
      }
    }
  }
  selectedPanel = -1;
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
