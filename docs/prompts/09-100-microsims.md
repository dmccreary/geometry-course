# 100 Geometry MicroSims

!!! prompt
    I am a high-school geometry teacher that has just taken a course in creating 
    interactive simulations and animations using p5.js.  
    
    Please create a list of the top 100 interactive animations (MicroSims) I can create to teach my students various topics in geometry?

    Here is what I want for each of the 100 MicroSim ideas:
    
    I want to you to create a set of ideas for animations or simulations that have controls such as buttons and sliders.  As the student will change the controls so they can interact 
    with illustrative geometry example on the screen change.  For each MicroSim please provide:

    1. The name of the simulation in a level 3 markdown header.
    2. The topics that the students will learn about.
    3. Detailed description of MicroSim
    3. The list of the input controls on the screen and their type (button, slider etc.).
    4. Learning objective of the simulation.
    5. The level of difficulty (beginner, intermediate, advanced)

    For example to illustrate the difference between degrees and radians you might suggest the following example:

    ### Degrees vs. Radians

    Topics: Measuring angles, degrees, radians

    Students will learn how we can use both degrees and radians to measure an angle.  A circle will be place in the center of a drawing region.  As the student moves a slider in the controls
    area a line from the center of the circle will move around the edge of the circle.
    The slider will range from 0 to 360 and move in a clockwise direction.  Arcs of alternating
    colors will appear on the circle circumference to for radian of length 1.

    Input Control: Slider for degree from 0 to 360 with a default value of 45 and an increment of 1 degree.

    Learning Objectives: 
        1. How many degrees are there in a complete circle?  
        2. How many radians are there in a complete circle?
        3. How many degrees are there in 1 radian?

    Difficulty: beginner

## Response

GPT-5

Awesome—love that you’re building a MicroSim arsenal! Here are **100** p5.js-friendly interactive geometry simulation ideas, each with a clear purpose, controls, and difficulty so you can cherry-pick or build a full course arc.

### 1. Degrees vs. Radians

**Topics:** Measuring angles, degrees, radians<br/><br/>
**Description:** Central circle with rotating radius; alternating colored 1‑radian arc marks around the circumference.<br/>
**Input Controls:** Slider (angle 0–360, step 1, default 45)<br/>
**Learning Objectives:** (1) 360° in a circle (2) 2π radians in a circle (3) Convert 1 radian to degrees<br/>
**Difficulty:** Beginner

### 2. Angle Types Explorer

**Topics:** Acute, right, obtuse, straight, reflex<br/>
**Description:** Dynamic angle at a vertex; region labels change by range; color changes with type.<br/>
**Input Controls:** Slider (0–360), Toggle (show/hide type labels)<br/>
**Learning Objectives:** Classify angles by measure; relate measure to type thresholds<br/>
**Difficulty:** Beginner

### 3. Complementary & Supplementary Angles

**Topics:** Angle pairs, linear pairs<br/>
**Description:** Two connected angles share a line; highlight when sums are 90°/180°.<br/>
**Input Controls:** Two sliders (θ1, θ2 with live sum), Button (snap to 90/180)<br/>
**Learning Objectives:** Identify complementary vs. supplementary; compute missing angle<br/>
**Difficulty:** Beginner

### 4. Vertical Angles Visualizer
**Topics:** Vertical angles, congruence<br/>
**Description:** Two intersecting lines; opposite angles track and stay equal.<br/>
**Input Controls:** Sliders (line slopes), Checkbox (show equality marks)<br/>
**Learning Objectives:** Recognize vertical angle congruence; reason from intersection geometry<br/>
**Difficulty:** Beginner

### 5. Angle Bisector Builder

**Topics:** Constructions, angle bisector<br/>
**Description:** Compass-and-straightedge style arcs constructing the bisector.<br/>
**Input Controls:** Slider (angle), Button (animate construction), Checkbox (show loci)<br/>
**Learning Objectives:** Construct and verify a bisector; understand locus of equidistant points to rays<br/>
**Difficulty:** Intermediate

### 6. Triangle Drag Lab

**Topics:** Triangle types, side/angle relationships<br/>
**Description:** Draggable vertices; real‑time classification (scalene/isosceles/equilateral; acute/right/obtuse).<br/>
**Input Controls:** Drag handles (A, B, C), Checkboxes (show side lengths/angles)<br/>
**Learning Objectives:** Classify triangles; observe constraints across drags<br/>
**Difficulty:** Beginner

### 7. Triangle Inequality Tester

**Topics:** Triangle inequality<br/>
**Description:** Three segments with sliders; feedback if construction is possible.<br/>
**Input Controls:** Three sliders (a, b, c), Button (attempt build)<br/>
**Learning Objectives:** Understand and test triangle inequality conditions<br/>
**Difficulty:** Beginner

### 8. SSS Congruence Playground

