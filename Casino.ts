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
export class Casino{
    private nombre: string= "Corona de Ases";
    private cajero: string= "Paolo Gomez";
    private usuario: string= "Alfonsina Storni";
    private juegos:  Juego[];
    private saldo: number = 0;

    constructor(pNombre: string, pCajero: string,pJuegos: Juego[], pusuario: string) {
        this.nombre= pNombre;
        this.cajero= pCajero;
        this.usuario= pusuario;
        this.juegos= pJuegos;
    }

    public mostrarMensaje(): void{

        console.log(`Bienvenido ${this.usuario} a Casino ${this.nombre} "🎰"\n su cajero es ${this.cajero} `);
        //hacer getters y setters de los atributos
        
    };
public menuOpciones(): void{
     for (let i = 0; i < this.juegos.length; i++) {
                    console.log(`${i + 1}. ${this.juegos[i].getNombreJuego()}`);
                }
}
            
            public agregarJuego(juego:any): void {
                this.juegos.push(juego)//En el main vamos a llamar a este metodo y le vamos a pasar por parametro los juegos creados
                
            };
            
            public estaCerrado(pHoraActual:number): boolean{
        if(pHoraActual< 9 && pHoraActual > 24){        
            return true
        } 
                    else{
                        return false
                    }                
                }
                public cargarSaldo(pSaldo:number): number{
       return  this.saldo += pSaldo;
    }
}



