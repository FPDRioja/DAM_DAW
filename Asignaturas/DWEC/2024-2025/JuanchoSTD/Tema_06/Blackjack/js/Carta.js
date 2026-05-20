/**
 * Representa una carta de la baraja con palo y valor.
 */
export class Carta {
    static PALOS = [
        'Picas',
        'Corazones',
        'Tréboles',
        'Diamantes'
    ];
    static VALORES = {
        'As': 1,
        'Dos': 2,
        'Tres': 3,
        'Cuatro': 4,
        'Cinco': 5,
        'Seis': 6,
        'Siete': 7,
        'Ocho': 8,
        'Nueve': 9,
        'Diez': 10,
        'Jota': 10,
        'Reina': 10,
        'Rey': 10
    }
    constructor(valor, palo) {
        this.valor = valor;
        this.palo = palo;
    }
    toString() {
        return `${this.valor} de ${this.palo}`;
    }
}