/* ==========================================================================
   ¡ATRAPA LAS GOTAS! - MOTOR DE JUEGO MODERNO & LÚDICO
   ========================================================================== */

// Elementos del DOM
const bucket = document.getElementById("bucket");
const gameContainer = document.getElementById("game-container");
const fxLayer = document.getElementById("fx-layer");
const scoreDisplay = document.getElementById("score");
const levelNameDisplay = document.getElementById("level-name");
const timerDisplay = document.getElementById("timer");
const timeProgressBar = document.getElementById("time-progress-bar");
const livesContainer = document.getElementById("lives-container");

// Modales / Overlays
const startOverlay = document.getElementById("start-overlay");
const pauseOverlay = document.getElementById("pause-overlay");
const roundOverlay = document.getElementById("round-overlay");
const gameOverScreen = document.getElementById("game-over");

const roundTitle = document.getElementById("round-title");
const roundTipText = document.getElementById("round-tip-text");
const finalScoreDisplay = document.getElementById("final-score");
const bestScoreDisplay = document.getElementById("best-score");
const starsRatingDisplay = document.getElementById("stars-rating");
const gameOverTitle = document.getElementById("game-over-title");
const gameOverMessage = document.getElementById("game-over-message");
const gameOverIcon = document.getElementById("game-over-icon");

// Botones
const btnStartGame = document.getElementById("btn-start-game");
const btnResumeGame = document.getElementById("btn-resume-game");
const btnNextRound = document.getElementById("btn-next-round");
const btnRestart = document.getElementById("btn-restart");
const btnSound = document.getElementById("btn-sound");
const btnPause = document.getElementById("btn-pause");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

// Configuración de Niveles / Ecosistemas
const LEVELS = [
    {
        name: "🌊 El Manantial",
        duration: 15,
        dropInterval: 800,
        speed: 4.5,
        cleanProb: 0.70,
        ecoProb: 0.15,
        goldProb: 0.05,
        freezeProb: 0.05,
        dirtyProb: 0.05,
        tip: "Cerrar la llave mientras te cepillas los dientes ahorra hasta 12 litros por minuto."
    },
    {
        name: "🏞️ Río Cristalino",
        duration: 18,
        dropInterval: 700,
        speed: 5.5,
        cleanProb: 0.60,
        ecoProb: 0.15,
        goldProb: 0.08,
        freezeProb: 0.07,
        dirtyProb: 0.10,
        tip: "Una ducha rápida de 5 minutos ahorra más de 100 litros de agua en comparación con una tina."
    },
    {
        name: "🌲 Bosque de Niebla",
        duration: 20,
        dropInterval: 600,
        speed: 6.5,
        cleanProb: 0.55,
        ecoProb: 0.15,
        goldProb: 0.10,
        freezeProb: 0.08,
        dirtyProb: 0.12,
        tip: "Los árboles y plantas ayudan a purificar el agua de lluvia y recargar los manantiales subterráneos."
    },
    {
        name: "🏙️ Ciudad Sostenible",
        duration: 22,
        dropInterval: 520,
        speed: 7.5,
        cleanProb: 0.50,
        ecoProb: 0.15,
        goldProb: 0.10,
        freezeProb: 0.10,
        dirtyProb: 0.15,
        tip: "Reutilizar el agua de la lavadora para limpiar pisos o el inodoro ahorra cientos de litros por semana."
    },
    {
        name: "🐋 Océano Azul",
        duration: 25,
        dropInterval: 450,
        speed: 8.5,
        cleanProb: 0.45,
        ecoProb: 0.18,
        goldProb: 0.12,
        freezeProb: 0.10,
        dirtyProb: 0.15,
        tip: "¡Fantástico! Proteger ríos y mares mantiene sanos a miles de animales marinos en todo el planeta."
    }
];

// Estado del Juego
let score = 0;
let currentRound = 1;
let lives = 3;
let timer = 15;
let maxRoundTime = 15;
let isGameActive = false;
let isPaused = false;
let soundEnabled = true;

let gameLoopId = null;
let spawnIntervalId = null;
let timerIntervalId = null;
let activeDrops = [];

// Posición y Velocidad de la Cubeta
let bucketX = 0;
let bucketTargetX = 0;
let keyLeftPressed = false;
let keyRightPressed = false;
const KEY_SPEED = 9; // Velocidad con teclado continuo

