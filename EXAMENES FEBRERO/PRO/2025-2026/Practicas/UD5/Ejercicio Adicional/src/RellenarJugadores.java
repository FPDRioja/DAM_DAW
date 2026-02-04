
public class RellenarJugadores {

	public static void cargarDatos() throws Exception {
		EquiposFutbol sevilla=new EquiposFutbol(1,"Sevilla CF");
		EquiposFutbol barcelona=new EquiposFutbol(1,"FC Barcelona");
		EquiposFutbol madrid=new EquiposFutbol(1,"Real Madrid CF");
		EquiposFutbol.guardarEquipo(sevilla);
		EquiposFutbol.guardarEquipo(barcelona);
		EquiposFutbol.guardarEquipo(madrid);
		Jugadores Jugador1 = new Jugadores( "Juan", "Martinez", 22, true);
		Jugadores Jugador2 = new Jugadores( "Fernando", "Martinez", 22, true);
		Jugadores Jugador3 = new Jugadores( "Kamal", "Majaiti", 22, true);
		Jugadores Jugador4 = new Jugadores( "Jose", "Martinez", 22, true);
		
		Jugadores Jugador5 = new Jugadores( "Juan", "Llorente", 22, true);
		Jugadores Jugador6 = new Jugadores( "Fernando", "Llorente", 22, true);
		Jugadores Jugador7 = new Jugadores( "Kamal", "Llorente", 22, true);
		Jugadores Jugador8 = new Jugadores( "Jose", "Llorente", 22, true);

		
		Jugadores Jugador9 = new Jugadores( "Juan", "Fernandez", 22, true);
		Jugadores Jugador10 = new Jugadores( "Fernando", "Fernandez", 22, true);
		Jugadores Jugador11 = new Jugadores( "Kamal", "Fernandez", 22, true);

		
		
		madrid.anyadirJugador(Jugador1);
		madrid.anyadirJugador(Jugador2);
		madrid.anyadirJugador(Jugador3);
		madrid.anyadirJugador(Jugador4);
		
		barcelona.anyadirJugador(Jugador5);
		barcelona.anyadirJugador(Jugador6);
		barcelona.anyadirJugador(Jugador7);
		barcelona.anyadirJugador(Jugador8);
		
		sevilla.anyadirJugador(Jugador9);
		sevilla.anyadirJugador(Jugador10);
		sevilla.anyadirJugador(Jugador11);
	}
}
