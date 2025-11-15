# Concept Dependency

!!! note
    All of these steps are now done by the Claude Skill [learning-graph-generator](https://dmccreary.github.io/claude-skills/skill-descriptions/learning-graph-generator/)

## Prompt

!!! prompt
    That was very good.
    Let's call the number in front of each concept the ConceptID
    and the string after the number the "ConceptLabel".

    Now our next step is to create a precise concept learning dependency
    graph.  For each concept, create a list of other concepts
    that must be understood before that concept can be mastered.

    Return a CSV file that has the following format:

    - Column 1 is the ConceptID from the list above
    - Column 2 is the ConceptLabel from the list above
    - Column 3 is the Dependencies.  It is a pipe-delimited list of the ConceptIDs that this concept depends on.

    Foundation concepts don't depend on any other concepts.  Their Dependencies is empty.  Some of  initial introductory concepts are foundation concepts.
    There must be at least one concept that depends on a foundation concept.
    Make sure each concept is connected to the graph in some way.


## Sample Response

```csv
ConceptID,ConceptLabel,Dependencies
1,Point,
2,Line,
3,Plane,
4,Angle,6
5,Segment,1|2
6,Ray,1|2
7,Collinear points,1|2
8,Coplanar points,1|3
9,Intersection,2|3
10,Parallel lines,2
11,Perpendicular lines,2
12,Midpoint,5
13,Bisector,5
14,Angle bisector,4|13
15,Perp bisector,5|11
16,Acute angle,4
17,Right angle,4
18,Obtuse angle,4
19,Straight angle,4
20,Reflex angle,4
21,Adjacent angles,4
22,Vertical angles,4
23,Complementary angles,4|16|17
24,Supplementary angles,4|17|18
25,Linear pair,4|21
26,Transversal,2|10
27,Corresponding angles,26|4
28,Alt int angles,26|4
29,Alt ext angles,26|4
30,Same-side int angles,26|4
31,Same-side ext angles,26|4
32,Triangle,5
33,Scalene triangle,32
34,Isosceles triangle,32
35,Equilateral triangle,32
36,Acute triangle,32|16
37,Right triangle,32|17
38,Obtuse triangle,32|18
39,Triangle sum theorem,32
40,Ext angle theorem,32|39
41,Congruent triangles,32
42,SSS congruence,41|5
43,SAS congruence,41|5|4
44,ASA congruence,41|4
45,AAS congruence,41|4
46,HL congruence,41|37|11
47,Triangle inequality,32|5
48,Similar triangles,32
49,AA similarity,48|4
50,SSS similarity,48|5
51,SAS similarity,48|5|4
52,Proportional sides,5
53,Pythagorean theorem,37|5
54,45-45-90 triangle,37|53
55,30-60-90 triangle,37|53
56,Quadrilateral,5
57,Parallelogram,56|10
58,Rectangle,57|11
59,Square,58|60
60,Rhombus,57
61,Trapezoid,56|10
62,Isosceles trapezoid,61
63,Kite,56
64,Properties of parallelogram,57
65,Properties of rectangle,58
66,Properties of rhombus,60
67,Properties of square,59
68,Properties of trapezoid,61
69,Midsegment theorem,32|12
70,Polygon interior angles,5|56
71,Polygon exterior angles,5|56
72,Circle,1
73,Radius,72
74,Diameter,72|73
75,Chord,72
76,Tangent,72|2
77,Secant,72|2
78,Arc,72
79,Central angle,72|4
80,Inscribed angle,72|4
81,Arc length,72|78
82,Sector area,72|79
83,Circumference,72
84,Equation of circle,72|85
85,Distance formula,1
86,Midpoint formula,85
87,Slope,85
88,Slope-intercept form,87
89,Point-slope form,87
90,Standard form (line),87
91,Parallel lines (coord),87|10
92,Perpendicular lines (coord),87|11
93,Reflection,97
94,Rotation,97
95,Translation,97
96,Dilation,97
97,Transformation,
98,Rigid motion,97
99,Isometry,98
100,Symmetry,97
101,Line symmetry,100|2
102,Rotational symmetry,100|94
103,Tessellation,97|5
104,Glide reflection,93|95
105,Composite transformations,97
106,Preimage,97
107,Image,97
108,Vector,95
109,Directed line segment,5|108
110,Component form,108
111,Solid geometry,2|3
112,Prism,111
113,Cylinder,111
114,Pyramid,111
115,Cone,111
116,Sphere,111
117,Surface area (SA),111
118,Volume (Vol),111
119,SA of prism,117|112
120,SA of cylinder,117|113
121,SA of pyramid,117|114
122,SA of cone,117|115
123,SA of sphere,117|116
124,Vol of prism,118|112
125,Vol of cylinder,118|113
126,Vol of pyramid,118|114
127,Vol of cone,118|115
128,Vol of sphere,118|116
129,Nets,111
130,Cross section,111
131,Euler's formula,112|114|129
132,Congruent figures,41
133,Similar figures,48
134,Scale factor,133
135,Inductive reasoning,
136,Deductive reasoning,
137,Conditional statement,
138,Converse,137
139,Inverse,137
140,Contrapositive,137
141,Biconditional,137
142,Proof,135|136|137
143,Two-column proof,142
144,Paragraph proof,142
145,Flowchart proof,142
146,Coordinate proof,85|142
147,Geometric constructions,2|5
148,Compass and straightedge,147
149,Constructing bisectors,148
150,Constructing parallels,148
```

## Workflow

**Crafting the CSV file**

I'm preparing to generate a CSV file with three crucial columns: ConceptID, ConceptLabel, and Dependencies. Foundation concepts have empty Dependencies, some initial concepts are foundations, and each concept links to the graph.

**Mapping dependencies**

I'm organizing 150 concepts into a CSV file, linking each concept to its ConceptID and listing dependencies using pipe-delimited ConceptIDs.

**Ensuring logical progression**

I'm making sure each cell in the CSV file aligns with geometric concepts. Dependencies must progress logically, forming a cohesive and connected graph.

**Categorizing concepts**

I'm mapping out the concepts and identifying how they link together. Next, I'll group them under broader topics for clarity and organization.

**Mapping geometric concepts**

I'm piecing together geometric terms like interior and exterior angles, triangles, congruence, similarity, polygon properties, and circle terms such as radius, diameter, chord, and tangent.

Organizing geometry topics

**Deciphering foundation concepts**

I'm identifying foundational geometric concepts like point, line, plane, segment, ray, and collinear points. Understanding angles might require grasping rays first.

I'm mapping out foundational concepts and their dependencies. Foundational concepts include Point, Line, and Plane. Segment and Ray might be foundational or dependent.

**Shaping the structure**

OK, let me see. I'm working through the CSV rows, pinpointing relationships and nurturing foundational concepts. Progress is steady, making it a rewarding journey.

**Understanding geometric relationships**

I'm mapping out how various geometric concepts depend on types of angles and lines. This exploration highlights the connections between angles, bisectors, and directional lines.

Mapping connections

**Identifying dependencies**

I'm organizing various triangle types and geometric properties by pinpointing key dependencies, such as congruent triangles, segments, and angles, while tracking the progression towards specific geometric conclusions.

**Analyzing geometric relationships**

I'm examining various geometric shapes, including rectangles, squares, triangles, and quadrilaterals, and their relationships with parallel and perpendicular lines, focusing on properties and theorems.

**Mapping relationships**

I'm gathering info on how concepts like diameter and radius interact within circles, then linking them to elements such as chords, tangents, and secants.

**Connecting geometric concepts**

I'm linking the concepts of perpendicular lines, reflection, rotation, translation, dilation, and transformation to their respective formulas and symmetries, creating a cohesive understanding of geometric principles.

**Mapping concepts**

I'm piecing together how concepts like component form, solid geometry, and surface area or volume depend on each other and on prior concepts, creating a logical interconnected structure of knowledge.

Incorporating foundational and specific concepts, the pyramid and cone volumes intrigue me, as do cross sections and Euler's formula. Properties of congruent and similar figures deepen the exploration of geometric principles.

**Compiling dependencies**

I'm working through organizing concepts in a CSV file, detailing each concept's dependencies with ConceptIDs. The goal is to create a structured, informative document for clarity and understanding.

**Synthesizing geometric terms**

Piecing together the geometric terms and concepts, I'm focusing on points, lines, planes, angles, and polygons. Each term is linked to corresponding properties and theorems, forming a comprehensive geometric glossary.

**Revisiting transformations**

I'm rethinking the role of Transformation as a foundational idea, given that it involves mapping figures to others, which requires prior knowledge.