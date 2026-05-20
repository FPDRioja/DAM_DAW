package desglose;

/*
 * dada una cantidad de dinero, muestre le desglose de billetes y monedas.
 */

public class Desglose {

	private static final int[] billetes = { 500, 200, 100, 50, 20, 10, 5, 2, 1 };

	public static int cantidad = 1342;

	public static void main(String[] args) {
		System.out.printf("La cantidad %d se divide en: %n", cantidad);
		for (int billete : billetes) {
			if (cantidad > 0) {
				System.out.printf("%d %s de %d %n", cantidad / billete, (billete > 2) ? "billetes" : "monedas",
						billete);
				cantidad %= billete;
			}
		}
		System.out.println("Fin.");
	}
}
