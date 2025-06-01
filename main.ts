import { Bingo } from "./Bingo";
import { Casino } from "./Casino";
import * as rs from 'readline-sync';
import { Raspadita } from "./Raspadita";
import { ITragamonedas } from "./ITragamonedas";
import { TragamonedaFactory } from "./TragamonedaFactory";





function obtenerHoraActual(): number {
    const ahora = new Date();
    const horas = ahora.getHours();
    return horas;
    //se deja solo las horas por practicidad pero se puede agregar minutos y segundos si se desea
}
let horaActual = obtenerHoraActual();
let salir = "";
let edad = 0;
let saldo = 0;


const bingo_1 = new Bingo(5, "Bingo Estelar", 100, 10, saldo);
const raspadita_1 = new Raspadita(333, 500, false, "Raspadita Gold", saldo);

const casino_1 = new Casino("Corona de Ases", "Juan Gomez", []);
const fabricaTragamonedas = new TragamonedaFactory();

const myTragamoneda1 = fabricaTragamonedas.crearJuego("Tradicional", {
    cantidadFilas: 3,
    cantidadColumnas: 3,
    nombre_juego: "Tragamoneda Clásica",
    subirApuesta: 100,
    bajarApuesta: 10,
    saldo: 1000,
    apuestaMaxima: 500,
    apuestaMinima: 50,
    tipoDeJuego: "Tradicional"
});

const myTragamoneda2 = fabricaTragamonedas.crearJuego("Moderno", {
    cantidadFilas: 4,
    cantidadColumnas: 4,
    nombre_juego: "Tragamoneda Estrella Azul",
    subirApuesta: 100,
    bajarApuesta: 10,
    saldo: 1000,
    apuestaMaxima: 500,
    apuestaMinima: 50,
    tipoDeJuego: "Moderno"
});


casino_1.agregarJuego(bingo_1);
casino_1.agregarJuego(myTragamoneda1);
casino_1.agregarJuego(myTragamoneda2);
casino_1.agregarJuego(raspadita_1);

while (edad < 18 || edad > 99) {
    edad = rs.questionInt("Ingrese su edad: ");
}

if (edad >= 18 && edad <= 99) {
    casino_1.usuarioRandom();
    casino_1.mostrarMensaje();

    if (!casino_1.estaCerrado(horaActual)) {
        console.log(`El casino está abierto, la hora actual es: ${horaActual}`);


        while (saldo < 1000) {
            console.log("El saldo debe ser mayor o igual a $1000");
            saldo = rs.questionInt("Ingrese el saldo que desea cargar: ");
        }



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
                        console.log(`Usted ha seleccionado el juego: ${bingo_1.getNombreJuego()}`);
                        while (saldo >= 1000) {

                            console.log("¡Bingo jugado! (simulado)");

                            const respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            if (respuesta === "M") break;
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        break;

                    case 2:
                        console.log(`Usted ha seleccionado el juego: ${myTragamoneda1.getNombreJuego()}`);
                        while (saldo >= 1000) {


                            const respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            if (respuesta === "M") break;
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        break;

                    case 3:
                        console.log(`Usted ha seleccionado el juego: ${myTragamoneda2.getNombreJuego()}`);
                        while (saldo >= 1000) {


                            const respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
                            if (respuesta === "M") break;
                            if (respuesta === "X") {
                                salir = "X";
                                break;
                            }
                        }
                        break;

                   case 4:
    console.log(`Usted ha seleccionado: ${raspadita_1.getNombreJuego()}`);
    raspadita_1.setSaldo(saldo); 
    while (raspadita_1.getSaldo() >= 500) {
        console.log(`Saldo actual: $${raspadita_1.getSaldo()}`);
        raspadita_1.comenzarJuego(); // Modifica el saldo interno
        console.log("Saldo actualizado:", raspadita_1.getSaldo());

        if (raspadita_1.getSaldo() < 500) {
            console.log("Saldo insuficiente para jugar otra vez.");
            break;
        }

        const respuesta = rs.question("Presione 'M' para menú principal, 'C' para continuar o 'X' para salir: ").toUpperCase();
        if (respuesta === "M") break;
        if (respuesta === "X") {
            salir = "X";
            break;
        }
    }
    break;
                }
            }

        }
        console.log(`Gracias por jugar a Casino: ${casino_1.getNombre()}`);

    }
}