/* ==========================================================================
   SISTEMA DE AUDIO INTEGRADO (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'clean') {
            // Sonido de gota de agua "plop"
            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'eco') {
            // Burbuja eco "ding"
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(587, now); // D5
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'gold') {
            // Arpegio dorado mágico
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'sine';
                subOsc.frequency.setValueAtTime(freq, now + i * 0.05);
                subGain.gain.setValueAtTime(0.25, now + i * 0.05);
                subGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.15);
                subOsc.start(now + i * 0.05);
                subOsc.stop(now + i * 0.05 + 0.15);
            });
        } else if (type === 'time') {
            // Campana de tiempo
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1000, now);
            osc.frequency.setValueAtTime(1200, now + 0.08);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
            osc.start(now);
            osc.stop(now + 0.22);
        } else if (type === 'dirty') {
            // Buzzer / Salpicadura sucia
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(80, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'win') {
            // Fanfarria de victoria
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(freq, now + i * 0.1);
                subGain.gain.setValueAtTime(0.3, now + i * 0.1);
                subGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.35);
                subOsc.start(now + i * 0.1);
                subOsc.stop(now + i * 0.1 + 0.35);
            });
        } else if (type === 'gameover') {
            // Fin de juego
            [350, 300, 250, 200].forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'sawtooth';
                subOsc.frequency.setValueAtTime(freq, now + i * 0.15);
                subGain.gain.setValueAtTime(0.2, now + i * 0.15);
                subGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.25);
                subOsc.start(now + i * 0.15);
                subOsc.stop(now + i * 0.15 + 0.25);
            });
        }
    } catch (e) {
        console.warn("Audio Context error:", e);
    }
}

/* ==========================================================================
   CONTROLES MULTIMODALES (MOUSE, TOUCH DRAG, TECLADO, BOTONES EN PANTALLA)
   ========================================================================== */
function setupControls() {
    // 1. Mouse & Touch Drag directo en el contenedor del juego
    const handlePointerMove = (clientX) => {
        if (!isGameActive || isPaused) return;
        const rect = gameContainer.getBoundingClientRect();
        const bucketWidth = bucket.offsetWidth || 84;
        let newX = clientX - rect.left - (bucketWidth / 2);
        
        // Limitar dentro del contenedor
        const maxX = gameContainer.clientWidth - bucketWidth;
        bucketTargetX = Math.max(0, Math.min(maxX, newX));
    };

    gameContainer.addEventListener("mousemove", (e) => {
        handlePointerMove(e.clientX);
    });

    gameContainer.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX);
        }
    }, { passive: true });

    gameContainer.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX);
        }
    }, { passive: true });

    // 2. Teclado continuo con ArrowLeft / ArrowRight / A / D
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
            keyLeftPressed = true;
        } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
            keyRightPressed = true;
        } else if (e.key === "p" || e.key === "Escape") {
            togglePause();
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
            keyLeftPressed = false;
        } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
            keyRightPressed = false;
        }
    });

    // 3. Botones en pantalla (soporta mantener pulsado continuamente)
    const attachContinuousBtn = (btn, isLeft) => {
        if (!btn) return;
        const startMove = (e) => {
            if (e.cancelable) e.preventDefault();
            if (isLeft) keyLeftPressed = true;
            else keyRightPressed = true;
        };
        const endMove = (e) => {
            if (e.cancelable) e.preventDefault();
            if (isLeft) keyLeftPressed = false;
            else keyRightPressed = false;
        };

        btn.addEventListener("pointerdown", startMove);
        btn.addEventListener("pointerup", endMove);
        btn.addEventListener("pointerleave", endMove);
        btn.addEventListener("pointercancel", endMove);
    };

    attachContinuousBtn(btnLeft, true);
    attachContinuousBtn(btnRight, false);

    // Centrar la cubeta inicialmente
    centerBucket();
}

function centerBucket() {
    const containerWidth = gameContainer.clientWidth || 350;
    const bucketWidth = bucket.offsetWidth || 84;
    bucketX = (containerWidth - bucketWidth) / 2;
    bucketTargetX = bucketX;
    bucket.style.left = `${bucketX}px`;
}

/* ==========================================================================
   BUCLE PRINCIPAL DEL JUEGO (REQUEST ANIMATION FRAME)
   ========================================================================== */
function gameLoop() {
    if (isGameActive && !isPaused) {
        updateBucketPosition();
        updateDrops();
    }
    gameLoopId = requestAnimationFrame(gameLoop);
}

