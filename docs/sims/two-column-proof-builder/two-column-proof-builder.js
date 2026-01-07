// Interactive Two-Column Proof Builder
// Click-to-fill proof construction

let canvasWidth = 850;
let drawHeight = 580;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

// Proof data for Vertical Angles Theorem
let proofSteps = [
  { statement: "∠1 and ∠2 are vertical angles", reason: "Given", filled: [false, false] },
  { statement: "∠1 and ∠3 are a linear pair", reason: "Definition of linear pair", filled: [false, false] },
  { statement: "∠1 and ∠3 are supplementary", reason: "Linear Pair Postulate", filled: [false, false] },
  { statement: "m∠1 + m∠3 = 180°", reason: "Definition of supplementary", filled: [false, false] },
  { statement: "∠2 and ∠3 are a linear pair", reason: "Definition of linear pair", filled: [false, false] },
  { statement: "m∠2 + m∠3 = 180°", reason: "Definition of supplementary", filled: [false, false] },
  { statement: "m∠1 + m∠3 = m∠2 + m∠3", reason: "Transitive Property", filled: [false, false] },
  { statement: "m∠1 = m∠2", reason: "Subtraction Property", filled: [false, false] },
  { statement: "∠1 ≅ ∠2", reason: "Definition of congruence", filled: [false, false] }
];

let userAnswers = [];
let statementOptions = [];
let reasonOptions = [];
let selectedCell = null; // {row, col} or null
let showingOptions = false;
let score = 0;
let completed = false;

let hintButton, checkButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeProof();

  // Create buttons
  hintButton = createButton('Hint');
  hintButton.position(canvasWidth / 2 - 120, drawHeight + 25);
  hintButton.mousePressed(showHint);

  checkButton = createButton('Check Proof');
  checkButton.position(canvasWidth / 2 - 40, drawHeight + 25);
  checkButton.mousePressed(checkProof);

  resetButton = createButton('Reset');
  resetButton.position(canvasWidth / 2 + 60, drawHeight + 25);
  resetButton.mousePressed(resetProof);

  describe('Interactive two-column proof builder for the Vertical Angles Theorem', LABEL);
}

