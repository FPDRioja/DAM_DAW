class Autor {
    constructor(nombre, nacionalidad, fechaNacimiento) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.fechaNacimiento = fechaNacimiento;
    }
}

class Libro {
    static tiposLibro = {
        NOVELA: "Novela",
        TEATRO: "Teatro",
        POESIA: "Poesía",
        ENSAYO: "Ensayo"
    }
    constructor(titulo, tipoLibro, autor, editorial, anyo) {
        this.titulo = titulo;
        this.tipoLibro = tipoLibro; //Debería ser un elemento de Libro.tiposLibro
        this.autor = autor;
        this.editorial = editorial;
        this.anyo = anyo;
    }
    toString() {
        return `${this.titulo} (${this.tipoLibro}), ${this.anyo} ${this.editorial}`;
    }
}

class Copia {
    static estadosCopia = {
        BUEN_ESTADO: "En buen estado",
        MAL_ESTADO: "En mal estado"
    }
    constructor(libro, estadoCopia) {
        this.libro = libro;
        this.estadoCopia = estadoCopia; // de la enum estadosCopia
        this.estaDisponible = true;
    }
    toString() {
        return this.libro.toString();
    }
}

class Lector {
    constructor(nSocio, nombre, telefono, direccion) {
        this.nSocio = nSocio;
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
        this.prestamos = [];
        this.multas = [];
    }
    toString() {
        return `${this.nombre}, NS:${this.nSocio}`;
    }
    prestar(copia, fechaInicioPrestamo) { //fechaFinPrestamo = null aplica la duración por defecto
        if (this.prestamos.length < 3) { // Un lector solo puede tener prestados tres libros a la vez
            // Verificar si tiene multas activas
            const multaActiva = this.multas.find(multa => multa.estaActiva(fechaInicioPrestamo));
            const prestamoRetrasado = this.prestamos.find(prestamo => prestamo.estaRetrasado(fechaInicioPrestamo));
            if (multaActiva) {
                const diasRestantes = multaActiva.diasRestantes(fechaInicioPrestamo);
                return {
                    error: true,
                    texto: `Préstamo no procede, ${this} tiene una multa activa hasta ${multaActiva.fechaFinMulta.toLocaleDateString()} (${diasRestantes} días restantes).`
                };
            } else if (prestamoRetrasado) {
                const diasRetraso = prestamoRetrasado.diasRetraso(fechaInicioPrestamo);
                return {
                    error: true,
                    texto: `Préstamo no procede, ${this} tiene un préstamo vencido de ${prestamoRetrasado.copia}, vencido hace (${diasRetraso} días).`
                };
            } else {
                const nuevoPrestamo = new Prestamo(copia, this, fechaInicioPrestamo);
                this.prestamos.push(nuevoPrestamo);
                return {
                    error: false,
                    texto: `Prestado ${copia} al lector: ${this}, hasta el ${nuevoPrestamo.fechaFinPrestamo.toLocaleDateString()}`
                };
            }
        }
        return {
            error: true,
            texto: `Préstamo no procede, ${this} ya tiene ${this.prestamos.length} préstamos activos.`
        };
    }

    devolver(prestamo, fechaDevolucion) {
        const indicePrestamo = this.prestamos.indexOf(prestamo);

        if (indicePrestamo >= 0) { // El préstamo consta
            this.prestamos.splice(indicePrestamo, 1);
            prestamo.copia.estaDisponible = true;

            const diasRetraso = prestamo.diasRetraso(fechaDevolucion);
            if (diasRetraso <= 0) {
                return {
                    error: false,
                    texto: `El usuario ${this} ha devuelto satisfactoriamente el libro ${prestamo.copia}, ${Math.abs(diasRetraso)} días antes del plazo.`
                };
            } else {
                return {
                    error: true,
                    texto: `El usuario ${this} ha devuelto retrasado el libro "${prestamo.copia}" ${diasRetraso} días después del plazo. Se ha impuesto automáticamente una sanción: ${this.multar(fechaDevolucion)}.`
                };
            }
        }
        return {
            error: true,
            texto: `La copia: ${prestamo.copia} no se encuentra entre los préstamos a ${this}`
        };
    }

