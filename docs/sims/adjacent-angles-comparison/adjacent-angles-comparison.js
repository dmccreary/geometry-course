// Adjacent vs Non-Adjacent Angles Comparison
// Three examples showing what makes angles adjacent

let canvasWidth = 900;
let drawHeight = 400;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let examples = [
  {
    title: "Adjacent Angles",
    isAdjacent: true,
    checkmarks: ["Common vertex B", "Common side BC", "No overlap"],
    color: "#E8F5E9",
    borderColor: "#43A047"
  },
  {
    title: "NOT Adjacent",
    subtitle: "Different Vertices",
    isAdjacent: false,
    reason: "Different vertices",
    color: "#FFEBEE",
    borderColor: "#E53935"
  },
  {
    title: "NOT Adjacent",
    subtitle: "No Common Side",
    isAdjacent: false,
    reason: "No common side",
    color: "#FFEBEE",
    borderColor: "#E53935"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Three examples comparing adjacent and non-adjacent angles', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Adjacent vs Non-Adjacent Angles', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(12);
  text('Adjacent angles share a vertex AND a common side', canvasWidth / 2, 38);

  // Check hover
  checkHover();

  // Draw three panels
  let panelW = (canvasWidth - 80) / 3;
  let gap = 15;
  let startX = 25;
  let panelY = 60;
  let panelH = 320;

  for (let i = 0; i < 3; i++) {
    let px = startX + i * (panelW + gap);
    drawPanel(i, px, panelY, panelW, panelH);
  }
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 80) / 3;
  let gap = 15;
  let startX = 25;
  let panelY = 60;
  let panelH = 320;

  for (let i = 0; i < 3; i++) {
    let px = startX + i * (panelW + gap);
    if (mouseX > px && mouseX < px + panelW && mouseY > panelY && mouseY < panelY + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanel(index, px, py, pw, ph) {
  let ex = examples[index];
  let isHovered = (hoveredPanel === index);

  // Panel background
  fill(ex.color);
  stroke(ex.borderColor);
  strokeWeight(isHovered ? 3 : 2);
  if (isHovered) {
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = ex.borderColor;
  }
  rect(px, py, pw, ph, 12);
  drawingContext.shadowBlur = 0;

  // Status indicator
  noStroke();
  textAlign(CENTER, TOP);
  if (ex.isAdjacent) {
    fill('#43A047');
    textSize(28);
    text('✓', px + pw / 2, py + 10);
    fill('#2E7D32');
    textSize(14);
    textStyle(BOLD);
    text('Adjacent Angles', px + pw / 2, py + 42);
  } else {
    fill('#E53935');
    textSize(28);
    text('✗', px + pw / 2, py + 10);
    fill('#C62828');
    textSize(14);
    textStyle(BOLD);
    text(ex.title, px + pw / 2, py + 42);
    textStyle(NORMAL);
    fill('#757575');
    textSize(11);
    text('(' + ex.subtitle + ')', px + pw / 2, py + 60);
  }
  textStyle(NORMAL);

  // Draw the angle illustration
  let cx = px + pw / 2;
  let cy = py + 160;

  if (index === 0) {
    drawAdjacentExample(cx, cy);
  } else if (index === 1) {
    drawDifferentVerticesExample(cx, cy);
  } else {
    drawNoCommonSideExample(cx, cy);
  }

  // Requirements checklist
  let checkY = py + ph - 90;
  fill('#424242');
  textSize(10);
  textAlign(LEFT, TOP);

  if (index === 0) {
    // All requirements met
    fill('#43A047');
    text('✓ Common vertex (B)', px + 15, checkY);
    text('✓ Common side (BC)', px + 15, checkY + 18);
    text('✓ No overlap', px + 15, checkY + 36);
  } else if (index === 1) {
    fill('#E53935');
    text('✗ Different vertices', px + 15, checkY);
    fill('#9E9E9E');
    text('○ No shared point', px + 15, checkY + 18);
    text('○ Cannot be adjacent', px + 15, checkY + 36);
  } else {
    fill('#9E9E9E');
    text('✓ Common vertex', px + 15, checkY);
    fill('#E53935');
    text('✗ No common side', px + 15, checkY + 18);
    fill('#9E9E9E');
    text('○ Missing requirement', px + 15, checkY + 36);
  }
}

function drawAdjacentExample(cx, cy) {
  let rayLen = 60;

  // Three rays from common vertex
  // Ray BA (horizontal right)
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy);

  // Ray BC (middle - shared side) - purple to show it's shared
  stroke('#7B1FA2');
  strokeWeight(4);
  let bcX = cx + rayLen * cos(radians(-40));
  let bcY = cy + rayLen * sin(radians(-40));
  line(cx, cy, bcX, bcY);

  // Ray BD (upper)
  stroke('#E53935');
  strokeWeight(3);
  let bdX = cx + rayLen * cos(radians(-80));
  let bdY = cy + rayLen * sin(radians(-80));
  line(cx, cy, bdX, bdY);

  // Angle arcs
  noFill();
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx, cy, 50, 50, -radians(40), 0);

  stroke('#E53935');
  arc(cx, cy, 60, 60, -radians(80), -radians(40));

  // Vertex
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Labels
  textSize(14);
  textStyle(BOLD);
  fill('#1976D2');
  textAlign(LEFT, CENTER);
  text('A', cx + rayLen + 5, cy);

  fill('#7B1FA2');
  text('C', bcX + 8, bcY);

  fill('#E53935');
  text('D', bdX + 5, bdY - 5);

  fill('#FF9800');
  textAlign(RIGHT, TOP);
  text('B', cx - 8, cy + 5);

  // Angle labels
  fill('#1976D2');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('∠ABC', cx + 35, cy - 15);

  fill('#E53935');
  text('∠CBD', cx + 15, cy - 45);
  textStyle(NORMAL);
}

function drawDifferentVerticesExample(cx, cy) {
  let rayLen = 50;

  // First angle at left position
  let cx1 = cx - 50;
  let cy1 = cy;

  stroke('#1976D2');
  strokeWeight(3);
  line(cx1, cy1, cx1 + rayLen, cy1);
  let endX1 = cx1 + rayLen * cos(radians(-50));
  let endY1 = cy1 + rayLen * sin(radians(-50));
  line(cx1, cy1, endX1, endY1);

  fill(33, 150, 243, 80);
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx1, cy1, 40, 40, -radians(50), 0, PIE);

  fill('#FF9800');
  noStroke();
  circle(cx1, cy1, 10);

  // Second angle at right position (different vertex!)
  let cx2 = cx + 50;
  let cy2 = cy;

  stroke('#E53935');
  strokeWeight(3);
  line(cx2, cy2, cx2 + rayLen, cy2);
  let endX2 = cx2 + rayLen * cos(radians(-60));
  let endY2 = cy2 + rayLen * sin(radians(-60));
  line(cx2, cy2, endX2, endY2);

  fill(244, 67, 54, 80);
  stroke('#E53935');
  strokeWeight(2);
  arc(cx2, cy2, 40, 40, -radians(60), 0, PIE);

  fill('#FF9800');
  noStroke();
  circle(cx2, cy2, 10);

  // Labels showing different vertices
  textSize(12);
  textStyle(BOLD);
  fill('#1976D2');
  textAlign(CENTER, TOP);
  text('Vertex P', cx1, cy1 + 40);

  fill('#E53935');
  text('Vertex Q', cx2, cy2 + 40);
  textStyle(NORMAL);

  // X mark between them
  fill('#C62828');
  textSize(20);
  text('≠', cx, cy);
}

