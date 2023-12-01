const collectElem = document.getElementById("collect") as HTMLInputElement;
const avoidElem = document.getElementById("avoid") as HTMLInputElement;
const startBtn = document.querySelector(".start_btn") as HTMLDivElement;
const text_lost = document.getElementById("message_lost") as HTMLInputElement;
const text_victory = document.getElementById(
  "message_victory"
) as HTMLInputElement;
const countElement = document.getElementById("count") as HTMLInputElement;
const background = document.getElementById("gameCanvas") as HTMLInputElement;
const newGame = document.getElementById("new_game") as HTMLDivElement;
const changeElem = document.getElementById("change") as HTMLInputElement;
const score_elem = document.getElementById("score") as HTMLInputElement;

const default_score_elem = score_elem.style.display;
const changeDefaultDisplay = changeElem.style.display;
const default_start_btn = startBtn.style.display;
const default_text_lost = text_lost.style.display;
const default_text_victory = text_victory.style.display;
const collectDefaultDisplay = collectElem.style.display;
const avoidDefaultDisplay = avoidElem.style.display;
const newGameDefault = newGame.style.display;

score_elem.style.display = "none";
newGame.style.display = "none";
text_lost.style.display = "none";
text_victory.style.display = "none";
collectElem.style.display = "none";
avoidElem.style.display = "none";
changeElem.style.display = "none";

let score: number = 0;
const startTime: number = 0;
var time = startTime * 60;
var gameMode: number = 0; //gamemode 0 = not playing!
let counterIntervalId: null | ReturnType<typeof setTimeout> = null;

//Interfata pentru forme
interface Shape {
  type: "collect" | "avoid" | "change";
  color: "green" | "red" | "mix";
  shape: "circle" | "square" | "rectangle";
  onClick(): void;
}

//Clasa pentru elementul colectibil
class Collectible implements Shape {
  type: "collect" = "collect";
  color: "green" = "green";
  shape: "circle" = "circle";

  constructor() {}

  onClick() {
    collectElem.style.display = "none";
    score++;
    if (
      collectElem.style.display == "none" &&
      changeElem.style.display == "none" &&
      gameMode == 1
    ) {
      victory();
    }
  }
}

//Clasa pentru elementul care trebuie evitat
class Avoid implements Shape {
  type: "avoid" = "avoid";
  color: "red" = "red";
  shape: "square" = "square";

  constructor() {}

  onClick(): void {
    defeat();
  }
}

//Clasa pentru elementul care isi schimba starea
class Change implements Shape {
  type: "collect" | "avoid" | "change" = "change";
  color: "green" | "red" | "mix" = "mix";
  shape: "circle" | "square" | "rectangle" = "rectangle";

  constructor() {}

  onClick(): void {
    if (changeElem.style.background == "green") {
      changeElem.style.display = "none";
      score++;
      if (
        collectElem.style.display == "none" &&
        changeElem.style.display == "none" &&
        gameMode == 1
      ) {
        victory();
      }
    } else if (changeElem.style.background == "red") {
      defeat();
    }
  }
}

function onClickCollectible() {
  const myCollectible = new Collectible();
  myCollectible.onClick();
}

function onClickAvoid() {
  const myAvoid = new Avoid();
  myAvoid.onClick();
}

function onClickChange() {
  const myChange = new Change();
  myChange.onClick();
}

function onStartClick() {
  gameMode = 1;
  console.log(gameMode);
  startBtn.style.display = "none";

  function changeBackground() {
    setInterval(function () {
      if (gameMode === 1) {
        changeElem.style.background = "red";
        setTimeout(function () {
          changeElem.style.background = "green";
        }, 1000);
      }
    }, 2000);
  }

  function updateCounter() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    countElement.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    time++;
  }
  function randomElem() {
    collectElem.style.display = collectDefaultDisplay;
    avoidElem.style.display = avoidDefaultDisplay;
    changeElem.style.display = changeDefaultDisplay;

    avoidElem.style.top = randomHeight();
    avoidElem.style.left = randomWidth();

    changeElem.style.top = randomHeight();
    changeElem.style.left = randomWidth();

    collectElem.style.top = randomHeight();
    collectElem.style.left = randomWidth();
  }

  counterIntervalId = setInterval(updateCounter, 1000);
  const randomElemTimeoutId = setTimeout(randomElem, 1000);
  changeBackground();

  newGame.addEventListener("click", () => {
    location.reload();
  });
}

const defeat = function () {
  gameMode = 0;
  console.log(gameMode);
  background.style.background = "red";
  collectElem.style.display = "none";
  avoidElem.style.display = "none";
  text_lost.style.display = default_text_lost;
  changeElem.style.display = "none";
  newGame.style.display = newGameDefault;
  newGame.style.background = "white";
  countElement.innerHTML = `How does it feel to waste ${time} seconds?`;
  clearInterval(counterIntervalId);
};

const victory = function () {
  gameMode = 0;
  console.log(gameMode);
  console.log(time);
  console.log(`Score ${score}`);
  background.style.background = "green";
  text_victory.style.display = default_text_victory;
  avoidElem.style.display = "none";
  newGame.style.display = newGameDefault;
  newGame.style.background = "white";
  countElement.innerHTML = `It only took you ${time} seconds!`;
  score_elem.style.display = default_score_elem;
  score_elem.innerHTML = `Score: ${score} points`;
  clearInterval(counterIntervalId);
};

const randomHeight = () => {
  return Math.floor(Math.random() * (window.innerHeight - 200)) + "px";
};
const randomWidth = () => {
  return Math.floor(Math.random() * (window.innerWidth - 200)) + "px";
};
