// Line Relationships in 3D Space
// Demonstrates parallel, perpendicular, and skew lines using WebGL
// Canvas-based controls only (no DOM elements)

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

// 3D box dimensions
let boxW = 300;
let boxH = 200;
let boxD = 150;

// Current rotation angles
let rotX = -0.3;
let rotY = 0.4;

// Auto-rotate state
let autoRotate = true;
let rotationSpeed = 0.5;

// Slider parameters
let sliderX = 260;
let sliderW = 200;
let sliderY;
let sliderVal = 0.5; // normalized 0-1

// Checkbox parameters
let checkX = 20;
let checkSize = 18;
let checkY;

// 2D overlay buffer
let overlay;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent(document.querySelector('main'));

  sliderY = drawHeight + 25;
  checkY = drawHeight + 16;

  // Create 2D overlay for text and controls
  overlay = createGraphics(canvasWidth, canvasHeight);
  overlay.textFont('Arial');

  describe('3D visualization showing parallel lines in blue, perpendicular lines in red, and skew lines in green within a transparent rectangular prism', LABEL);
}

function draw() {
  updateCanvasSize();

  // Gradient background (simulated with two halves)
  background(227, 242, 253); // #E3F2FD

  // ---- 3D Scene ----
  push();

  // Auto-rotate
  if (autoRotate) {
    rotationSpeed = sliderVal * 2; // 0 to 2
    rotY += rotationSpeed * 0.01;
  }

  // Apply rotations
  rotateX(rotX);
  rotateY(rotY);

  // Draw the transparent box
  drawBox3D();

  // Draw parallel lines (blue)
  drawParallelLines();

  // Draw perpendicular lines (red)
  drawPerpendicularLines();

  // Draw skew lines (green)
  drawSkewLines();

  pop();

  // ---- 2D Overlay ----
  draw2DOverlay();

  // Render overlay as texture on a plane in front of camera
  push();
  resetMatrix();
  // Position the overlay plane to cover the full canvas
  let d = height / 2 / tan(PI / 6); // default camera distance
  translate(0, 0, d - 1);
  noStroke();
  texture(overlay);
  plane(width, height);
  pop();
}

function draw2DOverlay() {
  overlay.clear();

  // Gradient background bottom portion for subtle effect
  for (let y = 0; y < drawHeight; y++) {
    let t = y / drawHeight;
    let r = lerp(227, 245, t);
    let g = lerp(242, 245, t);
    let b = lerp(253, 245, t);
    overlay.stroke(r, g, b, 30);
    overlay.line(0, y, canvasWidth, y);
  }

  // Title
  overlay.noStroke();
  overlay.fill(0);
  overlay.textSize(24);
  overlay.textStyle(BOLD);
  overlay.textAlign(CENTER, TOP);
  overlay.text('Line Relationships in 3D Space', canvasWidth / 2, 12);
  overlay.textStyle(NORMAL);

  // Annotation boxes (left side)
  drawAnnotationBoxes();

  // Legend (bottom right)
  drawLegend();

  // Control area
  drawControls();
}

function drawAnnotationBoxes() {
  let leftX = 15;
  let boxW_annot = 240;
  let boxH_annot = 48;
  let startY = 60;
  let spacing = 58;

  overlay.textAlign(LEFT, TOP);

  // Parallel lines annotation
  overlay.fill(255, 255, 255, 220);
  overlay.stroke(25, 118, 210);
  overlay.strokeWeight(2);
  overlay.rect(leftX, startY, boxW_annot, boxH_annot, 4);
  overlay.noStroke();
  overlay.fill(25, 118, 210);
  overlay.textSize(13);
  overlay.textStyle(BOLD);
  overlay.text('Parallel: Line m \u2225 Line n', leftX + 8, startY + 6);
  overlay.textStyle(NORMAL);
  overlay.fill(60);
  overlay.textSize(11);
  overlay.text('Same plane, never intersect', leftX + 8, startY + 26);

  // Perpendicular lines annotation
  startY += spacing;
  overlay.fill(255, 255, 255, 220);
  overlay.stroke(229, 57, 53);
  overlay.strokeWeight(2);
  overlay.rect(leftX, startY, boxW_annot, boxH_annot, 4);
  overlay.noStroke();
  overlay.fill(229, 57, 53);
  overlay.textSize(13);
  overlay.textStyle(BOLD);
  overlay.text('Perpendicular: Line p \u22A5 Line q', leftX + 8, startY + 6);
  overlay.textStyle(NORMAL);
  overlay.fill(60);
  overlay.textSize(11);
  overlay.text('Intersect at 90\u00B0', leftX + 8, startY + 26);

  // Skew lines annotation
  startY += spacing;
  overlay.fill(255, 255, 255, 220);
  overlay.stroke(67, 160, 71);
  overlay.strokeWeight(2);
  overlay.rect(leftX, startY, boxW_annot, boxH_annot, 4);
  overlay.noStroke();
  overlay.fill(67, 160, 71);
  overlay.textSize(13);
  overlay.textStyle(BOLD);
  overlay.text('Skew: Line r & Line s', leftX + 8, startY + 6);
  overlay.textStyle(NORMAL);
  overlay.fill(60);
  overlay.textSize(11);
  overlay.text('Different planes, never intersect', leftX + 8, startY + 26);
}

