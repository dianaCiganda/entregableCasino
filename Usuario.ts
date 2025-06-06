import { Casino } from "./Casino";
import { Juego } from "./Juego";
import * as rs from 'readline-sync';
export class Usuario extends Casino {
    private usuario: string;
    private contrasenia: string;
    private saldo:number;

    constructor(pUsuario: string, pContrasenia: string, pNombre: string, pSaldo:number, pCajero: string, pJuegos: Juego[]) {
        super(pNombre, pCajero, pJuegos)

        this.usuario = pUsuario;
        this.contrasenia = pContrasenia;
        this.saldo=pSaldo;
    }

 recargarSaldo(): number {

        while (this.saldo < 1000) {
            console.log("El saldo debe ser mayor o igual a $1000");
            this.saldo =rs.questionInt("Ingrese el saldo que desea cargar: ");
        }
        return this.saldo;

    }
      getSaldo(): number {
        return this.saldo;
    }
public actualizarSaldo(monto: number): number {
        this.saldo += monto;
        return this.saldo;
    }

 setSaldo(nuevoSaldo:number):void{
        this.saldo=nuevoSaldo;

    }
    usuarioRandom(): void {

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
        console.log("-----------------------------");

        let inputUsuario: string = "";
        let inputContraseña: string = "";
        // Pedir al usuario que ingrese sus datos

        while (inputUsuario != this.usuario || inputContraseña != this.contrasenia) {
            inputUsuario = rs.question("Ingrese su nombre de usuario: ");
            inputContraseña = rs.question("Ingrese su contraseña: ", { hideEchoBack: true });
            
            if(inputUsuario != this.usuario){
                console.log("Usuario incorrecto vuelva a ingresar los datos");
    
            }else if( inputContraseña != this.contrasenia){
    
                console.log("contraseña incorrecta vuelva a ingresar los datos");
            }
            if (inputUsuario == this.usuario && inputContraseña == this.contrasenia) {
                
                console.log("Acceso concedido");
                
            }
        }
        
    }
    preguntarYRecargarSaldo(): number {
        const quiereRecargar = rs.question("¿Desea recargar saldo? (S/N): ").toUpperCase();
        if (quiereRecargar == "S") {
            return this.recargarSaldo();
        }
        return this.getSaldo();
    }
}