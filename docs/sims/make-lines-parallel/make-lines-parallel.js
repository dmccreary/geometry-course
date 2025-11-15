// Make These Lines Parallel MicroSim
// Learning Objective: Students will understand that parallel lines have equal slopes
// by manipulating points to create parallel lines on a coordinate grid.

// Canvas dimensions - REQUIRED structure
let canvasWidth = 800;              // Initial width (responsive)
let drawHeight = 600;                // Drawing/simulation area height
let controlHeight = 80;              // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 40;                     // Margin for visual elements
let defaultTextSize = 16;            // Base text size

// Grid parameters
let gridSize = 50; // pixels per unit
let gridUnits = 10; // 10x10 grid
let gridLeft, gridTop; // Position of grid

// Line 1 (fixed line) - blue
let line1Point1;
let line1Point2;

// Line 2 (movable line) - initially not parallel
let line2Point1; // Fixed point
let line2Point2; // Movable point (red)

// UI state
let checkButton;
let resetButton;
let draggingPoint = false;
let checkState = 'ready'; // 'ready', 'checking', 'correct', 'incorrect'
let feedbackMessage = '';
let feedbackColor;
let animationProgress = 0;
let animationLine = null; // Line to animate
let correctCount = 0; // Track number of correct answers

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }

  // Calculate grid position (centered)
  updateGridPosition();

  // Initialize with a random problem
  generateNewProblem();

  // Create Check button
  checkButton = createButton('Check Answer');
  checkButton.position(10, drawHeight + 20);
  checkButton.mousePressed(checkParallel);
  checkButton.style('font-size', '18px');
  checkButton.style('padding', '10px 20px');

  // Create New Problem button
  resetButton = createButton('New Problem');
  resetButton.position(180, drawHeight + 20);
  resetButton.mousePressed(resetLines);
  resetButton.style('font-size', '18px');
  resetButton.style('padding', '10px 20px');

  describe('Interactive grid where students drag a red point to make two lines parallel by matching their slopes.', LABEL);
}

function draw() {
  updateCanvasSize();
  updateGridPosition();

  // Drawing area (light background)
  fill('aliceblue');
  noStroke();
  rect(0, 0, width, drawHeight);

  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);

  // Draw title
  fill('black');
  textSize(28);
  textAlign(CENTER, TOP);
  noStroke();
  text('Making Parallel Lines', canvasWidth/2, 10);

  // Draw instruction
  textSize(18);
  fill('gray');
  text('Move the point to make the two lines parallel.', canvasWidth/2, 45);

  // Draw grid
  drawGrid();

  // Draw lines
  drawLines();

  // Draw animation if checking
  if (checkState === 'checking') {
    drawAnimation();
  }

  // Draw points
  drawPoints();

  // Display feedback message
  if (feedbackMessage !== '') {
    displayFeedback();
  }

  // Display score counter in control area
  fill('black');
  textSize(20);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Answers Correct: ' + correctCount, 400, drawHeight + 35);

  // Return default settings
  stroke('black');
  strokeWeight(1);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawGrid() {
  // Draw grid lines
  stroke(200);
  strokeWeight(1);

  // Vertical lines
  for (let i = 0; i <= gridUnits; i++) {
    let x = gridLeft + i * gridSize;
    line(x, gridTop, x, gridTop + gridUnits * gridSize);
  }

  // Horizontal lines
  for (let i = 0; i <= gridUnits; i++) {
    let y = gridTop + i * gridSize;
    line(gridLeft, y, gridLeft + gridUnits * gridSize, y);
  }

  // Draw grid border
  stroke(100);
  strokeWeight(2);
  noFill();
  rect(gridLeft, gridTop, gridUnits * gridSize, gridUnits * gridSize);
}

