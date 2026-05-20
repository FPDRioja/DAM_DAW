# Tutorial Básico de jQuery y Selectores CSS

Este tutorial cubre los fundamentos de jQuery y cómo utilizar selectores CSS para interactuar con elementos HTML, incluyendo la manipulación del DOM, manejo de eventos, AJAX, efectos básicos y validación de formularios.

## 1. Introducción a jQuery

jQuery es una biblioteca de JavaScript rápida, pequeña y rica en características. Simplifica la manipulación de documentos HTML, el manejo de eventos, la animación y las interacciones Ajax para un desarrollo web rápido.

**Nota de iTutor:** jQuery abstrae muchas de las complejidades del JavaScript puro, especialmente en la manipulación del DOM y el manejo de eventos a través de diferentes navegadores. Su popularidad ha disminuido con la evolución de JavaScript moderno y frameworks, pero sigue siendo relevante en muchos proyectos y útil para comprender conceptos fundamentales de manipulación del DOM.

## 2. Sintaxis Básica de jQuery

La sintaxis de jQuery está hecha a medida para "seleccionar" elementos HTML y realizar una "acción" sobre ellos.

Sintaxis básica: [`$(selector).accion()`](tutorial_jquery_selectores.md:15)

-   `$`: Define/accede a jQuery.
-   `(selector)`: Consulta (encuentra) elementos HTML.
-   `.accion()`: La acción a realizar sobre los elementos.

**Ejemplo:**

```javascript
$(document).ready(function() {
    // El código aquí se ejecuta una vez que el DOM está completamente cargado
    // y listo para ser manipulado de forma segura.
    $('p').hide(); // Selecciona todos los elementos <p> y los oculta
});
```

En este ejemplo, [`$(document).ready()`](tutorial_jquery_selectores.md:24) (o su forma abreviada `$(function() { ... });`) asegura que el código se ejecute solo cuando la estructura completa del DOM de la página esté lista. `$('p')` es el selector y [`.hide()`](tutorial_jquery_selectores.md:160) es la acción.

## 3. Selectores CSS

Los selectores CSS se utilizan para "encontrar" (seleccionar) elementos HTML a los que queremos aplicar un estilo o, en el caso de jQuery, realizar una acción. jQuery utiliza la sintaxis de selectores CSS para seleccionar elementos.

### Tipos Comunes de Selectores CSS (y su uso en jQuery)

-   **Selector de Elemento:** Selecciona todos los elementos de un tipo específico.
    -   Sintaxis: `elemento`
    -   Ejemplo jQuery: [`$('p')`](tutorial_jquery_selectores.md:41) (Selecciona todos los párrafos)
-   **Selector de ID:** Selecciona un elemento con un ID específico. Los IDs deben ser únicos en una página.
    -   Sintaxis: `#id`
    -   Ejemplo jQuery: [`$('#titulo')`](tutorial_jquery_selectores.md:46) (Selecciona el elemento con id="titulo")
-   **Selector de Clase:** Selecciona todos los elementos con una clase específica.
    -   Sintaxis: `.clase`
    -   Ejemplo jQuery: [`$('.resaltado')`](tutorial_jquery_selectores.md:51) (Selecciona todos los elementos con class="resaltado")
-   **Selector Universal:** Selecciona todos los elementos HTML en la página.
    -   Sintaxis: `*`
    -   Ejemplo jQuery: [`$('*)`](tutorial_jquery_selectores.md:56) (Selecciona todos los elementos)
-   **Selector de Atributo:** Selecciona elementos con un atributo específico o un atributo con un valor específico.
    -   Sintaxis: `[atributo]`, `[atributo="valor"]`, `[atributo~="valor"]`, etc.
    -   Ejemplo jQuery: [`$('a[target="_blank"]')`](tutorial_jquery_selectores.md:61) (Selecciona todos los enlaces que se abren en una nueva pestaña)
    -   Ejemplo jQuery (múltiples atributos): [`$('input[type="text"][name="usuario"]')`](js/main.js:92) (Selecciona inputs de tipo texto con nombre "usuario")

### Combinadores

Los combinadores explican la relación entre los selectores.

-   **Descendiente:** Selecciona todos los elementos descendientes de un elemento específico.
    -   Sintaxis: `elemento1 elemento2`
    -   Ejemplo jQuery: [`$('div p')`](tutorial_jquery_selectores.md:70) (Selecciona todos los párrafos dentro de un `<div>`)
-   **Hijo Directo:** Selecciona todos los elementos que son hijos directos de un elemento específico.
    -   Sintaxis: `elemento1 > elemento2`
    -   Ejemplo jQuery: [`$('ul > li')`](tutorial_jquery_selectores.md:75) (Selecciona todos los `<li>` que son hijos directos de un `<ul>`)
-   **Hermano Adyacente:** Selecciona un elemento que es inmediatamente precedido por otro elemento específico.
    -   Sintaxis: `elemento1 + elemento2`
    -   Ejemplo jQuery: [`$('h2 + p')`](tutorial_jquery_selectores.md:80) (Selecciona el primer párrafo que sigue inmediatamente a un `<h2>`)
