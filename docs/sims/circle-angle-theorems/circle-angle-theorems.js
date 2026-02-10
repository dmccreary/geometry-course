// Circle Angle Theorems MicroSim
// Three panels: Chord-Chord, Tangent-Chord, Secant-Secant

let canvasWidth = 900;
let drawHeight = 440;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let activeTab = 0;
let arc1 = 100;
let arc2 = 60;
let draggingSlider = -1;

let tabLabels = ['Chord-Chord', 'Tangent-Chord', 'Secant-Secant'];
let tabColors = ['#1565C0', '#7B1FA2', '#E65100'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
}

function draw() {
    background(240, 248, 255);

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Circle Angle Theorems', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Tabs
    drawTabs();

    // Main content area
    let contentY = 65;
    let contentH = drawHeight - contentY - 10;
    let cx = canvasWidth / 2;
    let cy = contentY + contentH / 2;
    let r = min(contentH, canvasWidth) * 0.28;

    if (activeTab === 0) drawChordChord(cx, cy, r);
    else if (activeTab === 1) drawTangentChord(cx, cy, r);
    else drawSecantSecant(cx, cy, r);

    // Sliders
    drawControls();
}

function drawTabs() {
    let tabW = 150;
    let tabH = 32;
    let startX = (canvasWidth - tabW * 3 - 20) / 2;
    let tabY = 34;

    for (let i = 0; i < 3; i++) {
        let x = startX + i * (tabW + 10);
        let isActive = (i === activeTab);
        let hover = mouseX > x && mouseX < x + tabW && mouseY > tabY && mouseY < tabY + tabH;

        fill(isActive ? tabColors[i] : (hover ? '#E0E0E0' : '#F5F5F5'));
        stroke(isActive ? tabColors[i] : '#BDBDBD');
        strokeWeight(1);
        rect(x, tabY, tabW, tabH, 6, 6, 0, 0);

        fill(isActive ? 255 : 80);
        noStroke();
        textSize(13);
        textAlign(CENTER, CENTER);
        text(tabLabels[i], x + tabW / 2, tabY + tabH / 2);
    }
}

function drawChordChord(cx, cy, r) {
    // Two chords intersect inside circle
    let a1 = radians(arc1);
    let a2 = radians(arc2);

    // Points on circle
    let pA = { x: cx + r * cos(-a1/2), y: cy + r * sin(-a1/2) };
    let pB = { x: cx + r * cos(a1/2), y: cy + r * sin(a1/2) };
    let pC = { x: cx + r * cos(PI - a2/2), y: cy + r * sin(PI - a2/2) };
    let pD = { x: cx + r * cos(PI + a2/2), y: cy + r * sin(PI + a2/2) };

    // Circle
    stroke(150);
    strokeWeight(2);
    noFill();
    ellipse(cx, cy, r * 2);

    // Highlight arcs
    stroke(255, 193, 7);
    strokeWeight(5);
    arc(cx, cy, r*2, r*2, -a1/2, a1/2);
    stroke(255, 152, 0);
    arc(cx, cy, r*2, r*2, PI - a2/2, PI + a2/2);

    // Chords
    stroke(33, 150, 243);
    strokeWeight(2.5);
    line(pA.x, pA.y, pD.x, pD.y);
    stroke(76, 175, 80);
    line(pB.x, pB.y, pC.x, pC.y);

    // Intersection point
    let inter = lineIntersection(pA.x, pA.y, pD.x, pD.y, pB.x, pB.y, pC.x, pC.y);
    if (inter) {
        fill(220, 20, 60);
        noStroke();
        ellipse(inter.x, inter.y, 8);
    }

    // Points
    fill(40);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('A', pA.x + 15 * cos(-a1/2), pA.y + 15 * sin(-a1/2));
    text('B', pB.x + 15 * cos(a1/2), pB.y + 15 * sin(a1/2));
    text('C', pC.x + 15 * cos(PI - a2/2), pC.y + 15 * sin(PI - a2/2));
    text('D', pD.x + 15 * cos(PI + a2/2), pD.y + 15 * sin(PI + a2/2));

    // Arc labels
    fill(255, 152, 0);
    textSize(12);
    text('arc₁ = ' + arc1 + '°', cx + (r + 25) * cos(0), cy + (r + 25) * sin(0));
    text('arc₂ = ' + arc2 + '°', cx + (r + 25) * cos(PI), cy + (r + 25) * sin(PI));

    // Formula and result
    let angle = (arc1 + arc2) / 2;
    drawFormulaBox(cx, drawHeight - 45, 'Angle = ½(arc₁ + arc₂) = ½(' + arc1 + '° + ' + arc2 + '°) = ' + angle.toFixed(1) + '°', '#1565C0');
}

