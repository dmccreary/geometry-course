// Every Proof Has This Structure
// Interactive flowchart diagram showing the anatomy of a geometric proof
// Left-to-right progression: GIVEN -> LOGICAL STEPS -> PROVE

let canvasWidth = 900;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredSection = -1; // 0=Given, 1=Steps, 2=Prove, 3=Toolbox

// Layout constants (recalculated on resize)
let marginX = 15;
let titleAreaH = 55;
let footerH = 25;
let sectionGap = 10;

// Section geometry (set in recalcLayout)
let secY, secH, givenX, givenW, stepsX, stepsW, proveX, proveW;
let toolboxX, toolboxY, toolboxW, toolboxH;

// Colors
const GREEN_BG   = '#C8E6C9';
const GREEN_BD   = '#43A047';
const BLUE_BG    = '#BBDEFB';
const BLUE_BD    = '#1976D2';
const PURPLE_BG  = '#E1BEE7';
const PURPLE_BD  = '#7B1FA2';
const YELLOW_BG  = '#FFF8E1';
const YELLOW_BD  = '#FF9800';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Flowchart diagram showing the anatomy of a geometric proof with Given, Logical Steps, and Prove sections flowing left to right', LABEL);
  textFont('Arial');
}

function draw() {
  updateCanvasSize();
  recalcLayout();

  background('#FAFAFA');

  // ---- Title ----
  noStroke();
  fill('#1565C0');
  textSize(constrain(canvasWidth * 0.027, 16, 24));
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Every Proof Has This Structure', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(constrain(canvasWidth * 0.016, 10, 14));
  text('The format may vary, but these parts are always present', canvasWidth / 2, 36);

  // ---- Detect hover ----
  hoveredSection = getHoveredSection();
  cursor(hoveredSection >= 0 ? HAND : ARROW);

  // ---- Large connecting arrows (drawn behind boxes) ----
  drawLargeArrows();

  // ---- Three main sections ----
  drawGivenSection();
  drawStepsSection();
  drawProveSection();

  // ---- Toolbox ----
  drawToolbox();

  // ---- Footer labels ----
  noStroke();
  fill('#43A047');
  textSize(constrain(canvasWidth * 0.014, 9, 12));
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);
  text('START', givenX + 5, canvasHeight - 5);
  fill('#7B1FA2');
  textAlign(RIGHT, BOTTOM);
  text('FINISH', proveX + proveW - 5, canvasHeight - 5);
  textStyle(NORMAL);
}

// ============================
// Layout calculation
// ============================
function recalcLayout() {
  secY = titleAreaH;
  secH = canvasHeight - titleAreaH - footerH;

  // Toolbox width
  toolboxW = constrain(canvasWidth * 0.17, 110, 155);
  toolboxH = constrain(secH * 0.45, 100, 150);

  // Available width for the three main sections
  let availW = canvasWidth - 2 * marginX - toolboxW - sectionGap;

  // Proportions: Given 22%, Steps 50%, Prove 22%, gaps 6%
  let gapTotal = sectionGap * 2;
  let netW = availW - gapTotal;

  givenW = netW * 0.24;
  stepsW = netW * 0.52;
  proveW = netW * 0.24;

  givenX = marginX;
  stepsX = givenX + givenW + sectionGap;
  proveX = stepsX + stepsW + sectionGap;

  toolboxX = proveX + proveW + sectionGap;
  toolboxY = secY;
}

// ============================
// GIVEN section
// ============================
function drawGivenSection() {
  let x = givenX, y = secY, w = givenW, h = secH;
  let hovered = (hoveredSection === 0);

  // Box
  fill(hovered ? lerpColor(color(GREEN_BG), color(255), 0.25) : GREEN_BG);
  stroke(GREEN_BD);
  strokeWeight(hovered ? 3 : 2);
  rect(x, y, w, h, 10);

  // Flag icon
  noStroke();
  drawFlag(x + w / 2, y + 18, GREEN_BD);

  // Title
  fill(GREEN_BD);
  textSize(constrain(w * 0.09, 12, 16));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('GIVEN', x + w / 2, y + 42);
  textStyle(NORMAL);

  // Subtitle
  fill('#616161');
  textSize(constrain(w * 0.065, 9, 12));
  text('Known information', x + w / 2, y + 60);

  // Examples
  fill('#424242');
  textSize(constrain(w * 0.058, 8, 11));
  textAlign(LEFT, TOP);
  let exY = y + 82;
  let examples = [
    '\u2220 1 and \u2220 2 are vertical angles',
    'Line m \u2225 Line n',
    '\u25B3 ABC is isosceles'
  ];
  let showCount = hovered ? examples.length : min(2, examples.length);
  for (let i = 0; i < showCount; i++) {
    let wrapped = wrapText('\u2022 ' + examples[i], w - 16);
    for (let line of wrapped) {
      text(line, x + 8, exY);
      exY += constrain(w * 0.065, 10, 14);
    }
    exY += 2;
  }

  // Note at bottom
  fill(GREEN_BD);
  textSize(constrain(w * 0.055, 8, 10));
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text('What you START with', x + w / 2, y + h - 8);
  textStyle(NORMAL);
}

