// Conditional Statement Transformer
// Generate converse, inverse, and contrapositive from any conditional

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Statements database
let statements = [
  { p: "a triangle is equilateral", q: "all sides are equal", oT: true, cT: true, iT: true, cpT: true },
  { p: "a quadrilateral is a square", q: "it has four right angles", oT: true, cT: false, iT: false, cpT: true },
  { p: "two lines are parallel", q: "they never intersect", oT: true, cT: true, iT: true, cpT: true },
  { p: "an angle measures 90°", q: "it is a right angle", oT: true, cT: true, iT: true, cpT: true },
  { p: "a figure has four sides", q: "it is a square", oT: false, cT: true, iT: true, cpT: false },
  { p: "two angles are vertical", q: "they are congruent", oT: true, cT: false, iT: false, cpT: true },
  { p: "a triangle has two equal sides", q: "it is isosceles", oT: true, cT: true, iT: true, cpT: true },
  { p: "a shape is a rectangle", q: "opposite sides are parallel", oT: true, cT: false, iT: false, cpT: true },
  { p: "an angle is acute", q: "it measures less than 90°", oT: true, cT: true, iT: true, cpT: true },
  { p: "a polygon has three sides", q: "it is a triangle", oT: true, cT: true, iT: true, cpT: true }
];

let currentStatement = 0;
let statementSelect;
let showConnections = true;
let connectionCheckbox;
let hoveredBox = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create statement selector
  statementSelect = createSelect();
  statementSelect.position(120, drawHeight + 15);
  for (let i = 0; i < statements.length; i++) {
    let label = `If ${statements[i].p}...`;
    if (label.length > 40) label = label.substring(0, 40) + '...';
    statementSelect.option(label, i);
  }
  statementSelect.changed(() => {
    currentStatement = parseInt(statementSelect.value());
  });

  // Create connection checkbox
  connectionCheckbox = createCheckbox('Show connections', true);
  connectionCheckbox.position(canvasWidth - 180, drawHeight + 20);
  connectionCheckbox.changed(() => {
    showConnections = connectionCheckbox.checked();
  });

  describe('Interactive tool to generate converse, inverse, and contrapositive from conditional statements', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
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
  text('Conditional Statement Transformer', canvasWidth / 2, 12);
  textStyle(NORMAL);

  let st = statements[currentStatement];

  // Check hover
  hoveredBox = getHoveredBox();

  // Draw connections first
  if (showConnections) {
    drawConnections();
  }

  // Draw the four boxes
  let boxW = 360;
  let boxH = 180;
  let gap = 20;
  let startX = (canvasWidth - 2 * boxW - gap) / 2;
  let startY = 50;

  // Original (top-left)
  drawStatementBox(startX, startY, boxW, boxH, 'ORIGINAL', '#BBDEFB', '#2196F3',
    'If p, then q', 'p → q',
    `If ${st.p}, then ${st.q}`,
    st.oT, 0);

  // Converse (top-right)
  drawStatementBox(startX + boxW + gap, startY, boxW, boxH, 'CONVERSE', '#E1BEE7', '#9C27B0',
    'If q, then p', 'q → p',
    `If ${st.q}, then ${st.p}`,
    st.cT, 1);

  // Inverse (bottom-left)
  drawStatementBox(startX, startY + boxH + gap, boxW, boxH, 'INVERSE', '#FFE0B2', '#FF9800',
    'If not p, then not q', '~p → ~q',
    `If NOT ${st.p}, then NOT ${st.q}`,
    st.iT, 2);

  // Contrapositive (bottom-right)
  drawStatementBox(startX + boxW + gap, startY + boxH + gap, boxW, boxH, 'CONTRAPOSITIVE', '#C8E6C9', '#4CAF50',
    'If not q, then not p', '~q → ~p',
    `If NOT ${st.q}, then NOT ${st.p}`,
    st.cpT, 3);

  // Draw hint
  fill('#2E7D32');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('The contrapositive is ALWAYS equivalent to the original!', canvasWidth / 2, drawHeight - 8);
  textStyle(NORMAL);

  // Control labels
  fill('#424242');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Select statement:', 20, drawHeight + 30);
}

