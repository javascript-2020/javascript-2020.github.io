# Rotating 3D Wireframe Shapes in the Browser: A Step-by-Step Guide

In this interactive demonstration, we explore how to render simple 3D wireframe models—like a cube, hexagon, dodecahedron,
and toroid—using only HTML5 Canvas and JavaScript, without relying on external libraries or WebGL. The result is a smooth,
real-time animation where each shape rotates in 3D space and projects onto a 2D screen using a pipeline of mathematical
transformations.

At its core, this code demonstrates a **pipeline of coordinate transformations** that simulate 3D rotation and perspective
projection. It's not a full 3D engine, but rather a clear, educational example of how 3D geometry can be visualized in a
browser using basic math and canvas rendering.

## The 3D Transformation Pipeline

The rendering process follows a logical sequence of steps:

1. **Rotation**: Each vertex of the 3D shape is rotated around the X, Y, and Z axes using trigonometric functions (`sin`, `cos`).
    This simulates the effect of turning the object in 3D space.
2. **Scaling & Translation**: The rotated coordinates are then scaled and translated into world space, allowing the object to be
    positioned and sized relative to the viewer.
3. **Perspective Projection**: To create depth, the 3D coordinates are projected into 2D using a perspective divide—objects
    farther away appear smaller, mimicking how human vision works.
4. **Screen Mapping**: The final 2D coordinates are mapped to the canvas dimensions, centered and scaled appropriately for display.

This entire process runs in real time via `requestAnimationFrame`, ensuring smooth animation with minimal lag.

## Interactive Controls

The user can pause and resume the animation using a simple button. When paused, the animation stops; when resumed, 
it continues rotating the shape. This makes it easy to observe how the shape changes over time and understand the
relationship between rotation angles and visual output.

## Supported Shapes

The code defines several distinct 3D wireframe models:

- **Cube**: A basic 8-vertex cube with 12 edges. It serves as a foundational example of 3D geometry.
- **Hexagon (Dual)**: A hexagonal prism with two hexagonal faces and six vertical edges connecting them.
    It introduces more complex symmetry.
- **Dodecahedron**: A 20-vertex polyhedron with 12 pentagonal faces. Its vertices are carefully placed 
    using golden ratio proportions, showcasing mathematical precision in 3D modeling.
- **Toroid (Animated)**: A ring-shaped structure made of multiple rotated pentagons. The animation loop 
    dynamically rotates each "ring" over time, creating a flowing, wave-like effect that simulates a torus spinning in 3D.

## Why This Matters

This implementation is valuable not just for its visual appeal, but for its **educational clarity**. It breaks down
the abstract concept of 3D rendering into digestible, sequential steps—perfect for learners exploring computer graphics,
game development, or even introductory programming.

By using only native JavaScript and Canvas, it highlights the power of low-level math and programming to create compelling
visual experiences. It also serves as a foundation for more advanced topics like camera systems, lighting, or even 3D scene graphs.

## Conclusion

This wireframe animation is more than just a visual trick—it's a practical demonstration of how 3D geometry is transformed 
into 2D visuals using fundamental mathematical operations. Whether you're a student, a developer, or a curious learner,
this code offers a clear, accessible entry point into the world of 3D rendering in the browser. And with just a few lines
of code, you can see how complex 3D shapes come alive through simple, elegant math.