    multar(fechaInicioMulta, dias) {
        let fechaFinMulta = null;
        if (dias > 0) {
            fechaFinMulta = new Date(fechaInicioMulta);
            fechaFinMulta.setDate(fechaFinMulta.getDate() + dias);
        }

        const nuevaMulta = new Multa(this, fechaInicioMulta, fechaFinMulta);
        this.multas.push(nuevaMulta);
        return `Nueva multa: ${nuevaMulta}`;
    }

}

class Prestamo {
    static DURACION_PRESTAMO_DIAS = 14; // Duración en días por defecto
    constructor(copia, lector, fechaInicioPrestamo, fechaFinPrestamo = null) {
        this.copia = copia;
        this.copia.estaDisponible = false;
        this.lector = lector;
        this.fechaInicioPrestamo = fechaInicioPrestamo;
        if (!fechaFinPrestamo) {
            fechaFinPrestamo = new Date(fechaInicioPrestamo);
            fechaFinPrestamo.setDate(fechaInicioPrestamo.getDate() + Prestamo.DURACION_PRESTAMO_DIAS);
        }
        this.fechaFinPrestamo = fechaFinPrestamo;
    }
    estaRetrasado(fecha) {
        return this.diasRetraso(fecha) > 0;
    }
    diasRetraso(fecha) {
        const unDia = 24 * 60 * 60 * 1000; // Milisegundos en un día
        return Math.ceil((fecha - this.fechaFinPrestamo) / unDia);
    }
}

class Multa {
    static DURACION_MULTA_DIAS = 10; // 10 días por defecto

    constructor(lector, fechaInicioMulta, fechaFinMulta = null) {
        this.lector = lector;
        this.fechaInicioMulta = fechaInicioMulta;
        if (!fechaFinMulta) {
            fechaFinMulta = new Date(fechaInicioMulta);
            fechaFinMulta.setDate(fechaFinMulta.getDate() + Multa.DURACION_MULTA_DIAS);
        }
        this.fechaFinMulta = fechaFinMulta;

    }

    toString() {
        return `Multa desde: ${this.fechaInicioMulta.toLocaleDateString()}, hasta: ${this.fechaFinMulta.toLocaleDateString()}, para el lector: ${this.lector}`;
    }

    // Calcular días restantes de multa para una fecha dada (>0 si aún quedan días, <0 si no)
    diasRestantes(fecha) {
        const diferenciaMili = this.fechaFinMulta.getTime() - fecha.getTime();
        return Math.ceil(diferenciaMili / (1000 * 60 * 60 * 24));
    }

    // Verifica si la multa está activa para una fecha dada
    estaActiva(fecha) {
        return fecha >= this.fechaInicioMulta && fecha <= this.fechaFinMulta;
    }
    expirarMulta() {
        this.fechaFinMulta = new Date();
        return `Multa expirada exitosamente para el lector: ${this.lector}.`
    }
}

/**
 * Esta clase hace a la vez la lógica de la biblio y su presentación al usurio
 * POdrían ser dos clases diferentes
 */
class Biblioteca {
    constructor(copias, lectores, lectorSeleccionado) {
        this.copias = copias || [];
        this.lectores = lectores || [];
        this.lectorSeleccionado = lectorSeleccionado;


        //Enganche al DOM
        this.lectorActualElement = document.querySelector('.lector_actual');
        this.prestamosLectorElement = document.querySelector('.lector_actual_prestamos');
        this.multasLectorElement = document.querySelector('.lector_actual_multas_activas');
        this.contenedorLectoresElement = document.querySelector('.lectores');
        this.contenedorLibrosElement = document.querySelector('.biblioteca_libros');
        this.btnMultar = document.getElementById('btn-multar');
        this.mensajesContainer = document.querySelector('.mensajes-container');
        this.prestamosFlexContainer = document.querySelector('.prestamos-flex');
        this.multasFlexContainer = document.querySelector('.multas-flex');
        this.lectoresFlexContainer = document.querySelector('.lectores-flex');
        this.copiasFlexContainer = document.querySelector('.copias-flex');

        this.inicializarUI();
    }

