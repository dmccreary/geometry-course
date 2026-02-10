// Incircle Explorer MicroSim
// Shows angle bisectors, incenter, and incircle

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Colors
let bgColor, triangleColor, bisectorColor, incenterColor, incircleColor, highlightColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    bisectorColor = color(0, 150, 136);  // Teal
    incenterColor = color(0, 150, 136);
    incircleColor = color(0, 150, 136, 80);
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
    text("Incircle Explorer", canvasWidth/2, 15);

    // Calculate incenter and inradius
    let incenter = calculateIncenter();
    let inradius = calculateInradius(incenter);

    // Draw incircle
    if (incenter && inradius > 0) {
        fill(incircleColor);
        stroke(incenterColor);
        strokeWeight(2);
        ellipse(incenter.x, incenter.y, inradius * 2, inradius * 2);
    }

    // Draw angle bisectors (extended)
    stroke(bisectorColor);
    strokeWeight(2);
    setLineDash([5, 5]);
    for (let i = 0; i < 3; i++) {
        let v = vertices[i];
        let v1 = vertices[(i + 1) % 3];
        let v2 = vertices[(i + 2) % 3];

        // Direction of angle bisector
        let dir1 = p5.Vector.sub(v1, v).normalize();
        let dir2 = p5.Vector.sub(v2, v).normalize();
        let bisectorDir = p5.Vector.add(dir1, dir2).normalize();

        let end = p5.Vector.add(v, p5.Vector.mult(bisectorDir, 400));
        line(v.x, v.y, end.x, end.y);
    }
    setLineDash([]);

    // Draw triangle
    stroke(triangleColor);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // Draw tangent points (where incircle touches sides)
    if (incenter && inradius > 0) {
        fill(incenterColor);
        noStroke();
        for (let i = 0; i < 3; i++) {
            let v1 = vertices[i];
            let v2 = vertices[(i + 1) % 3];
            let tangent = projectPointToLine(incenter, v1, v2);
            ellipse(tangent.x, tangent.y, 8, 8);
        }
    }

    // Draw incenter
    if (incenter) {
        fill(incenterColor);
        noStroke();
        ellipse(incenter.x, incenter.y, 18, 18);

        // Label incenter
        fill(incenterColor);
        textSize(16);
        textAlign(LEFT, CENTER);
        text("I (Incenter)", incenter.x + 15, incenter.y);

        // Draw radii to tangent points
        stroke(incenterColor);
        strokeWeight(1);
        setLineDash([3, 3]);
        for (let i = 0; i < 3; i++) {
            let v1 = vertices[i];
            let v2 = vertices[(i + 1) % 3];
            let tangent = projectPointToLine(incenter, v1, v2);
            line(incenter.x, incenter.y, tangent.x, tangent.y);
        }
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
    drawInfoBox(incenter, inradius);

    // Draw instructions
    fill(100);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices to reshape triangle • Incircle always touches all three sides",
         canvasWidth/2, canvasHeight - 15);
}

function calculateIncenter() {
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);

    let perimeter = a + b + c;
    if (perimeter === 0) return null;

    // Incenter = (a*A + b*B + c*C) / (a + b + c)
    let ix = (a * vertices[0].x + b * vertices[1].x + c * vertices[2].x) / perimeter;
    let iy = (a * vertices[0].y + b * vertices[1].y + c * vertices[2].y) / perimeter;

    return createVector(ix, iy);
}

function calculateInradius(incenter) {
    if (!incenter) return 0;

    // Area using shoelace formula
    let area = abs(
        (vertices[0].x * (vertices[1].y - vertices[2].y) +
         vertices[1].x * (vertices[2].y - vertices[0].y) +
         vertices[2].x * (vertices[0].y - vertices[1].y)) / 2
    );

    // Semi-perimeter
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);
    let s = (a + b + c) / 2;

    // r = Area / s
    return area / s;
}

function projectPointToLine(p, v1, v2) {
    let line = p5.Vector.sub(v2, v1);
    let toPoint = p5.Vector.sub(p, v1);
    let t = p5.Vector.dot(toPoint, line) / p5.Vector.dot(line, line);
    t = constrain(t, 0, 1);
    return p5.Vector.add(v1, p5.Vector.mult(line, t));
}

function drawInfoBox(incenter, inradius) {
    // Calculate area
    let area = abs(
        (vertices[0].x * (vertices[1].y - vertices[2].y) +
         vertices[1].x * (vertices[2].y - vertices[0].y) +
         vertices[2].x * (vertices[0].y - vertices[1].y)) / 2
    );

    // Semi-perimeter
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);
    let s = (a + b + c) / 2;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    let boxX = 15;
    let boxY = 45;
    let boxW = 240;
    let boxH = 165;
    rect(boxX, boxY, boxW, boxH, 8);

    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    let y = boxY + 10;
    text("Incircle Properties:", boxX + 10, y);
    y += 22;

    textSize(12);
    text("• Angle bisectors meet at I", boxX + 10, y);
    y += 18;
    text("• I equidistant from all sides", boxX + 10, y);
    y += 18;
    text("• I is center of inscribed circle", boxX + 10, y);
    y += 18;
    text("• I always inside triangle", boxX + 10, y);
    y += 22;

    textSize(11);
    fill(100);
    text(`Inradius r = ${inradius.toFixed(1)} px`, boxX + 10, y);
    y += 16;
    text(`Formula: r = Area / s`, boxX + 10, y);
    y += 16;
    text(`r = ${area.toFixed(0)} / ${s.toFixed(0)} = ${inradius.toFixed(1)}`, boxX + 10, y);
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
