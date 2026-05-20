import { ModeloBlackjack } from './ModeloBlackjack.js';
import { CartaAnimada } from './CartaAnimada.js';
import { Carta } from './Carta.js'; // Importar Carta para usar Carta.VALORES
import { Jugador } from './Jugador.js'; // Importar Jugador para instanceof

/**
 * Controlador del juego Blackjack.
 * Gestiona la interacción entre el Modelo (lógica del juego) y la Vista (DOM).
 * Maneja eventos de usuario, actualiza la interfaz y orquesta el flujo del juego.
 */
export class ControladorBlackjack {
    constructor() {
        // Crear el modelo de juego
        this.modelo = new ModeloBlackjack();

        // Elementos visuales principales del DOM
        this.btnNueva = document.getElementById('btnNueva');
        this.btnPedir = document.getElementById('btnPedir');
        this.btnPlantarse = document.getElementById('btnPlantarse');
        this.btnAuto = document.getElementById('btnAuto');
        this.puntosMesa = document.getElementById('puntos-mesa');
        this.puntosJugador = document.getElementById('puntos-jugador');
        this.labelMesa = document.getElementById('label-mesa');
        this.labelJugador = document.getElementById('label-jugador');
        this.balanceElement = document.getElementById('balance');
        this.apuestaElement = document.getElementById('apuesta');
        this.cartasJugador = document.getElementById('cartas-jugador'); // Obsoleto si usamos panel lateral + área central
        this.cartasCrupier = document.getElementById('cartas-crupier');
        this.mensajeResultado = document.querySelector('.mensaje-resultado');
        this.mazoElement = document.querySelector('.mazo');

        // Panel lateral de jugadores
        this.panelJugadores = document.querySelector('.jugadores');

        // Área central donde se muestra el jugador activo
        this.areaJugadorActual = document.querySelector('.area-jugador');

        // Almacén para mapear cartas lógicas a sus objetos visuales (CartaAnimada)
        this.cartasVisuales = {}; // { cartaLogica1: cartaAnimada1, ... }

        // Seguimiento de las cartas visuales del crupier
        this.cartasCrupierEnJuego = []; // Array de instancias de CartaAnimada

        // Timeout para ocultar mensajes temporales
        this.ocultarMensajeTimeout = null;

        // Inicializar eventos y mazo visual
        this.inicializarEventos();

        // Ocultar mensaje de resultado inicialmente
        this.mensajeResultado.style.display = 'none';
        this.deshabilitarBotonesAccion(); // Deshabilitar botones hasta nueva partida
    }

    /**
     * Asigna los listeners a los botones de acción e inicializa el mazo visual.
     */
    inicializarEventos() {
        this.btnNueva.addEventListener('click', () => this.nuevaPartida());
        this.btnPedir.addEventListener('click', () => this.jugadorPideCarta());
        this.btnPlantarse.addEventListener('click', () => this.jugadorSePlanta());
        this.btnAuto.addEventListener('click', () => this.jugadorJuegaAutomaticamente());

        this.inicializarMazoVisual(); // Prepara las cartas visuales en el mazo

        console.log('Controlador Blackjack listo. Esperando acción "Nueva Partida".');
    }

    /**
     * Crea las instancias de CartaAnimada para todas las cartas del modelo
     * y las añade visualmente al elemento del mazo en el DOM.
     */
    inicializarMazoVisual() {
        this.mazoElement.innerHTML = ''; // Limpiar mazo visual anterior
        this.cartasVisuales = {}; // Resetear mapeo

        this.modelo.mazo.cartas.forEach(cartaLogica => {
            const cartaVisual = new CartaAnimada(cartaLogica);
            this.cartasVisuales[cartaLogica] = cartaVisual; // Mapear carta lógica a visual
            cartaVisual.anyadirA(this.mazoElement); // Añadir al DOM
        });

        this.aplicarEfectoProfundidad(); // Aplicar estilo visual al mazo
    }

    /**
     * Aplica un desplazamiento y z-index a las cartas en el mazo
     * para dar una apariencia de montón.
     */
    aplicarEfectoProfundidad() {
        const cartasEnMazo = Array.from(this.mazoElement.children);
        cartasEnMazo.forEach((elemento, index) => {
            // Pequeño desplazamiento aleatorio para un look menos perfecto
            const desplazamientoX = index * 0.2 + Math.random() * 1 - 0.5;
            const desplazamientoY = -index * 0.1; // Apilar hacia arriba

            elemento.style.transform = `translate(${desplazamientoX}px, ${desplazamientoY}px)`;
            elemento.style.zIndex = index; // Las cartas de abajo quedan detrás
        });
    }

