/******************************************************
 * Angle Pairs: Complementary vs. Supplementary
 * Topics: Angle pairs, linear pairs
 * Description: Two angles share a common ray (the +x axis).
 *   θ1 is drawn above the ray (CCW), θ2 below (CW). We highlight
 *   when θ1 + θ2 = 90° (complementary) or 180° (supplementary).
 * Controls: Slider θ1, Slider θ2 (with live sum), Button (Snap to 90/180)
 * Learning Objectives: Identify complementary vs. supplementary; compute missing angle
 * Difficulty: Beginner
 ******************************************************/

//----- Core layout vars from standard-rules.md -----
let canvasWidth = 400;         // will be updated responsively
let drawHeight = 400;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 70;
let defaultTextSize = 18;

let containerWidth;
let containerHeight = canvasHeight;

//----- Controls -----
let theta1Slider, theta2Slider;
let snapButton;

//----- State -----
let epsilon = 1; // degrees tolerance for highlighting (±1°)

//----- Responsive typography -----
function getResponsiveTextSize(baseSize) {
  return constrain(baseSize * (containerWidth / 800), baseSize * 0.8, baseSize * 1.5);
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Sliders: 0..180 keeps a clean adjacent-angles story
  theta1Slider = createSlider(0, 180, 45, 1);
  theta1Slider.position(sliderLeftMargin, drawHeight + 5);
  theta1Slider.size(containerWidth - sliderLeftMargin - 200);

  theta2Slider = createSlider(0, 180, 45, 1);
  theta2Slider.position(sliderLeftMargin, drawHeight + 33);
  theta2Slider.size(containerWidth - sliderLeftMargin - 200);

  snapButton = createButton('Snap to 90/180');
  snapButton.position(10, drawHeight + 60);
  snapButton.mousePressed(snapToNearestTarget);

  describe(
    'Two angles share a common ray. Angle θ1 opens counterclockwise above the ray; angle θ2 opens clockwise below it. The display highlights when the angles are complementary (sum 90 degrees) or supplementary (sum 180 degrees). A button snaps the pair to the nearest target sum. Angle pairs interactive simulation'
  );
}

function draw() {

  //--- Draw regions per standard MicroSim rules ---
  
  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Controls area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(getResponsiveTextSize(24));
  text('Angle Pairs: Complementary vs. Supplementary', canvasWidth / 2, margin/2);

  // Reset text style for labels
  textAlign(LEFT, CENTER);
  textSize(getResponsiveTextSize(defaultTextSize));

  //--- Read controls ---
  const th1 = theta1Slider.value(); // degrees, CCW above +x
  const th2 = theta2Slider.value(); // degrees, CW below +x
  const sum = th1 + th2;

  //--- Decide highlight state ---
  const isComp = abs(sum - 90) <= epsilon;
  const isSupp = abs(sum - 180) <= epsilon;

  //--- Draw the geometry ---
  drawAngleScene(th1, th2, isComp, isSupp, sum);

  //--- Control labels (with live values) ---
  drawControlLabels(th1, th2, sum, isComp, isSupp);
}

