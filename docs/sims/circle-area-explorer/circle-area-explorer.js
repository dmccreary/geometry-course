// Circle Area Explorer
// Author: Dan McCreary
// Version: geometry-1
// Modified to add radius line and draggable small circle

let canvasWidth = 600;
let drawWidth = canvasWidth;
let drawHeight = 330;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 120;
// Larger text so students in the back of the room can read the labels
let defaultTextSize = 16;

let radiusSlider, toggleGraphButton;
let showGraph = false;
let circleX, circleY;

let dragging = false;
let angle = 0; // in radians
let radius = 100;

function setup() {
  canvasWidth = windowWidth;
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
  radiusSlider.position(sliderLeftMargin, drawHeight + 10);
  radiusSlider.size(canvasWidth - sliderLeftMargin - 120);

  // Create toggle graph button
  toggleGraphButton = createButton("Toggle Plot");
  toggleGraphButton.position(canvasWidth - 90, drawHeight + 10);
  toggleGraphButton.mousePressed(() => {
    showGraph = !showGraph;
  });
}

function draw() {
  // Make the background drawing region a very light blue
  fill('aliceblue');
  // Draw a thin light gray outline for the region borders
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Make the background of the controls area white
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  radius = radiusSlider.value();
  let area = PI * radius * radius;

  // Draw circle
  fill('cornsilk');
  stroke('black');
  strokeWeight(2);
  circle(circleX, circleY, 2 * radius);

  // Draw radius line
  let endX = circleX + radius * cos(angle);
  let endY = circleY + radius * sin(angle);

  stroke('black');
  line(circleX, circleY, endX, endY);

  // Draw small orange circle at the end
  fill('orange');
  noStroke();
  circle(endX, endY, 16); // Radius of 8 pixels

  // Display radius value at midpoint
  let midX = (circleX + endX) / 2;
  let midY = (circleY + endY) / 2;
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(defaultTextSize);
  text(`r = ${radius.toFixed(1)}`, midX, midY - 10);

  // Display area
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT);

  // Format area without fraction digits
  const formattedArea = area.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  text(`Area: ${formattedArea} square units`, 10, 20);

  // Add the formula
  textSize(24);
  text("A = π r²", 10, 50);

  // Draw graph if toggled on
  if (showGraph) {
    drawGraph(radius);
  }

  // Draw controls area
  fill('black');
  textAlign(LEFT);
  textSize(defaultTextSize);
  text("Radius: " + radius.toFixed(1), 10, drawHeight + 25);
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

function mousePressed() {
  let endX = circleX + radius * cos(angle);
  let endY = circleY + radius * sin(angle);
  if (dist(mouseX, mouseY, endX, endY) < 8) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    // Compute new angle and radius
    angle = atan2(mouseY - circleY, mouseX - circleX);
    radius = dist(mouseX, mouseY, circleX, circleY);
    // Constrain radius
    radius = constrain(radius, 10, 150);
    // Update the slider
    radiusSlider.value(radius);
  }
}

function mouseReleased() {
  dragging = false;
}

// Handle window resizing to make canvas responsive
function windowResized() {
    canvasWidth = windowWidth;
    drawWidth = canvasWidth;
    resizeCanvas(canvasWidth, canvasHeight);

    // Recalculate circle position to keep it centered on the left side
    circleX = canvasWidth / 4;
    circleY = drawHeight / 2;

    // Make the slider width change with the window
    radiusSlider.size(canvasWidth - sliderLeftMargin - 120);

    // Reposition the toggle button
    toggleGraphButton.position(canvasWidth - 90, drawHeight + 10);
}
