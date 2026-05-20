import { Carta } from './Carta.js';

/**
 * Representa la baraja de cartas. Permite barajar, repartir y devolver cartas.
 */
export class Mazo {
    constructor() {
        this.cartas = [];
        Carta.PALOS.forEach(palo => {
            Object.keys(Carta.VALORES).forEach(valor => {
                this.cartas.push(new Carta(valor, palo));
            });
        });
    }

    /**
     * Baraja las cartas en el mazo usando el algoritmo Fisher-Yates (Knuth Shuffle).
     * De https://stackoverflow.com/questions/60662796/shuffle-array-in-js
     * @returns {Mazo} La instancia del mazo barajado.
     */
    barajar() {
        let j, x, index;
        for (index = this.cartas.length - 1; index > 0; index--) {
            j = Math.floor(Math.random() * (index + 1));
            x = this.cartas[index];
            this.cartas[index] = this.cartas[j];
            this.cartas[j] = x;
        }
        console.log(`Mazo barajado con ${this.numeroCartas()} cartas.`);
        return this; // Permite encadenar llamadas (ej. new Mazo().barajar())
    }

    /**
     * Devuelve el número de cartas restantes en el mazo.
     * @returns {number} Número de cartas.
     */
    numeroCartas() {
        return this.cartas.length;
    }

    /**
     * Saca y devuelve la carta superior del mazo.
     * @returns {Carta|null} La carta superior, o null si el mazo está vacío.
     */
    daCarta() {
        if (this.numeroCartas() > 0) {
            return this.cartas.pop();
        }
        return null;
    }

    /**
     * Añade un array de cartas de vuelta al mazo.
     * @param {Carta[]} cartas - Array de cartas a devolver.
     * @returns {Mazo} La instancia del mazo.
     */
    devolverCartas(cartas) {
        if (cartas && cartas.length > 0) {
            this.cartas.push(...cartas);
            console.log(`Mazo recibe ${cartas.length} cartas y queda con ${this.numeroCartas()} cartas.`);
        }
        return this;
    }
}