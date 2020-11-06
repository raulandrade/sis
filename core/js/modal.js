$(document).ready(function(event) {
// inicia os modais
	$('.modal-btn').click(function(event) {
		event.preventDefault();

		var pg = $('body > .page');
		pg.css({'opacity':0.1});
		var pgLeft = pg.offset().left;
		var posX = event.pageX,
			posY = event.pageY;
			//console.log(pgLeft);
		get_modal_fade().fadeIn('fast');
		var modal = $($(this).data('modal-selector'));
		var meio = $(window).outerHeight()/2 - modal.height()/2 + $(window).scrollTop();
		modal.css({height:"auto"});
		modal.show().css({'top': meio, 'opacity': 1, 'left': 0});

		if( modal.hasClass('modal-bottom') ){
			modal.show().animate({'opacity': 1,'bottom': meio}, 500);
		}
		else{
			// TweenMax.from(modal, 0.5, {css:{top: posY, left: posX, height: 0, width:0}});
			TweenMax.from(modal, 0.5, {css:{top: posY, left: posX, height: 0, width:0}});
		}
	});

	$('.modal .btn-close').click(function(event){

		var pg = $('body > .page');
		

		var modal = $(this).parents('.modal');
		if( modal.hasClass('modal-bottom') ){
			modal.animate({'opacity': 0}, 500,function(){
				modal.hide();
				pg.css({ 'opacity': "1" });
				get_modal_fade().fadeOut('fast');
			});
		}
		else{
			modal.animate({'opacity': 0}, 500,function(){
				modal.hide();
				get_modal_fade().fadeOut('fast');
				pg.css({ 'opacity': "1" });
			});
		}
	});

	function responsive_height(){
		pageWidth = $('body > .page').width();
		var modal = $('.modal');
		modal.css({'width':pageWidth});
		$('body > .page').css('margin-top', 0 );
		if( window.innerWidth < 700 ){
			var ht = $('body > .page > .header').outerHeight(true);
			var cont = $('body > .page > .conteudo');
			var hc = cont.outerHeight(true);
			var dif = window.innerHeight - ht - hc;
			if( dif > 0 ){
				cont.height( cont.height() + dif );
			}
		}
		else{
			var dif = window.innerHeight - $('body').height();
			if( dif > 0 ){
				$('body > .page').css('margin-top', dif/2 );
			}
		}
	}

	function get_modal_fade() {
		var modal_fade = $('#modal-fade');
		if( modal_fade.length == 0 ) {
			modal_fade = $('<div id="modal-fade"></div>').appendTo('body');
		}
		return modal_fade;
	}

});