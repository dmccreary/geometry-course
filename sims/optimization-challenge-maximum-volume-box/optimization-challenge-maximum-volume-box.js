// Optimization Challenge: Maximum Volume Box
// CANVAS_HEIGHT: 580
// Bloom L4-L6 (Analyze, Evaluate, Create): students analyze how the cut size x changes the
// volume of an open box folded from a square sheet, evaluate their own guesses against the
// percent-of-maximum readout, and construct the cut that maximizes the volume.
//
// Model: a square sheet of side L. Cutting a square of side x from each corner and folding
// up the sides gives a box with base (L - 2x) by (L - 2x) and height x, so
//   V(x) = (L - 2x)^2 x,   0 <= x <= L/2.
// V is largest at x = L/6, where V = 2 L^3 / 27. The maximum stays hidden until the student
// asks for it.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let sliderLeftMargin = 170;
let defaultTextSize = 16;

// oblique projection used for the folded box: depth is drawn up and to the right
const DEPTH_X = 0.5, DEPTH_Y = 0.3;

const SHEET_SIZES = [30, 24, 36, 20, 40];
let sheetIndex = 0;
let cutSlider, maxButton, sheetButton;
let showMaximum = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  cutSlider = createSlider(0, SHEET_SIZES[0] / 2, 2, 0.1);
  cutSlider.parent(mainElement);
  cutSlider.position(sliderLeftMargin, drawHeight + 8);
  cutSlider.size(canvasWidth - sliderLeftMargin - margin);

  maxButton = createButton('Show Maximum');
  maxButton.parent(mainElement);
  maxButton.position(10, drawHeight + 45);
  maxButton.mousePressed(() => {
    showMaximum = !showMaximum;
    maxButton.html(showMaximum ? 'Hide Maximum' : 'Show Maximum');
  });

  sheetButton = createButton('New Sheet Size');
  sheetButton.parent(mainElement);
  sheetButton.position(135, drawHeight + 45);
  sheetButton.mousePressed(() => {
    sheetIndex = (sheetIndex + 1) % SHEET_SIZES.length;
    cutSlider.elt.max = SHEET_SIZES[sheetIndex] / 2;
    cutSlider.value(2);
    showMaximum = false;
    maxButton.html('Show Maximum');
  });

  describe('An optimization problem. A slider sets the size of the square cut from each corner of a cardboard sheet. ' +
    'The flat pattern, the folded open box, the volume calculation, and a graph of volume against cut size update together. ' +
    'A button reveals the cut size that gives the maximum volume.', LABEL);
}

function volume(L, x) { return (L - 2 * x) * (L - 2 * x) * x; }

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const L = SHEET_SIZES[sheetIndex];
  const x = cutSlider.value();
  const base = L - 2 * x;
  const V = volume(L, x);
  const xBest = L / 6;
  const vBest = volume(L, xBest);
  const narrow = canvasWidth < 600;

  // title and problem statement
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 18 : 23);
  text('Optimization Challenge: Maximum Volume Box', canvasWidth / 2, 8);
  textSize(narrow ? 12 : 15);
  textAlign(LEFT, TOP);
  text('Cut a square of side x from each corner of a ' + L + ' cm × ' + L + ' cm sheet and fold up the sides. ' +
    'Which cut size makes the open box with the largest volume?', margin, 40, canvasWidth - 2 * margin, 44);

  const leftW = canvasWidth * 0.44;
  drawPattern(margin, 88, leftW - margin, 190, L, x, narrow);
  drawBox(margin, 286, leftW - margin, 206, L, x, narrow);

  const rightX = leftW + 10;
  const rightW = canvasWidth - margin - rightX;
  const ts = narrow ? 12 : 15;
  const lh = ts + 6;
  const pct = vBest > 0 ? 100 * V / vBest : 0;
  let y = drawPanel(rightX, 88, rightW, 'Volume Calculation', 'lightyellow', ts, lh, [
    ['Base: ' + L + ' − 2(' + nf(x, 1, 1) + ') = ' + nf(base, 1, 1) + ' cm', 'black'],
    ['Height: x = ' + nf(x, 1, 1) + ' cm', 'black'],
    ['V = (' + nf(base, 1, 1) + ')(' + nf(base, 1, 1) + ')(' + nf(x, 1, 1) + ') = ' + nf(V, 1, 1) + ' cm³', 'blue'],
    [pct >= 99.9 ? 'Maximum found!' : nf(pct, 1, 1) + '% of the largest possible volume', pct >= 99.9 ? 'green' : 'dimgray']
  ]);
  drawGraph(rightX, y + 8, rightW, drawHeight - y - 16, L, x, V, xBest, vBest, narrow);

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Cut size x: ' + nf(x, 1, 1) + ' cm', 10, drawHeight + 18);
}

