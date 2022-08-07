var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var running = false;
const buttonColors = ["red", "blue", "green", "yellow"];


$("body").on("keypress", function() {
  if (running == false) {
    $("body").removeClass("game-over");
    nextSequence(buttonColors);
    $("h1").text("Level 1")
    running = true;
  };
});

$(".btn").click(function() {
  if (running == true) {
    userChoosenColor = $(this).attr("id");
    animatePress(userChoosenColor);
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    if (gamePattern.length == userClickedPattern.length) {
      var patternMatch = JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern);
      if (patternMatch == true) {
        $("h1").text("Level " + level++)
        userClickedPattern = []
        setTimeout(function() {
          nextSequence(buttonColors)
        }, 2000)
      };
      if (patternMatch == false) {
        gameOver();
      };
    };
  };
});

function gameOver(){
  $("h1").text("Game Over - Press Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var gameOver = new Audio('sounds/wrong.mp3');
  gameOver.play();
  gamePattern = []
  userClickedPattern = []
  level = 1
  running = false;
};

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
};

function animatePress(userChoosenColor){
  $("#" + userChoosenColor).addClass("pressed");
  $("#" + userChoosenColor).fadeOut(100).fadeIn(100);
  setTimeout(function(){$("#" + userChoosenColor).removeClass("pressed");}, 100);
};

function nextSequence(buttonColors) {
  var randomNumber = Math.floor(Math.random(4) * 4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  setTimeout(function() {
    $("#" + randomChoosenColor).removeClass("pressed");
  }, 100)
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
};

function isEqual(gamePattern, userClickedPattern) {
  console.log(JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern));
};

$("h1").click(function() {
  $("h1").css("color", "#2A0944");
});
