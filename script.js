var collectElem = document.getElementById("collect");
var avoidElem = document.getElementById("avoid");
var startBtn = document.querySelector(".start_btn");
var text_lost = document.getElementById("message_lost");
var text_victory = document.getElementById("message_victory");
var countElement = document.getElementById("count");
var background = document.getElementById("gameCanvas");
var newGame = document.getElementById("new_game");
var changeElem = document.getElementById("change");
var score_elem = document.getElementById("score");
var default_score_elem = score_elem.style.display;
var changeDefaultDisplay = changeElem.style.display;
var default_start_btn = startBtn.style.display;
var default_text_lost = text_lost.style.display;
var default_text_victory = text_victory.style.display;
var collectDefaultDisplay = collectElem.style.display;
var avoidDefaultDisplay = avoidElem.style.display;
var newGameDefault = newGame.style.display;
score_elem.style.display = "none";
newGame.style.display = "none";
text_lost.style.display = "none";
text_victory.style.display = "none";
collectElem.style.display = "none";
avoidElem.style.display = "none";
changeElem.style.display = "none";
var score = 0;
var startTime = 0;
var time = startTime * 60;
var gameMode = 0; //gamemode 0 = nu se intampla nimic!
var counterIntervalId = null;
//Clasa pentru elementul colectibil
var Collectible = /** @class */ (function () {
    function Collectible() {
        this.type = "collect";
        this.color = "green";
        this.shape = "circle";
    }
    Collectible.prototype.onClick = function () {
        collectElem.style.display = "none";
        score++;
        if (collectElem.style.display == "none" &&
            changeElem.style.display == "none" &&
            gameMode == 1) {
            victory();
        }
    };
    return Collectible;
}());
//Clasa pentru elementul care trebuie evitat
var Avoid = /** @class */ (function () {
    function Avoid() {
        this.type = "avoid";
        this.color = "red";
        this.shape = "square";
    }
    Avoid.prototype.onClick = function () {
        defeat();
    };
    return Avoid;
}());
//Clasa pentru elementul care isi schimba starea
var Change = /** @class */ (function () {
    function Change() {
        this.type = "change";
        this.color = "mix";
        this.shape = "rectangle";
    }
    Change.prototype.onClick = function () {
        if (changeElem.style.background == "green") {
            changeElem.style.display = "none";
            score++;
            if (collectElem.style.display == "none" &&
                changeElem.style.display == "none" &&
                gameMode == 1) {
                victory();
            }
        }
        else if (changeElem.style.background == "red") {
            defeat();
        }
    };
    return Change;
}());
function onClickCollectible() {
    var myCollectible = new Collectible();
    myCollectible.onClick();
}
function onClickAvoid() {
    var myAvoid = new Avoid();
    myAvoid.onClick();
}
function onClickChange() {
    var myChange = new Change();
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
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        var formattedMinutes = minutes < 10 ? "0".concat(minutes) : "".concat(minutes);
        var formattedSeconds = seconds < 10 ? "0".concat(seconds) : "".concat(seconds);
        countElement.innerHTML = "".concat(formattedMinutes, ":").concat(formattedSeconds);
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
    var randomElemTimeoutId = setTimeout(randomElem, 1000);
    changeBackground();
    newGame.addEventListener("click", function () {
        location.reload();
    });
}
var defeat = function () {
    gameMode = 0;
    console.log(gameMode);
    background.style.background = "red";
    collectElem.style.display = "none";
    avoidElem.style.display = "none";
    text_lost.style.display = default_text_lost;
    changeElem.style.display = "none";
    newGame.style.display = newGameDefault;
    newGame.style.background = "white";
    countElement.innerHTML = "How does it feel to waste ".concat(time, " seconds?");
    clearInterval(counterIntervalId);
};
var victory = function () {
    gameMode = 0;
    console.log(gameMode);
    console.log(time);
    console.log("Score ".concat(score));
    background.style.background = "green";
    text_victory.style.display = default_text_victory;
    avoidElem.style.display = "none";
    newGame.style.display = newGameDefault;
    newGame.style.background = "white";
    countElement.innerHTML = "It only took you ".concat(time, " seconds!");
    score_elem.style.display = default_score_elem;
    score_elem.innerHTML = "Score: ".concat(score, " points");
    clearInterval(counterIntervalId);
};
var randomHeight = function () {
    return Math.floor(Math.random() * (window.innerHeight - 200)) + "px";
};
var randomWidth = function () {
    return Math.floor(Math.random() * (window.innerWidth - 200)) + "px";
};
