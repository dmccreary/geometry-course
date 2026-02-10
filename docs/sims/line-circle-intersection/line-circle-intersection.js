// Line-Circle Intersection MicroSim
// Shows 0, 1, or 2 intersection points

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let gridSize = 40;
let originX, originY;
let circleR = 2.5;
let lineSlope = 0.5;
let lineIntercept = 1;
let draggingSlider = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    originX = canvasWidth / 2;
    originY = drawHeight / 2;
}

function draw() {
    background(255);

    drawGrid();

    // Circle at origin
    let rPx = circleR * gridSize;
    stroke(33, 150, 243);
    strokeWeight(3);
    noFill();
    ellipse(originX, originY, rPx * 2);

    // Center
    fill(100);
    noStroke();
    ellipse(originX, originY, 6);

    // Line: y = mx + b
    let m = lineSlope;
    let b = lineIntercept;

    // Draw line across canvas
    let x1World = -10;
    let x2World = 10;
    let y1World = m * x1World + b;
    let y2World = m * x2World + b;

    let x1Px = originX + x1World * gridSize;
    let y1Px = originY - y1World * gridSize;
    let x2Px = originX + x2World * gridSize;
    let y2Px = originY - y2World * gridSize;

    // Perpendicular distance from origin to line: |b| / sqrt(m² + 1)
    let perpDist = abs(b) / sqrt(m * m + 1);

    // Color based on intersection count
    let intersections = [];
    let disc = circleR * circleR * (m * m + 1) - b * b;
    let numIntersections = 0;

    if (disc > 0.01) {
        numIntersections = 2;
        stroke(76, 175, 80);
    } else if (abs(disc) <= 0.01) {
        numIntersections = 1;
        stroke(255, 193, 7);
    } else {
        numIntersections = 0;
        stroke(220, 20, 60);
    }

    strokeWeight(2.5);
    line(x1Px, y1Px, x2Px, y2Px);

    // Calculate intersections
    if (disc >= 0) {
        // x values from substituting y = mx + b into x² + y² = r²
        let a = m * m + 1;
        let bCoeff = 2 * m * b;
        let c = b * b - circleR * circleR;
        let sqrtDisc = sqrt(max(0, bCoeff * bCoeff - 4 * a * c));

        let ix1 = (-bCoeff - sqrtDisc) / (2 * a);
        let ix2 = (-bCoeff + sqrtDisc) / (2 * a);
        let iy1 = m * ix1 + b;
        let iy2 = m * ix2 + b;

        if (disc > 0.01) {
            // Two points
            drawIntersectionPoint(ix1, iy1);
            drawIntersectionPoint(ix2, iy2);
        } else {
            // One point (tangent)
            drawIntersectionPoint(ix1, iy1);
        }
    }

    // Perpendicular from center to line
    let perpX = -m * b / (m * m + 1);
    let perpY = b / (m * m + 1);
    stroke(150);
    strokeWeight(1.5);
    drawingContext.setLineDash([4, 4]);
    line(originX, originY, originX + perpX * gridSize, originY - perpY * gridSize);
    drawingContext.setLineDash([]);

    // Info panel
    let boxX = canvasWidth - 230;
    let boxY = 15;
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, 220, 120, 8);

    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    fill(40);
    textStyle(BOLD);
    text('y = ' + m.toFixed(1) + 'x + ' + b.toFixed(1), boxX + 10, boxY + 10);
    text('r = ' + circleR.toFixed(1), boxX + 10, boxY + 30);
    textStyle(NORMAL);

    fill(100);
    text('Distance to line: ' + perpDist.toFixed(2), boxX + 10, boxY + 55);

    let caseColor, caseText;
    if (numIntersections === 2) {
        caseColor = color(76, 175, 80);
        caseText = '2 intersections (Secant)';
    } else if (numIntersections === 1) {
        caseColor = color(255, 193, 7);
        caseText = '1 intersection (Tangent)';
    } else {
        caseColor = color(220, 20, 60);
        caseText = '0 intersections (No contact)';
    }
    fill(caseColor);
    textStyle(BOLD);
    text(caseText, boxX + 10, boxY + 78);
    textStyle(NORMAL);
    fill(100);
    textSize(11);
    let rel = perpDist < circleR ? 'd < r' : (abs(perpDist - circleR) < 0.05 ? 'd = r' : 'd > r');
    text('d ' + (perpDist < circleR ? '<' : (abs(perpDist - circleR) < 0.05 ? '≈' : '>')) + ' r', boxX + 10, boxY + 100);

    // Controls
    drawControls();
}

function drawIntersectionPoint(wx, wy) {
    let px = originX + wx * gridSize;
    let py = originY - wy * gridSize;
    fill(220, 20, 60);
    noStroke();
    ellipse(px, py, 12);

    fill(220, 20, 60);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('(' + wx.toFixed(1) + ', ' + wy.toFixed(1) + ')', px, py - 8);
}

function drawGrid() {
    stroke(235);
    strokeWeight(1);
    let xRange = ceil(canvasWidth / (2 * gridSize));
    let yRange = ceil(drawHeight / (2 * gridSize));

    for (let i = -xRange; i <= xRange; i++) {
        line(originX + i * gridSize, 0, originX + i * gridSize, drawHeight);
    }
    for (let i = -yRange; i <= yRange; i++) {
        line(0, originY + i * gridSize, canvasWidth, originY + i * gridSize);
    }

    stroke(80);
    strokeWeight(2);
    line(0, originY, canvasWidth, originY);
    line(originX, 0, originX, drawHeight);

    fill(80);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = -xRange; i <= xRange; i++) {
        if (i === 0) continue;
        text(i, originX + i * gridSize, originY + 4);
    }
}

function drawControls() {
    let y = drawHeight + 8;
    let slW = 170;
    let configs = [
        { x: 20, label: 'Radius (r)', val: circleR, min: 0.5, max: 5 },
        { x: 220, label: 'Slope (m)', val: lineSlope, min: -3, max: 3 },
        { x: 420, label: 'Intercept (b)', val: lineIntercept, min: -5, max: 5 }
    ];

    for (let i = 0; i < configs.length; i++) {
        let c = configs[i];
        fill(60);
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);
        text(c.label + ': ' + c.val.toFixed(1), c.x, y);

        let trackY = y + 18;
        stroke(180);
        strokeWeight(3);
        line(c.x, trackY, c.x + slW, trackY);

        let thumbX = map(c.val, c.min, c.max, c.x, c.x + slW);
        fill(33, 150, 243);
        noStroke();
        ellipse(thumbX, trackY, 14);
    }
}

function mousePressed() {
    let y = drawHeight + 8;
    let slW = 170;
    let trackY = y + 18;
    let xs = [20, 220, 420];

    for (let i = 0; i < 3; i++) {
        if (abs(mouseY - trackY) < 12 && mouseX > xs[i] - 5 && mouseX < xs[i] + slW + 5) {
            draggingSlider = i;
            return;
        }
    }
}

function mouseDragged() {
    let slW = 170;
    let configs = [
        { x: 20, min: 0.5, max: 5 },
        { x: 220, min: -3, max: 3 },
        { x: 420, min: -5, max: 5 }
    ];

    if (draggingSlider >= 0) {
        let c = configs[draggingSlider];
        let val = constrain(map(mouseX, c.x, c.x + slW, c.min, c.max), c.min, c.max);
        val = round(val * 10) / 10;
        if (draggingSlider === 0) circleR = val;
        else if (draggingSlider === 1) lineSlope = val;
        else lineIntercept = val;
    }
}

function mouseReleased() {
    draggingSlider = -1;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    originX = canvasWidth / 2;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
