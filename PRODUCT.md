# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Niños y niñas de 6 a 10 años que están desarrollando hábitos diarios, conciencia ambiental y habilidades motoras/cognitivas.
- Familias y educadores (ámbito escolar y del hogar) que actúan como facilitadores, acompañantes o mediadores del aprendizaje.

## Product Purpose
Plataforma web lúdico-educativa que transforma la sensibilización sobre el cuidado, uso responsable y conservación del agua en una experiencia gamificada e interactiva. Su éxito radica en que los niños internalicen y apliquen hábitos de ahorro reales en su vida cotidiana (como duchas breves, cierre de grifos al cepillarse y valoración de los ecosistemas acuáticos).

## Positioning
Una solución de aprendizaje ambiental 100% nativa (Zero Dependencies, sin frameworks pesados ni registros o barreras de acceso) que combina mecánicas lúdicas directas (minijuego de reflejos y física, quiz con retroalimentación formativa y medallas) con herramientas de transferencia a la vida real (temporizador de ducha, pacto familiar y guía descargable imprimible).

## Operating Context
- Uso en aulas escolares de primaria, salas de cómputo y hogares, a menudo supervisado o acompañado por docentes y familias.
- Dispositivos variados: computadores de escritorio con teclado/ratón, portátiles escolares y pantallas táctiles (tablets y smartphones).
- Navegadores web estándar sin requerimiento de instalación o conexión de alta velocidad persistente (incluyendo actividades offline mediante guía imprimible).

## Capabilities and Constraints
- Tecnologías: HTML5 semántico, CSS3 moderno, Vanilla JavaScript (ES6+), Web Audio API (efectos de sonido sintetizados procedimentalmente sin dependencias de audio pesadas), Canvas HTML5 (confeti y visuales).
- Módulos confirmados:
  - Mini-juego interactivo "¡Atrapa las Gotas!" con detección de colisiones, vidas, niveles y puntaje en `localStorage`.
  - Quiz interactivo "Eco-Guardián" (10 preguntas, rachas, feedback formativo inmediato y cálculo de rango).
  - Módulo de Consejos y Retos con Temporizador de Ducha interactivo y sistema de insignias/pacto familiar.
  - Videoteca educativa integrada.
  - Cuadernillo pedagógico descargable en PDF (`Anexos/Guia_Educativa.pdf`).
- Restricciones:
  - Sin dependencias externas de librerías ni frameworks pesados (arquitectura puramente nativa y autónoma).
  - Persistencia exclusivamente del lado del cliente vía `localStorage` (sin backend obligatorio ni cuentas de usuario requeridas).

## Brand Commitments
- Nombre oficial: AquaMind.
- Identidad y tono: Amigable, motivador, educativo, seguro para la infancia y libre de frustración punitiva.
- Mascota y símbolos: Gota de agua (`💧`), estrella (`✨`), medallas y elementos de la naturaleza limpia.
- Tipografías fijadas: Fredoka y Quicksand (Google Fonts).
- Marco institucional de origen: Universidad Nacional Abierta y a Distancia (UNAD) - Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI).

## Evidence on Hand
- Código fuente y estructura funcional en el repositorio (`index.html`, `styles.css`, `script.js`).
- Mini-juegos implementados en `Juegos/Atrapar/` y `Juegos/Quiz/`.
- Módulo de hábitos en `Proyecto Consejos/`.
- Material imprimible real en `Anexos/Guia_Educativa.pdf`.
- Manual de despliegue en servidor en `IMPLEMENTATION.md` y documentación pedagógica en `README.md`.

## Product Principles
1. **Gamificación con propósito formativo:** Cada juego, reto o quiz debe reforzar un concepto ecológico tangible y aplicable a la vida diaria, no solo entretener.
2. **Cero barreras de fricción:** Acceso instantáneo, sin inicios de sesión obligatorios, tiempos de carga mínimos y ejecución 100% nativa en el navegador.
3. **Refuerzo positivo y pedagógico:** Fomentar el aprendizaje a través del estímulo, la curiosidad y la retroalimentación constructiva, evitando la frustración en caso de error.
4. **Puente entre la pantalla y el hogar:** La experiencia digital debe traducirse en acciones cotidianas verificables (cerrar el grifo, duchas de 3 a 5 minutos, pacto familiar).

## Accessibility & Inclusion
- Controles adaptables tanto a entrada por teclado (flechas), ratón (clic y arrastre) como interacción táctil directa en tablets/móviles.
- Estructura semántica con atributos ARIA, navegación por teclado y contraste de colores legible para el público infantil.
- Compatibilidad para actividades sin conectividad digital a través del material pedagógico imprimible.
