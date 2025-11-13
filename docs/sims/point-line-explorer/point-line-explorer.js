// Points and Lines Explorer MicroSim
// Canvas dimensions - REQUIRED structure
let canvasWidth = 600;              // Initial width (responsive)
let drawHeight = 600;               // Drawing/simulation area height
let controlHeight = 120;            // Controls area height (increased for multiple controls)
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                     // Margin for visual elements
let sliderLeftMargin = 170;         // Left margin for slider positioning
let defaultTextSize = 16;            // Base text size

// Simulation state
let points = [];
let lines = [];
let mode = 'move'; // 'move' or 'connect'
let draggingPoint = null;
let hoveredPoint = null;
let connectStartPoint = null;
let nextLabel = 0;

// Controls
let regenerateButton;
let modeToggleButton;
let addPointButton;
let numPointsSlider;

// Color palette for points
const colorPalette = [
  '#4169E1', // Royal Blue
  '#FF6347', // Tomato Red
  '#32CD32', // Lime Green
  '#FF8C00', // Dark Orange
  '#9370DB', // Medium Purple
  '#20B2AA', // Light Sea Green
  '#DC143C', // Crimson
  '#FFD700', // Gold
  '#00CED1', // Dark Turquoise
  '#FF1493'  // Deep Pink
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create initial points
  generateRandomPoints(10);

  // Create controls
  regenerateButton = createButton('Regenerate Random Points');
  regenerateButton.position(10, drawHeight + 10);
  regenerateButton.mousePressed(regeneratePoints);

  modeToggleButton = createButton('Mode: Move Points');
  modeToggleButton.position(210, drawHeight + 10);
  modeToggleButton.mousePressed(toggleMode);

  addPointButton = createButton('Add Point');
  addPointButton.position(370, drawHeight + 10);
  addPointButton.mousePressed(addRandomPoint);

  numPointsSlider = createSlider(1, 20, 10, 1);
  numPointsSlider.position(sliderLeftMargin, drawHeight + 60);
  numPointsSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive geometry explorer showing points and lines. Users can create, move, and connect points to explore geometric relationships.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area (light blue background)
  fill('aliceblue');
  noStroke();
  rect(0, 0, width, drawHeight);

  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);

  // Draw border between regions
  stroke('silver');
  strokeWeight(1);
  line(0, drawHeight, width, drawHeight);

  // Place the title in the top center of the canvas
  fill('black');
  textSize(36);
  textAlign(CENTER, TOP);
  noStroke();
  text('Points and Lines Explorer', canvasWidth / 2, margin);

  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Draw lines first (so they appear behind points)
  drawLines();

  // Update hovered point
  updateHoveredPoint();

  // Draw points
  drawPoints();

  // Draw mode indicator
  drawModeIndicator();

  // Draw connecting line preview if in connect mode
  if (mode === 'connect' && connectStartPoint !== null && hoveredPoint === null) {
    stroke('navy');
    strokeWeight(2);
    line(connectStartPoint.x, connectStartPoint.y, mouseX, mouseY);
  }

  // Draw control labels and values
  drawControlLabels();
}

function generateRandomPoints(count) {
  points = [];
  lines = [];
  nextLabel = 0;
  for (let i = 0; i < count; i++) {
    addPoint(
      random(margin + 30, canvasWidth - margin - 30),
      random(margin + 80, drawHeight - margin - 30)
    );
  }
}

function addPoint(x, y) {
  const label = String.fromCharCode(65 + (nextLabel % 26)); // A-Z, then wraps
  const color = colorPalette[nextLabel % colorPalette.length];
  points.push({
    x: x,
    y: y,
    label: label,
    color: color
  });
  nextLabel++;
}

function addRandomPoint() {
  addPoint(
    random(margin + 30, canvasWidth - margin - 30),
    random(margin + 80, drawHeight - margin - 30)
  );
}

function regeneratePoints() {
  const count = numPointsSlider.value();
  generateRandomPoints(count);
  connectStartPoint = null;
}

function toggleMode() {
  if (mode === 'move') {
    mode = 'connect';
    modeToggleButton.html('Mode: Connect Points');
  } else {
    mode = 'move';
    modeToggleButton.html('Mode: Move Points');
  }
  connectStartPoint = null;
}

function updateHoveredPoint() {
  hoveredPoint = null;
  if (mouseY < drawHeight && mouseY > 0) {
    for (let point of points) {
      const d = dist(mouseX, mouseY, point.x, point.y);
      if (d < 10) {
        hoveredPoint = point;
        break;
      }
    }
  }
}

function drawPoints() {
  for (let point of points) {
    // Draw highlight circle if point is selected for connection
    if (mode === 'connect' && connectStartPoint === point) {
      stroke('black');
      strokeWeight(2);
      noFill();
      circle(point.x, point.y, 24);
    }

    // Draw the point
    fill(point.color);
    stroke('black');
    strokeWeight(1);
    circle(point.x, point.y, 20);

    // Draw label below the point
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text(point.label, point.x, point.y + 12);

    // Show coordinates on hover
    if (hoveredPoint === point) {
      textAlign(CENTER, BOTTOM);
      textSize(14);
      fill('darkblue');
      text(`(${Math.round(point.x)}, ${Math.round(point.y)})`, point.x, point.y - 15);
    }
  }
}

