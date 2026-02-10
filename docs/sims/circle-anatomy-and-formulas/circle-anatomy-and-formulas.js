// Circle Anatomy and Formulas - Static Diagram
// Shows circle components (radius, diameter, center, circumference) with formulas

let canvasWidth = 710;
let drawHeight = 450;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    noLoop();
}

function draw() {
    // Drawing region background
    fill(240, 248, 255);
    stroke(192, 192, 192);
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Title
    noStroke();
    fill(0);
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Circle Anatomy and Formulas', canvasWidth / 2, 12);
    textStyle(NORMAL);

    let cx = canvasWidth * 0.38;
    let cy = 250;
    let r = 140;

    drawMainCircle(cx, cy, r);
    drawDiameter(cx, cy, r);
    drawRadius(cx, cy, r);
    drawCenter(cx, cy);
    drawCircumferenceArrows(cx, cy, r);
    drawFormulaBox();
    drawPiBox();
}

function drawMainCircle(cx, cy, r) {
    // Semi-transparent cyan fill
    fill(77, 208, 225, 64);
    stroke(13, 71, 161);
    strokeWeight(4);
    ellipse(cx, cy, r * 2, r * 2);
}

function drawDiameter(cx, cy, r) {
    // Green dashed line across full circle through center
    stroke(46, 125, 50);
    strokeWeight(3);
    drawingContext.setLineDash([10, 6]);
    line(cx - r, cy, cx + r, cy);
    drawingContext.setLineDash([]);

    // Label "diameter (d)" in green above the line
    noStroke();
    fill(46, 125, 50);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('diameter (d)', cx, cy - 8);
    textStyle(NORMAL);
}

function drawRadius(cx, cy, r) {
    // Red line from center to right edge at an angle (upper-right)
    let angle = -PI / 4;
    let rx = cx + r * cos(angle);
    let ry = cy + r * sin(angle);

    stroke(211, 47, 47);
    strokeWeight(3);
    drawingContext.setLineDash([]);
    line(cx, cy, rx, ry);

    // Label "radius (r)" in red along the line
    noStroke();
    fill(211, 47, 47);
    textSize(16);
    textStyle(BOLD);
    push();
    let midX = (cx + rx) / 2;
    let midY = (cy + ry) / 2;
    translate(midX, midY);
    rotate(angle);
    textAlign(CENTER, BOTTOM);
    text('radius (r)', 0, -6);
    pop();
    textStyle(NORMAL);
}

function drawCenter(cx, cy) {
    // Navy dot at center
    noStroke();
    fill(13, 71, 161);
    ellipse(cx, cy, 10, 10);

    // Label "Center"
    fill(13, 71, 161);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Center', cx, cy + 10);
    textStyle(NORMAL);
}

function drawCircumferenceArrows(cx, cy, r) {
    // Draw small orange curved arrows around the top-right of the circle
    stroke(255, 152, 0);
    strokeWeight(3);
    noFill();

    // Arc segment on the top-right
    let arcStart = -PI * 0.85;
    let arcEnd = -PI * 0.55;
    arc(cx, cy, r * 2 + 16, r * 2 + 16, arcStart, arcEnd);

    // Arrowhead at the end of the arc
    let arrowAngle = arcEnd;
    let arrowX = cx + (r + 8) * cos(arrowAngle);
    let arrowY = cy + (r + 8) * sin(arrowAngle);
    let tangent = arrowAngle + PI / 2;

    fill(255, 152, 0);
    noStroke();
    push();
    translate(arrowX, arrowY);
    rotate(tangent);
    triangle(0, -5, 0, 5, 10, 0);
    pop();

    // Second arc segment on the top-left
    stroke(255, 152, 0);
    strokeWeight(3);
    noFill();
    let arcStart2 = -PI * 0.45;
    let arcEnd2 = -PI * 0.15;
    arc(cx, cy, r * 2 + 16, r * 2 + 16, arcStart2, arcEnd2);

    // Arrowhead at the end of second arc
    let arrowAngle2 = arcEnd2;
    let arrowX2 = cx + (r + 8) * cos(arrowAngle2);
    let arrowY2 = cy + (r + 8) * sin(arrowAngle2);
    let tangent2 = arrowAngle2 + PI / 2;

    fill(255, 152, 0);
    noStroke();
    push();
    translate(arrowX2, arrowY2);
    rotate(tangent2);
    triangle(0, -5, 0, 5, 10, 0);
    pop();

    // Label "Circumference (C)" in orange outside the circle
    noStroke();
    fill(255, 152, 0);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    let labelAngle = -PI * 0.5;
    let labelR = r + 35;
    text('Circumference (C)', cx, cy - r - 22);
    textStyle(NORMAL);
}

function drawFormulaBox() {
    let boxX = canvasWidth - 230;
    let boxY = 80;
    let boxW = 200;
    let boxH = 185;

    // Light yellow rounded rect with border
    fill(255, 249, 196);
    stroke(180, 170, 100);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 12);

    // Title
    noStroke();
    fill(50);
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Circle Formulas', boxX + boxW / 2, boxY + 12);

    // Horizontal separator
    stroke(180, 170, 100);
    strokeWeight(1);
    line(boxX + 15, boxY + 40, boxX + boxW - 15, boxY + 40);

    // Formulas
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    let formulaX = boxX + 22;
    let yStart = boxY + 52;
    let lineH = 32;

    // C = πd (orange)
    fill(230, 126, 0);
    text('C = πd', formulaX, yStart);

    // C = 2πr (orange)
    fill(230, 126, 0);
    text('C = 2πr', formulaX, yStart + lineH);

    // A = πr² (blue)
    fill(25, 118, 210);
    text('A = πr²', formulaX, yStart + lineH * 2);

    // d = 2r (green)
    fill(46, 125, 50);
    text('d = 2r', formulaX, yStart + lineH * 3);

    textStyle(NORMAL);
}

function drawPiBox() {
    let boxX = 30;
    let boxY = 380;
    let boxW = 190;
    let boxH = 58;

    // Light purple rounded rect
    fill(243, 229, 245);
    stroke(170, 140, 190);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 10);

    noStroke();

    // Large pi symbol
    fill(126, 44, 171);
    textSize(28);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('π', boxX + 14, boxY + boxH / 2 - 2);

    // Pi approximation
    fill(100, 60, 130);
    textSize(14);
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    text('π ≈ 3.14159...', boxX + 48, boxY + boxH / 2 - 2);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
