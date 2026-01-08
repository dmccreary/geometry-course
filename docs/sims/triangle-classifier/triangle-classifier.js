// Interactive Triangle Classifier
// Drag vertices to create and classify triangles

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Triangle vertices
let vertices = [];
let selectedVertex = -1;
let gridSize = 40;
let showGrid = true;
let showMeasurements = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Interactive triangle classifier with draggable vertices', LABEL);

  // Default right isosceles triangle
  resetTriangle();
}

function resetTriangle() {
  vertices = [
    { x: canvasWidth * 0.25, y: drawHeight * 0.7 },
    { x: canvasWidth * 0.75, y: drawHeight * 0.7 },
    { x: canvasWidth * 0.5, y: drawHeight * 0.25 }
  ];
}

function randomTriangle() {
  let margin = 80;
  vertices = [
    { x: random(margin, canvasWidth - margin), y: random(margin, drawHeight - margin) },
    { x: random(margin, canvasWidth - margin), y: random(margin, drawHeight - margin) },
    { x: random(margin, canvasWidth - margin), y: random(margin, drawHeight - margin) }
  ];
}

function draw() {
  updateCanvasSize();
  background('#E3F2FD');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Interactive Triangle Classifier", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#616161');
  textSize(11);
  text('Drag the vertices to create different triangle types', canvasWidth / 2, 32);

  if (showGrid) drawGrid();

  // Calculate measurements
  let sides = getSides();
  let angles = getAngles();
  let sideClass = classifyBySides(sides);
  let angleClass = classifyByAngles(angles);

  // Get color based on angle classification
  let triColor = getTriangleColor(angleClass);

  drawTriangle(triColor, sideClass, angleClass);
  if (showMeasurements) drawMeasurements(sides, angles);
  drawVertices();
  drawControlPanel(sides, angles, sideClass, angleClass);
}

function drawGrid() {
  stroke('#BBDEFB');
  strokeWeight(1);
  for (let x = 0; x <= canvasWidth; x += gridSize) {
    line(x, 50, x, drawHeight);
  }
  for (let y = 50; y <= drawHeight; y += gridSize) {
    line(0, y, canvasWidth, y);
  }
}

function getSides() {
  let a = dist(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y);
  let b = dist(vertices[0].x, vertices[0].y, vertices[2].x, vertices[2].y);
  let c = dist(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y);
  return [a, b, c];
}

function getAngles() {
  let sides = getSides();
  let a = sides[0], b = sides[1], c = sides[2];

  // Using law of cosines
  let angleA = acos((b*b + c*c - a*a) / (2*b*c)) * 180 / PI;
  let angleB = acos((a*a + c*c - b*b) / (2*a*c)) * 180 / PI;
  let angleC = acos((a*a + b*b - c*c) / (2*a*b)) * 180 / PI;

  return [angleA, angleB, angleC];
}

function classifyBySides(sides) {
  let [a, b, c] = sides;
  let tolerance = 5; // Tolerance for "equal" sides

  let abEqual = abs(a - b) < tolerance;
  let bcEqual = abs(b - c) < tolerance;
  let acEqual = abs(a - c) < tolerance;

  if (abEqual && bcEqual && acEqual) return "Equilateral";
  if (abEqual || bcEqual || acEqual) return "Isosceles";
  return "Scalene";
}

function classifyByAngles(angles) {
  let maxAngle = max(angles);
  let tolerance = 2;

  if (abs(maxAngle - 90) < tolerance) return "Right";
  if (maxAngle > 90 + tolerance) return "Obtuse";
  return "Acute";
}

function getTriangleColor(angleClass) {
  if (angleClass === "Acute") return '#7B1FA2'; // Purple
  if (angleClass === "Right") return '#D32F2F'; // Red
  return '#00796B'; // Teal for obtuse
}

