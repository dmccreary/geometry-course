// Trigonometric Ratios Explorer MicroSim
// Interactive SOH-CAH-TOA visualization

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Triangle parameters
let angleSlider;
let angle = 30; // degrees
let hypotenuse = 160;

// Colors
let bgColor;
let oppColor, adjColor, hypColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(248, 250, 252);
    oppColor = color(244, 67, 54);   // Red - Opposite
    adjColor = color(33, 150, 243);  // Blue - Adjacent
    hypColor = color(76, 175, 80);   // Green - Hypotenuse

    // Create angle slider
    angleSlider = createSlider(5, 85, 30, 1);
    angleSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    angleSlider.size(200);
    angleSlider.parent('canvas-container');

    textFont('Arial');
}

function draw() {
    background(bgColor);
    angle = angleSlider.value();

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("Trigonometric Ratios Explorer", canvasWidth/2, 12);

    // Draw the right triangle
    let triangleCenterX = 200;
    let triangleCenterY = drawHeight/2 + 40;
    drawRightTriangle(triangleCenterX, triangleCenterY);

    // Draw SOH-CAH-TOA panel
    drawTrigPanel();

    // Draw control label
    fill(60);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Angle θ = " + angle + "°", canvasWidth/2, drawHeight + 35);

    // Draw SOH-CAH-TOA reminder
    drawSohCahToa();
}

function drawRightTriangle(cx, cy) {
    // Calculate triangle vertices
    let radAngle = radians(angle);
    let adj = hypotenuse * cos(radAngle);
    let opp = hypotenuse * sin(radAngle);

    // Vertices: A = right angle, B = angle θ, C = top
    let ax = cx - adj/2;
    let ay = cy + opp/3;
    let bx = cx + adj/2;
    let by = cy + opp/3;
    let cx2 = cx - adj/2;
    let cy2 = cy - 2*opp/3;

    // Draw triangle fill
    fill(240, 240, 245);
    stroke(100);
    strokeWeight(2);
    beginShape();
    vertex(ax, ay);
    vertex(bx, by);
    vertex(cx2, cy2);
    endShape(CLOSE);

    // Draw sides with color coding
    // Adjacent (bottom) - Blue
    stroke(adjColor);
    strokeWeight(4);
    line(ax, ay, bx, by);

    // Opposite (left side) - Red
    stroke(oppColor);
    strokeWeight(4);
    line(ax, ay, cx2, cy2);

    // Hypotenuse - Green
    stroke(hypColor);
    strokeWeight(4);
    line(bx, by, cx2, cy2);

    // Right angle marker at A
    stroke(100);
    strokeWeight(2);
    noFill();
    let markerSize = 15;
    rect(ax, ay - markerSize, markerSize, markerSize);

    // Angle arc at B (θ)
    stroke(200, 50, 200);
    strokeWeight(2);
    noFill();
    let arcRadius = 30;
    arc(bx, by, arcRadius * 2, arcRadius * 2, PI, PI + radAngle);

    // θ label
    fill(150, 0, 150);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    let labelX = bx - 45;
    let labelY = by - 10;
    text("θ", labelX, labelY);

    // Side labels
    textSize(13);

    // Opposite label (left side)
    fill(oppColor);
    push();
    translate(ax - 25, (ay + cy2)/2);
    rotate(-HALF_PI);
    text("opposite = " + opp.toFixed(1), 0, 0);
    pop();

    // Adjacent label (bottom)
    fill(adjColor);
    text("adjacent = " + adj.toFixed(1), (ax + bx)/2, ay + 25);

    // Hypotenuse label
    fill(hypColor);
    let midHypX = (bx + cx2)/2 + 15;
    let midHypY = (by + cy2)/2;
    push();
    translate(midHypX, midHypY);
    rotate(atan2(cy2 - by, cx2 - bx));
    text("hypotenuse = " + hypotenuse.toFixed(1), 0, -10);
    pop();

    // Vertex labels
    fill(60);
    textSize(14);
    text("A", ax - 15, ay + 15);
    text("B", bx + 15, by + 5);
    text("C", cx2 - 15, cy2 - 10);
}

function drawTrigPanel() {
    let panelX = 400;
    let panelY = 80;
    let panelW = 280;
    let panelH = 280;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    // Calculate values
    let radAngle = radians(angle);
    let sinVal = sin(radAngle);
    let cosVal = cos(radAngle);
    let tanVal = tan(radAngle);
    let opp = hypotenuse * sinVal;
    let adj = hypotenuse * cosVal;

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text("Trigonometric Ratios for θ = " + angle + "°", panelX + panelW/2, panelY + 15);

    // Draw ratios
    textAlign(LEFT, TOP);
    textSize(14);
    let y = panelY + 50;
    let x = panelX + 15;
    let lineHeight = 70;

    // Sine
    fill(oppColor);
    text("Sine (SOH)", x, y);
    fill(60);
    textSize(13);
    text("sin(θ) = opposite / hypotenuse", x, y + 20);
    text("sin(" + angle + "°) = " + opp.toFixed(1) + " / " + hypotenuse.toFixed(1) + " = " + sinVal.toFixed(4), x, y + 38);

    y += lineHeight;

    // Cosine
    fill(adjColor);
    textSize(14);
    text("Cosine (CAH)", x, y);
    fill(60);
    textSize(13);
    text("cos(θ) = adjacent / hypotenuse", x, y + 20);
    text("cos(" + angle + "°) = " + adj.toFixed(1) + " / " + hypotenuse.toFixed(1) + " = " + cosVal.toFixed(4), x, y + 38);

    y += lineHeight;

    // Tangent
    fill(150, 0, 150);
    textSize(14);
    text("Tangent (TOA)", x, y);
    fill(60);
    textSize(13);
    text("tan(θ) = opposite / adjacent", x, y + 20);
    text("tan(" + angle + "°) = " + opp.toFixed(1) + " / " + adj.toFixed(1) + " = " + tanVal.toFixed(4), x, y + 38);
}

function drawSohCahToa() {
    let boxX = 400;
    let boxY = 375;
    let boxW = 280;
    let boxH = 50;

    // Background
    fill(255, 243, 224);
    stroke(255, 152, 0);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 8);

    // SOH-CAH-TOA text
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text("SOH - CAH - TOA", boxX + boxW/2, boxY + 18);

    textSize(10);
    fill(80);
    text("Memory aid for Sin, Cos, Tan ratios", boxX + boxW/2, boxY + 38);
}

function windowResized() {
    updateCanvasSize();
}

function updateCanvasSize() {
    let containerWidth = select('#canvas-container').width;
    if (containerWidth > 0) {
        canvasWidth = min(containerWidth, 750);
        resizeCanvas(canvasWidth, canvasHeight);
        angleSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    }
}
