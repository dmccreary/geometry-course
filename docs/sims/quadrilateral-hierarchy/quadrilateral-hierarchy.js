// Quadrilateral Hierarchy MicroSim
// Shows the family tree of quadrilaterals

let canvasWidth = 700;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Selected quadrilateral for highlighting
let selected = null;
let hovered = null;

// Quadrilateral definitions
let quads = {};

// Colors
let bgColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(248, 250, 252);

    // Define quadrilateral positions and properties
    quads = {
        quadrilateral: {
            x: canvasWidth/2, y: 50,
            w: 140, h: 50,
            color: color(200, 200, 200),
            label: "Quadrilateral",
            desc: "4 sides, angles sum to 360°",
            shape: "general"
        },
        trapezoid: {
            x: canvasWidth/2 - 170, y: 140,
            w: 130, h: 45,
            color: color(173, 216, 230),
            label: "Trapezoid",
            desc: "1 pair parallel sides",
            shape: "trapezoid"
        },
        kite: {
            x: canvasWidth/2 + 170, y: 140,
            w: 100, h: 45,
            color: color(255, 182, 193),
            label: "Kite",
            desc: "2 pairs consecutive equal sides",
            shape: "kite"
        },
        parallelogram: {
            x: canvasWidth/2, y: 230,
            w: 140, h: 45,
            color: color(144, 238, 144),
            label: "Parallelogram",
            desc: "2 pairs parallel sides",
            shape: "parallelogram"
        },
        isoscelesTrap: {
            x: canvasWidth/2 - 170, y: 230,
            w: 150, h: 45,
            color: color(135, 206, 250),
            label: "Isosceles Trap.",
            desc: "Trapezoid + equal legs",
            shape: "isoscelesTrap"
        },
        rectangle: {
            x: canvasWidth/2 - 90, y: 340,
            w: 120, h: 45,
            color: color(221, 160, 221),
            label: "Rectangle",
            desc: "Parallelogram + 4 right angles",
            shape: "rectangle"
        },
        rhombus: {
            x: canvasWidth/2 + 90, y: 340,
            w: 110, h: 45,
            color: color(255, 200, 150),
            label: "Rhombus",
            desc: "Parallelogram + 4 equal sides",
            shape: "rhombus"
        },
        square: {
            x: canvasWidth/2, y: 450,
            w: 100, h: 50,
            color: color(255, 255, 150),
            label: "Square",
            desc: "Rectangle + Rhombus",
            shape: "square"
        }
    };

    textFont('Arial');
}

function draw() {
    background(bgColor);

    // Draw title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("Quadrilateral Family Hierarchy", canvasWidth/2, 12);

    // Draw connections first (behind boxes)
    drawConnections();

    // Check for hover
    hovered = null;
    for (let key in quads) {
        let q = quads[key];
        if (mouseX >= q.x - q.w/2 && mouseX <= q.x + q.w/2 &&
            mouseY >= q.y && mouseY <= q.y + q.h) {
            hovered = key;
            break;
        }
    }

    // Draw all quadrilateral boxes
    for (let key in quads) {
        drawQuadBox(key);
    }

    // Draw selected info panel
    if (hovered) {
        drawInfoPanel(quads[hovered]);
    }

    // Draw instructions
    fill(100);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text("Hover over shapes to see properties • Arrows show 'is a special type of' relationships",
         canvasWidth/2, canvasHeight - 15);
}

function drawConnections() {
    stroke(120);
    strokeWeight(2);

    // Quadrilateral to children
    drawArrow(quads.quadrilateral.x - 50, quads.quadrilateral.y + quads.quadrilateral.h,
              quads.trapezoid.x, quads.trapezoid.y);
    drawArrow(quads.quadrilateral.x, quads.quadrilateral.y + quads.quadrilateral.h,
              quads.parallelogram.x, quads.parallelogram.y);
    drawArrow(quads.quadrilateral.x + 50, quads.quadrilateral.y + quads.quadrilateral.h,
              quads.kite.x, quads.kite.y);

    // Trapezoid to isosceles
    drawArrow(quads.trapezoid.x, quads.trapezoid.y + quads.trapezoid.h,
              quads.isoscelesTrap.x, quads.isoscelesTrap.y);

    // Parallelogram to rectangle and rhombus
    drawArrow(quads.parallelogram.x - 30, quads.parallelogram.y + quads.parallelogram.h,
              quads.rectangle.x, quads.rectangle.y);
    drawArrow(quads.parallelogram.x + 30, quads.parallelogram.y + quads.parallelogram.h,
              quads.rhombus.x, quads.rhombus.y);

    // Rectangle and rhombus to square
    drawArrow(quads.rectangle.x + 30, quads.rectangle.y + quads.rectangle.h,
              quads.square.x - 20, quads.square.y);
    drawArrow(quads.rhombus.x - 30, quads.rhombus.y + quads.rhombus.h,
              quads.square.x + 20, quads.square.y);
}

