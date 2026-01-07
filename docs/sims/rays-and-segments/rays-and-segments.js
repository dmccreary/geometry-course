// Rays and Segments Comparison Diagram
// A side-by-side comparison of rays and line segments

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 400;
let canvasHeight = drawHeight;
let margin = 20;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('A side-by-side comparison diagram showing the differences between rays and line segments', LABEL);

  noLoop(); // Static diagram, no animation needed
}

function draw() {
  updateCanvasSize();

  // Calculate panel widths based on canvas width
  let panelWidth = canvasWidth / 2;

  // Left Panel: Rays (light blue gradient)
  drawRaysPanel(0, 0, panelWidth, drawHeight);

  // Right Panel: Line Segments (light green gradient)
  drawSegmentsPanel(panelWidth, 0, panelWidth, drawHeight);

  // Middle Divider
  drawDivider(panelWidth);
}

function drawRaysPanel(x, y, w, h) {
  // Light blue gradient background
  for (let i = 0; i < h; i++) {
    let inter = map(i, 0, h, 0, 1);
    let c = lerpColor(color('#E3F2FD'), color('#BBDEFB'), inter);
    stroke(c);
    line(x, y + i, x + w, y + i);
  }

  noStroke();

  // Title
  fill(0);
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Rays', x + w/2, y + 15);
  textStyle(NORMAL);

  // Ray 1: Horizontal ray AB pointing right
  let ray1StartX = x + 40;
  let ray1Y = y + 120;
  let ray1EndX = x + w - 30;

  // Draw the ray line
  stroke(0);
  strokeWeight(2);
  line(ray1StartX, ray1Y, ray1EndX, ray1Y);

  // Arrow on right end
  drawArrow(ray1EndX, ray1Y, 0);

  // Endpoint A (red dot)
  noStroke();
  fill('#D32F2F');
  circle(ray1StartX, ray1Y, 16);

  // Point B (blue dot) midway
  fill('#1976D2');
  let pointBX = ray1StartX + (ray1EndX - ray1StartX) * 0.5;
  circle(pointBX, ray1Y, 12);

  // Labels
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text('A', ray1StartX, ray1Y + 12);
  text('B', pointBX, ray1Y + 12);

  // Ray label with arrow notation
  textSize(18);
  textAlign(LEFT, CENTER);
  text('Ray AB', x + w - 80, ray1Y - 25);
  drawSmallArrow(x + w - 80, ray1Y - 30, 50);

  // Ray 2: 45-degree angle CD pointing up-right
  let ray2StartX = x + 50;
  let ray2StartY = y + 280;
  let ray2Length = 180;
  let ray2EndX = ray2StartX + ray2Length * cos(-PI/4);
  let ray2EndY = ray2StartY + ray2Length * sin(-PI/4);

  // Draw the ray line
  stroke(0);
  strokeWeight(2);
  line(ray2StartX, ray2StartY, ray2EndX, ray2EndY);

  // Arrow on up-right end
  drawArrow(ray2EndX, ray2EndY, -PI/4);

  // Endpoint C (red dot)
  noStroke();
  fill('#D32F2F');
  circle(ray2StartX, ray2StartY, 16);

  // Point D (blue dot) midway
  fill('#1976D2');
  let pointDX = ray2StartX + (ray2EndX - ray2StartX) * 0.5;
  let pointDY = ray2StartY + (ray2EndY - ray2StartY) * 0.5;
  circle(pointDX, pointDY, 12);

  // Labels
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text('C', ray2StartX - 15, ray2StartY + 5);
  text('D', pointDX + 10, pointDY - 20);

  // Ray label
  textSize(18);
  text('Ray CD', ray2EndX - 30, ray2EndY - 25);
  drawSmallArrow(ray2EndX - 30, ray2EndY - 30, 40);

  // Callout boxes
  drawCallout(x + w/2 - 60, y + 160, 'Starts at an endpoint', ray1StartX + 30, ray1Y);
  drawCallout(x + w/2 + 20, y + 85, 'Extends infinitely', ray1EndX - 40, ray1Y);

  // Bottom annotation
  fill(0);
  textSize(16);
  textAlign(CENTER, BOTTOM);
  textStyle(ITALIC);
  text('One endpoint + infinite extension', x + w/2, y + h - 15);
  textStyle(NORMAL);
}

