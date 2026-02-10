// Circle Equation Grapher MicroSim
// Interactive coordinate plane with circle equation

let canvasWidth = 710;
let drawHeight = 440;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let gridSize = 40; // pixels per unit
let originX, originY;
let h = 0, k = 0, r = 3;
let draggingSlider = -1;

let sliderConfigs;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    originX = canvasWidth / 2;
    originY = drawHeight / 2;
    sliderConfigs = [
        { x: 20, label: 'h', min: -5, max: 5, get: () => h, set: v => h = v },
        { x: 220, label: 'k', min: -5, max: 5, get: () => k, set: v => k = v },
        { x: 420, label: 'r', min: 0.5, max: 5, get: () => r, set: v => r = v }
    ];
}

function draw() {
    background(255);

    drawGrid();
    drawCircle();
    drawEquation();
    drawControls();
}

function drawGrid() {
    // Grid lines
    stroke(230);
    strokeWeight(1);
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

    // Axes
    stroke(80);
    strokeWeight(2);
    line(0, originY, canvasWidth, originY);
    line(originX, 0, originX, drawHeight);

    // Tick labels
    fill(80);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = -xRange; i <= xRange; i++) {
        if (i === 0) continue;
        let x = originX + i * gridSize;
        text(i, x, originY + 4);
    }
    textAlign(RIGHT, CENTER);
    for (let i = -yRange; i <= yRange; i++) {
        if (i === 0) continue;
        let y = originY - i * gridSize;
        text(i, originX - 6, y);
    }

    // Origin label
    textAlign(RIGHT, TOP);
    text('0', originX - 5, originY + 4);
}

function drawCircle() {
    let cx = originX + h * gridSize;
    let cy = originY - k * gridSize;
    let rPx = r * gridSize;

    // Circle
    stroke(33, 150, 243);
    strokeWeight(3);
    noFill();
    ellipse(cx, cy, rPx * 2);

    // Center point
    fill(220, 20, 60);
    noStroke();
    ellipse(cx, cy, 10);

    // Center label
    fill(220, 20, 60);
    textSize(12);
    textAlign(LEFT, TOP);
    let hStr = h >= 0 ? h.toFixed(1) : h.toFixed(1);
    let kStr = k >= 0 ? k.toFixed(1) : k.toFixed(1);
    text('(' + hStr + ', ' + kStr + ')', cx + 8, cy + 5);

    // Radius line
    stroke(76, 175, 80);
    strokeWeight(2);
    line(cx, cy, cx + rPx, cy);

    // Radius label
    fill(76, 175, 80);
    noStroke();
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('r = ' + r.toFixed(1), cx + rPx / 2, cy - 5);
}

function drawEquation() {
    // Equation display at top
    fill(255, 255, 255, 230);
    stroke(33, 150, 243);
    strokeWeight(2);
    let eqW = 380;
    let eqX = (canvasWidth - eqW) / 2;
    rect(eqX, 8, eqW, 34, 8);

    fill(40);
    noStroke();
    textSize(15);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    let hSign = h >= 0 ? ' - ' + h.toFixed(1) : ' + ' + abs(h).toFixed(1);
    let kSign = k >= 0 ? ' - ' + k.toFixed(1) : ' + ' + abs(k).toFixed(1);
    let r2 = (r * r).toFixed(2);
    let eq = '(x' + hSign + ')² + (y' + kSign + ')² = ' + r2;
    text(eq, canvasWidth / 2, 25);
    textStyle(NORMAL);
}

function drawControls() {
    let y = drawHeight + 8;
    let slW = 160;

    for (let i = 0; i < sliderConfigs.length; i++) {
        let cfg = sliderConfigs[i];
        let x = cfg.x;
        let val = cfg.get();

        fill(60);
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);
        text(cfg.label + ' = ' + val.toFixed(1), x, y);

        let trackY = y + 18;
        stroke(180);
        strokeWeight(3);
        line(x, trackY, x + slW, trackY);

        let thumbX = map(val, cfg.min, cfg.max, x, x + slW);
        fill(33, 150, 243);
        noStroke();
        ellipse(thumbX, trackY, 14);
    }
}

function mousePressed() {
    let y = drawHeight + 8;
    let slW = 160;
    let trackY = y + 18;

    for (let i = 0; i < sliderConfigs.length; i++) {
        let cfg = sliderConfigs[i];
        if (abs(mouseY - trackY) < 12 && mouseX > cfg.x - 5 && mouseX < cfg.x + slW + 5) {
            draggingSlider = i;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider >= 0) {
        let cfg = sliderConfigs[draggingSlider];
        let slW = 160;
        let val = constrain(map(mouseX, cfg.x, cfg.x + slW, cfg.min, cfg.max), cfg.min, cfg.max);
        val = round(val * 2) / 2; // snap to 0.5
        cfg.set(val);
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
