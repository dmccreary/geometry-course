// Transversal Angle Explorer
// Interactive demonstration of angle relationships formed when
// a transversal crosses two parallel lines.
// Students drag a handle to rotate the transversal and click
// canvas-based buttons to highlight the four angle pair types.
// (Bloom's: Analyzing and Evaluating)

// ---- layout constants ----
let canvasWidth = 800;
let drawHeight = 530;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// ---- geometry state ----
let transversalAngleDeg = 60; // acute angle transversal makes with horizontal

// Parallel-line positions (y) and horizontal extent
let lineY1, lineY2, lineLeft, lineRight;
let lineSpacing = 190;

// Transversal handle (user drags the circle at one end)
let handleRadius = 14;
let draggingHandle = false;

// ---- highlight mode ----
// 0=none, 1=corresponding, 2=alt interior, 3=alt exterior, 4=same-side interior
let highlightMode = 0;

// ---- button definitions (built once in setup, drawn each frame) ----
let buttons = [];

// ---- colors ----
const COL_LINE  = '#1565C0';      // parallel lines
const COL_TRANS = '#E53935';      // transversal
const COL_CORRESPONDING = [76, 175, 80, 130];   // green
const COL_ALT_INTERIOR  = [255, 193, 7, 130];   // yellow
const COL_ALT_EXTERIOR  = [255, 152, 0, 130];   // orange
const COL_SAME_SIDE     = [156, 39, 176, 130];  // purple
const COL_DEFAULT_ARC   = [200, 200, 200, 60];

// ================================================================
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  buildButtons();
  recalcGeometry();

  describe(
    'Interactive parallel lines and transversal angle explorer. ' +
    'Drag the red handle to rotate the transversal and click ' +
    'buttons to highlight angle pair relationships.',
    LABEL
  );
}

// ================================================================
function draw() {
  updateCanvasSize();
  recalcGeometry();

  // ---- drawing area ----
  fill('aliceblue');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // ---- control area ----
  fill('#ECEFF1');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // thin separator
  stroke('#B0BEC5');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // ---- title ----
  noStroke();
  fill('#1565C0');
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Transversal Angle Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // ---- subtitle ----
  fill('#757575');
  textSize(13);
  text('Drag the red handle to rotate the transversal', canvasWidth / 2, 38);

  // ---- build angle data for this frame ----
  let topAngles = buildTopAngles();
  let botAngles = buildBotAngles();
  let pts = intersections();

  // Draw angle arcs (behind lines)
  drawArcSet(pts.x1, pts.y1, topAngles, 38);
  drawArcSet(pts.x2, pts.y2, botAngles, 38);

  // Draw parallel lines
  drawParallelLines();

  // Draw transversal
  drawTransversal();

  // Draw angle number labels
  drawLabelSet(pts.x1, pts.y1, topAngles, 62);
  drawLabelSet(pts.x2, pts.y2, botAngles, 62);

  // Intersection dots
  fill('#FF9800');
  noStroke();
  circle(pts.x1, pts.y1, 10);
  circle(pts.x2, pts.y2, 10);

  // Draw legend box
  drawLegend();

  // Draw relationship info panel (when a mode is active)
  drawRelationshipInfo();

  // Draw the draggable handle (always on top)
  drawHandle();

  // Draw buttons in control area
  drawButtons();

  // Draw description text in control area
  drawControlText();
}

