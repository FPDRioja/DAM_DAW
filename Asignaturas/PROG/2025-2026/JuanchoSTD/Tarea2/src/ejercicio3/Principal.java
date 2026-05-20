package ejercicio3;

import java.util.Scanner;

public class Principal {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		Persona titular1 = new Persona("Ana López", "ana.lopez@email.com", 611223344);
		//Estos datos van por código aquí
		Dispositivo dispositivo1 = new Dispositivo("MacBook Air", "Portátil", titular1, 95, 10);

		System.out.println("--- Introduce los datos del segundo titular ---");
		System.out.print("Nombre completo: ");
		String nombreCompleto2 = scanner.nextLine();
		System.out.print("Email: ");
		String email2 = scanner.nextLine();
		System.out.print("Número de teléfono: ");
		int numeroTelefono2 = scanner.nextInt();
		scanner.nextLine();

		Persona titular2 = new Persona(nombreCompleto2, email2, numeroTelefono2);

		System.out.println("--- Introduce los datos del segundo dispositivo ---");
		System.out.print("Modelo: ");
		String modelo2 = scanner.nextLine();
		System.out.print("Tipo: ");
		String tipo2 = scanner.nextLine();
		System.out.print("Batería inicial (%): ");
		double bateria2 = scanner.nextDouble();
		System.out.print("Consumo por hora: ");
		double consumo2 = scanner.nextDouble();

		Dispositivo dispositivo2 = new Dispositivo(modelo2, tipo2, titular2, bateria2, consumo2);

		System.out.print("Introduce el porcentaje de carga adicional para los dos dispositivos: ");
		double porcentajeCarga = scanner.nextDouble();
		dispositivo1.cargarDispositivo(porcentajeCarga);
		dispositivo2.cargarDispositivo(porcentajeCarga);

		System.out.println();
		System.out.print("¿Cuántas horas se usarán los dos dispositivos?: ");
		double horasUso = scanner.nextDouble();
		dispositivo1.usarDispositivo(horasUso);
		dispositivo2.usarDispositivo(horasUso);

		System.out.println();
		System.out.println("--- Información final del primer dispositivo ---");
		dispositivo1.mostrarInformacion();

		System.out.println();
		System.out.println("--- Información final del segundo dispositivo ---");
		dispositivo2.mostrarInformacion();

		scanner.close();
	}
}