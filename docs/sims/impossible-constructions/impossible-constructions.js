// The Three Impossible Constructions
// Interactive infographic about classical impossible problems

let canvasWidth = 900;
let drawHeight = 600;
let canvasHeight = drawHeight;

let selectedProblem = -1;

let problems = [
  {
    name: 'Squaring the Circle',
    icon: '◯→□',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    challenge: 'Construct a square with the same area as a given circle',
    why: 'Requires constructing √π, but π is transcendental (not algebraic)',
    history: 'Proved impossible by Lindemann in 1882',
    funFact: 'Ancient Egyptians approximated this with (8/9 × diameter)²',
    attempts: '~4,000 years of attempts by mathematicians'
  },
  {
    name: 'Doubling the Cube',
    icon: '∛2',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    challenge: 'Construct a cube with exactly twice the volume of a given cube',
    why: 'Requires constructing ∛2, which is not a constructible number',
    history: 'Proved impossible by Wantzel in 1837',
    funFact: 'Legend: Delos oracle demanded doubling Apollo\'s cubic altar to stop a plague',
    attempts: 'Also called the "Delian problem"'
  },
  {
    name: 'Trisecting an Angle',
    icon: '∠÷3',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    challenge: 'Divide any arbitrary angle into three equal parts',
    why: 'Some angles (like 60°) require solving a cubic equation',
    history: 'Proved impossible by Wantzel in 1837',
    funFact: 'You CAN trisect certain special angles, just not every angle',
    attempts: 'Amateur "solutions" are still submitted today!'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Infographic showing the three impossible compass and straightedge constructions', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#C62828');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('The Three Impossible Constructions', canvasWidth / 2, 12);
  textStyle(NORMAL);

  fill('#757575');
  textSize(13);
  text('Classical problems that cannot be solved with compass and straightedge alone', canvasWidth / 2, 42);

  // Checkered warning band
  drawWarningBand(68);

  if (selectedProblem >= 0) {
    drawExpandedView();
  } else {
    drawGrid();
  }

  // Bottom note
  fill('#757575');
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('These were proven mathematically impossible, not just "too hard" — different tools CAN solve them!', canvasWidth / 2, drawHeight - 5);
}

function drawWarningBand(y) {
  let stripeW = 20;
  for (let x = 0; x < canvasWidth; x += stripeW * 2) {
    fill('#FFC107');
    noStroke();
    beginShape();
    vertex(x, y);
    vertex(x + stripeW, y);
    vertex(x + stripeW * 2, y + 12);
    vertex(x + stripeW, y + 12);
    endShape(CLOSE);

    fill('#212121');
    beginShape();
    vertex(x + stripeW, y);
    vertex(x + stripeW * 2, y);
    vertex(x + stripeW * 3, y + 12);
    vertex(x + stripeW * 2, y + 12);
    endShape(CLOSE);
  }
}

function drawGrid() {
  let cardW = (canvasWidth - 80) / 3;
  let cardH = 380;
  let startY = 95;
  let gap = 20;

  for (let i = 0; i < 3; i++) {
    let cx = 30 + i * (cardW + gap);
    drawCard(i, cx, startY, cardW, cardH);
  }
}

function drawCard(index, x, y, w, h) {
  let p = problems[index];
  let isHovered = (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h);

  // Card shadow and background
  if (isHovered) {
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = p.color;
  }

  fill(p.bgColor);
  stroke(p.color);
  strokeWeight(isHovered ? 4 : 2);
  rect(x, y, w, h, 12);
  drawingContext.shadowBlur = 0;

  // "IMPOSSIBLE" badge
  fill('#C62828');
  noStroke();
  rect(x + w / 2 - 50, y + 10, 100, 22, 11);
  fill(255);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('IMPOSSIBLE', x + w / 2, y + 21);
  textStyle(NORMAL);

  // Icon
  fill(p.color);
  textSize(36);
  textAlign(CENTER, TOP);
  text(p.icon, x + w / 2, y + 45);

  // Name
  fill(p.color);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(p.name, x + w / 2, y + 100);
  textStyle(NORMAL);

  // Challenge description
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);
  textWrap(WORD);
  text(p.challenge, x + 15, y + 130, w - 30);

  // Mini illustration
  drawMiniIllustration(index, x + w / 2, y + 220, 60);

  // History line
  fill('#757575');
  textSize(9);
  textAlign(CENTER, TOP);
  text(p.history, x + w / 2, y + 300);

  // Click prompt
  if (isHovered) {
    fill(p.color);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('Click to learn more →', x + w / 2, y + h - 15);
    textStyle(NORMAL);
  }
}

