import { Usuario } from "./Usuario";
//Es una clase abstracta porque tiene metodos implementados, sin implementar y atributos
export abstract class Juego {
    protected nombre_juego: string;

    constructor(pNombre_juego: string) {
        this.nombre_juego = pNombre_juego;
    }
    abstract cobrar(saldo: number): number;
    
    abstract pagar(saldo: number): number;
    //estos métodos abstractos los van a tener que implementar sio sí las clases hijas
    
    public comenzarJuego(user:Usuario): void {
        console.log("comenzando juego");
        
    }
    public getNombreJuego(): string {
        return this.nombre_juego;
    }
    //estos metodos publicos van a ser aplicados por las clases hijas por medio de polimorfismo
}







