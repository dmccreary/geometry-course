// Transversal Eight Angles
// Static diagram showing two parallel lines cut by a transversal
// with all eight angles numbered 1-8

let canvasWidth = 700;
let drawHeight = 550;
let canvasHeight = drawHeight;

// Geometry parameters (recomputed in draw for responsiveness)
let topY, botY;       // y-positions of the two parallel lines
let lineLeft, lineRight; // horizontal extents of parallel lines
let transLeft, transRight; // transversal endpoints

// Transversal slope parameters
let transSlope = 0.6; // rise/run for the transversal angle

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe(
    'Diagram showing two horizontal parallel lines crossed by a red transversal line, with eight angles numbered 1 through 8 at the two intersections',
    LABEL
  );
}

function draw() {
  updateCanvasSize();
  background(255);

  // Compute positions relative to current canvas size
  let cx = canvasWidth / 2;
  topY = 190;
  botY = 370;
  lineLeft = cx - min(canvasWidth * 0.40, 280);
  lineRight = cx + min(canvasWidth * 0.40, 280);

  // Transversal extends beyond both lines
  let transMargin = 60;
  // Intersection x-values (transversal passes through center of each line)
  let topIntX = cx;
  let botIntX = cx;

  // Compute transversal line extending above and below
  transLeft = topIntX - (topY - (topY - transMargin)) / transSlope;
  transRight = botIntX + ((botY + transMargin) - botY) / transSlope;

  // Transversal endpoints computed from the slope through both intersections
  let transTopX = topIntX - transMargin / transSlope;
  let transTopY = topY - transMargin;
  let transBotX = botIntX + transMargin / transSlope;
  let transBotY = botY + transMargin;

  // --- Title ---
  fill('#1565C0');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Eight Angles Formed by Parallel Lines and a Transversal', cx, 12);
  textStyle(NORMAL);

  // --- Draw angle arcs (behind lines) ---
  drawAngleArcs(topIntX, topY, transBotX - topIntX, transBotY - topY);
  drawAngleArcs(botIntX, botY, transBotX - botIntX, transBotY - botY);

  // --- Draw parallel lines (blue, thick) ---
  stroke('#1565C0');
  strokeWeight(4);
  strokeCap(ROUND);
  line(lineLeft, topY, lineRight, topY);
  line(lineLeft, botY, lineRight, botY);

  // --- Draw arrowheads on parallel lines ---
  drawLineArrow(lineLeft, topY, -1);
  drawLineArrow(lineRight, topY, 1);
  drawLineArrow(lineLeft, botY, -1);
  drawLineArrow(lineRight, botY, 1);

  // --- Parallel line symbols (small arrows on lines) ---
  drawParallelSymbol(cx + 80, topY, 1);
  drawParallelSymbol(cx + 80, botY, 1);

  // --- Draw transversal (red, thick) ---
  stroke('#E53935');
  strokeWeight(3.5);
  line(transTopX, transTopY, transBotX, transBotY);

  // Transversal arrowheads
  drawTransArrow(transTopX, transTopY, transBotX - transTopX, transBotY - transTopY, -1);
  drawTransArrow(transBotX, transBotY, transBotX - transTopX, transBotY - transTopY, 1);

  // --- Intersection dots ---
  fill('#333333');
  noStroke();
  circle(topIntX, topY, 8);
  circle(botIntX, botY, 8);

  // --- Angle numbers ---
  let transAngle = atan2(transBotY - transTopY, transBotX - transTopX);
  drawAngleLabelsTop(topIntX, topY, transAngle);
  drawAngleLabelsBot(botIntX, botY, transAngle);

  // --- Line labels ---
  noStroke();
  textStyle(BOLD);
  textSize(18);

  // Line l label (top line)
  fill('#1565C0');
  textAlign(LEFT, BOTTOM);
  text('Line l', lineLeft + 5, topY - 10);

  // Line m label (bottom line)
  fill('#1565C0');
  textAlign(LEFT, BOTTOM);
  text('Line m', lineLeft + 5, botY - 10);

  // Transversal t label
  fill('#E53935');
  textAlign(LEFT, TOP);
  text('Transversal t', transBotX + 10, transBotY - 25);

  // --- Parallel symbol notation ---
  textSize(18);
  fill('#333333');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('l \u2225 m', cx, botY + 55);
  textStyle(NORMAL);

  // --- Legend box ---
  drawLegend(cx);

  noLoop();
}

