// Construction Practice Workbench
// Comprehensive practice for all construction techniques

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;

let currentProblem = 0;
let step = 0;
let showSolution = false;
let score = 0;
let attempted = 0;

let problems = [
  {
    name: 'Copy Segment',
    level: 1,
    desc: 'Copy segment AB to point C',
    maxSteps: 4
  },
  {
    name: 'Bisect Segment',
    level: 1,
    desc: 'Find the midpoint of segment AB',
    maxSteps: 4
  },
  {
    name: 'Bisect Angle',
    level: 1,
    desc: 'Bisect angle ABC',
    maxSteps: 4
  },
  {
    name: 'Perpendicular (On Line)',
    level: 2,
    desc: 'Construct perpendicular at point P on line',
    maxSteps: 4
  },
  {
    name: 'Perpendicular (To Line)',
    level: 2,
    desc: 'Construct perpendicular from P to line',
    maxSteps: 4
  },
  {
    name: 'Parallel Line',
    level: 2,
    desc: 'Construct line through P parallel to ℓ',
    maxSteps: 5
  },
  {
    name: 'Equilateral Triangle',
    level: 3,
    desc: 'Construct equilateral triangle with base AB',
    maxSteps: 3
  },
  {
    name: 'Square',
    level: 3,
    desc: 'Construct square with side AB',
    maxSteps: 5
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Construction practice workbench with multiple problem types and step-by-step solutions', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Header
  drawHeader();

  // Problem area
  drawProblem();

  // Controls
  drawControls();

  // Problem selector
  drawProblemSelector();
}

function drawHeader() {
  // Title bar
  fill('#1565C0');
  noStroke();
  rect(0, 0, canvasWidth, 45);

  fill('#FFFFFF');
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Construction Practice Workbench', canvasWidth / 2, 22);
  textStyle(NORMAL);

  // Score
  fill('#FFEB3B');
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('Score: ' + score + '/' + attempted, canvasWidth - 20, 22);

  // Level indicator
  let prob = problems[currentProblem];
  let levelColors = ['#4CAF50', '#FF9800', '#F44336'];
  fill(levelColors[prob.level - 1]);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Level ' + prob.level, 20, 22);
}

function drawProblem() {
  let prob = problems[currentProblem];

  // Problem title
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(prob.name, canvasWidth / 2, 55);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text(prob.desc, canvasWidth / 2, 75);

  // Draw the specific problem
  push();
  translate(canvasWidth / 2, drawHeight / 2 + 30);

  switch (currentProblem) {
    case 0: drawCopySegment(); break;
    case 1: drawBisectSegment(); break;
    case 2: drawBisectAngle(); break;
    case 3: drawPerpOnLine(); break;
    case 4: drawPerpToLine(); break;
    case 5: drawParallelLine(); break;
    case 6: drawEquilateralTriangle(); break;
    case 7: drawSquare(); break;
  }

  pop();

  // Step instruction
  fill('#1565C0');
  textSize(12);
  textAlign(CENTER, TOP);
  text(getStepInstruction(), canvasWidth / 2, drawHeight - 30);
}

function drawCopySegment() {
  let segLen = 150;

  // Original segment AB
  stroke('#1565C0');
  strokeWeight(3);
  line(-segLen / 2, -80, segLen / 2, -80);

  fill('#1565C0');
  noStroke();
  ellipse(-segLen / 2, -80, 10, 10);
  ellipse(segLen / 2, -80, 10, 10);

  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('A', -segLen / 2, -90);
  text('B', segLen / 2, -90);

  // Point C
  fill('#2E7D32');
  ellipse(-segLen / 2, 50, 10, 10);
  textAlign(CENTER, TOP);
  text('C', -segLen / 2, 58);

  if (showSolution || step >= 1) {
    // Ray from C
    stroke('#9E9E9E');
    strokeWeight(1);
    setLineDash([5, 3]);
    line(-segLen / 2, 50, segLen, 50);
    setLineDash([]);
  }

  if (showSolution || step >= 2) {
    // Compass arc at AB
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    arc(-segLen / 2, -80, 30, 30, -PI / 4, PI / 4);
  }

  if (showSolution || step >= 3) {
    // Arc from C
    stroke('#E65100');
    arc(-segLen / 2, 50, segLen * 2, segLen * 2, -0.2, 0.2);
  }

  if (showSolution || step >= 4) {
    // Point D
    fill('#C62828');
    noStroke();
    ellipse(segLen / 2, 50, 10, 10);

    // Segment CD
    stroke('#2E7D32');
    strokeWeight(3);
    line(-segLen / 2, 50, segLen / 2, 50);

    fill('#2E7D32');
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('D', segLen / 2, 58);

    textSize(12);
    textStyle(BOLD);
    fill('#2E7D32');
    text('CD ≅ AB ✓', 0, 90);
    textStyle(NORMAL);
  }
}

function drawBisectSegment() {
  let segLen = 200;

  // Segment AB
  stroke('#1565C0');
  strokeWeight(3);
  line(-segLen / 2, 0, segLen / 2, 0);

  fill('#1565C0');
  noStroke();
  ellipse(-segLen / 2, 0, 10, 10);
  ellipse(segLen / 2, 0, 10, 10);

  textSize(11);
  textAlign(CENTER, TOP);
  text('A', -segLen / 2, 8);
  text('B', segLen / 2, 8);

  if (showSolution || step >= 1) {
    // Arc from A
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    arc(-segLen / 2, 0, segLen * 1.4, segLen * 1.4, -PI / 3, PI / 3);
  }

  if (showSolution || step >= 2) {
    // Arc from B
    stroke('#E65100');
    arc(segLen / 2, 0, segLen * 1.4, segLen * 1.4, PI - PI / 3, PI + PI / 3);
  }

  if (showSolution || step >= 3) {
    // Intersection points
    fill('#9C27B0');
    noStroke();
    ellipse(0, -80, 10, 10);
    ellipse(0, 80, 10, 10);

    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('P', 0, -85);
    textAlign(CENTER, TOP);
    text('Q', 0, 85);
  }

  if (showSolution || step >= 4) {
    // Perpendicular bisector
    stroke('#2E7D32');
    strokeWeight(2);
    line(0, -100, 0, 100);

    // Midpoint M
    fill('#C62828');
    noStroke();
    ellipse(0, 0, 12, 12);

    fill('#C62828');
    textSize(11);
    textAlign(LEFT, CENTER);
    text('M', 10, 0);

    // Right angle
    stroke('#333');
    strokeWeight(1.5);
    noFill();
    rect(-8, -8, 8, 8);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('AM ≅ MB ✓', 0, 110);
    textStyle(NORMAL);
  }
}

function drawBisectAngle() {
  let rayLen = 120;
  let angle = PI / 2.5;

  // Angle ABC
  stroke('#1565C0');
  strokeWeight(3);
  line(0, 0, rayLen * cos(-angle / 2), rayLen * sin(-angle / 2));
  line(0, 0, rayLen, 0);

  fill('#1565C0');
  noStroke();
  ellipse(0, 0, 10, 10);

  textSize(11);
  textAlign(CENTER, CENTER);
  text('B', -15, 5);

  if (showSolution || step >= 1) {
    // Arc from B
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    arc(0, 0, 60, 60, -angle / 2, 0);

    fill('#7B1FA2');
    noStroke();
    ellipse(30 * cos(-angle / 2), 30 * sin(-angle / 2), 6, 6);
    ellipse(30, 0, 6, 6);
  }

  if (showSolution || step >= 2) {
    // Arcs from intersection points
    stroke('#E65100');
    strokeWeight(2);
    noFill();
    arc(30 * cos(-angle / 2), 30 * sin(-angle / 2), 50, 50, -0.3, 0.5);
    arc(30, 0, 50, 50, -PI / 2 - 0.3, -PI / 2 + 0.5);
  }

  if (showSolution || step >= 3) {
    // Intersection point D
    let dAngle = -angle / 4;
    let dDist = 55;

    fill('#9C27B0');
    noStroke();
    ellipse(dDist * cos(dAngle), dDist * sin(dAngle), 8, 8);
  }

  if (showSolution || step >= 4) {
    // Bisector ray
    let dAngle = -angle / 4;

    stroke('#2E7D32');
    strokeWeight(2);
    line(0, 0, rayLen * cos(dAngle), rayLen * sin(dAngle));

    // Congruence marks
    stroke('#2E7D32');
    noFill();
    arc(0, 0, 40, 40, -angle / 2, dAngle);
    arc(0, 0, 40, 40, dAngle, 0);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('∠ABD ≅ ∠DBC ✓', 0, 100);
    textStyle(NORMAL);
  }
}

function drawPerpOnLine() {
  // Line with point P on it
  stroke('#1565C0');
  strokeWeight(3);
  line(-200, 0, 200, 0);

  fill('#C62828');
  noStroke();
  ellipse(0, 0, 12, 12);

  fill('#C62828');
  textSize(11);
  textAlign(CENTER, TOP);
  text('P', 0, 10);

  if (showSolution || step >= 1) {
    stroke('#7B1FA2');
    strokeWeight(2);
    noFill();
    arc(0, 0, 80, 80, PI - 0.3, PI + 0.3);
    arc(0, 0, 80, 80, -0.3, 0.3);

    fill('#7B1FA2');
    noStroke();
    ellipse(-40, 0, 6, 6);
    ellipse(40, 0, 6, 6);
  }

  if (showSolution || step >= 2) {
    stroke('#E65100');
    strokeWeight(2);
    noFill();
    arc(-40, 0, 80, 80, -PI / 2 - 0.4, -PI / 2 + 0.4);
  }

  if (showSolution || step >= 3) {
    stroke('#2E7D32');
    arc(40, 0, 80, 80, -PI / 2 - 0.4, -PI / 2 + 0.4);

    fill('#9C27B0');
    noStroke();
    ellipse(0, -60, 8, 8);
  }

  if (showSolution || step >= 4) {
    stroke('#2E7D32');
    strokeWeight(3);
    line(0, -100, 0, 50);

    stroke('#333');
    strokeWeight(1.5);
    noFill();
    rect(-8, -8, 8, 8);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('⊥ at P ✓', 0, 70);
    textStyle(NORMAL);
  }
}

function drawPerpToLine() {
  // Similar structure for other problems...
  stroke('#1565C0');
  strokeWeight(3);
  line(-200, 50, 200, 50);

  fill('#C62828');
  noStroke();
  ellipse(0, -50, 12, 12);
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('P', 0, -58);

  if (showSolution || step >= 4) {
    stroke('#2E7D32');
    strokeWeight(3);
    line(0, -80, 0, 80);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('⊥ from P ✓', 0, 90);
    textStyle(NORMAL);
  }
}

function drawParallelLine() {
  stroke('#1565C0');
  strokeWeight(3);
  line(-200, 50, 200, 50);

  fill('#C62828');
  noStroke();
  ellipse(0, -50, 12, 12);
  textSize(11);
  text('P', 0, -65);

  if (showSolution || step >= 5) {
    stroke('#2E7D32');
    strokeWeight(3);
    line(-200, -50, 200, -50);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('m ∥ ℓ ✓', 0, 80);
    textStyle(NORMAL);
  }
}

function drawEquilateralTriangle() {
  let base = 150;

  stroke('#1565C0');
  strokeWeight(3);
  line(-base / 2, 50, base / 2, 50);

  fill('#1565C0');
  noStroke();
  ellipse(-base / 2, 50, 10, 10);
  ellipse(base / 2, 50, 10, 10);
  textSize(11);
  text('A', -base / 2, 65);
  text('B', base / 2, 65);

  if (showSolution || step >= 3) {
    let h = base * sin(PI / 3);
    stroke('#2E7D32');
    strokeWeight(3);
    line(-base / 2, 50, 0, 50 - h);
    line(base / 2, 50, 0, 50 - h);

    fill('#C62828');
    noStroke();
    ellipse(0, 50 - h, 10, 10);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Equilateral ✓', 0, 85);
    textStyle(NORMAL);
  }
}

function drawSquare() {
  let side = 120;

  stroke('#1565C0');
  strokeWeight(3);
  line(-side / 2, 60, side / 2, 60);

  fill('#1565C0');
  noStroke();
  ellipse(-side / 2, 60, 10, 10);
  ellipse(side / 2, 60, 10, 10);

  if (showSolution || step >= 5) {
    stroke('#2E7D32');
    strokeWeight(3);
    rect(-side / 2, 60 - side, side, side);

    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    noStroke();
    text('Square ✓', 0, 85);
    textStyle(NORMAL);
  }
}

function getStepInstruction() {
  if (showSolution) return 'Solution shown - click "Hide Solution" to practice';

  let prob = problems[currentProblem];
  return 'Step ' + step + ' of ' + prob.maxSteps + ' - Click "Next Step" to continue';
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawControls() {
  let y = drawHeight + 10;

  // Step controls
  let btnW = 90;
  let btnX = canvasWidth / 2 - 150;

  // Previous step
  fill(step > 0 ? '#7B1FA2' : '#E0E0E0');
  noStroke();
  rect(btnX, y, btnW, 35, 5);
  fill(step > 0 ? '#FFFFFF' : '#9E9E9E');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('← Prev Step', btnX + btnW / 2, y + 17);

  // Next step
  let prob = problems[currentProblem];
  fill(step < prob.maxSteps ? '#7B1FA2' : '#E0E0E0');
  rect(btnX + btnW + 5, y, btnW, 35, 5);
  fill(step < prob.maxSteps ? '#FFFFFF' : '#9E9E9E');
  text('Next Step →', btnX + btnW * 1.5 + 5, y + 17);

  // Show/Hide solution
  fill(showSolution ? '#E65100' : '#FF9800');
  rect(btnX + (btnW + 5) * 2, y, btnW, 35, 5);
  fill('#FFFFFF');
  text(showSolution ? 'Hide Solution' : 'Show Solution', btnX + btnW * 2.5 + 10, y + 17);
}

function drawProblemSelector() {
  let y = drawHeight + 55;

  fill('#424242');
  textSize(11);
  textAlign(LEFT, TOP);
  text('Select Problem:', 20, y);

  let btnW = (canvasWidth - 60) / 8;
  let btnX = 20;
  let btnY = y + 18;

  for (let i = 0; i < problems.length; i++) {
    let prob = problems[i];
    let isSelected = (currentProblem === i);
    let levelColors = ['#4CAF50', '#FF9800', '#F44336'];

    fill(isSelected ? levelColors[prob.level - 1] : '#E0E0E0');
    stroke(levelColors[prob.level - 1]);
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX + i * (btnW + 5), btnY, btnW, 40, 5);

    fill(isSelected ? '#FFFFFF' : '#424242');
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text(prob.name, btnX + i * (btnW + 5) + btnW / 2, btnY + 20);
  }
}

function mousePressed() {
  let y = drawHeight + 10;
  let btnW = 90;
  let btnX = canvasWidth / 2 - 150;

  // Step controls
  if (mouseY > y && mouseY < y + 35) {
    let prob = problems[currentProblem];

    if (mouseX > btnX && mouseX < btnX + btnW && step > 0) {
      step--;
    } else if (mouseX > btnX + btnW + 5 && mouseX < btnX + btnW * 2 + 5 && step < prob.maxSteps) {
      step++;
    } else if (mouseX > btnX + (btnW + 5) * 2 && mouseX < btnX + btnW * 3 + 10) {
      showSolution = !showSolution;
    }
  }

  // Problem selector
  let selY = drawHeight + 73;
  let selBtnW = (canvasWidth - 60) / 8;

  if (mouseY > selY && mouseY < selY + 40) {
    for (let i = 0; i < problems.length; i++) {
      let px = 20 + i * (selBtnW + 5);
      if (mouseX > px && mouseX < px + selBtnW) {
        currentProblem = i;
        step = 0;
        showSolution = false;
      }
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
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 700);
  }
}