function drawLines() {
  // Draw Line 1 (fixed, blue)
  stroke('blue');
  strokeWeight(4);
  let p1 = gridToCanvas(line1Point1);
  let p2 = gridToCanvas(line1Point2);
  line(p1.x, p1.y, p2.x, p2.y);

  // Draw Line 2 (movable, blue when not being manipulated)
  stroke('blue');
  strokeWeight(4);
  let p3 = gridToCanvas(line2Point1);
  let p4 = gridToCanvas(line2Point2);
  line(p3.x, p3.y, p4.x, p4.y);
}

function drawAnimation() {
  // Animate a green line moving from line2 to line1
  if (animationProgress < 1.0) {
    animationProgress += 0.015; // Takes about 2 seconds at 60fps

    // Calculate interpolated line position
    let p1Start = gridToCanvas(line2Point1);
    let p2Start = gridToCanvas(line2Point2);
    let p1End = gridToCanvas(line1Point1);
    let p2End = gridToCanvas(line1Point2);

    // Lerp between the two lines
    let t = animationProgress;
    let x1 = lerp(p1Start.x, p1End.x, t);
    let y1 = lerp(p1Start.y, p1End.y, t);
    let x2 = lerp(p2Start.x, p2End.x, t);
    let y2 = lerp(p2Start.y, p2End.y, t);

    // Draw animated green line
    stroke('green');
    strokeWeight(4);
    line(x1, y1, x2, y2);
  } else {
    // Animation complete
    checkState = feedbackColor === 'green' ? 'correct' : 'incorrect';
    animationProgress = 0;
  }
}

function drawPoints() {
  // Draw Line 1 points (black, fixed)
  fill('black');
  stroke('black');
  strokeWeight(2);
  let p1 = gridToCanvas(line1Point1);
  let p2 = gridToCanvas(line1Point2);
  circle(p1.x, p1.y, 12);
  circle(p2.x, p2.y, 12);

  // Draw Line 2 point 1 (black, fixed)
  let p3 = gridToCanvas(line2Point1);
  circle(p3.x, p3.y, 12);

  // Draw Line 2 point 2 (red, movable)
  let p4 = gridToCanvas(line2Point2);
  fill('red');
  stroke('darkred');
  strokeWeight(3);
  circle(p4.x, p4.y, 16);
}

function displayFeedback() {
  fill(feedbackColor);
  textSize(24);
  textAlign(CENTER, CENTER);
  noStroke();
  text(feedbackMessage, canvasWidth/2, drawHeight - 40);
}

function gridToCanvas(gridPoint) {
  // Convert grid coordinates (0-10) to canvas coordinates
  // Note: y-axis is inverted (grid y increases upward)
  return {
    x: gridLeft + gridPoint.x * gridSize,
    y: gridTop + (gridUnits - gridPoint.y) * gridSize
  };
}

function canvasToGrid(canvasX, canvasY) {
  // Convert canvas coordinates to grid coordinates
  // Snap to grid
  let gridX = round((canvasX - gridLeft) / gridSize);
  let gridY = round((gridTop + gridUnits * gridSize - canvasY) / gridSize);

  // Constrain to grid bounds
  gridX = constrain(gridX, 0, gridUnits);
  gridY = constrain(gridY, 0, gridUnits);

  return {x: gridX, y: gridY};
}

function calculateSlope(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  if (dx === 0) return Infinity; // Vertical line
  return dy / dx;
}

function checkParallel() {
  if (checkState === 'checking') return; // Already checking

  // Calculate slopes
  let slope1 = calculateSlope(line1Point1, line1Point2);
  let slope2 = calculateSlope(line2Point1, line2Point2);

  // Check if slopes are equal (within tolerance)
  let tolerance = 0.01;
  let areParallel = abs(slope1 - slope2) < tolerance;

  // Start animation
  checkState = 'checking';
  animationProgress = 0;

  if (areParallel) {
    feedbackMessage = 'Correct!';
    feedbackColor = 'green';
    correctCount++; // Increment score
  } else {
    feedbackMessage = 'Incorrect. Try Again!';
    feedbackColor = 'red';
  }
}

