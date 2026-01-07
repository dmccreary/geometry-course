// Right Angles in Real-World Contexts
// Interactive 2x2 grid showing right angles in everyday objects

let canvasWidth = 800;
let drawHeight = 500;
let canvasHeight = drawHeight;

let hoveredPanel = -1; // 0-3 for each panel

let panels = [
  {
    title: "Book Corner",
    description: "Every book corner has a 90° right angle for proper binding and stacking.",
    bgColor: "#E3F2FD"
  },
  {
    title: "Street Intersection",
    description: "Streets often meet at right angles, creating four 90° corners for safe navigation.",
    bgColor: "#E8F5E9"
  },
  {
    title: "Picture Frame",
    description: "Picture frames use right angles at every corner to hold the picture properly.",
    bgColor: "#FFF3E0"
  },
  {
    title: "Geometric Notation",
    description: "In geometry, we mark right angles with a small square at the vertex.",
    bgColor: "#F3E5F5"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('2x2 grid showing right angles in real-world contexts: book, intersection, frame, notation', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Right Angles in the Real World', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Hover over each panel to learn more', canvasWidth / 2, 38);

  // Check hover
  checkHover();

  // Draw 2x2 grid
  drawPanels();

  // Draw description box if hovering
  if (hoveredPanel >= 0) {
    drawDescription();
  }
}

function checkHover() {
  hoveredPanel = -1;

  let panelW = (canvasWidth - 60) / 2;
  let panelH = 180;
  let startY = 60;
  let gap = 15;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let px = 20 + col * (panelW + gap);
    let py = startY + row * (panelH + gap);

    if (mouseX > px && mouseX < px + panelW && mouseY > py && mouseY < py + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 60) / 2;
  let panelH = 180;
  let startY = 60;
  let gap = 15;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let px = 20 + col * (panelW + gap);
    let py = startY + row * (panelH + gap);
    let isHovered = (hoveredPanel === i);

    // Panel background
    fill(panels[i].bgColor);
    if (isHovered) {
      stroke('#1976D2');
      strokeWeight(3);
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = '#1976D2';
    } else {
      stroke('#BDBDBD');
      strokeWeight(1);
    }
    rect(px, py, panelW, panelH, 12);
    drawingContext.shadowBlur = 0;

    // Panel title
    noStroke();
    fill('#424242');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(panels[i].title, px + panelW / 2, py + 10);
    textStyle(NORMAL);

    // Draw the illustration for each panel
    if (i === 0) drawBookCorner(px, py, panelW, panelH);
    else if (i === 1) drawStreetIntersection(px, py, panelW, panelH);
    else if (i === 2) drawPictureFrame(px, py, panelW, panelH);
    else if (i === 3) drawGeometricNotation(px, py, panelW, panelH);
  }
}

function drawBookCorner(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 15;

  // Book pages (stacked rectangles)
  fill('#FFEB3B');
  stroke('#FBC02D');
  strokeWeight(2);

  // Multiple page layers
  for (let i = 3; i >= 0; i--) {
    rect(cx - 50 + i * 2, cy - 40 + i * 2, 80, 60, 2);
  }

  // Book cover edge
  stroke('#5D4037');
  strokeWeight(3);
  line(cx - 50, cy - 40, cx - 50, cy + 20);
  line(cx - 50, cy + 20, cx + 30, cy + 20);

  // Right angle marker
  stroke('#D32F2F');
  strokeWeight(2);
  noFill();
  rect(cx - 50, cy + 5, 15, 15);

  // Label
  fill('#D32F2F');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('90°', cx - 35, cy + 25);
}

function drawStreetIntersection(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 15;

  // Streets (gray rectangles)
  fill('#9E9E9E');
  noStroke();
  rect(cx - 15, cy - 50, 30, 100); // Vertical street
  rect(cx - 60, cy - 15, 120, 30); // Horizontal street

  // Street markings (dashed lines)
  stroke('#FFFFFF');
  strokeWeight(2);
  drawingContext.setLineDash([8, 8]);
  line(cx, cy - 50, cx, cy + 50);
  line(cx - 60, cy, cx + 60, cy);
  drawingContext.setLineDash([]);

  // Right angle markers at each corner
  stroke('#D32F2F');
  strokeWeight(2);
  noFill();

  // Four right angle squares
  rect(cx + 15, cy - 15, 10, 10);
  rect(cx - 25, cy - 15, 10, 10);
  rect(cx + 15, cy + 5, 10, 10);
  rect(cx - 25, cy + 5, 10, 10);

  // Label
  fill('#D32F2F');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('4 right angles', cx, cy + 40);
}

function drawPictureFrame(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 15;

  // Outer frame
  fill('#8D6E63');
  stroke('#5D4037');
  strokeWeight(3);
  rect(cx - 55, cy - 40, 110, 75, 3);

  // Inner frame (picture area)
  fill('#E8F5E9');
  stroke('#A5D6A7');
  strokeWeight(1);
  rect(cx - 45, cy - 30, 90, 55);

  // Simple mountain scenery inside
  fill('#81C784');
  noStroke();
  triangle(cx - 30, cy + 15, cx - 10, cy - 15, cx + 10, cy + 15);
  triangle(cx, cy + 15, cx + 20, cy - 10, cx + 40, cy + 15);

  // Sun
  fill('#FFEB3B');
  circle(cx + 30, cy - 20, 15);

  // Right angle marker at corner
  stroke('#D32F2F');
  strokeWeight(2);
  noFill();
  rect(cx - 55, cy - 40, 12, 12);

  // Label
  fill('#D32F2F');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('90°', cx - 40, cy - 55);
}

function drawGeometricNotation(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 20;
  let rayLen = 60;

  // Horizontal ray
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy);

  // Vertical ray
  stroke('#388E3C');
  strokeWeight(3);
  line(cx, cy, cx, cy - rayLen);

  // Right angle square marker
  stroke('#D32F2F');
  strokeWeight(2);
  noFill();
  rect(cx, cy - 15, 15, 15);

  // Vertex point
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 10);

  // Labels
  textSize(14);
  textStyle(BOLD);

  fill('#FF9800');
  textAlign(RIGHT, TOP);
  text('B', cx - 8, cy + 5);

  fill('#1976D2');
  textAlign(LEFT, TOP);
  text('A', cx + rayLen + 5, cy - 5);

  fill('#388E3C');
  textAlign(LEFT, BOTTOM);
  text('C', cx + 8, cy - rayLen - 5);

  textStyle(NORMAL);

  // Notation label
  fill('#424242');
  textSize(12);
  textAlign(CENTER, TOP);
  text('∠ABC = 90°', cx + 20, cy + 25);
}

function drawDescription() {
  let descY = drawHeight - 55;
  let descW = canvasWidth - 40;

  fill(255);
  stroke('#1976D2');
  strokeWeight(2);
  rect(20, descY, descW, 45, 8);

  noStroke();
  fill('#1565C0');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(panels[hoveredPanel].title + ': ', 30, descY + 22);

  textStyle(NORMAL);
  fill('#424242');
  let titleWidth = textWidth(panels[hoveredPanel].title + ': ');
  text(panels[hoveredPanel].description, 30 + titleWidth, descY + 22);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 650);
  }
}
