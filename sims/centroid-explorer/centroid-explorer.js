// Centroid Explorer MicroSim
// Shows medians, centroid, and the 2:1 ratio property

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;

// Triangle vertices (draggable)
let vertices = [];
let draggingVertex = -1;

// Colors
let bgColor;
let triangleColor;
let medianColor;
let centroidColor;
let midpointColor;
let highlightColor;

// Animation
let showAnimation = false;
let animationProgress = 0;
let selectedMedian = -1;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    triangleColor = color(60, 60, 80);
    medianColor = color(0, 150, 136);
    centroidColor = color(220, 50, 50);
    midpointColor = color(30, 100, 200);
    highlightColor = color(255, 193, 7);

    // Initialize triangle vertices
    resetTriangle();

    textFont('Arial');
}

function resetTriangle() {
    vertices = [
        createVector(canvasWidth * 0.5, margin + 50),
        createVector(margin + 80, drawHeight - margin - 30),
        createVector(canvasWidth - margin - 80, drawHeight - margin - 30)
    ];
}

function draw() {
    background(bgColor);

    // Draw title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    text("Centroid Explorer", canvasWidth/2, 15);

    // Calculate midpoints
    let midpoints = [
        p5.Vector.add(vertices[1], vertices[2]).mult(0.5), // opposite to A
        p5.Vector.add(vertices[0], vertices[2]).mult(0.5), // opposite to B
        p5.Vector.add(vertices[0], vertices[1]).mult(0.5)  // opposite to C
    ];

    // Calculate centroid (intersection of medians)
    let centroid = createVector(
        (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
        (vertices[0].y + vertices[1].y + vertices[2].y) / 3
    );

    // Draw triangle
    stroke(triangleColor);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // Draw medians
    strokeWeight(2);
    for (let i = 0; i < 3; i++) {
        if (selectedMedian === i) {
            stroke(highlightColor);
            strokeWeight(4);
        } else {
            stroke(medianColor);
            strokeWeight(2);
        }
        line(vertices[i].x, vertices[i].y, midpoints[i].x, midpoints[i].y);
    }

    // Draw 2:1 ratio visualization when a median is selected
    if (selectedMedian >= 0) {
        drawRatioVisualization(vertices[selectedMedian], midpoints[selectedMedian], centroid);
    }

    // Draw midpoints
    fill(midpointColor);
    noStroke();
    for (let i = 0; i < 3; i++) {
        ellipse(midpoints[i].x, midpoints[i].y, 12, 12);
    }

    // Label midpoints
    fill(midpointColor);
    textSize(14);
    textAlign(CENTER, CENTER);
    let midLabels = ['M_a', 'M_b', 'M_c'];
    let midOffsets = [
        createVector(0, 20),
        createVector(15, 5),
        createVector(-15, 5)
    ];
    for (let i = 0; i < 3; i++) {
        text(midLabels[i], midpoints[i].x + midOffsets[i].x, midpoints[i].y + midOffsets[i].y);
    }

    // Draw centroid
    fill(centroidColor);
    noStroke();
    ellipse(centroid.x, centroid.y, 18, 18);

    // Label centroid
    fill(centroidColor);
    textSize(16);
    textAlign(LEFT, CENTER);
    text("G (Centroid)", centroid.x + 15, centroid.y);

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
        // Highlight if dragging
        if (draggingVertex === i) {
            fill(highlightColor);
            ellipse(vertices[i].x, vertices[i].y, 20, 20);
        } else {
            fill(triangleColor);
            ellipse(vertices[i].x, vertices[i].y, 16, 16);
        }

        // Labels
        fill(triangleColor);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(labels[i], vertices[i].x + offsets[i].x, vertices[i].y + offsets[i].y);
    }

    // Draw info box
    drawInfoBox(centroid);

    // Draw instructions
    fill(100);
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("Drag vertices to reshape triangle • Click a median to see the 2:1 ratio",
         canvasWidth/2, canvasHeight - 15);
}

function drawRatioVisualization(vertex, midpoint, centroid) {
    // Distance from vertex to centroid
    let d1 = p5.Vector.dist(vertex, centroid);
    // Distance from centroid to midpoint
    let d2 = p5.Vector.dist(centroid, midpoint);

    // Draw ratio markers
    push();
    stroke(highlightColor);
    strokeWeight(3);

    // Mark vertex to centroid segment
    let dir = p5.Vector.sub(midpoint, vertex).normalize();
    let perp = createVector(-dir.y, dir.x).mult(8);

    // Tick at vertex
    line(vertex.x + perp.x, vertex.y + perp.y,
         vertex.x - perp.x, vertex.y - perp.y);

    // Tick at centroid
    line(centroid.x + perp.x, centroid.y + perp.y,
         centroid.x - perp.x, centroid.y - perp.y);

    // Tick at midpoint
    line(midpoint.x + perp.x, midpoint.y + perp.y,
         midpoint.x - perp.x, midpoint.y - perp.y);

    pop();

    // Show ratio labels
    let labelPos1 = p5.Vector.lerp(vertex, centroid, 0.5);
    let labelPos2 = p5.Vector.lerp(centroid, midpoint, 0.5);

    fill(highlightColor);
    stroke(255);
    strokeWeight(3);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("2", labelPos1.x + perp.x * 2, labelPos1.y + perp.y * 2);
    text("1", labelPos2.x + perp.x * 2, labelPos2.y + perp.y * 2);
}

function drawInfoBox(centroid) {
    // Info box background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rectMode(CORNER);
    let boxX = 15;
    let boxY = 45;
    let boxW = 220;
    let boxH = 130;
    rect(boxX, boxY, boxW, boxH, 8);

    // Info text
    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    let y = boxY + 10;
    text("Properties of Centroid:", boxX + 10, y);
    y += 22;

    textSize(12);
    text("• Intersection of 3 medians", boxX + 10, y);
    y += 18;
    text("• Balance point of triangle", boxX + 10, y);
    y += 18;
    text("• Always inside triangle", boxX + 10, y);
    y += 18;
    text("• Divides each median 2:1", boxX + 10, y);
    y += 22;

    textSize(11);
    fill(100);
    text(`Centroid: (${centroid.x.toFixed(0)}, ${centroid.y.toFixed(0)})`, boxX + 10, y);
}

function mousePressed() {
    // Check if clicking on a vertex
    for (let i = 0; i < vertices.length; i++) {
        if (dist(mouseX, mouseY, vertices[i].x, vertices[i].y) < 15) {
            draggingVertex = i;
            return;
        }
    }

    // Check if clicking on a median
    let midpoints = [
        p5.Vector.add(vertices[1], vertices[2]).mult(0.5),
        p5.Vector.add(vertices[0], vertices[2]).mult(0.5),
        p5.Vector.add(vertices[0], vertices[1]).mult(0.5)
    ];

    for (let i = 0; i < 3; i++) {
        if (distToSegment(mouseX, mouseY,
            vertices[i].x, vertices[i].y,
            midpoints[i].x, midpoints[i].y) < 10) {
            selectedMedian = (selectedMedian === i) ? -1 : i;
            return;
        }
    }

    selectedMedian = -1;
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

function distToSegment(px, py, x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let t = max(0, min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
    let nearX = x1 + t * dx;
    let nearY = y1 + t * dy;
    return dist(px, py, nearX, nearY);
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
