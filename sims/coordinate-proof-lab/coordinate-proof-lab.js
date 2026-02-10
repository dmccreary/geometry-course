// Coordinate Proof Laboratory
// Interactive coordinate proof tool with draggable vertices and formula workspace

let canvasWidth = 900;
let canvasHeight = 700;

// Layout constants
let leftPanelW = 500;
let rightPanelW = 400;

// Coordinate plane settings
let gridOriginX, gridOriginY;
let gridSize = 45; // pixels per unit
let gridMinX = -1, gridMaxX = 9;
let gridMinY = -1, gridMaxY = 8;

// Figure types
let figureTypes = ['Rectangle', 'Parallelogram', 'Isosceles Triangle', 'Right Triangle', 'Rhombus'];
let currentFigureIndex = 0;

// Default vertex configurations for each figure
let figureDefaults = {
  'Rectangle': [
    { x: 0, y: 0, label: 'A', col: '#D32F2F' },
    { x: 4, y: 0, label: 'B', col: '#1976D2' },
    { x: 4, y: 3, label: 'C', col: '#388E3C' },
    { x: 0, y: 3, label: 'D', col: '#7B1FA2' }
  ],
  'Parallelogram': [
    { x: 1, y: 0, label: 'A', col: '#D32F2F' },
    { x: 5, y: 0, label: 'B', col: '#1976D2' },
    { x: 7, y: 3, label: 'C', col: '#388E3C' },
    { x: 3, y: 3, label: 'D', col: '#7B1FA2' }
  ],
  'Isosceles Triangle': [
    { x: 0, y: 0, label: 'A', col: '#D32F2F' },
    { x: 6, y: 0, label: 'B', col: '#1976D2' },
    { x: 3, y: 5, label: 'C', col: '#388E3C' }
  ],
  'Right Triangle': [
    { x: 0, y: 0, label: 'A', col: '#D32F2F' },
    { x: 5, y: 0, label: 'B', col: '#1976D2' },
    { x: 0, y: 4, label: 'C', col: '#388E3C' }
  ],
  'Rhombus': [
    { x: 3, y: 0, label: 'A', col: '#D32F2F' },
    { x: 6, y: 2, label: 'B', col: '#1976D2' },
    { x: 3, y: 4, label: 'C', col: '#388E3C' },
    { x: 0, y: 2, label: 'D', col: '#7B1FA2' }
  ]
};

// Optimal placements (origin-aligned)
let optimalPlacements = {
  'Rectangle': [
    { x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }
  ],
  'Parallelogram': [
    { x: 0, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 3 }, { x: 2, y: 3 }
  ],
  'Isosceles Triangle': [
    { x: 0, y: 0 }, { x: 6, y: 0 }, { x: 3, y: 5 }
  ],
  'Right Triangle': [
    { x: 0, y: 0 }, { x: 5, y: 0 }, { x: 0, y: 4 }
  ],
  'Rhombus': [
    { x: 3, y: 0 }, { x: 6, y: 2 }, { x: 3, y: 4 }, { x: 0, y: 2 }
  ]
};

let vertices = [];
let draggingVertex = -1;

// UI state
let snapToGrid = true;
let showDiagonals = true;
let activeFormulaTab = 0; // 0=Distance, 1=Slope, 2=Midpoint

// Dropdown state
let dropdownOpen = false;

// Scroll state for right panel
let scrollOffset = 0;
let maxScrollOffset = 0;

// Button definitions (populated in setup)
let buttons = [];
let toggles = [];
let formulaTabs = [];

// Conclusion properties for each figure type
let figureProperties = {
  'Rectangle': 'Diagonals are congruent',
  'Parallelogram': 'Diagonals bisect each other',
  'Isosceles Triangle': 'Two sides are equal (isosceles)',
  'Right Triangle': 'Pythagorean theorem holds',
  'Rhombus': 'Diagonals are perpendicular'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  loadFigure(currentFigureIndex);
  describe('Interactive coordinate proof laboratory with draggable vertices and real-time formula calculations', LABEL);
}

function loadFigure(index) {
  currentFigureIndex = index;
  let figName = figureTypes[index];
  vertices = figureDefaults[figName].map(v => ({ ...v }));
}

