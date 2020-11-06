/**
 * Created by greg on 16/10/15.
 */
(function($){

    $.fn.comparacao = function(options){

        var init = function(){
            var a = $(this).children(".lado-a");
            var b = $(this).children(".lado-b");
            var close = $(this).find(".btn-close");

            var selected = false;

            var settings = $.extend({

            },options);

            

            var setActive = function(element){
                if(element.parent().hasClass("lado-a")){
                    a.addClass("ativado");
                    b.addClass("desativado");
                    a.off("click",setActive);
                }else{
                    b.off("click",setActive);
                    b.addClass("ativado");
                    a.addClass("desativado");
                }
            };

            var setDefault = function(){
                a.removeClass("ativado");
                a.removeClass("desativado");
                b.removeClass("ativado");
                b.removeClass("desativado");
               // a.on("click",setActive);
                //b.on("click",setActive);
            }

            var ChangeStatus = function(){
                if(selected){
                    setDefault();
                }else{
                    setActive($(this));
                }
                selected = !selected;
            }

            a.find(".lado-default").on("click",ChangeStatus);
            b.find(".lado-default").on("click",ChangeStatus);
            $(this).find(".btn-close").on("click",ChangeStatus);
           
        };
        return this.each(init);
    }

})(jQuery);