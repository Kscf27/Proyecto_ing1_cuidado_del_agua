let bucket = document.getElementById("bucket");
let score = 0;
let round = 1;
let speed = 8;
let intervalId;
let roundTimer = 10;
let maxRounds = 5;

document.addEventListener("keydown", (e) => {
    let left = parseInt(window.getComputedStyle(bucket).left);
    if (e.key === "ArrowLeft" && left > 0) {
        bucket.style.left = left - 40 + "px";
    } else if (e.key === "ArrowRight" && left < window.innerWidth - 80) {
        bucket.style.left = left + 40 + "px";
    }
});

// function createDrop() {
//     let drop = document.createElement("div");
//     drop.classList.add("drop");
//     drop.style.left = Math.random() * (window.innerWidth - 20) + "px";
//     document.querySelector(".game-container").appendChild(drop);

//     let fall = setInterval(() => {
//         let top = parseInt(window.getComputedStyle(drop).top || 0);
//         drop.style.top = top + speed + "px";

//         let dropLeft = drop.offsetLeft;
//         let dropTop = drop.offsetTop;
//         let bucketLeft = bucket.offsetLeft;
//         let bucketTop = bucket.offsetTop;

//         if (
//             dropTop + 20 >= bucketTop &&
//             dropLeft > bucketLeft &&
//             dropLeft < bucketLeft + 80
//         ) {
//             score++;
//             document.getElementById("score").innerText = score;
//             clearInterval(fall);
//             drop.remove();
//         } else if (dropTop > window.innerHeight) {
//             clearInterval(fall);
//             drop.remove();
//         }
//     }, 20);
// }
function createDrop() {
    let drop = document.createElement("div");

    // Aleatoriamente asignar si es limpia o sucia (70% limpia, 30% sucia)
    if (Math.random() < 0.7) {
        drop.classList.add("drop", "clean");
    } else {
        drop.classList.add("drop", "dirty");
    }

    drop.style.left = Math.random() * (window.innerWidth - 20) + "px";
    document.querySelector(".game-container").appendChild(drop);

    let fall = setInterval(() => {
        let top = parseInt(window.getComputedStyle(drop).top || 0);
        drop.style.top = top + speed + "px";

        let dropLeft = drop.offsetLeft;
        let dropTop = drop.offsetTop;
        let bucketLeft = bucket.offsetLeft;
        let bucketTop = bucket.offsetTop;

        if (
            dropTop + 20 >= bucketTop &&
            dropLeft > bucketLeft &&
            dropLeft < bucketLeft + 80
        ) {
            if (drop.classList.contains("dirty")) {
                score--; // Resta puntos
            } else {
                score++; // Suma puntos
            }

            document.getElementById("score").innerText = score;

            clearInterval(fall);
            drop.remove();

            if (score < 0) {
                endGame();
            }

        } else if (dropTop > window.innerHeight) {
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

    document.getElementById("round").innerText = round;
    let timer = roundTimer;
    document.getElementById("timer").innerText = timer;
    speed = 8 + round;

    intervalId = setInterval(() => {
        createDrop();
    }, 750 - round * 100);

    let countdown = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            clearInterval(intervalId);
            clearInterval(countdown);
            round++;
            setTimeout(startRound, 1000);
        }
    }, 1000);
}

function endGame() {
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
}

function restartGame() {
    score = 0;
    round = 1;
    document.getElementById("score").innerText = score;
    document.getElementById("game-over").classList.add("hidden");
    document.querySelectorAll(".drop").forEach(d => d.remove());
    startRound();
}

startRound();