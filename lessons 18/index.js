const timer = document.querySelector(".timer__span");
const creatNewTimer = document.querySelector(".timer-button__create-new");
const startTimer = document.querySelector(".timer-button__start");
let flagStartStop = false;
let tik = 0;
let thisTimer;

const newTimer = (time) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const addTimer = (time) => {
  timer.textContent = newTimer(time);
};

const startStop = () => {
  if (thisTimer) {
    flagStartStop = !flagStartStop;
    startTimer.textContent = flagStartStop ? "Start" : "Stop";
  }
};

const intervalTimer = () => {
  thisTimer = setInterval(() => {
    if (!flagStartStop && tik > 0) {
      tik--;
      addTimer(tik);
    } if(tik <=0) {
        startNewTimerFunc()
    }
    else {
      return;
    }
  }, 1000);
};

const startNewTimerFunc = () => {
  if (thisTimer == undefined) {
    tik = prompt("Enter timer second");
    addTimer(tik);
    creatNewTimer.textContent = "Reset";
    intervalTimer();
  } else {
    creatNewTimer.textContent = "New Timer";
    timer.textContent = "00:00:00";
    clearInterval(thisTimer);
    thisTimer = undefined;
  }
};

creatNewTimer.addEventListener("click", startNewTimerFunc);
startTimer.addEventListener("click", startStop);
