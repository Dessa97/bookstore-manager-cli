import { AutorService } from "../services/autorService";
import { Autor } from "../models/autor";

export class AutorController {
  private autorService = new AutorService();

  public async cadastrar(nome: string, nacionalidade: string): Promise<void> {
    const autor = new Autor(nome, nacionalidade);

    await this.autorService.cadastrarAutor(autor);
  }
  public async listarAutores(): Promise<Autor[]> {
    return await this.autorService.listarAutores();
  }
}
