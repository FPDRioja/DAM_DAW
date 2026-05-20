package ejercicio1;

public class DatosPersonales {

	public static void main(String[] args) {

		/** Tipo de dato String para cadenas alfanuméricas como el nombre de alguien */
		String nombre = "Juan Cruz Garrido";

		/** Tipo de dato int para números enteros. */
		int edad = 51;

		/** Tipo de dato float para números decimales sencillos. */
		float alturaEnMetros = 1.85f;

		/** Tipo de dato para valores lógicos (verdadero o falso). */
		boolean tieneCarnetConducir = true;

		/**
		 * Tipo de dato double para números decimales de doble precisión, podría ser tb
		 * float
		 */
		double saldoEnCC = 250000.23;

		/** Tipo de dato String para cadenas de alfanuméricas. */
		String numeroSeriDispositivo = "XFG-22B1-C9";

		System.out.println("Información de usuario:");
		System.out.println("Nombre: " + nombre);
		System.out.println("Edad: " + edad + " años");
		System.out.println("Altura: " + alturaEnMetros + " m");
		System.out.println("Carnet de conducir: " + (tieneCarnetConducir ? "Sí" : "No") + " lo tiene");
		System.out.println("Saldo en cuenta corriente: " + saldoEnCC + "€");
		System.out.println("Número de serie del dispositivo: " + numeroSeriDispositivo);
	}

}
