// Angle Classification Interactive
// Quiz-style game for practicing angle classification
// Students classify angles as acute, right, obtuse, or straight
// All controls are canvas-based (no DOM elements)
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Game state
let currentAngle = 45;
let score = 0;
let attempts = 0;
let feedback = "";
let feedbackColor = "#424242";
let showFeedback = false;
let answered = false;
let showNextButton = false;

// Flash animation
let flashAlpha = 0;
let flashColor;

// Button definitions (will be recalculated on resize)
let buttons = [];
let nextButton = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  initButtons();
  generateNewAngle();

  describe('Interactive quiz for classifying angles as acute, right, obtuse, or straight based on their measures', LABEL);
}

function initButtons() {
  let btnW = 145;
  let btnH = 40;
  let gap = 8;
  let totalW = 4 * btnW + 3 * gap;
  let startX = (canvasWidth - totalW) / 2;
  let btnY = drawHeight + 12;

  buttons = [
    {
      x: startX,
      y: btnY,
      w: btnW,
      h: btnH,
      label1: "Acute",
      label2: "(0\u00B0 < x < 90\u00B0)",
      type: "acute",
      baseColor: "#1976D2",
      hoverColor: "#1565C0"
    },
    {
      x: startX + btnW + gap,
      y: btnY,
      w: btnW,
      h: btnH,
      label1: "Right",
      label2: "(x = 90\u00B0)",
      type: "right",
      baseColor: "#1976D2",
      hoverColor: "#1565C0"
    },
    {
      x: startX + 2 * (btnW + gap),
      y: btnY,
      w: btnW,
      h: btnH,
      label1: "Obtuse",
      label2: "(90\u00B0 < x < 180\u00B0)",
      type: "obtuse",
      baseColor: "#1976D2",
      hoverColor: "#1565C0"
    },
    {
      x: startX + 3 * (btnW + gap),
      y: btnY,
      w: btnW,
      h: btnH,
      label1: "Straight",
      label2: "(x = 180\u00B0)",
      type: "straight",
      baseColor: "#1976D2",
      hoverColor: "#1565C0"
    }
  ];

  nextButton = {
    x: canvasWidth / 2 - 70,
    y: drawHeight + 62,
    w: 140,
    h: 32,
    label: "Next Angle \u2192",
    baseColor: "#7B1FA2",
    hoverColor: "#6A1B9A"
  };
}

function generateNewAngle() {
  // Generate random angle with weighted distribution to ensure variety
  let r = random();
  if (r < 0.35) {
    // Acute angle (most common for practice)
    currentAngle = floor(random(5, 89));
  } else if (r < 0.50) {
    // Right angle
    currentAngle = 90;
  } else if (r < 0.85) {
    // Obtuse angle
    currentAngle = floor(random(91, 179));
  } else {
    // Straight angle
    currentAngle = 180;
  }
}

function getCorrectType() {
  if (currentAngle > 0 && currentAngle < 90) return 'acute';
  if (currentAngle === 90) return 'right';
  if (currentAngle > 90 && currentAngle < 180) return 'obtuse';
  if (currentAngle === 180) return 'straight';
  return 'unknown';
}

function getExplanation(type) {
  switch (type) {
    case 'acute':
      return currentAngle + "\u00B0 is less than 90\u00B0, making it an acute angle.";
    case 'right':
      return "90\u00B0 is exactly a right angle.";
    case 'obtuse':
      return currentAngle + "\u00B0 is between 90\u00B0 and 180\u00B0, making it obtuse.";
    case 'straight':
      return "180\u00B0 forms a straight line.";
    default:
      return "";
  }
}

function checkAnswer(answer) {
  if (answered) return;

  answered = true;
  attempts++;
  let correct = getCorrectType();

  if (answer === correct) {
    score++;
    feedback = "Correct! " + getExplanation(correct);
    feedbackColor = "#2E7D32";
    flashColor = color(76, 175, 80, 180); // green flash
  } else {
    feedback = "Not quite. This is " + correct + ". " + getExplanation(correct);
    feedbackColor = "#C62828";
    flashColor = color(229, 57, 53, 180); // red flash
  }

  flashAlpha = 255;
  showFeedback = true;
  showNextButton = true;
}

function nextAngle() {
  generateNewAngle();
  showFeedback = false;
  answered = false;
  showNextButton = false;
  flashAlpha = 0;
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Flash effect overlay
  if (flashAlpha > 0) {
    noStroke();
    let fc = color(red(flashColor), green(flashColor), blue(flashColor), flashAlpha);
    fill(fc);
    rect(0, 0, canvasWidth, drawHeight);
    flashAlpha -= 8;
    if (flashAlpha < 0) flashAlpha = 0;
  }

  // Title
  fill('#1565C0');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Classification', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Score display in top-right
  fill('#424242');
  textSize(16);
  textAlign(RIGHT, TOP);
  noStroke();
  text('Score: ' + score + '/' + attempts, canvasWidth - 20, 16);

  // Question text
  fill('#37474F');
  textSize(20);
  textAlign(CENTER, TOP);
  noStroke();
  text('Classify this angle: ' + currentAngle + '\u00B0', canvasWidth / 2, 50);

  // Draw the angle visualization
  drawAngle();

  // Draw feedback text
  if (showFeedback) {
    fill(feedbackColor);
    textSize(15);
    textAlign(CENTER, TOP);
    noStroke();
    // Wrap feedback text if needed
    let maxW = canvasWidth - 60;
    text(feedback, canvasWidth / 2, drawHeight - 55, maxW);
  }

  // Draw classification buttons
  drawButtons();

  // Draw next button if applicable
  if (showNextButton) {
    drawNextButton();
  }
}

