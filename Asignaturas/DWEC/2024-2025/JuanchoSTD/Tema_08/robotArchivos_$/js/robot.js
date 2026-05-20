
/**
 * Funciones auxiliares y constantes
 */

const palabrasAExcluir = [
    // Artículos
    "el", "la", "lo", "los", "las", 
    "un", "una", "uno", "unos", "unas",
    
    // Preposiciones
    "a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", 
    "durante", "en", "entre", "hacia", "hasta", "mediante", 
    "para", "por", "según", "sin", "sobre", "tras", "versus", "vía",
    
    // Conjunciones comunes
    "y", "e", "ni", "o", "u", "pero", "mas", "sino", "aunque",
    "porque", "pues", "que", "si", "como", "luego", "cuando",
    "mientras", "antes", "donde",
    
    // Pronombres Personales
    "yo", "tu", "el", "ella", "ello", 
    "nosotros", "nosotras", "vosotros", "vosotras", "ellos", "ellas",
    "me", "mi", "conmigo",
    "te", "ti", "contigo",
    "le", "la", "lo", "se", "si", "consigo",
    "nos",
    "os",
    "les", "las", "los", 

    // Contracciones
    "al", "del",
    
    // Demostrativos
    "este", "esta", "esto", "estos", "estas",
    "ese", "esa", "eso", "esos", "esas",
    "aquel", "aquella", "aquello", "aquellos", "aquellas",
    
    // Posesivos
    "mi", "mis", "mío", "mía", "míos", "mías",
    "tu", "tus", "tuyo", "tuya", "tuyos", "tuyas",
    "su", "sus", "suyo", "suya", "suyos", "suyas",
    "nuestro", "nuestra", "nuestros", "nuestras",
    "vuestro", "vuestra", "vuestros", "vuestras",
    
    // Relativos
    "que", "cual", "cuales", "quien", "quienes", "cuyo", "cuya", "cuyos", "cuyas",
    "donde", "cuando",
    
    // Otros nexos y partículas frecuentes
    "tan", "tanto", "tanta", "tantos", "tantas",
    "tal", "tales",
    "así", "mientras", "sino", "pues", "también",
    "otro", "otra", "otros", "otras",
    "cada", "todo", "toda", "todos", "todas",
    "mucho", "mucha", "muchos", "muchas",
    "poco", "poca", "pocos", "pocas",
    "bastante", "bastantes",
    "demasiado", "demasiada", "demasiados", "demasiadas",
    "más", "menos", "muy",
    "casi", "aproximadamente", "cerca",
    "solo", "sólo", "solamente",
    "junto", "juntos", "juntas", 
    "sí", "no", 

    //Palabras específicas de este documento que sobran
    "editar", "v", "c"

];


function escribeDerecha(texto){
    document.getElementById('derecha').innerHTML = document.getElementById('derecha').innerHTML + texto;
}

