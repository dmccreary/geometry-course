// Polygon Interior Angles Explorer MicroSim
// Shows how interior angles change with number of sides

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;

// Polygon properties
let numSides = 5;
let sidesSlider;
let showTriangulation = true;
let showAngles = true;
let radius = 140;

// Colors
let bgColor, polygonColor, triangleColors, angleColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(245, 245, 250);
    polygonColor = color(30, 60, 120);
    angleColor = color(200, 50, 50);

    triangleColors = [
        color(255, 220, 180, 150),
        color(180, 220, 255, 150),
        color(220, 255, 180, 150),
        color(255, 180, 220, 150),
        color(180, 255, 220, 150),
        color(220, 180, 255, 150),
        color(255, 255, 180, 150),
        color(180, 255, 255, 150),
        color(255, 180, 180, 150),
        color(180, 180, 255, 150)
    ];

    // Create slider
    sidesSlider = createSlider(3, 12, 5, 1);
    sidesSlider.parent('canvas-container');
    sidesSlider.position(170, drawHeight + 30);
    sidesSlider.size(200);

    textFont('Arial');
}

function draw() {
    background(bgColor);
    numSides = sidesSlider.value();

    // Draw title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("Polygon Interior Angles Explorer", canvasWidth/2, 12);

    // Calculate polygon vertices
    let centerX = 230;
    let centerY = drawHeight/2 + 20;
    let vertices = [];
    let startAngle = -HALF_PI;  // Start from top

    for (let i = 0; i < numSides; i++) {
        let angle = startAngle + (TWO_PI * i / numSides);
        vertices.push({
            x: centerX + radius * cos(angle),
            y: centerY + radius * sin(angle)
        });
    }

    // Draw triangulation
    if (showTriangulation) {
        for (let i = 1; i < numSides - 1; i++) {
            fill(triangleColors[i % triangleColors.length]);
            stroke(100, 100, 150, 100);
            strokeWeight(1);
            beginShape();
            vertex(vertices[0].x, vertices[0].y);
            vertex(vertices[i].x, vertices[i].y);
            vertex(vertices[i + 1].x, vertices[i + 1].y);
            endShape(CLOSE);
        }

        // Draw diagonal lines
        stroke(100, 150, 100);
        strokeWeight(2);
        setLineDash([4, 4]);
        for (let i = 2; i < numSides - 1; i++) {
            line(vertices[0].x, vertices[0].y, vertices[i].x, vertices[i].y);
        }
        setLineDash([]);
    }

    // Draw polygon outline
    stroke(polygonColor);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let v of vertices) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);

    // Draw angle arcs
    if (showAngles) {
        let interiorAngle = ((numSides - 2) * 180) / numSides;
        for (let i = 0; i < numSides; i++) {
            let prev = vertices[(i - 1 + numSides) % numSides];
            let curr = vertices[i];
            let next = vertices[(i + 1) % numSides];

            // Calculate angles for arc
            let angle1 = atan2(prev.y - curr.y, prev.x - curr.x);
            let angle2 = atan2(next.y - curr.y, next.x - curr.x);

            // Draw arc
            noFill();
            stroke(angleColor);
            strokeWeight(2);
            arc(curr.x, curr.y, 30, 30, angle2, angle1);
        }
    }

    // Draw vertices
    fill(polygonColor);
    noStroke();
    for (let i = 0; i < numSides; i++) {
        ellipse(vertices[i].x, vertices[i].y, 10, 10);
    }

    // Draw info panel
    drawInfoPanel();

    // Draw controls label
    fill(60);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Number of sides:", 50, drawHeight + 42);

    textSize(18);
    textAlign(LEFT, CENTER);
    text(numSides, 380, drawHeight + 42);

    // Draw polygon name
    textSize(14);
    textAlign(CENTER, CENTER);
    text(getPolygonName(numSides), 230, drawHeight + 75);

    // Draw checkboxes
    drawCheckboxes();
}