    /**
     * Obtiene la instancia de CartaAnimada asociada a una carta lógica.
     * @param {Carta} cartaLogica - La carta del modelo.
     * @returns {CartaAnimada|undefined} La instancia visual o undefined si no se encuentra.
     */
    obtenerCartaVisual(cartaLogica) {
        // La clave del mapa es la propia instancia de Carta
        // Necesitamos encontrar la CartaAnimada cuya propiedad 'carta' sea la cartaLogica buscada.
        const cartaVisual = Object.values(this.cartasVisuales).find(cv => cv.carta === cartaLogica);
         if (!cartaVisual) {
             console.error("No se encontró la carta visual para:", cartaLogica);
         }
        return cartaVisual;
    }


    /**
     * Crea la estructura inicial en el panel lateral para mostrar la información
     * y las cartas de cada jugador.
     */
    inicializarPanelJugadores() {
        this.panelJugadores.innerHTML = ''; // Limpiar panel

        this.modelo.jugadores.forEach((jugador, index) => {
            const jugadorContainer = document.createElement('div');
            jugadorContainer.className = 'jugador-mano-contenedor';
            jugadorContainer.id = `jugador-panel-${index}`; // ID único para cada jugador
            jugadorContainer.dataset.jugadorIndex = index; // Guardar índice para referencia

            // Info básica (Nombre, Puntos)
            const infoJugador = document.createElement('div');
            infoJugador.className = 'jugador-info';
            infoJugador.innerHTML = `
                <span class="nombre">${jugador.nombre}</span>
                <span class="puntos">Puntos: <span class="valor-puntos">0</span></span>
            `;

            // Info Apuesta y Saldo
            const infoApuesta = document.createElement('div');
            infoApuesta.className = 'jugador-apuesta';
            infoApuesta.innerHTML = `
                <span>Apuesta: <span class="valor-apuesta">${jugador.apuesta}</span>€</span>
                <span>Saldo: <span class="valor-saldo">${jugador.balance}</span>€</span>
            `;

            // Contenedor para las cartas del jugador
            const cartasContainer = document.createElement('div');
            cartasContainer.className = 'cartas-en-juego'; // Aquí irán las CartaAnimada

            // Indicador de estado
            const estadoJugador = document.createElement('div');
            estadoJugador.className = 'jugador-estado';
            estadoJugador.textContent = 'Esperando apuesta...';

            // Añadir elementos al contenedor del jugador
            jugadorContainer.appendChild(infoJugador);
            jugadorContainer.appendChild(infoApuesta);
            jugadorContainer.appendChild(cartasContainer);
            jugadorContainer.appendChild(estadoJugador);

            // Añadir contenedor del jugador al panel lateral
            this.panelJugadores.appendChild(jugadorContainer);
        });
    }

