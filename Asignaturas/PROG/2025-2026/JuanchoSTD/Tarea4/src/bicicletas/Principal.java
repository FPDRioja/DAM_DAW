package bicicletas;

import java.util.Scanner;

public class Principal {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        BicicletaElectrica b1 = new BicicletaElectrica();
        BicicletaElectrica b2 = new BicicletaElectrica("Orbea", "Optima", 70);

        b1.asignarPropietario(new Propietario("Ana", "12345678A", "600111222"));

        System.out.println("Total de bicicletas creadas: " + BicicletaElectrica.getTotalBicicletas());

        int opcion = 0;

        while (opcion != 6) {
            System.out.println("\n--- MENÚ BICICLETAS ---");
            System.out.println("1. Asignar propietario");
            System.out.println("2. Retirar propietario");
            System.out.println("3. Realizar recorrido");
            System.out.println("4. Cargar batería");
            System.out.println("5. Mostrar información");
            System.out.println("6. Salir");
            System.out.print("Seleccione una opción: ");
            opcion = sc.nextInt();

            BicicletaElectrica biciSeleccionada = null;
            if (opcion >= 1 && opcion <= 4) {
                int numBici = 0;
                
                while (true) {
                    System.out.print("¿Sobre qué bicicleta desea actuar (1 o 2)? ");
                    if (sc.hasNextInt()) {
                        numBici = sc.nextInt();
                        if (numBici == 1 || numBici == 2) {
                            break; 
                        }
                    } else {
                        sc.next(); 
                    }
                    System.out.println("Debes introducir un número válido (1 o 2).");
                }

                biciSeleccionada = (numBici == 1) ? b1 : b2;
            }

            switch (opcion) {
                case 1:
                	if (!biciSeleccionada.tienePropietario()) {
                		sc.nextLine(); 
                        System.out.print("Nombre: ");
                        String nom = sc.nextLine();
                        
                        String dni;
                        do {
                            System.out.print("DNI (8 números + Letra): ");
                            dni = sc.nextLine();
                            if (!Propietario.validarDni(dni)) {
                                System.out.println("Formato de DNI inválido.");
                            }
                        } while (!Propietario.validarDni(dni));

                        System.out.print("Teléfono: ");
                        String tel = sc.nextLine();
                        biciSeleccionada.asignarPropietario(new Propietario(nom, dni, tel));
                	}else {
                		System.out.println("Esta bici aún tiene propietario, retíralo primero.");
                	} 
                    break;

                case 2:
                    biciSeleccionada.retirarPropietario();
                    break;

                case 3:
                    System.out.print("Kilómetros a recorrer: ");
                    double km = sc.nextDouble();
                    biciSeleccionada.realizarRecorrido(km);
                    break;

                case 4:
                    System.out.print("Porcentaje a cargar: ");
                    double carga = sc.nextDouble();
                    biciSeleccionada.cargarBateria(carga);
                    break;

                case 5:
                    System.out.println("\n--- ESTADO BICICLETA 1 ---");
                    System.out.println(b1.toString());
                    System.out.println("Estado batería: " + b1.comprobarBateria());
                    
                    System.out.println("\n--- ESTADO BICICLETA 2 ---");
                    System.out.println(b2.toString());
                    System.out.println("Estado batería: " + b2.comprobarBateria());
                    
                    System.out.println("\nTotal bicicletas: " + BicicletaElectrica.getTotalBicicletas());
                    break;

                case 6:
                    System.out.println("Saliendo del programa...");
                    break;

                default:
                    System.out.println("Opción no válida.");
            }
        }
        sc.close();
    }
}