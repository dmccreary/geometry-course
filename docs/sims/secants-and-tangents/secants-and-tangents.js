// Secants and Tangents MicroSim
// Shows the difference between secant and tangent lines

let canvasWidth = 710;
let drawHeight = 420;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;

let circleR = 120;
let centerX, centerY;
let tangentAngle = 45;
let secantAngle = 200;
let showRightAngle = true;

let tangentSlider, secantSlider, rightAngleCheckbox;
let tangentValueSpan, secantValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2 - 40;
    centerY = drawHeight / 2 + 10;

    // Tangent angle slider row
    let tangentRow = createDiv();
    tangentRow.parent(document.querySelector('main'));
    tangentRow.position(10, drawHeight + 5);

    let tangentLabel = createSpan('Tangent: ');
    tangentLabel.parent(tangentRow);
    styleLabel(tangentLabel, 70);

    tangentValueSpan = createSpan('45°');
    tangentValueSpan.parent(tangentRow);
    styleValue(tangentValueSpan);

    tangentSlider = createSlider(0, 360, 45, 1);
    tangentSlider.parent(tangentRow);
    tangentSlider.size(120);

    // Secant angle slider row
    let secantRow = createDiv();
    secantRow.parent(document.querySelector('main'));
    secantRow.position(10, drawHeight + 28);

    let secantLabel = createSpan('Secant: ');
    secantLabel.parent(secantRow);
    styleLabel(secantLabel, 70);

    secantValueSpan = createSpan('200°');
    secantValueSpan.parent(secantRow);
    styleValue(secantValueSpan);

    secantSlider = createSlider(0, 360, 200, 1);
    secantSlider.parent(secantRow);
    secantSlider.size(120);

    // Right angle checkbox
    rightAngleCheckbox = createCheckbox('Right Angle', true);
    rightAngleCheckbox.parent(document.querySelector('main'));
    rightAngleCheckbox.position(340, drawHeight + 15);
}

function draw() {
    background(240, 248, 255);

    tangentAngle = tangentSlider.value();
    secantAngle = secantSlider.value();
    showRightAngle = rightAngleCheckbox.checked();

    tangentValueSpan.html(tangentAngle + '°');
    secantValueSpan.html(secantAngle + '°');

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Secants and Tangents', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Circle
    stroke(100);
    strokeWeight(2);
    noFill();
    ellipse(centerX, centerY, circleR * 2);

    // Center
    fill(100);
    noStroke();
    ellipse(centerX, centerY, 6);

    drawTangent();
    drawSecant();
    drawLegend();
}

function drawTangent() {
    let tRad = radians(tangentAngle);
    let tx = centerX + circleR * cos(tRad);
    let ty = centerY - circleR * sin(tRad);
    let dx = sin(tRad);
    let dy = cos(tRad);
    let ext = 200;

    stroke(220, 20, 60);
    strokeWeight(2.5);
    line(tx - dx * ext, ty - dy * ext, tx + dx * ext, ty + dy * ext);

    stroke(76, 175, 80);
    strokeWeight(2);
    line(centerX, centerY, tx, ty);

    fill(220, 20, 60);
    noStroke();
    ellipse(tx, ty, 10);

    if (showRightAngle) {
        let sz = 15;
        let rx = -cos(tRad) * sz;
        let ry = sin(tRad) * sz;
        let tdx = dx * sz;
        let tdy = dy * sz;
        stroke(76, 175, 80);
        strokeWeight(1.5);
        noFill();
        line(tx + tdx, ty + tdy, tx + tdx + rx, ty + tdy + ry);
        line(tx + rx, ty + ry, tx + tdx + rx, ty + tdy + ry);
    }

    noStroke();
    fill(220, 20, 60);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Tangent', tx + dx * (ext - 30), ty + dy * (ext - 30) - 14);

    fill(76, 175, 80);
    textSize(12);
    let rmx = (centerX + tx) / 2;
    let rmy = (centerY + ty) / 2;
    text('Radius', rmx - 20, rmy - 10);

    fill(220, 20, 60);
    textSize(11);
    text('Point of', tx + 30 * cos(tRad + PI/4), ty - 30 * sin(tRad + PI/4));
    text('Tangency', tx + 30 * cos(tRad + PI/4), ty - 30 * sin(tRad + PI/4) + 14);
}

function drawSecant() {
    let sRad = radians(secantAngle);
    let dirX = cos(sRad);
    let dirY = -sin(sRad);

    let extDist = circleR + 120;
    let px = centerX - dirX * extDist;
    let py = centerY - dirY * extDist;

    let fx = px - centerX, fy = py - centerY;
    let a = dirX * dirX + dirY * dirY;
    let b = 2 * (fx * dirX + fy * dirY);
    let c = fx * fx + fy * fy - circleR * circleR;
    let disc = b * b - 4 * a * c;

    if (disc >= 0) {
        let t1 = (-b - sqrt(disc)) / (2 * a);
        let t2 = (-b + sqrt(disc)) / (2 * a);
        let ix1 = px + t1 * dirX, iy1 = py + t1 * dirY;
        let ix2 = px + t2 * dirX, iy2 = py + t2 * dirY;

        stroke(33, 150, 243);
        strokeWeight(2.5);
        let lineExt = 300;
        line(px, py, px + dirX * lineExt * 2, py + dirY * lineExt * 2);

        fill(33, 150, 243);
        noStroke();
        ellipse(ix1, iy1, 10);
        ellipse(ix2, iy2, 10);

        fill(33, 150, 243);
        textSize(13);
        textAlign(CENTER, CENTER);
        let lx = px + dirX * (lineExt * 2 - 30);
        let ly = py + dirY * (lineExt * 2 - 30);
        text('Secant', lx, ly - 14);
    }
}

function drawLegend() {
    let lx = canvasWidth - 195;
    let ly = 40;
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(lx, ly, 180, 95, 8);

    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    fill(220, 20, 60);
    rect(lx + 10, ly + 18, 20, 3);
    fill(60);
    text('Tangent (1 point)', lx + 38, ly + 20);

    fill(33, 150, 243);
    rect(lx + 10, ly + 43, 20, 3);
    fill(60);
    text('Secant (2 points)', lx + 38, ly + 45);

    fill(76, 175, 80);
    rect(lx + 10, ly + 68, 20, 3);
    fill(60);
    text('Radius ⊥ Tangent', lx + 38, ly + 70);
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
