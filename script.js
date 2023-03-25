// Initialize variables
var ballX = 400; // initial x position of ball
var ballY = 300; // initial y position of ball
var ballSpeedX = 5; // speed of ball in x direction
var ballSpeedY = 5; // speed of ball in y direction
var player1Y = 250; // initial y position of player 1 paddle
var player2Y = 250; // initial y position of player 2 paddle
var player1Score = 0; // player 1 score
var player2Score = 0; // player 2 score

// Game loop
function gameLoop() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collision with player paddles
    if (ballX <= 20 && ballY >= player1Y && ballY <= player1Y + 100) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= 760 && ballY >= player2Y && ballY <= player2Y + 100) {
        ballSpeedX = -ballSpeedX;
    }

    // Check for collision with top and bottom walls
    if (ballY <= 0 || ballY >= 580) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for scoring
    if (ballX <= 0) {
        player2Score++;
        reset();
    }
    if (ballX >= 780) {
        player1Score++;
        reset();
    }

    // Move player paddles
    if (keys[87] && player1Y > 0) { // w key
        player1Y -= 5;
    }
    if (keys[83] && player1Y < 500) { // s key
        player1Y += 5;
    }
    if (keys[38] && player2Y > 0) { // up arrow
        player2Y -= 5;
    }
    if (keys[40] && player2Y < 500) { // down arrow
        player2Y += 5;
    }

    // Update HTML
    document.getElementById("player1").style.top = player1Y + "px";
    document.getElementById("player2").style.top = player2Y + "px";
    document.getElementById("ball").style.left = ballX + "px";
    document.getElementById("ball").style.top = ballY + "px";
    document.getElementById("player1-score").innerHTML = player1Score;
    document.getElementById("player2-score").innerHTML = player2Score;

    // Call game loop again
    setTimeout(gameLoop, 20);
}

// Reset game
function reset() {
    ballX = 400;
    ballY = 300;
    ballSpeedX = -ballSpeedX;
}

// Handle key events
var keys = {};
document.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
    delete keys[event.keyCode];
});

// Start game loop
gameLoop();
