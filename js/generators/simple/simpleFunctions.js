function createAllTables(){
    createTableFromJSON("Computer Settings","pc", pcParameters, pcDescription);
    createTableFromJSON("Smooth Video Project Settings","svp",svpParameters, svpDescription);
    createTableFromJSON("More Settings","more",moreParameters, moreDescription);
}

function importAll(){
    var json = $('#importSettings').val().split('\n');

    importJSON('PC', json[0])
    importJSON('SVP', json[1]);
    importJSON('More', json[2]);
}

function exportAll(){
    var pcJSON = JSON.stringify(pcParameters);
    var svpJSON = JSON.stringify(svpParameters);
    var moreJSON = JSON.stringify(moreParameters);
    var result = pcJSON + "\n" + svpJSON + "\n" + moreJSON;

    var settings = 'SetMemoryMax(' + pcParameters.memory + ')\nglobal svp_scheduler=true\nglobal threads=' + pcParameters.threads + '\nSetMTMode(3,' + pcParameters.threads + ')\nglobal svp_cache_fwd=' + pcParameters.threads + '+2\nLoadPlugin("' + pcParameters.path + '\\svpflow1.dll")\nLoadPlugin("' + pcParameters.path + '\\svpflow2.dll")\nffdShow_source()\nSetMTMode(2)\nvideo_fps = last.Framerate\nsuper_params = "{pel:' + moreParameters.pel + ',scale:{up:2,down:4},gpu:' + pcParameters.gpu + ',rc:true}"\nanalyse_params = "{block:{overlap:' + moreParameters.overlap + ',w:' + moreParameters.width + ',h:' + moreParameters.height + '},main:{search:{coarse:{distance:-8,bad:{sad:2000}}}},refine:[{thsad:' + moreParameters.thsad + '}]}"\nsmoothfps_params = ' 

    if(svpParameters.fixedFps == "true"){
        settings+='video_fps == 24000/1001 || video_fps == 25000/1001 || video_fps == 48000/1001 || video_fps == 30000/1001  ? "{rate:{num:' + svpParameters.videoFps + '000,den:1001,abs:' + svpParameters.fixedFps + '},algo:' + svpParameters.svpShader + ',gpuid:' + pcParameters.gpuId + ',mask:{cover:' + moreParameters.cover + ',area:' + moreParameters.area + ',area_sharp:' + moreParameters.areaSharp + '},scene:{mode:' + svpParameters.frameMode + ',blend:' + moreParameters.blend + '}}" : ';
    }
        settings+='"{rate:{num:' + svpParameters.videoFps + ',den:1,abs:' + svpParameters.fixedFps + '},algo:' + svpParameters.svpShader + ',gpuid:' + pcParameters.gpuId + ',mask:{cover:' + moreParameters.cover + ',area:' + moreParameters.area + ',area_sharp:' + moreParameters.areaSharp + '},scene:{mode:' + svpParameters.frameMode + ',blend:' + moreParameters.blend + '}}"\ninput = last\nsuper=SVSuper(input, super_params)\nvectors=SVAnalyse(super, analyse_params, src=input)\nSVSmoothFps(input, super, vectors, smoothfps_params, mt=' + pcParameters.threads + ')\nSetMTMode(1)\nGetMTMode(false) > 0 ? distributor() : last';

    $('#settings').val(settings);
    $('#export').val(result);
}

function modifyAll(){
    modifyJSON(pcParameters, "PC");
    modifyJSON(svpParameters,"SVP");
    modifyJSON(moreParameters,"More");
}

function result(){
    modifyAll();
    exportAll();
}