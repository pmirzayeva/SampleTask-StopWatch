const resetBtn=document.querySelector("#resetBtn")
const playBtn=document.querySelector("#playBtn")
const lapBtn=document.querySelector("#lapBtn")
const clearBtn=document.querySelector("#clearBtn")

const second=document.querySelector(".second")
const msecond=document.querySelector(".msecond")
const minute=document.querySelector(".minute")
const hours=document.querySelector(".hours")
const laps=document.querySelector(".laps")
const outerSquare=document.querySelector(".outer_square")

let [centiCounter, secCounter, minCounter, hourCounter] = [0, 0, 0, 0];
let centiSec, sec, min, hour;
let isPlay=false;
let isReset=false;


const toggleButton=()=>{
    lapBtn.classList.toggle("hidden")
    resetBtn.classList.toggle("hidden")
}

const play=()=>{
    if(!isPlay && !isReset){
        playBtn.innerHTML='Pause'
        outerSquare.classList.add("animation-bg")

        //-HOUR-//
        hour = setInterval(() => {
            hours.innerHTML = `${hourCounter.toString().padStart(2, '0')} :`;
        }, 60 * 60 * 1000);

        //-MINUTE-//
        min = setInterval(() => {
            if (minCounter === 59) {
                minCounter = -1;
                hourCounter++;
            }
            minute.innerHTML = `${(++minCounter).toString().padStart(2, '0')} :`;
        }, 60 * 1000);

         //-SECOND-//
         sec = setInterval(() => {
            if (secCounter === 59) {
                secCounter = -1;
                if (minCounter === 59) {
                    minCounter = -1;
                    hourCounter++;
                }
                minCounter++;
            }
            second.innerHTML = `&nbsp;${(++secCounter).toString().padStart(2, '0')} :`;
        }, 1000);

         //-Msec-//
         centiSec = setInterval(() => {
            if (centiCounter === 99) {
                centiCounter = -1;
            }
            msecond.innerHTML = `&nbsp;${(++centiCounter).toString().padStart(2, '0')}`;
        }, 10);

        isPlay=true
        isReset=true
    }else{
        playBtn.innerHTML='Play'
        clearInterval(hour)
        clearInterval(min)
        clearInterval(sec)
        clearInterval(centiSec)
        isPlay=false
        isReset=false
        outerSquare.classList.remove("animation-bg")
    }
    toggleButton()
}


const reset=()=>{
    isReset=true;
        if (isPlay) {
        play();
    }
    hourCounter = minCounter = secCounter = centiCounter = 0;
    hours.innerHTML = '00 :';
    minute.innerHTML = '&nbsp;00 :';
    second.innerHTML = '&nbsp;00 :';
    msecond.innerHTML = '&nbsp;00';
    lapBtn.classList.add("hidden")
    resetBtn.classList.add("hidden")
}

const lap=()=>{
    const li=document.createElement("li")
    const timestamp=document.createElement("span")

    li.setAttribute("class","lap_item")
    timestamp.setAttribute("class","timestamp")

    timestamp.innerHTML=`${hourCounter.toString().padStart(2, '0')} : ${minCounter.toString().padStart(2, '0')} : ${secCounter.toString().padStart(2, '0')} : ${centiCounter.toString().padStart(2, '0')}`;

    li.append(timestamp)
    laps.append(li)

    clearBtn.classList.remove("hidden")
}

const clearAll=()=>{
    laps.innerHTML='';
    laps.append(clearBtn)
    clearBtn.classList.add("hidden")
    lap_item=0
}
playBtn.addEventListener("click",play)
resetBtn.addEventListener("click",reset)
lapBtn.addEventListener("click",lap)
clearBtn.addEventListener("click",clearAll)


