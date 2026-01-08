// Circle Parts Explorer MicroSim
// Interactive visualization of basic circle components

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Circle parameters
let radiusSlider;
let circleRadius = 120;
let centerX, centerY;

// Colors
let bgColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(248, 250, 252);
    centerX = canvasWidth / 3;
    centerY = drawHeight / 2 + 20;

    // Create slider
    radiusSlider = createSlider(50, 180, 120, 10);
    radiusSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    radiusSlider.size(200);
    radiusSlider.parent('canvas-container');

    textFont('Arial');
}

function draw() {
    background(bgColor);
    circleRadius = radiusSlider.value();

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("Parts of a Circle", canvasWidth/2, 12);

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

    // Center label
    fill(220, 20, 60);
    text("Center", centerX, centerY + 25);

    // Radius labels
    fill(76, 175, 80);
    text("Radius (r)", (centerX + radiusEndX)/2, centerY - 15);

    fill(156, 39, 176);
    text("r", (centerX + radiusEndX2)/2 - 20, (centerY + radiusEndY2)/2 - 10);

    // Diameter label
    fill(255, 152, 0);
    text("Diameter (d = 2r)", (diamEndX1 + diamEndX2)/2 + 30, (diamEndY1 + diamEndY2)/2 - 25);

    // Chord label
    fill(33, 150, 243);
    text("Chord", (chordX1 + chordX2)/2 - 40, (chordY1 + chordY2)/2);

    // Draw info panel
    drawInfoPanel();

    // Control label
    fill(60);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Radius: " + circleRadius + " units", canvasWidth/2, drawHeight + 35);
}

function drawInfoPanel() {
    let panelX = canvasWidth - 230;
    let panelY = 50;
    let panelW = 210;
    let panelH = 280;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text("Circle Measurements", panelX + 15, panelY + 15);

    textSize(13);
    fill(80);
    let y = panelY + 45;

    // Radius
    fill(76, 175, 80);
    text("● Radius (r):", panelX + 15, y);
    fill(60);
    text("  " + circleRadius + " units", panelX + 15, y + 18);
    y += 45;

    // Diameter
    fill(255, 152, 0);
    text("● Diameter (d):", panelX + 15, y);
    fill(60);
    text("  d = 2r = " + (circleRadius * 2) + " units", panelX + 15, y + 18);
    y += 45;

    // Circumference
    fill(30, 136, 229);
    text("● Circumference (C):", panelX + 15, y);
    fill(60);
    let circumference = 2 * PI * circleRadius;
    text("  C = 2πr = " + circumference.toFixed(1), panelX + 15, y + 18);
    y += 45;

    // Area
    fill(220, 20, 60);
    text("● Area (A):", panelX + 15, y);
    fill(60);
    let area = PI * circleRadius * circleRadius;
    text("  A = πr² = " + area.toFixed(1), panelX + 15, y + 18);
    y += 50;

    // Key relationships
    fill(100);
    textSize(11);
    text("Key Relationships:", panelX + 15, y);
    y += 18;
    text("• Diameter is longest chord", panelX + 15, y);
    y += 15;
    text("• d = 2r", panelX + 15, y);
}

function windowResized() {
    updateCanvasSize();
}

function updateCanvasSize() {
    let containerWidth = select('#canvas-container').width;
    if (containerWidth > 0) {
        canvasWidth = min(containerWidth, 750);
        resizeCanvas(canvasWidth, canvasHeight);
        centerX = canvasWidth / 3;
        radiusSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    }
}
