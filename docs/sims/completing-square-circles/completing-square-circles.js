// Completing the Square for Circles MicroSim
// Step-by-step conversion from general to standard form

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let D = -4, E = 6, F = -12;
let showSteps = true;
let draggingSlider = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
}

function draw() {
    background(240, 248, 255);

    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Completing the Square for Circles', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Calculate center and radius
    let h = -D / 2;
    let k = -E / 2;
    let rSq = h * h + k * k - F;

    // Left side: step-by-step
    let stepsX = 20;
    let stepsY = 40;
    drawSteps(stepsX, stepsY, h, k, rSq);

    // Right side: circle visualization
    let vizX = canvasWidth - 230;
    let vizY = 60;
    drawCircleViz(vizX, vizY, h, k, rSq);

    // Controls
    drawControls();
}

function drawSteps(sx, sy, h, k, rSq) {
    let y = sy;
    let lineH = 26;

    textAlign(LEFT, TOP);
    textSize(13);

    // Step 0: General form
    fill('#1565C0');
    textStyle(BOLD);
    text('General Form:', sx, y);
    textStyle(NORMAL);
    y += lineH;
    fill(40);
    let dStr = D >= 0 ? '+ ' + D : '- ' + abs(D);
    let eStr = E >= 0 ? '+ ' + E : '- ' + abs(E);
    let fStr = F >= 0 ? '+ ' + F : '- ' + abs(F);
    text('x² + y² ' + dStr + 'x ' + eStr + 'y ' + fStr + ' = 0', sx + 10, y);
    y += lineH + 8;

    if (showSteps) {
        // Step 1
        fill('#7B1FA2');
        textStyle(BOLD);
        text('Step 1: Move constant, group terms', sx, y);
        textStyle(NORMAL);
        y += lineH;
        fill(40);
        text('(x² ' + dStr + 'x) + (y² ' + eStr + 'y) = ' + (-F), sx + 10, y);
        y += lineH + 8;

        // Step 2
        let hSq = h * h;
        let kSq = k * k;
        fill('#E65100');
        textStyle(BOLD);
        text('Step 2: Complete the square', sx, y);
        textStyle(NORMAL);
        y += lineH;
        fill(40);
        let addH = '+ ' + hSq.toFixed(1);
        let addK = '+ ' + kSq.toFixed(1);
        text('(x² ' + dStr + 'x ' + addH + ') + (y² ' + eStr + 'y ' + addK + ')', sx + 10, y);
        y += lineH;
        text('  = ' + (-F) + ' + ' + hSq.toFixed(1) + ' + ' + kSq.toFixed(1), sx + 10, y);
        y += lineH + 8;

        // Step 3
        fill('#2E7D32');
        textStyle(BOLD);
        text('Step 3: Factor and simplify', sx, y);
        textStyle(NORMAL);
        y += lineH;
        fill(40);
        let hSign = h >= 0 ? '- ' + h.toFixed(1) : '+ ' + abs(h).toFixed(1);
        let kSign = k >= 0 ? '- ' + k.toFixed(1) : '+ ' + abs(k).toFixed(1);
        text('(x ' + hSign + ')² + (y ' + kSign + ')² = ' + rSq.toFixed(1), sx + 10, y);
        y += lineH + 8;
    }

    // Result
    fill('#C62828');
    textStyle(BOLD);
    textSize(14);
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
    let boxW = 210;
    let boxH = 280;
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(vx, vy, boxW, boxH, 8);

    let vizCx = vx + boxW / 2;
    let vizCy = vy + boxH / 2 + 10;
    let scale = 18;
    let maxR = min(boxW, boxH) / 2 - 30;

    // Mini grid
    stroke(235);
    strokeWeight(0.5);
    for (let i = -6; i <= 6; i++) {
        line(vizCx + i * scale, vy + 30, vizCx + i * scale, vy + boxH - 10);
        line(vx + 10, vizCy + i * scale, vx + boxW - 10, vizCy + i * scale);
    }

    // Axes
    stroke(150);
    strokeWeight(1);
    line(vx + 10, vizCy, vx + boxW - 10, vizCy);
    line(vizCx, vy + 30, vizCx, vy + boxH - 10);

    if (rSq > 0) {
        let rVal = sqrt(rSq);
        let rPx = min(rVal * scale, maxR);
        let cx = vizCx + h * scale;
        let cy = vizCy - k * scale;

        // Circle
        stroke(33, 150, 243);
        strokeWeight(2.5);
        noFill();
        ellipse(cx, cy, rPx * 2);

        // Center
        fill(220, 20, 60);
        noStroke();
        ellipse(cx, cy, 7);

        // Radius line
        stroke(76, 175, 80);
        strokeWeight(1.5);
        line(cx, cy, cx + rPx, cy);
    } else {
        fill(220, 20, 60);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text('No valid circle', vizCx, vizCy);
    }

    // Title
    fill(40);
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Coordinate View', vx + boxW / 2, vy + 8);
    textStyle(NORMAL);
}