function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);

    // Arrowhead
    let angle = atan2(y2 - y1, x2 - x1);
    let arrowSize = 8;
    push();
    translate(x2, y2);
    rotate(angle);
    fill(120);
    noStroke();
    triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
    pop();
}

function drawQuadBox(key) {
    let q = quads[key];
    let isHovered = (hovered === key);

    // Box shadow
    if (isHovered) {
        fill(0, 0, 0, 30);
        noStroke();
        rect(q.x - q.w/2 + 4, q.y + 4, q.w, q.h, 8);
    }

    // Box
    fill(isHovered ? lerpColor(q.color, color(255), 0.3) : q.color);
    stroke(isHovered ? color(50, 100, 200) : color(100));
    strokeWeight(isHovered ? 3 : 2);
    rect(q.x - q.w/2, q.y, q.w, q.h, 8);

    // Label
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(isHovered ? 14 : 13);
    text(q.label, q.x, q.y + q.h/2);

    // Draw mini shape preview
    push();
    translate(q.x - q.w/2 + 20, q.y + q.h/2);
    drawMiniShape(q.shape);
    pop();
}

function drawMiniShape(shape) {
    stroke(60);
    strokeWeight(1.5);
    noFill();
    let s = 12;

    switch(shape) {
        case "general":
            beginShape();
            vertex(-s, -s/2);
            vertex(s*0.8, -s*0.8);
            vertex(s, s/2);
            vertex(-s*0.6, s*0.7);
            endShape(CLOSE);
            break;
        case "trapezoid":
            beginShape();
            vertex(-s*0.6, -s/2);
            vertex(s*0.6, -s/2);
            vertex(s, s/2);
            vertex(-s, s/2);
            endShape(CLOSE);
            break;
        case "isoscelesTrap":
            beginShape();
            vertex(-s*0.5, -s/2);
            vertex(s*0.5, -s/2);
            vertex(s*0.9, s/2);
            vertex(-s*0.9, s/2);
            endShape(CLOSE);
            break;
        case "kite":
            beginShape();
            vertex(0, -s);
            vertex(s*0.6, 0);
            vertex(0, s*0.8);
            vertex(-s*0.6, 0);
            endShape(CLOSE);
            break;
        case "parallelogram":
            beginShape();
            vertex(-s*0.7, -s/2);
            vertex(s, -s/2);
            vertex(s*0.7, s/2);
            vertex(-s, s/2);
            endShape(CLOSE);
            break;
        case "rectangle":
            rect(-s, -s*0.6, s*2, s*1.2);
            break;
        case "rhombus":
            beginShape();
            vertex(0, -s*0.7);
            vertex(s, 0);
            vertex(0, s*0.7);
            vertex(-s, 0);
            endShape(CLOSE);
            break;
        case "square":
            rect(-s*0.7, -s*0.7, s*1.4, s*1.4);
            break;
    }
}

function drawInfoPanel(q) {
    let panelX = 20;
    let panelY = drawHeight - 120;
    let panelW = 280;
    let panelH = 100;

    fill(255, 255, 255, 240);
    stroke(100);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(q.label, panelX + 15, panelY + 12);

    textSize(12);
    fill(80);
    text("Key property:", panelX + 15, panelY + 40);
    fill(60);
    text(q.desc, panelX + 15, panelY + 58);

    // Draw larger shape preview
    push();
    translate(panelX + panelW - 50, panelY + panelH/2);
    scale(2.5);
    drawMiniShape(q.shape);
    pop();
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
