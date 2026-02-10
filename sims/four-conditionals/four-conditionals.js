// Four Related Conditional Statements
// Interactive diagram showing Original, Converse, Inverse, and Contrapositive

let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

// Examples with their truth values
let examples = [
  {
    p: "it's a square",
    q: "it has 4 right angles",
    originalTrue: true,
    converseTrue: false,
    inverseTrue: false,
    contrapositiveTrue: true
  },
  {
    p: "a triangle is equilateral",
    q: "all its angles are 60°",
    originalTrue: true,
    converseTrue: true,
    inverseTrue: true,
    contrapositiveTrue: true
  },
  {
    p: "two lines are parallel",
    q: "they never intersect",
    originalTrue: true,
    converseTrue: true,
    inverseTrue: true,
    contrapositiveTrue: true
  },
  {
    p: "a shape has 4 sides",
    q: "it is a rectangle",
    originalTrue: false,
    converseTrue: true,
    inverseTrue: true,
    contrapositiveTrue: false
  },
  {
    p: "an angle is 90°",
    q: "it is a right angle",
    originalTrue: true,
    converseTrue: true,
    inverseTrue: true,
    contrapositiveTrue: true
  }
];

let currentExample = 0;
let hoveredBox = -1; // 0=original, 1=converse, 2=inverse, 3=contrapositive
let nextButton;

// Box positions
let boxes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  nextButton = createButton('Next Example');
  nextButton.position(canvasWidth / 2 - 50, drawHeight + 25);
  nextButton.mousePressed(() => {
    currentExample = (currentExample + 1) % examples.length;
  });

  calculateBoxPositions();

  describe('Interactive diagram showing four related conditional statements with hover effects', LABEL);
}

function calculateBoxPositions() {
  let boxWidth = 340;
  let boxHeight = 160;
  let gapX = 40;
  let gapY = 30;
  let startX = (canvasWidth - 2 * boxWidth - gapX) / 2;
  let startY = 70;

  boxes = [
    { x: startX, y: startY, w: boxWidth, h: boxHeight, label: 'ORIGINAL', color: '#BBDEFB', borderColor: '#1976D2' },
    { x: startX + boxWidth + gapX, y: startY, w: boxWidth, h: boxHeight, label: 'CONVERSE', color: '#E1BEE7', borderColor: '#7B1FA2' },
    { x: startX, y: startY + boxHeight + gapY, w: boxWidth, h: boxHeight, label: 'INVERSE', color: '#FFF9C4', borderColor: '#FBC02D' },
    { x: startX + boxWidth + gapX, y: startY + boxHeight + gapY, w: boxWidth, h: boxHeight, label: 'CONTRAPOSITIVE', color: '#C8E6C9', borderColor: '#43A047' }
  ];
}

function draw() {
  updateCanvasSize();
  calculateBoxPositions();

  // Background
  background('#FAFAFA');

  // Control area
  fill('#F5F5F5');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('The Four Related Conditional Statements', canvasWidth / 2, 15);
  textStyle(NORMAL);

  // Check hover
  hoveredBox = -1;
  for (let i = 0; i < boxes.length; i++) {
    if (mouseX > boxes[i].x && mouseX < boxes[i].x + boxes[i].w &&
        mouseY > boxes[i].y && mouseY < boxes[i].y + boxes[i].h) {
      hoveredBox = i;
    }
  }

  let ex = examples[currentExample];

  // Draw connecting arrows first (behind boxes)
  drawConnections();

  // Draw boxes
  drawStatementBox(0, 'If p, then q', 'p → q', `If ${ex.p}, then ${ex.q}`, ex.originalTrue);
  drawStatementBox(1, 'If q, then p', 'q → p', `If ${ex.q}, then ${ex.p}`, ex.converseTrue);
  drawStatementBox(2, 'If not p, then not q', '~p → ~q', `If NOT ${ex.p}, then NOT ${ex.q}`, ex.inverseTrue);
  drawStatementBox(3, 'If not q, then not p', '~q → ~p', `If NOT ${ex.q}, then NOT ${ex.p}`, ex.contrapositiveTrue);

  // Draw legend
  drawLegend();

  // Draw example counter
  fill('#757575');
  textSize(14);
  textAlign(CENTER, CENTER);
  text(`Example ${currentExample + 1} of ${examples.length}`, canvasWidth / 2, drawHeight + 55);
}

