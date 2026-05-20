let paginacion = 0;
let ordenacion = "emp_no";
let dirOrdenacion = "asc";
let departamentos;

async function mostrarDatos() {
    var numFilas = parseInt(document.getElementById("selectFilas").value);

    departamentos = undefined;
    let data2 = new FormData();
    data2.append("accion", "getDepartamentos");

    departamentos = await fetch("frontal.php", {
        method: "POST",
        body: data2
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("No se han podido obtener los departamentos")
        }
    })
    .then(json => {
        return json;
    })
    .catch(error => {
        console.error(error);
    });
    
    let data = new FormData();
    data.append("accion", "getEmpleados")
    data.append("q", (numFilas + 1));
    data.append("oculto", paginacion);
    data.append("ordenacion", ordenacion);
    data.append("dirOrdenacion", dirOrdenacion);

    fetch("frontal.php", {
        method: "POST",
        body: data
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Ha ocurrido un error");
        }
    })
    .then(json => {
        if (json.length > 0) {
            var tabla = document.createElement('table');
            tabla.setAttribute("border", 1);
            var cabecera = construirCabecera();
            tabla.id = "tablaEmpleados";
            tabla.appendChild(cabecera);
            let length = json.length;
            if (length <= numFilas) {
                document.querySelector("input[name=siguiente]").disabled = true;
            } else {
                document.querySelector("input[name=siguiente]").disabled = false;
                length--;
            }
            for (let i = 0; i < length; i++) {
                let fila = construirFila(json[i], (i+1));
                tabla.appendChild(fila);
            }
            document.getElementById("tabla").innerHTML = "";
            document.getElementById("tabla").appendChild(tabla);
        } else {
            document.querySelector("input[name=siguiente]").disabled = true;
        }
    })
    .catch(error => {
        console.error(error);
    });

}

function construirCabecera() {
    var cabecera = document.createElement('tr');

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Núm. Empleado");
    titulo.appendChild(texto);
    titulo.onclick = () => {
        ordenar("emp_no");
    }
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Apellido");

    titulo.onclick = () => {
        ordenar("apellido");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Oficio");
    titulo.onclick = () => {
        ordenar("oficio");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Director");
    titulo.onclick = () => {
        ordenar("dir");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Fecha Alta");
    titulo.onclick = () => {
        ordenar("fecha_alt");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Salario");
    titulo.onclick = () => {
        ordenar("salario");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Comisión");
    titulo.onclick = () => {
        ordenar("comision");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    var titulo = document.createElement('th');
    var texto = document.createTextNode("Departamento");
    titulo.onclick = () => {
        ordenar("dept_no");
    }
    titulo.appendChild(texto);
    cabecera.appendChild(titulo);

    return cabecera;
}

function construirFila(datos, n) {
    linea = document.createElement('tr');

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "emp_no";
    campo.type = "number";
    campo.value = datos.emp_no;
    campo.setAttribute("readonly", true);
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "apellido";
    campo.type = "text";
    campo.value = datos.apellido;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "oficio";
    campo.type = "text";
    campo.value = datos.oficio;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "dir";
    campo.type = "number";
    campo.value = datos.dir;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "fecha_alt";
    campo.type = "text";
    campo.value = datos.fecha_alt;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "salario";
    campo.type = "number";
    campo.value = datos.salario;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('input');
    campo.className = "comision";
    campo.type = "number";
    campo.value = datos.comision;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    var titulo = document.createElement('td');
    var campo = document.createElement('select');
    departamentos.forEach(departamento => {
        let option = document.createElement('option');
        option.innerText = departamento["dept_no"];
        campo.appendChild(option);
    });
    campo.className = "dept_no";
    campo.type = "number";
    campo.value = datos.dept_no;
    campo.onblur = function () { actualizarFila(n) };
    titulo.appendChild(campo);
    linea.appendChild(titulo);

    return linea;
}

function siguiente() {
    paginacion += parseInt(document.getElementById("selectFilas").value);
    mostrarDatos();
    document.querySelector("input[name=anterior]").disabled = false;
}

function anterior() {
    paginacion -= parseInt(document.getElementById("selectFilas").value);
    if (paginacion < 1) {
        paginacion = 0;
        document.querySelector("input[name=anterior]").disabled = true;
    }
    mostrarDatos();
}

function ordenar(campo) {
    if (ordenacion == campo) {
        if (dirOrdenacion == "desc") {
            dirOrdenacion = "asc";
        } else {
            dirOrdenacion = "desc";
        }
    } else {
        ordenacion = campo;
        dirOrdenacion = "asc";
    }
    mostrarDatos();
}

async function insertarFila() {

}

function insert(n) {
   
}

function actualizarFila(n) {
  
}

function compruebaEmpleado(n) {
 
}