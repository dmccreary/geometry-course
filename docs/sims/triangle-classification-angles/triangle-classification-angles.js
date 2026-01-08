// Triangle Classification by Angles
// Shows acute, right, and obtuse triangles

let canvasWidth = 800;
let drawHeight = 420;
let canvasHeight = drawHeight;

let selectedType = -1; // -1 = show all, 0-2 = highlight one

let triangleTypes = [
  {
    name: "Acute",
    definition: "All angles less than 90°",
    angles: [70, 60, 50],
    color: '#7B1FA2'
  },
  {
    name: "Right",
    definition: "One angle equals 90°",
    angles: [90, 60, 30],
    color: '#D32F2F'
  },
  {
    name: "Obtuse",
    definition: "One angle greater than 90°",
    angles: [120, 40, 20],
    color: '#00796B'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Three types of triangles classified by angle measures', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Triangle Classification by Angles", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Click a triangle type to highlight', canvasWidth / 2, 35);

  drawTriangleTypes();

  // Note at bottom
  fill('#616161');
  textSize(11);
  textAlign(CENTER, BOTTOM);
  text('Every triangle has exactly ONE of these classifications by angle', canvasWidth / 2, canvasHeight - 10);
}

function drawTriangleTypes() {
  let panelWidth = (canvasWidth - 80) / 3;
  let startX = 30;
  let panelY = 50;
  let panelHeight = 330;

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
    let cy = panelY + 130;

    drawTriangle(cx, cy, tri.angles, tri.color, alpha, i);

    // Name
    noStroke();
    fill(red(color(tri.color)), green(color(tri.color)), blue(color(tri.color)), alpha);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(tri.name + " Triangle", cx, panelY + 240);
    textStyle(NORMAL);

    // Definition
    fill(66, 66, 66, alpha);
    textSize(12);
    textAlign(CENTER, TOP);
    let lines = wrapText(tri.definition, panelWidth - 20);
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], cx, panelY + 265 + j * 18);
    }

    // Side note
    if (i === 1) {
      fill(117, 117, 117, alpha);
      textSize(11);
      text("Right angle marked with square", cx, panelY + 295);
      text("Hypotenuse is longest side", cx, panelY + 310);
    } else if (i === 2) {
      text("Only one obtuse angle possible", cx, panelY + 295);
    }
  }
}

