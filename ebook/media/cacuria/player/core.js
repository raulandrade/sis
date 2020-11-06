var sceneIndex;
var sceneList;
var soundBarLevel=100;
var volumeBar;
var timeBarNumeric=null;




var CANVAS_CONTEXT=null;
var CANVAS_ELEMENT=null;
var CURRENT_VIDEO_ELEMENT=null;
var TIME_BAR=null;
var TIME_BAR_DOT=null;
var TIME_BAR_PAST=null;
var TIME_BAR_FUTURE=null;
var TIME_LABEL='0:0 / 0:0';
var LOADING_ANIMATION='';
var VOLUMEBAR=null;
var OFFSET_PLAY=true;




document.addEventListener('DOMContentLoaded', function(){
    
 
  
    CANVAS_ELEMENT = document.getElementById('cacuriaPlayerCanvas');
    CANVAS_CONTEXT = CANVAS_ELEMENT.getContext('2d');
    
    TIME_LABEL = document.getElementById('cacuria_time_label');
    TIME_BAR = document.getElementById('cacuria_time_bar');
    TIME_BAR_DOT = document.getElementById('cacuria_icon_dot');
    TIME_BAR_PAST= document.getElementById('cacuria_time_line1');
    TIME_BAR_FUTURE= document.getElementById('cacuria_time_line2');
    VOLUMEBAR = document.getElementById("cacuria_volumebar_inside");
    
        
    SetPlayerDimension();
   
    CANVAS_CONTEXT.fillStyle = "rgb(12,12,12)";
    CANVAS_CONTEXT.fillRect(0, 0,  CANVAS_ELEMENT.width,  CANVAS_ELEMENT.height);
   
    
    
    
    DrawTimeBar(0);
    
    
      CANVAS_ELEMENT.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(document.getElementById('cacuriaPlayerCanvas'), evt);
         if(PLAYER_STATE=='PAUSE')playStopVideo(null);
         else sceneList[sceneIndex].clickScene(mousePos.x,mousePos.y);
        
      }, false);
	  
	  CANVAS_ELEMENT.addEventListener('mousemove', function(evt) {
         var mousePos = getMousePos(document.getElementById('cacuriaPlayerCanvas'), evt);
         if(PLAYER_STATE!='PLAY')return;
         else sceneList[sceneIndex].hoverScene(mousePos.x,mousePos.y);
        
      }, false);
    
    document.getElementById('cacuria_time_bar').addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(document.getElementById('cacuria_time_bar'), evt);
           
         setVideoTime((mousePos.x/parseInt(TIME_BAR.style.width, 10))*sceneList[sceneIndex].getTime());
      }, false);
    
    
     document.getElementById('cacuria_volumebar').addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(document.getElementById('cacuria_volumebar'), evt);
           setVideoVolume(1-(mousePos.y/140));
      }, false);
    
    MainLoop();
    sceneList[sceneIndex].load();
    
},false);


function MainLoop(){

    // console.log(PLAYING_VIDEO_IN_SCENE);

    if(PLAYER_STATE=='PLAY' || PLAYER_STATE=='BUFFER'){
       //UPDATE SYNCS
       sceneList[sceneIndex].update(Math.floor(CURRENT_TIME/1000));
    
       //DRAW TIMEBAR
       DrawTimeBar(Math.floor(CURRENT_TIME/1000)/sceneList[sceneIndex].getTime()); 
       //DRAW TIMELABEL
       DrawTimeLabel(Math.floor(CURRENT_TIME/1000),sceneList[sceneIndex].getTime());
       //DRAW CONTENT
       sceneList[sceneIndex].DrawMedias(CANVAS_CONTEXT,CANVAS_ELEMENT.width,CANVAS_ELEMENT.height);
   
     } 
     else if(PLAYER_STATE=='LOADING'){
       DrawLoadScreen();
     } 
     else if(PLAYER_STATE=='PAUSE'){
       DrawPauseScreen();
     }
     else if(PLAYER_STATE=='BUFFER'){
       DrawBufferScreen();
     }
     setTimeout(MainLoop,33);
}

function DrawTimeBar(timePercentage){

      if(timePercentage>=0.95)timePercentage=0.95;
      
      TIME_BAR_DOT.style.left=(timePercentage*100)+"%";
      TIME_BAR_PAST.style.width = (timePercentage*100)+"%";
      TIME_BAR_FUTURE.style.width = (95-(timePercentage*100))+"%" ;
 //   progressBarP.style.width = (CANVAS_ELEMENT.width*timePercentage)+"px";    
  //  progressBarB.style.width = ((CANVAS_ELEMENT*videoPercentageBuffered)-(640*timePercentage))+"px";  
}

