package bicicletas;

public class BicicletaElectrica {

    private static int contadorTotal = 0;

    private int id;
    private String marca;
    private String modelo;
    private double autonomiaMaxima;
    private double bateria;
    private double kmRecorridos;
    private Propietario propietario;

    public BicicletaElectrica() {
        this.id = contadorTotal++;
        this.marca = "Genérica";
        this.modelo = "Estándar";
        this.autonomiaMaxima = 50;
        this.bateria = 100;
        this.kmRecorridos = 0;
        this.propietario = null;
    }

    public BicicletaElectrica(String marca, String modelo, double autonomiaMaxima) {
        this.id = contadorTotal++;
        this.marca = marca;
        this.modelo = modelo;
        this.autonomiaMaxima = autonomiaMaxima;
        this.bateria = 100;
        this.kmRecorridos = 0;
        this.propietario = null;
    }

    public void realizarRecorrido(double km) {
        double consumo = (km / autonomiaMaxima) * 100;
        if (this.bateria >= consumo) {
            this.bateria -= consumo;
            this.kmRecorridos += km;
            System.out.println("Recorrido realizado con éxito.");
        } else {
            System.out.println("Error: Batería insuficiente.");
        }
    }

    public void cargarBateria(double porcentaje) {
        this.bateria += porcentaje;
        if (this.bateria > 100) {
            this.bateria = 100;
        }
        System.out.println("Batería recargada al " + this.bateria + "%");
    }

    public void asignarPropietario(Propietario p) {
        if (!this.tienePropietario()) {
            this.propietario = p;
            System.out.println("Nuevo propietario asignado correctamente a: \n" + this.toString());
        } else {
            System.out.println("Error: La bicicleta ya tiene propietario.");
        }
    }

    public boolean tienePropietario() {
    	return (this.propietario != null);
    }
    
    public void retirarPropietario() {
        if (propietario != null) {
            propietario = null;
            System.out.println("Propietario retirado!");
        } else {
            System.out.println("No hay propietario asignado para retirar.");
        }
    }

    public String comprobarBateria() {
        if (bateria > 50) return "Batería suficiente";
        if (bateria >= 20) return "Batería moderada";
        return "Batería baja";
    }

    public static int getTotalBicicletas() {
        return contadorTotal;
    }

    @Override
    public String toString() {
    	String respuesta = "";
    	
    	respuesta += "Bicicleta ID: " + this.id + " | Marca: " + this.marca;
    	respuesta += "\nModelo: " + this.modelo + " | Autonomía: " + this.autonomiaMaxima;
    	respuesta += "\nBatería: " + this.bateria + "% | Km Recorridos: " + this.kmRecorridos + "km";
    	respuesta += "\nPropietario: " + ((this.propietario == null) ? "Sin propietario":this.propietario.toString()) + "\n";
    	
        return respuesta;
    }
}