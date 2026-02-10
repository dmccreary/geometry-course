// Triangle Congruence Identifier
// Practice identifying which criterion applies

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let currentProblem = 0;
let selectedAnswer = -1;
let showFeedback = false;
let score = 0;
let attempts = 0;

let problems = [
  {
    marks: [{type: 'side', pos: 'AB'}, {type: 'side', pos: 'BC'}, {type: 'side', pos: 'AC'}],
    answer: 0, // SSS
    hint: "All three sides are marked congruent"
  },
  {
    marks: [{type: 'side', pos: 'AB'}, {type: 'angle', pos: 'B'}, {type: 'side', pos: 'BC'}],
    answer: 1, // SAS
    hint: "Two sides with the included angle between them"
  },
  {
    marks: [{type: 'angle', pos: 'A'}, {type: 'side', pos: 'AB'}, {type: 'angle', pos: 'B'}],
    answer: 2, // ASA
    hint: "Two angles with the side between them"
  },
  {
    marks: [{type: 'angle', pos: 'A'}, {type: 'angle', pos: 'B'}, {type: 'side', pos: 'BC'}],
    answer: 3, // AAS
    hint: "Two angles and a non-included side"
  },
  {
    marks: [{type: 'right', pos: 'C'}, {type: 'side', pos: 'AB'}, {type: 'side', pos: 'AC'}],
    answer: 4, // HL
    hint: "Right triangle with hypotenuse and one leg"
  },
  {
    marks: [{type: 'angle', pos: 'A'}, {type: 'angle', pos: 'B'}, {type: 'angle', pos: 'C'}],
    answer: 5, // Not congruent (AAA)
    hint: "Three angles doesn't prove congruence!"
  }
];

let answers = ['SSS', 'SAS', 'ASA', 'AAS', 'HL', 'Not Enough'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  shuffleProblems();
  describe('Triangle congruence practice tool for identifying criteria', LABEL);
}

function shuffleProblems() {
  for (let i = problems.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [problems[i], problems[j]] = [problems[j], problems[i]];
  }
}

function draw() {
  updateCanvasSize();

  // Draw area
  fill('#E8F5E9');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control panel
  fill('#ECEFF1');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#2E7D32');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Triangle Congruence Identifier", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Progress
  fill('#757575');
  textSize(11);
  text(`Problem ${currentProblem + 1} of ${problems.length}  |  Score: ${score}/${attempts}`, canvasWidth / 2, 35);

  drawTriangles();
  drawAnswerButtons();
  drawFeedback();
  drawControls();
}

function drawTriangles() {
  let prob = problems[currentProblem];
  let centerY = 230;
  let triSize = 100;

  let leftX = canvasWidth * 0.28;
  let rightX = canvasWidth * 0.72;

  // Triangle vertices
  let leftTri = calculateVertices(leftX, centerY, triSize, prob);
  let rightTri = calculateVertices(rightX, centerY, triSize, prob);

  // Draw Triangle 1 (blue)
  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);
  triangle(leftTri.ax, leftTri.ay, leftTri.bx, leftTri.by, leftTri.cx, leftTri.cy);

  // Draw Triangle 2 (green)
  fill('#4CAF50');
  stroke('#2E7D32');
  strokeWeight(2);
  triangle(rightTri.ax, rightTri.ay, rightTri.bx, rightTri.by, rightTri.cx, rightTri.cy);

  // Draw congruence marks
  drawMarks(leftTri, prob.marks);
  drawMarks(rightTri, prob.marks);

  // Labels
  drawLabels(leftTri, 'ABC', '#0D47A1');
  drawLabels(rightTri, 'DEF', '#2E7D32');

  // Congruence symbol
  fill('#424242');
  textSize(24);
  textAlign(CENTER, CENTER);
  text('≅ ?', canvasWidth / 2, centerY);

  // Triangle labels
  textSize(12);
  textAlign(CENTER, TOP);
  text('△ABC', leftX, centerY + triSize + 20);
  text('△DEF', rightX, centerY + triSize + 20);

  // Question
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text("What criterion proves these triangles congruent?", canvasWidth / 2, 55);
}

