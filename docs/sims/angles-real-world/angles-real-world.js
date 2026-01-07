// Angles in the Real World - Interactive Infographic
// Shows six categories of real-world angle applications

let canvasWidth = 900;
let drawHeight = 600;
let canvasHeight = drawHeight;

let categories = [
  {
    name: 'Architecture',
    icon: '🏛️',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    examples: [
      'Building corners use 90° right angles for stability',
      'Roof pitches range from 15° to 45° for drainage',
      'Arches use specific angles for strength'
    ],
    funFact: 'The Leaning Tower of Pisa tilts at 3.97°!',
    angleTypes: ['Right angles', 'Acute angles']
  },
  {
    name: 'Navigation',
    icon: '🧭',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    examples: [
      'Compass bearings measured in degrees (0° to 360°)',
      'Ships turn at specific angles to change course',
      'Latitude and longitude use angular coordinates'
    ],
    funFact: 'Pilots use a 3° glide slope angle for landing!',
    angleTypes: ['Full rotation angles', 'Bearing angles']
  },
  {
    name: 'Art & Design',
    icon: '🎨',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    examples: [
      'Perspective drawings use vanishing point angles',
      'Symmetry relies on equal angle divisions',
      'The Golden Angle (137.5°) appears in nature'
    ],
    funFact: 'Renaissance artists used a 30° viewing angle for portraits!',
    angleTypes: ['Acute angles', 'Supplementary angles']
  },
  {
    name: 'Engineering',
    icon: '⚙️',
    color: '#E65100',
    bgColor: '#FFF3E0',
    examples: [
      'Gears mesh at precise angles for power transfer',
      'Bridge cables use calculated angles for support',
      'Robotics uses joint angles for movement'
    ],
    funFact: 'Car steering wheels can turn up to 720°!',
    angleTypes: ['Complementary angles', 'Acute angles']
  },
  {
    name: 'Sports',
    icon: '⚽',
    color: '#C62828',
    bgColor: '#FFEBEE',
    examples: [
      'Basketball: 45° is the optimal shooting angle',
      'Soccer: goalies use angles to narrow shots',
      'Skiing: racers lean at angles up to 60°'
    ],
    funFact: 'A 45° launch angle gives maximum distance!',
    angleTypes: ['Acute angles', 'Obtuse angles']
  },
  {
    name: 'Daily Life',
    icon: '🏠',
    color: '#00838F',
    bgColor: '#E0F7FA',
    examples: [
      'Clock hands form angles (30° per hour)',
      'Ramps use angles for accessibility (max 8.33°)',
      'TV viewing angle affects picture quality'
    ],
    funFact: 'At 3:00, clock hands form exactly 90°!',
    angleTypes: ['Right angles', 'Acute angles']
  }
];

let hoveredCategory = -1;
let selectedCategory = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Interactive infographic showing angle applications in six real-world categories', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Title
  fill('#1565C0');
  textSize(24);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Angles in the Real World', canvasWidth / 2, 12);
  textStyle(NORMAL);

  fill('#757575');
  textSize(13);
  text('Click a category to explore real-world angle applications', canvasWidth / 2, 42);

  checkHover();

  if (selectedCategory >= 0) {
    drawExpandedView();
  } else {
    drawGrid();
  }
}

function checkHover() {
  if (selectedCategory >= 0) {
    hoveredCategory = -1;
    return;
  }

  hoveredCategory = -1;
  let cardW = (canvasWidth - 80) / 3;
  let cardH = 220;
  let startY = 75;
  let gap = 20;

  for (let i = 0; i < 6; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let cx = 30 + col * (cardW + gap);
    let cy = startY + row * (cardH + gap);

    if (mouseX > cx && mouseX < cx + cardW && mouseY > cy && mouseY < cy + cardH) {
      hoveredCategory = i;
      return;
    }
  }
}

