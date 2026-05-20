$(document).ready(function () {

    /** 
     * 
     * Variables de estado
     * 
     * **/


    let filas = $('#filas').val();
    let columnas = $('#columnas').val();
    let estadoCuadricula = [];
    let juegoCorriendo = false;
    let intervaloSimulacion;
    let velocidadSimulacion = 200;
    let generacion = 0;
    let poblacion = 0;

    let patrones = {};

    $.getJSON('../data/patrones.json', function (data) {
        patrones = data;
        const selectorPatrones = $('#patrones');
        $.each(patrones, function (key, value) {
            selectorPatrones.append($('<option>').attr('value', key).text(key));
        });
    }).fail(function () {
        console.error('Error al cargar patrones.json');
        alert('No se pudieron cargar los patrones predefinidos.');
    });

    /** 
     * 
     * Funciones de utilidad
     * 
     * **/



    function crearCuadricula(numFilas, numColumnas) {
        filas = numFilas;
        columnas = numColumnas;
        estadoCuadricula = [];
        generacion = 0;
        poblacion = 0;
        $('#generacion').text(generacion);
        $('#poblacion').text(poblacion);
        $('#cuadricula').empty();

        // la cuadricula con grid
        $('#cuadricula').css({
            'grid-template-columns': `repeat(${columnas}, 15px)`,
            'grid-template-rows': `repeat(${filas}, 15px)`
        });

        for (let i = 0; i < filas; i++) {
            estadoCuadricula[i] = [];
            for (let j = 0; j < columnas; j++) {
                estadoCuadricula[i][j] = 0; // 0: muerta, 1: viva
                const celula = $('<div>').addClass('celula').attr({
                    'fila': i,
                    'columna': j
                });
                $('#cuadricula').append(celula);
            }
        }

        // Añadir evento de clic a las células (para dibujar)
        $('.celula').on('click', function () {
            const fila = parseInt($(this).attr('fila'));
            const columna = parseInt($(this).attr('columna'));
            if (estadoCuadricula[fila][columna] === 0) {
                estadoCuadricula[fila][columna] = 1;
                $(this).addClass('viva');
                poblacion++;
            } else {
                estadoCuadricula[fila][columna] = 0;
                $(this).removeClass('viva');
                poblacion--;
            }
            $('#poblacion').text(poblacion);
        });
    }

    function inicializarAleatorio() {
        if (juegoCorriendo) return;

        poblacion = 0;
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                estadoCuadricula[i][j] = Math.random() > 0.7 ? 1 : 0; // 30% de células vivas
                const celula = $(`#cuadricula .celula[fila="${i}"][columna="${j}"]`);
                if (estadoCuadricula[i][j] === 1) {
                    celula.addClass('viva');
                    poblacion++;
                } else {
                    celula.removeClass('viva');
                }
            }
        }
        $('#poblacion').text(poblacion);
    }

    function cargarPatron(nombrePatron) {
        if (juegoCorriendo) return;

        const patron = patrones[nombrePatron];
        if (!patron) {
            alert('Patrón no encontrado.');
            return;
        }

        // Limpiar la cuadrícula actual
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                estadoCuadricula[i][j] = 0;
            }
        }
        $('#cuadricula .celula').removeClass('viva');
        poblacion = 0;

        // Calcular centro
        const inicioFila = Math.floor((filas - patron.length) / 2);
        const inicioColumna = Math.floor((columnas - patron[0].length) / 2);

        // Cargar el patrón 
        for (let i = 0; i < patron.length; i++) {
            for (let j = 0; j < patron[i].length; j++) {
                if (patron[i][j] === 1) {
                    const filaCuadricula = inicioFila + i;
                    const columnaCuadricula = inicioColumna + j;
                    if (filaCuadricula >= 0 && filaCuadricula < filas && columnaCuadricula >= 0 && columnaCuadricula < columnas) {
                        estadoCuadricula[filaCuadricula][columnaCuadricula] = 1;
                        $(`#cuadricula .celula[fila="${filaCuadricula}"][columna="${columnaCuadricula}"]`).addClass('viva');
                        poblacion++;
                    }
                }
            }
        }
        $('#poblacion').text(poblacion);

    }

    function contarVecinosVivos(fila, columna) {
        let contador = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                };

                const filaVecino = fila + i;
                const columnaVecino = columna + j;

                if (filaVecino >= 0 && filaVecino < filas && columnaVecino >= 0 && columnaVecino < columnas) {
                    if (estadoCuadricula[filaVecino][columnaVecino] === 1) {
                        contador++;
                    }
                }
            }
        }
        return contador;
    }

    function calcularSiguienteGeneracion() {
        const siguienteEstadoCuadricula = [];
        let nuevaPoblacion = 0;
        let siguienteEsIgualAnterior = true; //Es la siguiente generación idéntica a la de la que veninmos? true => detener el juego
        for (let i = 0; i < filas; i++) {
            siguienteEstadoCuadricula[i] = [];
            for (let j = 0; j < columnas; j++) {
                const vecinosVivos = contarVecinosVivos(i, j);

                // Aplicar reglas 

                if (estadoCuadricula[i][j] === 1) { // Si célula viva
                    if (vecinosVivos < 2 || vecinosVivos > 3) {
                        siguienteEstadoCuadricula[i][j] = 0; // Muere
                    } else {
                        siguienteEstadoCuadricula[i][j] = 1; // Sobrevive
                        nuevaPoblacion++;
                    }
                } else { // Si célula muerta
                    if (vecinosVivos === 3) {
                        siguienteEstadoCuadricula[i][j] = 1; // Nace
                        nuevaPoblacion++;
                    } else {
                        siguienteEstadoCuadricula[i][j] = 0; // Sigue muerta
                    }
                }
                if (siguienteEsIgualAnterior) {
                    siguienteEsIgualAnterior = siguienteEstadoCuadricula[i][j] === estadoCuadricula[i][j];
                }
            }
        }
        if (siguienteEsIgualAnterior) { // Detener juego
            detenerSimulacion();
            $('#mensaje-estabilizacion').fadeIn(500);
        } else {
            estadoCuadricula = siguienteEstadoCuadricula;
            generacion++;
            poblacion = nuevaPoblacion;
            $('#mensaje-estabilizacion').fadeOut(500);
            actualizarVisualizacion();
        }
        $('#generacion').text(generacion);
        $('#poblacion').text(poblacion);

        actualizarVisualizacion();

    }

    function actualizarVisualizacion() {
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const celula = $(`#cuadricula .celula[fila="${i}"][columna="${j}"]`);
                if (estadoCuadricula[i][j] === 1) {
                    celula.addClass('viva');
                } else {
                    celula.removeClass('viva');
                }
            }
        }
    }

    /**
     * 
     * Funciones de control
     *   
    **/

    function iniciarSimulacion() {
        if (!juegoCorriendo) {
            juegoCorriendo = true;
            $('#iniciar').prop('disabled', true);
            $('#detener').prop('disabled', false);
            $('#patrones').prop('disabled', true);
            intervaloSimulacion = setInterval(function () {
                calcularSiguienteGeneracion();
            }, velocidadSimulacion);
        }
    }

    function detenerSimulacion() {
        if (juegoCorriendo) {
            juegoCorriendo = false;
            $('#iniciar').prop('disabled', false);
            $('#detener').prop('disabled', true);
            $('#patrones').prop('disabled', false);
            clearInterval(intervaloSimulacion);
        }
    }

    function reiniciarJuego() {
        detenerSimulacion();
        crearCuadricula(filas, columnas);
    }

    function pasoAPaso() {
        if (!juegoCorriendo) {
            calcularSiguienteGeneracion();
        }
    }

    /**
      * 
      * Eventos de acción
      *   
     **/

    // Evento para crear la cuadrícula al hacer clic en el botón
    $('#crear-cuadricula').on('click', function () {
        const numFilas = parseInt($('#filas').val());
        const numColumnas = parseInt($('#columnas').val());
        if (!isNaN(numFilas) && !isNaN(numColumnas) && numFilas > 0 && numColumnas > 0) {
            crearCuadricula(numFilas, numColumnas);
        } else {
            alert('Por favor, introduce números válidos para filas y columnas.');
        }
    });

    // Evento para inicializar la cuadrícula aleatoriamente
    $('#inicializar-aleatorio').on('click', function () {
        inicializarAleatorio();
    });

    // Evento para cargar el patrón seleccionado 
    $('#patrones').on('change', function () {
        const nombrePatron = $(this).val();
        if (nombrePatron) {
            cargarPatron(nombrePatron);
        }
    });

    // Eventos de los botones de control
    $('#iniciar').on('click', iniciarSimulacion);
    $('#detener').on('click', detenerSimulacion);
    $('#reiniciar').on('click', reiniciarJuego);
    $('#paso-a-paso').on('click', pasoAPaso);
    $('#velocidad').on('input', function () {
        velocidadSimulacion = 800 - $(this).val(); // Invertir valor para que mayor valor sea más rápido
        if (juegoCorriendo) {
            detenerSimulacion();
            iniciarSimulacion();
        }
    });

    /**
     * Inicio
     */

    crearCuadricula(filas, columnas);


});