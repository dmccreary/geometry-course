// Regular Polygon Explorer MicroSim
// Allows exploration of regular polygons with variable number of sides and colors

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;
let titleSize = 24;

// Polygon properties
let polygonRadius = 150;
let colorSlider;
let pointSlider;

// Quiz mode variables
let isQuizMode = false;
let targetSides = 0;
let hasChecked = false;
let feedbackMessage = '';
let feedbackColor = 'black';
let quizModeButton;
let checkAnswerButton;

// Function to get polygon name based on number of sides
function getPolygonName(sides) {
    const names = {
        3: "Triangle",
        4: "Square",
        5: "Pentagon",
        6: "Hexagon",
        7: "Heptagon",
        8: "Octagon",
        9: "Nonagon",
        10: "Decagon",
        11: "Hendecagon",
        12: "Dodecagon"
    };
    return names[sides] || sides + "-gon";
}

// Generate a random target shape for quiz mode
function generateTargetShape() {
    targetSides = floor(random(3, 13)); // Random between 3 and 12
    hasChecked = false;
    feedbackMessage = '';
}

// Toggle quiz mode on/off
function toggleQuizMode() {
    isQuizMode = !isQuizMode;
    if (isQuizMode) {
        generateTargetShape();
        quizModeButton.html('Exit Quiz Mode');
        checkAnswerButton.show();
    } else {
        quizModeButton.html('Quiz Mode');
        hasChecked = false;
        feedbackMessage = '';
        checkAnswerButton.hide();
    }
}

// Check if the user's answer is correct or generate new question
function checkAnswer() {
    if (!isQuizMode) return;

    if (hasChecked) {
        // If already checked, generate a new question
        generateTargetShape();
        return;
    }

    hasChecked = true;
    let currentSides = pointSlider.value();

    if (currentSides === targetSides) {
        feedbackMessage = 'Yes! You got it!';
        feedbackColor = 'green';
    } else {
        let correctName = getPolygonName(targetSides);
        feedbackMessage = 'Sorry, that is a ' + correctName;
        feedbackColor = 'red';
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    // Change the default color scheme from RGB to Hue, Saturation and Brightness
    colorMode(HSB, 255);

    // Number of points (or edges) in polygon slider
    pointSlider = createSlider(3, 20, 10, 1);
    pointSlider.position(sliderLeftMargin, drawHeight + 5);
    pointSlider.size(canvasWidth - sliderLeftMargin - 15);

    // Color slider
    colorSlider = createSlider(0, 255, 170, 1);
    colorSlider.position(sliderLeftMargin, drawHeight + 25);
    colorSlider.size(canvasWidth - sliderLeftMargin - 15);

    // Quiz Mode button
    quizModeButton = createButton('Quiz Mode');
    quizModeButton.position(10, drawHeight + 55);
    quizModeButton.mousePressed(toggleQuizMode);
    quizModeButton.style('padding', '8px 16px');
    quizModeButton.style('font-size', '14px');

    // Check Answer button
    checkAnswerButton = createButton('Check My Answer');
    checkAnswerButton.position(170, drawHeight + 55);
    checkAnswerButton.mousePressed(checkAnswer);
    checkAnswerButton.style('padding', '8px 16px');
    checkAnswerButton.style('font-size', '14px');
    checkAnswerButton.hide(); // Initially hidden

    describe('Interactive regular polygon explorer with quiz mode for testing polygon knowledge', LABEL);
}

function draw() {
    updateCanvasSize();

    // Draw the display area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Draw the controls area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw the title
    fill('black');
    noStroke();
    textSize(titleSize);
    textAlign(CENTER, TOP);
    text("Regular Polygon Explorer Quiz", canvasWidth / 2, 10);

    let colorValue = colorSlider.value();
    let pointValue = pointSlider.value();

    // Calculate polygon center
    let centerX = canvasWidth / 2;
    let centerY = drawHeight / 2;

    // Adjust polygon radius if canvas gets too small
    let adjustedRadius = Math.min(polygonRadius, (canvasWidth - 2 * margin) / 2, (drawHeight - 2 * margin) / 2);

    // Draw the polygon using HSB color mode
    fill(colorValue, 255, 255);
    noStroke();
    beginShape();
    for (let i = 0; i < pointValue; i++) {
        // Walk around the 360 angles
        let angle = map(i, 0, pointValue, 0, TWO_PI);
        let x = centerX + adjustedRadius * cos(angle);
        let y = centerY + adjustedRadius * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);

    // Draw the number of points in the center
    fill('white');
    noStroke();
    textSize(48);
    textAlign(CENTER, CENTER);
    text(pointValue, centerX, centerY);

    // Draw annotation below polygon
    let annotationText = '';
    let annotationColor = 'black';

    if (isQuizMode) {
        // Quiz mode annotation
        if (hasChecked) {
            // Show feedback after checking answer
            annotationText = feedbackMessage;
            annotationColor = feedbackColor;
        } else {
            // Show quiz prompt
            let targetName = getPolygonName(targetSides);
            annotationText = 'Create a ' + targetName;
            annotationColor = 'blue';
        }
    } else {
        // Normal mode annotation
        let polygonName = getPolygonName(pointValue);
        let interiorAngle = ((pointValue - 2) * 180) / pointValue;
        annotationText = polygonName + ": " + pointValue + " sides, " +
                        nf(interiorAngle, 0, 1) + "° interior angle";
    }

    fill(annotationColor);
    noStroke();
    textSize(defaultTextSize);
    textAlign(CENTER, TOP);
    text(annotationText, centerX, centerY + adjustedRadius + 15);

    // Update button text based on quiz state
    if (isQuizMode && hasChecked) {
        checkAnswerButton.html('New Question');
    } else {
        checkAnswerButton.html('Check My Answer');
    }

    // Draw the slider labels and values
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text("Points: " + pointValue, 10, drawHeight + 15);
    text("Color: " + colorValue, 10, drawHeight + 35);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Resize the sliders to match the new canvas width
    if (pointSlider) {
        pointSlider.size(canvasWidth - sliderLeftMargin - 15);
    }
    if (colorSlider) {
        colorSlider.size(canvasWidth - sliderLeftMargin - 15);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}