function drawLegend() {
  let legendW = 270;
  let legendH = 110;
  let legendX = canvasWidth - legendW - 15;
  let legendY = drawHeight - legendH - 15;

  // Background
  overlay.fill(255, 255, 255, 230);
  overlay.stroke(200);
  overlay.strokeWeight(1);
  overlay.rect(legendX, legendY, legendW, legendH, 5);

  // Title
  overlay.noStroke();
  overlay.fill(0);
  overlay.textSize(14);
  overlay.textStyle(BOLD);
  overlay.textAlign(LEFT, TOP);
  overlay.text('Legend', legendX + 10, legendY + 8);
  overlay.textStyle(NORMAL);

  let yPos = legendY + 32;
  let sp = 25;

  // Parallel
  overlay.stroke(25, 118, 210);
  overlay.strokeWeight(4);
  overlay.line(legendX + 10, yPos, legendX + 40, yPos);
  overlay.noStroke();
  overlay.fill(0);
  overlay.textSize(12);
  overlay.text('Parallel (coplanar, no intersection)', legendX + 50, yPos - 7);

  // Perpendicular
  yPos += sp;
  overlay.stroke(229, 57, 53);
  overlay.strokeWeight(4);
  overlay.line(legendX + 10, yPos, legendX + 40, yPos);
  overlay.noStroke();
  overlay.fill(0);
  overlay.text('Perpendicular (intersect at 90\u00B0)', legendX + 50, yPos - 7);

  // Skew
  yPos += sp;
  overlay.stroke(67, 160, 71);
  overlay.strokeWeight(4);
  overlay.line(legendX + 10, yPos, legendX + 40, yPos);
  overlay.noStroke();
  overlay.fill(0);
  overlay.text('Skew (non-coplanar, no intersection)', legendX + 50, yPos - 7);
}

function drawControls() {
  // Control area background
  overlay.fill(245);
  overlay.noStroke();
  overlay.rect(0, drawHeight, canvasWidth, controlHeight);

  // Separator line
  overlay.stroke(200);
  overlay.strokeWeight(1);
  overlay.line(0, drawHeight, canvasWidth, drawHeight);

  // Checkbox for auto-rotate
  overlay.noStroke();
  overlay.fill(255);
  overlay.stroke(100);
  overlay.strokeWeight(1.5);
  overlay.rect(checkX, checkY, checkSize, checkSize, 3);

  if (autoRotate) {
    // Draw checkmark
    overlay.stroke(25, 118, 210);
    overlay.strokeWeight(2.5);
    overlay.noFill();
    overlay.line(checkX + 3, checkY + 10, checkX + 7, checkY + 14);
    overlay.line(checkX + 7, checkY + 14, checkX + 15, checkY + 4);
  }

  overlay.noStroke();
  overlay.fill(0);
  overlay.textSize(14);
  overlay.textAlign(LEFT, CENTER);
  overlay.text('Auto-rotate', checkX + checkSize + 8, checkY + checkSize / 2);

  // Slider track
  let sliderTrackY = sliderY;
  overlay.stroke(180);
  overlay.strokeWeight(3);
  overlay.line(sliderX, sliderTrackY, sliderX + sliderW, sliderTrackY);

  // Slider filled portion
  let thumbX = sliderX + sliderVal * sliderW;
  overlay.stroke(25, 118, 210);
  overlay.strokeWeight(3);
  overlay.line(sliderX, sliderTrackY, thumbX, sliderTrackY);

  // Slider thumb
  overlay.fill(25, 118, 210);
  overlay.noStroke();
  overlay.circle(thumbX, sliderTrackY, 14);

  // Slider label
  overlay.fill(0);
  overlay.textSize(14);
  overlay.textAlign(LEFT, CENTER);
  overlay.text('Speed: ' + (sliderVal * 2).toFixed(1), sliderX + sliderW + 15, sliderTrackY);

  // Drag hint
  overlay.fill(120);
  overlay.textSize(11);
  overlay.textAlign(RIGHT, CENTER);
  overlay.text('Drag to rotate 3D view', canvasWidth - 15, sliderTrackY);
}

function drawBox3D() {
  push();

  // Draw semi-transparent box faces
  fill(255, 255, 255, 100);
  stroke(0);
  strokeWeight(2);
  box(boxW, boxH, boxD);

  pop();
}

