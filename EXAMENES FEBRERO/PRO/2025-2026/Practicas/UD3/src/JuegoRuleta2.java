import java.util.Scanner;

public class JuegoRuleta2 { // Se ha cambiado el nombre de la clase a JuegoRuleta2 para distinguirla

    private int saldo = 0;
    private Scanner sc = new Scanner(System.in); // Consideración: Para System.in, cerrar Scanner puede ser problemático si otras partes del código lo necesitan. Si es un Scanner global para la aplicación, a menudo se deja abierto.

    // --- Nuevas Constantes para mejorar la legibilidad y mantenimiento ---
    private static final int NUM_ROULETTE_VALUES = 37; // Números de la ruleta (0-36, total 37 valores)
    private static final int SINGLE_NUMBER_PAYOUT_MULTIPLIER = 36; // Multiplicador de pago para acertar un número exacto
    private static final int PAR_IMPAR_PAYOUT_MULTIPLIER = 2; // Multiplicador de pago para par/impar (apuesta x2)
    private static final int MIN_BET_AMOUNT = 1; // Cantidad mínima para apostar o recargar

    public JuegoRuleta2() {
        // Se ha eliminado la inicialización redundante de 'this.saldo = 0;' ya que está inicializado en la declaración del campo.
    }

    public void iniciarJuego() {
        System.out.println("=== Bienvenido al Juego de la Ruleta ===");
        this.recargarSaldo();
        boolean playing = true; // Se utiliza una bandera booleana para controlar el bucle, mejor que 'while(true)' con 'break'.
        while (playing) {
            this.menuRuleta();
            playing = this.seguirJugando(); // Se actualiza la bandera para decidir si se continúa jugando.
        }
        System.out.println(this.toString()); // El saldo final se imprime una vez que el juego ha terminado.
    }

    private void recargarSaldo() {
        int recarga = 0;
        while (true) {
            try {
                System.out.print("Introduce el saldo inicial o la cantidad a recargar:");
                recarga = Integer.parseInt(this.sc.nextLine());
                if (recarga < MIN_BET_AMOUNT) { // Se usa la constante MIN_BET_AMOUNT
                    System.out.println("La cantidad de recarga no es válida. Por favor, introduce un número positivo válido."); // Mensaje mejorado
                    continue;
                } else {
                    this.saldo = this.saldo + recarga;
                    System.out.println("Tu saldo actual es de: " + this.saldo + "€.");
                    return; // Se ha eliminado el 'continue' redundante.
                }
            } catch (NumberFormatException e) { // Se especifica la excepción NumberFormatException
                System.out.println("La cantidad a recargar no es un número válido.");
                continue;
            }
        }
    }

    private int tirarRuleta() {
        // Genera un número entre 0 y 36
        int numeroRuleta = (int) (Math.random() * NUM_ROULETTE_VALUES); // Se usa la constante NUM_ROULETTE_VALUES
        System.out.printf("El número que ha salido en la ruleta es: %d\n", numeroRuleta);
        return numeroRuleta;
    }

    @Override
    public String toString() {
        return "El juego ha terminado, tu saldo final es de: " + saldo;
    }

    private boolean esPar(int numeroEvaluar) {
        return (numeroEvaluar % 2 == 0);
    }

    /**
     * Método auxiliar para obtener una entrada entera válida del usuario.
     * Reduce la duplicación de código para la validación de entrada numérica.
     * @param prompt Mensaje que se muestra al usuario.
     * @param errorMessage Mensaje de error si la entrada es inválida.
     * @param min Valor mínimo aceptado (inclusive).
     * @param max Valor máximo aceptado (inclusive). Usa -1 si no hay límite superior.
     * @return El valor entero válido ingresado por el usuario.
     */
    private int getIntegerInput(String prompt, String errorMessage, int min, int max) {
        int value = 0;
        while (true) {
            try {
                System.out.print(prompt);
                value = Integer.parseInt(sc.nextLine());
                if (value < min || (max != -1 && value > max)) { // -1 indica que no hay límite superior
                    System.out.println(errorMessage);
                    continue;
                }
                return value;
            } catch (NumberFormatException e) {
                System.out.println(errorMessage);
            }
        }
    }

    private void menuRuleta() {
        int opcionMenu = 0;
        while (opcionMenu == 0) {
            opcionMenu = getIntegerInput( // Se usa el método auxiliar para la entrada
                "Tipo de apuesta:\n1. Acertar Número Exacto (1-36).\n2. Acertar Número Par/Impar.\nElige una opción (1 o 2):",
                "Por favor, elige una opción válida (1 o 2).",
                1, 2 // Las opciones válidas son 1 o 2
            );

            switch (opcionMenu) {
                case 1:
                    this.apostarActertarNumero();
                    break;
                case 2:
                    this.apostarParImpar();
                    break;
                default: // En teoría, con getIntegerInput bien configurado, no debería llegar aquí, pero se mantiene por seguridad.
                    System.out.println("La opción que has escogido no es válida.");
                    opcionMenu = 0; // Se resetea para volver a pedir la opción.
                    break;
            }
        }
    }

