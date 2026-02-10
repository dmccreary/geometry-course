// Linear Pair Structure
// Diagram showing the defining characteristics of a linear pair
// with annotation arrows and supplementary callout

let canvasWidth = 700;
let drawHeight = 400;
let canvasHeight = drawHeight;

// Geometry positions (computed in draw based on canvasWidth)
let cx, cy;
let lineLen, rayLen;
let rayAngleDeg = 70; // angle from horizontal for the upward ray

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Diagram showing the structure of a linear pair with annotation arrows pointing to the common vertex, common side, and straight line', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FFF8E1'); // light cream

  cx = canvasWidth / 2;
  cy = 175;
  lineLen = min(canvasWidth * 0.38, 260);
  rayLen = 130;

  // Title
  fill('#1565C0');
  textSize(21);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Linear Pair Structure', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw 180° straight angle notation
  drawStraightAngleNotation();

  // Draw the linear pair geometry
  drawLinearPair();

  // Draw static annotation arrows
  drawAnnotations();

  // Draw equation
  drawEquation();

  // Draw callout box
  drawCallout();
}

function drawStraightAngleNotation() {
  // Small arc showing 180° across the full straight line
  noFill();
  stroke('#9E9E9E');
  strokeWeight(1.5);
  strokeCap(ROUND);
  // Draw a dotted semicircle below the line to show 180°
  drawingContext.setLineDash([4, 4]);
  arc(cx, cy, 160, 160, 0, PI);
  drawingContext.setLineDash([]);

  // Label "180°"
  noStroke();
  fill('#757575');
  textSize(13);
  textAlign(CENTER, TOP);
  textStyle(NORMAL);
  text('180°', cx, cy + 84);
}

function drawLinearPair() {
  // --- Straight line (horizontal) ---
  stroke('#212121');
  strokeWeight(4);
  strokeCap(ROUND);
  line(cx - lineLen, cy, cx + lineLen, cy);

  // Arrow heads on line ends
  fill('#212121');
  noStroke();
  // Left arrow
  push();
  translate(cx - lineLen, cy);
  rotate(PI);
  triangle(10, 0, -5, -6, -5, 6);
  pop();
  // Right arrow
  push();
  translate(cx + lineLen, cy);
  triangle(10, 0, -5, -6, -5, 6);
  pop();

  // --- Ray going upward ---
  let rayEndX = cx + rayLen * cos(radians(-rayAngleDeg));
  let rayEndY = cy + rayLen * sin(radians(-rayAngleDeg));
  stroke('#616161');
  strokeWeight(4);
  line(cx, cy, rayEndX, rayEndY);

  // Ray arrow head
  push();
  translate(rayEndX, rayEndY);
  rotate(radians(-rayAngleDeg));
  fill('#616161');
  noStroke();
  triangle(10, 0, -5, -6, -5, 6);
  pop();

  // --- Angle 1 arc (left side, 110°) ---
  fill(33, 150, 243, 70);   // blue semi-transparent
  stroke('#1976D2');
  strokeWeight(2);
  // Angle 1 spans from 180° to (180° - 110°) = 70° above horizontal
  // In p5 angles: from PI (left) to the ray angle
  arc(cx, cy, 90, 90, -PI, -radians(rayAngleDeg), PIE);

  // --- Angle 2 arc (right side, 70°) ---
  fill(244, 67, 54, 70);    // red semi-transparent
  stroke('#E53935');
  strokeWeight(2);
  // Angle 2 spans from the ray to 0° (right horizontal)
  arc(cx, cy, 75, 75, -radians(rayAngleDeg), 0, PIE);

  // --- Vertex dot ---
  fill('#FF9800');
  stroke('#E65100');
  strokeWeight(2);
  circle(cx, cy, 14);

  // --- Angle labels ---
  noStroke();
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Angle 1 label
  fill('#1565C0');
  textSize(18);
  let a1LabelAngle = radians(-(180 + rayAngleDeg) / 2); // midpoint of angle 1
  let a1x = cx + 60 * cos(a1LabelAngle);
  let a1y = cy + 60 * sin(a1LabelAngle);
  text('110°', a1x, a1y);

  fill('#1565C0');
  textSize(14);
  text('∠1', a1x - 28, a1y + 16);

  // Angle 2 label
  fill('#C62828');
  textSize(18);
  let a2LabelAngle = radians(-rayAngleDeg / 2); // midpoint of angle 2
  let a2x = cx + 52 * cos(a2LabelAngle);
  let a2y = cy + 52 * sin(a2LabelAngle);
  text('70°', a2x, a2y);

  fill('#C62828');
  textSize(14);
  text('∠2', a2x + 28, a2y + 12);

  // Vertex label
  fill('#E65100');
  textSize(14);
  text('V', cx, cy + 22);

  textStyle(NORMAL);
}

