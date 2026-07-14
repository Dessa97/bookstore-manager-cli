import { ILivro } from "../interfaces/ILivro";

export class Livro implements ILivro {

  constructor(
    public titulo: string,
    public ano_publicacao: number,
    public quantidade_total: number,
    public quantidade_disponivel: number,
    public autor_id: number,
    public id?: number,
  ) {}

}