function createHeader(){
	var ul = $('<ul>');

	for(var index in headerParameters){
		ul.append($('<a/>').attr('href',headerParameters[index].link).append($('<li/>').attr('class','button').text(headerParameters[index].name)));
		console.log(ul);
	}

	$('#header').append(ul);
}

function createFooter(){
	$('#footer').append($('<p/>').html('&copy; 2016 Bare7a').append($('<a/>').attr('href','github').text(' GitHub')));
}