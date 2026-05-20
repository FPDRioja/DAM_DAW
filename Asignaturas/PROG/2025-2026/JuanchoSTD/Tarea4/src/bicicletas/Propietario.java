package bicicletas;

public class Propietario {

    private String nombre;
    private String dni;
    private String telefono;

    public Propietario() {
        this.nombre = "Desconocido";
        this.dni = "00000000A";
        this.telefono = "000000000";
    }

    public Propietario(String nombre, String dni, String telefono) {
        this.nombre = nombre;
        this.dni = dni;
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Nombre: " + nombre + ", DNI: " + dni + ", Tel: " + telefono;
    }

    public static boolean validarDni(String dni) {
        return dni.matches("\\d{8}[A-Za-z]");
    }
}