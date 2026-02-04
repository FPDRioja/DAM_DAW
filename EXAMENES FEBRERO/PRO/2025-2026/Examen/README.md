# Examen Febrero 2026 - Programación DAW

Este repositorio contiene las soluciones a los ejercicios del examen de Programación DAW de febrero de 2026.

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

### Solución

#### `VehiculoElectrico.java`

Esta clase implementa la lógica de un vehículo eléctrico.

```java
package ejercicio1;

public class VehiculoElectrico {
	public String modelo;
	public double bateria;
	public double consumoKm;
	public double kilometrosRecorridos;
	
	public VehiculoElectrico(String modelo, int consumoKm) {
		this.modelo = modelo;
		this.bateria = 100.00; // Se inicializa al 100%
		this.consumoKm = consumoKm;
		this.kilometrosRecorridos = 0;
	}

	public void recorrer(double kilometros) {
		double consumo=kilometros * this.consumoKm;
		double resultadoConsumoBateria=this.bateria-consumo;
		this.bateria=Math.max(resultadoConsumoBateria, 0); // La batería no puede ser inferior a 0
		this.kilometrosRecorridos=this.kilometrosRecorridos+kilometros;
		
	}

	public void recargar(double porcentaje) {
		double totalBateria=this.bateria+porcentaje;
		this.bateria=Math.min(totalBateria, 100); // La batería no puede superar el 100%
		
		
	}

	public void mostrarInformacion() {
		System.out.println ("Datos del Vehiculo Electrico:");
		System.out.println("Modelo: " + modelo);
		System.out.println("Nivel Actual de la bateria: " + bateria+"%");
		System.out.println("Kilometros Totales Recorridos: " + kilometrosRecorridos +" Km");
		
	}
	
	public String estadoBateria()  {
		if(this.bateria>=60) {
			return "BUENA";
		}
		
		if(this.bateria>=20 && this.bateria<=59) {
			return "MEDIA";
		}
		
		return "BAJA";
		
	}
}
```

#### `Principal.java`

Esta clase es el punto de entrada para la ejecución del Ejercicio 1, donde se interactúa con el usuario y se utilizan los métodos de `VehiculoElectrico`.

```java
package ejercicio1;

import java.util.Scanner;

public class Principal {

	public static void main(String[] args) {
		
		VehiculoElectrico coche1= new VehiculoElectrico("Tesla Model S", 8); // Se crea un vehículo
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Dime la cantidad de KM que vas a recorrer: ");
		double km = Double.parseDouble(sc.nextLine());
		System.out.print("Dime el porcentaje de bateria que vas a recargar: ");
		double recargaBateria = Double.parseDouble(sc.nextLine());
		
		coche1.recorrer(km); // Se recorren los KM
		coche1.recargar(recargaBateria); // Se recarga la batería
		coche1.mostrarInformacion(); // Se muestra la información
		sc.close();
	}
}
```

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

### Solución

#### `Ejercicio2.java`

Esta clase contiene la lógica para las operaciones numéricas y el manejo del menú.

