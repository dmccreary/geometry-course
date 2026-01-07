// Flow Chart Proof: Vertical Angles Theorem
// Interactive flow chart with step-by-step reveal

let canvasWidth = 850;
let drawHeight = 550;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 10;
let autoPlay = false;
let autoPlayTimer = 0;
let stepSpeed = 2000; // ms per step

let boxes = [];
let nextButton, prevButton, autoButton, resetButton;
let speedSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeBoxes();

  // Create buttons
  let btnY = drawHeight + 20;
  prevButton = createButton('◀ Prev');
  prevButton.position(canvasWidth / 2 - 180, btnY);
  prevButton.mousePressed(prevStep);

  nextButton = createButton('Next ▶');
  nextButton.position(canvasWidth / 2 - 110, btnY);
  nextButton.mousePressed(nextStep);

  autoButton = createButton('▶ Auto Play');
  autoButton.position(canvasWidth / 2 - 20, btnY);
  autoButton.mousePressed(toggleAutoPlay);

  resetButton = createButton('Reset');
  resetButton.position(canvasWidth / 2 + 80, btnY);
  resetButton.mousePressed(resetSteps);

  speedSlider = createSlider(1, 5, 2, 0.5);
  speedSlider.position(canvasWidth / 2 + 150, btnY + 5);
  speedSlider.size(80);

  describe('Interactive flow chart proof of the Vertical Angles Theorem with step-by-step reveal', LABEL);
}

function initializeBoxes() {
  boxes = [
    { id: 1, text: "∠1 and ∠2 are\nvertical angles", reason: "GIVEN", x: 0.5, y: 0.08, color: "#C8E6C9", border: "#43A047", step: 1 },
    { id: 2, text: "∠1 and ∠3 form\na linear pair", reason: "Definition of\nlinear pair", x: 0.25, y: 0.24, color: "#BBDEFB", border: "#1976D2", step: 2 },
    { id: 3, text: "∠2 and ∠3 form\na linear pair", reason: "Definition of\nlinear pair", x: 0.75, y: 0.24, color: "#BBDEFB", border: "#1976D2", step: 3 },
    { id: 4, text: "∠1 and ∠3 are\nsupplementary", reason: "Linear Pair\nPostulate", x: 0.25, y: 0.40, color: "#FFCCBC", border: "#E64A19", step: 4 },
    { id: 5, text: "∠2 and ∠3 are\nsupplementary", reason: "Linear Pair\nPostulate", x: 0.75, y: 0.40, color: "#FFCCBC", border: "#E64A19", step: 5 },
    { id: 6, text: "m∠1 + m∠3 = 180°", reason: "Definition of\nsupplementary", x: 0.25, y: 0.56, color: "#FFCCBC", border: "#E64A19", step: 6 },
    { id: 7, text: "m∠2 + m∠3 = 180°", reason: "Definition of\nsupplementary", x: 0.75, y: 0.56, color: "#FFCCBC", border: "#E64A19", step: 7 },
    { id: 8, text: "m∠1 + m∠3 =\nm∠2 + m∠3", reason: "Transitive Property", x: 0.5, y: 0.72, color: "#E1BEE7", border: "#7B1FA2", step: 8 },
    { id: 9, text: "m∠1 = m∠2", reason: "Subtraction Property", x: 0.5, y: 0.84, color: "#E1BEE7", border: "#7B1FA2", step: 9 },
    { id: 10, text: "∠1 ≅ ∠2", reason: "PROVED ✓", x: 0.5, y: 0.95, color: "#C8E6C9", border: "#43A047", step: 10 }
  ];
}

