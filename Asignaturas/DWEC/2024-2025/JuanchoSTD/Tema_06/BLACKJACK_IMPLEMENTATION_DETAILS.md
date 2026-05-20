# Juego Blackjack - Detalles de Implementación y Uso Avanzado de JavaScript

## 1. Introducción

Este documento detalla la implementación de la aplicación web Blackjack. El proyecto sigue una estructura basada libremente en el patrón Modelo-Vista-Controlador (MVC), separando la lógica central del juego (Modelo) de la gestión e interacción de la interfaz de usuario (Controlador), con clases dedicadas para elementos visuales como las cartas animadas.

El objetivo principal es crear un juego de Blackjack interactivo que permita a múltiples jugadores jugar contra un crupier (la banca), incluyendo apuestas, animaciones de cartas y una clara retroalimentación visual.

## 2. Componentes Centrales

La aplicación se construye alrededor de varias clases clave de ES6:

*   **`ModeloBlackjack` (`ModeloBlackjack.js`)**:
    *   **Responsabilidad**: Encapsula todo el estado y la lógica del juego Blackjack. Conoce las reglas, gestiona los jugadores, el mazo, las apuestas, la puntuación y determina los ganadores. Es independiente de la interfaz de usuario (UI).
    *   **Características Clave**: Gestiona las fases del juego (`esperando`, `apuestas`, `jugando`, `finalizado`), contiene instancias de `Jugador` (incluyendo al `crupier`), utiliza una instancia de `Mazo`, maneja la lógica de apuestas, las secuencias de reparto, la progresión de turnos y la evaluación de resultados.
*   **`ControladorBlackjack` (`ControladorBlackjack.js`)**:
    *   **Responsabilidad**: Actúa como intermediario entre el `ModeloBlackjack` y la interfaz de usuario (DOM). Maneja la entrada del usuario (clics en botones), actualiza el DOM basándose en los cambios de estado del modelo y orquesta el flujo visual del juego, incluyendo las animaciones.
    *   **Características Clave**: Gestiona referencias a elementos del DOM, configura los `event listeners`, llama a métodos del `ModeloBlackjack` según las acciones del usuario, utiliza `CartaAnimada` para mostrar y animar las cartas, actualiza la información del jugador (puntos, saldo, estado), muestra mensajes del juego y gestiona la secuencia general de acciones (reparto, turnos de jugadores, turno del crupier, resultados).
*   **`CartaAnimada` (`CartaAnimada.js`)**:
    *   **Responsabilidad**: Representa visualmente una única carta en el DOM y maneja sus animaciones (mover, voltear). Vincula un objeto lógico `Carta` con su representación visual.
    *   **Características Clave**: Crea la estructura HTML necesaria (elementos `div` anidados para contenedor, interior, frente, reverso) para un efecto de volteo 3D, utiliza un sprite CSS (`cartas.png`) para las caras y reversos de las cartas (`background-position`), gestiona el estado visual de la carta (clase `bocaAbajo`, `volteada`) e implementa la lógica de animación (`moverAContenedor`) usando transiciones CSS y Promises de JavaScript.
*   **`Jugador` (`Jugador.js`)**:
    *   **Responsabilidad**: Representa a un participante en el juego (ya sea un jugador humano o el crupier). Contiene su mano (`Mano`), saldo, apuesta actual y estado en el juego (plantado, sePasa, blackjack).
    *   **Características Clave**: Contiene métodos para apostar (`apostar`), recibir cartas (`pideCarta`), calcular el valor de la mano (delegado a `Mano`) y gestionar su estado dentro de una ronda (`reiniciarParaRonda`, `sePlanta`).
*   **`Mano` (`Mano.js`)**:
    *   **Responsabilidad**: Representa el conjunto de cartas que tiene un jugador o el crupier.
    *   **Características Clave**: Almacena un array de objetos `Carta`, proporciona la lógica central para calcular el valor en puntos de la mano (`cuentaPuntos`), manejando los Ases correctamente (1 u 11 puntos) y determinando si hay Blackjack o si la mano se ha pasado (busted).
*   **`Mazo` (`Mazo.js`)**:
    *   **Responsabilidad**: Representa la baraja de cartas.
    *   **Características Clave**: Inicializa una baraja estándar de 52 cartas, proporciona métodos para barajar (`barajar`) y repartir cartas (`reparteCarta`).
*   **`Carta` (`Carta.js`)**:
    *   **Responsabilidad**: Representa una única carta lógica con un palo y un valor.
    *   **Características Clave**: Estructura de datos simple que contiene las propiedades de la carta. Incluye propiedades estáticas para palos y valores (`Carta.PALOS`, `Carta.VALORES`).

