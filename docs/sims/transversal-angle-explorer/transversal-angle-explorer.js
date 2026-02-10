// Transversal Angle Explorer
// Interactive demonstration of angle relationships formed when
// a transversal crosses two parallel lines.
// Students drag a handle to rotate the transversal and click
// canvas-based buttons to highlight the four angle pair types.
// (Bloom's: Analyzing and Evaluating)

// ---- layout constants ----
let canvasWidth = 800;
let drawHeight = 530;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// ---- geometry state ----
let transversalAngleDeg = 60; // acute angle transversal makes with horizontal

// Parallel-line positions (y) and horizontal extent
let lineY1, lineY2, lineLeft, lineRight;
let lineSpacing = 190;

// Transversal handle (user drags the circle at one end)
let handleRadius = 14;
let draggingHandle = false;

// ---- highlight mode ----
// 0=none, 1=corresponding, 2=alt interior, 3=alt exterior, 4=same-side interior
let highlightMode = 0;

// ---- button definitions (built once in setup, drawn each frame) ----
let buttons = [];

// ---- colors ----
const COL_LINE  = '#1565C0';      // parallel lines
const COL_TRANS = '#E53935';      // transversal
const COL_CORRESPONDING = [76, 175, 80, 130];   // green
const COL_ALT_INTERIOR  = [255, 193, 7, 130];   // yellow
const COL_ALT_EXTERIOR  = [255, 152, 0, 130];   // orange
const COL_SAME_SIDE     = [156, 39, 176, 130];  // purple
const COL_DEFAULT_ARC   = [200, 200, 200, 60];

// ================================================================
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  buildButtons();
  recalcGeometry();

  describe(
    'Interactive parallel lines and transversal angle explorer. ' +
    'Drag the red handle to rotate the transversal and click ' +
    'buttons to highlight angle pair relationships.',
    LABEL
  );
}

// ================================================================
function draw() {
  updateCanvasSize();
  recalcGeometry();

  // ---- drawing area ----
  fill('aliceblue');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // ---- control area ----
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // thin separator
  stroke('#B0BEC5');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // ---- title ----
  noStroke();
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Transversal Angle Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // ---- subtitle ----
  fill('#757575');
  textSize(13);
  text('Drag the red handle to rotate the transversal', canvasWidth / 2, 38);

  // ---- build angle data for this frame ----
  let topAngles = buildTopAngles();
  let botAngles = buildBotAngles();
  let pts = intersections();

  // Draw angle arcs (behind lines)
  drawArcSet(pts.x1, pts.y1, topAngles, 38);
  drawArcSet(pts.x2, pts.y2, botAngles, 38);

  // Draw parallel lines
  drawParallelLines();

  // Draw transversal
  drawTransversal();

  // Draw angle number labels
  drawLabelSet(pts.x1, pts.y1, topAngles, 62);
  drawLabelSet(pts.x2, pts.y2, botAngles, 62);

  // Intersection dots
  fill('#FF9800');
  noStroke();
  circle(pts.x1, pts.y1, 10);
  circle(pts.x2, pts.y2, 10);

  // Draw legend box
  drawLegend();

  // Draw relationship info panel (when a mode is active)
  drawRelationshipInfo();

  // Draw the draggable handle (always on top)
  drawHandle();

  // Draw buttons in control area
  drawButtons();

  // Draw description text in control area
  drawControlText();
}

// ================================================================
//  ANGLE DATA BUILDERS
// ================================================================
//
// Z-pattern numbering matching the chapter text:
//   Top intersection: 1=UL, 2=UR, 3=LL, 4=LR
//   Bot intersection: 5=UL, 6=UR, 7=LL, 8=LR
//
// The transversal goes from upper-left to lower-right with screen
// angle = a degrees below horizontal.  At each intersection, the
// four ray screen angles (CW from +x) are: 0, a, 180, 180+a.
//
// Sector assignments:
//   UL: 180 to 180+a  (sweep = a)
//   UR: 180+a to 360  (sweep = 180-a)
//   LL: a to 180      (sweep = 180-a)
//   LR: 0 to a        (sweep = a)
//
// Measures: 1=a, 2=180-a, 3=180-a, 4=a, 5=a, 6=180-a, 7=180-a, 8=a
//
// Verified relationships:
//   Corresponding: 1&5=a, 2&6=180-a, 3&7=180-a, 4&8=a  (congruent)
//   Alt Interior:  3&6=180-a, 4&5=a  (congruent)
//   Alt Exterior:  1&8=a, 2&7=180-a  (congruent)
//   Same-Side Int: 3+5=180, 4+6=180  (supplementary)
//   Vertical:      1&4=a, 2&3=180-a  (congruent)

