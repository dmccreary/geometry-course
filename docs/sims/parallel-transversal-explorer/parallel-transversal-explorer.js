// Parallel Lines and Transversal Angle Explorer
// Interactive demonstration of angle relationships

let canvasWidth = 850;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let transversalAngle = 60; // angle of transversal
let highlightMode = 0; // 0=none, 1=corresponding, 2=alt interior, 3=alt exterior, 4=same-side

let correspondingBtn, altInteriorBtn, altExteriorBtn, sameSideBtn, resetBtn;
let angleSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create buttons
  let btnY = drawHeight + 15;
  let btnW = 130;

  correspondingBtn = createButton('Corresponding');
  correspondingBtn.position(30, btnY);
  correspondingBtn.size(btnW, 28);
  correspondingBtn.mousePressed(() => highlightMode = 1);

  altInteriorBtn = createButton('Alt. Interior');
  altInteriorBtn.position(30 + btnW + 10, btnY);
  altInteriorBtn.size(btnW, 28);
  altInteriorBtn.mousePressed(() => highlightMode = 2);

  altExteriorBtn = createButton('Alt. Exterior');
  altExteriorBtn.position(30 + 2 * (btnW + 10), btnY);
  altExteriorBtn.size(btnW, 28);
  altExteriorBtn.mousePressed(() => highlightMode = 3);

  sameSideBtn = createButton('Same-Side Int.');
  sameSideBtn.position(30 + 3 * (btnW + 10), btnY);
  sameSideBtn.size(btnW, 28);
  sameSideBtn.mousePressed(() => highlightMode = 4);

  resetBtn = createButton('Clear');
  resetBtn.position(30 + 4 * (btnW + 10), btnY);
  resetBtn.size(70, 28);
  resetBtn.mousePressed(() => highlightMode = 0);

  angleSlider = createSlider(30, 80, 60, 1);
  angleSlider.position(canvasWidth / 2 - 100, drawHeight + 60);
  angleSlider.size(200);

  describe('Interactive parallel lines and transversal with angle relationship highlighting', LABEL);
}

function draw() {
  updateCanvasSize();
  transversalAngle = angleSlider.value();

  background('#FAFAFA');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Parallel Lines & Transversal Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Slider label
  fill('#424242');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Transversal Angle: ' + transversalAngle + '°', canvasWidth / 2, drawHeight + 82);

  // Draw the parallel lines and transversal
  drawParallelSystem();

  // Draw legend
  drawLegend();

  // Draw relationship info
  drawRelationshipInfo();
}

