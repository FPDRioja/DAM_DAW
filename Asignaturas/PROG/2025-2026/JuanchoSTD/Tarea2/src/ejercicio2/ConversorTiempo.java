package ejercicio2;

import java.util.Scanner;

public class ConversorTiempo {

	public static void convertirSegundos(int totalSegundos) {
		int horas = totalSegundos / 3600;
		int minutos = (totalSegundos % 3600) / 60;
		int segundos = totalSegundos % 60;

		System.out.println(totalSegundos + " segundos son: " + horas + " horas, " + minutos + " minutos y " + segundos
				+ " segundos.");
	}

	public static boolean esMayorDeEdad(int edad) {
		return edad >= 18;
	}

	public static void formatoEdad(boolean mayor) {

		System.out.println("Resultado edad: " + (mayor ? "Es mayor" : "Es menor") + " de edad.");
	}

	public static void main(String[] args) {

		Scanner scanner = new Scanner(System.in);

		System.out.print("Introduce una cantidad de segundos: ");
		int segundosUsuario = scanner.nextInt();
//		scanner.nextLine();
		convertirSegundos(segundosUsuario);

		System.out.println();

		System.out.print("Introduce tu edad: ");
		int edadUsuario = scanner.nextInt();
		scanner.nextLine();

		formatoEdad(esMayorDeEdad(edadUsuario));

		scanner.close();
	}
}