function draw() {
  updateCanvasSize();
  background('#F5F5F5');

  // Left panel background
  fill('#FFFFFF');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(0, 0, leftPanelW, canvasHeight);

  // Right panel background
  fill('#FAFAFA');
  noStroke();
  rect(leftPanelW, 0, rightPanelW, canvasHeight);

  // Draw coordinate plane in left panel
  drawCoordinatePlane();
  drawFigure();

  // Draw right panel content
  drawRightPanel();

  // Draw dropdown overlay last (on top of everything)
  if (dropdownOpen) {
    drawDropdownMenu();
  }
}

// ========================
// COORDINATE PLANE (LEFT)
// ========================

function drawCoordinatePlane() {
  gridOriginX = 55;
  gridOriginY = canvasHeight - 70;

  // Title
  fill('#1565C0');
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Coordinate Plane', leftPanelW / 2, 10);
  textStyle(NORMAL);

  // Grid lines
  stroke('#E8E8E8');
  strokeWeight(1);
  for (let gx = gridMinX; gx <= gridMaxX; gx++) {
    let px = gridOriginX + gx * gridSize;
    if (px >= 10 && px <= leftPanelW - 10) {
      line(px, 35, px, gridOriginY + 15);
    }
  }
  for (let gy = gridMinY; gy <= gridMaxY; gy++) {
    let py = gridOriginY - gy * gridSize;
    if (py >= 35 && py <= gridOriginY + 15) {
      line(10, py, leftPanelW - 10, py);
    }
  }

  // Axes
  stroke('#424242');
  strokeWeight(2);
  // X-axis
  line(10, gridOriginY, leftPanelW - 10, gridOriginY);
  // Y-axis
  line(gridOriginX, 35, gridOriginX, gridOriginY + 15);

  // Axis arrows
  fill('#424242');
  noStroke();
  // X arrow
  triangle(leftPanelW - 10, gridOriginY, leftPanelW - 18, gridOriginY - 5, leftPanelW - 18, gridOriginY + 5);
  // Y arrow
  triangle(gridOriginX, 35, gridOriginX - 5, 43, gridOriginX + 5, 43);

  // Axis labels
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('x', leftPanelW - 15, gridOriginY + 5);
  textAlign(RIGHT, CENTER);
  text('y', gridOriginX - 8, 42);
  textStyle(NORMAL);

  // Tick labels
  textSize(10);
  fill('#757575');
  textAlign(CENTER, TOP);
  for (let gx = 0; gx <= gridMaxX; gx++) {
    let px = gridOriginX + gx * gridSize;
    if (px >= 10 && px <= leftPanelW - 25) {
      text(gx, px, gridOriginY + 4);
    }
  }
  textAlign(RIGHT, CENTER);
  for (let gy = 1; gy <= gridMaxY; gy++) {
    let py = gridOriginY - gy * gridSize;
    if (py >= 35) {
      text(gy, gridOriginX - 6, py);
    }
  }
}

function drawFigure() {
  let n = vertices.length;

  // Draw filled shape
  fill(200, 220, 255, 60);
  stroke('#424242');
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < n; i++) {
    let px = gridOriginX + vertices[i].x * gridSize;
    let py = gridOriginY - vertices[i].y * gridSize;
    vertex(px, py);
  }
  endShape(CLOSE);

  // Draw diagonals if enabled and shape has 4 vertices
  if (showDiagonals && n === 4) {
    drawingContext.setLineDash([6, 4]);
    // Diagonal AC
    stroke('#D32F2F');
    strokeWeight(2);
    let ax = gridOriginX + vertices[0].x * gridSize;
    let ay = gridOriginY - vertices[0].y * gridSize;
    let cx = gridOriginX + vertices[2].x * gridSize;
    let cy = gridOriginY - vertices[2].y * gridSize;
    line(ax, ay, cx, cy);

    // Diagonal BD
    stroke('#1976D2');
    let bx = gridOriginX + vertices[1].x * gridSize;
    let by = gridOriginY - vertices[1].y * gridSize;
    let dx = gridOriginX + vertices[3].x * gridSize;
    let dy = gridOriginY - vertices[3].y * gridSize;
    line(bx, by, dx, dy);
    drawingContext.setLineDash([]);
  }

  // Draw edges with side labels
  for (let i = 0; i < n; i++) {
    let v1 = vertices[i];
    let v2 = vertices[(i + 1) % n];
    let px1 = gridOriginX + v1.x * gridSize;
    let py1 = gridOriginY - v1.y * gridSize;
    let px2 = gridOriginX + v2.x * gridSize;
    let py2 = gridOriginY - v2.y * gridSize;

    // Side length label
    let d = sqrt(pow(v2.x - v1.x, 2) + pow(v2.y - v1.y, 2));
    let mx = (px1 + px2) / 2;
    let my = (py1 + py2) / 2;
    let angle = atan2(py2 - py1, px2 - px1) + PI / 2;
    mx += cos(angle) * 14;
    my += sin(angle) * 14;

    noStroke();
    fill('#E65100');
    textSize(10);
    textAlign(CENTER, CENTER);
    text(d.toFixed(2), mx, my);
  }

  // Draw vertices
  for (let i = 0; i < n; i++) {
    let v = vertices[i];
    let px = gridOriginX + v.x * gridSize;
    let py = gridOriginY - v.y * gridSize;
    let isHover = draggingVertex === i || dist(mouseX, mouseY, px, py) < 15;

    // Vertex dot
    fill(v.col);
    noStroke();
    circle(px, py, isHover ? 18 : 14);

    // White center on hover
    if (isHover) {
      fill(255);
      circle(px, py, 6);
    }

    // Label and coordinates
    let offX = (v.x < 4) ? -20 : 20;
    let offY = (v.y < 3) ? 18 : -18;
    // Avoid overlap
    if (i === 0) { offX = -20; offY = 18; }
    if (n === 4 && i === 3) { offX = -20; offY = -18; }

    fill(v.col);
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(v.label, px + offX, py + offY);
    textStyle(NORMAL);

    fill('#424242');
    textSize(10);
    text('(' + nf(v.x, 0, 0) + ', ' + nf(v.y, 0, 0) + ')', px + offX, py + offY + (offY > 0 ? 13 : -13));
  }
}