function DrawBufferScreen(){

    CANVAS_CONTEXT.fillStyle = "rgb(12,12,12)";
    CANVAS_CONTEXT.fillRect(0, 0,  CANVAS_ELEMENT.width,  CANVAS_ELEMENT.height);
    CANVAS_CONTEXT.font = "30px Arial";
    CANVAS_CONTEXT.fillStyle = "white";
    CANVAS_CONTEXT.textAlign = "center";
    CANVAS_CONTEXT.fillText("Buferizando", CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)-20);
    CANVAS_CONTEXT.fillText(LOADING_ANIMATION, CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)+5);
    CANVAS_CONTEXT.font = "22px Arial";
    var percent = Math.floor((CURRENT_SCENE_BUFFER - CURRENT_SCENE_TIMER)*11);
    if(percent<0)percent=0;
    else if(percent>100)percent=100;
    CANVAS_CONTEXT.fillText(percent+" %", CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)+35);
    
    if((CURRENT_SCENE_BUFFER - CURRENT_SCENE_TIMER) >= 8){
           
      //      ResumeFromBuffer();
    }
    
    if(LOADING_ANIMATION.length%2==1) LOADING_ANIMATION+=' ';
    else LOADING_ANIMATION+='.';
    
    if(LOADING_ANIMATION.length>11)LOADING_ANIMATION='';

}

function DrawPauseScreen(){
    CANVAS_CONTEXT.fillStyle = "rgb(12,12,12)";
    CANVAS_CONTEXT.fillRect(0, 0,  CANVAS_ELEMENT.width,  CANVAS_ELEMENT.height);
    
    CANVAS_CONTEXT.beginPath();
    CANVAS_CONTEXT.moveTo((CANVAS_ELEMENT.width/2)-60, (CANVAS_ELEMENT.height/2)-70);
    CANVAS_CONTEXT.lineTo((CANVAS_ELEMENT.width/2)-60, (CANVAS_ELEMENT.height/2)+70);
    CANVAS_CONTEXT.lineTo((CANVAS_ELEMENT.width/2)+60, (CANVAS_ELEMENT.height/2));
    CANVAS_CONTEXT.closePath();
    
    CANVAS_CONTEXT.fillStyle = "#E38F08";
    CANVAS_CONTEXT.fill();
}

function DrawLoadScreen(){
   
    CANVAS_CONTEXT.fillStyle = "rgb(12,12,12)";
    CANVAS_CONTEXT.fillRect(0, 0,  CANVAS_ELEMENT.width,  CANVAS_ELEMENT.height);
    CANVAS_CONTEXT.font = "30px Arial";
    CANVAS_CONTEXT.fillStyle = "white";
    CANVAS_CONTEXT.textAlign = "center";
    CANVAS_CONTEXT.fillText("Carregando", CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)-20);
    CANVAS_CONTEXT.fillText(LOADING_ANIMATION, CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)+5);
    CANVAS_CONTEXT.font = "22px Arial";
    CANVAS_CONTEXT.fillText(Math.floor((100*CURRENT_SCENE_MEDIALOAD)/CURRENT_SCENE_TOTALMEDIAS)+" %", CANVAS_ELEMENT.width/2, (CANVAS_ELEMENT.height/2)+35);
    
    if(CURRENT_SCENE_MEDIALOAD>=CURRENT_SCENE_TOTALMEDIAS){
        if(OFFSET_PLAY==true){
            PLAYER_STATE='PAUSE';
            OFFSET_PLAY=false;
			
        }
        else{
			
            PLAYER_STATE='PLAY';
            sceneList[sceneIndex].play();
        }
    }
    
    if(LOADING_ANIMATION.length%2==1) LOADING_ANIMATION+=' ';
    else LOADING_ANIMATION+='.';
    
    if(LOADING_ANIMATION.length>11)LOADING_ANIMATION='';
}
function StartBuffer(){
    PLAYER_STATE='BUFFER';

}

function ResumeFromBuffer(){
    PLAYER_STATE='PLAY';
    sceneList[sceneIndex].play();
}
function DrawTimeLabel(currentTime, durTime){

    if(currentTime >= durTime){
         var minutesCur = Math.floor(durTime / 60);
         var secondsCur = Math.floor(durTime - minutesCur * 60);
    
    }
    else{
        var minutesCur = Math.floor(currentTime / 60);
        var secondsCur = Math.floor(currentTime - minutesCur * 60);
    }
    
    var minutesDur = Math.floor(durTime / 60);
    var secondsDur = Math.floor(durTime - minutesDur * 60);
    
  
    
    if(currentTime == 0){
         secondsDur="0";
         minutesDur="0";
     }
    
    if(secondsCur < 10)secondsCur = "0"+secondsCur;
    if(secondsDur < 10)secondsDur = "0"+secondsDur;
     
    if(minutesCur < 10)minutesCur = "0"+minutesCur;
    if(minutesDur < 10)minutesDur = "0"+minutesDur;
  
  
    TIME_LABEL.innerHTML = minutesCur+":"+secondsCur+"/"+minutesDur+":"+secondsDur;

}


