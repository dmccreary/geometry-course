// Postulate Visualization Gallery
// Illustrates five fundamental geometric postulates in a gallery layout
// Learning Objective: Students will recognize and recall fundamental
// geometric postulates and their visual representations (Remembering)

let canvasWidth = 800;
let drawHeight = 450;
let canvasHeight = drawHeight;

// Panel dimensions
let panelW = 250;
let panelH = 200;
let gap = 16;

let hoveredPanel = -1;

// Postulate data
let postulates = [
  {
    title: "Two Points, One Line",
    annotation: "Only ONE line possible"
  },
  {
    title: "Line in a Plane",
    annotation: "Line stays within the plane"
  },
  {
    title: "Three Points, One Plane",
    annotation: "Points not on same line \u2192 unique plane"
  },
  {
    title: "Two Lines, One Intersection",
    annotation: "Lines meet at ONE point"
  },
  {
    title: "Parallel Postulate",
    annotation: "Only ONE parallel through P"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe(
    'Gallery of five panels illustrating fundamental geometric postulates with labeled diagrams',
    LABEL
  );
}

function draw() {
  updateCanvasSize();
  background('#F0F0F0');

  // Title
  noStroke();
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Fundamental Geometric Postulates', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Detect hover
  hoveredPanel = getHoveredPanel();

  // Compute layout positions
  let positions = getPanelPositions();

  // Draw each panel
  for (let i = 0; i < 5; i++) {
    drawPanel(i, positions[i].x, positions[i].y);
  }

  // Footer
  fill('#757575');
  textSize(11);
  textAlign(CENTER, BOTTOM);
  textStyle(ITALIC);
  text(
    'These statements are accepted as true without proof',
    canvasWidth / 2,
    canvasHeight - 4
  );
  textStyle(NORMAL);
}

// ── Layout helpers ──────────────────────────────────────────────────

function getPanelPositions() {
  let startY = 38;

  // Top row: 3 panels centered
  let topTotalW = 3 * panelW + 2 * gap;
  let topX = (canvasWidth - topTotalW) / 2;

  // Bottom row: 2 panels centered
  let botTotalW = 2 * panelW + gap;
  let botX = (canvasWidth - botTotalW) / 2;
  let botY = startY + panelH + gap;

  return [
    { x: topX, y: startY },
    { x: topX + panelW + gap, y: startY },
    { x: topX + 2 * (panelW + gap), y: startY },
    { x: botX, y: botY },
    { x: botX + panelW + gap, y: botY }
  ];
}

function getHoveredPanel() {
  let positions = getPanelPositions();
  for (let i = 0; i < positions.length; i++) {
    if (
      mouseX > positions[i].x &&
      mouseX < positions[i].x + panelW &&
      mouseY > positions[i].y &&
      mouseY < positions[i].y + panelH
    ) {
      return i;
    }
  }
  return -1;
}

// ── Panel drawing ───────────────────────────────────────────────────

function drawPanel(index, x, y) {
  let isHovered = hoveredPanel === index;

  // Panel background
  if (isHovered) {
    fill('#FFF8E1');
    stroke('#FFA000');
    strokeWeight(2);
  } else {
    fill('#FAFAFA');
    stroke('#BDBDBD');
    strokeWeight(1);
  }
  rect(x, y, panelW, panelH, 6);

  // Title inside panel
  noStroke();
  fill('#37474F');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(postulates[index].title, x + panelW / 2, y + 6);
  textStyle(NORMAL);

  // Draw the specific visualization
  push();
  translate(x, y);
  switch (index) {
    case 0:
      drawTwoPointsLine(panelW, panelH, isHovered);
      break;
    case 1:
      drawPointsInPlane(panelW, panelH, isHovered);
      break;
    case 2:
      drawThreePointsPlane(panelW, panelH, isHovered);
      break;
    case 3:
      drawTwoLinesIntersect(panelW, panelH, isHovered);
      break;
    case 4:
      drawParallelPostulate(panelW, panelH, isHovered);
      break;
  }
  pop();

  // Annotation at bottom of panel
  noStroke();
  fill(isHovered ? '#E65100' : '#757575');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  textStyle(ITALIC);
  text(postulates[index].annotation, x + panelW / 2, y + panelH - 5);
  textStyle(NORMAL);
}

// ── Panel 1: Through two points, exactly one line ───────────────────

function drawTwoPointsLine(w, h, hl) {
  let cx = w / 2;
  let cy = h / 2 + 8;

  // Blue line extending across panel
  stroke(hl ? '#1565C0' : '#42A5F5');
  strokeWeight(3);
  line(20, cy, w - 20, cy);

  // Arrow tips to suggest infinite extension
  strokeWeight(1.5);
  stroke('#90CAF9');
  line(20, cy, 28, cy - 5);
  line(20, cy, 28, cy + 5);
  line(w - 20, cy, w - 28, cy - 5);
  line(w - 20, cy, w - 28, cy + 5);

  // Two red points
  noStroke();
  fill('#E53935');
  circle(cx - 55, cy, 14);
  circle(cx + 55, cy, 14);

  // White centers
  fill(255);
  circle(cx - 55, cy, 4);
  circle(cx + 55, cy, 4);

  // Labels
  fill('#263238');
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('A', cx - 55, cy - 12);
  text('B', cx + 55, cy - 12);
  textStyle(NORMAL);
}

// ── Panel 2: Points in plane -> line in plane ───────────────────────

function drawPointsInPlane(w, h, hl) {
  let cx = w / 2;
  let cy = h / 2 + 8;

  // Tilted plane as parallelogram
  let planeColor = hl ? color(200, 230, 201, 200) : color(232, 245, 233, 180);
  fill(planeColor);
  stroke('#66BB6A');
  strokeWeight(2);
  quad(35, cy + 35, w - 40, cy + 35, w - 25, cy - 40, 50, cy - 40);

  // Subtle grid on plane for depth
  stroke(165, 214, 167, 120);
  strokeWeight(0.8);
  for (let i = 1; i <= 3; i++) {
    let t = i / 4;
    let lx1 = lerp(35, 50, t);
    let rx1 = lerp(w - 40, w - 25, t);
    let yy = lerp(cy + 35, cy - 40, t);
    line(lx1, yy, rx1, yy);
  }
  for (let i = 1; i <= 4; i++) {
    let t = i / 5;
    let tx = lerp(50, w - 25, t);
    let bx = lerp(35, w - 40, t);
    line(bx, cy + 35, tx, cy - 40);
  }

  // Green line through P and Q on the plane
  stroke('#2E7D32');
  strokeWeight(3);
  line(65, cy, w - 60, cy);

  // Green points P and Q
  noStroke();
  fill('#388E3C');
  circle(90, cy, 13);
  circle(w - 85, cy, 13);

  // White dot centers
  fill(255);
  circle(90, cy, 4);
  circle(w - 85, cy, 4);

  // Labels
  fill('#1B5E20');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('P', 90, cy + 10);
  text('Q', w - 85, cy + 10);
  textStyle(NORMAL);
}

// ── Panel 3: Three non-collinear points -> one plane ────────────────

function drawThreePointsPlane(w, h, hl) {
  let cx = w / 2;
  let cy = h / 2 + 8;

  // Purple transparent plane
  let planeColor = hl ? color(225, 190, 231, 160) : color(243, 229, 245, 130);
  fill(planeColor);
  stroke('#8E24AA');
  strokeWeight(2);
  beginShape();
  vertex(25, cy + 40);
  vertex(w - 25, cy + 35);
  vertex(w - 40, cy - 45);
  vertex(40, cy - 40);
  endShape(CLOSE);

  // Dashed triangle connecting R, S, T
  stroke('#9C27B0');
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  let rx = cx, ry = cy - 28;
  let sx = cx - 65, sy = cy + 22;
  let tx = cx + 65, ty = cy + 22;
  triangle(rx, ry, sx, sy, tx, ty);
  drawingContext.setLineDash([]);

  // Purple points
  noStroke();
  fill('#7B1FA2');
  circle(rx, ry, 13);
  circle(sx, sy, 13);
  circle(tx, ty, 13);

  // White centers
  fill(255);
  circle(rx, ry, 4);
  circle(sx, sy, 4);
  circle(tx, ty, 4);

  // Labels
  fill('#4A148C');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('R', rx, ry - 10);
  textAlign(RIGHT, CENTER);
  text('S', sx - 10, sy);
  textAlign(LEFT, CENTER);
  text('T', tx + 10, ty);
  textStyle(NORMAL);
}

// ── Panel 4: Two lines intersect at exactly one point ───────────────

function drawTwoLinesIntersect(w, h, hl) {
  let cx = w / 2;
  let cy = h / 2 + 8;

  // Red line
  stroke(hl ? '#C62828' : '#E53935');
  strokeWeight(3);
  line(25, cy - 45, w - 25, cy + 45);

  // Blue line
  stroke(hl ? '#1565C0' : '#1E88E5');
  strokeWeight(3);
  line(25, cy + 45, w - 25, cy - 45);

  // Yellow intersection highlight circle
  noStroke();
  fill('#FFF176');
  circle(cx, cy, 24);

  // Inner orange circle
  fill('#FFB300');
  circle(cx, cy, 12);

  // Label X
  fill('#263238');
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('X', cx, cy - 14);
  textStyle(NORMAL);
}

// ── Panel 5: Parallel Postulate ─────────────────────────────────────

function drawParallelPostulate(w, h, hl) {
  let cx = w / 2;
  let cy = h / 2 + 12;
  let lineY = cy + 28;
  let pointY = cy - 22;

  // Horizontal blue line L
  stroke(hl ? '#1565C0' : '#42A5F5');
  strokeWeight(3);
  line(20, lineY, w - 20, lineY);

  // Label L
  noStroke();
  fill('#1565C0');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('L', 24, lineY + 4);
  textStyle(NORMAL);

  // Rejected gray lines through P (non-parallel)
  stroke('#BDBDBD');
  strokeWeight(1.2);
  // Left-leaning rejected line
  line(cx, pointY, cx - 70, lineY + 12);
  // Right-leaning rejected line
  line(cx, pointY, cx + 70, lineY + 12);
  // Steeper rejected line
  line(cx, pointY, cx - 30, lineY + 12);

  // X marks on rejected lines
  stroke('#EF5350');
  strokeWeight(2);
  let marks = [
    { x: cx - 35, y: (pointY + lineY + 12) / 2 },
    { x: cx + 35, y: (pointY + lineY + 12) / 2 },
    { x: cx - 15, y: (pointY + lineY + 12) / 2 }
  ];
  for (let m of marks) {
    line(m.x - 4, m.y - 4, m.x + 4, m.y + 4);
    line(m.x - 4, m.y + 4, m.x + 4, m.y - 4);
  }

  // Dashed red parallel line through P
  stroke('#E53935');
  strokeWeight(2);
  drawingContext.setLineDash([7, 5]);
  line(30, pointY, w - 30, pointY);
  drawingContext.setLineDash([]);

  // Red point P above line
  noStroke();
  fill('#E53935');
  circle(cx, pointY, 14);
  fill(255);
  circle(cx, pointY, 4);

  // Label P
  fill('#B71C1C');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('P', cx, pointY - 10);
  textStyle(NORMAL);
}

// ── Resize handling ─────────────────────────────────────────────────

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 600);
  }
}
