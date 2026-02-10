// Complementary Angles Visual MicroSim
// Shows adjacent and non-adjacent complementary angle examples side-by-side
// A static diagram with hover highlights for engagement
// MicroSim template version 2026.02

// Canvas dimensions - responsive width, fixed height
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 0; // No controls needed for static diagram
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Diagram showing adjacent complementary angles (35 plus 55 equals 90 degrees) and non-adjacent complementary angles (25 plus 65 equals 90 degrees)', LABEL);
}

function draw() {
  updateCanvasSize();

  // Cream/light yellow background
  background('#FFFDE7');

  // Draw border around drawing region
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(0, 0, canvasWidth - 1, drawHeight - 1);

  // Title at top
  noStroke();
  fill('#1A237E');
  textSize(clampTextSize(22));
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Complementary Angles: Two angles that sum to 90\u00B0', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw the two panels side by side
  let panelGap = 20;
  let panelW = (canvasWidth - 3 * panelGap) / 2;
  let panelH = 290;
  let panelY = 48;

  drawAdjacentPanel(panelGap, panelY, panelW, panelH);
  drawNonAdjacentPanel(panelGap * 2 + panelW, panelY, panelW, panelH);

  // Bottom note
  noStroke();
  fill('#616161');
  textSize(clampTextSize(14));
  textAlign(CENTER, BOTTOM);
  textStyle(ITALIC);
  text('Complementary angles can be adjacent or non-adjacent', canvasWidth / 2, drawHeight - 8);
  textStyle(NORMAL);
}

// Helper: clamp text size for narrow screens
function clampTextSize(size) {
  if (canvasWidth < 700) {
    return max(10, size * canvasWidth / 800);
  }
  return size;
}

// ---- LEFT PANEL: Adjacent Complementary Angles ----
function drawAdjacentPanel(px, py, pw, ph) {
  // Panel background with rounded corners
  fill('#FFFFFF');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(px, py, pw, ph, 10);

  // Panel label at top
  noStroke();
  fill('#424242');
  textSize(clampTextSize(15));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Adjacent Complementary Angles', px + pw / 2, py + 10);
  textStyle(NORMAL);

  // Angle vertex position (centered in panel, slightly below middle)
  let cx = px + pw / 2;
  let cy = py + ph / 2 + 30;
  let rayLen = min(pw * 0.35, 110);
  let arcRadius = min(pw * 0.2, 65);

  // The two angles: 35 degrees (blue) from horizontal, and 55 degrees (red) from the 35-degree ray up to vertical
  // Angle 1 (35 deg, blue): from 0 to -35 degrees (measuring from positive x-axis going counter-clockwise)
  // Angle 2 (55 deg, red): from -35 to -90 degrees

  // Draw filled arc for 35-degree angle (blue)
  fill(33, 150, 243, 80);
  stroke('#1976D2');
  strokeWeight(1.5);
  arc(cx, cy, arcRadius * 2, arcRadius * 2, -radians(35), 0, PIE);

  // Draw filled arc for 55-degree angle (red)
  fill(244, 67, 54, 80);
  stroke('#E53935');
  strokeWeight(1.5);
  arc(cx, cy, arcRadius * 2, arcRadius * 2, -HALF_PI, -radians(35), PIE);

  // Draw the three rays
  // Horizontal ray (right) - shared base
  stroke('#333333');
  strokeWeight(2.5);
  line(cx, cy, cx + rayLen, cy);

  // Vertical ray (up) - completing the right angle
  line(cx, cy, cx, cy - rayLen);

  // Middle ray at 35 degrees above horizontal (dividing the right angle)
  let midRayX = cx + rayLen * cos(-radians(35));
  let midRayY = cy + rayLen * sin(-radians(35));
  stroke('#7B1FA2');
  strokeWeight(2.5);
  line(cx, cy, midRayX, midRayY);

  // Right angle square symbol at vertex (between horizontal and vertical rays)
  let sqSize = 14;
  noFill();
  stroke('#424242');
  strokeWeight(2);
  // Draw the small square in the corner between horizontal and vertical
  line(cx + sqSize, cy, cx + sqSize, cy - sqSize);
  line(cx + sqSize, cy - sqSize, cx, cy - sqSize);

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 10);

  // Angle labels
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  // 35 degree label (blue) - positioned inside the blue arc
  fill('#1565C0');
  textSize(clampTextSize(16));
  let label35Angle = -radians(17.5); // midpoint of 0 to -35
  let label35R = arcRadius + 18;
  text('35\u00B0', cx + label35R * cos(label35Angle), cy + label35R * sin(label35Angle));

  // 55 degree label (red) - positioned inside the red arc
  fill('#C62828');
  let label55Angle = -radians(35 + 27.5); // midpoint of -35 to -90
  let label55R = arcRadius + 18;
  text('55\u00B0', cx + label55R * cos(label55Angle), cy + label55R * sin(label55Angle));

  textStyle(NORMAL);

  // Equation below the angle diagram
  fill('#212121');
  textSize(clampTextSize(16));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('35\u00B0 + 55\u00B0 = 90\u00B0', cx, cy + rayLen * 0.35 + 15);
  textStyle(NORMAL);
}

