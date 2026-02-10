// Indirect Proof Explorer (Contradiction Finder)
// Step through the four stages of proof by contradiction
// Canvas-based controls only (no p5.js DOM elements)

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;

// State
let currentStage = 0; // 0 = none shown, 1-4 = stages revealed
let selectedProof = 0;
let autoPlaying = false;
let autoPlayTimer = 0;
let animSpeed = 2; // seconds per stage (1-5 range)

// Animation
let stageAnimProgress = [0, 0, 0, 0]; // 0 to 1 for each stage slide-in
let lightningFlash = 0; // pulsing glow on lightning bolt

// Dropdown state
let dropdownOpen = false;

// Proof data (5 problems)
let proofs = [
  {
    title: "Two lines intersect at exactly one point",
    assumption: "Assume: Two lines l and m\nintersect at MORE THAN\nONE point (call them P and Q)",
    consequences: [
      "Lines l and m both pass\nthrough points P and Q",
      "Two distinct points P and Q\nexist on both lines"
    ],
    contradictLeft: "Postulate: Exactly ONE line\nthrough any two points",
    contradictRight: "Our consequence: TWO lines\nthrough points P and Q",
    conclusion: "Two lines intersect at\nEXACTLY ONE point"
  },
  {
    title: "A triangle cannot have two right angles",
    assumption: "Assume: Triangle ABC has\nTWO right angles,\nsay angle A = 90 and angle B = 90",
    consequences: [
      "m(angle A) + m(angle B) = 180",
      "Triangle angle sum:\nm(A) + m(B) + m(C) = 180\nSo m(C) = 0"
    ],
    contradictLeft: "Definition: An angle of a\ntriangle must be > 0",
    contradictRight: "Our consequence:\nangle C = 0 degrees",
    conclusion: "A triangle CANNOT have\ntwo right angles"
  },
  {
    title: "If two parallel lines are cut by a transversal, alternate interior angles are congruent",
    assumption: "Assume: Lines l || m with\ntransversal t, but angle 1\nis NOT congruent to angle 2",
    consequences: [
      "Draw line through vertex of\nangle 1 making angle 3 = angle 2",
      "By converse of alt. int. angles,\nthis new line is parallel to m",
      "Two lines through same point\nare both parallel to m"
    ],
    contradictLeft: "Parallel Postulate: Through\na point not on a line,\nexactly ONE parallel exists",
    contradictRight: "Our consequence: TWO\nparallels to line m through\nthe same point",
    conclusion: "Alternate interior angles\nARE congruent"
  },
  {
    title: "The square root of 2 is irrational",
    assumption: "Assume: sqrt(2) is rational,\nso sqrt(2) = a/b where\na/b is in lowest terms",
    consequences: [
      "Squaring: 2 = a^2 / b^2\nso a^2 = 2b^2",
      "a^2 is even, so a is even.\nLet a = 2k, then 4k^2 = 2b^2\nso b^2 = 2k^2, meaning b is even"
    ],
    contradictLeft: "Our assumption: a/b is\nin LOWEST TERMS\n(a and b share no common factor)",
    contradictRight: "Our consequence: Both a\nand b are EVEN\n(they share factor 2)",
    conclusion: "The square root of 2\nis IRRATIONAL"
  },
  {
    title: "There are infinitely many prime numbers",
    assumption: "Assume: There are FINITELY\nmany primes. List them all:\np1, p2, p3, ..., pn",
    consequences: [
      "Compute N = (p1 x p2 x ... x pn) + 1",
      "N is not divisible by any\nprime in our list\n(always leaves remainder 1)"
    ],
    contradictLeft: "Our assumption: We listed\nALL prime numbers",
    contradictRight: "Our consequence: N is either\na NEW prime or has a prime\nfactor NOT in our list",
    conclusion: "There are INFINITELY\nmany prime numbers"
  }
];

// Button definitions (computed in draw based on current canvasWidth)
let buttons = [];
let dropdownRect = {};
let speedSliderRect = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  describe('Interactive exploration of indirect proof (proof by contradiction) with four stages: assume opposite, derive consequences, find contradiction, and conclude truth', LABEL);
}

