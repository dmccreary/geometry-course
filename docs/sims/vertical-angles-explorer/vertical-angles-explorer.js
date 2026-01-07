// Vertical Angles Explorer
// Interactive demonstration with draggable line rotation

let canvasWidth = 700;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let lineAngle = 30; // angle of the rotating line in degrees
let dragging = false;
let cx, cy;
let lineLen = 150;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  cx = canvasWidth / 2;
  cy = drawHeight / 2;

  describe('Interactive vertical angles explorer - drag to rotate the line and see angles change', LABEL);
}

function draw() {
  updateCanvasSize();
  cx = canvasWidth / 2;
  cy = drawHeight / 2;

  background('#FAFAFA');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Vertical Angles Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Drag the blue line endpoints to rotate and see vertical angles stay equal', canvasWidth / 2, 38);

  // Draw the intersection
  drawIntersection();

  // Draw angle display
  drawAngleDisplay();

  // Draw theorem box
  drawTheoremBox();
}

function drawIntersection() {
  // Fixed red line (horizontal)
  stroke('#E53935');
  strokeWeight(4);
  line(cx - lineLen, cy, cx + lineLen, cy);

  // Rotating blue line
  let endX1 = cx + lineLen * cos(radians(lineAngle));
  let endY1 = cy - lineLen * sin(radians(lineAngle));
  let endX2 = cx - lineLen * cos(radians(lineAngle));
  let endY2 = cy + lineLen * sin(radians(lineAngle));

  stroke('#1976D2');
  strokeWeight(4);
  line(endX1, endY1, endX2, endY2);

  // Calculate angles
  let angle1 = lineAngle; // top-right
  let angle2 = 180 - lineAngle; // top-left
  let angle3 = lineAngle; // bottom-left (vertical to angle1)
  let angle4 = 180 - lineAngle; // bottom-right (vertical to angle2)

  // Draw angle arcs
  // Angle 1 (top-right) - green
  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(cx, cy, 80, 80, -radians(lineAngle), 0, PIE);

  // Angle 2 (top-left) - yellow
  fill(255, 193, 7, 100);
  stroke('#FFA000');
  strokeWeight(2);
  arc(cx, cy, 70, 70, -radians(180), -radians(lineAngle), PIE);

  // Angle 3 (bottom-left) - green (vertical to angle1)
  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(cx, cy, 80, 80, -radians(180 + lineAngle), -radians(180), PIE);

  // Angle 4 (bottom-right) - yellow (vertical to angle2)
  fill(255, 193, 7, 100);
  stroke('#FFA000');
  strokeWeight(2);
  arc(cx, cy, 70, 70, 0, radians(180 - lineAngle), PIE);

  // Angle labels
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  fill('#2E7D32');
  text('∠1', cx + 55, cy - 25);
  text(round(angle1) + '°', cx + 90, cy - 15);

  fill('#F57F17');
  text('∠2', cx - 55, cy - 35);
  text(round(angle2) + '°', cx - 90, cy - 25);

  fill('#2E7D32');
  text('∠3', cx - 55, cy + 25);
  text(round(angle3) + '°', cx - 90, cy + 15);

  fill('#F57F17');
  text('∠4', cx + 55, cy + 35);
  text(round(angle4) + '°', cx + 90, cy + 25);

  textStyle(NORMAL);

  // Draggable handles
  let handleSize = 18;
  fill(dragging ? '#0D47A1' : '#42A5F5');
  stroke('#1565C0');
  strokeWeight(2);
  circle(endX1, endY1, handleSize);
  circle(endX2, endY2, handleSize);

  // Center point
  fill('#FF9800');
  stroke('#E65100');
  strokeWeight(2);
  circle(cx, cy, 14);
}

function drawAngleDisplay() {
  let displayY = drawHeight + 15;
  let angle1 = round(lineAngle);
  let angle2 = round(180 - lineAngle);

  fill('#424242');
  textSize(13);
  textAlign(CENTER, TOP);

  // Vertical pair 1
  fill('#2E7D32');
  textStyle(BOLD);
  text('∠1 = ∠3 = ' + angle1 + '°', canvasWidth / 2 - 120, displayY);

  // Vertical pair 2
  fill('#F57F17');
  text('∠2 = ∠4 = ' + angle2 + '°', canvasWidth / 2 + 120, displayY);

  textStyle(NORMAL);

  // Supplementary note
  fill('#757575');
  textSize(11);
  text('Adjacent angles: ' + angle1 + '° + ' + angle2 + '° = 180° (supplementary)', canvasWidth / 2, displayY + 25);
}

function drawTheoremBox() {
  let boxX = 30;
  let boxY = 60;
  let boxW = 220;
  let boxH = 100;

  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  noStroke();
  fill('#2E7D32');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Vertical Angles Theorem', boxX + 12, boxY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  text('Vertical angles are', boxX + 12, boxY + 32);
  text('always congruent.', boxX + 12, boxY + 48);

  fill('#1565C0');
  textStyle(BOLD);
  text('∠1 ≅ ∠3', boxX + 12, boxY + 68);
  text('∠2 ≅ ∠4', boxX + 12, boxY + 82);
  textStyle(NORMAL);

  // Color key
  boxX = canvasWidth - 180;
  fill('#FFF9C4');
  stroke('#FBC02D');
  rect(boxX, boxY, 150, 80, 10);

  noStroke();
  fill('#F57F17');
  textSize(11);
  textStyle(BOLD);
  text('Color Key', boxX + 12, boxY + 10);
  textStyle(NORMAL);

  fill('#2E7D32');
  text('■ Green: ∠1 & ∠3', boxX + 12, boxY + 32);
  fill('#F57F17');
  text('■ Yellow: ∠2 & ∠4', boxX + 12, boxY + 50);
  fill('#757575');
  text('Matching colors = equal', boxX + 12, boxY + 68);
}

function mousePressed() {
  let endX1 = cx + lineLen * cos(radians(lineAngle));
  let endY1 = cy - lineLen * sin(radians(lineAngle));
  let endX2 = cx - lineLen * cos(radians(lineAngle));
  let endY2 = cy + lineLen * sin(radians(lineAngle));

  if (dist(mouseX, mouseY, endX1, endY1) < 20 || dist(mouseX, mouseY, endX2, endY2) < 20) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    // Calculate angle from mouse position to center
    let dx = mouseX - cx;
    let dy = cy - mouseY; // inverted because y increases downward
    let newAngle = degrees(atan2(dy, dx));

    // Keep angle in valid range (5 to 175)
    newAngle = constrain(newAngle, 5, 175);
    lineAngle = newAngle;
  }
}

function mouseReleased() {
  dragging = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
  }
}
