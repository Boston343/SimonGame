var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// ----------------------------------------------------------------------------------------------------------
// on first keypress only, this starts the game
$(document).keypress(function() {
    if ( !gameStarted ) {
        $("h1").text("Level 0");
        gameStarted = true;
        nextSequence();
    }
})

// ----------------------------------------------------------------------------------------------------------
// handler for user button presses. Adds to user pattern and shows press
$(".btn").click(function() {
    if ( gameStarted ) {
        var userChosenColor = this.id;
        animatePress(userChosenColor);
        userClickedPattern.push(userChosenColor);

        // check if button press is correct
        if ( checkPattern() == true ) {
            playSound(userChosenColor);

            // if we have gotten everything correct up to the current end of the game pattern
            if ( userClickedPattern.length === level ) {    
                // get addition to game pattern
                setTimeout(nextSequence, 1000);
                userClickedPattern = [];
            }
        }
        else {
            // reset game
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            userClickedPattern = [];
            gamePattern = [];
            $("h1").text("Game Over, You Got to Level " + level + "! Press Any Key to Restart");
            level = 0;
            gameStarted = false;
        }
    }
});

// ----------------------------------------------------------------------------------------------------------
// check pattern
function checkPattern() {
    var isCorrect = true;

    var i;
    for ( i=0; i<userClickedPattern.length; i++ ) {
        if ( userClickedPattern[i] != gamePattern[i] ) {
            isCorrect = false;
            break;
        }
    }

    return isCorrect;
}

// ----------------------------------------------------------------------------------------------------------
// animates a user button press
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout ( function() {
        $("#" + color).removeClass("pressed");
    }, 100 );
}

// ----------------------------------------------------------------------------------------------------------
// creates the next press in the sequence and displays / plays it for the user
function nextSequence() {
    var rand = Math.floor ( 4 * Math.random() );        // generate number from 0 to 3
    var randChosenColor = buttonColors[rand];
    gamePattern.push(randChosenColor);
    level++;
    $("h1").text("Level " + level);
    playSound(randChosenColor);
    $("#" + randChosenColor).fadeOut(100).fadeIn(100);  // flicker the chosen button
}

// ----------------------------------------------------------------------------------------------------------
// plays the button sound
function playSound(color) {
    switch(color) {
        case "red":
            var audio_red = new Audio("SimonGame/sounds/red.mp3");
            audio_red.play();
            break;

        case "blue":
            var audio_blue = new Audio("SimonGame/sounds/blue.mp3");
            audio_blue.play();
            break;

        case "green":
            var audio_green = new Audio("SimonGame/sounds/green.mp3");
            audio_green.play();
            break;

        case "yellow":
            var audio_yellow = new Audio("SimonGame/sounds/yellow.mp3");
            audio_yellow.play();
            break;

        case "wrong":
            var audio_wrong = new Audio("SimonGame/sounds/wrong.mp3");
            audio_wrong.play();
            break;

        default:
            break;
    }
}
