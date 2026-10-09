// Cavalieri's Principle Demonstration
// CANVAS_HEIGHT: 595
// Bloom L2 and L5 (Understand, Evaluate): students compare a right solid with an oblique solid
// that has the same base and the same vertical height, and judge why the two volumes must be
// equal. A height slider moves one cutting plane through both solids at once, and a tilt slider
// slants the second solid. Showing each solid as a stack of thin slices makes the argument
// concrete: sliding the slices sideways changes the shape but not the amount of material.
// The student moves the plane; nothing animates by itself.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;
let defaultTextSize = 16;
let labelWidth = 115;       // width of the label span in each slider row
let valueWidth = 60;        // width of the value span in each slider row

const H = 30;               // vertical height of both solids, in units
const SLICES = 15;          // number of slices in the stack view

function rectOutline(w, d) {
  return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
}

const SOLIDS = [
  { name: 'Rectangular prism', noun: 'Prism', round: false, outline: y => rectOutline(12, 8), halfWidth: 9,
    baseText: 'Base: 12 × 8 = 96 square units', area: 96 },
  { name: 'Cylinder (stack of coins)', noun: 'Cylinder', round: true, radius: y => 6, halfWidth: 6,
    baseText: 'Base: π(6)² = 113.10 square units', area: Math.PI * 36 }
];

let solidSelect, stackCheckbox, heightRow, tiltRow;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  solidSelect = createSelect();
  solidSelect.parent(mainElement);
  for (const s of SOLIDS) solidSelect.option(s.name);
  solidSelect.position(65, drawHeight + 10);

  stackCheckbox = createCheckbox(' Show slices', true);
  stackCheckbox.parent(mainElement);
  stackCheckbox.style('font-size', '16px');

  heightRow = makeSliderRow('Plane height', 0, 100, 40, 5, 1);
  tiltRow = makeSliderRow('Tilt angle', 0, 45, 30, 1, 2);
  positionControls();

  describe('Two solids side by side with the same base and height: one upright and one slanted. ' +
    'A slider moves a horizontal cutting plane through both, showing equal cross-sectional areas at every height. ' +
    'A second slider changes the slant, and the volumes stay equal.', LABEL);
}

// A control row built from a div: the label and value sit in fixed-width spans so that
// every slider in the control area starts at the same x position.
function makeSliderRow(label, minValue, maxValue, startValue, step, rowIndex) {
  const row = createDiv();
  row.parent(document.querySelector('main'));
  row.position(10, drawHeight + 8 + rowIndex * 35);
  row.style('font-size', '16px');
  const labelSpan = createSpan(label + ':');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('width', labelWidth + 'px');
  const valueSpan = createSpan('');
  valueSpan.parent(row);
  valueSpan.style('display', 'inline-block');
  valueSpan.style('width', valueWidth + 'px');
  valueSpan.style('font-weight', 'bold');
  const slider = createSlider(minValue, maxValue, startValue, step);
  slider.parent(row);
  slider.style('vertical-align', 'middle');
  return { slider, valueSpan };
}

