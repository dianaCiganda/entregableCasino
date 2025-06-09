import { Bingo } from "./Bingo";
import { Casino } from "./Casino";
import * as rs from 'readline-sync';
import { Raspadita } from "./Raspadita";
import { ITragamonedas } from "./ITragamonedas";
import { TragamonedaFactory } from "./TragamonedaFactory";
import { Usuario } from "./Usuario";
function obtenerHoraActual(): number {
    const ahora = new Date();
    const horas = ahora.getHours();
    return horas;
    //se deja solo las horas por practicidad pero se puede agregar minutos y segundos si se desea
}
let horaActual = obtenerHoraActual();
let salir = "";
let edad = 0;
let saldo = 0;//de inicio 0 para que ingrese al while de verificar saldo mayor o igual a 1000


const bingo_1 = new Bingo("Bingo Estelar", 100)
const raspadita_1 = new Raspadita(500, "Raspadita Gold", saldo);
const casino_1 = new Casino("Corona de Ases", "Juan Gomez", []);
const fabricaTragamonedas = new TragamonedaFactory();
let user = new Usuario("user_123", "kajjkaja", "Casino", "Rafael Gomez", []);

const myTragamoneda1 = fabricaTragamonedas.crearJuego("Tradicional", {
    nombre_juego: "Tragamoneda Clásica",
    apuestaMaxima: 2000,
    apuestaMininima: 400,
    valorDelTiro: 800,
    tipoDeJuego: "Tradicional"
});

const myTragamoneda2 = fabricaTragamonedas.crearJuego("Moderno", {
    nombre_juego: "Tragamoneda Estrella Azul",
    apuestaMaxima: 4000,
    apuestaMininima: 500,
    valorDelTiro: 1000,
    tipoDeJuego: "Tradicional"
});

casino_1.agregarJuego(bingo_1);
casino_1.agregarJuego(myTragamoneda1);
casino_1.agregarJuego(myTragamoneda2);
casino_1.agregarJuego(raspadita_1);

