
public class Jugadores {
	private String nombre;
	private String apellido;
	private int dorsal;
	private int mejorJugador;
	private int kmRecorridos;
	private int partidosJugados;
	private boolean esFederado;
	
	
	public Jugadores (String Nombre, String Apellido, int Dorsal, boolean Federado) {
		this.nombre=Nombre;
		this.apellido=Apellido;
		this.dorsal=(int) Math.abs(Dorsal);
		this.kmRecorridos=0;
		this.mejorJugador=0;
		this.partidosJugados=0;
		this.esFederado=Federado;
	}
	
	public void anyadirKmRecorridos(int KMRecorridos) {
		this.kmRecorridos=this.kmRecorridos + Math.abs(KMRecorridos);
		this.partidosJugados=this.partidosJugados+1;
		
	}
	
	public void marcarMejorJugador() {
		this.mejorJugador=this.mejorJugador+1;
	} 
	
	public float obtenerMediaKMRecorridos() {
		float resultado= (float) this.kmRecorridos / this.partidosJugados;
		// Control de NaNs
		return (Float.isNaN(resultado))?0:resultado;
		
	}
	
	@Override
	public String toString() {
		return this.nombre+" "+ this.apellido + " | " + this.obtenerMediaKMRecorridos() + " | " + this.mejorJugador;

	}
	
	public String obtenerNombreJugador() {
		return this.nombre+" "+ this.apellido;

	}

	
	
}
