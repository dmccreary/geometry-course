// Interactive Rotation Explorer
// Explore rotations with adjustable angle and draggable center

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let angleSlider;
let animating = false;
let animProgress = 1;
let showArcs = true;
let showRadii = true;

// Center of rotation (draggable)
let centerX = 0;
let centerY = 0;
let draggingCenter = false;

// Triangle vertices (relative to grid)
let triangle = [
  [2, 1],
  [4, 1],
  [3, 3]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create angle slider
  angleSlider = createSlider(-360, 360, 90, 5);
  angleSlider.size(250);

  positionControls();
  describe('Interactive rotation explorer with adjustable angle and center', LABEL);
}

function draw() {
  updateCanvasSize();
  positionControls();

  // Draw area background
  fill('#FFF8E1');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control panel background
  fill('#ECEFF1');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#E65100');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Interactive Rotation Explorer", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Drag the red dot to move center of rotation', canvasWidth / 2, 32);

  // Update animation
  if (animating) {
    animProgress += 0.025;
    if (animProgress >= 1) {
      animProgress = 1;
      animating = false;
    }
  }

  let angle = angleSlider.value();

  drawGrid();
  drawPreImage();
  if (showRadii) drawRadii(angle * animProgress);
  if (showArcs) drawRotationArcs(angle * animProgress);
  drawImage(angle * animProgress);
  drawCenter();
  drawControls(angle);
}

function drawGrid() {
  let gridSize = min(canvasWidth - 80, drawHeight - 100);
  let cellSize = gridSize / 14;
  let gCenterX = canvasWidth / 2;
  let gCenterY = (drawHeight - 50) / 2 + 50;

  // Store for other functions
  window.gridCenterX = gCenterX;
  window.gridCenterY = gCenterY;
  window.cellSize = cellSize;

  // Grid lines
  stroke('#FFE0B2');
  strokeWeight(1);
  for (let i = -7; i <= 7; i++) {
    let x = gCenterX + i * cellSize;
    let y = gCenterY + i * cellSize;
    if (x >= 40 && x <= canvasWidth - 40) {
      line(x, 50, x, drawHeight - 50);
    }
    if (y >= 50 && y <= drawHeight - 50) {
      line(40, y, canvasWidth - 40, y);
    }
  }

  // Axes
  stroke('#E65100');
  strokeWeight(2);
  line(40, gCenterY, canvasWidth - 40, gCenterY);
  line(gCenterX, 50, gCenterX, drawHeight - 50);

  // Axis labels
  fill('#E65100');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('x', canvasWidth - 35, gCenterY + 5);
  textAlign(RIGHT, CENTER);
  text('y', gCenterX - 8, 55);
}

