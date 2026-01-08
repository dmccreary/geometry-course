// Triangle Congruence Criteria
// Shows all five criteria (SSS, SAS, ASA, AAS, HL) plus non-examples

let canvasWidth = 800;
let drawHeight = 550;
let canvasHeight = drawHeight;

let selectedCriterion = 0;

let criteria = [
  {
    name: "SSS",
    full: "Side-Side-Side",
    desc: "Three sides congruent",
    valid: true,
    marks: ["side", "side", "side"]
  },
  {
    name: "SAS",
    full: "Side-Angle-Side",
    desc: "Two sides and included angle",
    valid: true,
    marks: ["side", "angle", "side"]
  },
  {
    name: "ASA",
    full: "Angle-Side-Angle",
    desc: "Two angles and included side",
    valid: true,
    marks: ["angle", "side", "angle"]
  },
  {
    name: "AAS",
    full: "Angle-Angle-Side",
    desc: "Two angles and non-included side",
    valid: true,
    marks: ["angle", "angle", "side"]
  },
  {
    name: "HL",
    full: "Hypotenuse-Leg",
    desc: "Right triangles only",
    valid: true,
    marks: ["right", "hyp", "leg"]
  },
  {
    name: "AAA",
    full: "Angle-Angle-Angle",
    desc: "NOT sufficient! (similar only)",
    valid: false,
    marks: ["angle", "angle", "angle"]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Five triangle congruence criteria with visual examples', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Triangle Congruence Criteria", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click a criterion to see the example', canvasWidth / 2, 35);

  drawCriteriaButtons();
  drawExample(criteria[selectedCriterion]);
  drawValidityStatus();
}

function drawCriteriaButtons() {
  let btnW = (canvasWidth - 80) / 6;
  let btnH = 35;
  let startX = 35;
  let y = 55;

  for (let i = 0; i < criteria.length; i++) {
    let x = startX + i * (btnW + 5);
    let crit = criteria[i];

    if (i === selectedCriterion) {
      fill(crit.valid ? '#1565C0' : '#E53935');
    } else {
      fill(crit.valid ? '#BBDEFB' : '#FFCDD2');
    }
    noStroke();
    rect(x, y, btnW, btnH, 5);

    fill(i === selectedCriterion ? 'white' : (crit.valid ? '#0D47A1' : '#B71C1C'));
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(crit.name, x + btnW / 2, y + btnH / 2);
    textStyle(NORMAL);
  }
}

function drawExample(crit) {
  let centerY = 280;
  let triSize = 90;

  // Draw two example triangles
  let leftX = canvasWidth * 0.28;
  let rightX = canvasWidth * 0.72;

  // Triangle 1 (blue)
  drawExampleTriangle(leftX, centerY, triSize, '#1565C0', '#0D47A1', crit, false);

  // Congruence symbol between
  fill('#424242');
  textSize(24);
  textAlign(CENTER, CENTER);
  text('≅', canvasWidth / 2, centerY);

  // Triangle 2 (green)
  drawExampleTriangle(rightX, centerY, triSize, '#4CAF50', '#2E7D32', crit, true);

  // Labels below triangles
  fill('#424242');
  textSize(12);
  textAlign(CENTER, TOP);
  text('△ABC', leftX, centerY + triSize + 30);
  text('△DEF', rightX, centerY + triSize + 30);

  // Criterion description
  fill('#424242');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(crit.full, canvasWidth / 2, 105);
  textStyle(NORMAL);

  fill('#757575');
  textSize(13);
  text(crit.desc, canvasWidth / 2, 130);

  // Formula / rule
  let formula = getFormula(crit);
  fill('#1565C0');
  textSize(12);
  text(formula, canvasWidth / 2, drawHeight - 100);
}

