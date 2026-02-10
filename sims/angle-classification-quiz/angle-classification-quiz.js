// Angle Classification Quiz
// Interactive game for practicing angle classification

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentAngle = 45;
let score = 0;
let attempts = 0;
let feedback = "";
let feedbackColor = "#424242";
let showFeedback = false;
let answered = false;

let acuteBtn, rightBtn, obtuseBtn, straightBtn, nextBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  generateNewAngle();

  // Create buttons
  let btnY = drawHeight + 20;
  let btnW = 140;
  let gap = 10;
  let startX = canvasWidth / 2 - (4 * btnW + 3 * gap) / 2;

  acuteBtn = createButton('Acute\n(0° < x < 90°)');
  acuteBtn.position(startX, btnY);
  acuteBtn.size(btnW, 45);
  acuteBtn.mousePressed(() => checkAnswer('acute'));

  rightBtn = createButton('Right\n(x = 90°)');
  rightBtn.position(startX + btnW + gap, btnY);
  rightBtn.size(btnW, 45);
  rightBtn.mousePressed(() => checkAnswer('right'));

  obtuseBtn = createButton('Obtuse\n(90° < x < 180°)');
  obtuseBtn.position(startX + 2 * (btnW + gap), btnY);
  obtuseBtn.size(btnW, 45);
  obtuseBtn.mousePressed(() => checkAnswer('obtuse'));

  straightBtn = createButton('Straight\n(x = 180°)');
  straightBtn.position(startX + 3 * (btnW + gap), btnY);
  straightBtn.size(btnW, 45);
  straightBtn.mousePressed(() => checkAnswer('straight'));

  nextBtn = createButton('Next Angle →');
  nextBtn.position(canvasWidth / 2 - 60, btnY + 55);
  nextBtn.size(120, 30);
  nextBtn.mousePressed(nextAngle);
  nextBtn.hide();

  describe('Interactive quiz for classifying angles as acute, right, obtuse, or straight', LABEL);
}

function generateNewAngle() {
  // Generate a random angle with weighted distribution
  let r = random();
  if (r < 0.35) {
    // Acute angle
    currentAngle = floor(random(10, 89));
  } else if (r < 0.5) {
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

function checkAnswer(answer) {
  if (answered) return;

  answered = true;
  attempts++;
  let correct = getCorrectType();

  if (answer === correct) {
    score++;
    feedback = "Correct! " + getExplanation(correct);
    feedbackColor = "#2E7D32";
  } else {
    feedback = "Not quite. This is " + correct + ". " + getExplanation(correct);
    feedbackColor = "#C62828";
  }

  showFeedback = true;
  nextBtn.show();
}

function getExplanation(type) {
  switch (type) {
    case 'acute':
      return currentAngle + "° is less than 90°, so it's acute.";
    case 'right':
      return "90° is exactly a right angle.";
    case 'obtuse':
      return currentAngle + "° is between 90° and 180°, so it's obtuse.";
    case 'straight':
      return "180° forms a straight line.";
    default:
      return "";
  }
}

function nextAngle() {
  generateNewAngle();
  showFeedback = false;
  answered = false;
  nextBtn.hide();
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
  text('Angle Classification Quiz', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Score
  fill('#424242');
  textSize(14);
  textAlign(RIGHT, TOP);
  text('Score: ' + score + '/' + attempts, canvasWidth - 20, 10);

  // Question
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Classify this angle: ' + currentAngle + '°', canvasWidth / 2, 45);

  // Draw angle
  drawAngle();

  // Feedback
  if (showFeedback) {
    fill(feedbackColor);
    textSize(14);
    textAlign(CENTER, TOP);
    text(feedback, canvasWidth / 2, drawHeight - 50);
  }
}

function drawAngle() {
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 30;
  let rayLen = 130;

  // Background circle for reference
  noFill();
  stroke('#E0E0E0');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  circle(cx, cy, rayLen * 2);
  drawingContext.setLineDash([]);

  // Angle arc
  let arcColor;
  if (currentAngle < 90) arcColor = color(76, 175, 80, 100); // green
  else if (currentAngle === 90) arcColor = color(33, 150, 243, 100); // blue
  else if (currentAngle < 180) arcColor = color(255, 152, 0, 100); // orange
  else arcColor = color(156, 39, 176, 100); // purple

  fill(arcColor);
  stroke(arcColor);
  strokeWeight(2);
  arc(cx, cy, 80, 80, -radians(currentAngle), 0, PIE);

  // Fixed horizontal ray
  stroke('#1976D2');
  strokeWeight(4);
  line(cx, cy, cx + rayLen, cy);

  // Rotated ray
  let endX = cx + rayLen * cos(radians(-currentAngle));
  let endY = cy + rayLen * sin(radians(-currentAngle));
  stroke('#E53935');
  strokeWeight(4);
  line(cx, cy, endX, endY);

  // Vertex point
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 14);

  // Angle measurement in arc
  fill('#424242');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let labelAngle = radians(-currentAngle / 2);
  let labelR = 55;
  text(currentAngle + '°', cx + labelR * cos(labelAngle), cy + labelR * sin(labelAngle));
  textStyle(NORMAL);

  // Right angle marker if 90°
  if (currentAngle === 90) {
    noFill();
    stroke('#1976D2');
    strokeWeight(2);
    rect(cx, cy - 20, 20, 20);
  }

  // Color-coded type indicator
  let typeLabel = "";
  let typeColor = "#424242";
  if (showFeedback) {
    let correct = getCorrectType();
    if (correct === 'acute') { typeLabel = "ACUTE"; typeColor = "#4CAF50"; }
    else if (correct === 'right') { typeLabel = "RIGHT"; typeColor = "#2196F3"; }
    else if (correct === 'obtuse') { typeLabel = "OBTUSE"; typeColor = "#FF9800"; }
    else if (correct === 'straight') { typeLabel = "STRAIGHT"; typeColor = "#9C27B0"; }

    fill(typeColor);
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(typeLabel, cx, cy + 100);
    textStyle(NORMAL);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  repositionButtons();
}

function repositionButtons() {
  let btnY = drawHeight + 20;
  let btnW = 140;
  let gap = 10;
  let startX = canvasWidth / 2 - (4 * btnW + 3 * gap) / 2;

  acuteBtn.position(startX, btnY);
  rightBtn.position(startX + btnW + gap, btnY);
  obtuseBtn.position(startX + 2 * (btnW + gap), btnY);
  straightBtn.position(startX + 3 * (btnW + gap), btnY);
  nextBtn.position(canvasWidth / 2 - 60, btnY + 55);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 650);
  }
}
