---
name: microsim-p5
description: Create an educational geometry MicroSim using the p5.js JavaScript library. Each MicroSim is a directory located in the /docs/sims folder. It has HTML and JavaScript files that can be referenced with an iframe for embedding in the course documentation.
---
# Educational MicroSim Creation Skill for P5.js - Geometry Course

## Overview

This skill guides the creation of Educational MicroSims using the p5.js JavaScript library for the AI Assisted Geometry Course. MicroSims are lightweight, interactive educational simulations designed for browser-based learning. MicroSims occupy a unique position at the intersection of **Simplicity** (focused scope, transparent code), **Accessibility** (browser-native, universal embedding), and **AI Generation** (standardized patterns, prompt-compatible design).

## Purpose

Educational MicroSims transform abstract geometry concepts into visual, interactive, manipulable experiences that enable students to learn through exploration and experimentation. Each MicroSim addresses specific learning objectives while maintaining the pedagogical rigor and technical quality necessary for educational deployment in high school geometry courses (grades 9-12).

## Development Process

### Step 1: Educational Requirements Specification

Before generating code, articulate the educational purpose:

1. **Geometry Topic**: What specific geometry concept does this simulation teach? (e.g., circle properties, triangle congruence, transformations)
2. **Grade Level**: High School (9-12) - assumes basic algebra knowledge
3. **Learning Objectives**: What should students understand after using this simulation? (Align with Bloom's Taxonomy: Remember, Understand, Apply, Analyze, Evaluate, Create)
4. **Duration**: Typical engagement time (5-15 minutes recommended)
5. **Prerequisites**: What geometry/algebra knowledge must students have before using this?
6. **Assessment Opportunities**: How can educators verify learning?

### Step 2: MicroSim Implementation with p5.js

Generate a self-contained, interactive p5.js simulation following the standardized MicroSim architecture.
The program is width responsive.

#### Folder Structure
Each MicroSim is contained in a folder within the /docs/sims directory. The folder name is $MICROSIM_NAME

```
/docs/sims/$MICROSIM_NAME/
/docs/sims/$MICROSIM_NAME/index.md                      # Main documentation page with iframe and educational content
/docs/sims/$MICROSIM_NAME/$MICROSIM_NAME.html           # HTML5 file with p5.js CDN link
/docs/sims/$MICROSIM_NAME/$MICROSIM_NAME.js             # All the p5.js JavaScript code
/docs/sims/$MICROSIM_NAME/$MICROSIM_NAME.png            # Screenshot for documentation (optional)
```

**Important**: After creating a new MicroSim, update `/mkdocs.yml` navigation to include the new sim under the `MicroSims` section.

1. A new folder will be created in the `/docs/sims` area. The folder name contains only lowercase letters and dashes. This will be the MICROSIM_NAME
2. An `index.md` file will be generated in the folder that describes the MicroSim and contains an iframe reference to the HTML file
3. A small HTML file will contain the title, link to the p5.js library from the CDN and include the JavaScript file
4. The JavaScript file contains all p5.js code following the standardized architecture

## Technical Architecture Standards

### Canvas Structure (REQUIRED)

Every MicroSim must have two regions:

1. Top drawing region with a fixed height called `drawHeight`
2. Controls region below the drawing region that contains buttons and sliders with a fixed height called `controlHeight`

The width of the canvas is resized according to the container. It is set initially, but reset in the draw loop.

You can use this layout pattern:

```javascript
// Canvas dimensions - REQUIRED structure
let canvasWidth = 600;               // Initial width (responsive)
let drawHeight = 400;                // Drawing/simulation area height
let controlHeight = 100;             // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                     // Margin for visual elements
let sliderLeftMargin = 105;          // Left margin for slider positioning
let defaultTextSize = 16;            // Base text size

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  // Note: No canvas.parent() needed for standalone HTML files

  // Create sliders and controls here
  // Position controls relative to drawHeight

  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
}

function draw() {
  // Drawing area (light blue background)
  background('aliceblue');

  // Draw control area background
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Place the title in the top center of the canvas
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  text('Title of MicroSim', canvasWidth/2, 10);

  // Main drawing code here

  // Control labels and values here
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
}
```

### Responsive Design (OPTIONAL but Recommended)

Implement horizontal responsiveness for embedding in various platforms:

```javascript
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  // Update canvasWidth based on window size if needed
  // Reposition all controls to match new width
}
```

### Visual Design Standards

**Color Scheme**:
- Drawing area background: `'aliceblue'`
- Control area background: `'white'`
- Borders: `'silver'`, 1px width
- Interactive elements: Use high-contrast, colorblind-safe colors
- Geometric shapes: Use clear, distinguishable colors

**Typography**:
- Title size: 24-36px
- Default text size: 16px
- Control labels: Bold or clear positioning
- Value displays: Show current parameter values
- Formula displays: Use clear mathematical notation

### Control Patterns

**Horizontal Sliders In Control Region** (for continuous parameters):

```javascript
// Create slider with min, max, default, step
radiusSlider = createSlider(10, 150, 80, 1);
radiusSlider.position(20, canvasHeight - 70);
radiusSlider.size(200);

// In draw()
let radius = radiusSlider.value();
text('Radius: ' + radius.toFixed(1), 230, canvasHeight - 70);
```

**Buttons** (for discrete actions):
```javascript
resetButton = createButton('Reset');
resetButton.position(10, drawHeight + 15);
resetButton.mousePressed(resetSimulation);
```

**Checkboxes** (for toggle options):
```javascript
showGridCheckbox = createCheckbox('Show Grid', false);
showGridCheckbox.position(10, drawHeight + 45);
```

## Geometry-Specific Design Principles

### 1. Visual Clarity
Geometry is inherently visual. Ensure:
- Shapes are clearly visible and well-proportioned
- Grid lines or reference points help students measure
- Colors distinguish different elements (e.g., radius line vs. circle)
- Labels identify key points, angles, or measurements

### 2. Mathematical Accuracy
Display formulas and calculations:
- Show the formula being used (e.g., A = πr²)
- Display step-by-step calculations with current values
- Use proper mathematical notation
- Round values appropriately (usually 1-2 decimal places)

### 3. Interactive Measurement
Allow students to:
- Adjust dimensions with sliders
- See real-time calculations
- Observe how changes affect related measurements
- Compare different geometric properties

### 4. Educational Context
Each MicroSim should include:
- Clear title indicating the concept
- Visible formulas
- Current measurement values
- Labeled geometric elements

## Common Geometry MicroSim Patterns

### Pattern 1: Shape Property Explorer
Students adjust dimensions to explore area, perimeter, or other properties.
**Example**: Circle Area Calculator - adjust radius to see area and circumference

### Pattern 2: Angle Measurement
Students manipulate angles to understand types and relationships.
**Example**: Angle Explorer - adjust rays to form different angle types

### Pattern 3: Theorem Visualization
Students interact with geometric relationships to understand theorems.
**Example**: Pythagorean Theorem - manipulate right triangle sides to verify a² + b² = c²

### Pattern 4: Transformation Explorer
Students apply transformations (translation, rotation, reflection, dilation) to shapes.
**Example**: Transformation MicroSim - apply transformations and observe properties preserved

### Pattern 5: Construction Tool
Students construct geometric figures to understand relationships.
**Example**: Triangle Congruence - manipulate sides and angles to explore SSS, SAS, ASA

## HTML Structure (REQUIRED)

Every MicroSim must be a self-contained HTML file following this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroSim Name - Geometry Course</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        main {
            margin: 20px;
        }
    </style>
</head>
<body>
    <main></main>
    <script src="microsim-name.js"></script>
</body>
</html>
```

## Documentation Structure (index.md)

Each MicroSim's `index.md` should include:

```markdown
# MicroSim Name

![Preview](./microsim-name.png){ width="400" }

[Run the MicroSim](./microsim-name.html){ .md-button .md-button--primary }

## About this MicroSim

Brief description of what the MicroSim teaches.

### Key Concepts

- List of geometry concepts demonstrated

### Learning Objectives

Students will:
1. Objective 1
2. Objective 2
3. Objective 3

### How to Use

1. Step-by-step instructions
2. What to observe
3. What to explore

### Discussion Questions

1. Thought-provoking questions
2. Questions that connect to real-world applications
3. Questions that deepen understanding

### Mathematical Formulas

$$formula1$$

$$formula2$$

## Interactive Example

<iframe src="./microsim-name.html" width="620" height="520" scrolling="no" style="border: 1px solid #ccc;"></iframe>

## Related Concepts

- Links to related MicroSims or chapters
```

## Quality Standards

Every MicroSim must meet these criteria:

### Functionality
- ✅ Runs without errors in modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Controls respond immediately to user input
- ✅ Calculations are mathematically correct
- ✅ Visual elements are clearly visible

### Educational Quality
- ✅ Addresses specific geometry learning objectives
- ✅ Provides meaningful interaction (not just animation)
- ✅ Includes formulas and calculations
- ✅ Accurate geometric representation
- ✅ Appropriate for high school level (grades 9-12)

### Code Quality
- ✅ Follows standardized MicroSim architecture
- ✅ Well-commented and readable
- ✅ Uses meaningful variable names
- ✅ Separated into .html and .js files

### Visual Design
- ✅ Clean, uncluttered interface
- ✅ Consistent color scheme (aliceblue/white)
- ✅ High contrast for readability
- ✅ Professional appearance suitable for classroom use
- ✅ Clear labels and measurements

## Integration with Course

### Adding to Navigation

After creating a MicroSim, update `mkdocs.yml`:

```yaml
  - MicroSims:
    - Introduction: sims/index.md
    # ... other sims ...
    - Your New MicroSim: sims/your-new-microsim/index.md
```

### Linking from Chapters

Reference MicroSims in chapter content:

```markdown
Explore this concept with the [MicroSim Name](../../sims/microsim-name/index.md).
```

## Example: Circle Area Calculator

A complete example demonstrating all principles:

- **Drawing Region**: Shows circle with radius line and center point
- **Controls**: Radius slider (10-150 units)
- **Calculations**: Real-time area (A = πr²) and circumference (C = 2πr)
- **Visual Elements**: Circle fills with semi-transparent blue, red radius line
- **Educational Value**: Students observe quadratic growth of area vs. linear growth of circumference

Location: `/docs/sims/circle-area-calculator/`

## Best Practices

### DO:
- ✅ Focus on ONE geometry concept per MicroSim
- ✅ Show formulas prominently
- ✅ Display real-time calculations
- ✅ Use clear, labeled geometric elements
- ✅ Provide educational context in documentation
- ✅ Test across browsers
- ✅ Use consistent styling with other MicroSims

### DON'T:
- ❌ Create overly complex simulations
- ❌ Hide the mathematical relationships
- ❌ Use poor color contrast
- ❌ Forget to update mkdocs.yml navigation
- ❌ Skip the documentation (index.md)
- ❌ Use uncommented code
- ❌ Make assumptions about student prior knowledge

## Workflow for Creating New MicroSims

1. **Identify Concept**: Choose specific geometry concept from course chapters
2. **Design Interaction**: Determine what students will manipulate
3. **Create Files**: Make directory with .html, .js, and index.md files
4. **Implement Simulation**: Write p5.js code following standards
5. **Add Documentation**: Create comprehensive index.md
6. **Update Navigation**: Add to mkdocs.yml
7. **Test**: Verify in browser and embedded iframe
8. **Screenshot**: Capture image for documentation
9. **Commit**: Push to repository

## Pedagogical Context for Geometry

### Effective Use in Geometry Classroom
- **Visual Learning**: Geometry students benefit from seeing concepts dynamically
- **Parameter Exploration**: Understanding how changing one value affects others
- **Theorem Verification**: Observing mathematical relationships in action
- **Measurement Practice**: Real-time calculation practice
- **Spatial Reasoning**: Developing geometric intuition through manipulation

### Common Geometry Topics for MicroSims
- Circle properties (area, circumference, sector area)
- Triangle properties (area, perimeter, special triangles)
- Angle relationships (complementary, supplementary, vertical)
- Pythagorean theorem and applications
- Trigonometric ratios
- Transformations (translation, rotation, reflection, dilation)
- Polygon properties
- Coordinate geometry
- Similarity and congruence

## Conclusion

Educational MicroSims in the Geometry Course provide students with interactive tools to explore and understand geometric concepts. By following these standards, each MicroSim maintains consistency with the course while providing high-quality, engaging learning experiences.

Remember: Focus on clarity, mathematical accuracy, and educational value. Each MicroSim should help students develop geometric intuition through exploration and experimentation.

---

**For Claude Code**: When creating MicroSims for the geometry course, always follow this skill guide and reference the existing MicroSims in `/docs/sims/` for examples. Maintain consistency with the course structure and pedagogical approach.
