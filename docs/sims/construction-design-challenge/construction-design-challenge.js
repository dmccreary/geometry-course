// Construction Design Challenge
// Apply construction techniques to design a symmetric structure

let canvasWidth = 850;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let phase = 0; // 0-3 for different phases
let step = 0;
let maxStepsPerPhase = [3, 2, 2, 1];

// Structure points
let pointA, pointB, pointC, pointT;
let showConstructionLines = true;
let structureComplete = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetDesign();

  describe('Interactive construction challenge to design a symmetric bridge structure', LABEL);
}

function draw() {
  updateCanvasSize();

  // Sky gradient
  for (let y = 0; y < drawHeight - 100; y++) {
    let inter = map(y, 0, drawHeight - 100, 0, 1);
    stroke(lerpColor(color('#87CEEB'), color('#E0F7FA'), inter));
    line(0, y, canvasWidth, y);
  }

  // Ground
  fill('#8B4513');
  noStroke();
  rect(0, drawHeight - 100, canvasWidth, 100);

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Construction Design Challenge: Build a Bridge', canvasWidth / 2, 8);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  text('Apply geometric constructions to create a symmetric structure', canvasWidth / 2, 30);

  drawStructure();
  drawObjectives();
  drawControls();
}

function resetDesign() {
  pointA = { x: 150, y: drawHeight - 100 };
  pointB = { x: canvasWidth - 150, y: drawHeight - 100 };
  pointC = { x: (pointA.x + pointB.x) / 2, y: drawHeight - 100 };
  pointT = { x: pointC.x, y: 150 };
  phase = 0;
  step = 0;
  structureComplete = false;
}

