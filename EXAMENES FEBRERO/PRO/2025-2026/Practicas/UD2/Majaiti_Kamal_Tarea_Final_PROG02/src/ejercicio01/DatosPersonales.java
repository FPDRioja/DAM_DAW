package ejercicio01;
import java.util.Scanner;

// Clase para almacenar datos personales.
public class DatosPersonales {
	
	/*
	 *  Este es mi primer metodo estatico, para leer datos de usuario, me siento emocionado.
	 * */
	public static void leerDatos() {
		
		// Iniciamos el objeto scanner para poder leer la entrada del teclado.
		Scanner obtenerDatos=new Scanner(System.in);
		// Nombre completo debe ser string, no hay dudas.
		String nombreCompleto;
		
		// Record de edad maxima 120 Años: https://tinyurl.com/5x8ueteu
		byte edad;
		float alturaEnMetros;
		boolean tieneCarnetConducir;
		double saldoEnBanco;
		String numeroSerieDispositivo;
		
		System.out.print("Dime tu nombre y apellidos: ");
		nombreCompleto=obtenerDatos.nextLine();
		System.out.print("Dime la edad (ejemplo 21) : ");
		edad = obtenerDatos.nextByte();
		System.out.print("Dime la altura en metros ( ejemplo 1.80 si usas teclado ingles, 1,80 si usas teclado en español.): ");
		alturaEnMetros = obtenerDatos.nextFloat();
		System.out.print("¿Tiene carnet de conducir? (true/false):");
		tieneCarnetConducir = obtenerDatos.nextBoolean();
		System.out.print("¿Cual es tu saldo de la cuenta bancaria?: ");
		saldoEnBanco=obtenerDatos.nextDouble();
		// Leemos el salto de línea pendiente....te juro que si no es por el profesor, me vuelvo loco.
		obtenerDatos.nextLine();
		System.out.print("Dime el nombre el Nº de serie de tu dispositivo:");
		numeroSerieDispositivo=obtenerDatos.nextLine();
		System.out.println();
		System.out.println();
		String MensajeRespuestaTieneCarnet= (tieneCarnetConducir==true) ? "Dispones de carnet de conducir." : "No dispones de carnet de conducir.";
		System.out.println("Bienvenido, estos son tus datos:");
		System.out.printf("Tu nombre: %s.\nTu edad es de: %d años.\nTu altura: %f m\n%s\n", nombreCompleto, edad , alturaEnMetros, MensajeRespuestaTieneCarnet );
		System.out.println("Tu saldo en cuenta bancaria es de:" + saldoEnBanco + " €");
		// Pasamos el Nº de serie del dispositivo a mayusculas y lo pintamos.
		System.out.printf("El numero de serie de tu dispositivo es: %s ", numeroSerieDispositivo.toUpperCase() );
		
		
	} // fin del metodo estatico para leer datos de usuario.

	public static void main(String[] args) {
		
		// Iniciamos el objeto scanner para poder leer la entrada del teclado.
		Scanner obtenerDatos=new Scanner(System.in);
		
		// Nombre completo debe ser string, no hay dudas.
		String nombreCompleto="Kamal Majaiti El Majaiti";
		
		// Record de edad maxima 120 Años: https://tinyurl.com/5x8ueteu
		byte edad=36;
		float alturaEnMetros=1.80F;
		boolean tieneCarnetConducir=true;
		double saldoEnBanco=4550.33;
		String numeroSerieDispositivo="AFE-12W1-F9";
		String MensajeRespuestaTieneCarnet= (tieneCarnetConducir==true) ? "Dispones de carnet de conducir." : "No dispones de carnet de conducir.";
		System.out.println("Bienvenido, estos son tus datos:");
		System.out.printf("Tu nombre: %s.\nTu edad es de: %d años.\nTu altura: %f m\n%s\n", nombreCompleto, edad , alturaEnMetros, MensajeRespuestaTieneCarnet );
		System.out.println("Tu saldo en cuenta bancaria es de:" + saldoEnBanco + " €");
		// Pasamos el Nº de serie del dispositivo a mayusculas y lo pintamos.
		System.out.printf("El numero de serie de tu dispositivo es: %s \n\n", numeroSerieDispositivo.toUpperCase() );
		
		
		// Adicional por vicio propio...
		System.out.print("¿Quieres que lea y te diga tus datos:? (true/false):");
		boolean leerDatosUsuario=obtenerDatos.nextBoolean();
		
		if (leerDatosUsuario) {
			DatosPersonales.leerDatos();
		}		
		
		
	} // fin del metodo principal.

} // fin de la clase.
