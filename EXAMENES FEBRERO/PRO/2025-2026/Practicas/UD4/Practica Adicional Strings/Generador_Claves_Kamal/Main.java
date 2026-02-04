import java.util.Scanner;

public class Main {

	private static Scanner sc = new Scanner(System.in);
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("Generador de contraseñas aleatorias seguras");
		String salir="";
		while (!salir.equalsIgnoreCase("s")){
			System.out.println("Generando contraseña nº: " + GeneradorContrasena.obtenerContrasenyasGeneradas());
			System.out.println(GeneradorContrasena.generarContrasena());
			System.out.println("Pulsa Intro para generar una contraseña o S + Intro para salir.");
			salir=sc.nextLine().trim().toLowerCase();	
		}
		System.out.println("Saliento del programa, gracias por usarme.");

	}


}
