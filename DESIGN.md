---
name: AquaMind
description: Sistema de diseño para la plataforma web educativa de concientización y cuidado del agua
colors:
  primary: "#0288D1"
  primary-dark: "#01579B"
  primary-light: "#4FC3F7"
  secondary: "#00838F"
  secondary-light: "#4DD0E1"
  accent-green: "#00E676"
  accent-green-dark: "#008340"
  warning-gold: "#FFB300"
  danger-coral: "#D32F2F"
  game-orange: "#D84315"
  tips-blue: "#0277BD"
  quiz-purple: "#5E35B1"
  bg-spring: "#E8F9FF"
  surface: "#FFFFFF"
  text-deep: "#1A365D"
  text-muted: "#455A64"
  text-light: "#FFFFFF"
typography:
  display:
    fontFamily: "'Fredoka', 'Segoe UI', cursive, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "'Fredoka', 'Segoe UI', cursive, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "'Fredoka', 'Segoe UI', cursive, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Quicksand', 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "'Quicksand', 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "12px"
  md: "20px"
  lg: "28px"
  pill: "30px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-game:
    backgroundColor: "{colors.game-orange}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  card-action:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-deep}"
    rounded: "{rounded.md}"
    padding: "30px 24px"
  nav-pill:
    backgroundColor: "rgba(255, 255, 255, 0.15)"
    textColor: "{colors.text-light}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
---

# Design System: AquaMind

## Overview

**Creative North Star: "El Manantial Digital" (The Digital Spring)**

AquaMind está fundamentado en la pureza, fluidez y transparencia de un manantial de agua viva. Es un ecosistema visual diseñado minuciosamente para niños y niñas de 6 a 10 años, equilibrando un estímulo lúdico alegre con una calma pedagógica ordenada. La interfaz no busca deslumbrar con ruido o saturación de arcade caótico, sino ofrecer una atmósfera acogedora, fresca y profundamente interactiva donde cada elemento invita a ser explorado de manera intuitiva y segura.

El sistema se apoya en superficies marinas luminosas, curvas orgánicas generosas y burbujas de contenido que parecen flotar sobre un lecho acuático cristalino. Las microinteracciones responden con rebotes suaves elásticos (*spring physics*) y destellos dorados que recompensan el aprendizaje ecológico, reforzando la sensación de logro sin generar frustración punitiva.

**Key Characteristics:**
- **Atmósfera Acuática y Fresca:** Gradientes oceánicos fluidos (del azul abisal al turquesa brillante) con fondo claro cielo manantial (`#E8F9FF`).
- **Geometría Orgánica Protegida:** Siluetas libres de aristas agresivas; predominio de radios amplios (12px, 20px, 28px y píldoras completas de 30px).
- **Elevación Luminosa Táctil:** Sombras suaves con tinte azul refractivo (`rgba(2, 136, 209, ...)`) y paneles con efecto cristal/burbuja (*backdrop-filter: blur*).
- **Tipografía Infantil de Alta Legibilidad:** Diálogo entre la expresividad redonda de *Fredoka* en títulos y la claridad geométrica de *Quicksand* en textos.

## Colors

La paleta cromática se inspira en los estratos de las cuencas hídricas naturales, complementada con acentos vibrantes de gamificación que diferencian cada experiencia lúdica sin saturar la vista.

### Primary
- **Azul Océano Solar** (`#0288D1`): Color de marca principal. Utilizado en la cabecera interactiva, logotipos, botones principales y bordes activos de navegación.
- **Azul Fosa Profunda** (`#01579B`): Azul de soporte y anclaje para sombras contrastantes, fondos de degradado oceánico y títulos de alto impacto.
- **Brisa Marina Clara** (`#4FC3F7`): Resaltados luminosos, estados de foco y efectos de agua cristalina superficial.

### Secondary
- **Turquesa Glaciar** (`#00BCD4`): Transición secundaria en gradientes de cabecera y acento refrescante para elementos secundarios.
- **Turquesa Suave** (`#4DD0E1`): Remate superior en olas SVG y fondos translúcidos de navegación.

### Tertiary
- **Verde Alga Viva** (`#00E676`): Acento ecológico de sostenibilidad y confirmación de aciertos en el quiz o temporizador de ducha.
- **Verde Alga Oscura** (`#00C853`): Estados de confirmación y botones de éxito completado.
- **Amarillo Dorado Logro** (`#FFB300`): Estrellas, medallas, bonificaciones y reconocimientos de ecohéroe.
- **Rojo Coral Alerta** (`#FF5252`): Estados de peligro en el juego (residuos tóxicos) y advertencias amigables de tiempo agotado.
- **Naranja Aventura Lúdica** (`#FF7043`): Botón de llamada a la acción y barra distintiva del mini-juego ¡Atrapa las Gotas!.
- **Púrpura Reto Mental** (`#7C4DFF`): Identificador del Quiz interactivo Eco-Guardián.

