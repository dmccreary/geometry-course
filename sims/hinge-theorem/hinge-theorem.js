// Hinge Theorem Visualization
// Shows relationship between included angle and opposite side

let canvasWidth = 800;
let drawHeight = 500;
let canvasHeight = drawHeight;

let angle1 = 40;
let angle2 = 80;
let sliderAngle2;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Hinge Theorem showing larger angle creates longer opposite side', LABEL);

  // Slider for second angle
  sliderAngle2 = createSlider(20, 140, angle2, 1);
  sliderAngle2.position(canvasWidth / 2 + 100, drawHeight - 60);
  sliderAngle2.size(150);
  sliderAngle2.parent(document.querySelector('main'));
}

function draw() {
  updateCanvasSize();
  angle2 = sliderAngle2.value();

  background('#FFFFFF');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Hinge Theorem (SAS Inequality)", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Adjust the right angle slider to see how it affects the opposite side', canvasWidth / 2, 32);

  drawDoorAnalogy();
  drawTriangles();
  drawComparison();
  drawTheoremBox();
}

function drawDoorAnalogy() {
  let cx = canvasWidth / 2;
  let doorY = 100;

  fill('#616161');
  textSize(12);
  textAlign(CENTER, TOP);
  text("Door Hinge Analogy", cx, 55);

  // Left door (smaller angle)
  let door1X = cx - 120;
  drawDoor(door1X, doorY, angle1, '#1565C0', "30°");

  // Right door (larger angle)
  let door2X = cx + 80;
  drawDoor(door2X, doorY, angle2, '#4CAF50', angle2 + "°");

  // Arrow between
  fill('#757575');
  textSize(10);
  textAlign(CENTER, CENTER);
  text("→", cx - 20, doorY + 30);
}

function drawDoor(x, y, angle, col, label) {
  let hingeLen = 60;
  let doorLen = 60;

  // Door frame (vertical)
  stroke('#795548');
  strokeWeight(4);
  line(x, y, x, y + hingeLen);

  // Door (at angle)
  let radAngle = radians(angle);
  let doorEndX = x + doorLen * cos(radAngle);
  let doorEndY = y + doorLen * sin(-radAngle);

  stroke(col);
  strokeWeight(3);
  line(x, y, doorEndX, doorEndY);

  // Hinge point
  fill(col);
  noStroke();
  ellipse(x, y, 10, 10);

  // Angle arc
  stroke(col);
  strokeWeight(1.5);
  noFill();
  arc(x, y, 30, 30, -radAngle, 0);

  // Angle label
  fill(col);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(label, x + 25, y + 15);

  // Distance measurement
  let dist = round(2 * hingeLen * sin(radAngle / 2));
  fill('#424242');
  textSize(9);
  textAlign(CENTER, TOP);
  text("Gap: ~" + dist + "px", x + 30, y + 65);
}

function drawTriangles() {
  let y = 250;
  let legLen = 100;

  // Left triangle (smaller angle)
  let tri1X = canvasWidth / 4;
  drawHingeTriangle(tri1X, y, angle1, legLen, '#1565C0', "△ABC");

  // Right triangle (larger angle)
  let tri2X = 3 * canvasWidth / 4;
  drawHingeTriangle(tri2X, y, angle2, legLen, '#4CAF50', "△DEF");
}