function drawAngleScene(th1, th2, isComp, isSupp, sum) {
  push();
  translate(canvasWidth / 2, drawHeight * 0.55); // center-ish vertex

  // Axis / straight line through the vertex (for "share a line" feel)
  stroke(180);
  strokeWeight(2);
  line(-containerWidth, 0, containerWidth, 0);

  // Common side: +x ray
  stroke(60);
  strokeWeight(3);
  line(0, 0, containerWidth, 0);

  // Colors
  const baseArc = color(70, 130, 180); // steelblue
  const compArc = color(0, 140, 0);    // green
  const suppArc = color(255, 140, 0);  // orange

  const arcColor = isComp ? compArc : (isSupp ? suppArc : baseArc);

  // Arc radii & styles
  const r = min(canvasWidth, drawHeight) * 0.28;
  noFill();
  stroke(arcColor);
  strokeWeight(8);
  strokeCap(SQUARE);

  // θ1 arc (above +x, CCW)
  // p5 arc angles are in radians and measured from 0 along +x, CCW positive
  const th1rad = radians(th1);
  arc(0, 0, 2 * r, 2 * r, 0, th1rad);

  // θ2 arc (below +x, CW) => negative angle
  const th2rad = radians(th2);
  arc(0, 0, 2 * r * 0.82, 2 * r * 0.82, 0, -th2rad);

  // Rays for θ1 and θ2
  stroke(40);
  strokeWeight(3);
  // θ1 terminal ray
  line(0, 0, r * cos(th1rad), r * sin(th1rad));
  // θ2 terminal ray (negative angle)
  line(0, 0, r * cos(-th2rad), r * sin(-th2rad));

  // Vertex
  noStroke();
  fill(0);
  circle(0, 0, 6);

  // Labels near arcs
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(getResponsiveTextSize(14));
  const p1 = createVector((r + 18) * cos(th1rad / 2), (r + 18) * sin(th1rad / 2));
  const p2 = createVector((r * 0.82 + 18) * cos(-th2rad / 2), (r * 0.82 + 18) * sin(-th2rad / 2));
  text(`θ₁ = ${th1}°`, p1.x, p1.y);
  text(`θ₂ = ${th2}°`, p2.x, p2.y);

  // Sum badge
  const badge = isComp ? 'Complementary (90°)' : (isSupp ? 'Supplementary (180°)' : '');
  const badgeColor = isComp ? color(0, 140, 0) : (isSupp ? color(255, 140, 0) : null);

  if (badge) {
    const tagY = -r - 30;
    const tagW = textWidth(badge) + 16;
    push();
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(0, tagY, tagW + 10, 28, 6);
    fill(badgeColor);
    textAlign(CENTER, CENTER);
    textSize(getResponsiveTextSize(14));
    text(badge, 0, tagY);
    pop();
  }

  // Helper text: missing angle suggestions
  fill(0);
  textAlign(CENTER, TOP);
  textSize(getResponsiveTextSize(14));
  const miss90 = `If complementary → missing = 90° − θ₁ = ${max(0, 90 - th1)}°,  90° − θ₂ = ${max(0, 90 - th2)}°`;
  const miss180 = `If supplementary → missing = 180° − θ₁ = ${max(0, 180 - th1)}°,  180° − θ₂ = ${max(0, 180 - th2)}°`;
  text(miss90, 0, r + 16);
  text(miss180, 0, r + 36);

  // Sum readout at top
  textAlign(CENTER, BOTTOM);
  textSize(getResponsiveTextSize(18));
  fill(isComp ? compArc : isSupp ? suppArc : 0);
  text(`θ₁ + θ₂ = ${sum}°`, 0, -r - 55);

  pop();
}

function drawControlLabels(th1, th2, sum, isComp, isSupp) {
  fill(0);
  noStroke();
  textSize(getResponsiveTextSize(defaultTextSize));
  textAlign(LEFT, CENTER);

  text(`θ₁: ${th1}°`, 10, drawHeight + 15);
  text(`θ₂: ${th2}°`, 10, drawHeight + 43);

  const status = isComp ? 'Complementary' : (isSupp ? 'Supplementary' : '—');
  textAlign(RIGHT, CENTER);
  text(`Sum: ${sum}°  ${status}`, canvasWidth - 10, drawHeight + 15);
}

function snapToNearestTarget() {
  const th1 = theta1Slider.value();
  const th2 = theta2Slider.value();
  // Targets that make the sum 90 or 180 by adjusting θ2
  const targetFor90 = constrain(90 - th1, 0, 180);
  const targetFor180 = constrain(180 - th1, 0, 180);

  const d90 = abs(th2 - targetFor90);
  const d180 = abs(th2 - targetFor180);

  theta2Slider.value(d90 <= d180 ? targetFor90 : targetFor180);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  // Resize sliders to match new width
  theta1Slider.size(containerWidth - sliderLeftMargin - 15);
  theta2Slider.size(containerWidth - sliderLeftMargin - 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
