// Transversal Coordinate Analysis
// Analyze transversal-parallel line configurations using coordinate geometry

let canvasWidth = 1000;
let drawHeight = 700;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let graphWidth = 680;
let gridScale = 28;
let originX, originY;

// Line parameters: y = mx + b
let m_parallel = 1.5;  // Slope for parallel lines
let b1 = 3;            // Y-intercept for Line 1
let b2 = -2;           // Y-intercept for Line 2
let m_trans = -0.5;    // Transversal slope
let b_trans = 4;       // Transversal y-intercept

let parallelSlider, transSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = graphWidth / 2 + 10;
  originY = drawHeight / 2;

  // Create controls
  let ctrlY = drawHeight + 15;

  let pLabel = createSpan('Parallel slope:');
  pLabel.position(20, ctrlY);
  pLabel.style('font-family', 'Arial');
  pLabel.style('font-size', '13px');
  pLabel.parent(document.querySelector('main'));

  parallelSlider = createSlider(-2, 2, 1.5, 0.25);
  parallelSlider.position(120, ctrlY + 2);
  parallelSlider.style('width', '120px');
  parallelSlider.parent(document.querySelector('main'));

  let tLabel = createSpan('Transversal slope:');
  tLabel.position(280, ctrlY);
  tLabel.style('font-family', 'Arial');
  tLabel.style('font-size', '13px');
  tLabel.parent(document.querySelector('main'));

  transSlider = createSlider(-2, 2, -0.5, 0.25);
  transSlider.position(410, ctrlY + 2);
  transSlider.style('width', '120px');
  transSlider.parent(document.querySelector('main'));

  let randomBtn = createButton('Random');
  randomBtn.position(570, ctrlY - 3);
  randomBtn.mousePressed(randomize);
  randomBtn.parent(document.querySelector('main'));

  describe('Coordinate plane showing transversal cutting parallel lines with angle analysis', LABEL);
}

function draw() {
  updateCanvasSize();

  m_parallel = parallelSlider.value();
  m_trans = transSlider.value();

  background('#FAFAFA');

  // Graph area
  fill('#FFFFFF');
  noStroke();
  rect(0, 0, graphWidth, drawHeight);

  drawGrid();
  drawLinesAndAngles();
  drawAnalysisPanel();
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

function drawLinesAndAngles() {
  push();
  translate(originX, originY);

  // Draw parallel lines
  let x1 = -10, x2 = 10;

  // Line 1 (parallel)
  stroke('#1976D2');
  strokeWeight(3);
  let y1a = m_parallel * x1 + b1;
  let y1b = m_parallel * x2 + b1;
  line(x1 * gridScale, -y1a * gridScale, x2 * gridScale, -y1b * gridScale);

  // Line 2 (parallel)
  stroke('#42A5F5');
  strokeWeight(3);
  let y2a = m_parallel * x1 + b2;
  let y2b = m_parallel * x2 + b2;
  line(x1 * gridScale, -y2a * gridScale, x2 * gridScale, -y2b * gridScale);

  // Transversal
  stroke('#D32F2F');
  strokeWeight(3);
  let yta = m_trans * x1 + b_trans;
  let ytb = m_trans * x2 + b_trans;
  line(x1 * gridScale, -yta * gridScale, x2 * gridScale, -ytb * gridScale);

  // Calculate intersection points
  // Line 1 ∩ Transversal: m_parallel * x + b1 = m_trans * x + b_trans
  let intA_x = (b_trans - b1) / (m_parallel - m_trans);
  let intA_y = m_parallel * intA_x + b1;

  // Line 2 ∩ Transversal
  let intB_x = (b_trans - b2) / (m_parallel - m_trans);
  let intB_y = m_parallel * intB_x + b2;

  // Draw intersection points
  noStroke();
  fill('#424242');
  ellipse(intA_x * gridScale, -intA_y * gridScale, 10, 10);
  ellipse(intB_x * gridScale, -intB_y * gridScale, 10, 10);

  // Calculate angle between transversal and parallel lines
  let angleDeg = calculateAngle(m_parallel, m_trans);

  // Draw angle arcs at intersections
  let arcRadius = 25;

  // At intersection A
  let baseAngle1 = atan(m_parallel);
  let transAngle = atan(m_trans);

  // Draw angle arc at A
  noFill();
  stroke('#4CAF50');
  strokeWeight(2);
  let a1 = -baseAngle1;
  let a2 = -transAngle;
  arc(intA_x * gridScale, -intA_y * gridScale, arcRadius * 2, arcRadius * 2, min(a1, a2), max(a1, a2));

  // Angle label at A
  noStroke();
  fill('#2E7D32');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let midAngle = (a1 + a2) / 2;
  text(angleDeg.toFixed(0) + '°', intA_x * gridScale + 35 * cos(midAngle), -intA_y * gridScale + 35 * sin(midAngle));
  textStyle(NORMAL);

  // Draw similar arc at B
  stroke('#4CAF50');
  strokeWeight(2);
  noFill();
  arc(intB_x * gridScale, -intB_y * gridScale, arcRadius * 2, arcRadius * 2, min(a1, a2), max(a1, a2));

  noStroke();
  fill('#2E7D32');
  textSize(10);
  textStyle(BOLD);
  text(angleDeg.toFixed(0) + '°', intB_x * gridScale + 35 * cos(midAngle), -intB_y * gridScale + 35 * sin(midAngle));
  textStyle(NORMAL);

  // Point labels
  fill('#424242');
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);
  text('A', intA_x * gridScale + 8, -intA_y * gridScale - 8);
  text('B', intB_x * gridScale + 8, -intB_y * gridScale - 8);
  textStyle(NORMAL);

  // Line labels
  textSize(10);
  fill('#1976D2');
  textAlign(LEFT, BOTTOM);
  text('Line 1 (m = ' + m_parallel.toFixed(2) + ')', -8 * gridScale, -(m_parallel * (-8) + b1) * gridScale - 8);

  fill('#42A5F5');
  text('Line 2 (m = ' + m_parallel.toFixed(2) + ')', -8 * gridScale, -(m_parallel * (-8) + b2) * gridScale - 8);

  fill('#D32F2F');
  text('Transversal (m = ' + m_trans.toFixed(2) + ')', 4 * gridScale, -(m_trans * 4 + b_trans) * gridScale - 8);

  pop();
}

