import { Mazo } from './Mazo.js';
import { Jugador } from './Jugador.js';

/**
 * Modelo del juego Blackjack. Gestiona el estado del juego, incluyendo el mazo,
 * los jugadores, el crupier, el jugador actual y la fase del juego.
 * Contiene la lógica principal de las reglas del juego.
 */
export class ModeloBlackjack {
    constructor() {
        this.mazo = new Mazo();
        this.crupier = new Jugador(this.mazo, "Mesa", true, 0); // La banca es un jugador especial
        this.jugadores = []; // Array de jugadores humanos/IA
        this.jugadorActual = null; // Referencia al jugador cuyo turno es
        this.fase = 'esperando'; // Estado actual del juego: [esperando, apuestas, jugando, finalizado]
    }

    /**
     * Inicia una nueva partida. Crea nuevos jugadores si se especifica,
     * reinicia el estado de todos los jugadores y el crupier, baraja el mazo
     * y establece la fase a 'apuestas'.
     * @param {number} [numJugadores=0] - Número de nuevos jugadores a crear (4-7). Si es 0, usa los jugadores existentes.
     * @returns {Jugador[]|false} El array de jugadores listos para apostar, o false si hay un error.
     */
    iniciarPartida(numJugadores = 0) {
        // Si se solicitan nuevos jugadores, inicializarlos
        if (numJugadores >= 4 && numJugadores <= 7) { // Validar número de jugadores
            this.jugadores = [];
            for (let i = 0; i < numJugadores; i++) {
                // Usar un balance inicial configurable o por defecto
                this.jugadores.push(new Jugador(this.mazo, `Jugador ${i + 1}`, false, 100));
            }
        } else if (numJugadores !== 0) {
             console.error(`Número de jugadores inválido: ${numJugadores}. Debe ser 0 o entre 4 y 7.`);
             return false; // Indicar error si el número es inválido (y no es 0)
        }


        if (this.jugadores.length === 0) {
            console.error("No hay jugadores para iniciar la partida.");
            return false; // No se puede iniciar sin jugadores
        }

        // Reiniciar estado del crupier y jugadores existentes
        this.crupier.reiniciarParaRonda();
        this.jugadores.forEach(j => j.reiniciarParaRonda());

        // Barajar el mazo y cambiar fase
        this.mazo.barajar();
        this.fase = 'apuestas';
        this.jugadorActual = null; // Nadie juega aún

        console.log(`Partida iniciada con ${this.jugadores.length} jugadores. Fase: ${this.fase}`);
        return this.jugadores; // Devolver jugadores para que el controlador gestione apuestas
    }

    /**
     * Registra la apuesta de un jugador.
     * @param {Jugador|number} jugador - La instancia del jugador o su índice en el array.
     * @param {number} cantidad - La cantidad a apostar.
     * @returns {object|false} Un objeto con el resultado de la apuesta, o false si el jugador no es válido.
     */
    realizarApuestaJugador(jugador, cantidad) {
        // Obtener la instancia del jugador si se pasa un índice
        if (typeof jugador === 'number') {
            if (jugador < 0 || jugador >= this.jugadores.length) {
                console.error(`Índice de jugador inválido: ${jugador}`);
                return false;
            }
            jugador = this.jugadores[jugador];
        }

        if (!this.jugadores.includes(jugador) || jugador.esBanca) {
            console.error("Intento de apuesta por jugador inválido o la banca.");
            return false;
        }

        if (this.fase !== 'apuestas') {
             return { exito: false, mensaje: "No es la fase de apuestas." };
        }

        const resultadoApuesta = jugador.apostar(cantidad);

        // Comprobar si todos los jugadores han apostado para pasar a la siguiente fase
        const todosApostaron = this.jugadores.every(j => j.apuesta > 0);
        if (todosApostaron) {
            this.fase = 'jugando';
            console.log(`Todos los jugadores han apostado. Cambiando a fase: ${this.fase}`);
        }

        return {
            exito: !resultadoApuesta.error,
            mensaje: resultadoApuesta.mensaje,
            jugador: jugador,
            apuesta: jugador.apuesta, // Devolver apuesta total del jugador
            balanceActual: jugador.balance,
            todosApostaron: todosApostaron
        };
    }

