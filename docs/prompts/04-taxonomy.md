# Taxonomy

!!! note
    All of these steps are now done by the Claude Skill [learning-graph-generator](https://dmccreary.github.io/claude-skills/skill-descriptions/learning-graph-generator/)

## Sample Prompt


!!! prompt
    That was perfect.  Thank you for your excellent results.
    This is going very well.

    Next, I would like you to create a 10-classification taxonomy system to classify each concept.  For example here are some suggestions

    1. Foundational Concepts
    2. Terms and Definitions
    3. Types of Polygons and Shapes
    4. Formulas
    5. Steps in a proof
    6. Application of geometry
    ...
    10. Miscellaneous

    Please consider these as a starting point and list a taxonomy and return your suggestions for a full 10-item classification system.

## Response

Certainly! Based on the concepts covered in the course and your suggestions, here is a 10-classification taxonomy system:

1.  **Foundational Concepts**
2.  **Lines and Angles**
3.  **Triangles**
4.  **Quadrilaterals and Polygons**
5.  **Circles**
6.  **Coordinate Geometry**
7.  **Transformations and Symmetry**
8.  **Solid Geometry**
9.  **Reasoning and Proof**
10.  **Constructions and Tools**

**Descriptions:**

1.  **Foundational Concepts**: Basic elements and definitions that form the groundwork of geometry, such as points, lines, planes, and basic postulates.

2.  **Lines and Angles**: Concepts involving the properties and relationships of lines, segments, rays, and various types of angles.

3.  **Triangles**: Study of triangle properties, classifications, congruence, similarity, and key theorems like the Pythagorean theorem.

4.  **Quadrilaterals and Polygons**: Exploration of four-sided figures and multi-sided polygons, including their properties, classifications, and angle sums.

5.  **Circles**: Concepts related to circles, including chords, tangents, arcs, sectors, and circle theorems.

6.  **Coordinate Geometry**: Application of algebraic principles to geometric problems using the coordinate plane, including equations of lines and circles.

7.  **Transformations and Symmetry**: Movements of figures in the plane, such as translations, rotations, reflections, dilations, and concepts of symmetry and tessellations.

8.  **Solid Geometry**: Study of three-dimensional figures, including prisms, cylinders, pyramids, cones, spheres, and calculations of surface area and volume.

9.  **Reasoning and Proof**: Development of logical thinking through inductive and deductive reasoning, understanding conditional statements, and various proof techniques.

10.  **Constructions and Tools**: Geometric constructions using tools like compass and straightedge, including constructing angles, bisectors, and parallel lines.

I hope this classification system aligns well with the course content and your requirements!

## Workflow

Crafting a taxonomy

I’m creating a 10-classification taxonomy system for 150 concepts. Considering user suggestions and adding new ideas to ensure accuracy and policy compliance.

Charting the course

I’m outlining a 10-classification taxonomy system to categorize concepts, starting with Foundations of Geometry, Lines and Angles, Triangles, and progressing to Three-Dimensional Figures and Constructions. This approach ensures a comprehensive framework.

Mapping the classifications

I'm drafting a 10-item classification system for geometry topics, including foundational concepts, shapes, formulas, proofs, and construction techniques. This ensures a comprehensive and systematic approach.

Organizing geometric topics

I’m piecing together a 10-item classification system for geometry, focusing on foundational concepts, lines, angles, triangles, quadrilaterals, circles, coordinate geometry, transformations, solids, and logic.

Organizing key themes

I’m mapping out a taxonomy for a geometry course, covering foundational concepts, lines and angles, triangles, quadrilaterals, polygons, and circles, with a brief overview of each category.

## Adding the TaxonomyID to the CSV file

```linenums="0"
Thank you.  That was perfect. Now please generate a new CSV file and add one new column called the TaxonomyID.

The new format is:

- Column 1 is the ConceptID from the list above
- Column 2 is the ConceptLabel from the list above
- Column 3 is the Dependencies.  It is a pipe-delimited list of the ConceptIDs that this concept depends on.
- Column 4 is the TaxonomyID.  It matches the number in the taxonomy you re
```

## Key

### Key Prompt

```linenums="0"
please create an HTML table that has the key in it.  Use the following format:

<table>
            <tr>
                <td>Foundation</td>
                <td style="background-color: red; color: white;">Red</td>
            </tr>
            <tr>
                <td>Lines and Angles</td>
                <td style="background-color: orange;">Orange</td>
            </tr>
            <tr>
                <td>Triangles</td>
                <td style="background-color: yellow;">Yellow</td>
            </tr>
```

### ChatGPT Response

```html
<table>
    <tr>
        <td>Foundational Concepts</td>
        <td style="background-color: red; color: white;">Red</td>
    </tr>
    <tr>
        <td>Lines and Angles</td>
        <td style="background-color: orange; color: black;">Orange</td>
    </tr>
    <tr>
        <td>Triangles</td>
        <td style="background-color: yellow; color: black;">Yellow</td>
    </tr>
    <tr>
        <td>Quadrilaterals and Polygons</td>
        <td style="background-color: green; color: white;">Green</td>
    </tr>
    <tr>
        <td>Circles</td>
        <td style="background-color: blue; color: white;">Blue</td>
    </tr>
    <tr>
        <td>Coordinate Geometry</td>
        <td style="background-color: indigo; color: white;">Indigo</td>
    </tr>
    <tr>
        <td>Transformations and Symmetry</td>
        <td style="background-color: violet; color: white;">Violet</td>
    </tr>
    <tr>
        <td>Solid Geometry</td>
        <td style="background-color: brown; color: white;">Brown</td>
    </tr>
    <tr>
        <td>Reasoning and Proof</td>
        <td style="background-color: gray; color: white;">Gray</td>
    </tr>
    <tr>
        <td>Constructions and Tools</td>
        <td style="background-color: black; color: white;">Black</td>
    </tr>
</table>
```