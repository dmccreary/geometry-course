// Net to Solid Explorer
// CANVAS_HEIGHT: 530
// Bloom L2 and L4 (Understand, Analyze): students explain how a flat net becomes a solid and
// analyze which face of the net becomes which face of the solid. The student controls the fold
// with a slider, from a flat net (0%) to a closed solid (100%), instead of watching an
// animation. Clicking a face in the net highlights the same face on the folding solid.
//
// Each net is a tree of faces that starts at the base. Every other face is hinged to its
// parent along one shared edge and turns about that edge by its fold angle:
//   fold angle = 180 degrees - dihedral angle between the two faces.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;
let sliderLeftMargin = 130;
let defaultTextSize = 16;

const COLORS = ['lightskyblue', 'lightgreen', 'khaki', 'lightpink', 'plum', 'lightsalmon'];
const R3 = Math.sqrt(3), R5 = Math.sqrt(5);
const QUARTER = Math.PI / 2;                              // fold angle between perpendicular faces
const PYRAMID_FOLD = Math.PI - Math.atan2(2, 1);          // square pyramid: base side 2, height 2
const TETRA_FOLD = Math.PI - Math.acos(1 / 3);            // regular tetrahedron

// Faces are given flat, as [x, z] points in the plane of the base. parent is the index of the
// face this one is hinged to, and hinge is the shared edge.
const NETS = [
  { name: 'Cube', V: 8, E: 12, faces: [
    { label: 'Base', pts: [[0, 0], [2, 0], [2, 2], [0, 2]] },
    { label: 'Front', pts: [[0, -2], [2, -2], [2, 0], [0, 0]], parent: 0, hinge: [[0, 0], [2, 0]], angle: QUARTER },
    { label: 'Right', pts: [[2, 0], [4, 0], [4, 2], [2, 2]], parent: 0, hinge: [[2, 0], [2, 2]], angle: QUARTER },
    { label: 'Back', pts: [[0, 2], [2, 2], [2, 4], [0, 4]], parent: 0, hinge: [[0, 2], [2, 2]], angle: QUARTER },
    { label: 'Left', pts: [[-2, 0], [0, 0], [0, 2], [-2, 2]], parent: 0, hinge: [[0, 0], [0, 2]], angle: QUARTER },
    { label: 'Top', pts: [[0, 4], [2, 4], [2, 6], [0, 6]], parent: 3, hinge: [[0, 4], [2, 4]], angle: QUARTER }
  ] },
  { name: 'Rectangular Prism', V: 8, E: 12, faces: [
    { label: 'Base', pts: [[0, 0], [3, 0], [3, 2], [0, 2]] },
    { label: 'Front', pts: [[0, -1.5], [3, -1.5], [3, 0], [0, 0]], parent: 0, hinge: [[0, 0], [3, 0]], angle: QUARTER },
    { label: 'Right', pts: [[3, 0], [4.5, 0], [4.5, 2], [3, 2]], parent: 0, hinge: [[3, 0], [3, 2]], angle: QUARTER },
    { label: 'Back', pts: [[0, 2], [3, 2], [3, 3.5], [0, 3.5]], parent: 0, hinge: [[0, 2], [3, 2]], angle: QUARTER },
    { label: 'Left', pts: [[-1.5, 0], [0, 0], [0, 2], [-1.5, 2]], parent: 0, hinge: [[0, 0], [0, 2]], angle: QUARTER },
    { label: 'Top', pts: [[0, 3.5], [3, 3.5], [3, 5.5], [0, 5.5]], parent: 3, hinge: [[0, 3.5], [3, 3.5]], angle: QUARTER }
  ] },
  { name: 'Triangular Prism', V: 6, E: 9, faces: [
    { label: 'Base', pts: [[0, 0], [3, 0], [3, 2], [0, 2]] },
    { label: 'Side 1', pts: [[0, -2], [3, -2], [3, 0], [0, 0]], parent: 0, hinge: [[0, 0], [3, 0]], angle: 2 * Math.PI / 3 },
    { label: 'Side 2', pts: [[0, 2], [3, 2], [3, 4], [0, 4]], parent: 0, hinge: [[0, 2], [3, 2]], angle: 2 * Math.PI / 3 },
    { label: 'End 1', pts: [[0, 0], [0, 2], [-R3, 1]], parent: 0, hinge: [[0, 0], [0, 2]], angle: QUARTER },
    { label: 'End 2', pts: [[3, 0], [3 + R3, 1], [3, 2]], parent: 0, hinge: [[3, 0], [3, 2]], angle: QUARTER }
  ] },
  { name: 'Square Pyramid', V: 5, E: 8, faces: [
    { label: 'Base', pts: [[0, 0], [2, 0], [2, 2], [0, 2]] },
    { label: 'Side 1', pts: [[0, 0], [2, 0], [1, -R5]], parent: 0, hinge: [[0, 0], [2, 0]], angle: PYRAMID_FOLD },
    { label: 'Side 2', pts: [[2, 0], [2, 2], [2 + R5, 1]], parent: 0, hinge: [[2, 0], [2, 2]], angle: PYRAMID_FOLD },
    { label: 'Side 3', pts: [[2, 2], [0, 2], [1, 2 + R5]], parent: 0, hinge: [[2, 2], [0, 2]], angle: PYRAMID_FOLD },
    { label: 'Side 4', pts: [[0, 2], [0, 0], [-R5, 1]], parent: 0, hinge: [[0, 2], [0, 0]], angle: PYRAMID_FOLD }
  ] },
  { name: 'Triangular Pyramid', V: 4, E: 6, faces: [
    { label: 'Base', pts: [[0, 0], [2, 0], [1, R3]] },
    { label: 'Side 1', pts: [[0, 0], [2, 0], [1, -R3]], parent: 0, hinge: [[0, 0], [2, 0]], angle: TETRA_FOLD },
    { label: 'Side 2', pts: [[2, 0], [3, R3], [1, R3]], parent: 0, hinge: [[2, 0], [1, R3]], angle: TETRA_FOLD },
    { label: 'Side 3', pts: [[1, R3], [-1, R3], [0, 0]], parent: 0, hinge: [[1, R3], [0, 0]], angle: TETRA_FOLD }
  ] }
];

