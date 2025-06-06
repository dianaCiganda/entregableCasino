import { Usuario } from "./Usuario";
export interface ITragamonedas {
girar(user:Usuario):void;
subirApuesta(apuesta:number):number;
getNombreJuego(): string;
bajarApuesta(apuesta:number):number;
}