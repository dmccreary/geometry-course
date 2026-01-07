// Conditional Statement Truth Explorer
// Interactive exploration of when conditional statements are true or false

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;

// State
let hypothesisTrue = true;
let conclusionTrue = true;

// Controls
let hypothesisCheckbox;
let conclusionCheckbox;
let randomButton;

// Example statements
let examples = [
  "If two angles are vertical, then they are congruent",
  "If a shape has four sides, then it is a square",
  "If a triangle is equilateral, then all angles measure 60°",
  "If two lines are parallel, then they never intersect",
  "If an angle is acute, then it measures less than 90°",
  "If a figure is a rectangle, then it has four right angles",
  "If a number is divisible by 4, then it's divisible by 8",
  "If two angles are complementary, then their sum is 90°",
  "If a quadrilateral has one pair of parallel sides, then it is a parallelogram",
  "If a triangle has a right angle, then it satisfies the Pythagorean theorem"
];
let currentExample = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create checkboxes
  hypothesisCheckbox = createCheckbox('Hypothesis is TRUE', true);
  hypothesisCheckbox.position(30, drawHeight + 25);
  hypothesisCheckbox.changed(() => {
    hypothesisTrue = hypothesisCheckbox.checked();
  });

  conclusionCheckbox = createCheckbox('Conclusion is TRUE', true);
  conclusionCheckbox.position(220, drawHeight + 25);
  conclusionCheckbox.changed(() => {
    conclusionTrue = conclusionCheckbox.checked();
  });

  randomButton = createButton('Random Example');
  randomButton.position(420, drawHeight + 20);
  randomButton.mousePressed(() => {
    currentExample = (currentExample + 1) % examples.length;
  });

  describe('Interactive truth table explorer for conditional statements', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  background(255);
  fill('#FAFAFA');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('#F5F5F5');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Calculate truth value of conditional
  let statementTrue = evaluateConditional(hypothesisTrue, conclusionTrue);

  // Draw title
  fill('#1565C0');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Conditional Statement Truth Explorer', canvasWidth / 2, 15);
  textStyle(NORMAL);

  // Draw result banner at top
  let resultY = 50;
  if (statementTrue) {
    fill('#C8E6C9');
    stroke('#4CAF50');
  } else {
    fill('#FFCDD2');
    stroke('#F44336');
  }
  strokeWeight(3);
  rect(canvasWidth / 2 - 180, resultY, 360, 45, 10);

  noStroke();
  fill(statementTrue ? '#2E7D32' : '#C62828');
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Statement is ' + (statementTrue ? 'TRUE' : 'FALSE'), canvasWidth / 2, resultY + 22);
  textStyle(NORMAL);

  // Draw hypothesis box
  let boxY = 130;
  let boxWidth = 180;
  let boxHeight = 80;
  let leftBoxX = 80;
  let rightBoxX = canvasWidth - 80 - boxWidth;

  // Hypothesis box
  if (hypothesisTrue) {
    fill('#C8E6C9');
    stroke('#4CAF50');
  } else {
    fill('#FFCDD2');
    stroke('#F44336');
  }
  strokeWeight(3);
  rect(leftBoxX, boxY, boxWidth, boxHeight, 10);

  noStroke();
  fill(hypothesisTrue ? '#2E7D32' : '#C62828');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Hypothesis (p)', leftBoxX + boxWidth / 2, boxY + 15);
  textStyle(NORMAL);
  textSize(18);
  text(hypothesisTrue ? 'TRUE' : 'FALSE', leftBoxX + boxWidth / 2, boxY + 45);

  // Arrow
  let arrowY = boxY + boxHeight / 2;
  let arrowStartX = leftBoxX + boxWidth + 20;
  let arrowEndX = rightBoxX - 20;

  if (statementTrue) {
    stroke('#4CAF50');
    fill('#4CAF50');
  } else {
    stroke('#F44336');
    fill('#F44336');
  }
  strokeWeight(4);
  line(arrowStartX, arrowY, arrowEndX - 15, arrowY);
  noStroke();
  triangle(arrowEndX, arrowY, arrowEndX - 18, arrowY - 12, arrowEndX - 18, arrowY + 12);

  // Arrow label
  fill(statementTrue ? '#4CAF50' : '#F44336');
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text('IMPLIES →', canvasWidth / 2, arrowY - 10);

  // Conclusion box
  if (conclusionTrue) {
    fill('#C8E6C9');
    stroke('#4CAF50');
  } else {
    fill('#FFCDD2');
    stroke('#F44336');
  }
  strokeWeight(3);
  rect(rightBoxX, boxY, boxWidth, boxHeight, 10);

  noStroke();
  fill(conclusionTrue ? '#2E7D32' : '#C62828');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Conclusion (q)', rightBoxX + boxWidth / 2, boxY + 15);
  textStyle(NORMAL);
  textSize(18);
  text(conclusionTrue ? 'TRUE' : 'FALSE', rightBoxX + boxWidth / 2, boxY + 45);

  // Draw truth table
  drawTruthTable(hypothesisTrue, conclusionTrue);

  // Draw current example
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  let exampleText = examples[currentExample];
  if (textWidth(exampleText) > canvasWidth - 40) {
    textSize(12);
  }
  text('"' + exampleText + '"', canvasWidth / 2, 235);

  // Draw hint
  fill('#757575');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Hint: A conditional is only FALSE when a true hypothesis leads to a false conclusion', canvasWidth / 2, drawHeight - 10);

  // Draw counterexample notice if applicable
  if (!statementTrue) {
    fill('#FF5722');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('This is a COUNTEREXAMPLE!', canvasWidth / 2, 260);
    textStyle(NORMAL);
  }
}

