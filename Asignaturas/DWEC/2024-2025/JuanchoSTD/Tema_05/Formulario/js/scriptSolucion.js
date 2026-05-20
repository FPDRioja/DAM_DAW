window.onload = ejercicio;

// Función para obtener el valor string de la cookie
function getCookie(nombre) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === nombre) {
            return cookieValue;
        }
    }
    return null;
}

// Función para establecer una cookie
function setCookie(nombre, valor, dias = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${nombre}=${valor};${expires};path=/`; //Usando ` y $
}

// Esto lo hago así para poder resetear la cookie con facilidad y opcionalmegte al cargar la página, no conmsta en el ejercicio pero pienso que lo deja más limpio.
function removeCookie(nombre){
    if (getCookie(nombre) != null){
        if (confirm("Cokkie encontrada, ¿la quieres eliminar?")){
            setCookie(nombre, 0, -1);
        }
    }   
}

// Función para incrementar un contador en una cookie
function incrementarContadorCookie() {
    let contador = parseInt(getCookie('contadorSolicitudes')) || 0;
    contador++;
    setCookie('contadorSolicitudes', contador);
    return contador;
}

function mostrarIntentosSubmit(){
    document.getElementById("intentos").innerHTML = `<span>Número de intentos: ${getCookie('contadorSolicitudes')}</span>`
}

function mostrarErrores(listaErrores){
    let htmlErrores = "";
    for (mensaje of listaErrores) { 
        htmlErrores += `<p>${mensaje}</p>`;  
    }
    document.getElementById("errores").innerHTML = htmlErrores;
}


function limpiarFormulario() {
    document.getElementById('formulario').reset();
    document.getElementById('errores').innerHTML = '';
}

function validarFormulario() {
    // Array para almacenar los errores y referencia al primer campo con error
    let listaErrores = [];
    let primerCampoConError = null;
    
    // Obtener elementos
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const edad = document.getElementById('edad');
    const nif = document.getElementById('nif');
    const email = document.getElementById('email');
    const provincia = document.getElementById('provincia');
    const fecha = document.getElementById('fecha');
    const telefono = document.getElementById('telefono');
    const hora = document.getElementById('hora');

    // Validar nombre
    if (!nombre.value.trim()) {
        listaErrores.push('El nombre es obligatorio');
        primerCampoConError = primerCampoConError || nombre;
    } else if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(nombre.value.trim())) {
        listaErrores.push('El nombre solo puede contener letras y espacios');
        primerCampoConError = primerCampoConError || nombre;
    }

    // Validar apellidos
    if (!apellidos.value.trim()) {
        listaErrores.push('Los apellidos son obligatorios');
        primerCampoConError = primerCampoConError || apellidos;
    } else if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(apellidos.value.trim())) {
        listaErrores.push('Los apellidos solo pueden contener letras y espacios');
        primerCampoConError = primerCampoConError || apellidos;
    }

    // Validar edad
    const edadNum = parseInt(edad.value);
    if (isNaN(edadNum) || edadNum < 0 || edadNum > 105) {
        listaErrores.push('La edad debe ser un número entre 0 y 105');
        primerCampoConError = primerCampoConError || edad;
    }

    // Validar NIF (8 números, guión y letra)
    // 8 dígitos (\d{8}) , seguidos de un guion y una letra(mayuscula o minuscula)
    const nifRegex = /^(\d{8})-([a-zA-Z])$/;
    if (!nifRegex.test(nif.value)) {
        listaErrores.push('El NIF debe tener formato: 12345678-A');
        primerCampoConError = primerCampoConError || nif;
    }

    // Validar email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.value)) {
        listaErrores.push('El email no tiene un formato válido');
        primerCampoConError = primerCampoConError || email;
    }

    // Validar provincia
    if (!provincia.value || provincia.value === "0") {
        listaErrores.push('Debe seleccionar una provincia');
        primerCampoConError = primerCampoConError || provincia;
    }

    // Validar fecha (dd/mm/aaaa o dd-mm-aaaa)
    // (\d{2})([-/]) -> 2 dígitos seguidos de una barra o un guión
    // (\d{2})\2     -> 2 digitos seguidos del mismo elemento elegido para el segundo grupo (/ ó -)
    // (\d{4})       -> 4 digitos
    const fechaRegex = /^(\d{2})([-/])(\d{2})\2(\d{4})$/; 
    if (!fechaRegex.test(fecha.value)) {
        listaErrores.push('La fecha debe tener formato dd/mm/aaaa o dd-mm-aaaa');
        primerCampoConError = primerCampoConError || fecha;
    }

    // Validar teléfono, 9 dígitos
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono.value)) {
        listaErrores.push('El teléfono debe tener 9 dígitos');
        primerCampoConError = primerCampoConError || telefono;
    }

    // Validar hora (hh:mm)
    // La hora solo poede ser de 00 a 29 ([0-2]\d) y el minuto de 00 a 59 ([0-5]\d)
    const horaRegex = /^([0-2]\d):([0-5]\d)$/;
    if (!horaRegex.test(hora.value)) {
        listaErrores.push('La hora debe tener formato hh:mm');
        primerCampoConError = primerCampoConError || hora;
    }

    // Mostrar errores si existen
    mostrarErrores(listaErrores);
    
    if (listaErrores.length > 0) {
        primerCampoConError.focus(); 
    }

    return listaErrores.length === 0;
}

function ejercicio(){
    removeCookie("contadorSolicitudes") // Cada ver que cargo de nuevo el ejercicio se permite eliminar la cookie

    document.getElementById("button").addEventListener('click', limpiarFormulario);
    document.getElementById("nombre").addEventListener('blur', function() {
        this.value = this.value.toUpperCase();
    });
    document.getElementById("apellidos").addEventListener('blur', function() {
        this.value = this.value.toUpperCase();
    });
    
    document.getElementById("formulario").addEventListener('submit', function (e) {
        e.preventDefault();
        incrementarContadorCookie()
        mostrarIntentosSubmit()

        if (validarFormulario()) {
            // Si no hay errores, cponfirmar envío y enviar
            if (confirm('¿Desea enviar el formulario?')){
                this.submit();
            }
        } 
    });
}