    /************************
     * 
     * Acciones de interfaz y sus eventListeners
     * Estas acciones se pueden usar desde consola como si fueran las acciones del usuario
     * 
     * */

    seleccionarLector(nSocio) {
        const lector = this.lectores.find(l => l.nSocio === nSocio);
        if (!lector) {
            this.logMensaje({ texto: `No se encontró lector con número de socio ${nSocio}`, error: true });
            return;
        }

        this.lectorSeleccionado = lector;
        this.refrescarUI();
        this.logMensaje({ texto: `Lector seleccionado: ${lector.nombre}`, error: false });
    }

    multarLector(nSocio, dias = Multa.DURACION_MULTA_DIAS) {
        const lector = nSocio ? this.lectores.find(l => l.nSocio === nSocio) : this.lectorSeleccionado;

        if (!lector) {
            this.logMensaje({ texto: "No hay lector seleccionado", error: true });
            return;
        }

        const fechaInicio = new Date();
        this.logMensaje(lector.multar(fechaInicio, dias));
        this.refrescarUI();

    }

    devolverCopia(prestamoIndex) {
        if (!this.lectorSeleccionado) {
            this.logMensaje({ texto: "No hay lector seleccionado", error: true });
            return;
        }

        const prestamo = this.lectorSeleccionado.prestamos[prestamoIndex];
        if (!prestamo) {
            this.logMensaje({ texto: "Índice de préstamo inválido", error: true });
            return;
        }

        const fechaDevolucion = new Date();
        this.logMensaje(this.lectorSeleccionado.devolver(prestamo, fechaDevolucion));
        this.refrescarUI();
    }

    prestarCopia(copiaIndex) {
        if (!this.lectorSeleccionado) {
            this.logMensaje({ texto: "No hay lector seleccionado", error: true });
            return;
        }

        const copia = this.copias[copiaIndex];
        if (!copia) {
            this.logMensaje({ texto: "Índice de copia inválido", error: true });
            return;
        }

        if (!copia.estaDisponible) {
            this.logMensaje({ texto: "La copia no está disponible", error: true });
            return;
        }

        const fechaInicio = new Date();
        this.logMensaje(this.lectorSeleccionado.prestar(copia, fechaInicio));
        this.refrescarUI();
    }

