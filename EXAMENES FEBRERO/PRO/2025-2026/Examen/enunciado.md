# Examen Febrero 2026 - Programación DAW

## Ejercicio 1: Gestión de Vehículo Eléctrico

### Pregunta del Examen

Diseñar e implementar las clases `VehiculoElectrico` y `Principal` para simular la gestión de un vehículo eléctrico.

La clase `VehiculoElectrico` debe contener:
- Atributos: `modelo` (String), `bateria` (double, porcentaje actual), `consumoKm` (double, consumo por kilómetro), `kilometrosRecorridos` (double).
- Constructor: Que inicialice el `modelo` y el `consumoKm`. La `bateria` debe inicializarse al 100% y `kilometrosRecorridos` a 0.
- Métodos:
    - `recorrer(double kilometros)`: Actualiza la batería y los kilómetros recorridos. La batería no puede ser inferior a 0. **No se deben usar sentencias `if` para controlar este límite, solo `Math.max` o `Math.min`.**
    - `recargar(double porcentaje)`: Aumenta el porcentaje de batería. La batería no puede superar el 100%. **No se deben usar sentencias `if` para controlar este límite, solo `Math.max` o `Math.min`.**
    - `mostrarInformacion()`: Muestra por consola el modelo, nivel actual de batería y kilómetros totales recorridos.
    - `estadoBateria()`: Devuelve un String indicando el estado de la batería: "BUENA" (>=60%), "MEDIA" (20%-59%), "BAJA" (<20%).

La clase `Principal` debe:
- Crear una instancia de `VehiculoElectrico`.
- Solicitar al usuario la cantidad de KM a recorrer y el porcentaje de batería a recargar.
- Realizar las operaciones de recorrer y recargar.
- Mostrar la información final del vehículo.

---

## Ejercicio 2: Utilidades Numéricas

### Pregunta del Examen

Implementar una clase `Ejercicio2` que proporcione funcionalidades para realizar diversas operaciones con números, gestionadas a través de un menú interactivo.

La clase `Ejercicio2` debe contener:
- Un método `menu()` que muestre un menú con las siguientes opciones:
    1. Sumar los números pares hasta un número `n` dado por el usuario.
    2. Sumar los múltiplos de un número `k` hasta un número `n` dado por el usuario.
    3. Mostrar los números primos hasta un número `n` dado por el usuario.
    4. Salir del programa.
- Implementar los métodos correspondientes para cada opción del menú.
- Utilizar `Scanner` para la entrada de usuario y un método `pulsaIntro()` para pausar la ejecución.

---

## Ejercicio 3: Gestión de Productos

### Pregunta del Examen

Desarrollar una aplicación para la gestión de productos, utilizando las clases `Producto` y `Principal`, organizadas en paquetes.

La clase `Producto` debe tener:
- Atributos: `nombre` (String), `categoria` (String), `precio` (double), `disponible` (boolean).
- Un atributo estático `totalProductos` para llevar la cuenta de cuántos productos se han creado.
- Dos constructores:
    - `Producto(String nombre, String categoria, double precio)`: Inicializa todos los atributos y `disponible` a `true`.
    - `Producto(String nombre, String categoria)`: Inicializa `nombre` y `categoria`, `precio` a 0.0 y `disponible` a `false`.
- Métodos:
    - `obtenerPrecio()`: Devuelve el precio del producto.
    - `cambiarPrecio(double precio)`: Establece un nuevo precio.
    - `activarProducto()`: Cambia el estado de `disponible` a `true`.
    - `desactivarProducto()`: Cambia el estado de `disponible` a `false`.
    - `obtenerDisponiblidad()`: Devuelve un String ("DISPONIBLE" o "NO DISPONIBLE") basado en el estado `disponible`.
    - `toString()`: Sobreescribe el método para devolver una representación legible del producto, incluyendo su disponibilidad.
    - Un método estático `getTotalPRoductos()` que devuelve el valor de `totalProductos`.

La clase `Principal` debe:
- Crear varias instancias de `Producto` usando ambos constructores.
- Realizar algunas operaciones como activar/desactivar y cambiar precios.
- Imprimir la información de los productos y el total de productos creados.
