// Collinear and Coplanar Points Diagram
// Shows examples and non-examples of collinear and coplanar points

let canvasWidth = 600;
let canvasHeight = 600;
let containerWidth = canvasWidth;
let containerHeight = canvasHeight;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  describe('Four-panel diagram showing examples and non-examples of collinear and coplanar points for geometry education', LABEL);

  textFont('Arial');
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Draw 2x2 grid
  let panelWidth = width / 2;
  let panelHeight = height / 2;

  // Panel 1: Collinear Points (Top Left)
  drawCollinearPanel(0, 0, panelWidth, panelHeight);

  // Panel 2: Non-Collinear Points (Top Right)
  drawNonCollinearPanel(panelWidth, 0, panelWidth, panelHeight);

  // Panel 3: Coplanar Points (Bottom Left)
  drawCoplanarPanel(0, panelHeight, panelWidth, panelHeight);

  // Panel 4: Non-Coplanar Points (Bottom Right)
  drawNonCoplanarPanel(panelWidth, panelHeight, panelWidth, panelHeight);
}

function drawCollinearPanel(x, y, w, h) {
  // Background
  fill('#E8F5E9');
  rect(x, y, w, h);

  // Title - responsive font size
  fill(0);
  textSize(min(w, h) * 0.067); // Scales with panel size
  textAlign(CENTER, TOP);
  text('Collinear Points ✓', x + w/2, y + h * 0.05);

  // Draw line
  stroke('#2196F3');
  strokeWeight(max(1, w * 0.004));
  let lineY = y + h/2;
  let margin = w * 0.11;
  line(x + margin, lineY, x + w - margin, lineY);

  // Draw points on the line
  let points = ['A', 'B', 'C', 'D'];
  let spacing = (w - 2 * margin) / (points.length - 1);

  fill('#F44336');
  noStroke();
  for (let i = 0; i < points.length; i++) {
    let px = x + margin + i * spacing;
    circle(px, lineY, w * 0.018);

    // Label
    fill(0);
    textSize(min(w, h) * 0.053);
    textAlign(CENTER, BOTTOM);
    text(points[i], px, lineY - h * 0.033);
    fill('#F44336');
  }

  // Annotation
  fill(0);
  textSize(min(w, h) * 0.047);
  textAlign(CENTER);
  text('All points lie on the same line', x + w/2, y + h - h * 0.2);

  // Bottom text
  textSize(min(w, h) * 0.053);
  textStyle(BOLD);
  text('Points A, B, C, D are collinear', x + w/2, y + h - h * 0.083);
  textStyle(NORMAL);
}

function drawNonCollinearPanel(x, y, w, h) {
  // Background
  fill('#FFEBEE');
  rect(x, y, w, h);

  // Title
  fill(0);
  textSize(min(w, h) * 0.067);
  textAlign(CENTER, TOP);
  text('Non-Collinear Points ✗', x + w/2, y + h * 0.05);

  // Define triangle points - responsive positioning
  let px = x + w/2;
  let py = y + h/2 - h * 0.133;
  let qx = x + w/2 - w * 0.156;
  let qy = y + h/2 + h * 0.167;
  let rx = x + w/2 + w * 0.156;
  let ry = y + h/2 + h * 0.167;

  // Draw dashed lines forming triangle
  stroke('#9E9E9E');
  strokeWeight(max(1, w * 0.004));
  drawingContext.setLineDash([5, 5]);
  line(px, py, qx, qy);
  line(qx, qy, rx, ry);
  line(rx, ry, px, py);
  drawingContext.setLineDash([]);

  // Draw points
  fill('#F44336');
  noStroke();
  circle(px, py, w * 0.018);
  circle(qx, qy, w * 0.018);
  circle(rx, ry, w * 0.018);

  // Labels
  fill(0);
  textSize(min(w, h) * 0.053);
  textAlign(CENTER);
  text('P', px, py - h * 0.05);
  text('Q', qx - w * 0.033, qy + h * 0.017);
  text('R', rx + w * 0.033, ry + h * 0.017);

  // Annotation
  textSize(min(w, h) * 0.047);
  text('Points do not all lie on same line', x + w/2, y + h - h * 0.2);

  // Bottom text
  textSize(min(w, h) * 0.053);
  textStyle(BOLD);
  text('Points P, Q, R are NOT collinear', x + w/2, y + h - h * 0.083);
  textStyle(NORMAL);
}

