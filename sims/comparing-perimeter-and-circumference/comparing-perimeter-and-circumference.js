// Comparing Perimeter and Circumference
// Static diagram showing how polygon perimeters approach circle circumference

let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

let r = 130; // radius for all shapes

// Shape definitions
let shapes = [
  { name: "Hexagon",    n: 6,  color: "#F44336", fillAlpha: 51,  strokeW: 3 },
  { name: "Octagon",    n: 8,  color: "#FF9800", fillAlpha: 38,  strokeW: 3 },
  { name: "Dodecagon",  n: 12, color: "#4CAF50", fillAlpha: 26,  strokeW: 3 },
  { name: "Circle",     n: -1, color: "#2196F3", fillAlpha: 13,  strokeW: 4 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Static diagram showing how regular polygon perimeters approach the circumference of a circle as the number of sides increases.', LABEL);
  noLoop();
}

function draw() {
  // Drawing region background
  background(240, 248, 255);
  stroke(192);
  strokeWeight(1);
  noFill();
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);

  let cx = canvasWidth * 0.35;
  let cy = 260;

  // Title
  noStroke();
  fill(30);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("How Polygons Approximate Circles", canvasWidth / 2, 16);
  textStyle(NORMAL);

  // Draw shapes from largest sides to smallest so they layer nicely
  // Circle first (back), then dodecagon, octagon, hexagon (front)
  drawCircleShape(cx, cy);
  drawRegularPolygon(cx, cy, 12, shapes[2]);
  drawRegularPolygon(cx, cy, 8,  shapes[1]);
  drawRegularPolygon(cx, cy, 6,  shapes[0]);

  // Draw dashed radius line
  drawRadiusLine(cx, cy);

  // Draw measurement table on the right
  drawMeasurementTable();

  // Draw insight box at bottom
  drawInsightBox();
}

function drawRegularPolygon(cx, cy, n, shapeData) {
  let c = color(shapeData.color);
  // Fill with alpha
  fill(red(c), green(c), blue(c), shapeData.fillAlpha);
  stroke(shapeData.color);
  strokeWeight(shapeData.strokeW);

  beginShape();
  for (let i = 0; i < n; i++) {
    let angle = TWO_PI * i / n - HALF_PI; // start from top
    let px = cx + r * cos(angle);
    let py = cy + r * sin(angle);
    vertex(px, py);
  }
  endShape(CLOSE);
}

function drawCircleShape(cx, cy) {
  let c = color(shapes[3].color);
  fill(red(c), green(c), blue(c), shapes[3].fillAlpha);
  stroke(shapes[3].color);
  strokeWeight(shapes[3].strokeW);
  ellipse(cx, cy, r * 2, r * 2);
}

function drawRadiusLine(cx, cy) {
  // Dashed line from center to the right
  stroke(120);
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  line(cx, cy, cx + r + 10, cy);
  drawingContext.setLineDash([]);

  // Center dot
  fill(80);
  noStroke();
  ellipse(cx, cy, 6, 6);

  // Label
  noStroke();
  fill(80);
  textSize(16);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text("r = " + r, cx + r / 2, cy - 8);
  textStyle(NORMAL);
}

function drawMeasurementTable() {
  let tableX = canvasWidth - 300;
  let tableY = 60;
  let tableW = 270;
  let tableH = 310;

  // White rounded rectangle background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(tableX, tableY, tableW, tableH, 12);

  // Title
  noStroke();
  fill(30);
  textSize(17);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Perimeter Comparison", tableX + tableW / 2, tableY + 14);
  textStyle(NORMAL);

  // Divider
  stroke(220);
  strokeWeight(1);
  line(tableX + 15, tableY + 42, tableX + tableW - 15, tableY + 42);

  // Column headers
  noStroke();
  fill(100);
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Shape (n)", tableX + 35, tableY + 50);
  textAlign(RIGHT, TOP);
  text("Perimeter", tableX + tableW - 20, tableY + 50);
  textStyle(NORMAL);

  // Divider
  stroke(230);
  line(tableX + 15, tableY + 72, tableX + tableW - 15, tableY + 72);

  // Rows
  let rowY = tableY + 84;
  let rowSpacing = 56;

  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    let yPos = rowY + i * rowSpacing;

    // Color bullet
    fill(s.color);
    noStroke();
    ellipse(tableX + 22, yPos + 8, 12, 12);

    // Shape name and sides
    fill(50);
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    if (s.n === -1) {
      text("Circle", tableX + 35, yPos);
    } else {
      text(s.name + " (" + s.n + ")", tableX + 35, yPos);
    }
    textStyle(NORMAL);

    // Formula line
    fill(100);
    textSize(13);
    textAlign(LEFT, TOP);
    let formulaStr;
    let valueStr;

    if (s.n === -1) {
      formulaStr = "C = 2\u03C0r";
      valueStr = nf(2 * PI * r, 1, 2);
    } else {
      let perim = s.n * 2 * r * sin(PI / s.n);
      formulaStr = "P = " + s.n + " \u00D7 2r\u00B7sin(\u03C0/" + s.n + ")";
      valueStr = nf(perim, 1, 2);
    }
    text(formulaStr, tableX + 35, yPos + 20);

    // Calculated value
    fill(s.color);
    textSize(16);
    textStyle(BOLD);
    textAlign(RIGHT, TOP);
    text("= " + valueStr, tableX + tableW - 20, yPos + 7);
    textStyle(NORMAL);
  }
}

function drawInsightBox() {
  let boxMargin = 20;
  let boxY = canvasHeight - 65;
  let boxW = canvasWidth - boxMargin * 2;
  let boxH = 50;

  // Light green background with green border
  fill(232, 245, 233); // #E8F5E9
  stroke(76, 175, 80);  // #4CAF50
  strokeWeight(2);
  rect(boxMargin, boxY, boxW, boxH, 8);

  // Lightbulb icon area
  noStroke();
  fill(76, 175, 80);
  textSize(20);
  textAlign(LEFT, CENTER);
  text("\u2728", boxMargin + 12, boxY + boxH / 2);

  // Insight text
  fill(33, 33, 33);
  textSize(16);
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
  text("As the number of sides increases, the polygon\u2019s perimeter approaches the circle\u2019s circumference.",
       boxMargin + 42, boxY + boxH / 2);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    canvasWidth = max(canvasWidth, 680);
  }
  canvasHeight = drawHeight + controlHeight;
}