function drawLines() {
  stroke('navy');
  strokeWeight(4);
  for (let lineObj of lines) {
    const p1 = lineObj.p1;
    const p2 = lineObj.p2;

    // Define drawing region boundaries
    const minX = 0;
    const maxX = canvasWidth;
    const minY = margin + 60; // Account for title
    const maxY = drawHeight;

    // Calculate line equation: y = mx + b
    if (p1.x === p2.x) {
      // Vertical line - constrain to drawing region
      line(p1.x, minY, p1.x, maxY);
    } else {
      const m = (p2.y - p1.y) / (p2.x - p1.x);
      const b = p1.y - m * p1.x;

      // Calculate intersections with drawing region boundaries
      let x1 = minX;
      let y1 = m * x1 + b;
      let x2 = maxX;
      let y2 = m * x2 + b;

      // Clip to top boundary
      if (y1 < minY) {
        y1 = minY;
        x1 = (y1 - b) / m;
      }
      if (y2 < minY) {
        y2 = minY;
        x2 = (y2 - b) / m;
      }

      // Clip to bottom boundary
      if (y1 > maxY) {
        y1 = maxY;
        x1 = (y1 - b) / m;
      }
      if (y2 > maxY) {
        y2 = maxY;
        x2 = (y2 - b) / m;
      }

      // Draw the clipped line
      line(x1, y1, x2, y2);
    }

    // Draw line label at midpoint
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    push();
    fill('white');
    stroke('navy');
    strokeWeight(1);
    rectMode(CENTER);
    rect(midX, midY, 40, 24, 4);

    fill('navy');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(`${p1.label}${p2.label}`, midX, midY);
    pop();

    // Draw arrows at both ends of the visible line segment
    drawArrow(p1.x, p1.y, p2.x, p2.y);
    drawArrow(p2.x, p2.y, p1.x, p1.y);
  }
}

function drawArrow(x1, y1, x2, y2) {
  push();
  stroke('navy');
  strokeWeight(2);
  fill('navy');

  const angle = atan2(y2 - y1, x2 - x1);
  const arrowSize = 10;

  translate(x1, y1);
  rotate(angle);

  // Draw arrow head
  line(0, 0, -arrowSize, -arrowSize / 2);
  line(0, 0, -arrowSize, arrowSize / 2);

  pop();
}

function drawModeIndicator() {
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);

  let modeText = '';
  if (mode === 'move') {
    modeText = 'Move Mode: Click background to add points, drag points to move them';
  } else {
    modeText = 'Connect Mode: Click two points to create a line through them';
  }

  text(modeText, canvasWidth / 2, drawHeight - 20);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Slider label and value
  const sliderY = drawHeight + 70;
  text('Number of Points:', 10, sliderY);
  text(numPointsSlider.value(), sliderLeftMargin - 30, sliderY);
}

function mousePressed() {
  // Only handle mouse events in the drawing area
  if (mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) {
    return;
  }

  if (mode === 'move') {
    // Check if clicking on a point to drag it
    for (let point of points) {
      const d = dist(mouseX, mouseY, point.x, point.y);
      if (d < 10) {
        draggingPoint = point;
        return;
      }
    }

    // Otherwise, create a new point
    addPoint(mouseX, mouseY);
  } else if (mode === 'connect') {
    // Check if clicking on a point to connect
    for (let point of points) {
      const d = dist(mouseX, mouseY, point.x, point.y);
      if (d < 10) {
        if (connectStartPoint === null) {
          connectStartPoint = point;
        } else if (connectStartPoint !== point) {
          // Create a line
          lines.push({
            p1: connectStartPoint,
            p2: point
          });
          connectStartPoint = null;
        }
        return;
      }
    }

    // Click on background cancels connection
    connectStartPoint = null;
  }
}

function mouseDragged() {
  if (mode === 'move' && draggingPoint !== null) {
    // Constrain point to drawing area
    draggingPoint.x = constrain(mouseX, margin + 10, canvasWidth - margin - 10);
    draggingPoint.y = constrain(mouseY, margin + 80, drawHeight - margin - 10);
  }
}

function mouseReleased() {
  draggingPoint = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;

    // Reposition controls to match new width
    if (typeof numPointsSlider !== 'undefined') {
      numPointsSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}

// Helper function for drawing line segment symbols (provided in spec)
function drawLineSegmentSymbol(x, y, length) {
  // Draws a line segment symbol with arrows on both ends
  // x, y: center position of the symbol
  // length: length of the line segment
  push();
  stroke('black');
  strokeWeight(1);

  let halfLength = length / 2;
  let leftX = x - halfLength;
  let rightX = x + halfLength;

  // Draw the line
  line(leftX, y, rightX, y);

  // Draw arrow heads
  noStroke();
  fill('black');
  let arrowSize = 3;

  // Left arrow
  triangle(leftX, y, leftX - arrowSize, y - 2, leftX - arrowSize, y + 2);

  // Right arrow
  triangle(rightX, y, rightX + arrowSize, y - 2, rightX + arrowSize, y + 2);
  pop();
}
