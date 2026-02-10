// Rolling Wheel Distance MicroSim
// Shows arc length = distance traveled

let canvasWidth = 710;
let drawHeight = 340;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let wheelRadius = 50;
let rotationAngle = 180;
let animating = false;
let animProgress = 0;
let draggingSlider = -1;

let groundY;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    groundY = drawHeight - 50;
}

function draw() {
    background(240, 248, 255);

    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Rolling Wheel: Arc Length = Distance', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Ground
    stroke(139, 119, 101);
    strokeWeight(3);
    line(30, groundY, canvasWidth - 30, groundY);

    // Calculate positions
    let totalArcLength = (rotationAngle / 360) * TWO_PI * wheelRadius;
    let currentAngle = animating ? rotationAngle * animProgress : rotationAngle;
    let currentDist = (currentAngle / 360) * TWO_PI * wheelRadius;

    let startX = 80 + wheelRadius;
    let wheelX = startX + currentDist;
    let wheelY = groundY - wheelRadius;

    // Start marker
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(startX, groundY + 5, startX, groundY - wheelRadius * 2 - 10);
    drawingContext.setLineDash([]);
    fill(100);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('Start', startX, groundY + 8);

    // Distance marker
    if (currentDist > 5) {
        // Arrow showing distance
        stroke(220, 20, 60);
        strokeWeight(2);
        line(startX, groundY + 25, startX + currentDist, groundY + 25);
        // Arrowhead
        let ax = startX + currentDist;
        line(ax, groundY + 25, ax - 8, groundY + 20);
        line(ax, groundY + 25, ax - 8, groundY + 30);

        fill(220, 20, 60);
        noStroke();
        textSize(12);
        textAlign(CENTER, TOP);
        text('Distance = ' + currentDist.toFixed(1) + ' px', startX + currentDist / 2, groundY + 32);
    }

    // Draw wheel
    let angleRad = radians(currentAngle);

    push();
    translate(wheelX, wheelY);

    // Wheel outline
    stroke(33, 150, 243);
    strokeWeight(3);
    noFill();
    ellipse(0, 0, wheelRadius * 2);

    // Hub
    fill(33, 150, 243);
    noStroke();
    ellipse(0, 0, 8);

    // Spokes
    stroke(33, 150, 243, 150);
    strokeWeight(1.5);
    for (let i = 0; i < 6; i++) {
        let a = -angleRad + i * PI / 3;
        line(0, 0, wheelRadius * 0.9 * cos(a), wheelRadius * 0.9 * sin(a));
    }

    // Reference point on rim (to show rotation)
    let refX = wheelRadius * cos(-angleRad);
    let refY = wheelRadius * sin(-angleRad);
    fill(220, 20, 60);
    noStroke();
    ellipse(refX, refY, 12);

    // Arc showing rotation
    if (currentAngle > 5) {
        stroke(255, 152, 0);
        strokeWeight(3);
        noFill();
        arc(0, 0, wheelRadius * 1.2, wheelRadius * 1.2, -angleRad, 0);
    }

    pop();

    // Info panel
    let boxX = canvasWidth - 230;
    let boxY = 40;
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, 215, 130, 8);

    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    fill(40);
    textStyle(BOLD);
    text('Measurements', boxX + 10, boxY + 10);
    textStyle(NORMAL);

    textSize(12);
    fill(60);
    text('Radius: ' + wheelRadius + ' px', boxX + 10, boxY + 32);
    text('Rotation: ' + currentAngle.toFixed(0) + '°', boxX + 10, boxY + 50);
    text('Full rotations: ' + (currentAngle / 360).toFixed(2), boxX + 10, boxY + 68);

    fill(255, 152, 0);
    textStyle(BOLD);
    text('Arc Length: ' + currentDist.toFixed(1) + ' px', boxX + 10, boxY + 90);
    fill(220, 20, 60);
    text('Distance: ' + currentDist.toFixed(1) + ' px', boxX + 10, boxY + 108);
    textStyle(NORMAL);

    // Animation
    if (animating) {
        animProgress += 0.012;
        if (animProgress >= 1) {
            animProgress = 1;
            animating = false;
        }
    }

    // Controls
    drawControls();
}

function drawControls() {
    let y = drawHeight + 5;
    let slW = 170;

    // Radius slider
    let x1 = 20;
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Radius: ' + wheelRadius + ' px', x1, y);
    let tY = y + 18;
    stroke(180);
    strokeWeight(3);
    line(x1, tY, x1 + slW, tY);
    let tx1 = map(wheelRadius, 20, 80, x1, x1 + slW);
    fill(33, 150, 243);
    noStroke();
    ellipse(tx1, tY, 14);

    // Rotation slider
    let x2 = x1 + slW + 30;
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Rotation: ' + rotationAngle + '°', x2, y);
    stroke(180);
    strokeWeight(3);
    line(x2, tY, x2 + slW, tY);
    let tx2 = map(rotationAngle, 0, 720, x2, x2 + slW);
    fill(255, 152, 0);
    noStroke();
    ellipse(tx2, tY, 14);

    // Animate button
    let btnX = x2 + slW + 30;
    let btnY = y;
    let btnW = 110;
    let btnH = 32;
    let hover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(hover ? '#1565C0' : '#1E88E5');
    noStroke();
    rect(btnX, btnY, btnW, btnH, 6);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(animating ? 'Rolling...' : 'Animate', btnX + btnW / 2, btnY + btnH / 2);

    // Reset button
    let resetY = y + 36;
    hover = mouseX > btnX && mouseX < btnX + btnW && mouseY > resetY && mouseY < resetY + btnH;
    fill(hover ? '#757575' : '#9E9E9E');
    rect(btnX, resetY, btnW, btnH, 6);
    fill(255);
    text('Reset', btnX + btnW / 2, resetY + btnH / 2);
}

function mousePressed() {
    let y = drawHeight + 5;
    let slW = 170;
    let tY = y + 18;
    let x1 = 20;
    let x2 = x1 + slW + 30;

    if (abs(mouseY - tY) < 12 && mouseX > x1 && mouseX < x1 + slW) {
        draggingSlider = 0;
        return;
    }
    if (abs(mouseY - tY) < 12 && mouseX > x2 && mouseX < x2 + slW) {
        draggingSlider = 1;
        return;
    }

    // Animate button
    let btnX = x2 + slW + 30;
    let btnW = 110;
    let btnH = 32;
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > y && mouseY < y + btnH) {
        if (!animating) {
            animating = true;
            animProgress = 0;
        }
    }

    // Reset button
    let resetY = y + 36;
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > resetY && mouseY < resetY + btnH) {
        animating = false;
        animProgress = 0;
    }
}

function mouseDragged() {
    let slW = 170;
    let x1 = 20;
    let x2 = x1 + slW + 30;

    if (draggingSlider === 0) {
        wheelRadius = round(constrain(map(mouseX, x1, x1 + slW, 20, 80), 20, 80) / 5) * 5;
        animProgress = 0;
        animating = false;
    } else if (draggingSlider === 1) {
        rotationAngle = round(constrain(map(mouseX, x2, x2 + slW, 0, 720), 0, 720) / 30) * 30;
        animProgress = 0;
        animating = false;
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
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
