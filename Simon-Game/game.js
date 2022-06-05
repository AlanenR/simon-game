var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Detect first keypress and start game
$(document).one("keypress", function(){
    nextSequence();
});

// Button event handeler to detect clicks and add the id to UserClicked pattern array
var btnClicked = $(".btn").on("click", function(event){
    var userChosenColor = (event.target.id);
    userClickedPattern.push(userChosenColor);
    addSound(userChosenColor);
    animatePress(userChosenColor);
});

function nextSequence() {
    var randomNbr = Math.floor(Math.random() * 4);
    var randomChosenColor = btnColors[randomNbr];
    gamePattern.push(randomChosenColor);
    addAnimation(randomChosenColor);
    addSound(randomChosenColor);
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

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }), 100;

}