-   **Hermanos Generales:** Selecciona todos los elementos que son hermanos de un elemento específico.
    -   Sintaxis: `elemento1 ~ elemento2`
    -   Ejemplo jQuery: [`$('h2 ~ p')`](tutorial_jquery_selectores.md:85) (Selecciona todos los párrafos que son hermanos de un `<h2>`)

### Selectores CSS Avanzados (Pseudo-clases y Pseudo-elementos)

Estos selectores permiten seleccionar elementos basándose en su estado, posición dentro de un grupo de hermanos, o incluso partes de un elemento.

-   [`:first-child`](tutorial_jquery_selectores.md:91): Selecciona el primer elemento hijo de su padre.
    -   Ejemplo jQuery: [`$('li:first-child')`](tutorial_jquery_selectores.md:93)
-   [`:last-child`](tutorial_jquery_selectores.md:95): Selecciona el último elemento hijo de su padre.
    -   Ejemplo jQuery: [`$('li:last-child')`](tutorial_jquery_selectores.md:97)
-   [`:nth-child(n)`](tutorial_jquery_selectores.md:99): Selecciona el enésimo elemento hijo. `n` puede ser un número, (`odd`, `even`), o una fórmula (`an+b`).
    -   Ejemplo jQuery: [`$('li:nth-child(2)')`](tutorial_jquery_selectores.md:101), [`$('li:nth-child(odd)')`](tutorial_jquery_selectores.md:102)
-   [`:empty`](tutorial_jquery_selectores.md:104): Selecciona elementos que no tienen hijos (incluyendo nodos de texto).
    -   Ejemplo jQuery: [`$('div:empty')`](tutorial_jquery_selectores.md:106)
-   [`:has(selector)`](tutorial_jquery_selectores.md:108): Selecciona elementos que contienen al menos un elemento que coincide con el selector especificado.
    -   Ejemplo jQuery: [`$('div:has(p)')`](tutorial_jquery_selectores.md:110)
-   [`:not(selector)`](tutorial_jquery_selectores.md:112): Selecciona elementos que NO coinciden con el selector especificado.
    -   Ejemplo jQuery: [`$('input:not([type="submit"])')`](tutorial_jquery_selectores.md:114)
-   [`:checked`](tutorial_jquery_selectores.md:116): Selecciona elementos de formulario (como checkboxes y radio buttons) que están marcados.
    -   Ejemplo jQuery: [`$('input[type="checkbox"]:checked')`](tutorial_jquery_selectores.md:118)
-   [`:disabled`](tutorial_jquery_selectores.md:120): Selecciona elementos de formulario que están deshabilitados.
    -   Ejemplo jQuery: [`$('button:disabled')`](tutorial_jquery_selectores.md:122)
-   [`:enabled`](tutorial_jquery_selectores.md:124): Selecciona elementos de formulario que están habilitados.
    -   Ejemplo jQuery: [`$('input:enabled')`](tutorial_jquery_selectores.md:126)