// ================================================================
//  ANGLE DATA BUILDERS
// ================================================================
// Standard numbering (clockwise from upper-left at each intersection):
//   Top intersection: 1 (upper-left), 2 (upper-right), 3 (lower-right), 4 (lower-left)
//   Bot intersection: 5 (upper-left), 6 (upper-right), 7 (lower-right), 8 (lower-left)
//
// With the transversal going upper-right at angle a from horizontal:
//   Screen ray directions at top intersection:
//     right = 0 deg,  transversal-down-left = 180-a,  left = 180,  transversal-up-right = 360-a
//   CW sorted: 0, 180-a, 180, 360-a
//   Sectors (CW sweeps):
//     0 to 180-a         sweep = 180-a   => angle 3 (lower-right, interior)
//     180-a to 180       sweep = a       => angle 4 (lower-left, interior)
//     180 to 360-a       sweep = 180-a   => angle 1 (upper-left)
//     360-a to 360       sweep = a       => angle 2 (upper-right)
//
//   At the bottom intersection, the transversal arrives from the
//   upper-left direction, so the ray directions are mirrored:
//     right = 0,  transversal-up-left = 180+a,  left = 180,  transversal-down-right = a
//   CW sorted: 0, a, 180, 180+a
//   Sectors:
//     0 to a             sweep = a       => angle 6 (upper-right, interior)
//     a to 180           sweep = 180-a   => angle 7 (lower-right)
//     180 to 180+a       sweep = a       => angle 8 (lower-left)
//     180+a to 360       sweep = 180-a   => angle 5 (upper-left, interior)
//
// Verification of congruent pairs:
//   Corresponding: 1&5 = 180-a, 2&6 = a, 3&7 = 180-a, 4&8 = a   CHECK
//   Alt Interior:  3&6 = ? => 3 = 180-a, 6 = a  ... that's wrong!
//
// WAIT.  Let me recount the bottom intersection carefully.
// At the bottom intersection the transversal goes from upper-left
// to lower-right through the point.  The four rays are:
//   ray going RIGHT along line m: screen angle 0
//   ray going along transversal toward lower-right: screen angle a
//     (because the transversal descends at angle a below horizontal)
//     Wait -- the transversal direction from top-intersection to
//     bot-intersection is:  dx > 0, dy > 0 (going right and down).
//     The screen angle (from +x, CW) = +a  (below horizontal by a degrees).
//     Actually no.  The transversal in screen coords goes from
//     upper-left to lower-right.  The direction vector from the
//     top intersection to the bottom one is:
//       dx = cos(a),  dy = sin(a)   [screen coords, y down]
//     No.  Let me re-derive.
//
// The transversal angle `a` is defined as the acute angle from the
// horizontal, measured in standard math coords (CCW from +x).
// In screen coords (y down), the transversal direction going from
// upper-left toward lower-right is: (cos(a), -sin(a)) rotated...
//
// Let me just use the intersection function.  The top intersection
// is to the LEFT of the bottom intersection (because the transversal
// tilts to the right going down).  So from top to bottom:
//   dx = ix2 - ix1 > 0
//   dy = lineY2 - lineY1 > 0
// The screen angle of this direction = atan2(dy, dx) = atan2(spacing, dx)
// where dx = spacing / tan(a).
// So screen angle = atan2(spacing, spacing/tan(a)) = atan2(1, 1/tan(a)) = atan2(tan(a), 1) = a.
// Wait: atan2(spacing, spacing/tan(a)) = atan2(tan(a)*k, k) for k = spacing/tan(a)...
// Simpler: the transversal going from top to bottom in screen coords
// makes angle `a` below the +x axis (measured CW, which is positive
// in screen coords).  So the screen angle of the "down-right" ray = a.
// And the opposite "up-left" ray = a + 180.
//
// At the BOTTOM intersection, the four ray screen angles are:
//   right along line m:   0
//   transversal down-right (away from top): a
//   left along line m:    180
//   transversal up-left (toward top):       a + 180
//
// CW sorted (since a is between 20 and 80): 0, a, 180, 180+a
//
// Sectors:
//   0 -> a:        sweep = a       (between right-ray and trans-down-right)
//                  This is the angle BELOW line m, to the RIGHT of transversal.
//                  Position: lower-right => angle 7.
//                  Measure: a
//   a -> 180:      sweep = 180-a   (between trans-down-right and left-ray)
//                  Below line m, to the LEFT of transversal.
//                  Position: lower-left => angle 8.
//                  Measure: 180-a
//   180 -> 180+a:  sweep = a       (between left-ray and trans-up-left)
//                  Above line m, to the LEFT of transversal.
//                  Position: upper-left => angle 5.
//                  Measure: a
//   180+a -> 360:  sweep = 180-a   (between trans-up-left and right-ray)
//                  Above line m, to the RIGHT of transversal.
//                  Position: upper-right => angle 6.
//                  Measure: 180-a
//
// Now check pairs:
//   Corresponding: 1(180-a)&5(a)  => NOT equal.  Still wrong!
//
// The problem is that with a transversal tilting upper-right, the
// "upper-left" angle at the top intersection is NOT the same
// geometric configuration as the "upper-left" angle at the bottom.
// The standard textbook numbering assumes a SPECIFIC direction for
// the transversal.
//
// The typical textbook picture has the transversal going from
// upper-LEFT to lower-RIGHT.  In that picture:
//   At top intersection, angle 1 is above the line, LEFT of transversal.
//   The transversal comes from upper-left, so the "left of transversal
//   above the line" angle is the ACUTE angle.
//   So angle 1 = a (acute).
//
// Let me re-do the numbering matching the standard textbook:
//
// TOP INTERSECTION - transversal comes from upper-left:
//   angle 1: above line, left of transversal  = a        (acute)
//   angle 2: above line, right of transversal = 180 - a  (obtuse)
//   angle 3: below line, right of transversal = a        (acute, interior)
//   angle 4: below line, left of transversal  = 180 - a  (obtuse, interior)
//
// BOTTOM INTERSECTION - transversal continues to lower-right:
//   angle 5: above line, left of transversal  = a        (acute, interior)
//   angle 6: above line, right of transversal = 180 - a  (obtuse, interior)
//   angle 7: below line, right of transversal = a        (acute)
//   angle 8: below line, left of transversal  = 180 - a  (obtuse)
//
// Check:
//   Corresponding: 1&5=a, 2&6=180-a, 3&7=a, 4&8=180-a  => ALL CONGRUENT  CHECK!
//   Alt Interior:  3&6: a & 180-a => NOT congruent... still wrong!
//
// Hmm.  This means my understanding of the numbering is off.
// Let me look at how the existing sim (and the chapter) number them.
//
// The existing sim says:
//   angles[0] = transversalAngle          (angle 1)
//   angles[1] = 180 - transversalAngle    (angle 2)
//   angles[2] = 180 - transversalAngle    (angle 3)
//   angles[3] = transversalAngle          (angle 4)
//   angles[4] = transversalAngle          (angle 5)
//   angles[5] = 180 - transversalAngle    (angle 6)
//   angles[6] = 180 - transversalAngle    (angle 7)
//   angles[7] = transversalAngle          (angle 8)
//
// So:   1=a, 2=180-a, 3=180-a, 4=a, 5=a, 6=180-a, 7=180-a, 8=a
// Alt interior:  3&6 = (180-a)&(180-a) = congruent  CHECK!
//                4&5 = a & a            = congruent  CHECK!
// Same-side int: 3&5 = (180-a) + a = 180  CHECK!
//                4&6 = a + (180-a) = 180  CHECK!
//
// OK so the numbering in the existing sim is:
//   Top intersection (clockwise from upper-left):
//     1 = a  (acute, upper-left)
//     2 = 180-a (obtuse, upper-right)
//     3 = 180-a (obtuse, lower-right)  -- WAIT, this means angles 2 and 3
//         are vertical angles and both obtuse.  That's wrong geometrically.
//         Vertical angles should be 1&3 and 2&4.
//
// Actually in the existing sim, the numbering is NOT clockwise.
// Let me re-examine.  The existing sim assigns positions:
//   angleStarts[0] = -180      => ∠1: arc from -180 with sweep = a  => [-180, -180+a]
//     This is the arc in the upper-left region
//   angleStarts[1] = -transversalAngle => ∠2: arc from -a with sweep = 180-a => [-a, 180-a-a]...
//     Actually [-a, -a + (180-a)] = [-a, 180-2a]  That doesn't look right either.
//
// I think the existing sim's angle positions have a different convention.
// The key result from the existing sim is the measure assignment:
//   1=a, 2=180-a, 3=180-a, 4=a, 5=a, 6=180-a, 7=180-a, 8=a
//
// For this to work with corresponding angles (1&5, 2&6, 3&7, 4&8)
// being congruent: 1=5=a, 2=6=180-a, 3=7=180-a, 4=8=a  CHECK.
//
// The numbering convention must be:
//   Top: 1=upper-left(a), 2=upper-right(180-a), 3=lower-right(180-a), 4=lower-left(a)
//   Bot: 5=upper-left(a), 6=upper-right(180-a), 7=lower-right(180-a), 8=lower-left(a)
//
// Wait, but 1 and 3 are supposed to be vertical angles (they're across
// the intersection), so they should be equal: a and 180-a are NOT equal.
// So 1&3 are NOT vertical angles in this numbering.
//
// In fact, looking at standard textbook numbering, the convention is:
//   Angles are numbered 1-4 going clockwise:
//     1 = upper-left, 2 = upper-right, 3 = lower-right, 4 = lower-left
//   Vertical pairs: 1&3, 2&4
//   Linear pairs: 1&2, 2&3, 3&4, 4&1
//
// With the transversal going from upper-left to lower-right:
//   upper-left: the region between the line-going-left ray and the
//               transversal-going-upper-left ray.
//   If the transversal makes angle a with horizontal, this region
//   has measure = 180 - a (obtuse when a < 90).
//
// So: 1 = 180-a, 2 = a, 3 = 180-a, 4 = a
// Vertical: 1&3 = 180-a (equal CHECK), 2&4 = a (equal CHECK)
// Linear: 1+2 = 180 CHECK
//
// And at bottom: 5 = 180-a, 6 = a, 7 = 180-a, 8 = a
//
// Then:
//   Corresponding: 1&5=180-a, 2&6=a, 3&7=180-a, 4&8=a  CHECK
//   Alt interior: 3&6 = 180-a & a => NOT EQUAL.
//
// This breaks alt interior again!  The real issue is: what IS the
// standard textbook numbering?
//
// After careful research, the standard convention for a transversal
// going from upper-left to lower-right is:
//
//   TOP INTERSECTION:
//     1 = above line, left of transversal
//     2 = above line, right of transversal
//     3 = below line, right of transversal
//     4 = below line, left of transversal
//
//   BOTTOM INTERSECTION:
//     5 = above line, left of transversal
//     6 = above line, right of transversal
//     7 = below line, right of transversal
//     8 = below line, left of transversal
//
// "Left of transversal" and "right of transversal" are defined by
// the transversal's direction.  The transversal direction goes from
// upper-left to lower-right.
//
// At the TOP intersection:
//   - "left of transversal, above line" = the region between
//     the left-going ray of the line and the upper-left-going ray
//     of the transversal.  The angle swept from the left ray (180 deg)
//     to the upper-left ray of transversal.
//     The transversal's upper-left ray has screen angle = 180 + a
//     (since the down-right direction is a, the opposite is 180+a).
//     Sweep from 180 to 180+a = a degrees.
//     So angle 1 = a.
//
//   - "right of transversal, above line" = region between
//     upper-left transversal ray and right-going line ray.
//     Sweep from 180+a to 360 = 180-a degrees.
//     So angle 2 = 180-a.
//
//   - "right of transversal, below line" = region between
//     right-going line ray and down-right transversal ray.
//     Sweep from 0 to a = a degrees.
//     So angle 3 = a.
//
//   - "left of transversal, below line" = region between
//     down-right transversal ray and left-going line ray.
//     Sweep from a to 180 = 180-a degrees.
//     So angle 4 = 180-a.
//
// At the BOTTOM intersection (same transversal direction):
//   Same analysis gives: 5=a, 6=180-a, 7=a, 8=180-a
//
// Check alt interior: 3&6 = a & 180-a => NOT EQUAL.  Still broken!
//
// I think the issue is which two angles are "alternate interior."
// Let me think about this differently.
//
// Interior angles are between the parallel lines.  At the top
// intersection, the interior angles are 3 and 4 (below the top line).
// At the bottom intersection, the interior angles are 5 and 6
// (above the bottom line).
//
// "Alternate" means on opposite sides of the transversal.
// Angle 3 is on the RIGHT of the transversal (at top intersection).
// Angle 5 is on the LEFT of the transversal (at bottom intersection).
// So 3 & 5 are alternate interior.  3 = a, 5 = a.  CONGRUENT!
//
// Angle 4 is on the LEFT of the transversal (at top).
// Angle 6 is on the RIGHT of the transversal (at bottom).
// So 4 & 6 are alternate interior.  4 = 180-a, 6 = 180-a.  CONGRUENT!
//
// But the chapter text says alt interior pairs are 3&6 and 4&5.
// Let me re-read... "∠3 and ∠6, ∠4 and ∠5"
// And the existing sim says the same.
//
// This means the numbering in the chapter/existing sim must be
// different from what I derived.  Specifically, if 3&6 and 4&5 are
// the alt interior pairs, then 3 must equal 6 and 4 must equal 5.
//
// From the existing sim: 1=a, 2=180-a, 3=180-a, 4=a
//                        5=a, 6=180-a, 7=180-a, 8=a
// Alt interior: 3&6 = (180-a)&(180-a) = EQUAL.  4&5 = a&a = EQUAL.
//
// So the existing sim's numbering gives measures:
//   1=a, 2=180-a, 3=180-a, 4=a
// This means: 1 and 4 are acute, 2 and 3 are obtuse.
// Vertical pairs: 1&3 should be vertical => a & 180-a => NOT EQUAL.
//
// That breaks vertical angles!  Unless 1&3 are NOT vertical angles
// in this numbering.
//
// The resolution: the existing sim numbers angles as:
//   1 = top-left at intersection (which I'm calling "left of trans, above line")
//   2 = top-right
//   3 = bottom-right
//   4 = bottom-left
//
// But "top-left" and "bottom-right" are NOT vertical angles when the
// transversal is tilted!  The vertical pairs would be 1&3 only if we
// go diagonally across.  In fact, with a tilted transversal:
//   1 (top-left) and 3 (bottom-right) ARE vertical (opposite each other)
//   2 (top-right) and 4 (bottom-left) ARE vertical
//
// If 1 = a and 3 = 180-a, those can't be vertical angles.
// UNLESS the existing sim has a different spatial assignment than I think.
//
// Let me look at the existing sim's angleStarts:
//   angleStarts[0] = -180   (for angle 1)
//   angleStarts[1] = -transversalAngle   (for angle 2)
//   angleStarts[2] = 0   (for angle 3)
//   angleStarts[3] = 180 - transversalAngle   (for angle 4)
//
//   angleSweeps[0] = transversalAngle = a
//   angleSweeps[1] = 180 - transversalAngle
//   angleSweeps[2] = transversalAngle = a  (WAIT: sweep for angle 3 is a, not 180-a)
//
// Hmm, the sweeps are [a, 180-a, a, 180-a] but the measures assigned
// were [a, 180-a, 180-a, a].  There's a mismatch in the existing sim!
// The arc sweep says angle 3 sweeps a degrees, but the measure text
// says angle 3 = 180-a.  That's a BUG in the existing sim.
//
// OK so the existing sim has incorrect arc sweeps for some angles.
// Let me build my sim correctly from scratch.
//
// FINAL CORRECT ASSIGNMENT:
// I'll use the numbering where corresponding angles have equal measures.
// The standard textbook always numbers them so that:
//   1&5, 2&6, 3&7, 4&8 are corresponding (congruent)
//   3&6, 4&5 are alternate interior (congruent)
//   1&8, 2&7 are alternate exterior (congruent)
//   3&5, 4&6 are same-side interior (supplementary)
//
// For all of these to work, we need:
//   1=5, 2=6, 3=7, 4=8          (corresponding)
//   3=6 => 3=2, 4=5 => 4=1      (alt interior, using 2=6, 1=5)
//   So: 1=4=5=8 and 2=3=6=7
//   And: 1+2 = 180  (linear pair)
//
// With a = transversal angle:
//   Let angle 1 = a, then angle 2 = 180-a
//   Then: 3 = 180-a, 4 = a, 5 = a, 6 = 180-a, 7 = 180-a, 8 = a
//
// Same-side interior: 3+5 = (180-a)+a = 180  CHECK
//                     4+6 = a+(180-a) = 180  CHECK
//
// Now, where are these angles spatially?
//   At top intersection:
//     angle 1 = a (acute): this must be "above line, left of transversal"
//     angle 2 = 180-a (obtuse): "above line, right of transversal"
//     angle 3 = 180-a (obtuse): "below line, LEFT of transversal" (interior)
//     angle 4 = a (acute): "below line, RIGHT of transversal" (interior)
//
//   Wait, vertical angles (opposite at intersection): 1&3 and 2&4
//     1&3: a & 180-a => NOT EQUAL.  This breaks vertical angles!
//
// The problem is fundamental: for both corresponding AND alternate
// interior to be congruent with the given pair assignments,
// angles 2 and 3 must be equal.  But 2 and 3 are ADJACENT at the
// same intersection, not vertical.  That means the numbering is NOT
// simply clockwise around the intersection.
//
// THE CORRECT NUMBERING (matching textbooks like the chapter):
// At each intersection, angles are numbered so that:
//   1 and 2 are a linear pair (above the line)
//   3 and 4 are a linear pair (below the line)
//   1 and 4 are vertical angles
//   2 and 3 are vertical angles
//
// Specifically, going clockwise: 1, 2, 4, 3  (NOT 1, 2, 3, 4!)
// Or equivalently: 1(upper-left), 2(upper-right), 3(lower-left), 4(lower-right)
// Wait no.  Let me just look at what makes 1&3 and 2&4 vertical:
//
// If 1 = upper-left and 3 = lower-right, they are across the
// intersection => vertical.
// If 2 = upper-right and 4 = lower-left, also vertical.
//
// Measures: 1=a, 3=lower-right.
// For 1&3 vertical (equal), 3 must also = a.
// 3 = lower-right at top intersection.
// "Lower-right" is below the line, right of transversal.
// We showed earlier this region has measure a.  So 3 = a.  GOOD.
//
// Then 4 = lower-left = 180-a, and 2 = upper-right = 180-a.
// 2&4 vertical: 180-a & 180-a = equal.  GOOD.
//
// Now, the numbering at the bottom intersection:
//   5 = upper-left = ?
//   6 = upper-right = ?
//   7 = lower-right = ?
//   8 = lower-left = ?
//
// For corresponding angles (same position): 1&5, 2&6, 3&7, 4&8
//   1(upper-left at top) & 5(upper-left at bottom) => same position
//
// At bottom intersection, what is "upper-left"?
// It's above line m, left of transversal.
// The transversal arrives from upper-left at the bottom intersection
// (coming down from the top intersection).
// "Left of transversal" at bottom = same side as "left of transversal" at top.
// The "upper-left" angle at bottom has the same geometric relationship
// as at top, so angle 5 should also = a.
//
// Similarly: 6 = upper-right = 180-a, 7 = lower-right = a, 8 = lower-left = 180-a
//
// Check corresponding: 1&5=a, 2&6=180-a, 3&7=a, 4&8=180-a  ALL EQUAL.  CHECK!
// Check alt interior: 3&6 = a & 180-a => NOT EQUAL.  STILL BROKEN!
//
// So either the textbook pair assignments are wrong, or there's a
// different spatial arrangement.
//
// Let me try the OPPOSITE assignment:
//   angle 3 = lower-LEFT at top intersection (not lower-right)
//   angle 4 = lower-RIGHT at top intersection
//
// Then: 1=upper-left=a, 2=upper-right=180-a, 3=lower-left=180-a, 4=lower-right=a
//   Vertical: 1&3 = a & 180-a => NOT EQUAL.  Nope.
//
// Let me try yet another arrangement:
//   1=upper-right, 2=upper-left, 3=lower-left, 4=lower-right
//   (going counterclockwise from upper-right)
//
//   1=upper-right=180-a, 2=upper-left=a, 3=lower-left=180-a, 4=lower-right=a
//   Vertical: 1&3=(180-a)&(180-a)=EQUAL.  2&4=a&a=EQUAL.  CHECK!
//   At bottom: 5=upper-right=180-a, 6=upper-left=a, 7=lower-left=180-a, 8=lower-right=a
//   Corresponding: 1&5=180-a, 2&6=a, 3&7=180-a, 4&8=a  ALL EQUAL.  CHECK!
//   Alt interior (3&6, 4&5):
//     3=lower-left(top)=180-a, 6=upper-left(bot)=a => NOT EQUAL.
//
// I keep getting the same problem.  Let me think about what "alternate
// interior" really means geometrically.
//
// "Alternate" = opposite sides of the transversal.
// "Interior" = between the two parallel lines.
//
// Interior angles at top intersection: angles below line l = 3 & 4
// Interior angles at bottom intersection: angles above line m = 5 & 6
//
// If I use the arrangement: 1=UL, 2=UR, 3=LR, 4=LL
// Interior at top: 3(LR=a), 4(LL=180-a)
// Interior at bottom: 5(UL=a), 6(UR=180-a)
//
// "Alternate" means opposite sides of transversal.
// 3 is RIGHT of transversal. Which bottom angle is LEFT of transversal?
// 5 (UL) is LEFT of transversal.  So 3 & 5 are "alternate interior."
// 3 = a, 5 = a.  CONGRUENT!
//
// 4 is LEFT of transversal. 6 (UR) is RIGHT of transversal.
// So 4 & 6 are "alternate interior."
// 4 = 180-a, 6 = 180-a.  CONGRUENT!
//
// But the chapter says the alt interior pairs are 3&6 and 4&5!
// With MY numbering, the alt interior pairs are 3&5 and 4&6.
//
// This means the chapter uses a DIFFERENT numbering convention.
// The way to get 3&6 as alternate interior is if 3 and 6 are on
// opposite sides of the transversal.
//
// For 3 & 6 to be alt interior, angle 3 must be interior at top
// (below top line) and angle 6 must be interior at bottom (above
// bottom line), and they must be on OPPOSITE sides.
//
// If angle 3 is on the LEFT of transversal at top,
// and angle 6 is on the RIGHT of transversal at bottom,
// then they're on opposite sides.
//
// With 1=UL, 2=UR, 3=LL, 4=LR numbering:
//   3=LL=180-a (left of transversal, below line = interior)
//   6=UR=180-a (right of transversal, above line = interior)
//   3&6 = (180-a)&(180-a) = CONGRUENT!
//   4=LR=a (right of transversal, below line = interior)
//   5=UL=a (left of transversal, above line = interior)
//   4&5 = a&a = CONGRUENT!
//
//   Vertical: 1(UL)&4(LR) = a&a = EQUAL?  Wait, UL and LR ARE opposite.
//   1=UL=a, 4=LR=a.  Equal!
//   2(UR)&3(LL): 180-a & 180-a = EQUAL!
//
//   Corresponding: 1&5=a, 2&6=180-a, 3&7=180-a, 4&8=a  CHECK!
//   Alt exterior: 1&8, 2&7
//     1=a(UL exterior at top), 8=a(LL exterior at bot)
//     Hmm, 1 is above top line (exterior), 8 is below bottom line (exterior).
//     1 is left of transversal, 8 is left of transversal => SAME side, not alternate.
//
//   Hmm.  With this numbering (1=UL, 2=UR, 3=LL, 4=LR), the "alternate
//   exterior" pairs 1&8 and 2&7 need to be on opposite sides.
//   1=UL at top (left side, exterior above top line)
//   8=LL at bottom (left side, exterior below bottom line)
//   These are on the SAME side. That's same-side exterior, not alternate!
//
// OK I think the standard numbering that matches the textbook is:
//   At each intersection, going clockwise:
//     Top: 1, 2, 3, 4 clockwise starting from upper-LEFT
//     Bot: 5, 6, 7, 8 clockwise starting from upper-LEFT
//   So: 1=UL, 2=UR, 3=LR, 4=LL
//       5=UL, 6=UR, 7=LR, 8=LL
//
//   Vertical: 1&3 (UL & LR), 2&4 (UR & LL)
//   Interior at top: 3(LR), 4(LL)  -- below top line
//   Interior at bot: 5(UL), 6(UR)  -- above bot line
//
//   Alt interior: opposite sides of transversal
//     3(LR, right side) paired with 5(UL, left side)?  But textbook says 3&6.
//     Unless: 3(LR) is actually LEFT of transversal.
//
//     With transversal going from UL to LR, the "lower-right" region
//     at the intersection is to the RIGHT of the right-going line ray
//     AND below the transversal's downward-right ray.
//     Hmm, "left/right of transversal" is ambiguous.
//
// I think the resolution is that the standard textbook numbering
// actually goes: 1, 2, 3, 4 where 1 and 2 are ABOVE the line
// and 3 and 4 are BELOW the line, with:
//   1 = above, left of transversal
//   2 = above, right of transversal
//   3 = below, LEFT of transversal  (not lower-right!)
//   4 = below, RIGHT of transversal
//
// This is going clockwise: 1(UL), 2(UR), then jumping to 3(LL), 4(LR).
// NOT the standard clockwise 1,2,3,4 around the point!
//
// With this: 1=UL=a, 2=UR=180-a, 3=LL=180-a, 4=LR=a
//   Vertical: 1&3 = a & 180-a => NOT equal.  Broken again.
//
// I've been going in circles (pun intended).  Let me just USE the
// measure assignments from the existing sim (which match the chapter):
//   1=a, 2=180-a, 3=180-a, 4=a, 5=a, 6=180-a, 7=180-a, 8=a
// And map them to screen positions that LOOK correct.
//
// The key insight: the numbering doesn't have to match a simple
// clockwise pattern.  Many textbooks number them as:
//   1 and 3 are on the SAME side of the transversal (but at different intersections)
//   ...wait, 1 and 3 are at the SAME intersection.
//
// Actually, re-examining once more:  Many geometry textbooks use this
// specific numbering:
//   Top intersection: 1(UL), 2(UR), 3(LR), 4(LL)  -- clockwise
//   Bot intersection: 5(UL), 6(UR), 7(LR), 8(LL)  -- clockwise
//
// With vertical angles 1&3 and 2&4.
// The measures (with transversal from UL to LR making acute angle a):
//   1(UL)=a, 2(UR)=180-a, 3(LR)=a, 4(LL)=180-a
//   5(UL)=a, 6(UR)=180-a, 7(LR)=a, 8(LL)=180-a
//
//   Vertical: 1&3=a (equal), 2&4=180-a (equal).  CHECK!
//   Corresponding: 1&5=a, 2&6=180-a, 3&7=a, 4&8=180-a.  CHECK!
//
//   Interior at top: 3(LR) and 4(LL) -- below line l
//   Interior at bot: 5(UL) and 6(UR) -- above line m
//
//   Alt interior: opposite sides of transversal
//     3(LR) is to the right of transversal (below-right at intersection)
//     6(UR) is to the right of transversal (above-right at intersection)
//     => SAME side!  So 3&6 are same-side interior!
//
//     The textbook says 3&6 are ALT interior.  So either LR is NOT
//     "right of transversal" or the textbook uses a different numbering.
//
// I think the confusion is that LR (lower-right of the intersection
// point) is actually to the LEFT of the transversal when the transversal
// goes from UL to LR.  The transversal divides the plane into two half-
// planes: the upper-right half and the lower-left half.  The LR position
// is in the lower-LEFT half of the transversal.  So:
//   3(LR) = LEFT of transversal
//   4(LL) = LEFT of transversal?  No, LL is also in the lower-left half...
//
// OK, the transversal goes from UL to LR.  It divides the plane into:
//   - The side containing UR
//   - The side containing LL
//
// So:
//   1(UL): on the transversal line itself (vertex)... no, it's a region.
//   UL region: between the left ray and the UL transversal ray.
//     The UL transversal ray goes toward upper-left.
//     The UL region is bounded by: line going left AND transversal going UL.
//     This region opens toward the upper-left.
//     Is it on the UR side or LL side of the transversal?
//     The UL region is above the transversal => on the UR side?
//     Actually, "above" the transversal (which goes UL to LR) is toward
//     the upper-right.  So the UL region is on the upper-right side.
//     Hmm, no.  The UL region is above the line and left of center.
//     The transversal goes through the center rising to the upper-right.
//     So the UL region is to the LEFT of the transversal.
//
// Let me just define "left/right of transversal" carefully:
//   If you stand at the intersection and look along the transversal
//   toward the upper-right (the direction of increasing transversal):
//     LEFT = the side where the line goes to the LEFT (which is the
//            upper side of the intersection).
//     Wait, that depends on orientation.
//
//   More precisely: the transversal has direction (cos a, -sin a)
//   in screen coords (going upper-right).  The LEFT side (when facing
//   this direction) is determined by rotating this vector 90 degrees CCW:
//   (-(-sin a), cos a) = (sin a, cos a).  This points to the lower-right
//   in screen coords.
//
//   So "left of transversal" (when facing upper-right) is the LOWER-RIGHT
//   side, and "right of transversal" is the UPPER-LEFT side.
//
// This is getting extremely confusing.  Let me just MATCH the existing
// sim's behavior and the chapter text, using the screen angle positions
// from the existing sim, but with canvas-based controls.

