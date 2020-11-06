(function($){

	$.fn.imageMark = function(options){

		var configureHeight = function(element){
				var actualHeight = element.find(".img-container > img").outerHeight();
				element.find(".img-container").outerHeight(actualHeight);
				//element.find(".text-container > .box-animation").outerHeight(actualHeight);
		}

		var init = function(){
			var element = $(this);
			var select = element.find("select");
			var imgContainer = element.find(".img-container");
			var textContainer = element.find(".text-container");
			var settings = $.extend({
				"object":[
					{
						"label": "Área 1",
						"text" : "<p>Área 1, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
						"src" : "images/02/anim_imgmark/1.png"
					},
					{
						"label": "Área 2",
						"text" : "<p>Área 2, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
						"src" : "images/02/anim_imgmark/2.png"
					},
					{
						"label": "Área 3",
						"text" : "<p>Área 3, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
						"src" : "images/02/anim_imgmark/3.png"
					},
					{
						"label": "Área 4",
						"text" : "<p>Área 4, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
						"src" : "images/02/anim_imgmark/4.png"
					},
					{
						"label": "Área 5",
						"text" : "<p>Área 5, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>",
						"src" : "images/02/anim_imgmark/5.png"
					}
				], 
				"description":false,
				"tamanho_img": "tamanho10 cima",
				"tamanho_txt" : "tamanho10 baixo",
			},options);

			var buildHtml = function(bool){
				var obj = settings["object"];
				if(bool){
					imgContainer.addClass(settings["tamanho_img"]);
					textContainer.addClass(settings["tamanho_txt"]);
				}else{
					imgContainer.addClass("tamanho10 top");
					textContainer.remove();
				}
				for(var i = 0; i < obj.length; i++){
					$("<option  value='"+i+"'>"+obj[i]["label"]+"</option>").appendTo(select);
				}
			}

			onOptionsClick = function(){
				var obj = settings["object"];
				var imgBase = imgContainer.find(".img-base");
				var actualImg =  $("<img src='"+obj[$(this).val()]["src"]+"'/>");
				actualImg.appendTo(imgContainer).hide();
				imgBase.fadeOut("slow");
				actualImg.fadeIn("slow",function(){
					imgBase.remove();
					actualImg.addClass("img-base");
				});

				if(settings["description"]){
					textContainer.find('.box-animation').html(obj[$(this).val()]["text"]);
				}
				$(window).resize(function(){configureHeight(element)});
				$("img").load(function(){configureHeight(element)});
			}

			
			configureHeight(element);

			buildHtml(settings["description"]);

			select.on("change",onOptionsClick);
			
		}
		return this.each(init);
	}

})(jQuery);