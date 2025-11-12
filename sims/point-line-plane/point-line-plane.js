// Point, Line, Plane - The Three Undefined Terms of Geometry
// This MicroSim displays a visual diagram of the three fundamental undefined terms

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 16;

// Panel dimensions (calculated dynamically)
let panelWidth;
let panelHeight = 380;
let panelY = 60;
let minCanvasWidth = 600;  // Minimum width for readability

// Control
let showAnnotationsCheckbox;
let showAnnotations = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var main = document.querySelector('main');
  canvas.parent(main);

  // Create checkbox for showing/hiding annotations
  showAnnotationsCheckbox = createCheckbox(' Show Annotations', true);
  showAnnotationsCheckbox.position(20, drawHeight + 15);
  showAnnotationsCheckbox.style('font-size', '16px');
  showAnnotationsCheckbox.changed(() => {
    showAnnotations = showAnnotationsCheckbox.checked();
  });

  describe('Diagram showing the three core concepts of geometry: point, line, and plane with their visual representations and properties', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate panel width dynamically (30% of canvas width each, with spacing)
  let spacing = canvasWidth * 0.05;  // 5% spacing
  panelWidth = (canvasWidth - spacing * 4) / 3;  // Divide remaining space by 3 panels

  // Calculate panel positions based on canvas width
  let panel1X = spacing;
  let panel2X = spacing * 2 + panelWidth;
  let panel3X = spacing * 3 + panelWidth * 2;

  // Main drawing area background
  fill('white');
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  textSize(28);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('The Three Core Concepts of Geometry', canvasWidth / 2, 15);
  textStyle(NORMAL);

  // Panel 1: Point
  drawPointPanel(panel1X, panelY);

  // Panel 2: Line
  drawLinePanel(panel2X, panelY);

  // Panel 3: Plane
  drawPlanePanel(panel3X, panelY);

  // Footer note
  textSize(12);
  textAlign(CENTER, TOP);
  fill('black');
  let footerY = panelY + panelHeight + 20;
  text('These terms are "core" because they\'re so fundamental that we', canvasWidth / 2, footerY);
  text('understand them through experience rather than formal definition.', canvasWidth / 2, footerY + 15);

  // Reset text defaults
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
}

