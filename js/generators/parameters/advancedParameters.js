var superParameters = 
{
    "pel": 2, 
    "gpu": 0, 
    "full": true, 
    "scale": { 
        "up": 2, 
        "down": 4 
    },
    "rc": 0   
}

var analyseParameters =
{
    "gpu": 0, 
    "vectors": 3, 
    "block": { 
        "w": 16, 
        "h": 16, 
        "overlap": 2 
    },
    "main": { 
        "levels": 0, 
        "search": {
            "type": 4, 
            "distance": -2 * superParameters.pel, 
            "sort": true, 
            "satd": false, 
            "coarse": { 
                "width": 1050, 
                "type": 4, 
                "distance": 0, 
                "satd": true, 
                "trymany": false, 
                "bad": { 
                    "sad": 1000, 
                    "range": -24 
                }
            }
        },
        "penalty": { 
            "lambda": 10.0, 
            "plevel": 1.5, 
            "lsad": 8000, 
            "pnew": 50, 
            "pglobal": 50, 
            "pzero": 100, 
            "pnbour": 50, 
            "prev": 0, 
        }
    },
    "refine": [{ 
        "thsad": 200, 
        "search": { 
            "type": 4, 
            "distance": superParameters.pel, 
            "satd": false 
        },
        "penalty": {
            "pnew": 50 
        }
    }],
    "special": { 
        "delta": 1 
    }
}

var configParameters = 
{
    "memory" : 2048,
    "threads": 7,
    "source" : "ffdShow",
    "path": "C:\\Program Files (x86)\\AviSynth\\plugins"
}

var smoothParameters = 
{
    "rate": { 
        "num": 2, 
        "den": 1, 
        "abs": false 
    },
    "algo": 13, 
    "block": false, 
    "cubic": 1, 
    "gpuid": 0, 
    "linear": true, 
    "mask": { 
        "cover": 100, 
        "area": 0, 
        "area_sharp": 1.0 
    },
    "scene": { 
        "mode": 3, 
        "blend": false, 
        "limits": { 
            "m1": 1600, 
            "m2": 2800, 
            "scene": 4000, 
            "zero": 200, 
            "blocks": 20 
        },
        "luma": 1.5 
    },
    "light": { 
        "aspect": 0.0, 
        "sar": 1.0, 
        "zoom": 0.0, 
        "lights": 16, 
        "length": 100, 
        "cell": 1.0, 
        "border": 12 
    }
}