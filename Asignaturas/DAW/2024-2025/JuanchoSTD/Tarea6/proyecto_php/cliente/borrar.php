<!DOCTYPE html>
<html>
<!-- 
En mi opinión, este php no es necesario y el borrado podría hacerse desde cualquier otra a través de la sociliduts desde js 
 Lo dejo, de todos modos, para que sea como el ejercicio de la U 3
 -->

<head>
  <meta charset="utf-8">
  <title>Borrar Producto</title>
  <link rel="stylesheet" href="css/style.css">
  <script>
    window.onload = function() {
      const pMensaje = document.getElementById('mensaje');
      let url = '../servidor/productoREST.php?id=<?php echo $_POST["id"]; ?>'
      fetch(url, {
        method: 'DELETE'
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.text();
      }).then(mensaje => {
        pMensaje.textContent = mensaje;
      }).catch((err) => {
        pMensaje.textContent = 'Error: ' + err;
      });
    }
  </script>
</head>

<body>
  <h1>Borrar Producto</h1>
  <?php
  // Comprobamos que llegue el id del producto a borrar, si no llega redirigimos a listado en servidor, luego el js no se ejecuratá
  if (!isset($_POST["id"])) {
    header('Location: listado.php');
    exit(); // Es importante poner exit después de header, según leo, para evitar que se ejecute más código
  }
  ?>

  <p>
  <p id='mensaje'></p>
  <a href='listado.html'> <input type='button' value='Volver al listado' class='boton'></a>
  </p>
</body>

</html>