    /**
     * Reparte las dos cartas iniciales a cada jugador y al crupier.
     * La primera carta del crupier se marca como oculta.
     * Establece el primer jugador como jugador actual.
     * @returns {object[]|false} Un array de objetos describiendo cada carta repartida, o false si no es la fase correcta.
     */
    repartirCartasIniciales() {
        if (this.fase !== 'jugando') {
            console.error("No se pueden repartir cartas si no se está en la fase 'jugando'.");
            // Opcionalmente, forzar apuestas por defecto si se quiere permitir iniciar sin fase de apuestas explícita
            // this.jugadores.forEach(jugador => {
            //     this.realizarApuestaJugador(jugador, 5);
            // });
            // this.fase = 'jugando'; // Forzar fase si se aplica lo anterior
            return false;
        }

        const repartoInicial = []; // Almacena info de cada carta repartida

        // Primera ronda (una carta visible a cada jugador)
        for (const jugador of this.jugadores) {
            const carta = jugador.pideCarta();
            if (carta.error) { console.error(carta.mensaje); return false; } // Error si no hay cartas
            repartoInicial.push({ jugador, carta, oculta: false });
        }

        // Primera carta del crupier (oculta)
        const cartaCrupier1 = this.crupier.pideCarta();
        if (cartaCrupier1.error) { console.error(cartaCrupier1.mensaje); return false; }
        repartoInicial.push({ jugador: this.crupier, carta: cartaCrupier1, oculta: true });

        // Segunda ronda (otra carta visible a cada jugador)
        for (const jugador of this.jugadores) {
            const carta = jugador.pideCarta();
             if (carta.error) { console.error(carta.mensaje); return false; }
            repartoInicial.push({ jugador, carta, oculta: false });
        }

        // Segunda carta del crupier (visible)
        const cartaCrupier2 = this.crupier.pideCarta();
         if (cartaCrupier2.error) { console.error(cartaCrupier2.mensaje); return false; }
        repartoInicial.push({ jugador: this.crupier, carta: cartaCrupier2, oculta: false });

        this.comprobarBlackjacksIniciales(); // Marcar jugadores con blackjack

        this.jugadorActual = this.jugadores[0]; // Empieza el primer jugador
        console.log(`Cartas iniciales repartidas. Turno de: ${this.jugadorActual.nombre}`);

        return repartoInicial; // Devuelve la secuencia de reparto para la animación
    }

    /**
     * Comprueba y marca si el crupier o algún jugador tienen Blackjack inicial.
     * @returns {Jugador[]|false} Array con los jugadores (incluido crupier) que tienen Blackjack, o false si nadie tiene.
     */
    comprobarBlackjacksIniciales() {
        const blackjacks = [];

        // Comprobar crupier
        if (this.crupier.mano.cuentaPuntos() === Infinity) {
            this.crupier.blackjack = true;
            blackjacks.push(this.crupier);
            console.log("¡Crupier tiene Blackjack!");
        }

        // Comprobar jugadores
        for (const jugador of this.jugadores) {
            if (jugador.mano.cuentaPuntos() === Infinity) {
                jugador.blackjack = true;
                blackjacks.push(jugador);
                console.log(`¡${jugador.nombre} tiene Blackjack!`);
            }
        }

        return blackjacks.length > 0 ? blackjacks : false;
    }

    /**
     * El jugador actual pide una carta.
     * @returns {object|null} Objeto con info de la carta y estado del jugador, o null si no puede pedir.
     */
    jugadorPideCarta() {
        if (!this.jugadorActual || this.jugadorActual.esBanca || this.fase !== 'jugando') {
            console.error("No se puede pedir carta: no hay jugador actual, es la banca o no es la fase de juego.");
            return null;
        }

        const resultadoPeticion = this.jugadorActual.pideCarta();

        if (resultadoPeticion.error) {
            console.warn(resultadoPeticion.mensaje);
            // Podría ser que el jugador ya no puede pedir (plantado, pasado) o mazo vacío
            return null;
        }

        const carta = resultadoPeticion;
        const debeTerminar = this.jugadorActual.blackjack || this.jugadorActual.sePasa;

        console.log(`${this.jugadorActual.nombre} pide carta: ${carta}. Mano: ${this.jugadorActual.mano}`);
        if (debeTerminar) {
             console.log(` -> ${this.jugadorActual.nombre} termina su turno (Blackjack o se pasa).`);
        }

        return {
            jugador: this.jugadorActual,
            carta: carta,
            puntos: this.jugadorActual.mano.cuentaPuntos(), // Puntuación actualizada
            blackjack: this.jugadorActual.blackjack,
            sePasa: this.jugadorActual.sePasa,
            debeTerminar: debeTerminar // Indica al controlador si debe pasar al siguiente jugador
        };
    }

