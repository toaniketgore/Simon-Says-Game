let gameSeq = [];
let userSeq = [];
let highScore = 0;


let btns = ["red", "yellow", "green", "blue"];

let isStarted = false;

let level = 0;

document.addEventListener("keypress", () => {
    if (isStarted == false) {
        console.log("game is started");
        isStarted = true;
        levelUp();
    }
});

let h3 = document.querySelector("h3");



function levelUp() {

    userSeq=[];

    level++;
    h3.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    gameSeq.push(randomColor);
    let randBtn = document.querySelector(`.${randomColor}`); // choosing random btn from color
    gameFlash(randBtn);
    updateHighScore();
}

function gameFlash(button) {
    button.classList.add("flash");
    setTimeout(()=>button.classList.remove("flash"),250);
};

function userFlash(button) {
    button.classList.add("userFlash");
    setTimeout(()=>button.classList.remove("userFlash"),250);
}

function wrongAns(){
    let body = document.querySelector("body");
    body.classList.add("red");
    setTimeout(()=>body.classList.remove("red"),150);
    updateHighScore();
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        console.log("over");
        wrongAns();
        h3.innerText= `GAME OVER ! Your score was ${level} Press any key to start`; 
        reset();
    }
}
function btnPress() {

    let btn = this;
    userFlash(btn);

   let userColor= btn.getAttribute("id");

   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function updateHighScore() {
    if (level - 1 > highScore || level >highScore) {
        highScore = level;
        let highscoreElement = document.getElementById("highscore");
        highscoreElement.innerText = `High Score: ${highScore}`;
    }
}

function reset(){
isStarted = false;
gameSeq = [];
userSeq = [];
level = 0;
}