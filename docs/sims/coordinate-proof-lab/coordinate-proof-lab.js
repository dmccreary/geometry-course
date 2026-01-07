// Coordinate Proof Laboratory
// Interactive exploration of coordinate geometry proofs

let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let selectedShape = 0; // 0=rectangle, 1=triangle, 2=parallelogram
let shapeSelect;
let snapToGrid = true;
let snapCheckbox;
let showDistances = true;
let distCheckbox;

// Vertices for each shape (grid coordinates, will be scaled)
let shapes = {
  rectangle: [
    { x: 0, y: 0, label: 'A', color: '#D32F2F' },
    { x: 4, y: 0, label: 'B', color: '#1976D2' },
    { x: 4, y: 3, label: 'C', color: '#388E3C' },
    { x: 0, y: 3, label: 'D', color: '#7B1FA2' }
  ],
  triangle: [
    { x: 0, y: 0, label: 'A', color: '#D32F2F' },
    { x: 5, y: 0, label: 'B', color: '#1976D2' },
    { x: 2.5, y: 4, label: 'C', color: '#388E3C' }
  ],
  parallelogram: [
    { x: 1, y: 0, label: 'A', color: '#D32F2F' },
    { x: 5, y: 0, label: 'B', color: '#1976D2' },
    { x: 6, y: 3, label: 'C', color: '#388E3C' },
    { x: 2, y: 3, label: 'D', color: '#7B1FA2' }
  ]
};

let vertices = [];
let draggingVertex = -1;

// Graph settings
let graphX = 30;
let graphY = 50;
let graphW = 400;
let graphH = 400;
let gridSize = 50; // pixels per unit

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeVertices();

  // Create controls
  let ctrlY = drawHeight + 20;

  shapeSelect = createSelect();
  shapeSelect.position(20, ctrlY);
  shapeSelect.option('Rectangle', 0);
  shapeSelect.option('Triangle', 1);
  shapeSelect.option('Parallelogram', 2);
  shapeSelect.changed(changeShape);

  snapCheckbox = createCheckbox('Snap to grid', true);
  snapCheckbox.position(150, ctrlY);
  snapCheckbox.changed(() => snapToGrid = snapCheckbox.checked());

  distCheckbox = createCheckbox('Show distances', true);
  distCheckbox.position(280, ctrlY);
  distCheckbox.changed(() => showDistances = distCheckbox.checked());

  describe('Interactive coordinate proof laboratory with draggable vertices', LABEL);
}

function initializeVertices() {
  let shapeNames = ['rectangle', 'triangle', 'parallelogram'];
  vertices = shapes[shapeNames[selectedShape]].map(v => ({ ...v }));
}

function changeShape() {
  selectedShape = parseInt(shapeSelect.value());
  initializeVertices();
}

function draw() {
  updateCanvasSize();

  background('#FAFAFA');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Coordinate Proof Laboratory', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Drag vertices to explore - formulas update in real-time', canvasWidth / 2, 32);

  // Draw coordinate plane
  drawCoordinatePlane();

  // Draw shape
  drawShape();

  // Draw calculations panel
  drawCalculations();

  // Instructions
  fill('#424242');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Drag vertices to move them', 420, drawHeight + 50);
}

function drawCoordinatePlane() {
  // Background
  fill(255);
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(graphX, graphY, graphW, graphH, 8);

  let originX = graphX + 30;
  let originY = graphY + graphH - 30;

  // Grid
  stroke('#E8E8E8');
  strokeWeight(1);
  for (let i = 0; i <= 8; i++) {
    // Vertical lines
    line(originX + i * gridSize, graphY + 10, originX + i * gridSize, originY + 10);
    // Horizontal lines
    line(originX - 10, originY - i * gridSize, graphX + graphW - 10, originY - i * gridSize);
  }

  // Axes
  stroke('#424242');
  strokeWeight(2);
  line(originX - 20, originY, graphX + graphW - 10, originY);
  line(originX, originY + 20, originX, graphY + 10);

  // Axis labels
  fill('#424242');
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('x', graphX + graphW - 15, originY + 5);
  textAlign(RIGHT, CENTER);
  text('y', originX - 8, graphY + 20);
  textStyle(NORMAL);

  // Tick labels
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = 1; i <= 7; i++) {
    text(i, originX + i * gridSize, originY + 5);
  }
  textAlign(RIGHT, CENTER);
  for (let i = 1; i <= 6; i++) {
    text(i, originX - 5, originY - i * gridSize);
  }
}

