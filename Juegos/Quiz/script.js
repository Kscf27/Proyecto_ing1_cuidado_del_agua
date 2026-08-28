/* ==========================================================================
   QUIZ ECO-GUARDIÁN AQUAMIND - LÓGICA INTERACTIVA & DIDÁCTICA
   ========================================================================== */

// 10 Preguntas Didácticas sobre el Cuidado y Ciclo del Agua
const QUIZ_QUESTIONS = [
    {
        category: "🚰 Ahorro en el Hogar",
        question: "¿Qué debes hacer con el grifo mientras te estás cepillando los dientes?",
        options: [
            "Dejarlo abierto para escuchar correr el agua",
            "Cerrarlo y abrirlo solo para enjuagarte la boca",
            "Abrirlo al máximo para que salga más agua"
        ],
        correct: 1,
        explanation: "¡Excelente! Cerrar la llave mientras te cepillas o enjabonas las manos puede ahorrar hasta 12 litros de agua por cada minuto."
    },
    {
        category: "🛁 Hábitos Diarios",
        question: "¿Cuánto tiempo debería durar una ducha rápida para cuidar el agua y la energía?",
        options: [
            "Alrededor de 5 minutos",
            "30 minutos cantando en la ducha",
            "1 hora o hasta que se enfríe el agua"
        ],
        correct: 0,
        explanation: "¡Muy bien! Una ducha de 5 minutos es refrescante y ahorra más de 100 litros de agua frente a llenar una tina."
    },
    {
        category: "🔧 Detección de Fugas",
        question: "Si ves una gotera en el grifo o inodoro de tu casa o colegio, ¿qué debes hacer?",
        options: [
            "Ignorarla porque solo son pequeñas gotitas",
            "Avisar de inmediato a un adulto o profesor para que la reparen",
            "Poner música fuerte para no escuchar el goteo"
        ],
        correct: 1,
        explanation: "¡Así se hace! Un grifo que gotea una sola gota por segundo puede desperdiciar más de 30 litros de agua potable cada día."
    },
    {
        category: "☁️ El Ciclo del Agua",
        question: "¿Cómo se llama cuando el sol calienta el agua de ríos y mares y sube en vapor al cielo?",
        options: [
            "Congelación o solidificación",
            "Evaporación",
            "Filtración subterránea"
        ],
        correct: 1,
        explanation: "¡Correcto! En la evaporación, el calor transforma el agua líquida en vapor invisible que luego forma las nubes de lluvia."
    },
    {
        category: "♻️ Reutilización",
        question: "¿Para qué podemos reutilizar el agua del segundo ciclo de lavado de la lavadora?",
        options: [
            "Para cocinar la sopa del almuerzo",
            "Para beber directamente cuando tengamos sed",
            "Para lavar los pisos, el patio o descargar el inodoro"
        ],
        correct: 2,
        explanation: "¡Gran elección! El agua de enjuague de la ropa es ideal para labores de aseo en casa, ahorrando decenas de litros por semana."
    },
    {
        category: "🌱 Cuidado de la Naturaleza",
        question: "¿Cuál es el mejor momento del día para regar las plantas del jardín?",
        options: [
            "Al mediodía cuando el sol está más fuerte",
            "Temprano en la mañana o al atardecer",
            "A las 2:00 de la tarde"
        ],
        correct: 1,
        explanation: "¡Exacto! Regar temprano o al atardecer evita que el sol evapore el agua rápidamente, permitiendo que las raíces la absorban mejor."
    },
    {
        category: "🌳 Bosques y Páramos",
        question: "¿Por qué los árboles y bosques son fundamentales para tener agua limpia?",
        options: [
            "Porque sus raíces retienen, filtran y recargan los manantiales de agua",
            "Porque consumen toda el agua y secan los ríos",
            "Porque pintan los ríos de color verde"
        ],
        correct: 0,
        explanation: "¡Maravilloso! Los árboles y plantas funcionan como esponjas naturales que mantienen los ríos vivos durante todo el año."
    },
    {
        category: "🚯 Protección de Ríos y Mares",
        question: "¿Qué debemos hacer con las basuras y plásticos para no contaminar el agua?",
        options: [
            "Tirarlos a la calle porque la lluvia se los lleva",
            "Arrojarlos por el inodoro o desagüe",
            "Clasificarlos en canecas y reciclarlos adecuadamente"
        ],
        correct: 2,
        explanation: "¡Perfecto! La basura arrojada a las calles o inodoros termina en las fuentes de agua, dañando a peces, aves y tortugas."
    },
    {
        category: "🌍 El Planeta Azul",
        question: "¿Qué porcentaje aproximado de la superficie del planeta Tierra está cubierto por agua?",
        options: [
            "Aproximadamente el 70%",
            "Solo el 10%",
            "El 100% de la Tierra"
        ],
        correct: 0,
        explanation: "¡Increíble! Cerca del 70% de la Tierra es agua, pero el 97% es salada. Solo una pequeña fracción es agua dulce para nosotros."
    },
    {
        category: "🦸‍♂️ Guardianes del Planeta",
        question: "¿Quiénes tienen el poder de ser héroes y heroínas del cuidado del agua?",
        options: [
            "Únicamente los científicos en laboratorios",
            "Solamente los alcaldes y presidentes",
            "¡Todos nosotros, incluyendo niños, niñas y familias!"
        ],
        correct: 2,
        explanation: "¡Totalmente cierto! Con pequeñas acciones diarias en tu casa y escuela, tú eres un auténtico guardián del agua para el futuro."
    }
];