function drawExampleTriangle(cx, cy, size, fillColor, strokeColor, crit, isSecond) {
  // Adjust triangle shape for HL (right triangle)
  let ax, ay, bx, by, Cx, Cy;

  if (crit.name === "HL") {
    // Right triangle
    ax = cx - size * 0.6;
    ay = cy + size * 0.4;
    bx = cx + size * 0.6;
    by = cy + size * 0.4;
    Cx = cx - size * 0.6;
    Cy = cy - size * 0.5;
  } else {
    // Regular triangle
    ax = cx - size * 0.6;
    ay = cy + size * 0.4;
    bx = cx + size * 0.6;
    by = cy + size * 0.4;
    Cx = cx;
    Cy = cy - size * 0.6;
  }

  // Fill and stroke
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Draw marks based on criterion
  noFill();
  strokeWeight(2);

  if (crit.name === "SSS") {
    // Three sides marked
    drawSideTicks(ax, ay, bx, by, 1);
    drawSideTicks(bx, by, Cx, Cy, 2);
    drawSideTicks(Cx, Cy, ax, ay, 3);
  } else if (crit.name === "SAS") {
    // Two sides and included angle
    drawSideTicks(ax, ay, bx, by, 1);
    drawSideTicks(bx, by, Cx, Cy, 2);
    drawAngleArc(bx, by, ax, ay, Cx, Cy, 1); // Angle at B
  } else if (crit.name === "ASA") {
    // Two angles and included side
    drawAngleArc(ax, ay, bx, by, Cx, Cy, 1); // Angle at A
    drawSideTicks(ax, ay, bx, by, 1);
    drawAngleArc(bx, by, Cx, Cy, ax, ay, 2); // Angle at B
  } else if (crit.name === "AAS") {
    // Two angles and non-included side
    drawAngleArc(ax, ay, bx, by, Cx, Cy, 1); // Angle at A
    drawAngleArc(bx, by, Cx, Cy, ax, ay, 2); // Angle at B
    drawSideTicks(bx, by, Cx, Cy, 1);
  } else if (crit.name === "HL") {
    // Right angle, hypotenuse, leg
    drawRightAngle(ax, ay, bx, by, Cx, Cy);
    drawSideTicks(bx, by, Cx, Cy, 1); // Hypotenuse
    drawSideTicks(Cx, Cy, ax, ay, 2); // Leg
  } else if (crit.name === "AAA") {
    // Three angles
    drawAngleArc(ax, ay, bx, by, Cx, Cy, 1);
    drawAngleArc(bx, by, Cx, Cy, ax, ay, 2);
    drawAngleArc(Cx, Cy, ax, ay, bx, by, 3);
  }

  // Vertex labels
  noStroke();
  fill(strokeColor);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(isSecond ? 'D' : 'A', ax - 12, ay);
  text(isSecond ? 'E' : 'B', bx + 8, by);
  textAlign(CENTER, BOTTOM);
  text(isSecond ? 'F' : 'C', Cx, Cy - 8);
  textStyle(NORMAL);
}

function drawSideTicks(x1, y1, x2, y2, count) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI / 2);

  stroke('#FF5722');
  strokeWeight(2);

  let spacing = 6;
  let len = 10;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count - 1) / 2) * spacing;
    line(offset, -len / 2, offset, len / 2);
  }
  pop();
}

function drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, marks) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  stroke('#9C27B0');
  strokeWeight(2);
  noFill();

  let radius = 18 + marks * 3;
  arc(vx, vy, radius * 2, radius * 2, a1, a2);
}

function drawRightAngle(ax, ay, bx, by, cx, cy) {
  // Draw right angle symbol at A (which is at ax, ay in HL triangle)
  let size = 12;

  stroke('#E53935');
  strokeWeight(2);
  noFill();

  // Right angle is at vertex A (bottom left)
  push();
  translate(ax, ay);

  // Draw small square
  line(size, 0, size, -size);
  line(size, -size, 0, -size);
  pop();
}

function getFormula(crit) {
  switch (crit.name) {
    case "SSS":
      return "AB≅DE, BC≅EF, AC≅DF → △ABC≅△DEF";
    case "SAS":
      return "AB≅DE, ∠B≅∠E, BC≅EF → △ABC≅△DEF";
    case "ASA":
      return "∠A≅∠D, AB≅DE, ∠B≅∠E → △ABC≅△DEF";
    case "AAS":
      return "∠A≅∠D, ∠B≅∠E, BC≅EF → △ABC≅△DEF";
    case "HL":
      return "Right ∠C≅∠F, BC≅EF (hyp), AC≅DF (leg) → △ABC≅△DEF";
    case "AAA":
      return "∠A≅∠D, ∠B≅∠E, ∠C≅∠F → Similar, NOT Congruent!";
    default:
      return "";
  }
}

function drawValidityStatus() {
  let crit = criteria[selectedCriterion];
  let boxW = 280;
  let boxH = 50;
  let boxX = canvasWidth / 2 - boxW / 2;
  let boxY = drawHeight - 70;

  if (crit.valid) {
    fill('#E8F5E9');
    stroke('#4CAF50');
  } else {
    fill('#FFEBEE');
    stroke('#E53935');
  }
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  if (crit.valid) {
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('✓ SUFFICIENT for congruence', boxX + boxW / 2, boxY + boxH / 2);
  } else {
    fill('#C62828');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('✗ NOT SUFFICIENT', boxX + boxW / 2, boxY + 18);
    textStyle(NORMAL);
    textSize(11);
    text('(Same shape, different size possible)', boxX + boxW / 2, boxY + 36);
  }
  textStyle(NORMAL);
}

function mousePressed() {
  let btnW = (canvasWidth - 80) / 6;
  let btnH = 35;
  let startX = 35;
  let y = 55;

  for (let i = 0; i < criteria.length; i++) {
    let x = startX + i * (btnW + 5);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
      selectedCriterion = i;
      return;
    }
  }
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
