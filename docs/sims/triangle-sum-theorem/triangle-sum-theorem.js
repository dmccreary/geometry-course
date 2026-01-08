// Triangle Sum Theorem Proof Visualization
// Shows why triangle angles sum to 180°

let canvasWidth = 800;
let drawHeight = 500;
let canvasHeight = drawHeight;

let currentStep = 0;
let maxSteps = 5;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Visual proof of Triangle Sum Theorem showing angles sum to 180°', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFFFFF');

  // Title
  fill('#424242');
  textSize(16);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Visual Proof: Triangle Angle Sum Theorem", canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Step indicator
  fill('#757575');
  textSize(11);
  text('Step ' + (currentStep + 1) + ' of ' + (maxSteps + 1) + ' - Click anywhere to advance', canvasWidth / 2, 28);

  drawProof();
  drawStepExplanation();
}

function drawProof() {
  let cx = canvasWidth / 2;
  let cy = 200;

  // Triangle vertices
  let ax = cx - 120;
  let ay = cy + 80;
  let bx = cx + 120;
  let by = cy + 80;
  let Cx = cx;
  let Cy = cy - 60;

  // Draw parallel line through B (appears in step 1+)
  if (currentStep >= 1) {
    stroke('#4CAF50');
    strokeWeight(2);
    setLineDash([8, 4]);
    line(ax - 50, by, bx + 100, by);
    setLineDash([]);

    // Parallel marks
    fill('#4CAF50');
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text("Line ℓ || AC", bx + 40, by - 15);

    // Extend AC to show parallel relationship
    stroke('#9E9E9E');
    strokeWeight(1);
    setLineDash([4, 4]);
    line(ax - 30, ay, Cx + (Cx - ax) * 0.3, Cy - (ay - Cy) * 0.3);
    setLineDash([]);
  }

  // Draw triangle
  stroke('#1565C0');
  strokeWeight(3);
  noFill();
  triangle(ax, ay, bx, by, Cx, Cy);

  // Draw angle arcs
  let angle1 = getAngle(ax, ay, bx, by, Cx, Cy);
  let angle2 = getAngle(bx, by, Cx, Cy, ax, ay);
  let angle3 = getAngle(Cx, Cy, ax, ay, bx, by);

  // Angle 1 at A (red)
  drawAngleArc(ax, ay, bx, by, Cx, Cy, '#F44336', 200, "∠1");

  // Angle 2 at B (orange)
  drawAngleArc(bx, by, Cx, Cy, ax, ay, '#FF9800', 200, "∠2");

  // Angle 3 at C (blue)
  drawAngleArc(Cx, Cy, ax, ay, bx, by, '#2196F3', 200, "∠3");

  // Show alternate interior angles on parallel line (step 2+)
  if (currentStep >= 2) {
    // Angle 4 at B on line ℓ (matches angle 1)
    let angle4Start = PI;
    let angle4End = PI + atan2(Cx - bx, bx - Cx + 120);
    let aToB = atan2(ay - by, ax - bx);

    fill(244, 67, 54, 80);
    stroke('#F44336');
    strokeWeight(2);
    arc(bx, by, 35, 35, PI, PI + abs(aToB - PI));
    noStroke();
    fill('#F44336');
    textSize(10);
    textAlign(CENTER, CENTER);
    text("∠4", bx - 25, by - 12);

    // Label
    if (currentStep === 2) {
      fill('#F44336');
      textSize(10);
      textAlign(LEFT, TOP);
      text("∠4 ≅ ∠1 (alternate interior angles)", cx - 100, cy + 150);
    }
  }

  if (currentStep >= 3) {
    // Angle 5 at B on line ℓ (matches angle 3)
    let cToB = atan2(Cy - by, Cx - bx);

    fill(33, 150, 243, 80);
    stroke('#2196F3');
    strokeWeight(2);
    arc(bx, by, 35, 35, cToB, 0);
    noStroke();
    fill('#2196F3');
    textSize(10);
    textAlign(CENTER, CENTER);
    text("∠5", bx + 25, by - 12);

    if (currentStep === 3) {
      fill('#2196F3');
      textSize(10);
      textAlign(LEFT, TOP);
      text("∠5 ≅ ∠3 (alternate interior angles)", cx - 100, cy + 150);
    }
  }

  if (currentStep >= 4) {
    // Show angles on straight line
    fill('#9C27B0');
    textSize(11);
    textAlign(CENTER, TOP);
    text("∠4 + ∠2 + ∠5 = 180° (angles on a straight line)", cx, cy + 130);
  }

  if (currentStep >= 5) {
    // Final substitution
    fill('#4CAF50');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("Since ∠4 ≅ ∠1 and ∠5 ≅ ∠3:", cx, cy + 155);
    text("∠1 + ∠2 + ∠3 = 180°", cx, cy + 175);
    textStyle(NORMAL);

    // Success box
    fill(76, 175, 80, 30);
    stroke('#4CAF50');
    strokeWeight(2);
    rect(cx - 140, cy + 200, 280, 35, 5);

    noStroke();
    fill('#2E7D32');
    textSize(13);
    textStyle(BOLD);
    text("Triangle angles sum to 180°!", cx, cy + 215);
    textStyle(NORMAL);
  }

  // Vertex labels
  noStroke();
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('A', ax - 15, ay + 10);
  text('B', bx + 15, by + 10);
  text('C', Cx, Cy - 15);
  textStyle(NORMAL);
}

function getAngle(vx, vy, p1x, p1y, p2x, p2y) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);
  let angle = abs(a1 - a2);
  if (angle > PI) angle = TWO_PI - angle;
  return angle * 180 / PI;
}

function drawAngleArc(vx, vy, p1x, p1y, p2x, p2y, col, alpha, label) {
  let a1 = atan2(p1y - vy, p1x - vx);
  let a2 = atan2(p2y - vy, p2x - vx);

  if (a1 > a2) [a1, a2] = [a2, a1];
  if (a2 - a1 > PI) {
    a1 += TWO_PI;
    [a1, a2] = [a2, a1];
  }

  let c = color(col);
  fill(red(c), green(c), blue(c), alpha * 0.3);
  stroke(col);
  strokeWeight(2);
  arc(vx, vy, 30, 30, a1, a2, PIE);

  // Label
  noStroke();
  fill(col);
  textSize(11);
  textAlign(CENTER, CENTER);
  let midAngle = (a1 + a2) / 2;
  text(label, vx + 22 * cos(midAngle), vy + 22 * sin(midAngle));
}

function drawStepExplanation() {
  let y = drawHeight - 65;

  fill(33, 150, 243, 30);
  noStroke();
  rect(10, y, canvasWidth - 20, 55, 5);

  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);

  let explanations = [
    "Step 1: Start with triangle ABC with angles ∠1, ∠2, and ∠3",
    "Step 2: Draw a line ℓ through B parallel to side AC",
    "Step 3: ∠4 ≅ ∠1 because they are alternate interior angles (transversal AB)",
    "Step 4: ∠5 ≅ ∠3 because they are alternate interior angles (transversal BC)",
    "Step 5: At B, angles ∠4, ∠2, ∠5 form a straight line, so ∠4 + ∠2 + ∠5 = 180°",
    "Step 6: Substituting ∠1 for ∠4 and ∠3 for ∠5: ∠1 + ∠2 + ∠3 = 180° ✓"
  ];

  text(explanations[currentStep], canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(10);
  text("This proof uses parallel lines and alternate interior angles from Chapter 3!", canvasWidth / 2, y + 35);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function mousePressed() {
  currentStep = (currentStep + 1) % (maxSteps + 1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
