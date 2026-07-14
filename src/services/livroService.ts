import { LivroRepository } from "../repositories/livroRepository";
import { Livro } from "../models/livro";
import { AutorRepository } from "../repositories/autorRepository";

export class LivroService {
  private livroRepository = new LivroRepository();
  private autorRepository = new AutorRepository();
  public async cadastrarLivro(livro: Livro): Promise<void> {
    if (!livro.titulo.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    const autor = await this.autorRepository.buscarAutorPorId(livro.autor_id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    await this.livroRepository.cadastrarLivro(livro);
  }

  public async listarLivros(): Promise<Livro[]> {
    return await this.livroRepository.listarLivros();
  }

  public async buscarLivroPorId(id: number): Promise<Livro | null> {
    return await this.livroRepository.buscarLivroPorId(id);
  }
  public async atualizarLivro(livro: Livro): Promise<void> {
    const livroExistente = await this.livroRepository.buscarLivroPorId(
      livro.id!,
    );

    if (!livroExistente) {
      throw new Error("Livro não encontrado.");
    }

    if (!livro.titulo.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    const autor = await this.autorRepository.buscarAutorPorId(livro.autor_id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    await this.livroRepository.atualizarLivro(livro);
  }

  public async excluirLivro(id: number): Promise<void> {
    const livro = await this.livroRepository.buscarLivroPorId(id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    await this.livroRepository.excluirLivro(id);
  }
}