### Neutral
- **Cielo Manantial Fondo** (`#E8F9FF`): Lienzo global de fondo; suave, relajante y libre del deslumbramiento del blanco crudo.
- **Blanco Superficie Pura** (`#FFFFFF`): Fondo de tarjetas, paneles modales, botones invertidos y textos sobre gradientes.
- **Azul Abisal Texto** (`#1A365D`): Color principal de lectura tipográfica. Proporciona contraste AAA sobre fondos claros sin la dureza visual del negro puro.
- **Gris Azulado Muted** (`#546E7A`): Subtítulos, metadatos y descripciones complementarias.

### Named Rules
**La Regla del Brillo Acuático.** Toda sombra proyectada en el sistema debe incorporar un tinte azul oceánico (`rgba(2, 136, 209, 0.08–0.22)`) en lugar de negro o gris neutro opaco. La profundidad se percibe como luz que atraviesa agua limpia.
**La Regla de la Claridad Lúdica.** No más de dos colores de acento vibrante (naranja, púrpura, verde o amarillo) pueden competir en una misma sección de visualización simultánea, evitando la fatiga cognitiva infantil.

## Typography

El emparejamiento tipográfico combina la calidez lúdica de *Fredoka* con la estructura limpia y ordenada de *Quicksand*.

**Display Font:** `Fredoka` (fallback: `'Segoe UI', cursive, sans-serif`)
**Body Font:** `Quicksand` (fallback: `'Segoe UI', sans-serif`)
**Label Font:** `Quicksand` en peso 700 para botones, medallas y píldoras.

**Character:** Tipografía acogedora, de extremos redondeados y curvas suaves que evoca libros infantiles ilustrados modernos, eliminando cualquier sensación de rigidez o burocracia escolar.

### Hierarchy
- **Display** (700, `clamp(2.2rem, 5vw, 2.8rem)`, 1.15): Título de bienvenida en la cabecera principal y nombres de módulos al iniciar.
- **Headline** (700, `2rem`, 1.25): Títulos de sección (`.section-title`), encabezados de modales y resultados de juegos.
- **Title** (600, `1.45rem`, 1.3): Encabezados de tarjetas de acción, nombres de consejos y preguntas del quiz.
- **Body** (500, `16px`, 1.6): Textos explicativos, narraciones, consejos cotidianos y opciones del quiz. Longitud máxima recomendada de 65ch para garantizar lectura cómoda en niños.
- **Label** (700, `14px`, 1.2): Texto de botones, etiquetas de navegación, conteo de racha y vidas del HUD.

### Named Rules
**La Regla del Título Amable.** Todos los encabezados principales (H1 a H3) deben usar *Fredoka*, manteniendo un espaciado de letras relajado y un ligero sombreado de texto (`text-shadow: 0 2px 4px rgba(0,0,0,0.15)`) para flotar limpiamente sobre degradados.

## Layout

El sistema espacial de AquaMind se basa en una cuadrícula flexible y espaciosa que prioriza la navegación táctil y el acceso rápido a los diferentes módulos.

- **Ancho Máximo de Contenedor:** `1200px` para la barra de navegación; `1100px` para el cuerpo principal de páginas; `680px` para el quiz y el HUD de juego en pantalla centrada.
- **Espaciado y Ritmo:** Escala regular basada en múltiplos (`xs: 6px`, `sm: 10px`, `md: 16px`, `lg: 24px`, `xl: 32px`). Los márgenes entre secciones son amplios (mínimo 40px) para conceder respiro visual.
- **Rejilla Adaptativa (Adaptive Cards Grid):** Las tarjetas de acceso rápido emplean `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` con una separación de `24px`, garantizando una transición impecable entre dispositivos móviles de pantalla estrecha y monitores de escritorio.
- **Separadores Orgánicos (Wave Dividers):** Las divisiones entre bloques de color (como la cabecera superior y el cuerpo) utilizan trazados curvos SVG que simulan el oleaje suave.

## Elevation & Depth

La tridimensionalidad en AquaMind no es estática ni monolítica; responde dinámicamente al estado de los elementos con una sensación de flotación acuática.

### Shadow Vocabulary
- **Sombra Base Táctil** (`box-shadow: 0 4px 10px rgba(2, 136, 209, 0.08)`): Aplicada en tarjetas de contenido, botones en reposo y contenedores neutros.
- **Sombra Flotante Media** (`box-shadow: 0 8px 24px rgba(2, 136, 209, 0.15)`): Utilizada en la barra de navegación superior, contenedor de videoteca y paneles de preguntas.
- **Sombra Activa Elevada** (`box-shadow: 0 14px 35px rgba(2, 136, 209, 0.22)`): Se activa al interactuar (`:hover` o `:focus`), elevando el elemento `8px` hacia arriba (`transform: translateY(-8px)`).
- **Capa Cristalina (Glassmorphism):** Menú de navegación y badge de mascota usan `background: rgba(255, 255, 255, 0.15–0.25)` junto con `backdrop-filter: blur(8px–10px)` y bordes translúcidos (`border: 2px solid rgba(255, 255, 255, 0.4)`).

