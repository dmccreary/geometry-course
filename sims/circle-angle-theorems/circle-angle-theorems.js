// Circle Angle Theorems MicroSim
// Three modes: Chord-Chord, Tangent-Chord, Secant-Secant

let canvasWidth = 900;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let activeTab = 0;
let arc1 = 100;
let arc2 = 60;

let tabLabels = ['Chord-Chord', 'Tangent-Chord', 'Secant-Secant'];
let tabColors = ['#1565C0', '#7B1FA2', '#E65100'];

let modeSelect, arc1Slider, arc2Slider;
let arc1ValueSpan, arc2ValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Mode select
    let modeRow = createDiv();
    modeRow.parent(document.querySelector('main'));
    modeRow.position(10, drawHeight + 10);

    let modeLabel = createSpan('Mode: ');
    modeLabel.parent(modeRow);
    styleLabel(modeLabel, 50);

    modeSelect = createSelect();
    modeSelect.parent(modeRow);
    modeSelect.option('Chord-Chord');
    modeSelect.option('Tangent-Chord');
    modeSelect.option('Secant-Secant');
    modeSelect.selected('Chord-Chord');

    // Arc 1 slider
    let arc1Row = createDiv();
    arc1Row.parent(document.querySelector('main'));
    arc1Row.position(250, drawHeight + 10);

    let arc1Label = createSpan('Arc 1: ');
    arc1Label.parent(arc1Row);
    styleLabel(arc1Label, 50);

    arc1ValueSpan = createSpan('100°');
    arc1ValueSpan.parent(arc1Row);
    styleValue(arc1ValueSpan);

    arc1Slider = createSlider(20, 300, 100, 10);
    arc1Slider.parent(arc1Row);
    arc1Slider.size(150);

    // Arc 2 slider
    let arc2Row = createDiv();
    arc2Row.parent(document.querySelector('main'));
    arc2Row.position(550, drawHeight + 10);

    let arc2Label = createSpan('Arc 2: ');
    arc2Label.parent(arc2Row);
    styleLabel(arc2Label, 50);

    arc2ValueSpan = createSpan('60°');
    arc2ValueSpan.parent(arc2Row);
    styleValue(arc2ValueSpan);

    arc2Slider = createSlider(20, 300, 60, 10);
    arc2Slider.parent(arc2Row);
    arc2Slider.size(150);
}

function draw() {
    background(240, 248, 255);

    let modeVal = modeSelect.value();
    if (modeVal === 'Chord-Chord') activeTab = 0;
    else if (modeVal === 'Tangent-Chord') activeTab = 1;
    else activeTab = 2;

    arc1 = arc1Slider.value();
    arc2 = arc2Slider.value();
    arc1ValueSpan.html(arc1 + '°');
    arc2ValueSpan.html(arc2 + '°');

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Circle Angle Theorems', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Mode indicator
    fill(tabColors[activeTab]);
    textSize(14);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(tabLabels[activeTab], canvasWidth / 2, 32);
    textStyle(NORMAL);

    let contentY = 55;
    let contentH = drawHeight - contentY - 10;
    let cx = canvasWidth / 2;
    let cy = contentY + contentH / 2;
    let r = min(contentH, canvasWidth) * 0.28;

    if (activeTab === 0) drawChordChord(cx, cy, r);
    else if (activeTab === 1) drawTangentChord(cx, cy, r);
    else drawSecantSecant(cx, cy, r);
}

function drawChordChord(cx, cy, r) {
    let a1 = radians(arc1);
    let a2 = radians(arc2);

    let pA = { x: cx + r * cos(-a1/2), y: cy + r * sin(-a1/2) };
    let pB = { x: cx + r * cos(a1/2), y: cy + r * sin(a1/2) };
    let pC = { x: cx + r * cos(PI - a2/2), y: cy + r * sin(PI - a2/2) };
    let pD = { x: cx + r * cos(PI + a2/2), y: cy + r * sin(PI + a2/2) };

    stroke(150); strokeWeight(2); noFill();
    ellipse(cx, cy, r * 2);

    stroke(255, 193, 7); strokeWeight(5);
    arc(cx, cy, r*2, r*2, -a1/2, a1/2);
    stroke(255, 152, 0);
    arc(cx, cy, r*2, r*2, PI - a2/2, PI + a2/2);

    stroke(33, 150, 243); strokeWeight(2.5);
    line(pA.x, pA.y, pD.x, pD.y);
    stroke(76, 175, 80);
    line(pB.x, pB.y, pC.x, pC.y);

    let inter = lineIntersection(pA.x, pA.y, pD.x, pD.y, pB.x, pB.y, pC.x, pC.y);
    if (inter) {
        fill(220, 20, 60); noStroke();
        ellipse(inter.x, inter.y, 8);
    }

    fill(40); noStroke(); textSize(14); textAlign(CENTER, CENTER);
    text('A', pA.x + 15 * cos(-a1/2), pA.y + 15 * sin(-a1/2));
    text('B', pB.x + 15 * cos(a1/2), pB.y + 15 * sin(a1/2));
    text('C', pC.x + 15 * cos(PI - a2/2), pC.y + 15 * sin(PI - a2/2));
    text('D', pD.x + 15 * cos(PI + a2/2), pD.y + 15 * sin(PI + a2/2));

    fill(255, 152, 0); textSize(12);
    text('arc₁ = ' + arc1 + '°', cx + (r + 25) * cos(0), cy + (r + 25) * sin(0));
    text('arc₂ = ' + arc2 + '°', cx + (r + 25) * cos(PI), cy + (r + 25) * sin(PI));

    let angle = (arc1 + arc2) / 2;
    drawFormulaBox(cx, drawHeight - 45, 'Angle = ½(arc₁ + arc₂) = ½(' + arc1 + '° + ' + arc2 + '°) = ' + angle.toFixed(1) + '°', '#1565C0');
}