    private int obtenerCantidadApostar() {
        int cantidadApostada = 0;
        while (true) { // Se ha cambiado 'do-while(true)' a 'while(true)' para mayor claridad después de la corrección lógica.
            cantidadApostada = getIntegerInput( // Se usa el método auxiliar para la entrada
                "Vamos a hablar de lo importante: del dinero, ¿Cuánto dinero quieres apostar esta ronda?:",
                "La cantidad que estás intentando apostar no es numérica o no es válida. Por favor, introduce una cantidad correcta.",
                MIN_BET_AMOUNT, -1 // Se usa la constante MIN_BET_AMOUNT, y -1 indica que no hay límite superior inicial
            );

            if (cantidadApostada > this.saldo) {
                System.out.println("Amigo, no tienes suficiente dinero para esa apuesta...entiendo que quieres recargar saldo.");
                this.recargarSaldo(); // Se mantiene la llamada para recargar saldo.
                continue; // Se continúa el bucle para volver a pedir la apuesta después de la recarga.
            }
            return cantidadApostada; // Se devuelve la cantidad solo cuando es válida y el saldo es suficiente.
        }
    }

    private void apostarParImpar() {
        System.out.println("Has escogido apostar par/impar, juguemos, buena suerte =)");
        int cantidadApostada = obtenerCantidadApostar();
        String seleccionUsuario = "";
        while (true) {
            System.out.print("¿Apuestas a PAR o IMPAR?: ");
            seleccionUsuario = sc.nextLine().toLowerCase().trim();
            if (seleccionUsuario.equals("par") || seleccionUsuario.equals("impar")) {
                break;
            } else {
                System.out.println("La opción que has elegido es incorrecta. Por favor, seamos serios...elige PAR o IMPAR.");
            }
        }
        int numeroRuleta = this.tirarRuleta();

        // Condición simplificada y pago dinámico
        if ((esPar(numeroRuleta) && seleccionUsuario.equals("par")) || (!esPar(numeroRuleta) && seleccionUsuario.equals("impar"))) { // Se ha simplificado '!esPar'
            hasGanado(cantidadApostada, PAR_IMPAR_PAYOUT_MULTIPLIER); // Se pasa el multiplicador de pago específico
        } else {
            hasPerdido(cantidadApostada);
        }
        // Se han eliminado los 'return;' redundantes.
    }

    private void hasPerdido(int cantidadApostada) {
        this.saldo = this.saldo - cantidadApostada;
        System.out.printf("Lo siento no has acertado has perdido %d€\n", cantidadApostada);
        System.out.printf("Tu saldo actual es de: %d€\n", this.saldo);
        // Se ha eliminado el 'return;' redundante.
    }

    /**
     * Método para manejar la ganancia, ahora acepta un multiplicador de pago.
     * @param cantidadApostada Cantidad que se apostó.
     * @param payoutMultiplier Multiplicador para calcular el premio.
     */
    private void hasGanado(int cantidadApostada, int payoutMultiplier) {
        int premio = cantidadApostada * payoutMultiplier; // Cálculo de premio dinámico
        this.saldo = saldo + premio;
        System.out.printf(
            "Felicidades, has acertado, has ganado un premio de %d €. \nTu saldo actual es de: %d €\n",
            premio,
            this.saldo
        );
        // Se ha eliminado el 'return;' redundante.
    }

    private void apostarActertarNumero() {
        System.out.println("Has sido valiente, has escogido la opción de adivinar el número de la ruleta, juguemos (que la suerte te acompañe).");
        int cantidadApostada = obtenerCantidadApostar();
        int seleccionUsuario = getIntegerInput( // Se usa el método auxiliar para la entrada
            "Dime.., ¿Cuál crees que es el número que va a salir esta vez?:",
            "El número con el que estás intentando apostar no es válido. Por favor, introduce un número válido entre 0 y 36.",
            0, NUM_ROULETTE_VALUES - 1 // Rango válido de 0 a 36
        );

        int numeroRuleta = this.tirarRuleta();
        if (numeroRuleta == seleccionUsuario) {
            hasGanado(cantidadApostada, SINGLE_NUMBER_PAYOUT_MULTIPLIER); // Se pasa el multiplicador de pago específico
        } else {
            hasPerdido(cantidadApostada);
        }
        // Se han eliminado los 'return;' redundantes.
    }

    private boolean seguirJugando() {
        while (true) {
            System.out.print("¿Quieres seguir jugando? (s/n): ");
            String respuestaUsuario = sc.nextLine();
            switch (respuestaUsuario.toLowerCase().trim()) {
                case "s":
                    return true;
                case "n":
                    return false;
                default:
                    System.out.println("Opción no válida, indica si o no (s/n)");
                    continue;
            }
        }
    }
}
