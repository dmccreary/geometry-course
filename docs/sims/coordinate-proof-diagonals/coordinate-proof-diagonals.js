// Coordinate Proof: Rectangle Diagonals Are Congruent
// Interactive visualization with sliders to adjust rectangle dimensions

let canvasWidth = 850;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let aSlider, bSlider;
let aValue = 4;
let bValue = 3;

let hoveredElement = -1; // 0=A, 1=B, 2=C, 3=D, 4=AC, 5=BD, 6=formula

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create sliders
  aSlider = createSlider(2, 6, 4, 0.5);
  aSlider.position(canvasWidth / 2 - 100, drawHeight + 30);
  aSlider.size(120);
  aSlider.input(updateValues);

  bSlider = createSlider(2, 5, 3, 0.5);
  bSlider.position(canvasWidth / 2 + 80, drawHeight + 30);
  bSlider.size(120);
  bSlider.input(updateValues);

  describe('Interactive coordinate proof showing rectangle diagonals are congruent', LABEL);
}

function updateValues() {
  aValue = aSlider.value();
  bValue = bSlider.value();
}

function draw() {
  updateCanvasSize();

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
  text('Coordinate Proof: Rectangle Diagonals', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Slider labels
  fill('#424242');
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('a = ' + aValue.toFixed(1), canvasWidth / 2 - 110, drawHeight + 42);
  textAlign(LEFT, CENTER);
  text('b = ' + bValue.toFixed(1), canvasWidth / 2 + 210, drawHeight + 42);

  // Check hover
  checkHover();

  // Draw coordinate plane
  drawCoordinatePlane();

  // Draw rectangle and diagonals
  drawRectangle();

  // Draw formulas panel
  drawFormulas();
}

function checkHover() {
  hoveredElement = -1;

  // Check vertices (in graph coordinates)
  let graphX = 50;
  let graphY = 60;
  let graphW = 340;
  let graphH = 340;
  let scale = min(graphW / 7, graphH / 6);

  let vertices = [
    { x: graphX + 40, y: graphY + graphH - 40 }, // A at origin
    { x: graphX + 40 + aValue * scale, y: graphY + graphH - 40 }, // B
    { x: graphX + 40 + aValue * scale, y: graphY + graphH - 40 - bValue * scale }, // C
    { x: graphX + 40, y: graphY + graphH - 40 - bValue * scale } // D
  ];

  for (let i = 0; i < 4; i++) {
    if (dist(mouseX, mouseY, vertices[i].x, vertices[i].y) < 15) {
      hoveredElement = i;
      return;
    }
  }

  // Check formula boxes
  let formulaX = 430;
  if (mouseX > formulaX && mouseX < formulaX + 200) {
    if (mouseY > 120 && mouseY < 200) hoveredElement = 4; // AC formula
    else if (mouseY > 220 && mouseY < 300) hoveredElement = 5; // BD formula
    else if (mouseY > 320 && mouseY < 400) hoveredElement = 6; // Conclusion
  }
}

function drawCoordinatePlane() {
  let graphX = 50;
  let graphY = 60;
  let graphW = 340;
  let graphH = 340;

  // Background
  fill(255);
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(graphX, graphY, graphW, graphH, 8);

  let scale = min(graphW / 7, graphH / 6);
  let originX = graphX + 40;
  let originY = graphY + graphH - 40;

  // Grid
  stroke('#E8E8E8');
  strokeWeight(1);
  for (let i = 0; i <= 7; i++) {
    // Vertical lines
    line(originX + i * scale, graphY + 10, originX + i * scale, originY + 10);
    // Horizontal lines
    line(originX - 10, originY - i * scale, graphX + graphW - 10, originY - i * scale);
  }

  // Axes
  stroke('#424242');
  strokeWeight(2);
  // X-axis
  line(originX - 20, originY, graphX + graphW - 10, originY);
  // Y-axis
  line(originX, originY + 20, originX, graphY + 10);

  // Axis labels
  fill('#424242');
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('x', graphX + graphW - 15, originY + 5);
  textAlign(RIGHT, CENTER);
  text('y', originX - 8, graphY + 20);
  textStyle(NORMAL);

  // Tick labels
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = 1; i <= 6; i++) {
    text(i, originX + i * scale, originY + 5);
  }
  textAlign(RIGHT, CENTER);
  for (let i = 1; i <= 5; i++) {
    text(i, originX - 5, originY - i * scale);
  }

  // Variable labels on axes
  fill('#1976D2');
  textSize(14);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('a', originX + aValue * scale / 2, originY + 18);
  textAlign(RIGHT, CENTER);
  text('b', originX - 18, originY - bValue * scale / 2);
  textStyle(NORMAL);
}