    /**
     * El jugador actual se planta.
     * @returns {boolean} True si se plantó correctamente, false si no era posible.
     */
    jugadorSePlanta() {
        if (!this.jugadorActual || this.jugadorActual.esBanca || this.fase !== 'jugando') {
             console.error("No se puede plantar: no hay jugador actual, es la banca o no es la fase de juego.");
            return false;
        }

        const mensaje = this.jugadorActual.sePlanta();
        console.log(mensaje);
        return this.jugadorActual.plantado; // Devuelve true si realmente se plantó
    }


    /**
     * Pasa el turno al siguiente jugador o inicia el turno del crupier si era el último.
     * @returns {Jugador|object|false} El siguiente jugador, un objeto para iniciar el turno del crupier, o false si hay error.
     */
    siguienteJugador() {
         if (this.fase !== 'jugando') {
             console.error("No se puede pasar al siguiente jugador si no se está en fase 'jugando'.");
             return false;
         }
        const indiceActual = this.jugadores.indexOf(this.jugadorActual);

        if (indiceActual === -1) {
             console.error("Error: jugador actual no encontrado en la lista de jugadores.");
            return false; // Error interno
        }

        // Buscar el siguiente jugador que aún no haya terminado (no plantado, no pasado, no blackjack)
        let indiceSiguiente = -1;
        for (let i = indiceActual + 1; i < this.jugadores.length; i++) {
            if (!this.jugadores[i].plantado && !this.jugadores[i].sePasa && !this.jugadores[i].blackjack) {
                indiceSiguiente = i;
                break;
            }
        }


        if (indiceSiguiente !== -1) {
            // Pasar al siguiente jugador válido
            this.jugadorActual = this.jugadores[indiceSiguiente];
            console.log(`Pasa el turno a: ${this.jugadorActual.nombre}`);
            return this.jugadorActual;
        } else {
            // Era el último jugador válido o no quedan más jugadores activos
            console.log("Todos los jugadores han terminado. Iniciando turno del crupier.");
            this.jugadorActual = null; // Ya no hay jugador humano activo
            return this.iniciarTurnoCrupier(); // Devuelve info para el turno del crupier
        }
    }

    /**
     * Prepara la información para iniciar el turno del crupier.
     * Determina si el crupier necesita jugar (si quedan jugadores activos).
     * @returns {object} Objeto con la carta oculta del crupier y si debe jugar.
     */
    iniciarTurnoCrupier() {
        // El crupier solo juega si al menos un jugador no se ha pasado y no tiene Blackjack
        const jugadoresEnJuego = this.jugadores.filter(j => !j.sePasa && !j.blackjack);
        const debeJugar = jugadoresEnJuego.length > 0 && !this.crupier.blackjack; // No juega si ya tiene BJ

        console.log(`Iniciando turno crupier. ¿Debe jugar?: ${debeJugar}`);
        return {
            cartaOculta: this.crupier.mano.cartas[0], // Para que el controlador la revele
            debeJugar: debeJugar
        };
    }

    /**
     * Ejecuta el turno del crupier según las reglas (pedir hasta 17 o más).
     * Evalúa los resultados finales de la partida.
     * @returns {object} Objeto con las cartas que pidió el crupier, su puntuación final y los resultados de todos los jugadores.
     */
    jugarTurnoCrupier() {
        const cartasObtenidas = [];
        console.log(`Crupier juega con mano inicial: ${this.crupier.mano}`);

        // El crupier pide cartas hasta llegar a 17 o más, o pasarse
        // Considera el As como 11 si le beneficia y no se pasa de 21
        let puntosCrupier = this.crupier.mano.cuentaPuntos();
        while (puntosCrupier < 17 && puntosCrupier !== -1 && puntosCrupier !== Infinity) {
             console.log(`Crupier tiene ${puntosCrupier}, pide carta.`);
            const carta = this.crupier.pideCarta();
             if (carta.error) {
                 console.error("Error al pedir carta para el crupier:", carta.mensaje);
                 break; // Salir si hay error (mazo vacío?)
             }
            cartasObtenidas.push(carta);
            puntosCrupier = this.crupier.mano.cuentaPuntos(); // Recalcular puntos
            console.log(` -> Recibe ${carta}. Mano: ${this.crupier.mano}`);
        }

        if (this.crupier.sePasa) {
            console.log(`Crupier se pasa con ${this.crupier.sePasa} puntos.`);
        } else if (puntosCrupier === Infinity) {
             console.log("Crupier consigue Blackjack (improbable en este punto, pero posible).");
        }
         else {
            console.log(`Crupier se planta con ${puntosCrupier} puntos.`);
            this.crupier.plantado = true; // Marcar como plantado (aunque no afecte mucho a la lógica)
        }

        // Evaluar resultados y finalizar la fase
        const resultados = this.evaluarResultados();
        this.fase = 'finalizado';
        console.log(`Partida finalizada. Fase: ${this.fase}`);

        return {
            cartas: cartasObtenidas, // Cartas que pidió el crupier en este turno
            puntos: this.crupier.sePasa || this.crupier.mano.cuentaPuntos(), // Puntos finales (o con los que se pasó)
            resultados: resultados // Array con el resultado de cada jugador
        };
    }

