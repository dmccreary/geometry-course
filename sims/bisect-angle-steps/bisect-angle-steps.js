// Bisect Angle Steps - Reference Diagram
// Shows four panels for angle bisection construction

let canvasWidth = 900;
let drawHeight = 380;
let canvasHeight = drawHeight;

let hoveredPanel = -1;

let panels = [
  { title: 'Given', desc: '∠ABC to bisect', color: '#1565C0' },
  { title: 'Step 1', desc: 'Arc from B, mark P and Q', color: '#7B1FA2' },
  { title: 'Steps 2-3', desc: 'Arcs from P and Q', color: '#E65100' },
  { title: 'Result', desc: 'BD bisects ∠ABC', color: '#2E7D32' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Four-panel diagram showing steps to bisect an angle', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF3E0');

  // Title
  fill('#E65100');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Bisecting an Angle: Creating Two Equal Angles', canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('Hover over each panel to highlight', canvasWidth / 2, 35);

  checkHover();
  drawPanels();
}

function checkHover() {
  hoveredPanel = -1;
  let panelW = (canvasWidth - 50) / 4;
  let startX = 15;
  let startY = 55;
  let panelH = drawHeight - 70;

  for (let i = 0; i < 4; i++) {
    let px = startX + i * (panelW + 5);
    if (mouseX > px && mouseX < px + panelW && mouseY > startY && mouseY < startY + panelH) {
      hoveredPanel = i;
      return;
    }
  }
}

function drawPanels() {
  let panelW = (canvasWidth - 50) / 4;
  let startX = 15;
  let startY = 55;
  let panelH = drawHeight - 70;

  for (let i = 0; i < 4; i++) {
    let px = startX + i * (panelW + 5);
    let isHovered = (hoveredPanel === i);

    // Panel shadow
    if (isHovered) {
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = panels[i].color;
    }

    fill('#FFFFFF');
    stroke(panels[i].color);
    strokeWeight(isHovered ? 3 : 1.5);
    rect(px, startY, panelW, panelH, 8);
    drawingContext.shadowBlur = 0;

    // Panel header
    fill(panels[i].color);
    noStroke();
    rect(px, startY, panelW, 40, 8, 8, 0, 0);

    fill('#FFFFFF');
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(panels[i].title, px + panelW / 2, startY + 15);
    textStyle(NORMAL);

    fill('#FFFFFF');
    textSize(10);
    text(panels[i].desc, px + panelW / 2, startY + 32);

    // Draw illustration
    drawPanelIllustration(i, px + panelW / 2, startY + panelH / 2 + 30, panelW * 0.85, panelH * 0.55);
  }
}

