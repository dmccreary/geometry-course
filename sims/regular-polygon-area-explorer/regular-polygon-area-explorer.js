// Regular Polygon Area Explorer
// CANVAS_HEIGHT: 555
// Bloom L3-L4 (Apply, Analyze): students apply A = (1/2) a P to regular polygons with 3 to 12
// sides and analyze how the apothem, the perimeter, and the number of sides affect the area.
// The polygon is cut into n congruent triangles from the center. Each triangle has base s and
// height a, so the total area is n (1/2) s a = (1/2) a P.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 16;
let labelWidth = 130;       // width of the label span in each slider row
let valueWidth = 50;        // width of the value span in each slider row

const NAMES = { 3: 'Triangle', 4: 'Square', 5: 'Pentagon', 6: 'Hexagon', 7: 'Heptagon', 8: 'Octagon',
  9: 'Nonagon', 10: 'Decagon', 11: 'Hendecagon', 12: 'Dodecagon' };
// fill color theme by number of sides
const THEMES = { 3: 'tomato', 4: 'darkorange', 5: 'gold', 6: 'mediumseagreen', 7: 'darkturquoise', 8: 'dodgerblue' };

let sidesRow, sizeRow;
let trianglesCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  sidesRow = makeSliderRow('Number of sides', 3, 12, 6, 1, 0);
  sizeRow = makeSliderRow('Radius (units)', 5, 10, 8, 0.5, 1);
  trianglesCheckbox = createCheckbox(' Show triangle subdivision', true);
  trianglesCheckbox.parent(document.querySelector('main'));
  trianglesCheckbox.position(10, drawHeight + 80);
  trianglesCheckbox.style('font-size', '16px');
  resizeSliders();

  describe('A regular polygon with an adjustable number of sides and radius. The apothem and radius are drawn, ' +
    'the polygon can be divided into congruent triangles, and panels show the side length, apothem, perimeter, ' +
    'and the area formula one half apothem times perimeter with the current values substituted.', LABEL);
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

function resizeSliders() {
  const w = max(60, canvasWidth - labelWidth - valueWidth - 40);
  sidesRow.slider.size(w);
  sizeRow.slider.size(w);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const n = sidesRow.slider.value();
  const r = sizeRow.slider.value();
  sidesRow.valueSpan.html(n);
  sizeRow.valueSpan.html(nf(r, 1, 1));

  // measurements of a regular n-gon with circumradius r
  const s = 2 * r * sin(PI / n);          // side length
  const a = r * cos(PI / n);              // apothem
  const P = n * s;                        // perimeter
  const area = 0.5 * a * P;
  const circleArea = PI * r * r;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 520 ? 18 : 24);
  text('Regular Polygon Area Explorer', canvasWidth / 2, 8);

  // layout: polygon on the left, panels on the right
  const narrow = canvasWidth < 600;
  const panelW = narrow ? canvasWidth * 0.5 : constrain(canvasWidth * 0.42, 260, 370);
  const panelX = canvasWidth - panelW - margin;
  const regionW = panelX - margin;
  const cx = margin + regionW / 2;
  const cy = 50 + (drawHeight - 60) / 2;
  const pxPerUnit = min(regionW / 2 - 14, (drawHeight - 90) / 2) / 10;
  const R = r * pxPerUnit;

  // vertices: the bottom side is horizontal so the apothem points straight down
  const start = HALF_PI + PI / n;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const ang = start + i * TWO_PI / n;
    pts.push([cx + cos(ang) * R, cy + sin(ang) * R]);
  }
  const theme = color(THEMES[n] || 'mediumpurple');

  // faint circumscribed circle for comparison
  noFill();
  stroke('lightgray');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  circle(cx, cy, 2 * R);
  drawingContext.setLineDash([]);

  // polygon
  const fillColor = color(red(theme), green(theme), blue(theme), 70);
  fill(fillColor);
  stroke('black');
  strokeWeight(3);
  beginShape();
  for (const p of pts) vertex(p[0], p[1]);
  endShape(CLOSE);

  // triangle subdivision, with the bottom triangle shaded
  if (trianglesCheckbox.checked()) {
    stroke(120);
    strokeWeight(1);
    for (const p of pts) line(cx, cy, p[0], p[1]);
    fill(red(theme), green(theme), blue(theme), 170);
    stroke('black');
    strokeWeight(1.5);
    triangle(cx, cy, pts[n - 1][0], pts[n - 1][1], pts[0][0], pts[0][1]);
  }

  // apothem: dashed red segment from the center to the midpoint of the bottom side
  const midX = (pts[n - 1][0] + pts[0][0]) / 2, midY = (pts[n - 1][1] + pts[0][1]) / 2;
  stroke('red');
  strokeWeight(2.5);
  drawingContext.setLineDash([6, 4]);
  line(cx, cy, midX, midY);
  drawingContext.setLineDash([]);
  // right-angle mark where the apothem meets the side
  noFill();
  strokeWeight(1.5);
  rect(midX, midY - 9, 9, 9);
  // radius: solid blue segment from the center to a vertex
  stroke('blue');
  strokeWeight(2.5);
  line(cx, cy, pts[0][0], pts[0][1]);
  noStroke();
  fill('black');
  circle(cx, cy, 7);

  // labels
  const ls = narrow ? 12 : 15;
  textSize(ls);
  // the apothem label sits to the right of the dashed line, the radius label to the left of the blue line
  fill('red');
  textAlign(LEFT, CENTER);
  text('a = ' + nf(a, 1, 2), cx + 7, (cy + midY) / 2);
  fill('blue');
  textAlign(RIGHT, CENTER);
  text('r = ' + nf(r, 1, 1), (cx + pts[0][0]) / 2 - 8, (cy + pts[0][1]) / 2 - 6);
  fill('black');
  textAlign(CENTER, TOP);
  text('s = ' + nf(s, 1, 2), midX, midY + 5);

  // panels
  const ts = narrow ? 12 : 15;
  const lh = ts + 6;
  let y = 44;
  y = drawPanel(panelX, y, panelW, 'Polygon Properties', 'white', ts, lh, [
    ['n = ' + n + '  (' + NAMES[n] + ')', 'black'],
    ['Side length s = ' + nf(s, 1, 2) + ' units', 'black'],
    ['Apothem a = ' + nf(a, 1, 2) + ' units', 'red'],
    ['Perimeter P = ' + n + ' × ' + nf(s, 1, 2) + ' = ' + nf(P, 1, 2), 'black']
  ]) + 7;
  y = drawPanel(panelX, y, panelW, 'Area Formula', 'lightyellow', ts, lh, [
    ['A = ½ a P', 'black'],
    ['A = ½ (' + nf(a, 1, 2) + ')(' + nf(P, 1, 2) + ')', 'black'],
    ['A = ' + nf(area, 1, 2) + ' square units', 'blue']
  ]) + 7;
  drawPanel(panelX, y, panelW, 'Approaching a Circle', 'honeydew', ts, lh, [
    ['Circle of radius r: πr² = ' + nf(circleArea, 1, 2), 'black'],
    ['Polygon fills ' + nf(100 * area / circleArea, 1, 1) + '% of the circle', 'darkgreen']
  ]);
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
  resizeSliders();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
