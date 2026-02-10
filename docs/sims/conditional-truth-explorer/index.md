---
title: Conditional Statement Truth Explorer
description: Interactive exploration of when conditional statements are true or false based on hypothesis and conclusion truth values.
image: /sims/conditional-truth-explorer/conditional-truth-explorer.png
og:image: /sims/conditional-truth-explorer/conditional-truth-explorer.png
twitter:image: /sims/conditional-truth-explorer/conditional-truth-explorer.png
social:
   cards: false
quality_score: 85
---

# Conditional Statement Truth Explorer

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool helps students understand when conditional statements (if-then statements) are true or false. By toggling the truth values of the hypothesis and conclusion using on-canvas buttons, students can observe how the overall statement's truth value changes in real time.

## How to Use

1. Click the green/red **Hypothesis** toggle button to switch the hypothesis between TRUE and FALSE
2. Click the green/red **Conclusion** toggle button to switch the conclusion between TRUE and FALSE
3. Observe the result banner, arrow color, and truth table highlighting update immediately
4. Click **Random Example** to cycle through 10 different geometric conditional statements
5. Notice that the only FALSE case is when a TRUE hypothesis leads to a FALSE conclusion

## Key Insight

**A conditional statement is only FALSE when the hypothesis is TRUE but the conclusion is FALSE.** This is the essence of a counterexample -- a case where the "if" part is satisfied but the "then" part fails.

## Truth Table

| Hypothesis (p) | Conclusion (q) | p -> q |
|:--------------:|:--------------:|:-----:|
| T | T | **T** |
| T | F | **F** |
| F | T | **T** |
| F | F | **T** |

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/conditional-truth-explorer/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

- **Apply** truth value rules to evaluate conditional statements
- **Identify** counterexamples (when a true hypothesis leads to a false conclusion)
- **Understand** why conditional statements can be true even when parts are false

### Bloom's Taxonomy Level

**Applying** -- Students apply truth value rules to evaluate conditional statements by testing different input combinations.

### Target Audience

High school geometry students (grades 9-12) studying logic and proof (Chapter 2).

### Prerequisites

- Understanding of conditional statement structure (hypothesis and conclusion)
- Familiarity with "if-then" language in geometry

### Activities

1. **Predict and Test**: Before clicking a toggle, have students predict whether the statement will be TRUE or FALSE, then verify
2. **Find the False Case**: Challenge students to find the one combination that makes the conditional FALSE
3. **Real-World Analysis**: For each random example, discuss whether the statement is actually true in geometry and what a counterexample would look like
4. **Truth Table Construction**: Have students build the truth table on paper first, then verify with the MicroSim

### Assessment

- Can students correctly predict the truth value before toggling?
- Can students explain why F -> T is considered TRUE?
- Can students identify a counterexample for a false geometric conditional?

### Duration

10-15 minutes

## References

1. [Truth Tables - Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography/comp-number-theory/a/truth-tables) - Overview of truth tables and logical connectives
2. [Conditional Statements in Geometry](https://www.mathsisfun.com/geometry/conditional-statements.html) - Introduction to if-then statements in geometry
