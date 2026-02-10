// Conditional Statement Transformer
// Interactive MicroSim: Converse, Inverse, Contrapositive Generator
// Learning objective: Students will create converse, inverse, and
// contrapositive statements from any given conditional statement
// and test their truth values (Bloom's: Creating)

// ---- Canvas dimensions ----
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- State ----
let currentIndex = 0;
let showConnections = true;
let showTruthValues = true;

// ---- Button hit regions (computed in draw) ----
let prevBtn = {};
let nextBtn = {};
let randomBtn = {};
let connToggle = {};
let truthToggle = {};

// ---- Statement data ----
// Each entry: { hyp, con, origTrue, convTrue, invTrue, contraTrue }
// origTrue  : p -> q
// convTrue  : q -> p
// invTrue   : ~p -> ~q
// contraTrue: ~q -> ~p  (always same as origTrue)
const statements = [
  {
    hyp: "a triangle is equilateral",
    con: "all sides are equal",
    origTrue: true, convTrue: true, invTrue: true, contraTrue: true
  },
  {
    hyp: "a quadrilateral is a square",
    con: "it has four right angles",
    origTrue: true, convTrue: false, invTrue: false, contraTrue: true
  },
  {
    hyp: "two lines are parallel",
    con: "they never intersect",
    origTrue: true, convTrue: true, invTrue: true, contraTrue: true
  },
  {
    hyp: "an angle measures 90\u00B0",
    con: "it is a right angle",
    origTrue: true, convTrue: true, invTrue: true, contraTrue: true
  },
  {
    hyp: "a figure has four sides",
    con: "it is a square",
    origTrue: false, convTrue: true, invTrue: true, contraTrue: false
  },
  {
    hyp: "two angles are vertical",
    con: "they are congruent",
    origTrue: true, convTrue: false, invTrue: false, contraTrue: true
  },
  {
    hyp: "a triangle has two equal sides",
    con: "it is isosceles",
    origTrue: true, convTrue: true, invTrue: true, contraTrue: true
  },
  {
    hyp: "a shape is a rectangle",
    con: "opposite sides are parallel",
    origTrue: true, convTrue: false, invTrue: false, contraTrue: true
  },
  {
    hyp: "an angle is acute",
    con: "it measures less than 90\u00B0",
    origTrue: true, convTrue: true, invTrue: true, contraTrue: true
  },
  {
    hyp: "a polygon has three sides",
    con: "it is a triangle",
    origTrue: true, convTrue: true, invTrue: true, contraTrue: true
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive conditional statement transformer showing original, converse, inverse, and contrapositive with truth values', LABEL);
}

function draw() {
  updateCanvasSize();

  let s = statements[currentIndex];

  // ---- Drawing area background ----
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // ---- Control area background ----
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // ---- Title ----
  noStroke();
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Converse, Inverse, Contrapositive', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Subtitle with current statement number
  fill('#555');
  textSize(14);
  text('Statement ' + (currentIndex + 1) + ' of ' + statements.length, canvasWidth / 2, 40);

  // ---- Grid of 4 boxes ----
  let gapX = 20;
  let gapY = 16;
  let gridTop = 62;
  let boxW = (canvasWidth - gapX * 3) / 2;
  let boxH = 240;

  let x1 = gapX;
  let x2 = gapX * 2 + boxW;
  let y1 = gridTop;
  let y2 = gridTop + boxH + gapY;

  drawStatementBox(x1, y1, boxW, boxH, 'ORIGINAL CONDITIONAL', 'p \u2192 q',
    'If ' + s.hyp + ', then ' + s.con + '.',
    s.origTrue, '#2196F3', '#E3F2FD');

  drawStatementBox(x2, y1, boxW, boxH, 'CONVERSE', 'q \u2192 p',
    'If ' + s.con + ', then ' + s.hyp + '.',
    s.convTrue, '#9C27B0', '#F3E5F5');

  drawStatementBox(x1, y2, boxW, boxH, 'INVERSE', '~p \u2192 ~q',
    'If ' + negate(s.hyp) + ', then ' + negate(s.con) + '.',
    s.invTrue, '#FF9800', '#FFF3E0');

  drawStatementBox(x2, y2, boxW, boxH, 'CONTRAPOSITIVE', '~q \u2192 ~p',
    'If ' + negate(s.con) + ', then ' + negate(s.hyp) + '.',
    s.contraTrue, '#4CAF50', '#E8F5E9');

  // ---- Connection lines ----
  if (showConnections) {
    drawConnections(x1, y1, x2, y2, boxW, boxH);
  }

  // ---- Hint box ----
  drawHintBox();

  // ---- Controls ----
  drawControls();
}

// ---- Draw a single statement box ----
function drawStatementBox(x, y, w, h, title, symbolic, verbal, truthVal, borderColor, bgColor) {
  // Box background
  fill(bgColor);
  stroke(borderColor);
  strokeWeight(3);
  rect(x, y, w, h, 10);

  // Header bar
  fill(borderColor);
  noStroke();
  rect(x, y, w, 36, 10, 10, 0, 0);
  // Fill the bottom part of header to make it square at bottom
  rect(x, y + 20, w, 16);

  // Header text
  fill('white');
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(title, x + w / 2, y + 18);
  textStyle(NORMAL);

  // Symbolic form
  fill('#333');
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(ITALIC);
  text(symbolic, x + w / 2, y + 46);
  textStyle(NORMAL);

  // Verbal form (wrapped)
  fill('#222');
  textSize(14);
  textAlign(LEFT, TOP);
  drawWrappedText(verbal, x + 16, y + 74, w - 32, 18);

  // Truth indicator
  if (showTruthValues) {
    let indicatorX = x + w / 2;
    let indicatorY = y + h - 40;

    if (truthVal === true) {
      fill('#4CAF50');
      stroke('#2E7D32');
      strokeWeight(2);
      circle(indicatorX - 45, indicatorY, 24);
      noStroke();
      fill('white');
      textSize(14);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text('\u2713', indicatorX - 45, indicatorY);
      fill('#2E7D32');
      textSize(14);
      textAlign(LEFT, CENTER);
      text('TRUE', indicatorX - 30, indicatorY);
    } else if (truthVal === false) {
      fill('#F44336');
      stroke('#C62828');
      strokeWeight(2);
      circle(indicatorX - 45, indicatorY, 24);
      noStroke();
      fill('white');
      textSize(14);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text('\u2717', indicatorX - 45, indicatorY);
      fill('#C62828');
      textSize(14);
      textAlign(LEFT, CENTER);
      text('FALSE', indicatorX - 30, indicatorY);
    } else {
      fill('#9E9E9E');
      stroke('#757575');
      strokeWeight(2);
      circle(indicatorX - 45, indicatorY, 24);
      noStroke();
      fill('white');
      textSize(14);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text('?', indicatorX - 45, indicatorY);
      fill('#757575');
      textSize(14);
      textAlign(LEFT, CENTER);
      text('UNKNOWN', indicatorX - 30, indicatorY);
    }
    textStyle(NORMAL);
  }
}

// ---- Draw connection lines between equivalent pairs ----
function drawConnections(x1, y1, x2, y2, boxW, boxH) {
  // Original (top-left) <-> Contrapositive (bottom-right): EQUIVALENT
  let origCenterX = x1 + boxW / 2;
  let origBottomY = y1 + boxH;
  let contraCenterX = x2 + boxW / 2;
  let contraTopY = y2;

  // Draw thick green line from bottom of original to top of contrapositive
  stroke('#4CAF50');
  strokeWeight(4);
  // Diagonal line
  let startX = x1 + boxW;
  let startY = y1 + boxH / 2;
  let endX = x2;
  let endY = y2 + boxH / 2;
  line(startX, startY, endX, endY);

  // Label
  noStroke();
  fill('#2E7D32');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // Midpoint of diagonal
  let midX = (startX + endX) / 2;
  let midY = (startY + endY) / 2;
  // Background for label
  fill(255, 255, 255, 220);
  stroke('#4CAF50');
  strokeWeight(1);
  rectMode(CENTER);
  rect(midX, midY, 100, 22, 5);
  rectMode(CORNER);
  noStroke();
  fill('#2E7D32');
  text('EQUIVALENT', midX, midY);
  textStyle(NORMAL);

  // Converse (top-right) <-> Inverse (bottom-left): equivalent to each other
  startX = x2;
  startY = y1 + boxH / 2;
  endX = x1 + boxW;
  endY = y2 + boxH / 2;

  stroke('#9E9E9E');
  strokeWeight(2);
  line(startX, startY, endX, endY);

  // Label
  noStroke();
  midX = (startX + endX) / 2;
  midY = (startY + endY) / 2;
  fill(255, 255, 255, 220);
  stroke('#9E9E9E');
  strokeWeight(1);
  rectMode(CENTER);
  rect(midX, midY, 130, 22, 5);
  rectMode(CORNER);
  noStroke();
  fill('#757575');
  textSize(11);
  text('equivalent to each other', midX, midY);
}

// ---- Hint box at bottom of draw area ----
function drawHintBox() {
  let boxW = 360;
  let boxH = 34;
  let boxX = canvasWidth / 2 - boxW / 2;
  let boxY = drawHeight - 44;

  fill(255, 255, 255, 230);
  stroke('#4CAF50');
  strokeWeight(1.5);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  fill('#2E7D32');
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('The contrapositive is ALWAYS equivalent to the original!', canvasWidth / 2, boxY + boxH / 2);
  textStyle(NORMAL);
}

// ---- Draw canvas-based controls ----
function drawControls() {
  let btnH = 32;
  let y = drawHeight + 12;

  // Row 1: Prev | Next | Random
  let prevW = 70;
  let nextW = 70;
  let randomW = 130;
  let prevX = margin;
  let nextX = prevX + prevW + 10;
  let randomX = nextX + nextW + 10;

  prevBtn = { x: prevX, y: y, w: prevW, h: btnH };
  nextBtn = { x: nextX, y: y, w: nextW, h: btnH };
  randomBtn = { x: randomX, y: y, w: randomW, h: btnH };

  drawButton(prevBtn, '\u25C0 Prev', '#1565C0', '#BBDEFB');
  drawButton(nextBtn, 'Next \u25B6', '#1565C0', '#BBDEFB');
  drawButton(randomBtn, 'New Random', '#E65100', '#FFE0B2');

  // Row 1 right: toggles
  let toggleW = 160;
  let connX = canvasWidth - margin - toggleW;
  let truthX = connX - toggleW - 10;

  connToggle = { x: connX, y: y, w: toggleW, h: btnH };
  truthToggle = { x: truthX, y: y, w: toggleW, h: btnH };

  drawToggle(connToggle, 'Show Connections', showConnections);
  drawToggle(truthToggle, 'Show Truth Values', showTruthValues);

  // Row 2: instruction text
  noStroke();
  fill('#666');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Click Prev/Next to cycle through statements, or click New Random for a random example', canvasWidth / 2, drawHeight + 55);

  // Legend
  if (showTruthValues) {
    let legY = drawHeight + 72;
    textSize(11);
    textAlign(LEFT, TOP);
    fill('#2E7D32');
    text('\u25CF TRUE', margin, legY);
    fill('#C62828');
    text('\u25CF FALSE', margin + 70, legY);
    fill('#757575');
    textSize(11);
    text('Original & Contrapositive always share the same truth value', margin + 150, legY);
  }
}

// ---- Draw a canvas-based button ----
function drawButton(btn, label, textColor, bgColor) {
  // Hover detection
  let hover = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
              mouseY >= btn.y && mouseY <= btn.y + btn.h;

  fill(hover ? lerpColor(color(bgColor), color('#FFFFFF'), 0.3) : bgColor);
  stroke(textColor);
  strokeWeight(1.5);
  rect(btn.x, btn.y, btn.w, btn.h, 6);

  noStroke();
  fill(textColor);
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  textStyle(NORMAL);
}

// ---- Draw a canvas-based toggle ----
function drawToggle(btn, label, isOn) {
  let hover = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
              mouseY >= btn.y && mouseY <= btn.y + btn.h;

  if (isOn) {
    fill(hover ? '#C8E6C9' : '#E8F5E9');
    stroke('#4CAF50');
  } else {
    fill(hover ? '#EEEEEE' : '#F5F5F5');
    stroke('#BDBDBD');
  }
  strokeWeight(1.5);
  rect(btn.x, btn.y, btn.w, btn.h, 6);

  // Checkbox indicator
  let cbX = btn.x + 10;
  let cbY = btn.y + btn.h / 2 - 7;
  let cbSize = 14;
  fill(isOn ? '#4CAF50' : 'white');
  stroke(isOn ? '#2E7D32' : '#9E9E9E');
  strokeWeight(1.5);
  rect(cbX, cbY, cbSize, cbSize, 3);

  if (isOn) {
    noStroke();
    fill('white');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('\u2713', cbX + cbSize / 2, cbY + cbSize / 2);
  }

  noStroke();
  fill('#333');
  textSize(12);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  text(label, cbX + cbSize + 8, btn.y + btn.h / 2);
}

// ---- Handle mouse clicks on canvas buttons ----
function mousePressed() {
  if (hitTest(prevBtn)) {
    currentIndex = (currentIndex - 1 + statements.length) % statements.length;
  } else if (hitTest(nextBtn)) {
    currentIndex = (currentIndex + 1) % statements.length;
  } else if (hitTest(randomBtn)) {
    let newIdx;
    do {
      newIdx = floor(random(statements.length));
    } while (newIdx === currentIndex && statements.length > 1);
    currentIndex = newIdx;
  } else if (hitTest(connToggle)) {
    showConnections = !showConnections;
  } else if (hitTest(truthToggle)) {
    showTruthValues = !showTruthValues;
  }
}

function hitTest(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

// ---- Negate a hypothesis/conclusion phrase ----
function negate(phrase) {
  // Handle common patterns
  let p = phrase.trim();

  // "a triangle is equilateral" -> "a triangle is not equilateral"
  // "all sides are equal" -> "not all sides are equal"
  // "it has four right angles" -> "it does not have four right angles"
  // "they never intersect" -> "they intersect"
  // "it is a right angle" -> "it is not a right angle"
  // "it is a square" -> "it is not a square"
  // "they are congruent" -> "they are not congruent"
  // "it is isosceles" -> "it is not isosceles"
  // "opposite sides are parallel" -> "opposite sides are not parallel"
  // "it measures less than 90" -> "it does not measure less than 90"
  // "it is a triangle" -> "it is not a triangle"

  // Special case: "they never intersect" -> "they can intersect"
  if (p.includes('never intersect')) {
    return p.replace('never intersect', 'can intersect');
  }

  // "all sides are equal" -> "not all sides are equal"
  if (p.startsWith('all ')) {
    return 'not ' + p;
  }

  // "opposite sides are parallel" -> "opposite sides are not parallel"
  // Pattern: "X are Y" -> "X are not Y"
  if (p.match(/^[a-z].*\bare\b/)) {
    return p.replace(/\bare\b/, 'are not');
  }

  // "it has four right angles" -> "it does not have four right angles"
  if (p.includes(' has ')) {
    return p.replace(' has ', ' does not have ');
  }

  // "it measures less than 90" -> "it does not measure less than 90"
  if (p.includes(' measures ')) {
    return p.replace(' measures ', ' does not measure ');
  }

  // "it is X" -> "it is not X"
  if (p.includes(' is ')) {
    return p.replace(' is ', ' is not ');
  }

  // Fallback: prepend "not"
  return 'not ' + p;
}

// ---- Word wrap helper ----
function drawWrappedText(txt, x, y, maxWidth, lineH) {
  let words = txt.split(' ');
  let currentLine = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    let testLine = currentLine + (currentLine.length > 0 ? ' ' : '') + words[i];
    let tw = textWidth(testLine);

    if (tw > maxWidth && currentLine.length > 0) {
      text(currentLine, x, currentY);
      currentLine = words[i];
      currentY += lineH;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.length > 0) {
    text(currentLine, x, currentY);
  }
}

// ---- Responsive resizing ----
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 600);
  }
}
