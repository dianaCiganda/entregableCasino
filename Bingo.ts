import { Juego } from "./Juego";

export class Bingo extends Juego{
    private cantidadCartones: number;
    private precioPorCarton: number = 5; // Precio por carton de bingo
    private pozoAcumulado: number = 0; // Pozo acumulado del bingo
        constructor(pCantidadCartones: number, pNombre_juego: string,pSaldo: number, pPrecioPorCarton: number, pPozoAcumulado: number) {
            super(pNombre_juego, pSaldo);
            this.cantidadCartones= pCantidadCartones;
            this.precioPorCarton=pPrecioPorCarton
            this.pozoAcumulado=pPozoAcumulado;
    
    }
    public mostrarReglas():void {
        console.log( "Reglas del Bingo: Cada jugador compra cartones y marca los números a medida que se cantan. El primero en completar una línea o el cartón completo gana.");
    }
    cobrar(): number {
        throw new Error("Method not implemented.");
    }
    pagar(): number {
        throw new Error("Method not implemented.");
    }
    resultadoDelJuego(): string {
        throw new Error("Method not implemented.");
    }
    cargarSaldo(): void {
        throw new Error("Method not implemented.");
    }
    comenzarJuego(): void {
        throw new Error("Method not implemented.");
    }
}