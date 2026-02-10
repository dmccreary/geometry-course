// Reasoning Detective - Interactive Reasoning Challenge Game
// Students practice inductive reasoning, deductive reasoning, and counterexamples
// All controls are canvas-based (no DOM elements)
// MicroSim template version 2026.02

// ---- Canvas layout ----
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- Game state ----
let score = 0;
let attempts = 0;
let currentProblem = null;
let selectedOption = -1;
let answered = false;
let showHint = false;
let showExplanation = false;
let feedbackMessage = '';
let feedbackColor = '#424242';
let counterexampleInput = '';
let cursorBlink = 0;

// ---- Problem bank ----
let problems = [];

// ---- Colors ----
const COLORS = {
  bg: '#F5F5F5',
  topBg: '#FFFFFF',
  topBorder: '#90CAF9',
  midBg: '#FFF9C4',
  botBg: '#ECEFF1',
  inductive: '#1565C0',
  deductive: '#2E7D32',
  counterexample: '#E65100',
  correct: '#2E7D32',
  incorrect: '#C62828',
  optionFill: '#FFFFFF',
  optionHover: '#E3F2FD',
  optionSelected: '#BBDEFB',
  optionCorrect: '#C8E6C9',
  optionIncorrect: '#FFCDD2'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initProblems();
  loadProblem();

  describe('Reasoning Detective: an interactive game for practicing inductive reasoning, deductive reasoning, and finding counterexamples', LABEL);
}

function draw() {
  updateCanvasSize();
  cursorBlink += 0.05;

  background(COLORS.bg);

  drawTopSection();
  drawMiddleSection();
  drawBottomSection();
}

// ============ TOP SECTION: Problem Display ============

function drawTopSection() {
  let topH = 200;

  // White background with blue border
  fill(COLORS.topBg);
  stroke(COLORS.topBorder);
  strokeWeight(2);
  rect(10, 10, canvasWidth - 20, topH, 8);
  noStroke();

  if (!currentProblem) return;

  // Reasoning type badge
  let badgeColor, badgeText;
  if (currentProblem.type === 'inductive') {
    badgeColor = COLORS.inductive;
    badgeText = 'Inductive Reasoning';
  } else if (currentProblem.type === 'deductive') {
    badgeColor = COLORS.deductive;
    badgeText = 'Deductive Reasoning';
  } else {
    badgeColor = COLORS.counterexample;
    badgeText = 'Counterexample Hunt';
  }

  // Badge pill
  textSize(13);
  let bw = textWidth(badgeText) + 30;
  fill(badgeColor);
  noStroke();
  rect(25, 22, bw, 28, 14);
  fill('#FFFFFF');
  textAlign(LEFT, CENTER);
  text(badgeText, 40, 36);

  // Problem title
  fill('#212121');
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text(currentProblem.title, canvasWidth / 2, 60);
  textStyle(NORMAL);

  // Problem description with word wrap
  fill('#424242');
  textSize(16);
  textAlign(CENTER, TOP);
  drawWrappedText(currentProblem.description, canvasWidth / 2, 90, canvasWidth - 80, 20);

  // Show examples for inductive problems
  if (currentProblem.type === 'inductive' && currentProblem.examples) {
    fill('#37474F');
    textSize(14);
    textAlign(CENTER, TOP);
    let yPos = 130;
    for (let i = 0; i < currentProblem.examples.length; i++) {
      text(currentProblem.examples[i], canvasWidth / 2, yPos);
      yPos += 18;
    }
  }

  // Show facts in boxes for deductive problems
  if (currentProblem.type === 'deductive' && currentProblem.facts) {
    let factY = 125;
    let factW = min(canvasWidth - 100, 500);
    let factX = canvasWidth / 2 - factW / 2;
    textSize(14);
    for (let i = 0; i < currentProblem.facts.length; i++) {
      fill('#E3F2FD');
      stroke('#90CAF9');
      strokeWeight(1);
      rect(factX, factY, factW, 26, 4);
      noStroke();
      fill('#1565C0');
      textAlign(CENTER, CENTER);
      text(currentProblem.facts[i], factX + factW / 2, factY + 13);
      factY += 32;
    }
  }

  // Show conjecture for counterexample problems
  if (currentProblem.type === 'counterexample') {
    fill('#E65100');
    textSize(15);
    textStyle(ITALIC);
    textAlign(CENTER, TOP);
    noStroke();
    text('Conjecture: "' + currentProblem.conjecture + '"', canvasWidth / 2, 130);
    textStyle(NORMAL);
    fill('#616161');
    textSize(13);
    text(currentProblem.instructions, canvasWidth / 2, 160);
  }
}

