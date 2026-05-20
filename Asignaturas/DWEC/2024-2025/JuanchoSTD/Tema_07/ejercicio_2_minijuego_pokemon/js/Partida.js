class Partida {
    constructor(jugadores) {
        this.jugadores = jugadores;
        this.estadoJuego = 'esperando_inicio'; // posibles estados: esperando_inicio, seleccionando_carta, resolviendo_batalla, juego_terminado
        this.cartaSeleccionada = {}; // diccionario con jugador.nombre: carta_seleccionada
        this.batallaActual = 0;

        // Conectar eventos de botones
        document.getElementById('btn-comenzar-partida').addEventListener('click', () => this.iniciarPartida());
        document.getElementById('btn-siguiente-batalla').addEventListener('click', () => this.siguienteBatalla());
        document.getElementById('btn-resolver-batalla').addEventListener('click', () => this.resolverBatalla());

        // Ocultar botones al inicio
        document.getElementById('btn-comenzar-partida').style.display = 'block';
        document.getElementById('btn-siguiente-batalla').style.display = 'none';
        document.getElementById('btn-resolver-batalla').style.display = 'none';

        this.actualizarEstadoJuegoUI("Esperando inicio de la partida...");
    }

    iniciarPartida() {
        console.log("Iniciando partida...");

        // Si venimos de una partida terminada, refrescar las manos de los jugadores
        if (this.estadoJuego === 'juego_terminado') {
            console.log("Refrescando manos para nueva partida...");
            this.jugadores.forEach(jugador => {
                jugador.cargarPokemon();
            });
        }

        this.estadoJuego = 'seleccionando_carta';
        this.batallaActual = 1;

        this.actualizarEstadoJuegoUI(`Batalla ${this.batallaActual}: Seleccionando cartas...`);
        document.getElementById('btn-comenzar-partida').style.display = 'none';
        document.getElementById('btn-siguiente-batalla').style.display = 'none';
        document.getElementById('btn-resolver-batalla').style.display = 'none';
        this.habilitarSeleccionCartas();
    }

    siguienteBatalla() {
        console.log("Siguiente batalla...");
        this.estadoJuego = 'seleccionando_carta';
        this.batallaActual++;
        this.cartaSeleccionada = {};
        this.actualizarEstadoJuegoUI(`Batalla ${this.batallaActual}: Seleccionando cartas...`);
        document.getElementById('btn-siguiente-batalla').style.display = 'none';
        document.getElementById('btn-resolver-batalla').style.display = 'none';
        this.habilitarSeleccionCartas();
    }

    manejarCartaClickEnPartida(jugadorQueSelecciono, pokemonId) {
        if (this.estadoJuego !== 'seleccionando_carta') {
            console.log("No es momento de seleccionar cartas :)");
            return;
        }

        const cartaSeleccionada = jugadorQueSelecciono.mano.find(p => p.id == pokemonId);

        if (cartaSeleccionada) {
            console.log(`${jugadorQueSelecciono.nombre} ha seleccionado ${cartaSeleccionada.name}`);
            this.cartaSeleccionada[jugadorQueSelecciono.nombre] = cartaSeleccionada;

            jugadorQueSelecciono.seleccionarCarta(cartaSeleccionada);

            const manoContainer = document.getElementById(jugadorQueSelecciono.containerId);
            const arenaBatalla = document.getElementById('arena-batalla');
            if (manoContainer && arenaBatalla) {
                const cardElement = manoContainer.querySelector(`.carta-pokemon.seleccionada`);
                if (cardElement) {
                    cardElement.classList.add('carta-batalla');
                    arenaBatalla.appendChild(cardElement);
                }
            }

            jugadorQueSelecciono.deshabilitarSeleccionVisual();

            // Comprobar que todos los jugadores CON CARTAS han seleccionado una carta
            const todosSeleccionaron = this.jugadores
                .filter(jugador => jugador.mano.length > 0)
                .every(jugador => this.cartaSeleccionada[jugador.nombre]);

            if (todosSeleccionaron) {
                this.estadoJuego = 'esperando_resolucion';
                this.actualizarEstadoJuegoUI("Todos han seleccionado. ¡Resolver Batalla!");
                document.getElementById('btn-resolver-batalla').style.display = 'block';
            }
        }
    }

    resolverBatalla() {
        console.log("Resolviendo batalla...");
        this.estadoJuego = 'resolviendo_batalla';
        document.getElementById('btn-resolver-batalla').style.display = 'none';

        //const cartasEnBatalla = this.jugadores.map(jugador => this.cartaSeleccionada[jugador.nombre]);

        let mejorEstadistica = -1;
        let ganador = null;
        const estadisticas = {};

        this.jugadores.forEach(jugador => {
            const carta = this.cartaSeleccionada[jugador.nombre];
            if (carta) {
                const totalEstadistica = carta.valorBatalla;
                estadisticas[jugador.nombre] = totalEstadistica;

                if (totalEstadistica > mejorEstadistica) {
                    mejorEstadistica = totalEstadistica;
                    ganador = jugador;
                } else if (totalEstadistica === mejorEstadistica) {
                    ganador = null; 
                }
            }
        });

        let resultadoMensaje = `Resultado Batalla ${this.batallaActual}: `;
        if (ganador) {
            resultadoMensaje += `${ganador.nombre} gana la batalla!`;
            this.jugadores.forEach(jugador => {
                const carta = this.cartaSeleccionada[jugador.nombre];
                if (carta) {
                    if (jugador === ganador) {
                        const arenaBatalla = document.getElementById('arena-batalla');
                        const arenaBatallaElements = arenaBatalla.querySelectorAll('.carta-pokemon');
                        arenaBatallaElements.forEach(cardElement => {
                            if (cardElement.dataset.pokemonId == carta.id) {
                                cardElement.classList.remove('seleccionada', 'carta-batalla');
                                const manoContainer = document.getElementById(jugador.containerId);
                                if (manoContainer) {
                                    manoContainer.appendChild(cardElement);
                                }
                            }
                        });
                    } else {
                        const arenaBatalla = document.getElementById('arena-batalla');
                        const arenaBatallaElements = arenaBatalla.querySelectorAll('.carta-pokemon');
                        arenaBatallaElements.forEach(cardElement => {
                            if (cardElement.dataset.pokemonId == carta.id) {
                                cardElement.remove();
                            }
                        });
                        jugador.descartarCarta(carta);
                    }
                }
            });
        } else {
            resultadoMensaje += "Empate en la batalla!";
            // En caso de empate, las cartas se descartan 
            const arenaBatalla = document.getElementById('arena-batalla');
            this.jugadores.forEach(jugador => {
                const carta = this.cartaSeleccionada[jugador.nombre];
                if (carta) {
                    const arenaBatallaElement = arenaBatalla.querySelector(`.carta-pokemon[data-pokemon-id="${carta.id}"]`);
                    if (arenaBatallaElement) {
                        arenaBatallaElement.remove();
                    }
                    jugador.descartarCarta(carta);
                }
            });
        }

        this.actualizarEstadoJuegoUI(resultadoMensaje);

        const arenaBatalla = document.getElementById('arena-batalla');
        arenaBatalla.innerHTML = '<h2>Arena de Batalla</h2>';

        if (!this.verificarFinJuego()) {
            document.getElementById('btn-siguiente-batalla').style.display = 'block';
        }
    }

    verificarFinJuego() {

        const jugadoresConCartas = this.jugadores.filter(jugador => jugador.mano.length > 0);

        if (jugadoresConCartas.length <= 1) {
            this.estadoJuego = 'juego_terminado';
            if (jugadoresConCartas.length === 1) {
                this.actualizarEstadoJuegoUI(`¡Juego Terminado! El ganador es ${jugadoresConCartas[0].nombre}!`);
            }
            document.getElementById('btn-siguiente-batalla').style.display = 'none';
            document.getElementById('btn-resolver-batalla').style.display = 'none';
            document.getElementById('btn-comenzar-partida').style.display = 'block';
            return true;
        }
        return false;
    }

    actualizarEstadoJuegoUI(mensaje) {
        const estadoElement = document.getElementById('estado-juego');
        if (estadoElement) {
            estadoElement.textContent = mensaje;
        }
    }

    habilitarSeleccionCartas() {
        this.jugadores.forEach(jugador => {
            jugador.habilitarSeleccionVisual();
            // Adjuntar event listeners a las cartas después de que se rendericen y habiliten
            const manoContainer = document.getElementById(jugador.containerId);
            if (manoContainer) {
                const cardElements = manoContainer.querySelectorAll('.carta-pokemon');
                cardElements.forEach(cardElement => {
                    // Añadimos los evenlistener, según esta manera clonando para eliminar cualquier rastro de listener anteriores primero
                    const old_element = cardElement;
                    const new_element = old_element.cloneNode(true);
                    old_element.parentNode.replaceChild(new_element, old_element);

                    // nuevo listener
                    const pokemonId = new_element.dataset.pokemonId;
                    new_element.addEventListener('click', () => {
                        this.manejarCartaClickEnPartida(jugador, pokemonId);
                    });
                });
            }
        });
    }

    deshabilitarSeleccionCartas() {
        this.jugadores.forEach(jugador => {
            jugador.deshabilitarSeleccionVisual();
        });
    }
}