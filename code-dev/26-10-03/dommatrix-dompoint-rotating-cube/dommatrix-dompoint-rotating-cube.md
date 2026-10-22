
# Demonstration of DOMMatrix / DOMPoint By Rotating A Wireframe Cube And Renderer using Wu's Line Algorithm


It turns the browser viewport into a retro low-res pixel display, using a grid of individual div elements,
native web geometry APIs, and an antialiased line-drawing algorithm, it renders a rotating 3D wireframe
cube entirely through the DOM and CSS.

[DOMMatrix [mdn]](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)

[DOMPoint [mdn]](https://developer.mozilla.org/en-US/docs/Web/API/DOMPoint)

[Wu's Line Algorithm [wiki]](https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm)


## How It Works: Step-by-Step

### 1. The DOM-Pixel Grid
 
The script starts by measuring the screen (window.innerWidth and document.documentElement.scrollHeight)
and dividing it by a size factor (10px per "pixel"). It dynamically generates a dense matrix of empty div
elements and appends them to the body, turning the layout into a massive CSS Grid:

```
body.style.cssText = `grid-template-columns:repeat(${gridw},1fr);grid-template-rows:repeat(${gridh},1fr)`;
```

Each div acts like a single pixel on a screen. The animation loop targets these cells by their index (y * gridw + x) to light them up or clear them.



### 2. 3D Geometry with DOMPoint
 
The code demonstrates DOMPoint, instead of writing custom vector objects or math structs, a native browser
interface designed for SVG and geometry transformations. It defines the 8 corners of a 3D cube with
(x,y,z) coordinates:

```
var cube = [
    new DOMPoint(0,0,0),
    new DOMPoint(1,0,0),
    // ...
];
```


### 3. Matrix Transformations with DOMMatrix

To rotate and scale the cube in 3D space, the code constructs a standard CSS transform string (handling translation,
rotation on the Z and Y axes, and scaling) and feeds it directly into a DOMMatrix:

```
var css = 'translate(50px,50px) rotateZ('+a+'deg) rotateY('+b+'deg) translate3d(-10px,-10px,-10px) scale3d(20,20,20)';
var matrix = new DOMMatrix(css);
```

During every frame of the animation loop, each vertex (DOMPoint) is projected into transformed coordinates
using the native browser method `.matrixTransform(matrix)`.



### 4. Antialiasing via Wu's Line Algorithm

Connecting the 3D dots into 2D lines on a grid requires a rasterization algorithm. Rather than a harsh,
pixelated [Bresenham line [wiki]](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm),
this snippet implements Xiaolin Wu's line algorithm.

Wu’s algorithm produces antialiased lines. By calculating the fractional distance (fpart, rfpart) of where
a line crosses grid coordinates, it dynamically adjusts the opacity (rgba(0,0,255,${c})) of adjacent div cells.
This creates smooth, gradient-softened lines on a rigid grid.


### 5. The Animation Loop

Driven by requestAnimationFrame, the update loop:

  1. Clears the previously drawn pixels (clear()).

  2. Increments the rotation angles (a and b).

  3. Transforms all 3D cube vertices via DOMMatrix.

  4. Loops through the edges array, feeding the projected 2D coordinates into the line() function.

  5.  Plots the antialiased pixels onto the grid divs.





