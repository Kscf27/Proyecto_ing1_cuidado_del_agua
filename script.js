document.addEventListener("DOMContentLoaded", function () {
    // Inicializar Menú Móvil
    setupMobileMenu();

    // Inicializar Carrusel de Videos
    setupVideoSlider();
});

/* ==========================================================================
   MENÚ RESPONSIVE
   ========================================================================== */
function setupMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const menuList = document.getElementById("menuList");

    if (!menuToggle || !menuList) return;

    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        menuList.classList.toggle("show");
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", function (e) {
        if (!menuList.contains(e.target) && !menuToggle.contains(e.target)) {
            menuList.classList.remove("show");
        }
    });

    // Cerrar menú al hacer clic en cualquier enlace
    menuList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuList.classList.remove("show");
        });
    });
}

/* ==========================================================================
   CARRUSEL DE VIDEOS
   ========================================================================== */
let currentIndex = 0;

function setupVideoSlider() {
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const videoContainer = document.getElementById("videoContainer");
    const dotsContainer = document.getElementById("sliderDots");
    const titleDisplay = document.getElementById("currentVideoTitle");

    if (!videoContainer) return;

    const slides = videoContainer.querySelectorAll(".video-slide");
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Crear puntos indicadores (dots)
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.setAttribute("role", "button");
            dot.setAttribute("aria-label", `Ir al video ${i + 1}`);
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    const btnYtDirect = document.getElementById("btnYtDirect");

    function updateSlider() {
        // Desplazamiento por porcentaje (100% responsivo)
        videoContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar título y enlace a YouTube
        if (slides[currentIndex]) {
            const title = slides[currentIndex].getAttribute("data-title") || `Video ${currentIndex + 1}`;
            const url = slides[currentIndex].getAttribute("data-url") || "https://www.youtube.com";
            if (titleDisplay) titleDisplay.textContent = title;
            if (btnYtDirect) btnYtDirect.href = url;
        }

        // Actualizar dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach((dot, idx) => {
                dot.classList.toggle("active", idx === currentIndex);
            });
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        updateSlider();
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    // Soporte táctil para deslizar (swipe) en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    videoContainer.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    videoContainer.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
            if (diff > 0) {
                goToSlide(currentIndex + 1); // Swipe izquierda -> siguiente
            } else {
                goToSlide(currentIndex - 1); // Swipe derecha -> anterior
            }
        }
    }, { passive: true });

    // Inicializar estado
    updateSlider();
}

/* ==========================================================================
   CARGADOR DINÁMICO DE VIDEOS (LITE EMBED RESILIENTE)
   ========================================================================== */
window.loadActiveVideo = function(cardElement, videoId) {
    // Si se ejecuta desde un archivo local (file://), YouTube bloquea los iframes con Error 153 (sin Origin).
    // Abrimos directamente el video en YouTube en una nueva pestaña.
    if (window.location.protocol === 'file:') {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        return;
    }

    // En servidor web (http/https), creamos el iframe optimizado
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = "Video Educativo AquaMind";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    cardElement.innerHTML = "";
    cardElement.appendChild(iframe);
};



