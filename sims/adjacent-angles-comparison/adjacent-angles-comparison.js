// Adjacent vs Non-Adjacent Angles Comparison
// Three examples showing what makes angles adjacent
// Learning Objective: Students will identify adjacent angles by checking
// for common vertex and common side (Bloom's: Understanding and Analyzing)

let canvasWidth = 900;
let drawHeight = 350;
let canvasHeight = drawHeight;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Three side-by-side examples comparing adjacent and non-adjacent angles. Example 1 shows adjacent angles ABC and CBD sharing vertex B and side BC. Example 2 shows non-adjacent angles with different vertices. Example 3 shows non-adjacent overlapping angles.', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  // Title
  noStroke();
  fill('#1A237E');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('What Makes Angles Adjacent?', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Draw three panels
  let panelW = (canvasWidth - 80) / 3;
  let gap = 15;
  let startX = 25;
  let panelY = 45;
  let panelH = drawHeight - 55;

  drawPanel1(startX, panelY, panelW, panelH);
  drawPanel2(startX + panelW + gap, panelY, panelW, panelH);
  drawPanel3(startX + 2 * (panelW + gap), panelY, panelW, panelH);
}

// Example 1: Adjacent Angles - YES
function drawPanel1(px, py, pw, ph) {
  // Panel background
  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(px, py, pw, ph, 10);

  // Green checkmark
  noStroke();
  fill('#2E7D32');
  textSize(30);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('\u2713', px + pw / 2, py + 6);

  // Label
  fill('#2E7D32');
  textSize(15);
  text('\u2713 Adjacent Angles', px + pw / 2, py + 40);
  textStyle(NORMAL);

  // Draw the angle diagram
  let cx = px + pw / 2;
  let cy = py + 140;
  let rayLen = 70;

  // Calculate ray endpoints
  // Ray BA goes to the right (0 degrees)
  let aX = cx + rayLen;
  let aY = cy;

  // Ray BC is the shared side at 30 degrees up from horizontal
  let bcAngle = radians(30);
  let cX = cx + rayLen * cos(-bcAngle);
  let cY = cy + rayLen * sin(-bcAngle);

  // Ray BD is at 30+45=75 degrees up from horizontal
  let bdAngle = radians(75);
  let dX = cx + rayLen * cos(-bdAngle);
  let dY = cy + rayLen * sin(-bdAngle);

  // Draw angle arcs with fill
  // Angle ABC (from 0 to 30 degrees) in blue
  fill(33, 150, 243, 60);
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx, cy, 55, 55, -bcAngle, 0, PIE);

  // Angle CBD (from 30 to 75 degrees) in red
  fill(244, 67, 54, 60);
  stroke('#E53935');
  strokeWeight(2);
  arc(cx, cy, 65, 65, -bdAngle, -bcAngle, PIE);

  // Draw Ray BA (blue)
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, aX, aY);

  // Draw Ray BC (shared side - purple, thicker)
  stroke('#7B1FA2');
  strokeWeight(4);
  line(cx, cy, cX, cY);

  // Draw Ray BD (red)
  stroke('#E53935');
  strokeWeight(3);
  line(cx, cy, dX, dY);

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Point labels
  textStyle(BOLD);
  textSize(14);

  fill('#1976D2');
  textAlign(LEFT, CENTER);
  text('A', aX + 5, aY);

  fill('#7B1FA2');
  textAlign(LEFT, TOP);
  text('C', cX + 5, cY - 3);

  fill('#E53935');
  textAlign(LEFT, BOTTOM);
  text('D', dX + 3, dY - 3);

  fill('#FF9800');
  textAlign(RIGHT, TOP);
  text('B', cx - 8, cy + 5);

  // Angle measure labels
  textSize(12);
  textStyle(NORMAL);
  fill('#1565C0');
  textAlign(CENTER, CENTER);
  let label1Angle = radians(15); // midpoint of 0-30
  text('30\u00B0', cx + 38 * cos(-label1Angle), cy + 38 * sin(-label1Angle));

  fill('#C62828');
  let label2Angle = radians(52.5); // midpoint of 30-75
  text('45\u00B0', cx + 42 * cos(-label2Angle), cy + 42 * sin(-label2Angle));

  // Checklist at bottom
  noStroke();
  fill('#2E7D32');
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  let checkY = py + ph - 70;
  text('\u2713 Common vertex B', px + 15, checkY);
  text('\u2713 Common side BC', px + 15, checkY + 20);
  text('\u2713 No overlap', px + 15, checkY + 40);
}

