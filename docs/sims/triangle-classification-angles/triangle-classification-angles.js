// Triangle Classification by Angles
// Shows acute, right, and obtuse triangles
// Refactored to use push/pop/translate for cleaner drawing regions

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
    angles: [110, 40, 30],
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

    // Draw triangle in its own coordinate system
    let triangleCenterX = x + panelWidth / 2;
    let triangleCenterY = panelY + 130;

    drawTrianglePanel(triangleCenterX, triangleCenterY, tri, alpha, i, panelWidth);

    // Name
    noStroke();
    fill(red(color(tri.color)), green(color(tri.color)), blue(color(tri.color)), alpha);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(tri.name + " Triangle", x + panelWidth / 2, panelY + 240);
    textStyle(NORMAL);

    // Definition
    fill(66, 66, 66, alpha);
    textSize(12);
    textAlign(CENTER, TOP);
    let lines = wrapText(tri.definition, panelWidth - 20);
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], x + panelWidth / 2, panelY + 265 + j * 18);
    }

    // Side note
    fill(117, 117, 117, alpha);
    textSize(11);
    if (i === 1) {
      text("Right angle marked with square", x + panelWidth / 2, panelY + 295);
      text("Hypotenuse is longest side", x + panelWidth / 2, panelY + 310);
    } else if (i === 2) {
      text("Only one obtuse angle possible", x + panelWidth / 2, panelY + 295);
    }
  }
}

// Calculate triangle vertices from angles using law of sines
// Returns vertices in local coordinates centered at origin
function calculateTriangleVertices(angles, baseLength) {
  let angleA = radians(angles[0]);
  let angleB = radians(angles[1]);
  let angleC = radians(angles[2]);

  // Using law of sines: a/sin(A) = b/sin(B) = c/sin(C)
  // Let side c (opposite to angle C) be the base
  let sideC = baseLength;
  let k = sideC / sin(angleC);
  let sideA = k * sin(angleA); // opposite to A, connects B and C
  let sideB = k * sin(angleB); // opposite to B, connects A and C

  // Place vertex C at origin, vertex B along positive x-axis
  let Cx = 0;
  let Cy = 0;
  let Bx = sideA; // side a connects B and C
  let By = 0;

  // Vertex A is at angle (180° - angleC) from positive x-axis, distance sideB from C
  let Ax = sideB * cos(angleC);
  let Ay = -sideB * sin(angleC); // negative because y increases downward in canvas

  // Center the triangle at origin
  let centX = (Ax + Bx + Cx) / 3;
  let centY = (Ay + By + Cy) / 3;

  return {
    A: { x: Ax - centX, y: Ay - centY },
    B: { x: Bx - centX, y: By - centY },
    C: { x: Cx - centX, y: Cy - centY }
  };
}

function drawTrianglePanel(centerX, centerY, tri, alpha, typeIndex, panelWidth) {
  let angles = tri.angles;
  let col = tri.color;

  // Calculate triangle in local coordinates
  let baseLen = 100;
  let verts = calculateTriangleVertices(angles, baseLen);

  // Calculate bounding box to determine scale
  let minX = min(verts.A.x, verts.B.x, verts.C.x);
  let maxX = max(verts.A.x, verts.B.x, verts.C.x);
  let minY = min(verts.A.y, verts.B.y, verts.C.y);
  let maxY = max(verts.A.y, verts.B.y, verts.C.y);
  let triWidth = maxX - minX;
  let triHeight = maxY - minY;

  // Available drawing space
  let availWidth = panelWidth - 60;
  let availHeight = 160;

  // Scale to fit, with padding
  let scaleX = availWidth / triWidth;
  let scaleY = availHeight / triHeight;
  let scaleFactor = min(scaleX, scaleY) * 0.85;

  // Draw in local coordinate system
  push();
  translate(centerX, centerY);
  scale(scaleFactor);

  // Draw triangle fill and stroke
  let c1 = color(col);
  fill(red(c1), green(c1), blue(c1), alpha * 0.3);
  stroke(red(c1), green(c1), blue(c1), alpha);
  strokeWeight(2 / scaleFactor); // Compensate for scale
  triangle(verts.A.x, verts.A.y, verts.B.x, verts.B.y, verts.C.x, verts.C.y);

  // Draw angle arcs with measurements (in local coords)
  drawAngleArc(verts.A, verts.B, verts.C, angles[0], col, alpha, scaleFactor);
  drawAngleArc(verts.B, verts.C, verts.A, angles[1], col, alpha, scaleFactor);
  drawAngleArc(verts.C, verts.A, verts.B, angles[2], col, alpha, scaleFactor);

  // Draw vertex labels
  drawVertexLabels(verts, col, alpha, scaleFactor);

  pop();
}

