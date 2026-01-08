// Tessellation Explorer MicroSim
// Shows the three regular tessellations

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Current tessellation type
let tessType = 'hexagon';
let typeButtons = [];

// Colors
let bgColor;
let tessColors = {
    triangle: { fill: '#E3F2FD', stroke: '#1565C0' },
    square: { fill: '#FCE4EC', stroke: '#C2185B' },
    hexagon: { fill: '#FFF8E1', stroke: '#FF8F00' }
};

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(248, 250, 252);
    textFont('Arial');
}

function draw() {
    background(bgColor);

    // Draw title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("The Three Regular Tessellations", canvasWidth/2, 12);

    // Draw the tessellation
    push();
    translate(canvasWidth/2, drawHeight/2 + 30);
    if (tessType === 'triangle') {
        drawTriangleTess();
    } else if (tessType === 'square') {
        drawSquareTess();
    } else {
        drawHexagonTess();
    }
    pop();

    // Draw info panel
    drawInfoPanel();

    // Draw buttons
    drawButtons();
}

function drawTriangleTess() {
    let size = 50;
    let h = size * sqrt(3) / 2;

    fill(tessColors.triangle.fill);
    stroke(tessColors.triangle.stroke);
    strokeWeight(2);

    for (let row = -4; row <= 4; row++) {
        for (let col = -6; col <= 6; col++) {
            let x = col * size + (row % 2) * (size / 2);
            let y = row * h;

            // Upward triangle
            beginShape();
            vertex(x, y - h * 2/3);
            vertex(x - size/2, y + h/3);
            vertex(x + size/2, y + h/3);
            endShape(CLOSE);

            // Downward triangle
            beginShape();
            vertex(x + size/2, y - h/3);
            vertex(x, y + h * 2/3);
            vertex(x + size, y - h/3);
            endShape(CLOSE);
        }
    }

    // Highlight one vertex
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();
    ellipse(0, 0, 20, 20);

    // Show angles at vertex
    fill(255, 0, 0);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text("6×60°=360°", 0, -30);
}

function drawSquareTess() {
    let size = 55;

    fill(tessColors.square.fill);
    stroke(tessColors.square.stroke);
    strokeWeight(2);

    for (let row = -4; row <= 4; row++) {
        for (let col = -5; col <= 5; col++) {
            let x = col * size - size/2;
            let y = row * size - size/2;
            rect(x, y, size, size);
        }
    }

    // Highlight one vertex
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();
    ellipse(0, 0, 20, 20);

    // Show angles at vertex
    fill(255, 0, 0);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text("4×90°=360°", 0, -35);
}

function drawHexagonTess() {
    let size = 40;
    let h = size * sqrt(3);

    fill(tessColors.hexagon.fill);
    stroke(tessColors.hexagon.stroke);
    strokeWeight(2);

    for (let row = -3; row <= 3; row++) {
        for (let col = -4; col <= 4; col++) {
            let x = col * size * 1.5;
            let y = row * h + (col % 2) * (h / 2);
            drawHexagon(x, y, size);
        }
    }

    // Highlight one vertex
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();
    ellipse(0, -size * sqrt(3) / 2, 20, 20);

    // Show angles at vertex
    fill(255, 0, 0);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text("3×120°=360°", 0, -size * sqrt(3) / 2 - 25);
}

function drawHexagon(cx, cy, size) {
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = PI / 6 + i * PI / 3;
        let x = cx + size * cos(angle);
        let y = cy + size * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
}

function drawInfoPanel() {
    let panelX = 20;
    let panelY = 50;
    let panelW = 160;
    let panelH = 130;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    let info = getInfo();
    text(info.name, panelX + 10, panelY + 10);

    textSize(11);
    fill(80);
    let y = panelY + 35;
    text("Sides: " + info.sides, panelX + 10, y);
    y += 18;
    text("Interior angle: " + info.angle + "°", panelX + 10, y);
    y += 18;
    text("At each vertex:", panelX + 10, y);
    y += 16;
    fill(200, 50, 50);
    text(info.formula, panelX + 15, y);
    y += 20;
    fill(80);
    text("= 360° ✓", panelX + 15, y);
}

function getInfo() {
    if (tessType === 'triangle') {
        return { name: "Equilateral Triangle", sides: 3, angle: 60, formula: "6 × 60°" };
    } else if (tessType === 'square') {
        return { name: "Square", sides: 4, angle: 90, formula: "4 × 90°" };
    } else {
        return { name: "Regular Hexagon", sides: 6, angle: 120, formula: "3 × 120°" };
    }
}

function drawButtons() {
    let btnY = drawHeight + 30;
    let btnW = 120;
    let btnH = 40;
    let spacing = 150;
    let startX = canvasWidth/2 - spacing;

    let buttons = [
        { type: 'triangle', label: 'Triangles', x: startX - spacing/2 },
        { type: 'square', label: 'Squares', x: canvasWidth/2 },
        { type: 'hexagon', label: 'Hexagons', x: startX + spacing * 1.5 }
    ];

    for (let btn of buttons) {
        let isSelected = (tessType === btn.type);

        // Button background
        if (isSelected) {
            fill(tessColors[btn.type].stroke);
        } else {
            fill(230);
        }
        stroke(100);
        strokeWeight(1);
        rect(btn.x - btnW/2, btnY, btnW, btnH, 8);

        // Button text
        fill(isSelected ? 255 : 60);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text(btn.label, btn.x, btnY + btnH/2);
    }

    // Draw explanation
    fill(80);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Only these three regular polygons tessellate the plane (vertex angles must sum to 360°)",
         canvasWidth/2, drawHeight + 85);
}

function mousePressed() {
    let btnY = drawHeight + 30;
    let btnW = 120;
    let btnH = 40;
    let spacing = 150;
    let startX = canvasWidth/2 - spacing;

    let buttons = [
        { type: 'triangle', x: startX - spacing/2 },
        { type: 'square', x: canvasWidth/2 },
        { type: 'hexagon', x: startX + spacing * 1.5 }
    ];

    for (let btn of buttons) {
        if (mouseX >= btn.x - btnW/2 && mouseX <= btn.x + btnW/2 &&
            mouseY >= btnY && mouseY <= btnY + btnH) {
            tessType = btn.type;
            break;
        }
    }
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
