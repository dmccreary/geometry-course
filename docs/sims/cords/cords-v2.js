// Draw the cord of a circle
// Allow the user to change the angle of the points on the circle by dragging
let angleSlider1, angleSlider2;
let angle1, angle2;
let draggingPoint = null;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  background('aliceblue');
  textSize(24);

  // Initialize angles
  angle1 = PI / 4;
  angle2 = 5 * PI / 4;
}

function draw() {
  background('aliceblue');
  drawChord();
  noStroke();
  fill('black');
  text("Angle 1: " + angle1.toFixed(2), 30, windowHeight - 50);
  text("Angle 2: " + angle2.toFixed(2), 330, windowHeight - 50);
}

function drawChord() {
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = min(width, height) / 3;

  // Calculate points on the circle
  let x1 = centerX + radius * cos(angle1);
  let y1 = centerY + radius * sin(angle1);

  let x2 = centerX + radius * cos(angle2);
  let y2 = centerY + radius * sin(angle2);

  // Draw the circle
  noFill();
  stroke(0);
  strokeWeight(1);
  circle(centerX, centerY, radius * 2);

  // Draw the chord
  stroke('blue');
  strokeWeight(3);
  line(x1, y1, x2, y2);

  // Draw draggable points
  fill('red');
  noStroke();
  circle(x1, y1, 10);
  circle(x2, y2, 10);

  // Handle dragging
  if (draggingPoint !== null) {
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const angle = atan2(dy, dx);

    if (draggingPoint === 1) {
      angle1 = angle;
    } else if (draggingPoint === 2) {
      angle2 = angle;
    }
  }
}

function mousePressed() {
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = min(width, height) / 3;

  let x1 = centerX + radius * cos(angle1);
  let y1 = centerY + radius * sin(angle1);

  let x2 = centerX + radius * cos(angle2);
  let y2 = centerY + radius * sin(angle2);

  if (dist(mouseX, mouseY, x1, y1) < 10) {
    draggingPoint = 1;
  } else if (dist(mouseX, mouseY, x2, y2) < 10) {
    draggingPoint = 2;
  }
}

function mouseReleased() {
  draggingPoint = null;
}