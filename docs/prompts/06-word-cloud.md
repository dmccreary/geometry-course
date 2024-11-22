# Word Cloud Prompt

## Sample Prompt

```linenums="0"
Create a JavaScript program within an HTML file
using wordcloud2 JavaScript 
library that generates a word cloud diagram for the 
most 50 most important concepts in a geometry textbook.
Rank the terms on a scale from 30 to 70 with the
most commonly referenced terms getting a score of 70
and the least commonly referenced term getting a 30.

Generate a single HTML file that has the terms in the body 
of the JavaScript.
```

## Sample Response

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geometry Word Cloud</title>
    <!-- Load the WordCloud2.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.min.js"></script>
    <style>
        #word-cloud {
            width: 100%;
            height: 600px;
            border: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center;">Geometry Word Cloud</h1>
    <div id="word-cloud"></div>
    <script>
        // Data for the top 50 geometry concepts with importance scores
        const geometryConcepts = [
            ["Triangle", 70],
            ["Circle", 68],
            ["Angle", 67],
            ["Line", 65],
            ["Quadrilateral", 63],
            ["Polygon", 62],
            ["Congruence", 61],
            ["Similarity", 60],
            ["Right Triangle", 59],
            ["Pythagorean Theorem", 58],
            ["Parallel Lines", 57],
            ["Perpendicular Lines", 56],
            ["Transformations", 55],
            ["Symmetry", 54],
            ["Coordinate Geometry", 53],
            ["Tangent", 52],
            ["Chord", 51],
            ["Radius", 50],
            ["Diameter", 49],
            ["Arc", 48],
            ["Sector", 47],
            ["Surface Area", 46],
            ["Volume", 45],
            ["Midpoint", 44],
            ["Bisector", 43],
            ["Angle Bisector", 42],
            ["Complementary Angles", 41],
            ["Supplementary Angles", 40],
            ["Vertical Angles", 39],
            ["Adjacent Angles", 38],
            ["Linear Pair", 37],
            ["Transversal", 36],
            ["Alternate Interior Angles", 35],
            ["Alternate Exterior Angles", 34],
            ["Same-Side Interior Angles", 33],
            ["Reflection", 32],
            ["Rotation", 31],
            ["Translation", 30],
            ["Dilation", 30],
            ["Congruent Figures", 30],
            ["Similar Figures", 30],
            ["Scalene Triangle", 30],
            ["Isosceles Triangle", 30],
            ["Equilateral Triangle", 30],
            ["Acute Angle", 30],
            ["Right Angle", 30],
            ["Obtuse Angle", 30],
            ["Straight Angle", 30],
            ["Reflex Angle", 30]
        ];

        // Ensure the canvas is properly sized
        const wordCloudElement = document.getElementById("word-cloud");
        wordCloudElement.style.width = "100%";
        wordCloudElement.style.height = "600px";

        // Generate the word cloud
        WordCloud(wordCloudElement, {
            list: geometryConcepts,
            gridSize: Math.round(16 * wordCloudElement.offsetWidth / 1024),
            weightFactor: function (size) {
                return size * 0.3;
            },
            fontFamily: "Arial, Helvetica",
            color: function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            },
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: "#ffffff"
        });

        // Debugging: Check if the library loaded correctly
        console.log("WordCloud initialized:", typeof WordCloud !== "undefined");
    </script>
