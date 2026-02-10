// Vertical Angles Explorer
// Students drag endpoints of two intersecting lines to discover
// that vertical angles are always congruent (Bloom's: Analyzing)

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Center of intersection
let cx, cy;

// Line 1 (blue) - defined by angle from positive x-axis
let line1Angle = 30; // degrees - gives 60/120 default angles
// Line 2 (red) - defined by angle from positive x-axis
let line2Angle = 150; // degrees - perpendicular pair with line1

// Line length from center to endpoint
let lineLen = 200;

// Dragging state
let dragging = null; // 'line1' or 'line2' or null
let handleRadius = 12;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  cx = canvasWidth / 2;
  cy = drawHeight / 2;

  // Set default angles so vertical angles are 60 and 120
  line1Angle = 30;
  line2Angle = 150;

  describe('Interactive vertical angles explorer where you drag endpoints of two intersecting lines to discover that vertical angles are always congruent.', LABEL);
}

function draw() {
  updateCanvasSize();
  cx = canvasWidth / 2;
  cy = drawHeight / 2;

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('#333333');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Vertical Angles Explorer', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Subtitle instruction
  fill('#757575');
  textSize(14);
  text('Drag the handles to rotate either line', canvasWidth / 2, 42);

  // Calculate all four angles between the two lines
  let angles = calculateAngles();

  // Draw angle arcs (behind the lines)
  drawAngleArcs(angles);

  // Draw the two lines
  drawLines();

  // Draw angle labels
  drawAngleLabels(angles);

  // Draw draggable handles
  drawHandles();

  // Draw center point
  fill('#FF9800');
  stroke('#E65100');
  strokeWeight(2);
  circle(cx, cy, 12);

  // Draw theorem box
  drawTheoremBox();

  // Draw color key
  drawColorKey();

  // Draw control area display
  drawControlDisplay(angles);
}

function calculateAngles() {
  // Normalize angles to 0-360 range
  let a1 = ((line1Angle % 360) + 360) % 360;
  let a2 = ((line2Angle % 360) + 360) % 360;

  // The four rays create four angles around the center
  // Collect the four ray directions (each line has two rays: angle and angle+180)
  let rays = [a1, a2, (a1 + 180) % 360, (a2 + 180) % 360];

  // Sort rays in counterclockwise order
  rays.sort((a, b) => a - b);

  // Calculate angles between consecutive rays
  let angle1 = rays[1] - rays[0];
  let angle2 = rays[2] - rays[1];
  let angle3 = rays[3] - rays[2];
  let angle4 = 360 - rays[3] + rays[0];

  // Return angles and their start positions (for drawing arcs)
  return {
    angles: [angle1, angle2, angle3, angle4],
    startAngles: [rays[0], rays[1], rays[2], rays[3]]
  };
}

function drawAngleArcs(anglesData) {
  let arcRadius1 = 60; // for angle pair 1-3 (green)
  let arcRadius2 = 48; // for angle pair 2-4 (yellow)

  for (let i = 0; i < 4; i++) {
    let startDeg = anglesData.startAngles[i];
    let sweepDeg = anglesData.angles[i];

    // Convert to p5.js arc angles (radians, clockwise from right)
    let startRad = -radians(startDeg + sweepDeg);
    let endRad = -radians(startDeg);

    if (i === 0 || i === 2) {
      // Green pair (angle 1 and angle 3)
      fill(76, 175, 80, 90);
      stroke('#43A047');
      strokeWeight(2);
      arc(cx, cy, arcRadius1 * 2, arcRadius1 * 2, startRad, endRad, PIE);
    } else {
      // Yellow pair (angle 2 and angle 4)
      fill(255, 235, 59, 90);
      stroke('#FBC02D');
      strokeWeight(2);
      arc(cx, cy, arcRadius2 * 2, arcRadius2 * 2, startRad, endRad, PIE);
    }
  }
}

