// Linear Pair Structure
// Interactive diagram showing the anatomy of a linear pair

let canvasWidth = 700;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPart = -1; // 0=angle1, 1=angle2, 2=line, 3=ray, 4=vertex

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive diagram showing the structure of a linear pair with annotations', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FFFDE7');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Linear Pair Structure', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Hover over parts to learn more', canvasWidth / 2, 38);

  // Check hover
  checkHover();

  // Draw the linear pair
  drawLinearPair();

  // Draw info panel
  drawInfoPanel();

  // Key property callout
  drawCallout();
}

function checkHover() {
  hoveredPart = -1;

  let cx = canvasWidth / 2 - 50;
  let cy = 200;
  let lineLen = 200;
  let rayLen = 120;

  // Check vertex
  if (dist(mouseX, mouseY, cx, cy) < 15) {
    hoveredPart = 4;
    return;
  }

  // Check ray
  let rayEndX = cx + rayLen * cos(radians(-70));
  let rayEndY = cy + rayLen * sin(radians(-70));
  if (distToSegment(mouseX, mouseY, cx, cy, rayEndX, rayEndY) < 15) {
    hoveredPart = 3;
    return;
  }

  // Check left angle arc
  if (mouseX > cx - 60 && mouseX < cx && mouseY > cy - 80 && mouseY < cy) {
    hoveredPart = 0;
    return;
  }

  // Check right angle arc
  if (mouseX > cx && mouseX < cx + 60 && mouseY > cy - 60 && mouseY < cy) {
    hoveredPart = 1;
    return;
  }

  // Check line
  if (mouseY > cy - 10 && mouseY < cy + 10 && mouseX > cx - lineLen && mouseX < cx + lineLen) {
    hoveredPart = 2;
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
  if (param < 0) { xx = x1; yy = y1; }
  else if (param > 1) { xx = x2; yy = y2; }
  else { xx = x1 + param * C; yy = y1 + param * D; }
  return dist(px, py, xx, yy);
}

function drawLinearPair() {
  let cx = canvasWidth / 2 - 50;
  let cy = 200;
  let lineLen = 200;
  let rayLen = 120;

  // Straight line (horizontal)
  stroke(hoveredPart === 2 ? '#0D47A1' : '#424242');
  strokeWeight(hoveredPart === 2 ? 5 : 4);
  line(cx - lineLen, cy, cx + lineLen, cy);

  // Arrow heads on line ends
  fill(hoveredPart === 2 ? '#0D47A1' : '#424242');
  noStroke();
  // Left arrow
  push();
  translate(cx - lineLen, cy);
  rotate(PI);
  triangle(8, 0, -5, -5, -5, 5);
  pop();
  // Right arrow
  push();
  translate(cx + lineLen, cy);
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Ray going up
  let rayEndX = cx + rayLen * cos(radians(-70));
  let rayEndY = cy + rayLen * sin(radians(-70));
  stroke(hoveredPart === 3 ? '#4A148C' : '#616161');
  strokeWeight(hoveredPart === 3 ? 5 : 4);
  line(cx, cy, rayEndX, rayEndY);

  // Ray arrow
  push();
  translate(rayEndX, rayEndY);
  rotate(radians(-70));
  fill(hoveredPart === 3 ? '#4A148C' : '#616161');
  noStroke();
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Angle 1 (left - 110°)
  if (hoveredPart === 0) {
    fill(33, 150, 243, 150);
    stroke('#1976D2');
    strokeWeight(3);
  } else {
    fill(33, 150, 243, 80);
    stroke('#1976D2');
    strokeWeight(2);
  }
  arc(cx, cy, 80, 80, -radians(180), -radians(70), PIE);

  // Angle 2 (right - 70°)
  if (hoveredPart === 1) {
    fill(244, 67, 54, 150);
    stroke('#E53935');
    strokeWeight(3);
  } else {
    fill(244, 67, 54, 80);
    stroke('#E53935');
    strokeWeight(2);
  }
  arc(cx, cy, 70, 70, -radians(70), 0, PIE);

  // Vertex
  fill(hoveredPart === 4 ? '#E65100' : '#FF9800');
  stroke(hoveredPart === 4 ? '#BF360C' : '#E65100');
  strokeWeight(hoveredPart === 4 ? 3 : 2);
  circle(cx, cy, hoveredPart === 4 ? 18 : 14);

  // Angle labels
  noStroke();
  fill('#1565C0');
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('110°', cx - 55, cy - 45);
  text('∠1', cx - 85, cy - 25);

  fill('#C62828');
  text('70°', cx + 45, cy - 30);
  text('∠2', cx + 75, cy - 15);

  // Vertex label
  fill('#E65100');
  textSize(14);
  text('V', cx, cy + 25);
  textStyle(NORMAL);
}

function drawInfoPanel() {
  let panelX = canvasWidth - 230;
  let panelY = 70;
  let panelW = 210;
  let panelH = 150;

  fill(255);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 10);

  let info = {
    title: 'Linear Pair',
    content: [
      '• Adjacent angles',
      '• Non-common sides form a line',
      '• Always supplementary (180°)',
      '110° + 70° = 180° ✓'
    ]
  };

  if (hoveredPart === 0) {
    info = { title: 'Angle 1 (∠1)', content: ['• Measures 110°', '• Left side of the ray', '• Supplement of ∠2', '• 180° - 70° = 110°'] };
  } else if (hoveredPart === 1) {
    info = { title: 'Angle 2 (∠2)', content: ['• Measures 70°', '• Right side of the ray', '• Supplement of ∠1', '• 180° - 110° = 70°'] };
  } else if (hoveredPart === 2) {
    info = { title: 'Straight Line', content: ['• Non-common sides', '• Forms 180° angle', '• Makes angles supplementary', '• Key to linear pair definition'] };
  } else if (hoveredPart === 3) {
    info = { title: 'Common Side', content: ['• The shared ray', '• Divides the line', '• Creates two angles', '• Adjacent angles share this'] };
  } else if (hoveredPart === 4) {
    info = { title: 'Common Vertex', content: ['• Point V', '• Where all rays meet', '• Shared by both angles', '• Center of the linear pair'] };
  }

  noStroke();
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(info.title, panelX + 15, panelY + 12);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  let contentY = panelY + 38;
  for (let line of info.content) {
    text(line, panelX + 15, contentY);
    contentY += 22;
  }
}

function drawCallout() {
  let boxX = 50;
  let boxY = 300;
  let boxW = 350;
  let boxH = 80;

  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  noStroke();
  fill('#2E7D32');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Linear Pair Postulate', boxX + 15, boxY + 12);
  textStyle(NORMAL);

  fill('#424242');
  textSize(12);
  text('If two angles form a linear pair,', boxX + 15, boxY + 35);
  text('then they are supplementary.', boxX + 15, boxY + 52);

  fill('#1565C0');
  textStyle(BOLD);
  text('m∠1 + m∠2 = 180°', boxX + 200, boxY + 55);
  textStyle(NORMAL);
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
