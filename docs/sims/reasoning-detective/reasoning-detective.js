// Reasoning Detective MicroSim
// Interactive reasoning challenge game for geometry

// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Game state
let currentProblem = 0;
let score = 0;
let attempts = 0;
let selectedAnswer = -1;
let showFeedback = false;
let feedbackCorrect = false;
let feedbackMessage = '';

// Buttons
let newProblemButton;
let hintButton;
let checkButton;

// Problem bank
let problems = [
  // Inductive Reasoning Problems
  {
    type: 'inductive',
    title: 'Pattern Recognition',
    question: 'Look at these angle sums. What pattern do you see?',
    examples: [
      'Triangle (3 sides): 180°',
      'Quadrilateral (4 sides): 360°',
      'Pentagon (5 sides): 540°',
      'Hexagon (6 sides): 720°'
    ],
    options: [
      'Add 90° for each additional side',
      'Multiply number of sides by 90°',
      '(n - 2) × 180° where n = sides',
      'n × 180° where n = sides'
    ],
    correct: 2,
    hint: 'Notice how much the sum increases each time you add a side.',
    explanation: 'The interior angle sum is (n-2) × 180°. Each additional side adds 180° to the sum.'
  },
  {
    type: 'inductive',
    title: 'Number Pattern',
    question: 'What comes next in this pattern?',
    examples: [
      '1, 3, 6, 10, 15, ?'
    ],
    options: [
      '18',
      '20',
      '21',
      '25'
    ],
    correct: 2,
    hint: 'These are triangular numbers. Look at the differences between consecutive terms.',
    explanation: 'The differences are 2, 3, 4, 5... so the next difference is 6, giving us 15 + 6 = 21.'
  },
  {
    type: 'inductive',
    title: 'Geometric Pattern',
    question: 'What pattern describes these observations?',
    examples: [
      'Square diagonal: 4 × 1.414...',
      'Rectangle 3×4: diagonal = 5',
      'Rectangle 5×12: diagonal = 13'
    ],
    options: [
      'Diagonal = sum of sides',
      'Diagonal = √(side₁² + side₂²)',
      'Diagonal = 2 × shorter side',
      'Diagonal = average of sides × 2'
    ],
    correct: 1,
    hint: 'Think about the Pythagorean theorem!',
    explanation: 'The diagonal forms the hypotenuse of a right triangle with the sides as legs.'
  },
  // Deductive Reasoning Problems
  {
    type: 'deductive',
    title: 'Logical Conclusion',
    question: 'What must be true?',
    examples: [
      'Given: All right angles measure 90°',
      'Given: Angle ABC is a right angle'
    ],
    options: [
      'Angle ABC measures 45°',
      'Angle ABC measures 90°',
      'Angle ABC is acute',
      'Angle ABC is obtuse'
    ],
    correct: 1,
    hint: 'Apply the definition directly to the specific case.',
    explanation: 'Since ALL right angles measure 90° and ABC IS a right angle, ABC must measure 90°.'
  },
  {
    type: 'deductive',
    title: 'Syllogism',
    question: 'What can you conclude?',
    examples: [
      'Given: All squares have four equal sides',
      'Given: All squares are rectangles',
      'Given: Figure PQRS is a square'
    ],
    options: [
      'PQRS has three equal sides',
      'PQRS is not a rectangle',
      'PQRS has four equal sides',
      'PQRS has no right angles'
    ],
    correct: 2,
    hint: 'What property of squares applies to this specific figure?',
    explanation: 'Since PQRS is a square, and all squares have four equal sides, PQRS has four equal sides.'
  },
  {
    type: 'deductive',
    title: 'Chain of Logic',
    question: 'What follows from these facts?',
    examples: [
      'Given: If two lines are perpendicular, they form 90° angles',
      'Given: Lines m and n are perpendicular'
    ],
    options: [
      'Lines m and n are parallel',
      'Lines m and n form 90° angles',
      'Lines m and n never intersect',
      'Lines m and n form 45° angles'
    ],
    correct: 1,
    hint: 'Use the conditional statement with the given fact.',
    explanation: 'The first statement says IF perpendicular THEN 90° angles. Since m and n ARE perpendicular, they form 90° angles.'
  },
  // Counterexample Problems
  {
    type: 'counterexample',
    title: 'Find the Counterexample',
    question: 'Which disproves: "All prime numbers are odd"?',
    examples: [
      'Conjecture: All prime numbers are odd'
    ],
    options: [
      '9 (odd but not prime)',
      '2 (even and prime)',
      '15 (odd but not prime)',
      '1 (odd but not prime)'
    ],
    correct: 1,
    hint: 'Find a prime number that is NOT odd.',
    explanation: '2 is the only even prime number! It disproves the conjecture that all primes are odd.'
  },
  {
    type: 'counterexample',
    title: 'Test the Conjecture',
    question: 'Which disproves: "If a quadrilateral has 4 equal sides, it\'s a square"?',
    examples: [
      'Conjecture: 4 equal sides → must be a square'
    ],
    options: [
      'A rectangle with sides 5, 5, 3, 3',
      'A rhombus with 60° angles',
      'A square with 90° angles',
      'A trapezoid'
    ],
    correct: 1,
    hint: 'What quadrilateral has 4 equal sides but isn\'t a square?',
    explanation: 'A rhombus has 4 equal sides but angles that aren\'t 90°, so it\'s not a square!'
  },
  {
    type: 'counterexample',
    title: 'Disprove the Statement',
    question: 'Which disproves: "The sum of two numbers is always greater than each number"?',
    examples: [
      'Conjecture: a + b > a and a + b > b for all numbers'
    ],
    options: [
      '5 + 3 = 8',
      '10 + 10 = 20',
      '7 + (-3) = 4',
      '100 + 1 = 101'
    ],
    correct: 2,
    hint: 'What happens when one number is negative?',
    explanation: '7 + (-3) = 4, which is less than 7. Negative numbers break this conjecture!'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create buttons
  newProblemButton = createButton('New Problem');
  newProblemButton.position(canvasWidth - 320, drawHeight + 35);
  newProblemButton.mousePressed(nextProblem);

  hintButton = createButton('Hint');
  hintButton.position(canvasWidth - 220, drawHeight + 35);
  hintButton.mousePressed(showHint);

  checkButton = createButton('Check Answer');
  checkButton.position(canvasWidth - 130, drawHeight + 35);
  checkButton.mousePressed(checkAnswer);

  describe('Interactive reasoning game where students practice inductive reasoning, deductive reasoning, and finding counterexamples', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  drawGradientBackground();

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw current problem
  drawProblem();

  // Draw options
  drawOptions();

  // Draw feedback if showing
  if (showFeedback) {
    drawFeedback();
  }

  // Draw score and controls
  drawScorePanel();
}

function drawGradientBackground() {
  for (let y = 0; y < drawHeight; y++) {
    let inter = map(y, 0, drawHeight, 0, 1);
    let c = lerpColor(color('#E3F2FD'), color('#F5F5F5'), inter);
    stroke(c);
    line(0, y, canvasWidth, y);
  }
}

function drawProblem() {
  let problem = problems[currentProblem];

  // Problem type badge
  let badgeColor, badgeText;
  switch (problem.type) {
    case 'inductive':
      badgeColor = color('#4CAF50');
      badgeText = 'INDUCTIVE REASONING';
      break;
    case 'deductive':
      badgeColor = color('#2196F3');
      badgeText = 'DEDUCTIVE REASONING';
      break;
    case 'counterexample':
      badgeColor = color('#FF9800');
      badgeText = 'COUNTEREXAMPLE HUNT';
      break;
  }

  // Badge
  fill(badgeColor);
  noStroke();
  rect(margin, margin, 200, 30, 5);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(badgeText, margin + 100, margin + 15);
  textStyle(NORMAL);

  // Title
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);
  text(problem.title, margin, margin + 45);

  // Question
  fill(50);
  textSize(18);
  text(problem.question, margin, margin + 80);

  // Examples/Given information box
  let examplesY = margin + 115;
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  let boxHeight = problem.examples.length * 30 + 20;
  rect(margin, examplesY, canvasWidth - 2 * margin, boxHeight, 10);

  noStroke();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  for (let i = 0; i < problem.examples.length; i++) {
    text('• ' + problem.examples[i], margin + 15, examplesY + 15 + i * 30);
  }
}

function drawOptions() {
  let problem = problems[currentProblem];
  let optionsY = 280;

  textSize(16);
  textAlign(LEFT, CENTER);

  for (let i = 0; i < problem.options.length; i++) {
    let optionY = optionsY + i * 55;
    let isSelected = selectedAnswer === i;
    let isCorrect = showFeedback && i === problem.correct;
    let isWrong = showFeedback && isSelected && i !== problem.correct;

    // Option box
    if (isCorrect) {
      fill('#C8E6C9');
      stroke('#4CAF50');
    } else if (isWrong) {
      fill('#FFCDD2');
      stroke('#F44336');
    } else if (isSelected) {
      fill('#BBDEFB');
      stroke('#2196F3');
    } else {
      fill(255);
      stroke(180);
    }
    strokeWeight(2);
    rect(margin, optionY, canvasWidth - 2 * margin, 45, 8);

    // Option letter
    noStroke();
    fill(isSelected ? '#1976D2' : '#666');
    textStyle(BOLD);
    text(String.fromCharCode(65 + i) + ')', margin + 15, optionY + 22);
    textStyle(NORMAL);

    // Option text
    fill(0);
    text(problem.options[i], margin + 45, optionY + 22);

    // Checkmark or X for feedback
    if (showFeedback) {
      textSize(20);
      if (isCorrect) {
        fill('#4CAF50');
        text('✓', canvasWidth - margin - 30, optionY + 22);
      } else if (isWrong) {
        fill('#F44336');
        text('✗', canvasWidth - margin - 30, optionY + 22);
      }
      textSize(16);
    }
  }
}

function drawFeedback() {
  let problem = problems[currentProblem];
  let feedbackY = 510;

  // Feedback box
  fill(feedbackCorrect ? '#E8F5E9' : '#FFF3E0');
  stroke(feedbackCorrect ? '#4CAF50' : '#FF9800');
  strokeWeight(2);
  rect(margin, feedbackY, canvasWidth - 2 * margin, 35, 5);

  noStroke();
  fill(feedbackCorrect ? '#2E7D32' : '#E65100');
  textSize(14);
  textAlign(LEFT, CENTER);
  text(feedbackMessage, margin + 10, feedbackY + 17);
}

function drawScorePanel() {
  // Score display
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Score: ' + score, margin, drawHeight + 45);
  text('Problem: ' + (currentProblem + 1) + ' of ' + problems.length, margin + 100, drawHeight + 45);

  // Progress bar
  let progressWidth = 150;
  let progressX = margin + 250;
  let progressY = drawHeight + 38;

  stroke(200);
  fill(240);
  rect(progressX, progressY, progressWidth, 15, 3);

  noStroke();
  fill('#4CAF50');
  let progress = ((currentProblem + 1) / problems.length) * progressWidth;
  rect(progressX, progressY, progress, 15, 3);
}

function mousePressed() {
  if (showFeedback) return;

  let problem = problems[currentProblem];
  let optionsY = 280;

  for (let i = 0; i < problem.options.length; i++) {
    let optionY = optionsY + i * 55;
    if (mouseX > margin && mouseX < canvasWidth - margin &&
        mouseY > optionY && mouseY < optionY + 45) {
      selectedAnswer = i;
    }
  }
}

function checkAnswer() {
  if (selectedAnswer === -1 || showFeedback) return;

  let problem = problems[currentProblem];
  attempts++;

  if (selectedAnswer === problem.correct) {
    score += 10;
    feedbackCorrect = true;
    feedbackMessage = '✓ Correct! ' + problem.explanation;
  } else {
    feedbackCorrect = false;
    feedbackMessage = '✗ Not quite. ' + problem.explanation;
  }

  showFeedback = true;
}

function showHint() {
  let problem = problems[currentProblem];
  feedbackMessage = '💡 Hint: ' + problem.hint;
  feedbackCorrect = true;
  showFeedback = true;
}

function nextProblem() {
  currentProblem = (currentProblem + 1) % problems.length;
  selectedAnswer = -1;
  showFeedback = false;
  feedbackMessage = '';
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  newProblemButton.position(canvasWidth - 320, drawHeight + 35);
  hintButton.position(canvasWidth - 220, drawHeight + 35);
  checkButton.position(canvasWidth - 130, drawHeight + 35);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 600);
  }
}
