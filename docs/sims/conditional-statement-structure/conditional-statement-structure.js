// Conditional Statement Structure Diagram
// Visual breakdown of hypothesis and conclusion

let canvasWidth = 750;
let drawHeight = 450;
let canvasHeight = drawHeight;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Diagram showing the structure of conditional statements with hypothesis and conclusion', LABEL);

  noLoop();
}

function draw() {
  updateCanvasSize();

  // Background gradient
  for (let y = 0; y < canvasHeight; y++) {
    let inter = map(y, 0, canvasHeight, 0, 1);
    let c = lerpColor(color('#FAFAFA'), color('#ECEFF1'), inter);
    stroke(c);
    line(0, y, canvasWidth, y);
  }

  // Title
  fill('#1565C0');
  noStroke();
  textSize(26);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Conditional Statement Structure', canvasWidth / 2, 15);
  textStyle(NORMAL);

  // Example statement at top
  fill('#424242');
  textSize(18);
  textAlign(CENTER, TOP);
  text('"If two angles are vertical, then they are congruent."', canvasWidth / 2, 55);

  // Main diagram area
  let diagramY = 100;
  let boxWidth = 280;
  let boxHeight = 140;
  let gap = 60;

  let leftBoxX = canvasWidth / 2 - boxWidth - gap / 2;
  let rightBoxX = canvasWidth / 2 + gap / 2;

  // Hypothesis box (light blue)
  fill('#B3D9FF');
  stroke('#1976D2');
  strokeWeight(3);
  rect(leftBoxX, diagramY, boxWidth, boxHeight, 15);

  // Hypothesis label
  noStroke();
  fill('#0D47A1');
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Hypothesis (p)', leftBoxX + boxWidth / 2, diagramY + 15);

  fill('#1565C0');
  textSize(16);
  textStyle(ITALIC);
  text('The "IF" part', leftBoxX + boxWidth / 2, diagramY + 45);
  textStyle(NORMAL);

  // Hypothesis content
  fill('#263238');
  textSize(15);
  text('The condition or', leftBoxX + boxWidth / 2, diagramY + 80);
  text('given information', leftBoxX + boxWidth / 2, diagramY + 100);

  // Conclusion box (light green)
  fill('#C8E6C9');
  stroke('#43A047');
  strokeWeight(3);
  rect(rightBoxX, diagramY, boxWidth, boxHeight, 15);

  // Conclusion label
  noStroke();
  fill('#1B5E20');
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Conclusion (q)', rightBoxX + boxWidth / 2, diagramY + 15);

  fill('#2E7D32');
  textSize(16);
  textStyle(ITALIC);
  text('The "THEN" part', rightBoxX + boxWidth / 2, diagramY + 45);
  textStyle(NORMAL);

  // Conclusion content
  fill('#263238');
  textSize(15);
  text('What follows', rightBoxX + boxWidth / 2, diagramY + 80);
  text('or results', rightBoxX + boxWidth / 2, diagramY + 100);

  // Arrow connecting boxes
  let arrowY = diagramY + boxHeight / 2;
  let arrowStartX = leftBoxX + boxWidth + 5;
  let arrowEndX = rightBoxX - 5;

  stroke('#FF5722');
  strokeWeight(4);
  line(arrowStartX, arrowY, arrowEndX - 15, arrowY);

  // Arrow head
  fill('#FF5722');
  noStroke();
  triangle(arrowEndX, arrowY, arrowEndX - 18, arrowY - 10, arrowEndX - 18, arrowY + 10);

  // IMPLIES label above arrow
  fill('#E64A19');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('IMPLIES', canvasWidth / 2, arrowY - 15);

  // Arrow symbol below
  textSize(24);
  text('→', canvasWidth / 2, arrowY + 30);
  textStyle(NORMAL);

  // Example breakdown section
  let breakdownY = diagramY + boxHeight + 50;

  // Section title
  fill('#424242');
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Example Breakdown', canvasWidth / 2, breakdownY);
  textStyle(NORMAL);

  // Example boxes
  let exBoxWidth = 260;
  let exBoxHeight = 55;
  let exGap = 80;
  let exLeftX = canvasWidth / 2 - exBoxWidth - exGap / 2;
  let exRightX = canvasWidth / 2 + exGap / 2;
  let exY = breakdownY + 35;

  // Hypothesis example box
  fill('#E3F2FD');
  stroke('#1976D2');
  strokeWeight(2);
  rect(exLeftX, exY, exBoxWidth, exBoxHeight, 10);

  noStroke();
  fill('#0D47A1');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Hypothesis:', exLeftX + exBoxWidth / 2, exY + 8);
  textStyle(NORMAL);
  fill('#1565C0');
  text('"two angles are vertical"', exLeftX + exBoxWidth / 2, exY + 30);

  // Conclusion example box
  fill('#E8F5E9');
  stroke('#43A047');
  strokeWeight(2);
  rect(exRightX, exY, exBoxWidth, exBoxHeight, 10);

  noStroke();
  fill('#1B5E20');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Conclusion:', exRightX + exBoxWidth / 2, exY + 8);
  textStyle(NORMAL);
  fill('#2E7D32');
  text('"they are congruent"', exRightX + exBoxWidth / 2, exY + 30);

  // Small arrow between example boxes
  let smallArrowY = exY + exBoxHeight / 2;
  stroke('#FF5722');
  strokeWeight(2);
  line(exLeftX + exBoxWidth + 10, smallArrowY, exRightX - 10, smallArrowY);
  fill('#FF5722');
  noStroke();
  triangle(exRightX - 5, smallArrowY, exRightX - 15, smallArrowY - 6, exRightX - 15, smallArrowY + 6);

  // Notation guide at bottom
  fill('#616161');
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text('Notation: p → q  reads as "If p, then q" or "p implies q"', canvasWidth / 2, canvasHeight - 15);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