function drawTriangle(col, sideClass, angleClass) {
  let c = color(col);
  fill(red(c), green(c), blue(c), 60);
  stroke(col);
  strokeWeight(3);

  beginShape();
  for (let v of vertices) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);

  // Draw congruence marks for equal sides
  let sides = getSides();
  let tolerance = 5;

  if (sideClass === "Equilateral") {
    drawTickMarks(vertices[1], vertices[2], 2, col);
    drawTickMarks(vertices[0], vertices[2], 2, col);
    drawTickMarks(vertices[0], vertices[1], 2, col);
  } else if (sideClass === "Isosceles") {
    if (abs(sides[0] - sides[1]) < tolerance) {
      drawTickMarks(vertices[1], vertices[2], 1, col);
      drawTickMarks(vertices[0], vertices[2], 1, col);
    } else if (abs(sides[1] - sides[2]) < tolerance) {
      drawTickMarks(vertices[0], vertices[2], 1, col);
      drawTickMarks(vertices[0], vertices[1], 1, col);
    } else if (abs(sides[0] - sides[2]) < tolerance) {
      drawTickMarks(vertices[1], vertices[2], 1, col);
      drawTickMarks(vertices[0], vertices[1], 1, col);
    }
  }

  // Draw right angle marker if applicable
  if (angleClass === "Right") {
    let angles = getAngles();
    let rightIdx = angles.indexOf(max(angles.filter(a => abs(a - 90) < 2)));
    if (rightIdx === -1) rightIdx = angles.indexOf(max(angles));
    drawRightAngleMark(rightIdx, col);
  }
}

function drawTickMarks(p1, p2, count, col) {
  let mx = (p1.x + p2.x) / 2;
  let my = (p1.y + p2.y) / 2;
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);

  push();
  translate(mx, my);
  rotate(angle + PI/2);
  stroke(col);
  strokeWeight(2);

  let spacing = 5;
  let len = 10;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count-1)/2) * spacing;
    line(offset, -len/2, offset, len/2);
  }
  pop();
}

function drawRightAngleMark(idx, col) {
  let v = vertices[idx];
  let prev = vertices[(idx + 2) % 3];
  let next = vertices[(idx + 1) % 3];

  let size = 15;
  let dir1 = atan2(prev.y - v.y, prev.x - v.x);
  let dir2 = atan2(next.y - v.y, next.x - v.x);

  let p1x = v.x + size * cos(dir1);
  let p1y = v.y + size * sin(dir1);
  let p2x = v.x + size * cos(dir2);
  let p2y = v.y + size * sin(dir2);
  let corner = {
    x: v.x + size * cos(dir1) + size * cos(dir2),
    y: v.y + size * sin(dir1) + size * sin(dir2)
  };

  stroke(col);
  strokeWeight(2);
  noFill();
  line(p1x, p1y, corner.x, corner.y);
  line(p2x, p2y, corner.x, corner.y);
}

function drawMeasurements(sides, angles) {
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();

  // Side lengths
  fill('#424242');
  for (let i = 0; i < 3; i++) {
    let p1 = vertices[i];
    let p2 = vertices[(i + 1) % 3];
    let mx = (p1.x + p2.x) / 2;
    let my = (p1.y + p2.y) / 2;

    // Offset perpendicular to line
    let angle = atan2(p2.y - p1.y, p2.x - p1.x);
    let offset = 15;
    mx += offset * cos(angle - PI/2);
    my += offset * sin(angle - PI/2);

    let sideIdx = (i === 0) ? 2 : (i === 1) ? 0 : 1;
    text(round(sides[sideIdx]) + " px", mx, my);
  }

  // Angle measurements
  fill('#1565C0');
  for (let i = 0; i < 3; i++) {
    let v = vertices[i];
    let prev = vertices[(i + 2) % 3];
    let next = vertices[(i + 1) % 3];

    let a1 = atan2(prev.y - v.y, prev.x - v.x);
    let a2 = atan2(next.y - v.y, next.x - v.x);
    let midAngle = (a1 + a2) / 2;

    // Make sure we're inside the triangle
    let testX = v.x + 20 * cos(midAngle);
    let testY = v.y + 20 * sin(midAngle);
    if (!pointInTriangle(testX, testY)) {
      midAngle += PI;
    }

    let labelDist = 35;
    text(round(angles[i]) + "°", v.x + labelDist * cos(midAngle), v.y + labelDist * sin(midAngle));
  }
}

