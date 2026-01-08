// Triangle Inequality Explorer
// Shows which combinations of side lengths can form a triangle

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let sideA = 5;
let sideB = 7;
let sideC = 9;

let sliderA, sliderB, sliderC;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Triangle Inequality Explorer showing valid triangle conditions', LABEL);

  // Create sliders
  let sliderY = drawHeight + 30;
  let sliderWidth = 150;

  sliderA = createSlider(1, 15, sideA, 0.5);
  sliderA.position(100, sliderY);
  sliderA.size(sliderWidth);
  sliderA.parent(document.querySelector('main'));

  sliderB = createSlider(1, 15, sideB, 0.5);
  sliderB.position(canvasWidth / 2 - sliderWidth / 2, sliderY);
  sliderB.size(sliderWidth);
  sliderB.parent(document.querySelector('main'));

  sliderC = createSlider(1, 15, sideC, 0.5);
  sliderC.position(canvasWidth - sliderWidth - 100, sliderY);
  sliderC.size(sliderWidth);
  sliderC.parent(document.querySelector('main'));
}

function draw() {
  updateCanvasSize();

  sideA = sliderA.value();
  sideB = sliderB.value();
  sideC = sliderC.value();

  background('#E3F2FD');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Triangle Inequality Explorer", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#616161');
  textSize(11);
  text('Adjust the sliders to test different side lengths', canvasWidth / 2, 32);

  // Check triangle inequality
  let check1 = sideA + sideB > sideC;
  let check2 = sideB + sideC > sideA;
  let check3 = sideA + sideC > sideB;
  let isValid = check1 && check2 && check3;

  // Draw the construction attempt
  drawConstruction(isValid);

  // Draw inequality checks
  drawInequalityChecks(check1, check2, check3);

  // Control panel background
  fill('#FAFAFA');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Slider labels
  fill('#424242');
  textSize(12);
  textAlign(CENTER, TOP);
  text("Side a = " + sideA.toFixed(1), 175, drawHeight + 10);
  text("Side b = " + sideB.toFixed(1), canvasWidth / 2, drawHeight + 10);
  text("Side c = " + sideC.toFixed(1), canvasWidth - 175, drawHeight + 10);

  // Result message
  if (isValid) {
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text("✓ These sides CAN form a triangle!", canvasWidth / 2, canvasHeight - 15);
  } else {
    fill('#C62828');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text("✗ These sides CANNOT form a triangle!", canvasWidth / 2, canvasHeight - 15);
  }
  textStyle(NORMAL);
}

