// Surface Area Calculator
// CANVAS_HEIGHT: 580
// Bloom L3-L4 (Apply, Analyze): students apply the surface area formula for six solids and
// analyze how changing one dimension changes the total. Each solid is drawn with its
// dimensions labeled, and the calculation is shown step by step with the current values
// substituted, so the student can check hand work against it.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;
let defaultTextSize = 16;
let labelWidth = 150;       // width of the label span in each slider row
let valueWidth = 45;        // width of the value span in each slider row

function rectOutline(w, d) {
  return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
}
const fmt = v => (Math.round(v * 100) / 100).toString();

// Each solid lists its sliders, how to build its shape from the slider values v, and how to
// show the surface area calculation. A slant height shorter than the base allows is not a
// real solid, so shape() reports valid = false and the panel explains why.
const SOLIDS = [
  { name: 'Rectangular Prism',
    params: [['Length l', 5, 20, 12], ['Width w', 5, 20, 8], ['Height h', 5, 20, 10]],
    shape: v => ({ round: false, H: v[2], outline: y => rectOutline(v[0], v[1]), valid: true }),
    formula: 'SA = 2(lw + lh + wh)',
    steps: v => ['= 2(' + v[0] + '·' + v[1] + ' + ' + v[0] + '·' + v[2] + ' + ' + v[1] + '·' + v[2] + ')',
      '= 2(' + v[0] * v[1] + ' + ' + v[0] * v[2] + ' + ' + v[1] * v[2] + ')',
      '= 2(' + (v[0] * v[1] + v[0] * v[2] + v[1] * v[2]) + ')'],
    area: v => 2 * (v[0] * v[1] + v[0] * v[2] + v[1] * v[2]),
    parts: v => 'Three pairs of congruent rectangles' },
  { name: 'Cube',
    params: [['Side s', 5, 20, 10]],
    shape: v => ({ round: false, H: v[0], outline: y => rectOutline(v[0], v[0]), valid: true }),
    formula: 'SA = 6s²',
    steps: v => ['= 6(' + v[0] + ')²', '= 6(' + v[0] * v[0] + ')'],
    area: v => 6 * v[0] * v[0],
    parts: v => 'Six congruent squares of area ' + v[0] * v[0] },
  { name: 'Cylinder',
    params: [['Radius r', 3, 15, 5], ['Height h', 5, 25, 12]],
    shape: v => ({ round: true, H: v[1], radius: y => v[0], valid: true }),
    formula: 'SA = 2πr² + 2πrh',
    steps: v => ['= 2π(' + v[0] + ')² + 2π(' + v[0] + ')(' + v[1] + ')',
      '= ' + 2 * v[0] * v[0] + 'π + ' + 2 * v[0] * v[1] + 'π',
      '= ' + (2 * v[0] * v[0] + 2 * v[0] * v[1]) + 'π'],
    area: v => 2 * Math.PI * v[0] * v[0] + 2 * Math.PI * v[0] * v[1],
    parts: v => 'Two circles (' + fmt(2 * Math.PI * v[0] * v[0]) + ') + side (' + fmt(2 * Math.PI * v[0] * v[1]) + ')' },
  { name: 'Square Pyramid',
    params: [['Base side s', 5, 20, 10], ['Slant height l', 5, 25, 12]],
    shape: v => {
      const valid = v[1] > v[0] / 2;
      const Hp = valid ? Math.sqrt(v[1] * v[1] - v[0] * v[0] / 4) : 0.01;
      return { round: false, H: Hp, outline: y => rectOutline(v[0] * (1 - y / Hp), v[0] * (1 - y / Hp)), valid,
        why: 'The slant height must be greater than half the base side (' + v[0] / 2 + ').' };
    },
    formula: 'SA = s² + 2sl',
    steps: v => ['= (' + v[0] + ')² + 2(' + v[0] + ')(' + v[1] + ')', '= ' + v[0] * v[0] + ' + ' + 2 * v[0] * v[1]],
    area: v => v[0] * v[0] + 2 * v[0] * v[1],
    parts: v => 'Square base (' + v[0] * v[0] + ') + four triangles (' + 2 * v[0] * v[1] + ')' },
  { name: 'Cone',
    params: [['Radius r', 3, 15, 5], ['Slant height l', 5, 25, 13]],
    shape: v => {
      const valid = v[1] > v[0];
      const Hc = valid ? Math.sqrt(v[1] * v[1] - v[0] * v[0]) : 0.01;
      return { round: true, H: Hc, radius: y => v[0] * (1 - y / Hc), valid,
        why: 'The slant height must be greater than the radius (' + v[0] + ').' };
    },
    formula: 'SA = πr² + πrl',
    steps: v => ['= π(' + v[0] + ')² + π(' + v[0] + ')(' + v[1] + ')',
      '= ' + v[0] * v[0] + 'π + ' + v[0] * v[1] + 'π',
      '= ' + (v[0] * v[0] + v[0] * v[1]) + 'π'],
    area: v => Math.PI * v[0] * v[0] + Math.PI * v[0] * v[1],
    parts: v => 'Circle base (' + fmt(Math.PI * v[0] * v[0]) + ') + lateral surface (' + fmt(Math.PI * v[0] * v[1]) + ')' },
  { name: 'Sphere',
    params: [['Radius r', 3, 20, 8]],
    shape: v => ({ round: true, steps: 28, H: 2 * v[0], radius: y => Math.sqrt(Math.max(0, v[0] * v[0] - (y - v[0]) * (y - v[0]))), valid: true }),
    formula: 'SA = 4πr²',
    steps: v => ['= 4π(' + v[0] + ')²', '= ' + 4 * v[0] * v[0] + 'π'],
    area: v => 4 * Math.PI * v[0] * v[0],
    parts: v => 'Exactly four great circles of area ' + fmt(Math.PI * v[0] * v[0]) }
];