function drawLines() {
  // Line 1 (blue)
  let x1a = cx + lineLen * cos(radians(line1Angle));
  let y1a = cy - lineLen * sin(radians(line1Angle));
  let x1b = cx - lineLen * cos(radians(line1Angle));
  let y1b = cy + lineLen * sin(radians(line1Angle));

  stroke('#1976D2');
  strokeWeight(4);
  line(x1a, y1a, x1b, y1b);

  // Line 2 (red)
  let x2a = cx + lineLen * cos(radians(line2Angle));
  let y2a = cy - lineLen * sin(radians(line2Angle));
  let x2b = cx - lineLen * cos(radians(line2Angle));
  let y2b = cy + lineLen * sin(radians(line2Angle));

  stroke('#E53935');
  strokeWeight(4);
  line(x2a, y2a, x2b, y2b);
}

function drawHandles() {
  // Line 1 endpoints (blue handles)
  let x1a = cx + lineLen * cos(radians(line1Angle));
  let y1a = cy - lineLen * sin(radians(line1Angle));
  let x1b = cx - lineLen * cos(radians(line1Angle));
  let y1b = cy + lineLen * sin(radians(line1Angle));

  let hoverLine1 = (dragging === 'line1') ||
    dist(mouseX, mouseY, x1a, y1a) < handleRadius * 1.5 ||
    dist(mouseX, mouseY, x1b, y1b) < handleRadius * 1.5;

  fill(hoverLine1 ? '#0D47A1' : '#42A5F5');
  stroke('#1565C0');
  strokeWeight(2);
  circle(x1a, y1a, handleRadius * 2);
  circle(x1b, y1b, handleRadius * 2);

  // Line 2 endpoints (red handles)
  let x2a = cx + lineLen * cos(radians(line2Angle));
  let y2a = cy - lineLen * sin(radians(line2Angle));
  let x2b = cx - lineLen * cos(radians(line2Angle));
  let y2b = cy + lineLen * sin(radians(line2Angle));

  let hoverLine2 = (dragging === 'line2') ||
    dist(mouseX, mouseY, x2a, y2a) < handleRadius * 1.5 ||
    dist(mouseX, mouseY, x2b, y2b) < handleRadius * 1.5;

  fill(hoverLine2 ? '#B71C1C' : '#EF5350');
  stroke('#C62828');
  strokeWeight(2);
  circle(x2a, y2a, handleRadius * 2);
  circle(x2b, y2b, handleRadius * 2);
}

function drawAngleLabels(anglesData) {
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  let labelRadius = 80;

  for (let i = 0; i < 4; i++) {
    let midAngleDeg = anglesData.startAngles[i] + anglesData.angles[i] / 2;
    let labelX = cx + labelRadius * cos(radians(midAngleDeg));
    let labelY = cy - labelRadius * sin(radians(midAngleDeg));

    let angleDeg = round(anglesData.angles[i]);

    if (i === 0 || i === 2) {
      fill('#2E7D32'); // green text
    } else {
      fill('#F57F17'); // yellow/amber text
    }

    let labelNum = i + 1;
    text('\u2220' + labelNum + ' = ' + angleDeg + '\u00B0', labelX, labelY);
  }

  textStyle(NORMAL);
}

function drawTheoremBox() {
  let boxX = 20;
  let boxY = 70;
  let boxW = 210;
  let boxH = 90;

  fill(232, 245, 233, 230);
  stroke('#43A047');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  noStroke();
  fill('#2E7D32');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Vertical Angles Theorem', boxX + 12, boxY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(12);
  text('Vertical angles are always', boxX + 12, boxY + 32);
  text('congruent (equal in measure).', boxX + 12, boxY + 48);

  fill('#1565C0');
  textStyle(BOLD);
  textSize(13);
  text('\u22201 \u2245 \u22203', boxX + 12, boxY + 68);
  text('\u22202 \u2245 \u22204', boxX + 110, boxY + 68);
  textStyle(NORMAL);
}

function drawColorKey() {
  let boxX = canvasWidth - 190;
  let boxY = 70;
  let boxW = 170;
  let boxH = 76;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 10);

  noStroke();
  fill('#333333');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Color Key', boxX + 12, boxY + 8);
  textStyle(NORMAL);

  // Green pair
  fill(76, 175, 80, 150);
  noStroke();
  rect(boxX + 12, boxY + 30, 14, 14, 2);
  fill('#2E7D32');
  textSize(12);
  text('\u22201 & \u22203 (vertical)', boxX + 32, boxY + 30);

  // Yellow pair
  fill(255, 235, 59, 150);
  noStroke();
  rect(boxX + 12, boxY + 52, 14, 14, 2);
  fill('#F57F17');
  textSize(12);
  text('\u22202 & \u22204 (vertical)', boxX + 32, boxY + 52);
}

