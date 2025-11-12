// Line Relationships in 3D Space
// Demonstrates parallel, perpendicular, and skew lines using WebGL

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// Rotation controls
let rotationSlider;
let rotationSpeed = 0;
let autoRotate = true;
let autoRotateCheckbox;

// 3D box dimensions
let boxWidth = 300;
let boxHeight = 200;
let boxDepth = 150;

// Current rotation angles
let rotX = -0.3;
let rotY = 0;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  // Try to parent to main element, but work standalone too
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }

  // Create rotation speed slider
  rotationSlider = createSlider(0, 2, 0.5, 0.1);
  rotationSlider.position(sliderLeftMargin, drawHeight + 15);
  rotationSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Create auto-rotate checkbox
  autoRotateCheckbox = createCheckbox('Auto-rotate', true);
  autoRotateCheckbox.position(10, drawHeight + 20);
  autoRotateCheckbox.changed(() => {
    autoRotate = autoRotateCheckbox.checked();
  });

  describe('3D visualization showing parallel lines (blue), perpendicular lines (red), and skew lines (green) within a transparent box', LABEL);
}

function draw() {
  // Handle responsive width
  if (typeof document !== 'undefined') {
    const main = document.querySelector('main');
    if (main && main.offsetWidth !== canvasWidth) {
      canvasWidth = main.offsetWidth;
      resizeCanvas(canvasWidth, canvasHeight);
      rotationSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }

  // Drawing area with gradient-like effect (top: light blue, bottom: gray)
  push();
  translate(-width/2, -height/2);
  // Top part - light blue
  fill(227, 242, 253);
  noStroke();
  rect(0, 0, width, drawHeight/2);
  // Bottom part - light gray
  fill(245, 245, 245);
  rect(0, drawHeight/2, width, drawHeight/2);
  pop();

  // Control area (white background)
  push();
  translate(-width/2, -height/2 + drawHeight);
  fill('white');
  noStroke();
  rect(0, 0, width, controlHeight);
  pop();

  // Title at top
  push();
  translate(-width/2, -height/2 + margin);
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Line Relationships in 3D Space', width/2, 0);
  pop();

  // Set up 3D view
  push();

  // Auto-rotate if enabled
  if (autoRotate) {
    rotationSpeed = rotationSlider.value();
    rotY += rotationSpeed * 0.01;
  }

  // Apply rotations
  rotateX(rotX);
  rotateY(rotY);

  // Draw the transparent box
  drawBox();

  // Draw parallel lines (blue)
  drawParallelLines();

  // Draw perpendicular lines (red)
  drawPerpendicularLines();

  // Draw skew lines (green)
  drawSkewLines();

  pop();

  // Draw legend
  drawLegend();

  // Draw control labels
  push();
  translate(-width/2, -height/2);
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Rotation Speed: ' + rotationSpeed.toFixed(1), sliderLeftMargin + 10, drawHeight + 25);
  pop();
}

function drawBox() {
  push();

  // Draw semi-transparent box faces
  fill(255, 255, 255, 100);
  stroke(0);
  strokeWeight(2);

  // Draw box using standard box() function
  box(boxWidth, boxHeight, boxDepth);

  pop();
}

function drawParallelLines() {
  push();

  // Two vertical edges on opposite sides of the box
  stroke(25, 118, 210); // Blue
  strokeWeight(4);

  // Left front vertical edge (Line m)
  let x1 = -boxWidth/2;
  let z1 = boxDepth/2;
  line(x1, -boxHeight/2, z1, x1, boxHeight/2, z1);

  // Right back vertical edge (Line n)
  let x2 = boxWidth/2;
  let z2 = -boxDepth/2;
  line(x2, -boxHeight/2, z2, x2, boxHeight/2, z2);

  // Labels
  fill(25, 118, 210);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text('m', x1, boxHeight/2 + 20, z1);
  text('n', x2, boxHeight/2 + 20, z2);

  // Parallel symbol
  text('∥', 0, boxHeight/2 + 40, 0);

  pop();
}

function drawPerpendicularLines() {
  push();

  // One vertical and one horizontal edge that meet at a corner
  stroke(229, 57, 53); // Red
  strokeWeight(4);

  // Vertical edge at left front corner (Line p)
  let x1 = -boxWidth/2;
  let z1 = boxDepth/2;
  line(x1, -boxHeight/2, z1, x1, boxHeight/2, z1);

  // Horizontal edge along bottom front (Line q)
  line(-boxWidth/2, boxHeight/2, boxDepth/2, boxWidth/2, boxHeight/2, boxDepth/2);

  // Draw right angle indicator at corner
  drawRightAngleIndicator(-boxWidth/2, boxHeight/2, boxDepth/2);

  // Labels
  fill(229, 57, 53);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text('p', x1 - 20, 0, z1);
  text('q', 0, boxHeight/2 + 20, boxDepth/2);

  // Perpendicular symbol
  text('⊥', -boxWidth/2 - 25, boxHeight/2 - 25, boxDepth/2);

  pop();
}

function drawSkewLines() {
  push();

  // One edge on front face and one edge on back face
  stroke(67, 160, 71); // Green
  strokeWeight(4);

  // Top front horizontal edge (Line r)
  let x1a = -boxWidth/2, y1a = -boxHeight/2, z1a = boxDepth/2;
  let x1b = boxWidth/2, y1b = -boxHeight/2, z1b = boxDepth/2;
  line(x1a, y1a, z1a, x1b, y1b, z1b);

  // Right back vertical edge (Line s)
  let x2 = boxWidth/2, z2 = -boxDepth/2;
  line(x2, -boxHeight/2, z2, x2, boxHeight/2, z2);

  // Dashed line showing shortest distance
  drawDashedLine(
    (x1a + x1b)/2, y1a, z1a,  // Midpoint of line r
    x2, 0, z2  // Midpoint of line s
  );

  // Labels
  fill(67, 160, 71);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text('r', 0, y1a - 20, z1a);
  text('s', x2 + 20, 0, z2);

  pop();
}

function drawRightAngleIndicator(x, y, z) {
  push();

  stroke(229, 57, 53);
  strokeWeight(2);
  noFill();

  let size = 15;

  // Draw small square at corner
  beginShape();
  vertex(x, y - size, z);
  vertex(x, y - size, z + size);
  vertex(x, y, z + size);
  endShape();

  pop();
}

function drawDashedLine(x1, y1, z1, x2, y2, z2) {
  push();

  stroke(67, 160, 71, 150);
  strokeWeight(2);

  let steps = 10;
  for (let i = 0; i < steps; i++) {
    if (i % 2 === 0) {
      let t1 = i / steps;
      let t2 = (i + 0.5) / steps;
      line(
        lerp(x1, x2, t1), lerp(y1, y2, t1), lerp(z1, z2, t1),
        lerp(x1, x2, t2), lerp(y1, y2, t2), lerp(z1, z2, t2)
      );
    }
  }

  pop();
}

function drawLegend() {
  push();

  // Position legend in bottom right
  let legendX = width/2 - 280;
  let legendY = -height/2 + drawHeight - 120;

  translate(legendX, legendY);

  // Semi-transparent background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(0, 0, 260, 110, 5);

  // Legend title
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Legend:', 10, 10);

  let yPos = 35;
  let spacing = 25;

  // Parallel lines
  stroke(25, 118, 210);
  strokeWeight(4);
  line(10, yPos, 40, yPos);
  noStroke();
  fill(25, 118, 210);
  textSize(12);
  text('Parallel (coplanar, no intersection)', 50, yPos - 7);

  // Perpendicular lines
  yPos += spacing;
  stroke(229, 57, 53);
  strokeWeight(4);
  line(10, yPos, 40, yPos);
  noStroke();
  fill(229, 57, 53);
  text('Perpendicular (intersect at 90°)', 50, yPos - 7);

  // Skew lines
  yPos += spacing;
  stroke(67, 160, 71);
  strokeWeight(4);
  line(10, yPos, 40, yPos);
  noStroke();
  fill(67, 160, 71);
  text('Skew (non-coplanar, no intersection)', 50, yPos - 7);

  pop();
}

function windowResized() {
  const main = document.querySelector('main');
  if (main) {
    canvasWidth = main.offsetWidth;
    resizeCanvas(canvasWidth, canvasHeight);
    rotationSlider.size(canvasWidth - sliderLeftMargin - margin);
  }
}

function mouseDragged() {
  if (mouseY < drawHeight && mouseY > 0) {
    // Manual rotation overrides auto-rotate temporarily
    let dx = mouseX - pmouseX;
    let dy = mouseY - pmouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    return false;
  }
}