// ============================
// LOGICAL STEPS section
// ============================
function drawStepsSection() {
  let x = stepsX, y = secY, w = stepsW, h = secH;
  let hovered = (hoveredSection === 1);

  // Background box
  fill(hovered ? lerpColor(color(BLUE_BG), color(255), 0.25) : BLUE_BG);
  stroke(BLUE_BD);
  strokeWeight(hovered ? 3 : 2);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(BLUE_BD);
  textSize(constrain(w * 0.05, 12, 16));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('LOGICAL STEPS', x + w / 2, y + 12);
  textStyle(NORMAL);

  fill('#616161');
  textSize(constrain(w * 0.035, 9, 12));
  text('Series of valid deductions', x + w / 2, y + 30);

  // Step chain boxes
  let stepCount = 3;
  let innerPad = 12;
  let stepGap = 28;
  let totalGaps = (stepCount - 1) * stepGap;
  let stepW = (w - 2 * innerPad - totalGaps) / stepCount;
  stepW = constrain(stepW, 60, 160);
  let stepH = constrain(h * 0.55, 80, 140);
  let stepYStart = y + 50;

  let stepData = [
    { stmt: 'm\u22201 + m\u22202 = 180\u00B0', reason: 'Linear Pair Postulate' },
    { stmt: '\u22201 \u2245 \u22203', reason: 'Vertical Angles Thm' },
    { stmt: 'm\u22201 = m\u22202', reason: 'Subtraction Property' }
  ];

  for (let i = 0; i < stepCount; i++) {
    let sx = x + innerPad + i * (stepW + stepGap);
    let sy = stepYStart;

    // Step box
    fill(255);
    stroke('#64B5F6');
    strokeWeight(2);
    rect(sx, sy, stepW, stepH, 8);

    // Step label
    noStroke();
    fill(BLUE_BD);
    textSize(constrain(stepW * 0.1, 8, 11));
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Step ' + (i + 1), sx + stepW / 2, sy + 6);
    textStyle(NORMAL);

    // Statement
    fill('#424242');
    let contentSize = constrain(stepW * 0.085, 7, 10);
    textSize(contentSize);
    textAlign(CENTER, TOP);

    fill('#1565C0');
    textStyle(BOLD);
    text('Statement:', sx + stepW / 2, sy + 22);
    textStyle(NORMAL);
    fill('#424242');
    let stmtLines = wrapText(stepData[i].stmt, stepW - 10);
    let stmtY = sy + 34;
    for (let line of stmtLines) {
      text(line, sx + stepW / 2, stmtY);
      stmtY += contentSize + 2;
    }

    // Divider
    stroke('#BBDEFB');
    strokeWeight(1);
    let divY = sy + stepH * 0.5;
    line(sx + 8, divY, sx + stepW - 8, divY);

    // Reason
    noStroke();
    fill('#E65100');
    textStyle(BOLD);
    textSize(contentSize);
    text('Reason:', sx + stepW / 2, divY + 6);
    textStyle(NORMAL);
    fill('#424242');
    let reasonLines = wrapText(stepData[i].reason, stepW - 10);
    let reasonY = divY + 18;
    for (let line of reasonLines) {
      text(line, sx + stepW / 2, reasonY);
      reasonY += contentSize + 2;
    }

    // Arrow to next step
    if (i < stepCount - 1) {
      let arrowStartX = sx + stepW + 2;
      let arrowEndX = sx + stepW + stepGap - 2;
      let arrowMidY = sy + stepH / 2;

      stroke(BLUE_BD);
      strokeWeight(2);
      line(arrowStartX, arrowMidY, arrowEndX - 6, arrowMidY);

      // Arrowhead
      noStroke();
      fill(BLUE_BD);
      triangle(
        arrowEndX, arrowMidY,
        arrowEndX - 8, arrowMidY - 4,
        arrowEndX - 8, arrowMidY + 4
      );

      // "Therefore" label
      fill('#757575');
      textSize(constrain(stepGap * 0.3, 6, 8));
      textAlign(CENTER, BOTTOM);
      text('Therefore...', (arrowStartX + arrowEndX) / 2, arrowMidY - 6);
    }
  }

  // Note at bottom
  noStroke();
  fill(BLUE_BD);
  textSize(constrain(w * 0.03, 8, 10));
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text('Each step MUST be justified', x + w / 2, y + h - 8);
  textStyle(NORMAL);
}

