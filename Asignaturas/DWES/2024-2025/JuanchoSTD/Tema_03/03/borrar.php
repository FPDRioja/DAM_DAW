<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Borrar</title>
  </head>
  <body>
    <h1>Borrar</h1>
<?php
require_once 'conexion.php';
$consulta = "delete from alumnos where nif='".$_GET["nif"]."'";
$sentencia = $conexion->prepare($consulta);
try {
  $sentencia->execute();
} catch (PDOException $ex) {
  die("Error: ".$ex->getMessage());
}
$sentencia = null;
$conexion = null;
?>
    <p>Alumno borrado</p>
    <p><a href="listado.php">Volver al listado</a></p>  
  </body>
</html>
