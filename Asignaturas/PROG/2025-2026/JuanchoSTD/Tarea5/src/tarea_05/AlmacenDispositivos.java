package tarea_05;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class AlmacenDispositivos {

	private Dispositivo[] inventario;
	private int contador;
	private Map<String, Dispositivo> indicePorCodigo;
	public static final int MAX_DISPOSITIVOS = 30;

	public AlmacenDispositivos() {
		super();
		this.contador = 0;
		this.inventario = new Dispositivo[MAX_DISPOSITIVOS];
		this.indicePorCodigo = new HashMap<String, Dispositivo>();
	}

	/**
	 * Asigna un dispositivo nuevo a este almacén.
	 * 
	 * @param d
	 * @return
	 */
	public boolean altaDispositivo(Dispositivo d) {

		if (d == null) {
			System.out.println("Debe existir el dispositivo");
			return false;
		}

		if (indicePorCodigo.containsKey(d.getCodigo())) {
			System.out.println("No se puede añadir. Código dispositivo no se puede duplicar!");
			return false;
		}

		if (contador >= MAX_DISPOSITIVOS) {
			System.out.println("No se puede añadir. Número máximo de dispositivos alcanzado!");
			return false;
		}

		inventario[contador++] = d;
		indicePorCodigo.put(d.getCodigo(), d);

		return true;
	}

	/**
	 * Valida y crea un nuevo dispositivo, pero no lo asigna
	 * 
	 * @param codigo
	 * @param nombre
	 * @param tipo
	 * @return
	 */
	public Dispositivo crearDispositivo(String codigo, String nombre, String tipo) {
		if (codigo == null || codigo.isBlank() || nombre == null || nombre.isBlank() || tipo == null
				|| tipo.isBlank()) {
			System.out.println("Error: El código, el tipo y el nombre son obligatorios.");
			return null;
		}

		return new Dispositivo(codigo, nombre, tipo);

	}

	public Dispositivo buscarPorCodigo(String codigo) {
		return indicePorCodigo.get(codigo);
	}

	public void listarDispositivos() {
		System.out.println("Lista de dispositivos(" + contador + "):");
		for (int i = 0; i < contador; i++) {
			System.out.println(inventario[i].toString());
		}
	}

	public double mediaGlobalConsumo() {

		if (contador <= 0) {
			return 0;
		}

		double suma = 0;
		for (int i = 0; i < contador; i++) {// ninguno es nulo
			suma += inventario[i].mediaConsumo();
		}
		return suma / contador;
	}

	public Dispositivo dispositivoMasUsado() {

		if (contador <= 0) {
			return null;
		}
		Dispositivo maxHorasUso = inventario[0];

		for (int i = 0; i < contador; i++) {
			if (inventario[i].totalHorasUso() > maxHorasUso.totalHorasUso()) {
				maxHorasUso = inventario[i];
			}
		}

		return maxHorasUso;

	}

	public int getContador() {
		return contador;
	}

	/**
	 * Método estático para generar datos aleatorios de prueba
	 */
	public static void creaConjuntoDePrueba(AlmacenDispositivos almacen, int cantidad) {
		String[] nombres = { "Monitor", "Portatil", "Router", "Impresora", "Scanner", "Servidor" };
		String[] tipos = { "Periférico", "Computación", "Redes", "Ofimática" };
		Random rand = new Random();

		for (int i = 0; i < cantidad; i++) {
			String nombre = nombres[rand.nextInt(nombres.length)];
			// Generar código descriptivo: 3 primeras letras en mayúsculas + contador
			String prefijo = (nombre.length() >= 3) ? nombre.substring(0, 3).toUpperCase() : "DIS";
			String codigo = prefijo + String.format("%03d", (i + 1));
			String tipo = tipos[rand.nextInt(tipos.length)];

			Dispositivo nuevo = almacen.crearDispositivo(codigo, nombre, tipo);

			if (almacen.altaDispositivo(nuevo)) {
				// Añadir entre 1 y 3 sesiones aleatorias a cada dispositivo
				int numSesiones = rand.nextInt(2) + 2;
				for (int j = 0; j < numSesiones; j++) {
					nuevo.registrarSesion(nuevo.crearSesion(1 + rand.nextDouble() * 10, // Horas (1-11)
							10 + rand.nextDouble() * 100, // Consumo (10-110)
							30 + rand.nextDouble() * 40 // Temperatura (30-70)
					));
				}
			}
		}
		System.out.println("Se han generado " + cantidad + " dispositivos de prueba.");
	}
}