**Topics:** Triangle congruence (SSS)<br/>
**Description:** Build two triangles from three sides; rotation/translation allowed; congruence check.<br/>
**Input Controls:** Sliders (a,b,c for Δ1; a,b,c for Δ2), Buttons (align, overlay)<br/>
**Learning Objectives:** See that SSS determines a unique triangle up to rigid motion<br/>
**Difficulty:** Intermediate

### 9. SAS Congruence Animator

**Topics:** Triangle congruence (SAS)<br/>
**Description:** Fix two sides and included angle; show uniqueness.<br/>
**Input Controls:** Sliders (side1, side2, included angle), Button (randomize)<br/>
**Learning Objectives:** Understand SAS uniqueness; role of included angle<br/>
**Difficulty:** Intermediate

### 10. ASA/AAS Congruence Explorer

**Topics:** Triangle congruence (ASA, AAS)<br/>
**Description:** Two angles + a side build a triangle; contrasts ASA vs. AAS.<br/>
**Input Controls:** Sliders (A, B, side c), Checkbox (show ambiguity)<br/>
**Learning Objectives:** Why ASA/AAS determine triangles; when ambiguity arises<br/>
**Difficulty:** Intermediate

### 11. SSA Ambiguity (The Ambiguous Case)

**Topics:** Law of sines, SSA non‑congruence<br/>
**Description:** Fix two sides and a non‑included angle; show 0/1/2 solutions.<br/>
**Input Controls:** Sliders (a, b, angle A), Buttons (show both solutions)<br/>
**Learning Objectives:** Recognize ambiguous case; interpret geometric conditions<br/>
**Difficulty:** Intermediate

### 12. Medians & Centroid

**Topics:** Triangle medians, centroid properties<br/>
**Description:** Draw medians; centroid tracks at 2:1 ratio.<br/>
**Input Controls:** Draggable triangle, Checkbox (length ratios), Button (animate medians)<br/>
**Learning Objectives:** Centroid location; median partition ratio<br/>
**Difficulty:** Intermediate

### 13. Perpendicular Bisectors & Circumcenter

**Topics:** Circumcenter, circumscribed circle<br/>
**Description:** Show perpendicular bisectors and circumcircle; note acute/right/obtuse cases.<br/>
**Input Controls:** Draggable triangle, Checkbox (distance to vertices), Toggle (acute/right/obtuse shading)<br/>
**Learning Objectives:** Equidistance to vertices; circumcenter position by triangle type<br/>
**Difficulty:** Intermediate

### 14. Angle Bisectors & Incenter

**Topics:** Incenter, incircle<br/>
**Description:** Angle bisectors intersect; draw incircle tangent to sides.<br/>
**Input Controls:** Draggable triangle, Checkbox (angle bisector rays, tangency points)<br/>
**Learning Objectives:** Equidistance to sides; construct incircle<br/>
**Difficulty:** Intermediate

### 15. Altitudes & Orthocenter

**Topics:** Altitudes, orthocenter<br/>
**Description:** Show altitudes and intersection; track movement with shape.<br/>
**Input Controls:** Draggable triangle, Toggle (extend lines), Checkbox (orthic triangle)<br/>
**Learning Objectives:** Orthocenter location across triangle types<br/>
**Difficulty:** Intermediate

### 16. Euler Line Explorer

**Topics:** Centroid, circumcenter, orthocenter, Euler line<br/>
**Description:** Plot major centers; draw Euler line & ratio relations.<br/>
**Input Controls:** Draggable triangle, Checkbox (show nine‑point circle)<br/>
**Learning Objectives:** Identify triangle centers; relationships along Euler line<br/>
**Difficulty:** Advanced

### 17. Midsegment Theorem

**Topics:** Triangle midsegments, similarity<br/>
**Description:** Connect midpoints; highlight parallelism and 1/2 scaling.<br/>
**Input Controls:** Draggable triangle, Checkbox (show similarity scale)<br/>
**Learning Objectives:** Prove/observe midsegment properties<br/>
**Difficulty:** Beginner

### 18. Interior & Exterior Angle Sum

**Topics:** Triangle angle sum, exterior angle theorem<br/>
**Description:** Angle “unfold” animation; exterior equals sum of two remote interiors.<br/>
**Input Controls:** Draggable triangle, Buttons (unfold, reset)<br/>
**Learning Objectives:** Triangle sums; exterior angle relation<br/>
**Difficulty:** Beginner

### 19. Polygon Angle Sums

**Topics:** Interior/exterior sums, n‑gons<br/>
**Description:** Regular/irregular polygon with variable n; live sums.<br/>
**Input Controls:** Slider (n: 3–12), Checkbox (regular), Button (diagonal triangulation)<br/>
**Learning Objectives:** Derive (n−2)·180°; exterior sum 360°<br/>
**Difficulty:** Beginner

### 20. Regular Polygon Sandbox