function drawShape() {
  let originX = graphX + 30;
  let originY = graphY + graphH - 30;

  // Draw edges
  stroke('#424242');
  strokeWeight(2);
  for (let i = 0; i < vertices.length; i++) {
    let v1 = vertices[i];
    let v2 = vertices[(i + 1) % vertices.length];
    let x1 = originX + v1.x * gridSize;
    let y1 = originY - v1.y * gridSize;
    let x2 = originX + v2.x * gridSize;
    let y2 = originY - v2.y * gridSize;
    line(x1, y1, x2, y2);

    // Distance label
    if (showDistances) {
      let dist = sqrt(pow(v2.x - v1.x, 2) + pow(v2.y - v1.y, 2));
      let midX = (x1 + x2) / 2;
      let midY = (y1 + y2) / 2;
      // Offset perpendicular to line
      let angle = atan2(y2 - y1, x2 - x1) + PI / 2;
      let offset = 15;
      midX += cos(angle) * offset;
      midY += sin(angle) * offset;

      noStroke();
      fill('#E65100');
      textSize(10);
      textAlign(CENTER, CENTER);
      text(dist.toFixed(2), midX, midY);
    }
  }

  // Draw diagonals for rectangle/parallelogram
  if (selectedShape !== 1 && vertices.length === 4) {
    let v0 = vertices[0];
    let v2 = vertices[2];
    let v1 = vertices[1];
    let v3 = vertices[3];

    // Diagonal AC
    stroke('#D32F2F');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(originX + v0.x * gridSize, originY - v0.y * gridSize,
         originX + v2.x * gridSize, originY - v2.y * gridSize);

    // Diagonal BD
    stroke('#1976D2');
    line(originX + v1.x * gridSize, originY - v1.y * gridSize,
         originX + v3.x * gridSize, originY - v3.y * gridSize);
    drawingContext.setLineDash([]);
  }

  // Draw vertices
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    let x = originX + v.x * gridSize;
    let y = originY - v.y * gridSize;
    let isHovered = draggingVertex === i ||
                    dist(mouseX, mouseY, x, y) < 15;

    fill(v.color);
    noStroke();
    circle(x, y, isHovered ? 18 : 14);

    // Label
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(v.color);
    let offsetX = (v.x < 3) ? -18 : 18;
    let offsetY = (v.y < 2) ? 18 : -18;
    text(v.label, x + offsetX, y + offsetY);
    textStyle(NORMAL);

    // Coordinate
    fill('#424242');
    textSize(10);
    text('(' + v.x.toFixed(1) + ', ' + v.y.toFixed(1) + ')', x + offsetX, y + offsetY + (offsetY > 0 ? 14 : -14));
  }
}

