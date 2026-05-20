<?php
/**
 * Script para manejar las solicitudes REST relacionadas con los productos.
 * Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 * @see \ProductoBD
 */
require("clases/ProductoBD.php");
$productos = new ProductoBD();

/**
 * Maneja las solicitudes GET para recuperar productos.
 * Si se especifica un 'id', recupera el detalle de un producto específico.
 * Si no se especifica 'id', recupera la lista completa de productos.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        // Mostrar un producto
        header("HTTP/1.1 200 OK");
        echo json_encode($productos->recuperarDetalleProducto($_GET['id']));
        exit();
    } else {
        // Mostrar lista de productos
        header("HTTP/1.1 200 OK");
        echo json_encode($productos->recuperarProductos());
        exit();
    }
}

/**
 * Maneja las solicitudes POST para crear un nuevo producto.
 * Inserta un nuevo producto en la base de datos con los datos proporcionados.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $desc = htmlspecialchars($_POST['descripcion'], ENT_QUOTES, 'UTF-8');
    $mensaje = $productos->insertarProducto($_POST['nombre'], $_POST['nombre_corto'], $desc, $_POST['pvp'], $_POST['familia']);
    header("HTTP/1.1 200 OK");
    echo $mensaje;
    exit();
}

/**
 * Maneja las solicitudes DELETE para eliminar un producto.
 * Elimina un producto de la base de datos por su ID.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 */
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $mensaje = $productos->eliminarProducto($_GET['id']);
    header("HTTP/1.1 200 OK");
    echo $mensaje;
    exit();
}

/**
 * Maneja las solicitudes PUT para actualizar un producto existente.
 * Actualiza los datos de un producto en la base de datos por su ID.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 */
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $desc = htmlspecialchars($_GET['descripcion'], ENT_QUOTES, 'UTF-8'); //Con esto y la parte de js podremos recuperar saltos de linea
    $mensaje = $productos->actualizarProducto($_GET['nombre'], $_GET['nombre_corto'], $desc, $_GET['pvp'], $_GET['familia'], $_GET['id']);
    header("HTTP/1.1 200 OK");
    echo $mensaje;
    exit();
}

// En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");
