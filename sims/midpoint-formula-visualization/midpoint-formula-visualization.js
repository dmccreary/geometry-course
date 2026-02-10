// Midpoint Formula Visualization
// Two-panel comparison showing midpoint calculation

let canvasWidth = 900;
let drawHeight = 450;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

// Example points
let pointA = { x: 2, y: 1 };
let pointB = { x: 8, y: 7 };
let midpoint = { x: 5, y: 4 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Two-panel diagram showing midpoint formula visualization with coordinate grid and calculation steps', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Midpoint Formula: Finding the Average Position', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over panels to highlight', canvasWidth / 2, 32);

  checkHover();
  drawPanels();
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 40) / 2;
  let startX = 15;
  let startY = 50;
  let panelH = drawHeight - 65;

  for (let i = 0; i < 2; i++) {
    let px = startX + i * (panelW + 10);
    if (mouseX > px && mouseX < px + panelW && mouseY > startY && mouseY < startY + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 40) / 2;
  let startX = 15;
  let startY = 50;
  let panelH = drawHeight - 65;

  let panelInfo = [
    { title: 'Visual Representation', color: '#1565C0' },
    { title: 'Calculation Steps', color: '#2E7D32' }
  ];

  for (let i = 0; i < 2; i++) {
    let px = startX + i * (panelW + 10);
    let isHovered = (hoveredPanel === i);

    // Panel shadow
    if (isHovered) {
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = panelInfo[i].color;
    }

    fill('#FFFFFF');
    stroke(panelInfo[i].color);
    strokeWeight(isHovered ? 3 : 1.5);
    rect(px, startY, panelW, panelH, 8);
    drawingContext.shadowBlur = 0;

    // Panel header
    fill(panelInfo[i].color);
    noStroke();
    rect(px, startY, panelW, 32, 8, 8, 0, 0);

    fill('#FFFFFF');
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(panelInfo[i].title, px + panelW / 2, startY + 16);
    textStyle(NORMAL);

    // Panel content
    if (i === 0) {
      drawVisualPanel(px + panelW / 2, startY + panelH / 2 + 20, panelW - 20, panelH - 60);
    } else {
      drawCalculationPanel(px + panelW / 2, startY + panelH / 2 + 20, panelW - 20, panelH - 60);
    }
  }
}