function drawCoplanarPanel(x, y, w, h) {
  // Background
  fill('#E3F2FD');
  rect(x, y, w, h);

  // Title
  fill(0);
  textSize(min(w, h) * 0.067);
  textAlign(CENTER, TOP);
  text('Coplanar Points ✓', x + w/2, y + h * 0.05);

  // Draw parallelogram representing plane - responsive positioning
  let px1 = x + w * 0.178, py1 = y + h * 0.267;
  let px2 = x + w - w * 0.178, py2 = y + h * 0.267;
  let px3 = x + w - w * 0.222, py3 = y + h - h * 0.333;
  let px4 = x + w * 0.133, py4 = y + h - h * 0.333;

  // Draw grid on plane
  push();
  fill(138, 43, 226, 40); // Semi-transparent purple
  noStroke();
  quad(px1, py1, px2, py2, px3, py3, px4, py4);

  // Draw grid lines
  stroke(138, 43, 226, 80);
  strokeWeight(1);
  for (let i = 0; i <= 4; i++) {
    let t = i / 4;
    let x1 = lerp(px1, px4, t);
    let y1 = lerp(py1, py4, t);
    let x2 = lerp(px2, px3, t);
    let y2 = lerp(py2, py3, t);
    line(x1, y1, x2, y2);

    x1 = lerp(px1, px2, t);
    y1 = lerp(py1, py2, t);
    x2 = lerp(px4, px3, t);
    y2 = lerp(py4, py3, t);
    line(x1, y1, x2, y2);
  }
  pop();

  // Draw points on the plane - responsive positioning
  let pointData = [
    { label: 'W', x: x + w * 0.267, y: y + h * 0.333 },
    { label: 'X', x: x + w - w * 0.333, y: y + h * 0.4 },
    { label: 'Y', x: x + w * 0.4, y: y + h - h * 0.4 },
    { label: 'Z', x: x + w - w * 0.267, y: y + h - h * 0.467 },
    { label: 'V', x: x + w/2, y: y + h/2 }
  ];

  fill('#2196F3');
  noStroke();
  for (let pt of pointData) {
    circle(pt.x, pt.y, w * 0.018);
    fill(0);
    textSize(min(w, h) * 0.053);
    textAlign(CENTER, BOTTOM);
    text(pt.label, pt.x, pt.y - h * 0.033);
    fill('#2196F3');
  }

  // Annotation
  fill(0);
  textSize(min(w, h) * 0.047);
  textAlign(CENTER);
  text('All points lie on the same plane', x + w/2, y + h - h * 0.2);

  // Bottom text
  textSize(min(w, h) * 0.053);
  textStyle(BOLD);
  text('Points W, X, Y, Z, V are coplanar', x + w/2, y + h - h * 0.083);
  textStyle(NORMAL);
}

function drawNonCoplanarPanel(x, y, w, h) {
  // Background
  fill('#FFF3E0');
  rect(x, y, w, h);

  // Title
  fill(0);
  textSize(min(w, h) * 0.067);
  textAlign(CENTER, TOP);
  text('Non-Coplanar Points ✗', x + w/2, y + h * 0.05);

  // Draw 3D perspective plane - responsive positioning
  let px1 = x + w * 0.222, py1 = y + h/2 + h * 0.067;
  let px2 = x + w - w * 0.222, py2 = y + h/2 + h * 0.067;
  let px3 = x + w - w * 0.267, py3 = y + h - h * 0.267;
  let px4 = x + w * 0.178, py4 = y + h - h * 0.267;

  // Draw grid on plane
  push();
  fill(33, 150, 243, 40); // Semi-transparent blue
  noStroke();
  quad(px1, py1, px2, py2, px3, py3, px4, py4);

  // Draw grid lines
  stroke(33, 150, 243, 80);
  strokeWeight(1);
  for (let i = 0; i <= 3; i++) {
    let t = i / 3;
    let x1 = lerp(px1, px4, t);
    let y1 = lerp(py1, py4, t);
    let x2 = lerp(px2, px3, t);
    let y2 = lerp(py2, py3, t);
    line(x1, y1, x2, y2);

    x1 = lerp(px1, px2, t);
    y1 = lerp(py1, py2, t);
    x2 = lerp(px4, px3, t);
    y2 = lerp(py4, py3, t);
    line(x1, y1, x2, y2);
  }
  pop();

  // Points on plane - responsive positioning
  let mx = x + w * 0.289, my = y + h/2 + h * 0.133;
  let nx = x + w - w * 0.333, ny = y + h/2 + h * 0.1;
  let ox = x + w/2, oy = y + h - h * 0.333;

  // Point above plane
  let ppx = x + w/2 - w * 0.067, ppy = y + h * 0.333;

  // Draw dashed line from P to plane
  stroke('#9E9E9E');
  strokeWeight(max(1, w * 0.004));
  drawingContext.setLineDash([5, 5]);
  line(ppx, ppy, ppx, my + h * 0.1);
  drawingContext.setLineDash([]);

  // Draw points on plane
  fill('#2196F3');
  noStroke();
  circle(mx, my, w * 0.018);
  circle(nx, ny, w * 0.018);
  circle(ox, oy, w * 0.018);

  // Draw point above plane
  circle(ppx, ppy, w * 0.018);

  // Labels
  fill(0);
  textSize(min(w, h) * 0.053);
  textAlign(CENTER);
  text('M', mx - w * 0.033, my);
  text('N', nx + w * 0.033, ny);
  text('O', ox, oy + h * 0.067);
  text('P', ppx, ppy - h * 0.05);

  // Annotation
  textSize(min(w, h) * 0.047);
  text('Point P is not on the same plane as M, N, O', x + w/2, y + h - h * 0.2);

  // Bottom text
  textSize(min(w, h) * 0.053);
  textStyle(BOLD);
  text('Points M, N, O, P are NOT coplanar', x + w/2, y + h - h * 0.083);
  textStyle(NORMAL);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    const rect = container.getBoundingClientRect();
    containerWidth = Math.floor(rect.width);
    canvasWidth = containerWidth;
    // we are fixed height
    // containerHeight = Math.floor(containerWidth * 2 / 3);
    // canvasHeight = containerHeight;
  }
}