function playStopVideo(element){

      
      var play_stop_icon =  document.getElementById('cacuria_icon_play');
      
      if(PLAYER_STATE=='LOADING' || PLAYER_STATE=='BUFFER')return;
     
      if(PLAYER_STATE=='PAUSE'){
         sceneList[sceneIndex].play();
         play_stop_icon.className = "cacuria_icon_pause";
         PLAYER_STATE='PLAY'; 
      }
      else{
         sceneList[sceneIndex].pause();
         play_stop_icon.className = "cacuria_icon_play";
         PLAYER_STATE='PAUSE';
      }
      
       
}


function changeSound(element){

    if(element.className == "glyphicon glyphicon-volume-off playersound"){
       element.className = "glyphicon glyphicon-volume-up playersound";
        sceneList[sceneIndex].setVolume(1);
        VOLUMEBAR.value=1;
    }
    else{
       element.className = "glyphicon glyphicon-volume-off playersound";
        sceneList[sceneIndex].setVolume(0);
    }
    
}

function setVideoTime(time){

    if(PLAYER_STATE!='PLAY')return;
  
    sceneList[sceneIndex].setSyncsToTime(Math.floor(time));
    CURRENT_TIME = Math.floor(time)*1000;
    console.log("set do time: "+Math.floor(time));
}
function setVideoVolume(percentage){
   
   if(percentage>=0.9)percentage=1;
   
   VOLUMEBAR.style.height=(((1-percentage)*140))+"px";
   sceneList[sceneIndex].setVolume(percentage);
   
}
function changeVideo(index){
     var aux = sceneIndex;
     sceneIndex=null;
     
     for(var i=0;i<sceneList.length;i++){
        if(sceneList[i].getID()==index){
           sceneIndex=i;
           
        }
     }
     
     
     if(sceneIndex==null){
       sceneIndex= aux;
       return;
       
     }
    
    
}

function changeVideoAndTime(scene,time){ //FUNCAO DO CORE QUE ALTERA A CENA E/OU O TEMPO
   
    SYNC_VIDEO_DIF=false; //SETA A VARIVAVEL QUE DETERMINA SE O VIDEO PRECISA SER BUFERIZADO PARA FALSO
    
   
    CURRENT_TIME=0; //RESET NO TEMPO DA CENA
    SYNC_VIDEO_DIF=time; //TEMPO DO VIDEO SERÁ O TEMPO DO PARAMETRO
    sceneList[sceneIndex].unload(); //DESCARREGA A CENA ANTIGA DA MEMORIA
    changeVideo(scene); //MUDA 
              
    sceneList[sceneIndex].load(); //CARREGA NOVA CENA NA MEMORIA        
    
     
    //CASO A CENA SEJA A MESMA 
    sceneList[sceneIndex].setSyncsToTime(Math.floor(time)); //SETA TODOS OS SYNCS DA CENA ATUAL PARA O MOMENTO CERTO
    CURRENT_TIME = Math.floor(time)*1000; //ATUALIZACAO DO TEMPO ATUAL PARA SEGUNDOS
    
	
}

function getMousePos(canvas, evt) { //RETORNA OS PONTOS DE CLICK DO MOUSE
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}
function CacuriaEvents(evt){ //EVENTOS DE TECLAS
  var key = (evt) ? evt.which : event.keyCode;
  
  if (String.fromCharCode(key)=="f"){
   // fullscreen();
  
  }
}


function FullScreen(){ //CANVAS EM FULLSCREEN
          
    if(CANVAS_ELEMENT.webkitRequestFullScreen) {
       CANVAS_ELEMENT.webkitRequestFullScreen();
    }
    else {
       CANVAS_ELEMENT.mozRequestFullScreen();
    }            
}



function SetPlayerDimension(){ //CALCULO DO TAMANHO DO CANVAS

   
  CANVAS_ELEMENT.height = window.innerHeight-50;
  CANVAS_ELEMENT.width = (1280*(CANVAS_ELEMENT.height))/720;
  
  
   TIME_BAR.style.width = (window.innerWidth-340)+"px";

}