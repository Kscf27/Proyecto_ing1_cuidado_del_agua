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

// function mostrarAlerta(mensaje, url) {
//     alert(mensaje);
//     window.location.href = this.href;
    
// }

const enlace = document.getElementById("miEnlace");
    enlace.addEventListener("click", function(event) {
        event.preventDefault(); // Evita la redirección inmediata

        // Muestra el mensaje
        if (confirm("Esta a punto de iniciar el Quiz en Kahoot\nRecuerde que si no encuentra el juego\nEl PIN es: 009355358")) {
            // Redirige al usuario
            window.open (this.href,'_blank') ;
        } else {
            // El usuario canceló, no hace nada
            return false;
        }
    });