function drawControls() {
    let y = drawHeight + 5;
    let slW = 130;
    let configs = [
        { x: 20, label: 'D', val: D, min: -10, max: 10 },
        { x: 180, label: 'E', val: E, min: -10, max: 10 },
        { x: 340, label: 'F', val: F, min: -30, max: 10 }
    ];

    for (let i = 0; i < configs.length; i++) {
        let c = configs[i];
        fill(60);
        noStroke();
        textSize(12);
        textAlign(LEFT, CENTER);
        text(c.label + ' = ' + c.val, c.x, y);

        let trackY = y + 18;
        stroke(180);
        strokeWeight(3);
        line(c.x, trackY, c.x + slW, trackY);

        let thumbX = map(c.val, c.min, c.max, c.x, c.x + slW);
        fill(33, 150, 243);
        noStroke();
        ellipse(thumbX, trackY, 14);
    }

    // Toggle steps
    let tX = 510;
    let tY = y + 2;
    let hover = mouseX > tX && mouseX < tX + 140 && mouseY > tY && mouseY < tY + 28;
    fill(showSteps ? (hover ? '#2E7D32' : '#43A047') : (hover ? '#757575' : '#9E9E9E'));
    noStroke();
    rect(tX, tY, 140, 28, 6);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text((showSteps ? '✓ ' : '  ') + 'Show Steps', tX + 70, tY + 14);
}

function mousePressed() {
    let y = drawHeight + 5;
    let slW = 130;
    let trackY = y + 18;
    let configs = [
        { x: 20, min: -10, max: 10 },
        { x: 180, min: -10, max: 10 },
        { x: 340, min: -30, max: 10 }
    ];

    for (let i = 0; i < configs.length; i++) {
        let c = configs[i];
        if (abs(mouseY - trackY) < 12 && mouseX > c.x - 5 && mouseX < c.x + slW + 5) {
            draggingSlider = i;
            return;
        }
    }

    // Toggle
    let tX = 510;
    let tY = y + 2;
    if (mouseX > tX && mouseX < tX + 140 && mouseY > tY && mouseY < tY + 28) {
        showSteps = !showSteps;
    }
}

function mouseDragged() {
    let slW = 130;
    let configs = [
        { x: 20, min: -10, max: 10 },
        { x: 180, min: -10, max: 10 },
        { x: 340, min: -30, max: 10 }
    ];

    if (draggingSlider >= 0 && draggingSlider < 3) {
        let c = configs[draggingSlider];
        let val = round(constrain(map(mouseX, c.x, c.x + slW, c.min, c.max), c.min, c.max) / 2) * 2;
        if (draggingSlider === 0) D = val;
        else if (draggingSlider === 1) E = val;
        else F = val;
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
        canvasWidth = min(container.offsetWidth, 800);
        canvasWidth = max(canvasWidth, 600);
    }
}
