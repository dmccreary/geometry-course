// Nine-Point Circle MicroSim
// Shows the nine-point circle and all nine special points

let canvasWidth = 700;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Toggle states for point groups
let showMidpoints = true;
let showAltitudeFeet = true;
let showEulerMidpoints = true;

// Colors
let bgColor, triangleColor, highlightColor;
let ninePointColor, midpointColor, feetColor, eulerMidColor;
let eulerLineColor;

// Buttons
let buttons = [];

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    highlightColor = color(255, 193, 7);

    ninePointColor = color(218, 165, 32);     // Gold
    midpointColor = color(30, 100, 200);       // Blue
    feetColor = color(220, 50, 50);            // Red
    eulerMidColor = color(255, 152, 0);        // Orange
    eulerLineColor = color(139, 69, 19);       // Brown

    resetTriangle();
    createButtons();
    textFont('Arial');
}

function createButtons() {
    buttons = [
        { label: "Side Midpoints", color: midpointColor, active: true, x: 120 },
        { label: "Altitude Feet", color: feetColor, active: true, x: 280 },
        { label: "Euler Midpoints", color: eulerMidColor, active: true, x: 460 }
    ];
}

function resetTriangle() {
    vertices = [
        createVector(canvasWidth * 0.5, margin + 70),
        createVector(margin + 100, drawHeight - margin - 50),
        createVector(canvasWidth - margin - 100, drawHeight - margin - 50)
    ];
}

function draw() {
    background(bgColor);

    // Draw title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    text("Nine-Point Circle", canvasWidth/2, 15);

    // Calculate key points
    let orthocenter = calculateOrthocenter();
    let circumcenter = calculateCircumcenter();
    let ninePointCenter = orthocenter && circumcenter ?
        p5.Vector.lerp(orthocenter, circumcenter, 0.5) : null;

    // Calculate all nine points
    let sideMidpoints = calculateSideMidpoints();
    let altitudeFeet = calculateAltitudeFeet();
    let eulerMidpoints = orthocenter ? calculateEulerMidpoints(orthocenter) : [];

    // Calculate nine-point circle radius (half circumradius)
    let ninePointRadius = 0;
    if (ninePointCenter && sideMidpoints.length > 0) {
        ninePointRadius = p5.Vector.dist(ninePointCenter, sideMidpoints[0]);
    }

    // Draw Euler line
    if (orthocenter && circumcenter) {
        stroke(eulerLineColor);
        strokeWeight(2);
        setLineDash([6, 4]);
        let dir = p5.Vector.sub(orthocenter, circumcenter).normalize().mult(350);
        line(circumcenter.x - dir.x, circumcenter.y - dir.y,
             circumcenter.x + dir.x, circumcenter.y + dir.y);
        setLineDash([]);
    }

    // Draw nine-point circle
    if (ninePointCenter && ninePointRadius > 0) {
        noFill();
        stroke(ninePointColor);
        strokeWeight(3);
        ellipse(ninePointCenter.x, ninePointCenter.y, ninePointRadius * 2, ninePointRadius * 2);
    }

    // Draw triangle
    stroke(triangleColor);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // Draw the nine points based on toggle state
    if (buttons[0].active) {
        for (let p of sideMidpoints) {
            fill(midpointColor);
            noStroke();
            ellipse(p.x, p.y, 12, 12);
        }
    }

    if (buttons[1].active) {
        for (let p of altitudeFeet) {
            fill(feetColor);
            noStroke();
            ellipse(p.x, p.y, 12, 12);
        }
    }

    if (buttons[2].active) {
        for (let p of eulerMidpoints) {
            fill(eulerMidColor);
            noStroke();
            ellipse(p.x, p.y, 12, 12);
        }
    }

    // Draw nine-point center
    if (ninePointCenter) {
        fill(ninePointColor);
        noStroke();
        ellipse(ninePointCenter.x, ninePointCenter.y, 14, 14);
        textSize(12);
        textAlign(LEFT, CENTER);
        text("N", ninePointCenter.x + 10, ninePointCenter.y);
    }

    // Draw orthocenter and circumcenter
    if (orthocenter) {
        fill(feetColor);
        noStroke();
        rectMode(CENTER);
        rect(orthocenter.x, orthocenter.y, 10, 10);
        textSize(12);
        textAlign(LEFT, CENTER);
        text("H", orthocenter.x + 10, orthocenter.y);
    }

    if (circumcenter) {
        fill(midpointColor);
        noStroke();
        rectMode(CENTER);
        rect(circumcenter.x, circumcenter.y, 10, 10);
        textSize(12);
        textAlign(RIGHT, CENTER);
        text("O", circumcenter.x - 10, circumcenter.y);
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

    // Draw legend box
    drawLegend();

    // Draw toggle buttons
    drawButtons();

    // Draw instructions
    fill(100);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices • Toggle point groups • N is midpoint of OH",
         canvasWidth/2, canvasHeight - 5);
}