function arrayPalabras(textoElemento){
   
    return textoElemento
    // Pasasmos todo a minúsculas
    .toLowerCase()
    // Quitamos todos esos signos de puntuación y los dejamos en un espacio en blanco
    .replace(/[\[\](){}¿?¡!.,;:_'"]/g, ' ')
    // Mantenemos las letras normales del castellano y el espacio simple, sacamos lo demás
    .replace(/[^a-záéíóúüñ\s]/g, '')
    //Aún podrían quedar espacios dobles
    .replace(/[\s]+/g, " ")
    // Así quitamos espacios de inicio y fin
    .trim()
    //Ahora sí, generamos un array basándonos en el espacio en blanco
    .split(' ')
    //Aunque, aún así, debo filtrarlo para quitar cadenas vacías que siguern apareciendo.
    .filter(palabra => palabra.length > 0); 
}

// Devolvemos un diccionario de las palabras y sus ocurrencias, admitimos diferentes atributos para el valor, aunque dejamos textContent por defecto
function cuentaPalabras(elementos, atributos=['textContent']){
    elementos = Array.from(elementos);//Por si acaso
    atributos = Array.from(atributos);

    const conteoPalabras = {}

    elementos.forEach(elemento => {
        let palabras = []
        atributos.forEach(atributo => {
            //Es un poco muy feo, pero filtraré aquí la url que tiene la página 
            //De todos modos hay una aproximación más general pero menos precisa en el ejercicio, aplico las dos, aunque ninguna es corrrecta del todo
            // Las url's pueden tener valor o no, es difícil de saber a priori
            if (atributo == 'pathname'){
                if (elemento.pathname != window.location.pathname){
                    palabras = [...palabras, ...arrayPalabras( elemento[atributo])];
                }               
            }else{
                palabras = [...palabras, ...arrayPalabras(elemento[atributo])];
            }
        });

        // Rellenamos el diccionario y contamos
        palabras.forEach(palabra => {
            //filtramos las palabras auxiliares
            if (!palabrasAExcluir.includes(palabra)){
                // Si no está en el diccionario la pongo con contador a cero
                if (!conteoPalabras[palabra]){ 
                    conteoPalabras[palabra] = 0;    
                }
                conteoPalabras[palabra] = conteoPalabras[palabra] + 1;
            } 
        });
    });

    return conteoPalabras;
}

/*
Da la lista de palabras visibles para el usuario según el orden en el que apartecen
*/
function getListaPalabrasLegibles(){
    const elementos = Array.from(document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('*'));
    let palabrasOrdenadas = [];
    elementos.forEach(elemento => {  
        palabrasOrdenadas = [...palabrasOrdenadas, ...arrayPalabras(elemento.textContent)];
    });
    return palabrasOrdenadas;
}


function getMatrizPalabrasOrdenadas(diccionarioPalabras){

    //Ahora vamos a ordenar
    //LO voy a hacer consgtruyendo una matriz con el diccionario y ordenando según el número de ocurrencias
    const palabrasMatrix = [];

    for (let palabra in diccionarioPalabras){
        // cada elemento de la lista tendrá una lista con dos elementos: la palabra y las veces que aparece
        palabrasMatrix.push([palabra, diccionarioPalabras[palabra]]);
    }
    //Ordeno según la segunda columna(la de las ocurrencias de la palabara) 
    //Incluyo tb la posibilidad de orddenar alfabéticamente en caso de que el numero de ocurrencias coincida 
    function determinaOrden(a,b){
        if (b[1] == a[1]){
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    }
    palabrasMatrix.sort(determinaOrden);
    
    return palabrasMatrix;

}

/*
Realiza una intersección por claves de dos diccionarios manteniendo el valor del primero
*/
function interseccion(dictPalabras, dictReferencia){
    dictPalabrasFiltradas = {};
    for (let palabra in dictPalabras){
        if (palabra in dictReferencia){
            dictPalabrasFiltradas[palabra] = dictPalabras[palabra];
        }
    }
    return dictPalabrasFiltradas;
}

/*
"Une": Junta los dos diccionarios y suma el total de ocurrencias
*/
function union(cpUno, cpDos){
    conteoPalabrasUnido = {};
    for (let palabra in cpUno) {
        conteoPalabrasUnido[palabra] = cpUno[palabra];
    }
    for (let palabra in cpDos) {
        conteoPalabrasUnido[palabra] = (cpUno[palabra] || 0) + cpDos[palabra]; 
    }
    return conteoPalabrasUnido;
}

/*
"Pondera", es decir, en este escenario, multiplica el numero de ocurrencias por un numero dado y refresa así su valor
Admito la posibilidad de usar escala logarítmica para poder relacionar por orden de magnitud
*/
function ponderaOcurrenciasPalabras(conteoPalabras, factor, usarLog = false){
    const conteoPalabrasPonderado = {};
    for (let palabra in conteoPalabras) {
        if (usarLog){
            conteoPalabrasPonderado[palabra] = Math.log(conteoPalabras[palabra] + 1) * factor; //EL log de cero no existe, sumando uno si algo no sucede pasará a valer 0
        }else{
            conteoPalabrasPonderado[palabra] = conteoPalabras[palabra] * factor;
        }
    }
    return conteoPalabrasPonderado;

}

function textoLista(palabrasAmostrar){
    let texto = ""
    for (let index = 0; index < palabrasAmostrar.length; index++) {
        const element = palabrasAmostrar[index];
        texto += (index + 1).toString() + ". <b>" + palabrasAmostrar[index][0] + "</b> aparece " + palabrasAmostrar[index][1].toString() + " veces. <br>";   
    }
    return texto;
}

/**
 * Funciones de ejercicios
 */
function escribeMasfrecuentesH2H3(){
    // elementos del dom
    const elementos = document.querySelector("div#izquierda").querySelectorAll('h2, h3');

    const conteoPalabras = getMatrizPalabrasOrdenadas(cuentaPalabras(elementos));

    let texto = "<br>" + "Palabras con más apariciones en títulos h2 y h3:" + "<br>"

    texto += textoLista(conteoPalabras.slice(0,10));

    escribeDerecha(texto);
}

function escribeMasfrecuentesNegrita(){
    // elementos del dom
    const elementos = document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('b');
    const conteoPalabras = getMatrizPalabrasOrdenadas(cuentaPalabras(elementos));

    let texto = "<br>" + "Palabras con más apariciones en negrita:" + "<br>"

    texto += textoLista(conteoPalabras.slice(0,10));
    escribeDerecha(texto);
}

function escribeMasfrecuentesEnPiesDeImagen(){
    // CRreo que esta clase está siempre presente en los pies de foto de este documento
    const elementos = document.querySelector("#izquierda").querySelectorAll(".thumbcaption");
    const conteoPalabras = getMatrizPalabrasOrdenadas(cuentaPalabras(elementos));

    let texto = "<br>" + "Palabras con más apariciones en pies de fotos:" + "<br>"

    texto += textoLista(conteoPalabras.slice(0,10));
    escribeDerecha(texto);
}

// Aquí interpreto que es sobre lo que el usuario ve, y asumo que eso está solo en textContent
function escribeMasfrecuentesTodoElDOM(){
    // elementos con textContent del dom, ojo
    const elementos = document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('*');
    const conteoPalabras = getMatrizPalabrasOrdenadas(cuentaPalabras(elementos));

    let texto = "<br>" + "Palabras con más apariciones en el documento:" + "<br>"

    texto += textoLista(conteoPalabras.slice(0,10));
    escribeDerecha(texto);
}

function conteoPalabrasEnlaces(){
    //enlaces
    const elementos = document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('a');
    const conteoPalabras = cuentaPalabras(elementos, ['textContent', 'pathname']); //Ojito, pathname y aún no ordeno
    const conteoOrdenado = getMatrizPalabrasOrdenadas(conteoPalabras); //lo dejo por si se quiere depurar
    /*
     Aqui, como salen las url's referenciadas en local y de diferentes orígenes, voy a eleiminar las palabras que 
     no aparezcan también al menos una vez en escribeMasfrecuentesTodoElDOM
    */
    const elementosDOM = document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('*');
    const conteoPalabrasDOM = cuentaPalabras(elementosDOM);
    //Intersección
    return interseccion(conteoPalabras, conteoPalabrasDOM);
}

function escribeMasFrecuentesEnlaces(){
    //Ordenado
    const conteoFiltradoOrdenado = getMatrizPalabrasOrdenadas(conteoPalabrasEnlaces());

    let texto = "<br>" + "Palabras con más apariciones en los enlaces(url y descripción):" + "<br>"
    texto += "<p><b>Nota: </b>Aquí he aplicado un par de filtros, por un lado elimino la url de la página " 
    + window.location.href 
    + " y además excluyo cualquier palabra que no aparezca en el documento que ve el usuario.</p>"
    
    texto += textoLista(conteoFiltradoOrdenado.slice(0,10));

    escribeDerecha(texto); 

}

function escribeAnalisis(){
    escribeDerecha("<br><h2>Explicación de cuál es el tema de la web</h2>");
    escribeDerecha("<br><p>" + "Descripción de metodología:" + "</p><br>");
    escribeDerecha("<br><p>" + "Divido esta tarea en dos partes, la primera es mi propia exploración y en el segundo apartado realizo una búsqueda de parámetros como se propone en el ejercicio." + "</p><br>");
    escribeDerecha("<br><p><b>" + "Exploración de posibles técnicas:" + "</b></p><br>");
    
    escribeDerecha("<p>Conociendo el número de veces que cada término aparece en la página según su localización, podemos ponderar la importancia relativa de su posición. \
        En este caso, aplico un factor de 5 a estar en un título, de 3 a ser negrita o estar en un enlace, y uno a ser visible o estar en pié de imagen. </p>\
        <p>Además aplico logaritmos para relacionar así por orden de magnitud, es decir, es más importante pasar de 1 a 2 que de 10 a 11.</p>\
        <p>Con eso ordeno y escribo los diez elementos ordenados según esa técnica</p>");
    
       
     /*
    Buena parte de este códido es exploratorio, al final aplico todas las técnicas seguidas sin ajustar demasiado los parámetros
    Sería interesante contar con diferentes ejemplos y así probar mejor cómo es más robusto o si seguir buscando
    */
    
    
    const cpH2H3 = cuentaPalabras(document.querySelector("div#izquierda").querySelectorAll('h2, h3'));
    const cpNegritas= cuentaPalabras(document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('b'));
    const cpPiesImagen = cuentaPalabras(document.querySelector("#izquierda").querySelectorAll(".thumbcaption"));

    //Esto es así en esta página, lo visible o no es más complejo en general, pero para esto nos vale, pienso
    const cpVisible = cuentaPalabras(document.querySelector("#izquierda > div.mw-parser-output").querySelectorAll('*')); 
    const cpEnlaces = conteoPalabrasEnlaces();

    const listaPalabrasLegibles = getListaPalabrasLegibles();

    function determinaOrdenSeleccion(a,b){
        const primeraOcurrenciaA = listaPalabrasLegibles.indexOf(a[0]);
        const primeraOcurrenciaB = listaPalabrasLegibles.indexOf(b[0]);
        //Esto está feo, enredar con referencias en plena ordenación, pero aquí cambio el valor de cada clave por su indice. Lo quito aunque funciona, no lo usaré
        // a[1] = primeraOcurrenciaA;
        // b[1] = primeraOcurrenciaB;

        return primeraOcurrenciaA - primeraOcurrenciaB; //De menor a mayor
    }
    
    const cpTotalSimple = union(cpH2H3, union(cpNegritas, union(cpPiesImagen, union(cpVisible, cpEnlaces))))
    const cpTotalSimpleOrdenado = getMatrizPalabrasOrdenadas(cpTotalSimple).slice(0,10); 

    const cpTotalSimpleSeleccionado = cpTotalSimpleOrdenado.sort(determinaOrdenSeleccion);
    
    const cpH2H3Log = ponderaOcurrenciasPalabras(cpH2H3, 1, true);
    const cpNegritasLog = ponderaOcurrenciasPalabras(cpNegritas, 1, true);
    const cpPiesImagenLog = ponderaOcurrenciasPalabras(cpPiesImagen, 1, true);
    const cpVisibleLog = ponderaOcurrenciasPalabras(cpVisible, 1, true);
    const cpEnlacesLog = ponderaOcurrenciasPalabras(cpEnlaces, 1, true);

    const cpTotalLog = union(cpH2H3Log, union(cpNegritasLog, union(cpPiesImagenLog, union(cpVisibleLog, cpEnlacesLog))))
    const cpTotalLogOrdenado = getMatrizPalabrasOrdenadas(cpTotalLog).slice(0,10);

    const factorH2H3 = 5;
    const factorNegritas = 3;
    const factorPiesImagen = 1;
    const factorVisible = 1;
    const factorEnlaces = 3;

    const cpH2H3LogP = ponderaOcurrenciasPalabras(cpH2H3, factorH2H3, true);
    const cpNegritasLogP = ponderaOcurrenciasPalabras(cpNegritas, factorNegritas, true);
    const cpPiesImagenLogP = ponderaOcurrenciasPalabras(cpPiesImagen, factorPiesImagen, true);
    const cpVisibleLogP = ponderaOcurrenciasPalabras(cpVisible, factorVisible, true);
    const cpEnlacesLogP = ponderaOcurrenciasPalabras(cpEnlaces, factorEnlaces, true);

    const cpTotalLogPonderado = union(cpH2H3LogP, union(cpNegritasLogP, union(cpPiesImagenLogP, union(cpVisibleLogP, cpEnlacesLogP))))
    const cpTotalLogOrdenadoPonderado = getMatrizPalabrasOrdenadas(cpTotalLogPonderado).slice(0,10);

    let texto = ""
    for (let index = 0; index < cpTotalLogOrdenadoPonderado.slice(0,10).length; index++) {
        const element = cpTotalLogOrdenadoPonderado.slice(0,10)[index];
        texto += (index + 1).toString() + ". <b>" + cpTotalLogOrdenadoPonderado.slice(0,10)[index][0] 
        + "</b> pesa " + cpTotalLogOrdenadoPonderado.slice(0,10)[index][1].toString() + " tras ponderar (sin normalizar). <br>";   
    }
    
    escribeDerecha(texto);

    escribeDerecha("<br><p>Si ponemos de esas las dos primeras palabras en aparecer en lo que el usuario puede leer, el documento trata de:<br>");

    const cpTotalLogOrdenadoPonderadoSeleccionado = cpTotalLogOrdenadoPonderado.sort(determinaOrdenSeleccion);

    escribeDerecha("<b>" + cpTotalLogOrdenadoPonderadoSeleccionado[0][0] + " " + cpTotalLogOrdenadoPonderadoSeleccionado[1][0] + "</b><br>");


    escribeDerecha("<br><p>Finalmente, en cualquier caso, la lista seleccionada y reordenada según aparición en el texto:<br>");

    texto = ""
    for (let index = 0; index < cpTotalLogOrdenadoPonderadoSeleccionado.slice(0,10).length; index++) {
        const element = cpTotalLogOrdenadoPonderadoSeleccionado.slice(0,10)[index];
        texto += (index + 1).toString() + ". <b>" + cpTotalLogOrdenadoPonderadoSeleccionado.slice(0,10)[index][0] 
        + "</b> pesa " + cpTotalLogOrdenadoPonderadoSeleccionado.slice(0,10)[index][1].toString() + " tras ponderar (sin normalizar). <br>";   
    }

    escribeDerecha(texto); 

    escribeDerecha("<br><p>" + "Por último, señalar que hay otros elementos que podemos filtrar, como por ejemplo listas, elementos de menús etc." + "</p><br>");

    escribeDerecha("<br><p><b>" + "Búsqueda de parámetros óptimos:" + "</b></p><br>");

    escribeDerecha("<br><br><p>Tras hacerlo a mi manera, busco ahora ajustar los factores de forma que nos acerquemos a las palabras que queremos que aparezcan."); 
    
    //El objetivo ahora es enbcontrar los factores que nos den un mayor peso a estas palabras:
    const listaPalabrasABuscar = ["dioses", "mitología", "griega", "mitos", "historia", "grecia"];

    escribeDerecha("<p>Para ello, una vez definidas esas palabras:<b>" + listaPalabrasABuscar.toString() + 
    ", </b>genero un conjunto de valores aleatorios de 0 a 15 en cada factor y valoro cada muestra en función del peso dado a las palabras que buscamos."); 
    escribeDerecha("<p>Lo hago aleatorio en vez de una rejilla fija porque pienso que me permitiría explorar mejor la dependencia/independencia que una rejilla demasiado holgada. " 
        + "No incluyo la escala logaritmica siguiendo las instrucciones."); 
    escribeDerecha("Con 16 valores posibles(usando solo enteros) y cinco conjuntos de datos, para cada muestra tenemos más de un millón de posibilidades: 16^5</p>"); 
    escribeDerecha("<p>Del estudio de cómo se comportan estos factores se podría deducir que algunos podrían fijarse o ser de un rango más limitado, o jugar con combinaciones fijadas de ellos que los datos puedan sugerirnos y ajustar la búsqueda. Lo dejo como idea."); 
    escribeDerecha("La evaluación del caso para un conjunto dado de factores la hago a través de la media de la posición que ocupan esas palabras en la lista ordenada resultante, ordenando de menor a mayor.</p>");
    escribeDerecha("<p>Y así, para 1000 casos, el mejor es:");  

    
    const inicio = 0;
    const final = 15;
    const numeroCombinaciones = 1000;
    const listaCP = [cpVisible, cpH2H3, cpNegritas, cpPiesImagen, cpEnlaces];
   
    function generarCombinaciones(numDimensiones, inicio, final, numeroCombinaciones) {
        let todasLasCombinaciones = [];
        
        // Para cada  combinacion pedida
        for(let i = 0; i < numeroCombinaciones; i++) {
            let combinacionActual = [];
            
            // Para cada dimensión generamos un número aleatorio
            for(let j = 0; j < numDimensiones; j++) {
                let aleatorio = Math.floor(Math.random() * (final - inicio + 1)) + inicio;
                combinacionActual.push(aleatorio);
            }
            
            todasLasCombinaciones.push(combinacionActual);
        }
        
        return todasLasCombinaciones;
     }
     
    combinaciones = generarCombinaciones(listaCP.length, inicio, final, numeroCombinaciones);

    // Aplicamos a cada una, eso sí, la primera, por nuestro convenio, será la que se usará para normalizar (es la que tiene todo el dom)
    function aplicarCombinaciones(listaCP, combinaciones) {
        let resultados = [];
        
        // Para cada combinación de factores
        for(let i = 0; i < combinaciones.length; i++) {
            const factores = combinaciones[i];
            
            // Aplicamos los factores a cada diccionario y los unimos
            let resultado = ponderaOcurrenciasPalabras(listaCP[0], factores[0], false);  // Empezamos con el primer diccionario
            // A partir del segundo, vamos aplicando y uniendo
            for(let j = 1; j < listaCP.length; j++) {
                let dictProcesado = ponderaOcurrenciasPalabras(listaCP[j], factores[j], false);
                resultado = union(resultado, dictProcesado);
            }
            
            // Guardamos el resultado junto con los factores usados y la referencia al dict sobre el dom bajo estos factores
            resultados.push({
                factores: factores,
                resultado: resultado
            });
        }
        
        return resultados;
    }

    const resultadosFinales = aplicarCombinaciones(listaCP, combinaciones);

   
    function evaluarResultados(resultadosFinales, listaPalabrasABuscar) {
        let evaluaciones = [];
        
        // Para cada resultado y su indice
        resultadosFinales.forEach((resultado, index) => {
            // Obtener lista ordenada de palabras y sus valores
            const matrizOrdenada = getMatrizPalabrasOrdenadas(resultado.resultado);
            
            // Calcular puntuación para las palabras de interés (su posición en la lista ordenada)
            let posiciones = listaPalabrasABuscar.map(palabra => {
                const posicion = matrizOrdenada.findIndex(item => item[0] == palabra);
                return posicion == -1 ? 
                    matrizOrdenada.length : // Si no está, usamos la longitud total
                    posicion + 1;  // Si está, su posición (empezando en 1)
            });

            const mediaPosiciones = posiciones.reduce((sum, pos) => sum + pos, 0) / listaPalabrasABuscar.length;
            
            evaluaciones.push({
                combinacion: resultado.factores,
                posiciones: posiciones,
                mediaPosiciones: mediaPosiciones,
                posiciones: posiciones,
                matrizOrdenada: matrizOrdenada
            });
        });
        
        // Ordenamos por valor acumulado de mayor a menor
        evaluaciones.sort((a, b) => a.mediaPosiciones - b.mediaPosiciones); 
        
        return evaluaciones;
    
    }
    
    const mejorEvaluadas = evaluarResultados(resultadosFinales, listaPalabrasABuscar);

    // Pînbtamnos la mejor
    texto = "<br> Para la combinación: " + mejorEvaluadas[0]['combinacion'].toString() + " -> (Visible, H2H3, Negritas, PiesImagen, Enlaces)" +
     ". Con media de posicion:" + mejorEvaluadas[0]['mediaPosiciones'].toFixed(2).toString() + "<br>";

    const palabrasAmostrar = mejorEvaluadas[0]['matrizOrdenada'].slice(0,10);
    for (let index = 0; index < palabrasAmostrar.length; index++) {
        const element = palabrasAmostrar[index];
        texto += (index + 1).toString() + ". <b>" + palabrasAmostrar[index][0] + "</b><br>";   
    }
    
    escribeDerecha(texto); 

    escribeDerecha("<br><p>Y las 20 siguentes mejores combinaciones de factores (Visible, H2H3, Negritas, PiesImagen, Enlaces):"); 
    for (let i = 1; i <= 21; i++){
        escribeDerecha("<br>" + mejorEvaluadas[i]['combinacion'].toString() + " Con media de posicion:" + mejorEvaluadas[i]['mediaPosiciones'].toFixed(2).toString());
    }

    escribeDerecha("<br><br><p>Es fácil encontrar regularidades ahora, por ejemplo Enlaces pesa mucho de manera sostenida y los pies de imágenes no parecen tener mucho valor, pero es para estas palabras específicas y este documento ¿Qué pasará en otro escenario?. \
        Hay riesgo de sobreajustar si hacemos las cosas así. Si se dispusera de más muestras, podría buscarse un método más robusto.</p>"); 
    

    escribeDerecha("<br><br><br><p><b>Comentario: </b>" + "Un ejercicio muy bonito, muchas gracias."); 

}

function escribeTablaImagenes(){

    escribeDerecha("<br><h2>Galería con todas las imágenes</h2>");
    escribeDerecha("<br>" + "Galería con todas las imágenes:" + "<br>");

    const imagenes = Array.from(document.getElementsByTagName('img'));
    const tabla = document.createElement('table');
    let fila = document.createElement('tr');
    imagenes.forEach((imagen, index) => {
        const celda = document.createElement('td');

        const nuevaImg = imagen.cloneNode(true);//para poder tocarla
        nuevaImg.style.maxWidth = '100px';
        nuevaImg.style.maxHeight = '100px';

        celda.appendChild(nuevaImg);
        fila.appendChild(celda);
        if ((index + 1) % 3 == 0 || index == imagenes.length - 1) {
            tabla.appendChild(fila);
            // Crear nueva fila si no es la última imagen
            if (index < imagenes.length - 1) {
              fila = document.createElement('tr');
            }
        }
    });

    document.getElementById('derecha').appendChild(tabla);

}

function robot(){
    document.getElementById('derecha').innerHTML = "";
    escribeDerecha("<h2>Palabras más importantes:</h2>");
    escribeMasfrecuentesH2H3();
    escribeMasfrecuentesNegrita()
    escribeMasfrecuentesEnPiesDeImagen()
    escribeMasfrecuentesTodoElDOM()
    escribeMasFrecuentesEnlaces()
    escribeAnalisis();
    escribeTablaImagenes();
}