function drawParallelSystem() {
  let cx = canvasWidth / 2 - 100;
  let lineLen = 280;
  let spacing = 180; // distance between parallel lines
  let y1 = 180; // top parallel line
  let y2 = y1 + spacing; // bottom parallel line

  // Parallel lines (horizontal)
  stroke('#1976D2');
  strokeWeight(4);
  line(cx - lineLen, y1, cx + lineLen, y1);
  line(cx - lineLen, y2, cx + lineLen, y2);

  // Parallel symbols (arrows)
  fill('#1976D2');
  noStroke();
  // Top line arrows
  triangle(cx - 50, y1 - 8, cx - 50, y1 + 8, cx - 35, y1);
  triangle(cx - 70, y1 - 8, cx - 70, y1 + 8, cx - 55, y1);
  // Bottom line arrows
  triangle(cx - 50, y2 - 8, cx - 50, y2 + 8, cx - 35, y2);
  triangle(cx - 70, y2 - 8, cx - 70, y2 + 8, cx - 55, y2);

  // Labels for parallel lines
  textSize(14);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('l', cx - lineLen - 15, y1);
  text('m', cx - lineLen - 15, y2);
  textStyle(NORMAL);

  // Transversal
  let transLen = 250;
  let t1x = cx - transLen * cos(radians(transversalAngle));
  let t1y = y1 - (y1 - (y1 - transLen * sin(radians(transversalAngle))));
  let t2x = cx + transLen * cos(radians(transversalAngle));
  let t2y = y2 + transLen * sin(radians(transversalAngle));

  // Calculate intersection points
  let int1x = cx - spacing / 2 / tan(radians(transversalAngle));
  let int2x = cx + spacing / 2 / tan(radians(transversalAngle));

  stroke('#E53935');
  strokeWeight(4);
  line(int1x - 150 * cos(radians(transversalAngle)), y1 - 150 * sin(radians(transversalAngle)),
       int2x + 150 * cos(radians(transversalAngle)), y2 + 150 * sin(radians(transversalAngle)));

  // Transversal label
  fill('#E53935');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('t', int1x - 140 * cos(radians(transversalAngle)) - 15, y1 - 140 * sin(radians(transversalAngle)));
  textStyle(NORMAL);

  // Calculate all 8 angles
  let angles = [
    transversalAngle, // ∠1 (top-left at upper intersection)
    180 - transversalAngle, // ∠2 (top-right)
    180 - transversalAngle, // ∠3 (bottom-right)
    transversalAngle, // ∠4 (bottom-left)
    transversalAngle, // ∠5 (top-left at lower intersection)
    180 - transversalAngle, // ∠6 (top-right)
    180 - transversalAngle, // ∠7 (bottom-right)
    transversalAngle  // ∠8 (bottom-left)
  ];

  // Draw angle arcs at both intersections
  drawAnglesAtIntersection(int1x, y1, angles.slice(0, 4), 1);
  drawAnglesAtIntersection(int2x, y2, angles.slice(4, 8), 5);

  // Parallel notation
  fill('#424242');
  textSize(14);
  textAlign(LEFT, TOP);
  text('l ∥ m', cx + lineLen - 40, y1 - 30);
}

function drawAnglesAtIntersection(ix, iy, angles, startNum) {
  let arcR = 35;

  // Define colors for each highlighting mode
  let colors = [
    color(200, 200, 200, 80), // default gray
    color(76, 175, 80, 120),  // corresponding - green
    color(255, 193, 7, 120),  // alt interior - yellow
    color(255, 152, 0, 120),  // alt exterior - orange
    color(156, 39, 176, 120)  // same-side - purple
  ];

  // Angle positions (start angles for each of the 4 angles)
  let angleStarts = [
    -180,  // ∠1/∠5: top-left
    -transversalAngle,  // ∠2/∠6: top-right
    0,     // ∠3/∠7: bottom-right
    180 - transversalAngle  // ∠4/∠8: bottom-left
  ];

  let angleSweeps = [
    transversalAngle,
    180 - transversalAngle,
    transversalAngle,
    180 - transversalAngle
  ];

  // Determine which angles to highlight based on mode
  for (let i = 0; i < 4; i++) {
    let angleNum = startNum + i;
    let highlighted = false;
    let highlightColor = colors[0];

    if (highlightMode === 1) {
      // Corresponding: 1&5, 2&6, 3&7, 4&8
      highlighted = true;
      highlightColor = colors[1];
    } else if (highlightMode === 2) {
      // Alternate interior: 3&6, 4&5
      if ((angleNum === 3 || angleNum === 6) || (angleNum === 4 || angleNum === 5)) {
        highlighted = true;
        highlightColor = colors[2];
      }
    } else if (highlightMode === 3) {
      // Alternate exterior: 1&8, 2&7
      if ((angleNum === 1 || angleNum === 8) || (angleNum === 2 || angleNum === 7)) {
        highlighted = true;
        highlightColor = colors[3];
      }
    } else if (highlightMode === 4) {
      // Same-side interior: 3&5, 4&6
      if ((angleNum === 3 || angleNum === 5) || (angleNum === 4 || angleNum === 6)) {
        highlighted = true;
        highlightColor = colors[4];
      }
    }

    // Draw angle arc
    if (highlighted && highlightMode > 0) {
      fill(highlightColor);
      stroke(red(highlightColor), green(highlightColor), blue(highlightColor));
      strokeWeight(2);
    } else {
      fill(200, 200, 200, 50);
      stroke(150);
      strokeWeight(1);
    }

    arc(ix, iy, arcR * 2, arcR * 2, radians(angleStarts[i]), radians(angleStarts[i] + angleSweeps[i]), PIE);

    // Angle label
    let labelAngle = radians(angleStarts[i] + angleSweeps[i] / 2);
    let labelR = arcR + 25;
    let lx = ix + labelR * cos(labelAngle);
    let ly = iy + labelR * sin(labelAngle);

    noStroke();
    fill(highlighted && highlightMode > 0 ? '#212121' : '#757575');
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('∠' + angleNum, lx, ly);

    // Angle measure
    textSize(10);
    textStyle(NORMAL);
    fill(highlighted && highlightMode > 0 ? '#424242' : '#9E9E9E');
    text(round(angles[i]) + '°', lx, ly + 14);
  }

  // Intersection point
  fill('#FF9800');
  noStroke();
  circle(ix, iy, 10);
}

