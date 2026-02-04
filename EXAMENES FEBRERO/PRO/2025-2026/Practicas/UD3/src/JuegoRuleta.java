import java.util.Scanner;


public class JuegoRuleta {

	private int saldo=0;
	private Scanner sc = new Scanner(System.in);

	
	public JuegoRuleta() {
		this.saldo=0;
		
	}
	
	public void iniciarJuego() {
		System.out.println("=== Bienvenido al Juego de la Ruleta ===");
		this.recargarSaldo();
		while (true) {
			this.menuRuleta();
			if(!this.seguirJugando()) {
				System.out.println(this.toString());
				break;
			};
		}
	}
	
	private void recargarSaldo() {
		
		int recarga=0;
		while (true) {
			try {
				System.out.print("Introduce el saldo inicial o la cantidad a recargar:");
				recarga=Integer.parseInt(this.sc.nextLine());
				if (recarga<1) {
					System.out.println("Cantidad de recarga no valida, ¿Estas intentando hacer trampas?, introduce un numero positivo valido.");
					continue;
				} else {
					this.saldo=this.saldo+recarga;
					System.out.println("Tu saldo actual es de: "+ this.saldo +"€." );
					return;
				}
			} catch (Exception e) {
				System.out.println("La cantidad a recargar no es un numero valido.");
				continue;
			}
			
			
			
		}
		
		
	}
	
	private int tirarRuleta () {
		 // Genera un número entre 0 y 36
		int numeroRuleta=(int)(Math.random() * 37);
		System.out.printf("El numero que ha salido en la ruleta es: %d\n", numeroRuleta);
		return numeroRuleta;
	}
	
	@Override
	public String toString() {
		return "El juego a terminado, tu saldo final es de: " + saldo;
	}

	private boolean esPar (int numeroEvaluar) {
		return (numeroEvaluar%2==0);
	}
	
	private void menuRuleta() {
		int opcionMenu=0;
		while (opcionMenu==0) {
			System.out.print(
					"Tipo de apuesta:\n1. Acertar Numero Exacto (1-36).\n2. Acertar Numero Par/Impar.\nElige una opción (1 o 2):"
					);
			try {
				opcionMenu=Integer.parseInt(sc.nextLine());
				switch (opcionMenu) {
				case 1:
					this.apostarActertarNumero();
					break;
					
				case 2: 
					this.apostarParImpar();
					break;
					
				default:
					System.out.println("La opcion que has escogido no es valida.");
					opcionMenu=0;
					continue;

				}
			} catch (Exception e) {
				System.out.println("Por favor, elige una opcion valida (1 o 2).");
				continue;
			}
		}
	}
	
	private int obtenerCantidadApostar() {
		int cantidadApostada=0;
		do {
			try {
				System.out.print("Vamos a hablar de lo importante: del dinero, ¿Cuanto dinero quieres apostar esta ronda?:");
				cantidadApostada=Integer.parseInt(sc.nextLine());
				if(cantidadApostada<1) {
					System.out.println("Por favor, seamos serios, pon una cantidad positiva por encima de 1€...");
					continue;
				}
				if(cantidadApostada>this.saldo) {
					System.out.println("Amigo, no tienes suficiente dinero para esa apuesta...entiendo que quieres recargar saldo.");
					this.recargarSaldo();
					continue;
				}
				
			} catch (Exception e) {
				System.out.println("La cantidad que estas intentando apostar no es numerica....por favor introduce una cantidad correcta OK? ");
				continue;
			}
			return cantidadApostada;
		} while (true);
		
	}
	private void apostarParImpar() {
		System.out.println("Has escogido apostar par/impar, jugemos, buena suerte =)");
		int cantidadApostada=obtenerCantidadApostar();
		String seleccionUsuario="";
		while (true) {
			
			// Obtenemos la seleccion o apuesta del usuario antes de tirar a la ruleta.
			try {
			System.out.print("¿Apuestas a PAR o IMPAR?: ");
			seleccionUsuario=sc.nextLine();
			seleccionUsuario=seleccionUsuario.toLowerCase().trim();
			if ( seleccionUsuario.equals("par") || seleccionUsuario.equals("impar") ) {
				break;
			} else {
				System.out.println("La opcion que has elegido es incorrecta, por favor seamos serios...elige PAR o IMPAR.");
			}
			} catch (Exception e) {
				System.out.println("Error. Entrada del usuario no valida...., indica si eliges PAR o IMPAR.");
				continue;
			}
		}
		int numeroRuleta=this.tirarRuleta();
		
		if ((this.esPar(numeroRuleta) && seleccionUsuario.equals("par")) || (this.esPar(numeroRuleta)==false && seleccionUsuario.equals("impar"))) {
			hasGanado(cantidadApostada);
			return;
		}
		hasPerdido(cantidadApostada);
		

		return;
		
		
	}
	
	private void hasPerdido (int cantidadApostada) {
		this.saldo=this.saldo-cantidadApostada;
		System.out.printf("Lo siento no has acertado has perdido %d€\n",cantidadApostada);
		System.out.printf("Tu saldo actual es de: %d€\n",this.saldo);
		return;
	}
	private void hasGanado(int cantidadApostada) {
		int premio=cantidadApostada * 36;
		this.saldo=saldo+premio;
		System.out.printf(
			    "Felicidades, has acertado, has ganado un premio de %d €. \nTu saldo actual es de: %d €\n",
			    premio, 
			    this.saldo
			);
		return;
	}
	
	private void apostarActertarNumero() {
		System.out.println("Has sido valiente, has escogido la opcion de adivinar el numero de la ruleta, jugemos (que la suerte te acompañe).");
		int cantidadApostada=obtenerCantidadApostar();
		int seleccionUsuario=100;
		
		do {
			try {
				System.out.print("Dime.., ¿Cual crees que es el numero que va a salir esta vez?:");
				seleccionUsuario=Integer.parseInt(sc.nextLine());
				if(seleccionUsuario<0 || seleccionUsuario>36) {
					System.out.println("Por favor, seamos serios, elige una numero de la ruleta que este entre 0 y 36...");
					continue;
				}
					
			} catch (Exception e) {
				System.out.println("El numero con el que estas intentando apostar no es un numero valido....por favor introduce un numero valido entre 0 y 36 OK? ");
				continue;
			}
			// El numero elegido es valido para apostar, continuamos.
			break;
		} while (true);
		int numeroRuleta=this.tirarRuleta();
		if (numeroRuleta==seleccionUsuario) {
			hasGanado(cantidadApostada);
			return;
		}
		hasPerdido(cantidadApostada);
		return;
		
	}
	
	private boolean seguirJugando() {
		
		while (true) {
			System.out.print("¿Quieres seguir jugando? (s/n): ");
			String respuestaUsuario=sc.nextLine();
			switch (respuestaUsuario.toLowerCase().trim()) {
			
			case "s":
				return true;
			
			case "n":
				return false;

			
			default:
				System.out.println("Opcion no valida, indica si o no (s/n)");
				continue;
			}
			
		
		}
		
	}
	
	
}