function positionControls() {
  const w = max(60, canvasWidth - labelWidth - valueWidth - 40);
  heightRow.slider.size(w);
  tiltRow.slider.size(w);
  stackCheckbox.position(min(290, canvasWidth - 130), drawHeight + 10);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const solid = SOLIDS[solidSelect.elt.selectedIndex];
  const pct = heightRow.slider.value();
  const tilt = tiltRow.slider.value();
  const yCut = H * pct / 100;
  const lean = H * Math.tan(radians(tilt));       // sideways shift of the top, in units
  heightRow.valueSpan.html(nf(yCut, 1, 1));
  tiltRow.valueSpan.html(tilt + '°');
  const narrow = canvasWidth < 600;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 17 : 23);
  text('Cavalieri\'s Principle: Same Slices, Same Volume', canvasWidth / 2, 8);

  const half = (canvasWidth - 3 * margin) / 2;
  const leftX = margin, rightX = 2 * margin + half;
  drawSolidPanel(leftX, 42, half, 258, solid, 'Right ' + solid.noun, 0, yCut, [33, 150, 243], 'aliceblue', narrow);
  drawSolidPanel(rightX, 42, half, 258, solid, 'Oblique ' + solid.noun, lean, yCut, [255, 152, 0], 'oldlace', narrow);
  drawMeasurements(leftX, 306, half, solid, yCut, 'aliceblue', narrow);
  drawMeasurements(rightX, 306, half, solid, yCut, 'oldlace', narrow);

  // conclusion
  const cy = 402, ch = drawHeight - cy - 8;
  fill('honeydew');
  stroke('mediumseagreen');
  strokeWeight(1.5);
  rect(margin, cy, canvasWidth - 2 * margin, ch, 10);
  noStroke();
  fill('darkgreen');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 13 : 17);
  text('✓ The volumes are equal at every tilt angle.', margin + 12, cy + 7);
  textStyle(NORMAL);
  fill('black');
  textSize(narrow ? 11 : 14);
  text('Cavalieri\'s Principle: if two solids have the same height and equal cross-sectional areas at every level, ' +
    'they have equal volumes, whatever their shape or slant.', margin + 12, cy + 30, canvasWidth - 2 * margin - 24, ch - 32);

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Solid:', 10, drawHeight + 22);
}

// ---------- solids drawn in an axonometric view ----------
// Solid coordinates: x to the right, y up, z away from the viewer. Polygonal solids are turned
// about the vertical axis by YAW so that two side faces show. TILT sets how far depth lifts a
// point on the screen. shiftAt(y) slides the cross-section at height y sideways, which is
// what turns a right solid into an oblique one.
const YAW = 0.6;
const TILT = 0.36;

function makeProjector(ox, oy, s, shiftAt) {
  const c = Math.cos(YAW), sn = Math.sin(YAW);
  return (x, y, z) => {
    const xr = x * c + z * sn, zr = -x * sn + z * c;
    return [ox + (xr + shiftAt(y)) * s, oy - (y + zr * TILT) * s, zr];
  };
}

// A point on the circular cross-section of a round solid. phi = PI is the left edge,
// 3 PI / 2 is the point nearest the viewer, and 2 PI is the right edge.
function ringPoint(ox, oy, s, r, y, phi, shift) {
  return [ox + (r * Math.cos(phi) + shift) * s, oy - (y + r * Math.sin(phi) * TILT) * s];
}

