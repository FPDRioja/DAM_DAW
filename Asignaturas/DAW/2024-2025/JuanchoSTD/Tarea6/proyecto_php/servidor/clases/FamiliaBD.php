<?php

require ("ConexionBD.php");
/**
 * Clase para gestionar las operaciones de base de datos relacionadas con las familias.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 */
class FamiliaBD extends ConexionBD
{
    /**
     * Constructor de la clase FamiliaBD.
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
     * Recupera todas las familias de la base de datos.
     *
     * @return array Un array de objetos que representan las familias.
     * @throws PDOException Si ocurre un error durante la consulta.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    public function recuperarFamilias()
    {
        $consulta = "select cod, nombre from familias order by nombre";
        $stmt = $this->conexion->prepare($consulta);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error al recuperar familias: " . $ex->getMessage());
        }
        $this->conexion = null;
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    /**
     * Recupera una familia de la base de datos por su código.
     *
     * @param string $codFamilia El código de la familia a recuperar.
     * @return object|false Un objeto que representa la familia, o false si no se encuentra.
     * @throws PDOException Si ocurre un error durante la consulta.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    public function recuperarFamiliaPorId($codFamilia)
    {
        $consulta = "select cod, nombre from familias where cod = :cod";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':cod', $codFamilia);
        try {
            $stmt->execute();
        } catch (PDOException $ex) {
            die("Error al recuperar familia por ID: " . $ex->getMessage());
        }
        $this->conexion = null;
        return $stmt->fetch(PDO::FETCH_OBJ);
    }
}
?>