-   [`:selected`](https://api.jquery.com/selected-selector/): Selecciona todas las opciones que están seleccionadas en un elemento `<select>`.
    -   Ejemplo jQuery: [`$('#miSelect option:selected')`](js/main.js:23)
-   [`:focus`](https://api.jquery.com/focus-selector/): Selecciona el elemento que actualmente tiene el foco.
-   [`:visible`](https://api.jquery.com/visible-selector/): Selecciona todos los elementos que son visibles.
-   [`:hidden`](https://api.jquery.com/hidden-selector/): Selecciona todos los elementos que están ocultos (ya sea por CSS `display: none`, `visibility: hidden`, o un input de tipo `hidden`).

## 4. Métodos de jQuery para Selección, Manipulación y Control

### Selección de Elementos Específicos (Filtrado y Recorrido)

Además de los selectores CSS, jQuery proporciona métodos para refinar selecciones o seleccionar elementos relacionados.

-   [`.find(selector)`](tutorial_jquery_selectores.md:136): Busca elementos descendientes que coincidan con el selector.
-   [`.children(selector)`](tutorial_jquery_selectores.md:139): Selecciona solo los hijos directos que coincidan con el selector (opcional).
-   [`.parent()`](tutorial_jquery_selectores.md:142): Selecciona el padre inmediato.
-   [`.parents(selector)`](https://api.jquery.com/parents/): Selecciona todos los ancestros que coincidan con el selector.
-   [`.siblings(selector)`](tutorial_jquery_selectores.md:145): Selecciona todos los hermanos (opcionalmente filtrados).
-   [`.first()`](tutorial_jquery_selectores.md:149): Primer elemento del conjunto.
-   [`.last()`](tutorial_jquery_selectores.md:152): Último elemento del conjunto.
-   [`.eq(index)`](tutorial_jquery_selectores.md:155): Elemento por índice (base cero).

### Manipulación del DOM

#### Contenido y Valores
-   [`.text()`](tutorial_jquery_selectores.md:163): Obtiene o establece el contenido de texto.
-   [`.html()`](tutorial_jquery_selectores.md:165): Obtiene o establece el contenido HTML.
-   [`.val()`](tutorial_jquery_selectores.md:167): Obtiene o establece el valor de los elementos de formulario.

#### Atributos y Propiedades
-   [`.attr()`](js/main.js:25): Obtiene o establece atributos HTML.
-   [`.removeAttr()`](https://api.jquery.com/removeAttr/): Elimina un atributo.
-   [`.prop()`](js/main.js:235): Obtiene o establece propiedades DOM (mejor para booleanos).

#### Clases CSS
-   [`.addClass()`](tutorial_jquery_selectores.md:170): Añade clases.
-   [`.removeClass()`](tutorial_jquery_selectores.md:172): Elimina clases.
-   [`.toggleClass()`](tutorial_jquery_selectores.md:174): Alterna clases.
-   [`.hasClass()`](https://api.jquery.com/hasClass/): Verifica si tiene una clase.

#### Estilos CSS
-   [`.css()`](js/main.js:51): Obtiene o establece propiedades CSS.

## 5. Creación, Inserción y Eliminación de Elementos del DOM

### Creación de Elementos
Pasando una cadena HTML al constructor de jQuery: `const nuevoEl = $('<p>Texto</p>');`
Referencia: [`$('<option>').attr('value', key).text(key)`](js/main.js:25)

### Inserción de Elementos
-   [`.append()`](tutorial_jquery_selectores.md:214) / [`.appendTo()`](https://api.jquery.com/appendTo/): Al final (hijo).
-   [`.prepend()`](tutorial_jquery_selectores.md:216) / [`.prependTo()`](https://api.jquery.com/prependTo/): Al principio (hijo).
-   [`.after()`](tutorial_jquery_selectores.md:218) / [`.insertAfter()`](https://api.jquery.com/insertAfter/): Después (hermano).
-   [`.before()`](tutorial_jquery_selectores.md:220) / [`.insertBefore()`](https://api.jquery.com/insertBefore/): Antes (hermano).

### Eliminación de Elementos
-   [`.remove()`](tutorial_jquery_selectores.md:231): Elimina elementos y sus datos/eventos.
-   [`.empty()`](tutorial_jquery_selectores.md:233): Elimina hijos, mantiene el padre.
-   [`.detach()`](https://api.jquery.com/detach/): Elimina elementos pero conserva datos/eventos para posible reinserción.

## 6. Manejo de Eventos con jQuery

jQuery simplifica enormemente el manejo de eventos del navegador.

### El Método `.on()`
Es el método principal y más versátil para adjuntar manejadores de eventos.
Sintaxis básica: [`$(selector).on(evento, [selectorHijoDinamico], funcionManejadora);`](tutorial_jquery_selectores.md:179)

### Delegación de Eventos
Útil para elementos añadidos dinámicamente. El evento se adjunta a un padre estático:
`$('#contenedor-padre').on('click', '.elemento-dinamico', function() { ... });`
Referencia: [`$('#cuadricula').on('click', '.celula', function () { ... });`](js/main.js:69)

### El Objeto `event`
La función manejadora recibe un objeto `event`:
-   `event.preventDefault()`: Evita la acción por defecto.
-   `event.stopPropagation()`: Detiene la propagación del evento.
-   `event.target`: Elemento que originó el evento.
-   `event.currentTarget` (o `this`): Elemento al que se adjuntó el manejador.
-   `event.pageX`, `event.pageY`: Coordenadas del ratón.
-   `event.which`: Código de tecla o botón del ratón.
-   `event.key`: Nombre de la tecla presionada (moderno).
-   `event.data`: Datos opcionales pasados al adjuntar el evento con `.on()`.

### Lista de Eventos Comunes y Útiles para `.on()`

#### Eventos del Ratón (Mouse Events)
-   `click`: Se dispara tras un clic completo (mousedown y mouseup sobre el mismo elemento).
    -   Ejemplo: [`$('#miBoton').on('click', function() { ... });`](js/main.js:272)
-   `dblclick`: Doble clic.
-   `mousedown`: Botón del ratón presionado.
-   `mouseup`: Botón del ratón liberado.
-   `mousemove`: Movimiento del ratón sobre un elemento.
-   `mouseenter`: Puntero del ratón entra en el área de un elemento. No burbujea.
-   `mouseleave`: Puntero del ratón sale del área de un elemento. No burbujea.
-   `mouseover`: Puntero del ratón entra en el área de un elemento o de sus hijos (burbujea).
-   `mouseout`: Puntero del ratón sale del área de un elemento o de sus hijos (burbujea).
-   `hover`: Atajo de jQuery para `mouseenter` y `mouseleave`.
    -   Ejemplo: `$('div').hover(function() { $(this).addClass('hover'); }, function() { $(this).removeClass('hover'); });`

#### Eventos del Teclado (Keyboard Events)
-   `keydown`: Tecla presionada.
-   `keyup`: Tecla liberada.
-   `keypress`: Tecla presionada (generalmente para teclas que producen caracteres, puede estar obsoleto en favor de `keydown`).

#### Eventos de Formulario (Form Events)
-   `submit`: Se dispara en el elemento `<form>` cuando se intenta enviar.
    -   Ejemplo: `$('#miFormulario').on('submit', function(event) { event.preventDefault(); /* validación aquí */ });`
-   `change`: El valor de un elemento `<input>`, `<select>`, o `<textarea>` ha cambiado y el elemento pierde el foco (para `<select>`, checkboxes y radios, se dispara inmediatamente).
    -   Ejemplo: [`$('#patrones').on('change', function() { ... });`](js/main.js:288)
-   `input`: El valor de un `<input>` o `<textarea>` ha cambiado (se dispara inmediatamente con cada cambio, más moderno que `keypress` para texto).
    -   Ejemplo: [`$('#velocidad').on('input', function() { ... });`](js/main.js:300)
-   `focus`: Un elemento (`<input>`, `<select>`, `<a>`, etc.) recibe el foco.
    -   Ejemplo: `$('input[type="text"]').on('focus', function() { $(this).addClass('focused'); });`
-   `blur`: Un elemento pierde el foco.
    -   Ejemplo: `$('input[type="text"]').on('blur', function() { $(this).removeClass('focused'); });`
-   `select`: Texto seleccionado en un `<input type="text">` o `<textarea>`.

#### Eventos del Documento/Ventana (Document/Window Events)
-   `load`: Se dispara en `window` cuando toda la página (imágenes, scripts, CSS) ha cargado. También para elementos como `<img>`.
-   `ready`: Específico de jQuery, se dispara en `document` cuando el DOM está listo para ser manipulado (antes que `window.load`).
    -   Ejemplo: [`$(document).ready(function() { ... });`](js/main.js:1)
-   `scroll`: Se dispara cuando el usuario se desplaza en un elemento o en la ventana.
-   `resize`: Se dispara cuando la ventana del navegador cambia de tamaño.
-   `unload` / `beforeunload`: Se dispara cuando el usuario está a punto de abandonar la página.

### Desvincular Eventos con `.off()`
Elimina manejadores de eventos: `$(selector).off(evento, funcionManejadora);`

### Métodos Abreviados de Eventos
jQuery ofrece atajos como `.click()`, `.change()`, etc., pero `.on()` es más versátil.

## 7. Trabajando con Elementos `<select>`

Los elementos `<select>` (listas desplegables) son comunes en formularios.

### Seleccionar un `<select>`
```javascript
const miSelect = $('#idDelSelect');
```

### Obtener y Establecer el Valor Seleccionado
-   Obtener el valor de la opción seleccionada:
    ```javascript
    const valorSeleccionado = $('#idDelSelect').val();
    // Ejemplo de js/main.js: const nombrePatron = $(this).val(); dentro del evento 'change'
    ```
    Referencia: [`$(this).val()`](js/main.js:289)
-   Establecer una opción como seleccionada por su valor:
    ```javascript
    $('#idDelSelect').val('valorDeLaOpcion');
    ```

### Obtener el Texto de la Opción Seleccionada
```javascript
const textoSeleccionado = $('#idDelSelect option:selected').text();
```

### Añadir Opciones Dinámicamente
Se puede usar `.append()` o `.html()` para añadir nuevas etiquetas `<option>`.
```javascript
// Añadir una única opción
$('#idDelSelect').append($('<option>', {
    value: 'nuevoValor',
    text: 'Nuevo Texto de Opción'
}));

// Añadir múltiples opciones desde un array (similar a js/main.js)
const opciones = [ {val: '1', texto: 'Uno'}, {val: '2', texto: 'Dos'} ];
const selector = $('#idDelSelect');
$.each(opciones, function(index, opt) {
    selector.append($('<option>').attr('value', opt.val).text(opt.texto));
});
```
Referencia: [`selectorPatrones.append($('<option>').attr('value', key).text(key));`](js/main.js:25)

### Manejar el Evento `change`
El evento `change` se dispara cuando el usuario selecciona una nueva opción.
```javascript
$('#idDelSelect').on('change', function() {
    const valorActual = $(this).val();
    const textoActual = $('option:selected', this).text(); // 'this' aquí es el <select>
    console.log(`Valor cambiado a: ${valorActual}, Texto: ${textoActual}`);
    // Ejemplo de js/main.js: $('#patrones').on('change', function () { cargarPatron($(this).val()); });
});
```
Referencia: [`$('#patrones').on('change', function () { ... });`](js/main.js:288)

### Otras Operaciones Útiles
-   Obtener todas las opciones: `$('#idDelSelect option')`
-   Deshabilitar/Habilitar el select: `$('#idDelSelect').prop('disabled', true/false);`
-   Deshabilitar/Habilitar una opción específica: `$('#idDelSelect option[value="valor"]').prop('disabled', true/false);`
-   Contar número de opciones: `$('#idDelSelect option').length;`

## 8. Efectos y Animaciones Básicas

jQuery proporciona métodos sencillos para añadir efectos visuales.

### Mostrar y Ocultar
-   [`.hide(duracion, callback)`](tutorial_jquery_selectores.md:160): Oculta.
-   [`.show(duracion, callback)`](tutorial_jquery_selectores.md:161): Muestra.
-   [`.toggle(duracion, callback)`](tutorial_jquery_selectores.md:162): Alterna.
    La `duracion` puede ser milisegundos (ej. `1000`), o las cadenas `'slow'`, `'fast'`. El `callback` es una función que se ejecuta al completar el efecto.

### Fading (Desvanecimiento)
-   [`.fadeIn(duracion, callback)`](js/main.js:198): Muestra con desvanecimiento.
    -   Ejemplo: [`$('#mensaje-estabilizacion').fadeIn(500);`](js/main.js:198)
-   [`.fadeOut(duracion, callback)`](js/main.js:203): Oculta con desvanecimiento.
    -   Ejemplo: [`$('#mensaje-estabilizacion').fadeOut(500);`](js/main.js:203)
-   [`.fadeTo(duracion, opacidad, callback)`](https://api.jquery.com/fadeTo/): Ajusta la opacidad.
-   [`.fadeToggle(duracion, callback)`](https://api.jquery.com/fadeToggle/): Alterna fadeIn/fadeOut.

### Sliding (Deslizamiento)
-   [`.slideDown(duracion, callback)`](https://api.jquery.com/slideDown/): Muestra deslizando hacia abajo.
-   [`.slideUp(duracion, callback)`](https://api.jquery.com/slideUp/): Oculta deslizando hacia arriba.
-   [`.slideToggle(duracion, callback)`](https://api.jquery.com/slideToggle/): Alterna slideDown/slideUp.

### Animaciones Personalizadas con `.animate()`
Para animaciones más complejas, se usa [`.animate(propiedades, duracion, easing, callback)`](https://api.jquery.com/animate/).
-   `propiedades`: Un objeto de propiedades CSS a animar.
-   `easing`: Tipo de aceleración (ej. `'linear'`, `'swing'`).
```javascript
$('#miElemento').animate({
    opacity: 0.25,
    left: '+=50', // Mueve 50px a la derecha desde su posición actual
    height: 'toggle'
}, 5000, function() {
    // Animación completa.
});
```
**Nota de iTutor:** Las animaciones basadas en JavaScript pueden ser menos eficientes que las animaciones CSS3. Considera usar transiciones y animaciones CSS siempre que sea posible para un mejor rendimiento.

## 9. AJAX con jQuery

AJAX (Asynchronous JavaScript and XML) permite cargar datos del servidor en segundo plano sin recargar la página.

### El Método Principal: `$.ajax()`
Es el método más configurable.
```javascript
$.ajax({
    url: 'datos.php', // URL del recurso
    type: 'GET', // o 'POST', 'PUT', 'DELETE', etc.
    dataType: 'json', // Tipo de datos esperado: 'xml', 'json', 'script', 'html', 'text'
    data: { parametro1: 'valor1', parametro2: 'valor2' }, // Datos a enviar (para POST o GET)
    
    beforeSend: function() {
        // Código a ejecutar antes de enviar la petición (ej. mostrar un spinner)
    },
    success: function(respuesta) {
        // Código a ejecutar si la petición es exitosa
        // 'respuesta' contiene los datos del servidor
        console.log(respuesta);
    },
    error: function(jqXHR, estadoTexto, errorLanzado) {
        // Código a ejecutar si hay un error
        console.error('Error AJAX:', estadoTexto, errorLanzado);
    },
    complete: function() {
        // Código a ejecutar siempre, después de success o error (ej. ocultar spinner)
    }
});
```
Referencia para `dataType: 'xml'` y `success`/`error`: [`$.ajax() con XML`](tutorial_jquery_selectores.md:269)

### Métodos Abreviados de AJAX
-   [`$.get(url, data, successCallback, dataType)`](https://api.jquery.com/jQuery.get/): Realiza una petición GET.
-   [`$.post(url, data, successCallback, dataType)`](https://api.jquery.com/jQuery.post/): Realiza una petición POST.
-   [`$.getJSON(url, data, successCallback)`](js/main.js:21): Realiza una petición GET y espera JSON.
    -   Ejemplo: [`$.getJSON('../data/patrones.json', function (data) { ... });`](js/main.js:21)
-   [`$(selector).load(url, data, completeCallback)`](https://api.jquery.com/load/): Carga HTML desde una URL y lo inserta en los elementos seleccionados.

### Manejo de Promesas (Deferred Objects)
Las funciones AJAX de jQuery devuelven un objeto "Deferred" (similar a una Promesa).

```javascript
$.ajax({ url: 'mi_api/datos' })
    .done(function(data) {
        // Equivalente a 'success'
        console.log('Datos recibidos:', data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Equivalente a 'error'
        console.error('Fallo la petición:', textStatus, errorThrown);
        // Ejemplo de js/main.js: .fail(function () { console.error('Error al cargar patrones.json'); });
    })
    .always(function() {
        // Equivalente a 'complete'
        console.log('Petición finalizada.');
    });
```
Referencia: [`.fail()`](js/main.js:27)

**Nota de iTutor:** Aunque el nombre AJAX incluye "XML", hoy en día es mucho más común usar JSON para el intercambio de datos.

## 10. Validación de Formularios HTML5 con jQuery

HTML5 introduce atributos de validación que los navegadores pueden usar para verificar la entrada del usuario antes de enviar un formulario. jQuery puede interactuar con este sistema.

### Atributos de Validación HTML5 Comunes
-   `required`: El campo debe ser completado.
-   `type="email"` / `type="url"` / `type="number"`: Valida el formato del dato.
-   `pattern="regex"`: Valida contra una expresión regular.
-   `minlength="x"` / `maxlength="x"`: Longitud mínima/máxima del texto.
-   `min="y"` / `max="y"`: Valor mínimo/máximo para tipos numéricos o de fecha.

**Ejemplo HTML:**
```html
<form id="miFormularioValidable">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required minlength="3">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Enviar</button>
</form>
<div id="mensajesError" style="color: red;"></div>
```

### Interceptar el Envío del Formulario con jQuery
Puedes usar el evento `submit` para realizar acciones antes de que el formulario se envíe (o para prevenir el envío).

```javascript
$(document).ready(function() {
    $('#miFormularioValidable').on('submit', function(event) {
        // Prevenir el envío por defecto para manejarlo nosotros
        event.preventDefault();
        
        const form = this; // 'this' es el elemento DOM del formulario
        $('#mensajesError').empty(); // Limpiar mensajes de error previos

        // 1. Forzar la validación del navegador y mostrar mensajes UI nativos
        // El método checkValidity() devuelve true si todos los campos son válidos,
        // y false si alguno no lo es. También dispara la UI de validación del navegador.
        if (form.checkValidity() === false) {
            // Si el formulario no es válido, el navegador ya habrá mostrado los errores.
            // Podemos añadir lógica adicional aquí si es necesario.
            console.log('Formulario no válido según HTML5.');
            
            // Opcional: Iterar sobre campos inválidos para mensajes personalizados
            $(form).find(':invalid').first().focus(); // Poner foco en el primer campo inválido

            // Mostrar mensajes de error personalizados (ejemplo)
            $(form).find('input:invalid').each(function() {
                const campo = $(this);
                const mensaje = campo.prop('validationMessage') || 'Este campo no es válido.';
                $('#mensajesError').append(`<p>${campo.attr('name')}: ${mensaje}</p>`);
            });

            return false; // Detener aquí
        }

        // 2. Si el formulario es válido (checkValidity() devolvió true)
        console.log('Formulario válido. Procediendo al envío o acción AJAX...');
        
        // Aquí podrías:
        // a) Dejar que el formulario se envíe de forma nativa (si no hubieras hecho event.preventDefault() o haciendo form.submit() ahora)
        //    form.submit(); // ¡Cuidado! Esto re-dispararía el evento submit si no se maneja bien.
        //    Es mejor quitar el preventDefault() o usar una bandera.
        
        // b) Enviar los datos mediante AJAX
        /*
        const formData = $(form).serialize(); // Recoge los datos del formulario
        $.ajax({
            url: $(form).attr('action') || 'tu_url_de_procesamiento.php',
            type: $(form).attr('method') || 'POST',
            data: formData,
            success: function(response) {
                console.log('Formulario enviado con AJAX:', response);
                $('#mensajesError').html('<p style="color:green;">¡Formulario enviado con éxito!</p>');
                form.reset(); // Limpiar el formulario
            },
            error: function() {
                $('#mensajesError').append('<p>Error al enviar el formulario con AJAX.</p>');
            }
        });
        */
        alert('Formulario válido y listo para ser procesado (simulado).');
        // Para este ejemplo, simplemente reseteamos el formulario
        form.reset();

    });
});
```

### Pseudo-clases CSS para Estilizar Campos
HTML5 y CSS proporcionan pseudo-clases para estilizar campos basados en su estado de validación:
-   `:valid`: El campo cumple con sus reglas de validación.
-   `:invalid`: El campo NO cumple con sus reglas de validación.
-   `:required`: El campo tiene el atributo `required`.
-   `:optional`: El campo no tiene el atributo `required`.
-   `:in-range` / `:out-of-range`: Para campos con atributos `min` y `max`.

Puedes usar jQuery para añadir/quitar clases adicionales si necesitas un control más fino sobre los estilos que el que ofrecen estas pseudo-clases directamente.

**Nota de iTutor:** La validación HTML5 es una excelente primera línea de defensa y mejora la accesibilidad. Sin embargo, **siempre debes validar los datos en el lado del servidor**, ya que la validación del lado del cliente puede ser eludida. jQuery ayuda a mejorar la experiencia del usuario interactuando con estas validaciones nativas.

## 11. Métodos de Control e Iteración

### Iteración con `.each()` sobre Colecciones jQuery
Itera sobre un objeto jQuery, ejecutando una función para cada elemento coincidente.
-   Sintaxis: [`$(selector).each(function(index, element))`](tutorial_jquery_selectores.md:184)
    -   `index`: El índice del elemento en la iteración.
    -   `element`: El elemento DOM actual (no un objeto jQuery). `this` dentro de la función también es el elemento DOM.
    -   Ejemplo:
        ```javascript
        $('li').each(function(index, el) {
            console.log(`Elemento li en índice ${index}: ${$(el).text()}`);
            // $(this).text() también funcionaría
        });
        ```
    -   **Nota de iTutor:** Dentro de la función `each`, `this` se refiere al elemento DOM actual, por lo que `$(this)` es la forma jQuery de ese elemento.

### Iteración con `$.each()` sobre Arrays y Objetos Genéricos
Utilidad para iterar sobre arrays y objetos que no son colecciones jQuery.
-   Sintaxis para arrays: `$.each(array, function(index, value)) { ... }`
-   Sintaxis para objetos: [`$.each(objeto, function(key, value)) { ... }`](js/main.js:24)
    -   Ejemplo:
        ```javascript
        const miArray = ['a', 'b', 'c'];
        $.each(miArray, function(idx, val) {
            console.log(`Array[${idx}] = ${val}`);
        });

        const miObjeto = { nombre: 'Ana', edad: 30 };
        $.each(miObjeto, function(clave, valor) {
            console.log(`${clave}: ${valor}`);
        });
        ```
    -   Referencia: [`$.each(patrones, function (key, value) { ... });`](js/main.js:24)

## 12. Cuestionario de Autoevaluación (Actualizado)

### Pregunta 1
¿Cuál es la sintaxis básica para seleccionar un elemento por su ID en jQuery?
a) `element#id`
b) `$(#id)`
c) `$('#id')`
d) `$(.id)`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **c) [`$('#id')`](tutorial_jquery_selectores.md:342)**.
> La sintaxis de jQuery para seleccionar un elemento por su ID utiliza el símbolo de almohadilla (`#`) seguido del ID, encerrado entre comillas dentro de los paréntesis de `$()`.

### Pregunta 2
Si quieres seleccionar todos los elementos `<li>` que son hijos directos de un elemento `<ul>` con la clase `menu`, ¿qué selector jQuery usarías?
a) `$('.menu li')`
b) `$('ul.menu > li')`
c) `$('ul .menu li')`
d) `$('li > ul.menu')`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **b) [`$('ul.menu > li')`](tutorial_jquery_selectores.md:354)**.
> - `ul.menu` selecciona un elemento `<ul>` con la clase `menu`.
> - `>` es el combinador de hijo directo.
> - `li` selecciona los elementos `<li>`.

### Pregunta 3
¿Qué método de jQuery se utiliza para obtener el valor actual de un campo de entrada de texto (`<input type="text">`)?
a) [`.text()`](tutorial_jquery_selectores.md:369)
b) [`.html()`](tutorial_jquery_selectores.md:370)
c) `.value()`
d) [`.val()`](tutorial_jquery_selectores.md:372)
> [!solution]- Respuesta Correcta
> La respuesta correcta es **d) [`.val()`](tutorial_jquery_selectores.md:372)**.
> El método [`.val()`](tutorial_jquery_selectores.md:167) se usa para obtener o establecer el valor de elementos de formulario.

### Pregunta 4
¿Cómo deshabilitarías un botón con el ID `miBoton` usando jQuery, de la forma más recomendada para propiedades booleanas?
a) `$('#miBoton').prop('disabled', true);`
b) `$('#miBoton').attr('disabled', 'disabled');`
c) `$('#miBoton').disable();`
d) `$('#miBoton').css('disabled', 'true');`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **a) [`$('#miBoton').prop('disabled', true);`](tutorial_jquery_selectores.md:382)**.
> Para propiedades booleanas como `disabled`, `checked`, o `selected`, se recomienda usar [`.prop()`](js/main.js:235). Aunque [`.attr('disabled', 'disabled')`](js/main.js:25) también puede funcionar, [`.prop()`](js/main.js:235) es más consistente.

### Pregunta 5
¿Qué método de jQuery se utiliza para añadir un nuevo elemento como último hijo de un elemento existente?
a) [`.prepend()`](tutorial_jquery_selectores.md:395)
b) [`.after()`](tutorial_jquery_selectores.md:396)
c) [`.append()`](tutorial_jquery_selectores.md:397)
d) [`.before()`](tutorial_jquery_selectores.md:398)
> [!solution]- Respuesta Correcta
> La respuesta correcta es **c) [`.append()`](tutorial_jquery_selectores.md:397)**.
> El método [`.append()`](tutorial_jquery_selectores.md:214) inserta contenido al final de los elementos seleccionados.

