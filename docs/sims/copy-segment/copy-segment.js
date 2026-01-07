// Copy a Segment Interactive Construction
// Step-by-step tutorial for copying a line segment

let canvasWidth = 750;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 5;

let prevBtn, nextBtn, resetBtn, autoBtn;
let isAutoPlaying = false;
let autoTimer = 0;

// Segment positions
let segmentAB = { ax: 150, ay: 120, bx: 350, by: 120 };
let pointC = { x: 150, y: 320 };
let pointD = { x: 0, y: 0 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Calculate point D
  let segLen = dist(segmentAB.ax, segmentAB.ay, segmentAB.bx, segmentAB.by);
  pointD.x = pointC.x + segLen;
  pointD.y = pointC.y;

  // Create buttons
  let btnY = drawHeight + 35;

  prevBtn = createButton('← Previous');
  prevBtn.position(150, btnY);
  prevBtn.size(100, 30);
  prevBtn.mousePressed(prevStep);

  nextBtn = createButton('Next →');
  nextBtn.position(270, btnY);
  nextBtn.size(100, 30);
  nextBtn.mousePressed(nextStep);

  resetBtn = createButton('Reset');
  resetBtn.position(390, btnY);
  resetBtn.size(80, 30);
  resetBtn.mousePressed(resetConstruction);

  autoBtn = createButton('▶ Auto Play');
  autoBtn.position(490, btnY);
  autoBtn.size(100, 30);
  autoBtn.mousePressed(toggleAutoPlay);

  describe('Step-by-step interactive tutorial for copying a segment construction', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#F0F8FF');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Copy a Segment: Step-by-Step Construction', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw construction based on current step
  drawConstruction();

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Step indicator
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Step ' + currentStep + ' of ' + maxSteps, canvasWidth / 2, drawHeight + 12);

  // Instruction text
  drawInstruction();

  // Auto play
  if (isAutoPlaying) {
    autoTimer++;
    if (autoTimer > 90) { // ~1.5 seconds per step
      autoTimer = 0;
      if (currentStep < maxSteps) {
        currentStep++;
      } else {
        isAutoPlaying = false;
        autoBtn.html('▶ Auto Play');
      }
    }
  }

  // Update button states
  prevBtn.attribute('disabled', currentStep === 0 ? '' : null);
  nextBtn.attribute('disabled', currentStep === maxSteps ? '' : null);
}

function drawConstruction() {
  // Original segment AB (always visible)
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
  textAlign(CENTER, BOTTOM);
  text('A', segmentAB.ax, segmentAB.ay - 10);
  text('B', segmentAB.bx, segmentAB.by - 10);

  // "Original segment" label
  textSize(12);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  fill('#1976D2');
  text('Original: AB', segmentAB.bx + 20, segmentAB.ay);

  // Point C (always visible)
  fill('#43A047');
  noStroke();
  ellipse(pointC.x, pointC.y, 12, 12);

  fill('#2E7D32');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('C', pointC.x, pointC.y - 10);
  textStyle(NORMAL);

  // Step-specific elements
  if (currentStep >= 1) {
    // Ray from C
    stroke('#9E9E9E');
    strokeWeight(2);
    setLineDash([8, 4]);
    line(pointC.x, pointC.y, pointC.x + 400, pointC.y);
    setLineDash([]);
  }

  if (currentStep >= 2) {
    // Compass at A-B showing radius
    drawCompassVisualization(segmentAB.ax, segmentAB.ay, segmentAB.bx, segmentAB.by, '#E53935');

    // Show radius measurement
    stroke('#E53935');
    strokeWeight(2);
    setLineDash([5, 3]);
    line(segmentAB.ax, segmentAB.ay + 25, segmentAB.bx, segmentAB.by + 25);
    setLineDash([]);

    fill('#E53935');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('radius = AB', (segmentAB.ax + segmentAB.bx) / 2, segmentAB.ay + 30);
  }

  if (currentStep >= 3) {
    // Compass moved to C
    drawCompassVisualization(pointC.x, pointC.y, pointD.x, pointD.y, '#E53935');
  }

  if (currentStep >= 4) {
    // Arc from C
    noFill();
    stroke('#FF9800');
    strokeWeight(3);
    let segLen = dist(segmentAB.ax, segmentAB.ay, segmentAB.bx, segmentAB.by);
    arc(pointC.x, pointC.y, segLen * 2, segLen * 2, -PI / 4, PI / 4);

    // Point D at intersection
    fill('#7B1FA2');
    noStroke();
    ellipse(pointD.x, pointD.y, 12, 12);

    fill('#7B1FA2');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('D', pointD.x, pointD.y - 10);
    textStyle(NORMAL);
  }

  if (currentStep >= 5) {
    // Final segment CD
    stroke('#43A047');
    strokeWeight(4);
    line(pointC.x, pointC.y, pointD.x, pointD.y);

    // Congruence marks
    drawCongruenceMark((segmentAB.ax + segmentAB.bx) / 2, segmentAB.ay, 0);
    drawCongruenceMark((pointC.x + pointD.x) / 2, pointC.y, 0);

    // Result label
    fill('#43A047');
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Copy: CD', pointD.x + 20, pointD.y);

    // Success box
    fill('#E8F5E9');
    stroke('#43A047');
    strokeWeight(2);
    rect(canvasWidth / 2 - 100, drawHeight - 70, 200, 50, 8);

    noStroke();
    fill('#2E7D32');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('CD ≅ AB ✓', canvasWidth / 2, drawHeight - 45);
    textStyle(NORMAL);
  }
}

function drawCompassVisualization(x1, y1, x2, y2, col) {
  // Simple compass visualization
  stroke(col);
  strokeWeight(2);

  // Draw compass legs (simplified)
  let mx = (x1 + x2) / 2;
  let my = min(y1, y2) - 60;

  line(x1, y1, mx, my); // Left leg to center
  line(x2, y2, mx, my); // Right leg to center

  // Compass point markers
  fill(col);
  noStroke();
  ellipse(x1, y1, 6, 6);
}

function drawCongruenceMark(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  stroke('#212121');
  strokeWeight(2);
  line(-5, -8, 5, -8);
  pop();
}

function drawInstruction() {
  let instructions = [
    'We will copy segment AB to create a new segment starting at C',
    'Step 1: Draw a ray from point C (this will contain the new segment)',
    'Step 2: Set compass radius equal to length AB (place point on A, pencil on B)',
    'Step 3: Place compass point on C (keeping the same radius)',
    'Step 4: Draw an arc intersecting the ray; label intersection point D',
    'Complete! Segment CD is congruent to segment AB (CD ≅ AB)'
  ];

  fill('#212121');
  textSize(13);
  textAlign(CENTER, TOP);
  text(instructions[currentStep], canvasWidth / 2, drawHeight + 70);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function nextStep() {
  if (currentStep < maxSteps) {
    currentStep++;
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
  }
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
  let btnY = drawHeight + 35;
  prevBtn.position(150, btnY);
  nextBtn.position(270, btnY);
  resetBtn.position(390, btnY);
  autoBtn.position(490, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 650);
  }
}
