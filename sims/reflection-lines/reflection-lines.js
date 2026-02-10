// Reflections Over Different Lines
// Shows reflections over x-axis, y-axis, and y=x

let canvasWidth = 800;
let drawHeight = 420;
let canvasHeight = drawHeight;

let selectedLine = 0;
let animProgress = 1;
let isAnimating = false;

let reflectionLines = [
  {
    name: "x-axis",
    label: "Reflection over x-axis: (x, y) → (x, -y)",
    reflect: (x, y) => [x, -y]
  },
  {
    name: "y-axis",
    label: "Reflection over y-axis: (x, y) → (-x, y)",
    reflect: (x, y) => [-x, y]
  },
  {
    name: "y = x",
    label: "Reflection over y = x: (x, y) → (y, x)",
    reflect: (x, y) => [y, x]
  }
];

// Triangle above x-axis for x-axis reflection, will be adjusted for others
let baseTriangle = [
  [1, 2],
  [3, 2],
  [2, 4]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Diagram showing reflections over different lines', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#E3F2FD');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Reflections: Flipping Figures Over a Line", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click a line type to animate the reflection', canvasWidth / 2, 35);

  // Update animation
  if (isAnimating) {
    animProgress += 0.025;
    if (animProgress >= 1) {
      animProgress = 1;
      isAnimating = false;
    }
  }

  drawLineButtons();
  drawReflection(reflectionLines[selectedLine]);
}

function drawLineButtons() {
  let buttonWidth = 100;
  let buttonHeight = 28;
  let startX = canvasWidth / 2 - (reflectionLines.length * (buttonWidth + 10)) / 2;
  let y = 55;

  for (let i = 0; i < reflectionLines.length; i++) {
    let x = startX + i * (buttonWidth + 10);

    if (i === selectedLine) {
      fill('#1565C0');
    } else {
      fill('#90CAF9');
    }
    noStroke();
    rect(x, y, buttonWidth, buttonHeight, 5);

    fill(i === selectedLine ? 'white' : '#1565C0');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(reflectionLines[i].name, x + buttonWidth / 2, y + buttonHeight / 2);
  }
}

