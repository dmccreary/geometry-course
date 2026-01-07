// Chapter 03: Angles and Relationships - Concept Map
// Interactive vis-network graph showing concept dependencies

// Concept data
const concepts = [
  // Base concept
  { id: 1, label: 'Angle', group: 'base', title: 'A figure formed by two rays sharing a common endpoint (vertex)' },

  // Classification concepts
  { id: 2, label: 'Acute Angle', group: 'classification', title: 'An angle measuring less than 90°' },
  { id: 3, label: 'Right Angle', group: 'classification', title: 'An angle measuring exactly 90°' },
  { id: 4, label: 'Obtuse Angle', group: 'classification', title: 'An angle measuring between 90° and 180°' },
  { id: 5, label: 'Straight Angle', group: 'classification', title: 'An angle measuring exactly 180°' },

  // Relationship concepts
  { id: 6, label: 'Complementary\nAngles', group: 'relationship', title: 'Two angles that add up to 90°' },
  { id: 7, label: 'Supplementary\nAngles', group: 'relationship', title: 'Two angles that add up to 180°' },
  { id: 8, label: 'Adjacent\nAngles', group: 'relationship', title: 'Angles sharing a vertex and a side with no overlap' },
  { id: 9, label: 'Vertical\nAngles', group: 'relationship', title: 'Opposite angles formed by two intersecting lines (always congruent)' },
  { id: 10, label: 'Linear Pair', group: 'relationship', title: 'Adjacent angles whose non-common sides form a straight line' },

  // Advanced concepts
  { id: 11, label: 'Angle Bisector', group: 'advanced', title: 'A ray that divides an angle into two congruent angles' },
  { id: 12, label: 'Corresponding\nAngles', group: 'advanced', title: 'Angles in the same position at each intersection (congruent when lines parallel)' },
  { id: 13, label: 'Alternate Interior\nAngles', group: 'advanced', title: 'Angles on opposite sides of transversal, between parallel lines (congruent)' },
  { id: 14, label: 'Alternate Exterior\nAngles', group: 'advanced', title: 'Angles on opposite sides of transversal, outside parallel lines (congruent)' },
  { id: 15, label: 'Same-Side Interior\nAngles', group: 'advanced', title: 'Angles on same side of transversal, between parallel lines (supplementary)' }
];

// Edge data
const dependencies = [
  // is-a relationships (angle classifications)
  { from: 1, to: 2, label: 'is-a', dashes: false, color: '#1565C0' },
  { from: 1, to: 3, label: 'is-a', dashes: false, color: '#1565C0' },
  { from: 1, to: 4, label: 'is-a', dashes: false, color: '#1565C0' },
  { from: 1, to: 5, label: 'is-a', dashes: false, color: '#1565C0' },

  // uses relationships
  { from: 6, to: 2, label: 'uses', dashes: true, color: '#43A047' },
  { from: 6, to: 3, label: 'uses', dashes: true, color: '#43A047' },
  { from: 7, to: 5, label: 'uses', dashes: true, color: '#43A047' },
  { from: 10, to: 7, label: 'uses', dashes: true, color: '#43A047' },

  // requires relationships
  { from: 8, to: 1, label: 'requires', dashes: [5, 5], color: '#7B1FA2' },
  { from: 9, to: 1, label: 'requires', dashes: [5, 5], color: '#7B1FA2' },
  { from: 10, to: 8, label: 'requires', dashes: [5, 5], color: '#7B1FA2' },
  { from: 11, to: 1, label: 'requires', dashes: [5, 5], color: '#7B1FA2' },

  // formed-by relationships (parallel lines concepts)
  { from: 12, to: 1, label: 'formed-by', dashes: false, color: '#FF9800' },
  { from: 13, to: 1, label: 'formed-by', dashes: false, color: '#FF9800' },
  { from: 14, to: 1, label: 'formed-by', dashes: false, color: '#FF9800' },
  { from: 15, to: 7, label: 'formed-by', dashes: false, color: '#FF9800' }
];

