// Interactive Reflection Explorer
// Explore reflections with custom mirror lines

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let lineTypeSelect;
let lineKSlider;
let animating = false;
let animProgress = 1;
let showDistances = true;

let lineTypes = ['x-axis', 'y-axis', 'y = x', 'y = -x', 'x = k', 'y = k'];
let currentLineType = 0;
let lineK = 2;

// Triangle vertices
let triangle = [
  [2, 2],
  [4, 2],
  [3, 4]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create line k slider
  lineKSlider = createSlider(-5, 5, 2, 0.5);
  lineKSlider.size(150);

  positionControls();
  describe('Interactive reflection explorer with selectable mirror lines', LABEL);
}

function draw() {
  updateCanvasSize();
  positionControls();

  // Draw area background
  fill('#E8F5E9');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control panel background
  fill('#ECEFF1');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#2E7D32');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Interactive Reflection Explorer", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Select a line of reflection and explore', canvasWidth / 2, 32);

  // Update animation
  if (animating) {
    animProgress += 0.03;
    if (animProgress >= 1) {
      animProgress = 1;
      animating = false;
    }
  }

  lineK = lineKSlider.value();

  drawGrid();
  drawLineOfReflection();
  drawPreImage();
  drawImage();
  if (showDistances && animProgress >= 1) {
    drawDistances();
  }
  drawControls();
}

function drawGrid() {
  let gridSize = min(canvasWidth - 80, drawHeight - 100);
  let cellSize = gridSize / 14;
  let centerX = canvasWidth / 2;
  let centerY = (drawHeight - 50) / 2 + 50;

  window.gridCenterX = centerX;
  window.gridCenterY = centerY;
  window.cellSize = cellSize;

  // Grid lines
  stroke('#C8E6C9');
  strokeWeight(1);
  for (let i = -7; i <= 7; i++) {
    let x = centerX + i * cellSize;
    let y = centerY + i * cellSize;
    if (x >= 40 && x <= canvasWidth - 40) {
      line(x, 50, x, drawHeight - 50);
    }
    if (y >= 50 && y <= drawHeight - 50) {
      line(40, y, canvasWidth - 40, y);
    }
  }

  // Axes
  stroke('#2E7D32');
  strokeWeight(2);
  line(40, centerY, canvasWidth - 40, centerY);
  line(centerX, 50, centerX, drawHeight - 50);

  // Axis labels
  fill('#2E7D32');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('x', canvasWidth - 35, centerY + 5);
  textAlign(RIGHT, CENTER);
  text('y', centerX - 8, 55);
}

function drawLineOfReflection() {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;

  stroke('#E53935');
  strokeWeight(4);

  let lineType = lineTypes[currentLineType];

  if (lineType === 'x-axis') {
    line(40, gy, canvasWidth - 40, gy);
  } else if (lineType === 'y-axis') {
    line(gx, 50, gx, drawHeight - 50);
  } else if (lineType === 'y = x') {
    line(gx - 6 * cs, gy + 6 * cs, gx + 6 * cs, gy - 6 * cs);
  } else if (lineType === 'y = -x') {
    line(gx - 6 * cs, gy - 6 * cs, gx + 6 * cs, gy + 6 * cs);
  } else if (lineType === 'x = k') {
    let lx = gx + lineK * cs;
    line(lx, 50, lx, drawHeight - 50);
  } else if (lineType === 'y = k') {
    let ly = gy - lineK * cs;
    line(40, ly, canvasWidth - 40, ly);
  }

  // Line label
  noStroke();
  fill('#E53935');
  textSize(11);
  textAlign(LEFT, TOP);
  if (lineType === 'x = k' || lineType === 'y = k') {
    text(`Line: ${lineType.replace('k', lineK)}`, 50, 55);
  } else {
    text(`Line: ${lineType}`, 50, 55);
  }
}

function reflectPoint(x, y) {
  let lineType = lineTypes[currentLineType];

  if (lineType === 'x-axis') {
    return [x, -y];
  } else if (lineType === 'y-axis') {
    return [-x, y];
  } else if (lineType === 'y = x') {
    return [y, x];
  } else if (lineType === 'y = -x') {
    return [-y, -x];
  } else if (lineType === 'x = k') {
    return [2 * lineK - x, y];
  } else if (lineType === 'y = k') {
    return [x, 2 * lineK - y];
  }
  return [x, y];
}

function drawPreImage() {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;

  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);

  beginShape();
  for (let v of triangle) {
    vertex(gx + v[0] * cs, gy - v[1] * cs);
  }
  endShape(CLOSE);

  // Vertex labels
  noStroke();
  fill('#0D47A1');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('A', gx + triangle[0][0] * cs - 10, gy - triangle[0][1] * cs + 3);
  text('B', gx + triangle[1][0] * cs + 8, gy - triangle[1][1] * cs + 3);
  textAlign(CENTER, BOTTOM);
  text('C', gx + triangle[2][0] * cs, gy - triangle[2][1] * cs - 5);
  textStyle(NORMAL);
}

