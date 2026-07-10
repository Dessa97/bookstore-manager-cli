import readlineSync from "readline-sync";

export class EmprestimoMenu {

    public async show(): Promise<void> {

        let option: number;

        do {

            console.clear();

            console.log("========== EMPRÉSTIMOS ==========");
            console.log("1 - Cadastrar");
            console.log("2 - Listar");
            console.log("3 - Buscar por ID");
            console.log("4 - Atualizar");
            console.log("5 - Remover");
            console.log("0 - Voltar");

            option = readlineSync.questionInt("\nEscolha uma opcao: ");

            switch (option) {

                case 1:
                    console.log("\nCadastrar Empréstimo");
                    break;

                case 2:
                    console.log("\nListar Empréstimos");
                    break;

                case 3:
                    console.log("\nBuscar Empréstimo");
                    break;

                case 4:
                    console.log("\nAtualizar Empréstimo");
                    break;

                case 5:
                    console.log("\nRemover Empréstimo");
                    break;

                case 0:
                    break;

                default:
                    console.log("\nOpcao inválida.");
            }

            if (option !== 0) {
                readlineSync.question("\nPressione ENTER...");
            }

        } while (option !== 0);

    }

}