---
title: Make Lines Parallel
description: An interactive MicroSim where students drag a point to make two lines parallel by matching their slopes on a coordinate grid.
image: /sims/make-lines-parallel/make-lines-parallel.png
og:image: /sims/make-lines-parallel/make-lines-parallel.png
twitter:image: /sims/make-lines-parallel/make-lines-parallel.png
social:
   cards: false
---

# Make Lines Parallel

<iframe src="main.html" height="682px" width="100%" scrolling="no"></iframe>

[Run the Make Lines Parallel MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit on the P5 Editor](https://editor.p5js.org/dmccreary/sketches/2NUiP08gr)

## Description

The Make Lines Parallel MicroSim is an interactive learning activity that helps students understand the fundamental concept that **parallel lines have equal slopes**. Students are presented with two lines on a 10×10 coordinate grid: one fixed blue line and one adjustable blue line with a movable red point.

### How It Works

Students can explore the relationship between slope and parallelism through direct manipulation:

- **Fixed Line**: One blue line remains stationary with both endpoints fixed
- **Adjustable Line**: The second blue line has one fixed black endpoint and one movable red endpoint
- **Drag to Adjust**: Click and drag the red point to any position on the grid (it snaps to grid intersections)
- **Check Your Work**: Click the "Check" button to verify if the lines are parallel
- **Visual Feedback**: A green line animates from the adjustable line to the fixed line over 2 seconds
- **Immediate Results**:
  - If slopes match: "Correct!" appears in green
  - If slopes differ: "Incorrect. Try Again!" appears in red
- **Reset Option**: Click "Reset" to return the adjustable line to its starting position

### Learning Through Interaction

This MicroSim reinforces that:
1. Parallel lines never intersect
2. Parallel lines have identical slopes
3. Slope is calculated as rise over run (Δy/Δx)
4. Adjusting point positions changes the line's slope
5. Visual parallelism corresponds to equal numerical slopes

## Embedding in Your Website

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/make-lines-parallel/main.html" height="682px" width="100%" scrolling="no"></iframe>
```

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Understand** that parallel lines have equal slopes (Bloom's: Understanding)
2. **Apply** the slope formula to determine if lines are parallel (Bloom's: Applying)
3. **Analyze** how changing point positions affects line slope (Bloom's: Analyzing)
4. **Create** parallel lines by manipulating coordinates (Bloom's: Creating)
5. **Evaluate** whether two lines are parallel by comparing their slopes (Bloom's: Evaluating)

## Lesson Plan

### Introduction (5 minutes)
1. Review the concept of slope: m = (y₂ - y₁) / (x₂ - x₁)
2. Discuss what it means for lines to be parallel (same direction, never intersecting)
3. Ask: "What must be true about the slopes of parallel lines?"
4. Introduce the hypothesis: Parallel lines have equal slopes

### Guided Exploration (10 minutes)

**Activity 1: Initial Exploration**
1. Have students load the MicroSim
2. Ask them to observe the current configuration
3. Have them drag the red point randomly and click "Check"
4. Discuss: When did they get "Correct"? When "Incorrect"?

**Activity 2: Calculating Slopes**
1. Have students identify the coordinates of all four points
2. Calculate the slope of the fixed line together:
   - Point 1: (1, 7), Point 2: (7, 3)
   - Slope = (3 - 7) / (7 - 1) = -4 / 6 = -2/3
3. Ask: "Where should we place the red point to make the slopes equal?"

**Activity 3: Testing the Hypothesis**
1. Given the fixed point of line 2 at (3, 6)
2. Calculate where the red point should be for equal slope
3. If we move right 3 units (from x=3 to x=6), how much should we move down?
4. Slope of -2/3 means for every 3 right, go down 2
5. So the red point should be at (6, 4)
6. Test this in the simulation!

### Independent Practice (10 minutes)

Students work individually or in pairs to:

1. **Challenge 1**: Make the lines parallel with the red point in different quadrants
2. **Challenge 2**: Reset and find at least 3 different positions for the red point that make the lines parallel
3. **Challenge 3**: Explain why multiple positions work (hint: all points on a line parallel to the fixed line will work)

### Assessment Questions

1. **Knowledge**: What is the slope formula?
2. **Comprehension**: Why do parallel lines have equal slopes?
3. **Application**: If one line has slope 2/3, and a parallel line passes through (4, 5) and (7, y), what is y?
4. **Analysis**: The fixed line has points at (1, 7) and (7, 3). If the adjustable line's fixed point is at (3, 6), list three possible coordinates for the red point that would make the lines parallel.
5. **Synthesis**: How would you modify this activity to work with perpendicular lines instead?

### Extension Activities

**For Advanced Students:**
1. **Vertical Lines**: What happens with vertical lines? (slope is undefined)
2. **Horizontal Lines**: Create horizontal parallel lines (slope = 0)
3. **Mathematical Proof**: Prove algebraically that if two lines have equal slopes and different y-intercepts, they never intersect
4. **Distance Between Parallels**: Calculate the perpendicular distance between the two parallel lines

**Real-World Connections:**
1. **Architecture**: Parallel lines in building design (window frames, floor tiles)
2. **Transportation**: Railroad tracks, highway lanes
3. **Art**: Perspective drawing and vanishing points
4. **Engineering**: Circuit board traces, structural supports

## Educational Standards Alignment

**Common Core Mathematics Standards:**
- CCSS.MATH.CONTENT.8.EE.B.6: Use similar triangles to explain why the slope m is the same between any two distinct points on a non-vertical line
- CCSS.MATH.CONTENT.HSG.GPE.B.5: Prove the slope criteria for parallel and perpendicular lines

**Bloom's Taxonomy Levels:**
- **Understanding**: Recognizing that parallel lines have equal slopes
- **Applying**: Using slope formula to verify parallelism
- **Analyzing**: Exploring how point positions affect slope
- **Evaluating**: Checking whether lines are parallel
- **Creating**: Constructing parallel lines by positioning points

## Technical Details

- **Framework**: p5.js
- **Canvas Size**: 800×680 pixels (width-responsive)
- **Drawing Area**: 600 pixels high
- **Control Area**: 80 pixels high
- **Grid**: 10×10 units, 50 pixels per unit
- **Coordinate System**: Standard Cartesian (origin at bottom-left of grid)
- **Snap Behavior**: Points snap to grid intersections

## Tips for Educators

1. **Start with Observation**: Have students experiment before calculating slopes
2. **Build Intuition**: Ask students to predict whether lines will be parallel before checking
3. **Connect to Formula**: After hands-on exploration, derive the slope formula together
4. **Multiple Solutions**: Emphasize that many positions create parallel lines
5. **Common Mistakes**: Watch for students confusing slope with y-intercept
6. **Visual Emphasis**: The animation helps students see the relationship between the lines
7. **Incremental Challenge**: Start with making them parallel, then challenge students to explain why

## Differentiation Strategies

**For Struggling Students:**
- Provide slope calculations for the fixed line
- Give coordinate hints for the movable point
- Use graph paper to visualize slope as rise/run
- Start with horizontal or vertical lines (slopes of 0 or undefined)

**For Advanced Students:**
- Ask them to find the equation of both lines in slope-intercept form
- Challenge them to prove algebraically why the slopes must be equal
- Have them calculate the distance between the parallel lines
- Explore what happens with different starting configurations

## Common Misconceptions Addressed

1. **Misconception**: "Parallel lines are just lines that look the same"
   - **Reality**: Parallel lines must have exactly equal slopes (mathematically defined)

2. **Misconception**: "Any two lines that don't intersect are parallel"
   - **Reality**: In Euclidean geometry on a plane, if slopes are equal, they're parallel

3. **Misconception**: "Slope doesn't matter as long as lines don't touch"
   - **Reality**: Equal slopes guarantee parallelism; unequal slopes guarantee intersection

4. **Misconception**: "The lines have to be the same length to be parallel"
   - **Reality**: Length is irrelevant; only direction (slope) matters

## Accessibility Features

- High contrast colors (blue lines, red movable point, black fixed points)
- Large interactive target (16px diameter red point)
- Clear visual feedback (green for correct, red for incorrect)
- Snap-to-grid for precise positioning
- Large text (18pt minimum) readable from distance
- Screen reader support through p5.js describe() function

## Related Concepts

- Slope and rate of change
- Linear equations in slope-intercept form (y = mx + b)
- Perpendicular lines (slopes are negative reciprocals)
- Systems of linear equations
- Geometric transformations (translations maintain parallelism)

## Version History

- v1.0 (2025-11-14): Initial release with interactive parallel line creation and checking

---

*This MicroSim was created to help students develop intuitive and mathematical understanding of parallel lines through hands-on exploration.*