function drawGrid() {
  let cardW = (canvasWidth - 80) / 3;
  let cardH = 220;
  let startY = 75;
  let gap = 20;

  for (let i = 0; i < 6; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let cx = 30 + col * (cardW + gap);
    let cy = startY + row * (cardH + gap);

    drawCard(i, cx, cy, cardW, cardH);
  }
}

function drawCard(index, x, y, w, h) {
  let cat = categories[index];
  let isHovered = (hoveredCategory === index);

  // Card shadow and background
  if (isHovered) {
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = cat.color;
  }

  fill(cat.bgColor);
  stroke(cat.color);
  strokeWeight(isHovered ? 4 : 2);
  rect(x, y, w, h, 12);
  drawingContext.shadowBlur = 0;

  // Icon
  textSize(48);
  textAlign(CENTER, TOP);
  noStroke();
  text(cat.icon, x + w / 2, y + 20);

  // Category name
  fill(cat.color);
  textSize(18);
  textStyle(BOLD);
  text(cat.name, x + w / 2, y + 85);
  textStyle(NORMAL);

  // Brief description
  fill('#424242');
  textSize(11);
  textAlign(CENTER, TOP);

  let preview = cat.examples[0];
  if (preview.length > 45) {
    preview = preview.substring(0, 42) + '...';
  }
  text(preview, x + w / 2, y + 115);

  // Angle types badge
  fill(cat.color);
  noStroke();
  rect(x + w / 2 - 60, y + h - 55, 120, 22, 11);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(cat.angleTypes[0], x + w / 2, y + h - 44);

  // Click prompt
  if (isHovered) {
    fill(cat.color);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('Click to explore →', x + w / 2, y + h - 10);
    textStyle(NORMAL);
  }
}

function drawExpandedView() {
  let cat = categories[selectedCategory];

  // Back button area
  fill('#ECEFF1');
  noStroke();
  rect(0, 65, canvasWidth, 35);

  fill('#1565C0');
  textSize(14);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text('← Back to all categories', 30, 82);
  textStyle(NORMAL);

  // Main content area
  let panelY = 110;
  let panelH = 470;

  fill(cat.bgColor);
  stroke(cat.color);
  strokeWeight(3);
  rect(20, panelY, canvasWidth - 40, panelH, 12);

  // Header with icon and name
  textSize(56);
  textAlign(LEFT, TOP);
  noStroke();
  text(cat.icon, 50, panelY + 20);

  fill(cat.color);
  textSize(28);
  textStyle(BOLD);
  text(cat.name, 130, panelY + 30);
  textStyle(NORMAL);

  // Angle types badges
  let badgeX = 130;
  for (let atype of cat.angleTypes) {
    fill(cat.color);
    noStroke();
    let tw = textWidth(atype) + 20;
    rect(badgeX, panelY + 70, tw, 24, 12);
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    text(atype, badgeX + tw / 2, panelY + 82);
    badgeX += tw + 10;
  }

  // Examples section
  fill('#212121');
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Real-World Examples:', 50, panelY + 120);
  textStyle(NORMAL);

  textSize(14);
  fill('#424242');
  let exY = panelY + 150;
  for (let i = 0; i < cat.examples.length; i++) {
    fill(cat.color);
    text('•', 60, exY);
    fill('#424242');
    text(cat.examples[i], 80, exY);
    exY += 35;
  }

  // Fun fact box
  let factY = panelY + 280;
  fill('#FFF9C4');
  stroke('#FBC02D');
  strokeWeight(2);
  rect(50, factY, canvasWidth - 140, 60, 8);

  noStroke();
  fill('#F57F17');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('💡 Fun Fact:', 70, factY + 12);
  textStyle(NORMAL);

  fill('#424242');
  textSize(13);
  text(cat.funFact, 70, factY + 35);

  // Mini diagram based on category
  drawCategoryDiagram(cat, canvasWidth - 200, panelY + 380);
}

