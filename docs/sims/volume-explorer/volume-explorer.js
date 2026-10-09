// Volume Explorer
// CANVAS_HEIGHT: 585
// Bloom L3-L5 (Apply, Analyze, Evaluate): students apply the volume formulas for six solids,
// analyze how width and height change the volume, and evaluate the relationship between two
// related solids. Both solids share one width and one height, so a prism can be compared with
// the pyramid that has the same base and height, a cylinder with its cone, and a sphere with
// the cylinder that just contains it.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;
let defaultTextSize = 16;
let labelWidth = 150;       // width of the label span in each slider row
let valueWidth = 45;        // width of the value span in each slider row

const MAX_WIDTH = 16, MAX_HEIGHT = 20;

function rectOutline(w, d) {
  return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
}

// Each solid is built from the shared width s and height h. usesHeight is false for the cube
// and the sphere, whose height is fixed by their width.
const SOLIDS = [
  { name: 'Square Prism', usesHeight: true, family: 'prism',
    shape: (s, h) => ({ round: false, H: h, outline: y => rectOutline(s, s) }),
    work: (s, h) => 'V = s²h = (' + s + ')²(' + h + ')', volume: (s, h) => s * s * h },
  { name: 'Cube', usesHeight: false, family: 'cube',
    shape: (s, h) => ({ round: false, H: s, outline: y => rectOutline(s, s) }),
    work: (s, h) => 'V = s³ = (' + s + ')³', volume: (s, h) => s * s * s },
  { name: 'Cylinder', usesHeight: true, family: 'cylinder',
    shape: (s, h) => ({ round: true, H: h, radius: y => s / 2 }),
    work: (s, h) => 'V = πr²h = π(' + s / 2 + ')²(' + h + ')', volume: (s, h) => Math.PI * s * s / 4 * h },
  { name: 'Square Pyramid', usesHeight: true, family: 'pyramid',
    shape: (s, h) => ({ round: false, H: h, outline: y => rectOutline(s * (1 - y / h), s * (1 - y / h)) }),
    work: (s, h) => 'V = ⅓s²h = ⅓(' + s + ')²(' + h + ')', volume: (s, h) => s * s * h / 3 },
  { name: 'Cone', usesHeight: true, family: 'cone',
    shape: (s, h) => ({ round: true, H: h, radius: y => s / 2 * (1 - y / h) }),
    work: (s, h) => 'V = ⅓πr²h = ⅓π(' + s / 2 + ')²(' + h + ')', volume: (s, h) => Math.PI * s * s / 4 * h / 3 },
  { name: 'Sphere', usesHeight: false, family: 'sphere',
    shape: (s, h) => ({ round: true, steps: 28, H: s, radius: y => Math.sqrt(Math.max(0, s * s / 4 - (y - s / 2) * (y - s / 2))) }),
    work: (s, h) => 'V = (4/3)πr³ = (4/3)π(' + s / 2 + ')³', volume: (s, h) => 4 / 3 * Math.PI * Math.pow(s / 2, 3) }
];

let selectA, selectB, widthRow, heightRow;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  selectA = createSelect();
  selectB = createSelect();
  for (const sel of [selectA, selectB]) {
    sel.parent(mainElement);
    for (const s of SOLIDS) sel.option(s.name);
  }
  selectA.selected('Cylinder');
  selectB.selected('Cone');

  widthRow = makeSliderRow('Width or diameter', 4, MAX_WIDTH, 10, 1, 1);
  heightRow = makeSliderRow('Height', 4, MAX_HEIGHT, 12, 1, 2);
  positionControls();

  describe('Two solids side by side that share one width and one height. Dropdowns choose each solid from square prism, cube, cylinder, ' +
    'square pyramid, cone, and sphere. Sliders set the width and height. Each volume is calculated with its formula and the two are compared as a ratio.', LABEL);
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
  widthRow.slider.size(w);
  heightRow.slider.size(w);
  selectA.position(78, drawHeight + 10);
  selectB.position(canvasWidth / 2 + 78, drawHeight + 10);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const s = widthRow.slider.value();
  const h = heightRow.slider.value();
  widthRow.valueSpan.html(s);
  heightRow.valueSpan.html(h);
  const A = SOLIDS[selectA.elt.selectedIndex];
  const B = SOLIDS[selectB.elt.selectedIndex];
  const vA = A.volume(s, h), vB = B.volume(s, h);
  const narrow = canvasWidth < 600;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 18 : 24);
  text('Volume Explorer: Compare Two Solids', canvasWidth / 2, 8);

  const half = (canvasWidth - 3 * margin) / 2;
  const leftX = margin, rightX = 2 * margin + half;
  drawSolidPanel(leftX, 42, half, 240, A, s, h, [33, 150, 243], 'Solid 1: ' + A.name, narrow);
  drawSolidPanel(rightX, 42, half, 240, B, s, h, [255, 152, 0], 'Solid 2: ' + B.name, narrow);
  drawWork(leftX, 288, half, A, s, h, vA, 'royalblue', narrow);
  drawWork(rightX, 288, half, B, s, h, vB, 'chocolate', narrow);
  drawComparison(margin, 372, canvasWidth - 2 * margin, drawHeight - 380, A, B, s, h, vA, vB, narrow);

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Solid 1:', 10, drawHeight + 22);
  text('Solid 2:', canvasWidth / 2 + 10, drawHeight + 22);
}