    /**
     * Evalúa los resultados de todos los jugadores contra el crupier.
     * @returns {object[]} Un array de objetos, uno por cada jugador, con su resultado y ganancia.
     */
    evaluarResultados() {
        console.log("Evaluando resultados finales...");
        return this.jugadores.map(jugador => this.evaluarResultadoJugador(jugador));
    }

    /**
     * Evalúa el resultado para un jugador específico comparando su mano con la del crupier.
     * Actualiza el balance del jugador.
     * @param {Jugador} jugador - El jugador a evaluar.
     * @returns {object} Objeto con el resultado ('gana', 'pierde', 'empata'), ganancia y balances.
     */
    evaluarResultadoJugador(jugador) {
        let resultado = '';
        let ganancia = 0;
        const apuesta = jugador.apuesta; // Guardar apuesta antes de modificar balance

        const puntosJugador = jugador.mano.cuentaPuntos(); // Usar la puntuación calculada (maneja BJ y pasarse)
        const puntosCrupier = this.crupier.mano.cuentaPuntos();

        if (puntosJugador === Infinity) { // Jugador tiene Blackjack
            if (puntosCrupier === Infinity) { // Crupier también tiene Blackjack
                resultado = 'empata'; // Push
                ganancia = apuesta; // Recupera la apuesta
            } else {
                resultado = 'gana'; // Gana con Blackjack
                ganancia = apuesta * 2.5; // Pago 3:2
            }
        } else if (puntosJugador === -1) { // Jugador se pasa
            resultado = 'pierde';
            ganancia = 0; // Pierde la apuesta
        } else if (puntosCrupier === Infinity) { // Crupier tiene Blackjack (y jugador no)
            resultado = 'pierde';
            ganancia = 0;
        } else if (puntosCrupier === -1) { // Crupier se pasa (y jugador no)
            resultado = 'gana';
            ganancia = apuesta * 2; // Pago 1:1
        } else { // Ninguno se pasa ni tiene Blackjack, comparar puntos
            if (puntosJugador === puntosCrupier) {
                resultado = 'empata'; // Push
                ganancia = apuesta; // Recupera la apuesta
            } else if (puntosJugador > puntosCrupier) {
                resultado = 'gana';
                ganancia = apuesta * 2; // Pago 1:1
            } else { // puntosJugador < puntosCrupier
                resultado = 'pierde';
                ganancia = 0;
            }
        }

        const balanceAnterior = jugador.balance;
        jugador.balance += ganancia; // Actualizar balance del jugador

        console.log(` -> ${jugador.nombre}: ${resultado}. Apuesta: ${apuesta}, Ganancia: ${ganancia}, Balance: ${balanceAnterior} -> ${jugador.balance}`);

        return {
            jugador,
            resultado, // 'gana', 'pierde', 'empata'
            ganancia,
            balanceNuevo: jugador.balance,
            balanceAnterior
        };
    }

    /**
     * Obtiene el jugador actual.
     * @returns {Jugador|null} El jugador actual o null.
     */
    getJugadorActual() {
        return this.jugadorActual;
    }

    /**
     * Prepara el modelo para una nueva partida (resetea fase y jugador actual).
     * @returns {boolean} Siempre true.
     */
    prepararNuevaPartida() {
        this.fase = 'esperando';
        this.jugadorActual = null;
        console.log("Modelo preparado para nueva partida.");
        return true;
    }
}