**Topics:** Central/inscribed angles, apothem<br/>
**Description:** Regular n‑gon; show radius, apothem, central angle, perimeter.<br/>
**Input Controls:** Slider (n), Slider (radius), Checkbox (show apothem)<br/>
**Learning Objectives:** Connect polygon parameters; area via ½ap<br/>
**Difficulty:** Intermediate

### 21. Parallel Lines & Transversals

**Topics:** Corresponding/alternate interior/exterior angles<br/>
**Description:** Move a transversal; angle pairs highlight equality.<br/>
**Input Controls:** Sliders (line spacing, angle), Checkbox (labels)<br/>
**Learning Objectives:** Identify angle relationships; infer parallelism<br/>
**Difficulty:** Beginner

### 22. Distance & Midpoint in the Plane

**Topics:** Coordinate geometry<br/>
**Description:** Two draggable points; compute distance and midpoint dynamically.<br/>
**Input Controls:** Drag points, Checkbox (grid, formula overlay)<br/>
**Learning Objectives:** Apply distance/midpoint formulas; connect algebra & geometry<br/>
**Difficulty:** Beginner

### 23. Slope as Rate of Change

**Topics:** Slope, rise/run, angle of inclination<br/>
**Description:** Interactive right triangle on a line; slope & angle displayed.<br/>
**Input Controls:** Drag line points, Checkbox (rise/run triangles)<br/>
**Learning Objectives:** Interpret slope geometrically; slope–angle link via tan<br/>
**Difficulty:** Beginner

### 24. Circle Basics (r, d, C, A)

**Topics:** Radius, diameter, circumference, area<br/>
**Description:** Circle with dynamic radius; live formulas.<br/>
**Input Controls:** Slider (radius), Toggle (show sector/segment)<br/>
**Learning Objectives:** Relate r, d, C, A; visualize proportional changes<br/>
**Difficulty:** Beginner

### 25. Arc Length & Sector Area

**Topics:** Circle arc length, sector area<br/>
**Description:** Select central angle; highlight arc & sector.<br/>
**Input Controls:** Sliders (radius, angle), Checkbox (radians/degrees)<br/>
**Learning Objectives:** Compute arc length & sector area from angle units<br/>
**Difficulty:** Beginner

### 26. Inscribed Angles

**Topics:** Inscribed vs. central angles<br/>
**Description:** Move point on circumference; compare inscribed to central angle subtending same arc.<br/>
**Input Controls:** Drag points, Checkbox (double‑angle relation)<br/>
**Learning Objectives:** Inscribed angle is half central; arc dependence<br/>
**Difficulty:** Intermediate

### 27. Cyclic Quadrilaterals

**Topics:** Opposite angles, circle theorems<br/>
**Description:** Quadrilateral with vertices on circle; sums of opposite angles shown.<br/>
**Input Controls:** Drag vertices, Checkbox (show arcs)<br/>
**Learning Objectives:** Opposite angles supplementary; properties of cyclic figures<br/>
**Difficulty:** Intermediate

### 28. Tangent–Radius Perpendicular

**Topics:** Tangents to circles<br/>
**Description:** Tangent line at point of contact; radius perpendicular visible.<br/>
**Input Controls:** Drag tangent point, Slider (radius), Checkbox (perp marker)<br/>
**Learning Objectives:** Tangent ⟂ radius at contact point<br/>
**Difficulty:** Beginner

### 29. Power of a Point

**Topics:** Chords, secants, tangents<br/>
**Description:** External/internal points with chord/secant/tangent products.<br/>
**Input Controls:** Drag point, Checkbox (measure products), Button (random chords)<br/>
**Learning Objectives:** Verify equal products; compare configurations<br/>
**Difficulty:** Advanced

### 30. Thales’ Theorem

**Topics:** Right angles in semicircle<br/>
**Description:** Inscribed angle subtending diameter stays 90°.<br/>
**Input Controls:** Drag point on circle, Checkbox (angle measure)<br/>
**Learning Objectives:** Recognize right triangle in semicircle<br/>
**Difficulty:** Beginner

### 31. Transformations: Translation

**Topics:** Rigid motions, vectors<br/>
**Description:** Shape translated by vector; coordinates update.<br/>
**Input Controls:** Sliders (Δx, Δy), Drag vector tail<br/>
**Learning Objectives:** Map points under translation; preserve distance/angle<br/>
**Difficulty:** Beginner

### 32. Transformations: Rotation

**Topics:** Rotation about a point<br/>
**Description:** Rotate a polygon around a center by θ.<br/>
**Input Controls:** Slider (angle), Drag rotation center, Button (snap 90°)<br/>
**Learning Objectives:** Rotation mapping; orientation and invariants<br/>
**Difficulty:** Beginner

### 33. Transformations: Reflection

**Topics:** Reflection across a line<br/>
**Description:** Reflect a shape across draggable line.<br/>
**Input Controls:** Drag line endpoints, Checkbox (perpendicular distances)<br/>
**Learning Objectives:** Reflection properties; line of symmetry<br/>
**Difficulty:** Beginner