## 3. Detalles de Implementación

### 3.1. Lógica del Juego (`ModeloBlackjack`)

*   **Gestión de Estado**: La propiedad `this.fase` (`esperando`, `apuestas`, `jugando`, `finalizado`) dicta las acciones permitidas. Las transiciones entre fases se gestionan explícitamente (p. ej., después de que todas las apuestas se realizan, `fase` pasa a ser `jugando`).
*   **Progresión de Turnos**: El método `siguienteJugador()` determina el próximo jugador elegible para jugar (que no se haya pasado, tenga blackjack o se haya plantado). Si no quedan jugadores, desencadena el turno del crupier devolviendo una estructura de objeto específica reconocida por el controlador.
*   **Puntuación (`Mano.cuentaPuntos`)**: Esta es una pieza crítica de la lógica. Suma los valores de las cartas, cuenta los Ases y ajusta dinámicamente el valor de los Ases de 11 a 1 si el total excede 21. Devuelve `Infinity` para Blackjack (un As + carta de valor 10 en el reparto inicial) y `-1` si la mano se ha pasado (más de 21).
*   **Evaluación de Resultados (`evaluarResultados`, `evaluarResultadoJugador`)**: Compara la puntuación final de la mano de cada jugador con la del crupier, considerando manos pasadas y Blackjacks, para determinar los resultados (gana/pierde/empata) y calcular los pagos. Actualiza los saldos de los jugadores en consecuencia.

### 3.2. Control de UI (`ControladorBlackjack`)

*   **Interacción con el DOM**: Almacena en caché referencias a elementos clave del DOM en el constructor para un acceso eficiente. Crea dinámicamente elementos de UI para los jugadores (`inicializarPanelJugadores`) y actualiza el contenido de texto (`actualizarInformacionJugadores`, `mostrarMensaje`).
*   **Manejo de Eventos**: Usa `addEventListener` para vincular los clics de los botones (`btnNueva`, `btnPedir`, etc.) a los métodos correspondientes (`nuevaPartida`, `jugadorPideCarta`, etc.).
*   **Orquestación**: Actúa como el coordinador central. Por ejemplo, `nuevaPartida` llama a `modelo.iniciarPartida`, luego a `inicializarPanelJugadores`, maneja las solicitudes de apuesta (podría mejorarse con una UI), llama a `modelo.repartirCartasIniciales`, anima el reparto usando `anyadirCartaJugador`/`anyadirCartaCrupier`, comprueba Blackjacks iniciales y finalmente configura el turno del primer jugador.
*   **Flujo Asíncrono**: Utiliza intensivamente `async`/`await` para gestionar el ritmo del juego, permitiendo que las animaciones (`anyadirCartaJugador`, `voltearCartasCrupier`) y las pausas (`new Promise(resolve => setTimeout(resolve, ms))`) se completen antes de proceder al siguiente paso en la secuencia del juego.

### 3.3. Animación de Cartas (`CartaAnimada`)

*   **Sprites CSS**: Una única imagen (`cartas.png`) contiene todas las caras y reversos de las cartas. Las propiedades CSS `background-image` y `background-position` se manipulan en `crearElementoCarta` para mostrar la cara o el reverso correcto de la carta, mostrando solo la porción relevante del sprite. Esto es eficiente ya que requiere solo una solicitud HTTP para todas las imágenes de las cartas.
*   **Efecto de Volteo 3D**: La estructura HTML (`carta-contenedor > carta-inner > carta-frente, carta-reverso`) combinada con CSS (probablemente usando `transform: rotateY()` y `backface-visibility: hidden`) crea el efecto visual de volteo cuando la clase `volteada` es alternada por el método `voltear()`.
*   **Animación de Movimiento (`moverAContenedor`)**:
    1.  Calcula las posiciones de inicio y fin (relativas al viewport) de la carta.
    2.  Mueve temporalmente el elemento de la carta en el DOM para calcular la posición objetivo, luego lo devuelve a su lugar.
    3.  Usa `transform: translate(x, y)` de CSS para posicionar la carta *visualmente* en el punto de inicio sin activar una transición (`transition: transform 0s`).
    4.  Fuerza un reflow del navegador (`offsetHeight`) para asegurar que la transformación inicial se aplique.
    5.  Establece el `transform: translate(0, 0)` final y habilita la transición CSS (`transition: transform ${duracion}ms ease-out`). El navegador anima el cambio en `transform` durante la duración especificada.
    6.  Usa una `Promise` que se resuelve cuando se dispara el evento `transitionend`, señalando la finalización de la animación al `ControladorBlackjack`. Esto permite al controlador esperar a que termine la animación antes de repartir la siguiente carta o continuar.

