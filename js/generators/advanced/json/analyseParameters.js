var analyseParameters =
    {
        "gpu": 0, //GPU usage mode: 0 - none, 1 - for frame rendering. Should be used instead of "super.gpu" if and only if SVSuper is replaced with MSuper!
        "vectors": 3, // Direction of motion vectors to search for.
        //1 - forward only, from current frame to the following one (not useful at all),
        //2 - backward only, from following frame to the current one (useful only with "smoothfps.algo: 1"),
        //3 - search both directions.
        "block": { //Defines vectors grid step and block sizes for block matching algorithm.
            "w": 16, //Size of a block (horizontal). It's either 8, 16 or 32. Larger blocks are less sensitive to noise, are faster, but also less accurate, smaller blocks produce more wavy picture.
            "h": 16, //Vertical size of a block. Default is equal to horizontal size. Additional options are: 4 for "block.w:8", 8 for "block.w:16", 16 for "block.w:32".
            "overlap": 2 //Block overlap value. 0 - none, 1 - 1/8 of block size in each direction, 2 - 1/4 of block size, 3 - 1/2 of block size. The greater overlap, the more blocks number, and the lesser the processing speed.Resulting overlap value in pixels should be even with CPU rendering.
        },
        "main": { //Defines main search settings.
            "levels": 0, //Positive value is the number of levels used in the hierarchical analysis made while searching for motion vectors. Negative or zero value is the number of coarse levels NOT used in the hierarchical analysis made while searching for motion vectors.
            "search": {
                "type": 4, //The type of search on finest level:
                //2 - Hexagon search, similar to x264,
                //3 - Uneven Multi Hexagon (UMH) search, similar to x264,
                //4 - Exhaustive search, slowest but it gives the best results.
                "distance": -2 * superParameters.pel, //Search range on finest level:
                //0 - don't search on finest level at all, greatly increase search speed but may still looks good with GPU rendering. This option is opposite to "super.pel".
                //>0 - classic fixed range in pixels.
                //<0 - "adaptive" range based on block local contrast. Range is small or zero for low contrast blocks (black/gray for example) but is big for blocks that has many visible details. Effective average range in common scenes is about 1/3 of this value.
                "sort": true, //Sort vectors from previous level by SAD values to define the order of blocks scanning so the search begins with better predictors. This option is always ON on coarse levels but may be time consuming on finest one.
                "satd": false, //Use SATD function instead of SAD on finest level. Extremely slow, do not use it!
                "coarse": { //The same parameters for coarse levels.
                    "width": 1050, //Maximum width of a level to be processed with 'coarse' parameters. Can be useful to save CPU power when processing extra large frames (like UHD (4K)).
                    "type": 4, //Same as "main.search.type".
                    "distance": 0, //Same as "main.search.type" except zero means "-10".
                    "satd": true, //Use SATD function instead of SAD on every coarse level, improves motion vector estimation at luma flicker and fades.
                    "trymany": false, //Try to start searches around many predictors.
                    "bad": { //Wide second search for bad vectors.
                        "sad": 1000, //SAD threshold to define "bad" vectors. Value is scaled to block size 8x8.
                        "range": -24 //The range of wide search for bad blocks. Use positive value for UMH search and negative for Exhaustive search.
                    }
                }
            },
            "penalty": { //Main search penalties for motion coherence.
                "lambda": 10.0, //Set the coherence of the field of vectors. The higher, the more coherent. However, if set too high, some best motion vectors can be missed.
                //This value is different from MVTools, see remark for explanations.
                "plevel": 1.5, //penalty.lambda scaling mode between levels. 1.0 means no scaling, 2.0 - linear, 4.0 - quadratic dependence from hierarchical level number.
                //This value is different from MVTools, see remark for explanations.
                "lsad": 8000, //SAD limit for lambda using. Local lambda is smoothly decreased if SAD value of vector predictor is greater than the limit. It prevents bad predictors using but decreases the motion coherence. Value is scaled to block size 8x8.
                "pnew": 50, //Relative penalty (scaled to 256) to SAD cost for new candidate vector. New candidate vector must be better will be accepted as new vector only if its SAD with penalty (SAD + SAD*pnew/256) is lower then predictor cost (old SAD). It prevent replacing of quite good predictors by new vector with a little better SAD but different length and direction.
                "pglobal": 50, //Relative penalty (scaled to 256) to SAD cost for global predictor vector (lambda is not used for global vector).
                "pzero": 100, //Relative penalty (scaled to 256) to SAD cost for zero vector. It prevent replacing of quite good predictor by zero vector with a little better SAD (lambda is not used for zero vector).
                "pnbour": 50, //Relative penalty (scaled to 256) to SAD cost for up to 8 neighbours vectors.
                "prev": 0, //Relative penalty (scaled to 256) to SAD cost for "reverse" vector (already found vector from reverse search direction), works only with "analyse.vectors: 3".
            }
        },
        "refine": [{ //Array of structures, each element defines additional level of recalculation, on each level blocks are divided by 4. Replaces MRecalculate function.
            //Interpolated vectors of old blocks are used as predictors for new vectors, with recalculation of SAD.
            "thsad": 200, //Only bad quality new vectors with SAD above this threshold will be re-estimated by search. Good vectors are not changed, but its SAD will be updated (re-calculated). Value is scaled to block size 8x8. Zero means "do not refine, just divide"
            "search": { //Search parameters.
                "type": 4, //Same as main.search.type by default.
                "distance": superParameters.pel, //Same as super.pel value by default.
                "satd": false //Same as main.search.satd by default.
            },
            "penalty": {
                "pnew": 50 //Same as main.penalty.pnew by default.
            }
        }],
        "special": { //Some special parameters not used in SVP
            "delta": 1 //Interval between analysed frames.
        }
    }