// Composition of Transformations Explorer
// Shows multi-stage transformation sequences

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let t1Type = 0; // 0=Translation, 1=Rotation, 2=Reflection
let t2Type = 1;
let animStage = 2; // 0=original, 1=after T1, 2=after T2
let isAnimating = false;
let animProgress = 0;

let transformations = ['Translation', 'Rotation', 'Reflection'];

// Base triangle
let triangle = [
  [1, 1],
  [3, 1],
  [2, 3]
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Composition of transformations showing multi-stage sequences', LABEL);
}

function draw() {
  updateCanvasSize();

  // Draw area
  fill('#E8EAF6');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control panel
  fill('#ECEFF1');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#303F9F');
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Composition of Transformations", canvasWidth / 2, 10);
  textStyle(NORMAL);

  fill('#757575');
  textSize(11);
  text('T₂ ∘ T₁ means "Apply T₁ first, then T₂"', canvasWidth / 2, 35);

  // Animation update
  if (isAnimating) {
    animProgress += 0.025;
    if (animProgress >= 1) {
      animProgress = 0;
      animStage++;
      if (animStage > 2) {
        animStage = 2;
        isAnimating = false;
      }
    }
  }

  drawGrid();
  drawTransformations();
  drawControls();
  drawLegend();
}

function drawGrid() {
  let gridSize = min(canvasWidth - 100, drawHeight - 120);
  let cellSize = gridSize / 14;
  let centerX = canvasWidth / 2;
  let centerY = 280;

  window.gridCenterX = centerX;
  window.gridCenterY = centerY;
  window.cellSize = cellSize;

  // Grid lines
  stroke('#C5CAE9');
  strokeWeight(1);
  for (let i = -7; i <= 7; i++) {
    let x = centerX + i * cellSize;
    let y = centerY + i * cellSize;
    if (x >= 40 && x <= canvasWidth - 40) {
      line(x, 60, x, drawHeight - 40);
    }
    if (y >= 60 && y <= drawHeight - 40) {
      line(40, y, canvasWidth - 40, y);
    }
  }

  // Axes
  stroke('#3F51B5');
  strokeWeight(2);
  line(40, centerY, canvasWidth - 40, centerY);
  line(centerX, 60, centerX, drawHeight - 40);
}

function applyTransform(points, type, progress) {
  if (type === 0) {
    // Translation (3, 2)
    return points.map(v => [
      v[0] + 3 * progress,
      v[1] + 2 * progress
    ]);
  } else if (type === 1) {
    // Rotation 90° around origin
    let angle = PI / 2 * progress;
    return points.map(v => {
      let rx = v[0] * cos(angle) - v[1] * sin(angle);
      let ry = v[0] * sin(angle) + v[1] * cos(angle);
      return [rx, ry];
    });
  } else {
    // Reflection over y-axis
    return points.map(v => [
      lerp(v[0], -v[0], progress),
      v[1]
    ]);
  }
}

function drawTransformations() {
  let gx = window.gridCenterX;
  let gy = window.gridCenterY;
  let cs = window.cellSize;

  // Stage 0: Original (blue)
  let stage0 = triangle;
  let verts0 = stage0.map(v => [gx + v[0] * cs, gy - v[1] * cs]);

  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(2);
  beginShape();
  for (let v of verts0) vertex(v[0], v[1]);
  endShape(CLOSE);

  // Label
  noStroke();
  fill('#0D47A1');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Original', verts0[0][0], verts0[0][1] + 5);

  // Stage 1: After T1 (purple)
  let stage1Full = applyTransform(triangle, t1Type, 1);
  let stage1 = (animStage === 0) ? triangle :
               (animStage === 1 && isAnimating) ? applyTransform(triangle, t1Type, animProgress) :
               stage1Full;

  if (animStage >= 1) {
    let verts1 = stage1.map(v => [gx + v[0] * cs, gy - v[1] * cs]);

    if (animStage === 1 && isAnimating) {
      fill(156, 39, 176, 180);
      stroke(106, 27, 154, 180);
    } else {
      fill('#9C27B0');
      stroke('#6A1B9A');
    }
    strokeWeight(2);
    beginShape();
    for (let v of verts1) vertex(v[0], v[1]);
    endShape(CLOSE);

    if (animStage > 1 || !isAnimating) {
      noStroke();
      fill('#6A1B9A');
      textSize(10);
      text('After T₁', verts1[1][0] + 10, verts1[1][1]);
    }
  }

  // Stage 2: After T2 (green)
  if (animStage >= 2) {
    let stage2 = isAnimating ?
                 applyTransform(stage1Full, t2Type, animProgress) :
                 applyTransform(stage1Full, t2Type, 1);

    let verts2 = stage2.map(v => [gx + v[0] * cs, gy - v[1] * cs]);

    if (isAnimating) {
      fill(76, 175, 80, 180);
      stroke(46, 125, 50, 180);
    } else {
      fill('#4CAF50');
      stroke('#2E7D32');
    }
    strokeWeight(2);
    beginShape();
    for (let v of verts2) vertex(v[0], v[1]);
    endShape(CLOSE);

    if (!isAnimating) {
      noStroke();
      fill('#2E7D32');
      textSize(10);
      text('After T₂', verts2[2][0], verts2[2][1] - 12);
    }
  }
}

