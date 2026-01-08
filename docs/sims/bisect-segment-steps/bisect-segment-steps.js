// Bisect Segment Steps - Reference Diagram
// Shows four panels for bisecting a segment construction

let canvasWidth = 900;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let panels = [
  { title: 'Given', desc: 'Segment AB', color: '#1565C0' },
  { title: 'Steps 1-2', desc: 'Draw arcs from A and B', color: '#7B1FA2' },
  { title: 'Step 3', desc: 'Mark intersections P and Q', color: '#E65100' },
  { title: 'Result', desc: 'Perpendicular bisector PQ', color: '#2E7D32' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Four-panel diagram showing steps to bisect a segment and create perpendicular bisector', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF8E1');

  // Title
  fill('#7B1FA2');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Bisecting a Segment: Finding the Midpoint', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over each panel to highlight', canvasWidth / 2, 35);

  checkHover();
  drawPanels();
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 50) / 4;
  let startX = 15;
  let startY = 55;
  let panelH = drawHeight - 70;

  for (let i = 0; i < 4; i++) {
    let px = startX + i * (panelW + 5);
    if (mouseX > px && mouseX < px + panelW && mouseY > startY && mouseY < startY + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 50) / 4;
  let startX = 15;
  let startY = 55;
  let panelH = drawHeight - 70;

  for (let i = 0; i < 4; i++) {
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
    rect(px, startY, panelW, 40, 8, 8, 0, 0);

    fill('#FFFFFF');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(panels[i].title, px + panelW / 2, startY + 15);
    textStyle(NORMAL);

    fill('#FFFFFF');
    textSize(10);
    text(panels[i].desc, px + panelW / 2, startY + 32);

    // Draw illustration
    drawPanelIllustration(i, px + panelW / 2, startY + panelH / 2 + 30, panelW * 0.85, panelH * 0.6);
  }
}

function drawPanelIllustration(panel, cx, cy, w, h) {
  push();
  translate(cx, cy);

  let segLen = w * 0.8;
  let halfSeg = segLen / 2;

  switch (panel) {
    case 0: // Given
      // Segment AB
      stroke('#1565C0');
      strokeWeight(4);
      line(-halfSeg, 0, halfSeg, 0);

      // Endpoints
      fill('#1565C0');
      noStroke();
      ellipse(-halfSeg, 0, 10, 10);
      ellipse(halfSeg, 0, 10, 10);

      // Labels
      textSize(14);
      textAlign(CENTER, TOP);
      text('A', -halfSeg, 8);
      text('B', halfSeg, 8);

      // Measurement
      fill('#757575');
      textSize(11);
      textAlign(CENTER, BOTTOM);
      text('Length to bisect', 0, -15);
      break;

    case 1: // Arcs from A and B
      // Segment AB
      stroke('#9E9E9E');
      strokeWeight(2);
      line(-halfSeg, 0, halfSeg, 0);

      fill('#9E9E9E');
      noStroke();
      ellipse(-halfSeg, 0, 8, 8);
      ellipse(halfSeg, 0, 8, 8);

      // Arc from A (red)
      stroke('#C62828');
      strokeWeight(2);
      noFill();
      let arcR = segLen * 0.7;
      arc(-halfSeg, 0, arcR, arcR, -PI / 3, PI / 3);

      // Arc from B (orange)
      stroke('#E65100');
      arc(halfSeg, 0, arcR, arcR, PI - PI / 3, PI + PI / 3);

      // Note
      fill('#7B1FA2');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      noStroke();
      text('Radius > ½AB', 0, h / 2 - 5);

      // Labels
      textSize(11);
      fill('#C62828');
      textAlign(LEFT, CENTER);
      text('Arc from A', -halfSeg - 5, -h / 3);
      fill('#E65100');
      textAlign(RIGHT, CENTER);
      text('Arc from B', halfSeg + 5, -h / 3);
      break;

    case 2: // Mark P and Q
      // Segment AB
      stroke('#9E9E9E');
      strokeWeight(2);
      line(-halfSeg, 0, halfSeg, 0);

      fill('#9E9E9E');
      noStroke();
      ellipse(-halfSeg, 0, 6, 6);
      ellipse(halfSeg, 0, 6, 6);

      // Faded arcs
      stroke('#FFCCBC');
      strokeWeight(1);
      noFill();
      let arcR2 = segLen * 0.7;
      arc(-halfSeg, 0, arcR2, arcR2, -PI / 3, PI / 3);
      arc(halfSeg, 0, arcR2, arcR2, PI - PI / 3, PI + PI / 3);

      // Intersection points P and Q
      let intY = sqrt(pow(arcR2 / 2, 2) - pow(halfSeg, 2));

      fill('#7B1FA2');
      noStroke();
      ellipse(0, -intY * 0.8, 12, 12);
      ellipse(0, intY * 0.8, 12, 12);

      // Labels
      fill('#FFFFFF');
      textSize(10);
      textAlign(CENTER, CENTER);
      text('P', 0, -intY * 0.8);
      text('Q', 0, intY * 0.8);

      textSize(11);
      fill('#E65100');
      textAlign(CENTER, BOTTOM);
      text('Arcs intersect at P and Q', 0, h / 2 - 5);
      break;

    case 3: // Result
      // Segment AB
      stroke('#9E9E9E');
      strokeWeight(2);
      line(-halfSeg, 0, halfSeg, 0);

      fill('#9E9E9E');
      noStroke();
      ellipse(-halfSeg, 0, 6, 6);
      ellipse(halfSeg, 0, 6, 6);

      // Perpendicular bisector PQ
      stroke('#2E7D32');
      strokeWeight(3);
      let perpLen = h * 0.7;
      line(0, -perpLen / 2, 0, perpLen / 2);

      // Points P and Q
      fill('#7B1FA2');
      noStroke();
      ellipse(0, -perpLen / 2, 10, 10);
      ellipse(0, perpLen / 2, 10, 10);

      // Midpoint M
      fill('#C62828');
      ellipse(0, 0, 12, 12);

      // Right angle symbol
      stroke('#333');
      strokeWeight(1.5);
      noFill();
      rect(-8, -8, 16, 16);

      // Congruence marks on AM and MB
      stroke('#333');
      strokeWeight(2);
      line(-halfSeg / 2 - 3, -5, -halfSeg / 2 + 3, -5);
      line(halfSeg / 2 - 3, -5, halfSeg / 2 + 3, -5);

      // Labels
      textSize(11);
      noStroke();
      fill('#9E9E9E');
      textAlign(CENTER, TOP);
      text('A', -halfSeg, 8);
      text('B', halfSeg, 8);

      fill('#C62828');
      textAlign(LEFT, CENTER);
      text('M', 8, 0);

      fill('#2E7D32');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      textStyle(BOLD);
      text('PQ ⊥ AB', 0, h / 2 - 15);
      text('AM ≅ MB ✓', 0, h / 2 - 3);
      textStyle(NORMAL);
      break;
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
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 600);
  }
}
