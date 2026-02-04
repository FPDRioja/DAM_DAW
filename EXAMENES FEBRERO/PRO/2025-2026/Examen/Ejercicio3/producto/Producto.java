package Ejercicio3.producto;

public class Producto {
	public String nombre;
	public String categoria;
	public double precio;
	public boolean disponible;
	
	public static int totalProductos=0;

	public Producto(String nombre, String categoria, double precio) {
		this.nombre = nombre;
		this.categoria = categoria;
		this.precio = precio;
		this.disponible=true;
		Producto.totalProductos=Producto.totalProductos+1;
		
	}

	public Producto(String nombre, String categoria) {
		super();
		this.nombre = nombre;
		this.categoria = categoria;
		this.precio=0.0;
		this.disponible=false;
		Producto.totalProductos=Producto.totalProductos+1;
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
		return (this.disponible)?"DISPONIBLE":"NO DISPONIBLE";
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
