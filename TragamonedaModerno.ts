import{ Juego } from './Juego';
import { ITragamonedas } from "./ITragamonedas.js";
import { Usuario } from './Usuario';
export class TragamonedaModerno extends Juego implements ITragamonedas {
    private cantidadFilas: number=4;
    private cantidadColumnas: number=4;
    private tipoDeJuego: string = "Moderno";
    constructor(pCantidadFilas: number, pCantidadColumnas: number, pNombre_juego: string,  pTipoDeJuego: string, pSaldo: number, pApuestaMaxima: number, pApuestaMinima: number) {
    
        super(pNombre_juego);
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
    cargarSaldo(): void {
        throw new Error('Method not implemented.');
    }
    public subirApuesta(apuesta: number): void {
        throw new Error('Method not implemented.');
    }
   public bajarApuesta(apuesta: number): void {
        throw new Error('Method not implemented.');
    }
   girar(user: Usuario): void {
       
   }
   
    getNombreJuego(): string {
        return this.nombre_juego;
    }

    }

