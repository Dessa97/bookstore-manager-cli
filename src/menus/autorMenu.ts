import readlineSync from "readline-sync";

export class AutorMenu {

    public async show(): Promise<void> {

        let option: number;

        do {

            console.clear();

            console.log("========== AUTORES ==========");
            console.log("1 - Cadastrar");
            console.log("2 - Listar");
            console.log("3 - Buscar por ID");
            console.log("4 - Atualizar");
            console.log("5 - Remover");
            console.log("0 - Voltar");

            option = readlineSync.questionInt("\nEscolha uma opcao: ");

            switch (option) {

                case 1:
                    console.log("\nCadastrar Autor");
                    break;

                case 2:
                    console.log("\nListar Autores");
                    break;

                case 3:
                    console.log("\nBuscar Autor");
                    break;

                case 4:
                    console.log("\nAtualizar Autor");
                    break;

                case 5:
                    console.log("\nRemover Autor");
                    break;

                case 0:
                    break;

                default:
                    console.log("\nOpção inválida.");
            }

            if (option !== 0) {
                readlineSync.question("\nPressione ENTER...");
            }

        } while (option !== 0);

    }

}