// ========================
// RIGHT PANEL
// ========================

function drawRightPanel() {
  let rx = leftPanelW + 10;
  let ry = 10;
  let rw = rightPanelW - 20;

  // Title
  fill('#1565C0');
  noStroke();
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Proof Workspace', leftPanelW + rightPanelW / 2, ry);
  textStyle(NORMAL);
  ry += 28;

  // Figure selector dropdown button
  drawDropdownButton(rx, ry, rw, 30);
  ry += 40;

  // Suggest Optimal Placement button
  drawCanvasButton(rx, ry, rw, 28, 'Suggest Optimal Placement', '#1565C0', '#FFFFFF');
  ry += 38;

  // Formula tabs
  drawFormulaTabs(rx, ry, rw);
  ry += 35;

  // Step-by-step calculation
  drawCalculationSteps(rx, ry, rw);

  // Controls at bottom
  drawControlButtons();
}

function drawDropdownButton(x, y, w, h) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  fill(isHover ? '#E3F2FD' : '#FFFFFF');
  stroke('#1976D2');
  strokeWeight(2);
  rect(x, y, w, h, 5);

  fill('#1976D2');
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Figure: ' + figureTypes[currentFigureIndex], x + 10, y + h / 2);

  // Dropdown arrow
  textAlign(RIGHT, CENTER);
  text(dropdownOpen ? '\u25B2' : '\u25BC', x + w - 10, y + h / 2);
}

function drawDropdownMenu() {
  let rx = leftPanelW + 10;
  let ry = 68;
  let rw = rightPanelW - 20;
  let itemH = 28;

  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(rx + 3, ry + 3, rw, itemH * figureTypes.length, 5);

  for (let i = 0; i < figureTypes.length; i++) {
    let iy = ry + i * itemH;
    let isHover = mouseX >= rx && mouseX <= rx + rw && mouseY >= iy && mouseY <= iy + itemH;
    let isSelected = i === currentFigureIndex;

    fill(isSelected ? '#BBDEFB' : (isHover ? '#E3F2FD' : '#FFFFFF'));
    stroke('#BBDEFB');
    strokeWeight(1);
    if (i === 0) {
      rect(rx, iy, rw, itemH, 5, 5, 0, 0);
    } else if (i === figureTypes.length - 1) {
      rect(rx, iy, rw, itemH, 0, 0, 5, 5);
    } else {
      rect(rx, iy, rw, itemH);
    }

    fill(isSelected ? '#1565C0' : '#424242');
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(figureTypes[i], rx + 12, iy + itemH / 2);
  }
}

function drawCanvasButton(x, y, w, h, label, bgCol, textCol) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  fill(isHover ? '#1976D2' : bgCol);
  stroke(bgCol);
  strokeWeight(1);
  rect(x, y, w, h, 5);

  fill(textCol);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

