// Coordinate Proof Setup: Rectangle Diagonals Are Congruent
// Static diagram showing strategic placement of a rectangle on coordinate plane
// with labeled vertices, diagonals, and proof formulas

let canvasWidth = 750;
let canvasHeight = 450;

// Coordinate plane layout
let planeX = 20;
let planeY = 50;
let planeW = 380;
let planeH = 370;

// Notes panel layout
let notesX = 420;
let notesY = 50;
let notesW = 310;

// Rectangle parameters (in grid units)
let a = 5;
let b = 4;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  noLoop();
  describe('Diagram showing coordinate proof that rectangle diagonals are congruent, with labeled vertices and distance formulas', LABEL);
}

function draw() {
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Coordinate Proof: Rectangle Diagonals Are Congruent', canvasWidth / 2, 10);
  textStyle(NORMAL);

  drawCoordinatePlane();
  drawRectangleWithDiagonals();
  drawNotesPanel();
}

function drawCoordinatePlane() {
  // Plane background
  fill(255);
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(planeX, planeY, planeW, planeH, 6);

  let originX = planeX + 50;
  let originY = planeY + planeH - 40;
  let gridStep = 45;

  // Grid lines
  stroke('#ECECEC');
  strokeWeight(1);
  for (let i = 0; i <= 7; i++) {
    let gx = originX + i * gridStep;
    if (gx <= planeX + planeW - 5) {
      line(gx, planeY + 10, gx, originY + 5);
    }
  }
  for (let i = 0; i <= 6; i++) {
    let gy = originY - i * gridStep;
    if (gy >= planeY + 5) {
      line(originX - 5, gy, planeX + planeW - 10, gy);
    }
  }

  // Axes
  stroke('#424242');
  strokeWeight(2);
  // X-axis
  line(originX - 15, originY, planeX + planeW - 10, originY);
  // Arrow on x-axis
  let xEnd = planeX + planeW - 10;
  line(xEnd - 6, originY - 4, xEnd, originY);
  line(xEnd - 6, originY + 4, xEnd, originY);
  // Y-axis
  line(originX, originY + 15, originX, planeY + 10);
  // Arrow on y-axis
  let yEnd = planeY + 10;
  line(originX - 4, yEnd + 6, originX, yEnd);
  line(originX + 4, yEnd + 6, originX, yEnd);

  // Axis labels
  noStroke();
  fill('#424242');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('x', xEnd - 2, originY + 6);
  textAlign(RIGHT, CENTER);
  text('y', originX - 10, yEnd + 5);
  textStyle(NORMAL);

  // Origin label
  fill('#757575');
  textSize(11);
  textAlign(RIGHT, TOP);
  text('O', originX - 6, originY + 4);

  // Variable markers on axes
  fill('#1976D2');
  textSize(13);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('a', originX + a * gridStep, originY + 8);
  textAlign(RIGHT, CENTER);
  text('b', originX - 10, originY - b * gridStep);
  textStyle(NORMAL);
}