// Estado del Quiz
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let correctCount = 0;
let answered = false;
let soundEnabled = true;

// Elementos del DOM
const screenWelcome = document.getElementById("screen-welcome");
const screenGame = document.getElementById("screen-game");
const screenResults = document.getElementById("screen-results");

const btnStartQuiz = document.getElementById("btn-start-quiz");
const btnSoundToggle = document.getElementById("btn-sound-toggle");
const btnNextQuestion = document.getElementById("btn-next-question");
const btnRestartQuiz = document.getElementById("btn-restart-quiz");

const questionCounter = document.getElementById("question-counter");
const currentScore = document.getElementById("current-score");
const currentStreak = document.getElementById("current-streak");
const progressBarFill = document.getElementById("progress-bar-fill");

const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const optionsGrid = document.getElementById("options-grid");

const feedbackCard = document.getElementById("feedback-card");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackExplanation = document.getElementById("feedback-explanation");

const resultsMedalIcon = document.getElementById("results-medal-icon");
const resultsTitle = document.getElementById("results-title");
const resultsStars = document.getElementById("results-stars");
const resultsCorrectCount = document.getElementById("results-correct-count");
const resultsFinalScore = document.getElementById("results-final-score");
const resultsBestScore = document.getElementById("results-best-score");
const resultsRankTitle = document.getElementById("results-rank-title");
const resultsRankDesc = document.getElementById("results-rank-desc");

/* ==========================================================================
   SISTEMA DE SONIDO (WEB AUDIO API)
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

function playQuizSound(type) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'correct') {
            // Chime alegre ascendente
            [523.25, 659.25, 783.99].forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
                subGain.gain.setValueAtTime(0.25, now + i * 0.08);
                subGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
                subOsc.start(now + i * 0.08);
                subOsc.stop(now + i * 0.08 + 0.2);
            });
        } else if (type === 'wrong') {
            // Boing grave
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.linearRampToValueAtTime(110, now + 0.25);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'victory') {
            // Fanfarria
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const subOsc = audioCtx.createOscillator();
                const subGain = audioCtx.createGain();
                subOsc.connect(subGain);
                subGain.connect(audioCtx.destination);
                subOsc.type = 'sine';
                subOsc.frequency.setValueAtTime(freq, now + i * 0.1);
                subGain.gain.setValueAtTime(0.3, now + i * 0.1);
                subGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.35);
                subOsc.start(now + i * 0.1);
                subOsc.stop(now + i * 0.1 + 0.35);
            });
        }
    } catch (e) {
        console.warn("Audio error:", e);
    }
}

/* ==========================================================================
   LÓGICA DEL JUEGO
   ========================================================================== */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    correctCount = 0;
    answered = false;

    screenWelcome.classList.remove("active");
    screenResults.classList.remove("active");
    screenGame.classList.add("active");

    updateStats();
    renderQuestion();
}

