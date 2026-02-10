// Straightedge vs Ruler Comparison
// Interactive diagram showing the difference between construction tools

let canvasWidth = 800;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Comparison diagram showing the difference between a ruler and a straightedge for geometric constructions', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Straightedge vs. Ruler: Why the Difference Matters', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Check hover
  checkHover();

  // Panel divider
  stroke('#E0E0E0');
  strokeWeight(3);
  line(canvasWidth / 2, 50, canvasWidth / 2, drawHeight - 20);

  // Draw both panels
  drawRulerPanel();
  drawStraightedgePanel();

  // Bottom comparison note
  fill('#424242');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('In classical constructions, we use relationships between points, not numerical measurements', canvasWidth / 2, drawHeight - 5);
}

function checkHover() {
  hoveredPanel = -1;
  if (mouseX < canvasWidth / 2 && mouseY > 50 && mouseY < drawHeight - 30) {
    hoveredPanel = 0; // Ruler
  } else if (mouseX > canvasWidth / 2 && mouseY > 50 && mouseY < drawHeight - 30) {
    hoveredPanel = 1; // Straightedge
  }
}

function drawRulerPanel() {
  let cx = canvasWidth / 4;
  let isHovered = (hoveredPanel === 0);

  // Panel background
  if (isHovered) {
    fill('#FFEBEE');
    noStroke();
    rect(10, 55, canvasWidth / 2 - 20, drawHeight - 95, 8);
  }

  // Panel title
  fill('#C62828');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Ruler (with measurements)', cx, 65);
  textStyle(NORMAL);

  // Red X
  fill('#C62828');
  textSize(40);
  text('✗', cx, 90);

  // Ruler drawing
  let rulerY = 180;
  let rulerW = 280;
  let rulerH = 40;

  // Ruler body (yellow with markings)
  fill('#FFF59D');
  stroke('#F9A825');
  strokeWeight(2);
  rect(cx - rulerW / 2, rulerY, rulerW, rulerH, 3);

  // Ruler markings
  fill('#424242');
  textSize(10);
  textAlign(CENTER, TOP);
  stroke('#424242');
  strokeWeight(1);

  for (let i = 0; i <= 7; i++) {
    let x = cx - rulerW / 2 + 20 + i * 35;

    // Number
    noStroke();
    text(i, x, rulerY + 2);

    // Major tick
    stroke('#424242');
    line(x, rulerY + 15, x, rulerY + rulerH);

    // Minor ticks
    if (i < 7) {
      for (let j = 1; j < 4; j++) {
        let mx = x + j * 8.75;
        let mh = (j === 2) ? 10 : 5;
        line(mx, rulerY + rulerH - mh, mx, rulerY + rulerH);
      }
    }
  }

  // NOT allowed message
  fill('#C62828');
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('NOT allowed in classical constructions', cx, rulerY + 60);
  textStyle(NORMAL);

  // Explanation
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Measurements depend on units (inches, cm, etc.)', cx, rulerY + 85);
  text('Cannot create pure geometric relationships', cx, rulerY + 105);

  // Why box
  fill('#FFCDD2');
  stroke('#C62828');
  strokeWeight(1);
  rect(cx - 110, rulerY + 125, 220, 45, 5);

  noStroke();
  fill('#C62828');
  textSize(11);
  textStyle(BOLD);
  text('Why not?', cx, rulerY + 132);
  textStyle(NORMAL);
  fill('#424242');
  textSize(10);
  text('Numbers are arbitrary. A 3-inch segment', cx, rulerY + 148);
  text('is the same as 7.62 cm—just different units.', cx, rulerY + 160);
}

function drawStraightedgePanel() {
  let cx = 3 * canvasWidth / 4;
  let isHovered = (hoveredPanel === 1);

  // Panel background
  if (isHovered) {
    fill('#E8F5E9');
    noStroke();
    rect(canvasWidth / 2 + 10, 55, canvasWidth / 2 - 20, drawHeight - 95, 8);
  }

  // Panel title
  fill('#2E7D32');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Straightedge (no measurements)', cx, 65);
  textStyle(NORMAL);

  // Green checkmark
  fill('#2E7D32');
  textSize(40);
  text('✓', cx, 90);

  // Straightedge drawing
  let seY = 180;
  let seW = 280;
  let seH = 25;

  // Straightedge body (plain blue)
  fill('#42A5F5');
  stroke('#1976D2');
  strokeWeight(2);
  rect(cx - seW / 2, seY, seW, seH, 3);

  // No markings - just plain edge

  // Points A and B with line
  let ptAx = cx - 80;
  let ptBx = cx + 80;
  let lineY = seY + seH + 40;

  // Line through points
  stroke('#212121');
  strokeWeight(3);
  line(ptAx - 30, lineY, ptBx + 30, lineY);

  // Points
  fill('#E53935');
  noStroke();
  ellipse(ptAx, lineY, 12, 12);
  ellipse(ptBx, lineY, 12, 12);

  // Labels
  fill('#212121');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('A', ptAx, lineY + 10);
  text('B', ptBx, lineY + 10);
  textStyle(NORMAL);

  // USED message
  fill('#2E7D32');
  noStroke();
  textSize(13);
  textStyle(BOLD);
  text('USED in classical constructions', cx, seY + 95);
  textStyle(NORMAL);

  // Explanation
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Can only draw lines through given points', cx, seY + 115);
  text('Based on relationships, not numbers', cx, seY + 135);

  // Why box
  fill('#C8E6C9');
  stroke('#2E7D32');
  strokeWeight(1);
  rect(cx - 110, seY + 155, 220, 45, 5);

  noStroke();
  fill('#2E7D32');
  textSize(11);
  textStyle(BOLD);
  text('Why?', cx, seY + 162);
  textStyle(NORMAL);
  fill('#424242');
  textSize(10);
  text('Two points uniquely determine a line.', cx, seY + 178);
  text('This is a pure geometric relationship!', cx, seY + 190);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 700);
  }
}
