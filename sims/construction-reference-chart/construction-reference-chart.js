// Construction Techniques Reference Chart
// Summary of all compass and straightedge construction methods

let canvasWidth = 950;
let drawHeight = 650;
let canvasHeight = drawHeight;

let hoveredTechnique = -1;

let techniques = [
  {
    name: 'Copy Segment',
    shortDesc: 'Create congruent segment',
    steps: '1. Draw ray from new point\n2. Set compass to original length\n3. Mark arc on ray',
    color: '#1565C0',
    bgColor: '#E3F2FD'
  },
  {
    name: 'Copy Angle',
    shortDesc: 'Create congruent angle',
    steps: '1. Arc from vertex on original\n2. Same arc on new location\n3. Transfer arc distance\n4. Draw ray through intersection',
    color: '#2E7D32',
    bgColor: '#E8F5E9'
  },
  {
    name: 'Bisect Segment',
    shortDesc: 'Find midpoint',
    steps: '1. Arc from one endpoint\n2. Arc from other endpoint\n3. Connect intersections\n4. Creates perpendicular bisector',
    color: '#7B1FA2',
    bgColor: '#F3E5F5'
  },
  {
    name: 'Bisect Angle',
    shortDesc: 'Divide angle in half',
    steps: '1. Arc from vertex\n2. Arcs from intersection points\n3. Draw ray through new intersection',
    color: '#E65100',
    bgColor: '#FFF3E0'
  },
  {
    name: 'Perpendicular Through Point',
    shortDesc: 'Perpendicular at point on line',
    steps: '1. Arc both sides from point\n2. Arcs from new points\n3. Connect to form perpendicular',
    color: '#C62828',
    bgColor: '#FFEBEE'
  },
  {
    name: 'Perpendicular To Line',
    shortDesc: 'Perpendicular from external point',
    steps: '1. Arc crossing line at 2 points\n2. Arcs from crossing points\n3. Connect through original point',
    color: '#00838F',
    bgColor: '#E0F7FA'
  },
  {
    name: 'Parallel Line',
    shortDesc: 'Line through point parallel to given line',
    steps: '1. Draw transversal\n2. Copy angle at intersection\n3. Line through point is parallel',
    color: '#6A1B9A',
    bgColor: '#EDE7F6'
  },
  {
    name: 'Equilateral Triangle',
    shortDesc: 'Triangle with equal sides',
    steps: '1. Draw base segment\n2. Arcs from both endpoints\n3. Connect to intersection',
    color: '#1B5E20',
    bgColor: '#E8F5E9'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Reference chart showing eight construction techniques with descriptions and steps', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Construction Techniques Reference Chart', canvasWidth / 2, 12);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Hover over each technique to see the construction steps', canvasWidth / 2, 42);

  checkHover();
  drawGrid();
  drawInfoPanel();
}

function checkHover() {
  hoveredTechnique = -1;
  let cardW = (canvasWidth - 100) / 4;
  let cardH = 180;
  let startY = 70;
  let gap = 15;

  for (let i = 0; i < 8; i++) {
    let col = i % 4;
    let row = floor(i / 4);
    let cx = 30 + col * (cardW + gap);
    let cy = startY + row * (cardH + gap);

    if (mouseX > cx && mouseX < cx + cardW && mouseY > cy && mouseY < cy + cardH) {
      hoveredTechnique = i;
      return;
    }
  }
}

function drawGrid() {
  let cardW = (canvasWidth - 100) / 4;
  let cardH = 180;
  let startY = 70;
  let gap = 15;

  for (let i = 0; i < 8; i++) {
    let col = i % 4;
    let row = floor(i / 4);
    let cx = 30 + col * (cardW + gap);
    let cy = startY + row * (cardH + gap);

    drawCard(i, cx, cy, cardW, cardH);
  }
}

