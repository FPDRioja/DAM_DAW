package tarea_05;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Dispositivo {

	private String codigo;
	private String nombre;
	private String tipo;

	private List<SesionUso> sesiones;

	public Dispositivo(String codigo, String nombre, String tipo) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.tipo = tipo;
		this.sesiones = new ArrayList<SesionUso>();
	}

	public void registrarSesion(SesionUso sesionUso) {
		this.sesiones.add(sesionUso);
		System.out.println("Nueva sesión:");
		System.out.println(sesionUso);
		System.out.println("Añadida a:");
		System.out.println(this);
	}

	/**
	 * Crea una nueva sesión válida sin registrar. Devuelve null si la sesión no
	 * puede crearse
	 * 
	 * @param horas
	 * @param consumo
	 * @param temperatura
	 * @return
	 */
	public SesionUso crearSesion(double horas, double consumo, double temperatura) {
		if (horas <= 0 || consumo < 0 || temperatura < 0) {
			System.out.println("Error: Datos de sesión inválidos (horas > 0, consumo >= 0, temperatura >= 0).");
			return null;
		}
		return new SesionUso(horas, consumo, temperatura);
	}

	public double mediaConsumo() {

//		if (sesiones.isEmpty()) {
//			return 0;
//		}
//		
//		double suma = 0;
//		for (SesionUso sesionUso : sesiones) {
//			suma += sesionUso.getConsumo();
//		}
//		return suma / sesiones.size();

		return sesiones.stream().mapToDouble(SesionUso::getConsumo).average().orElse(0); // !!
	}

	public double mediaTemperatura() {
//		if (sesiones.isEmpty()) {
//			return 0;
//		}
//
//		double suma = 0;
//		for (SesionUso sesionUso : sesiones) {
//			suma += sesionUso.getTemperaturaMax();
//		}
//		return suma / sesiones.size();
		
		return sesiones.stream().mapToDouble(SesionUso::getTemperaturaMax).average().orElse(0); // !!
	}

	public double totalHorasUso() {
//		double suma = 0;
//		for (SesionUso sesionUso : sesiones) {
//			suma += sesionUso.getHoras();
//		}
//		return suma;
		
		if (sesiones.isEmpty()) {
			return 0;
		}
		
		return sesiones.stream().mapToDouble(SesionUso::getHoras).sum(); // !!
	}

	public SesionUso sesionMayorConsumo() {
		if (sesiones.isEmpty()) {
			return null;
		}
		return Collections.max(sesiones, Comparator.comparing(SesionUso::getConsumo));
	}

	@Override
	public String toString() {
		return "Dispositivo [codigo=" + codigo + ", nombre=" + nombre + ", tipo=" + tipo + ", Media Consumo="
				+ String.format("%.2f", mediaConsumo()) + ", Media Temperatura="
				+ String.format("%.2f", mediaTemperatura()) + ", Total Horas Uso="
				+ String.format("%.2f", totalHorasUso()) + "]";
	}

	public void mostrarSesiones() {
		if (sesiones.isEmpty()) {
			System.out.println("No hay sesiones!");
		}
		sesiones.forEach(System.out::println); //Muy interesante

	}

	public String getCodigo() {
		return codigo;
	}
}
