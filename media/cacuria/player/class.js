



//VARIAVEIS GLOBAIS
var CURRENT_SCENE_MEDIALOAD=0;
var CURRENT_SCENE_TOTALMEDIAS=9999;
var PLAYER_STATE='LOADING'; //ESTADO DO PLAYER
var CURRENT_TIME=0; //TEMPO CORRENTE
var PLAYING_VIDEO_IN_SCENE=false; //FLAG - SE VIDEO ESTA TOCANDO NA CENA
var SYNC_VIDEO_DIF=false; // FLAG DE DIFERENCA SYNCRONIZACAO DE VIDEO PARA BUFERIZACAO
var ORDER_SCENE_MEDIAS=false; //FLAG QUE DETERMINA A NECESSIDADE DE ORDENAR AS MIDIAS DA CENA

var EFFECTHOVERSPEED1=0.000015;
var EFFECTHOVERSPEED2=0.00003;
var EFFECTHOVERSPEED3=0.00006;

//CLASSE SYNC
function Sync(t,v,posx,posy,w,h,l,tp){
    var time=t;
    var visible=v;
    var positionX=posx/100;
    var positionY=posy/100;
    var width=w/100;
    var height=h/100;
    var layer=l;
    var transparency=tp;
    var gotos=null;
    
    this.getTime = function(){
        return time;
    };
    this.getPositionX = function(){
        return positionX;
    };
    this.getTransparency = function(){
        return transparency;
    };
    this.getPositionY = function(){
        return positionY;
    };
    this.getWidth = function(){
        return width;
    };
    this.getHeight = function(){
        return height;
    };
    this.isVisible = function(){
        return visible;
    };
    this.getLayer = function(){
        return layer;
    };
    this.addGoto=function(g){
        gotos=g;    
    };
    this.getGoto=function(){
     return gotos;   
    };
}

function Link(keyInput,scene,time,urlin){
	
    var key = keyInput;
    var target = scene;
    var timeEvent = time;
	var url = urlin;
	
    
    this.getTarget=function(){
        return target;
    };
    this.getKey=function(){
        return key;
    };
    this.getTime=function(){
        return timeEvent;
    };
	 this.getURL=function(){
        return url;
    };
}

function Goto(scene,time){
    var target=scene;
    var timeEvent=time;
    
    this.getTarget=function(){
       return target;
    };
    this.getTime=function(){
       return timeEvent;
    };
}

