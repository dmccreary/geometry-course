// Right Angles in Real-World Contexts
// Interactive 2x2 grid showing right angles in everyday objects
// Learning Objective: Students will recognize right angles in everyday contexts (Bloom's: Applying)

let canvasWidth = 800;
let drawHeight = 600;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let panels = [
  {
    title: "Book Corner",
    description: "Every book corner forms a perfect 90° angle for proper binding and stacking.",
    bgColor: "#E3F2FD" // light blue
  },
  {
    title: "Street Intersection",
    description: "Streets often meet at right angles, forming four 90° corners for safe navigation.",
    bgColor: "#E8F5E9" // light green
  },
  {
    title: "Picture Frame",
    description: "Picture frames use right angles at every corner to hold artwork squarely.",
    bgColor: "#FFF3E0" // light orange
  },
  {
    title: "Geometric Notation: ∠ABC = 90°",
    description: "In geometry, right angles are marked with a small square symbol at the vertex.",
    bgColor: "#F3E5F5" // light purple
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('2x2 grid showing right angles in real-world contexts: book corner, street intersection, picture frame, and geometric notation', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Overall title
  fill('#1565C0');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Right Angles in the Real World', canvasWidth / 2, 12);
  textStyle(NORMAL);

  fill('#757575');
  textSize(13);
  text('Hover over each panel to learn more', canvasWidth / 2, 42);

  // Check hover state
  checkHover();

  // Draw the 2x2 grid
  drawPanels();

  // Draw description tooltip at bottom if hovering
  if (hoveredPanel >= 0) {
    drawDescription();
  }
}

function checkHover() {
  hoveredPanel = -1;
  let metrics = getPanelMetrics();

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let px = metrics.marginX + col * (metrics.panelW + metrics.gap);
    let py = metrics.startY + row * (metrics.panelH + metrics.gap);

    if (mouseX > px && mouseX < px + metrics.panelW &&
        mouseY > py && mouseY < py + metrics.panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function getPanelMetrics() {
  let gap = 16;
  let marginX = 20;
  let startY = 62;
  let panelW = (canvasWidth - 2 * marginX - gap) / 2;
  let panelH = 230;
  return { gap, marginX, startY, panelW, panelH };
}

function drawPanels() {
  let m = getPanelMetrics();

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let px = m.marginX + col * (m.panelW + m.gap);
    let py = m.startY + row * (m.panelH + m.gap);
    let isHovered = (hoveredPanel === i);

    // Panel background with shadow on hover
    if (isHovered) {
      drawingContext.shadowBlur = 12;
      drawingContext.shadowColor = 'rgba(25, 118, 210, 0.4)';
      stroke('#1976D2');
      strokeWeight(3);
    } else {
      drawingContext.shadowBlur = 4;
      drawingContext.shadowColor = 'rgba(0,0,0,0.1)';
      stroke('#BDBDBD');
      strokeWeight(1);
    }
    fill(panels[i].bgColor);
    rect(px, py, m.panelW, m.panelH, 12);
    drawingContext.shadowBlur = 0;

    // Panel title
    noStroke();
    fill('#37474F');
    textSize(15);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(panels[i].title, px + m.panelW / 2, py + 10);
    textStyle(NORMAL);

    // Draw illustration
    push();
    if (i === 0) drawBookCorner(px, py, m.panelW, m.panelH);
    else if (i === 1) drawStreetIntersection(px, py, m.panelW, m.panelH);
    else if (i === 2) drawPictureFrame(px, py, m.panelW, m.panelH);
    else if (i === 3) drawGeometricNotation(px, py, m.panelW, m.panelH);
    pop();
  }
}

// Panel 1: Book Corner
function drawBookCorner(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 20;

  // Book body (closed book, slightly tilted)
  // Spine
  stroke('#5D4037');
  strokeWeight(3);
  fill('#8D6E63');
  // Back cover
  beginShape();
  vertex(cx - 65, cy - 55);
  vertex(cx + 35, cy - 55);
  vertex(cx + 35, cy + 35);
  vertex(cx - 65, cy + 35);
  endShape(CLOSE);

  // Page edges (white block)
  fill('#FFF9C4');
  stroke('#E0E0E0');
  strokeWeight(1);
  beginShape();
  vertex(cx - 60, cy - 50);
  vertex(cx + 30, cy - 50);
  vertex(cx + 30, cy + 30);
  vertex(cx - 60, cy + 30);
  endShape(CLOSE);

  // Front cover
  fill('#1976D2');
  stroke('#0D47A1');
  strokeWeight(2);
  beginShape();
  vertex(cx - 65, cy - 55);
  vertex(cx + 35, cy - 55);
  vertex(cx + 35, cy + 35);
  vertex(cx - 65, cy + 35);
  endShape(CLOSE);

  // Book text lines (decorative)
  stroke('#BBDEFB');
  strokeWeight(1);
  for (let i = 0; i < 3; i++) {
    line(cx - 45, cy - 30 + i * 15, cx + 15, cy - 30 + i * 15);
  }

  // Highlight the corner edges
  stroke('#212121');
  strokeWeight(3);
  // Bottom-left corner: vertical edge
  line(cx - 65, cy + 35, cx - 65, cy + 5);
  // Bottom-left corner: horizontal edge
  line(cx - 65, cy + 35, cx - 35, cy + 35);

  // Right angle marker (red square at corner)
  stroke('#D32F2F');
  strokeWeight(2.5);
  noFill();
  let sq = 16;
  line(cx - 65, cy + 35 - sq, cx - 65 + sq, cy + 35 - sq);
  line(cx - 65 + sq, cy + 35 - sq, cx - 65 + sq, cy + 35);

  // 90 degree label
  fill('#D32F2F');
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);
  text('90°', cx - 65 + sq + 4, cy + 35 - sq + 2);
  textStyle(NORMAL);
}

// Panel 2: Street Intersection (aerial view)
function drawStreetIntersection(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 20;
  let streetW = 40;
  let streetLen = 80;

  // Grass background
  fill('#A5D6A7');
  noStroke();
  rect(px + 10, py + 30, pw - 20, ph - 40, 8);

  // Vertical street
  fill('#78909C');
  noStroke();
  rect(cx - streetW / 2, cy - streetLen, streetW, streetLen * 2);

  // Horizontal street
  rect(cx - streetLen, cy - streetW / 2, streetLen * 2, streetW);

  // Center intersection
  fill('#78909C');
  rect(cx - streetW / 2, cy - streetW / 2, streetW, streetW);

  // Dashed center lines
  stroke('#FFEB3B');
  strokeWeight(2);
  drawingContext.setLineDash([6, 6]);
  // Vertical center line (above and below intersection)
  line(cx, cy - streetLen, cx, cy - streetW / 2);
  line(cx, cy + streetW / 2, cx, cy + streetLen);
  // Horizontal center line
  line(cx - streetLen, cy, cx - streetW / 2, cy);
  line(cx + streetW / 2, cy, cx + streetLen, cy);
  drawingContext.setLineDash([]);

  // Right angle markers at the four corners of the intersection
  stroke('#D32F2F');
  strokeWeight(2.5);
  noFill();
  let sq = 10;

  // Top-right corner
  line(cx + streetW / 2, cy - streetW / 2 + sq, cx + streetW / 2 + sq, cy - streetW / 2 + sq);
  line(cx + streetW / 2 + sq, cy - streetW / 2 + sq, cx + streetW / 2 + sq, cy - streetW / 2);

  // Top-left corner
  line(cx - streetW / 2, cy - streetW / 2 + sq, cx - streetW / 2 - sq, cy - streetW / 2 + sq);
  line(cx - streetW / 2 - sq, cy - streetW / 2 + sq, cx - streetW / 2 - sq, cy - streetW / 2);

  // Bottom-right corner
  line(cx + streetW / 2, cy + streetW / 2 - sq, cx + streetW / 2 + sq, cy + streetW / 2 - sq);
  line(cx + streetW / 2 + sq, cy + streetW / 2 - sq, cx + streetW / 2 + sq, cy + streetW / 2);

  // Bottom-left corner
  line(cx - streetW / 2, cy + streetW / 2 - sq, cx - streetW / 2 - sq, cy + streetW / 2 - sq);
  line(cx - streetW / 2 - sq, cy + streetW / 2 - sq, cx - streetW / 2 - sq, cy + streetW / 2);

  // Label
  fill('#D32F2F');
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('4 right angles (90° each)', cx, cy + streetLen + 4);
  textStyle(NORMAL);
}

// Panel 3: Picture Frame Corner
function drawPictureFrame(px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 18;
  let frameW = 130;
  let frameH = 95;
  let border = 14;

  // Frame outer
  fill('#8D6E63');
  stroke('#5D4037');
  strokeWeight(2);
  rect(cx - frameW / 2, cy - frameH / 2, frameW, frameH, 3);

  // Frame inner border detail
  fill('#A1887F');
  noStroke();
  rect(cx - frameW / 2 + 4, cy - frameH / 2 + 4, frameW - 8, frameH - 8, 2);

  // Inner picture area
  fill('#E3F2FD');
  stroke('#90CAF9');
  strokeWeight(1);
  rect(cx - frameW / 2 + border, cy - frameH / 2 + border,
       frameW - 2 * border, frameH - 2 * border);

  // Simple landscape inside the frame
  // Sky is already the background
  // Mountains
  fill('#81C784');
  noStroke();
  triangle(cx - 35, cy + frameH / 2 - border - 5,
           cx - 15, cy - frameH / 2 + border + 10,
           cx + 5, cy + frameH / 2 - border - 5);
  fill('#66BB6A');
  triangle(cx + 5, cy + frameH / 2 - border - 5,
           cx + 25, cy - frameH / 2 + border + 18,
           cx + 50, cy + frameH / 2 - border - 5);

  // Sun
  fill('#FFD54F');
  noStroke();
  circle(cx + 38, cy - frameH / 2 + border + 12, 16);

  // Highlight top-left corner of frame
  stroke('#212121');
  strokeWeight(3);
  let cornerX = cx - frameW / 2;
  let cornerY = cy - frameH / 2;
  line(cornerX, cornerY, cornerX + 35, cornerY); // top edge
  line(cornerX, cornerY, cornerX, cornerY + 35); // left edge

  // Right angle marker at top-left corner
  stroke('#D32F2F');
  strokeWeight(2.5);
  noFill();
  let sq = 14;
  line(cornerX + sq, cornerY, cornerX + sq, cornerY + sq);
  line(cornerX + sq, cornerY + sq, cornerX, cornerY + sq);

  // 90 degree label
  fill('#D32F2F');
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('90°', cornerX + sq + 5, cornerY + sq + 2);
  textStyle(NORMAL);
}

// Panel 4: Geometric Notation
function drawGeometricNotation(px, py, pw, ph) {
  let cx = px + pw / 2 - 10;
  let cy = py + ph / 2 + 25;
  let rayLen = 80;

  // Horizontal ray (BA direction) -> to the right
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy);
  // Arrowhead on horizontal ray
  fill('#1976D2');
  noStroke();
  triangle(cx + rayLen, cy, cx + rayLen - 8, cy - 4, cx + rayLen - 8, cy + 4);

  // Vertical ray (BC direction) -> upward
  stroke('#388E3C');
  strokeWeight(3);
  line(cx, cy, cx, cy - rayLen);
  // Arrowhead on vertical ray
  fill('#388E3C');
  noStroke();
  triangle(cx, cy - rayLen, cx - 4, cy - rayLen + 8, cx + 4, cy - rayLen + 8);

  // Right angle square marker (red)
  stroke('#D32F2F');
  strokeWeight(2.5);
  noFill();
  let sq = 18;
  line(cx, cy - sq, cx + sq, cy - sq);
  line(cx + sq, cy - sq, cx + sq, cy);

  // Small filled red square dot at marker corner
  fill('#D32F2F');
  noStroke();
  circle(cx + sq / 2, cy - sq / 2, 4);

  // Vertex point B (orange dot)
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Point labels
  textSize(16);
  textStyle(BOLD);

  // B at vertex
  fill('#FF9800');
  textAlign(RIGHT, TOP);
  text('B', cx - 10, cy + 4);

  // A at end of horizontal ray
  fill('#1976D2');
  textAlign(LEFT, CENTER);
  text('A', cx + rayLen + 8, cy);

  // C at end of vertical ray
  fill('#388E3C');
  textAlign(CENTER, BOTTOM);
  text('C', cx, cy - rayLen - 10);

  textStyle(NORMAL);

  // Notation text below
  fill('#424242');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('∠ABC = 90°', cx + 30, cy + 22);
  textStyle(NORMAL);

  // Small note
  fill('#757575');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Right angle marked with □ symbol', cx + 30, cy + 44);
}

function drawDescription() {
  let descY = drawHeight - 58;
  let descW = canvasWidth - 40;

  // Semi-transparent background
  fill(255, 255, 255, 240);
  stroke('#1976D2');
  strokeWeight(2);
  rect(20, descY, descW, 48, 10);

  noStroke();
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  let titleText = panels[hoveredPanel].title + ':  ';
  text(titleText, 32, descY + 24);

  textStyle(NORMAL);
  fill('#424242');
  textSize(13);
  let titleW = textWidth(titleText);
  text(panels[hoveredPanel].description, 32 + titleW, descY + 24);
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
