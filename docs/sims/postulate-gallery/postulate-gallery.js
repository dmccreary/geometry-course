// Postulate Visualization Gallery
// Interactive gallery of fundamental geometric postulates

let canvasWidth = 800;
let drawHeight = 500;
let canvasHeight = drawHeight;

let postulates = [
  {
    title: "Two Points → One Line",
    text: "Through any two points, there exists exactly one line.",
    annotation: "Only ONE line possible"
  },
  {
    title: "Points in Plane → Line in Plane",
    text: "If two points lie in a plane, then the line containing them lies in the plane.",
    annotation: "Line stays in plane"
  },
  {
    title: "Three Points → One Plane",
    text: "Through any three non-collinear points, there exists exactly one plane.",
    annotation: "Non-collinear → unique plane"
  },
  {
    title: "Lines Intersect at One Point",
    text: "Two lines intersect at exactly one point (if they intersect at all).",
    annotation: "ONE intersection point"
  },
  {
    title: "Parallel Postulate",
    text: "Through a point not on a line, there is exactly one parallel line.",
    annotation: "Only ONE parallel through P"
  }
];

let hoveredPanel = -1;
let selectedPanel = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive gallery showing five fundamental geometric postulates with hover effects', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  background('#F5F5F5');

  // Title
  fill('#1565C0');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Fundamental Geometric Postulates', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Check hover
  hoveredPanel = getHoveredPanel();

  // Draw panels
  let panelW = 240;
  let panelH = 180;
  let gap = 20;
  let startY = 55;

  // Top row (3 panels)
  let topRowX = (canvasWidth - 3 * panelW - 2 * gap) / 2;
  drawPanel(0, topRowX, startY, panelW, panelH);
  drawPanel(1, topRowX + panelW + gap, startY, panelW, panelH);
  drawPanel(2, topRowX + 2 * (panelW + gap), startY, panelW, panelH);

  // Bottom row (2 panels, centered)
  let bottomRowX = (canvasWidth - 2 * panelW - gap) / 2;
  let bottomY = startY + panelH + gap;
  drawPanel(3, bottomRowX, bottomY, panelW, panelH);
  drawPanel(4, bottomRowX + panelW + gap, bottomY, panelW, panelH);

  // Footer
  fill('#757575');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  textStyle(ITALIC);
  text('These statements are accepted as true without proof. Click panels for details.', canvasWidth / 2, canvasHeight - 10);
  textStyle(NORMAL);
}

function drawPanel(index, x, y, w, h) {
  let isHovered = (hoveredPanel === index);
  let isSelected = (selectedPanel === index);

  // Panel background
  if (isSelected) {
    fill('#E3F2FD');
    stroke('#1976D2');
    strokeWeight(3);
  } else if (isHovered) {
    fill('#FFF8E1');
    stroke('#FFA000');
    strokeWeight(2);
  } else {
    fill('#FFFFFF');
    stroke('#E0E0E0');
    strokeWeight(1);
  }
  rect(x, y, w, h, 8);

  // Draw visualization based on index
  push();
  translate(x, y);

  switch(index) {
    case 0: drawTwoPointsPostulate(w, h, isHovered || isSelected); break;
    case 1: drawPointsInPlanePostulate(w, h, isHovered || isSelected); break;
    case 2: drawThreePointsPostulate(w, h, isHovered || isSelected); break;
    case 3: drawIntersectionPostulate(w, h, isHovered || isSelected); break;
    case 4: drawParallelPostulate(w, h, isHovered || isSelected); break;
  }
  pop();

  // Panel title
  noStroke();
  fill('#424242');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(postulates[index].title, x + w / 2, y + 8);
  textStyle(NORMAL);

  // Annotation at bottom
  fill(isHovered || isSelected ? '#E65100' : '#757575');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text(postulates[index].annotation, x + w / 2, y + h - 5);
}

function drawTwoPointsPostulate(w, h, highlight) {
  let cx = w / 2;
  let cy = h / 2 + 10;

  // Line
  stroke(highlight ? '#1976D2' : '#64B5F6');
  strokeWeight(3);
  line(20, cy, w - 20, cy);

  // Points
  noStroke();
  fill('#E53935');
  circle(cx - 50, cy, 14);
  circle(cx + 50, cy, 14);

  // Labels
  fill('#424242');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('A', cx - 50, cy - 12);
  text('B', cx + 50, cy - 12);

  // Extension marks
  stroke('#9E9E9E');
  strokeWeight(1);
  line(15, cy - 5, 15, cy + 5);
  line(w - 15, cy - 5, w - 15, cy + 5);
}