// I'll use the practical approach:
// - At BOTH intersections, the transversal makes the same angles with the line
// - The four screen angle sectors at each intersection are identical
// - This is because both lines are parallel and horizontal, and the
//   transversal is a straight line
//
// The four sectors at ANY intersection are:
//   Sector A: start=0, sweep=180-a  (between right ray and trans-going-down-left)
//   Sector B: start=180-a, sweep=a  (between trans-going-down-left and left ray)
//   Sector C: start=180, sweep=180-a (between left ray and trans-going-up-right)
//   Sector D: start=360-a, sweep=a  (between trans-going-up-right and right ray)
//
// Wait, "trans-going-down-left" has screen angle = 180 - a?
// The transversal direction going from top intersection toward
// bottom intersection (lower-right) in screen coords:
//   cos(a) to the right, sin(a) down  (since y is down in screen)
//   But we said the transversal goes to the upper-right...
//
// OK let me just use the actual intersection calculation.
// From intersections(): top intersection is at (ix1, lineY1) and
// bottom is at (ix2, lineY2) where ix2 > ix1 and lineY2 > lineY1.
// So going from top to bottom, direction is (ix2-ix1, lineY2-lineY1)
// = (positive, positive) = going to the lower-right in screen.
// The screen angle of this direction = atan2(positive, positive) = some angle
// between 0 and 90 degrees.  Specifically:
//   ix2-ix1 = lineSpacing / tan(a)
//   lineY2-lineY1 = lineSpacing
//   atan2(lineSpacing, lineSpacing/tan(a)) = atan2(1, 1/tan(a)) = atan2(tan(a), 1) = a
//
// So the transversal's screen angle going from top to bottom = a degrees
// (measured CW from +x, which is below the horizontal).
//
// At each intersection, the four ray directions (screen angles, CW from +x):
//   right along line: 0
//   transversal going lower-right: a
//   left along line: 180
//   transversal going upper-left: 180 + a
//
// CW sorted (a between 20-80): 0, a, 180, 180+a
//
// Sectors:
//   0 to a:       sweep = a         (lower-right of intersection)
//   a to 180:     sweep = 180 - a   (lower-left)
//   180 to 180+a: sweep = a         (upper-left)
//   180+a to 360: sweep = 180 - a   (upper-right)
//
// Now I need to assign angle numbers to these sectors at each intersection.
//
// The chapter/existing sim's measure assignment is:
//   1=a, 2=180-a, 3=180-a, 4=a (at top)
//   5=a, 6=180-a, 7=180-a, 8=a (at bottom)
//
// The sectors with their measures are:
//   lower-right: a
//   lower-left: 180-a
//   upper-left: a
//   upper-right: 180-a
//
// Matching measures to angle numbers:
//   At top: 1=a => upper-left or lower-right
//           2=180-a => lower-left or upper-right
//           3=180-a => lower-left or upper-right
//           4=a => upper-left or lower-right
//
// Standard: 1=upper-left, 2=upper-right, 3=lower-right, 4=lower-left
// Gives: 1=UL=a, 2=UR=180-a, 3=LR=a, 4=LL=180-a
// But existing sim says 3=180-a and 4=a.  So existing sim has:
//   3 = lower-left (180-a) and 4 = lower-right (a)?
// Or: 3 = upper-right and 4 = upper-left?
// That doesn't match the standard clockwise either.
//
// I think the numbering in the existing sim / chapter is:
//   1 = UL (above line, to the left of transversal direction)  = a
//   2 = UR (above line, to the right) = 180-a
//   3 = LR (below line, continuing clockwise from 2) = 180-a ... wait
//
// Actually in many textbooks, the numbering continues:
//   1, 2 above the line (left to right)
//   3, 4 below the line (RIGHT to LEFT, like reading the second row backwards)
//
// So: 1=UL, 2=UR, 3=LR, 4=LL
// But that gives 3=LR=a, not 180-a.
//
// OR: 1=UL, 2=UR, 3=LL, 4=LR (Z-pattern)
// 1=UL=a, 2=UR=180-a, 3=LL=180-a, 4=LR=a
// This matches!  1=a, 2=180-a, 3=180-a, 4=a  MATCH WITH EXISTING SIM!
//
// So the numbering is a Z-pattern:
//   1=UL, 2=UR, 3=LL (below line, left), 4=LR (below line, right)
//
// Vertical angles: 1(UL) & 4(LR): a & a = EQUAL.  CHECK!
//                  2(UR) & 3(LL): 180-a & 180-a = EQUAL.  CHECK!
//
// At bottom intersection (same Z-pattern):
//   5=UL=a, 6=UR=180-a, 7=LL=180-a, 8=LR=a
//
// Interior angles at top: 3(LL) and 4(LR) -- below top line
// Interior angles at bot: 5(UL) and 6(UR) -- above bot line
//
// Alt interior (opposite sides of transversal):
//   3(LL) is to the LEFT of transversal.
//   6(UR) is to the RIGHT of transversal.
//   3 & 6 are on opposite sides => alternate interior.
//   3=180-a, 6=180-a => CONGRUENT!  CHECK!
//
//   4(LR) is to the RIGHT of transversal.
//   5(UL) is to the LEFT of transversal.
//   4 & 5 are on opposite sides => alternate interior.
//   4=a, 5=a => CONGRUENT!  CHECK!
//
// Alt exterior:
//   Exterior at top: 1(UL) and 2(UR) -- above top line
//   Exterior at bot: 7(LL) and 8(LR) -- below bot line
//   1(UL, left) & 8(LR, right): opposite sides => alternate exterior
//   1=a, 8=a => CONGRUENT!  CHECK!
//   2(UR, right) & 7(LL, left): opposite sides => alternate exterior
//   2=180-a, 7=180-a => CONGRUENT!  CHECK!
//
// Same-side interior:
//   3(LL, left) & 5(UL, left): same side
//   3+5 = (180-a)+a = 180 => SUPPLEMENTARY!  CHECK!
//   4(LR, right) & 6(UR, right): same side
//   4+6 = a+(180-a) = 180 => SUPPLEMENTARY!  CHECK!
//
// EVERYTHING CHECKS OUT!
//
// SUMMARY OF Z-PATTERN NUMBERING AND SCREEN POSITIONS:
//
// Top intersection: 1=UL(a), 2=UR(180-a), 3=LL(180-a), 4=LR(a)
//   Screen arcs:
//     angle 1 (UL): start=180+a, sweep=180-a  [upper-left sector]
//       Wait, the UL sector goes from screen angle 180+a to 360 (=0).
//       start=180+a, sweep=360-(180+a)=180-a.
//       But 180+a to 360 crosses the 0/360 boundary when a<180 (always).
//       In p5.js arc(), we can use start=180+a and end=360.
//       That's a sweep of 180-a degrees.  BUT p5 uses radians and
//       handles the wrap-around automatically.  Let me verify:
//       For a=60: start=240, end=360.  arc(cx,cy,r,r, radians(240), radians(360))
//       That should draw from 240 to 360 degrees CW = the upper-right sector.
//       Wait, 240 to 360 in screen coords (CW from +x) IS the upper-right!
//       Hmm, I had this as UL earlier.  Let me re-examine.
//
//       At a=60, the four ray screen angles are: 0, 60, 180, 240.
//       Sector 0-60: below horizontal, right of transversal = lower-RIGHT
//       Sector 60-180: below horizontal, left of transversal = lower-LEFT
//       Sector 180-240: above horizontal, left of transversal = upper-LEFT
//       Sector 240-360: above horizontal, right of transversal = upper-RIGHT
//
//       So UL = sector 180 to 180+a = 180 to 240.  sweep = a = 60.
//       Measure of angle 1 (UL) should be a = 60.  The sweep IS a.  CHECK!
//
//       And UR = sector 180+a to 360.  sweep = 180-a = 120.
//       Measure of angle 2 (UR) = 180-a = 120.  CHECK!
//
//       And LR = sector 0 to a.  sweep = a = 60.
//       Measure of angle 4 (LR) = a = 60.  CHECK!
//
//       And LL = sector a to 180.  sweep = 180-a = 120.
//       Measure of angle 3 (LL) = 180-a = 120.  CHECK!
//
//   FINAL screen arc assignments:
//     angle 1 (UL): start=180,   sweep=a       measure=a
//     angle 2 (UR): start=180+a, sweep=180-a   measure=180-a
//     angle 3 (LL): start=a,     sweep=180-a   measure=180-a
//     angle 4 (LR): start=0,     sweep=a       measure=a
//
//     (Same for bottom intersection with angles 5-8)
//
// ALL CHECKS PASS.  Implementing this now.

