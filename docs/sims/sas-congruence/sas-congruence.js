// SAS Congruence Visualization
// Shows valid SAS vs invalid SSA (non-included angle)

let canvasWidth = 800;
let drawHeight = 450;
let canvasHeight = drawHeight;

let currentSide = 0; // 0 = both, 1 = left (valid), 2 = right (invalid)

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('SAS Congruence: Valid SAS vs Invalid SSA comparison', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("SAS Congruence: The Included Angle Matters", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click each side to focus, or click title area to see both', canvasWidth / 2, 32);

  drawComparison();
}

function drawComparison() {
  let panelWidth = (canvasWidth - 40) / 2;
  let panelY = 55;
  let panelHeight = 380;

  // Left panel - Valid SAS
  let leftX = 15;
  let leftSelected = currentSide === 0 || currentSide === 1;
  let leftAlpha = leftSelected ? 255 : 60;

  fill(255, 255, 255, leftAlpha);
  stroke(leftSelected ? '#4CAF50' : '#E0E0E0');
  strokeWeight(leftSelected ? 3 : 1);
  rect(leftX, panelY, panelWidth, panelHeight, 10);

  drawValidSAS(leftX, panelY, panelWidth, panelHeight, leftAlpha);

  // Right panel - Invalid SSA
  let rightX = leftX + panelWidth + 10;
  let rightSelected = currentSide === 0 || currentSide === 2;
  let rightAlpha = rightSelected ? 255 : 60;

  fill(255, 255, 255, rightAlpha);
  stroke(rightSelected ? '#F44336' : '#E0E0E0');
  strokeWeight(rightSelected ? 3 : 1);
  rect(rightX, panelY, panelWidth, panelHeight, 10);

  drawInvalidSSA(rightX, panelY, panelWidth, panelHeight, rightAlpha);
}

function drawValidSAS(x, y, w, h, alpha) {
  let cx = x + w / 2;

  // Title
  noStroke();
  fill(76, 175, 80, alpha);
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Valid SAS ✓", cx, y + 15);
  textStyle(NORMAL);

  // Draw two congruent triangles
  let scale = 14;
  let triY1 = y + 100;
  let triY2 = y + 220;

  // Triangle ABC
  drawSASTriangle(cx - 40, triY1, scale, '#1565C0', alpha, ['A', 'B', 'C'], true);

  // Triangle DEF
  drawSASTriangle(cx + 40, triY2, scale, '#43A047', alpha, ['D', 'E', 'F'], true);

  // Congruence marks explanation
  fill(66, 66, 66, alpha);
  textSize(10);
  textAlign(CENTER, TOP);
  text("AB ≅ DE (one tick)", cx, y + h - 130);
  text("BC ≅ EF (two ticks)", cx, y + h - 115);
  text("∠B ≅ ∠E = 50° (included)", cx, y + h - 100);

  // Highlight "included"
  fill(76, 175, 80, alpha);
  textSize(11);
  textStyle(BOLD);
  text("Angle is BETWEEN the two sides", cx, y + h - 75);
  textStyle(NORMAL);

  // Conclusion
  fill(76, 175, 80, alpha);
  textSize(12);
  textStyle(BOLD);
  text("△ABC ≅ △DEF", cx, y + h - 45);
  textStyle(NORMAL);

  // Checkmark
  fill(76, 175, 80, alpha);
  textSize(24);
  text("✓", cx, y + h - 25);
}

function drawInvalidSSA(x, y, w, h, alpha) {
  let cx = x + w / 2;

  // Title
  noStroke();
  fill(244, 67, 54, alpha);
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("NOT SAS (This is SSA) ✗", cx, y + 15);
  textStyle(NORMAL);

  // Draw two triangles with same SSA but different shapes
  let scale = 14;
  let triY1 = y + 100;
  let triY2 = y + 220;

  // First triangle with non-included angle
  drawSSATriangle(cx - 50, triY1, scale, '#F44336', alpha, ['A', 'B', 'C'], 1);

  // Second possible triangle (ambiguous case)
  drawSSATriangle(cx + 50, triY2, scale, '#FF9800', alpha, ['A\'', 'B\'', 'C\''], 2);

  // Explanation
  fill(66, 66, 66, alpha);
  textSize(10);
  textAlign(CENTER, TOP);
  text("AB ≅ A'B' (one tick)", cx, y + h - 130);
  text("AC ≅ A'C' (two ticks)", cx, y + h - 115);
  text("∠C ≅ ∠C' (NOT between AB and AC!)", cx, y + h - 100);

  // Warning
  fill(244, 67, 54, alpha);
  textSize(11);
  textStyle(BOLD);
  text("Angle is NOT between the sides!", cx, y + h - 75);
  textStyle(NORMAL);

  // Conclusion
  fill(244, 67, 54, alpha);
  textSize(12);
  textStyle(BOLD);
  text("SSA is NOT sufficient!", cx, y + h - 45);
  textStyle(NORMAL);

  fill(117, 117, 117, alpha);
  textSize(10);
  text("Two different triangles possible", cx, y + h - 25);
}

function drawSASTriangle(cx, cy, scale, col, alpha, labels, showAngle) {
  // SAS: two sides and included angle
  // Sides: AB = 5, BC = 6, included angle B = 50°
  let ab = 5 * scale;
  let bc = 6 * scale;
  let angleB = radians(50);

  // Vertices
  let bx = cx;
  let by = cy + 30;
  let ax = bx - ab;
  let ay = by;
  let Cx = bx + bc * cos(-angleB);
  let Cy = by + bc * sin(-angleB);

  // Draw triangle
  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.25);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Tick marks for congruent sides
  drawTicks(ax, ay, bx, by, 1, col, alpha); // AB - one tick
  drawTicks(bx, by, Cx, Cy, 2, col, alpha); // BC - two ticks

  // Angle arc at B (included angle)
  if (showAngle) {
    let a1 = atan2(ay - by, ax - bx);
    let a2 = atan2(Cy - by, Cx - bx);

    stroke(red(c1), green(c1), blue(c1), alpha);
    strokeWeight(2);
    noFill();
    arc(bx, by, 25, 25, a2, a1);

    // Angle label
    noStroke();
    fill(66, 66, 66, alpha);
    textSize(9);
    textAlign(CENTER, CENTER);
    let midAngle = (a1 + a2) / 2;
    text("50°", bx + 20 * cos(midAngle), by + 20 * sin(midAngle));
  }

  // Vertex labels
  noStroke();
  fill(red(c1), green(c1), blue(c1), alpha);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(labels[0], ax - 12, ay + 5);
  text(labels[1], bx, by + 15);
  text(labels[2], Cx + 10, Cy - 8);
  textStyle(NORMAL);
}