function drawNoCommonSideExample(cx, cy) {
  let rayLen = 55;

  // Two angles sharing vertex but NO common side
  // Angle 1
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy);
  let end1X = cx + rayLen * cos(radians(-35));
  let end1Y = cy + rayLen * sin(radians(-35));
  line(cx, cy, end1X, end1Y);

  fill(33, 150, 243, 80);
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx, cy, 45, 45, -radians(35), 0, PIE);

  // Angle 2 (separate, no shared side)
  stroke('#E53935');
  strokeWeight(3);
  let start2X = cx + rayLen * cos(radians(-70));
  let start2Y = cy + rayLen * sin(radians(-70));
  line(cx, cy, start2X, start2Y);
  let end2X = cx + rayLen * cos(radians(-110));
  let end2Y = cy + rayLen * sin(radians(-110));
  line(cx, cy, end2X, end2Y);

  fill(244, 67, 54, 80);
  stroke('#E53935');
  strokeWeight(2);
  arc(cx, cy, 55, 55, -radians(110), -radians(70), PIE);

  // Vertex
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Label
  fill('#FF9800');
  textSize(12);
  textStyle(BOLD);
  textAlign(RIGHT, TOP);
  text('B', cx - 8, cy + 5);

  // Show gap between angles
  fill('#757575');
  textSize(10);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text('gap', cx + 25, cy - 45);

  // Angle labels
  fill('#1976D2');
  textSize(10);
  text('∠1', cx + 40, cy - 12);

  fill('#E53935');
  text('∠2', cx - 10, cy - 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 700);
  }
}