function drawPointsInPlanePostulate(w, h, highlight) {
  let cx = w / 2;
  let cy = h / 2 + 5;

  // Plane (parallelogram)
  fill(highlight ? '#C8E6C9' : '#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  quad(30, cy + 30, w - 50, cy + 30, w - 30, cy - 30, 50, cy - 30);

  // Grid lines on plane
  stroke('#A5D6A7');
  strokeWeight(1);
  for (let i = 1; i < 4; i++) {
    let t = i / 4;
    let x1 = lerp(30, 50, t);
    let x2 = lerp(w - 50, w - 30, t);
    let y1 = lerp(cy + 30, cy - 30, t);
    line(x1, y1, x2, y1);
  }

  // Line on plane
  stroke('#2E7D32');
  strokeWeight(3);
  line(60, cy, w - 60, cy);

  // Points
  noStroke();
  fill('#4CAF50');
  circle(80, cy, 12);
  circle(w - 80, cy, 12);

  fill('#263238');
  textSize(11);
  textAlign(CENTER, TOP);
  text('P', 80, cy + 10);
  text('Q', w - 80, cy + 10);
}

function drawThreePointsPostulate(w, h, highlight) {
  let cx = w / 2;
  let cy = h / 2 + 10;

  // Plane (triangle-ish)
  fill(highlight ? '#E1BEE7' : '#F3E5F5');
  stroke('#7B1FA2');
  strokeWeight(2);
  beginShape();
  vertex(20, cy + 40);
  vertex(w - 20, cy + 30);
  vertex(cx + 20, cy - 50);
  vertex(cx - 60, cy - 40);
  endShape(CLOSE);

  // Dashed triangle connecting points
  stroke('#9C27B0');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  triangle(cx, cy - 30, cx - 60, cy + 20, cx + 60, cy + 20);
  drawingContext.setLineDash([]);

  // Points
  noStroke();
  fill('#7B1FA2');
  circle(cx, cy - 30, 12);
  circle(cx - 60, cy + 20, 12);
  circle(cx + 60, cy + 20, 12);

  fill('#263238');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('R', cx, cy - 38);
  textAlign(RIGHT, CENTER);
  text('S', cx - 68, cy + 20);
  textAlign(LEFT, CENTER);
  text('T', cx + 68, cy + 20);
}

function drawIntersectionPostulate(w, h, highlight) {
  let cx = w / 2;
  let cy = h / 2 + 10;

  // Two lines
  stroke('#E53935');
  strokeWeight(3);
  line(30, cy - 40, w - 30, cy + 40);

  stroke('#1976D2');
  strokeWeight(3);
  line(30, cy + 40, w - 30, cy - 40);

  // Intersection point
  noStroke();
  fill('#FFEB3B');
  circle(cx, cy, 20);
  fill('#F57F17');
  circle(cx, cy, 10);

  fill('#263238');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('X', cx, cy - 12);
  textStyle(NORMAL);
}

function drawParallelPostulate(w, h, highlight) {
  let cx = w / 2;
  let cy = h / 2 + 10;

  // Main line L
  stroke('#1976D2');
  strokeWeight(3);
  line(20, cy + 30, w - 20, cy + 30);

  // Label L
  fill('#1565C0');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('L', 25, cy + 45);

  // Point P above line
  noStroke();
  fill('#E53935');
  circle(cx, cy - 30, 14);
  fill('#263238');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('P', cx, cy - 42);

  // Parallel line through P (dashed)
  stroke('#E53935');
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  line(40, cy - 30, w - 40, cy - 30);
  drawingContext.setLineDash([]);

  // Rejected non-parallel lines (gray, crossed out)
  stroke('#BDBDBD');
  strokeWeight(1);
  line(cx, cy - 30, cx - 60, cy + 30);
  line(cx, cy - 30, cx + 60, cy + 30);

  // X marks on rejected lines
  stroke('#F44336');
  strokeWeight(2);
  let mx1 = cx - 30, my1 = cy;
  line(mx1 - 5, my1 - 5, mx1 + 5, my1 + 5);
  line(mx1 - 5, my1 + 5, mx1 + 5, my1 - 5);

  let mx2 = cx + 30;
  line(mx2 - 5, my1 - 5, mx2 + 5, my1 + 5);
  line(mx2 - 5, my1 + 5, mx2 + 5, my1 - 5);
}

function getHoveredPanel() {
  let panelW = 240;
  let panelH = 180;
  let gap = 20;
  let startY = 55;

  let topRowX = (canvasWidth - 3 * panelW - 2 * gap) / 2;
  let bottomRowX = (canvasWidth - 2 * panelW - gap) / 2;
  let bottomY = startY + panelH + gap;

  let panels = [
    { x: topRowX, y: startY },
    { x: topRowX + panelW + gap, y: startY },
    { x: topRowX + 2 * (panelW + gap), y: startY },
    { x: bottomRowX, y: bottomY },
    { x: bottomRowX + panelW + gap, y: bottomY }
  ];

  for (let i = 0; i < panels.length; i++) {
    if (mouseX > panels[i].x && mouseX < panels[i].x + panelW &&
        mouseY > panels[i].y && mouseY < panels[i].y + panelH) {
      return i;
    }
  }
  return -1;
}

function mousePressed() {
  if (hoveredPanel >= 0) {
    selectedPanel = (selectedPanel === hoveredPanel) ? -1 : hoveredPanel;
  }
}

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