### 34. Transformations: Dilation

**Topics:** Similarity, scale factor<br/>
**Description:** Dilate figure from a center; lengths and area scale.<br/>
**Input Controls:** Slider (scale k), Drag center, Checkbox (area factor k²)<br/>
**Learning Objectives:** Similar figures; scaling effects<br/>
**Difficulty:** Beginner

### 35. Transformations Composition Lab

**Topics:** Composition of isometries<br/>
**Description:** Chain multiple transformations; show resulting mapping.<br/>
**Input Controls:** Buttons (add translate/rotate/reflect), History panel<br/>
**Learning Objectives:** Explore equivalences (e.g., two reflections = rotation)<br/>
**Difficulty:** Intermediate

### 36. Symmetry Finder

**Topics:** Line & rotational symmetry<br/>
**Description:** Test shapes for symmetries; show axes/centers.<br/>
**Input Controls:** Dropdown (shape), Slider (rotation test), Checkbox (axes)<br/>
**Learning Objectives:** Identify symmetry types/order<br/>
**Difficulty:** Beginner

### 37. Tessellation by Regular Polygons

**Topics:** Tiling, angle sums at a point<br/>
**Description:** Try to tile plane with chosen polygon(s); show gaps/overlaps.<br/>
**Input Controls:** Dropdown (polygon), Checkbox (combine shapes), Button (fill)<br/>
**Learning Objectives:** Which regular polygons tessellate and why<br/>
**Difficulty:** Intermediate

### 38. Escher-Style Glide Reflection

**Topics:** Isometries, frieze patterns<br/>
**Description:** Build frieze by glide reflection from a motif.<br/>
**Input Controls:** Draw motif, Buttons (reflect/glide), Slider (glide length)<br/>
**Learning Objectives:** Understand glide reflection and pattern symmetries<br/>
**Difficulty:** Advanced

### 39. Similar Triangles via AA

**Topics:** Triangle similarity<br/>
**Description:** Two triangles with synchronized angles; scale changes.<br/>
**Input Controls:** Sliders (two angles), Slider (scale), Checkbox (ratio display)<br/>
**Learning Objectives:** AA similarity; proportional sides<br/>
**Difficulty:** Beginner

### 40. Right Triangle Similarity (Altitude to Hypotenuse)

**Topics:** Similarity, geometric mean<br/>
**Description:** Drop altitude; show three similar right triangles; geometric mean relations.<br/>
**Input Controls:** Draggable triangle, Checkbox (proportion labels)<br/>
**Learning Objectives:** Proportional segments; mean relationships<br/>
**Difficulty:** Advanced

### 41. Pythagorean Theorem Dissection

**Topics:** Area proofs<br/>
**Description:** Square on each side; sliding dissections to show a²+b²=c².<br/>
**Input Controls:** Slider (a, b), Button (animate proof)<br/>
**Learning Objectives:** Visual area proof; dynamic verification<br/>
**Difficulty:** Beginner

### 42. Pythagorean Triples Explorer

**Topics:** Integer right triangles<br/>
**Description:** Generate triples; plot lattice triangles.<br/>
**Input Controls:** Buttons (next triple), Checkbox (primitive only)<br/>
**Learning Objectives:** Recognize triples; connect number theory & geometry<br/>
**Difficulty:** Intermediate

### 43. Converse of Pythagoras

**Topics:** Triangle classification by sides<br/>
**Description:** Test c² vs a²+b² to classify acute/right/obtuse.<br/>
**Input Controls:** Sliders (a, b, c), Checkbox (classification)<br/>
**Learning Objectives:** Use converse to determine angle type<br/>
**Difficulty:** Beginner

### 44. Trig on the Unit Circle

**Topics:** Sine, cosine, tangent<br/>
**Description:** Rotating radius; project x/y; tangent line length.<br/>
**Input Controls:** Slider (angle), Toggle (degrees/radians)<br/>
**Learning Objectives:** Read sin/cos/tan from geometry<br/>
**Difficulty:** Beginner

### 45. Special Right Triangles

**Topics:** 30‑60‑90 and 45‑45‑90<br/>
**Description:** Templates with scalable hypotenuse; side ratios displayed.<br/>
**Input Controls:** Slider (scale), Buttons (switch triangle type)<br/>
**Learning Objectives:** Memorize/derive special ratios<br/>
**Difficulty:** Beginner

### 46. Law of Sines

**Topics:** Trigonometry in any triangle<br/>
**Description:** Compute a/sinA = b/sinB = c/sinC; visualize circles of equal ratios.<br/>
**Input Controls:** Draggable triangle, Checkbox (ratio bars)<br/>
**Learning Objectives:** Apply law; connect to circumcircle diameter<br/>
**Difficulty:** Intermediate

