package ejercicio03;
import java.util.Scanner;
public class Principal {

	public static void main(String[] args) {

		
		// Creamos el objeto persona del propietario Nº 1 y su dispositivo.
		Persona propietario1=new Persona("Kamal Majaiti", "kmajaiti@fpdrioja.es", 630761423);
		
		// Datos del dispostivio. Nombre, tipo, Obj de la persona propietaria, consumo por hora y tiempo usado.
		Dispositivo telefonoProp1 = new Dispositivo("Google Pixel 9", "Smartphone", propietario1, 50 , 6, 0);
		
		
		// Configuramos un Scanner de teclado, para poder pedir datos al usuario.
		Scanner lectorTeclado=new Scanner(System.in);
		
		// Pedimos los datos de la persona dueña del segundo dispositivo.
		System.out.println("Introduce los datos del segundo titular:");
		System.out.print("Nombre: ");
		String NombrePropietario2=lectorTeclado.nextLine();
		System.out.print("Correo: ");
		String CorreoPropietario2=lectorTeclado.nextLine();
		System.out.print("Telefono: ");
		int TelefonoPripietario2=lectorTeclado.nextInt();
		
		// Creamos el objeto persona del segundo titular.
		Persona SegundoTitular = new Persona ( NombrePropietario2,  CorreoPropietario2,  TelefonoPripietario2);	
		
		
		// Pedimos datos del dispositivo del segundo titular.
		System.out.println("Introduce los datos del dispositivo: ");

		// Pedimos el modelo de dispositivo.
		System.out.print("Modelo: ");
		String ModeloDispositivoSegundoTitular=lectorTeclado.next();
		
		// Pedimos el tipo de dispositivo.
		System.out.print("Tipo (portátil, tablet, etc.): ");
		String TipoDispoisitivoSegundoTitular=lectorTeclado.next();
		
		// Pedimos el nivel de bateria actual del dispositivo.
		System.out.print("Nivel inicial de batería: ");
		double NivelBateriaSegundoDispositivo=lectorTeclado.nextDouble();
		
		// Pedimos el consumo por hora del dispositivo y eliminar el salto que queda pendiente.
		System.out.print("Consumo por hora (%): ");
		// Quitamos un salto de linea para que no de error.
		lectorTeclado.nextLine();
		double ConsumoPorHoraSegundoDispositivo=lectorTeclado.nextDouble();
		
		// Creamos el objeto del segundo dispositivo e incluimos las horas de uso, asi que no hace falta usar el metodo usardispositivo.
		
		Dispositivo telefonoProp2= new Dispositivo(ModeloDispositivoSegundoTitular, TipoDispoisitivoSegundoTitular, SegundoTitular, 
				NivelBateriaSegundoDispositivo, ConsumoPorHoraSegundoDispositivo, 0);
		
		
		// Pedir las horas de uso por dispositivo.
		System.out.print("Horas de uso para cada dispositivo: ");
		lectorTeclado.nextLine();
		double horasDeUsoDispositivo=lectorTeclado.nextDouble();
		
		
		// Usamos los dispositivos Nº 1 y 2.
		telefonoProp1.usarDispositivo(horasDeUsoDispositivo);
		telefonoProp2.usarDispositivo(horasDeUsoDispositivo);
		
		
		// Pedimos el porcentaje de carga para cada dispositivo.
		System.out.print("Porcentaje de carga para cada dispositivo: ");
		lectorTeclado.nextLine();
		double porcentajeCargaDispositivo=lectorTeclado.nextDouble();	

		// Terminamos de usar el lector de teclado, lo eliminamos para liberar memoria .
		lectorTeclado.close();
	
		// Cargamos los dispositivos.
		telefonoProp1.cargarDispositivo(porcentajeCargaDispositivo);
		telefonoProp2.cargarDispositivo(porcentajeCargaDispositivo);
		
		// Pintamos en pantalla la informacion de los dispositivos,su estado y el objeto propietario que es la persona dueña.
		telefonoProp1.mostrarInformacion();
		telefonoProp2.mostrarInformacion();

	}
	
}
