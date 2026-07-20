import { RelatorioRepository } from "../repositories/relatorioRepository";
export class RelatorioService {
  private relatorioRepository = new RelatorioRepository();
  public async listarLivrosDisponiveis() {
    return await this.relatorioRepository.listarLivrosDisponiveis();
  }
  public async listarLivrosEmprestados() {
    return await this.relatorioRepository.listarLivrosEmprestados();
  }

  public async listarLivrosCadastradosPorAutor() {
    return await this.relatorioRepository.livrosCadastradosPorAutor();
  }
  public async listarQuantidadeEmprestimosPorLivro() {
    return await this.relatorioRepository.quantidadeEmprestimosPorLivro();
  }
  public async listarClientesComEmprestimosAtivos() {
    return await this.relatorioRepository.clientesComEmprestimosAtivos();
  }
}