function drawLegend() {
  let legX = canvasWidth - 220;
  let legY = 60;

  fill('#F5F5F5');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(legX, legY, 200, 130, 8);

  noStroke();
  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Angle Relationships:', legX + 12, legY + 10);
  textStyle(NORMAL);

  textSize(10);
  let items = [
    { color: '#4CAF50', text: 'Corresponding: ≅' },
    { color: '#FFC107', text: 'Alt. Interior: ≅' },
    { color: '#FF9800', text: 'Alt. Exterior: ≅' },
    { color: '#9C27B0', text: 'Same-Side Int.: supplementary' }
  ];

  let itemY = legY + 35;
  for (let item of items) {
    fill(item.color);
    noStroke();
    rect(legX + 12, itemY, 12, 12, 2);
    fill('#424242');
    text(item.text, legX + 30, itemY + 1);
    itemY += 22;
  }
}

function drawRelationshipInfo() {
  if (highlightMode === 0) return;

  let infoX = 30;
  let infoY = drawHeight - 90;
  let infoW = 350;
  let infoH = 75;

  let info = { title: '', pairs: '', property: '' };

  if (highlightMode === 1) {
    info = {
      title: 'Corresponding Angles',
      pairs: '∠1≅∠5, ∠2≅∠6, ∠3≅∠7, ∠4≅∠8',
      property: 'Same position at each intersection → CONGRUENT'
    };
  } else if (highlightMode === 2) {
    info = {
      title: 'Alternate Interior Angles',
      pairs: '∠3≅∠6, ∠4≅∠5',
      property: 'Opposite sides, between lines → CONGRUENT'
    };
  } else if (highlightMode === 3) {
    info = {
      title: 'Alternate Exterior Angles',
      pairs: '∠1≅∠8, ∠2≅∠7',
      property: 'Opposite sides, outside lines → CONGRUENT'
    };
  } else if (highlightMode === 4) {
    info = {
      title: 'Same-Side Interior Angles',
      pairs: '∠3+∠5=180°, ∠4+∠6=180°',
      property: 'Same side, between lines → SUPPLEMENTARY'
    };
  }

  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(infoX, infoY, infoW, infoH, 8);

  noStroke();
  fill('#2E7D32');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(info.title, infoX + 12, infoY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  text('Pairs: ' + info.pairs, infoX + 12, infoY + 30);
  text(info.property, infoX + 12, infoY + 50);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 15;
  let btnW = 130;
  correspondingBtn.position(30, btnY);
  altInteriorBtn.position(30 + btnW + 10, btnY);
  altExteriorBtn.position(30 + 2 * (btnW + 10), btnY);
  sameSideBtn.position(30 + 3 * (btnW + 10), btnY);
  resetBtn.position(30 + 4 * (btnW + 10), btnY);
  angleSlider.position(canvasWidth / 2 - 100, drawHeight + 60);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 750);
  }
}
