// Inscribed and Circumscribed Polygons MicroSim
// Side-by-side comparison

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

let numSides = 5;
let circleR = 120;

let sidesSlider;
let sidesValueSpan;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    let row = createDiv();
    row.parent(document.querySelector('main'));
    row.position(10, drawHeight + 8);

    let label = createSpan('Sides: ');
    label.parent(row);
    styleLabel(label, 45);

    sidesValueSpan = createSpan('5');
    sidesValueSpan.parent(row);
    styleValue(sidesValueSpan);

    sidesSlider = createSlider(3, 10, 5, 1);
    sidesSlider.parent(row);
    sidesSlider.size(200);
}

function draw() {
    background(240, 248, 255);

    numSides = sidesSlider.value();
    sidesValueSpan.html(numSides + ' (' + polygonName(numSides) + ')');

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Inscribed vs Circumscribed Polygons', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;

    drawPanel(halfW / 2, drawHeight / 2 + 20, 'Inscribed Polygon', 'Vertices on circle', true);
    drawPanel(halfW + halfW / 2, drawHeight / 2 + 20, 'Circumscribed Polygon', 'Sides tangent to circle', false);

    // Divider
    stroke(200); strokeWeight(1);
    line(halfW, 40, halfW, drawHeight - 10);
}

function drawPanel(cx, cy, title, subtitle, isInscribed) {
    fill(40); noStroke();
    textSize(14); textStyle(BOLD); textAlign(CENTER, TOP);
    text(title, cx, 35);
    textStyle(NORMAL);
    fill(100); textSize(11);
    text('(' + subtitle + ')', cx, 53);

    if (isInscribed) {
        stroke(33, 150, 243); strokeWeight(2); noFill();
        ellipse(cx, cy, circleR * 2);

        let vertices = [];
        for (let i = 0; i < numSides; i++) {
            let angle = -PI/2 + (TWO_PI * i / numSides);
            vertices.push({
                x: cx + circleR * cos(angle),
                y: cy + circleR * sin(angle)
            });
        }

        fill(33, 150, 243, 30); stroke(33, 150, 243); strokeWeight(2.5);
        beginShape();
        for (let v of vertices) vertex(v.x, v.y);
        endShape(CLOSE);

        fill(220, 20, 60); noStroke();
        for (let v of vertices) ellipse(v.x, v.y, 8);

        fill(33, 150, 243); textSize(11); textAlign(CENTER, CENTER);
        text('Circle is circumscribed', cx, cy + circleR + 25);
    } else {
        let circumR = circleR / cos(PI / numSides);

        let vertices = [];
        for (let i = 0; i < numSides; i++) {
            let angle = -PI/2 + (TWO_PI * i / numSides);
            vertices.push({
                x: cx + circumR * cos(angle),
                y: cy + circumR * sin(angle)
            });
        }

        fill(255, 152, 0, 30); stroke(255, 152, 0); strokeWeight(2.5);
        beginShape();
        for (let v of vertices) vertex(v.x, v.y);
        endShape(CLOSE);

        stroke(76, 175, 80); strokeWeight(2); noFill();
        ellipse(cx, cy, circleR * 2);

        for (let i = 0; i < numSides; i++) {
            let midAngle = -PI/2 + (TWO_PI * i / numSides) + PI / numSides;
            let tx = cx + circleR * cos(midAngle);
            let ty = cy + circleR * sin(midAngle);

            stroke(150); strokeWeight(1);
            drawingContext.setLineDash([3, 3]);
            line(cx, cy, tx, ty);
            drawingContext.setLineDash([]);

            fill(220, 20, 60); noStroke();
            ellipse(tx, ty, 6);
        }

        fill(76, 175, 80); noStroke();
        textSize(11); textAlign(CENTER, CENTER);
        text('Circle is inscribed', cx, cy + circumR + 20);
    }

    fill(100); noStroke();
    ellipse(cx, cy, 5);
}

function polygonName(n) {
    let names = { 3: 'Triangle', 4: 'Square', 5: 'Pentagon', 6: 'Hexagon',
                  7: 'Heptagon', 8: 'Octagon', 9: 'Nonagon', 10: 'Decagon' };
    return names[n] || n + '-gon';
}

function styleLabel(el, w) {
    el.style('display', 'inline-block');
    el.style('width', (w || 60) + 'px');
}

function styleValue(el) {
    el.style('display', 'inline-block');
    el.style('width', '120px');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = min(container.offsetWidth, 800);
        canvasWidth = max(canvasWidth, 550);
    }
}
