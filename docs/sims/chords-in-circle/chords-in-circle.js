// Chords in a Circle MicroSim
// Shows multiple chords with the diameter being the longest

let canvasWidth = 710;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;

let circleR = 140;
let centerX, centerY;
let chords = [];
let showPerpDistances = true;

let newChordsBtn, perpCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2;
    centerY = drawHeight / 2 + 15;

    let controlRow = createDiv();
    controlRow.parent(document.querySelector('main'));
    controlRow.position(10, drawHeight + 10);

    newChordsBtn = createButton('New Chords');
    newChordsBtn.parent(controlRow);
    newChordsBtn.mousePressed(generateChords);

    let spacer = createSpan(' ');
    spacer.parent(controlRow);
    spacer.style('display', 'inline-block');
    spacer.style('width', '20px');

    perpCheckbox = createCheckbox('Show Perpendicular Dist.', true);
    perpCheckbox.parent(controlRow);

    generateChords();
}

function draw() {
    background(240, 248, 255);

    showPerpDistances = perpCheckbox.checked();

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Chords in a Circle', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw circle
    stroke(100, 100, 100);
    strokeWeight(2);
    noFill();
    ellipse(centerX, centerY, circleR * 2);

    // Center point
    fill(220, 20, 60);
    noStroke();
    ellipse(centerX, centerY, 8);
    textSize(12);
    text('Center', centerX, centerY + 12);

    // Draw chords
    let colors = [
        [33, 150, 243],
        [76, 175, 80],
        [156, 39, 176],
        [220, 20, 60]
    ];
    let labels = ['Chord 1', 'Chord 2', 'Chord 3', 'Diameter'];

    for (let i = 0; i < chords.length; i++) {
        let c = chords[i];
        let col = colors[i];

        stroke(col[0], col[1], col[2]);
        strokeWeight(3);
        line(c.x1, c.y1, c.x2, c.y2);

        fill(col[0], col[1], col[2]);
        noStroke();
        ellipse(c.x1, c.y1, 8);
        ellipse(c.x2, c.y2, 8);

        let len = dist(c.x1, c.y1, c.x2, c.y2);
        let mx = (c.x1 + c.x2) / 2;
        let my = (c.y1 + c.y2) / 2;

        if (showPerpDistances) {
            let perpDist = pointToLineDist(centerX, centerY, c.x1, c.y1, c.x2, c.y2);
            let proj = projectPoint(centerX, centerY, c.x1, c.y1, c.x2, c.y2);
            stroke(col[0], col[1], col[2], 120);
            strokeWeight(1.5);
            drawingContext.setLineDash([4, 4]);
            line(centerX, centerY, proj.x, proj.y);
            drawingContext.setLineDash([]);

            fill(col[0], col[1], col[2]);
            noStroke();
            textSize(10);
            textAlign(CENTER, CENTER);
            let lx = (centerX + proj.x) / 2;
            let ly = (centerY + proj.y) / 2;
            text('d=' + perpDist.toFixed(0), lx + 12, ly);
        }

        fill(col[0], col[1], col[2]);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        let offset = (i % 2 === 0) ? -14 : 14;
        text(labels[i] + ' (' + len.toFixed(0) + 'px)', mx, my + offset);
    }

    drawInfoBox();
}

function drawInfoBox() {
    let bx = canvasWidth - 200;
    let by = 40;
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(bx, by, 185, 50, 8);
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text('The diameter is always', bx + 10, by + 10);
    text('the longest chord.', bx + 10, by + 28);
}

function generateChords() {
    chords = [];
    for (let i = 0; i < 3; i++) {
        let a1 = random(TWO_PI);
        let spread = random(PI * 0.3, PI * 0.8);
        let a2 = a1 + spread;
        chords.push({
            x1: centerX + circleR * cos(a1),
            y1: centerY + circleR * sin(a1),
            x2: centerX + circleR * cos(a2),
            y2: centerY + circleR * sin(a2)
        });
    }
    let da = random(TWO_PI);
    chords.push({
        x1: centerX + circleR * cos(da),
        y1: centerY + circleR * sin(da),
        x2: centerX - circleR * cos(da),
        y2: centerY - circleR * sin(da)
    });
}

function pointToLineDist(px, py, x1, y1, x2, y2) {
    let A = px - x1, B = py - y1, C = x2 - x1, D = y2 - y1;
    let dot = A * C + B * D;
    let lenSq = C * C + D * D;
    let param = lenSq !== 0 ? dot / lenSq : -1;
    let xx, yy;
    if (param < 0) { xx = x1; yy = y1; }
    else if (param > 1) { xx = x2; yy = y2; }
    else { xx = x1 + param * C; yy = y1 + param * D; }
    return dist(px, py, xx, yy);
}

function projectPoint(px, py, x1, y1, x2, y2) {
    let A = px - x1, B = py - y1, C = x2 - x1, D = y2 - y1;
    let dot = A * C + B * D;
    let lenSq = C * C + D * D;
    let param = lenSq !== 0 ? dot / lenSq : 0;
    return { x: x1 + param * C, y: y1 + param * D };
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    centerX = canvasWidth / 2;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
