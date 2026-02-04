# 🔐 Ejercicio 8: El Desafío de la Contraseña Oculta

**Objetivo:** Crear un programa de seguridad interactivo que valide el acceso mediante una contraseña secreta, implementando un sistema de pistas aleatorias y un límite de intentos.

## Instrucciones:

1. **Configuración Inicial**: Define una variable con la contraseña correcta (ej: `"Python2026"`) y un contador de intentos que empiece en 0.

2. **Función `validar_entrada`**: Debe recibir el texto ingresado por el usuario:
    * Si la contraseña es correcta: Muestra un mensaje de éxito y finaliza el programa inmediatamente.
    * Si es incorrecta: Muestra un mensaje de error y permite que el programa continúe.

3. **Función `generar_pista`**: Debe generar una ayuda visual basada en la contraseña secreta:
    * Debe elegir una posición al azar de la contraseña.
    * Debe imprimir una cadena donde todos los caracteres sean asteriscos (`*`), excepto el carácter de la posición elegida.
    * *Ejemplo si la clave es "Secreto": `**c****`*

4. **Lógica de Control**:
    * El programa solo debe permitir un máximo de **4 intentos** fallidos.
    * Si se alcanza este límite, el programa debe mostrar un mensaje de "Límite alcanzado" y cerrarse automáticamente.

5. **Programa Interactivo (Menú)**: Implementa un bucle que en cada iteración:
    * Muestre un menú con las opciones: `ayuda` (para ver la pista), `salir` (para cerrar) o escribir la contraseña.
    * **Caso `ayuda`**: Llama a la función de pista.
    * **Caso `salir`**: Termina el programa con un mensaje de despedida.
    * **Cualquier otro texto**: Llama a la función `validar_entrada` para comprobar si el usuario acertó.
    * Incrementa el contador de intentos después de cada acción (excepto al salir).
