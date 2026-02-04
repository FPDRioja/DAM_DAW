package ejercicio03;


public class Dispositivo {

		// Modelo de dispositivo.
		String modelo="";
		
		// Tipo de dispositivoo: portatil, tablet, smpartphone.
		String tipo="";
		
		// Objeto persona, del propietario.
		Persona titular;
		
		// Nivel actual de bateria en %.
		double bateria=0;
		
		// Consumo estimado del dispositivo por hora.
		double consumoPorHora=0;
		
		// Cantidad de horas de uso del dispositivo.
		double horasUsoTotal=0;

		/*
		 * Resta el nivel de bateria el resultado de horas * consumoPorHora.
		 * El valor de bateria debe mantenerse entre 0 y 100.
		 * */
		public void usarDispositivo(double horas) {
			
			this.bateria=Math.max((this.bateria-(this.consumoPorHora*horas)),0);
			this.horasUsoTotal+=horas;
		
		}
		
		public void cargarDispositivo(double porcentaje) {
			this.bateria= Math.min(this.bateria+porcentaje, 100);
			
			
		}

		@Override
		public String toString() {
			return "\n----- Dispisitivo -----\nModelo: " + modelo + "\nTipo (portátil, tablet, etc.): " + tipo + "\nBatería actual (0-100): " + bateria
					+ "%\nConsumo por hora: " + consumoPorHora + "%\nHoras de uso total: " + horasUsoTotal + "\n----- Titular -----\n"+this.titular;
		}
		
		public void mostrarInformacion () {
			System.out.println(this.toString());
			
		}
		
		public Dispositivo(String modelo, String tipo, Persona titular, double bateriaActual, double consumoPorHora, double horasUsoInicial) {
			this.modelo = modelo;
			this.tipo = tipo;
			this.titular = titular;
			this.bateria = bateriaActual;
			this.consumoPorHora = consumoPorHora;
			this.horasUsoTotal=horasUsoInicial;
		} 
		
		
}

