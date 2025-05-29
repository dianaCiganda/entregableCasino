import { ITragamonedas } from "./ITragamonedas";
import { TragamonedaModerno } from "./TragamonedaModerno";
import { TragamonedaTradicional } from "./TragamonedaTradicional";

//imports
export  class TragamonedaFactory {
    public  crearJuego(tipoDeJuego: string, atributos: any): ITragamonedas {
        if (tipoDeJuego === "Moderno") {
            return new TragamonedaModerno(atributos.cantidadFilas, atributos.cantidadColumnas, atributos.nombre_juego, atributos.saldo, atributos.apuestaMaxima, atributos.apuestaMinima, atributos.tipoDeJuego);
        } else if (tipoDeJuego === "Tradicional") {
            return new TragamonedaTradicional(atributos.cantidadFilas, atributos.cantidadColumnas, atributos.nombre_juego, atributos.bajarApuesta,atributos.saldo, atributos.apuestaMinima,atributos.tipoDeJuego);
        } else {
            throw new Error("Tipo de tragamoneda no válido");

        }
    }

}