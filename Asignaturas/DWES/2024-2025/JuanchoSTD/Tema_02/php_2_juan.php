<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>ej1_ud02_01</title>
	</head>
	<body>
<?php
if (isset($_POST["submit"]) == true) { // si venimos del formulario ...
	$modulos = array();
	if (isset($_POST["modulos"]) == true){
		$modulos = unserialize($_POST["modulos"]);
		// echo $modulos;
		// echo unserialize($_POST["modulos"]);
	}
	print_r($modulos);
	 // inicializar array
	$modulos["dwes"] = $_POST["dwes"]; // meter nota dwes
	$modulos["dwec"] = $_POST["dwec"]; // meter nota dwec
	$modulos["diw"] = $_POST["diw"]; // meter nota diw
	$modulos["dpaw"] = $_POST["dpaw"]; // meter nota dpaw
	$total = 0; // inicializar total (variable acumulador)
	foreach ($modulos as $modulo => $nota) { // recorremos el array
		echo "\t\t<p>$modulo: $nota</p>\n"; // mostramos una nota
		$total = $total + $nota; // sumamos la nota al acumulador
	}
	$media = $total / 4; // calculamos la media aritmetica
	echo "\t\t<p>Media: $media</p>\n"; // mostramos la media
}
?>
		<h1>ej1_ud02_01</h1>
		<form method="post">
			<input type="hidden" name="modulos" value='<?php echo serialize($modulos);?>'>
			<p><label>DWES: <input type="number" name="dwes" min="0" max="10" required></label></p>
			<p><label>DWEC: <input type="number" name="dwec" min="0" max="10" required></label></p>
			<p><label>DIW: <input type="number" name="diw" min="0" max="10" required></label></p>
			<p><label>DPAW: <input type="number" name="dpaw" min="0" max="10" required></label></p>
			<p><input type="submit" name="submit"></p>
		</form>

<?php



?>
	</body>
</html>