function drawImage() {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;

  // Calculate reflected positions
  let reflected = triangle.map(v => reflectPoint(v[0], v[1]));

  // Interpolate for animation
  let animated = triangle.map((v, i) => {
    let r = reflected[i];
    return [
      lerp(v[0], r[0], animProgress),
      lerp(v[1], r[1], animProgress)
    ];
  });

  if (animProgress < 1) {
    fill(76, 175, 80, 180);
    stroke(46, 125, 50, 180);
  } else {
    fill('#4CAF50');
    stroke('#2E7D32');
  }
  strokeWeight(2);

  beginShape();
  for (let v of animated) {
    vertex(gx + v[0] * cs, gy - v[1] * cs);
  }
  endShape(CLOSE);

  // Vertex labels
  if (animProgress >= 1) {
    noStroke();
    fill('#2E7D32');
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("A'", gx + reflected[0][0] * cs + 10, gy - reflected[0][1] * cs);
    text("B'", gx + reflected[1][0] * cs + 10, gy - reflected[1][1] * cs);
    textAlign(CENTER, BOTTOM);
    text("C'", gx + reflected[2][0] * cs, gy - reflected[2][1] * cs - 5);
    textStyle(NORMAL);
  }
}

function drawDistances() {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;

  let reflected = triangle.map(v => reflectPoint(v[0], v[1]));

  stroke('#7B1FA2');
  strokeWeight(1);
  setLineDash([5, 3]);

  for (let i = 0; i < triangle.length; i++) {
    let px = gx + triangle[i][0] * cs;
    let py = gy - triangle[i][1] * cs;
    let rx = gx + reflected[i][0] * cs;
    let ry = gy - reflected[i][1] * cs;

    line(px, py, rx, ry);

    // Midpoint on line of reflection
    let mx = (px + rx) / 2;
    let my = (py + ry) / 2;

    // Small square for perpendicular
    noFill();
    setLineDash([]);
    push();
    translate(mx, my);
    let lineType = lineTypes[currentLineType];
    if (lineType === 'y = x') {
      rotate(-PI / 4);
    } else if (lineType === 'y = -x') {
      rotate(PI / 4);
    }
    rect(-4, -4, 8, 8);
    pop();
    setLineDash([5, 3]);
  }
  setLineDash([]);
}

function drawControls() {
  let y = drawHeight + 10;

  // Line type buttons
  fill('#424242');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Line of reflection:', 20, y + 15);

  let btnW = 55;
  let btnH = 24;
  let btnX = 130;

  for (let i = 0; i < lineTypes.length; i++) {
    let bx = btnX + (i % 3) * (btnW + 5);
    let by = y + 3 + floor(i / 3) * (btnH + 5);

    if (i === currentLineType) {
      fill('#2E7D32');
    } else if (mouseX >= bx && mouseX <= bx + btnW &&
               mouseY >= by && mouseY <= by + btnH) {
      fill('#66BB6A');
    } else {
      fill('#A5D6A7');
    }
    rect(bx, by, btnW, btnH, 3);

    fill(i === currentLineType ? 'white' : '#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(lineTypes[i], bx + btnW / 2, by + btnH / 2);
  }

  // K slider (only visible for x=k and y=k)
  let lineType = lineTypes[currentLineType];
  if (lineType === 'x = k' || lineType === 'y = k') {
    textAlign(RIGHT, CENTER);
    fill('#424242');
    textSize(11);
    text(`k = ${lineK}`, canvasWidth / 2 + 30, y + 20);
  }

  // Animate button
  btnX = canvasWidth - 180;
  let btnY = y + 5;

  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    fill('#1B5E20');
  } else {
    fill('#2E7D32');
  }
  rect(btnX, btnY, 70, btnH, 3);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Animate', btnX + 35, btnY + btnH / 2);

  // Toggle distances
  btnY += 30;
  fill(showDistances ? '#4CAF50' : '#9E9E9E');
  rect(btnX, btnY, 70, btnH, 3);
  fill('white');
  text(showDistances ? 'Dist ✓' : 'Dist', btnX + 35, btnY + btnH / 2);

  // Orientation note
  fill('#757575');
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Note: Orientation reverses in reflections', canvasWidth - 100, y + 55);
}

function positionControls() {
  let y = drawHeight + 15;
  let lineType = lineTypes[currentLineType];
  if (lineType === 'x = k' || lineType === 'y = k') {
    lineKSlider.show();
    lineKSlider.position(canvasWidth / 2 + 40, y + 8);
  } else {
    lineKSlider.hide();
  }
}

function mousePressed() {
  let y = drawHeight + 10;

  // Line type buttons
  let btnW = 55;
  let btnH = 24;
  let btnX = 130;

  for (let i = 0; i < lineTypes.length; i++) {
    let bx = btnX + (i % 3) * (btnW + 5);
    let by = y + 3 + floor(i / 3) * (btnH + 5);

    if (mouseX >= bx && mouseX <= bx + btnW &&
        mouseY >= by && mouseY <= by + btnH) {
      currentLineType = i;
      animProgress = 0;
      animating = true;
      positionControls();
      return;
    }
  }

  // Animate button
  btnX = canvasWidth - 180;
  let btnY = y + 5;
  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    animProgress = 0;
    animating = true;
    return;
  }

  // Toggle distances
  btnY += 30;
  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showDistances = !showDistances;
    return;
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