function drawControls() {
  let y = drawHeight + 10;

  // T1 selector
  fill('#424242');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('T₁:', 20, y + 15);

  let btnW = 80;
  let btnH = 24;

  for (let i = 0; i < 3; i++) {
    let bx = 50 + i * (btnW + 5);

    if (i === t1Type) {
      fill('#9C27B0');
    } else if (mouseX >= bx && mouseX <= bx + btnW &&
               mouseY >= y + 3 && mouseY <= y + 3 + btnH) {
      fill('#CE93D8');
    } else {
      fill('#E1BEE7');
    }
    rect(bx, y + 3, btnW, btnH, 3);

    fill(i === t1Type ? 'white' : '#4A148C');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(transformations[i], bx + btnW / 2, y + 3 + btnH / 2);
  }

  // T2 selector
  textAlign(LEFT, CENTER);
  fill('#424242');
  text('T₂:', 20, y + 45);

  for (let i = 0; i < 3; i++) {
    let bx = 50 + i * (btnW + 5);

    if (i === t2Type) {
      fill('#4CAF50');
    } else if (mouseX >= bx && mouseX <= bx + btnW &&
               mouseY >= y + 33 && mouseY <= y + 33 + btnH) {
      fill('#A5D6A7');
    } else {
      fill('#C8E6C9');
    }
    rect(bx, y + 33, btnW, btnH, 3);

    fill(i === t2Type ? 'white' : '#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(transformations[i], bx + btnW / 2, y + 33 + btnH / 2);
  }

  // Animate button
  let animBtnX = canvasWidth - 180;
  let animBtnY = y + 18;
  let animBtnW = 90;
  let animBtnH = 32;

  if (mouseX >= animBtnX && mouseX <= animBtnX + animBtnW &&
      mouseY >= animBtnY && mouseY <= animBtnY + animBtnH) {
    fill('#303F9F');
  } else {
    fill('#3F51B5');
  }
  rect(animBtnX, animBtnY, animBtnW, animBtnH, 5);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Animate', animBtnX + animBtnW / 2, animBtnY + animBtnH / 2);

  // Reset button
  let resetBtnX = animBtnX + animBtnW + 10;

  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 60 &&
      mouseY >= animBtnY && mouseY <= animBtnY + animBtnH) {
    fill('#757575');
  } else {
    fill('#9E9E9E');
  }
  rect(resetBtnX, animBtnY, 60, animBtnH, 5);
  fill('white');
  text('Reset', resetBtnX + 30, animBtnY + animBtnH / 2);

  // Composition notation
  fill('#424242');
  textAlign(LEFT, CENTER);
  textSize(11);
  text(`Composition: T₂ ∘ T₁ = ${transformations[t2Type]} ∘ ${transformations[t1Type]}`,
       canvasWidth / 2 - 100, y + 75);
}

function drawLegend() {
  let x = 50;
  let y = 65;

  // Legend
  textSize(10);
  textAlign(LEFT, CENTER);

  fill('#1565C0');
  ellipse(x, y, 10, 10);
  fill('#424242');
  text('Original', x + 15, y);

  fill('#9C27B0');
  ellipse(x + 80, y, 10, 10);
  fill('#424242');
  text('After T₁', x + 95, y);

  fill('#4CAF50');
  ellipse(x + 160, y, 10, 10);
  fill('#424242');
  text('After T₂ (Final)', x + 175, y);
}

function mousePressed() {
  let y = drawHeight + 10;
  let btnW = 80;
  let btnH = 24;

  // T1 buttons
  for (let i = 0; i < 3; i++) {
    let bx = 50 + i * (btnW + 5);
    if (mouseX >= bx && mouseX <= bx + btnW &&
        mouseY >= y + 3 && mouseY <= y + 3 + btnH) {
      t1Type = i;
      animStage = 0;
      isAnimating = false;
      return;
    }
  }

  // T2 buttons
  for (let i = 0; i < 3; i++) {
    let bx = 50 + i * (btnW + 5);
    if (mouseX >= bx && mouseX <= bx + btnW &&
        mouseY >= y + 33 && mouseY <= y + 33 + btnH) {
      t2Type = i;
      animStage = 0;
      isAnimating = false;
      return;
    }
  }

  // Animate button
  let animBtnX = canvasWidth - 180;
  let animBtnY = y + 18;

  if (mouseX >= animBtnX && mouseX <= animBtnX + 90 &&
      mouseY >= animBtnY && mouseY <= animBtnY + 32) {
    animStage = 0;
    animProgress = 0;
    isAnimating = true;
    return;
  }

  // Reset button
  let resetBtnX = animBtnX + 100;
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 60 &&
      mouseY >= animBtnY && mouseY <= animBtnY + 32) {
    animStage = 0;
    animProgress = 0;
    isAnimating = false;
    return;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 800);
    canvasWidth = max(canvasWidth, 500);
  }
}
