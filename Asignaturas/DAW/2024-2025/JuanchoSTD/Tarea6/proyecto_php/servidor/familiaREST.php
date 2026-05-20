<?php
/**
 * Script para manejar las solicitudes REST relacionadas con las familias.
 * Permite recuperar la lista de familias a través de una solicitud GET.
 *
 * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
 * @version 1
 * @see \FamiliaBD
 */
require("clases/FamiliaBD.php");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $familias = new FamiliaBD();
  if (isset($_GET['id'])) {
    /**
     * Maneja la solicitud GET para recuperar una familia por su ID.
     *
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    header("HTTP/1.1 200 OK");
    echo json_encode($familias->recuperarFamiliaPorId($_GET['id']));
    exit();
  } else {
    /**
     * Maneja la solicitud GET para recuperar todas las familias.
     *
     * @author Juan Cruz Garrido Suso <jgarrido605r@fpdrioja.com>
     * @version 1
     */
    header("HTTP/1.1 200 OK");
    echo json_encode($familias->recuperarFamilias());
    exit();
  }
}