function drawSegmentsPanel(x, y, w, h) {
  // Light green gradient background
  for (let i = 0; i < h; i++) {
    let inter = map(i, 0, h, 0, 1);
    let c = lerpColor(color('#E8F5E9'), color('#C8E6C9'), inter);
    stroke(c);
    line(x, y + i, x + w, y + i);
  }

  noStroke();

  // Title
  fill(0);
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Line Segments', x + w/2, y + 15);
  textStyle(NORMAL);

  // Segment 1: Horizontal PQ
  let seg1StartX = x + 50;
  let seg1Y = y + 120;
  let seg1EndX = x + w - 50;

  // Draw the segment line (no arrows)
  stroke(0);
  strokeWeight(2);
  line(seg1StartX, seg1Y, seg1EndX, seg1Y);

  // Endpoints P and Q (purple dots)
  noStroke();
  fill('#7B1FA2');
  circle(seg1StartX, seg1Y, 16);
  circle(seg1EndX, seg1Y, 16);

  // Labels
  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text('P', seg1StartX, seg1Y + 12);
  text('Q', seg1EndX, seg1Y + 12);

  // Segment label with overline notation
  textSize(18);
  textAlign(CENTER, CENTER);
  let labelX = x + w/2;
  text('PQ', labelX, seg1Y - 35);
  // Draw overline
  stroke(0);
  strokeWeight(1);
  line(labelX - 15, seg1Y - 45, labelX + 15, seg1Y - 45);

  // Length measurement
  noStroke();
  fill('#1565C0');
  textSize(14);
  text('5 cm', labelX, seg1Y - 18);

  // Segment 2: Vertical RS
  let seg2X = x + w/2;
  let seg2StartY = y + 200;
  let seg2EndY = y + 320;

  // Draw the segment line (no arrows)
  stroke(0);
  strokeWeight(2);
  line(seg2X, seg2StartY, seg2X, seg2EndY);

  // Endpoints R and S (purple dots)
  noStroke();
  fill('#7B1FA2');
  circle(seg2X, seg2StartY, 16);
  circle(seg2X, seg2EndY, 16);

  // Labels
  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('R', seg2X + 12, seg2StartY);
  text('S', seg2X + 12, seg2EndY);

  // Segment label with overline notation
  textSize(18);
  textAlign(LEFT, CENTER);
  text('RS', seg2X + 30, (seg2StartY + seg2EndY)/2);
  // Draw overline
  stroke(0);
  strokeWeight(1);
  line(seg2X + 30, (seg2StartY + seg2EndY)/2 - 12, seg2X + 52, (seg2StartY + seg2EndY)/2 - 12);

  // Length measurement
  noStroke();
  fill('#1565C0');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('3 cm', seg2X + 55, (seg2StartY + seg2EndY)/2);

  // Callout boxes
  drawCallout(x + 50, y + 165, 'Has two endpoints', seg1StartX + 50, seg1Y);
  drawCallout(x + w - 130, y + 250, 'Measurable length', seg2X + 60, (seg2StartY + seg2EndY)/2);

  // Bottom annotation
  fill(0);
  textSize(16);
  textAlign(CENTER, BOTTOM);
  textStyle(ITALIC);
  text('Two endpoints + finite length', x + w/2, y + h - 15);
  textStyle(NORMAL);
}

function drawDivider(x) {
  // Vertical dashed line
  stroke(100);
  strokeWeight(2);
  drawingContext.setLineDash([8, 8]);
  line(x, 50, x, drawHeight - 50);
  drawingContext.setLineDash([]);

  // "vs." label
  noStroke();
  fill(255);
  circle(x, drawHeight/2, 40);
  fill(80);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('vs.', x, drawHeight/2);
  textStyle(NORMAL);
}

function drawArrow(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  fill(0);
  stroke(0);
  strokeWeight(2);
  let arrowSize = 12;
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
  pop();
}

function drawSmallArrow(x, y, width) {
  // Draw a small arrow above text to indicate ray notation
  stroke(0);
  strokeWeight(1);
  line(x, y, x + width, y);
  // Arrow head
  line(x + width, y, x + width - 5, y - 3);
  line(x + width, y, x + width - 5, y + 3);
}

function drawCallout(x, y, text_content, targetX, targetY) {
  // Draw a callout box with pointer
  let boxWidth = 130;
  let boxHeight = 30;

  // Box
  fill(255, 255, 255, 230);
  stroke(150);
  strokeWeight(1);
  rect(x, y, boxWidth, boxHeight, 5);

  // Text
  noStroke();
  fill(50);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(text_content, x + boxWidth/2, y + boxHeight/2);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 400); // Minimum width
  }
}
