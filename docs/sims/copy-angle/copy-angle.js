// Copy an Angle Interactive Construction
// Step-by-step tutorial for copying an angle

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 6;

let prevBtn, nextBtn, resetBtn, autoBtn, angleSlider;
let isAutoPlaying = false;
let autoTimer = 0;

// Original angle
let originalAngle = 65; // degrees

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create buttons
  let btnY = drawHeight + 20;

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

  autoBtn = createButton('▶ Auto');
  autoBtn.position(400, btnY);
  autoBtn.size(80, 28);
  autoBtn.mousePressed(toggleAutoPlay);

  angleSlider = createSlider(20, 140, 65, 5);
  angleSlider.position(560, btnY);
  angleSlider.size(140);

  describe('Step-by-step interactive tutorial for copying an angle construction', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF8E1');

  originalAngle = angleSlider.value();

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Copy an Angle: Step-by-Step Construction', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw construction
  drawConstruction();

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Step indicator
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Step ' + currentStep + ' of ' + maxSteps, canvasWidth / 2, drawHeight + 8);

  // Slider label
  fill('#424242');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Angle: ' + originalAngle + '°', 500, drawHeight + 34);

  // Instruction
  drawInstruction();

  // Auto play
  if (isAutoPlaying) {
    autoTimer++;
    if (autoTimer > 90) {
      autoTimer = 0;
      if (currentStep < maxSteps) {
        currentStep++;
      } else {
        isAutoPlaying = false;
        autoBtn.html('▶ Auto');
      }
    }
  }
}

