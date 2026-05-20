// Función para obtener 6 IDs aleatorios de Pokémon, sibre los primeros 898
function getRandomPokemonIds(n = 6) {
    const ids = [];
    while (ids.length < n) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        if (!ids.includes(randomId)) {
            ids.push(randomId);
        }
    }
    return ids;
}

// Función para crear una carta de Pokemon
function crearCartaPokemon(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const header = document.createElement('div');
    header.className = 'card-header';
    header.textContent = pokemon.name;

    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image';

    const image = document.createElement('img');
    image.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    image.alt = pokemon.name;
    imageContainer.appendChild(image);

    const typesContainer = document.createElement('div');
    typesContainer.className = 'card-types';

    // Añadir cada tipo
    pokemon.types.forEach(typeInfo => {
        const typeBadge = document.createElement('span');
        typeBadge.className = `type-badge ${typeInfo.type.name}`;
        typeBadge.textContent = typeInfo.type.name;
        typesContainer.appendChild(typeBadge);
    });

    // Ensamblar la carta
    card.appendChild(header);
    card.appendChild(imageContainer);
    card.appendChild(typesContainer);

    return card;
}

function addListeners() {
    // 1 con XMLHttpRequest
    document.getElementById('xhr-btn').addEventListener('click', function () {
        const container = document.getElementById('xhr-container');
        container.innerHTML = '<div class="loading">Cargando Pokémon...</div>';

        const pokemonIds = getRandomPokemonIds();
        let loadedCount = 0;

        container.innerHTML = ''; // Limpiar contenedor

        pokemonIds.forEach(id => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const pokemon = JSON.parse(xhr.responseText);
                    const card = crearCartaPokemon(pokemon);
                    container.appendChild(card);

                    loadedCount++;
                    if (loadedCount === pokemonIds.length) {
                        console.log('XHR: Todos los Pokémon cargados');
                    }
                } else {
                    console.error('XHR: Error al cargar el Pokémon', xhr.statusText);
                }
            };

            xhr.onerror = function () {
                console.error('XHR: Error de red al realizar la solicitud');
            };

            xhr.send();
        });
    });

    // 2 con Fetch API
    document.getElementById('fetch-btn').addEventListener('click', function () {
        const container = document.getElementById('fetch-container');
        container.innerHTML = '<div class="loading">Cargando Pokémon...</div>';

        const pokemonIds = getRandomPokemonIds();
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
            .then(pokemons => {
                container.innerHTML = ''; // Limpiar contenedor
                pokemons.forEach(pokemon => {
                    const card = crearCartaPokemon(pokemon);
                    container.appendChild(card);
                });
                console.log('Fetch: Todos los Pokémon cargados');
            })
            .catch(error => {
                console.error('Fetch: Error al cargar los Pokémon', error);
                container.innerHTML = `<div class="loading">Error: ${error.message}</div>`;
            });
    });

    // 3 con jQuery 
    document.getElementById('jquery-btn').addEventListener('click', function () {
        const container = document.getElementById('jquery-container');
        $(container).html('<div class="loading">Cargando Pokémon...</div>');

        const pokemonIds = getRandomPokemonIds();
        const solicitudes = pokemonIds.map(id =>
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                type: 'GET',
                dataType: 'json'
            })
        );

        $.when(...solicitudes)
            .then(function () {
                // 'arguments' aquí contendrá los resultados de las promesas resueltas, es lo que when pasa al then
                // Su estructura varía si solicitudes es más de una

                let pokemons = [];

                // CASO N = 1:
                if (solicitudes.length === 1) {
                    // Si solo hay 1 promesa $.ajax, 'arguments[0]' es directamente el objeto Pokémon
                    // Los demás resultados (status, xhr) estarían en arguments[1], arguments[2].
                    pokemons = [arguments[0]];
                }
                // CASO N > 1:
                else {
                    // Si hay MÚLTIPLES promesas $.ajax, 'arguments' es un como array donde CADA elemento
                    // es un ARRAY con los resultados de una promesa: [[data1, s1, x1], [data2, s2, x2], ...]
                    for (let i = 0; i < solicitudes.length; i++) {
                        // arguments[i] = [data_i, status_i, xhr_i]
                        // arguments[i][0] = data_i (el objeto Pokémon de la i-ésima solicitud)
                        pokemons.push(arguments[i][0]);
                    }
                }

                $(container).empty(); // Limpiar contenedor

                pokemons.forEach(pokemon => {
                    const card = crearCartaPokemon(pokemon);
                    $(container).append(card);
                });

                console.log('jQuery: Todos los Pokémon cargados');
            })
            .fail(function (error) {
                console.error('jQuery: Error al cargar los Pokémon', error);
                $(container).html(`<div class="loading">Error: ${error.statusText}</div>`);
            });
    });
}

window.onload = () => {
    addListeners();
    document.querySelectorAll('button').forEach(boton => boton.click()); //Ejecutamos los botones al cargar

};