// Flow Chart Proof: Vertical Angles Theorem
// Interactive flow chart with step-by-step reveal using canvas-based controls

let canvasWidth = 700;
let drawHeight = 740;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let currentStep = 0;
let maxSteps = 10;
let autoPlay = false;
let autoPlayTimer = 0;
let stepSpeed = 2000; // ms per step

// Canvas-based button definitions
let buttons = [];
let speedSliderX, speedSliderW, speedSliderVal;

// Box and arrow data
let boxes = [];
let arrowData = [];

// Box dimensions from spec
let boxW = 220;
let boxH = 60;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  speedSliderVal = 0.5; // normalized 0-1, maps to 1-5 seconds

  initializeBoxes();
  initializeArrows();
  initializeButtons();

  describe('Interactive flow chart proof of the Vertical Angles Theorem with step-by-step reveal', LABEL);
}

function initializeBoxes() {
  // Box positions use fractional coordinates relative to draw area
  // Colors from spec: Given/Proved=#C8E6C9, Definition=#BBDEFB, Supplementary=#FFCCBC, Equations=#E1BEE7
  boxes = [
    {
      id: 1, step: 1,
      text: '\u22201 and \u22202 are vertical angles',
      reason: 'GIVEN',
      xFrac: 0.5, yFrac: 0.065,
      color: '#C8E6C9', border: '#43A047'
    },
    {
      id: 2, step: 2,
      text: '\u22201 and \u22203 form a linear pair',
      reason: 'Definition of linear pair',
      xFrac: 0.27, yFrac: 0.185,
      color: '#BBDEFB', border: '#1976D2'
    },
    {
      id: 3, step: 3,
      text: '\u22202 and \u22203 form a linear pair',
      reason: 'Definition of linear pair',
      xFrac: 0.73, yFrac: 0.185,
      color: '#BBDEFB', border: '#1976D2'
    },
    {
      id: 4, step: 4,
      text: '\u22201 and \u22203 are supplementary',
      reason: 'Linear Pair Postulate',
      xFrac: 0.27, yFrac: 0.315,
      color: '#FFCCBC', border: '#E64A19'
    },
    {
      id: 5, step: 5,
      text: '\u22202 and \u22203 are supplementary',
      reason: 'Linear Pair Postulate',
      xFrac: 0.73, yFrac: 0.315,
      color: '#FFCCBC', border: '#E64A19'
    },
    {
      id: 6, step: 6,
      text: 'm\u22201 + m\u22203 = 180\u00B0',
      reason: 'Definition of supplementary',
      xFrac: 0.27, yFrac: 0.445,
      color: '#FFCCBC', border: '#E64A19'
    },
    {
      id: 7, step: 7,
      text: 'm\u22202 + m\u22203 = 180\u00B0',
      reason: 'Definition of supplementary',
      xFrac: 0.73, yFrac: 0.445,
      color: '#FFCCBC', border: '#E64A19'
    },
    {
      id: 8, step: 8,
      text: 'm\u22201 + m\u22203 = m\u22202 + m\u22203',
      reason: 'Transitive Property\n(Both equal 180\u00B0)',
      xFrac: 0.5, yFrac: 0.575,
      color: '#E1BEE7', border: '#7B1FA2'
    },
    {
      id: 9, step: 9,
      text: 'm\u22201 = m\u22202',
      reason: 'Subtraction Property',
      xFrac: 0.5, yFrac: 0.695,
      color: '#E1BEE7', border: '#7B1FA2'
    },
    {
      id: 10, step: 10,
      text: '\u22201 \u2245 \u22202',
      reason: 'PROVED \u2713',
      xFrac: 0.5, yFrac: 0.815,
      color: '#C8E6C9', border: '#43A047'
    }
  ];
}

function initializeArrows() {
  arrowData = [
    { from: 1, to: 2, label: 'By definition' },
    { from: 1, to: 3, label: 'By definition' },
    { from: 2, to: 4, label: '' },
    { from: 3, to: 5, label: '' },
    { from: 4, to: 6, label: '' },
    { from: 5, to: 7, label: '' },
    { from: 6, to: 8, label: '' },
    { from: 7, to: 8, label: '' },
    { from: 8, to: 9, label: '' },
    { from: 9, to: 10, label: 'Def. of congruent angles' }
  ];
}