// ---- RIGHT PANEL: Non-Adjacent Complementary Angles ----
function drawNonAdjacentPanel(px, py, pw, ph) {
  // Panel background with rounded corners
  fill('#FFFFFF');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(px, py, pw, ph, 10);

  // Panel label at top
  noStroke();
  fill('#424242');
  textSize(clampTextSize(15));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Non-Adjacent Complementary Angles', px + pw / 2, py + 10);
  textStyle(NORMAL);

  let rayLen = min(pw * 0.22, 75);
  let arcRadius = min(pw * 0.13, 45);

  // First angle: 25 degrees (green) - positioned left-of-center
  let cx1 = px + pw * 0.28;
  let cy1 = py + ph / 2 + 15;

  // Draw filled arc for 25-degree angle (green)
  fill(76, 175, 80, 80);
  stroke('#388E3C');
  strokeWeight(1.5);
  arc(cx1, cy1, arcRadius * 2, arcRadius * 2, -radians(25), 0, PIE);

  // Rays for 25-degree angle
  stroke('#2E7D32');
  strokeWeight(2.5);
  line(cx1, cy1, cx1 + rayLen, cy1); // horizontal ray
  let endX1 = cx1 + rayLen * cos(-radians(25));
  let endY1 = cy1 + rayLen * sin(-radians(25));
  line(cx1, cy1, endX1, endY1); // angled ray

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx1, cy1, 9);

  // Label: 25 degrees
  noStroke();
  fill('#2E7D32');
  textSize(clampTextSize(16));
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let label25Angle = -radians(12.5);
  let label25R = arcRadius + 16;
  text('25\u00B0', cx1 + label25R * cos(label25Angle), cy1 + label25R * sin(label25Angle));

  // Second angle: 65 degrees (orange) - positioned right-of-center
  let cx2 = px + pw * 0.72;
  let cy2 = py + ph / 2 + 15;

  // Draw filled arc for 65-degree angle (orange)
  fill(255, 152, 0, 80);
  stroke('#F57C00');
  strokeWeight(1.5);
  arc(cx2, cy2, arcRadius * 2, arcRadius * 2, -radians(65), 0, PIE);

  // Rays for 65-degree angle
  stroke('#EF6C00');
  strokeWeight(2.5);
  line(cx2, cy2, cx2 + rayLen, cy2); // horizontal ray
  let endX2 = cx2 + rayLen * cos(-radians(65));
  let endY2 = cy2 + rayLen * sin(-radians(65));
  line(cx2, cy2, endX2, endY2); // angled ray

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx2, cy2, 9);

  // Label: 65 degrees
  noStroke();
  fill('#EF6C00');
  textSize(clampTextSize(16));
  textStyle(BOLD);
  let label65Angle = -radians(32.5);
  let label65R = arcRadius + 16;
  text('65\u00B0', cx2 + label65R * cos(label65Angle), cy2 + label65R * sin(label65Angle));

  textStyle(NORMAL);

  // Dotted line connecting the two angles with a "+" symbol
  stroke('#9E9E9E');
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  let dashStartX = cx1 + rayLen + 10;
  let dashEndX = cx2 - rayLen - 10;
  let dashY = (cy1 + cy2) / 2;
  line(dashStartX, dashY, dashEndX, dashY);
  drawingContext.setLineDash([]);

  // Plus sign between angles
  noStroke();
  fill('#424242');
  textSize(clampTextSize(26));
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('+', (dashStartX + dashEndX) / 2, dashY);
  textStyle(NORMAL);

  // Equation below
  fill('#212121');
  textSize(clampTextSize(16));
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('25\u00B0 + 65\u00B0 = 90\u00B0', px + pw / 2, cy1 + rayLen + 20);
  textStyle(NORMAL);
}

// Responsive resize handler
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    // Use container width but clamp to reasonable range for readability
    canvasWidth = container.offsetWidth;
    canvasWidth = max(canvasWidth, 500);
  }
}
