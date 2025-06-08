import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
export interface ITragamonedas {
girar(user:Usuario):number;
subirApuesta(apuesta:number):number;
getNombreJuego(): string;
bajarApuesta(apuesta:number):number;
getValorTiro():number;
mostrarTragamoneda(user:Usuario):number;
modificarApuesta(user:Usuario):void
}