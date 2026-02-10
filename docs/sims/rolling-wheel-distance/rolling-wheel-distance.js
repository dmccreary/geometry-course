// Rolling Wheel Distance MicroSim
// Shows arc length = distance traveled

let canvasWidth = 710;
let drawHeight = 340;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;

let wheelRadius = 50;
let rotationAngle = 180;
let animating = false;
let animProgress = 0;

let groundY;

let radiusSlider, rotationSlider;
let radiusValueSpan, rotationValueSpan;
let animateBtn, resetBtn;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    groundY = drawHeight - 50;

    // Radius slider row
    let radiusRow = createDiv();
    radiusRow.parent(document.querySelector('main'));
    radiusRow.position(10, drawHeight + 5);

    let radiusLabel = createSpan('Radius: ');
    radiusLabel.parent(radiusRow);
    styleLabel(radiusLabel, 55);

    radiusValueSpan = createSpan('50 px');
    radiusValueSpan.parent(radiusRow);
    styleValue(radiusValueSpan, 45);

    radiusSlider = createSlider(20, 80, 50, 5);
    radiusSlider.parent(radiusRow);
    radiusSlider.size(120);

    // Rotation slider row
    let rotationRow = createDiv();
    rotationRow.parent(document.querySelector('main'));
    rotationRow.position(10, drawHeight + 28);

    let rotationLabel = createSpan('Rotation: ');
    rotationLabel.parent(rotationRow);
    styleLabel(rotationLabel, 55);

    rotationValueSpan = createSpan('180°');
    rotationValueSpan.parent(rotationRow);
    styleValue(rotationValueSpan, 45);

    rotationSlider = createSlider(0, 720, 180, 30);
    rotationSlider.parent(rotationRow);
    rotationSlider.size(120);

    // Buttons
    animateBtn = createButton('Animate');
    animateBtn.parent(document.querySelector('main'));
    animateBtn.position(310, drawHeight + 8);
    animateBtn.mousePressed(function() {
        if (!animating) {
            animating = true;
            animProgress = 0;
        }
    });

    resetBtn = createButton('Reset');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.position(400, drawHeight + 8);
    resetBtn.mousePressed(function() {
        animating = false;
        animProgress = 0;
    });
}

function draw() {
    background(240, 248, 255);

    wheelRadius = radiusSlider.value();
    rotationAngle = rotationSlider.value();

    radiusValueSpan.html(wheelRadius + ' px');
    rotationValueSpan.html(rotationAngle + '°');

    fill(40); noStroke();
    textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Rolling Wheel: Arc Length = Distance', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Ground
    stroke(139, 119, 101); strokeWeight(3);
    line(30, groundY, canvasWidth - 30, groundY);

    // Calculate positions
    let currentAngle = animating ? rotationAngle * animProgress : rotationAngle;
    let currentDist = (currentAngle / 360) * TWO_PI * wheelRadius;

    let startX = 80 + wheelRadius;
    let wheelX = startX + currentDist;
    let wheelY = groundY - wheelRadius;

    // Start marker
    stroke(150); strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(startX, groundY + 5, startX, groundY - wheelRadius * 2 - 10);
    drawingContext.setLineDash([]);
    fill(100); noStroke(); textSize(10); textAlign(CENTER, TOP);
    text('Start', startX, groundY + 8);

    // Distance marker
    if (currentDist > 5) {
        stroke(220, 20, 60); strokeWeight(2);
        line(startX, groundY + 25, startX + currentDist, groundY + 25);
        let ax = startX + currentDist;
        line(ax, groundY + 25, ax - 8, groundY + 20);
        line(ax, groundY + 25, ax - 8, groundY + 30);

        fill(220, 20, 60); noStroke(); textSize(12); textAlign(CENTER, TOP);
        text('Distance = ' + currentDist.toFixed(1) + ' px', startX + currentDist / 2, groundY + 32);
    }

    // Draw wheel
    let angleRad = radians(currentAngle);
    push();
    translate(wheelX, wheelY);

    stroke(33, 150, 243); strokeWeight(3); noFill();
    ellipse(0, 0, wheelRadius * 2);

    fill(33, 150, 243); noStroke();
    ellipse(0, 0, 8);

    stroke(33, 150, 243, 150); strokeWeight(1.5);
    for (let i = 0; i < 6; i++) {
        let a = -angleRad + i * PI / 3;
        line(0, 0, wheelRadius * 0.9 * cos(a), wheelRadius * 0.9 * sin(a));
    }

    let refX = wheelRadius * cos(-angleRad);
    let refY = wheelRadius * sin(-angleRad);
    fill(220, 20, 60); noStroke();
    ellipse(refX, refY, 12);

    if (currentAngle > 5) {
        stroke(255, 152, 0); strokeWeight(3); noFill();
        arc(0, 0, wheelRadius * 1.2, wheelRadius * 1.2, -angleRad, 0);
    }

    pop();

    // Info panel
    let boxX = canvasWidth - 230, boxY = 40;
    fill(255, 255, 255, 240); stroke(180); strokeWeight(1);
    rect(boxX, boxY, 215, 130, 8);

    noStroke(); textSize(13); textAlign(LEFT, TOP);
    fill(40); textStyle(BOLD);
    text('Measurements', boxX + 10, boxY + 10);
    textStyle(NORMAL);

    textSize(12); fill(60);
    text('Radius: ' + wheelRadius + ' px', boxX + 10, boxY + 32);
    text('Rotation: ' + currentAngle.toFixed(0) + '°', boxX + 10, boxY + 50);
    text('Full rotations: ' + (currentAngle / 360).toFixed(2), boxX + 10, boxY + 68);

    fill(255, 152, 0); textStyle(BOLD);
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
}

function styleLabel(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 60) + 'px');
}

function styleValue(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 35) + 'px');
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
