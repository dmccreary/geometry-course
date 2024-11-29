# Workflow

![](workflow.png)

[Workflow in vis.js](workflow.html)

## Prompt

```linenums="0"
I have a workflow diagram with the following steps:

1. Course Description
2. Concept Enumeration
3. Concept Dependency
4. Concept Taxonomy
5. Concept Graph
6. Content Generation
7. Assessment Generation

Step 2 depends on step 1
Step 3 depends on step 2
Step 4 depends on step 2
Step 5 depends on step 3 and 4
Step 6 depends on step 5
Step 7 depends on step 6

Use (p5.js, vis.js, mermaid) to create a diagram for this workflow using a left-to-right layout. 
Use a rectangle to render each step.
Use different colors as a background for each step.
```

## Response for vis.js

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workflow Diagram with vis.js</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
  <style>
    #mynetwork {
      width: 100%;
      height: 600px;
      border: 1px solid lightgray;
    }
  </style>
</head>
<body>
  <h1>Workflow Diagram</h1>
  <div id="mynetwork"></div>

  <script>
    // Define nodes
    const nodes = new vis.DataSet([
      { id: 1, label: "Course\nDescription", shape: "box", color: { background: "#f9c5d1", border: "#000" }, font: { multi: true, bold: true } },
      { id: 2, label: "Concept\nEnumeration", shape: "box", color: { background: "#fdd686", border: "#000" }, font: { multi: true, bold: true } },
      { id: 3, label: "Concept\nDependency", shape: "box", color: { background: "#b4d8ff", border: "#000" }, font: { multi: true, bold: true } },
      { id: 4, label: "Concept\nTaxonomy", shape: "box", color: { background: "#a5dfaa", border: "#000" }, font: { multi: true, bold: true } },
      { id: 5, label: "Concept\nGraph", shape: "box", color: { background: "#f7a6ff", border: "#000" }, font: { multi: true, bold: true } },
      { id: 6, label: "Content\nGeneration", shape: "box", color: { background: "#ffd9a0", border: "#000" }, font: { multi: true, bold: true } },
      { id: 7, label: "Assessment\nGeneration", shape: "box", color: { background: "#d4a5ff", border: "#000" }, font: { multi: true, bold: true } }
    ]);

    // Define edges
    const edges = new vis.DataSet([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 7 }
    ]);

    // Create a network
    const container = document.getElementById('mynetwork');
    const data = { nodes, edges };
    const options = {
      layout: {
        hierarchical: {
          direction: 'LR', // Left-to-right layout
          sortMethod: 'directed',
          nodeSpacing: 150,
          levelSeparation: 200
        }
      },
      edges: {
        arrows: {
          to: { enabled: true }
        },
        color: "black",
        width: 3
      },
      nodes: {
        shape: "box",
        margin: 5, // Global margin for text inside nodes
        widthConstraint: {
          minimum: 150,  // Set the minimum width (in pixels)
          maximum: 200   // Set the maximum width (in pixels) for fixed width
        },
        heightConstraint: {
          minimum: 100,  // Set the minimum height (in pixels)
          maximum: 100   // Set the maximum height (in pixels) for fixed height
        },
        font: {
          size: 24       // Set the font size (in pixels)
        }
      },
      physics: false // Disable animation for fixed layout
    };
    const network = new vis.Network(container, data, options);
  </script>
</body>
</html>
```

## References

[ChatGPT Transcript](https://chatgpt.com/share/67494ab4-ef4c-8001-91b4-1746b056f2c5)