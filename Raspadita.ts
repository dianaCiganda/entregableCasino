import { Juego } from "./Juego";
export class Raspadita extends Juego {
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
    ComenzarJuego(): void {
        throw new Error("Method not implemented.");
    }
    private nroSerie:number;
    private costoPorboleto:number;
    private estaRaspado:boolean;
    private simbolos=["*","**","***","****"]
    private areasAraspar={
        id:0,
        estaRaspado:false
    }
    constructor(pNroSerie: number, pCostoPorboleto: number, pEstaRaspado: boolean, pNombre_juego: string, pSaldo: number) {
        super(pNombre_juego, pSaldo);
        this.nroSerie = pNroSerie;
        this.costoPorboleto = pCostoPorboleto;
        this.estaRaspado = pEstaRaspado;
        this.simbolos
    }

public mostrarCartonesDisponibles():void {


 }
 public mostarCartonRaspado():void {
 }
}









