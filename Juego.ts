import { Usuario } from "./Usuario";

export abstract class Juego {
    protected nombre_juego: string;

    constructor(pNombre_juego: string) {
        this.nombre_juego = pNombre_juego;
    }
    public getNombreJuego(): string {
        return this.nombre_juego;
    }
    abstract cobrar(saldo: number): number;

    abstract pagar(saldo: number): number;

    public comenzarJuego(user:Usuario): void {
        console.log("comenzando juego");

    }
}







