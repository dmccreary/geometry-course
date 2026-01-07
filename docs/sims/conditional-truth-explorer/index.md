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

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive tool helps students understand when conditional statements are true or false. By toggling the truth values of the hypothesis and conclusion, students can observe how the overall statement's truth value changes.

## Key Insight

**A conditional statement is only FALSE when the hypothesis is TRUE but the conclusion is FALSE.**

This is the essence of a counterexample - a case where the "if" part is satisfied but the "then" part fails.

## Truth Table

| Hypothesis (p) | Conclusion (q) | p → q |
|:--------------:|:--------------:|:-----:|
| T | T | **T** |
| T | F | **F** |
| F | T | **T** |
| F | F | **T** |

## How to Use

1. Toggle the checkboxes to change the truth values
2. Observe how the statement truth value changes
3. Click "Random Example" to see different geometric statements
4. Notice that the only FALSE case is True → False

## Learning Objectives

- **Apply** truth value rules to evaluate conditional statements
- **Identify** counterexamples (when True leads to False)
- **Understand** why conditional statements can be true even with false parts

## Bloom's Taxonomy Level

**Applying** - Students apply truth value rules to evaluate statements.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/geometry-course/sims/conditional-truth-explorer/main.html"
        height="522px"
        width="100%"
        scrolling="no"></iframe>
```

## References

1. [Truth Tables](https://www.khanacademy.org/computing/computer-science/cryptography/comp-number-theory/a/truth-tables) - Khan Academy
