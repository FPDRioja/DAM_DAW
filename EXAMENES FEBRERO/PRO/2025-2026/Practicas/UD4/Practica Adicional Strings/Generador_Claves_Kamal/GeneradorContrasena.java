
public class GeneradorContrasena {
	
	private static final String letras="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	private static final String numeros="0123456789";
	private static final String simbolos="!@#$%^&*";
	private static int numContrasenyasGeneradas=1;

	
	public static int obtenerContrasenyasGeneradas() {
		return GeneradorContrasena.numContrasenyasGeneradas;
	}
	public static int obtenerNumAleatorio(int max) 
	{
		return (int)(Math.random() * max);

	}
	
	public static int generarLongitud() 
	{
		
		int numAleatorio=0;
		while (true) {
			numAleatorio=obtenerNumAleatorio(32);
	
			if (numAleatorio % 4 == 0 && numAleatorio!=0 && numAleatorio>7 && numAleatorio < 33) {
				return numAleatorio;
			}
			

		}
		
	}
		
	public static char generarCaracterAleatorio(String tipo) {
		int numAleatorio;
		switch (tipo.toLowerCase()) {
		case "mayuscula":
				numAleatorio=GeneradorContrasena.obtenerNumAleatorio(GeneradorContrasena.letras.length());
				return GeneradorContrasena.letras.toUpperCase().charAt(numAleatorio);
			
		case "minuscula":
				numAleatorio=GeneradorContrasena.obtenerNumAleatorio(GeneradorContrasena.letras.length());
				return GeneradorContrasena.letras.toLowerCase().charAt(numAleatorio);
		
		case "numero":
				numAleatorio=GeneradorContrasena.obtenerNumAleatorio(GeneradorContrasena.numeros.length());
				return GeneradorContrasena.numeros.toLowerCase().charAt(numAleatorio);
	
		case "simbolo":
			
				numAleatorio=GeneradorContrasena.obtenerNumAleatorio(GeneradorContrasena.simbolos.length());
				return GeneradorContrasena.simbolos.toLowerCase().charAt(numAleatorio);

		
		default:
				throw new IllegalArgumentException ("El tipo de caracter solicitado no es un tipo valido");
	
			
		}
		
	}
	
	public static String generarContrasena() {
		int longitudContrasenya=GeneradorContrasena.generarLongitud();
		System.out.println("Generando contraseña de: " + longitudContrasenya + " Caracteres.");

		StringBuilder sb= new StringBuilder();
		
		
		for (int contador=0; contador<longitudContrasenya+1; contador++) {
			
			
			for (int grupoClaves=0; grupoClaves<4; grupoClaves++) {
				int numAleatorioTipoString=GeneradorContrasena.obtenerNumAleatorio(4);
				switch (numAleatorioTipoString) 
				
				{
					case 0:
						sb.append(generarCaracterAleatorio("mayuscula"));
						break;
						
					case 1:
						sb.append(generarCaracterAleatorio("minuscula"));
						break;
							
					case 2:
						sb.append(generarCaracterAleatorio("numero"));
						break;
							
					case 3:
						sb.append(generarCaracterAleatorio("simbolo"));
						break;
				}
				if (grupoClaves==3) {
					sb.append("-");
					contador=contador+4;
				}
			}
			
		}
		// Borramos el ultimo guion.
		sb.deleteCharAt(sb.length()-1);
		// Borramos el ultimo caracter.
		sb.deleteCharAt(sb.length()-1);
		// Añadimos el primer caracter al final para que sean iguales.
		sb.append(sb.substring(0, 1));
		// Contamos las contraseñas generadas.
		GeneradorContrasena.numContrasenyasGeneradas=GeneradorContrasena.numContrasenyasGeneradas+1;
		return sb.toString();
		
	}
}
