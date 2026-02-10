// Arc Types Explorer MicroSim
// Minor arcs, major arcs, and semicircles

let canvasWidth = 710;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let circleR = 140;
let centerX, centerY;
let centralAngle = 120;

// Slider
let sliderX = 30, sliderW = 250;
let sliderY;
let dragging = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2;
    centerY = drawHeight / 2 + 15;
    sliderY = drawHeight + 22;
}

function draw() {
    background(240, 248, 255);

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Arc Types: Minor, Major, and Semicircle', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Angles for points A and B
    let startAngle = -PI / 6; // Point A fixed at ~330 degrees
    let endAngle = startAngle - radians(centralAngle); // Point B

    // Draw major arc (orange, the larger arc)
    stroke(255, 152, 0);
    strokeWeight(6);
    noFill();
    // Major arc goes from endAngle back around to startAngle (the long way)
    arc(centerX, centerY, circleR * 2, circleR * 2, startAngle, endAngle + TWO_PI);

    // Draw minor arc (green, the smaller arc)
    stroke(76, 175, 80);
    strokeWeight(6);
    arc(centerX, centerY, circleR * 2, circleR * 2, endAngle, startAngle);

    // Draw circle outline (thin)
    stroke(150);
    strokeWeight(1);
    noFill();
    ellipse(centerX, centerY, circleR * 2);

    // Center point
    fill(100);
    noStroke();
    ellipse(centerX, centerY, 6);

    // Radii to A and B (dashed)
    stroke(150);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    let ax = centerX + circleR * cos(startAngle);
    let ay = centerY + circleR * sin(startAngle);
    let bx = centerX + circleR * cos(endAngle);
    let by = centerY + circleR * sin(endAngle);
    line(centerX, centerY, ax, ay);
    line(centerX, centerY, bx, by);
    drawingContext.setLineDash([]);

    // Central angle arc
    stroke(33, 150, 243);
    strokeWeight(2);
    noFill();
    arc(centerX, centerY, 50, 50, endAngle, startAngle);

    // Angle label
    fill(33, 150, 243);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    let midA = (startAngle + endAngle) / 2;
    text(centralAngle + '°', centerX + 40 * cos(midA), centerY + 40 * sin(midA));

    // Points A and B
    fill(220, 20, 60);
    noStroke();
    ellipse(ax, ay, 12);
    ellipse(bx, by, 12);

    fill(220, 20, 60);
    textSize(16);
    textStyle(BOLD);
    text('A', ax + 18 * cos(startAngle), ay + 18 * sin(startAngle));
    text('B', bx + 18 * cos(endAngle), by + 18 * sin(endAngle));
    textStyle(NORMAL);

    // Arc labels
    let minorMid = (startAngle + endAngle) / 2;
    let majorMid = minorMid + PI;
    let labelR = circleR + 30;

    let minorDeg = centralAngle;
    let majorDeg = 360 - centralAngle;

    // Determine type
    let minorLabel, majorLabel;
    if (centralAngle < 180) {
        minorLabel = 'Minor Arc AB';
        majorLabel = 'Major Arc ACB';
    } else if (centralAngle === 180) {
        minorLabel = 'Semicircle';
        majorLabel = 'Semicircle';
    } else {
        minorLabel = 'Major Arc AB';
        majorLabel = 'Minor Arc ACB';
    }

    fill(76, 175, 80);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(minorLabel, centerX + (labelR - 10) * cos(minorMid), centerY + (labelR - 10) * sin(minorMid));
    text(minorDeg + '°', centerX + (labelR + 10) * cos(minorMid), centerY + (labelR + 10) * sin(minorMid) + 16);

    fill(255, 152, 0);
    text(majorLabel, centerX + (labelR - 10) * cos(majorMid), centerY + (labelR - 10) * sin(majorMid));
    text(majorDeg + '°', centerX + (labelR + 10) * cos(majorMid), centerY + (labelR + 10) * sin(majorMid) + 16);

    // Info box
    let bx2 = canvasWidth - 210;
    let by2 = 40;
    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(bx2, by2, 195, 100, 8);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    fill(76, 175, 80);
    text('● Minor Arc: ' + min(minorDeg, majorDeg) + '°', bx2 + 10, by2 + 12);
    fill(255, 152, 0);
    text('● Major Arc: ' + max(minorDeg, majorDeg) + '°', bx2 + 10, by2 + 32);
    fill(60);
    text('Sum: ' + minorDeg + '° + ' + majorDeg + '° = 360°', bx2 + 10, by2 + 56);
    if (centralAngle === 180) {
        fill(33, 150, 243);
        textStyle(BOLD);
        text('Both arcs are semicircles!', bx2 + 10, by2 + 78);
        textStyle(NORMAL);
    }

    // Slider
    drawSlider();
}

function drawSlider() {
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Central Angle: ' + centralAngle + '°', sliderX, sliderY - 6);

    let trackY = sliderY + 10;
    stroke(180);
    strokeWeight(3);
    line(sliderX, trackY, sliderX + sliderW, trackY);

    let thumbX = map(centralAngle, 10, 350, sliderX, sliderX + sliderW);
    fill(33, 150, 243);
    noStroke();
    ellipse(thumbX, trackY, 16);
}

function mousePressed() {
    let trackY = sliderY + 10;
    if (abs(mouseY - trackY) < 14 && mouseX > sliderX - 10 && mouseX < sliderX + sliderW + 10) {
        dragging = true;
    }
}

function mouseDragged() {
    if (dragging) {
        let trackY = sliderY + 10;
        centralAngle = round(constrain(map(mouseX, sliderX, sliderX + sliderW, 10, 350), 10, 350) / 10) * 10;
    }
}

function mouseReleased() {
    dragging = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    centerX = canvasWidth / 2;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 500);
    }
}
