<?php
header('Content-Type: application/json');
//$accion = $_GET['accion'];
$accion = $_REQUEST['accion']; //Para poder mandar por POST y GET indistintamente

$conexion = mysqli_connect('localhost', 'root', '', 'ventas');
if (!$conexion) {
    die('Error de conexión con BBDD: ' . mysqli_error($conexion));
}

mysqli_set_charset($conexion, "utf8");

switch ($accion) {
    case 'lista_clientes':
        $consulta = "select nomcliente, dni from cliente";
        $resultado_consulta = mysqli_query($conexion, $consulta);
        if (mysqli_num_rows($resultado_consulta) > 0) {
            while ($fila = mysqli_fetch_assoc($resultado_consulta)) {
                $clientes[] = $fila;
            }
        }

        if (isset($_REQUEST['XML']) && $_REQUEST['XML'] == '1') { //Dejo esta opción en este caso por si cae en examen
            // Crear XML
            $xml = new DOMDocument('1.0', 'UTF-8');
            $xml->formatOutput = true;

            // Crear la raíz
            $root = $xml->createElement('clientes');
            $xml->appendChild($root);

            // Resultados y añadirlos al XML
            foreach ($clientes as $fila) {
                $cliente = $xml->createElement('cliente');

                $nombre = $xml->createElement('nombre', $fila['nomcliente']);
                $cliente->appendChild($nombre);

                $dni = $xml->createElement('dni', $fila['dni']);
                $cliente->appendChild($dni);

                $root->appendChild($cliente);
            }

            // Devolver XML
            header('Content-Type: application/xml');
            echo $xml->saveXML();
        } else {
            //Devolvemos json
            header('Content-Type: application/json');
            echo json_encode($clientes);
        }
        break;
    case 'listar_facturas':
        $dni_cliente = $_REQUEST['dni_cliente'];
        $consulta = "select * from cab_factura where dni = '$dni_cliente' order by fecha desc";
        $resultado_consulta = mysqli_query($conexion, $consulta);

        $facturas = [];
        while ($fila = mysqli_fetch_assoc($resultado_consulta)) {
            $facturas[] = $fila;
        }
        header('Content-Type: application/json');
        echo json_encode($facturas);
        break;
}

mysqli_close($conexion);
