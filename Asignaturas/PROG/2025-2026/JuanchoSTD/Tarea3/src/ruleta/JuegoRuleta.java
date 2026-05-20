package ruleta;

import java.util.Scanner;

public class JuegoRuleta {

	private Scanner sc;
	private int saldo = 0;

	public JuegoRuleta() {
		this.sc = new Scanner(System.in);
		System.out.println("---Bienvenido/a a la ruleta!---");
		System.out.println("Lo primero es cambiar fichas...");
		while (this.saldo <= 0) {
			recargarSaldo();
		}

	}

	public void iniciarJuego() {
		int opcion = 0;
		do {
			System.out.println("---Opciones---");
			System.out.println("Tu saldo actual es: " + saldo + " gallifantes");
			System.out.println("Elige una opción:");
			System.out.println("1. Recargar saldo");
			System.out.println("2. Apostar");
			System.out.println("3. Salir");
			System.out.print("Elige una opción: ");

			opcion = leerEntero();

			switch (opcion) {
			case 1:
				recargarSaldo();
				break;
			case 2:
				realizarApuesta();
				break;
			case 3:
				salir();
				break;
			default:
				System.out.println("Opción no válida");
			}
		} while (opcion != 3);

		System.out.println("Hasta la próxima!");
	}

	public int leerEntero() {
		while (true) {
			try {
				int numeroElegido = Integer.parseInt(sc.nextLine());
				return numeroElegido;
			} catch (NumberFormatException e) {
				System.out.print("Entrada no válida. Introduce un número entero:");
			}
		}
	}

	public void recargarSaldo() {
		while (true) {
			System.out.print("Ingresa la cantidad a recargar: ");
			int cantidad = leerEntero();

			if (cantidad > 0) {
				saldo += cantidad;
				System.out.println("Saldo actualizado.");
				return;
			} else {
				System.out.println("Introduce una cantidad mayor a cero!");
			}
		}

	}

	public void realizarApuesta() {
		if (this.saldo <= 0) {
			System.out.println("No dispones de saldo para apostar!");
			return;
		}

		System.out.println("--- ¡Hagan sus apuestas! ---");
		System.out.println("1. Apostar a un número específico");
		System.out.println("2. Apostar a Par / Impar");
		System.out.println("3. Volver atrás");
		System.out.print("Elige el tipo de apuesta: ");

		int tipo = leerEntero();

		switch (tipo) {
		case 1:
			jugarNumero();
			break;
		case 2:
			jugarParImpar();
			break;
		case 3:
			break;
		default:
			System.out.println("Opción no valida.");
		}
	}

	public int tirarRuleta() {
		int resultado = (int) (Math.random() * 37);
		System.out.println("Resultado de la ruleta: " + resultado);
		return resultado;
	}

	private void jugarNumero() {
		int numero;
		do {
			System.out.print("Elije un numero (0-36): ");
			numero = leerEntero();
			if (numero < 0 || numero > 36) {
				System.out.println("Apuesta por un número válido, por favor (0-36)");
			}
		} while (numero < 0 || numero > 36);

		System.out.print("Ingresa cantidad a apostar: ");
		int apuesta = leerEntero();

		if (apuesta > saldo) {
			System.out.println("Saldo insuficiente.");
		} else {
			saldo -= apuesta;
			int resultado = tirarRuleta();

			if (resultado == numero) {
				saldo += apuesta * 36;
				System.out.println("Has ganado!");
			} else {
				System.out.println("Has perdido!");
			}
		}
	}

	private void jugarParImpar() {

		int eleccion;
		do {
			System.out.println("1. Par");
			System.out.println("2. Impar");
			System.out.print("Elige opcion: ");
			eleccion = leerEntero();
			if (!(eleccion == 1 || eleccion == 2)) {
				System.out.println("Par o impar, por favor");
			}
		} while (!(eleccion == 1 || eleccion == 2));

		System.out.print("Ingrese cantidad a apostar: ");
		int apuesta = leerEntero();

		if (apuesta > saldo) {
			System.out.println("Saldo insuficiente");
		} else {
			saldo -= apuesta;
			int resultado = tirarRuleta();

			if (resultado == 0) {
				System.out.println("Ha salido 0, ¡La casa gana! ¡Has perdido!");
			} else {
				boolean esPar = (resultado % 2 == 0);
				if ((eleccion == 1 && esPar) || (eleccion == 2 && !esPar)) {
					saldo += (apuesta * 2);
					System.out.println("Has ganado! Ha salido " + (esPar ? "par" : "impar"));
				} else {
					System.out.println("Has perdido! Ha salido " + (esPar ? "par" : "impar"));
				}
			}
		}
	}

	public void salir() {
		System.out.println("Gracias por jugar! Saldo final: " + saldo);
	}
}