function drawAnnotations() {
  let rayEndX = cx + rayLen * cos(radians(-rayAngleDeg));
  let rayEndY = cy + rayLen * sin(radians(-rayAngleDeg));

  textSize(12);
  textStyle(NORMAL);

  // --- Annotation 1: "Common vertex" pointing to vertex ---
  let ann1x = cx - 10;
  let ann1y = cy + 42;
  let ann1TextX = cx - 10;
  let ann1TextY = cy + 70;
  drawAnnotationArrow(ann1TextX, ann1TextY - 6, ann1x, ann1y, '#E65100');
  noStroke();
  fill('#E65100');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Common vertex', ann1TextX, ann1TextY);
  textStyle(NORMAL);

  // --- Annotation 2: "Common side" pointing to the ray ---
  let rayMidX = cx + (rayLen * 0.55) * cos(radians(-rayAngleDeg));
  let rayMidY = cy + (rayLen * 0.55) * sin(radians(-rayAngleDeg));
  let ann2TextX = cx + 170;
  let ann2TextY = rayMidY - 20;
  drawAnnotationArrow(ann2TextX - 5, ann2TextY + 8, rayMidX + 12, rayMidY, '#4A148C');
  noStroke();
  fill('#4A148C');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Common side', ann2TextX, ann2TextY);
  textStyle(NORMAL);

  // --- Annotation 3: "Non-common sides form a straight line" pointing to line ---
  let ann3TextX = cx + 80;
  let ann3TextY = cy + 42;
  let ann3TargetX = cx + lineLen * 0.5;
  let ann3TargetY = cy + 6;
  drawAnnotationArrow(ann3TextX + 70, ann3TextY - 2, ann3TargetX, ann3TargetY, '#424242');
  noStroke();
  fill('#424242');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(11);
  text('Non-common sides', ann3TextX + 70, ann3TextY);
  text('form a straight line', ann3TextX + 70, ann3TextY + 14);
  textStyle(NORMAL);
  textSize(12);
}

function drawAnnotationArrow(fromX, fromY, toX, toY, col) {
  stroke(col);
  strokeWeight(1.5);
  line(fromX, fromY, toX, toY);

  // Arrowhead
  let angle = atan2(toY - fromY, toX - fromX);
  let headLen = 8;
  fill(col);
  noStroke();
  push();
  translate(toX, toY);
  rotate(angle);
  triangle(0, 0, -headLen, -headLen * 0.4, -headLen, headLen * 0.4);
  pop();
}

function drawEquation() {
  // Equation displayed below the geometry
  let eqY = cy + 95;
  noStroke();
  fill('#1565C0');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('m∠1 + m∠2 = 110° + 70° = 180°', canvasWidth / 2, eqY);
  textStyle(NORMAL);
}

function drawCallout() {
  // Callout box at the bottom
  let boxW = min(canvasWidth - 60, 400);
  let boxX = (canvasWidth - boxW) / 2;
  let boxY = drawHeight - 80;
  let boxH = 60;

  // Green accent box
  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2.5);
  rect(boxX, boxY, boxW, boxH, 10);

  // Left accent bar
  fill('#43A047');
  noStroke();
  rect(boxX, boxY, 6, boxH, 10, 0, 0, 10);

  // Text
  noStroke();
  fill('#2E7D32');
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Linear pairs are ALWAYS supplementary!', boxX + boxW / 2, boxY + boxH / 2);
  textStyle(NORMAL);
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
