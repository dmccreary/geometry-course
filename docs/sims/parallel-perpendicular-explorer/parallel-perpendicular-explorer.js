// Parallel and Perpendicular Line Explorer
// Interactive tool for exploring parallel and perpendicular line relationships

let canvasWidth = 950;
let drawHeight = 700;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let graphWidth = 650;
let gridScale = 28;
let originX, originY;

let m1 = 2, b1 = 1;
let mode = 'parallel'; // 'parallel' or 'perpendicular'

let line1Slider, interceptSlider;
let modeBtn, randomBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = graphWidth / 2 + 10;
  originY = drawHeight / 2;

  // Create controls
  let ctrlY = drawHeight + 15;

  let modeLabel = createSpan('Mode:');
  modeLabel.position(20, ctrlY);
  modeLabel.style('font-family', 'Arial');
  modeLabel.style('font-size', '13px');
  modeLabel.parent(document.querySelector('main'));

  modeBtn = createButton('Parallel');
  modeBtn.position(70, ctrlY - 3);
  modeBtn.mousePressed(toggleMode);
  modeBtn.parent(document.querySelector('main'));

  let slopeLabel = createSpan('Slope (m₁):');
  slopeLabel.position(180, ctrlY);
  slopeLabel.style('font-family', 'Arial');
  slopeLabel.style('font-size', '13px');
  slopeLabel.parent(document.querySelector('main'));

  line1Slider = createSlider(-3, 3, 2, 0.5);
  line1Slider.position(265, ctrlY + 2);
  line1Slider.style('width', '120px');
  line1Slider.parent(document.querySelector('main'));

  let intLabel = createSpan('Intercept (b₁):');
  intLabel.position(410, ctrlY);
  intLabel.style('font-family', 'Arial');
  intLabel.style('font-size', '13px');
  intLabel.parent(document.querySelector('main'));

  interceptSlider = createSlider(-5, 5, 1, 0.5);
  interceptSlider.position(510, ctrlY + 2);
  interceptSlider.style('width', '120px');
  interceptSlider.parent(document.querySelector('main'));

  randomBtn = createButton('Random');
  randomBtn.position(660, ctrlY - 3);
  randomBtn.mousePressed(randomLines);
  randomBtn.parent(document.querySelector('main'));

  describe('Interactive parallel and perpendicular line explorer with mode toggle and slope controls', LABEL);
}

function draw() {
  updateCanvasSize();

  m1 = line1Slider.value();
  b1 = interceptSlider.value();

  background('#FAFAFA');

  // Graph area
  fill('#FFFFFF');
  noStroke();
  rect(0, 0, graphWidth, drawHeight);

  drawGrid();
  drawLines();
  drawInfoPanel();
  drawControlPanel();
}

function drawGrid() {
  push();
  translate(originX, originY);

  // Grid lines
  stroke('#E8E8E8');
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
  noStroke();
  for (let x = -10; x <= 10; x++) {
    if (x !== 0 && x % 2 === 0) text(x, x * gridScale, 5);
  }
  textAlign(RIGHT, CENTER);
  for (let y = -10; y <= 10; y++) {
    if (y !== 0 && y % 2 === 0) text(-y, -5, y * gridScale);
  }

  pop();
}

