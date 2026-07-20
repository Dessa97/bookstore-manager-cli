import readlineSync from "readline-sync";
import { RelatorioController } from "../controllers/relatorioController";

export class RelatorioMenu {
  private relatorioController = new RelatorioController();

  public async show(): Promise<void> {
    let opcao: number;

    do {
      console.clear();

      console.log("========== RELATÓRIOS ==========");
      console.log("1 - Livros disponíveis");
      console.log("2 - Livros emprestados");
      console.log("3 - Livros cadastrados por autor");
      console.log("4 - Quantidade de empréstimos por livro");
      console.log("5 - Clientes com empréstimos ativos");
      console.log("0 - Voltar");

      opcao = readlineSync.questionInt("\nEscolha uma opcao: ");

      switch (opcao) {
        case 1: {
          const livros =
            await this.relatorioController.listarLivrosDisponiveis();

          console.clear();
          console.log("===== LIVROS DISPONÍVEIS =====\n");

          if (livros.length === 0) {
            console.log("Nenhum livro disponível.");
          } else {
            console.table(livros);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 2: {
          const livrosEmprestados =
            await this.relatorioController.listarLivrosEmprestados();

          console.clear();
          console.log("===== LIVROS EMPRESTADOS =====\n");

          if (livrosEmprestados.length === 0) {
            console.log("Nenhum livro emprestado.");
          } else {
            console.table(livrosEmprestados);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 3: {
          const livrosCadastradosPorAutor =
            await this.relatorioController.listarLivrosCadastradosPorAutor();

          console.clear();
          console.log("===== LIVROS CADASTRADOS POR AUTOR =====\n");

          if (livrosCadastradosPorAutor.length === 0) {
            console.log("Nenhum livro cadastrado por autor.");
          } else {
            console.table(livrosCadastradosPorAutor);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 4: {
          const quantidadeEmprestimosPorLivro =
            await this.relatorioController.listarQuantidadeEmprestimosPorLivro();

          console.clear();
          console.log("===== QUANTIDADE DE EMPRÉSTIMOS POR LIVRO =====\n");

          if (quantidadeEmprestimosPorLivro.length === 0) {
            console.log("Nenhum empréstimo encontrado.");
          } else {
            console.table(quantidadeEmprestimosPorLivro);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 5: {
          const clientesComEmprestimosAtivos =
            await this.relatorioController.listarClientesComEmprestimosAtivos();

          console.clear();
          console.log("===== CLIENTES COM EMPRÉSTIMOS ATIVOS =====\n");

          if (clientesComEmprestimosAtivos.length === 0) {
            console.log("Nenhum empréstimo encontrado.");
          } else {
            console.table(clientesComEmprestimosAtivos);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 0:
          break;

        default:
          console.log("\nOpção inválida.");
          readlineSync.question("\nPressione ENTER para continuar...");
      }
    } while (opcao !== 0);
  }
}
