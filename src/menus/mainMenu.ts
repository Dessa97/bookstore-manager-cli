import readlineSync from "readline-sync";
import { AutorMenu } from "./autorMenu";
import { ClienteMenu } from "./clienteMenu";
import { EmprestimoMenu } from "./emprestimoMenu";
import { LivroMenu } from "./livroMenu";
import { RelatorioMenu } from "./relatorioMenu";

export class MainMenu {
  public async show(): Promise<void> {
    let opcao: number;

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

      opcao = readlineSync.questionInt("Escolha uma opcao: ");

      switch (opcao) {
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
          const relatorioMenu = new RelatorioMenu();
          await relatorioMenu.show();
          break;

        case 0:
          console.log("\nEncerrando aplicação...");
          break;

        default:
          console.log("\nOpção inválida!");
      }

      if (opcao !== 0) {
        readlineSync.question("\nPressione ENTER para continuar...");
      }

    } while (opcao !== 0);
  }
}