function initializeProof() {
  userAnswers = proofSteps.map(() => ({ statement: "", reason: "", correct: [false, false] }));

  // Create scrambled options
  statementOptions = proofSteps.map(s => s.statement);
  reasonOptions = [...new Set(proofSteps.map(s => s.reason))];

  // Shuffle
  shuffleArray(statementOptions);
  shuffleArray(reasonOptions);

  selectedCell = null;
  showingOptions = false;
  completed = false;
  score = 0;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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
  text('Two-Column Proof Builder', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Given and Prove
  fill('#424242');
  textSize(13);
  text('Given: ∠1 and ∠2 are vertical angles    |    Prove: ∠1 ≅ ∠2', canvasWidth / 2, 38);

  // Draw proof table
  drawProofTable();

  // Draw option banks
  drawStatementBank();
  drawReasonBank();

  // Draw options popup if selecting
  if (showingOptions && selectedCell) {
    drawOptionsPopup();
  }

  // Score display
  fill('#424242');
  textSize(14);
  textAlign(CENTER, CENTER);
  text(`Progress: ${score}/${proofSteps.length * 2} cells filled correctly`, canvasWidth / 2, drawHeight + 55);

  // Completion message
  if (completed) {
    fill(0, 150, 0);
    textSize(16);
    textStyle(BOLD);
    text('Proof Complete! Excellent work!', canvasWidth / 2, drawHeight + 55);
    textStyle(NORMAL);
  }
}

function drawProofTable() {
  let tableX = 180;
  let tableY = 65;
  let rowH = 50;
  let stmtW = 280;
  let reasonW = 200;

  // Headers
  fill('#1976D2');
  noStroke();
  rect(tableX, tableY, stmtW, 30, 5, 0, 0, 0);
  rect(tableX + stmtW, tableY, reasonW, 30, 0, 5, 0, 0);

  fill(255);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Statements', tableX + stmtW / 2, tableY + 15);
  text('Reasons', tableX + stmtW + reasonW / 2, tableY + 15);
  textStyle(NORMAL);

  // Rows
  for (let i = 0; i < proofSteps.length; i++) {
    let rowY = tableY + 30 + i * rowH;
    let ua = userAnswers[i];

    // Statement cell
    let stmtSelected = selectedCell && selectedCell.row === i && selectedCell.col === 0;
    if (ua.correct[0]) {
      fill('#C8E6C9');
    } else if (stmtSelected) {
      fill('#FFF9C4');
    } else {
      fill(255);
    }
    stroke('#BDBDBD');
    strokeWeight(1);
    rect(tableX, rowY, stmtW, rowH);

    // Statement content
    noStroke();
    fill('#424242');
    textSize(11);
    textAlign(LEFT, CENTER);
    let stmtText = ua.statement || '(click to fill)';
    if (!ua.statement) fill('#9E9E9E');
    text((i + 1) + '. ' + stmtText, tableX + 8, rowY + rowH / 2);

    // Checkmark or X for statement
    if (ua.statement) {
      textSize(16);
      if (ua.correct[0]) {
        fill('#4CAF50');
        text('✓', tableX + stmtW - 20, rowY + rowH / 2);
      } else {
        fill('#F44336');
        text('✗', tableX + stmtW - 20, rowY + rowH / 2);
      }
    }

    // Reason cell
    let reasonSelected = selectedCell && selectedCell.row === i && selectedCell.col === 1;
    if (ua.correct[1]) {
      fill('#C8E6C9');
    } else if (reasonSelected) {
      fill('#FFF9C4');
    } else {
      fill(255);
    }
    stroke('#BDBDBD');
    rect(tableX + stmtW, rowY, reasonW, rowH);

    // Reason content
    noStroke();
    fill('#424242');
    textSize(10);
    textAlign(LEFT, CENTER);
    let reasonText = ua.reason || '(click to fill)';
    if (!ua.reason) fill('#9E9E9E');
    text(reasonText, tableX + stmtW + 8, rowY + rowH / 2);

    // Checkmark or X for reason
    if (ua.reason) {
      textSize(16);
      if (ua.correct[1]) {
        fill('#4CAF50');
        text('✓', tableX + stmtW + reasonW - 20, rowY + rowH / 2);
      } else {
        fill('#F44336');
        text('✗', tableX + stmtW + reasonW - 20, rowY + rowH / 2);
      }
    }
  }
}

function drawStatementBank() {
  let bankX = 10;
  let bankY = 65;
  let bankW = 160;

  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(1);
  rect(bankX, bankY, bankW, 30, 5, 5, 0, 0);

  noStroke();
  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Statement Bank', bankX + bankW / 2, bankY + 15);
  textStyle(NORMAL);

  fill('#BBDEFB');
  stroke('#1976D2');
  rect(bankX, bankY + 30, bankW, drawHeight - bankY - 50);

  fill('#424242');
  textSize(9);
  textAlign(LEFT, TOP);
  text('Click empty cell,', bankX + 10, bankY + 45);
  text('then choose from', bankX + 10, bankY + 60);
  text('popup options', bankX + 10, bankY + 75);
}

function drawReasonBank() {
  let bankX = canvasWidth - 170;
  let bankY = 65;
  let bankW = 160;

  fill('#FFF9C4');
  stroke('#FBC02D');
  strokeWeight(1);
  rect(bankX, bankY, bankW, 30, 5, 5, 0, 0);

  noStroke();
  fill('#F57F17');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Reason Bank', bankX + bankW / 2, bankY + 15);
  textStyle(NORMAL);

  fill('#FFF8E1');
  stroke('#FBC02D');
  rect(bankX, bankY + 30, bankW, drawHeight - bankY - 50);

  fill('#424242');
  textSize(9);
  textAlign(LEFT, TOP);
  text('Available reasons:', bankX + 10, bankY + 45);

  textSize(8);
  let ry = bankY + 65;
  for (let r of reasonOptions) {
    text('• ' + r, bankX + 10, ry);
    ry += 15;
  }
}

function drawOptionsPopup() {
  let options = selectedCell.col === 0 ? statementOptions : reasonOptions;
  let popupX = selectedCell.col === 0 ? 180 : 460;
  let popupY = 100;
  let optW = 270;
  let optH = 28;

  // Popup background
  fill(255);
  stroke('#1976D2');
  strokeWeight(2);
  rect(popupX, popupY, optW, options.length * optH + 20, 8);

  // Title
  noStroke();
  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Select ' + (selectedCell.col === 0 ? 'Statement' : 'Reason') + ':', popupX + 10, popupY + 5);
  textStyle(NORMAL);

  // Options
  for (let i = 0; i < options.length; i++) {
    let optY = popupY + 22 + i * optH;

    // Highlight on hover
    if (mouseX > popupX + 5 && mouseX < popupX + optW - 5 &&
        mouseY > optY && mouseY < optY + optH - 2) {
      fill('#E3F2FD');
    } else {
      fill('#FAFAFA');
    }
    stroke('#E0E0E0');
    strokeWeight(1);
    rect(popupX + 5, optY, optW - 10, optH - 2, 4);

    noStroke();
    fill('#424242');
    textSize(10);
    textAlign(LEFT, CENTER);
    text(options[i], popupX + 12, optY + optH / 2 - 1);
  }
}

function mousePressed() {
  if (completed) return;

  // Check if clicking on popup option
  if (showingOptions && selectedCell) {
    let options = selectedCell.col === 0 ? statementOptions : reasonOptions;
    let popupX = selectedCell.col === 0 ? 180 : 460;
    let popupY = 100;
    let optW = 270;
    let optH = 28;

    for (let i = 0; i < options.length; i++) {
      let optY = popupY + 22 + i * optH;
      if (mouseX > popupX + 5 && mouseX < popupX + optW - 5 &&
          mouseY > optY && mouseY < optY + optH - 2) {
        // Selected this option
        let row = selectedCell.row;
        let col = selectedCell.col;

        if (col === 0) {
          userAnswers[row].statement = options[i];
          userAnswers[row].correct[0] = (options[i] === proofSteps[row].statement);
          if (userAnswers[row].correct[0]) score++;
        } else {
          userAnswers[row].reason = options[i];
          userAnswers[row].correct[1] = (options[i] === proofSteps[row].reason);
          if (userAnswers[row].correct[1]) score++;
        }

        showingOptions = false;
        selectedCell = null;
        checkCompletion();
        return;
      }
    }

    // Clicked outside popup - close it
    showingOptions = false;
    selectedCell = null;
    return;
  }

  // Check if clicking on proof table cell
  let tableX = 180;
  let tableY = 95;
  let rowH = 50;
  let stmtW = 280;
  let reasonW = 200;

  for (let i = 0; i < proofSteps.length; i++) {
    let rowY = tableY + i * rowH;

    // Statement cell
    if (mouseX > tableX && mouseX < tableX + stmtW &&
        mouseY > rowY && mouseY < rowY + rowH) {
      if (!userAnswers[i].correct[0]) {
        selectedCell = { row: i, col: 0 };
        showingOptions = true;
      }
      return;
    }

    // Reason cell
    if (mouseX > tableX + stmtW && mouseX < tableX + stmtW + reasonW &&
        mouseY > rowY && mouseY < rowY + rowH) {
      if (!userAnswers[i].correct[1]) {
        selectedCell = { row: i, col: 1 };
        showingOptions = true;
      }
      return;
    }
  }
}

function showHint() {
  // Find first unfilled correct cell
  for (let i = 0; i < proofSteps.length; i++) {
    if (!userAnswers[i].correct[0]) {
      userAnswers[i].statement = proofSteps[i].statement;
      userAnswers[i].correct[0] = true;
      score++;
      checkCompletion();
      return;
    }
    if (!userAnswers[i].correct[1]) {
      userAnswers[i].reason = proofSteps[i].reason;
      userAnswers[i].correct[1] = true;
      score++;
      checkCompletion();
      return;
    }
  }
}

function checkProof() {
  // Revalidate all answers
  for (let i = 0; i < proofSteps.length; i++) {
    userAnswers[i].correct[0] = (userAnswers[i].statement === proofSteps[i].statement);
    userAnswers[i].correct[1] = (userAnswers[i].reason === proofSteps[i].reason);
  }
  checkCompletion();
}

function checkCompletion() {
  completed = proofSteps.every((p, i) => userAnswers[i].correct[0] && userAnswers[i].correct[1]);
}

function resetProof() {
  initializeProof();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  hintButton.position(canvasWidth / 2 - 120, drawHeight + 25);
  checkButton.position(canvasWidth / 2 - 40, drawHeight + 25);
  resetButton.position(canvasWidth / 2 + 60, drawHeight + 25);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 700);
  }
}