function drawAngleArcs(intX, intY, dx, dy) {
  // Compute the transversal angle (going down-right)
  let transAngle = atan2(dy, dx);

  let arcR = 36;
  noStroke();

  // The four angles at each intersection:
  // Using the transversal going down-right and the horizontal line going right
  // transAngle is the angle of the transversal from positive x-axis

  // Angle between right horizontal (0) and transversal going down-right (transAngle)
  // There are 4 angles formed:
  // 1: above-left  (from transversal-up to left-horizontal) = PI+transAngle to PI
  // 2: above-right (from 2*PI+transAngle (i.e. transAngle+PI going other way) to 2*PI (i.e. 0))
  //    Actually let me think in terms of the four quadrants

  // The transversal makes angle transAngle with horizontal (measured from pos x-axis)
  // At the intersection, four angles are formed:
  // Going clockwise from "up-left":
  //   angle region 1: from (transAngle + PI) to PI          (above, left of transversal)
  //   angle region 2: from 0 (or 2PI) to transAngle+PI      (above, right of transversal)
  //     But let me just use the actual sector angles

  // transversal directions: transAngle (down-right) and transAngle+PI (up-left)
  // horizontal directions: 0 (right) and PI (left)

  // The four sectors (going counterclockwise from 0):
  // Sector A: 0 to transAngle (below-right of transversal, right of intersection)
  // Sector B: transAngle to PI (below-left of transversal, left of intersection)
  // Sector C: PI to transAngle + PI (above-left of transversal, left of intersection)
  // Sector D: transAngle + PI to 2*PI (above-right of transversal, right of intersection)

  // Semi-transparent light gray fills
  let c = color(180, 180, 220, 50);
  fill(c);

  // Sector A: 0 to transAngle
  arc(intX, intY, arcR * 2, arcR * 2, 0, transAngle, PIE);
  // Sector B: transAngle to PI
  arc(intX, intY, arcR * 2, arcR * 2, transAngle, PI, PIE);
  // Sector C: PI to transAngle + PI
  arc(intX, intY, arcR * 2, arcR * 2, PI, transAngle + PI, PIE);
  // Sector D: transAngle + PI to TWO_PI
  arc(intX, intY, arcR * 2, arcR * 2, transAngle + PI, TWO_PI, PIE);

  // Draw thin arc outlines
  noFill();
  stroke(150, 150, 180, 120);
  strokeWeight(1.5);
  arc(intX, intY, arcR * 2, arcR * 2, 0, transAngle);
  arc(intX, intY, arcR * 2, arcR * 2, transAngle, PI);
  arc(intX, intY, arcR * 2, arcR * 2, PI, transAngle + PI);
  arc(intX, intY, arcR * 2, arcR * 2, transAngle + PI, TWO_PI);
}

function drawAngleLabelsTop(intX, intY, transAngle) {
  // At the top intersection: angles 1, 2, 3, 4
  // Numbering clockwise from top-left:
  //   1 = above-left  (sector C: PI to transAngle+PI)
  //   2 = above-right (sector D: transAngle+PI to 2*PI)
  //   3 = below-right (sector A: 0 to transAngle)
  //   4 = below-left  (sector B: transAngle to PI)

  let labelR = 24;
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Angle 1: above-left
  let a1mid = (PI + transAngle + PI) / 2;
  fill('#7B1FA2');
  text('1', intX + labelR * cos(a1mid), intY + labelR * sin(a1mid));

  // Angle 2: above-right
  let a2mid = (transAngle + PI + TWO_PI) / 2;
  fill('#7B1FA2');
  text('2', intX + labelR * cos(a2mid), intY + labelR * sin(a2mid));

  // Angle 3: below-right
  let a3mid = transAngle / 2;
  fill('#7B1FA2');
  text('3', intX + labelR * cos(a3mid), intY + labelR * sin(a3mid));

  // Angle 4: below-left
  let a4mid = (transAngle + PI) / 2;
  fill('#7B1FA2');
  text('4', intX + labelR * cos(a4mid), intY + labelR * sin(a4mid));

  textStyle(NORMAL);
}