function generateNewProblem() {
  // Keep trying until we find a valid configuration
  let validConfiguration = false;
  let maxAttempts = 100;
  let attempt = 0;

  while (!validConfiguration && attempt < maxAttempts) {
    // Generate random points for line 1 (fixed line)
    line1Point1 = {
      x: floor(random(1, 5)),
      y: floor(random(5, 10))
    };
    line1Point2 = {
      x: floor(random(6, 10)),
      y: floor(random(1, 6))
    };

    // Calculate slope and check if it's reasonable
    let slope = calculateSlope(line1Point1, line1Point2);

    // Valid if slope is not too steep, not horizontal, not vertical
    if (isFinite(slope) && abs(slope) > 0.2 && abs(slope) < 3) {

      // Generate random point for line 2 (fixed point)
      line2Point1 = {
        x: floor(random(2, 6)),
        y: floor(random(4, 8))
      };

      // Check if at least one valid solution exists within the grid
      if (hasSolutionInGrid(line2Point1, slope)) {
        validConfiguration = true;

        // Generate initial position for movable point (not parallel)
        // Make it deliberately wrong
        line2Point2 = {
          x: floor(random(5, 9)),
          y: floor(random(1, 5))
        };

        // Make sure line 2 has a different slope initially
        let slope2 = calculateSlope(line2Point1, line2Point2);
        let attempts2 = 0;

        while (abs(slope - slope2) < 0.3 && attempts2 < 20) {
          line2Point2 = {
            x: floor(random(5, 9)),
            y: floor(random(1, 5))
          };
          slope2 = calculateSlope(line2Point1, line2Point2);
          attempts2++;
        }
      }
    }
    attempt++;
  }

  // Fallback to a known good configuration if we couldn't find one
  if (!validConfiguration) {
    line1Point1 = {x: 1, y: 7};
    line1Point2 = {x: 7, y: 3};
    line2Point1 = {x: 3, y: 6};
    line2Point2 = {x: 5, y: 2};
  }
}

function hasSolutionInGrid(fixedPoint, targetSlope) {
  // Check if there's at least one grid point that creates the target slope
  // from the fixed point and stays within bounds

  for (let x = 0; x <= gridUnits; x++) {
    for (let y = 0; y <= gridUnits; y++) {
      // Skip the fixed point itself
      if (x === fixedPoint.x && y === fixedPoint.y) continue;

      // Calculate slope to this point
      let testPoint = {x: x, y: y};
      let slope = calculateSlope(fixedPoint, testPoint);

      // Check if this slope matches our target (within tolerance)
      if (isFinite(slope) && abs(slope - targetSlope) < 0.01) {
        return true; // Found at least one valid solution
      }
    }
  }

  return false; // No valid solution exists in the grid
}

function resetLines() {
  // Generate a new random problem
  generateNewProblem();
  checkState = 'ready';
  feedbackMessage = '';
  animationProgress = 0;
}

function mousePressed() {
  // Check if clicking on the red point
  let p4 = gridToCanvas(line2Point2);
  let d = dist(mouseX, mouseY, p4.x, p4.y);

  if (d < 20 && mouseY < drawHeight) {
    draggingPoint = true;
    return false; // Prevent default
  }
}

function mouseDragged() {
  if (draggingPoint && mouseY < drawHeight) {
    // Update point position (snapped to grid)
    let newPos = canvasToGrid(mouseX, mouseY);
    line2Point2 = newPos;

    // Reset feedback when user moves the point
    if (checkState !== 'checking') {
      feedbackMessage = '';
      checkState = 'ready';
    }
  }
}

function mouseReleased() {
  draggingPoint = false;
}

function updateGridPosition() {
  // Center the grid in the drawing area
  let gridPixelSize = gridUnits * gridSize;
  gridLeft = (canvasWidth - gridPixelSize) / 2;
  gridTop = 80; // Below title and instructions
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  updateGridPosition();
}
