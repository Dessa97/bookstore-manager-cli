import { AutorRepository } from "../repositories/autorRepository";
import { Autor } from "../models/autor";

export class AutorService {
  private autorRepository = new AutorRepository();

  public async cadastrarAutor(autor: Autor): Promise<void> {
    if (!autor.nome.trim()) {
      throw new Error("O nome do autor é obrigatório.");
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

    if (!autor.nome.trim()) {
      throw new Error("O nome do autor é obrigatório.");
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