// Draw the part of a solid between heights y0 and y1, then its top face
function drawSegment(solid, ox, oy, s, y0, y1, shiftAt) {
  if (y1 <= y0) return;
  if (solid.round) {
    beginShape();
    let p = ringPoint(ox, oy, s, solid.radius(y0), y0, PI, shiftAt(y0));
    vertex(p[0], p[1]);
    for (let k = 0; k <= 20; k++) {                      // across the front of the top
      p = ringPoint(ox, oy, s, solid.radius(y1), y1, PI + k * PI / 20, shiftAt(y1));
      vertex(p[0], p[1]);
    }
    for (let k = 20; k >= 0; k--) {                      // back across the front of the bottom
      p = ringPoint(ox, oy, s, solid.radius(y0), y0, PI + k * PI / 20, shiftAt(y0));
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
    const top = ringPoint(ox, oy, s, 0, y1, 0, shiftAt(y1));
    ellipse(top[0], top[1], 2 * solid.radius(y1) * s, 2 * solid.radius(y1) * s * TILT);
  } else {
    const P = makeProjector(ox, oy, s, shiftAt);
    const a = solid.outline(y0).map(p => P(p[0], y0, p[1]));
    const b = solid.outline(y1).map(p => P(p[0], y1, p[1]));
    const faces = a.map((p, i) => {
      const j = (i + 1) % a.length;
      return { pts: [a[i], a[j], b[j], b[i]], depth: (a[i][2] + a[j][2] + b[i][2] + b[j][2]) / 4 };
    }).sort((f, g) => g.depth - f.depth);
    for (const f of faces) {
      beginShape();
      for (const p of f.pts) vertex(p[0], p[1]);
      endShape(CLOSE);
    }
    beginShape();
    for (const p of b) vertex(p[0], p[1]);
    endShape(CLOSE);
  }
}

// Outline of the cross-section at height y
function drawSection(solid, ox, oy, s, y, shift) {
  if (solid.round) {
    const c = ringPoint(ox, oy, s, 0, y, 0, shift);
    ellipse(c[0], c[1], 2 * solid.radius(y) * s, 2 * solid.radius(y) * s * TILT);
  } else {
    const P = makeProjector(ox, oy, s, () => shift);
    beginShape();
    for (const p of solid.outline(y)) {
      const q = P(p[0], y, p[1]);
      vertex(q[0], q[1]);
    }
    endShape(CLOSE);
  }
}

function drawSolidPanel(x, y, w, h, solid, title, lean, yCut, rgb, bg, narrow) {
  fill(bg);
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 13 : 17);
  text(title, x + 10, y + 7);
  textStyle(NORMAL);

  // scale so that the solid fits even at the largest tilt (lean = H at 45 degrees)
  const s = min((w - 24) / (H + 2 * solid.halfWidth + 2), (h - 52) / (H + 7));
  const ox = x + w / 2 - lean * s / 2;
  const oy = y + h - 22;
  const smooth = yy => lean * yy / H;

  stroke(rgb[0] * 0.45, rgb[1] * 0.45, rgb[2] * 0.45);
  strokeWeight(1);
  if (stackCheckbox.checked()) {
    // a stack of straight slices, each one slid sideways a little more than the one below
    for (let i = 0; i < SLICES; i++) {
      const y0 = H * i / SLICES, y1 = H * (i + 1) / SLICES;
      const shift = lean * (y0 + y1) / 2 / H;
      const below = y1 <= yCut + 0.001;
      fill(rgb[0], rgb[1], rgb[2], below ? 215 : 90);
      drawSegment(solid, ox, oy, s, y0, y1, () => shift);
    }
  } else {
    fill(rgb[0], rgb[1], rgb[2], 215);
    drawSegment(solid, ox, oy, s, 0, yCut, smooth);
    fill(rgb[0], rgb[1], rgb[2], 80);
    drawSegment(solid, ox, oy, s, yCut, H, smooth);
  }

  // cutting plane: a dashed line across the panel and the highlighted cross-section
  const lineY = oy - yCut * s;
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([5, 4]);
  line(x + 8, lineY, x + w - 8, lineY);
  drawingContext.setLineDash([]);
  fill(255, 235, 59, 200);
  stroke('red');
  strokeWeight(3);
  drawSection(solid, ox, oy, s, yCut, smooth(yCut));

  noStroke();
  fill('firebrick');
  textAlign(RIGHT, BOTTOM);
  textSize(narrow ? 11 : 14);
  text('h = ' + nf(yCut, 1, 1), x + w - 10, lineY - 3);
}

function drawMeasurements(x, y, w, solid, yCut, bg, narrow) {
  const ts = narrow ? 11 : 15;
  const lh = ts + 6;
  fill(bg);
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, 90, 10);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(ts);
  fill('black');
  text(solid.baseText, x + 10, y + 8);
  text('Slice at h = ' + nf(yCut, 1, 1) + ': ' + nf(solid.area, 1, 2) + ' square units', x + 10, y + 8 + lh);
  fill('blue');
  textStyle(BOLD);
  textSize(ts + 1);
  text('V = Bh = ' + nf(solid.area, 1, 2) + ' × ' + H + ' = ' + nf(solid.area * H, 1, 1), x + 10, y + 10 + 2 * lh);
  textStyle(NORMAL);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