### Named Rules
**La Regla de la Elevación Flotante.** Los elementos accionables ganan volumen y flotación ascendente (`translateY(-3px)` a `translateY(-8px)`) con escalado sutil (`scale(1.02)` a `scale(1.05)`) al interactuar con ellos, simulando una boya en el agua.

## Shapes

La morfología de AquaMind está orientada a la protección y la empatía con la infancia: formas suaves, contornos continuos y cero esquinas punzantes.

- **Contenedores Menores / Tags:** Radio pequeño (`12px`).
- **Tarjetas y Ventanas de Módulo:** Radio mediano (`20px` a `22px`).
- **Contenedores de Sección Amplios:** Radio grande (`28px`).
- **Botones y Píldoras de Navegación:** Forma de píldora completa (`border-radius: 30px`).
- **Insignias y Mascota:** Círculos perfectos (`border-radius: 50%`) decorados con bordes concéntricos translúcidos.

### Named Rules
**La Regla de la Esquina Amigable.** Ningún elemento de interfaz, tarjeta, botón o modal puede tener un radio de curvatura menor a 12px. Las esquinas rectas de 90° están terminantemente prohibidas en la experiencia infantil de AquaMind.

## Components

### Buttons
- **Shape:** Píldora completa (`border-radius: 30px`), altura táctil mínima de 44px para facilitar el toque en pantallas escolares.
- **Primary:** Fondo `var(--primary-color)` (`#0288D1`), texto `#FFFFFF`, tipografía *Quicksand* 700, padding `10px 22px`.
- **Game / Quiz Variants:** Fondo naranja dinámico (`#FF7043`) para juegos arcade; púrpura brillante (`#7C4DFF`) para retos cognitivos.
- **Hover / Focus:** `transform: translateY(-3px) scale(1.03)`, sombra aumentada a `0 6px 16px rgba(0, 0, 0, 0.15)`. Transición suave `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`.

### Cards / Containers
- **Corner Style:** Curvas suaves (`20px`).
- **Background:** Superficie blanca (`#FFFFFF`) con borde superior distintivo de 8px en gradiente acorde a la temática.
- **Shadow Strategy:** Sombra base `var(--shadow-sm)`; al interactuar pasa a `var(--shadow-lg)` con `translateY(-8px) scale(1.02)`.
- **Internal Padding:** `30px 24px` para asegurar generoso espacio interior.

### Navigation Pill
- **Style:** Fondo translúcido `rgba(255, 255, 255, 0.15)`, texto blanco, radio `30px`, padding `10px 18px`, desenfoque de fondo `blur(8px)`.
- **Hover:** Fondo blanco opaco, texto `var(--primary-color)`, elevación `translateY(-3px)` y sombra `0 6px 16px rgba(0, 0, 0, 0.15)`.

### Mascot Badge
- **Style:** Círculo de `90px x 90px`, fondo `rgba(255, 255, 255, 0.25)`, borde `3px solid rgba(255, 255, 255, 0.5)`, sombra `0 8px 20px rgba(0, 0, 0, 0.15)`.
- **Motion:** Animación cíclica suave `floatMascot` (2.5s) y destello rotativo de estrella (`spinSparkle` de 4s).

## Do's and Don'ts

### Do:
- **Do** emplear siempre las tipografías oficiales: *Fredoka* para encabezados y *Quicksand* para cuerpos de texto e instrucciones.
- **Do** teñir las sombras con la familia azulada `rgba(2, 136, 209, ...)` para mantener la frescura acuática y la sensación de manantial.
- **Do** asegurar áreas de pulsación táctil generosas (mínimo 44px de altura) en todos los botones y opciones de quiz.
- **Do** utilizar microanimaciones de rebote elástico (*cubic-bezier(0.34, 1.56, 0.64, 1)*) que transmitan dinamismo y alegría al interactuar.
- **Do** incluir la mascota gota (`💧`) y destellos (`✨`) en pantallas de bienvenida y estados de celebración.

### Don't:
- **Don't** usar bordes rectos (radio de 0px) ni aristas afiladas en ninguna tarjeta, botón o ventana.
- **Don't** recurrir a sombras grises/negras crudas que ensucien la estética transparente y luminosa.
- **Don't** sobreestimular con parpadeos constantes, movimientos excesivos o sonidos estridentes que desorienten a los niños.
- **Don't** implementar pantallas corporativas grises, aburridas o con exceso de texto denso sin apoyo iconográfico.
- **Don't** diseñar elementos interactivos diminutos difíciles de acertar con el dedo en pantallas táctiles o tablets de aula.
