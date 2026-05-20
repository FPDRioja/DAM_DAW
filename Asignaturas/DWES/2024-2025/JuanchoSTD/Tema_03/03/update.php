<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Actualizar</title>
  </head>
  <body>
    <h1>Actualizar</h1>
<?php
require_once 'conexion.php';
if (isset($_GET["nif"])) {
  $consulta = "select * from alumnos where nif='".$_GET["nif"]."'";
  $sentencia = $conexion->prepare($consulta);
  try {
    $sentencia->execute();
  } catch (PDOException $ex) {
    die("Error: ".$ex->getMessage());
  }
  $filas = $sentencia->fetch(PDO::FETCH_OBJ)
?>
    <form method="POST" action="?">
      <p>NIF: <input readonly type="text" name="nif" value="<?php echo $filas->nif;?>"></p>
      <p>Nombre: <input type="text" name="nombre" value="<?php echo $filas->nombre;?>"></p>
      <p><input type="submit" value="Enviar"></p>
    </form>
<?php
}
else
{
  $consulta = "update alumnos set nombre='".$_POST["nombre"]."' where nif='".$_POST["nif"]."'";
  $sentencia = $conexion->prepare($consulta);
  try {
    $sentencia->execute();
  } catch (PDOException $ex) {
    die("Error: ".$ex->getMessage());
  }
?>
    <p>Alumno actualizado</p>
    <p><a href="listado.php">Volver al listado</a></p>
<?php
}
$sentencia = null;
$conexion = null;
?>
  </body>
</html>
