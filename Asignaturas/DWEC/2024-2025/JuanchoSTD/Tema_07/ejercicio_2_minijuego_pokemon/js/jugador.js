class Jugador {
    constructor(nombre, metodo, containerId) {
        this.nombre = nombre;
        this.metodo = metodo;
        this.containerId = containerId;
        this.mano = [];
        this.cargarPokemon();
    }

    // El async no es necesario aquí (se están manejando las diferentes respuestas 
    // y la gestión de this.mano en cada método específico), pero lo dejo xk suele ser necesario para poder 
    // tratar con solicitudes asincrinas -> ¿Necesito hacer algo solo después de que algo de esto acabe?,
    // en este caso no, ya que esos métodos gestionan todo por su cuenta, pero podría ser de otro modo.

    // Sí podría suceder que se haga click en comenzar batalla sin que todas las cartas estén cargadas
    // Para evitarlo habría, por ejemplo, que asegurarse promises en los métodos de dcarga y await en partida al cargarlos
    async cargarPokemon() {
        this.mano = [];
        const container = document.getElementById(this.containerId);
        container.innerHTML = '<div class="loading">Cargando Pokémon...</div>';
        const pokemonIds = this.generarIds();

        switch (this.metodo) {
            case 'xhr':
                this.cargarConXHR(pokemonIds, container);
                break;
            case 'fetch':
                this.cargarConFetch(pokemonIds, container);
                break;
            case 'jQuery':
                this.cargarConJQuery(pokemonIds, container);
                break;
        }
    }

    generarIds() {
        const pokemonIds = [];
        while (pokemonIds.length < 6) {
            const randomId = Math.floor(Math.random() * 898) + 1;
            if (!pokemonIds.includes(randomId)) {
                pokemonIds.push(randomId);
            }
        }
        return pokemonIds;
    }

    cargarConXHR(pokemonIds, container) {
        let loadedCount = 0;
        const pokemonTemp = [];

        pokemonIds.forEach(id => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`);

            xhr.onload = () => { //van en paralelo y vamos acumulando en pokemonTemp
                if (xhr.status === 200) {
                    const pokemon = JSON.parse(xhr.responseText);
                    pokemonTemp.push(pokemon);
                    loadedCount++;
                    if (loadedCount === pokemonIds.length) {
                        this.procesarPokemonCargados(pokemonTemp);
                    }
                } else {
                    console.error('XHR: Error al cargar el Pokémon', xhr.statusText);
                    container.innerHTML = `<div class="error">Error: ${xhr.statusText}</div>`;
                }
            };

            xhr.onerror = () => {
                console.error('XHR: Error de red al realizar la solicitud');
                container.innerHTML = '<div class="error">Error de red</div>';
            };

            xhr.send();
        });
    }

    cargarConFetch(pokemonIds, container) {
        const promises = pokemonIds.map(id =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error HTTP: ${response.status}`);
                    }
                    return response.json();
                })
        );

        Promise.all(promises)
            .then(pokemons => { //vienene todos en array al resolverse TODOS
                this.procesarPokemonCargados(pokemons);
            })
            .catch(error => {
                console.error('Fetch: Error al cargar los Pokémon', error);
                container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            });
    }

    cargarConJQuery(pokemonIds, container) {
        const solicitudes = pokemonIds.map(id =>
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                type: 'GET',
                dataType: 'json'
            })
        );

        $.when.apply($, solicitudes)
            .then((...results) => { //Se procesan como parámetros individuales, no un parámetro que es una lista
                const pokemons = [];

                if (solicitudes.length === 1) {
                    pokemons.push(results[0]);
                } else {
                    for (let i = 0; i < results.length; i++) {
                        pokemons.push(results[i][0]);
                    }
                }

                this.procesarPokemonCargados(pokemons);
            })
            .fail(error => {
                console.error('jQuery: Error al cargar los Pokémon', error);
                $(container).html(`<div class="error">Error: ${error.statusText}</div>`);
            });
    }

    procesarPokemonCargados(pokemons) {
        pokemons.forEach(pokemon => {
            pokemon.hp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
            pokemon.ataque = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
            pokemon.defensa = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;

            pokemon.valorBatalla = pokemon.ataque + pokemon.defensa + Math.floor(pokemon.hp / 2);
        });
        this.mano = pokemons;
        console.log(`${this.metodo.toUpperCase()}: Pokémon cargados`);
        this.renderizarMano();
    }

    renderizarMano() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';
        this.mano.forEach(pokemon => {
            container.appendChild(this.crearCartaPokemon(pokemon));
        });
    }

    crearCartaPokemon(pokemon) {
        const card = document.createElement('div');
        card.className = 'carta-pokemon';
        card.dataset.pokemonId = pokemon.id;

        const header = document.createElement('div');
        header.className = 'encabezado-carta';
        header.textContent = pokemon.name;

        const imageContainer = document.createElement('div');
        imageContainer.className = 'imagen-carta';

        const image = document.createElement('img');
        image.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
        image.alt = pokemon.name;
        imageContainer.appendChild(image);

        const typesContainer = document.createElement('div');
        typesContainer.className = 'tipos-carta';

        pokemon.types.forEach(typeInfo => {
            const insigniaTipo = document.createElement('span');
            insigniaTipo.className = `insignia-tipo ${typeInfo.type.name}`;
            insigniaTipo.textContent = typeInfo.type.name;
            typesContainer.appendChild(insigniaTipo);
        });

        card.appendChild(header);
        card.appendChild(imageContainer);
        card.appendChild(typesContainer);

        const statsContainer = document.createElement('div');
        statsContainer.className = 'estadisticas-carta';

        statsContainer.innerHTML = `
            HP: ${pokemon.hp}<br>
            Ataque: ${pokemon.ataque}<br>
            Defensa: ${pokemon.defensa}<br>
            Valor Batalla: ${pokemon.valorBatalla}
        `;

        card.appendChild(statsContainer);

        return card;
    }

    // Métodos para gestionar la mano del juegador

    descartarCarta(carta) {
        this.mano = this.mano.filter(p => p.id !== carta.id);
        this.renderizarMano();
    }

    devolverCarta(carta) {
        this.mano.push(carta);
        this.renderizarMano();
    }

    seleccionarCarta(carta) {
        const cardElements = document.querySelectorAll(`#${this.containerId} .carta-pokemon`);
        cardElements.forEach(cardElement => {
            if (cardElement.dataset.pokemonId == carta.id) {
                cardElement.classList.add('seleccionada');
            } else {
                cardElement.classList.remove('seleccionada');
            }
        });
    }

    habilitarSeleccionVisual() {
        const cardElements = document.querySelectorAll(`#${this.containerId} .carta-pokemon`);
        cardElements.forEach(cardElement => {
            cardElement.classList.add('seleccionable');
            cardElement.classList.remove('deshabilitada');
        });
    }

    deshabilitarSeleccionVisual() {
        const cardElements = document.querySelectorAll(`#${this.containerId} .carta-pokemon`);
        cardElements.forEach(cardElement => {
            cardElement.classList.remove('seleccionable');
            cardElement.classList.add('deshabilitada');
        });
    }
}