<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Actualizar Producto</title>
    <link rel="stylesheet" href="css/style.css">
    <script>
        window.onload = function() {
            const formulario = document.getElementById('formulario');
            const pMensaje = document.getElementById('mensaje');

            const promesaFamilias = fetch('../servidor/familiaREST.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error HTTP: ${response.status}`);
                    }
                    return response.json();
                });
            // el id pude sacarse desde js, pero lo dejo en php
            const promesaProducto = fetch('../servidor/productoREST.php?id=<?php echo $_GET["id"]; ?>')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error HTTP: ${response.status}`);
                    }
                    return response.json();
                });
            Promise.all([promesaProducto, promesaFamilias])
                .then(resultados => {
                    const producto = resultados[0];
                    const familias = resultados[1];
                    let formulario = document.getElementById('formulario');
                    document.getElementsByName('id')[0].value = producto.id;
                    document.getElementsByName('nombre')[0].value = producto.nombre;
                    document.getElementsByName('nombre_corto')[0].value = producto.nombre_corto;
                    document.getElementsByName('descripcion')[0].value = producto.descripcion;
                    document.getElementsByName('pvp')[0].value = producto.pvp;

                    let familiasSelect = document.getElementById('select_familias');
                    familias.forEach(f => {
                        const selected = (f.cod == producto.familia) ? "selected" : "";
                        familiasSelect.innerHTML += `
                            echo "<option value='${f.cod}' ${selected}>${f.nombre}</option>";
                        `;
                    });
                    formulario.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const datos = {
                            id: document.getElementsByName('id')[0].value,
                            nombre: document.getElementsByName('nombre')[0].value,
                            nombre_corto: document.getElementsByName('nombre_corto')[0].value,
                            descripcion: encodeURIComponent(document.getElementsByName('descripcion')[0].value),
                            pvp: document.getElementsByName('pvp')[0].value,
                            familia: document.getElementById('select_familias').value
                        };
                        let url = `../servidor/productoREST.php?` +
                            `id=${datos.id}&` +
                            `nombre=${datos.nombre}&` +
                            `nombre_corto=${datos.nombre_corto}&` +
                            `descripcion=${datos.descripcion}&` +
                            `pvp=${datos.pvp}&` +
                            `familia=${datos.familia}`;
                        fetch(url, {
                            method: 'PUT'
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error(`Error HTTP: ${response.status}`);
                            }
                            return response.text();
                        }).then(mensaje => {
                            pMensaje.textContent = mensaje;
                        });
                    });
                }).catch((err) => {
                    pMensaje.textContent = 'Error: ' + err;
                });

        }
    </script>
</head>

<body>
    <h1>Actualizar Producto</h1>
    <form method="POST" action="?" id='formulario'>
        <input type="hidden" name="id">
        <p>Nombre: <input type="text" name="nombre" required></p>
        <p>Nombre corto: <input type="text" name="nombre_corto" required></p>
        <p>Descripción: <textarea name="descripcion"></textarea></p>
        <p>PVP: <input type="number" step="0.01" name="pvp" min="0.01" required></p>
        <p>Familia:
            <select name="familia" required id='select_familias'>
            </select>
        </p>
        <p>
            <input type="submit" value="Actualizar" class='boton' id='btnActualizar'>
            <a href='listado.html'> <input type='button' value='Volver al listado' class='boton'></a>
        </p>
    </form>

    <p id='mensaje'></p>
    <p><a href='listado.html'> <input type='button' value='Volver al listado' class='boton'></a></p>

</body>

</html>