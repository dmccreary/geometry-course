// Four Types of Slope
// Visual diagram showing positive, negative, zero, and undefined slopes

let canvasWidth = 900;
let drawHeight = 700;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let panels = [
  {
    title: 'Positive Slope (m > 0)',
    color: '#D32F2F',
    bgColor: '#FFEBEE',
    icon: '↗',
    note: 'Line rises from left to right',
    p1: { x: 1, y: 2 },
    p2: { x: 4, y: 5 },
    slope: 1
  },
  {
    title: 'Negative Slope (m < 0)',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    icon: '↘',
    note: 'Line falls from left to right',
    p1: { x: 1, y: 5 },
    p2: { x: 5, y: 1 },
    slope: -1
  },
  {
    title: 'Zero Slope (m = 0)',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    icon: '→',
    note: 'Horizontal line: y = constant',
    p1: { x: 1, y: 3 },
    p2: { x: 6, y: 3 },
    slope: 0
  },
  {
    title: 'Undefined Slope',
    color: '#E65100',
    bgColor: '#FFF3E0',
    icon: '↑',
    note: 'Vertical line: x = constant',
    p1: { x: 4, y: 1 },
    p2: { x: 4, y: 5 },
    slope: 'undefined'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Four-panel diagram showing positive, negative, zero, and undefined slope types', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Four Types of Slope', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over each panel to highlight', canvasWidth / 2, 35);

  checkHover();
  drawPanels();
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 45) / 2;
  let panelH = (drawHeight - 90) / 2;
  let startX = 15;
  let startY = 55;
  let gap = 15;

  for (let i = 0; i < 4; i++) {
    let row = floor(i / 2);
    let col = i % 2;
    let px = startX + col * (panelW + gap);
    let py = startY + row * (panelH + gap);
    if (mouseX > px && mouseX < px + panelW && mouseY > py && mouseY < py + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 45) / 2;
  let panelH = (drawHeight - 90) / 2;
  let startX = 15;
  let startY = 55;
  let gap = 15;

  for (let i = 0; i < 4; i++) {
    let row = floor(i / 2);
    let col = i % 2;
    let px = startX + col * (panelW + gap);
    let py = startY + row * (panelH + gap);
    let isHovered = (hoveredPanel === i);
    let p = panels[i];

    // Panel shadow
    if (isHovered) {
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = p.color;
    }

    // Panel background
    fill(p.bgColor);
    stroke(p.color);
    strokeWeight(isHovered ? 3 : 1.5);
    rect(px, py, panelW, panelH, 8);
    drawingContext.shadowBlur = 0;

    // Panel header
    fill(p.color);
    noStroke();
    rect(px, py, panelW, 30, 8, 8, 0, 0);

    fill('#FFFFFF');
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(p.title, px + panelW / 2, py + 15);
    textStyle(NORMAL);

    // Draw panel content
    drawPanelContent(i, px + panelW / 2, py + panelH / 2 + 20, panelW - 30, panelH - 80);
  }
}

function drawPanelContent(panelIndex, cx, cy, w, h) {
  push();
  translate(cx, cy);

  let p = panels[panelIndex];
  let gridSize = 30;
  let gridW = 7;
  let gridH = 6;
  let gridOffX = -gridW * gridSize / 2;
  let gridOffY = -gridH * gridSize / 2 - 10;

  // Draw grid
  stroke('#E0E0E0');
  strokeWeight(0.5);
  for (let i = 0; i <= gridW; i++) {
    line(gridOffX + i * gridSize, gridOffY, gridOffX + i * gridSize, gridOffY + gridH * gridSize);
  }
  for (let j = 0; j <= gridH; j++) {
    line(gridOffX, gridOffY + j * gridSize, gridOffX + gridW * gridSize, gridOffY + j * gridSize);
  }

  // Calculate pixel positions
  let x1 = gridOffX + p.p1.x * gridSize;
  let y1 = gridOffY + (gridH - p.p1.y) * gridSize;
  let x2 = gridOffX + p.p2.x * gridSize;
  let y2 = gridOffY + (gridH - p.p2.y) * gridSize;

  // Draw rise/run arrows
  let rise = p.p2.y - p.p1.y;
  let run = p.p2.x - p.p1.x;

  if (panelIndex !== 3) { // Not undefined slope
    // Run arrow (blue, horizontal)
    if (run !== 0) {
      stroke('#1976D2');
      strokeWeight(3);
      line(x1, y1, x2, y1);
      // Arrow head
      let dir = run > 0 ? 1 : -1;
      line(x2 - dir * 8, y1 - 6, x2, y1);
      line(x2 - dir * 8, y1 + 6, x2, y1);

      // Run label
      fill('#1976D2');
      noStroke();
      textSize(11);
      textAlign(CENTER, TOP);
      text(`Run = ${abs(run)}`, (x1 + x2) / 2, y1 + 5);
    }

    // Rise arrow (green or orange)
    if (rise !== 0) {
      let riseColor = rise > 0 ? '#4CAF50' : '#FF9800';
      stroke(riseColor);
      strokeWeight(3);
      line(x2, y1, x2, y2);
      // Arrow head
      let dir = rise > 0 ? -1 : 1;
      line(x2 - 6, y2 + dir * 8, x2, y2);
      line(x2 + 6, y2 + dir * 8, x2, y2);

      // Rise label
      fill(riseColor);
      noStroke();
      textSize(11);
      textAlign(LEFT, CENTER);
      text(`Rise = ${rise}`, x2 + 8, (y1 + y2) / 2);
    }
  } else {
    // Undefined slope - show run = 0
    fill('#FF9800');
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Run = 0', x2 + 8, (y1 + y2) / 2 + 20);
    text('(division by zero!)', x2 + 8, (y1 + y2) / 2 + 35);

    // Rise arrow
    stroke('#4CAF50');
    strokeWeight(3);
    line(x2, y1, x2, y2);
    let dir = -1;
    line(x2 - 6, y2 + dir * 8, x2, y2);
    line(x2 + 6, y2 + dir * 8, x2, y2);

    fill('#4CAF50');
    noStroke();
    textAlign(LEFT, CENTER);
    text(`Rise = ${rise}`, x2 + 8, (y1 + y2) / 2);
  }

  // Draw line
  stroke(p.color);
  strokeWeight(3);
  if (panelIndex === 3) {
    // Vertical line
    line(x2, gridOffY, x2, gridOffY + gridH * gridSize);
  } else if (panelIndex === 2) {
    // Horizontal line
    line(gridOffX, y1, gridOffX + gridW * gridSize, y1);
  } else {
    // Angled line - extend beyond points
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len = 200;
    let angle = atan2(dy, dx);
    line(x1 - len * cos(angle), y1 - len * sin(angle), x2 + len * cos(angle), y2 + len * sin(angle));
  }

  // Draw points
  noStroke();
  fill(p.color);
  ellipse(x1, y1, 12, 12);
  ellipse(x2, y2, 12, 12);

  // Point labels
  textSize(10);
  fill('#424242');
  textAlign(LEFT, BOTTOM);
  text(`(${p.p1.x}, ${p.p1.y})`, x1 + 8, y1 - 3);
  text(`(${p.p2.x}, ${p.p2.y})`, x2 + 8, y2 - 3);

  // Calculation box
  let calcY = h / 2 - 25;
  fill('#FFFFFF');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(-w / 2 + 10, calcY - 10, w - 20, 40, 5);

  fill('#424242');
  textSize(12);
  textAlign(CENTER, CENTER);
  noStroke();

  if (panelIndex === 3) {
    text(`m = ${rise}/${run} = undefined`, 0, calcY + 5);
  } else if (panelIndex === 2) {
    text(`m = ${rise}/${run} = 0`, 0, calcY + 5);
  } else {
    text(`m = ${rise}/${run} = ${p.slope}`, 0, calcY + 5);
  }

  // Note at bottom
  fill(p.color);
  textSize(10);
  textStyle(BOLD);
  text(p.note, 0, calcY + 28);
  textStyle(NORMAL);

  pop();
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
