// Perpendicular Lines with Negative Reciprocal Slopes
// Three examples showing perpendicular line relationships

let canvasWidth = 1000;
let drawHeight = 450;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let examples = [
  {
    title: 'm₁ = 2, m₂ = -½',
    line1: { m: 2, b: 0, color: '#D32F2F' },
    line2: { m: -0.5, b: 2, color: '#1565C0' },
    calculation: '2 × (-½) = -1 ✓'
  },
  {
    title: 'm₁ = ¾, m₂ = -⁴⁄₃',
    line1: { m: 0.75, b: -1, color: '#2E7D32' },
    line2: { m: -1.333, b: 3, color: '#7B1FA2' },
    calculation: '¾ × (-⁴⁄₃) = -1 ✓'
  },
  {
    title: 'Horizontal ⊥ Vertical',
    line1: { m: 0, b: 2, color: '#E65100', isHorizontal: true },
    line2: { m: null, x: 2, color: '#00838F', isVertical: true },
    calculation: 'Special case!'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Three examples showing perpendicular lines with negative reciprocal slopes', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Perpendicular Lines: Negative Reciprocal Slopes', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over each example to highlight', canvasWidth / 2, 32);

  checkHover();
  drawExamples();

  // Footer note
  fill('#757575');
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('To find perpendicular slope: flip the fraction and change the sign', canvasWidth / 2, drawHeight - 5);
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 50) / 3;
  let startX = 15;
  let startY = 50;
  let panelH = drawHeight - 85;

  for (let i = 0; i < 3; i++) {
    let px = startX + i * (panelW + 10);
    if (mouseX > px && mouseX < px + panelW && mouseY > startY && mouseY < startY + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawExamples() {
  let panelW = (canvasWidth - 50) / 3;
  let startX = 15;
  let startY = 50;
  let panelH = drawHeight - 85;

  for (let i = 0; i < 3; i++) {
    let px = startX + i * (panelW + 10);
    let isHovered = (hoveredPanel === i);
    let ex = examples[i];

    // Panel shadow
    if (isHovered) {
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = ex.line1.color;
    }

    fill('#FFFFFF');
    stroke('#E0E0E0');
    strokeWeight(isHovered ? 2 : 1);
    rect(px, startY, panelW, panelH, 8);
    drawingContext.shadowBlur = 0;

    // Draw panel content
    drawExample(i, px + panelW / 2, startY + panelH / 2, panelW - 20, panelH - 20);
  }
}

function drawExample(exIndex, cx, cy, w, h) {
  push();
  translate(cx, cy);

  let ex = examples[exIndex];
  let gridSize = 30;
  let gridRange = 4;

  // Draw grid
  stroke('#E8E8E8');
  strokeWeight(0.5);
  for (let i = -gridRange; i <= gridRange; i++) {
    line(i * gridSize, -gridRange * gridSize, i * gridSize, gridRange * gridSize);
    line(-gridRange * gridSize, i * gridSize, gridRange * gridSize, i * gridSize);
  }

  // Axes
  stroke('#BDBDBD');
  strokeWeight(1);
  line(-gridRange * gridSize, 0, gridRange * gridSize, 0);
  line(0, -gridRange * gridSize, 0, gridRange * gridSize);

  // Draw lines
  let l1 = ex.line1;
  let l2 = ex.line2;

  // Line 1
  stroke(l1.color);
  strokeWeight(3);
  if (l1.isHorizontal) {
    line(-gridRange * gridSize, -l1.b * gridSize, gridRange * gridSize, -l1.b * gridSize);
  } else {
    let x1 = -gridRange;
    let x2 = gridRange;
    let y1 = l1.m * x1 + l1.b;
    let y2 = l1.m * x2 + l1.b;
    line(x1 * gridSize, -y1 * gridSize, x2 * gridSize, -y2 * gridSize);
  }

  // Line 2
  stroke(l2.color);
  strokeWeight(3);
  if (l2.isVertical) {
    line(l2.x * gridSize, -gridRange * gridSize, l2.x * gridSize, gridRange * gridSize);
  } else {
    let x1 = -gridRange;
    let x2 = gridRange;
    let y1 = l2.m * x1 + l2.b;
    let y2 = l2.m * x2 + l2.b;
    line(x1 * gridSize, -y1 * gridSize, x2 * gridSize, -y2 * gridSize);
  }

  // Find intersection point
  let intX, intY;
  if (exIndex === 2) {
    intX = l2.x;
    intY = l1.b;
  } else {
    // Solve m1*x + b1 = m2*x + b2
    intX = (l2.b - l1.b) / (l1.m - l2.m);
    intY = l1.m * intX + l1.b;
  }

  // Right angle symbol
  let symbolSize = 10;
  stroke('#424242');
  strokeWeight(2);
  noFill();

  let intPx = intX * gridSize;
  let intPy = -intY * gridSize;

  // Position the right angle symbol
  if (exIndex === 2) {
    // Special case for horizontal/vertical
    rect(intPx, intPy - symbolSize, symbolSize, symbolSize);
  } else {
    // Calculate perpendicular direction for the symbol
    push();
    translate(intPx, intPy);
    let angle1 = atan(l1.m);
    rotate(-angle1);
    rect(0, 0, symbolSize, -symbolSize);
    pop();
  }

  // Intersection point
  noStroke();
  fill('#424242');
  ellipse(intPx, intPy, 8, 8);

  // 90° label
  fill('#E65100');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('90°', intPx + 20, intPy - 20);
  textStyle(NORMAL);

  // Title
  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(ex.title, 0, -h / 2 + 10);
  textStyle(NORMAL);

  // Calculation box
  let calcY = h / 2 - 30;
  fill('#E8F5E9');
  stroke('#4CAF50');
  strokeWeight(1);
  rect(-w / 2 + 10, calcY - 12, w - 20, 24, 4);

  fill('#2E7D32');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
  text(ex.calculation, 0, calcY);
  textStyle(NORMAL);

  // Slope labels
  textSize(10);
  fill(l1.color);
  textAlign(LEFT, TOP);
  if (exIndex === 2) {
    text('y = 2 (m = 0)', -w / 2 + 15, -h / 2 + 35);
    fill(l2.color);
    text('x = 2 (undefined)', -w / 2 + 15, -h / 2 + 50);
  } else {
    let m1Str = exIndex === 0 ? 'm = 2' : 'm = ¾';
    let m2Str = exIndex === 0 ? 'm = -½' : 'm = -⁴⁄₃';
    text('Line 1: ' + m1Str, -w / 2 + 15, -h / 2 + 35);
    fill(l2.color);
    text('Line 2: ' + m2Str, -w / 2 + 15, -h / 2 + 50);
  }

  pop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 1000);
    canvasWidth = max(canvasWidth, 750);
  }
}
