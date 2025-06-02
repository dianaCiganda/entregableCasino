import * as rs from 'readline-sync';
// import logSymbols from 'log-symbols';
// import emoji from 'node-emoji';
//instalar libreria para emoticones
//npm install log-symbols
//console.log(logSymbols.success, 'Operación exitosa');     //✅
//console.log(logSymbols.info, 'Información útil');         // ℹ
//console.log(logSymbols.warning, 'Advertencia');           // ⚠
//console.log(logSymbols.error, 'Error grave');             // ✖
//esta extension: Emoji Snippets
import { Juego } from "./Juego";
export class Casino {
    private nombre: string = "";
    private cajero: string = "";
    private juegos: Juego[];


    constructor(pNombre: string, pCajero: string, pJuegos: Juego[]) {
        this.nombre = pNombre;
        this.cajero = pCajero;
        this.juegos = pJuegos;
    }

    public mostrarMensaje(): void {

        console.log(`Bienvenido al Casino ${this.nombre} "🎰"\n su cajero es ${this.cajero} `);
        //hacer getters y setters de los atributos

    };
    public menuOpciones(): void {
        for (let i = 0; i < this.juegos.length; i++) {
            console.log(`${i + 1}. ${this.juegos[i].getNombreJuego()}`);
        }
    }

    public agregarJuego(juego: any): void {
        this.juegos.push(juego)//En el main vamos a llamar a este metodo y le vamos a pasar por parametro los juegos creados

    };

    public estaCerrado(pHoraActual: number): boolean {
        if (pHoraActual < 9 || pHoraActual > 24) {
            return true
        }
        else {
            return false
        }
    }
   

   
    getNombre(): string {
        return this.nombre;
    }
  
}



