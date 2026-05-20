package bicicletas.arrays;

import java.util.ArrayList;
import java.util.Scanner;

public class Principal {

	private Scanner scanner = new Scanner(System.in);
	private ArrayList<BicicletaElectrica> bicicletas = new ArrayList<BicicletaElectrica>();

	public static void main(String[] args) {

		System.out.println("Bienvenido al sistema de gestión de bicicletas!");

		Principal principal = new Principal();
		/*
		 * Creación de datos de inicio
		 */
		System.out.println("Creación de datos inicial ...");

		BicicletaElectrica bici1 = new BicicletaElectrica();
		BicicletaElectrica bici2 = new BicicletaElectrica("bla", "ble", 200);
		Propietario prop = new Propietario("aaa", "12345678p", 195783562);
		bici2.asignarPropietario(prop);

		principal.bicicletas.add(bici1);
		principal.bicicletas.add(bici2);

		System.out.println("Sistema iniciado con " + BicicletaElectrica.getTotalBicicletas() + " bicis.");

		boolean continua = true;
		while (continua) {
			continua = principal.menu();
		}

		System.out.println("Hasta la vista!");

	}

	private boolean menu() {

		System.out.println("\n---------   Menú Principal (elije una opción)   ----------\n");

		System.out.println("1 - Asignar propietario");
		System.out.println("2 - Retirar propietario");
		System.out.println("3 - Cargar Batería");
		System.out.println("4 - Mostrar bicis");
		System.out.println("5 - Nueva bici");
		System.out.println("6 - Retirar bici");
		System.out.println("7 - Salir");

		int opcion = scanInteger();

		switch (opcion) {
		case 1:
			asignarPropietario();
			break;
		case 2:
			retirarPropietario();
			break;
		case 3:
			cargarBateria();
			break;
		case 4:
			mostrarBicis();
			break;
		case 5:
			nuevaBici();
			break;
		case 6:
			retirarBici();
			break;
		case 7:
			return false;

		default:
			System.out.println("Opción no válida");
		}
		return true;
	}

	private void asignarPropietario() {
		// TODO Auto-generated method stub

	}

	private void retirarPropietario() {
		// TODO Auto-generated method stub

	}

	private void retirarBici() {
		// TODO Auto-generated method stub

	}

	private void nuevaBici() {
		System.out.println("Creación de una nueba bici:");
		
		System.out.println("Escribe la marca:");
		String marca = scanner.nextLine();
		
		System.out.println("Escribe el modelo:");
		String modelo = scanner.nextLine();
		
		int autonomia = 0;
		do {
			System.out.println("Escribe la autonomia (1-200)");
			autonomia = scanInteger();
		} while (autonomia < 1 || autonomia > 200);
		
		BicicletaElectrica nueva = new BicicletaElectrica(marca, modelo, autonomia);
		
		bicicletas.add(nueva);
		
		System.out.println("Añadida a la colección");
	}

	private void cargarBateria() {

		if (BicicletaElectrica.getTotalBicicletas() < 1) {
			System.out.println("No hay bicis!!!");
		}
		int indice = -1;
		do {
			System.out.println(
					"Elige la bici a la que cargar batería [1-" + BicicletaElectrica.getTotalBicicletas() + "]");
			indice = scanInteger();
		} while (indice < 0 || indice > bicicletas.size());

		BicicletaElectrica bici = bicicletas.get(indice - 1);

		System.out.println("Seleccionada: " + bici);

		System.out.println("Indica el porcentaje de recarga:");

		bici.cargarBateria(scanDouble());

	}

	private void mostrarBicis() {
		System.out.println("Mostrando todas las bicis:");
		for (BicicletaElectrica b : bicicletas) {
			System.out.println(b.toString());
			b.comprobarBateria();
		}
	}

	private int scanInteger() {
		int resultado = 0;

		boolean valida = false;
		do {
			try {
				resultado = Integer.parseInt(scanner.nextLine());
				valida = true;
			} catch (NumberFormatException e) {
				System.out.println("Número no válido");
			}
		} while (!valida);

		return resultado;
	}

	private double scanDouble() {
		double resultado = 0;
		boolean valida = false;
		do {
			try {
				resultado = Double.parseDouble(scanner.nextLine());
				valida = true;
			} catch (NumberFormatException e) {
				System.out.println("Número no válido");
			}
		} while (!valida);
		return resultado;
	}
}
