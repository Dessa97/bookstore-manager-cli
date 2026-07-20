import { AutorRepository } from "../repositories/autorRepository";
import { Autor } from "../models/autor";

export class AutorService {
  private autorRepository = new AutorRepository();

  private formatarNomeAutor(nome_autor: string): string {
    return nome_autor
      .trim()
      .split(/\s+/)
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(" ");
  }

  private formatarNacionalidade(nacionalidade: string): string {
    return nacionalidade.trim().toLowerCase();
  }

  public async cadastrarAutor(autor: Autor): Promise<void> {
    if (!autor.nome_autor.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    autor.nome_autor = this.formatarNomeAutor(autor.nome_autor);
    autor.nacionalidade = this.formatarNacionalidade(autor.nacionalidade);

    const autorDuplicado = await this.autorRepository.buscarAutorPorNomeENacionalidade(
      autor.nome_autor,
      autor.nacionalidade,
    );

    if (autorDuplicado) {
      throw new Error("Já existe um autor com este nome e nacionalidade.");
    }

    await this.autorRepository.cadastrarAutor(autor);
  }

  public async listarAutores(): Promise<Autor[]> {
    return await this.autorRepository.listarAutores();
  }

  public async buscarAutorPorId(id: number): Promise<Autor | null> {
    return await this.autorRepository.buscarAutorPorId(id);
  }
  public async atualizarAutor(autor: Autor): Promise<void> {
    const autorExistente = await this.autorRepository.buscarAutorPorId(
      autor.id!,
    );

    if (!autorExistente) {
      throw new Error("Autor não encontrado.");
    }

    if (!autor.nome_autor.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    autor.nome_autor = this.formatarNomeAutor(autor.nome_autor);
    autor.nacionalidade = this.formatarNacionalidade(autor.nacionalidade);

    const autorDuplicado = await this.autorRepository.buscarAutorPorNomeENacionalidade(
      autor.nome_autor,
      autor.nacionalidade,
    );

    if (autorDuplicado && autorDuplicado.id !== autor.id) {
      throw new Error("Já existe um autor com este nome e nacionalidade.");
    }

    await this.autorRepository.atualizarAutor(autor);
  }

  public async excluirAutor(id: number): Promise<void> {
    const autor = await this.autorRepository.buscarAutorPorId(id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    await this.autorRepository.excluirAutor(id);
  }
}
