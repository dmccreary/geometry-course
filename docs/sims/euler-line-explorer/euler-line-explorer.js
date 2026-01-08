// Euler Line Explorer MicroSim
// Shows the Euler line connecting centroid, circumcenter, and orthocenter

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Colors
let bgColor, triangleColor, eulerLineColor;
let centroidColor, circumcenterColor, orthocenterColor;
let highlightColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    eulerLineColor = color(139, 69, 19);  // Brown
    centroidColor = color(220, 50, 50);  // Red
    circumcenterColor = color(156, 39, 176);  // Purple
    orthocenterColor = color(255, 87, 34);  // Orange
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
    text("Euler Line Explorer", canvasWidth/2, 15);

    // Calculate centers
    let centroid = calculateCentroid();
    let circumcenter = calculateCircumcenter();
    let orthocenter = calculateOrthocenter();

    // Draw Euler line (extended)
    if (centroid && circumcenter && orthocenter) {
        stroke(eulerLineColor);
        strokeWeight(3);
        setLineDash([8, 4]);
        let dir = p5.Vector.sub(orthocenter, circumcenter).normalize().mult(500);
        line(circumcenter.x - dir.x, circumcenter.y - dir.y,
             circumcenter.x + dir.x, circumcenter.y + dir.y);
        setLineDash([]);
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

    // Draw 2:1 ratio visualization
    if (centroid && circumcenter && orthocenter) {
        drawRatioMarkers(centroid, circumcenter, orthocenter);
    }

    // Draw circumcenter
    if (circumcenter) {
        fill(circumcenterColor);
        noStroke();
        ellipse(circumcenter.x, circumcenter.y, 16, 16);
        textSize(14);
        textAlign(RIGHT, CENTER);
        text("O", circumcenter.x - 12, circumcenter.y);
    }

    // Draw centroid
    if (centroid) {
        fill(centroidColor);
        noStroke();
        ellipse(centroid.x, centroid.y, 16, 16);
        textSize(14);
        textAlign(LEFT, CENTER);
        text("G", centroid.x + 12, centroid.y);
    }

    // Draw orthocenter
    if (orthocenter) {
        fill(orthocenterColor);
        noStroke();
        ellipse(orthocenter.x, orthocenter.y, 16, 16);
        textSize(14);
        textAlign(LEFT, CENTER);
        text("H", orthocenter.x + 12, orthocenter.y);
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

    // Draw legend and info box
    drawInfoBox(centroid, circumcenter, orthocenter);

    // Draw instructions
    fill(100);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices • The Euler line always passes through G, O, and H with G dividing OH in ratio 1:2",
         canvasWidth/2, canvasHeight - 15);
}

function drawRatioMarkers(centroid, circumcenter, orthocenter) {
    // Show the 2:1 ratio (OG:GH = 1:2)
    let distOG = p5.Vector.dist(circumcenter, centroid);
    let distGH = p5.Vector.dist(centroid, orthocenter);

    // Draw ratio labels
    let midOG = p5.Vector.lerp(circumcenter, centroid, 0.5);
    let midGH = p5.Vector.lerp(centroid, orthocenter, 0.5);

    let dir = p5.Vector.sub(orthocenter, circumcenter).normalize();
    let perp = createVector(-dir.y, dir.x).mult(20);

    fill(eulerLineColor);
    stroke(255);
    strokeWeight(2);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("1", midOG.x + perp.x, midOG.y + perp.y);
    text("2", midGH.x + perp.x, midGH.y + perp.y);
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

function drawInfoBox(centroid, circumcenter, orthocenter) {
    let type = getTriangleType();

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    let boxX = 15;
    let boxY = 45;
    let boxW = 250;
    let boxH = 175;
    rect(boxX, boxY, boxW, boxH, 8);

    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    let y = boxY + 10;

    textSize(14);
    text("Euler Line Properties:", boxX + 10, y);
    y += 22;

    textSize(12);
    // Legend
    fill(circumcenterColor);
    ellipse(boxX + 20, y + 6, 10, 10);
    fill(60);
    text("O - Circumcenter", boxX + 30, y);
    y += 18;

    fill(centroidColor);
    ellipse(boxX + 20, y + 6, 10, 10);
    fill(60);
    text("G - Centroid", boxX + 30, y);
    y += 18;

    fill(orthocenterColor);
    ellipse(boxX + 20, y + 6, 10, 10);
    fill(60);
    text("H - Orthocenter", boxX + 30, y);
    y += 22;

    text("Triangle Type: " + type, boxX + 10, y);
    y += 20;

    textSize(11);
    text("Key Ratio: OG : GH = 1 : 2", boxX + 10, y);
    y += 16;
    text("G divides OH in ratio 1:2 from O", boxX + 10, y);
}

function getTriangleType() {
    let a = p5.Vector.dist(vertices[1], vertices[2]);
    let b = p5.Vector.dist(vertices[0], vertices[2]);
    let c = p5.Vector.dist(vertices[0], vertices[1]);

    let sides = [a, b, c].sort((x, y) => x - y);
    let longSq = sides[2] * sides[2];
    let sumSq = sides[0] * sides[0] + sides[1] * sides[1];

    // Check if equilateral
    if (abs(a - b) < 5 && abs(b - c) < 5) return "Equilateral";
    if (abs(longSq - sumSq) < 100) return "Right";
    if (longSq < sumSq) return "Acute";
    return "Obtuse";
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
