import { ICliente } from "../interfaces/ICliente";

export class Cliente implements ICliente {

  constructor(
    public nome_cliente: string,
    public email: string,
    public telefone: string,
    public id?: number,
  ) {}

}