// ============ MIDDLE SECTION: Interactive Area ============

function drawMiddleSection() {
  let midY = 220;
  let midH = drawHeight - midY;

  // Light yellow background
  fill(COLORS.midBg);
  stroke('#FFE082');
  strokeWeight(1);
  rect(10, midY, canvasWidth - 20, midH, 8);
  noStroke();

  if (!currentProblem) return;

  if (currentProblem.type === 'inductive' || currentProblem.type === 'deductive') {
    drawMultipleChoice(midY, midH);
  } else if (currentProblem.type === 'counterexample') {
    drawCounterexampleUI(midY, midH);
  }

  // Feedback message
  if (answered && feedbackMessage) {
    drawFeedbackBox(midY + midH - 50);
  }
}

function drawMultipleChoice(midY, midH) {
  let options = currentProblem.options;
  if (!options) return;

  let optW = min(canvasWidth - 80, 800);
  let optH = 42;
  let gap = 8;
  let startY = midY + 18;

  // Question label
  fill('#424242');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text(currentProblem.question, canvasWidth / 2, startY);
  textStyle(NORMAL);
  startY += 30;

  let optX = canvasWidth / 2 - optW / 2;

  for (let i = 0; i < options.length; i++) {
    let optY = startY + i * (optH + gap);

    // Determine fill color based on state
    let fillColor = COLORS.optionFill;
    if (answered) {
      if (i === currentProblem.correctIndex) {
        fillColor = COLORS.optionCorrect;
      } else if (i === selectedOption && i !== currentProblem.correctIndex) {
        fillColor = COLORS.optionIncorrect;
      }
    } else if (i === selectedOption) {
      fillColor = COLORS.optionSelected;
    } else if (isMouseOverRect(optX, optY, optW, optH)) {
      fillColor = COLORS.optionHover;
    }

    fill(fillColor);
    stroke('#BDBDBD');
    strokeWeight(1);
    rect(optX, optY, optW, optH, 6);

    // Option letter
    noStroke();
    fill('#1565C0');
    textSize(15);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(String.fromCharCode(65 + i) + '.', optX + 15, optY + optH / 2);

    // Option text
    fill('#212121');
    textStyle(NORMAL);
    textSize(15);
    text(options[i], optX + 40, optY + optH / 2);

    // Check or X icon after answering
    if (answered) {
      textSize(18);
      textAlign(RIGHT, CENTER);
      if (i === currentProblem.correctIndex) {
        fill('#2E7D32');
        text('\u2713', optX + optW - 15, optY + optH / 2);
      } else if (i === selectedOption && i !== currentProblem.correctIndex) {
        fill('#C62828');
        text('\u2717', optX + optW - 15, optY + optH / 2);
      }
      textSize(15);
    }
  }
}

