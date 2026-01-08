// Perpendicular Bisector Explorer
// Interactive construction with equidistant property verification

let canvasWidth = 700;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 5;
let exploreMode = false;

let prevBtn, nextBtn, resetBtn, exploreBtn;

// Segment AB
let segmentAB = { ax: 200, ay: 280, bx: 500, by: 280 };

// Draggable point T on perpendicular bisector
let pointT = { x: 350, y: 150, dragging: false };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create buttons
  let btnY = drawHeight + 25;

  prevBtn = createButton('← Previous');
  prevBtn.position(100, btnY);
  prevBtn.size(100, 28);
  prevBtn.mousePressed(prevStep);

  nextBtn = createButton('Next →');
  nextBtn.position(210, btnY);
  nextBtn.size(100, 28);
  nextBtn.mousePressed(nextStep);

  resetBtn = createButton('Reset');
  resetBtn.position(320, btnY);
  resetBtn.size(70, 28);
  resetBtn.mousePressed(resetConstruction);

  exploreBtn = createButton('🔍 Explore');
  exploreBtn.position(400, btnY);
  exploreBtn.size(100, 28);
  exploreBtn.mousePressed(toggleExplore);

  describe('Perpendicular bisector construction with interactive equidistant property exploration', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#F0F8FF');

  // Title
  fill('#1565C0');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Perpendicular Bisector Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw construction
  drawConstruction();

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Step indicator or explore mode indicator
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);

  if (exploreMode) {
    fill('#7B1FA2');
    text('Explore Mode: Drag point T along the perpendicular bisector!', canvasWidth / 2, drawHeight + 8);
  } else {
    text('Step ' + currentStep + ' of ' + maxSteps, canvasWidth / 2, drawHeight + 8);
  }

  // Instruction
  drawInstruction();

  // Update button states
  if (exploreMode) {
    prevBtn.attribute('disabled', '');
    nextBtn.attribute('disabled', '');
  } else {
    prevBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
  }
}

function drawConstruction() {
  let midX = (segmentAB.ax + segmentAB.bx) / 2;
  let midY = (segmentAB.ay + segmentAB.by) / 2;
  let arcRadius = 120;

  // Segment AB (always visible)
  stroke('#1976D2');
  strokeWeight(4);
  line(segmentAB.ax, segmentAB.ay, segmentAB.bx, segmentAB.by);

  // Points A and B
  fill('#1976D2');
  noStroke();
  ellipse(segmentAB.ax, segmentAB.ay, 12, 12);
  ellipse(segmentAB.bx, segmentAB.by, 12, 12);

  // Labels
  fill('#1565C0');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('A', segmentAB.ax, segmentAB.ay + 12);
  text('B', segmentAB.bx, segmentAB.by + 12);
  textStyle(NORMAL);

  // Step-specific elements
  if (currentStep >= 2 || exploreMode) {
    // Arc from A
    noFill();
    stroke('#E53935');
    strokeWeight(2);
    arc(segmentAB.ax, segmentAB.ay, arcRadius * 2, arcRadius * 2, -PI / 2, PI / 2);
  }

  if (currentStep >= 3 || exploreMode) {
    // Arc from B
    noFill();
    stroke('#FF9800');
    strokeWeight(2);
    arc(segmentAB.bx, segmentAB.by, arcRadius * 2, arcRadius * 2, PI / 2, 3 * PI / 2);
  }

  if (currentStep >= 4 || exploreMode) {
    // Intersection points P and Q
    // Calculate intersection points
    let py = midY - Math.sqrt(arcRadius * arcRadius - Math.pow((segmentAB.bx - segmentAB.ax) / 2, 2));
    let qy = midY + Math.sqrt(arcRadius * arcRadius - Math.pow((segmentAB.bx - segmentAB.ax) / 2, 2));

    fill('#7B1FA2');
    noStroke();
    ellipse(midX, py, 10, 10);
    ellipse(midX, qy, 10, 10);

    fill('#7B1FA2');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('P', midX + 15, py);
    text('Q', midX + 15, qy);
    textStyle(NORMAL);
  }

  if (currentStep >= 5 || exploreMode) {
    // Perpendicular bisector line PQ
    let py = midY - 180;
    let qy = midY + 180;

    stroke('#43A047');
    strokeWeight(3);
    line(midX, py, midX, qy);

    // Midpoint M
    fill('#E53935');
    noStroke();
    ellipse(midX, midY, 12, 12);

    fill('#E53935');
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('M', midX + 10, midY);
    textStyle(NORMAL);

    // Right angle symbol
    stroke('#424242');
    strokeWeight(1);
    noFill();
    rect(midX, midY - 12, 12, 12);

    // Congruence marks on AM and MB
    drawCongruenceMark((segmentAB.ax + midX) / 2, segmentAB.ay - 8, 0);
    drawCongruenceMark((midX + segmentAB.bx) / 2, segmentAB.by - 8, 0);
  }

  // Explore mode: draggable point T
  if (exploreMode) {
    // Constrain T to perpendicular bisector
    pointT.x = midX;
    if (pointT.y < 80) pointT.y = 80;
    if (pointT.y > drawHeight - 30) pointT.y = drawHeight - 30;

    // Distance lines from T to A and B
    stroke('#1976D2');
    strokeWeight(2);
    setLineDash([6, 4]);
    line(pointT.x, pointT.y, segmentAB.ax, segmentAB.ay);
    line(pointT.x, pointT.y, segmentAB.bx, segmentAB.by);
    setLineDash([]);

    // Point T
    fill(pointT.dragging ? '#FF5722' : '#7B1FA2');
    noStroke();
    ellipse(pointT.x, pointT.y, 18, 18);

    fill('#FFFFFF');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('T', pointT.x, pointT.y);
    textStyle(NORMAL);

    // Distance display
    let distTA = dist(pointT.x, pointT.y, segmentAB.ax, segmentAB.ay);
    let distTB = dist(pointT.x, pointT.y, segmentAB.bx, segmentAB.by);

    // Distance info box
    fill('#E3F2FD');
    stroke('#1976D2');
    strokeWeight(2);
    rect(canvasWidth - 180, 50, 170, 90, 8);

    noStroke();
    fill('#1565C0');
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Distances:', canvasWidth - 170, 60);
    textStyle(NORMAL);

    fill('#424242');
    textSize(13);
    text('TA = ' + round(distTA) + ' px', canvasWidth - 170, 85);
    text('TB = ' + round(distTB) + ' px', canvasWidth - 170, 105);

    // Equality check
    fill(abs(distTA - distTB) < 1 ? '#43A047' : '#E53935');
    textStyle(BOLD);
    text('TA = TB ✓', canvasWidth - 170, 125);

    // Theorem box
    fill('#FFF9C4');
    stroke('#FBC02D');
    strokeWeight(1);
    rect(20, drawHeight - 80, canvasWidth - 40, 50, 8);

    noStroke();
    fill('#F57F17');
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('Every point on the perpendicular bisector is equidistant from the endpoints!', canvasWidth / 2, drawHeight - 55);
    textStyle(NORMAL);
  }
}

