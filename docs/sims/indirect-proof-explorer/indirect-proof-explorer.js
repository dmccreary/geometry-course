// Indirect Proof Explorer
// Step through the stages of proof by contradiction

let canvasWidth = 850;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let currentStage = 0;
let maxStages = 4;
let selectedProof = 0;

let proofs = [
  {
    title: "Two lines intersect at exactly one point",
    assumption: "Assume: Two lines l and m intersect at MORE THAN ONE point (call them P and Q)",
    consequences: [
      "Lines l and m both pass through points P and Q",
      "Two distinct points P and Q exist on both lines"
    ],
    contradiction: {
      postulate: "Through any two points, there exists exactly ONE line",
      conflict: "We have TWO different lines through P and Q"
    },
    conclusion: "Two lines intersect at EXACTLY ONE point"
  },
  {
    title: "If a triangle has two congruent sides, then base angles are congruent",
    assumption: "Assume: Triangle ABC has AB ≅ AC but ∠B ≇ ∠C",
    consequences: [
      "Reflect triangle across the altitude from A",
      "The reflection maps B to C and C to B",
      "This creates a congruence ABC ≅ ACB"
    ],
    contradiction: {
      postulate: "Congruent triangles have congruent corresponding angles",
      conflict: "∠B ≅ ∠C from the congruence, contradicting our assumption"
    },
    conclusion: "If AB ≅ AC, then ∠B ≅ ∠C"
  },
  {
    title: "If two parallel lines are cut by a transversal, alternate interior angles are congruent",
    assumption: "Assume: Lines l ∥ m with transversal t, but ∠1 ≇ ∠2 (alternate interior)",
    consequences: [
      "Draw line through the vertex of ∠1 making ∠3 ≅ ∠2",
      "By converse of alternate interior angles, this new line is parallel to m",
      "Now we have two lines through same point, both parallel to m"
    ],
    contradiction: {
      postulate: "Through a point not on a line, exactly ONE parallel can be drawn",
      conflict: "We constructed TWO parallels to m through the same point"
    },
    conclusion: "Alternate interior angles ARE congruent"
  }
];

let nextButton, prevButton, resetButton;
let proofSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create controls
  let btnY = drawHeight + 25;

  proofSelect = createSelect();
  proofSelect.position(20, btnY);
  proofSelect.option('Lines intersect at one point', 0);
  proofSelect.option('Isosceles triangle base angles', 1);
  proofSelect.option('Parallel lines alternate angles', 2);
  proofSelect.changed(changeProof);

  prevButton = createButton('◀ Prev Stage');
  prevButton.position(canvasWidth / 2 - 100, btnY);
  prevButton.mousePressed(prevStage);

  nextButton = createButton('Next Stage ▶');
  nextButton.position(canvasWidth / 2 + 10, btnY);
  nextButton.mousePressed(nextStage);

  resetButton = createButton('Reset');
  resetButton.position(canvasWidth / 2 + 120, btnY);
  resetButton.mousePressed(resetStages);

  describe('Interactive exploration of indirect proof (proof by contradiction)', LABEL);
}

function draw() {
  updateCanvasSize();

  background('#FAFAFA');

  // Control area
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Indirect Proof Explorer', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Subtitle - prove statement
  fill('#424242');
  textSize(14);
  text('Prove: ' + proofs[selectedProof].title, canvasWidth / 2, 36);

  // Draw the four stages
  drawStages();

  // Progress
  fill('#424242');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(`Stage ${currentStage}/${maxStages}`, canvasWidth / 2, drawHeight + 60);
}

