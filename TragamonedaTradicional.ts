import{ Juego } from './Juego';
import { ITragamonedas } from "./ITragamonedas.js";
export class TragamonedaTradicional extends Juego implements ITragamonedas {
    private cantidadFilas: number=3;
    private cantidadColumnas: number=3;
    private tipoDeJuego: string = "Tradicional";
    constructor(pCantidadFilas: number, pCantidadColumnas: number, pNombre_juego: string,  pTipoDeJuego: string, pSaldo: number, pApuestaMaxima: number, pApuestaMinima: number) {
    
        super(pNombre_juego, pSaldo);
        this.cantidadFilas = pCantidadFilas;
        this.cantidadColumnas = pCantidadColumnas;
        this.tipoDeJuego = pTipoDeJuego;
    
    }
    cobrar(): number {
        throw new Error('Method not implemented.');
    }
    pagar(): number {
        throw new Error('Method not implemented.');
    }
    resultadoDelJuego(): string {
        throw new Error('Method not implemented.');
    }
    cargarSaldo(): void {
        throw new Error('Method not implemented.');
    }
    ComenzarJuego(): void {
        throw new Error('Method not implemented.');
    }
    public girar(): void {
        throw new Error('Method not implemented.');
    }
    public subirApuesta(apuesta: number): void {
        throw new Error('Method not implemented.');
    }
   public bajarApuesta(apuesta: number): void {
        throw new Error('Method not implemented.');
    }
   
   
    getNombreJuego(): string {
        return this.nombre_juego;
    }

    }