## 4. Ejemplos y Uso Avanzado de JavaScript

Este proyecto demuestra varias características modernas y avanzadas de JavaScript:

*   **Módulos ES6 (`import`/`export`)**: Usados extensivamente para estructurar el código en componentes reutilizables y mantenibles (`ModeloBlackjack`, `ControladorBlackjack`, `Carta`, etc.). Esto mejora la organización y evita contaminar el espacio de nombres global.
*   **Clases ES6**: Proporcionan una estructura clara y orientada a objetos para definir los componentes centrales del juego (Modelo, Controlador, Jugador, Carta, Mazo, Mano, Carta Animada). Facilitan la encapsulación y la herencia (aunque no se usa mucho aquí).
*   **`async`/`await`**: Crucial para gestionar la naturaleza asíncrona del flujo del juego, especialmente involucrando animaciones y pausas deliberadas. Hace que el código asíncrono se vea y se comporte de forma más parecida al código síncrono, mejorando la legibilidad en comparación con callbacks anidados o cadenas complejas de Promises. Se observa en métodos de `ControladorBlackjack` como `nuevaPartida`, `jugadorPideCarta`, `iniciarTurnoCrupier`, `anyadirCartaJugador`, `anyadirCartaCrupier`.
*   **Promises**: Creadas explícitamente en `CartaAnimada.moverAContenedor` para proporcionar una señal clara al controlador cuando la animación de movimiento de la carta ha terminado. `async/await` es azúcar sintáctico sobre las Promises.
*   **Manipulación del DOM**: Demuestra una interacción completa con el DOM más allá de simples actualizaciones de texto:
    *   Creación de estructuras complejas de elementos (`CartaAnimada.crearElementoCarta`, `ControladorBlackjack.inicializarPanelJugadores`).
    *   Manipulación de clases CSS para cambios de estado y animaciones (`voltear`, añadir/quitar `jugador-activo`, `en-area-principal`, etc.).
    *   Manipulación directa de estilos para posicionamiento y sprites (`backgroundPosition`, `transform`, `zIndex`).
    *   Añadir/eliminar elementos (`appendChild`, `removeChild`, establecer `innerHTML`).
*   **Transiciones CSS**: JavaScript configura los estados inicial y final y desencadena la transición, pero la renderización real de la animación es manejada eficientemente por el navegador a través de CSS (definido en `main.css`, no mostrado aquí). Esto es generalmente más performante que los bucles de animación manuales en JavaScript.
*   **Métodos de Array**: Uso efectivo de métodos funcionales de array:
    *   `forEach`: Iterar sobre jugadores, cartas (p. ej., `inicializarPanelJugadores`, `aplicarEfectoProfundidad`).
    *   `map`: Transformar datos, especialmente en `evaluarResultados` para crear objetos de resultado para cada jugador.
    *   `filter`: Seleccionar subconjuntos, como encontrar jugadores aún en juego (`iniciarTurnoCrupier`).
    *   `find`: Localizar elementos específicos, como encontrar una instancia de `CartaAnimada` (`obtenerCartaVisual`) o la carta visible del crupier.
    *   `every`: Comprobar condiciones en todos los elementos, como determinar si todos los jugadores han realizado sus apuestas (`realizarApuestaJugador`).
*   **Manejo de Eventos (`addEventListener`)**: Mecanismo estándar pero esencial para la interacción del usuario, configurado con `{ once: true }` en `moverAContenedor` para el listener de `transitionend` para prevenir fugas de memoria y asegurar que solo se dispare una vez por animación.
*   **Principios Orientados a Objetos**:
    *   **Encapsulación**: Las clases agrupan datos (propiedades) y comportamiento (métodos) juntos (p. ej., `Jugador` gestiona su propio saldo y mano).
    *   **Separación de Responsabilidades**: `ModeloBlackjack` maneja *cuál* es el estado del juego, `ControladorBlackjack` maneja *cómo* se presenta e interactúa con él, y `CartaAnimada` maneja los detalles específicos de los visuales/animaciones de las cartas.

## 5. Conclusión

El proyecto Blackjack utiliza eficazmente características modernas de JavaScript (Clases ES6, Módulos, async/await, Promises) y técnicas web comunes (manipulación del DOM, Transiciones CSS, Sprites) para crear un juego interactivo. La separación entre la lógica del juego (`ModeloBlackjack`) y el control de la UI (`ControladorBlackjack`) promueve la mantenibilidad y la capacidad de prueba. La clase `CartaAnimada` encapsula las complejidades de la representación visual y la animación de las cartas, simplificando el trabajo del controlador. El uso de `async/await` mejora significativamente la gestión del flujo secuencial y dependiente de animaciones del juego.