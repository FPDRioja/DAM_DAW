
public class BicicletaElectrica {
	private static int contador = 0;
	private int id;
	private String marca;
	private String modelo;
	private int autonomiaMaxima;
	private double bateria;
	private int kmRecorridos;
	private Propietario propietario;

	public static int biciNueva() {
		BicicletaElectrica.contador = BicicletaElectrica.contador + 1;
		return BicicletaElectrica.contador;
	}

	public BicicletaElectrica() {
		this.id = BicicletaElectrica.biciNueva();
		this.marca = "Marca Inicial";
		this.modelo = "Modelo Inicial Básico";
		this.autonomiaMaxima = 50;
		this.bateria = 100;
		this.kmRecorridos = 0;
		this.propietario = null;

	}

	public BicicletaElectrica(String marca, String modelo, double autonomiaMaxima) {
		this.id = BicicletaElectrica.biciNueva();
		this.marca = marca;
		this.modelo = modelo;
		this.autonomiaMaxima = (int) autonomiaMaxima;
		this.bateria = 100;
		this.kmRecorridos = 0;
		this.propietario = null;

	}

	public boolean realizarRecorrido(int km) {
		// Si usamos int se redondea automáticamente y devuelve siempre 0, mejor usar double (en la multiplicación).
		double  consumo = ( (double)  km / this.autonomiaMaxima) * 100;
		if (consumo <= this.bateria) {
			this.bateria = this.bateria - consumo;
			this.kmRecorridos = this.kmRecorridos + km;
			System.out.println("Se ha realizado el recorrido correctamente.");
			return true;
		}
		System.out.println("Beteria insuficiente para realizar el recorrido solicitado.");
		return false;
	}

	public boolean cargarBateria(double procentaje) {
		// Convertimos el numero negativo a positivo por si acaso..
		double cargaMax = this.bateria + Math.abs(procentaje);
		this.bateria = cargaMax < 100 ? cargaMax : 100;
		System.out.printf("El estado actual de la bateria actual: %.2f%%\n", this.bateria);

		return true;
	}

	public boolean asignarPropietario(Propietario NuevoPropietarioBiciclea) {
		if (this.propietario == null) {
			this.propietario = NuevoPropietarioBiciclea;
			System.out.println("Se ha asignado correctamente el propietario.");
			return true;
		} else {
			System.out.println("La bicicleta ya tiene un propietario.");
			return false;
		}

	}

	public boolean retirarPropietario() {
		if (this.propietario != null) {
			this.propietario = null;
			System.out.println("Se ha eliminado correctamente al propietario de la bici.");
		} else {
			System.out.println("Error: La bicicleta no tiene un propietario.");

		}
		return true;
	}
	
	public void comprobarBateria() {
		
		int cargaBateria=(int) this.bateria;

	    if (cargaBateria > 50) {
	        // La batería esté cargada más del 50%.
	        System.out.println("Batería suficiente: La batería está por encima del 50%");
	    } else if (cargaBateria > 20) {
	        // La batería esté por encima del 20% y menor que el 50%.
	        System.out.println("Batería moderada: La batería está entre 20% y 50%");
	    } else {
	        // La bateria esta baja < 20%
	        System.out.println("Batería baja: La batería está por debajo del 20%");
	    }
	}
	
	public static int getTotalBicicletas() {
		return BicicletaElectrica.contador;
	}

	@Override
	public String toString() {
		
		if (this.propietario==null) {
			return "\n==== Datos de la BICI ====\nID: " + id + "\nMarca: " + marca + "\nModelo: " 
					+ modelo + "\nAutonomia Maxima: "
					+ autonomiaMaxima + "\nEstado de Carga de la Bateria: " + bateria +"%"
					+ "\nHistorial de KM Recorridos: " + kmRecorridos +"\n" +"Esta bici no tiene propietario.";
		} else {
			return "\n==== Datos de la BICI ====\nID: " + id + "\nMarca: " + marca + "\nModelo: " 
					+ modelo + "\nAutonomia Maxima: "
					+ autonomiaMaxima + "\nEstado de Carga de la Bateria: " + bateria +"%"
					+ "\nHistorial de KM Recorridos: " + kmRecorridos +"\n" + this.propietario;
		}
		

	}
	
	// Metodo para comprobar si la bici esta disponible.
	public boolean comprobarDisponibilidad() {
		return (this.propietario==null)?true:false;
		
	}
	
	
	
}