function buildTopAngles() {
  let a = transversalAngleDeg;
  return [
    { start: 180,     sweep: a,       num: 1, measure: round(a) },
    { start: 180 + a, sweep: 180 - a, num: 2, measure: round(180 - a) },
    { start: a,       sweep: 180 - a, num: 3, measure: round(180 - a) },
    { start: 0,       sweep: a,       num: 4, measure: round(a) }
  ];
}

function buildBotAngles() {
  let a = transversalAngleDeg;
  return [
    { start: 180,     sweep: a,       num: 5, measure: round(a) },
    { start: 180 + a, sweep: 180 - a, num: 6, measure: round(180 - a) },
    { start: a,       sweep: 180 - a, num: 7, measure: round(180 - a) },
    { start: 0,       sweep: a,       num: 8, measure: round(a) }
  ];
}

// ================================================================
//  GEOMETRY HELPERS
// ================================================================

function recalcGeometry() {
  lineY1 = drawHeight / 2 - lineSpacing / 2 + 20;
  lineY2 = lineY1 + lineSpacing;
  lineLeft = margin + 40;
  lineRight = canvasWidth - margin - 40;
}

function intersections() {
  let cx = canvasWidth / 2;
  let tanA = tan(radians(transversalAngleDeg));
  let ix1 = cx - (lineSpacing / 2) / tanA;
  let ix2 = cx + (lineSpacing / 2) / tanA;
  return { x1: ix1, y1: lineY1, x2: ix2, y2: lineY2 };
}

// ================================================================
//  DRAW FUNCTIONS
// ================================================================

function drawParallelLines() {
  stroke(COL_LINE);
  strokeWeight(4);
  line(lineLeft, lineY1, lineRight, lineY1);
  line(lineLeft, lineY2, lineRight, lineY2);

  // Parallel arrow marks
  let arrowX = canvasWidth / 2 - 60;
  fill(COL_LINE);
  noStroke();
  triangle(arrowX, lineY1 - 7, arrowX, lineY1 + 7, arrowX + 14, lineY1);
  triangle(arrowX - 18, lineY1 - 7, arrowX - 18, lineY1 + 7, arrowX - 4, lineY1);
  triangle(arrowX, lineY2 - 7, arrowX, lineY2 + 7, arrowX + 14, lineY2);
  triangle(arrowX - 18, lineY2 - 7, arrowX - 18, lineY2 + 7, arrowX - 4, lineY2);

  // Line labels
  noStroke();
  fill(COL_LINE);
  textSize(16);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('l', lineLeft - 12, lineY1);
  text('m', lineLeft - 12, lineY2);

  // Parallel symbol
  textAlign(LEFT, CENTER);
  textSize(14);
  text('l \u2225 m', lineRight - 50, lineY1 - 24);
  textStyle(NORMAL);
}

function drawTransversal() {
  let pts = intersections();
  let cosA = cos(radians(transversalAngleDeg));
  let sinA = sin(radians(transversalAngleDeg));
  let ext = 140;

  // Direction from top to bottom in screen coords: (cos(a), sin(a))
  // Extend beyond each intersection
  let x1 = pts.x1 - ext * cosA;
  let y1 = pts.y1 - ext * sinA;
  let x2 = pts.x2 + ext * cosA;
  let y2 = pts.y2 + ext * sinA;

  stroke(COL_TRANS);
  strokeWeight(4);
  line(x1, y1, x2, y2);

  // Transversal label near the lower-right end
  fill(COL_TRANS);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('t', x2 + 8, y2 + 8);
  textStyle(NORMAL);
}

