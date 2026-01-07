// Angle Parts and Notation
// Interactive diagram showing the anatomy of an angle

let canvasWidth = 700;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPart = -1; // 0=vertex, 1=side1, 2=side2, 3=arc

let centerX, centerY;
let rayLength = 150;
let angle1 = 0; // degrees (horizontal ray)
let angle2 = 45; // degrees (upper ray)

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  centerX = canvasWidth * 0.35;
  centerY = canvasHeight * 0.55;

  describe('Interactive diagram showing the parts of an angle: vertex, sides, and arc', LABEL);
}

function draw() {
  updateCanvasSize();
  centerX = canvasWidth * 0.35;

  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Parts and Notation', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Hover over each part to learn more', canvasWidth / 2, 38);

  // Check hover state
  checkHover();

  // Draw angle components
  drawAngle();

  // Draw info panel
  drawInfoPanel();

  // Draw legend
  drawLegend();
}

function checkHover() {
  hoveredPart = -1;

  // Calculate endpoint positions
  let endX1 = centerX + rayLength * cos(radians(angle1));
  let endY1 = centerY - rayLength * sin(radians(angle1));
  let endX2 = centerX + rayLength * cos(radians(angle2));
  let endY2 = centerY - rayLength * sin(radians(angle2));

  // Check vertex (center point)
  if (dist(mouseX, mouseY, centerX, centerY) < 20) {
    hoveredPart = 0;
    return;
  }

  // Check side 1 (horizontal ray) - line segment proximity
  if (distToSegment(mouseX, mouseY, centerX, centerY, endX1, endY1) < 12) {
    hoveredPart = 1;
    return;
  }

  // Check side 2 (upper ray)
  if (distToSegment(mouseX, mouseY, centerX, centerY, endX2, endY2) < 12) {
    hoveredPart = 2;
    return;
  }

  // Check angle arc (middle of angle)
  let midAngle = (angle1 + angle2) / 2;
  let arcX = centerX + 50 * cos(radians(midAngle));
  let arcY = centerY - 50 * sin(radians(midAngle));
  if (dist(mouseX, mouseY, arcX, arcY) < 25) {
    hoveredPart = 3;
    return;
  }
}

function distToSegment(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let len_sq = C * C + D * D;
  let param = len_sq !== 0 ? dot / len_sq : -1;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  return dist(px, py, xx, yy);
}

function drawAngle() {
  // Calculate endpoints
  let endX1 = centerX + rayLength * cos(radians(angle1));
  let endY1 = centerY - rayLength * sin(radians(angle1));
  let endX2 = centerX + rayLength * cos(radians(angle2));
  let endY2 = centerY - rayLength * sin(radians(angle2));

  // Point A beyond ray 1
  let ptAx = centerX + (rayLength + 30) * cos(radians(angle1));
  let ptAy = centerY - (rayLength + 30) * sin(radians(angle1));

  // Point C beyond ray 2
  let ptCx = centerX + (rayLength + 30) * cos(radians(angle2));
  let ptCy = centerY - (rayLength + 30) * sin(radians(angle2));

  // Draw angle arc first (behind rays)
  if (hoveredPart === 3) {
    fill(76, 175, 80, 100);
    stroke('#43A047');
    strokeWeight(3);
  } else {
    fill(76, 175, 80, 50);
    stroke('#66BB6A');
    strokeWeight(2);
  }
  arc(centerX, centerY, 100, 100, -radians(angle2), -radians(angle1), PIE);

  // Draw ray 1 (horizontal - side BA)
  if (hoveredPart === 1) {
    stroke('#0D47A1');
    strokeWeight(5);
  } else {
    stroke('#1976D2');
    strokeWeight(3);
  }
  line(centerX, centerY, endX1, endY1);
  // Arrowhead
  push();
  translate(endX1, endY1);
  rotate(radians(angle1));
  fill(hoveredPart === 1 ? '#0D47A1' : '#1976D2');
  noStroke();
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Draw ray 2 (upper - side BC)
  if (hoveredPart === 2) {
    stroke('#B71C1C');
    strokeWeight(5);
  } else {
    stroke('#E53935');
    strokeWeight(3);
  }
  line(centerX, centerY, endX2, endY2);
  // Arrowhead
  push();
  translate(endX2, endY2);
  rotate(-radians(angle2));
  fill(hoveredPart === 2 ? '#B71C1C' : '#E53935');
  noStroke();
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Draw vertex point
  if (hoveredPart === 0) {
    fill('#E65100');
    stroke('#BF360C');
    strokeWeight(3);
    circle(centerX, centerY, 24);
  } else {
    fill('#FF9800');
    stroke('#E65100');
    strokeWeight(2);
    circle(centerX, centerY, 18);
  }

  // Labels
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Label A
  fill('#1565C0');
  text('A', ptAx + 5, ptAy + 10);

  // Label B (vertex)
  fill('#E65100');
  text('B', centerX - 20, centerY + 20);

  // Label C
  fill('#C62828');
  text('C', ptCx - 15, ptCy - 5);

  // Angle measure in arc
  fill('#2E7D32');
  textSize(14);
  let midAngle = (angle1 + angle2) / 2;
  let labelX = centerX + 70 * cos(radians(midAngle));
  let labelY = centerY - 70 * sin(radians(midAngle));
  text('45°', labelX, labelY);

  textStyle(NORMAL);
}

