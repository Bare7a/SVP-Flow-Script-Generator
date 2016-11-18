var moreDescription = [
"The accuracy of the motion estimation. Value can only be 1, 2 or 4. 1 means a precision to the pixel, 2 means a precision to half a pixel, 4 - to quarter pixel (not recommended to use).",
"Block overlap value. 0 - none, 1 - 1/8 of block size in each direction, 2 - 1/4 of block size, 3 - 1/2 of block size. The greater overlap, the more blocks number, and the lesser the processing speed. Resulting overlap value in pixels should be even with CPU rendering.",
"Size of a block (horizontal). It's either 8, 16 or 32. Larger blocks are less sensitive to noise, are faster, but also less accurate, smaller blocks produce more wavy picture.",
"Vertical size of a block. Default is equal to horizontal size. Additional options are: 4 for \"block.w:8\", 8 for \"block.w:16\", 16 for \"block.w:32\".",
"By two with global refinement {thsad:250}\\{thsad:4000}\\{thsad:65000},{thsad:65000}\\{thsad:65000} To small step 6-8 px",
"Blend frames at scene change like ConvertFps if true, or repeat last frame like ChangeFps if false.",
"Cover/uncover mask strength, more means \"more strong mask\". Recommended values 50-100.",
"Bad areas (identified by vector's SAD values) mask, more means \"more strong mask\". Recommended value is 100, but it can dramatically reduce smoothness effect.",
"Defines the exponent of relation between SAD and area mask values."]