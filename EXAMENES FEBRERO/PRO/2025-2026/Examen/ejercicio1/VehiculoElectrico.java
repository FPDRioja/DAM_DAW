package ejercicio1;

public class VehiculoElectrico {
	public String modelo;
	public double bateria;
	public double consumoKm;
	public double kilometrosRecorridos;
	
	public VehiculoElectrico(String modelo, int consumoKm) {
		this.modelo = modelo;
		this.bateria = 100.00;
		this.consumoKm = consumoKm;
		this.kilometrosRecorridos = 0;
	}

	public void recorrer(double kilometros) {
		double consumo=kilometros * this.consumoKm;
		double resultadoConsumoBateria=this.bateria-consumo;
		this.bateria=Math.max(resultadoConsumoBateria, 0);
		this.kilometrosRecorridos=this.kilometrosRecorridos+kilometros;
		
	}

	public void recargar(double porcentaje) {
		double totalBateria=this.bateria+porcentaje;
		this.bateria=Math.min(totalBateria, 100);
		
		
	}


	public void mostrarInformacion() {
		System.out.println ("Datos del Vehiculo Electrico:");
		System.out.println("Modelo: " + modelo);
		System.out.println("Nivel Actual de la bateria: " + bateria+"%");
		System.out.println("Kilometros Totales Recorridos: " + kilometrosRecorridos +" Km");
		
	}
	

	public String estadoBateria()  {
		if(this.bateria>=60) {
			return "BUENA";
		}
		
		if(this.bateria>=20 && this.bateria<=59) {
			return "MEDIA";
		}
		
		return "BAJA";
		
	}

	
	
	
	
	
}