### 47. Law of Cosines

**Topics:** General triangles<br/>
**Description:** Show c² = a² + b² − 2ab cos C with a dynamic diagram.<br/>
**Input Controls:** Sliders (a,b,C), Checkbox (dot product link)<br/>
**Learning Objectives:** Compute unknowns; relate to Pythagoras at C=90°<br/>
**Difficulty:** Intermediate

### 48. Vector Basics

**Topics:** Vectors, magnitude, direction<br/>
**Description:** Drag vector endpoint; components, magnitude, angle shown.<br/>
**Input Controls:** Drag head, Checkbox (component triangle)<br/>
**Learning Objectives:** Decompose and measure vectors<br/>
**Difficulty:** Beginner

### 49. Vector Addition (Parallelogram & Tip‑to‑Tail)

**Topics:** Vector operations<br/>
**Description:** Two vectors combine; both methods animated.<br/>
**Input Controls:** Drag vectors, Buttons (method), Checkbox (resultant)<br/>
**Learning Objectives:** Equivalence of constructions<br/>
**Difficulty:** Beginner

### 50. Dot Product as Projection

**Topics:** Dot product geometry<br/>
**Description:** Project u on v; scalar projection visual.<br/>
**Input Controls:** Drag u, v; Checkbox (angle, lengths)<br/>
**Learning Objectives:** Interpret uv cosθ; orthogonality test<br/>
**Difficulty:** Intermediate

### 51. Loci of Points

**Topics:** Locus definitions<br/>
**Description:** Animate sets equidistant from points/lines/segments.<br/>
**Input Controls:** Dropdown (locus type), Sliders (distances)<br/>
**Learning Objectives:** Connect constraints to circles, parabolas, strips<br/>
**Difficulty:** Intermediate

### 52. Apollonius Circle

**Topics:** Ratio distances<br/>
**Description:** Points P with |PA|/|PB|=k traced as circle.<br/>
**Input Controls:** Drag A, B; Slider (k)<br/>
**Learning Objectives:** See locus is a circle (k≠1) or perpendicular bisector (k=1)<br/>
**Difficulty:** Advanced

### 53. Polygon Area by Triangulation

**Topics:** Decomposition, area<br/>
**Description:** Draw simple polygon; auto‑triangulate and sum areas.<br/>
**Input Controls:** Click to add vertices; Button (triangulate)<br/>
**Learning Objectives:** Break complex shapes into triangles<br/>
**Difficulty:** Intermediate

### 54. Shoelace Formula Demo

**Topics:** Coordinate area<br/>
**Description:** Compute polygon area via signed sums; show term pairing.<br/>
**Input Controls:** Place vertices; Checkbox (show sums)<br/>
**Learning Objectives:** Apply shoelace; orientation matters<br/>
**Difficulty:** Advanced

### 55. Cavalieri’s Principle (2D→3D intuition)

**Topics:** Area/volume comparison<br/>
**Description:** Sweep parallel slices with equal heights; equal areas/volumes.<br/>
**Input Controls:** Slider (slice), Dropdown (shapes)<br/>
**Learning Objectives:** Compare shapes by cross‑sections<br/>
**Difficulty:** Advanced

### 56. Prisms & Cylinders: Nets & Volume

**Topics:** Surface area, volume<br/>
**Description:** 3D → net unfold; live SA & V.<br/>
**Input Controls:** Dropdown (shape), Sliders (dims), Button (unfold/fold)<br/>
**Learning Objectives:** Compute SA/V; relate nets to surfaces<br/>
**Difficulty:** Beginner

### 57. Pyramids & Cones: Nets & Volume

**Topics:** Surface area, volume<br/>
**Description:** Adjustable slant height; show lateral area and V=⅓Bh.<br/>
**Input Controls:** Sliders (base size, height), Button (unfold)<br/>
**Learning Objectives:** Distinguish base vs. lateral area; volume formula<br/>
**Difficulty:** Intermediate

### 58. Spheres: Great Circles & Caps

**Topics:** Sphere geometry<br/>
**Description:** Slice sphere; show great circle radius and cap area/volume.<br/>
**Input Controls:** Slider (slice height), Checkbox (formulas)<br/>
**Learning Objectives:** Visualize spherical sections; formula intuition<br/>
**Difficulty:** Advanced

### 59. Cross‑Sections of 3D Solids

**Topics:** Planar slices<br/>
**Description:** Cut solids with a plane; see resulting 2D shapes.<br/>
**Input Controls:** Dropdown (solid), Sliders (plane angle/height)<br/>
**Learning Objectives:** Match solids to cross‑sections<br/>
**Difficulty:** Intermediate

### 60. Volume by Rotation (Washers)

**Topics:** Solids of revolution<br/>
**Description:** Rotate region around axis; compute with washers.<br/>
**Input Controls:** Draw function/region; Slider (resolution)<br/>
**Learning Objectives:** Visualize volume integrals (calc preview)<br/>
**Difficulty:** Advanced

