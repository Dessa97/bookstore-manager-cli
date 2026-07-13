import { ICliente } from "../interfaces/ICliente";

export class Cliente implements ICliente {

  constructor(
    public nome: string,
    public email: string,
    public telefone: string,
    public id?: number,
  ) {}

}