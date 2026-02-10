// Circle Segment vs Sector - Side-by-side comparison
// Shows the difference between a sector and a segment

let canvasWidth = 750;
let drawHeight = 380;
let canvasHeight = drawHeight;

let circleR = 110;
let chordAngle = 100; // central angle in degrees

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
}

function draw() {
    background(240, 248, 255);

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Sector vs Segment of a Circle', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;
    let cy = drawHeight / 2 + 20;
    let angleRad = radians(chordAngle);

    // Divider
    stroke(200);
    strokeWeight(1);
    line(halfW, 35, halfW, drawHeight - 10);

    // LEFT: Sector
    drawSector(halfW / 2, cy, angleRad);

    // RIGHT: Segment
    drawSegment(halfW + halfW / 2, cy, angleRad);
}

function drawSector(cx, cy, angleRad) {
    // Title
    fill('#1565C0');
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Sector', cx, 35);
    textStyle(NORMAL);

    // Circle outline
    stroke(180);
    strokeWeight(1.5);
    noFill();
    ellipse(cx, cy, circleR * 2);

    // Sector fill
    let startA = -angleRad / 2;
    let endA = angleRad / 2;

    fill(100, 181, 246, 80);
    stroke(33, 150, 243);
    strokeWeight(2);
    beginShape();
    vertex(cx, cy);
    for (let a = startA; a <= endA; a += 0.05) {
        vertex(cx + circleR * cos(a), cy + circleR * sin(a));
    }
    vertex(cx + circleR * cos(endA), cy + circleR * sin(endA));
    endShape(CLOSE);

    // Radii
    stroke(33, 150, 243);
    strokeWeight(2.5);
    let p1x = cx + circleR * cos(startA);
    let p1y = cy + circleR * sin(startA);
    let p2x = cx + circleR * cos(endA);
    let p2y = cy + circleR * sin(endA);
    line(cx, cy, p1x, p1y);
    line(cx, cy, p2x, p2y);

    // Arc (red, bold)
    stroke(220, 20, 60);
    strokeWeight(4);
    noFill();
    arc(cx, cy, circleR * 2, circleR * 2, startA, endA);

    // Center
    fill(33, 150, 243);
    noStroke();
    ellipse(cx, cy, 7);

    // Labels
    textSize(12);
    textAlign(CENTER, CENTER);
    fill(33, 150, 243);
    text('Radius', (cx + p1x) / 2 - 25, (cy + p1y) / 2);
    text('Radius', (cx + p2x) / 2 + 25, (cy + p2y) / 2);

    fill(220, 20, 60);
    let arcMid = 0;
    text('Arc', cx + (circleR + 18) * cos(arcMid), cy + (circleR + 18) * sin(arcMid));

    // Annotation
    fill(60);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Bounded by 2 radii + arc', cx, cy + circleR + 30);
}

function drawSegment(cx, cy, angleRad) {
    // Title
    fill('#2E7D32');
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Segment', cx, 35);
    textStyle(NORMAL);

    // Circle outline
    stroke(180);
    strokeWeight(1.5);
    noFill();
    ellipse(cx, cy, circleR * 2);

    let startA = -angleRad / 2;
    let endA = angleRad / 2;

    let p1x = cx + circleR * cos(startA);
    let p1y = cy + circleR * sin(startA);
    let p2x = cx + circleR * cos(endA);
    let p2y = cy + circleR * sin(endA);

    // Segment fill (between chord and arc)
    fill(165, 214, 167, 80);
    stroke(76, 175, 80);
    strokeWeight(2);
    beginShape();
    vertex(p1x, p1y);
    for (let a = startA; a <= endA; a += 0.05) {
        vertex(cx + circleR * cos(a), cy + circleR * sin(a));
    }
    vertex(p2x, p2y);
    endShape(CLOSE);

    // Chord
    stroke(76, 175, 80);
    strokeWeight(3);
    line(p1x, p1y, p2x, p2y);

    // Arc (red, bold)
    stroke(220, 20, 60);
    strokeWeight(4);
    noFill();
    arc(cx, cy, circleR * 2, circleR * 2, startA, endA);

    // Dashed radii (reference)
    stroke(180);
    strokeWeight(1.5);
    drawingContext.setLineDash([4, 4]);
    line(cx, cy, p1x, p1y);
    line(cx, cy, p2x, p2y);
    drawingContext.setLineDash([]);

    // Center
    fill(180);
    noStroke();
    ellipse(cx, cy, 5);

    // Labels
    textSize(12);
    textAlign(CENTER, CENTER);
    fill(76, 175, 80);
    let midChord = { x: (p1x + p2x) / 2, y: (p1y + p2y) / 2 };
    text('Chord', midChord.x, midChord.y + 16);

    fill(220, 20, 60);
    let arcMid = 0;
    text('Arc', cx + (circleR + 18) * cos(arcMid), cy + (circleR + 18) * sin(arcMid));

    // Annotation
    fill(60);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Bounded by chord + arc', cx, cy + circleR + 30);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 750);
        canvasWidth = max(canvasWidth, 500);
    }
}