function drawCenter() {
  let cx = window.gridCenterX + centerX * window.cellSize;
  let cy = window.gridCenterY - centerY * window.cellSize;

  // Center of rotation
  fill('#E53935');
  stroke('#B71C1C');
  strokeWeight(2);
  ellipse(cx, cy, 16, 16);

  // Label
  noStroke();
  fill('#B71C1C');
  textSize(10);
  textAlign(LEFT, TOP);
  text(`Center (${centerX}, ${centerY})`, cx + 12, cy - 5);
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

function drawImage(angleDeg) {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;
  let angleRad = angleDeg * PI / 180;

  // Rotate around center
  let imageVerts = triangle.map(v => {
    let dx = v[0] - centerX;
    let dy = v[1] - centerY;
    let rx = dx * cos(angleRad) - dy * sin(angleRad);
    let ry = dx * sin(angleRad) + dy * cos(angleRad);
    return [centerX + rx, centerY + ry];
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
  for (let v of imageVerts) {
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
    text("A'", gx + imageVerts[0][0] * cs + 10, gy - imageVerts[0][1] * cs);
    text("B'", gx + imageVerts[1][0] * cs + 10, gy - imageVerts[1][1] * cs);
    textAlign(CENTER, BOTTOM);
    text("C'", gx + imageVerts[2][0] * cs, gy - imageVerts[2][1] * cs - 5);
    textStyle(NORMAL);
  }
}

function drawRadii(angleDeg) {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;
  let angleRad = angleDeg * PI / 180;

  let cx = gx + centerX * cs;
  let cy = gy - centerY * cs;

  stroke('#9E9E9E');
  strokeWeight(1);
  setLineDash([4, 3]);

  for (let v of triangle) {
    // Pre-image radii
    let px = gx + v[0] * cs;
    let py = gy - v[1] * cs;
    line(cx, cy, px, py);

    // Image radii
    if (animProgress >= 1) {
      let dx = v[0] - centerX;
      let dy = v[1] - centerY;
      let rx = dx * cos(angleRad) - dy * sin(angleRad);
      let ry = dx * sin(angleRad) + dy * cos(angleRad);
      let ix = gx + (centerX + rx) * cs;
      let iy = gy - (centerY + ry) * cs;
      line(cx, cy, ix, iy);
    }
  }
  setLineDash([]);
}

function drawRotationArcs(angleDeg) {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;
  let angleRad = angleDeg * PI / 180;

  let cx = gx + centerX * cs;
  let cy = gy - centerY * cs;

  stroke('#9C27B0');
  strokeWeight(2);
  noFill();

  // Draw arc for first vertex
  let v = triangle[0];
  let dx = v[0] - centerX;
  let dy = v[1] - centerY;
  let radius = sqrt(dx * dx + dy * dy) * cs;
  let startAngle = -atan2(dy, dx);
  let endAngle = startAngle - angleRad;

  if (abs(angleDeg) > 5) {
    if (angleRad > 0) {
      arc(cx, cy, radius * 2, radius * 2, endAngle, startAngle);
    } else {
      arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle);
    }

    // Rotation direction arrow
    let arrowAngle = endAngle;
    let arrowX = cx + radius * cos(arrowAngle);
    let arrowY = cy + radius * sin(arrowAngle);

    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle + (angleRad > 0 ? -PI / 2 : PI / 2));
    fill('#9C27B0');
    noStroke();
    triangle(0, 0, 8, -4, 8, 4);
    pop();
  }
}

function drawControls(angle) {
  let y = drawHeight + 10;

  // Angle label
  fill('#424242');
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text(`Angle: ${angle}°`, canvasWidth / 2 - 140, y + 18);

  // Direction indicator
  fill('#757575');
  textSize(10);
  if (angle > 0) {
    text('(counterclockwise)', canvasWidth / 2 - 140, y + 35);
  } else if (angle < 0) {
    text('(clockwise)', canvasWidth / 2 - 140, y + 35);
  }

  // Preset buttons
  let presets = [90, 180, 270, -90];
  let btnW = 45;
  let btnH = 24;
  let btnX = canvasWidth / 2 + 140;

  for (let i = 0; i < presets.length; i++) {
    let bx = btnX + (i % 2) * (btnW + 5);
    let by = y + 5 + floor(i / 2) * (btnH + 5);

    if (mouseX >= bx && mouseX <= bx + btnW &&
        mouseY >= by && mouseY <= by + btnH) {
      fill('#FF9800');
    } else {
      fill('#FFB74D');
    }
    rect(bx, by, btnW, btnH, 3);
    fill('#424242');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(presets[i] + '°', bx + btnW / 2, by + btnH / 2);
  }

  // Animate button
  btnX = canvasWidth / 2 + 250;
  let btnY = y + 5;

  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    fill('#E65100');
  } else {
    fill('#FF9800');
  }
  rect(btnX, btnY, 70, btnH, 3);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Animate', btnX + 35, btnY + btnH / 2);

  // Toggle buttons
  btnY += 32;
  // Arcs toggle
  fill(showArcs ? '#4CAF50' : '#9E9E9E');
  rect(btnX, btnY, 70, btnH, 3);
  fill('white');
  text(showArcs ? 'Arcs ✓' : 'Arcs', btnX + 35, btnY + btnH / 2);

  // Radii toggle
  btnX += 75;
  fill(showRadii ? '#4CAF50' : '#9E9E9E');
  rect(btnX, btnY, 70, btnH, 3);
  fill('white');
  text(showRadii ? 'Radii ✓' : 'Radii', btnX + 35, btnY + btnH / 2);

  // Rotation notation
  fill('#424242');
  textAlign(LEFT, CENTER);
  textSize(11);
  text(`R${angle}° around (${centerX}, ${centerY})`, 20, y + 55);
}

function positionControls() {
  let y = drawHeight + 13;
  angleSlider.position(canvasWidth / 2 - 125, y);
}

function mousePressed() {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;

  // Check if clicking center
  let cx = gx + centerX * cs;
  let cy = gy - centerY * cs;
  if (dist(mouseX, mouseY, cx, cy) < 15) {
    draggingCenter = true;
    return;
  }

  // Check preset buttons
  let presets = [90, 180, 270, -90];
  let btnW = 45;
  let btnH = 24;
  let btnX = canvasWidth / 2 + 140;
  let y = drawHeight + 10;

  for (let i = 0; i < presets.length; i++) {
    let bx = btnX + (i % 2) * (btnW + 5);
    let by = y + 5 + floor(i / 2) * (btnH + 5);
    if (mouseX >= bx && mouseX <= bx + btnW &&
        mouseY >= by && mouseY <= by + btnH) {
      angleSlider.value(presets[i]);
      animProgress = 0;
      animating = true;
      return;
    }
  }

  // Animate button
  btnX = canvasWidth / 2 + 250;
  let btnY = y + 5;
  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    animProgress = 0;
    animating = true;
    return;
  }

  // Toggle buttons
  btnY += 32;
  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showArcs = !showArcs;
    return;
  }

  btnX += 75;
  if (mouseX >= btnX && mouseX <= btnX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showRadii = !showRadii;
    return;
  }
}

function mouseDragged() {
  if (draggingCenter) {
    let gx = window.gridCenterX;
    let gy = window.gridCenterY;
    let cs = window.cellSize;

    centerX = round((mouseX - gx) / cs * 2) / 2;
    centerY = round((gy - mouseY) / cs * 2) / 2;
    centerX = constrain(centerX, -6, 6);
    centerY = constrain(centerY, -5, 5);
  }
}

function mouseReleased() {
  draggingCenter = false;
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