function drawConstruction() {
  // Original angle ABC (top-left)
  let bx = 120, by = 200; // Vertex B
  let rayLen = 150;

  // Ray BA (going up-left)
  let ax = bx + rayLen * cos(radians(180 - originalAngle));
  let ay = by + rayLen * sin(radians(180 - originalAngle));

  // Ray BC (going right)
  let cx = bx + rayLen;
  let cy = by;

  // Draw original angle
  stroke('#1976D2');
  strokeWeight(3);
  line(bx, by, ax, ay); // BA
  line(bx, by, cx, cy); // BC

  // Vertex and points
  fill('#1976D2');
  noStroke();
  ellipse(bx, by, 10, 10);

  // Labels
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('B', bx - 15, by + 15);
  text('A', ax - 10, ay - 10);
  text('C', cx + 15, cy);

  // Angle arc and measure
  noFill();
  stroke('#1976D2');
  strokeWeight(2);
  arc(bx, by, 40, 40, radians(-originalAngle), 0);

  fill('#1976D2');
  noStroke();
  textSize(11);
  text(originalAngle + '°', bx + 35, by - 20);
  textStyle(NORMAL);

  // New angle starting ray DE (bottom)
  let dx = 120, dy = 420; // Vertex D
  let ex = dx + rayLen;
  let ey = dy;

  // Ray DE
  stroke('#43A047');
  strokeWeight(3);
  line(dx, dy, ex, ey);

  fill('#43A047');
  noStroke();
  ellipse(dx, dy, 10, 10);
  ellipse(ex, ey, 8, 8);

  fill('#2E7D32');
  textSize(14);
  textStyle(BOLD);
  text('D', dx - 15, dy + 15);
  text('E', ex + 15, ey);
  textStyle(NORMAL);

  // Step-specific elements
  let arcRadius = 60;

  if (currentStep >= 2) {
    // Arc from B intersecting BA and BC
    noFill();
    stroke('#E53935');
    strokeWeight(2);
    arc(bx, by, arcRadius * 2, arcRadius * 2, radians(-originalAngle - 20), radians(20));

    // Points P and Q
    let px = bx + arcRadius * cos(radians(-originalAngle));
    let py = by + arcRadius * sin(radians(-originalAngle));
    let qx = bx + arcRadius;
    let qy = by;

    fill('#E53935');
    noStroke();
    ellipse(px, py, 8, 8);
    ellipse(qx, qy, 8, 8);

    fill('#E53935');
    textSize(11);
    textAlign(CENTER, CENTER);
    text('P', px - 10, py - 10);
    text('Q', qx + 12, qy);
  }

  if (currentStep >= 3) {
    // Arc from D (same radius as step 2)
    noFill();
    stroke('#FF9800');
    strokeWeight(2);
    arc(dx, dy, arcRadius * 2, arcRadius * 2, radians(-originalAngle - 20), radians(20));

    // Point E' on arc
    let epx = dx + arcRadius;
    let epy = dy;

    fill('#FF9800');
    noStroke();
    textSize(11);
    text("E'", epx + 12, epy - 10);
  }

  if (currentStep >= 4) {
    // Show PQ distance measurement
    let px = bx + arcRadius * cos(radians(-originalAngle));
    let py = by + arcRadius * sin(radians(-originalAngle));
    let qx = bx + arcRadius;
    let qy = by;

    stroke('#7B1FA2');
    strokeWeight(2);
    setLineDash([4, 4]);
    line(px, py, qx, qy);
    setLineDash([]);

    fill('#7B1FA2');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('PQ', (px + qx) / 2, (py + qy) / 2 - 10);
  }

  if (currentStep >= 5) {
    // Arc from E' to find F
    let epx = dx + arcRadius;
    let epy = dy;

    // Calculate PQ distance
    let px = bx + arcRadius * cos(radians(-originalAngle));
    let py = by + arcRadius * sin(radians(-originalAngle));
    let qx = bx + arcRadius;
    let qy = by;
    let pqDist = dist(px, py, qx, qy);

    // Arc from E'
    noFill();
    stroke('#9C27B0');
    strokeWeight(2);
    arc(epx, epy, pqDist * 2, pqDist * 2, radians(-140), radians(-40));

    // Point F where arcs intersect
    let fx = dx + arcRadius * cos(radians(-originalAngle));
    let fy = dy + arcRadius * sin(radians(-originalAngle));

    fill('#9C27B0');
    noStroke();
    ellipse(fx, fy, 10, 10);

    fill('#9C27B0');
    textSize(12);
    textStyle(BOLD);
    text('F', fx - 10, fy - 10);
    textStyle(NORMAL);
  }

  if (currentStep >= 6) {
    // Final ray DF
    let fx = dx + rayLen * cos(radians(-originalAngle));
    let fy = dy + rayLen * sin(radians(-originalAngle));

    stroke('#43A047');
    strokeWeight(3);
    line(dx, dy, fx, fy);

    // Angle arc on new angle
    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(dx, dy, 40, 40, radians(-originalAngle), 0);

    // Show congruence
    fill('#43A047');
    noStroke();
    textSize(11);
    text(originalAngle + '°', dx + 35, dy - 20);

    // Success box
    fill('#E8F5E9');
    stroke('#43A047');
    strokeWeight(2);
    rect(canvasWidth / 2 + 80, drawHeight - 100, 200, 60, 8);

    noStroke();
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('∠EDF ≅ ∠ABC ✓', canvasWidth / 2 + 180, drawHeight - 80);
    textStyle(NORMAL);
    textSize(11);
    text('Both angles = ' + originalAngle + '°', canvasWidth / 2 + 180, drawHeight - 60);
  }
}

function drawInstruction() {
  let instructions = [
    'We will copy ∠ABC to create ∠EDF with the same measure',
    'Step 1: Ray DE is drawn (one side of new angle)',
    'Step 2: Draw arc from B intersecting both rays at P and Q',
    'Step 3: Draw arc from D with same radius',
    'Step 4: Measure distance PQ with compass',
    'Step 5: Draw arc from E\' with radius = PQ to find point F',
    'Complete! Draw ray DF. Now ∠EDF ≅ ∠ABC'
  ];

  fill('#212121');
  textSize(12);
  textAlign(CENTER, TOP);
  text(instructions[currentStep], canvasWidth / 2, drawHeight + 60);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function nextStep() {
  if (currentStep < maxSteps) currentStep++;
}

function prevStep() {
  if (currentStep > 0) currentStep--;
}

function resetConstruction() {
  currentStep = 0;
  isAutoPlaying = false;
  autoBtn.html('▶ Auto');
}

function toggleAutoPlay() {
  isAutoPlaying = !isAutoPlaying;
  autoTimer = 0;
  autoBtn.html(isAutoPlaying ? '⏸ Pause' : '▶ Auto');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 20;
  prevBtn.position(100, btnY);
  nextBtn.position(210, btnY);
  resetBtn.position(320, btnY);
  autoBtn.position(400, btnY);
  angleSlider.position(560, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 700);
  }
}