function initializeButtons() {
  // Buttons will be drawn in draw(); positions set relative to canvas
  buttons = [
    { label: '\u25C0 Prev', action: 'prev', x: 0, y: 0, w: 70, h: 30 },
    { label: 'Next \u25B6', action: 'next', x: 0, y: 0, w: 70, h: 30 },
    { label: '\u25B6 Auto', action: 'auto', x: 0, y: 0, w: 70, h: 30 },
    { label: 'Reset', action: 'reset', x: 0, y: 0, w: 60, h: 30 }
  ];
}

function updateButtonPositions() {
  let btnY = drawHeight + 15;
  let startX = 20;
  let gap = 8;
  let cx = startX;
  for (let btn of buttons) {
    btn.x = cx;
    btn.y = btnY;
    cx += btn.w + gap;
  }
  // Speed slider position
  speedSliderX = cx + 50;
  speedSliderW = 100;
}

function draw() {
  updateCanvasSize();
  updateButtonPositions();

  background('#FAFAFA');

  // Title
  fill('#1565C0');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Flow Chart Proof: Vertical Angles Theorem', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw the corner diagram of intersecting lines
  drawCornerDiagram();

  // Draw arrows (behind boxes)
  drawArrows();

  // Draw boxes
  drawBoxes();

  // Control area background
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw canvas-based buttons
  drawButtons();

  // Draw speed slider
  drawSpeedSlider();

  // Step counter
  fill('#424242');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Step ' + currentStep + '/' + maxSteps, canvasWidth / 2, drawHeight + 48);

  // Auto-play logic
  if (autoPlay) {
    autoPlayTimer += deltaTime;
    let mappedSpeed = map(speedSliderVal, 0, 1, 1000, 4000);
    if (autoPlayTimer >= mappedSpeed) {
      autoPlayTimer = 0;
      if (currentStep < maxSteps) {
        currentStep++;
      } else {
        autoPlay = false;
        buttons[2].label = '\u25B6 Auto';
      }
    }
  }
}

function drawCornerDiagram() {
  // Small diagram in top-right showing intersecting lines with angles labeled
  let cx = canvasWidth - 75;
  let cy = 55;
  let lineLen = 40;

  // Background box
  fill(255, 255, 255, 200);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(cx - 55, cy - 40, 110, 80, 6);

  // Two intersecting lines
  stroke('#37474F');
  strokeWeight(2);
  // Line 1: top-left to bottom-right
  line(cx - lineLen, cy - lineLen * 0.6, cx + lineLen, cy + lineLen * 0.6);
  // Line 2: bottom-left to top-right
  line(cx - lineLen, cy + lineLen * 0.6, cx + lineLen, cy - lineLen * 0.6);

  // Label angles
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Angle 1 (top)
  fill('#43A047');
  text('\u22201', cx, cy - 18);

  // Angle 2 (bottom, vertical to 1)
  fill('#43A047');
  text('\u22202', cx, cy + 18);

  // Angle 3 (right)
  fill('#1976D2');
  text('\u22203', cx + 25, cy);

  textStyle(NORMAL);
}

function drawArrows() {
  for (let arr of arrowData) {
    let fromBox = boxes.find(b => b.id === arr.from);
    let toBox = boxes.find(b => b.id === arr.to);

    // Only draw if both boxes are visible
    if (fromBox.step <= currentStep && toBox.step <= currentStep) {
      let fx = fromBox.xFrac * canvasWidth;
      let fy = fromBox.yFrac * drawHeight + boxH / 2 + 8;
      let tx = toBox.xFrac * canvasWidth;
      let ty = toBox.yFrac * drawHeight - boxH / 2 - 8;

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

      // Arrow label
      if (arr.label && arr.label.length > 0) {
        let midX = (fx + tx) / 2;
        let midY = (fy + ty) / 2;
        fill('#546E7A');
        noStroke();
        textSize(9);
        textStyle(ITALIC);
        textAlign(CENTER, CENTER);

        // Offset label to the side for diagonal arrows
        let offsetX = 0;
        if (fx < tx) offsetX = -10;
        else if (fx > tx) offsetX = 10;

        // For arrows that go straight down, offset to the right
        if (abs(fx - tx) < 5) offsetX = 55;

        text(arr.label, midX + offsetX, midY);
        textStyle(NORMAL);
      }
    }
  }
}

