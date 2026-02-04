# 🚌 Ejercicio 6: Autobús Interactivo
**Objetivo:** Crear un programa que permita gestionar pasajeros de un autobús de forma interactiva. No se debe permitir subir más pasajeros que asientos disponibles.

## Instrucciones:
1. Crea una clase `Pasajero` con los atributos `nombre` y `destino`.
2. Crea una clase `Autobus` que al crearse reciba el número de `asientos_totales`.
3. La clase `Autobus` debe tener:
    * Una lista vacía llamada `pasajeros`.
    * Un método `subir_pasajero`: Si hay sitio, lo añade. Si no, avisa de que está lleno.
    * Un método `mostrar_lista`: Muestra quién va en el bus.
4. Implementa un programa interactivo que:
    * Pregunte al usuario cuántos asientos tiene el autobús.
    * Permita añadir pasajeros solicitando su nombre y destino.
    * Muestre la lista de pasajeros después de cada acción.
    * Finalice cuando el usuario lo indique.
