import { Casino } from "./Casino";
import { Juego } from "./Juego";
import * as rs from 'readline-sync';
import * as fs from 'fs';
export class Usuario extends Casino {
    private usuario: string;
    private contrasenia: string;
    private saldo: number = 0;

    constructor(pUsuario: string, pContrasenia: string, pNombre: string, pCajero: string, pJuegos: Juego[], pSaldo?: number) {
        super(pNombre, pCajero, pJuegos)

        this.usuario = pUsuario;
        this.contrasenia = pContrasenia;
        this.saldo = pSaldo || this.saldo
    }

   public  recargarSaldo(): number {
        let saldoAux = 0;
        //declaramos una variable aux para poder entrar al while la primera vuelta, esa variable se vuelve el saldo que ingresa el usuario que debe ser mayor o igual a 1000, sino sigue pidiendo el ingreso,retorna el saldo cuando es mayor o igual a 1000
        while (saldoAux < 1000) {
            console.log("El monto mínimo a recargar es $1000.");
            saldoAux = rs.questionInt("Ingrese el monto que desea recargar: ");
        }
        return saldoAux;
    }

   public getSaldo(): number {
        return this.saldo;
    }//Retorna el saldo


   public actualizarSaldo(monto: number): number {
        return this.saldo += monto;
    }//Retorna el saldo + un saldo residual

    public setSaldo(nuevoSaldo: number): void {
        this.saldo = nuevoSaldo;
        //NO retorna nada pero actualiza el saldo al nuevoSaldo pasado por parametro

    }
   public  usuarioRandom(): void {

        // Generar un usuario y contraseña aleatorios
        this.usuario = "user_" + Math.floor(Math.random() * 1000);
        // Math.random() genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo), por ejemplo: 0.4567.
        // Math.random() * 1000 multiplica ese número por 1000, dándote un número entre 0 y 999.999...
        // Math.floor(...) redondea hacia abajo al entero más cercano (por ejemplo, 456.789 → 456).
        //Se concatena con el string "user_", por lo tanto se obtiene un nombre como: "user_456".
        this.contrasenia = Math.random().toString(36).substring(2, 8);
        // Paso 1: Generar un número aleatorio entre 0 y 1
        // Paso 2: Convertir ese número a una cadena en base 36 (usa números y letras minúsculas)
        // Paso 3: Quitar los primeros dos caracteres ("0.") para quedarnos solo con los aleatorios
        // Paso 4: Tomar los primeros 6 caracteres de la cadena para formar la contraseña

        // Mostrar el usuario y contraseña (solo para pruebas)
        console.log("===Ingrese estos datos===");
        console.log("Usuario:", this.usuario);
        console.log("Contraseña:", this.contrasenia);
        console.log('\x1b[33m-------------------------\x1b[0m');

        let inputUsuario: string = "";
        let inputContraseña: string = "";
        // Pedir usuario y o contraseña correctos, sino ingresa correctos vuelve a pedir los 2 y entra en bucle, se inicializan usuario y contraseña en vacio para que entre primera vuelta al while.

        while (inputUsuario != this.usuario || inputContraseña != this.contrasenia) {
            inputUsuario = rs.question("Ingrese su nombre de usuario: ");
            inputContraseña = rs.question("Ingrese su contraseña: ", { hideEchoBack: true });

            if (inputUsuario != this.usuario || inputContraseña != this.contrasenia) {
                console.log("Usuario y/o contraseña incorrecto vuelva a ingresar los datos");
                console.log('\x1b[33m--------------------------------------------\x1b[0m');
            } else {
                console.log("Acceso concedido");
                console.log('\x1b[33m-------------------------\x1b[0m');
                fs.appendFileSync('archivo.txt', '\n' + `Usuario: ` + (this.usuario) + ` ` + `Contraseña: ` + (this.contrasenia));
                //Se colocó en esta linea el fs para que solo guarde los usuarios y/o contrseñas ingresados correctamente.

            }
        }
    }

   public  preguntarYRecargarSaldo(): number {
        let quiereRecargar = "";//Para ingrsar por primera vez al while
        while (quiereRecargar != "S") {
            quiereRecargar = rs.question("¿Desea recargar saldo? (S/N): ").toUpperCase();
            if (quiereRecargar == "S") {
                return this.recargarSaldo();
            }
            else if (quiereRecargar == "N") {

                break
            }
        }
return 0;
    }
    //Este método pregunta si desea recargar saldo si es S llama al método recargarSaldo y lo retorna si es N sale de este bucle, sino recarga retorna 0
}
