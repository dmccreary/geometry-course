// Orthocenter Explorer MicroSim
// Shows altitudes and orthocenter position for different triangle types

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Colors
let bgColor, triangleColor, altitudeColor, orthocenterColor, highlightColor, footColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    altitudeColor = color(255, 87, 34);  // Deep orange
    orthocenterColor = color(220, 50, 50);
    footColor = color(255, 152, 0);
    highlightColor = color(255, 193, 7);

    resetTriangle();
    textFont('Arial');
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
    text("Orthocenter Explorer", canvasWidth/2, 15);

    // Calculate altitude feet and orthocenter
    let altitudeFeet = calculateAltitudeFeet();
    let orthocenter = calculateOrthocenter();

    // Draw extended altitudes
    stroke(altitudeColor);
    strokeWeight(2);
    setLineDash([5, 5]);
    for (let i = 0; i < 3; i++) {
        let v = vertices[i];
        let foot = altitudeFeet[i];
        if (foot) {
            let dir = p5.Vector.sub(foot, v).normalize().mult(400);
            line(v.x - dir.x, v.y - dir.y, v.x + dir.x, v.y + dir.y);
        }
    }
    setLineDash([]);

    // Draw solid altitude segments
    stroke(altitudeColor);
    strokeWeight(3);
    for (let i = 0; i < 3; i++) {
        let v = vertices[i];
        let foot = altitudeFeet[i];
        if (foot) {
            line(v.x, v.y, foot.x, foot.y);
        }
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

    // Draw right angle markers at feet
    for (let i = 0; i < 3; i++) {
        let foot = altitudeFeet[i];
        if (foot) {
            drawRightAngle(foot, vertices[i], vertices[(i + 1) % 3]);
        }
    }

    // Draw altitude feet
    fill(footColor);
    noStroke();
    for (let foot of altitudeFeet) {
        if (foot) {
            ellipse(foot.x, foot.y, 10, 10);
        }
    }

    // Draw orthocenter
    if (orthocenter) {
        fill(orthocenterColor);
        noStroke();
        ellipse(orthocenter.x, orthocenter.y, 18, 18);

        // Label orthocenter
        fill(orthocenterColor);
        textSize(16);
        textAlign(LEFT, CENTER);
        text("H (Orthocenter)", orthocenter.x + 15, orthocenter.y);
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
    drawInfoBox(orthocenter);

    // Draw instructions
    fill(100);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices to see how the orthocenter moves inside, on, or outside the triangle",
         canvasWidth/2, canvasHeight - 15);
}

function calculateAltitudeFeet() {
    let feet = [];
    for (let i = 0; i < 3; i++) {
        let v = vertices[i];
        let v1 = vertices[(i + 1) % 3];
        let v2 = vertices[(i + 2) % 3];

        // Project v onto line v1-v2
        let line = p5.Vector.sub(v2, v1);
        let toPoint = p5.Vector.sub(v, v1);
        let t = p5.Vector.dot(toPoint, line) / p5.Vector.dot(line, line);
        let foot = p5.Vector.add(v1, p5.Vector.mult(line, t));
        feet.push(foot);
    }
    return feet;
}

function calculateOrthocenter() {
    // Using the formula for orthocenter
    let ax = vertices[0].x, ay = vertices[0].y;
    let bx = vertices[1].x, by = vertices[1].y;
    let cx = vertices[2].x, cy = vertices[2].y;

    // Direction of BC
    let bcx = cx - bx, bcy = cy - by;
    // Direction of AC
    let acx = cx - ax, acy = cy - ay;

    // Altitude from A perpendicular to BC: passes through A with direction (-bcy, bcx)
    // Altitude from B perpendicular to AC: passes through B with direction (-acy, acx)

    // Line 1: A + t * (-bcy, bcx)
    // Line 2: B + s * (-acy, acx)

    // Solve: ax - t*bcy = bx - s*acy  and  ay + t*bcx = by + s*acx

    let det = (-bcy) * acx - bcx * (-acy);
    if (abs(det) < 0.001) return null;

    let t = ((bx - ax) * acx + (by - ay) * (-acy)) / det;

    return createVector(ax - t * bcy, ay + t * bcx);
}

function drawRightAngle(foot, vertex, oppVertex) {
    let size = 10;
    let dir1 = p5.Vector.sub(vertex, foot).normalize().mult(size);
    let dir2 = p5.Vector.sub(oppVertex, foot).normalize().mult(size);

    stroke(altitudeColor);
    strokeWeight(1.5);
    noFill();
    line(foot.x + dir1.x, foot.y + dir1.y,
         foot.x + dir1.x + dir2.x, foot.y + dir1.y + dir2.y);
    line(foot.x + dir2.x, foot.y + dir2.y,
         foot.x + dir1.x + dir2.x, foot.y + dir1.y + dir2.y);
}

function drawInfoBox(orthocenter) {
    let type = getTriangleType();
    let location = getOrthocenterLocation(orthocenter);

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    let boxX = 15;
    let boxY = 45;
    let boxW = 240;
    let boxH = 150;
    rect(boxX, boxY, boxW, boxH, 8);

    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    let y = boxY + 10;
    text("Triangle Type: " + type, boxX + 10, y);
    y += 22;
    text("Orthocenter Location:", boxX + 10, y);
    y += 18;
    textSize(12);
    text(location, boxX + 20, y);
    y += 22;

    text("Properties:", boxX + 10, y);
    y += 18;
    text("• 3 altitudes meet at H", boxX + 10, y);
    y += 16;
    text("• Altitudes ⊥ to opposite sides", boxX + 10, y);
    y += 16;
    text("• H lies on Euler line", boxX + 10, y);
}

function getTriangleType() {
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);

    let sides = [a, b, c].sort((x, y) => x - y);
    let longSq = sides[2] * sides[2];
    let sumSq = sides[0] * sides[0] + sides[1] * sides[1];

    if (abs(longSq - sumSq) < 100) return "Right";
    if (longSq < sumSq) return "Acute";
    return "Obtuse";
}

function getOrthocenterLocation(orthocenter) {
    let type = getTriangleType();
    if (type === "Right") return "At the right-angle vertex";
    if (type === "Acute") return "Inside the triangle";
    return "Outside the triangle";
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function mousePressed() {
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
    }
}
