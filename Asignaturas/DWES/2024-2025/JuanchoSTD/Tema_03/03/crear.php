<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Crear nuevo alumno</title>
  </head>
  <body>
    <h1>Crear nuevo alumno</h1>
<?php
if (isset($_POST["nif"])) {
  require_once 'conexion.php';
  $consulta = "insert into alumnos values ('".$_POST["nif"]."', '".$_POST["nombre"]."')";
  $sentencia = $conexion->prepare($consulta);
  try {
    $sentencia->execute();
  } catch (PDOException $ex) {
    die("Error: ".$ex->getMessage());
  }
  $sentencia = null;
  $conexion = null;
?>
    <p>Alumno creado</p>
    <p><a href="listado.php">Volver al listado</a></p>  
<?php
}
else
{
?>
    <form method="POST">
      <p>NIF: <input type="text" name="nif" required></p>
      <p>Nombre: <input type="text" name="nombre" required></p>
      <p><input type="submit" value="Enviar"></p>
    </form>
<?php
}
?>
  </body>
</html>