function drawAngle() {
  let cx = canvasWidth / 2;
  let cy = 250;
  let rayLen = 140;

  // Reference circle (dashed)
  noFill();
  stroke('#D0D0D0');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  circle(cx, cy, rayLen * 2);
  drawingContext.setLineDash([]);

  // Determine angle arc color based on type
  let arcCol;
  if (currentAngle < 90) arcCol = color(76, 175, 80, 100);       // green for acute
  else if (currentAngle === 90) arcCol = color(33, 150, 243, 100); // blue for right
  else if (currentAngle < 180) arcCol = color(255, 152, 0, 100);   // orange for obtuse
  else arcCol = color(156, 39, 176, 100);                          // purple for straight

  // Draw angle arc (pie wedge)
  fill(arcCol);
  stroke(arcCol);
  strokeWeight(2);
  arc(cx, cy, 90, 90, -radians(currentAngle), 0, PIE);

  // Fixed horizontal ray (pointing right)
  stroke('#1976D2');
  strokeWeight(4);
  line(cx, cy, cx + rayLen, cy);

  // Rotated ray
  let endX = cx + rayLen * cos(radians(-currentAngle));
  let endY = cy + rayLen * sin(radians(-currentAngle));
  stroke('#E53935');
  strokeWeight(4);
  line(cx, cy, endX, endY);

  // Ray arrowheads
  drawArrowhead(cx, cy, cx + rayLen, cy, '#1976D2');
  drawArrowhead(cx, cy, endX, endY, '#E53935');

  // Vertex point
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 14);

  // Angle label inside the arc
  fill('#37474F');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
  let labelAngle = radians(-currentAngle / 2);
  let labelR = 60;
  text(currentAngle + '\u00B0', cx + labelR * cos(labelAngle), cy + labelR * sin(labelAngle));
  textStyle(NORMAL);

  // Right angle marker (small square) for 90 degrees
  if (currentAngle === 90) {
    noFill();
    stroke('#1976D2');
    strokeWeight(2);
    let sqSize = 18;
    rect(cx, cy - sqSize, sqSize, sqSize);
  }

  // Show type label after answering
  if (showFeedback) {
    let correct = getCorrectType();
    let typeLabel = correct.toUpperCase();
    let typeColor;
    if (correct === 'acute') typeColor = '#4CAF50';
    else if (correct === 'right') typeColor = '#2196F3';
    else if (correct === 'obtuse') typeColor = '#FF9800';
    else typeColor = '#9C27B0';

    fill(typeColor);
    textSize(22);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text(typeLabel, cx, cy + rayLen + 20);
    textStyle(NORMAL);
  }
}

function drawArrowhead(x1, y1, x2, y2, col) {
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 10;
  push();
  translate(x2, y2);
  rotate(angle);
  fill(col);
  stroke(col);
  strokeWeight(1);
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();
}

function drawButtons() {
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    let isHover = isMouseOver(btn);
    let isDisabled = answered;

    // Button background
    if (isDisabled) {
      // After answering, highlight correct/incorrect
      let correct = getCorrectType();
      if (btn.type === correct) {
        fill('#4CAF50'); // green for correct
      } else {
        fill('#90A4AE'); // gray for disabled
      }
    } else if (isHover) {
      fill(btn.hoverColor);
    } else {
      fill(btn.baseColor);
    }

    noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, 6);

    // Button text
    fill('white');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    noStroke();
    text(btn.label1, btn.x + btn.w / 2, btn.y + btn.h / 2 - 8);
    textStyle(NORMAL);
    textSize(11);
    text(btn.label2, btn.x + btn.w / 2, btn.y + btn.h / 2 + 10);
  }
}

function drawNextButton() {
  let btn = nextButton;
  let isHover = isMouseOver(btn);

  fill(isHover ? btn.hoverColor : btn.baseColor);
  noStroke();
  rect(btn.x, btn.y, btn.w, btn.h, 6);

  fill('white');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  textStyle(NORMAL);
}

function isMouseOver(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
  // Check classification buttons
  if (!answered) {
    for (let i = 0; i < buttons.length; i++) {
      if (isMouseOver(buttons[i])) {
        checkAnswer(buttons[i].type);
        return;
      }
    }
  }

  // Check next button
  if (showNextButton && isMouseOver(nextButton)) {
    nextAngle();
    return;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  initButtons();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    // Clamp width for usability
    canvasWidth = max(canvasWidth, 620);
  }
}