function drawAngleLabelsBot(intX, intY, transAngle) {
  // At the bottom intersection: angles 5, 6, 7, 8
  // Same layout as top:
  //   5 = above-left  (sector C)
  //   6 = above-right (sector D)
  //   7 = below-right (sector A)
  //   8 = below-left  (sector B)

  let labelR = 24;
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Angle 5: above-left
  let a5mid = (PI + transAngle + PI) / 2;
  fill('#00695C');
  text('5', intX + labelR * cos(a5mid), intY + labelR * sin(a5mid));

  // Angle 6: above-right
  let a6mid = (transAngle + PI + TWO_PI) / 2;
  fill('#00695C');
  text('6', intX + labelR * cos(a6mid), intY + labelR * sin(a6mid));

  // Angle 7: below-right
  let a7mid = transAngle / 2;
  fill('#00695C');
  text('7', intX + labelR * cos(a7mid), intY + labelR * sin(a7mid));

  // Angle 8: below-left
  let a8mid = (transAngle + PI) / 2;
  fill('#00695C');
  text('8', intX + labelR * cos(a8mid), intY + labelR * sin(a8mid));

  textStyle(NORMAL);
}

function drawLineArrow(x, y, dir) {
  // dir: -1 for left arrow, +1 for right arrow
  push();
  translate(x, y);
  if (dir < 0) rotate(PI);
  fill('#1565C0');
  noStroke();
  triangle(10, 0, -5, -6, -5, 6);
  pop();
}

function drawTransArrow(x, y, dx, dy, dir) {
  // dir: -1 for toward start, +1 for toward end
  let angle = atan2(dy, dx);
  push();
  translate(x, y);
  rotate(angle + (dir < 0 ? PI : 0));
  fill('#E53935');
  noStroke();
  triangle(10, 0, -5, -5, -5, 5);
  pop();
}

function drawParallelSymbol(x, y, count) {
  // Draw small right-pointing chevron(s) on the line to indicate parallel
  stroke('#1565C0');
  strokeWeight(2.5);
  noFill();
  let chevSize = 6;
  for (let i = 0; i < count; i++) {
    let cx = x + i * 8;
    line(cx - chevSize, y - chevSize, cx + chevSize, y);
    line(cx - chevSize, y + chevSize, cx + chevSize, y);
  }
}

function drawLegend(cx) {
  // Legend / key box at bottom
  let boxW = min(canvasWidth - 40, 500);
  let boxX = (canvasWidth - boxW) / 2;
  let boxY = drawHeight - 75;
  let boxH = 60;

  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  // Left accent bar
  fill('#43A047');
  noStroke();
  rect(boxX, boxY, 6, boxH, 10, 0, 0, 10);

  noStroke();
  textAlign(CENTER, TOP);

  fill('#2E7D32');
  textSize(14);
  textStyle(BOLD);
  text('Angle Pairs to Look For:', boxX + boxW / 2, boxY + 8);

  textStyle(NORMAL);
  fill('#333333');
  textSize(12);
  text(
    'Corresponding: 1&5, 2&6, 3&7, 4&8  |  Alternate Interior: 4&6, 3&5',
    boxX + boxW / 2, boxY + 28
  );
  text(
    'Alternate Exterior: 1&7, 2&8  |  Same-Side Interior: 3&6, 4&5',
    boxX + boxW / 2, boxY + 44
  );
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  loop();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
    canvasHeight = drawHeight;
  }
}
