// Conditional Statement Truth Explorer
// Students evaluate truth values of conditional statements by toggling
// hypothesis and conclusion truth values and observing the result.
// Uses canvas-based controls (no DOM elements like createButton/createCheckbox).
// Bloom's Taxonomy: Applying

// Canvas dimensions - responsive width
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// State
let hypothesisTrue = true;
let conclusionTrue = true;

// Button geometry (computed in draw based on canvasWidth)
let hypBtnX, hypBtnY, hypBtnW, hypBtnH;
let conBtnX, conBtnY, conBtnW, conBtnH;
let rndBtnX, rndBtnY, rndBtnW, rndBtnH;

// Example conditional statements from geometry
let examples = [
  "If two angles are vertical, then they are congruent",
  "If a shape has four sides, then it is a square",
  "If a triangle is equilateral, then all angles measure 60\u00B0",
  "If two lines are parallel, then they never intersect",
  "If an angle is acute, then it measures less than 90\u00B0",
  "If a figure is a rectangle, then it has four right angles",
  "If a number is divisible by 4, then it is divisible by 8",
  "If two angles are complementary, then their sum is 90\u00B0",
  "If a quadrilateral has one pair of parallel sides, then it is a parallelogram",
  "If a triangle has a right angle, then it satisfies the Pythagorean theorem"
];
let currentExample = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Interactive truth table explorer for conditional statements with toggle buttons for hypothesis and conclusion truth values', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('#EEEEEE');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Evaluate the conditional statement
  let statementTrue = evaluateConditional(hypothesisTrue, conclusionTrue);

  // --- DRAWING AREA ---

  // Title
  fill('#1565C0');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Conditional Statement Truth Explorer', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Result banner
  let resultY = 48;
  let bannerW = 340;
  let bannerH = 42;
  if (statementTrue) {
    fill('#C8E6C9');
    stroke('#4CAF50');
  } else {
    fill('#FFCDD2');
    stroke('#F44336');
  }
  strokeWeight(3);
  rect(canvasWidth / 2 - bannerW / 2, resultY, bannerW, bannerH, 10);

  noStroke();
  fill(statementTrue ? '#2E7D32' : '#C62828');
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Statement is ' + (statementTrue ? 'TRUE' : 'FALSE'), canvasWidth / 2, resultY + bannerH / 2);
  textStyle(NORMAL);

  // Hypothesis box (left side)
  let boxY = 115;
  let boxWidth = 200;
  let boxHeight = 100;
  let leftBoxX = canvasWidth / 2 - boxWidth - 80;
  let rightBoxX = canvasWidth / 2 + 80;

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
  text('Hypothesis (p)', leftBoxX + boxWidth / 2, boxY + 20);
  textStyle(NORMAL);
  textSize(24);
  text(hypothesisTrue ? 'TRUE' : 'FALSE', leftBoxX + boxWidth / 2, boxY + 55);

  // Arrow between boxes
  let arrowY = boxY + boxHeight / 2;
  let arrowStartX = leftBoxX + boxWidth + 15;
  let arrowEndX = rightBoxX - 15;

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
  fill(statementTrue ? '#388E3C' : '#D32F2F');
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('IMPLIES', canvasWidth / 2, arrowY - 8);
  textStyle(NORMAL);

  // Conclusion box (right side)
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
  text('Conclusion (q)', rightBoxX + boxWidth / 2, boxY + 20);
  textStyle(NORMAL);
  textSize(24);
  text(conclusionTrue ? 'TRUE' : 'FALSE', rightBoxX + boxWidth / 2, boxY + 55);

  // Truth table
  drawTruthTable(hypothesisTrue, conclusionTrue);

  // Hint text at bottom of draw area
  fill('#757575');
  noStroke();
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text('A conditional is only FALSE when a true hypothesis leads to a false conclusion',
       canvasWidth / 2, drawHeight - 8);

  // Counterexample notice
  if (!statementTrue) {
    fill('#FF5722');
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('This is a COUNTEREXAMPLE!', canvasWidth / 2, 228);
    textStyle(NORMAL);
  }

  // --- CONTROL AREA (canvas-based buttons) ---
  drawControls();
}

