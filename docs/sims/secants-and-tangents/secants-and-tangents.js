// Secants and Tangents MicroSim
// Shows the difference between secant and tangent lines

let canvasWidth = 710;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let circleR = 120;
let centerX, centerY;
let tangentAngle = 45;
let secantAngle = 200;
let showRightAngle = true;

// Slider geometry
let sliderX, sliderW = 200;
let slider1Y, slider2Y;
let draggingSlider = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2 - 40;
    centerY = drawHeight / 2 + 10;
    sliderX = 30;
    slider1Y = drawHeight + 15;
    slider2Y = drawHeight + 48;
}

function draw() {
    background(240, 248, 255);

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

    // Controls
    drawSlider(sliderX, slider1Y, sliderW, 'Tangent Angle', tangentAngle, 0, 360);
    drawSlider(sliderX + sliderW + 60, slider2Y - 33, sliderW, 'Secant Angle', secantAngle, 0, 360);

    // Toggle
    let tX = sliderX + (sliderW + 60) * 2 + 10;
    let tY = slider1Y;
    if (tX + 150 > canvasWidth) {
        tX = sliderX;
        tY = slider2Y + 5;
    }
    drawToggleBtn(tX, tY, 150, 28, 'Right Angle', showRightAngle);

    // Legend
    drawLegend();
}

function drawTangent() {
    let tRad = radians(tangentAngle);
    // Point of tangency
    let tx = centerX + circleR * cos(tRad);
    let ty = centerY - circleR * sin(tRad);

    // Tangent direction (perpendicular to radius)
    let dx = sin(tRad);
    let dy = cos(tRad);
    let ext = 200;

    // Tangent line
    stroke(220, 20, 60);
    strokeWeight(2.5);
    line(tx - dx * ext, ty - dy * ext, tx + dx * ext, ty + dy * ext);

    // Radius to tangent point
    stroke(76, 175, 80);
    strokeWeight(2);
    line(centerX, centerY, tx, ty);

    // Point of tangency
    fill(220, 20, 60);
    noStroke();
    ellipse(tx, ty, 10);

    // Right angle indicator
    if (showRightAngle) {
        let sz = 15;
        let rx = -cos(tRad) * sz;
        let ry = sin(tRad) * sz;
        let tdx = dx * sz;
        let tdy = dy * sz;
        stroke(76, 175, 80);
        strokeWeight(1.5);
        noFill();
        // Draw the right angle square
        line(tx + tdx, ty + tdy, tx + tdx + rx, ty + tdy + ry);
        line(tx + rx, ty + ry, tx + tdx + rx, ty + tdy + ry);
    }

    // Labels
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
    // Direction from outside toward circle
    let dirX = cos(sRad);
    let dirY = -sin(sRad);

    // External point far from circle
    let extDist = circleR + 120;
    let px = centerX - dirX * extDist;
    let py = centerY - dirY * extDist;

    // Find intersections with circle
    let dx = dirX;
    let dy = dirY;
    let fx = px - centerX;
    let fy = py - centerY;
    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = fx * fx + fy * fy - circleR * circleR;
    let disc = b * b - 4 * a * c;

    if (disc >= 0) {
        let t1 = (-b - sqrt(disc)) / (2 * a);
        let t2 = (-b + sqrt(disc)) / (2 * a);
        let ix1 = px + t1 * dx;
        let iy1 = py + t1 * dy;
        let ix2 = px + t2 * dx;
        let iy2 = py + t2 * dy;

        // Secant line
        stroke(33, 150, 243);
        strokeWeight(2.5);
        let lineExt = 300;
        line(px, py, px + dx * lineExt * 2, py + dy * lineExt * 2);

        // Intersection points
        fill(33, 150, 243);
        noStroke();
        ellipse(ix1, iy1, 10);
        ellipse(ix2, iy2, 10);

        // Label
        fill(33, 150, 243);
        textSize(13);
        textAlign(CENTER, CENTER);
        let lx = px + dx * (lineExt * 2 - 30);
        let ly = py + dy * (lineExt * 2 - 30);
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

function drawSlider(x, y, w, label, val, minV, maxV) {
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(label + ': ' + nf(val, 0, 0) + '°', x, y - 2);

    // Track
    let trackY = y + 16;
    stroke(180);
    strokeWeight(3);
    line(x, trackY, x + w, trackY);

    // Thumb
    let thumbX = map(val, minV, maxV, x, x + w);
    fill(33, 150, 243);
    noStroke();
    ellipse(thumbX, trackY, 14);
}

function drawToggleBtn(x, y, w, h, label, state) {
    let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    fill(state ? (hover ? '#2E7D32' : '#43A047') : (hover ? '#757575' : '#9E9E9E'));
    noStroke();
    rect(x, y, w, h, 6);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text((state ? '✓ ' : '  ') + label, x + w / 2, y + h / 2);
}

function mousePressed() {
    checkSliderDrag();
    // Toggle
    let tX = sliderX + (sliderW + 60) * 2 + 10;
    let tY = slider1Y;
    if (tX + 150 > canvasWidth) {
        tX = sliderX;
        tY = slider2Y + 5;
    }
    if (mouseX > tX && mouseX < tX + 150 && mouseY > tY && mouseY < tY + 28) {
        showRightAngle = !showRightAngle;
    }
}

function checkSliderDrag() {
    let trackY1 = slider1Y + 16;
    let trackY2 = slider2Y - 33 + 16;
    let x1 = sliderX;
    let x2 = sliderX + sliderW + 60;

    if (abs(mouseY - trackY1) < 12 && mouseX > x1 && mouseX < x1 + sliderW) {
        draggingSlider = 0;
    } else if (abs(mouseY - trackY2) < 12 && mouseX > x2 && mouseX < x2 + sliderW) {
        draggingSlider = 1;
    }
}

function mouseDragged() {
    if (draggingSlider === 0) {
        tangentAngle = constrain(map(mouseX, sliderX, sliderX + sliderW, 0, 360), 0, 360);
    } else if (draggingSlider === 1) {
        let x2 = sliderX + sliderW + 60;
        secantAngle = constrain(map(mouseX, x2, x2 + sliderW, 0, 360), 0, 360);
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
