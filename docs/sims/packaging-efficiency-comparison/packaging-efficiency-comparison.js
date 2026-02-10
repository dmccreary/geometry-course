// Packaging Efficiency Comparison MicroSim
// Static diagram comparing 4 packaging arrangements for 6 cylindrical candles

let canvasWidth = 710;
let drawHeight = 620;
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

    let margin = 10;
    let panelWidth = (canvasWidth - 30) / 2;
    let panelHeight = 230;

    // Title
    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(18);
    text("Packaging Design Challenge: Which Uses Least Material?", canvasWidth / 2, 10);

    let topY = 40;

    // Panel 1: 1x6 Linear (top-left)
    drawPanel1(margin, topY, panelWidth, panelHeight);

    // Panel 2: 2x3 Grid (top-right)
    drawPanel2(margin + panelWidth + 10, topY, panelWidth, panelHeight);

    // Panel 3: 3x2 Grid (bottom-left)
    drawPanel3(margin, topY + panelHeight + 10, panelWidth, panelHeight);

    // Panel 4: 6x1 Stack (bottom-right)
    drawPanel4(margin + panelWidth + 10, topY + panelHeight + 10, panelWidth, panelHeight);

    // Bottom summary
    drawSummary(margin, 530, canvasWidth - 2 * margin, 80);
}

function drawPanel1(x, y, w, h) {
    // Light blue background
    stroke(180, 210, 240);
    strokeWeight(1);
    fill(227, 242, 253);
    rect(x, y, w, h, 8);

    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(16);
    text("1\u00D76 Linear", x + w / 2, y + 8);

    // Top view label
    textStyle(NORMAL);
    textSize(14);
    fill(80);
    text("Top View", x + w / 2, y + 32);

    // Draw 6 circles in a single row
    let circleR = 14;
    let spacing = circleR * 2 + 3;
    let totalRowW = spacing * 6 - 3;
    let startX = x + w / 2 - totalRowW / 2 + circleR;
    let circleY = y + 80;

    // Dashed rectangle around circles
    drawDashedRect(
        x + w / 2 - totalRowW / 2 - 6,
        circleY - circleR - 6,
        totalRowW + 12,
        circleR * 2 + 12
    );

    for (let i = 0; i < 6; i++) {
        stroke(100, 160, 220);
        strokeWeight(1.5);
        fill(173, 216, 230, 180);
        ellipse(startX + i * spacing, circleY, circleR * 2, circleR * 2);
    }

    // Dimensions
    noStroke();
    fill(80);
    textSize(14);
    textStyle(NORMAL);
    text("Box: 36 \u00D7 6 \u00D7 15 cm", x + w / 2, y + 120);

    // Formula
    textSize(12);
    fill(100);
    text("SA = 2(36\u00D76) + 2(36\u00D715) + 2(6\u00D715)", x + w / 2, y + 142);

    // Result
    noStroke();
    fill(50);
    textStyle(BOLD);
    textSize(22);
    text("1692 cm\u00B2", x + w / 2, y + 170);

    // Efficiency bar
    textSize(13);
    textStyle(NORMAL);
    fill(120);
    text("Material usage: moderate", x + w / 2, y + 200);
}

function drawPanel2(x, y, w, h) {
    // Light green background with green highlight border
    stroke(76, 175, 80);
    strokeWeight(2);
    fill(232, 245, 233);
    rect(x, y, w, h, 8);

    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(16);
    text("2\u00D73 Grid", x + w / 2, y + 8);

    // Top view label
    textStyle(NORMAL);
    textSize(14);
    fill(80);
    text("Top View", x + w / 2, y + 32);

    // Draw 6 circles in 2 rows x 3 columns
    let circleR = 16;
    let spacingX = circleR * 2 + 4;
    let spacingY = circleR * 2 + 4;
    let totalW = spacingX * 3 - 4;
    let totalH = spacingY * 2 - 4;
    let startX = x + w / 2 - totalW / 2 + circleR;
    let startY = y + 70;

    // Dashed rectangle around circles
    drawDashedRect(
        x + w / 2 - totalW / 2 - 6,
        startY - circleR - 6,
        totalW + 12,
        totalH + 12
    );

    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            stroke(76, 175, 80);
            strokeWeight(1.5);
            fill(165, 214, 167, 180);
            ellipse(startX + col * spacingX, startY + row * spacingY, circleR * 2, circleR * 2);
        }
    }

    // Dimensions
    noStroke();
    fill(80);
    textSize(14);
    textStyle(NORMAL);
    text("Box: 18 \u00D7 12 \u00D7 15 cm", x + w / 2, y + 120);

    // Formula
    textSize(12);
    fill(100);
    text("SA = 2(18\u00D712) + 2(18\u00D715) + 2(12\u00D715)", x + w / 2, y + 142);

    // Result with star
    noStroke();
    fill(27, 94, 32);
    textStyle(BOLD);
    textSize(22);
    text("1332 cm\u00B2", x + w / 2, y + 170);

    // Winner label
    textSize(14);
    fill(27, 94, 32);
    text("\u2605 Most Efficient!", x + w / 2, y + 200);
}

