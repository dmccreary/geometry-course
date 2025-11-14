// Area Formulas for Quadrilaterals MicroSim
// This MicroSim displays six quadrilaterals with their area formulas
// in a responsive 2x3 grid layout

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 0; // No controls for this static display
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Global variables
let panelWidth;
let panelTitleFontSize = 24;
let panelFormulaFontSize = 16;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Six-panel diagram showing area formulas for rectangle, square, parallelogram, trapezoid, rhombus, and kite with visual representations and mathematical formulas', LABEL);
}

function draw() {
  updateCanvasSize();

  // Update panel width based on canvas width
  panelWidth = (canvasWidth - 4 * margin) / 3;
  let panelHeight = 200;

  // Draw title at top
  fill('black');
  textSize(36);
  textAlign(CENTER, TOP);
  noStroke();
  text('Area Formulas for Quadrilaterals', canvasWidth/2, 10);

  // Reset text defaults
  stroke('black');
  textAlign(LEFT, CENTER);
  textSize(16);

  // Calculate starting y position (below title)
  let startY = 60;

  // Row 1: Rectangle, Square, Parallelogram
  drawRectanglePanel(margin, startY, panelWidth, panelHeight);
  drawSquarePanel(margin + panelWidth + margin, startY, panelWidth, panelHeight);
  drawParallelogramPanel(margin + 2 * (panelWidth + margin), startY, panelWidth, panelHeight);

  // Row 2: Trapezoid, Rhombus, Kite
  drawTrapezoidPanel(margin, startY + panelHeight, panelWidth, panelHeight);
  drawRhombusPanel(margin + panelWidth + margin, startY + panelHeight, panelWidth, panelHeight);
  drawKitePanel(margin + 2 * (panelWidth + margin), startY + panelHeight, panelWidth, panelHeight);
}

function drawRectanglePanel(x, y, w, h) {
  push();

  // Background
  fill('#FFF9C4');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h);

  // Title
  fill('black');
  noStroke();
  textSize(panelTitleFontSize);
  textAlign(CENTER, TOP);
  text('Rectangle', x + w/2, y + 10);

  // Draw rectangle
  let rectW = w - 4 * margin;
  let rectH = h * 0.4;
  let rectX = x + w/2 - rectW/2;
  let rectY = y + h/2 - rectH/2;

  stroke('#1A237E');
  strokeWeight(2);
  fill(100, 181, 246, 77); // #64B5F6 with 30% opacity
  rect(rectX, rectY, rectW, rectH);

  // Formula
  fill('black');
  noStroke();
  textSize(panelFormulaFontSize);
  textAlign(CENTER, BOTTOM);
  text('A = lw', x + w/2, y + h - 10);

  pop();
}

function drawSquarePanel(x, y, w, h) {
  push();

  // Background
  fill('#FCE4EC');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h);

  // Title
  fill('black');
  noStroke();
  textSize(panelTitleFontSize);
  textAlign(CENTER, TOP);
  text('Square', x + w/2, y + 10);

  // Draw square
  let squareSize = min(w - 4 * margin, h * 0.5);
  let squareX = x + w/2 - squareSize/2;
  let squareY = y + h/2 - squareSize/2;

  stroke('#4A148C');
  strokeWeight(2);
  fill(186, 104, 200, 77); // #BA68C8 with 30% opacity
  rect(squareX, squareY, squareSize, squareSize);

  // Formula
  fill('black');
  noStroke();
  textSize(panelFormulaFontSize);
  textAlign(CENTER, BOTTOM);
  text('A = s²', x + w/2, y + h - 10);

  pop();
}

function drawParallelogramPanel(x, y, w, h) {
  push();

  // Background
  fill('#E8F5E9');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h);

  // Title
  fill('black');
  noStroke();
  textSize(panelTitleFontSize);
  textAlign(CENTER, TOP);
  text('Parallelogram', x + w/2, y + 10);

  // Draw parallelogram
  let baseW = w - 4 * margin;
  let paraH = h * 0.35;
  let slant = baseW * 0.2;
  let paraY = y + h/2 - paraH/2;
  let paraX = x + w/2 - baseW/2;

  stroke('#1B5E20');
  strokeWeight(2);
  fill(129, 199, 132, 77); // #81C784 with 30% opacity
  beginShape();
  vertex(paraX + slant, paraY);
  vertex(paraX + baseW, paraY);
  vertex(paraX + baseW - slant, paraY + paraH);
  vertex(paraX, paraY + paraH);
  endShape(CLOSE);

  // Draw height line
  stroke('red');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(paraX + slant, paraY, paraX + slant, paraY + paraH);
  drawingContext.setLineDash([]);

  // Labels
  fill('red');
  noStroke();
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text('h', paraX + slant - 10, paraY + paraH/2);
  textAlign(CENTER, TOP);
  text('b', paraX + baseW/2, paraY + paraH + 5);

  // Formula
  fill('black');
  textSize(panelFormulaFontSize);
  textAlign(CENTER, BOTTOM);
  text('A = bh', x + w/2, y + h - 10);

  pop();
}

