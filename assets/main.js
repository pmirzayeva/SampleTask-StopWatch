const resetBtn = document.querySelector("#resetBtn");
const playBtn = document.querySelector("#playBtn");
const lapBtn = document.querySelector("#lapBtn");
const clearBtn = document.querySelector("#clearBtn");

const second = document.querySelector(".second");
const msecond = document.querySelector(".msecond");
const minute = document.querySelector(".minute");
const hours = document.querySelector(".hours");
const laps = document.querySelector(".laps");
const outerSquare = document.querySelector(".outer_square");

let [centiCounter, secCounter, minCounter, hourCounter] = [0, 0, 0, 0];
let centiSec, sec, min, hour;
let isPlay = false;
let isReset = false;

const toggleButton = () => {
  lapBtn.classList.toggle("hidden");
  resetBtn.classList.toggle("hidden");
};

const updateDisplay = () => {
  hours.innerHTML = `${hourCounter.toString().padStart(2, '0')} :`;
  minute.innerHTML = `${minCounter.toString().padStart(2, '0')} :`;
  second.innerHTML = `&nbsp;${secCounter.toString().padStart(2, '0')} :`;
  msecond.innerHTML = `&nbsp;${centiCounter.toString().padStart(2, '0')}`;
};

const play = () => {
    if (!isPlay && !isReset) {
      playBtn.innerHTML = 'Pause';
      outerSquare.classList.add("animation-bg");
  
      // Every 10 milliseconds
      centiSec = setInterval(() => {
        if (centiCounter === 99) {
          centiCounter = 0;
          if (secCounter === 59) {
            secCounter = 0;
            if (minCounter === 59) {
              minCounter = 0;
              hourCounter++;
            } else {
              minCounter++;
            }
          } else {
            secCounter++;
          }
        } else {
          centiCounter++;
        }
        updateDisplay();
      }, 10);
  
      isPlay = true;
      isReset = true;
    } else {
      playBtn.innerHTML = 'Play';
      clearInterval(centiSec);
      isPlay = false;
      isReset = false;
      outerSquare.classList.remove("animation-bg");
    }
    toggleButton();
  };

const reset = () => {
  isReset = true;
  play();
  hourCounter = minCounter = secCounter = centiCounter = 0;
  updateDisplay();
  lapBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
};

const lap = () => {
  const li = document.createElement("li");
  const timestamp = document.createElement("span");

  li.setAttribute("class", "lap_item");
  timestamp.setAttribute("class", "timestamp");

  timestamp.innerHTML = `${hourCounter.toString().padStart(2, '0')} : ${minCounter.toString().padStart(2, '0')} : ${secCounter.toString().padStart(2, '0')} : ${centiCounter.toString().padStart(2, '0')}`;

  li.append(timestamp);
  laps.append(li);

  clearBtn.classList.remove("hidden");
};

const clearAll = () => {
  laps.innerHTML = '';
  laps.append(clearBtn);
  clearBtn.classList.add("hidden");
};

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
clearBtn.addEventListener("click", clearAll);
