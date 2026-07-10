import readlineSync from "readline-sync";
import { AutorMenu } from "./autorMenu";
import { ClienteMenu } from "./clienteMenu";
import { EmprestimoMenu } from "./emprestimoMenu";
import { LivroMenu } from "./livroMenu";

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
          const autorMenu = new AutorMenu();
          await autorMenu.show();
          break;
        case 2:
          const livroMenu = new LivroMenu();
          await livroMenu.show();
          break;

        case 3:
          const clienteMenu = new ClienteMenu();
          await clienteMenu.show();
          break;

        case 4:
          const emprestimoMenu = new EmprestimoMenu();
          await emprestimoMenu.show();
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