function drawFormulaTabs(x, y, w) {
  let tabLabels = ['Distance', 'Slope', 'Midpoint'];
  let tabW = w / 3;

  for (let i = 0; i < 3; i++) {
    let tx = x + i * tabW;
    let isActive = activeFormulaTab === i;
    let isHover = mouseX >= tx && mouseX <= tx + tabW && mouseY >= y && mouseY <= y + 28;

    fill(isActive ? '#1565C0' : (isHover ? '#E3F2FD' : '#ECEFF1'));
    stroke('#1565C0');
    strokeWeight(1);
    if (i === 0) {
      rect(tx, y, tabW, 28, 5, 0, 0, 5);
    } else if (i === 2) {
      rect(tx, y, tabW, 28, 0, 5, 5, 0);
    } else {
      rect(tx, y, tabW, 28);
    }

    fill(isActive ? '#FFFFFF' : '#424242');
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(tabLabels[i], tx + tabW / 2, y + 14);
    textStyle(NORMAL);
  }
}

function drawCalculationSteps(x, y, w) {
  let figName = figureTypes[currentFigureIndex];
  let n = vertices.length;

  // Calculation box
  fill('#FFFFFF');
  stroke('#E0E0E0');
  strokeWeight(1);
  let boxH = canvasHeight - y - 90;
  rect(x, y, w, boxH, 5);

  let cy = y + 8;
  let cx = x + 8;
  let maxW = w - 16;

  // Formula header
  fill('#1565C0');
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);

  if (activeFormulaTab === 0) {
    // DISTANCE calculations
    text('Distance Formula:', cx, cy);
    cy += 16;
    fill('#757575');
    textStyle(NORMAL);
    textSize(10);
    text('d = \u221A[(x\u2082-x\u2081)\u00B2 + (y\u2082-y\u2081)\u00B2]', cx, cy);
    cy += 18;

    // Side distances
    fill('#2E7D32');
    textStyle(BOLD);
    textSize(11);
    text('Side Lengths:', cx, cy);
    cy += 16;
    textStyle(NORMAL);
    fill('#424242');
    textSize(10);

    for (let i = 0; i < n; i++) {
      let v1 = vertices[i];
      let v2 = vertices[(i + 1) % n];
      let dx = v2.x - v1.x;
      let dy = v2.y - v1.y;
      let d = sqrt(dx * dx + dy * dy);
      let sideName = v1.label + v2.label;

      text(sideName + ' = \u221A[(' + nf(dx, 0, 0) + ')\u00B2 + (' + nf(dy, 0, 0) + ')\u00B2] = \u221A[' +
        nf(dx * dx, 0, 0) + ' + ' + nf(dy * dy, 0, 0) + '] = ' + nf(d, 0, 3), cx, cy);
      cy += 14;
    }

    // Diagonal distances for 4-vertex shapes
    if (n === 4) {
      cy += 6;
      fill('#C62828');
      textStyle(BOLD);
      textSize(11);
      text('Diagonal Lengths:', cx, cy);
      cy += 16;
      textStyle(NORMAL);
      textSize(10);

      let dxAC = vertices[2].x - vertices[0].x;
      let dyAC = vertices[2].y - vertices[0].y;
      let diagAC = sqrt(dxAC * dxAC + dyAC * dyAC);

      let dxBD = vertices[3].x - vertices[1].x;
      let dyBD = vertices[3].y - vertices[1].y;
      let diagBD = sqrt(dxBD * dxBD + dyBD * dyBD);

      fill('#C62828');
      text('AC = \u221A[(' + nf(dxAC, 0, 0) + ')\u00B2 + (' + nf(dyAC, 0, 0) + ')\u00B2] = ' + nf(diagAC, 0, 3), cx, cy);
      cy += 14;
      fill('#1565C0');
      text('BD = \u221A[(' + nf(dxBD, 0, 0) + ')\u00B2 + (' + nf(dyBD, 0, 0) + ')\u00B2] = ' + nf(diagBD, 0, 3), cx, cy);
      cy += 14;
    }

  } else if (activeFormulaTab === 1) {
    // SLOPE calculations
    text('Slope Formula:', cx, cy);
    cy += 16;
    fill('#757575');
    textStyle(NORMAL);
    textSize(10);
    text('m = (y\u2082 - y\u2081) / (x\u2082 - x\u2081)', cx, cy);
    cy += 18;

    fill('#2E7D32');
    textStyle(BOLD);
    textSize(11);
    text('Side Slopes:', cx, cy);
    cy += 16;
    textStyle(NORMAL);
    fill('#424242');
    textSize(10);

    for (let i = 0; i < n; i++) {
      let v1 = vertices[i];
      let v2 = vertices[(i + 1) % n];
      let dx = v2.x - v1.x;
      let dy = v2.y - v1.y;
      let sideName = v1.label + v2.label;

      if (abs(dx) < 0.001) {
        text(sideName + ' = (' + nf(dy, 0, 0) + ') / (' + nf(dx, 0, 0) + ') = undefined (vertical)', cx, cy);
      } else {
        let slope = dy / dx;
        text(sideName + ' = (' + nf(dy, 0, 0) + ') / (' + nf(dx, 0, 0) + ') = ' + nf(slope, 0, 3), cx, cy);
      }
      cy += 14;
    }

    // Diagonal slopes for 4-vertex shapes
    if (n === 4) {
      cy += 6;
      fill('#C62828');
      textStyle(BOLD);
      textSize(11);
      text('Diagonal Slopes:', cx, cy);
      cy += 16;
      textStyle(NORMAL);
      textSize(10);

      let dxAC = vertices[2].x - vertices[0].x;
      let dyAC = vertices[2].y - vertices[0].y;
      let dxBD = vertices[3].x - vertices[1].x;
      let dyBD = vertices[3].y - vertices[1].y;

      fill('#C62828');
      if (abs(dxAC) < 0.001) {
        text('AC slope = undefined (vertical)', cx, cy);
      } else {
        text('AC slope = (' + nf(dyAC, 0, 0) + ') / (' + nf(dxAC, 0, 0) + ') = ' + nf(dyAC / dxAC, 0, 3), cx, cy);
      }
      cy += 14;

      fill('#1565C0');
      if (abs(dxBD) < 0.001) {
        text('BD slope = undefined (vertical)', cx, cy);
      } else {
        text('BD slope = (' + nf(dyBD, 0, 0) + ') / (' + nf(dxBD, 0, 0) + ') = ' + nf(dyBD / dxBD, 0, 3), cx, cy);
      }
      cy += 14;

      // Product of slopes for perpendicularity check
      if (abs(dxAC) > 0.001 && abs(dxBD) > 0.001) {
        cy += 4;
        let slopeAC = dyAC / dxAC;
        let slopeBD = dyBD / dxBD;
        let product = slopeAC * slopeBD;
        fill('#757575');
        text('Slope product: ' + nf(slopeAC, 0, 3) + ' \u00D7 ' + nf(slopeBD, 0, 3) + ' = ' + nf(product, 0, 3), cx, cy);
        cy += 12;
        if (abs(product + 1) < 0.01) {
          fill('#2E7D32');
          textStyle(BOLD);
          text('Product = -1  \u2192  Diagonals are perpendicular!', cx, cy);
          textStyle(NORMAL);
        }
        cy += 14;
      }
    }

  } else if (activeFormulaTab === 2) {
    // MIDPOINT calculations
    text('Midpoint Formula:', cx, cy);
    cy += 16;
    fill('#757575');
    textStyle(NORMAL);
    textSize(10);
    text('M = ((x\u2081+x\u2082)/2, (y\u2081+y\u2082)/2)', cx, cy);
    cy += 18;

    fill('#2E7D32');
    textStyle(BOLD);
    textSize(11);
    text('Side Midpoints:', cx, cy);
    cy += 16;
    textStyle(NORMAL);
    fill('#424242');
    textSize(10);

    for (let i = 0; i < n; i++) {
      let v1 = vertices[i];
      let v2 = vertices[(i + 1) % n];
      let midX = (v1.x + v2.x) / 2;
      let midY = (v1.y + v2.y) / 2;
      let sideName = v1.label + v2.label;

      text('Mid(' + sideName + ') = ((' + nf(v1.x, 0, 0) + '+' + nf(v2.x, 0, 0) + ')/2, (' +
        nf(v1.y, 0, 0) + '+' + nf(v2.y, 0, 0) + ')/2) = (' + nf(midX, 0, 1) + ', ' + nf(midY, 0, 1) + ')', cx, cy);
      cy += 14;
    }

    // Diagonal midpoints for 4-vertex shapes
    if (n === 4) {
      cy += 6;
      fill('#C62828');
      textStyle(BOLD);
      textSize(11);
      text('Diagonal Midpoints:', cx, cy);
      cy += 16;
      textStyle(NORMAL);
      textSize(10);

      let midACx = (vertices[0].x + vertices[2].x) / 2;
      let midACy = (vertices[0].y + vertices[2].y) / 2;
      let midBDx = (vertices[1].x + vertices[3].x) / 2;
      let midBDy = (vertices[1].y + vertices[3].y) / 2;

      fill('#C62828');
      text('Mid(AC) = (' + nf(midACx, 0, 1) + ', ' + nf(midACy, 0, 1) + ')', cx, cy);
      cy += 14;
      fill('#1565C0');
      text('Mid(BD) = (' + nf(midBDx, 0, 1) + ', ' + nf(midBDy, 0, 1) + ')', cx, cy);
      cy += 14;

      // Check if midpoints are the same (diagonals bisect)
      if (abs(midACx - midBDx) < 0.01 && abs(midACy - midBDy) < 0.01) {
        cy += 4;
        fill('#2E7D32');
        textStyle(BOLD);
        text('Midpoints are equal \u2192 Diagonals bisect each other!', cx, cy);
        textStyle(NORMAL);
        cy += 14;
      }
    }
  }

  // Conclusion section
  cy += 10;
  drawConclusion(x, cy, w);
}

