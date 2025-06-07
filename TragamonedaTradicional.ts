import { Juego } from './Juego';
import { ITragamonedas } from "./ITragamonedas.js";
import * as rs from 'readline-sync';
import { Usuario } from './Usuario';
export class TragamonedaTradicional extends Juego implements ITragamonedas {

    private emojiSuerte: string[] = [];
    private tipoDeJuego: string = "Tradicional";
    private valorDelTiro: number =800;
    private apuestaMinima:number=400;
    private apuestaMaxima:number=2000;
    constructor(pNombre_juego: string, pApuestaMaxima?: number, pApuestaMinima?: number, pValorDelTiro?:number,pTipoDeJuego?:string) {

        super(pNombre_juego)
        this.tipoDeJuego = pTipoDeJuego || this.tipoDeJuego;
        this.emojiSuerte = ["🍀", "🐞", "🧿", "🧧", "🔮", "🐘"];
        this.valorDelTiro = pValorDelTiro || this.valorDelTiro;
        this.apuestaMaxima=pApuestaMaxima || this.apuestaMaxima;
        this.apuestaMinima=pApuestaMinima || this.apuestaMinima;
        

    }
    subirApuesta(): number {
        let subir: number = this.valorDelTiro + this.apuestaMinima;
        return subir
    }
    bajarApuesta(): number {
        let bajar: number = this.valorDelTiro - this.apuestaMinima;
        return bajar
    }

    cobrar(): number {
        let descontar: number = this.valorDelTiro
        return descontar;
    }
    pagar(): number {
        let pago: number = this.valorDelTiro * 4 + this.valorDelTiro;
        return pago
    }
    girar(user: any): void {
        if (user.getSaldo() >=this.valorDelTiro) {
            console.log(`El valor del tiro de la tragamoneda es $${this.valorDelTiro}`);

            const descuento = this.cobrar();
            user.actualizarSaldo(-descuento); 

            this.mostrarTragamoneda(user);
        }

        return user.getSaldo();
    }

    modificarApuesta(user:Usuario): void {
        let modificarApuesta: string = ""
        while (modificarApuesta != "S" && modificarApuesta != "B" && modificarApuesta!="C") {
            modificarApuesta = rs.question("Ingrese: \n(S) Para subir apuesta\n(B) Para bajar apuesta\n(C) Para cargar saldo\n(J) Para jugar: ").toUpperCase()
            if (modificarApuesta == "S") {
                this.valorDelTiro = this.subirApuesta();
                if (this.valorDelTiro >this.apuestaMaxima) {
                        this.valorDelTiro=this.apuestaMaxima;
                        console.log("no se puede subir mas la apuesta ");
                    break
                }

            } else if (modificarApuesta == "B") {

                this.valorDelTiro = this.bajarApuesta();
                if (this.valorDelTiro < this.apuestaMinima) {
                        this.valorDelTiro=this.apuestaMinima;
                        console.log("no se puede reducir mas la apuesta");
                    break
               
                }

            }else if(modificarApuesta=="C") {
                
           let saldoAsumar= user.recargarSaldo();
           
            user.setSaldo(saldoAsumar+user.getSaldo())//saldo residual mas actual
            }
            else if(modificarApuesta=="J") {
                this.girar(user)
                break
            }
            console.log(`El valor del tiro de la tragamoneda  es $${this.valorDelTiro}`);

        }
    }
    mostrarTragamoneda(user: any):number {
        // Crear arreglo con 9 símbolos aleatorios
        const contenido: string[] = [];
        while (contenido.length < 9) {
            const indice = Math.floor(Math.random() * this.emojiSuerte.length);
            contenido.push(this.emojiSuerte[indice]);
        }

        // Mezclar aleatoriamente el contenido
        for (let i = contenido.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [contenido[i], contenido[j]] = [contenido[j], contenido[i]];
        }

        // Convertir a matriz 3x3
        const matriz: string[][] = [];
        for (let i = 0; i < 3; i++) {
            matriz.push(contenido.slice(i * 3, (i + 1) * 3));
        }

        // Mostrar la matriz con separadores
        console.log("------ TRAGAMONEDAS ------");
        for (let i = 0; i < 3; i++) {
            console.log(matriz[i].join(" | "));
            if (i < 2) {
                console.log("----|----|----");
            }
        }

        // Verificar si hay una fila ganadora
        let coincidencias: number = 0;
        for (let i = 0; i < 3; i++) {
            const fila = matriz[i];
            if (fila[0] === fila[1] && fila[1] === fila[2]) {
                const premio: number = this.pagar();
                user.actualizarSaldo(premio); // actualiza saldo al ganar

                coincidencias++;
            }
        }
        if (coincidencias == 1 || coincidencias == 2 || coincidencias == 3) {
            console.log("🎉 Usted ha ganado!!!!!");
            console.log("Saldo actualizado:", user.getSaldo());



        } else {

            console.log("😞 Usted ha perdido!!!!!");
            console.log("Saldo actualizado:", user.getSaldo());
        }
        // Si ninguna fila es ganadora, mostramos mensaje de pérdida y actualizamos saldo


        // this.modificarApuesta(user);
        return user.getSaldo();
    }

    getNombreJuego(): string {
        return this.nombre_juego;
    }
getValorTiro():number{
    return this.valorDelTiro
}
}