function buildTopAngles() {
  let a = transversalAngleDeg;
  return [
    { start: 180,     sweep: a,       num: 1, measure: round(a) },
    { start: 180 + a, sweep: 180 - a, num: 2, measure: round(180 - a) },
    { start: a,       sweep: 180 - a, num: 3, measure: round(180 - a) },
    { start: 0,       sweep: a,       num: 4, measure: round(a) }
  ];
}

function buildBotAngles() {
  let a = transversalAngleDeg;
  return [
    { start: 180,     sweep: a,       num: 5, measure: round(a) },
    { start: 180 + a, sweep: 180 - a, num: 6, measure: round(180 - a) },
    { start: a,       sweep: 180 - a, num: 7, measure: round(180 - a) },
    { start: 0,       sweep: a,       num: 8, measure: round(a) }
  ];
}

// ================================================================
//  GEOMETRY HELPERS
// ================================================================

function recalcGeometry() {
  lineY1 = drawHeight / 2 - lineSpacing / 2 + 20;
  lineY2 = lineY1 + lineSpacing;
  lineLeft = margin + 40;
  lineRight = canvasWidth - margin - 40;
}

function intersections() {
  let cx = canvasWidth / 2;
  let tanA = tan(radians(transversalAngleDeg));
  let ix1 = cx - (lineSpacing / 2) / tanA;
  let ix2 = cx + (lineSpacing / 2) / tanA;
  return { x1: ix1, y1: lineY1, x2: ix2, y2: lineY2 };
}