if (!casino_1.estaCerrado(horaActual)) {
    console.log(`El casino está abierto, la hora actual es: ${horaActual}`);
    while (edad < 18 || edad > 99) {
        edad = rs.questionInt("Ingrese su edad: ");
        if (edad < 18 || edad > 99) {
            console.log("No esta permitido el ingreso de menores de 18 años");
        }
        user.usuarioRandom();
        console.log(casino_1.mostrarReglasGenerales());
        casino_1.mostrarMensaje();
        saldo = user.recargarSaldo();

        while (salir !== "X") {
            salir = rs.question("Presione 'X' para salir o cualquier otra tecla para continuar: ").toUpperCase();

            if (salir !== "X") {
                if (saldo >= 1000) {
                    console.log(`Su saldo actual es: $${saldo}`);
                }

                casino_1.menuOpciones();

                let opcion = 0;
                while (opcion < 1 || opcion > 4) {
                    opcion = rs.questionInt("Seleccione una opción (1-4): ");
                }

                switch (opcion) {
                    case 1:
                        let nuevoSaldo=0;
                        console.log(`${bingo_1.getNombreJuego()}`);
                        bingo_1.mostrarReglas();
                        user.setSaldo(saldo);
                        saldo = user.getSaldo();

                        while (user.getSaldo() >= 100) {
                            console.log(`Saldo actual: ${user.getSaldo()}`);
                            bingo_1.comenzarJuego(user);
                            console.log(`Saldo actualizado: ${user.getSaldo()}`);
                            console.log('\x1b[33m-------------------------\x1b[0m');

                            if (user.getSaldo() < 100) {
                                console.log("\x1b[31mSaldo insuficiente para jugar otra vez.\x1b[0m");

                                 nuevoSaldo = user.preguntarYRecargarSaldo();
                                console.log("nuevo saldo", nuevoSaldo);

                                if (nuevoSaldo > 0) {
                                    saldo = nuevoSaldo;
                                    user.setSaldo(saldo);
                                } else {
                                    break;
                                }
                            }
                            let respuesta: string = "";
                            while (respuesta != "M" && respuesta != "X" && respuesta != "C") {

                                respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            }
                            if (respuesta === "M") {
                                break;

                            }
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        saldo = user.getSaldo();
                        break;

                    case 2:
                        let nuevoSaldo1 = 0;
                        console.log(`${myTragamoneda1.getNombreTragamoneda()}`);
                        user.setSaldo(saldo);

                        while (user.getSaldo() > 0) {
                            console.log(`Saldo actual: ${user.getSaldo()}`);
                            myTragamoneda1.girar(user);

                            if (user.getSaldo() < myTragamoneda1.getValorTiro() || user.getSaldo() == 0) {
                                console.log("\x1b[31mSaldo insuficiente para jugar otra vez.\x1b[0m");
                                myTragamoneda1.modificarApuesta(user);
                                nuevoSaldo1 = user.preguntarYRecargarSaldo();

                                if (nuevoSaldo1 > 0) {
                                    user.actualizarSaldo(nuevoSaldo1);
                                    console.log("Saldo actualizado:", user.getSaldo());
                                    console.log('\x1b[33m-------------------------\x1b[0m');
                                }
                            } else {
                                myTragamoneda1.modificarApuesta(user)
                            }
                            if (user.getSaldo() == 0) {
                                console.log("\x1b[31mSaldo insuficiente para jugar otra vez.\x1b[0m");
                                myTragamoneda1.modificarApuesta(user);
                                nuevoSaldo1 = user.preguntarYRecargarSaldo();
                                if (nuevoSaldo1 == 0) {
                                    console.log("es necesario cargar saldo para seguir jugando");

                                    salir = "X"
                                }

                            }

                            let respuesta: string = "";
                            while (respuesta != "M" && respuesta != "X" && respuesta != "C") {
                                respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            }
                            if (respuesta === "M") {
                                break;
                            }
                            if (respuesta == "C") {
                                continue;
                            }
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        saldo = user.getSaldo();
                        break
                    case 3:
                        let nuevoSaldo2 = 0;
                        console.log(`${myTragamoneda2.getNombreTragamoneda()}`);
                        user.setSaldo(saldo);

                        while (user.getSaldo() > 0) {
                            console.log(`Saldo actual: ${user.getSaldo()}`);
                            myTragamoneda2.girar(user);

                            if (user.getSaldo() < myTragamoneda2.getValorTiro() || user.getSaldo() == 0) {
                                console.log("\x1b[31mSaldo insuficiente para jugar otra vez.\x1b[0m");
                                myTragamoneda2.modificarApuesta(user);
                                nuevoSaldo2 = user.preguntarYRecargarSaldo();

                                if (nuevoSaldo2 > 0) {
                                    user.actualizarSaldo(nuevoSaldo2);
                                    console.log("Saldo actualizado:", user.getSaldo());
                                    console.log('\x1b[33m-------------------------\x1b[0m');
                                }
                            } else {
                                myTragamoneda2.modificarApuesta(user)
                            }
                            if (user.getSaldo() == 0) {
                                console.log("\x1b[31mSaldo insuficiente para jugar otra vez.\x1b[0m");
                                myTragamoneda2.modificarApuesta(user);
                                nuevoSaldo2 = user.preguntarYRecargarSaldo();
                                if (nuevoSaldo2 == 0) {
                                    console.log("es necesario cargar saldo para seguir jugando");

                                    salir = "X"
                                }

                            }

                            let respuesta: string = "";
                            while (respuesta != "M" && respuesta != "X" && respuesta != "C") {
                                respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            }
                            if (respuesta === "M") {
                                break;
                            }
                            if (respuesta == "C") {
                                continue;
                            }
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        saldo = user.getSaldo();
                        break
                    case 4:
                        let nuevoSaldo3 = 0;
                        console.log(`${raspadita_1.getNombreJuego()}`);
                        user.setSaldo(saldo);
                        saldo = user.getSaldo();

                        while (user.getSaldo() >= 500) {
                            console.log(`Saldo actual: ${user.getSaldo()}`);
                            raspadita_1.comenzarJuego(user);
                            console.log("Saldo actualizado:", user.getSaldo());
                            console.log('\x1b[33m-------------------------\x1b[0m');

                            if (user.getSaldo() < 500) {
                                console.log("\x1b[31mSaldo insuficiente para jugar otra vez.\x1b[0m");

                                nuevoSaldo3 = user.preguntarYRecargarSaldo();
                                console.log("nuevo saldo", nuevoSaldo3);

                                if (nuevoSaldo3 > 0) {
                                    saldo = nuevoSaldo3;
                                    user.setSaldo(saldo);
                                } else {
                                    break;
                                }
                            }

                            let respuesta: string = "";
                            while (respuesta != "M" && respuesta != "X" && respuesta != "C") {

                                respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            }
                            if (respuesta === "M") {
                                break;

                            }
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        saldo = user.getSaldo();
                        break;
                }
                console.log(`Gracias por jugar a Casino: ${casino_1.getNombre()}`);
            }
        }
    }
} else {
    console.log(`El casino está cerrado, la hora actual es: ${horaActual}`);

}