function drawPanelIllustration(panel, cx, cy, w, h) {
  push();
  translate(cx, cy);

  let rayLen = w * 0.7;
  let angleRad = radians(70);

  switch (panel) {
    case 0: // Given - angle ABC
      // Vertex B at center-left
      let vx0 = -rayLen / 2;
      let vy0 = h / 4;

      // Ray BA (upper-left)
      stroke('#1565C0');
      strokeWeight(3);
      let ax = vx0 + rayLen * cos(-angleRad / 2 - PI / 4);
      let ay = vy0 + rayLen * sin(-angleRad / 2 - PI / 4);
      line(vx0, vy0, ax, ay);

      // Ray BC (right)
      let cx0 = vx0 + rayLen;
      let cy0 = vy0;
      line(vx0, vy0, cx0, cy0);

      // Vertex B
      fill('#1565C0');
      noStroke();
      ellipse(vx0, vy0, 10, 10);

      // Angle arc
      stroke('#1565C0');
      strokeWeight(2);
      noFill();
      let arcAngle = atan2(ay - vy0, ax - vx0);
      arc(vx0, vy0, 30, 30, arcAngle, 0);

      // Labels
      fill('#1565C0');
      textSize(12);
      textAlign(CENTER, CENTER);
      text('A', ax - 5, ay - 5);
      text('B', vx0 - 12, vy0 + 5);
      text('C', cx0 + 8, cy0);

      fill('#757575');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text('∠ABC ≈ 70°', 0, h / 2 - 5);
      break;

    case 1: // Arc from B, mark P and Q
      let vx1 = -rayLen / 2;
      let vy1 = h / 4;

      // Rays (faded)
      stroke('#90CAF9');
      strokeWeight(2);
      let ax1 = vx1 + rayLen * cos(-angleRad / 2 - PI / 4);
      let ay1 = vy1 + rayLen * sin(-angleRad / 2 - PI / 4);
      line(vx1, vy1, ax1, ay1);

      let cx1 = vx1 + rayLen;
      let cy1 = vy1;
      line(vx1, vy1, cx1, cy1);

      // Vertex
      fill('#90CAF9');
      noStroke();
      ellipse(vx1, vy1, 8, 8);

      // Arc from B
      stroke('#7B1FA2');
      strokeWeight(2);
      noFill();
      let arcR1 = rayLen * 0.5;
      let arcAngle1 = atan2(ay1 - vy1, ax1 - vx1);
      arc(vx1, vy1, arcR1 * 2, arcR1 * 2, arcAngle1, 0);

      // Points P and Q
      let px1 = vx1 + arcR1 * cos(arcAngle1);
      let py1 = vy1 + arcR1 * sin(arcAngle1);
      let qx1 = vx1 + arcR1;
      let qy1 = vy1;

      fill('#C62828');
      noStroke();
      ellipse(px1, py1, 10, 10);
      ellipse(qx1, qy1, 10, 10);

      // Labels
      fill('#C62828');
      textSize(11);
      textAlign(CENTER, CENTER);
      text('P', px1 - 10, py1);
      text('Q', qx1 + 10, qy1);

      fill('#7B1FA2');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text('Arc from vertex B', 0, h / 2 - 5);
      break;

    case 2: // Arcs from P and Q
      let vx2 = -rayLen / 2;
      let vy2 = h / 4;

      // Rays (faded)
      stroke('#BDBDBD');
      strokeWeight(1.5);
      let ax2 = vx2 + rayLen * cos(-angleRad / 2 - PI / 4);
      let ay2 = vy2 + rayLen * sin(-angleRad / 2 - PI / 4);
      line(vx2, vy2, ax2, ay2);

      let cx2 = vx2 + rayLen;
      let cy2 = vy2;
      line(vx2, vy2, cx2, cy2);

      // Points P and Q
      let arcR2 = rayLen * 0.5;
      let arcAngle2 = atan2(ay2 - vy2, ax2 - vx2);
      let px2 = vx2 + arcR2 * cos(arcAngle2);
      let py2 = vy2 + arcR2 * sin(arcAngle2);
      let qx2 = vx2 + arcR2;
      let qy2 = vy2;

      fill('#C62828');
      noStroke();
      ellipse(px2, py2, 8, 8);
      ellipse(qx2, qy2, 8, 8);

      // Arc from P (green)
      stroke('#2E7D32');
      strokeWeight(2);
      noFill();
      arc(px2, py2, arcR2 * 0.8, arcR2 * 0.8, 0, PI / 2);

      // Arc from Q (orange)
      stroke('#E65100');
      arc(qx2, qy2, arcR2 * 0.8, arcR2 * 0.8, -PI / 2, -PI / 6);

      // Intersection point D
      let midAngle = arcAngle2 / 2;
      let dx2 = vx2 + arcR2 * 1.2 * cos(midAngle);
      let dy2 = vy2 + arcR2 * 1.2 * sin(midAngle);

      fill('#7B1FA2');
      noStroke();
      ellipse(dx2, dy2, 12, 12);

      fill('#FFFFFF');
      textSize(10);
      textAlign(CENTER, CENTER);
      text('D', dx2, dy2);

      fill('#E65100');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      noStroke();
      text('Arcs intersect at D', 0, h / 2 - 5);
      break;

    case 3: // Result
      let vx3 = -rayLen / 2;
      let vy3 = h / 4;

      // Original rays
      stroke('#1565C0');
      strokeWeight(2);
      let ax3 = vx3 + rayLen * cos(-angleRad / 2 - PI / 4);
      let ay3 = vy3 + rayLen * sin(-angleRad / 2 - PI / 4);
      line(vx3, vy3, ax3, ay3);

      let cx3 = vx3 + rayLen;
      let cy3 = vy3;
      line(vx3, vy3, cx3, cy3);

      // Bisector ray BD
      let arcAngle3 = atan2(ay3 - vy3, ax3 - vx3);
      let midAngle3 = arcAngle3 / 2;
      let dx3 = vx3 + rayLen * cos(midAngle3);
      let dy3 = vy3 + rayLen * sin(midAngle3);

      stroke('#C62828');
      strokeWeight(3);
      line(vx3, vy3, dx3, dy3);

      // Vertex
      fill('#1565C0');
      noStroke();
      ellipse(vx3, vy3, 10, 10);

      // Congruence arcs
      stroke('#2E7D32');
      strokeWeight(2);
      noFill();
      arc(vx3, vy3, 25, 25, arcAngle3, midAngle3);
      arc(vx3, vy3, 25, 25, midAngle3, 0);

      // Second congruence marks
      arc(vx3, vy3, 35, 35, arcAngle3, midAngle3);
      arc(vx3, vy3, 35, 35, midAngle3, 0);

      // Labels
      fill('#1565C0');
      textSize(11);
      textAlign(CENTER, CENTER);
      noStroke();
      text('A', ax3 - 5, ay3 - 8);
      text('B', vx3 - 12, vy3 + 5);
      text('C', cx3 + 8, cy3);

      fill('#C62828');
      text('D', dx3 + 8, dy3 - 5);

      // Result text
      fill('#2E7D32');
      textSize(11);
      textStyle(BOLD);
      textAlign(CENTER, BOTTOM);
      text('∠ABD ≅ ∠DBC ✓', 0, h / 2 - 15);
      text('35° = 35°', 0, h / 2 - 2);
      textStyle(NORMAL);
      break;
  }

  pop();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 600);
  }
}
