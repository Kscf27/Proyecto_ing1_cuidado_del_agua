document.addEventListener("DOMContentLoaded", function () {
    alert("¡Bienvenido! Aprende a ahorrar agua jugando y explorando.");

    const menuIcon = document.querySelector(".menu-icon");
    if (menuIcon) {
        menuIcon.addEventListener("click", toggleMenu);
    }

    const prevButton = document.querySelector(".prev");
    if (prevButton) {
        prevButton.addEventListener("click", () => moveSlide(-1));
    }

    const nextButton = document.querySelector(".next");
    if (nextButton) {
        nextButton.addEventListener("click", () => moveSlide(1));
    }

    const enlace = document.getElementById("miEnlace");
    if (enlace) {
        enlace.addEventListener("click", function(event) {
            event.preventDefault(); // Evita la redirección inmediata

            // Muestra el mensaje
            if (confirm("Esta a punto de iniciar el Quiz en Kahoot\nRecuerde que si no encuentra el juego\nEl PIN es: 009355358")) {
                // Redirige al usuario
                window.open(this.href, '_blank');
            } else {
                // El usuario canceló, no hace nada
                return false;
            }
        });
    }
});

function toggleMenu() {
    let menu = document.querySelector(".menu-list");
    if (menu) {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }
}

let currentIndex = 0;

function moveSlide(direction) {
    const videoContainer = document.querySelector(".video-container");
    const videoFrame = document.querySelector(".video-frame");
    if (videoContainer && videoFrame) {
        const totalVideos = videoContainer.querySelectorAll("iframe").length;
        const videoWidth = videoFrame.clientWidth;

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = totalVideos - 1;
        } else if (currentIndex >= totalVideos) {
            currentIndex = 0;
        }

        videoContainer.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
    }
}