function drawRectangleWithDiagonals() {
  let originX = planeX + 50;
  let originY = planeY + planeH - 40;
  let gridStep = 45;

  // Vertex positions
  let A = { x: originX, y: originY };
  let B = { x: originX + a * gridStep, y: originY };
  let C = { x: originX + a * gridStep, y: originY - b * gridStep };
  let D = { x: originX, y: originY - b * gridStep };

  // Fill rectangle with very light gray
  fill(248, 248, 248, 80);
  stroke('#424242');
  strokeWeight(2);
  beginShape();
  vertex(A.x, A.y);
  vertex(B.x, B.y);
  vertex(C.x, C.y);
  vertex(D.x, D.y);
  endShape(CLOSE);

  // Diagonals
  strokeWeight(2);
  // AC - red dashed
  stroke('#D32F2F');
  drawingContext.setLineDash([8, 5]);
  line(A.x, A.y, C.x, C.y);
  // BD - blue dashed
  stroke('#1976D2');
  line(B.x, B.y, D.x, D.y);
  drawingContext.setLineDash([]);

  // Center point M where diagonals cross
  let mx = (A.x + C.x) / 2;
  let my = (A.y + C.y) / 2;
  fill('#FF6F00');
  noStroke();
  circle(mx, my, 8);
  fill('#E65100');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('M', mx + 6, my - 2);
  textStyle(NORMAL);

  // Right angle markers at each vertex
  noFill();
  stroke('#757575');
  strokeWeight(1);
  let cs = 10; // corner size

  // At A (bottom-left)
  line(A.x + cs, A.y, A.x + cs, A.y - cs);
  line(A.x + cs, A.y - cs, A.x, A.y - cs);
  // At B (bottom-right)
  line(B.x - cs, B.y, B.x - cs, B.y - cs);
  line(B.x - cs, B.y - cs, B.x, B.y - cs);
  // At C (top-right)
  line(C.x - cs, C.y, C.x - cs, C.y + cs);
  line(C.x - cs, C.y + cs, C.x, C.y + cs);
  // At D (top-left)
  line(D.x + cs, D.y, D.x + cs, D.y + cs);
  line(D.x + cs, D.y + cs, D.x, D.y + cs);

  // Vertex points and labels
  let vertices = [
    { pos: A, label: 'A', coord: '(0, 0)', color: '#D32F2F',
      labelOx: -16, labelOy: 14, coordOx: -16, coordOy: 28 },
    { pos: B, label: 'B', coord: '(a, 0)', color: '#1976D2',
      labelOx: 12, labelOy: 14, coordOx: 12, coordOy: 28 },
    { pos: C, label: 'C', coord: '(a, b)', color: '#388E3C',
      labelOx: 12, labelOy: -12, coordOx: 12, coordOy: -24 },
    { pos: D, label: 'D', coord: '(0, b)', color: '#7B1FA2',
      labelOx: -16, labelOy: -12, coordOx: -16, coordOy: -24 }
  ];

  for (let v of vertices) {
    // Dot
    fill(v.color);
    noStroke();
    circle(v.pos.x, v.pos.y, 12);

    // Label
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(v.label, v.pos.x + v.labelOx, v.pos.y + v.labelOy);

    // Coordinate
    textSize(10);
    textStyle(NORMAL);
    fill('#616161');
    text(v.coord, v.pos.x + v.coordOx, v.pos.y + v.coordOy);
  }

  // Diagonal labels along the diagonals
  push();
  noStroke();
  fill('#D32F2F');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // AC label near middle, offset up-right
  text('AC', mx + 14, my - 14);
  fill('#1976D2');
  // BD label near middle, offset down-right
  text('BD', mx + 14, my + 16);
  textStyle(NORMAL);
  pop();
}

function drawNotesPanel() {
  let x = notesX;
  let y = notesY;
  let w = notesW;

  // Box 1: WHY This Placement?
  let boxH = 82;
  fill('#FFF9C4');
  stroke('#FBC02D');
  strokeWeight(2);
  rect(x, y, w, boxH, 6);

  noStroke();
  fill('#F57F17');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('WHY This Placement?', x + 10, y + 8);
  textStyle(NORMAL);

  fill('#424242');
  textSize(10);
  let lineH = 15;
  let ty = y + 28;
  text('Origin at vertex -> simpler coordinates (0,0)', x + 12, ty);
  text('Sides along axes -> right angles guaranteed', x + 12, ty + lineH);
  text('Variables a and b -> proves for ALL rectangles', x + 12, ty + lineH * 2);

  // Box 2: Calculate AC
  y += boxH + 10;
  boxH = 72;
  fill('#FFEBEE');
  stroke('#D32F2F');
  strokeWeight(2);
  rect(x, y, w, boxH, 6);

  noStroke();
  fill('#C62828');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Calculate AC', x + 10, y + 8);
  textStyle(NORMAL);

  fill('#212121');
  textSize(11);
  text('AC = \u221A((a\u20130)\u00B2 + (b\u20130)\u00B2)', x + 12, y + 28);

  fill('#C62828');
  textStyle(BOLD);
  textSize(12);
  text('AC = \u221A(a\u00B2 + b\u00B2)', x + 12, y + 48);
  textStyle(NORMAL);

  // Box 3: Calculate BD
  y += boxH + 10;
  boxH = 72;
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(2);
  rect(x, y, w, boxH, 6);

  noStroke();
  fill('#1565C0');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Calculate BD', x + 10, y + 8);
  textStyle(NORMAL);

  fill('#212121');
  textSize(11);
  text('BD = \u221A((0\u2013a)\u00B2 + (b\u20130)\u00B2)', x + 12, y + 28);

  fill('#1565C0');
  textStyle(BOLD);
  textSize(12);
  text('BD = \u221A(a\u00B2 + b\u00B2)', x + 12, y + 48);
  textStyle(NORMAL);

  // Box 4: Conclusion
  y += boxH + 10;
  boxH = 72;
  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(3);
  rect(x, y, w, boxH, 6);

  noStroke();
  fill('#2E7D32');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Conclusion', x + 10, y + 8);
  textStyle(NORMAL);

  fill('#212121');
  textSize(12);
  text('Since AC = BD = \u221A(a\u00B2 + b\u00B2)', x + 12, y + 30);

  fill('#1B5E20');
  textSize(14);
  textStyle(BOLD);
  text('Diagonals are congruent! \u2713', x + 12, y + 50);
  textStyle(NORMAL);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 750);
    canvasWidth = max(canvasWidth, 600);
  }
}
