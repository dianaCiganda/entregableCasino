export abstract class Juego {
    protected nombre_juego: string;
  
  

    constructor(pNombre_juego: string) {
        this.nombre_juego = pNombre_juego;
       
    }
    getNombreJuego(): string {
        return this.nombre_juego;
    }
    abstract cobrar(saldo:number): number;

    abstract pagar(saldo:number): number;

    abstract resultadoDelJuego(pvalor:string): void;
   
    
    abstract comenzarJuego(saldo:number): void  

   
}







