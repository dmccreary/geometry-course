// Angle Parts and Notation
// Static diagram showing the anatomy of an angle with annotations

let canvasWidth = 700;
let drawHeight = 450;
let canvasHeight = drawHeight;

let centerX, centerY;
let rayLength = 170;
let angle1 = 0;   // degrees (horizontal ray BA)
let angle2 = 45;  // degrees (upper ray BC)

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  centerX = canvasWidth * 0.32;
  centerY = canvasHeight * 0.52;

  describe('Diagram showing the parts of an angle: vertex B, side BA in blue, side BC in red, green angle arc, and annotation arrows labeling vertex and sides', LABEL);
}

function draw() {
  updateCanvasSize();
  centerX = canvasWidth * 0.32;

  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Parts and Notation', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw the angle diagram
  drawAngle();

  // Draw annotation arrows
  drawAnnotations();

  // Draw notation panel
  drawNotationPanel();

  // Stop looping since this is a static diagram
  noLoop();
}

function drawAngle() {
  // Calculate ray endpoints
  let endX1 = centerX + rayLength * cos(radians(angle1));
  let endY1 = centerY - rayLength * sin(radians(angle1));
  let endX2 = centerX + rayLength * cos(radians(angle2));
  let endY2 = centerY - rayLength * sin(radians(angle2));

  // Point label positions (beyond ray tips)
  let ptAx = centerX + (rayLength + 25) * cos(radians(angle1));
  let ptAy = centerY - (rayLength + 25) * sin(radians(angle1));
  let ptCx = centerX + (rayLength + 25) * cos(radians(angle2));
  let ptCy = centerY - (rayLength + 25) * sin(radians(angle2));

  // --- Angle arc (green, drawn behind rays) ---
  fill(76, 175, 80, 60);
  stroke('#4CAF50');
  strokeWeight(2.5);
  arc(centerX, centerY, 90, 90, -radians(angle2), -radians(angle1), PIE);

  // Angle measure label inside arc
  noStroke();
  fill('#2E7D32');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let midAngle = (angle1 + angle2) / 2;
  let labelX = centerX + 65 * cos(radians(midAngle));
  let labelY = centerY - 65 * sin(radians(midAngle));
  text('45\u00B0', labelX, labelY);

  // --- Ray BA (blue) ---
  stroke('#1976D2');
  strokeWeight(3.5);
  line(centerX, centerY, endX1, endY1);
  // Arrowhead for ray BA
  drawArrowhead(endX1, endY1, 0, '#1976D2');

  // --- Ray BC (red) ---
  stroke('#E53935');
  strokeWeight(3.5);
  line(centerX, centerY, endX2, endY2);
  // Arrowhead for ray BC
  drawArrowhead(endX2, endY2, -angle2, '#E53935');

  // --- Vertex B (orange dot) ---
  fill('#FF9800');
  stroke('#E65100');
  strokeWeight(2.5);
  circle(centerX, centerY, 20);

  // --- Point labels (black, bold) ---
  noStroke();
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Label A (at end of blue ray)
  fill(0);
  text('A', ptAx + 3, ptAy + 14);

  // Label B (vertex, below-left)
  fill(0);
  text('B', centerX - 22, centerY + 22);

  // Label C (at end of red ray)
  fill(0);
  text('C', ptCx - 18, ptCy - 8);

  textStyle(NORMAL);
}

function drawArrowhead(tipX, tipY, angleDeg, col) {
  push();
  translate(tipX, tipY);
  rotate(radians(-angleDeg));
  fill(col);
  noStroke();
  triangle(10, 0, -6, -6, -6, 6);
  pop();
}

function drawAnnotations() {
  // Annotation style
  let annotColor = '#555555';
  let annotSize = 13;

  // --- Arrow pointing to vertex B: "Vertex" ---
  let vertexAnnotX = centerX - 90;
  let vertexAnnotY = centerY + 70;

  // Draw annotation text
  noStroke();
  fill(annotColor);
  textSize(annotSize);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Vertex', vertexAnnotX, vertexAnnotY);

  // Draw arrow from text to vertex
  stroke(annotColor);
  strokeWeight(1.5);
  let arrowStartX = vertexAnnotX + 10;
  let arrowStartY = vertexAnnotY - 10;
  let arrowEndX = centerX - 14;
  let arrowEndY = centerY + 12;
  line(arrowStartX, arrowStartY, arrowEndX, arrowEndY);
  // Small arrowhead
  drawSmallArrowhead(arrowStartX, arrowStartY, arrowEndX, arrowEndY, annotColor);

  // --- Arrow pointing to blue ray: "Side BA" ---
  let side1MidX = centerX + rayLength * 0.55 * cos(radians(angle1));
  let side1MidY = centerY - rayLength * 0.55 * sin(radians(angle1));
  let side1AnnotX = side1MidX;
  let side1AnnotY = side1MidY + 55;

  noStroke();
  fill(annotColor);
  textAlign(CENTER, CENTER);
  text('Side BA', side1AnnotX, side1AnnotY);

  stroke(annotColor);
  strokeWeight(1.5);
  let s1startX = side1AnnotX;
  let s1startY = side1AnnotY - 10;
  let s1endX = side1MidX;
  let s1endY = side1MidY + 8;
  line(s1startX, s1startY, s1endX, s1endY);
  drawSmallArrowhead(s1startX, s1startY, s1endX, s1endY, annotColor);

  // --- Arrow pointing to red ray: "Side BC" ---
  let side2MidX = centerX + rayLength * 0.55 * cos(radians(angle2));
  let side2MidY = centerY - rayLength * 0.55 * sin(radians(angle2));
  let side2AnnotX = side2MidX - 60;
  let side2AnnotY = side2MidY - 40;

  noStroke();
  fill(annotColor);
  textAlign(CENTER, CENTER);
  text('Side BC', side2AnnotX, side2AnnotY);

  stroke(annotColor);
  strokeWeight(1.5);
  let s2startX = side2AnnotX + 20;
  let s2startY = side2AnnotY + 10;
  let s2endX = side2MidX - 6;
  let s2endY = side2MidY - 6;
  line(s2startX, s2startY, s2endX, s2endY);
  drawSmallArrowhead(s2startX, s2startY, s2endX, s2endY, annotColor);

  // --- "Sides of the angle" bracket label ---
  let bracketY = centerY + 95;
  noStroke();
  fill('#333333');
  textSize(12);
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
  text('The two rays are the sides of the angle', centerX + 30, bracketY);
  textStyle(NORMAL);
}

