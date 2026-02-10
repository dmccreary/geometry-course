// Complementary and Supplementary Angle Finder
// Students calculate complementary and supplementary angles
// and understand their relationships visually

// Canvas dimensions
let canvasWidth = 650;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Slider state
let sliderX;          // Current thumb x position
let sliderMin = 1;
let sliderMax = 179;
let sliderValue = 40; // Default angle
let sliderTrackY = 45;
let sliderTrackLeft = 180;
let sliderTrackRight;
let sliderThumbR = 10;
let isDragging = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Calculate initial slider track right edge
  sliderTrackRight = canvasWidth - margin;

  // Set initial thumb position based on default value
  sliderX = map(sliderValue, sliderMin, sliderMax, sliderTrackLeft, sliderTrackRight);

  describe('Interactive tool to find complementary and supplementary angle pairs. Drag the slider to change the angle and see both angle pairs update visually.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Recalculate slider track right edge on each frame for responsiveness
  sliderTrackRight = canvasWidth - margin;

  // Clamp slider thumb position within track bounds
  sliderX = constrain(sliderX, sliderTrackLeft, sliderTrackRight);

  // Map slider position to angle value
  sliderValue = round(map(sliderX, sliderTrackLeft, sliderTrackRight, sliderMin, sliderMax));

  // Draw background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // --- Title ---
  noStroke();
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Complementary & Supplementary Angle Finder', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // --- Slider ---
  drawSlider();

  // --- Calculate angles ---
  let angle = sliderValue;
  let hasComplement = angle < 90;
  let complement = hasComplement ? 90 - angle : 0;
  let supplement = 180 - angle;

  // --- Visual display ---
  let vizTop = 85;
  let vizHeight = 280;
  let vizCenterY = vizTop + vizHeight / 2 + 10;
  let rayLength = 100;

  // Determine layout positions
  let compCx, compCy, suppCx, suppCy;

  if (hasComplement) {
    // Two displays side by side
    compCx = canvasWidth * 0.3;
    compCy = vizCenterY;
    suppCx = canvasWidth * 0.7;
    suppCy = vizCenterY;
  } else {
    // Only supplementary - center it
    suppCx = canvasWidth / 2;
    suppCy = vizCenterY;
  }

  // --- Draw complementary angle pair ---
  if (hasComplement) {
    drawAnglePair(compCx, compCy, rayLength, angle, complement,
                  'Complementary Pair', 90,
                  color(33, 100, 243),     // blue for original
                  color(76, 175, 80),      // green for complement
                  true);
  }

  // --- Draw supplementary angle pair ---
  drawAnglePair(suppCx, suppCy, rayLength, angle, supplement,
                'Supplementary Pair', 180,
                color(33, 100, 243),       // blue for original
                color(255, 152, 0),        // orange for supplement
                false);

  // --- No complement message ---
  if (!hasComplement) {
    noStroke();
    fill('#9E9E9E');
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(ITALIC);
    if (angle === 90) {
      text('Your angle is a right angle (90\u00B0).', canvasWidth * 0.3, vizCenterY - 30);
      text('It has no complement, but its', canvasWidth * 0.3, vizCenterY);
      text('supplement is another 90\u00B0!', canvasWidth * 0.3, vizCenterY + 30);
    } else {
      text('No complementary angle exists', canvasWidth * 0.3, vizCenterY - 15);
      text('when your angle is \u2265 90\u00B0', canvasWidth * 0.3, vizCenterY + 15);
    }
    textStyle(NORMAL);
  }

  // --- Result area (control region) ---
  drawResults(angle, hasComplement, complement, supplement);
}

function drawSlider() {
  // Label
  noStroke();
  fill('#424242');
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text('Choose an angle: ' + sliderValue + '\u00B0', margin, sliderTrackY);
  textStyle(NORMAL);

  // Track background
  stroke('#BDBDBD');
  strokeWeight(4);
  line(sliderTrackLeft, sliderTrackY, sliderTrackRight, sliderTrackY);

  // Track filled portion
  stroke('#1565C0');
  strokeWeight(4);
  line(sliderTrackLeft, sliderTrackY, sliderX, sliderTrackY);

  // Thumb shadow
  noStroke();
  fill(0, 0, 0, 30);
  circle(sliderX + 1, sliderTrackY + 1, sliderThumbR * 2 + 2);

  // Thumb
  fill(isDragging ? '#0D47A1' : '#1565C0');
  stroke('white');
  strokeWeight(2);
  circle(sliderX, sliderTrackY, sliderThumbR * 2);
}

