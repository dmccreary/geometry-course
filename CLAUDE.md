# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-assisted geometry course built with MkDocs Material that features interactive learning graphs and MicroSims (micro-simulations). The site is deployed to GitHub Pages and uses p5.js for interactive visualizations. The course covers 12 chapters of high school geometry (grades 9-12) with visual, hands-on demonstrations.

## Development Commands

### Local Development
```bash
# Serve the site locally at http://localhost:8000
mkdocs serve

# Build the site (outputs to ./site directory)
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

### Environment Setup
The project uses Python with MkDocs Material. If setting up from scratch:

```bash
# Using conda (recommended for multi-language projects)
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"

# Alternatively, using pip directly
pip install mkdocs mkdocs-material
```

### Data Processing
```bash
# Convert CSV learning graph data to JSON format for vis.js
python csv-to-json.py
```

## Architecture

### Directory Structure
- `docs/` - All MkDocs content (markdown files, images, CSS, JavaScript)
  - `docs/chapters/` - 12 geometry course chapters
  - `docs/sims/` - MicroSim demonstrations with p5.js sketches
  - `docs/prompts/` - Sample AI prompts used to generate course content
  - `docs/img/` - Images and graphics
  - `docs/css/` - Custom stylesheets
  - `docs/js/` - JavaScript files
- `data/` - Learning graph data (geometry.json contains nodes/edges for concept dependencies)
- `src/` - Utility scripts
  - `src/csv-to-json/` - CSV to JSON conversion for learning graphs
  - `src/latex-cleanup/` - LaTeX processing utilities
- `mkdocs.yml` - Site configuration and navigation structure

### MicroSims (Interactive Simulations)

MicroSims are p5.js sketches that visualize geometry concepts. Each MicroSim typically has:

1. **Structure**: Each sim in `docs/sims/[sim-name]/`
   - `index.md` - Documentation page with iframe embedding
   - `main.html` - Standalone HTML file (ALWAYS use this name for consistency)
   - `[sim-name].js` - p5.js JavaScript code
   - `[sim-name].png` - Screenshot/preview image

2. **Design Conventions**:
   - Controls (sliders, buttons) are placed at the bottom of the canvas
   - Labels and values appear to the left of sliders
   - Minimalistic approach with clean iframes for embedding
   - Canvas typically sized to fit within page layout
   - Uses p5.js library loaded from CDN

3. **Common Pattern**:
   ```javascript
   let slider;

   function setup() {
     createCanvas(windowWidth, windowHeight);
     slider = createSlider(min, max, default, step);
     slider.position(x, windowHeight - 40);
     slider.size(250);
   }

   function draw() {
     background('aliceblue');
     // visualization logic
   }
   ```

4. **Embedding**: MicroSims are embedded using iframe with `main.html`:
   ```html
   <iframe src="main.html" width="100%" height="450px" scrolling="no"></iframe>
   ```

5. **Live Server Preview**: Use VS Code Live Server extension for fast iteration:
   ```
   http://127.0.0.1:5500/docs/sims/[sim-name]/main.html
   ```

### Learning Graph System

The learning graph (`data/geometry.json`) is a vis.js network graph structure:
- **Nodes**: Geometry concepts with id, label, and group (taxonomy category)
- **Edges**: Dependencies between concepts (prerequisite relationships)
- Generated from CSV using `csv-to-json.py` script
- Visualized in `docs/sims/graph-viewer/` using vis.js library

CSV format expects columns: ConceptID, ConceptName, TaxonomyID, Dependencies (pipe-separated IDs)

### MkDocs Configuration

Key configuration in `mkdocs.yml`:
- **Theme**: Material for MkDocs with blue primary, orange accent
- **Features**: Code copy, navigation expansion, path breadcrumbs, footer navigation
- **Markdown Extensions**: Admonition, superfences, syntax highlighting, MathJax for LaTeX
- **Extra JavaScript**: MathJax from CDN for mathematical notation
- **Edit URI**: Points to `blob/master/docs` for "Edit this page" functionality

## Content Creation Workflow

### Adding a New MicroSim

1. Create directory: `docs/sims/[sim-name]/`
2. Create p5.js sketch (typically in p5.js web editor first)
3. Create `main.html` (ALWAYS use this filename) and `[sim-name].js` files
4. Take screenshot for preview image (`[sim-name].png`)
5. Create `index.md` with:
   - Preview image
   - Iframe embedding: `<iframe src="main.html" ...>`
   - Link to run MicroSim fullscreen
   - Link to edit in p5.js editor (optional)
   - Sample prompt used to generate it
   - Description of what it teaches
6. Add to navigation in `mkdocs.yml` under `MicroSims` section

### Adding a New Chapter

1. Create directory: `docs/chapters/[chapter-name]/`
2. Create `index.md` for chapter introduction
3. Add chapter sections as separate markdown files
4. Update navigation in `mkdocs.yml` under `Chapters` section
5. Follow existing chapter structure for consistency

## Important Notes

- **License**: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)
- **Target Audience**: High school students (grades 9-12) with basic algebra background
- **Deployment**: Site deploys to `https://dmccreary.github.io/geometry-course/`
- **p5.js Editor**: Many sims have corresponding sketches at editor.p5js.org/dmccreary
- **Educational Focus**: Maintain clarity, accuracy, and appropriate difficulty level for high school geometry

## File Conventions

- Use lowercase with hyphens for file/directory names (e.g., `angle-explorer`, `pythagorean-theorem`)
- MicroSim HTML files should be self-contained when possible
- Images should be optimized/compressed (use tools like TinyPNG)
- Follow existing markdown frontmatter format for metadata