function drawSmallArrowhead(fromX, fromY, toX, toY, col) {
  let angle = atan2(toY - fromY, toX - fromX);
  let arrowLen = 8;
  let arrowAngle = PI / 6;
  push();
  stroke(col);
  strokeWeight(1.5);
  line(toX, toY, toX - arrowLen * cos(angle - arrowAngle), toY - arrowLen * sin(angle - arrowAngle));
  line(toX, toY, toX - arrowLen * cos(angle + arrowAngle), toY - arrowLen * sin(angle + arrowAngle));
  pop();
}

function drawNotationPanel() {
  let panelX = canvasWidth * 0.60;
  let panelY = 55;
  let panelW = canvasWidth * 0.37;
  let panelH = 160;

  // Panel background
  fill(255, 255, 255, 240);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 10);

  noStroke();
  textAlign(LEFT, TOP);

  // Title
  fill('#1565C0');
  textSize(16);
  textStyle(BOLD);
  text('Angle Notation', panelX + 15, panelY + 12);
  textStyle(NORMAL);

  // Notation lines
  fill('#333333');
  textSize(13);
  let lineY = panelY + 42;
  let lineSpacing = 24;

  text('\u2220ABC  or  \u2220CBA', panelX + 15, lineY);
  fill('#757575');
  textSize(11);
  text('Full angle name', panelX + 170, lineY + 1);

  fill('#333333');
  textSize(13);
  lineY += lineSpacing;
  text('\u2220B', panelX + 15, lineY);
  fill('#757575');
  textSize(11);
  text('Vertex notation', panelX + 170, lineY + 1);

  fill('#333333');
  textSize(13);
  lineY += lineSpacing;
  text('m\u2220ABC = 45\u00B0', panelX + 15, lineY);
  fill('#757575');
  textSize(11);
  text('Measurement', panelX + 170, lineY + 1);

  // Key rule box
  lineY += lineSpacing + 8;
  fill('#FFF3E0');
  stroke('#FFB74D');
  strokeWeight(1);
  rect(panelX + 8, lineY, panelW - 16, 28, 5);

  noStroke();
  fill('#E65100');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Vertex is always in the middle of the name!', panelX + panelW / 2, lineY + 14);
  textStyle(NORMAL);

  // --- Naming note below panel ---
  let noteY = panelY + panelH + 20;
  noStroke();
  fill('#555555');
  textSize(13);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  text('This angle can be named:', panelX + 5, noteY);

  textStyle(BOLD);
  fill('#1565C0');
  textSize(14);
  text('\u2220ABC,  \u2220CBA,  or  \u2220B', panelX + 5, noteY + 22);
  textStyle(NORMAL);

  // --- Color legend ---
  let legY = noteY + 58;
  fill('#555555');
  textSize(11);
  textAlign(LEFT, CENTER);

  // Blue legend
  fill('#1976D2');
  noStroke();
  rect(panelX + 10, legY, 20, 4, 2);
  fill('#555555');
  text('Ray BA (blue)', panelX + 38, legY + 2);

  // Red legend
  fill('#E53935');
  rect(panelX + 10, legY + 18, 20, 4, 2);
  fill('#555555');
  text('Ray BC (red)', panelX + 38, legY + 20);

  // Orange vertex legend
  fill('#FF9800');
  stroke('#E65100');
  strokeWeight(1);
  circle(panelX + 20, legY + 40, 10);
  noStroke();
  fill('#555555');
  text('Vertex B (orange)', panelX + 38, legY + 40);

  // Green arc legend
  fill('#4CAF50');
  noStroke();
  arc(panelX + 20, legY + 58, 16, 16, -PI / 4, 0, PIE);
  fill('#555555');
  text('Angle arc (green)', panelX + 38, legY + 58);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  loop(); // Redraw once on resize
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
    canvasHeight = drawHeight;
  }
}
