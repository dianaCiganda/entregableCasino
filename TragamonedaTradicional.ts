import { Juego } from './Juego';
import { ITragamonedas } from "./ITragamonedas.js";
import * as rs from 'readline-sync';
export class TragamonedaTradicional extends Juego implements ITragamonedas {

    private emojiSuerte: string[] = [];
    private tipoDeJuego: string = "Tradicional";
    private valorDelTiro: number = 800;
    constructor(pNombre_juego: string, pTipoDeJuego: string, pSaldo: number, pApuestaMaxima: number, pApuestaMinima: number, pValorDelTiro?: number) {

        super(pNombre_juego);
        this.tipoDeJuego = pTipoDeJuego;
        this.emojiSuerte = ["🍀", "🐞", "🧿", "🧧", "🔮", "🐘"];
        this.valorDelTiro = pValorDelTiro || this.valorDelTiro

    }
    subirApuesta(): number {
        let subir: number = this.valorDelTiro + 400;
        return subir
    }
    bajarApuesta(): number {
        let bajar: number = this.valorDelTiro - 400;
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

    // cargarSaldo(): void {
    //     throw new Error('Method not implemented.');
    // }
    girar(user: any): void {
        if (user.getSaldo() >= this.valorDelTiro) {
            console.log(`El valor del tiro de la tragamoneda es $${this.valorDelTiro}`);

            const descuento = this.cobrar();
            user.actualizarSaldo(-descuento); // ✅ Descontar antes de mostrar el juego

            this.mostrarTragamoneda(user);    // Mostrar y calcular premio
        }

        return user.getSaldo(); // Mostrar saldo final
    }

    modificarApuesta(user: any): void {
        let modificarApuesta: string = ""
        while (modificarApuesta != "S" && modificarApuesta != "B") {
            modificarApuesta = rs.question("Ingrese: \nS para subir apuesta\nB Para bajar apuesta\nCualquier tecla para continuar jugando...").toUpperCase()
            if (modificarApuesta == "S") {
                this.valorDelTiro = this.subirApuesta();
                if (this.valorDelTiro >= 1200) {
                    this.valorDelTiro = 1200;
                    console.log("no se puede subir mas la apuesta ");
                    break
                }

            } else if (modificarApuesta == "B") {

                this.valorDelTiro = this.bajarApuesta();
                if (this.valorDelTiro <= 400) {
                    this.valorDelTiro = 400;
                    console.log("no se puede reducir mas la apuesta");
                    break
                }

            } else {
                break
            }

            console.log(`El valor del tiro de la tragamoneda  es $${this.valorDelTiro}`);

        }
    }
    mostrarTragamoneda(user: any): string {
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
        // Si ninguna fila es ganadora, mostramos mensaje de pérdida


        this.modificarApuesta(user);
        return user.getSaldo();
    }

    getNombreJuego(): string {
        return this.nombre_juego;
    }

}