function evaluateConditional(p, q) {
  // Conditional is false only when hypothesis is true and conclusion is false
  if (p && !q) {
    return false;
  }
  return true;
}

function drawTruthTable(hypTrue, conTrue) {
  let tableX = canvasWidth / 2 - 150;
  let tableY = 290;
  let cellWidth = 100;
  let cellHeight = 25;

  // Headers
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(1);
  rect(tableX, tableY, cellWidth, cellHeight);
  rect(tableX + cellWidth, tableY, cellWidth, cellHeight);
  rect(tableX + 2 * cellWidth, tableY, cellWidth, cellHeight);

  noStroke();
  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('p (Hyp)', tableX + cellWidth / 2, tableY + cellHeight / 2);
  text('q (Con)', tableX + cellWidth + cellWidth / 2, tableY + cellHeight / 2);
  text('p → q', tableX + 2 * cellWidth + cellWidth / 2, tableY + cellHeight / 2);
  textStyle(NORMAL);

  // Data rows
  let rows = [
    [true, true, true],
    [true, false, false],
    [false, true, true],
    [false, false, true]
  ];

  for (let i = 0; i < rows.length; i++) {
    let rowY = tableY + (i + 1) * cellHeight;
    let isCurrentRow = (rows[i][0] === hypTrue && rows[i][1] === conTrue);

    // Highlight current row
    if (isCurrentRow) {
      fill('#FFF9C4');
    } else {
      fill(255);
    }
    stroke('#BDBDBD');
    rect(tableX, rowY, cellWidth, cellHeight);
    rect(tableX + cellWidth, rowY, cellWidth, cellHeight);
    rect(tableX + 2 * cellWidth, rowY, cellWidth, cellHeight);

    noStroke();
    fill('#424242');
    textSize(11);
    text(rows[i][0] ? 'T' : 'F', tableX + cellWidth / 2, rowY + cellHeight / 2);
    text(rows[i][1] ? 'T' : 'F', tableX + cellWidth + cellWidth / 2, rowY + cellHeight / 2);

    // Color the result
    fill(rows[i][2] ? '#4CAF50' : '#F44336');
    textStyle(BOLD);
    text(rows[i][2] ? 'T' : 'F', tableX + 2 * cellWidth + cellWidth / 2, rowY + cellHeight / 2);
    textStyle(NORMAL);
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
    canvasWidth = max(canvasWidth, 500);
  }
}
