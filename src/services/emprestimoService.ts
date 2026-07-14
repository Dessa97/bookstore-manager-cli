import { LivroRepository } from "../repositories/livroRepository";
import { ClienteRepository } from "../repositories/clienteRepository";
import { EmprestimoRepository } from "../repositories/emprestimoRepository";
import { Emprestimo } from "../models/emprestimo";

export class EmprestimoService {
  private livroRepository = new LivroRepository();
  private clienteRepository = new ClienteRepository();
  private emprestimoRepository = new EmprestimoRepository();

  public async cadastrarEmprestimo(emprestimo: Emprestimo): Promise<void> {
    const livro = await this.livroRepository.buscarLivroPorId(emprestimo.livro_id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    const cliente = await this.clienteRepository.buscarClientePorId(
      emprestimo.cliente_id,
    );

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    if (livro.quantidade_disponivel <= 0) {
      throw new Error("Livro indisponível.");
    }

    await this.emprestimoRepository.cadastrarEmprestimo(emprestimo);

    livro.quantidade_disponivel--;

    await this.livroRepository.atualizarLivro(livro);
  }

  public async listarEmprestimos(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.listarEmprestimos();
  }

  public async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    return await this.emprestimoRepository.buscarEmprestimoPorId(id);
  }

  public async devolverEmprestimo(id: number): Promise<void> {
    const emprestimo = await this.emprestimoRepository.buscarEmprestimoPorId(id);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.devolvido) {
      throw new Error("Livro já devolvido.");
    }

    const livro = await this.livroRepository.buscarLivroPorId(emprestimo.livro_id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    livro.quantidade_disponivel++;

    await this.livroRepository.atualizarLivro(livro);

    await this.emprestimoRepository.devolverEmprestimo(id);
  }

  public async excluirEmprestimo(id: number): Promise<void> {
    return this.excluir(id);
  }

  public async excluir(id: number): Promise<void> {
    const emprestimo = await this.emprestimoRepository.buscarEmprestimoPorId(id);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.devolvido !== true) {
      const livro = await this.livroRepository.buscarLivroPorId(emprestimo.livro_id);

      if (!livro) {
        throw new Error("Livro não encontrado.");
      }

      livro.quantidade_disponivel++;
      await this.livroRepository.atualizarLivro(livro);
    }

    await this.emprestimoRepository.excluirEmprestimo(id);
  }
}
