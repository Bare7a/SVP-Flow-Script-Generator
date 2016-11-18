var superParameters = 
{
    "pel": 2, //The accuracy of the motion estimation. Value can only be 1, 2 or 4. 1 means a precision to the pixel, 2 means a precision to half a pixel, 4 - to quarter pixel (not recommended to use).
    "gpu": 0, //GPU usage mode: 0 - none, 1 - for frame rendering. Note that with "gpu:1" scaling up mode is always set to 0 cause subpixel planes are not actually used for frame rendering.
    "full": true, //Turns on reduced super clip size when full=false, valid only with pel=1. It saves some memory and can be useful for processing extra large frames (like UHD (4K)).
    "scale": { //Scaling modes:
        "up": 2, //Subpixel interpolation method for pel=2,4.
        //0 for soft interpolation (bilinear),
        //1 for bicubic interpolation (4 tap Catmull-Rom),
        //2 for sharper Wiener interpolation (6 tap, similar to Lanczos).
        "down": 4 //Hierarchical levels smoothing and reducing (halving) filter.
            //0 is simple 4 pixels averaging like unfiltered SimpleResize (old method);
            //1 is triangle (shifted) filter like ReduceBy2 for more smoothing (decrease aliasing);
            //2 is triangle filter like BilinearResize for even more smoothing;
            //3 is quadratic filter for even more smoothing;
            //4 is cubic filter like BicubicResize(b=1,c=0) for even more smoothing.
    },
    "rc": 0   //Used by the SVP Manager only. You don't need to set this in your own scripts.
}