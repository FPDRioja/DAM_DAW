<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<title>ej1_ud02_01</title>
	</head>
	<body>
		<h1>ej1_ud02_01 - Ejercicio tema 2, Juan Cruz Garrido.</h1>
<?php
// Iniciamos la estructura de datos.
$resultados = array(); 
$resultados["tareas"] = array();
$resultados["examenes"] = array();

if (isset($_POST["submit_notas"]) == true) { // si venimos del formulario ...
	if (isset($_POST["resultados"]) == true){
		$resultados = unserialize($_POST["resultados"]);
	}
	//Añadimos el valor enviado en el último POST, según sea examen o tarea
	if ($_POST["actividad"] == "tarea"){
		$resultados["tareas"][] = $_POST["resultado"]; //Añadimos al array
	}
	if ($_POST["actividad"] == "examen"){
		$resultados["examenes"][] = $_POST["resultado"]; //Añadimos al array
	}

	$tareas = $resultados["tareas"];
	$examenes = $resultados["examenes"];

	//Presentamos los los datos almacenados y calculamos las medias
	$media_tareas = 0;
	$media_examenes = 0;
	if (sizeof($tareas) > 0){
		echo "\t\t<h2>Resultados de tareas almacenados:</h2>\n";
		$str_resumen = "\t\t<p>";
		foreach ($tareas as $tarea => $resultado) { // recorremos el array
			$str_resumen .= "$resultado".", "; 
		}
		$media_tareas = array_sum($tareas)/count($tareas);
		echo substr($str_resumen, 0, -2)."<p>\n";
		echo "\t\t<p>Nota media de las tareas: " . sprintf("%.2f", $media_tareas) . "<p>\n";
	}
	if (sizeof($examenes) > 0){
		echo "\t\t<h2>Resultados de ex&aacute;menes almacenados:</h2>\n";
		$str_resumen = "\t\t<p>";
		foreach ($examenes as $examen => $resultado) { // recorremos el array
			$str_resumen .= "$resultado".", ";
		}
		$media_examenes = array_sum($examenes)/count($examenes);
		echo substr($str_resumen, 0, -2)."<p>\n";
		echo "\t\t<p>Nota media de los exámenes: " . sprintf("%.2f", $media_examenes) . "<p>\n";
	}
	
	//Presentamos la media en caso de que haya algún valor informado
	if (sizeof($tareas) > 0 or (sizeof($examenes) > 0)) {
		$media = 0.3*$media_tareas + 0.7*$media_examenes;
		printf ("\t\t<h2> La media ponderada hasta este momento es: %.2f</h2>\n", $media);
	}
}
?>
		
		<form method="post">
			<input type="hidden" name="resultados" value='<?php echo serialize($resultados);?>'>			
			<p>
				<select name="actividad" id="actividad">
					<option value="tarea" selected>Tarea</option>
					<option value="examen">Ex&aacute;men</option>
				</select>
			</p>
			<p><label>Resultado: <input type="number" name="resultado" min="0" max="10" required></label></p>
			<p><input type="submit" name="submit_notas"></p>
		</form>
	</body>
</html>