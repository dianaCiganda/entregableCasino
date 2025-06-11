 export class OpcionInvalida extends Error {
    constructor() {
      super("Opción inválida");
      this.name = "InvalidOption";
    }
  }