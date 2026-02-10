// Soccer Ball (Truncated Icosahedron/Buckyball) Simulation
// A soccer ball has 12 black pentagonal panels and 20 white hexagonal panels
// Adapted from the Coding Train dodecahedron example
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l

// Canvas dimensions - responsive
let canvasWidth = 670;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

let ball;
let rotationSpeedSlider;
let zoomSlider;
let speedLabel;
let zoomLabel;
let rotationSpeed = 0.01;
let zoomLevel = 600;

function setup() {
    // Get the parent container width for responsive sizing
    const mainElement = document.querySelector('main');
    canvasWidth = mainElement ? mainElement.offsetWidth : windowWidth;
    canvasHeight = drawHeight + controlHeight;

    const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    canvas.parent(mainElement);

    // Create speed label and slider using HTML elements (WEBGL doesn't support text without font)
    speedLabel = createDiv('Speed: 2');
    speedLabel.position(10, drawHeight + 20);
    speedLabel.style('font-family', 'Arial, sans-serif');
    speedLabel.style('font-size', '14px');

    rotationSpeedSlider = createSlider(0, 50, 2, 1);
    rotationSpeedSlider.position(100, drawHeight + 20);
    rotationSpeedSlider.size(120);

    // Create zoom label and slider using HTML elements
    zoomLabel = createDiv('Zoom: 2000');
    zoomLabel.position(canvasWidth / 2 + 10, drawHeight + 20);
    zoomLabel.style('font-family', 'Arial, sans-serif');
    zoomLabel.style('font-size', '14px');

    zoomSlider = createSlider(1200, 4000, 2000, 10);
    zoomSlider.position(canvasWidth / 2 + 100, drawHeight + 20);
    zoomSlider.size(120);

    ball = new SoccerBall(120);
    ball.addVertices();
    ball.addFaces();
}

function draw() {
    // Was a Sky blue background for drawing area
    // turned to Alice Blue for better contrast with white panels
    background('aliceblue');

    // Update values from sliders
    rotationSpeed = rotationSpeedSlider.value() / 1000;
    zoomLevel = zoomSlider.value();

    // Update HTML labels with current values
    speedLabel.html('Speed: ' + rotationSpeedSlider.value());
    zoomLabel.html('Zoom: ' + zoomSlider.value());

    // Draw control area background (in 2D)
    push();
    resetMatrix();
    translate(-canvasWidth/2, drawHeight);
    fill(245);
    noStroke();
    rect(0, 0, canvasWidth, controlHeight);
    pop();

    // Position camera for zoom
    push();
    translate(0, -25, -zoomLevel + 600);

    // Add lighting for 3D effect
    ambientLight(150);
    directionalLight(255, 255, 255, 0.5, 0.5, -1);
    pointLight(255, 255, 255, -200, -200, 200);

    // Rotate the ball
    rotateY(frameCount * rotationSpeed);
    rotateX(frameCount * rotationSpeed * 0.7);

    // Draw the soccer ball
    ball.show();
    pop();
}

function windowResized() {
    // Get the parent container width for responsive sizing
    const mainElement = document.querySelector('main');
    canvasWidth = mainElement ? mainElement.offsetWidth : windowWidth;
    canvasHeight = drawHeight + controlHeight;

    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition zoom controls based on new width
    zoomLabel.position(canvasWidth / 2 + 10, drawHeight + 20);
    zoomSlider.position(canvasWidth / 2 + 100, drawHeight + 20);
}

function mousePressed() {
    // Only save if click is in the drawing area
    if (mouseY < drawHeight) {
        save('soccer-ball.png');
    }
}

class SoccerBall {
    constructor(r) {
        this.r = r;
        this.vert = [];
        this.faces = [];
    }

