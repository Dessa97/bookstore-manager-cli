import readlineSync from "readline-sync";

export class MainMenu {
  public async show(): Promise<void> {
    let option: number;

    do {
      console.clear();

      console.log("==================================");
      console.log("     BOOKSTORE MANAGER CLI");
      console.log("==================================");
      console.log("1 - Autores");
      console.log("2 - Livros");
      console.log("3 - Clientes");
      console.log("4 - Empréstimos");
      console.log("5 - Relatórios");
      console.log("0 - Sair");
      console.log("==================================");

      option = readlineSync.questionInt("Escolha uma opcao: ");

      switch (option) {
        case 1:
          console.log("\nMenu de Autores");
          break;

        case 2:
          console.log("\nMenu de Livros");
          break;

        case 3:
          console.log("\nMenu de Clientes");
          break;

        case 4:
          console.log("\nMenu de Empréstimos");
          break;

        case 5:
          console.log("\nMenu de Relatórios");
          break;

        case 0:
          console.log("\nEncerrando aplicação...");
          break;

        default:
          console.log("\nOpção inválida!");
      }

      if (option !== 0) {
        readlineSync.question("\nPressione ENTER para continuar...");
      }

    } while (option !== 0);
  }
}