function drawStatementBox(index, formula, notation, example, isTrue) {
  let box = boxes[index];
  let isHovered = (hoveredBox === index);
  let isEquivalent = false;

  // Highlight equivalents when hovering
  if (hoveredBox === 0 && index === 3) isEquivalent = true;
  if (hoveredBox === 3 && index === 0) isEquivalent = true;
  if (hoveredBox === 1 && index === 2) isEquivalent = true;
  if (hoveredBox === 2 && index === 1) isEquivalent = true;

  // Box background
  if (isHovered) {
    fill(lerpColor(color(box.color), color(255), 0.3));
  } else if (isEquivalent) {
    fill('#FFEB3B');
  } else {
    fill(box.color);
  }

  stroke(box.borderColor);
  strokeWeight(isHovered || isEquivalent ? 4 : 2);
  rect(box.x, box.y, box.w, box.h, 12);

  // Label
  noStroke();
  fill(box.borderColor);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(box.label, box.x + box.w / 2, box.y + 10);

  // Formula
  fill('#424242');
  textSize(16);
  textStyle(NORMAL);
  text(formula, box.x + box.w / 2, box.y + 35);

  // Notation
  fill('#757575');
  textSize(13);
  text('(' + notation + ')', box.x + box.w / 2, box.y + 55);

  // Example (wrap text if needed)
  fill('#263238');
  textSize(12);
  textAlign(CENTER, TOP);
  let exampleText = '"' + example + '"';

  // Simple word wrap
  let words = exampleText.split(' ');
  let lines = [];
  let currentLine = '';
  let maxWidth = box.w - 20;

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

  let lineY = box.y + 80;
  for (let line of lines) {
    text(line, box.x + box.w / 2, lineY);
    lineY += 15;
  }

  // Truth value badge
  let badgeY = box.y + box.h - 30;
  if (isTrue) {
    fill('#C8E6C9');
    stroke('#4CAF50');
  } else {
    fill('#FFCDD2');
    stroke('#F44336');
  }
  strokeWeight(2);
  rect(box.x + box.w / 2 - 40, badgeY, 80, 24, 5);

  noStroke();
  fill(isTrue ? '#2E7D32' : '#C62828');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(isTrue ? '✓ TRUE' : '✗ FALSE', box.x + box.w / 2, badgeY + 12);
  textStyle(NORMAL);

  // Equivalence note for contrapositive
  if (index === 3) {
    fill('#2E7D32');
    textSize(10);
    textStyle(ITALIC);
    textAlign(CENTER, BOTTOM);
    text('Always equivalent to original!', box.x + box.w / 2, box.y + box.h - 5);
    textStyle(NORMAL);
  }
}

function drawConnections() {
  // Equivalence arrow between Original (0) and Contrapositive (3)
  let highlight03 = (hoveredBox === 0 || hoveredBox === 3);
  stroke(highlight03 ? '#4CAF50' : '#81C784');
  strokeWeight(highlight03 ? 4 : 2);

  // Diagonal line
  let x1 = boxes[0].x + boxes[0].w;
  let y1 = boxes[0].y + boxes[0].h;
  let x2 = boxes[3].x;
  let y2 = boxes[3].y;

  // Draw curved arrow
  noFill();
  beginShape();
  vertex(x1 - 20, y1 - 20);
  quadraticVertex(canvasWidth / 2, (y1 + y2) / 2 + 30, x2 + 20, y2 + 20);
  endShape();

  // Label
  if (highlight03) {
    fill('#2E7D32');
    noStroke();
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('LOGICALLY EQUIVALENT', canvasWidth / 2, (boxes[0].y + boxes[0].h + boxes[3].y) / 2 + 15);
    textStyle(NORMAL);
  }

  // Equivalence arrow between Converse (1) and Inverse (2)
  let highlight12 = (hoveredBox === 1 || hoveredBox === 2);
  stroke(highlight12 ? '#9E9E9E' : '#BDBDBD');
  strokeWeight(highlight12 ? 3 : 1);

  x1 = boxes[1].x;
  y1 = boxes[1].y + boxes[1].h;
  x2 = boxes[2].x + boxes[2].w;
  y2 = boxes[2].y;

  noFill();
  beginShape();
  vertex(x1 + 20, y1 - 20);
  quadraticVertex(canvasWidth / 2, (y1 + y2) / 2 + 30, x2 - 20, y2 + 20);
  endShape();

  if (highlight12) {
    fill('#616161');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('Equivalent to each other', canvasWidth / 2, (boxes[1].y + boxes[1].h + boxes[2].y) / 2 + 15);
  }

  // Transformation labels on sides
  fill('#9E9E9E');
  textSize(10);
  textAlign(CENTER, CENTER);

  // Top: Switch p and q
  text('Switch p and q →', (boxes[0].x + boxes[0].w + boxes[1].x) / 2, boxes[0].y + boxes[0].h / 2);

  // Left: Negate both
  push();
  translate(boxes[0].x + boxes[0].w / 2, (boxes[0].y + boxes[0].h + boxes[2].y) / 2);
  text('↓ Negate both', 0, 0);
  pop();
}

function drawLegend() {
  let legendY = drawHeight - 45;
  let legendX = 30;

  fill('#424242');
  textSize(12);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text('Legend:', legendX, legendY);
  textStyle(NORMAL);

  // Green check
  fill('#4CAF50');
  text('✓', legendX + 60, legendY);
  fill('#424242');
  text('= True', legendX + 75, legendY);

  // Red X
  fill('#F44336');
  text('✗', legendX + 130, legendY);
  fill('#424242');
  text('= False', legendX + 145, legendY);

  // Hover instruction
  fill('#757575');
  textSize(11);
  textAlign(RIGHT, CENTER);
  text('Hover over boxes to see equivalences', canvasWidth - 30, legendY);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateBoxPositions();
  nextButton.position(canvasWidth / 2 - 50, drawHeight + 25);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    canvasWidth = max(canvasWidth, 600);
  }
}
