// Circle-Circle Intersection MicroSim
// Two circles with adjustable positions and radii

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;

let c1 = { x: 0, y: 0, r: 100 };
let c2 = { x: 140, y: 0, r: 80 };
let centerX, centerY;

let r1Slider, r2Slider, c2xSlider, c2ySlider;
let r1ValueSpan, r2ValueSpan, c2xValueSpan, c2yValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2 - 40;
    centerY = drawHeight / 2 + 10;

    // Row 1: r1 and r2
    let r1Row = createDiv();
    r1Row.parent(document.querySelector('main'));
    r1Row.position(10, drawHeight + 5);

    let r1Label = createSpan('r₁: ');
    r1Label.parent(r1Row);
    styleLabel(r1Label, 25);

    r1ValueSpan = createSpan('100');
    r1ValueSpan.parent(r1Row);
    styleValue(r1ValueSpan);

    r1Slider = createSlider(30, 160, 100, 10);
    r1Slider.parent(r1Row);
    r1Slider.size(100);

    let r2Row = createDiv();
    r2Row.parent(document.querySelector('main'));
    r2Row.position(220, drawHeight + 5);

    let r2Label = createSpan('r₂: ');
    r2Label.parent(r2Row);
    styleLabel(r2Label, 25);

    r2ValueSpan = createSpan('80');
    r2ValueSpan.parent(r2Row);
    styleValue(r2ValueSpan);

    r2Slider = createSlider(30, 160, 80, 10);
    r2Slider.parent(r2Row);
    r2Slider.size(100);

    // Row 2: C2 X and C2 Y
    let c2xRow = createDiv();
    c2xRow.parent(document.querySelector('main'));
    c2xRow.position(10, drawHeight + 28);

    let c2xLabel = createSpan('C₂ X: ');
    c2xLabel.parent(c2xRow);
    styleLabel(c2xLabel, 40);

    c2xValueSpan = createSpan('140');
    c2xValueSpan.parent(c2xRow);
    styleValue(c2xValueSpan);

    c2xSlider = createSlider(-200, 250, 140, 10);
    c2xSlider.parent(c2xRow);
    c2xSlider.size(100);

    let c2yRow = createDiv();
    c2yRow.parent(document.querySelector('main'));
    c2yRow.position(260, drawHeight + 28);

    let c2yLabel = createSpan('C₂ Y: ');
    c2yLabel.parent(c2yRow);
    styleLabel(c2yLabel, 40);

    c2yValueSpan = createSpan('0');
    c2yValueSpan.parent(c2yRow);
    styleValue(c2yValueSpan);

    c2ySlider = createSlider(-120, 120, 0, 10);
    c2ySlider.parent(c2yRow);
    c2ySlider.size(100);
}

function draw() {
    background(240, 248, 255);

    c1.r = r1Slider.value();
    c2.r = r2Slider.value();
    c2.x = c2xSlider.value();
    c2.y = c2ySlider.value();

    r1ValueSpan.html(c1.r);
    r2ValueSpan.html(c2.r);
    c2xValueSpan.html(c2.x);
    c2yValueSpan.html(c2.y);

    fill(40); noStroke();
    textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Circle-Circle Intersection Cases', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let cx1 = centerX + c1.x, cy1 = centerY + c1.y;
    let cx2 = centerX + c2.x, cy2 = centerY + c2.y;
    let d = dist(cx1, cy1, cx2, cy2);
    let r1 = c1.r, r2 = c2.r;

    // Circle 1
    stroke(33, 150, 243); strokeWeight(2.5); noFill();
    ellipse(cx1, cy1, r1 * 2);

    // Circle 2
    stroke(76, 175, 80); strokeWeight(2.5);
    ellipse(cx2, cy2, r2 * 2);

    // Centers
    fill(33, 150, 243); noStroke();
    ellipse(cx1, cy1, 8);
    fill(76, 175, 80);
    ellipse(cx2, cy2, 8);

    // Distance line
    stroke(150); strokeWeight(1.5);
    drawingContext.setLineDash([4, 4]);
    line(cx1, cy1, cx2, cy2);
    drawingContext.setLineDash([]);

    // Intersections
    let intersections = findCircleIntersections(cx1, cy1, r1, cx2, cy2, r2);
    for (let p of intersections) {
        fill(220, 20, 60); noStroke();
        ellipse(p.x, p.y, 12);
    }

    // Determine case
    let caseName, caseColor;
    let sumR = r1 + r2;
    let diffR = abs(r1 - r2);

    if (d > sumR + 1) { caseName = 'Separate (0 intersections)'; caseColor = '#EF5350'; }
    else if (abs(d - sumR) <= 1) { caseName = 'External Tangent (1 intersection)'; caseColor = '#FF9800'; }
    else if (d > diffR + 1 && d < sumR - 1) { caseName = 'Intersecting (2 intersections)'; caseColor = '#43A047'; }
    else if (abs(d - diffR) <= 1) { caseName = 'Internal Tangent (1 intersection)'; caseColor = '#FF9800'; }
    else { caseName = 'One Inside Other (0 intersections)'; caseColor = '#EF5350'; }

    // Info panel
    let boxX = 15, boxY = 35;
    fill(255, 255, 255, 240); stroke(180); strokeWeight(1);
    rect(boxX, boxY, 220, 140, 8);

    noStroke(); textAlign(LEFT, TOP); textSize(12);

    fill(33, 150, 243);
    text('● Circle 1: r₁ = ' + r1, boxX + 10, boxY + 10);
    fill(76, 175, 80);
    text('● Circle 2: r₂ = ' + r2, boxX + 10, boxY + 28);
    fill(60);
    text('Distance: d = ' + d.toFixed(1), boxX + 10, boxY + 50);
    text('r₁ + r₂ = ' + sumR.toFixed(0), boxX + 10, boxY + 68);
    text('|r₁ - r₂| = ' + diffR.toFixed(0), boxX + 10, boxY + 86);

    fill(caseColor); textStyle(BOLD); textSize(12);
    text(caseName, boxX + 10, boxY + 110);
    textStyle(NORMAL);

    fill(100); textSize(11); textAlign(CENTER, BOTTOM);
    text('d = ' + d.toFixed(1), (cx1 + cx2) / 2, min(cy1, cy2) - 5);
}

function findCircleIntersections(x1, y1, r1, x2, y2, r2) {
    let d = dist(x1, y1, x2, y2);
    if (d > r1 + r2 + 1 || d < abs(r1 - r2) - 1 || d < 0.001) return [];

    let a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    let hSq = r1 * r1 - a * a;
    if (hSq < 0) return [];
    let h = sqrt(max(0, hSq));

    let mx = x1 + a * (x2 - x1) / d;
    let my = y1 + a * (y2 - y1) / d;

    if (h < 0.5) return [{ x: mx, y: my }];

    let dx = h * (y2 - y1) / d;
    let dy = h * (x2 - x1) / d;

    return [
        { x: mx + dx, y: my - dy },
        { x: mx - dx, y: my + dy }
    ];
}

function styleLabel(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 60) + 'px');
}

function styleValue(el) {
    el.style('display', 'inline-block');
    el.style('width', '35px');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    centerX = canvasWidth / 2 - 40;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
