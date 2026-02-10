// Inscribed and Circumscribed Polygons MicroSim
// Side-by-side comparison

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let numSides = 5;
let circleR = 120;

// Slider
let sliderX = 30, sliderW = 200;
let sliderY;
let dragging = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    sliderY = drawHeight + 18;
}

function draw() {
    background(240, 248, 255);

    // Title
    fill(40);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Inscribed vs Circumscribed Polygons', canvasWidth / 2, 8);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;

    // Left panel: Inscribed polygon
    drawPanel(halfW / 2, drawHeight / 2 + 20, 'Inscribed Polygon', 'Vertices on circle', true);

    // Right panel: Circumscribed polygon
    drawPanel(halfW + halfW / 2, drawHeight / 2 + 20, 'Circumscribed Polygon', 'Sides tangent to circle', false);

    // Divider
    stroke(200);
    strokeWeight(1);
    line(halfW, 40, halfW, drawHeight - 10);

    // Slider
    fill(60);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Sides: ' + numSides + '  (Regular ' + polygonName(numSides) + ')', sliderX, sliderY - 4);

    let trackY = sliderY + 14;
    stroke(180);
    strokeWeight(3);
    line(sliderX, trackY, sliderX + sliderW, trackY);

    // Tick marks for discrete values
    for (let i = 3; i <= 10; i++) {
        let tx = map(i, 3, 10, sliderX, sliderX + sliderW);
        stroke(150);
        strokeWeight(1);
        line(tx, trackY - 5, tx, trackY + 5);
    }

    let thumbX = map(numSides, 3, 10, sliderX, sliderX + sliderW);
    fill(33, 150, 243);
    noStroke();
    ellipse(thumbX, trackY, 16);
}

function drawPanel(cx, cy, title, subtitle, isInscribed) {
    // Title
    fill(40);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(title, cx, 35);
    textStyle(NORMAL);
    fill(100);
    textSize(11);
    text('(' + subtitle + ')', cx, 53);

    if (isInscribed) {
        // Circle first
        stroke(33, 150, 243);
        strokeWeight(2);
        noFill();
        ellipse(cx, cy, circleR * 2);

        // Polygon with vertices on circle
        let vertices = [];
        for (let i = 0; i < numSides; i++) {
            let angle = -PI/2 + (TWO_PI * i / numSides);
            vertices.push({
                x: cx + circleR * cos(angle),
                y: cy + circleR * sin(angle)
            });
        }

        fill(33, 150, 243, 30);
        stroke(33, 150, 243);
        strokeWeight(2.5);
        beginShape();
        for (let v of vertices) vertex(v.x, v.y);
        endShape(CLOSE);

        // Vertex dots
        fill(220, 20, 60);
        noStroke();
        for (let v of vertices) {
            ellipse(v.x, v.y, 8);
        }

        // Label
        fill(33, 150, 243);
        textSize(11);
        textAlign(CENTER, CENTER);
        text('Circle is circumscribed', cx, cy + circleR + 25);
    } else {
        // Circumscribed polygon: sides tangent to circle
        // The apothem = circleR, so the circumradius = circleR / cos(PI/numSides)
        let circumR = circleR / cos(PI / numSides);

        // Polygon vertices
        let vertices = [];
        for (let i = 0; i < numSides; i++) {
            let angle = -PI/2 + (TWO_PI * i / numSides);
            vertices.push({
                x: cx + circumR * cos(angle),
                y: cy + circumR * sin(angle)
            });
        }

        // Polygon
        fill(255, 152, 0, 30);
        stroke(255, 152, 0);
        strokeWeight(2.5);
        beginShape();
        for (let v of vertices) vertex(v.x, v.y);
        endShape(CLOSE);

        // Circle inside (inscribed)
        stroke(76, 175, 80);
        strokeWeight(2);
        noFill();
        ellipse(cx, cy, circleR * 2);

        // Tangent points and perpendicular radii
        for (let i = 0; i < numSides; i++) {
            let midAngle = -PI/2 + (TWO_PI * i / numSides) + PI / numSides;
            let tx = cx + circleR * cos(midAngle);
            let ty = cy + circleR * sin(midAngle);

            // Dashed radius to tangent point
            stroke(150);
            strokeWeight(1);
            drawingContext.setLineDash([3, 3]);
            line(cx, cy, tx, ty);
            drawingContext.setLineDash([]);

            // Tangent point
            fill(220, 20, 60);
            noStroke();
            ellipse(tx, ty, 6);
        }

        // Label
        fill(76, 175, 80);
        noStroke();
        textSize(11);
        textAlign(CENTER, CENTER);
        text('Circle is inscribed', cx, cy + circumR + 20);
    }

    // Center
    fill(100);
    noStroke();
    ellipse(cx, cy, 5);
}

function polygonName(n) {
    let names = { 3: 'Triangle', 4: 'Square', 5: 'Pentagon', 6: 'Hexagon',
                  7: 'Heptagon', 8: 'Octagon', 9: 'Nonagon', 10: 'Decagon' };
    return names[n] || n + '-gon';
}

function mousePressed() {
    let trackY = sliderY + 14;
    if (abs(mouseY - trackY) < 14 && mouseX > sliderX - 10 && mouseX < sliderX + sliderW + 10) {
        dragging = true;
        updateSlider();
    }
}

function mouseDragged() {
    if (dragging) updateSlider();
}

function updateSlider() {
    let raw = map(mouseX, sliderX, sliderX + sliderW, 3, 10);
    numSides = constrain(round(raw), 3, 10);
}

function mouseReleased() {
    dragging = false;
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
