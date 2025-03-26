document.addEventListener("DOMContentLoaded", function () {
    alert("¡Bienvenido! Aprende a ahorrar agua jugando y explorando.");
});

function toggleMenu() {
    let menu = document.querySelector(".menu-list");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

let currentIndex = 0;

function moveSlide(direction) {
    const videoContainer = document.querySelector(".video-container");
    const totalVideos = document.querySelectorAll(".video-container iframe").length;
    const videoWidth = document.querySelector(".video-frame").clientWidth;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalVideos - 1; // Si está en el primer video y presiona atrás, va al último
    } else if (currentIndex >= totalVideos) {
        currentIndex = 0; // Si está en el último video y presiona adelante, vuelve al primero
    }

    videoContainer.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
}