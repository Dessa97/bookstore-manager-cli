import { RelatorioService } from "../services/relatorioService";
export class RelatorioController {
  private relatorioService = new RelatorioService();
  public async listarLivrosDisponiveis() {
    return await this.relatorioService.listarLivrosDisponiveis();
  }
  public async listarLivrosEmprestados() {
    return await this.relatorioService.listarLivrosEmprestados();
  }

  public async listarLivrosCadastradosPorAutor() {
    return await this.relatorioService.listarLivrosCadastradosPorAutor();
  }
  public async listarQuantidadeEmprestimosPorLivro() {
    return await this.relatorioService.listarQuantidadeEmprestimosPorLivro();
  }
  public async listarClientesComEmprestimosAtivos() {
    return await this.relatorioService.listarClientesComEmprestimosAtivos();
  }
}