let solidSelect, foldSlider, rotateCheckbox;
let selectedFace = -1;
let netHits = [];             // screen polygons of the net faces, rebuilt every frame
let yaw = -0.65;              // rotation of the 3D view about the vertical axis
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);

  // work out which way each hinge must turn so that its face folds upward
  for (const net of NETS) {
    for (const f of net.faces) {
      f.sign = 1;
      if (f.parent === undefined) continue;
      const c = centroid(f.pts);
      const test = rotateAbout([c[0], 0, c[1]], f.hinge[0], f.hinge[1], 0.3);
      if (test[1] < 0) f.sign = -1;
    }
  }

  solidSelect = createSelect();
  solidSelect.parent(mainElement);
  for (const n of NETS) solidSelect.option(n.name);
  solidSelect.position(65, drawHeight + 10);
  solidSelect.changed(() => selectedFace = -1);

  rotateCheckbox = createCheckbox(' Auto-rotate', false);
  rotateCheckbox.parent(mainElement);
  rotateCheckbox.style('font-size', '16px');
  rotateCheckbox.position(240, drawHeight + 10);

  foldSlider = createSlider(0, 100, 35, 1);
  foldSlider.parent(mainElement);
  foldSlider.position(sliderLeftMargin, drawHeight + 44);
  foldSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('A flat net on the left and the same net folding into a solid on the right. A dropdown chooses a cube, rectangular prism, ' +
    'triangular prism, square pyramid, or triangular pyramid, and a slider folds the net from flat to closed. ' +
    'Clicking a face of the net highlights it on the solid. The numbers of faces, edges, and vertices are shown with Euler\'s formula.', LABEL);
}

function centroid(pts) {
  let x = 0, z = 0;
  for (const p of pts) { x += p[0]; z += p[1]; }
  return [x / pts.length, z / pts.length];
}

// Rotate the point p = [x, y, z] about the line through hinge points a and b (which lie in the
// plane y = 0) by the angle theta, using Rodrigues' rotation formula
function rotateAbout(p, a, b, theta) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const u = [(b[0] - a[0]) / len, 0, (b[1] - a[1]) / len];
  const v = [p[0] - a[0], p[1], p[2] - a[1]];
  const c = Math.cos(theta), s = Math.sin(theta);
  const cross = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  return [a[0] + v[0] * c + cross[0] * s + u[0] * dot * (1 - c),
    v[1] * c + cross[1] * s + u[1] * dot * (1 - c),
    a[1] + v[2] * c + cross[2] * s + u[2] * dot * (1 - c)];
}

// Position of one face when the net is folded by the fraction t (0 = flat, 1 = closed).
// The face turns about its own hinge first, then about each ancestor's hinge in turn.
function foldedFace(net, index, t) {
  return net.faces[index].pts.map(pt => {
    let p = [pt[0], 0, pt[1]];
    let f = net.faces[index];
    while (f.parent !== undefined) {
      p = rotateAbout(p, f.hinge[0], f.hinge[1], f.sign * f.angle * t);
      f = net.faces[f.parent];
    }
    return p;
  });
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const net = NETS[solidSelect.elt.selectedIndex];
  const t = foldSlider.value() / 100;
  const narrow = canvasWidth < 600;
  if (rotateCheckbox.checked() && mouseOverCanvas) yaw += 0.01;

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow ? 18 : 24);
  text('Net to Solid Explorer', canvasWidth / 2, 8);

  const half = (canvasWidth - 3 * margin) / 2;
  drawNetPanel(margin, 42, half, 308, net, narrow);
  drawSolidPanel(2 * margin + half, 42, half, 308, net, t, narrow);
  drawInfo(margin, 358, canvasWidth - 2 * margin, drawHeight - 366, net, narrow);

  // control labels
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Solid:', 10, drawHeight + 22);
  text('Fold: ' + foldSlider.value() + '%', 10, drawHeight + 55);
}

function panel(x, y, w, h, title, narrow) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(narrow ? 12 : 16);
  text(title, x + 10, y + 7);
  textStyle(NORMAL);
}

