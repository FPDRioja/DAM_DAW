// Autores
const camus = new Autor("Albert Camus", "Francia", new Date("1913-11-07"));
const sartre = new Autor("Jean-Paul Sartre", "Francia", new Date("1905-06-21"));
const beauvoir = new Autor("Simone de Beauvoir", "Francia", new Date("1908-01-09"));
const kierkegaard = new Autor("Søren Kierkegaard", "Dinamarca", new Date("1813-05-05"));
const nietzsche = new Autor("Friedrich Nietzsche", "Alemania", new Date("1844-10-15"));
const unamuno = new Autor("Miguel de Unamuno", "España", new Date("1864-09-29"));
const dostoievski = new Autor("Fiódor Dostoievski", "Rusia", new Date("1821-11-11"));
const neruda = new Autor("Pablo Neruda", "Chile", new Date("1904-07-12"));
const paz = new Autor("Octavio Paz", "México", new Date("1914-03-31"));

// Libros
const libros = [
    new Libro("El extranjero", Libro.tiposLibro.NOVELA, camus, "Gallimard", 1942),
    new Libro("El mito de Sísifo", Libro.tiposLibro.ENSAYO, camus, "Gallimard", 1942),
    new Libro("La peste", Libro.tiposLibro.NOVELA, camus, "Gallimard", 1947),
    new Libro("El hombre rebelde", Libro.tiposLibro.ENSAYO, camus, "Gallimard", 1951),
    new Libro("El ser y la nada", Libro.tiposLibro.ENSAYO, sartre, "Gallimard", 1943),
    new Libro("La náusea", Libro.tiposLibro.NOVELA, sartre, "Gallimard", 1938),
    new Libro("El segundo sexo", Libro.tiposLibro.ENSAYO, beauvoir, "Gallimard", 1949),
    new Libro("Temor y temblor", Libro.tiposLibro.ENSAYO, kierkegaard, "Reitzel", 1843),
    new Libro("El concepto de la angustia", Libro.tiposLibro.ENSAYO, kierkegaard, "Reitzel", 1844),
    new Libro("Así habló Zaratustra", Libro.tiposLibro.ENSAYO, nietzsche, "Ernst Schmeitzner", 1883),
    new Libro("Del sentimiento trágico de la vida", Libro.tiposLibro.ENSAYO, unamuno, "Renacimiento", 1912),
    new Libro("Crimen y castigo", Libro.tiposLibro.NOVELA, dostoievski, "El Mensajero Ruso", 1866),
    new Libro("Veinte poemas de amor y una canción desesperada", Libro.tiposLibro.POESIA, neruda, "Editorial Nascimento", 1924),
    new Libro("Canto general", Libro.tiposLibro.POESIA, neruda, "Talleres Gráficos de la Nación", 1950),
    new Libro("Piedra de sol", Libro.tiposLibro.POESIA, paz, "Fondo de Cultura Económica", 1957),
    new Libro("Libertad bajo palabra", Libro.tiposLibro.POESIA, paz, "Tezontle", 1949)
];

// Copias 
const copiasLibros = [];
libros.forEach(libro => {
    copiasLibros.push(new Copia(libro, Copia.estadosCopia.BUEN_ESTADO));
    copiasLibros.push(new Copia(libro, Copia.estadosCopia.MAL_ESTADO));
});

console.log("\n")
console.log("***** COPIAS DISPONIBLES *****");
copiasLibros.forEach((copia, index) => {
    console.log(`${copia}`);
});

// Lectores
const lector1 = new Lector(1001, "Juan UsuarioNormal", "611111111", "Calle Principal 1, Madrid");
const lector2 = new Lector(1002, "Pedro UsuarioConPrestamos", "622222222", "Calle Principal 2, Madrid");
const lector3 = new Lector(1003, "María UsuarioMultado", "633333333", "Calle Principal 3, Madrid");
const lector4 = new Lector(1004, "Ana UsuarioRetrasado", "644444444", "Calle Principal 4, Madrid");

const lectores = [lector1, lector2, lector3, lector4];

// Metemos  alguna actividad
function estadoBibliotecaInicial(biblioteca) {

    biblioteca.seleccionarLector(lector2.nSocio); 
    biblioteca.prestarCopia(0);
    biblioteca.prestarCopia(2);
    
    biblioteca.seleccionarLector(lector3.nSocio); 
    biblioteca.multarLector(); 
    
    biblioteca.seleccionarLector(lector4.nSocio); 
    biblioteca.prestarCopia(4); 
    
    const usuarioRetrasado = lector4;
    if (usuarioRetrasado.prestamos.length > 0) {
        const fechaRetrasada = new Date();
        fechaRetrasada.setDate(fechaRetrasada.getDate() - 20);
        usuarioRetrasado.prestamos[0].fechaFinPrestamo = fechaRetrasada;
        const fechaRetrasadaI = new Date();
        fechaRetrasadaI.setDate(fechaRetrasadaI.getDate() - 30);
        usuarioRetrasado.prestamos[0].fechaInicioPrestamo = fechaRetrasadaI;
    }
    

    biblioteca.refrescarUI();
    

    biblioteca.seleccionarLector(lector1.nSocio);
}


document.addEventListener('DOMContentLoaded', function () {
    const biblioteca = new Biblioteca(copiasLibros, lectores);
    window.biblioteca = biblioteca; //Acceso desde consola
    estadoBibliotecaInicial(biblioteca);
    biblioteca.logMensaje('Interfaz lista a la espera de acciones de usuario, se ha generado un estado que trata de explorar todos los escenarios. ')
});