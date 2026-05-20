import { Mano } from './Mano.js';

/**
 * Representa a un jugador (o la banca) en la partida de Blackjack.
 */
export class Jugador {

    constructor(mazo, nombre, esBanca = false, balance = 100) {
        this.mazo = mazo; // Referencia al mazo global
        this.nombre = nombre;
        this.esBanca = esBanca; // ¿Es el crupier?
        this.balance = balance; // Dinero del jugador
        this.apuesta = 0; // Apuesta actual en la ronda
        this.mano = new Mano(this.mazo); // La mano de cartas del jugador
        this.plantado = false; // ¿El jugador se ha plantado?
        this.blackjack = false; // ¿El jugador tiene Blackjack?
        this.sePasa = false; // ¿El jugador se ha pasado de 21? (Almacena la puntuación con la que se pasó)
    }

    /**
     * Realiza una apuesta para la ronda actual.
     * @param {number} cantidadApuesta - La cantidad a apostar.
     * @returns {object} Un objeto indicando éxito o error y un mensaje.
     */
    apostar(cantidadApuesta = 10) {
        if (this.esBanca) {
             return { error: false, mensaje: "La banca no apuesta." };
        }
        if (cantidadApuesta < 0) {
            return {
                error: true,
                mensaje: `${this.nombre} intenta apostar ${cantidadApuesta}€, ¡no se permiten apuestas negativas!`
            };
        }
        if (this.balance - cantidadApuesta < 0) {
            return {
                error: true,
                mensaje: `${this.nombre} intenta apostar ${cantidadApuesta}€, pero su balance (${this.balance}€) no lo permite.`
            };
        }

        this.balance -= cantidadApuesta;
        this.apuesta += cantidadApuesta;
        return {
            error: false,
            mensaje: `${this.nombre} apuesta ${cantidadApuesta}€. Balance restante: ${this.balance}€.`
        };
    }

    /**
     * Pide una carta del mazo y la añade a la mano. Actualiza el estado si consigue Blackjack o se pasa.
     * @returns {Carta|object} La carta recibida, o un objeto de error si no puede pedir carta.
     */
    pideCarta() {
        // No se puede pedir carta si ya se plantó, tiene blackjack o se pasó
        if (this.plantado || this.blackjack || this.sePasa) {
            return {
                error: true,
                mensaje: `¡${this.nombre} no puede pedir más cartas! Estado: ${this.mano}`
            };
        }

        const carta = this.mano.anyadeCarta(this.mazo.daCarta());
        if (!carta) {
             return { error: true, mensaje: "¡El mazo está vacío!" };
        }

        const puntos = this.mano.cuentaPuntos();

        if (puntos === Infinity) { //BlackJack
            this.blackjack = true;
        } else if (puntos === -1) { // Se pasó
            // Almacena la puntuación con la que se pasó (el valor más bajo posible > 21)
            this.sePasa = this.mano.jugadasPosiblesOrdenadas().pop();
        }

        return carta; // Devuelve la carta añadida
    }

    /**
     * Marca al jugador como plantado.
     * @returns {string} Mensaje indicando que el jugador se planta.
     */
    sePlanta() {
        if (!this.blackjack && !this.sePasa) {
            this.plantado = true;
            return `${this.nombre} se planta con ${this.mano.cuentaPuntos()} puntos.`;
        }
        return `${this.nombre} no necesita plantarse (ya tiene Blackjack o se pasó).`;
    }

    /**
     * Reinicia el estado del jugador para una nueva ronda (mano, apuesta, estados).
     */
    reiniciarParaRonda() {
        this.mano.descartaTodas();
        this.apuesta = 0;
        this.plantado = false;
        this.blackjack = false;
        this.sePasa = false;
    }


    /**
     * Devuelve una representación textual del jugador y su mano.
     * @returns {string} Descripción del jugador.
     */
    toString() {
        return `${this.nombre}, mano: ${this.mano}`;
    }
}