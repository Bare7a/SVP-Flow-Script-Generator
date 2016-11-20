var superParameters = 
{
	pel:2,
	scale:{
		up:2,
		down:4
	},
	gpu:1,
	rc:true
}

var analyseParameters =
{
	block:{
		overlap:1,
		w:32,
		h:32
	},
	main:{
		search:{
			coarse:
			{
				distance:-8,
				bad:{
					sad:2000
				}
			}
		}
	},
	refine:[{
		thsad:250
	}]
}

var configParameters = 
{
	"memory" : "2048",
	"threads" : "15"
}

var smoothParameters =
{
	rate:{
		num:60,
		den:1,
		abs:true
	},
	algo:13,
	gpuid:21,
	mask:{
		cover:70,
		area:70,
		area_sharp:1.65
	},
	scene:{
		mode:0,
		blend:false
	}
}