function calculateAngle(m1, m2) {
  // Calculate angle between two lines using slopes
  let tanTheta = abs((m2 - m1) / (1 + m1 * m2));
  let angleRad = atan(tanTheta);
  return degrees(angleRad);
}

function drawAnalysisPanel() {
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
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Transversal Analysis', panelX + panelW / 2, panelY + 12);
  textStyle(NORMAL);

  // Equations section
  let y = panelY + 45;

  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Equations:', panelX + 15, y);
  textStyle(NORMAL);

  y += 22;
  textSize(11);
  fill('#1976D2');
  text('Line 1: y = ' + m_parallel.toFixed(2) + 'x + ' + b1, panelX + 15, y);

  y += 18;
  fill('#42A5F5');
  text('Line 2: y = ' + m_parallel.toFixed(2) + 'x + ' + b2, panelX + 15, y);

  y += 18;
  fill('#D32F2F');
  text('Trans: y = ' + m_trans.toFixed(2) + 'x + ' + b_trans, panelX + 15, y);

  // Parallel verification
  y += 30;
  fill('#E8F5E9');
  stroke('#4CAF50');
  strokeWeight(1);
  rect(panelX + 10, y, panelW - 20, 45, 5);

  fill('#2E7D32');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Parallel Verification', panelX + panelW / 2, y + 8);
  textStyle(NORMAL);

  textSize(10);
  text('m₁ = m₂ = ' + m_parallel.toFixed(2) + ' ✓', panelX + panelW / 2, y + 28);

  // Intersection points
  y += 60;
  let intA_x = (b_trans - b1) / (m_parallel - m_trans);
  let intA_y = m_parallel * intA_x + b1;
  let intB_x = (b_trans - b2) / (m_parallel - m_trans);
  let intB_y = m_parallel * intB_x + b2;

  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Intersections:', panelX + 15, y);
  textStyle(NORMAL);

  y += 20;
  textSize(10);
  text('A: (' + intA_x.toFixed(2) + ', ' + intA_y.toFixed(2) + ')', panelX + 15, y);
  y += 16;
  text('B: (' + intB_x.toFixed(2) + ', ' + intB_y.toFixed(2) + ')', panelX + 15, y);

  // Angle analysis
  y += 30;
  let angleDeg = calculateAngle(m_parallel, m_trans);

  fill('#FFF3E0');
  stroke('#E65100');
  strokeWeight(1);
  rect(panelX + 10, y, panelW - 20, 80, 5);

  fill('#E65100');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Angle Measures', panelX + panelW / 2, y + 8);
  textStyle(NORMAL);

  textSize(10);
  fill('#424242');
  let suppAngle = 180 - angleDeg;
  text('Acute angle: ' + angleDeg.toFixed(1) + '°', panelX + panelW / 2, y + 28);
  text('Obtuse angle: ' + suppAngle.toFixed(1) + '°', panelX + panelW / 2, y + 44);

  fill('#E65100');
  textSize(9);
  text('(Corresponding angles equal!)', panelX + panelW / 2, y + 62);

  // Angle relationships
  y += 95;
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(1);
  rect(panelX + 10, y, panelW - 20, 90, 5);

  fill('#1565C0');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Angle Relationships', panelX + panelW / 2, y + 8);
  textStyle(NORMAL);

  textSize(9);
  fill('#424242');
  textAlign(LEFT, TOP);
  text('• Corresponding ∠s equal ✓', panelX + 20, y + 28);
  text('• Alternate interior ∠s equal ✓', panelX + 20, y + 44);
  text('• Same-side interior ∠s = 180° ✓', panelX + 20, y + 60);
  text('  (' + angleDeg.toFixed(1) + '° + ' + suppAngle.toFixed(1) + '° = 180°)', panelX + 20, y + 74);

  // Key concept
  fill('#9E9E9E');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text('When lines are parallel, special', panelX + panelW / 2, panelY + panelH - 25);
  text('angle relationships always hold!', panelX + panelW / 2, panelY + panelH - 10);
}

function drawControlPanel() {
  fill('#F5F5F5');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  stroke('#E0E0E0');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);
}

function randomize() {
  parallelSlider.value(random([-1.5, -1, -0.5, 0.5, 1, 1.5]));
  transSlider.value(random([-1.5, -1, -0.5, 0.5, 1, 1.5]));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 1000);
    canvasWidth = max(canvasWidth, 800);
    graphWidth = canvasWidth * 0.68;
    gridScale = graphWidth / 24;
    originX = graphWidth / 2 + 10;
    originY = drawHeight / 2;
  }
}