function drawCounterexampleUI(midY, midH) {
  // Label
  fill('#424242');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  noStroke();
  text('Enter a number to test:', canvasWidth / 2, midY + 15);
  textStyle(NORMAL);

  // Number input box
  let inputW = 200;
  let inputH = 50;
  let inputX = canvasWidth / 2 - inputW / 2 - 70;
  let inputY = midY + 42;

  fill('#FFFFFF');
  stroke('#1976D2');
  strokeWeight(2);
  rect(inputX, inputY, inputW, inputH, 6);

  // Input text with blinking cursor
  noStroke();
  fill('#212121');
  textSize(24);
  textAlign(CENTER, CENTER);
  let displayText = counterexampleInput;
  if (!answered && sin(cursorBlink) > 0) {
    displayText += '|';
  }
  text(displayText || (!answered ? '|' : ''), inputX + inputW / 2, inputY + inputH / 2);

  // Test button
  let testBtnX = inputX + inputW + 20;
  let testBtnY = inputY + 5;
  let testBtnW = 110;
  let testBtnH = 40;

  let testHover = isMouseOverRect(testBtnX, testBtnY, testBtnW, testBtnH);
  fill(answered ? '#9E9E9E' : (testHover ? '#1565C0' : '#1976D2'));
  noStroke();
  rect(testBtnX, testBtnY, testBtnW, testBtnH, 6);
  fill('#FFFFFF');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Test It!', testBtnX + testBtnW / 2, testBtnY + testBtnH / 2);
  textStyle(NORMAL);

  // Number pad grid: two rows of 5, plus Clear and +/- buttons
  let padBtnW = 50;
  let padBtnH = 40;
  let padGap = 5;
  let totalPadW = 5 * padBtnW + 4 * padGap;
  let padStartX = canvasWidth / 2 - (totalPadW + padGap + 65) / 2;
  let padStartY = inputY + inputH + 18;

  // Row 1: digits 1 through 5
  for (let i = 1; i <= 5; i++) {
    let bx = padStartX + (i - 1) * (padBtnW + padGap);
    let by = padStartY;
    drawNumPadButton(bx, by, padBtnW, padBtnH, str(i));
  }

  // Row 2: digits 6 through 9 and 0
  let row2Nums = [6, 7, 8, 9, 0];
  for (let i = 0; i < 5; i++) {
    let bx = padStartX + i * (padBtnW + padGap);
    let by = padStartY + padBtnH + padGap;
    drawNumPadButton(bx, by, padBtnW, padBtnH, str(row2Nums[i]));
  }

  // Clear button
  let clrX = padStartX + 5 * (padBtnW + padGap) + 10;
  let clrY = padStartY;
  let clrW = 60;

  let clrHover = isMouseOverRect(clrX, clrY, clrW, padBtnH);
  fill(clrHover ? '#FFCDD2' : '#FFEBEE');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(clrX, clrY, clrW, padBtnH, 4);
  noStroke();
  fill('#C62828');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Clear', clrX + clrW / 2, clrY + padBtnH / 2);
  textStyle(NORMAL);

  // +/- (negative sign toggle) button
  let negY = padStartY + padBtnH + padGap;
  let negHover = isMouseOverRect(clrX, negY, clrW, padBtnH);
  fill(negHover ? '#E3F2FD' : '#FFFFFF');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(clrX, negY, clrW, padBtnH, 4);
  noStroke();
  fill('#212121');
  textSize(18);
  textAlign(CENTER, CENTER);
  text('+/-', clrX + clrW / 2, negY + padBtnH / 2);
}