</body>
</html>
```

## Changing the Layout

### Prompt

```
Can you give me some tips on how to change the layout?
```

### Response

Certainly! Changing the layout of your word cloud can greatly enhance its visual appeal and make it better fit your needs or preferences. Here are some suggestions on how you can modify various aspects of the layout:

### **1. Adjust the Shape of the Word Cloud**

By default, the word cloud fills the available rectangular space. You can change the shape to a circle, heart, star, or any custom shape using a mask image.

**Using a Predefined Shape:**

```javascript
WordCloud(wordCloudElement, {
    // ... other options ...
    shape: 'circle', // Options include 'circle', 'cardioid', 'diamond', 'square', 'triangle-forward', etc.
});
```

**Using a Custom Mask Image:**

1.  **Add a Mask Image to Your HTML:**

    ```
    html
    Copy code

    `<img id="mask-image" src="path-to-your-mask-image.png" style="display: none;">
    `

    ```

2.  **Modify the WordCloud Options:**

    ```
    javascript
    Copy code

    `WordCloud(wordCloudElement, {
        // ... other options ...
        maskImage: document.getElementById('mask-image'),
    });
    `

    ```

**Note:** The mask image should be a transparent PNG where the non-transparent areas define the shape.

### **2. Change the Font and Styling**

**Change Font Family and Weight:**

```javascript
fontFamily: 'Arial, sans-serif',
fontWeight: 'bold', // Options: 'normal', 'bold', 'bolder', 'lighter', or numeric value (100-900)
```

**Use a Custom Font from Google Fonts:**

1.  **Include the Font in Your HTML `<head>`:**

    ```
    html
    Copy code

    `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    `

    ```

2.  **Specify It in the WordCloud Options:**

    ```
    javascript
    Copy code

    `fontFamily: 'Roboto, sans-serif',
    `

    ```

### **3. Customize Colors**

**Use a Fixed Color Palette:**

```javascript
const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231'];
color: function (word, weight) {
    return colors[Math.floor(Math.random() * colors.length)];
},
```

**Color Based on Word Frequency (Weight):**

```javascript
color: function (word, weight) {
    return weight > 50 ? '#ff0000' : '#0000ff'; // Red for high weights, blue for lower
},
```

**Random Colors:**

```javascript
color: function () {
    return 'rgb(' + Math.floor(Math.random() * 255) + ',' +
                     Math.floor(Math.random() * 255) + ',' +
                     Math.floor(Math.random() * 255) + ')';
},
```

### **4. Adjust Word Orientation**

**Set Rotation Angles:**

```javascript
rotateRatio: 0.5, // 0 to 1, the probability the word will be rotated
rotationSteps: 2, // Number of different rotation angles between minRotation and maxRotation
minRotation: -Math.PI / 4,
maxRotation: Math.PI / 4,
```

**Fix Words to Horizontal or Vertical Only:**

```javascript
rotateRatio: 0.5,
rotationSteps: 2,
minRotation: 0,
maxRotation: Math.PI / 2,
```

### **5. Modify the Grid Size and Spacing**

**Adjust Grid Size:**

Smaller grid sizes allow more precise placement but may increase rendering time.

```javascript
gridSize: 12, // Default is 8
```

**Adjust Ellipticity (Shape Stretching):**

```javascript
ellipticity: 0.8, // 0.1 (very tall) to 2 (very wide)
```

### **6. Set the Background Color**

```javascript
backgroundColor: '#f0f0f0', // Light gray background
```

### **7. Implement Interactive Features**

**Add Tooltips on Hover:**

1.  **Add a Tooltip Element to Your HTML:**

    ```
    html
    Copy code

    `<div id="tooltip" style="position: absolute; display: none; background: #333; color: #fff; padding: 5px; border-radius: 3px; pointer-events: none;"></div>
    `

    ```

2.  **Update the WordCloud Options:**

    ```
    javascript
    Copy code

    `hover: function (item, dimension, event) {
        if (item) {
            tooltip.style.left = event.pageX + 10 + 'px';
            tooltip.style.top = event.pageY + 10 + 'px';
            tooltip.style.display = 'block';
            tooltip.textContent = `${item[0]} (${item[1]})`;
        } else {
            tooltip.style.display = 'none';
        }
    },
    `

    ```

### **8. Limit the Number of Words Displayed**

If you want to focus on the most important concepts:

```javascript
const topConcepts = geometryConcepts.slice(0, 30); // Adjust the number as needed
WordCloud(wordCloudElement, {
    list: topConcepts,
    // ... other options ...
});
```

### **9. Adjust the Weight Factor**

Fine-tune how word weights affect their sizes.

```javascript
weightFactor: function (size) {
    return size * 2; // Increase the multiplier to make words larger
},
```

### **10. Change the Canvas Size**

Adjust the size of the container div to change the overall size of the word cloud.

```
html
Copy code

`<div id="word-cloud" style="width: 1000px; height: 500px;"></div>
```

### **Example Implementation with Changes**