### Pregunta 6
Si tienes un `<div>` con ID `contenido` y quieres eliminar todo su contenido interno, pero mantener el `<div>` vacío, ¿qué método usarías?
a) [`.remove()`](tutorial_jquery_selectores.md:408)
b) [`.empty()`](tutorial_jquery_selectores.md:409)
c) `.delete()`
d) `.clear()`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **b) [`.empty()`](tutorial_jquery_selectores.md:409)**.
> El método [`.empty()`](tutorial_jquery_selectores.md:233) elimina todos los nodos hijos, dejando el elemento padre vacío.

### Pregunta 7
Al realizar una petición AJAX con jQuery para cargar datos XML, ¿qué opción se utiliza en `$.ajax()` para especificar que se espera un documento XML como respuesta?
a) `contentType: 'xml'`
b) `format: 'xml'`
c) `dataType: 'xml'`
d) `responseType: 'xml'`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **c) [`dataType: 'xml'`](tutorial_jquery_selectores.md:423)**.
> La opción `dataType` en [`$.ajax()`](tutorial_jquery_selectores.md:269) especifica el tipo de datos esperado del servidor.

### Pregunta 8
¿Qué evento jQuery se dispara típicamente cuando un usuario selecciona una nueva opción en un elemento `<select>`?
a) `click`
b) `input`
c) `change`
d) `submit`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **c) `change`**.
> El evento [`change`](js/main.js:288) se dispara en un `<select>` cuando se selecciona una nueva opción.

