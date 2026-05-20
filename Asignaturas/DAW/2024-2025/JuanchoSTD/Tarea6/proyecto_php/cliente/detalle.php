<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Detalles del Producto</title>
  <link rel="stylesheet" href="css/style.css">
  <script>
    window.onload = function() {
      let tabla = document.getElementById('tabla');
      fetch('../servidor/productoREST.php?id=<?php echo $_GET["id"]; ?>')// el id pude sacarse desde js (get), pero lo dejo en php
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.json();
        }).then(json => {
          tabla.innerHTML += `
          <tr>
            <th>Código:</th>
            <td>${json.id}</td>
          </tr>
          <tr>
            <th>Nombre:</th>
            <td>${json.nombre}</td>
          </tr>
          <tr>
            <th>Nombre Corto:</th>
            <td>${json.nombre_corto}</td>
          </tr>
          <tr>
            <th>Descripción:</th>
            <td>${json.descripcion.replace(/\r?\n/g, '<br>')}</td> 
          </tr>
          <tr>
            <th>PVP:</th>
            <td>${json.pvp}€</td>
          </tr>
          <tr>
            <th>Familia:</th>
            <td>${json.nombre_familia}</td>
          </tr>
        `;
        }).catch((err) => {
          pMensaje.textContent = 'Error: ' + err;
        });
    }
  </script>

</head>

<body>
  <h1>Detalles del Producto</h1>
  <?php
  if (!isset($_GET["id"])) { //Dejo esta redirección, aunque puede hacerse tb en js y dejar esto como un html
    header('Location: listado.html');
    exit(); // Es importante poner exit después del header
  }
  ?>
  <table id='tabla' border="1">
  </table>
  <p>
    <a href="update.php?id=<?php echo $_GET["id"]; ?>"> <input type="button" value="Editar" class="boton"></a>
    <a href='listado.html'> <input type='button' value='Volver al listado' class='boton'></a>
  </p>

</body>

</html>