function drawTriangle(cx, cy, angles, col, alpha, type) {
  // Calculate triangle vertices from angles
  // Place first vertex at bottom left, second at bottom right
  // Acute and obtuse triangles are rotated 90°, so make them 50% larger to fill panel
  let baseLen = (type === 0 || type === 2) ? 216 : 144;
  let verticalOffset = (type === 0 || type === 2) ? 120 : 80;
  let ax = cx - baseLen / 2;
  let ay = cy + verticalOffset;
  let bx = cx + baseLen / 2;
  let by = cy + verticalOffset;

  // Angle at A = angles[0] or appropriate distribution
  let angleA, angleB, angleC;
  if (type === 0) { // Acute: 70, 60, 50
    angleA = 70;
    angleB = 60;
    angleC = 50;
  } else if (type === 1) { // Right: 90, 60, 30
    angleA = 30;
    angleB = 90;
    angleC = 60;
  } else { // Obtuse: 120, 40, 20
    angleA = 40;
    angleB = 20;
    angleC = 120;
  }

  // Calculate third vertex using angles
  let Cx, Cy;

  if (angleB === 90) {
    // Special case: right angle at B means C is directly above B
    Cx = bx;
    Cy = ay - tan(radians(angleA)) * (bx - ax);
  } else if (angleA === 90) {
    // Special case: right angle at A means C is directly above A
    Cx = ax;
    Cy = ay - tan(radians(angleB)) * (bx - ax);
  } else {
    // General case: find intersection of two rays
    let slope1 = -radians(angleA); // Direction from A toward C
    let slope2 = PI + radians(angleB); // Direction from B toward C

    let t = ((by - ay) - tan(slope2) * (bx - ax)) / (tan(slope1) - tan(slope2));
    Cx = ax + t * cos(slope1);
    Cy = ay + t * sin(slope1);
  }

  // Calculate centroid
  let centroidX = (ax + bx + Cx) / 3;
  let centroidY = (ay + by + Cy) / 3;

  // Rotate acute and obtuse triangles 90° clockwise to fit better in narrow panels
  if (type === 0 || type === 2) {
    // Rotate each vertex 90° clockwise around centroid
    // For 90° clockwise: newX = cx + (y - cy), newY = cy - (x - cx)
    let newAx = centroidX + (ay - centroidY);
    let newAy = centroidY - (ax - centroidX);
    let newBx = centroidX + (by - centroidY);
    let newBy = centroidY - (bx - centroidX);
    let newCx = centroidX + (Cy - centroidY);
    let newCy = centroidY - (Cx - centroidX);

    ax = newAx; ay = newAy;
    bx = newBx; by = newBy;
    Cx = newCx; Cy = newCy;

    // Recalculate centroid after rotation (should be same, but recalc for centering)
    centroidX = (ax + bx + Cx) / 3;
    centroidY = (ay + by + Cy) / 3;
  }

  // Center the triangle vertically
  let offsetY = cy - centroidY;
  let offsetX = cx - centroidX;
  ax += offsetX; ay += offsetY;
  bx += offsetX; by += offsetY;
  Cx += offsetX; Cy += offsetY;

  // Draw triangle
  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.3);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2);
  triangle(ax, ay, bx, by, Cx, Cy);

  // Draw angle arcs with measurements
  drawAngleWithMeasure(ax, ay, bx, by, Cx, Cy, angleA, col, alpha);
  drawAngleWithMeasure(bx, by, Cx, Cy, ax, ay, angleB, col, alpha);
  drawAngleWithMeasure(Cx, Cy, ax, ay, bx, by, angleC, col, alpha);

  // Vertex labels - position based on vertex location relative to centroid
  noStroke();
  fill(red(color(col)), green(color(col)), blue(color(col)), alpha);
  textStyle(BOLD);
  textSize(16);
  textAlign(CENTER, CENTER);

  // Calculate label positions based on direction from centroid
  let labelDist = 22;
  centroidX = (ax + bx + Cx) / 3;
  centroidY = (ay + by + Cy) / 3;

  let dirAx = ax - centroidX;
  let dirAy = ay - centroidY;
  let lenA = sqrt(dirAx * dirAx + dirAy * dirAy);
  text('A', ax + labelDist * dirAx / lenA, ay + labelDist * dirAy / lenA);

  let dirBx = bx - centroidX;
  let dirBy = by - centroidY;
  let lenB = sqrt(dirBx * dirBx + dirBy * dirBy);
  text('B', bx + labelDist * dirBx / lenB, by + labelDist * dirBy / lenB);

  let dirCx = Cx - centroidX;
  let dirCy = Cy - centroidY;
  let lenC = sqrt(dirCx * dirCx + dirCy * dirCy);
  text('C', Cx + labelDist * dirCx / lenC, Cy + labelDist * dirCy / lenC);

  textStyle(NORMAL);
}

function drawAngleWithMeasure(vx, vy, p1x, p1y, p2x, p2y, angleDeg, col, alpha) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  // Normalize angles
  if (a1 < 0) a1 += TWO_PI;
  if (a2 < 0) a2 += TWO_PI;

  // Swap if needed to get correct arc direction
  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  let c1 = color(col);

  if (angleDeg === 90) {
    // Draw right angle square
    stroke(red(c1), green(c1), blue(c1), alpha);
    strokeWeight(2);
    noFill();

    let size = 18;  // 60% larger than original 12
    let dir1 = atan2(p1y - vy, p1x - vx);
    let dir2 = atan2(p2y - vy, p2x - vx);

    let px1 = vx + size * cos(dir1);
    let py1 = vy + size * sin(dir1);
    let px2 = vx + size * cos(dir2);
    let py2 = vy + size * sin(dir2);
    let pCorner = {
      x: vx + size * cos(dir1) + size * cos(dir2),
      y: vy + size * sin(dir1) + size * sin(dir2)
    };

    line(px1, py1, pCorner.x, pCorner.y);
    line(px2, py2, pCorner.x, pCorner.y);

    // Add small square fill
    fill(red(c1), green(c1), blue(c1), alpha * 0.3);
    noStroke();
    quad(vx, vy, px1, py1, pCorner.x, pCorner.y, px2, py2);
  } else {
    // Draw arc
    stroke(red(c1), green(c1), blue(c1), alpha);
    strokeWeight(2);
    noFill();

    let radius = angleDeg > 90 ? 32 : 24;  // 60% larger than original 20/15
    arc(vx, vy, radius * 2, radius * 2, a1, a2);
  }

  // Angle label
  noStroke();
  fill(66, 66, 66, alpha);
  textSize(14);  // Larger text for readability
  textAlign(CENTER, CENTER);

  let midAngle = (a1 + a2) / 2;
  let labelDist = angleDeg > 90 ? 50 : 40;  // 60% larger than original 32/25
  let labelX = vx + labelDist * cos(midAngle);
  let labelY = vy + labelDist * sin(midAngle);
  text(angleDeg + "°", labelX, labelY);
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
  let panelY = 50;
  let panelHeight = 330;

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