### Pregunta 9
¿Cuál es la diferencia principal entre [`.attr()`](js/main.js:25) y [`.prop()`](js/main.js:235) en jQuery?
a) No hay diferencia, son alias.
b) [`.attr()`](js/main.js:25) es para atributos HTML, [`.prop()`](js/main.js:235) para propiedades DOM; [`.prop()`](js/main.js:235) es mejor para valores booleanos.
c) [`.prop()`](js/main.js:235) es para atributos HTML, [`.attr()`](js/main.js:25) para propiedades DOM.
d) [`.attr()`](js/main.js:25) solo puede leer valores, [`.prop()`](js/main.js:235) puede leer y escribir.
> [!solution]- Respuesta Correcta
> La respuesta correcta es **b) [`.attr()`](js/main.js:25) es para atributos HTML, [`.prop()`](js/main.js:235) para propiedades DOM; [`.prop()`](js/main.js:235) es mejor para valores booleanos.**
> [`.attr()`](js/main.js:25) maneja atributos tal como están definidos en el HTML, mientras que [`.prop()`](js/main.js:235) maneja propiedades del objeto DOM, que pueden ser diferentes (especialmente para valores booleanos como `checked` o `disabled`).

### Pregunta 10
¿Qué método de jQuery usarías para realizar una petición AJAX de tipo GET esperando una respuesta JSON, de forma abreviada?
a) [`$.ajax({ type: 'GET', dataType: 'json', ... })`](tutorial_jquery_selectores.md:269)
b) [`$.load(url, dataType: 'json')`](https://api.jquery.com/load/)
c) [`$.getJSON(url, callback)`](js/main.js:21)
d) [`$.post(url, dataType: 'json', callback)`](https://api.jquery.com/jQuery.post/)
> [!solution]- Respuesta Correcta
> La respuesta correcta es **c) [`$.getJSON(url, callback)`](js/main.js:21)**.
> [`$.getJSON()`](js/main.js:21) es el método abreviado específico para peticiones GET que esperan una respuesta JSON.

