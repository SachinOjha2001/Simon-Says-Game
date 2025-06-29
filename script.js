let gameSeq = [];
let userSeq = [];

const btns = ["green", "red", "yellow", "purple"];
let started = false;
let level = 0;

const h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  const randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
  console.log("Game sequence:", gameSeq);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score Was <b>${level}</b><br>Press any key to restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

function btnpress() {
  const btn = this;
  userFlash(btn);

  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
  h2.innerText = `Press any key to start`;
}

