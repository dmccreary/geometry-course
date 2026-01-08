// Triangle Classification by Sides
// Shows scalene, isosceles, and equilateral triangles

let canvasWidth = 800;
let drawHeight = 420;
let canvasHeight = drawHeight;

let selectedType = -1; // -1 = show all, 0-2 = highlight one

let triangleTypes = [
  {
    name: "Scalene",
    definition: "All three sides different lengths",
    sides: [3, 4, 5],
    color: '#1565C0'
  },
  {
    name: "Isosceles",
    definition: "Two sides equal (congruent)",
    sides: [5, 5, 3],
    color: '#4CAF50'
  },
  {
    name: "Equilateral",
    definition: "All three sides equal",
    sides: [4, 4, 4],
    color: '#FF9800'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Three types of triangles classified by side lengths', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFDE7');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Triangle Classification by Sides", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click a triangle type to highlight', canvasWidth / 2, 35);

  drawTriangleTypes();
}

function drawTriangleTypes() {
  let panelWidth = (canvasWidth - 80) / 3;
  let startX = 30;
  let panelY = 60;
  let panelHeight = 340;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (panelWidth + 10);
    let tri = triangleTypes[i];
    let isSelected = selectedType === -1 || selectedType === i;
    let alpha = isSelected ? 255 : 80;

    // Panel background
    fill(255, 255, 255, alpha);
    stroke(isSelected ? tri.color : '#E0E0E0');
    strokeWeight(isSelected ? 3 : 1);
    rect(x, panelY, panelWidth, panelHeight, 10);

    // Draw triangle
    let cx = x + panelWidth / 2;
    let cy = panelY + 150;
    let scale = 25;

    drawTriangle(cx, cy, tri.sides, tri.color, alpha, i);

    // Name
    noStroke();
    fill(red(color(tri.color)), green(color(tri.color)), blue(color(tri.color)), alpha);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(tri.name + " Triangle", cx, panelY + 260);
    textStyle(NORMAL);

    // Definition
    fill(66, 66, 66, alpha);
    textSize(11);
    textAlign(CENTER, TOP);
    let lines = wrapText(tri.definition, panelWidth - 20);
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], cx, panelY + 285 + j * 15);
    }

    // Side note
    if (i === 1) {
      fill(117, 117, 117, alpha);
      textSize(10);
      text("Base angles are equal", cx, panelY + 320);
    } else if (i === 2) {
      text("All angles are 60°", cx, panelY + 320);
    }
  }
}

function drawTriangle(cx, cy, sides, col, alpha, type) {
  // Calculate triangle vertices based on side lengths
  let a = sides[0];
  let b = sides[1];
  let c = sides[2];

  let scale = 22;

  // Place base (side c) horizontally centered
  let ax = cx - c * scale / 2;
  let ay = cy + 40;
  let bx = cx + c * scale / 2;
  let by = cy + 40;

  // Calculate third vertex using cosine rule
  let angleA = acos((b * b + c * c - a * a) / (2 * b * c));
  let Cx = ax + b * scale * cos(-angleA);
  let Cy = ay + b * scale * sin(-angleA);

  // Draw triangle
  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.3);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Draw tick marks for equal sides
  if (type === 1) {
    // Isosceles: two sides equal (a = b, sides[0] = sides[1])
    drawTicks(ax, ay, Cx, Cy, 1, col, alpha);
    drawTicks(bx, by, Cx, Cy, 1, col, alpha);
  } else if (type === 2) {
    // Equilateral: all sides equal
    drawTicks(ax, ay, bx, by, 2, col, alpha);
    drawTicks(bx, by, Cx, Cy, 2, col, alpha);
    drawTicks(Cx, Cy, ax, ay, 2, col, alpha);
  }

  // Draw angle arcs for isosceles and equilateral
  if (type === 1) {
    // Base angles equal
    drawAngleArc(ax, ay, bx, by, Cx, Cy, col, alpha);
    drawAngleArc(bx, by, Cx, Cy, ax, ay, col, alpha);
  } else if (type === 2) {
    // All angles equal (60°)
    drawAngleArc(ax, ay, bx, by, Cx, Cy, col, alpha);
    drawAngleArc(bx, by, Cx, Cy, ax, ay, col, alpha);
    drawAngleArc(Cx, Cy, ax, ay, bx, by, col, alpha);
  }

  // Side labels
  noStroke();
  fill(66, 66, 66, alpha);
  textSize(10);
  textAlign(CENTER, CENTER);

  // Bottom side
  text(c + " cm", (ax + bx) / 2, (ay + by) / 2 + 15);

  // Left side
  let lmx = (ax + Cx) / 2;
  let lmy = (ay + Cy) / 2;
  text(b + " cm", lmx - 18, lmy);

  // Right side
  let rmx = (bx + Cx) / 2;
  let rmy = (by + Cy) / 2;
  text(a + " cm", rmx + 18, rmy);

  // Vertex labels
  fill(red(color(col)), green(color(col)), blue(color(col)), alpha);
  textStyle(BOLD);
  textSize(12);
  text('A', ax - 12, ay + 5);
  text('B', bx + 12, by + 5);
  text('C', Cx, Cy - 15);
  textStyle(NORMAL);
}

function drawTicks(x1, y1, x2, y2, count, col, alpha) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  let angle = atan2(y2 - y1, x2 - x1);

  push();
  translate(mx, my);
  rotate(angle + PI / 2);

  let c1 = color(col);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);

  let spacing = 5;
  let len = 8;

  for (let i = 0; i < count; i++) {
    let offset = (i - (count - 1) / 2) * spacing;
    line(offset, -len / 2, offset, len / 2);
  }
  pop();
}

function drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, col, alpha) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  let c1 = color(col);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(1.5);
  noFill();

  let radius = 15;
  arc(vx, vy, radius * 2, radius * 2, a1, a2);
}

function wrapText(txt, maxWidth) {
  let words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function mousePressed() {
  let panelWidth = (canvasWidth - 80) / 3;
  let startX = 30;
  let panelY = 60;
  let panelHeight = 340;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * (panelWidth + 10);
    if (mouseX >= x && mouseX <= x + panelWidth &&
        mouseY >= panelY && mouseY <= panelY + panelHeight) {
      selectedType = selectedType === i ? -1 : i;
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
