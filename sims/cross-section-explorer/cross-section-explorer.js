// Cross-Section Explorer
// CANVAS_HEIGHT: 580
// Bloom L4-L5 (Analyze, Evaluate): students analyze how a horizontal plane cuts six different
// solids and evaluate how the cross-sectional area changes with height. The area-versus-height
// graph makes the link to volume visible: a solid whose cross-section never changes has
// V = B h, while a cone or pyramid whose cross-section shrinks to a point has V = (1/3) B h.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;
let sliderLeftMargin = 255;
let defaultTextSize = 16;

// ---------- the six solids ----------
// Every solid stands on the plane y = 0 and is 10 units tall. Polygonal solids give the outline
// of their cross-section at height y as [x, z] points; round solids give the radius at height y.
function rectOutline(w, d) {
  return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
}
function triOutline(a) {
  const R = a / Math.sqrt(3);     // distance from the center of an equilateral triangle to a vertex
  return [0, 1, 2].map(i => [R * Math.cos(Math.PI / 2 + i * 2 * Math.PI / 3), R * Math.sin(Math.PI / 2 + i * 2 * Math.PI / 3)]);
}

const SOLIDS = [
  { name: 'Rectangular Prism', H: 10, round: false, outline: y => rectOutline(8, 6),
    shape: 'Rectangle', dims: y => '8 × 6 units', area: y => 48, perimeter: y => 28,
    insight: 'The cross-section is the same at every height, so V = Bh.' },
  { name: 'Cylinder', H: 10, round: true, radius: y => 4,
    shape: 'Circle', dims: y => 'radius 4 units', area: y => Math.PI * 16, perimeter: y => 8 * Math.PI,
    insight: 'Every slice is a circle with A = πr², so V = πr²h.' },
  { name: 'Cone', H: 10, round: true, radius: y => 5 * (1 - y / 10),
    shape: 'Circle', dims: y => 'radius ' + (5 * (1 - y / 10)).toFixed(2) + ' units',
    area: y => Math.PI * Math.pow(5 * (1 - y / 10), 2), perimeter: y => 2 * Math.PI * 5 * (1 - y / 10),
    insight: 'Radius shrinks linearly, so area shrinks quadratically. That is where the 1/3 in V = (1/3)Bh comes from.' },
  { name: 'Sphere', H: 10, round: true, steps: 28, radius: y => Math.sqrt(Math.max(0, 25 - (y - 5) * (y - 5))),
    shape: 'Circle', dims: y => 'radius ' + Math.sqrt(Math.max(0, 25 - (y - 5) * (y - 5))).toFixed(2) + ' units',
    area: y => Math.PI * Math.max(0, 25 - (y - 5) * (y - 5)), perimeter: y => 2 * Math.PI * Math.sqrt(Math.max(0, 25 - (y - 5) * (y - 5))),
    insight: 'By the Pythagorean theorem the slice radius is √(R² − d²), where d is the distance from the center.' },
  { name: 'Square Pyramid', H: 10, round: false, outline: y => rectOutline(8 * (1 - y / 10), 8 * (1 - y / 10)),
    shape: 'Square', dims: y => 'side ' + (8 * (1 - y / 10)).toFixed(2) + ' units',
    area: y => Math.pow(8 * (1 - y / 10), 2), perimeter: y => 32 * (1 - y / 10),
    insight: 'Side length shrinks linearly, so area shrinks quadratically, just as it does for a cone.' },
  { name: 'Triangular Prism', H: 10, round: false, outline: y => triOutline(8),
    shape: 'Equilateral triangle', dims: y => 'side 8 units', area: y => Math.sqrt(3) / 4 * 64, perimeter: y => 24,
    insight: 'The triangle is the same at every height, so V = Bh.' }
];

let solidSelect, heightSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  solidSelect = createSelect();
  solidSelect.parent(mainElement);
  for (const s of SOLIDS) solidSelect.option(s.name);
  solidSelect.position(65, drawHeight + 10);

  heightSlider = createSlider(0, 100, 40, 1);
  heightSlider.parent(mainElement);
  heightSlider.position(sliderLeftMargin, drawHeight + 44);
  heightSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('A solid cut by a horizontal plane. A dropdown chooses a rectangular prism, cylinder, cone, sphere, square pyramid, or triangular prism, ' +
    'and a slider moves the cutting plane. Panels show the solid with the plane, the two-dimensional cross-section, its area and perimeter, ' +
    'and a graph of cross-sectional area against height.', LABEL);
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
  const pct = heightSlider.value();
  const yCut = solid.H * pct / 100;
  const narrow = canvasWidth < 600;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 18 : 24);
  text('Cross-Section Explorer', canvasWidth / 2, 8);

  const half = (canvasWidth - 3 * margin) / 2;
  const leftX = margin, rightX = 2 * margin + half;
  drawSolidPanel(leftX, 42, half, 258, solid, yCut, narrow);
  drawSectionPanel(rightX, 42, half, 258, solid, yCut, narrow);
  drawInfoPanel(leftX, 308, half, 184, solid, yCut, pct, narrow);
  drawGraphPanel(rightX, 308, half, 184, solid, yCut, narrow);

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Solid:', 10, drawHeight + 22);
  text('Cutting plane height: ' + nf(yCut, 1, 1) + ' (' + pct + '%)', 10, drawHeight + 55);
}

