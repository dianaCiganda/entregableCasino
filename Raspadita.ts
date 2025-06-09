import { Juego } from "./Juego";
import * as rs from 'readline-sync';
import { Usuario } from "./Usuario";
export class Raspadita extends Juego {
    private numeroMatriz: number;
    private costoPorboleto: number = 500;
    private simbolos: string[] = ["😀", "😅", "😊", "😎", "🥰", "🤔"];
    private matriz: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    constructor(pCostoPorboleto: number, pNombre_juego: string, pSaldo: number, pSimbolos?: string[], pMatriz?: number[][], pNumeroMatriz?: number) {
        super(pNombre_juego);
        this.costoPorboleto = pCostoPorboleto;
        this.matriz = pMatriz || this.matriz;
        this.simbolos = pSimbolos || this.simbolos;
        this.numeroMatriz = pNumeroMatriz || 0;
    }
   public cobrar(): number {
        let descontar: number = this.costoPorboleto;
        return descontar;
    }
    public pagar(): number {
        let pago: number = this.costoPorboleto * 4;
        return pago
    }

    //preguntar porque no toma el tipo Usuario
   public comenzarJuego(user:Usuario): number {
        if (user.getSaldo() >= this.costoPorboleto) {
            console.log(`El valor de la raspadita es $${this.costoPorboleto}`);

            const descuento = this.cobrar();
            user.actualizarSaldo(-descuento); // descontar costo del boleto
            this.mostrarCarton();

            this.numeroMatriz = -1;
            while (this.numeroMatriz < 1 || this.numeroMatriz > 9) {
                this.numeroMatriz = rs.questionInt("Ingrese el número a raspar (1-9): ");
            }

            console.log(`Usted eligió el número ${this.numeroMatriz}`);
            this.mostrarCartonRaspado(user);

        } else {
            console.log("Saldo insuficiente para jugar.");
        }

        return user.getSaldo();  // retorno de saldo actualizado
    }
    public mostrarCarton(): void {
        for (let i = 0; i < this.matriz.length; i++) {
            let fila = this.matriz[i].map(val => ` ${val} `).join("|");
            console.log(fila);
            if (i < this.matriz.length - 1) {
                console.log("---|---|---"); // Separador entre filas
            }
        }
    }
    public mostrarCartonRaspado(user: Usuario): number {
        // creamos un arreglo vacio para almacenar los emoticones aleatorios
        const emojis: string[] = [];
        while (emojis.length < 3) {
            //// Creamos un índice aleatorio entre 0 y simbolos.length - 1, ----> (0,5)
            const indice = Math.floor(Math.random() * this.simbolos.length);

            const simboloAleatorio = this.simbolos[indice];
            //creamos una constante simbolo que alpacena un simbolo aleatorio
            if (!emojis.includes(simboloAleatorio)) {
                //si los simbolos no están incluidos en en array seleccionados los pushea
                emojis.push(simboloAleatorio);

            }
        }
        //Selecciona 3 símbolos distintos al azar del arreglo simbolos.
        //Evita repeticiones usando includes().


        // Crear 6 cruces
        const cruces: string[] = Array(6).fill("❌");
        // Array(6) Crea un arreglo vacío con 6 posiciones 
        //.fill("❌") Llena todas las posiciones del arreglo con el valor "❌".

        // Unir y mezclar contenido
        const contenido: string[] = [...emojis, ...cruces];
        //forma abreviada de agregar elementos a un array
        //array con 3 cruces y 6 emojis

        // Mezclar aleatoriamente
        for (let i = contenido.length - 1; i > 0; i--) {
            //hace iteraciones en decremento
            const j = Math.floor(Math.random() * (i + 1));
            //almacena ej j un numero aleatorio 0 y 8
            [contenido[i], contenido[j]] = [contenido[j], contenido[i]];
            //Mezcla cruces con emoticones aleatoriamente
        }

        // Resultado del raspado
        //usuario:numero 4
        //valor elegido=contenido[4]="e"
        //contenido=[x,x,x,x,e,x,e,x,e]
        // si seleccionados que son los emojis coincide el valor elegido, gana
        const valorElegido = contenido[this.numeroMatriz - 1];//le resto uno al numero ingresado para trabajar en posiciones
        if (emojis.includes(valorElegido)) {//devuelve true si esta incluido
            console.log(`🎉 ¡Felicidades! Has raspado la casilla ${this.numeroMatriz} y\nganaste con el símbolo: ${valorElegido}`);

            const premio: number = this.pagar();
            user.actualizarSaldo(premio); // actualiza saldo al ganar

        } else {


            console.log(`La casilla ${this.numeroMatriz} tiene una ❌. ¡Has perdido!`);

        }



        // Pasar de arreglo uni-direccional a matriz
        const matriz: string[][] = [];
        for (let i = 0; i < 3; i++) {
            matriz.push(contenido.slice(i * 3, (i + 1) * 3));
            //el arreglo se esta subdividiendo y creando una nueva matriz

        }
        // Mostrar con separadores simples
        for (let i = 0; i < 3; i++) {
            console.log(matriz[i].join(" | "));
            if (i < 3) {
                console.log("----|----|----");
                // Separador entre filas
            }
        }
        return user.getSaldo();// retorna el saldo con el descuento del cartón
    }
}

