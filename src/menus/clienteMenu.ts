import readlineSync from "readline-sync";
import { ClienteController } from "../controllers/clienteController";

export class ClienteMenu {
  private clienteController = new ClienteController();

  public async show(): Promise<void> {
    let opcao: number;

    do {
      console.clear();

      console.log("========== CLIENTES ==========");
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
          const email = readlineSync.question("Email: ");
          const telefone = readlineSync.question("Telefone: ");

          try {
            await this.clienteController.cadastrar(nome, email, telefone);
            console.log("\n✅ Cliente cadastrado com sucesso!");
          } catch (error) {
            console.log(`\n❌ ${(error as Error).message}`);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 2: {
          const clientes = await this.clienteController.listarClientes();

          console.clear();
          console.log("========== CLIENTES ==========\n");

          if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
          } else {
            clientes.forEach((cliente) => {
              console.log(`ID: ${cliente.id}`);
              console.log(`Nome: ${cliente.nome}`);
              console.log(`Email: ${cliente.email}`);
              console.log(`Telefone: ${cliente.telefone}`);
              console.log("---------------------------");
            });
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 3: {
          const id = readlineSync.questionInt("Informe o ID: ");

          const cliente = await this.clienteController.buscarClientePorId(id);

          if (!cliente) {
            console.log("\nCliente não encontrado.");
          } else {
            console.log("\n===== CLIENTE =====");
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Email: ${cliente.email}`);
            console.log(`Telefone: ${cliente.telefone}`);
          }

          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }
        case 4: {
          const id = readlineSync.questionInt("Informe o ID do cliente: ");

          const cliente = await this.clienteController.buscarClientePorId(id);

          if (!cliente) {
            console.log("\nCliente não encontrado.");
          } else {
            console.log("\n=== Dados atuais ===");
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Email: ${cliente.email}`);
            console.log(`Telefone: ${cliente.telefone}`);

            const nome = readlineSync.question("Novo nome: ", {
              defaultInput: cliente.nome,
            });

            const email = readlineSync.question("Novo email: ", {
              defaultInput: cliente.email,
            });

            const telefone = readlineSync.question("Novo telefone: ", {
              defaultInput: cliente.telefone,
            });

            try {
              await this.clienteController.atualizarCliente(
                id,
                nome,
                email,
                telefone
              );

              console.log("\n✅ Cliente atualizado com sucesso!");
            } catch (error) {
              console.log(`\n❌ ${(error as Error).message}`);
            }
          }

          readlineSync.question("\nPressione ENTER...");
          break;
        }
        case 5: {
          const id = readlineSync.questionInt("Informe o ID do cliente: ");

          try {
            await this.clienteController.excluirCliente(id);

            console.log("\n✅ Cliente removido com sucesso!");
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
