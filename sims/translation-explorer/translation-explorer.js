// Interactive Translation Explorer
// Explore translations with sliders and animation

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let hSlider, kSlider;
let animating = false;
let animProgress = 1;
let showVector = true;

// Triangle vertices
let triangle = [
  [1, 1],
  [4, 1],
  [2, 4]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create sliders
  hSlider = createSlider(-8, 8, 3, 0.5);
  hSlider.size(200);

  kSlider = createSlider(-8, 8, 2, 0.5);
  kSlider.size(200);

  positionControls();
  describe('Interactive translation explorer with adjustable horizontal and vertical components', LABEL);
}

function draw() {
  updateCanvasSize();
  positionControls();

  // Draw area background
  fill('#E3F2FD');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control panel background
  fill('#ECEFF1');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Interactive Translation Explorer", canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Update animation
  if (animating) {
    animProgress += 0.03;
    if (animProgress >= 1) {
      animProgress = 1;
      animating = false;
    }
  }

  let h = hSlider.value();
  let k = kSlider.value();

  drawGrid();
  drawPreImage();
  if (showVector) {
    drawTranslationVector(h * animProgress, k * animProgress);
  }
  drawImage(h * animProgress, k * animProgress);
  drawLabels(h, k);
  drawControls(h, k);
}

function drawGrid() {
  let gridSize = min(canvasWidth - 60, drawHeight - 80);
  let cellSize = gridSize / 20;
  let centerX = canvasWidth / 2;
  let centerY = (drawHeight - 40) / 2 + 40;

  // Store for other functions
  window.gridCenterX = centerX;
  window.gridCenterY = centerY;
  window.cellSize = cellSize;

  // Grid lines
  stroke('#BBDEFB');
  strokeWeight(1);
  for (let i = -10; i <= 10; i++) {
    let x = centerX + i * cellSize;
    let y = centerY + i * cellSize;
    if (x >= 30 && x <= canvasWidth - 30) {
      line(x, 40, x, drawHeight - 40);
    }
    if (y >= 40 && y <= drawHeight - 40) {
      line(30, y, canvasWidth - 30, y);
    }
  }

  // Axes
  stroke('#1565C0');
  strokeWeight(2);
  line(30, centerY, canvasWidth - 30, centerY);
  line(centerX, 40, centerX, drawHeight - 40);

  // Axis labels
  fill('#1565C0');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', canvasWidth - 25, centerY + 5);
  textAlign(RIGHT, CENTER);
  text('y', centerX - 8, 45);

  // Origin
  textAlign(LEFT, TOP);
  text('O', centerX + 5, centerY + 5);
}

function drawPreImage() {
  let cx = window.gridCenterX;
  let cy = window.gridCenterY;
  let cs = window.cellSize;

  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);

  beginShape();
  for (let v of triangle) {
    vertex(cx + v[0] * cs, cy - v[1] * cs);
  }
  endShape(CLOSE);

  // Vertex labels
  noStroke();
  fill('#0D47A1');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('A', cx + triangle[0][0] * cs - 12, cy - triangle[0][1] * cs);
  text('B', cx + triangle[1][0] * cs + 8, cy - triangle[1][1] * cs);
  textAlign(CENTER, BOTTOM);
  text('C', cx + triangle[2][0] * cs, cy - triangle[2][1] * cs - 5);
  textStyle(NORMAL);
}

