import { LivroService } from "../services/livroService";
import { Livro } from "../models/livro";

export class LivroController {
  private livroService = new LivroService();

  public async cadastrarLivro(
    titulo: string,
    ano_publicacao: number,
    quantidade_total: number,
    quantidade_disponivel: number,
    autor_id: number,
  ): Promise<void> {
    const livro = new Livro(
      titulo,
      ano_publicacao,
      quantidade_total,
      quantidade_disponivel,
      autor_id,
    );

    await this.livroService.cadastrarLivro(livro);
  }
  public async listarLivros(): Promise<Livro[]> {
    return await this.livroService.listarLivros();
  }

  public async buscarLivroPorId(id: number): Promise<Livro | null> {
    return await this.livroService.buscarLivroPorId(id);
  }
  public async atualizarLivro(
    id: number,
    titulo: string,
    ano_publicacao: number,
    quantidade_total: number,
    quantidade_disponivel: number,
    autor_id: number,
  ): Promise<void> {
    const livro = new Livro(
      titulo,
      ano_publicacao,
      quantidade_total,
      quantidade_disponivel,
      autor_id,
      id,
    );

    await this.livroService.atualizarLivro(livro);
  }
  public async excluirLivro(id: number): Promise<void> {
    await this.livroService.excluirLivro(id);
  }
}
