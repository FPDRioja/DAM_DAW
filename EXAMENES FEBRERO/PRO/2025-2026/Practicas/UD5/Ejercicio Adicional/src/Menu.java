import java.util.Scanner;

public class Menu {
	
	public static final Scanner sc = new Scanner(System.in);
	
	
	public static String leerStringUsuario() {
		return sc.nextLine();
	}
	public static int leerIntUsuario() {
		int opcionUsuario=0;
		try {
			opcionUsuario= Integer.parseInt(Menu.sc.nextLine());

		} catch (Exception e) {
			System.out.println("Error controlado: " + e);
		} 
			return opcionUsuario;	
		
	}
	
	public static void MenuPrincipal() {
		System.out.println("==== Programa de Control de Clubes y Judadores de la ciudad de Logrono ====");
		System.out.println("1. Gestionar Equipos de futbol.");
		System.out.println("2. Gestionar Equipos Jugadores.");
		System.out.println("3. Salir.");
		System.out.print("Elige una opcion: ");
		int opcionUsuario=Menu.leerIntUsuario();
		while (opcionUsuario==0) {
			System.out.println("Por favor, escoge una opcion valida:");
			opcionUsuario=Menu.leerIntUsuario();
		}
		switch (opcionUsuario) {
			case 1:
				Menu.menuEquipos();
				break;
				
			case 2:
				Menu.menuJugadores();
				break;
			
			case 3:
				// Salimos del programa.
				return;
				
			default:
				System.out.println("Opcion no valida....\nPulsa intro para volver al menu principal.");
				sc.nextLine();
				Menu.MenuPrincipal();
			
			
		}
		
	}
	
	public static void menuEquipos() {
		
		System.out.println("==== Programa de Control de Clubes y Judadores de la ciudad de Logrono ====");
		System.out.println("Gestion de Equipos de futbol.");
		System.out.println("1. Dar de Alta a un equipo de futbol.");
		System.out.println("2. Dar de Baja a un equipo de futbol.");
		System.out.println("3. Listar equipo de futbol.");
		System.out.println("4. Mostrar Jugadores de un equipo de futbol.");
		System.out.println("5. Volver al menu principal.");
		
		int opcionUsuario=Menu.leerIntUsuario();
		while (opcionUsuario==0) {
			System.out.println("Por favor, escoge una opcion valida:");
			opcionUsuario=Menu.leerIntUsuario();
		}
		switch (opcionUsuario) {
		
		case 1:
			Menu.altaEquipo();
			break;
			
		case 2:
			Menu.bajaEquipo();
			break;
			
		case 3:
			Menu.listarEquiposFutbol();
			break;
			
		case 4:
			Menu.listarJugadoresEquipo();
			break;
		
		case 5:
			Menu.MenuPrincipal();
			break;
			
		default:
			System.out.println("Opcion no valida....\nPulsa intro para volver al menu de eqipos.");
			sc.nextLine();
			Menu.menuEquipos();
		}
		
		
	}

	
	
	
	
	public static void altaEquipo() {
		String nombre;
		int division;
		System.out.print("Dime el nombre del equipo:");
		nombre=Menu.leerStringUsuario();
		System.out.print("\nDime la division del equipo de futbol:");
		division=Menu.leerIntUsuario();
		
		
		try {
			EquiposFutbol equipoNuevo= new EquiposFutbol(division, nombre);
			EquiposFutbol.guardarEquipo(equipoNuevo);
			System.out.println("Equipo de futbol dato de alta correctamente.\nPulse intro para continuar.");
			Menu.sc.nextLine();
			
		} catch (Exception e) {
			System.out.println("Error al dar de alta el nuevo equipo de futbol: " + e);
			Menu.altaEquipo();
		}
		Menu.menuEquipos();
	}
	
	
	public static void bajaEquipo () {
		int idEquipoDeBaja=pedirEquipoFutbol("Dar de baja equipo de futbol");
		EquiposFutbol.quitarEquipo(idEquipoDeBaja);
		Menu.menuEquipos();
		
	}
	

	public static void listarEquiposFutbol() {
		System.out.println("Lista de equipos de futbol:");
		System.out.println(EquiposFutbol.listarEquiposFutbol());
		System.out.println("Pulsa intro para volver al menu de gestion de equipos.");
		sc.nextLine();
		Menu.menuEquipos();
		
		
	}
	
	public static void listarJugadoresEquipo() {
		
		int idEquipoFutbol=Menu.pedirEquipoFutbol("listar jugadores");
		System.out.println(EquiposFutbol.listarJugadoresEquipo(idEquipoFutbol));
		System.out.println("Pulsa intro para volver al menu de gestion de equipos.");
		sc.nextLine();
		Menu.menuEquipos();
		
		
	}
	