function drawCongruenceMark(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  stroke('#212121');
  strokeWeight(2);
  line(-5, 0, 5, 0);
  pop();
}

function drawInstruction() {
  let instructions = [
    'Given: Segment AB. We will construct its perpendicular bisector.',
    'Step 1: Segment AB is shown',
    'Step 2: Draw arc from A with radius > half of AB',
    'Step 3: Draw arc from B with the same radius',
    'Step 4: Mark intersection points P and Q',
    'Step 5: Draw line PQ — the perpendicular bisector! M is the midpoint.'
  ];

  if (!exploreMode) {
    fill('#212121');
    textSize(12);
    textAlign(CENTER, TOP);
    text(instructions[currentStep], canvasWidth / 2, drawHeight + 65);
  } else {
    fill('#7B1FA2');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Drag point T up and down. Notice: TA always equals TB!', canvasWidth / 2, drawHeight + 65);
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  if (exploreMode && dist(mouseX, mouseY, pointT.x, pointT.y) < 20) {
    pointT.dragging = true;
  }
}

function mouseDragged() {
  if (pointT.dragging) {
    pointT.y = mouseY;
  }
}

function mouseReleased() {
  pointT.dragging = false;
}

function nextStep() {
  if (currentStep < maxSteps) currentStep++;
}

function prevStep() {
  if (currentStep > 0) currentStep--;
}

function resetConstruction() {
  currentStep = 0;
  exploreMode = false;
  pointT.y = 150;
  exploreBtn.html('🔍 Explore');
}

function toggleExplore() {
  if (!exploreMode) {
    exploreMode = true;
    currentStep = 5;
    exploreBtn.html('📐 Steps');
  } else {
    exploreMode = false;
    exploreBtn.html('🔍 Explore');
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 25;
  prevBtn.position(100, btnY);
  nextBtn.position(210, btnY);
  resetBtn.position(320, btnY);
  exploreBtn.position(400, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 750);
    canvasWidth = max(canvasWidth, 600);
  }
}