// Network instance
let network = null;

// Initialize the network
function initNetwork() {
  const container = document.getElementById('network-container');

  // Create nodes dataset with styling
  const nodes = new vis.DataSet(concepts.map(c => ({
    id: c.id,
    label: c.label,
    title: c.title,
    group: c.group,
    font: { multi: true }
  })));

  // Create edges dataset
  const edges = new vis.DataSet(dependencies.map(d => ({
    from: d.from,
    to: d.to,
    label: d.label,
    dashes: d.dashes,
    color: { color: d.color, highlight: d.color },
    arrows: 'to',
    font: { size: 10, color: '#666666', strokeWidth: 0 }
  })));

  const data = { nodes, edges };

  const options = {
    groups: {
      base: {
        shape: 'ellipse',
        color: { background: '#9C27B0', border: '#6A1B9A', highlight: { background: '#AB47BC', border: '#6A1B9A' } },
        font: { color: '#FFFFFF', size: 16, bold: true },
        size: 40
      },
      classification: {
        shape: 'box',
        color: { background: '#1976D2', border: '#0D47A1', highlight: { background: '#42A5F5', border: '#0D47A1' } },
        font: { color: '#FFFFFF', size: 12 },
        size: 25
      },
      relationship: {
        shape: 'ellipse',
        color: { background: '#43A047', border: '#2E7D32', highlight: { background: '#66BB6A', border: '#2E7D32' } },
        font: { color: '#FFFFFF', size: 11 },
        size: 30
      },
      advanced: {
        shape: 'diamond',
        color: { background: '#FF9800', border: '#E65100', highlight: { background: '#FFB74D', border: '#E65100' } },
        font: { color: '#FFFFFF', size: 10 },
        size: 35
      }
    },
    nodes: {
      borderWidth: 2,
      shadow: true
    },
    edges: {
      width: 2,
      smooth: {
        type: 'cubicBezier',
        forceDirection: 'vertical',
        roundness: 0.4
      }
    },
    layout: {
      hierarchical: {
        enabled: true,
        direction: 'UD',
        sortMethod: 'directed',
        levelSeparation: 120,
        nodeSpacing: 150,
        treeSpacing: 200
      }
    },
    physics: {
      enabled: false
    },
    interaction: {
      hover: true,
      tooltipDelay: 100,
      navigationButtons: true,
      keyboard: true
    }
  };

  network = new vis.Network(container, data, options);

  // Add click handler
  network.on('click', function(params) {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      highlightConnections(nodeId);
    } else {
      resetHighlight();
    }
  });
}

// Highlight connected nodes
function highlightConnections(nodeId) {
  const allNodes = concepts.map(c => c.id);
  const connectedNodes = network.getConnectedNodes(nodeId);
  connectedNodes.push(nodeId);

  // Update info panel
  const concept = concepts.find(c => c.id === nodeId);
  if (concept) {
    document.getElementById('selected-concept').textContent = concept.label.replace('\n', ' ');
    document.getElementById('concept-definition').textContent = concept.title;
    document.getElementById('info-panel').style.display = 'block';
  }
}

// Reset highlighting
function resetHighlight() {
  document.getElementById('info-panel').style.display = 'none';
}

// Filter functions
function showAll() {
  network.setOptions({ layout: { hierarchical: { enabled: true } } });
  network.fit();
}

function showClassifications() {
  // Highlight only classification-related nodes
  const classificationIds = [1, 2, 3, 4, 5];
  network.selectNodes(classificationIds);
}

function showRelationships() {
  // Highlight only relationship nodes
  const relationshipIds = [6, 7, 8, 9, 10];
  network.selectNodes(relationshipIds);
}

function showAdvanced() {
  // Highlight advanced concepts
  const advancedIds = [11, 12, 13, 14, 15];
  network.selectNodes(advancedIds);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initNetwork);
