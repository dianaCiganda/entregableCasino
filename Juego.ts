import{Casino} from "./Casino.js";
export abstract class Juego {
    protected nombre_juego: string;
    private apuestaMax: number = 1000;
    private apuestaMin: number = 100;
     protected saldo: number = 0;
  

    constructor(pNombre_juego: string, pSaldo:number=0, apuestaMax?: number, apuestaMin?: number) {
        this.nombre_juego = pNombre_juego;
        this.saldo=pSaldo;
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
    public actualizarSaldo(monto: number): number {
        this.saldo += monto;
        return this.saldo;
    }
    getSaldo(): number {
        return this.saldo;
    }
    abstract comenzarJuego(saldo:number): void  

   
}