function drawVisualPanel(cx, cy, w, h) {
  push();
  translate(cx, cy);

  let gridSize = 28;
  let gridW = 10;
  let gridH = 9;
  let gridOffX = -gridW * gridSize / 2;
  let gridOffY = -gridH * gridSize / 2;

  // Draw grid
  stroke('#E0E0E0');
  strokeWeight(0.5);
  for (let i = 0; i <= gridW; i++) {
    line(gridOffX + i * gridSize, gridOffY, gridOffX + i * gridSize, gridOffY + gridH * gridSize);
  }
  for (let j = 0; j <= gridH; j++) {
    line(gridOffX, gridOffY + j * gridSize, gridOffX + gridW * gridSize, gridOffY + j * gridSize);
  }

  // Axis labels
  fill('#9E9E9E');
  textSize(9);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= gridW; i++) {
    text(i, gridOffX + i * gridSize, gridOffY + gridH * gridSize + 3);
  }
  textAlign(RIGHT, CENTER);
  for (let j = 0; j <= gridH; j++) {
    text(gridH - j, gridOffX - 5, gridOffY + j * gridSize);
  }

  // Calculate pixel positions
  let ax = gridOffX + pointA.x * gridSize;
  let ay = gridOffY + (gridH - pointA.y) * gridSize;
  let bx = gridOffX + pointB.x * gridSize;
  let by = gridOffY + (gridH - pointB.y) * gridSize;
  let mx = gridOffX + midpoint.x * gridSize;
  let my = gridOffY + (gridH - midpoint.y) * gridSize;

  // Segment AB
  stroke('#9E9E9E');
  strokeWeight(2);
  line(ax, ay, bx, by);

  // Dashed guides to axes
  stroke('#CE93D8');
  strokeWeight(1);
  setLineDash([4, 3]);
  // From A
  line(ax, ay, ax, gridOffY + gridH * gridSize);
  line(ax, ay, gridOffX, ay);
  // From B
  line(bx, by, bx, gridOffY + gridH * gridSize);
  line(bx, by, gridOffX, by);
  // From M
  stroke('#66BB6A');
  line(mx, my, mx, gridOffY + gridH * gridSize);
  line(mx, my, gridOffX, my);
  setLineDash([]);

  // Equal distance marks
  stroke('#FF5722');
  strokeWeight(2);
  let tickLen = 6;
  // Tick marks on segment
  let d1x = (ax + mx) / 2;
  let d1y = (ay + my) / 2;
  let d2x = (bx + mx) / 2;
  let d2y = (by + my) / 2;
  let angle = atan2(by - ay, bx - ax);

  push();
  translate(d1x, d1y);
  rotate(angle + HALF_PI);
  line(-tickLen, 0, tickLen, 0);
  line(-tickLen + 3, -3, -tickLen, 0);
  line(-tickLen + 3, 3, -tickLen, 0);
  pop();

  push();
  translate(d2x, d2y);
  rotate(angle + HALF_PI);
  line(-tickLen, 0, tickLen, 0);
  line(-tickLen + 3, -3, -tickLen, 0);
  line(-tickLen + 3, 3, -tickLen, 0);
  pop();

  // Points
  noStroke();
  // Point A (blue)
  fill('#1565C0');
  ellipse(ax, ay, 14, 14);
  // Point B (red)
  fill('#D32F2F');
  ellipse(bx, by, 14, 14);
  // Midpoint M (green, highlighted)
  fill('#4CAF50');
  ellipse(mx, my, 18, 18);
  // Glow effect
  fill(76, 175, 80, 50);
  ellipse(mx, my, 28, 28);

  // Labels
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  fill('#1565C0');
  text('A(2, 1)', ax + 10, ay + 3);
  fill('#D32F2F');
  text('B(8, 7)', bx - 45, by - 3);
  fill('#2E7D32');
  textAlign(CENTER, BOTTOM);
  text('M(5, 4)', mx, my - 14);
  textStyle(NORMAL);

  // Equal distance labels
  textSize(9);
  fill('#FF5722');
  textAlign(CENTER, CENTER);
  text('AM = MB', 0, h / 2 - 25);

  pop();
}

function drawCalculationPanel(cx, cy, w, h) {
  push();
  translate(cx, cy);

  let lineH = 32;
  let startY = -h / 2 + 30;

  // Formula box
  fill('#E3F2FD');
  stroke('#1565C0');
  strokeWeight(1);
  rect(-w / 2 + 20, startY - 15, w - 40, 35, 5);

  fill('#1565C0');
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('M = ((x₁ + x₂)/2, (y₁ + y₂)/2)', 0, startY + 2);
  textStyle(NORMAL);

  startY += 50;

  // Calculation steps
  textSize(13);
  textAlign(LEFT, CENTER);
  let steps = [
    { label: 'Substitution:', text: 'M = ((2 + 8)/2, (1 + 7)/2)', color: '#424242' },
    { label: 'Simplification:', text: 'M = (10/2, 8/2)', color: '#424242' },
    { label: 'Result:', text: 'M = (5, 4)', color: '#2E7D32', bold: true }
  ];

  for (let i = 0; i < steps.length; i++) {
    fill('#757575');
    textStyle(NORMAL);
    text(steps[i].label, -w / 2 + 30, startY + i * lineH);
    fill(steps[i].color);
    if (steps[i].bold) textStyle(BOLD);
    text(steps[i].text, -w / 2 + 140, startY + i * lineH);
    textStyle(NORMAL);
  }

  // Verification box
  startY += 3.5 * lineH;
  fill('#E8F5E9');
  stroke('#4CAF50');
  strokeWeight(1);
  rect(-w / 2 + 20, startY - 15, w - 40, 80, 5);

  fill('#2E7D32');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Verification', 0, startY);
  textStyle(NORMAL);

  textSize(11);
  textAlign(LEFT, CENTER);
  fill('#424242');
  text('Check x: 5 is halfway between 2 and 8  ✓', -w / 2 + 35, startY + 22);
  text('Check y: 4 is halfway between 1 and 7  ✓', -w / 2 + 35, startY + 44);

  pop();
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
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 650);
  }
}
