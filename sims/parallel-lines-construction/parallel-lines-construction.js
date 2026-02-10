// Parallel Lines Construction
// Interactive step-by-step construction of parallel lines using corresponding angles

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 5;

let prevBtn, nextBtn, resetBtn, autoBtn;
let isAutoPlaying = false;
let autoTimer = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let btnY = drawHeight + 30;

  prevBtn = createButton('← Previous');
  prevBtn.position(150, btnY);
  prevBtn.size(100, 28);
  prevBtn.mousePressed(prevStep);

  nextBtn = createButton('Next →');
  nextBtn.position(260, btnY);
  nextBtn.size(100, 28);
  nextBtn.mousePressed(nextStep);

  resetBtn = createButton('Reset');
  resetBtn.position(370, btnY);
  resetBtn.size(70, 28);
  resetBtn.mousePressed(resetConstruction);

  autoBtn = createButton('▶ Auto Play');
  autoBtn.position(450, btnY);
  autoBtn.size(100, 28);
  autoBtn.mousePressed(toggleAutoPlay);

  describe('Step-by-step construction of parallel lines using corresponding angles', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#F5F5F5');

  // Title
  fill('#1565C0');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Constructing Parallel Lines', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Using corresponding angles to create a parallel line through point P', canvasWidth / 2, 36);

  drawConstruction();

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Step indicator
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Step ' + currentStep + ' of ' + maxSteps, canvasWidth / 2, drawHeight + 10);

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
        autoBtn.html('▶ Auto Play');
      }
    }
  }
}

function drawConstruction() {
  // Given: Line ℓ and point P not on ℓ
  let lineY = 320;
  let lineLen = 300;
  let cx = canvasWidth / 2;

  // Point P above line
  let px = cx - 50;
  let py = 150;

  // Line ℓ
  stroke('#1976D2');
  strokeWeight(4);
  line(cx - lineLen, lineY, cx + lineLen, lineY);

  // Line label
  fill('#1976D2');
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('ℓ', cx + lineLen + 10, lineY);
  textStyle(NORMAL);

  // Point P
  fill('#E53935');
  noStroke();
  ellipse(px, py, 12, 12);

  fill('#E53935');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('P', px, py - 10);
  textStyle(NORMAL);

  // Transversal point Q on line ℓ
  let qx = cx;
  let qy = lineY;

  if (currentStep >= 1) {
    // Draw transversal through P to Q
    stroke('#FF9800');
    strokeWeight(3);
    line(px - 80, py - 80, qx + 80, qy + 80);

    // Point Q
    fill('#FF9800');
    noStroke();
    ellipse(qx, qy, 10, 10);

    fill('#FF9800');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Q', qx + 10, qy + 8);
    textStyle(NORMAL);

    // Transversal label
    fill('#FF9800');
    textSize(12);
    textAlign(LEFT, CENTER);
    text('transversal t', qx + 60, qy + 50);
  }

  if (currentStep >= 2) {
    // Show angle at Q (angle between ℓ and transversal)
    let transAngle = atan2(py - qy, px - qx);

    noFill();
    stroke('#7B1FA2');
    strokeWeight(2);
    arc(qx, qy, 60, 60, transAngle, 0);

    // Angle label
    fill('#7B1FA2');
    noStroke();
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('∠1', qx + 45, qy - 20);
    textStyle(NORMAL);
  }

  if (currentStep >= 3) {
    // Copy angle at P - draw arc from Q at P
    let transAngle = atan2(py - qy, px - qx);

    // Arc at P
    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(px, py, 60, 60, transAngle + PI, TWO_PI);

    // Construction arcs
    stroke('#43A047');
    strokeWeight(1);
    setLineDash([4, 4]);
    arc(px, py, 80, 80, transAngle + PI - 0.3, TWO_PI + 0.3);
    setLineDash([]);
  }

  if (currentStep >= 4) {
    // Show copied angle at P
    let transAngle = atan2(py - qy, px - qx);

    noFill();
    stroke('#43A047');
    strokeWeight(2);
    arc(px, py, 60, 60, PI, transAngle + PI);

    // Angle label
    fill('#43A047');
    noStroke();
    textSize(11);
    textStyle(BOLD);
    text('∠2', px - 45, py + 20);
    text('∠1 ≅ ∠2', px - 80, py + 50);
    textStyle(NORMAL);
  }

  if (currentStep >= 5) {
    // Draw parallel line m through P
    stroke('#43A047');
    strokeWeight(4);
    line(px - 200, py, px + 250, py);

    // Line m label
    fill('#43A047');
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('m', px + 260, py);
    textStyle(NORMAL);

    // Parallel arrows on both lines
    fill('#1976D2');
    noStroke();
    triangle(cx + 50, lineY - 8, cx + 50, lineY + 8, cx + 65, lineY);
    triangle(cx + 70, lineY - 8, cx + 70, lineY + 8, cx + 85, lineY);

    fill('#43A047');
    triangle(px + 100, py - 8, px + 100, py + 8, px + 115, py);
    triangle(px + 120, py - 8, px + 120, py + 8, px + 135, py);

    // Success box
    fill('#E8F5E9');
    stroke('#43A047');
    strokeWeight(2);
    rect(canvasWidth - 220, 80, 200, 70, 8);

    noStroke();
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('m ∥ ℓ ✓', canvasWidth - 120, 95);
    textStyle(NORMAL);
    textSize(11);
    fill('#424242');
    text('Corresponding angles', canvasWidth - 120, 118);
    text('are congruent!', canvasWidth - 120, 132);
  }
}

function drawInstruction() {
  let instructions = [
    'Given: Line ℓ and point P not on ℓ. Goal: Construct line m through P parallel to ℓ',
    'Step 1: Draw a transversal t through P intersecting ℓ at point Q',
    'Step 2: Identify the angle ∠1 formed between ℓ and the transversal at Q',
    'Step 3: Copy angle ∠1 at point P (use the angle copying construction)',
    'Step 4: The copied angle ∠2 is congruent to ∠1 (corresponding angles)',
    'Complete! Line m through P is parallel to ℓ (corresponding angles are congruent)'
  ];

  fill('#212121');
  textSize(12);
  textAlign(CENTER, TOP);
  text(instructions[currentStep], canvasWidth / 2, drawHeight + 65);
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
  autoBtn.html('▶ Auto Play');
}

function toggleAutoPlay() {
  isAutoPlaying = !isAutoPlaying;
  autoTimer = 0;
  autoBtn.html(isAutoPlaying ? '⏸ Pause' : '▶ Auto Play');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 30;
  prevBtn.position(150, btnY);
  nextBtn.position(260, btnY);
  resetBtn.position(370, btnY);
  autoBtn.position(450, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 700);
  }
}