### 61. Coordinate Transform: Polar vs. Cartesian

**Topics:** Coordinates, r–θ mapping<br/>
**Description:** Point moves; simultaneously show (x,y) and (r,θ).<br/>
**Input Controls:** Drag point, Checkbox (grid swap)<br/>
**Learning Objectives:** Convert between systems<br/>
**Difficulty:** Beginner

### 62. Parametric Curves (Lissajous)

**Topics:** Parametric motion<br/>
**Description:** Animate tracing with time parameter.<br/>
**Input Controls:** Sliders (ax, ay, phase), Button (play/pause)<br/>
**Learning Objectives:** Interpret parameters geometrically<br/>
**Difficulty:** Intermediate

### 63. Reflection Across Any Line (Coordinate Proof)

**Topics:** Analytical reflection<br/>
**Description:** Reflect a point by formula; compare construction vs. algebra.<br/>
**Input Controls:** Drag line, point; Checkbox (algebra steps)<br/>
**Learning Objectives:** Derive reflection formulas<br/>
**Difficulty:** Advanced

### 64. Rotations by Matrices

**Topics:** Linear transformations<br/>
**Description:** Multiply vectors by rotation matrix; grid deformation.<br/>
**Input Controls:** Slider (θ), Checkbox (matrix display)<br/>
**Learning Objectives:** Matrix–rotation connection<br/>
**Difficulty:** Advanced

### 65. Shear Transformations

**Topics:** Non‑rigid maps, area preservation<br/>
**Description:** Apply shear; track area/perimeter.<br/>
**Input Controls:** Sliders (shear x/y), Checkbox (area calc)<br/>
**Learning Objectives:** Understand shear effects; area invariance<br/>
**Difficulty:** Advanced

### 66. Conic Sections from a Cone

**Topics:** Circle, ellipse, parabola, hyperbola<br/>
**Description:** Adjustable cutting plane angle and position; trace conic.<br/>
**Input Controls:** Sliders (tilt, height), Dropdown (view)<br/>
**Learning Objectives:** How conics arise from slicing a cone<br/>
**Difficulty:** Intermediate

### 67. Parabola as Locus (Focus–Directrix)

**Topics:** Distance equality<br/>
**Description:** Points equidistant from focus and line; draw parabola.<br/>
**Input Controls:** Drag focus & directrix; Checkbox (distance bars)<br/>
**Learning Objectives:** Locus definition of parabola<br/>
**Difficulty:** Advanced

### 68. Ellipse: Sum of Distances

**Topics:** Ellipse definition<br/>
**Description:** Two foci; locus where PF1+PF2 is constant.<br/>
**Input Controls:** Drag foci; Slider (sum), Checkbox (major/minor axes)<br/>
**Learning Objectives:** Ellipse properties and parameters<br/>
**Difficulty:** Advanced

### 69. Hyperbola: Difference of Distances

**Topics:** Hyperbola definition<br/>
**Description:** Locus with |PF1−PF2| constant.<br/>
**Input Controls:** Drag foci; Slider (difference)<br/>
**Learning Objectives:** Branches and asymptotes<br/>
**Difficulty:** Advanced

### 70. Triangle Area via Base–Height

**Topics:** Area formula<br/>
**Description:** Drag base endpoints and height point; area updates.<br/>
**Input Controls:** Drags (base, altitude foot), Checkbox (right angle marker)<br/>
**Learning Objectives:** Area depends on base & height only<br/>
**Difficulty:** Beginner

### 71. Parallelogram Area & Base–Height

**Topics:** Area invariance<br/>
**Description:** Shear a parallelogram; area stays base×height.<br/>
**Input Controls:** Drag vertex, Slider (shear), Checkbox (cut‑paste proof)<br/>
**Learning Objectives:** Invariance under shear<br/>
**Difficulty:** Beginner

### 72. Heron’s Formula

**Topics:** Triangle area from sides<br/>
**Description:** Compute area via s(s−a)(s−b)(s−c) and compare to base–height.<br/>
**Input Controls:** Sliders (a,b,c valid), Button (build triangle)<br/>
**Learning Objectives:** Apply Heron; validate numerically<br/>
**Difficulty:** Advanced

### 73. Circle Chord–Sagitta Relations

**Topics:** Chord length, sagitta, radius<br/>
**Description:** Move chord; show relationships.<br/>
**Input Controls:** Drag chord endpoints, Slider (radius)<br/>
**Learning Objectives:** Connect sagitta to radius & chord<br/>
**Difficulty:** Intermediate

### 74. Inscribed Polygon → Circle Area Limit

**Topics:** Limits intuition<br/>
**Description:** Increase n of regular inscribed polygon; area approaches πr².<br/>
**Input Controls:** Slider (n), Checkbox (error vs. circle area)<br/>
**Learning Objectives:** Approximation and convergence<br/>
**Difficulty:** Intermediate

