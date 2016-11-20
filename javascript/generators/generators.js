function createTableFromJSON(headerName,tableName, jsonParameters, descriptionParameters){
    var tb = $('<table/>').attr('id',tableName);
    var tr = $('<tr/>');
    tr.append($('<th/>').text('Parameter'));
    tr.append($('<th/>').text('Custom Value'));
    tr.append($('<th/>').text('Default Value'));
    tr.append($('<th/>').text('Description'));
    tr.appendTo(tb);

    var i = 0;
    function createRowFromJSON(json){
        for(var element in json){
            var tr = $('<tr/>');
            
            if(typeof json[element] === 'object'){
                createRowFromJSON(json[element]);
            } else {
                var input = $('<input>').val(json[element]).attr({'type':'text', 'class':'value'}).click(function(){$(this).select()})
                var tdName = $('<td/>').text(element).click(function(){$(this).parent().find('td input').select()});
                var tdCustomVal = $('<td/>').append(input).click(function(){$(this).parent().find('td input').select()});;
                var tdDefaultValue = $('<td/>').text(json[element]).click(function(){$(this).parent().find('td input').select()});
                var tdDescription = $('<td/>').append($('<p/>').attr('class','descriptionBox').html(descriptionParameters[i])).click(function(){$(this).parent().find('td input').select()});

                tr.append(tdName.attr('class','name'));
                tr.append(tdCustomVal.attr('class','customValue'));
                tr.append(tdDefaultValue.attr('class','defaultValue'));
                tr.append(tdDescription.attr('class','description'));
                tb.append(tr);
                i++;
            }
        }
    }
    createRowFromJSON(jsonParameters);

    $("#options").append($('<h1/>').text(headerName));
    $("#options").append(tb);
}

function modifyJSON(json, tableName){
    var i = 0;
    var modifiedValues = [];
    
    $('#'+ tableName +' .value').each(function(){
        modifiedValues.push($(this).val());
    });
    
    function modifyDepthJSON(json){
        for(var element in json){
            if(typeof json[element] === 'object'){
                modifyDepthJSON(json[element]);
            } else {
                json[element] = modifiedValues[i];
                i++;
            }
        }
    }
    modifyDepthJSON(json);

    return json;
}

function importJSON(tableName, json){
    var i = 0;
    var modifiedValues = [];
    var json = JSON.parse(json);

    function importDepthJSON(json){
        for(var element in json){
            if(typeof json[element] === 'object'){
                importDepthJSON(json[element]);
            } else {
                modifiedValues.push(json[element]);
            }
        }
    }
    
    importDepthJSON(json);
    
    $('#'+ tableName +' .value').each(function(){
        $(this).val(modifiedValues[i]);
        i++;
    }); 

    return json;
}

function autoGrowInputs(){   
    $.each($('.descriptionBox'),function(){
        $(this).width($(this).parent().width());
        $(this).height('auto').height(this.scrollHeight);
    });

    $.each($('input'),function(){
        $(this).width($(this).parent().parent().find('.defaultValue').width()-20);
    });
}
    
function putEventsOnButtons(){
    $('#exportSettings').click(function(){
        result();
        $('#outputSettings').removeAttr('hidden');
        $('#settingsOutput').height($('#settingsOutput')[0].scrollHeight).focus(function(){$(this).select();});
        $('#vapourSynthOutput').height($('#aviSynthOutput')[0].scrollHeight).focus(function(){$(this).select();});
        $('#aviSynthOutput').height($('#aviSynthOutput')[0].scrollHeight).focus(function(){$(this).select();});
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

    $('#importSettings').on('input',function(){
        importAll();
        $('#importSettings').val('').attr('placeholder','Your settings were imported successfully!');
    });
}

function createAllTables(){
    createTableFromJSON("Computer Settings","config", configParameters, configDescription);
    createTableFromJSON("Super Parameters","super", superParameters, superDescription);
    createTableFromJSON("Analyse Parameters","analyse",analyseParameters, analyseDescription);
    createTableFromJSON("Render Parameters","smooth",smoothParameters, smoothDescription);
}

function importAll(){
    var json = $('#importSettings').val().split('\n');

    importJSON('config', json[0])
    importJSON('super', json[1]);
    importJSON('analyse', json[2]);
    importJSON('smooth', json[3]);
}

function exportAll(){
    var configJSON = JSON.stringify(configParameters);
    var superJSON = JSON.stringify(superParameters);
    var analyseJSON = JSON.stringify(analyseParameters);
    var smoothJSON = JSON.stringify(smoothParameters);
    
    var settings = configJSON + "\n" + superJSON + "\n" + analyseJSON + "\n" + smoothJSON;
    var vapourSynth = 'import vapoursynth as vs\ncore = vs.get_core(threads=' + configParameters.threads + ')\nclip = video_in\nclip = clip.resize.Bicubic(format=vs.YUV420P8)\nsuper = core.svp1.Super(clip,"' + superJSON.replace(/"/g,"") + '")\nvectors = core.svp1.Analyse(super["clip"],super["data"],clip,"' + analyseJSON.replace(/"/g,"") + '")\nsmooth = core.svp2.SmoothFps(clip,super["clip"],super["data"],vectors["clip"],vectors["data"],"' + smoothJSON.replace(/"/g,"") + '",src=clip,fps=container_fps)\nsmooth = core.std.AssumeFPS(smooth,fpsnum=smooth.fps_num,fpsden=smooth.fps_den)\nsmooth.set_output()';
    var aviSynth = 'SetMemoryMax(' + configParameters.memory + ')\nglobal svp_scheduler=true\nglobal threads=' + configParameters.threads + '\nSetMTMode(3,' + configParameters.threads + ')\nglobal svp_cache_fwd=' + configParameters.threads + '+2\nffdShow_source()\nSetMTMode(2)\nvideo_fps = last.Framerate\ninput = last\nsuper=SVSuper(input, "' + superJSON.replace(/"/g,"") + '")\nvectors=SVAnalyse(super, "' + analyseJSON.replace(/"/g,"") + '", src=input)\nSVSmoothFps(input, super, vectors, "' + smoothJSON.replace(/"/g,"") + '", mt=' + configParameters.threads + ')\nSetMTMode(1)\nGetMTMode(false) > 0 ? distributor() : last';

    $('#settingsOutput').val(settings);
    $('#vapourSynthOutput').val(vapourSynth);
    $('#aviSynthOutput').val(aviSynth);
}

function modifyAll(){
    modifyJSON(configParameters, "config");
    modifyJSON(superParameters,"super");
    modifyJSON(analyseParameters,"analyse");
    modifyJSON(smoothParameters,"smooth");
}

function result(){
    modifyAll();
    exportAll();
}