function drawHingeTriangle(cx, cy, angle, legLen, col, label) {
  // Two equal legs meeting at included angle
  let radAngle = radians(angle);

  // Vertices
  let ax = cx;
  let ay = cy - legLen * 0.3;

  let bx = ax - legLen * cos(radAngle / 2);
  let by = ay + legLen * sin(radAngle / 2);

  let Cx = ax + legLen * cos(radAngle / 2);
  let Cy = ay + legLen * sin(radAngle / 2);

  // Draw triangle
  let c = color(col);
  fill(red(c), green(c), blue(c), 60);
  stroke(col);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Mark equal sides
  drawTicks(ax, ay, bx, by, 1, col);
  drawTicks(ax, ay, Cx, Cy, 1, col);

  // Included angle arc
  let a1 = atan2(by - ay, bx - ax);
  let a2 = atan2(Cy - ay, Cx - ax);
  if (a1 > a2) [a1, a2] = [a2, a1];

  stroke(col);
  strokeWeight(2);
  noFill();
  arc(ax, ay, 30, 30, a1, a2);

  // Angle label
  noStroke();
  fill(col);
  textSize(11);
  textAlign(CENTER, CENTER);
  let midAngle = (a1 + a2) / 2;
  text(angle + "°", ax + 25 * cos(midAngle), ay + 25 * sin(midAngle));

  // Third side (opposite)
  let thirdSide = dist(bx, by, Cx, Cy);
  stroke('#F44336');
  strokeWeight(3);
  line(bx, by, Cx, Cy);

  // Third side length
  noStroke();
  fill('#F44336');
  textSize(10);
  textAlign(CENTER, TOP);
  text(round(thirdSide) + " px", (bx + Cx) / 2, (by + Cy) / 2 + 10);

  // Side lengths
  fill('#616161');
  textSize(9);
  text("8 cm", (ax + bx) / 2 - 20, (ay + by) / 2);
  text("8 cm", (ax + Cx) / 2 + 20, (ay + Cy) / 2);

  // Triangle label
  fill(col);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(label, cx, cy + 70);
  textStyle(NORMAL);
}

function drawTicks(x1, y1, x2, y2, count, col) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI/2);
  stroke(col);
  strokeWeight(2);
  line(0, -6, 0, 6);
  pop();
}

function drawComparison() {
  let y = 380;

  fill('#616161');
  textSize(11);
  textAlign(CENTER, TOP);

  // Get third side lengths
  let legLen = 100;
  let radAngle1 = radians(angle1);
  let radAngle2 = radians(angle2);

  let side1 = 2 * legLen * sin(radAngle1 / 2);
  let side2 = 2 * legLen * sin(radAngle2 / 2);

  text("Equal sides: AB = AC = DE = DF = 8 cm", canvasWidth / 2, y);

  if (angle1 < angle2) {
    fill('#1565C0');
    text("∠A = " + angle1 + "°", canvasWidth / 4, y + 20);
    fill('#4CAF50');
    text("∠D = " + angle2 + "°", 3 * canvasWidth / 4, y + 20);

    fill('#F44336');
    text("BC = " + round(side1) + " px", canvasWidth / 4, y + 40);
    text("EF = " + round(side2) + " px", 3 * canvasWidth / 4, y + 40);

    fill('#2E7D32');
    textStyle(BOLD);
    text("Since " + angle1 + "° < " + angle2 + "°, we have BC < EF", canvasWidth / 2, y + 65);
    textStyle(NORMAL);
  } else {
    fill('#4CAF50');
    text("∠D = " + angle2 + "°", 3 * canvasWidth / 4, y + 20);
    fill('#1565C0');
    text("∠A = " + angle1 + "°", canvasWidth / 4, y + 20);

    fill('#F44336');
    text("BC = " + round(side1) + " px", canvasWidth / 4, y + 40);
    text("EF = " + round(side2) + " px", 3 * canvasWidth / 4, y + 40);

    fill('#2E7D32');
    textStyle(BOLD);
    if (angle1 === angle2) {
      text("Since angles are equal, BC = EF", canvasWidth / 2, y + 65);
    } else {
      text("Since " + angle1 + "° > " + angle2 + "°, we have BC > EF", canvasWidth / 2, y + 65);
    }
    textStyle(NORMAL);
  }
}

function drawTheoremBox() {
  let y = drawHeight - 50;

  // Slider label
  fill('#4CAF50');
  textSize(11);
  textAlign(RIGHT, CENTER);
  text("∠D = " + angle2 + "°", canvasWidth / 2 + 95, y + 10);

  // Theorem box
  fill(33, 150, 243, 30);
  noStroke();
  rect(10, y - 5, canvasWidth / 2 - 30, 50, 5);

  fill('#1565C0');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Hinge Theorem", (canvasWidth / 2 - 10) / 2, y);
  textStyle(NORMAL);
  textSize(9);
  fill('#424242');
  text("Larger included angle → Longer opposite side", (canvasWidth / 2 - 10) / 2, y + 15);
  text("Think of a door hinge!", (canvasWidth / 2 - 10) / 2, y + 30);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
