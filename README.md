## Vector Nodes
A node-based editor for creating 2D vector graphics procedurally.

### Name
Project is unnamed right now. "VecNodes" or "vector-nodes-desktop" isn't it. I'm open to suggestions.

### How to use
The project is very early in development, and it's basically unusable in its current form. So... don't. Yet.

### Project Goals
- Easy to use, accessible. I am making a tool I want to give to students.
- Target audience, this would be an entrypoint/precursor to creative coding
- Easy to put together simple vector shapes - it's featured enough to actually be used.
- Decent for procedural graphics. Points, math functions, and parameterization features.
- Animation/Video exporting, or at least exporting to frames.
- Basic QoL (i.e.: has the desktop features you would expect).
- Object-modification model (like blender geometry nodes), as opposed to execution-path model (like unreal blueprints).
- Basic recursion support for loop/iterate over nodes (allowing simpler and more expressive tree's)

The last two points are basically why I am making this instead of using one of the many excellent tools out there. 

### Project Scope
- No intent on 3D support (use Blender Geometry Nodes or NodeBox or nodes.io or one of many shader-based approaches)
- No intent on web-only support (it's not impossible)
- No intent to really optimize for speed or performance (I mean.... It's written in javascript+electron after all, what do you want from me?)
- A proof-of-concept for the idea that a little niche for a specialized editor
- "Maybe one day but not a focus": CSV data importing, timeline scrubbing, 

---
This project is basically a mashup of rete.js and g.js, using electron.
