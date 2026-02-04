package ejercicio1;

import java.util.Scanner;

public class Principal {

	public static void main(String[] args) {
		
		VehiculoElectrico coche1= new VehiculoElectrico("Tesla Model S", 8);
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Dime la cantidad de KM que vas a recorrer: ");
		double km = Double.parseDouble(sc.nextLine());
		System.out.print("Dime el porcentaje de bateria que vas a recargar: ");
		double recargaBateria = Double.parseDouble(sc.nextLine());
		coche1.recorrer(km);
		coche1.recargar(recargaBateria);
		coche1.mostrarInformacion();
		sc.close();

	}

}
