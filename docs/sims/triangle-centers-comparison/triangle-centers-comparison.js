// Triangle Centers Comparison MicroSim
// Shows all four classical centers: centroid, circumcenter, orthocenter, incenter

let canvasWidth = 700;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Toggle states for each center
let showCentroid = true;
let showCircumcenter = true;
let showOrthocenter = true;
let showIncenter = true;

// Colors
let bgColor, triangleColor, highlightColor;
let centroidColor, circumcenterColor, orthocenterColor, incenterColor;

// Buttons
let buttons = [];

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    highlightColor = color(255, 193, 7);

    centroidColor = color(220, 50, 50);        // Red
    circumcenterColor = color(156, 39, 176);   // Purple
    orthocenterColor = color(255, 87, 34);     // Orange
    incenterColor = color(0, 150, 136);        // Teal

    resetTriangle();
    createButtons();
    textFont('Arial');
}

function createButtons() {
    buttons = [
        { label: "G Centroid", color: centroidColor, active: true, x: 70 },
        { label: "O Circumcenter", color: circumcenterColor, active: true, x: 210 },
        { label: "H Orthocenter", color: orthocenterColor, active: true, x: 370 },
        { label: "I Incenter", color: incenterColor, active: true, x: 510 }
    ];
}

function resetTriangle() {
    vertices = [
        createVector(canvasWidth * 0.5, margin + 70),
        createVector(margin + 100, drawHeight - margin - 30),
        createVector(canvasWidth - margin - 100, drawHeight - margin - 30)
    ];
}

function draw() {
    background(bgColor);

    // Draw title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    text("Four Triangle Centers", canvasWidth/2, 15);

    // Calculate all centers
    let centroid = calculateCentroid();
    let circumcenter = calculateCircumcenter();
    let orthocenter = calculateOrthocenter();
    let incenter = calculateIncenter();

    // Draw triangle
    stroke(triangleColor);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // Draw centers based on toggle state
    if (buttons[0].active && centroid) {
        drawCenter(centroid, centroidColor, "G");
    }
    if (buttons[1].active && circumcenter) {
        drawCenter(circumcenter, circumcenterColor, "O");
    }
    if (buttons[2].active && orthocenter) {
        drawCenter(orthocenter, orthocenterColor, "H");
    }
    if (buttons[3].active && incenter) {
        drawCenter(incenter, incenterColor, "I");
    }

    // Draw Euler line if G, O, H are all shown
    if (buttons[0].active && buttons[1].active && buttons[2].active &&
        centroid && circumcenter && orthocenter) {
        stroke(139, 69, 19, 150);  // Brown
        strokeWeight(2);
        setLineDash([6, 4]);
        let dir = p5.Vector.sub(orthocenter, circumcenter).normalize().mult(400);
        line(circumcenter.x - dir.x, circumcenter.y - dir.y,
             circumcenter.x + dir.x, circumcenter.y + dir.y);
        setLineDash([]);
    }

    // Draw vertices
    fill(triangleColor);
    noStroke();
    let labels = ['A', 'B', 'C'];
    let offsets = [
        createVector(0, -20),
        createVector(-20, 15),
        createVector(20, 15)
    ];

    for (let i = 0; i < 3; i++) {
        if (draggingVertex === i) {
            fill(highlightColor);
            ellipse(vertices[i].x, vertices[i].y, 20, 20);
        } else {
            fill(triangleColor);
            ellipse(vertices[i].x, vertices[i].y, 16, 16);
        }

        fill(triangleColor);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(labels[i], vertices[i].x + offsets[i].x, vertices[i].y + offsets[i].y);
    }

    // Draw info box
    drawInfoBox();

    // Draw toggle buttons
    drawButtons();

    // Draw instructions
    fill(100);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices to reshape • Click buttons to toggle centers",
         canvasWidth/2, canvasHeight - 5);
}

function drawCenter(pos, col, label) {
    fill(col);
    noStroke();
    ellipse(pos.x, pos.y, 16, 16);

    fill(col);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(label, pos.x + 12, pos.y - 2);
}