	public static void menuJugadores() {
		
		System.out.println("==== Programa de Control de Clubes y Judadores de la ciudad de Logrono ====");
		System.out.println("Gestion de Jugadores de futbol.");
		System.out.println("1. Dar de Alta a un Jugador de futbol.");
		System.out.println("2. Dar de Baja a un Jugador de futbol.");
		System.out.println("3. Marcar Jugador como mejor del partido.");
		System.out.println("4. Añadir Kilometros Recorridos a un jugador.");
		System.out.println("5. Listar Jugadores Federados");
		System.out.println("6. Volver al menu principal.");
		
		int opcionUsuario=Menu.leerIntUsuario();
		while (opcionUsuario==0) {
			System.out.println("Por favor, escoge una opcion valida:");
			opcionUsuario=Menu.leerIntUsuario();
		}
		switch (opcionUsuario) {
		
		case 1:
			Menu.altaJugador();
			break;
			
		case 2:
			Menu.bajaJugador();
			break;
			
		case 3:
			Menu.marcarJugadorMejorDelPartido();
			break;
			
		case 4:
			Menu.anyadirKMJugador();
			break;
		
		case 5:
			Menu.listarJugadoresFederados();
			break;
			
		case 6:
			Menu.MenuPrincipal();
			break;
			
		default:
			System.out.println("Opcion no valida....\nPulsa intro para volver al menu de eqipos.");
			sc.nextLine();
			Menu.menuEquipos();
		}
		
		
	}
	private static void bajaJugador() {
		int idEquipo=Menu.pedirEquipoFutbol("Baja de jugador del equipo");
		int jugadorEquipo=Menu.pedirJugadorEquipo(idEquipo, "Baja de jugador");
		EquiposFutbol.quitarJugador(idEquipo, jugadorEquipo);
		Menu.menuJugadores();
		
		
	}
	private static void altaJugador() {
			
			int idEquipo=Menu.pedirEquipoFutbol("Alta nuevo jugador");
			
			System.out.print("Dime el nombre del nuevo jugador: ");
			String nombre=Menu.leerStringUsuario();
			System.out.print("Dime el apellido del nuevo jugador: ");
			String apellido=Menu.leerStringUsuario();
			System.out.print ("Dime el dorsal del nuevo jugador: ");
			int dorsal = Menu.leerIntUsuario();
			Jugadores NuevoJugador = new Jugadores( nombre, apellido, dorsal, true);
			EquiposFutbol.anyadirJugador(NuevoJugador, idEquipo);
			Menu.menuJugadores();
			
			
		
	}

public static void marcarJugadorMejorDelPartido() {
	System.out.println("Dime el equipo al que pertenece el jugador.");
	int idEquipo=pedirEquipoFutbol("Mejor jugador del equipo en partido de futbol.");
	
	int idJugador=Menu.pedirJugadorEquipo(idEquipo, "Mejor jugador del equipo en partido de futbol.");
	EquiposFutbol.marcarJugadorMejor(idEquipo, idJugador);
	Menu.menuJugadores();
	
	
}

public static void anyadirKMJugador() {
	int idEquipo=Menu.pedirEquipoFutbol("Agregar KM Recorridos a jugador");
	System.out.println("Agregar KM Recorridos a jugador a jugador: ");
	int idJugador=Menu.pedirJugadorEquipo(idEquipo, "Agregar KM Recorridos a jugador");

	System.out.print("Dime los KM recorridos por el Jugador: ");
	int kmRecorridos=Menu.leerIntUsuario();
	
	while ( kmRecorridos<1 ) {
		System.out.println("Los KM recorridos no son validos...");
		System.out.print("Dime los KM recorridos por el Jugador: ");
		kmRecorridos=Menu.leerIntUsuario();
		
	}
	
	EquiposFutbol.anyadirKmJugador(idEquipo, idJugador, kmRecorridos);
	Menu.menuJugadores();
}

 public static void listarJugadoresFederados() {
	 Menu.menuJugadores();
 }
 
 public static int pedirJugadorEquipo(int idEquipo, String contexto) {
	 	System.out.println("Escoje un jugador para ("+ contexto +"): ");
	 	System.out.println(EquiposFutbol.listarJugadoresEquipo(idEquipo));
		int idJugador=Menu.leerIntUsuario();
		while (EquiposFutbol.comprobarSiExisteJugadorEnEquipo(idEquipo, idJugador)==false) {
			System.out.println("El jugador elegido no es valido.");
			System.out.print("Dime un id de jugador valido: ");
			idJugador=Menu.leerIntUsuario();
			
		}
		return idJugador;
 }
 
public static int pedirEquipoFutbol(String contexto) {
	System.out.println("Escoje un equipo de futbol (" + contexto +"): ");
	System.out.println(EquiposFutbol.listarEquiposFutbol());
	int idEquipo=Menu.leerIntUsuario();
	while (EquiposFutbol.comprobarSiExisteEquipoFutbol(idEquipo)==false) {
		System.out.println("El equipo de futbol elegido no es valido;");
		System.out.print("Dime un equipo de futbol valid: ");
		idEquipo=Menu.leerIntUsuario();
		
	}
	return idEquipo;
	
	
}
 
}

