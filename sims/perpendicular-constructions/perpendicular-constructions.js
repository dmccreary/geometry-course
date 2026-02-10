// Two Types of Perpendicular Constructions
// Comparison diagram showing perpendicular through point ON line vs FROM point to line

let canvasWidth = 900;
let drawHeight = 500;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Comparison diagram showing two types of perpendicular constructions', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Two Types of Perpendicular Constructions', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Hover over each panel to see the construction steps', canvasWidth / 2, 38);

  // Panel divider
  stroke('#E0E0E0');
  strokeWeight(3);
  line(canvasWidth / 2, 60, canvasWidth / 2, drawHeight - 10);

  // Check hover
  checkHover();

  // Draw panels
  drawOnLinePanel();
  drawToLinePanel();
}

function checkHover() {
  hoveredPanel = -1;
  if (mouseX < canvasWidth / 2 && mouseY > 60 && mouseY < drawHeight - 10) {
    hoveredPanel = 0;
  } else if (mouseX > canvasWidth / 2 && mouseY > 60 && mouseY < drawHeight - 10) {
    hoveredPanel = 1;
  }
}

function drawOnLinePanel() {
  let cx = canvasWidth / 4;
  let isHovered = (hoveredPanel === 0);

  // Panel background
  if (isHovered) {
    fill('#E3F2FD');
    noStroke();
    rect(10, 65, canvasWidth / 2 - 20, drawHeight - 80, 8);
  }

  // Title
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Perpendicular Through Point ON Line', cx, 75);
  textStyle(NORMAL);

  // Given section
  fill('#424242');
  textSize(11);
  text('Given: Line ℓ and point P on ℓ', cx, 100);

  // Drawing area
  let lineY = 250;
  let lineLen = 160;

  // Line ℓ
  stroke('#1976D2');
  strokeWeight(3);
  line(cx - lineLen, lineY, cx + lineLen, lineY);

  // Point P (on the line)
  fill('#E53935');
  noStroke();
  ellipse(cx, lineY, 12, 12);

  // Label P
  fill('#E53935');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('P', cx, lineY + 10);

  // Line label
  fill('#1976D2');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('ℓ', cx + lineLen + 10, lineY);
  textStyle(NORMAL);

  if (isHovered) {
    // Show construction
    // Arcs from P
    noFill();
    stroke('#FF9800');
    strokeWeight(2);
    arc(cx - 60, lineY, 40, 40, -PI, 0);
    arc(cx + 60, lineY, 40, 40, -PI, 0);

    // Points A and B
    fill('#FF9800');
    noStroke();
    ellipse(cx - 60, lineY, 8, 8);
    ellipse(cx + 60, lineY, 8, 8);

    fill('#FF9800');
    textSize(10);
    text('A', cx - 60, lineY + 12);
    text('B', cx + 60, lineY + 12);

    // Arcs from A and B
    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(cx - 60, lineY, 100, 100, -PI / 2, -PI / 6);
    arc(cx + 60, lineY, 100, 100, -5 * PI / 6, -PI / 2);

    // Point Q
    fill('#7B1FA2');
    noStroke();
    ellipse(cx, lineY - 80, 10, 10);

    fill('#7B1FA2');
    textSize(12);
    textStyle(BOLD);
    text('Q', cx + 10, lineY - 90);
    textStyle(NORMAL);

    // Perpendicular line PQ
    stroke('#43A047');
    strokeWeight(3);
    line(cx, lineY, cx, lineY - 120);

    // Right angle symbol
    stroke('#424242');
    strokeWeight(1);
    noFill();
    rect(cx, lineY - 12, 12, 12);

    // Result annotation
    fill('#2E7D32');
    textSize(11);
    textAlign(CENTER, TOP);
    text('PQ ⊥ ℓ', cx, lineY - 150);
  }

  // Steps box (always visible)
  fill('#F5F5F5');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(cx - 140, drawHeight - 130, 280, 100, 5);

  noStroke();
  fill('#424242');
  textSize(10);
  textAlign(LEFT, TOP);
  let steps = [
    '1. From P, draw arcs intersecting ℓ at A and B',
    '2. From A, draw arc above the line',
    '3. From B (same radius), draw arc to find Q',
    '4. Draw line PQ ⟂ ℓ'
  ];
  for (let i = 0; i < steps.length; i++) {
    text(steps[i], cx - 130, drawHeight - 120 + i * 22);
  }
}

