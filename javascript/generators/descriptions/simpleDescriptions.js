var analyseDescription = [
"Block overlap value. 0 - none, 1 - 1/8 of block size in each direction, 2 - 1/4 of block size, 3 - 1/2 of block size. The greater overlap, the more blocks number, and the lesser the processing speed.Resulting overlap value in pixels should be even with CPU rendering.",
"Vertical size of a block. Default is equal to horizontal size. Additional options are: 4 for \"block.w:8\", 8 for \"block.w:16\", 16 for \"block.w:32\".",
"Size of a block (horizontal). It's either 8, 16 or 32. Larger blocks are less sensitive to noise, are faster, but also less accurate, smaller blocks produce more wavy picture.",
"Search range on finest level: <br/>0 - don't search on finest level at all, greatly increase search speed but may still looks good with GPU rendering. This option is opposite to \"super.pel\".<br/>>0 - classic fixed range in pixels.<br/><0 - \"adaptive\" range based on block local contrast. Range is small or zero for low contrast blocks (black/gray for example) but is big for blocks that has many visible details. Effective average range in common scenes is about 1/3 of this value.",
"SAD threshold to define \"bad\" vectors. Value is scaled to block size 8x8.",
"By two with global refinement {thsad:250}\\{thsad:4000}\\{thsad:65000},{thsad:65000}\\{thsad:65000} To small step 6-8 px"];

var configDescription = [
"Ammount of ram to use in megabytes.",
"Ammount of threads to use"];

var smoothDescription = [
"Depending on the abs value this can either be exact chosen fps (abs = true) or a multiplier (abs = false)",
"Denuminator for fps, leave this as 1 if you plan on using a fixed fps.",
"Set to True if you want to set the FPS to a specific value (60FPS/144FPS and so on), or you want to use the same as FPS that the source have multiploed by x2,x3.. and so on.",
"Rendering algorithm or \"SVP shader\", available values are:<br/>1 - sharp picture without any blending, moves pixels by motion vectors from next frame to current. Requires only backward motion vectors (\"analyse.vectors: 2\") so it's the fastest possible method.<br/>2 - like 1st but moves pixels from the nearest (in terms of time) frame so it uses both backward and forward vectors. Recommended for 2D animations.<br/>11 - time weighted blend of forward and backward partial motion compensations.<br/>13 - same as 11th but with dynamic median added. Produces minimum artifacts but with noticeable halos around moving objects.<br/>21 - 11th plus additional cover/uncover masking to minimize halos and improve frame edges.<br/>23 - 21th plus extra vectors from adjacent frames for further decreasing of halos, can be less smooth than 21th.",
"Defines which video card should be used for rendering, only works with GPU rendering enabled:<br/>0 - default (use 1st available GPU),<br/>11 - use 1st GPU device on 1st OpenCL platfrom,<br/>12 - use 2nd GPU device on 1st OpenCL platfrom,<br/>21 - use 1st GPU device on 2nd OpenCL platfrom an so on.",
"Cover/uncover mask strength, more means \"more strong mask\". Recommended values 50-100.",
"Bad areas (identified by vector's SAD values) mask, more means \"more strong mask\". Recommended value is 100, but it can dramatically reduce smoothness effect.",
"Defines the exponent of relation between SAD and area mask values.",
"Frames interpolation mode:<br/>0 - uniform interpolation for maximum smoothness. For example for 24->60 conversion output will be: \"1mmmm1mmmm...\", where \"1\" stands for original frame and \"m\" for interpolated one.<br/>1 - \"1m\" mode that gives \"1mm1m1mm1m...\" output in the above example => less artifacts at the cost of less smoothness.<br/>2 - \"2m\" mode: \"1m11m11m11...\" => much less artifacts and much less smoothness.<br/>3 - adaptive mode that switches between modes 0,1,2 based on overall vector field quality.",
"Blend frames at scene change like ConvertFps if true, or repeat last frame like ChangeFps if false."];

superDescription = [
"The accuracy of the motion estimation. Value can only be 1, 2 or 4. 1 means a precision to the pixel, 2 means a precision to half a pixel, 4 - to quarter pixel (not recommended to use).",
"Subpixel interpolation method for pel=2,4. <br/>0 for soft interpolation (bilinear),<br/> 1 for bicubic interpolation (4 tap Catmull-Rom),<br/> 2 for sharper Wiener interpolation (6 tap, similar to Lanczos).",
"Hierarchical levels smoothing and reducing (halving) filter.<br/>0 is simple 4 pixels averaging like unfiltered SimpleResize (old method);<br/>1 is triangle (shifted) filter like ReduceBy2 for more smoothing (decrease aliasing);<br/>2 is triangle filter like BilinearResize for even more smoothing;<br/>3 is quadratic filter for even more smoothing;<br/>4 is cubic filter like BicubicResize(b=1,c=0) for even more smoothing.",
"Should the interpolation use GPU 1 or not 0",
"Used by the SVP Manager only. You don't need to set this in your own scripts."];