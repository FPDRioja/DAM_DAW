/*
Objetos
*/
let agenda = [];
const elementoFecha = document.getElementById('fecha-hora-actual');
const formularioAnyadir = document.getElementById('form-agregar-evento');
const botonBorrar = document.getElementById('borrar-evento');
const botonMostrar = document.getElementById('mostrar-eventos');
const eventosContainer = document.getElementById('eventos-container');
/*
Funciones
*/
function parpadear() {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, 200); 
}

function comprobarAlarma() {
    agenda.forEach(evento => {
        const diferencia =  new Date() - new Date(evento.fechaHora);        
        if (diferencia > 0 && diferencia <= 5000) {
            parpadear();
        }
    });
}

function mostrarFechaHoraActual() {
    elementoFecha.innerHTML = `<strong>Fecha y Hora Actual:</strong> ${new Date().toLocaleString()}`;
}

function agregarEvento(){
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaHora = document.getElementById('fecha-hora').value;
    const importancia = Math.floor(Math.random() * 100);
    
    const nuevoEvento = {
        titulo: titulo,
        descripcion: descripcion,
        fechaHora: fechaHora,
        importancia: importancia
    };
    
    agenda.push(nuevoEvento);
    formularioAnyadir.reset();
    alert('Evento añadido correctamente');
}

function borrarEvento(){
    const tituloBorrar = prompt('Introduce el título del evento a borrar:');
    if (tituloBorrar) {
        const longitudPrevia = agenda.length;
        agenda = agenda.filter(evento => evento.titulo !== tituloBorrar); 

        if (agenda.length < longitudPrevia) {
            alert('Evento borrado correctamente');
        } else {
            alert('No se encontró ningún evento con ese título');
        }
    }
    mostrarEventos();
}

function ordenarEventosPorFecha() {
    return Array.from(agenda).sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
}

function mostrarEventos() {
    eventosContainer.innerHTML = '';  
    // NO me queda claro si hay que ordenar así al mostrar o es por orden de entrada
    const eventosOrdenados = ordenarEventosPorFecha(); 

    if (eventosOrdenados.length > 0){
        eventosOrdenados.forEach(evento => {  
            eventosContainer.innerHTML +=  `
                <div class = 'event-item'>
                    <h3>${evento.titulo}</h3>
                    <p><strong>Fecha y hora:</strong> ${new Date(evento.fechaHora).toLocaleString()}</p>
                    <p><strong>Descripción:</strong> ${evento.descripcion}</p>
                    <p><strong>Importancia:</strong> ${evento.importancia}</p>
                </div>
            `;
        });
    }else{
        eventosContainer.innerHTML =  "<p><strong>NO hay eventos registrados</strong></p>";
    }
}

/*
Eventos y timers
*/
formularioAnyadir.addEventListener('submit', function(event) {
    //Hay que evitar que el form se envíe, tenemos que capturar el evento y neutralizarlo.
    //Me pregunto tb qué pasará si pongo eventlisteners concurrentes sobre algo, por ejemplo el mismo objeto evento
    event.preventDefault();

    agregarEvento();
});

botonMostrar.addEventListener('click', mostrarEventos);
botonBorrar.addEventListener('click', borrarEvento);

//timers
setInterval(mostrarFechaHoraActual, 100);
setInterval(comprobarAlarma, 1000);


/*
Ejemplo de captura de keyup
*/
input.addEventListener('keyup', function() {
    this.value = this.value.toUpperCase();
});

/*
Ejemplo de dni
*/
input.addEventListener('keyup', function(e) {
    // Solo permitir retroceso y números
    if(this.value.length < 9 && !/^[0-9]$/.test(e.key) && e.key !== 'Backspace') {
        this.value = this.value.slice(0, -1); //elimina el último carácter introducido
    }
    // En posición 9 solo permitir letras
    if(this.value.length === 9 && !/^[a-zA-Z]$/.test(e.key) && e.key !== 'Backspace') {
        this.value = this.value.slice(0, -1);
    }
 });
