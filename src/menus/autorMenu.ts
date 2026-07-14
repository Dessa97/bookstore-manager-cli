import readlineSync from "readline-sync";
import { AutorController } from "../controllers/autorController";

export class AutorMenu {
  private autorController = new AutorController();

  public async show(): Promise<void> {
    let opcao: number;

    do {
      console.clear();

      console.log("========== AUTORES ==========");
      console.log("1 - Cadastrar");
      console.log("2 - Listar");
      console.log("3 - Buscar por ID");
      console.log("4 - Atualizar");
      console.log("5 - Remover");
      console.log("0 - Voltar");

      opcao = readlineSync.questionInt("\nEscolha uma opcao: ");

      switch (opcao) {
        case 1: {
          const nome = readlineSync.question("Nome: ");
          const nacionalidade = readlineSync.question("Nacionalidade: ");

          try {
            await this.autorController.cadastrar(nome, nacionalidade);
            console.log("\n✅ Autor cadastrado com sucesso!");
          } catch (error) {
            console.log(`\n❌ ${(error as Error).message}`);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 2: {
          const autores = await this.autorController.listarAutores();

          console.clear();

          if (autores.length === 0) {
            console.log("Nenhum autor cadastrado.");
          } else {
            autores.forEach((autor) => {
              console.log(`ID: ${autor.id}`);
              console.log(`Nome: ${autor.nome}`);
              console.log(`Nacionalidade: ${autor.nacionalidade}`);
              console.log("---------------------------");
            });
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 3: {
          const id = readlineSync.questionInt("Informe o ID: ");

          const autor = await this.autorController.buscarAutorPorId(id);

          if (!autor) {
            console.log("\nAutor não encontrado.");
          } else {
            console.log("\n===== AUTOR =====");
            console.log(`ID: ${autor.id}`);
            console.log(`Nome: ${autor.nome}`);
            console.log(`Nacionalidade: ${autor.nacionalidade}`);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 4: {
          const id = readlineSync.questionInt("Informe o ID do autor: ");

          const autor = await this.autorController.buscarAutorPorId(id);

          if (!autor) {
            console.log("\nAutor não encontrado.");
          } else {
            console.log("\n=== Dados atuais ===");
            console.log(`Nome: ${autor.nome}`);
            console.log(`Nacionalidade: ${autor.nacionalidade}`);

            const nome = readlineSync.question("Novo nome: ", {
              defaultInput: autor.nome,
            });

            const nacionalidade = readlineSync.question(
              "Nova nacionalidade: ",
              {
                defaultInput: autor.nacionalidade,
              },
            );

            try {
              await this.autorController.atualizarAutor(
                id,
                nome,
                nacionalidade,
              );

              console.log("\n✅ Autor atualizado com sucesso!");
            } catch (error) {
              console.log(`\n❌ ${(error as Error).message}`);
            }
          }

          readlineSync.question("\nPressione ENTER...");
          break;
        }
        case 5: {
          const id = readlineSync.questionInt("Informe o ID do autor: ");

          try {
            await this.autorController.excluirAutor(id);

            console.log("\n✅ Autor removido com sucesso!");
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