let solidSelect, workCheckbox;
let rows = [];
let currentIndex = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  solidSelect = createSelect();
  solidSelect.parent(mainElement);
  for (const s of SOLIDS) solidSelect.option(s.name);
  solidSelect.position(65, drawHeight + 10);

  workCheckbox = createCheckbox(' Show work', true);
  workCheckbox.parent(mainElement);
  workCheckbox.style('font-size', '16px');
  workCheckbox.position(240, drawHeight + 10);

  for (let i = 0; i < 3; i++) rows.push(makeSliderRow(i + 1));
  resizeSliders();
  configureSliders();

  describe('Surface area calculator. A dropdown chooses a rectangular prism, cube, cylinder, square pyramid, cone, or sphere. ' +
    'Sliders set its dimensions. The solid is drawn with labeled dimensions beside the formula, the substitution steps, and the total surface area.', LABEL);
}

// A control row built from a div: the label and value sit in fixed-width spans so that
// every slider in the control area starts at the same x position.
function makeSliderRow(rowIndex) {
  const row = createDiv();
  row.parent(document.querySelector('main'));
  row.position(10, drawHeight + 8 + rowIndex * 35);
  row.style('font-size', '16px');
  const labelSpan = createSpan('');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('width', labelWidth + 'px');
  const valueSpan = createSpan('');
  valueSpan.parent(row);
  valueSpan.style('display', 'inline-block');
  valueSpan.style('width', valueWidth + 'px');
  valueSpan.style('font-weight', 'bold');
  const slider = createSlider(0, 10, 5, 1);
  slider.parent(row);
  slider.style('vertical-align', 'middle');
  return { row, labelSpan, valueSpan, slider };
}

function resizeSliders() {
  const w = max(60, canvasWidth - labelWidth - valueWidth - 40);
  for (const r of rows) r.slider.size(w);
}