function drawArcSet(cx, cy, angles, arcR) {
  for (let info of angles) {
    let col = getAngleColor(info.num);
    fill(col);
    if (highlightMode > 0 && isHighlighted(info.num)) {
      let c = getHighlightStrokeColor();
      stroke(c);
      strokeWeight(2);
    } else {
      stroke(180, 180, 180, 80);
      strokeWeight(1);
    }
    arc(cx, cy, arcR * 2, arcR * 2,
        radians(info.start), radians(info.start + info.sweep), PIE);
  }
}

function getAngleColor(num) {
  if (highlightMode === 0) return color(COL_DEFAULT_ARC);
  if (!isHighlighted(num)) return color(COL_DEFAULT_ARC);
  if (highlightMode === 1) return color(COL_CORRESPONDING);
  if (highlightMode === 2) return color(COL_ALT_INTERIOR);
  if (highlightMode === 3) return color(COL_ALT_EXTERIOR);
  if (highlightMode === 4) return color(COL_SAME_SIDE);
  return color(COL_DEFAULT_ARC);
}

function getHighlightStrokeColor() {
  if (highlightMode === 1) return color(46, 125, 50);
  if (highlightMode === 2) return color(245, 127, 23);
  if (highlightMode === 3) return color(230, 81, 0);
  if (highlightMode === 4) return color(106, 27, 154);
  return color(150);
}

function isHighlighted(num) {
  if (highlightMode === 1) return true; // corresponding: all 8
  if (highlightMode === 2) return (num === 3 || num === 4 || num === 5 || num === 6);
  if (highlightMode === 3) return (num === 1 || num === 2 || num === 7 || num === 8);
  if (highlightMode === 4) return (num === 3 || num === 4 || num === 5 || num === 6);
  return false;
}

function drawLabelSet(cx, cy, angles, labelR) {
  for (let info of angles) {
    let midDeg = info.start + info.sweep / 2;
    let lx = cx + labelR * cos(radians(midDeg));
    let ly = cy + labelR * sin(radians(midDeg));

    let highlighted = highlightMode > 0 && isHighlighted(info.num);

    noStroke();
    textAlign(CENTER, CENTER);

    // Angle number
    fill(highlighted ? '#212121' : '#757575');
    textSize(12);
    textStyle(BOLD);
    text('\u2220' + info.num, lx, ly - 7);

    // Measure
    textSize(10);
    textStyle(NORMAL);
    fill(highlighted ? '#424242' : '#9E9E9E');
    text(info.measure + '\u00B0', lx, ly + 7);
  }
}

function drawHandle() {
  let hp = handlePos();

  let hover = dist(mouseX, mouseY, hp.x, hp.y) < handleRadius * 1.8 || draggingHandle;

  fill(hover ? '#B71C1C' : '#EF5350');
  stroke('#C62828');
  strokeWeight(2);
  circle(hp.x, hp.y, handleRadius * 2);

  // Small rotation arrow icon
  fill(255, 255, 255, 200);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('\u21BB', hp.x, hp.y);
}

function handlePos() {
  let pts = intersections();
  let ext = 140;
  let cosA = cos(radians(transversalAngleDeg));
  let sinA = sin(radians(transversalAngleDeg));
  // Handle at the lower-right end of the transversal
  let hx = pts.x2 + ext * cosA;
  let hy = pts.y2 + ext * sinA;
  hx = constrain(hx, margin, canvasWidth - margin);
  hy = constrain(hy, margin, drawHeight - margin);
  return { x: hx, y: hy };
}