function drawTangentChord(cx, cy, r) {
    let a1 = radians(arc1);
    // Point of tangency at right
    let tx = cx + r;
    let ty = cy;

    // Circle
    stroke(150);
    strokeWeight(2);
    noFill();
    ellipse(cx, cy, r * 2);

    // Highlight intercepted arc
    stroke(255, 193, 7);
    strokeWeight(5);
    arc(cx, cy, r*2, r*2, -a1, 0);

    // Tangent line (vertical through right point)
    stroke(220, 20, 60);
    strokeWeight(2.5);
    line(tx, ty - r * 1.3, tx, ty + r * 1.3);

    // Chord from tangent point
    let chordEnd = { x: cx + r * cos(-a1), y: cy + r * sin(-a1) };
    stroke(33, 150, 243);
    strokeWeight(2.5);
    line(tx, ty, chordEnd.x, chordEnd.y);

    // Labels
    fill(220, 20, 60);
    noStroke();
    textSize(13);
    text('Tangent', tx + 30, ty - r);

    fill(33, 150, 243);
    text('Chord', (tx + chordEnd.x)/2 + 20, (ty + chordEnd.y)/2);

    fill(255, 152, 0);
    textSize(12);
    let arcMid = -a1/2;
    text('arc = ' + arc1 + '°', cx + (r + 25) * cos(arcMid), cy + (r + 25) * sin(arcMid));

    // Tangent point
    fill(220, 20, 60);
    ellipse(tx, ty, 10);
    fill(40);
    textSize(12);
    text('T', tx + 12, ty + 12);

    let angle = arc1 / 2;
    drawFormulaBox(cx, drawHeight - 45, 'Angle = ½(arc) = ½(' + arc1 + '°) = ' + angle.toFixed(1) + '°', '#7B1FA2');
}

function drawSecantSecant(cx, cy, r) {
    // External point
    let extDist = r * 1.8;
    let px = cx + extDist;
    let py = cy;

    // Secant 1 angles
    let halfSpread1 = radians(arc1 / 2);
    let halfSpread2 = radians(arc2 / 2);
    let baseAngle = PI;

    let pA = { x: cx + r * cos(baseAngle - halfSpread1), y: cy + r * sin(baseAngle - halfSpread1) };
    let pB = { x: cx + r * cos(baseAngle + halfSpread1), y: cy + r * sin(baseAngle + halfSpread1) };
    let pC = { x: cx + r * cos(-halfSpread2), y: cy + r * sin(-halfSpread2) };
    let pD = { x: cx + r * cos(halfSpread2), y: cy + r * sin(halfSpread2) };

    // Circle
    stroke(150);
    strokeWeight(2);
    noFill();
    ellipse(cx, cy, r * 2);

    // Highlight arcs
    stroke(255, 193, 7);
    strokeWeight(5);
    arc(cx, cy, r*2, r*2, baseAngle - halfSpread1, baseAngle + halfSpread1);
    stroke(255, 152, 0);
    arc(cx, cy, r*2, r*2, -halfSpread2, halfSpread2);

    // Secant lines from P
    stroke(33, 150, 243);
    strokeWeight(2);
    line(px, py, pA.x, pA.y);
    line(px, py, pB.x, pB.y);
    stroke(76, 175, 80);
    line(px, py, pC.x, pC.y);
    line(px, py, pD.x, pD.y);

    // External point
    fill(220, 20, 60);
    noStroke();
    ellipse(px, py, 10);
    fill(40);
    textSize(13);
    text('P', px + 12, py);

    // Arc labels
    fill(255, 193, 7);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('far = ' + arc1 + '°', cx + (r+25) * cos(PI), cy + (r+25) * sin(PI));
    fill(255, 152, 0);
    text('near = ' + arc2 + '°', cx + (r+25) * cos(0), cy + (r+25) * sin(0));

    let angle = abs(arc1 - arc2) / 2;
    drawFormulaBox(cx, drawHeight - 45, 'Angle = ½|far - near| = ½|' + arc1 + '° - ' + arc2 + '°| = ' + angle.toFixed(1) + '°', '#E65100');
}

