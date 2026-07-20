import readlineSync from "readline-sync";
import { EmprestimoController } from "../controllers/emprestimoController";
import { LivroRepository } from "../repositories/livroRepository";
import { ClienteRepository } from "../repositories/clienteRepository";

export class EmprestimoMenu {

    private emprestimoController = new EmprestimoController();
    private livroRepository = new LivroRepository();
    private clienteRepository = new ClienteRepository();

    public async show(): Promise<void> {

        let opcao: number;

        do {

            console.clear();

            console.log("========== EMPRÉSTIMOS ==========");
            console.log("1 - Realizar empréstimo");
            console.log("2 - Listar empréstimos");
            console.log("3 - Buscar empréstimo por ID");
            console.log("4 - Registrar devolução");
            console.log("5 - Excluir empréstimo");
            console.log("0 - Voltar");

            opcao = readlineSync.questionInt("\nEscolha uma opcao: ");

            switch (opcao) {

                case 1: {
                    const livroId = readlineSync.questionInt("ID do livro: ");
                    const clienteId = readlineSync.questionInt("ID do cliente: ");

                    try {

                        await this.emprestimoController.cadastrarEmprestimo(
                            livroId,
                            clienteId
                        );

                        console.log("\n✅ Empréstimo realizado com sucesso!");

                    } catch (error) {

                        console.log(`\n❌ ${(error as Error).message}`);

                    }

                    this.pausar();
                    break;
                }

                case 2: {

                    const emprestimos = await this.emprestimoController.listarEmprestimos();

                    if (emprestimos.length === 0) {

                        console.log("\nNenhum empréstimo encontrado.");

                    } else {

                        for (const emprestimo of emprestimos) {
                            const livro = await this.livroRepository.buscarLivroPorId(emprestimo.livro_id);
                            const cliente = await this.clienteRepository.buscarClientePorId(emprestimo.cliente_id);

                            console.log("----------------------------");
                            console.log(`ID: ${emprestimo.id}`);
                            console.log(`Livro: ${livro ? livro.titulo : emprestimo.livro_id}`);
                            console.log(`Cliente: ${cliente ? cliente.nome : emprestimo.cliente_id}`);
                            console.log(`Data: ${emprestimo.data_emprestimo}`);
                            console.log(`Devolvido: ${emprestimo.devolvido ? "Sim" : "Não"}`);
                        }

                    }

                    this.pausar();
                    break;
                }

                case 3: {

                    const id = readlineSync.questionInt("Informe o ID: ");

                    const emprestimo =
                        await this.emprestimoController.buscarPorId(id);

                    if (!emprestimo) {

                        console.log("\nEmpréstimo não encontrado.");

                    } else {
                        const livro = await this.livroRepository.buscarLivroPorId(emprestimo.livro_id);
                        const cliente = await this.clienteRepository.buscarClientePorId(emprestimo.cliente_id);

                        console.log("\n===== EMPRÉSTIMO =====");
                        console.log(`Livro: ${livro ? livro.titulo : emprestimo.livro_id}`);
                        console.log(`Cliente: ${cliente ? cliente.nome : emprestimo.cliente_id}`);
                        console.log(`Data empréstimo: ${emprestimo.data_emprestimo}`);
                        console.log(`Devolvido: ${emprestimo.devolvido ? "Sim" : "Não"}`);
                    }

                    this.pausar();
                    break;
                }

                case 4: {

                    const id = readlineSync.questionInt("ID do emprestimo: ");

                    try {

                        await this.emprestimoController.devolverEmprestimo(id);

                        console.log("\n✅ Livro devolvido com sucesso!");

                    } catch (error) {

                        console.log(`\n❌ ${(error as Error).message}`);

                    }

                    this.pausar();
                    break;
                }

                case 5: {

                    const id = readlineSync.questionInt("ID do emprestimo: ");

                    try {

                        await this.emprestimoController.excluirEmprestimo(id);

                        console.log("\n✅ Empréstimo removido.");

                    } catch (error) {

                        console.log(`\n❌ ${(error as Error).message}`);

                    }

                    this.pausar();
                    break;
                }

                case 0:
                    break;

                default:
                    console.log("\nOpção inválida.");
                    this.pausar();

            }

        } while (opcao !== 0);

    }

    private pausar(): void {

        readlineSync.question("\nPressione ENTER para continuar...");

    }

}