
public class Propietario {
	String nombre;
	String dni;
	int telefono;
	
	Propietario() {
		this.nombre="Nombre del propietario";
		this.telefono=000000000;
		this.dni ="";
	}
	
	Propietario(String nombre, int telefono, String dni) {
		this.nombre=nombre;
		this.telefono=telefono;
		this.dni =dni;
	}
	
	public static boolean validarDni(String dni) {
		return dni.matches("\\d{8}[A-Za-z]");
	}

	
	public static boolean validarTelefono(String telefono) {
		return telefono.matches("\\d{9}");
	}

	
	@Override
	public String toString() {
		
		return "==== Datos del propietario ====\nNombre: " + nombre + "\nDNI del propietario: " + dni + "\nTelefono del propietario: " + telefono;
	}
	
	
}

