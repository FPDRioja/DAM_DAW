import java.util.Scanner;

public class Menu {

	private static Scanner sc = new Scanner(System.in);

	public static int pintarMenuPrincipal() {
		System.out.println("==== MENÚ DE GESTIÖN DE BICICLETAS ELÉCTRICAS ====");
		System.out.println("1. Asignar Propietario.");
		System.out.println("2. Retirar propietario.");
		System.out.println("3. Realizar recorrido.");
		System.out.println("4. Cargar batería.");
		System.out.println("5. Mostrar información.");
		System.out.println("6. Salir.");
		System.out.print("Selecciona una opción: ");
		return Menu.leerNumero();
	}

	public static int leerNumero() {
		boolean numeroValido=false;
		int valorNumerico=0;
		while(!numeroValido) {
			try {
				valorNumerico=Integer.parseInt(Menu.sc.nextLine());
				// Si ha ido bien..
				numeroValido=true;
			} catch (Exception e ) {
				// Si no ha ido bien....mostramos el error generico.
				System.out.println("El valor introducido no es valido.....");
				System.out.print("Introduce un valor numerico valido: ");
			}
		}
		return valorNumerico;
	}

	public static String leerStringUsuario() {
		return Menu.sc.nextLine();
	}

	public static int escogerBici() {
		System.out.print("Dime, ¿que bici quieres usar?: ");
		int idBici = Menu.leerNumero();
		while (idBici>2 || idBici<1) {
			System.out.println("La bici elegida no es valida....");
			System.out.print("Dime, ¿que bici quieres usar?: ");
			idBici = Menu.leerNumero();
			
		}
		return idBici;
	}
	
	public static Propietario PedirDatosPropietario() {
		System.out.println("==== Dime los datos del propietario ====");
		System.out.print("Dime el nombre: ");
		String nombre = Menu.leerStringUsuario();
		System.out.print("Dime el DNI: ");
		String DNI = Menu.leerStringUsuario();
		while (Propietario.validarDni(DNI) == false) {
			System.out.print("\nEl DNI no es valido, dime un DNI valido: ");
			DNI = Menu.leerStringUsuario();
		}
		System.out.print("Dime el Nº de telefono personal:");
		String telefono = Menu.leerStringUsuario();
		while (Propietario.validarTelefono(telefono) == false) {
			System.out.print("\nEl Télefono no es valido, dime un Télefono valido: ");
			telefono = Menu.leerStringUsuario();
		}
		int telefonoNumerico = Integer.parseInt(telefono);
		Propietario datosPropietario = new Propietario(nombre, telefonoNumerico, DNI);
		return datosPropietario;

	}
	
	public static int pedirRecorrido() {
		System.out.print("Dime, ¿Cuantos KM quieres realizar con la Bici?: ");
		int km= Menu.leerNumero();
		
		while (km<1) {
			System.out.print("ERROR: Los KM indicados no son validos.");
			System.out.print("Dime, ¿Cuantos KM quieres realizar con la Bici?");
			km= Menu.leerNumero();
		}
		
		return km;
		
	} 

	public static int pedirCargaBateria() {
		System.out.print("Dime, ¿Cuanta cantidad de carga de bateria quieres realizar a la Bici?: ");
		int cargaBateria= Menu.leerNumero();
		
		while (cargaBateria<1) {
			System.out.print("ERROR: La carga de bateria no es valida....");
			System.out.print("Dime, ¿Cuanta cantidad de carga de bateria quieres realizar a la Bici?: ");
			cargaBateria = Menu.leerNumero();
		}
		
		return cargaBateria;
		
	}
	
	public static void Pausa() {
		System.out.println("Pulsa una tecla para continuar la ejecucion.....");
		Menu.leerStringUsuario();
		return;
	}
}
