package ejercicio3;

public class Persona {
	private String nombreCompleto = "Juan Cruz Garrido";
	private String email = "jcgarrido605r@fpdrioja.com";
	private int numeroTelefono = 645777111;

	/**
	 * Constructor por defecto
	 */
	public Persona() {
	}

	public Persona(String nombreCompleto, String email, int numeroTelefono) {
		super();
		this.nombreCompleto = nombreCompleto;
		this.email = email;
		this.numeroTelefono = numeroTelefono;
	}

	public String toString() {
		return nombreCompleto + ", Email: " + email + ", Tel: " + numeroTelefono;
	}

}
