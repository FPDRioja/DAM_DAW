<?php
$host="localhost";
$db="prueba";
$user="root";
$pass="";
$dsn="mysql:host=$host;dbname=$db;charset=utf8mb4";
try {
  $conexion = new PDO($dsn, $user, $pass);
  $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $ex) {
  die("Error en la conexión: ".$ex->getMessage());
}
?>