function drawRectangle() {
  let graphX = 50;
  let graphY = 60;
  let graphW = 340;
  let graphH = 340;
  let scale = min(graphW / 7, graphH / 6);
  let originX = graphX + 40;
  let originY = graphY + graphH - 40;

  // Calculate vertex positions
  let A = { x: originX, y: originY };
  let B = { x: originX + aValue * scale, y: originY };
  let C = { x: originX + aValue * scale, y: originY - bValue * scale };
  let D = { x: originX, y: originY - bValue * scale };

  // Rectangle sides
  stroke('#424242');
  strokeWeight(2);
  line(A.x, A.y, B.x, B.y);
  line(B.x, B.y, C.x, C.y);
  line(C.x, C.y, D.x, D.y);
  line(D.x, D.y, A.x, A.y);

  // Diagonals
  strokeWeight(2);
  // AC - red dashed
  stroke('#D32F2F');
  drawingContext.setLineDash([8, 4]);
  line(A.x, A.y, C.x, C.y);

  // BD - blue dashed
  stroke('#1976D2');
  line(B.x, B.y, D.x, D.y);
  drawingContext.setLineDash([]);

  // Right angle markers at corners
  noFill();
  stroke('#757575');
  strokeWeight(1);
  let corner = 10;
  // At A
  line(A.x + corner, A.y, A.x + corner, A.y - corner);
  line(A.x + corner, A.y - corner, A.x, A.y - corner);
  // At B
  line(B.x - corner, B.y, B.x - corner, B.y - corner);
  line(B.x - corner, B.y - corner, B.x, B.y - corner);
  // At C
  line(C.x - corner, C.y, C.x - corner, C.y + corner);
  line(C.x - corner, C.y + corner, C.x, C.y + corner);
  // At D
  line(D.x + corner, D.y, D.x + corner, D.y + corner);
  line(D.x + corner, D.y + corner, D.x, D.y + corner);

  // Vertices
  let vertices = [
    { pos: A, label: 'A', coord: '(0, 0)', color: '#D32F2F' },
    { pos: B, label: 'B', coord: '(a, 0)', color: '#1976D2' },
    { pos: C, label: 'C', coord: '(a, b)', color: '#388E3C' },
    { pos: D, label: 'D', coord: '(0, b)', color: '#7B1FA2' }
  ];

  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    let isHovered = (hoveredElement === i);

    // Point
    fill(v.color);
    noStroke();
    circle(v.pos.x, v.pos.y, isHovered ? 16 : 12);

    // Label
    textSize(isHovered ? 16 : 14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(v.color);
    let offsetX = (v.label === 'A' || v.label === 'D') ? -15 : 15;
    let offsetY = (v.label === 'A' || v.label === 'B') ? 15 : -15;
    text(v.label, v.pos.x + offsetX, v.pos.y + offsetY);
    textStyle(NORMAL);

    // Coordinate tooltip on hover
    if (isHovered) {
      fill('#424242');
      textSize(12);
      text(v.coord, v.pos.x + offsetX, v.pos.y + offsetY + 18);
    }
  }
}

