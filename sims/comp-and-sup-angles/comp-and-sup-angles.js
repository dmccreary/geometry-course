// Complementary and Supplementary Angles

let canvasWidth = 735;
let drawWidth = canvasWidth;
let drawHeight = 300;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

let mySlider;
let isDragging = false; // Flag to check if dragging
let cx, cy, rayLength;
let x_end, y_end;

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // Initialize slider
    mySlider = createSlider(0, 180, 45, 1);
    mySlider.position(sliderLeftMargin, drawHeight + 17);
    mySlider.size(canvasWidth - sliderLeftMargin - 15);

    // Initialize center and ray length
    cx = canvasWidth / 2;
    cy = drawHeight - 50;
    rayLength = 180;

    // Initialize endpoint variables
    x_end = cx + rayLength * cos(radians(mySlider.value()));
    y_end = cy - rayLength * sin(radians(mySlider.value()));
}

function draw() {
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);
    noStroke();

    let mySliderValue = mySlider.value();
    let theta = radians(mySliderValue);

    // Update global `x_end` and `y_end`
    x_end = cx + rayLength * cos(theta);
    y_end = cy - rayLength * sin(theta);

    // Draw fixed ray along x-axis
    stroke('black');
    strokeWeight(2);
    line(cx, cy, cx + rayLength, cy);

    // Draw moving ray
    line(cx, cy, x_end, y_end);
    fill('orange');
    circle(x_end, y_end, 7);

    // Draw primary angle arc
    noFill();
    stroke('red');
    strokeWeight(4);
    arc(cx, cy, 100, 100, -theta, 0, OPEN);

    // Draw complementary and supplementary arcs
    if (mySliderValue < 90) {
        stroke('green');
        arc(cx, cy, 190, 190, -PI / 2, -theta, OPEN);
    }
    if (mySliderValue < 180) {
        stroke('purple');
        arc(cx, cy, 300, 300, -PI, -theta, OPEN);
    }

    // Display angle and labels
    strokeWeight(1);
    fill('black');
    noStroke();
    textSize(24);
    let offset = 20;
    let textX = x_end + cos(-theta) * offset;
    let textY = y_end + sin(-theta) * offset * 1.1 - 7;
    text(mySliderValue + "°", textX, textY);

    let angleName = "";
    if (mySliderValue == 0) {
        angleName = "Zero Angle";
    } else if (mySliderValue < 90) {
        angleName = "Acute Angle";
    } else if (mySliderValue == 90) {
        angleName = "Right Angle";
    } else if (mySliderValue < 180) {
        angleName = "Obtuse Angle";
    } else if (mySliderValue == 180) {
        angleName = "Straight Angle";
    }

    textSize(16);
    text(angleName, drawWidth - 130, 50);
  
    stroke('green');
    let complementText = "";
    if (mySliderValue < 90) {
        let complement = 90 - mySliderValue;
        complementText = "Complement: " + complement + "°";
    } else if (mySliderValue == 90) {
        complementText = "Complement: None";
    } else {
        complementText = "Complement: N/A";
    }
    textSize(20);
    text(complementText, 20, 30);

    stroke('purple');
    let supplementText = "";
    if (mySliderValue < 180) {
        let supplement = 180 - mySliderValue;
        supplementText = "Supplement: " + supplement + "°";
    } else if (mySliderValue == 180) {
        supplementText = "Supplement: None";
    } else {
        supplementText = "Supplement: N/A";
    }
    text(supplementText, 20, 60);

    noStroke();
    textSize(16);
    fill('black');
    text("Angle: " + mySliderValue + "°", 10, drawHeight + 25);

    if (isDragging) {
        let dx = mouseX - cx;
        let dy = cy - mouseY;
        let angle = atan2(dy, dx);
        let sliderAngle = degrees(angle);
        if (sliderAngle < 0) sliderAngle += 360;
        if (sliderAngle <= 180) {
            mySlider.value(sliderAngle);
        }
    }
}

function mousePressed() {
    // Check distance from endpoint to mouse position
    let d = dist(mouseX, mouseY, x_end, y_end);
    if (d < 10) {
        isDragging = true;
    }
}

function mouseReleased() {
    isDragging = false;
}