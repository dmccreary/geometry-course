// Parallel Postulate History - Interactive Infographic
// Shows historical timeline and three types of geometry

let canvasWidth = 900;
let drawHeight = 600;
let canvasHeight = drawHeight;

let selectedGeometry = 0; // 0=Euclidean, 1=Hyperbolic, 2=Elliptic
let hoveredEvent = -1;

let timeline = [
  { year: '300 BCE', event: 'Euclid states Fifth Postulate', color: '#1565C0' },
  { year: '1733', event: 'Saccheri explores alternatives', color: '#7B1FA2' },
  { year: '1829', event: 'Lobachevsky: Hyperbolic geometry', color: '#2E7D32' },
  { year: '1854', event: 'Riemann: Elliptic geometry', color: '#E65100' },
  { year: '1915', event: 'Einstein uses curved space', color: '#C62828' }
];

let geometries = [
  {
    name: 'Euclidean',
    parallels: 'Exactly 1',
    surface: 'Flat plane',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    example: 'Our everyday geometry'
  },
  {
    name: 'Hyperbolic',
    parallels: 'Infinitely many',
    surface: 'Saddle shape',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    example: 'Special relativity'
  },
  {
    name: 'Elliptic',
    parallels: 'Zero (none)',
    surface: 'Sphere',
    color: '#E65100',
    bgColor: '#FFF3E0',
    example: 'Navigation on Earth'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive infographic showing the Parallel Postulate history and three types of geometry', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FFF8E1');

  // Title
  fill('#5D4037');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('The Parallel Postulate: 2000+ Years of Mathematical Challenge', canvasWidth / 2, 10);
  textStyle(NORMAL);

  checkHover();
  drawTimeline();
  drawGeometryPanels();
  drawFooter();
}

function checkHover() {
  hoveredEvent = -1;
  let startX = 50;
  let spacing = (canvasWidth - 100) / (timeline.length - 1);

  for (let i = 0; i < timeline.length; i++) {
    let ex = startX + i * spacing;
    if (dist(mouseX, mouseY, ex, 80) < 20) {
      hoveredEvent = i;
      return;
    }
  }

  // Check geometry panels
  let panelW = (canvasWidth - 80) / 3;
  let panelY = 180;
  let panelH = 320;

  for (let i = 0; i < 3; i++) {
    let px = 30 + i * (panelW + 10);
    if (mouseX > px && mouseX < px + panelW && mouseY > panelY && mouseY < panelY + panelH) {
      if (mouseIsPressed) {
        selectedGeometry = i;
      }
    }
  }
}

function drawTimeline() {
  let y = 80;
  let startX = 50;
  let endX = canvasWidth - 50;
  let spacing = (endX - startX) / (timeline.length - 1);

  // Timeline line
  stroke('#8D6E63');
  strokeWeight(3);
  line(startX, y, endX, y);

  // Events
  for (let i = 0; i < timeline.length; i++) {
    let ex = startX + i * spacing;
    let isHovered = (hoveredEvent === i);

    // Event marker
    if (isHovered) {
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = timeline[i].color;
    }

    fill(timeline[i].color);
    noStroke();
    ellipse(ex, y, isHovered ? 24 : 18, isHovered ? 24 : 18);
    drawingContext.shadowBlur = 0;

    // Year
    fill(timeline[i].color);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    textStyle(BOLD);
    text(timeline[i].year, ex, y - 15);
    textStyle(NORMAL);

    // Event (if hovered or always show)
    if (isHovered) {
      fill('#424242');
      textSize(10);
      textAlign(CENTER, TOP);
      text(timeline[i].event, ex, y + 18);
    }
  }

  // Subtitle
  fill('#757575');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Click geometry panels below to explore • Hover over timeline for details', canvasWidth / 2, 130);
}

function drawGeometryPanels() {
  let panelW = (canvasWidth - 80) / 3;
  let panelY = 160;
  let panelH = 340;

  for (let i = 0; i < 3; i++) {
    let px = 30 + i * (panelW + 10);
    let geo = geometries[i];
    let isSelected = (selectedGeometry === i);

    // Panel shadow
    if (isSelected) {
      drawingContext.shadowBlur = 12;
      drawingContext.shadowColor = geo.color;
    }

    // Panel background
    fill(geo.bgColor);
    stroke(geo.color);
    strokeWeight(isSelected ? 4 : 2);
    rect(px, panelY, panelW, panelH, 10);
    drawingContext.shadowBlur = 0;

    // Header
    fill(geo.color);
    noStroke();
    rect(px, panelY, panelW, 45, 10, 10, 0, 0);

    fill('#FFFFFF');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(geo.name + ' Geometry', px + panelW / 2, panelY + 22);
    textStyle(NORMAL);

    // Draw geometry illustration
    drawGeometryIllustration(i, px + panelW / 2, panelY + 140, panelW * 0.7);

    // Parallels info
    fill(geo.color);
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Parallels through point P:', px + panelW / 2, panelY + 220);
    textStyle(NORMAL);

    textSize(18);
    text(geo.parallels, px + panelW / 2, panelY + 240);

    // Surface type
    fill('#616161');
    textSize(11);
    text('Surface: ' + geo.surface, px + panelW / 2, panelY + 275);

    // Example
    fill('#9E9E9E');
    textSize(10);
    text(geo.example, px + panelW / 2, panelY + 295);

    // Selection indicator
    if (isSelected) {
      fill(geo.color);
      textSize(10);
      textStyle(BOLD);
      text('▼ SELECTED', px + panelW / 2, panelY + panelH - 15);
      textStyle(NORMAL);
    }
  }
}

