// Circle Equation Grapher MicroSim
// Interactive coordinate plane with circle equation

let canvasWidth = 710;
let drawHeight = 440;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

let gridSize = 40;
let originX, originY;
let h = 0, k = 0, r = 3;

let hSlider, kSlider, rSlider;
let hValueSpan, kValueSpan, rValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    originX = canvasWidth / 2;
    originY = drawHeight / 2;

    // h slider
    let hRow = createDiv();
    hRow.parent(document.querySelector('main'));
    hRow.position(10, drawHeight + 8);

    let hLabel = createSpan('h: ');
    hLabel.parent(hRow);
    styleLabel(hLabel, 20);

    hValueSpan = createSpan('0.0');
    hValueSpan.parent(hRow);
    styleValue(hValueSpan);

    hSlider = createSlider(-5, 5, 0, 0.5);
    hSlider.parent(hRow);
    hSlider.size(100);

    // k slider
    let kRow = createDiv();
    kRow.parent(document.querySelector('main'));
    kRow.position(210, drawHeight + 8);

    let kLabel = createSpan('k: ');
    kLabel.parent(kRow);
    styleLabel(kLabel, 20);

    kValueSpan = createSpan('0.0');
    kValueSpan.parent(kRow);
    styleValue(kValueSpan);

    kSlider = createSlider(-5, 5, 0, 0.5);
    kSlider.parent(kRow);
    kSlider.size(100);

    // r slider
    let rRow = createDiv();
    rRow.parent(document.querySelector('main'));
    rRow.position(410, drawHeight + 8);

    let rLabel = createSpan('r: ');
    rLabel.parent(rRow);
    styleLabel(rLabel, 20);

    rValueSpan = createSpan('3.0');
    rValueSpan.parent(rRow);
    styleValue(rValueSpan);

    rSlider = createSlider(0.5, 5, 3, 0.5);
    rSlider.parent(rRow);
    rSlider.size(100);
}

function draw() {
    background(255);

    h = hSlider.value();
    k = kSlider.value();
    r = rSlider.value();
    hValueSpan.html(h.toFixed(1));
    kValueSpan.html(k.toFixed(1));
    rValueSpan.html(r.toFixed(1));

    drawGrid();
    drawCircleViz();
    drawEquation();
}

function drawGrid() {
    stroke(230); strokeWeight(1);
    let xRange = ceil(canvasWidth / (2 * gridSize));
    let yRange = ceil(drawHeight / (2 * gridSize));

    for (let i = -xRange; i <= xRange; i++) {
        let x = originX + i * gridSize;
        line(x, 0, x, drawHeight);
    }
    for (let i = -yRange; i <= yRange; i++) {
        let y = originY + i * gridSize;
        line(0, y, canvasWidth, y);
    }

    stroke(80); strokeWeight(2);
    line(0, originY, canvasWidth, originY);
    line(originX, 0, originX, drawHeight);

    fill(80); noStroke(); textSize(10); textAlign(CENTER, TOP);
    for (let i = -xRange; i <= xRange; i++) {
        if (i === 0) continue;
        text(i, originX + i * gridSize, originY + 4);
    }
    textAlign(RIGHT, CENTER);
    for (let i = -yRange; i <= yRange; i++) {
        if (i === 0) continue;
        text(i, originX - 6, originY - i * gridSize);
    }
    textAlign(RIGHT, TOP);
    text('0', originX - 5, originY + 4);
}

function drawCircleViz() {
    let cx = originX + h * gridSize;
    let cy = originY - k * gridSize;
    let rPx = r * gridSize;

    stroke(33, 150, 243); strokeWeight(3); noFill();
    ellipse(cx, cy, rPx * 2);

    fill(220, 20, 60); noStroke();
    ellipse(cx, cy, 10);

    fill(220, 20, 60); textSize(12); textAlign(LEFT, TOP);
    text('(' + h.toFixed(1) + ', ' + k.toFixed(1) + ')', cx + 8, cy + 5);

    stroke(76, 175, 80); strokeWeight(2);
    line(cx, cy, cx + rPx, cy);

    fill(76, 175, 80); noStroke(); textSize(12); textAlign(CENTER, BOTTOM);
    text('r = ' + r.toFixed(1), cx + rPx / 2, cy - 5);
}

function drawEquation() {
    fill(255, 255, 255, 230); stroke(33, 150, 243); strokeWeight(2);
    let eqW = 380;
    let eqX = (canvasWidth - eqW) / 2;
    rect(eqX, 8, eqW, 34, 8);

    fill(40); noStroke(); textSize(15); textStyle(BOLD); textAlign(CENTER, CENTER);

    let hSign = h >= 0 ? ' - ' + h.toFixed(1) : ' + ' + abs(h).toFixed(1);
    let kSign = k >= 0 ? ' - ' + k.toFixed(1) : ' + ' + abs(k).toFixed(1);
    let r2 = (r * r).toFixed(2);
    let eq = '(x' + hSign + ')² + (y' + kSign + ')² = ' + r2;
    text(eq, canvasWidth / 2, 25);
    textStyle(NORMAL);
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
