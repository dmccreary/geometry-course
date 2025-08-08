// Comparing Degrees and Radians — MicroSim (p5.js)
// Responsive width layout per standard-rules.md

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 105;
let defaultTextSize = 16;

let containerWidth;
let containerHeight = canvasHeight;

let angleSlider;
let angleDeg = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  angleSlider = createSlider(0, 360, 0, 1);
  angleSlider.position(sliderLeftMargin, drawHeight + 12);
  angleSlider.size(containerWidth - sliderLeftMargin - 15);
  angleSlider.input(() => { angleDeg = angleSlider.value(); redraw(); });

  angleDeg = angleSlider.value();
  noLoop();

  describe(
    'Interactive diagram comparing degrees and radians. A radius line rotates around a central circle. Slider controls the angle from 0° to 360°. Blue and orange arcs along the circumference show unit-radian lengths, illustrating that a full circle is 2π radians.',
    LABEL
  );
}

function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawGeometry();
  drawControlLabels();
}

function drawTitle() {
  const titleSize = getResponsiveTextSize(24);
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(titleSize);
  text("Comparing Degrees and Radians", canvasWidth / 2, margin);
}

function drawGeometry() {
  const cx = canvasWidth / 2;
  const r = min(canvasWidth, drawHeight) * 0.32;
  const cy = margin + getResponsiveTextSize(24) + 20 + r;

  stroke(60);
  strokeWeight(2);
  noFill();
  circle(cx, cy, 2 * r);

  const twoPi = TAU;
  const fullSegments = floor(twoPi);
  const remainder = twoPi - fullSegments;

  strokeWeight(6);
  noFill();

  let start = 0;
  for (let i = 0; i < fullSegments; i++) {
    stroke(i % 2 === 0 ? 'royalblue' : 'orange');
    arc(cx, cy, 2 * r, 2 * r, start, start + 1);
    start += 1;
  }

  stroke(start % 2 === 0 ? 'royalblue' : 'orange');
  if (remainder > 0) {
    arc(cx, cy, 2 * r, 2 * r, start, start + remainder);
  }

  stroke(80);
  strokeWeight(1);
  noFill();
  circle(cx, cy, 2 * r);

  textAlign(CENTER, CENTER);
  textSize(getResponsiveTextSize(12));
  noStroke();
  fill(0);
  for (let k = 0; k <= fullSegments; k++) {
    const a = k;
    const tx = cx + (r + 16) * cos(a);
    const ty = cy + (r + 16) * sin(a);
    text(k, tx, ty);
  }
  const tp = cx + (r + 22) * cos(twoPi - 0.12);
  const tq = cy + (r + 22) * sin(twoPi - 0.12);
  text("2π", tp, tq);

  const angleRad = radians(angleDeg);
  if (angleRad > 0) {
    fill(255, 165, 0, 60);
    noStroke();
    arc(cx, cy, 2 * r, 2 * r, 0, angleRad, PIE);
  }

  stroke(0);
  strokeWeight(3);
  const rx = cx + r * cos(angleRad);
  const ry = cy + r * sin(angleRad);
  line(cx, cy, rx, ry);

  stroke(120);
  strokeWeight(1);
  line(cx, cy, cx + r, cy);

  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(getResponsiveTextSize(16));
  const labelY = cy + r + 28;
  const radVal = (angleRad).toFixed(3);
  text(`Angle: ${nf(angleDeg, 1, 0)}°  |  θ = ${radVal} rad`, canvasWidth / 2, labelY);

  textAlign(LEFT, CENTER);
  const legendY = margin + 8;
  fill('royalblue');
  rect(canvasWidth - 170, legendY - 6, 24, 6);
  fill(0);
  textSize(getResponsiveTextSize(12));
  text('= 1 radian arc (blue/orange alternates)', canvasWidth - 140, legendY - 6 + 3);

  textAlign(CENTER, TOP);
  textSize(getResponsiveTextSize(14));
  fill(0);
  text('A full circle = 2π radians ≈ 6.283 radians', canvasWidth / 2, labelY + 24);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(getResponsiveTextSize(defaultTextSize));
  text('Angle (°):', 10, drawHeight + 18);
  text(nf(angleSlider.value(), 1, 0), 85, drawHeight + 18);
}

function getResponsiveTextSize(baseSize) {
  return constrain(baseSize * (containerWidth / 800), max(10, baseSize * 0.8), baseSize * 1.5);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  angleSlider.size(containerWidth - sliderLeftMargin - 15);
  redraw();
}

function updateCanvasSize() {
  const rect = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(rect.width);
  canvasWidth = containerWidth;
}
