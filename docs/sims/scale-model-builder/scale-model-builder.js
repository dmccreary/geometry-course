// Scale Model Builder
// CANVAS_HEIGHT: 580
// Bloom L3, L4, L6 (Apply, Analyze, Create): students apply a scale factor to plan a model of
// a real object and analyze why lengths, areas, and volumes shrink by different amounts.
// At a scale of 1:k every length is divided by k, every area by k squared, and every volume
// by k cubed. A person stands beside the real object and a 30 cm ruler lies beside the model,
// so both panels show a size the student can picture.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;
let sliderLeftMargin = 300;
let defaultTextSize = 16;

// real objects: length, width, height in meters (a court is flat, so it has no height)
const OBJECTS = [
  { name: 'Classroom', L: 10, W: 8, H: 3 },
  { name: 'Car', L: 4.5, W: 1.8, H: 1.5 },
  { name: 'House', L: 12, W: 10, H: 6 },
  { name: 'Bicycle', L: 1.8, W: 0.5, H: 1.1 },
  { name: 'Basketball Court', L: 28, W: 15, H: 0 }
];

// scale factors, with the hobby or trade where each is commonly used
const SCALES = [[5, ''], [10, ''], [12, 'dollhouses'], [20, ''], [24, 'model cars'], [50, 'architectural models'],
  [64, 'toy cars'], [72, 'model aircraft'], [87, 'HO model trains'], [100, '']];

let objectSelect, scaleSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  objectSelect = createSelect();
  objectSelect.parent(mainElement);
  for (const o of OBJECTS) objectSelect.option(o.name);
  objectSelect.position(75, drawHeight + 10);

  scaleSlider = createSlider(0, SCALES.length - 1, 3, 1);
  scaleSlider.parent(mainElement);
  scaleSlider.position(sliderLeftMargin, drawHeight + 44);
  scaleSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Scale model planner. A dropdown chooses a real object and a slider chooses a scale from 1 to 5 down to 1 to 100. ' +
    'The real object is drawn beside a person, the model beside a 30 centimeter ruler, and three panels show how length, area, and volume each change.', LABEL);
}

// Format a number with thousands separators and a sensible number of decimals
function fmt(v) {
  const digits = v >= 100 ? 0 : (v >= 10 ? 1 : (v >= 1 ? 2 : 3));
  return v.toLocaleString('en-US', { maximumFractionDigits: digits });
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const obj = OBJECTS[objectSelect.elt.selectedIndex];
  const k = SCALES[scaleSlider.value()][0];
  const use = SCALES[scaleSlider.value()][1];
  const narrow = canvasWidth < 600;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 18 : 24);
  text('Scale Model Builder', canvasWidth / 2, 8);

  const half = (canvasWidth - 3 * margin) / 2;
  drawObjectPanel(margin, 42, half, 270, obj, 1, 'm', 'Original ' + obj.name, 'aliceblue', [33, 150, 243], narrow);
  drawObjectPanel(2 * margin + half, 42, half, 270, obj, 100 / k, 'cm', 'Model at 1:' + k, 'honeydew', [76, 175, 80], narrow);

  // three columns: length, area, volume
  const colW = (canvasWidth - 4 * margin) / 3;
  const cy = 320, ch = drawHeight - cy - 8;
  const area = obj.L * obj.W, vol = obj.L * obj.W * obj.H;
  drawColumn(margin, cy, colW, ch, 'Length', 'aliceblue', narrow, [
    'Original: ' + fmt(obj.L) + ' m',
    'Divide by ' + k,
    'Model: ' + fmt(obj.L * 100 / k) + ' cm'
  ], 'Every length ÷ k');
  drawColumn(2 * margin + colW, cy, colW, ch, 'Floor Area', 'honeydew', narrow, [
    'Original: ' + fmt(area) + ' m²',
    'Divide by ' + k + '² = ' + fmt(k * k),
    'Model: ' + fmt(area * 10000 / (k * k)) + ' cm²'
  ], 'Every area ÷ k²');
  drawColumn(3 * margin + 2 * colW, cy, colW, ch, 'Volume', 'oldlace', narrow, obj.H > 0 ? [
    'Original: ' + fmt(vol) + ' m³',
    'Divide by ' + k + '³ = ' + fmt(k * k * k),
    'Model: ' + fmt(vol * 1000000 / (k * k * k)) + ' cm³'
  ] : ['A court is flat,', 'so it encloses', 'no volume.'], 'Every volume ÷ k³');

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Object:', 10, drawHeight + 22);
  text('Scale 1:' + k + (use && !narrow ? '  (' + use + ')' : ''), 10, drawHeight + 55);
}

function drawColumn(x, y, w, h, title, bg, narrow, lines, rule) {
  fill(bg);
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  noStroke();
  const ts = narrow ? 11 : 15;
  const lh = ts + 7;
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(ts + 2);
  text(title, x + 10, y + 8);
  textStyle(NORMAL);
  textSize(ts);
  for (let i = 0; i < lines.length; i++) {
    fill(i === 2 ? 'blue' : 'black');
    if (i === 2) textStyle(BOLD);
    text(lines[i], x + 10, y + 12 + lh * (i + 1));
    textStyle(NORMAL);
  }
  fill('dimgray');
  textSize(narrow ? 11 : 14);
  text(rule, x + 10, y + h - (narrow ? 20 : 24));
}