function pointInTriangle(px, py) {
  let v0 = vertices[0], v1 = vertices[1], v2 = vertices[2];

  let d1 = sign(px, py, v0.x, v0.y, v1.x, v1.y);
  let d2 = sign(px, py, v1.x, v1.y, v2.x, v2.y);
  let d3 = sign(px, py, v2.x, v2.y, v0.x, v0.y);

  let hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  let hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(hasNeg && hasPos);
}

function sign(p1x, p1y, p2x, p2y, p3x, p3y) {
  return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
}

function drawVertices() {
  for (let i = 0; i < 3; i++) {
    let v = vertices[i];
    let isSelected = selectedVertex === i;

    // Outer glow when selected
    if (isSelected) {
      fill(100, 181, 246, 100);
      noStroke();
      ellipse(v.x, v.y, 30, 30);
    }

    // Vertex point
    fill(isSelected ? '#1976D2' : '#1565C0');
    stroke('#FFFFFF');
    strokeWeight(2);
    ellipse(v.x, v.y, 16, 16);

    // Label
    fill('#FFFFFF');
    noStroke();
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(String.fromCharCode(65 + i), v.x, v.y);
    textStyle(NORMAL);
  }
}

function drawControlPanel(sides, angles, sideClass, angleClass) {
  // Control panel background
  fill('#FAFAFA');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();

  // Classification display
  let triColor = getTriangleColor(angleClass);
  fill(triColor);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(sideClass + " " + angleClass + " Triangle", canvasWidth / 2, drawHeight + 12);
  textStyle(NORMAL);

  // Measurements summary
  fill('#616161');
  textSize(11);
  textAlign(LEFT, TOP);

  let leftX = 20;
  text("Sides: " + round(sides[0]) + ", " + round(sides[1]) + ", " + round(sides[2]) + " px", leftX, drawHeight + 40);
  text("Angles: " + round(angles[0]) + "° + " + round(angles[1]) + "° + " + round(angles[2]) + "° = " + round(angles[0] + angles[1] + angles[2]) + "°", leftX, drawHeight + 58);

  // Buttons
  drawButton("Reset", canvasWidth - 170, drawHeight + 35, 70, 30, resetTriangle);
  drawButton("Random", canvasWidth - 90, drawHeight + 35, 70, 30, randomTriangle);

  // Toggles
  fill('#757575');
  textSize(10);
  textAlign(RIGHT, CENTER);
  text("Grid: " + (showGrid ? "ON" : "OFF"), canvasWidth - 180, drawHeight + 80);
  text("Measurements: " + (showMeasurements ? "ON" : "OFF"), canvasWidth - 60, drawHeight + 80);
}

function drawButton(label, x, y, w, h, action) {
  let isHover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;

  fill(isHover ? '#1976D2' : '#2196F3');
  noStroke();
  rect(x, y, w, h, 5);

  fill('#FFFFFF');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(label, x + w/2, y + h/2);
}

function mousePressed() {
  // Check buttons
  if (mouseY > drawHeight + 35 && mouseY < drawHeight + 65) {
    if (mouseX > canvasWidth - 170 && mouseX < canvasWidth - 100) {
      resetTriangle();
      return;
    }
    if (mouseX > canvasWidth - 90 && mouseX < canvasWidth - 20) {
      randomTriangle();
      return;
    }
  }

  // Check toggle clicks
  if (mouseY > drawHeight + 70 && mouseY < drawHeight + 90) {
    if (mouseX > canvasWidth - 220 && mouseX < canvasWidth - 150) {
      showGrid = !showGrid;
      return;
    }
    if (mouseX > canvasWidth - 140 && mouseX < canvasWidth - 20) {
      showMeasurements = !showMeasurements;
      return;
    }
  }

  // Check vertex selection
  for (let i = 0; i < 3; i++) {
    if (dist(mouseX, mouseY, vertices[i].x, vertices[i].y) < 20) {
      selectedVertex = i;
      return;
    }
  }
}

function mouseDragged() {
  if (selectedVertex >= 0) {
    let margin = 40;
    vertices[selectedVertex].x = constrain(mouseX, margin, canvasWidth - margin);
    vertices[selectedVertex].y = constrain(mouseY, 50, drawHeight - margin);
  }
}

function mouseReleased() {
  selectedVertex = -1;
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