function drawParallelLines() {
  push();
  stroke(25, 118, 210); // Blue #1976D2
  strokeWeight(4);

  // Left front vertical edge (Line m)
  let x1 = -boxW / 2;
  let z1 = boxD / 2;
  line(x1, -boxH / 2, z1, x1, boxH / 2, z1);

  // Right back vertical edge (Line n) - parallel to Line m
  let x2 = boxW / 2;
  let z2 = -boxD / 2;
  line(x2, -boxH / 2, z2, x2, boxH / 2, z2);

  // Draw parallel symbol (||) between the lines at midpoints
  strokeWeight(2);
  let midY = 0;
  let midX = 0;
  let midZ = 0;
  // Small parallel bars near the midpoint of the box
  let barLen = 8;
  let barGap = 5;
  line(midX - barGap, midY - barLen, midZ + boxD / 4,
       midX - barGap, midY + barLen, midZ + boxD / 4);
  line(midX + barGap, midY - barLen, midZ + boxD / 4,
       midX + barGap, midY + barLen, midZ + boxD / 4);

  pop();
}

function drawPerpendicularLines() {
  push();
  stroke(229, 57, 53); // Red #E53935
  strokeWeight(4);

  // Right front vertical edge (Line p)
  let cornerX = boxW / 2;
  let cornerY = boxH / 2;
  let cornerZ = boxD / 2;
  line(cornerX, -boxH / 2, cornerZ, cornerX, boxH / 2, cornerZ);

  // Bottom front horizontal edge (Line q)
  line(-boxW / 2, boxH / 2, boxD / 2, boxW / 2, boxH / 2, boxD / 2);

  // Right angle indicator at corner
  drawRightAngleIndicator(cornerX, cornerY, cornerZ);

  pop();
}

function drawSkewLines() {
  push();
  stroke(67, 160, 71); // Green #43A047
  strokeWeight(4);

  // Top front horizontal edge (Line r)
  let r1x = -boxW / 2, r1y = -boxH / 2, r1z = boxD / 2;
  let r2x = boxW / 2, r2y = -boxH / 2, r2z = boxD / 2;
  line(r1x, r1y, r1z, r2x, r2y, r2z);

  // Bottom back horizontal edge (Line s)
  let s1x = -boxW / 2, s1y = boxH / 2, s1z = -boxD / 2;
  let s2x = boxW / 2, s2y = boxH / 2, s2z = -boxD / 2;
  line(s1x, s1y, s1z, s2x, s2y, s2z);

  // Dashed line showing shortest distance between them
  drawDashedLine3D(0, r1y, r1z, 0, s1y, s1z);

  pop();
}

function drawRightAngleIndicator(x, y, z) {
  push();
  stroke(229, 57, 53);
  strokeWeight(2);
  noFill();

  let sz = 15;

  // Small square at the corner
  beginShape();
  vertex(x, y - sz, z);
  vertex(x + sz * 0.01, y - sz, z); // tiny offset to avoid degenerate
  vertex(x, y - sz, z);
  endShape();

  // Draw the right angle square in the YZ plane at the corner
  line(x, y - sz, z, x, y - sz, z - sz);
  line(x, y - sz, z - sz, x, y, z - sz);

  pop();
}

function drawDashedLine3D(x1, y1, z1, x2, y2, z2) {
  push();
  stroke(67, 160, 71, 180);
  strokeWeight(2);

  let steps = 12;
  for (let i = 0; i < steps; i++) {
    if (i % 2 === 0) {
      let t1 = i / steps;
      let t2 = (i + 0.6) / steps;
      line(
        lerp(x1, x2, t1), lerp(y1, y2, t1), lerp(z1, z2, t1),
        lerp(x1, x2, t2), lerp(y1, y2, t2), lerp(z1, z2, t2)
      );
    }
  }

  pop();
}

// ---- Interaction ----

let draggingSlider = false;

function mousePressed() {
  // Check checkbox click
  if (mouseX >= checkX && mouseX <= checkX + checkSize + 80 &&
      mouseY >= checkY && mouseY <= checkY + checkSize) {
    autoRotate = !autoRotate;
    return false;
  }

  // Check slider click
  let thumbX = sliderX + sliderVal * sliderW;
  if (mouseY >= sliderY - 10 && mouseY <= sliderY + 10 &&
      mouseX >= sliderX - 5 && mouseX <= sliderX + sliderW + 5) {
    draggingSlider = true;
    sliderVal = constrain((mouseX - sliderX) / sliderW, 0, 1);
    return false;
  }
}

function mouseDragged() {
  if (draggingSlider) {
    sliderVal = constrain((mouseX - sliderX) / sliderW, 0, 1);
    return false;
  }

  // Manual rotation of 3D view (only in draw area)
  if (mouseY < drawHeight && mouseY > 0 && mouseX > 0 && mouseX < canvasWidth) {
    let dx = mouseX - pmouseX;
    let dy = mouseY - pmouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    return false;
  }
}

function mouseReleased() {
  draggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  overlay.resizeCanvas(canvasWidth, canvasHeight);

  // Recalculate slider position
  sliderY = drawHeight + 25;
  checkY = drawHeight + 16;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    let containerWidth = container.offsetWidth;
    if (containerWidth > 0) {
      canvasWidth = containerWidth;
    }
  }
}
