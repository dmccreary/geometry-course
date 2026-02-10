# Logic and Proof

## Summary

This chapter develops your formal reasoning skills through conditional statements, logical equivalence, and various proof techniques essential for geometric argumentation. You'll learn to construct valid mathematical arguments using postulates, theorems, and logical structures. By mastering two-column proofs, paragraph proofs, flow chart proofs, and indirect proofs, you'll gain the tools needed to verify geometric relationships rigorously and communicate mathematical ideas with precision.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Conditional Statement
2. Hypothesis
3. Conclusion
4. Converse
5. Inverse
6. Contrapositive
7. Biconditional Statement
8. Postulate
9. Theorem
10. Proof
11. Two-Column Proof
12. Paragraph Proof
13. Flow Chart Proof
14. Indirect Proof
15. Coordinate Proof

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Geometry](../01-foundations-of-geometry/index.md)

---

## Introduction: The Language of Mathematical Reasoning

!!! mascot-welcome "Let's Figure This Out Together!"

    Welcome to the world of logic and proof! In this chapter, we'll learn
    to think like detectives — building arguments so airtight that no one
    can dispute them. Let's get started!

Imagine you're a detective investigating a crime scene. You collect evidence, follow logical chains of reasoning, and ultimately present a convincing argument about what happened. In geometry, you'll do something remarkably similar! You'll start with basic facts (evidence), apply logical reasoning (investigation), and construct proofs (your case) to demonstrate why geometric relationships are true.

Logic is the foundation of all mathematical reasoning. In this chapter, you'll discover how to build arguments that are not just persuasive, but mathematically undeniable. You'll learn to recognize patterns in statements, transform them into equivalent forms, and construct airtight proofs that would make any detective proud.

The tools you develop here—conditional statements, logical equivalences, and various proof techniques—are your mathematical superpowers. They'll help you understand not just what is true in geometry, but why it must be true. Let's begin with the building blocks of logical reasoning: conditional statements.

## Conditional Statements: The "If-Then" Foundation

A **conditional statement** is a logical statement that has two parts: a hypothesis and a conclusion. It follows the pattern "If P, then Q," where P is the hypothesis and Q is the conclusion.

In everyday language, we use conditional reasoning all the time:

- "If it rains, then I'll bring an umbrella."
- "If you study hard, then you'll do well on the test."
- "If a number is even, then it's divisible by 2."

In geometry, conditional statements become the foundation for building proofs and understanding relationships.

**Formal notation:** We write conditional statements as $p \rightarrow q$, which reads "if p, then q" or "p implies q."

#### Diagram: Conditional Statement Structure

<iframe src="../../sims/conditional-statement-structure/main.html" width="100%" height="402px" scrolling="no"></iframe>

[Run Conditional Statement Structure Fullscreen](../../sims/conditional-statement-structure/main.html)

<details markdown="1">
<summary>Conditional Statement Visual Breakdown</summary>
Type: diagram

Purpose: Illustrate the components of a conditional statement and how they connect

