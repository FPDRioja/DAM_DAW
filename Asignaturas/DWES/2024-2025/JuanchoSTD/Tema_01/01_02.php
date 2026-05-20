<?php
//Pide el primer número 
echo "Dame dos números, empieza con el primero: ";
//Recibe el valor para a
$a = readline();
echo "Ahora el segundo: ";
//Recibe el valor para b
$b = readline();
//Valida que sean números (double) y si lo son devuelve la suma, si no explica el error y sale.
if (doubleval($a) == $a && doubleval($b) == $b){
	echo "La suma de esos don números es: ".strval($a + $b);
}else{
	echo "Algo ha ido mal. Debes dar números, recuérdalo, suerte la próxima vez.";
}
echo "\nHasta la próxima!.";
?>