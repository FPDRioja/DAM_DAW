<?php

require("ConexionBD.php");

/**
 * Clase para gestionar las operaciones de base de datos relacionadas con los productos.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 * @see \ConexionBD
 */
class ProductoBD extends ConexionBD
{
    /**
     * Constructor de la clase ProductoBD.
     * Llama al constructor de la clase padre (ConexionBD) para establecer la conexión.
     *
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * Recupera todos los productos de la base de datos.
     *
     * @return array Un array de objetos que representan los productos.
     * @throws PDOException Si ocurre un error durante la consulta.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    function recuperarProductos()
    {
        $consulta = "select * from productos order by nombre";
        $stmt = $this->conexion->prepare($consulta);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error al recuperar productos: " . $ex->getMessage());
        }
        $this->conexion = null;
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * Elimina un producto de la base de datos por su ID.
     *
     * @param int $idProducto El ID del producto a eliminar.
     * @return string Un mensaje indicando el resultado de la operación.
     * @throws PDOException Si ocurre un error durante la eliminación.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    function eliminarProducto($idProducto)
    {
        $consulta = "DELETE FROM productos WHERE id = " . $idProducto;
        $stmt = $this->conexion->prepare($consulta);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error eliminar producto " . $ex->getMessage());
        }
        $this->conexion = null;
        return "Producto de código:{$idProducto} borrado correctamente";
    }

    /**
     * Inserta un nuevo producto en la base de datos.
     *
     * @param string $nombre El nombre del producto.
     * @param string $nombre_corto El nombre corto del producto.
     * @param string $descripcion La descripción del producto.
     * @param float $pvp El precio de venta al público del producto.
     * @param string $familia El código de la familia a la que pertenece el producto.
     * @return string Un mensaje indicando el resultado de la operación.
     * @throws PDOException Si ocurre un error durante la inserción.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    function insertarProducto($nombre, $nombre_corto, $descripcion, $pvp, $familia)
    {
        $consulta = "INSERT INTO productos(nombre, nombre_corto, descripcion, pvp, familia)
            VALUES ('$nombre', '$nombre_corto', '$descripcion', '$pvp', '$familia')";
        $stmt = $this->conexion->prepare($consulta);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error al insertar producto: " . $ex->getMessage());
        }
        $this->conexion = null;
        return "Producto {$nombre} insertado correctamente";
    }

    /**
     * Recupera el detalle de un producto por su ID.
     *
     * @param int $idProducto El ID del producto a recuperar.
     * @return object Un objeto que representa el detalle del producto, incluyendo el nombre de la familia.
     * @throws PDOException Si ocurre un error durante la consulta.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     * @see \FamiliaBD Para obtener información sobre las familias.
     */
    function recuperarDetalleProducto($idProducto)
    {
        $consulta = "SELECT p.*, f.nombre as nombre_familia FROM productos p, familias f
            WHERE id = '$idProducto' AND p.familia = f.cod";
        $stmt = $this->conexion->prepare($consulta);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error al recuperar detalle de producto: " . $ex->getMessage());
        }
        $this->conexion = null;
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * Actualiza un producto existente en la base de datos.
     *
     * @param string $nombre El nuevo nombre del producto.
     * @param string $nombre_corto El nuevo nombre corto del producto.
     * @param string $descripcion La nueva descripción del producto.
     * @param float $pvp El nuevo precio de venta al público del producto.
     * @param string $familia El nuevo código de la familia a la que pertenece el producto.
     * @param int $idProducto El ID del producto a actualizar.
     * @return string Un mensaje indicando el resultado de la operación.
     * @throws PDOException Si ocurre un error durante la actualización.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    function actualizarProducto($nombre, $nombre_corto, $descripcion, $pvp, $familia, $idProducto)
    {
        $consulta = "UPDATE productos SET
            nombre = '$nombre',
            nombre_corto = '$nombre_corto',
            descripcion = '$descripcion',
            pvp = '$pvp',
            familia = '$familia'
            WHERE id = '$idProducto'";
        $stmt = $this->conexion->prepare($consulta);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error al actualizar producto: " . $ex->getMessage());
        }
        $this->conexion = null;
        return "Producto {$nombre} actualizado correctamente";
    }
}
