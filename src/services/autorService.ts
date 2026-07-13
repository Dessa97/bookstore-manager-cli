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
}
