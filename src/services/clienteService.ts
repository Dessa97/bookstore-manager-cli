import { ClienteRepository } from "../repositories/clienteRepository";
import { Cliente } from "../models/cliente";

export class ClienteService {
  private clienteRepository = new ClienteRepository();

  public async cadastrarCliente(cliente: Cliente): Promise<void> {
    if (!cliente.nome.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    await this.clienteRepository.cadastrarCliente(cliente);
  }

  public async listarClientes(): Promise<Cliente[]> {
    return await this.clienteRepository.listarClientes();
  }

  public async buscarClientePorId(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.buscarClientePorId(id);
  }
  public async atualizarCliente(cliente: Cliente): Promise<void> {
    const clienteExistente = await this.clienteRepository.buscarClientePorId(
      cliente.id!,
    );

    if (!clienteExistente) {
      throw new Error("Cliente não encontrado.");
    }

    if (!cliente.nome.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    await this.clienteRepository.atualizarCliente(cliente);
  }

  public async excluirCliente(id: number): Promise<void> {
    const cliente = await this.clienteRepository.buscarClientePorId(id);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    await this.clienteRepository.excluirCliente(id);
  }
}