function drawFormulaBox(x, y, formula, col) {
    let w = textWidth(formula) + 30;
    fill(255, 255, 255, 230);
    stroke(col);
    strokeWeight(2);
    rectMode(CENTER);
    rect(x, y, max(w, 300), 30, 8);
    rectMode(CORNER);
    fill(col);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(formula, x, y);
    textStyle(NORMAL);
}

function drawControls() {
    let y = drawHeight + 10;
    let slX = 30;
    let slW = 200;

    // Slider 1
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    let label1 = activeTab === 1 ? 'Arc: ' : 'Arc 1: ';
    text(label1 + arc1 + '°', slX, y);
    let tY = y + 18;
    stroke(180);
    strokeWeight(3);
    line(slX, tY, slX + slW, tY);
    let tx1 = map(arc1, 20, 300, slX, slX + slW);
    fill(33, 150, 243);
    noStroke();
    ellipse(tx1, tY, 14);

    // Slider 2 (disabled for tangent-chord)
    if (activeTab !== 1) {
        let slX2 = slX + slW + 60;
        fill(60);
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);
        text('Arc 2: ' + arc2 + '°', slX2, y);
        let tY2 = y + 18;
        stroke(180);
        strokeWeight(3);
        line(slX2, tY2, slX2 + slW, tY2);
        let tx2 = map(arc2, 20, 300, slX2, slX2 + slW);
        fill(76, 175, 80);
        noStroke();
        ellipse(tx2, tY2, 14);
    } else {
        let slX2 = slX + slW + 60;
        fill(160);
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);
        text('(single arc mode)', slX2, y + 10);
    }
}

function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (abs(den) < 0.001) return null;
    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

function mousePressed() {
    // Tab clicks
    let tabW = 150;
    let startX = (canvasWidth - tabW * 3 - 20) / 2;
    let tabY = 34;
    for (let i = 0; i < 3; i++) {
        let x = startX + i * (tabW + 10);
        if (mouseX > x && mouseX < x + tabW && mouseY > tabY && mouseY < tabY + 32) {
            activeTab = i;
            return;
        }
    }

    // Slider drags
    let y = drawHeight + 10;
    let slX = 30;
    let slW = 200;
    let tY = y + 18;
    if (abs(mouseY - tY) < 12 && mouseX > slX && mouseX < slX + slW) {
        draggingSlider = 0;
    }
    if (activeTab !== 1) {
        let slX2 = slX + slW + 60;
        if (abs(mouseY - tY) < 12 && mouseX > slX2 && mouseX < slX2 + slW) {
            draggingSlider = 1;
        }
    }
}

function mouseDragged() {
    let slX = 30;
    let slW = 200;
    if (draggingSlider === 0) {
        arc1 = round(constrain(map(mouseX, slX, slX + slW, 20, 300), 20, 300) / 10) * 10;
    } else if (draggingSlider === 1) {
        let slX2 = slX + slW + 60;
        arc2 = round(constrain(map(mouseX, slX2, slX2 + slW, 20, 300), 20, 300) / 10) * 10;
    }
}

function mouseReleased() {
    draggingSlider = -1;
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
