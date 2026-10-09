// Circle Area and Circumference Calculator
// CANVAS_HEIGHT: 500
// Bloom L3-L4 (Apply, Analyze): students apply C = 2 pi r and A = pi r^2 to circles of
// different sizes and analyze how a change in radius changes each measurement.
// The radius slider recalculates everything in real time. The "double the radius" panel
// shows that circumference scales with r while area scales with r squared.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

let radiusSlider;
let presetButtons = [];
const PRESETS = [5, 10, 15];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  radiusSlider = createSlider(2, 20, 10, 0.5);
  radiusSlider.parent(mainElement);
  radiusSlider.position(sliderLeftMargin, drawHeight + 8);
  radiusSlider.size(canvasWidth - sliderLeftMargin - margin);

  // buttons for common radius values
  for (let i = 0; i < PRESETS.length; i++) {
    const b = createButton('r = ' + PRESETS[i]);
    b.parent(mainElement);
    b.position(150 + i * 70, drawHeight + 45);
    b.mousePressed(() => radiusSlider.value(PRESETS[i]));
    presetButtons.push(b);
  }

  describe('A circle with an adjustable radius. The radius and diameter are drawn on the circle, ' +
    'and panels show the circumference and area formulas with the current values substituted, ' +
    'plus what happens to each measurement when the radius doubles.', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const r = radiusSlider.value();
  const circumference = TWO_PI * r;
  const area = PI * r * r;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 520 ? 18 : 24);
  text('Circle Area and Circumference', canvasWidth / 2, 8);

  // layout: circle on the left, panels on the right
  const narrow = canvasWidth < 600;
  const panelW = narrow ? canvasWidth * 0.48 : constrain(canvasWidth * 0.42, 250, 360);
  const panelX = canvasWidth - panelW - margin;
  const regionW = panelX - margin;
  const cx = margin + regionW / 2;
  const cy = 45 + (drawHeight - 55) / 2;
  const maxPx = min(regionW / 2 - 12, (drawHeight - 75) / 2);
  const pxPerCm = maxPx / 20;
  const rPx = r * pxPerCm;

  // circle
  stroke('royalblue');
  strokeWeight(3);
  fill(100, 181, 246, 60);
  circle(cx, cy, rPx * 2);

  // diameter: dashed green line through the center
  stroke('green');
  strokeWeight(2);
  drawingContext.setLineDash([7, 5]);
  line(cx - rPx, cy, cx + rPx, cy);
  drawingContext.setLineDash([]);

  // radius: red line from the center to the edge with an arrowhead
  const ang = -PI / 3;
  const ex = cx + cos(ang) * rPx, ey = cy + sin(ang) * rPx;
  stroke('red');
  strokeWeight(3);
  line(cx, cy, ex, ey);
  noStroke();
  fill('red');
  push();
  translate(ex, ey);
  rotate(ang);
  triangle(0, 0, -11, -5, -11, 5);
  pop();
  fill('black');
  circle(cx, cy, 7);

  // labels on the circle
  const labelSize = narrow ? 13 : 16;
  textSize(labelSize);
  noStroke();
  fill('red');
  textAlign(LEFT, BOTTOM);
  text('r = ' + nf(r, 1, 1) + ' cm', cx + cos(ang) * rPx / 2 + 8, cy + sin(ang) * rPx / 2);
  fill('green');
  textAlign(CENTER, TOP);
  text('d = ' + nf(2 * r, 1, 1) + ' cm', cx, cy + 6);

  // panels
  const ts = narrow ? 12 : 16;
  const lh = ts + 6;
  let y = 44;
  y = drawPanel(panelX, y, panelW, 'Formulas', 'lightyellow', ts, lh, [
    ['C = 2πr', 'black'],
    ['A = πr²', 'black']
  ]) + 8;
  y = drawPanel(panelX, y, panelW, 'Measurements', 'white', ts, lh, [
    ['Radius: ' + nf(r, 1, 1) + ' cm', 'red'],
    ['Diameter: 2 × ' + nf(r, 1, 1) + ' = ' + nf(2 * r, 1, 1) + ' cm', 'green'],
    ['C = 2π(' + nf(r, 1, 1) + ') = ' + nf(circumference, 1, 2) + ' cm', 'black'],
    ['A = π(' + nf(r, 1, 1) + ')² = ' + nf(area, 1, 2) + ' cm²', 'black']
  ]) + 8;
  drawPanel(panelX, y, panelW, 'If the radius doubles', 'honeydew', ts, lh, [
    ['r: ' + nf(r, 1, 1) + ' → ' + nf(2 * r, 1, 1) + ' cm', 'black'],
    ['C: ' + nf(circumference, 1, 1) + ' → ' + nf(2 * circumference, 1, 1) + '  (× 2)', 'black'],
    ['A: ' + nf(area, 1, 1) + ' → ' + nf(4 * area, 1, 1) + '  (× 4)', 'black']
  ]);

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Radius: ' + nf(r, 1, 1) + ' cm', 10, drawHeight + 18);
  text('Common values:', 10, drawHeight + 56);
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
  radiusSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
