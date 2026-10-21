
## DOM-Grid 3D Wireframe Renderer using DOMMatrix / DOMPoint and Wu's Line Algorithm

A zero-canvas, pure-DOM 3D wireframe renderer. This experiment maps the browser viewport into a CSS grid
of individual div elements, acting as a low-res pixel display.

It defines a 3D cube using native DOMPoint objects, applies rotations via a DOMMatrix parsed from a CSS transform string,
and draws antialiased lines onto the grid using Xiaolin Wu's line algorithm by dynamically tweaking cell opacities.
No WebGL, no canvas context—just pure CSS grid abuse and native geometry APIs.


