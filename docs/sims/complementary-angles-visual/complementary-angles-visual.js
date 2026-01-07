// Complementary Angles Visual
// Shows adjacent and non-adjacent complementary angle examples

let canvasWidth = 800;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPanel = -1; // 0=left, 1=right

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Visual showing adjacent and non-adjacent complementary angles summing to 90 degrees', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Complementary Angles: Two angles that sum to 90°', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Check hover
  checkHover();

  // Draw two panels
  drawAdjacentPanel();
  drawNonAdjacentPanel();

  // Bottom note
  fill('#757575');
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text('Complementary angles can be adjacent or non-adjacent', canvasWidth / 2, drawHeight - 10);
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = canvasWidth / 2 - 30;

  if (mouseX > 15 && mouseX < 15 + panelW && mouseY > 50 && mouseY < 350) {
    hoveredPanel = 0;
  } else if (mouseX > canvasWidth / 2 + 15 && mouseX < canvasWidth - 15 && mouseY > 50 && mouseY < 350) {
    hoveredPanel = 1;
  }
}

function drawAdjacentPanel() {
  let px = 15;
  let py = 50;
  let pw = canvasWidth / 2 - 30;
  let ph = 300;
  let isHovered = (hoveredPanel === 0);

  // Panel background
  fill(isHovered ? '#E3F2FD' : '#FFFFFF');
  stroke(isHovered ? '#1976D2' : '#BDBDBD');
  strokeWeight(isHovered ? 3 : 1);
  rect(px, py, pw, ph, 12);

  // Title
  noStroke();
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Adjacent Complementary Angles', px + pw / 2, py + 10);
  textStyle(NORMAL);

  // Draw the angles
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 20;
  let rayLen = 100;

  // Right angle indicator (full 90 degrees shown first)
  fill(200, 200, 200, 80);
  stroke('#9E9E9E');
  strokeWeight(1);
  arc(cx, cy, 80, 80, -PI / 2, 0, PIE);

  // First angle (35°) - blue
  fill(33, 150, 243, 100);
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx, cy, 70, 70, -radians(35), 0, PIE);

  // Second angle (55°) - red
  fill(244, 67, 54, 100);
  stroke('#E53935');
  strokeWeight(2);
  arc(cx, cy, 70, 70, -PI / 2, -radians(35), PIE);

  // Rays
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy); // Horizontal

  stroke('#E53935');
  strokeWeight(3);
  line(cx, cy, cx, cy - rayLen); // Vertical

  stroke('#7B1FA2');
  strokeWeight(3);
  let midX = cx + rayLen * cos(radians(-35));
  let midY = cy + rayLen * sin(radians(-35));
  line(cx, cy, midX, midY); // Middle ray

  // Right angle square
  noFill();
  stroke('#424242');
  strokeWeight(2);
  rect(cx, cy - 15, 15, 15);

  // Vertex
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Labels
  fill('#1976D2');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('35°', cx + 45, cy - 12);

  fill('#E53935');
  text('55°', cx + 15, cy - 50);
  textStyle(NORMAL);

  // Equation
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('35° + 55° = 90°', cx, cy + 80);

  // Checkmark
  fill('#4CAF50');
  textSize(20);
  text('✓', cx, cy + 100);
}

function drawNonAdjacentPanel() {
  let px = canvasWidth / 2 + 15;
  let py = 50;
  let pw = canvasWidth / 2 - 30;
  let ph = 300;
  let isHovered = (hoveredPanel === 1);

  // Panel background
  fill(isHovered ? '#FFF3E0' : '#FFFFFF');
  stroke(isHovered ? '#FF9800' : '#BDBDBD');
  strokeWeight(isHovered ? 3 : 1);
  rect(px, py, pw, ph, 12);

  // Title
  noStroke();
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Non-Adjacent Complementary Angles', px + pw / 2, py + 10);
  textStyle(NORMAL);

  // First angle (25°) - green - left position
  let cx1 = px + pw / 3 - 20;
  let cy1 = py + ph / 2;
  let rayLen = 70;

  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(cx1, cy1, 60, 60, -radians(25), 0, PIE);

  stroke('#43A047');
  strokeWeight(3);
  line(cx1, cy1, cx1 + rayLen, cy1);
  let endX1 = cx1 + rayLen * cos(radians(-25));
  let endY1 = cy1 + rayLen * sin(radians(-25));
  line(cx1, cy1, endX1, endY1);

  fill('#FF9800');
  noStroke();
  circle(cx1, cy1, 10);

  fill('#43A047');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('25°', cx1 + 40, cy1 - 20);

  // Second angle (65°) - orange - right position
  let cx2 = px + 2 * pw / 3 + 20;
  let cy2 = py + ph / 2;

  fill(255, 152, 0, 100);
  stroke('#F57C00');
  strokeWeight(2);
  arc(cx2, cy2, 60, 60, -radians(65), 0, PIE);

  stroke('#F57C00');
  strokeWeight(3);
  line(cx2, cy2, cx2 + rayLen, cy2);
  let endX2 = cx2 + rayLen * cos(radians(-65));
  let endY2 = cy2 + rayLen * sin(radians(-65));
  line(cx2, cy2, endX2, endY2);

  fill('#FF9800');
  noStroke();
  circle(cx2, cy2, 10);

  fill('#F57C00');
  textSize(16);
  textStyle(BOLD);
  text('65°', cx2 + 30, cy2 - 40);
  textStyle(NORMAL);

  // Plus sign and dotted connection
  stroke('#9E9E9E');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(cx1 + 50, cy1, cx2 - 50, cy2);
  drawingContext.setLineDash([]);

  fill('#424242');
  noStroke();
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('+', px + pw / 2, cy1);
  textStyle(NORMAL);

  // Equation
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('25° + 65° = 90°', px + pw / 2, cy1 + 80);

  // Checkmark
  fill('#4CAF50');
  textSize(20);
  text('✓', px + pw / 2, cy1 + 100);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 650);
  }
}
