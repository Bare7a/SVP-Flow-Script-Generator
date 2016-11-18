var renderParameters = 
{
    "rate": { //Target frame rate.
        "num": 2, //Numerator of multiplier for frame rate change.
        "den": 1, //Denominator of multiplier for frame rate change.
        "abs": false //If true then num/den define absolute frame rate value instead if multiplier for source frame rate.
    },
    "algo": 13, //Rendering algorithm or "SVP shader", available values are:
    //1 - sharp picture without any blending, moves pixels by motion vectors from next frame to current. Requires only backward motion vectors ("analyse.vectors: 2") so it's the fastest possible method.
    //2 - like 1st but moves pixels from the nearest (in terms of time) frame so it uses both backward and forward vectors. Recommended for 2D animations.
    //11 - time weighted blend of forward and backward partial motion compensations.
    //13 - same as 11th but with dynamic median added. Produces minimum artifacts but with noticeable halos around moving objects.
    //21 - 11th plus additional cover/uncover masking to minimize halos and improve frame edges.
    //23 - 21th plus extra vectors from adjacent frames for further decreasing of halos, can be less smooth than 21th.
    "block": false, //Use block-based motion compensation instead of pixel-based. Always OFF with GPU rendering enabled.
    "cubic": 1, //Only works with GPU rendering enabled:
    //0 - use bilinear interpolation for motion vectors and all masks,
    //1 - use bicubic interpolation
    "gpuid": 0, //Defines which video card should be used for rendering, only works with GPU rendering enabled:
    //0 - default (use 1st available GPU),
    //11 - use 1st GPU device on 1st OpenCL platfrom,
    //12 - use 2nd GPU device on 1st OpenCL platfrom,
    //21 - use 1st GPU device on 2nd OpenCL platfrom an so on.
    "linear": true, //Only works with GPU rendering enabled. When set to "true" frame rendering is done in linear light.
    "mask": { //Masks properties.
        "cover": 100, //Cover/uncover mask strength, more means "more strong mask". Recommended values 50-100.
        "area": 0, //Bad areas (identified by vector's SAD values) mask, more means "more strong mask". Recommended value is 100, but it can dramatically reduce smoothness effect.
        "area_sharp": 1.0 //Defines the exponent of relation between SAD and area mask values.
    },
    "scene": { //Extended "scene change" controls.
        "mode": 3, //Frames interpolation mode:
        //0 - uniform interpolation for maximum smoothness. For example for 24->60 conversion output will be: "1mmmm1mmmm...", where "1" stands for original frame and "m" for interpolated one.
        //1 - "1m" mode that gives "1mm1m1mm1m..." output in the above example => less artifacts at the cost of less smoothness.
        //2 - "2m" mode: "1m11m11m11..." => much less artifacts and much less smoothness.
        //3 - adaptive mode that switches between modes 0,1,2 based on overall vector field quality.
        "blend": false, //Blend frames at scene change like ConvertFps if true, or repeat last frame like ChangeFps if false.
        "limits": { //Limits for vector field quality / scene change detection. For example scene change will be detected if number of blocks with "adjusted SAD" > "limits.scene" will be more than "limits.blocks" percents of all blocks, that has "adjusted SAD" value > "limits.zero", where "adjusted SAD" is "block SAD"/"block average luma".
            "m1": 1600, //Limit for changing uniform mode to "1m".
            "m2": 2800, //Limit for changing "1m" mode to "2m".
            "scene": 4000, //Limit for scene change detection.
            "zero": 200, //Vectors with "adjusted SAD" less than this value are excluded from consideration.
            "blocks": 20 //Threshold which sets how many blocks in percents have to change.
        },
        "luma": 1.5 //Additional correction parameter for "average luma" value.
    },
    "light": { //"Ambilight"-like black fields lighting.
        "aspect": 0.0, //Screen aspect ratio defines black fields height (or width) and output video frame size.
        "sar": 1.0, //Source video pixel aspect ratio.
        "zoom": 0.0, //"Glow" (or "zoom out") effect size, in percents of original frame size.
        "lights": 16, //Lights count.
        "length": 100, //Flare length in percents.
        "cell": 1.0, //Width of every light.
        "border": 12 //Height of averaging frame border.
    }
}