// ================================================================
//  DRAW FUNCTIONS
// ================================================================

function drawParallelLines() {
  stroke(COL_LINE);
  strokeWeight(4);
  line(lineLeft, lineY1, lineRight, lineY1);
  line(lineLeft, lineY2, lineRight, lineY2);

  // Parallel arrow marks
  let arrowX = canvasWidth / 2 - 60;
  fill(COL_LINE);
  noStroke();
  triangle(arrowX, lineY1 - 7, arrowX, lineY1 + 7, arrowX + 14, lineY1);
  triangle(arrowX - 18, lineY1 - 7, arrowX - 18, lineY1 + 7, arrowX - 4, lineY1);
  triangle(arrowX, lineY2 - 7, arrowX, lineY2 + 7, arrowX + 14, lineY2);
  triangle(arrowX - 18, lineY2 - 7, arrowX - 18, lineY2 + 7, arrowX - 4, lineY2);

  // Line labels
  noStroke();
  fill(COL_LINE);
  textSize(16);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('l', lineLeft - 12, lineY1);
  text('m', lineLeft - 12, lineY2);

  // Parallel symbol
  textAlign(LEFT, CENTER);
  textSize(14);
  text('l \u2225 m', lineRight - 50, lineY1 - 24);
  textStyle(NORMAL);
}

