import { Bingo } from "./Bingo";
import { Juego } from "./Juego";
import { Casino } from "./Casino";
import * as rs from 'readline-sync';
import { Raspadita } from "./Raspadita";
import { ITragamonedas } from "./ITragamonedas";
import { TragamonedaFactory } from "./TragamonedaFactory";





function obtenerHoraActual(): number {
    const ahora = new Date();
    const horas = ahora.getHours();
    return horas;
}



let horaActual = obtenerHoraActual();
let salir = "";
let edad = rs.questionInt("Ingrese su edad: ");
if (edad >= 18) {
    let usuario = rs.question("Ingrese su nombre de usuario: ");
    let casino_1 = new Casino("Corona de Ases", "Juan Gomez", [], usuario);
    casino_1.mostrarMensaje();
    if (casino_1.estaCerrado(horaActual) == false) {
        console.log(`El casino está abierto, la hora actual es: ${horaActual}`);
        let opcion = 0;
        // Crear juegos, cambiar los repetidos por las tragamonedas

        let fabricaTragamonedas = new TragamonedaFactory();
        let myTragamoneda1: ITragamonedas = fabricaTragamonedas.crearJuego("Tradicional", {
            cantidadFilas: 3,
            cantidadColumnas: 3,
            nombre_juego: "Tragamoneda Clásica",
            subirApuesta: 100,
            bajarApuesta: 10
        });
        let myTragamoneda2: ITragamonedas = fabricaTragamonedas.crearJuego("Moderno", {
            cantidadFilas: 3,       
            cantidadColumnas: 3,
            nombre_juego: "Tragamoneda Estrella Azul",
            subirApuesta: 100,
            bajarApuesta: 10
        });
        let bingo_1 = new Bingo(5, "Bingo Estelar", 100, 10, 1000);
        let raspadita_1 = new Raspadita(333,1500,false, "Raspadita Gold",10000);
        // Mostrar reglas de los juegos
        // Agregar juegos al casino, cambiar por tragamonedas donde corresponde  
        casino_1.agregarJuego(bingo_1);
        casino_1.agregarJuego(myTragamoneda1);
        casino_1.agregarJuego(myTragamoneda2);
        casino_1.agregarJuego(raspadita_1);
        // Mostrar menú de opciones

        while (salir != "X") {
            salir = rs.question("Presione 'X' para salir o cualquier otra tecla para continuar: ").toUpperCase();
            casino_1.menuOpciones();
            while (opcion < 1 || opcion > 4) {
                opcion = rs.questionInt("Seleccione una opcion: ");
            }
            //mostrar que juego se eligió, cambiar por tragamonedas donde corresponde
            switch (opcion) {
                case 1:
                    console.log(`Usted ha seleccionado el juego: ${bingo_1.getNombreJuego()}`);
                    break

                case 2:
                    console.log(`Usted ha seleccionado el juego: ${myTragamoneda1.getNombreJuego()}`);
                    break;
                case 3:
                    console.log(`Usted ha seleccionado el juego: ${myTragamoneda2.getNombreJuego()}`);
                    break;
                case 4:
                    console.log(`Usted ha seleccionado el juego: ${raspadita_1.getNombreJuego()}`);
                    break;
            }

        }

    } else {
        console.log(`El casino está cerrado,la hora actual es: ${horaActual}`);
    }




} else {
    console.log("Lo sentimos, debes ser mayor de 18 años para ingresar al casino.");
}













