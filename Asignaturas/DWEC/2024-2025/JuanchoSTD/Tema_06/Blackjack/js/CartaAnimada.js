import { Carta } from './Carta.js';

/**
 * Gestiona la representación visual y animación de una carta en el DOM.
 */
export class CartaAnimada {

    constructor(carta) {
        if (!carta || !(carta instanceof Carta)) {
            throw new Error("Se requiere una instancia de Carta para crear CartaAnimada.");
        }
        this.carta = carta; // La carta lógica asociada
        this.urlImg = 'url("img/cartas.png")'; // URL del sprite de cartas

        this.bocaAbajo = true; // Estado inicial de la carta visual

        // Dimensiones de una carta individual en el archivo sprite
        this.anchoSprite = 71;
        this.altoSprite = 96;

        // Crear el elemento DOM para esta carta
        this.elemento = this.crearElementoCarta();
    }

    /**
     * Crea la estructura HTML (elementos div anidados) para la carta,
     * incluyendo el frente y el reverso con el posicionamiento de fondo correcto.
     * @returns {HTMLElement} El elemento div contenedor de la carta.
     */
    crearElementoCarta() {
        // Crear estructura base
        const contenedor = document.createElement('div');
        contenedor.className = 'carta-contenedor';
        const inner = document.createElement('div');
        inner.className = 'carta-inner';
        const frente = document.createElement('div');
        frente.className = 'carta-frente';
        const reverso = document.createElement('div');
        reverso.className = 'carta-reverso';

        // Aplicar imagen de fondo (sprite) a ambas caras
        reverso.style.backgroundImage = frente.style.backgroundImage = this.urlImg;
        // Asegurar que el tamaño del fondo coincida con el sprite
        reverso.style.backgroundSize = 'auto';
        frente.style.backgroundSize = 'auto';

        // Configurar el reverso (dorso de la carta)
        const filaReverso = 4; // Fila 5 en el sprite (índice 4)
        // Seleccionar una columna aleatoria para variar el dorso
        const columnaReverso = Math.floor(Math.random() * 3); // 3 dorsos diferentes en la fila 5
        const posXReverso = -columnaReverso * this.anchoSprite;
        const posYReverso = -filaReverso * this.altoSprite;
        reverso.style.backgroundPosition = `${posXReverso}px ${posYReverso}px`;

        // Configurar el frente (valor y palo de la carta)
        const fila = Carta.PALOS.indexOf(this.carta.palo);
        const columna = Object.keys(Carta.VALORES).indexOf(this.carta.valor);
        const posX = -columna * this.anchoSprite;
        const posY = -fila * this.altoSprite;
        frente.style.backgroundPosition = `${posX}px ${posY}px`;

        // Ensamblar la estructura
        inner.appendChild(frente);
        inner.appendChild(reverso);
        contenedor.appendChild(inner);

        // Guardar referencia a la carta lógica en el elemento para posible uso futuro
        contenedor.dataset.valor = this.carta.valor;
        contenedor.dataset.palo = this.carta.palo;

        return contenedor;
    }

    /**
     * Mueve la carta visualmente desde su posición actual a un nuevo contenedor DOM
     * con una animación de traslación. Opcionalmente, puede voltear la carta durante la animación.
     * @param {HTMLElement} nuevoContenedor - El elemento DOM al que se moverá la carta.
     * @param {number} [duracion=500] - Duración de la animación en milisegundos.
     * @param {boolean} [voltear=false] - Si la carta debe voltearse durante la animación.
     * @returns {Promise<void>} Una promesa que se resuelve cuando la animación de movimiento termina.
     */
    moverAContenedor(nuevoContenedor, duracion = 500, voltear = false) {
        return new Promise(resolve => {
            const contenedorActual = this.elemento.parentElement;

            // Si no está en el DOM o ya está en el destino, resolver inmediatamente
            if (!contenedorActual || contenedorActual === nuevoContenedor) {
                // Si no está en el DOM, añadirlo directamente sin animar
                if (!contenedorActual && nuevoContenedor) {
                     nuevoContenedor.appendChild(this.elemento);
                }
                resolve();
                return;
            }

            // Forzar cálculo de layout para obtener posiciones actualizadas
            this.elemento.getBoundingClientRect();

            // Calcular posiciones absolutas (viewport)
            const rectOrigen = this.elemento.getBoundingClientRect();

            // Mover el elemento al nuevo contenedor ANTES de calcular el destino
            // Esto asegura que el cálculo de rectDestino sea correcto en su contexto final
            nuevoContenedor.appendChild(this.elemento);
            const rectDestino = this.elemento.getBoundingClientRect();

            // Calcular el desplazamiento necesario (Origen -> Destino)
            const deltaX = rectOrigen.left - rectDestino.left;
            const deltaY = rectOrigen.top - rectDestino.top;

            // Aplicar transformación inicial para empezar VISUALMENTE en la posición de origen
            // (pero ya estando en el nuevo contenedor)
            this.elemento.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            this.elemento.style.transition = 'transform 0s'; // Sin transición inicial

            // Forzar reflow para aplicar la transformación inicial antes de animar
            this.elemento.offsetHeight;

            // Aplicar transición y transformación final (animar a 0,0 relativo al nuevo padre)
            this.elemento.style.transition = `transform ${duracion}ms ease-out`;
            this.elemento.style.transform = 'translate(0, 0)';

            // Voltear si es necesario (la clase 'volteada' maneja la animación de volteo CSS)
            // Hacerlo DESPUÉS de iniciar la transición de movimiento para que ocurra durante
            if (voltear && this.bocaAbajo) {
                this.voltear(); // Llama al método que añade/quita la clase
            } else if (!voltear && !this.bocaAbajo) {
                 this.voltear(); // Asegurarse que quede boca arriba si voltear es false
            }


            // Escuchar el final de la transición
            this.elemento.addEventListener('transitionend', () => {
                // Limpiar estilos de transición y transformación
                this.elemento.style.transition = '';
                this.elemento.style.transform = '';
                // Mover definitivamente al nuevo contenedor en el DOM
                nuevoContenedor.appendChild(this.elemento);
                resolve(); // Resolver la promesa
            }, { once: true }); // Asegurar que el listener se ejecute solo una vez
        });
    }

    /**
     * Cambia el estado visual de la carta entre boca arriba y boca abajo,
     * añadiendo o quitando la clase CSS 'volteada'.
     */
    voltear() {
        this.bocaAbajo = !this.bocaAbajo;
        this.elemento.classList.toggle('volteada');
    }

    /**
     * Añade el elemento de la carta a un contenedor del DOM.
     * @param {HTMLElement} contenedor - El elemento padre al que añadir la carta.
     * @returns {CartaAnimada} La propia instancia para encadenamiento.
     */
    anyadirA(contenedor) {
        if (contenedor instanceof HTMLElement) {
            contenedor.appendChild(this.elemento);
        } else {
            console.error("El contenedor proporcionado no es un elemento HTML válido.");
        }
        return this;
    }

    /**
     * Elimina el elemento de la carta del DOM.
     * @returns {CartaAnimada} La propia instancia para encadenamiento.
     */
    quitar() {
        if (this.elemento.parentElement) {
            this.elemento.parentElement.removeChild(this.elemento);
        }
        return this;
    }
}