function calculateVertices(cx, cy, size, prob) {
  let hasRight = prob.marks.some(m => m.type === 'right');

  if (hasRight) {
    return {
      ax: cx - size * 0.6,
      ay: cy + size * 0.4,
      bx: cx + size * 0.6,
      by: cy + size * 0.4,
      cx: cx - size * 0.6,
      cy: cy - size * 0.5
    };
  } else {
    return {
      ax: cx - size * 0.6,
      ay: cy + size * 0.4,
      bx: cx + size * 0.6,
      by: cy + size * 0.4,
      cx: cx,
      cy: cy - size * 0.6
    };
  }
}

function drawMarks(tri, marks) {
  for (let mark of marks) {
    if (mark.type === 'side') {
      let x1, y1, x2, y2;
      let count = mark.pos === 'AB' ? 1 : mark.pos === 'BC' ? 2 : 3;

      if (mark.pos === 'AB') {
        x1 = tri.ax; y1 = tri.ay; x2 = tri.bx; y2 = tri.by;
      } else if (mark.pos === 'BC') {
        x1 = tri.bx; y1 = tri.by; x2 = tri.cx; y2 = tri.cy;
      } else {
        x1 = tri.cx; y1 = tri.cy; x2 = tri.ax; y2 = tri.ay;
      }
      drawSideTicks(x1, y1, x2, y2, count);
    } else if (mark.type === 'angle') {
      let vx, vy, p1x, p1y, p2x, p2y;
      let count = mark.pos === 'A' ? 1 : mark.pos === 'B' ? 2 : 3;

      if (mark.pos === 'A') {
        vx = tri.ax; vy = tri.ay; p1x = tri.bx; p1y = tri.by; p2x = tri.cx; p2y = tri.cy;
      } else if (mark.pos === 'B') {
        vx = tri.bx; vy = tri.by; p1x = tri.cx; p1y = tri.cy; p2x = tri.ax; p2y = tri.ay;
      } else {
        vx = tri.cx; vy = tri.cy; p1x = tri.ax; p1y = tri.ay; p2x = tri.bx; p2y = tri.by;
      }
      drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, count);
    } else if (mark.type === 'right') {
      drawRightAngle(tri.cx, tri.cy, tri.ax, tri.ay, tri.bx, tri.by);
    }
  }
}

function drawSideTicks(x1, y1, x2, y2, count) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI / 2);

  stroke('#FF5722');
  strokeWeight(3);

  let spacing = 6;
  let len = 12;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count - 1) / 2) * spacing;
    line(offset, -len / 2, offset, len / 2);
  }
  pop();
}

function drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, count) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  stroke('#9C27B0');
  strokeWeight(2);
  noFill();

  let radius = 18 + count * 4;
  arc(vx, vy, radius * 2, radius * 2, a1, a2);
}

function drawRightAngle(cx, cy, ax, ay, bx, by) {
  let size = 15;

  stroke('#E53935');
  strokeWeight(3);
  noFill();

  push();
  translate(cx, cy);
  line(size, 0, size, -size);
  line(size, -size, 0, -size);
  pop();
}

function drawLabels(tri, labels, color) {
  noStroke();
  fill(color);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(labels[0], tri.ax - 12, tri.ay);
  text(labels[1], tri.bx + 8, tri.by);
  textAlign(CENTER, BOTTOM);
  text(labels[2], tri.cx, tri.cy - 8);
  textStyle(NORMAL);
}