function draw() {
  updateCanvasSize();
  background('#FAFAFA');

  // Draw main content area border
  stroke('silver');
  strokeWeight(1);
  fill('#FAFAFA');
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('#1565C0');
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Indirect Proof Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Problem statement
  fill('#424242');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Prove: ' + proofs[selectedProof].title, canvasWidth / 2, 38);

  // Draw the four stages
  drawStages();

  // Draw controls
  drawControls();

  // Auto-play logic
  if (autoPlaying) {
    autoPlayTimer += deltaTime / 1000;
    if (autoPlayTimer >= animSpeed) {
      autoPlayTimer = 0;
      if (currentStage < 4) {
        currentStage++;
      } else {
        autoPlaying = false;
      }
    }
  }

  // Update animation progress for each stage
  for (let i = 0; i < 4; i++) {
    if ((i + 1) <= currentStage) {
      stageAnimProgress[i] = min(stageAnimProgress[i] + 0.08, 1);
    } else {
      stageAnimProgress[i] = max(stageAnimProgress[i] - 0.08, 0);
    }
  }

  // Lightning flash animation
  lightningFlash += 0.06;

  // Draw dropdown overlay last (on top of everything)
  if (dropdownOpen) {
    drawDropdownMenu();
  }
}

function drawStages() {
  let proof = proofs[selectedProof];
  let gap = 12;
  let stageW = (canvasWidth - 40 - gap * 3) / 4;
  let stageH = 380;
  let stageY = 62;
  let startX = 20;

  let stageData = [
    { title: "1. ASSUME OPPOSITE", color: "#FFCDD2", border: "#D32F2F", textColor: "#C62828" },
    { title: "2. DERIVE CONSEQUENCES", color: "#FFE0B2", border: "#F57C00", textColor: "#E65100" },
    { title: "3. FIND CONTRADICTION", color: "#FFF9C4", border: "#FBC02D", textColor: "#F9A825" },
    { title: "4. CONCLUDE TRUTH", color: "#C8E6C9", border: "#43A047", textColor: "#2E7D32" }
  ];

  for (let i = 0; i < 4; i++) {
    let progress = stageAnimProgress[i];
    if (progress <= 0) continue;

    let baseX = startX + i * (stageW + gap);
    // Slide in from the right
    let offsetX = (1 - easeOutCubic(progress)) * 60;
    let stageX = baseX + offsetX;
    let alpha = progress * 255;

    push();

    // Glow effect on current stage
    let isCurrent = (i + 1) === currentStage;
    if (isCurrent && progress >= 1) {
      drawingContext.shadowBlur = 12;
      drawingContext.shadowColor = stageData[i].border;
    }

    // Stage background
    fill(red(color(stageData[i].color)), green(color(stageData[i].color)), blue(color(stageData[i].color)), alpha);
    stroke(red(color(stageData[i].border)), green(color(stageData[i].border)), blue(color(stageData[i].border)), alpha);
    strokeWeight(isCurrent ? 3 : 2);
    rect(stageX, stageY, stageW, stageH, 10);
    drawingContext.shadowBlur = 0;

    // Stage title
    noStroke();
    fill(red(color(stageData[i].textColor)), green(color(stageData[i].textColor)), blue(color(stageData[i].textColor)), alpha);
    textSize(constrain(stageW * 0.065, 9, 12));
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(stageData[i].title, stageX + stageW / 2, stageY + 10);
    textStyle(NORMAL);

    // Stage content
    let contentX = stageX + 10;
    let contentW = stageW - 20;
    let contentY = stageY + 38;
    let fontSize = constrain(stageW * 0.06, 9, 12);

    fill(0, 0, 0, alpha);
    textSize(fontSize);
    textAlign(LEFT, TOP);

    if (i === 0) {
      // ASSUME OPPOSITE
      fill(red(color('#C62828')), green(color('#C62828')), blue(color('#C62828')), alpha);
      textStyle(BOLD);
      text('Assume the opposite:', contentX, contentY);
      textStyle(NORMAL);
      contentY += 20;
      fill(0, 0, 0, alpha);
      text(proof.assumption, contentX, contentY, contentW, 200);

      // Warning icon
      contentY += 120;
      textSize(24);
      textAlign(CENTER, TOP);
      fill(red(color('#D32F2F')), green(color('#D32F2F')), blue(color('#D32F2F')), alpha);
      text('!', stageX + stageW / 2, contentY);

      // Status label
      contentY += 35;
      textSize(fontSize - 1);
      fill(red(color('#C62828')), green(color('#C62828')), blue(color('#C62828')), alpha);
      text('Assumption made', stageX + stageW / 2, contentY);

    } else if (i === 1) {
      // DERIVE CONSEQUENCES
      fill(red(color('#E65100')), green(color('#E65100')), blue(color('#E65100')), alpha);
      textStyle(BOLD);
      text('This leads to:', contentX, contentY);
      textStyle(NORMAL);
      contentY += 20;
      fill(0, 0, 0, alpha);
      for (let j = 0; j < proof.consequences.length; j++) {
        let bullet = (j + 1) + '. ';
        text(bullet + proof.consequences[j], contentX, contentY, contentW, 120);
        contentY += 70;
      }

      // Chain icon
      textSize(20);
      textAlign(CENTER, TOP);
      fill(red(color('#F57C00')), green(color('#F57C00')), blue(color('#F57C00')), alpha);
      let iconY = stageY + stageH - 60;
      text('>>>', stageX + stageW / 2, iconY);

    } else if (i === 2) {
      // FIND CONTRADICTION
      fill(red(color('#F9A825')), green(color('#F9A825')), blue(color('#F9A825')), alpha);
      textStyle(BOLD);
      text('Known truth:', contentX, contentY);
      textStyle(NORMAL);
      contentY += 18;

      // Left side - known postulate
      fill(0, 0, 0, alpha);
      textSize(fontSize - 1);

      // Draw postulate box
      let boxH = 80;
      fill(red(color('#E8F5E9')), green(color('#E8F5E9')), blue(color('#E8F5E9')), alpha * 0.8);
      stroke(red(color('#66BB6A')), green(color('#66BB6A')), blue(color('#66BB6A')), alpha * 0.6);
      strokeWeight(1);
      rect(contentX, contentY, contentW, boxH, 5);
      noStroke();
      fill(0, 0, 0, alpha);
      textAlign(LEFT, TOP);
      text(proof.contradictLeft, contentX + 5, contentY + 5, contentW - 10, boxH - 10);

      contentY += boxH + 8;

      // Lightning bolt between contradictions
      textAlign(CENTER, TOP);
      let flashAlpha = alpha * (0.6 + 0.4 * sin(lightningFlash * TWO_PI));
      fill(red(color('#FF6F00')), green(color('#FF6F00')), blue(color('#FF6F00')), flashAlpha);
      textSize(28);
      textStyle(BOLD);
      text('< ! >', stageX + stageW / 2, contentY);
      textStyle(NORMAL);

      // Draw pulsing glow around lightning
      if (progress >= 1) {
        let glowSize = 30 + 5 * sin(lightningFlash * TWO_PI);
        noFill();
        stroke(255, 152, 0, flashAlpha * 0.4);
        strokeWeight(2);
        ellipse(stageX + stageW / 2, contentY + 14, glowSize * 2, glowSize);
        noStroke();
      }

      contentY += 35;

      // Draw conflict box
      fill(red(color('#FFEBEE')), green(color('#FFEBEE')), blue(color('#FFEBEE')), alpha * 0.8);
      stroke(red(color('#EF5350')), green(color('#EF5350')), blue(color('#EF5350')), alpha * 0.6);
      strokeWeight(1);
      rect(contentX, contentY, contentW, boxH, 5);
      noStroke();

      fill(red(color('#C62828')), green(color('#C62828')), blue(color('#C62828')), alpha);
      textSize(fontSize - 1);
      textAlign(LEFT, TOP);
      text(proof.contradictRight, contentX + 5, contentY + 5, contentW - 10, boxH - 10);

      // CONTRADICTION label
      contentY += boxH + 12;
      fill(red(color('#C62828')), green(color('#C62828')), blue(color('#C62828')), alpha);
      textSize(constrain(stageW * 0.07, 10, 14));
      textAlign(CENTER, TOP);
      textStyle(BOLD);
      text('CONTRADICTION!', stageX + stageW / 2, contentY);
      textStyle(NORMAL);

    } else if (i === 3) {
      // CONCLUDE TRUTH
      fill(red(color('#2E7D32')), green(color('#2E7D32')), blue(color('#2E7D32')), alpha);
      textStyle(BOLD);
      text('Our assumption was FALSE', contentX, contentY);
      textStyle(NORMAL);
      contentY += 25;

      fill(0, 0, 0, alpha);
      text('Therefore, the original\nstatement is TRUE:', contentX, contentY, contentW, 50);
      contentY += 50;

      // Conclusion in green bold
      fill(red(color('#1B5E20')), green(color('#1B5E20')), blue(color('#1B5E20')), alpha);
      textStyle(BOLD);
      textSize(fontSize + 1);
      text(proof.conclusion, contentX, contentY, contentW, 100);
      textStyle(NORMAL);

      // Checkmark
      contentY += 100;
      textSize(40);
      textAlign(CENTER, TOP);
      fill(red(color('#43A047')), green(color('#43A047')), blue(color('#43A047')), alpha);
      text('OK', stageX + stageW / 2, contentY);
    }

    pop();

    // Draw arrow between stages
    if (i < 3 && stageAnimProgress[i] >= 0.8 && stageAnimProgress[i + 1] > 0.1) {
      let arrowX = baseX + stageW + gap / 2;
      let arrowY = stageY + stageH / 2;
      fill('#546E7A');
      noStroke();
      triangle(arrowX + 4, arrowY, arrowX - 4, arrowY - 5, arrowX - 4, arrowY + 5);
    }
  }

  // Instruction text when no stages shown
  if (currentStage === 0) {
    fill('#9E9E9E');
    textSize(16);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Click "Step Forward" to begin the proof', canvasWidth / 2, stageY + stageH / 2);
  }

  // Progress indicator
  noStroke();
  fill('#546E7A');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Stage ' + currentStage + ' of 4', canvasWidth / 2, stageY + stageH + 5);
}

