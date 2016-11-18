function createTableFromJSON(name, json, description){
    var tb = $('<table/>').attr('id',name);
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
                var tdDescription = $('<td/>').append($('<p/>').attr('class','descriptionBox').html(description[i])).click(function(){$(this).parent().find('td input').select()});

                tr.append(tdName.attr('class','name'));
                tr.append(tdCustomVal.attr('class','customValue'));
                tr.append(tdDefaultValue.attr('class','defaultValue'));
                tr.append(tdDescription.attr('class','description'));
                tb.append(tr);
                i++;
            }
        }
    }
    createRowFromJSON(json);

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

    $(window).resize(function(){
        $.each($('descriptionBox'),function(){
            $(this).width($(this).parent().width());
            $(this).height('auto').height(this.scrollHeight);
        });
    });

    $.each($('input'),function(){
        $(this).width($(this).parent().parent().find('.defaultValue').width()-20);
    });

    $(window).resize(function(){
        $.each($('input'),function(){
            $(this).width($(this).parent().parent().find('.defaultValue').width()-20);
        });
    });
}
    
function putEventsOnButtons(){
    $('#settings').height($('#settings')[0].scrollHeight)
    $('#export').height($('#settings')[0].scrollHeight);

    $(window).resize(function(){
        $('#settings').height($('#settings')[0].scrollHeight)
        $('#export').height($('#settings')[0].scrollHeight);
    });

    $('#exportSettings').click(function(){
        result();
        $('#settings').removeAttr('hidden').height($('#settings')[0].scrollHeight).focus(function(){$(this).select();});
        $('#export').removeAttr('hidden').height($('#settings')[0].scrollHeight).focus(function(){$(this).select();});
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });

    $('#importSettings').on('input',function(){
        importAll();
        $('#importSettings').val('').attr('placeholder','Imported successfully!');
    });
}