function drawStages() {
  let stageW = (canvasWidth - 100) / 4;
  let stageH = 380;
  let stageY = 65;
  let gap = 15;

  let stages = [
    { title: "1. ASSUME OPPOSITE", color: "#FFCDD2", border: "#D32F2F", icon: "⚠️" },
    { title: "2. DERIVE CONSEQUENCES", color: "#FFE0B2", border: "#F57C00", icon: "🔗" },
    { title: "3. FIND CONTRADICTION", color: "#FFF9C4", border: "#FBC02D", icon: "💥" },
    { title: "4. CONCLUDE TRUTH", color: "#C8E6C9", border: "#43A047", icon: "✓" }
  ];

  let proof = proofs[selectedProof];

  for (let i = 0; i < 4; i++) {
    let stageX = 20 + i * (stageW + gap);
    let isActive = (i + 1) <= currentStage;
    let isCurrent = (i + 1) === currentStage;

    // Background
    if (isActive) {
      if (isCurrent) {
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = stages[i].border;
      }
      fill(stages[i].color);
      stroke(stages[i].border);
      strokeWeight(isCurrent ? 3 : 2);
    } else {
      fill('#E0E0E0');
      stroke('#BDBDBD');
      strokeWeight(1);
    }
    rect(stageX, stageY, stageW, stageH, 10);
    drawingContext.shadowBlur = 0;

    // Title
    noStroke();
    textAlign(CENTER, TOP);
    if (isActive) {
      fill(stages[i].border);
    } else {
      fill('#9E9E9E');
    }
    textSize(11);
    textStyle(BOLD);
    text(stages[i].title, stageX + stageW / 2, stageY + 10);
    textStyle(NORMAL);

    // Icon
    textSize(28);
    text(stages[i].icon, stageX + stageW / 2, stageY + 30);

    // Content (only if active)
    if (isActive) {
      fill('#212121');
      textSize(10);
      textAlign(LEFT, TOP);
      let contentY = stageY + 70;
      let contentX = stageX + 10;
      let contentW = stageW - 20;

      if (i === 0) {
        // Assumption
        fill('#C62828');
        textStyle(BOLD);
        text('Assume the opposite:', contentX, contentY);
        textStyle(NORMAL);
        fill('#212121');
        contentY += 18;
        text(wrapText(proof.assumption, contentW), contentX, contentY);
      } else if (i === 1) {
        // Consequences
        fill('#E65100');
        textStyle(BOLD);
        text('This leads to:', contentX, contentY);
        textStyle(NORMAL);
        fill('#212121');
        contentY += 18;
        for (let cons of proof.consequences) {
          text('• ' + wrapText(cons, contentW - 10), contentX, contentY);
          contentY += 45;
        }
      } else if (i === 2) {
        // Contradiction
        fill('#F9A825');
        textStyle(BOLD);
        text('Known truth:', contentX, contentY);
        textStyle(NORMAL);
        fill('#212121');
        contentY += 18;
        text(wrapText('"' + proof.contradiction.postulate + '"', contentW), contentX, contentY);
        contentY += 60;

        fill('#C62828');
        textStyle(BOLD);
        text('BUT our reasoning says:', contentX, contentY);
        textStyle(NORMAL);
        fill('#212121');
        contentY += 18;
        text(wrapText('"' + proof.contradiction.conflict + '"', contentW), contentX, contentY);

        contentY += 60;
        fill('#C62828');
        textSize(14);
        textAlign(CENTER, TOP);
        textStyle(BOLD);
        text('CONTRADICTION!', stageX + stageW / 2, contentY);
        textStyle(NORMAL);
      } else if (i === 3) {
        // Conclusion
        fill('#2E7D32');
        textStyle(BOLD);
        text('Our assumption was FALSE', contentX, contentY);
        textStyle(NORMAL);
        contentY += 25;

        fill('#212121');
        text('Therefore, the opposite is TRUE:', contentX, contentY);
        contentY += 25;

        fill('#1B5E20');
        textStyle(BOLD);
        textSize(11);
        text(wrapText(proof.conclusion, contentW), contentX, contentY);
        textStyle(NORMAL);

        contentY += 80;
        textAlign(CENTER, TOP);
        textSize(36);
        fill('#43A047');
        text('✓', stageX + stageW / 2, contentY);
      }
    }

    // Arrow between stages
    if (i < 3 && isActive && (i + 2) <= currentStage) {
      let arrowX = stageX + stageW + gap / 2;
      let arrowY = stageY + stageH / 2;
      fill('#546E7A');
      noStroke();
      triangle(arrowX + 5, arrowY, arrowX - 5, arrowY - 6, arrowX - 5, arrowY + 6);
    }
  }
}

function wrapText(txt, maxW) {
  // Simple text wrapper for display
  return txt; // p5 text() handles wrapping with textLeading
}

function nextStage() {
  if (currentStage < maxStages) {
    currentStage++;
  }
}

function prevStage() {
  if (currentStage > 0) {
    currentStage--;
  }
}

function resetStages() {
  currentStage = 0;
}

function changeProof() {
  selectedProof = parseInt(proofSelect.value());
  currentStage = 0;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let btnY = drawHeight + 25;
  proofSelect.position(20, btnY);
  prevButton.position(canvasWidth / 2 - 100, btnY);
  nextButton.position(canvasWidth / 2 + 10, btnY);
  resetButton.position(canvasWidth / 2 + 120, btnY);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 950);
    canvasWidth = max(canvasWidth, 750);
  }
}
