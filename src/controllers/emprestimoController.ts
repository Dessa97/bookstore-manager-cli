import { Emprestimo } from "../models/emprestimo";
import { EmprestimoService } from "../services/emprestimoService";

export class EmprestimoController {
  private emprestimoService = new EmprestimoService();

  public async cadastrarEmprestimo(
    livro_id: number,
    cliente_id: number,
  ): Promise<void> {
    const emprestimo = new Emprestimo(
      livro_id,
      cliente_id,
      new Date().toISOString().slice(0, 10),
    );

    await this.emprestimoService.cadastrarEmprestimo(emprestimo);
  }

  public async listarEmprestimos(): Promise<Emprestimo[]> {
    return await this.emprestimoService.listarEmprestimos();
  }

  public async buscarPorId(id: number): Promise<Emprestimo | null> {
    return await this.emprestimoService.buscarEmprestimoPorId(id);
  }

  public async devolverEmprestimo(id: number): Promise<void> {
    await this.emprestimoService.devolverEmprestimo(id);
  }

  public async excluirEmprestimo(id: number): Promise<void> {
    await this.emprestimoService.excluirEmprestimo(id);
  }
}
