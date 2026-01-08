// Circumcenter Explorer MicroSim
// Shows perpendicular bisectors, circumcenter, and circumcircle

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Colors
let bgColor, triangleColor, bisectorColor, circumcenterColor, circumcircleColor, highlightColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    bisectorColor = color(156, 39, 176);  // Purple
    circumcenterColor = color(156, 39, 176);
    circumcircleColor = color(156, 39, 176, 100);
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
    text("Circumcenter Explorer", canvasWidth/2, 15);

    // Calculate midpoints
    let midpoints = [
        p5.Vector.add(vertices[0], vertices[1]).mult(0.5),
        p5.Vector.add(vertices[1], vertices[2]).mult(0.5),
        p5.Vector.add(vertices[2], vertices[0]).mult(0.5)
    ];

    // Calculate circumcenter using perpendicular bisector intersection
    let circumcenter = calculateCircumcenter();
    let circumradius = circumcenter ? p5.Vector.dist(circumcenter, vertices[0]) : 0;

    // Draw circumcircle if circumcenter exists
    if (circumcenter) {
        stroke(circumcircleColor);
        strokeWeight(2);
        noFill();
        ellipse(circumcenter.x, circumcenter.y, circumradius * 2, circumradius * 2);
    }

    // Draw perpendicular bisectors (extended lines)
    stroke(bisectorColor);
    strokeWeight(2);
    setLineDash([5, 5]);
    for (let i = 0; i < 3; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % 3];
        let mid = p5.Vector.add(v1, v2).mult(0.5);
        let dir = p5.Vector.sub(v2, v1);
        let perp = createVector(-dir.y, dir.x).normalize().mult(300);
        line(mid.x - perp.x, mid.y - perp.y, mid.x + perp.x, mid.y + perp.y);
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

    // Draw midpoints
    fill(bisectorColor);
    noStroke();
    for (let mid of midpoints) {
        ellipse(mid.x, mid.y, 10, 10);
    }

    // Draw circumcenter
    if (circumcenter) {
        fill(circumcenterColor);
        noStroke();
        ellipse(circumcenter.x, circumcenter.y, 18, 18);

        // Label circumcenter
        fill(circumcenterColor);
        textSize(16);
        textAlign(LEFT, CENTER);
        text("O (Circumcenter)", circumcenter.x + 15, circumcenter.y);

        // Draw radii to vertices
        stroke(circumcircleColor);
        strokeWeight(1);
        setLineDash([3, 3]);
        for (let v of vertices) {
            line(circumcenter.x, circumcenter.y, v.x, v.y);
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
    drawInfoBox(circumcenter);

    // Draw instructions
    fill(100);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices to create acute, right, or obtuse triangles • Watch circumcenter location change",
         canvasWidth/2, canvasHeight - 15);
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

function drawInfoBox(circumcenter) {
    // Determine triangle type
    let type = getTriangleType();
    let location = getCircumcenterLocation(circumcenter);

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
    text("Circumcenter Location:", boxX + 10, y);
    y += 18;
    textSize(12);
    text(location, boxX + 20, y);
    y += 22;

    text("Properties:", boxX + 10, y);
    y += 18;
    text("• ⊥ bisectors meet at O", boxX + 10, y);
    y += 16;
    text("• O equidistant from vertices", boxX + 10, y);
    y += 16;
    text("• O is center of circumcircle", boxX + 10, y);
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

function getCircumcenterLocation(circumcenter) {
    if (!circumcenter) return "Cannot compute";

    // Check if inside triangle
    let inside = isInsideTriangle(circumcenter);
    let type = getTriangleType();

    if (type === "Right") return "On hypotenuse (midpoint)";
    if (type === "Acute") return "Inside the triangle";
    return "Outside the triangle";
}

function isInsideTriangle(p) {
    let v0 = vertices[0], v1 = vertices[1], v2 = vertices[2];

    let area = 0.5 * (-v1.y * v2.x + v0.y * (-v1.x + v2.x) + v0.x * (v1.y - v2.y) + v1.x * v2.y);
    let s = 1 / (2 * area) * (v0.y * v2.x - v0.x * v2.y + (v2.y - v0.y) * p.x + (v0.x - v2.x) * p.y);
    let t = 1 / (2 * area) * (v0.x * v1.y - v0.y * v1.x + (v0.y - v1.y) * p.x + (v1.x - v0.x) * p.y);

    return s > 0 && t > 0 && 1 - s - t > 0;
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