function Media(typ,sourceFile,heffect,teffect){
    var source;
    var src = sourceFile;
    var type=typ;
    var layer=1;
    var link=null;
    var syncs = new Array();
    var positionX=0;
    var positionY=0;
    var width=0;
    var height=0;
    var transparency=0;
    var visible=false;
	
    var offsetTime=9999999;
	
	//efeitos do hover
    var hoverEffect=heffect;
	var isHover=false;
	var simulHoverOut='0'; //usado em efeitos que disparam hoverout automaticamente (Ex. POP E PUSH) estados: 0=neutro, 1=ativa, 2=desativa
	var finalHoverPositionX;
	var finalHoverPositionY;
	var finalHoverWidth;
	var finalHoverHeight;
	var currentHoverPositionX;
	var currentHoverPositionY;
	var currentHoverWidth;
	var currentHoverHeight;
	
	//efeitos transicao
	var transitionEffect = teffect;
	var transitionValue = 1;
    
    var ext = src.split(".");
             
    if(type=="video"){
        if( (navigator.userAgent.indexOf("Firefox") != -1) ){
            //    console.log('sou firefox');
                var auxSrc='';
                for(var i=0;i<ext.length-1;i++)if(i==0)auxSrc+=ext[i]; else auxSrc+='.'+ext[i];
                
                src = auxSrc+".webm";
        }
    }
    
    this.load = function(){
       
         if(type=="image"){
    
             source= new Image();
             source.onload = function () {
            //    console.log('image: '+src+' carregado.');
                CURRENT_SCENE_MEDIALOAD++;
             
             };
             source.src = src;
      
         }
         else{
    
             source = document.createElement("video");
             
       
             source.onloadeddata = function() {
              //   console.log('video: '+src+' carregado.');
                 CURRENT_SCENE_MEDIALOAD++;
                 
                 if(SYNC_VIDEO_DIF!=false && SYNC_VIDEO_DIF!=0){
                    source.currentTime = SYNC_VIDEO_DIF;
                  //  console.log('dif time:'+SYNC_VIDEO_DIF);
                 }
             };
             source.onpause = function() {
        
             };
             source.oncanplay = function() {
    
                 if(PLAYER_STATE=='BUFFER')PLAYER_STATE='PLAY'; 
             };
             source.onstalled = function() {
            
             };
             source.onplaying = function() {
                   PLAYER_STATE='PLAY';
                   CURRENT_TIME = (source.currentTime+offsetTime)*1000;
             };
             source.onsuspend = function() {
            
             };
             source.onseeked = function() {
           
             };
             source.onseeking = function() {
            
             };
             source.ontimeupdate = function(){
            
             };
             source.onabort = function() {
             //    alert("Video load aborted");
             };
             source.onwaiting = function() {
                 // console.log("Espere! Preciso bufferizar o proximo frame ;)");
                    PLAYER_STATE='BUFFER'; 
             };
             source.onended=function(){
                  PLAYING_VIDEO_IN_SCENE=false;
             };
             source.addEventListener('progress', function() {
                
                
             });

             var ext = src.split(".");
             
             var sourceVideo = document.createElement("source"); 
             if(ext[ext.length-1]=="webm")sourceVideo.type = "video/webm";
             else if(ext[ext.length-1]=="ogv")sourceVideo.type = "video/ogg";
             else sourceVideo.type = "video/mp4";
             sourceVideo.src = src;
             source.appendChild(sourceVideo);
          
         } 
    
    }
    this.getbuffer = function(){
     if(type=="video"){
          CURRENT_TIME = (source.currentTime+offsetTime)*1000;
            return true;
      }
      return null; 
    }
    this.unload = function(){
       if(type=="video")source.pause();
       source=null;
       delete source;
    }
    this.play=function(){
       if(type=="video" && visible==true){
           source.play();
            PLAYING_VIDEO_IN_SCENE=true;
       }
    }
    this.stop=function(){
       if(type=="video"){
           source.pause();
            PLAYING_VIDEO_IN_SCENE=false;
       }
    }
    this.volume=function(value){
       if(type=="video")source.volume=value;
    }
	this.getHoverEffect=function(){
		return hoverEffect;
	}
	this.setHover = function(hover){
		isHover=hover;
		//if(!isHover)this.updateCurrentHover();
	}
    this.setTime = function(time){
       if(offsetTime==null)return;
       
       if(type=="video"){
          if(time-offsetTime>=0)source.currentTime=time-offsetTime;
          else{
            source.currentTime=0;
            source.pause();
          }
       }
    }
    this.setBoundBox=function(x,y,w,h){
        positionX=x;
        positionY=y;
        width=w;
        height=h;
    };
    this.boundCollider=function(x,y){
        
        var w = CANVAS_ELEMENT.width;
        var h = CANVAS_ELEMENT.height;
		
		if(isHover){
			 if( x >= (currentHoverPositionX*w) && x <= ((currentHoverPositionX*w)+(currentHoverWidth*w)) ){
                  if( y >= (currentHoverPositionY*h) && y <=  ((currentHoverPositionY*h)+(currentHoverHeight*h)) ){
                        return true;
                  }
             }
			 return false;
		}
		
		
        if( x >= (positionX*w) && x <= ((positionX*w)+(width*w)) ){
           if( y >= (positionY*h) && y <=  ((positionY*h)+(height*h)) ){
            return true;
           }
        }
        return false;
    };
    this.updateCurrentHover = function(){
		
		if(hoverEffect=="grow")finalHoverPositionX = (positionX)-(width*0.05);
		else if(hoverEffect=="shrink")finalHoverPositionX = (positionX)+(width*0.05);
		else if(hoverEffect=="float")finalHoverPositionY = (positionY)-(height*0.15);
		else if(hoverEffect=="sink")finalHoverPositionY = (positionY)+(height*0.15);
		else if(hoverEffect=="forward")finalHoverPositionX = (positionX)+(width*0.15);
		else if(hoverEffect=="backward")finalHoverPositionX = (positionX)-(width*0.15);
		else if(hoverEffect=="pop")finalHoverPositionX = (positionX)-(width*0.05);
		else if(hoverEffect=="push")finalHoverPositionX = (positionX)+(width*0.05);
		
		currentHoverPositionX = positionX;
	    currentHoverPositionY = positionY;
	    currentHoverWidth = width;
	    currentHoverHeight = height;
		
		simulHoverOut=false;
	}
	this.update = function(elapsedTime){
      if(syncs.length <=0)return;
      
       for(var i=syncs.length-1; i >= 0;i--){
          
        if(syncs[i].getTime()==elapsedTime){
           
            positionX = syncs[i].getPositionX();
            positionY = syncs[i].getPositionY();
            width = syncs[i].getWidth();
            height = syncs[i].getHeight();
            visible = syncs[i].isVisible();
            transparency = syncs[i].getTransparency();
			this.updateCurrentHover();
            if(visible==true && type=="video"){
               source.play();
               PLAYING_VIDEO_IN_SCENE=true;
              
            }
            else if(visible==false && type=="video"){
               source.pause();
               PLAYING_VIDEO_IN_SCENE=false;
               
            }
            if(layer!= syncs[i].getLayer()){
                layer= syncs[i].getLayer();
                ORDER_SCENE_MEDIAS=true;
            }
        }
      }
        
        
        
    }
    this.addLink=function(l){
        link=l;   
         
    };
    this.getLink=function(){
     return link;   
    }
    this.addSync=function(s){
        
        if(s.getTime()<offsetTime)offsetTime=s.getTime();

        syncs.push(s);
        syncs.sort(compareTimer);
          
    };
    
	this.setSyncsToTime = function(newTime){
        
        
         var changed=false;
        
          for(var i=syncs.length-1; i >= 0;i--){
              
              if(syncs[i].getTime() <= newTime ){
                
                   positionX = syncs[i].getPositionX();
                   positionY = syncs[i].getPositionY();
                   width = syncs[i].getWidth();
                   height = syncs[i].getHeight();
				   
				   this.updateCurrentHover();
				   
                   transparency = syncs[i].getTransparency();
                   visible = syncs[i].isVisible();
                   if(visible==true && type=="video"){
                      source.play();
                      PLAYING_VIDEO_IN_SCENE=true;
                  
                   }
                   else if(visible==false && type=="video"){
                      source.pause();
                       PLAYING_VIDEO_IN_SCENE=true;
                    
                   }
                   if(layer!= syncs[i].getLayer()){
                      layer= syncs[i].getLayer();
                      ORDER_SCENE_MEDIAS=true;
                   } 
                   changed=true;
              
                  break;
              }
          }
        
        if(changed==false){
             positionX = 0;
             positionY = 0;
             width = 0;
             height = 0;
             visible = false;
             layer =1;
			 
			 this.updateCurrentHover();
             
        }
		
	    
        
    
    };
    this.getPositionX = function(){
        return positionX;
    };
    this.getPositionY = function(){
        return positionY;
    };
    this.getLayer = function(){
        return layer;
    };
    this.getWidth = function(){
        return width;
    };
    this.getType = function(){
        return type;
    };
    this.getHeight = function(){
        return height;
    };
    this.getSourceFile=function(){
        return source;
    };
    this.isVisible =function(){
        return visible;
    };
    this.setVisible =function(value){
        visible=value;
    };
    
	this.updateHoverEffectProjection = function(w,h){
		
		if(hoverEffect=="grow"){
		   if( isHover && (currentHoverPositionX > finalHoverPositionX)){
			  currentHoverPositionX-=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY-=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth+=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight+=EFFECTHOVERSPEED2*(h/10);
		   }
		   else if( !isHover && (currentHoverPositionX < positionX)){
			  currentHoverPositionX+=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY+=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth-=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight-=EFFECTHOVERSPEED2*(h/10);
		   }
		}
		else if(hoverEffect=="shrink"){
		   if( isHover && (currentHoverPositionX < finalHoverPositionX)){
			  currentHoverPositionX+=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY+=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth-=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight-=EFFECTHOVERSPEED2*(h/10);
		   }
		   else if( !isHover && (currentHoverPositionX > positionX)){
			  currentHoverPositionX-=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY-=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth+=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight+=EFFECTHOVERSPEED2*(h/10);
		   }
		}
		else if(hoverEffect=="float"){
		   if( isHover && (currentHoverPositionY > finalHoverPositionY)){
	          currentHoverPositionY-=EFFECTHOVERSPEED3*(h/10);
		   }
		   else if( !isHover && (currentHoverPositionY < positionY)){
			  currentHoverPositionY+=EFFECTHOVERSPEED3*(h/10);
		   }
		}
		else if(hoverEffect=="sink"){
		   if( isHover && (currentHoverPositionY < finalHoverPositionY)){
	          currentHoverPositionY+=EFFECTHOVERSPEED3*(h/10);
		   }
		   else if( !isHover && (currentHoverPositionY > positionY)){
			  currentHoverPositionY-=EFFECTHOVERSPEED3*(h/10);
		   }
		}
		else if(hoverEffect=="forward"){
		   if( isHover && (currentHoverPositionX < finalHoverPositionX)){
	          currentHoverPositionX+=EFFECTHOVERSPEED3*(h/10);
		   }
		   else if( !isHover && (currentHoverPositionX > positionX)){
			  currentHoverPositionX-=EFFECTHOVERSPEED3*(h/10);
		   }	
		}
		else if(hoverEffect=="backward"){
		   if( isHover && (currentHoverPositionX > finalHoverPositionX)){
	          currentHoverPositionX-=EFFECTHOVERSPEED3*(h/10);
		   }
		   else if( !isHover && (currentHoverPositionX < positionX)){
			  currentHoverPositionX+=EFFECTHOVERSPEED3*(h/10);
		   }	
		}
		else if(hoverEffect=="pop"){
		  
		   //atualizar maquina de estados do hover
		   if(isHover && (simulHoverOut=='0')){
			   simulHoverOut='1';
		   }
		   else if( (simulHoverOut=='1') && (currentHoverPositionX <= finalHoverPositionX)){
			   simulHoverOut='2';
		   }
		   else if( (simulHoverOut=='2') && (currentHoverPositionX >= positionX)){
			   simulHoverOut='3';
		   }
		   else if( (simulHoverOut=='3') && !isHover){
			    simulHoverOut='0';
		   }
		  
		   if( (simulHoverOut=='1') && (currentHoverPositionX > finalHoverPositionX)){
			  currentHoverPositionX-=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY-=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth+=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight+=EFFECTHOVERSPEED2*(h/10);
			  
			  
		   }
		   else if( (simulHoverOut=='2') && (currentHoverPositionX < positionX)){
			  currentHoverPositionX+=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY+=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth-=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight-=EFFECTHOVERSPEED2*(h/10);
		   }	
		}
		else if(hoverEffect=="push"){
		  
		   //atualizar maquina de estados do hover
		   if(isHover && (simulHoverOut=='0')){
			   simulHoverOut='1';
		   }
		   else if( (simulHoverOut=='1') && (currentHoverPositionX >= finalHoverPositionX)){
			   simulHoverOut='2';
		   }
		   else if( (simulHoverOut=='2') && (currentHoverPositionX <= positionX)){
			   simulHoverOut='3';
		   }
		   else if( (simulHoverOut=='3') && !isHover){
			    simulHoverOut='0';
		   }
		  
		   if( (simulHoverOut=='1') && (currentHoverPositionX < finalHoverPositionX)){
			  currentHoverPositionX+=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY+=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth-=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight-=EFFECTHOVERSPEED2*(h/10);
			  
			  
		   }
		   else if( (simulHoverOut=='2') && (currentHoverPositionX > positionX)){
			  currentHoverPositionX-=EFFECTHOVERSPEED1*(w/10);
	          currentHoverPositionY-=EFFECTHOVERSPEED1*(h/10);
	          currentHoverWidth+=EFFECTHOVERSPEED2*(w/10);
		      currentHoverHeight+=EFFECTHOVERSPEED2*(h/10);
		   }	
		}
	}
	
	this.draw = function(c,w,h){
    
     this.updateHoverEffectProjection(w,h);  
	  
		
	//	console.log("currentHoverX:"+currentHoverPositionX+" finalHoverX:"+finalHoverPositionX);
      
	/*  if(transitionEffect=="fade" &&  (transitionValue > transparency )){
		  
		  transitionValue-=0.01;
		  console.log(transitionValue); 
		  c.globalAlpha = 1-transitionValue;
          c.drawImage(source,currentHoverPositionX*w,currentHoverPositionY*h,currentHoverWidth*w,currentHoverHeight*h); 		  
	  } */
      if(visible==true){

          c.globalAlpha = 1-transparency;
          
		 
		 
		 
		  c.drawImage(source,currentHoverPositionX*w,currentHoverPositionY*h,currentHoverWidth*w,currentHoverHeight*h); 
		 
      }
    };
}