function drawStructure() {
  push();

  // Ground line
  stroke('#5D4037');
  strokeWeight(4);
  line(50, drawHeight - 100, canvasWidth - 50, drawHeight - 100);

  // Anchor points A and B
  fill('#C62828');
  noStroke();
  ellipse(pointA.x, pointA.y, 14, 14);
  ellipse(pointB.x, pointB.y, 14, 14);

  fill('#C62828');
  textSize(12);
  textAlign(CENTER, TOP);
  text('A', pointA.x, pointA.y + 10);
  text('B', pointB.x, pointB.y + 10);

  // Phase 1: Bisect AB to find center
  if (phase >= 1 || (phase === 0 && step >= 1)) {
    if (showConstructionLines) {
      // Construction arcs
      stroke('#7B1FA2');
      strokeWeight(1);
      noFill();
      setLineDash([3, 3]);
      let arcR = 250;
      arc(pointA.x, pointA.y, arcR * 2, arcR * 2, -PI / 3, 0);
      arc(pointB.x, pointB.y, arcR * 2, arcR * 2, PI, PI + PI / 3);
      setLineDash([]);
    }
  }

  if (phase >= 1 || (phase === 0 && step >= 2)) {
    // Center point C
    fill('#2E7D32');
    noStroke();
    ellipse(pointC.x, pointC.y, 12, 12);

    fill('#2E7D32');
    textSize(11);
    textAlign(CENTER, TOP);
    text('C (midpoint)', pointC.x, pointC.y + 10);

    if (showConstructionLines) {
      // Perpendicular bisector
      stroke('#2E7D32');
      strokeWeight(1);
      setLineDash([5, 5]);
      line(pointC.x, pointC.y, pointC.x, 80);
      setLineDash([]);
    }
  }

  // Phase 2: Vertical support
  if (phase >= 2 || (phase === 1 && step >= 1)) {
    // Vertical tower
    stroke('#1565C0');
    strokeWeight(6);
    line(pointC.x, pointC.y, pointC.x, pointT.y);

    // Top point T
    fill('#1565C0');
    noStroke();
    ellipse(pointT.x, pointT.y, 14, 14);

    fill('#1565C0');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('T (tower top)', pointT.x, pointT.y - 10);

    // Right angle symbol
    stroke('#333');
    strokeWeight(2);
    noFill();
    rect(pointC.x, pointC.y - 15, 15, 15);
  }

  // Phase 3: Angled braces
  if (phase >= 3 || (phase === 2 && step >= 1)) {
    // Braces AT and BT
    stroke('#E65100');
    strokeWeight(4);
    line(pointA.x, pointA.y, pointT.x, pointT.y);
    line(pointB.x, pointB.y, pointT.x, pointT.y);

    if (showConstructionLines) {
      // Angle marks showing symmetry
      let angleA = atan2(pointT.y - pointA.y, pointT.x - pointA.x);
      let angleB = atan2(pointT.y - pointB.y, pointT.x - pointB.x);

      stroke('#E65100');
      strokeWeight(2);
      noFill();
      arc(pointA.x, pointA.y, 50, 50, angleA, 0);
      arc(pointB.x, pointB.y, 50, 50, PI, PI - abs(angleB));
    }
  }

  // Phase 4: Completion
  if (phase >= 3 && step >= 1) {
    structureComplete = true;

    // Horizontal beams
    stroke('#795548');
    strokeWeight(3);
    let beam1Y = pointT.y + 80;
    let beam2Y = pointT.y + 160;

    // Calculate x positions on braces
    let t1 = (beam1Y - pointT.y) / (pointA.y - pointT.y);
    let beam1LeftX = pointT.x + t1 * (pointA.x - pointT.x);
    let beam1RightX = pointT.x + t1 * (pointB.x - pointT.x);

    let t2 = (beam2Y - pointT.y) / (pointA.y - pointT.y);
    let beam2LeftX = pointT.x + t2 * (pointA.x - pointT.x);
    let beam2RightX = pointT.x + t2 * (pointB.x - pointT.x);

    line(beam1LeftX, beam1Y, beam1RightX, beam1Y);
    line(beam2LeftX, beam2Y, beam2RightX, beam2Y);

    // Symmetry axis
    if (showConstructionLines) {
      stroke('#2E7D32');
      strokeWeight(1);
      setLineDash([8, 4]);
      line(pointC.x, 60, pointC.x, drawHeight - 80);
      setLineDash([]);

      fill('#2E7D32');
      textSize(10);
      textAlign(CENTER, TOP);
      text('Axis of Symmetry', pointC.x, 50);
    }

    // Success message
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('✓ Symmetric Bridge Complete!', canvasWidth / 2, drawHeight - 70);
    textStyle(NORMAL);
  }

  pop();
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawObjectives() {
  let objX = 20;
  let objY = 55;
  let objW = 180;

  fill('#FFFFFF');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(objX, objY, objW, 130, 5);

  fill('#424242');
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  noStroke();
  text('Objectives:', objX + 10, objY + 8);
  textStyle(NORMAL);

  textSize(10);
  let objectives = [
    '1. Bisect AB to find center C',
    '2. Construct perpendicular tower',
    '3. Add symmetric braces AT, BT',
    '4. Complete with parallel beams'
  ];

  for (let i = 0; i < objectives.length; i++) {
    let complete = (phase > i) || (phase === i && step >= maxStepsPerPhase[i]);
    fill(complete ? '#2E7D32' : '#757575');
    let prefix = complete ? '✓ ' : '○ ';
    text(prefix + objectives[i], objX + 10, objY + 28 + i * 22);
  }
}

function drawControls() {
  let y = drawHeight + 15;

  // Toggle construction lines
  let toggleX = 30;
  fill(showConstructionLines ? '#7B1FA2' : '#E0E0E0');
  stroke(showConstructionLines ? '#7B1FA2' : '#BDBDBD');
  strokeWeight(2);
  rect(toggleX, y, 140, 35, 5);

  fill(showConstructionLines ? '#FFFFFF' : '#757575');
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text(showConstructionLines ? '✓ Construction Lines' : '○ Construction Lines', toggleX + 70, y + 17);

  // Step controls
  let btnW = 65;
  let btnX = canvasWidth / 2 - 70;

  // Next Phase/Step
  let canAdvance = step < maxStepsPerPhase[phase] || phase < 3;
  fill(canAdvance ? '#2E7D32' : '#E0E0E0');
  noStroke();
  rect(btnX, y, btnW * 2, 35, 5);
  fill(canAdvance ? '#FFFFFF' : '#9E9E9E');
  textSize(11);
  text('Next Step →', btnX + btnW, y + 17);

  // Reset
  fill('#607D8B');
  rect(btnX + btnW * 2 + 10, y, btnW, 35, 5);
  fill('#FFFFFF');
  text('Reset', btnX + btnW * 2.5 + 10, y + 17);

  // Phase/Step indicator
  fill('#424242');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Phase ' + (phase + 1) + ' / Step ' + step, canvasWidth / 2, y + 55);

  // Current instruction
  fill('#1565C0');
  textSize(10);
  text(getInstruction(), canvasWidth / 2, y + 72);
}

function getInstruction() {
  let instructions = [
    ['Click Next to start', 'Draw arcs from A and B', 'Mark center point C', 'Phase 1 Complete!'],
    ['Click Next to continue', 'Draw vertical tower CT', 'Phase 2 Complete!'],
    ['Click Next to continue', 'Draw braces AT and BT', 'Phase 3 Complete!'],
    ['Click Next to finish', 'Add horizontal beams!']
  ];

  if (phase < 4) {
    return instructions[phase][min(step, instructions[phase].length - 1)];
  }
  return 'Structure complete!';
}

function mousePressed() {
  let y = drawHeight + 15;

  // Toggle construction lines
  if (mouseX > 30 && mouseX < 170 && mouseY > y && mouseY < y + 35) {
    showConstructionLines = !showConstructionLines;
  }

  // Next step
  let btnW = 65;
  let btnX = canvasWidth / 2 - 70;

  if (mouseX > btnX && mouseX < btnX + btnW * 2 && mouseY > y && mouseY < y + 35) {
    if (step < maxStepsPerPhase[phase]) {
      step++;
    } else if (phase < 3) {
      phase++;
      step = 0;
    }
  }

  // Reset
  if (mouseX > btnX + btnW * 2 + 10 && mouseX < btnX + btnW * 3 + 10 && mouseY > y && mouseY < y + 35) {
    resetDesign();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 650);
  }
}
