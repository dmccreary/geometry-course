// Compass Parts and Circle Construction
// Interactive diagram showing compass anatomy and circle drawing

let canvasWidth = 800;
let drawHeight = 450;
let canvasHeight = drawHeight;

let hoveredPart = '';
let animationPhase = 0;
let circleProgress = 0;

let parts = {
  fixedPoint: { x: 0, y: 0, label: 'Fixed Point (Center)', desc: 'Sharp point that stays at the center' },
  pencilPoint: { x: 0, y: 0, label: 'Pencil Point', desc: 'Draws the circle arc' },
  legs: { x: 0, y: 0, label: 'Compass Legs', desc: 'Two arms that spread apart' },
  adjustment: { x: 0, y: 0, label: 'Adjustment Hinge', desc: 'Controls the radius distance' }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive diagram showing parts of a compass and how to draw a circle', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF8E1');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('The Compass: Drawing Perfect Circles', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Panel divider
  stroke('#BDBDBD');
  strokeWeight(2);
  line(canvasWidth / 2, 50, canvasWidth / 2, drawHeight - 20);

  // Panel labels
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Compass Parts', canvasWidth / 4, 45);
  text('Drawing a Circle', 3 * canvasWidth / 4, 45);
  textStyle(NORMAL);

  // Draw left panel - Compass Parts
  drawCompassParts();

  // Draw right panel - Circle Construction
  drawCircleConstruction();

  // Check hover
  checkHover();

  // Draw info panel if hovering
  drawInfoPanel();

  // Animate circle drawing
  circleProgress += 0.01;
  if (circleProgress > 1) circleProgress = 0;
}

function drawCompassParts() {
  let cx = canvasWidth / 4;
  let cy = 230;

  // Update part positions
  parts.fixedPoint.x = cx;
  parts.fixedPoint.y = cy + 100;
  parts.pencilPoint.x = cx + 80;
  parts.pencilPoint.y = cy + 100;
  parts.legs.x = cx + 40;
  parts.legs.y = cy + 50;
  parts.adjustment.x = cx + 40;
  parts.adjustment.y = cy - 50;

  // Draw compass body
  push();
  translate(cx + 40, cy - 80);

  // Top hinge/handle
  fill(hoveredPart === 'adjustment' ? '#FFC107' : '#78909C');
  stroke('#455A64');
  strokeWeight(2);
  ellipse(0, 0, 30, 30);

  // Legs
  strokeWeight(hoveredPart === 'legs' ? 6 : 4);
  stroke(hoveredPart === 'legs' ? '#FFC107' : '#546E7A');

  // Left leg (fixed point)
  line(0, 10, -40, 170);

  // Right leg (pencil)
  line(0, 10, 40, 170);

  // Fixed point (sharp end)
  fill(hoveredPart === 'fixedPoint' ? '#E53935' : '#212121');
  noStroke();
  triangle(-40, 170, -45, 180, -35, 180);

  // Pencil point
  fill(hoveredPart === 'pencilPoint' ? '#1976D2' : '#FDD835');
  stroke('#424242');
  strokeWeight(1);
  rect(33, 155, 14, 30, 2);
  fill('#212121');
  triangle(35, 185, 45, 185, 40, 195);

  pop();

  // Draw labels with lines
  drawLabel(cx - 60, cy + 130, 'Fixed Point', parts.fixedPoint.x - 40, parts.fixedPoint.y + 80, hoveredPart === 'fixedPoint');
  drawLabel(cx + 140, cy + 130, 'Pencil Point', parts.pencilPoint.x + 40, parts.pencilPoint.y + 95, hoveredPart === 'pencilPoint');
  drawLabel(cx + 130, cy + 30, 'Compass Legs', parts.legs.x + 40, parts.legs.y + 50, hoveredPart === 'legs');
  drawLabel(cx + 100, cy - 80, 'Adjustment', parts.adjustment.x, parts.adjustment.y - 80, hoveredPart === 'adjustment');

  // Radius indicator
  stroke('#E53935');
  strokeWeight(2);
  setLineDash([5, 5]);
  line(cx, cy + 100, cx + 80, cy + 100);
  setLineDash([]);

  fill('#E53935');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Radius', cx + 40, cy + 105);
}