    // Vertices from https://www.goldennumber.net/bucky-balls/
    addVertices() {
        let phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
        this.vert.push(createVector(0, 1, 3 * phi));
        this.vert.push(createVector(0, 1, -3 * phi));
        this.vert.push(createVector(0, -1, 3 * phi));
        this.vert.push(createVector(0, -1, -3 * phi));
        this.vert.push(createVector(1, 3 * phi, 0));
        this.vert.push(createVector(1, -3 * phi, 0));
        this.vert.push(createVector(-1, 3 * phi, 0));
        this.vert.push(createVector(-1, -3 * phi, 0));
        this.vert.push(createVector(3 * phi, 0, 1));
        this.vert.push(createVector(3 * phi, 0, -1));
        this.vert.push(createVector(-3 * phi, 0, 1));
        this.vert.push(createVector(-3 * phi, 0, -1));
        this.vert.push(createVector(2, 1 + 2 * phi, phi));
        this.vert.push(createVector(2, 1 + 2 * phi, -phi));
        this.vert.push(createVector(2, -(1 + 2 * phi), phi));
        this.vert.push(createVector(2, -(1 + 2 * phi), -phi));
        this.vert.push(createVector(-2, 1 + 2 * phi, phi));
        this.vert.push(createVector(-2, 1 + 2 * phi, -phi));
        this.vert.push(createVector(-2, -(1 + 2 * phi), phi));
        this.vert.push(createVector(-2, -(1 + 2 * phi), -phi));
        this.vert.push(createVector(1 + 2 * phi, phi, 2));
        this.vert.push(createVector(1 + 2 * phi, phi, -2));
        this.vert.push(createVector(1 + 2 * phi, -phi, 2));
        this.vert.push(createVector(1 + 2 * phi, -phi, -2));
        this.vert.push(createVector(-(1 + 2 * phi), phi, 2));
        this.vert.push(createVector(-(1 + 2 * phi), phi, -2));
        this.vert.push(createVector(-(1 + 2 * phi), -phi, 2));
        this.vert.push(createVector(-(1 + 2 * phi), -phi, -2));
        this.vert.push(createVector(phi, 2, 1 + 2 * phi));
        this.vert.push(createVector(phi, 2, -(1 + 2 * phi)));
        this.vert.push(createVector(phi, -2, 1 + 2 * phi));
        this.vert.push(createVector(phi, -2, -(1 + 2 * phi)));
        this.vert.push(createVector(-phi, 2, 1 + 2 * phi));
        this.vert.push(createVector(-phi, 2, -(1 + 2 * phi)));
        this.vert.push(createVector(-phi, -2, 1 + 2 * phi));
        this.vert.push(createVector(-phi, -2, -(1 + 2 * phi)));
        this.vert.push(createVector(1, 2 + phi, 2 * phi));
        this.vert.push(createVector(1, 2 + phi, -2 * phi));
        this.vert.push(createVector(1, -(2 + phi), 2 * phi));
        this.vert.push(createVector(1, -(2 + phi), -2 * phi));
        this.vert.push(createVector(-1, 2 + phi, 2 * phi));
        this.vert.push(createVector(-1, 2 + phi, -2 * phi));
        this.vert.push(createVector(-1, -(2 + phi), 2 * phi));
        this.vert.push(createVector(-1, -(2 + phi), -2 * phi));
        this.vert.push(createVector(2 + phi, 2 * phi, 1));
        this.vert.push(createVector(2 + phi, 2 * phi, -1));
        this.vert.push(createVector(2 + phi, -2 * phi, 1));
        this.vert.push(createVector(2 + phi, -2 * phi, -1));
        this.vert.push(createVector(-(2 + phi), 2 * phi, 1));
        this.vert.push(createVector(-(2 + phi), 2 * phi, -1));
        this.vert.push(createVector(-(2 + phi), -2 * phi, 1));
        this.vert.push(createVector(-(2 + phi), -2 * phi, -1));
        this.vert.push(createVector(2 * phi, 1, 2 + phi));
        this.vert.push(createVector(2 * phi, 1, -(2 + phi)));
        this.vert.push(createVector(2 * phi, -1, 2 + phi));
        this.vert.push(createVector(2 * phi, -1, -(2 + phi)));
        this.vert.push(createVector(-2 * phi, 1, 2 + phi));
        this.vert.push(createVector(-2 * phi, 1, -(2 + phi)));
        this.vert.push(createVector(-2 * phi, -1, 2 + phi));
        this.vert.push(createVector(-2 * phi, -1, -(2 + phi)));
        // Scale all vertices by radius
        this.vert.forEach((v) => v.mult(this.r));
    }

