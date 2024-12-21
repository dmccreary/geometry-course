// Updated MicroSim for Cosine Illustration

let canvasWidth = 700;
let drawWidth = canvasWidth;
let drawHeight = 400;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

let margin = 25;
let sliderLeftMargin = 195;
let defaultTextSize = 16;
let mySlider;

let radius = 150;   // Hypotenuse length for triangle visualization

// Parameters for the cosine wave
let waveOriginX = 450; // where the wave starts on the x-axis
let waveWidth   = 200; // width for one full 0-360° cycle
let amplitude   = 80;  // "height" of the wave

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
  
  //--- 1) BACKGROUND / CONTROL AREA ---
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  //--- 2) GET ANGLE FROM SLIDER ---
  let angleDegrees = mySlider.value();
  let angleRadians = radians(angleDegrees);

  //--- 3) TRIANGLE VISUALIZATION ---

  // Calculate adjacent and hypotenuse
  let adjacent = radius * cos(angleRadians);
  let hypotenuse = radius; // Hypotenuse is fixed (radius)

  // Move origin to center for drawing the triangle
  translate(canvasWidth / 3.5, drawHeight / 2 + 30);

  // Hypotenuse
  stroke('green');
  strokeWeight(2);
  line(0, 0, radius * cos(angleRadians), -radius * sin(angleRadians));

  // Adjacent line
  stroke('orange');
  strokeWeight(2);
  line(0, 0, radius * cos(angleRadians), 0);

  // Opposite line
  stroke('purple');
  strokeWeight(1);
  line(radius * cos(angleRadians), 0, 
       radius * cos(angleRadians), -radius * sin(angleRadians));

  // Right angle marker
  noFill();
  let vOffset = (angleRadians < PI) ? -10 : 0;
  let xOffset = (angleRadians < PI/2 || angleRadians > 3*PI/2) ? -10 : 0;
  rect(radius * cos(angleRadians) + xOffset, vOffset, 10, 10);

  // Draw angle arc inside the triangle
  noFill();
  stroke('blue');
  if (angleRadians < PI/2) {
    // top right
    arc(0, 0, 50, 50, -angleRadians, 0);
  } else if (angleRadians < PI) {
    // top left
    arc(0, 0, 50, 50, -PI, -angleRadians);
  } else if (angleRadians < 3*PI/2) {
    // lower left
    arc(0, 0, 50, 50, -angleRadians, -PI);
  } else {
    // lower right
    arc(0, 0, 50, 50, 0, -angleRadians);
  }

  // Reset translation so we can draw the wave and text in normal coordinates
  resetMatrix();

  //--- 4) COSINE WAVE ON THE RIGHT ---

  // Draw the full cosine curve from 0° to 360°
  waveHeight = drawHeight / 2;
  stroke('blue');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let a = 0; a <= 360; a++) {
    let r = radians(a);
    let waveX = waveOriginX + (a * waveWidth) / 360;
    let waveY = waveHeight - amplitude * cos(r);
    vertex(waveX, waveY);
  }
  endShape();
  
  // axis
  stroke('silver');
  line(waveOriginX, waveHeight, waveOriginX+waveWidth, waveHeight);
  line(waveOriginX, waveHeight/2, waveOriginX, waveHeight*1.5);


  // Mark the current angle on the cosine curve
  let waveXAngle = waveOriginX + (angleDegrees * waveWidth) / 360;
  let waveYAngle = drawHeight / 2 - amplitude * cos(angleRadians);
  fill('orange');
  noStroke();
  circle(waveXAngle, waveYAngle, 10);

  //--- 5) TEXT / LABELS ---
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

  text("Adjust Angle (Degrees):", 10, drawHeight + 25);
}