    expirarMulta(multaIndex) {
        if (!this.lectorSeleccionado) {
            this.logMensaje({ texto: "No hay lector seleccionado", error: true });
            return;
        }
        const multa = this.lectorSeleccionado.multas[multaIndex];
        if (!multa) {
            this.logMensaje({ texto: "Índice de multa inválido", error: true });
            return;
        }

        this.logMensaje(multa.expirarMulta());

        this.refrescarUI();
    }
    /**
     * Esto solo mapea los eventos a las acciones
     */
    agregarEventListeners() {
        // Multar
        this.btnMultar.addEventListener('click', () => {

            this.multarLector(this.lectorSeleccionado.nSocio);

        });

        // Selección de lector
        this.contenedorLectoresElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-seleccionar')) {
                const nSocio = parseInt(event.target.dataset.nsocio);
                this.seleccionarLector(nSocio);
            }
        });

        // Préstamo
        this.contenedorLibrosElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-prestar')) {
                const copiaIndex = parseInt(event.target.dataset.copiaIndex);
                this.prestarCopia(copiaIndex);
            }
        });

        // Devolución
        this.prestamosLectorElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-devolver')) {
                const prestamoIndex = parseInt(event.target.dataset.prestamoIndex);
                this.devolverCopia(prestamoIndex);
            }
        });
        //Expirar multa
        this.multasLectorElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-expirar-multa')) {
                const multaIndex = parseInt(event.target.dataset.multaIndex);
                this.expirarMulta(multaIndex);
            }
        });
    }
    /*************
     *  
     * Renderizados 
     * 
     * */

    inicializarUI() {
        this.agregarEventListeners();
        this.refrescarUI();
        this.logMensaje({ texto: "Biblioteca inicializada correctamente", error: false });
    }
    refrescarUI() {
        this.renderizarLectores();
        this.renderizarCopias();
        this.renderizarInfoLector();
    }

    renderizarLectores() {

        const contenedor = this.contenedorLectoresElement.querySelector('.contenedor-flex');

        contenedor.innerHTML = '';

        this.lectores.forEach(lector => {
            const lectorElement = document.createElement('div');
            lectorElement.className = 'lector-item';

            // Diferente si es el seleccionado
            if (this.lectorSeleccionado === lector) {
                lectorElement.classList.add('lector-seleccionado');
            }

            lectorElement.innerHTML = `
                <p><strong>Número de socio:</strong> ${lector.nSocio}</p>
                <p><strong>Nombre:</strong> ${lector.nombre}</p>
                <p><strong>Teléfono:</strong> ${lector.telefono}</p>
                <p><strong>Dirección:</strong> ${lector.direccion}</p>
                ${this.lectorSeleccionado !== lector ? `<button class="btn-seleccionar" data-nsocio="${lector.nSocio}">Seleccionar</button>` : ''}
            `;

            contenedor.appendChild(lectorElement);
        });
    }

    renderizarCopias() {
        const contenedor = this.contenedorLibrosElement.querySelector('.contenedor-flex');
        contenedor.innerHTML = '';

        this.copias.forEach((copia, index) => {
            const copiaElement = document.createElement('div');
            copiaElement.className = 'copia-item';

            // Estilos por estado
            if (!copia.estaDisponible) {
                copiaElement.classList.add('copia-prestada');
            } else if (copia.estadoCopia === Copia.estadosCopia.MAL_ESTADO) {
                copiaElement.classList.add('copia-mal-estado');
            }

            copiaElement.innerHTML = `
                <p><strong>Título:</strong> ${copia.libro.titulo}</p>
                <p><strong>Autor:</strong> ${copia.libro.autor.nombre}</p>
                <p><strong>Tipo:</strong> ${copia.libro.tipoLibro}</p>
                <p><strong>Editorial:</strong> ${copia.libro.editorial}</p>
                <p><strong>Año:</strong> ${copia.libro.anyo}</p>
                <p><strong>Estado:</strong> ${copia.estadoCopia}</p>
                <p><strong>Disponibilidad:</strong> ${copia.estaDisponible ? 'Disponible' : 'Prestado'}</p>
            `;

            if (copia.estaDisponible) {
                const btnPrestar = document.createElement('button');
                btnPrestar.textContent = 'Prestar';
                btnPrestar.className = 'btn-prestar';
                btnPrestar.dataset.copiaIndex = index;
                copiaElement.appendChild(btnPrestar);
            }

            contenedor.appendChild(copiaElement);
        });
    }

    renderizarInfoLector() {
        this.lectorActualElement.innerHTML = '<h3>Lector actual:</h3>';

        const prestamosContainer = this.prestamosLectorElement.querySelector('.contenedor-flex');
        const multasContainer = this.multasLectorElement.querySelector('.contenedor-flex');

        // Limpiar 
        prestamosContainer.innerHTML = '';
        multasContainer.innerHTML = '';

        // Por si no hay lector
        if (!this.lectorSeleccionado) {
            this.lectorActualElement.innerHTML += '<p>No hay lector seleccionado</p>';
            prestamosContainer.innerHTML = '<p>No hay préstamos</p>';
            multasContainer.innerHTML = '<p>No hay multas</p>';
            return;
        }

        // Lector
        const lector = this.lectorSeleccionado;
        this.lectorActualElement.innerHTML += `
            <p><strong>Número de socio:</strong> ${lector.nSocio}</p>
            <p><strong>Nombre:</strong> ${lector.nombre}</p>
            <p><strong>Teléfono:</strong> ${lector.telefono}</p>
            <p><strong>Dirección:</strong> ${lector.direccion}</p>
        `;

        // Préstamos
        if (lector.prestamos.length === 0) {
            prestamosContainer.innerHTML = '<p>No tiene préstamos activos</p>';
        } else {
            lector.prestamos.forEach((prestamo, index) => {
                const prestamoElement = document.createElement('div');
                prestamoElement.className = 'prestamo-item';

                const fechaActual = new Date();
                const estaRetrasado = prestamo.estaRetrasado(fechaActual);
                if (estaRetrasado) {
                    prestamoElement.classList.add('prestamo-retrasado');
                }

                prestamoElement.innerHTML = `
                    <p><strong>Libro:</strong> ${prestamo.copia.libro.titulo}</p>
                    <p><strong>Autor:</strong> ${prestamo.copia.libro.autor.nombre}</p>
                    <p><strong>Estado copia:</strong> ${prestamo.copia.estadoCopia}</p>
                    <p><strong>Fecha préstamo:</strong> ${prestamo.fechaInicioPrestamo.toLocaleDateString()}</p>
                    <p><strong>Fecha devolución:</strong> ${prestamo.fechaFinPrestamo.toLocaleDateString()}</p>
                    ${estaRetrasado ? '<p style="color: red;"><strong>RETRASADO</strong></p>' : ''}
                `;

                const btnDevolver = document.createElement('button');
                btnDevolver.textContent = 'Devolver';
                btnDevolver.dataset.prestamoIndex = index;
                btnDevolver.className = 'btn-devolver';
                prestamoElement.appendChild(btnDevolver);

                prestamosContainer.appendChild(prestamoElement);
            });
        }

        // Multas
        if (lector.multas.length == 0) {
            multasContainer.innerHTML = '<p>No tiene multas activas</p>';
        } else {
            lector.multas.forEach((multa, index) => {
                const multaElement = document.createElement('div');
                multaElement.className = 'multa-item';

                const fechaActual = new Date();
                const estaActiva = multa.estaActiva(fechaActual);
                const diasRestantes = multa.diasRestantes(fechaActual);

                multaElement.innerHTML = `
                    <p><strong>Fecha inicio:</strong> ${multa.fechaInicioMulta.toLocaleDateString()}</p>
                    <p><strong>Fecha fin:</strong> ${multa.fechaFinMulta.toLocaleDateString()}</p>
                    <p><strong>Estado:</strong> ${estaActiva ? 'Activa' : 'Finalizada'}</p>
                    ${estaActiva ? `<p><strong>Días restantes:</strong> ${diasRestantes}</p>` : ''}
                `;

                // Añadir botón para expirar si está activ a
                if (estaActiva) {
                    const btnExpirar = document.createElement('button');
                    btnExpirar.textContent = 'Expirar Multa';
                    btnExpirar.dataset.multaIndex = index;
                    btnExpirar.className = 'btn-expirar-multa';
                    multaElement.appendChild(btnExpirar);
                }

                multasContainer.appendChild(multaElement);
            });
        }
    }

    logMensaje(mensaje) {
        // Si no es un error puede que venga solo un string
        if (typeof mensaje === 'string') {
            mensaje = { texto: mensaje, error: false };
        }

        console.log(mensaje.error ? `ERROR: ${mensaje.texto}` : mensaje.texto);

        const mensajeElement = document.createElement('p');
        mensajeElement.className = 'mensaje';
        mensajeElement.textContent = mensaje.texto;

        // estilo si es error
        if (mensaje.error) {
            mensajeElement.classList.add('mensaje-error');
        }

        if (this.mensajesContainer.firstChild) {
            this.mensajesContainer.insertBefore(mensajeElement, this.mensajesContainer.firstChild);
        } else {
            this.mensajesContainer.appendChild(mensajeElement);
        }
        this.mensajesContainer.scrollTop = 0;
    }
}