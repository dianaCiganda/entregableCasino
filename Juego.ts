import{Casino} from "./Casino.js";
export abstract class Juego {
    protected nombre_juego: string;
    private apuestaMax: number = 1000;
    private apuestaMin: number = 100;
    private saldo:number;

    constructor(pNombre_juego: string, pSaldo: number) {
        this.nombre_juego = pNombre_juego;
        this.saldo = pSaldo;
       
    }
    getNombreJuego(): string {
        return this.nombre_juego;
    }
    abstract cobrar(): number;

    abstract pagar(): number;

    abstract resultadoDelJuego(): string;
    public mostrarReglasGenerales(): string{
        return""
    }

    abstract cargarSaldo(): void;
    abstract ComenzarJuego(): void  
   
}