function drawLegend() {
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    let boxX = 15;
    let boxY = 45;
    let boxW = 200;
    let boxH = 105;
    rect(boxX, boxY, boxW, boxH, 8);

    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);

    let y = boxY + 10;
    text("Nine Points on the Circle:", boxX + 10, y);
    y += 20;

    // Legend items
    fill(midpointColor);
    ellipse(boxX + 20, y + 5, 10, 10);
    fill(60);
    text("3 side midpoints", boxX + 32, y);
    y += 18;

    fill(feetColor);
    ellipse(boxX + 20, y + 5, 10, 10);
    fill(60);
    text("3 altitude feet", boxX + 32, y);
    y += 18;

    fill(eulerMidColor);
    ellipse(boxX + 20, y + 5, 10, 10);
    fill(60);
    text("3 midpoints to H", boxX + 32, y);
    y += 18;

    textSize(10);
    fill(100);
    text("Radius = (1/2) × Circumradius", boxX + 10, y);
}

function drawButtons() {
    let buttonY = drawHeight + 20;
    let buttonW = 130;
    let buttonH = 30;

    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        let bx = b.x - buttonW/2;

        if (b.active) {
            fill(b.color);
        } else {
            fill(200);
        }
        stroke(100);
        strokeWeight(1);
        rect(bx, buttonY, buttonW, buttonH, 5);

        fill(b.active ? 255 : 100);
        noStroke();
        textSize(11);
        textAlign(CENTER, CENTER);
        text(b.label, b.x, buttonY + buttonH/2);
    }
}

function calculateSideMidpoints() {
    return [
        p5.Vector.lerp(vertices[0], vertices[1], 0.5),
        p5.Vector.lerp(vertices[1], vertices[2], 0.5),
        p5.Vector.lerp(vertices[2], vertices[0], 0.5)
    ];
}

function calculateAltitudeFeet() {
    let feet = [];
    for (let i = 0; i < 3; i++) {
        let v = vertices[i];
        let v1 = vertices[(i + 1) % 3];
        let v2 = vertices[(i + 2) % 3];

        let line = p5.Vector.sub(v2, v1);
        let toPoint = p5.Vector.sub(v, v1);
        let t = p5.Vector.dot(toPoint, line) / p5.Vector.dot(line, line);
        let foot = p5.Vector.add(v1, p5.Vector.mult(line, t));
        feet.push(foot);
    }
    return feet;
}

function calculateEulerMidpoints(orthocenter) {
    return [
        p5.Vector.lerp(vertices[0], orthocenter, 0.5),
        p5.Vector.lerp(vertices[1], orthocenter, 0.5),
        p5.Vector.lerp(vertices[2], orthocenter, 0.5)
    ];
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

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function mousePressed() {
    // Check buttons
    let buttonY = drawHeight + 20;
    let buttonW = 130;
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
