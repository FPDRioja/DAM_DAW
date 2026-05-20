package tarea_05;

public class SesionUso {

	private double horas;
	private double consumo;
	private double temperaturaMax;

	public SesionUso(double horas, double consumo, double temperaturaMax) {
		super();
		this.horas = horas;
		this.consumo = consumo;
		this.temperaturaMax = temperaturaMax;
	}

	public double getHoras() {
		return horas;
	}

	public void setHoras(double horas) {
		this.horas = horas;
	}

	public double getConsumo() {
		return consumo;
	}

	public void setConsumo(double consumo) {
		this.consumo = consumo;
	}

	public double getTemperaturaMax() {
		return temperaturaMax;
	}

	public void setTemperaturaMax(double temperaturaMax) {
		this.temperaturaMax = temperaturaMax;
	}

	@Override
	public String toString() {
		return "SesionUso [horas=" + horas + ", consumo=" + String.format("%.2f", consumo) + ", temperaturaMax="
				+ String.format("%.2f", temperaturaMax) + "]";
	}

}
