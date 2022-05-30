// Here we are toggling the hamburger and ham-cancel classes.
// so clicking hamburger will add ham-cancel and vice-verce.

document.querySelector("#hamburger").addEventListener("click", function () {
  document.querySelector("#hamburger").classList.toggle("hamburger");
  document.querySelector("#hamburger").classList.toggle("ham-cancel");
});

// After clicking the hamburger icon, the about game section will come out.

document.querySelector("#hamburger").addEventListener("click", function () {
  document.querySelector(".about-game").classList.toggle("show-about-game");
});

//Here we are holding button colors and creating user-pattern and computer pattern.

var buttonColors = ["red", "green", "blue", "yellow"];
var started = false;
var computerPattern = [];
var userPattern = [];
var level = 0;

//When user will click the play button, it will be hidden.

document.querySelector(".play-button").addEventListener("click", function () {
  if (!started) {
    document.querySelector(".play-button").classList.add("hide-play-button");
    nextSequence();
    started = true;
  }
});

//Computer pattern will be created here based on random number.
//Using that random number, a button color will be picked.
//That button color will be pushed to computer-pattern array.
//We are using functions to make sound and flash animation.
//We are also increasing the level and showing it on every step

function nextSequence() {
  userPattern = [];
  level++;
  document.querySelector("#level-title").innerHTML = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  computerPattern.push(randomChosenColor);
  animateButton(randomChosenColor);
  makeSound(randomChosenColor);
}

//After a random color shown by computer, user will press the button
//We are collecting the id of the button clicked by user.
//We will push that color to user pattern array
//Finally we will use a function to check the answer,
//In that function, we are passing the (length-1).
//Because we want to check the last pushed color inside both arrays

for (var i = 0; i < 4; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var pressedButton = this.id;
    userPattern.push(pressedButton);
    makeSound(pressedButton);
    animateButton(pressedButton);
    checkAnswer(userPattern.length - 1);
  });
}

//It`s used to make flash animation. It flashes the button that was pressed
//We are passing the color to this function as parameter.

function animateButton(param) {
  $("#" + param)
    .fadeOut(80)
    .fadeIn(80);
}

//It`s used to make sound as per the buttons pressed.
//We are passing the color to this function as parameter.

function makeSound(param) {
  var sound = new Audio(param + ".mp3");
  sound.play();
}

//It checks the answer and takes (length-1) as input
//That means the last pushed color inside the both array
//if last pushed colors are same in both arrays and their length are same,
//we are creating next sequence by calling the function
//But before that we are taking a delay of 900ms
//If the conditions don`t satisfy, a sound will be played for wrong answer.
//A class called "game-over" will be showed on the screen
//User needs to click anywhere on screen to go to home again
//It`s showing the level to the user
//Then the "game-over" function will be vaished again
//Play button again will appear to start the game

function checkAnswer(param) {
  if (userPattern[param] === computerPattern[param]) {
    if (userPattern.length === computerPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 900);
    }
  } else if (level !== 0) {
    makeSound("wrong");
    document.querySelector(".game-over").style.top = "0";
    document.querySelector(".show-score").innerHTML =
      "<h2>Your level is " + level + "</h2>";
    document.querySelector(".game-over").addEventListener("click", function () {
      document.querySelector(".game-over").style.top = "100%";
    });
    document.querySelector(".play-button").classList.add("show-play-button");
    startOver();
  }
}

//It is resetting everything
//computer pattern is also being emptied.

function startOver() {
  document.querySelector("#level-title").innerHTML =
    "Press play button to start";
  started = false;
  computerPattern = [];
  level = 0;
}
