package ejercicio2;

import java.util.Scanner;

public class Ejercicio2 {

	private static Scanner sc = new Scanner(System.in);
	
	
	public static void pulsaIntro() {
		System.out.println("Pulsa Intro para continuar...");
		Ejercicio2.sc.nextLine();
	}
	public static void menu() {
		System.out.print("Dime un numero: ");
		int n = Integer.parseInt(Ejercicio2.sc.nextLine());
		
		System.out.println("Escoge una opcion:");
		System.out.println("1. Sumar los numeros pares.");
		System.out.println("2. Sumar los multiplos de un numero k.");
		System.out.println("3. Mostrar los numeros primos.");
		System.out.println("4. Salir del programa.");
		System.out.print("Escoge una opcion: ");
		

		int opcion=Integer.parseInt(Ejercicio2.sc.nextLine());;
		switch (opcion) {
		
		case 1:
			Ejercicio2.sumarNumerosPares(n);
			break;
			
		case 2:
			Ejercicio2.SumarMultiplosDeUnNumeroK(n);
			break;
			
		case 3: 
			Ejercicio2.MostrarNumerosPrimos(n);
			break;
			
		case 4:
			System.exit(0);
			
		default:
			Ejercicio2.menu();

		}
		
		
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Ejercicio2.menu();
		

		
		
	}


	private static void MostrarNumerosPrimos(int n) {
		int i =1;
		int MaxBucle=n+1;
		while (i< MaxBucle ) {
			
			Ejercicio2.comprobarSiEsPrimo(i);
			i=i+1;
			
		} 
		Ejercicio2.pulsaIntro();
		Ejercicio2.menu();
		
	
		
	}


	private static void SumarMultiplosDeUnNumeroK(int n) {
		System.out.print("Dime el valor de K: ");
		
		int k = Integer.parseInt(Ejercicio2.sc.nextLine());
		int i=0;
		int total=0;
		while (i<k+1) {
			total=total+(i*n);
			i++;
			
		}
		
		System.out.println("La suma de los multiplos del numero: "+ n+ " contando hasta "+ k +" es: " + total);
		Ejercicio2.pulsaIntro();
		Ejercicio2.menu();
		
	}


	private static void sumarNumerosPares(int n) {
		int total=0;
		for (int i=0; i<n+1; i=i+1) {
			//si es par..
			if(i%2==0) {

				total=total+i;
			}
			
		}
	System.out.println("La suma de numeros pares es: " + total);
	Ejercicio2.pulsaIntro();
	Ejercicio2.menu();
		
	}
	
	public static void comprobarSiEsPrimo(int numero) {
		
		int contadorPrimos=0;
		
		for (int i=1; i<=numero; i++) {
			int resultado=numero%i;
			if (resultado==0) {
				contadorPrimos=contadorPrimos+1;
			}
		}
		
		if (contadorPrimos==2) {
			System.out.println(numero + " es Primo");
		}
		
	}
	
}
/*
2

2
4
6
8
10

*/