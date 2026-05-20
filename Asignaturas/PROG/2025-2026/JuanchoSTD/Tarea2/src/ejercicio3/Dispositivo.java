package ejercicio3;

public class Dispositivo {
	private String modelo;
	private String tipo;
	private Persona titular;
	private double bateria;
	private double consumoPorHora;
	private double horasUsoTotal;

	public Dispositivo(String modelo, String tipo, Persona titular, double bateria, double consumoPorHora) {
		this.modelo = modelo;
		this.tipo = tipo;
		this.titular = titular;
		// Acotamos batería inicial entre 0 y 100
		this.bateria = Math.min(Math.max(bateria, 0), 100);
		// el consumo no puede ser negativo
		this.consumoPorHora = Math.max(consumoPorHora, 0);
		this.horasUsoTotal = 0;
	}

	public void usarDispositivo(double horas) {
		double bateriaGastada = horas * consumoPorHora;
		this.bateria = Math.max(this.bateria - bateriaGastada, 0);
		this.horasUsoTotal += horas;
	}

	public void cargarDispositivo(double porcentaje) {
		// Acotamos la carga resultante entre 0 y 100, y garantizamos que la carga
		// aplicada es mayor o igual a cero
		this.bateria = Math.min(Math.max(porcentaje, 0) + this.bateria, 100);
	}

	public void mostrarInformacion() {
		System.out.println("Modelo: " + modelo);
		System.out.println("Tipo: " + tipo);
		// Como toString está implenmetado, se llamará auto y reflejará la info bien
		// formateada
		System.out.println("Titular: " + titular);
		System.out.printf("Nivel de batería: %.2f%%\n", bateria);
		System.out.println("Consumo por hora: " + consumoPorHora + "%");
		System.out.println("Horas de uso total: " + horasUsoTotal);
	}
}