// ---------- the object drawn in an axonometric view ----------
// Coordinates: x to the right, y up, z away from the viewer. The box is turned about the
// vertical axis by YAW so that two side faces show, and TILT lifts points that are farther away.
const YAW = 0.6;
const TILT = 0.36;

// unitScale converts meters to the units shown in the panel: 1 for the original (meters),
// 100 / k for the model (centimeters at a scale of 1:k)
function drawObjectPanel(x, y, w, h, obj, unitScale, unit, title, bg, rgb, narrow) {
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

  const L = obj.L * unitScale, W = obj.W * unitScale, H = obj.H * unitScale;
  const c = Math.cos(YAW), sn = Math.sin(YAW);
  const wide = L * c + W * sn;                    // width of the turned box on the screen
  const deep = (L * sn + W * c) * TILT;           // how far its depth lifts the back corner
  const refSize = unit === 'm' ? 1.7 : 30;        // a person 1.7 m tall, or a 30 cm ruler

  // fit the object and its reference in the panel
  let s, ox, oy;
  if (unit === 'm') {
    // leave room for the person on the left and for the height label on the right
    s = min((w - 150) / wide, (h - 96) / max(H + deep, refSize + 0.2));
    ox = x + 62 + (w - 130) / 2;
    oy = y + h - 42 - deep * s / 2;
  } else {
    s = min((w - 40) / max(wide, refSize), (h - 118) / max(H + deep, 1));
    ox = x + w / 2;
    oy = y + h - 68 - deep * s / 2;
  }
  const P = (px, py, pz) => {
    const xr = px * c + pz * sn, zr = -px * sn + pz * c;
    return [ox + xr * s, oy - (py + zr * TILT) * s, zr];
  };

  // the box, farthest faces first
  const base = [[-L / 2, -W / 2], [L / 2, -W / 2], [L / 2, W / 2], [-L / 2, W / 2]];
  const a = base.map(p => P(p[0], 0, p[1]));
  const b = base.map(p => P(p[0], H, p[1]));
  stroke(rgb[0] * 0.4, rgb[1] * 0.4, rgb[2] * 0.4);
  strokeWeight(1.5);
  fill(rgb[0], rgb[1], rgb[2], 150);
  const faces = a.map((p, i) => {
    const j = (i + 1) % 4;
    return { pts: [a[i], a[j], b[j], b[i]], depth: (a[i][2] + a[j][2]) / 2 };
  }).sort((f, g) => g.depth - f.depth);
  for (const f of faces) {
    beginShape();
    for (const p of f.pts) vertex(p[0], p[1]);
    endShape(CLOSE);
  }
  beginShape();
  for (const p of b) vertex(p[0], p[1]);
  endShape(CLOSE);

  // dimension labels along the two near bottom edges and the near vertical edge
  const ls = narrow ? 11 : 14;
  textSize(ls);
  textStyle(BOLD);
  const label = (str, px, py, ax, ay) => {
    const tw = textWidth(str) + 8, th = ls + 6;
    const bx = ax === RIGHT ? px - tw + 4 : (ax === CENTER ? px - tw / 2 : px - 4);
    const by = ay === TOP ? py - 3 : (ay === BOTTOM ? py - th + 3 : py - th / 2);
    noStroke();
    fill(255, 255, 255, 225);
    rect(bx, by, tw, th, 4);
    fill('black');
    textAlign(ax, ay);
    text(str, px, py);
  };
  label(fmt(L) + ' ' + unit, (a[0][0] + a[1][0]) / 2 - 4, (a[0][1] + a[1][1]) / 2 + 7, RIGHT, TOP);
  label(fmt(W) + ' ' + unit, (a[1][0] + a[2][0]) / 2 + 8, (a[1][1] + a[2][1]) / 2 + 7, LEFT, TOP);
  if (H > 0) label(fmt(H) + ' ' + unit, a[2][0] + 8, (a[2][1] + b[2][1]) / 2, LEFT, CENTER);
  textStyle(NORMAL);

  if (unit === 'm') {
    // a person 1.7 m tall for comparison
    const px = x + 34, feet = y + h - 42, top = feet - refSize * s;
    const headR = max(3, refSize * s * 0.07);
    stroke('dimgray');
    strokeWeight(max(1.5, refSize * s * 0.035));
    line(px, top + 2 * headR, px, feet - refSize * s * 0.42);                       // body
    line(px, feet - refSize * s * 0.42, px - refSize * s * 0.1, feet);              // legs
    line(px, feet - refSize * s * 0.42, px + refSize * s * 0.1, feet);
    line(px - refSize * s * 0.13, top + refSize * s * 0.32, px + refSize * s * 0.13, top + refSize * s * 0.32);   // arms
    noStroke();
    fill('dimgray');
    circle(px, top + headR, 2 * headR);
    textAlign(CENTER, TOP);
    textSize(narrow ? 10 : 12);
    text('1.7 m', px, feet + 4);
  } else {
    // a 30 cm ruler for comparison
    const rw = refSize * s, rx = x + w / 2 - rw / 2, ry = y + h - 46;
    fill('khaki');
    stroke('olive');
    strokeWeight(1);
    rect(rx, ry, rw, 12);
    for (let i = 0; i <= 30; i += 5) line(rx + i * s, ry, rx + i * s, ry + (i % 10 === 0 ? 8 : 5));
    noStroke();
    fill('dimgray');
    textAlign(CENTER, TOP);
    textSize(narrow ? 10 : 12);
    text('30 cm ruler', x + w / 2, ry + 15);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  scaleSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