function drawAnswerButtons() {
  let btnW = 100;
  let btnH = 35;
  let startX = canvasWidth / 2 - (answers.length * (btnW + 10)) / 2 + 5;
  let y = 360;

  for (let i = 0; i < answers.length; i++) {
    let x = startX + i * (btnW + 10);

    if (showFeedback) {
      if (i === problems[currentProblem].answer) {
        fill('#4CAF50');
      } else if (i === selectedAnswer && selectedAnswer !== problems[currentProblem].answer) {
        fill('#E53935');
      } else {
        fill('#BDBDBD');
      }
    } else if (i === selectedAnswer) {
      fill('#1565C0');
    } else if (mouseX >= x && mouseX <= x + btnW &&
               mouseY >= y && mouseY <= y + btnH) {
      fill('#64B5F6');
    } else {
      fill('#BBDEFB');
    }

    noStroke();
    rect(x, y, btnW, btnH, 5);

    fill(i === selectedAnswer || (showFeedback && i === problems[currentProblem].answer) ? 'white' : '#0D47A1');
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(answers[i], x + btnW / 2, y + btnH / 2);
    textStyle(NORMAL);
  }
}

function drawFeedback() {
  if (!showFeedback) return;

  let prob = problems[currentProblem];
  let isCorrect = selectedAnswer === prob.answer;
  let y = 420;

  fill(isCorrect ? '#E8F5E9' : '#FFEBEE');
  stroke(isCorrect ? '#4CAF50' : '#E53935');
  strokeWeight(2);
  rect(canvasWidth / 2 - 200, y, 400, 70, 8);

  noStroke();
  fill(isCorrect ? '#2E7D32' : '#C62828');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(isCorrect ? '✓ Correct!' : '✗ Not quite!', canvasWidth / 2, y + 22);
  textStyle(NORMAL);

  fill('#424242');
  textSize(12);
  text(prob.hint, canvasWidth / 2, y + 48);
}

function drawControls() {
  let y = drawHeight + 20;

  // Check Answer / Next button
  let btnX = canvasWidth / 2 - 60;
  let btnW = 120;
  let btnH = 35;

  if (!showFeedback) {
    // Check Answer button
    if (selectedAnswer >= 0) {
      fill('#2E7D32');
    } else {
      fill('#9E9E9E');
    }
    rect(btnX, y, btnW, btnH, 5);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Check Answer', btnX + btnW / 2, y + btnH / 2);
  } else {
    // Next button
    fill('#1565C0');
    rect(btnX, y, btnW, btnH, 5);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(13);
    text(currentProblem < problems.length - 1 ? 'Next Problem' : 'Restart', btnX + btnW / 2, y + btnH / 2);
  }

  // Hint button
  let hintX = canvasWidth - 100;
  fill('#FF9800');
  rect(hintX, y, 70, btnH, 5);
  fill('white');
  textSize(12);
  text('Hint', hintX + 35, y + btnH / 2);
}

function mousePressed() {
  let prob = problems[currentProblem];

  // Answer buttons
  let btnW = 100;
  let btnH = 35;
  let startX = canvasWidth / 2 - (answers.length * (btnW + 10)) / 2 + 5;
  let y = 360;

  if (!showFeedback) {
    for (let i = 0; i < answers.length; i++) {
      let x = startX + i * (btnW + 10);
      if (mouseX >= x && mouseX <= x + btnW &&
          mouseY >= y && mouseY <= y + btnH) {
        selectedAnswer = i;
        return;
      }
    }
  }

  // Control buttons
  let ctrlY = drawHeight + 20;
  let btnX = canvasWidth / 2 - 60;

  if (mouseX >= btnX && mouseX <= btnX + 120 &&
      mouseY >= ctrlY && mouseY <= ctrlY + 35) {
    if (!showFeedback && selectedAnswer >= 0) {
      // Check answer
      showFeedback = true;
      attempts++;
      if (selectedAnswer === prob.answer) {
        score++;
      }
    } else if (showFeedback) {
      // Next problem or restart
      if (currentProblem < problems.length - 1) {
        currentProblem++;
      } else {
        currentProblem = 0;
        shuffleProblems();
        score = 0;
        attempts = 0;
      }
      selectedAnswer = -1;
      showFeedback = false;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