function drawPanel3(x, y, w, h) {
    // Light orange background
    stroke(255, 183, 77);
    strokeWeight(1);
    fill(255, 243, 224);
    rect(x, y, w, h, 8);

    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(16);
    text("3\u00D72 Grid", x + w / 2, y + 8);

    // Top view label
    textStyle(NORMAL);
    textSize(14);
    fill(80);
    text("Top View", x + w / 2, y + 32);

    // Draw 6 circles in 3 rows x 2 columns
    let circleR = 16;
    let spacingX = circleR * 2 + 4;
    let spacingY = circleR * 2 + 4;
    let totalW = spacingX * 2 - 4;
    let totalH = spacingY * 3 - 4;
    let startX = x + w / 2 - totalW / 2 + circleR;
    let startY = y + 62;

    // Dashed rectangle around circles
    drawDashedRect(
        x + w / 2 - totalW / 2 - 6,
        startY - circleR - 6,
        totalW + 12,
        totalH + 12
    );

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
            stroke(255, 152, 0);
            strokeWeight(1.5);
            fill(255, 204, 128, 180);
            ellipse(startX + col * spacingX, startY + row * spacingY, circleR * 2, circleR * 2);
        }
    }

    // Dimensions
    noStroke();
    fill(80);
    textSize(14);
    textStyle(NORMAL);
    text("Box: 12 \u00D7 18 \u00D7 15 cm", x + w / 2, y + 133);

    // Formula
    textSize(12);
    fill(100);
    text("SA = 2(12\u00D718) + 2(12\u00D715) + 2(18\u00D715)", x + w / 2, y + 155);

    // Result
    noStroke();
    fill(50);
    textStyle(BOLD);
    textSize(22);
    text("1332 cm\u00B2", x + w / 2, y + 178);

    // Note
    textSize(14);
    textStyle(NORMAL);
    fill(180, 100, 0);
    text("Same as 2\u00D73!", x + w / 2, y + 205);
}

function drawPanel4(x, y, w, h) {
    // Light purple background
    stroke(186, 154, 207);
    strokeWeight(1);
    fill(243, 229, 245);
    rect(x, y, w, h, 8);

    noStroke();
    fill(30);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(16);
    text("6\u00D71 Stack", x + w / 2, y + 8);

    // Top view label
    textStyle(NORMAL);
    textSize(14);
    fill(80);
    text("Top View (single candle footprint)", x + w / 2, y + 32);

    // Draw 1 circle
    let circleR = 22;
    let circleY = y + 80;

    // Dashed rectangle around single circle
    drawDashedRect(
        x + w / 2 - circleR - 8,
        circleY - circleR - 8,
        circleR * 2 + 16,
        circleR * 2 + 16
    );

    stroke(156, 39, 176);
    strokeWeight(1.5);
    fill(206, 147, 216, 180);
    ellipse(x + w / 2, circleY, circleR * 2, circleR * 2);

    // Dimensions
    noStroke();
    fill(80);
    textSize(14);
    textStyle(NORMAL);
    text("Box: 6 \u00D7 6 \u00D7 90 cm", x + w / 2, y + 120);

    // Formula
    textSize(12);
    fill(100);
    text("SA = 2(6\u00D76) + 4(6\u00D790)", x + w / 2, y + 142);

    // Result
    noStroke();
    fill(180, 30, 30);
    textStyle(BOLD);
    textSize(22);
    text("2232 cm\u00B2", x + w / 2, y + 170);

    // Warning
    textSize(14);
    fill(180, 30, 30);
    text("\u26A0 Least Efficient", x + w / 2, y + 200);
}

function drawSummary(x, y, w, h) {
    // Light green background with green border
    stroke(76, 175, 80);
    strokeWeight(2);
    fill(232, 245, 233);
    rect(x, y, w, h, 8);

    noStroke();
    textAlign(LEFT, TOP);
    let textX = x + 16;

    fill(27, 94, 32);
    textStyle(BOLD);
    textSize(16);
    text("Design Principles:", textX, y + 8);

    fill(50);
    textStyle(NORMAL);
    textSize(14);
    text("\u2022  Cube-like shapes minimize surface area for a given volume", textX, y + 30);
    text("\u2022  The 2\u00D73 arrangement saves 21% material vs 1\u00D76 linear", textX, y + 50);
    text("\u2022  The 2\u00D73 arrangement saves 40% material vs 6\u00D71 stack", textX, y + 70);
}

function drawDashedRect(x, y, w, h) {
    stroke(120);
    strokeWeight(1);
    drawingContext.setLineDash([5, 4]);
    noFill();
    rect(x, y, w, h, 3);
    drawingContext.setLineDash([]);
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
    }
    canvasHeight = drawHeight + controlHeight;
}
