// The Anatomy of a Proof
// Interactive flowchart showing proof structure

let canvasWidth = 850;
let drawHeight = 450;
let canvasHeight = drawHeight;

let hoveredSection = -1; // 0=Given, 1=Steps, 2=Prove, 3=Tools

let sections = [
  {
    title: "GIVEN",
    subtitle: "Starting Point",
    description: "Known information you start with",
    examples: ["∠1 and ∠2 are vertical angles", "Line m ∥ Line n", "△ABC is isosceles"],
    note: "What you START with",
    color: "#C8E6C9",
    borderColor: "#43A047"
  },
  {
    title: "LOGICAL STEPS",
    subtitle: "The Journey",
    description: "Series of valid deductions",
    examples: ["Statement → Reason", "Each step builds on previous", "Every claim justified"],
    note: "Each step MUST be justified",
    color: "#BBDEFB",
    borderColor: "#1976D2"
  },
  {
    title: "PROVE",
    subtitle: "Destination",
    description: "What we want to demonstrate",
    examples: ["∠1 ≅ ∠2", "△ABC ≅ △DEF", "m∠A + m∠B + m∠C = 180°"],
    note: "What you END with",
    color: "#E1BEE7",
    borderColor: "#7B1FA2"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive diagram showing the anatomy of a geometric proof with Given, Steps, and Prove sections', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('The Anatomy of a Proof', canvasWidth / 2, 12);
  textStyle(NORMAL);

  fill('#757575');
  textSize(14);
  text('Every proof has this structure (hover for details)', canvasWidth / 2, 42);

  // Check hover
  hoveredSection = getHoveredSection();

  // Draw main sections
  let sectionY = 80;
  let sectionH = 280;
  let givenW = 180;
  let stepsW = 320;
  let proveW = 180;
  let gap = 30;

  let givenX = 40;
  let stepsX = givenX + givenW + gap;
  let proveX = stepsX + stepsW + gap;

  // Draw arrows first (behind boxes)
  drawArrows(givenX, stepsX, proveX, givenW, stepsW, proveW, sectionY, sectionH);

  // Draw sections
  drawSection(0, givenX, sectionY, givenW, sectionH);
  drawStepsSection(stepsX, sectionY, stepsW, sectionH);
  drawSection(2, proveX, sectionY, proveW, sectionH);

  // Draw tools box
  drawToolsBox();

  // Footer
  fill('#424242');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('START → JOURNEY → FINISH', canvasWidth / 2, canvasHeight - 10);
}

function drawSection(index, x, y, w, h) {
  let section = sections[index];
  let isHovered = (hoveredSection === index);

  // Box
  if (isHovered) {
    fill(lerpColor(color(section.color), color(255), 0.3));
    stroke(section.borderColor);
    strokeWeight(4);
  } else {
    fill(section.color);
    stroke(section.borderColor);
    strokeWeight(2);
  }
  rect(x, y, w, h, 12);

  // Icon based on section
  noStroke();
  fill(section.borderColor);
  textSize(28);
  textAlign(CENTER, TOP);
  if (index === 0) text('🚩', x + w / 2, y + 15);
  else if (index === 2) text('🏆', x + w / 2, y + 15);

  // Title
  textSize(16);
  textStyle(BOLD);
  fill(section.borderColor);
  text(section.title, x + w / 2, y + 50);
  textStyle(NORMAL);

  // Subtitle
  fill('#616161');
  textSize(12);
  text(section.subtitle, x + w / 2, y + 72);

  // Examples (if hovered or always show first)
  fill('#424242');
  textSize(11);
  textAlign(LEFT, TOP);
  let exY = y + 100;
  let exCount = isHovered ? section.examples.length : 1;
  for (let i = 0; i < exCount; i++) {
    text('• ' + section.examples[i], x + 10, exY);
    exY += 20;
  }

  // Note at bottom
  fill(section.borderColor);
  textSize(10);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text(section.note, x + w / 2, y + h - 10);
  textStyle(NORMAL);
}

function drawStepsSection(x, y, w, h) {
  let section = sections[1];
  let isHovered = (hoveredSection === 1);

  // Box
  if (isHovered) {
    fill(lerpColor(color(section.color), color(255), 0.3));
    stroke(section.borderColor);
    strokeWeight(4);
  } else {
    fill(section.color);
    stroke(section.borderColor);
    strokeWeight(2);
  }
  rect(x, y, w, h, 12);

  // Title
  noStroke();
  fill(section.borderColor);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(section.title, x + w / 2, y + 15);
  textStyle(NORMAL);

  // Draw step chain
  let stepW = 130;
  let stepH = 55;
  let stepGap = 20;
  let stepsStartX = x + 25;
  let stepY = y + 60;

  for (let i = 0; i < 3; i++) {
    let sx = stepsStartX + i * (stepW + stepGap) / 2;
    let sy = stepY + i * 60;

    // Step box
    fill(255);
    stroke('#64B5F6');
    strokeWeight(2);
    rect(sx, sy, stepW, stepH, 8);

    // Step content
    noStroke();
    fill('#1565C0');
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Step ' + (i + 1), sx + stepW / 2, sy + 5);
    textStyle(NORMAL);

    fill('#424242');
    textSize(9);
    if (i === 0) {
      text('Statement: m∠1 + m∠3 = 180°', sx + stepW / 2, sy + 20);
      text('Reason: Linear Pair', sx + stepW / 2, sy + 35);
    } else if (i === 1) {
      text('Statement: ∠1 ≅ ∠3', sx + stepW / 2, sy + 20);
      text('Reason: Vertical Angles', sx + stepW / 2, sy + 35);
    } else {
      text('Statement: m∠1 = m∠2', sx + stepW / 2, sy + 20);
      text('Reason: Subtraction Prop.', sx + stepW / 2, sy + 35);
    }

    // Arrow to next step
    if (i < 2) {
      fill('#1976D2');
      let arrowX = sx + stepW + 5;
      let arrowY = sy + stepH / 2 + 15;
      triangle(arrowX, arrowY, arrowX - 8, arrowY - 5, arrowX - 8, arrowY + 5);

      fill('#757575');
      textSize(8);
      textAlign(LEFT, CENTER);
      text('∴', arrowX - 12, arrowY - 10);
    }
  }

  // Note at bottom
  fill(section.borderColor);
  textSize(10);
  textStyle(ITALIC);
  textAlign(CENTER, BOTTOM);
  text(section.note, x + w / 2, y + h - 10);
  textStyle(NORMAL);
}

function drawArrows(givenX, stepsX, proveX, givenW, stepsW, proveW, y, h) {
  let midY = y + h / 2;

  // Arrow from Given to Steps
  stroke('#43A047');
  strokeWeight(4);
  let arrow1Start = givenX + givenW;
  let arrow1End = stepsX - 5;
  line(arrow1Start + 5, midY, arrow1End - 15, midY);

  fill('#43A047');
  noStroke();
  triangle(arrow1End, midY, arrow1End - 15, midY - 8, arrow1End - 15, midY + 8);

  // Arrow from Steps to Prove
  stroke('#7B1FA2');
  strokeWeight(4);
  let arrow2Start = stepsX + stepsW;
  let arrow2End = proveX - 5;
  line(arrow2Start + 5, midY, arrow2End - 15, midY);

  fill('#7B1FA2');
  noStroke();
  triangle(arrow2End, midY, arrow2End - 15, midY - 8, arrow2End - 15, midY + 8);
}

function drawToolsBox() {
  let toolsX = canvasWidth - 160;
  let toolsY = 80;
  let toolsW = 145;
  let toolsH = 140;
  let isHovered = (hoveredSection === 3);

  fill(isHovered ? '#FFF3E0' : '#FFF8E1');
  stroke('#FF9800');
  strokeWeight(isHovered ? 3 : 2);
  rect(toolsX, toolsY, toolsW, toolsH, 10);

  noStroke();
  fill('#E65100');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('🛠️ Tools Available', toolsX + toolsW / 2, toolsY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(10);
  textAlign(LEFT, TOP);
  let tools = ['• Postulates', '• Definitions', '• Proven Theorems', '• Algebraic Properties', '• Logic Rules'];
  let ty = toolsY + 35;
  for (let tool of tools) {
    text(tool, toolsX + 10, ty);
    ty += 18;
  }
}

function getHoveredSection() {
  let sectionY = 80;
  let sectionH = 280;
  let givenW = 180;
  let stepsW = 320;
  let proveW = 180;
  let gap = 30;

  let givenX = 40;
  let stepsX = givenX + givenW + gap;
  let proveX = stepsX + stepsW + gap;

  // Tools box
  let toolsX = canvasWidth - 160;
  let toolsY = 80;
  let toolsW = 145;
  let toolsH = 140;

  if (mouseX > givenX && mouseX < givenX + givenW && mouseY > sectionY && mouseY < sectionY + sectionH) return 0;
  if (mouseX > stepsX && mouseX < stepsX + stepsW && mouseY > sectionY && mouseY < sectionY + sectionH) return 1;
  if (mouseX > proveX && mouseX < proveX + proveW && mouseY > sectionY && mouseY < sectionY + sectionH) return 2;
  if (mouseX > toolsX && mouseX < toolsX + toolsW && mouseY > toolsY && mouseY < toolsY + toolsH) return 3;

  return -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 650);
  }
}