function drawButtons() {
    let buttonY = drawHeight + 20;
    let buttonW = 120;
    let buttonH = 30;

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        let bx = b.x - buttonW/2;

        // Button background
        if (b.active) {
            fill(b.color);
        } else {
            fill(200);
        }
        stroke(100);
        strokeWeight(1);
        rect(bx, buttonY, buttonW, buttonH, 5);

        // Button text
        fill(b.active ? 255 : 100);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text(b.label, b.x, buttonY + buttonH/2);
    }
}

function drawInfoBox() {
    let type = getTriangleType();

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    let boxX = 15;
    let boxY = 45;
    let boxW = 180;
    let boxH = 110;
    rect(boxX, boxY, boxW, boxH, 8);

    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);

    let y = boxY + 10;
    text("Triangle: " + type, boxX + 10, y);
    y += 22;

    textSize(11);
    text("G = Centroid (medians)", boxX + 10, y);
    y += 16;
    text("O = Circumcenter (⊥ bis.)", boxX + 10, y);
    y += 16;
    text("H = Orthocenter (altitudes)", boxX + 10, y);
    y += 16;
    text("I = Incenter (∠ bisectors)", boxX + 10, y);
}

function calculateCentroid() {
    return createVector(
        (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
        (vertices[0].y + vertices[1].y + vertices[2].y) / 3
    );
}

function calculateCircumcenter() {
    let ax = vertices[0].x, ay = vertices[0].y;
    let bx = vertices[1].x, by = vertices[1].y;
    let cx = vertices[2].x, cy = vertices[2].y;

    let d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (abs(d) < 0.001) return null;

    let ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
    let uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;

    return createVector(ux, uy);
}

function calculateOrthocenter() {
    let ax = vertices[0].x, ay = vertices[0].y;
    let bx = vertices[1].x, by = vertices[1].y;
    let cx = vertices[2].x, cy = vertices[2].y;

    let bcx = cx - bx, bcy = cy - by;
    let acx = cx - ax, acy = cy - ay;

    let det = (-bcy) * acx - bcx * (-acy);
    if (abs(det) < 0.001) return null;

    let t = ((bx - ax) * acx + (by - ay) * (-acy)) / det;
    return createVector(ax - t * bcy, ay + t * bcx);
}

function calculateIncenter() {
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);

    let perimeter = a + b + c;
    if (perimeter === 0) return null;

    let ix = (a * vertices[0].x + b * vertices[1].x + c * vertices[2].x) / perimeter;
    let iy = (a * vertices[0].y + b * vertices[1].y + c * vertices[2].y) / perimeter;

    return createVector(ix, iy);
}

function getTriangleType() {
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);

    let sides = [a, b, c].sort((x, y) => x - y);
    let longSq = sides[2] * sides[2];
    let sumSq = sides[0] * sides[0] + sides[1] * sides[1];

    if (abs(a - b) < 5 && abs(b - c) < 5) return "Equilateral";
    if (abs(longSq - sumSq) < 100) return "Right";
    if (longSq < sumSq) return "Acute";
    return "Obtuse";
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function mousePressed() {
    // Check buttons first
    let buttonY = drawHeight + 20;
    let buttonW = 120;
    let buttonH = 30;

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        let bx = b.x - buttonW/2;

        if (mouseX >= bx && mouseX <= bx + buttonW &&
            mouseY >= buttonY && mouseY <= buttonY + buttonH) {
            buttons[i].active = !buttons[i].active;
            return;
        }
    }

    // Check vertices
    for (let i = 0; i < vertices.length; i++) {
        if (dist(mouseX, mouseY, vertices[i].x, vertices[i].y) < 15) {
            draggingVertex = i;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingVertex >= 0 && mouseY < drawHeight - 20) {
        vertices[draggingVertex].x = constrain(mouseX, margin, canvasWidth - margin);
        vertices[draggingVertex].y = constrain(mouseY, margin + 40, drawHeight - margin);
    }
}

function mouseReleased() {
    draggingVertex = -1;
}

function windowResized() {
    updateCanvasSize();
}

function updateCanvasSize() {
    let containerWidth = select('#canvas-container').width;
    if (containerWidth > 0) {
        canvasWidth = min(containerWidth, 800);
        resizeCanvas(canvasWidth, canvasHeight);
        resetTriangle();
        createButtons();
    }
}
