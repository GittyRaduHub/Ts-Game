var collectElem = document.getElementById("collect");
var avoidElem = document.getElementById("avoid");
var startBtn = document.querySelector(".start_btn");
var text_lost = document.getElementById("message_lost");
var text_victory = document.getElementById("message_victory");
var countElement = document.getElementById("count");
var background = document.getElementById("gameCanvas");
var newGame = document.getElementById("new_game");
var changeElem = document.getElementById("change");
var changeDefaultDisplay = changeElem.style.display;
var default_start_btn = startBtn.style.display;
var default_text_lost = text_lost.style.display;
var default_text_victory = text_victory.style.display;
var collectDefaultDisplay = collectElem.style.display;
var avoidDefaultDisplay = avoidElem.style.display;
var newGameDefault = newGame.style.display;
newGame.style.display = "none";
text_lost.style.display = "none";
text_victory.style.display = "none";
collectElem.style.display = "none";
avoidElem.style.display = "none";
changeElem.style.display = "none";
var score = 0;
var startTime = 0;
var time = startTime * 60;
var gameMode = 0; //gamemode 0 = not playing!
//Clasa pentru elementul colectibil
var Collectible = /** @class */ (function () {
    function Collectible() {
        this.type = "collect";
        this.color = "green";
        this.shape = "circle";
    }
    Collectible.prototype.onClick = function () {
        collectElem.style.display = "none";
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
        if ((changeElem.style.background = "green")) {
            changeElem.style.display = "none";
            if (collectElem.style.display == "none" &&
                changeElem.style.display == "none" &&
                gameMode == 1) {
                victory();
            }
        }
        else if ((changeElem.style.background = "red")) {
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
    startBtn.style.display = "none";
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
    setTimeout(randomElem, 1000);
    if (gameMode == 1) {
        setInterval(updateCounter, 1000);
    }
    else if (gameMode == 0) {
        clearInterval(setInterval(updateCounter, 1000));
    }
}
newGame.addEventListener("click", function () {
    location.reload();
});
var defeat = function () {
    gameMode = 0;
    background.style.background = "red";
    collectElem.style.display = "none";
    avoidElem.style.display = "none";
    text_lost.style.display = default_text_lost;
    changeElem.style.display = "none";
    newGame.style.display = newGameDefault;
    newGame.style.background = "white";
    countElement.innerHTML = "How does it feel to waste ".concat(time, " seconds?");
};
var victory = function () {
    gameMode = 0;
    background.style.background = "green";
    text_victory.style.display = default_text_victory;
    avoidElem.style.display = "none";
    newGame.style.display = newGameDefault;
    newGame.style.background = "white";
    countElement.innerHTML = "You won in ".concat(time, " seconds!");
};
var randomHeight = function () {
    return Math.floor(Math.random() * window.innerHeight) + "px";
};
var randomWidth = function () {
    return Math.floor(Math.random() * window.innerWidth) + "px";
};
