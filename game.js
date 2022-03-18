let userClickedPattern = []
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let buttons = document.querySelector(".btn");
let level = 0;
let toggle = false;

//Cuando se usa una tecla

document.addEventListener("keydown", function() {
  if (toggle) {} else {
    nextSequence()
  }
})

//Cuando se hace click en un boton

for (let i = 0; i < buttonColours.length; i++) {
  let colours = document.querySelector("#" + buttonColours[i]);
  let attID = colours.getAttribute("id");
  colours.addEventListener("click", function() {
    animatePress(colours);
    let userChosenColour = attID;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    if(toggle == true){
      checkAnswer(userClickedPattern.length);
    }
  })
}

//Secuencia del juego

function nextSequence() {
  userClickedPattern = []
  toggle = true;
  level++;
  document.querySelector("#level-title").innerHTML = ("level " + level)
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColours = buttonColours[randomNumber];
  gamePattern.push(randomChosenColours);
  let randomButton = document.querySelector("#" + randomChosenColours);
  blink(randomButton)
  playSound(randomChosenColours)
}

//Revisando respuestas

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    }else {
      let wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      document.querySelector("#level-title").innerHTML = ("Game over, Press Any Key to Restart")
      document.querySelector("body").classList.add("game-over")
      setTimeout(function() {
        document.querySelector("body").classList.remove("game-over")
      }, 200);
      startOver()
    }
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && toggle == true) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
  }
}

//funcion para resetear al finalizar el juego

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  toggle = false;
}

// sonidos

function playSound(name) {
  switch (name) {
    case ("red"):
      let red = new Audio("sounds/red.mp3");
      red.play()
      break;
    case ("blue"):
      let blue = new Audio("sounds/blue.mp3");
      blue.play()
      break;
    case ("green"):
      let green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case ("yellow"):
      let yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      console.log(aud);
  }
}


//animaciones


function animatePress(currentColour) {
  currentColour.classList.add("pressed");

  setTimeout(function() {
    currentColour.classList.remove("pressed")
  }, 100);
}

const blink = (n) => {
  n.classList.add("blink_me");

  setTimeout(function() {
    n.classList.remove("blink_me")
  }, 100);
}