// The flat sheet with the four corner squares marked for cutting
function drawPattern(x0, y0, w, h, L, x, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x0, y0, w, h, 10);

  const side = min(w - 70, h - 46);
  const s = side / L;                     // pixels per cm
  const sx = x0 + (w - side) / 2, sy = y0 + 30;
  const c = x * s;

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 15);
  text('Flat pattern', x0 + 8, y0 + 6);
  textStyle(NORMAL);

  // cardboard sheet
  fill('tan');
  stroke('saddlebrown');
  strokeWeight(1.5);
  rect(sx, sy, side, side);
  // corners to cut away
  fill(244, 67, 54, 140);
  stroke('firebrick');
  strokeWeight(1);
  for (const [cx, cy] of [[sx, sy], [sx + side - c, sy], [sx, sy + side - c], [sx + side - c, sy + side - c]]) {
    rect(cx, cy, c, c);
  }
  // fold lines
  noFill();
  stroke('blue');
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  if (c > 0 && c < side / 2) rect(sx + c, sy + c, side - 2 * c, side - 2 * c);
  drawingContext.setLineDash([]);

  // labels
  noStroke();
  textSize(narrow ? 11 : 14);
  fill('black');
  textAlign(CENTER, BOTTOM);
  text(L + ' cm', sx + side / 2, sy - 2);
  if (side - 2 * c > 46) {
    textAlign(CENTER, CENTER);
    text(nf(L - 2 * x, 1, 1) + ' cm', sx + side / 2, sy + side / 2);
  }
  fill('firebrick');
  textAlign(RIGHT, CENTER);
  text('x', sx - 4, sy + max(c / 2, 6));
}

// The folded open box in an oblique view
function drawBox(x0, y0, w, h, L, x, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x0, y0, w, h, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 15);
  text('Folded box', x0 + 8, y0 + 6);
  textStyle(NORMAL);

  const b = L - 2 * x;
  const s = min((w - 30) / (L * (1 + DEPTH_X)), (h - 60) / (L * 0.5));
  // front-bottom-left corner, placed so the box stays centered as it changes
  const ox = x0 + (w - b * (1 + DEPTH_X) * s) / 2;
  const oy = y0 + h - 22;
  const P = (px, py, pz) => [ox + (px + pz * DEPTH_X) * s, oy - (py + pz * DEPTH_Y) * s];
  const quad4 = (a, c, d, e) => { beginShape(); for (const p of [a, c, d, e]) vertex(p[0], p[1]); endShape(CLOSE); };

  if (b <= 0 || x <= 0) {
    noStroke();
    fill('dimgray');
    textAlign(CENTER, CENTER);
    textSize(narrow ? 12 : 15);
    text(x <= 0 ? 'No sides to fold up: volume is 0' : 'Nothing left for the base: volume is 0', x0 + w / 2, y0 + h / 2);
    return;
  }

  stroke('midnightblue');
  strokeWeight(1.5);
  // floor, then the inside of the back and left walls, then the outside of the right and front walls
  fill(187, 222, 251);
  quad4(P(0, 0, 0), P(b, 0, 0), P(b, 0, b), P(0, 0, b));
  fill(100, 181, 246, 200);
  quad4(P(0, 0, b), P(b, 0, b), P(b, x, b), P(0, x, b));
  fill(66, 165, 245, 200);
  quad4(P(0, 0, 0), P(0, 0, b), P(0, x, b), P(0, x, 0));
  fill(30, 136, 229, 170);
  quad4(P(b, 0, 0), P(b, 0, b), P(b, x, b), P(b, x, 0));
  fill(33, 150, 243, 150);
  quad4(P(0, 0, 0), P(b, 0, 0), P(b, x, 0), P(0, x, 0));

  // dimension labels
  noStroke();
  fill('black');
  textSize(narrow ? 11 : 14);
  textAlign(CENTER, TOP);
  text(nf(b, 1, 1) + ' cm', (P(0, 0, 0)[0] + P(b, 0, 0)[0]) / 2, oy + 3);
  fill('firebrick');
  textAlign(RIGHT, CENTER);
  text('x = ' + nf(x, 1, 1), P(0, x / 2, 0)[0] - 5, P(0, x / 2, 0)[1]);
}