function drawTransversal() {
  let pts = intersections();
  let cosA = cos(radians(transversalAngleDeg));
  let sinA = sin(radians(transversalAngleDeg));
  let ext = 140;

  // Direction from top intersection to bottom intersection in screen coords:
  //   (cos(a), sin(a))  -- to the right and downward
  // But we've been saying the transversal goes from upper-left to lower-right.
  // Extending beyond each intersection:
  //   Beyond top (going upper-left): subtract the direction
  //   Beyond bottom (going lower-right): add the direction
  let x1 = pts.x1 - ext * cosA;
  let y1 = pts.y1 - ext * sinA;  // sinA is positive, so this goes UP (negative y)
  let x2 = pts.x2 + ext * cosA;
  let y2 = pts.y2 + ext * sinA;  // goes DOWN

  // Wait, the direction from top to bottom is: dx = ix2-ix1 > 0, dy = lineY2-lineY1 > 0
  // And the screen angle is a (below horizontal).
  // So direction = (cos(a), sin(a)) in screen coords?  No:
  //   tan(screen_angle) = dy/dx = lineSpacing / (lineSpacing/tan(a)) = tan(a)
  //   So screen_angle = a.  Direction = (cos(a), sin(a)).  But sin(a) is positive
  //   and dy is positive (going down), so yes: direction = (cos(a), sin(a)).

  // Extending beyond top intersection (going backward = upper-left):
  x1 = pts.x1 - ext * cosA;
  y1 = pts.y1 - ext * sinA;
  // Extending beyond bottom intersection (going forward = lower-right):
  x2 = pts.x2 + ext * cosA;
  y2 = pts.y2 + ext * sinA;

  stroke(COL_TRANS);
  strokeWeight(4);
  line(x1, y1, x2, y2);

  // Transversal label near the lower-right end
  fill(COL_TRANS);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('t', x2 + 8, y2 + 8);
  textStyle(NORMAL);
}

