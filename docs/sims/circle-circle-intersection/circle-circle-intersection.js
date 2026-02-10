// Circle-Circle Intersection MicroSim
// Two circles with adjustable positions and radii

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let c1 = { x: 0, y: 0, r: 100 };
let c2 = { x: 140, y: 0, r: 80 };
let centerX, centerY;
let draggingSlider = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2 - 40;
    centerY = drawHeight / 2 + 10;
}

function draw() {
    background(240, 248, 255);

    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Circle-Circle Intersection Cases', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let cx1 = centerX + c1.x;
    let cy1 = centerY + c1.y;
    let cx2 = centerX + c2.x;
    let cy2 = centerY + c2.y;
    let d = dist(cx1, cy1, cx2, cy2);
    let r1 = c1.r;
    let r2 = c2.r;

    // Circle 1
    stroke(33, 150, 243);
    strokeWeight(2.5);
    noFill();
    ellipse(cx1, cy1, r1 * 2);

    // Circle 2
    stroke(76, 175, 80);
    strokeWeight(2.5);
    ellipse(cx2, cy2, r2 * 2);

    // Centers
    fill(33, 150, 243);
    noStroke();
    ellipse(cx1, cy1, 8);
    fill(76, 175, 80);
    ellipse(cx2, cy2, 8);

    // Distance line
    stroke(150);
    strokeWeight(1.5);
    drawingContext.setLineDash([4, 4]);
    line(cx1, cy1, cx2, cy2);
    drawingContext.setLineDash([]);

    // Find intersections
    let intersections = findCircleIntersections(cx1, cy1, r1, cx2, cy2, r2);
    for (let p of intersections) {
        fill(220, 20, 60);
        noStroke();
        ellipse(p.x, p.y, 12);
    }

    // Determine case
    let caseName, caseColor;
    let sumR = r1 + r2;
    let diffR = abs(r1 - r2);

    if (d > sumR + 1) {
        caseName = 'Separate (0 intersections)';
        caseColor = '#EF5350';
    } else if (abs(d - sumR) <= 1) {
        caseName = 'External Tangent (1 intersection)';
        caseColor = '#FF9800';
    } else if (d > diffR + 1 && d < sumR - 1) {
        caseName = 'Intersecting (2 intersections)';
        caseColor = '#43A047';
    } else if (abs(d - diffR) <= 1) {
        caseName = 'Internal Tangent (1 intersection)';
        caseColor = '#FF9800';
    } else {
        caseName = 'One Inside Other (0 intersections)';
        caseColor = '#EF5350';
    }

    // Info panel
    let boxX = 15;
    let boxY = 35;
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, 220, 140, 8);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);

    fill(33, 150, 243);
    text('● Circle 1: r₁ = ' + r1, boxX + 10, boxY + 10);
    fill(76, 175, 80);
    text('● Circle 2: r₂ = ' + r2, boxX + 10, boxY + 28);
    fill(60);
    text('Distance: d = ' + d.toFixed(1), boxX + 10, boxY + 50);
    text('r₁ + r₂ = ' + sumR.toFixed(0), boxX + 10, boxY + 68);
    text('|r₁ - r₂| = ' + diffR.toFixed(0), boxX + 10, boxY + 86);

    fill(caseColor);
    textStyle(BOLD);
    textSize(12);
    text(caseName, boxX + 10, boxY + 110);
    textStyle(NORMAL);

    // Distance label on line
    fill(100);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('d = ' + d.toFixed(1), (cx1 + cx2) / 2, min(cy1, cy2) - 5);

    // Controls
    drawControls();
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

    if (h < 0.5) {
        return [{ x: mx, y: my }];
    }

    let dx = h * (y2 - y1) / d;
    let dy = h * (x2 - x1) / d;

    return [
        { x: mx + dx, y: my - dy },
        { x: mx - dx, y: my + dy }
    ];
}

function drawControls() {
    let y = drawHeight + 5;
    let slW = 130;
    let configs = [
        { x: 15, label: 'r₁', val: c1.r, min: 30, max: 160 },
        { x: 165, label: 'r₂', val: c2.r, min: 30, max: 160 },
        { x: 315, label: 'C₂ X', val: c2.x, min: -200, max: 250 },
        { x: 465, label: 'C₂ Y', val: c2.y, min: -120, max: 120 }
    ];

    for (let i = 0; i < configs.length; i++) {
        let c = configs[i];
        fill(60);
        noStroke();
        textSize(11);
        textAlign(LEFT, CENTER);
        text(c.label + ': ' + nf(c.val, 0, 0), c.x, y);

        let trackY = y + 16;
        stroke(180);
        strokeWeight(3);
        line(c.x, trackY, c.x + slW, trackY);

        let thumbX = map(c.val, c.min, c.max, c.x, c.x + slW);
        fill(33, 150, 243);
        noStroke();
        ellipse(thumbX, trackY, 12);
    }
}

function mousePressed() {
    let y = drawHeight + 5;
    let slW = 130;
    let trackY = y + 16;
    let xs = [15, 165, 315, 465];

    for (let i = 0; i < 4; i++) {
        if (abs(mouseY - trackY) < 12 && mouseX > xs[i] - 5 && mouseX < xs[i] + slW + 5) {
            draggingSlider = i;
            return;
        }
    }
}

function mouseDragged() {
    let slW = 130;
    let configs = [
        { x: 15, min: 30, max: 160 },
        { x: 165, min: 30, max: 160 },
        { x: 315, min: -200, max: 250 },
        { x: 465, min: -120, max: 120 }
    ];

    if (draggingSlider >= 0) {
        let c = configs[draggingSlider];
        let val = round(constrain(map(mouseX, c.x, c.x + slW, c.min, c.max), c.min, c.max) / 10) * 10;
        if (draggingSlider === 0) c1.r = val;
        else if (draggingSlider === 1) c2.r = val;
        else if (draggingSlider === 2) c2.x = val;
        else c2.y = val;
    }
}

function mouseReleased() {
    draggingSlider = -1;
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
