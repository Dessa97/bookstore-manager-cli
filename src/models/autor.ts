import { IAutor } from "../interfaces/IAutor";

export class Autor implements IAutor {

  constructor(
    public nome: string,
    public nacionalidade: string,
    public id?: number,
  ) {}

}