import { ClienteService } from "../services/clienteService";
import { Cliente } from "../models/cliente";

export class ClienteController {
  private clienteService = new ClienteService();

  public async cadastrar(nome: string, email: string, telefone: string): Promise<void> {
    const cliente = new Cliente(nome, email, telefone);

    await this.clienteService.cadastrarCliente(cliente);
  }
  public async listarClientes(): Promise<Cliente[]> {
    return await this.clienteService.listarClientes();
  }

  public async buscarClientePorId(id: number): Promise<Cliente | null> {
    return await this.clienteService.buscarClientePorId(id);
  }
  public async atualizarCliente(
    id: number,
    nome: string,
    email: string,
    telefone: string,
  ): Promise<void> {
    const cliente = new Cliente(nome, email, telefone, id);

    await this.clienteService.atualizarCliente(cliente);
  }
  public async excluirCliente(id: number): Promise<void> {
    await this.clienteService.excluirCliente(id);
  }
}
