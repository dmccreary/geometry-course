// Power of a Point MicroSim
// Two secants from an external point with segment products

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let circleR = 110;
let centerX, centerY;
let pointDist = 200;
let secant1Angle = 20;
let secant2Angle = -20;
let draggingSlider = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2 - 60;
    centerY = drawHeight / 2 + 10;
}

function draw() {
    background(240, 248, 255);

    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Power of a Point Theorem', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // External point P
    let px = centerX + pointDist;
    let py = centerY;

    // Circle
    stroke(150);
    strokeWeight(2);
    noFill();
    ellipse(centerX, centerY, circleR * 2);

    // Secant 1
    let s1 = drawSecant(px, py, radians(secant1Angle), [33, 150, 243]);
    // Secant 2
    let s2 = drawSecant(px, py, radians(secant2Angle), [76, 175, 80]);

    // External point
    fill(220, 20, 60);
    noStroke();
    ellipse(px, py, 12);
    fill(220, 20, 60);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('P', px + 10, py - 10);
    textStyle(NORMAL);

    // Center
    fill(100);
    ellipse(centerX, centerY, 6);

    // Product display
    if (s1 && s2) {
        let prod1 = s1.near * s1.far;
        let prod2 = s2.near * s2.far;

        let boxX = 15;
        let boxY = 50;
        fill(255, 255, 255, 240);
        stroke(180);
        strokeWeight(1);
        rect(boxX, boxY, 220, 130, 8);

        noStroke();
        textSize(13);
        textAlign(LEFT, TOP);

        fill(33, 150, 243);
        text('Secant 1:', boxX + 10, boxY + 10);
        fill(60);
        textSize(12);
        text('PA = ' + s1.near.toFixed(1) + ', PC = ' + s1.far.toFixed(1), boxX + 10, boxY + 28);
        text('PA × PC = ' + prod1.toFixed(1), boxX + 10, boxY + 44);

        fill(76, 175, 80);
        textSize(13);
        text('Secant 2:', boxX + 10, boxY + 66);
        fill(60);
        textSize(12);
        text('PB = ' + s2.near.toFixed(1) + ', PD = ' + s2.far.toFixed(1), boxX + 10, boxY + 84);
        text('PB × PD = ' + prod2.toFixed(1), boxX + 10, boxY + 100);

        // Verification
        let diff = abs(prod1 - prod2);
        if (diff < 1) {
            fill(46, 125, 50);
            textStyle(BOLD);
            text('✓ Products equal!', boxX + 10, boxY + 118);
        } else {
            fill(220, 20, 60);
            text('Diff: ' + diff.toFixed(1), boxX + 10, boxY + 118);
        }
        textStyle(NORMAL);
    }

    // Controls
    let slX = 30;
    let slW = 180;
    let y = drawHeight + 8;

    drawSlider(slX, y, slW, 'Secant 1 Angle', secant1Angle, -40, 40, 0);
    drawSlider(slX + slW + 60, y, slW, 'Secant 2 Angle', secant2Angle, -40, 40, 1);
}

function drawSecant(px, py, angle, col) {
    let dx = -cos(angle);
    let dy = -sin(angle);

    // Line-circle intersection
    let fx = px - centerX;
    let fy = py - centerY;
    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = fx * fx + fy * fy - circleR * circleR;
    let disc = b * b - 4 * a * c;

    if (disc < 0) return null;

    let t1 = (-b - sqrt(disc)) / (2 * a);
    let t2 = (-b + sqrt(disc)) / (2 * a);

    let i1x = px + t1 * dx;
    let i1y = py + t1 * dy;
    let i2x = px + t2 * dx;
    let i2y = py + t2 * dy;

    // Draw line
    stroke(col[0], col[1], col[2]);
    strokeWeight(2.5);
    line(px, py, i2x + (i2x - px) * 0.1, i2y + (i2y - py) * 0.1);

    // Intersection points
    fill(col[0], col[1], col[2]);
    noStroke();
    ellipse(i1x, i1y, 10);
    ellipse(i2x, i2y, 10);

    let d1 = dist(px, py, i1x, i1y);
    let d2 = dist(px, py, i2x, i2y);

    // Labels
    textSize(11);
    textAlign(CENTER, CENTER);
    let perpX = dy;
    let perpY = -dx;
    text(d1.toFixed(0), (px + i1x)/2 + perpX * 12, (py + i1y)/2 + perpY * 12);
    text(d2.toFixed(0), (px + i2x)/2 + perpX * 12, (py + i2y)/2 + perpY * 12);

    return { near: min(d1, d2), far: max(d1, d2) };
}

function drawSlider(x, y, w, label, val, minV, maxV, idx) {
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(label + ': ' + nf(val, 0, 0) + '°', x, y);

    let trackY = y + 18;
    stroke(180);
    strokeWeight(3);
    line(x, trackY, x + w, trackY);

    let thumbX = map(val, minV, maxV, x, x + w);
    fill(33, 150, 243);
    noStroke();
    ellipse(thumbX, trackY, 14);
}

function mousePressed() {
    let slX = 30;
    let slW = 180;
    let tY = drawHeight + 8 + 18;

    if (abs(mouseY - tY) < 12 && mouseX > slX && mouseX < slX + slW) {
        draggingSlider = 0;
    }
    let slX2 = slX + slW + 60;
    if (abs(mouseY - tY) < 12 && mouseX > slX2 && mouseX < slX2 + slW) {
        draggingSlider = 1;
    }
}

function mouseDragged() {
    let slX = 30;
    let slW = 180;
    if (draggingSlider === 0) {
        secant1Angle = round(constrain(map(mouseX, slX, slX + slW, -40, 40), -40, 40));
    } else if (draggingSlider === 1) {
        let slX2 = slX + slW + 60;
        secant2Angle = round(constrain(map(mouseX, slX2, slX2 + slW, -40, 40), -40, 40));
    }
}

function mouseReleased() {
    draggingSlider = -1;
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
