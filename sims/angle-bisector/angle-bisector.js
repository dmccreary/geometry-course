// Angle Bisector Interactive Diagram
// Shows how an angle bisector divides an angle into two equal parts

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let angleSlider;
let totalAngle = 70;
let hoveredPart = -1; // 0=left angle, 1=right angle, 2=bisector, 3=vertex

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create slider
  angleSlider = createSlider(20, 160, 70, 2);
  angleSlider.position(canvasWidth / 2 - 100, drawHeight + 15);
  angleSlider.size(200);
  angleSlider.input(() => totalAngle = angleSlider.value());

  describe('Interactive angle bisector showing how it divides an angle into two equal parts', LABEL);
}

function draw() {
  updateCanvasSize();
  totalAngle = angleSlider.value();

  background('#FFFDE7');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angle Bisector', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Adjust the angle and hover over parts to learn more', canvasWidth / 2, 38);

  // Slider label
  fill('#424242');
  textSize(13);
  textAlign(CENTER, CENTER);
  text('Total Angle: ' + totalAngle + '°', canvasWidth / 2, drawHeight + 35);

  // Check hover
  checkHover();

  // Draw the angle bisector
  drawAngleBisector();

  // Draw info panel
  drawInfoPanel();
}

function checkHover() {
  hoveredPart = -1;

  let cx = canvasWidth / 2 - 80;
  let cy = 280;
  let rayLen = 150;
  let halfAngle = totalAngle / 2;

  // Vertex
  if (dist(mouseX, mouseY, cx, cy) < 15) {
    hoveredPart = 3;
    return;
  }

  // Bisector ray
  let bisectorX = cx + rayLen * cos(radians(-halfAngle));
  let bisectorY = cy + rayLen * sin(radians(-halfAngle));
  if (distToSegment(mouseX, mouseY, cx, cy, bisectorX, bisectorY) < 15) {
    hoveredPart = 2;
    return;
  }

  // Left angle arc
  let leftArcX = cx + 50 * cos(radians(-totalAngle * 0.75));
  let leftArcY = cy + 50 * sin(radians(-totalAngle * 0.75));
  if (dist(mouseX, mouseY, leftArcX, leftArcY) < 30) {
    hoveredPart = 0;
    return;
  }

  // Right angle arc
  let rightArcX = cx + 50 * cos(radians(-halfAngle / 2));
  let rightArcY = cy + 50 * sin(radians(-halfAngle / 2));
  if (dist(mouseX, mouseY, rightArcX, rightArcY) < 30) {
    hoveredPart = 1;
    return;
  }
}

function distToSegment(px, py, x1, y1, x2, y2) {
  let A = px - x1, B = py - y1, C = x2 - x1, D = y2 - y1;
  let dot = A * C + B * D;
  let len_sq = C * C + D * D;
  let param = len_sq !== 0 ? dot / len_sq : -1;
  let xx, yy;
  if (param < 0) { xx = x1; yy = y1; }
  else if (param > 1) { xx = x2; yy = y2; }
  else { xx = x1 + param * C; yy = y1 + param * D; }
  return dist(px, py, xx, yy);
}

