// Circle Parts Explorer MicroSim
// Interactive visualization of basic circle components

let canvasWidth = 710;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Circle parameters
let radiusSlider;
let radiusValueSpan;
let circleRadius = 120;
let centerX, centerY;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    centerX = canvasWidth / 3;
    centerY = drawHeight / 2 + 20;

    // Radius slider row
    let radiusRow = createDiv();
    radiusRow.parent(document.querySelector('main'));
    radiusRow.position(10, drawHeight + 10);

    let radiusLabel = createSpan('Radius: ');
    radiusLabel.parent(radiusRow);
    styleLabel(radiusLabel, 55);

    radiusValueSpan = createSpan('120');
    radiusValueSpan.parent(radiusRow);
    styleValue(radiusValueSpan, 30);

    radiusSlider = createSlider(50, 180, 120, 5);
    radiusSlider.parent(radiusRow);
    radiusSlider.size(150);

    textFont('Arial');
}

function draw() {
    // Drawing region
    fill(240, 248, 255);
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);

    // Control region
    fill(245);
    rect(0, drawHeight, canvasWidth, controlHeight);
    stroke(220);
    strokeWeight(1);
    line(0, drawHeight, canvasWidth, drawHeight);

    circleRadius = radiusSlider.value();
    radiusValueSpan.html(circleRadius);

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text("Parts of a Circle", canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Draw circle
    stroke(30, 136, 229);
    strokeWeight(3);
    noFill();
    ellipse(centerX, centerY, circleRadius * 2, circleRadius * 2);

    // Draw center point
    fill(220, 20, 60);
    noStroke();
    ellipse(centerX, centerY, 12, 12);

    // Draw radius (from center to right)
    let radiusEndX = centerX + circleRadius;
    let radiusEndY = centerY;
    stroke(76, 175, 80);
    strokeWeight(3);
    line(centerX, centerY, radiusEndX, radiusEndY);

    // Draw another radius at 135 degrees
    let angle2 = radians(135);
    let radiusEndX2 = centerX + circleRadius * cos(angle2);
    let radiusEndY2 = centerY + circleRadius * sin(angle2);
    stroke(156, 39, 176);
    strokeWeight(3);
    line(centerX, centerY, radiusEndX2, radiusEndY2);

    // Draw diameter
    stroke(255, 152, 0);
    strokeWeight(3);
    let angle3 = radians(30);
    let diamEndX1 = centerX + circleRadius * cos(angle3);
    let diamEndY1 = centerY + circleRadius * sin(angle3);
    let diamEndX2 = centerX - circleRadius * cos(angle3);
    let diamEndY2 = centerY - circleRadius * sin(angle3);
    line(diamEndX1, diamEndY1, diamEndX2, diamEndY2);

    // Draw chord (not through center)
    stroke(33, 150, 243);
    strokeWeight(3);
    let chordAngle1 = radians(200);
    let chordAngle2 = radians(280);
    let chordX1 = centerX + circleRadius * cos(chordAngle1);
    let chordY1 = centerY + circleRadius * sin(chordAngle1);
    let chordX2 = centerX + circleRadius * cos(chordAngle2);
    let chordY2 = centerY + circleRadius * sin(chordAngle2);
    line(chordX1, chordY1, chordX2, chordY2);

    // Labels
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);

    // Center label
    fill(220, 20, 60);
    text("Center", centerX, centerY + 25);

    // Radius labels
    fill(76, 175, 80);
    text("Radius (r)", (centerX + radiusEndX) / 2, centerY - 15);

    fill(156, 39, 176);
    text("r", (centerX + radiusEndX2) / 2 - 20, (centerY + radiusEndY2) / 2 - 10);

    // Diameter label
    fill(255, 152, 0);
    text("Diameter (d = 2r)", (diamEndX1 + diamEndX2) / 2 + 30, (diamEndY1 + diamEndY2) / 2 - 25);

    // Chord label
    fill(33, 150, 243);
    textAlign(LEFT, CENTER);
    text("Chord", (chordX1 + chordX2) / 2 - 60, (chordY1 + chordY2) / 2);

    // Draw info panel
    drawInfoPanel();
}

function drawInfoPanel() {
    let panelX = canvasWidth - 230;
    let panelY = 45;
    let panelW = 210;
    let panelH = 280;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text("Circle Measurements", panelX + 15, panelY + 12);
    textStyle(NORMAL);

    textSize(13);
    let y = panelY + 40;

    // Radius
    fill(76, 175, 80);
    text("\u25cf Radius (r):", panelX + 15, y);
    fill(60);
    text("  " + circleRadius + " units", panelX + 15, y + 18);
    y += 45;

    // Diameter
    fill(255, 152, 0);
    text("\u25cf Diameter (d):", panelX + 15, y);
    fill(60);
    text("  d = 2r = " + (circleRadius * 2) + " units", panelX + 15, y + 18);
    y += 45;

    // Circumference
    fill(30, 136, 229);
    text("\u25cf Circumference (C):", panelX + 15, y);
    fill(60);
    let circumference = 2 * PI * circleRadius;
    text("  C = 2\u03c0r = " + circumference.toFixed(1), panelX + 15, y + 18);
    y += 45;

    // Area
    fill(220, 20, 60);
    text("\u25cf Area (A):", panelX + 15, y);
    fill(60);
    let area = PI * circleRadius * circleRadius;
    text("  A = \u03c0r\u00b2 = " + area.toFixed(1), panelX + 15, y + 18);
    y += 50;

    // Key relationships
    fill(100);
    textSize(11);
    text("Key Relationships:", panelX + 15, y);
    y += 18;
    text("\u2022 Diameter is longest chord", panelX + 15, y);
    y += 15;
    text("\u2022 d = 2r", panelX + 15, y);
}

function styleLabel(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 60) + 'px');
}

function styleValue(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 35) + 'px');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    centerX = canvasWidth / 3;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
