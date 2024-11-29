// Circle Area Explorer
// Author: Dan McCreary
// Version: geometry-1

let canvasWidth = 667;
// The top drawing region above the interactive controls
let drawWidth = canvasWidth;
let drawHeight = 330;
// The control region where we place sliders and buttons
let controlHeight = 40;
// The total height of both the drawing region height + the control region height
let canvasHeight = drawHeight + controlHeight;
// Margin around the active plotting region
let margin = 25;
// The left margin area needs to hold the width of the text label and value
let sliderLeftMargin = 120;
// Larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

let radiusSlider, resetButton, toggleGraphButton;
let showGraph = false;
let circleX, circleY;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Initialize circle parameters
  circleX = canvasWidth / 4; // Position circle on the left side
  circleY = drawHeight / 2;

  // Create slider for radius control
  // range from 10 to 150 with a default of 100 and a step of 1
  radiusSlider = createSlider(10, 150, 100, 1);
  radiusSlider.position(sliderLeftMargin, drawHeight + 20);
  radiusSlider.size(canvasWidth - sliderLeftMargin - 120);

  // Create reset button
  /*
  resetButton = createButton("Reset Radius");
  resetButton.position(sliderLeftMargin + 220, drawHeight + 10);
  resetButton.mousePressed(() => {
    radiusSlider.value(75);
  });
  */

  // Create toggle graph button
  toggleGraphButton = createButton("Toggle Plot");
  toggleGraphButton.position(canvasWidth - 90, drawHeight + 18);
  toggleGraphButton.mousePressed(() => {
    showGraph = !showGraph;
  });
}

function draw() {
    // make the background drawing region a very light blue
    fill('aliceblue');
    // draw a thin light gray outline for the region borders
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);

    // make the background of the controls area white
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);


  let radius = radiusSlider.value();
  let area = PI * radius * radius;

  // Draw circle
  fill('Cornsilk');
  stroke('black');
  strokeWeight(2);
  circle(circleX, circleY, 2 * radius);

  // Display radius and area
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT);

  // text(`Radius: ${radius} units`, 10, 20);
  // Format without fraction digits
  const formattedArea = area.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  text(`Area: ${formattedArea} square units`, 10, 20);

  // Add the Formula
  textSize(24);
  text("A = π r²", 10, 50)

  // Draw graph if toggled on
  if (showGraph) {
    drawGraph(radius);
  }

  // Draw controls area
  fill('black');
  textAlign(LEFT);
  textSize(defaultTextSize);
  text("Radius: " + radius, 10, drawHeight + 25);
}

function drawGraph(radius) {
  let graphOriginX = canvasWidth / 2;
  let graphOriginY = drawHeight - 30;
  let graphWidth = canvasWidth / 2 - margin;
  let graphHeight = drawHeight - 40;

  // Draw graph axes
  stroke('black');
  strokeWeight(1);
  line(graphOriginX, graphOriginY, graphOriginX, graphOriginY - graphHeight); // Y-axis
  line(graphOriginX, graphOriginY, graphOriginX + graphWidth, graphOriginY); // X-axis

  // Labels
  fill('black');
  textSize(16);
  noStroke();
  textAlign(CENTER);
  text("Radius", graphOriginX + graphWidth / 2, graphOriginY + 20);
  textAlign(RIGHT);
  text("Area", graphOriginX - 10, graphOriginY - graphHeight + 50);
  

  // Plot radius vs area
  stroke('blue');
  noFill();
  beginShape();
  for (let r = 10; r <= 150; r++) {
    let x = map(r, 10, 150, graphOriginX, graphOriginX + graphWidth);
    let y = map(PI * r * r, 0, PI * 150 * 150, graphOriginY, graphOriginY - graphHeight);
    vertex(x, y);
  }
  endShape();

  // Highlight current point
  let currentX = map(radius, 10, 150, graphOriginX, graphOriginX + graphWidth);
  let currentY = map(PI * radius * radius, 0, PI * 150 * 150, graphOriginY, graphOriginY - graphHeight);
  fill('red');
  noStroke();
  circle(currentX, currentY, 8);
}
