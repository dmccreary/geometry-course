// Draw the cord of a circle
// Allow the user to change the angle of the points on the circle
let angleSlider1, angleSlider2;
let angle1, angle2;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  var mainElement = document.querySelector('main');
  background('aliceblue');
  textSize(24);

  // Create sliders at the bottom of the canvas
  angleSlider1 = createSlider(0, TWO_PI, PI/4, 0.01);
  angleSlider1.position(20, windowHeight - 40);
  angleSlider1.size(250);

  angleSlider2 = createSlider(0, TWO_PI, 5*PI/4, 0.01);
  angleSlider2.position(300, windowHeight - 40);
  angleSlider2.size(250);
}

function draw() {
  background('aliceblue');
  angle1 = angleSlider1.value();
  angle2 = angleSlider2.value();
  drawChord();
  noStroke();
  fill('black');
  text("Angle 1: " + angle1, 30, windowHeight - 50);
  text("Angle 2: " + angle2, 330, windowHeight - 50);
}

function drawChord() {
  // Get angles from sliders


  // Calculate points on the circle
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = min(width, height) / 3;

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
  circle(x1,y1, 5);
  circle(x2,y2, 5);
  line(x1, y1, x2, y2);
}
