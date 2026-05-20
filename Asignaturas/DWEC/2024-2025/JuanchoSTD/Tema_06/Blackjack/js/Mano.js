import { Carta } from './Carta.js';
// Mazo se pasa en el constructor, no se necesita importar directamente aquí
// a menos que se use Mazo.algunaPropiedadEstatica, que no es el caso.

/**
 * Representa la mano de un jugador, con sus cartas y métodos para calcular puntos.
 */
export class Mano {
    constructor(mazo) {
        this.mazo = mazo; // Referencia al mazo para devolver cartas
        this.cartas = [];
    }

    /**
     * Calcula la mejor puntuación posible de la mano según las reglas del Blackjack.
     * Devuelve Infinity para Blackjack (As + figura/10 con 2 cartas).
     * Devuelve -1 si todas las combinaciones posibles superan 21.
     * @returns {number} La mejor puntuación posible (-1 si se pasa, Infinity si es Blackjack).
     */
    cuentaPuntos() {
        let valorJugadas = this.jugadasPosiblesOrdenadas();
        const mejorJugada = valorJugadas.map(valor => {
            if (this.numeroCartas() === 2 && valor === 21) {
                return Infinity; // Blackjack
            }
            return valor > 21 ? -1 : valor; // Marcar como -1 si se pasa
        }).sort((a, b) => b - a)[0]; // Ordenar desc y tomar la mejor

        return mejorJugada;
    }

    /**
     * Calcula todos los posibles valores de la mano considerando los Ases como 1 u 11.
     * @returns {number[]} Un array con todos los valores posibles, ordenado de mayor a menor.
     */
    jugadasPosiblesOrdenadas() {
        const nAses = this.cartas.filter(carta => carta.valor === 'As').length;
        let valorJugadas = [];
        // Calcula el valor base sumando todas las cartas (Ases valen 1 inicialmente)
        let valorBase = this.cartas.reduce((total, carta) => {
            return total + Carta.VALORES[carta.valor];
        }, 0);

        // Genera todas las combinaciones sumando 10 por cada As que se considere 11
        for (let i = 0; i <= nAses; i++) {
            valorJugadas.push(valorBase + i * 10);
        }
        return valorJugadas.sort((a, b) => b - a); // Ordenar de mayor a menor
    }

    /**
     * Devuelve el número de cartas en la mano.
     * @returns {number} Número de cartas.
     */
    numeroCartas() {
        return this.cartas.length;
    }

    /**
     * Añade una carta a la mano.
     * @param {Carta} carta - La carta a añadir.
     * @returns {Carta} La carta añadida.
     */
    anyadeCarta(carta) {
        this.cartas.push(carta);
        console.log(`Añadida ${carta}, la mano queda: ${this}`);
        return carta;
    }

    /**
     * Devuelve todas las cartas de la mano al mazo y vacía la mano.
     */
    descartaTodas() {
        this.mazo.devolverCartas(this.cartas);
        this.cartas = [];
    }

    /**
     * Método de "trampa" para añadir un As específico.
     * @returns {Carta} El As añadido.
     */
    sacarAsDeLaManga() {
        // Necesita crear una instancia de Carta, por eso el import es necesario
        return this.anyadeCarta(new Carta('As', 'Corazones'));
    }

    /**
     * Devuelve una representación textual de la mano y su mejor puntuación.
     * @returns {string} Descripción de la mano.
     */
    toString() {
        if (this.cartas.length === 0) {
            return "Mano vacía";
        }
        const cartasString = this.cartas.map(carta => carta.toString()).join(", ");
        const mejorJugada = this.cuentaPuntos();
        const jugadas = this.jugadasPosiblesOrdenadas();
        // Si mejorJugada es -1 (se pasó), muestra el menor valor posible (el último del array ordenado)
        const valorMostrado = mejorJugada === -1 ? jugadas[jugadas.length - 1] : mejorJugada;
        const textoMejorJugada = mejorJugada === Infinity ? "Blackjack" : valorMostrado;

        return `${cartasString} (Valor: ${textoMejorJugada}, posibles: ${jugadas.join('/')})`;
    }
}