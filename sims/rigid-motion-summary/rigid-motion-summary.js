// Rigid Motion Summary
// Compares the three rigid motions side-by-side

let canvasWidth = 800;
let drawHeight = 500;
let canvasHeight = drawHeight;

let selectedMotion = 0;
let animProgress = 1;
let isAnimating = false;

let motions = [
  {
    name: "Translation",
    subtitle: "(Slide)",
    color: '#1565C0',
    preserves: ["✓ Distance", "✓ Angle", "✓ Orientation"],
    rule: "(x,y) → (x+h, y+k)"
  },
  {
    name: "Rotation",
    subtitle: "(Turn)",
    color: '#E65100',
    preserves: ["✓ Distance", "✓ Angle", "✓ Orientation"],
    rule: "90°: (x,y) → (-y,x)"
  },
  {
    name: "Reflection",
    subtitle: "(Flip)",
    color: '#2E7D32',
    preserves: ["✓ Distance", "✓ Angle", "✗ Orientation"],
    rule: "y-axis: (x,y) → (-x,y)"
  }
];

// Base triangle
let triangle = [
  [1, 0.5],
  [2.5, 0.5],
  [1.5, 2]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Comparison of three rigid motions: translation, rotation, and reflection', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Rigid Motions: Preserve Distance and Angle", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click a transformation type to animate', canvasWidth / 2, 35);

  // Update animation
  if (isAnimating) {
    animProgress += 0.025;
    if (animProgress >= 1) {
      animProgress = 1;
      isAnimating = false;
    }
  }

  drawMotionCards();
  drawDilationWarning();
}

function drawMotionCards() {
  let cardWidth = (canvasWidth - 80) / 3;
  let cardHeight = 350;
  let startX = 30;
  let cardY = 60;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (cardWidth + 10);
    let motion = motions[i];
    let isSelected = i === selectedMotion;

    // Card background
    if (isSelected) {
      fill('#E8F5E9');
      stroke(motion.color);
      strokeWeight(3);
    } else {
      fill('white');
      stroke('#E0E0E0');
      strokeWeight(1);
    }
    rect(x, cardY, cardWidth, cardHeight, 10);

    // Card header
    noStroke();
    fill(motion.color);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(motion.name, x + cardWidth / 2, cardY + 15);
    textStyle(NORMAL);
    fill('#757575');
    textSize(12);
    text(motion.subtitle, x + cardWidth / 2, cardY + 35);

    // Mini visualization area
    let vizY = cardY + 60;
    let vizHeight = 140;

    // Draw mini grid
    push();
    let gridX = x + cardWidth / 2;
    let gridY = vizY + vizHeight / 2;
    let cellSize = 20;

    stroke('#E0E0E0');
    strokeWeight(1);
    for (let j = -3; j <= 3; j++) {
      line(gridX + j * cellSize, vizY, gridX + j * cellSize, vizY + vizHeight);
      line(x + 10, gridY + j * cellSize, x + cardWidth - 10, gridY + j * cellSize);
    }

    // Axes
    stroke('#9E9E9E');
    strokeWeight(2);
    line(x + 10, gridY, x + cardWidth - 10, gridY);
    line(gridX, vizY, gridX, vizY + vizHeight);

    // Draw pre-image
    fill('#1565C0');
    stroke('#0D47A1');
    strokeWeight(1.5);

    beginShape();
    for (let v of triangle) {
      vertex(gridX + v[0] * cellSize, gridY - v[1] * cellSize);
    }
    endShape(CLOSE);

    // Draw transformed image
    let animK = isSelected ? animProgress : 1;
    let transformed;

    if (motion.name === "Translation") {
      transformed = triangle.map(v => [
        lerp(v[0], v[0] + 2, animK),
        lerp(v[1], v[1] + 1, animK)
      ]);
    } else if (motion.name === "Rotation") {
      let angle = lerp(0, PI / 2, animK);
      transformed = triangle.map(v => {
        let rx = v[0] * cos(angle) - v[1] * sin(angle);
        let ry = v[0] * sin(angle) + v[1] * cos(angle);
        return [rx, ry];
      });
    } else {
      // Reflection over y-axis
      transformed = triangle.map(v => [
        lerp(v[0], -v[0], animK),
        v[1]
      ]);
    }

    fill('#4CAF50');
    stroke('#2E7D32');
    strokeWeight(1.5);
    beginShape();
    for (let v of transformed) {
      vertex(gridX + v[0] * cellSize, gridY - v[1] * cellSize);
    }
    endShape(CLOSE);

    // Motion indicator
    stroke(motion.color);
    strokeWeight(2);
    noFill();
    if (motion.name === "Translation") {
      // Arrow
      let ax = gridX + 1.5 * cellSize;
      let ay = gridY - 1 * cellSize;
      line(ax, ay, ax + 1.5 * cellSize, ay - 0.8 * cellSize);
      // Arrow head
      push();
      translate(ax + 1.5 * cellSize, ay - 0.8 * cellSize);
      rotate(atan2(-0.8, 1.5));
      line(0, 0, -8, -4);
      line(0, 0, -8, 4);
      pop();
    } else if (motion.name === "Rotation") {
      // Curved arrow
      arc(gridX, gridY, 50, 50, -PI/2, 0);
      push();
      translate(gridX + 25, gridY);
      rotate(PI/4);
      line(0, 0, -6, -4);
      line(0, 0, -6, 4);
      pop();
    } else {
      // Mirror line
      stroke('#E53935');
      strokeWeight(3);
      line(gridX, vizY + 10, gridX, vizY + vizHeight - 10);
    }
    pop();

    // What's preserved section
    let preserveY = vizY + vizHeight + 15;
    textAlign(LEFT, TOP);
    textSize(11);
    fill('#424242');
    text("Preserved:", x + 15, preserveY);

    preserveY += 18;
    for (let p of motion.preserves) {
      if (p.startsWith('✓')) {
        fill('#2E7D32');
      } else {
        fill('#C62828');
      }
      text(p, x + 20, preserveY);
      preserveY += 16;
    }

    // Coordinate rule
    fill('#757575');
    textSize(10);
    textAlign(CENTER, TOP);
    text(motion.rule, x + cardWidth / 2, cardY + cardHeight - 30);
  }
}

function drawDilationWarning() {
  let y = drawHeight - 75;
  let boxW = canvasWidth - 60;
  let boxH = 60;
  let boxX = 30;

  fill('#FFEBEE');
  stroke('#E53935');
  strokeWeight(2);
  rect(boxX, y, boxW, boxH, 8);

  noStroke();
  fill('#C62828');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("⚠ Dilation is NOT a Rigid Motion", boxX + boxW / 2, y + 18);
  textStyle(NORMAL);
  textSize(12);
  fill('#424242');
  text("Dilations change size → Distances NOT preserved → NOT rigid!", boxX + boxW / 2, y + 42);
}

function mousePressed() {
  let cardWidth = (canvasWidth - 80) / 3;
  let startX = 30;
  let cardY = 60;
  let cardHeight = 350;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (cardWidth + 10);
    if (mouseX >= x && mouseX <= x + cardWidth &&
        mouseY >= cardY && mouseY <= cardY + cardHeight) {
      selectedMotion = i;
      animProgress = 0;
      isAnimating = true;
      return;
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
