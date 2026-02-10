// Completing the Square for Circles MicroSim
// Step-by-step conversion from general to standard form

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let D = -4, E = 6, F = -12;
let showSteps = true;

let dSlider, eSlider, fSlider, stepsCheckbox;
let dValueSpan, eValueSpan, fValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // D slider
    let dRow = createDiv();
    dRow.parent(document.querySelector('main'));
    dRow.position(10, drawHeight + 8);

    let dLabel = createSpan('D: ');
    dLabel.parent(dRow);
    styleLabel(dLabel, 20);

    dValueSpan = createSpan('-4');
    dValueSpan.parent(dRow);
    styleValue(dValueSpan);

    dSlider = createSlider(-10, 10, -4, 2);
    dSlider.parent(dRow);
    dSlider.size(100);

    // E slider
    let eRow = createDiv();
    eRow.parent(document.querySelector('main'));
    eRow.position(180, drawHeight + 8);

    let eLabel = createSpan('E: ');
    eLabel.parent(eRow);
    styleLabel(eLabel, 20);

    eValueSpan = createSpan('6');
    eValueSpan.parent(eRow);
    styleValue(eValueSpan);

    eSlider = createSlider(-10, 10, 6, 2);
    eSlider.parent(eRow);
    eSlider.size(100);

    // F slider
    let fRow = createDiv();
    fRow.parent(document.querySelector('main'));
    fRow.position(350, drawHeight + 8);

    let fLabel = createSpan('F: ');
    fLabel.parent(fRow);
    styleLabel(fLabel, 20);

    fValueSpan = createSpan('-12');
    fValueSpan.parent(fRow);
    styleValue(fValueSpan);

    fSlider = createSlider(-30, 10, -12, 2);
    fSlider.parent(fRow);
    fSlider.size(100);

    // Show steps checkbox
    stepsCheckbox = createCheckbox('Show Steps', true);
    stepsCheckbox.parent(document.querySelector('main'));
    stepsCheckbox.position(530, drawHeight + 10);
}

function draw() {
    background(240, 248, 255);

    D = dSlider.value();
    E = eSlider.value();
    F = fSlider.value();
    showSteps = stepsCheckbox.checked();

    dValueSpan.html(D);
    eValueSpan.html(E);
    fValueSpan.html(F);

    fill(40); noStroke();
    textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Completing the Square for Circles', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let h = -D / 2;
    let k = -E / 2;
    let rSq = h * h + k * k - F;

    drawSteps(20, 40, h, k, rSq);
    drawCircleViz(canvasWidth - 230, 60, h, k, rSq);
}

function drawSteps(sx, sy, h, k, rSq) {
    let y = sy;
    let lineH = 26;

    textAlign(LEFT, TOP); textSize(13);

    fill('#1565C0'); textStyle(BOLD);
    text('General Form:', sx, y);
    textStyle(NORMAL); y += lineH;
    fill(40);
    let dStr = D >= 0 ? '+ ' + D : '- ' + abs(D);
    let eStr = E >= 0 ? '+ ' + E : '- ' + abs(E);
    let fStr = F >= 0 ? '+ ' + F : '- ' + abs(F);
    text('x² + y² ' + dStr + 'x ' + eStr + 'y ' + fStr + ' = 0', sx + 10, y);
    y += lineH + 8;

    if (showSteps) {
        fill('#7B1FA2'); textStyle(BOLD);
        text('Step 1: Move constant, group terms', sx, y);
        textStyle(NORMAL); y += lineH;
        fill(40);
        text('(x² ' + dStr + 'x) + (y² ' + eStr + 'y) = ' + (-F), sx + 10, y);
        y += lineH + 8;

        let hSq = h * h;
        let kSq = k * k;
        fill('#E65100'); textStyle(BOLD);
        text('Step 2: Complete the square', sx, y);
        textStyle(NORMAL); y += lineH;
        fill(40);
        let addH = '+ ' + hSq.toFixed(1);
        let addK = '+ ' + kSq.toFixed(1);
        text('(x² ' + dStr + 'x ' + addH + ') + (y² ' + eStr + 'y ' + addK + ')', sx + 10, y);
        y += lineH;
        text('  = ' + (-F) + ' + ' + hSq.toFixed(1) + ' + ' + kSq.toFixed(1), sx + 10, y);
        y += lineH + 8;

        fill('#2E7D32'); textStyle(BOLD);
        text('Step 3: Factor and simplify', sx, y);
        textStyle(NORMAL); y += lineH;
        fill(40);
        let hSign = h >= 0 ? '- ' + h.toFixed(1) : '+ ' + abs(h).toFixed(1);
        let kSign = k >= 0 ? '- ' + k.toFixed(1) : '+ ' + abs(k).toFixed(1);
        text('(x ' + hSign + ')² + (y ' + kSign + ')² = ' + rSq.toFixed(1), sx + 10, y);
        y += lineH + 8;
    }

    fill('#C62828'); textStyle(BOLD); textSize(14);
    text('Result:', sx, y);
    y += lineH;

    if (rSq > 0) {
        let rVal = sqrt(rSq);
        text('Center: (' + h.toFixed(1) + ', ' + k.toFixed(1) + ')', sx + 10, y);
        y += lineH;
        text('Radius: r = ' + rVal.toFixed(2), sx + 10, y);
    } else {
        fill(220, 20, 60);
        text('r² = ' + rSq.toFixed(1) + ' (invalid circle!)', sx + 10, y);
    }
    textStyle(NORMAL);
}

function drawCircleViz(vx, vy, h, k, rSq) {
    let boxW = 210, boxH = 280;
    fill(255, 255, 255, 230); stroke(180); strokeWeight(1);
    rect(vx, vy, boxW, boxH, 8);

    let vizCx = vx + boxW / 2;
    let vizCy = vy + boxH / 2 + 10;
    let scale = 18;
    let maxR = min(boxW, boxH) / 2 - 30;

    stroke(235); strokeWeight(0.5);
    for (let i = -6; i <= 6; i++) {
        line(vizCx + i * scale, vy + 30, vizCx + i * scale, vy + boxH - 10);
        line(vx + 10, vizCy + i * scale, vx + boxW - 10, vizCy + i * scale);
    }

    stroke(150); strokeWeight(1);
    line(vx + 10, vizCy, vx + boxW - 10, vizCy);
    line(vizCx, vy + 30, vizCx, vy + boxH - 10);

    if (rSq > 0) {
        let rVal = sqrt(rSq);
        let rPx = min(rVal * scale, maxR);
        let cx = vizCx + h * scale;
        let cy = vizCy - k * scale;

        stroke(33, 150, 243); strokeWeight(2.5); noFill();
        ellipse(cx, cy, rPx * 2);

        fill(220, 20, 60); noStroke();
        ellipse(cx, cy, 7);

        stroke(76, 175, 80); strokeWeight(1.5);
        line(cx, cy, cx + rPx, cy);
    } else {
        fill(220, 20, 60); noStroke();
        textSize(14); textAlign(CENTER, CENTER);
        text('No valid circle', vizCx, vizCy);
    }

    fill(40); noStroke();
    textSize(12); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Coordinate View', vx + boxW / 2, vy + 8);
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
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 800);
        canvasWidth = max(canvasWidth, 600);
    }
}
