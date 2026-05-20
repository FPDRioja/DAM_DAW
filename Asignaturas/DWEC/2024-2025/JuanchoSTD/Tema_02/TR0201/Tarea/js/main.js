/*
1. Escribe una función JavaScript que diga si una cadena de caracteres es un palíndromo. 

Cadena de ejemplo: "Allí ves a Sevilla"

Salida esperada : true

Pista: tienes que ignorar los espacios, las mayúsculas y los acentos, es decir que "Allí ves a Sevilla" se tiene que tratar como si fuera: "allivesasevilla"
*/

function esPalindromo(frase){
    let caracteresAEliminar = " ,.;:-_/\\´`¡¿!?'()[]{}"
    let vocalesConTilde = "áéíóú"
    let vocalesSinTilde = "aeiou"
    let fraseLimpia = frase.toLowerCase()
    for (let index = 0; index < caracteresAEliminar.length; index++) {
        const element = caracteresAEliminar[index];
        fraseLimpia = fraseLimpia.replaceAll(element, '');
    }
    for (let index = 0; index < vocalesConTilde.length; index++) {
        const element = vocalesConTilde[index];
        fraseLimpia = fraseLimpia.replaceAll(element, vocalesSinTilde[index]);
    }

    let esPalindromo = true;
    for (let index = 0; index < fraseLimpia.length / 2; index++) {
        const element = fraseLimpia[index];
        const elementInverso = fraseLimpia[fraseLimpia.length - index - 1]
        esPalindromo = esPalindromo && element == elementInverso;
    }
    return esPalindromo;
}

function ejercicio1() {

    let frase = window.prompt('Dame una frase...');
    
    /*
    ¿Acaso hubo búhos acá?
    Anita lava la tina
    Dábale arroz a la zorra el abad
    */
    let siono_str = "NO";
    if (esPalindromo(frase)) {
        siono_str = "SÍ"
    }

    alert("La frase: '" + frase + "', " + siono_str + " es un palíndromo.")
}

/*
2. Escribe una función llamada obtenerIniciales que tome un nombre completo como parámetro y devuelva las iniciales de cada palabra en el nombre. Debes combinar las funciones split y substr para lograr esto.

Ejemplo de uso:

console.log(obtenerIniciales("John Doe")); // Salida esperada: "JD"

console.log(obtenerIniciales("Alice Johnson Smith")); // Salida esperada: "AJS"
*/

function obtenerIniciales(nombreCompleto){
    palabras = nombreCompleto.split(" ");
    let iniciales = "";
    for (let index = 0; index < palabras.length; index++) {
        iniciales += palabras[index][0];       
    }
    return iniciales;
}

function ejercicio2() {
    let nombre = prompt('Hola, dime tu nombre, por favor:', "Juan Cruz Garrido Suso");
    alert("Hola, " + nombre + ", tus iniciales son " + obtenerIniciales(nombre));
}

/*
3. Escribe una función llamada revertirPalabras que tome una oración como parámetro y devuelva la oración con las palabras en orden inverso.

Ejemplo de uso:

console.log(revertirPalabras("Hola, cómo estás")); // Salida esperada: "estás cómo Hola,"

console.log(revertirPalabras("JavaScript es increíble")); // Salida esperada: "increíble es JavaScript"
*/

function revertirPalabras(oracion){
    let palabras = oracion.split(" ");
    palabras = palabras.reverse();
    let oracionAlReves = "";
    palabras.forEach(element => {
        oracionAlReves += element + " ";
    });
    return oracionAlReves;
}

function ejercicio3() {
    let oracion = prompt('Hola, dime una frase, por favor:', "JavaScript es increíble");
    alert("La frase al revés es: " + revertirPalabras(oracion));
}

/*
4. Escribe una función JavaScript que tome una cadena y desplace cada letra un lugar en el alfabeto (a -> b, b -> c, ..., z -> a).

Cadena de ejemplo: 'Desarrollo'.

Resultado esperado: 'Eftbsspmmp'.

*/
function desplazarLetra(palabra){
    alfabeto = "abcdefghijklmnñopqrstuvwxyz".split('');
    let palabraDesplazada = "";
    palabra.split('').forEach(element => {
        let esMayuscula = false;
        if (element == element.toUpperCase()){
            esMayuscula = true;
            element = element.toLowerCase();
        }
        let indice = alfabeto.indexOf(element);
        if (indice == alfabeto.length - 1){
            indice = 0
        }
        if (esMayuscula){
            palabraDesplazada += alfabeto[indice + 1].toUpperCase();
        }else{
            palabraDesplazada += alfabeto[indice + 1];
        }
    });
    return palabraDesplazada;
}