**Learning objective:** Students will be able to identify the hypothesis and conclusion in conditional statements (**Bloom's Taxonomy: Understanding**)

Components to show:
- Large rectangular box divided into two sections
- Left section (light blue): "Hypothesis (p)" with subtitle "The 'IF' part"
- Right section (light green): "Conclusion (q)" with subtitle "The 'THEN' part"
- Arrow connecting left to right labeled "IMPLIES" or "→"
- Example statement at top: "If two angles are vertical, then they are congruent"
- Below example, show breakdown:
  - Hypothesis box: "two angles are vertical"
  - Conclusion box: "they are congruent"

Visual style: Clean block diagram with rounded corners
Colors: Light blue (#B3D9FF) for hypothesis, light green (#C8E6C9) for conclusion
Font: Clear sans-serif, 18pt for main text, 14pt for subtitles

Annotations:
- Small note near hypothesis: "This is the condition or given information"
- Small note near conclusion: "This is what follows or results"

Implementation: Can be created with HTML/CSS or as an SVG graphic
</details>

### Examples of Conditional Statements in Geometry

Let's look at several geometric conditional statements and identify their parts:

1. **If two lines intersect, then they form four angles.**
   - Hypothesis: two lines intersect
   - Conclusion: they form four angles

2. **If a triangle is equilateral, then all three sides are congruent.**
   - Hypothesis: a triangle is equilateral
   - Conclusion: all three sides are congruent

3. **If an angle measures 90°, then it is a right angle.**
   - Hypothesis: an angle measures 90°
   - Conclusion: it is a right angle

Notice how each statement creates a logical connection: when the hypothesis is true, the conclusion must also be true.

### Truth Values of Conditional Statements

A conditional statement can be either **true** or **false**. Interestingly, a conditional statement is considered true in every case except one: when the hypothesis is true but the conclusion is false.

Here's a truth table showing all possibilities:

| Hypothesis (p) | Conclusion (q) | Conditional (p → q) |
|----------------|----------------|---------------------|
| True           | True           | True                |
| True           | False          | **False**           |
| False          | True           | True                |
| False          | False          | True                |

The only way a conditional statement is false is when you have a true hypothesis leading to a false conclusion—this is called a **counterexample**.

!!! mascot-warning "Watch Out!"

    Many students expect a false hypothesis to make the whole conditional
    false — but it doesn't! A conditional is only false when the hypothesis
    is true and the conclusion is false. That single row in the truth table
    trips up almost everyone at first.

**Example:** Consider the statement "If a shape has four sides, then it is a square."

- Hypothesis: a shape has four sides (true for rectangles, rhombuses, trapezoids)
- Conclusion: it is a square (false for most four-sided shapes)
- This statement is **false** because we can find a counterexample: a rectangle has four sides but is not a square.

#### Drawing: Conditional Statement Truth Explorer

<iframe src="../../sims/conditional-truth-explorer/main.html" width="100%" height="502px" scrolling="no"></iframe>

[Run Conditional Truth Explorer Fullscreen](../../sims/conditional-truth-explorer/main.html)

<details markdown="1">
<summary>Interactive Conditional Statement Evaluator</summary>
Type: microsim

**Learning objective:** Students will be able to evaluate the truth value of conditional statements by testing different combinations of hypothesis and conclusion truth values (**Bloom's Taxonomy: Applying**)

Purpose: Allow students to interactively explore when conditional statements are true or false by manipulating truth values

Canvas layout (700x500px):
- Top section (700x350): Visual display area
- Bottom section (700x150): Control panel with light gray background

Visual elements in display area:
- Left side: "Hypothesis (p)" box (200x100) that changes color based on truth value
  - Green (#4CAF50) when true
  - Red (#F44336) when false
- Center: Large arrow (100px wide) pointing right
  - Changes color to match statement truth value
- Right side: "Conclusion (q)" box (200x100) that changes color based on truth value
  - Green when true
  - Red when false
- Top center: Large result display showing "Statement is TRUE" or "Statement is FALSE"
  - Green background when true, red when false
- Bottom: Truth table display showing current row highlighted

Interactive controls (bottom panel):
- Checkbox: "Hypothesis is TRUE" (checked by default)
- Checkbox: "Conclusion is TRUE" (checked by default)
- Button: "Random Example" - generates a random geometric conditional statement
- Display area: Shows current example statement (e.g., "If a triangle has two equal sides, then it is isosceles")

Default parameters:
- Hypothesis: True
- Conclusion: True
- Example: "If two angles are vertical, then they are congruent"

Behavior:
- When checkboxes change, immediately update:
  - Box colors
  - Arrow color
  - Result display
  - Truth table highlighting
- "Random Example" button cycles through 10 different geometric statements:
  1. "If two angles are vertical, then they are congruent" (TRUE)
  2. "If a shape has four sides, then it is a square" (FALSE - counterexample)
  3. "If a triangle is equilateral, then all angles measure 60°" (TRUE)
  4. "If two lines are parallel, then they never intersect" (TRUE)
  5. "If an angle is acute, then it measures less than 90°" (TRUE)
  6. "If a figure is a rectangle, then it has four right angles" (TRUE)
  7. "If a number is divisible by 4, then it's divisible by 8" (FALSE - counterexample)
  8. "If two angles are complementary, then their sum is 90°" (TRUE)
  9. "If a quadrilateral has one pair of parallel sides, then it is a parallelogram" (FALSE - trapezoid counterexample)
  10. "If a triangle has a right angle, then it satisfies the Pythagorean theorem" (TRUE)

Educational notes:
- Display hint: "A conditional is only FALSE when true hypothesis leads to false conclusion"
- When false case is shown, display: "This is a COUNTEREXAMPLE!"

Implementation: p5.js with createCheckbox() and createButton() for controls
Suggested file name: conditional-truth-explorer
</details>

## Related Conditional Statements: Converse, Inverse, and Contrapositive

For every conditional statement, we can create three related statements by rearranging or negating its parts. These related statements have special names and important logical properties.

Given a conditional statement: **If p, then q** (p → q)

We can form:

1. **Converse:** Switch the hypothesis and conclusion
   - If q, then p (q → p)

2. **Inverse:** Negate both the hypothesis and conclusion
   - If not p, then not q (~p → ~q)

3. **Contrapositive:** Switch AND negate both parts
   - If not q, then not p (~q → ~p)

!!! mascot-thinking "Think About It..."

    Here's the big insight: the contrapositive is ALWAYS logically
    equivalent to the original statement. If you ever struggle to prove
    something directly, try proving its contrapositive instead!

Here's the crucial insight: **The contrapositive is always logically equivalent to the original statement.** This means if the original is true, the contrapositive is also true, and vice versa. However, the converse and inverse are NOT necessarily equivalent to the original statement.

### Examples with Geometric Statements

Let's explore these relationships with a concrete example:

**Original statement:** If a quadrilateral is a square, then it has four right angles.
- This is TRUE.

**Converse:** If a quadrilateral has four right angles, then it is a square.
- This is FALSE. (A rectangle has four right angles but isn't necessarily a square.)

**Inverse:** If a quadrilateral is not a square, then it does not have four right angles.
- This is FALSE. (A rectangle is not a square but has four right angles.)

**Contrapositive:** If a quadrilateral does not have four right angles, then it is not a square.
- This is TRUE. (Logically equivalent to the original.)

#### Diagram: Four Related Conditional Statements

<iframe src="../../sims/four-related-conditionals/main.html" width="100%" height="602px" scrolling="no"></iframe>

[Run Four Related Conditionals Fullscreen](../../sims/four-related-conditionals/main.html)

<details markdown="1">
<summary>Visual Map of Conditional Statement Relationships</summary>
Type: diagram

Purpose: Show the four related conditional statements and their logical relationships

**Learning objective:** Students will be able to construct the converse, inverse, and contrapositive of a conditional statement and understand their logical relationships (**Bloom's Taxonomy: Analyzing**)

Layout: 2x2 grid arrangement showing four statements with connecting arrows

Components:
1. Top-left quadrant (light blue box):
   - Label: "ORIGINAL CONDITIONAL"
   - Statement: "If p, then q" (p → q)
   - Example: "If it's a square, then it has 4 right angles"
   - Notation: "✓ TRUE" in green

2. Top-right quadrant (light purple box):
   - Label: "CONVERSE"
   - Statement: "If q, then p" (q → p)
   - Example: "If it has 4 right angles, then it's a square"
   - Notation: "✗ FALSE" in red
   - Note: "Not necessarily equivalent"

3. Bottom-left quadrant (light yellow box):
   - Label: "INVERSE"
   - Statement: "If not p, then not q" (~p → ~q)
   - Example: "If it's not a square, then it doesn't have 4 right angles"
   - Notation: "✗ FALSE" in red
   - Note: "Not necessarily equivalent"

4. Bottom-right quadrant (light green box):
   - Label: "CONTRAPOSITIVE"
   - Statement: "If not q, then not p" (~q → ~p)
   - Example: "If it doesn't have 4 right angles, then it's not a square"
   - Notation: "✓ TRUE" in green
   - Note: "ALWAYS logically equivalent to original!"

Connecting arrows:
- Curved double-headed arrow between original and contrapositive (thick green line)
  - Label: "LOGICALLY EQUIVALENT"
- Curved double-headed arrow between converse and inverse (thin gray line)
  - Label: "Logically equivalent to each other"
- Straight arrow from original to converse (dashed line)
  - Label: "Switch p and q"
- Straight arrow from original to inverse (dashed line)
  - Label: "Negate both"
- Diagonal arrow from original to contrapositive (dashed line)
  - Label: "Switch AND negate"

Visual style: Grid layout with rounded corner boxes
Colors:
- Original: light blue (#BBDEFB)
- Converse: light purple (#E1BEE7)
- Inverse: light yellow (#FFF9C4)
- Contrapositive: light green (#C8E6C9)
- Arrows: green for equivalence (#4CAF50), gray for relationships (#9E9E9E)

Title at top: "The Four Related Conditional Statements"

Legend at bottom:
- Green checkmark: Statement is true
- Red X: Statement is false
- Green double arrow: Logically equivalent (same truth value)

Implementation: SVG diagram or HTML/CSS grid layout
Canvas size: 800x600px
</details>

### The Power of the Contrapositive in Proofs

Understanding the contrapositive is incredibly useful in geometry proofs. Sometimes proving the contrapositive is easier than proving the original statement directly. Since they're logically equivalent, proving one automatically proves the other!

**Example:** Prove that if $n^2$ is even, then $n$ is even.

This can be challenging to prove directly. But the contrapositive is much easier:

**Contrapositive:** If $n$ is odd, then $n^2$ is odd.

We can easily prove this: If $n$ is odd, we can write $n = 2k + 1$ for some integer $k$. Then:

$n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$

This has the form "2 times something plus 1," which is the definition of an odd number. Therefore $n^2$ is odd, proving the contrapositive—and thus proving the original statement!

#### Drawing: Converse, Inverse, Contrapositive Generator

<iframe src="../../sims/conditional-statement-transformer/main.html" width="100%" height="702px" scrolling="no"></iframe>

[Run Conditional Statement Transformer Fullscreen](../../sims/conditional-statement-transformer/main.html)

<details markdown="1">
<summary>Interactive Statement Transformer</summary>
Type: microsim

**Learning objective:** Students will be able to create converse, inverse, and contrapositive statements from any given conditional statement and test their truth values (**Bloom's Taxonomy: Creating**)

Purpose: Allow students to input or select geometric conditional statements and see all four related forms automatically generated with truth value indicators

Canvas layout (800x700px):
- Top section (800x100): Title and input area
- Middle section (800x500): Four boxes showing statements (2x2 grid)
- Bottom section (800x100): Control panel

Visual elements:
- Statement display boxes (350x220 each):
  1. Top-left: Original Conditional (blue border #2196F3)
  2. Top-right: Converse (purple border #9C27B0)
  3. Bottom-left: Inverse (orange border #FF9800)
  4. Bottom-right: Contrapositive (green border #4CAF50)

- Each box contains:
  - Header with statement type name
  - Symbolic form (e.g., "p → q")
  - Verbal form (in colored text)
  - Truth indicator circle (green for true, red for false, gray for unknown)
  - "Example/Counterexample" button when false

- Connecting lines between boxes:
  - Thick green line connecting Original ↔ Contrapositive (labeled "EQUIVALENT")
  - Thin gray line connecting Converse ↔ Inverse (labeled "equivalent to each other")
  - Dashed lines showing transformations

Interactive controls:
- Dropdown menu: "Select Statement" with 10 geometric examples:
  1. "If a triangle is equilateral, then all sides are equal"
  2. "If a quadrilateral is a square, then it has four right angles"
  3. "If two lines are parallel, then they never intersect"
  4. "If an angle measures 90°, then it is a right angle"
  5. "If a figure has four sides, then it is a square" (includes false statements)
  6. "If two angles are vertical, then they are congruent"
  7. "If a triangle has two equal sides, then it is isosceles"
  8. "If a shape is a rectangle, then opposite sides are parallel"
  9. "If an angle is acute, then it measures less than 90°"
  10. "If a polygon has three sides, then it is a triangle"

- Button: "New Random Statement"
- Toggle: "Show connections" (turns on/off the connecting lines)
- Toggle: "Show truth values" (turns on/off the truth indicator circles)

Default parameters:
- Selected statement: #1 (equilateral triangle)
- Show connections: ON
- Show truth values: ON

Behavior:
- When statement selected:
  - Parse hypothesis (p) and conclusion (q)
  - Generate all four forms
  - Display each in its box with appropriate formatting
  - Evaluate truth values (based on preset logic for geometric statements)
  - Draw connecting lines showing relationships
  - Animate highlighting: original → converse → inverse → contrapositive

- When "Example/Counterexample" clicked:
  - Pop up small diagram showing a specific example or counterexample
  - For square example: show rectangle as counterexample to converse

- Color coding animation:
  - When hovering over Original, highlight Contrapositive with green glow
  - When hovering over Converse, highlight Inverse with gray glow

Educational features:
- Hint box: "The contrapositive is ALWAYS equivalent to the original!"
- Challenge mode: Hide truth values and let students predict before revealing
- Score tracker: Counts correct predictions

Implementation: p5.js with DOM elements for controls
Include simple vector graphics for geometric counterexamples
Suggested file name: conditional-statement-transformer
</details>

## Biconditional Statements: The "If and Only If" Connection

Sometimes in geometry, a conditional statement and its converse are both true. When this happens, we can combine them into a single powerful statement called a **biconditional statement**.

A **biconditional statement** uses the phrase "if and only if" (abbreviated "iff") and can be written as:

**p if and only if q** (symbolically: p ↔ q)

This means two things simultaneously:
1. If p, then q (p → q)
2. If q, then p (q → p)

Both directions must be true for the biconditional to be true.

### Examples of Biconditional Statements

1. **A triangle is equilateral if and only if all three sides are congruent.**
   - Forward direction: If a triangle is equilateral, then all three sides are congruent. (TRUE)
   - Reverse direction: If all three sides are congruent, then a triangle is equilateral. (TRUE)
   - Both are true, so the biconditional is TRUE.

2. **An angle measures 90° if and only if it is a right angle.**
   - Forward: If an angle measures 90°, then it is a right angle. (TRUE - by definition)
   - Reverse: If an angle is a right angle, then it measures 90°. (TRUE - by definition)
   - Biconditional is TRUE.

3. **A quadrilateral is a square if and only if it has four right angles.**
   - Forward: If a quadrilateral is a square, then it has four right angles. (TRUE)
   - Reverse: If a quadrilateral has four right angles, then it is a square. (FALSE - rectangles!)
   - Biconditional is FALSE because the converse is false.

Biconditional statements are especially important in mathematics because they represent **definitions** and **characterizations** of geometric objects. When we define something, both directions are always true by construction.

| Statement Type | Symbolic Form | Must Both Directions Be True? |
|----------------|---------------|-------------------------------|
| Conditional    | p → q         | No, only one direction        |
| Biconditional  | p ↔ q         | Yes, both directions          |

## Postulates and Theorems: The Building Blocks of Proof

Now that we understand logical statements, let's explore how geometry builds its foundation of truth. In geometry, we start with basic assumptions that everyone agrees to accept without proof—these are called **postulates** (or axioms). From these postulates, we derive **theorems**, which are statements that can be proven to be true.

### Postulates: The Starting Assumptions

A **postulate** is a statement that we accept as true without proof. Think of postulates as the "rules of the game" that we all agree on before we start playing.

Here are some fundamental postulates in geometry:

1. **Through any two points, there exists exactly one line.**
2. **A line contains at least two points.**
3. **If two points lie in a plane, then the line containing them lies in the plane.**
4. **Through any three non-collinear points, there exists exactly one plane.**

These statements seem obvious and intuitive, which is exactly the point! Postulates are chosen to be self-evident truths that form the foundation for everything else.

#### Diagram: Postulate Visualization Gallery

<iframe src="../../sims/postulate-visualization/main.html" width="100%" height="452px" scrolling="no"></iframe>

[Run Postulate Visualization Gallery Fullscreen](../../sims/postulate-visualization/main.html)

<details markdown="1">
<summary>Visual Representations of Key Postulates</summary>
Type: diagram

Purpose: Illustrate five fundamental geometric postulates with clear visual examples

**Learning objective:** Students will be able to recognize and recall fundamental geometric postulates and their visual representations (**Bloom's Taxonomy: Remembering**)

Layout: Gallery style with 5 panels (2 rows: 3 panels on top, 2 on bottom)

Panel 1 (top-left):
- Postulate: "Through any two points, there exists exactly one line"
- Visual: Two distinct points labeled A and B (red dots)
- Single straight line passing through both points (blue line)
- Small "×" marks on the line showing it extends infinitely
- Annotation: "Only ONE line possible"

Panel 2 (top-center):
- Postulate: "If two points lie in a plane, then the line containing them lies in the plane"
- Visual: Light gray plane (tilted rectangle showing 3D perspective)
- Two points P and Q on the plane (green dots)
- Line through P and Q completely within the plane (green line)
- The plane has subtle grid lines for depth

Panel 3 (top-right):
- Postulate: "Through any three non-collinear points, there exists exactly one plane"
- Visual: Three points R, S, T forming a triangle (purple dots)
- Transparent plane containing all three points (light purple)
- Dashed lines connecting the three points
- Annotation: "Points not on same line → unique plane"

Panel 4 (bottom-left):
- Postulate: "Two lines intersect at exactly one point"
- Visual: Two lines (one red, one blue) crossing
- Intersection point highlighted with yellow circle labeled "X"
- Annotation: "Lines meet at ONE point (if they intersect)"

Panel 5 (bottom-right):
- Postulate: "Parallel Postulate - Through a point not on a line, there is exactly one parallel line"
- Visual: Horizontal line L (blue)
- Point P above the line (red dot)
- Dashed line through P parallel to L (red dashed line)
- Several gray "rejected" lines through P that aren't parallel (crossed out with ×)
- Annotation: "Only ONE parallel through P"

Visual style: Clean, modern diagrams with clear labels
Colors:
- Points: Bright colors (red, green, purple) as solid circles
- Lines: Bold, 3px width
- Planes: Semi-transparent with subtle gradients
- Annotations: Dark gray text, 12pt font

Background: Each panel has light background (#FAFAFA) with thin border
Panel size: 250x200 pixels each
Overall diagram size: 800x450 pixels

Title at top: "Fundamental Geometric Postulates"
Footer note: "These statements are accepted as true without proof"

Implementation: SVG with layered elements for 3D effect on planes
</details>

### Theorems: Proven Truths

A **theorem** is a statement that can be proven using postulates, definitions, and previously proven theorems. Theorems are the "discoveries" we make by logically following the rules (postulates).

Some famous theorems in geometry:

1. **Vertical Angles Theorem:** Vertical angles are congruent.
2. **Triangle Sum Theorem:** The sum of the interior angles of a triangle is 180°.
3. **Pythagorean Theorem:** In a right triangle, $a^2 + b^2 = c^2$.
4. **Isosceles Triangle Theorem:** If two sides of a triangle are congruent, then the angles opposite those sides are congruent.

The beauty of theorems is that once proven, they become tools we can use to prove even more theorems! Geometry becomes a vast interconnected web of logical relationships.

### The Difference Between Postulates and Theorems

| Postulates | Theorems |
|-----------|----------|
| Accepted without proof | Must be proven |
| Basic assumptions | Derived conclusions |
| Starting points | Destinations we reach |
| Foundation | Building constructed on foundation |
| Few in number | Unlimited in number |

## Proofs: Building Mathematical Arguments

A **proof** is a logical argument that uses postulates, definitions, and previously proven theorems to show that a statement is true. Proofs are the heart of geometry—they're how we know with absolute certainty that something is true.

!!! mascot-encourage "You've Got This!"

    Proofs can feel challenging at first, and that's completely normal.
    Every mathematician started exactly where you are now. With practice,
    building proofs becomes as natural as solving equations.

There are several formats for organizing proofs, each with its own advantages. Let's explore the main types.

### The Structure of All Proofs

Regardless of format, every proof has the same essential components:

1. **Given information:** What facts do we start with?
2. **Prove statement:** What are we trying to demonstrate?
3. **Logical steps:** How do we get from given to prove?
4. **Reasons:** Why is each step valid? (postulates, theorems, definitions)

Think of a proof like a journey from "given" (starting location) to "prove" (destination), where each step is a valid move according to the rules of geometry.

#### Diagram: The Anatomy of a Proof

<iframe src="../../sims/anatomy-of-proof/main.html" width="100%" height="402px" scrolling="no"></iframe>

[Run Anatomy of a Proof Fullscreen](../../sims/anatomy-of-proof/main.html)

<details markdown="1">
<summary>Universal Structure of Geometric Proofs</summary>
Type: diagram

Purpose: Show the essential components that all proofs must contain, regardless of format

**Learning objective:** Students will be able to identify the essential components of a geometric proof (**Bloom's Taxonomy: Understanding**)

Layout: Flowchart-style progression from left to right

Components:

1. Left box (light green #C8E6C9):
   - Title: "GIVEN"
   - Icon: Starting flag
   - Description: "Known information"
   - Example content:
     - "∠1 and ∠2 are vertical angles"
     - "Line m ∥ Line n"
     - "△ABC is isosceles with AB ≅ AC"
   - Note: "What you START with"

2. Middle section (light blue #BBDEFB):
   - Title: "LOGICAL STEPS"
   - Icon: Footprints or stepping stones
   - Description: "Series of valid deductions"
   - Visual: Chain of 3-4 connected boxes, each containing:
     - "Statement" (what is true)
     - "Reason" (why it's true)
   - Example box 1: Statement: "m∠1 + m∠2 = 180°" | Reason: "Linear Pair Postulate"
   - Example box 2: Statement: "∠1 ≅ ∠3" | Reason: "Vertical Angles Theorem"
   - Arrows connecting boxes labeled "Therefore..."
   - Note: "Each step MUST be justified"

3. Right box (light purple #E1BEE7):
   - Title: "PROVE (or CONCLUSION)"
   - Icon: Finish flag or trophy
   - Description: "What we want to demonstrate"
   - Example content:
     - "∠1 ≅ ∠2"
     - "△ABC ≅ △DEF"
     - "m∠A + m∠B + m∠C = 180°"
   - Note: "What you END with"

Connecting elements:
- Large arrows between sections (green → blue → purple)
- Top arrow labeled "START"
- Bottom arrow labeled "FINISH"

Supporting elements:
- Toolbox icon in corner listing "Tools Available":
  - Postulates
  - Definitions
  - Previously proven theorems
  - Algebraic properties
  - Logical reasoning rules

Visual style: Modern flowchart with rounded rectangles
Colors: Green for start, blue for journey, purple for destination
Font: Sans-serif, 16pt for headers, 12pt for content

Title above diagram: "Every Proof Has This Structure"
Subtitle: "The format may vary, but these parts are always present"

Dimensions: 900x400 pixels

Implementation: SVG flowchart with clear visual hierarchy
</details>

## Two-Column Proof: The Classic Format

The **two-column proof** is the most traditional and widely used format in geometry. It organizes statements and their justifications into two parallel columns, making the logical flow crystal clear.

**Format:**
- Left column: **Statements** (what we know or can deduce)
- Right column: **Reasons** (why each statement is true)

### Example: Two-Column Proof

**Given:** ∠1 and ∠2 are vertical angles
**Prove:** ∠1 ≅ ∠2

| Statements | Reasons |
|-----------|---------|
| 1. ∠1 and ∠2 are vertical angles | 1. Given |
| 2. ∠1 and ∠3 are a linear pair | 2. Definition of linear pair |
| 3. ∠1 and ∠3 are supplementary | 3. Linear Pair Postulate |
| 4. m∠1 + m∠3 = 180° | 4. Definition of supplementary angles |
| 5. ∠2 and ∠3 are a linear pair | 5. Definition of linear pair |
| 6. ∠2 and ∠3 are supplementary | 6. Linear Pair Postulate |
| 7. m∠2 + m∠3 = 180° | 7. Definition of supplementary angles |
| 8. m∠1 + m∠3 = m∠2 + m∠3 | 8. Transitive Property (steps 4 and 7) |
| 9. m∠1 = m∠2 | 9. Subtraction Property of Equality |
| 10. ∠1 ≅ ∠2 | 10. Definition of congruent angles |

This proof shows the power of the two-column format: each statement builds logically on previous ones, and every step is justified.

### Advantages of Two-Column Proofs

- **Clarity:** The two-column structure makes the logic easy to follow
- **Organization:** Statements and reasons are clearly paired
- **Standard format:** Widely recognized and accepted in mathematics
- **Error checking:** Easy to verify each step has proper justification

#### Drawing: Interactive Two-Column Proof Builder

<iframe src="../../sims/two-column-proof-builder/main.html" width="100%" height="702px" scrolling="no"></iframe>

[Run Two-Column Proof Builder Fullscreen](../../sims/two-column-proof-builder/main.html)

<details markdown="1">
<summary>Drag-and-Drop Proof Construction</summary>
Type: microsim

**Learning objective:** Students will be able to construct valid two-column proofs by sequencing logical statements and matching them with appropriate reasons (**Bloom's Taxonomy: Applying**)

Purpose: Allow students to practice building two-column proofs by dragging statements and reasons into correct order

Canvas layout (900x700px):
- Left panel (300x700): Statement bank
- Center panel (400x700): Proof workspace with two columns
- Right panel (200x700): Reason bank

Visual elements:

**Left panel - Statement Bank:**
- Title: "Statements (drag to proof)"
- Collection of draggable statement cards (280x40 each):
  - Light blue background (#BBDEFB)
  - Rounded corners
  - Text in black, 14pt
- Statements initially in scrambled order
- Each card has subtle shadow and lifts when hovered

**Center panel - Proof Workspace:**
- Title at top: "Two-Column Proof"
- Subtitle: "Given: ∠1 and ∠2 are vertical angles | Prove: ∠1 ≅ ∠2"
- Table with two columns:
  - Left column (220px): "Statements"
  - Right column (170px): "Reasons"
- 10 rows numbered 1-10
- Each cell is a drop zone (changes to light green when draggable hovers over)
- When card placed correctly: green checkmark appears
- When card placed incorrectly: red X appears with shake animation
- Progress bar at bottom showing completion (0-10 steps)

**Right panel - Reason Bank:**
- Title: "Reasons (drag to proof)"
- Collection of draggable reason cards (180x50 each):
  - Light yellow background (#FFF9C4)
  - Rounded corners
  - Text in black, 12pt
- Reasons include:
  - "Given"
  - "Definition of linear pair"
  - "Linear Pair Postulate"
  - "Definition of supplementary angles"
  - "Transitive Property"
  - "Subtraction Property of Equality"
  - "Definition of congruent angles"
  - Plus a few "distractor" reasons that don't belong

Interactive controls (bottom of center panel):
- Button: "Check Proof" - validates entire proof
- Button: "Hint" - highlights next correct statement/reason
- Button: "Reset" - clears workspace
- Button: "New Proof" - loads different proof problem
- Toggle: "Show diagram" - displays relevant geometric figure

Proof problems available (5 different proofs):
1. Vertical Angles Theorem (default)
2. Prove two angles are complementary
3. Prove triangles congruent using SSS
4. Prove alternate interior angles congruent (parallel lines)
5. Prove isosceles triangle has congruent base angles

Default parameters:
- Proof: Vertical Angles Theorem
- Show diagram: ON
- Hint mode: OFF

Behavior:
- Drag statement card from left bank
- Drop into statement column cell
- Drag reason card from right bank
- Drop into corresponding reason column cell
- Card snaps into place if dropped in valid zone
- If correct placement: green checkmark, card locks in place
- If incorrect: red X, card returns to bank with bounce animation
- "Check Proof" button: validates entire proof logic
  - Shows green border around workspace if completely correct
  - Shows red highlights on incorrect steps
- "Hint" button: glows the next correct statement and reason
- "New Proof" button: clears workspace and loads new problem
- Score tracker: counts attempts and time

Educational features:
- Feedback messages:
  - "Great start!"
  - "Check your logical order - this statement needs something before it"
  - "Perfect! This reason correctly justifies the statement"
  - "Almost there - 2 more steps!"
  - "Proof complete! Excellent logical reasoning!"
- Visual diagram updates as proof progresses (if "Show diagram" is ON)
- Celebration animation when proof completed correctly

Implementation: p5.js with drag-and-drop functionality
Use p5.Element for cards and custom collision detection
Save state in arrays for validation logic
Suggested file name: two-column-proof-builder
</details>

## Paragraph Proof: The Essay Format

A **paragraph proof** presents the same logical argument as a two-column proof, but written in paragraph form, like an essay. This format emphasizes the flow of reasoning and is closer to how mathematicians communicate in professional settings.

### Example: Paragraph Proof

**Given:** ∠1 and ∠2 are vertical angles
**Prove:** ∠1 ≅ ∠2

**Proof:**
We are given that ∠1 and ∠2 are vertical angles. By the definition of vertical angles, they are formed by two intersecting lines and are opposite each other. Let's call the other two angles ∠3 and ∠4. By the definition of a linear pair, ∠1 and ∠3 form a linear pair, as do ∠2 and ∠3. According to the Linear Pair Postulate, angles that form a linear pair are supplementary, so m∠1 + m∠3 = 180° and m∠2 + m∠3 = 180°. By the Transitive Property of Equality, since both sums equal 180°, we can write m∠1 + m∠3 = m∠2 + m∠3. Using the Subtraction Property of Equality, we subtract m∠3 from both sides to get m∠1 = m∠2. Finally, by the definition of congruent angles, if two angles have equal measures, then ∠1 ≅ ∠2, which is what we wanted to prove.

### Advantages of Paragraph Proofs

- **Natural flow:** Reads like a story or explanation
- **Professional style:** Similar to how proofs appear in mathematics journals
- **Flexibility:** Can include explanatory comments and insights
- **Less rigid:** Allows for more natural language

### Tips for Writing Paragraph Proofs

1. Start with "Given:" and "Prove:" statements clearly labeled
2. Begin the proof with "We are given that..." or "Since..."
3. Connect each step with transition words: "therefore," "thus," "by the definition of," "it follows that"
4. Explicitly state reasons (theorems, postulates, definitions) as you go
5. End with a clear conclusion: "Therefore..." or "This completes the proof"

## Flow Chart Proof: The Visual Map

A **flow chart proof** uses boxes and arrows to show the logical flow of a proof. It's especially useful for proofs with multiple branches or complex logical dependencies.

**Format:**
- Boxes contain statements
- Arrows show the direction of logical flow
- Reasons are written near the arrows or boxes

#### Diagram: Flow Chart Proof Example

<iframe src="../../sims/flow-chart-proof/main.html" width="100%" height="802px" scrolling="no"></iframe>

[Run Flow Chart Proof Fullscreen](../../sims/flow-chart-proof/main.html)

<details markdown="1">
<summary>Vertical Angles Theorem Flow Chart Proof</summary>
Type: diagram

Purpose: Demonstrate how a proof can be organized as a flow chart with boxes and arrows

**Learning objective:** Students will be able to interpret and create flow chart proofs showing logical dependencies between statements (**Bloom's Taxonomy: Analyzing**)

Layout: Flow chart with boxes connected by arrows, flowing from top to bottom with some branching

Boxes and content:

**Box 1 (top, light green):**
- "∠1 and ∠2 are vertical angles"
- Label: "GIVEN"
- Shape: Rounded rectangle

**Arrow down:** "By definition"

**Box 2 (left branch, light blue):**
- "∠1 and ∠3 form a linear pair"
- Reason below box: "Definition of linear pair"

**Box 3 (right branch, light blue):**
- "∠2 and ∠3 form a linear pair"
- Reason below box: "Definition of linear pair"

**Arrow down from Box 2:** "Linear Pair Postulate"

**Box 4 (left branch, light orange):**
- "∠1 and ∠3 are supplementary"

**Arrow down:**

**Box 5 (left branch, light orange):**
- "m∠1 + m∠3 = 180°"
- Reason: "Definition of supplementary"

**Arrow down from Box 3:** "Linear Pair Postulate"

**Box 6 (right branch, light orange):**
- "∠2 and ∠3 are supplementary"

**Arrow down:**

**Box 7 (right branch, light orange):**
- "m∠2 + m∠3 = 180°"
- Reason: "Definition of supplementary"

**Arrows converge from Box 5 and Box 7:** "Transitive Property"

**Box 8 (center, light purple):**
- "m∠1 + m∠3 = m∠2 + m∠3"
- Reason: "Both equal 180°"

**Arrow down:** "Subtraction Property"

**Box 9 (center, light purple):**
- "m∠1 = m∠2"

**Arrow down:** "Definition of congruent angles"

**Box 10 (bottom, light green):**
- "∠1 ≅ ∠2"
- Label: "PROVED ✓"
- Shape: Rounded rectangle with thicker border

Visual style: Clean flow chart with consistent styling
Box dimensions: 220x60 pixels each
Colors:
- Given/Proved: Light green (#C8E6C9)
- Definition/pair statements: Light blue (#BBDEFB)
- Supplementary statements: Light orange (#FFCCBC)
- Equation statements: Light purple (#E1BEE7)

Arrow style:
- Black, 2px width
- Arrowheads at end
- Reasons written along arrows in italic 12pt font

Layout:
- Top to bottom flow with two parallel branches that converge
- Symmetric branching for parallel logic
- Clear visual hierarchy

Title above: "Flow Chart Proof: Vertical Angles Theorem"

Accompanying diagram (small, in corner):
- Simple drawing of intersecting lines forming angles 1, 2, 3
- Labels showing vertical angles

Dimensions: 700x800 pixels

Implementation: SVG with flowchart layout, or Mermaid diagram syntax
</details>

### Advantages of Flow Chart Proofs

- **Visual clarity:** Shows the structure of logic at a glance
- **Parallel reasoning:** Makes it easy to see when multiple lines of reasoning converge
- **Flexibility:** Can branch and merge as needed
- **Intuitive:** Many students find the visual format easier to understand

### When to Use Flow Chart Proofs

Flow chart proofs are particularly useful when:
- The proof has multiple branches of reasoning
- You want to show how different facts combine to reach a conclusion
- Visualizing the logical dependencies helps understanding
- You're exploring different proof strategies

## Indirect Proof (Proof by Contradiction): Thinking Backwards

An **indirect proof** (also called **proof by contradiction**) takes a clever approach: instead of proving a statement is true directly, we assume it's false and show that this assumption leads to a contradiction. If assuming something is false creates an impossible situation, then it must be true!

### The Strategy of Indirect Proof

**Steps for an indirect proof:**

1. **Assume the opposite** of what you want to prove (assume the conclusion is false)
2. **Use logical reasoning** to derive consequences from this assumption
3. **Find a contradiction** with known facts (postulates, theorems, given information)
4. **Conclude** that the assumption must be false, so the original statement is true

This technique is especially powerful when direct proof is difficult or when you want to prove something is impossible.

### Example: Indirect Proof

**Prove:** If two lines intersect, then they intersect in exactly one point.

**Indirect Proof:**

Assume the opposite: Suppose two lines intersect in more than one point. Call these lines $l$ and $m$, and suppose they intersect at points $P$ and $Q$, where $P \neq Q$.

By the postulate "Through any two points, there exists exactly one line," there is only one line passing through points $P$ and $Q$.

But we assumed both line $l$ and line $m$ pass through points $P$ and $Q$. This means $l$ and $m$ are the same line.

This contradicts our initial statement that $l$ and $m$ are two different lines.

Therefore, our assumption must be false. We conclude that two lines cannot intersect in more than one point—they intersect in exactly one point.

#### Drawing: Indirect Proof Contradiction Finder

<iframe src="../../sims/indirect-proof-explorer/main.html" width="100%" height="652px" scrolling="no"></iframe>

[Run Indirect Proof Explorer Fullscreen](../../sims/indirect-proof-explorer/main.html)

<details markdown="1">
<summary>Interactive Proof by Contradiction Explorer</summary>
Type: microsim

**Learning objective:** Students will be able to construct indirect proofs by identifying assumptions, deriving consequences, and finding contradictions (**Bloom's Taxonomy: Evaluating**)

Purpose: Guide students through the process of indirect proof by helping them identify which assumption to make and where the contradiction appears

Canvas layout (800x650px):
- Top section (800x100): Problem statement and instructions
- Middle section (800x400): Visual proof workspace with 4 stages
- Bottom section (800x150): Control panel and feedback

Visual elements:

**Top section:**
- Problem displayed in large text box
- Example: "Prove: If two lines intersect, they intersect at exactly one point"
- Button: "Show direct proof comparison" (toggled off by default)

**Middle section - Four-stage flow:**

**Stage 1 (left, 180x350):**
- Title: "1. ASSUME OPPOSITE"
- Background: Light red (#FFCDD2)
- Box showing negation of conclusion
- Example: "Assume: Two lines intersect at MORE THAN ONE point"
- Icon: Crossed-out conclusion
- Status indicator: "Assumption made ⚠️"

**Arrow pointing right:** "This assumption leads to..."

**Stage 2 (center-left, 180x350):**
- Title: "2. DERIVE CONSEQUENCES"
- Background: Light orange (#FFE0B2)
- List of logical steps following from assumption
- Example consequences:
  - "Lines l and m both pass through points P and Q"
  - "Two distinct points P and Q exist on both lines"
- Icon: Chain of reasoning
- Status indicator: "Following the logic..."

**Arrow pointing right:** "But this means..."

**Stage 3 (center-right, 180x350):**
- Title: "3. FIND CONTRADICTION"
- Background: Light yellow (#FFF9C4)
- Box showing contradictory statements side by side:
  - Left: "Postulate: Exactly ONE line through two points"
  - Right: "Our consequence: TWO lines through P and Q"
- Large "⚡" or "💥" icon between them
- Highlighting showing the clash
- Status indicator: "CONTRADICTION found! ⚠️"

**Arrow pointing right:** "Therefore..."

**Stage 4 (right, 180x350):**
- Title: "4. CONCLUDE TRUTH"
- Background: Light green (#C8E6C9)
- Box showing original statement confirmed
- Example: "✓ Two lines intersect at EXACTLY ONE point"
- Icon: Checkmark or trophy
- Status indicator: "Original statement is TRUE"

Interactive controls (bottom panel):
- Dropdown: "Select proof problem" with 5 options:
  1. "Two lines intersect at exactly one point" (default)
  2. "There are infinitely many prime numbers"
  3. "√2 is irrational"
  4. "Vertical angles are congruent"
  5. "If two parallel lines are cut by a transversal, alternate interior angles are congruent"

- Button: "Step Forward" - advances through stages one at a time
- Button: "Step Back" - returns to previous stage
- Button: "Restart" - goes back to stage 1
- Button: "Auto-Play" - animates through all stages with 2-second delays
- Slider: "Animation speed" (1-5 seconds per stage)

**Challenge mode controls:**
- Toggle: "Challenge Mode" (OFF by default)
- In challenge mode:
  - Stage 2 consequences are scrambled
  - Students must drag correct consequences into order
  - Stage 3 requires students to identify which postulate/theorem is contradicted
  - Dropdown menu: "Select contradicted postulate"
  - Button: "Check my answer"

Default parameters:
- Problem: "Two lines intersect at exactly one point"
- Stage: 1
- Challenge mode: OFF
- Animation speed: 2 seconds

Behavior:
- Initially show only Stage 1
- As "Step Forward" is clicked, reveal next stage with slide-in animation
- Highlight active stage with colored glow
- Show arrows connecting stages as they're revealed
- In challenge mode:
  - Show blank spaces for students to fill in
  - Provide immediate feedback (green checkmark or red X)
  - Keep score of correct identifications
- "Auto-Play" animates through all stages smoothly
- Visual diagram (if applicable to problem) appears in corner showing geometric situation

Educational features:
- Hover over any stage box to see "Why this step?" explanation
- Click "⚡" contradiction icon to see detailed explanation of clash
- Comparison mode: "Show direct proof comparison" displays same theorem proved directly vs. indirectly
- Hint system: "Need help?" button provides graduated hints
- Summary at end: "This proof used [postulate/theorem] to find contradiction"

Visual effects:
- Stage boxes fade in as they're activated
- Arrows animate drawing from left to right
- Contradiction icon has pulsing glow effect
- Success stage has confetti or sparkle animation

Implementation: p5.js with DOM elements for text and controls
Use p5.tween or custom easing for smooth animations
Suggested file name: indirect-proof-explorer
</details>

### Famous Examples of Indirect Proof

Some of the most elegant proofs in mathematics are indirect proofs:

1. **There are infinitely many prime numbers** (Euclid's proof)
   - Assume there are finitely many primes
   - List them all and multiply them together, then add 1
   - This new number is either prime or has prime factors not in our list
   - Contradiction! There must be infinitely many primes.

2. **√2 is irrational**
   - Assume √2 is rational (can be written as a/b in lowest terms)
   - Square both sides and manipulate to show both a and b must be even
   - This contradicts "lowest terms" (could divide both by 2)
   - Therefore √2 is irrational.

## Coordinate Proof: Using the Coordinate Plane

A **coordinate proof** uses algebra and the coordinate plane to prove geometric relationships. By assigning coordinates to geometric figures, we can use distance, slope, and midpoint formulas to establish geometric properties.

### The Strategy of Coordinate Proof

**Steps for a coordinate proof:**

1. **Place the figure** on the coordinate plane in a convenient position
2. **Assign coordinates** to vertices (often using variables for generality)
3. **Use coordinate geometry formulas** (distance, slope, midpoint)
4. **Perform algebraic manipulations** to prove the desired property
5. **State the conclusion**

### Key Formulas for Coordinate Proof

**Distance Formula:** The distance between points $(x_1, y_1)$ and $(x_2, y_2)$ is:

$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

**Midpoint Formula:** The midpoint of the segment connecting $(x_1, y_1)$ and $(x_2, y_2)$ is:

$M = \left(\frac{x_1 + x_2}{2}, \frac{x_1 + y_2}{2}\right)$

**Slope Formula:** The slope of the line through $(x_1, y_1)$ and $(x_2, y_2)$ is:

$m = \frac{y_2 - y_1}{x_2 - x_1}$

### Example: Coordinate Proof

**Prove:** The diagonals of a rectangle are congruent.

**Coordinate Proof:**

Let's place a rectangle on the coordinate plane with vertices at convenient locations:
- $A(0, 0)$ at the origin
- $B(a, 0)$ on the positive x-axis
- $C(a, b)$ in the first quadrant
- $D(0, b)$ on the positive y-axis

The diagonals are $\overline{AC}$ and $\overline{BD}$.

Using the distance formula for diagonal $\overline{AC}$:

$AC = \sqrt{(a - 0)^2 + (b - 0)^2} = \sqrt{a^2 + b^2}$

Using the distance formula for diagonal $\overline{BD}$:

$BD = \sqrt{(0 - a)^2 + (b - 0)^2} = \sqrt{(-a)^2 + b^2} = \sqrt{a^2 + b^2}$

Since $AC = BD = \sqrt{a^2 + b^2}$, we conclude that $\overline{AC} \cong \overline{BD}$.

Therefore, the diagonals of a rectangle are congruent.

#### Diagram: Coordinate Proof Setup for Rectangle Diagonals

<iframe src="../../sims/coordinate-proof-setup/main.html" width="100%" height="452px" scrolling="no"></iframe>

[Run Coordinate Proof Setup Fullscreen](../../sims/coordinate-proof-setup/main.html)

<details markdown="1">
<summary>Visual Coordinate Proof Demonstration</summary>
Type: diagram

Purpose: Show how to strategically place a geometric figure on the coordinate plane for proof

**Learning objective:** Students will be able to apply coordinate geometry formulas to prove geometric properties algebraically (**Bloom's Taxonomy: Applying**)

Layout: Coordinate plane with labeled rectangle and formulas

Components:

**Main coordinate plane (left side, 400x400):**
- Standard x-y axes with grid
- Origin labeled O(0,0)
- X-axis from 0 to beyond 'a'
- Y-axis from 0 to beyond 'b'
- Tick marks but using variables for key positions

**Rectangle ABCD:**
- Vertex A at origin: (0, 0) - labeled in red
- Vertex B on x-axis: (a, 0) - labeled in blue
- Vertex C in first quadrant: (a, b) - labeled in green
- Vertex D on y-axis: (0, b) - labeled in purple
- Rectangle sides drawn in black, medium thickness
- Right angle symbols at each vertex

**Diagonals:**
- Diagonal AC drawn in red dashed line
- Diagonal BD drawn in blue dashed line
- Diagonals cross at center point M
- M not labeled with coordinates yet

**Strategic placement notes (right side, 300x400):**

**Box 1: "WHY This Placement?"**
- Bullet points:
  - "Origin at vertex → simpler coordinates (0,0)"
  - "Sides along axes → right angles guaranteed"
  - "Variables a and b → proves for ALL rectangles"
  - "First quadrant → all coordinates positive"

**Box 2: "Calculate AC"**
- Formula: $AC = \sqrt{(a-0)^2 + (b-0)^2}$
- Simplification: $AC = \sqrt{a^2 + b^2}$
- Arrow pointing to diagonal AC on plane

**Box 3: "Calculate BD"**
- Formula: $BD = \sqrt{(0-a)^2 + (b-0)^2}$
- Simplification: $BD = \sqrt{(-a)^2 + b^2} = \sqrt{a^2 + b^2}$
- Arrow pointing to diagonal BD on plane

**Box 4: "Conclusion"**
- Statement: "Since $AC = BD$"
- Statement: "$\overline{AC} \cong \overline{BD}$ ✓"
- Large checkmark in green
- Text: "Diagonals are congruent!"

Visual style:
- Clean coordinate plane with subtle grid (light gray)
- Bold axes (black, 2px)
- Colorful vertex points (circles, 8px diameter)
- Dashed diagonals (red and blue, 2px)
- Formula boxes with light backgrounds:
  - Box 1: Light yellow (#FFF9C4)
  - Box 2: Light red (#FFCDD2)
  - Box 3: Light blue (#BBDEFB)
  - Box 4: Light green (#C8E6C9)

Labels:
- Variables 'a' and 'b' clearly marked on axes
- Coordinate labels next to each vertex
- Arrows connecting formulas to relevant diagonals

Title at top: "Coordinate Proof: Rectangle Diagonals Are Congruent"

Dimensions: 750x450 pixels

Implementation: SVG with LaTeX rendering for formulas using MathJax
</details>

### Advantages of Coordinate Proofs

- **Algebraic power:** Leverages algebraic tools to prove geometric facts
- **Universal:** Proves statements for all cases (using variables)
- **Precise:** Uses exact calculations rather than measurements
- **Bridges geometry and algebra:** Connects two major branches of mathematics

### Tips for Coordinate Proofs

!!! mascot-tip "Here's a Tip!"

    Always place one vertex at the origin and align a side along an axis.
    This simple trick eliminates zeros in your calculations and makes
    the algebra much cleaner!

1. **Choose smart coordinates:** Place the figure to use (0, 0) and align with axes when possible
2. **Use variables:** Let sides have lengths a, b, c rather than specific numbers
3. **Simplify early:** Algebraic simplification makes calculations easier
4. **Check your formulas:** Distance, slope, midpoint—use the right one for the job
5. **State what you proved:** Connect back to the geometric property

#### Drawing: Coordinate Proof Laboratory

<iframe src="../../sims/coordinate-proof-lab/main.html" width="100%" height="702px" scrolling="no"></iframe>

[Run Coordinate Proof Laboratory Fullscreen](../../sims/coordinate-proof-lab/main.html)

<details markdown="1">
<summary>Interactive Coordinate Geometry Proof Tool</summary>
Type: microsim

**Learning objective:** Students will be able to create coordinate proofs by strategically placing figures on the coordinate plane and applying algebraic formulas to demonstrate geometric properties (**Bloom's Taxonomy: Creating**)

Purpose: Allow students to explore how different coordinate placements affect proof complexity and practice using coordinate geometry formulas

Canvas layout (900x700px):
- Left panel (500x700): Interactive coordinate plane
- Right panel (400x700): Proof workspace and controls

Visual elements:

**Left panel - Coordinate plane:**
- Standard x-y coordinate grid (450x450)
- Axes labeled with both numbers and variables
- Grid lines every 1 unit (light gray)
- Axes: darker gray, 2px
- Adjustable scale: shows -5 to 5 by default, but can zoom

**Draggable geometric figure:**
- Default: Rectangle with 4 draggable vertices
- Vertices appear as circles (12px diameter)
  - Red, blue, green, purple for A, B, C, D
- Sides drawn as solid lines connecting vertices
- Diagonals drawn as dashed lines
- As vertices are dragged, coordinates update in real-time
- Snap-to-grid option (toggled on by default)

**Coordinate labels:**
- Each vertex shows coordinates
- Format: "A(x, y)" next to vertex
- Updates dynamically as vertex moves
- Color matches vertex color

**Right panel - Proof workspace:**

**Section 1: Figure Setup (top)**
- Dropdown: "Select figure to prove"
  - Rectangle (diagonals congruent)
  - Parallelogram (diagonals bisect)
  - Isosceles triangle (base angles equal - using slopes)
  - Right triangle (Pythagorean theorem)
  - Rhombus (diagonals perpendicular)

- Button: "Suggest optimal placement"
  - Moves vertices to smart positions (origin, axes, etc.)
  - Shows message: "Vertex A placed at origin for simplicity"

**Section 2: Formulas (middle)**
- Three tabs:
  - **Distance** - shows distance formula with blanks
  - **Slope** - shows slope formula with blanks
  - **Midpoint** - shows midpoint formula with blanks

- Interactive formula calculator:
  - Dropdown: "Calculate distance from A to C"
  - When selected, formula appears with coordinates filled in
  - Shows step-by-step simplification:
    1. $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
    2. $d = \sqrt{(a - 0)^2 + (b - 0)^2}$ (substituted values)
    3. $d = \sqrt{a^2 + b^2}$ (simplified)
  - Button: "Calculate" - shows numeric result

**Section 3: Proof Notes (bottom)**
- Text area for students to type proof steps
- Pre-filled template:
  - "Given: [figure type]"
  - "Prove: [property]"
  - "Proof: [steps go here]"
- Suggestion engine: highlights when student should use a formula
- Validation: "Check proof logic" button
  - Verifies formulas used correctly
  - Checks if conclusion follows from calculations

Interactive controls (below proof workspace):
- Button: "Reset figure"
- Button: "Random placement"
- Toggle: "Snap to grid" (ON by default)
- Toggle: "Show grid coordinates" (ON by default)
- Toggle: "Show diagonals" (for applicable figures)
- Slider: "Zoom" (0.5x to 2x)
- Button: "Export proof" - copies formatted proof to clipboard

**Challenge Mode:**
- Toggle: "Challenge Mode" (OFF by default)
- When ON:
  - Formulas have blanks that students must fill in
  - Coordinates are hidden until student guesses
  - Timer tracks how long proof takes
  - Scoring based on optimal coordinate placement
  - Leaderboard for fastest/most elegant proofs

Default parameters:
- Figure: Rectangle
- Placement: A(0,0), B(4,0), C(4,3), D(0,3)
- Property: Diagonals are congruent
- Snap to grid: ON
- Show diagonals: ON
- Challenge mode: OFF

Behavior:
- When figure type selected, reset coordinate plane with default placement
- As vertices dragged:
  - Coordinates update in real-time
  - Formulas automatically recalculate
  - Visual figure updates smoothly
- "Suggest optimal placement" snaps vertices to strategic positions:
  - One vertex at origin
  - Sides along axes when possible
  - Variables used instead of specific numbers for general case
- Formula calculator shows work step-by-step with animations
- "Check proof logic" validates:
  - All necessary formulas used
  - Calculations correct
  - Conclusion stated clearly
- Hints available: "What formula would help prove this property?"

Educational features:
- Comparison panel: "Compare placements"
  - Shows same proof with different coordinate choices
  - Highlights which placement is simpler
- Video tutorials: "Watch example proof" button
- Glossary: Hover over formula names to see definitions
- Success messages:
  - "Great placement! Using the origin simplifies calculations."
  - "Excellent! You've proven this property algebraically."
  - "Try placing a vertex at the origin next time for easier algebra."

Visual effects:
- Vertices glow when hovered
- Formulas fade in when activated
- Checkmarks appear when calculations correct
- Grid highlights relevant points during proof

Implementation: p5.js with custom drag-and-drop for vertices
Use p5.Vector for coordinate calculations
MathJax for formula rendering
Suggested file name: coordinate-proof-lab
</details>

## Comparing Proof Formats

Each proof format has its strengths. Here's when to use each:

| Proof Format | Best Used When... | Advantages |
|--------------|-------------------|------------|
| Two-Column | Clarity and organization are priorities | Easy to follow, standard format |
| Paragraph | Writing for a general audience | Natural flow, professional style |
| Flow Chart | Multiple branches of logic exist | Visual structure, shows dependencies |
| Indirect | Direct proof is difficult | Elegant for impossibility results |
| Coordinate | Geometric figures fit on a plane | Leverages algebra, proves general cases |

The format you choose depends on the problem, your audience, and personal preference. With practice, you'll develop intuition for which format works best in different situations.

## Key Properties Used in Proofs

As you construct proofs, you'll frequently use these fundamental properties:

**Algebraic Properties of Equality:**

- **Reflexive Property:** $a = a$
- **Symmetric Property:** If $a = b$, then $b = a$
- **Transitive Property:** If $a = b$ and $b = c$, then $a = c$
- **Addition Property:** If $a = b$, then $a + c = b + c$
- **Subtraction Property:** If $a = b$, then $a - c = b - c$
- **Multiplication Property:** If $a = b$, then $ac = bc$
- **Division Property:** If $a = b$ and $c \neq 0$, then $\frac{a}{c} = \frac{b}{c}$
- **Substitution Property:** If $a = b$, then $a$ can be substituted for $b$ in any expression

**Properties of Congruence:**

- **Reflexive Property:** $\overline{AB} \cong \overline{AB}$ or $\angle A \cong \angle A$
- **Symmetric Property:** If $\overline{AB} \cong \overline{CD}$, then $\overline{CD} \cong \overline{AB}$
- **Transitive Property:** If $\overline{AB} \cong \overline{CD}$ and $\overline{CD} \cong \overline{EF}$, then $\overline{AB} \cong \overline{EF}$

These properties are the "rules of algebra" that justify the steps in your proofs.

## Practice Problems

Ready to put your proof skills to work? Try these problems using different proof formats:

1. **Two-Column Proof:** Given that $\angle 1$ and $\angle 2$ are complementary, and $\angle 2$ and $\angle 3$ are complementary, prove that $\angle 1 \cong \angle 3$.

2. **Paragraph Proof:** Prove that if two angles are both congruent and supplementary, then each angle measures 90°.

3. **Flow Chart Proof:** Given parallel lines cut by a transversal, prove that alternate interior angles are congruent.

4. **Indirect Proof:** Prove that a triangle cannot have two right angles.

5. **Coordinate Proof:** Place an isosceles triangle on the coordinate plane and prove that the base angles are congruent using slopes.

## Chapter Summary

Congratulations! You've now mastered the fundamental tools of logical reasoning and proof in geometry. Let's recap what you've learned:

**Conditional Statements:**
- Conditional statements have a hypothesis (if part) and conclusion (then part)
- The converse switches hypothesis and conclusion
- The inverse negates both parts
- The contrapositive switches and negates—and is always logically equivalent to the original

**Biconditional Statements:**
- Use "if and only if" when both directions are true
- Common in definitions and characterizations

**Postulates and Theorems:**
- Postulates are accepted as true without proof (foundational assumptions)
- Theorems are proven using postulates and other theorems
- Together they build the logical structure of geometry

**Proof Formats:**
- **Two-column proofs** organize statements and reasons clearly
- **Paragraph proofs** present arguments in essay form
- **Flow chart proofs** visualize logical dependencies
- **Indirect proofs** assume the opposite and find contradictions
- **Coordinate proofs** use algebra on the coordinate plane

**Key Skills Developed:**
- Identifying hypotheses and conclusions in conditional statements
- Constructing converse, inverse, and contrapositive statements
- Recognizing logical equivalences
- Building valid logical arguments using postulates and theorems
- Writing proofs in multiple formats
- Using proof by contradiction effectively
- Applying coordinate geometry to prove geometric properties

These logical reasoning skills form the foundation for everything else you'll do in geometry. As you move forward, you'll use these proof techniques to discover and verify geometric relationships about angles, triangles, circles, and more complex figures.

Remember: a proof is not just a series of statements—it's a story that explains why something must be true. With practice, you'll become fluent in telling these mathematical stories with clarity, precision, and elegance.

!!! mascot-celebration "Great Work!"

    You've mastered five different proof techniques — that's an incredible
    toolkit! From two-column to coordinate proofs, you now have the
    reasoning skills that power all of geometry. Onward!

Keep practicing, stay curious, and enjoy the logical beauty of geometry!

---

## Additional Resources

**Practice More Proofs:**
- Try proving familiar theorems using different formats
- Challenge yourself with indirect proofs for seemingly simple statements
- Create coordinate proofs for classic geometric properties

**Explore Further:**
- Research famous mathematical proofs (Pythagorean theorem, Fermat's Little Theorem)
- Study proof techniques in other areas of mathematics
- Investigate non-Euclidean geometry where some postulates are different

**Connect to Other Chapters:**
- The logical skills from this chapter will be essential in upcoming chapters on triangles, circles, and transformations
- Look for opportunities to apply two-column, paragraph, and coordinate proofs throughout the course
- Notice how theorems build on each other to create a vast network of geometric knowledge

Now you're ready to prove anything in geometry! Let's move forward to Chapter 3 and apply these powerful reasoning tools to angles and their relationships.