function drawConclusion(x, y, w) {
  let figName = figureTypes[currentFigureIndex];
  let n = vertices.length;
  let property = figureProperties[figName];
  let verified = false;
  let detail = '';

  if (figName === 'Rectangle') {
    let dxAC = vertices[2].x - vertices[0].x;
    let dyAC = vertices[2].y - vertices[0].y;
    let diagAC = sqrt(dxAC * dxAC + dyAC * dyAC);
    let dxBD = vertices[3].x - vertices[1].x;
    let dyBD = vertices[3].y - vertices[1].y;
    let diagBD = sqrt(dxBD * dxBD + dyBD * dyBD);
    verified = abs(diagAC - diagBD) < 0.01;
    detail = 'AC = ' + nf(diagAC, 0, 3) + ', BD = ' + nf(diagBD, 0, 3);
  } else if (figName === 'Parallelogram') {
    let midACx = (vertices[0].x + vertices[2].x) / 2;
    let midACy = (vertices[0].y + vertices[2].y) / 2;
    let midBDx = (vertices[1].x + vertices[3].x) / 2;
    let midBDy = (vertices[1].y + vertices[3].y) / 2;
    verified = abs(midACx - midBDx) < 0.01 && abs(midACy - midBDy) < 0.01;
    detail = 'Mid(AC) = (' + nf(midACx, 0, 1) + ', ' + nf(midACy, 0, 1) + '), Mid(BD) = (' + nf(midBDx, 0, 1) + ', ' + nf(midBDy, 0, 1) + ')';
  } else if (figName === 'Isosceles Triangle') {
    let dAB = sqrt(pow(vertices[1].x - vertices[0].x, 2) + pow(vertices[1].y - vertices[0].y, 2));
    let dBC = sqrt(pow(vertices[2].x - vertices[1].x, 2) + pow(vertices[2].y - vertices[1].y, 2));
    let dCA = sqrt(pow(vertices[0].x - vertices[2].x, 2) + pow(vertices[0].y - vertices[2].y, 2));
    verified = abs(dAB - dBC) < 0.01 || abs(dBC - dCA) < 0.01 || abs(dCA - dAB) < 0.01;
    detail = 'AB = ' + nf(dAB, 0, 3) + ', BC = ' + nf(dBC, 0, 3) + ', CA = ' + nf(dCA, 0, 3);
  } else if (figName === 'Right Triangle') {
    let sides = [];
    for (let i = 0; i < 3; i++) {
      let v1 = vertices[i];
      let v2 = vertices[(i + 1) % 3];
      sides.push(sqrt(pow(v2.x - v1.x, 2) + pow(v2.y - v1.y, 2)));
    }
    sides.sort((a, b) => a - b);
    verified = abs(sides[0] * sides[0] + sides[1] * sides[1] - sides[2] * sides[2]) < 0.1;
    detail = nf(sides[0], 0, 2) + '\u00B2 + ' + nf(sides[1], 0, 2) + '\u00B2 = ' +
      nf(sides[0] * sides[0] + sides[1] * sides[1], 0, 2) + ', ' + nf(sides[2], 0, 2) + '\u00B2 = ' + nf(sides[2] * sides[2], 0, 2);
  } else if (figName === 'Rhombus') {
    let dxAC = vertices[2].x - vertices[0].x;
    let dyAC = vertices[2].y - vertices[0].y;
    let dxBD = vertices[3].x - vertices[1].x;
    let dyBD = vertices[3].y - vertices[1].y;
    if (abs(dxAC) < 0.001 || abs(dxBD) < 0.001) {
      // One diagonal is vertical
      if (abs(dxAC) < 0.001 && abs(dyBD) < 0.001) {
        verified = true; // one vertical, one horizontal
      } else if (abs(dxBD) < 0.001 && abs(dyAC) < 0.001) {
        verified = true;
      } else {
        verified = false;
      }
      detail = 'One diagonal is vertical';
    } else {
      let slopeAC = dyAC / dxAC;
      let slopeBD = dyBD / dxBD;
      verified = abs(slopeAC * slopeBD + 1) < 0.05;
      detail = 'Slope AC = ' + nf(slopeAC, 0, 3) + ', Slope BD = ' + nf(slopeBD, 0, 3) + ', Product = ' + nf(slopeAC * slopeBD, 0, 3);
    }
  }

  // Conclusion box
  if (verified) {
    fill('#C8E6C9');
    stroke('#43A047');
  } else {
    fill('#FFECB3');
    stroke('#FFA000');
  }
  strokeWeight(2);
  rect(x, y, leftPanelW + rightPanelW - x - 10, 50, 5);

  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  fill(verified ? '#2E7D32' : '#E65100');
  text((verified ? '\u2713 ' : '\u2717 ') + 'Property: ' + property, x + 8, y + 6);
  textStyle(NORMAL);
  textSize(9);
  fill('#424242');
  text(detail, x + 8, y + 22);
  fill(verified ? '#2E7D32' : '#E65100');
  textSize(10);
  textStyle(BOLD);
  text(verified ? 'VERIFIED - Property holds for this configuration!' : 'NOT VERIFIED - Move vertices to satisfy this property.', x + 8, y + 36);
  textStyle(NORMAL);
}