function renderQuestion() {
    answered = false;
    feedbackCard.classList.add("hidden");

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    questionCategory.textContent = q.category;
    questionText.textContent = q.question;

    questionCounter.textContent = `${currentQuestionIndex + 1} / ${QUIZ_QUESTIONS.length}`;
    const progressPct = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    progressBarFill.style.width = `${progressPct}%`;

    // Renderizar opciones
    optionsGrid.innerHTML = "";
    const letters = ["A", "B", "C"];

    q.options.forEach((optText, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span class="option-text">${optText}</span>
        `;
        btn.addEventListener("click", () => handleSelectOption(index, btn));
        optionsGrid.appendChild(btn);
    });
}

function handleSelectOption(selectedIndex, selectedBtn) {
    if (answered) return;
    answered = true;

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const optionButtons = optionsGrid.querySelectorAll(".option-btn");

    optionButtons.forEach(btn => btn.classList.add("disabled"));

    if (selectedIndex === q.correct) {
        // Respuesta Correcta
        selectedBtn.classList.add("correct");
        streak++;
        correctCount++;
        const pointsEarned = 100 + (streak * 20);
        score += pointsEarned;
        playQuizSound('correct');

        feedbackIcon.textContent = "🎉✨";
        feedbackTitle.textContent = `¡Correcto! (+${pointsEarned} pts)`;
        feedbackTitle.style.color = "#2E7D32";
        triggerConfetti(25);
    } else {
        // Respuesta Incorrecta
        selectedBtn.classList.add("wrong");
        streak = 0;
        playQuizSound('wrong');

        // Resaltar la respuesta correcta
        if (optionButtons[q.correct]) {
            optionButtons[q.correct].classList.add("correct");
        }

        feedbackIcon.textContent = "💡💧";
        feedbackTitle.textContent = "¡Casi lo logras!";
        feedbackTitle.style.color = "#C62828";
    }

    feedbackExplanation.textContent = q.explanation;
    feedbackCard.classList.remove("hidden");

    updateStats();

    // Si es la última pregunta, cambiar texto del botón
    if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
        btnNextQuestion.textContent = "Ver Resultados Finales 🏆";
    } else {
        btnNextQuestion.textContent = "Siguiente Pregunta ➔";
    }
}

function updateStats() {
    currentScore.textContent = score;
    currentStreak.textContent = `🔥 ${streak}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < QUIZ_QUESTIONS.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    screenGame.classList.remove("active");
    screenResults.classList.add("active");

    // Guardar récord
    const savedBest = parseInt(localStorage.getItem("aquamind_quiz_highscore") || "0", 10);
    let isNewRecord = false;
    if (score > savedBest) {
        localStorage.setItem("aquamind_quiz_highscore", score.toString());
        resultsBestScore.textContent = `${score} pts`;
        isNewRecord = true;
    } else {
        resultsBestScore.textContent = `${savedBest} pts`;
    }

    resultsCorrectCount.textContent = `${correctCount} / ${QUIZ_QUESTIONS.length}`;
    resultsFinalScore.textContent = `${score} pts`;

    // Asignar Estrellas y Rangos
    let stars = "⭐";
    let rankTitle = "💧 Aprendiz del Agua";
    let rankDesc = "¡Estás dando tus primeros pasos para proteger los ríos y manantiales!";
    let medal = "🥉";

    if (correctCount >= 9) {
        stars = "⭐⭐⭐";
        rankTitle = "👑 Gran Sabio del Agua";
        rankDesc = "¡Eres una eminencia ecológica! Conoces a la perfección el valor del agua y cómo inspirar a tu comunidad.";
        medal = "🏆";
        playQuizSound('victory');
        triggerConfetti(90);
    } else if (correctCount >= 6) {
        stars = "⭐⭐";
        rankTitle = "🛡️ Guardián Hídrico Avanzado";
        rankDesc = "¡Gran trabajo! Tienes hábitos geniales para cuidar el agua y cuidar nuestro planeta.";
        medal = "🥇";
        playQuizSound('victory');
        triggerConfetti(45);
    } else {
        stars = "⭐";
        medal = "🥈";
    }

    resultsStars.textContent = stars;
    resultsMedalIcon.textContent = medal;
    resultsRankTitle.textContent = rankTitle;
    resultsRankDesc.textContent = isNewRecord 
        ? `¡Felicidades! ¡Rompiste un nuevo récord personal! ${rankDesc}`
        : rankDesc;
}

/* ==========================================================================
   CONFETI EN CANVAS
   ========================================================================== */
function triggerConfetti(count = 40) {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#00E676", "#00BCD4", "#FFD700", "#FF4081", "#7C4DFF", "#29B6F6"];
    const particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2 + (Math.random() - 0.5) * 80,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 1.4) * 8,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            alpha: 1
        });
    }

    let animId = null;
    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let hasActive = false;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.22;
            p.rotation += p.rotationSpeed;
            p.alpha -= 0.014;

            if (p.alpha > 0) {
                hasActive = true;
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        if (hasActive) {
            animId = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animId);
        }
    };

    render();
}

/* ==========================================================================
   EVENTOS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    btnStartQuiz.addEventListener("click", () => {
        initAudio();
        startQuiz();
    });

    btnNextQuestion.addEventListener("click", nextQuestion);
    btnRestartQuiz.addEventListener("click", startQuiz);

    btnSoundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        btnSoundToggle.textContent = soundEnabled ? "🔊" : "🔇";
    });
});
