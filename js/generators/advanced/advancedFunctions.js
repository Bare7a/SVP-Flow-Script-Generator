function createAllTables(){
    createTableFromJSON("AviSynth", aviSynthParameters, aviSynthDescription);
    createTableFromJSON("Super", superParameters, superDescription);
    createTableFromJSON("Analyse",analyseParameters, analyseDescription);
    createTableFromJSON("Render",renderParameters, renderDescription);
}

function importAll(){
    var json = $('#importSettings').val().split('\n');

    importJSON('AviSynth', json[0])
    importJSON('Super', json[1]);
    importJSON('Analyse', json[2]);
    importJSON('Render', json[3]);
}

function exportAll(){
    var aviSynthJSON = JSON.stringify(aviSynthParameters);
    var superJSON = JSON.stringify(superParameters);
    var analyseJSON = JSON.stringify(analyseParameters);
    var renderJSON = JSON.stringify(renderParameters);
    var result = aviSynthJSON + "\n" + superJSON + "\n" + analyseJSON + "\n" + renderJSON;
    var settings = 'SetMemoryMax(' + aviSynthParameters.memory + ')\nglobal svp_scheduler=true\nglobal threads=' + aviSynthParameters.threads + '\nSetMTMode(3,' + aviSynthParameters.threads + ')\nglobal svp_cache_fwd=' + aviSynthParameters.threads + '+2\nLoadPlugin("' + aviSynthParameters.path + '\\svpflow1.dll")\nLoadPlugin("' + aviSynthParameters.path + '\\svpflow2.dll")\nffdShow_source()\nSetMTMode(2)\nsuper_params = "' + superJSON.replace(/"/g,"") + '"\nanalyse_params = "'+ analyseJSON.replace(/"/g,"") +'"\nsmoothfps_params = "'+ renderJSON.replace(/"/g,"") +'"\ninput = last\nsuper=SVSuper(input, super_params)\nvectors=SVAnalyse(super, analyse_params, src=input)\nSVSmoothFps(input, super, vectors, smoothfps_params, mt=' + aviSynthParameters.threads + ')\nSetMTMode(1)\nGetMTMode(false) > 0 ? distributor() : last';

    $('#settings').val(settings);
    $('#export').val(result);
}

function modifyAll(){
    modifyJSON(aviSynthParameters, "AviSynth");
    modifyJSON(superParameters,"Super");
    modifyJSON(analyseParameters,"Analyse");
    modifyJSON(renderParameters,"Render");
}

function result(){
    modifyAll();
    exportAll();
}