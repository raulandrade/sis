(function($){
	$.fn.scenes = function(options){

		var init = function(){
			var el = $(this);
			var btnNext = el.find(".btn-next-scene");
			var btnPrev = el.find(".btn-prev-scene");
			var arrayScenes = new Array();
			var actualScene = 0;
			$('img').load(function(){
				el.height(el.children(".scene").children("img").height());
			});
			el.height(el.children(".scene").children("img").height());
			
			var settings = $.extend(
				{

				},
				options
			);

			el.children(".scene").each(function(index){
				if(index == 0){
					$(this).css({left:0});
				}
				arrayScenes.push($(this));
			});

			var setNextScene = function(){
				var newLeft, newTop = 0;
				if(actualScene%2 == 0){
					newLeft =  el.width();
				}else{
					newLeft =  -el.width();
					newTop =  el.height();	
				}

				if(actualScene < arrayScenes.length -1){
					arrayScenes[actualScene].css({"z-index":1});
					arrayScenes[actualScene+1].css({left:0,top:0, "z-index":0});
			
					TweenMax.to(arrayScenes[actualScene],1,{left: -newLeft,top:-newTop});
					TweenMax.from(arrayScenes[actualScene+1],1,{left: newLeft,top:newTop});
					actualScene++;
				}
				$('.btn-scene').css({opacity:1, cursor: 'pointer'});
				if(actualScene == arrayScenes.length -1){
					btnNext.css({opacity:0.3, cursor:'auto'});
				}
			}

			var setPrevScene = function(){
				var newLeft, newTop = 0;
				if(actualScene%2 == 0){
					newLeft =  -el.width();
					newTop =  -el.height();
				}else{
					newLeft =  el.width();
				}

				if(actualScene > 0){
					arrayScenes[actualScene].css({"z-index":1});
					arrayScenes[actualScene-1].css({left:0,top:0, "z-index":0});
			
					TweenMax.to(arrayScenes[actualScene],1,{left: newLeft});
					TweenMax.from(arrayScenes[actualScene-1],1,{left: -newLeft,top:newTop});
					actualScene--;
				}
				$('.btn-scene').css({opacity:1, cursor: 'pointer'});
				if(actualScene == 0){
					btnPrev.css({opacity:0.3, cursor:'auto'});
				}
			}

			$(window).resize(function(){
				$('img').load(function(){
					el.height(el.children(".scene").children("img").height());
				});
				el.height(el.children(".scene").children("img").height());
			});

			btnNext.on("click", setNextScene);
			btnPrev.on("click", setPrevScene)
		}
		this.each(init);
	}

}(jQuery));