import { IAutor } from "../interfaces/IAutor";

export class Autor implements IAutor {

  constructor(
    public nome_autor: string,
    public nacionalidade: string,
    public id?: number,
  ) {}

}