function drawToLinePanel() {
  let cx = 3 * canvasWidth / 4;
  let isHovered = (hoveredPanel === 1);

  // Panel background
  if (isHovered) {
    fill('#FFF3E0');
    noStroke();
    rect(canvasWidth / 2 + 10, 65, canvasWidth / 2 - 20, drawHeight - 80, 8);
  }

  // Title
  fill('#E65100');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Perpendicular From Point TO Line', cx, 75);
  textStyle(NORMAL);

  // Given section
  fill('#424242');
  textSize(11);
  text('Given: Line ℓ and point P not on ℓ', cx, 100);

  // Drawing area
  let lineY = 280;
  let lineLen = 160;

  // Line ℓ
  stroke('#1976D2');
  strokeWeight(3);
  line(cx - lineLen, lineY, cx + lineLen, lineY);

  // Point P (above the line)
  fill('#E53935');
  noStroke();
  ellipse(cx, lineY - 100, 12, 12);

  // Label P
  fill('#E53935');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('P', cx, lineY - 110);

  // Line label
  fill('#1976D2');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('ℓ', cx + lineLen + 10, lineY);
  textStyle(NORMAL);

  if (isHovered) {
    // Arc from P intersecting line at A and B
    noFill();
    stroke('#FF9800');
    strokeWeight(2);
    arc(cx, lineY - 100, 220, 220, PI / 6, 5 * PI / 6);

    // Points A and B
    fill('#FF9800');
    noStroke();
    ellipse(cx - 70, lineY, 8, 8);
    ellipse(cx + 70, lineY, 8, 8);

    fill('#FF9800');
    textSize(10);
    textAlign(CENTER, TOP);
    text('A', cx - 70, lineY + 8);
    text('B', cx + 70, lineY + 8);

    // Arcs from A and B below line
    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(cx - 70, lineY, 100, 100, PI / 6, PI / 2);
    arc(cx + 70, lineY, 100, 100, PI / 2, 5 * PI / 6);

    // Point Q (below line)
    fill('#7B1FA2');
    noStroke();
    ellipse(cx, lineY + 60, 10, 10);

    fill('#7B1FA2');
    textSize(12);
    textStyle(BOLD);
    text('Q', cx + 10, lineY + 55);
    textStyle(NORMAL);

    // Perpendicular line PQ
    stroke('#43A047');
    strokeWeight(3);
    line(cx, lineY - 100, cx, lineY + 80);

    // Right angle symbol
    stroke('#424242');
    strokeWeight(1);
    noFill();
    rect(cx, lineY - 12, 12, 12);

    // Foot of perpendicular
    fill('#E53935');
    noStroke();
    ellipse(cx, lineY, 8, 8);

    // Result annotation
    fill('#2E7D32');
    textSize(11);
    textAlign(CENTER, TOP);
    text('PQ ⊥ ℓ', cx + 25, lineY - 20);
  }

  // Steps box
  fill('#F5F5F5');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(cx - 140, drawHeight - 130, 280, 100, 5);

  noStroke();
  fill('#424242');
  textSize(10);
  textAlign(LEFT, TOP);
  let steps = [
    '1. From P, draw arc intersecting ℓ at A and B',
    '2. From A, draw arc on opposite side of ℓ',
    '3. From B (same radius), draw arc to find Q',
    '4. Draw line PQ ⟂ ℓ'
  ];
  for (let i = 0; i < steps.length; i++) {
    text(steps[i], cx - 130, drawHeight - 120 + i * 22);
  }
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
  }
}