function drawLegend() {
  let legX = canvasWidth - 230;
  let legY = 60;
  let legW = 210;
  let legH = 115;

  fill(255, 255, 255, 230);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(legX, legY, legW, legH, 8);

  noStroke();
  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Angle Relationships:', legX + 12, legY + 8);
  textStyle(NORMAL);
  textSize(10);

  let items = [
    { col: color(COL_CORRESPONDING), label: 'Corresponding: \u2245 (congruent)' },
    { col: color(COL_ALT_INTERIOR),  label: 'Alt. Interior: \u2245 (congruent)' },
    { col: color(COL_ALT_EXTERIOR),  label: 'Alt. Exterior: \u2245 (congruent)' },
    { col: color(COL_SAME_SIDE),     label: 'Same-Side Int: supplementary' }
  ];

  let iy = legY + 30;
  for (let item of items) {
    fill(item.col);
    noStroke();
    rect(legX + 12, iy, 12, 12, 2);
    fill('#424242');
    textAlign(LEFT, TOP);
    text(item.label, legX + 30, iy + 1);
    iy += 20;
  }
}

function drawRelationshipInfo() {
  if (highlightMode === 0) return;

  let a = round(transversalAngleDeg);
  let o = 180 - a;

  let infoX = 20;
  let infoY = drawHeight - 110;
  let infoW = 370;
  let infoH = 95;

  let bgCol, strokeCol, titleCol;
  let title = '';
  let infoLines = [];

  if (highlightMode === 1) {
    bgCol = color(232, 245, 233);
    strokeCol = color(67, 160, 71);
    titleCol = '#2E7D32';
    title = 'Corresponding Angles (congruent)';
    infoLines = [
      '\u22201 \u2245 \u22205 = ' + a + '\u00B0     \u22202 \u2245 \u22206 = ' + o + '\u00B0',
      '\u22203 \u2245 \u22207 = ' + o + '\u00B0     \u22204 \u2245 \u22208 = ' + a + '\u00B0',
      'Same position at each intersection \u2192 CONGRUENT'
    ];
  } else if (highlightMode === 2) {
    bgCol = color(255, 248, 225);
    strokeCol = color(255, 160, 0);
    titleCol = '#E65100';
    title = 'Alternate Interior Angles (congruent)';
    infoLines = [
      '\u22203 \u2245 \u22206 = ' + o + '\u00B0',
      '\u22204 \u2245 \u22205 = ' + a + '\u00B0',
      'Opposite sides, between lines \u2192 CONGRUENT'
    ];
  } else if (highlightMode === 3) {
    bgCol = color(255, 243, 224);
    strokeCol = color(230, 81, 0);
    titleCol = '#BF360C';
    title = 'Alternate Exterior Angles (congruent)';
    infoLines = [
      '\u22201 \u2245 \u22208 = ' + a + '\u00B0',
      '\u22202 \u2245 \u22207 = ' + o + '\u00B0',
      'Opposite sides, outside lines \u2192 CONGRUENT'
    ];
  } else if (highlightMode === 4) {
    bgCol = color(243, 229, 245);
    strokeCol = color(142, 36, 170);
    titleCol = '#6A1B9A';
    title = 'Same-Side Interior Angles (supplementary)';
    infoLines = [
      '\u22203 + \u22205 = ' + o + '\u00B0 + ' + a + '\u00B0 = 180\u00B0',
      '\u22204 + \u22206 = ' + a + '\u00B0 + ' + o + '\u00B0 = 180\u00B0',
      'Same side, between lines \u2192 SUPPLEMENTARY'
    ];
  }

  fill(bgCol);
  stroke(strokeCol);
  strokeWeight(2);
  rect(infoX, infoY, infoW, infoH, 8);

  noStroke();
  fill(titleCol);
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(title, infoX + 12, infoY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  let ty = infoY + 30;
  for (let l of infoLines) {
    text(l, infoX + 12, ty);
    ty += 19;
  }
}

// ================================================================
//  BUTTONS (canvas-based)
// ================================================================

function buildButtons() {
  buttons = [];
  buttons.push({ label: 'Corresponding',  mode: 1, col: [76, 175, 80],  hoverCol: [56, 142, 60] });
  buttons.push({ label: 'Alt Interior',   mode: 2, col: [255, 193, 7],   hoverCol: [255, 160, 0] });
  buttons.push({ label: 'Alt Exterior',   mode: 3, col: [255, 152, 0],   hoverCol: [230, 81, 0] });
  buttons.push({ label: 'Same-Side Int',  mode: 4, col: [156, 39, 176],  hoverCol: [123, 31, 162] });
  buttons.push({ label: 'Reset',          mode: 0, col: [158, 158, 158], hoverCol: [117, 117, 117] });
}

function drawButtons() {
  let btnCount = buttons.length;
  let totalW = canvasWidth - 60;
  let gap = 10;
  let btnW = (totalW - gap * (btnCount - 1)) / btnCount;
  let btnH = 36;
  let btnY = drawHeight + 16;
  let startX = 30;

  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);

  for (let i = 0; i < btnCount; i++) {
    let b = buttons[i];
    let bx = startX + i * (btnW + gap);

    b.x = bx;
    b.y = btnY;
    b.w = btnW;
    b.h = btnH;

    let hover = mouseX >= bx && mouseX <= bx + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH;
    let active = (highlightMode === b.mode && b.mode !== 0);

    if (active) {
      fill(b.hoverCol[0], b.hoverCol[1], b.hoverCol[2]);
      stroke(0, 0, 0, 80);
      strokeWeight(2);
    } else if (hover) {
      fill(b.col[0], b.col[1], b.col[2], 220);
      stroke(0, 0, 0, 40);
      strokeWeight(1);
    } else {
      fill(b.col[0], b.col[1], b.col[2], 160);
      noStroke();
    }

    rect(bx, btnY, btnW, btnH, 6);

    noStroke();
    fill(255);
    text(b.label, bx + btnW / 2, btnY + btnH / 2);
  }

  textStyle(NORMAL);
}