function drawReflection(refLine) {
  let gridSize = min(canvasWidth - 100, 280);
  let cellSize = gridSize / 12;
  let centerX = canvasWidth / 2;
  let centerY = 250;

  // Draw grid
  stroke('#BBDEFB');
  strokeWeight(1);
  for (let i = -6; i <= 6; i++) {
    let x = centerX + i * cellSize;
    let y = centerY + i * cellSize;
    line(x, centerY - 6 * cellSize, x, centerY + 6 * cellSize);
    line(centerX - 6 * cellSize, y, centerX + 6 * cellSize, y);
  }

  // Draw axes
  stroke('#424242');
  strokeWeight(2);
  line(centerX - 6 * cellSize, centerY, centerX + 6 * cellSize, centerY);
  line(centerX, centerY - 6 * cellSize, centerX, centerY + 6 * cellSize);

  // Draw line of reflection (bold red)
  stroke('#E53935');
  strokeWeight(4);
  if (refLine.name === "x-axis") {
    line(centerX - 6 * cellSize, centerY, centerX + 6 * cellSize, centerY);
  } else if (refLine.name === "y-axis") {
    line(centerX, centerY - 6 * cellSize, centerX, centerY + 6 * cellSize);
  } else if (refLine.name === "y = x") {
    line(centerX - 5 * cellSize, centerY + 5 * cellSize,
         centerX + 5 * cellSize, centerY - 5 * cellSize);
  }

  // Adjust triangle position based on reflection line
  let triangle;
  if (refLine.name === "x-axis") {
    triangle = [[1, 2], [3, 2], [2, 4]];
  } else if (refLine.name === "y-axis") {
    triangle = [[2, 1], [2, 3], [4, 2]];
  } else {
    triangle = [[1, 3], [1, 5], [3, 4]];
  }

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

  // Calculate reflected positions
  let reflectedTriangle = triangle.map(p => refLine.reflect(p[0], p[1]));

  // Interpolate for animation
  let animatedTriangle = triangle.map((p, i) => {
    let r = reflectedTriangle[i];
    return [
      lerp(p[0], r[0], animProgress),
      lerp(p[1], r[1], animProgress)
    ];
  });

  let imageVerts = animatedTriangle.map(p => [
    centerX + p[0] * cellSize,
    centerY - p[1] * cellSize
  ]);

  // Draw perpendicular lines
  if (animProgress >= 1) {
    stroke('#7B1FA2');
    strokeWeight(1);
    setLineDash([5, 3]);

    for (let i = 0; i < triangle.length; i++) {
      line(preVerts[i][0], preVerts[i][1], imageVerts[i][0], imageVerts[i][1]);

      // Draw perpendicular symbol at intersection
      let mx = (preVerts[i][0] + imageVerts[i][0]) / 2;
      let my = (preVerts[i][1] + imageVerts[i][1]) / 2;

      noFill();
      stroke('#7B1FA2');
      strokeWeight(1);
      setLineDash([]);

      push();
      translate(mx, my);
      if (refLine.name === "x-axis") {
        // Perpendicular to x-axis (vertical line)
        rect(-4, -4, 8, 8);
      } else if (refLine.name === "y-axis") {
        // Perpendicular to y-axis (horizontal line)
        rect(-4, -4, 8, 8);
      } else {
        // Perpendicular to y=x (45° line)
        rotate(-PI / 4);
        rect(-4, -4, 8, 8);
      }
      pop();
    }
    setLineDash([]);
  }

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
  text('A', preVerts[0][0] - 10, preVerts[0][1]);
  text('B', preVerts[1][0] + (refLine.name === "y-axis" ? 0 : 10),
       preVerts[1][1] + (refLine.name === "y-axis" ? -10 : 0));
  text('C', preVerts[2][0] + 10, preVerts[2][1]);

  if (animProgress >= 1) {
    fill('#2E7D32');
    let finalVerts = reflectedTriangle.map(p => [
      centerX + p[0] * cellSize,
      centerY - p[1] * cellSize
    ]);
    text("A'", finalVerts[0][0] - 10, finalVerts[0][1]);
    text("B'", finalVerts[1][0] + (refLine.name === "y-axis" ? 0 : 10),
         finalVerts[1][1] + (refLine.name === "y-axis" ? 10 : 0));
    text("C'", finalVerts[2][0] + 10, finalVerts[2][1]);
  }
  textStyle(NORMAL);

  // Line of reflection label
  fill('#E53935');
  textSize(12);
  textAlign(LEFT, TOP);
  if (refLine.name === "x-axis") {
    text('Line: x-axis (y = 0)', centerX + 6 * cellSize - 100, centerY + 8);
  } else if (refLine.name === "y-axis") {
    text('Line: y-axis (x = 0)', centerX + 8, centerY - 6 * cellSize + 5);
  } else {
    text('Line: y = x', centerX + 4 * cellSize, centerY - 5 * cellSize + 5);
  }

  // Labels at bottom
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(refLine.label, canvasWidth / 2, drawHeight - 45);
  textStyle(NORMAL);

  // Equal distance annotation
  fill('#7B1FA2');
  textSize(11);
  text("Perpendicular distances are equal", canvasWidth / 2, drawHeight - 25);
}

function mousePressed() {
  // Check button clicks
  let buttonWidth = 100;
  let buttonHeight = 28;
  let startX = canvasWidth / 2 - (reflectionLines.length * (buttonWidth + 10)) / 2;
  let y = 55;

  for (let i = 0; i < reflectionLines.length; i++) {
    let x = startX + i * (buttonWidth + 10);
    if (mouseX >= x && mouseX <= x + buttonWidth &&
        mouseY >= y && mouseY <= y + buttonHeight) {
      selectedLine = i;
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
