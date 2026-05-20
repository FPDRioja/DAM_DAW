<?php
    header('Content-Type: application/json');
    $accion = $_POST['accion'];

    $con = mysqli_connect('localhost','root','','ejemplodept');
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }

    mysqli_set_charset($con, "utf8");

    if ($accion == 'getEmpleados') {
        $q = intval($_POST['q']);
        $indice = intval($_POST['oculto']);
        $ordenacion = $_POST['ordenacion'];
        $dirOrdenacion = $_POST['dirOrdenacion'];

        $sql="SELECT * FROM empleados ORDER BY ".$ordenacion." ".$dirOrdenacion." LIMIT ".$indice.",".$q;
        $result = mysqli_query($con,$sql);
        $datos=[];
        while($row = mysqli_fetch_assoc($result)) {
            array_push($datos,$row);
        }
    } else if ($accion == 'getDepartamentos') {
        $sql="SELECT dept_no FROM departamentos";
        $result = mysqli_query($con,$sql);
        $datos=[];
        while($row = mysqli_fetch_assoc($result)) {
            array_push($datos,$row);
        }
    } else if ($accion == 'getMaxEmpleado') {
        $sql="SELECT MAX(emp_no) FROM empleados";
        $result = mysqli_query($con,$sql);
        $datos = $result->fetch_array(MYSQLI_NUM)[0];
    } else if ($accion == 'insert') {




    } else if ($accion == 'update') {
      
	  
	  
	  
    }

    
    echo json_encode($datos);
    mysqli_close($con);
    
?>