function drawGeometryIllustration(type, cx, cy, size) {
  push();
  translate(cx, cy);

  let halfSize = size / 2;

  switch (type) {
    case 0: // Euclidean - flat plane with one parallel
      // Grid background
      stroke('#BBDEFB');
      strokeWeight(1);
      for (let i = -3; i <= 3; i++) {
        line(-halfSize, i * 15, halfSize, i * 15);
        line(i * 25, -halfSize * 0.6, i * 25, halfSize * 0.6);
      }

      // Line ℓ
      stroke('#1565C0');
      strokeWeight(3);
      line(-halfSize, 20, halfSize, 20);

      // Point P
      fill('#C62828');
      noStroke();
      ellipse(0, -25, 10, 10);

      // Exactly one parallel
      stroke('#2E7D32');
      strokeWeight(2);
      line(-halfSize, -25, halfSize, -25);

      // Labels
      fill('#1565C0');
      textSize(10);
      textAlign(LEFT, CENTER);
      noStroke();
      text('ℓ', halfSize + 5, 20);

      fill('#C62828');
      textAlign(CENTER, BOTTOM);
      text('P', 0, -32);

      fill('#2E7D32');
      text('One parallel', 0, -45);
      break;

    case 1: // Hyperbolic - saddle with many parallels
      // Saddle shape curve
      stroke('#E1BEE7');
      strokeWeight(1);
      noFill();
      for (let i = -2; i <= 2; i++) {
        beginShape();
        for (let x = -halfSize; x <= halfSize; x += 5) {
          let y = i * 20 + (x * x) / 200 - 30;
          vertex(x, y);
        }
        endShape();
      }

      // Line ℓ
      stroke('#7B1FA2');
      strokeWeight(3);
      beginShape();
      for (let x = -halfSize; x <= halfSize; x += 5) {
        let y = 25 + (x * x) / 300;
        vertex(x, y);
      }
      endShape();

      // Point P
      fill('#C62828');
      noStroke();
      ellipse(0, -30, 10, 10);

      // Multiple parallels
      stroke('#2E7D32');
      strokeWeight(1.5);
      for (let angle = -0.4; angle <= 0.4; angle += 0.2) {
        let x1 = -halfSize;
        let y1 = -30 + x1 * angle;
        let x2 = halfSize;
        let y2 = -30 + x2 * angle;
        line(x1, y1, x2, y2);
      }

      fill('#C62828');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      noStroke();
      text('P', 0, -38);

      fill('#2E7D32');
      text('Many parallels', 0, -55);
      break;

    case 2: // Elliptic - sphere with no parallels
      // Sphere
      stroke('#FFCC80');
      strokeWeight(1);
      noFill();
      ellipse(0, 0, size * 0.9, size * 0.9);

      // Equator-like great circle
      stroke('#E65100');
      strokeWeight(2);
      ellipse(0, 10, size * 0.85, size * 0.3);

      // Another great circle (meridian-like)
      stroke('#E65100');
      strokeWeight(2);
      noFill();
      arc(0, 0, size * 0.4, size * 0.85, -PI / 2, PI / 2);

      // Point P
      fill('#C62828');
      noStroke();
      ellipse(-15, -20, 10, 10);

      fill('#C62828');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      noStroke();
      text('P', -15, -28);

      fill('#E65100');
      text('All lines meet', 0, -55);

      // Note
      fill('#757575');
      textSize(8);
      textAlign(CENTER, TOP);
      text('Great circles always intersect', 0, halfSize + 5);
      break;
  }

  pop();
}

function drawFooter() {
  let y = drawHeight - 75;

  // Key insight box
  fill('#ECEFF1');
  stroke('#90A4AE');
  strokeWeight(1);
  rect(30, y, canvasWidth - 60, 65, 8);

  fill('#37474F');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  noStroke();
  text('Why Does This Matter?', 45, y + 10);
  textStyle(NORMAL);

  textSize(11);
  fill('#546E7A');
  text('• Proving impossibility was a mathematical breakthrough (led to abstract algebra)', 45, y + 28);
  text('• Not all problems have solutions within given constraints', 45, y + 42);

  textAlign(RIGHT, TOP);
  text('• GPS uses elliptic geometry for navigation', canvasWidth - 45, y + 28);
  text('• Einstein used non-Euclidean geometry for relativity', canvasWidth - 45, y + 42);
}

function mousePressed() {
  let panelW = (canvasWidth - 80) / 3;
  let panelY = 160;
  let panelH = 340;

  for (let i = 0; i < 3; i++) {
    let px = 30 + i * (panelW + 10);
    if (mouseX > px && mouseX < px + panelW && mouseY > panelY && mouseY < panelY + panelH) {
      selectedGeometry = i;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 900);
    canvasWidth = max(canvasWidth, 700);
  }
}