function drawNumPadButton(x, y, w, h, label) {
  let hover = isMouseOverRect(x, y, w, h);
  fill(hover ? '#E3F2FD' : '#FFFFFF');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(x, y, w, h, 4);
  noStroke();
  fill('#212121');
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function drawFeedbackBox(y) {
  let boxW = min(canvasWidth - 60, 780);
  let boxX = canvasWidth / 2 - boxW / 2;
  let isCorrect = feedbackColor === COLORS.correct;

  fill(isCorrect ? '#E8F5E9' : '#FFF3E0');
  stroke(isCorrect ? '#66BB6A' : '#FF9800');
  strokeWeight(2);
  rect(boxX, y, boxW, 36, 6);

  noStroke();
  fill(feedbackColor);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(feedbackMessage, canvasWidth / 2, y + 18);
  textStyle(NORMAL);
}

// ============ BOTTOM SECTION: Score and Controls ============

function drawBottomSection() {
  let botY = drawHeight;

  // Background
  fill(COLORS.botBg);
  noStroke();
  rect(0, botY, canvasWidth, controlHeight);

  // Score display
  fill('#212121');
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Correct: ' + score + '  |  Attempts: ' + attempts, 25, botY + 22);
  textStyle(NORMAL);

  // Accuracy progress bar
  let barX = 25;
  let barY = botY + 40;
  let barW = canvasWidth - 50;
  let barH = 16;

  fill('#E0E0E0');
  noStroke();
  rect(barX, barY, barW, barH, 8);

  if (attempts > 0) {
    let ratio = score / attempts;
    let progressColor = lerpColor(color('#EF5350'), color('#66BB6A'), ratio);
    fill(progressColor);
    rect(barX, barY, barW * ratio, barH, 8);

    fill('#FFFFFF');
    textSize(11);
    textAlign(CENTER, CENTER);
    text(nf(ratio * 100, 1, 0) + '% accuracy', barX + barW / 2, barY + barH / 2);
  }

  // Control buttons row
  let btnY = botY + 68;
  let btnH = 38;
  let btnGap = 12;

  let newBtnW = 130;
  let hintBtnW = 80;
  let explBtnW = 145;
  let totalW = newBtnW + hintBtnW + explBtnW + 2 * btnGap;
  let startX = canvasWidth / 2 - totalW / 2;

  drawCanvasButton(startX, btnY, newBtnW, btnH, 'New Problem', '#1976D2', '#1565C0');
  drawCanvasButton(startX + newBtnW + btnGap, btnY, hintBtnW, btnH, 'Hint', '#FF9800', '#F57C00');
  drawCanvasButton(startX + newBtnW + hintBtnW + 2 * btnGap, btnY, explBtnW, btnH, 'Explain Answer', '#7B1FA2', '#6A1B9A');

  // Hint or explanation display
  if (showHint && currentProblem && currentProblem.hint) {
    fill('#FF9800');
    textSize(14);
    textStyle(ITALIC);
    textAlign(CENTER, TOP);
    noStroke();
    drawWrappedText('Hint: ' + currentProblem.hint, canvasWidth / 2, btnY + btnH + 8, canvasWidth - 60, 16);
    textStyle(NORMAL);
  }

  if (showExplanation && currentProblem && currentProblem.explanation) {
    fill('#7B1FA2');
    textSize(14);
    textStyle(ITALIC);
    textAlign(CENTER, TOP);
    noStroke();
    drawWrappedText('Explanation: ' + currentProblem.explanation, canvasWidth / 2, btnY + btnH + 8, canvasWidth - 60, 16);
    textStyle(NORMAL);
  }

  // Reasoning type indicator (bottom right)
  if (currentProblem) {
    let typeText, typeColor;
    if (currentProblem.type === 'inductive') {
      typeText = 'Mode: Inductive Reasoning';
      typeColor = COLORS.inductive;
    } else if (currentProblem.type === 'deductive') {
      typeText = 'Mode: Deductive Reasoning';
      typeColor = COLORS.deductive;
    } else {
      typeText = 'Mode: Counterexample Hunt';
      typeColor = COLORS.counterexample;
    }
    fill(typeColor);
    textSize(12);
    textStyle(BOLD);
    textAlign(RIGHT, CENTER);
    noStroke();
    text(typeText, canvasWidth - 25, botY + 22);
    textStyle(NORMAL);
  }
}

function drawCanvasButton(x, y, w, h, label, baseColor, hoverColor) {
  let hover = isMouseOverRect(x, y, w, h);
  fill(hover ? hoverColor : baseColor);
  noStroke();
  rect(x, y, w, h, 6);
  fill('#FFFFFF');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

// ============ MOUSE INTERACTION ============

function mousePressed() {
  if (!currentProblem) return;

  // --- Multiple choice click handling ---
  if ((currentProblem.type === 'inductive' || currentProblem.type === 'deductive') && !answered) {
    let options = currentProblem.options;
    let optW = min(canvasWidth - 80, 800);
    let optH = 42;
    let gap = 8;
    let midY = 220;
    let startY = midY + 48;
    let optX = canvasWidth / 2 - optW / 2;

    for (let i = 0; i < options.length; i++) {
      let optY = startY + i * (optH + gap);
      if (isMouseOverRect(optX, optY, optW, optH)) {
        selectedOption = i;
        submitMultipleChoice(i);
        return;
      }
    }
  }

  // --- Counterexample input handling ---
  if (currentProblem.type === 'counterexample' && !answered) {
    let midY = 220;
    let inputW = 200;
    let inputH = 50;
    let inputX = canvasWidth / 2 - inputW / 2 - 70;
    let inputY = midY + 42;

    // Test button
    let testBtnX = inputX + inputW + 20;
    let testBtnY = inputY + 5;
    let testBtnW = 110;
    let testBtnH = 40;
    if (isMouseOverRect(testBtnX, testBtnY, testBtnW, testBtnH)) {
      testCounterexample();
      return;
    }

    // Number pad
    let padBtnW = 50;
    let padBtnH = 40;
    let padGap = 5;
    let totalPadW = 5 * padBtnW + 4 * padGap;
    let padStartX = canvasWidth / 2 - (totalPadW + padGap + 65) / 2;
    let padStartY = inputY + inputH + 18;

    // Row 1: 1-5
    for (let i = 1; i <= 5; i++) {
      let bx = padStartX + (i - 1) * (padBtnW + padGap);
      if (isMouseOverRect(bx, padStartY, padBtnW, padBtnH)) {
        if (counterexampleInput.length < 6) counterexampleInput += str(i);
        return;
      }
    }

    // Row 2: 6-9, 0
    let row2Nums = [6, 7, 8, 9, 0];
    for (let i = 0; i < 5; i++) {
      let bx = padStartX + i * (padBtnW + padGap);
      let by = padStartY + padBtnH + padGap;
      if (isMouseOverRect(bx, by, padBtnW, padBtnH)) {
        if (counterexampleInput.length < 6) counterexampleInput += str(row2Nums[i]);
        return;
      }
    }

    // Clear button
    let clrX = padStartX + 5 * (padBtnW + padGap) + 10;
    let clrW = 60;
    if (isMouseOverRect(clrX, padStartY, clrW, padBtnH)) {
      counterexampleInput = '';
      return;
    }

    // +/- button
    let negY = padStartY + padBtnH + padGap;
    if (isMouseOverRect(clrX, negY, clrW, padBtnH)) {
      if (counterexampleInput.startsWith('-')) {
        counterexampleInput = counterexampleInput.substring(1);
      } else if (counterexampleInput.length > 0) {
        counterexampleInput = '-' + counterexampleInput;
      }
      return;
    }
  }

  // --- Bottom control buttons ---
  let btnY = drawHeight + 68;
  let btnH = 38;
  let btnGap = 12;
  let newBtnW = 130;
  let hintBtnW = 80;
  let explBtnW = 145;
  let totalW = newBtnW + hintBtnW + explBtnW + 2 * btnGap;
  let startX = canvasWidth / 2 - totalW / 2;

  // New Problem
  if (isMouseOverRect(startX, btnY, newBtnW, btnH)) {
    loadProblem();
    return;
  }

  // Hint
  if (isMouseOverRect(startX + newBtnW + btnGap, btnY, hintBtnW, btnH)) {
    showHint = !showHint;
    showExplanation = false;
    return;
  }

  // Explain Answer
  if (isMouseOverRect(startX + newBtnW + hintBtnW + 2 * btnGap, btnY, explBtnW, btnH)) {
    showExplanation = !showExplanation;
    showHint = false;
    return;
  }
}

// Keyboard input for counterexample number entry
function keyPressed() {
  if (!currentProblem || currentProblem.type !== 'counterexample' || answered) return;

  if (key >= '0' && key <= '9' && counterexampleInput.length < 6) {
    counterexampleInput += key;
  } else if (keyCode === BACKSPACE) {
    counterexampleInput = counterexampleInput.slice(0, -1);
  } else if (keyCode === ENTER || keyCode === RETURN) {
    testCounterexample();
  } else if (key === '-' && counterexampleInput.length === 0) {
    counterexampleInput = '-';
  }
  // Prevent default browser backspace navigation
  return false;
}

// ============ GAME LOGIC ============

function submitMultipleChoice(index) {
  if (answered) return;
  answered = true;
  attempts++;

  if (index === currentProblem.correctIndex) {
    score++;
    feedbackMessage = 'Correct! Well done!';
    feedbackColor = COLORS.correct;
  } else {
    feedbackMessage = 'Not quite. Answer: ' + currentProblem.options[currentProblem.correctIndex];
    feedbackColor = COLORS.incorrect;
  }
}

function testCounterexample() {
  if (answered || counterexampleInput === '' || counterexampleInput === '-') return;

  answered = true;
  attempts++;

  let num = parseInt(counterexampleInput);
  let isCounter = currentProblem.testFn(num);

  if (isCounter) {
    score++;
    feedbackMessage = 'Counterexample found! ' + num + ' ' + currentProblem.successMsg;
    feedbackColor = COLORS.correct;
  } else {
    feedbackMessage = 'Not a counterexample. ' + num + ' ' + currentProblem.failMsg;
    feedbackColor = COLORS.incorrect;
  }
}

function loadProblem() {
  currentProblem = random(problems);
  selectedOption = -1;
  answered = false;
  showHint = false;
  showExplanation = false;
  feedbackMessage = '';
  counterexampleInput = '';
}

// ============ PROBLEM BANK ============

function initProblems() {
  problems = [
    // ---- INDUCTIVE REASONING ----
    {
      type: 'inductive',
      title: 'Inductive Challenge: Interior Angle Sums',
      description: 'Look at these examples and identify the pattern.',
      examples: [
        'Triangle (3 sides): interior angles sum = 180\u00B0',
        'Square (4 sides): interior angles sum = 360\u00B0',
        'Pentagon (5 sides): interior angles sum = 540\u00B0'
      ],
      question: 'What is the pattern for interior angle sum?',
      options: [
        'Add 180\u00B0 for each additional side',
        'Multiply number of sides by 90\u00B0',
        '(n \u2212 2) \u00D7 180\u00B0',
        'n \u00D7 180\u00B0'
      ],
      correctIndex: 2,
      hint: 'Subtract 2 from the number of sides, then multiply by 180\u00B0.',
      explanation: 'The interior angle sum of an n-sided polygon is (n\u22122)\u00D7180\u00B0. Triangle: (3\u22122)\u00D7180\u00B0=180\u00B0. Square: (4\u22122)\u00D7180\u00B0=360\u00B0.'
    },
    {
      type: 'inductive',
      title: 'Inductive Challenge: Repunit Squares',
      description: 'Observe the pattern and predict the rule.',
      examples: [
        '1 \u00D7 1 = 1',
        '11 \u00D7 11 = 121',
        '111 \u00D7 111 = 12321',
        '1111 \u00D7 1111 = 1234321'
      ],
      question: 'What pattern do the products follow?',
      options: [
        'Each product is a perfect square',
        'Digits count up to n, then back down',
        'Each product doubles the previous one',
        'Digits are always palindromes of even numbers'
      ],
      correctIndex: 1,
      hint: 'Look at how the digits in each product rise and then fall.',
      explanation: 'Multiplying a number of n ones by itself gives digits 1, 2, ..., n, ..., 2, 1. It creates a palindrome that peaks at n.'
    },
    {
      type: 'inductive',
      title: 'Inductive Challenge: Connecting Points',
      description: 'Find the pattern in these geometric observations.',
      examples: [
        '2 points: 1 line segment',
        '3 points: 3 line segments',
        '4 points: 6 line segments',
        '5 points: 10 line segments'
      ],
      question: 'How many segments connect 6 points (no three collinear)?',
      options: [
        '12 segments',
        '15 segments',
        '18 segments',
        '20 segments'
      ],
      correctIndex: 1,
      hint: 'Each new point connects to all previous points. Count the new segments added each time.',
      explanation: 'The formula is n(n\u22121)/2. For 6 points: 6\u00D75/2 = 15 segments.'
    },
    {
      type: 'inductive',
      title: 'Inductive Challenge: Diagonal Count',
      description: 'How many diagonals does each polygon have?',
      examples: [
        'Triangle (3 sides): 0 diagonals',
        'Quadrilateral (4 sides): 2 diagonals',
        'Pentagon (5 sides): 5 diagonals',
        'Hexagon (6 sides): 9 diagonals'
      ],
      question: 'How many diagonals does a heptagon (7 sides) have?',
      options: [
        '12 diagonals',
        '14 diagonals',
        '16 diagonals',
        '21 diagonals'
      ],
      correctIndex: 1,
      hint: 'The differences between consecutive values are 2, 3, 4... What comes next?',
      explanation: 'The formula is n(n\u22123)/2. For 7 sides: 7\u00D74/2 = 14 diagonals.'
    },

    // ---- DEDUCTIVE REASONING ----
    {
      type: 'deductive',
      title: 'Deductive Challenge: Square Properties',
      description: 'Use the given facts to draw a logical conclusion.',
      facts: [
        'Fact 1: All squares have four equal sides.',
        'Fact 2: Figure ABCD is a square.'
      ],
      question: 'What can you conclude?',
      options: [
        'ABCD has four right angles',
        'ABCD has four equal sides',
        'ABCD is a triangle',
        'ABCD has no parallel sides'
      ],
      correctIndex: 1,
      hint: 'Apply Fact 1 directly to the specific case in Fact 2.',
      explanation: 'Since all squares have four equal sides (Fact 1) and ABCD is a square (Fact 2), ABCD must have four equal sides.'
    },
    {
      type: 'deductive',
      title: 'Deductive Challenge: Parallel Lines',
      description: 'Apply logic to these geometric facts.',
      facts: [
        'Fact 1: If two lines are parallel, they never intersect.',
        'Fact 2: Lines m and n are parallel.'
      ],
      question: 'What must be true?',
      options: [
        'Lines m and n are perpendicular',
        'Lines m and n never intersect',
        'Lines m and n form a right angle',
        'Lines m and n are skew'
      ],
      correctIndex: 1,
      hint: 'This is a direct application of Fact 1 to the specific lines in Fact 2.',
      explanation: 'Parallel lines never intersect (Fact 1). Since m and n are parallel (Fact 2), they never intersect.'
    },
    {
      type: 'deductive',
      title: 'Deductive Challenge: Supplementary Angles',
      description: 'Use deductive reasoning about supplementary angles.',
      facts: [
        'Fact 1: Supplementary angles sum to 180\u00B0.',
        'Fact 2: Angles A and B are supplementary.',
        'Fact 3: Angle A = 65\u00B0.'
      ],
      question: 'What is the measure of Angle B?',
      options: [
        '25\u00B0',
        '65\u00B0',
        '115\u00B0',
        '180\u00B0'
      ],
      correctIndex: 2,
      hint: 'If two angles sum to 180\u00B0 and one is 65\u00B0, subtract to find the other.',
      explanation: 'Supplementary angles sum to 180\u00B0. Angle B = 180\u00B0 \u2212 65\u00B0 = 115\u00B0.'
    },
    {
      type: 'deductive',
      title: 'Deductive Challenge: Triangle Angle Sum',
      description: 'Apply deductive reasoning about triangles.',
      facts: [
        'Fact 1: The angles of a triangle sum to 180\u00B0.',
        'Fact 2: In triangle XYZ, angle X = 90\u00B0.',
        'Fact 3: Angle Y = 45\u00B0.'
      ],
      question: 'What is the measure of angle Z?',
      options: [
        '30\u00B0',
        '45\u00B0',
        '60\u00B0',
        '90\u00B0'
      ],
      correctIndex: 1,
      hint: 'Three angles must total 180\u00B0. You know two of them.',
      explanation: 'Angle Z = 180\u00B0 \u2212 90\u00B0 \u2212 45\u00B0 = 45\u00B0.'
    },

    // ---- COUNTEREXAMPLE PROBLEMS ----
    {
      type: 'counterexample',
      title: 'Counterexample Hunt: Divisibility',
      description: 'Find a number that disproves this conjecture.',
      conjecture: 'If a number ends in 5, it is divisible by 10.',
      instructions: 'Enter a number ending in 5 that is NOT divisible by 10.',
      testFn: function(n) { return Math.abs(n) % 10 === 5; },
      successMsg: 'ends in 5 but is not divisible by 10!',
      failMsg: 'does not end in 5. Try a number like 15, 25, or 35.',
      hint: 'Think of the simplest number that ends in 5. Is it divisible by 10?',
      explanation: '15 ends in 5 but 15/10 = 1.5, not a whole number. So 15 is a counterexample.'
    },
    {
      type: 'counterexample',
      title: 'Counterexample Hunt: Even Prime',
      description: 'Find a number that disproves this conjecture.',
      conjecture: 'All prime numbers are odd.',
      instructions: 'Enter a prime number that is even.',
      testFn: function(n) { return n === 2; },
      successMsg: 'is prime AND even!',
      failMsg: 'is not the even prime. There is exactly one even prime number.',
      hint: 'There is only one even prime. It is the smallest prime number.',
      explanation: '2 is both prime and even, disproving the conjecture.'
    },
    {
      type: 'counterexample',
      title: 'Counterexample Hunt: Squaring',
      description: 'Find a number that disproves this conjecture.',
      conjecture: 'The square of any number is always greater than that number.',
      instructions: 'Enter a number where its square is NOT greater than itself.',
      testFn: function(n) { return n * n <= n; },
      successMsg: ': its square is not greater than itself!',
      failMsg: ': its square IS greater. Try a smaller number.',
      hint: 'What is 0 squared? What is 1 squared? Try very small numbers.',
      explanation: '0\u00B2 = 0, which is not greater than 0. Also 1\u00B2 = 1, not greater than 1.'
    },
    {
      type: 'counterexample',
      title: 'Counterexample Hunt: Adding to Multiples',
      description: 'Find a number that disproves this conjecture.',
      conjecture: 'Adding 1 to a multiple of 3 always gives an even number.',
      instructions: 'Enter a multiple of 3 where adding 1 gives an ODD number.',
      testFn: function(n) { return n % 3 === 0 && (n + 1) % 2 !== 0; },
      successMsg: 'is a multiple of 3, and adding 1 gives an odd number!',
      failMsg: 'does not work. Make sure your number is a multiple of 3.',
      hint: 'Try multiples of 3 one by one: 3, 6, 9, 12... Check which give an odd result when you add 1.',
      explanation: '6 is a multiple of 3, and 6+1 = 7, which is odd. This disproves the conjecture.'
    }
  ];
}

// ============ UTILITY FUNCTIONS ============

function isMouseOverRect(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function drawWrappedText(txt, x, y, maxW, lineH) {
  let words = txt.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    if (textWidth(testLine) > maxW && line.length > 0) {
      text(line.trim(), x, currentY);
      line = words[i] + ' ';
      currentY += lineH;
    } else {
      line = testLine;
    }
  }
  if (line.trim().length > 0) {
    text(line.trim(), x, currentY);
  }
}

// ============ RESPONSIVE LAYOUT ============

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 920);
    canvasWidth = max(canvasWidth, 600);
  }
}
