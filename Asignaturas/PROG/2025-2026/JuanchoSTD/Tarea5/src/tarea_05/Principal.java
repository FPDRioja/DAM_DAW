package tarea_05;

import java.util.Scanner;

public class Principal {

	private Scanner scanner = new Scanner(System.in);
	private AlmacenDispositivos almacenDispositivos = new AlmacenDispositivos();

	public static void main(String[] args) {
		
		System.out.println("\n**********   BIENVENIDO AL SISTEMA DE GESTIÓN DE DISPOSITIVOS **********\n");

		Principal principal = new Principal();

		while (principal.menu())
			;
		System.out.println("Adiós!");

	}

	public Principal() {
//		AlmacenDispositivos.creaConjuntoDePrueba(almacenDispositivos, 30);
	}

	private boolean menu() {

		System.out.println("\nMenú principal, elija una opción:\n");
		System.out.println("1 - Dar de alta un dispositivo");
		System.out.println("2 - Registrar sesión de uso de dispositivo");
		System.out.println("3 - Mostrar información de un dispositivo");
		System.out.println("4 - Listar todos los dispositivos");
		System.out.println("5 - Mostrar estadísticas globales");
		System.out.println("6 - Salir");

		int opcion = leerEntero();

		switch (opcion) {
		case 1:
			return darDeAltaDispositivo();
		case 2:
			return registrarSesionDispositivo();
		case 3:
			return mostrarInformacionDeDispositivo();
		case 4:
			return listarTodosDispositivos();
		case 5:
			return mostrarEstadisticasLocales();
		case 6:
			return false;
		default:
			System.out.println("Elige una opción válida!");
			return true;
		}
	}

	private boolean mostrarEstadisticasLocales() {

		System.out.println("Mostrando estadísticas globales: ");
		System.out.println("Número de dispositivos: " + almacenDispositivos.getContador());
		System.out.println("La media global de consumo es: " + String.format("%.2f", almacenDispositivos.mediaGlobalConsumo()));
		System.out.println("El dispositivo más usado es "
				+ ((almacenDispositivos.dispositivoMasUsado() != null) ? almacenDispositivos.dispositivoMasUsado()
						: "No hay dispositivos"));

		return true;
	}

	private boolean listarTodosDispositivos() {
		almacenDispositivos.listarDispositivos();
		return true;
	}

	private boolean mostrarInformacionDeDispositivo() {

		if (almacenDispositivos.getContador() <= 0) {
			System.out.println("No hay dispositivos en el almacén");
			return true;
		}

		String cod = "";
		do {
			System.out.println("Escribe el código del dispositivo:");
			cod = scanner.nextLine();
		} while (cod.isEmpty());

		Dispositivo dispositivo = almacenDispositivos.buscarPorCodigo(cod);

		if (dispositivo == null) {
			System.out.println("No se ha encontrado un dispositivo de código: " + cod);

		} else {
			System.out.println();
			System.out.println(dispositivo);
			System.out.println("\nLista de sesiones:");
			dispositivo.mostrarSesiones();
			System.out.println("\nSesión con mayor consumo:");
			System.out.println(dispositivo.sesionMayorConsumo());
		}

		return true;
	}

	private boolean registrarSesionDispositivo() {

		if (almacenDispositivos.getContador() <= 0) {
			System.out.println("No hay dispositivos en el almacén");
			return true;
		}

		String cod = "";
		do {
			System.out.println("Escribe el código del dispositivo:");
			cod = scanner.nextLine();
		} while (cod.isEmpty());

		Dispositivo dispositivo = almacenDispositivos.buscarPorCodigo(cod);
		if (dispositivo == null) {
			System.out.println("No existe un dispositivo de código: " + cod);
			return true;
		}
		System.out.println("Crear sesión de uso para:");
		System.out.println(dispositivo);

		double horas = -1;
		do {
			System.out.println("Escribe las horas de consumo de la nueva sesión (horas > 0):");
			horas = leerDouble();
		} while (horas <= 0);

		double consumo = -1;
		do {
			System.out.println("Escribe el consumo de batería de la nueva sesión (0 <= consumo <= 100):");
			consumo = leerDouble();
		} while (consumo < 0 || consumo > 100);

		double temperatura = -1;
		do {
			System.out.println("Escribe la máxima temperatura alcanzada de la nueva sesión (temperatura >= 0):");
			temperatura = leerDouble();
		} while (temperatura < 0);

		dispositivo.registrarSesion(dispositivo.crearSesion(horas, consumo, temperatura));

		return true;
	}

	private boolean darDeAltaDispositivo() {
		String codigo, nombre, tipo = "";

		do {
			System.out.println("Escribe el codigo del dispositivo (no vacío):");
			codigo = scanner.nextLine().trim();
		} while (codigo.isEmpty());

		do {
			System.out.println("Escribe el nombre del dispositivo (no vacío):");
			nombre = scanner.nextLine().trim();
		} while (nombre.isEmpty());

		do {
			System.out.println("Escribe el tipo del dispositivo (no vacío):");
			tipo = scanner.nextLine().trim();
		} while (tipo.isEmpty());

		Dispositivo nuevo = almacenDispositivos.crearDispositivo(codigo, nombre, tipo);

		if (nuevo == null) {
			System.out.println("Dispositivo no se pudo crear");
			return true;
		}

		if (almacenDispositivos.altaDispositivo(nuevo)) {
			System.out.println("Dispositivo añadido al almacén:");
			System.out.println(nuevo);
		}
		

		return true;
	}

	private int leerEntero() {

		while (true) {
			try {
				return Integer.parseInt(scanner.nextLine());
			} catch (NumberFormatException e) {
				System.out.println("Solo se aceptan números enteros!");
			}
		}
	}

	private double leerDouble() {

		while (true) {
			try {
				return Double.parseDouble(scanner.nextLine());
			} catch (NumberFormatException e) {
				System.out.println("Solo se aceptan números con decimales!");
			}
		}
	}
}