function drawControls() {
  // --- Row 1: Buttons ---
  let btnY = drawHeight + 15;
  let btnH = 32;

  // Compute button positions
  let stepBackW = 90;
  let stepFwdW = 105;
  let restartW = 70;
  let autoPlayW = 85;

  let totalBtnW = stepBackW + stepFwdW + restartW + autoPlayW + 30; // 30 for gaps
  let btnStartX = (canvasWidth - totalBtnW) / 2;

  buttons = [];

  // Step Back button
  let sbx = btnStartX;
  buttons.push({ id: 'stepBack', x: sbx, y: btnY, w: stepBackW, h: btnH, label: 'Step Back' });
  drawButton(sbx, btnY, stepBackW, btnH, 'Step Back', currentStage > 0);

  // Step Forward button
  let sfx = sbx + stepBackW + 10;
  buttons.push({ id: 'stepForward', x: sfx, y: btnY, w: stepFwdW, h: btnH, label: 'Step Forward' });
  drawButton(sfx, btnY, stepFwdW, btnH, 'Step Forward', currentStage < 4);

  // Restart button
  let rx = sfx + stepFwdW + 10;
  buttons.push({ id: 'restart', x: rx, y: btnY, w: restartW, h: btnH, label: 'Restart' });
  drawButton(rx, btnY, restartW, btnH, 'Restart', true);

  // Auto-Play button
  let apx = rx + restartW + 10;
  let apLabel = autoPlaying ? 'Pause' : 'Auto-Play';
  buttons.push({ id: 'autoPlay', x: apx, y: btnY, w: autoPlayW, h: btnH, label: apLabel });
  drawButton(apx, btnY, autoPlayW, btnH, apLabel, true, autoPlaying);

  // --- Row 2: Dropdown + Speed Slider ---
  let row2Y = drawHeight + 58;

  // Dropdown for proof selection
  let ddW = 320;
  let ddX = 20;
  let ddH = 28;
  dropdownRect = { x: ddX, y: row2Y, w: ddW, h: ddH };

  // Draw dropdown
  fill(dropdownOpen ? '#E3F2FD' : '#FFFFFF');
  stroke('#90A4AE');
  strokeWeight(1);
  rect(ddX, row2Y, ddW, ddH, 4);
  noStroke();
  fill('#212121');
  textSize(11);
  textAlign(LEFT, CENTER);
  let displayText = (selectedProof + 1) + '. ' + proofs[selectedProof].title;
  if (textWidth(displayText) > ddW - 30) {
    // Truncate
    while (textWidth(displayText + '...') > ddW - 30 && displayText.length > 0) {
      displayText = displayText.substring(0, displayText.length - 1);
    }
    displayText += '...';
  }
  text(displayText, ddX + 8, row2Y + ddH / 2);

  // Dropdown arrow
  fill('#546E7A');
  let arrowCX = ddX + ddW - 15;
  let arrowCY = row2Y + ddH / 2;
  if (dropdownOpen) {
    triangle(arrowCX - 5, arrowCY + 2, arrowCX + 5, arrowCY + 2, arrowCX, arrowCY - 4);
  } else {
    triangle(arrowCX - 5, arrowCY - 2, arrowCX + 5, arrowCY - 2, arrowCX, arrowCY + 4);
  }

  // Label for dropdown
  noStroke();
  fill('#546E7A');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('Select proof problem:', ddX, row2Y - 3);

  // --- Speed Slider ---
  let sliderLabelX = ddX + ddW + 30;
  let sliderX = sliderLabelX + 80;
  let sliderW = canvasWidth - sliderX - 30;
  let sliderY = row2Y + ddH / 2;

  // Label
  noStroke();
  fill('#546E7A');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Speed: ' + animSpeed.toFixed(1) + 's', sliderLabelX, sliderY);

  // Slider track
  speedSliderRect = { x: sliderX, y: sliderY - 4, w: sliderW, h: 8 };
  fill('#CFD8DC');
  noStroke();
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Slider filled portion
  let sliderFrac = (animSpeed - 0.5) / (5 - 0.5);
  fill('#1976D2');
  rect(sliderX, sliderY - 4, sliderW * sliderFrac, 8, 4);

  // Slider handle
  let handleX = sliderX + sliderW * sliderFrac;
  fill('#1565C0');
  stroke('#0D47A1');
  strokeWeight(1);
  ellipse(handleX, sliderY, 16, 16);
  noStroke();

  // --- Row 3: Status info ---
  let row3Y = drawHeight + 100;
  noStroke();
  fill('#78909C');
  textSize(11);
  textAlign(CENTER, TOP);
  if (autoPlaying) {
    text('Auto-playing... (click Pause to stop)', canvasWidth / 2, row3Y);
  } else if (currentStage === 0) {
    text('Step through the proof to see how contradiction proves the statement', canvasWidth / 2, row3Y);
  } else if (currentStage === 4) {
    text('Proof complete! The original statement is true by contradiction.', canvasWidth / 2, row3Y);
  } else {
    text('Continue stepping forward to reveal the next stage', canvasWidth / 2, row3Y);
  }
}