function drawImage(h, k) {
  let cx = window.gridCenterX;
  let cy = window.gridCenterY;
  let cs = window.cellSize;

  if (animProgress < 1) {
    fill(76, 175, 80, 180);
    stroke(46, 125, 50, 180);
  } else {
    fill('#4CAF50');
    stroke('#2E7D32');
  }
  strokeWeight(2);

  beginShape();
  for (let v of triangle) {
    vertex(cx + (v[0] + h) * cs, cy - (v[1] + k) * cs);
  }
  endShape(CLOSE);

  // Vertex labels
  if (animProgress >= 1) {
    noStroke();
    fill('#2E7D32');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("A'", cx + (triangle[0][0] + h) * cs - 12, cy - (triangle[0][1] + k) * cs);
    text("B'", cx + (triangle[1][0] + h) * cs + 8, cy - (triangle[1][1] + k) * cs);
    textAlign(CENTER, BOTTOM);
    text("C'", cx + (triangle[2][0] + h) * cs, cy - (triangle[2][1] + k) * cs - 5);
    textStyle(NORMAL);

    // Draw dashed correspondence lines
    stroke('#9E9E9E');
    strokeWeight(1);
    setLineDash([5, 3]);
    for (let v of triangle) {
      line(cx + v[0] * cs, cy - v[1] * cs,
           cx + (v[0] + h) * cs, cy - (v[1] + k) * cs);
    }
    setLineDash([]);
  }
}

function drawTranslationVector(h, k) {
  let cx = window.gridCenterX;
  let cy = window.gridCenterY;
  let cs = window.cellSize;

  // Draw from centroid of pre-image
  let centroidX = (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3;
  let centroidY = (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3;

  let startX = cx + centroidX * cs;
  let startY = cy - centroidY * cs;
  let endX = cx + (centroidX + h) * cs;
  let endY = cy - (centroidY + k) * cs;

  stroke('#E53935');
  strokeWeight(3);
  line(startX, startY, endX, endY);

  // Arrow head
  if (abs(h) > 0.1 || abs(k) > 0.1) {
    push();
    translate(endX, endY);
    let angle = atan2(startY - endY, startX - endX);
    rotate(angle);
    fill('#E53935');
    noStroke();
    triangle(0, 0, 14, 6, 14, -6);
    pop();
  }
}

function drawLabels(h, k) {
  // Translation notation
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(`T₍${h},${k}₎`, canvasWidth / 2, drawHeight - 35);
  textStyle(NORMAL);

  // Coordinate rule
  fill('#757575');
  textSize(12);
  text(`(x, y) → (x + ${h}, y + ${k > 0 ? k : '(' + k + ')'})`, canvasWidth / 2, drawHeight - 18);
}

function drawControls(h, k) {
  let y = drawHeight + 15;

  // Horizontal slider
  fill('#424242');
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text(`Horizontal (h): ${h}`, canvasWidth / 2 - 120, y + 12);

  // Vertical slider
  text(`Vertical (k): ${k}`, canvasWidth / 2 - 120, y + 45);

  // Animate button
  let btnX = canvasWidth / 2 + 140;
  let btnY = y + 5;
  let btnW = 80;
  let btnH = 30;

  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    fill('#1976D2');
  } else {
    fill('#1565C0');
  }
  rect(btnX, btnY, btnW, btnH, 5);
  fill('white');
  textAlign(CENTER, CENTER);
  text('Animate', btnX + btnW / 2, btnY + btnH / 2);

  // Toggle vector button
  btnY += 35;
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    fill(showVector ? '#43A047' : '#757575');
  } else {
    fill(showVector ? '#4CAF50' : '#9E9E9E');
  }
  rect(btnX, btnY, btnW, btnH, 5);
  fill('white');
  text(showVector ? 'Vector ✓' : 'Vector', btnX + btnW / 2, btnY + btnH / 2);

  // Callouts
  if (animProgress >= 1) {
    fill('#2E7D32');
    textAlign(LEFT, CENTER);
    textSize(11);
    text('✓ Size preserved', canvasWidth / 2 + 240, y + 20);
    text('✓ Shape preserved', canvasWidth / 2 + 240, y + 38);
    text('✓ Same direction & distance', canvasWidth / 2 + 240, y + 56);
  }
}

function positionControls() {
  let y = drawHeight + 18;
  hSlider.position(canvasWidth / 2 - 110, y);
  kSlider.position(canvasWidth / 2 - 110, y + 33);
}

function mousePressed() {
  let btnX = canvasWidth / 2 + 140;
  let btnY = drawHeight + 20;
  let btnW = 80;
  let btnH = 30;

  // Animate button
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    animProgress = 0;
    animating = true;
    return;
  }

  // Toggle vector button
  btnY += 35;
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showVector = !showVector;
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