    /**
     * Actualiza la información mostrada para todos los jugadores en el panel lateral
     * y la información específica del jugador actual en el panel central.
     */
    actualizarInformacionJugadores() {
        // Actualizar panel lateral para cada jugador
        this.modelo.jugadores.forEach((jugador, index) => {
            const container = document.getElementById(`jugador-panel-${index}`);
            if (!container) return;

            // Actualizar puntos
            const puntosElement = container.querySelector('.valor-puntos');
            const puntos = jugador.mano.cuentaPuntos();
            let textoPuntos = '';
            if (puntos === Infinity) textoPuntos = "Blackjack!";
            else if (jugador.sePasa) textoPuntos = `Pasado (${jugador.sePasa})`;
            else if (puntos === -1) textoPuntos = "Error Pts"; // Caso raro, debería ser manejado por sePasa
            else textoPuntos = puntos;
            puntosElement.textContent = textoPuntos;


            // Actualizar apuesta y saldo
            container.querySelector('.valor-apuesta').textContent = jugador.apuesta;
            container.querySelector('.valor-saldo').textContent = jugador.balance;

            // Actualizar estado y clases CSS
            const estadoElement = container.querySelector('.jugador-estado');
            container.classList.remove('jugador-activo', 'jugador-blackjack', 'jugador-pasado', 'jugador-plantado');
            let textoEstado = '';

            if (jugador === this.modelo.getJugadorActual()) {
                container.classList.add('jugador-activo');
                textoEstado = 'Jugando...';
            } else if (jugador.blackjack) {
                container.classList.add('jugador-blackjack');
                textoEstado = '¡Blackjack!';
            } else if (jugador.sePasa) {
                container.classList.add('jugador-pasado');
                textoEstado = `Se pasa (${jugador.sePasa})`;
            } else if (jugador.plantado) {
                container.classList.add('jugador-plantado');
                textoEstado = `Plantado (${puntos})`; // Mostrar puntos con los que se plantó
            } else if (this.modelo.fase === 'apuestas') {
                 textoEstado = jugador.apuesta > 0 ? 'Apuesta OK' : 'Esperando apuesta...';
            }
             else if (this.modelo.fase === 'jugando') {
                 textoEstado = 'Esperando turno';
            } else if (this.modelo.fase === 'finalizado') {
                 // El resultado final se muestra en el mensaje central
                 textoEstado = `Finalizado (${textoPuntos})`;
            }
             else {
                 textoEstado = 'Esperando...';
            }
            estadoElement.textContent = textoEstado;
        });

        // Actualizar información del jugador actual en el panel central (si hay jugador actual)
        const jugadorActual = this.modelo.getJugadorActual();
        if (jugadorActual) {
            this.balanceElement.textContent = jugadorActual.balance;
            this.apuestaElement.textContent = jugadorActual.apuesta;
            this.labelJugador.textContent = jugadorActual.nombre;
            const puntosActual = jugadorActual.mano.cuentaPuntos();
             let textoPuntosActual = '';
            if (puntosActual === Infinity) textoPuntosActual = "Blackjack!";
            else if (jugadorActual.sePasa) textoPuntosActual = `Pasado (${jugadorActual.sePasa})`;
            else if (puntosActual === -1) textoPuntosActual = "Error Pts";
            else textoPuntosActual = puntosActual;
            this.puntosJugador.textContent = textoPuntosActual;
        } else {
            // Limpiar panel central si no hay jugador activo (ej. turno crupier)
            this.balanceElement.textContent = '-';
            this.apuestaElement.textContent = '-';
            this.labelJugador.textContent = 'Jugador';
            this.puntosJugador.textContent = '-';
        }


        // Actualizar información del crupier
        this.labelMesa.textContent = this.modelo.crupier.nombre;
        const puntosCrupier = this.modelo.crupier.mano.cuentaPuntos();
        let textoPuntosCrupier = '';
         // Mostrar puntos solo si la partida ha avanzado o finalizado, o si tiene BJ
        if (this.modelo.fase === 'finalizado' || this.modelo.crupier.blackjack || (this.cartasCrupierEnJuego.length > 1 && !this.cartasCrupierEnJuego[0].bocaAbajo)) {
             if (puntosCrupier === Infinity) textoPuntosCrupier = "Blackjack!";
             else if (this.modelo.crupier.sePasa) textoPuntosCrupier = `Pasado (${this.modelo.crupier.sePasa})`;
             else if (puntosCrupier === -1) textoPuntosCrupier = "Error Pts";
             else textoPuntosCrupier = puntosCrupier;
        } else if (this.cartasCrupierEnJuego.length > 0) {
             // Mostrar solo la carta visible si la primera está boca abajo
             const cartaVisible = this.cartasCrupierEnJuego.find(cv => !cv.bocaAbajo);
             // Usar Carta.VALORES importado para obtener el valor numérico
             textoPuntosCrupier = cartaVisible ? (Carta.VALORES[cartaVisible.carta.valor] === 1 ? 'As' : Carta.VALORES[cartaVisible.carta.valor]) : '?';
        }
         else {
             textoPuntosCrupier = '?';
        }

        this.puntosMesa.textContent = textoPuntosCrupier;
    }

    /**
     * Mueve el contenedor visual del jugador activo desde el panel lateral
     * al área central de juego.
     */
    moverJugadorActivoAlAreaPrincipal() {
        const jugadorActual = this.modelo.getJugadorActual();
        if (!jugadorActual) return;

        const jugadorIndex = this.modelo.jugadores.indexOf(jugadorActual);
        const contenedorJugador = document.getElementById(`jugador-panel-${jugadorIndex}`);

        if (!contenedorJugador) return;

        // Limpiar área central por si quedó algo
        this.areaJugadorActual.innerHTML = '';
        // Añadir clase y mover
        contenedorJugador.classList.add('en-area-principal');
        this.areaJugadorActual.appendChild(contenedorJugador);
    }

    /**
     * Devuelve todos los contenedores de jugador (que puedan estar en el área central)
     * de vuelta al panel lateral.
     */
    devolverJugadoresAlPanel() {
        // Seleccionar el contenedor que está en el área principal (si existe)
        const contenedorEnArea = this.areaJugadorActual.querySelector('.jugador-mano-contenedor');

        if (contenedorEnArea) {
            contenedorEnArea.classList.remove('en-area-principal');
            // Reinsertar en el panel lateral en su orden original (opcional, pero bueno)
            const index = parseInt(contenedorEnArea.dataset.jugadorIndex);
            const refNode = this.panelJugadores.children[index];
            this.panelJugadores.insertBefore(contenedorEnArea, refNode);
        }
         // Limpiar área por si acaso
         this.areaJugadorActual.innerHTML = '';
    }


