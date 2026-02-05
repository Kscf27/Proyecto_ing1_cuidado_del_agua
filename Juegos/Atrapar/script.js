const bucket = document.getElementById("bucket");
const gameContainer = document.querySelector(".game-container");
const scoreDisplay = document.getElementById("score");
const roundDisplay = document.getElementById("round");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");

let score = 0;
let round = 1;
let speed = 5;
let intervalId;
let roundTimer = 10;
let maxRounds = 5;
let isGameActive = true;

// Bucket movement
function moveBucket(direction) {
    if (!isGameActive) return;

    const containerWidth = gameContainer.offsetWidth;
    const bucketWidth = bucket.offsetWidth;
    // Get current left, default to 0 if NaN
    let currentLeft = parseFloat(window.getComputedStyle(bucket).left) || 0;

    const step = 40;

    if (direction === "left") {
        let newLeft = Math.max(0, currentLeft - step);
        bucket.style.left = newLeft + "px";
    } else if (direction === "right") {
        let newLeft = Math.min(containerWidth - bucketWidth, currentLeft + step);
        bucket.style.left = newLeft + "px";
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moveBucket("left");
    if (e.key === "ArrowRight") moveBucket("right");
});

// Touch controls
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

const addBtnListener = (btn, dir) => {
    if(!btn) return;

    // Handle both mouse and touch to ensure it works on all devices
    const handleMove = (e) => {
        if (e.cancelable) e.preventDefault(); // Prevent default behavior (like selection or scroll)
        moveBucket(dir);
    };

    btn.addEventListener("mousedown", handleMove);
    btn.addEventListener("touchstart", handleMove);
};

addBtnListener(btnLeft, "left");
addBtnListener(btnRight, "right");


function createDrop() {
    if (!isGameActive) return;

    let drop = document.createElement("div");
    // 70% clean, 30% dirty
    const isClean = Math.random() < 0.7;

    if (isClean) {
        drop.classList.add("drop", "clean");
    } else {
        drop.classList.add("drop", "dirty");
    }

    const containerWidth = gameContainer.offsetWidth;
    const dropWidth = 40; // Defined in CSS

    // Ensure drop stays fully inside the container width
    const maxLeft = containerWidth - dropWidth;
    drop.style.left = Math.random() * maxLeft + "px";

    gameContainer.appendChild(drop);

    let fall = setInterval(() => {
        // Safety check: if drop removed from DOM
        if (!document.body.contains(drop)) {
            clearInterval(fall);
            return;
        }

        if (!isGameActive) {
            clearInterval(fall);
            drop.remove();
            return;
        }

        let top = parseFloat(window.getComputedStyle(drop).top) || -40;
        drop.style.top = (top + speed) + "px";

        // Collision detection using bounding rects for accuracy
        const dropRect = drop.getBoundingClientRect();
        const bucketRect = bucket.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();

        // Check intersection
        if (
            dropRect.bottom >= bucketRect.top + 15 && // Allow a little overlap into the bucket top
            dropRect.top < bucketRect.bottom &&
            dropRect.right > bucketRect.left + 15 &&
            dropRect.left < bucketRect.right - 15
        ) {
            // Hit!
            if (drop.classList.contains("dirty")) {
                score--;
            } else {
                score++;
            }
            scoreDisplay.innerText = score;
            clearInterval(fall);
            drop.remove();

            if (score < 0) {
                endGame();
            }
        } else if (dropRect.top > containerRect.bottom) {
             // Missed/Out of bounds
            clearInterval(fall);
            drop.remove();
        }
    }, 20);
}

function startRound() {
    if (round > maxRounds) {
        endGame();
        return;
    }

    roundDisplay.innerText = round;
    let timer = roundTimer;
    timerDisplay.innerText = timer;
    speed = 4 + round; // Adjust speed scaling

    // Clear previous interval if any
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        if(isGameActive) createDrop();
    }, Math.max(300, 1000 - round * 150));

    let countdown = setInterval(() => {
        if (!isGameActive) {
            clearInterval(countdown);
            return;
        }
        timer--;
        timerDisplay.innerText = timer;
        if (timer <= 0) {
            clearInterval(intervalId);
            clearInterval(countdown);
            round++;
            setTimeout(startRound, 1000);
        }
    }, 1000);
}

function endGame() {
    isGameActive = false;
    if (intervalId) clearInterval(intervalId);
    gameOverScreen.classList.remove("hidden");
    finalScoreDisplay.innerText = score;
}

// Global function for the restart button in HTML
window.restartGame = function() {
    score = 0;
    round = 1;
    isGameActive = true;
    scoreDisplay.innerText = score;
    gameOverScreen.classList.add("hidden");
    document.querySelectorAll(".drop").forEach(d => d.remove());
    startRound();
};

// Initial Start
startRound();