// Rotation Around Origin
// Shows rotations at different angles (90°, 180°, 270°, 45°)

let canvasWidth = 800;
let drawHeight = 450;
let canvasHeight = drawHeight;

let selectedAngle = 0;
let animProgress = 1;
let isAnimating = false;

let rotations = [
  { angle: 90, label: "R₉₀°: 90° counterclockwise", quadrant: "Q1 → Q2" },
  { angle: 180, label: "R₁₈₀°: 180° rotation", quadrant: "Q1 → Q3" },
  { angle: 270, label: "R₂₇₀°: 270° counterclockwise", quadrant: "Q1 → Q4" },
  { angle: 45, label: "R₄₅°: 45° rotation", quadrant: "Tilted" }
];

// Triangle in Q1
let triangle = [
  [2, 1],
  [4, 1],
  [3, 3]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Diagram showing rotations at different angles around the origin', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#E65100');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Rotations: Turning Figures Around a Point", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click an angle to animate the rotation', canvasWidth / 2, 35);

  // Update animation
  if (isAnimating) {
    animProgress += 0.02;
    if (animProgress >= 1) {
      animProgress = 1;
      isAnimating = false;
    }
  }

  drawAngleButtons();
  drawRotation(rotations[selectedAngle]);
}

function drawAngleButtons() {
  let buttonWidth = 80;
  let buttonHeight = 28;
  let startX = canvasWidth / 2 - (rotations.length * (buttonWidth + 8)) / 2;
  let y = 55;

  for (let i = 0; i < rotations.length; i++) {
    let x = startX + i * (buttonWidth + 8);

    if (i === selectedAngle) {
      fill('#E65100');
    } else {
      fill('#FFE0B2');
    }
    noStroke();
    rect(x, y, buttonWidth, buttonHeight, 5);

    fill(i === selectedAngle ? 'white' : '#E65100');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(rotations[i].angle + '°', x + buttonWidth / 2, y + buttonHeight / 2);
  }
}

function drawRotation(rot) {
  let gridSize = min(canvasWidth - 100, 300);
  let cellSize = gridSize / 10;
  let centerX = canvasWidth / 2;
  let centerY = 270;

  // Draw grid
  stroke('#FFF3E0');
  strokeWeight(1);
  for (let i = -5; i <= 5; i++) {
    let x = centerX + i * cellSize;
    let y = centerY + i * cellSize;
    line(x, centerY - 5 * cellSize, x, centerY + 5 * cellSize);
    line(centerX - 5 * cellSize, y, centerX + 5 * cellSize, y);
  }

  // Draw axes
  stroke('#424242');
  strokeWeight(2);
  line(centerX - 5 * cellSize, centerY, centerX + 5 * cellSize, centerY);
  line(centerX, centerY - 5 * cellSize, centerX, centerY + 5 * cellSize);

  // Origin (center of rotation)
  fill('#E53935');
  noStroke();
  ellipse(centerX, centerY, 12, 12);

  // Axis labels
  fill('#424242');
  textSize(10);
  textAlign(CENTER, TOP);
  text('x', centerX + 5 * cellSize - 5, centerY + 5);
  textAlign(LEFT, CENTER);
  text('y', centerX + 5, centerY - 5 * cellSize + 5);

  // Draw pre-image (blue)
  let preVerts = triangle.map(p => [
    centerX + p[0] * cellSize,
    centerY - p[1] * cellSize
  ]);

  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);
  beginShape();
  for (let v of preVerts) {
    vertex(v[0], v[1]);
  }
  endShape(CLOSE);

  // Calculate rotated positions
  let currentAngle = rot.angle * animProgress * PI / 180;
  let imageVerts = triangle.map(p => {
    let rx = p[0] * cos(currentAngle) - p[1] * sin(currentAngle);
    let ry = p[0] * sin(currentAngle) + p[1] * cos(currentAngle);
    return [centerX + rx * cellSize, centerY - ry * cellSize];
  });

  // Draw rotation arc
  if (animProgress > 0.1) {
    stroke('#9C27B0');
    strokeWeight(2);
    noFill();

    // Arc from first vertex
    let v = triangle[0];
    let radius = sqrt(v[0] * v[0] + v[1] * v[1]) * cellSize;
    let startAngle = -atan2(v[1], v[0]);
    let endAngle = startAngle - currentAngle;

    arc(centerX, centerY, radius * 2, radius * 2, endAngle, startAngle);

    // Rotation arrow at end of arc
    let arrowAngle = endAngle;
    let arrowX = centerX + radius * cos(arrowAngle);
    let arrowY = centerY + radius * sin(arrowAngle);

    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle - PI / 2);
    fill('#9C27B0');
    noStroke();
    triangle(0, 0, 8, -4, 8, 4);
    pop();
  }

  // Draw radial lines from center to vertices
  stroke('#9E9E9E');
  strokeWeight(1);
  setLineDash([4, 3]);
  for (let i = 0; i < triangle.length; i++) {
    line(centerX, centerY, preVerts[i][0], preVerts[i][1]);
    if (animProgress >= 1) {
      line(centerX, centerY, imageVerts[i][0], imageVerts[i][1]);
    }
  }
  setLineDash([]);

  // Draw image (green)
  if (animProgress < 1) {
    fill(76, 175, 80, 180);
    stroke(46, 125, 50, 180);
  } else {
    fill('#4CAF50');
    stroke('#2E7D32');
  }
  strokeWeight(2);
  beginShape();
  for (let v of imageVerts) {
    vertex(v[0], v[1]);
  }
  endShape(CLOSE);

  // Vertex labels
  noStroke();
  fill('#0D47A1');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('A', preVerts[0][0] - 10, preVerts[0][1] + 10);
  text('B', preVerts[1][0] + 10, preVerts[1][1] + 10);
  text('C', preVerts[2][0], preVerts[2][1] - 12);

  if (animProgress >= 1) {
    fill('#2E7D32');
    text("A'", imageVerts[0][0] + 12, imageVerts[0][1]);
    text("B'", imageVerts[1][0] + 12, imageVerts[1][1]);
    text("C'", imageVerts[2][0], imageVerts[2][1] - 12);
  }
  textStyle(NORMAL);

  // Labels
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(rot.label, canvasWidth / 2, drawHeight - 50);
  textStyle(NORMAL);

  // Show coordinate rule for common rotations
  fill('#757575');
  textSize(12);
  let rule = '';
  if (rot.angle === 90) {
    rule = '(x, y) → (-y, x)';
  } else if (rot.angle === 180) {
    rule = '(x, y) → (-x, -y)';
  } else if (rot.angle === 270) {
    rule = '(x, y) → (y, -x)';
  } else if (rot.angle === 45) {
    rule = 'Use rotation matrix for non-standard angles';
  }
  text(rule, canvasWidth / 2, drawHeight - 30);

  // Center label
  fill('#E53935');
  textSize(10);
  textAlign(LEFT, TOP);
  text('Center of\nRotation', centerX + 10, centerY + 5);
}

function mousePressed() {
  // Check button clicks
  let buttonWidth = 80;
  let buttonHeight = 28;
  let startX = canvasWidth / 2 - (rotations.length * (buttonWidth + 8)) / 2;
  let y = 55;

  for (let i = 0; i < rotations.length; i++) {
    let x = startX + i * (buttonWidth + 8);
    if (mouseX >= x && mouseX <= x + buttonWidth &&
        mouseY >= y && mouseY <= y + buttonHeight) {
      selectedAngle = i;
      animProgress = 0;
      isAnimating = true;
      return;
    }
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 400);
  }
}