// Example 2: Not Adjacent - Different Vertices
function drawPanel2(px, py, pw, ph) {
  // Panel background
  fill('#FFEBEE');
  stroke('#E53935');
  strokeWeight(2);
  rect(px, py, pw, ph, 10);

  // Red X
  noStroke();
  fill('#C62828');
  textSize(30);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('\u2717', px + pw / 2, py + 6);

  // Label
  fill('#C62828');
  textSize(14);
  text('\u2717 Not Adjacent', px + pw / 2, py + 40);
  textStyle(NORMAL);
  fill('#757575');
  textSize(12);
  text('(different vertices)', px + pw / 2, py + 58);

  // Draw two separate angles at different locations
  let rayLen = 50;

  // First angle (left side)
  let cx1 = px + pw / 2 - 55;
  let cy1 = py + 150;

  // Angle fill
  fill(33, 150, 243, 60);
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx1, cy1, 40, 40, -radians(50), 0, PIE);

  // Rays
  stroke('#1976D2');
  strokeWeight(3);
  line(cx1, cy1, cx1 + rayLen, cy1);
  let end1X = cx1 + rayLen * cos(radians(-50));
  let end1Y = cy1 + rayLen * sin(radians(-50));
  line(cx1, cy1, end1X, end1Y);

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx1, cy1, 10);

  // Second angle (right side, different vertex)
  let cx2 = px + pw / 2 + 55;
  let cy2 = py + 150;

  // Angle fill
  fill(244, 67, 54, 60);
  stroke('#E53935');
  strokeWeight(2);
  arc(cx2, cy2, 40, 40, -radians(55), 0, PIE);

  // Rays
  stroke('#E53935');
  strokeWeight(3);
  line(cx2, cy2, cx2 + rayLen, cy2);
  let end2X = cx2 + rayLen * cos(radians(-55));
  let end2Y = cy2 + rayLen * sin(radians(-55));
  line(cx2, cy2, end2X, end2Y);

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx2, cy2, 10);

  // Vertex labels
  textSize(13);
  textStyle(BOLD);
  fill('#1976D2');
  textAlign(CENTER, TOP);
  text('Vertex P', cx1, cy1 + 30);

  fill('#E53935');
  text('Vertex Q', cx2, cy2 + 30);
  textStyle(NORMAL);

  // Not-equal symbol between vertices
  fill('#C62828');
  textSize(22);
  textAlign(CENTER, CENTER);
  text('\u2260', px + pw / 2, py + 150);

  // Explanation at bottom
  noStroke();
  fill('#C62828');
  textSize(12);
  textAlign(LEFT, TOP);
  let checkY = py + ph - 70;
  text('\u2717 No common vertex', px + 15, checkY);
  fill('#9E9E9E');
  text('\u25CB No common side', px + 15, checkY + 20);
  text('\u25CB Cannot be adjacent', px + 15, checkY + 40);
}

// Example 3: Not Adjacent - Overlapping
function drawPanel3(px, py, pw, ph) {
  // Panel background
  fill('#FFEBEE');
  stroke('#E53935');
  strokeWeight(2);
  rect(px, py, pw, ph, 10);

  // Red X
  noStroke();
  fill('#C62828');
  textSize(30);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('\u2717', px + pw / 2, py + 6);

  // Label
  fill('#C62828');
  textSize(14);
  text('\u2717 Not Adjacent', px + pw / 2, py + 40);
  textStyle(NORMAL);
  fill('#757575');
  textSize(12);
  text('(overlapping)', px + pw / 2, py + 58);

  // Draw two overlapping angles that share a vertex and a side but overlap
  let cx = px + pw / 2;
  let cy = py + 150;
  let rayLen = 70;

  // Angle 1: from 0 degrees to 60 degrees (larger angle in blue)
  let angle1End = radians(60);
  // Angle 2: from 20 degrees to 80 degrees (overlapping angle in red)
  let angle2Start = radians(20);
  let angle2End = radians(80);

  // Draw the purple overlap region first (20-60 degrees)
  fill(156, 39, 176, 80);
  stroke('#9C27B0');
  strokeWeight(1);
  arc(cx, cy, 60, 60, -angle1End, -angle2Start, PIE);

  // Draw Angle 1 fill (non-overlapping part: 0 to 20 degrees)
  fill(33, 150, 243, 60);
  stroke('#1976D2');
  strokeWeight(1);
  arc(cx, cy, 55, 55, -angle2Start, 0, PIE);

  // Draw Angle 2 fill (non-overlapping part: 60 to 80 degrees)
  fill(244, 67, 54, 60);
  stroke('#E53935');
  strokeWeight(1);
  arc(cx, cy, 65, 65, -angle2End, -angle1End, PIE);

  // Draw rays
  // Ray 1: horizontal (0 degrees) - shared side
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy);

  // Ray 2: at 60 degrees - end of angle 1
  stroke('#1976D2');
  strokeWeight(3);
  let r2X = cx + rayLen * cos(-angle1End);
  let r2Y = cy + rayLen * sin(-angle1End);
  line(cx, cy, r2X, r2Y);

  // Ray 3: at 20 degrees - start of angle 2 (shared side for angle 2)
  stroke('#E53935');
  strokeWeight(3);
  let r3X = cx + rayLen * cos(-angle2Start);
  let r3Y = cy + rayLen * sin(-angle2Start);
  line(cx, cy, r3X, r3Y);

  // Ray 4: at 80 degrees - end of angle 2
  stroke('#E53935');
  strokeWeight(3);
  let r4X = cx + rayLen * cos(-angle2End);
  let r4Y = cy + rayLen * sin(-angle2End);
  line(cx, cy, r4X, r4Y);

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Overlap label
  fill('#7B1FA2');
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  let overlapAngle = radians(40); // midpoint of overlap (20-60)
  text('Overlap', cx + 42 * cos(-overlapAngle), cy + 42 * sin(-overlapAngle));
  textStyle(NORMAL);

  // Angle labels
  textSize(11);
  fill('#1565C0');
  textAlign(LEFT, CENTER);
  let lbl1Angle = radians(5);
  text('\u22201', cx + rayLen + 5, cy - 8);

  fill('#C62828');
  let lbl2Angle = radians(75);
  text('\u22202', cx + (rayLen + 5) * cos(-lbl2Angle), cy + (rayLen + 5) * sin(-lbl2Angle));

  // Explanation at bottom
  noStroke();
  fill('#9E9E9E');
  textSize(12);
  textAlign(LEFT, TOP);
  let checkY = py + ph - 70;
  text('\u2713 Common vertex', px + 15, checkY);
  text('\u2713 Common side', px + 15, checkY + 20);
  fill('#C62828');
  text('\u2717 Angles overlap!', px + 15, checkY + 40);
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