function drawLabel(lx, ly, label, tx, ty, isHighlighted) {
  stroke(isHighlighted ? '#1565C0' : '#9E9E9E');
  strokeWeight(1);
  line(lx, ly, tx, ty);

  noStroke();
  fill(isHighlighted ? '#1565C0' : '#424242');
  textSize(11);
  textStyle(isHighlighted ? BOLD : NORMAL);
  textAlign(CENTER, CENTER);
  text(label, lx, ly - 10);
  textStyle(NORMAL);
}

function drawCircleConstruction() {
  let cx = 3 * canvasWidth / 4;
  let cy = 250;
  let radius = 80;

  // Center point C
  fill('#E53935');
  noStroke();
  ellipse(cx, cy, 12, 12);

  fill('#E53935');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('C', cx, cy + 10);
  textStyle(NORMAL);

  // Draw partial circle (animated)
  noFill();
  stroke('#1976D2');
  strokeWeight(3);
  let endAngle = circleProgress * TWO_PI;
  arc(cx, cy, radius * 2, radius * 2, 0, endAngle);

  // Draw full circle (faint)
  stroke('#BBDEFB');
  strokeWeight(1);
  ellipse(cx, cy, radius * 2, radius * 2);

  // Draw multiple radii to show equality
  let radiiColors = ['#E53935', '#43A047', '#FF9800', '#7B1FA2'];
  let radiiAngles = [0, PI / 3, 2 * PI / 3, PI];

  for (let i = 0; i < 4; i++) {
    let angle = radiiAngles[i];
    let ex = cx + radius * cos(angle);
    let ey = cy + radius * sin(angle);

    stroke(radiiColors[i]);
    strokeWeight(2);
    line(cx, cy, ex, ey);

    // Endpoint on circle
    fill(radiiColors[i]);
    noStroke();
    ellipse(ex, ey, 8, 8);
  }

  // Radius label
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('r', cx + radius / 2 + 5, cy - 10);
  textStyle(NORMAL);

  // Annotation
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);
  textWrap(WORD);
  text('All points on the circle are\nthe same distance (r) from C', cx, cy + 100);

  // Compass visualization (small, at current arc position)
  if (circleProgress < 1) {
    let angle = circleProgress * TWO_PI;
    let px = cx + radius * cos(angle);
    let py = cy + radius * sin(angle);

    // Mini compass
    stroke('#78909C');
    strokeWeight(2);
    line(cx, cy - 10, (cx + px) / 2, (cy + py) / 2 - 20);
    line((cx + px) / 2, (cy + py) / 2 - 20, px, py);

    fill('#FDD835');
    noStroke();
    ellipse(px, py, 6, 6);
  }
}

function checkHover() {
  hoveredPart = '';

  let cx = canvasWidth / 4 + 40;
  let cy = 230;

  // Check fixed point
  if (dist(mouseX, mouseY, cx - 40, cy + 100) < 25) {
    hoveredPart = 'fixedPoint';
  }
  // Check pencil point
  else if (dist(mouseX, mouseY, cx + 40, cy + 95) < 25) {
    hoveredPart = 'pencilPoint';
  }
  // Check legs
  else if (mouseX > cx - 50 && mouseX < cx + 50 && mouseY > cy && mouseY < cy + 80) {
    hoveredPart = 'legs';
  }
  // Check adjustment
  else if (dist(mouseX, mouseY, cx, cy - 80) < 25) {
    hoveredPart = 'adjustment';
  }
}

function drawInfoPanel() {
  if (hoveredPart === '') return;

  let info = parts[hoveredPart];
  if (!info) return;

  let panelW = 200;
  let panelH = 60;
  let px = 20;
  let py = drawHeight - 80;

  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(2);
  rect(px, py, panelW, panelH, 8);

  noStroke();
  fill('#1565C0');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(info.label, px + 10, py + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  text(info.desc, px + 10, py + 32);
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
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 700);
  }
}