function drawSSATriangle(cx, cy, scale, col, alpha, labels, variant) {
  // SSA: two sides and NON-included angle
  // This shows the ambiguous case

  let ab = 5 * scale;
  let ac = 6 * scale;
  let angleC = radians(30); // Non-included angle at C

  // Calculate vertices (different positions based on variant)
  let ax = cx - 40;
  let ay = cy + 20;

  // For SSA ambiguous case, we get two different triangles
  let bx, by, Cx, Cy;

  if (variant === 1) {
    // First possible triangle
    Cx = ax + ac;
    Cy = ay;
    // B is above the AC line
    let angleAtA = radians(40);
    bx = ax + ab * cos(-angleAtA);
    by = ay + ab * sin(-angleAtA);
  } else {
    // Second possible triangle (reflected)
    Cx = ax + ac * 0.9;
    Cy = ay;
    let angleAtA = radians(60);
    bx = ax + ab * cos(-angleAtA);
    by = ay + ab * sin(-angleAtA);
  }

  // Draw triangle
  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.25);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Tick marks
  drawTicks(ax, ay, bx, by, 1, col, alpha); // AB - one tick
  drawTicks(ax, ay, Cx, Cy, 2, col, alpha); // AC - two ticks

  // Angle arc at C (non-included)
  let a1 = atan2(ay - Cy, ax - Cx);
  let a2 = atan2(by - Cy, bx - Cx);

  if (a1 > a2) [a1, a2] = [a2, a1];

  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);
  noFill();
  arc(Cx, Cy, 20, 20, a1, a2);

  // Vertex labels
  noStroke();
  fill(red(c1), green(c1), blue(c1), alpha);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(labels[0], ax - 10, ay + 12);
  text(labels[1], bx - 5, by - 12);
  text(labels[2], Cx + 12, Cy + 5);
  textStyle(NORMAL);
}

function drawTicks(x1, y1, x2, y2, count, col, alpha) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI/2);

  let c1 = color(col);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);

  let spacing = 4;
  let len = 8;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count-1)/2) * spacing;
    line(offset, -len/2, offset, len/2);
  }
  pop();
}

function mousePressed() {
  let panelWidth = (canvasWidth - 40) / 2;
  let panelY = 55;
  let panelHeight = 380;
  let leftX = 15;
  let rightX = leftX + panelWidth + 10;

  // Check left panel
  if (mouseX >= leftX && mouseX <= leftX + panelWidth &&
      mouseY >= panelY && mouseY <= panelY + panelHeight) {
    currentSide = currentSide === 1 ? 0 : 1;
    return;
  }

  // Check right panel
  if (mouseX >= rightX && mouseX <= rightX + panelWidth &&
      mouseY >= panelY && mouseY <= panelY + panelHeight) {
    currentSide = currentSide === 2 ? 0 : 2;
    return;
  }

  // Click outside shows both
  currentSide = 0;
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
