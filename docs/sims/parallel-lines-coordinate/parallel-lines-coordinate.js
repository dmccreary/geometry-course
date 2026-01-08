// Parallel Lines in the Coordinate Plane
// Shows multiple parallel lines with equal slopes

let canvasWidth = 900;
let drawHeight = 600;
let canvasHeight = drawHeight;

let hoveredLine = -1;

let lines = [
  { equation: 'y = 2x + 4', m: 2, b: 4, color: '#D32F2F' },
  { equation: 'y = 2x', m: 2, b: 0, color: '#1565C0' },
  { equation: 'y = 2x - 3', m: 2, b: -3, color: '#2E7D32' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Diagram showing three parallel lines with equal slopes in the coordinate plane', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Parallel Lines Have Equal Slopes', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over lines to highlight', canvasWidth / 2, 32);

  checkHover();
  drawGraph();
  drawInfoPanel();
}

function checkHover() {
  hoveredLine = -1;
  let graphW = canvasWidth - 280;
  let originX = graphW / 2 + 20;
  let originY = drawHeight / 2;
  let gridScale = 30;

  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    // Check distance to line
    for (let x = -7; x <= 7; x += 0.5) {
      let y = l.m * x + l.b;
      let px = originX + x * gridScale;
      let py = originY - y * gridScale;
      if (dist(mouseX, mouseY, px, py) < 10) {
        hoveredLine = i;
        return;
      }
    }
  }
}

function drawGraph() {
  let graphW = canvasWidth - 280;
  let originX = graphW / 2 + 20;
  let originY = drawHeight / 2;
  let gridScale = 30;

  // Graph background
  fill('#FFFFFF');
  noStroke();
  rect(10, 45, graphW, drawHeight - 55, 8);

  push();
  translate(originX, originY);

  // Grid lines
  stroke('#E8E8E8');
  strokeWeight(0.5);
  for (let x = -8; x <= 8; x++) {
    line(x * gridScale, -8 * gridScale, x * gridScale, 8 * gridScale);
  }
  for (let y = -8; y <= 8; y++) {
    line(-8 * gridScale, y * gridScale, 8 * gridScale, y * gridScale);
  }

  // Axes
  stroke('#9E9E9E');
  strokeWeight(1.5);
  line(-8 * gridScale, 0, 8 * gridScale, 0);
  line(0, -8 * gridScale, 0, 8 * gridScale);

  // Axis labels
  fill('#757575');
  textSize(10);
  textAlign(CENTER, TOP);
  noStroke();
  for (let x = -8; x <= 8; x++) {
    if (x !== 0 && x % 2 === 0) text(x, x * gridScale, 5);
  }
  textAlign(RIGHT, CENTER);
  for (let y = -8; y <= 8; y++) {
    if (y !== 0 && y % 2 === 0) text(-y, -5, y * gridScale);
  }

  // Draw lines and slope triangles
  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    let isHovered = (hoveredLine === i);

    // Line
    stroke(l.color);
    strokeWeight(isHovered ? 4 : 2.5);

    let x1 = -8;
    let x2 = 8;
    let y1 = l.m * x1 + l.b;
    let y2 = l.m * x2 + l.b;

    line(x1 * gridScale, -y1 * gridScale, x2 * gridScale, -y2 * gridScale);

    // Slope triangle (from y-intercept)
    let triangleAlpha = isHovered ? 200 : 100;

    // Run
    stroke(l.color);
    strokeWeight(2);
    setLineDash([4, 2]);
    line(0, -l.b * gridScale, 1 * gridScale, -l.b * gridScale);

    // Rise
    line(1 * gridScale, -l.b * gridScale, 1 * gridScale, -(l.b + l.m) * gridScale);
    setLineDash([]);

    // Y-intercept point
    noStroke();
    fill(l.color);
    ellipse(0, -l.b * gridScale, 10, 10);

    // Equation label
    fill(l.color);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(l.equation, 3 * gridScale, -(l.b + l.m * 3) * gridScale - 12);
    textStyle(NORMAL);
  }

  // Show equal slope annotation
  noStroke();
  fill('#E65100');
  textSize(10);
  textAlign(LEFT, CENTER);
  text('All slopes = 2', 2 * gridScale, 3 * gridScale);
  text('(same steepness)', 2 * gridScale, 3 * gridScale + 14);

  pop();
}

function drawInfoPanel() {
  let panelX = canvasWidth - 260;
  let panelY = 50;
  let panelW = 250;
  let panelH = drawHeight - 60;

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
  text('Analysis', panelX + panelW / 2, panelY + 15);
  textStyle(NORMAL);

  // Table header
  let tableY = panelY + 50;
  fill('#424242');
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Line', panelX + 15, tableY);
  text('Equation', panelX + 50, tableY);
  text('m', panelX + 160, tableY);
  text('b', panelX + 195, tableY);
  textStyle(NORMAL);

  // Divider
  stroke('#E0E0E0');
  strokeWeight(1);
  line(panelX + 10, tableY + 18, panelX + panelW - 10, tableY + 18);

  // Table rows
  textSize(10);
  noStroke();
  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    let rowY = tableY + 28 + i * 22;
    let isHovered = (hoveredLine === i);

    if (isHovered) {
      fill(l.color + '20');
      noStroke();
      rect(panelX + 10, rowY - 3, panelW - 20, 20, 3);
    }

    fill(l.color);
    textAlign(LEFT, TOP);
    text((i + 1).toString(), panelX + 20, rowY);
    text(l.equation, panelX + 50, rowY);
    fill('#424242');
    text(l.m.toString(), panelX + 165, rowY);
    text(l.b.toString(), panelX + 200, rowY);
  }

  // Key observation box
  let obsY = tableY + 110;
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(1);
  rect(panelX + 10, obsY, panelW - 20, 100, 5);

  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Key Observations', panelX + panelW / 2, obsY + 10);
  textStyle(NORMAL);

  textSize(10);
  fill('#424242');
  textAlign(LEFT, TOP);
  text('• All slopes equal: m = 2', panelX + 20, obsY + 32);
  text('• Different y-intercepts: b varies', panelX + 20, obsY + 48);
  text('• Lines never intersect', panelX + 20, obsY + 64);

  fill('#2E7D32');
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('= PARALLEL', panelX + panelW / 2, obsY + 82);
  textStyle(NORMAL);

  // Theorem box
  let theoY = obsY + 120;
  fill('#FFF3E0');
  stroke('#E65100');
  strokeWeight(1);
  rect(panelX + 10, theoY, panelW - 20, 60, 5);

  fill('#E65100');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Parallel Lines Theorem', panelX + panelW / 2, theoY + 8);
  textStyle(NORMAL);

  textSize(10);
  fill('#424242');
  textAlign(CENTER, TOP);
  text('Lines are parallel if and only if', panelX + panelW / 2, theoY + 28);
  text('they have equal slopes: m₁ = m₂', panelX + panelW / 2, theoY + 42);

  // Note at bottom
  fill('#9E9E9E');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text('Same slope = same steepness = parallel', panelX + panelW / 2, panelY + panelH - 10);
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
    canvasWidth = max(canvasWidth, 700);
  }
}
