<?php

/**
 * Clase para gestionar la conexión a la base de datos.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 */
class ConexionBD
{
    /**
     * @var string El nombre del host de la base de datos.
     */
    private $host;

    /**
     * @var string El nombre de la base de datos.
     */
    private $db;

    /**
     * @var string El nombre de usuario para la conexión a la base de datos.
     */
    private $user;

    /**
     * @var string La contraseña para la conexión a la base de datos.
     */
    private $pass;

    /**
     * @var string El DSN (Data Source Name) para la conexión PDO.
     */
    private $dsn;

    /**
     * @var PDO La instancia de la conexión PDO.
     */
    protected $conexion;

    /**
     * Constructor de la clase ConexionBD.
     * Inicializa las propiedades de conexión y crea la conexión a la base de datos.
     *
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    public function __construct()
    {
        $this->host = "localhost";
        $this->db = "proyecto";
        $this->user = "root";
        $this->pass = "";
        $this->dsn = "mysql:host={$this->host};dbname={$this->db};charset=utf8mb4";
        $this->crearConexion();
    }

    /**
     * Crea la conexión a la base de datos utilizando PDO.
     *
     * @return PDO La instancia de la conexión PDO.
     * @throws PDOException Si ocurre un error durante la conexión.
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    public function crearConexion()
    {
        try {
            $this->conexion = new PDO($this->dsn, $this->user, $this->pass);
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            die("Error en la conexión: mensaje: " . $ex->getMessage());
        }
        return $this->conexion;
    }
}
?>
