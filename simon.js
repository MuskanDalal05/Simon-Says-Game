let gameSeq=[];
let userSeq=[];
let btns=["green","red","yellow","blue"];
let started=false;
let level=0;
let highScore = localStorage.getItem("highScore") || 0;


let h2=document.querySelector("h2");

let userName = prompt("What is your name?");
let wantToPlay = confirm(`Hi ${userName}! Do you want to play Simon Says game?`);
if(wantToPlay){
    h2.innerText = `Hi ${userName}, press any key to start the game`;
} else {
    h2.innerText = `Okay ${userName}, maybe next time 😊`;
}
document.addEventListener("keypress", function(){
    if(started === false && wantToPlay){
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.style.backgroundColor = "white";
    setTimeout(function(){
        btn.style.backgroundColor = "";
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}
    

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randomIndx=Math.floor(Math.random()*4);
    let randomColor=btns[randomIndx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    // console.log(randomBtn);
    // console.log(randomColor);
    // console.log(randomIndx);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}
function checkAnswer(indx){
    if(userSeq[indx] === gameSeq[indx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 250);
        }
    } else {

        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `
            Game Over<br>
            Your score was <b>${level}</b><br>
            Highest score: <b>${highScore}</b><br>
            Press Any Key to Restart
        `;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAnswer(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
function reset(){
    gameSeq=[];
    userSeq=[];
    level=0;
    started=false;
}
