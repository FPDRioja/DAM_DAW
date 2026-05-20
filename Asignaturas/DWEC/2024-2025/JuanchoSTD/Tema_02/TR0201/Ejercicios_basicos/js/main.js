/*
1-Recoge una cadena mediante prompt y comprueba si es un palíndromo, muestra un alert con el resultado.
*/

function ejercicio1() {

    let frase = window.prompt('Dame una frase...');
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

    /*
    ¿Acaso hubo búhos acá?
    Anita lava la tina
    Dábale arroz a la zorra el abad
    */

    let siono_str = "NO";
    if (esPalindromo) {
        siono_str = "SÍ"
    }

    alert("La frase: '" + frase + "', " + siono_str + " es un palíndromo.")
}

/*
2-Realiza un programa que funcione de la siguiente forma:

a) El programa nos pregunta nuestro nombre mediante promt.

b) El programa nos pregunta nuestra edad mediante promt.

c) El programa muestra un alert saludándonos por nuestro nombre y a continuación los días que hemos vivido hasta el momento (deberías multiplicar la edad por 365)


*/
function ejercicio2() {
    let nombre = prompt('Hola, dime tu nombre, por favor:');
    let edad = prompt("Ahora tu edad:");
    alert("Hola, " + nombre + ", has vivido " + (parseInt(edad) * 365).toString() + " días.");

}

/*
3- Haz un programa que escriba todos los múltiplos de 23 inferiores a 1000 y por último nos dé la suma de todos ellos.
*/

function ejercicio3() {
    let limite_superior = parseInt(prompt("Dime el límite superior para encontrar cuántos múltiplos hay: ", 1000));
    let numero = parseInt(prompt("De qé número deben ser los múltiplos: ", 23));
    let multiplosEncontrados = [];
    for (let index = 1; index <= limite_superior; index++) {
        multiplo = index * numero;
        if (multiplo <= limite_superior) {
            multiplosEncontrados.push(multiplo);
        } else {
            break;
        }
    }
    alert("Múltiplos encontrados: " + multiplosEncontrados);
}

/*
4- Recoge el alto y el ancho de una tabla mediante prompt. Escribe en el body una tabla de esas medidas, que muestre los números desde el 1 hasta el número de celdas.

Por ejemplo, para las entradas: alto 2, ancho 5.

El programa debe escribir en la página:
1 	2 	3 	4 	5
6 	7 	8 	9 	0

Ayuda: document.write("<table>");

*/
function ejercicio4() {
    let alto = parseInt(prompt("Dime el alto de la tabla: ", 5));
    let ancho = parseInt(prompt("Dime el ancho de la tabla: ", 5));
    let tabla = document.createElement("table");

    let titulo = document.createElement("h2");
    titulo.textContent = "Ejercicio 4, con alto: " + alto.toString() + ", ancho: " + ancho.toString();
    resultados_div = document.getElementById("resultados");
    resultados_div.appendChild(titulo);
    resultados_div.appendChild(tabla);

    cont = 1;
    for (let fila = 0; fila < alto; fila++) {
        fila_tabla = tabla.insertRow(fila);
        for (let columna = 0; columna < ancho; columna++) {
            let celda = fila_tabla.insertCell();
            celda.textContent = cont
            cont++;
        }
    }
}

/*
5-Modifica el ejercicio anterior para que, en lugar de cada número primo, aparezca la palabra “primo” o una "p"
Por ejemplo, para las entradas: alto 2, ancho 5.

El programa debe escribir en la página:
p 	p 	p 	4 	p
6 	p 	8 	9 	0
*/
function ejercicio5() {
    function esPrimo(numero) {
        for (let index = 2; index < numero; index++) {
            resto = numero % index;
            if (resto == 0) {
                return false;
            }
        }
        return true;
    }
    let alto = parseInt(prompt("Dime el alto de la tabla: ", 2));
    let ancho = parseInt(prompt("Dime el ancho de la tabla: ", 5));
    let tabla = document.createElement("table");

    let titulo = document.createElement("h2");
    titulo.textContent = "Ejercicio 5, con alto: " + alto + ", ancho: " + ancho;
    resultados_div = document.getElementById("resultados");
    resultados_div.appendChild(titulo);
    resultados_div.appendChild(tabla);

    cont = 1;
    for (let fila = 0; fila < alto; fila++) {
        fila_tabla = tabla.insertRow(fila);
        for (let columna = 0; columna < ancho; columna++) {
            let celda = fila_tabla.insertCell();
            contenido = cont;
            if (esPrimo(cont)) {
                contenido = "P"
            }
            celda.textContent = contenido;
            cont++;
        }
    }
}

