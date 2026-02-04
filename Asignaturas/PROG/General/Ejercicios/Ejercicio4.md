# 🚌 Ejercicio 4: El Supermercado + carrito

## Instrucciones:
1. Crea una clase `Producto` con los atributos `nombre` y `precio`.
2. Crea una clase `Supermercado` que tenga:
    * Una lista vacía llamada `almacen`.
    * Un método `añadir_producto` que reciba un objeto y lo guarde en la lista.
    * Un método `mostrar_inventario` que recorra la lista y muestre los datos.
3. Crea una clase `Carrito` que tenga:
    * Una lista vacía llamada `productos`.
    * El carrito debe tener un presupuesto máximo al crearse.
        * EL coste total de productos no puede superar el presupuesto.
        * Un método `agregar_al_carrito` que reciba un objeto `Producto` y `cantidad` lo añada a la lista.
        * Un método `mostrar_carrito` que recorra la lista y muestre los productos en el carrito.
        * Un método `calcular_total` que sume los precios de los productos en el carrito y devuelva el total.
