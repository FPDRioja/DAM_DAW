package bicicletas.arrays;

public class BicicletaElectrica {

	public static int indiceId = 0;
	private int id;
	private String marca;
	private String modelo;
	private double autonomiaMaxima;
	private double bateria;
	private double kmRecorridos;
	private Propietario propietario;
	
	public BicicletaElectrica() {
		this.id = BicicletaElectrica.indiceId++; 
		this.marca = "Predeterminada";
		this.modelo = "Predeterminado";
		this.autonomiaMaxima = 50;
		this.bateria = 100;
		this.kmRecorridos = 0;
		this.propietario = null;
		System.out.println("Nueva bicicleta:\n" + this.toString());
	}

	public BicicletaElectrica(String marca, String modelo, double autonomiaMaxima) {
		this.id = BicicletaElectrica.indiceId++; 		
		this.marca = marca;
		this.modelo = modelo;
		this.autonomiaMaxima = autonomiaMaxima;
		this.bateria = 100;
		this.kmRecorridos = 0;
		this.propietario = null;
		System.out.println("Nueva bicicleta:\n" + this.toString());
	}
	
	public void realizarRecorrido(double km) {
		if (km <= 0) {
			System.out.println("EL recorrido que se realice debe ser mayoir de 0");
			return;
		}
		double consumo = (km/autonomiaMaxima)*100;
		double bateriaRestante = bateria - consumo;
		if (bateriaRestante < 0) {
			System.out.println("Este recorrido agitaría la batería, cancelado");
		}
		kmRecorridos += km;
		bateria = bateriaRestante;
		System.out.println("Recorrido registrado, batería restante: " + bateria);
	}
	public boolean cargarBateria(double porcentaje) {
		if (porcentaje <= 0) {
			System.out.println("La carga debe ser positiva");
			return false;
		}
		bateria += porcentaje;
		if (bateria > 100) bateria = 100;
		System.out.println("Batería recargada al: " + bateria);
		return true;
	}
	public void asignarPropietario (Propietario nuevo) {
		if (propietario != null) {
			System.out.println("Esta bici tiene propietario, retíralo primero!");
			return;
		}
		propietario = nuevo;
		System.out.println("Nuevo propietario asignado: " + propietario);
	}
	public void retirarPropietario() {
		if (propietario == null) {
			System.out.println("Esta bici no tiene propietario");
			return;
		}
		propietario = null;
		System.out.println("Propietario retirado.");
	}
	public void comprobarBateria() {
		if (bateria > 50) {
			System.out.println("Batería suficiente");
		}else if (bateria > 20) {
			System.out.println("Batería moderada");
		}else {
			System.out.println("Batería baja");
		}
	}
	public static int getTotalBicicletas() {
		return BicicletaElectrica.indiceId;
	}

	@Override
	public String toString() {
		return "BicicletaElectrica [id=" + id + ", marca=" + marca + ", modelo=" + modelo + ", autonomiaMaxima="
				+ autonomiaMaxima + ", bateria=" + bateria + ", kmRecorridos=" + kmRecorridos + ", propietario="
				+ ((propietario==null)?"Sin propietario":propietario) + "]";
	}
	
	
}