// ============================
// PROVE section
// ============================
function drawProveSection() {
  let x = proveX, y = secY, w = proveW, h = secH;
  let hovered = (hoveredSection === 2);

  // Box
  fill(hovered ? lerpColor(color(PURPLE_BG), color(255), 0.25) : PURPLE_BG);
  stroke(PURPLE_BD);
  strokeWeight(hovered ? 3 : 2);
  rect(x, y, w, h, 10);

  // Finish flag icon
  noStroke();
  drawFinishFlag(x + w / 2, y + 18, PURPLE_BD);

  // Title
  fill(PURPLE_BD);
  textSize(constrain(w * 0.08, 11, 15));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('PROVE', x + w / 2, y + 42);
  textStyle(NORMAL);

  fill('#616161');
  textSize(constrain(w * 0.06, 8, 11));
  text('(Conclusion)', x + w / 2, y + 58);

  // Examples
  fill('#424242');
  textSize(constrain(w * 0.058, 8, 11));
  textAlign(LEFT, TOP);
  let exY = y + 82;
  let examples = [
    '\u22201 \u2245 \u22202',
    '\u25B3 ABC \u2245 \u25B3 DEF'
  ];
  let showCount = hovered ? examples.length : min(2, examples.length);
  for (let i = 0; i < showCount; i++) {
    text('\u2022 ' + examples[i], x + 8, exY);
    exY += constrain(w * 0.07, 12, 16);
  }

  // Note at bottom
  fill(PURPLE_BD);
  textSize(constrain(w * 0.055, 8, 10));
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text('What you END with', x + w / 2, y + h - 8);
  textStyle(NORMAL);
}

// ============================
// Large connecting arrows
// ============================
function drawLargeArrows() {
  let midY = secY + secH / 2;

  // Arrow 1: Given -> Steps
  let a1Start = givenX + givenW + 2;
  let a1End = stepsX - 2;
  let a1Mid = (a1Start + a1End) / 2;

  stroke(GREEN_BD);
  strokeWeight(4);
  line(a1Start, midY, a1End - 10, midY);

  noStroke();
  fill(GREEN_BD);
  triangle(a1End, midY, a1End - 12, midY - 7, a1End - 12, midY + 7);

  // Arrow 2: Steps -> Prove
  let a2Start = stepsX + stepsW + 2;
  let a2End = proveX - 2;
  let a2Mid = (a2Start + a2End) / 2;

  stroke(PURPLE_BD);
  strokeWeight(4);
  line(a2Start, midY, a2End - 10, midY);

  noStroke();
  fill(PURPLE_BD);
  triangle(a2End, midY, a2End - 12, midY - 7, a2End - 12, midY + 7);
}

// ============================
// Toolbox
// ============================
function drawToolbox() {
  let x = toolboxX, y = toolboxY, w = toolboxW, h = toolboxH;
  let hovered = (hoveredSection === 3);

  fill(hovered ? '#FFF3E0' : YELLOW_BG);
  stroke(YELLOW_BD);
  strokeWeight(hovered ? 3 : 2);
  rect(x, y, w, h, 10);

  noStroke();
  fill('#E65100');
  textSize(constrain(w * 0.085, 9, 12));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Toolbox', x + w / 2, y + 8);
  textStyle(NORMAL);

  fill('#424242');
  let ts = constrain(w * 0.07, 7, 10);
  textSize(ts);
  textAlign(LEFT, TOP);
  let tools = [
    'Postulates',
    'Definitions',
    'Proven Theorems',
    'Algebraic Props.',
    'Logic Rules'
  ];
  let ty = y + 28;
  for (let tool of tools) {
    text('\u2022 ' + tool, x + 8, ty);
    ty += ts + 6;
  }
}

// ============================
// Flag icons (canvas-drawn)
// ============================
function drawFlag(cx, cy, col) {
  // Simple starting flag
  push();
  stroke(col);
  strokeWeight(2);
  // Pole
  line(cx - 8, cy, cx - 8, cy + 20);
  // Flag
  noStroke();
  fill(col);
  triangle(cx - 8, cy, cx + 8, cy + 5, cx - 8, cy + 10);
  pop();
}

function drawFinishFlag(cx, cy, col) {
  // Checkered finish flag
  push();
  stroke(col);
  strokeWeight(2);
  // Pole
  line(cx - 8, cy, cx - 8, cy + 20);
  noStroke();
  // Flag background
  fill(255);
  rect(cx - 8, cy, 16, 10);
  // Checkers
  fill(col);
  rect(cx - 8, cy, 4, 5);
  rect(cx - 4, cy + 5, 4, 5);
  rect(cx, cy, 4, 5);
  rect(cx + 4, cy + 5, 4, 5);
  pop();
}

// ============================
// Hover detection
// ============================
function getHoveredSection() {
  if (mouseX > givenX && mouseX < givenX + givenW &&
      mouseY > secY && mouseY < secY + secH) return 0;
  if (mouseX > stepsX && mouseX < stepsX + stepsW &&
      mouseY > secY && mouseY < secY + secH) return 1;
  if (mouseX > proveX && mouseX < proveX + proveW &&
      mouseY > secY && mouseY < secY + secH) return 2;
  if (mouseX > toolboxX && mouseX < toolboxX + toolboxW &&
      mouseY > toolboxY && mouseY < toolboxY + toolboxH) return 3;
  return -1;
}

// ============================
// Text wrapping helper
// ============================
function wrapText(str, maxW) {
  let words = str.split(' ');
  let lines = [];
  let current = '';
  for (let word of words) {
    let test = current.length === 0 ? word : current + ' ' + word;
    if (textWidth(test) > maxW && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current.length > 0) lines.push(current);
  return lines;
}

// ============================
// Responsive sizing
// ============================
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 500);
  }
  canvasHeight = drawHeight;
}