function drawStatementBox(x, y, w, h, title, bgColor, borderColor, formula, notation, statement, isTrue, boxIndex) {
  let isHovered = (hoveredBox === boxIndex);
  let isEquivalent = false;

  // Check if should highlight as equivalent
  if ((hoveredBox === 0 && boxIndex === 3) || (hoveredBox === 3 && boxIndex === 0)) isEquivalent = true;
  if ((hoveredBox === 1 && boxIndex === 2) || (hoveredBox === 2 && boxIndex === 1)) isEquivalent = true;

  // Background
  if (isEquivalent) {
    fill('#FFEB3B');
  } else {
    fill(bgColor);
  }
  stroke(borderColor);
  strokeWeight(isHovered ? 4 : 2);
  rect(x, y, w, h, 10);

  // Title
  noStroke();
  fill(borderColor);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(title, x + w / 2, y + 10);

  // Formula and notation
  fill('#424242');
  textSize(13);
  textStyle(NORMAL);
  text(formula + '  (' + notation + ')', x + w / 2, y + 32);

  // Statement with word wrap
  fill('#263238');
  textSize(12);
  textAlign(LEFT, TOP);
  let wrapped = wrapText('"' + statement + '"', w - 30);
  let lineY = y + 55;
  for (let line of wrapped) {
    text(line, x + 15, lineY);
    lineY += 16;
  }

  // Truth badge
  let badgeY = y + h - 35;
  if (isTrue) {
    fill('#C8E6C9');
    stroke('#4CAF50');
  } else {
    fill('#FFCDD2');
    stroke('#F44336');
  }
  strokeWeight(2);
  rect(x + w / 2 - 45, badgeY, 90, 26, 5);

  noStroke();
  fill(isTrue ? '#2E7D32' : '#C62828');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(isTrue ? '✓ TRUE' : '✗ FALSE', x + w / 2, badgeY + 13);
  textStyle(NORMAL);
}

function drawConnections() {
  let boxW = 360;
  let boxH = 180;
  let gap = 20;
  let startX = (canvasWidth - 2 * boxW - gap) / 2;
  let startY = 50;

  // Original ↔ Contrapositive (green, thick)
  let highlight03 = (hoveredBox === 0 || hoveredBox === 3);
  stroke(highlight03 ? '#4CAF50' : '#81C784');
  strokeWeight(highlight03 ? 4 : 2);
  noFill();

  // Diagonal curved line
  let x1 = startX + boxW;
  let y1 = startY + boxH;
  let x2 = startX + boxW + gap;
  let y2 = startY + boxH + gap;

  beginShape();
  vertex(x1 - 30, y1 - 10);
  quadraticVertex(canvasWidth / 2, startY + boxH + gap / 2 + 20, x2 + 30, y2 + 10);
  endShape();

  if (highlight03) {
    fill('#2E7D32');
    noStroke();
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('EQUIVALENT', canvasWidth / 2, startY + boxH + gap / 2 + 5);
    textStyle(NORMAL);
  }

  // Converse ↔ Inverse (gray, thin)
  let highlight12 = (hoveredBox === 1 || hoveredBox === 2);
  stroke(highlight12 ? '#757575' : '#BDBDBD');
  strokeWeight(highlight12 ? 3 : 1);
  noFill();

  x1 = startX + boxW + gap;
  y1 = startY + boxH;
  x2 = startX + boxW;
  y2 = startY + boxH + gap;

  beginShape();
  vertex(x1 + 30, y1 - 10);
  quadraticVertex(canvasWidth / 2, startY + boxH + gap / 2 + 20, x2 - 30, y2 + 10);
  endShape();

  if (highlight12) {
    fill('#616161');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('equivalent', canvasWidth / 2, startY + boxH + gap / 2 + 5);
  }
}

function getHoveredBox() {
  let boxW = 360;
  let boxH = 180;
  let gap = 20;
  let startX = (canvasWidth - 2 * boxW - gap) / 2;
  let startY = 50;

  let boxes = [
    { x: startX, y: startY },
    { x: startX + boxW + gap, y: startY },
    { x: startX, y: startY + boxH + gap },
    { x: startX + boxW + gap, y: startY + boxH + gap }
  ];

  for (let i = 0; i < boxes.length; i++) {
    if (mouseX > boxes[i].x && mouseX < boxes[i].x + boxW &&
        mouseY > boxes[i].y && mouseY < boxes[i].y + boxH) {
      return i;
    }
  }
  return -1;
}

function wrapText(text, maxWidth) {
  let words = text.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) < maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  connectionCheckbox.position(canvasWidth - 180, drawHeight + 20);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 650);
  }
}
