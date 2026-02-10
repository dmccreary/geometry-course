// Power of a Point MicroSim
// Two secants from an external point with segment products

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

let circleR = 110;
let centerX, centerY;
let pointDist = 200;
let secant1Angle = 20;
let secant2Angle = -20;

let s1Slider, s2Slider;
let s1ValueSpan, s2ValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2 - 60;
    centerY = drawHeight / 2 + 10;

    // Secant 1 angle slider
    let s1Row = createDiv();
    s1Row.parent(document.querySelector('main'));
    s1Row.position(10, drawHeight + 8);

    let s1Label = createSpan('Secant 1: ');
    s1Label.parent(s1Row);
    styleLabel(s1Label, 70);

    s1ValueSpan = createSpan('20°');
    s1ValueSpan.parent(s1Row);
    styleValue(s1ValueSpan);

    s1Slider = createSlider(-40, 40, 20, 1);
    s1Slider.parent(s1Row);
    s1Slider.size(120);

    // Secant 2 angle slider
    let s2Row = createDiv();
    s2Row.parent(document.querySelector('main'));
    s2Row.position(330, drawHeight + 8);

    let s2Label = createSpan('Secant 2: ');
    s2Label.parent(s2Row);
    styleLabel(s2Label, 70);

    s2ValueSpan = createSpan('-20°');
    s2ValueSpan.parent(s2Row);
    styleValue(s2ValueSpan);

    s2Slider = createSlider(-40, 40, -20, 1);
    s2Slider.parent(s2Row);
    s2Slider.size(120);
}

function draw() {
    background(240, 248, 255);

    secant1Angle = s1Slider.value();
    secant2Angle = s2Slider.value();
    s1ValueSpan.html(secant1Angle + '°');
    s2ValueSpan.html(secant2Angle + '°');

    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Power of a Point Theorem', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let px = centerX + pointDist;
    let py = centerY;

    // Circle
    stroke(150); strokeWeight(2); noFill();
    ellipse(centerX, centerY, circleR * 2);

    // Secants
    let s1 = drawSecant(px, py, radians(secant1Angle), [33, 150, 243]);
    let s2 = drawSecant(px, py, radians(secant2Angle), [76, 175, 80]);

    // External point
    fill(220, 20, 60); noStroke();
    ellipse(px, py, 12);
    fill(220, 20, 60);
    textSize(14); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('P', px + 10, py - 10);
    textStyle(NORMAL);

    // Center
    fill(100); ellipse(centerX, centerY, 6);

    // Product display
    if (s1 && s2) {
        let prod1 = s1.near * s1.far;
        let prod2 = s2.near * s2.far;

        let boxX = 15, boxY = 50;
        fill(255, 255, 255, 240); stroke(180); strokeWeight(1);
        rect(boxX, boxY, 220, 130, 8);

        noStroke(); textSize(13); textAlign(LEFT, TOP);

        fill(33, 150, 243);
        text('Secant 1:', boxX + 10, boxY + 10);
        fill(60); textSize(12);
        text('PA = ' + s1.near.toFixed(1) + ', PC = ' + s1.far.toFixed(1), boxX + 10, boxY + 28);
        text('PA × PC = ' + prod1.toFixed(1), boxX + 10, boxY + 44);

        fill(76, 175, 80); textSize(13);
        text('Secant 2:', boxX + 10, boxY + 66);
        fill(60); textSize(12);
        text('PB = ' + s2.near.toFixed(1) + ', PD = ' + s2.far.toFixed(1), boxX + 10, boxY + 84);
        text('PB × PD = ' + prod2.toFixed(1), boxX + 10, boxY + 100);

        let diff = abs(prod1 - prod2);
        if (diff < 1) {
            fill(46, 125, 50); textStyle(BOLD);
            text('✓ Products equal!', boxX + 10, boxY + 118);
        } else {
            fill(220, 20, 60);
            text('Diff: ' + diff.toFixed(1), boxX + 10, boxY + 118);
        }
        textStyle(NORMAL);
    }
}

function drawSecant(px, py, angle, col) {
    let dx = -cos(angle);
    let dy = -sin(angle);

    let fx = px - centerX, fy = py - centerY;
    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = fx * fx + fy * fy - circleR * circleR;
    let disc = b * b - 4 * a * c;

    if (disc < 0) return null;

    let t1 = (-b - sqrt(disc)) / (2 * a);
    let t2 = (-b + sqrt(disc)) / (2 * a);

    let i1x = px + t1 * dx, i1y = py + t1 * dy;
    let i2x = px + t2 * dx, i2y = py + t2 * dy;

    stroke(col[0], col[1], col[2]); strokeWeight(2.5);
    line(px, py, i2x + (i2x - px) * 0.1, i2y + (i2y - py) * 0.1);

    fill(col[0], col[1], col[2]); noStroke();
    ellipse(i1x, i1y, 10);
    ellipse(i2x, i2y, 10);

    let d1 = dist(px, py, i1x, i1y);
    let d2 = dist(px, py, i2x, i2y);

    textSize(11); textAlign(CENTER, CENTER);
    let perpX = dy, perpY = -dx;
    text(d1.toFixed(0), (px + i1x)/2 + perpX * 12, (py + i1y)/2 + perpY * 12);
    text(d2.toFixed(0), (px + i2x)/2 + perpX * 12, (py + i2y)/2 + perpY * 12);

    return { near: min(d1, d2), far: max(d1, d2) };
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
    centerX = canvasWidth / 2 - 60;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