Here is a revised version of your HTML file incorporating some of these suggestions:

```
html
Copy code

`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Geometry Word Cloud</title>
    <style>
        #word-cloud {
            width: 1000px;
            height: 500px;
            margin: 0 auto;
            position: relative;
            background-color: #f0f0f0;
        }
        #tooltip {
            position: absolute;
            display: none;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;
            pointer-events: none;
            font-size: 14px;
            z-index: 1000;
        }
    </style>
    
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
</head>
<body>
    <h1 style="text-align: center;">Geometry Word Cloud</h1>
    <div id="word-cloud"></div>
    <div id="tooltip"></div>

    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.min.js"></script>

    
    <script>
        window.onload = function() {
            const geometryConcepts = [
                ["Triangle", 70],
                ["Circle", 68],
                ["Angle", 67],
                ["Line", 65],
                ["Quadrilateral", 63],
                // ... rest of your data ...
            ];

            const wordCloudElement = document.getElementById("word-cloud");
            const tooltip = document.getElementById('tooltip');

            WordCloud(wordCloudElement, {
                list: geometryConcepts,
                gridSize: 12,
                weightFactor: function (size) {
                    return (size / 70) * 80; // Adjust the 80 to scale overall word sizes
                },
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold',
                color: function (word, weight) {
                    // Gradient from blue to red based on weight
                    const maxWeight = 70;
                    const minWeight = 30;
                    const weightRatio = (weight - minWeight) / (maxWeight - minWeight);
                    const r = Math.floor(255 * weightRatio);
                    const b = Math.floor(255 * (1 - weightRatio));
                    return `rgb(${r},0,${b})`;
                },
                rotateRatio: 0.5,
                rotationSteps: 3,
                minRotation: -Math.PI / 6,
                maxRotation: Math.PI / 6,
                backgroundColor: "#f0f0f0",
                shuffle: true,
                minSize: 14,
                ellipticity: 0.8,
                hover: function(item, dimension, event) {
                    if (item) {
                        tooltip.style.left = event.pageX + 10 + 'px';
                        tooltip.style.top = event.pageY + 10 + 'px';
                        tooltip.style.display = 'block';
                        tooltip.textContent = `${item[0]} (${item[1]})`;
                    } else {
                        tooltip.style.display = 'none';
                    }
                },
            });
        };
    </script>
</body>
</html>
```

### **Explanation of Modifications**

-   **Container Size:** Increased the `#word-cloud` div to 1000px by 500px for a wider layout.
-   **Custom Font:** Used 'Montserrat' from Google Fonts for a modern look.
-   **Font Weight:** Set to 'bold' to make words stand out.
-   **Color Function:** Implemented a gradient from blue to red based on the weight of each word.
-   **Rotation Angles:** Limited rotation to -30° to +30° for better readability.
-   **Grid Size and Weight Factor:** Adjusted to fine-tune word placement and size.
-   **Ellipticity:** Set to 0.8 to make the word cloud slightly wider than tall.
-   **Minimum Word Size:** Increased to 14 pixels to ensure all words are legible.
-   **Tooltips:** Enhanced tooltips to show when hovering over words, displaying the concept and its weight.

### **Additional Tips**

-   **Experiment with Different Fonts:** Try different fonts to match the style you're aiming for. Google Fonts offers a wide variety of options.
-   **Use High-Quality Mask Images:** If you decide to use a mask image for a custom shape, ensure it's a high-contrast, black-and-white image for best results.
-   **Optimize for Performance:** Be cautious with grid sizes and the number of words. Smaller grid sizes and more words increase rendering time.
-   **Test Across Browsers:** Check how the word cloud displays in different browsers and devices to ensure compatibility.
-   **Consider Accessibility:** Ensure that the color contrasts are sufficient for readability, especially for users with visual impairments.

### **Resources**

-   **WordCloud2.js Documentation:** [GitHub Repository](https://github.com/timdream/wordcloud2.js)
-   **Color Gradient Generators:** Tools like [ColorBrewer](https://colorbrewer2.org/) can help you choose color schemes.
-   **Google Fonts:** [fonts.google.com](https://fonts.google.com/) for a variety of font choices.