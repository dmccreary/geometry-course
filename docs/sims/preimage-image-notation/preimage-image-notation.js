// Pre-Image and Image Notation
// Introduces transformation terminology with before/after visualization

let canvasWidth = 800;
let drawHeight = 400;
let canvasHeight = drawHeight;

let animProgress = 0;
let isAnimating = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Diagram showing pre-image and image with transformation notation', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Pre-Image and Image: Transformation Notation", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click to animate the transformation', canvasWidth / 2, 35);

  // Update animation
  if (isAnimating) {
    animProgress += 0.02;
    if (animProgress >= 1) {
      animProgress = 1;
      isAnimating = false;
    }
  }

  drawPreImage();
  drawArrow();
  drawImage();
  drawCorrespondence();
  drawLabels();
}

function drawPreImage() {
  let cx = canvasWidth * 0.22;
  let cy = drawHeight / 2 + 20;
  let size = 80;

  // Triangle ABC
  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);

  let ax = cx - size * 0.6;
  let ay = cy + size * 0.5;
  let bx = cx + size * 0.6;
  let by = cy + size * 0.5;
  let Cx = cx;
  let Cy = cy - size * 0.5;

  triangle(ax, ay, bx, by, Cx, Cy);

  // Vertex labels
  noStroke();
  fill('#0D47A1');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('A', ax - 12, ay);
  text('B', bx + 8, by);
  textAlign(CENTER, BOTTOM);
  text('C', Cx, Cy - 5);
  textStyle(NORMAL);

  // Pre-image label
  fill('#424242');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Pre-Image', cx, cy + size * 0.7 + 10);
  textSize(10);
  fill('#757575');
  text('(original)', cx, cy + size * 0.7 + 26);
}

function drawImage() {
  let cx = canvasWidth * 0.78;
  let cy = drawHeight / 2 + 20;
  let size = 80;

  // Animated position
  let startX = canvasWidth * 0.22;
  let endX = canvasWidth * 0.78;
  let currentX = lerp(startX, endX, animProgress);

  if (animProgress < 1) {
    // Show ghost during animation
    fill(76, 175, 80, 100);
    stroke(46, 125, 50, 100);
  } else {
    fill('#4CAF50');
    stroke('#2E7D32');
  }
  strokeWeight(2);

  let ax = currentX - size * 0.6;
  let ay = cy + size * 0.5;
  let bx = currentX + size * 0.6;
  let by = cy + size * 0.5;
  let Cx = currentX;
  let Cy = cy - size * 0.5;

  triangle(ax, ay, bx, by, Cx, Cy);

  // Only show labels when animation complete
  if (animProgress >= 1) {
    noStroke();
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("A'", ax - 12, ay);
    text("B'", bx + 8, by);
    textAlign(CENTER, BOTTOM);
    text("C'", Cx, Cy - 5);
    textStyle(NORMAL);

    // Image label
    fill('#424242');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Image', cx, cy + size * 0.7 + 10);
    textSize(10);
    fill('#757575');
    text('(after transformation)', cx, cy + size * 0.7 + 26);
  }
}

function drawArrow() {
  let startX = canvasWidth * 0.35;
  let endX = canvasWidth * 0.65;
  let y = drawHeight / 2;

  // Curved arrow
  noFill();
  stroke('#E65100');
  strokeWeight(3);

  beginShape();
  vertex(startX, y);
  bezierVertex(startX + 50, y - 60, endX - 50, y - 60, endX, y);
  endShape();

  // Arrow head
  push();
  translate(endX, y);
  rotate(PI / 4);
  line(0, 0, -15, 0);
  line(0, 0, 0, -15);
  pop();

  // Label
  noStroke();
  fill('#E65100');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('Transformation', canvasWidth / 2, y - 65);
  textStyle(NORMAL);
}

function drawCorrespondence() {
  if (animProgress < 1) return;

  let leftCx = canvasWidth * 0.22;
  let rightCx = canvasWidth * 0.78;
  let cy = drawHeight / 2 + 20;
  let size = 80;

  // Dashed lines connecting corresponding vertices
  stroke('#9E9E9E');
  strokeWeight(1);
  setLineDash([5, 3]);

  // A to A'
  let ax1 = leftCx - size * 0.6;
  let ax2 = rightCx - size * 0.6;
  let ay = cy + size * 0.5;
  line(ax1, ay, ax2, ay);

  // B to B'
  let bx1 = leftCx + size * 0.6;
  let bx2 = rightCx + size * 0.6;
  let by = cy + size * 0.5;
  line(bx1, by, bx2, by);

  // C to C'
  let cx1 = leftCx;
  let cx2 = rightCx;
  let cY = cy - size * 0.5;
  line(cx1, cY, cx2, cY);

  setLineDash([]);
}

function drawLabels() {
  // Correspondence notation at bottom
  let y = drawHeight - 30;

  fill('#424242');
  textSize(13);
  textAlign(CENTER, CENTER);

  let labels = ["A → A'", "B → B'", "C → C'"];
  let spacing = 120;
  let startX = canvasWidth / 2 - spacing;

  for (let i = 0; i < 3; i++) {
    let colors = ['#D32F2F', '#2E7D32', '#1565C0'];
    fill(colors[i]);
    text(labels[i], startX + i * spacing, y);
  }
}

function mousePressed() {
  if (mouseY < drawHeight) {
    animProgress = 0;
    isAnimating = true;
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
    canvasWidth = max(canvasWidth, 600);
  }
}
