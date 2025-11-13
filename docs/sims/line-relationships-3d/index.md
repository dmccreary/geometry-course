---
title: Line Relationships in 3D
description: A 3D WebGL visualization demonstrating parallel, perpendicular, and skew line relationships in three-dimensional space.
image: /sims/line-relationships-3d/line-relationships-3d.png
og:image: /sims/line-relationships-3d/line-relationships-3d.png
twitter:image: /sims/line-relationships-3d/line-relationships-3d.png
social:
   cards: false
---

# Line Relationships in 3D

<iframe src="main.html" height="602px" scrolling="no"></iframe>

[Run the Line Relationships in 3D MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/line-relationships-3d/main.html" height="602px" scrolling="no"></iframe>
```

## Description

This interactive 3D visualization demonstrates three fundamental relationships between lines in three-dimensional space: parallel, perpendicular, and skew lines. Using WebGL rendering, students can rotate and examine a transparent rectangular prism (box) to understand how lines relate to each other in 3D.

**Line Relationships Shown:**

1. **Parallel Lines (Blue)** - Two vertical edges on opposite sides of the box that lie in the same plane, run in the same direction, and never intersect. Labeled as lines "m" and "n" with the parallel symbol (∥).

2. **Perpendicular Lines (Red)** - A vertical edge and a horizontal edge that meet at a corner, forming a 90° angle. Labeled as lines "p" and "q" with the perpendicular symbol (⊥) and a small square indicating the right angle.

3. **Skew Lines (Green)** - A horizontal edge on the front face and a vertical edge on the back face that do not lie in the same plane and never intersect. Labeled as lines "r" and "s" with a dashed line showing the shortest distance between them, emphasizing they are not coplanar.

**Interactive Controls:**

- **Auto-rotate checkbox**: Enable or disable automatic rotation of the 3D box
- **Rotation Speed slider**: Adjust the speed of automatic rotation (0-2)
- **Mouse drag**: Click and drag on the visualization to manually rotate the box and examine line relationships from different angles

## Lesson Plan

### Learning Objectives

Students will be able to:

1. **Identify** parallel, perpendicular, and skew line relationships in 3D space (Bloom's: Understanding)
2. **Distinguish** between coplanar lines (parallel and perpendicular) and non-coplanar lines (skew) (Bloom's: Analyzing)
3. **Visualize** how line relationships differ between 2D and 3D geometry (Bloom's: Understanding)
4. **Apply** knowledge of 3D line relationships to real-world structures like buildings and bridges (Bloom's: Applying)

### Prerequisites

- Understanding of basic line relationships in 2D (parallel and perpendicular)
- Familiarity with 3D coordinate systems and spatial reasoning
- Basic knowledge of angles and right angles (90°)

### Activity Sequence (15-20 minutes)

**1. Introduction (3 minutes)**
- Review 2D line relationships (parallel and perpendicular)
- Pose the question: "What happens to line relationships when we move into 3D space?"
- Introduce the concept of skew lines as unique to 3D geometry

**2. Guided Exploration (7 minutes)**
- Enable auto-rotate and observe the box from multiple angles
- Identify the parallel lines (blue): Point out that they never meet and are in the same plane
- Identify the perpendicular lines (red): Note the 90° angle at their intersection
- Identify the skew lines (green): Emphasize that they never meet AND are not in the same plane

**3. Student Investigation (5 minutes)**

Have students answer these questions while manipulating the visualization:

- Can you find other pairs of parallel lines on the box? (There are multiple pairs of edges)
- Can you find other pairs of perpendicular lines? (Multiple at each corner)
- Why can't we have skew lines in 2D geometry? (2D only has one plane)
- What does the dashed line between the skew lines represent? (Shortest distance between them)

**4. Real-World Connection (3 minutes)**
- Discuss examples of line relationships in architecture:
  - Parallel: Floor joists, railroad tracks
  - Perpendicular: Wall-to-floor connections, building corners
  - Skew: Diagonal bracing in different planes, highway overpasses

**5. Assessment (2 minutes)**
- Show students photos of 3D structures and have them identify examples of each line relationship
- Quick quiz: "True or False - Skew lines can exist in a flat plane." (False)

### Differentiation

**For Advanced Students:**
- Challenge them to calculate the shortest distance between the skew lines using coordinates
- Ask them to find all possible pairs of parallel, perpendicular, and skew edges on the box
- Have them design their own 3D structure with specific line relationships

**For Students Needing Support:**
- Start with just parallel lines, then add perpendicular, then skew
- Provide a physical model (like a cardboard box with colored strings) to manipulate alongside the simulation
- Use the checkbox to pause rotation and examine relationships from a single viewpoint first

### Extension Activities

- Create a scavenger hunt finding examples of each line relationship in the classroom or school building
- Design a 3D structure (bridge, tower, etc.) that demonstrates all three relationships
- Explore how architects and engineers use these relationships in structural design

### Common Misconceptions

- **Misconception**: All non-parallel lines must intersect
  - **Correction**: Use the skew lines to show that lines can be non-parallel without intersecting

- **Misconception**: Skew lines are just parallel lines viewed from a different angle
  - **Correction**: Rotate the box to show that parallel lines always stay equidistant, while skew lines have varying distances

### Technology Notes

- Works best on tablets or computers with WebGL support
- Students can use mouse or trackpad to manually rotate the visualization
- The auto-rotate feature helps students who struggle with manual 3D manipulation
- Color-coded lines (blue, red, green) support color-blind accessibility when combined with labels

### Standards Alignment

This MicroSim supports geometry standards related to:
- Understanding spatial relationships in three dimensions
- Identifying and describing line relationships
- Applying geometric concepts to real-world situations
- Developing spatial reasoning and visualization skills

---

**Note:** Remember to create a screenshot (line-relationships-3d.png) for social media preview when sharing this MicroSim!
