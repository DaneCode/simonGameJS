var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var running = false;
const buttonColors = ["red", "blue", "green", "yellow"];
// Start Button Function
$("button[name='start']").on("click", function() {
  if (running == false) {
    $("body").removeClass("game-over");
    nextSequence(buttonColors);
    $("#level-title").text("Level 1")
    running = true;
  };
});
// Start game with Keypress Funciton
$("body").on("keypress", function() {
  if (running == false) {
    $("body").removeClass("game-over");
    nextSequence(buttonColors);
    $("#level-title").text("Level 1")
    running = true;
  };
});
// User Input
$(".btn").click(function() {
  // only allows buttons to be clicked after game is started
  if (running == true) {
    userChoosenColor = $(this).attr("id");
    animatePress(userChoosenColor);
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    // Checks win condition
    winCondition()
  };
});
function winCondition(){
  if (gamePattern.length == userClickedPattern.length) {
    var patternMatch = JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern);
    if (patternMatch == true) {
      $("#level-title").text("Level " + level++)
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
function gameOver(){
  $("#level-title").text("Game Over - Press Key or Start to Restart");
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