// Give the slider rows the labels, ranges, and defaults of the selected solid
function configureSliders() {
  currentIndex = solidSelect.elt.selectedIndex;
  const params = SOLIDS[currentIndex].params;
  for (let i = 0; i < rows.length; i++) {
    if (i < params.length) {
      rows[i].labelSpan.html(params[i][0] + ':');
      rows[i].slider.elt.min = params[i][1];
      rows[i].slider.elt.max = params[i][2];
      rows[i].slider.value(params[i][3]);
      rows[i].row.show();
    } else {
      rows[i].row.hide();
    }
  }
}

function draw() {
  updateCanvasSize();
  if (solidSelect.elt.selectedIndex !== currentIndex) configureSliders();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const solid = SOLIDS[currentIndex];
  const v = solid.params.map((p, i) => rows[i].slider.value());
  for (let i = 0; i < v.length; i++) rows[i].valueSpan.html(v[i]);
  const shape = solid.shape(v);
  const narrow = canvasWidth < 600;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 18 : 24);
  text('Surface Area Calculator', canvasWidth / 2, 8);

  const leftW = canvasWidth * (narrow ? 0.44 : 0.48);
  drawSolidPanel(margin, 42, leftW - margin, drawHeight - 52, solid, shape, v, narrow);

  // right side: formula, steps, result
  const px = leftW + 10, pw = canvasWidth - margin - px;
  const ts = narrow ? 12 : 16;
  const lh = ts + 7;
  let y = drawPanel(px, 42, pw, 'Formula', 'aliceblue', ts, lh, [[solid.formula, 'black']]) + 8;
  if (!shape.valid) {
    drawPanel(px, y, pw, 'Not a real solid', 'mistyrose', ts, lh, wrapLines(shape.why, pw - 20, ts).map(t => [t, 'firebrick']));
  } else {
    if (workCheckbox.checked()) {
      const lines = solid.steps(v).map(t => [t, 'black']);
      lines.push([solid.parts(v), 'dimgray']);
      y = drawPanel(px, y, pw, 'Calculation Steps', 'lightyellow', narrow ? 11 : 15, (narrow ? 11 : 15) + 7, lines) + 8;
    }
    fill('honeydew');
    stroke('mediumseagreen');
    strokeWeight(1.5);
    rect(px, y, pw, 76, 10);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    textSize(ts + 1);
    text('Surface Area', px + 10, y + 8);
    fill('blue');
    textSize(narrow ? 17 : 24);
    text('≈ ' + nf(solid.area(v), 1, 2) + ' square units', px + 10, y + 36);
    textStyle(NORMAL);
  }

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Solid:', 10, drawHeight + 22);
}

// Break a sentence into lines that fit a width at a given text size
function wrapLines(str, w, ts) {
  textSize(ts);
  const out = [];
  let line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { out.push(line); line = word; } else line = trial;
  }
  if (line) out.push(line);
  return out;
}

// A titled panel holding lines of text. Returns the y coordinate of its bottom edge.
function drawPanel(x, y, w, title, bg, ts, lh, lines) {
  const h = 14 + lh * (lines.length + 1);
  fill(bg);
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(ts + 1);
  text(title, x + 10, y + 7);
  textStyle(NORMAL);
  textSize(ts);
  for (let i = 0; i < lines.length; i++) {
    fill(lines[i][1]);
    text(lines[i][0], x + 10, y + 9 + lh * (i + 1));
  }
  return y + h;
}

// ---------- solids drawn in an axonometric view ----------
// Solid coordinates: x to the right, y up, z away from the viewer. Polygonal solids are turned
// about the vertical axis by YAW so that two side faces show. TILT sets how far depth lifts a
// point on the screen, which turns a horizontal circle into an ellipse.
const YAW = 0.6;
const TILT = 0.36;

function makeProjector(ox, oy, s) {
  const c = Math.cos(YAW), sn = Math.sin(YAW);
  return (x, y, z) => {
    const xr = x * c + z * sn, zr = -x * sn + z * c;
    return [ox + xr * s, oy - (y + zr * TILT) * s, zr];
  };
}

