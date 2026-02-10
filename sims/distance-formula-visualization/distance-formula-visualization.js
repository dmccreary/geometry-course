// Distance Formula Visualization
// Shows how the Distance Formula derives from the Pythagorean theorem

let canvasWidth = 900;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let panels = [
  { title: 'Step 1: Two Points', color: '#1565C0' },
  { title: 'Step 2: Right Triangle', color: '#7B1FA2' },
  { title: 'Step 3: Pythagorean Theorem', color: '#2E7D32' }
];

// Example points
let pointA = { x: 2, y: 3 };
let pointB = { x: 7, y: 9 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Three-panel diagram showing the distance formula derivation from the Pythagorean theorem', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF8E1');

  // Title
  fill('#E65100');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Distance Formula: Pythagorean Theorem in Disguise', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over each panel to highlight', canvasWidth / 2, 32);

  checkHover();
  drawPanels();
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 50) / 3;
  let startX = 15;
  let startY = 50;
  let panelH = drawHeight - 65;

  for (let i = 0; i < 3; i++) {
    let px = startX + i * (panelW + 5);
    if (mouseX > px && mouseX < px + panelW && mouseY > startY && mouseY < startY + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 50) / 3;
  let startX = 15;
  let startY = 50;
  let panelH = drawHeight - 65;

  for (let i = 0; i < 3; i++) {
    let px = startX + i * (panelW + 5);
    let isHovered = (hoveredPanel === i);

    // Panel shadow
    if (isHovered) {
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = panels[i].color;
    }

    fill('#FFFFFF');
    stroke(panels[i].color);
    strokeWeight(isHovered ? 3 : 1.5);
    rect(px, startY, panelW, panelH, 8);
    drawingContext.shadowBlur = 0;

    // Panel header
    fill(panels[i].color);
    noStroke();
    rect(px, startY, panelW, 35, 8, 8, 0, 0);

    fill('#FFFFFF');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(panels[i].title, px + panelW / 2, startY + 17);
    textStyle(NORMAL);

    // Draw panel content
    drawPanelContent(i, px + panelW / 2, startY + panelH / 2 + 25, panelW * 0.9, panelH * 0.7);
  }
}

function drawPanelContent(panel, cx, cy, w, h) {
  push();
  translate(cx, cy);

  let gridSize = 18;
  let gridW = 10;
  let gridH = 10;
  let gridOffX = -gridW * gridSize / 2;
  let gridOffY = -gridH * gridSize / 2 + 10;

  // Draw grid
  stroke('#E0E0E0');
  strokeWeight(0.5);
  for (let i = 0; i <= gridW; i++) {
    line(gridOffX + i * gridSize, gridOffY, gridOffX + i * gridSize, gridOffY + gridH * gridSize);
  }
  for (let j = 0; j <= gridH; j++) {
    line(gridOffX, gridOffY + j * gridSize, gridOffX + gridW * gridSize, gridOffY + j * gridSize);
  }

  // Points
  let ax = gridOffX + pointA.x * gridSize;
  let ay = gridOffY + (gridH - pointA.y) * gridSize;
  let bx = gridOffX + pointB.x * gridSize;
  let by = gridOffY + (gridH - pointB.y) * gridSize;

  switch (panel) {
    case 0: // Two points
      // Points
      fill('#1565C0');
      noStroke();
      ellipse(ax, ay, 12, 12);
      ellipse(bx, by, 12, 12);

      // Labels
      textSize(11);
      textAlign(CENTER, TOP);
      text('A(2, 3)', ax, ay + 8);
      text('B(7, 9)', bx, by - 22);

      // Distance line
      stroke('#E65100');
      strokeWeight(2);
      setLineDash([5, 3]);
      line(ax, ay, bx, by);
      setLineDash([]);

      // Question
      fill('#424242');
      textSize(11);
      textAlign(CENTER, TOP);
      noStroke();
      text('Find distance from A to B', 0, h / 2 - 15);
      text('d = ?', 0, h / 2);
      break;

    case 1: // Right triangle
      // Triangle legs
      stroke('#4CAF50');
      strokeWeight(3);
      line(ax, ay, bx, ay); // Horizontal

      stroke('#FF9800');
      strokeWeight(3);
      line(bx, ay, bx, by); // Vertical

      // Hypotenuse
      stroke('#9C27B0');
      strokeWeight(2);
      setLineDash([5, 3]);
      line(ax, ay, bx, by);
      setLineDash([]);

      // Points
      fill('#1565C0');
      noStroke();
      ellipse(ax, ay, 10, 10);
      ellipse(bx, by, 10, 10);

      // Right angle symbol
      stroke('#333');
      strokeWeight(1);
      noFill();
      rect(bx - 8, ay - 8, 8, 8);

      // Labels
      fill('#4CAF50');
      textSize(10);
      textAlign(CENTER, TOP);
      noStroke();
      text('|7-2| = 5', (ax + bx) / 2, ay + 5);

      fill('#FF9800');
      textAlign(LEFT, CENTER);
      text('|9-3| = 6', bx + 5, (ay + by) / 2);

      fill('#9C27B0');
      textAlign(CENTER, BOTTOM);
      text('d = ?', (ax + bx) / 2 - 15, (ay + by) / 2 - 5);

      fill('#424242');
      textSize(10);
      textAlign(CENTER, TOP);
      text('Right triangle formed!', 0, h / 2 - 5);
      break;

    case 2: // Pythagorean theorem
      // Triangle (faded)
      stroke('#A5D6A7');
      strokeWeight(2);
      line(ax, ay, bx, ay);

      stroke('#FFCC80');
      line(bx, ay, bx, by);

      stroke('#CE93D8');
      setLineDash([5, 3]);
      line(ax, ay, bx, by);
      setLineDash([]);

      // Points
      fill('#1565C0');
      noStroke();
      ellipse(ax, ay, 8, 8);
      ellipse(bx, by, 8, 8);

      // Calculation
      fill('#424242');
      textSize(10);
      textAlign(CENTER, TOP);
      noStroke();

      let calcY = h / 2 - 40;
      text('d² = 5² + 6²', 0, calcY);
      text('d² = 25 + 36', 0, calcY + 14);
      text('d² = 61', 0, calcY + 28);

      fill('#2E7D32');
      textStyle(BOLD);
      text('d = √61 ≈ 7.81 units', 0, calcY + 45);
      textStyle(NORMAL);

      // Formula
      fill('#1565C0');
      textSize(9);
      text('d = √[(x₂-x₁)² + (y₂-y₁)²]', 0, calcY + 65);

      // Checkmark
      fill('#2E7D32');
      textSize(14);
      text('✓', w / 3, calcY + 45);
      break;
  }

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
