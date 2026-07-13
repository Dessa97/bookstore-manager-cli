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

      opcao = readlineSync.questionInt("\nEscolha uma opção: ");

      switch (opcao) {
        case 1:
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
        case 2:
          const autores = await this.autorController.listarAutores();

          console.clear();
          console.log("========== AUTORES ==========\n");

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
        case 0:
          break;

        default:
          console.log("\nOpção inválida!");
          readlineSync.question("\nPressione ENTER...");
      }
    } while (opcao !== 0);
  }
}