function drawAnglePair(cx, cy, rayLen, angle1, angle2, label, total, col1, col2, isComplement) {
  let theta1 = radians(angle1);
  let theta2 = radians(angle2);

  // Section label
  noStroke();
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text(label, cx, 70);
  textStyle(NORMAL);

  // Draw angle 1 arc (from 0 going counter-clockwise)
  noFill();
  strokeWeight(3);
  stroke(col1);
  let arcR = 60;
  arc(cx, cy, arcR, arcR, -theta1, 0);

  // Fill angle 1 arc
  let c1fill = color(red(col1), green(col1), blue(col1), 50);
  fill(c1fill);
  noStroke();
  arc(cx, cy, arcR, arcR, -theta1, 0, PIE);

  // Draw angle 2 arc (from angle1 going further counter-clockwise)
  noFill();
  strokeWeight(3);
  stroke(col2);
  let arcR2 = 80;
  arc(cx, cy, arcR2, arcR2, -radians(total), -theta1);

  // Fill angle 2 arc
  let c2fill = color(red(col2), green(col2), blue(col2), 50);
  fill(c2fill);
  noStroke();
  arc(cx, cy, arcR2, arcR2, -radians(total), -theta1, PIE);

  // Draw rays
  strokeWeight(3);

  // Ray at 0 degrees (horizontal right)
  stroke('#424242');
  line(cx, cy, cx + rayLen, cy);

  // Ray at angle1 (boundary between the two angles)
  stroke('#424242');
  let bx = cx + rayLen * cos(-theta1);
  let by = cy + rayLen * sin(-theta1);
  line(cx, cy, bx, by);

  // Ray at total angle (90 or 180)
  stroke('#424242');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  let tx = cx + rayLen * cos(-radians(total));
  let ty = cy + rayLen * sin(-radians(total));
  line(cx, cy, tx, ty);
  drawingContext.setLineDash([]);

  // Right angle marker for complement
  if (isComplement) {
    let markerSize = 12;
    noFill();
    stroke('#424242');
    strokeWeight(1.5);
    drawingContext.setLineDash([]);
    // Draw small square at origin indicating 90 degrees
    let mx1 = cx + markerSize;
    let my1 = cy;
    let mx2 = cx + markerSize;
    let my2 = cy - markerSize;
    let mx3 = cx;
    let my3 = cy - markerSize;
    line(mx1, my1, mx2, my2);
    line(mx2, my2, mx3, my3);
  }

  // Vertex dot
  fill('#FF9800');
  noStroke();
  circle(cx, cy, 10);

  // Angle labels inside arcs
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  // Label for angle 1
  let label1Angle = -theta1 / 2;
  let label1R = 42;
  fill(col1);
  text(angle1 + '\u00B0', cx + label1R * cos(label1Angle), cy + label1R * sin(label1Angle));

  // Label for angle 2
  let midAngle2 = -(theta1 + radians(total)) / 2;
  let label2R = 52;
  fill(col2);
  text(angle2 + '\u00B0', cx + label2R * cos(midAngle2), cy + label2R * sin(midAngle2));

  textStyle(NORMAL);

  // Equation below the angle diagram
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  fill('#424242');
  let eqY = cy + rayLen + 20;
  text(angle1 + '\u00B0 + ' + angle2 + '\u00B0 = ' + total + '\u00B0', cx, eqY);
}

function drawResults(angle, hasComplement, complement, supplement) {
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);

  let y1 = drawHeight + 25;
  let y2 = drawHeight + 50;
  let y3 = drawHeight + 75;
  let x1 = margin;
  let x2 = canvasWidth / 2 + 20;

  // Your angle
  fill('#1565C0');
  textStyle(BOLD);
  text('Your angle: ' + angle + '\u00B0', x1, y1);
  textStyle(NORMAL);

  // Complementary
  if (hasComplement) {
    fill('#4CAF50');
    text('Complementary: ' + complement + '\u00B0', x1, y2);
    fill('#757575');
    textSize(14);
    text('(' + angle + '\u00B0 + ' + complement + '\u00B0 = 90\u00B0)', x1, y3);
  } else {
    fill('#9E9E9E');
    text('Complementary: None (angle \u2265 90\u00B0)', x1, y2);
  }

  // Supplementary
  textSize(16);
  fill('#FF9800');
  text('Supplementary: ' + supplement + '\u00B0', x2, y2);
  fill('#757575');
  textSize(14);
  text('(' + angle + '\u00B0 + ' + supplement + '\u00B0 = 180\u00B0)', x2, y3);

  // Angle type label
  textSize(14);
  textAlign(RIGHT, CENTER);
  fill('#757575');
  textStyle(ITALIC);
  let typeName = '';
  if (angle < 90) typeName = 'Acute Angle';
  else if (angle === 90) typeName = 'Right Angle';
  else typeName = 'Obtuse Angle';
  text(typeName, canvasWidth - margin, y1);
  textStyle(NORMAL);
}

// --- Mouse interaction for canvas-based slider ---
function mousePressed() {
  if (isOverSliderThumb(mouseX, mouseY)) {
    isDragging = true;
  } else if (isOverSliderTrack(mouseX, mouseY)) {
    // Click on track jumps thumb to that position
    sliderX = constrain(mouseX, sliderTrackLeft, sliderTrackRight);
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    sliderX = constrain(mouseX, sliderTrackLeft, sliderTrackRight);
  }
}

function mouseReleased() {
  isDragging = false;
}

function isOverSliderThumb(mx, my) {
  return dist(mx, my, sliderX, sliderTrackY) < sliderThumbR + 5;
}

function isOverSliderTrack(mx, my) {
  return mx >= sliderTrackLeft - 5 && mx <= sliderTrackRight + 5 &&
         my >= sliderTrackY - 12 && my <= sliderTrackY + 12;
}

// --- Responsive design ---
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  // Recalculate slider position to maintain same value
  sliderTrackRight = canvasWidth - margin;
  sliderX = map(sliderValue, sliderMin, sliderMax, sliderTrackLeft, sliderTrackRight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    // Constrain width to reasonable bounds
    canvasWidth = max(canvasWidth, 500);
    // Recalculate slider track right
    sliderTrackRight = canvasWidth - margin;
    // Keep slider thumb in correct position for current value
    sliderX = map(sliderValue, sliderMin, sliderMax, sliderTrackLeft, sliderTrackRight);
  }
}
