# 💧 AquaMind - Plataforma Educativa para el Cuidado del Agua

[![Estado del Proyecto](https://img.shields.io/badge/Estado-Completado-brightgreen.svg)]()
[![Público Objetivo](https://img.shields.io/badge/Público-Niños%206%20a%2010%20años-blue.svg)]()
[![Tecnologías](https://img.shields.io/badge/Tecnologías-HTML5%20|%20CSS3%20|%20JavaScript%20ES6+-orange.svg)]()
[![Institución](https://img.shields.io/badge/Institución-UNAD-005691.svg)]()

> **AquaMind** es una plataforma web educativa e interactiva creada para concientizar y empoderar a niños y niñas entre **6 y 10 años** sobre la preservación, uso responsable y ahorro del agua a través del juego, la multimedia y actividades prácticas cotidianas.

---

## 🌟 Descripción General

El proyecto combina elementos lúdicos y pedagógicos para transformar conceptos ambientales como el ciclo hidrológico, la huella hídrica y la contaminación de fuentes hídricas en experiencias dinámicas, visuales y fáciles de comprender para los más pequeños.

Diseñado con una estética amigable, tipografías legibles (*Fredoka* y *Quicksand*), animaciones fluidas y soporte completo para dispositivos móviles, tablets y computadores de escritorio.

---

## 🚀 Módulos y Características Principales

### 1. 🎮 Mini-Juego: ¡Atrapa las Gotas!
Un videojuego arcade educativo desarrollado en JavaScript puro:
- **Mecánica:** Controla una cubeta recolectora para atrapar gotas de agua limpia (💧 +10 pts), burbujas ecológicas (🧼 +25 pts) y gotas doradas de bonificación (🌟 +50 pts), mientras esquivas barriles de contaminación tóxica (🛢️ -1 vida).
- **Ecosistemas Progresivos:** Diferentes niveles dinámicos (*El Manantial*, *El Río Cristalino*, *El Gran Océano*).
- **Efectos Audiovisuales:** Síntesis de sonido en tiempo real con **Web Audio API**, sistema de partículas, barra de progreso temporal y registro de récords mediante `localStorage`.
- **Controles Universales:** Soporte para gestos táctiles (touch/drag), teclado (flechas `←` / `→`) y mouse.

### 2. 💡 Consejos, Retos y Eco-Hábitos
Un espacio interactivo para fomentar hábitos sostenibles en el hogar:
- **Consejos Prácticos Ilustrados:** Buenas prácticas en el cepillado, lavado de manos, riego de plantas y detección de fugas.
- **¿Sabías que...? (Datos Curiosos):** Información científica y datos asombrosos adaptados a lenguaje infantil.
- **Sistema de Logros y Medallas:** Recompensas visuales coleccionables que motivan el aprendizaje continuo.
- **Temporizador de Ducha Interactivo:** Herramienta visual con alerta sonora y conteo regresivo de 3-5 minutos para duchas cortas y eficientes.
- **Compromiso Ecohéroe:** Generador interactivo de pactos ecológicos familiares.

### 3. 🎬 Videoteca Educativa Interactiva
Carrusel dinámico con miniaturas y acceso a videos animados educativos seleccionados:
1. *El Ciclo del Agua y su Importancia*
2. *¿Cómo Cuidar el Agua en Casa?*
3. *La Aventura de la Gota de Agua*
4. *Consejos Divertidos para Ahorrar Agua*
5. *Cada Gota Cuenta para el Planeta*
6. *¡Misión Salvemos los Ríos!*

### 4. 🧠 Desafío Kahoot: Quiz Interactivo
Modal interactivo integrado con acceso rápido al desafío gamificado:
- **PIN Oficial del Juego:** `009355358` (con botón de copia en un clic al portapapeles).
- Enlace directo para unirse a la sala de juego en vivo con compañeros de clase o familia.

### 5. 📚 Material Didáctico Descargable (PDF)
- **Guía Educativa Oficial:** Cuadernillo con láminas para colorear, sopas de letras, crucigramas y lecturas breves disponible en `Anexos/Guia_Educativa.pdf` para imprimir y trabajar sin conexión.

---

## 📁 Estructura del Proyecto

```text
Proyecto_ing1_cuidado_del_agua/
│
├── index.html                  # Página principal (Home / Portal de inicio)
├── styles.css                  # Estilos globales, diseño responsive y temas
├── script.js                   # Lógica del carrusel de videos, modales y navegación
│
├── Juegos/
│   └── Atrapar/
│       ├── index.html          # Interfaz del juego "Atrapa las Gotas"
│       ├── styles.css          # Estilos y animaciones del juego y HUD
│       ├── script.js           # Motor del juego, audio sintético y colisiones
│       └── assets/             # Recursos adicionales del juego
│
├── Proyecto Consejos/
│   ├── index.html          # Módulo de consejos, temporizador y medallas
│   └── Imagenes/           # Ilustraciones y recursos visuales de consejos
│
├── Anexos/
│   └── Guia_Educativa.pdf      # Guía pedagógica descargable para imprimir
│
├── imagenes/                   # Iconos, favicons y recursos gráficos generales
└── README.md                   # Documentación del proyecto
```

---

## 💻 Tecnologías Utilizadas

- **HTML5:** Semántica web estructurada, accesibilidad (`ARIA labels`) y metadatos adaptables.
- **CSS3:** Flexbox, CSS Grid, Custom Properties (variables CSS), animaciones CSS y diseño responsivo (*Mobile First*).
- **JavaScript (Vanilla ES6+):** Manipulación del DOM, eventos táctiles/mouse/teclado, API de Portapapeles (`navigator.clipboard`), almacenamiento local (`localStorage`).
- **Web Audio API:** Generación procedural de efectos de sonido sin dependencias externas pesadas.
- **Kahoot!:** Integración con plataforma externa de gamificación para evaluación diagnóstica y formativa.
- **Google Fonts:** Fuentes tipográficas *Fredoka* y *Quicksand*.

---

## 🛠️ Cómo Ejecutar el Proyecto

El proyecto está diseñado para funcionar de forma ligera y sin necesidad de gestores de paquetes o servidores complejos:

### Opción 1: Apertura Directa en Navegador
1. Clona o descarga este repositorio en tu computadora:
   ```bash
   git clone https://github.com/Kscf27/Proyecto_ing1_cuidado_del_agua.git
   ```
2. Haz doble clic sobre el archivo `index.html` para abrirlo en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Opción 2: Usando un Servidor Local (Recomendado para desarrollo)
Si utilizas **Visual Studio Code**:
1. Instala la extensión **Live Server**.
2. Abre la carpeta del proyecto en VS Code.
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

---

## 🎯 Enfoque Pedagógico

| Pilar | Estrategia | Resultado Esperado |
|---|---|---|
| **Aprender Jugando** | Videojuegos y desafíos temporizados | Refuerzo positivo y retención de conceptos ecológicos. |
| **Acción Cotidiana** | Temporizadores y guías prácticas | Transferencia del conocimiento al entorno del hogar y la escuela. |
| **Inclusión Digital** | Material PDF descargable | Acceso a actividades educativas aún sin conexión a internet continua. |

---

## 🏫 Contexto Institucional

Proyecto desarrollado en el marco académico de la **Universidad Nacional Abierta y a Distancia (UNAD)** - *Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI)*, con el propósito de crear soluciones de impacto social y ambiental mediante herramientas digitales interactivas.

---

## 👥 Contribuciones

¡Las sugerencias y contribuciones son bienvenidas! Si deseas aportar ideas, nuevos minijuegos, actividades o mejoras visuales:
1. Realiza un **Fork** del proyecto.
2. Crea tu rama de características (`git checkout -b feature/NuevaActividad`).
3. Confirma tus cambios (`git commit -m 'Añade nueva actividad didáctica'`).
4. Sube la rama (`git push origin feature/NuevaActividad`).
5. Abre un **Pull Request**.

---

## 📄 Licencia

Este proyecto es de carácter educativo y de código abierto bajo fines formativos y de divulgación comunitaria.