function ejercicio4() {
    let palabra = prompt('Dame una palabra:', 'Desarrollo');
    alert("La frase desplazada es: " + desplazarLetra(palabra));
}

/*
5. Escribe una función de JavaScript que acepte una cadena como parámetro y cuente el número de vocales dentro de la cadena. 

Ejemplo de cadena: "El rápido zorro marrón"

Producción esperada: 8
*/

function contarVocales(frase) {
    vocales = "aeiouáéíóúäëïöüàèìòù";
    cont = 0;
    frase.split('').forEach(element => {
        // if (element.toLowerCase() in vocales.split('')){ //Esto no funciona y no sé xk
        if (vocales.indexOf(element.toLowerCase()) >= 0 ){
            cont++;
        }
    });
    return cont;
}

function ejercicio5(){
    let frase = prompt('Dame una frase:', 'El rápido zorro marrón');
    alert("El número de vocales es: " + contarVocales(frase));
}
/*
6. Escribe una función JavaScript que acepte un argumento y devuelva el tipo.

Nota: Hay seis posibles valores que el tipo de retornos: objeto, booleano, función, número, cadena e undefined.
*/
function obtenerTipo(objeto){

    return typeof objeto;

}
function ejercicio6() {
    let objeto = prompt('Dame algo:', 'El rápido zorro marrón');
    alert("Me has dado algo del tipo: " + obtenerTipo(objeto));
}

/*
7. Escribe una función de JavaScript para convertir una cantidad X de dinero en monedas. A la función se le deben pasar los valores de las monedas 
en las que queremos cambiar mediante un array

Función de la muestra : cantodadMonedas(46, [25, 10, 5, 2, 1])

Aquí 46 es la cantidad. y 25, 10, 5, 2, 1 son las monedas.

Salida: 25, 10, 10, 1
*/

function cantidadMonedas(cantidad, arrMonedas){
    function comparaNumeros(a,b){
        return b-a;
    }
    arrMonedas = arrMonedas.sort(comparaNumeros); //Ordenamos de mayor a menor
    let monedasResultantes = [];
    let cantTemp = 0;
    arrMonedas.forEach(moneda => {
        let cantidadRestante = cantidad - cantTemp;
        let numeroMonedas = Math.floor(cantidadRestante / moneda);
        for (let index = 0; index < numeroMonedas; index++) {
            monedasResultantes.push(moneda) ;    
        }
        cantTemp += numeroMonedas * moneda;
    });
    return monedasResultantes;

}

function ejercicio7(){
   let cantidad = prompt("Dime una cantidad de dinero: ", 46);
   let arrMonedas = prompt("Dame una lista de monedas: ", [25, 10, 5, 2, 1]);
   alert("El resultado es: " +  cantidadMonedas(Number(cantidad), arrMonedas.split(',')));  
}

/*
8. Escribe una función llamada extraerDominio que tome una dirección de correo electrónico como parámetro y devuelva solo el dominio (sin el @).

ejemplo:

console.log(extraerDominio("usuario@example.com")); // Salida esperada: "example.com"

console.log(extraerDominio("otrousuario@gmail.com")); // Salida esperada: "gmail.com"
*/

function extraerDominio(email){
    splited = email.split('@');
    return splited[1];
}
function ejercicio8(){
    let email = prompt("Dame un email: ", "perico@hotmail.com");
    alert("El dominio de ese email es: " + extraerDominio(email));
}

/*
9. Escribe una función de JavaScript que genere una cadena (de longitud especificada) de caracteres aleatorios.

Ejemplo de lista de caracteres válidos: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
*/
function generarCadenaAleatoria(numeroCaracteres){
    let caracteresValidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    function obtenerIndiceAleatorio(){
        return Math.floor(Math.random()*caracteresValidos.length);
    }
    cadenaResultante = "";
    for (let index = 0; index < numeroCaracteres; index++) {
        cadenaResultante += caracteresValidos[obtenerIndiceAleatorio()]   
    }
    return cadenaResultante;
}
function ejercicio9(){
    let numeroCaracteres = prompt("Dame un número de carácteres ara la cadena: ", 10);
    alert ("UNa cadena aleatoria es: " + generarCadenaAleatoria(Number(numeroCaracteres)));
}