function drawTrapezoidPanel(x, y, w, h) {
  push();

  // Background
  fill('#FFF3E0');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h);

  // Title
  fill('black');
  noStroke();
  textSize(panelTitleFontSize);
  textAlign(CENTER, TOP);
  text('Trapezoid', x + w/2, y + 10);

  // Draw trapezoid
  let bottomBase = w - 4 * margin;
  let topBase = bottomBase * 0.6;
  let trapH = h * 0.35;
  let trapY = y + h/2 - trapH/2;
  let bottomX = x + w/2 - bottomBase/2;
  let topX = x + w/2 - topBase/2;

  stroke('#E65100');
  strokeWeight(2);
  fill(255, 183, 77, 77); // #FFB74D with 30% opacity
  beginShape();
  vertex(topX, trapY);
  vertex(topX + topBase, trapY);
  vertex(bottomX + bottomBase, trapY + trapH);
  vertex(bottomX, trapY + trapH);
  endShape(CLOSE);

  // Draw height line
  stroke('red');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(topX + topBase/2, trapY, topX + topBase/2, trapY + trapH);
  drawingContext.setLineDash([]);

  // Labels
  fill('red');
  noStroke();
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text('h', topX + topBase/2 + 12, trapY + trapH/2);
  textAlign(CENTER, TOP);
  text('b₁', topX + topBase/2, trapY - 5);
  text('b₂', bottomX + bottomBase/2, trapY + trapH + 5);

  // Formula
  fill('black');
  textSize(panelFormulaFontSize);
  textAlign(CENTER, BOTTOM);
  text('A = ½(b₁ + b₂)h', x + w/2, y + h - 10);

  pop();
}

function drawRhombusPanel(x, y, w, h) {
  push();

  // Background
  fill('#E0F7FA');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h);

  // Title
  fill('black');
  noStroke();
  textSize(panelTitleFontSize);
  textAlign(CENTER, TOP);
  text('Rhombus', x + w/2, y + 10);

  // Draw rhombus
  let d1 = (w - 3 * margin) * 0.8;
  let d2 = h * 0.5;
  let centerX = x + w/2;
  let centerY = y + h/2;

  stroke('#006064');
  strokeWeight(2);
  fill(77, 208, 225, 77); // #4DD0E1 with 30% opacity
  beginShape();
  vertex(centerX, centerY - d2/2);
  vertex(centerX + d1/2, centerY);
  vertex(centerX, centerY + d2/2);
  vertex(centerX - d1/2, centerY);
  endShape(CLOSE);

  // Draw diagonals
  stroke('red');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(centerX, centerY - d2/2, centerX, centerY + d2/2);
  line(centerX - d1/2, centerY, centerX + d1/2, centerY);
  drawingContext.setLineDash([]);

  // Labels
  fill('red');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('d₁', centerX + 5, centerY - d2/4);
  textAlign(CENTER, BOTTOM);
  text('d₂', centerX - d1/4, centerY - 5);

  // Formula
  fill('black');
  textSize(panelFormulaFontSize);
  textAlign(CENTER, BOTTOM);
  text('A = ½d₁d₂', x + w/2, y + h - 10);

  pop();
}

function drawKitePanel(x, y, w, h) {
  

  // Background
  fill('#F3E5F5');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h);

  // Title
  fill('black');
  noStroke();
  textSize(panelTitleFontSize);
  textAlign(CENTER, TOP);
  text('Kite', x + w/2, y + 10);

  // Draw kite
  let d1 = h * 0.6;
  let d2 = (w - 3 * margin) * 0.6;
  let centerX = x + w/2;
  let centerY = y + h/2;
  let d1Split = 0.3; // Top portion of vertical diagonal
  push();
    translate(0,-20);
  stroke('#6A1B9A');
  strokeWeight(2);
  fill(186, 104, 200, 77); // #BA68C8 with 30% opacity
  beginShape();
  vertex(centerX, centerY - d1 * d1Split);
  vertex(centerX + d2/2, centerY);
  vertex(centerX, centerY + d1 * (1 - d1Split));
  vertex(centerX - d2/2, centerY);
  endShape(CLOSE);

  // Draw diagonals
  stroke('red');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(centerX, centerY - d1 * d1Split, centerX, centerY + d1 * (1 - d1Split));
  line(centerX - d2/2, centerY, centerX + d2/2, centerY);
  drawingContext.setLineDash([]);

  // Labels
  fill('red');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('d₁', centerX + 5, centerY - d1 * 0.15);
  textAlign(CENTER, TOP);
  text('d₂', centerX - d2/4, centerY + 5);

  // Formula
  fill('black');
  textSize(panelFormulaFontSize);
  textAlign(CENTER, BOTTOM);
  text('A = ½d₁d₂', x + w/2, y + h + 10);

  pop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
