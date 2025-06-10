import{ Juego } from './Juego';
import { ITragamonedas } from "./ITragamonedas.js";
import { Usuario } from './Usuario';
import * as rs from 'readline-sync';
export class TragamonedaModerno extends Juego implements ITragamonedas {
     private emojiSuerte: string[] = ["🌟", "💎", "🌈", "🕊️", "🧸"];
        private tipoDeJuego: string = "Moderno";
        private valorDelTiro: number = 1000;
        private apuestaMinima:number=500;
        private apuestaMaxima:number=4000;
        constructor(pNombre_juego: string, pApuestaMaxima?: number, pApuestaMinima?: number, pValorDelTiro?:number,pTipoDeJuego?:string) {
    
            super(pNombre_juego)
            this.tipoDeJuego = pTipoDeJuego || this.tipoDeJuego;
            this.valorDelTiro = pValorDelTiro || this.valorDelTiro;
            this.apuestaMaxima=pApuestaMaxima || this.apuestaMaxima;
            this.apuestaMinima=pApuestaMinima || this.apuestaMinima;
            
    
        }
       public subirApuesta(): number {
            let subir: number = this.valorDelTiro + this.apuestaMinima;
            return subir
        }
       public bajarApuesta(): number {
            let bajar: number = this.valorDelTiro - this.apuestaMinima;
            return bajar
        }
    
      public cobrar(): number {
            let descontar: number = -this.valorDelTiro
            return descontar;
        }
      public  pagar(): number {
            let pago: number = this.valorDelTiro * 10 + this.valorDelTiro;
            return pago
        }
      public  girar(user:Usuario):number {
            if (user.getSaldo() >=this.valorDelTiro) {//Si se cumple juega, descuenta el valor del tiro y lo guarda en descuento y actualiza el saldo
                console.log(`El valor del tiro de la tragamoneda es $${this.valorDelTiro}`);
    
                const descuento = this.cobrar();
                user.actualizarSaldo(descuento); 
    
                this.mostrarTragamoneda(user);//muestra el tragamoneda con símbolos aleatorios
            }
    
            return user.getSaldo();
        }
    
      public  modificarApuesta(user:Usuario): void {
            let modificarApuesta: string = "";
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
               
                user.setSaldo(saldoAsumar+user.getSaldo()); //si hay saldo residual se lo suma al saldo recargado
                }
                else if(modificarApuesta=="J") {
                    this.girar(user)
                    break
                }
                console.log(`El valor del tiro de la tragamoneda  es $${this.valorDelTiro}`);
    
            }
        }
       public mostrarTragamoneda(user: Usuario):number {
            // Crear arreglo con 16 símbolos aleatorios
            const contenido: string[] = [];
            while (contenido.length < 16) {
                const indice = Math.floor(Math.random() * this.emojiSuerte.length);
                contenido.push(this.emojiSuerte[indice]);
            }
    
            // Mezclar aleatoriamente el contenido
            for (let i = contenido.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [contenido[i], contenido[j]] = [contenido[j], contenido[i]];
            }
    
            // Convertir a matriz 4x4
            const matriz: string[][] = [];
            for (let i = 0; i < 4; i++) {
                matriz.push(contenido.slice(i * 4, (i + 1) * 4));
                //está tomando fragmentos de un array o string llamado contenido y los está agrupando de a 4 elementos para formar una matriz (arreglo bidimensional)
                //contenido.slice(...): toma una porción de 4 elementos (o caracteres).
            }
    
            // Mostrar la matriz con separadores
            console.log("------ TRAGAMONEDAS ------");
            for (let i = 0; i < 4; i++) {
                console.log(matriz[i].join(" | "));
                if (i < 3) {
                    console.log("----|----|----|----");
                }
            }
    
            // Verificar si hay una fila ganadora
            let coincidencias: number = 0;
            for (let i = 0; i < 4; i++) {
                const fila = matriz[i];
                if (fila[0] == fila[1] && fila[1] == fila[2] && fila[2]==fila[3]) {
                    const premio: number = this.pagar();
                    user.actualizarSaldo(premio); // actualiza saldo al ganar
    
                    coincidencias++;
                }
            }
            if (coincidencias == 1 || coincidencias == 2 || coincidencias == 3 || coincidencias==4) {
                console.log("\x1b[32m🎉 Usted ha ganado!!!!!\x1b[0m");

                console.log("Saldo actualizado:", user.getSaldo());
            } else {
    
                console.log("😞 Usted ha perdido!!!!!");
                console.log("Saldo actualizado:", user.getSaldo());
            }
            // Si ninguna fila es ganadora, mostramos mensaje de pérdida y actualizamos saldo
    
    
            // this.modificarApuesta(user);
            return user.getSaldo();
        }
       public getNombreTragamoneda(): string {
        return this.getNombreJuego();
    }
   public getValorTiro():number{
        return this.valorDelTiro
    }
    }
    
    

