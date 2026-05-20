// Importar la clase principal del controlador desde su módulo
import { ControladorBlackjack } from './ControladorBlackjack.js';

// Esperar a que el DOM esté completamente cargado antes de iniciar el juego
document.addEventListener('DOMContentLoaded', function () {
    // Instanciar el controlador para iniciar la aplicación
    const blackjackGame = new ControladorBlackjack();
    // La instancia se crea y los listeners internos del controlador se activan.
    // No es necesario asignarla a window a menos que sea para depuración explícita.
    console.log("Instancia del juego Blackjack creada y lista.");
});