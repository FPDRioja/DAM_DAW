package ejercicio02;

import java.util.Scanner;

public class ConversorTiempo {
	
	public static void convertirSegundos (int segundos) {
	/*
	 * Este método convierte una cantidad total de segundos en horas, minutos y segundos, y
	 * muestra el resultado por consola.
	 * 
	 */
		int horas=segundos / 3600;
		int minutos= (segundos - (horas * 3600)) / 60;
		int segundosPendientes=(segundos - ( (horas * 3600)  + (minutos * 60))) ;
		System.out.printf("Han pasado %d horas, %d minutos, %d segundos.\n", horas,minutos,segundosPendientes);
	}
	
	public static boolean esMayorDeEdad( int edad) {
	/* 
	 * Devuelve ‘boolean’: true si la edad es mayor o igual a 18, 
	 * y false en caso contrario..
	 *  
	 * 
	 */
		return (edad<18)?false:true;
	}
	
	public static void formatoEdad(boolean mayor) {
		// Imprime un mensaje en consola según el valor del parámetro:
		// Si true, muestra: "Es mayor de edad."
		// Si false, muestra: "Es menor de edad."
		// Este método usa el operador ternario, sin if.
		String mensaje=(mayor==true)?"Es mayor de edad":"Es menor de edad";
		System.out.println(mensaje);
		return;

	}

	public static void main(String[] args) {
		/*
		 * La clase debe incluir un método main, que:
		 * Solicite al usuario una cantidad de segundos mediante Scanner.
		 * Solicite al usuario su edad.
		 * Llame al método convertirSegundos para mostrar el resultado.
		 * Llame al método esMayorDeEdad y use el resultado para llamar a formatoEdad.
		*/
		Scanner lectorTeclado=new Scanner(System.in);
		System.out.print("Introduce una cantidad de segundos: ");
		int segundosLeidos=lectorTeclado.nextInt();
		System.out.println();
		ConversorTiempo.convertirSegundos(segundosLeidos);
		System.out.print("Introduce tu edad:");
		int edadLeida=lectorTeclado.nextInt();
		boolean boolMayorEdad=esMayorDeEdad(edadLeida);
		ConversorTiempo.formatoEdad(boolMayorEdad);
		// Destruimos el escaner despues de usarlo.
		lectorTeclado.close();
	
		
		
		
	}

}