    // Add faces to the soccer ball
    addFaces() {
        // Pentagon faces (12 total) - these will be BLACK
        this.faces.push([42, 38, 30, 2, 34]);
        this.faces.push([16, 6, 17, 49, 48]);
        this.faces.push([0, 28, 36, 40, 32]);
        this.faces.push([1, 29, 37, 41, 33]);
        this.faces.push([27, 59, 57, 25, 11]);
        this.faces.push([52, 54, 22, 8, 20]);
        this.faces.push([12, 44, 45, 13, 4]);
        this.faces.push([26, 58, 56, 24, 10]);
        this.faces.push([39, 31, 3, 35, 43]);
        this.faces.push([55, 23, 9, 21, 53]);
        this.faces.push([47, 46, 14, 5, 15]);
        this.faces.push([19, 7, 18, 50, 51]);

        // Hexagon faces (20 total) - these will be WHITE
        this.faces.push([0, 2, 34, 58, 56, 32]);
        this.faces.push([0, 2, 30, 54, 52, 28]);
        this.faces.push([1, 3, 31, 55, 53, 29]);
        this.faces.push([1, 3, 35, 59, 57, 33]);
        this.faces.push([4, 6, 16, 40, 36, 12]);
        this.faces.push([4, 6, 17, 41, 37, 13]);
        this.faces.push([5, 7, 19, 43, 39, 15]);
        this.faces.push([5, 14, 38, 42, 18, 7]);
        this.faces.push([8, 9, 21, 45, 44, 20]);
        this.faces.push([8, 22, 46, 47, 23, 9]);
        this.faces.push([10, 11, 25, 49, 48, 24]);
        this.faces.push([10, 11, 27, 51, 50, 26]);
        this.faces.push([13, 37, 29, 53, 21, 45]);
        this.faces.push([14, 38, 30, 54, 22, 46]);
        this.faces.push([16, 40, 32, 56, 24, 48]);
        this.faces.push([18, 42, 34, 58, 26, 50]);
        this.faces.push([19, 43, 35, 59, 27, 51]);
        this.faces.push([12, 44, 20, 52, 28, 36]);
        this.faces.push([15, 47, 23, 55, 31, 39]);
        this.faces.push([17, 49, 25, 57, 33, 41]);
    }

    // Draw the soccer ball with black pentagons and white hexagons
    show() {
        strokeWeight(2);
        stroke(50);

        // Draw the 12 pentagon faces (BLACK)
        for (let i = 0; i < 12; i++) {
            fill(30, 30, 30); // Black
            beginShape();
            for (let j = 0; j < this.faces[i].length; j++) {
                let v = this.vert[this.faces[i][j]];
                vertex(v.x, v.y, v.z);
            }
            endShape(CLOSE);
        }

        // Draw the 20 hexagon faces (WHITE) - use emissiveMaterial for pure white
        noStroke();
        emissiveMaterial(255, 255, 255); // Pure white, unaffected by lighting
        for (let i = 12; i < this.faces.length; i++) {
            beginShape();
            for (let j = 0; j < this.faces[i].length; j++) {
                let v = this.vert[this.faces[i][j]];
                vertex(v.x, v.y, v.z);
            }
            endShape(CLOSE);
        }

        // Draw white hexagon outlines separately
        stroke(50);
        strokeWeight(2);
        noFill();
        for (let i = 12; i < this.faces.length; i++) {
            beginShape();
            for (let j = 0; j < this.faces[i].length; j++) {
                let v = this.vert[this.faces[i][j]];
                vertex(v.x, v.y, v.z);
            }
            endShape(CLOSE);
        }
    }
}