// ========================
// CONTROL BUTTONS (BOTTOM)
// ========================

function drawControlButtons() {
  let bx = leftPanelW + 10;
  let by = canvasHeight - 30;
  let bw = 85;
  let bh = 24;
  let gap = 6;

  // Reset button
  drawSmallButton(bx, by, bw, bh, 'Reset', '#757575');
  bx += bw + gap;

  // Random button
  drawSmallButton(bx, by, bw, bh, 'Random', '#FF9800');
  bx += bw + gap;

  // Snap toggle
  drawToggleButton(bx, by, bw + 20, bh, 'Snap: ' + (snapToGrid ? 'ON' : 'OFF'), snapToGrid, '#43A047');
  bx += bw + 20 + gap;

  // Show diagonals toggle (only for 4-vertex shapes)
  if (vertices.length === 4) {
    drawToggleButton(bx, by, bw + 20, bh, 'Diag: ' + (showDiagonals ? 'ON' : 'OFF'), showDiagonals, '#1976D2');
  }
}

function drawSmallButton(x, y, w, h, label, col) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  fill(isHover ? col : '#ECEFF1');
  stroke(col);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  fill(isHover ? '#FFFFFF' : col);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

function drawToggleButton(x, y, w, h, label, active, col) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  fill(active ? col : '#ECEFF1');
  stroke(col);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  fill(active ? '#FFFFFF' : '#757575');
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