// Volume as a function of cut size, with the current point and (optionally) the maximum
function drawGraph(x0, y0, w, h, L, x, V, xBest, vBest, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x0, y0, w, h, 10);

  const px = x0 + 52, py = y0 + 28, pw = w - 68, ph = h - 68;
  // round tick spacing: 1, 2, or 5 times a power of ten
  const rough = vBest * 1.1 / 4;
  const pow10 = pow(10, floor(Math.log10(rough)));
  const tick = [1, 2, 5, 10].map(m => m * pow10).find(t => t >= rough);
  const xMax = L / 2, yMax = tick * 4;
  const gx = v => px + v / xMax * pw;
  const gy = v => py + ph - v / yMax * ph;

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 15);
  text('Volume vs. cut size', x0 + 8, y0 + 6);
  textStyle(NORMAL);

  // grid and axes
  textSize(narrow ? 10 : 12);
  for (let i = 0; i <= 4; i++) {
    const v = yMax * i / 4;
    stroke('gainsboro');
    strokeWeight(1);
    line(px, gy(v), px + pw, gy(v));
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, CENTER);
    text(round(v), px - 4, gy(v));
  }
  for (let i = 0; i <= 5; i++) {
    const v = xMax * i / 5;
    stroke('gainsboro');
    line(gx(v), py, gx(v), py + ph);
    noStroke();
    fill('dimgray');
    textAlign(CENTER, TOP);
    text(nf(v, 1, 0), gx(v), py + ph + 3);
  }
  stroke('gray');
  strokeWeight(1.5);
  line(px, py, px, py + ph);
  line(px, py + ph, px + pw, py + ph);
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  text('cut size x (cm)', px + pw / 2, py + ph + 18);
  push();
  translate(x0 + 12, py + ph / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('volume (cm³)', 0, 0);
  pop();

  // volume curve
  noFill();
  stroke('royalblue');
  strokeWeight(3);
  beginShape();
  for (let i = 0; i <= 60; i++) {
    const v = xMax * i / 60;
    vertex(gx(v), gy(volume(L, v)));
  }
  endShape();

  // maximum, shown only on request
  if (showMaximum) {
    stroke('green');
    strokeWeight(1);
    drawingContext.setLineDash([4, 3]);
    line(gx(xBest), gy(vBest), gx(xBest), py + ph);
    drawingContext.setLineDash([]);
    noStroke();
    fill('green');
    circle(gx(xBest), gy(vBest), 13);
    textAlign(LEFT, BOTTOM);
    textSize(narrow ? 11 : 13);
    text('max: x = ' + nf(xBest, 1, 2) + ', V = ' + nf(vBest, 1, 1), min(gx(xBest) + 9, px + pw - 150), gy(vBest) - 3);
  }

  // current point
  stroke('white');
  strokeWeight(2);
  fill('red');
  circle(gx(x), gy(V), 12);
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

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  cutSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