function drawCategoryDiagram(cat, cx, cy) {
  push();
  translate(cx, cy);

  fill('#FFFFFF');
  stroke(cat.color);
  strokeWeight(2);
  ellipse(0, 0, 140, 140);

  // Draw relevant angle illustration
  stroke(cat.color);
  strokeWeight(3);

  if (cat.name === 'Architecture') {
    // Right angle building corner
    line(-40, 30, -40, -30);
    line(-40, 30, 40, 30);
    noFill();
    stroke(cat.color);
    strokeWeight(1);
    rect(-40, 20, 10, 10);
    fill(cat.color);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text('90°', -20, 10);
  } else if (cat.name === 'Navigation') {
    // Compass directions
    line(0, -50, 0, 50);
    line(-50, 0, 50, 0);
    fill(cat.color);
    noStroke();
    textSize(10);
    text('N', 0, -40);
    text('E', 40, 0);
    text('S', 0, 40);
    text('W', -40, 0);
    // Arrow at 45°
    stroke('#E53935');
    strokeWeight(2);
    line(0, 0, 30, -30);
    fill('#E53935');
    noStroke();
    triangle(30, -30, 20, -25, 25, -20);
    textSize(9);
    text('45°', 15, -10);
  } else if (cat.name === 'Art & Design') {
    // Perspective vanishing point
    stroke('#9E9E9E');
    strokeWeight(1);
    line(0, -20, -50, 40);
    line(0, -20, 50, 40);
    line(0, -20, -30, 40);
    line(0, -20, 30, 40);
    fill('#E53935');
    noStroke();
    ellipse(0, -20, 8, 8);
    textSize(9);
    fill(cat.color);
    text('Vanishing', 0, -45);
    text('Point', 0, -35);
  } else if (cat.name === 'Engineering') {
    // Gear teeth angle
    noFill();
    stroke(cat.color);
    strokeWeight(2);
    ellipse(0, 0, 60, 60);
    // Gear teeth
    for (let a = 0; a < 360; a += 45) {
      let x1 = 30 * cos(radians(a));
      let y1 = 30 * sin(radians(a));
      let x2 = 40 * cos(radians(a));
      let y2 = 40 * sin(radians(a));
      line(x1, y1, x2, y2);
    }
    fill(cat.color);
    noStroke();
    textSize(9);
    text('45° spacing', 0, 55);
  } else if (cat.name === 'Sports') {
    // Projectile trajectory
    stroke('#9E9E9E');
    strokeWeight(1);
    line(-50, 30, 50, 30); // ground
    // Arc trajectory
    noFill();
    stroke('#E53935');
    strokeWeight(2);
    beginShape();
    for (let t = 0; t <= 1; t += 0.05) {
      let x = -40 + 80 * t;
      let y = 30 - 80 * t * (1 - t);
      vertex(x, y);
    }
    endShape();
    // Launch angle
    stroke(cat.color);
    line(-40, 30, -20, 10);
    fill(cat.color);
    noStroke();
    textSize(9);
    text('45°', -30, 20);
  } else if (cat.name === 'Daily Life') {
    // Clock face
    noFill();
    stroke('#424242');
    strokeWeight(2);
    ellipse(0, 0, 80, 80);
    // Hour markers
    for (let h = 0; h < 12; h++) {
      let a = radians(h * 30 - 90);
      let x1 = 35 * cos(a);
      let y1 = 35 * sin(a);
      let x2 = 40 * cos(a);
      let y2 = 40 * sin(a);
      line(x1, y1, x2, y2);
    }
    // Hands at 3:00
    stroke('#1565C0');
    strokeWeight(3);
    line(0, 0, 25, 0); // hour at 3
    stroke('#E53935');
    line(0, 0, 0, -30); // minute at 12
    fill(cat.color);
    noStroke();
    textSize(9);
    text('90°', 10, 15);
  }

  pop();
}

function mousePressed() {
  if (selectedCategory >= 0) {
    // Check if clicking back button
    if (mouseY > 65 && mouseY < 100) {
      selectedCategory = -1;
      return;
    }
  } else if (hoveredCategory >= 0) {
    selectedCategory = hoveredCategory;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 750);
  }
}
