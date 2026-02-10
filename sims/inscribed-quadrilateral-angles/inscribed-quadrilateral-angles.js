// Inscribed Quadrilateral Angles MicroSim
// Opposite angles sum to 180°

let canvasWidth = 710;
let drawHeight = 430;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;

let circleR = 150;
let centerX, centerY;

let vertexAngles = [30, 120, 210, 310];
let sliders = [];
let valueSpans = [];

let labels = ['A', 'B', 'C', 'D'];
let pairColors = [[220, 50, 50], [50, 50, 220], [220, 50, 50], [50, 50, 220]];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    centerX = canvasWidth / 2;
    centerY = drawHeight / 2 + 15;

    // Row 1: Vertex A and B sliders
    for (let i = 0; i < 2; i++) {
        let xOff = i * 320;
        let row = createDiv();
        row.parent(document.querySelector('main'));
        row.position(10 + xOff, drawHeight + 5);

        let label = createSpan('Vertex ' + labels[i] + ': ');
        label.parent(row);
        styleLabel(label, 70);

        let valSpan = createSpan(vertexAngles[i] + '°');
        valSpan.parent(row);
        styleValue(valSpan);

        let sl = createSlider(0, 360, vertexAngles[i], 1);
        sl.parent(row);
        sl.size(130);

        sliders.push(sl);
        valueSpans.push(valSpan);
    }

    // Row 2: Vertex C and D sliders
    for (let i = 2; i < 4; i++) {
        let xOff = (i - 2) * 320;
        let row = createDiv();
        row.parent(document.querySelector('main'));
        row.position(10 + xOff, drawHeight + 28);

        let label = createSpan('Vertex ' + labels[i] + ': ');
        label.parent(row);
        styleLabel(label, 70);

        let valSpan = createSpan(vertexAngles[i] + '°');
        valSpan.parent(row);
        styleValue(valSpan);

        let sl = createSlider(0, 360, vertexAngles[i], 1);
        sl.parent(row);
        sl.size(130);

        sliders.push(sl);
        valueSpans.push(valSpan);
    }
}

function draw() {
    background(240, 248, 255);

    for (let i = 0; i < 4; i++) {
        vertexAngles[i] = sliders[i].value();
        valueSpans[i].html(vertexAngles[i] + '°');
    }

    fill(40); noStroke();
    textSize(18); textAlign(CENTER, TOP); textStyle(BOLD);
    text('Inscribed Quadrilateral: Opposite Angles', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Circle
    stroke(150); strokeWeight(2); noFill();
    ellipse(centerX, centerY, circleR * 2);

    fill(180); noStroke();
    ellipse(centerX, centerY, 4);

    // Vertices
    let verts = [];
    for (let i = 0; i < 4; i++) {
        let a = radians(vertexAngles[i]);
        verts.push({
            x: centerX + circleR * cos(a),
            y: centerY + circleR * sin(a)
        });
    }

    // Quadrilateral
    fill(200, 220, 255, 60); stroke(60); strokeWeight(2);
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

    // Draw angle arcs and labels
    for (let i = 0; i < 4; i++) {
        let prev = verts[(i + 3) % 4];
        let curr = verts[i];
        let next = verts[(i + 1) % 4];
        let a1 = atan2(prev.y - curr.y, prev.x - curr.x);
        let a2 = atan2(next.y - curr.y, next.x - curr.x);

        stroke(pairColors[i][0], pairColors[i][1], pairColors[i][2]);
        strokeWeight(2); noFill();
        let startA = min(a1, a2);
        let endA = max(a1, a2);
        if (endA - startA > PI) {
            let temp = startA;
            startA = endA;
            endA = temp + TWO_PI;
        }
        arc(curr.x, curr.y, 30, 30, startA, endA);

        fill(pairColors[i][0], pairColors[i][1], pairColors[i][2]); noStroke();
        ellipse(curr.x, curr.y, 12);

        let outAngle = radians(vertexAngles[i]);
        textSize(16); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(labels[i], curr.x + 22 * cos(outAngle), curr.y + 22 * sin(outAngle));

        textSize(11); textStyle(NORMAL);
        let midAngle = (startA + endA) / 2;
        text(angles[i].toFixed(1) + '°', curr.x + 32 * cos(midAngle), curr.y + 32 * sin(midAngle));
    }

    // Info panel
    let boxX = canvasWidth - 210, boxY = 40;
    fill(255, 255, 255, 240); stroke(180); strokeWeight(1);
    rect(boxX, boxY, 198, 120, 8);

    noStroke(); textSize(13); textAlign(LEFT, TOP);
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

    if (abs(sumAC - 180) < 2 && abs(sumBD - 180) < 2) {
        fill(46, 125, 50); textSize(12); textStyle(BOLD); textAlign(CENTER, TOP);
        text('✓ Opposite angles are supplementary!', canvasWidth / 2, drawHeight - 20);
        textStyle(NORMAL);
    }
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
    centerX = canvasWidth / 2;
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 710);
        canvasWidth = max(canvasWidth, 550);
    }
}