function drawAngleArc(vertex, adj1, adj2, angleDeg, col, alpha, scaleFactor) {
  // vertex is the vertex where we draw the angle
  // adj1 and adj2 are the two adjacent vertices
  let vx = vertex.x;
  let vy = vertex.y;

  let a1 = atan2(adj1.y - vy, adj1.x - vx);
  let a2 = atan2(adj2.y - vy, adj2.x - vx);

  // Normalize angles to [0, TWO_PI)
  if (a1 < 0) a1 += TWO_PI;
  if (a2 < 0) a2 += TWO_PI;

  // Ensure we draw the smaller arc (interior angle)
  let diff = a2 - a1;
  if (diff < 0) diff += TWO_PI;

  let startAngle, endAngle;
  if (diff <= PI) {
    startAngle = a1;
    endAngle = a2;
  } else {
    startAngle = a2;
    endAngle = a1;
  }

  let c1 = color(col);

  if (angleDeg === 90) {
    // Draw right angle square
    stroke(red(c1), green(c1), blue(c1), alpha);
    strokeWeight(2 / scaleFactor);
    noFill();

    let size = 12 / scaleFactor;
    let dir1 = atan2(adj1.y - vy, adj1.x - vx);
    let dir2 = atan2(adj2.y - vy, adj2.x - vx);

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

    // Fill the right angle square
    fill(red(c1), green(c1), blue(c1), alpha * 0.3);
    noStroke();
    quad(vx, vy, px1, py1, pCorner.x, pCorner.y, px2, py2);
  } else {
    // Draw arc
    stroke(red(c1), green(c1), blue(c1), alpha);
    strokeWeight(2 / scaleFactor);
    noFill();

    // Adjust radius based on angle size
    let radius;
    if (angleDeg > 90) {
      radius = 20 / scaleFactor;
    } else if (angleDeg > 50) {
      radius = 16 / scaleFactor;
    } else if (angleDeg > 35) {
      radius = 18 / scaleFactor;
    } else {
      radius = 22 / scaleFactor;
    }

    arc(vx, vy, radius * 2, radius * 2, startAngle, endAngle);
  }

  // Draw angle measurement label
  noStroke();
  fill(66, 66, 66, alpha);
  textSize(10 / scaleFactor);
  textAlign(CENTER, CENTER);

  let midAngle = (startAngle + endAngle) / 2;
  // Handle wrap-around case
  if (endAngle < startAngle) {
    midAngle = (startAngle + endAngle + TWO_PI) / 2;
    if (midAngle > TWO_PI) midAngle -= TWO_PI;
  }

  // Distance for label depends on angle size
  let labelDist;
  if (angleDeg > 90) {
    labelDist = 35 / scaleFactor;
  } else if (angleDeg > 50) {
    labelDist = 30 / scaleFactor;
  } else if (angleDeg > 35) {
    labelDist = 35 / scaleFactor;
  } else {
    labelDist = 40 / scaleFactor;
  }

  let labelX = vx + labelDist * cos(midAngle);
  let labelY = vy + labelDist * sin(midAngle);
  text(angleDeg + "°", labelX, labelY);
}

function drawVertexLabels(verts, col, alpha, scaleFactor) {
  noStroke();
  fill(red(color(col)), green(color(col)), blue(color(col)), alpha);
  textStyle(BOLD);
  textSize(12 / scaleFactor);
  textAlign(CENTER, CENTER);

  // Calculate centroid
  let centX = (verts.A.x + verts.B.x + verts.C.x) / 3;
  let centY = (verts.A.y + verts.B.y + verts.C.y) / 3;

  let labelDist = 16 / scaleFactor;

  // Label A
  let dirAx = verts.A.x - centX;
  let dirAy = verts.A.y - centY;
  let lenA = sqrt(dirAx * dirAx + dirAy * dirAy);
  text('A', verts.A.x + labelDist * dirAx / lenA, verts.A.y + labelDist * dirAy / lenA);

  // Label B
  let dirBx = verts.B.x - centX;
  let dirBy = verts.B.y - centY;
  let lenB = sqrt(dirBx * dirBx + dirBy * dirBy);
  text('B', verts.B.x + labelDist * dirBx / lenB, verts.B.y + labelDist * dirBy / lenB);

  // Label C
  let dirCx = verts.C.x - centX;
  let dirCy = verts.C.y - centY;
  let lenC = sqrt(dirCx * dirCx + dirCy * dirCy);
  text('C', verts.C.x + labelDist * dirCx / lenC, verts.C.y + labelDist * dirCy / lenC);

  textStyle(NORMAL);
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