    /**
     * Muestra un mensaje temporal en el área de resultados.
     * @param {string} texto - El mensaje a mostrar.
     * @param {boolean} [esNotificacion=true] - Si es una notificación de turno o un resultado final.
     * @param {number} [duracion=1500] - Duración en ms antes de ocultarse (si es notificación).
     */
    mostrarMensaje(texto, esNotificacion = true, duracion = 1500) {
        this.mensajeResultado.textContent = texto;
        this.mensajeResultado.style.display = 'block';
        this.mensajeResultado.classList.remove('resultado-final', 'notificacion-turno', 'visible'); // Limpiar clases previas

        if (esNotificacion) {
            this.mensajeResultado.classList.add('notificacion-turno');
            // Forzar reflow para aplicar la clase antes de la transición
             this.mensajeResultado.offsetHeight;
             this.mensajeResultado.classList.add('visible'); // Activa la transición de opacidad/escala

            // Efecto pulso en el jugador activo
            const contenedorJugador = document.querySelector('.jugador-mano-contenedor.en-area-principal');
            if (contenedorJugador) {
                contenedorJugador.classList.add('turno-nuevo');
                setTimeout(() => contenedorJugador.classList.remove('turno-nuevo'), 600); // Duración animación pulso
            }

            // Ocultar después de un tiempo
            clearTimeout(this.ocultarMensajeTimeout); // Cancelar ocultación anterior
            this.ocultarMensajeTimeout = setTimeout(() => {
                this.ocultarMensaje();
            }, duracion);
        } else {
            // Es un resultado final, aplicar clase específica y no ocultar automáticamente
            this.mensajeResultado.classList.add('resultado-final');
             clearTimeout(this.ocultarMensajeTimeout);
        }
    }

    /**
     * Oculta el área de mensajes.
     */
    ocultarMensaje() {
        this.mensajeResultado.classList.remove('visible'); // Inicia transición de ocultación
        // Esperar a que termine la transición antes de ocultar con display:none
        // La duración debe coincidir con la transición CSS
         setTimeout(() => {
             // Solo ocultar si no se ha vuelto a mostrar mientras tanto
             if (!this.mensajeResultado.classList.contains('visible')) {
                 this.mensajeResultado.style.display = 'none';
                 this.mensajeResultado.classList.remove('notificacion-turno', 'resultado-final');
             }
         }, 500); // Duración de la transición de opacidad/transformación
    }

    /** Deshabilita los botones de acción del jugador (Pedir, Plantarse, Auto). */
    deshabilitarBotonesAccion() {
        this.btnPedir.disabled = true;
        this.btnPlantarse.disabled = true;
        this.btnAuto.disabled = true;
    }

    /** Habilita los botones de acción del jugador. */
    habilitarBotonesAccion() {
         // Solo habilitar si la fase es 'jugando' y hay un jugador activo
         if (this.modelo.fase === 'jugando' && this.modelo.getJugadorActual()) {
             this.btnPedir.disabled = false;
             this.btnPlantarse.disabled = false;
             this.btnAuto.disabled = false;
         } else {
             this.deshabilitarBotonesAccion();
         }
    }


    /**
     * Limpia visualmente la mesa: devuelve todas las cartas al mazo visual,
     * limpia los contenedores de cartas de jugadores y crupier.
     * @returns {Promise<void>}
     */
    async limpiarMesa() {
        console.log("Limpiando mesa...");
        this.deshabilitarBotonesAccion();
        this.ocultarMensaje();
        this.devolverJugadoresAlPanel(); // Asegurarse que no queden jugadores en el área central
        this.panelJugadores.innerHTML = ''; // Limpiar panel lateral
        this.cartasCrupier.innerHTML = ''; // Limpiar cartas crupier
        this.cartasCrupierEnJuego = [];

        // Devolver todas las cartas visuales al elemento mazo (sin animación por ahora)
        // Esto es más rápido que animar cada una individualmente
        this.mazoElement.innerHTML = ''; // Limpiar mazo actual
        Object.values(this.cartasVisuales).forEach(cartaVisual => {
             // Resetear estado visual (boca abajo, sin voltear)
             if (!cartaVisual.bocaAbajo) cartaVisual.voltear();
             cartaVisual.elemento.style.transform = ''; // Resetear transform
             cartaVisual.elemento.style.transition = ''; // Resetear transition
             this.mazoElement.appendChild(cartaVisual.elemento); // Añadir de nuevo al mazo
        });

        this.aplicarEfectoProfundidad(); // Reaplicar efecto visual al mazo lleno
        console.log("Mesa limpiada.");
    }