/*
6-Modifica el ejercicio 2 para que además de las medidas, pida un colspan. A partir de la segunda fila deberá unir las celdas según pidan los parámetros, si el ancho no es divisible por el colspan, se deben dejar tantas celdas sin colspan como se necesiten.

Por ejemplo, para las entradas: alto 3, ancho 5, colspan 2.
*/
function ejercicio6() {
    let alto = parseInt(prompt("Dime el alto de la tabla: ", 5));
    let ancho = parseInt(prompt("Dime el ancho de la tabla: ", 5));
    let colSpan = parseInt(prompt("Dime el col span: ", 2));
    let tabla = document.createElement("table");

    let titulo = document.createElement("h2");
    titulo.textContent = "Ejercicio 6, con alto: " + alto.toString() + ", ancho: " + ancho.toString() + " y col span: " + colSpan.toString();
    resultados_div = document.getElementById("resultados");
    resultados_div.appendChild(titulo);
    resultados_div.appendChild(tabla);

    cont = 1;
    for (let fila = 0; fila < alto; fila++) {
        fila_tabla = tabla.insertRow(fila);
        for (let columna = 0; columna < ancho; columna++) {
            if (fila < 1) {
                let celda = fila_tabla.insertCell();
                celda.textContent = cont;
            } else {
                let celda = fila_tabla.insertCell();
                celda.textContent = cont;
                celda.colSpan = colSpan;
                columna += colSpan-1;              
            }
            cont++;
        }
    }
}

/*
7-Crea un formulario de manera dinámica. Cada vez que se entre en la web se 
pedirá mediante promt el número de campos que debe tener el formulario, y para 
cada uno de ellos el tipo (Texto, password o botón), el nombre y el valor por defecto. 
Seguidamente se creará un formulario plenamente funcional con los parámetros indicados.
*/
function ejercicio7(){
    function preguntaTipo(index){
        let tipoDato = prompt("Qué tipo de datos (t, p, b) tiene el campo número: " + (index+1), 't')
        if (['t', 'p', 'b'].includes(tipoDato)){
            return tipoDato;
        }else{
            alert("Valor no válido, elige uno entre t, p y b");
            return preguntaTipo(index);
        }
    }
    function preguntaNombre(index){
        return prompt("Qué nombre tiene el campo número: " + (index+1), 'Prueba')
    }
    function preguntaValorPorDefecto(index){
        return prompt("Qué valor por defecto tiene el campo número: " + (index+1), 'por defecto')
    }
    let numeroCampos = prompt("Dime el número de campos del formulario", 2);
    let tipoDatos = [];
    let nombreCampos = [];
    let valoresPorDefecto = [];
    for (let index = 0; index < numeroCampos; index++) {
        tipoDatos.push(preguntaTipo(index));    
        nombreCampos.push(preguntaNombre(index));
        valoresPorDefecto.push(preguntaValorPorDefecto(index)); 
    }

    let formulario = document.createElement("form");
    let titulo = document.createElement("h2");
    titulo.textContent = "Ejercicio 7, con nº campos: " + numeroCampos + ", y sus tipos: " + tipoDatos;
    resultados_div = document.getElementById("resultados");
    resultados_div.appendChild(titulo);
    resultados_div.appendChild(formulario);

    for (let index = 0; index < numeroCampos; index++) {
        tipo = tipoDatos[index];
        let tipoHtml = "";
        if (tipo == 't'){
            tipoHtml = "text"
        }
        if (tipo == 'p'){
            tipoHtml = "password"
        }
        if (tipo == 'b'){
            tipoHtml = "button"
        }
        let elemento = document.createElement("input");
        elemento.type = tipoHtml;
        elemento.name = nombreCampos[index];
        elemento.defaultValue = valoresPorDefecto[index];
        formulario.appendChild(elemento);
        formulario.appendChild(document.createElement("br"));
    }

    
}

