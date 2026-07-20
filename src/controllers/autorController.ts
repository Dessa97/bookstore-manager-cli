import { AutorService } from "../services/autorService";
import { Autor } from "../models/autor";

export class AutorController {
  private autorService = new AutorService();

  public async cadastrar(nome_autor: string, nacionalidade: string): Promise<void> {
    const autor = new Autor(nome_autor, nacionalidade);

    await this.autorService.cadastrarAutor(autor);
  }
  public async listarAutores(): Promise<Autor[]> {
    return await this.autorService.listarAutores();
  }

  public async buscarAutorPorId(id: number): Promise<Autor | null> {
    return await this.autorService.buscarAutorPorId(id);
  }
  public async atualizarAutor(
    id: number,
    nome_autor: string,
    nacionalidade: string,
  ): Promise<void> {
    const autor = new Autor(nome_autor, nacionalidade, id);

    await this.autorService.atualizarAutor(autor);
  }
  public async excluirAutor(id: number): Promise<void> {
    await this.autorService.excluirAutor(id);
  }
}
