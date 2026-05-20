<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Semana presencial (Evaluación parcial) Juan Cruz Garrido Suso</title>
</head>
<body>
    <?php
    if (isset($_FILES['imagen'])) {
        $archivo = $_FILES['imagen'];
        $nombreArchivo = time() . '_' . $archivo['name'];
        $rutaDestino = 'uploads/' . $nombreArchivo;
        
        if (move_uploaded_file($archivo['tmp_name'], $rutaDestino)) {
            echo "<p>Imagen actualizada correctamente</p>";
            echo "<img src='uploads/$nombreArchivo' width='200'>";
        } else {
            echo "<p>Error al subir la imagen</p>";
        }
    }
    ?>

    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="imagen" accept="image/*">
        <input type="submit" value="Subir">
    </form>
</body>
</html>