// The flat net seen from directly above
function drawNetPanel(x, y, w, h, net, narrow) {
  panel(x, y, w, h, 'Net (flat)', narrow);
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const f of net.faces) {
    for (const p of f.pts) {
      minX = min(minX, p[0]); maxX = max(maxX, p[0]);
      minZ = min(minZ, p[1]); maxZ = max(maxZ, p[1]);
    }
  }
  const s = min((w - 24) / (maxX - minX), (h - 50) / (maxZ - minZ));
  const cx = x + w / 2, cy = y + 30 + (h - 40) / 2;
  const toScreen = p => [cx + (p[0] - (minX + maxX) / 2) * s, cy - (p[1] - (minZ + maxZ) / 2) * s];

  netHits = [];
  let hover = -1;
  for (let i = 0; i < net.faces.length; i++) {
    const poly = net.faces[i].pts.map(toScreen);
    netHits.push(poly);
    if (insidePolygon(mouseX, mouseY, poly)) hover = i;
  }
  cursor(hover >= 0 ? HAND : ARROW);

  for (let i = 0; i < net.faces.length; i++) {
    const f = net.faces[i];
    fill(COLORS[i % COLORS.length]);
    stroke(i === selectedFace ? 'red' : 'dimgray');
    strokeWeight(i === selectedFace ? 4 : (i === hover ? 3 : 1.5));
    beginShape();
    for (const p of netHits[i]) vertex(p[0], p[1]);
    endShape(CLOSE);
  }
  // fold lines: every hinge is a dashed line
  stroke('dimgray');
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  for (const f of net.faces) {
    if (f.parent === undefined) continue;
    const a = toScreen(f.hinge[0]), b = toScreen(f.hinge[1]);
    line(a[0], a[1], b[0], b[1]);
  }
  drawingContext.setLineDash([]);
  // labels
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(narrow ? 10 : 14);
  for (const f of net.faces) {
    const c = toScreen(centroid(f.pts));
    text(f.label, c[0], c[1]);
  }
}

// The net folded by the fraction t, in a view from above and to the side
function drawSolidPanel(x, y, w, h, net, t, narrow) {
  panel(x, y, w, h, t >= 1 ? 'Solid (closed)' : (t <= 0 ? 'Net (ready to fold)' : 'Folding...'), narrow);
  const pitch = 0.62;
  const base = centroid(net.faces[0].pts);
  // fit the flat net, which is the widest the shape ever gets
  let reach = 0;
  for (const f of net.faces) for (const p of f.pts) reach = max(reach, Math.hypot(p[0] - base[0], p[1] - base[1]));
  const s = min((w - 20) / (2 * reach), (h - 60) / (2 * reach * 0.75));
  const cx = x + w / 2, cy = y + h * 0.6;
  const cs = Math.cos(yaw), sn = Math.sin(yaw);

  const faces = net.faces.map((f, i) => {
    const pts = foldedFace(net, i, t).map(p => {
      const px = p[0] - base[0], pz = p[2] - base[1];
      const x1 = px * cs + pz * sn, z1 = -px * sn + pz * cs;
      return [cx + x1 * s, cy - (p[1] * Math.cos(pitch) + z1 * Math.sin(pitch)) * s, z1 * Math.cos(pitch) - p[1] * Math.sin(pitch)];
    });
    return { index: i, pts, depth: pts.reduce((sum, p) => sum + p[2], 0) / pts.length };
  }).sort((a, b) => b.depth - a.depth);       // farthest face first

  for (const f of faces) {
    const col = color(COLORS[f.index % COLORS.length]);
    col.setAlpha(225);
    fill(col);
    stroke(f.index === selectedFace ? 'red' : 'dimgray');
    strokeWeight(f.index === selectedFace ? 4 : 1.5);
    beginShape();
    for (const p of f.pts) vertex(p[0], p[1]);
    endShape(CLOSE);
  }
}

function drawInfo(x, y, w, h, net, narrow) {
  fill('lightcyan');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 10);
  const F = net.faces.length;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(narrow ? 12 : 16);
  text('Faces F = ' + F + '     Edges E = ' + net.E + '     Vertices V = ' + net.V, x + 12, y + 8);
  textStyle(BOLD);
  fill('blue');
  text('Euler\'s formula:  V − E + F = ' + net.V + ' − ' + net.E + ' + ' + F + ' = ' + (net.V - net.E + F), x + 12, y + 8 + (narrow ? 20 : 24));
  textStyle(NORMAL);
  fill('dimgray');
  textSize(narrow ? 11 : 14);
  text(selectedFace >= 0 ? 'Highlighted in red: ' + net.faces[selectedFace].label + '. Move the Fold slider to follow it into place.'
    : 'Click a face of the net to highlight the same face on the solid.', x + 12, y + h - (narrow ? 18 : 22));
}

// Ray-casting test for a point inside a polygon
function insidePolygon(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) return;
  for (let i = 0; i < netHits.length; i++) {
    if (insidePolygon(mouseX, mouseY, netHits[i])) {
      selectedFace = selectedFace === i ? -1 : i;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  foldSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
