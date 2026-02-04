package Ejercicio3.modelo;

import Ejercicio3.producto.Producto;

public class Principal {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Producto producto1=new Producto("Portatil", "Informatica", 899.99);
		Producto producto2=new Producto("Carne", "Comida");
		producto2.activarProducto();
		producto2.cambiarPrecio(25.0);
		
		System.out.println(producto1.toString());
		System.out.println();
		System.out.println(producto2.toString());
		System.out.println();
		System.out.println("Productos Totales Creados: " + Producto.getTotalPRoductos());
		
		
	}

}