function draw() {
  updateCanvasSize();

  background('#FAFAFA');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Flow Chart Proof: Vertical Angles Theorem', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw arrows first (behind boxes)
  drawArrows();

  // Draw boxes
  drawBoxes();

  // Progress indicator
  fill('#424242');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Speed:', canvasWidth / 2 + 152, drawHeight + 55);

  textAlign(CENTER, CENTER);
  text(`Step ${currentStep}/${maxSteps}`, canvasWidth / 2, drawHeight + 55);

  // Auto-play logic
  if (autoPlay) {
    autoPlayTimer += deltaTime;
    stepSpeed = speedSlider.value() * 1000;
    if (autoPlayTimer >= stepSpeed) {
      autoPlayTimer = 0;
      if (currentStep < maxSteps) {
        currentStep++;
      } else {
        autoPlay = false;
        autoButton.html('▶ Auto Play');
      }
    }
  }
}

function drawArrows() {
  let bw = 120;
  let bh = 48;
  let arrowData = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 6 },
    { from: 5, to: 7 },
    { from: 6, to: 8 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 9, to: 10 }
  ];

  for (let arr of arrowData) {
    let fromBox = boxes.find(b => b.id === arr.from);
    let toBox = boxes.find(b => b.id === arr.to);

    // Only draw if both boxes are visible
    if (fromBox.step <= currentStep && toBox.step <= currentStep) {
      let fx = fromBox.x * canvasWidth;
      let fy = fromBox.y * drawHeight + bh / 2 + 5;
      let tx = toBox.x * canvasWidth;
      let ty = toBox.y * drawHeight - bh / 2 - 5;

      // Adjust for diagonal arrows
      if (fx !== tx) {
        fy -= 10;
        ty += 10;
      }

      stroke('#546E7A');
      strokeWeight(2);
      line(fx, fy, tx, ty);

      // Arrowhead
      let angle = atan2(ty - fy, tx - fx);
      fill('#546E7A');
      noStroke();
      push();
      translate(tx, ty);
      rotate(angle);
      triangle(-10, -5, -10, 5, 0, 0);
      pop();
    }
  }
}

function drawBoxes() {
  let bw = 130;
  let bh = 48;

  for (let box of boxes) {
    if (box.step <= currentStep) {
      let bx = box.x * canvasWidth - bw / 2;
      let by = box.y * drawHeight - bh / 2;

      // Glow for newest step
      if (box.step === currentStep) {
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = box.border;
      }

      // Box
      fill(box.color);
      stroke(box.border);
      strokeWeight(box.step === currentStep ? 3 : 2);
      rect(bx, by, bw, bh, 8);

      drawingContext.shadowBlur = 0;

      // Text
      noStroke();
      fill('#212121');
      textSize(10);
      textAlign(CENTER, CENTER);
      textStyle(NORMAL);

      let lines = box.text.split('\n');
      let lineH = 12;
      let startY = by + bh / 2 - (lines.length - 1) * lineH / 2;
      for (let i = 0; i < lines.length; i++) {
        text(lines[i], bx + bw / 2, startY + i * lineH);
      }

      // Reason label (below box for first/last, beside for others)
      fill(box.border);
      textSize(9);
      textStyle(ITALIC);
      if (box.id === 1 || box.id === 10) {
        textAlign(CENTER, TOP);
        text(box.reason.replace('\n', ' '), bx + bw / 2, by + bh + 3);
      } else {
        textAlign(CENTER, TOP);
        let reasonLines = box.reason.split('\n');
        for (let i = 0; i < reasonLines.length; i++) {
          text(reasonLines[i], bx + bw / 2, by + bh + 2 + i * 10);
        }
      }
      textStyle(NORMAL);
    }
  }
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

function toggleAutoPlay() {
  autoPlay = !autoPlay;
  autoPlayTimer = 0;
  if (autoPlay) {
    autoButton.html('⏸ Pause');
  } else {
    autoButton.html('▶ Auto Play');
  }
}

function resetSteps() {
  currentStep = 0;
  autoPlay = false;
  autoButton.html('▶ Auto Play');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 20;
  prevButton.position(canvasWidth / 2 - 180, btnY);
  nextButton.position(canvasWidth / 2 - 110, btnY);
  autoButton.position(canvasWidth / 2 - 20, btnY);
  resetButton.position(canvasWidth / 2 + 80, btnY);
  speedSlider.position(canvasWidth / 2 + 150, btnY + 5);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 700);
  }
}
