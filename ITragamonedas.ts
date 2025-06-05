import { Usuario } from "./Usuario";
export interface ITragamonedas {
girar(user:Usuario):void;
subirApuesta(apuesta:number):void;
getNombreJuego(): string ;
bajarApuesta(apuesta:number):void;
}