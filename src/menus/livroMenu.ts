import readlineSync from "readline-sync";
import { LivroController } from "../controllers/livroController";
import { AutorRepository } from "../repositories/autorRepository";

export class LivroMenu {
  private livroController = new LivroController();
  private autorRepository = new AutorRepository();

  public async show(): Promise<void> {
    let opcao: number;

    do {
      console.clear();

      console.log("========== LIVROS ==========");
      console.log("1 - Cadastrar");
      console.log("2 - Listar");
      console.log("3 - Buscar por ID");
      console.log("4 - Atualizar");
      console.log("5 - Remover");
      console.log("0 - Voltar");

      opcao = readlineSync.questionInt("\nEscolha uma opcao: ");

      switch (opcao) {
        case 1: {
          const titulo = readlineSync.question("Titulo: ");
          const ano_publicacao = readlineSync.questionInt(
            "Ano de Publicacao: ",
          );
          const quantidade_total =
            readlineSync.questionInt("Quantidade Total: ");
          const quantidade_disponivel = readlineSync.questionInt(
            "Quantidade Disponivel: ",
          );
          const autor_id = readlineSync.questionInt("ID do autor: ");

          try {
            await this.livroController.cadastrarLivro(
              titulo,
              ano_publicacao,
              quantidade_total,
              quantidade_disponivel,
              autor_id,
            );
            console.log("\n✅ Livro cadastrado com sucesso!");
          } catch (error) {
            console.log(`\n❌ ${(error as Error).message}`);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 2: {
          const livros = await this.livroController.listarLivros();

          console.clear();
          console.log("========== LIVROS ==========\n");

          if (livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
          } else {
            for (const livro of livros) {
              const autor = await this.autorRepository.buscarAutorPorId(livro.autor_id);

              console.log(`ID: ${livro.id}`);
              console.log(`Título: ${livro.titulo}`);
              console.log(`Autor: ${autor ? autor.nome : livro.autor_id}`);
              console.log(`Ano de Publicação: ${livro.ano_publicacao}`);
              console.log(`Quantidade Total: ${livro.quantidade_total}`);
              console.log(
                `Quantidade Disponível: ${livro.quantidade_disponivel}`,
              );
              console.log("---------------------------");
            }
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 3: {
          const id = readlineSync.questionInt("Informe o ID: ");

          const livro = await this.livroController.buscarLivroPorId(id);

          if (!livro) {
            console.log("\nLivro não encontrado.");
          } else {
            const autor = await this.autorRepository.buscarAutorPorId(livro.autor_id);

            console.log("\n===== LIVRO =====");
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Autor: ${autor ? autor.nome : livro.autor_id}`);
            console.log(`Ano de Publicação: ${livro.ano_publicacao}`);
            console.log(`Quantidade Total: ${livro.quantidade_total}`);
            console.log(
              `Quantidade Disponível: ${livro.quantidade_disponivel}`,
            );
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 4: {
          const id = readlineSync.questionInt("Informe o ID do livro: ");

          const livro = await this.livroController.buscarLivroPorId(id);

          if (!livro) {
            console.log("\nLivro não encontrado.");
          } else {
            console.log("\n=== Dados atuais ===");
            console.log(`Título: ${livro.titulo}`);
            console.log(`Ano de Publicação: ${livro.ano_publicacao}`);
            console.log(`Quantidade Total: ${livro.quantidade_total}`);
            console.log(
              `Quantidade Disponível: ${livro.quantidade_disponivel}`,
            );

            const titulo = readlineSync.question("Novo titulo: ", {
              defaultInput: livro.titulo,
            });

            const ano_publicacao = readlineSync.questionInt(
              "Novo ano de publicacao: ",
              {
                defaultInput: String(livro.ano_publicacao),
              },
            );

            const quantidade_total = readlineSync.questionInt(
              "Nova quantidade total: ",
              {
                defaultInput: String(livro.quantidade_total),
              },
            );

            const quantidade_disponivel = readlineSync.questionInt(
              "Nova quantidade disponivel: ",
              {
                defaultInput: String(livro.quantidade_disponivel),
              },
            );

            const autor_id = readlineSync.questionInt("ID do autor: ", {
              defaultInput: String(livro.autor_id),
            });

            try {
              await this.livroController.atualizarLivro(
                id,
                titulo,
                ano_publicacao,
                quantidade_total,
                quantidade_disponivel,
                autor_id,
              );

              console.log("\n✅ Livro atualizado com sucesso!");
            } catch (error) {
              console.log(`\n❌ ${(error as Error).message}`);
            }
          }

          readlineSync.question("\nPressione ENTER...");
          break;
        }
        case 5: {
          const id = readlineSync.questionInt("Informe o ID do livro: ");

          try {
            await this.livroController.excluirLivro(id);

            console.log("\n✅ Livro removido com sucesso!");
          } catch (error) {
            console.log(`\n❌ ${(error as Error).message}`);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 0: {
          break;
        }

        default:
          console.log("\nOpção inválida!");
          readlineSync.question("\nPressione ENTER...");
      }
    } while (opcao !== 0);
  }
}