function drawArcSet(cx, cy, angles, arcR) {
  for (let info of angles) {
    let col = getAngleColor(info.num);
    fill(col);
    if (highlightMode > 0 && isHighlighted(info.num)) {
      let c = getHighlightStrokeColor();
      stroke(c);
      strokeWeight(2);
    } else {
      stroke(180, 180, 180, 80);
      strokeWeight(1);
    }
    arc(cx, cy, arcR * 2, arcR * 2,
        radians(info.start), radians(info.start + info.sweep), PIE);
  }
}

function getAngleColor(num) {
  if (highlightMode === 0) return color(COL_DEFAULT_ARC);
  if (!isHighlighted(num)) return color(COL_DEFAULT_ARC);
  if (highlightMode === 1) return color(COL_CORRESPONDING);
  if (highlightMode === 2) return color(COL_ALT_INTERIOR);
  if (highlightMode === 3) return color(COL_ALT_EXTERIOR);
  if (highlightMode === 4) return color(COL_SAME_SIDE);
  return color(COL_DEFAULT_ARC);
}

function getHighlightStrokeColor() {
  if (highlightMode === 1) return color(46, 125, 50);
  if (highlightMode === 2) return color(245, 127, 23);
  if (highlightMode === 3) return color(230, 81, 0);
  if (highlightMode === 4) return color(106, 27, 154);
  return color(150);
}

function isHighlighted(num) {
  if (highlightMode === 1) return true; // corresponding: all 8
  if (highlightMode === 2) return (num === 3 || num === 4 || num === 5 || num === 6);
  if (highlightMode === 3) return (num === 1 || num === 2 || num === 7 || num === 8);
  if (highlightMode === 4) return (num === 3 || num === 4 || num === 5 || num === 6);
  return false;
}

function drawLabelSet(cx, cy, angles, labelR) {
  for (let info of angles) {
    let midDeg = info.start + info.sweep / 2;
    let lx = cx + labelR * cos(radians(midDeg));
    let ly = cy + labelR * sin(radians(midDeg));

    let highlighted = highlightMode > 0 && isHighlighted(info.num);

    noStroke();
    textAlign(CENTER, CENTER);

    // Angle number
    fill(highlighted ? '#212121' : '#757575');
    textSize(12);
    textStyle(BOLD);
    text('\u2220' + info.num, lx, ly - 7);

    // Measure
    textSize(10);
    textStyle(NORMAL);
    fill(highlighted ? '#424242' : '#9E9E9E');
    text(info.measure + '\u00B0', lx, ly + 7);
  }
}

function drawHandle() {
  let hp = handlePos();

  let hover = dist(mouseX, mouseY, hp.x, hp.y) < handleRadius * 1.8 || draggingHandle;

  fill(hover ? '#B71C1C' : '#EF5350');
  stroke('#C62828');
  strokeWeight(2);
  circle(hp.x, hp.y, handleRadius * 2);

  // Small rotation arrow icon
  fill(255, 255, 255, 200);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('\u21BB', hp.x, hp.y);
}

function handlePos() {
  let pts = intersections();
  let ext = 140;
  let cosA = cos(radians(transversalAngleDeg));
  let sinA = sin(radians(transversalAngleDeg));
  // Handle at the lower-right end of the transversal
  let hx = pts.x2 + ext * cosA;
  let hy = pts.y2 + ext * sinA;
  hx = constrain(hx, margin, canvasWidth - margin);
  hy = constrain(hy, margin, drawHeight - margin);
  return { x: hx, y: hy };
}

function drawLegend() {
  let legX = canvasWidth - 230;
  let legY = 60;
  let legW = 210;
  let legH = 115;

  fill(255, 255, 255, 230);
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(legX, legY, legW, legH, 8);

  noStroke();
  fill('#424242');
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Angle Relationships:', legX + 12, legY + 8);
  textStyle(NORMAL);
  textSize(10);

  let items = [
    { col: color(COL_CORRESPONDING), label: 'Corresponding: \u2245 (congruent)' },
    { col: color(COL_ALT_INTERIOR),  label: 'Alt. Interior: \u2245 (congruent)' },
    { col: color(COL_ALT_EXTERIOR),  label: 'Alt. Exterior: \u2245 (congruent)' },
    { col: color(COL_SAME_SIDE),     label: 'Same-Side Int: supplementary' }
  ];

  let iy = legY + 30;
  for (let item of items) {
    fill(item.col);
    noStroke();
    rect(legX + 12, iy, 12, 12, 2);
    fill('#424242');
    textAlign(LEFT, TOP);
    text(item.label, legX + 30, iy + 1);
    iy += 20;
  }
}