function drawPointPanel(x, y) {
  // Background
  fill('#E3F2FD');
  stroke('silver');
  strokeWeight(2);
  rect(x, y, panelWidth, panelHeight);

  // Title
  fill('black');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Point', x + panelWidth / 2, y + 10);
  textStyle(NORMAL);

  // Main point A
  fill('red');
  noStroke();
  circle(x + panelWidth / 2, y + 100, 8);

  // Label for main point
  fill('black');
  textSize(16);
  textStyle(BOLD);
  text('Point A', x + panelWidth / 2, y + 125);
  textStyle(NORMAL);

  if (showAnnotations) {
    // Callout text
    textSize(14);
    textAlign(CENTER);
    text('Has no size—', x + panelWidth / 2, y + 160);
    text('only position', x + panelWidth / 2, y + 180);
  }

  // Additional points (positioned relative to panel width)
  fill('red');
  circle(x + panelWidth * 0.18, y + 220, 6);
  circle(x + panelWidth * 0.64, y + 240, 6);
  circle(x + panelWidth * 0.43, y + 280, 6);
  circle(x + panelWidth * 0.79, y + 260, 6);

  // Labels for additional points
  fill('black');
  textSize(14);
  textAlign(CENTER);
  text('B', x + panelWidth * 0.18, y + 235);
  text('C', x + panelWidth * 0.64, y + 255);
  text('D', x + panelWidth * 0.43, y + 295);
  text('E', x + panelWidth * 0.79, y + 275);

  if (showAnnotations) {
    // Bottom annotation
    textSize(12);
    textAlign(CENTER);
    text('Named with', x + panelWidth / 2, y + panelHeight - 40);
    text('capital letters', x + panelWidth / 2, y + panelHeight - 25);
  }

  // Reset
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawLinePanel(x, y) {
  // Background
  fill('#E8F5E9');
  stroke('silver');
  strokeWeight(2);
  rect(x, y, panelWidth, panelHeight);

  // Title
  fill('black');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Line', x + panelWidth / 2, y + 10);
  textStyle(NORMAL);

  // Line with arrows
  stroke('blue');
  strokeWeight(3);
  let lineY = y + 100;
  let arrowSize = 10;

  // Draw line
  line(x + 20, lineY, x + panelWidth - 20, lineY);

  // Draw arrows
  // Left arrow
  fill('blue');
  push();
  translate(x + 20, lineY);
  rotate(PI);
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
  pop();

  // Right arrow
  push();
  translate(x + panelWidth - 20, lineY);
  triangle(0, 0, arrowSize, -arrowSize/2, arrowSize, arrowSize/2);
  pop();

  // Points on the line (positioned relative to panel width)
  fill('red');
  noStroke();
  let pointP = x + panelWidth * 0.29;
  let pointQ = x + panelWidth * 0.71;
  circle(pointP, lineY, 6);
  circle(pointQ, lineY, 6);

  // Point labels
  fill('black');
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('P', pointP, lineY + 10);
  text('Q', pointQ, lineY + 10);
  textStyle(NORMAL);

  // Line label
  textSize(16);
  text('Line PQ or PQ', x + panelWidth / 2, y + 145);

  // Draw line symbol above PQ
  push();
  stroke('black');
  strokeWeight(1);
  line(x + panelWidth / 2 + 55, y + 143, x + panelWidth / 2 + 80, y + 143);
  // Small arrows on the line symbol
  noStroke();
  fill('black');
  triangle(x + panelWidth / 2 + 55, y + 143, x + panelWidth / 2 + 52, y + 141, x + panelWidth / 2 + 52, y + 145);
  triangle(x + panelWidth / 2 + 80, y + 143, x + panelWidth / 2 + 83, y + 141, x + panelWidth / 2 + 83, y + 145);
  pop();

  if (showAnnotations) {
    // Callout text
    textSize(13);
    textAlign(CENTER);
    text('Extends infinitely in', x + panelWidth / 2, y + 190);
    text('both directions', x + panelWidth / 2, y + 210);

    text('Has no thickness—', x + panelWidth / 2, y + 240);
    text('only length', x + panelWidth / 2, y + 260);

    // Bottom annotation
    textSize(12);
    text('Named by any two', x + panelWidth / 2, y + panelHeight - 50);
    text('points on it', x + panelWidth / 2, y + panelHeight - 35);
  }

  // Reset
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  stroke('black');
  strokeWeight(1);
}

function drawPlanePanel(x, y) {
  // Background
  fill('#FFF9C4');
  stroke('silver');
  strokeWeight(2);
  rect(x, y, panelWidth, panelHeight);

  // Title
  fill('black');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Plane', x + panelWidth / 2, y + 10);
  textStyle(NORMAL);

  // Draw plane as parallelogram (3D perspective) - scaled to panel width
  let planeMargin = panelWidth * 0.14;
  let planeX1 = x + planeMargin;
  let planeY1 = y + 70;
  let planeWidth = panelWidth * 0.71;
  let planeHeight = 120;
  let perspectiveOffset = panelWidth * 0.11;

  // Plane with grid
  fill(138, 43, 226, 80); // Semi-transparent purple
  stroke('purple');
  strokeWeight(2);

  // Draw parallelogram
  beginShape();
  vertex(planeX1, planeY1);
  vertex(planeX1 + planeWidth, planeY1);
  vertex(planeX1 + planeWidth + perspectiveOffset, planeY1 + planeHeight);
  vertex(planeX1 + perspectiveOffset, planeY1 + planeHeight);
  endShape(CLOSE);

  // Grid lines
  stroke('purple');
  strokeWeight(1);
  // Horizontal lines
  for (let i = 1; i < 4; i++) {
    let yPos = planeY1 + (planeHeight / 4) * i;
    let xOffset = (perspectiveOffset / 4) * i;
    line(planeX1 + xOffset, yPos, planeX1 + planeWidth + xOffset, yPos);
  }
  // Vertical lines
  for (let i = 1; i < 4; i++) {
    let xStart = planeX1 + (planeWidth / 4) * i;
    let xEnd = planeX1 + perspectiveOffset + (planeWidth / 4) * i;
    line(xStart, planeY1, xEnd, planeY1 + planeHeight);
  }

  // Points on the plane (positioned relative to planeWidth)
  fill('red');
  noStroke();
  let pointX1 = planeX1 + planeWidth * 0.3;
  let pointY1 = planeY1 + 40;
  circle(pointX1, pointY1, 6);

  let pointX2 = planeX1 + planeWidth * 0.75;
  let pointY2 = planeY1 + 30;
  circle(pointX2, pointY2, 6);

  let pointX3 = planeX1 + planeWidth * 0.5 + perspectiveOffset/2;
  let pointY3 = planeY1 + 90;
  circle(pointX3, pointY3, 6);

  // Point labels
  fill('black');
  textSize(16);
  textAlign(CENTER);
  textStyle(BOLD);
  text('X', pointX1 - 12, pointY1);
  text('Y', pointX2 + 12, pointY2);
  text('Z', pointX3, pointY3 + 15);
  textStyle(NORMAL);

  // Plane label
  textSize(16);
  text('Plane XYZ', x + panelWidth / 2, y + 210);

  if (showAnnotations) {
    // Callout text
    textSize(13);
    text('Extends infinitely in', x + panelWidth / 2, y + 240);
    text('all directions', x + panelWidth / 2, y + 260);

    text('Has no thickness—only', x + panelWidth / 2, y + 290);
    text('length and width', x + panelWidth / 2, y + 310);

    // Bottom annotation
    textSize(12);
    text('Named by any three', x + panelWidth / 2, y + panelHeight - 50);
    text('non-collinear points', x + panelWidth / 2, y + panelHeight - 35);
  }

  // Reset
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  stroke('black');
  strokeWeight(1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition checkbox
  if (showAnnotationsCheckbox) {
    showAnnotationsCheckbox.position(20, drawHeight + 15);
  }
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    let containerWidth = container.offsetWidth;
    // Ensure minimum width for readability and proper panel display
    canvasWidth = max(containerWidth, minCanvasWidth);
  }
}
