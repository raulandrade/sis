
$(document).ready(function(event) {

	var tamanho = location.href.lastIndexOf('/');
	var arquivo = location.href.substring(tamanho+1);
	var numero = arquivo.lastIndexOf('.');
	CURRENT_PAGE = arquivo.substring(0,numero);

	document.title = 'Página '+ CURRENT_PAGE + ' - ' +MODULE_NAME;

	 // Modal das Unidades
		UNIDADES_MODAL =
		'<div id="unidades-modal" class="modal-unidades">'+
            '<div class="page">'+

                '<div class="header"><div class="btn-close">x</div></div>'+
                '<h2>Selecione a unidade:</h2>'+
                '<div class="grid-row">'+
                    '<ul>'+

                        '<li>'+
                            '<a href="../und1/1.html">'+
                            	'<div class="tamanho10">'+
                            	
                                '<img src="../core/img/und_1.png" />'+
                              
                                '</div>'+
                                '<p>Unidade 1</p>'+
                            '</a>'+
                        '</li>'+

                        '<li>'+
                            '<a href="../und2/1.html">'+
                                '<div class="tamanho10">'+
                            	
                                '<img src="../core/img/und_2.png" />'+
                              
                                '</div>'+
                                '<p>Unidade 2</p>'+
                            '</a>'+
                        '</li>'+
                            
                        '<li>'+
                            '<a href="../und3/1.html">'+
                                '<div class="tamanho10">'+
                            	
                                '<img src="../core/img/und_3.png" />'+
                             
                                '</div>'+
                                '<p>Unidade 3</p>'+
                            '</a>'+
                        '</li>'+

                        '<li>'+
                            '<a href="../und4/1.html">'+
                                '<div class="tamanho10">'+
                            	
                                '<img src="../core/img/und_4.png" />'+
                             
                                '</div>'+
                                '<p>Unidade 4</p>'+
                            '</a>'+
                        '</li>'+
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</div>';

	// escreve o header da página
	var header = $('body > .page > .header');
	header.empty();
	header.html(
		'<div class="top '+ COLOR_CABEC +'">'+ COURSE_NAME +' :: '+ MODULE_NUMBER +' :: '+ MODULE_NAME +'</div>'+
		'<div class="breadcrumbs '+ COLOR_TITULO +'">'+
			'<h1 class="'+ COLOR_MENU +'">Unidade '+ UNIDADE_NUMBER +'</h1>'+
			//'<div class="arrow '+ COLOR_MENU +'"></div>'+
			'<h2>'+ UNIDADE_NAME +'</h2>'+
		'</div>'+
		'<ul class="navbar '+ COLOR_MENU +'">'+
			'<li id="unidades" class="icon1-grid" title="Unidades"></li>'+
			'<li id="tamanho_fonte" class="icon1-text-height" title="Tamanho das Fontes"></li>'+
			'<li id="imprimir" class="icon1-file-pdf" title="Livro PDF" onclick="location.href=\''+ LINK_PDF +'\'"></li>'+
			'<li id="sala" class="icon1-home-2" title="Sala de Aula" onclick="location.href=\''+ LINK_SALA +'\'"></li>'+
			
			'<li id="navigator">'+
				'<a href="#" class="voltar icon1-arrow-left '+COLOR_MENU_ARROW+' '+ (CURRENT_PAGE==1?'disabled':'') +'"></a>'+
				'<a href="#" class="atual '+ COLOR_CABEC +'" title="Páginas">'+ CURRENT_PAGE +'</a>'+
				'<a href="#" class="total">'+ PAGES_TOTAL +'</a>'+
				'<a href="#" class="avancar icon1-arrow-right '+COLOR_MENU_ARROW+' '+ (CURRENT_PAGE==PAGES_TOTAL?'disabled':'') +'"></a>'+
			'</li>'+
		'</ul>'+
		'<ul id="tamanho_fonte_menu" class="'+ COLOR_MENU +'">'+
			'<li class="arrow-top"></li>'+
			// '<li onclick="diminuir_fonte()"><img src="../core/css/img/font_size_minus.png" alt="">Diminuir</li>'+
			// '<li onclick="normalizar_fonte()"><img src="../core/css/img/font_size_normal.png" alt="">Fonte padrão</li>'+
			// '<li onclick="aumentar_fonte()"><img src="../core/css/img/font_size_plus.png" alt="">Aumentar</li>'+
			'<li onclick="diminuir_fonte()"><span class="icon-zoom-out"></span> Diminuir</li>'+
			'<li onclick="normalizar_fonte()"><span class="icon-font"></span> Fonte padrão</li>'+
			'<li onclick="aumentar_fonte()"><span class="icon-zoom-in"></span> Aumentar</li>'+
		'</ul>'+
		'<ul id="navigator_menu">'+ get_naviagator_links() + '</ul>'
	);

	// botão das referências
	// $('<a href="media/pdf/referencias.pdf" target="_blank"><img src="../core/css/img/pesquisa.png" alt=""></a>').appendTo('.conteudo')
	// 	.addClass('referencia')
	// 	.attr('title','Referências');
	
	var existeModal = document.getElementById('modalRef');

	if(existeModal) {  
		$('<div class="refCx"><a class="referencia icon1-quotes-left" href="#" target="_blank"></a></div>').appendTo('.conteudo')
			.addClass( 'modal-btn tooltip' )
			.data( 'modal-selector','#modalRef' )
			.attr('title','Referências');
	}
	
	// escreve os modais
	UNIDADES_MODAL = $(UNIDADES_MODAL);
	//REF_MODAL = $(REF_MODAL);
	
	//UNIDADES_MODAL.find('.header').addClass(COLOR1);
	$('body').append( UNIDADES_MODAL );
	//$('body').append( REF_MODAL );

	// configurações finais do tema
	$('body').css('background-color',BGCOLOR);
	$('.caixa-texto').addClass(COLOR_CX);
	$('.caixa-icone').addClass(COLOR_CX_ICONE);
	//$('.modal > .page > .header ').addClass(COLOR_CABEC);
	//$('.conteudo h2').addClass(COLOR1);
	//$('.bloco-1').addClass(COLOR1);

	// inicia os tooltips
	$('.navbar').tooltip();
	$('#navigator').tooltip({ position: {at: "left-10 bottom-5"} });
	$('#referencias').tooltip({ position: { at: "left-70 bottom-10" } });
	$('.tooltip').tooltip();

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
		modal.show().css({'top': meio, 'opacity': 1, 'left': pgLeft});

		if( modal.hasClass('modal-bottom') ){
			modal.show().animate({'opacity': 1,'bottom': meio}, 500);
		}
		else{
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

	//Modal para as unidades
	$('#unidades').on('click', open_modal_unidades);

	$('.modal-unidades .btn-close').click(function(event){

		$('body > .page').css({ 'opacity': "1" });
		var modal = $(this).parents('.modal-unidades');

		modal.animate({'opacity': 0}, 500,function(){
			modal.hide();
			get_modal_fade().fadeOut('fast');
		});
	});

	// tamanho da fonte
	$('#tamanho_fonte').click(function(event){
		event.preventDefault();
		$('#tamanho_fonte_menu').slideToggle('fast');
	});

	$('#tamanho_fonte_menu li').hover(
		function(){
			if( !$(this).hasClass('arrow-top') ){
				$(this).addClass( COLOR_MENU );
			}
		},
		function(){
			if( !$(this).hasClass('arrow-top') ){
				$(this).removeClass( COLOR_MENU );
			}
		}
	);

	// navegação
	$('#navigator .atual, #navigator .total').click(function(event){
		event.preventDefault();
		var menu = $('#navigator_menu');
		if( menu.hasClass('activated') ){
			menu.animate({'right': -400}, 500,function(){
				$(this).removeClass('activated');
			});
		}
		else{
			menu.animate({'right': 0}, 500,function(){
				$(this).addClass('activated');
			});
		}
	});

	$('#navigator .voltar').click(function(event){
		event.preventDefault();
		if( !$(this).hasClass('disabled') ){
			window.location.href = (parseInt(CURRENT_PAGE)-1)+'.html';
		}
	});

	$('#navigator .avancar').click(function(event){
		event.preventDefault();
		if( !$(this).hasClass('disabled') ){
			window.location.href = (parseInt(CURRENT_PAGE)+1)+'.html';
		}
	});

	$('.smart_art').addClass(COLOR3);
	$('.smart_art > ul.smart_menu > li').each(function(){
		$(this).addClass('btn');
		var thisli = $(this);
		$(this).hover(
			function(){
				thisli.addClass(COLOR1).removeClass(COLOR2);
			},
			function(){
				if( !thisli.hasClass('selected') )
				thisli.removeClass(COLOR1).addClass(COLOR2);
			}
		);
		if( $(this).hasClass('selected') ){
			$(this).addClass(COLOR1).removeClass(COLOR2);
			$( $(this).data('smart-selector') ).css('display','list-item');
		}
		else{
			$(this).addClass(COLOR2).removeClass(COLOR1);
		}
	});
	$('.smart_art > ul.smart_cont > li').addClass(COLOR_SMART_LI);
	$('.smart_art > ul.smart_menu > li').click(function(event){
		event.preventDefault();
		if( !$(this).hasClass('selected') ){
			var li = $(this);
			var smart_art = li.parents('.smart_art');
			var menu = smart_art.find('.smart_menu');
			var content = smart_art.find('.smart_cont');

			menu.children('li').removeClass('selected').removeClass(COLOR1)
				.addClass(COLOR2);
			$(this).addClass('selected').addClass(COLOR1).removeClass(COLOR2);

			content.children('li').css('display','none');
			$(li.data('smart-selector')).fadeIn('fast');
		}
	});

	// abas horizontais [desativada - usar jquery UI] (mas favor não deletar o código)
	/* // NÃO DELETAR
	$('.horizontal_tabs > ul.tabs_menu > li').each(function(){
		$(this).addClass('btn').addClass('hover-'+COLOR1);
		if( $(this).hasClass('selected') ){
			$(this).addClass(COLOR1);
		}
		else{
			$(this).addClass(COLOR3);
		}
	});
	$('.horizontal_tabs > ul.tabs_cont').addClass(COLOR_CX);
	$('.horizontal_tabs > ul.tabs_menu > li').click(function(event){
		event.preventDefault();
		if( !$(this).hasClass('selected') ){
			var li = $(this);
			var smart_art = li.parents('.horizontal_tabs');
			var menu = smart_art.find('.tabs_menu');
			var content = smart_art.find('.tabs_cont');

			menu.children('li').removeClass('selected').removeClass(COLOR1)
				.addClass(COLOR3);
			$(this).addClass('selected').addClass(COLOR1).removeClass(COLOR3);

			content.children('li').css('display','none');
			$(li.data('tab-selector')).fadeIn('fast');
		}
	});

	// abas verticais
	$('.vertical_tabs').addClass('clearfix');
	$('.vertical_tabs > ul.tabs_menu > li').each(function(){
		$(this).addClass('btn').addClass('hover-'+COLOR1);
		if( $(this).hasClass('selected') ){
			$(this).addClass(COLOR1);
		}
		else{
			$(this).addClass(COLOR3);
		}
	});
	$('.vertical_tabs > ul.tabs_cont').addClass(COLOR_CX);
	$('.vertical_tabs > ul.tabs_menu > li').click(function(event){
		event.preventDefault();
		if( !$(this).hasClass('selected') ){
			var li = $(this);
			var smart_art = li.parents('.vertical_tabs');
			var menu = smart_art.find('.tabs_menu');
			var content = smart_art.find('.tabs_cont');

			menu.children('li').removeClass('selected').removeClass(COLOR1)
				.addClass(COLOR3);
			$(this).addClass('selected').addClass(COLOR1).removeClass(COLOR3);

			content.children('li').css('display','none');
			$(li.data('tab-selector')).fadeIn('fast');
		}
	});
	// NÃO DELETAR
	*/

	$('.ui-tabs-vertical').addClass('clearfix');

	// botões
	$('.btn-link')
		.click( function(){
			if( $(this).hasClass('selected') ){
				var group = $(this).data('group');
				if( group == undefined ){
					//$(this).attr('class','btn-link ').removeClass('selected');
				}
			}
			else{
				var group = $(this).data('group');
				if( group ){
					$('.btn-link[data-group="'+group+'"]').removeClass('selected');
					$(this).attr('class','btn-link ').addClass('selected');
				}
				
			}
		});
	// 	.each( function(){
	// 	if( $(this).hasClass('selected') ){
	// 		$(this).attr('class','btn-link selected ');
	// 	}
	// 	else{
	// 		$(this).attr('class','btn-link ');
	// 	}
	// });

	// blocos retráteis
	$('.retratil-btn').click(function(event){
		event.preventDefault();

		if($(this).hasClass('btn-retratil-active')){
			$(this).removeClass('btn-retratil-active');
			//$( $(this).data('retratil-selector') ).removeClass('retratil-active');

		}else{
			$(this).addClass('btn-retratil-active');
			//$( $(this).data('retratil-selector') ).addClass('retratil-active');
		}

		$( $(this).data('retratil-selector') ).slideToggle();
		
	});

	// diálogos
	$('.dialog > .dialog_cont').each(function(){
		$(this).children('.current').addClass('first');
		$(this).children('li').last().addClass('last');
	});
	$('.dialog > .setas-dialog').each(function(){
		//$(this).children('li').last().addClass('last');
		$(this).children('a.prev').addClass('disabled');
		var dialog = $(this).parent();
		var dialog_cont = dialog.children('.dialog_cont');
		if( dialog_cont.children('a').length == 1 ){
			$(this).children('a.next').addClass('disabled');
		}
		$(this).children('a.count').html( '<span class="cur">1</span> / <span class="max">'+ dialog_cont.children('li').length + '</span>' );
	});
	$('.dialog > .setas-dialog > a.next').click(function(event){
		event.preventDefault();
		if( $(this).hasClass('disabled') ) return;
		var dialog = $(this).parents('.dialog');
		var dialog_cont = dialog.find('.dialog_cont');
		var last_current = dialog_cont.find('.current').removeClass('current');
		var new_current = last_current.next().addClass('current');
		if( new_current.hasClass('last') ){
			$(this).addClass('disabled');
		}
		else{
			$(this).removeClass('disabled');
		}
		if( dialog_cont.find('li').length > 1 ){
			dialog.find('.setas-dialog .prev').removeClass('disabled');
		}
		var cur = dialog.find('.setas-dialog > a.count > .cur');
		cur.html( parseInt( cur.text() ) + 1 );
	});
	$('.dialog > .setas-dialog > a.prev').click(function(event){
		event.preventDefault();
		if( $(this).hasClass('disabled') ) return;
		var dialog = $(this).parents('.dialog');
		var dialog_cont = dialog.find('.dialog_cont');
		var last_current = dialog_cont.find('.current').removeClass('current');
		var new_current = last_current.prev().addClass('current');
		if( new_current.hasClass('first') ){
			$(this).addClass('disabled');
		}
		else{
			$(this).removeClass('disabled');
		}
		if( dialog_cont.find('li').length > 1 ){
			dialog.find('.setas-dialog .next').removeClass('disabled');
		}
		var cur = dialog.find('.setas-dialog > a.count > .cur');
		cur.html( parseInt( cur.text() ) - 1 );
	});

	// imagens com zoom
	$('.zoom_container').click(function(event){
		event.preventDefault();
		var zoomable = $(this).children('.zoomable');
		$(zoomable).addClass('zoomed');
		$('.conteudo').css('min-height', $('body').height() );
		var pos = $(this).position();
		$(zoomable).css({
			'position' : 'absolute',
			'top' : pos.top,
			'left' : pos.left
		});
		get_modal_fade().fadeIn('fast');
		var h = $(zoomable).height();
		

		// fix caso do tween max
		$(zoomable).parents().css('position','static');
		$(zoomable).parents('.page').css('position','relative');

		if(!$(zoomable).parent().hasClass('conteudo'))
		{
			var meio = $(window).outerHeight()/2 - $(zoomable).height()/2 + $(window).scrollTop();
			$(zoomable).parent().css({
				'position' : 'absolute',
				'top' : meio,
				'left' : 0
			});
		}
		$(zoomable).animate({
			'top' : pos.top,
			'left' : '0',
			'width' : $('.page').width()
			},
			'fast',
			function(){
				$('body').attr('onmousedown','zoom_image_out()');
			}
		);
		ZOOMED_IMAGE = $(zoomable);
	});
	
	$('.zoom_container').hover(function(event){
		event.preventDefault();
	
		$('<div class="modal-fade"></div>').appendTo(this).fadeIn('fast');
		$('<span class="icon2-observacao imgZoom"></span>').appendTo(this).fadeIn('fast');
	},function(){
		$(this).children('.modal-fade').remove();
		$(this).children('.icon2-observacao').remove();
	});

	$('.btn-link').click(function(event){

		//event.preventDefault();

		var seletor = ($(this).data('modal-selector'));
		
		if($(seletor)) {
			if($(this).hasClass('atencao')) {
				$(seletor + " .header").children().css("color","#FF4F4F");

			}else if($(this).hasClass('saibamais')) {
				$(seletor + " .header").children().css("color","#2C99CC");

			}else if($(this).hasClass('objetivo')) {
				$(seletor + " .header").children().css("color","#1F9C4C");

			}else if($(this).hasClass('observacao')) {
				$(seletor + " .header").children().css("color","#FF7F37");

			}else if($(this).hasClass('praticar')) {
				$(seletor + " .header").children().css("color","#8769FF");

			}else {
				$(seletor + " .header").children().css("color","#000000");
			}
		}

	});

	// FLIP

	$('.super_flip').each(function(){
		animaFlip($(this));
	});

	

	// Ícones animados
	$('.page .conteudo .super_icone img').load(function(){
		
			iconesAnimados($(this));

	});

	$('.page .conteudo .super_icone img .super_icone img').each(function(){
	 	iconesAnimados($(this));
	 });
	


	// Prancheta

	var prancheta = $('.prancheta');
    var prancheta_pai = prancheta.parent('.prancheta_pai');
    var tamanho_prancheta = prancheta.height();
    		

    $('img').load(function(){
    	tamanho_prancheta = prancheta.height();
    	prancheta_pai.height(tamanho_prancheta);
    });

    prancheta_pai.height(tamanho_prancheta);

    $(window).resize(function(){
    	tamanho_prancheta = prancheta.height();
    	prancheta_pai.height(tamanho_prancheta);
    });

    //Slider

    var slider_container = $('.slider_container'),
          slider_menu = $('.slider_menu'),
          slider_conteudo = $('.slider_conteudo'),
          slider_menu = $('slider_menu'),
          qtd_linhas = $(".slider_conteudo > li").length;
          indice_slider = 0,
          tamanhoContainer = slider_container.width(),
          tamanhoLinhas = tamanhoContainer
          Tempo = 0;

      $('img').load(function(){
      	montaSlider(slider_container);
      });
      
      montaSlider(slider_container);
      montaMenu(slider_container);
      passaSlide(slider_conteudo, indice_slider);

      function slideAutomatico(){
        Tempo = setTimeout(function(){
          if(indice_slider == qtd_linhas-1){
            indice_slider = 0;
          }else{
            indice_slider++;
          }

          passaSlide(slider_conteudo, indice_slider);
          slideAutomatico();
        },8000);
      }
      
      slideAutomatico();
      
      $(".slider_menu li").hover(function(){
         clearTimeout(Tempo);
      },function(){
         clearTimeout(Tempo);
         slideAutomatico();
       });

   

      $(".slider_menu li").click(function(){
        clearTimeout(Tempo);
        slideAutomatico();
        indice_slider = pegaIndice($(this));
        passaSlide(slider_conteudo, indice_slider);

      });

      $(window).resize(function(){
        montaSlider(slider_container);
        passaSlide(slider_conteudo, indice_slider);
      });


	responsive_height();
});

$(window).resize(function(){
	 responsive_height(); 
	 $('.super_icone').off();
	 $('.super_icone img').each(function(){
	 	iconesAnimados($(this));
	 });
	 
	 
});

function animaFlip(super_flip){

	var flip_info = super_flip.children('.flip_info');
	var flip_img = super_flip.children('.flip_img');
	var flip_caixa = super_flip.find('.flip_info  .caixa-anime');

	TweenMax.to(flip_info, 0, {rotationY: -180}); 

	super_flip.each(function(){
				$(this).height($(this).width());
	});

	flip_caixa.each(function(){
				$(this).height(super_flip.width());
	});


	$(super_flip).hover(function(){
				
		TweenMax.to(flip_img, 0.5, {rotationY: 90, overwrite:3}); 
		TweenMax.to(flip_info, 0.5, {rotationY: -270, overwrite:3}); 
		TweenMax.to(flip_img, 0.5, {delay:0.3, rotationY: 180, onStart:flip_index}); 
		TweenMax.to(flip_info, 0.5, {delay:0.3,rotationY: -360, onStart:flip_index});

		function flip_index(){
			flip_img.css({zIndex: "1"});
			flip_info.css({zIndex: "2"});
					

		}

	},function(){

			TweenMax.to(flip_img, 0.5, {rotationY: 90, onComplete:flip_index, overwrite:3}); 
			TweenMax.to(flip_info, 0.5, {rotationY: -270, onComplete:flip_index, overwrite:3});
			TweenMax.to(flip_img, 0.5, {delay:0.3, rotationY: 0,onStart:flip_index}); 
			TweenMax.to(flip_info, 0.5, {delay:0.3, rotationY: -180, onStart:flip_index}); 

			function flip_index(){
				flip_img.css({zIndex: "2"});
				flip_info.css({zIndex: "1"});
					
			}

	});

	$(window).resize(function(){
		super_flip.each(function(){
				$(this).height($(this).width());
	});

		flip_caixa.each(function(){
				$(this).height(super_flip.width());
		});
	});

}

function iconesAnimados(iconeAnimado){

	var altura =iconeAnimado.parent('.super_icone').width();
	var imagemIcone = iconeAnimado;
	imagemIcone.height(altura);
	var margem = altura;
	var superTimer = 0;
	var cenasIcone = [];
	var cenaIcone = 1;
	var tempo = 0;
	var quadros =  imagemIcone.width()/altura;

	if(quadros*41.66 >= 1000){
		tempo = 75;
	}else{
		tempo = Math.round(1000/quadros);
	}

	for(i = 0 ; i < quadros; i++){
	 	cenasIcone.push(-i*margem+"px");
	}


	iconeAnimado.parent('.super_icone').on("mouseenter", function(){
	clearTimeout(superTimer);

	function animaIcone(icone){
				
		clearTimeout(superTimer);
		if(cenaIcone < cenasIcone.length){
			icone.css({marginLeft:cenasIcone[cenaIcone]});
				superTimer = setTimeout(function(){
					animaIcone(icone);
				},tempo);

					cenaIcone++;
				}

		}

		animaIcone(imagemIcone);
	});

	iconeAnimado.parent('.super_icone').on("mouseleave", function(){
		function paraIcone(icone){
			clearTimeout(superTimer);
			cenaIcone = 0;
			icone.css({marginLeft:cenasIcone[cenaIcone]});


		}

			paraIcone(imagemIcone);

	});
}



function get_modal_fade() {
	var modal_fade = $('#modal-fade');
	if( modal_fade.length == 0 ) {
		modal_fade = $('<div id="modal-fade"></div>').appendTo('body');
	}
	return modal_fade;
}

function diminuir_fonte(){
	var size = parseInt( $('.conteudo p').css('font-size') );
	$('.conteudo p').css('font-size',size-1);
}
function aumentar_fonte(){
	var size = parseInt( $('.conteudo p').css('font-size') );
	$('.conteudo p').css('font-size',size+1);
}
function normalizar_fonte(){
	$('.conteudo p').css('font-size',16);
}

function get_naviagator_links(){
	var html = '';
	var max = parseInt( PAGES_TOTAL );
	for(var i=1; i<=max; i++){
		num = i<=9? ('0'+i) : i;
		html += '<li><a href="'+ i +'.html">'+ num +'</a></li>';
	}
	return html;
}

function zoom_image_out(){
	if( !ZOOMED_IMAGE ) return;
	$('.conteudo').css('min-height','');
	ZOOMED_IMAGE.css({
		'position' : '',
		'top' : '',
		'left' : '',
		'width' : ''
	});

	// fix caso do tween max
	ZOOMED_IMAGE.parents().css('position','');
	ZOOMED_IMAGE.parents('.page').css('position','');
	ZOOMED_IMAGE.parent().css({
		'top' : '',
		'left' : ''
	});

	ZOOMED_IMAGE.removeClass('zoomed');
	get_modal_fade().fadeOut('fast');
	$('body').attr('onmousedown','');
}

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

function open_modal_unidades() {

	var posBtnY = $(this).position().top;
	var posBtnX = $(this).position().left;
	var caixa = $('#unidades-modal');
	var objs = $('.modal-unidades > .page > .grid-row > ul > li');
	var pg = $('body > .page');

	caixa.css({ 'height': "auto", 'top': "155px", 'opacity': 0 });
	caixa.show().animate({'opacity': 1,'bottom': "250px"}, 500);
	pg.css({ 'opacity': "0.4" });

	$('.modal-unidades .page .super_icone').off();
	$('.modal-unidades .page .super_icone img').each(function(){
	 	iconesAnimados($(this));
	});
			

	


	//TweenMax.from(objs, 1, {scaleX:0, scaleY:0, ease:Strong.easeOut});
}

// Padrão Slider

function pegaIndice($objeto){
      var lista = $objeto.parent().find('li'),
          indice_menu = lista.index($objeto);
      return indice_menu;
      
    }

    function montaSlider($slider_container){
      var pai = $slider_container.parent(),
          conteudo = $slider_container.find('.slider_conteudo'),
          linhas = $('ul.slider_conteudo > li'),
          tamanhoContainer = $slider_container.width(),
          alturaConteudo = 0,
          tamanhoLinhas = tamanhoContainer,
          qtd_linhas = linhas.length,
          tamanhoConteudo = (tamanhoLinhas*qtd_linhas) + 4*(qtd_linhas-1);
       

      linhas.each(function(){
        if($(this).children().height() > alturaConteudo){
          alturaConteudo = $(this).children().height();
        }
      });

      $('img').load(function(){
      	linhas.children().height(alturaConteudo);
      });

      linhas.children().height(alturaConteudo);
      linhas.width(tamanhoLinhas);
      conteudo.width(tamanhoConteudo);



    }

    function montaMenu($slider_container){
      var pai = $slider_container.parent(),
          menu = pai.find('.slider_menu'),
          conteudo = $slider_container.find('.slider_conteudo'),
          linhas = $('ul.slider_conteudo > li'),
          qtd_linhas = linhas.length;

      for(i = 0; i < qtd_linhas; i++){
        btn_txt = i + 1;
        $("<li class='dgd-btn'><p>"+btn_txt+"</p></li>").appendTo(menu);
      }
    }

    function passaSlide($slider_conteudo, indice){
      var pai = $slider_conteudo.parent().parent(),
          menu_li = pai.find('.slider_menu').find('li'),
          linhas = $('ul.slider_conteudo > li'),
          qtd_linhas = linhas.length,
          margem = -((linhas.width()*indice)+4*indice),
          arrayLinhas = [],
          arrayNovo = [];

      TweenMax.to($slider_conteudo, 0.5, {css:{marginLeft: margem}});
        menu_li.addClass('dgd-btn');
        menu_li.removeClass(COLOR1);
        $(menu_li[indice]).removeClass('dgd-btn');
        $(menu_li[indice]).addClass(COLOR1);
    }