function drawTangentChord(cx, cy, r) {
    let a1 = radians(arc1);
    let tx = cx + r, ty = cy;

    stroke(150); strokeWeight(2); noFill();
    ellipse(cx, cy, r * 2);

    stroke(255, 193, 7); strokeWeight(5);
    arc(cx, cy, r*2, r*2, -a1, 0);

    stroke(220, 20, 60); strokeWeight(2.5);
    line(tx, ty - r * 1.3, tx, ty + r * 1.3);

    let chordEnd = { x: cx + r * cos(-a1), y: cy + r * sin(-a1) };
    stroke(33, 150, 243); strokeWeight(2.5);
    line(tx, ty, chordEnd.x, chordEnd.y);

    fill(220, 20, 60); noStroke(); textSize(13);
    text('Tangent', tx + 30, ty - r);
    fill(33, 150, 243);
    text('Chord', (tx + chordEnd.x)/2 + 20, (ty + chordEnd.y)/2);

    fill(255, 152, 0); textSize(12);
    let arcMid = -a1/2;
    text('arc = ' + arc1 + '°', cx + (r + 25) * cos(arcMid), cy + (r + 25) * sin(arcMid));

    fill(220, 20, 60); ellipse(tx, ty, 10);
    fill(40); textSize(12);
    text('T', tx + 12, ty + 12);

    let angle = arc1 / 2;
    drawFormulaBox(cx, drawHeight - 45, 'Angle = ½(arc) = ½(' + arc1 + '°) = ' + angle.toFixed(1) + '°', '#7B1FA2');
}

function drawSecantSecant(cx, cy, r) {
    let extDist = r * 1.8;
    let px = cx + extDist, py = cy;
    let halfSpread1 = radians(arc1 / 2);
    let halfSpread2 = radians(arc2 / 2);
    let baseAngle = PI;

    let pA = { x: cx + r * cos(baseAngle - halfSpread1), y: cy + r * sin(baseAngle - halfSpread1) };
    let pB = { x: cx + r * cos(baseAngle + halfSpread1), y: cy + r * sin(baseAngle + halfSpread1) };
    let pC = { x: cx + r * cos(-halfSpread2), y: cy + r * sin(-halfSpread2) };
    let pD = { x: cx + r * cos(halfSpread2), y: cy + r * sin(halfSpread2) };

    stroke(150); strokeWeight(2); noFill();
    ellipse(cx, cy, r * 2);

    stroke(255, 193, 7); strokeWeight(5);
    arc(cx, cy, r*2, r*2, baseAngle - halfSpread1, baseAngle + halfSpread1);
    stroke(255, 152, 0);
    arc(cx, cy, r*2, r*2, -halfSpread2, halfSpread2);

    stroke(33, 150, 243); strokeWeight(2);
    line(px, py, pA.x, pA.y);
    line(px, py, pB.x, pB.y);
    stroke(76, 175, 80);
    line(px, py, pC.x, pC.y);
    line(px, py, pD.x, pD.y);

    fill(220, 20, 60); noStroke();
    ellipse(px, py, 10);
    fill(40); textSize(13);
    text('P', px + 12, py);

    fill(255, 193, 7); textSize(12); textAlign(CENTER, CENTER);
    text('far = ' + arc1 + '°', cx + (r+25) * cos(PI), cy + (r+25) * sin(PI));
    fill(255, 152, 0);
    text('near = ' + arc2 + '°', cx + (r+25) * cos(0), cy + (r+25) * sin(0));

    let angle = abs(arc1 - arc2) / 2;
    drawFormulaBox(cx, drawHeight - 45, 'Angle = ½|far - near| = ½|' + arc1 + '° - ' + arc2 + '°| = ' + angle.toFixed(1) + '°', '#E65100');
}

function drawFormulaBox(x, y, formula, col) {
    let w = textWidth(formula) + 30;
    fill(255, 255, 255, 230);
    stroke(col); strokeWeight(2);
    rectMode(CENTER);
    rect(x, y, max(w, 300), 30, 8);
    rectMode(CORNER);
    fill(col); noStroke();
    textSize(14); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(formula, x, y);
    textStyle(NORMAL);
}

function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (abs(den) < 0.001) return null;
    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
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
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 900);
        canvasWidth = max(canvasWidth, 600);
    }
}
