#!/usr/bin/env python3
"""
Validate learning-graph.json against learning-graph-schema.json

This script validates the learning graph JSON file to ensure it conforms
to the expected schema and performs additional consistency checks.

Usage:
    python validate-schema.py

Requirements:
    pip install jsonschema
"""

import json
import sys
from pathlib import Path
from jsonschema import validate, ValidationError, Draft7Validator

def load_json_file(filepath):
    """Load and parse a JSON file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in {filepath}: {e}")
        sys.exit(1)

def validate_learning_graph(graph_data, schema_data):
    """Validate the learning graph against the schema."""
    try:
        validate(instance=graph_data, schema=schema_data)
        print("✓ Schema validation passed!")
        return True
    except ValidationError as e:
        print(f"✗ Schema validation failed!")
        print(f"  Error: {e.message}")
        print(f"  Path: {' -> '.join(str(p) for p in e.path)}")
        return False

def check_consistency(graph_data):
    """Perform additional consistency checks beyond schema validation."""
    errors = []
    warnings = []

    # Extract data
    groups = graph_data.get('groups', {})
    nodes = graph_data.get('nodes', [])
    edges = graph_data.get('edges', [])

    # Create sets for efficient lookups
    group_keys = set(groups.keys())
    node_ids = set(node['id'] for node in nodes)

    print("\nPerforming consistency checks...")

    # Check 1: All node groups exist in groups definition
    print("  Checking node groups...")
    for node in nodes:
        node_group = node.get('group')
        if node_group not in group_keys:
            errors.append(f"Node {node['id']} ('{node['label']}') references undefined group: {node_group}")

    # Check 2: All edge endpoints exist in nodes
    print("  Checking edge connections...")
    for i, edge in enumerate(edges):
        from_id = edge.get('from')
        to_id = edge.get('to')

        if from_id not in node_ids:
            errors.append(f"Edge {i} references non-existent source node: {from_id}")
        if to_id not in node_ids:
            errors.append(f"Edge {i} references non-existent target node: {to_id}")

        # Check for self-loops
        if from_id == to_id:
            warnings.append(f"Edge {i} is a self-loop (node {from_id} -> {from_id})")

    # Check 3: No duplicate node IDs
    print("  Checking for duplicate node IDs...")
    node_id_list = [node['id'] for node in nodes]
    if len(node_id_list) != len(set(node_id_list)):
        duplicates = [id for id in node_id_list if node_id_list.count(id) > 1]
        errors.append(f"Duplicate node IDs found: {set(duplicates)}")

    # Check 4: No duplicate edges
    print("  Checking for duplicate edges...")
    edge_tuples = [(edge['from'], edge['to']) for edge in edges]
    if len(edge_tuples) != len(set(edge_tuples)):
        duplicates = [edge for edge in edge_tuples if edge_tuples.count(edge) > 1]
        warnings.append(f"Duplicate edges found: {set(duplicates)}")

    # Check 5: Verify color format in groups
    print("  Checking color formats...")
    for group_name, group_data in groups.items():
        color_obj = group_data.get('color', {})
        if isinstance(color_obj, dict):
            color_value = color_obj.get('color')
            if color_value:
                # Check if it's a hex color or named color
                if color_value.startswith('#') and len(color_value) != 7:
                    warnings.append(f"Group '{group_name}' has potentially invalid hex color: {color_value}")

    # Check 6: Detect potential cycles (simple check - doesn't find all cycles)
    print("  Checking for simple cycles...")
    for edge in edges:
        # Check if reverse edge exists (creates a 2-node cycle)
        reverse_edge = {'from': edge['to'], 'to': edge['from']}
        if (reverse_edge['from'], reverse_edge['to']) in edge_tuples:
            warnings.append(f"Bidirectional edge detected between nodes {edge['from']} and {edge['to']}")

    # Print statistics
    print("\n=== Statistics ===")
    print(f"  Total groups: {len(groups)}")
    print(f"  Total nodes: {len(nodes)}")
    print(f"  Total edges: {len(edges)}")

    # Count nodes per group
    group_counts = {}
    for node in nodes:
        group = node.get('group')
        group_counts[group] = group_counts.get(group, 0) + 1

    print("\n  Nodes per group:")
    for group_key in sorted(group_counts.keys()):
        group_name = groups.get(group_key, {}).get('classifierName', group_key)
        print(f"    {group_name} ({group_key}): {group_counts[group_key]}")

    # Calculate graph metrics
    if nodes:
        avg_edges_per_node = len(edges) / len(nodes)
        print(f"\n  Average edges per node: {avg_edges_per_node:.2f}")

    # Find orphan nodes (nodes with no edges)
    connected_nodes = set()
    for edge in edges:
        connected_nodes.add(edge['from'])
        connected_nodes.add(edge['to'])
    orphan_nodes = node_ids - connected_nodes
    if orphan_nodes:
        print(f"\n  Orphan nodes (no connections): {len(orphan_nodes)}")
        if len(orphan_nodes) <= 5:
            orphan_details = [f"{id} ('{next(n['label'] for n in nodes if n['id'] == id)}') "
                            for id in sorted(orphan_nodes)]
            print(f"    {', '.join(orphan_details)}")

    # Report results
    print("\n=== Consistency Check Results ===")

    if errors:
        print(f"\n✗ Found {len(errors)} error(s):")
        for error in errors:
            print(f"  ERROR: {error}")
    else:
        print("\n✓ No consistency errors found!")

    if warnings:
        print(f"\n⚠ Found {len(warnings)} warning(s):")
        for warning in warnings:
            print(f"  WARNING: {warning}")
    else:
        print("✓ No warnings!")

    return len(errors) == 0

def main():
    """Main function to run validation."""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent

    # Define file paths
    graph_file = script_dir / "learning-graph.json"
    schema_file = script_dir / "learning-graph-schema.json"

    print("Learning Graph Validator")
    print("=" * 50)
    print(f"Graph file: {graph_file}")
    print(f"Schema file: {schema_file}")
    print()

    # Load files
    print("Loading files...")
    graph_data = load_json_file(graph_file)
    schema_data = load_json_file(schema_file)
    print("✓ Files loaded successfully!")
    print()

    # Validate against schema
    print("Validating against schema...")
    schema_valid = validate_learning_graph(graph_data, schema_data)
    print()

    # Perform consistency checks
    consistency_valid = check_consistency(graph_data)

    # Final result
    print("\n" + "=" * 50)
    if schema_valid and consistency_valid:
        print("✓ All validation checks passed!")
        sys.exit(0)
    else:
        print("✗ Validation failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