function drawInfoPanel() {
    // Info panel background
    let panelX = 430;
    let panelY = 60;
    let panelW = 250;
    let panelH = 320;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text("Angle Calculations", panelX + 15, panelY + 15);

    let y = panelY + 45;
    textSize(13);

    // Number of sides
    text("Number of sides (n):", panelX + 15, y);
    fill(polygonColor);
    text(numSides, panelX + 170, y);
    fill(40);
    y += 25;

    // Number of triangles
    text("Triangles formed:", panelX + 15, y);
    fill(100, 150, 100);
    text((numSides - 2), panelX + 170, y);
    fill(40);
    y += 30;

    // Interior angle sum formula
    textSize(12);
    fill(80);
    text("Interior Angle Sum:", panelX + 15, y);
    y += 20;
    fill(60);
    text("S = (n - 2) × 180°", panelX + 20, y);
    y += 20;
    text(`S = (${numSides} - 2) × 180°`, panelX + 20, y);
    y += 20;
    fill(200, 50, 50);
    textSize(14);
    text(`S = ${(numSides - 2) * 180}°`, panelX + 20, y);
    y += 35;

    // Each interior angle (for regular polygon)
    fill(80);
    textSize(12);
    text("Each Interior Angle:", panelX + 15, y);
    y += 20;
    fill(60);
    text("I = (n - 2) × 180° / n", panelX + 20, y);
    y += 20;
    text(`I = ${(numSides - 2) * 180}° / ${numSides}`, panelX + 20, y);
    y += 20;
    let eachAngle = ((numSides - 2) * 180) / numSides;
    fill(200, 50, 50);
    textSize(14);
    text(`I = ${eachAngle.toFixed(1)}°`, panelX + 20, y);
    y += 35;

    // Exterior angle
    fill(80);
    textSize(12);
    text("Each Exterior Angle:", panelX + 15, y);
    y += 20;
    fill(60);
    text(`e = 360° / ${numSides} = ${(360/numSides).toFixed(1)}°`, panelX + 20, y);
}

function drawCheckboxes() {
    let cbX = 480;
    let cbY = drawHeight + 25;

    // Triangulation checkbox
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(cbX, cbY, 16, 16, 3);
    if (showTriangulation) {
        fill(100, 150, 100);
        noStroke();
        rect(cbX + 3, cbY + 3, 10, 10, 2);
    }
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text("Show Triangulation", cbX + 22, cbY + 8);

    // Angles checkbox
    cbY += 30;
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(cbX, cbY, 16, 16, 3);
    if (showAngles) {
        fill(200, 50, 50);
        noStroke();
        rect(cbX + 3, cbY + 3, 10, 10, 2);
    }
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text("Show Angles", cbX + 22, cbY + 8);
}

function mousePressed() {
    let cbX = 480;
    let cbY = drawHeight + 25;

    // Check triangulation checkbox
    if (mouseX >= cbX && mouseX <= cbX + 120 && mouseY >= cbY && mouseY <= cbY + 16) {
        showTriangulation = !showTriangulation;
    }

    // Check angles checkbox
    cbY += 30;
    if (mouseX >= cbX && mouseX <= cbX + 100 && mouseY >= cbY && mouseY <= cbY + 16) {
        showAngles = !showAngles;
    }
}

function getPolygonName(n) {
    const names = {
        3: "Triangle",
        4: "Quadrilateral",
        5: "Pentagon",
        6: "Hexagon",
        7: "Heptagon",
        8: "Octagon",
        9: "Nonagon",
        10: "Decagon",
        11: "Hendecagon",
        12: "Dodecagon"
    };
    return names[n] || n + "-gon";
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function windowResized() {
    updateCanvasSize();
}

function updateCanvasSize() {
    let containerWidth = select('#canvas-container').width;
    if (containerWidth > 0) {
        canvasWidth = min(containerWidth, 750);
        resizeCanvas(canvasWidth, canvasHeight);
    }
}