### Pregunta 11
Para aplicar un efecto de desvanecimiento gradual hasta ocultar un elemento con ID `aviso`, ¿qué método usarías?
a) [`$('#aviso').hide('slow');`](tutorial_jquery_selectores.md:160)
b) [`$('#aviso').fadeOut('slow');`](js/main.js:203)
c) [`$('#aviso').slideUp('slow');`](https://api.jquery.com/slideUp/)
d) [`$('#aviso').animate({opacity: 0}, 'slow');`](https://api.jquery.com/animate/)
> [!solution]- Respuesta Correcta
> La respuesta correcta es **b) [`$('#aviso').fadeOut('slow');`](js/main.js:203)**.
> Mientras que `animate` también podría lograrlo, [`.fadeOut()`](js/main.js:203) es el método específico para el efecto de desvanecimiento hasta ocultar. [`.hide()`](tutorial_jquery_selectores.md:160) con duración también anima, pero [`.fadeOut()`](js/main.js:203) es más explícito para el efecto de desvanecimiento.

### Pregunta 12
¿Qué método de un elemento formulario DOM se puede usar para activar las validaciones HTML5 del navegador y verificar si todos sus campos son válidos?
a) `$(formulario).validate()`
b) `formulario.isValid()`
c) `formulario.checkValidity()`
d) `$(formulario).check()`
> [!solution]- Respuesta Correcta
> La respuesta correcta es **c) `formulario.checkValidity()`**.
> El método `checkValidity()` del elemento DOM del formulario devuelve `true` si todos los campos son válidos según las reglas de HTML5, y `false` en caso contrario. También activa la UI de validación del navegador.

### Pregunta 13
En un manejador de eventos `submit` de un formulario jQuery, ¿cómo previenes el envío tradicional del formulario para manejarlo con JavaScript/AJAX?
a) `return false;` al final de la función.
b) `event.stop();`
c) `event.preventDefault();`
d) Ambas a) y c) son formas válidas y comunes.
> [!solution]- Respuesta Correcta
> La respuesta correcta es **d) Ambas a) y c) son formas válidas y comunes.**
> `event.preventDefault();` es la forma estándar de prevenir la acción por defecto de un evento. `return false;` en un manejador de eventos jQuery también llama internamente a `event.preventDefault()` y `event.stopPropagation()`.