function drawControlText() {
  noStroke();
  fill('#616161');
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(NORMAL);

  let modeText = '';
  if (highlightMode === 0) {
    modeText = 'Click a button above to highlight angle relationships';
  } else if (highlightMode === 1) {
    modeText = 'Corresponding angles occupy the same position at each intersection \u2014 congruent (\u2245)';
  } else if (highlightMode === 2) {
    modeText = 'Alternate interior angles: opposite sides of the transversal, between the lines \u2014 congruent (\u2245)';
  } else if (highlightMode === 3) {
    modeText = 'Alternate exterior angles: opposite sides of the transversal, outside the lines \u2014 congruent (\u2245)';
  } else if (highlightMode === 4) {
    modeText = 'Same-side interior angles: same side of the transversal, between the lines \u2014 supplementary (sum = 180\u00B0)';
  }

  text(modeText, canvasWidth / 2, drawHeight + 62);
}

// ================================================================
//  MOUSE INTERACTION
// ================================================================

function mousePressed() {
  // Check handle drag
  let hp = handlePos();
  if (dist(mouseX, mouseY, hp.x, hp.y) < handleRadius * 2) {
    draggingHandle = true;
    return;
  }

  // Check button clicks
  for (let b of buttons) {
    if (b.x !== undefined &&
        mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      highlightMode = b.mode;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingHandle) {
    let pts = intersections();
    let midX = (pts.x1 + pts.x2) / 2;
    let midY = (pts.y1 + pts.y2) / 2;

    // Calculate screen angle from midpoint to mouse position
    let dx = mouseX - midX;
    let dy = mouseY - midY;
    let screenAngle = degrees(atan2(dy, dx));
    screenAngle = ((screenAngle % 360) + 360) % 360;

    // The transversal screen angle = a (lower-right direction).
    // Accept angles near the lower-right quadrant (0-90)
    // or upper-left quadrant (180-270, which is the opposite direction).
    if (screenAngle > 90 && screenAngle < 180) {
      screenAngle = 80;
    } else if (screenAngle >= 180 && screenAngle <= 270) {
      screenAngle = screenAngle - 180;
    } else if (screenAngle > 270) {
      screenAngle = 20;
    }
    transversalAngleDeg = constrain(screenAngle, 20, 80);
  }
}

function mouseReleased() {
  draggingHandle = false;
}

// ================================================================
//  RESPONSIVE SIZING
// ================================================================

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    canvasWidth = min(canvasWidth, 900);
    canvasWidth = max(canvasWidth, 600);
  }
  canvasHeight = drawHeight + controlHeight;
}