function drawLines() {
  push();
  translate(originX, originY);

  // Calculate second line parameters
  let m2, b2;
  if (mode === 'parallel') {
    m2 = m1; // Same slope
    b2 = b1 - 3; // Different intercept
  } else {
    // Perpendicular: negative reciprocal
    m2 = m1 !== 0 ? -1 / m1 : null;
    b2 = 2;
  }

  // Line 1
  stroke('#D32F2F');
  strokeWeight(3);
  let x1a = -10, x1b = 10;
  let y1a = m1 * x1a + b1;
  let y1b = m1 * x1b + b1;
  line(x1a * gridScale, -y1a * gridScale, x1b * gridScale, -y1b * gridScale);

  // Line 2
  stroke('#1565C0');
  strokeWeight(3);
  if (m2 !== null) {
    let y2a = m2 * x1a + b2;
    let y2b = m2 * x1b + b2;
    line(x1a * gridScale, -y2a * gridScale, x1b * gridScale, -y2b * gridScale);
  } else {
    // Vertical line for perpendicular to horizontal
    line(2 * gridScale, -10 * gridScale, 2 * gridScale, 10 * gridScale);
  }

  // Slope triangles for Line 1
  if (m1 !== 0) {
    let startX = 0;
    let startY = b1;
    let endX = 1;
    let endY = b1 + m1;

    stroke('#D32F2F');
    strokeWeight(2);
    setLineDash([4, 2]);
    line(startX * gridScale, -startY * gridScale, endX * gridScale, -startY * gridScale);
    line(endX * gridScale, -startY * gridScale, endX * gridScale, -endY * gridScale);
    setLineDash([]);
  }

  // For perpendicular mode, show intersection and right angle
  if (mode === 'perpendicular' && m2 !== null) {
    // Find intersection
    let intX = (b2 - b1) / (m1 - m2);
    let intY = m1 * intX + b1;

    // Right angle symbol
    let px = intX * gridScale;
    let py = -intY * gridScale;
    stroke('#424242');
    strokeWeight(2);
    noFill();

    let symbolSize = 10;
    push();
    translate(px, py);
    let angle = atan(m1);
    rotate(-angle);
    rect(0, 0, symbolSize, -symbolSize);
    pop();

    // 90° label
    noStroke();
    fill('#E65100');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('90°', px + 25, py - 15);
    textStyle(NORMAL);

    // Intersection point
    fill('#424242');
    noStroke();
    ellipse(px, py, 8, 8);
  }

  // Y-intercept points
  noStroke();
  fill('#D32F2F');
  ellipse(0, -b1 * gridScale, 10, 10);

  if (mode === 'parallel' || m2 !== null) {
    fill('#1565C0');
    ellipse(0, -b2 * gridScale, 10, 10);
  }

  // Line labels
  textSize(11);
  textStyle(BOLD);
  fill('#D32F2F');
  textAlign(LEFT, BOTTOM);
  text('Line 1', 4 * gridScale, -(m1 * 4 + b1) * gridScale - 8);

  fill('#1565C0');
  if (m2 !== null) {
    text('Line 2', 4 * gridScale, -(m2 * 4 + b2) * gridScale - 8);
  }
  textStyle(NORMAL);

  pop();
}