function drawBoxes() {
  for (let box of boxes) {
    if (box.step <= currentStep) {
      let bx = box.xFrac * canvasWidth - boxW / 2;
      let by = box.yFrac * drawHeight - boxH / 2;

      // Glow for newest step
      if (box.step === currentStep) {
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = box.border;
      }

      // Box
      fill(box.color);
      stroke(box.border);
      strokeWeight(box.step === currentStep ? 3 : 2);
      rect(bx, by, boxW, boxH, 8);

      drawingContext.shadowBlur = 0;

      // Main text
      noStroke();
      fill('#212121');
      textSize(13);
      textAlign(CENTER, CENTER);
      textStyle(NORMAL);
      text(box.text, bx + boxW / 2, by + boxH / 2 - 6);

      // Reason (smaller, colored)
      fill(box.border);
      textSize(10);
      textStyle(ITALIC);

      // Multi-line reason support
      let reasonLines = box.reason.split('\n');
      for (let i = 0; i < reasonLines.length; i++) {
        text(reasonLines[i], bx + boxW / 2, by + boxH / 2 + 12 + i * 12);
      }
      textStyle(NORMAL);
    }
  }
}

function drawButtons() {
  for (let btn of buttons) {
    // Hover detection
    let isHover = mouseX > btn.x && mouseX < btn.x + btn.w &&
                  mouseY > btn.y && mouseY < btn.y + btn.h;

    // Button background
    if (isHover) {
      fill('#1565C0');
    } else {
      fill('#37474F');
    }
    stroke('#263238');
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    // Button text
    noStroke();
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    textStyle(NORMAL);
  }
}

function drawSpeedSlider() {
  let sliderY = drawHeight + 22;
  let sliderH = 6;

  // Label
  fill('#424242');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Speed:', speedSliderX - 45, sliderY + sliderH / 2);

  // Track
  fill('#CFD8DC');
  noStroke();
  rect(speedSliderX, sliderY, speedSliderW, sliderH, 3);

  // Fill
  fill('#1565C0');
  let fillW = speedSliderVal * speedSliderW;
  rect(speedSliderX, sliderY, fillW, sliderH, 3);

  // Thumb
  let thumbX = speedSliderX + fillW;
  fill('#0D47A1');
  stroke('#0D47A1');
  strokeWeight(1);
  ellipse(thumbX, sliderY + sliderH / 2, 14, 14);

  // Speed labels
  noStroke();
  fill('#757575');
  textSize(9);
  textAlign(LEFT, TOP);
  text('Slow', speedSliderX, sliderY + sliderH + 6);
  textAlign(RIGHT, TOP);
  text('Fast', speedSliderX + speedSliderW, sliderY + sliderH + 6);
}

function mousePressed() {
  // Check buttons
  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      if (btn.action === 'prev') {
        if (currentStep > 0) currentStep--;
      } else if (btn.action === 'next') {
        if (currentStep < maxSteps) currentStep++;
      } else if (btn.action === 'auto') {
        autoPlay = !autoPlay;
        autoPlayTimer = 0;
        btn.label = autoPlay ? '\u23F8 Pause' : '\u25B6 Auto';
      } else if (btn.action === 'reset') {
        currentStep = 0;
        autoPlay = false;
        buttons[2].label = '\u25B6 Auto';
      }
      return;
    }
  }

  // Check speed slider
  let sliderY = drawHeight + 22;
  if (mouseX >= speedSliderX - 5 && mouseX <= speedSliderX + speedSliderW + 5 &&
      mouseY >= sliderY - 10 && mouseY <= sliderY + 20) {
    speedSliderVal = constrain((mouseX - speedSliderX) / speedSliderW, 0, 1);
  }
}

function mouseDragged() {
  // Drag speed slider
  let sliderY = drawHeight + 22;
  if (mouseX >= speedSliderX - 5 && mouseX <= speedSliderX + speedSliderW + 5 &&
      mouseY >= sliderY - 15 && mouseY <= sliderY + 25) {
    speedSliderVal = constrain((mouseX - speedSliderX) / speedSliderW, 0, 1);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 750);
    canvasWidth = max(canvasWidth, 600);
  }
}