### 75. Golden Ratio in Geometry

**Topics:** Φ constructions<br/>
**Description:** Construct golden rectangle/spiral; ratio tracking.<br/>
**Input Controls:** Slider (scale), Button (construct), Checkbox (ratio≈1.618)<br/>
**Learning Objectives:** See Φ in lengths and rectangles<br/>
**Difficulty:** Intermediate

### 76. Similarity & Scale in the Plane

**Topics:** Dilations with coordinates<br/>
**Description:** Choose center & factor; track coordinates and lengths/areas.<br/>
**Input Controls:** Drag center, Slider (k), Checkbox (pre‑/image table)<br/>
**Learning Objectives:** Compute images; area scales by k²<br/>
**Difficulty:** Beginner

### 77. Circle Inversions (Intro)

**Topics:** Inversion geometry<br/>
**Description:** Map points through inversion circle; see images of lines/circles.<br/>
**Input Controls:** Slider (inversion radius), Drag point/line/circle<br/>
**Learning Objectives:** Qualitative effects of inversion<br/>
**Difficulty:** Advanced

### 78. Polygon Interior Angle Turning

**Topics:** Exterior angle sum<br/>
**Description:** Walk around polygon; turning angle accumulates to 360°.<br/>
**Input Controls:** Button (walk), Slider (speed), Checkbox (angle accumulator)<br/>
**Learning Objectives:** Exterior angle sum = 360°<br/>
**Difficulty:** Beginner

### 79. Spiral Similarity

**Topics:** Rotation+dilation around a point<br/>
**Description:** Map one segment to another via spiral similarity.<br/>
**Input Controls:** Drag segments; Slider (angle/scale)<br/>
**Learning Objectives:** Combine rotation & dilation about a center<br/>
**Difficulty:** Advanced

### 80. Triangle Centers Locus (Kiepert/Napoleon)

**Topics:** Constructed triangle centers<br/>
**Description:** Equilateral triangles on sides; new centers’ loci.<br/>
**Input Controls:** Draggable base triangle, Checkbox (first/second Napoleon)<br/>
**Learning Objectives:** Explore special centers & configurations<br/>
**Difficulty:** Advanced

### 81. Incircle & Excircles

**Topics:** Angle bisectors, tangency<br/>
**Description:** Show incircle and three excircles; tangent points.<br/>
**Input Controls:** Draggable triangle, Checkboxes (in/excircles)<br/>
**Learning Objectives:** Understand internal vs. external bisectors<br/>
**Difficulty:** Advanced

### 82. Polygon Perimeter vs. Area Trade‑off

**Topics:** Optimization intuition<br/>
**Description:** Fix perimeter; vary shape to see max area (regular).<br/>
**Input Controls:** Slider (n), Drag vertices, Button (regularize)<br/>
**Learning Objectives:** Regular polygon maximizes area for fixed perimeter<br/>
**Difficulty:** Intermediate

### 83. Isoperimetric Experiment (Circle vs. Polygons)

**Topics:** Isoperimetric inequality (visual)<br/>
**Description:** Compare area for fixed perimeter shapes; circle leads.<br/>
**Input Controls:** Draw shape, Button (compute perimeter/area), Checkbox (circle reference)<br/>
**Learning Objectives:** Circle’s optimality intuition<br/>
**Difficulty:** Advanced

### 84. Folding Symmetry (Paper Model)

**Topics:** Reflection, rotational symmetry<br/>
**Description:** Simulate paper folds; mirror images overlay.<br/>
**Input Controls:** Buttons (fold/unfold), Slider (rotation)<br/>
**Learning Objectives:** Symmetry via physical analogies<br/>
**Difficulty:** Beginner

### 85. Perimeter vs. Diameter in Regular n‑gons

**Topics:** Limits to circumference<br/>
**Description:** Compare polygon perimeter to circle circumference.<br/>
**Input Controls:** Slider (n), Checkbox (error plot)<br/>
**Learning Objectives:** Understand polygon → circle limit<br/>
**Difficulty:** Beginner

### 86. Angle Chasing Puzzles

**Topics:** Parallel lines, triangles, circles<br/>
**Description:** Random puzzle generator with hints and dynamic reveals.<br/>
**Input Controls:** Button (new puzzle), Buttons (hint/solve)<br/>
**Learning Objectives:** Practice multi‑step reasoning<br/>
**Difficulty:** Intermediate

### 87. Coordinate Proofs Sandbox

**Topics:** Proof by coordinates<br/>
**Description:** Place points; system checks parallelism, midpoints, slopes.<br/>
**Input Controls:** Place/move points; Checkboxes (properties to prove)<br/>
**Learning Objectives:** Translate geometric claims into algebraic checks<br/>
**Difficulty:** Advanced

### 88. Perpendicular & Angle Bisectors (Construction Mode)

