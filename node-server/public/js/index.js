import * as Hexagram from './hexagram.js';
import * as Trigram from './trigram.js';

// watch for light / dark mode changes
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// hide that logo if we scroll down.
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        document.getElementById("header").classList.add("hide-on-scroll");
    } else {
        document.getElementById("header").classList.remove("hide-on-scroll");
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

let hexagramLineValues = []
const addLine = value => {
    // check if hexagram length is 6, do nothing if so
    if (hexagramLineValues.length === 6) {
        // eventually, we want this to initiate the hexagram lookup
        return;
    }
    hexagramLineValues.push(value);
}
function hexagramLookup() {

}

const lineClasses = {
    6: "hexagram-line-yin-moving",
    7: "hexagram-line-yang",
    8: "hexagram-line-yin",
    9: "hexagram-line-yang-moving"
}

const getClass = value => lineClasses[value] ?? "hexagram-line-faded";
let hexagramMoving = false;

function reclassLines() {
    let lineNumber = hexagramLineValues.length;
    const line = document.getElementById("line" + lineNumber);
    let newClass = getClass(hexagramLineValues[lineNumber - 1]);
    line.classList.remove(getClass(0));
    line.classList.add(newClass);
}

function resetReading() {
    const coinElements = [document.getElementById("coin1"), document.getElementById("coin2"), document.getElementById("coin3")];
    coinElements.forEach(coin => {
        coin.src = "images/coinBlended.jpg";
    });
    document.getElementById("result").textContent = "";
    // iterate through hexagramLineValues, remove classes from lines 1-6, adding getClass(0) to each line
    hexagramLineValues.forEach((value, index) => {
        const line = document.getElementById("line" + (index + 1));
        line.classList.remove(getClass(value));
        line.classList.add(getClass(0));
    });
    hexagramLineValues = [];
    hexagramMoving = false;
    document.getElementById("buttonFlipper").textContent = "Flip Coins";
    document.getElementById("buttonFlipper").addEventListener("click", flipCoins);
    document.getElementById("buttonFlipper").removeEventListener("click", hexagramLookup);
}


function flipCoins() {
    const coinElements = [document.getElementById("coin1"), document.getElementById("coin2"), document.getElementById("coin3")];
    const coinImages = {
        heads: "images/coinHeads.jpg",
        tails: "images/coinTails.jpg"
    };
    let headsCount = 0, tailsCount = 0;

    coinElements.forEach(coin => {
        const isHeads = Math.random() < 0.5;
        coin.src = isHeads ? coinImages.heads : coinImages.tails;
        isHeads ? headsCount++ : tailsCount++;
    });
    const result = (headsCount * 3) + (tailsCount * 2);
    addLine(result);
    if (result === 6 || result === 9) { hexagramMoving = true; }
    reclassLines()
    document.getElementById("result").textContent = result;
    console.log(hexagramLineValues);
    if (hexagramLineValues.length === 6) {
        document.getElementById("buttonFlipper").textContent = "Look up your hexagram";
        document.getElementById("buttonFlipper").removeEventListener('click', flipCoins);
        document.getElementById("buttonFlipper").addEventListener('click', hexagramLookup);
    }
}

document.getElementById('buttonFlipper').addEventListener('click', flipCoins);
document.getElementById('buttonReset').addEventListener('click', resetReading);