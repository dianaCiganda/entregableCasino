import { Juego } from "./Juego";
import { Usuario } from "./Usuario";
export class Bingo extends Juego {
  private carton1: string[][]= [
      [' 5', '*', '23', '*', '*', '55', '*', '*', '81'],
      ['*', '17', '*', '*', '40', '*', '*', '75', '*'],
      ['*', '*', '*', '38', '47', '*', '61', '*', '89']
    ];
  private carton2: string[][]= [
      [' 4', '*', '*', '39', '*', '53', '*', '*', '83'],
      ['*', '11', '25', '*', '*', '*', '*', '70', '89'],
      ['*', '*', '*', '*', '42', '*', '66', '*', '*']
    ];
  private carton3: string[][]=[
      ['*', '14', '*', '*', '48', '*', '*', '76', '*'],
      [' 6', '*', '22', '31', '*', '*', '60', '*', '82'],
      ['*', '*', '*', '*', '41', '58', '*', '*', '90']
    ];
  private costoPorBolilla: number = 100;
  private pozoAcumulado: number = 100000;
  private cartones: string[][][] = [];
  private cartonEnJuego: string[][] | null = null;
  private numerosCantados: number[] = [];

  constructor(
    pNombre_juego: string,
    pCostoPorBolilla: number,
    pPozoAcumulado?: number,
    pCartonEnJuego?: string[][],
    pNumerosCantados?: number[]
  ) {
    super(pNombre_juego);
    this.costoPorBolilla = pCostoPorBolilla;
    this.pozoAcumulado = pPozoAcumulado || this.pozoAcumulado;
    this.cartonEnJuego = pCartonEnJuego || null;
    this.numerosCantados = pNumerosCantados || this.numerosCantados;
    this.cartones = [this.carton1, this.carton2, this.carton3];
  }

  public mostrarReglas(): void {
    console.log("Reglas del Bingo: Cada jugador compra cartones y marca los números a medida que se cantan. El primero en completar una línea o el cartón completo gana.");
  }
  cobrar(): number {
    let descontar: number =- this.costoPorBolilla;
    return descontar;
  }
  pagar(): number {
    let pago: number = this.costoPorBolilla * 100 + this.costoPorBolilla;//10.000
    return pago
  }

  comenzarJuego(user: Usuario): void {
    if (user.getSaldo() >= this.costoPorBolilla) {//si esto se cumple juega
      console.log(`El valor de la bolilla es:  $${this.costoPorBolilla}`);
      const descuento = this.cobrar();
      user.actualizarSaldo(descuento);

      // Si no hay un cartón asignado, se elige uno aleatoriamente
      if (!this.cartonEnJuego) {
        const indexAleatorio = Math.floor(Math.random() * this.cartones.length);
        //tira un numero aleatoria entre o y 2 numeros

        this.cartonEnJuego = this.cartones[indexAleatorio];//indexAleatorio 0, 1 o 2
        console.log("Este es tu cartón asignado:");
      } else {
        console.log("Seguís jugando con tu cartón anterior:");
      }

      this.mostrarCarton(this.cartonEnJuego);

      if (this.numerosCantados.length >= 90) {
        console.log("Ya se han cantado todos los números.");
        return;
      }

      let numAzar: number;
      do {
        numAzar = Math.floor(Math.random() * 90) + 1;
      } while (this.numerosCantados.includes(numAzar));

      this.numerosCantados.push(numAzar);//vamos llenando  un array con las bolillas cantadas
      console.log(`Número cantado: ${numAzar}`);
      let contador = this.numerosCantados.length;
      console.log("bolilla", contador);//cuenta las bollilas que van saliendo

      // Buscar y marcar el número en el cartón
      for (let fila of this.cartonEnJuego) {
        for (let i = 0; i < fila.length; i++) {
          const valor = fila[i];
          if (parseInt(valor) === numAzar) {
            //parseamos el valor de string del carton para poder igualar a un number que es la bolillla cantada
            fila[i] = "XX";
            console.log(`¡Número ${numAzar} encontrado y marcado!`);
          }
        }
      }
      console.log("Cartón actualizado:");
      this.mostrarCarton(this.cartonEnJuego);

      // Verificar si el cartón está lleno
      let lleno = true;
      for (let fila of this.cartonEnJuego) {
        for (let celda of fila) {
          if (celda !== "XX" && celda !== "*") {
            lleno = false;
            break;
          }
        }
        if (!lleno) break;
      }

      if (lleno && contador <= 29) {
        console.log(`\x1b[32m¡Cartón lleno! Usted gana el pozo acumulado de ${this.pozoAcumulado}\x1b[0m`)
        user.actualizarSaldo(this.pozoAcumulado);//si se cumple la condición 
        this.cartonEnJuego = null;  // Reiniciar cartón SOLO si se llenó
        this.numerosCantados = []; // ← reinicia para una nueva partida
        contador = 0;
      } else if (lleno && contador > 29) {
        console.log(`\x1b[32m¡Cartón lleno! \x1b[0m`);
        const premio: number = this.pagar();
        user.actualizarSaldo(premio)
        this.cartonEnJuego = null;  // Reiniciar cartón SOLO si se llenó
        this.numerosCantados = []; // ← reinicia para una nueva partida
        contador = 0;
      }
    }
  }
  mostrarCarton(carton: string[][]): void {
    if (!carton) {
      console.log("No hay cartón para mostrar.");
      return;
    }
    for (const fila of carton) {
      console.log("| " + fila.map(x => x.padStart(2)).join(" | ") + " |");
      //padStart(2) agrega espacios al principio de x si tiene menos de 2 caracteres
      //.join(" | ") Une los elementos del array usando " | " como separador.
    }
  }
}