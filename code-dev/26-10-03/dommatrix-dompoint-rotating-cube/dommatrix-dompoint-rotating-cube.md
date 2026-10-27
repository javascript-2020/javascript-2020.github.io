
# Demonstration of DOMMatrix / DOMPoint By Rotating A Wireframe Cube And Render using Wu's Line Algorithm


It turns the browser viewport into a retro low-res pixel display, using a grid of individual div elements,
native web geometry APIs, and an antialiased line-drawing algorithm, it renders a rotating 3D wireframe
cube entirely through the DOM and CSS.


[DOMMatrix [mdn]](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)

[DOMPoint [mdn]](https://developer.mozilla.org/en-US/docs/Web/API/DOMPoint)

[Wu's Line Algorithm [wiki]](https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm)


## How It Works: Step-by-Step

### 1. The Pixel Grid
 
The script starts by measuring the screen ( window.innerWidth and document.documentElement.scrollHeight )
and dividing it by a size factor ( 10px per "pixel" ). It dynamically generates a matrix of empty div
elements and appends them to the body, turning the layout into a CSS Grid :

```
body.style.cssText = `grid-template-columns:repeat(${gridw},1fr);grid-template-rows:repeat(${gridh},1fr)`;
```

Each div acts like a single pixel on a screen. The animation loop targets these cells by their index
( y*gridw+x ) to light them up or clear them.



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

During every frame of the animation loop, each vertex ( DOMPoint ) is projected into transformed coordinates
using the native browser method `.matrixTransform(matrix)`.



### 4. Antialiasing via Wu's Line Algorithm

Connecting the 3D dots into 2D lines on a grid requires a rasterization algorithm. Rather than a harsh,
pixelated [Bresenham line [wiki]](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm),
this snippet implements Xiaolin Wu's line algorithm.

Wu’s algorithm produces antialiased lines. By calculating the fractional distance `(fpart,rfpart)` of where
a line crosses grid coordinates, it dynamically adjusts the opacity `rgba(0,0,255,${c})` of adjacent div cells.
This creates smooth, gradient-softened lines on a rigid grid.

The entire line function (along with the helper math functions fpart, rfpart, ipart, and round)
is an implementation of Xiaolin Wu's line algorithm.

However, the true "magic" of Wu's algorithm—the part that separates it from standard integer-only
line algorithms like Bresenham—lives in the endpoint handling and the main loop, where it plots
two pixels at once using fractional opacities.

#### What Makes It Wu's Algorithm? ( Antialiasing )

Traditional pixel lines look jagged ( the "staircase effect" ) because they pick a single closest
pixel for every step. Wu’s algorithm solves this by antialiasing.

Instead of turning a pixel fully on or off, it calculates how close the exact mathematical line
is to a grid intersection, and splits the brightness (or in this case, opacity via rgba) between
two adjacent pixels.

Here is how that breaks down in the code:


  1. **The Fractional Helpers**

```
function ipart(x){return Math.floor(x)}          // Integer part (e.g., 10.7 -> 10)
function fpart(x){return x-ipart(x)}              // Fractional part (e.g., 10.7 -> 0.7)
function rfpart(x){return 1-fpart(x)}             // Reverse fractional part (1 - 0.7 = 0.3)
```

These helper functions are vital because Wu’s algorithm relies entirely on decimals. If a line
crosses a column at y = 10.7, the integer part is 10, and the fractional part is 0.7.


  2. **Dual-Pixel Plotting with Opacity**
  
Look at how the main loop plots points:

```
plot(x, ipart(intery), rfpart(intery));     // Pixel above/below
plot(x, ipart(intery) + 1, fpart(intery)); // Adjacent pixel
```
Instead of drawing one solid block, it calls plot twice for every single step along the x-axis:

  - It lights up the pixel at the floor integer (ipart(intery)) with an opacity weighted by the
    reverse fraction (rfpart).
  - It lights up the very next pixel down (ipart(intery) + 1) with an opacity weighted by the
    fraction itself (fpart).

The Visual Result: If the line is right on the edge of grid cell 10 and grid cell 11, cell 10
gets 30% opacity and cell 11 gets 70% opacity. To the human eye, this blends the pixels together,
creating a smooth, antialiased line across the CSS grid.


  3. **The Accumulator Loop**
  
```
var intery = yend + gradient;
// ...
for(var x = xpxl1 + 1; x <= xpxl2 - 1; x++){
    plot(x, ipart(intery), rfpart(intery));
    plot(x, ipart(intery) + 1, fpart(intery));
    var intery = intery + gradient;
}
```

As the loop steps forward one column at a time ( x++ ), it accumulates the slope ( gradient ) into
the intery variable. This tracks the exact floating-point vertical position of the line,
allowing the fractional math to continuously shift the opacity balance between the upper and
lower pixels as the line progresses.


  4.  **Checking for "Steepness" :**
  
```
var steep = (Math.abs(y1-y0) > Math.abs(x1-x0));
```
It compares the vertical distance (dy) to the horizontal distance (dx). If the line is taller than it is wide,
steep becomes true.


  5.  **Swapping X and Y for Steep Lines :**
  
```
if(steep){
    // swaps x0/y0 and x1/y1 coordinates
}
```

If the line is steep, it swaps the x and y coordinates of both endpoints. This flips the coordinate
space so the algorithm can always loop smoothly along the x-axis ( treating the vertical axis as horizontal ),
preventing gaps in steep lines.


  6.  **Ensuring Left-to-Right Direction :**
  
```
if(x0 > x1){
    // swaps the start point and end point
}
```
It checks if the starting point is to the right of the ending point. If it is, it swaps the entire start
point and end point so that the line always processes from left to right (from a smaller x to a larger x).



### 5. The Animation Loop

Driven by requestAnimationFrame, the update loop:

  1. Clears the previously drawn pixels (clear()).

  2. Increments the rotation angles (a and b).

  3. Transforms all 3D cube vertices via DOMMatrix.

  4. Loops through the edges array, feeding the projected 2D coordinates into the line() function.

  5.  Plots the antialiased pixels onto the grid divs.