function drawAngleBisector() {
  let cx = canvasWidth / 2 - 80;
  let cy = 280;
  let rayLen = 150;
  let halfAngle = totalAngle / 2;

  // Ray BA (horizontal right) - blue
  stroke('#1976D2');
  strokeWeight(4);
  line(cx, cy, cx + rayLen, cy);

  // Arrow
  push();
  translate(cx + rayLen, cy);
  fill('#1976D2');
  noStroke();
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Ray BC (upper) - red
  let bcX = cx + rayLen * cos(radians(-totalAngle));
  let bcY = cy + rayLen * sin(radians(-totalAngle));
  stroke('#E53935');
  strokeWeight(4);
  line(cx, cy, bcX, bcY);

  // Arrow
  push();
  translate(bcX, bcY);
  rotate(radians(-totalAngle));
  fill('#E53935');
  noStroke();
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Bisector ray BD (green dashed)
  let bdX = cx + rayLen * cos(radians(-halfAngle));
  let bdY = cy + rayLen * sin(radians(-halfAngle));
  stroke(hoveredPart === 2 ? '#1B5E20' : '#43A047');
  strokeWeight(hoveredPart === 2 ? 5 : 3);
  drawingContext.setLineDash([10, 5]);
  line(cx, cy, bdX, bdY);
  drawingContext.setLineDash([]);

  // Arrow
  push();
  translate(bdX, bdY);
  rotate(radians(-halfAngle));
  fill(hoveredPart === 2 ? '#1B5E20' : '#43A047');
  noStroke();
  triangle(8, 0, -5, -5, -5, 5);
  pop();

  // Left half-angle (∠ABD) - blue arc
  if (hoveredPart === 0) {
    fill(33, 150, 243, 150);
    stroke('#1565C0');
    strokeWeight(3);
  } else {
    fill(33, 150, 243, 80);
    stroke('#1976D2');
    strokeWeight(2);
  }
  arc(cx, cy, 80, 80, -radians(halfAngle), 0, PIE);

  // Right half-angle (∠DBC) - red arc
  if (hoveredPart === 1) {
    fill(244, 67, 54, 150);
    stroke('#C62828');
    strokeWeight(3);
  } else {
    fill(244, 67, 54, 80);
    stroke('#E53935');
    strokeWeight(2);
  }
  arc(cx, cy, 90, 90, -radians(totalAngle), -radians(halfAngle), PIE);

  // Congruence marks (small arcs)
  stroke('#424242');
  strokeWeight(2);
  noFill();
  arc(cx, cy, 55, 55, -radians(halfAngle * 0.6), -radians(halfAngle * 0.4));
  arc(cx, cy, 55, 55, -radians(halfAngle + halfAngle * 0.4), -radians(halfAngle + halfAngle * 0.6));

  // Vertex
  fill(hoveredPart === 3 ? '#E65100' : '#FF9800');
  stroke(hoveredPart === 3 ? '#BF360C' : '#E65100');
  strokeWeight(2);
  circle(cx, cy, hoveredPart === 3 ? 18 : 14);

  // Labels
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  fill('#1976D2');
  text('A', cx + rayLen + 15, cy + 5);

  fill('#E53935');
  text('C', bcX + 10, bcY - 10);

  fill('#43A047');
  text('D', bdX + 15, bdY);

  fill('#E65100');
  text('B', cx - 15, cy + 15);

  // Angle measurements
  fill('#1565C0');
  textSize(14);
  text(round(halfAngle) + '°', cx + 60, cy - 20);

  fill('#C62828');
  text(round(halfAngle) + '°', cx + 45, cy - 60);

  textStyle(NORMAL);

  // Full angle label
  fill('#424242');
  textSize(12);
  textAlign(LEFT, TOP);
  text('∠ABC = ' + totalAngle + '°', cx + 120, cy - 100);
}

function drawInfoPanel() {
  let panelX = canvasWidth - 240;
  let panelY = 70;
  let panelW = 220;
  let panelH = 170;

  fill(255);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 10);

  let halfAngle = round(totalAngle / 2);

  let info = {
    title: 'Angle Bisector',
    content: [
      'BD bisects ∠ABC',
      'm∠ABD = m∠DBC = ' + halfAngle + '°',
      'm∠ABD = ½ × m∠ABC',
      halfAngle + '° = ½ × ' + totalAngle + '°'
    ]
  };

  if (hoveredPart === 0) {
    info = { title: '∠ABD (Blue)', content: ['Left half-angle', 'Measures ' + halfAngle + '°', 'Congruent to ∠DBC', 'Half of the full angle'] };
  } else if (hoveredPart === 1) {
    info = { title: '∠DBC (Red)', content: ['Right half-angle', 'Measures ' + halfAngle + '°', 'Congruent to ∠ABD', 'Half of the full angle'] };
  } else if (hoveredPart === 2) {
    info = { title: 'Ray BD (Bisector)', content: ['The angle bisector', 'Divides ∠ABC in half', 'Creates two equal angles', 'Green dashed line'] };
  } else if (hoveredPart === 3) {
    info = { title: 'Vertex B', content: ['Common endpoint', 'Where all rays meet', 'Center of ∠ABC', 'Origin of bisector'] };
  }

  noStroke();
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(info.title, panelX + 12, panelY + 12);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  let contentY = panelY + 38;
  for (let line of info.content) {
    text(line, panelX + 12, contentY);
    contentY += 22;
  }

  // Key property box
  let keyY = panelY + panelH + 15;
  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(panelX, keyY, panelW, 60, 8);

  noStroke();
  fill('#2E7D32');
  textSize(11);
  textStyle(BOLD);
  text('Key Property:', panelX + 12, keyY + 10);
  textStyle(NORMAL);
  fill('#424242');
  text('If BD bisects ∠ABC, then:', panelX + 12, keyY + 28);
  fill('#1565C0');
  textStyle(BOLD);
  text('m∠ABD = m∠DBC', panelX + 12, keyY + 44);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  angleSlider.position(canvasWidth / 2 - 100, drawHeight + 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
  }
}
