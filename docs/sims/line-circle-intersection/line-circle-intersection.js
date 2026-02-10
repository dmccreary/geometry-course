// Line-Circle Intersection MicroSim
// Shows 0, 1, or 2 intersection points

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

let gridSize = 40;
let originX, originY;
let circleR = 2.5;
let lineSlope = 0.5;
let lineIntercept = 1;

let rSlider, mSlider, bSlider;
let rValueSpan, mValueSpan, bValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    originX = canvasWidth / 2;
    originY = drawHeight / 2;

    // Radius slider
    let rRow = createDiv();
    rRow.parent(document.querySelector('main'));
    rRow.position(10, drawHeight + 8);

    let rLabel = createSpan('r: ');
    rLabel.parent(rRow);
    styleLabel(rLabel, 20);

    rValueSpan = createSpan('2.5');
    rValueSpan.parent(rRow);
    styleValue(rValueSpan);

    rSlider = createSlider(0.5, 5, 2.5, 0.1);
    rSlider.parent(rRow);
    rSlider.size(110);

    // Slope slider
    let mRow = createDiv();
    mRow.parent(document.querySelector('main'));
    mRow.position(210, drawHeight + 8);

    let mLabel = createSpan('m: ');
    mLabel.parent(mRow);
    styleLabel(mLabel, 20);

    mValueSpan = createSpan('0.5');
    mValueSpan.parent(mRow);
    styleValue(mValueSpan);

    mSlider = createSlider(-3, 3, 0.5, 0.1);
    mSlider.parent(mRow);
    mSlider.size(110);

    // Intercept slider
    let bRow = createDiv();
    bRow.parent(document.querySelector('main'));
    bRow.position(420, drawHeight + 8);

    let bLabel = createSpan('b: ');
    bLabel.parent(bRow);
    styleLabel(bLabel, 20);

    bValueSpan = createSpan('1.0');
    bValueSpan.parent(bRow);
    styleValue(bValueSpan);

    bSlider = createSlider(-5, 5, 1, 0.1);
    bSlider.parent(bRow);
    bSlider.size(110);
}

function draw() {
    background(255);

    circleR = rSlider.value();
    lineSlope = mSlider.value();
    lineIntercept = bSlider.value();

    rValueSpan.html(circleR.toFixed(1));
    mValueSpan.html(lineSlope.toFixed(1));
    bValueSpan.html(lineIntercept.toFixed(1));

    drawGrid();

    // Circle at origin
    let rPx = circleR * gridSize;
    stroke(33, 150, 243); strokeWeight(3); noFill();
    ellipse(originX, originY, rPx * 2);

    fill(100); noStroke();
    ellipse(originX, originY, 6);

    // Line: y = mx + b
    let m = lineSlope, b = lineIntercept;
    let x1World = -10, x2World = 10;
    let y1World = m * x1World + b, y2World = m * x2World + b;

    let x1Px = originX + x1World * gridSize;
    let y1Px = originY - y1World * gridSize;
    let x2Px = originX + x2World * gridSize;
    let y2Px = originY - y2World * gridSize;

    let perpDist = abs(b) / sqrt(m * m + 1);

    let disc = circleR * circleR * (m * m + 1) - b * b;
    let numIntersections = 0;

    if (disc > 0.01) { numIntersections = 2; stroke(76, 175, 80); }
    else if (abs(disc) <= 0.01) { numIntersections = 1; stroke(255, 193, 7); }
    else { numIntersections = 0; stroke(220, 20, 60); }

    strokeWeight(2.5);
    line(x1Px, y1Px, x2Px, y2Px);

    // Intersections
    if (disc >= 0) {
        let a = m * m + 1;
        let bCoeff = 2 * m * b;
        let c = b * b - circleR * circleR;
        let sqrtDisc = sqrt(max(0, bCoeff * bCoeff - 4 * a * c));

        let ix1 = (-bCoeff - sqrtDisc) / (2 * a);
        let ix2 = (-bCoeff + sqrtDisc) / (2 * a);
        let iy1 = m * ix1 + b, iy2 = m * ix2 + b;

        if (disc > 0.01) {
            drawIntersectionPoint(ix1, iy1);
            drawIntersectionPoint(ix2, iy2);
        } else {
            drawIntersectionPoint(ix1, iy1);
        }
    }

    // Perpendicular from center to line
    let perpX = -m * b / (m * m + 1);
    let perpY = b / (m * m + 1);
    stroke(150); strokeWeight(1.5);
    drawingContext.setLineDash([4, 4]);
    line(originX, originY, originX + perpX * gridSize, originY - perpY * gridSize);
    drawingContext.setLineDash([]);

    // Info panel
    let boxX = canvasWidth - 230, boxY = 15;
    fill(255, 255, 255, 240); stroke(180); strokeWeight(1);
    rect(boxX, boxY, 220, 120, 8);

    noStroke(); textSize(13); textAlign(LEFT, TOP);
    fill(40); textStyle(BOLD);
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
    fill(caseColor); textStyle(BOLD);
    text(caseText, boxX + 10, boxY + 78);
    textStyle(NORMAL);
    fill(100); textSize(11);
    text('d ' + (perpDist < circleR ? '<' : (abs(perpDist - circleR) < 0.05 ? '≈' : '>')) + ' r', boxX + 10, boxY + 100);
}

function drawIntersectionPoint(wx, wy) {
    let px = originX + wx * gridSize;
    let py = originY - wy * gridSize;
    fill(220, 20, 60); noStroke();
    ellipse(px, py, 12);
    fill(220, 20, 60); textSize(10); textAlign(CENTER, BOTTOM);
    text('(' + wx.toFixed(1) + ', ' + wy.toFixed(1) + ')', px, py - 8);
}

function drawGrid() {
    stroke(235); strokeWeight(1);
    let xRange = ceil(canvasWidth / (2 * gridSize));
    let yRange = ceil(drawHeight / (2 * gridSize));

    for (let i = -xRange; i <= xRange; i++)
        line(originX + i * gridSize, 0, originX + i * gridSize, drawHeight);
    for (let i = -yRange; i <= yRange; i++)
        line(0, originY + i * gridSize, canvasWidth, originY + i * gridSize);

    stroke(80); strokeWeight(2);
    line(0, originY, canvasWidth, originY);
    line(originX, 0, originX, drawHeight);

    fill(80); noStroke(); textSize(10); textAlign(CENTER, TOP);
    for (let i = -xRange; i <= xRange; i++) {
        if (i === 0) continue;
        text(i, originX + i * gridSize, originY + 4);
    }
}

function styleLabel(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 60) + 'px');
}

function styleValue(el) {
    el.style('display', 'inline-block');
    el.style('width', '30px');
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
