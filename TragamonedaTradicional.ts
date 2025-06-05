import { Juego } from './Juego';
import { ITragamonedas } from "./ITragamonedas.js";
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
    subirApuesta(apuesta: number): void {
        throw new Error('Method not implemented.');
    }
    bajarApuesta(apuesta: number): void {
        throw new Error('Method not implemented.');
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
            console.log(`El valor del tiro de la tragamoneda  es $${this.valorDelTiro}`);

            this.mostrarTragamoneda(user);
            const descuento = this.cobrar();
            user.actualizarSaldo(-descuento); // descontar costo del boleto


            return user.getSaldo();  // retorno de saldo actualizado
        }
        let resultado:string=this.mostrarTragamoneda(user);
        console.log(resultado);
        

    }
    mostrarTragamoneda(user:any): string{
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
for (let i = 0; i < 3; i++) {
    const fila = matriz[i];
    let coincidencias:number=0;
    if (fila[0] === fila[1] && fila[1] === fila[2]) {
        const premio: number = this.pagar();
            user.actualizarSaldo(premio); // actualiza saldo al ganar

        coincidencias++;
        if(coincidencias==1 || coincidencias==2 || coincidencias==3){
            console.log( "🎉 Usted ha ganado!!!!!");

        }else{

            console.log("😞 Usted ha perdido!!!!!");
        }
        
    }
}

// Si ninguna fila es ganadora, mostramos mensaje de pérdida
  return user.getSaldo();
    }



    getNombreJuego(): string {
        return this.nombre_juego;
    }

}