function drawCalculations() {
  let calcX = 460;
  let calcY = 60;
  let calcW = 420;

  // Title
  fill('#1565C0');
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Calculations', calcX, calcY);
  textStyle(NORMAL);

  calcY += 30;

  // Side lengths
  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(calcX, calcY, calcW, 100, 8);

  noStroke();
  fill('#2E7D32');
  textSize(12);
  textStyle(BOLD);
  text('Side Lengths:', calcX + 10, calcY + 10);
  textStyle(NORMAL);

  fill('#212121');
  textSize(11);
  let sideY = calcY + 30;
  for (let i = 0; i < vertices.length; i++) {
    let v1 = vertices[i];
    let v2 = vertices[(i + 1) % vertices.length];
    let dist = sqrt(pow(v2.x - v1.x, 2) + pow(v2.y - v1.y, 2));
    let sideName = v1.label + v2.label;
    text(sideName + ' = √[(' + (v2.x - v1.x).toFixed(1) + ')² + (' + (v2.y - v1.y).toFixed(1) + ')²] = ' + dist.toFixed(3), calcX + 10, sideY);
    sideY += 16;
  }

  // Diagonals (for 4-sided shapes)
  if (vertices.length === 4) {
    calcY += 115;
    fill('#E3F2FD');
    stroke('#1976D2');
    strokeWeight(2);
    rect(calcX, calcY, calcW, 80, 8);

    noStroke();
    fill('#1565C0');
    textSize(12);
    textStyle(BOLD);
    text('Diagonal Lengths:', calcX + 10, calcY + 10);
    textStyle(NORMAL);

    fill('#212121');
    textSize(11);

    let v0 = vertices[0];
    let v2 = vertices[2];
    let v1 = vertices[1];
    let v3 = vertices[3];

    let diagAC = sqrt(pow(v2.x - v0.x, 2) + pow(v2.y - v0.y, 2));
    let diagBD = sqrt(pow(v3.x - v1.x, 2) + pow(v3.y - v1.y, 2));

    fill('#C62828');
    text('AC = √[(' + (v2.x - v0.x).toFixed(1) + ')² + (' + (v2.y - v0.y).toFixed(1) + ')²] = ' + diagAC.toFixed(3), calcX + 10, calcY + 32);
    fill('#1565C0');
    text('BD = √[(' + (v3.x - v1.x).toFixed(1) + ')² + (' + (v3.y - v1.y).toFixed(1) + ')²] = ' + diagBD.toFixed(3), calcX + 10, calcY + 52);

    // Conclusion
    calcY += 95;
    let areDiagonalsEqual = abs(diagAC - diagBD) < 0.01;
    if (areDiagonalsEqual) {
      fill('#C8E6C9');
      stroke('#43A047');
    } else {
      fill('#FFECB3');
      stroke('#FFA000');
    }
    strokeWeight(2);
    rect(calcX, calcY, calcW, 40, 8);

    noStroke();
    if (areDiagonalsEqual) {
      fill('#2E7D32');
      text('Diagonals are CONGRUENT (AC = BD) ✓', calcX + 10, calcY + 15);
    } else {
      fill('#E65100');
      text('Diagonals are NOT congruent (AC ≠ BD)', calcX + 10, calcY + 15);
    }
  }

  // Triangle: midpoint and median
  if (vertices.length === 3) {
    calcY += 115;
    fill('#FFF3E0');
    stroke('#E65100');
    strokeWeight(2);
    rect(calcX, calcY, calcW, 100, 8);

    noStroke();
    fill('#E65100');
    textSize(12);
    textStyle(BOLD);
    text('Midpoints:', calcX + 10, calcY + 10);
    textStyle(NORMAL);

    fill('#212121');
    textSize(11);

    let midY = calcY + 30;
    for (let i = 0; i < 3; i++) {
      let v1 = vertices[i];
      let v2 = vertices[(i + 1) % 3];
      let midX = (v1.x + v2.x) / 2;
      let midYval = (v1.y + v2.y) / 2;
      text('Mid(' + v1.label + v2.label + ') = ((' + v1.x.toFixed(1) + '+' + v2.x.toFixed(1) + ')/2, (' + v1.y.toFixed(1) + '+' + v2.y.toFixed(1) + ')/2) = (' + midX.toFixed(2) + ', ' + midYval.toFixed(2) + ')', calcX + 10, midY);
      midY += 20;
    }
  }

  // Tips box
  calcY = 430;
  fill('#F3E5F5');
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(calcX, calcY, calcW, 80, 8);

  noStroke();
  fill('#6A1B9A');
  textSize(11);
  textStyle(BOLD);
  text('Coordinate Proof Tips:', calcX + 10, calcY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(10);
  text('• Place one vertex at origin (0, 0) when possible', calcX + 10, calcY + 28);
  text('• Align sides with axes for simpler coordinates', calcX + 10, calcY + 42);
  text('• Use variables (a, b) for general proofs', calcX + 10, calcY + 56);
  text('• Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]', calcX + 10, calcY + 70);
}

function mousePressed() {
  let originX = graphX + 30;
  let originY = graphY + graphH - 30;

  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    let x = originX + v.x * gridSize;
    let y = originY - v.y * gridSize;
    if (dist(mouseX, mouseY, x, y) < 15) {
      draggingVertex = i;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingVertex >= 0) {
    let originX = graphX + 30;
    let originY = graphY + graphH - 30;

    let newX = (mouseX - originX) / gridSize;
    let newY = (originY - mouseY) / gridSize;

    // Clamp to grid bounds
    newX = constrain(newX, 0, 7);
    newY = constrain(newY, 0, 6);

    // Snap to grid if enabled
    if (snapToGrid) {
      newX = round(newX * 2) / 2;
      newY = round(newY * 2) / 2;
    }

    vertices[draggingVertex].x = newX;
    vertices[draggingVertex].y = newY;
  }
}

function mouseReleased() {
  draggingVertex = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let ctrlY = drawHeight + 20;
  shapeSelect.position(20, ctrlY);
  snapCheckbox.position(150, ctrlY);
  distCheckbox.position(280, ctrlY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 800);
  }
}
