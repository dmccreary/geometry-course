// Complementary and Supplementary Angle Finder
// Interactive tool to find angle pairs

let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let angleSlider;
let currentAngle = 40;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create slider
  angleSlider = createSlider(1, 179, 40, 1);
  angleSlider.position(canvasWidth / 2 - 200, drawHeight + 40);
  angleSlider.size(400);
  angleSlider.input(updateAngle);

  describe('Interactive tool to find complementary and supplementary angle pairs', LABEL);
}

function updateAngle() {
  currentAngle = angleSlider.value();
}

function draw() {
  updateCanvasSize();
  currentAngle = angleSlider.value();

  background('#F5F5F5');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Complementary & Supplementary Angle Finder', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Slider label
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Choose an angle: ' + currentAngle + '°', canvasWidth / 2, drawHeight + 15);

  // Draw the three angle displays
  drawOriginalAngle();
  drawComplementaryAngle();
  drawSupplementaryAngle();

  // Draw summary
  drawSummary();
}

function drawOriginalAngle() {
  let cx = 120;
  let cy = 180;
  let rayLen = 70;

  // Label
  fill('#1565C0');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Your Angle', cx, 50);
  textStyle(NORMAL);

  // Background circle
  fill('#E3F2FD');
  stroke('#BBDEFB');
  strokeWeight(1);
  circle(cx, cy, 160);

  // Angle arc
  fill(33, 150, 243, 120);
  stroke('#1976D2');
  strokeWeight(2);
  arc(cx, cy, 100, 100, -radians(currentAngle), 0, PIE);

  // Rays
  stroke('#1976D2');
  strokeWeight(3);
  line(cx, cy, cx + rayLen, cy);
  let endX = cx + rayLen * cos(radians(-currentAngle));
  let endY = cy + rayLen * sin(radians(-currentAngle));
  line(cx, cy, endX, endY);

  // Vertex
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 10);

  // Measure
  fill('#1565C0');
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(currentAngle + '°', cx, cy + 100);
  textStyle(NORMAL);
}

function drawComplementaryAngle() {
  let cx = canvasWidth / 2;
  let cy = 180;
  let rayLen = 70;
  let compAngle = 90 - currentAngle;
  let hasComplement = currentAngle < 90;

  // Label
  fill(hasComplement ? '#43A047' : '#9E9E9E');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Complement (→ 90°)', cx, 50);
  textStyle(NORMAL);

  // Background
  fill(hasComplement ? '#E8F5E9' : '#EEEEEE');
  stroke(hasComplement ? '#A5D6A7' : '#BDBDBD');
  strokeWeight(1);
  circle(cx, cy, 160);

  if (hasComplement) {
    // Show both angles forming 90°
    // Original angle (faded)
    fill(33, 150, 243, 60);
    stroke('#90CAF9');
    strokeWeight(1);
    arc(cx, cy, 90, 90, -radians(currentAngle), 0, PIE);

    // Complementary angle
    fill(76, 175, 80, 120);
    stroke('#43A047');
    strokeWeight(2);
    arc(cx, cy, 100, 100, -radians(90), -radians(currentAngle), PIE);

    // Right angle indicator
    noFill();
    stroke('#424242');
    strokeWeight(2);
    arc(cx, cy, 40, 40, -PI / 2, 0);

    // Rays
    stroke('#1976D2');
    strokeWeight(2);
    line(cx, cy, cx + rayLen, cy);

    stroke('#43A047');
    strokeWeight(3);
    line(cx, cy, cx, cy - rayLen);

    stroke('#7B1FA2');
    strokeWeight(2);
    let midX = cx + rayLen * cos(radians(-currentAngle));
    let midY = cy + rayLen * sin(radians(-currentAngle));
    line(cx, cy, midX, midY);

    // Right angle square
    noFill();
    stroke('#424242');
    strokeWeight(1);
    rect(cx, cy - 12, 12, 12);

    // Vertex
    fill('#FF9800');
    noStroke();
    circle(cx, cy, 10);

    // Measure
    fill('#43A047');
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(compAngle + '°', cx, cy + 100);

    // Equation
    fill('#424242');
    textSize(11);
    textStyle(NORMAL);
    text(currentAngle + '° + ' + compAngle + '° = 90°', cx, cy + 120);
  } else {
    // No complement
    fill('#9E9E9E');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('No complement', cx, cy - 10);
    text('(angle ≥ 90°)', cx, cy + 10);

    if (currentAngle === 90) {
      textSize(11);
      text('90° is already a right angle!', cx, cy + 100);
    }
  }
}

function drawSupplementaryAngle() {
  let cx = canvasWidth - 120;
  let cy = 180;
  let rayLen = 70;
  let suppAngle = 180 - currentAngle;

  // Label
  fill('#F57C00');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Supplement (→ 180°)', cx, 50);
  textStyle(NORMAL);

  // Background
  fill('#FFF3E0');
  stroke('#FFCC80');
  strokeWeight(1);
  circle(cx, cy, 160);

  // Original angle (faded)
  fill(33, 150, 243, 60);
  stroke('#90CAF9');
  strokeWeight(1);
  arc(cx, cy, 90, 90, -radians(currentAngle), 0, PIE);

  // Supplementary angle
  fill(255, 152, 0, 120);
  stroke('#F57C00');
  strokeWeight(2);
  arc(cx, cy, 100, 100, -radians(180), -radians(currentAngle), PIE);

  // Rays forming straight line
  stroke('#1976D2');
  strokeWeight(2);
  line(cx, cy, cx + rayLen, cy);

  stroke('#F57C00');
  strokeWeight(3);
  line(cx, cy, cx - rayLen, cy);

  stroke('#7B1FA2');
  strokeWeight(2);
  let midX = cx + rayLen * cos(radians(-currentAngle));
  let midY = cy + rayLen * sin(radians(-currentAngle));
  line(cx, cy, midX, midY);

  // Vertex
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 10);

  // Measure
  fill('#F57C00');
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(suppAngle + '°', cx, cy + 100);

  // Equation
  fill('#424242');
  textSize(11);
  textStyle(NORMAL);
  text(currentAngle + '° + ' + suppAngle + '° = 180°', cx, cy + 120);
}

function drawSummary() {
  let compAngle = 90 - currentAngle;
  let suppAngle = 180 - currentAngle;
  let hasComplement = currentAngle < 90;

  // Summary box
  fill('#FFFFFF');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(50, 300, canvasWidth - 100, 110, 10);

  fill('#424242');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Summary:', 70, 315);
  textStyle(NORMAL);

  textSize(12);
  text('Your angle: ' + currentAngle + '°', 70, 340);

  if (hasComplement) {
    fill('#43A047');
    text('Complement: ' + compAngle + '° (because ' + currentAngle + ' + ' + compAngle + ' = 90)', 70, 360);
  } else {
    fill('#9E9E9E');
    text('Complement: None (angle must be < 90° to have a complement)', 70, 360);
  }

  fill('#F57C00');
  text('Supplement: ' + suppAngle + '° (because ' + currentAngle + ' + ' + suppAngle + ' = 180)', 70, 380);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  angleSlider.position(canvasWidth / 2 - 200, drawHeight + 40);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 600);
  }
}
