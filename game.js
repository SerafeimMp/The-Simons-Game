var gamePattern =[];
var array = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
   
    userClickedPattern = [];

    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = randomNumber;//yellow red etc

    gamePattern.push(array[randomChosenColour]);
    $("#"+array[randomChosenColour]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(array[randomChosenColour]);
    
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColor){
        $( "#"+currentColor ).addClass("pressed");
      
    setTimeout(function(){
        $("#"+currentColor).removeClass('pressed');
    }, 100);
     
}
var started = false;
$(window).keypress(function() {
    if(!started){
    nextSequence();
    }
    started = true;
  } );  

function checkAnswer(currentLevel){
   console.log("Calling " +  currentLevel);
    
     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
         console.log("Success!");

         if (userClickedPattern.length === gamePattern.length){
            level++;
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
         
     }else{
        playSound("wrong");
        gameover();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("Wrong");
        startOver();
     }
}
$( ".btn" ).click( function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  } );

  function gameover(){
    $(document.body).addClass("game-over");
      
    setTimeout(function(){
        $(document.body).removeClass("game-over");
    }, 200);
  }

  function startOver(){
    level = 0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;  
  }