function drawConstruction(isValid) {
  let cx = canvasWidth / 2;
  let baseY = 280;

  // Scale sides to fit canvas
  let maxSide = max(sideA, sideB, sideC);
  let scale = 20;

  // Draw base (side c)
  let baseLen = sideC * scale;
  let ax = cx - baseLen / 2;
  let ay = baseY;
  let bx = cx + baseLen / 2;
  let by = baseY;

  // Base line
  stroke('#1565C0');
  strokeWeight(4);
  line(ax, ay, bx, by);

  // Endpoints
  fill('#1565C0');
  noStroke();
  ellipse(ax, ay, 12, 12);
  ellipse(bx, by, 12, 12);

  // Labels
  fill('#424242');
  textSize(12);
  textAlign(CENTER, TOP);
  text('A', ax, ay + 10);
  text('B', bx, by + 10);
  text('c = ' + sideC.toFixed(1), cx, ay + 25);

  // Draw arcs
  let arcRadiusA = sideB * scale;
  let arcRadiusB = sideA * scale;

  // Arc from A (radius = b)
  stroke(76, 175, 80, 150);
  strokeWeight(2);
  noFill();
  arc(ax, ay, arcRadiusA * 2, arcRadiusA * 2, -PI, 0);

  // Arc from B (radius = a)
  stroke(255, 152, 0, 150);
  arc(bx, by, arcRadiusB * 2, arcRadiusB * 2, -PI, 0);

  // Arc labels
  noStroke();
  fill('#4CAF50');
  textSize(10);
  textAlign(RIGHT, CENTER);
  text('b = ' + sideB.toFixed(1), ax - 5, ay - arcRadiusA / 2);

  fill('#FF9800');
  textAlign(LEFT, CENTER);
  text('a = ' + sideA.toFixed(1), bx + 5, by - arcRadiusB / 2);

  // Calculate intersection point (if valid)
  if (isValid) {
    // Using law of cosines to find angle at A
    let cosA = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC);
    let angleA = acos(constrain(cosA, -1, 1));

    let Cx = ax + arcRadiusA * cos(-angleA);
    let Cy = ay + arcRadiusA * sin(-angleA);

    // Draw the complete triangle
    stroke('#4CAF50');
    strokeWeight(3);
    line(ax, ay, Cx, Cy);

    stroke('#FF9800');
    line(bx, by, Cx, Cy);

    // Intersection point
    fill('#F44336');
    noStroke();
    ellipse(Cx, Cy, 14, 14);

    fill('#424242');
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('C', Cx, Cy - 10);

    // Success glow
    noFill();
    stroke(76, 175, 80, 100);
    strokeWeight(8);
    triangle(ax, ay, bx, by, Cx, Cy);
  } else {
    // Show gap where arcs don't meet
    fill('#F44336');
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Arcs don't intersect!", cx, baseY - 80);
    text("(Gap between arcs)", cx, baseY - 65);

    // Red X
    stroke('#F44336');
    strokeWeight(3);
    let xCenter = cx;
    let xY = baseY - 40;
    line(xCenter - 10, xY - 10, xCenter + 10, xY + 10);
    line(xCenter - 10, xY + 10, xCenter + 10, xY - 10);
  }
}

function drawInequalityChecks(check1, check2, check3) {
  let startX = 50;
  let startY = 60;
  let lineHeight = 22;

  textSize(11);
  textAlign(LEFT, TOP);

  // Identify longest side
  let longest = "";
  if (sideC >= sideA && sideC >= sideB) longest = "c";
  else if (sideA >= sideB) longest = "a";
  else longest = "b";

  // Check 1: a + b > c
  fill(check1 ? '#2E7D32' : '#C62828');
  let mark1 = check1 ? "✓" : "✗";
  let critical1 = (longest === "c") ? " ← critical" : "";
  text(mark1 + " a + b > c: " + sideA.toFixed(1) + " + " + sideB.toFixed(1) + " = " +
       (sideA + sideB).toFixed(1) + (check1 ? " > " : " ≤ ") + sideC.toFixed(1) + critical1,
       startX, startY);

  // Check 2: b + c > a
  fill(check2 ? '#2E7D32' : '#C62828');
  let mark2 = check2 ? "✓" : "✗";
  let critical2 = (longest === "a") ? " ← critical" : "";
  text(mark2 + " b + c > a: " + sideB.toFixed(1) + " + " + sideC.toFixed(1) + " = " +
       (sideB + sideC).toFixed(1) + (check2 ? " > " : " ≤ ") + sideA.toFixed(1) + critical2,
       startX, startY + lineHeight);

  // Check 3: a + c > b
  fill(check3 ? '#2E7D32' : '#C62828');
  let mark3 = check3 ? "✓" : "✗";
  let critical3 = (longest === "b") ? " ← critical" : "";
  text(mark3 + " a + c > b: " + sideA.toFixed(1) + " + " + sideC.toFixed(1) + " = " +
       (sideA + sideC).toFixed(1) + (check3 ? " > " : " ≤ ") + sideB.toFixed(1) + critical3,
       startX, startY + 2 * lineHeight);

  // Perimeter
  fill('#616161');
  textSize(10);
  text("Perimeter: " + (sideA + sideB + sideC).toFixed(1) + " units", startX, startY + 3 * lineHeight + 5);
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
