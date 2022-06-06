var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

// Detect first keypress and start game
$(document).keypress(function(){
    if(!gameOn) {
        gameOn = true;
        nextSequence();
    }
});

// Updates H1 according to the level
function updateH1(level){
        $("#level-title").text("Level " + level);
}

// Button event handeler to detect clicks and add the id to UserClicked pattern array
var btnClicked = $(".btn").on("click", function(event){
    var userChosenColor = (event.target.id);
    userClickedPattern.push(userChosenColor);
    addSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// Machine game pattern
function nextSequence() {
    userClickedPattern = [];
    level++;
    updateH1(level);
    var randomNbr = Math.floor(Math.random() * 4);
    var randomChosenColor = btnColors[randomNbr];
    gamePattern.push(randomChosenColor);
    addAnimation(randomChosenColor);
    addSound(randomChosenColor);
}

// Checks user clicks against the game pattern
function checkAnswer(index){
    var machine = gamePattern[index];
    var player = userClickedPattern[index]
    if(machine === player) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000)
        }
    }
    else if(machine != player) {
        $("body").addClass("game-over");
        addSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver();
    }
}


// Flash animation for the random button
function addAnimation(id) {
    $("#" + id).fadeOut(100).fadeIn(100);

}

// Plays sound for the random button and clicked button
function addSound(sound){
    var audio = new Audio('sounds/' + sound + '.mp3');
    audio.play();
}

// Animation for the click
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }), 100;
}

// Resets game
function gameOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
}
