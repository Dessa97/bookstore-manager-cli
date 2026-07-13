import { IEmprestimo } from "../interfaces/IEmprestimo";

export class Emprestimo implements IEmprestimo {

  constructor(
    public livro_id: number,
    public cliente_id: number,
    public data_emprestimo: string,
    public data_devolucao?: string,
    public devolvido?: boolean,
    public id?: number,
  ) {}

}