function drawFormulas() {
  let fx = 430;
  let fy = 70;
  let fw = 200;
  let fh = 80;

  // Calculate actual diagonal length
  let diagLength = sqrt(aValue * aValue + bValue * bValue);

  // Box 1: Why this placement
  fill(hoveredElement === 4 ? '#FFF9C4' : '#FFFDE7');
  stroke('#FBC02D');
  strokeWeight(2);
  rect(fx, fy, fw + 180, 40, 8);

  noStroke();
  fill('#F57F17');
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('WHY this placement?', fx + 10, fy + 12);
  textStyle(NORMAL);
  fill('#424242');
  textSize(9);
  text('• Origin at vertex → (0,0) coordinates', fx + 10, fy + 28);

  // Box 2: Calculate AC
  fy = 120;
  fill(hoveredElement === 4 ? '#FFCDD2' : '#FFEBEE');
  stroke('#D32F2F');
  strokeWeight(2);
  rect(fx, fy, fw + 180, fh, 8);

  noStroke();
  fill('#C62828');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Diagonal AC (red):', fx + 10, fy + 8);
  textStyle(NORMAL);

  fill('#212121');
  textSize(11);
  text('AC = √[(a-0)² + (b-0)²]', fx + 10, fy + 28);
  text('AC = √[a² + b²]', fx + 10, fy + 45);

  fill('#C62828');
  textStyle(BOLD);
  text('AC = √[' + aValue.toFixed(1) + '² + ' + bValue.toFixed(1) + '²] = ' + diagLength.toFixed(2), fx + 10, fy + 62);
  textStyle(NORMAL);

  // Box 3: Calculate BD
  fy = 220;
  fill(hoveredElement === 5 ? '#BBDEFB' : '#E3F2FD');
  stroke('#1976D2');
  strokeWeight(2);
  rect(fx, fy, fw + 180, fh, 8);

  noStroke();
  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Diagonal BD (blue):', fx + 10, fy + 8);
  textStyle(NORMAL);

  fill('#212121');
  textSize(11);
  text('BD = √[(0-a)² + (b-0)²]', fx + 10, fy + 28);
  text('BD = √[(-a)² + b²] = √[a² + b²]', fx + 10, fy + 45);

  fill('#1565C0');
  textStyle(BOLD);
  text('BD = √[' + aValue.toFixed(1) + '² + ' + bValue.toFixed(1) + '²] = ' + diagLength.toFixed(2), fx + 10, fy + 62);
  textStyle(NORMAL);

  // Box 4: Conclusion
  fy = 320;
  fill(hoveredElement === 6 ? '#C8E6C9' : '#E8F5E9');
  stroke('#43A047');
  strokeWeight(3);
  rect(fx, fy, fw + 180, 90, 8);

  noStroke();
  fill('#2E7D32');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Conclusion:', fx + 10, fy + 10);
  textStyle(NORMAL);

  fill('#212121');
  textSize(12);
  text('Since AC = BD = √[a² + b²]', fx + 10, fy + 32);

  fill('#1B5E20');
  textSize(14);
  textStyle(BOLD);
  text('AC ≅ BD', fx + 10, fy + 52);
  textStyle(NORMAL);

  fill('#2E7D32');
  textSize(12);
  text('Diagonals are CONGRUENT! ✓', fx + 10, fy + 72);

  // Key insight box
  fy = 420;
  fill('#F3E5F5');
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(fx, fy, fw + 180, 50, 8);

  noStroke();
  fill('#6A1B9A');
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Key Insight:', fx + 10, fy + 8);
  textStyle(NORMAL);
  fill('#424242');
  textSize(10);
  text('Using variables a and b proves this for', fx + 10, fy + 24);
  text('ALL rectangles, not just specific numbers!', fx + 10, fy + 36);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  aSlider.position(canvasWidth / 2 - 100, drawHeight + 30);
  bSlider.position(canvasWidth / 2 + 80, drawHeight + 30);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 700);
  }
}
