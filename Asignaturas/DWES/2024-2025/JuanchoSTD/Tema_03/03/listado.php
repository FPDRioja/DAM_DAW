<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Listado</title>
  </head>
  <body>
    <h1>Listado</h1>
    <table border="1">
      <tr>
        <th>NIF</th>
        <th>Nombre</th>
        <th>Borrar</th>
        <th>Editar</th>
      </tr>
<?php
require_once 'conexion.php';
$consulta = "select * from alumnos";
$sentencia = $conexion->prepare($consulta);
try {
  $sentencia->execute();
} catch (PDOException $ex) {
  die("Error: ".$ex->getMessage());
}
while ($filas = $sentencia->fetch(PDO::FETCH_OBJ)) {
?>
      <tr>
        <td><?php echo $filas->nif;?></td>
        <td><?php echo $filas->nombre;?></td>
        <td><a href="borrar.php?nif=<?php echo $filas->nif;?>">Borrar</a></td>
        <td><a href="update.php?nif=<?php echo $filas->nif;?>">Editar</a></td>
      </tr>
<?php
}
$sentencia = null;
$conexion = null;
?>
    </table>
    <p><a href="crear.php">Crear un nuevo alumno</a></>
  </body>
</html>