function drawInfoPanel() {
  let panelX = canvasWidth * 0.62;
  let panelY = 70;
  let panelW = canvasWidth * 0.35;
  let panelH = 180;

  // Panel background
  fill(255);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 10);

  noStroke();
  textAlign(LEFT, TOP);

  let info = {
    title: 'Angle Notation',
    content: [
      '• This angle is named ∠ABC or ∠CBA',
      '• The vertex (B) is always in the middle',
      '• Can also be called ∠B (vertex only)',
      '• Measure: m∠ABC = 45°'
    ]
  };

  if (hoveredPart === 0) {
    info = {
      title: 'Vertex (Point B)',
      content: [
        '• The common endpoint of the rays',
        '• Where both sides of the angle meet',
        '• Named with a capital letter',
        '• Must be in the middle of angle name'
      ]
    };
  } else if (hoveredPart === 1) {
    info = {
      title: 'Side BA (Blue Ray)',
      content: [
        '• One of two rays forming the angle',
        '• Starts at vertex B, passes through A',
        '• Extends infinitely in one direction',
        '• Fixed as the initial side'
      ]
    };
  } else if (hoveredPart === 2) {
    info = {
      title: 'Side BC (Red Ray)',
      content: [
        '• The second ray forming the angle',
        '• Starts at vertex B, passes through C',
        '• Extends infinitely in one direction',
        '• Called the terminal side'
      ]
    };
  } else if (hoveredPart === 3) {
    info = {
      title: 'Angle Arc',
      content: [
        '• Shows the opening between rays',
        '• Indicates which angle we mean',
        '• Can be small or large arc',
        '• Measure shown: 45° (acute angle)'
      ]
    };
  }

  // Title
  fill('#1565C0');
  textSize(16);
  textStyle(BOLD);
  text(info.title, panelX + 15, panelY + 15);
  textStyle(NORMAL);

  // Content
  fill('#424242');
  textSize(12);
  let contentY = panelY + 45;
  for (let line of info.content) {
    text(line, panelX + 15, contentY);
    contentY += 22;
  }
}

function drawLegend() {
  let legX = canvasWidth * 0.62;
  let legY = 270;
  let legW = canvasWidth * 0.35;

  fill('#F5F5F5');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(legX, legY, legW, 110, 10);

  noStroke();
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Notation Summary', legX + 15, legY + 10);
  textStyle(NORMAL);

  textSize(11);
  let sumY = legY + 35;
  text('∠ABC or ∠CBA  →  Full angle name', legX + 15, sumY);
  text('∠B  →  Vertex notation (if unique)', legX + 15, sumY + 20);
  text('m∠ABC = 45°  →  Angle measure', legX + 15, sumY + 40);
  text('Vertex always in the middle!', legX + 15, sumY + 60);
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