function panel(x, y, w, h, title, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 15);
  text(title, x + 8, y + 6);
  textStyle(NORMAL);
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

// Draw the part of a solid between heights y0 and y1, then its top face
function drawSegment(solid, ox, oy, s, y0, y1) {
  if (y1 <= y0) return;
  if (solid.round) {
    const n = solid.steps || 1;
    // a sphere is sampled by angle rather than by height, so its outline is a true circle
    const a0 = Math.acos(1 - 2 * y0 / solid.H), a1 = Math.acos(1 - 2 * y1 / solid.H);
    const yAt = u => solid.steps ? solid.H / 2 * (1 - Math.cos(lerp(a0, a1, u))) : lerp(y0, y1, u);
    beginShape();
    for (let i = 0; i <= n; i++) {                       // up the left edge
      const y = yAt(i / n);
      const p = ringPoint(ox, oy, s, solid.radius(y), y, PI);
      vertex(p[0], p[1]);
    }
    for (let k = 1; k < 20; k++) {                       // across the front of the top
      const p = ringPoint(ox, oy, s, solid.radius(y1), y1, PI + k * PI / 20);
      vertex(p[0], p[1]);
    }
    for (let i = n; i >= 0; i--) {                       // down the right edge
      const y = yAt(i / n);
      const p = ringPoint(ox, oy, s, solid.radius(y), y, TWO_PI);
      vertex(p[0], p[1]);
    }
    for (let k = 19; k > 0; k--) {                       // back across the front of the bottom
      const p = ringPoint(ox, oy, s, solid.radius(y0), y0, PI + k * PI / 20);
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
    const top = ringPoint(ox, oy, s, 0, y1, 0);
    ellipse(top[0], top[1], 2 * solid.radius(y1) * s, 2 * solid.radius(y1) * s * TILT);
  } else {
    const P = makeProjector(ox, oy, s);
    const a = solid.outline(y0).map(p => P(p[0], y0, p[1]));
    const b = solid.outline(y1).map(p => P(p[0], y1, p[1]));
    // side faces, farthest first
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

// Outline of the cross-section at height y, drawn on the solid
function drawSectionOnSolid(solid, ox, oy, s, y) {
  if (solid.round) {
    const c = ringPoint(ox, oy, s, 0, y, 0);
    ellipse(c[0], c[1], 2 * solid.radius(y) * s, 2 * solid.radius(y) * s * TILT);
  } else {
    const P = makeProjector(ox, oy, s);
    beginShape();
    for (const p of solid.outline(y)) {
      const q = P(p[0], y, p[1]);
      vertex(q[0], q[1]);
    }
    endShape(CLOSE);
  }
}

function drawSolidPanel(x, y, w, h, solid, yCut, narrow) {
  panel(x, y, w, h, 'Solid and cutting plane', narrow);
  const s = min((w - 20) / 15, (h - 50) / 14.5);
  const ox = x + w / 2, oy = y + h - 30;

  // part of the solid below the plane
  stroke('midnightblue');
  strokeWeight(1.5);
  fill(33, 150, 243, 150);
  drawSegment(solid, ox, oy, s, 0, yCut);

  // cutting plane
  const P = makeProjector(ox, oy, s);
  const plane = rectOutline(13, 13).map(p => P(p[0], yCut, p[1]));
  fill(255, 152, 0, 70);
  stroke('darkorange');
  strokeWeight(1);
  beginShape();
  for (const p of plane) vertex(p[0], p[1]);
  endShape(CLOSE);

  // cross-section, highlighted in red
  fill(255, 235, 59, 190);
  stroke('red');
  strokeWeight(3.5);
  drawSectionOnSolid(solid, ox, oy, s, yCut);

  // part of the solid above the plane, drawn as a ghost
  stroke(21, 101, 192, 150);
  strokeWeight(1);
  fill(33, 150, 243, 45);
  drawSegment(solid, ox, oy, s, yCut, solid.H);
}

// The cross-section seen from directly above
function drawSectionPanel(x, y, w, h, solid, yCut, narrow) {
  panel(x, y, w, h, 'Cross-section: ' + solid.shape, narrow);
  const cx = x + w / 2, cy = y + 28 + (h - 62) / 2;
  const s = min((w - 30) / 12, (h - 78) / 12);

  // grid, one square per unit
  stroke('gainsboro');
  strokeWeight(1);
  for (let i = -6; i <= 6; i++) {
    line(cx + i * s, cy - 6 * s, cx + i * s, cy + 6 * s);
    line(cx - 6 * s, cy + i * s, cx + 6 * s, cy + i * s);
  }

  fill(100, 181, 246, 200);
  stroke('midnightblue');
  strokeWeight(3);
  if (solid.round) {
    const r = solid.radius(yCut);
    circle(cx, cy, 2 * r * s);
    if (r > 0.6) {
      stroke('red');
      strokeWeight(2);
      line(cx, cy, cx + r * s, cy);
    }
  } else {
    beginShape();
    for (const p of solid.outline(yCut)) vertex(cx + p[0] * s, cy - p[1] * s);
    endShape(CLOSE);
  }

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 12 : 15);
  text(solid.dims(yCut), cx, y + h - 26);
}

function drawInfoPanel(x, y, w, h, solid, yCut, pct, narrow) {
  panel(x, y, w, h, 'Cross-section properties', narrow);
  const ts = narrow ? 12 : 15;
  const lh = ts + 6;
  let ty = y + 30;
  noStroke();
  textAlign(LEFT, TOP);
  textSize(ts);
  fill('black');
  text('Shape: ' + solid.shape, x + 10, ty); ty += lh;
  text('Dimensions: ' + solid.dims(yCut), x + 10, ty); ty += lh;
  text('Perimeter: ' + nf(solid.perimeter(yCut), 1, 2) + ' units', x + 10, ty); ty += lh;
  fill('blue');
  textStyle(BOLD);
  textSize(ts + 2);
  text('Area: ' + nf(solid.area(yCut), 1, 2) + ' square units', x + 10, ty); ty += lh + 8;
  textStyle(NORMAL);
  fill('darkgreen');
  textSize(narrow ? 11 : 14);
  text(solid.insight, x + 10, ty, w - 20, y + h - ty - 4);
}

// Cross-sectional area as a function of height
function drawGraphPanel(x, y, w, h, solid, yCut, narrow) {
  panel(x, y, w, h, 'Area vs. height', narrow);
  const px = x + 46, py = y + 30, pw = w - 62, ph = h - 68;
  let aMax = 0;
  for (let i = 0; i <= 40; i++) aMax = max(aMax, solid.area(solid.H * i / 40));
  aMax = ceil(aMax / 20) * 20;
  const gx = v => px + v / solid.H * pw;
  const gy = v => py + ph - v / aMax * ph;

  textSize(narrow ? 10 : 12);
  for (let i = 0; i <= 2; i++) {
    const v = aMax * i / 2;
    stroke('gainsboro');
    strokeWeight(1);
    line(px, gy(v), px + pw, gy(v));
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, CENTER);
    text(round(v), px - 4, gy(v));
  }
  stroke('gray');
  strokeWeight(1.5);
  line(px, py, px, py + ph);
  line(px, py + ph, px + pw, py + ph);
  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  text('0', px, py + ph + 3);
  text(solid.H, px + pw, py + ph + 3);
  fill('black');
  text('height of cutting plane', px + pw / 2, py + ph + 16);
  push();
  translate(x + 11, py + ph / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('area', 0, 0);
  pop();

  // shaded region under the curve up to the cutting plane: the volume below the plane
  noStroke();
  fill(100, 181, 246, 110);
  beginShape();
  vertex(gx(0), gy(0));
  for (let i = 0; i <= 40; i++) {
    const v = yCut * i / 40;
    vertex(gx(v), gy(solid.area(v)));
  }
  vertex(gx(yCut), gy(0));
  endShape(CLOSE);

  noFill();
  stroke('royalblue');
  strokeWeight(3);
  beginShape();
  for (let i = 0; i <= 60; i++) {
    const v = solid.H * i / 60;
    vertex(gx(v), gy(solid.area(v)));
  }
  endShape();

  stroke('white');
  strokeWeight(2);
  fill('red');
  circle(gx(yCut), gy(solid.area(yCut)), 12);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  heightSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