// ========================
// INTERACTION
// ========================

function mousePressed() {
  // Check dropdown first
  if (dropdownOpen) {
    let rx = leftPanelW + 10;
    let ry = 68;
    let rw = rightPanelW - 20;
    let itemH = 28;

    for (let i = 0; i < figureTypes.length; i++) {
      let iy = ry + i * itemH;
      if (mouseX >= rx && mouseX <= rx + rw && mouseY >= iy && mouseY <= iy + itemH) {
        loadFigure(i);
        dropdownOpen = false;
        return;
      }
    }
    dropdownOpen = false;
    return;
  }

  // Check dropdown button
  let rx = leftPanelW + 10;
  let rw = rightPanelW - 20;
  if (mouseX >= rx && mouseX <= rx + rw && mouseY >= 38 && mouseY <= 68) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check "Suggest Optimal Placement" button
  if (mouseX >= rx && mouseX <= rx + rw && mouseY >= 78 && mouseY <= 106) {
    suggestOptimalPlacement();
    return;
  }

  // Check formula tabs
  let tabY = 116;
  let tabW = rw / 3;
  if (mouseY >= tabY && mouseY <= tabY + 28) {
    for (let i = 0; i < 3; i++) {
      let tx = rx + i * tabW;
      if (mouseX >= tx && mouseX <= tx + tabW) {
        activeFormulaTab = i;
        return;
      }
    }
  }

  // Check control buttons at bottom
  let bx = leftPanelW + 10;
  let by = canvasHeight - 30;
  let bw = 85;
  let bh = 24;
  let gap = 6;

  // Reset button
  if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
    loadFigure(currentFigureIndex);
    return;
  }
  bx += bw + gap;

  // Random button
  if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
    randomPlacement();
    return;
  }
  bx += bw + gap;

  // Snap toggle
  if (mouseX >= bx && mouseX <= bx + bw + 20 && mouseY >= by && mouseY <= by + bh) {
    snapToGrid = !snapToGrid;
    return;
  }
  bx += bw + 20 + gap;

  // Diagonals toggle
  if (vertices.length === 4 && mouseX >= bx && mouseX <= bx + bw + 20 && mouseY >= by && mouseY <= by + bh) {
    showDiagonals = !showDiagonals;
    return;
  }

  // Check vertex dragging
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    let px = gridOriginX + v.x * gridSize;
    let py = gridOriginY - v.y * gridSize;
    if (dist(mouseX, mouseY, px, py) < 15) {
      draggingVertex = i;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingVertex >= 0) {
    let newX = (mouseX - gridOriginX) / gridSize;
    let newY = (gridOriginY - mouseY) / gridSize;

    newX = constrain(newX, 0, gridMaxX - 1);
    newY = constrain(newY, 0, gridMaxY - 1);

    if (snapToGrid) {
      newX = round(newX);
      newY = round(newY);
    }

    vertices[draggingVertex].x = newX;
    vertices[draggingVertex].y = newY;
  }
}