function drawRelationshipInfo() {
  if (highlightMode === 0) return;

  let a = round(transversalAngleDeg);
  let o = 180 - a;

  let infoX = 20;
  let infoY = drawHeight - 110;
  let infoW = 370;
  let infoH = 95;

  let bgCol, strokeCol, titleCol;
  let title = '';
  let infoLines = [];

  if (highlightMode === 1) {
    bgCol = color(232, 245, 233);
    strokeCol = color(67, 160, 71);
    titleCol = '#2E7D32';
    title = 'Corresponding Angles (congruent)';
    infoLines = [
      '\u22201 \u2245 \u22205 = ' + a + '\u00B0     \u22202 \u2245 \u22206 = ' + o + '\u00B0',
      '\u22203 \u2245 \u22207 = ' + o + '\u00B0     \u22204 \u2245 \u22208 = ' + a + '\u00B0',
      'Same position at each intersection \u2192 CONGRUENT'
    ];
  } else if (highlightMode === 2) {
    bgCol = color(255, 248, 225);
    strokeCol = color(255, 160, 0);
    titleCol = '#E65100';
    title = 'Alternate Interior Angles (congruent)';
    infoLines = [
      '\u22203 \u2245 \u22206 = ' + o + '\u00B0',
      '\u22204 \u2245 \u22205 = ' + a + '\u00B0',
      'Opposite sides, between lines \u2192 CONGRUENT'
    ];
  } else if (highlightMode === 3) {
    bgCol = color(255, 243, 224);
    strokeCol = color(230, 81, 0);
    titleCol = '#BF360C';
    title = 'Alternate Exterior Angles (congruent)';
    infoLines = [
      '\u22201 \u2245 \u22208 = ' + a + '\u00B0',
      '\u22202 \u2245 \u22207 = ' + o + '\u00B0',
      'Opposite sides, outside lines \u2192 CONGRUENT'
    ];
  } else if (highlightMode === 4) {
    bgCol = color(243, 229, 245);
    strokeCol = color(142, 36, 170);
    titleCol = '#6A1B9A';
    title = 'Same-Side Interior Angles (supplementary)';
    infoLines = [
      '\u22203 + \u22205 = ' + o + '\u00B0 + ' + a + '\u00B0 = 180\u00B0',
      '\u22204 + \u22206 = ' + a + '\u00B0 + ' + o + '\u00B0 = 180\u00B0',
      'Same side, between lines \u2192 SUPPLEMENTARY'
    ];
  }

  fill(bgCol);
  stroke(strokeCol);
  strokeWeight(2);
  rect(infoX, infoY, infoW, infoH, 8);

  noStroke();
  fill(titleCol);
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(title, infoX + 12, infoY + 10);
  textStyle(NORMAL);

  fill('#424242');
  textSize(11);
  let ty = infoY + 30;
  for (let l of infoLines) {
    text(l, infoX + 12, ty);
    ty += 19;
  }
}

// ================================================================
//  BUTTONS (canvas-based)
// ================================================================

function buildButtons() {
  buttons = [];
  buttons.push({ label: 'Corresponding',  mode: 1, col: [76, 175, 80],  hoverCol: [56, 142, 60] });
  buttons.push({ label: 'Alt Interior',   mode: 2, col: [255, 193, 7],   hoverCol: [255, 160, 0] });
  buttons.push({ label: 'Alt Exterior',   mode: 3, col: [255, 152, 0],   hoverCol: [230, 81, 0] });
  buttons.push({ label: 'Same-Side Int',  mode: 4, col: [156, 39, 176],  hoverCol: [123, 31, 162] });
  buttons.push({ label: 'Reset',          mode: 0, col: [158, 158, 158], hoverCol: [117, 117, 117] });
}

function drawButtons() {
  let btnCount = buttons.length;
  let totalW = canvasWidth - 60;
  let gap = 10;
  let btnW = (totalW - gap * (btnCount - 1)) / btnCount;
  let btnH = 36;
  let btnY = drawHeight + 16;
  let startX = 30;

  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);

  for (let i = 0; i < btnCount; i++) {
    let b = buttons[i];
    let bx = startX + i * (btnW + gap);

    b.x = bx;
    b.y = btnY;
    b.w = btnW;
    b.h = btnH;

    let hover = mouseX >= bx && mouseX <= bx + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH;
    let active = (highlightMode === b.mode && b.mode !== 0);

    if (active) {
      fill(b.hoverCol[0], b.hoverCol[1], b.hoverCol[2]);
      stroke(0, 0, 0, 80);
      strokeWeight(2);
    } else if (hover) {
      fill(b.col[0], b.col[1], b.col[2], 220);
      stroke(0, 0, 0, 40);
      strokeWeight(1);
    } else {
      fill(b.col[0], b.col[1], b.col[2], 160);
      noStroke();
    }

    rect(bx, btnY, btnW, btnH, 6);

    noStroke();
    fill(255);
    text(b.label, bx + btnW / 2, btnY + btnH / 2);
  }

  textStyle(NORMAL);
}

function drawControlText() {
  noStroke();
  fill('#616161');
  textSize(12);
  textAlign(CENTER, TOP);
  textStyle(NORMAL);

  let modeText = '';
  if (highlightMode === 0) {
    modeText = 'Click a button above to highlight angle relationships';
  } else if (highlightMode === 1) {
    modeText = 'Corresponding angles occupy the same position at each intersection \u2014 congruent (\u2245)';
  } else if (highlightMode === 2) {
    modeText = 'Alternate interior angles: opposite sides of the transversal, between the lines \u2014 congruent (\u2245)';
  } else if (highlightMode === 3) {
    modeText = 'Alternate exterior angles: opposite sides of the transversal, outside the lines \u2014 congruent (\u2245)';
  } else if (highlightMode === 4) {
    modeText = 'Same-side interior angles: same side of the transversal, between the lines \u2014 supplementary (sum = 180\u00B0)';
  }

  text(modeText, canvasWidth / 2, drawHeight + 62);
}

// ================================================================
//  MOUSE INTERACTION
// ================================================================

function mousePressed() {
  // Check handle drag
  let hp = handlePos();
  if (dist(mouseX, mouseY, hp.x, hp.y) < handleRadius * 2) {
    draggingHandle = true;
    return;
  }

  // Check button clicks
  for (let b of buttons) {
    if (b.x !== undefined &&
        mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      highlightMode = b.mode;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingHandle) {
    let pts = intersections();
    let midX = (pts.x1 + pts.x2) / 2;
    let midY = (pts.y1 + pts.y2) / 2;

    // Calculate screen angle from midpoint to mouse
    let dx = mouseX - midX;
    let dy = mouseY - midY;  // screen coords (y down)
    let screenAngle = degrees(atan2(dy, dx)); // 0-360 screen CW from +x
    // The transversal angle a is the screen angle of the lower-right direction.
    // Constrain to 20-80 degrees to keep geometry readable.
    screenAngle = ((screenAngle % 360) + 360) % 360;
    // Accept angles in the lower-right quadrant (0-90)
    // or upper-left quadrant (180-270, which is the opposite direction)
    if (screenAngle > 90 && screenAngle < 180) {
      screenAngle = 80; // clamp
    } else if (screenAngle >= 180 && screenAngle <= 270) {
      screenAngle = screenAngle - 180; // use opposite direction
    } else if (screenAngle > 270) {
      screenAngle = 20; // clamp
    }
    transversalAngleDeg = constrain(screenAngle, 20, 80);
  }
}

function mouseReleased() {
  draggingHandle = false;
}

// ================================================================
//  RESPONSIVE SIZING
// ================================================================

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    canvasWidth = min(canvasWidth, 900);
    canvasWidth = max(canvasWidth, 600);
  }
  canvasHeight = drawHeight + controlHeight;
}