function drawMiniIllustration(index, cx, cy, size) {
  push();
  translate(cx, cy);

  if (index === 0) {
    // Squaring the circle
    noFill();
    stroke('#1565C0');
    strokeWeight(2);
    ellipse(-size / 3, 0, size, size);

    fill('#1565C0');
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text('→', 0, 0);

    stroke('#1565C0');
    strokeWeight(2);
    noFill();
    rect(size / 3 - size / 2, -size / 2, size, size);

    fill('#C62828');
    textSize(24);
    text('?', size / 3, 0);
  } else if (index === 1) {
    // Doubling the cube
    stroke('#2E7D32');
    strokeWeight(2);
    noFill();

    // Small cube
    let s1 = size * 0.3;
    rect(-size / 2, -s1, s1, s1);
    line(-size / 2 + s1, -s1, -size / 2 + s1 + 8, -s1 - 8);
    line(-size / 2, -s1, -size / 2 + 8, -s1 - 8);
    line(-size / 2 + 8, -s1 - 8, -size / 2 + s1 + 8, -s1 - 8);

    fill('#2E7D32');
    noStroke();
    textSize(20);
    text('→', 0, 0);

    // Larger cube
    stroke('#2E7D32');
    strokeWeight(2);
    noFill();
    let s2 = size * 0.4;
    rect(size / 4, -s2, s2, s2);
    line(size / 4 + s2, -s2, size / 4 + s2 + 10, -s2 - 10);
    line(size / 4, -s2, size / 4 + 10, -s2 - 10);
    line(size / 4 + 10, -s2 - 10, size / 4 + s2 + 10, -s2 - 10);

    fill('#C62828');
    noStroke();
    textSize(16);
    text('2×?', size / 4 + s2 / 2, 20);
  } else if (index === 2) {
    // Trisecting an angle
    stroke('#7B1FA2');
    strokeWeight(2);

    // Angle
    line(-size / 2, 0, size / 2, 0);
    line(-size / 2, 0, size / 3, -size * 0.8);

    // Arc
    noFill();
    arc(-size / 2, 0, size, size, -PI / 3, 0);

    // Question marks for trisection
    fill('#C62828');
    noStroke();
    textSize(14);
    text('÷3?', 10, -20);
  }

  pop();
}

function drawExpandedView() {
  let p = problems[selectedProblem];

  // Back button
  fill('#ECEFF1');
  noStroke();
  rect(0, 82, canvasWidth, 35);

  fill('#1565C0');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text('← Back to all problems', 30, 100);
  textStyle(NORMAL);

  // Main panel
  let panelY = 130;
  let panelH = 440;

  fill(p.bgColor);
  stroke(p.color);
  strokeWeight(3);
  rect(20, panelY, canvasWidth - 40, panelH, 12);

  // Badge
  fill('#C62828');
  noStroke();
  rect(50, panelY + 15, 120, 28, 14);
  fill(255);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('IMPOSSIBLE', 110, panelY + 29);
  textStyle(NORMAL);

  // Title
  fill(p.color);
  textSize(26);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(p.name, 50, panelY + 55);
  textStyle(NORMAL);

  // Icon
  textSize(50);
  textAlign(RIGHT, TOP);
  text(p.icon, canvasWidth - 70, panelY + 30);

  // Challenge
  fill('#212121');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('The Challenge:', 50, panelY + 100);
  textStyle(NORMAL);

  fill('#424242');
  textSize(13);
  text(p.challenge, 50, panelY + 125);

  // Why impossible
  fill('#C62828');
  textSize(14);
  textStyle(BOLD);
  text('Why It\'s Impossible:', 50, panelY + 165);
  textStyle(NORMAL);

  fill('#424242');
  textSize(13);
  text(p.why, 50, panelY + 190);

  // History
  fill(p.color);
  textSize(14);
  textStyle(BOLD);
  text('History:', 50, panelY + 230);
  textStyle(NORMAL);

  fill('#424242');
  textSize(13);
  text(p.history, 50, panelY + 255);
  text(p.attempts, 50, panelY + 280);

  // Fun fact box
  fill('#FFF9C4');
  stroke('#FBC02D');
  strokeWeight(2);
  rect(50, panelY + 320, canvasWidth - 140, 60, 8);

  noStroke();
  fill('#F57F17');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('💡 Fun Fact:', 70, panelY + 335);
  textStyle(NORMAL);

  fill('#424242');
  textSize(12);
  text(p.funFact, 70, panelY + 355);

  // Mathematical note
  fill('#757575');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Note: These ARE solvable using other tools (marked ruler, origami, or curves like the quadratrix)', canvasWidth / 2, panelY + panelH - 30);
}

function mousePressed() {
  if (selectedProblem >= 0) {
    // Check back button
    if (mouseY > 82 && mouseY < 117) {
      selectedProblem = -1;
      return;
    }
  } else {
    // Check card clicks
    let cardW = (canvasWidth - 80) / 3;
    let cardH = 380;
    let startY = 95;
    let gap = 20;

    for (let i = 0; i < 3; i++) {
      let cx = 30 + i * (cardW + gap);
      if (mouseX > cx && mouseX < cx + cardW && mouseY > startY && mouseY < startY + cardH) {
        selectedProblem = i;
        return;
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
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 750);
  }
}
