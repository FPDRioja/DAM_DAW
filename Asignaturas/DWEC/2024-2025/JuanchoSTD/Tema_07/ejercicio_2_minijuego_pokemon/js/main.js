let partida; //para depurar

document.addEventListener('DOMContentLoaded', () => {
    const jugadorIzquierda = new Jugador("Jugador Izquierda", "xhr", "mano-izquierda");
    const jugadorDerecha = new Jugador("Jugador Derecha", "fetch", "mano-derecha");
    const jugadorAbajo = new Jugador("Jugador Abajo", "jQuery", "mano-abajo");

    const jugadores = [jugadorIzquierda, jugadorDerecha, jugadorAbajo];
    partida = new Partida(jugadores);
});