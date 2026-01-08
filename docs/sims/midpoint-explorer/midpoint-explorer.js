// Midpoint Explorer with Verification
// Interactive exploration of midpoint formula with distance verification

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;

let pointA = { x: 1, y: 2 };
let pointB = { x: 7, y: 8 };
let midpoint = { x: 4, y: 5 };

let dragging = null;
let gridScale = 25;
let originX, originY;

let showDistances = true;
let showCalcSteps = true;
let snapToGrid = true;

let randomBtn, showDistBtn, showCalcBtn, snapBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2;

  // Create buttons
  let btnY = drawHeight + 20;
  randomBtn = createButton('Random Points');
  randomBtn.position(20, btnY);
  randomBtn.mousePressed(randomizePoints);
  randomBtn.parent(document.querySelector('main'));

  showDistBtn = createButton('Hide Distances');
  showDistBtn.position(140, btnY);
  showDistBtn.mousePressed(toggleDistances);
  showDistBtn.parent(document.querySelector('main'));

  showCalcBtn = createButton('Hide Steps');
  showCalcBtn.position(260, btnY);
  showCalcBtn.mousePressed(toggleCalcSteps);
  showCalcBtn.parent(document.querySelector('main'));

  snapBtn = createButton('Snap: ON');
  snapBtn.position(360, btnY);
  snapBtn.mousePressed(toggleSnap);
  snapBtn.parent(document.querySelector('main'));

  calculateMidpoint();

  describe('Interactive midpoint explorer with draggable points and distance verification', LABEL);
}

function draw() {
  updateCanvasSize();
  originX = canvasWidth / 2;

  // Draw area background
  background('#FAFAFA');
  fill('#FFFFFF');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  drawGrid();
  drawSegmentAndPoints();
  drawControlPanel();
}

function drawGrid() {
  push();
  translate(originX, originY);

  // Grid lines
  stroke('#E0E0E0');
  strokeWeight(0.5);
  for (let x = -10; x <= 10; x++) {
    line(x * gridScale, -10 * gridScale, x * gridScale, 10 * gridScale);
  }
  for (let y = -10; y <= 10; y++) {
    line(-10 * gridScale, y * gridScale, 10 * gridScale, y * gridScale);
  }

  // Axes
  stroke('#9E9E9E');
  strokeWeight(1.5);
  line(-10 * gridScale, 0, 10 * gridScale, 0);
  line(0, -10 * gridScale, 0, 10 * gridScale);

  // Axis labels
  fill('#757575');
  textSize(10);
  textAlign(CENTER, TOP);
  for (let x = -10; x <= 10; x++) {
    if (x !== 0) text(x, x * gridScale, 5);
  }
  textAlign(RIGHT, CENTER);
  for (let y = -10; y <= 10; y++) {
    if (y !== 0) text(-y, -5, y * gridScale);
  }
  textAlign(CENTER, TOP);
  text('0', -8, 5);

  pop();
}

function drawSegmentAndPoints() {
  push();
  translate(originX, originY);

  let ax = pointA.x * gridScale;
  let ay = -pointA.y * gridScale;
  let bx = pointB.x * gridScale;
  let by = -pointB.y * gridScale;
  let mx = midpoint.x * gridScale;
  let my = -midpoint.y * gridScale;

  // Segment AB
  stroke('#9E9E9E');
  strokeWeight(2);
  line(ax, ay, bx, by);

  // Distance indicators
  if (showDistances) {
    let d1 = dist(pointA.x, pointA.y, midpoint.x, midpoint.y);
    let d2 = dist(midpoint.x, midpoint.y, pointB.x, pointB.y);

    // Distance from A to M
    stroke('#1976D2');
    strokeWeight(3);
    setLineDash([5, 3]);
    line(ax, ay, mx, my);

    // Distance from M to B
    stroke('#C62828');
    line(mx, my, bx, by);
    setLineDash([]);

    // Distance labels
    textSize(10);
    fill('#1976D2');
    noStroke();
    textAlign(CENTER, CENTER);
    text(`d₁ = ${d1.toFixed(2)}`, (ax + mx) / 2 - 20, (ay + my) / 2 - 15);

    fill('#C62828');
    text(`d₂ = ${d2.toFixed(2)}`, (mx + bx) / 2 + 20, (my + by) / 2 + 15);
  }

  // Points
  noStroke();

  // Point A (blue)
  fill('#1565C0');
  ellipse(ax, ay, 16, 16);

  // Point B (red)
  fill('#D32F2F');
  ellipse(bx, by, 16, 16);

  // Midpoint M (green with pulse effect)
  let pulse = sin(frameCount * 0.1) * 2 + 20;
  fill(76, 175, 80, 100);
  ellipse(mx, my, pulse + 4, pulse + 4);
  fill('#4CAF50');
  ellipse(mx, my, 18, 18);

  // Labels
  textSize(12);
  textStyle(BOLD);
  fill('#1565C0');
  textAlign(LEFT, CENTER);
  text(`A(${pointA.x.toFixed(1)}, ${pointA.y.toFixed(1)})`, ax + 12, ay - 5);

  fill('#D32F2F');
  text(`B(${pointB.x.toFixed(1)}, ${pointB.y.toFixed(1)})`, bx + 12, by - 5);

  fill('#2E7D32');
  textAlign(CENTER, BOTTOM);
  text(`M(${midpoint.x.toFixed(1)}, ${midpoint.y.toFixed(1)})`, mx, my - 14);
  textStyle(NORMAL);

  pop();
}

