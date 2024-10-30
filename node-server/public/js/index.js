import * as Hexagram from './hexagram.js';
import * as Trigram from './trigram.js';
import { getReference } from './yijing.js';

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

let hexagramLineValues = [];
let hexagramKingWenNumbers = [];
let prefetch = [];

const addLine = value => {
    // check if hexagram length is 6, do nothing if so
    if (hexagramLineValues.length === 6) { return; }
    hexagramLineValues.push(value);
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
    prefetch = [];
    document.getElementById("hexagram-result").textContent = "";
    document.getElementById("buttonFlipper").textContent = "Flip Coins";
    document.getElementById("buttonFlipper").addEventListener("click", flipCoins);
    document.getElementById("buttonFlipper").removeEventListener("click", loadReading);
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
    if (hexagramLineValues.length === 6) {
        hexagramKingWenNumbers = Hexagram.getHexagramFromValues(hexagramLineValues);
        getReadingString(hexagramKingWenNumbers);
        document.getElementById("buttonFlipper").textContent = "Look up your hexagram";
        document.getElementById("buttonFlipper").removeEventListener('click', flipCoins);
        document.getElementById("buttonFlipper").addEventListener('click', loadReading);
        document.getElementById("hexagram-result").textContent = hexagramKingWenNumbers;
    }
}

function loadReading() {
    if (!prefetch || prefetch.length === 0) return;
    console.log(prefetch);
    document.getElementById("hexagram-result").innerHTML = prefetch;
}


async function getReadingString(hexagramsArray) {
    let result = await getReference(hexagramsArray)
    console.log(result);
    prefetch = result;
}

document.getElementById('buttonFlipper').addEventListener('click', flipCoins);
document.getElementById('buttonReset').addEventListener('click', resetReading);