function updateBucketPosition() {
    const bucketWidth = bucket.offsetWidth || 84;
    const maxX = gameContainer.clientWidth - bucketWidth;

    // Procesar teclado / botones virtuales
    if (keyLeftPressed) {
        bucketTargetX = Math.max(0, bucketTargetX - KEY_SPEED);
    }
    if (keyRightPressed) {
        bucketTargetX = Math.min(maxX, bucketTargetX + KEY_SPEED);
    }

    // Interpolación suave (LERP) hacia targetX
    bucketX += (bucketTargetX - bucketX) * 0.45;
    bucketX = Math.max(0, Math.min(maxX, bucketX));
    bucket.style.left = `${bucketX}px`;
}

/* ==========================================================================
   SISTEMA DE GOTAS Y COLISIONES
   ========================================================================== */
function spawnDrop() {
    if (!isGameActive || isPaused) return;

    const levelCfg = LEVELS[currentRound - 1] || LEVELS[0];
    const rand = Math.random();
    let type = 'clean';

    if (rand < levelCfg.cleanProb) {
        type = 'clean';
    } else if (rand < levelCfg.cleanProb + levelCfg.ecoProb) {
        type = 'eco';
    } else if (rand < levelCfg.cleanProb + levelCfg.ecoProb + levelCfg.goldProb) {
        type = 'gold';
    } else if (rand < levelCfg.cleanProb + levelCfg.ecoProb + levelCfg.goldProb + levelCfg.freezeProb) {
        type = 'freeze';
    } else {
        type = 'dirty';
    }

    const dropEl = document.createElement("div");
    dropEl.classList.add("drop", type);

    if (type === 'eco') dropEl.innerHTML = '🧼';
    else if (type === 'gold') dropEl.innerHTML = '🌟';
    else if (type === 'freeze') dropEl.innerHTML = '⏱️';

    const dropWidth = 44;
    const maxX = (gameContainer.clientWidth || 350) - dropWidth;
    const posX = Math.floor(Math.random() * Math.max(10, maxX));

    dropEl.style.left = `${posX}px`;
    dropEl.style.top = `-50px`;

    gameContainer.appendChild(dropEl);

    activeDrops.push({
        el: dropEl,
        type: type,
        x: posX,
        y: -50,
        speed: levelCfg.speed * (0.9 + Math.random() * 0.3)
    });
}

function updateDrops() {
    const bucketRect = bucket.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    for (let i = activeDrops.length - 1; i >= 0; i--) {
        const drop = activeDrops[i];
        drop.y += drop.speed;
        drop.el.style.top = `${drop.y}px`;

        const dropRect = drop.el.getBoundingClientRect();

        // Comprobar Colisión con la Cubeta
        if (
            dropRect.bottom >= bucketRect.top + 10 &&
            dropRect.top <= bucketRect.bottom - 10 &&
            dropRect.right >= bucketRect.left + 15 &&
            dropRect.left <= bucketRect.right - 15
        ) {
            handleCatch(drop, dropRect);
            drop.el.remove();
            activeDrops.splice(i, 1);
            continue;
        }

        // Si la gota cae fuera de la pantalla
        if (dropRect.top > containerRect.bottom) {
            drop.el.remove();
            activeDrops.splice(i, 1);
        }
    }
}

function handleCatch(drop, dropRect) {
    const containerRect = gameContainer.getBoundingClientRect();
    const popupX = dropRect.left - containerRect.left + 10;
    const popupY = dropRect.top - containerRect.top;

    // Animación de bote en la cubeta
    bucket.classList.remove("catch-bounce");
    void bucket.offsetWidth; // Trigger reflow
    bucket.classList.add("catch-bounce");

    if (drop.type === 'clean') {
        score += 10;
        playSound('clean');
        createScorePopup("+10", popupX, popupY, 'plus');
        createWaterSplash(popupX, popupY, '#29B6F6');
    } else if (drop.type === 'eco') {
        score += 25;
        playSound('eco');
        createScorePopup("+25", popupX, popupY, 'plus');
        createWaterSplash(popupX, popupY, '#00E676');
    } else if (drop.type === 'gold') {
        score += 50;
        playSound('gold');
        createScorePopup("+50 🌟", popupX, popupY, 'gold');
        createWaterSplash(popupX, popupY, '#FFD700');
    } else if (drop.type === 'freeze') {
        timer = Math.min(timer + 5, maxRoundTime + 10);
        timerDisplay.textContent = timer;
        playSound('time');
        createScorePopup("+5s ⏱️", popupX, popupY, 'time');
        createWaterSplash(popupX, popupY, '#00B0FF');
    } else if (drop.type === 'dirty') {
        score = Math.max(0, score - 15);
        lives--;
        playSound('dirty');
        createScorePopup("-15 💔", popupX, popupY, 'minus');
        createWaterSplash(popupX, popupY, '#5D4037');
        updateLivesDisplay();

        // Temblor de pantalla
        gameContainer.style.animation = 'none';
        void gameContainer.offsetWidth;
        gameContainer.style.animation = 'shake 0.3s ease';

        if (lives <= 0) {
            endGame(false);
            return;
        }
    }

    scoreDisplay.textContent = score;
}

