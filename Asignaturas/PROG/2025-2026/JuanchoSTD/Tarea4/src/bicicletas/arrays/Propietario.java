package bicicletas.arrays;

public class Propietario {
	private String nombre;
	private String dni;
	private int telefono;
	
	public Propietario() {
		
	}
	
	public Propietario(String nombre, String dni, int telefono) {
		this.nombre = nombre;
		this.dni = dni;
		this.telefono = telefono;
	}

	@Override
	public String toString() {
		return "Propietario [nombre=" + nombre + ", dni=" + dni + ", telefono=" + telefono + "]";
	}
	
	public static boolean validarDni(String dni) {
		return dni.matches("\\d{8}[A-Za-z]");
	}

}
