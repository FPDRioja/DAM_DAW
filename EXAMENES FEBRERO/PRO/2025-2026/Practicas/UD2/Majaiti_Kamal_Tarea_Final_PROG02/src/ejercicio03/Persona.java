package ejercicio03;

public class Persona {
	
	String nombre="";
	String correo="";
	int telefono=0;
	
	Persona(String nombre, String correo, int telefono) {
		this.nombre=nombre;
		this.correo=correo;
		this.telefono=telefono;	
	}

	@Override
	public String toString() {
		return "Nombre: " + this.nombre + "\nCorreo: " + this.correo + "\nTeléfono: " + this.telefono + "\n";
	}
	
	
}
