import java.util.ArrayList;

public class EquiposFutbol {
	
	private int division;
	private String NombreEquipo;
	private ArrayList<Jugadores> JugadoresActivos = new ArrayList<>();
	private static ArrayList<EquiposFutbol> EquiposActivos = new ArrayList<>();
	
	public static void guardarEquipo(EquiposFutbol equipoAlta) {
		EquiposFutbol.EquiposActivos.addLast(equipoAlta);
		return;
	}
	
	public static void quitarEquipo(int equipoAlta) {
		if (EquiposFutbol.comprobarSiExisteEquipoFutbol(equipoAlta)) {
			String NombreEquipoBaja=EquiposFutbol.EquiposActivos.get(equipoAlta).NombreEquipo.toString();
			EquiposFutbol.EquiposActivos.remove(equipoAlta); 
			System.out.println("El equipo de Futbol "+NombreEquipoBaja+" ha sido dado de baja.\nPulse intro para continuar.");
			Menu.sc.nextLine();
			
		}
		else {
			System.out.println("El equipo de futbol no existe.\nPulse intro para continuar.");
			Menu.sc.nextLine();
		}
		return;
	}	
	
	
	public EquiposFutbol(int division, String nombre) throws Exception {
		try  {
			EquiposFutbol.validarDivision(division);
			this.division=division;
			this.NombreEquipo=nombre;
			
		}catch (Exception e){
			throw new Exception (e);
		}
	}
	
	public static boolean validarDivision(int division) throws Exception {
		switch (division) {
		
		case 1:
			return true;
		case 2:
			return true;
		case 3:
			return true;
			
		default:
			throw new Exception("Division de futbol no valida");

		}
	}
	
	public static boolean comprobarSiExisteEquipoFutbol (int idEquipoFutbol) {
		
		return idEquipoFutbol<EquiposFutbol.EquiposActivos.size();
	}
	
	public static boolean comprobarSiExisteJugadorEnEquipo (int idEquipo, int idJugador) {
		
		return idJugador<EquiposFutbol.EquiposActivos.get(idEquipo).JugadoresActivos.size();
	}
	
	public static String listarEquiposFutbol() {
		StringBuilder sbListaEquipos = new StringBuilder();
		
		for (int i=0; i<EquiposFutbol.EquiposActivos.size(); i++) {
			
			sbListaEquipos.append(i+"." + EquiposFutbol.EquiposActivos.get(i).NombreEquipo);
			sbListaEquipos.append("\n");
		}
		return sbListaEquipos.toString();
		
		
	}
	
	public static String listarJugadoresEquipo(int idEquipoFutbol) {
		
		if (EquiposFutbol.comprobarSiExisteEquipoFutbol(idEquipoFutbol)) {
			String nombreEquipo=EquiposFutbol.EquiposActivos.get(idEquipoFutbol).NombreEquipo.toString();
			StringBuilder sbListaJugadores = new StringBuilder();
			sbListaJugadores.append("Id | Equipo |Nombre Apellido | Media KM/Partido | Veces Mejor Jugador\n");
			EquiposFutbol EquipoFutbol=EquiposFutbol.EquiposActivos.get(idEquipoFutbol);
			
			for (int i=0; i<EquipoFutbol.JugadoresActivos.size(); i++) {
				sbListaJugadores.append(i+". |" + nombreEquipo +" | " + EquipoFutbol.JugadoresActivos.get(i).toString());
				sbListaJugadores.append("\n");
			}
			return sbListaJugadores.toString();
		} else {
			return "El equipo de Futbol elegido no existe";
		}
	}


	public void anyadirJugador(Jugadores Jugador) {
		this.JugadoresActivos.add(Jugador);
	}

	public static void anyadirJugador(Jugadores Jugador, int idEquipoFutbol) {
		if (EquiposFutbol.comprobarSiExisteEquipoFutbol(idEquipoFutbol)) {
			String nombreEquipo=EquiposFutbol.EquiposActivos.get(idEquipoFutbol).NombreEquipo.toString();
			EquiposFutbol.EquiposActivos.get(idEquipoFutbol).JugadoresActivos.add(Jugador);
			System.out.println("El jugador de futbol agregado correctamente al equipo: " + nombreEquipo );
			System.out.println("Pulsa intro para continuar.");
			Menu.sc.nextLine();
		} else {
			System.out.println("El equipo de futbol no existe.\nNo se añade el jugador...\nPulsa intro  para continuar.");
			Menu.sc.nextLine();
			
		}
		return;
	}
	
	public static void marcarJugadorMejor(int idEquipo, int idJugador) {
		if (EquiposFutbol.comprobarSiExisteJugadorEnEquipo(idEquipo, idJugador)) {
			EquiposFutbol.EquiposActivos.get(idEquipo).JugadoresActivos.get(idJugador).marcarMejorJugador();
			String NombreJugador=EquiposFutbol.EquiposActivos.get(idEquipo).JugadoresActivos.get(idJugador).obtenerNombreJugador();
			System.out.println("Se ha marcado al Jugador: "+NombreJugador+" como mejor jugador...\nPulsa intro  para continuar.");
			Menu.sc.nextLine();
		} else {
			System.out.println("El jugador de futbol no existe.\nNo se marca como mejor jugador...\nPulsa intro  para continuar.");
			Menu.sc.nextLine();
		}
		
	}
	
	public static void anyadirKmJugador(int idEquipo, int idJugador, int KMRecorridos) {
		if (EquiposFutbol.comprobarSiExisteJugadorEnEquipo(idEquipo, idJugador)) {
			EquiposFutbol.EquiposActivos.get(idEquipo).JugadoresActivos.get(idJugador).anyadirKmRecorridos(KMRecorridos);
			
		} else {
			System.out.println("El jugador de futbol no existe.\nNo se marca como mejor jugador...\nPulsa intro  para continuar.");
			Menu.sc.next();
		}
		
	}
	
	public static void quitarJugador(int idEquipo, int idJugador) {
		if (EquiposFutbol.comprobarSiExisteJugadorEnEquipo(idEquipo, idJugador)) {
			String NombreJugador=EquiposFutbol.EquiposActivos.get(idEquipo).JugadoresActivos.get(idJugador).obtenerNombreJugador();
			String nombreEquipo=EquiposFutbol.EquiposActivos.get(idEquipo).NombreEquipo.toString();
			EquiposFutbol.EquiposActivos.get(idEquipo).JugadoresActivos.remove(idJugador);
			System.out.println("Se ha eliminado al Jugador: "+NombreJugador+" del equipo: " + nombreEquipo);
			System.out.println("Pulsa intro para continuar...");
			Menu.sc.nextLine();
			
		} else {
			System.out.println("El jugador de futbol no existe.\nNo se marca como mejor jugador...\nPulsa intro  para continuar.");
			Menu.sc.next();
		}
		return;
	}
	
}
