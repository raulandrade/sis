$(function(){
	
	var ratioW = 16;
	var ratioH = 9;
	var widthInicial = $('#unityPlayer').parent().width();
	var heightInicial = (ratioH*widthInicial)/ratioW;

	$('#unityPlayer > embed').width(widthInicial);
	$('#unityPlayer > embed').height(heightInicial);

	$(window).resize(function(){
		var widthAtual = $('#unityPlayer').parent().width();
		var heightAtual = (ratioH*widthAtual)/ratioW;
		$('#unityPlayer > embed').width(widthAtual);
		$('#unityPlayer > embed').height(heightAtual);
		
	});


});