**Topics:** Compass–straightedge constructions<br/>
**Description:** Emulate real tools; steps logged.<br/>
**Input Controls:** Tools palette (compass, straightedge), Button (check steps)<br/>
**Learning Objectives:** Master basic constructions and sequencing<br/>
**Difficulty:** Intermediate

### 89. Rectangle & Rhombus Properties

**Topics:** Parallelogram families<br/>
**Description:** Deform a parallelogram toward rectangle/rhombus/square; property flags.<br/>
**Input Controls:** Drag vertices; Checkboxes (equal angles/sides/diagonals)<br/>
**Learning Objectives:** See family relations & defining properties<br/>
**Difficulty:** Beginner

### 90. Trapezoids & Midsegment

**Topics:** Trapezoid properties<br/>
**Description:** Show midsegment length as average of bases; isosceles traits.<br/>
**Input Controls:** Drag vertices, Checkbox (midsegment math)<br/>
**Learning Objectives:** Compute midsegment; identify isosceles trapezoids<br/>
**Difficulty:** Beginner

### 91. Circle Tangents from External Point

**Topics:** Tangent lengths<br/>
**Description:** From P outside circle, draw two tangents; lengths equal.<br/>
**Input Controls:** Drag P, Slider (radius), Checkbox (length equality)<br/>
**Learning Objectives:** Tangents from a point have equal lengths<br/>
**Difficulty:** Beginner

### 92. Inscribed Polygon Perimeter Convergence

**Topics:** π approximation<br/>
**Description:** Increase n; compare polygon perimeter to circumference.<br/>
**Input Controls:** Slider (n), Checkbox (error %)<br/>
**Learning Objectives:** Numerical approach to π<br/>
**Difficulty:** Beginner

### 93. Polygon Diagonals Counter

**Topics:** Combinatorics in geometry<br/>
**Description:** Show diagonals count n(n−3)/2; draw them.<br/>
**Input Controls:** Slider (n), Checkbox (hide crossings)<br/>
**Learning Objectives:** Derive and verify diagonal formula<br/>
**Difficulty:** Beginner

### 94. Lattice Point Pick’s Theorem

**Topics:** Area on grid polygons<br/>
**Description:** Draw lattice polygon; display interior/boundary counts and area.<br/>
**Input Controls:** Click to place vertices (grid locked), Button (compute)<br/>
**Learning Objectives:** A = I + B/2 − 1<br/>
**Difficulty:** Advanced

### 95. Circle Packing in a Rectangle (Greedy)

**Topics:** Optimization, area density<br/>
**Description:** Place equal circles; show packing density estimate.<br/>
**Input Controls:** Sliders (rows, cols, radius), Button (pack)<br/>
**Learning Objectives:** Explore packing efficiency and limits<br/>
**Difficulty:** Advanced

### 96. Voronoi & Delaunay (Geometry of Nearest Neighbors)

**Topics:** Planar graphs, proximity<br/>
**Description:** Scatter points; show Voronoi cells & Delaunay triangulation.<br/>
**Input Controls:** Click to add/move points; Checkboxes (show/hide structures)<br/>
**Learning Objectives:** Duality and nearest‑neighbor geometry<br/>
**Difficulty:** Advanced

### 97. Perimeter Walk vs. Straight‑Line Distance

**Topics:** Triangle inequality (paths)<br/>
**Description:** Compare path along polyline vs. direct segment.<br/>
**Input Controls:** Draw path points; Button (compare)<br/>
**Learning Objectives:** Path length ≥ straight‑line distance<br/>
**Difficulty:** Beginner

### 98. Circle–Line Intersection Counter

**Topics:** Intersections, discriminant intuition<br/>
**Description:** Move line; display 0/1/2 intersection points.<br/>
**Input Controls:** Drag line, Slider (radius)<br/>
**Learning Objectives:** Visualize intersection cases<br/>
**Difficulty:** Beginner

### 99. Polygon Similarity Tester

**Topics:** Similarity criteria for polygons<br/>
**Description:** Scale/rotate/reflect polygons; compare angle sets and side ratios.<br/>
**Input Controls:** Sliders (scale, rotation), Button (reflect), Checkbox (ratio table)<br/>
**Learning Objectives:** Determine similarity for general polygons<br/>
**Difficulty:** Advanced

### 100. Proof by Counterexample Lab

**Topics:** Conjectures, counterexamples<br/>
**Description:** Present geometric conjectures; students manipulate figures to find counterexamples (or support).<br/>
**Input Controls:** Button (new conjecture), Drags (figure), Button (submit example)<br/>
**Learning Objectives:** Distinguish proof vs. example; power of counterexamples<br/>
**Difficulty:** Intermediate

If you want, I can turn any of these into ready‑to‑run p5.js sketches with a standard UI scaffold (panels, sliders, buttons, and a consistent keyboard shortcut scheme). Which 3 do you want first?
