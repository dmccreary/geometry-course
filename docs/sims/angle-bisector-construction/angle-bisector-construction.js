// Angle Bisector Construction Practice
// Interactive step-by-step angle bisector construction

let canvasWidth = 750;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 5;

let prevBtn, nextBtn, resetBtn, autoBtn, angleSlider;
let isAutoPlaying = false;
let autoTimer = 0;

let originalAngle = 80;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let btnY = drawHeight + 25;

  prevBtn = createButton('← Previous');
  prevBtn.position(80, btnY);
  prevBtn.size(100, 28);
  prevBtn.mousePressed(prevStep);

  nextBtn = createButton('Next →');
  nextBtn.position(190, btnY);
  nextBtn.size(100, 28);
  nextBtn.mousePressed(nextStep);

  resetBtn = createButton('Reset');
  resetBtn.position(300, btnY);
  resetBtn.size(70, 28);
  resetBtn.mousePressed(resetConstruction);

  autoBtn = createButton('▶ Auto');
  autoBtn.position(380, btnY);
  autoBtn.size(80, 28);
  autoBtn.mousePressed(toggleAutoPlay);

  angleSlider = createSlider(40, 140, 80, 5);
  angleSlider.position(530, btnY);
  angleSlider.size(140);

  describe('Step-by-step angle bisector construction with verification', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF8E1');

  originalAngle = angleSlider.value();

  // Title
  fill('#1565C0');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Bisector Construction', canvasWidth / 2, 10);
  textStyle(NORMAL);

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
  text('Angle: ' + originalAngle + '°', 470, drawHeight + 39);

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
  // Vertex B position
  let bx = 180, by = 350;
  let rayLen = 250;

  // Calculate ray endpoints
  // Ray BA (upper ray)
  let ax = bx + rayLen * cos(radians(-originalAngle));
  let ay = by + rayLen * sin(radians(-originalAngle));

  // Ray BC (right horizontal ray)
  let cx = bx + rayLen;
  let cy = by;

  // Draw angle rays
  stroke('#1976D2');
  strokeWeight(4);
  line(bx, by, ax, ay); // BA
  line(bx, by, cx, cy); // BC

  // Vertex B
  fill('#1976D2');
  noStroke();
  ellipse(bx, by, 12, 12);

  // Labels
  fill('#1565C0');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('B', bx - 20, by + 10);
  text('A', ax - 15, ay - 10);
  text('C', cx + 15, cy);
  textStyle(NORMAL);

  // Angle arc and measure
  noFill();
  stroke('#1976D2');
  strokeWeight(2);
  arc(bx, by, 50, 50, radians(-originalAngle), 0);

  fill('#1976D2');
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text('∠ABC = ' + originalAngle + '°', bx + 60, by - originalAngle / 2 - 20);

  // Arc radius from vertex
  let arcR1 = 80;

  if (currentStep >= 1) {
    // Arc from B intersecting both rays
    noFill();
    stroke('#E53935');
    strokeWeight(2);
    arc(bx, by, arcR1 * 2, arcR1 * 2, radians(-originalAngle - 10), radians(10));

    // Points P and Q
    let px = bx + arcR1 * cos(radians(-originalAngle));
    let py = by + arcR1 * sin(radians(-originalAngle));
    let qx = bx + arcR1;
    let qy = by;

    fill('#E53935');
    noStroke();
    ellipse(px, py, 10, 10);
    ellipse(qx, qy, 10, 10);

    fill('#E53935');
    textSize(12);
    textStyle(BOLD);
    text('P', px - 12, py - 8);
    text('Q', qx + 12, qy);
    textStyle(NORMAL);
  }

  if (currentStep >= 2) {
    // Arc from P (in interior of angle)
    let px = bx + arcR1 * cos(radians(-originalAngle));
    let py = by + arcR1 * sin(radians(-originalAngle));
    let arcR2 = 70;

    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(px, py, arcR2 * 2, arcR2 * 2, radians(-30), radians(90));
  }

  if (currentStep >= 3) {
    // Arc from Q (same radius)
    let qx = bx + arcR1;
    let qy = by;
    let arcR2 = 70;

    noFill();
    stroke('#FF9800');
    strokeWeight(2);
    arc(qx, qy, arcR2 * 2, arcR2 * 2, radians(-160), radians(-60));

    // Point D at intersection
    let dx = bx + 130 * cos(radians(-originalAngle / 2));
    let dy = by + 130 * sin(radians(-originalAngle / 2));

    fill('#7B1FA2');
    noStroke();
    ellipse(dx, dy, 12, 12);

    fill('#7B1FA2');
    textSize(14);
    textStyle(BOLD);
    text('D', dx + 12, dy - 8);
    textStyle(NORMAL);
  }

  if (currentStep >= 4) {
    // Draw ray BD (bisector)
    let dx = bx + rayLen * 0.9 * cos(radians(-originalAngle / 2));
    let dy = by + rayLen * 0.9 * sin(radians(-originalAngle / 2));

    stroke('#E53935');
    strokeWeight(3);
    line(bx, by, dx, dy);

    // Bisector label
    fill('#E53935');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Bisector BD', dx + 10, dy);
  }

  if (currentStep >= 5) {
    // Show both half angles with measures
    let halfAngle = originalAngle / 2;

    // Congruence arcs
    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(bx, by, 70, 70, radians(-originalAngle), radians(-halfAngle));

    stroke('#FF9800');
    arc(bx, by, 70, 70, radians(-halfAngle), 0);

    // Angle measures
    fill('#424242');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(halfAngle + '°', bx + 55, by - originalAngle * 0.75 - 5);
    text(halfAngle + '°', bx + 55, by - originalAngle * 0.25 - 5);

    // Success box
    fill('#E8F5E9');
    stroke('#43A047');
    strokeWeight(2);
    rect(canvasWidth - 230, 80, 210, 80, 8);

    noStroke();
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('∠ABD ≅ ∠DBC ✓', canvasWidth - 125, 95);
    textStyle(NORMAL);
    textSize(12);
    fill('#424242');
    text('∠ABD = ' + halfAngle + '°', canvasWidth - 125, 120);
    text('∠DBC = ' + halfAngle + '°', canvasWidth - 125, 140);
  }
}

function drawInstruction() {
  let instructions = [
    'We will bisect ∠ABC to create two congruent angles',
    'Step 1: Draw arc from vertex B intersecting both rays at P and Q',
    'Step 2: Draw arc from P toward the interior of the angle',
    'Step 3: Draw arc from Q with same radius - arcs intersect at D',
    'Step 4: Draw ray BD - this is the angle bisector',
    'Complete! ∠ABD ≅ ∠DBC - the angle is perfectly bisected!'
  ];

  fill('#212121');
  textSize(12);
  textAlign(CENTER, TOP);
  text(instructions[currentStep], canvasWidth / 2, drawHeight + 65);
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
  let btnY = drawHeight + 25;
  prevBtn.position(80, btnY);
  nextBtn.position(190, btnY);
  resetBtn.position(300, btnY);
  autoBtn.position(380, btnY);
  angleSlider.position(530, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 650);
  }
}
