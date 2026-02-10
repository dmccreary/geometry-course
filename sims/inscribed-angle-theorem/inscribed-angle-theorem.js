// Inscribed Angle Theorem MicroSim
// Demonstrates that inscribed angle = half of central angle

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Circle parameters
let centerX, centerY;
let circleRadius = 150;

// Angle parameters
let centralAngleSlider;
let centralAngle = 90; // degrees
let inscribedVertex = 180; // degrees (position on circle)

// Colors
let bgColor;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');

    bgColor = color(248, 250, 252);
    centerX = canvasWidth / 2 - 80;
    centerY = drawHeight / 2 + 30;

    // Create slider for central angle
    centralAngleSlider = createSlider(30, 180, 90, 5);
    centralAngleSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    centralAngleSlider.size(200);
    centralAngleSlider.parent('canvas-container');

    textFont('Arial');
}

function draw() {
    background(bgColor);
    centralAngle = centralAngleSlider.value();

    // Title
    fill(40);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text("Inscribed Angle Theorem", canvasWidth/2, 12);

    // Draw circle
    stroke(100);
    strokeWeight(2);
    noFill();
    ellipse(centerX, centerY, circleRadius * 2, circleRadius * 2);

    // Calculate arc endpoints (A and B)
    // Place arc at bottom of circle for visibility
    let startAngle = 270 - centralAngle/2; // degrees
    let endAngle = 270 + centralAngle/2;   // degrees

    let pointA = {
        x: centerX + circleRadius * cos(radians(startAngle)),
        y: centerY + circleRadius * sin(radians(startAngle))
    };

    let pointB = {
        x: centerX + circleRadius * cos(radians(endAngle)),
        y: centerY + circleRadius * sin(radians(endAngle))
    };

    // Inscribed angle vertex (P) - at top of circle
    let inscribedAnglePos = 90; // degrees - at top
    let pointP = {
        x: centerX + circleRadius * cos(radians(inscribedAnglePos)),
        y: centerY + circleRadius * sin(radians(inscribedAnglePos))
    };

    // Draw intercepted arc (highlighted in yellow)
    stroke(255, 193, 7);
    strokeWeight(6);
    noFill();
    arc(centerX, centerY, circleRadius * 2, circleRadius * 2,
        radians(startAngle), radians(endAngle));

    // Draw central angle (from center to A and B)
    stroke(30, 136, 229);
    strokeWeight(3);
    line(centerX, centerY, pointA.x, pointA.y);
    line(centerX, centerY, pointB.x, pointB.y);

    // Draw central angle arc
    stroke(30, 136, 229);
    strokeWeight(2);
    noFill();
    let arcRadius = 30;
    arc(centerX, centerY, arcRadius * 2, arcRadius * 2,
        radians(startAngle), radians(endAngle));

    // Draw inscribed angle (from P to A and B)
    stroke(220, 20, 60);
    strokeWeight(3);
    line(pointP.x, pointP.y, pointA.x, pointA.y);
    line(pointP.x, pointP.y, pointB.x, pointB.y);

    // Draw inscribed angle arc
    let inscribedAngle = centralAngle / 2;
    let toA = atan2(pointA.y - pointP.y, pointA.x - pointP.x);
    let toB = atan2(pointB.y - pointP.y, pointB.x - pointP.x);

    stroke(220, 20, 60);
    strokeWeight(2);
    noFill();
    // Ensure correct arc drawing direction
    if (toA > toB) {
        arc(pointP.x, pointP.y, 40, 40, toB, toA);
    } else {
        arc(pointP.x, pointP.y, 40, 40, toA, toB);
    }

    // Draw center point
    fill(30, 136, 229);
    noStroke();
    ellipse(centerX, centerY, 10, 10);

    // Draw points on circle
    fill(60);
    ellipse(pointA.x, pointA.y, 10, 10);
    ellipse(pointB.x, pointB.y, 10, 10);
    fill(220, 20, 60);
    ellipse(pointP.x, pointP.y, 12, 12);

    // Labels
    noStroke();
    textSize(16);

    // Point labels
    fill(60);
    text("A", pointA.x - 20, pointA.y + 5);
    text("B", pointB.x + 20, pointB.y + 5);
    fill(220, 20, 60);
    text("P", pointP.x, pointP.y - 20);

    // Center label
    fill(30, 136, 229);
    textSize(14);
    text("O", centerX - 15, centerY - 5);

    // Angle labels
    fill(30, 136, 229);
    textSize(13);
    text(centralAngle + "°", centerX, centerY + 50);

    fill(220, 20, 60);
    text(inscribedAngle.toFixed(0) + "°", pointP.x + 30, pointP.y + 30);

    // Arc label
    fill(180, 140, 0);
    textSize(12);
    text("Arc AB", centerX, centerY + circleRadius + 25);

    // Draw info panel
    drawInfoPanel();

    // Control label
    fill(60);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Central Angle: " + centralAngle + "°", canvasWidth/2, drawHeight + 35);
}

function drawInfoPanel() {
    let panelX = canvasWidth - 210;
    let panelY = 50;
    let panelW = 195;
    let panelH = 220;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 10);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text("Inscribed Angle Theorem", panelX + 10, panelY + 15);

    textSize(12);
    fill(80);
    let y = panelY + 42;

    // Central angle
    fill(30, 136, 229);
    text("● Central angle:", panelX + 10, y);
    fill(60);
    text("  " + centralAngle + "°", panelX + 10, y + 16);
    y += 40;

    // Inscribed angle
    fill(220, 20, 60);
    text("● Inscribed angle:", panelX + 10, y);
    fill(60);
    let inscribedAngle = centralAngle / 2;
    text("  " + inscribedAngle.toFixed(0) + "°", panelX + 10, y + 16);
    y += 40;

    // Relationship
    fill(40);
    textSize(11);
    text("Relationship:", panelX + 10, y);
    y += 18;
    fill(80);
    text("Inscribed = ½ × Central", panelX + 10, y);
    y += 15;
    text(inscribedAngle.toFixed(0) + "° = ½ × " + centralAngle + "°", panelX + 10, y);
    y += 25;

    // Key insight
    fill(100);
    textSize(10);
    text("Both angles intercept", panelX + 10, y);
    y += 13;
    text("the same arc (AB)", panelX + 10, y);
}

function windowResized() {
    updateCanvasSize();
}

function updateCanvasSize() {
    let containerWidth = select('#canvas-container').width;
    if (containerWidth > 0) {
        canvasWidth = min(containerWidth, 750);
        resizeCanvas(canvasWidth, canvasHeight);
        centerX = canvasWidth / 2 - 80;
        centralAngleSlider.position(canvasWidth/2 - 100, drawHeight + 55);
    }
}
