(function($){
      $.fn.selectionBox = function(options) {

         var animDefault = function(obj,tl,index){
            if(index == 0){
               tl.from(obj,1,{alpha:0, rotationX:360, ease:Back.easeOut});
            }else{
               tl.from(obj,1,{alpha:0, rotationX:360, ease:Back.easeOut}, "-=0.8");
            }
         }

         var showText = function(target,box) {
            index = target.index();
            actualBox = $(box.children(".caixa-anime").get(index));
            target.parent().children(".obj").not(target).css({"opacity":0.4});
            target.css({"opacity":1});
            actualBox.fadeIn();
            box.children(".caixa-anime").not(actualBox).hide();
         }

         var init = function() {
            var el = $(this);
            var nav = el.children(".selection-nav");
            var text = el.children(".selection-text");
            var tl = new TimelineMax();
            var settings = $.extend({
               "animation": animDefault
            }, options);

            nav.children(".obj").css({"opacity" : 0.4});
            nav.children(".obj").first().css({"opacity" : 1});
            text.children(".caixa-anime").hide();
            text.children(".caixa-anime").first().show();

            nav.children(".obj").each(function(index){
               settings["animation"] ($(this), tl, index);
            });

            var onBtnClick = function() {
               showText($(this), text);
            }

            nav.children(".obj").on("click.selectionBox", onBtnClick);
         }

         return this.each(init);
      }
}(jQuery));