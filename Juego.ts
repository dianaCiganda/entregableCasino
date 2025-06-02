import{Casino} from "./Casino.js";
export abstract class Juego {
    protected nombre_juego: string;
    private apuestaMax: number = 1000;
    private apuestaMin: number = 100;
  

    constructor(pNombre_juego: string, apuestaMax?: number, apuestaMin?: number) {
        this.nombre_juego = pNombre_juego;
        if (apuestaMax) {
            this.apuestaMax = apuestaMax;
        }
        if (apuestaMin) {
            this.apuestaMin = apuestaMin;
        }
       
    }
    getNombreJuego(): string {
        return this.nombre_juego;
    }
    abstract cobrar(saldo:number): number;

    abstract pagar(saldo:number): number;

    abstract resultadoDelJuego(saldo:number): void;
    public mostrarReglasGenerales(): string{
        return""
    }
    
    abstract comenzarJuego(saldo:number): void  

   
}







