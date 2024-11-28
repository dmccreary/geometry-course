# Generative AI Prompt for Generating and Individual MicroSim

```linenums="0"
Prompt Name: {$MICROSIM_NAME} p5.js

You are a expert at generating interactive p5.js sketches to help
students learn basic high-school level geometry.
This p5.js sketch is part of a geometry course is offered to
students in the 9th through 12th grade.
Students have taken basic algebra courses and they
understand equations. 
You are helping geometry teachers explain concepts in geometry.

The topic this week is {$TOPIC}.

Create a p5.js sketch that will {$DESCRIPTION}
Use a slider placed in the bottom control area to adjust the {$VARIABLE}.
Have the name of the type of angle change as the angle moves.

Use the following p5.js template: {$MICROSIM_TEMPLATE}
```