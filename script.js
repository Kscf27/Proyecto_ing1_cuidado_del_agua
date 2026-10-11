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

    function toggleMenu(open) {
        const isOpen = typeof open === 'boolean' ? open : !menuList.classList.contains("show");
        menuList.classList.toggle("show", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    }

    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Cerrar al pulsar Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menuList.classList.contains("show")) {
            toggleMenu(false);
            menuToggle.focus();
        }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", function (e) {
        if (!menuList.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Cerrar menú al hacer clic en cualquier enlace
    menuList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            toggleMenu(false);
        });
    });
}

/* ==========================================================================
   CARRUSEL DE VIDEOS CON ACCESIBILIDAD TOTAL
   ========================================================================== */
let currentIndex = 0;

function setupVideoSlider() {
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const videoContainer = document.getElementById("videoContainer");
    const dotsContainer = document.getElementById("sliderDots");
    const titleDisplay = document.getElementById("currentVideoTitle");
    const btnYtDirect = document.getElementById("btnYtDirect");

    if (!videoContainer) return;

    const slides = videoContainer.querySelectorAll(".video-slide");
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Crear botones indicadores (dots semánticos tipo <button>)
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.setAttribute("aria-label", `Ir al video ${i + 1} de ${totalSlides}`);
            dot.setAttribute("aria-current", i === 0 ? "true" : "false");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        // Desplazamiento responsivo
        videoContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar título y enlace a YouTube
        if (slides[currentIndex]) {
            const title = slides[currentIndex].getAttribute("data-title") || `Video ${currentIndex + 1}`;
            const url = slides[currentIndex].getAttribute("data-url") || "https://www.youtube.com";
            if (titleDisplay) titleDisplay.textContent = title;
            if (btnYtDirect) {
                btnYtDirect.href = url;
                btnYtDirect.setAttribute("aria-label", `Abrir ${title} en YouTube (se abre en nueva pestaña)`);
            }
        }

        // Actualizar dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach((dot, idx) => {
                const isActive = idx === currentIndex;
                dot.classList.toggle("active", isActive);
                dot.setAttribute("aria-current", isActive ? "true" : "false");
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

    // Navegación por teclado para el carrusel (Flechas Izquierda / Derecha)
    videoContainer.parentElement.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goToSlide(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goToSlide(currentIndex + 1);
        }
    });

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
window.loadActiveVideo = function(buttonElement, videoId) {
    if (!buttonElement) return;

    // Si se ejecuta desde un archivo local (file://), YouTube bloquea los iframes con Error 153.
    // Abrimos directamente el video en YouTube en una nueva pestaña.
    if (window.location.protocol === 'file:') {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        return;
    }

    // En servidor web (http/https), creamos el iframe optimizado
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = buttonElement.getAttribute("aria-label") || "Video Educativo AquaMind";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    // Reemplazar de forma limpia el contenido del botón con el reproductor iframe
    const parent = buttonElement.parentElement;
    if (parent) {
        parent.innerHTML = "";
        parent.appendChild(iframe);
    }
};