function Scene(ide,totalTime){
    var mainVideo;
    var medias = new Array();
    var syncs = new Array(); //SYNCS DA CENA SÃO OS GOTOS,É MAIS RÁPIDO
    var id = ide;
    var time = totalTime;
    
    
    this.load=function(){
       
       PLAYER_STATE='LOADING';
       CURRENT_SCENE_MEDIALOAD=0;
       
       PLAYING_VIDEO_IN_SCENE=false;
  
       CURRENT_SCENE_TOTALMEDIAS=medias.length;
       for(var i=0;i<medias.length;i++){
            medias[i].load();
       }
       
       var CACURIA_SYNC_BAR = document.getElementById('cacuria_syncs_timebar');
       CACURIA_SYNC_BAR.innerHTML ='';
       
       for(var i=0;i<syncs.length;i++){
            var timePercentage = ((syncs[i].getTime()/time)*100);
            
            if(timePercentage>=95)timePercentage=95;
            
            CACURIA_SYNC_BAR.innerHTML = CACURIA_SYNC_BAR.innerHTML+'<img  style="left:'+timePercentage+'%" class="cacuria_icon_goto" />';
            
       } 
    }
    
    this.unload=function(){
       
       PLAYER_STATE='LOADING';
       CURRENT_SCENE_TOTALMEDIAS=9999; 
          
       for(var i=0;i<medias.length;i++){
            medias[i].unload();
        }
    }
    
    this.getMainVideo=function(){
   //    return mainVideo.getSourceFile();     
    };
    this.getTime=function(){
         return time;
    }
    this.addSync=function(s){
        syncs.push(s);
        syncs.sort(compareTimer);  
      //  console.log('add sync');
    };
    this.addMedia=function(m){
        
         medias.push(m);
    
        
    };
    this.getID = function(){
        return id;
    };
    this.play = function(){
        for(var j=medias.length-1;j>=0;j--){
            medias[j].play();
        }
    }
    this.pause = function(){
        for(var j=medias.length-1;j>=0;j--){
            medias[j].stop();
        }
    }
    this.setVolume = function(value){
        for(var j=medias.length-1;j>=0;j--){
            medias[j].volume(value);
        }
    }
	this.hoverScene = function(x,y){
		
		
		
		 for(var i=medias.length-1;i>=0;i--){
                
            if(medias[i].getHoverEffect()!=null){ 	
                			
               if(medias[i].boundCollider(x,y)==true){
			       medias[i].setHover(true);
		       }
			   else medias[i].setHover(false);
			}
		 } 
	}
	
    this.clickScene = function(x,y){
       
        for(var i=medias.length-1;i>=0;i--){
            
           if(medias[i].boundCollider(x,y)==true){
                    
                 if(medias[i].getLink()!=null){
                    
                    var lin =  medias[i].getLink();
                     
                     for(var j=medias.length-1;j>=0;j--){
                        medias[j].stop();
                     }
                     
					 if(lin.getURL()!=null){
						 window.open(lin.getURL());
					 }
                     changeVideoAndTime(lin.getTarget(),lin.getTime()); 
					 
                 }
                 break;
            }
        }
    }
    this.setSyncsToTime = function(newTime){
         
       //   mainVideo.setSyncsToTime(newTime);
        
          for(var i=0;i<medias.length;i++){
                medias[i].setSyncsToTime(newTime);
                medias[i].setTime(newTime);
           }
          
    };
    this.update = function(elapsedTime){
        
         //correcao de sincronismo
         
          if(PLAYING_VIDEO_IN_SCENE==false){
             CURRENT_TIME+=40; 
          }
          else{
        
             for(var i=0;i<medias.length;i++){
                 medias[i].getbuffer();
             }
          }
        
    
        
         if(ORDER_SCENE_MEDIAS==true){
             medias.sort(compareLayer);
             ORDER_SCENE_MEDIAS==false;
         }
         
        for(var i=0;i<medias.length;i++){
                medias[i].update(elapsedTime);
        } 
         
        for(var i=syncs.length-1; i >= 0;i--){

            if(syncs[i].getTime()==elapsedTime){
           
               if(syncs[i].getGoto()!=null){    
                    var lin =  syncs[i].getGoto();
 
                      if(id == lin.getTarget())setVideoTime(lin.getTime());
                      else changeVideoAndTime(lin.getTarget(),lin.getTime()); 

               }
            }
         }
        
        
         
    };
    this.DrawMedias = function(context,w,h){
        //clear screen
        context.fillStyle = "white";
        context.fillRect(0/640,0/360,(640*w)/640,(360*h)/360);
        
        for(var i=0;i<medias.length;i++){
                medias[i].draw(context,w,h);
         }
     
         if(PLAYER_STATE=='BUFFER'){
         
        context.fillStyle = "#151515";
        context.fillRect(0/640,0/360,(640*w)/640,(360*h)/360);
         
                CANVAS_CONTEXT.font = "30px Arial";
                CANVAS_CONTEXT.fillStyle = "white";
                CANVAS_CONTEXT.textAlign = "center";
                CANVAS_CONTEXT.fillText("Buferizando", CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)-20);
                CANVAS_CONTEXT.fillText(LOADING_ANIMATION, CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)+5);
                
                if(LOADING_ANIMATION.length%2==1) LOADING_ANIMATION+=' ';
                else LOADING_ANIMATION+='.';
    
                if(LOADING_ANIMATION.length>11)LOADING_ANIMATION='';
               
         }     
    };
        
    
}


function compareLayer(a,b) {
  if (a.getLayer() < b.getLayer())
     return -1;
  if (a.getLayer() > b.getLayer())
    return 1;
  return 0;
}

function compareTimer(a,b) {
  if (a.getTime() < b.getTime())
     return -1;
  if (a.getTime() > b.getTime())
    return 1;
  return 0;
}

function compareID(a,b) {
  if (a.getID() < b.getID())
     return -1;
  if (a.getID() > b.getID())
    return 1;
  return 0;
}