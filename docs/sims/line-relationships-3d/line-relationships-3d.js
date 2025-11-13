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

// 2D graphics buffer for text overlay
let textLayer;

// Font for WebGL text rendering
let font;

function preload() {
  // Preload font for WebGL text rendering
  // Using a Google Fonts CDN font
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  // Try to parent to main element, but work standalone too
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }

  // Set the font for WebGL text rendering
  textFont(font);

  // Create a 2D graphics buffer for text overlays
  textLayer = createGraphics(canvasWidth, canvasHeight);
  textLayer.textFont(font);

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
      textLayer.resizeCanvas(canvasWidth, canvasHeight);
      rotationSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }

  // Clear background
  background(227, 242, 253);

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

  // Draw 2D overlay elements (title, legend, labels) on the text layer
  draw2DOverlay();

  // Draw the text layer on top of the 3D scene
  push();
  resetMatrix();
  camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
  ortho(0, width, 0, height, -1000, 1000);
  texture(textLayer);
  noStroke();
  plane(width, height);
  pop();
}

function draw2DOverlay() {
  // Clear the text layer
  textLayer.clear();

  // Title at top
  textLayer.fill('black');
  textLayer.textSize(24);
  textLayer.textAlign(CENTER, TOP);
  textLayer.noStroke();
  textLayer.text('Line Relationships in 3D Space', canvasWidth/2, margin);

  // Draw annotations for line relationships
  drawAnnotations();

  // Draw legend
  drawLegend();

  // Control area white background
  textLayer.fill('white');
  textLayer.rect(0, drawHeight, canvasWidth, controlHeight);

  // Control labels
  textLayer.fill('black');
  textLayer.textSize(defaultTextSize);
  textLayer.textAlign(LEFT, CENTER);
  textLayer.text('Rotation Speed: ' + rotationSpeed.toFixed(1), sliderLeftMargin + 10, drawHeight + 25);
}

function drawAnnotations() {
  // Draw text annotations for the three line relationships
  let leftX = 30;
  let startY = 80;
  let spacing = 60;

  textLayer.textAlign(LEFT, TOP);
  textLayer.textSize(14);

  // Parallel lines annotation
  textLayer.fill(25, 118, 210);
  textLayer.noStroke();
  textLayer.text('Parallel lines (m ∥ n):', leftX, startY);
  textLayer.textSize(11);
  textLayer.text('Same plane, never intersect', leftX, startY + 18);

  // Perpendicular lines annotation
  startY += spacing;
  textLayer.textSize(14);
  textLayer.fill(229, 57, 53);
  textLayer.text('Perpendicular lines (p ⊥ q):', leftX, startY);
  textLayer.textSize(11);
  textLayer.text('Intersect at 90°', leftX, startY + 18);

  // Skew lines annotation
  startY += spacing;
  textLayer.textSize(14);
  textLayer.fill(67, 160, 71);
  textLayer.text('Skew lines (r, s):', leftX, startY);
  textLayer.textSize(11);
  textLayer.text('Different planes, never intersect', leftX, startY + 18);
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
  // Position legend in lower right area (above control region)
  let legendX = canvasWidth - 290;
  let legendY = drawHeight - 130;

  // Semi-transparent background
  textLayer.fill(255, 255, 255, 230);
  textLayer.stroke(200);
  textLayer.strokeWeight(1);
  textLayer.rect(legendX, legendY, 260, 110, 5);

  // Legend title
  textLayer.fill(0);
  textLayer.noStroke();
  textLayer.textSize(14);
  textLayer.textAlign(LEFT, TOP);
  textLayer.text('Legend:', legendX + 10, legendY + 10);

  let yPos = legendY + 35;
  let spacing = 25;

  // Parallel lines
  textLayer.stroke(25, 118, 210);
  textLayer.strokeWeight(4);
  textLayer.line(legendX + 10, yPos, legendX + 40, yPos);
  textLayer.noStroke();
  textLayer.fill(25, 118, 210);
  textLayer.textSize(12);
  textLayer.text('Parallel (coplanar, no intersection)', legendX + 50, yPos - 7);

  // Perpendicular lines
  yPos += spacing;
  textLayer.stroke(229, 57, 53);
  textLayer.strokeWeight(4);
  textLayer.line(legendX + 10, yPos, legendX + 40, yPos);
  textLayer.noStroke();
  textLayer.fill(229, 57, 53);
  textLayer.text('Perpendicular (intersect at 90°)', legendX + 50, yPos - 7);

  // Skew lines
  yPos += spacing;
  textLayer.stroke(67, 160, 71);
  textLayer.strokeWeight(4);
  textLayer.line(legendX + 10, yPos, legendX + 40, yPos);
  textLayer.noStroke();
  textLayer.fill(67, 160, 71);
  textLayer.text('Skew (non-coplanar, no intersection)', legendX + 50, yPos - 7);
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
