
public class Main {

	public static void main(String[] args) {
		BicicletaElectrica Bici1 = new BicicletaElectrica();
		BicicletaElectrica Bici2 = new BicicletaElectrica("KTM", "Macina Cross LFC 2024", 110);
		Propietario PropietarioBici = new Propietario("Kamal Majaiti", 612345678, "81180395D");
		Bici1.asignarPropietario(PropietarioBici);
		System.out.println("Numero de bicicletas creadas: " + BicicletaElectrica.getTotalBicicletas());

		int opcionMenu = Menu.pintarMenuPrincipal();
		int idBici;
		while (opcionMenu != 6) {
			
			switch (opcionMenu) {
			// Asignar propieario.
			case 1:
				idBici = Menu.escogerBici();
				while (true) {
					switch (idBici) {
					case 1:
						if (Bici1.comprobarDisponibilidad()) {
							Bici1.asignarPropietario(Menu.PedirDatosPropietario());
						} else {
							System.out.println(
									"Error: La bici Nº 1 ya tiene propietario, debes retirarlo antes de asignar un nuevo propietario.");
						}
						Menu.Pausa();
						break;

					case 2:
						if (Bici2.comprobarDisponibilidad()) {
							Bici2.asignarPropietario(Menu.PedirDatosPropietario());
						} else {
							System.out.println(
									"Error: La bici Nº 2 ya tiene propietario, debes retirarlo antes de asignar un nuevo propietario.");
							
						}
						Menu.Pausa();
						break;
					default:
						break;
					}
					break;
				}
				break;
			// Retirar propietario.
			case 2:
				
				idBici = Menu.escogerBici();
				while (true) {
					switch (idBici) {
					case 1:
						Bici1.retirarPropietario();
						Menu.Pausa();
						break;

					case 2:
						Bici2.retirarPropietario();
						Menu.Pausa();
						break;
					default:
						idBici = Menu.escogerBici();
						break;
					}
					break;
				}

				break;
			// Realizar recorrido.
			case 3:
				idBici = Menu.escogerBici();
				int kmRecorridos=Menu.pedirRecorrido();
				while (true) {
					switch (idBici) {
					case 1:
						Bici1.realizarRecorrido(kmRecorridos);
						Bici1.comprobarBateria();
						Menu.Pausa();
						break;

					case 2:
						Bici2.realizarRecorrido(kmRecorridos);
						Bici2.comprobarBateria();
						Menu.Pausa();
						break;
					default:
						idBici = Menu.escogerBici();
						break;
					}
					break;
				}

				break;

			// Realizar carga de bateria.
			case 4:
				idBici = Menu.escogerBici();
				int cargaBateria=Menu.pedirCargaBateria();
				Menu.Pausa();
				while (true) {
					switch (idBici) {
					case 1:
						Bici1.cargarBateria(cargaBateria);
						Menu.Pausa();
						break;

					case 2:
						Bici2.cargarBateria(cargaBateria);
						Menu.Pausa();
						break;
					default:
						idBici = Menu.escogerBici();
						break;
					}
					break;
				}

				break;
			// Mostrar informacion de la BICI.
			case 5:
				System.out.println("Nº de bicicletas creadas: "+BicicletaElectrica.getTotalBicicletas());
				System.out.println(Bici1.toString());
				System.out.println(Bici2.toString());
				Menu.Pausa();
				break;

			case 6:
				System.out.println("Saliendo... hasta la proxima.");
				return;
				
			default: 
				System.out.println("Opcion no valida....");
				break;
			}
			opcionMenu = Menu.pintarMenuPrincipal();

		}
	}

}