```java
package ejercicio2;

import java.util.Scanner;

public class Ejercicio2 {

	private static Scanner sc = new Scanner(System.in); // Scanner estático para toda la clase
	
	public static void pulsaIntro() {
		System.out.println("Pulsa Intro para continuar...");
		Ejercicio2.sc.nextLine();
	}

	public static void menu() {
		System.out.print("Dime un numero: ");
		int n = Integer.parseInt(Ejercicio2.sc.nextLine());
		
		System.out.println("Escoge una opcion:");
		System.out.println("1. Sumar los numeros pares.");
		System.out.println("2. Sumar los multiplos de un numero k.");
		System.out.println("3. Mostrar los numeros primos.");
		System.out.println("4. Salir del programa.");
		System.out.print("Escoge una opcion: ");
	

		int opcion=Integer.parseInt(Ejercicio2.sc.nextLine());;
		switch (opcion) {
		
		case 1:
			Ejercicio2.sumarNumerosPares(n);
			break;
			
		case 2:
			Ejercicio2.SumarMultiplosDeUnNumeroK(n);
			break;
			
		case 3:
			Ejercicio2.MostrarNumerosPrimos(n);
			break;
		
		case 4:
			System.exit(0); // Salir del programa
			
		default:
			Ejercicio2.menu(); // Opción inválida, se vuelve a mostrar el menú

		}
	}
	
	public static void main(String[] args) {
		Ejercicio2.menu(); // Se inicia el menú
	}

	// Muestra los números primos hasta 'n'
	private static void MostrarNumerosPrimos(int n) {
		int i =1;
		int MaxBucle=n+1;
		while (i< MaxBucle ) {
			
			Ejercicio2.comprobarSiEsPrimo(i);
			i=i+1;
			
		} 
		Ejercicio2.pulsaIntro();
		Ejercicio2.menu(); // Vuelve al menú después de la operación
	}

	// Suma los múltiplos de 'n' hasta un valor 'k' dado
	private static void SumarMultiplosDeUnNumeroK(int n) {
		System.out.print("Dime el valor de K: ");
		
		int k = Integer.parseInt(Ejercicio2.sc.nextLine());
		int i=0;
		int total=0;
		while (i<k+1) {
			total=total+(i*n);
			i++;
			
		}
		
		System.out.println("La suma de los multiplos del numero: "+ n+ " contando hasta "+ k +" es: " + total);
		Ejercicio2.pulsaIntro();
		Ejercicio2.menu(); // Vuelve al menú después de la operación
		
	}

	// Suma los números pares hasta 'n'
	private static void sumarNumerosPares(int n) {
		int total=0;
		for (int i=0; i<n+1; i=i+1) {
			if(i%2==0) { // Comprueba si es par
				total=total+i;
			}
		}
	System.out.println("La suma de numeros pares es: " + total);
	Ejercicio2.pulsaIntro();
	Ejercicio2.menu(); // Vuelve al menú después de la operación
	}
	
	// Comprueba si un número es primo y lo imprime si lo es
	public static void comprobarSiEsPrimo(int numero) {
		
		int contadorPrimos=0;
		
		for (int i=1; i<=numero; i++) {
			int resultado=numero%i;
			if (resultado==0) {
				contadorPrimos=contadorPrimos+1;
			}
		}
		
		if (contadorPrimos==2) { // Un número primo solo es divisible por 1 y por sí mismo
			System.out.println(numero + " es Primo");
		}
	}
}
```

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

### Solución

Las clases `Principal` y `Producto` están organizadas en los paquetes `Ejercicio3.modelo` y `Ejercicio3.producto` respectivamente.

#### `Producto.java`

Esta clase define la estructura y el comportamiento de un producto.

```java
package Ejercicio3.producto;

public class Producto {
	public String nombre;
	public String categoria;
	public double precio;
	public boolean disponible;
	
	public static int totalProductos=0; // Contador estático de productos creados

	// Constructor completo
	public Producto(String nombre, String categoria, double precio) {
		this.nombre = nombre;
		this.categoria = categoria;
		this.precio = precio;
		this.disponible=true; // Por defecto disponible
		Producto.totalProductos=Producto.totalProductos+1; // Incrementa el contador
		
	}

	// Constructor simplificado
	public Producto(String nombre, String categoria) {
		super();
		this.nombre = nombre;
		this.categoria = categoria;
		this.precio=0.0; // Precio por defecto 0.0
		this.disponible=false; // Por defecto no disponible
		Producto.totalProductos=Producto.totalProductos+1; // Incrementa el contador
	}

	public double obtenerPrecio() {
		return precio;
	}

	public void cambiarPrecio(double precio) {
		this.precio = precio;
	}

	public void activarProducto() {
		this.disponible = true;
	}
	
	public void desactivarProducto() {
		this.disponible = false;
	}
	
	public String obtenerDisponiblidad() {
		return (this.disponible)?"DISPONIBLE":"NO DISPONIBLE"; // Devuelve estado en String
	}

	@Override
	public String toString() {
		String disponibilidad=this.obtenerDisponiblidad();
		return "Datos del Producto:\nProducto: " + nombre + "\nCategoria: " + categoria + "\nPrecio: " + precio + " €\nEstado: "
				+ disponibilidad;
	}
	
	public static int getTotalPRoductos() {
		return Producto.totalProductos;
	}
}
```

#### `Principal.java`

Esta clase es el punto de entrada para la ejecución del Ejercicio 3, demostrando la creación y manipulación de objetos `Producto`.

```java
package Ejercicio3.modelo;

import Ejercicio3.producto.Producto;

public class Principal {

	public static void main(String[] args) {
		Producto producto1=new Producto("Portatil", "Informatica", 899.99); // Usa el constructor completo
		Producto producto2=new Producto("Carne", "Comida"); // Usa el constructor simplificado
		
		producto2.activarProducto(); // Activa el producto
		producto2.cambiarPrecio(25.0); // Cambia el precio
		
		System.out.println(producto1.toString()); // Imprime información del producto 1
		System.out.println();
		System.out.println(producto2.toString()); // Imprime información del producto 2
		System.out.println();
		System.out.println("Productos Totales Creados: " + Producto.getTotalPRoductos()); // Muestra el total de productos
	}
}
```