import * as rs from 'readline-sync';
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
export class Casino {
    private nombre: string = "Corona de Ases";
    private cajero: string = "Paolo Gomez";
    private juegos: Juego[];
   

    constructor(pNombre: string, pCajero: string, pJuegos: Juego[]) {
        this.nombre = pNombre;
        this.cajero = pCajero;

        this.juegos = pJuegos;
    }

    public mostrarMensaje(): void {

        console.log(`Bienvenido al Casino ${this.nombre} "🎰"\n su cajero es ${this.cajero} `);
        //hacer getters y setters de los atributos

    };
    public menuOpciones(): void {
        for (let i = 0; i < this.juegos.length; i++) {
            console.log(`${i + 1}. ${this.juegos[i].getNombreJuego()}`);
        }
    }

    public agregarJuego(juego: any): void {
        this.juegos.push(juego)//En el main vamos a llamar a este metodo y le vamos a pasar por parametro los juegos creados

    };

    public estaCerrado(pHoraActual: number): boolean {
        if (pHoraActual < 9 && pHoraActual > 24) {
            return true
        }
        else {
            return false
        }
    }
    
    
    usuarioRandom(): void {

        // Generar un usuario y contraseña aleatorios
        const usuario = "user_" + Math.floor(Math.random() * 1000);
        // Math.random() genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo), por ejemplo: 0.4567.
        // Math.random() * 1000 multiplica ese número por 1000, dándote un número entre 0 y 999.999...
        // Math.floor(...) redondea hacia abajo al entero más cercano (por ejemplo, 456.789 → 456).
        //Se concatena con el string "user_", por lo tanto se obtiene un nombre como: "user_456".
        const contraseña = Math.random().toString(36).substring(2, 8);
        // Paso 1: Generar un número aleatorio entre 0 y 1
        // Paso 2: Convertir ese número a una cadena en base 36 (usa números y letras minúsculas)
        // Paso 3: Quitar los primeros dos caracteres ("0.") para quedarnos solo con los aleatorios
        // Paso 4: Tomar los primeros 6 caracteres de la cadena para formar la contraseña




        // Mostrar el usuario y contraseña (solo para pruebas)
        console.log("===Ingrese estos datos===");
        console.log("Usuario:", usuario);
        console.log("Contraseña:", contraseña);
        console.log("-----------------------------");


        // Pedir al usuario que ingrese sus datos
        const inputUsuario = rs.question("Ingrese su nombre de usuario: ");
        const inputContraseña = rs.question("Ingrese su contraseña: ", { hideEchoBack: true });

        // Verificar si coinciden
        if (inputUsuario === usuario && inputContraseña === contraseña) {
            console.log("✅ Acceso concedido");
        } else {
            console.log("❌ Usuario o contraseña incorrectos.");
        }

    }
}