function updateLivesDisplay() {
    const hearts = livesContainer.querySelectorAll(".heart");
    hearts.forEach((heart, idx) => {
        if (idx >= lives) {
            heart.classList.add("lost");
        } else {
            heart.classList.remove("lost");
        }
    });
}

function createScorePopup(text, x, y, typeClass) {
    const popup = document.createElement("div");
    popup.classList.add("score-popup", typeClass);
    popup.textContent = text;
    popup.style.left = `${Math.max(10, Math.min(gameContainer.clientWidth - 70, x))}px`;
    popup.style.top = `${y}px`;
    fxLayer.appendChild(popup);

    setTimeout(() => popup.remove(), 800);
}

function createWaterSplash(x, y, color) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement("div");
        particle.classList.add("water-splash-particle");
        particle.style.background = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = (Math.PI * 2 / 6) * i + (Math.random() * 0.4);
        const distance = 25 + Math.random() * 20;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 10;

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        fxLayer.appendChild(particle);

        setTimeout(() => particle.remove(), 450);
    }
}

/* ==========================================================================
   FLUJO DE RONDAS Y NIVELES
   ========================================================================== */
function startRound(roundNum) {
    currentRound = roundNum;
    const levelCfg = LEVELS[currentRound - 1];

    if (!levelCfg) {
        endGame(true); // Victoria total si pasa todos los niveles
        return;
    }

    isGameActive = true;
    isPaused = false;
    levelNameDisplay.textContent = levelCfg.name;
    timer = levelCfg.duration;
    maxRoundTime = levelCfg.duration;
    timerDisplay.textContent = timer;
    timeProgressBar.style.width = "100%";

    // Limpiar gotas anteriores
    clearActiveDrops();

    // Iniciar generador de gotas
    if (spawnIntervalId) clearInterval(spawnIntervalId);
    spawnIntervalId = setInterval(spawnDrop, levelCfg.dropInterval);

    // Iniciar temporizador
    if (timerIntervalId) clearInterval(timerIntervalId);
    timerIntervalId = setInterval(() => {
        if (!isGameActive || isPaused) return;

        timer--;
        timerDisplay.textContent = timer;
        const pct = Math.max(0, (timer / maxRoundTime) * 100);
        timeProgressBar.style.width = `${pct}%`;

        if (timer <= 0) {
            finishRound();
        }
    }, 1000);
}

function finishRound() {
    isGameActive = false;
    if (spawnIntervalId) clearInterval(spawnIntervalId);
    if (timerIntervalId) clearInterval(timerIntervalId);
    clearActiveDrops();

    if (currentRound >= LEVELS.length) {
        // Victoria del juego completo
        endGame(true);
    } else {
        // Mostrar modal de ronda superada
        playSound('win');
        triggerConfetti(30);
        const currentCfg = LEVELS[currentRound - 1];
        roundTitle.textContent = `¡Nivel ${currentRound} Superado! 🎉`;
        roundTipText.textContent = currentCfg.tip;
        roundOverlay.classList.remove("hidden");
    }
}

function clearActiveDrops() {
    activeDrops.forEach(d => d.el.remove());
    activeDrops = [];
}

/* ==========================================================================
   FIN DEL JUEGO / VICTORIA
   ========================================================================== */