function drawControlPanel() {
  // Panel background
  fill('#F5F5F5');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Divider
  stroke('#E0E0E0');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // Title
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  noStroke();
  text('Midpoint Calculation', 20, drawHeight + 55);
  textStyle(NORMAL);

  if (showCalcSteps) {
    // Formula and calculation
    textSize(12);
    fill('#616161');
    let calcX = 20;
    let calcY = drawHeight + 75;

    text(`M = ((${pointA.x.toFixed(1)} + ${pointB.x.toFixed(1)})/2, (${pointA.y.toFixed(1)} + ${pointB.y.toFixed(1)})/2)`, calcX, calcY);
    text(`M = (${(pointA.x + pointB.x).toFixed(1)}/2, ${(pointA.y + pointB.y).toFixed(1)}/2)`, calcX, calcY + 18);

    fill('#2E7D32');
    textStyle(BOLD);
    text(`M = (${midpoint.x.toFixed(1)}, ${midpoint.y.toFixed(1)})`, calcX, calcY + 36);
    textStyle(NORMAL);
  }

  // Verification panel
  let d1 = dist(pointA.x, pointA.y, midpoint.x, midpoint.y);
  let d2 = dist(midpoint.x, midpoint.y, pointB.x, pointB.y);
  let isEqual = abs(d1 - d2) < 0.001;

  let verifyX = canvasWidth - 250;
  let verifyY = drawHeight + 55;

  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Distance Verification', verifyX, verifyY);
  textStyle(NORMAL);

  textSize(11);
  fill('#1976D2');
  text(`d₁ (A to M): ${d1.toFixed(3)} units`, verifyX, verifyY + 25);

  fill('#C62828');
  text(`d₂ (M to B): ${d2.toFixed(3)} units`, verifyX, verifyY + 42);

  if (isEqual) {
    fill('#2E7D32');
    textStyle(BOLD);
    text('d₁ = d₂  ✓  Midpoint verified!', verifyX, verifyY + 62);
    textStyle(NORMAL);
  }

  // Instructions
  fill('#9E9E9E');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('Drag points A (blue) or B (red) to explore', canvasWidth / 2, drawHeight + controlHeight - 5);
}

function calculateMidpoint() {
  midpoint.x = (pointA.x + pointB.x) / 2;
  midpoint.y = (pointA.y + pointB.y) / 2;
}

function randomizePoints() {
  pointA.x = floor(random(-8, 8));
  pointA.y = floor(random(-8, 8));
  pointB.x = floor(random(-8, 8));
  pointB.y = floor(random(-8, 8));
  calculateMidpoint();
}

function toggleDistances() {
  showDistances = !showDistances;
  showDistBtn.html(showDistances ? 'Hide Distances' : 'Show Distances');
}

function toggleCalcSteps() {
  showCalcSteps = !showCalcSteps;
  showCalcBtn.html(showCalcSteps ? 'Hide Steps' : 'Show Steps');
}

function toggleSnap() {
  snapToGrid = !snapToGrid;
  snapBtn.html(snapToGrid ? 'Snap: ON' : 'Snap: OFF');
}

function mousePressed() {
  let mx = mouseX - originX;
  let my = mouseY - originY;

  let ax = pointA.x * gridScale;
  let ay = -pointA.y * gridScale;
  let bx = pointB.x * gridScale;
  let by = -pointB.y * gridScale;

  if (dist(mx, my, ax, ay) < 15) {
    dragging = 'A';
  } else if (dist(mx, my, bx, by) < 15) {
    dragging = 'B';
  }
}

function mouseDragged() {
  if (!dragging) return;

  let mx = (mouseX - originX) / gridScale;
  let my = -(mouseY - originY) / gridScale;

  if (snapToGrid) {
    mx = round(mx);
    my = round(my);
  }

  mx = constrain(mx, -9, 9);
  my = constrain(my, -9, 9);

  if (dragging === 'A') {
    pointA.x = mx;
    pointA.y = my;
  } else if (dragging === 'B') {
    pointB.x = mx;
    pointB.y = my;
  }

  calculateMidpoint();
}

function mouseReleased() {
  dragging = null;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  originX = canvasWidth / 2;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
    gridScale = canvasWidth / 32;
  }
}