function drawControls() {
  // Row 1: Toggle buttons and Random Example button
  let row1Y = drawHeight + 15;
  let btnH = 36;
  let btnSpacing = 15;

  // Calculate button widths based on canvas
  let hypBtnLabel = 'Hypothesis: ' + (hypothesisTrue ? 'TRUE' : 'FALSE');
  let conBtnLabel = 'Conclusion: ' + (conclusionTrue ? 'TRUE' : 'FALSE');
  let rndBtnLabel = 'Random Example';

  hypBtnW = 180;
  conBtnW = 180;
  rndBtnW = 160;

  // Center all three buttons
  let totalBtnWidth = hypBtnW + conBtnW + rndBtnW + 2 * btnSpacing;
  let startX = (canvasWidth - totalBtnWidth) / 2;

  hypBtnX = startX;
  hypBtnY = row1Y;
  hypBtnH = btnH;

  conBtnX = hypBtnX + hypBtnW + btnSpacing;
  conBtnY = row1Y;
  conBtnH = btnH;

  rndBtnX = conBtnX + conBtnW + btnSpacing;
  rndBtnY = row1Y;
  rndBtnH = btnH;

  // Draw Hypothesis toggle button
  stroke('#666');
  strokeWeight(1);
  if (hypothesisTrue) {
    fill('#4CAF50');
  } else {
    fill('#F44336');
  }
  rect(hypBtnX, hypBtnY, hypBtnW, hypBtnH, 6);
  noStroke();
  fill('white');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(hypBtnLabel, hypBtnX + hypBtnW / 2, hypBtnY + hypBtnH / 2);
  textStyle(NORMAL);

  // Draw Conclusion toggle button
  stroke('#666');
  strokeWeight(1);
  if (conclusionTrue) {
    fill('#4CAF50');
  } else {
    fill('#F44336');
  }
  rect(conBtnX, conBtnY, conBtnW, conBtnH, 6);
  noStroke();
  fill('white');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(conBtnLabel, conBtnX + conBtnW / 2, conBtnY + conBtnH / 2);
  textStyle(NORMAL);

  // Draw Random Example button
  stroke('#666');
  strokeWeight(1);
  fill('#1976D2');
  rect(rndBtnX, rndBtnY, rndBtnW, rndBtnH, 6);
  noStroke();
  fill('white');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(rndBtnLabel, rndBtnX + rndBtnW / 2, rndBtnY + rndBtnH / 2);
  textStyle(NORMAL);

  // Row 2: Current example statement
  let row2Y = drawHeight + 65;
  fill('#333');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  let exampleText = '"' + examples[currentExample] + '"';
  // Shrink if too wide
  if (textWidth(exampleText) > canvasWidth - 40) {
    textSize(12);
  }
  text(exampleText, canvasWidth / 2, row2Y);

  // Row 3: Statement type label
  let row3Y = drawHeight + 95;
  fill('#555');
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  let pLabel = hypothesisTrue ? 'true' : 'false';
  let qLabel = conclusionTrue ? 'true' : 'false';
  let resultLabel = evaluateConditional(hypothesisTrue, conclusionTrue) ? 'TRUE' : 'FALSE';
  text('p = ' + pLabel + ',  q = ' + qLabel + '   \u2192   p \u2192 q is ' + resultLabel,
       canvasWidth / 2, row3Y);

  // Row 4: Example counter
  let row4Y = drawHeight + 120;
  fill('#999');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Example ' + (currentExample + 1) + ' of ' + examples.length, canvasWidth / 2, row4Y);
}

function evaluateConditional(p, q) {
  // A conditional is false ONLY when hypothesis is true and conclusion is false
  return !(p && !q);
}

function drawTruthTable(hypTrue, conTrue) {
  let cellWidth = 90;
  let cellHeight = 22;
  let tableWidth = cellWidth * 3;
  let tableX = canvasWidth / 2 - tableWidth / 2;
  let tableY = 252;

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
  text('p \u2192 q', tableX + 2 * cellWidth + cellWidth / 2, tableY + cellHeight / 2);
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
    strokeWeight(1);
    rect(tableX, rowY, cellWidth, cellHeight);
    rect(tableX + cellWidth, rowY, cellWidth, cellHeight);
    rect(tableX + 2 * cellWidth, rowY, cellWidth, cellHeight);

    noStroke();
    fill('#424242');
    textSize(12);
    textAlign(CENTER, CENTER);
    text(rows[i][0] ? 'T' : 'F', tableX + cellWidth / 2, rowY + cellHeight / 2);
    text(rows[i][1] ? 'T' : 'F', tableX + cellWidth + cellWidth / 2, rowY + cellHeight / 2);

    // Color the result column
    fill(rows[i][2] ? '#4CAF50' : '#F44336');
    textStyle(BOLD);
    text(rows[i][2] ? 'T' : 'F', tableX + 2 * cellWidth + cellWidth / 2, rowY + cellHeight / 2);
    textStyle(NORMAL);
  }
}

function mousePressed() {
  // Check if click is on the Hypothesis toggle button
  if (mouseX >= hypBtnX && mouseX <= hypBtnX + hypBtnW &&
      mouseY >= hypBtnY && mouseY <= hypBtnY + hypBtnH) {
    hypothesisTrue = !hypothesisTrue;
    return;
  }

  // Check if click is on the Conclusion toggle button
  if (mouseX >= conBtnX && mouseX <= conBtnX + conBtnW &&
      mouseY >= conBtnY && mouseY <= conBtnY + conBtnH) {
    conclusionTrue = !conclusionTrue;
    return;
  }

  // Check if click is on the Random Example button
  if (mouseX >= rndBtnX && mouseX <= rndBtnX + rndBtnW &&
      mouseY >= rndBtnY && mouseY <= rndBtnY + rndBtnH) {
    currentExample = (currentExample + 1) % examples.length;
    return;
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
