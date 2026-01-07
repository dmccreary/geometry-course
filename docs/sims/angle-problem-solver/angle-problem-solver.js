// Angle Relationship Problem Solver
// Interactive practice tool for solving angle problems

let canvasWidth = 750;
let drawHeight = 600;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let currentProblem = null;
let userAnswer = '';
let feedback = '';
let feedbackColor = '#424242';
let hintsUsed = 0;
let currentHint = '';
let showSolution = false;
let score = 0;
let attempts = 0;

let checkBtn, hintBtn, solutionBtn, nextBtn;
let inputField;

// Problem types
let problemTypes = [
  { type: 'complementary', name: 'Complementary Angles' },
  { type: 'supplementary', name: 'Supplementary Angles' },
  { type: 'vertical', name: 'Vertical Angles' },
  { type: 'linear-pair', name: 'Linear Pair' },
  { type: 'bisector', name: 'Angle Bisector' },
  { type: 'corresponding', name: 'Corresponding Angles' },
  { type: 'alternate-interior', name: 'Alternate Interior Angles' },
  { type: 'same-side-interior', name: 'Same-Side Interior Angles' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create controls
  let btnY = drawHeight + 20;

  inputField = createInput('');
  inputField.position(220, btnY);
  inputField.size(80, 24);
  inputField.attribute('placeholder', '°');

  checkBtn = createButton('Check');
  checkBtn.position(320, btnY);
  checkBtn.size(70, 28);
  checkBtn.mousePressed(checkAnswer);

  hintBtn = createButton('Hint');
  hintBtn.position(400, btnY);
  hintBtn.size(60, 28);
  hintBtn.mousePressed(showHint);

  solutionBtn = createButton('Solution');
  solutionBtn.position(470, btnY);
  solutionBtn.size(80, 28);
  solutionBtn.mousePressed(revealSolution);

  nextBtn = createButton('Next Problem');
  nextBtn.position(560, btnY);
  nextBtn.size(110, 28);
  nextBtn.mousePressed(generateProblem);

  generateProblem();

  describe('Interactive angle problem solver with hints and feedback', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Problem Solver', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Score display
  fill('#424242');
  textSize(14);
  textAlign(RIGHT, TOP);
  text('Score: ' + score + '/' + attempts, canvasWidth - 20, 10);

  // Problem type badge
  fill('#7B1FA2');
  noStroke();
  rect(20, 45, 200, 28, 14);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(currentProblem.typeName, 120, 59);

  // Problem statement
  fill('#212121');
  textSize(16);
  textAlign(CENTER, TOP);
  text(currentProblem.question, canvasWidth / 2, 90);

  // Draw diagram
  drawProblemDiagram();

  // Feedback area
  fill(feedbackColor);
  textSize(14);
  textAlign(CENTER, TOP);
  text(feedback, canvasWidth / 2, drawHeight - 70);

  // Hint area
  if (currentHint) {
    fill('#E3F2FD');
    stroke('#1976D2');
    strokeWeight(1);
    rect(50, drawHeight - 50, canvasWidth - 100, 40, 8);
    noStroke();
    fill('#1565C0');
    textSize(12);
    textAlign(CENTER, CENTER);
    text(currentHint, canvasWidth / 2, drawHeight - 30);
  }

  // Solution
  if (showSolution) {
    fill('#E8F5E9');
    stroke('#43A047');
    strokeWeight(2);
    rect(50, drawHeight - 130, canvasWidth - 100, 55, 8);
    noStroke();
    fill('#2E7D32');
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Solution: ' + currentProblem.solution, canvasWidth / 2, drawHeight - 105);
  }

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Answer label
  fill('#424242');
  textSize(14);
  textAlign(RIGHT, CENTER);
  text('Your Answer:', 210, drawHeight + 34);

  // Hints used indicator
  textAlign(LEFT, CENTER);
  textSize(11);
  fill('#757575');
  text('Hints used: ' + hintsUsed + '/3', 30, drawHeight + 70);
}

function drawProblemDiagram() {
  let cx = canvasWidth / 2;
  let cy = 280;

  push();
  translate(cx, cy);

  if (currentProblem.type === 'complementary') {
    drawComplementaryDiagram();
  } else if (currentProblem.type === 'supplementary') {
    drawSupplementaryDiagram();
  } else if (currentProblem.type === 'vertical') {
    drawVerticalDiagram();
  } else if (currentProblem.type === 'linear-pair') {
    drawLinearPairDiagram();
  } else if (currentProblem.type === 'bisector') {
    drawBisectorDiagram();
  } else if (currentProblem.type === 'corresponding' ||
             currentProblem.type === 'alternate-interior' ||
             currentProblem.type === 'same-side-interior') {
    drawParallelLinesDiagram();
  }

  pop();
}

function drawComplementaryDiagram() {
  let r = 80;
  let angle1 = currentProblem.givenAngle;
  let angle2 = 90 - angle1;

  // Right angle corner
  stroke('#424242');
  strokeWeight(3);
  line(-r, 0, r, 0);
  line(0, 0, 0, -r);

  // First angle (given)
  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(0, 0, 60, 60, radians(-angle1), 0, PIE);

  // Second angle (unknown)
  fill(244, 67, 54, 100);
  stroke('#E53935');
  strokeWeight(2);
  arc(0, 0, 60, 60, radians(-90), radians(-angle1), PIE);

  // Labels
  noStroke();
  fill('#43A047');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(angle1 + '°', 50, -15);

  fill('#E53935');
  text('?', 15, -45);
  textStyle(NORMAL);

  // Right angle symbol
  stroke('#424242');
  strokeWeight(1);
  noFill();
  rect(-12, -12, 12, 12);
}

function drawSupplementaryDiagram() {
  let r = 100;
  let angle1 = currentProblem.givenAngle;

  // Straight line
  stroke('#424242');
  strokeWeight(3);
  line(-r, 0, r, 0);

  // Ray up at angle
  let rayX = r * cos(radians(180 - angle1));
  let rayY = -r * sin(radians(180 - angle1));
  line(0, 0, rayX, rayY);

  // First angle (given)
  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(0, 0, 50, 50, radians(180 - angle1), radians(180), PIE);

  // Second angle (unknown)
  fill(244, 67, 54, 100);
  stroke('#E53935');
  strokeWeight(2);
  arc(0, 0, 50, 50, radians(-180 + angle1), radians(0), PIE);

  // Labels
  noStroke();
  fill('#43A047');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(angle1 + '°', -45, -25);

  fill('#E53935');
  text('?', 45, -15);
  textStyle(NORMAL);
}

function drawVerticalDiagram() {
  let r = 90;
  let angle = currentProblem.givenAngle;

  // Two intersecting lines
  stroke('#424242');
  strokeWeight(3);
  line(-r, 0, r, 0);

  let dx = r * cos(radians(angle));
  let dy = r * sin(radians(angle));
  line(-dx, dy, dx, -dy);

  // Angle 1 (given)
  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(0, 0, 50, 50, radians(-angle), 0, PIE);

  // Angle 3 (vertical to 1 - unknown)
  fill(244, 67, 54, 100);
  stroke('#E53935');
  strokeWeight(2);
  arc(0, 0, 50, 50, radians(180 - angle), radians(180), PIE);

  // Labels
  noStroke();
  fill('#43A047');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('∠1=' + angle + '°', 55, -20);

  fill('#E53935');
  text('∠3=?', -55, 20);
  textStyle(NORMAL);
}

function drawLinearPairDiagram() {
  let r = 100;
  let angle1 = currentProblem.givenAngle;

  // Straight line
  stroke('#424242');
  strokeWeight(3);
  line(-r, 0, r, 0);

  // Ray up
  let rayX = r * 0.8 * cos(radians(180 - angle1));
  let rayY = -r * 0.8 * sin(radians(180 - angle1));
  line(0, 0, rayX, rayY);

  // Angle 1 (given)
  fill(76, 175, 80, 100);
  stroke('#43A047');
  strokeWeight(2);
  arc(0, 0, 50, 50, radians(180 - angle1), radians(180), PIE);

  // Angle 2 (unknown)
  fill(244, 67, 54, 100);
  stroke('#E53935');
  strokeWeight(2);
  arc(0, 0, 50, 50, 0, radians(180 - angle1), PIE);

  // Labels
  noStroke();
  fill('#43A047');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('∠1=' + angle1 + '°', -55, -25);

  fill('#E53935');
  text('∠2=?', 50, -30);
  textStyle(NORMAL);
}

function drawBisectorDiagram() {
  let r = 90;
  let totalAngle = currentProblem.givenAngle;
  let halfAngle = totalAngle / 2;

  // Two rays from vertex
  stroke('#424242');
  strokeWeight(3);
  line(0, 0, r, 0);
  line(0, 0, r * cos(radians(-totalAngle)), r * sin(radians(-totalAngle)));

  // Bisector ray
  stroke('#7B1FA2');
  strokeWeight(2);
  setLineDash([5, 5]);
  line(0, 0, r * cos(radians(-halfAngle)), r * sin(radians(-halfAngle)));
  setLineDash([]);

  // Full angle arc
  noFill();
  stroke('#43A047');
  strokeWeight(2);
  arc(0, 0, 70, 70, radians(-totalAngle), 0);

  // Half angle (unknown)
  fill(244, 67, 54, 100);
  stroke('#E53935');
  strokeWeight(2);
  arc(0, 0, 50, 50, radians(-halfAngle), 0, PIE);

  // Labels
  noStroke();
  fill('#43A047');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('∠ABC=' + totalAngle + '°', 70, -50);

  fill('#7B1FA2');
  text('Bisector', 50, -25);

  fill('#E53935');
  text('∠ABD=?', 55, 10);
  textStyle(NORMAL);
}

function drawParallelLinesDiagram() {
  let lineLen = 120;
  let spacing = 80;

  // Parallel lines
  stroke('#1976D2');
  strokeWeight(3);
  line(-lineLen, -spacing / 2, lineLen, -spacing / 2);
  line(-lineLen, spacing / 2, lineLen, spacing / 2);

  // Parallel arrows
  fill('#1976D2');
  noStroke();
  triangle(-30, -spacing / 2 - 8, -30, -spacing / 2 + 8, -15, -spacing / 2);
  triangle(-50, -spacing / 2 - 8, -50, -spacing / 2 + 8, -35, -spacing / 2);
  triangle(-30, spacing / 2 - 8, -30, spacing / 2 + 8, -15, spacing / 2);
  triangle(-50, spacing / 2 - 8, -50, spacing / 2 + 8, -35, spacing / 2);

  // Transversal
  stroke('#E53935');
  strokeWeight(3);
  let tAngle = 60;
  line(-100 * cos(radians(tAngle)), -spacing / 2 - 60,
       100 * cos(radians(tAngle)), spacing / 2 + 60);

  // Draw specific angles based on type
  let givenAngle = currentProblem.givenAngle;
  let arcR = 25;

  if (currentProblem.type === 'corresponding') {
    // Angle 1 at top (given)
    fill(76, 175, 80, 100);
    stroke('#43A047');
    strokeWeight(2);
    arc(0, -spacing / 2, arcR * 2, arcR * 2, radians(-180), radians(-180 + tAngle), PIE);

    // Angle 5 at bottom (unknown)
    fill(244, 67, 54, 100);
    stroke('#E53935');
    arc(0, spacing / 2, arcR * 2, arcR * 2, radians(-180), radians(-180 + tAngle), PIE);

    noStroke();
    fill('#43A047');
    textSize(11);
    textAlign(CENTER, CENTER);
    text('∠1=' + givenAngle + '°', -55, -spacing / 2 - 10);
    fill('#E53935');
    text('∠5=?', -55, spacing / 2 - 10);
  } else if (currentProblem.type === 'alternate-interior') {
    // Angle 3 at top (given) - bottom right of upper intersection
    fill(76, 175, 80, 100);
    stroke('#43A047');
    strokeWeight(2);
    arc(0, -spacing / 2, arcR * 2, arcR * 2, 0, radians(tAngle), PIE);

    // Angle 6 at bottom (unknown) - top right of lower intersection
    fill(244, 67, 54, 100);
    stroke('#E53935');
    arc(0, spacing / 2, arcR * 2, arcR * 2, radians(-tAngle), 0, PIE);

    noStroke();
    fill('#43A047');
    textSize(11);
    textAlign(CENTER, CENTER);
    text('∠3=' + givenAngle + '°', 45, -spacing / 2 + 15);
    fill('#E53935');
    text('∠6=?', 45, spacing / 2 - 15);
  } else if (currentProblem.type === 'same-side-interior') {
    // Angle 4 at top (given)
    fill(76, 175, 80, 100);
    stroke('#43A047');
    strokeWeight(2);
    arc(0, -spacing / 2, arcR * 2, arcR * 2, radians(tAngle), radians(180), PIE);

    // Angle 6 at bottom (unknown)
    fill(244, 67, 54, 100);
    stroke('#E53935');
    arc(0, spacing / 2, arcR * 2, arcR * 2, radians(-tAngle), 0, PIE);

    noStroke();
    fill('#43A047');
    textSize(11);
    textAlign(CENTER, CENTER);
    text('∠4=' + givenAngle + '°', -50, -spacing / 2 + 20);
    fill('#E53935');
    text('∠6=?', 45, spacing / 2 - 15);
  }

  // Line labels
  noStroke();
  fill('#1976D2');
  textSize(14);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('l', -lineLen - 10, -spacing / 2);
  text('m', -lineLen - 10, spacing / 2);
  fill('#E53935');
  textAlign(LEFT, TOP);
  text('t', -80, -spacing / 2 - 55);
  textStyle(NORMAL);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function generateProblem() {
  let typeIndex = floor(random(problemTypes.length));
  let pType = problemTypes[typeIndex];

  hintsUsed = 0;
  currentHint = '';
  feedback = '';
  showSolution = false;
  inputField.value('');

  let given, answer, question, solution, hints;

  switch (pType.type) {
    case 'complementary':
      given = floor(random(15, 75));
      answer = 90 - given;
      question = 'Two angles are complementary. If one angle measures ' + given + '°, find the other angle.';
      solution = '90° - ' + given + '° = ' + answer + '°';
      hints = [
        'Complementary angles add up to 90°',
        'Set up: ' + given + '° + x = 90°',
        'Subtract: x = 90° - ' + given + '°'
      ];
      break;

    case 'supplementary':
      given = floor(random(30, 150));
      answer = 180 - given;
      question = 'Two angles are supplementary. If one angle measures ' + given + '°, find the other angle.';
      solution = '180° - ' + given + '° = ' + answer + '°';
      hints = [
        'Supplementary angles add up to 180°',
        'Set up: ' + given + '° + x = 180°',
        'Subtract: x = 180° - ' + given + '°'
      ];
      break;

    case 'vertical':
      given = floor(random(20, 160));
      answer = given;
      question = '∠1 and ∠3 are vertical angles. If m∠1 = ' + given + '°, find m∠3.';
      solution = 'Vertical angles are congruent, so m∠3 = ' + answer + '°';
      hints = [
        'Vertical angles are formed by two intersecting lines',
        'Vertical angles are always congruent (equal)',
        'm∠3 = m∠1 = ' + given + '°'
      ];
      break;

    case 'linear-pair':
      given = floor(random(30, 150));
      answer = 180 - given;
      question = '∠1 and ∠2 form a linear pair. If m∠1 = ' + given + '°, find m∠2.';
      solution = 'Linear pairs are supplementary: 180° - ' + given + '° = ' + answer + '°';
      hints = [
        'A linear pair forms a straight line (180°)',
        'Linear pairs are supplementary',
        'm∠2 = 180° - ' + given + '°'
      ];
      break;

    case 'bisector':
      given = floor(random(4, 18)) * 10; // Multiples of 10 for easy division
      answer = given / 2;
      question = 'BD bisects ∠ABC. If m∠ABC = ' + given + '°, find m∠ABD.';
      solution = 'Bisector divides equally: ' + given + '° ÷ 2 = ' + answer + '°';
      hints = [
        'An angle bisector divides an angle into two equal parts',
        'm∠ABD = m∠ABC ÷ 2',
        'm∠ABD = ' + given + '° ÷ 2'
      ];
      break;

    case 'corresponding':
      given = floor(random(40, 140));
      answer = given;
      question = 'Lines l ∥ m are cut by transversal t. If ∠1 = ' + given + '°, find ∠5 (corresponding).';
      solution = 'Corresponding angles are congruent: ∠5 = ' + answer + '°';
      hints = [
        'Corresponding angles are in the same position at each intersection',
        'When lines are parallel, corresponding angles are congruent',
        '∠5 = ∠1 = ' + given + '°'
      ];
      break;

    case 'alternate-interior':
      given = floor(random(40, 140));
      answer = given;
      question = 'Lines l ∥ m are cut by transversal t. If ∠3 = ' + given + '°, find ∠6 (alternate interior).';
      solution = 'Alternate interior angles are congruent: ∠6 = ' + answer + '°';
      hints = [
        'Alternate interior angles are on opposite sides of the transversal, between the parallel lines',
        'When lines are parallel, alternate interior angles are congruent',
        '∠6 = ∠3 = ' + given + '°'
      ];
      break;

    case 'same-side-interior':
      given = floor(random(40, 140));
      answer = 180 - given;
      question = 'Lines l ∥ m are cut by transversal t. If ∠4 = ' + given + '°, find ∠6 (same-side interior).';
      solution = 'Same-side interior angles are supplementary: 180° - ' + given + '° = ' + answer + '°';
      hints = [
        'Same-side interior angles are on the same side of the transversal, between the parallel lines',
        'Same-side interior angles are supplementary (add to 180°)',
        '∠6 = 180° - ' + given + '°'
      ];
      break;
  }

  currentProblem = {
    type: pType.type,
    typeName: pType.name,
    givenAngle: given,
    answer: answer,
    question: question,
    solution: solution,
    hints: hints
  };
}

function checkAnswer() {
  let userVal = parseInt(inputField.value());

  if (isNaN(userVal)) {
    feedback = 'Please enter a number';
    feedbackColor = '#E53935';
    return;
  }

  attempts++;

  if (userVal === currentProblem.answer) {
    feedback = 'Correct! ✓';
    feedbackColor = '#43A047';
    score++;
  } else {
    feedback = 'Not quite. The correct answer is ' + currentProblem.answer + '°';
    feedbackColor = '#E53935';
  }
}

function showHint() {
  if (hintsUsed < 3) {
    currentHint = 'Hint ' + (hintsUsed + 1) + ': ' + currentProblem.hints[hintsUsed];
    hintsUsed++;
  } else {
    currentHint = 'No more hints available. Try "Solution"';
  }
}

function revealSolution() {
  showSolution = true;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 20;
  inputField.position(220, btnY);
  checkBtn.position(320, btnY);
  hintBtn.position(400, btnY);
  solutionBtn.position(470, btnY);
  nextBtn.position(560, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 700);
  }
}
