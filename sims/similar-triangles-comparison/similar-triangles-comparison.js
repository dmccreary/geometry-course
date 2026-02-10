// Similar Triangles Comparison MicroSim
// Shows two similar triangles with scale factor demonstration

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Triangle parameters
let scaleSlider;
let scaleFactor = 2;

// Original triangle (3-4-5)
let origA, origB, origC;
let origBase = 80;
let origHeight = 60;

// Colors
let bgColor;
let origColor, scaledColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(248, 250, 252);
    origColor = color(30, 136, 229);      // Blue
    scaledColor = color(255, 152, 0);     // Orange

    // Create slider
    scaleSlider = createSlider(0.5, 3.0, 2.0, 0.1);
    scaleSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    scaleSlider.size(200);
    scaleSlider.parent('canvas-container');

    textFont('Arial');
}

function draw() {
    background(bgColor);
    scaleFactor = scaleSlider.value();

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("Similar Triangles Comparison", canvasWidth/2, 12);

    // Calculate triangle vertices
    let margin = 80;
    let origCenterX = canvasWidth/4;
    let scaledCenterX = 3 * canvasWidth/4;
    let centerY = drawHeight/2 + 30;

    // Draw original triangle (left)
    drawTriangle(origCenterX, centerY, origBase, origHeight, origColor, "△ABC", true);

    // Draw scaled triangle (right)
    let scaledBase = origBase * scaleFactor;
    let scaledHeight = origHeight * scaleFactor;
    drawTriangle(scaledCenterX, centerY, scaledBase, scaledHeight, scaledColor, "△DEF", false);

    // Draw info panel
    drawInfoPanel();

    // Draw controls label
    fill(60);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Scale Factor: k = " + scaleFactor.toFixed(1), canvasWidth/2, drawHeight + 35);

    // Draw ratio comparison
    drawRatioComparison();
}

function drawTriangle(cx, cy, base, h, col, label, isOriginal) {
    // Triangle vertices
    let ax = cx - base/2;
    let ay = cy + h/3;
    let bx = cx + base/2;
    let by = cy + h/3;
    let cx2 = cx;
    let cy2 = cy - 2*h/3;

    // Calculate hypotenuse
    let hyp = sqrt(sq(base/2) + sq(h));

    // Draw triangle
    fill(red(col), green(col), blue(col), 80);
    stroke(col);
    strokeWeight(3);
    beginShape();
    vertex(ax, ay);
    vertex(bx, by);
    vertex(cx2, cy2);
    endShape(CLOSE);

    // Draw right angle marker
    let markerSize = 12;
    stroke(col);
    strokeWeight(2);
    noFill();
    rect(ax, ay - markerSize, markerSize, markerSize);

    // Label vertices
    fill(col);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);

    if (isOriginal) {
        text("A", ax - 15, ay + 10);
        text("B", bx + 15, by + 10);
        text("C", cx2, cy2 - 15);
    } else {
        text("D", ax - 15, ay + 10);
        text("E", bx + 15, by + 10);
        text("F", cx2, cy2 - 15);
    }

    // Side labels
    textSize(12);
    fill(60);

    // Base (bottom)
    let baseLabel = isOriginal ? origBase : (origBase * scaleFactor);
    text(baseLabel.toFixed(0), cx, ay + 20);

    // Height (left side approximation)
    let heightLabel = isOriginal ? origHeight : (origHeight * scaleFactor);
    push();
    translate(ax - 25, cy);
    rotate(-HALF_PI);
    text(heightLabel.toFixed(0), 0, 0);
    pop();

    // Hypotenuse
    let hypLabel = isOriginal ? sqrt(sq(origBase/2) + sq(origHeight)) * 2 : sqrt(sq(origBase/2) + sq(origHeight)) * 2 * scaleFactor;
    let midHypX = (bx + cx2) / 2 + 15;
    let midHypY = (by + cy2) / 2;
    text(hypLabel.toFixed(0), midHypX, midHypY);

    // Triangle label
    fill(col);
    textSize(16);
    text(label, cx, ay + 45);

    // Angle markers (matching colors)
    drawAngleMarkers(ax, ay, bx, by, cx2, cy2, col, isOriginal);
}

function drawAngleMarkers(ax, ay, bx, by, cx, cy, col, isOriginal) {
    // Draw colored angle arcs to show corresponding angles
    let arcRadius = 20;

    // Angle at A (right angle) - already drawn with square

    // Angle at B (bottom right)
    let angleB = atan2(cy - by, cx - bx) - atan2(ay - by, ax - bx);
    stroke(255, 87, 34); // Red
    strokeWeight(2);
    noFill();
    arc(bx, by, arcRadius * 2, arcRadius * 2, PI + atan2(cy - by, cx - bx), PI);

    // Angle at C (top)
    stroke(76, 175, 80); // Green
    arc(cx, cy, arcRadius * 2, arcRadius * 2, HALF_PI - 0.3, HALF_PI + 0.3 + PI/4);
}

function drawInfoPanel() {
    let panelX = 20;
    let panelY = 50;
    let panelW = 180;
    let panelH = 120;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text("Scale Factor: k = " + scaleFactor.toFixed(1), panelX + 10, panelY + 10);

    textSize(11);
    fill(80);
    let y = panelY + 35;
    text("Original sides: " + origBase + ", " + origHeight, panelX + 10, y);
    y += 18;
    text("Scaled sides:", panelX + 10, y);
    y += 16;
    fill(scaledColor);
    text("  " + (origBase * scaleFactor).toFixed(0) + ", " + (origHeight * scaleFactor).toFixed(0), panelX + 10, y);
    y += 20;
    fill(80);
    text("Area ratio: k² = " + sq(scaleFactor).toFixed(2), panelX + 10, y);
}

function drawRatioComparison() {
    let y = drawHeight - 30;

    fill(60);
    textSize(12);
    textAlign(CENTER, CENTER);

    // Show ratio equality
    let ratio1 = "DE/AB = " + (origBase * scaleFactor).toFixed(0) + "/" + origBase + " = " + scaleFactor.toFixed(1);
    let ratio2 = "EF/BC = " + (origHeight * scaleFactor).toFixed(0) + "/" + origHeight + " = " + scaleFactor.toFixed(1);

    text(ratio1, canvasWidth/4, y);
    text(ratio2, 3*canvasWidth/4, y);

    // Similarity statement
    fill(40);
    textSize(14);
    text("△ABC ~ △DEF (Scale factor = " + scaleFactor.toFixed(1) + ")", canvasWidth/2, drawHeight + 85);
}

function windowResized() {
    updateCanvasSize();
}

function updateCanvasSize() {
    let containerWidth = select('#canvas-container').width;
    if (containerWidth > 0) {
        canvasWidth = min(containerWidth, 750);
        resizeCanvas(canvasWidth, canvasHeight);
        scaleSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    }
}