function drawControlDisplay(anglesData) {
  let a1 = round(anglesData.angles[0]);
  let a2 = round(anglesData.angles[1]);
  let a3 = round(anglesData.angles[2]);
  let a4 = round(anglesData.angles[3]);

  // Row 1: Individual angle measures
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);

  let row1Y = drawHeight + 12;

  fill('#2E7D32');
  text('\u22201 = ' + a1 + '\u00B0', canvasWidth * 0.15, row1Y);
  fill('#F57F17');
  text('\u22202 = ' + a2 + '\u00B0', canvasWidth * 0.38, row1Y);
  fill('#2E7D32');
  text('\u22203 = ' + a3 + '\u00B0', canvasWidth * 0.62, row1Y);
  fill('#F57F17');
  text('\u22204 = ' + a4 + '\u00B0', canvasWidth * 0.85, row1Y);

  // Separator dots
  fill('#BDBDBD');
  textSize(16);
  text('|', canvasWidth * 0.265, row1Y);
  text('|', canvasWidth * 0.5, row1Y);
  text('|', canvasWidth * 0.735, row1Y);

  // Row 2: Equality statements
  let row2Y = drawHeight + 42;

  fill('#2E7D32');
  textSize(15);
  text('\u22201 = \u22203  \u2713', canvasWidth * 0.3, row2Y);

  fill('#F57F17');
  text('\u22202 = \u22204  \u2713', canvasWidth * 0.7, row2Y);

  // Adjacent supplementary note
  fill('#757575');
  textSize(12);
  textStyle(NORMAL);
  text('Adjacent angles: ' + a1 + '\u00B0 + ' + a2 + '\u00B0 = ' + (a1 + a2) + '\u00B0 (supplementary)', canvasWidth / 2, row2Y + 22);
}

function mousePressed() {
  // Check proximity to all four endpoints
  // Line 1 endpoints
  let x1a = cx + lineLen * cos(radians(line1Angle));
  let y1a = cy - lineLen * sin(radians(line1Angle));
  let x1b = cx - lineLen * cos(radians(line1Angle));
  let y1b = cy + lineLen * sin(radians(line1Angle));

  // Line 2 endpoints
  let x2a = cx + lineLen * cos(radians(line2Angle));
  let y2a = cy - lineLen * sin(radians(line2Angle));
  let x2b = cx - lineLen * cos(radians(line2Angle));
  let y2b = cy + lineLen * sin(radians(line2Angle));

  let threshold = handleRadius * 2;

  if (dist(mouseX, mouseY, x1a, y1a) < threshold ||
      dist(mouseX, mouseY, x1b, y1b) < threshold) {
    dragging = 'line1';
  } else if (dist(mouseX, mouseY, x2a, y2a) < threshold ||
             dist(mouseX, mouseY, x2b, y2b) < threshold) {
    dragging = 'line2';
  }
}

function mouseDragged() {
  if (dragging) {
    let dx = mouseX - cx;
    let dy = cy - mouseY; // inverted for standard math coordinates
    let newAngle = degrees(atan2(dy, dx));

    // Normalize to 0-360
    if (newAngle < 0) newAngle += 360;

    if (dragging === 'line1') {
      // Ensure lines don't overlap (keep at least 10 degrees apart)
      let diff = angleDiff(newAngle, line2Angle);
      if (diff > 10 && diff < 170) {
        line1Angle = newAngle;
      }
    } else if (dragging === 'line2') {
      let diff = angleDiff(newAngle, line1Angle);
      if (diff > 10 && diff < 170) {
        line2Angle = newAngle;
      }
    }
  }
}

function mouseReleased() {
  dragging = null;
}

// Calculate the acute angle difference between two angles
function angleDiff(a, b) {
  let d = abs(((a - b + 180) % 360) - 180);
  return d;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    // Constrain width for readability
    canvasWidth = min(canvasWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