function mouseReleased() {
  draggingVertex = -1;
}

function suggestOptimalPlacement() {
  let figName = figureTypes[currentFigureIndex];
  let optimal = optimalPlacements[figName];
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].x = optimal[i].x;
    vertices[i].y = optimal[i].y;
  }
}

function randomPlacement() {
  let n = vertices.length;
  if (n === 4) {
    // Generate a random quadrilateral roughly shaped correctly
    let cx = floor(random(2, 5));
    let cy = floor(random(2, 5));
    let hw = floor(random(1, 4));
    let hh = floor(random(1, 3));

    let figName = figureTypes[currentFigureIndex];
    if (figName === 'Rectangle') {
      vertices[0].x = cx - hw; vertices[0].y = cy - hh;
      vertices[1].x = cx + hw; vertices[1].y = cy - hh;
      vertices[2].x = cx + hw; vertices[2].y = cy + hh;
      vertices[3].x = cx - hw; vertices[3].y = cy + hh;
    } else if (figName === 'Parallelogram') {
      let skew = floor(random(1, 3));
      vertices[0].x = cx - hw; vertices[0].y = cy - hh;
      vertices[1].x = cx + hw; vertices[1].y = cy - hh;
      vertices[2].x = cx + hw + skew; vertices[2].y = cy + hh;
      vertices[3].x = cx - hw + skew; vertices[3].y = cy + hh;
    } else if (figName === 'Rhombus') {
      vertices[0].x = cx; vertices[0].y = cy - hh;
      vertices[1].x = cx + hw; vertices[1].y = cy;
      vertices[2].x = cx; vertices[2].y = cy + hh;
      vertices[3].x = cx - hw; vertices[3].y = cy;
    }
  } else {
    // Triangle
    for (let i = 0; i < n; i++) {
      vertices[i].x = floor(random(0, 8));
      vertices[i].y = floor(random(0, 7));
    }
  }
  // Clamp all vertices
  for (let i = 0; i < n; i++) {
    vertices[i].x = constrain(vertices[i].x, 0, gridMaxX - 1);
    vertices[i].y = constrain(vertices[i].y, 0, gridMaxY - 1);
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
    canvasWidth = max(canvasWidth, 800);
    leftPanelW = floor(canvasWidth * 0.555);
    rightPanelW = canvasWidth - leftPanelW;
  }
}