function drawInfoPanel() {
  let panelX = graphWidth + 15;
  let panelY = 15;
  let panelW = canvasWidth - graphWidth - 25;
  let panelH = drawHeight - 30;

  // Panel background
  fill('#FFFFFF');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title
  fill(mode === 'parallel' ? '#2E7D32' : '#E65100');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text(mode === 'parallel' ? 'Parallel Lines' : 'Perpendicular Lines', panelX + panelW / 2, panelY + 15);
  textStyle(NORMAL);

  // Calculate second line params
  let m2 = mode === 'parallel' ? m1 : (m1 !== 0 ? -1 / m1 : null);
  let b2 = mode === 'parallel' ? b1 - 3 : 2;

  // Line equations
  let eqY = panelY + 50;

  fill('#D32F2F');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Line 1:', panelX + 15, eqY);
  textStyle(NORMAL);
  text(formatEquation(m1, b1), panelX + 70, eqY);

  eqY += 25;
  fill('#1565C0');
  textStyle(BOLD);
  text('Line 2:', panelX + 15, eqY);
  textStyle(NORMAL);
  if (m2 !== null) {
    text(formatEquation(m2, b2), panelX + 70, eqY);
  } else {
    text('x = 2', panelX + 70, eqY);
  }

  // Slope comparison
  eqY += 45;
  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  text('Slopes:', panelX + 15, eqY);
  textStyle(NORMAL);

  eqY += 22;
  fill('#D32F2F');
  textSize(11);
  text(`m₁ = ${m1}`, panelX + 20, eqY);

  fill('#1565C0');
  text(`m₂ = ${m2 !== null ? m2.toFixed(3) : 'undefined'}`, panelX + 100, eqY);

  // Verification box
  eqY += 40;
  if (mode === 'parallel') {
    fill('#E8F5E9');
    stroke('#4CAF50');
    strokeWeight(1);
    rect(panelX + 10, eqY, panelW - 20, 50, 5);

    fill('#2E7D32');
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('Verification', panelX + panelW / 2, eqY + 8);
    textStyle(NORMAL);

    text(`m₁ = m₂ ?`, panelX + panelW / 2, eqY + 26);
    text(`${m1} = ${m1} ✓`, panelX + panelW / 2, eqY + 40);
  } else {
    fill('#FFF3E0');
    stroke('#E65100');
    strokeWeight(1);
    rect(panelX + 10, eqY, panelW - 20, 50, 5);

    fill('#E65100');
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('Verification', panelX + panelW / 2, eqY + 8);
    textStyle(NORMAL);

    if (m2 !== null) {
      let product = m1 * m2;
      text(`m₁ × m₂ = -1 ?`, panelX + panelW / 2, eqY + 26);
      text(`${m1} × ${m2.toFixed(2)} = ${product.toFixed(1)} ✓`, panelX + panelW / 2, eqY + 40);
    } else {
      text('Horizontal ⊥ Vertical', panelX + panelW / 2, eqY + 30);
    }
  }

  // Key concepts box
  eqY += 70;
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(1);
  rect(panelX + 10, eqY, panelW - 20, 80, 5);

  fill('#1565C0');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Key Concept', panelX + panelW / 2, eqY + 10);
  textStyle(NORMAL);

  textSize(10);
  fill('#424242');
  if (mode === 'parallel') {
    text('Parallel lines have', panelX + panelW / 2, eqY + 32);
    text('EQUAL slopes', panelX + panelW / 2, eqY + 46);
    text('m₁ = m₂', panelX + panelW / 2, eqY + 62);
  } else {
    text('Perpendicular lines have', panelX + panelW / 2, eqY + 32);
    text('NEGATIVE RECIPROCAL slopes', panelX + panelW / 2, eqY + 46);
    text('m₁ × m₂ = -1', panelX + panelW / 2, eqY + 62);
  }

  // Instructions
  fill('#9E9E9E');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text('Use sliders to adjust Line 1', panelX + panelW / 2, panelY + panelH - 25);
  text('Line 2 adjusts automatically', panelX + panelW / 2, panelY + panelH - 10);
}

function formatEquation(slope, yInt) {
  let eq = 'y = ';

  if (slope === 0) {
    eq += yInt.toFixed(1);
  } else if (slope === 1) {
    eq += 'x';
  } else if (slope === -1) {
    eq += '-x';
  } else {
    eq += slope.toFixed(2) + 'x';
  }

  if (slope !== 0) {
    if (yInt > 0) {
      eq += ' + ' + yInt.toFixed(1);
    } else if (yInt < 0) {
      eq += ' - ' + abs(yInt).toFixed(1);
    }
  }

  return eq;
}

function drawControlPanel() {
  fill('#F5F5F5');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  stroke('#E0E0E0');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);
}

function toggleMode() {
  mode = mode === 'parallel' ? 'perpendicular' : 'parallel';
  modeBtn.html(mode === 'parallel' ? 'Parallel' : 'Perpendicular');
}

function randomLines() {
  line1Slider.value(random([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2]));
  interceptSlider.value(random([-3, -2, -1, 0, 1, 2, 3]));
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 750);
    graphWidth = canvasWidth * 0.65;
    gridScale = graphWidth / 24;
    originX = graphWidth / 2 + 10;
    originY = drawHeight / 2;
  }
}
