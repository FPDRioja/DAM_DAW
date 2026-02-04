# 🚌 Ejercicio 7: Estación de Autobuses Interactiva

**Objetivo:** Crear un programa que permita gestionar una estación de autobuses y sus pasajeros de forma interactiva, aplicando validaciones de capacidad y coincidencia de rutas.

## Instrucciones:

1. **Clase `Pasajero`**: Crea una clase con los atributos `nombre` y `destino`.

2. **Clase `Autobus`**: Al instanciarse, debe recibir:
    * El número de `asientos_totales`.
    * La `linea_que_recorre` (que define el destino del bus).

3. **La clase `Autobus` debe tener**:
    * Una lista vacía llamada `pasajeros`.
    * **Método `subir_pasajero`**:
        * **Validación 1**: Solo permite subir al pasajero si su `destino` coincide exactamente con la `linea_que_recorre`.
        * **Validación 2**: Solo permite subir si hay asientos disponibles.
        * **Avisos**: Debe informar si el pasajero subió con éxito o si falló por "Destino incorrecto" o "Autobús lleno".
    * **Método `mostrar_lista`**: Muestra los nombres de los pasajeros que van en el autobús.

4. **Clase `Estacion`**: Gestiona la flota de autobuses. Debe tener:
    * Una lista vacía llamada `autobuses`.
    * **Método `añadir_autobus`**: Permite añadir un nuevo objeto de la clase `Autobus` a la estación.
    * **Método `mostrar_autobuses`**: Muestra todos los autobuses registrados y sus respectivos pasajeros.
    * **Método `mostrar_destinos`**: Muestra una lista única de todas las líneas/destinos disponibles en la estación.

5. **Programa Interactivo (Main)**: Implementa un menú que:
    * Pregunte al usuario cuántos asientos tiene un autobús y qué línea recorre para crearlo, si la linea ya existe no se puede crear otro con la misma linea.
    * Permita añadir estos autobuses a la estación.
    * Permita añadir pasajeros solicitando `nombre` y `destino`.
    * Permite elegir el pasajero y el autobús al que desea subir.
    * Muestre la lista de pasajeros de un autobús concreto.
    * Muestre el estado global (todos los autobuses y sus pasajeros).
    * Finalice la ejecución cuando el usuario lo indique.