function endGame(isVictory) {
    isGameActive = false;
    if (spawnIntervalId) clearInterval(spawnIntervalId);
    if (timerIntervalId) clearInterval(timerIntervalId);
    clearActiveDrops();

    // Obtener y guardar High Score
    const savedHighScore = parseInt(localStorage.getItem("aquakids_catch_highscore") || "0", 10);
    let isNewRecord = false;
    if (score > savedHighScore) {
        localStorage.setItem("aquakids_catch_highscore", score.toString());
        bestScoreDisplay.textContent = score;
        isNewRecord = true;
    } else {
        bestScoreDisplay.textContent = savedHighScore;
    }

    finalScoreDisplay.textContent = score;

    // Calcular estrellas
    let stars = "⭐";
    if (score >= 250) stars = "⭐⭐⭐";
    else if (score >= 120) stars = "⭐⭐";
    starsRatingDisplay.textContent = stars;

    if (isVictory) {
        playSound('win');
        triggerConfetti(100);
        gameOverIcon.textContent = "🏆👑";
        gameOverTitle.textContent = "¡Eres un Eco-Guardián Legendario!";
        gameOverMessage.textContent = isNewRecord 
            ? "¡Increíble! ¡Rompiste un nuevo récord personal de ahorro de agua!" 
            : "¡Completaste todos los ecosistemas y salvaste millones de gotas!";
    } else {
        playSound('gameover');
        gameOverIcon.textContent = "💧💪";
        gameOverTitle.textContent = "¡Buen Intento Pequeño Héroe!";
        gameOverMessage.textContent = "La contaminación dañó el agua, ¡pero puedes intentarlo de nuevo para proteger el manantial!";
    }

    gameOverScreen.classList.remove("hidden");
}

function restartGame() {
    score = 0;
    currentRound = 1;
    lives = 3;
    scoreDisplay.textContent = score;
    updateLivesDisplay();

    gameOverScreen.classList.add("hidden");
    roundOverlay.classList.add("hidden");
    pauseOverlay.classList.add("hidden");
    startOverlay.classList.add("hidden");

    centerBucket();
    startRound(1);
}

/* ==========================================================================
   PAUSA & HERRAMIENTAS
   ========================================================================== */
function togglePause() {
    if (!isGameActive && !isPaused) return;

    isPaused = !isPaused;
    if (isPaused) {
        pauseOverlay.classList.remove("hidden");
        btnPause.textContent = "▶️";
    } else {
        pauseOverlay.classList.add("hidden");
        btnPause.textContent = "⏸️";
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    btnSound.textContent = soundEnabled ? "🔊" : "🔇";
    localStorage.setItem("aquakids_sound", soundEnabled ? "on" : "off");
}

/* ==========================================================================
   SISTEMA DE CONFETI EN CANVAS
   ========================================================================== */
function triggerConfetti(particleCount = 50) {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#00E676", "#00BCD4", "#FFD700", "#FF4081", "#7C4DFF", "#29B6F6"];
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 1.5) * 10,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            alpha: 1
        });
    }

    let confettiAnimation = null;
    const renderConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25; // Gravedad
            p.rotation += p.rotationSpeed;
            p.alpha -= 0.012;

            if (p.alpha > 0) {
                active = true;
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        if (active) {
            confettiAnimation = requestAnimationFrame(renderConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(confettiAnimation);
        }
    };

    renderConfetti();
}

/* ==========================================================================
   INICIALIZACIÓN DE EVENTOS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Configuración inicial de sonido
    const savedSound = localStorage.getItem("aquakids_sound");
    if (savedSound === "off") {
        soundEnabled = false;
        btnSound.textContent = "🔇";
    }

    // Configurar controles
    setupControls();

    // Botones de juego
    if (btnStartGame) {
        btnStartGame.addEventListener("click", () => {
            initAudio();
            startOverlay.classList.add("hidden");
            restartGame();
        });
    }

    if (btnResumeGame) btnResumeGame.addEventListener("click", togglePause);
    if (btnPause) btnPause.addEventListener("click", togglePause);
    if (btnSound) btnSound.addEventListener("click", toggleSound);

    if (btnNextRound) {
        btnNextRound.addEventListener("click", () => {
            roundOverlay.classList.add("hidden");
            startRound(currentRound + 1);
        });
    }

    if (btnRestart) btnRestart.addEventListener("click", restartGame);

    // Iniciar bucle de animación
    requestAnimationFrame(gameLoop);

    // Ajustar si la ventana cambia de tamaño
    window.addEventListener("resize", () => {
        centerBucket();
    });
});