# Conway’s Game of Life in WebGPU

This example demonstrates how to run Conway’s Game of Life entirely on the GPU using WebGPU. The simulation grid is stored in GPU buffers, and a compute shader applies the Game of Life rules in parallel across all cells. Each frame, the compute pass produces the next generation, and the result is uploaded to a texture for display on a canvas.

## How it works

The simulation uses a pair of GPU storage buffers to represent the current and next state of the grid. A WGSL compute shader reads from the input buffer, counts the eight neighbours of each cell, and writes the updated value into the output buffer. After each compute pass, the buffers are swapped so the new state becomes the input for the next frame.

## Rendering the grid

Once the compute shader has produced the next generation, the CPU converts the 0/1 cell values into an 8‑bit texture. A simple fullscreen quad shader samples this texture and displays the grid as white (alive) or black (dead) pixels. The canvas is scaled up with nearest‑neighbour filtering to preserve the blocky appearance.

## Why WebGPU is a good fit

WebGPU allows the entire update step to run in parallel on the GPU, which is ideal for cellular automata like Conway’s Game of Life. Even large grids can be updated at interactive frame rates because each cell is processed independently in a compute workgroup.

## What this demo shows

- Initialising WebGPU and creating compute pipelines  
- Using storage buffers to hold simulation state  
- Implementing Conway’s rules in WGSL  
- Running a compute pass every animation frame  
- Uploading results to a texture for display  
- Rendering the grid efficiently with a fullscreen quad  

This makes a good starting point for experimenting with GPU‑accelerated simulations, cellular automata, or any system that updates a large grid of values in parallel.
