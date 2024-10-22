

function closeDialog() {
    document.querySelector(".dialog").style.display = 'none';
}

let gameSeq=[];
let userSeq=[];

let btns = ["red", "yellow", "orange", "olive", "green", "purple", "blue", "magenta"];
let started = false;
let level = 0;
let c = 0;

let h2= document.querySelector("h2");
let h3= document.querySelector("h3");

document.addEventListener("keypress", function(){
    if (started== false){
        console.log("Game Started");
        started= true;
        levelUp()
    }
});

//To flash button

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    }, 350);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash")
    }, 350);
}

function levelUp() {
    userSeq= [];
    level++;
    abcd = document.querySelector(".abcd");
    abcd.innerText = `Level ${level}`;

    // To choose random colour

    let randIdx = Math.floor(Math.random() * 8);
    console.log(randIdx);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {

    if (userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        let bdy = document.querySelector("body");
        bdy.style.backgroundColor = "red";
        setTimeout(function() {
            bdy.style.backgroundColor = "white";
        }, 100);

        abcd = document.querySelector(".abcd")
        abcd.innerHTML = `Game Over! Your Score was <b> ${level}</b>. Press any key to Start`;
        document.querySelector("body").style.backgroundColor = "red" ;
        setTimeout (function(){
            document.querySelector("body").style.backgroundColor = "white" ;
        }, 150)
        if (level>c){
            abc= document.querySelector(".abc")
            abc.innerHTML = `Highest Score: <b>${level} </b>`;
            c=level;
        }
        reset();
    }
}

// Button Event Listener

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor)
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq= [];
    userSeq=[];
    level = 0;
    c = 0;
}