// Updated MicroSim for Cosine Illustration

let canvasWidth = 600;
let drawWidth = canvasWidth;
let drawHeight = 400;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 195;
let defaultTextSize = 16;
let mySlider;
let radius = 150; // Hypotenuse length for visualization

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(defaultTextSize);

    // Create a slider to adjust the angle
    mySlider = createSlider(0, 359, 45, 1); // Angle in degrees
    mySlider.position(sliderLeftMargin, drawHeight + 18);
    mySlider.size(canvasWidth - sliderLeftMargin - 20);
}

function draw() {
    // Drawing background regions
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get the current angle from the slider
    let angleDegrees = mySlider.value();
    let angleRadians = radians(angleDegrees);

    // Calculate adjacent and hypotenuse lengths
    let adjacent = radius * cos(angleRadians);
    let hypotenuse = radius; // Hypotenuse is fixed for visualization

    // Draw the triangle
    translate(canvasWidth / 2, drawHeight / 2); // Center of the canvas
    stroke('black');
    fill('lightgray');

    // Hypotenuse line
    stroke('green');
    strokeWeight(2);
    line(0, 0, radius * cos(angleRadians), -radius * sin(angleRadians));

    // Adjacent line
    stroke('orange')
    line(0, 0, radius * cos(angleRadians), 0);

    // Opposite line
    stroke('purple');
    strokeWeight(1);
    line(radius * cos(angleRadians), 0, radius * cos(angleRadians), -radius * sin(angleRadians));
  
    // Right angle rectangle
    noFill();
    if (angleRadians < PI)
      vOffset = -10;
    else vOffset = 0;
    
    if (angleRadians < PI/2 || angleRadians > 3*PI/2)
      xOffset = -10;
    else xOffset = 0;
  
    rect(radius * cos(angleRadians) + xOffset, vOffset, 10, 10)

    // Draw angle arc inside the triangle
    noFill();
    stroke('blue')
    // top right
    if (angleRadians < PI/2) 
      arc(0, 0, 50, 50, -angleRadians, 0);
  
    // top left
    else if (angleRadians < PI) 
      arc(0, 0, 50, 50, -PI, -angleRadians);
  
    // lower left
    else if (angleRadians < 3*PI/2) 
      arc(0, 0, 50, 50, -angleRadians, -PI);
  
    // lower right
    else 
      arc(0, 0, 50, 50, 0, -angleRadians);
  
  // Reset translation for text
    resetMatrix();

    // Display text information
    fill('black');
    noStroke();
    textAlign(LEFT);
    text(`Angle: ${angleDegrees}°`, 10, 20);
    fill('orange');
    text(`Adjacent: ${adjacent.toFixed(2)}`, 10, 40);
    fill('green');
    text(`Hypotenuse: ${hypotenuse.toFixed(2)}`, 10, 60);
    fill('black');
    text(`Cosine Ratio: ${(adjacent / hypotenuse).toFixed(2)}`, 10, 80);

    // Display slider value
    text("Adjust Angle (Degrees):", 10, drawHeight + 25);
}
