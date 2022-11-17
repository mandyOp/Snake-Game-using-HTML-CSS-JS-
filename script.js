//constants and variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const musicsound = new Audio("music.mp3");
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main); // game loop
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return; // fps formula
  }
  lastPaintTime = ctime;
  gameEngine();
}

// collision function

function isCollide(snake) {
  //1) if u bump in yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if u bump in wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

//game engine

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Please press any key to start again");
    snakeArr = [{ x: 13, y: 15 }];
    musicsound.play();
    score = 0;
  }

  // if u have eaten food, regenerate food and expand snake array

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodsound.play();
    score += 1;
    speed += 0.1;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("highscorebox", JSON.stringify(highscoreval));
      highscorebox.innerHTML = "Highscore: " + highscoreval;
    }
    scorebox.innerHTML = "Score: " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    // respawn food

    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //Moving the snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Display snake

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main Logic
let Highscore = localStorage.getItem("highscorebox");
if (Highscore === null) {
  highscoreval = 0;
  localStorage.setItem("highscorebox", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(Highscore);
  highscorebox.innerHTML = "Highscore: " + Highscore;
}

window.requestAnimationFrame(main); // its better than setInterval bcoz it gives contsant fps without stuttering or flickering

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  movesound.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("arrowup");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("arroedown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("arrowleft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("arrowright");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
