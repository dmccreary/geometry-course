// MicroSim Template for 2D geometry with region drawing parameters
// Use for an instructor standing in front of a "smart white board" with controls on the bottom
// Author: Dan McCreary
// Version geometry-1

let canvasWidth = 667;
// The top drawing region above the interactive controls
let drawWidth = canvasWidth;
let drawHeight = 290;
// The control region where we place sliders and buttons
let controlHeight = 40;
// The total height of both the drawing region height + the control region height
let canvasHeight = drawHeight + controlHeight;
// Margin around the active plotting region
let margin = 25;
// The left margin area needs to hold the width of the text label and value
let sliderLeftMargin = 100;
// Larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

let circleX, circleY, circleRadius;
let graphX, graphY, graphAmplitude, graphPeriod;

let angleSlider;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  // canvas.parent('canvas-container');
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  angleMode(DEGREES);

  // Initialize circle parameters
  circleX = canvasWidth / 6; // Position circle on the left side
  circleY = drawHeight / 2;
  circleRadius = 75;

  // Initialize graph parameters
  graphX = canvasWidth / 3 + 20;
  graphY = drawHeight / 2;
  graphAmplitude = 100;
  graphPeriod = 360; // Adjusted for degrees

  // Create a new slider at the bottom of the canvas in the control region
  angleSlider = createSlider(0, 360, 0, 1);
  // Position the slider below the drawing region
  angleSlider.position(sliderLeftMargin, drawHeight + 20);
  // Make the slider width fill the area to the right of the label and value of the slider
  angleSlider.size(canvasWidth - sliderLeftMargin - 25);
}

function draw() {
  // Make the background drawing region a very light blue
  fill('aliceblue');
  // Draw a thin light gray outline for the region borders
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  // Make the background of the controls area white
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get the updated slider value
  let angle = angleSlider.value();

  // Draw circle and diameters
  noFill();
  stroke(128);
  strokeWeight(2);
  circle(circleX, circleY, 2 * circleRadius);
  line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
  line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

  // Draw moving points
  let pointX = circleX + circleRadius * cos(angle);
  let pointY = circleY - circleRadius * sin(angle);

  line(circleX, circleY, pointX, pointY);

  noStroke();

  fill('orange');
  circle(pointX, pointY, 10);

  fill('green');
  circle(pointX, circleY, 10);

  fill('purple');
  circle(circleX, pointY, 10);

  // Draw graph axes
  stroke('grey');
  strokeWeight(1);
  line(graphX, graphY, graphX + graphPeriod, graphY); // x-axis
  line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude); // y-axis
  line(
    graphX + graphPeriod,
    graphY - graphAmplitude,
    graphX + graphPeriod,
    graphY + graphAmplitude
  ); // end x-axis

  // Draw labels
  fill('grey');
  textAlign(CENTER, CENTER);
  text('0', graphX, graphY + graphAmplitude + 15);
  text('360', graphX + graphPeriod, graphY + graphAmplitude + 15);
  text('1', graphX - 15, graphY - graphAmplitude);
  text('0', graphX - 15, graphY);
  text('-1', graphX - 15, graphY + graphAmplitude);

  fill('purple');
  text('cos', graphX + graphPeriod + 30, graphY - graphAmplitude);
  fill('green');
  text('sin', graphX + graphPeriod + 30, graphY);

  // Draw cosine curve
  noFill();
  stroke('purple');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * cos(t);
    vertex(x, y);
  }
  endShape();

  // Draw sine curve
  noFill();
  stroke('green');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * sin(t);
    vertex(x, y);
  }
  endShape();

  // Draw moving line
  let lineX = map(angle, 0, 360, graphX, graphX + graphPeriod);
  stroke('grey');
  line(lineX, graphY - graphAmplitude, lineX, graphY + graphAmplitude);

  // Draw moving points on graph
  let orangeY = graphY - graphAmplitude * cos(angle);
  let redY = graphY - graphAmplitude * sin(angle);

  noStroke();

  fill('purple');
  circle(lineX, orangeY, 10);

  fill('green');
  circle(lineX, redY, 10);

  // Draw slider label
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT);
  text('Angle: ' + angle, 10, drawHeight + 20);
}