function drawButton(x, y, w, h, label, enabled, active) {
  if (active) {
    fill('#1565C0');
    stroke('#0D47A1');
  } else if (enabled) {
    fill('#FFFFFF');
    stroke('#90A4AE');
  } else {
    fill('#E0E0E0');
    stroke('#BDBDBD');
  }
  strokeWeight(1);
  rect(x, y, w, h, 5);
  noStroke();

  if (active) {
    fill('#FFFFFF');
  } else if (enabled) {
    fill('#37474F');
  } else {
    fill('#9E9E9E');
  }
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

function drawDropdownMenu() {
  let ddX = dropdownRect.x;
  let ddY = dropdownRect.y + dropdownRect.h;
  let ddW = dropdownRect.w;
  let itemH = 28;
  let menuH = proofs.length * itemH;

  // Shadow
  drawingContext.shadowBlur = 8;
  drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
  drawingContext.shadowOffsetY = 2;

  fill('#FFFFFF');
  stroke('#B0BEC5');
  strokeWeight(1);
  rect(ddX, ddY, ddW, menuH, 0, 0, 4, 4);
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  for (let i = 0; i < proofs.length; i++) {
    let itemY = ddY + i * itemH;
    let isHovered = mouseX >= ddX && mouseX <= ddX + ddW && mouseY >= itemY && mouseY < itemY + itemH;

    if (i === selectedProof) {
      fill('#E3F2FD');
    } else if (isHovered) {
      fill('#F5F5F5');
    } else {
      fill('#FFFFFF');
    }
    noStroke();
    rect(ddX, itemY, ddW, itemH);

    // Separator
    if (i > 0) {
      stroke('#ECEFF1');
      strokeWeight(1);
      line(ddX + 5, itemY, ddX + ddW - 5, itemY);
      noStroke();
    }

    fill(i === selectedProof ? '#1565C0' : '#212121');
    textSize(11);
    textAlign(LEFT, CENTER);
    let itemText = (i + 1) + '. ' + proofs[i].title;
    if (textWidth(itemText) > ddW - 16) {
      while (textWidth(itemText + '...') > ddW - 16 && itemText.length > 0) {
        itemText = itemText.substring(0, itemText.length - 1);
      }
      itemText += '...';
    }
    text(itemText, ddX + 8, itemY + itemH / 2);
  }
}

function easeOutCubic(t) {
  return 1 - pow(1 - t, 3);
}

// --- Mouse interaction ---
let draggingSlider = false;

function mousePressed() {
  // Check dropdown menu first (if open)
  if (dropdownOpen) {
    let ddX = dropdownRect.x;
    let ddY = dropdownRect.y + dropdownRect.h;
    let ddW = dropdownRect.w;
    let itemH = 28;

    for (let i = 0; i < proofs.length; i++) {
      let itemY = ddY + i * itemH;
      if (mouseX >= ddX && mouseX <= ddX + ddW && mouseY >= itemY && mouseY < itemY + itemH) {
        selectedProof = i;
        currentStage = 0;
        autoPlaying = false;
        stageAnimProgress = [0, 0, 0, 0];
        dropdownOpen = false;
        return;
      }
    }
    // Click outside dropdown closes it
    dropdownOpen = false;
    return;
  }

  // Check dropdown toggle
  if (mouseX >= dropdownRect.x && mouseX <= dropdownRect.x + dropdownRect.w &&
      mouseY >= dropdownRect.y && mouseY <= dropdownRect.y + dropdownRect.h) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check speed slider
  let sr = speedSliderRect;
  if (mouseX >= sr.x - 10 && mouseX <= sr.x + sr.w + 10 &&
      mouseY >= sr.y - 10 && mouseY <= sr.y + sr.h + 10) {
    draggingSlider = true;
    updateSliderValue();
    return;
  }

  // Check buttons
  for (let btn of buttons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      handleButtonClick(btn.id);
      return;
    }
  }
}

function mouseDragged() {
  if (draggingSlider) {
    updateSliderValue();
  }
}

function mouseReleased() {
  draggingSlider = false;
}

function updateSliderValue() {
  let sr = speedSliderRect;
  let frac = constrain((mouseX - sr.x) / sr.w, 0, 1);
  animSpeed = 0.5 + frac * (5 - 0.5);
  animSpeed = round(animSpeed * 10) / 10; // snap to 0.1
}

function handleButtonClick(id) {
  if (id === 'stepForward') {
    if (currentStage < 4) {
      currentStage++;
      autoPlaying = false;
    }
  } else if (id === 'stepBack') {
    if (currentStage > 0) {
      currentStage--;
      autoPlaying = false;
    }
  } else if (id === 'restart') {
    currentStage = 0;
    autoPlaying = false;
    stageAnimProgress = [0, 0, 0, 0];
  } else if (id === 'autoPlay') {
    if (autoPlaying) {
      autoPlaying = false;
    } else {
      if (currentStage >= 4) {
        currentStage = 0;
        stageAnimProgress = [0, 0, 0, 0];
      }
      autoPlaying = true;
      autoPlayTimer = 0;
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
    canvasWidth = max(canvasWidth, 600);
  }
}
