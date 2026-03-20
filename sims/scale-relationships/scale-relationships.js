// Scale Relationships MicroSim
// Static diagram showing how scale factor k affects length (k), area (k^2), and volume (k^3)

let canvasWidth = 710;
let drawHeight = 550;
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
    rect(0, 0, canvasWidth, canvasHeight);

    let margin = 20;
    let panelWidth = (canvasWidth - 40) / 3;
    let panelGap = 0;
    let panelTop = 50;
    let panelHeight = 400;
    let summaryHeight = 70;
    let summaryTop = panelTop + panelHeight + 15;

    // Title
    noStroke();
    fill(0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(20);
    text("How Scale Affects Measurements", canvasWidth / 2, 12);

    // Draw three columns
    drawLengthColumn(margin, panelTop, panelWidth, panelHeight);
    drawAreaColumn(margin + panelWidth + panelGap, panelTop, panelWidth, panelHeight);
    drawVolumeColumn(margin + 2 * (panelWidth + panelGap), panelTop, panelWidth, panelHeight);

    // Bottom summary box
    drawSummaryBox(margin, summaryTop, canvasWidth - 2 * margin, summaryHeight);
}

// ─── COLUMN 1: LENGTH ───

function drawLengthColumn(x, y, w, h) {
    // Panel background
    fill('#E3F2FD');
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    let cx = x + w / 2;

    // Title
    noStroke();
    fill(0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(18);
    text("Length (1D)", cx, y + 10);

    // --- Original line ---
    noStroke();
    fill(80);
    textStyle(NORMAL);
    textSize(16);
    text("Original:", cx, y + 42);

    let lineLen = 160;
    let lineY = y + 75;
    stroke(30, 100, 200);
    strokeWeight(4);
    line(cx - lineLen / 2, lineY, cx + lineLen / 2, lineY);

    noStroke();
    fill(30, 100, 200);
    textSize(16);
    textStyle(NORMAL);
    text("10 units", cx, lineY + 10);

    // --- Scaled line ---
    noStroke();
    fill(80);
    textSize(16);
    text("Scaled (k = \u00BD):", cx, y + 112);

    let scaledLen = 80;
    let scaledY = y + 145;
    stroke(200, 50, 50);
    strokeWeight(4);
    line(cx - scaledLen / 2, scaledY, cx + scaledLen / 2, scaledY);

    noStroke();
    fill(200, 50, 50);
    textSize(16);
    text("5 units", cx, scaledY + 10);

    // Arrow with label
    drawDownArrow(cx, lineY + 30, scaledY - 18, "\u00D7 \u00BD");

    // Formula box
    let boxX = x + 15;
    let boxY = y + 195;
    let boxW = w - 30;
    let boxH = 190;
    drawFormulaBox(boxX, boxY, boxW, boxH, [
        { text: "Scale factor = k", bold: true },
        { text: "" },
        { text: "New length = k \u00D7 original", bold: false },
        { text: "" },
        { text: "k = \u00BD", bold: false },
        { text: "5 = \u00BD \u00D7 10 \u2713", bold: true }
    ]);
}

// ─── COLUMN 2: AREA ───

function drawAreaColumn(x, y, w, h) {
    // Panel background
    fill('#E8F5E9');
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    let cx = x + w / 2;

    // Title
    noStroke();
    fill(0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(18);
    text("Area (2D)", cx, y + 10);

    // --- Original square ---
    noStroke();
    fill(80);
    textStyle(NORMAL);
    textSize(16);
    text("Original:", cx, y + 42);

    let sqSize = 100;
    let sqY = y + 62;
    fill(200, 220, 255);
    stroke(30, 100, 200);
    strokeWeight(2);
    rect(cx - sqSize / 2, sqY, sqSize, sqSize);

    noStroke();
    fill(30, 100, 200);
    textSize(14);
    textAlign(CENTER, TOP);
    text("10 \u00D7 10 = 100 sq units", cx, sqY + sqSize + 4);

    // --- Scaled square ---
    let scaledSq = 50;
    let scaledSqY = sqY + sqSize + 38;

    noStroke();
    fill(80);
    textSize(16);
    textAlign(CENTER, TOP);
    text("Scaled:", cx, scaledSqY - 18);

    fill(255, 210, 210);
    stroke(200, 50, 50);
    strokeWeight(2);
    rect(cx - scaledSq / 2, scaledSqY, scaledSq, scaledSq);

    noStroke();
    fill(200, 50, 50);
    textSize(14);
    textAlign(CENTER, TOP);
    text("5 \u00D7 5 = 25 sq units", cx, scaledSqY + scaledSq + 4);

    // Arrow with label
    drawRightArrow(cx + sqSize / 2 + 8, sqY + sqSize / 2, cx + scaledSq / 2 + 30, scaledSqY + scaledSq / 2, "\u00D7 (\u00BD)\u00B2 = \u00BC");

    // Formula box
    let boxX = x + 15;
    let boxY = y + 265;
    let boxW = w - 30;
    let boxH = 120;
    drawFormulaBox(boxX, boxY, boxW, boxH, [
        { text: "New area = k\u00B2 \u00D7 original", bold: true },
        { text: "" },
        { text: "25 = (\u00BD)\u00B2 \u00D7 100", bold: false },
        { text: "25 = \u00BC \u00D7 100 \u2713", bold: true }
    ]);
}

// ─── COLUMN 3: VOLUME ───

function drawVolumeColumn(x, y, w, h) {
    // Panel background
    fill('#FFF3E0');
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    let cx = x + w / 2;

    // Title
    noStroke();
    fill(0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(18);
    text("Volume (3D)", cx, y + 10);

    // --- Original cube ---
    noStroke();
    fill(80);
    textStyle(NORMAL);
    textSize(16);
    text("Original:", cx, y + 42);

    let cubeSize = 80;
    let cubeX = cx - cubeSize / 2 - 15;
    let cubeY = y + 130;
    drawIsometricCube(cubeX, cubeY, cubeSize,
        color(100, 150, 230), color(60, 120, 210), color(40, 90, 180));

    noStroke();
    fill(30, 100, 200);
    textSize(14);
    textAlign(CENTER, TOP);
    text("10\u00B3 = 1000 cu units", cx, cubeY + 12);

    // --- Scaled cube ---
    let scaledCube = 40;
    let scaledCubeX = cx - scaledCube / 2 - 8;
    let scaledCubeY = cubeY + 70;

    noStroke();
    fill(80);
    textSize(16);
    textAlign(CENTER, TOP);
    text("Scaled:", cx, scaledCubeY - 28);

    drawIsometricCube(scaledCubeX, scaledCubeY + 40, scaledCube,
        color(230, 130, 130), color(210, 90, 90), color(180, 60, 60));

    noStroke();
    fill(200, 50, 50);
    textSize(14);
    textAlign(CENTER, TOP);
    text("5\u00B3 = 125 cu units", cx, scaledCubeY + scaledCube + 48);

    // Arrow with label
    let arrowStartY = cubeY + 18;
    let arrowEndY = scaledCubeY + 10;
    drawDownArrow(cx + cubeSize / 2 + 20, arrowStartY, arrowEndY, "\u00D7 (\u00BD)\u00B3 = \u215B");

    // Formula box
    let boxX = x + 15;
    let boxY = y + 265;
    let boxW = w - 30;
    let boxH = 120;
    drawFormulaBox(boxX, boxY, boxW, boxH, [
        { text: "New vol = k\u00B3 \u00D7 original", bold: true },
        { text: "" },
        { text: "125 = (\u00BD)\u00B3 \u00D7 1000", bold: false },
        { text: "125 = \u215B \u00D7 1000 \u2713", bold: true }
    ]);
}

// ─── ISOMETRIC CUBE ───

function drawIsometricCube(x, y, size, topColor, leftColor, rightColor) {
    // x, y is the center-bottom anchor point of the cube
    let s = size;
    let dx = s * 0.5;   // horizontal half-width
    let dy = s * 0.28;  // vertical offset for isometric angle

    // Top face
    fill(topColor);
    stroke(40);
    strokeWeight(1);
    beginShape();
    vertex(x, y - s);           // top
    vertex(x + dx, y - s + dy); // right
    vertex(x, y - s + 2 * dy);  // front-center
    vertex(x - dx, y - s + dy); // left
    endShape(CLOSE);

    // Left face
    fill(leftColor);
    beginShape();
    vertex(x - dx, y - s + dy);     // top-left
    vertex(x, y - s + 2 * dy);       // top-center
    vertex(x, y - s + 2 * dy + s - 2 * dy); // bottom-center => y
    vertex(x - dx, y - s + dy + s - 2 * dy); // bottom-left
    endShape(CLOSE);

    // Right face
    fill(rightColor);
    beginShape();
    vertex(x + dx, y - s + dy);      // top-right
    vertex(x, y - s + 2 * dy);        // top-center
    vertex(x, y);                      // bottom-center
    vertex(x + dx, y - dy);           // bottom-right
    endShape(CLOSE);
}

// ─── DOWN ARROW WITH LABEL ───

function drawDownArrow(x, y1, y2, label) {
    stroke(120);
    strokeWeight(2);
    let midY = (y1 + y2) / 2;
    line(x, y1, x, y2);
    // arrowhead
    line(x, y2, x - 5, y2 - 8);
    line(x, y2, x + 5, y2 - 8);

    // label
    noStroke();
    fill(180, 50, 50);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(label, x + 25, midY);
    textStyle(NORMAL);
}

// ─── RIGHT ARROW (CURVED) WITH LABEL ───

function drawRightArrow(x1, y1, x2, y2, label) {
    stroke(120);
    strokeWeight(2);
    noFill();
    // simple curved path
    let cpx = x1 + 25;
    let cpy = (y1 + y2) / 2;
    bezier(x1, y1, cpx, y1, cpx, y2, x2, y2);
    // arrowhead
    line(x2, y2, x2 - 6, y2 - 5);
    line(x2, y2, x2 - 6, y2 + 5);

    noStroke();
    fill(180, 50, 50);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(13);
    text(label, cpx + 18, cpy);
    textStyle(NORMAL);
}

// ─── FORMULA BOX ───

function drawFormulaBox(x, y, w, h, lines) {
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textSize(16);
    let lineHeight = 24;
    let startY = y + 12;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].bold) {
            textStyle(BOLD);
        } else {
            textStyle(NORMAL);
        }
        text(lines[i].text, x + w / 2, startY + i * lineHeight);
    }
    textStyle(NORMAL);
}

// ─── SUMMARY BOX ───

function drawSummaryBox(x, y, w, h) {
    fill('#FFF9C4');
    stroke('#FF9800');
    strokeWeight(2);
    rect(x, y, w, h, 8);

    noStroke();
    fill(0);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(16);
    text("Key Principle: When you scale by factor k:", x + w / 2, y + 10);

    textStyle(NORMAL);
    textSize(16);
    fill(60);
    text("Lengths multiply by k    |    Areas multiply by k\u00B2    |    Volumes multiply by k\u00B3", x + w / 2, y + 38);
}

// ─── RESPONSIVE ───

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
    canvasHeight = drawHeight + controlHeight;
}
