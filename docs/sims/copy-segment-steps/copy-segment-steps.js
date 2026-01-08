// Copy Segment Steps - Reference Diagram
// Shows all five steps of copying a segment in one view

let canvasWidth = 900;
let drawHeight = 300;
let canvasHeight = drawHeight;

let hoveredStep = -1;

let steps = [
  {
    title: 'Given',
    desc: 'Segment AB and point C',
    color: '#1565C0'
  },
  {
    title: 'Step 1',
    desc: 'Draw ray from C',
    color: '#2E7D32'
  },
  {
    title: 'Step 2',
    desc: 'Set compass to AB',
    color: '#7B1FA2'
  },
  {
    title: 'Step 3',
    desc: 'Draw arc from C',
    color: '#E65100'
  },
  {
    title: 'Result',
    desc: 'CD ≅ AB ✓',
    color: '#C62828'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Five-panel diagram showing all steps of copying a segment construction', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Copying a Segment: Step-by-Step Guide', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over each panel to highlight', canvasWidth / 2, 35);

  checkHover();
  drawPanels();
}

function checkHover() {
  hoveredStep = -1;
  let panelW = (canvasWidth - 60) / 5;
  let startX = 20;
  let startY = 55;
  let panelH = drawHeight - 65;

  for (let i = 0; i < 5; i++) {
    let px = startX + i * (panelW + 5);
    if (mouseX > px && mouseX < px + panelW && mouseY > startY && mouseY < startY + panelH) {
      hoveredStep = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 60) / 5;
  let startX = 20;
  let startY = 55;
  let panelH = drawHeight - 65;

  for (let i = 0; i < 5; i++) {
    let px = startX + i * (panelW + 5);
    let isHovered = (hoveredStep === i);

    // Panel background
    if (isHovered) {
      drawingContext.shadowBlur = 8;
      drawingContext.shadowColor = steps[i].color;
    }

    fill('#FFFFFF');
    stroke(steps[i].color);
    strokeWeight(isHovered ? 3 : 1.5);
    rect(px, startY, panelW, panelH, 8);
    drawingContext.shadowBlur = 0;

    // Panel title
    fill(steps[i].color);
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(steps[i].title, px + panelW / 2, startY + 8);
    textStyle(NORMAL);

    // Panel description
    fill('#424242');
    textSize(10);
    text(steps[i].desc, px + panelW / 2, startY + 25);

    // Draw step illustration
    drawStepIllustration(i, px + panelW / 2, startY + panelH / 2 + 20, panelW * 0.8);
  }
}

function drawStepIllustration(step, cx, cy, size) {
  push();
  translate(cx, cy);

  let halfSize = size / 2;

  switch (step) {
    case 0: // Given
      // Segment AB
      stroke('#1565C0');
      strokeWeight(3);
      line(-halfSize + 10, -30, halfSize - 10, -30);

      // Points A and B
      fill('#1565C0');
      noStroke();
      ellipse(-halfSize + 10, -30, 8, 8);
      ellipse(halfSize - 10, -30, 8, 8);

      // Labels
      textSize(11);
      textAlign(CENTER, TOP);
      text('A', -halfSize + 10, -22);
      text('B', halfSize - 10, -22);

      // Point C below
      fill('#2E7D32');
      ellipse(-halfSize + 10, 30, 8, 8);
      text('C', -halfSize + 10, 38);
      break;

    case 1: // Draw ray
      // Segment AB (faded)
      stroke('#90CAF9');
      strokeWeight(2);
      line(-halfSize + 10, -30, halfSize - 10, -30);

      fill('#90CAF9');
      noStroke();
      ellipse(-halfSize + 10, -30, 6, 6);
      ellipse(halfSize - 10, -30, 6, 6);

      // Point C and ray
      fill('#2E7D32');
      ellipse(-halfSize + 10, 30, 8, 8);

      stroke('#2E7D32');
      strokeWeight(2);
      setLineDash([5, 3]);
      line(-halfSize + 10, 30, halfSize - 5, 30);
      setLineDash([]);

      // Arrow
      fill('#2E7D32');
      noStroke();
      triangle(halfSize - 5, 30, halfSize - 15, 25, halfSize - 15, 35);

      textSize(10);
      textAlign(CENTER, TOP);
      fill('#2E7D32');
      text('C', -halfSize + 10, 38);
      text('Ray from C', 0, 50);
      break;

    case 2: // Set compass
      // Segment AB with compass
      stroke('#1565C0');
      strokeWeight(3);
      line(-halfSize + 10, -30, halfSize - 10, -30);

      fill('#1565C0');
      noStroke();
      ellipse(-halfSize + 10, -30, 8, 8);
      ellipse(halfSize - 10, -30, 8, 8);

      // Compass visualization
      stroke('#7B1FA2');
      strokeWeight(2);
      noFill();
      arc(-halfSize + 10, -30, 20, 20, -PI / 4, PI / 4);

      // Compass radius line
      stroke('#7B1FA2');
      setLineDash([3, 3]);
      line(-halfSize + 10, -30, halfSize - 10, -30);
      setLineDash([]);

      textSize(10);
      fill('#7B1FA2');
      textAlign(CENTER, BOTTOM);
      text('radius = AB', 0, -5);
      break;

    case 3: // Draw arc
      // Point C with ray
      fill('#2E7D32');
      noStroke();
      ellipse(-halfSize + 10, 20, 8, 8);

      stroke('#9E9E9E');
      strokeWeight(1);
      setLineDash([5, 3]);
      line(-halfSize + 10, 20, halfSize - 5, 20);
      setLineDash([]);

      // Arc from C
      stroke('#E65100');
      strokeWeight(3);
      noFill();
      let arcRadius = size * 0.6;
      arc(-halfSize + 10, 20, arcRadius, arcRadius, -PI / 6, PI / 6);

      // Intersection point
      fill('#E65100');
      noStroke();
      let intersectX = -halfSize + 10 + arcRadius / 2 * cos(0);
      ellipse(intersectX, 20, 8, 8);

      textSize(10);
      fill('#E65100');
      textAlign(CENTER, TOP);
      text('Arc intersects ray', 0, 45);
      break;

    case 4: // Result
      // Original segment AB (faded)
      stroke('#90CAF9');
      strokeWeight(2);
      line(-halfSize + 10, -35, halfSize - 10, -35);

      fill('#90CAF9');
      noStroke();
      ellipse(-halfSize + 10, -35, 6, 6);
      ellipse(halfSize - 10, -35, 6, 6);

      // New segment CD
      stroke('#C62828');
      strokeWeight(3);
      line(-halfSize + 10, 20, halfSize - 10, 20);

      fill('#C62828');
      noStroke();
      ellipse(-halfSize + 10, 20, 8, 8);
      ellipse(halfSize - 10, 20, 8, 8);

      // Congruence marks
      stroke('#333');
      strokeWeight(2);
      line(-10, -40, -10, -30);
      line(-10, 15, -10, 25);

      // Labels
      textSize(10);
      fill('#1565C0');
      textAlign(CENTER, TOP);
      text('AB', 0, -28);

      fill('#C62828');
      text('CD', 0, 28);

      fill('#2E7D32');
      textSize(12);
      textStyle(BOLD);
      text('CD ≅ AB', 0, 50);
      textStyle(NORMAL);
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
    canvasWidth = max(canvasWidth, 600);
  }
}