    /**
     * Anima el movimiento de una carta desde el mazo al contenedor del crupier.
     * @param {Carta} cartaLogica - La carta a añadir.
     * @param {boolean} [voltear=true] - Si la carta debe mostrarse boca arriba.
     * @returns {Promise<CartaAnimada>} Promesa que se resuelve con la instancia de CartaAnimada añadida.
     */
    async anyadirCartaCrupier(cartaLogica, voltear = true) {
        const cartaVisual = this.obtenerCartaVisual(cartaLogica);
        if (!cartaVisual) return null;

        await cartaVisual.moverAContenedor(this.cartasCrupier, 500, voltear);
        this.cartasCrupierEnJuego.push(cartaVisual); // Añadir al seguimiento
        this.actualizarZIndexCartas(this.cartasCrupier); // Reajustar solapamiento
        return cartaVisual;
    }

    /**
     * Anima el movimiento de una carta desde el mazo al contenedor de un jugador específico.
     * @param {number} jugadorIndex - Índice del jugador.
     * @param {Carta} cartaLogica - La carta a añadir.
     * @param {boolean} [voltear=true] - Si la carta debe mostrarse boca arriba.
     * @returns {Promise<CartaAnimada|null>} Promesa con la CartaAnimada o null si hay error.
     */
    async anyadirCartaJugador(jugadorIndex, cartaLogica, voltear = true) {
        // Encontrar el contenedor de cartas DENTRO del panel del jugador correcto
        const panelJugador = document.getElementById(`jugador-panel-${jugadorIndex}`);
        if (!panelJugador) {
             console.error(`Contenedor para jugador ${jugadorIndex} no encontrado.`);
             return null;
        }
        const contenedorCartas = panelJugador.querySelector('.cartas-en-juego');
         if (!contenedorCartas) {
             console.error(`Contenedor de cartas para jugador ${jugadorIndex} no encontrado.`);
             return null;
         }

        const cartaVisual = this.obtenerCartaVisual(cartaLogica);
        if (!cartaVisual) return null;

        await cartaVisual.moverAContenedor(contenedorCartas, 500, voltear);
        this.actualizarZIndexCartas(contenedorCartas); // Reajustar solapamiento

        // Hacer scroll para asegurar que el panel del jugador sea visible
        if (panelJugador && panelJugador.scrollIntoView) {
            panelJugador.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        return cartaVisual;
    }

    /**
     * Ajusta el z-index de las cartas en un contenedor para que se solapen correctamente.
     * @param {HTMLElement} contenedor - El contenedor de cartas (de jugador o crupier).
     */
    actualizarZIndexCartas(contenedor) {
        if (!contenedor) return;
        const cartas = contenedor.querySelectorAll('.carta-contenedor');
        cartas.forEach((cartaElemento, index) => {
            cartaElemento.style.zIndex = index + 1; // La última carta añadida queda encima
        });
    }

    /**
     * Anima el volteo de todas las cartas del crupier que estén boca abajo.
     * @returns {Promise<void>}
     */
    async voltearCartasCrupier() {
        console.log("Volteando cartas del crupier...");
        // Crear un array de promesas para voltear en paralelo (visualmente)
        const promesasVolteo = this.cartasCrupierEnJuego
            .filter(cartaVisual => cartaVisual.bocaAbajo) // Solo las que están boca abajo
            .map(cartaVisual => cartaVisual.voltear()); // Llama a voltear() que actualiza clase CSS

        // Esperar un tiempo corto para que la animación CSS ocurra (ajustar según CSS)
        await new Promise(resolve => setTimeout(resolve, 600)); // Duración de la animación de volteo
    }

    //--------------------------------------------------------------------------
    // MÉTODOS PRINCIPALES DE FLUJO DE JUEGO (Acciones de Usuario y Transiciones)
    //--------------------------------------------------------------------------

    /**
     * Inicia una nueva partida: pide número de jugadores, limpia mesa,
     * gestiona apuestas, reparte cartas iniciales y pasa el turno al primer jugador.
     */
    async nuevaPartida() {
        console.log("Iniciando nueva partida...");
        this.btnNueva.disabled = true; // Deshabilitar mientras se configura
        this.deshabilitarBotonesAccion();
        this.ocultarMensaje();

        // 1. Limpiar estado visual anterior
        await this.limpiarMesa();

        // 2. Preguntar número de jugadores (o usar existentes)
        //    (Considerar una UI más amigable que prompt)
        const nJugadoresStr = prompt(`¿Cuántos jugadores? (4-7, 0 para mantener los actuales: ${this.modelo.jugadores.length})`, this.modelo.jugadores.length > 0 ? 0 : 4);
         if (nJugadoresStr === null) { // Usuario canceló
             this.btnNueva.disabled = false;
             return;
         }
        const nJugadores = parseInt(nJugadoresStr);
         if (isNaN(nJugadores) || (nJugadores !== 0 && (nJugadores < 4 || nJugadores > 7))) {
             alert('Número de jugadores inválido (debe ser 0 o entre 4 y 7).');
             this.btnNueva.disabled = false;
             return;
         }

        // 3. Iniciar partida en el modelo
        const jugadores = this.modelo.iniciarPartida(nJugadores);
        if (!jugadores) {
            alert('Error al iniciar la partida en el modelo.');
            this.btnNueva.disabled = false;
            return;
        }

        // 4. Inicializar panel de jugadores en la UI
        this.inicializarPanelJugadores();
        this.actualizarInformacionJugadores(); // Mostrar saldos iniciales

        // 5. Gestionar apuestas (Considerar UI para apuestas)
        let apuestasOk = true;
        for (let i = 0; i < jugadores.length; i++) {
            const apuestaStr = prompt(`Apuesta para ${jugadores[i].nombre} (Saldo: ${jugadores[i].balance}€):`, 10);
             if (apuestaStr === null) { // Usuario canceló
                 apuestasOk = false; break;
             }
            const apuesta = parseInt(apuestaStr);
             if (isNaN(apuesta) || apuesta <= 0) {
                 alert("Apuesta inválida.");
                 apuestasOk = false; break;
             }

            const resultadoApuesta = this.modelo.realizarApuestaJugador(i, apuesta);
            if (!resultadoApuesta.exito) {
                alert(`Error al apostar para ${jugadores[i].nombre}: ${resultadoApuesta.mensaje}`);
                apuestasOk = false; break;
            }
             this.actualizarInformacionJugadores(); // Actualizar UI tras cada apuesta
        }

        if (!apuestasOk) {
            // Si fallan las apuestas, revertir (o reiniciar)
            console.log("Proceso de apuestas cancelado o fallido. Reiniciando.");
            this.modelo.prepararNuevaPartida(); // Resetear modelo
            await this.limpiarMesa(); // Limpiar UI de nuevo
            this.btnNueva.disabled = false;
            return;
        }

        // 6. Repartir cartas iniciales (modelo y animación)
        console.log("Repartiendo cartas iniciales...");
        const repartoInicial = this.modelo.repartirCartasIniciales();
        if (!repartoInicial) {
             alert("Error al repartir cartas iniciales.");
             this.btnNueva.disabled = false;
             return;
        }

        // Animar el reparto una por una
        for (const reparto of repartoInicial) {
            if (reparto.jugador === this.modelo.crupier) {
                await this.anyadirCartaCrupier(reparto.carta, !reparto.oculta); // Voltear si no está oculta
            } else {
                const jugadorIndex = this.modelo.jugadores.indexOf(reparto.jugador);
                await this.anyadirCartaJugador(jugadorIndex, reparto.carta, true); // Siempre boca arriba para jugador
            }
             this.actualizarInformacionJugadores(); // Actualizar puntos visibles
             await new Promise(resolve => setTimeout(resolve, 200)); // Pausa entre cartas
        }
        console.log("Reparto inicial completado.");

        // 7. Comprobar Blackjacks iniciales
        const blackjacks = this.modelo.comprobarBlackjacksIniciales();
        this.actualizarInformacionJugadores(); // Mostrar estado de BJ

        if (blackjacks && blackjacks.includes(this.modelo.crupier)) {
            // Si el crupier tiene BJ, la partida termina aquí
            console.log("Crupier tiene Blackjack inicial. Finalizando ronda.");
            this.mostrarMensaje("¡Blackjack para el Crupier!", false);
            await this.voltearCartasCrupier(); // Mostrar carta oculta
            this.actualizarInformacionJugadores(); // Actualizar puntos crupier
            const resultados = this.modelo.jugarTurnoCrupier(); // Evaluar resultados inmediatamente
            this.mostrarResultadosFinales(resultados.resultados);
            this.btnNueva.disabled = false; // Permitir nueva partida
            return; // Fin de la función nuevaPartida
        }
         else if (blackjacks) {
             // Mostrar notificación si solo jugadores tienen BJ
             const nombresBJ = blackjacks.map(j => j.nombre).join(', ');
             this.mostrarMensaje(`¡Blackjack para ${nombresBJ}!`);
             await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa para ver mensaje
         }


        // 8. Preparar para el primer jugador
        this.moverJugadorActivoAlAreaPrincipal();
        this.mostrarMensaje(`Turno de ${this.modelo.getJugadorActual().nombre}`);
        this.habilitarBotonesAccion(); // Habilitar Pedir/Plantarse/Auto
        console.log("Partida lista. Turno del primer jugador.");
    }

    /**
     * Gestiona la acción del jugador de pedir una carta.
     */
    async jugadorPideCarta() {
        console.log("Acción: Pedir Carta");
        this.deshabilitarBotonesAccion();

        const resultado = this.modelo.jugadorPideCarta();

        if (!resultado) {
            console.warn("No se pudo pedir carta (ya terminó turno o error).");
            this.habilitarBotonesAccion(); // Rehabilitar si fue un error momentáneo
            return;
        }

        // Animar la carta
        const jugadorIndex = this.modelo.jugadores.indexOf(resultado.jugador);
        await this.anyadirCartaJugador(jugadorIndex, resultado.carta, true);
        this.actualizarInformacionJugadores(); // Actualizar puntos y estado

        // Mostrar notificación si es relevante
        if (resultado.blackjack) {
            this.mostrarMensaje("¡BLACKJACK!");
            await new Promise(resolve => setTimeout(resolve, 1500));
        } else if (resultado.sePasa) {
            this.mostrarMensaje(`¡${resultado.jugador.nombre} se pasa!`);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        // Pasar al siguiente jugador si el turno terminó
        if (resultado.debeTerminar) {
            await this.siguienteJugador();
        } else {
            // Si no terminó, habilitar botones de nuevo
            this.habilitarBotonesAccion();
        }
    }

    /**
     * Gestiona la acción del jugador de plantarse.
     */
    async jugadorSePlanta() {
        console.log("Acción: Plantarse");
        this.deshabilitarBotonesAccion();

        const jugadorActual = this.modelo.getJugadorActual(); // Guardar referencia
        const plantado = this.modelo.jugadorSePlanta();

        if (plantado && jugadorActual) {
             this.mostrarMensaje(`${jugadorActual.nombre} se planta.`);
             this.actualizarInformacionJugadores(); // Actualizar estado visual
             await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa para ver mensaje
             await this.siguienteJugador(); // Pasar al siguiente
        } else {
            console.warn("No se pudo plantar.");
            // Rehabilitar botones si no se pudo plantar (quizás ya había terminado)
             this.habilitarBotonesAccion();
        }
    }

    /**
     * Simula el turno de un jugador automáticamente (pedir hasta 17 o plantarse).
     */
    async jugadorJuegaAutomaticamente() {
        console.log("Acción: Jugar Automáticamente");
        this.deshabilitarBotonesAccion();

        const jugadorActual = this.modelo.getJugadorActual();
        if (!jugadorActual) {
            console.error("No hay jugador actual para automatizar.");
            this.btnNueva.disabled = false; // Habilitar nueva partida si algo va mal
            return;
        }

        this.mostrarMensaje(`${jugadorActual.nombre} juega automáticamente...`);
        await new Promise(resolve => setTimeout(resolve, 800)); // Pausa inicial

        let seguirPidiendo = true;
        while (seguirPidiendo) {
            const puntos = jugadorActual.mano.cuentaPuntos();

            // Decisión simple: plantarse con 17 o más, o si ya terminó
            if (puntos >= 17 || puntos === Infinity || puntos === -1 || jugadorActual.sePasa || jugadorActual.blackjack) {
                seguirPidiendo = false;
                if (puntos !== Infinity && puntos !== -1 && !jugadorActual.sePasa && !jugadorActual.blackjack) {
                    // Solo se planta si no se pasó ni tiene BJ
                    jugadorActual.sePlanta();
                }
            } else {
                // Pedir carta
                 console.log(`${jugadorActual.nombre} (Auto) pide carta con ${puntos} puntos.`);
                const resultado = this.modelo.jugadorPideCarta(); // Llama al método del modelo

                if (!resultado) { // Error o no pudo pedir
                    seguirPidiendo = false;
                } else {
                    // Animar carta y actualizar UI
                    const jugadorIndex = this.modelo.jugadores.indexOf(resultado.jugador);
                    await this.anyadirCartaJugador(jugadorIndex, resultado.carta, true);
                    this.actualizarInformacionJugadores();
                    await new Promise(resolve => setTimeout(resolve, 500)); // Pausa para ver carta

                    if (resultado.debeTerminar) { // Se pasó o hizo BJ
                        seguirPidiendo = false;
                    }
                }
            }
        }

        // Mostrar resultado del turno automático
        const puntosFinales = jugadorActual.mano.cuentaPuntos();
        let mensajeFinal = "";
        if (jugadorActual.blackjack) mensajeFinal = `¡${jugadorActual.nombre} (Auto) consigue Blackjack!`;
        else if (jugadorActual.sePasa) mensajeFinal = `${jugadorActual.nombre} (Auto) se pasa con ${jugadorActual.sePasa}`;
        else mensajeFinal = `${jugadorActual.nombre} (Auto) se planta con ${puntosFinales}`;

        this.mostrarMensaje(mensajeFinal);
        this.actualizarInformacionJugadores(); // Asegurar estado final correcto
        await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa para ver resultado

        // Pasar al siguiente jugador
        await this.siguienteJugador();
    }


    /**
     * Pasa el control al siguiente jugador válido o inicia el turno del crupier.
     */
    async siguienteJugador() {
        console.log("Pasando al siguiente jugador...");
        this.devolverJugadoresAlPanel(); // Devolver jugador actual al panel lateral

        const siguiente = this.modelo.siguienteJugador(); // Obtiene el siguiente jugador o info del crupier

        if (!siguiente) {
            console.error("Error al obtener el siguiente jugador/estado desde el modelo.");
            this.btnNueva.disabled = false; // Permitir reiniciar
            return;
        }

        if (siguiente.debeJugar !== undefined) { // Es el objeto para iniciar turno crupier
            this.mostrarMensaje("Turno del Crupier");
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.iniciarTurnoCrupier(siguiente); // Llama a la lógica del turno del crupier
        } else if (siguiente instanceof Jugador) { // Es el siguiente jugador
            this.actualizarInformacionJugadores(); // Actualizar estados en panel lateral
            this.moverJugadorActivoAlAreaPrincipal(); // Mover nuevo jugador al centro
            this.mostrarMensaje(`Turno de ${siguiente.nombre}`);
            this.habilitarBotonesAccion(); // Habilitar botones para el nuevo jugador
        } else {
             console.error("Estado inesperado devuelto por modelo.siguienteJugador()");
             this.btnNueva.disabled = false;
        }
    }

    /**
     * Gestiona el inicio y ejecución del turno del crupier.
     * @param {object} datosCrupier - Objeto devuelto por iniciarTurnoCrupier del modelo.
     */
    async iniciarTurnoCrupier(datosCrupier) {
        console.log("Iniciando turno del crupier...");
        this.deshabilitarBotonesAccion(); // Nadie más puede jugar

        // Voltear la carta oculta del crupier
        await this.voltearCartasCrupier();
        this.actualizarInformacionJugadores(); // Mostrar puntos iniciales del crupier
        await new Promise(resolve => setTimeout(resolve, 800)); // Pausa para ver

        if (datosCrupier.debeJugar) {
            console.log("Crupier debe jugar...");
            const resultadoCrupier = this.modelo.jugarTurnoCrupier(); // Modelo ejecuta la lógica

            // Animar las cartas que pide el crupier
            for (const carta of resultadoCrupier.cartas) {
                await this.anyadirCartaCrupier(carta);
                this.actualizarInformacionJugadores(); // Actualizar puntos tras cada carta
                await new Promise(resolve => setTimeout(resolve, 800)); // Pausa
            }

            console.log("Turno del crupier finalizado.");
            this.mostrarResultadosFinales(resultadoCrupier.resultados);
        } else {
            // Si el crupier no tenía que jugar (ej. todos los jugadores se pasaron o tenían BJ)
            console.log("Crupier no necesita jugar. Evaluando resultados...");
            const resultados = this.modelo.evaluarResultados(); // Evaluar con la mano inicial del crupier
            this.mostrarResultadosFinales(resultados);
        }

        this.btnNueva.disabled = false; // Habilitar botón para nueva partida
    }

    /**
     * Muestra los resultados finales de la partida en el área de mensajes.
     * @param {object[]} resultados - Array de objetos de resultado devuelto por evaluarResultados del modelo.
     */
    mostrarResultadosFinales(resultados) {
        console.log("Mostrando resultados finales:", resultados);
        let textoResultados = "--- Resultados Finales ---\n\n";

        const puntosCrupier = this.modelo.crupier.mano.cuentaPuntos();
        const textoPuntosCrupier = puntosCrupier === Infinity ? "Blackjack" :
            this.modelo.crupier.sePasa ? `Pasado (${this.modelo.crupier.sePasa})` :
            puntosCrupier;
        textoResultados += `Crupier: ${textoPuntosCrupier}\n\n`;

        resultados.forEach(res => {
            const jugador = res.jugador;
            const puntosJugador = jugador.mano.cuentaPuntos();
             const textoPuntosJugador = puntosJugador === Infinity ? "Blackjack" :
                 jugador.sePasa ? `Pasado (${jugador.sePasa})` :
                 puntosJugador;

            let linea = `${jugador.nombre} (${textoPuntosJugador}): `;
            let claseResultado = '';
            if (res.resultado === 'gana') {
                linea += `GANA (+${res.ganancia - jugador.apuesta}€)`; // Mostrar ganancia neta
                claseResultado = 'ganador';
            } else if (res.resultado === 'empata') {
                linea += `EMPATA (recupera ${res.ganancia}€)`;
                 claseResultado = 'empate';
            } else {
                linea += `PIERDE (-${jugador.apuesta}€)`;
                 claseResultado = 'perdedor';
            }
            // Podríamos añadir la clase al texto si quisiéramos formatear con HTML
            textoResultados += linea + ` | Saldo: ${res.balanceNuevo}€\n`;
        });

        this.mostrarMensaje(textoResultados, false); // false indica que es resultado final
        this.actualizarInformacionJugadores(); // Asegurar que los saldos finales se muestren en el panel
    }
}