// A point on the circular cross-section of a round solid. phi = PI is the left edge,
// 3 PI / 2 is the point nearest the viewer, and 2 PI is the right edge.
function ringPoint(ox, oy, s, r, y, phi) {
  return [ox + r * Math.cos(phi) * s, oy - (y + r * Math.sin(phi) * TILT) * s];
}

// Draw a whole solid: its side surface from the base to the top, then its top face
function drawSolid(shape, ox, oy, s) {
  const y0 = 0, y1 = shape.H;
  if (shape.round) {
    const n = shape.steps || 1;
    // a sphere is sampled by angle rather than by height, so its outline is a true circle
    const yAt = u => shape.steps ? shape.H / 2 * (1 - Math.cos(PI * u)) : lerp(y0, y1, u);
    beginShape();
    for (let i = 0; i <= n; i++) {
      const y = yAt(i / n);
      const p = ringPoint(ox, oy, s, shape.radius(y), y, PI);
      vertex(p[0], p[1]);
    }
    for (let k = 1; k < 20; k++) {
      const p = ringPoint(ox, oy, s, shape.radius(y1), y1, PI + k * PI / 20);
      vertex(p[0], p[1]);
    }
    for (let i = n; i >= 0; i--) {
      const y = yAt(i / n);
      const p = ringPoint(ox, oy, s, shape.radius(y), y, TWO_PI);
      vertex(p[0], p[1]);
    }
    for (let k = 19; k > 0; k--) {
      const p = ringPoint(ox, oy, s, shape.radius(y0), y0, PI + k * PI / 20);
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
    const top = ringPoint(ox, oy, s, 0, y1, 0);
    ellipse(top[0], top[1], 2 * shape.radius(y1) * s, 2 * shape.radius(y1) * s * TILT);
  } else {
    const P = makeProjector(ox, oy, s);
    const a = shape.outline(y0).map(p => P(p[0], y0, p[1]));
    const b = shape.outline(y1).map(p => P(p[0], y1, p[1]));
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

function drawSolidPanel(x, y, w, h, solid, shape, v, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  if (!shape.valid) return;

  // fit the solid in the panel, leaving room for dimension labels
  const base = shape.round ? shape.radius(0) * 2 : null;
  const o = shape.round ? null : shape.outline(0);
  const wide = shape.round ? max(base, 2 * shape.radius(shape.H / 2)) : (o[1][0] - o[0][0]) * Math.cos(YAW) + (o[2][1] - o[1][1]) * Math.sin(YAW);
  const deep = shape.round ? wide * TILT : ((o[1][0] - o[0][0]) * Math.sin(YAW) + (o[2][1] - o[1][1]) * Math.cos(YAW)) * TILT;
  const s = min((w - (narrow ? 64 : 130)) / wide, (h - 80) / (shape.H + deep));
  const ox = x + w / 2 - 10;
  const oy = y + h - 40 - (shape.round ? 0 : deep * s / 2) - (h - 80 - (shape.H + deep) * s) / 2;

  stroke('midnightblue');
  strokeWeight(1.5);
  fill(100, 181, 246, 190);
  drawSolid(shape, ox, oy, s);

  // dimension lines and labels
  const ls = narrow ? 12 : 16;
  textSize(ls);
  textStyle(BOLD);
  // each label gets a white backing so it stays readable where it crosses an edge
  const label = (str, px, py, col, ax, ay) => {
    const tw = textWidth(str) + 8, th = ls + 6;
    const bx = ax === RIGHT ? px - tw + 4 : (ax === CENTER ? px - tw / 2 : px - 4);
    const by = ay === TOP ? py - 3 : (ay === BOTTOM ? py - th + 3 : py - th / 2);
    noStroke();
    fill(255, 255, 255, 225);
    rect(bx, by, tw, th, 4);
    fill(col);
    textAlign(ax, ay);
    text(str, px, py);
  };
  const P = makeProjector(ox, oy, s);
  if (solid.name === 'Rectangular Prism' || solid.name === 'Cube') {
    const a = shape.outline(0).map(p => P(p[0], 0, p[1]));
    const top1 = P(shape.outline(0)[1][0], shape.H, shape.outline(0)[1][1]);
    if (solid.name === 'Cube') {
      label('s = ' + v[0], (a[0][0] + a[1][0]) / 2 - 6, (a[0][1] + a[1][1]) / 2 + 6, 'firebrick', RIGHT, TOP);
    } else {
      label('l = ' + v[0], (a[0][0] + a[1][0]) / 2 - 6, (a[0][1] + a[1][1]) / 2 + 6, 'firebrick', RIGHT, TOP);
      label('w = ' + v[1], (a[1][0] + a[2][0]) / 2 + 8, (a[1][1] + a[2][1]) / 2 + 6, 'darkgreen', LEFT, TOP);
      label('h = ' + v[2], a[2][0] + 8, (a[2][1] + P(shape.outline(0)[2][0], shape.H, shape.outline(0)[2][1])[1]) / 2, 'purple', LEFT, CENTER);
    }
  } else if (solid.name === 'Square Pyramid') {
    const a = shape.outline(0).map(p => P(p[0], 0, p[1]));
    const apex = P(0, shape.H, 0);
    const mid = [(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2];
    stroke('purple');
    strokeWeight(2.5);
    line(apex[0], apex[1], mid[0], mid[1]);                 // slant height on the front face
    label('s = ' + v[0], mid[0] - 6, mid[1] + 8, 'firebrick', RIGHT, TOP);
    label('l = ' + v[1], (apex[0] + mid[0]) / 2 - 8, (apex[1] + mid[1]) / 2, 'purple', RIGHT, CENTER);
  } else if (solid.name === 'Cylinder') {
    const c = ringPoint(ox, oy, s, 0, shape.H, 0), e = ringPoint(ox, oy, s, v[0], shape.H, TWO_PI);
    stroke('firebrick');
    strokeWeight(2.5);
    line(c[0], c[1], e[0], e[1]);
    label('r = ' + v[0], (c[0] + e[0]) / 2, c[1] - 5, 'firebrick', CENTER, BOTTOM);
    label('h = ' + v[1], e[0] + 8, oy - shape.H * s / 2, 'purple', LEFT, CENTER);
  } else if (solid.name === 'Cone') {
    const c = ringPoint(ox, oy, s, 0, 0, 0), e = ringPoint(ox, oy, s, v[0], 0, TWO_PI), apex = ringPoint(ox, oy, s, 0, shape.H, 0);
    stroke('firebrick');
    strokeWeight(2.5);
    line(c[0], c[1], e[0], e[1]);
    stroke('purple');
    line(apex[0], apex[1], e[0], e[1]);                     // slant height along the edge
    label('r = ' + v[0], (c[0] + e[0]) / 2, c[1] + 6, 'firebrick', CENTER, TOP);
    label('l = ' + v[1], (apex[0] + e[0]) / 2 + 9, (apex[1] + e[1]) / 2, 'purple', LEFT, CENTER);
  } else {
    const c = ringPoint(ox, oy, s, 0, v[0], 0), e = ringPoint(ox, oy, s, v[0], v[0], TWO_PI);
    noFill();
    stroke('midnightblue');
    strokeWeight(1);
    ellipse(c[0], c[1], 2 * v[0] * s, 2 * v[0] * s * TILT);  // equator
    stroke('firebrick');
    strokeWeight(2.5);
    line(c[0], c[1], e[0], e[1]);
    label('r = ' + v[0], (c[0] + e[0]) / 2, c[1] - 5, 'firebrick', CENTER, BOTTOM);
  }
  textStyle(NORMAL);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  resizeSliders();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
