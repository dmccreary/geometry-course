// Angle Relationships Summary Chart
// 2x2 grid showing all four angle relationships with parallel lines

let canvasWidth = 900;
let drawHeight = 550;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let relationships = [
  {
    title: "Corresponding Angles",
    property: "CONGRUENT",
    symbol: "≅",
    example: "∠1 = ∠5",
    pairs: "∠1&∠5, ∠2&∠6, ∠3&∠7, ∠4&∠8",
    description: "Same position at each intersection",
    color: "#E8F5E9",
    borderColor: "#43A047",
    highlightAngles: [1, 5]
  },
  {
    title: "Alternate Interior Angles",
    property: "CONGRUENT",
    symbol: "≅",
    example: "∠3 = ∠6",
    pairs: "∠3&∠6, ∠4&∠5",
    description: "Opposite sides, between parallel lines",
    color: "#FFF9C4",
    borderColor: "#FBC02D",
    highlightAngles: [3, 6]
  },
  {
    title: "Alternate Exterior Angles",
    property: "CONGRUENT",
    symbol: "≅",
    example: "∠1 = ∠8",
    pairs: "∠1&∠8, ∠2&∠7",
    description: "Opposite sides, outside parallel lines",
    color: "#FFE0B2",
    borderColor: "#FF9800",
    highlightAngles: [1, 8]
  },
  {
    title: "Same-Side Interior Angles",
    property: "SUPPLEMENTARY",
    symbol: "+",
    example: "∠3 + ∠5 = 180°",
    pairs: "∠3&∠5, ∠4&∠6",
    description: "Same side, between parallel lines",
    color: "#E1BEE7",
    borderColor: "#7B1FA2",
    highlightAngles: [3, 5]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Summary chart showing four angle relationships with parallel lines and transversals', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Relationships with Parallel Lines', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('When parallel lines are cut by a transversal', canvasWidth / 2, 38);

  // Check hover
  checkHover();

  // Draw 2x2 grid
  let panelW = (canvasWidth - 60) / 2;
  let panelH = 230;
  let startY = 60;
  let gap = 15;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let px = 20 + col * (panelW + gap);
    let py = startY + row * (panelH + gap);
    drawPanel(i, px, py, panelW, panelH);
  }
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 60) / 2;
  let panelH = 230;
  let startY = 60;
  let gap = 15;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let px = 20 + col * (panelW + gap);
    let py = startY + row * (panelH + gap);

    if (mouseX > px && mouseX < px + panelW && mouseY > py && mouseY < py + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanel(index, px, py, pw, ph) {
  let rel = relationships[index];
  let isHovered = (hoveredPanel === index);

  // Panel background
  fill(rel.color);
  stroke(rel.borderColor);
  strokeWeight(isHovered ? 4 : 2);
  if (isHovered) {
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = rel.borderColor;
  }
  rect(px, py, pw, ph, 12);
  drawingContext.shadowBlur = 0;

  // Title
  noStroke();
  fill(rel.borderColor);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(rel.title, px + pw / 2, py + 10);
  textStyle(NORMAL);

  // Mini diagram
  let diagX = px + 80;
  let diagY = py + 100;
  drawMiniDiagram(diagX, diagY, rel.highlightAngles, rel.borderColor);

  // Property badge
  let badgeX = px + pw - 100;
  let badgeY = py + 50;
  fill(rel.borderColor);
  noStroke();
  rect(badgeX, badgeY, 85, 28, 14);
  fill(255);
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(rel.property, badgeX + 42, badgeY + 14);
  textStyle(NORMAL);

  // Symbol
  fill(rel.borderColor);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(rel.symbol, px + pw - 55, py + 110);

  // Example equation
  fill('#212121');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(rel.example, px + pw - 130, py + 140);
  textStyle(NORMAL);

  // Pairs
  fill('#616161');
  textSize(10);
  text('Pairs: ' + rel.pairs, px + 15, py + ph - 45);

  // Description
  fill('#424242');
  textSize(11);
  text(rel.description, px + 15, py + ph - 25);
}

function drawMiniDiagram(cx, cy, highlightAngles, highlightColor) {
  let lineLen = 55;
  let spacing = 40;

  // Parallel lines
  stroke('#1976D2');
  strokeWeight(2);
  line(cx - lineLen, cy - spacing / 2, cx + lineLen, cy - spacing / 2);
  line(cx - lineLen, cy + spacing / 2, cx + lineLen, cy + spacing / 2);

  // Transversal
  stroke('#E53935');
  strokeWeight(2);
  let angle = 60;
  let tLen = 60;
  line(cx - tLen * cos(radians(angle)), cy - spacing / 2 - tLen * sin(radians(angle)) + spacing / 2,
       cx + tLen * cos(radians(angle)), cy + spacing / 2 + tLen * sin(radians(angle)) - spacing / 2);

  // Calculate intersection points
  let int1y = cy - spacing / 2;
  let int2y = cy + spacing / 2;

  // Draw highlighted angles
  let arcR = 15;

  // Angles at top intersection (1-4)
  let topAngles = [
    { num: 1, start: -180, sweep: angle },
    { num: 2, start: -angle, sweep: 180 - angle },
    { num: 3, start: 0, sweep: angle },
    { num: 4, start: angle, sweep: 180 - angle }
  ];

  // Angles at bottom intersection (5-8)
  let bottomAngles = [
    { num: 5, start: -180, sweep: angle },
    { num: 6, start: -angle, sweep: 180 - angle },
    { num: 7, start: 0, sweep: angle },
    { num: 8, start: angle, sweep: 180 - angle }
  ];

  // Draw top angles
  for (let a of topAngles) {
    let isHighlighted = highlightAngles.includes(a.num);
    if (isHighlighted) {
      fill(red(color(highlightColor)), green(color(highlightColor)), blue(color(highlightColor)), 150);
      stroke(highlightColor);
      strokeWeight(2);
    } else {
      fill(200, 200, 200, 50);
      stroke(180);
      strokeWeight(1);
    }
    arc(cx, int1y, arcR * 2, arcR * 2, radians(a.start), radians(a.start + a.sweep), PIE);
  }

  // Draw bottom angles
  for (let a of bottomAngles) {
    let isHighlighted = highlightAngles.includes(a.num);
    if (isHighlighted) {
      fill(red(color(highlightColor)), green(color(highlightColor)), blue(color(highlightColor)), 150);
      stroke(highlightColor);
      strokeWeight(2);
    } else {
      fill(200, 200, 200, 50);
      stroke(180);
      strokeWeight(1);
    }
    arc(cx, int2y, arcR * 2, arcR * 2, radians(a.start), radians(a.start + a.sweep), PIE);
  }

  // Intersection points
  fill('#FF9800');
  noStroke();
  circle(cx, int1y, 6);
  circle(cx, int2y, 6);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 700);
  }
}