function drawSolidPanel(x, y, w, hgt, solid, s, h, rgb, title, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, hgt, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 16);
  text(title, x + 10, y + 7);
  textStyle(NORMAL);

  // one fixed scale for both panels, so a bigger solid really looks bigger
  const scale = min((w - 30) / (MAX_WIDTH * 1.45), (hgt - 62) / (MAX_HEIGHT + MAX_WIDTH * 0.5));
  const ox = x + w / 2, oy = y + hgt - 42;
  stroke(rgb[0] * 0.4, rgb[1] * 0.4, rgb[2] * 0.4);
  strokeWeight(1.5);
  fill(rgb[0], rgb[1], rgb[2], 185);
  drawSolid(solid.shape(s, h), ox, oy, scale);

  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  textSize(narrow ? 11 : 14);
  const widthWord = solid.family === 'sphere' || solid.family === 'cylinder' || solid.family === 'cone' ? 'diameter ' : 'side ';
  text(widthWord + s + (solid.usesHeight ? ',  height ' + h : ''), x + w / 2, y + hgt - 22);
}

function drawWork(x, y, w, solid, s, h, v, col, narrow) {
  fill('lightyellow');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, 76, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(narrow ? 12 : 16);
  text(solid.work(s, h), x + 10, y + 10);
  fill(col);
  textStyle(BOLD);
  textSize(narrow ? 15 : 21);
  text('V ≈ ' + nf(v, 1, 2) + ' cubic units', x + 10, y + 40);
  textStyle(NORMAL);
}

function drawComparison(x, y, w, hgt, A, B, s, h, vA, vB, narrow) {
  fill('honeydew');
  stroke('mediumseagreen');
  strokeWeight(1.5);
  rect(x, y, w, hgt, 10);

  const ratio = vA / vB;
  const pair = [A.family, B.family].sort().join('+');
  let insight;
  if (A.family === B.family) {
    insight = 'Both solids are the same, so the volumes are equal. Choose a different Solid 2.';
  } else if (pair === 'prism+pyramid') {
    insight = 'Same base and same height: the pyramid holds exactly one third of the prism. Three pyramids fill one prism.';
  } else if (pair === 'cone+cylinder') {
    insight = 'Same base and same height: the cone holds exactly one third of the cylinder. Three cones fill one cylinder.';
  } else if (pair === 'cylinder+sphere' && s === h) {
    insight = 'The cylinder just contains the sphere (height = diameter), and the sphere fills exactly two thirds of it.';
  } else if (pair === 'cylinder+sphere') {
    insight = 'Set the height equal to the diameter to see the sphere fill exactly two thirds of its cylinder.';
  } else if (pair === 'cube+sphere') {
    insight = 'The sphere fits exactly inside the cube and fills π/6, about 52.4%, of it.';
  } else {
    insight = (ratio >= 1 ? A.name : B.name) + ' has the larger volume. Change the width and height and watch whether the ratio changes.';
  }

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 13 : 17);
  text('Solid 1 ÷ Solid 2 = ' + nf(vA, 1, 2) + ' ÷ ' + nf(vB, 1, 2) + ' = ' + nf(ratio, 1, 3), x + 12, y + 8);
  textStyle(NORMAL);
  fill('darkgreen');
  textSize(narrow ? 11 : 15);
  text(insight, x + 12, y + 34, w - 24, hgt - 36);
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
    if (shape.steps) {
      // equator of the sphere
      noFill();
      const mid = ringPoint(ox, oy, s, 0, shape.H / 2, 0);
      ellipse(mid[0], mid[1], shape.H * s, shape.H * s * TILT);
    }
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
