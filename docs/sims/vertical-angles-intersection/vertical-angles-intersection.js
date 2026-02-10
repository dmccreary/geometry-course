// Vertical Angles at Intersection
// Static diagram showing how vertical angles are formed when two lines intersect
// All controls are canvas-based (no DOM elements)

let canvasWidth = 600;
let drawHeight = 600;
let controlHeight = 0;
let canvasHeight = drawHeight;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');
  describe('Diagram showing two intersecting lines forming four angles, with vertical angle pairs highlighted as equal', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let cx = canvasWidth / 2;
  let cy = canvasHeight / 2 - 20;

  // Title
  fill('#1565C0');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Vertical Angles at an Intersection', cx, 15);
  textStyle(NORMAL);

  // Draw two intersecting lines
  let lineLen = 200;
  let angle1 = radians(25); // first line angle from horizontal

  // Line 1 (blue) - going from top-left to bottom-right
  let x1a = cx - lineLen * cos(angle1);
  let y1a = cy - lineLen * sin(angle1);
  let x1b = cx + lineLen * cos(angle1);
  let y1b = cy + lineLen * sin(angle1);

  // Line 2 (red) - going from top-right to bottom-left
  let angle2 = radians(155);
  let x2a = cx - lineLen * cos(angle2);
  let y2a = cy - lineLen * sin(angle2);
  let x2b = cx + lineLen * cos(angle2);
  let y2b = cy + lineLen * sin(angle2);

  // Draw angle arcs and fills
  let arcR = 55;
  let a1 = -angle1; // p5 uses screen coords (y down)
  let a2 = -(PI - angle1);

  // Angles: going clockwise from right
  // Angle 1 (top) - between line1-right and line2-left going counterclockwise
  // Angle 2 (left) - between line2-left and line1-left
  // Angle 3 (bottom) - opposite of angle 1
  // Angle 4 (right) - opposite of angle 2

  let degAngle = 130; // the angle between the two lines (top angle)
  let suppAngle = 180 - degAngle;

  // Recalculate line positions based on these angles
  let halfAngle = degAngle / 2;
  let midDir = -PI / 2; // pointing up

  let dir1 = radians(-25);   // line 1 direction (slight upward right)
  let dir2 = radians(-155);  // line 2 direction (upward left)

  // Line 1 endpoints
  x1a = cx + lineLen * cos(dir1);
  y1a = cy + lineLen * sin(dir1);
  x1b = cx - lineLen * cos(dir1);
  y1b = cy - lineLen * sin(dir1);

  // Line 2 endpoints
  x2a = cx + lineLen * cos(dir2);
  y2a = cy + lineLen * sin(dir2);
  x2b = cx - lineLen * cos(dir2);
  y2b = cy - lineLen * sin(dir2);

  // Calculate the four angle regions
  // Angle 1 (top): from dir1 to dir2 going counterclockwise
  // In p5.js arc, angles are measured clockwise from positive x-axis
  let startAngle1 = dir2;
  let endAngle1 = dir1;

  // Angle 2 (right): from dir1 to dir2+PI
  let startAngle2 = dir1;
  let endAngle2 = dir2 + PI;

  // Angle 3 (bottom): from dir2+PI to dir1+PI (vertical to angle 1)
  let startAngle3 = dir2 + PI;
  let endAngle3 = dir1 + PI;

  // Angle 4 (left): from dir1+PI to dir2 (vertical to angle 2)
  let startAngle4 = dir1 + PI;
  let endAngle4 = dir2 + TWO_PI;

  // Draw angle 1 & 3 (vertical pair) in green
  fill(76, 175, 80, 80);
  stroke(76, 175, 80);
  strokeWeight(2);
  arc(cx, cy, arcR * 2, arcR * 2, startAngle1, endAngle1, PIE);
  arc(cx, cy, arcR * 2, arcR * 2, startAngle3, endAngle3, PIE);

  // Draw angle 2 & 4 (vertical pair) in gold/yellow
  fill(255, 193, 7, 80);
  stroke(255, 193, 7);
  strokeWeight(2);
  arc(cx, cy, arcR * 2, arcR * 2, startAngle2, endAngle2, PIE);
  arc(cx, cy, arcR * 2, arcR * 2, startAngle4, endAngle4, PIE);

  // Draw the two lines
  stroke('#1976D2');
  strokeWeight(4);
  line(x1a, y1a, x1b, y1b);

  stroke('#E53935');
  strokeWeight(4);
  line(x2a, y2a, x2b, y2b);

  // Intersection point
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 12);

  // Angle labels
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  let labelR = 38;

  // Angle 1 label (top) - green
  let mid1 = (startAngle1 + endAngle1) / 2;
  fill('#2E7D32');
  text('\u22201 = ' + degAngle + '\u00B0', cx + (labelR + 55) * cos(mid1), cy + (labelR + 55) * sin(mid1));

  // Angle 2 label (right) - gold
  let mid2 = (startAngle2 + endAngle2) / 2;
  fill('#F57F17');
  text('\u22202 = ' + suppAngle + '\u00B0', cx + (labelR + 55) * cos(mid2), cy + (labelR + 55) * sin(mid2));

  // Angle 3 label (bottom) - green
  let mid3 = (startAngle3 + endAngle3) / 2;
  fill('#2E7D32');
  text('\u22203 = ' + degAngle + '\u00B0', cx + (labelR + 55) * cos(mid3), cy + (labelR + 55) * sin(mid3));

  // Angle 4 label (left) - gold
  let mid4 = (startAngle4 + endAngle4) / 2;
  fill('#F57F17');
  text('\u22204 = ' + suppAngle + '\u00B0', cx + (labelR + 55) * cos(mid4), cy + (labelR + 55) * sin(mid4));

  textStyle(NORMAL);

  // Annotation boxes
  let boxY = canvasHeight - 170;

  // Vertical angles pair 1
  fill('#E8F5E9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(20, boxY, canvasWidth / 2 - 30, 60, 8);

  fill('#2E7D32');
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Vertical Angles (equal)', canvasWidth / 4 + 5, boxY + 18);
  textStyle(NORMAL);
  textSize(14);
  text('\u22201 \u2245 \u22203 = ' + degAngle + '\u00B0', canvasWidth / 4 + 5, boxY + 42);

  // Vertical angles pair 2
  fill('#FFF8E1');
  stroke('#FFC107');
  strokeWeight(2);
  rect(canvasWidth / 2 + 10, boxY, canvasWidth / 2 - 30, 60, 8);

  fill('#F57F17');
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Vertical Angles (equal)', 3 * canvasWidth / 4 - 5, boxY + 18);
  textStyle(NORMAL);
  textSize(14);
  text('\u22202 \u2245 \u22204 = ' + suppAngle + '\u00B0', 3 * canvasWidth / 4 - 5, boxY + 42);

  // Theorem box
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(2);
  rect(40, boxY + 75, canvasWidth - 80, 45, 8);

  fill('#1565C0');
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('Vertical Angles Theorem: Vertical angles are congruent', cx, boxY + 97);
  textStyle(NORMAL);

  noLoop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  loop();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    canvasWidth = max(canvasWidth, 500);
  }
}
