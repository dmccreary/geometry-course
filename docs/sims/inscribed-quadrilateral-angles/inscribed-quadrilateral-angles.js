// Inscribed Quadrilateral Angles MicroSim
// Opposite angles sum to 180°

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let circleR = 150;
let centerX, centerY;

// Vertex positions (angles on circle in degrees)
let vertexAngles = [30, 120, 210, 310];
let draggingVertex = -1;
let draggingSlider = -1;

let sliderX = 20, sliderW = 140;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2;
    centerY = drawHeight / 2 + 15;
}

function draw() {
    background(240, 248, 255);

    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Inscribed Quadrilateral: Opposite Angles', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Circle
    stroke(150);
    strokeWeight(2);
    noFill();
    ellipse(centerX, centerY, circleR * 2);

    // Center
    fill(180);
    noStroke();
    ellipse(centerX, centerY, 4);

    // Vertices
    let verts = [];
    let labels = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < 4; i++) {
        let a = radians(vertexAngles[i]);
        verts.push({
            x: centerX + circleR * cos(a),
            y: centerY + circleR * sin(a)
        });
    }

    // Draw quadrilateral
    fill(200, 220, 255, 60);
    stroke(60);
    strokeWeight(2);
    beginShape();
    for (let v of verts) vertex(v.x, v.y);
    endShape(CLOSE);

    // Calculate angles
    let angles = [];
    for (let i = 0; i < 4; i++) {
        let prev = verts[(i + 3) % 4];
        let curr = verts[i];
        let next = verts[(i + 1) % 4];
        let a1 = atan2(prev.y - curr.y, prev.x - curr.x);
        let a2 = atan2(next.y - curr.y, next.x - curr.x);
        let angle = a2 - a1;
        if (angle < 0) angle += TWO_PI;
        if (angle > PI) angle = TWO_PI - angle;
        angles.push(degrees(angle));
    }

    // Color pairs: A&C in red, B&D in blue
    let pairColors = [[220, 50, 50], [50, 50, 220], [220, 50, 50], [50, 50, 220]];

    // Draw angle arcs and labels
    for (let i = 0; i < 4; i++) {
        let prev = verts[(i + 3) % 4];
        let curr = verts[i];
        let next = verts[(i + 1) % 4];
        let a1 = atan2(prev.y - curr.y, prev.x - curr.x);
        let a2 = atan2(next.y - curr.y, next.x - curr.x);

        // Draw angle arc
        stroke(pairColors[i][0], pairColors[i][1], pairColors[i][2]);
        strokeWeight(2);
        noFill();
        let startA = min(a1, a2);
        let endA = max(a1, a2);
        if (endA - startA > PI) {
            let temp = startA;
            startA = endA;
            endA = temp + TWO_PI;
        }
        arc(curr.x, curr.y, 30, 30, startA, endA);

        // Vertex dot
        fill(pairColors[i][0], pairColors[i][1], pairColors[i][2]);
        noStroke();
        ellipse(curr.x, curr.y, 12);

        // Label
        let outAngle = radians(vertexAngles[i]);
        fill(pairColors[i][0], pairColors[i][1], pairColors[i][2]);
        textSize(16);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(labels[i], curr.x + 22 * cos(outAngle), curr.y + 22 * sin(outAngle));

        // Angle value
        textSize(11);
        textStyle(NORMAL);
        let midAngle = (startA + endA) / 2;
        text(angles[i].toFixed(1) + '°', curr.x + 32 * cos(midAngle), curr.y + 32 * sin(midAngle));
    }

    // Info panel
    let boxX = canvasWidth - 210;
    let boxY = 40;
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, 198, 120, 8);

    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    let sumAC = angles[0] + angles[2];
    let sumBD = angles[1] + angles[3];

    fill(220, 50, 50);
    text('∠A = ' + angles[0].toFixed(1) + '°', boxX + 10, boxY + 10);
    text('∠C = ' + angles[2].toFixed(1) + '°', boxX + 10, boxY + 28);
    textStyle(BOLD);
    text('∠A + ∠C = ' + sumAC.toFixed(1) + '°', boxX + 10, boxY + 48);
    textStyle(NORMAL);

    fill(50, 50, 220);
    text('∠B = ' + angles[1].toFixed(1) + '°', boxX + 10, boxY + 72);
    text('∠D = ' + angles[3].toFixed(1) + '°', boxX + 10, boxY + 90);
    textStyle(BOLD);
    text('∠B + ∠D = ' + sumBD.toFixed(1) + '°', boxX + 10, boxY + 108);
    textStyle(NORMAL);

    // Verification badge
    if (abs(sumAC - 180) < 2 && abs(sumBD - 180) < 2) {
        fill(46, 125, 50);
        textSize(12);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        text('✓ Opposite angles are supplementary!', canvasWidth / 2, drawHeight - 20);
        textStyle(NORMAL);
    }

    // Sliders
    let sy = drawHeight + 8;
    for (let i = 0; i < 4; i++) {
        let sx = sliderX + i * (sliderW + 15);
        drawVertexSlider(sx, sy, sliderW, labels[i], vertexAngles[i], pairColors[i], i);
    }
}

function drawVertexSlider(x, y, w, label, val, col, idx) {
    fill(col[0], col[1], col[2]);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Vertex ' + label + ': ' + nf(val, 0, 0) + '°', x, y);

    let trackY = y + 16;
    stroke(200);
    strokeWeight(3);
    line(x, trackY, x + w, trackY);

    let thumbX = map(val, 0, 360, x, x + w);
    fill(col[0], col[1], col[2]);
    noStroke();
    ellipse(thumbX, trackY, 12);
}

function mousePressed() {
    let sy = drawHeight + 8;
    let trackY = sy + 16;
    for (let i = 0; i < 4; i++) {
        let sx = sliderX + i * (sliderW + 15);
        if (abs(mouseY - trackY) < 12 && mouseX > sx && mouseX < sx + sliderW) {
            draggingSlider = i;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider >= 0) {
        let sx = sliderX + draggingSlider * (sliderW + 15);
        let newVal = round(constrain(map(mouseX, sx, sx + sliderW, 0, 360), 0, 360));
        vertexAngles[draggingSlider] = newVal;
    }
}

function mouseReleased() {
    draggingSlider = -1;
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
        canvasWidth = max(canvasWidth, 550);
    }
}
