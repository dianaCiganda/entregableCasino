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
//bienvenida
    public mostrarMensaje(): void {

        console.log(`Bienvenido al Casino ${this.nombre} "🎰"\n su cajero es ${this.cajero} `);
    };
    //menu para las opciones sin necesidad de console.log por si el proyecto crece, lista los juegos
    public menuOpciones(): void {
        for (let i = 0; i < this.juegos.length; i++) {
            console.log(`${i + 1}. ${this.juegos[i].getNombreJuego()}`);
        }
    }

    public agregarJuego(juego: any): void {
        this.juegos.push(juego)
//En el main vamos a llamar a este metodo y le vamos a pasar por parametro los juegos creados para llenar el array

    };
//método que retorna si el casino esta cerrado con un boolean
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
   public mostrarReglasGenerales(): string{
        return " Reglas Generales del Casino\nAcceso y Registro:\nPara acceder a nuestros juegos, debes tener al menos 18 años\nTodos los jugadores deben registrarse en la plataforma\nCuenta de Usuario:\nCada jugador es responsable de mantener la confidencialidad de sus credenciales de acceso.\nSolo se permite una cuenta por persona.\nDepósitos y Retiros:\nTodos los depósitos deben hacerse a través de métodos de pago autorizados en la plataforma.\nLos retiros están sujetos a verificaciones y pueden demorar hasta 48 horas hábiles."
}
}