function drawCard(index, x, y, w, h) {
  let tech = techniques[index];
  let isHovered = (hoveredTechnique === index);

  // Card shadow
  if (isHovered) {
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = tech.color;
  }

  fill(tech.bgColor);
  stroke(tech.color);
  strokeWeight(isHovered ? 4 : 2);
  rect(x, y, w, h, 10);
  drawingContext.shadowBlur = 0;

  // Number badge
  fill(tech.color);
  noStroke();
  ellipse(x + 25, y + 25, 30, 30);
  fill(255);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(index + 1, x + 25, y + 25);
  textStyle(NORMAL);

  // Name
  fill(tech.color);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(tech.name, x + w / 2, y + 50);
  textStyle(NORMAL);

  // Short description
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);
  text(tech.shortDesc, x + w / 2, y + 75);

  // Mini diagram placeholder
  drawMiniDiagram(index, x + w / 2, y + 125, 40);

  // Hover indicator
  if (isHovered) {
    fill(tech.color);
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('See steps below ↓', x + w / 2, y + h - 8);
    textStyle(NORMAL);
  }
}

function drawMiniDiagram(index, cx, cy, size) {
  push();
  translate(cx, cy);

  let tech = techniques[index];
  stroke(tech.color);
  strokeWeight(2);
  noFill();

  switch (index) {
    case 0: // Copy Segment
      line(-size, 0, size, 0);
      fill(tech.color);
      noStroke();
      ellipse(-size, 0, 6, 6);
      ellipse(size, 0, 6, 6);
      break;

    case 1: // Copy Angle
      line(-size, size / 2, 0, size / 2);
      line(0, size / 2, size / 2, -size / 2);
      noFill();
      arc(0, size / 2, size, size, -PI / 2, 0);
      break;

    case 2: // Bisect Segment
      line(-size, 0, size, 0);
      line(0, -size, 0, size);
      fill(tech.color);
      noStroke();
      ellipse(0, 0, 6, 6);
      break;

    case 3: // Bisect Angle
      line(-size, size / 2, 0, size / 2);
      line(0, size / 2, size / 2, -size / 2);
      stroke(tech.color);
      setLineDash([3, 3]);
      line(0, size / 2, size * 0.7, 0);
      setLineDash([]);
      break;

    case 4: // Perpendicular Through
      line(-size, 0, size, 0);
      line(0, -size, 0, size / 2);
      fill(tech.color);
      noStroke();
      ellipse(0, 0, 6, 6);
      break;

    case 5: // Perpendicular To
      line(-size, size / 2, size, size / 2);
      fill(tech.color);
      noStroke();
      ellipse(0, -size / 2, 6, 6);
      stroke(tech.color);
      line(0, -size / 2, 0, size / 2);
      break;

    case 6: // Parallel Line
      line(-size, -size / 3, size, -size / 3);
      line(-size, size / 3, size, size / 3);
      // Parallel markers
      fill(tech.color);
      noStroke();
      triangle(size / 3, -size / 3 - 4, size / 3, -size / 3 + 4, size / 3 + 6, -size / 3);
      triangle(size / 3, size / 3 - 4, size / 3, size / 3 + 4, size / 3 + 6, size / 3);
      break;

    case 7: // Equilateral Triangle
      noFill();
      stroke(tech.color);
      triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
      break;
  }

  pop();
}

function drawInfoPanel() {
  if (hoveredTechnique < 0) return;

  let tech = techniques[hoveredTechnique];
  let panelY = 460;
  let panelH = 170;

  // Panel background
  fill(tech.bgColor);
  stroke(tech.color);
  strokeWeight(3);
  rect(30, panelY, canvasWidth - 60, panelH, 10);

  // Title
  noStroke();
  fill(tech.color);
  textSize(18);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(tech.name, 60, panelY + 20);
  textStyle(NORMAL);

  // Steps
  fill('#424242');
  textSize(13);
  textAlign(LEFT, TOP);

  let steps = tech.steps.split('\n');
  let stepY = panelY + 55;
  for (let step of steps) {
    text(step, 60, stepY);
    stepY += 25;
  }

  // Key insight
  fill(tech.color);
  textSize(12);
  textStyle(BOLD);
  textAlign(RIGHT, TOP);
  text('Construction #' + (hoveredTechnique + 1), canvasWidth - 60, panelY + 20);
  textStyle(NORMAL);
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
    canvasWidth = min(container.offsetWidth, 1000);
    canvasWidth = max(canvasWidth, 800);
  }
}
